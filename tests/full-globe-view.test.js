import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createViewController} from '../src/view-controller.js';
import {surfacePoint,surfaceNormal,surfaceTangent,surfaceFrame} from '../src/world-surface.js';

const radius=1600,radians=Math.PI/180,period=2*Math.PI*radius;
const wrap=value=>THREE.MathUtils.euclideanModulo(value+period/2,period)-period/2;
function event(type,properties={}){
  return Object.assign(new Event(type,{cancelable:true}),{button:0,buttons:0,pointerId:1,pointerType:'mouse',
    clientX:500,clientY:375,pageX:500,pageY:375,altKey:false,ctrlKey:false,metaKey:false,shiftKey:false},properties);
}
class Canvas extends EventTarget{
  constructor(document){super();this.ownerDocument=document;this.style={};this.dataset={};this.clientWidth=1000;this.clientHeight=750;}
  getBoundingClientRect(){return{left:0,top:0,width:1000,height:750};}
  setPointerCapture(){} releasePointerCapture(){}
}
function fixture(t,{reduced=true}={}){
  const previousWindow=globalThis.window,window=new EventTarget(),document=new EventTarget();globalThis.window=window;
  const canvas=new Canvas(document),scene=new THREE.Scene(),mapScene=new THREE.Scene(),root=new THREE.Group();scene.add(root);
  const world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},
    outline:[[-period/2,-period/4],[period/2,-period/4],[period/2,period/4],[-period/2,period/4]]};
  const camera=new THREE.OrthographicCamera(-2200,2200,1650,-1650,.1,18000);
  camera.position.set(0,3600,4800);camera.lookAt(0,1.3,0);camera.updateMatrixWorld(true);
  const makeTrain=(id,x,z)=>({state:{id,active:true},parts:[-1,0,1].map(car=>{
    const part=new THREE.Object3D();part.position.set(x,.42,z+car*2.64);return part;
  })});
  const home=new THREE.Vector3(radius*10*radians,1.3,-radius*25*radians);
  const train=makeTrain('front',home.x,home.z),back=makeTrain('back',wrap(home.x+period/2),-home.z),trains=[train,back];
  const view=createViewController({canvas,camera,scene,mapScene,reducedMotion:{matches:reduced},getWorld:()=>world,
    getWorldRoot:()=>root,getTrains:()=>trains,onPause(){},onRegenerate(){}});
  view.setScale(12);view.controls.target.copy(home);
  view.navigation.position.copy(home).add(new THREE.Vector3().setFromSphericalCoords(6000,Math.PI/4,0));
  view.controls.update();view.setHome();view.update(1/60);
  function key(value,type='keydown',properties={}){const item=event(type,{key:value,...properties});canvas.dispatchEvent(item);return item;}
  function update(count=1,dt=1/60){for(let i=0;i<count;i++)view.update(dt);}
  function pointer(type,x,y,properties={}){
    const item=event(type,{clientX:x,clientY:y,pageX:x,pageY:y,buttons:type==='pointermove'?1:0,...properties});
    canvas.dispatchEvent(item);
    if(type==='pointermove'||type==='pointerup')document.dispatchEvent(item);
    if(type==='pointerup')window.dispatchEvent(item);
  }
  function tap(part){
    const p=surfacePoint(world,part.position.x,.123*16,part.position.z).project(camera);
    const x=(p.x+1)*500,y=(1-p.y)*375;pointer('pointerdown',x,y);pointer('pointerup',x,y);
  }
  t.after(()=>{
    view.controls.dispose();
    for(const marker of [...scene.children,...mapScene.children]){marker.geometry?.dispose();marker.material?.dispose();}
    if(previousWindow===undefined)delete globalThis.window;else globalThis.window=previousWindow;
  });
  return{world,view,camera,canvas,window,document,root,home,train,back,key,update,pointer,tap};
}
const near=(actual,expected,tolerance=1e-7)=>assert.ok(actual.distanceTo(expected)<tolerance,`${actual.toArray()} differs from ${expected.toArray()}`);

