import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createPlayerBotArt} from '../src/player-bot-art.js';
import {createTravellerArt,poseTravellerArt,TRAVELLER_SWING_DURATION} from '../src/traveller-art.js';
import {playerColors} from '../src/player-palette.js';
import {M} from '../src/palette.js';
import {PERSON_HEIGHT} from '../src/person-scale.js';
import {surfacePoint,surfaceNormal,surfaceChartCoordinates} from '../src/world-surface.js';

const world={players:[{id:'blue',color:{l:.63,c:.14,h:250}},{id:'gold',color:{l:.67,c:.12,h:82}}]};
const snapshot={id:'blue-player',ownerId:'blue',position:{x:0,y:.035,z:0},heading:0,speed:0,gait:0,swingTime:0,state:'idle'};
function fixture(t,{globe=world}={}){
  const scene=new THREE.Scene(),mapScene=new THREE.Scene(),bot=createPlayerBotArt(scene,mapScene,globe,{ownerId:'blue'});
  const camera=new THREE.PerspectiveCamera(54,1.5,.045,180);camera.position.set(0,2.6,-6);camera.lookAt(0,.5,0);camera.updateMatrixWorld(true);
  t.after(()=>bot.dispose());return{scene,mapScene,bot,camera};
}

test('other players share the human scale, solid figure and right-hand axe with distinct owner paint',t=>{
  const {bot,camera}=fixture(t);bot.update(snapshot,{camera,walkingWeight:1,focus:snapshot.position});bot.root.updateMatrixWorld(true);
  assert.equal(bot.root.visible,true);
  const bounds=new THREE.Box3();bot.art.root.traverse(mesh=>{if(mesh.isMesh&&!mesh.name.startsWith('axe-'))bounds.union(new THREE.Box3().setFromObject(mesh,true));});
  assert.ok(Math.abs(bounds.getSize(new THREE.Vector3()).y-PERSON_HEIGHT)<1e-7);
  assert.ok(Math.abs(bounds.min.y)<1e-7,'sole meets the same supporting datum as the human');
  const coat=bot.root.getObjectByName('traveller-coat'),cap=bot.root.getObjectByName('traveller-cap');
  assert.ok(coat.material.color.equals(playerColors(world.players[0]).body));
  assert.ok(!cap.material.color.equals(coat.material.color));
  assert.equal(bot.art.axe.parent,bot.art.rightArm);assert.ok(bot.art.rightArm.position.x<0);
  assert.ok(Math.abs(bot.art.shadow.matrix.elements[13]-.036)<1e-9);
});

test('remaining AI swing time maps exactly onto the human across-body axe stroke',t=>{
  const {bot,camera}=fixture(t),reference=createTravellerArt(new THREE.Group());t.after(()=>reference.dispose());
  for(const elapsed of [0,.07,.145,.22,.30,.377,.47,.579,.58]){
    bot.update({...snapshot,swingTime:TRAVELLER_SWING_DURATION-elapsed},{camera});
    poseTravellerArt(reference,{swingElapsed:elapsed});
    for(const part of ['rightArm','body','axe']){
      for(const axis of ['x','y','z'])assert.ok(Math.abs(bot.art[part].rotation[axis]-reference[part].rotation[axis])<1e-12);
      assert.ok(bot.art[part].position.distanceTo(reference[part].position)<1e-12);
    }
  }
  assert.ok(Math.abs(bot.art.rightArm.rotation.x)<1e-12);assert.equal(bot.art.axe.rotation.y,0);
  assert.equal(bot.art.rightArm.position.z,0,'finished attacks leave the hand beside the body');
});

test('AI gait uses the same step pose without advancing when the snapshot is unchanged',t=>{
  const {bot,camera}=fixture(t),reference=createTravellerArt(new THREE.Group());t.after(()=>reference.dispose());
  const moving={...snapshot,speed:2.3,gait:1.4};
  bot.update(moving,{camera,dt:1/30});poseTravellerArt(reference,{gait:1.4,moving:1});
  for(let i=0;i<2;i++){
    assert.ok(bot.art.legs[i].rotation.equals(reference.legs[i].rotation));
    assert.ok(bot.art.legs[i].position.equals(reference.legs[i].position));
  }
  const before=bot.art.legs[0].rotation.x;bot.update(moving,{camera,dt:10});assert.equal(bot.art.legs[0].rotation.x,before);
  bot.update(moving,{camera,reducedMotion:true});assert.equal(bot.art.legs[0].rotation.x,0);
});

