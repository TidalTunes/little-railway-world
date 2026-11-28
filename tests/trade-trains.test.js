import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createTradeTrains,TRADE_TRAIN_LIMITS} from '../src/trade-trains.js';
import {playerColors} from '../src/player-palette.js';
import {M} from '../src/palette.js';
import {buildSteamLocomotive} from '../src/steam-locomotive.js';
import {createLoopEconomy} from '../src/loop-economy.js';

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

test('long circuits draw every city carriage and put each load on its own curved pose',t=>{
  const {art}=fixture(t),carPoses=Array.from({length:6},(_,index)=>({x:index*2,y:.42,z:-index*2,angle:index*.12}));
  const cars=[{cityId:'home',resource:'wood',amount:10},{cityId:'farm',resource:'food',amount:10},
    {cityId:'mine',resource:'metal',amount:10},{cityId:'other-mine',resource:'metal',amount:10},
    {cityId:'clearing',resource:'gold',amount:0},{cityId:'forest',resource:'wood',amount:0}];
  const state=train(1,{carPoses,cars,carCount:cars.length});art.update([state],{mapBlend:.5});
  assert.equal(art.stats.detailCars,6);assert.equal(art.stats.detailInstances,9);assert.equal(art.trains[0].parts.length,6);
  assert.equal(art.root.getObjectByName('trade-locomotive:teal').count,1);assert.equal(art.root.getObjectByName('trade-wagon:teal').count,5);
  assert.equal(art.root.getObjectByName('trade-cargo:grain').count,1);assert.equal(art.root.getObjectByName('trade-cargo:metal').count,2);
  assert.equal(art.root.getObjectByName('trade-cargo:timber').count,0,'the engine does not draw a wagon load through its boiler');
  const transform=new THREE.Matrix4();
  art.root.getObjectByName('trade-cargo:metal').getMatrixAt(1,transform);
  const position=new THREE.Vector3().setFromMatrixPosition(transform);assert.deepEqual(position.toArray().map(n=>Math.round(n*100)/100),[6,.42,-6]);
  carPoses.forEach((pose,index)=>assert.deepEqual(art.trains[0].parts[index].position.toArray(),[pose.x,pose.y,pose.z]));
});

test('a single-city train is exactly one steam engine while a visible tail keeps a long train rendered',t=>{
  const {art}=fixture(t);
  art.update([train(1,{carPoses:[{x:0,y:.42,z:0,angle:0}],cars:[{cityId:'home',resource:'wood',amount:10}]})]);
  assert.equal(art.stats.detailCars,1);assert.equal(art.stats.detailInstances,1);assert.equal(art.trains[0].parts.length,1);
  const camera=new THREE.OrthographicCamera(-10,10,10,-10,.1,1000);camera.position.set(0,100,0);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const poses=Array.from({length:13},(_,i)=>({x:31.2-i*2.6,y:.42,z:0,angle:Math.PI/2}));
  art.update([train(2,{x:31.2,carPoses:poses})],{camera});
  assert.equal(art.stats.visible,1,'the front engine being outside the viewport must not hide its visible trailing cars');
  assert.equal(art.stats.detailCars,13);assert.equal(art.root.getObjectByName('trade-wagon:teal').count,12);
});

test('larger strategy glyphs have an eight-and-a-half pixel body at distant overview zoom',t=>{
  const {art}=fixture(t),camera=new THREE.OrthographicCamera(-200,200,200,-200,.1,1000);camera.position.set(0,100,0);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  art.update([train()],{camera,mapBlend:1,viewportHeight:800});
  const transform=new THREE.Matrix4();art.mapRoot.getObjectByName('trade-map-body').getMatrixAt(0,transform);
  const scale=new THREE.Vector3().setFromMatrixScale(transform);
  assert.ok(scale.x*1.2*2>=8.499);assert.ok(scale.z*4.65*2>=22.999);
});

