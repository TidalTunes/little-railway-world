import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Matrix4,Vector3} from 'three';
import {createLocalLife,LIFE_LIMITS,selectLocalLife,fireflyHabitat} from '../src/local-life.js';
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
  const placements=[{kind:'sheep',id:'sheep',x:0,z:0,y:0,radius:.7},{kind:'tree',id:'tree-0',x:14,z:0,y:0,radius:1},
    {kind:'farmPatch',id:'farm',x:4,z:8,y:0,radius:4}];
  const life=createLocalLife(new Group(),plane),options={placements,focus:{x:0,z:0},revision:1};
  life.update(5,options);const atFive=snapshot(life),versions=life.root.children.map(batch=>batch.instanceMatrix.version);
  assert.equal(life.stats.sheep,1);assert.equal(life.stats.birds,3);assert.equal(life.stats.butterflies,1);assert.equal(life.stats.fireflies,placements.reduce((count,item)=>count+(['tree','farmPatch'].includes(item.kind)?fireflyHabitat(item).count:0),0));
  assert.equal(life.stats.instances,5+life.stats.fireflies);
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
  for(const batch of life.root.children)if(!batch.name.startsWith('local-swallow')&&batch.name!=='woodland-fireflies')assert.equal(batch.count,0,'evicted ground scenery leaves no floating ground animals');
  assert.equal(life.stats.birds,3,'birds keep flying when their ground chunk leaves the view');
  life.dispose();assert.equal(life.root.parent,null);
});

test('visible flocks retain their flight paths through panning, chunk removal and rehydration',()=>{
  const placements=Array.from({length:28},(_,i)=>({kind:'tree',id:`tree-${i}`,x:i%7*14,z:Math.floor(i/7)*14,y:0}));
  const life=createLocalLife(new Group(),plane),birds=life.root.getObjectByName('local-swallow-bodies');
  life.update(10,{placements,focus:{x:35,z:20}});
  const initial=Array.from(birds.instanceMatrix.array),count=birds.count;
  assert.equal(count,LIFE_LIMITS.flocks*3);
  for(const [revision,candidates]of [[1,placements],[2,[]],[3,structuredClone(placements)]]){
    life.update(10,{placements:candidates,revision,focus:{x:42,z:20}});
    assert.equal(birds.count,count,'streaming and reordered distance selection cannot replace or duplicate birds');
    assert.deepEqual(Array.from(birds.instanceMatrix.array),initial,'same time means exactly the same airborne positions');
  }
  life.update(10.01,{placements:[],focus:{x:42,z:20}});
  for(let i=0;i<count;i++)assert.ok(new Vector3().setFromMatrixPosition(matrix(birds,i)).distanceTo(new Vector3().fromArray(initial,i*16+12))<.015,'flight is continuous');
  life.update(11,{placements,focus:{x:500,z:0}});assert.equal(birds.count,0,'distant anchors retire within the fixed budget');
  life.dispose();
});

test('bird distance fading remains continuous during sub-threshold camera movement while paused',()=>{
  const placements=[{kind:'tree',id:'nest',x:0,z:0,y:0}],life=createLocalLife(new Group(),plane);
  const birds=life.root.getObjectByName('local-swallow-bodies'),wings=life.root.getObjectByName('local-swallow-wings');
  life.update(10,{placements,focus:{x:0,z:0}});
  const positions=Array.from(birds.instanceMatrix.array);let previous=1;
  for(let x=131;x<174;x+=.5){
    life.update(10,{placements,focus:{x,z:0}});
    const value=birds.geometry.attributes.lifeVisibility.getX(0);
    assert.ok(value<previous&&previous-value<.04,'feather tracks every half-unit pan, including frozen simulation frames');previous=value;
    assert.deepEqual(Array.from(birds.instanceMatrix.array),positions,'fading does not move the birds');
    assert.equal(wings.geometry.attributes.lifeVisibility.getX(0),value);
  }
  life.update(10,{placements,focus:{x:182,z:0}});assert.equal(birds.count,0);
  life.dispose();
});

