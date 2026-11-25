import * as THREE from 'three';
import clipping from './polygon-ops.js';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';
import { M } from './palette.js';
import { biomeDistance } from './biomes.js';
import {hydrologyFor,riverBankDistance} from './hydrology.js';
import { box, beam, mesh, group, v, solidRibbon } from './geometry.js';
import { sampleLine, distanceToLine, CLEARANCES } from './world-model.js';
import { mountainMeshData, mountainSnowHeight, mountainSurfaceHeight } from './mountain-shape.js';
import {mountainSurfaceColor,mountainTrees} from './mountain-cover.js';
import {tree} from './assets.js';
import {colorTerrainGeometry} from './terrain-colors.js';

const TUNNEL_RADIUS = 1.08;
const TUNNEL_SPRING = 1.80;
const BASE = -3.4;

function polygonShape(rings) {
  const shape=new THREE.Shape(rings[0].map(([x,z])=>new THREE.Vector2(x,-z)));
  for(const ring of rings.slice(1))shape.holes.push(new THREE.Path(ring.map(([x,z])=>new THREE.Vector2(x,-z))));
  return shape;
}

function surface(parent,multi,y,material,depth=0) {
  for(const rings of multi){
    const shape=polygonShape(rings);
    const geometry=depth?new THREE.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:false}):new THREE.ShapeGeometry(shape);
    geometry.rotateX(-Math.PI/2);
    mesh(parent,geometry,material,0,y-depth,0);
  }
}

function clippedEdge(a,b,bounds){
  if(!bounds)return [a,b];
  let start=0,end=1;
  for(const [origin,delta,min,max]of [[a[0],b[0]-a[0],bounds.minX,bounds.maxX],[a[1],b[1]-a[1],bounds.minZ,bounds.maxZ]]){
    if(Math.abs(delta)<1e-10){if(origin<min||origin>max)return null;continue;}
    const near=(min-origin)/delta,far=(max-origin)/delta;
    start=Math.max(start,Math.min(near,far));end=Math.min(end,Math.max(near,far));
  }
  if(end-start<1e-8)return null;
  return [start,end].map(t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);
}

export function buildTerrain(parent,world){
  const island=[world.outline],islandMulti=[island];
  const waterY=world.river.points[0]?.y??-1.2;
  const {water:riverWater,banks:riverBanks}=hydrologyFor(world);
  const ocean=world.biomes?.ocean??[],oceanShore=world.biomes?.oceanShore??[];
  const hasWaterBiome=(world.terrainSource??world).biomes?.regions.some(region=>region.type==='ocean');
  const water=ocean.length?clipping.union(riverWater,ocean):riverWater;
  const bankUnion=oceanShore.length?clipping.union(riverBanks,oceanShore):riverBanks;
  const banks=clipping.difference(bankUnion,water);
  const land=clipping.difference(island,water,banks);
  surface(parent,islandMulti,waterY-.12,'soil',waterY-.12-BASE);
  surface(parent,land,0,'soilLight',-waterY+.12);
  for(const rings of land){
    const base=new THREE.ShapeGeometry(polygonShape(rings));base.rotateX(-Math.PI/2);
    const geometry=colorTerrainGeometry(base,world);base.dispose();
    mesh(parent,geometry,M.terrainVertex,0,.018,0);
  }
  for(const rings of banks){
    const geometry=new THREE.ShapeGeometry(polygonShape(rings));geometry.rotateX(-Math.PI/2);
    const pos=geometry.attributes.position;
    for(let i=0;i<pos.count;i++){
      const x=pos.getX(i),z=pos.getZ(i);
      const riverSlope=riverBankDistance(world,x,z)/.8;
      const oceanSlope=hasWaterBiome?-biomeDistance(world.terrainSource??world,'ocean',x,z)/(world.biomes.shoreWidth??.9):Infinity;
      pos.setY(i,waterY+THREE.MathUtils.clamp(Math.min(riverSlope,oceanSlope),0,1)*(-waterY)+.015);
    }
    geometry.computeVertexNormals();mesh(parent,geometry,'sand');
  }
  surface(parent,riverWater,waterY+.03,'waterLight');
  if(ocean.length){
    surface(parent,ocean,waterY+.035,'ocean');
  }
  // Only the actual island edge gets trim and spillways. Clip those original
  // edges into a local cell, rather than decorating artificial chunk borders.
  const border=world.terrainSource?.outline??world.outline;
  for(let i=0;i<border.length;i++){
    const edge=clippedEdge(border[i],border[(i+1)%border.length],world.terrainChunk?world.bounds:null);
    if(!edge)continue;
    const [a,b]=edge;
    beam(parent,v(a[0],BASE+.55,a[1]),v(b[0],BASE+.55,b[1]),.08,'soilLight',.06);
    const count=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.45);
    for(let j=0;j<count;j++){
      const t=(j+.5)/count,x=THREE.MathUtils.lerp(a[0],b[0],t),z=THREE.MathUtils.lerp(a[1],b[1],t);
      if(riverBankDistance(world,x,z)>-.15)continue;
      // River spillways stop where the river has already joined the ocean.
      if(ocean.length&&biomeDistance(world.terrainSource??world,'ocean',x,z)>-.3)continue;
      const out=v(b[1]-a[1],0,a[0]-b[0]).normalize().multiplyScalar(.06);
      box(parent,x+out.x,(waterY+BASE)/2,z+out.z,.47,waterY-BASE,.16,j%4?'waterLight':'foam',Math.atan2(b[0]-a[0],b[1]-a[1])+Math.PI/2);
    }
  }
  return {waterY};
}

