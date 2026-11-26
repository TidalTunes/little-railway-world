import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorldRenderer,compileDetailPacket,detailPacketTransfers} from '../src/world-renderer.js';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';

const flush=()=>new Promise(resolve=>setImmediate(resolve));
const world={outline:[[0,0],[2400,0],[2400,2400],[0,2400]],cities:[],mountains:[],stations:[]};
function cameraAt(x=500,z=500){
  const camera=new THREE.OrthographicCamera(-8,8,8,-8,.1,2000);
  camera.position.set(x,100,z);camera.lookAt(x,0,z);camera.updateMatrixWorld();return camera;
}
function packet({x,z,size},styles=['terrain']){
  const minX=Math.floor(x/size)*size,minZ=Math.floor(z/size)*size;
  const bounds={minX,minZ,maxX:minX+size,maxZ:minZ+size};
  return {bounds,cellBounds:bounds,placements:[{id:`house-${minX}:${minZ}`,kind:'house',x:minX+10,z:minZ+10,scale:1,variant:2},
    {id:`farm-${minX}:${minZ}`,kind:'farm',x:minX+20,z:minZ+20,parcels:[{crop:'pasture',width:8,depth:9}]}],
  cityStreets:[{id:`street-${minX}:${minZ}`,width:1,points:[{x:minX,z:minZ},{x:minX+12,z:minZ+12}]}],
  meshes:styles.map(sceneStyle=>({position:new Float32Array([minX,0,minZ,minX+size,0,minZ,minX,0,minZ+size]),
    normal:new Float32Array([0,1,0,0,1,0,0,1,0]),material:{name:sceneStyle,sceneStyle,color:[.4,.5,.3],roughness:1,metalness:0,side:0,vertexColors:false}}))};
}
async function settle(renderer,camera,options){
  for(let i=0;i<30&&!renderer.ready;i++){renderer.update(camera,{budgetMs:100,...options});await flush();}
  assert.equal(renderer.ready,true);
}

test('perspective coverage uses diverging ground rays rather than an orthographic near-plane footprint',async t=>{
  const renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxChunks:36,maxPending:40,requestChunk:coordinates=>packet(coordinates)});
  t.after(()=>renderer.dispose());
  const camera=new THREE.PerspectiveCamera(90,1,.1,200);
  camera.position.set(192,80,192);camera.lookAt(192,0,192);camera.updateMatrixWorld();
  await settle(renderer,camera,{target:new THREE.Vector3(192,0,192)});
  assert.equal(renderer.stats.requiredChunks,16,'the 160-unit ground footprint spans four cells in each direction');
  assert.equal(renderer.hasCoverageAt({x:116,z:116}),true);
  assert.equal(renderer.hasCoverageAt({x:268,z:268}),true);
});

test('a horizontal walking camera pins only nearby ground, never its far horizon',async t=>{
  const requested=[],renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxChunks:9,maxPending:20,
    requestChunk:coordinates=>{requested.push(coordinates);return packet(coordinates);}});
  t.after(()=>renderer.dispose());
  const camera=new THREE.PerspectiveCamera(62,1.7,.05,100000);
  camera.position.set(500,1.6,500);camera.lookAt(500,1.6,400);camera.updateMatrixWorld();
  await settle(renderer,camera,{groundFocus:{x:500,z:500},groundRadius:45,groundOnly:true});
  assert.equal(renderer.stats.requiredChunks,9);assert.equal(renderer.stats.loadedChunks,9);
  assert.equal(requested.length,9);assert.ok(requested.every(p=>Math.abs(p.x-500)<76&&Math.abs(p.z-500)<76));
  assert.equal(renderer.hasCoverageAt({x:500,z:500},20),true);
  assert.equal(renderer.hasCoverageAt({x:1000,z:1000}),false);
});

test('a fully flattened overview prewarms only its pinned player unless strategy prewarming is explicit',async t=>{
  const renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxChunks:9,maxPending:20,requestChunk:coordinates=>packet(coordinates)});
  t.after(()=>renderer.dispose());
  const camera=new THREE.OrthographicCamera(-3000,3000,3000,-3000,.1,10000);
  camera.position.set(1200,5000,1200);camera.lookAt(1200,0,1200);camera.updateMatrixWorld();
  const options={mapBlend:1,groundFocus:{x:500,z:500},groundRadius:24};
  await settle(renderer,camera,options);
  assert.equal(renderer.root.visible,false);assert.equal(renderer.stats.requiredChunks,4);
  assert.equal(renderer.hasCoverageAt({x:500,z:500}),true);
  assert.equal(renderer.hasCoverageAt({x:1500,z:1500}),false);
  assert.ok(renderer.stats.requestedChunks<=9,'a planet overview must not request its entire visible map for one player');

  renderer.update(camera,{...options,prewarm:true,budgetMs:0});
  assert.equal(renderer.stats.requiredChunks,2500,'explicit strategy prewarming retains its original full-footprint behavior');
});

