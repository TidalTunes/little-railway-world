import test from 'node:test';
import assert from 'node:assert/strict';
import {settlementHudProgress,settlementHudRailway,settlementHudConstruction} from '../src/settlement-hud.js';

test('construction guidance distinguishes timber and tools instead of claiming timber is enough',()=>{
  const buildCost={timber:8,tools:2},input={economic:true,logs:8,buildCost};
  const missing=settlementHudConstruction({...input,resources:{tools:0}});
  assert.equal(missing.affordable,false);assert.equal(missing.costLabel,'8 timber + 2 tools');assert.equal(missing.readiness,'Need 2 more tools.');
  const ready=settlementHudConstruction({...input,resources:{tools:2}});assert.equal(ready.affordable,true);assert.equal(ready.readiness,'Timber and tools ready.');
  const unknown=settlementHudConstruction(input);assert.equal(unknown.affordable,false);assert.equal(unknown.readiness,'Timber ready; 2 tools also required.');
  const both=settlementHudConstruction({...input,logs:5,resources:{tools:1}});assert.equal(both.shortage,'Need 3 more timber and 1 more tool');assert.ok(!both.readiness.includes('logs'));
  const legacy=settlementHudConstruction({logs:10});assert.equal(legacy.affordable,true);assert.equal(legacy.costLabel,'10 logs');assert.equal(legacy.readiness,'Enough logs gathered.');
});

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
  assert.equal(empty.status,'3 homes to start');
  assert.equal(empty.canBuild,false);assert.equal(empty.showConfirm,false);
  const source=settlementHudRailway({hasCity:true,stage:'source',canBuild:true},{gold:20});
  assert.equal(source.selection,'Choose a city, station end or track');
  assert.equal(source.canBuild,false);assert.equal(source.showConfirm,false);
  const destination=settlementHudRailway({hasCity:true,stage:'destination',sourceLabel:'Pine Town',canBuild:true},{gold:20});
  assert.equal(destination.selection,'Pine Town → …');
  assert.equal(destination.canBuild,false);assert.equal(destination.showConfirm,false);
  assert.equal(destination.status,'Choose a city, station end or track');
  assert.equal(settlementHudRailway({hasCity:true,stage:'destination'},{gold:0}).status,destination.status,'free route exploration keeps its interaction hint before purchase');
  const hover=settlementHudRailway({hasCity:true,stage:'destination',hovering:true,siteValid:true,sourceLabel:'Pine Town',targetLabel:'River Village',reason:'Connect these cities'},{gold:0});
  assert.equal(hover.selection,'Pine Town → River Village');assert.equal(hover.status,'Click or release to shape route');
  assert.equal(hover.statusKind,'info');assert.equal(hover.canBuild,false);assert.equal(hover.showConfirm,false);
});

test('railway confirmation requires a ready, valid, affordable preview',()=>{
  const preview={stage:'preview',hasCity:true,siteValid:true,canBuild:true,sourceLabel:'Pine Town',targetLabel:'River Village',cost:5,code:'ready',reason:'Connect these cities'};
  const ready=settlementHudRailway(preview,{gold:5});
  assert.equal(ready.canBuild,true);assert.equal(ready.showConfirm,true);
  assert.equal(ready.selection,'Pine Town → River Village');
  assert.equal(ready.status,'Drag dots to shape the line');assert.equal(ready.statusKind,'success');
  for(const gold of [0,4,4.9,NaN,Infinity]){
    const state=settlementHudRailway(preview,{gold});
    assert.equal(state.canBuild,false);assert.equal(state.showConfirm,true);
    assert.match(state.status,/more gold needed/);assert.equal(state.statusKind,'cost');
  }
  const loading=settlementHudRailway(preview,{gold:20,ready:false});
  assert.equal(loading.canBuild,false);assert.equal(loading.status,'Preparing…');
  const noCity=settlementHudRailway({...preview,hasCity:false},{gold:20});
  assert.equal(noCity.canBuild,false);assert.equal(noCity.status,'3 homes to start');
  const blocked=settlementHudRailway({...preview,siteValid:false,canBuild:false,code:'route-blocked',reason:'The route crosses a house.'},{gold:20});
  assert.equal(blocked.canBuild,false);assert.equal(blocked.status,'The route crosses a house');
  assert.equal(blocked.statusKind,'error');
});