function archProfile(radius=TUNNEL_RADIUS,spring=TUNNEL_SPRING,bottom=-.9){
  const profile=[new THREE.Vector2(-radius,bottom),new THREE.Vector2(radius,bottom)];
  for(let i=0;i<=12;i++){
    const angle=i/12*Math.PI;
    profile.push(new THREE.Vector2(Math.cos(angle)*radius,spring+Math.sin(angle)*radius));
  }
  return profile;
}

// Closed, consistently wound loft: this volume is physically subtracted from rock.
function excavationLoft(line,start,end,profile){
  const n=profile.length,vertices=[],indices=[];
  const steps=Math.max(2,Math.ceil((end-start)/1.0));
  for(let s=0;s<=steps;s++){
    const p=sampleLine(line,start+(end-start)*s/steps),d=p.tangent;
    const lateral=v(d.z,0,-d.x).normalize();
    for(const q of profile)vertices.push(p.x+lateral.x*q.x,p.y+q.y,p.z+lateral.z*q.x);
  }
  for(let s=0;s<steps;s++)for(let j=0;j<n;j++){
    const a=s*n+j,b=s*n+(j+1)%n,c=(s+1)*n+j,d=(s+1)*n+(j+1)%n;
    indices.push(a,b,c,b,d,c);
  }
  for(const tri of THREE.ShapeUtils.triangulateShape(profile,[])){
    indices.push(tri[2],tri[1],tri[0]);
    indices.push(...tri.map(i=>steps*n+i));
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setIndex(indices);geometry.computeVertexNormals();
  return geometry;
}

export function tunnelCutter(line,start,end){
  return excavationLoft(line,start,end,archProfile());
}

export function openCuttingCutter(line,start,end,height){
  // An unroofed cutting reaches beyond the entire mountain. A small outward
  // batter makes its exposed stone walls readable without encroaching on trains.
  const bottom=-.9,top=height+2,floor=TUNNEL_RADIUS,lip=floor+.65;
  return excavationLoft(line,start,end,[new THREE.Vector2(-floor,bottom),
    new THREE.Vector2(floor,bottom),new THREE.Vector2(lip,top),new THREE.Vector2(-lip,top)]);
}

export function createMountainGeometry(mountain,lines){
  const {vertices,triangles}=mountainMeshData(mountain);
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices.flatMap(p=>[p.x,p.y,p.z]),3));
  geometry.setIndex(triangles.flat());geometry.computeVertexNormals();
  if(!triangles.length)return geometry;
  function intersectsSlice(line,start,end){
    const bounds=mountain.renderBounds;if(!bounds||!line.points||!line.distances)return true;
    // Includes the wider cutting lip plus the maximum sampled-arc chord error.
    // Retain full loft sampling for intersecting cuts so adjacent cells use
    // precisely the same excavation surface, including on curved railway arcs.
    const margin=2;
    for(let i=1;i<line.points.length;i++){
      if(line.distances[i]<start||line.distances[i-1]>end)continue;
      const a=line.points[i-1],b=line.points[i];
      if(Math.max(a.x,b.x)+margin>=bounds.minX&&Math.min(a.x,b.x)-margin<=bounds.maxX
        &&Math.max(a.z,b.z)+margin>=bounds.minZ&&Math.min(a.z,b.z)-margin<=bounds.maxZ)return true;
    }
    return false;
  }
  let result=new Brush(geometry,M.rock);result.updateMatrixWorld(true);
  const evaluator=new Evaluator();evaluator.attributes=['position','normal'];evaluator.useGroups=false;
  for(const line of lines)for(const tunnel of (line.cuts??line.tunnels).filter(t=>t.mountainId===mountain.id)){
    const start=Math.max(0,(tunnel.cutStart??tunnel.start)-2);
    const end=Math.min(line.length,(tunnel.cutEnd??tunnel.end)+2);
    if(!intersectsSlice(line,start,end))continue;
    const covered=(line.tunnels??[]).some(span=>span.mountainId===mountain.id
      &&span.start<tunnel.end&&span.end>tunnel.start);
    const cutter=new Brush(covered?tunnelCutter(line,start,end):openCuttingCutter(line,start,end,mountain.height),M.rock);cutter.updateMatrixWorld(true);
    const next=evaluator.evaluate(result,cutter,SUBTRACTION);
    result.geometry.dispose();cutter.geometry.dispose();result=next;result.updateMatrixWorld(true);
  }
  return result.geometry;
}