test('persistent flock distance uses physical globe distance across the date line',()=>{
  const nest=surfaceChartCoordinates(globe,179.9,72),placements=[{kind:'tree',id:'arctic-nest',...nest,y:0}];
  const life=createLocalLife(new Group(),globe),birds=life.root.getObjectByName('local-swallow-bodies');
  life.update(3,{placements,focus:nest});const initial=Array.from(birds.instanceMatrix.array);
  life.update(3,{placements:[],revision:1,focus:surfaceChartCoordinates(globe,-179.9,72)});
  assert.equal(birds.count,3);assert.deepEqual(Array.from(birds.instanceMatrix.array),initial);
  assert.equal(birds.geometry.attributes.lifeVisibility.getX(0),1);
  life.dispose();
});

test('reduced motion reveals newly streamed birds immediately even when simulation time is paused',()=>{
  const life=createLocalLife(new Group(),plane),placements=[{kind:'tree',id:'new-nest',x:0,z:0,y:0}];
  const birds=life.root.getObjectByName('local-swallow-bodies');
  life.update(0,{placements:[]});life.update(1,{placements});
  assert.equal(birds.geometry.attributes.lifeVisibility.getX(0),0,'new flocks normally fade in');
  life.update(1,{placements,reducedMotion:true});
  assert.equal(birds.geometry.attributes.lifeVisibility.getX(0),1,'preference changes bypass a paused animation upload guard');
  life.dispose();
});

