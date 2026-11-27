import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createMutableTrees,TREE_FALL_DURATION,TREE_REGROW_DURATION} from '../src/mutable-trees.js';
import {createWorldRenderer,compileDetailPacket} from '../src/world-renderer.js';
import {rigidSurfacePoseMatrix} from '../src/world-surface.js';
import {tree} from '../src/assets.js';
import {consolidate} from '../src/geometry.js';
import {bakeMaterialColors} from '../src/color-batches.js';

const close=(a,b,epsilon=1e-5)=>assert.ok(Math.abs(a-b)<epsilon,`${a} differs from ${b}`);
const flat={outline:[[0,0],[1200,0],[1200,48],[0,48]],cities:[],mountains:[],stations:[],lines:[],rivers:[],players:[],gameplay:true};
const placement=(id='oak',x=24)=>({kind:'tree',id,x,y:.12,z:24,rotation:.63,scale:1.13,variant:'broadleaf'});
const flush=()=>new Promise(resolve=>setImmediate(resolve));

test('mutable trees reuse the original complete artwork and rigid transforms for every species',()=>{
  const cases=[['pine',.71,1],['pine',.86,0],['pine',1.02,1],['round',1,3],['gold',1,4],
    ['light',1,5],['broadleaf',1,6],['acacia',1,7],['birch',1,8]];
  const worlds=[flat,{...flat,surface:{type:'sphere',radius:1000,projection:{type:'equirectangular',radius:1000,centralLatitude:0,centralLongitude:0}}}];
  for(const world of worlds){
    const manager=createMutableTrees(world),parent=new THREE.Group();
    for(let index=0;index<cases.length;index++){
      const [variant,size,type]=cases[index],p={...placement(`tree-${index}`,100+index*4),z:70,variant,scale:size};
      const chunk=manager.addChunk(index,parent,[p]),mesh=chunk.meshes[0],actual=new THREE.Matrix4();mesh.getMatrixAt(0,actual);
      const expected=rigidSurfacePoseMatrix(world,p.x,p.y,p.z,p.rotation).scale(new THREE.Vector3().setScalar(size));
      actual.elements.forEach((n,i)=>close(n,expected.elements[i]));
      const source=new THREE.Group();tree(source,{variant:type});bakeMaterialColors(consolidate(source));
      const a=mesh.geometry.attributes,b=source.children[0].geometry.attributes;
      assert.deepEqual(a.position.array,b.position.array,'art geometry must be identical, including trunk roots');
      assert.deepEqual(a.color.array,b.color.array,'the same foliage and trunk colors must survive instancing');
      source.children[0].geometry.dispose();source.children[0].material.dispose();
    }
    manager.dispose();assert.equal(parent.children.length,0);
  }
});

test('felling pivots at the trunk root away from the player, excludes rays immediately, and updates only that tree',()=>{
  let changes=0;const manager=createMutableTrees(flat,{onChange:()=>changes++}),parent=new THREE.Group();
  const p=placement('cut',0),other=placement('keep',8),chunk=manager.addChunk('near',parent,[p,other]),mesh=chunk.meshes[0];
  parent.updateMatrixWorld(true);
  const ray=new THREE.Raycaster(new THREE.Vector3(0,.55,26),new THREE.Vector3(0,0,-1),0,4);
  assert.ok(ray.intersectObject(mesh).length>0,'camera rays must see the actual instanced trunk');
  const before=new THREE.Matrix4();mesh.getMatrixAt(1,before);
  assert.equal(manager.fellTree('cut',{direction:{x:1,z:0}}),true);
  assert.equal(manager.fellTree('cut'),false,'one tree can only reward a player once');
  assert.equal(changes,1);assert.equal(manager.activeFalls,1);assert.ok(manager.removed.has('cut'));
  assert.equal(ray.intersectObject(mesh).length,0,'a falling tree cannot block the walking camera or ground probes');
  manager.update(.3);
  const falling=new THREE.Matrix4();mesh.getMatrixAt(0,falling);
  const base=new THREE.Vector3().applyMatrix4(falling),tip=new THREE.Vector3(0,2,0).applyMatrix4(falling);
  close(base.x,p.x);close(base.y,p.y);close(base.z,p.z);assert.ok(tip.x>base.x+.7);close(tip.z,base.z);
  const unchanged=new THREE.Matrix4();mesh.getMatrixAt(1,unchanged);assert.deepEqual(unchanged.elements,before.elements);
  manager.update(TREE_FALL_DURATION);mesh.getMatrixAt(0,falling);assert.equal(manager.activeFalls,0);
  assert.equal(new THREE.Vector3().setFromMatrixScale(falling).length(),0);manager.dispose();
});

