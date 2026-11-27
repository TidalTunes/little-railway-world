import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementRailwayPlanner} from '../src/settlement-railway-planner.js';
import {createSettlementRailways} from '../src/settlement-railways.js';

class MockWorker{
  messages=[];terminated=false;throwType=null;
  postMessage(message){
    if(message.type===this.throwType)throw new Error('Worker transport failed');
    this.messages.push(structuredClone(message));
  }
  terminate(){this.terminated=true;}
  reply(id,result){this.onmessage?.({data:{id,result}});}
  fail(){this.onerror?.({message:'Worker stopped'});}
}
const plans=worker=>worker.messages.filter(message=>message.type==='plan');
const city=(id,ownerId,x)=>({id,ownerId,x,z:0,level:1,houseCount:3,houseIds:[`${id}-home`]});
const route=message=>({fromCityId:message.from,toCityId:message.to,siteValid:true,valid:message.state.player.gold>=5,
  cost:5,affordable:message.state.player.gold>=5,code:message.state.player.gold>=5?'ready':'not-enough-gold',
  reason:message.state.player.gold>=5?'Connect these cities':'A railway costs 5 gold',
  lines:[],stations:[],paths:[],clearedTreeIds:[]});

function fixture(t,{workerFactory=()=>new MockWorker()}={}){
  const world={seed:'planner-test',mapTerrain:{positions:new Float32Array([1,2,3])},
    gameplay:{farmVillages:{cities:[city('b','neutral',30),city('c','neutral',60),city('d','neutral',90)]}}};
  const player={ownerId:'teal',gold:5,cities:[city('a','teal',0)],removedTreeIds:[],snapshot(){
    return {ownerId:this.ownerId,gold:this.gold,cities:structuredClone(this.cities),removedTreeIds:[...this.removedTreeIds]};
  }};
  const session={player,bots:[],buildings:[{id:'a-home',kind:'house',cityId:'a',x:0,z:0}],
    shared:{removedTreeIds:new Set(),getActors:()=>[{x:2,z:3}]}};
  const authority=createSettlementRailways(world,{session}),adoptions=[],evaluations=[],workers=[];
  const railways={geometryKey:authority.geometryKey,snapshot:authority.snapshot,
    adoptPreview(...args){adoptions.push(args);return authority.adoptPreview(...args);},
    evaluate(...args){evaluations.push(args);return authority.evaluate(...args);}};
  const placements=[{id:'tree',kind:'tree',x:12,z:4}];
  const planner=createSettlementRailwayPlanner(world,railways,session,{getPlacements:()=>placements,
    createWorker(){const worker=workerFactory(workers.length);workers.push(worker);return worker;}});
  t.after(()=>planner.dispose());
  return {planner,world,player,session,workers,adoptions,evaluations,placements};
}

test('railway planner sends world and session state once and ignores unrelated replies',async t=>{
  const f=fixture(t),pending=f.planner.request('a','b'),worker=f.workers[0];
  assert.deepEqual(worker.messages.map(message=>message.type),['initialize','plan']);
  assert.equal(worker.messages[0].world.seed,f.world.seed);
  assert.equal('mapTerrain' in worker.messages[0].world,false,'GPU terrain is not cloned to the planner');
  const message=plans(worker)[0];
  assert.deepEqual(message.placements,f.placements);
  assert.deepEqual(message.state.actors,[{x:2,z:3}]);
  assert.deepEqual(message.state.buildings,f.session.buildings);
  worker.reply(message.id+100,route(message));assert.equal(f.adoptions.length,0);
  worker.reply(message.id,route(message));
  assert.equal((await pending).result.valid,true);
  assert.equal(f.adoptions.length,1);assert.equal(f.evaluations.length,1);
  const second=f.planner.request('a','c'),next=plans(worker)[1];worker.reply(next.id,route(next));await second;
  assert.equal(worker.messages.filter(item=>item.type==='initialize').length,1);
});

test('a result planned before the occupied layout changed cannot enter the authoritative cache',async t=>{
  const f=fixture(t),pending=f.planner.request('a','b'),worker=f.workers[0],message=plans(worker)[0];
  f.session.buildings.push({id:'new-house',kind:'house',x:20,z:0});
  worker.reply(message.id,route(message));
  assert.deepEqual(await pending,{stale:true});
  assert.equal(f.adoptions.length,0);assert.equal(f.evaluations.length,0);
  const retry=f.planner.request('a','b'),fresh=plans(worker)[1];worker.reply(fresh.id,route(fresh));
  assert.equal((await retry).result.valid,true);assert.equal(f.adoptions.length,1);
});

test('only the latest queued city selection is dispatched after active work completes',async t=>{
  const f=fixture(t),active=f.planner.request('a','b'),worker=f.workers[0];
  const replaced=f.planner.request('a','c'),latest=f.planner.request('a','d');
  assert.deepEqual(await replaced,{stale:true});
  assert.equal(plans(worker).length,1,'queued selections do not start concurrent searches');
  const first=plans(worker)[0];worker.reply(first.id,route(first));await active;
  assert.deepEqual(plans(worker).map(message=>message.to),['b','d']);
  const last=plans(worker)[1];worker.reply(first.id,route(first));
  assert.equal(f.adoptions.length,1,'a late duplicate cannot finish the current selection');
  worker.reply(last.id,route(last));assert.equal((await latest).result.toCityId,'d');
});

