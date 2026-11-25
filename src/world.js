import { group, cylinder, ico, consolidate } from './geometry.js';
import { buildTerrain, buildMountains } from './geography.js';
import { buildRailways } from './railway.js';
import { house, station, tree, landmark, farmPatch, sheep, person, cactus } from './assets.js';

const WALLS=['plaster','peach','sage','blush','plaster','blue'];

export function buildWorld(parent,world){
  const root=group(parent);root.name='landscape';
  buildTerrain(root,world);
  buildMountains(root,world);
  buildRailways(root,world);
  for(const p of world.placements){
    if(p.kind==='house'){
      house(root,{...p,color:WALLS[p.variant%WALLS.length]});
    }else if(p.kind==='landmark'){
      cylinder(root,p.x,.032,p.z,1.95,1.95,.025,'sand',12);
      landmark(root,p);
    }else if(p.kind==='farm')farmPatch(root,p);
    else if(p.kind==='sheep')sheep(root,p);
    else if(p.kind==='cactus')cactus(root,p);
    else if(p.kind==='tree')tree(root,{...p,variant:{pine:Math.floor(p.scale*7)%3,round:3,gold:4}[p.variant]??0});
    else if(p.kind==='rock')ico(root,p.x,.30*p.scale,p.z,.60*p.scale,.5*p.scale,.58*p.scale,p.biome==='desert'?'desertRock':p.variant%2?'rockLight':'rock');
  }
  world.stations.forEach((p,i)=>{
    const s=station(root,{...p,color:WALLS[i%WALLS.length]});
    // These passengers occupy the clear front strip of the reserved platform.
    person(s,{x:.65,y:.21,z:.83,color:'redLight',rotation:Math.PI});
    person(s,{x:2.22,y:.21,z:.83,color:'teal',variant:1});
  });
  return consolidate(root);
}
