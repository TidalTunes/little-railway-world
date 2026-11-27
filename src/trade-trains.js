import * as THREE from 'three';
import {buildSteamLocomotive} from './steam-locomotive.js';
import {TRAIN_CAR_SPACING} from './train-consist.js';
import {box,cylinder,ico,consolidate} from './geometry.js';
import {bakeMaterialColors} from './color-batches.js';
import {createPlayerPalette,playerColors} from './player-palette.js';
import {C} from './palette.js';
import {applySceneStyle} from './scene-style.js';
import {surfaceFor,rigidSurfacePoseMatrix,surfacePoint} from './world-surface.js';

export const TRADE_TRAIN_LIMITS=Object.freeze({visible:2048,detailCars:8192,spacing:TRAIN_CAR_SPACING});
const CARGO_COLORS={timber:C.soilLight,grain:C.wheat,metal:C.rail,tools:C.blue};
// Old saves retain timber/grain names; both economies share the same pooled
// log and food geometry rather than creating duplicate alias batches.
const CARGO_KIND={wood:'timber',food:'grain',metal:'metal',timber:'timber',grain:'grain',tools:'tools'};
const finitePose=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.z)&&Number.isFinite(p.angle);

function wagon(palette){
  const root=new THREE.Group();
  box(root,0,.34,0,.91,.19,2.10,'metal');box(root,0,.48,0,1.02,.14,2.12,'timber');
  box(root,0,.36,1.28,.16,.12,.60,'metal');
  for(const side of [-1,1]){
    box(root,side*.49,.69,0,.09,.33,2.12,palette.body);
    box(root,side*.49,.87,0,.10,.055,2.14,palette.trim);
    for(const z of [-.67,.67])cylinder(root,side*.48,.22,z,.22,.22,.14,'metal',8).rotation.z=Math.PI/2;
    box(root,0,.69,side*1.02,.96,.33,.09,palette.body);
  }
  return root;
}
function freight(kind){
  const root=new THREE.Group();
  if(kind==='timber'){
    for(const [x,y]of [[-.29,.73],[.04,.73],[.33,.73],[-.15,1.02],[.18,1.02]]){
      cylinder(root,x,y,0,.165,.165,1.80,'soilLight',7).rotation.x=Math.PI/2;
      for(const end of [-1,1])cylinder(root,x,y,end*.906,.128,.128,.018,'sand',7).rotation.x=Math.PI/2;
    }
    for(const z of [-.58,.58])box(root,0,1.11,z,.70,.055,.08,'timber');
  }else if(kind==='grain'){
    for(const x of [-.23,.23])for(const z of [-.58,0,.58]){
      ico(root,x,.84,z,.23,.31,.28,'wheat',1);cylinder(root,x,1.12,z,.055,.075,.08,'soilLight',5);
    }
  }else if(kind==='metal'){
    // Short trapezoid ingots stack directly on the deck and one another.
    for(const [y,rows] of [[.68,[-.56,0,.56]],[.92,[-.28,.28]]])for(const x of [-.215,.215])for(const z of rows){
      const ingot=cylinder(root,x,y,z,.18,.23,.24,'rail',4);ingot.rotation.y=Math.PI/4;ingot.scale.z=1.45;
    }
  }else{
    for(const z of [-.49,.49]){
      box(root,0,.86,z,.76,.59,.78,'blue');
      for(const x of [-.27,.27])box(root,x,1.16,z,.065,.035,.80,'metal');
      for(const side of [-1,1])box(root,side*.385,.86,z,.025,.59,.09,'metal');
    }
  }
  return root;
}
function markerGeometry(width,length){
  const radius=width/2,half=length/2-radius,shape=new THREE.Shape();
  shape.absarc(0,half,radius,0,Math.PI,false);shape.absarc(0,-half,radius,Math.PI,Math.PI*2,false);shape.closePath();
  const geometry=new THREE.ShapeGeometry(shape,6);geometry.rotateX(-Math.PI/2);return geometry;
}

/** Freight instances share the world train proportions. Templates, map glyphs
 * and cargo meshes are built once; a frame only updates occupied pose slots. */
