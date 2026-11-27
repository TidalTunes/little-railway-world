import test from 'node:test';
import assert from 'node:assert/strict';
import {DAY_NIGHT_CYCLE,dayCycleAt} from '../src/day-cycle.js';
import {clockHandAngle} from '../src/clock-design.js';

test('day and night each occupy exactly five minutes of a repeating ten-minute calendar',()=>{
  assert.equal(DAY_NIGHT_CYCLE.daySeconds,300);assert.equal(DAY_NIGHT_CYCLE.nightSeconds,300);
  for(const start of [0,600,1200,60000]){
    assert.equal(dayCycleAt(start).phase,'day');
    assert.equal(dayCycleAt(start+299.999).phase,'day');
    assert.equal(dayCycleAt(start+300).phase,'night');
    assert.equal(dayCycleAt(start+599.999).phase,'night');
    assert.equal(dayCycleAt(start+600).phase,'day');
  }
  assert.equal(dayCycleAt(0).night,0);assert.equal(dayCycleAt(150).night,0);
  assert.equal(dayCycleAt(300).night,1);assert.equal(dayCycleAt(450).night,1);
});

test('twenty-second dusk and dawn blend continuously across boundaries and wraparound',()=>{
  const samples=[0,280,285,290,295,300,580,585,590,595,600];
  assert.deepEqual(samples.map(seconds=>dayCycleAt(seconds).night),[0,0,.15625,.5,.84375,1,1,.84375,.5,.15625,0]);
  for(const boundary of [280,300,580,600,880,900,1180,1200]){
    const before=dayCycleAt(boundary-.001).night,after=dayCycleAt(boundary+.001).night;
    assert.ok(Math.abs(after-before)<.000001,`smooth lighting at ${boundary} seconds`);
  }
});

test('calendar is seekable, frame-rate independent, bounded and reuses its output state',()=>{
  const state={};assert.equal(dayCycleAt(290,state),state);
  for(const seconds of [0,1,290,299,301,590,599]){
    assert.deepEqual(dayCycleAt(seconds+600*23),dayCycleAt(seconds));
    dayCycleAt(seconds,state);assert.deepEqual(state,dayCycleAt(seconds));
    assert.ok(state.night>=0&&state.night<=1);
  }
  for(const input of [-1,NaN,Infinity,undefined])assert.deepEqual(dayCycleAt(input),dayCycleAt(0));
});

test('clock faces share the calendar: six at dawn, twelve at midday, six at dusk and twelve at midnight',()=>{
  const modulo=value=>((value%(Math.PI*2))+Math.PI*2)%(Math.PI*2);
  for(const [seconds,hourAngle]of [[0,Math.PI],[150,0],[300,Math.PI],[450,0],[600,Math.PI]]){
    const time=dayCycleAt(seconds).clockTime;
    assert.ok(Math.abs(modulo(clockHandAngle(time,0))-hourAngle)<1e-10);
    assert.ok(Math.abs(modulo(clockHandAngle(time,1)))<1e-10);
  }
  for(const hand of [0,1]){
    const before=clockHandAngle(dayCycleAt(599.999).clockTime,hand),after=clockHandAngle(dayCycleAt(600.001).clockTime,hand);
    assert.ok(Math.abs(Math.sin(before)-Math.sin(after))<.001,'wrapped calendar cannot make a clock jump');
  }
});
