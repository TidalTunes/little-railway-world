import {Color,Vector3} from 'three';
import {C,color} from './palette.js';
import {surfaceNormal,surfaceGeographicCoordinates} from './world-surface.js';
import {terrainColor} from './terrain-colors.js';
import {BoundsTree} from './spatial-index.js';
import {sampleLandscape} from './landscape-field.js';

const fields=new WeakMap(),normal=new Vector3(),geographic={};
const deep=color(.57,.092,235),temperate=color(.615,.091,224),shallows=color(.72,.082,202);
const coldWater=color(.64,.055,219),coldShallows=color(.75,.045,207);
const wetSand=C.sand.clone().lerp(C.oceanLight,.32).multiplyScalar(.94);
const shingle=C.rockLight.clone().lerp(C.oceanLight,.25).multiplyScalar(.87);
const iceShore=C.snow.clone().lerp(C.oceanLight,.26);
const coastSample={},shoreSample=new Color(),shelfSample=new Color();
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
const distance2=(point,a,b)=>{
  let dot=0,length=0;for(let i=0;i<point.length;i++){const d=b[i]-a[i];dot+=(point[i]-a[i])*d;length+=d*d;}
  const t=Math.max(0,Math.min(1,dot/(length||1)));
  let result=0;for(let i=0;i<point.length;i++)result+=(point[i]-a[i]-(b[i]-a[i])*t)**2;
  return result;
};

/** The ocean shelf is measured on the sphere, so it cannot develop a seam at
 * the date line or a bright ring around a pole. This tiny 3D index is built once
 * from coast segments and reused by all ocean vertices and detail packets. */
function sphereTree(items){
  if(!items.length)return null;
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(const {a,b}of items)for(let i=0;i<3;i++){min[i]=Math.min(min[i],a[i],b[i]);max[i]=Math.max(max[i],a[i],b[i]);}
  if(items.length<=8)return {min,max,items};
  let axis=0;for(let i=1;i<3;i++)if(max[i]-min[i]>max[axis]-min[axis])axis=i;
  items.sort((a,b)=>(a.a[axis]+a.b[axis])-(b.a[axis]+b.b[axis]));
  const middle=items.length>>1;
  return {min,max,left:sphereTree(items.slice(0,middle)),right:sphereTree(items.slice(middle))};
}
function sphereDistance(tree,point,limit){
  let best=limit*limit;
  const lower=node=>node.min.reduce((sum,min,i)=>sum+Math.max(min-point[i],0,point[i]-node.max[i])**2,0);
  const visit=node=>{
    if(!node||lower(node)>best)return;
    if(node.items){for(const edge of node.items)best=Math.min(best,distance2(point,edge.a,edge.b));return;}
    if(lower(node.left)<lower(node.right)){visit(node.left);visit(node.right);}else{visit(node.right);visit(node.left);}
  };
  visit(tree);return Math.sqrt(best);
}
function fieldFor(world){
  const source=world.terrainSource??world,polygons=source.biomes?.ocean??source.ocean;
  if(!polygons?.length)return null;
  let field=fields.get(polygons);if(field)return field;
  const complete=source.surface?.complete,period=complete?source.bounds?.width??2*Math.PI*source.surface.radius:0;
  const edges=[],sphereEdges=[],a3=new Vector3(),b3=new Vector3();
  for(const polygon of polygons)for(const ring of polygon)for(let i=0;i<ring.length;i++){
    const a=ring[i],b=ring[(i+1)%ring.length];
    if(a[0]===b[0]&&a[1]===b[1])continue;
    // Chart cuts are identified edges, not coasts. Artificial polar edges
    // collapse to one point; antimeridian cuts would create a false shelf.
    if(complete&&((Math.abs(Math.abs(a[0])-period/2)<.002&&Math.abs(a[0]-b[0])<.002)
      ||(Math.abs(Math.abs(a[1])-period/4)<.002&&Math.abs(a[1]-b[1])<.002)))continue;
    edges.push({a,b,minX:Math.min(a[0],b[0]),maxX:Math.max(a[0],b[0]),minZ:Math.min(a[1],b[1]),maxZ:Math.max(a[1],b[1])});
    if(complete){
      surfaceNormal(source,...a,a3).multiplyScalar(source.surface.radius);
      surfaceNormal(source,...b,b3).multiplyScalar(source.surface.radius);
      sphereEdges.push({a:a3.toArray(),b:b3.toArray()});
    }
  }
  field={source,period,edges:new BoundsTree(edges),sphere:sphereTree(sphereEdges)};fields.set(polygons,field);return field;
}

export function coastDistance(world,x,z,limit=Infinity){
  const field=fieldFor(world);if(!field)return limit;
  const offsets=field.period?[0,-field.period,field.period]:[0];
  let best=limit;
  for(const offset of offsets)best=field.edges.nearest(x+offset,z,edge=>Math.sqrt(distance2([x+offset,z],edge.a,edge.b)),best);
  return best;
}

/** Calm deep water, broad currents, and a shallow continental shelf. Colors
 * depend only on geography, never camera distance, elapsed time, or chunk ID. */
export function oceanColor(world,x,z,target=new Color()){
  const source=world.terrainSource??world,complete=source.surface?.complete;
  if(!complete)return target.copy(C.ocean);
  surfaceNormal(source,x,z,normal);surfaceGeographicCoordinates(source,x,z,geographic);
  const {x:nx,y:ny,z:nz}=normal,latitude=Math.abs(geographic.latitude)/90;
  const current=(Math.sin(nx*5.1+ny*2.3-nz*3.7)+Math.sin(ny*6.3+nz*4.2+nx*1.7))*.25+.5;
  target.copy(deep).lerp(temperate,.38+.42*current-.15*latitude);
  // Wide warm shelves and quieter slate-blue cold seas give each coast a
  // regional character without another water layer or bathymetry mesh.
  const cold=smooth((latitude-.50)/.43);
  target.lerp(coldWater,cold*.26);
  const field=fieldFor(source),width=(24+18*current)*(1-cold*.32);
  const distance=field?.sphere?sphereDistance(field.sphere,[nx*source.surface.radius,ny*source.surface.radius,nz*source.surface.radius],width*2):width*2;
  const shelf=Math.exp(-((distance/width)**2))*(.64-.16*latitude);
  shelfSample.copy(shallows).lerp(coldShallows,cold*.72);
  return target.lerp(shelfSample,shelf);
}

/** A physical landscape field makes long stretches of beach, shingle and
 * exposed headland agree across streamed cells. No extra shore geometry. */
export function coastExposure(world,x,z){
  sampleLandscape(world.terrainSource??world,x,z,coastSample);
  return .25+.75*smooth((coastSample.patch-.18)/.64);
}

/** Narrow coasts merge wet sand into the neighboring biome instead of drawing
 * a uniformly pale outline around every land mass. River banks keep sand. */
export function shoreColor(world,x,z,{map=false,target=new Color()}={}){
  const source=world.terrainSource??world,width=source.biomes?.shoreWidth??source.shoreWidth??.9;
  const distance=coastDistance(source,x,z,width*2);
  if(distance>=width*1.5)return target.copy(C.sand);
  const blend=smooth(distance/width);
  terrainColor(source,x,z,{map,target});
  sampleLandscape(source,x,z,coastSample);
  const rocky=smooth((coastSample.patch-.30)/.50)*.58;
  const polar=source.surface?.complete?smooth((Math.abs(coastSample.latitude)-61)/18):0;
  shoreSample.copy(wetSand).lerp(shingle,rocky).lerp(iceShore,polar*.80);
  return target.lerp(shoreSample,1-blend);
}
