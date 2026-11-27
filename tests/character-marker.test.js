import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createCharacterMarker} from '../src/character-marker.js';
import {surfacePoint,surfaceNormal} from '../src/world-surface.js';
import {playerColors} from '../src/player-palette.js';

test('the overview locator stays at the character and keeps a modest readable pixel size',()=>{
  const scene=new THREE.Scene(),mapScene=new THREE.Scene(),marker=createCharacterMarker(scene,mapScene,{});
  const camera=new THREE.OrthographicCamera(-120,120,80,-80,.1,800),position={x:24,y:.035,z:-38};
  camera.position.set(24,180,142);camera.lookAt(position.x,position.y,position.z);camera.updateMatrixWorld(true);
  marker.update({position,initialized:true,camera,viewportHeight:800});assert.equal(marker.root.visible,true);
  assert.equal(marker.root.position.x,position.x);assert.equal(marker.root.position.z,position.z);
  assert.equal(marker.root.scale.x*800/160,8);
  camera.zoom=2;camera.updateProjectionMatrix();marker.update({position,initialized:true,camera,viewportHeight:800,mapBlend:1});
  assert.equal(marker.root.visible,false);assert.equal(marker.mapRoot.visible,true);assert.equal(marker.mapRoot.scale.x*800/80,9);
  assert.equal(marker.mapRoot.position.x,position.x);assert.equal(marker.mapRoot.position.z,position.z);
  marker.dispose();assert.equal(scene.children.length,0);assert.equal(mapScene.children.length,0);
});

test('physical character takes over without an oversized locator in the walking view',()=>{
  const marker=createCharacterMarker(new THREE.Scene(),new THREE.Scene(),{}),position={x:0,y:.035,z:0};
  const camera=new THREE.PerspectiveCamera(54,1.5,.045,140);camera.position.set(0,1.8,-3.4);camera.lookAt(0,.7,0);camera.updateMatrixWorld(true);
  marker.update({position,initialized:true,camera,walking:true});assert.equal(marker.root.visible,false);assert.equal(marker.mapRoot.visible,false);
  marker.update({position,initialized:false,camera,mapBlend:1});assert.equal(marker.mapRoot.visible,false);marker.dispose();
});

test('unreadable figures can skip their individual draws while the locator preserves their position',()=>{
  const marker=createCharacterMarker(new THREE.Scene(),new THREE.Scene(),{}),position={x:0,y:.035,z:0};
  const camera=new THREE.OrthographicCamera(-60,60,40,-40,.1,800);
  camera.position.set(0,100,-100);camera.lookAt(0,.035,0);camera.updateMatrixWorld(true);
  camera.zoom=.5;camera.updateProjectionMatrix();marker.update({position,initialized:true,camera,viewportHeight:800});
  assert.equal(marker.characterReadable,false);assert.equal(marker.root.visible,true);
  camera.zoom=.8;camera.updateProjectionMatrix();marker.update({position,initialized:true,camera,viewportHeight:800});
  assert.equal(marker.characterReadable,false,'the passenger-sized figure is still below five pixels at this magnification');
  camera.zoom=1;camera.updateProjectionMatrix();marker.update({position,initialized:true,camera,viewportHeight:800});
  assert.equal(marker.characterReadable,true);assert.equal(marker.root.visible,true,'the figure and locator overlap instead of leaving a visibility gap');
  assert.ok(marker.root.material.opacity>0&&marker.root.material.opacity<1);
  marker.update({position:{x:400,y:.035,z:0},initialized:true,camera,viewportHeight:800});
  assert.equal(marker.characterReadable,false,'off-screen figures also avoid individual draw calls');
  assert.equal(marker.root.visible,false);marker.dispose();
});

test('the character locator respects a curved surface and disappears on the far hemisphere',()=>{
  const world={surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
  const position={x:40,y:.035,z:80},point=surfacePoint(world,position.x,position.y,position.z),normal=surfaceNormal(world,position.x,position.z);
  const camera=new THREE.OrthographicCamera(-200,200,150,-150,.1,8000);camera.position.copy(point).addScaledVector(normal,4000);camera.lookAt(point);camera.updateMatrixWorld(true);
  const marker=createCharacterMarker(new THREE.Scene(),new THREE.Scene(),world);
  marker.update({position,initialized:true,camera,mapBlend:1});assert.equal(marker.mapRoot.visible,true);
  assert.ok(marker.mapRoot.position.distanceTo(surfacePoint(world,position.x,2.4,position.z))<1e-9);
  camera.position.copy(point).addScaledVector(normal,-4000);camera.lookAt(point);camera.updateMatrixWorld(true);
  marker.update({position,initialized:true,camera,mapBlend:1});assert.equal(marker.mapRoot.visible,false);marker.dispose();
});


test('the local traveller is an owner-colored triangle and rivals retain circular locators',()=>{
  const world={gameplay:{ownerId:'violet'},players:[{id:'violet',color:{l:.65,c:.15,h:300}}]};
  const own=createCharacterMarker(new THREE.Group(),new THREE.Group(),world),rival=createCharacterMarker(new THREE.Group(),new THREE.Group(),world,{self:false});
  try{
    assert.equal(own.root.geometry.attributes.position.count,45);
    assert.ok(rival.root.geometry.attributes.position.count>own.root.geometry.attributes.position.count);
    const color=new THREE.Color().fromBufferAttribute(own.root.geometry.attributes.color,0),expected=playerColors(world.players[0]).body;
    assert.ok(Math.abs(color.r-expected.r)+Math.abs(color.g-expected.g)+Math.abs(color.b-expected.b)<1e-6);
    const camera=new THREE.OrthographicCamera(-100,100,100,-100,.1,1000);camera.position.set(0,200,0);camera.up.set(0,0,-1);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
    const position={x:0,z:0,y:0};own.update({position,initialized:true,camera,mapBlend:1,heading:0});
    const before=own.mapRoot.quaternion.clone();own.update({position,initialized:true,camera,mapBlend:1,heading:Math.PI/2});
    assert.ok(Math.abs(before.angleTo(own.mapRoot.quaternion)-Math.PI/2)<1e-7);
    assert.equal(own.root.geometry,own.mapRoot.geometry);
  }finally{own.dispose();rival.dispose();}
});

test('the directional triangle follows screen-space heading on wide and portrait viewports',()=>{
  const marker=createCharacterMarker(new THREE.Group(),new THREE.Group(),{}),position={x:12,z:-8,y:0},heading=.73;
  try{
    for(const aspect of [.6,2.4])for(const perspective of [false,true]){
      const camera=perspective?new THREE.PerspectiveCamera(54,aspect,.1,1000):new THREE.OrthographicCamera(-100*aspect,100*aspect,100,-100,.1,1000);
      camera.position.set(60,200,170);camera.lookAt(position.x,0,position.z);camera.updateMatrixWorld(true);
      marker.update({position,initialized:true,camera,mapBlend:1,heading});
      const origin=new THREE.Vector3(position.x,position.y,position.z),ahead=origin.clone().add(new THREE.Vector3(Math.sin(heading),0,Math.cos(heading)));
      origin.project(camera);ahead.project(camera);
      const expected=new THREE.Vector2((ahead.x-origin.x)*aspect,ahead.y-origin.y).normalize();
      const actual=new THREE.Vector3(0,1,0).applyQuaternion(marker.mapRoot.quaternion).applyQuaternion(camera.quaternion.clone().invert());
      assert.ok(expected.distanceTo(new THREE.Vector2(actual.x,actual.y))<1e-7,`${perspective?'perspective':'orthographic'} aspect ${aspect}`);
    }
  }finally{marker.dispose();}
});
