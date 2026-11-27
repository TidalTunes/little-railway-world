import { group, cylinder, ico, consolidate } from './geometry.js';
import {Float32BufferAttribute} from 'three';
import { buildTerrain, buildMountains } from './geography.js';
import { buildRailways } from './railway.js';
import { house, station, tree, landmark, apartment, civic, plaza, tower, farmPatch, sheep, person, cactus } from './assets.js';
import {naturePatch} from './nature-assets.js';
import { createPlayerPalette } from './player-palette.js';
import {extractRigidSurfaceAssets} from './rigid-surface-assets.js';
import {buildCityStreets} from './city-streets.js';

const WALLS=['plaster','peach','sage','blush','plaster','blue'];

export function buildWorld(parent,world,{terrain=true,rigidAssets=null,animatedLife=false,mutablePlacements=null}={}){
  const root=group(parent);root.name='landscape';
  const palettes=new Map((world.players??[]).map(player=>[player.id,createPlayerPalette(player)]));
  const cities=new Map(world.cities.map(city=>[city.id,city]));
  const paletteFor=p=>palettes.get(p.ownerId??cities.get(p.cityId)?.ownerId);
  root.userData.ownedMaterials=[...palettes.values()].flatMap(palette=>Object.values(palette));
  if(terrain)buildTerrain(root,world);
  buildMountains(root,world,{surfaceRoot:rigidAssets});
  buildCityStreets(root,world,{surfaceRoot:rigidAssets});
  buildRailways(root,world,{surfaceRoot:rigidAssets});
  for(const p of world.placements){
    const firstChild=root.children.length;
    const palette=paletteFor(p);
    if(p.kind==='house'){
      house(root,{...p,color:WALLS[p.variant%WALLS.length],palette});
    }else if(p.kind==='landmark'){
      const scale=p.scale??1;
      cylinder(root,p.x,(p.y??0)+.032*scale,p.z,1.95*scale,1.95*scale,.025*scale,'sand',12).userData.rigidSurfaceAsset=true;
      landmark(root,{...p,palette,animatedClocks:animatedLife});
    }else if(p.kind==='apartment')apartment(root,{...p,palette});
    else if(p.kind==='civic')civic(root,{...p,palette,animatedClocks:animatedLife});
    else if(p.kind==='plaza')plaza(root,{...p,palette});
    else if(p.kind==='tower')tower(root,{...p,palette});
    else if(p.kind==='farm')farmPatch(root,{...p,animatedLife});
    else if(p.kind==='nature')naturePatch(root,p);
    else if(p.kind==='sheep'&&!animatedLife)sheep(root,p);
    else if(p.kind==='cactus')cactus(root,p);
    else if(p.kind==='tree')tree(root,{...p,variant:{pine:Math.floor(p.scale*7)%3,round:3,gold:4,light:5,broadleaf:6,acacia:7,birch:8}[p.variant]??0});
    else if(p.kind==='rock')ico(root,p.x,.30*p.scale,p.z,.60*p.scale,.5*p.scale,.58*p.scale,p.biome==='desert'?'desertRock':p.variant%2?'rockLight':'rock').userData.rigidSurfaceAsset=true;
    const sceneryIndex=mutablePlacements?.get(p)??0;
    if(sceneryIndex)for(const child of root.children.slice(firstChild))child.traverse(node=>{
      if(!node.isMesh)return;
      // Some primitives borrow a unit box. Metadata belongs to this asset,
      // never the shared template used by every other building and field.
      node.geometry=node.geometry.clone();
      const indices=new Float32Array(node.geometry.attributes.position.count);indices.fill(sceneryIndex);
      node.geometry.setAttribute('sceneryIndex',new Float32BufferAttribute(indices,1));
    });
  }
  world.stations.forEach((p,i)=>{
    const palette=paletteFor(p),s=station(root,{...p,color:WALLS[i%WALLS.length],palette});
    // These passengers occupy the clear front strip of the reserved platform.
    person(s,{x:.65,y:.21,z:.83,color:palette?.body??'redLight',rotation:Math.PI});
    person(s,{x:2.22,y:.21,z:.83,color:palette?.accent??'teal',variant:1});
  });
  if(mutablePlacements)root.traverse(node=>{if(node.isMesh&&!node.geometry.attributes.sceneryIndex){
    node.geometry=node.geometry.clone();node.geometry.setAttribute('sceneryIndex',new Float32BufferAttribute(new Float32Array(node.geometry.attributes.position.count),1));
  }});
  if(rigidAssets)extractRigidSurfaceAssets(root,rigidAssets,world);
  return consolidate(root);
}

export { createWorldRenderer } from './world-renderer.js';
