import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createMutableScenery,SCENERY_CLEAR_DURATION,sceneryPlacementId} from '../src/mutable-scenery.js';
import {createWorldRenderer} from '../src/world-renderer.js';
import {serializeGeometryBVH,installGeometryBVH} from '../src/geometry-bvh.js';
import {surfacePoint} from '../src/world-surface.js';

const flat={outline:[[0,0],[1200,0],[1200,48],[0,48]],cities:[],mountains:[],stations:[],lines:[],rivers:[],players:[],gameplay:true};
const near=(a,b)=>assert.ok(Math.abs(a-b)<.00002,`${a} differs from ${b}`);
const flush=()=>new Promise(resolve=>setImmediate(resolve));
const description=(id,sceneryIndex,x=0,z=3)=>({kind:'rock',id,sceneryIndex,x,y:0,z});
function meshFixture({indexed=false,bvh=false,offset=0}={}){
  const position=new Float32Array([-1+offset,0,3,1+offset,0,3,offset,2,3,
    -1+offset,0,1,1+offset,0,1,offset,2,1,-1+offset,0,0,1+offset,0,0,offset,2,0]);
  const sceneryIndex=new Float32Array([1,1,1,2,2,2,0,0,0]);
  const geometry=new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(position,3));
  if(indexed)geometry.setIndex([0,1,2,3,4,5,6,7,8]);
  const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));
  if(bvh)installGeometryBVH(mesh,serializeGeometryBVH(geometry));
  mesh.updateMatrixWorld(true);
  return {mesh,packet:{sceneryIndex},original:position.slice(),descriptions:[description('remove',1,offset),description('keep',2,offset,1)]};
}
function dispose(fixture){fixture.mesh.geometry.dispose();fixture.mesh.material.dispose();}

test('clearing a material-batched prop shrinks only its owned vertices and reaches a clean exact endpoint',()=>{
  for(const indexed of [false,true]){
    const f=meshFixture({indexed}),manager=createMutableScenery(flat);
    const entries=manager.addChunk('one',[f.mesh],f.descriptions,[f.packet]),position=f.mesh.geometry.attributes.position;
    assert.ok(entries.every(entry=>entry.parts.every(part=>part.original===null)),'uncleared scenery retains no second vertex buffer');
    assert.equal(manager.clear(['remove']),true);assert.equal(manager.activeCount,1);
    assert.deepEqual(position.array,f.original,'clear starts without a visible first-frame jump');
    manager.update(SCENERY_CLEAR_DURATION/2);
    for(let i=0;i<9;i++)near(position.array[i],f.original[i]*.5+([0,0,3][i%3])*.5);
    assert.deepEqual(position.array.slice(9),f.original.slice(9),'neighboring prop and immutable terrain stay bit-identical');
    assert.deepEqual(position.updateRanges,[{start:0,count:9}],'only affected GPU vertices are marked for upload');
    manager.update(SCENERY_CLEAR_DURATION/2);
    assert.deepEqual([...position.array.slice(0,9)],[0,0,3,0,0,3,0,0,3]);
    assert.equal(manager.activeCount,0);assert.equal(entries[0].parts[0].original,null,'completed animation releases its snapshot');
    const version=position.version;manager.update(10);assert.equal(position.version,version,'finished scenery performs no further uploads');
    manager.dispose();dispose(f);
  }
});

test('removals persist offscreen and across replacement chunks without restarting animation or changing revision',()=>{
  let changes=0;const manager=createMutableScenery(flat,{onChange:()=>changes++});
  assert.equal(manager.clear(['unloaded']),true);assert.equal(manager.revision,1);
  const first=meshFixture();first.descriptions[0].id='unloaded';
  manager.addChunk('one',[first.mesh],first.descriptions,[first.packet]);
  assert.deepEqual([...first.mesh.geometry.attributes.position.array.slice(0,9)],[0,0,3,0,0,3,0,0,3]);
  assert.equal(manager.activeCount,0);
  assert.equal(manager.clear(['keep']),true);manager.update(.1);
  const firstPosition=first.mesh.geometry.attributes.position,before=firstPosition.array.slice(),version=firstPosition.version;
  manager.removeChunk('one');assert.equal(manager.activeCount,0);manager.update(1);
  assert.deepEqual(firstPosition.array,before);assert.equal(firstPosition.version,version,'evicted geometry is never updated again');
  const second=meshFixture();second.descriptions[0].id='unloaded';
  manager.addChunk('one',[second.mesh],second.descriptions,[second.packet]);
  assert.deepEqual([...second.mesh.geometry.attributes.position.array.slice(0,18)],
    [0,0,3,0,0,3,0,0,3,0,0,1,0,0,1,0,0,1]);
  assert.equal(manager.clear(['unloaded','keep']),false);assert.equal(changes,2);assert.equal(manager.revision,2);
  manager.dispose();manager.dispose();dispose(first);dispose(second);
});

