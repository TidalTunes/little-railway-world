import {Matrix4,Quaternion,Vector3} from 'three';
import {rigidSurfacePoseMatrix} from './world-surface.js';

/** Keep an asset's local dimensions separate from the geographic chart metric.
 * Outer rigid roots carry their entire hierarchy (including passengers and
 * farm details); applying the surface frame to their children again would bend
 * an otherwise rigid object. Already-spherical construction is simply moved
 * into the same output group before the remaining chart geometry is merged.
 */
export function extractRigidSurfaceAssets(chartRoot,surfaceRoot,world){
  chartRoot.updateWorldMatrix(true,true);
  const inverse=chartRoot.matrixWorld.clone().invert(),matrix=new Matrix4();
  const position=new Vector3(),rotation=new Quaternion(),scale=new Vector3();
  const roots=[];
  const visit=node=>{
    if(node!==chartRoot&&(node.userData.rigidSurfaceAsset||node.userData.surfaceSpace)){
      roots.push(node);return;
    }
    for(const child of node.children)visit(child);
  };
  visit(chartRoot);
  for(const node of roots){
    matrix.multiplyMatrices(inverse,node.matrixWorld);
    if(!node.userData.surfaceSpace){
      matrix.decompose(position,rotation,scale);
      // All asset roots have chart yaw; arbitrary roof/wheel attitudes remain
      // beneath them. Derive +Z from the composed transform for nested roots.
      const angle=Math.atan2(matrix.elements[8],matrix.elements[10]);
      rigidSurfacePoseMatrix(world,position.x,position.y,position.z,angle,matrix).scale(scale);
    }
    surfaceRoot.add(node);
    node.matrixAutoUpdate=false;node.matrix.copy(matrix);node.matrixWorldNeedsUpdate=true;
    node.userData.surfaceSpace=true;
  }
  return surfaceRoot;
}
