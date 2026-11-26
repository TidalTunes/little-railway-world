import clipping from './polygon-ops.js';
import {clipPolygonsToBounds} from './polygon-region.js';
import {polylineTree} from './spatial-index.js';

const lists=new WeakMap(),widths=new WeakMap();
function stable(polygons){
  const clean=ring=>{
    const points=[];
    for(const [x,z] of ring){
      const point=[Math.round(x*1e6)/1e6,Math.round(z*1e6)/1e6],last=points.at(-1);
      if(!last||point[0]!==last[0]||point[1]!==last[1])points.push(point);
    }
    if(points.length>1&&points[0][0]===points.at(-1)[0]&&points[0][1]===points.at(-1)[1])points.pop();
    if(points.length<3)return null;
    // Quantization can collapse sub-grid slivers to a line. Do not emit those
    // as three-point "polygons", or leave their holes in an otherwise valid face.
    const [a,b]=points,dx=b[0]-a[0],dz=b[1]-a[1];
    if(!points.slice(2).some(p=>Math.abs(dx*(p[1]-a[1])-dz*(p[0]-a[0]))>1e-12))return null;
    return [...points,[...points[0]]];
  };
  return polygons.flatMap(polygon=>{
    const outer=clean(polygon[0]);
    return outer?[[outer,...polygon.slice(1).map(clean).filter(Boolean)]]:[];
  });
}
export function riversOf(world){
  if(world.rivers)return world.rivers;
  if(!lists.has(world))lists.set(world,world.river?[world.river]:[]);
  return lists.get(world);
}
function distance(x,z,a,b){
  const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1)));
  return Math.hypot(x-a.x-dx*t,z-a.z-dz*t);
}
/** Positive on dry ground; negative within any river, respecting each width. */
export function riverBankDistance(world,x,z){
  const rivers=riversOf(world);
  if(!widths.has(rivers))widths.set(rivers,Math.max(0,...rivers.map(r=>r.width/2)));
  const padding=widths.get(rivers);
  return polylineTree(rivers).nearest(x,z,s=>distance(x,z,s.a,s.b)-s.line.width/2,Infinity,padding);
}
export function riverCenterDistance(world,x,z){
  return polylineTree(riversOf(world)).nearest(x,z,s=>distance(x,z,s.a,s.b));
}
function ribbon(points,width){
  const left=[],right=[];
  points.forEach((p,i)=>{
    const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)];
    const length=Math.hypot(b.x-a.x,b.z-a.z)||1,nx=(b.z-a.z)/length*width/2,nz=-(b.x-a.x)/length*width/2;
    left.push([p.x+nx,p.z+nz]);right.push([p.x-nx,p.z-nz]);
  });
  const ring=left.concat(right.reverse());return [...ring,ring[0]];
}
/** Compute once in the world worker, then transfer the shared water geometry. */
export function createHydrology(world){
  const island=[[world.outline]],rivers=riversOf(world);
  const waters=rivers.map(r=>stable([[ribbon(r.points,r.width)]])),banks=rivers.map(r=>stable([[ribbon(r.points,r.width+1.6)]]));
  if(world.lakes?.length){waters.push(world.lakes);banks.push(world.lakes,world.lakeShore??[]);}
  if(!waters.length)return{water:[],banks:[]};
  const water=stable(clipping.intersection(island,stable(clipping.union(...waters))));
  const buffered=stable(clipping.intersection(island,stable(clipping.union(...banks))));
  return{water:stable(water),banks:stable(clipping.difference(buffered,water))};
}
const cache=new WeakMap();
export function hydrologyFor(world){
  const source=world.terrainSource??world;
  let data=source.hydrology;
  if(!data){if(!cache.has(source))cache.set(source,createHydrology(source));data=cache.get(source);}
  if(!world.terrainChunk)return data;
  const island=[[world.outline]];
  // First reject distant rivers/lakes using the stable chunk rectangle. The
  // island intersection remains necessary for non-rectangular world outlines.
  const localWater=world.bounds?clipPolygonsToBounds(data.water,world.bounds):data.water;
  const localBanks=world.bounds?clipPolygonsToBounds(data.banks,world.bounds):data.banks;
  return{water:stable(clipping.intersection(localWater,island)),banks:stable(clipping.intersection(localBanks,island))};
}