test('resident slots share templates, but releases dispose per-chunk resources and retain removed ids',()=>{
  const manager=createMutableTrees(flat),parent=new THREE.Group();
  const first=manager.addChunk('first',parent,[placement('one',24)]),second=manager.addChunk('second',parent,[placement('two',72)]);
  assert.equal(manager.templateCount,1);assert.equal(first.meshes[0].geometry,second.meshes[0].geometry);
  let geometries=0,materials=0,instances=0,depths=0;
  first.meshes[0].geometry.addEventListener('dispose',()=>geometries++);
  for(const chunk of [first,second]){chunk.materials[0].addEventListener('dispose',()=>materials++);chunk.meshes[0].addEventListener('dispose',()=>instances++);chunk.depth.addEventListener('dispose',()=>depths++);}
  manager.fellTree('one');manager.removeChunk('first');assert.equal(geometries,0);assert.equal(materials,1);assert.equal(instances,1);assert.equal(depths,1);
  assert.equal(manager.activeFalls,0);assert.ok(manager.removed.has('one'));
  const reloaded=manager.addChunk('first',parent,[placement('one',24)]);assert.equal(reloaded.meshes.length,1);
  const hidden=new THREE.Matrix4();reloaded.meshes[0].getMatrixAt(0,hidden);assert.equal(new THREE.Vector3().setFromMatrixScale(hidden).length(),0);
  assert.equal(manager.removeTree('unloaded-save-tree'),true);assert.equal(manager.removeTree('unloaded-save-tree'),false);
  manager.dispose();manager.dispose();assert.equal(geometries,1);assert.equal(materials,2);assert.equal(instances,2);assert.equal(depths,2);
  assert.equal(parent.children.length,0);assert.equal(manager.meshes.length,0);
});

test('gameplay packets remove trees from baked scenery and carry their exact placements',()=>{
  const world={...flat,outline:[[0,0],[4,0],[4,4],[0,4]]},p=placement('birch',105);
  const region={bounds:{minX:100,maxX:110,minZ:20,maxZ:30},placements:[p]};
  const art=compileDetailPacket(region,{...world,gameplay:false}),game=compileDetailPacket(region,world);
  assert.ok(art.meshes.length>0);assert.equal(game.meshes.length,0);
  assert.equal(art.mutableTrees,undefined);assert.deepEqual(game.mutableTrees,[p]);assert.deepEqual(game.placements,[p]);
  assert.deepEqual(game.lifePlacements.map(p=>p.id),['birch']);
});