test('complete overview centers the whole sphere on the authored home location and supports continuous longitude',t=>{
  const f=fixture(t),{view}=f;
  assert.equal(view.mode,'map');near(view.controls.target,f.home);near(f.root.scale,new THREE.Vector3(1,1,1));
  const center=new THREE.Vector3(0,-radius,0).project(f.camera);
  assert.ok(Math.hypot(center.x,center.y)<.00002,'radial overview keeps the globe center in the screen center');
  const normal=surfaceNormal(f.world,f.home.x,f.home.z),direction=f.camera.getWorldDirection(new THREE.Vector3()).negate();
  assert.ok(normal.dot(direction)>.99999999);
  assert.ok(new THREE.Vector3(1,0,0).applyQuaternion(view.chartCamera.quaternion).dot(new THREE.Vector3(1,0,0))>.99999999,
    'overview shares the north-up heading of the local view');
  const before=view.controls.target.clone();assert.equal(f.key('d').defaultPrevented,true);f.key('d','keyup');
  near(view.controls.target,before);
  f.update();near(view.controls.target,before);
  f.key('Home');f.key('d');
  let previous=view.controls.target.x,travel=0;
  for(let i=0;i<600;i++){f.update();travel+=wrap(view.controls.target.x-previous);previous=view.controls.target.x;}
  f.key('d','keyup');assert.ok(travel>period,'held rotation crosses an entire 360° longitude range');
  assert.ok(view.controls.target.x>=-period/2&&view.controls.target.x<period/2);
  assert.ok(f.camera.position.toArray().every(Number.isFinite));
  f.key('Home');f.update();near(view.controls.target,f.home);
});

test('held WASD is independent of frame rate and OS repeat, and stops after focus or visibility loss',t=>{
  const f=fixture(t),{view}=f;
  f.key('d');f.update(120,1/60);f.key('d','keyup');const sixty=view.controls.target.clone();
  f.key('Home');f.key('d');f.update(60,1/30);f.key('d','keyup');near(view.controls.target,sixty,1e-6);
  f.key('Home');f.key('d');const pulse=view.controls.target.clone();
  f.key('d','keydown',{repeat:true});near(view.controls.target,pulse);
  f.window.dispatchEvent(new Event('blur'));f.update(60);near(view.controls.target,pulse);
  f.key('w');const beforeCanvasBlur=view.controls.target.clone();f.canvas.dispatchEvent(new Event('blur'));f.update(60);near(view.controls.target,beforeCanvasBlur);
  f.key('a');const beforeHidden=view.controls.target.clone();f.document.hidden=true;f.document.dispatchEvent(new Event('visibilitychange'));f.update(60);near(view.controls.target,beforeHidden);
  f.document.hidden=false;f.key('s');const beforeOutsideRelease=view.controls.target.clone();f.window.dispatchEvent(event('keyup',{key:'s'}));f.update(60);near(view.controls.target,beforeOutsideRelease);
});

test('globe drag rotates, held latitude stops safely at the poles, and local WASD releases follow',t=>{
  const f=fixture(t),{view}=f;const before=view.controls.target.clone();
  f.pointer('pointerdown',400,350);f.pointer('pointermove',560,440);f.pointer('pointerup',560,440);f.update(120);
  assert.ok(Math.abs(view.controls.target.x-before.x)>20&&Math.abs(view.controls.target.z-before.z)>20);
  f.key('w');f.update(600);f.key('w','keyup');assert.ok(Math.abs(view.controls.target.z+radius*85*radians)<1e-6);
  f.key('s');f.update(900);f.key('s','keyup');assert.ok(Math.abs(view.controls.target.z-radius*85*radians)<1e-6);
  assert.ok(f.camera.position.toArray().every(Number.isFinite));
  f.key('Home');f.update();f.tap(f.train.parts[1]);f.update();assert.equal(view.selected,'front');assert.equal(view.mode,'close');
  const follow=view.controls.target.clone(),right=new THREE.Vector3(1,0,0).applyQuaternion(view.chartCamera.quaternion);right.y=0;right.normalize();
  right.applyMatrix4(surfaceFrame(f.world,follow.x,follow.z));
  const offset=view.navigation.position.clone().sub(follow);f.key('a');f.update();f.key('a','keyup');
  const movement=view.controls.target.clone().sub(follow);
  const physical=surfaceTangent(f.world,follow.x,follow.y,follow.z,movement.x,0,movement.z).normalize();
  assert.equal(view.selected,null);assert.ok(physical.dot(right)<-.99999999);
  near(view.navigation.position.clone().sub(view.controls.target),offset);
});

