import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {house} from './assets.js';
import {consolidate} from './geometry.js';
import {bakeMaterialColors} from './color-batches.js';
import {createPlayerPalette,playerColors} from './player-palette.js';
import {rigidSurfacePoseMatrix} from './world-surface.js';

/** Player-built houses use the original house templates in every camera layer.
 * Only building commits upload instance matrices; previews reuse one mesh. */
export function createSettlementArt(parent,mapParent,world){
  const root=new THREE.Group(),mapRoot=new THREE.Group();root.name='player-settlement';mapRoot.name='settlement-map';parent.add(root);mapParent.add(mapRoot);
  const owner=world.players.find(p=>p.id===world.gameplay.ownerId),palette=createPlayerPalette(owner),templates=[];
  for(let variant=0;variant<4;variant++){
    const template=new THREE.Group();house(template,{variant,palette});bakeMaterialColors(consolidate(template));templates.push(template);
  }
  const ghostGeometries=templates.map(template=>{
    const parts=template.children.map(mesh=>{const geometry=mesh.geometry.clone();geometry.deleteAttribute('color');return geometry;});
    const geometry=mergeGeometries(parts,false);parts.forEach(part=>part.dispose());return geometry;
  });
  const good=new THREE.Color('#5dd9b4'),bad=new THREE.Color('#ec565c');
  const ghostMaterial=new THREE.MeshBasicMaterial({color:good,transparent:true,opacity:.30,depthWrite:false});
  const ghost=new THREE.Mesh(ghostGeometries[0],ghostMaterial),mapGhost=new THREE.Mesh(ghostGeometries[0],ghostMaterial);
  ghost.visible=mapGhost.visible=false;ghost.renderOrder=mapGhost.renderOrder=5;root.add(ghost);mapRoot.add(mapGhost);
  const borderGeometry=new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-1.13,.035,-1.13),new THREE.Vector3(1.13,.035,-1.13),
    new THREE.Vector3(1.13,.035,1.13),new THREE.Vector3(-1.13,.035,1.13)]);
  const border=new THREE.LineLoop(borderGeometry,new THREE.LineBasicMaterial({color:good}));ghost.add(border);
  const linkGeometry=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]);
  const link=new THREE.Line(linkGeometry,new THREE.LineDashedMaterial({color:good,dashSize:.18,gapSize:.13,transparent:true,opacity:.8,depthWrite:false}));link.visible=false;root.add(link);
  const treeRing=new THREE.Mesh(new THREE.RingGeometry(.26,.32,28),new THREE.MeshBasicMaterial({color:0xffdf96,side:THREE.DoubleSide,depthWrite:false}));
  treeRing.rotation.x=-Math.PI/2;treeRing.renderOrder=8;treeRing.visible=false;root.add(treeRing);
  const markerGeometry=new THREE.CircleGeometry(1,5);markerGeometry.rotateX(-Math.PI/2);markerGeometry.rotateY(Math.PI);
  const markerMaterial=new THREE.MeshBasicMaterial({color:playerColors(owner).body,depthWrite:false});
  const matrix=new THREE.Matrix4(),mapMatrix=new THREE.Matrix4();let batches=[],mapBatch,capacity=0,revision=0;
  function sync(houses){
    if(houses.length>capacity){
      for(const batch of batches){batch.removeFromParent();batch.dispose();}mapBatch?.removeFromParent();mapBatch?.dispose();
      capacity=Math.max(16,2**Math.ceil(Math.log2(houses.length)));batches=[];
      for(let variant=0;variant<4;variant++)for(const source of templates[variant].children){
        const batch=new THREE.InstancedMesh(source.geometry,source.material,capacity);batch.userData.variant=variant;batch.count=0;batch.castShadow=batch.receiveShadow=true;root.add(batch);batches.push(batch);
      }
      mapBatch=new THREE.InstancedMesh(markerGeometry,markerMaterial,capacity);mapBatch.renderOrder=8;mapRoot.add(mapBatch);
    }
    for(const batch of batches)batch.count=0;
    houses.forEach((item,index)=>{
      rigidSurfacePoseMatrix(world,item.x,item.y??0,item.z,item.rotation??0,matrix);
      for(const batch of batches)if(batch.userData.variant===(item.variant??0)%4)batch.setMatrixAt(batch.count++,matrix);
      mapMatrix.makeScale(1.6,1,1.6);mapMatrix.setPosition(item.x,.66,item.z);mapBatch.setMatrixAt(index,mapMatrix);
    });
    for(const batch of batches){batch.instanceMatrix.needsUpdate=true;batch.computeBoundingSphere();batch.computeBoundingBox();}
    mapBatch.count=houses.length;mapBatch.instanceMatrix.needsUpdate=true;mapBatch.computeBoundingSphere();revision++;
    root.updateMatrixWorld(true);
  }
  return{root,mapRoot,sync,get meshes(){return batches.filter(batch=>batch.count>0&&batch.material.userData.sceneStyle!=='window');},get revision(){return revision;},
    preview(result,{visible=false,connection=null,targetTree=null}={}){
      ghost.visible=mapGhost.visible=visible&&!!result?.house;link.visible=false;treeRing.visible=!visible&&!!targetTree;
      if(treeRing.visible){treeRing.position.set(targetTree.x,(targetTree.y??0)+.025,targetTree.z);treeRing.scale.setScalar(Math.max(1,(targetTree.scale??1)*1.15));}
      if(!ghost.visible)return;
      const item=result.house;ghost.geometry=mapGhost.geometry=ghostGeometries[(item.variant??0)%4];
      ghost.position.set(item.x,item.y??0,item.z);ghost.rotation.y=item.rotation??0;
      mapGhost.position.set(item.x,.68,item.z);mapGhost.rotation.y=ghost.rotation.y;
      ghostMaterial.color.copy(result.valid?good:bad);border.material.color.copy(ghostMaterial.color);
      if(result.connected&&connection){
        const positions=linkGeometry.attributes.position;positions.setXYZ(0,item.x,(item.y??0)+.065,item.z);positions.setXYZ(1,connection.x,(connection.y??0)+.065,connection.z);positions.needsUpdate=true;
        link.computeLineDistances();link.geometry.computeBoundingSphere();link.visible=true;
      }
    },
    update({mapBlend=0}={}){root.visible=mapBlend<.999;mapRoot.visible=mapBlend>.001;},
    dispose(){
      root.removeFromParent();mapRoot.removeFromParent();for(const batch of batches)batch.dispose();mapBatch?.dispose();
      for(const template of templates){for(const mesh of template.children)mesh.geometry.dispose();for(const material of template.userData.ownedMaterials??[])material.dispose();}
      Object.values(palette).forEach(material=>material.dispose());
      for(const mesh of [border,link,treeRing]){mesh.geometry.dispose();mesh.material.dispose();}
      ghostGeometries.forEach(geometry=>geometry.dispose());ghostMaterial.dispose();
      markerGeometry.dispose();markerMaterial.dispose();
    },
  };
}