test('missing gold is a cost hint and earning it never changes geometric validity',()=>{
  const route={stage:'preview',hasCity:true,siteValid:true,canBuild:false,cost:5,code:'not-enough-gold',reason:'A railway costs 5 gold'};
  const short=settlementHudRailway(route,{gold:3});
  assert.equal(short.status,'2 more gold needed');assert.equal(short.statusKind,'cost');
  assert.equal(short.missingGold,2);assert.equal(short.affordable,false);assert.equal(short.canBuild,false);
  const funded=settlementHudRailway({...route,canBuild:true,code:'ready'},{gold:5});
  assert.equal(funded.affordable,true);assert.equal(funded.missingGold,0);assert.equal(funded.canBuild,true);assert.equal(funded.statusKind,'success');
  const stillUnchecked=settlementHudRailway(route,{gold:5});
  assert.equal(stillUnchecked.canBuild,false,'funding cannot bypass controller validation');
  assert.equal(stillUnchecked.statusKind,'info');assert.equal(stillUnchecked.status,'Checking route…');
});

test('an impossible local bend stays an error during dragging regardless of the wallet',()=>{
  const bend={stage:'planning',hasCity:true,siteValid:false,canBuild:false,code:'invalid-alignment',reason:'Give this bend more room.'};
  for(const gold of [0,3,5,100]){
    const state=settlementHudRailway(bend,{gold});
    assert.equal(state.status,'Give this bend more room');assert.equal(state.statusKind,'error');assert.equal(state.canBuild,false);
  }
  const selected=settlementHudRailway({...bend,stage:'preview'},{gold:3});
  assert.equal(selected.status,'Give this bend more room','a shortfall does not hide an impossible placement');
  assert.equal(selected.statusKind,'error');
});

test('range failures explain the unavailable city while hovering or selected, independently of gold',()=>{
  for(const stage of ['destination','preview'])for(const gold of [0,5,100]){
    const state=settlementHudRailway({stage,hovering:stage==='destination',hasCity:true,siteValid:false,canBuild:false,
      code:'out-of-range',reason:'City is outside railway range'},{gold});
    assert.equal(state.status,'City is outside railway range');assert.equal(state.statusKind,'error');
    assert.equal(state.canBuild,false);assert.equal(state.showConfirm,stage==='preview');
  }
});

test('worker and stale-world failures do not claim that placement is impossible',()=>{
  for(const code of ['planning-failed','world-changed']){
    const route={stage:'preview',hasCity:true,siteValid:false,canBuild:false,code,reason:'Route checks could not finish.'};
    const state=settlementHudRailway(route,{gold:20});
    assert.equal(state.status,'Route checks could not finish');assert.equal(state.statusKind,'info');assert.equal(state.canBuild,false);
  }
  const pending=settlementHudRailway({stage:'planning',hasCity:true,siteValid:true,canBuild:false,code:'not-enough-gold'},{gold:3});
  assert.equal(pending.status,'Checking route…');assert.equal(pending.statusKind,'info');assert.equal(pending.canBuild,false);
});


test('loop construction and railway guidance use wood and the six-home station milestone',()=>{
  const state=settlementHudConstruction({economic:'loops',logs:5,buildCost:{timber:8,tools:0},resources:{wood:5,metal:20,food:10,gold:60}});
  assert.equal(state.costLabel,'8 wood');assert.equal(state.shortage,'Need 3 more wood');assert.equal(state.affordable,false);
  assert.equal(settlementHudConstruction({economic:'loops',logs:8,buildCost:{wood:8}}).affordable,true);
  assert.equal(settlementHudRailway({minHomes:6,hasCity:false}).status,'6 homes to unlock a station');
  const reverse=settlementHudRailway({stage:'preview',hasCity:true,siteValid:true,canBuild:true,canReverse:true,reversed:true,sourceLabel:'Village',targetLabel:'Your city',cost:11},{gold:60});
  assert.equal(reverse.selection,'Village → Your city');assert.equal(reverse.canReverse,true);assert.equal(reverse.reversed,true);assert.equal(reverse.canBuild,true);
});
