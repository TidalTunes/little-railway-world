import clipping from './polygon-ops.js';
import { Earcut } from 'three/src/extras/Earcut.js';

// Authored ranges are immutable, cloneable data. Geometry and acceleration data
// are deliberately cached outside them so network packets stay lightweight.
const cache=new WeakMap();
const EPS=1e-8;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const finite=Number.isFinite;
function hash(value){let n=2166136261;for(const c of String(value))n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;}
function noise(seed,x,z){let n=Math.imul(x|0,374761393)^Math.imul(z|0,668265263)^seed;n=Math.imul(n^n>>>13,1274126177);return ((n^n>>>16)>>>0)/4294967295;}
function point(p){return Array.isArray(p)?{x:Number(p[0]),z:Number(p[1]),height:p[2]===undefined?undefined:Number(p[2])}:{x:Number(p.x),z:Number(p.z),height:p.height===undefined?undefined:Number(p.height)};}
function requireValue(ok,message){if(!ok)throw new TypeError(`Mountain range: ${message}`);}
function polygonBounds(polygon){return {minX:Math.min(...polygon.map(p=>p[0])),maxX:Math.max(...polygon.map(p=>p[0])),minZ:Math.min(...polygon.map(p=>p[1])),maxZ:Math.max(...polygon.map(p=>p[1]))};}
function segmentDistance(x,z,a,b){const dx=b[0]-a[0],dz=b[1]-a[1],t=clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1));return Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz);}
function signedDistance(polygon,x,z){
  let inside=false,distance=Infinity;
  for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
    const a=polygon[j],b=polygon[i];distance=Math.min(distance,segmentDistance(x,z,a,b));
    if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
  }
  return distance<EPS?0:inside?-distance:distance;
}
function footprintDistance(range,x,z){
  let distance=signedDistance(range.polygon,x,z);
  for(const hole of range.holes??[])distance=Math.max(distance,-signedDistance(hole,x,z));
  return distance;
}
function normalizedRing(input){
  const polygon=input.map(p=>{const q=point(p);return [q.x,q.z];});
  if(polygon.length>1&&polygon[0][0]===polygon.at(-1)[0]&&polygon[0][1]===polygon.at(-1)[1])polygon.pop();
  requireValue(polygon.length>=3&&polygon.every(p=>p.every(finite)),'polygon needs at least three finite points');
  return polygon;
}

/**
 * polygon: one simple ring of [x,z] points; holes: optional interior rings.
 * ridges: [{points:[[x,z,height],...],width}].
 * Heights and widths use world units. cellSize controls facet density. snowLine
 * is an absolute elevation (false disables snow). Returned metadata is JSON-safe.
 */