test('map locators follow exact bot positions and owner colors while unreadable figures stop drawing',t=>{
  const {bot}=fixture(t);const camera=new THREE.OrthographicCamera(-120,120,80,-80,.1,800);
  camera.position.set(0,180,-180);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const state={...snapshot,position:{x:12,y:.035,z:6}};
  bot.update(state,{camera,mapBlend:1,viewportHeight:800});
  assert.equal(bot.root.visible,false);assert.equal(bot.marker.mapRoot.visible,true);
  assert.equal(bot.marker.mapRoot.position.x,12);assert.equal(bot.marker.mapRoot.position.z,6);
  assert.equal(bot.art.root.position.x,12);assert.equal(bot.art.root.position.z,6,'hidden art remains attached to the same authoritative anchor');
  const color=bot.marker.mapRoot.geometry.getAttribute('color'),expected=playerColors(world.players[0]).body;
  assert.ok(Math.abs(color.getX(0)-expected.r)<1e-7&&Math.abs(color.getY(0)-expected.g)<1e-7&&Math.abs(color.getZ(0)-expected.b)<1e-7);
  bot.update({...state,position:{x:500,y:.035,z:6}},{camera,mapBlend:1});assert.equal(bot.marker.mapRoot.visible,false);
});

test('third-person distance culls bot meshes and shadows without changing or labelling snapshots',t=>{
  const {bot,camera}=fixture(t),state={...snapshot,position:{x:0,y:.035,z:60}},saved=structuredClone(snapshot);
  camera.position.set(0,2.6,54);camera.lookAt(0,.5,60);camera.updateMatrixWorld(true);
  bot.update(state,{camera,walkingWeight:1,focus:snapshot.position});assert.equal(bot.root.visible,false);
  bot.update(state,{camera,walkingWeight:1,focus:state.position});assert.equal(bot.root.visible,true);
  assert.deepEqual(snapshot,saved);assert.equal(bot.marker.root.visible,false);
  bot.update(null,{camera});assert.equal(bot.root.visible,false);assert.equal(bot.marker.root.visible,false);
});

test('bot pose and contact shadow remain upright and attached on the globe',t=>{
  const globe={...world,surface:{type:'sphere',radius:1800,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:1800,centralLongitude:0,centralLatitude:0}}};
  const {bot,camera}=fixture(t,{globe}),position={...surfaceChartCoordinates(globe,130,65),y:.035};
  const point=surfacePoint(globe,position.x,position.y,position.z),normal=surfaceNormal(globe,position.x,position.z);
  camera.position.copy(point).addScaledVector(normal,5);camera.up.set(1,0,0);camera.lookAt(point);camera.updateMatrixWorld(true);
  bot.update({...snapshot,position,heading:.8},{camera});
  assert.ok(bot.art.root.position.distanceTo(point)<1e-8);
  assert.ok(new THREE.Vector3(0,1,0).applyQuaternion(bot.art.root.quaternion).distanceTo(normal)<1e-8);
  const expected=surfacePoint(globe,position.x,.036,position.z),shadow=new THREE.Vector3().setFromMatrixPosition(bot.art.shadow.matrix);
  assert.ok(shadow.distanceTo(expected)<1e-8);
});

test('disposing bot art removes its markers and releases owned resources without disposing shared human paint',t=>{
  const {bot,scene,mapScene,camera}=fixture(t);let geometryDisposals=0,materialDisposals=0,sharedDisposals=0;
  bot.art.root.getObjectByName('traveller-coat').geometry.addEventListener('dispose',()=>geometryDisposals++);
  bot.art.root.getObjectByName('traveller-coat').material.addEventListener('dispose',()=>materialDisposals++);
  const shared=()=>sharedDisposals++;M.peach.addEventListener('dispose',shared);t.after(()=>M.peach.removeEventListener('dispose',shared));
  bot.dispose();bot.dispose();bot.update(snapshot,{camera});
  assert.equal(scene.children.length,0);assert.equal(mapScene.children.length,0);
  assert.equal(geometryDisposals,1);assert.equal(materialDisposals,1);assert.equal(sharedDisposals,0);
});
