import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as THREE from 'three';
import {compileMilitaryRig,createMilitaryBatch} from '../src/military-batch.js';
import {MILITARY_KINDS,MILITARY_ART,createMilitaryAsset} from '../src/military-assets.js';
import {militaryColors} from '../src/military-palette.js';

function fixture(t,capacity=16){
  const parent=new THREE.Group(),sibling=new THREE.Group();parent.add(sibling);
  const batch=createMilitaryBatch(parent,{capacity});t.after(()=>batch.dispose());return{batch,parent,sibling};
}
const unit=(id,kind='soldier',extra={})=>({id,kind,x:0,y:0,z:0,heading:0,scale:1,team:'teal',moving:1,phase:0,...extra});
function meshAt(batch,kind='soldier',low=false){return batch.root.getObjectByName(`${kind}-${low?'far':'near'}`);}
function shaderFor(material,depth=false){
  const library=THREE.ShaderLib[depth?'depth':'standard'],shader={vertexShader:library.vertexShader,fragmentShader:library.fragmentShader,uniforms:{}};
  material.onBeforeCompile(shader,{});return shader;
}
function closeArrays(actual,expected,tolerance=1e-6){assert.equal(actual.length,expected.length);for(let i=0;i<actual.length;i++)assert.ok(Math.abs(actual[i]-expected[i])<tolerance,`element ${i}: ${actual[i]} differs from ${expected[i]}`);}

for(const kind of MILITARY_KINDS)for(const low of[false,true]){
  test(`${kind} ${low?'distant':'detailed'} GPU clips are finite, bounded and return to neutral`,t=>{
    const rig=compileMilitaryRig(kind,{low});t.after(()=>rig.dispose());
    const{geometry,texture,frames,bones}=rig,data=texture.image.data,rowSize=bones*16;
    assert.ok(bones>1&&bones<=16);assert.equal(texture.image.width,bones*4);assert.equal(texture.image.height,frames*3);assert.ok(data.every(Number.isFinite));
    assert.ok(rig.triangles>0&&rig.triangles<3000);assert.equal(geometry.attributes.militaryBone.count,geometry.attributes.position.count);
    for(const attribute of Object.values(geometry.attributes))assert.ok(attribute.array.every(Number.isFinite));
    const row=(clip,frame)=>data.subarray((clip*frames+frame)*rowSize,(clip*frames+frame+1)*rowSize);
    closeArrays(row(2,0),row(0,0));closeArrays(row(2,frames-1),row(0,frames-1));
    for(let clip=0;clip<3;clip++)closeArrays(row(clip,0),row(clip,frames-1),2e-6);
    assert.ok([...row(2,Math.floor(frames*.32))].some((v,i)=>Math.abs(v-row(0,Math.floor(frames*.32))[i])>1e-5),'attack actually changes a rig transform');
    const point=new THREE.Vector3(),matrix=new THREE.Matrix4(),bounds=rig.bounds.clone().expandByScalar(1e-5),position=geometry.attributes.position,bone=geometry.attributes.militaryBone;
    for(let clip=0;clip<3;clip++)for(const frame of[0,Math.floor(frames/2),frames-1])for(let i=0;i<position.count;i++){
      matrix.fromArray(data,((clip*frames+frame)*bones+bone.getX(i))*16);point.fromBufferAttribute(position,i).applyMatrix4(matrix);
      assert.ok(bounds.containsPoint(point),'bounds include articulated vertices, including rotors and recoil');
    }
    assert.ok(rig.muzzle.toArray().every(Number.isFinite));
  });
}