test('WASD pans the core and close views in screen directions while preserving the orbit',t=>{
  const f=fixture(t),{view}=f;view.navigation.zoom=12;view.navigation.updateProjectionMatrix();f.update();
  for(const zoom of [12,40,80]){
    view.navigation.zoom=zoom;view.navigation.updateProjectionMatrix();f.update();
    for(const [key,axis,sign] of [['d','right',1],['a','right',-1],['w','up',1],['s','up',-1]]){
      const target=view.controls.target.clone(),offset=view.navigation.position.clone().sub(target);
      const screenAxis=new THREE.Vector3(axis==='right'?1:0,axis==='up'?1:0,0).applyQuaternion(view.chartCamera.quaternion);
      screenAxis.y=0;screenAxis.normalize();
      screenAxis.applyMatrix4(surfaceFrame(f.world,target.x,target.z));
      f.key(key);f.update();f.key(key,'keyup');
      const movement=view.controls.target.clone().sub(target);
      const physical=surfaceTangent(f.world,target.x,target.y,target.z,movement.x,0,movement.z).normalize();
      assert.ok(physical.dot(screenAxis)*sign>.99999999);
      near(view.navigation.position.clone().sub(view.controls.target),offset);
    }
  }
});

test('high-latitude isometric WASD motion projects along the visible screen axes',t=>{
  const f=fixture(t),{view}=f;
  view.navigation.zoom=40;view.navigation.updateProjectionMatrix();
  for(const latitude of [-60,60,84])for(const [key,axis,sign] of [['d','x',1],['a','x',-1],['w','y',1],['s','y',-1]]){
    const start=new THREE.Vector3(radius*.4,1.3,-radius*latitude*radians);
    view.controls.target.copy(start);
    view.navigation.position.copy(start).add(new THREE.Vector3().setFromSphericalCoords(6000,Math.PI/3,Math.PI/4));
    f.update();
    const camera=f.camera.clone(),before=surfacePoint(f.world,start.x,start.y,start.z).project(camera);
    f.key(key);f.update();f.key(key,'keyup');
    const delta=view.controls.target.clone().sub(start);
    // A finite physical step crosses latitudes with different chart metrics.
    // Measure its tangent at the midpoint, then bring that vector back to the
    // original frame; this excludes genuine globe curvature from screen skew.
    const midpoint=start.clone().addScaledVector(delta,.5);
    const tangent=surfaceTangent(f.world,midpoint.x,midpoint.y,midpoint.z,delta.x,0,delta.z)
      .applyMatrix4(surfaceFrame(f.world,midpoint.x,midpoint.z).invert())
      .applyMatrix4(surfaceFrame(f.world,start.x,start.z));
    const ground=surfacePoint(f.world,start.x,start.y,start.z),h=1e-4;
    const after=ground.clone().addScaledVector(tangent,h).project(camera);
    const opposite=ground.clone().addScaledVector(tangent,-h).project(camera);
    const screen=after.sub(opposite);
    assert.ok(screen[axis]*sign>0,`${key} at ${latitude}° moves in the requested screen direction`);
    assert.ok(Math.abs(screen[axis==='x'?'y':'x'])<Math.abs(screen[axis])*1e-5,
      `${key} at ${latitude}° has no skew from longitude compression`);
    assert.ok(Math.abs(before.x)+Math.abs(before.y)<1e-10);
  }
});

