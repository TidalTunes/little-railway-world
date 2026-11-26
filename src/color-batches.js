import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {applySceneStyle} from './scene-style.js';

/** Consolidated opaque meshes can share a draw call without losing their colors. */
export function bakeMaterialColors(root){
  const groups=new Map();
  for(const mesh of root.children){
    if(!mesh.isMesh)throw new TypeError('Color batching expects consolidated meshes');
    const source=mesh.material;
    const properties={roughness:source.roughness??1,metalness:source.metalness??0,
      side:source.side,flatShading:source.flatShading,transparent:source.transparent,opacity:source.opacity};
    const sceneStyle=source.userData.sceneStyle??'asset',key=JSON.stringify({...properties,sceneStyle});
    if(!groups.has(key))groups.set(key,{properties,sceneStyle,geometries:[]});
    const geometry=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();
    const count=geometry.attributes.position.count,colors=new Float32Array(count*3),previous=geometry.attributes.color;
    for(let i=0;i<count;i++){
      colors[i*3]=source.color.r*(previous?previous.getX(i):1);
      colors[i*3+1]=source.color.g*(previous?previous.getY(i):1);
      colors[i*3+2]=source.color.b*(previous?previous.getZ(i):1);
    }
    geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
    groups.get(key).geometries.push(geometry);mesh.geometry.dispose();
  }
  root.clear();root.userData.ownedMaterials??=[];
  for(const {properties,sceneStyle,geometries}of groups.values()){
    const geometry=mergeGeometries(geometries,false);
    geometries.forEach(item=>item.dispose());
    const material=new THREE.MeshStandardMaterial({...properties,color:0xffffff,vertexColors:true,name:'baked-material-colors'});
    material.userData.sceneStyle=sceneStyle;
    applySceneStyle(material,{kind:sceneStyle});
    root.userData.ownedMaterials.push(material);
    const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);
  }
  return root;
}
