import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {makeTrains} from '../src/railway.js';
import {rigidSurfacePoseMatrix} from '../src/world-surface.js';

function railway(world,poses){
  const poseBuffer=new Float32Array(poses.flatMap(p=>[p.x,p.y??.42,p.z,p.angle??0,1,0]));
  const traffic={trains:[{id:'joined',count:poses.length,spacing:2.64,active:true,poseOffset:0}],poseBuffer,update(){}};
  const rail=makeTrains(new THREE.Group(),world,{traffic});rail.updateView();return rail;
}

test('one shared gangway batch joins actual carriage shells on straights and tight bends',()=>{
  for(const radius of [4,8,100000]){
    const poses=Array.from({length:4},(_,i)=>{const angle=i*2.64/radius;return{x:radius*(1-Math.cos(angle)),z:radius*Math.sin(angle),angle};});
    const rail=railway({},poses),gangways=rail.root.getObjectByName('train-gangways');
    assert.equal(gangways.count,3);assert.equal(rail.stats.visibleConnectors,3);
    const transform=new THREE.Matrix4();
    for(let i=0;i<gangways.count;i++){
      gangways.getMatrixAt(i,transform);
      for(const [index,z]of [[i,-.5],[i+1,.5]]){
        const part=rail.trains[0].parts[index],car=new THREE.Matrix4().compose(part.position,part.quaternion,new THREE.Vector3(1,1,1)).invert();
        const endpoint=new THREE.Vector3(0,0,z).applyMatrix4(transform).applyMatrix4(car);
        assert.ok(Math.abs(endpoint.z)>.91&&Math.abs(endpoint.z)<.93,'connector endpoint embeds inside the 1.06-unit half-length shell');
        assert.ok(Math.abs(endpoint.x)<1e-5&&Math.abs(endpoint.y-.88)<1e-5,'gangway meets the center of each carriage end');
        for(const x of [-.32,.32])for(const y of [-.37,.37]){
          const corner=new THREE.Vector3(x,y,z).applyMatrix4(transform).applyMatrix4(car);
          assert.ok(Math.abs(corner.x)<.51&&Math.abs(corner.z)<1.06&&corner.y>.41&&corner.y<1.35,
            'the complete end face embeds in its shell, including the outer corners of a tight bend');
        }
      }
    }
    rail.dispose();
  }
});

test('globe gangways share the same rigid tangent frames as their carriages',()=>{
  const radius=1600,world={surface:{type:'sphere',radius,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  const latitude=70,z=-latitude*Math.PI/180*radius,dx=2.64/Math.cos(latitude*Math.PI/180);
  const rail=railway(world,[{x:0,z,angle:Math.PI/2},{x:dx,z,angle:Math.PI/2}]);
  const gangways=rail.root.getObjectByName('train-gangways'),transform=new THREE.Matrix4();
  assert.equal(gangways.count,1);gangways.getMatrixAt(0,transform);
  for(const [index,localZ]of [[0,-.5],[1,.5]]){
    const part=rail.trains[0].parts[index],car=rigidSurfacePoseMatrix(world,part.position.x,part.position.y,part.position.z,part.rotation.y).invert();
    const endpoint=new THREE.Vector3(0,0,localZ).applyMatrix4(transform).applyMatrix4(car);
    assert.ok(Math.abs(Math.abs(endpoint.z)-.92)<.0001);
    assert.ok(Math.abs(endpoint.x)<.0001&&Math.abs(endpoint.y-.88)<.0001);
  }
  rail.dispose();
});

test('gangways do not connect inactive cars and disappear with their culled train',()=>{
  const rail=railway({},[{x:0,z:0},{x:0,z:2.64},{x:0,z:5.28}]);
  rail.poseBuffer[10]=0;rail.update(0);rail.updateView();
  assert.equal(rail.stats.visibleConnectors,0,'a hidden middle car does not leave floating connections');
  rail.poseBuffer[10]=1;rail.update(0);
  const camera=new THREE.PerspectiveCamera(50,1,.1,25);camera.position.set(100,5,100);camera.lookAt(100,0,90);
  rail.updateView(camera);assert.equal(rail.stats.visibleCars,0);assert.equal(rail.stats.visibleConnectors,0);
  assert.equal(rail.root.getObjectByName('train-gangways').count,0);
  rail.dispose();
});