test('zoom tilts toward the far edge without changing heading and retains the local ground angle',t=>{
  const f=fixture(t),{view}=f;
  const angle=()=>new THREE.Spherical().setFromVector3(view.chartCamera.position.clone().sub(view.controls.target));
  const check=(phi,theta)=>{
    const actual=angle();assert.ok(Math.abs(actual.phi-phi)<1e-10);assert.ok(Math.abs(actual.theta-theta)<1e-10);
  };
  for(const zoom of [1,3,6,7.2,8.4,10,12]){
    view.navigation.zoom=zoom;view.navigation.updateProjectionMatrix();f.update();
    const screenRight=new THREE.Vector3(1,0,0).applyQuaternion(view.chartCamera.quaternion);
    near(screenRight,new THREE.Vector3(1,0,0));
    assert.ok(angle().phi<=Math.PI/4+1e-10,'zoom only tilts away from the existing screen heading');
  }
  for(const zoom of [12,24,40,80]){
    view.navigation.zoom=zoom;view.navigation.updateProjectionMatrix();f.update();check(Math.PI/4,0);
  }
  // Drag changes heading in the core view. Zoom and follow preserve it while
  // the inclination remains the same fixed 45 degrees above the surface.
  view.navigation.zoom=12;view.navigation.updateProjectionMatrix();f.update();
  f.pointer('pointerdown',400,350);f.pointer('pointermove',480,390);f.pointer('pointerup',480,390);f.update(360);
  const chosen=angle();assert.ok(Math.abs(chosen.theta)>.01);assert.ok(Math.abs(chosen.phi-Math.PI/4)<1e-10);
  for(const zoom of [24,40,80]){
    view.navigation.zoom=zoom;view.navigation.updateProjectionMatrix();f.update();check(chosen.phi,chosen.theta);
  }
  f.key(']');f.update();assert.equal(view.selected,'front');check(chosen.phi,chosen.theta);
  f.key('Escape');
  for(const zoom of [8,6,3,1]){
    view.navigation.zoom=zoom;view.navigation.updateProjectionMatrix();f.update();
    assert.ok(Math.abs(angle().theta-chosen.theta)<1e-10,'overview retains the deliberately chosen heading');
  }
});

test('local camera keeps the same angle to the ground across both hemispheres',t=>{
  const f=fixture(t),{view}=f;
  view.navigation.zoom=40;view.navigation.updateProjectionMatrix();
  for(const [longitude,latitude] of [[0,0],[100,70],[-120,-60],[179,30]]){
    const target=new THREE.Vector3(radius*longitude*radians,1.3,-radius*latitude*radians);
    view.controls.target.copy(target);
    view.navigation.position.copy(target).add(new THREE.Vector3().setFromSphericalCoords(6000,Math.PI/4,0));
    f.update();
    const ground=surfacePoint(f.world,target.x,target.y,target.z);
    const direction=f.camera.position.clone().sub(ground).normalize();
    const normal=surfaceNormal(f.world,target.x,target.z);
    assert.ok(Math.abs(direction.angleTo(normal)-Math.PI/4)<1e-10,'local elevation is independent of latitude and longitude');
    const north=surfacePoint(f.world,target.x,target.y,target.z-.01).project(f.camera);
    const center=ground.project(f.camera);
    assert.ok(north.y>center.y,'the northern far edge of the ground stays toward the top of the view');
    assert.ok(Math.abs(north.x-center.x)<1e-10,'north never rotates sideways during local zoom');
  }
});

test('strong vertical and diagonal drags retain a fixed local inclination and one ground pivot',t=>{
  const f=fixture(t),{view}=f;
  for(const [longitude,latitude] of [[0,0],[120,75],[-170,-70]])for(const zoom of [12,40,80]){
    f.key('Home');
    const focus=new THREE.Vector3(radius*longitude*radians,1.3,-radius*latitude*radians);
    view.controls.target.copy(focus);
    view.navigation.position.copy(focus).add(new THREE.Vector3().setFromSphericalCoords(6000,Math.PI/4,.35));
    view.navigation.zoom=zoom;view.navigation.updateProjectionMatrix();f.update();
    const normal=surfaceNormal(f.world,focus.x,focus.z),ground=surfacePoint(f.world,focus.x,focus.y,focus.z);
    const check=()=>{
      near(view.controls.target,focus);
      const offset=f.camera.position.clone().sub(ground);
      assert.ok(Math.abs(offset.angleTo(normal)-Math.PI/4)<1e-10,'vertical input cannot flatten the local view');
      assert.ok(Math.abs(offset.length()-6000)<1e-7,'zoom and dragging retain the same orbit radius');
      const projected=ground.clone().project(f.camera);
      assert.ok(Math.hypot(projected.x,projected.y)<1e-9,'the ground focus remains at the screen center');
    };
    for(const dy of [-900,900]){
      const before=f.camera.position.clone();
      f.pointer('pointerdown',500,375);f.pointer('pointermove',500,375+dy);f.pointer('pointerup',500,375+dy);
      f.update(240);check();near(f.camera.position,before);
    }
    const before=f.camera.position.clone();
    f.pointer('pointerdown',500,375);f.pointer('pointermove',720,-300);f.pointer('pointerup',720,-300);
    f.update(240);check();assert.ok(f.camera.position.distanceTo(before)>100,'the horizontal part of a diagonal drag rotates yaw');
  }
});

