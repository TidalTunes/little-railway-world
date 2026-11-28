import test from 'node:test';
import assert from 'node:assert/strict';
import {runEconomyBenchmarks} from '../scripts/simulate-economy.mjs';
import {LOOP_ECONOMY_RULES,loopTrainCost} from '../src/loop-economy-rules.js';

test('directed-loop benchmarks use constant population production and compare food with resource circuits',()=>{
  const results=runEconomyBenchmarks({seconds:120});assert.equal(results.length,6);
  for(const row of results){
    assert.ok(row.laps>=1,`${row.scenario} ${row.strategy} completes its physical loop`);
    assert.deepEqual(row.populationProduction,{resources:12,food:0,gold:0},'six residents produce on both daytime minute ticks');
    assert.equal(row.trainCost,loopTrainCost(row.cityCount));
    assert.deepEqual(row.upkeep,{due:10,paid:10,unpaid:0});assert.equal(row.resourceDebt,0);
    assert.equal(row.resources,LOOP_ECONOMY_RULES.startResources-row.playerRails-row.trainCost+row.populationProduction.resources+row.delivered.resources-row.upkeep.paid,'the resource wallet reconciles building, purchases, production, deliveries and upkeep');
    assert.equal(row.food,LOOP_ECONOMY_RULES.startFood+row.delivered.food);
    assert.ok(row.gold>0,'trading earns Gold from a zero-Gold start');assert.ok(row.delivered.resources>=10);
  }
  const food=results.find(row=>row.scenario==='near'&&row.strategy==='food-loop');
  const mixed=results.find(row=>row.scenario==='near'&&row.strategy==='mixed-loop');
  assert.ok(food.firstDelivery<mixed.firstDelivery);
  assert.ok(mixed.resources>0&&mixed.food>0);assert.equal(mixed.cityCount,3);
  const resources=results.find(row=>row.scenario==='near'&&row.strategy==='resources-loop');
  assert.equal(resources.food,LOOP_ECONOMY_RULES.startFood);assert.ok(resources.delivered.resources>food.delivered.resources);
});