test('sheep walk between grazing spots with continuous motion inside their reserved ground envelope',()=>{
  for(const world of [plane,globe]){
    const center=world===plane?{x:4,z:7}:surfaceChartCoordinates(globe,28,76);
    const sheep={kind:'sheep',id:'roaming-ram',...center,y:.07,radius:2.1,roamRadius:1.4};
    const life=createLocalLife(new Group(),world),wool=life.root.getObjectByName('grazing-sheep-wool');
    const origin=surfacePoint(world,center.x,sheep.y,center.z),up=surfacePoint(world,center.x,sheep.y+1,center.z).sub(origin).normalize();
    let previous=null,farthest=0,first=null,walked=0,rested=0;
    for(let frame=0;frame<900;frame++){
      life.update(frame/10,{placements:[sheep],focus:center});
      const p=new Vector3().setFromMatrixPosition(matrix(wool));
      if(!first)first=p.clone();farthest=Math.max(farthest,p.distanceTo(first));
      if(previous){const distance=p.distanceTo(previous);assert.ok(distance<.06,'no jumps at walk/graze boundaries');if(distance>.005)walked++;if(distance<.001)rested++;}previous=p;
      for(const object of life.root.children.filter(batch=>batch.name.startsWith('grazing-sheep')))for(let index=0;index<object.count;index++){
        const transform=matrix(object,index),vertices=object.geometry.attributes.position;
        for(let vertex=0;vertex<vertices.count;vertex++){
          const delta=new Vector3().fromBufferAttribute(vertices,vertex).applyMatrix4(transform).sub(origin);
          assert.ok(delta.clone().addScaledVector(up,-delta.dot(up)).length()<sheep.radius,'whole moving animal stays inside the clear disk');
          assert.ok(delta.dot(up)>-.004,'walking feet remain above the field');
        }
      }
    }
    assert.ok(farthest>.7,'animals explore their pasture instead of trembling in place');assert.ok(walked>100&&rested>80,'walking alternates with grazing');
    life.dispose();
  }
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


test('fireflies inhabit irregular low clusters with independent flashes and stable streamed identities',()=>{
  const placements=Array.from({length:40},(_,index)=>({kind:'tree',id:`firefly-habitat-${index}`,x:index%8*5,z:Math.floor(index/8)*5,y:0}));
  const populations=placements.map(item=>fireflyHabitat(item).count);
  assert.ok(populations.includes(0),'some trees have no fireflies');assert.ok(new Set(populations).size>=4,'occupied habitats differ in population');
  const life=createLocalLife(new Group(),plane),glows=life.root.getObjectByName('woodland-fireflies');
  life.update(4,{placements,focus:{x:10,z:10},night:1});
  assert.ok(glows.count>8&&glows.count<=LIFE_LIMITS.fireflies);
  const snapshot=Array.from(glows.instanceMatrix.array),centers=Array.from({length:glows.count},(_,i)=>new Vector3().setFromMatrixPosition(matrix(glows,i)));
  assert.ok(centers.every(p=>p.y>.15&&p.y<2.1),'insects live below the canopy instead of making an artificial ceiling');
  assert.ok(Math.max(...centers.map(p=>p.y))-Math.min(...centers.map(p=>p.y))>1,'height varies within and between clusters');
  const visibility=glows.geometry.attributes.lifeVisibility;
  assert.ok(new Set(Array.from(visibility.array.subarray(0,glows.count)).map(value=>Math.round(value*100))).size>8,'each insect flashes independently');
  const count=glows.count;
  life.update(4,{placements:[],revision:1,focus:{x:12,z:10},night:1});
  assert.equal(glows.count,count);assert.deepEqual(Array.from(glows.instanceMatrix.array),snapshot,'ground tile eviction cannot teleport a glow');
  life.update(4.01,{placements,revision:2,focus:{x:12,z:10},night:1});
  centers.forEach((center,i)=>assert.ok(center.distanceTo(new Vector3().setFromMatrixPosition(matrix(glows,i)))<.01,'drift is continuous'));
  assert.match(glows.material.vertexShader,/lifeVisibility/);assert.match(glows.material.fragmentShader,/night\*faunaVisibility/);
  life.update(5,{placements:[],focus:{x:300,z:300},night:1});assert.equal(glows.count,0,'retired habitats free the fixed budget');life.dispose();
});

test('sheep upper legs enter their fleece, joints stay connected and supporting hooves stay planted',()=>{
  const sheep={kind:'sheep',id:'leg-check',x:0,z:0,y:0,radius:2.1,roamRadius:1.4};
  const life=createLocalLife(new Group(),plane),legs=life.root.getObjectByName('grazing-sheep-feet');
  const top=new Vector3(),bottom=new Vector3(),nextTop=new Vector3();let stepping=0,planted=0;
  for(let frame=0;frame<400;frame++){
    life.update(frame*.1,{placements:[sheep],focus:sheep});
    assert.equal(legs.count,12,'four connected upper/lower/hoof assemblies share one batch');
    for(let leg=0;leg<4;leg++){
      const upper=matrix(legs,leg*3),lower=matrix(legs,leg*3+1),hoof=matrix(legs,leg*3+2);
      top.set(0,.5,0).applyMatrix4(upper);assert.ok(top.y>.24,'upper leg penetrates the underside of the fleece');
      bottom.set(0,-.5,0).applyMatrix4(upper);nextTop.set(0,.5,0).applyMatrix4(lower);
      assert.ok(bottom.distanceTo(nextTop)<.009,'both segments overlap at the actual knee');
      bottom.set(0,-.5,0).applyMatrix4(lower);nextTop.set(0,0,0).applyMatrix4(hoof);
      assert.ok(bottom.distanceTo(nextTop)<.01,'hoof remains attached to the lower leg');
      bottom.set(0,-.5,0).applyMatrix4(hoof);
      assert.ok(bottom.y>-.0001,'hoof never clips below pasture');
      if(bottom.y<.001)planted++;else if(bottom.y>.01)stepping++;
    }
  }
  assert.ok(planted>400&&stepping>50,'hoof support alternates with a visible recovery arc');life.dispose();
});
