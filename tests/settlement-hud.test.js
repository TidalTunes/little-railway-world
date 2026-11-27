import test from 'node:test';
import assert from 'node:assert/strict';
import {settlementHudProgress,settlementHudRailway} from '../src/settlement-hud.js';

test('HUD city growth uses homes through each of the five three-home milestones',()=>{
  for(let houses=0;houses<=18;houses++){
    const state=settlementHudProgress(houses);
    assert.equal(state.level,Math.min(5,Math.floor(houses/3)));
    assert.equal(state.houses,houses);
    assert.equal(state.complete,houses>=15);
    if(houses<15){
      assert.equal(state.next,(state.level+1)*3);
      assert.equal(state.progress,(houses%3)/3);
    }else{
      assert.equal(state.next,null);assert.equal(state.progress,1);
    }
  }
});

test('HUD keeps incomplete outposts at level zero and handles unavailable counts',()=>{
  assert.deepEqual(settlementHudProgress(2),{houses:2,level:0,complete:false,progress:2/3,next:3});
  for(const value of [undefined,NaN,Infinity,-3])assert.deepEqual(settlementHudProgress(value),{houses:0,level:0,complete:false,progress:0,next:3});
});

test('railway guidance starts with a formed owned city and never offers an endpoint purchase',()=>{
  const empty=settlementHudRailway(null,{gold:20});
  assert.equal(empty.stage,'source');assert.equal(empty.cost,5);
  assert.equal(empty.status,'Grow to 3 homes first');
  assert.equal(empty.canBuild,false);assert.equal(empty.showConfirm,false);
  const source=settlementHudRailway({hasCity:true,stage:'source',canBuild:true},{gold:20});
  assert.equal(source.selection,'Choose one of your cities');
  assert.equal(source.canBuild,false);assert.equal(source.showConfirm,false);
  const destination=settlementHudRailway({hasCity:true,stage:'destination',sourceLabel:'Pine Town',canBuild:true},{gold:20});
  assert.equal(destination.selection,'Pine Town → choose a destination');
  assert.equal(destination.canBuild,false);assert.equal(destination.showConfirm,false);
});

test('railway confirmation requires a ready, valid, affordable preview',()=>{
  const preview={stage:'preview',hasCity:true,canBuild:true,sourceLabel:'Pine Town',targetLabel:'River Village',cost:5,reason:'Connect these cities'};
  const ready=settlementHudRailway(preview,{gold:5});
  assert.equal(ready.canBuild,true);assert.equal(ready.showConfirm,true);
  assert.equal(ready.selection,'Pine Town → River Village');
  assert.equal(ready.status,'Ready to build');assert.equal(ready.statusKind,'success');
  for(const gold of [0,4,4.9,NaN,Infinity]){
    const state=settlementHudRailway(preview,{gold});
    assert.equal(state.canBuild,false);assert.equal(state.showConfirm,true);
    assert.match(state.status,/more gold needed/);assert.equal(state.statusKind,'error');
  }
  const loading=settlementHudRailway(preview,{gold:20,ready:false});
  assert.equal(loading.canBuild,false);assert.equal(loading.status,'Preparing railway');
  const noCity=settlementHudRailway({...preview,hasCity:false},{gold:20});
  assert.equal(noCity.canBuild,false);assert.equal(noCity.status,'Grow to 3 homes first');
  const blocked=settlementHudRailway({...preview,canBuild:false,reason:'The route crosses a house.'},{gold:20});
  assert.equal(blocked.canBuild,false);assert.equal(blocked.status,'The route crosses a house');
  assert.equal(blocked.statusKind,'error');
});
