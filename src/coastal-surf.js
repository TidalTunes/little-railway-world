import * as THREE from 'three';
import clipping from './polygon-ops.js';
import {BoundsTree} from './spatial-index.js';
import {clipPolygonsToBounds} from './polygon-region.js';
import {surfaceOffset,surfaceDisplacement,surfaceChartRadius} from './world-surface.js';
import {oceanColor,coastDistance} from './ocean-colors.js';
import {C} from './palette.js';

const indexes=new WeakMap();
const close=ring=>[...ring,ring[0]];
const rectangle=b=>[[[b.minX,b.minZ],[b.maxX,b.minZ],[b.maxX,b.maxZ],[b.minX,b.maxZ],[b.minX,b.minZ]]];
const expand=(b,r)=>({minX:b.minX-r,maxX:b.maxX+r,minZ:b.minZ-r,maxZ:b.maxZ+r});

function coastIndex(source){
  const ocean=source.biomes?.ocean??source.ocean??[];
  if(indexes.has(ocean))return indexes.get(ocean);
  const period=source.surface?.complete?2*Math.PI*(source.surface.projection?.radius??source.surface.radius):0,edges=[];
  const outline=source.outline??(source.bounds?rectangle(source.bounds)[0]:[]);
  const onOuterEdge=(a,b)=>!period&&outline.some((p,i)=>{
    const q=outline[(i+1)%outline.length],dx=q[0]-p[0],dz=q[1]-p[1],length=Math.hypot(dx,dz);
    if(!length)return false;
    return [a,b].every(v=>Math.abs((v[0]-p[0])*dz-(v[1]-p[1])*dx)/length<1e-6
      &&(v[0]-p[0])*dx+(v[1]-p[1])*dz>=-1e-6
      &&(v[0]-q[0])*dx+(v[1]-q[1])*dz<=1e-6);
  });
  for(const polygon of ocean)for(const ring of polygon)for(let i=1;i<ring.length;i++){
    const a=ring[i-1],b=ring[i];
    if(Math.hypot(a[0]-b[0],a[1]-b[1])<1e-7||onOuterEdge(a,b))continue;
    // Chart boundaries identify adjacent water; they never create breakers.
    if(period&&((Math.abs(Math.abs(a[0])-period/2)<.002&&Math.abs(a[0]-b[0])<.002)
      ||(Math.abs(Math.abs(a[1])-period/4)<.002&&Math.abs(a[1]-b[1])<.002)))continue;
    edges.push({a,b,minX:Math.min(a[0],b[0]),maxX:Math.max(a[0],b[0]),minZ:Math.min(a[1],b[1]),maxZ:Math.max(a[1],b[1])});
  }
  const result={tree:new BoundsTree(edges),period,ocean};indexes.set(ocean,result);return result;
}
function clippedSegment(a,b,bounds){
  let start=0,end=1;
  for(const [origin,delta,min,max]of [[a[0],b[0]-a[0],bounds.minX,bounds.maxX],[a[1],b[1]-a[1],bounds.minZ,bounds.maxZ]]){
    if(Math.abs(delta)<1e-10){if(origin<min||origin>max)return null;continue;}
    const near=(min-origin)/delta,far=(max-origin)/delta;
    start=Math.max(start,Math.min(near,far));end=Math.min(end,Math.max(near,far));
  }
  return end-start<1e-8?null:[start,end].map(t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);
}
function chartPoint(world,point,dx,dz,period){
  const result=surfaceOffset(world,point[0],point[1],dx,dz);
  if(period)result.x+=Math.round((point[0]-result.x)/period)*period;
  return [result.x,result.z];
}
function capsule(world,a,b,radius,period){
  const delta=surfaceDisplacement(world,{x:a[0],z:a[1]},{x:b[0],z:b[1]});
  const angle=Math.atan2(delta.z,delta.x),points=[];
  // Four pieces per semicircle are sufficient at the sub-pixel edge of a
  // breaker. End discs round the visual waterline without moving dry land.
  for(const [point,offset]of [[b,-Math.PI/2],[a,Math.PI/2]])for(let i=0;i<=4;i++){
    const theta=angle+offset+i*Math.PI/4;
    points.push(chartPoint(world,point,Math.cos(theta)*radius,Math.sin(theta)*radius,period));
  }
  return [close(points)];
}