function tunnelPortal(parent,line,distance,reverse){
  const p=sampleLine(line,distance),d=p.tangent;
  const g=group(parent,p.x,p.y,p.z,Math.atan2(d.x,d.z)+(reverse?Math.PI:0));
  const inner=TUNNEL_RADIUS,outer=inner+.32;
  const s=new THREE.Shape();s.moveTo(-outer,-.46);s.lineTo(-outer,TUNNEL_SPRING);
  s.absarc(0,TUNNEL_SPRING,outer,Math.PI,0,true);s.lineTo(outer,-.46);
  s.lineTo(inner,-.46);s.lineTo(inner,TUNNEL_SPRING);
  s.absarc(0,TUNNEL_SPRING,inner,0,Math.PI,false);s.lineTo(-inner,-.46);s.closePath();
  const geo=new THREE.ExtrudeGeometry(s,{depth:.65,bevelEnabled:false,curveSegments:8});geo.translate(0,0,-.33);
  mesh(g,geo,'platform');
  for(let i=0;i<9;i++){
    const angle=i/8*Math.PI;
    const block=box(g,Math.cos(angle)*(inner+.16),TUNNEL_SPRING+Math.sin(angle)*(inner+.16),-.36,.25,.27,.09,'trim');
    block.rotation.z=angle-Math.PI/2;
  }
  // Retaining cheeks remain outside the train's complete swept envelope.
  for(const side of [-1,1])box(g,side*1.46,.46,0,.32,1.84,1.25,'platform');
}

