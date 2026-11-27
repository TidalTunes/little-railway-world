import * as THREE from 'three';
import {house} from './assets.js';
import {consolidate} from './geometry.js';
import {bakeMaterialColors} from './color-batches.js';
import {createPlayerPalette,playerColors} from './player-palette.js';
import {rigidSurfacePoseMatrix} from './world-surface.js';
import {buildCityStreets,STREET_HEIGHT} from './city-streets.js';
import {worldSurface} from './world-model.js';
import {C} from './palette.js';
import {tessellateSurfaceGeometry} from './surface-tessellation.js';

/** Player-built houses use the original house templates in every camera layer.
 * Only building commits upload instance matrices; previews reuse one mesh. */
export function createSettlementArt(parent,mapParent,world){
  const root=new THREE.Group(),mapRoot=new THREE.Group();root.name='player-settlement';mapRoot.name='settlement-map';parent.add(root);mapParent.add(mapRoot);
  const owner=world.players.find(p=>p.id===world.gameplay.ownerId),palette=createPlayerPalette(owner),templates=[];
  for(let variant=0;variant<4;variant++){
    const template=new THREE.Group();house(template,{variant,palette});bakeMaterialColors(consolidate(template));templates.push(template);
  }
  // The preview describes the occupied lot, not the eventual architecture.
  const ghostGeometry=new THREE.BoxGeometry(2.2,2.2,2.2);ghostGeometry.translate(0,1.1,0);
  const good=new THREE.Color('#5dd9b4'),bad=new THREE.Color('#ec565c');
  const ghostMaterial=new THREE.MeshBasicMaterial({color:good,transparent:true,opacity:.20,depthWrite:false});
  const ghost=new THREE.Mesh(ghostGeometry,ghostMaterial),mapGhost=new THREE.Mesh(ghostGeometry,ghostMaterial);
  ghost.name=mapGhost.name='settlement-blueprint';
  ghost.visible=mapGhost.visible=false;ghost.renderOrder=mapGhost.renderOrder=5;root.add(ghost);mapRoot.add(mapGhost);
  const edgeGeometry=new THREE.EdgesGeometry(ghostGeometry),edgeMaterial=new THREE.LineBasicMaterial({color:good,transparent:true,opacity:.72,depthWrite:false});
  ghost.add(new THREE.LineSegments(edgeGeometry,edgeMaterial));mapGhost.add(new THREE.LineSegments(edgeGeometry,edgeMaterial));
  function previewGeometry(capacity=256){
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(capacity*3),3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('lineDistance',new THREE.BufferAttribute(new Float32Array(capacity),1).setUsage(THREE.DynamicDrawUsage));
    geometry.setDrawRange(0,0);return geometry;
  }
  let linkGeometry=previewGeometry(),mapLinkGeometry=previewGeometry();
  const linkMaterial=new THREE.LineDashedMaterial({color:good,dashSize:.12,gapSize:.09,transparent:true,opacity:.9,depthWrite:false});
  const link=new THREE.LineSegments(linkGeometry,linkMaterial),mapLink=new THREE.LineSegments(mapLinkGeometry,linkMaterial);
  for(const line of [link,mapLink]){line.name='settlement-path-preview';line.visible=false;line.frustumCulled=false;line.renderOrder=9;}
  root.add(link);mapRoot.add(mapLink);
  const pathsRoot=new THREE.Group(),mapPathsRoot=new THREE.Group();pathsRoot.name='settlement-paths';mapPathsRoot.name='settlement-map-paths';root.add(pathsRoot);mapRoot.add(mapPathsRoot);
  const mapPathMaterial=new THREE.MeshBasicMaterial({color:C.sand,depthWrite:false});
  function syncPaths(paths){
    for(const group of [pathsRoot,mapPathsRoot]){for(const mesh of group.children)mesh.geometry.dispose();group.clear();}
    // Union first, so branching lanes share one surface without coplanar seams.
    const meshes=buildCityStreets(pathsRoot,{...world,cityStreets:paths});
    for(const mesh of meshes){
      const coarse=mesh.geometry;mesh.geometry=tessellateSurfaceGeometry(coarse,.6);coarse.dispose();
      const positions=mesh.geometry.attributes.position;
      for(let i=0;i<positions.count;i++)positions.setY(i,worldSurface(world,positions.getX(i),positions.getZ(i)).height+STREET_HEIGHT);
      positions.needsUpdate=true;mesh.geometry.computeVertexNormals();mesh.geometry.computeBoundingSphere();
      mesh.castShadow=false;mesh.receiveShadow=true;
      const geometry=mesh.geometry.clone(),flat=geometry.attributes.position;
      for(let i=0;i<flat.count;i++)flat.setY(i,.62);
      geometry.computeBoundingSphere();const mapPath=new THREE.Mesh(geometry,mapPathMaterial);mapPath.renderOrder=7;mapPathsRoot.add(mapPath);
    }
  }
  const treeRing=new THREE.Mesh(new THREE.RingGeometry(.26,.32,28),new THREE.MeshBasicMaterial({color:0xffdf96,side:THREE.DoubleSide,depthWrite:false}));
  treeRing.rotation.x=-Math.PI/2;treeRing.renderOrder=8;treeRing.visible=false;root.add(treeRing);
  const markerGeometry=new THREE.CircleGeometry(1,5);markerGeometry.rotateX(-Math.PI/2);markerGeometry.rotateY(Math.PI);
  const markerMaterial=new THREE.MeshBasicMaterial({color:playerColors(owner).body,depthWrite:false});
  const matrix=new THREE.Matrix4(),mapMatrix=new THREE.Matrix4();let batches=[],mapBatch,capacity=0,revision=0;
  function sync(houses,paths=[]){
    syncPaths(paths);
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
    preview(result,{visible=false,targetTree=null}={}){
      ghost.visible=mapGhost.visible=visible&&!!result?.house;link.visible=mapLink.visible=false;treeRing.visible=!visible&&!!targetTree;
      if(treeRing.visible){treeRing.position.set(targetTree.x,(targetTree.y??0)+.025,targetTree.z);treeRing.scale.setScalar(Math.max(1,(targetTree.scale??1)*1.15));}
      if(!ghost.visible)return;
      const item=result.house;
      ghost.position.set(item.x,item.y??0,item.z);ghost.rotation.y=item.rotation??0;
      mapGhost.position.set(item.x,.68,item.z);mapGhost.rotation.y=ghost.rotation.y;
      ghostMaterial.color.copy(result.valid?good:bad);edgeMaterial.color.copy(ghostMaterial.color);link.material.color.copy(ghostMaterial.color);
      const routes=result.paths??(result.path?[result.path]:[]);
      const count=routes.reduce((total,path)=>total+Math.max(0,path.points.length-1)*2,0);
      if(count){
        if(count>linkGeometry.attributes.position.count){
          const capacity=2**Math.ceil(Math.log2(count));linkGeometry.dispose();mapLinkGeometry.dispose();
          link.geometry=linkGeometry=previewGeometry(capacity);mapLink.geometry=mapLinkGeometry=previewGeometry(capacity);
        }
        const positions=linkGeometry.attributes.position,mapPositions=mapLinkGeometry.attributes.position;
        const distances=linkGeometry.attributes.lineDistance,mapDistances=mapLinkGeometry.attributes.lineDistance;let index=0;
        for(const {points} of routes){
          let distance=0;
          for(let i=1;i<points.length;i++){
            const start=points[i-1],end=points[i],length=Math.hypot(end.x-start.x,end.z-start.z);
            for(const [point,along] of [[start,distance],[end,distance+length]]){
              positions.setXYZ(index,point.x,(point.y??0)+.045,point.z);mapPositions.setXYZ(index,point.x,.69,point.z);
              distances.setX(index,along);mapDistances.setX(index,along);index++;
            }
            distance+=length;
          }
        }
        for(const geometry of [linkGeometry,mapLinkGeometry]){
          geometry.attributes.position.needsUpdate=geometry.attributes.lineDistance.needsUpdate=true;geometry.setDrawRange(0,count);
        }
        link.visible=mapLink.visible=true;
      }
    },
    update({mapBlend=0}={}){root.visible=mapBlend<.999;mapRoot.visible=mapBlend>.001;},
    dispose(){
      root.removeFromParent();mapRoot.removeFromParent();for(const batch of batches)batch.dispose();mapBatch?.dispose();
      for(const template of templates){for(const mesh of template.children)mesh.geometry.dispose();for(const material of template.userData.ownedMaterials??[])material.dispose();}
      Object.values(palette).forEach(material=>material.dispose());
      linkGeometry.dispose();mapLinkGeometry.dispose();linkMaterial.dispose();treeRing.geometry.dispose();treeRing.material.dispose();
      ghostGeometry.dispose();ghostMaterial.dispose();edgeGeometry.dispose();edgeMaterial.dispose();
      for(const group of [pathsRoot,mapPathsRoot])for(const mesh of group.children)mesh.geometry.dispose();mapPathMaterial.dispose();
      markerGeometry.dispose();markerMaterial.dispose();
    },
  };
}
