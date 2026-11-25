import floating from 'polygon-clipping';
import Clipper from 'clipper-lib';

// The floating sweep remains the fast path for simple generated worlds. Real
// coastlines can produce almost coincident intersections which break its event
// ordering. Retry only those numerical failures on a millionth-unit integer grid.
export const POLYGON_PRECISION=1e6;
export const polygonOpsStats={fallbacks:0,union:0,intersection:0,difference:0,xor:0};
const NUMERICAL_FAILURE=/Unable to complete output ring|Unable to find segment .*SweepLine tree|Unable to pop\(\).*SweepEvent/;

function pathsFor(geometry){
  if(!Array.isArray(geometry))throw new TypeError('Input geometry is not a valid Polygon or MultiPolygon');
  if(!geometry.length)return [];
  const polygons=typeof geometry[0]?.[0]?.[0]==='number'?[geometry]:geometry;
  const paths=[];
  for(const polygon of polygons){
    if(!Array.isArray(polygon))throw new TypeError('Input geometry is not a valid Polygon or MultiPolygon');
    for(let ringIndex=0;ringIndex<polygon.length;ringIndex++){
      const ring=polygon[ringIndex],path=[];
      if(!Array.isArray(ring))throw new TypeError('Input geometry is not a valid Polygon or MultiPolygon');
      for(const coordinate of ring){
        if(!Array.isArray(coordinate)||coordinate.length<2||!coordinate.slice(0,2).every(Number.isFinite)){
          throw new TypeError('Polygon coordinates must be finite [x,z] pairs');
        }
        const X=Math.round(coordinate[0]*POLYGON_PRECISION),Y=Math.round(coordinate[1]*POLYGON_PRECISION);
        if(Math.abs(X)>4503599627370495||Math.abs(Y)>4503599627370495)throw new RangeError('Polygon coordinates exceed the integer clipping range');
        const previous=path.at(-1);
        if(!previous||previous.X!==X||previous.Y!==Y)path.push({X,Y});
      }
      if(path.length>1&&path[0].X===path.at(-1).X&&path[0].Y===path.at(-1).Y)path.pop();
      if(path.length<3)continue;
      if(Clipper.Clipper.Orientation(path)!==(ringIndex===0))path.reverse();
      paths.push(path);
    }
  }
  return paths;
}

function execute(type,subject,clip=[]){
  if(!subject.length)return [];
  // PolyTree already preserves holes. StrictlySimple adds an O(n²) vertex scan
  // to large connected coastlines and is unnecessary for the Boolean result.
  const operation=new Clipper.Clipper(),tree=new Clipper.PolyTree();
  if(!operation.AddPaths(subject,Clipper.PolyType.ptSubject,true)){
    return type===Clipper.ClipType.ctXor?execute(Clipper.ClipType.ctUnion,clip):[];
  }
  if(clip.length)operation.AddPaths(clip,Clipper.PolyType.ptClip,true);
  if(!operation.Execute(type,tree,Clipper.PolyFillType.pftNonZero,Clipper.PolyFillType.pftNonZero)){
    throw new Error('Integer polygon clipping failed');
  }
  const ring=path=>{
    const points=path.map(({X,Y})=>[X/POLYGON_PRECISION,Y/POLYGON_PRECISION]);
    return points.length?[...points,[...points[0]]]:points;
  };
  return Clipper.JS.PolyTreeToExPolygons(tree).map(polygon=>[ring(polygon.outer),...polygon.holes.map(ring)]);
}

/** Explicit integer implementation is exported for deterministic topology tests. */
export function integerPolygonOperation(name,...geometries){
  if(!['union','intersection','difference','xor'].includes(name))throw new TypeError(`Unknown polygon operation: ${name}`);
  if(!geometries.length)return [];
  const paths=geometries.map(pathsFor),types=Clipper.ClipType;
  if(name==='union')return execute(types.ctUnion,paths.flat());
  if(name==='difference')return execute(types.ctDifference,paths[0],paths.slice(1).flat());
  let result=execute(types.ctUnion,paths[0]);
  for(let i=1;i<paths.length;i++){
    if(name==='intersection'&&(!result.length||!paths[i].length))return [];
    if(name==='xor'&&!result.length){result=execute(types.ctUnion,paths[i]);continue;}
    result=execute(name==='intersection'?types.ctIntersection:types.ctXor,pathsFor(result),paths[i]);
  }
  return result;
}

function operation(name,geometries){
  try{return floating[name](...geometries);}
  catch(error){
    if(!NUMERICAL_FAILURE.test(String(error?.message)))throw error;
    polygonOpsStats.fallbacks++;polygonOpsStats[name]++;
    return integerPolygonOperation(name,...geometries);
  }
}

export const union=(...geometries)=>operation('union',geometries);
export const intersection=(...geometries)=>operation('intersection',geometries);
export const difference=(...geometries)=>operation('difference',geometries);
export const xor=(...geometries)=>operation('xor',geometries);
export default {union,intersection,difference,xor};