test('prewarmed walking cells transfer instantly from strategy and retain source metadata offscreen',async t=>{
  const renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxChunks:9,maxPending:20,
    requestChunk:coordinates=>packet(coordinates,['terrain','asset','water','surf','window','lamp'])});
  t.after(()=>renderer.dispose());
  const groundFocus={x:500,z:500},strategy=cameraAt(),options={groundFocus,groundRadius:45};
  await settle(renderer,strategy,options);
  const before=renderer.stats.requestedChunks,revision=renderer.placementRevision,placements=renderer.placements;
  const meshes=renderer.getTerrainMeshes();
  assert.equal(placements.length,18);assert.equal(renderer.getCollisionPlacements().length,9);
  assert.equal(renderer.cityStreets.length,9);assert.equal(meshes.length,18);
  assert.deepEqual(placements.find(p=>p.kind==='farm').parcels,[{crop:'pasture',width:8,depth:9}]);
  const walking=new THREE.PerspectiveCamera(62,1.7,.05,100);
  walking.position.set(500,3,508);walking.lookAt(500,1,500);walking.updateMatrixWorld();
  renderer.update(walking,{...options,groundOnly:true,budgetMs:100});
  renderer.updateVisibility(walking,{reducedMotion:true,dt:0});
  assert.equal(renderer.ready,true);assert.equal(renderer.settled,true);
  assert.equal(renderer.stats.requestedChunks,before,'entering walking mode needs no new chunks');
  assert.equal(renderer.placementRevision,revision);assert.equal(renderer.placements,placements);
  assert.equal(renderer.getTerrainMeshes(),meshes);
  renderer.updateVisibility(cameraAt(1500,1500),{dt:1});
  assert.equal(renderer.placements,placements,'a camera turn cannot remove collision metadata');
  assert.equal(renderer.getTerrainMeshes().length,18);
});

test('resident collision records and meshes are released together with evicted chunks',async t=>{
  const renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxChunks:1,maxPending:1,requestChunk:coordinates=>packet(coordinates)});
  t.after(()=>renderer.dispose());
  const options={groundFocus:{x:500,z:500},groundRadius:1,groundOnly:true};
  await settle(renderer,cameraAt(),options);
  const first=renderer.placements[0],revision=renderer.placementRevision;
  const next={groundFocus:{x:1000,z:1000},groundRadius:1,groundOnly:true};
  renderer.update(cameraAt(1000,1000),{...next,budgetMs:100});await flush();
  await settle(renderer,cameraAt(1000,1000),next);
  assert.equal(renderer.stats.loadedChunks,1);assert.ok(renderer.placementRevision>revision);
  assert.ok(renderer.placements.every(p=>p.id!==first.id));assert.equal(renderer.getTerrainMeshes().length,1);
  assert.equal(renderer.hasCoverageAt({x:500,z:500}),false);
  renderer.dispose();assert.deepEqual(renderer.placements,[]);assert.deepEqual(renderer.getTerrainMeshes(),[]);
  assert.equal(renderer.hasCoverageAt({x:1000,z:1000}),false);
});

test('worker packets carry the original parcels, station records and streets without extra geometry transfers',()=>{
  const network=generateWorld({density:0},{detail:'network'}),region=generateWorldRegion(network,{x:0,z:0,size:192});
  const result=compileDetailPacket(region,network);
  assert.deepEqual(result.placements,[...region.placements,...region.stations.map(p=>({...p,kind:'station'}))]);
  assert.deepEqual(result.cityStreets,region.cityStreets);
  const transfers=detailPacketTransfers(result),copy=structuredClone(result,{transfer:transfers});
  assert.deepEqual(copy.placements,result.placements);assert.deepEqual(copy.cityStreets,result.cityStreets);
  assert.ok(copy.placements.some(p=>p.kind==='station'));assert.ok(copy.cityStreets.length>0);
});
