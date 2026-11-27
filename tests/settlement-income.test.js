import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame} from '../src/settlement-game.js';
import {createDayCalendar,completedDayCount} from '../src/day-cycle.js';
const make=()=>createSettlementGame({seed:'income',gameplay:{ownerId:'teal',starterHouse:{id:'home-1',kind:'house',x:0,y:0,z:0,rotation:0}}},{surfaceAt:()=>({type:'ground',height:0})});
function build(game,x,z){while(game.logs<10)game.chop({id:`timber-${game.revision}`,kind:'tree',x:70,z:70});const result=game.build({x,z});assert.equal(result.ok,true,result.reason);return result;}
function city(game,x=0){if(x)build(game,x,0);build(game,x+5,0);build(game,x,5);}

test('only formed city homes earn gold; outposts, civic buildings and NPCs do not enter income',()=>{
  const game=make();assert.equal(game.gold,0);build(game,5,0);
  assert.equal(game.settleIncome(1).amount,0);assert.equal(game.gold,0);
  build(game,0,5);assert.equal(game.cities.length,1);assert.ok(game.buildings.length>0);
  build(game,60,0);assert.equal(game.houses.length,4);
  const earned=game.settleIncome(2);assert.equal(earned.amount,3);assert.equal(earned.houses.length,3);assert.equal(game.gold,3);
  assert.ok(earned.houses.every(home=>home.cityId&&home.kind==='house'));
});

test('each sunset pays once, including manual phase skips and automatic continuation',()=>{
  const game=make(),clock=createDayCalendar();city(game);
  assert.equal(game.settleIncome(clock.read(299).completedDays),null);
  assert.equal(game.settleIncome(clock.advance(299).completedDays).amount,3);
  assert.equal(game.settleIncome(clock.read(299).completedDays),null);
  assert.equal(clock.read(300).phase,'night');assert.equal(game.settleIncome(clock.read(300).completedDays),null);
  assert.equal(clock.advance(301).phase,'day');assert.equal(game.settleIncome(clock.read().completedDays),null);
  assert.equal(game.settleIncome(clock.advance(302).completedDays).amount,3);assert.equal(game.gold,6);
  assert.equal(game.settleIncome(clock.read(602).completedDays),null,'dawn adds no gold');
  assert.equal(game.settleIncome(clock.read(902).completedDays).amount,3);assert.equal(game.gold,9);
});

test('income totals every owned city and catches up missed days without replaying rewards',()=>{
  const game=make();city(game);city(game,30);build(game,70,0);
  assert.equal(game.cities.length,2);
  const payout=game.settleIncome(3);assert.equal(payout.days,3);assert.equal(payout.amount,18);assert.equal(payout.houses.length,6);
  const before=game.snapshot();for(const invalid of [3,2,0,-1,1.5,Infinity,NaN,undefined])assert.equal(game.settleIncome(invalid),null);
  assert.deepEqual(game.snapshot(),before);assert.equal(game.settleIncome(4).amount,6);
  payout.houses[0].cityId=null;assert.ok(game.houses[0].cityId,'notification data cannot modify the economy');
});

test('a home added after sunset only earns starting with the next sunset',()=>{
  const game=make();city(game);assert.equal(game.settleIncome(1).amount,3);
  build(game,-5,0);assert.equal(game.settleIncome(1),null);assert.equal(game.settleIncome(2).amount,4);assert.equal(game.gold,7);
});

test('calendar skips remain monotonic and preserve full five-minute phases',()=>{
  const clock=createDayCalendar();assert.equal(clock.read(20).elapsedSeconds,20);
  let state=clock.advance(20);assert.equal(state.elapsedSeconds,300);assert.equal(state.completedDays,1);assert.equal(state.phase,'night');
  state=clock.read(319.999);assert.equal(state.phase,'night');
  state=clock.read(320);assert.equal(state.phase,'day');assert.equal(state.completedDays,1);
  assert.equal(clock.read(0).elapsedSeconds,600,'a backwards wall sample cannot rewind time');
  assert.equal(clock.advance(320).elapsedSeconds,900);assert.equal(clock.read().completedDays,2);
  for(const time of [-1,0,299.999,300,899.999,900,1500])assert.equal(completedDayCount(time),Math.max(0,Math.floor((time+300)/600)));
});


test('manual skips anchor exact phase boundaries at fractional wall-clock times',()=>{
  for(let sample=0;sample<256;sample++){
    const clock=createDayCalendar();let wall=sample*.123456789;
    clock.read(wall);
    for(let skip=1;skip<=6;skip++){
      wall+=.127438237;
      const state=clock.advance(wall);
      assert.equal(state.elapsedSeconds,skip*300,'manual boundaries cannot round below the target');
      assert.equal(state.phase,skip%2?'night':'day');
      assert.equal(state.completedDays,Math.ceil(skip/2));
      assert.equal(clock.read().elapsedSeconds,skip*300,'an immediate reread retains the exact boundary');
    }
  }
});
