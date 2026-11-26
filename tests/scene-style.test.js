import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {applySceneStyle,createDaylight,styleUniforms} from '../src/scene-style.js';
import {applyDetailReveal} from '../src/detail-reveal.js';
import {createNightSky} from '../src/night-sky.js';

test('paint, glow and reveal compose without recompiling on a night toggle',()=>{
  const reveal={value:.4},material=applySceneStyle(applyDetailReveal(new THREE.MeshStandardMaterial(),reveal),{kind:'window'});
  const shader={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
  material.onBeforeCompile(shader);
  assert.equal(shader.uniforms.detailReveal,reveal);assert.equal(shader.uniforms.worldNight,styleUniforms.night);
  assert.match(shader.fragmentShader,/paneVariation/);assert.match(shader.fragmentShader,/discard/);
  assert.match(shader.vertexShader,/instanceMatrix \* paintPosition/);
  const version=material.version,key=material.customProgramCacheKey();styleUniforms.night.value=1;
  assert.equal(material.version,version);assert.equal(material.customProgramCacheKey(),key);
  assert.equal(material.transparent,false);material.dispose();styleUniforms.night.value=0;
});

test('cloned materials can reinstall shader hooks independently',()=>{
  const original=applySceneStyle(new THREE.MeshStandardMaterial(),{kind:'window'}),copy=original.clone();
  applySceneStyle(copy);
  const shader={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
  copy.onBeforeCompile(shader);assert.equal(shader.uniforms.worldNight,styleUniforms.night);
  assert.match(shader.fragmentShader,/paneVariation/);original.dispose();copy.dispose();
});

test('day and night use fixed lights with smooth color transitions and paused simulation time',()=>{
  const scene=new THREE.Scene(),mapScene=new THREE.Scene(),sky=new THREE.HemisphereLight(),sun=new THREE.DirectionalLight(),fill=new THREE.DirectionalLight();
  const renderer={},reducedMotion={matches:false},light=createDaylight({scene,mapScene,sky,sun,fill,renderer,reducedMotion});
  assert.equal(scene.background,mapScene.background);light.toggle();light.update(.1,7);
  assert.ok(light.night>0&&light.night<1);assert.equal(styleUniforms.time.value,7);
  light.update(.1,7);assert.equal(styleUniforms.time.value,7);
  reducedMotion.matches=true;light.update(.1,7);assert.equal(light.night,1);
  assert.ok(sky.intensity>.5&&sun.intensity>.5,'night keeps geography readable');
  light.toggle();light.update(.1,7);assert.equal(light.night,0);
});

test('stars are a bounded opaque background batch and never draw over the planet',()=>{
  const scene=new THREE.Scene(),mapScene=new THREE.Scene();scene.background=mapScene.background=new THREE.Color(0x102030);
  const stars=createNightSky(scene,mapScene);styleUniforms.night.value=1;stars.update();
  for(const parent of [scene,mapScene]){
    const mesh=parent.getObjectByName('night-stars');assert.equal(mesh.geometry.attributes.position.count,420);
    assert.equal(mesh.material.transparent,false);assert.equal(mesh.material.depthWrite,false);assert.ok(mesh.renderOrder<0);
    assert.equal(mesh.visible,true);
  }
  stars.dispose();assert.equal(scene.children.length,0);assert.equal(mapScene.children.length,0);styleUniforms.night.value=0;
});
