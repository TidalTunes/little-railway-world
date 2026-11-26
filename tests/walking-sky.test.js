import test from 'node:test';
import assert from 'node:assert/strict';
import {Scene,PerspectiveCamera,Color,Vector3,Vector4} from 'three';
import {createWalkingSky} from '../src/walking-sky.js';

function skyRay(sky,x=0,y=0){
  const uniforms=sky.root.material.uniforms;
  const ray=new Vector4(x,y,1,1).applyMatrix4(uniforms.inverseProjection.value);
  return new Vector3(ray.x,ray.y,ray.z).transformDirection(uniforms.cameraWorld.value);
}

test('walking sky stays behind terrain and existing night stars with one reusable triangle',()=>{
  const scene=new Scene();scene.background=new Color(0xb8d5d9);
  const sky=createWalkingSky(scene),camera=new PerspectiveCamera(54,1.5,.045,140);
  assert.equal(sky.root.visible,false);assert.equal(sky.root.geometry.attributes.position.count,3);
  assert.equal(sky.root.material.depthWrite,false);assert.equal(sky.root.material.depthTest,true);
  assert.ok(sky.root.renderOrder<-1000,'the existing night stars paint over the sky');
  sky.update(camera,{visible:true,night:0});assert.equal(sky.root.visible,true);
  assert.ok(sky.root.material.uniforms.horizonColor.value.equals(scene.background));
  scene.background.set(0x081626);sky.update(camera,{visible:true,night:1});
  assert.ok(sky.root.material.uniforms.horizonColor.value.equals(scene.background),'horizon follows the same nighttime color as fog');
  sky.update(camera,{visible:false});assert.equal(sky.root.visible,false);
  sky.dispose();sky.dispose();assert.equal(scene.children.length,0);
});

test('sky direction follows camera rotation but is independent of player translation',()=>{
  const scene=new Scene(),sky=createWalkingSky(scene),camera=new PerspectiveCamera(54,1.5,.045,140);
  camera.position.set(3,2,8);camera.lookAt(3,2,0);sky.update(camera,{visible:true});
  assert.ok(skyRay(sky).distanceTo(new Vector3(0,0,-1))<1e-10);
  const first=skyRay(sky,.6,.3);camera.position.set(101,30,42);camera.lookAt(101,30,34);sky.update(camera,{visible:true});
  assert.ok(skyRay(sky,.6,.3).distanceTo(first)<1e-10,'walking cannot drag the sky or clouds along the ground');
  camera.lookAt(109,30,42);sky.update(camera,{visible:true});
  assert.ok(skyRay(sky).distanceTo(new Vector3(1,0,0))<1e-10,'cloud directions track orbiting the player');
  const up=new Vector3(1,2,3),sun=new Vector3(-2,4,1);sky.update(camera,{visible:true,up,sunDirection:sun});
  assert.ok(Math.abs(sky.root.material.uniforms.skyUp.value.length()-1)<1e-12);
  assert.ok(Math.abs(sky.root.material.uniforms.sunDirection.value.length()-1)<1e-12);
  assert.deepEqual(up.toArray(),[1,2,3]);assert.deepEqual(sun.toArray(),[-2,4,1]);
  sky.dispose();
});
