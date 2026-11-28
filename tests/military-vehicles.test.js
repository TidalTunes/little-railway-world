import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createTankArt,createArtilleryArt} from '../src/military-vehicles.js';

const variants=[['tank',createTankArt,'shell'],['artillery',createArtilleryArt,'arc']];
function fixture(t,create){
  const parent=new THREE.Group(),sibling=new THREE.Group();parent.add(sibling);
  const palette=Object.fromEntries(['body','light','dark','roof','accent','trim','graphite','steel','rubber','skin','glass','canvas']
    .map((name,i)=>[name,new THREE.MeshStandardMaterial({color:new THREE.Color().setHSL(i/12,.4,.5),flatShading:true})]));
  const art=create(parent,{palette});t.after(()=>{art.dispose();Object.values(palette).forEach(material=>material.dispose());});
  return{parent,sibling,palette,art};
}
function transforms(root){
  const result=[];root.traverse(node=>result.push({name:node.name,p:node.position.toArray(),q:node.quaternion.toArray(),s:node.scale.toArray()}));return result;
}
function muzzlePose(art){art.root.updateMatrixWorld(true);return{point:art.muzzle.getWorldPosition(new THREE.Vector3()),direction:new THREE.Vector3(0,0,1).transformDirection(art.muzzle.matrixWorld)};}

