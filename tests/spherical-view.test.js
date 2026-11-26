import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import geography from '../data/europe-geography.json' with {type:'json'};
import {createViewController} from '../src/view-controller.js';
import {EARTH_SURFACE_RADIUS,surfacePoint,surfaceNormal,surfaceFrame} from '../src/world-surface.js';
import {makeTrains} from '../src/railway.js';
import {createWorldRenderer} from '../src/world-renderer.js';

function input(type,properties={}){
  return Object.assign(new Event(type,{cancelable:true}),{button:0,buttons:0,pointerId:1,pointerType:'mouse',
    clientX:500,clientY:375,pageX:500,pageY:375,altKey:false,ctrlKey:false,metaKey:false,shiftKey:false},properties);
}
class Canvas extends EventTarget{
  constructor(document){super();this.ownerDocument=document;this.style={};this.dataset={};this.clientWidth=1000;this.clientHeight=750;}
  getBoundingClientRect(){return{left:0,top:0,width:1000,height:750};}
  setPointerCapture(){} releasePointerCapture(){}
}
function fixture(t,{ready=true,reduced=true}={}){
  const previousWindow=globalThis.window,window=new EventTarget(),document=new EventTarget();globalThis.window=window;
  const canvas=new Canvas(document),scene=new THREE.Scene(),mapScene=new THREE.Scene(),root=new THREE.Group();scene.add(root);
  let world={surface:{type:'sphere',radius:EARTH_SURFACE_RADIUS,origin:{longitude:10,latitude:52},projection:geography.projection},
    outline:[[-1200,-1000],[1200,-1000],[1200,1000],[-1200,1000]]};
  const camera=new THREE.OrthographicCamera(-1200,1200,900,-900,.1,18000);
  camera.position.set(0,1800,2600);camera.lookAt(0,1.3,0);camera.updateMatrixWorld(true);
  const geometry=new THREE.BoxGeometry(1.2,1.5,2.4),material=new THREE.MeshBasicMaterial();
  const parts=[-1,0,1].map(index=>{
    const part=new THREE.Group();part.position.set(720,.42,-320+index*2.64);part.rotation.y=.45;
    const rendered=new THREE.Group(),body=new THREE.Mesh(geometry,material);body.position.y=.75;rendered.add(body);
    rendered.userData.trainId='globe-train';root.add(rendered);part.userData.rendered=rendered;return part;
  });
  const train={state:{id:'globe-train',active:true},parts};
  function syncTrains(){
    for(const part of parts){
      const rendered=part.userData.rendered;
      surfacePoint(world,part.position.x,part.position.y,part.position.z,rendered.position);
      rendered.quaternion.setFromRotationMatrix(surfaceFrame(world,part.position.x,part.position.z))
        .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),part.rotation.y));
    }
    root.updateMatrixWorld(true);
  }
  const view=createViewController({canvas,camera,scene,mapScene,reducedMotion:{matches:reduced},getWorld:()=>world,
    getWorldRoot:()=>root,getTrains:()=>[train],isDetailReady:()=>ready,onPause(){},onRegenerate(){}});
  view.setScale(8);view.setHome();
  const update=()=>{syncTrains();view.update(1/60);};update();
  const key=value=>canvas.dispatchEvent(input('keydown',{key:value}));
  function tap(part=parts[1]){
    const p=surfacePoint(world,part.position.x,view.blend>.7?.123*16:part.position.y+.8,part.position.z).project(camera);
    const x=(p.x+1)*500,y=(1-p.y)*375;
    canvas.dispatchEvent(input('pointerdown',{clientX:x,clientY:y,pageX:x,pageY:y}));
    window.dispatchEvent(input('pointerup',{clientX:x,clientY:y,pageX:x,pageY:y}));
  }
  t.after(()=>{
    view.controls.dispose();geometry.dispose();material.dispose();
    for(const marker of [...scene.children,...mapScene.children]){marker.geometry?.dispose();marker.material?.dispose();}
    if(previousWindow===undefined)delete globalThis.window;else globalThis.window=previousWindow;
  });
  return{world,view,canvas,camera,scene,mapScene,root,parts,train,update,key,tap,
    setReady(value){ready=value;},setWorld(value){world=value;}};
}
const near=(a,b,tolerance=1e-7)=>assert.ok(a.distanceTo(b)<tolerance,`${a.toArray()} differs from ${b.toArray()}`);
const localViewAngle=(camera,normal)=>Math.acos(THREE.MathUtils.clamp(camera.getWorldDirection(new THREE.Vector3()).negate().dot(normal),-1,1));

