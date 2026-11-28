import test from 'node:test';
import assert from 'node:assert/strict';
import {runEconomyBenchmarks} from '../scripts/simulate-economy.mjs';
import {LOOP_ECONOMY_RULES,loopTrainCost} from '../src/loop-economy-rules.js';

test('directed-loop benchmarks use constant population production and compare food with resource circuits',()=>{
  const results=runEconomyBenchmarks({seconds:120});assert.equal(results.length,6);
  for(const row of results){
    assert.ok(row.laps>=1,`${row.scenario} ${row.strategy} completes its physical loop`);
    assert.equal(row.populationProduction.resources,12,'six residents produce on both daytime minute ticks');assert.equal(row.populationProduction.food,0);
    assert.equal(row.trainCost,loopTrainCost(row.cityCount));
    assert.equal('upkeep' in row,false);assert.equal('resourceDebt' in row,false);assert.equal('gold' in row,false);
    assert.equal(row.stationResources,row.laps*2,'each real passage of the player-owned home station rewards its owner');
    assert.equal(row.resources,LOOP_ECONOMY_RULES.startResources-row.playerRails-row.trainCost+row.populationProduction.resources+row.delivered.resources+row.stationResources,'the Resource wallet reconciles purchases, production, cargo and station rewards with no upkeep');
    assert.equal(row.food,LOOP_ECONOMY_RULES.startFood+row.delivered.food);
    assert.ok(row.stationResources>0);assert.ok(row.delivered.resources>=2);
    assert.ok(Math.abs(row.firstDelivery-row.length/10)<.3,'the train completes its route at speed ten without station pauses');
  }
  const food=results.find(row=>row.scenario==='near'&&row.strategy==='food-loop');
  const mixed=results.find(row=>row.scenario==='near'&&row.strategy==='mixed-loop');
  assert.ok(food.firstDelivery<mixed.firstDelivery);
  assert.ok(mixed.resources>0&&mixed.food>0);assert.equal(mixed.cityCount,3);
  const resources=results.find(row=>row.scenario==='near'&&row.strategy==='resources-loop');
  assert.equal(resources.food,LOOP_ECONOMY_RULES.startFood);assert.ok(resources.delivered.resources>food.delivered.resources);
});
