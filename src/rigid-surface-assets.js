import {Matrix4,Quaternion,Vector3} from 'three';
import {rigidSurfacePoseMatrix} from './world-surface.js';
import {tessellateSurfaceGeometry} from './surface-tessellation.js';

/** An estate is authored in physical local units. Drape its paint and hedges
 * through that tangent plane's exponential map, then transport each complete
 * tree/building to its own radial frame. No geographic chart metric enters the
 * geometry, so high-latitude fields retain the same acreage and row spacing. */
function conformSurfaceFootprint(root,world,elevation,scale){
  const radius=world.surface.radius,baseRadius=radius+elevation,rootInverse=root.matrixWorld.clone().invert();
  const scaling=new Matrix4().makeScale(scale.x,scale.y,scale.z),relative=new Matrix4(),parentRelative=new Matrix4();
  const point=new Vector3(),up=new Vector3(0,1,0),normal=new Vector3(),transport=new Quaternion(),rotation=new Matrix4();
  const grounds=[],anchors=[];
  const visit=node=>{
    if(node!==root&&node.userData.surfaceAnchor){anchors.push(node);return;}
    if(node.isMesh&&node.userData.surfaceGround)grounds.push(node);
    for(const child of node.children)visit(child);
  };
  visit(root);
  const drape=target=>{
    const distance=Math.hypot(target.x,target.z),angle=distance/radius,height=baseRadius+target.y;
    const factor=distance>1e-12?Math.sin(angle)*height/distance:height/radius;
    normal.set(distance>1e-12?Math.sin(angle)*target.x/distance:0,Math.cos(angle),distance>1e-12?Math.sin(angle)*target.z/distance:0);
    return target.set(target.x*factor,Math.cos(angle)*height-baseRadius,target.z*factor);
  };
  for(const mesh of grounds){
    relative.multiplyMatrices(rootInverse,mesh.matrixWorld).premultiply(scaling);
    const local=mesh.geometry.clone().applyMatrix4(relative),geometry=tessellateSurfaceGeometry(local,6);
    local.dispose();
    const positions=geometry.attributes.position;
    for(let index=0;index<positions.count;index++){
      drape(point.fromBufferAttribute(positions,index));positions.setXYZ(index,point.x,point.y,point.z);
    }
    geometry.computeVertexNormals();geometry.applyMatrix4(relative.invert());
    // These marked surfaces are uniquely owned polygons, never the shared
    // unit box or another reusable piece of rigid asset geometry.
    mesh.geometry.dispose();mesh.geometry=geometry;
  }
  for(const anchor of anchors){
    relative.multiplyMatrices(rootInverse,anchor.matrixWorld).premultiply(scaling);
    drape(point.setFromMatrixPosition(relative));
    rotation.makeRotationFromQuaternion(transport.setFromUnitVectors(up,normal));
    relative.setPosition(0,0,0).premultiply(rotation).setPosition(point);
    parentRelative.multiplyMatrices(rootInverse,anchor.parent.matrixWorld).premultiply(scaling).invert();
    anchor.matrixAutoUpdate=false;anchor.matrix.multiplyMatrices(parentRelative,relative);anchor.matrixWorldNeedsUpdate=true;
  }
}

/** Keep an asset's local dimensions separate from the geographic chart metric.
 * Outer rigid roots carry their hierarchy, including passengers. Farms opt in
 * to ground draping and rigid local detail anchors, rather than treating a
 * whole estate as one plane. Already-spherical construction is simply moved
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
      if(node.userData.surfaceFootprint&&world.surface?.type==='sphere')conformSurfaceFootprint(node,world,position.y,scale);
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
