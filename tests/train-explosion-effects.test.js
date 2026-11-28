import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Matrix4} from 'three';
import {createTrainExplosionEffects} from '../src/train-explosion-effects.js';

const event=(id='loss')=>({id,trainId:id,ownerId:'teal',x:12,y:.42,z:-8,angle:.4});
function fixture(){
  const root=new Group(),map=new Group(),effects=createTrainExplosionEffects(root,map,{players:[{id:'teal',color:{l:.6,c:.14,h:172}}]});
  return{root,map,effects};
}

test('train destruction makes a small, bounded burst in either layer and never replays the same event',()=>{
  const {root,map,effects}=fixture();
  assert.equal(effects.emit(event()),true);assert.equal(effects.emit(event()),false);
  effects.update(.12,{mapBlend:0});assert.ok(effects.stats.particles>0);assert.equal(root.children[0].visible,true);assert.equal(map.children[0].visible,false);
  const pose=new Matrix4();root.children[0].getMatrixAt(0,pose);assert.ok(pose.elements.every(Number.isFinite));
  assert.ok(Math.abs(pose.elements[12]-12)<2);assert.ok(Math.abs(pose.elements[14]+8)<2);
  effects.update(.1,{mapBlend:1});assert.equal(root.children[0].visible,false);assert.equal(map.children[0].visible,true);
  effects.update(3);assert.equal(effects.stats.bursts,0);assert.equal(effects.stats.particles,0);assert.equal(root.children[0].visible,false);
  const version=root.children[0].instanceMatrix.version;effects.update(1);assert.equal(root.children[0].instanceMatrix.version,version,'idle frames do not upload effect buffers');
  effects.dispose();assert.equal(root.children.length,0);assert.equal(map.children.length,0);assert.equal(effects.emit(event('after')),false);
});

test('simultaneous bankrupt trains cannot allocate unbounded particles or duplicate history',()=>{
  const {effects,root}=fixture();
  for(let i=0;i<300;i++)effects.emit(event(`loss:${i}`));
  effects.update(.05);assert.equal(effects.stats.bursts,8);assert.equal(effects.stats.capacity,192);assert.ok(effects.stats.particles<=192);assert.equal(effects.stats.remembered,128);
  const geometry=root.children[0].geometry;effects.update(.5);assert.equal(root.children[0].geometry,geometry);effects.dispose();
});

test('reduced motion uses a short smoke fade and invalid positions cannot poison GPU matrices',()=>{
  const {effects}=fixture();assert.equal(effects.emit({...event(),x:NaN}),false);assert.equal(effects.emit({...event(),z:Infinity}),false);
  effects.emit(event());effects.update(.1,{reducedMotion:true});assert.equal(effects.stats.particles,10);
  effects.update(.4,{reducedMotion:true});assert.equal(effects.stats.bursts,0);assert.equal(effects.stats.particles,0);effects.dispose();
});
