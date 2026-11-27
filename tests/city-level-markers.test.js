import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createCityLevelMarkers,cityMarkerPopulation} from '../src/city-level-markers.js';

function fixture(){
  const previous=globalThis.document,labels=[];
  globalThis.document={createElement:()=>({getContext:()=>({beginPath(){},arc(){},fill(){},moveTo(){},lineTo(){},closePath(){},save(){},restore(){},translate(){},fillText(label){labels.push(label);}})})};
  const scene=new THREE.Group(),map=new THREE.Group(),world={players:[{id:'teal',color:{l:.62,c:.12,h:170}}],gameplay:{ownerId:'teal'}};
  const markers=createCityLevelMarkers(scene,map,world);
  if(previous===undefined)delete globalThis.document;else globalThis.document=previous;
  const camera=new THREE.PerspectiveCamera(50,1,.1,1000);camera.position.set(0,25,30);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  return {scene,map,markers,camera,labels};
}
const towns=Array.from({length:5},(_,i)=>({id:`city-${i}`,x:(i-2)*4,z:0,level:i+1}));

test('one level-and-population plate per town serves both overview layers',()=>{
  const {scene,map,markers,camera,labels}=fixture();
  try{
    markers.sync(towns);markers.update({camera,mapBlend:.5,viewportHeight:800});
    assert.deepEqual(labels,['1','3','2','6','3','9','4','12','5','15']);
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
    assert.ok(Math.abs(pixels()-40)<.001);
    camera.position.multiplyScalar(2);camera.updateMatrixWorld(true);assert.ok(Math.abs(pixels()-40)<.001);
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


test('city population comes from homes and updates the cached plate only when statistics change',()=>{
  const {scene,markers,camera,labels}=fixture();
  try{
    markers.sync([{id:'home',x:0,z:0,level:2,houseCount:7},{id:'village',x:3,z:0,level:2,houseCount:6}]);
    markers.update({camera});assert.deepEqual(labels,['2','7','2','6']);
    assert.deepEqual(Array.from(scene.children[0].geometry.attributes.cityPopulation.array).slice(0,2),[7,6]);
    const atlas=scene.children[0].material.map,version=atlas.version,geometry=scene.children[0].geometry;
    for(let i=0;i<20;i++){camera.position.x=i/10;camera.updateMatrixWorld(true);markers.update({camera,mapBlend:i/20});}
    markers.sync([{id:'home',x:0,z:0,level:2,houseCount:7},{id:'village',x:3,z:0,level:2,houseCount:6}]);
    assert.equal(atlas.version,version);assert.equal(scene.children[0].geometry,geometry);assert.equal(markers.stats.atlasUpdates,1);
    markers.sync([{id:'home',x:0,z:0,level:2,houseCount:8}]);assert.equal(markers.stats.atlasUpdates,2);assert.ok(atlas.version>version);
    assert.equal(cityMarkerPopulation({houseCount:6,population:100}),6);assert.equal(cityMarkerPopulation({houseIds:['a','b','c']}),3);
  }finally{markers.dispose();}
});

test('full map city statistics are centered and both layers share the interpolated position',()=>{
  const {scene,map,markers,camera}=fixture(),a=new THREE.Matrix4(),b=new THREE.Matrix4(),point=new THREE.Vector3(),projected=new THREE.Vector3();
  try{
    markers.sync([{id:'home',x:0,y:.7,z:0,level:2,houseCount:6}]);
    for(const mapBlend of [0,.25,.5,.75,1]){
      markers.update({camera,mapBlend,viewportHeight:800});scene.children[0].getMatrixAt(0,a);map.children[0].getMatrixAt(0,b);
      assert.deepEqual(a.elements,b.elements);point.setFromMatrixPosition(a);projected.set(0,.7,0).project(camera);point.project(camera);
      const pixels=(point.y-projected.y)*400,expected=24*(1-THREE.MathUtils.smoothstep(mapBlend,0,1));assert.ok(Math.abs(pixels-expected)<1e-4);
    }
    markers.sync([{x:0,z:0,level:0,houseCount:2}]);markers.update({camera});assert.equal(scene.children[0].count,0,'outposts do not appear as cities');
  }finally{markers.dispose();}
});
