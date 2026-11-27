import {Vector3} from 'three';
import {surfacePoint} from './world-surface.js';

/** Match the city level badge's screen position, with a generous hit area for
 * the town beneath it. A click never depends on streamed building geometry. */
export function pickRailwayCity(world,cities,camera,pointer,{width,height}={}){
  if(!camera||!pointer||!width||!height)return null;
  camera.updateMatrixWorld(true);
  const point=new Vector3();let chosen=null,best=Infinity;
  for(const city of cities){
    if(!(city.level>=1))continue;
    surfacePoint(world,city.x,city.y??.7,city.z,point).project(camera);
    if(point.z< -1||point.z>1)continue;
    const dx=(point.x-pointer.x)*width/2,dy=(pointer.y-point.y)*height/2;
    const distance=Math.min(Math.hypot(dx,dy-24),Math.hypot(dx,dy));
    if(distance<=32&&distance<best){best=distance;chosen=city;}
  }
  return chosen;
}

export function railwayCityLabel(city,ownerId){
  if(!city)return '';
  if(city.name)return `${city.name} · ${city.level}`;
  const owner=city.ownerId===ownerId?'Your':['neutral','village-gray'].includes(city.ownerId)?'Village':`${String(city.ownerId??'').replace(/^./,letter=>letter.toUpperCase())}`;
  return `${owner} city · ${city.level}`;
}
