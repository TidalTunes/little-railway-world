import * as THREE from 'three';
import clipping from 'polygon-clipping';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';
import { M } from './palette.js';
import { box, beam, mesh, group, v } from './geometry.js';
import { sampleLine, CLEARANCES } from './world-model.js';

const TUNNEL_RADIUS = 1.08;
const TUNNEL_SPRING = 1.80;
const BASE = -3.4;

function ribbonRing(points, width) {
  const left=[], right=[];
  points.forEach((p,i)=>{
    const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)];
    const n=v(b.z-a.z,0,a.x-b.x).normalize().multiplyScalar(width/2);
    left.push([p.x+n.x,p.z+n.z]);right.push([p.x-n.x,p.z-n.z]);
  });
  const ring=left.concat(right.reverse());return [...ring,ring[0]];
}

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

function distanceToRiver(points,x,z){
  let best=Infinity;
  for(let i=1;i<points.length;i++){
    const a=points[i-1],b=points[i],dx=b.x-a.x,dz=b.z-a.z;
    const t=THREE.MathUtils.clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1),0,1);
    best=Math.min(best,Math.hypot(x-a.x-t*dx,z-a.z-t*dz));
  }return best;
}

export function buildTerrain(parent,world){
  const island=[world.outline];
  const waterY=world.river.points[0]?.y??-1.2;
  const waterRing=ribbonRing(world.river.points,world.river.width);
  const bankRing=ribbonRing(world.river.points,world.river.width+1.6);
  const land=clipping.difference(island,[bankRing]);
  const banks=clipping.intersection(island,clipping.difference([bankRing],[waterRing]));
  const water=clipping.intersection(island,[waterRing]);
  surface(parent,[island],waterY-.12,'soil',waterY-.12-BASE);
  surface(parent,land,0,'soilLight',-waterY+.12);
  surface(parent,land,.018,'grass');
  for(const rings of banks){
    const geometry=new THREE.ShapeGeometry(polygonShape(rings));geometry.rotateX(-Math.PI/2);
    const pos=geometry.attributes.position;
    for(let i=0;i<pos.count;i++){
      const distance=distanceToRiver(world.river.points,pos.getX(i),pos.getZ(i));
      pos.setY(i,waterY+THREE.MathUtils.clamp((distance-world.river.width/2)/.8,0,1)*(-waterY)+.015);
    }
    geometry.computeVertexNormals();mesh(parent,geometry,'sand');
  }
  surface(parent,water,waterY+.03,'waterLight');
  // Thin strata and spillways follow the island boundary, not fixed coordinates.
  for(let i=0;i<world.outline.length;i++){
    const a=world.outline[i],b=world.outline[(i+1)%world.outline.length];
    beam(parent,v(a[0],BASE+.55,a[1]),v(b[0],BASE+.55,b[1]),.08,'soilLight',.06);
    const count=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.45);
    for(let j=0;j<count;j++){
      const t=(j+.5)/count,x=THREE.MathUtils.lerp(a[0],b[0],t),z=THREE.MathUtils.lerp(a[1],b[1],t);
      if(distanceToRiver(world.river.points,x,z)>world.river.width/2-.15)continue;
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
export function tunnelCutter(line,start,end){
  const profile=archProfile(),n=profile.length,vertices=[],indices=[];
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

export function createMountainGeometry(mountain,lines){
  const cone=new THREE.ConeGeometry(mountain.radius,mountain.height,CLEARANCES.mountainFacets,1);
  cone.translate(mountain.x,mountain.height/2,mountain.z);cone.clearGroups();
  let result=new Brush(cone,M.rock);result.updateMatrixWorld(true);
  const evaluator=new Evaluator();evaluator.attributes=['position','normal'];evaluator.useGroups=false;
  for(const line of lines)for(const tunnel of (line.cuts??line.tunnels).filter(t=>t.mountainId===mountain.id)){
    const start=Math.max(0,(tunnel.cutStart??tunnel.start)-2);
    const end=Math.min(line.length,(tunnel.cutEnd??tunnel.end)+2);
    const cutter=new Brush(tunnelCutter(line,start,end),M.rock);cutter.updateMatrixWorld(true);
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
    const rock=mesh(parent,geo,'rock');result.push(rock);
    if(mountain.height>8){
      const capFraction=.27;
      const cap=new THREE.ConeGeometry(mountain.radius*capFraction+.012,mountain.height*capFraction,CLEARANCES.mountainFacets);
      cap.translate(mountain.x,mountain.height*(1-capFraction/2)+.015,mountain.z);
      mesh(parent,cap,'snow');
    }
  }
  for(const line of world.lines)for(const t of line.tunnels){
    tunnelPortal(parent,line,t.start,false);tunnelPortal(parent,line,t.end,true);
  }
  return result;
}

export function buildBridge(parent,line,bridge,waterY){
  const start=bridge.start,end=bridge.end;
  const count=Math.max(1,Math.ceil((end-start)/2));
  for(let i=0;i<count;i++){
    const a=sampleLine(line,THREE.MathUtils.lerp(start,end,i/count));
    const b=sampleLine(line,THREE.MathUtils.lerp(start,end,(i+1)/count));
    // Oriented decks keep the full track width on every route bearing.
    const angle=Math.atan2(b.x-a.x,b.z-a.z),length=Math.hypot(b.x-a.x,b.z-a.z)+.035;
    const g=group(parent,(a.x+b.x)/2,0,(a.z+b.z)/2,angle);
    box(g,0,(a.y+b.y)/2-.34,0,2.42,.25,length,'platform');
    for(const side of [-1,1]){
      box(g,side*1.13,(a.y+b.y)/2+.12,0,.10,.12,length,'trim');
      box(g,side*1.13,(a.y+b.y)/2-.06,-length/2,.10,.45,.10,'platform');
      beam(g,v(side*1.13,a.y-.25,-length/2),v(side*1.13,b.y+.12,length/2),.065,'platform');
    }
  }
  for(const s of [start,end]){
    const p=sampleLine(line,s),bottom=waterY-.14,top=p.y-.46;
    box(parent,p.x,(bottom+top)/2,p.z,2.5,top-bottom,.7,'rockLight',p.angle);
  }
}
