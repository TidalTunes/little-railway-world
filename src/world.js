import { group, cylinder, ico, consolidate, ribbon } from './geometry.js';
import { buildTerrain, buildMountains } from './geography.js';
import { buildRailways } from './railway.js';
import { house, station, tree, landmark, apartment, civic, plaza, tower, farmPatch, sheep, person, cactus } from './assets.js';
import { createPlayerPalette } from './player-palette.js';
import { biomeAt } from './biomes.js';
import {extractRigidSurfaceAssets} from './rigid-surface-assets.js';
import {physicalRailRibbon} from './physical-rail-geometry.js';
import {surfaceDisplacement,chartHeadingForSurface} from './world-surface.js';

const WALLS=['plaster','peach','sage','blush','plaster','blue'];

export function buildWorld(parent,world,{terrain=true,rigidAssets=null}={}){
  const root=group(parent);root.name='landscape';
  const palettes=new Map((world.players??[]).map(player=>[player.id,createPlayerPalette(player)]));
  const cities=new Map(world.cities.map(city=>[city.id,city]));
  const paletteFor=p=>palettes.get(p.ownerId??cities.get(p.cityId)?.ownerId);
  root.userData.ownedMaterials=[...palettes.values()].flatMap(palette=>Object.values(palette));
  if(terrain)buildTerrain(root,world);
  buildMountains(root,world,{surfaceRoot:rigidAssets});
  for(const street of world.cityStreets??[]){
    if(street.points.length<2)continue;
    const middle=street.points[Math.floor(street.points.length/2)];
    const material=world.biomes&&biomeAt(world,middle.x,middle.z)==='desert'?'gravel':'sand';
    if(rigidAssets){
      const points=street.points.map((p,i)=>{
        const a=street.points[Math.max(0,i-1)],b=street.points[Math.min(street.points.length-1,i+1)];
        const before=surfaceDisplacement(world,p,a),after=surfaceDisplacement(world,p,b);
        return{...p,y:0,angle:chartHeadingForSurface(world,p.x,p.z,Math.atan2(after.x-before.x,after.z-before.z))};
      });
      physicalRailRibbon(rigidAssets,world,points,street.width,.018,.026,material);
    }else ribbon(root,street.points.map(p=>({...p,y:.026})),street.width,material);
  }
  buildRailways(root,world,{surfaceRoot:rigidAssets});
  for(const p of world.placements){
    const palette=paletteFor(p);
    if(p.kind==='house'){
      house(root,{...p,color:WALLS[p.variant%WALLS.length],palette});
    }else if(p.kind==='landmark'){
      const scale=p.scale??1;
      cylinder(root,p.x,(p.y??0)+.032*scale,p.z,1.95*scale,1.95*scale,.025*scale,'sand',12).userData.rigidSurfaceAsset=true;
      landmark(root,{...p,palette});
    }else if(p.kind==='apartment')apartment(root,{...p,palette});
    else if(p.kind==='civic')civic(root,{...p,palette});
    else if(p.kind==='plaza')plaza(root,{...p,palette});
    else if(p.kind==='tower')tower(root,{...p,palette});
    else if(p.kind==='farm')farmPatch(root,p);
    else if(p.kind==='sheep')sheep(root,p);
    else if(p.kind==='cactus')cactus(root,p);
    else if(p.kind==='tree')tree(root,{...p,variant:{pine:Math.floor(p.scale*7)%3,round:3,gold:4}[p.variant]??0});
    else if(p.kind==='rock')ico(root,p.x,.30*p.scale,p.z,.60*p.scale,.5*p.scale,.58*p.scale,p.biome==='desert'?'desertRock':p.variant%2?'rockLight':'rock').userData.rigidSurfaceAsset=true;
  }
  world.stations.forEach((p,i)=>{
    const palette=paletteFor(p),s=station(root,{...p,color:WALLS[i%WALLS.length],palette});
    // These passengers occupy the clear front strip of the reserved platform.
    person(s,{x:.65,y:.21,z:.83,color:palette?.body??'redLight',rotation:Math.PI});
    person(s,{x:2.22,y:.21,z:.83,color:palette?.accent??'teal',variant:1});
  });
  if(rigidAssets)extractRigidSurfaceAssets(root,rigidAssets,world);
  return consolidate(root);
}

export { createWorldRenderer } from './world-renderer.js';
