import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {indexGeometryExact,geometryAttributeBytes} from '../src/index-geometry.js';

function assertSameTriangles(source,indexed){
  assert.equal(indexed.index.count,source.attributes.position.count);
  for(const [name,attribute]of Object.entries(source.attributes)){
    const original=new Uint32Array(attribute.array.buffer,attribute.array.byteOffset,attribute.array.length);
    const replacement=indexed.attributes[name],bits=new Uint32Array(replacement.array.buffer,replacement.array.byteOffset,replacement.array.length);
    for(let vertex=0;vertex<attribute.count;vertex++)for(let component=0;component<attribute.itemSize;component++){
      assert.equal(bits[indexed.index.getX(vertex)*attribute.itemSize+component],original[vertex*attribute.itemSize+component]);
    }
  }
}

test('exact indexing preserves triangle order, normal seams, color seams and drawing ranges',()=>{
  const source=new THREE.BoxGeometry(3,4,5).toNonIndexed();
  const colors=new Float32Array(source.attributes.position.count*3).fill(.75);
  colors[3]=.5;source.setAttribute('color',new THREE.BufferAttribute(colors,3));
  source.setDrawRange(3,24);source.computeBoundingBox();source.computeBoundingSphere();
  const before=Object.fromEntries(Object.entries(source.attributes).map(([name,a])=>[name,a.array.slice()]));
  const indexed=indexGeometryExact(source);
  assertSameTriangles(source,indexed);
  assert.ok(indexed.attributes.position.count<source.attributes.position.count);
  assert.ok(indexed.attributes.position.count>8,'shared positions retain separate face normals and colors');
  assert.ok(geometryAttributeBytes(indexed)<geometryAttributeBytes(source));
  assert.deepEqual(indexed.groups,source.groups);assert.deepEqual(indexed.drawRange,source.drawRange);
  assert.deepEqual(indexed.boundingBox,source.boundingBox);assert.deepEqual(indexed.boundingSphere,source.boundingSphere);
  for(const [name,array]of Object.entries(before))assert.deepEqual(source.attributes[name].array,array);
  assert.equal(source.index,null);
});

test('bit-exact comparisons preserve signed zero, small differences, NaN payloads and array offsets',()=>{
  const storage=new Uint32Array(3+18+3);storage.fill(0x3f800000);
  storage.set([0,0,0,0x80000000,0,0,0x7fc00001,0,0,0x7fc00002,0,0,0,0,0,0x00000001,0,0],3);
  const source=new THREE.BufferGeometry();source.setAttribute('position',new THREE.BufferAttribute(new Float32Array(storage.buffer,12,18),3));
  const indexed=indexGeometryExact(source);
  assert.equal(indexed.attributes.position.count,5);
  assert.deepEqual([...indexed.index.array],[0,1,2,3,0,4]);
  assertSameTriangles(source,indexed);
});

test('numeric hash collisions never merge distinct vertices',()=>{
  const source=new THREE.BufferGeometry(),count=15000,position=new Float32Array(count*3),color=new Float32Array(count*3);
  const expected=new Set();
  for(let i=0;i<count;i++){
    const key=i%2345;position.set([key%17,Math.floor(key/17)%19,Math.floor(key/(17*19))],i*3);
    color.set([key%3/3,key%7/7,key%11/11],i*3);expected.add(key);
  }
  source.setAttribute('position',new THREE.BufferAttribute(position,3));source.setAttribute('color',new THREE.BufferAttribute(color,3));
  const indexed=indexGeometryExact(source);
  assert.equal(indexed.attributes.position.count,expected.size);assertSameTriangles(source,indexed);
});

test('large outputs use uint32 indices and empty geometry is supported',()=>{
  for(const count of [65535,65536]){
    const source=new THREE.BufferGeometry(),position=new Float32Array(count*3);
    for(let i=0;i<count;i++)position[i*3]=i;
    source.setAttribute('position',new THREE.BufferAttribute(position,3));
    const indexed=indexGeometryExact(source);
    assert.equal(indexed.index.array.constructor,count===65535?Uint16Array:Uint32Array);
    assert.equal(indexed.index.getX(count-1),count-1);assertSameTriangles(source,indexed);
  }
  const empty=indexGeometryExact(new THREE.BufferGeometry());assert.equal(empty.index.count,0);
});

test('unsupported attribute layouts reject instead of silently changing geometry',()=>{
  assert.throws(()=>indexGeometryExact(new THREE.BoxGeometry()),/non-indexed/);
  const source=new THREE.BufferGeometry();source.setAttribute('position',new THREE.BufferAttribute(new Float64Array(9),3));
  assert.throws(()=>indexGeometryExact(source),/Float32/);
  source.setAttribute('position',new THREE.InterleavedBufferAttribute(new THREE.InterleavedBuffer(new Float32Array(9),3),3,0));
  assert.throws(()=>indexGeometryExact(source),/non-interleaved/);
});
