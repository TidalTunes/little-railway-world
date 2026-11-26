import {BufferGeometry,Float32BufferAttribute,Matrix4,Vector3} from 'three';
import {box,mesh} from './geometry.js';
import {rigidSurfacePoseMatrix,surfaceCoordinates} from './world-surface.js';

const frame=new Matrix4(),point=new Vector3();
/** Cross sections use an orthonormal surface frame, never the chart Jacobian. */
export function physicalRailPoint(world,p,across=0,height=0,target=new Vector3()){
  rigidSurfacePoseMatrix(world,p.x,p.y,p.z,p.angle??Math.atan2(p.tangent.x,p.tangent.z),frame);
  return target.set(across,height,0).applyMatrix4(frame);
}
export function physicalRailChartPoint(world,p,across=0,height=0,target={}){
  return surfaceCoordinates(world,physicalRailPoint(world,p,across,height,point),target);
}
export function physicalRailBox(parent,world,p,across,height,w,h,d,material){
  const result=box(parent,0,0,0,w,h,d,material);
  rigidSurfacePoseMatrix(world,p.x,p.y,p.z,p.angle??Math.atan2(p.tangent.x,p.tangent.z),frame);
  point.set(across,height,0).applyMatrix4(frame);frame.setPosition(point);
  result.applyMatrix4(frame);result.userData.surfaceSpace=true;return result;
}
export function physicalRailRibbon(parent,world,points,width,bottom,top,material,across=0){
  const vertices=[],indices=[];
  points.forEach((p,i)=>{
    rigidSurfacePoseMatrix(world,p.x,p.y,p.z,p.angle??Math.atan2(p.tangent.x,p.tangent.z),frame);
    for(const [x,y] of [[across-width/2,bottom],[across+width/2,bottom],[across-width/2,top],[across+width/2,top]]){
      point.set(x,y,0).applyMatrix4(frame);vertices.push(point.x,point.y,point.z);
    }
    if(i<points.length-1){const j=i*4;indices.push(j+2,j+6,j+3,j+3,j+6,j+7,j,j+4,j+2,j+2,j+4,j+6,
      j+1,j+3,j+5,j+3,j+7,j+5,j,j+1,j+4,j+1,j+5,j+4);}
  });
  const j=(points.length-1)*4;indices.push(0,2,1,1,2,3,j,j+1,j+2,j+1,j+3,j+2);
  const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(vertices,3));
  geometry.setIndex(indices);geometry.computeVertexNormals();
  const result=mesh(parent,geometry,material);result.userData.surfaceSpace=true;return result;
}