test('globe overview stays curved and its displayed camera looks at the surface in a local tangent frame',t=>{
  const f=fixture(t),{view,camera,world}=f;
  const movement=new THREE.Vector3(620,0,-400);view.controls.target.add(movement);view.navigation.position.add(movement);f.update();
  assert.equal(view.mode,'map');assert.equal(view.blend,1);near(f.root.scale,new THREE.Vector3(1,1,1));
  const target=surfacePoint(world,view.controls.target.x,view.controls.target.y,view.controls.target.z);
  const projected=target.clone().project(camera);assert.ok(Math.hypot(projected.x,projected.y)<1e-10);
  const normal=surfaceNormal(world,view.controls.target.x,view.controls.target.z);
  near(camera.up,normal);assert.ok(Math.abs(localViewAngle(camera,normal)-.48)<1e-8);
  assert.ok(camera.position.distanceTo(view.chartCamera.position)>300,'chart and sphere cameras must remain distinct away from the tangent origin');
  near(view.chartCamera.position.clone().sub(view.controls.target),new THREE.Vector3().subVectors(camera.position,target)
    .applyMatrix4(surfaceFrame(world,view.controls.target.x,view.controls.target.z).invert()));
});

test('map taps and close picking use bent train positions while follow and navigation remain in the chart',t=>{
  const f=fixture(t),orbit=new THREE.Spherical().setFromVector3(f.view.navigation.position.clone().sub(f.view.controls.target));
  f.tap();assert.equal(f.view.selected,'globe-train');f.update();
  assert.equal(f.view.mode,'close');near(f.view.controls.target,new THREE.Vector3(720,.75,-320));
  const normal=surfaceNormal(f.world,720,-320);
  assert.ok(Math.abs(localViewAngle(f.camera,normal)-orbit.phi)<1e-8,'following preserves the chosen local view angle');
  for(const marker of [f.scene.children.find(object=>object.geometry?.type==='RingGeometry'),f.mapScene.children[0]]){
    assert.equal(marker.visible,true);
    near(new THREE.Vector3(0,1,0).applyQuaternion(marker.quaternion),normal);
    near(marker.position,surfacePoint(f.world,720,marker.parent===f.scene?.045:1.6,-320));
  }
  f.key('Escape');f.update();f.tap();assert.equal(f.view.selected,'globe-train','rendered mesh occlusion checks must use the sphere ray');
  for(const part of f.parts){part.position.x+=8;part.position.z-=5;}f.update();
  near(f.view.controls.target,new THREE.Vector3(728,.75,-325));
  f.key('Home');f.update();assert.equal(f.view.selected,null);assert.equal(f.view.mode,'map');near(f.root.scale,new THREE.Vector3(1,1,1));
});

test('destination coverage camera is ready before detail visibility and never changes the displayed camera',t=>{
  const f=fixture(t,{ready:false}),{view}=f;
  const movement=new THREE.Vector3(-450,0,300);view.controls.target.add(movement);view.navigation.position.add(movement);
  view.navigation.zoom=8;view.navigation.updateProjectionMatrix();f.update();
  assert.equal(view.mode,'world');assert.equal(view.blend,1);
  const position=f.camera.position.clone(),quaternion=f.camera.quaternion.clone();
  const coverage=view.coverageCamera,normal=surfaceNormal(f.world,-450,300);
  assert.ok(localViewAngle(coverage,normal)>.8,'world detail is requested at the destination orbit, not the temporary map angle');
  const target=surfacePoint(f.world,-450,view.controls.target.y,300).project(coverage);
  assert.ok(Math.hypot(target.x,target.y)<1e-10);near(f.camera.position,position);assert.ok(f.camera.quaternion.angleTo(quaternion)<1e-8);
  const localAngle=localViewAngle(coverage,normal);
  view.navigation.zoom=32;view.navigation.updateProjectionMatrix();
  assert.ok(Math.abs(localViewAngle(view.coverageCamera,normal)-localAngle)<1e-8,'coverage retains the same orbit at close zoom');
  assert.equal(view.coverageCamera.zoom,32,'coverage zoom updates before the next animation frame');
});

