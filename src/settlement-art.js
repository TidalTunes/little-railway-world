import * as THREE from 'three';
import {house} from './assets.js';
import {consolidate} from './geometry.js';
import {bakeMaterialColors} from './color-batches.js';
import {createPlayerPalette,playerColors} from './player-palette.js';
import {rigidSurfacePoseMatrix} from './world-surface.js';
import {buildCityStreets,STREET_HEIGHT} from './city-streets.js';
import {worldSurface} from './world-model.js';
import {tessellateSurfaceGeometry} from './surface-tessellation.js';
import {buildSettlementBuilding} from './settlement-building-assets.js';
import {SETTLEMENT_BUILDINGS} from './settlement-progression.js';
import {createSettlementConstruction} from './settlement-construction.js';

function civicMapGeometry(type){
  const polygon=points=>new THREE.Shape(points.map(([x,z])=>new THREE.Vector2(x,-z)));
  const ring=(outer,inner)=>{
    const shape=new THREE.Shape();shape.absarc(0,0,outer,0,Math.PI*2,false);
    const hole=new THREE.Path();hole.absarc(0,0,inner,0,Math.PI*2,true);shape.holes.push(hole);return shape;
  };
  let shapes;
  if(type==='well')shapes=[ring(1.05,.58)];
  else if(type==='clock')shapes=[ring(1.23,1.02),polygon([[-.10,-.78],[.10,-.78],[.10,-.10],[.64,-.10],[.64,.10],[-.10,.10]])];
  else if(type==='market')shapes=[polygon([[-1.50,-.62],[0,-1.40],[1.50,-.62],[1.50,.78],[1,.52],[.5,.78],[0,.52],[-.5,.78],[-1,.52],[-1.5,.78]])];
  else if(type==='waterTower')shapes=[polygon([[-1.04,-.65],[0,-1.23],[1.04,-.65],[1.04,.32],[.65,.32],[.85,1.20],[.51,1.20],[.32,.32],[-.32,.32],[-.51,1.20],[-.85,1.20],[-.65,.32],[-1.04,.32]])];
  else if(type==='plaza'){
    shapes=[ring(.72,.42)];
    for(const [x,z]of [[-1.03,0],[1.03,0],[0,-1.03],[0,1.03]]){
      const petal=new THREE.Shape();petal.absarc(x,z,.30,0,Math.PI*2,false);shapes.push(petal);
    }
  }else if(type==='library'){
    const dome=polygon([[-1.40,1],[-1.40,-.32],[-.88,-.32],[-.88,-.56],[-.67,-1.04],[-.30,-1.34],[.30,-1.34],[.67,-1.04],[.88,-.56],[.88,-.32],[1.40,-.32],[1.40,1]]);
    for(const x of [-.76,0,.76])dome.holes.push(new THREE.Path([new THREE.Vector2(x-.13,-.72),new THREE.Vector2(x+.13,-.72),new THREE.Vector2(x+.13,-.04),new THREE.Vector2(x-.13,-.04)]));
    shapes=[dome];
  }else if(type==='guildhall')shapes=[polygon([[-1.50,.94],[-1.50,-.82],[-1.10,-1.40],[-.70,-.82],[-.70,-.27],[.70,-.27],[.70,-.82],[1.10,-1.40],[1.50,-.82],[1.50,.94],[.26,.94],[.26,.25],[-.26,.25],[-.26,.94]])];
  else if(type==='chapel')shapes=[polygon([[-1.05,.94],[-1.05,-.18],[-.37,-.58],[-.37,-1.12],[0,-1.66],[.37,-1.12],[.37,-.58],[1.05,-.18],[1.05,.94],[.21,.94],[.21,.18],[-.21,.18],[-.21,.94]])];
  else{
    const shape=polygon([[-1.50,.95],[-1.50,-.65],[0,-1.42],[1.50,-.65],[1.50,.95]]);
    for(const x of [-.80,0,.80])shape.holes.push(new THREE.Path([new THREE.Vector2(x-.15,-.62),new THREE.Vector2(x+.15,-.62),new THREE.Vector2(x+.15,.40),new THREE.Vector2(x-.15,.40)]));
    shapes=[shape];
  }
  const geometry=new THREE.ShapeGeometry(shapes,12);geometry.rotateX(-Math.PI/2);return geometry;
}