test('zero, negative and invalid frame deltas cannot poison removal geometry; reduced motion can finish an active clear',()=>{
  const f=meshFixture(),manager=createMutableScenery(flat);manager.addChunk('one',[f.mesh],f.descriptions,[f.packet]);
  manager.clear(['remove']);const position=f.mesh.geometry.attributes.position,version=position.version;
  for(const dt of [0,-1,NaN,Infinity,-Infinity,undefined])manager.update(dt);
  assert.equal(position.version,version);assert.deepEqual(position.array,f.original);
  manager.update(.1);assert.equal(manager.activeCount,1);
  assert.equal(manager.clear(['remove'],{animate:false}),false,'finishing motion is not a second logical removal');
  assert.equal(manager.activeCount,0);assert.equal(manager.revision,1);
  assert.deepEqual([...position.array.slice(0,9)],[0,0,3,0,0,3,0,0,3]);manager.dispose();dispose(f);
});

test('one source can span multiple material batches and chunks, while meshless sheep add no animation work',()=>{
  const a=meshFixture(),b=meshFixture(),c=meshFixture(),manager=createMutableScenery(flat);
  manager.addChunk('one',[a.mesh,c.mesh],a.descriptions,[a.packet,c.packet]);manager.addChunk('two',[b.mesh],b.descriptions,[b.packet]);
  const sheep={id:'sheep',kind:'sheep',x:2,z:3,sceneryIndex:3};manager.addChunk('life',[],[sheep],[]);
  assert.equal(manager.clear(['remove',sheep]),true);assert.equal(manager.activeCount,2);
  manager.update(SCENERY_CLEAR_DURATION);
  assert.deepEqual(a.mesh.geometry.attributes.position.array,b.mesh.geometry.attributes.position.array);
  assert.deepEqual(a.mesh.geometry.attributes.position.array,c.mesh.geometry.attributes.position.array);
  assert.ok(manager.removed.has('sheep'));assert.equal(manager.activeCount,0);
  manager.dispose();dispose(a);dispose(b);dispose(c);
});

test('retained scenery bytes deduplicate ownership buffers and release indices and active snapshots with their chunks',()=>{
  const a=meshFixture(),b=meshFixture(),zero=meshFixture(),manager=createMutableScenery(flat);
  const sharedTags=a.packet.sceneryIndex;
  manager.addChunk('one',[a.mesh,zero.mesh],a.descriptions,[a.packet,{sceneryIndex:new Float32Array(sharedTags.length)}]);
  assert.equal(manager.bytes,sharedTags.buffer.byteLength+6*Uint32Array.BYTES_PER_ELEMENT,
    'immutable-only ownership tags are not retained after packet hydration');
  manager.addChunk('two',[b.mesh],b.descriptions,[{sceneryIndex:sharedTags.subarray()}]);
  const residentBytes=sharedTags.buffer.byteLength+12*Uint32Array.BYTES_PER_ELEMENT;
  assert.equal(manager.bytes,residentBytes,'two views retain their one shared backing allocation only once');
  manager.clear(['remove']);assert.equal(manager.bytes,residentBytes,'animation snapshots remain lazy');manager.update(.1);
  assert.equal(manager.bytes,residentBytes+2*9*Float32Array.BYTES_PER_ELEMENT);
  manager.removeChunk('one');
  assert.equal(manager.bytes,sharedTags.buffer.byteLength+6*Uint32Array.BYTES_PER_ELEMENT+9*Float32Array.BYTES_PER_ELEMENT,
    'evicting an active chunk releases its lists and snapshot, but preserves ownership still used by another chunk');
  manager.update(SCENERY_CLEAR_DURATION);
  assert.equal(manager.bytes,sharedTags.buffer.byteLength+6*Uint32Array.BYTES_PER_ELEMENT);
  manager.dispose();assert.equal(manager.bytes,0);manager.dispose();assert.equal(manager.bytes,0);
  dispose(a);dispose(b);dispose(zero);
});

