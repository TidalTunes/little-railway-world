import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildMapWorld} from '../src/map-world.js';
import {createViewController} from '../src/view-controller.js';
import {surfacePoint,surfaceNormal} from '../src/world-surface.js';

const radius=1600;
const world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
  projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},
  bounds:{width:2*Math.PI*radius,depth:Math.PI*radius},cities:[],players:[],lines:[],mapTerrain:{meshes:[]}};
function heading(part){
  const {x,y,z}=part.position,h=.001,dx=Math.sin(part.rotation.y)*h,dz=Math.cos(part.rotation.y)*h;
  return surfacePoint(world,x+dx,y,z+dz).sub(surfacePoint(world,x-dx,y,z-dz)).normalize();
}
function setPose(part,latitude,angle){part.position.set(radius*.7,.42,-radius*latitude*Math.PI/180);part.rotation.y=angle;}

test('fixed-size map train glyphs follow the physical route heading at high northern and southern latitudes',()=>{
  const map=buildMapWorld(new THREE.Group(),world),part=new THREE.Group();part.userData.poseOnly=true;
  const train={state:{id:'polar-heading',active:true,color:'teal'},parts:[part]},matrix=new THREE.Matrix4();
  for(const latitude of [-80,-60,0,60,80])for(const angle of [Math.PI/4,-Math.PI/4,Math.PI/2,Math.PI]){
    setPose(part,latitude,angle);map.update([train]);
    const markers=map.root.getObjectByName('map-train-outlines');markers.getMatrixAt(0,matrix);
    const actual=new THREE.Vector3().setFromMatrixColumn(matrix,2),right=new THREE.Vector3().setFromMatrixColumn(matrix,0);
    assert.ok(actual.clone().normalize().dot(heading(part))>1-1e-10,`${latitude}° heading matches a numerical route derivative`);
    assert.ok(Math.abs(actual.length()-1)<1e-7&&Math.abs(right.length()-1)<1e-7,'symbol sizes stay constant despite longitude compression');
    assert.ok(new THREE.Vector3().setFromMatrixColumn(matrix,1).dot(surfaceNormal(world,part.position.x,part.position.z))>1-1e-7);
  }
  train.state.active=false;map.update([train]);map.root.getObjectByName('map-train-outlines').getMatrixAt(0,matrix);
  assert.equal(matrix.getMaxScaleOnAxis(),0);map.dispose();
});

class Canvas extends EventTarget{
  constructor(document){super();this.ownerDocument=document;this.style={};this.dataset={};this.clientWidth=1000;this.clientHeight=750;}
  getBoundingClientRect(){return{left:0,top:0,width:1000,height:750};}
  setPointerCapture(){} releasePointerCapture(){}
}

test('selection rings share the physical high-latitude heading without changing radial up',t=>{
  const previousWindow=globalThis.window;globalThis.window=new EventTarget();
  const canvas=new Canvas(new EventTarget()),scene=new THREE.Scene(),mapScene=new THREE.Scene(),root=new THREE.Group();scene.add(root);
  const camera=new THREE.OrthographicCamera(-1200,1200,900,-900,.1,18000);
  camera.position.set(0,1800,2600);camera.lookAt(0,1.3,0);camera.updateMatrixWorld(true);
  const part=new THREE.Group();setPose(part,60,Math.PI/4);
  const train={state:{id:'polar-heading',active:true},parts:[part]};
  const view=createViewController({canvas,camera,scene,mapScene,reducedMotion:{matches:true},getWorld:()=>world,
    getWorldRoot:()=>root,getTrains:()=>[train],isDetailReady:()=>true,onPause(){},onRegenerate(){}});
  t.after(()=>{
    view.controls.dispose();
    for(const marker of [...scene.children,...mapScene.children]){marker.geometry?.dispose();marker.material?.dispose();}
    if(previousWindow===undefined)delete globalThis.window;else globalThis.window=previousWindow;
  });
  view.setScale(8);
  const offset=view.navigation.position.clone().sub(view.controls.target);
  view.controls.target.copy(part.position);view.navigation.position.copy(part.position).add(offset);view.setHome();view.update(1/60);
  canvas.dispatchEvent(Object.assign(new Event('keydown',{cancelable:true}),{key:'f'}));view.update(1/60);
  assert.equal(view.selected,'polar-heading');
  const rings=[scene,mapScene].map(parent=>parent.children.find(object=>object.geometry?.type==='RingGeometry'));
  for(const latitude of [60,80,-60,-80])for(const angle of [Math.PI/4,-Math.PI/4,Math.PI*.6]){
    setPose(part,latitude,angle);view.update(1/60);
    for(const ring of rings){
      assert.equal(ring.visible,true);
      assert.ok(new THREE.Vector3(0,0,1).applyQuaternion(ring.quaternion).dot(heading(part))>1-1e-10);
      assert.ok(new THREE.Vector3(0,1,0).applyQuaternion(ring.quaternion).dot(surfaceNormal(world,part.position.x,part.position.z))>1-1e-10);
    }
  }
});