test('physical WASD speed is independent of latitude and finite diagonal travel is independent of frame rate',t=>{
  const f=fixture(t),{view}=f;
  const begin=(latitude,heading=0)=>{
    f.key('Home');view.controls.target.set(0,1.3,-radius*latitude*radians);
    view.navigation.position.copy(view.controls.target).add(new THREE.Vector3().setFromSphericalCoords(6000,Math.PI/4,heading));
    view.navigation.zoom=40;view.navigation.updateProjectionMatrix();f.update();
  };
  let reference;
  for(const latitude of [0,60,84]){
    begin(latitude);const start=view.controls.target.clone();f.key('d');f.update(60);f.key('d','keyup');
    const distance=(view.controls.target.x-start.x)*Math.cos(latitude*radians)*(radius+start.y)/radius;
    if(reference===undefined)reference=distance;
    else assert.ok(Math.abs(distance-reference)<1e-8,'the same key hold traverses the same physical distance');
  }
  const run=hz=>{
    begin(80,Math.PI/4);f.key('d');f.update(hz,1/hz);f.key('d','keyup');
    return view.controls.target.clone();
  };
  const sixty=run(60);near(run(30),sixty,1e-7);near(run(144),sixty,1e-7);
  const ground=surfacePoint(f.world,sixty.x,sixty.y,sixty.z).project(f.camera);
  assert.ok(Math.hypot(ground.x,ground.y)<1e-9,'moving the focus preserves screen centering');
});

test('vertical arrows pan the core view, horizontal arrows orbit, and map or close arrows pan physically',t=>{
  const f=fixture(t),{view}=f;
  view.navigation.zoom=12;view.navigation.updateProjectionMatrix();f.update();
  const focus=view.controls.target.clone(),before=view.navigation.position.clone().sub(focus);
  f.key('ArrowUp');f.update();assert.ok(view.controls.target.z<focus.z,'vertical arrows remain useful with fixed pitch');
  near(view.navigation.position.clone().sub(view.controls.target),before);
  const panned=view.controls.target.clone();f.key('ArrowRight');f.update();near(view.controls.target,panned);
  assert.ok(view.navigation.position.clone().sub(panned).angleTo(before)>.01,'horizontal core arrows rotate yaw');
  for(const zoom of [1,40]){
    f.key('Home');const latitude=80;
    const start=new THREE.Vector3(0,1.3,-radius*latitude*radians);
    view.controls.target.copy(start);view.navigation.position.copy(start).add(new THREE.Vector3().setFromSphericalCoords(6000,Math.PI/4,0));
    view.navigation.zoom=zoom;view.navigation.updateProjectionMatrix();f.update();
    const expected=(view.navigation.top-view.navigation.bottom)/zoom*.045;
    f.key('ArrowRight');f.update();
    const distance=(view.controls.target.x-start.x)*Math.cos(latitude*radians)*(radius+start.y)/radius;
    assert.ok(Math.abs(distance-expected)<1e-8,'arrow movement respects the physical longitude metric');
    const ground=surfacePoint(f.world,view.controls.target.x,view.controls.target.y,view.controls.target.z).project(f.camera);
    assert.ok(Math.hypot(ground.x,ground.y)<1e-9);
  }
  f.key('Home');f.key(']');f.update();assert.equal(view.selected,'front');
  const followed=view.controls.target.clone();f.key('ArrowRight');f.update();
  assert.equal(view.selected,null);assert.ok(view.controls.target.x>followed.x,'an arrow takes control of the ground focus from follow');
});

