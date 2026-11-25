import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { M } from './palette.js';

const unitBox = new THREE.BoxGeometry(1, 1, 1);
export const v = (x,y,z) => new THREE.Vector3(x,y,z);

export function mesh(parent, geometry, material, x=0, y=0, z=0) {
  const result = new THREE.Mesh(geometry, typeof material === 'string' ? M[material] : material);
  result.position.set(x,y,z);
  result.castShadow = true;
  result.receiveShadow = true;
  parent.add(result);
  return result;
}
export function box(parent, x,y,z, w,h,d, mat, rotation=0) {
  const result = mesh(parent, unitBox, mat, x,y,z);
  result.scale.set(w,h,d);
  result.rotation.y = rotation;
  return result;
}
export function cylinder(parent, x,y,z, rt, rb, h, mat, sides=8) {
  return mesh(parent, new THREE.CylinderGeometry(rt,rb,h,sides), mat, x,y,z);
}
export function ico(parent, x,y,z, sx,sy,sz, mat, detail=0) {
  const result = mesh(parent, new THREE.IcosahedronGeometry(1,detail),mat,x,y,z);
  result.scale.set(sx,sy,sz);
  return result;
}
export function beam(parent, a, b, width, mat, depth=width) {
  const center = a.clone().add(b).multiplyScalar(.5);
  const result = box(parent,center.x,center.y,center.z,width,a.distanceTo(b),depth,mat);
  result.quaternion.setFromUnitVectors(v(0,1,0),b.clone().sub(a).normalize());
  return result;
}
export function group(parent,x=0,y=0,z=0,rotation=0) {
  const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=rotation;parent.add(g);return g;
}
export function polygon(parent, coords, y, mat) {
  const shape=new THREE.Shape(coords.map(([x,z])=>new THREE.Vector2(x,-z)));
  const geo=new THREE.ShapeGeometry(shape);geo.rotateX(-Math.PI/2);
  return mesh(parent,geo,mat,0,y,0);
}
export function extrudedPolygon(parent, coords, top, depth, mat) {
  const shape=new THREE.Shape(coords.map(([x,z])=>new THREE.Vector2(x,-z)));
  const geo=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:false,steps:1});geo.rotateX(-Math.PI/2);
  return mesh(parent,geo,mat,0,top-depth,0);
}
export function roof(parent,w,d,h,y,mat='roof') {
  const points=[-w/2,0,-d/2, w/2,0,-d/2, 0,h,-d/2, -w/2,0,d/2, w/2,0,d/2, 0,h,d/2];
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
  geo.setIndex([0,2,1,3,4,5,0,3,5,0,5,2,1,2,5,1,5,4,0,1,4,0,4,3]);geo.computeVertexNormals();
  return mesh(parent,geo,mat,0,y,0);
}
export function ribbon(parent, points, width, mat, yOffset=0) {
  const verts=[], indices=[];
  points.forEach((p,i)=>{
    const a=points[Math.max(0,i-1)], b=points[Math.min(points.length-1,i+1)];
    const norm=v(-(b.z-a.z),0,b.x-a.x).normalize().multiplyScalar(width/2);
    verts.push(p.x+norm.x,p.y+yOffset,p.z+norm.z,p.x-norm.x,p.y+yOffset,p.z-norm.z);
    if(i<points.length-1){const j=i*2;indices.push(j,j+2,j+1,j+1,j+2,j+3);}
  });
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.setIndex(indices);geo.computeVertexNormals();
  return mesh(parent,geo,mat);
}
export function consolidate(root) {
  root.updateMatrixWorld(true);
  const inverse=root.matrixWorld.clone().invert();
  const batches=new Map(),originals=new Set();
  root.traverse(node=>{
    if(!node.isMesh) return;
    const material=node.material;
    if(node.geometry!==unitBox)originals.add(node.geometry);
    if(!batches.has(material))batches.set(material,[]);
    const geometry=node.geometry.index?node.geometry.toNonIndexed():node.geometry.clone();
    geometry.deleteAttribute('uv');geometry.deleteAttribute('color');geometry.deleteAttribute('tangent');
    geometry.applyMatrix4(inverse.clone().multiply(node.matrixWorld));
    batches.get(material).push(geometry);
  });
  root.clear();
  for(const [mat, geometries] of batches){
    const merged=mergeGeometries(geometries,false);
    mesh(root,merged,mat);
    geometries.forEach(g=>g.dispose());
  }
  originals.forEach(geometry=>geometry.dispose());
  return root;
}
