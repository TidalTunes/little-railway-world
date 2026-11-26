import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createViewController} from '../src/view-controller.js';
import {CAMERA_ZOOM,mapBlendForZoom} from '../src/camera-modes.js';
import {surfacePoint} from '../src/world-surface.js';

const scale=12,radius=1600,entry=CAMERA_ZOOM.mapBlendEnd*scale;
class Canvas extends EventTarget{
  constructor(document){super();this.ownerDocument=document;this.style={};this.dataset={};this.clientWidth=1000;this.clientHeight=750;}
  getBoundingClientRect(){return{left:0,top:0,width:1000,height:750};}
  setPointerCapture(){} releasePointerCapture(){}
}
function fixture(t,{ready=true,reduced=false}={}){
  const previousWindow=globalThis.window,document=new EventTarget();globalThis.window=new EventTarget();
  const canvas=new Canvas(document),scene=new THREE.Scene(),mapScene=new THREE.Scene(),root=new THREE.Group();scene.add(root);
  const world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  const camera=new THREE.OrthographicCamera(-2200,2200,1650,-1650,.1,18000);
  camera.position.set(0,4200,4200);camera.lookAt(0,1.3,0);camera.updateMatrixWorld(true);
  const view=createViewController({canvas,camera,scene,mapScene,reducedMotion:{matches:reduced},
    getWorld:()=>world,getWorldRoot:()=>root,getTrains:()=>[],isDetailReady:()=>ready,onPause(){},onRegenerate(){}});
  view.setScale(scale);view.setHome();view.update(1/60);
  const request=value=>{view.navigation.zoom=value*scale;view.navigation.updateProjectionMatrix();};
  const update=(count=1,dt=1/60)=>{for(let i=0;i<count;i++)view.update(dt);};
  function pan(x,z){const delta=new THREE.Vector3(x,0,z);view.controls.target.add(delta);view.navigation.position.add(delta);}
  t.after(()=>{
    view.controls.dispose();
    for(const marker of [...scene.children,...mapScene.children]){marker.geometry?.dispose();marker.material?.dispose();}
    if(previousWindow===undefined)delete globalThis.window;else globalThis.window=previousWindow;
  });
  return{view,camera,canvas,world,request,update,pan,setReady:value=>{ready=value;}};
}
const near=(actual,expected,tolerance=1e-9)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} differs from ${expected}`);
const sameVector=(actual,expected)=>assert.ok(actual.distanceTo(expected)<1e-8,`${actual.toArray()} differs from ${expected.toArray()}`);

test('detail blend is determined by visible zoom, independent of elapsed time and readiness',t=>{
  const f=fixture(t);
  for(const zoom of [.6,.78,.89,1,1.5,.89]){
    f.request(zoom);f.update();near(f.camera.zoom,zoom*scale);
    const expected=mapBlendForZoom(zoom),position=f.camera.position.clone(),quaternion=f.camera.quaternion.clone();
    near(f.view.blend,expected);
    f.update(90,1/30);near(f.view.blend,expected);sameVector(f.camera.position,position);
    assert.ok(f.camera.quaternion.angleTo(quaternion)<1e-7);
    if(zoom>.78){
      f.setReady(false);f.update(90);near(f.camera.zoom,zoom*scale);near(f.view.blend,expected);
      f.setReady(true);f.update();
    }
  }
});

test('cold fast zoom waits at the fixed entry scale and automatically continues without another input',t=>{
  const f=fixture(t,{ready:false});f.request(3.2);f.update();
  near(f.camera.zoom,entry);near(f.view.navigation.zoom,3.2*scale);assert.equal(f.view.blend,1);
  assert.equal(f.view.waitingForDetail,true);near(f.view.coverageCamera.zoom,entry);
  f.update(180,1/30);near(f.camera.zoom,entry);assert.equal(f.view.blend,1);
  f.setReady(true);f.update();
  assert.ok(f.camera.zoom>entry&&f.camera.zoom<3.2*scale,'catch-up is smooth and retains the requested destination');
  assert.equal(f.view.waitingForDetail,false);near(f.view.blend,mapBlendForZoom(f.camera.zoom/scale));
  f.update(180);near(f.camera.zoom,3.2*scale);assert.equal(f.view.blend,0);
  assert.equal(f.canvas.dataset.zoom,f.camera.zoom.toFixed(3));
});

test('cold and warm transitions have exactly the same blend at the same displayed scale',t=>{
  const f=fixture(t,{ready:false});f.request(.89);f.update(120);
  f.setReady(true);f.update(180);const delayed=f.view.blend;
  f.request(.5);f.update();f.request(.89);f.update();
  near(f.camera.zoom,.89*scale);near(f.view.blend,delayed);near(delayed,.5);
});

test('an uncached pan retains the detailed camera while coverage prepares the requested target',t=>{
  const f=fixture(t);f.request(2);f.update();
  const position=f.camera.position.clone(),quaternion=f.camera.quaternion.clone(),target=f.view.renderTarget.clone();
  f.setReady(false);f.pan(400,-250);f.update(60);
  sameVector(f.camera.position,position);sameVector(f.view.renderTarget,target);near(f.camera.zoom,2*scale);
  assert.ok(f.camera.quaternion.angleTo(quaternion)<1e-7);assert.equal(f.view.blend,0);assert.equal(f.view.waitingForDetail,true);
  const requested=surfacePoint(f.world,f.view.controls.target.x,f.view.controls.target.y,f.view.controls.target.z).project(f.view.coverageCamera);
  near(requested.x,0);near(requested.y,0);
  f.setReady(true);f.update();sameVector(f.view.renderTarget,f.view.controls.target);
  assert.ok(f.camera.position.distanceTo(position)>100);assert.equal(f.view.blend,0);
});

test('zooming back to the map cancels pending entry and never restores stale requested zoom',t=>{
  const f=fixture(t,{ready:false});f.request(3);f.update();assert.equal(f.view.waitingForDetail,true);
  f.request(.5);f.pan(200,100);f.update();
  near(f.camera.zoom,.5*scale);assert.equal(f.view.blend,1);assert.equal(f.view.waitingForDetail,false);
  sameVector(f.view.renderTarget,f.view.controls.target);
  f.setReady(true);f.update(120);near(f.camera.zoom,.5*scale);near(f.view.navigation.zoom,.5*scale);
});

test('uncached detailed zoom-out retains the complete frame until the wider footprint is ready',t=>{
  const f=fixture(t);f.request(3);f.update();const target=f.view.renderTarget.clone();
  f.setReady(false);f.pan(400,200);f.update();f.request(2);f.update();
  near(f.camera.zoom,3*scale);near(f.view.navigation.zoom,2*scale);
  sameVector(f.view.renderTarget,target);assert.equal(f.view.blend,0);
  near(f.view.coverageCamera.zoom,2*scale);
  f.setReady(true);f.update(180);near(f.camera.zoom,2*scale);sameVector(f.view.renderTarget,f.view.controls.target);
});

test('navigation and region readiness are resolved before the same frame presents detail',t=>{
  const f=fixture(t,{ready:false});f.request(.34);f.update();assert.equal(f.view.wantsDetail,false);
  f.request(.36);f.view.updateNavigation(1/60);assert.equal(f.view.wantsDetail,true);
  near(f.view.coverageCamera.zoom,entry);f.view.updatePresentation(1/60);assert.equal(f.view.blend,1);
  f.request(1.2);f.pan(-200,300);f.view.updateNavigation(1/60);
  near(f.view.coverageCamera.zoom,entry);f.setReady(true);f.view.updatePresentation(1/60);
  near(f.camera.zoom,1.2*scale);assert.equal(f.view.blend,0);sameVector(f.view.renderTarget,f.view.controls.target);
});

test('proposed coverage exactly matches the next presented camera throughout resumed zoom and tilt',t=>{
  const f=fixture(t,{ready:false});f.request(.95);f.update();
  f.setReady(true);f.pan(300,-180);
  for(let frame=0;frame<80;frame++){
    const dt=1/60;
    f.view.updateNavigation(dt);
    const beforePosition=f.camera.position.clone(),beforeZoom=f.camera.zoom;
    const proposed=f.view.coverageCameras[1].clone();
    sameVector(f.camera.position,beforePosition);near(f.camera.zoom,beforeZoom);
    const target=surfacePoint(f.world,f.view.controls.target.x,f.view.controls.target.y,f.view.controls.target.z).project(proposed);
    near(target.x,0);near(target.y,0);
    f.view.updatePresentation(dt);
    near(f.camera.zoom,proposed.zoom);sameVector(f.camera.position,proposed.position);
    assert.ok(f.camera.quaternion.angleTo(proposed.quaternion)<1e-7,'coverage includes the precise next tilt');
    for(let i=0;i<16;i++)near(f.camera.projectionMatrix.elements[i],proposed.projectionMatrix.elements[i]);
  }
  near(f.camera.zoom,.95*scale);
});


test('a distant cold follow request traverses the full tilt interval over multiple frames',t=>{
  const f=fixture(t,{ready:false});f.request(8);f.update();f.setReady(true);
  let transitionFrames=0,previousZoom=f.camera.zoom;
  for(let frame=0;frame<240;frame++){
    f.view.updateNavigation(1/60);const proposed=f.view.coverageCameras[1].clone();f.view.updatePresentation(1/60);
    near(f.camera.zoom,proposed.zoom);
    assert.ok(f.camera.zoom/previousZoom<=Math.exp(1/60)+1e-8,'resumed zoom cannot jump over the tilt interval');
    if(f.view.blend>0&&f.view.blend<1)transitionFrames++;
    previousZoom=f.camera.zoom;
  }
  assert.ok(transitionFrames>=12,'the automatic tilt remains visible even for the largest follow jump');
  near(f.camera.zoom,8*scale);assert.equal(f.view.blend,0);
});