for(const [kind,create,projectile]of variants){
  test(`${kind} is grounded, person-scaled and made from reusable caller-owned paint`,t=>{
    const {art,palette}=fixture(t,create),geometry=new Set(),materials=new Set();let meshes=0;
    art.root.traverse(node=>{if(!node.isMesh)return;meshes++;geometry.add(node.geometry);materials.add(node.material);assert.equal(node.castShadow,true);assert.equal(node.receiveShadow,true);});
    art.pose({elevation:0}); // Inspect the neutral carriage, before howitzer elevation.
    const bounds=new THREE.Box3().setFromObject(art.root,true),size=bounds.getSize(new THREE.Vector3());
    assert.equal(art.root.userData.kind,kind);assert.equal(art.muzzle.userData.projectile,projectile);
    assert.ok(Math.abs(bounds.min.y)<.002,`${kind} contacts the ground at zero: ${bounds.min.y}`);
    assert.ok(size.x>(kind==='tank'?2:1.5)&&size.x<(kind==='tank'?2.3:1.7));
    assert.ok(size.z>2.6&&size.z<3.4);assert.ok(size.y>1.3&&size.y<1.6);
    assert.ok(meshes<90);assert.ok(geometry.size<=6,'basic meshes share geometry across the rig');
    assert.ok([...materials].every(material=>Object.values(palette).includes(material)),'no supplied paint is copied or replaced');
    assert.ok(materials.has(palette.body)&&materials.has(palette.trim)&&materials.has(palette.rubber));
    for(const shape of geometry){for(const array of [shape.attributes.position.array,shape.attributes.normal.array])assert.ok(array.every(Number.isFinite));}
    assert.deepEqual(muzzlePose(art).direction.toArray(),[0,0,1]);
    const muzzle=muzzlePose(art).point;assert.ok(Math.abs(muzzle.x)<1e-10);assert.ok(muzzle.z>1.4&&muzzle.z<=bounds.max.z+.02,'muzzle sits at the visible forward barrel tip');
  });

  test(`${kind} muzzle follows the positive yaw and upward elevation of its barrel`,t=>{
    const {art,parent}=fixture(t,create);
    art.pose({aimYaw:Math.PI/2,elevation:.5});const aimed=muzzlePose(art);
    assert.ok(aimed.direction.x>.85);assert.ok(aimed.direction.y>.45);assert.ok(Math.abs(aimed.direction.z)<1e-10);
    assert.ok(aimed.point.x>1.1);assert.ok(aimed.point.y>1.5);
    parent.position.set(4,2,-7);parent.rotation.y=.7;
    const transformed=muzzlePose(art),expected=aimed.point.clone().applyAxisAngle(new THREE.Vector3(0,1,0),.7).add(parent.position);
    parent.updateMatrixWorld(true);assert.ok(muzzlePose(art).point.distanceTo(expected)<1e-9);
    assert.ok(transformed.direction.length()>0);
  });

  test(`${kind} attack recoils behind its fire point and returns exactly to rest`,t=>{
    const {art}=fixture(t,create),neutral=transforms(art.root),rest=muzzlePose(art).point;
    art.pose({attack:.18});assert.deepEqual(transforms(art.root),neutral,'the shot uses the unretracted muzzle at .18');
    art.pose({attack:.27});const kicked=muzzlePose(art).point;assert.ok(kicked.z<rest.z-.12);
    art.pose({attack:.6});const returning=muzzlePose(art).point;assert.ok(returning.z>kicked.z&&returning.z<rest.z);
    art.pose({attack:1});assert.deepEqual(transforms(art.root),neutral);
    art.pose({time:17,moving:1,attack:.4,aimYaw:.6,elevation:.3});art.pose();assert.deepEqual(transforms(art.root),neutral);
  });

  test(`${kind} motion is deterministic, finite and never allocates pose geometry`,t=>{
    const {art}=fixture(t,create),geometry=[];art.root.traverse(node=>{if(node.isMesh)geometry.push(node.geometry);});
    const moving={time:1.23,moving:.8,attack:.4,aimYaw:.7,elevation:.3};art.pose(moving);const first=transforms(art.root);
    art.pose({time:91,moving:1,attack:.9});art.pose(moving);assert.deepEqual(transforms(art.root),first);
    const wheel=art.root.getObjectByName(kind==='tank'?'tank-wheel-left-0':'artillery-wheel-left');assert.notEqual(wheel.rotation.x,0);
    for(const pose of [{time:NaN,moving:Infinity,attack:NaN,aimYaw:Infinity,elevation:NaN},{time:21,moving:-5,attack:2,aimYaw:-1,elevation:50},{time:-40,moving:8,attack:-1,elevation:-50}]){
      art.pose(pose);art.root.updateMatrixWorld(true);art.root.traverse(node=>assert.ok(node.matrixWorld.elements.every(Number.isFinite)));
    }
    const after=[];art.root.traverse(node=>{if(node.isMesh)after.push(node.geometry);});assert.deepEqual(after,geometry);
  });

  test(`${kind} locomotion repeats seamlessly in the shared one-second GPU clip`,t=>{
    const {art}=fixture(t,create);
    for(const moving of [0,.25,.8,1]){
      art.pose({time:0,moving});const first=transforms(art.root);
      art.pose({time:1,moving});assert.deepEqual(transforms(art.root),first);
      art.pose({time:23,moving});assert.deepEqual(transforms(art.root),first);
      art.pose({time:.25,moving});const sample=transforms(art.root);
      art.pose({time:1.25,moving});assert.deepEqual(transforms(art.root),sample);
    }
  });

  test(`${kind} disposal releases its geometries once without touching parent or shared materials`,t=>{
    const {art,parent,sibling,palette}=fixture(t,create),disposed=new Map(),materialDisposals=[];
    art.root.traverse(node=>{if(node.isMesh&&!disposed.has(node.geometry)){disposed.set(node.geometry,0);node.geometry.addEventListener('dispose',()=>disposed.set(node.geometry,disposed.get(node.geometry)+1));}});
    Object.values(palette).forEach(material=>material.addEventListener('dispose',()=>materialDisposals.push(material)));
    art.dispose();art.dispose();const before=transforms(art.root);art.pose({time:7,moving:1,attack:.4});
    assert.deepEqual(transforms(art.root),before);assert.deepEqual(parent.children,[sibling]);assert.equal(art.root.parent,null);
    assert.ok([...disposed.values()].every(count=>count===1));assert.deepEqual(materialDisposals,[]);
  });
}

test('artillery shield and carriage remain above the tire crown throughout aim and recoil',t=>{
  const {art}=fixture(t,createArtilleryArt),shield=art.root.getObjectByName('artillery-shield');
  for(const aimYaw of [0,.5,Math.PI/2,Math.PI])for(const attack of [0,.27,1]){
    art.pose({aimYaw,attack});art.root.updateMatrixWorld(true);
    assert.ok(new THREE.Box3().setFromObject(shield,true).min.y>.72,'shield never cuts through either wheel');
  }
});

test('artillery rests as a raised howitzer while explicit zero remains available to bake neutral clips',t=>{
  const{art}=fixture(t,createArtilleryArt);const resting=muzzlePose(art);
  assert.ok(resting.direction.y>.5&&resting.point.y>1.7);
  art.pose({elevation:1.2});assert.ok(muzzlePose(art).direction.y>.9);
  art.pose({elevation:0});assert.deepEqual(muzzlePose(art).direction.toArray(),[0,0,1]);
});