test('the industrial steam engine has flush bodywork and six grounded wheels inside the existing car envelope',t=>{
  const root=buildSteamLocomotive(),boiler=root.getObjectByName('boiler'),cab=root.getObjectByName('cab'),chimney=root.getObjectByName('chimney');
  t.after(()=>{const geometries=new Set();root.traverse(node=>{if(node.geometry&&node.geometry.type!=='BoxGeometry')geometries.add(node.geometry);});for(const geometry of geometries)geometry.dispose();});
  assert.ok(boiler&&cab&&chimney);root.updateMatrixWorld(true);
  const boxFor=node=>new THREE.Box3().setFromObject(typeof node==='string'?root.getObjectByName(node):node,true);
  const bodyBounds=boxFor(boiler),cabBounds=boxFor(cab),bounds=boxFor(root),deck=boxFor('running-board');
  assert.ok(bodyBounds.min.z<=cabBounds.max.z&&bodyBounds.max.z>cabBounds.max.z,'boiler connects flush into the front of the cab');
  assert.ok(chimney.position.y>bodyBounds.max.y);assert.ok(boxFor(chimney).min.y<bodyBounds.max.y,'the stack is seated in the smokebox');
  assert.equal(chimney.geometry.parameters.radiusTop,chimney.geometry.parameters.radiusBottom,'the chimney is a straight industrial pipe');
  assert.ok(bounds.max.y<1.6);assert.ok(bounds.min.x>-.60&&bounds.max.x<.60);assert.ok(Math.abs(bounds.min.y)<1e-6);
  assert.ok(bounds.min.z>=-1.580001&&bounds.max.z<=1.250001,'couplings preserve the 2.6-unit carriage spacing envelope');
  assert.equal(TRADE_TRAIN_LIMITS.spacing,2.6);
  assert.ok(Math.abs(boxFor('underframe').max.y-deck.min.y)<1e-8);
  for(const name of['cab','water-tank-right','water-tank-left'])assert.ok(Math.abs(boxFor(name).min.y-deck.max.y)<1e-8,`${name} rests directly on the running board`);
  assert.ok(boxFor('cab-roof').min.y<=cabBounds.max.y&&boxFor('cab-roof').max.y>cabBounds.max.y);
  let wheels=0,triangles=0;root.traverse(node=>{
    if(!node.isMesh)return;triangles+=(node.geometry.index?.count??node.geometry.attributes.position.count)/3;
    assert.ok(node.geometry.attributes.position.array.every(Number.isFinite));assert.ok(node.geometry.attributes.normal.array.every(Number.isFinite));
    if(node.name==='driving-wheel'){wheels++;assert.ok(Math.abs(boxFor(node).min.y)<1e-6,'every driving wheel touches the same rail datum');}
  });
  assert.equal(wheels,6);assert.ok(triangles<1300,'the added machinery stays inside the consolidated low-poly budget');
});

test('locomotive ownership is painted on tanks and cab while machinery stays restrained',t=>{
  const body=new THREE.MeshStandardMaterial({color:0x307e78}),dark=new THREE.MeshStandardMaterial({color:0x123e39}),trim=new THREE.MeshStandardMaterial({color:0xfff2bd});
  const root=buildSteamLocomotive({body,dark,trim}),used=new Set();
  t.after(()=>{const geometries=new Set();root.traverse(node=>{if(node.geometry&&node.geometry.type!=='BoxGeometry')geometries.add(node.geometry);});for(const geometry of geometries)geometry.dispose();body.dispose();dark.dispose();trim.dispose();});
  for(const name of['cab','water-tank-right','water-tank-left'])assert.equal(root.getObjectByName(name).material,body);
  for(const name of['boiler','smokebox','chimney','cab-roof','steam-dome'])assert.equal(root.getObjectByName(name).material,M.metal);
  root.traverse(node=>{if(node.isMesh)used.add(node.material);});assert.ok(!used.has(M.gold)&&!used.has(M.trim)&&!used.has(trim),'no gold dome or cream body bands');
  const lamp=root.getObjectByName('front-lamp');assert.equal(lamp.material,M.lamp);assert.ok(lamp.scale.x<.08&&lamp.scale.y<.08,'small functional lamp preserves the smokebox silhouette');
});

