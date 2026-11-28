import test from 'node:test';
import assert from 'node:assert/strict';
import {runEconomyBenchmarks} from '../scripts/simulate-economy.mjs';

test('directed-loop benchmarks use constant population production and compare food with resource circuits',()=>{
  const results=runEconomyBenchmarks({seconds:120});assert.equal(results.length,6);
  for(const row of results){
    assert.ok(row.laps>=1,`${row.scenario} ${row.strategy} completes its physical loop`);
    assert.deepEqual(row.populationProduction,{resources:24,food:0,gold:0},'six residents produce the same amount on every circuit');
    assert.equal(row.trainCost,row.cityCount*10);
    assert.ok(row.gold>=0);assert.ok(row.resources>=12);assert.ok(row.delivered.resources>=10);
  }
  const food=results.find(row=>row.scenario==='near'&&row.strategy==='food-loop');
  const mixed=results.find(row=>row.scenario==='near'&&row.strategy==='mixed-loop');
  assert.ok(food.firstDelivery<mixed.firstDelivery);
  assert.ok(mixed.resources>0&&mixed.food>0);assert.equal(mixed.cityCount,3);
  const resources=results.find(row=>row.scenario==='near'&&row.strategy==='resources-loop');
  assert.equal(resources.food,0);assert.ok(resources.delivered.resources>food.delivered.resources);
});
