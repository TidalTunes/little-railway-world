import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createSettlementIncomeEffects} from '../src/settlement-income-effects.js';
function setup(){const scene=new THREE.Group(),map=new THREE.Group(),effects=createSettlementIncomeEffects(scene,map,{}),camera=new THREE.PerspectiveCamera(50,1,.1,1000);camera.position.set(0,25,30);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);return {scene,map,effects,camera};}

test('income coins appear once above each visible home in both render layers and expire',()=>{
  const {scene,map,effects,camera}=setup();
  effects.emit([{x:0,y:0,z:0},{x:3,z:0},{x:1000,z:0}]);effects.update(.2,{camera,mapBlend:.5});
  assert.equal(effects.visibleCount,2);assert.equal(scene.children[0].count,2);assert.equal(map.children[0].count,2);
  assert.equal(scene.children[0].geometry,map.children[0].geometry);assert.ok(scene.children[0].visible&&map.children[0].visible);
  effects.update(.1,{camera,walkingWeight:1});assert.equal(effects.visibleCount,0,'third person uses the gold banner');
  effects.update(3,{camera});assert.equal(effects.active,false);assert.equal(scene.children[0].visible,false);effects.dispose();assert.equal(scene.children.length,0);
});

test('reduced-motion coins remain anchored and repeated payouts reuse GPU resources',()=>{
  const {scene,effects,camera}=setup();const geometry=scene.children[0].geometry,material=scene.children[0].material;
  effects.emit([{x:0,z:0}]);effects.update(.2,{camera,reducedMotion:true});const first=new THREE.Matrix4(),next=new THREE.Matrix4();scene.children[0].getMatrixAt(0,first);
  effects.update(.8,{camera,reducedMotion:true});scene.children[0].getMatrixAt(0,next);assert.deepEqual(next.elements,first.elements);
  effects.emit(Array.from({length:30},(_,i)=>({x:i/5,z:0})));effects.update(.2,{camera});assert.equal(effects.visibleCount,30);
  assert.equal(scene.children[0].geometry,geometry);assert.equal(scene.children[0].material,material);effects.dispose();
});
