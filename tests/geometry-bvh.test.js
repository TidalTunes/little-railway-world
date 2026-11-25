import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { serializeGeometryBVH,installGeometryBVH,geometryBVHTransfers } from '../src/geometry-bvh.js';

function geometry(){
  const a=new THREE.BoxGeometry(4,5,4).toNonIndexed();a.translate(4,2.5,6);
  const b=new THREE.BoxGeometry(18,.5,18).toNonIndexed();b.translate(0,-.25,0);
  const merged=mergeGeometries([a,b]);a.dispose();b.dispose();return merged;
}

test('transferred BVH preserves positions, triangle identities and nearest visible occlusion',()=>{
  const original=geometry(),positions=original.attributes.position.array.slice(),index=original.index;
  const serialized=serializeGeometryBVH(original);
  assert.deepEqual(original.attributes.position.array,positions);assert.equal(original.index,index);
  const buffers=geometryBVHTransfers(serialized),packet=structuredClone(serialized,{transfer:buffers});
  assert.ok(buffers.every(buffer=>buffer.byteLength===0),'worker ownership transfers without copying tree buffers');
  const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),reference=new THREE.Mesh(original,material),fast=new THREE.Mesh(original.clone(),material);
  installGeometryBVH(fast,packet);
  const ray=new THREE.Raycaster();ray.firstHitOnly=true;
  for(const yScale of [1,.015]){
    reference.scale.set(1,yScale,1);fast.scale.copy(reference.scale);reference.updateMatrixWorld();fast.updateMatrixWorld();
    for(const [x,z]of [[4,6],[0,0],[-8,-8],[8,8],[22,22]]){
      ray.set(new THREE.Vector3(x,30,z),new THREE.Vector3(.08,-1,.03).normalize());
      const expected=ray.intersectObject(reference)[0],actual=ray.intersectObject(fast)[0];
      assert.equal(!!actual,!!expected);
      if(actual){assert.ok(actual.point.distanceTo(expected.point)<1e-8);assert.ok(Math.abs(actual.distance-expected.distance)<1e-8);assert.equal(actual.faceIndex,expected.faceIndex);}
    }
  }
  assert.ok(fast.geometry.boundsTree);fast.geometry.dispose();assert.equal(fast.geometry.boundsTree,null);
  original.dispose();material.dispose();
});

test('BVH installation leaves native meshes and instanced train picking unchanged',()=>{
  const source=geometry(),material=new THREE.MeshBasicMaterial(),mesh=new THREE.Mesh(source,material),raycast=mesh.raycast;
  const other=new THREE.Mesh(source.clone(),material);installGeometryBVH(other,serializeGeometryBVH(other.geometry));
  assert.equal(mesh.raycast,raycast,'no global Mesh prototype override');
  const instanced=new THREE.InstancedMesh(source,material,1);
  assert.throws(()=>installGeometryBVH(instanced,serializeGeometryBVH(source)),/InstancedMesh/);
  instanced.dispose();other.geometry.dispose();source.dispose();material.dispose();
});
