import test from 'node:test';
import assert from 'node:assert/strict';
import {loopHudState,loopCargo,loopResourceLabel} from '../src/loop-hud-state.js';
const loop={id:'round-trip',cityIds:['home','farm','mine'],cost:30,stops:[{cityId:'farm',resource:'food'},{cityId:'mine',resource:'resources'},{cityId:'home',resource:'resources'},{cityId:'farm',resource:'food'}]};
const city={id:'home',ownerId:'teal',level:2,houseCount:6,resource:'resources',loops:[loop]};
test('resource labels and historical wood or metal stops share one materials yield',()=>{
  assert.equal(loopResourceLabel('resources'),'Resources');assert.equal(loopResourceLabel('food'),'Food');
  assert.deepEqual(loopCargo({stops:[{cityId:'forest',resource:'wood'},{cityId:'desert',resource:'metal'}]}),{resources:4,food:0});
});
test('circuit yield counts each visited city once and includes the home pickup',()=>{assert.deepEqual(loopCargo(loop,city),{resources:4,food:2});assert.deepEqual(loopCargo({...loop,stops:[{cityId:'farm',resource:'gold'}]},{...city,resource:'gold'}),{resources:0,food:0});});
test('having complete routes does not select or enable a train purchase until a route is clicked',()=>{
  const state=loopHudState({city,ownerId:'teal',resources:{resources:999},walking:false});
  assert.equal(state.selected,null);assert.equal(state.canBuy,false);assert.equal(state.showRoutes,false);
  assert.equal(state.city,city);assert.deepEqual(state.loops,[loop]);assert.equal(state.cost,0);
  assert.deepEqual(state.cargo,{resources:0,food:0});
});

test('purchase eligibility requires an explicitly selected owned circuit and enough resources',()=>{
  const props={city,ownerId:'teal',selectedLoopId:loop.id,walking:false};
  const short=loopHudState({...props,resources:{resources:29}});
  assert.equal(short.canBuy,false);assert.equal(short.shortfall,1);assert.equal(short.cost,30);
  const ready=loopHudState({...props,resources:{resources:30}});
  assert.equal(ready.canBuy,true);assert.equal(ready.showRoutes,true);assert.equal(ready.selected,loop);
  assert.equal(ready.shortfall,0);assert.deepEqual(ready.cargo,{resources:4,food:2});
  for(const stock of [NaN,Infinity,undefined])assert.equal(loopHudState({...props,resources:{resources:stock}}).canBuy,false);
  assert.equal(loopHudState({...props,city:{...city,loops:[]},resources:{resources:999}}).canBuy,false);
  assert.equal(loopHudState({...props,resources:{resources:0,resourceNet:999,gold:999}}).canBuy,false,'only spendable resources pay for a train');
});

test('train quotes without a cached cost use the shared engine and cargo-car price',()=>{
  const uncached={...loop,cost:undefined},state=loopHudState({city:{...city,loops:[uncached]},ownerId:'teal',selectedLoopId:loop.id,walking:false,resources:{resources:20}});
  assert.equal(state.cost,20);assert.equal(state.costResource,'resources');assert.equal(state.canBuy,true);
});

test('a removed selected circuit clears selection instead of switching purchases to another route',()=>{
  const remaining={...loop,id:'remaining'},state=loopHudState({city:{...city,loops:[remaining]},ownerId:'teal',selectedLoopId:loop.id,walking:false,resources:{resources:999}});
  assert.equal(state.selected,null);assert.equal(state.showRoutes,false);assert.equal(state.canBuy,false);
  assert.equal(state.cost,0);assert.deepEqual(state.cargo,{resources:0,food:0});
});

test('walking is compact and cannot purchase even with a funded circuit selected',()=>{
  const state=loopHudState({city,ownerId:'teal',selectedLoopId:loop.id,walking:true,resources:{resources:999}});
  assert.equal(state.selected,loop);assert.equal(state.compact,true);assert.equal(state.showRoutes,false);assert.equal(state.canBuy,false);
  const homestead=loopHudState({houses:4,ownerId:'teal'});
  assert.equal(homestead.houseCount,4);assert.equal(homestead.station,false);assert.equal(homestead.canBuy,false);
});

test('selecting an owned circuit inspects its home city even after inspecting another city',()=>{
  const farm={id:'farm',ownerId:'gray',neutral:true,resource:'food',level:2,houseCount:6,loops:[]};
  const state=loopHudState({city:farm,ownCity:city,ownerId:'teal',selectedLoopId:loop.id,walking:false,resources:{resources:30}});
  assert.equal(state.city,city);assert.equal(state.owned,true);assert.equal(state.resource,'resources');
  assert.equal(state.selected,loop);assert.equal(state.canBuy,true);assert.equal(state.showRoutes,true);
  assert.deepEqual(state.cargo,{resources:4,food:2});
  const inspected=loopHudState({city:farm,ownCity:city,ownerId:'teal',walking:false,resources:{resources:30}});
  assert.equal(inspected.city,farm);assert.equal(inspected.owned,false);assert.equal(inspected.selected,null);assert.equal(inspected.canBuy,false);
});

test('a foreign city or its circuit cannot become a purchase target',()=>{
  const foreignLoop={...loop,id:'foreign-route'},foreign={...city,id:'rival',ownerId:'coral',loops:[foreignLoop]};
  const props={city:foreign,ownerId:'teal',selectedLoopId:foreignLoop.id,walking:false,resources:{resources:999}};
  for(const supplied of [{},{ownCity:city},{ownCity:foreign}]){
    const state=loopHudState({...props,...supplied});
    assert.equal(state.canBuy,false);assert.equal(state.owned,false);assert.equal(state.showRoutes,false);
  }
  assert.equal(loopHudState(props).selected,null);
  assert.equal(loopHudState({...props,ownCity:city}).selected,null);
});


test('only player-owned stations quote the per-visit Resources bonus',()=>{
  const args={ownerId:'teal',walking:false};
  assert.equal(loopHudState({...args,city}).stationBonus,2);
  assert.equal(loopHudState({...args,city:{...city,ownerId:'coral'}}).stationBonus,2,'rival player stations earn the same reward');
  assert.equal(loopHudState({...args,city:{...city,neutral:true}}).stationBonus,0);
  assert.equal(loopHudState({...args,city:{...city,resource:'food',ownerId:'gray'}}).stationBonus,0);
  assert.equal(loopHudState({...args,city:{...city,level:1}}).stationBonus,0);
});