export function compileMountainRange(spec){
  requireValue(spec&&Array.isArray(spec.polygon),'polygon is required');
  const polygon=normalizedRing(spec.polygon),holes=(spec.holes??[]).map(normalizedRing);
  const area=polygon.reduce((sum,p,i)=>{const q=polygon[(i+1)%polygon.length];return sum+p[0]*q[1]-q[0]*p[1];},0)/2;
  requireValue(Math.abs(area)>EPS,'polygon must have positive area');
  const bounds=polygonBounds(polygon),width=bounds.maxX-bounds.minX,depth=bounds.maxZ-bounds.minZ;
  const cellSize=Number(spec.cellSize??Math.max(2,Math.min(width,depth)/7,Math.max(width,depth)/160));
  requireValue(finite(cellSize)&&cellSize>0,'cellSize must be positive and finite');
  requireValue((Math.ceil(width/cellSize)+3)*(Math.ceil(depth/cellSize)+3)<=100000,'cellSize produces too many facets');
  requireValue(Array.isArray(spec.ridges)&&spec.ridges.length>0,'at least one ridgeline is required');
  const ridges=spec.ridges.map(ridge=>{
    const points=(ridge.points??[]).map(point).map(p=>({...p,height:Number(p.height??spec.height??16)}));
    const ridgeWidth=Number(ridge.width??spec.width??Math.min(width,depth)*.45);
    requireValue(points.length>=2&&points.every(p=>finite(p.x)&&finite(p.z)&&finite(p.height)&&p.height>0),'ridgelines need at least two finite points with positive heights');
    requireValue(points.every((p,i)=>i===0||Math.hypot(p.x-points[i-1].x,p.z-points[i-1].z)>EPS),'ridgeline segments must have positive length');
    requireValue(finite(ridgeWidth)&&ridgeWidth>0,'ridge width must be positive and finite');
    return {points,width:ridgeWidth};
  });
  const height=Math.max(...ridges.flatMap(r=>r.points.map(p=>p.height)));
  // A diagonal, continent-long range has a huge bounding box but a narrow
  // local spine. Its foothill fade must follow ridge width, not box extent.
  const edgeWidth=Number(spec.edgeWidth??Math.max(cellSize,
    Math.min(Math.min(width,depth)*.16,Math.max(...ridges.map(r=>r.width))*.5)));
  requireValue(finite(edgeWidth)&&edgeWidth>0,'edgeWidth must be positive and finite');
  const snowLine=spec.snowLine===false?height*2:Number(spec.snowLine??height*.66);
  requireValue(finite(snowLine)&&snowLine>=0,'snowLine must be nonnegative and finite');
  const x=(bounds.minX+bounds.maxX)/2,z=(bounds.minZ+bounds.maxZ)/2;
  const range={polygon,holes,ridges,cellSize,edgeWidth,snowLine,seed:String(spec.seed??spec.id??'range'),bounds,base:-.12};
  return {id:String(spec.id??'range'),x,z,radius:Math.max(...polygon.map(p=>Math.hypot(p[0]-x,p[1]-z))),height,range};
}

/** Signed distance to the actual range polygon; negative means inside. */
export function rangeFootprintDistance(mountain,x,z){return footprintDistance(mountain.range,x,z);}

function elevation(mountain,x,z,seed){
  const range=mountain.range,border=-footprintDistance(range,x,z);
  if(border<=EPS)return 0;
  let crest=0;
  for(const ridge of range.ridges){
    let along=0;
    for(let i=1;i<ridge.points.length;i++){
      const a=ridge.points[i-1],b=ridge.points[i],dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz);
      const t=clamp(((x-a.x)*dx+(z-a.z)*dz)/(length*length));
      const distance=Math.hypot(x-a.x-t*dx,z-a.z-t*dz),progress=along+t*length;
      const shoulder=ridge.width*(.89+.11*Math.sin(progress/ridge.width*4+seed*.00001));
      const profile=Math.max(0,1-(distance/shoulder)**1.3);
      const peaks=.86+.10*Math.sin(progress/range.cellSize*.63+seed*.0001)+.04*Math.sin(progress/range.cellSize*1.41);
      crest=Math.max(crest,(a.height+(b.height-a.height)*t)*(.11+.89*profile)*peaks);
      along+=length;
    }
  }
  const fade=clamp(border/range.edgeWidth),envelope=fade*fade*(3-2*fade);
  const facets=.94+.06*noise(seed,Math.round(x/range.cellSize*8),Math.round(z/range.cellSize*8));
  return clamp(crest*envelope*facets,0,mountain.height);
}

