import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createCharacterTransition} from '../src/character-transition.js';
import {surfacePoint,surfaceNormal,surfaceChartCoordinates,surfaceFrame} from '../src/world-surface.js';

function cameras(){
  const target=new THREE.Vector3(24,.65,-38);
  const overview=new THREE.OrthographicCamera(-120,120,80,-80,.1,1200);
  overview.position.copy(target).add(new THREE.Vector3(0,180,-180));overview.lookAt(target);overview.updateMatrixWorld(true);
  const walking=new THREE.PerspectiveCamera(54,1.5,.045,140);
  walking.position.copy(target).add(new THREE.Vector3(0,1.11,-3.42));walking.lookAt(target);walking.updateMatrixWorld(true);
  return{target,overview,walking};
}
function near(a,b,tolerance=1e-8){assert.ok(a.distanceTo(b)<tolerance,`${a.toArray()} differs from ${b.toArray()}`);}
function sameCamera(a,b){near(a.position,b.position);assert.ok(a.quaternion.angleTo(b.quaternion)<1e-7);assert.deepEqual(a.projectionMatrix.elements,b.projectionMatrix.elements);}
function start(transition,{overview,walking,target}){transition.begin({fromCamera:overview,toCamera:walking,fromTarget:target,toTarget:target,toWalking:true});}

test('character zoom has exact orthographic and perspective endpoints and a continuously centered anchor',()=>{
  const f=cameras(),transition=createCharacterTransition();start(transition,f);sameCamera(transition.camera,f.overview);
  let previousDistance=Infinity,previousHeight=0;
  for(let frame=0;frame<48;frame++){
    transition.update(1/60);
    const camera=transition.camera,anchor=f.target.clone().project(camera);
    assert.ok(Math.abs(anchor.x)<1e-9&&Math.abs(anchor.y)<1e-9,'the player stays pinned while lens and inclination change');
    const distance=camera.position.distanceTo(f.target);assert.ok(distance<=previousDistance+1e-8);previousDistance=distance;
    const height=Math.abs(f.target.clone().add(new THREE.Vector3(0,1,0)).project(camera).y-anchor.y);
    assert.ok(height>=previousHeight-1e-8,'objects grow continuously without the old final projection snap');previousHeight=height;
    assert.ok(camera.projectionMatrix.elements.every(Number.isFinite));
  }
  assert.equal(transition.active,false);assert.equal(transition.walkingWeight,1);sameCamera(transition.camera,f.walking);
  transition.begin({fromCamera:f.walking,toCamera:f.overview,fromTarget:f.target,toTarget:f.target,toWalking:false});
  transition.update(1);sameCamera(transition.camera,f.overview);assert.equal(transition.camera.isOrthographicCamera,true);
});

test('projection interpolation keeps near and far clip planes well-defined throughout the dolly',()=>{
  const f=cameras(),transition=createCharacterTransition();start(transition,f);
  for(let i=0;i<15;i++){
    transition.update(.05);const camera=transition.camera,forward=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
    const nearPoint=camera.position.clone().addScaledVector(forward,camera.near).project(camera);
    const farPoint=camera.position.clone().addScaledVector(forward,camera.far).project(camera);
    assert.ok(Math.abs(nearPoint.z+1)<1e-6);assert.ok(Math.abs(farPoint.z-1)<1e-8);
    assert.ok(camera.projectionMatrix.determinant()!==0,'rays can unproject throughout the lens change');
  }
});

test('reversing a character zoom preserves the current pose, projection and focus before easing back',()=>{
  const f=cameras(),transition=createCharacterTransition();start(transition,f);transition.update(.36);
  const before=transition.camera.clone(),target=transition.target.clone(),weight=transition.walkingWeight;
  const projected=f.target.clone().add(new THREE.Vector3(3,2,4)).project(transition.camera);
  transition.begin({fromCamera:transition.camera,toCamera:f.overview,fromTarget:transition.target,toTarget:f.target,toWalking:false});
  sameCamera(transition.camera,before);near(transition.target,target);assert.equal(transition.walkingWeight,weight);
  near(f.target.clone().add(new THREE.Vector3(3,2,4)).project(transition.camera),projected);
  transition.update(1/60);assert.ok(transition.walkingWeight<weight);
  transition.update(1);sameCamera(transition.camera,f.overview);assert.equal(transition.walkingWeight,0);
});

test('an overview away from the character pans and zooms from its exact current pose without snapping',()=>{
  const f=cameras(),transition=createCharacterTransition(),startTarget=f.target.clone().add(new THREE.Vector3(60,1,24));
  f.overview.position.add(new THREE.Vector3(60,1,24));f.overview.lookAt(startTarget);f.overview.updateMatrixWorld(true);
  transition.begin({fromCamera:f.overview,toCamera:f.walking,fromTarget:startTarget,toTarget:f.target,toWalking:true});
  sameCamera(transition.camera,f.overview);near(transition.target,startTarget);
  transition.update(.39);assert.ok(transition.target.distanceTo(startTarget)>1);assert.ok(transition.target.distanceTo(f.target)>1);
  transition.finish();sameCamera(transition.camera,f.walking);near(transition.target,f.target);
});

