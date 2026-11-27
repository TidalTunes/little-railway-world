import test from 'node:test';
import assert from 'node:assert/strict';
import {loopHudState,loopCargo} from '../src/loop-hud-state.js';
const loop={id:'round-trip',cityIds:['home','farm','mine'],cost:30,stops:[{cityId:'farm',resource:'food'},{cityId:'mine',resource:'metal'},{cityId:'home',resource:'wood'},{cityId:'farm',resource:'food'}]};
const city={id:'home',ownerId:'teal',level:2,houseCount:6,resource:'wood',loops:[loop]};
test('circuit yield counts each visited city once and includes the home pickup',()=>{assert.deepEqual(loopCargo(loop,city),{wood:10,metal:10,food:10});assert.deepEqual(loopCargo({...loop,stops:[{cityId:'farm',resource:'gold'}]},{...city,resource:'gold'}),{wood:0,metal:0,food:0});});
test('purchase eligibility requires an owned complete circuit and enough gold',()=>{
  assert.equal(loopHudState({city,ownerId:'teal',resources:{gold:29},walking:false}).canBuy,false);
  assert.equal(loopHudState({city,ownerId:'teal',resources:{gold:30},walking:false}).canBuy,true);
  assert.equal(loopHudState({city,ownerId:'other',resources:{gold:999},walking:false}).canBuy,false);
  assert.equal(loopHudState({city:{...city,loops:[]},ownerId:'teal',resources:{gold:999},walking:false}).canBuy,false);
});
test('walking remains compact and a removed selected circuit falls back to a valid circuit',()=>{
  const state=loopHudState({city,ownerId:'teal',selectedLoopId:'removed',walking:true});assert.equal(state.selected.id,loop.id);assert.equal(state.compact,true);assert.equal(state.showRoutes,false);
  const homestead=loopHudState({houses:4,ownerId:'teal'});assert.equal(homestead.houseCount,4);assert.equal(homestead.station,false);
});