test('world renderer removes collisions and life records immediately and keeps a felled tree gone after eviction',async()=>{
  function cameraAt(x){const camera=new THREE.OrthographicCamera(-8,8,8,-8,.1,200);camera.position.set(x,100,24);camera.lookAt(x,0,24);camera.updateMatrixWorld();return camera;}
  function packet({x,z,size}){
    const minX=Math.floor(x/size)*size,minZ=Math.floor(z/size)*size,p=placement(`tree-${minX}`,minX+24);
    return {bounds:{minX,minZ,maxX:minX+size,maxZ:minZ+size},meshes:[],mutableTrees:[p],placements:[p],lifePlacements:[p]};
  }
  const parent=new THREE.Group(),renderer=createWorldRenderer(parent,flat,{size:48,maxChunks:1,maxPending:1,requestChunk:packet});
  async function load(x){
    const camera=cameraAt(x),options={groundOnly:true,groundFocus:{x,z:24},groundRadius:1,budgetMs:100};
    renderer.update(camera,options);
    for(let i=0;i<12&&!renderer.ready;i++){await flush();renderer.update(camera,options);}
    assert.equal(renderer.ready,true);renderer.updateVisibility(camera,{reducedMotion:true});return camera;
  }
  const camera=await load(24),revision=renderer.placementRevision;
  assert.equal(renderer.getCollisionPlacements().length,1);assert.equal(renderer.getTerrainMeshes().length,1);assert.equal(renderer.lifePlacements.length,1);
  assert.equal(renderer.fellTree('tree-0',{direction:{x:0,z:-1}}),true);
  assert.ok(renderer.placementRevision>revision);assert.equal(renderer.getCollisionPlacements().length,0);assert.equal(renderer.getSceneryPlacements().length,0);
  renderer.updateVisibility(camera,{reducedMotion:true});assert.equal(renderer.lifePlacements.length,0);
  renderer.updateTrees(TREE_FALL_DURATION);
  await load(216);assert.equal(renderer.stats.loadedChunks,1);assert.ok(renderer.getCollisionPlacements().every(p=>p.id==='tree-192'));
  await load(24);assert.equal(renderer.getCollisionPlacements().length,0);assert.equal(renderer.getTerrainMeshes().length,1);
  assert.ok(renderer.removedTreeIds.has('tree-0'));
  assert.equal(renderer.restoreTree('tree-0',{animate:false}),true);assert.equal(renderer.getCollisionPlacements().length,1);
  renderer.updateVisibility(camera,{reducedMotion:true});assert.equal(renderer.lifePlacements.length,1);
  await load(216);await load(24);assert.equal(renderer.getCollisionPlacements().length,1,'restored state survives another cache eviction');
  renderer.dispose();assert.equal(parent.children.length,0);
});


test('regrowth restores the original slot, collision ray index, and exact tree pose after a loaded removal',()=>{
  const manager=createMutableTrees(flat),parent=new THREE.Group(),p=placement('regrow',0),chunk=manager.addChunk('near',parent,[p]);
  manager.removeTree(p.id);manager.restoreTree(p.id);manager.update(TREE_REGROW_DURATION);parent.updateMatrixWorld(true);
  assert.equal(manager.removed.has(p.id),false);assert.equal(manager.restoreTree(p.id),false);
  const actual=new THREE.Matrix4();chunk.meshes[0].getMatrixAt(0,actual);
  const expected=rigidSurfacePoseMatrix(flat,p.x,p.y,p.z,p.rotation).scale(new THREE.Vector3().setScalar(p.scale));
  actual.elements.forEach((n,i)=>close(n,expected.elements[i]));
  const ray=new THREE.Raycaster(new THREE.Vector3(0,.55,26),new THREE.Vector3(0,0,-1),0,4);
  assert.ok(ray.intersectObject(chunk.meshes[0]).length>0);manager.dispose();
});

test('regrowth restores an inactive slot in a newly loaded chunk and persists when that chunk is evicted again',()=>{
  const manager=createMutableTrees(flat),parent=new THREE.Group(),p=placement('saved');manager.removeTree(p.id);
  const chunk=manager.addChunk('near',parent,[p]);manager.restoreTree(p.id,{animate:false});parent.updateMatrixWorld(true);
  const ray=new THREE.Raycaster(new THREE.Vector3(24,.55,26),new THREE.Vector3(0,0,-1),0,4);
  assert.ok(ray.intersectObject(chunk.meshes[0]).length>0,'restored roots are present in the original spatial ray index');
  manager.removeChunk('near');const next=manager.addChunk('near',parent,[p]),matrix=new THREE.Matrix4();next.meshes[0].getMatrixAt(0,matrix);
  assert.ok(new THREE.Vector3().setFromMatrixScale(matrix).length()>1);manager.dispose();
});
