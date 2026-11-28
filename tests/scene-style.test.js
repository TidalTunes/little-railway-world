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

test('day and night follow the calendar smoothly even when animation time is paused',()=>{
  const scene=new THREE.Scene(),mapScene=new THREE.Scene(),sky=new THREE.HemisphereLight(),sun=new THREE.DirectionalLight(),fill=new THREE.DirectionalLight();
  const renderer={},reducedMotion={matches:false},light=createDaylight({scene,mapScene,sky,sun,fill,renderer,reducedMotion});
  assert.equal(scene.background,mapScene.background);light.update(.1,7,290);
  assert.equal(light.night,.5);assert.equal(styleUniforms.time.value,7);
  light.update(.1,7,300);assert.equal(styleUniforms.time.value,7);assert.equal(light.night,1);
  reducedMotion.matches=true;light.update(.1,7,590);assert.equal(light.night,.5,'reduced motion does not snap the sky');
  light.update(.1,7,450);assert.equal(light.night,1);assert.equal(light.phase,'night');
  assert.ok(sky.intensity>=.2&&sky.intensity<.3&&sun.intensity>.5,'darker ambient preserves moonlight, leaving room for warm local lamps');
  light.update(.1,7,600);assert.equal(light.night,0);assert.equal(light.phase,'day');
  assert.equal(light.toggle,undefined);assert.equal(light.setNight,undefined,'no manual night override remains');
});

test('ground stars stay at fixed sky bearings while walking and respond only to camera rotation',()=>{
  const scene=new THREE.Scene(),mapScene=new THREE.Scene(),stars=createNightSky(scene,mapScene),camera=new THREE.PerspectiveCamera(54,1,.05,150);
  const material=scene.getObjectByName('night-stars').material,uniforms=material.uniforms;
  camera.position.set(5,2,5);camera.lookAt(5,2,-5);stars.update(camera,{walking:true});
  assert.equal(uniforms.anchored.value,1);
  const direction=new THREE.Vector3(.2,.3,-1).normalize(),project=()=>new THREE.Vector4(...direction.clone().applyMatrix3(uniforms.skyView.value).toArray(),0).applyMatrix4(uniforms.skyProjection.value);
  const before=project();camera.position.set(100,8,40);camera.lookAt(100,8,30);stars.update(camera,{walking:true});
  assert.ok(before.clone().sub(project()).length()<1e-10,'camera translation causes no star parallax');
  camera.lookAt(110,8,40);stars.update(camera,{walking:true});assert.ok(before.clone().sub(project()).length()>1);
  assert.equal(mapScene.getObjectByName('night-stars').material.uniforms.anchored.value,0,'map sky retains its separate backdrop');
  stars.dispose();
});

test('daylight colors depend on elapsed calendar time rather than frame rate or integration history',()=>{
  const make=()=>{
    const scene=new THREE.Scene(),mapScene=new THREE.Scene(),sky=new THREE.HemisphereLight(),sun=new THREE.DirectionalLight(),fill=new THREE.DirectionalLight(),renderer={};
    return{scene,sky,sun,fill,renderer,light:createDaylight({scene,mapScene,sky,sun,fill,renderer})};
  };
  const stepped=make(),direct=make();
  for(let elapsed=0;elapsed<=590;elapsed+=.5)stepped.light.update(.5,elapsed,elapsed);
  direct.light.update(.016,7,590);
  assert.ok(stepped.scene.background.equals(direct.scene.background));
  for(const kind of ['sky','sun','fill']){
    assert.ok(stepped[kind].color.equals(direct[kind].color));
    assert.equal(stepped[kind].intensity,direct[kind].intensity);
  }
  assert.equal(stepped.renderer.toneMappingExposure,direct.renderer.toneMappingExposure);
  assert.equal(stepped.light.clockTime,direct.light.clockTime);
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