export function createTradeTrains(parent,mapParent,world={}){
  const root=new THREE.Group(),mapRoot=new THREE.Group();root.name='trade-trains';mapRoot.name='trade-trains-map';parent.add(root);mapParent.add(mapRoot);
  const owners=new Map(),cargoBatches=new Map(),records=new Map(),trains=[],ownedMaterials=new Set(),ownedGeometries=new Set(),groups=[];
  const curved=!!surfaceFor(world),matrix=new THREE.Matrix4(),projection=new THREE.Matrix4(),frustum=new THREE.Frustum();
  const viewPoint=new THREE.Vector3(),scale=new THREE.Vector3(1,1,1),sphere=new THREE.Sphere(),bounds=new THREE.Box3();
  const fallback={x:0,y:0,z:0,angle:0};let disposed=false,frame=0;
  const stats={active:0,visible:0,detailCars:0,detailInstances:0,mapInstances:0,drawCalls:0,capacity:0};
  function group(template,name,parent=root){
    bakeMaterialColors(consolidate(template));
    for(const material of template.userData.ownedMaterials??[])ownedMaterials.add(material);
    const entry={name,parent,parts:template.children.map(part=>({geometry:part.geometry,material:part.material})),meshes:[],capacity:0,count:0};
    for(const part of entry.parts)ownedGeometries.add(part.geometry);groups.push(entry);return entry;
  }
  function allocate(entry,needed){
    if(needed<=entry.capacity)return;
    const capacity=Math.min(entry.parent===root?TRADE_TRAIN_LIMITS.detailCars:TRADE_TRAIN_LIMITS.visible,Math.max(8,2**Math.ceil(Math.log2(needed))));
    const previous=entry.meshes;
    entry.meshes=entry.parts.map((part,index)=>{
      const mesh=new THREE.InstancedMesh(part.geometry,part.material,capacity);mesh.name=entry.name;
      mesh.count=0;mesh.frustumCulled=false;mesh.castShadow=mesh.receiveShadow=entry.parent===root;
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.userData.instanceTrainIds=[];
      if(previous[index]){
        mesh.instanceMatrix.array.set(previous[index].instanceMatrix.array);mesh.userData.instanceTrainIds.push(...previous[index].userData.instanceTrainIds);
        if(previous[index].instanceColor){mesh.setColorAt(0,new THREE.Color());mesh.instanceColor.array.set(previous[index].instanceColor.array);}
      }
      if(entry.parent===mapRoot)mesh.renderOrder=12+(entry.order??0);
      entry.parent.add(mesh);return mesh;
    });
    for(const mesh of previous){mesh.removeFromParent();mesh.dispose();}entry.capacity=capacity;
  }
  function insert(entry,id,transform,color){
    allocate(entry,entry.count+1);
    for(const mesh of entry.meshes){mesh.setMatrixAt(entry.count,transform);mesh.userData.instanceTrainIds[entry.count]=id;if(color)mesh.setColorAt(entry.count,color);}
    entry.count++;
  }
  function owner(player){
    const palette=createPlayerPalette(player);Object.values(palette).forEach(material=>ownedMaterials.add(material));
    const value={color:playerColors(player).body,loco:group(buildSteamLocomotive(palette),`trade-locomotive:${player?.id??'neutral'}`),
      wagon:group(wagon(palette),`trade-wagon:${player?.id??'neutral'}`)};
    owners.set(player?.id??null,value);return value;
  }
  for(const player of world.players??[])owner(player);
  const neutral=owner({id:null,color:{l:.59,c:0,h:0}});
  for(const kind of Object.keys(CARGO_COLORS))cargoBatches.set(kind,group(freight(kind),`trade-cargo:${kind}`));
  function mapBatch(name,geometry,color,order){
    const material=applySceneStyle(new THREE.MeshBasicMaterial({color,depthWrite:false,depthTest:false,toneMapped:false}),{kind:'map-symbol'});
    ownedMaterials.add(material);ownedGeometries.add(geometry);
    const entry={name,parent:mapRoot,parts:[{geometry,material}],meshes:[],capacity:0,count:0,order};groups.push(entry);return entry;
  }
  const outline=mapBatch('trade-map-outline',markerGeometry(1.75,5.2),C.trim,0),body=mapBatch('trade-map-body',markerGeometry(1.2,4.65),0xffffff,1);
  const cargoGeometry=new THREE.PlaneGeometry(.88,.78);cargoGeometry.rotateX(-Math.PI/2);cargoGeometry.translate(0,0,-1.25);
  const cargoMarker=mapBatch('trade-map-cargo',cargoGeometry,0xffffff,2);
  for(const entry of groups)allocate(entry,8);
  function poseMatrix(p){
    if(curved)rigidSurfacePoseMatrix(world,p.x,p.y??.42,p.z,p.angle,matrix);
    else{matrix.makeRotationY(p.angle);matrix.setPosition(p.x,p.y??.42,p.z);}return matrix;
  }
  function mapMatrix(p,widthScale,lengthScale,height){
    if(curved)rigidSurfacePoseMatrix(world,p.x,height,p.z,p.angle,matrix);
    else{matrix.makeRotationY(p.angle);matrix.setPosition(p.x,height,p.z);}
    matrix.scale(scale.set(widthScale,1,lengthScale));return matrix;
  }
  function pixelSize(camera){
    viewPoint.copy(sphere.center).applyMatrix4(camera.matrixWorldInverse);const e=camera.projectionMatrix.elements;
    return 2*Math.abs(e[3]*viewPoint.x+e[7]*viewPoint.y+e[11]*viewPoint.z+e[15])/Math.abs(e[5]);
  }
  function update(states=[],{camera,mapBlend=0,walkingWeight=0,viewportHeight=800}={}){
    if(disposed)return;frame++;
    root.visible=mapBlend<.999;mapRoot.visible=mapBlend>.001&&walkingWeight<.8;
    stats.active=stats.visible=stats.detailCars=stats.detailInstances=stats.mapInstances=0;trains.length=0;
    for(const entry of groups)entry.count=0;
    if(camera){camera.updateMatrixWorld(true);projection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);frustum.setFromProjectionMatrix(projection);}
    parent.updateWorldMatrix(true,false);
    for(const state of states){
      let record=records.get(state.id);
      if(state.active===false||!finitePose(state)){
        if(record&&state.active===false)record.state=state;
        continue;
      }
      stats.active++;
      if(!record){
        record={state,parts:[],fallbackPoses:[],frame};records.set(state.id,record);
      }
      record.state=state;record.frame=frame;trains.push(record);
      const locomotive=finitePose(state.carPoses?.[0])?state.carPoses[0]:state,carCount=Math.max(1,state.carPoses?.length??2);
      const poseAt=index=>{
        if(finitePose(state.carPoses?.[index]))return state.carPoses[index];
        if(!record.fallbackPoses[index])record.fallbackPoses[index]={};
        const pose=record.fallbackPoses[index];pose.x=locomotive.x-Math.sin(locomotive.angle)*TRADE_TRAIN_LIMITS.spacing*index;pose.y=locomotive.y??.42;
        pose.z=locomotive.z-Math.cos(locomotive.angle)*TRADE_TRAIN_LIMITS.spacing*index;pose.angle=locomotive.angle;return pose;
      };
      bounds.makeEmpty();
      for(let index=0;index<carCount;index++){
        const pose=poseAt(index);
        if(!record.parts[index]){const part=new THREE.Object3D();part.userData={trainId:state.id,poseOnly:true};record.parts.push(part);}
        const part=record.parts[index];part.position.set(pose.x,pose.y??.42,pose.z);part.rotation.y=pose.angle;part.visible=true;
        if(curved)surfacePoint(world,pose.x,(pose.y??.42)+.8,pose.z,viewPoint);else viewPoint.set(pose.x,(pose.y??.42)+.8,pose.z);
        viewPoint.applyMatrix4(parent.matrixWorld);bounds.expandByPoint(viewPoint);
      }
      for(let index=carCount;index<record.parts.length;index++)record.parts[index].visible=false;
      bounds.getBoundingSphere(sphere);sphere.radius+=2;
      if(camera&&!frustum.intersectsSphere(sphere)||stats.visible>=TRADE_TRAIN_LIMITS.visible)continue;
      stats.visible++;
      const resource=state.resource??(typeof state.cargo==='string'?state.cargo:state.cargo?.resource),cargo=CARGO_KIND[resource];
      const cargoAt=index=>state.cars?state.cars[index]:index===1?{resource,amount:state.amount}:null;
      const livery=owners.get(state.ownerId)??neutral;
      if(root.visible&&stats.detailCars+carCount<=TRADE_TRAIN_LIMITS.detailCars){
        insert(livery.loco,state.id,poseMatrix(locomotive));stats.detailInstances++;
        for(let index=1;index<carCount;index++){
          insert(livery.wagon,state.id,poseMatrix(poseAt(index)));stats.detailInstances++;
          const load=cargoAt(index),kind=CARGO_KIND[load?.resource];
          if(load?.amount>0&&cargoBatches.has(kind)){insert(cargoBatches.get(kind),state.id,matrix);stats.detailInstances++;}
        }
        stats.detailCars+=carCount;
      }
      if(mapRoot.visible){
        const pixel=camera?pixelSize(camera)/Math.max(1,viewportHeight):0;
        const widthScale=Math.max(1.1,pixel*8.5/1.2),lengthScale=Math.max(1.1,Math.min(carCount,4)*TRADE_TRAIN_LIMITS.spacing/4.65,pixel*23/4.65),rear=poseAt(carCount-1);
        fallback.x=(locomotive.x+rear.x)/2;fallback.z=(locomotive.z+rear.z)/2;fallback.angle=locomotive.angle;
        insert(outline,state.id,mapMatrix(fallback,widthScale,lengthScale,.86));
        insert(body,state.id,mapMatrix(fallback,widthScale,lengthScale,.87),livery.color);
        const mapCargo=state.cars?.find(car=>car.amount>0&&CARGO_KIND[car.resource]),mapKind=mapCargo?CARGO_KIND[mapCargo.resource]:cargo;
        if(mapCargo||carCount>1&&state.amount>0&&cargoBatches.has(cargo))insert(cargoMarker,state.id,mapMatrix(fallback,widthScale,lengthScale,.88),CARGO_COLORS[mapKind]);
        stats.mapInstances++;
      }
    }
    // The camera may retain this record while a shipment finishes. Preserve its
    // identity for the next trip, but never leave an old active snapshot visible
    // to following logic when the engine omits an idle train's pose (or record).
    for(const record of records.values())if(record.frame!==frame){
      if(record.state.active!==false)record.state={...record.state,active:false};
      for(const part of record.parts)part.visible=false;
    }
    stats.drawCalls=stats.capacity=0;
    for(const entry of groups){
      stats.capacity+=entry.capacity;
      for(const mesh of entry.meshes){
        mesh.count=entry.count;mesh.userData.instanceTrainIds.length=entry.count;
        if(!entry.count)continue;
        mesh.instanceMatrix.clearUpdateRanges();mesh.instanceMatrix.addUpdateRange(0,entry.count*16);mesh.instanceMatrix.needsUpdate=true;
        if(mesh.instanceColor){mesh.instanceColor.clearUpdateRanges();mesh.instanceColor.addUpdateRange(0,entry.count*3);mesh.instanceColor.needsUpdate=true;}
        mesh.boundingSphere=null;stats.drawCalls++;
      }
    }
  }
  function dispose(){
    if(disposed)return;disposed=true;
    for(const entry of groups)for(const mesh of entry.meshes)mesh.dispose();
    for(const geometry of ownedGeometries)geometry.dispose();for(const material of ownedMaterials)material.dispose();
    root.clear();mapRoot.clear();root.removeFromParent();mapRoot.removeFromParent();records.clear();trains.length=0;
  }
  return {root,mapRoot,trains,stats,update,dispose};
}
