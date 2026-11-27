import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createTradeTrains,TRADE_TRAIN_LIMITS} from '../src/trade-trains.js';
import {playerColors} from '../src/player-palette.js';
import {M} from '../src/palette.js';

const world={players:[{id:'teal',color:{l:.60,c:.13,h:185}},{id:'coral',color:{l:.63,c:.14,h:24}}]};
const train=(id=1,values={})=>({id:`freight-${id}`,ownerId:'teal',x:0,y:.42,z:0,angle:0,cargo:'timber',amount:6,active:true,...values});
function fixture(t){const parent=new THREE.Group(),mapParent=new THREE.Group(),art=createTradeTrains(parent,mapParent,world);t.after(()=>art.dispose());return {art,parent,mapParent};}
const meshes=root=>{const result=[];root.traverse(node=>{if(node.isInstancedMesh)result.push(node);});return result;};

test('freight uses owner-colored locomotives, open wagons and distinct loaded cargo',t=>{
  const {art}=fixture(t),states=[train(1),train(2,{ownerId:'coral',cargo:'grain',x:10}),train(3,{cargo:'tools',x:20}),train(4,{cargo:null,amount:0,x:30})];
  art.update(states);assert.equal(art.stats.active,4);assert.equal(art.stats.visible,4);assert.equal(art.stats.detailInstances,11);
  assert.equal(art.root.getObjectByName('trade-wagon:teal').count,3);assert.equal(art.root.getObjectByName('trade-wagon:coral').count,1);
  for(const kind of ['timber','grain','tools'])assert.equal(art.root.getObjectByName(`trade-cargo:${kind}`).count,1);
  const teal=art.root.getObjectByName('trade-locomotive:teal').geometry.attributes.color,coral=art.root.getObjectByName('trade-locomotive:coral').geometry.attributes.color;
  assert.notDeepEqual(teal.array,coral.array);
  assert.ok(art.stats.drawCalls<16);assert.equal(art.mapRoot.visible,false);
});

test('exact optional carriage poses are preserved for curved rails and train following',t=>{
  const {art}=fixture(t),state=train(1,{carPoses:[{x:3,y:.6,z:4,angle:.3},{x:2,y:.55,z:2,angle:.7}]});
  art.update([state]);const record=art.trains[0];assert.equal(record.state,state);
  assert.deepEqual(record.parts[0].position.toArray(),[3,.6,4]);assert.equal(record.parts[0].rotation.y,.3);
  assert.deepEqual(record.parts[1].position.toArray(),[2,.55,2]);assert.equal(record.parts[1].rotation.y,.7);
  assert.equal(record.parts[0].userData.trainId,state.id);assert.equal(record.parts[1].userData.poseOnly,true);
  const matrix=new THREE.Matrix4(),expected=new THREE.Matrix4().makeRotationY(.7);expected.setPosition(2,.55,2);
  art.root.getObjectByName('trade-wagon:teal').getMatrixAt(0,matrix);matrix.elements.forEach((value,index)=>assert.ok(Math.abs(value-expected.elements[index])<1e-6));
  art.update([train(1,{x:5,angle:Math.PI/2})]);assert.equal(art.trains[0],record);assert.ok(Math.abs(record.parts[1].position.x-(5-TRADE_TRAIN_LIMITS.spacing))<1e-8);
});

test('engine shipment objects show the cargo load, and an explicit one-car pose hides the wagon',t=>{
  const {art}=fixture(t),state=train(1,{resource:'grain',cargo:{resource:'grain',quantity:4},amount:4});
  art.update([state],{mapBlend:.5});assert.equal(art.root.getObjectByName('trade-cargo:grain').count,1);
  state.carPoses=[{x:0,y:.42,z:0,angle:0}];art.update([state],{mapBlend:.5});
  assert.equal(art.root.getObjectByName('trade-wagon:teal').count,0);assert.equal(art.root.getObjectByName('trade-cargo:grain').count,0);
  assert.equal(art.mapRoot.getObjectByName('trade-map-cargo').count,0);assert.equal(art.trains[0].parts[1].visible,false);
  assert.equal(art.stats.detailInstances,1);
});

test('map glyphs remain readable at distant zoom, carry owner and cargo colors, and fade out of walking mode',t=>{
  const {art}=fixture(t),camera=new THREE.OrthographicCamera(-200,200,200,-200,.1,1000);camera.position.set(0,100,0);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  art.update([train()],{camera,mapBlend:1,viewportHeight:800});assert.equal(art.root.visible,false);assert.equal(art.mapRoot.visible,true);
  assert.equal(art.stats.detailInstances,0);assert.equal(art.stats.mapInstances,1);
  const body=art.mapRoot.getObjectByName('trade-map-body'),matrix=new THREE.Matrix4(),color=new THREE.Color();body.getMatrixAt(0,matrix);body.getColorAt(0,color);
  assert.ok(Math.abs(color.r-playerColors(world.players[0]).body.r)<1e-6);assert.ok(new THREE.Vector3().setFromMatrixScale(matrix).x>2);
  assert.equal(art.mapRoot.getObjectByName('trade-map-cargo').count,1);
  art.update([train()],{mapBlend:1,walkingWeight:1});assert.equal(art.mapRoot.visible,false);assert.equal(art.stats.mapInstances,0);
});

