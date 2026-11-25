import { group, cylinder, ico, consolidate, ribbon } from './geometry.js';
import { buildTerrain, buildMountains } from './geography.js';
import { buildRailways } from './railway.js';
import { house, station, tree, landmark, apartment, civic, plaza, tower, farmPatch, sheep, person, cactus } from './assets.js';
import { createPlayerPalette } from './player-palette.js';
import { biomeAt } from './biomes.js';

const WALLS=['plaster','peach','sage','blush','plaster','blue'];

export function buildWorld(parent,world,{terrain=true}={}){
  const root=group(parent);root.name='landscape';
  const palettes=new Map((world.players??[]).map(player=>[player.id,createPlayerPalette(player)]));
  const cities=new Map(world.cities.map(city=>[city.id,city]));
  const paletteFor=p=>palettes.get(p.ownerId??cities.get(p.cityId)?.ownerId);
  root.userData.ownedMaterials=[...palettes.values()].flatMap(palette=>Object.values(palette));
  if(terrain)buildTerrain(root,world);
  buildMountains(root,world);
  for(const street of world.cityStreets??[]){
    if(street.points.length<2)continue;
    const a=street.points[0],b=street.points.at(-1);
    const material=world.biomes&&biomeAt(world,(a.x+b.x)/2,(a.z+b.z)/2)==='desert'?'gravel':'sand';
    ribbon(root,street.points.map(p=>({...p,y:.026})),street.width,material);
  }
  buildRailways(root,world);
  for(const p of world.placements){
    const palette=paletteFor(p);
    if(p.kind==='house'){
      house(root,{...p,color:WALLS[p.variant%WALLS.length],palette});
    }else if(p.kind==='landmark'){
      const scale=p.scale??1;
      cylinder(root,p.x,(p.y??0)+.032*scale,p.z,1.95*scale,1.95*scale,.025*scale,'sand',12);
      landmark(root,{...p,palette});
    }else if(p.kind==='apartment')apartment(root,{...p,palette});
    else if(p.kind==='civic')civic(root,{...p,palette});
    else if(p.kind==='plaza')plaza(root,{...p,palette});
    else if(p.kind==='tower')tower(root,{...p,palette});
    else if(p.kind==='farm')farmPatch(root,p);
    else if(p.kind==='sheep')sheep(root,p);
    else if(p.kind==='cactus')cactus(root,p);
    else if(p.kind==='tree')tree(root,{...p,variant:{pine:Math.floor(p.scale*7)%3,round:3,gold:4}[p.variant]??0});
    else if(p.kind==='rock')ico(root,p.x,.30*p.scale,p.z,.60*p.scale,.5*p.scale,.58*p.scale,p.biome==='desert'?'desertRock':p.variant%2?'rockLight':'rock');
  }
  world.stations.forEach((p,i)=>{
    const palette=paletteFor(p),s=station(root,{...p,color:WALLS[i%WALLS.length],palette});
    // These passengers occupy the clear front strip of the reserved platform.
    person(s,{x:.65,y:.21,z:.83,color:palette?.body??'redLight',rotation:Math.PI});
    person(s,{x:2.22,y:.21,z:.83,color:palette?.accent??'teal',variant:1});
  });
  return consolidate(root);
}

export { createWorldRenderer } from './world-renderer.js';