test('back hemisphere trains cannot be selected through the globe and following crosses the date line the short way',t=>{
  const f=fixture(t,{reduced:false}),{view}=f;
  f.train.state.active=false;f.tap(f.back.parts[1]);assert.equal(view.selected,null);f.key('f');assert.equal(view.selected,null);
  f.train.state.active=true;f.back.state.active=false;
  const offset=view.navigation.position.clone().sub(view.controls.target);
  view.controls.target.set(period/2-4,1.3,0);view.navigation.position.copy(view.controls.target).add(offset);
  f.train.parts.forEach((part,i)=>part.position.set(-period/2+4,.42,(i-1)*2.64));
  f.update();f.key(']');f.update();assert.equal(view.selected,'front');
  assert.ok(Math.abs(wrap(view.controls.target.x-(period/2-4)))<2,'first follow frame must move a small step across the seam');
  f.update(240);assert.ok(Math.abs(wrap(view.controls.target.x-(-period/2+4)))<1e-5);
  assert.ok(f.camera.position.toArray().every(Number.isFinite));
});

test('WASD accelerates and brakes smoothly without injecting motion on keydown',t=>{
  const f=fixture(t,{reduced:false}),{view}=f;
  view.navigation.zoom=12;view.navigation.updateProjectionMatrix();f.update(240);
  const before=view.controls.target.clone();f.key('d');near(view.controls.target,before);
  const steps=[];
  for(let i=0;i<12;i++){const x=view.controls.target.x;f.update();steps.push(view.controls.target.x-x);}
  assert.ok(steps[0]>0&&steps[0]<steps[6]*.25,'first frame starts gently');
  assert.ok(steps.every((step,i)=>!i||step>steps[i-1]),'held movement accelerates continuously');
  f.key('d','keyup');const coast=[];
  for(let i=0;i<12;i++){const x=view.controls.target.x;f.update();coast.push(view.controls.target.x-x);}
  assert.ok(coast[0]>0&&coast[0]<steps.at(-1),'release starts braking without snapping to rest');
  assert.ok(coast.every((step,i)=>!i||step<coast[i-1]),'braking slows each successive frame');
  f.update(100);const stopped=view.controls.target.clone();f.update(60);near(view.controls.target,stopped,1e-7);
});

test('smoothed keyboard travel is identical at 30, 60 and 144 Hz including the braking distance',t=>{
  const f=fixture(t,{reduced:false}),{view}=f;
  const run=hz=>{
    f.key('Home');view.navigation.zoom=12;view.navigation.updateProjectionMatrix();f.update(240);
    f.key('d');f.update(hz,1/hz);f.key('d','keyup');f.update(hz,1/hz);
    return view.controls.target.clone();
  };
  const reference=run(60);near(run(30),reference,1e-7);near(run(144),reference,1e-7);
});

test('Home, focus loss and hidden pages discard keyboard momentum immediately',t=>{
  const f=fixture(t,{reduced:false}),{view}=f;
  for(const release of [()=>f.window.dispatchEvent(new Event('blur')),()=>f.canvas.dispatchEvent(new Event('blur')),
    ()=>{f.document.hidden=true;f.document.dispatchEvent(new Event('visibilitychange'));}]){
    f.document.hidden=false;f.key('Home');f.key('d');f.update(30);release();
    const stop=view.controls.target.clone();f.update(60);near(view.controls.target,stop);
  }
  f.document.hidden=false;f.key('Home');f.key('w');f.update(30);f.key('Home');f.update(60);near(view.controls.target,f.home);
});

