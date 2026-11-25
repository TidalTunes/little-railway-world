import { box, solidRibbon, consolidate } from './geometry.js';
import { buildTrainCar } from './assets.js';
import { buildBridge } from './geography.js';
import { sampleLine } from './world-model.js';
import { createNetworkTraffic } from './network-traffic.js';
import { createPlayerPalette } from './player-palette.js';

const LIVERY = {coral:'redLight',teal:'teal',gold:'gold',blue:'blue'};


export function buildRailways(parent,world){
  for(const line of world.lines){
    for(const range of line.renderRanges??[{start:0,end:line.length}]){
      const steps=Math.max(1,Math.ceil((range.end-range.start)/.30));
      const points=Array.from({length:steps+1},(_,i)=>sampleLine(line,range.start+(range.end-range.start)*i/steps));
      solidRibbon(parent,points,1.88,-.42,-.19,'gravel');
      for(let s=range.start+.4;s<range.end-.2;s+=.85){
        const p=sampleLine(line,s);
        box(parent,p.x,p.y-.14,p.z,1.56,.10,.23,'timber',p.angle);
      }
      for(const side of [-1,1]){
        const rail=points.map(p=>({x:p.x+p.tangent.z*side*.46,y:p.y,z:p.z-p.tangent.x*side*.46,tangent:p.tangent}));
        solidRibbon(parent,rail,.095,-.09,0,'rail');
      }
    }
    for(const span of line.bridges)for(const range of line.renderRanges??[{start:0,end:line.length}]){
      const start=Math.max(span.start,range.start),end=Math.min(span.end,range.end);
      if(end-start<1e-6)continue;
      buildBridge(parent,line,{...span,start,end,
        startAbutment:Math.abs(start-span.start)<1e-6,
        endAbutment:Math.abs(end-span.end)<1e-6},world.river.y,world);
    }
  }
}

// Carriages follow one continuous arc-length path through city connections.
// Reversible shuttles remain available for authored networks without a circuit.
export function makeTrains(parent,world){
  const traffic=createNetworkTraffic(world);
  const palettes=new Map((world.players??[]).map(player=>[player.id,createPlayerPalette(player)]));
  parent.userData.ownedMaterials=[...(parent.userData.ownedMaterials??[]),
    ...[...palettes.values()].flatMap(palette=>Object.values(palette))];
  const trains=traffic.trains.map(state=>{
    const parts=Array.from({length:state.count},(_,i)=>consolidate(buildTrainCar(parent,{
      color:LIVERY[state.color]??'redLight',palette:palettes.get(state.ownerId),cab:i===0||i===state.count-1,
    })));
    parts.forEach(part=>{part.userData.trainId=state.id;});
    return {state,parts,update(){
      parts.forEach((car,i)=>{
        const offset=(i-(state.count-1)/2)*state.spacing;
        const p=traffic.sampleTrain(state,offset);
        car.position.set(p.x,p.y,p.z);
        car.rotation.y=p.angle+(i===0?Math.PI:0);
        car.visible=state.active;
      });
    }};
  });
  trains.forEach(train=>train.update());
  return {trains,update(dt){traffic.update(dt);trains.forEach(train=>train.update());}};
}