function builder(base){
  const vertices=[],surfaceTriangles=[],indices=new Map();
  function vertex(p){
    const x=Math.round(p.x*1e8)/1e8,z=Math.round(p.z*1e8)/1e8,key=`${x}:${z}`;
    if(!indices.has(key)){indices.set(key,vertices.length);vertices.push({x,y:p.y,z});}
    return indices.get(key);
  }
  function triangle(a,b,c){
    const cross=(b.z-a.z)*(c.x-a.x)-(b.x-a.x)*(c.z-a.z);
    if(Math.abs(cross)<EPS)return;
    const ids=[vertex(a),vertex(b),vertex(c)];
    if(new Set(ids).size<3)return;surfaceTriangles.push(cross>0?ids:[ids[0],ids[2],ids[1]]);
  }
  function finish(metadata={}){
    const count=vertices.length,triangles=surfaceTriangles.map(t=>[...t]),edges=new Map();
    vertices.push(...vertices.map(p=>({...p,y:base})));
    for(const [a,b,c]of surfaceTriangles){
      triangles.push([a+count,c+count,b+count]);
      for(const [u,v]of [[a,b],[b,c],[c,a]]){
        const key=u<v?`${u}:${v}`:`${v}:${u}`;
        if(edges.has(key))edges.delete(key);else edges.set(key,[u,v]);
      }
    }
    for(const [a,b]of edges.values())triangles.push([a,a+count,b],[b,a+count,b+count]);
    return {vertices,triangles,surfaceTriangles,...metadata};
  }
  return {triangle,finish};
}

function makeSurface(mountain){
  const range=mountain.range,seed=hash(range.seed),size=range.cellSize,bounds=range.bounds;
  const mesh=builder(range.base),points=new Map(),borderBlocks=new Map(),blockSize=size*8;
  function localFootprint(x,z){
    const ix=Math.floor(x/blockSize),iz=Math.floor(z/blockSize),key=`${ix}:${iz}`;
    if(!borderBlocks.has(key)){
      const x0=ix*blockSize-size*2,x1=(ix+1)*blockSize+size*2;
      const z0=iz*blockSize-size*2,z1=(iz+1)*blockSize+size*2;
      borderBlocks.set(key,clipping.intersection([[range.polygon,...(range.holes??[])]],
        [[[[x0,z0],[x1,z0],[x1,z1],[x0,z1]]]]));
    }
    return borderBlocks.get(key);
  }
  function grid(ix,iz){
    const key=`${ix}:${iz}`;
    if(!points.has(key)){
      const x=(ix+(noise(seed,ix,iz)-.5)*.34)*size,z=(iz+(noise(seed^0x73a5,ix,iz)-.5)*.34)*size;
      points.set(key,{x,z,y:elevation(mountain,x,z,seed)});
    }return points.get(key);
  }
  for(let iz=Math.floor(bounds.minZ/size)-1;iz<=Math.ceil(bounds.maxZ/size);iz++)for(let ix=Math.floor(bounds.minX/size)-1;ix<=Math.ceil(bounds.maxX/size);ix++){
    const a=grid(ix,iz),b=grid(ix+1,iz),c=grid(ix+1,iz+1),d=grid(ix,iz+1);
    for(const tri of (ix+iz)%2?[[a,b,d],[b,c,d]]:[[a,b,c],[a,c,d]]){
      const x=(tri[0].x+tri[1].x+tri[2].x)/3,z=(tri[0].z+tri[1].z+tri[2].z)/3;
      const radius=Math.max(...tri.map(p=>Math.hypot(p.x-x,p.z-z))),distance=footprintDistance(range,x,z);
      // A signed-distance ball wholly inside/outside the footprint cannot meet
      // its boundary. Only coastal/border cells pay for polygon intersection.
      if(distance>radius+EPS)continue;
      if(distance<-radius-EPS){mesh.triangle(...tri);continue;}
      const polygon=clipping.intersection(localFootprint(x,z),[[tri.map(p=>[p.x,p.z])]]);
      for(const rings of polygon){
        const flat=[],holes=[],vertices=[];
        for(let i=0;i<rings.length;i++){
          if(i)holes.push(vertices.length);
          for(const [x,z]of rings[i].slice(0,-1)){flat.push(x,z);vertices.push({x,z,y:elevation(mountain,x,z,seed)});}
        }
        const indices=Earcut.triangulate(flat,holes,2);
        for(let i=0;i<indices.length;i+=3)mesh.triangle(...indices.slice(i,i+3).map(j=>vertices[j]));
      }
    }
  }
  return mesh.finish({snowLine:range.snowLine,phase:seed/4294967295*Math.PI*2});
}