test('disposal settles active and queued work and rejects all later work without another worker',async t=>{
  const f=fixture(t),active=f.planner.request('a','b'),queued=f.planner.request('a','c');
  const worker=f.workers[0],message=plans(worker)[0];
  f.planner.dispose();f.planner.dispose();
  assert.deepEqual(await Promise.all([active,queued]),[{stale:true},{stale:true}]);
  assert.equal(worker.terminated,true);
  worker.reply(message.id,route(message));assert.equal(f.adoptions.length,0);
  assert.deepEqual(await f.planner.request('a','d'),{stale:true});assert.equal(f.workers.length,1);
});

test('worker failure settles the active request and retries the latest queued selection on a fresh worker',async t=>{
  const f=fixture(t),active=f.planner.request('a','b'),queued=f.planner.request('a','c'),worker=f.workers[0];
  worker.fail();assert.match((await active).error,/planning could not finish/i);
  assert.equal(worker.terminated,true);assert.equal(f.workers.length,2);
  const replacement=f.workers[1],message=plans(replacement)[0];
  assert.equal(replacement.messages[0].type,'initialize');assert.equal(message.to,'c');
  worker.reply(plans(worker)[0].id,route(plans(worker)[0]));assert.equal(f.adoptions.length,0);
  worker.fail();assert.equal(replacement.terminated,false,'a delayed failure from the retired worker cannot terminate its replacement');
  assert.equal(f.workers.length,2);
  replacement.reply(message.id,route(message));assert.equal((await queued).result.valid,true);
});

test('synchronous initialization or plan-send failure discards the unusable worker so selection can retry',async t=>{
  for(const type of ['initialize','plan']){
    const f=fixture(t,{workerFactory:index=>{const worker=new MockWorker();if(index===0)worker.throwType=type;return worker;}});
    assert.match((await f.planner.request('a','b')).error,/unavailable/i);
    assert.equal(f.workers[0].terminated,true,'a failed transport must not be reused');
    const retry=f.planner.request('a','b');assert.equal(f.workers.length,2);
    const worker=f.workers[1],message=plans(worker)[0];worker.reply(message.id,route(message));
    assert.equal((await retry).result.valid,true);
  }
});

test('a search error response does not enter the cache or strand the next queued selection',async t=>{
  const f=fixture(t),active=f.planner.request('a','b'),next=f.planner.request('a','c'),worker=f.workers[0];
  worker.onmessage({data:{id:plans(worker)[0].id,error:'No route could be planned'}});
  assert.deepEqual(await active,{error:'No route could be planned'});assert.equal(f.adoptions.length,0);
  assert.equal(plans(worker).length,2);
  const message=plans(worker)[1];worker.reply(message.id,route(message));
  assert.equal((await next).result.toCityId,'c');assert.equal(f.adoptions.length,1);
});

test('successful geometry is reevaluated against the current wallet rather than the worker snapshot',async t=>{
  const f=fixture(t);
  for(const [startingGold,currentGold] of [[5,2],[2,8]]){
    f.player.gold=startingGold;
    const pending=f.planner.request('a','b'),worker=f.workers[0],message=plans(worker).at(-1);
    assert.equal(message.state.player.gold,startingGold);
    f.player.gold=currentGold;worker.reply(message.id,route(message));
    const {result}=await pending;
    assert.equal(result.siteValid,true);assert.equal(result.affordable,currentGold>=5);
    assert.equal(result.valid,currentGold>=5);assert.equal(f.player.gold,currentGold,'planning never spends gold');
  }
});

test('edited control points are copied, transported, and adopted only for their own geometry key',async t=>{
  const f=fixture(t),waypoints=[{x:16,z:7}],pending=f.planner.request('a','b',{waypoints}),worker=f.workers[0],message=plans(worker)[0];
  waypoints[0].z=99;
  assert.deepEqual(message.options,{waypoints:[{x:16,z:7}]},'later pointer movement cannot mutate an in-flight plan');
  worker.reply(message.id,{...route(message),waypoints:message.options.waypoints,handles:message.options.waypoints});
  const result=await pending;assert.deepEqual(result.result.waypoints,[{x:16,z:7}]);
  assert.deepEqual(f.adoptions[0][4],message.options);assert.deepEqual(f.evaluations[0][2],message.options);
  const next=f.planner.request('a','b',{waypoints}),edited=plans(worker).at(-1);
  worker.reply(edited.id,{...route(edited),waypoints:edited.options.waypoints});assert.deepEqual((await next).result.waypoints,waypoints);
  assert.notEqual(f.adoptions[0][3],f.adoptions[1][3],'each edit has its own authoritative geometry cache');
});
