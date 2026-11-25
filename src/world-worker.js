import { generateWorld,generateWorldRegion,validateWorld } from './world-model.js';
import { compileDetailPacket } from './detail-compiler.js';
import { createMountainContours } from './mountain-contours.js';
import { prepareMapTerrain } from './map-terrain.js';
import { compileMapTerrainGeometry } from './map-terrain-geometry.js';

let world;
function buffersOf(value,result=new Set()){
  if(ArrayBuffer.isView(value))result.add(value.buffer);
  else if(value instanceof ArrayBuffer)result.add(value);
  else if(value&&typeof value==='object')for(const child of Object.values(value))buffersOf(child,result);
  return result;
}
self.onmessage=({data:{id,type,payload}})=>{
  try{
    const start=performance.now();let result;
    if(type==='generate'){
      world=generateWorld(payload,{detail:'network'});
      for(const mountain of world.mountains)if(mountain.range)mountain.mapContours=createMountainContours(mountain);
      world.mapTerrain={meshes:compileMapTerrainGeometry(prepareMapTerrain(world))};
      const violations=validateWorld(world);
      if(violations.length)throw new Error(`Invalid world: ${violations[0].detail??violations[0].type}`);
      result={world,milliseconds:performance.now()-start};
    }else if(type==='chunk'){
      if(!world)throw new Error('Generate a world before requesting detail');
      const region=generateWorldRegion(world,payload);
      result=compileDetailPacket(region,world);
      result.milliseconds=performance.now()-start;
    }else throw new Error(`Unknown world request: ${type}`);
    self.postMessage({id,result},type==='chunk'?[...buffersOf(result)]
      :type==='generate'?[...buffersOf(world.mapTerrain)]:[]);
  }catch(error){self.postMessage({id,error:{name:error.name,message:error.message}});}
};
