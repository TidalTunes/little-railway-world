import test from 'node:test';
import assert from 'node:assert/strict';
import {runEconomyBenchmarks,simulateStrategy} from '../scripts/simulate-economy.mjs';
import {LOOP_ECONOMY_RULES as RULES,loopTrainCost} from '../src/loop-economy-rules.js';

function assertConserved(row,{openingGold=RULES.startGold}={}){
  const {trade,accounting}=row;
  for(const [resource,balance] of Object.entries(accounting)){
    assert.equal(balance.error,0,`${row.scenario} ${row.strategy} conserves ${resource}`);
    assert.ok(balance.wallets>=0);
  }
  assert.equal(accounting.gold.initial,openingGold+RULES.startGold);
  assert.equal(accounting.gold.wallets+accounting.gold.escrow,accounting.gold.initial,'coins only move between wallets and reserved train fares');
  assert.equal(trade.paid,(trade.withdrawn.resources+trade.withdrawn.food)/RULES.pickupStock*RULES.pickupGold,'only successful finite pickups pay suppliers');
  assert.equal(Object.values(trade.paymentByOwner).reduce((sum,amount)=>sum+amount,0),trade.paid);
  assert.equal(trade.reserved-trade.paid-trade.refunded,trade.escrowGold);
  assert.equal(trade.reserved,trade.departures*(row.cityCount-1)*RULES.pickupGold,'each departure reserves one fare per non-home destination');
  assert.equal(trade.refunded,trade.emptyVisits*RULES.pickupGold,'an empty stop returns its reserved fare');
  for(const resource of ['resources','food'])assert.equal(trade.pickups[resource],row.delivered[resource]+trade.aboard[resource],'picked goods are either aboard or actually delivered');
  for(const resource of ['resources','food']){assert.equal(trade.pickups[resource],trade.withdrawn[resource]+trade.minted[resource]);assert.equal(trade.minted[resource],trade.withdrawn[resource]);}
  assert.equal(trade.pickedByCity.home,undefined,'the locomotive never loads its own home city');
  assert.equal(row.resources,RULES.startResources-row.playerRails-row.trainCost+row.populationProduction.resources+row.delivered.resources);
  assert.equal(row.food,RULES.startFood+row.delivered.food);
  assert.equal(row.gold,openingGold-trade.paid-trade.escrowGold);
  const farm=row.suppliers.find(city=>city.id==='farm'),mine=row.suppliers.find(city=>city.id==='mine');
  assert.equal(farm.food,accounting.food.produced-(trade.withdrawnByCity.farm??0),'village harvests remain in that finite village stock until picked up');
  assert.equal(mine.resources,RULES.startResources-row.otherRails+row.populationProduction.resources-(trade.withdrawnByCity.mine??0),'imported Resources are removed from the supplier wallet');
  assert.equal(farm.gold,trade.paymentByOwner.gray??0);
  assert.equal(mine.gold,RULES.startGold+(trade.paymentByOwner.coral??0));
}

test('physical circuit benchmarks account for finite stocks, supplier payments and station dwell',()=>{
  const results=runEconomyBenchmarks({seconds:120});assert.equal(results.length,6);
  for(const row of results){
    assert.ok(row.laps>=1,`${row.scenario} ${row.strategy} completes its physical loop`);
    assert.deepEqual(row.populationProduction,{resources:12,food:0},'six residents produce on both daytime minute ticks');
    assert.equal(row.accounting.resources.produced,24);assert.equal(row.accounting.food.produced,12);
    assert.equal(row.trainCost,loopTrainCost(row.cityCount));assert.equal(row.trainCost,20);
    assertConserved(row);
    assert.ok(row.firstLap>row.length/RULES.speed,'acceleration and station pauses extend physical journey time');
    const stopAllowance=row.cityCount*(RULES.dwell+RULES.speed/RULES.acceleration+RULES.speed/RULES.deceleration)+2;
    assert.ok(row.firstLap<row.length/RULES.speed+stopAllowance,'a clear route makes progress without unexplained waiting');
  }
  const nearFood=results.find(row=>row.scenario==='near'&&row.strategy==='food-loop');
  assert.ok(nearFood.trade.emptyVisits>0,'the first train reaches an initially empty farm before its first harvest');
  assert.ok(nearFood.firstDelivery>nearFood.firstLap,'an empty return is not reported as a resource delivery');
});

test('fifteen-minute comparisons retain distinct strategies, distance costs and nighttime stock trading',()=>{
  const results=runEconomyBenchmarks({seconds:900});
  for(const row of results){
    assertConserved(row);assert.deepEqual(row.populationProduction,{resources:60,food:0});
    assert.deepEqual(row.timeline.map(point=>point.minute),[5,10,15]);
    assert.deepEqual(row.timeline[0].production,row.timeline[1].production,'night does not produce new goods');
    assert.ok(row.timeline[1].laps>row.timeline[0].laps,'trains continue trading existing stocks at night');
  }
  for(const scenario of ['near','distant']){
    const food=results.find(row=>row.scenario===scenario&&row.strategy==='food-loop');
    const resources=results.find(row=>row.scenario===scenario&&row.strategy==='resources-loop');
    const mixed=results.find(row=>row.scenario===scenario&&row.strategy==='mixed-loop');
    assert.equal(food.delivered.resources,0);assert.ok(food.delivered.food>mixed.delivered.food,'a dedicated food route brings more Food');
    assert.equal(resources.delivered.food,0);assert.ok(resources.delivered.resources>mixed.delivered.resources,'a dedicated materials route brings more Resources');
    assert.ok(mixed.delivered.food>0&&mixed.delivered.resources>0,'a mixed route supplies both growth inputs');
    assert.ok(mixed.playerRails+mixed.otherRails>food.playerRails,'mixed supply requires more total network investment');
    assert.ok(mixed.trade.paid>resources.trade.paid,'diverse imports also consume more of the buyer coin reserve');
    assert.equal(mixed.trainCost,food.trainCost,'a larger itinerary does not secretly increase the fixed engine purchase price');
  }
  for(const strategy of ['food-loop','resources-loop','mixed-loop']){
    const near=results.find(row=>row.scenario==='near'&&row.strategy===strategy),distant=results.find(row=>row.scenario==='distant'&&row.strategy===strategy);
    assert.ok(distant.playerRails>near.playerRails);assert.ok(distant.firstDelivery>near.firstDelivery);
    assert.ok(distant.laps<near.laps,'distance trades throughput for geographic access');
  }
});

test('a depleted buyer coin reserve destroys the train after delivery while empty-stop refunds preserve earlier trips',()=>{
  const row=simulateStrategy({strategy:'food-loop',seconds:300,buyerGold:2});
  assertConserved(row,{openingGold:2});
  assert.equal(row.trade.refunded,1,'the empty first visit refunds its one reserved coin');
  assert.equal(row.trade.paid,2);assert.equal(row.delivered.food,4);assert.equal(row.gold,0);
  assert.equal(row.trade.escrowGold,0);assert.equal(row.trainState,'destroyed');assert.equal(row.trainsLost,1);
  assert.equal(row.trade.departures,3,'a refunded empty lap does not consume the budget for a productive departure');
  assert.equal(row.populationProduction.resources,30,'local production continues after the train is lost');
});
