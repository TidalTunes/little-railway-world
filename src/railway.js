import * as THREE from 'three';
import { box, mesh, v, consolidate } from './geometry.js';
import { buildTrainCar } from './assets.js';
import { buildBridge } from './geography.js';
import { sampleLine } from './world-model.js';
import { createTraffic } from './traffic.js';

const LIVERY = {coral:'redLight',teal:'teal',gold:'gold',blue:'blue'};

// Solid strips put ballast on the ground, sleepers on ballast and rails on
// sleepers. The same vertical datum continues across a bridge and into a tunnel.
function strip(parent,points,width,bottom,top,material){
  const vertices=[],indices=[];
  points.forEach((p,i)=>{
    const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)];
    const n=v(b.z-a.z,0,a.x-b.x).normalize().multiplyScalar(width/2);
    vertices.push(p.x-n.x,p.y+bottom,p.z-n.z,p.x+n.x,p.y+bottom,p.z+n.z,
      p.x-n.x,p.y+top,p.z-n.z,p.x+n.x,p.y+top,p.z+n.z);
    if(i<points.length-1){const j=i*4;
      indices.push(j+2,j+6,j+3,j+3,j+6,j+7, j,j+4,j+2,j+2,j+4,j+6,
        j+1,j+3,j+5,j+3,j+7,j+5, j,j+1,j+4,j+1,j+5,j+4);
    }
  });
  const j=(points.length-1)*4;indices.push(0,2,1,1,2,3,j,j+1,j+2,j+1,j+3,j+2);
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geometry.setIndex(indices);geometry.computeVertexNormals();return mesh(parent,geometry,material);
}

export function buildRailways(parent,world){
  for(const line of world.lines){
    strip(parent,line.points,1.88,-.42,-.19,'gravel');
    for(let s=.4;s<line.length;s+=.85){
      const p=sampleLine(line,s);
      box(parent,p.x,p.y-.14,p.z,1.56,.10,.23,'timber',p.angle);
    }
    for(const side of [-1,1]){
      const rail=line.points.map((p,i)=>{
        const a=line.points[Math.max(0,i-1)],b=line.points[Math.min(line.points.length-1,i+1)];
        const normal=v(b.z-a.z,0,a.x-b.x).normalize().multiplyScalar(side*.46);
        return v(p.x+normal.x,p.y,p.z+normal.z);
      });
      strip(parent,rail,.095,-.09,0,'rail');
    }
    for(const span of line.bridges)buildBridge(parent,line,span,world.river.y);
  }
}

// Fixed double-ended consists reverse velocity at a station without flipping or
// teleporting their carriages. Crossing reservations live in the pure simulator.
export function makeTrains(parent,world){
  const traffic=createTraffic(world);
  traffic.update(16);
  const trains=traffic.trains.map(state=>{
    const line=world.lines.find(line=>line.id===state.lineId);
    const parts=Array.from({length:state.count},(_,i)=>consolidate(buildTrainCar(parent,{
      color:LIVERY[line.color]??'redLight',cab:i===0||i===state.count-1,
    })));
    return {line,state,parts,update(){
      parts.forEach((car,i)=>{
        const distance=state.distance+(i-(state.count-1)/2)*state.spacing;
        const p=sampleLine(line,distance),front=sampleLine(line,distance+.65),back=sampleLine(line,distance-.65);
        car.position.set(p.x,p.y,p.z);
        car.rotation.y=Math.atan2(front.x-back.x,front.z-back.z)+(i===0?Math.PI:0);
        car.visible=state.active;
      });
    }};
  });
  trains.forEach(train=>train.update());
  return {trains,update(dt){traffic.update(dt);trains.forEach(train=>train.update());}};
}