test('chart panning and bounds remain finite far from the sphere origin, and replacement planar worlds regain flattening',t=>{
  const f=fixture(t),{view}=f;f.tap();f.update();f.key('Escape');f.update();
  const previous=view.controls.target.clone();f.key('ArrowUp');f.update();
  assert.ok(view.controls.target.z<previous.z);assert.ok(Math.abs(view.controls.target.x-previous.x)<1e-7);
  assert.equal(view.controls.target.y,previous.y,'keyboard pan cannot accumulate spherical elevation');
  const offset=view.navigation.position.clone().sub(view.controls.target);
  view.controls.target.set(1e6,.75,-1e6);view.navigation.position.copy(view.controls.target).add(offset);f.update();
  near(view.controls.target,new THREE.Vector3(1300,.75,-1100));
  near(view.navigation.position.clone().sub(view.controls.target),offset);
  assert.ok(f.camera.position.toArray().every(Number.isFinite));
  f.setWorld({outline:f.world.outline});view.reset();f.update();
  assert.equal(view.mode,'map');assert.equal(f.root.scale.y,.015000000000000013);
  near(f.camera.position,view.chartCamera.position);near(f.camera.up,new THREE.Vector3(0,1,0));
});

test('real train instances are culled and picked in sphere coordinates at a distant chart location',t=>{
  const f=fixture(t),poseBuffer=new Float32Array(3*6);
  for(let i=0;i<3;i++)poseBuffer.set([720,.42,-320+(i-1)*2.64,.45,1,0],i*6);
  const state={id:'globe-train',color:'coral',count:3,spacing:2.64,active:true,poseOffset:0};
  const rail=makeTrains(f.root,f.world,{traffic:{trains:[state],poseBuffer,update(){}}});
  t.after(()=>rail.dispose());
  f.parts.forEach(part=>part.userData.rendered.removeFromParent());
  f.train.parts=rail.trains[0].parts;f.train.state=state;
  f.tap();f.update();rail.updateView(f.camera);f.root.updateMatrixWorld(true);
  assert.equal(rail.stats.visibleCars,3);assert.equal(rail.stats.visibleTrains,1);
  assert.ok(rail.root.children.every(mesh=>mesh.userData.instanceTrainIds.every(id=>id===state.id)));
  f.key('Escape');f.update();f.tap(rail.trains[0].parts[1]);
  assert.equal(f.view.selected,state.id,'instanced raycast IDs must be resolved using the physically bent car matrices');
  f.key('Escape');
  const delta=new THREE.Vector3(-1000,0,0);f.view.controls.target.add(delta);f.view.navigation.position.add(delta);f.update();
  rail.updateView(f.camera);assert.equal(rail.stats.visibleCars,0,'remote chart coordinates must not bypass physical frustum culling');
});

test('spherical coverage requests the destination chart cells before the displayed map transitions',async t=>{
  const f=fixture(t,{ready:false}),{view}=f;
  Object.assign(f.world,{cities:[],mountains:[],stations:[]});
  const movement=new THREE.Vector3(720,0,-320);view.controls.target.add(movement);view.navigation.position.add(movement);
  view.navigation.zoom=32;view.navigation.updateProjectionMatrix();f.update();
  const requests=[];
  const renderer=createWorldRenderer(f.root,f.world,{size:96,maxPending:2,requestChunk:request=>{
    requests.push(request);return{bounds:{minX:request.x-48,maxX:request.x+48,minZ:request.z-48,maxZ:request.z+48},meshes:[]};
  }});
  t.after(()=>renderer.dispose());
  assert.equal(view.blend,1);
  renderer.update(f.camera,{target:view.controls.target,coverageCamera:view.coverageCamera,mapBlend:0});
  await new Promise(resolve=>setImmediate(resolve));
  assert.ok(requests.length>0&&requests.length<=2);
  assert.ok(requests.some(request=>Math.abs(request.x-720)<=48&&Math.abs(request.z+320)<=48),
    'the nearest requested cell owns the chart-space destination, not its bent world x/z');
  assert.ok(renderer.stats.requiredChunks<=4,'close detail must stay local on the sphere');
  assert.equal(renderer.stats.coverageLimited,false);
});
