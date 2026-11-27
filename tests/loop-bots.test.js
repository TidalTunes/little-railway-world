import test from 'node:test';
import assert from 'node:assert/strict';
import {createEconomicBots} from '../src/economic-bots.js';

function fixture({gold=60,houses=6,cost=10,planRoute}={}){
  const city={id:'own',ownerId:'blue',x:0,z:0,level:Math.floor(houses/3),houseCount:houses},farm={id:'farm',ownerId:'gray',x:25,z:0,level:2,houseCount:6};
  const game={ownerId:'blue',gold,logs:12,cities:houses>=3?[city]:[],houses:Array(houses).fill({}),spendGold(amount){if(this.gold<amount)return {ok:false};this.gold-=amount;return {ok:true};}};
  const policies=[],bot={game,config:{id:'blue-bot'},setPolicy:policy=>policies.push(policy)};
  const calls=[],connections=[],trains=[],callbacks=[];
  const railways={revision:0,maxConnectionDistance:140,snapshot:()=>({cities:[city,farm],connections}),
    geometryKey(from,to){return `${from}>${to}:${this.revision}`;},
    adoptPreview(from,to,result,key){calls.push('adopt');return key===this.geometryKey(from,to)&&result?.siteValid;},
    preview(){calls.push('preview');return {siteValid:true,cost};},
    evaluate(){calls.push('evaluate');return {siteValid:true,valid:true,cost};},
    build(from,to,options){calls.push('build');assert.equal(options.ownerId,'blue');assert.equal(options.requireCached,true);
      if(!game.spendGold(cost).ok)return {ok:false,code:'not-enough-gold'};connections.push({from,to});this.revision++;return {ok:true,cost};},
  };
  const economy={trains,city(id){return id==='farm'?{...farm,resource:'food'}:{...city,resource:'metal',loops:connections.length===2?[{id:'loop',cost:20,length:50}]:[]};},
    buyTrain(cityId,loopId,ownerId){calls.push('train');assert.equal(cityId,'own');assert.equal(loopId,'loop');assert.equal(ownerId,'blue');
      if(!game.spendGold(20).ok)return {ok:false};trains.push({id:'train',ownerId});return {ok:true};},
  };
  const coordinator=createEconomicBots({gameplay:{economy:'loops'}},{session:{},bots:[bot],railways,economy,planRoute,onRailBuild:result=>callbacks.push(result)});
  return {coordinator,game,city,policies,railways,calls,connections,trains,callbacks};
}

test('loop bots grow a station, pay for both directed connections, buy a train, then grow to fifteen',()=>{
  const f=fixture();f.coordinator.update(1);assert.deepEqual(f.connections,[{from:'own',to:'farm'}]);
  f.coordinator.update(3);assert.deepEqual(f.connections,[{from:'own',to:'farm'},{from:'farm',to:'own'}]);
  assert.equal(f.game.gold,40);f.coordinator.update(3);assert.equal(f.game.gold,20);assert.equal(f.trains.length,1);
  f.coordinator.update(3);assert.equal(f.policies.at(-1).targetHouses,15);assert.equal(f.coordinator.snapshot()[0].state,'growing');
  assert.equal(f.callbacks.length,2);assert.equal(f.coordinator.stats.trains,1);assert.equal(f.game.logs,12);
});

test('rivals wait for six homes and never spend a partial-loop budget they cannot complete',()=>{
  const small=fixture({houses:3});small.coordinator.update(1);assert.equal(small.policies.at(-1).targetHouses,6);assert.equal(small.calls.length,0);
  const poor=fixture({gold:39});poor.coordinator.update(1);assert.equal(poor.connections.length,0);assert.equal(poor.game.gold,39);
  assert.equal(poor.coordinator.stats.validations,0);
});

test('loop bot browser planning waits for one worker and applies its response only during update',async()=>{
  let resolve,requests=0;
  const f=fixture({planRoute:()=>{requests++;return new Promise(done=>resolve=done);}});
  f.coordinator.update(1);f.coordinator.update(1);assert.equal(requests,1);assert.equal(f.calls.includes('evaluate'),false);
  resolve({result:{siteValid:true,valid:true,cost:10}});await Promise.resolve();assert.equal(f.connections.length,0);
  f.coordinator.update(.1);assert.equal(f.connections.length,1);assert.deepEqual(f.calls,['preview','adopt','build']);
  assert.equal(f.coordinator.planning,false);
});

test('stale or disposed bot workers cannot purchase tracks',async()=>{
  for(const mode of ['stale','disposed']){
    let resolve;const f=fixture({planRoute:()=>new Promise(done=>resolve=done)});f.coordinator.update(1);
    if(mode==='stale')f.railways.revision++;else f.coordinator.dispose();
    resolve({result:{siteValid:true,valid:true,cost:10}});await Promise.resolve();f.coordinator.update(.1);
    assert.equal(f.connections.length,0);assert.equal(f.game.gold,60);
  }
});
