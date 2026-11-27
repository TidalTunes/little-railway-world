import * as THREE from 'three';
import { box, solidRibbon, consolidate } from './geometry.js';
import { buildTrainCar } from './assets.js';
import { buildBridge } from './geography.js';
import { sampleLine } from './world-model.js';
import { createNetworkTraffic } from './network-traffic.js';
import { createPlayerPalette } from './player-palette.js';
import { bakeMaterialColors } from './color-batches.js';
import {surfaceFor,surfacePoint,rigidSurfacePoseMatrix} from './world-surface.js';

import {physicalLineMetric,physicalDistanceAtChart,chartDistanceAtPhysical} from './physical-route.js';
import {physicalRailBox,physicalRailRibbon} from './physical-rail-geometry.js';
import {M} from './palette.js';
import {applySceneStyle} from './scene-style.js';

const LIVERY = {coral:'redLight',teal:'teal',gold:'gold',blue:'blue'};


export function buildRailways(parent,world,{surfaceRoot,skipTrackBed=false,skipRails=false}={}){
  const physical=!!surfaceRoot&&!!surfaceFor(world),target=physical?surfaceRoot:parent;
  for(const line of world.lines){
    const metric=physical?physicalLineMetric(world,line):null;
    for(const range of line.renderRanges??[{start:0,end:line.length}]){
      const start=physicalDistanceAtChart(metric,range.start),end=physicalDistanceAtChart(metric,range.end);
      const steps=Math.max(1,Math.ceil((end-start)/.30));
      const points=Array.from({length:steps+1},(_,i)=>sampleLine(line,chartDistanceAtPhysical(metric,start+(end-start)*i/steps)));
      if(!skipTrackBed){
        if(physical)physicalRailRibbon(target,world,points,1.88,-.42,-.19,'gravel');
        else solidRibbon(parent,points,1.88,-.42,-.19,'gravel');
      }
      // Keep one arc-length phase across streamed cells, so a cell boundary
      // cannot restart the sleeper pattern or create a doubled/empty gap.
      const firstSleeper=.4+Math.ceil((start-.4)/.85-1e-9)*.85;
      for(let s=firstSleeper;s<Math.min(end,(metric?.length??line.length)-.2)-1e-9;s+=.85){
        const p=sampleLine(line,chartDistanceAtPhysical(metric,s));
        if(physical)physicalRailBox(target,world,p,0,-.14,1.56,.10,.23,'timber');
        else box(parent,p.x,p.y-.14,p.z,1.56,.10,.23,'timber',p.angle);
      }
      if(!skipRails)for(const side of [-1,1]){
        if(physical){physicalRailRibbon(target,world,points,.095,-.09,0,'rail',side*.46);continue;}
        const rail=points.map(p=>({x:p.x+p.tangent.z*side*.46,y:p.y,z:p.z-p.tangent.x*side*.46,tangent:p.tangent}));
        solidRibbon(parent,rail,.095,-.09,0,'rail');
      }
    }
    for(const span of line.bridges)for(const range of line.renderRanges??[{start:0,end:line.length}]){
      const start=Math.max(span.start,range.start),end=Math.min(span.end,range.end);
      if(end-start<1e-6)continue;
      buildBridge(parent,line,{...span,start,end,
        startAbutment:Math.abs(start-span.start)<1e-6,
        endAbutment:Math.abs(end-span.end)<1e-6},world.river.y,world,{surfaceRoot});
    }
  }
}