test('cleared scenery immediately leaves BVH camera probes without masking surviving surfaces behind it',()=>{
  for(const indexed of [false,true]){
    const f=meshFixture({indexed,bvh:true}),manager=createMutableScenery(flat),originalRaycast=f.mesh.raycast;
    const tree=f.mesh.geometry.boundsTree;
    manager.addChunk('one',[f.mesh],f.descriptions,[f.packet]);
    const ray=new THREE.Raycaster(new THREE.Vector3(0,.5,5),new THREE.Vector3(0,0,-1),0,10);ray.firstHitOnly=true;
    near(ray.intersectObject(f.mesh)[0].distance,2);
    manager.clear(['remove']);near(ray.intersectObject(f.mesh)[0].distance,4);
    assert.equal(ray.firstHitOnly,true);assert.equal(f.mesh.geometry.boundsTree,tree,'filtering ownership needs no per-frame BVH rebuild');
    manager.update(.2);near(ray.intersectObject(f.mesh)[0].distance,4);
    ray.firstHitOnly=false;assert.deepEqual(ray.intersectObject(f.mesh).map(hit=>hit.distance),[4,5]);
    manager.clear(['keep'],{animate:false});near(ray.intersectObject(f.mesh)[0].distance,5);
    manager.removeChunk('one');assert.equal(f.mesh.raycast,originalRaycast,'release restores borrowed mesh behavior');
    manager.dispose();dispose(f);
  }
});

test('globe removals shrink around the real curved-surface origin and leave adjacent world vertices intact',()=>{
  const world={...flat,surface:{type:'sphere',radius:1000,projection:{type:'equirectangular',radius:1000,centralLatitude:0,centralLongitude:0}}};
  const f=meshFixture(),p={...f.descriptions[0],x:500,y:.4,z:-600},center=surfacePoint(world,p.x,p.y,p.z),position=f.mesh.geometry.attributes.position;
  for(let i=0;i<3;i++)position.setXYZ(i,center.x+f.original[i*3],center.y+f.original[i*3+1],center.z+f.original[i*3+2]);
  const before=position.array.slice(),manager=createMutableScenery(world);manager.addChunk('globe',[f.mesh],[p,f.descriptions[1]],[f.packet]);
  manager.clear(['remove']);manager.update(SCENERY_CLEAR_DURATION/2);
  for(let i=0;i<9;i++)near(position.array[i],(before[i]+center.getComponent(i%3))*.5);
  assert.deepEqual(position.array.slice(9),before.slice(9));manager.update(SCENERY_CLEAR_DURATION);
  for(let i=0;i<9;i++)near(position.array[i],center.getComponent(i%3));manager.dispose();dispose(f);
});

function cameraAt(x){const camera=new THREE.OrthographicCamera(-8,8,8,-8,.1,200);camera.position.set(x,100,24);camera.lookAt(x,0,24);camera.updateMatrixWorld();return camera;}
function chunkPacket({x,z,size}){
  const minX=Math.floor(x/size)*size,minZ=Math.floor(z/size)*size;
  const farm={kind:'farm',x:minX+22,z:24},rock={kind:'rock',id:`rock-${minX}`,x:minX+26,z:24};
  const position=new Float32Array([farm.x-1,0,23,farm.x+1,0,23,farm.x,2,24,
    rock.x-1,0,23,rock.x+1,0,23,rock.x,2,24,minX+24,0,24,minX+23,0,24,minX+24,0,25]);
  const normal=new Float32Array(position.length);for(let i=1;i<normal.length;i+=3)normal[i]=1;
  return {bounds:{minX,minZ,maxX:minX+size,maxZ:minZ+size},placements:[farm,rock],
    mutableScenery:[{...farm,id:sceneryPlacementId(farm),sceneryIndex:1},{...rock,sceneryIndex:2}],
    lifePlacements:[{kind:'sheep',id:`farm-sheep-${minX}`,farmId:sceneryPlacementId(farm),x:farm.x,z:24},
      {kind:'sheep',id:`wild-sheep-${minX}`,x:minX+28,z:24}],
    meshes:[{position,normal,sceneryIndex:new Float32Array([1,1,1,2,2,2,0,0,0]),
      material:{name:'scenery-test',color:[.4,.5,.3],roughness:1,metalness:0,side:THREE.DoubleSide,vertexColors:false,sceneStyle:'asset'}}]};
}
async function load(renderer,x){
  const camera=cameraAt(x),options={groundOnly:true,groundFocus:{x,z:24},groundRadius:1,budgetMs:100};
  renderer.update(camera,options);
  for(let i=0;i<12&&!renderer.ready;i++){await flush();renderer.update(camera,options);}
  assert.equal(renderer.ready,true);renderer.updateVisibility(camera,{reducedMotion:true});return {camera,options};
}