test('one thousand animated units use at most eight draws and only advance shared uniforms between commands',t=>{
  const{batch}=fixture(t,1000),camera=new THREE.OrthographicCamera(-100,100,100,-100,.1,1000);camera.position.set(0,100,100);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  batch.setUnits(Array.from({length:1000},(_,i)=>unit(i,MILITARY_KINDS[i%4],{x:(i%40)-20,z:Math.floor(i/40)-12,phase:(i%17)/17})));
  batch.update(0,{camera,viewportHeight:720,forceDetail:true});const before=batch.stats;
  assert.equal(before.units,1000);assert.equal(before.visible,1000);assert.equal(before.near,1000);assert.ok(before.drawCalls<=8);assert.equal(before.poseWrites,1000);assert.ok(before.animationBytes<2_000_000);
  const state=batch.root.children.map(mesh=>({mesh,matrix:mesh.instanceMatrix,array:mesh.instanceMatrix.array,version:mesh.instanceMatrix.version,
    attributes:Object.entries(mesh.geometry.attributes).map(([name,attribute])=>({name,attribute,array:attribute.array,version:attribute.version})),shader:shaderFor(mesh.material),depth:shaderFor(mesh.customDepthMaterial,true)}));
  const time=state[0].shader.uniforms.militaryTime;for(const record of state){assert.equal(record.shader.uniforms.militaryTime,time);assert.equal(record.depth.uniforms.militaryTime,time);assert.equal(record.shader.uniforms.militaryClips.value,record.depth.uniforms.militaryClips.value,'shadow pass follows the same animation texture');}
  for(let frame=1;frame<=120;frame++)batch.update(frame/60,{camera,viewportHeight:720,forceDetail:true});
  assert.equal(time.value,2);assert.equal(batch.stats.poseWrites,before.poseWrites);assert.equal(batch.stats.uploads,before.uploads);
  for(const record of state){
    assert.equal(record.mesh.instanceMatrix,record.matrix);assert.equal(record.matrix.array,record.array);assert.equal(record.matrix.version,record.version);
    for(const{name,attribute,array,version}of record.attributes){assert.equal(record.mesh.geometry.attributes[name],attribute);assert.equal(attribute.array,array);assert.equal(attribute.version,version);}
  }
  const active=meshAt(batch),attackAttribute=active.geometry.attributes.militaryState,version=attackAttribute.version,poses=batch.stats.poseWrites;
  const shot=batch.attack(0);assert.equal(shot.projectile,'tracer');assert.equal(shot.fireDelay,MILITARY_ART.soldier.attackDuration*.18);assert.equal(attackAttribute.version,version+1);assert.equal(attackAttribute.getZ(0),2);assert.equal(batch.stats.poseWrites,poses);
  batch.update(2.1,{camera,viewportHeight:720,forceDetail:true});assert.equal(batch.stats.poseWrites,poses);assert.equal(batch.stats.uploads,before.uploads+1);
});

test('per-unit paint commands cannot recolor other units, rig colors, or other batches',t=>{
  const{batch}=fixture(t),other=fixture(t).batch;batch.setUnits([unit('a'),unit('b')]);other.setUnits([unit('other')]);batch.update(0);other.update(0);
  const mesh=meshAt(batch),body=mesh.geometry.attributes.militaryBody,source=mesh.geometry.attributes.color.array.slice(),otherColor=meshAt(other).geometry.attributes.militaryBody.array.slice(),before=body.array.slice();
  assert.equal(batch.setColor('a','coral'),true);batch.update(.2);const coral=militaryColors('coral').body;
  closeArrays(body.array.subarray(0,3),coral.toArray());closeArrays(body.array.subarray(3,6),before.subarray(3,6));assert.notDeepEqual(body.array.subarray(0,3),before.subarray(0,3));
  assert.deepEqual(mesh.geometry.attributes.color.array,source);assert.deepEqual(meshAt(other).geometry.attributes.militaryBody.array,otherColor);
  assert.equal(batch.setColor('unknown','blue'),false);assert.throws(()=>batch.setColor('b','unknown-team'),TypeError);batch.update(.4);closeArrays(body.array.subarray(3,6),before.subarray(3,6));
});

test('muzzles use the firing pose and follow unit scale, heading and parent transforms',t=>{
  const{batch,parent}=fixture(t),target=new THREE.Vector3();parent.position.set(4,2,-7);parent.rotation.y=.3;parent.scale.setScalar(1.2);batch.root.position.set(1,0,-2);
  const units=MILITARY_KINDS.map((kind,i)=>unit(kind,kind,{x:i*5,y:kind==='helicopter'?1.3:0,z:2,heading:.7,scale:1.4}));batch.setUnits(units);batch.update(0);parent.updateMatrixWorld(true);
  for(const record of units){
    const art=createMilitaryAsset(new THREE.Group(),{kind:record.kind});t.after(()=>art.dispose());art.pose({time:.18,attack:.18});art.root.updateMatrixWorld(true);
    const expected=art.muzzle.getWorldPosition(new THREE.Vector3()).multiplyScalar(record.scale).applyAxisAngle(new THREE.Vector3(0,1,0),record.heading).add(record).applyMatrix4(batch.root.matrixWorld);
    assert.equal(batch.muzzleAt(record.id,target),target);assert.ok(target.distanceTo(expected)<1e-7,`${record.kind} muzzle follows the same transforms as its instances`);
  }
  assert.equal(batch.muzzleAt('unknown',target),null);
});