// Carriages follow one continuous arc-length path through city connections.
// Reversible shuttles remain available for authored networks without a circuit.
export function makeTrains(parent,world,options={}){
  const curved=!!surfaceFor(world);
  const traffic=options.traffic??createNetworkTraffic(world);
  const root=new THREE.Group();root.name='instanced-trains';parent.add(root);
  const palettes=new Map((world.players??[]).map(player=>[player.id,createPlayerPalette(player)]));
  root.userData.ownedMaterials=[...palettes.values()].flatMap(palette=>Object.values(palette));
  const count=traffic.trains.reduce((n,state)=>n+state.count,0);
  const fallback=new Float32Array(count*6),templates=new Map(),batches=new Map();
  let nextIndex=0,disposed=false;
  const trains=traffic.trains.map(state=>{
    const offset=nextIndex;nextIndex+=state.count;
    const parts=Array.from({length:state.count},(_,i)=>{
      // Pose handles preserve selection/follow APIs without putting thousands
      // of empty nodes or detailed car meshes into the render scene graph.
      const part=new THREE.Object3D();part.userData={trainId:state.id,poseOnly:true,poseIndex:offset+i};return part;
    });
    return {state,parts,poseOffset:offset};
  });
  const poseBuffer=()=>traffic.poseBuffer??fallback;
  function synchronize(){
    const buffer=poseBuffer();trains.poseBuffer=buffer;
    for(const train of trains){
      const state=train.state;
      for(let i=0;i<train.parts.length;i++){
        const part=train.parts[i],index=((traffic.poseBuffer?state.poseOffset:train.poseOffset)+i)*6;
        part.userData.poseIndex=index/6;
        if(!traffic.poseBuffer){
          const p=state.carPoses?.[i]??traffic.sampleTrain(state,(i-(state.count-1)/2)*state.spacing);
          buffer[index]=p.x;buffer[index+1]=p.y;buffer[index+2]=p.z;buffer[index+3]=p.angle;
          buffer[index+4]=state.active?1:0;buffer[index+5]=0;
        }
        part.position.set(buffer[index],buffer[index+1],buffer[index+2]);
        part.rotation.y=buffer[index+3]+(i===0?Math.PI:0);part.visible=buffer[index+4]>0;
      }
    }
  }
  const matrix=new THREE.Matrix4(),projection=new THREE.Matrix4(),frustum=new THREE.Frustum();
  const sphere=new THREE.Sphere(new THREE.Vector3(),2.2),position=new THREE.Vector3();
  const quaternion=new THREE.Quaternion(),unit=new THREE.Vector3(1,1,1),up=new THREE.Vector3(0,1,0);
  const connectorGeometry=new THREE.BoxGeometry(.64,.74,1);
  const connectorColors=new Float32Array(connectorGeometry.attributes.position.count*3);
  for(let i=0;i<connectorColors.length;i+=3)M.metal.color.toArray(connectorColors,i);
  connectorGeometry.setAttribute('color',new THREE.BufferAttribute(connectorColors,3));
  const connectorMaterial=applySceneStyle(new THREE.MeshStandardMaterial({color:0xffffff,vertexColors:true,roughness:1,flatShading:true}));
  connectorMaterial.name='train-gangway';root.userData.ownedMaterials.push(connectorMaterial);
  let connectors=null,connectorCapacity=0;
  const connectorA=new THREE.Matrix4(),connectorB=new THREE.Matrix4(),connectorCenter=new THREE.Vector3();
  const endA=new THREE.Vector3(),endB=new THREE.Vector3(),forwardA=new THREE.Vector3(),forwardB=new THREE.Vector3();
  const connectorX=new THREE.Vector3(),connectorY=new THREE.Vector3(),connectorZ=new THREE.Vector3(),upB=new THREE.Vector3();
  const stats={totalTrains:trains.length,totalCars:count,visibleCars:0,visibleTrains:0,visibleConnectors:0,batches:0,templates:0,uploadedMatrices:0};
  function carMatrix(part,target){
    if(curved)return rigidSurfacePoseMatrix(world,part.position.x,part.position.y,part.position.z,part.rotation.y,target);
    quaternion.setFromAxisAngle(up,part.rotation.y);return target.compose(part.position,quaternion,unit);
  }
  function connectorMatrix(a,b){
    carMatrix(a,connectorA);carMatrix(b,connectorB);
    endA.setFromMatrixPosition(connectorA);endB.setFromMatrixPosition(connectorB);connectorZ.subVectors(endB,endA);
    forwardA.setFromMatrixColumn(connectorA,2);forwardB.setFromMatrixColumn(connectorB,2);
    // Endpoints are embedded in the shells, not on independently spaced
    // coupler stubs. The overlap closes seams even on the sharpest rail bend.
    const directionA=forwardA.dot(connectorZ)>=0?1:-1,directionB=forwardB.dot(connectorZ)>=0?-1:1;
    endA.set(0,.88,directionA*.92).applyMatrix4(connectorA);
    endB.set(0,.88,directionB*.92).applyMatrix4(connectorB);
    connectorZ.subVectors(endB,endA);const length=connectorZ.length();
    if(length<.02||length>2)return false;
    connectorCenter.copy(endA).add(endB).multiplyScalar(.5);
    sphere.center.copy(connectorCenter).applyMatrix4(parent.matrixWorld);sphere.radius=.85;
    connectorY.setFromMatrixColumn(connectorA,1).add(upB.setFromMatrixColumn(connectorB,1)).normalize();
    connectorZ.multiplyScalar(1/length);connectorX.crossVectors(connectorY,connectorZ).normalize();
    connectorY.crossVectors(connectorZ,connectorX).normalize();
    matrix.makeBasis(connectorX,connectorY,connectorZ).scale(position.set(1,1,length));matrix.setPosition(connectorCenter);
    return true;
  }
  function templateFor(train,cab){
    const key=`${train.state.ownerId??train.state.color}:${cab?1:0}`;
    if(!templates.has(key)){
      const template=bakeMaterialColors(consolidate(buildTrainCar(new THREE.Group(),{palette:palettes.get(train.state.ownerId),
        color:LIVERY[train.state.color]??'redLight',cab})));
      root.userData.ownedMaterials.push(...template.userData.ownedMaterials);
      templates.set(key,template.children.map(mesh=>({geometry:mesh.geometry,material:mesh.material})));
    }
    return {key,parts:templates.get(key)};
  }
  function updateView(camera,{mapBlend=0,prewarm=false}={}){
    if(disposed)return;root.visible=mapBlend<.999||prewarm;
    stats.visibleCars=0;stats.visibleTrains=0;stats.visibleConnectors=0;stats.uploadedMatrices=0;
    if(!root.visible)return;
    if(camera){camera.updateMatrixWorld();projection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);frustum.setFromProjectionMatrix(projection);}
    parent.updateWorldMatrix(true,false);
    const visible=new Map(),visibleTrains=new Set();
    sphere.radius=2.2;
    for(const train of trains)for(let i=0;i<train.parts.length;i++){
      const part=train.parts[i];if(!part.visible)continue;
      if(curved)surfacePoint(world,part.position.x,part.position.y+.8,part.position.z,sphere.center);
      else sphere.center.copy(part.position).addScaledVector(up,.8);
      sphere.center.applyMatrix4(parent.matrixWorld);
      if(camera&&!frustum.intersectsSphere(sphere))continue;
      const cab=i===0||i===train.parts.length-1,key=`${train.state.ownerId??train.state.color}:${cab?1:0}`;
      if(!visible.has(key))visible.set(key,{train,cab,cars:[]});visible.get(key).cars.push({train,part});stats.visibleCars++;visibleTrains.add(train.state.id);
    }
    for(const [key,batch]of batches)if(!visible.has(key))batch.meshes.forEach(mesh=>{mesh.count=0;});
    for(const [key,entry]of visible){
      let batch=batches.get(key);
      if(!batch||batch.capacity<entry.cars.length){
        if(batch)for(const mesh of batch.meshes){root.remove(mesh);mesh.dispose();}
        const template=templateFor(entry.train,entry.cab),capacity=2**Math.ceil(Math.log2(Math.max(16,entry.cars.length)));
        batch={capacity,meshes:template.parts.map(part=>{
          const mesh=new THREE.InstancedMesh(part.geometry,part.material,capacity);mesh.count=0;
          mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;
          mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.instanceTrainIds=[];mesh.userData.ownerId=entry.train.state.ownerId;root.add(mesh);return mesh;
        })};batches.set(key,batch);
      }
      for(let index=0;index<entry.cars.length;index++){
        const {train,part}=entry.cars[index];carMatrix(part,matrix);
        for(const mesh of batch.meshes){mesh.setMatrixAt(index,matrix);mesh.userData.instanceTrainIds[index]=train.state.id;}
      }
      for(const mesh of batch.meshes){
        mesh.count=entry.cars.length;mesh.userData.instanceTrainIds.length=mesh.count;
        mesh.instanceMatrix.clearUpdateRanges();mesh.instanceMatrix.addUpdateRange(0,mesh.count*16);mesh.instanceMatrix.needsUpdate=true;mesh.boundingSphere=null;
        stats.uploadedMatrices+=mesh.count;
      }
    }
    // One neutral, reusable batch links only nearby visible cars. It shares
    // the same physical poses as the car shells on both flat and globe worlds.
    const maximumConnectors=stats.visibleCars;
    if(maximumConnectors>connectorCapacity){
      if(connectors){root.remove(connectors);connectors.dispose();}
      connectorCapacity=2**Math.ceil(Math.log2(Math.max(16,maximumConnectors)));
      connectors=new THREE.InstancedMesh(connectorGeometry,connectorMaterial,connectorCapacity);
      connectors.name='train-gangways';connectors.count=0;connectors.frustumCulled=false;
      connectors.instanceMatrix.setUsage(THREE.DynamicDrawUsage);connectors.castShadow=true;connectors.receiveShadow=true;
      connectors.userData={isTrainConnector:true,instanceTrainIds:[]};root.add(connectors);
    }
    if(connectors){
      for(const train of trains){
        if(!visibleTrains.has(train.state.id))continue;
        for(let i=1;i<train.parts.length;i++){
          const a=train.parts[i-1],b=train.parts[i];
          if(!a.visible||!b.visible||!connectorMatrix(a,b)||camera&&!frustum.intersectsSphere(sphere))continue;
          if(stats.visibleConnectors>=connectorCapacity)break;
          connectors.setMatrixAt(stats.visibleConnectors,matrix);connectors.userData.instanceTrainIds[stats.visibleConnectors++]=train.state.id;
        }
      }
      connectors.count=stats.visibleConnectors;connectors.userData.instanceTrainIds.length=connectors.count;connectors.boundingSphere=null;
      connectors.instanceMatrix.clearUpdateRanges();connectors.instanceMatrix.addUpdateRange(0,connectors.count*16);connectors.instanceMatrix.needsUpdate=true;
      stats.uploadedMatrices+=connectors.count;
    }
    stats.visibleTrains=visibleTrains.size;
    stats.batches=[...batches.values()].reduce((n,b)=>n+b.meshes.length,0)+(connectors?1:0);stats.templates=templates.size;
  }
  function dispose(){
    if(disposed)return;disposed=true;
    for(const batch of batches.values())batch.meshes.forEach(mesh=>mesh.dispose());
    for(const parts of templates.values())parts.forEach(part=>part.geometry.dispose());
    connectors?.dispose();connectorGeometry.dispose();
    root.userData.ownedMaterials.forEach(material=>material.dispose());root.clear();root.removeFromParent();
  }
  synchronize();
  return {root,trains,traffic,stats,get poseBuffer(){return poseBuffer();},
    update(dt){if(!disposed){
      const started=performance.now();traffic.update(dt);const sampled=performance.now();synchronize();
      stats.simulationMs=sampled-started;stats.poseMs=performance.now()-sampled;
    }},updateView,dispose};
}
