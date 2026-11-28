import {Vector3} from 'three';
import {surfaceFor,surfacePoint,surfaceNormal} from './world-surface.js';

/** Reproject the clicked rail, rather than pinning a purchase to a screen
 * corner. Scratch vectors stay local to the HUD, with no frame allocations. */
export function createLoopHudAnchor(world){
  const point=new Vector3(),normal=new Vector3(),eye=new Vector3(),result={x:0,y:0,below:false};
  return function project(anchor,camera,{width,height}={}){
    if(!camera||!Number.isFinite(anchor?.x)||!Number.isFinite(anchor?.z)||(anchor.y!==undefined&&!Number.isFinite(anchor.y))||!(width>0&&height>0))return null;
    camera.updateMatrixWorld(true);
    surfacePoint(world,anchor.x,anchor.y??.6,anchor.z,point);
    if(surfaceFor(world)&&surfaceNormal(world,anchor.x,anchor.z,normal).dot(eye.copy(camera.position).sub(point))<=0)return null;
    point.project(camera);
    if(point.z< -1||point.z>1||Math.abs(point.x)>1||Math.abs(point.y)>1)return null;
    result.x=(point.x+1)*width/2;result.y=(1-point.y)*height/2;
    result.below=result.y<78;
    return result;
  };
}
