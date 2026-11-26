import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createStressWorld} from '../src/stress-world.js';
import {createWorldRenderer} from '../src/world-renderer.js';
import {mapBlendForZoom} from '../src/camera-modes.js';

// Reproduce the real stress preset's fit, including the enlarged framing that
// keeps its rotated outline inside the overview. No scenery generation is
// needed to test which regional packets the detail transition must prepare.
function stressFraming(world){
  const radius=Math.hypot(world.bounds.width,world.bounds.depth),height=Math.max(0,...world.mountains.map(m=>m.height));
  const target=new THREE.Vector3(0,1.3,0),camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,radius*8);
  camera.position.copy(target).addScaledVector(new THREE.Vector3(115,125,145).normalize(),radius*1.5+height);
  camera.lookAt(target);camera.updateMatrixWorld(true);
  const inverse=camera.quaternion.clone().invert(),orbit=new THREE.Spherical().setFromVector3(camera.position.clone().sub(target));
  const points=world.outline.flatMap(([x,z])=>[new THREE.Vector3(x,-3.4,z),new THREE.Vector3(x,4,z)]);
  world.mountains.forEach(m=>points.push(new THREE.Vector3(m.x,m.height,m.z)));
  let x=0,y=0;
  for(const point of points){point.sub(target).applyQuaternion(inverse);x=Math.max(x,Math.abs(point.x));y=Math.max(y,Math.abs(point.y));}
  const map=camera.clone();map.position.copy(target).add(new THREE.Vector3().setFromSphericalCoords(orbit.radius,.00001,orbit.theta));map.lookAt(target);
  const mapInverse=map.quaternion.clone().invert();
  for(const [px,pz]of world.outline){
    const point=new THREE.Vector3(px,0,pz).sub(target).applyQuaternion(mapInverse);
    x=Math.max(x,Math.abs(point.x));y=Math.max(y,Math.abs(point.y));
  }
  const width=x*2+Math.max(10,x*.2),heightFit=y*2+Math.max(10,y*.2),scale=Math.max(radius/410,heightFit/230);
  return{camera,orbit,width,height:heightFit,scale};
}

test('portrait, ultrawide, and shallow stress views can preload the fixed detail entry above the LRU target',async t=>{
  const world={...createStressWorld({cities:512,trains:4096}),stations:[]},fit=stressFraming(world);
  const cases=[
    {name:'portrait',aspect:9/16,phi:fit.orbit.phi,x:0,z:96,minimum:36},
    {name:'ultrawide',aspect:32/9,phi:fit.orbit.phi,x:48,z:48,minimum:48},
    {name:'shallow landscape',aspect:16/9,phi:Math.PI*.4,x:96,z:48,minimum:48},
    {name:'shallow portrait',aspect:9/16,phi:Math.PI*.4,x:96,z:0,minimum:48},
  ];
  for(const sample of cases){
    const target=new THREE.Vector3(sample.x,1.3,sample.z),viewHeight=Math.max(fit.height,fit.width/sample.aspect);
    function coverage(zoom,phi){
      const camera=fit.camera.clone();
      Object.assign(camera,{left:-viewHeight*sample.aspect/2,right:viewHeight*sample.aspect/2,top:viewHeight/2,bottom:-viewHeight/2,zoom:zoom*fit.scale});
      camera.position.copy(target).add(new THREE.Vector3().setFromSphericalCoords(fit.orbit.radius,phi,fit.orbit.theta));
      camera.lookAt(target);camera.updateProjectionMatrix();camera.updateMatrixWorld(true);return camera;
    }
    const entry=coverage(.78,sample.phi),proposed=coverage(.89,THREE.MathUtils.lerp(sample.phi,.00001,mapBlendForZoom(.89)));
    const renderer=createWorldRenderer(new THREE.Group(),world,{maxChunks:4,maxPending:128,requestChunk:request=>({
      bounds:{minX:request.x-96,maxX:request.x+96,minZ:request.z-96,maxZ:request.z+96},meshes:[],
    })});
    t.after(()=>renderer.dispose());
    const update=()=>renderer.update(entry,{target,coverageCameras:[entry,proposed],budgetMs:100});
    update();
    assert.ok(renderer.stats.requiredChunks>sample.minimum,`${sample.name} exercises the old hard-cap deadlock`);
    assert.equal(renderer.stats.coverageLimited,false,`${sample.name} must be able to prepare its finite entry footprint`);
    for(let frame=0;frame<5&&!renderer.ready;frame++){await new Promise(resolve=>setImmediate(resolve));update();}
    assert.equal(renderer.ready,true,`${sample.name} becomes ready without changing the requested zoom`);
    assert.ok(renderer.stats.loadedChunks>=renderer.stats.requiredChunks,`${sample.name} retains required regions above its LRU target`);
    renderer.dispose();
  }
});
