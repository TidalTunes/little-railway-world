import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Matrix4,Vector3} from 'three';
import {createLocalLife,LIFE_LIMITS,selectLocalLife} from '../src/local-life.js';
import {surfaceChartCoordinates,surfacePoint,surfaceDistance} from '../src/world-surface.js';
import {styleUniforms} from '../src/scene-style.js';

const plane={};
const globe={surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},
  projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
function matrix(object,index=0){const value=new Matrix4();object.getMatrixAt(index,value);return value;}
function snapshot(life){return life.root.children.map(batch=>Array.from(batch.instanceMatrix.array.subarray(0,batch.count*16)));}

test('local fauna has a fixed budget, selects by physical distance and crosses the date line',()=>{
  const focus=surfaceChartCoordinates(globe,179.9,72),placements=[];
  for(let i=0;i<2000;i++)placements.push({id:`sheep-${i}`,kind:'sheep',...surfaceChartCoordinates(globe,-179.9+i*.008,72),y:0,radius:.7});
  for(let i=0;i<1000;i++)placements.push({id:`tree-${i}`,kind:'tree',...surfaceChartCoordinates(globe,179.8-i*.01,72),y:0,radius:1});
  placements.push({id:'opposite',kind:'sheep',...surfaceChartCoordinates(globe,0,72),y:0,radius:.7});
  const selected=selectLocalLife(globe,placements,focus);
  assert.equal(selected.sheep.length,LIFE_LIMITS.sheep);
  assert.equal(selected.sheep[0].item.id,'sheep-0','nearby animals across the date line are not treated as a world away');
  assert.ok(!selected.sheep.some(({item})=>item.id==='opposite'));
  assert.ok(selected.flocks.length<=LIFE_LIMITS.flocks);assert.equal(selected.insects.length*3,LIFE_LIMITS.fireflies);
  for(let i=0;i<selected.flocks.length;i++)for(let j=0;j<i;j++)assert.ok(surfaceDistance(globe,selected.flocks[i].item,selected.flocks[j].item)>12);
  const life=createLocalLife(new Group(),globe);life.update(4,{focus,placements});
  assert.equal(life.stats.sheep,LIFE_LIMITS.sheep);assert.ok(life.stats.birds<=LIFE_LIMITS.flocks*3);
  assert.equal(life.root.children.length,7,'seven fixed batches regardless of the number of cities');
  life.dispose();
});

test('grazing sheep retain dimensions and remain inside their reserved physical footprint at high latitudes',()=>{
  const p=surfaceChartCoordinates(globe,28,76),sheep={id:'ram',kind:'sheep',...p,y:0,rotation:.8,radius:.7};
  const life=createLocalLife(new Group(),globe),center=surfacePoint(globe,p.x,0,p.z),up=surfacePoint(globe,p.x,1,p.z).sub(center).normalize();
  const wool=life.root.getObjectByName('grazing-sheep-wool'),head=life.root.getObjectByName('grazing-sheep-heads'),feet=life.root.getObjectByName('grazing-sheep-feet');
  for(const time of [0,1,4,9,15,60,200]){
    life.update(time,{placements:[sheep],focus:p});
    const m=matrix(wool),axes=[0,4,8].map(offset=>new Vector3().fromArray(m.elements,offset));
    [.23,.22,.30].forEach((length,i)=>assert.ok(Math.abs(axes[i].length()-length)<1e-7));
    for(let i=0;i<3;i++)for(let j=0;j<i;j++)assert.ok(Math.abs(axes[i].dot(axes[j]))<1e-8,'orthogonal rigid frame');
    for(const object of [wool,head,feet])for(let index=0;index<object.count;index++){
      const transform=matrix(object,index),vertices=object.geometry.attributes.position;
      for(let vertex=0;vertex<vertices.count;vertex++){
        const delta=new Vector3().fromBufferAttribute(vertices,vertex).applyMatrix4(transform).sub(center);
        const horizontal=delta.clone().addScaledVector(up,-delta.dot(up));
        assert.ok(horizontal.length()<sheep.radius,`${object.name} stays inside the clearance reserved by generation`);
        assert.ok(delta.dot(up)>-.004,'feet never sink under the ground');
      }
    }
  }
  life.dispose();
});

test('day and night fauna animate deterministically, freeze when paused and honor reduced motion',()=>{
  const placements=[{kind:'sheep',id:'sheep',x:0,z:0,y:0,radius:.7},{kind:'tree',id:'tree',x:14,z:0,y:0,radius:1},
    {kind:'farmPatch',id:'farm',x:4,z:8,y:0,radius:4}];
  const life=createLocalLife(new Group(),plane),options={placements,focus:{x:0,z:0},revision:1};
  life.update(5,options);const atFive=snapshot(life),versions=life.root.children.map(batch=>batch.instanceMatrix.version);
  assert.equal(life.stats.sheep,1);assert.equal(life.stats.birds,3);assert.equal(life.stats.butterflies,1);assert.equal(life.stats.fireflies,6);
  assert.equal(life.stats.instances,11);
  life.update(5,{...options,night:1});assert.deepEqual(snapshot(life),atFive,'time frozen at pause');
  assert.deepEqual(life.root.children.map(batch=>batch.instanceMatrix.version),versions,'paused frames do not upload matrices');
  assert.equal(life.root.getObjectByName('woodland-fireflies').material.uniforms.night.value,1);
  assert.equal(life.root.getObjectByName('woodland-fireflies').visible,true);
  life.update(7,options);assert.notDeepEqual(snapshot(life),atFive);
  life.update(5,options);assert.deepEqual(snapshot(life),atFive,'no compounded globe or animation transforms');
  life.update(8,{...options,reducedMotion:true});const frozen=snapshot(life);
  life.update(40,{...options,reducedMotion:true});assert.deepEqual(snapshot(life),frozen);
  const selections=life.stats.selections;life.update(41,{...options,detailBlend:0});assert.equal(life.root.visible,false);assert.equal(life.stats.selections,selections);
  life.update(42,{...options,placements:[],revision:2});assert.equal(life.root.visible,true);assert.equal(life.stats.sheep,0);
  for(const batch of life.root.children)assert.equal(batch.count,0,'evicted scenery leaves no floating animals');
  life.dispose();assert.equal(life.root.parent,null);
});

test('cloned wing materials retain the shared painted-world shader and time uniforms',()=>{
  const life=createLocalLife(new Group(),plane);
  for(const name of ['local-swallow-wings','meadow-butterflies']){
    const material=life.root.getObjectByName(name).material;
    const shader={uniforms:{},vertexShader:'#include <project_vertex>',fragmentShader:'#include <opaque_fragment>'};
    material.onBeforeCompile(shader);
    assert.equal(shader.uniforms.worldNight,styleUniforms.night);
    assert.equal(shader.uniforms.worldTime,styleUniforms.time);
    assert.match(shader.fragmentShader,/grainVisibility/);
    assert.equal((material.customProgramCacheKey().match(/painted-world-v\d+/g)??[]).length,1,'clone receives exactly one style hook');
  }
  life.dispose();
});