test('stationary waiting trains and slow carriage poses remain visible without changing their geometry',t=>{
  const{art}=fixture(t),carPoses=[{x:3,y:.42,z:4,angle:.4},{x:2,y:.42,z:1.6,angle:.35}],state=train(1,{state:'waiting',speed:0,carPoses});
  art.update([state],{mapBlend:.5});const record=art.trains[0],loco=art.root.getObjectByName('trade-locomotive:teal'),geometry=loco.geometry,buffer=loco.instanceMatrix.array;
  for(let frame=0;frame<4;frame++){art.update([state],{mapBlend:.5});assert.equal(art.stats.visible,1);assert.equal(art.stats.detailCars,2);assert.equal(art.stats.mapInstances,1);assert.deepEqual(record.parts[0].position.toArray(),[3,.42,4]);}
  state.state='moving';state.speed=.2;carPoses[0].z+=.01;carPoses[1].z+=.01;art.update([state],{mapBlend:.5});
  assert.equal(art.trains[0],record);assert.equal(record.parts[0].position.z,4.01);assert.equal(record.parts[1].position.z,1.61);assert.equal(loco.geometry,geometry);assert.equal(loco.instanceMatrix.array,buffer);
});


test('unified Resources freight combines timber and ore in one reusable load',t=>{
  const {art}=fixture(t);
  art.update([train(1,{resource:'resources',cargo:{resources:10},amount:10})],{mapBlend:.5});
  const load=art.root.getObjectByName('trade-cargo:resources');assert.equal(load.count,1);
  assert.equal(art.root.getObjectByName('trade-cargo:timber').count,0);
  assert.equal(art.root.getObjectByName('trade-cargo:metal').count,0);
  const bounds=new THREE.Box3().setFromBufferAttribute(load.geometry.attributes.position);
  assert.ok(bounds.min.y>=.55&&bounds.max.y<1.2);assert.ok(bounds.min.z> -1.02&&bounds.max.z<1.02);
  const geometry=load.geometry,buffer=load.instanceMatrix.array;
  art.update([train(1,{resource:'resources',cargo:{resources:20},amount:20})]);
  assert.equal(load.geometry,geometry);assert.equal(load.instanceMatrix.array,buffer);
});