test('commands validate capacity and geometry inputs without corrupting existing units',t=>{
  for(const capacity of[0,-1,1.5,NaN,Infinity,8193])assert.throws(()=>createMilitaryBatch(new THREE.Group(),{capacity}),RangeError);
  assert.throws(()=>compileMilitaryRig('unknown'),TypeError);
  const{batch}=fixture(t,2);batch.setUnits([unit('a')]);batch.update(0);const before=batch.muzzleAt('a').clone();
  assert.throws(()=>batch.setUnits([unit('a'),unit('b'),unit('c')]),RangeError);assert.throws(()=>batch.setUnits(null),RangeError);
  for(const invalid of[[unit('a'),unit('a')],[unit('bad','unknown')],[unit(null)],[unit('bad','soldier',{x:NaN})],[unit('bad','soldier',{heading:Infinity})],[unit('bad','soldier',{scale:0})]])assert.throws(()=>batch.setUnits(invalid),TypeError);
  assert.equal(batch.stats.units,1);assert.ok(batch.muzzleAt('a').equals(before));
  for(const pose of[{x:Infinity},{scale:-1},{heading:NaN}])assert.equal(batch.setPose('a',pose),false);
  assert.equal(batch.setPose('unknown',{x:1}),false);assert.equal(batch.attack('unknown'),null);
  assert.equal(batch.setPose('a',{x:3,z:-2,scale:2,moving:0}),true);batch.update(.2);const matrix=new THREE.Matrix4();meshAt(batch).getMatrixAt(0,matrix);assert.equal(matrix.elements[12],3);assert.equal(matrix.elements[14],-2);
  const stats=batch.stats;for(const time of[-1,NaN,Infinity])batch.update(time);assert.deepEqual(batch.stats,stats);
});

test('distance LOD and frustum culling preserve commands and can force nearby geometry',t=>{
  const{batch}=fixture(t),camera=new THREE.PerspectiveCamera(60,1,.1,2000);camera.position.set(0,15,130);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  batch.setUnits([unit('visible'),unit('outside','tank',{x:1000}),unit('behind','helicopter',{z:200}),unit('tiny','soldier',{z:-1200}),unit('beyond','tank',{z:-4000})]);
  batch.update(0,{camera});assert.equal(batch.stats.visible,1);assert.equal(batch.stats.far,1);assert.equal(batch.stats.near,0);assert.equal(meshAt(batch,'soldier',true).count,1);
  batch.attack('behind');assert.equal(batch.setPose('behind',{z:0,x:3}),true);batch.update(.01,{camera});assert.equal(batch.stats.visible,2);assert.equal(meshAt(batch,'helicopter',true).geometry.attributes.militaryState.getZ(0),0);
  const farTriangles=batch.stats.triangles;batch.update(.2,{camera,forceDetail:true});assert.equal(batch.stats.near,2);assert.equal(batch.stats.far,0);assert.ok(batch.stats.triangles>farTriangles*2,'far silhouettes reduce vertex work materially');
  camera.position.set(0,1,4);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);batch.update(.4,{camera});assert.ok(batch.stats.near>0);assert.equal(meshAt(batch).count,1);
  camera.lookAt(0,1,20);camera.updateMatrixWorld(true);batch.update(.6,{camera});assert.equal(meshAt(batch).count,0);
});

