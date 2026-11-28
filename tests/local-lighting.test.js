import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createLocalLighting,LOCAL_LIGHT_LIMITS} from '../src/local-lighting.js';

test('local windows illuminate real geometry using a fixed shadow-free light pool',()=>{
  const scene=new THREE.Scene(),lighting=createLocalLighting(scene,{});
  const placements=Array.from({length:2000},(_,i)=>({id:`home-${i}`,kind:'house',x:i*4,z:0,rotation:0}));
  for(let i=0;i<90;i++)lighting.update(1/30,{placements,focus:{x:0,z:0},night:1});
  assert.equal(lighting.lights.length,LOCAL_LIGHT_LIMITS.lights);
  assert.equal(scene.children.length,8);assert.equal(lighting.stats.active,8);
  for(const lamp of lighting.lights){assert.ok(lamp.isPointLight);assert.equal(lamp.castShadow,false);assert.ok(lamp.intensity>1);assert.ok(lamp.distance<8);}
  const first=lighting.lights[0];assert.ok(first.position.distanceTo(new THREE.Vector3(0,.91,1.06))<1e-8);
  const selections=lighting.stats.selections;
  for(let i=0;i<60;i++)lighting.update(1/30,{placements,focus:{x:0,z:0},night:1});
  assert.equal(lighting.stats.selections,selections,'an idle camera does not sort fixtures each frame');
  lighting.update(1/30,{placements,night:0});assert.ok(lighting.lights.every(light=>light.intensity===0));
  assert.equal(scene.children.length,8,'daylight keeps light count fixed to avoid shader compilation');
  lighting.dispose();lighting.dispose();assert.equal(scene.children.length,0);
});

test('station lights follow the canopy and fade before moving to distant fixtures',()=>{
  const scene=new THREE.Scene(),lighting=createLocalLighting(scene,{}),placements=[
    {id:'station',kind:'station',x:0,y:.4,z:0,rotation:Math.PI/2},
    {id:'far',kind:'house',x:150,z:0},
  ];
  for(let i=0;i<60;i++)lighting.update(1/30,{placements,focus:{x:0,z:0},night:1});
  assert.equal(lighting.stats.active,2);
  assert.ok(lighting.lights[0].position.distanceTo(new THREE.Vector3(-.15,2.04,-.78))<1e-8);
  lighting.update(.3,{placements,focus:{x:150,z:0},night:1});
  assert.ok(lighting.lights[0].position.x<1,'a glowing lamp never slides across the landscape');
  for(let i=0;i<60;i++)lighting.update(1/30,{placements,focus:{x:150,z:0},night:1});
  assert.equal(lighting.stats.active,1);assert.equal(lighting.lights[0].position.x,150);
  lighting.update(.1,{placements,focus:{x:150,z:0},night:1,mapBlend:1});
  assert.equal(lighting.stats.active,0,'the flat map pays no local illumination');lighting.dispose();
});

test('fixtures built during daytime are selected when night returns at the same focus',()=>{
  const lighting=createLocalLighting(new THREE.Scene(),{}),focus={x:0,z:0};
  const old=[{id:'old',kind:'house',x:5,z:0}],next=[{id:'new',kind:'house',x:1,z:0}];
  for(let i=0;i<60;i++)lighting.update(1/30,{placements:old,focus,night:1});
  lighting.update(.1,{placements:next,focus,night:0});
  for(let i=0;i<90;i++)lighting.update(1/30,{placements:next,focus,night:1});
  assert.equal(lighting.stats.active,1);
  assert.equal(lighting.lights.find(light=>light.intensity>.01).position.x,1);
  assert.equal(lighting.stats.selections,2);lighting.dispose();
});