test('streamed scenery clears collision and farm livestock immediately, then stays removed after eviction and reload',async()=>{
  const parent=new THREE.Group(),renderer=createWorldRenderer(parent,flat,{size:48,maxChunks:1,maxPending:1,requestChunk:chunkPacket});
  const {camera}=await load(renderer,24),old=renderer.root.children[0].children[0],revision=renderer.placementRevision;
  let disposed=0;old.geometry.addEventListener('dispose',()=>disposed++);
  assert.equal(renderer.getCollisionPlacements().length,1);assert.equal(renderer.lifePlacements.length,2);
  assert.equal(renderer.clearScenery(['farm:22:24','rock-0']),true);assert.ok(renderer.placementRevision>revision);
  assert.equal(renderer.getSceneryPlacements().length,0);assert.equal(renderer.getCollisionPlacements().length,0);
  renderer.updateVisibility(camera,{reducedMotion:true});assert.deepEqual(renderer.lifePlacements.map(p=>p.id),['wild-sheep-0']);
  renderer.updateTrees(.2);
  await load(renderer,216);assert.equal(disposed,1);assert.equal(renderer.stats.loadedChunks,1);
  const oldVersion=old.geometry.attributes.position.version;renderer.updateTrees(1);assert.equal(old.geometry.attributes.position.version,oldVersion);
  await load(renderer,24);assert.equal(renderer.getSceneryPlacements().length,0);
  assert.deepEqual(renderer.lifePlacements.map(p=>p.id),['wild-sheep-0']);
  const position=renderer.root.children[0].children[0].geometry.attributes.position;
  assert.deepEqual([...position.array.slice(0,18)],[22,0,24,22,0,24,22,0,24,26,0,24,26,0,24,26,0,24]);
  renderer.dispose();assert.equal(parent.children.length,0);
});

test('the renderer budgets retained scenery ownership and active animation memory when evicting chunks',async()=>{
  const parent=new THREE.Group(),renderer=createWorldRenderer(parent,flat,{size:48,maxChunks:2,maxPending:1,maxBytes:500,requestChunk:chunkPacket});
  await load(renderer,24);
  const packet=chunkPacket({x:24,z:24,size:48}),mesh=packet.meshes[0],geometryBytes=mesh.position.byteLength+mesh.normal.byteLength;
  const retainedBytes=mesh.sceneryIndex.byteLength+6*Uint32Array.BYTES_PER_ELEMENT;
  assert.equal(renderer.stats.bytes,geometryBytes+retainedBytes);
  renderer.clearScenery(['rock-0']);renderer.updateTrees(.1);
  assert.equal(renderer.stats.bytes,geometryBytes+retainedBytes+9*Float32Array.BYTES_PER_ELEMENT);
  await load(renderer,216);
  assert.equal(renderer.stats.loadedChunks,1,'geometry alone would fit two chunks, but retained scenery pushes them over budget');
  assert.equal(renderer.stats.bytes,geometryBytes+retainedBytes,'eviction also releases the unfinished animation snapshot');
  assert.equal(renderer.stats.budgetOverflow,false);
  renderer.dispose();assert.equal(renderer.stats.bytes,0);
});

test('mountain replacement retains visible geometry until upload completes and carries cleared scenery into its new packet',async()=>{
  const parent=new THREE.Group(),requests=[],world={...flat,mountains:[{id:'mountain',x:24,z:24,radius:4,height:8}]};
  let replacementResolve,uploadResolve;
  const renderer=createWorldRenderer(parent,world,{size:48,maxChunks:1,maxPending:1,
    requestChunk:payload=>{requests.push(payload);return payload.railwayLines?new Promise(resolve=>{replacementResolve=()=>resolve(chunkPacket(payload));}):chunkPacket(payload);},
    uploadMesh:()=>requests.length>1?new Promise(resolve=>{uploadResolve=resolve;}):undefined});
  const {camera,options}=await load(renderer,24),old=renderer.root.children[0];let disposed=0;
  old.children[0].geometry.addEventListener('dispose',()=>disposed++);renderer.clearScenery(['rock-0'],{animate:false});
  const line={id:'player-line',cuts:[{mountainId:'mountain',start:0,end:4}]};renderer.setRailways([line]);
  renderer.update(camera,options);await flush();assert.deepEqual(requests.at(-1).railwayLines,[line]);
  assert.equal(renderer.root.children[0],old);assert.equal(disposed,0);
  replacementResolve();await flush();renderer.update(camera,options);
  assert.equal(renderer.root.children[0],old,'the previous mountain stays visible during GPU upload');assert.equal(disposed,0);
  uploadResolve();await flush();renderer.update(camera,options);
  assert.notEqual(renderer.root.children[0],old);assert.equal(disposed,1);
  assert.deepEqual(renderer.getSceneryPlacements().map(p=>p.kind),['farm']);
  const mesh=renderer.root.children[0].children[0],position=mesh.geometry.attributes.position;
  assert.deepEqual([...position.array.slice(9,18)],[26,0,24,26,0,24,26,0,24]);
  const shader={uniforms:{},fragmentShader:THREE.ShaderLib.standard.fragmentShader};mesh.material.onBeforeCompile(shader);
  assert.equal(shader.uniforms.detailReveal.value,1,'replacing an already visible chunk must not restart its fade from invisible');
  renderer.dispose();
});