test('finite-economy trains enter the rendered fleet only after admission and hold their loaded carriage at stations',t=>{
  const {art}=fixture(t),length=Math.PI*20,step=1/30;
  const home={id:'home',ownerId:'teal',level:2,houseCount:6,x:10,z:0},farm={id:'farm',ownerId:'gray',level:2,houseCount:6,x:-10,z:0,stock:{food:10}};
  const circuit={id:'loop',length,cityIds:['home','farm'],stationIds:['home-platform','farm-platform'],
    stops:[{cityId:'home',stationId:'home-platform',distance:0},{cityId:'farm',stationId:'farm-platform',distance:length/2}],
    segments:[{lineId:'shared-track',start:0,end:length,offset:0,length}]};
  const game={ownerId:'teal',logs:100,food:12,gold:50,cities:[home],
    spendLogs(amount){if(this.logs<amount)return {ok:false};this.logs-=amount;return {ok:true};},
    addLogs(amount){this.logs+=amount;return {ok:true};},addFood(amount){this.food+=amount;return {ok:true};},
    spendGold(amount){if(this.gold<amount)return {ok:false};this.gold-=amount;return {ok:true};},creditGold(amount){this.gold+=amount;return {ok:true};}};
  const sample=distance=>{const angle=distance/10;return{x:Math.cos(angle)*10,y:.42,z:Math.sin(angle)*10,angle:-angle,tangent:{x:-Math.sin(angle),y:0,z:Math.cos(angle)}};};
  const economy=createLoopEconomy({gameplay:{economy:'loops',farmVillages:{ownerId:'gray',cities:[farm]}}},
    {session:{player:game,bots:[]},railways:{revision:0,snapshot:()=>({revision:0})},networkFactory:()=>({loops:()=>[circuit],sample:(_loop,distance)=>sample(distance)})});
  function until(condition){
    for(let i=0;i<1800;i++){
      const states=economy.trains;if(condition(states)){art.update(states,{mapBlend:.5});return states;}
      economy.update(step);
    }
    assert.fail('Expected train lifecycle state within one minute');
  }
  for(let i=0;i<2;i++)assert.equal(economy.buyTrain('home','loop','teal').ok,true);
  art.update(economy.trains,{mapBlend:.5});
  assert.equal(art.stats.active,1);assert.equal(art.stats.visible,1);assert.equal(art.stats.detailCars,2);assert.equal(art.stats.mapInstances,1);
  assert.equal(economy.trains[1].state,'queued');assert.equal(economy.trains[1].active,false);
  assert.equal(art.root.getObjectByName('trade-locomotive:teal').count,1);assert.equal(art.root.getObjectByName('trade-wagon:teal').count,1);
  const firstRecord=art.trains[0];assert.deepEqual(firstRecord.parts[0].position.toArray(),[10,.42,0]);
  const buffers=meshes(art.root).map(mesh=>[mesh,mesh.instanceMatrix.array]);
  until(states=>states[1].active);assert.equal(art.stats.visible,2);assert.equal(art.stats.detailCars,4);assert.equal(art.stats.mapInstances,2);assert.equal(art.trains[0],firstRecord);
  const records=[...art.trains];economy.drainEvents();
  const stopped=until(states=>states[0].state==='dwell'&&states[0].stopCityId==='farm')[0];
  const pickups=economy.drainEvents().filter(event=>event.type==='pickup');assert.equal(pickups.length,1);assert.equal(pickups[0].amount,2);assert.equal(pickups[0].stockTaken,1);assert.equal(pickups[0].minted,1);
  assert.equal(stopped.cars[0].amount,0);assert.equal(stopped.cars[1].amount,2);assert.equal(stopped.speed,0);
  assert.equal(art.root.getObjectByName('trade-cargo:grain').count,1);assert.equal(art.stats.visible,2,'an admitted train stays visible while loading');
  assert.ok(Math.abs(firstRecord.parts[1].position.x+10)<1e-7);assert.ok(Math.abs(firstRecord.parts[1].position.z)<1e-7);
  const parked=firstRecord.parts.map(part=>part.position.clone());economy.update(.5);art.update(economy.trains,{mapBlend:.5});
  assert.equal(economy.trains[0].state,'dwell');firstRecord.parts.forEach((part,index)=>assert.deepEqual(part.position,parked[index]));
  until(states=>states[0].state==='moving'&&states[0].distance>stopped.distance+.1);
  assert.ok(firstRecord.parts[1].position.distanceTo(parked[1])>.05);assert.deepEqual(art.trains,records);
  until(states=>states.every(state=>state.laps>=1));
  const states=economy.trains;assert.equal(game.food+economy.resourcesAt('gray').food+states.reduce((sum,state)=>sum+state.cargo.food,0),22+economy.snapshot().stats.minted.food,'only the explicit loading bonus creates cargo; rendering never does');
  assert.equal(game.gold+economy.resourcesAt('gray').gold+states.reduce((sum,state)=>sum+state.escrowGold,0),50,'Gold remains in wallets or held fares');
  for(const [mesh,buffer]of buffers)assert.equal(mesh.instanceMatrix.array,buffer,'station stops reuse all existing GPU buffers');
});
