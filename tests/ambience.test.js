import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Matrix4,Vector3} from 'three';
import {ambience} from '../src/ambience.js';
import {generateWorld} from '../src/world-model.js';
import {EARTH_SURFACE_RADIUS,surfacePoint,surfacePoseMatrix} from '../src/world-surface.js';
import geography from '../data/europe-geography.json' with {type:'json'};

const planar=generateWorld({density:0},{detail:'network'});
const sphere={...planar,surface:{type:'sphere',radius:EARTH_SURFACE_RADIUS,origin:{longitude:10,latitude:52},projection:geography.projection}};
function closeMatrix(a,b,tolerance=1e-8){
  for(let i=0;i<16;i++)assert.ok(Math.abs(a.elements[i]-b.elements[i])<tolerance,`matrix[${i}]: ${a.elements[i]} vs ${b.elements[i]}`);
}
function cleanup(root){
  const geometries=new Set();root.traverse(object=>{if(object.geometry)geometries.add(object.geometry);});
  for(const geometry of geometries)geometry.dispose();
}

test('boats, birds and balloon keep chart animation state while their render matrices follow the sphere',()=>{
  const flat=ambience(new Group(),planar),curved=ambience(new Group(),sphere);
  const names=['river-boat','sailboat','balloon',...Array.from({length:5},(_,i)=>`bird-${i+1}`)];
  assert.ok(flat.root.getObjectByName('sailboat'),'fixture exercises ocean sailing');
  let saved=null;
  for(const time of [0,15,100,15]){
    flat.update(time);curved.update(time);flat.root.updateMatrixWorld(true);curved.root.updateMatrixWorld(true);
    for(const name of names){
      const a=flat.root.getObjectByName(name),b=curved.root.getObjectByName(name);
      assert.deepEqual(b.position.toArray(),a.position.toArray(),`${name}: animation state remains chart coordinates`);
      assert.deepEqual(b.quaternion.toArray(),a.quaternion.toArray());assert.equal(b.visible,a.visible);
      assert.equal(a.matrixAutoUpdate,true);assert.equal(b.matrixAutoUpdate,false);
      const attitude=a.matrix.clone().setPosition(0,0,0);
      const expected=surfacePoseMatrix(sphere,a.position.x,a.position.y,a.position.z,0).multiply(attitude);
      closeMatrix(b.matrix,expected);
      assert.ok(b.getWorldPosition(new Vector3()).distanceTo(surfacePoint(sphere,a.position.x,a.position.y,a.position.z))<1e-8);
      if(name.startsWith('bird'))for(let i=0;i<2;i++){
        assert.deepEqual(b.children[i].quaternion.toArray(),a.children[i].quaternion.toArray(),'wing flap stays local');
        closeMatrix(b.children[i].matrixWorld,b.matrix.clone().multiply(a.children[i].matrix));
      }
    }
    const matrices=names.map(name=>curved.root.getObjectByName(name).matrix.toArray());
    if(time===15){if(saved)assert.deepEqual(matrices,saved,'returning to the same time cannot compound surface transforms');else saved=matrices;}
  }
  cleanup(flat.root);cleanup(curved.root);
});

test('animated river ripples use exact surface poses and retain their chart scales',()=>{
  const flat=ambience(new Group(),planar),curved=ambience(new Group(),sphere);
  const a=flat.root.getObjectByName('river-ripples'),b=curved.root.getObjectByName('river-ripples');
  const ma=new Matrix4(),mb=new Matrix4(),position=new Vector3();
  for(const time of [0,11,81,11]){
    flat.update(time);curved.update(time);assert.equal(a.count,b.count);assert.ok(a.count>0);
    for(let i=0;i<a.count;i++){
      a.getMatrixAt(i,ma);b.getMatrixAt(i,mb);position.setFromMatrixPosition(ma);
      const expected=surfacePoseMatrix(sphere,position.x,position.y,position.z,0).multiply(ma.clone().setPosition(0,0,0));
      closeMatrix(mb,expected,8e-6);
    }
  }
  cleanup(flat.root);cleanup(curved.root);
});

test('static ocean ripples are warped exactly once and remain unchanged during animation',()=>{
  const flat=ambience(new Group(),planar),curved=ambience(new Group(),sphere);
  const a=flat.root.getObjectByName('ocean-ripples'),b=curved.root.getObjectByName('ocean-ripples');
  assert.ok(a.children.length>0);assert.equal(a.children.length,b.children.length);
  const before=[];
  for(let i=0;i<a.children.length;i++){
    const from=a.children[i].geometry.attributes.position,to=b.children[i].geometry.attributes.position;
    assert.equal(from.count,to.count);before.push([...to.array]);
    for(let j=0;j<from.count;j++){
      const expected=surfacePoint(sphere,from.getX(j),from.getY(j),from.getZ(j));
      assert.ok(expected.distanceTo(new Vector3().fromBufferAttribute(to,j))<8e-6);
    }
  }
  for(const time of [0,4,200])curved.update(time);
  assert.deepEqual(b.children.map(child=>[...child.geometry.attributes.position.array]),before);
  cleanup(flat.root);cleanup(curved.root);
});