function entry(mountain){
  if(cache.has(mountain.range))return cache.get(mountain.range);
  const data=makeSurface(mountain),buckets=new Map(),size=mountain.range.cellSize;
  for(const ids of data.surfaceTriangles){
    const [a,b,c]=ids.map(i=>data.vertices[i]);
    const triangle={a,b,c,denominator:(b.z-c.z)*(a.x-c.x)+(c.x-b.x)*(a.z-c.z)};
    for(let z=Math.floor(Math.min(a.z,b.z,c.z)/size);z<=Math.floor(Math.max(a.z,b.z,c.z)/size);z++)
      for(let x=Math.floor(Math.min(a.x,b.x,c.x)/size);x<=Math.floor(Math.max(a.x,b.x,c.x)/size);x++){
        const key=`${x}:${z}`;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(triangle);
      }
  }
  const result={data,buckets};cache.set(mountain.range,result);return result;
}

/** Exact barycentric height of the same global triangular surface used by CSG. */
export function rangeSurfaceHeight(mountain,x,z){
  const bounds=mountain.range.bounds;
  if(x<bounds.minX-EPS||x>bounds.maxX+EPS||z<bounds.minZ-EPS||z>bounds.maxZ+EPS)return 0;
  const {buckets}=entry(mountain),size=mountain.range.cellSize;
  for(const {a,b,c,denominator}of buckets.get(`${Math.floor(x/size)}:${Math.floor(z/size)}`)??[]){
    const u=((b.z-c.z)*(x-c.x)+(c.x-b.x)*(z-c.z))/denominator;
    const v=((c.z-a.z)*(x-c.x)+(a.x-c.x)*(z-c.z))/denominator;
    if(u>=-EPS&&v>=-EPS&&u+v<=1+EPS)return Math.max(0,u*a.y+v*b.y+(1-u-v)*c.y);
  }return 0;
}

function clipFace(points,bounds){
  for(const [axis,edge,sign]of [['x',bounds.minX,1],['x',bounds.maxX,-1],['z',bounds.minZ,1],['z',bounds.maxZ,-1]]){
    const output=[];
    for(let i=0;i<points.length;i++){
      const a=points[i],b=points[(i+1)%points.length],da=(a[axis]-edge)*sign,db=(b[axis]-edge)*sign;
      if(da>=-EPS)output.push(a);
      if((da>=0)!==(db>=0)){
        const t=da/(da-db),p={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t};p[axis]=edge;output.push(p);
      }
    }
    points=output;if(points.length<3)return [];
  }return points;
}

/** Closed world-space mesh. Optional bounds slice existing facets, never resample them. */
export function rangeMeshData(mountain,bounds){
  const data=entry(mountain).data;if(!bounds)return data;
  requireValue(['minX','maxX','minZ','maxZ'].every(key=>finite(bounds[key]))&&bounds.maxX>bounds.minX&&bounds.maxZ>bounds.minZ,'slice bounds must be finite and ordered');
  const mesh=builder(mountain.range.base);
  for(const ids of data.surfaceTriangles){
    const points=clipFace(ids.map(i=>data.vertices[i]),bounds);
    for(let i=1;i<points.length-1;i++)mesh.triangle(points[0],points[i],points[i+1]);
  }
  return mesh.finish({snowLine:data.snowLine,phase:data.phase});
}

/** A continuous, gently irregular snowline across the complete range and its slices. */
export function rangeSnowHeight(mountain,x,z){
  const range=mountain.range,phase=hash(range.seed)/4294967295*Math.PI*2;
  return range.snowLine+mountain.height*(.028*Math.sin(x/range.cellSize*.37+phase)+.018*Math.sin(z/range.cellSize*.61-phase));
}