test('close drag orbits one stationary ground focus at every latitude and across the close threshold',t=>{
  const f=fixture(t),{view}=f;
  for(const [longitude,latitude] of [[10,25],[120,75],[-100,-65],[179,40]]){
    const focus=new THREE.Vector3(radius*longitude*radians,1.3,-radius*latitude*radians);
    view.controls.target.copy(focus);
    view.navigation.position.copy(focus).add(new THREE.Vector3().setFromSphericalCoords(6000,Math.PI/4,.35));
    view.navigation.zoom=24;view.navigation.updateProjectionMatrix();f.update();
    const before=view.navigation.position.clone().sub(focus);
    f.pointer('pointerdown',400,350);f.pointer('pointermove',440,365);f.update();
    view.navigation.zoom=60;view.navigation.updateProjectionMatrix();f.update();
    f.pointer('pointermove',500,395);f.pointer('pointerup',500,395);f.update(180);
    assert.equal(view.mode,'close');near(view.controls.target,focus);
    const after=view.navigation.position.clone().sub(focus);
    assert.ok(after.angleTo(before)>.1,'drag changes the orbit through the core-to-close boundary');
    assert.ok(Math.abs(after.length()-before.length())<1e-7,'orbit keeps a constant pivot distance');
    const ground=surfacePoint(f.world,focus.x,focus.y,focus.z);
    const center=ground.clone().project(f.camera);
    assert.ok(Math.hypot(center.x,center.y)<1e-9,'the physical ground pivot remains at the screen centre');
    const physicalOffset=f.camera.position.clone().sub(ground);
    assert.ok(Math.abs(physicalOffset.length()-after.length())<1e-7,'bending the camera cannot stretch its orbit');
    const normal=surfaceNormal(f.world,focus.x,focus.z);
    assert.ok(Math.abs(physicalOffset.angleTo(normal)-after.angleTo(new THREE.Vector3(0,1,0)))<1e-10,
      'the chosen ground angle is preserved by the local tangent frame');
  }
});

test('a followed train remains the pivot while dragging, and WASD takes over without a residual pan',t=>{
  const f=fixture(t,{reduced:false}),{view}=f;
  f.key(']');f.update(360);assert.equal(view.selected,'front');
  const focus=view.controls.target.clone(),before=view.navigation.position.clone().sub(focus);
  f.pointer('pointerdown',400,350);f.pointer('pointermove',520,410);f.pointer('pointerup',520,410);f.update();
  assert.equal(view.selected,'front');near(view.controls.target,focus,1e-6);
  assert.ok(view.navigation.position.clone().sub(focus).angleTo(before)>.01,'following still allows a deliberate orbit');
  const pivot=view.controls.target.clone(),position=view.navigation.position.clone();
  f.key('d');near(view.controls.target,pivot);near(view.navigation.position,position);
  f.update();f.key('d','keyup');assert.equal(view.selected,null);
  const offset=view.navigation.position.clone().sub(view.controls.target);
  near(offset,position.sub(pivot),1e-7);
  assert.ok(view.controls.target.distanceTo(pivot)<1,'a new pan begins with smooth acceleration, not the previous drag tail');
});

test('touch orbit and pinch in close view keep the same spherical ground focus',t=>{
  const f=fixture(t),{view}=f;
  view.navigation.zoom=40;view.navigation.updateProjectionMatrix();f.update();
  const focus=view.controls.target.clone(),before=view.navigation.position.clone();
  const touch={pointerType:'touch'};
  f.pointer('pointerdown',400,350,{...touch,pointerId:1});
  f.pointer('pointerdown',500,350,{...touch,pointerId:2});
  f.pointer('pointermove',430,380,{...touch,pointerId:1});
  f.pointer('pointermove',550,380,{...touch,pointerId:2});
  f.pointer('pointerup',550,380,{...touch,pointerId:2});
  f.pointer('pointerup',430,380,{...touch,pointerId:1});f.update(180);
  near(view.controls.target,focus);
  assert.ok(view.navigation.position.distanceTo(before)>10,'the two-finger translation rotates around the pivot');
  assert.notEqual(view.navigation.zoom,40,'pinch still controls zoom');
  const center=surfacePoint(f.world,focus.x,focus.y,focus.z).project(f.camera);
  assert.ok(Math.hypot(center.x,center.y)<1e-9);
});