test('stationary capacities reuse every geometry, material and instance buffer across frames',t=>{
  const {art}=fixture(t),states=Array.from({length:40},(_,i)=>train(i,{x:i*3,cargo:i%2?'grain':'timber'}));
  art.update(states,{mapBlend:.5});const batches=[...meshes(art.root),...meshes(art.mapRoot)],resources=batches.map(mesh=>[mesh,mesh.geometry,mesh.material,mesh.instanceMatrix.array]);
  const count=art.stats.drawCalls;
  for(let frame=0;frame<10;frame++){for(const state of states)state.z+=.1;art.update(states,{mapBlend:.5});}
  assert.equal(art.stats.drawCalls,count);
  resources.forEach(([mesh,geometry,material,buffer])=>{assert.equal(mesh.geometry,geometry);assert.equal(mesh.material,material);assert.equal(mesh.instanceMatrix.array,buffer);});
  assert.ok(count<16,'draw count depends on owner and cargo batches, not train count');
});

test('inactive and culled trains disappear without stale instances, while follow poses stay current',t=>{
  const {art}=fixture(t),camera=new THREE.OrthographicCamera(-10,10,10,-10,.1,1000);camera.position.set(0,100,0);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  art.update([train(),train(2,{x:100}),train(3,{active:false})],{camera,mapBlend:.5});assert.equal(art.stats.active,2);assert.equal(art.stats.visible,1);assert.equal(art.trains.length,2);
  const old=art.trains[0];art.update([],{mapBlend:.5});assert.equal(art.trains.length,0);assert.equal(old.parts[0].visible,false);
  for(const mesh of [...meshes(art.root),...meshes(art.mapRoot)])assert.equal(mesh.count,0);
  assert.equal(art.stats.drawCalls,0);
});

test('a selected train handle is inactive while idle and is reused on its next trip without new GPU resources',t=>{
  const {art}=fixture(t),active=train();art.update([active],{mapBlend:.5});
  const selected=art.trains[0],parts=[...selected.parts];
  const resources=[...meshes(art.root),...meshes(art.mapRoot)].map(mesh=>[mesh,mesh.geometry,mesh.material,mesh.instanceMatrix.array]);
  for(let trip=0;trip<3;trip++){
    const idle={id:active.id,ownerId:active.ownerId,active:false,state:'idle'};
    art.update([idle],{mapBlend:.5});
    assert.equal(selected.state,idle);assert.equal(selected.state.active,false);assert.ok(parts.every(part=>!part.visible));
    assert.equal(art.trains.length,0);assert.equal(art.stats.drawCalls,0);
    art.update([],{mapBlend:.5});assert.equal(selected.state.active,false);
    art.update([train(1,{x:trip+1})],{mapBlend:.5});
    assert.equal(art.trains[0],selected);assert.deepEqual(selected.parts,parts);assert.equal(selected.state.active,true);assert.ok(parts.every(part=>part.visible));
  }
  art.update([]);assert.equal(selected.state.active,false);assert.ok(parts.every(part=>!part.visible));
  assert.equal(active.active,true,'the renderer does not mutate an engine snapshot');
  for(const [mesh,geometry,material,buffer]of resources){assert.equal(mesh.geometry,geometry);assert.equal(mesh.material,material);assert.equal(mesh.instanceMatrix.array,buffer);}
});

test('disposing freight releases owned resources once without disposing shared asset materials',()=>{
  const parent=new THREE.Group(),mapParent=new THREE.Group(),art=createTradeTrains(parent,mapParent,world),resources=new Set();
  for(const mesh of [...meshes(art.root),...meshes(art.mapRoot)]){resources.add(mesh.geometry);resources.add(mesh.material);}
  let sharedDisposals=0;const onShared=()=>sharedDisposals++;M.metal.addEventListener('dispose',onShared);
  const counts=new Map();for(const resource of resources)resource.addEventListener('dispose',()=>counts.set(resource,(counts.get(resource)??0)+1));
  art.dispose();art.dispose();M.metal.removeEventListener('dispose',onShared);
  assert.equal(parent.children.length,0);assert.equal(mapParent.children.length,0);assert.equal(sharedDisposals,0);for(const resource of resources)assert.equal(counts.get(resource),1);
});


test('wood, metal and food loop freight renders distinct loads and map cargo colors',t=>{
  const {art}=fixture(t),resources=['wood','metal','food'];
  art.update(resources.map((resource,i)=>train(i,{resource,cargo:{[resource]:10},amount:10,x:i*10})),{mapBlend:.5});
  for(const kind of ['timber','metal','grain'])assert.equal(art.root.getObjectByName(`trade-cargo:${kind}`).count,1);
  assert.equal(art.stats.detailInstances,9);assert.equal(art.mapRoot.getObjectByName('trade-map-cargo').count,3);
  const colors=[];for(let i=0;i<3;i++){const color=new THREE.Color();art.mapRoot.getObjectByName('trade-map-cargo').getColorAt(i,color);colors.push(color.getHexString());}
  assert.equal(new Set(colors).size,3);
  const metal=art.root.getObjectByName('trade-cargo:metal'),bounds=new THREE.Box3().setFromBufferAttribute(metal.geometry.attributes.position);
  assert.ok(bounds.min.y>=.55&&bounds.max.y<1.2,'ingots sit on the wagon deck and stack below its silhouette budget');
  assert.ok(bounds.max.x<.46&&bounds.min.x>-.46);assert.ok(bounds.max.z<1.02&&bounds.min.z> -1.02);
  const geometry=metal.geometry;art.update([train(5,{resource:'metal',amount:20})]);assert.equal(art.root.getObjectByName('trade-cargo:metal').geometry,geometry);
});