/** Player-built houses use the original house templates in every camera layer.
 * Settled instances stay static; only new construction animates its own slots.
 * Previews reuse one mesh. */
export function createSettlementArt(parent,mapParent,world,{ownerId=world.gameplay.ownerId}={}){
  const root=new THREE.Group(),mapRoot=new THREE.Group();root.name='player-settlement';mapRoot.name='settlement-map';parent.add(root);mapParent.add(mapRoot);
  const construction=createSettlementConstruction(root,mapRoot,world);
  const owner=world.players.find(p=>p.id===ownerId),palette=createPlayerPalette(owner),templates=[];
  for(let variant=0;variant<4;variant++){
    const template=new THREE.Group();house(template,{variant,palette});bakeMaterialColors(consolidate(template));templates.push(template);
  }
  const civicTemplates=new Map(),civicMarkers=new Map();
  for(const {type}of SETTLEMENT_BUILDINGS){
    const template=new THREE.Group();buildSettlementBuilding(template,{buildingType:type,palette});bakeMaterialColors(consolidate(template));
    civicTemplates.set(type,template);civicMarkers.set(type,civicMapGeometry(type));
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
  mapPathsRoot.visible=false; // The flat map shows the rail network, not local footpaths.
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

    }
  }
  const treeRing=new THREE.Mesh(new THREE.RingGeometry(.26,.32,28),new THREE.MeshBasicMaterial({color:0xffdf96,side:THREE.DoubleSide,depthWrite:false}));
  treeRing.rotation.x=-Math.PI/2;treeRing.renderOrder=8;treeRing.visible=false;root.add(treeRing);
  const markerGeometry=new THREE.CircleGeometry(1,5);markerGeometry.rotateX(-Math.PI/2);markerGeometry.rotateY(Math.PI);
  const markerMaterial=new THREE.MeshBasicMaterial({color:playerColors(owner).body,depthWrite:false});
  const matrix=new THREE.Matrix4(),mapMatrix=new THREE.Matrix4();let batches=[],mapBatch,capacity=0,revision=0,civicCapacity=0;
  const civicBatches=[],civicMapBatches=[];
  function syncCivics(buildings){
    if(buildings.length>civicCapacity){
      for(const batch of [...civicBatches,...civicMapBatches]){batch.removeFromParent();batch.dispose();}
      civicBatches.length=civicMapBatches.length=0;civicCapacity=Math.max(4,2**Math.ceil(Math.log2(buildings.length)));
      for(const [type,template]of civicTemplates){
        for(const source of template.children){
          const batch=new THREE.InstancedMesh(source.geometry,source.material,civicCapacity);batch.name=`settlement-civic-${type}`;
          batch.userData.buildingType=type;batch.castShadow=batch.receiveShadow=true;root.add(batch);civicBatches.push(batch);
        }
        const marker=new THREE.InstancedMesh(civicMarkers.get(type),markerMaterial,civicCapacity);marker.name=`settlement-civic-map-${type}`;
        marker.userData.buildingType=type;marker.renderOrder=8;mapRoot.add(marker);civicMapBatches.push(marker);
      }
    }
    for(const batch of [...civicBatches,...civicMapBatches])batch.count=0;
    for(const item of buildings){
      rigidSurfacePoseMatrix(world,item.x,item.y??0,item.z,item.rotation??0,matrix);matrix.scale(new THREE.Vector3().setScalar(item.scale??1));
      for(const batch of civicBatches)if(batch.userData.buildingType===item.buildingType){construction.bind(item,batch,batch.count,matrix);batch.setMatrixAt(batch.count++,matrix);}
      mapMatrix.makeRotationY(item.rotation??0);mapMatrix.setPosition(item.x,.68,item.z);
      for(const batch of civicMapBatches)if(!item.cityId&&batch.userData.buildingType===item.buildingType){construction.bind(item,batch,batch.count,mapMatrix,{map:true});batch.setMatrixAt(batch.count++,mapMatrix);}
    }
    for(const batch of [...civicBatches,...civicMapBatches]){batch.instanceMatrix.needsUpdate=true;batch.computeBoundingSphere();batch.computeBoundingBox();}
  }
  function sync(houses,paths=[],buildings=[],options={}){
    construction.beginSync([...houses,...buildings],options);
    syncPaths(paths);
    syncCivics(buildings);
    if(!mapBatch||houses.length>capacity){
      for(const batch of batches){batch.removeFromParent();batch.dispose();}mapBatch?.removeFromParent();mapBatch?.dispose();
      capacity=Math.max(16,2**Math.ceil(Math.log2(houses.length)));batches=[];
      for(let variant=0;variant<4;variant++)for(const source of templates[variant].children){
        const batch=new THREE.InstancedMesh(source.geometry,source.material,capacity);batch.userData.variant=variant;batch.count=0;batch.castShadow=batch.receiveShadow=true;root.add(batch);batches.push(batch);
      }
      mapBatch=new THREE.InstancedMesh(markerGeometry,markerMaterial,capacity);mapBatch.renderOrder=8;mapRoot.add(mapBatch);
    }
    for(const batch of batches)batch.count=0;
    let mapIndex=0;
    houses.forEach(item=>{
      rigidSurfacePoseMatrix(world,item.x,item.y??0,item.z,item.rotation??0,matrix);
      for(const batch of batches)if(batch.userData.variant===(item.variant??0)%4){construction.bind(item,batch,batch.count,matrix);batch.setMatrixAt(batch.count++,matrix);}
      mapMatrix.makeScale(1.6,1,1.6);mapMatrix.setPosition(item.x,.66,item.z);if(!item.cityId){construction.bind(item,mapBatch,mapIndex,mapMatrix,{map:true});mapBatch.setMatrixAt(mapIndex++,mapMatrix);}
    });
    for(const batch of batches){batch.instanceMatrix.needsUpdate=true;batch.computeBoundingSphere();batch.computeBoundingBox();}
    mapBatch.count=mapIndex;mapBatch.instanceMatrix.needsUpdate=true;mapBatch.computeBoundingSphere();revision++;
    construction.finishSync();root.updateMatrixWorld(true);
  }
  return{root,mapRoot,sync,construction,get meshes(){return [...batches,...civicBatches].filter(batch=>batch.count>0&&batch.material.userData.sceneStyle!=='window');},get revision(){return revision;},
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
    update({mapBlend=0,dt=0,reducedMotion=false,night=0}={}){root.visible=mapBlend<.999;mapRoot.visible=mapBlend>.001;construction.update(dt,{mapBlend,reducedMotion,night});},
    dispose(){
      construction.dispose();root.removeFromParent();mapRoot.removeFromParent();for(const batch of [...batches,...civicBatches,...civicMapBatches])batch.dispose();mapBatch?.dispose();
      for(const template of [...templates,...civicTemplates.values()]){for(const mesh of template.children)mesh.geometry.dispose();for(const material of template.userData.ownedMaterials??[])material.dispose();}
      for(const geometry of civicMarkers.values())geometry.dispose();
      Object.values(palette).forEach(material=>material.dispose());
      linkGeometry.dispose();mapLinkGeometry.dispose();linkMaterial.dispose();treeRing.geometry.dispose();treeRing.material.dispose();
      ghostGeometry.dispose();ghostMaterial.dispose();edgeGeometry.dispose();edgeMaterial.dispose();
      for(const group of [pathsRoot,mapPathsRoot])for(const mesh of group.children)mesh.geometry.dispose();
      markerGeometry.dispose();markerMaterial.dispose();
    },
  };
}