test('reduced motion uses the same endpoints immediately, including when enabled midway',()=>{
  const f=cameras(),reducedMotion={matches:true},transition=createCharacterTransition({reducedMotion});start(transition,f);
  assert.equal(transition.active,false);sameCamera(transition.camera,f.walking);
  reducedMotion.matches=false;transition.begin({fromCamera:f.walking,toCamera:f.overview,fromTarget:f.target,toTarget:f.target,toWalking:false});
  transition.update(.1);assert.equal(transition.active,true);reducedMotion.matches=true;transition.update(.001);
  assert.equal(transition.active,false);sameCamera(transition.camera,f.overview);
});

test('a Europe-to-Tokyo globe zoom follows the curved surface and never looks through its interior',()=>{
  const radius=2100,world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  const europe=surfaceChartCoordinates(world,10,50),tokyo=surfaceChartCoordinates(world,139.7,35.7);
  const fromTarget=surfacePoint(world,europe.x,1.3,europe.z),toTarget=surfacePoint(world,tokyo.x,.685,tokyo.z);
  const sphere={center:new THREE.Vector3(0,-radius,0),radius};
  function pose(camera,chart,target,distance,pitch){
    const frame=surfaceFrame(world,chart.x,chart.z,new THREE.Matrix4());
    const normal=surfaceNormal(world,chart.x,chart.z),south=new THREE.Vector3(0,0,1).transformDirection(frame);
    camera.position.copy(target).addScaledVector(normal,Math.sin(pitch)*distance).addScaledVector(south,-Math.cos(pitch)*distance);
    camera.up.copy(normal);camera.lookAt(target);camera.updateMatrixWorld(true);return camera;
  }
  const overview=pose(new THREE.OrthographicCamera(-2400,2400,1600,-1600,.1,17000),europe,fromTarget,radius*3,Math.PI*.499);
  const walking=pose(new THREE.PerspectiveCamera(54,1.5,.045,140),tokyo,toTarget,3.6,Math.PI/10);
  const transition=createCharacterTransition();
  transition.begin({fromCamera:overview,toCamera:walking,fromTarget,toTarget,toWalking:true,sphere});sameCamera(transition.camera,overview);
  function outside(){
    const center=sphere.center,target=transition.target,normal=target.clone().sub(center).normalize(),offset=transition.camera.position.clone().sub(target);
    assert.ok(transition.camera.position.distanceTo(center)>radius,'camera never enters the Earth');
    assert.ok(offset.dot(normal)>.02,'the line of sight remains outside the focus tangent plane');
    for(const amount of [.25,.5,.75])assert.ok(target.clone().addScaledVector(offset,amount).distanceTo(center)>radius,'the sightline never passes through a different hemisphere');
    const anchor=target.clone().project(transition.camera);assert.ok(Math.abs(anchor.x)+Math.abs(anchor.y)<1e-8,'curved transport retains the centered target');
  }
  for(let i=0;i<22;i++){
    transition.update(1/60);outside();
    const t=transition.progress,eased=t*t*t*(t*(t*6-15)+10),expected=radius+1.3+(.685-1.3)*eased;
    assert.ok(Math.abs(transition.target.distanceTo(sphere.center)-expected)<1e-8,'focus elevation is preserved along the geodesic');
  }
  const before=transition.camera.clone(),target=transition.target.clone();
  transition.begin({fromCamera:transition.camera,toCamera:overview,fromTarget:transition.target,toTarget:fromTarget,toWalking:false,sphere});
  sameCamera(transition.camera,before);near(transition.target,target);
  while(transition.active){transition.update(1/60);outside();}
  sameCamera(transition.camera,overview);near(transition.target,fromTarget);
  transition.begin({fromCamera:overview,toCamera:walking,fromTarget,toTarget,toWalking:true,sphere});
  while(transition.active){transition.update(1/60);outside();}
  sameCamera(transition.camera,walking);near(transition.target,toTarget);
});

test('antipodal globe endpoints choose a deterministic great circle without a singular midpoint',()=>{
  const sphere={center:new THREE.Vector3(0,-100,0),radius:100},fromTarget=new THREE.Vector3(0,1,0),toTarget=new THREE.Vector3(0,-201,0);
  const overview=new THREE.OrthographicCamera(-150,150,100,-100,.1,1000);overview.position.set(0,300,-100);overview.lookAt(fromTarget);overview.updateMatrixWorld(true);
  const walking=new THREE.PerspectiveCamera(54,1.5,.045,140);walking.position.set(0,-202.2,-3.4);walking.up.set(0,-1,0);walking.lookAt(toTarget);walking.updateMatrixWorld(true);
  const first=createCharacterTransition(),second=createCharacterTransition();
  for(const transition of [first,second])transition.begin({fromCamera:overview,toCamera:walking,fromTarget,toTarget,toWalking:true,sphere});
  for(let i=0;i<48;i++){
    first.update(1/60);second.update(1/60);near(first.target,second.target);near(first.camera.position,second.camera.position);
    assert.ok(first.camera.position.toArray().every(Number.isFinite));
    assert.ok(first.camera.position.distanceTo(sphere.center)>sphere.radius);
    assert.ok(Math.abs(first.target.distanceTo(sphere.center)-101)<1e-9);
  }
  sameCamera(first.camera,walking);near(first.target,toTarget);
});