export function buildMountains(parent,world){
  const result=[];
  for(const mountain of world.mountains){
    const geo=createMountainGeometry(mountain,world.lines);
    const positions=geo.getAttribute('position'),index=geo.getIndex();
    const count=index?index.count:positions.count;
    const vertices=[],colors=[],snow=[],color=new THREE.Color();
    for(let i=0;i<count;i+=3){
      const points=[0,1,2].map(j=>v().fromBufferAttribute(positions,index?index.getX(i+j):i+j));
      const normal=points[1].clone().sub(points[0]).cross(points[2].clone().sub(points[0])).normalize();
      const center=points[0].clone().add(points[1]).add(points[2]).multiplyScalar(1/3);
      // Excavated walls and tunnel ceilings remain exposed stone. Surface
      // cover uses the same global height lookup across every regional slice.
      const surface=normal.y>.18&&Math.abs(center.y-mountainSurfaceHeight(mountain,center.x,center.z))<.025;
      for(const p of points){
        mountainSurfaceColor(world,mountain,p,normal,{surface,target:color});
        vertices.push(p.x,p.y,p.z);colors.push(color.r,color.g,color.b);
      }
      if(mountain.height<=8||normal.y<.48||!surface)continue;
      // Clip snow to the already excavated rock faces. No independent cap can
      // span a tunnel or fill an opening, even on a low or off-centre summit.
      const signed=points.map(p=>p.y-mountainSnowHeight(mountain,p.x,p.z));
      const clipped=[];
      for(let j=0;j<3;j++){
        const next=(j+1)%3,a=points[j],b=points[next],da=signed[j],db=signed[next];
        if(da>=0)clipped.push(a.clone());
        if((da>=0)!==(db>=0))clipped.push(a.clone().lerp(b,da/(da-db)));
      }
      for(let j=1;j<clipped.length-1;j++){
        for(const p of [clipped[0],clipped[j],clipped[j+1]])snow.push(p.x,p.y+.018,p.z);
      }
    }
    if(vertices.length){
      const faces=new THREE.BufferGeometry();faces.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));faces.computeVertexNormals();
      faces.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
      const rock=mesh(parent,faces,M.terrainVertex);rock.name=`mountain-${mountain.id}-surface`;result.push(rock);
    }
    if(snow.length){
      const cap=new THREE.BufferGeometry();cap.setAttribute('position',new THREE.Float32BufferAttribute(snow,3));cap.computeVertexNormals();
      const cover=mesh(parent,cap,'snow');cover.name=`mountain-${mountain.id}-snow`;
    }
    geo.dispose();
    for(const placement of mountainTrees(world,mountain)){
      const pine=tree(parent,placement);pine.name=`mountain-${placement.id}`;
      pine.userData.mountainId=mountain.id;pine.userData.treePlacement=placement;
    }
  }
  for(const line of world.lines)for(const t of line.tunnels){
    const own=distance=>{
      if(!world.terrainChunk)return true;
      const p=sampleLine(line,distance),b=world.bounds;
      return p.x>=b.minX&&p.x<b.maxX&&p.z>=b.minZ&&p.z<b.maxZ;
    };
    if(own(t.start))tunnelPortal(parent,line,t.start,false);
    if(own(t.end))tunnelPortal(parent,line,t.end,true);
  }
  return result;
}

export function buildBridge(parent,line,bridge,waterY,world){
  const start=bridge.start,end=bridge.end;
  const steps=Math.max(1,Math.ceil((end-start)/.30));
  const points=Array.from({length:steps+1},(_,i)=>sampleLine(line,start+(end-start)*i/steps));
  // A single swept deck follows the exact track normal through curved crossings.
  solidRibbon(parent,points,2.42,-.465,-.215,'platform');
  const safe=p=>!world||world.lines.every(other=>other.id===line.id||distanceToLine(other,p.x,p.z)>=1.03);
  for(const side of [-1,1]){
    const edge=points.map(p=>({...p,x:p.x+p.tangent.z*side*1.13,z:p.z-p.tangent.x*side*1.13}));
    // At a turnout over water, the shared deck stays open to the joining line.
    // Guard rails belong only on its outside edge, never across another track.
    let run=[];
    const finish=()=>{if(run.length>1)solidRibbon(parent,run,.10,.06,.18,'trim');run=[];};
    for(const p of edge){if(safe(p))run.push(p);else finish();}finish();
    const count=Math.max(1,Math.ceil((end-start)/2));
    for(let i=0;i<=count;i++){
      const p=sampleLine(line,start+(end-start)*i/count);
      const x=p.x+p.tangent.z*side*1.13,z=p.z-p.tangent.x*side*1.13;
      if(safe({x,z}))box(parent,x,p.y-.06,z,.10,.45,.10,'platform',p.angle);
      if(i===count)continue;
      const q=sampleLine(line,start+(end-start)*(i+1)/count);
      const target={x:q.x+q.tangent.z*side*1.13,z:q.z-q.tangent.x*side*1.13};
      if([0,.25,.5,.75,1].every(t=>safe({x:x+(target.x-x)*t,z:z+(target.z-z)*t})))
        beam(parent,v(x,p.y-.25,z),v(target.x,q.y+.12,target.z),.065,'platform');
    }
  }
  for(const s of [bridge.startAbutment!==false?start:null,bridge.endAbutment!==false?end:null].filter(s=>s!==null)){
    const p=sampleLine(line,s),bottom=waterY-.14,top=p.y-.46;
    box(parent,p.x,(bottom+top)/2,p.z,2.5,top-bottom,.7,'rockLight',p.angle);
  }
}
