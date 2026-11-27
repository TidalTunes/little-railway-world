import test from 'node:test';
import assert from 'node:assert/strict';
import {runEconomyBenchmarks} from '../scripts/simulate-economy.mjs';

test('directed-loop benchmarks execute real worker trips and compare return speed with resource breadth',()=>{
  const results=runEconomyBenchmarks({seconds:120});assert.equal(results.length,6);
  for(const row of results){
    assert.ok(row.laps>=1,`${row.scenario} ${row.strategy} completes its physical loop`);
    assert.ok(row.workerReturns>0,'physical work contributes alongside railway pickups');
    assert.equal(row.trainCost,row.cityCount*10);
    assert.ok(row.gold>=0);assert.ok(row.wood>=12);assert.ok(row.delivered.wood>=10);
  }
  const food=results.find(row=>row.scenario==='near'&&row.strategy==='food-loop');
  const mixed=results.find(row=>row.scenario==='near'&&row.strategy==='mixed-loop');
  assert.ok(food.firstDelivery<mixed.firstDelivery);assert.equal(food.metal,0);
  assert.ok(mixed.metal>0&&mixed.food>0);assert.equal(mixed.cityCount,3);
});