test('moving the batch parent updates world-space culling without rewriting unit poses',t=>{
  const{batch,parent}=fixture(t),camera=new THREE.PerspectiveCamera(60,1,.1,500);camera.position.set(100,4,15);camera.lookAt(100,0,0);camera.updateMatrixWorld(true);
  parent.position.set(100,0,0);batch.setUnits([unit('a')]);batch.update(0,{camera});assert.equal(batch.stats.visible,1,'a translated unit remains visible in its world-space position');
  batch.setPose('a',{x:12});batch.update(.2,{camera});assert.equal(batch.stats.visible,0);
  parent.rotation.y=Math.PI/2;batch.update(.4,{camera});assert.equal(batch.stats.visible,1,'parent rotation invalidates culling even without a unit command');
  parent.position.x=1000;batch.update(.6,{camera});assert.equal(batch.stats.visible,0);
  parent.position.x=100;batch.update(.8,{camera});assert.equal(batch.stats.visible,1);
});

test('paused animation still refreshes camera culling on an independent visibility clock',t=>{
  const{batch}=fixture(t),camera=new THREE.PerspectiveCamera(60,1,.1,500);camera.position.set(0,2,12);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  batch.setUnits([unit('a')]);batch.update(7,{camera,visibilityTime:100});assert.equal(batch.stats.visible,1);
  const shader=shaderFor(meshAt(batch).material),animationTime=shader.uniforms.militaryTime;assert.equal(animationTime.value,7);
  camera.lookAt(0,2,30);camera.updateMatrixWorld(true);batch.update(7,{camera,visibilityTime:100.2});assert.equal(batch.stats.visible,0);assert.equal(animationTime.value,7,'culling does not unpause animation');
  camera.lookAt(0,0,0);camera.updateMatrixWorld(true);batch.update(7,{camera,visibilityTime:100.4});assert.equal(batch.stats.visible,1);assert.equal(animationTime.value,7);
  const writes=batch.stats.poseWrites,uploads=batch.stats.uploads;batch.update(7,{camera,visibilityTime:101});assert.equal(batch.stats.poseWrites,writes);assert.equal(batch.stats.uploads,uploads,'an unchanged paused view still avoids instance uploads');
});

test('compiled rigs own their geometry and texture and dispose them only once',t=>{
  const a=compileMilitaryRig('soldier'),b=compileMilitaryRig('soldier');let geometry=0,texture=0,other=0;
  t.after(()=>{a.dispose();b.dispose();});
  a.geometry.addEventListener('dispose',()=>geometry++);a.texture.addEventListener('dispose',()=>texture++);b.geometry.addEventListener('dispose',()=>other++);
  assert.notEqual(a.geometry,b.geometry);assert.notEqual(a.texture,b.texture);assert.notEqual(a.texture.image.data,b.texture.image.data);
  a.dispose();a.dispose();assert.equal(geometry,1);assert.equal(texture,1);assert.equal(other,0);b.dispose();
});

test('batch cleanup is idempotent and releases all textures, geometry and materials it owns',t=>{
  const{batch,parent,sibling}=fixture(t),counts=new Map();
  function watch(resource){if(counts.has(resource))return;counts.set(resource,0);resource.addEventListener('dispose',()=>counts.set(resource,counts.get(resource)+1));}
  for(const mesh of batch.root.children){watch(mesh.geometry);watch(mesh.material);watch(mesh.customDepthMaterial);watch(shaderFor(mesh.material).uniforms.militaryClips.value);}
  batch.setUnits([unit('a')]);batch.update(0);batch.dispose();batch.dispose();assert.ok([...counts.values()].every(value=>value===1));assert.deepEqual(parent.children,[sibling]);assert.equal(batch.stats.disposed,true);assert.equal(batch.stats.units,0);
  const stats=batch.stats;batch.update(1);batch.setUnits([unit('ignored')]);assert.equal(batch.setPose('a',{x:2}),false);assert.equal(batch.setColor('a','blue'),false);assert.equal(batch.attack('a'),null);assert.equal(batch.muzzleAt('a'),null);assert.deepEqual(batch.stats,stats);
});

test('military previews remain outside the live game entry point',async()=>{
  const source=await readFile(new URL('../src/main.js',import.meta.url),'utf8');
  const imports=[...source.matchAll(/\b(?:import|export)\s+(?:[^;'"\n]*?\s+from\s*)?['"]([^'"]+)['"]/g)].map(match=>match[1]);
  assert.ok(imports.length>10);assert.ok(imports.every(path=>!path.includes('military')));
});
