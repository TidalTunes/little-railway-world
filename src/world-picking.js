import {Vector3,Sphere} from 'three';
import {surfaceCoordinates} from './world-surface.js';
import {worldSurface} from './world-model.js';

/** A chart-space pick from a ray already expressed in the world root's frame.
 * The same inverse is used by rail editing, RTS orders and weapon aiming. */
export function pickWorldGround(world,ray,{surfaceAt=worldSurface,flat=false}={}){
  const point=new Vector3(),chart={},radius=world.surface?.radius;
  let height=0;
  for(let step=0;step<8;step++){
    if(radius){
      if(!ray.intersectSphere(new Sphere(new Vector3(0,-radius,0),radius+height),point))return null;
      surfaceCoordinates(world,point,chart);
    }else{
      if(Math.abs(ray.direction.y)<1e-8)return null;
      const distance=(height-ray.origin.y)/ray.direction.y;if(distance<0)return null;
      ray.at(distance,point);chart.x=point.x;chart.z=point.z;
    }
    const next=flat?0:surfaceAt(world,chart.x,chart.z).height;
    if(!Number.isFinite(next))return null;
    if(Math.abs(next-height)<.025)return{x:chart.x,y:next,z:chart.z};
    height=next;
  }
  return{x:chart.x,y:height,z:chart.z};
}
