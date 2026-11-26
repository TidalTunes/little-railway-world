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

test('detail blend remains a pure function of displayed zoom during every animation frame',t=>{
  const f=fixture(t);
  for(const zoom of [.6,.78,.89,1,1.5,.89]){
    f.request(zoom);
    for(let frame=0;frame<180;frame++){
      f.setReady(frame%3===0);f.update();
      near(f.view.blend,mapBlendForZoom(f.camera.zoom/scale));
      assert.equal(f.canvas.dataset.zoom,f.camera.zoom.toFixed(3));
    }
    near(f.camera.zoom,zoom*scale);
  }
});

test('cold and warm zoom trajectories are identical, without stopping at the detail boundary',t=>{
  const f=fixture(t,{ready:false});
  const run=()=>{
    f.view.reset();f.request(3.2);const frames=[];
    for(let frame=0;frame<240;frame++){
      f.update();frames.push({zoom:f.camera.zoom,blend:f.view.blend,position:f.camera.position.clone()});
    }
    return frames;
  };
  const cold=run();f.setReady(true);const warm=run();
  let crossing=-1;
  for(let i=0;i<cold.length;i++){
    near(cold[i].zoom,warm[i].zoom);near(cold[i].blend,warm[i].blend);sameVector(cold[i].position,warm[i].position);
    if(i&&cold[i-1].zoom<entry&&cold[i].zoom>=entry)crossing=i;
  }
  assert.ok(crossing>0);assert.ok(cold[crossing+1].zoom>cold[crossing].zoom,'the first detailed frame keeps moving');
  near(cold.at(-1).zoom,3.2*scale);assert.equal(f.view.waitingForDetail,false);
});

test('an uncached pan and zoom-out move immediately while coverage follows the local target',t=>{
  const f=fixture(t,{ready:false,reduced:true});f.request(3);f.update();
  const position=f.camera.position.clone();f.pan(400,-250);f.request(2);f.update();
  sameVector(f.view.renderTarget,f.view.controls.target);near(f.camera.zoom,2*scale);
  assert.ok(f.camera.position.distanceTo(position)>100);assert.equal(f.view.blend,0);
  near(f.view.coverageCamera.zoom,2*scale);
  const requested=surfacePoint(f.world,f.view.controls.target.x,f.view.controls.target.y,f.view.controls.target.z).project(f.view.coverageCamera);
  near(requested.x,0);near(requested.y,0);assert.equal(f.canvas.dataset.detailLoading,'true');
  const after=f.camera.position.clone();f.setReady(true);f.update();sameVector(f.camera.position,after);
});

test('reversing zoom replaces the pending destination immediately, even while terrain loads',t=>{
  const f=fixture(t,{ready:false});f.request(3);f.update(70);const previous=f.camera.zoom;
  f.request(.5);f.pan(200,100);f.update();
  assert.ok(f.camera.zoom<previous);sameVector(f.view.renderTarget,f.view.controls.target);
  f.setReady(true);f.update(180);near(f.camera.zoom,.5*scale);near(f.view.navigation.zoom,.5*scale);
});

test('prefetch is bounded in overview and scales down with the actual detailed camera',t=>{
  const f=fixture(t,{ready:false,reduced:true});f.request(.34);f.update();assert.equal(f.view.wantsDetail,false);
  f.request(.36);f.view.updateNavigation(1/60);assert.equal(f.view.wantsDetail,true);
  near(f.view.coverageCamera.zoom,entry);f.view.updatePresentation(1/60);assert.equal(f.view.blend,1);
  f.request(2);f.update();near(f.view.coverageCamera.zoom,2*scale);
  f.request(4);f.update();near(f.view.coverageCamera.zoom,4*scale);
});

test('proposed coverage exactly matches the next presented camera throughout zoom and tilt',t=>{
  const f=fixture(t,{ready:false});f.request(.78);f.update(240);f.request(.95);f.pan(300,-180);
  for(let frame=0;frame<120;frame++){
    const dt=1/60;f.view.updateNavigation(dt);
    const beforePosition=f.camera.position.clone(),beforeZoom=f.camera.zoom;
    const proposed=f.view.coverageCameras[1].clone();
    sameVector(f.camera.position,beforePosition);near(f.camera.zoom,beforeZoom);
    f.view.updatePresentation(dt);
    near(f.camera.zoom,proposed.zoom);sameVector(f.camera.position,proposed.position);
    assert.ok(f.camera.quaternion.angleTo(proposed.quaternion)<1e-7,'coverage includes the precise next tilt');
    for(let i=0;i<16;i++)near(f.camera.projectionMatrix.elements[i],proposed.projectionMatrix.elements[i]);
  }
  near(f.camera.zoom,.95*scale);
});

test('distant requests traverse the tilt interval smoothly even when all detail is cold',t=>{
  const f=fixture(t,{ready:false});f.request(8);
  let transitionFrames=0,previousZoom=f.camera.zoom;
  for(let frame=0;frame<300;frame++){
    f.update();
    assert.ok(f.camera.zoom/previousZoom<=Math.exp(1.8/60)+1e-8,'proportional zoom speed is bounded');
    if(f.view.blend>0&&f.view.blend<1)transitionFrames++;
    previousZoom=f.camera.zoom;
  }
  assert.ok(transitionFrames>=8,'a large request must not skip the full tilt interval');
  near(f.camera.zoom,8*scale);assert.equal(f.view.blend,0);
});

test('reduced motion skips camera animation without waiting for detail',t=>{
  const f=fixture(t,{ready:false,reduced:true});f.request(3.2);f.update();
  near(f.camera.zoom,3.2*scale);assert.equal(f.view.blend,0);
});