/** A bounded, static water-only fringe. The original coast and all placement
 * masks stay exact. Overlapping rounded capsules are unioned before clipping,
 * so concave inlets contain no stacked transparent strips or land spillover.
 * Workers query only local coast edges, never the complete worldwide mesh.
 */
export function coastalSurfPolygons(world,bounds,{outer=1.35,inner=.40}={}){
  const source=world.terrainSource??world,{tree,period,ocean}=coastIndex(source);
  if(!ocean.length||!bounds)return [];
  const center={x:(bounds.minX+bounds.maxX)/2,z:(bounds.minZ+bounds.maxZ)/2};
  let margin=outer*2;
  for(const z of [bounds.minZ,center.z,bounds.maxZ])margin=Math.max(margin,surfaceChartRadius(source,center.x,z,outer*2));
  const padded=expand(bounds,margin),segments=[];
  for(const shift of period?[0,-period,period]:[0]){
    const query={...padded,minX:padded.minX-shift,maxX:padded.maxX-shift};
    for(const edge of tree.query(query)){
      const clipped=clippedSegment([edge.a[0]+shift,edge.a[1]],[edge.b[0]+shift,edge.b[1]],padded);
      if(clipped)segments.push(clipped);
    }
  }
  if(!segments.length)return [];
  const wide=[],narrow=[];
  for(const [a,b]of segments){
    // Short pieces keep the physical width constant as meridians converge.
    const count=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/16));
    for(let i=0;i<count;i++){
      const point=t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t],p=point(i/count),q=point((i+1)/count);
      wide.push(capsule(source,p,q,outer,period));narrow.push(capsule(source,p,q,inner,period));
    }
  }
  const water=clipPolygonsToBounds(ocean,bounds);
  if(!water.length)return [];
  // A uniform crest is softened by vertex color and the shared surf shader.
  return clipping.intersection(clipping.difference(clipping.union(...wide),clipping.union(...narrow)),water,[rectangle(bounds)]);
}

export function coastalSurfGeometry(world,bounds,y){
  const polygons=coastalSurfPolygons(world,bounds),vertices=[],colors=[],sample=new THREE.Color(),samples=new Map();
  for(const rings of polygons){
    const shape=new THREE.Shape(rings[0].map(([x,z])=>new THREE.Vector2(x,-z)));
    for(const ring of rings.slice(1))shape.holes.push(new THREE.Path(ring.map(([x,z])=>new THREE.Vector2(x,-z))));
    const geometry=new THREE.ShapeGeometry(shape),position=geometry.attributes.position,index=geometry.index;
    const count=index?.count??position.count;
    for(let j=0;j<count;j++){
      const i=index?index.getX(j):j,x=position.getX(i),z=-position.getY(i);
      const key=`${x}:${z}`;let painted=samples.get(key);
      if(!painted){
        oceanColor(world,x,z,sample);
        // The pale, turquoise breaker sits between a wet coastal rim and quiet
        // shelf water. It is painted rather than alpha blended, keeping overdraw
        // and sorting independent of the number of coastline pieces.
        const distance=coastDistance(world,x,z,2),blend=.23+.20*Math.max(0,1-Math.abs(distance-.82)/.65);
        sample.lerp(C.foam,blend);painted=sample.toArray();samples.set(key,painted);
      }
      vertices.push(x,y,z);colors.push(...painted);
    }
    geometry.dispose();
  }
  if(!vertices.length)return null;
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.computeVertexNormals();
  return geometry;
}
