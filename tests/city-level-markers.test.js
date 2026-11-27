import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createCityLevelMarkers} from '../src/city-level-markers.js';

function fixture(){
  const previous=globalThis.document,labels=[];
  globalThis.document={createElement:()=>({getContext:()=>({beginPath(){},arc(){},fill(){},fillText(label){labels.push(label);}})})};
  const scene=new THREE.Group(),map=new THREE.Group(),world={players:[{id:'teal',color:{l:.62,c:.12,h:170}}],gameplay:{ownerId:'teal'}};
  const markers=createCityLevelMarkers(scene,map,world);
  if(previous===undefined)delete globalThis.document;else globalThis.document=previous;
  const camera=new THREE.PerspectiveCamera(50,1,.1,1000);camera.position.set(0,25,30);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  return {scene,map,markers,camera,labels};
}
const towns=Array.from({length:5},(_,i)=>({id:`city-${i}`,x:(i-2)*4,z:0,level:i+1}));

test('one city numeral per town replaces per-building glyphs in both overview layers',()=>{
  const {scene,map,markers,camera,labels}=fixture();
  try{
    markers.sync(towns);markers.update({camera,mapBlend:.5,viewportHeight:800});
    assert.deepEqual(labels,['1','2','3','4','5']);
    assert.equal(scene.children[0].count,5);assert.equal(map.children[0].count,5);
    assert.deepEqual(Array.from(scene.children[0].geometry.attributes.cityLevel.array).slice(0,5),[1,2,3,4,5]);
    assert.equal(scene.children[0].geometry,map.children[0].geometry);
    markers.update({camera,walkingWeight:1});assert.equal(scene.children[0].visible,false);assert.equal(map.children[0].visible,false);
    markers.sync([]);markers.update({camera});assert.equal(scene.children[0].count,0);
  }finally{markers.dispose();}
});

test('city badges retain their screen size through zoom and cull towns outside the view',()=>{
  const {scene,markers,camera}=fixture(),matrix=new THREE.Matrix4(),point=new THREE.Vector3(),rotation=new THREE.Quaternion(),scale=new THREE.Vector3();
  try{
    markers.sync([{x:0,z:0,level:3},{x:1000,z:0,level:1}]);
    function pixels(){markers.update({camera,viewportHeight:800});assert.equal(scene.children[0].count,1);
      scene.children[0].getMatrixAt(0,matrix);matrix.decompose(point,rotation,scale);point.applyMatrix4(camera.matrixWorldInverse);
      return scale.y*800*camera.projectionMatrix.elements[5]/(2*Math.abs(point.z));}
    assert.ok(Math.abs(pixels()-42)<.001);
    camera.position.multiplyScalar(2);camera.updateMatrixWorld(true);assert.ok(Math.abs(pixels()-42)<.001);
    markers.update({camera,mapBlend:1});assert.equal(scene.children[0].visible,false);
  }finally{markers.dispose();}
});

test('growing city counts reuses the numeral atlas and releases replaced buffers',()=>{
  const {scene,map,markers,camera}=fixture();
  try{
    const old=scene.children[0],material=old.material,atlas=material.map;let released=0;
    old.geometry.addEventListener('dispose',()=>released++);
    markers.sync(Array.from({length:12},(_,i)=>({x:i/4,z:0,level:1+i%5})));markers.update({camera});
    assert.equal(released,1);assert.equal(scene.children.length,1);assert.equal(map.children.length,1);
    assert.equal(scene.children[0].material,material);assert.equal(scene.children[0].material.map,atlas);
    assert.equal(scene.children[0].count,12);
  }finally{markers.dispose();}
  assert.equal(scene.children.length,0);assert.equal(map.children.length,0);
});
