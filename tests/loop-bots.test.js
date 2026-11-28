import test from 'node:test';
import assert from 'node:assert/strict';
import {createEconomicBots} from '../src/economic-bots.js';
import {loopBotRouteOptions} from '../src/loop-bots.js';

function fixture({resources=40,houses=6,cost=4,planRoute}={}){
  const city={id:'own',ownerId:'blue',x:0,z:0,level:Math.floor(houses/3),houseCount:houses},farm={id:'farm',ownerId:'gray',x:65,z:0,level:2,houseCount:6};
  const game={ownerId:'blue',gold:0,logs:resources,debt:0,cities:houses>=3?[city]:[],houses:Array(houses).fill({}),resourcesAt(){return {resources:Math.max(0,this.logs-this.debt)};},spendResources(amount){if(this.resourcesAt().resources<amount)return {ok:false};this.logs-=amount;return {ok:true};}};
  const policies=[],bot={game,config:{id:'blue-bot'},setPolicy:policy=>policies.push(policy)};
  const calls=[],connections=[],trains=[],callbacks=[];
  const railways={revision:0,maxConnectionDistance:140,snapshot:()=>({cities:[city,farm],connections}),
    geometryKey(from,to){return `${from}>${to}:${this.revision}`;},
    adoptPreview(from,to,result,key){calls.push('adopt');return key===this.geometryKey(from,to)&&result?.siteValid;},
    preview(){calls.push('preview');return {siteValid:true,cost};},
    evaluate(){calls.push('evaluate');return {siteValid:true,valid:true,cost};},
    build(from,to,options){calls.push('build');assert.equal(options.ownerId,'blue');assert.equal(options.requireCached,true);
      if(!game.spendResources(cost).ok)return {ok:false,code:'not-enough-resources'};connections.push({from,to});this.revision++;return {ok:true,cost};},
  };
  const economy={trains,resourcesAt:()=>game.resourcesAt(),city(id){return id==='farm'?{...farm,resource:'food'}:{...city,resource:'resources',loops:connections.length===2?[{id:'loop',cost:15,length:50}]:[]};},
    buyTrain(cityId,loopId,ownerId){calls.push('train');assert.equal(cityId,'own');assert.equal(loopId,'loop');assert.equal(ownerId,'blue');
      if(!game.spendResources(15).ok)return {ok:false};trains.push({id:'train',ownerId});return {ok:true};},
  };
  const coordinator=createEconomicBots({gameplay:{economy:'loops'}},{session:{},bots:[bot],railways,economy,planRoute,onRailBuild:result=>callbacks.push(result)});
  return {coordinator,game,city,policies,railways,calls,connections,trains,callbacks};
}

test('loop bots grow a station, pay for both directed connections, buy a train, then grow to fifteen',()=>{
  const f=fixture();f.coordinator.update(1);assert.deepEqual(f.connections,[{from:'own',to:'farm'}]);
  f.coordinator.update(3);assert.deepEqual(f.connections,[{from:'own',to:'farm'},{from:'farm',to:'own'}]);
  assert.equal(f.game.logs,32);f.coordinator.update(3);assert.equal(f.game.logs,17);assert.equal(f.game.gold,0);assert.equal(f.trains.length,1);
  f.coordinator.update(3);assert.equal(f.policies.at(-1).targetHouses,15);assert.equal(f.coordinator.snapshot()[0].state,'growing');
  assert.equal(f.callbacks.length,2);assert.equal(f.coordinator.stats.trains,1);assert.equal(f.game.logs,17);
});

test('rivals wait for six homes and never spend a partial-loop budget they cannot complete',()=>{
  const small=fixture({houses:3});small.coordinator.update(1);assert.equal(small.policies.at(-1).targetHouses,6);assert.equal(small.calls.length,0);
  const poor=fixture({resources:22});poor.coordinator.update(1);assert.equal(poor.connections.length,0);assert.equal(poor.game.logs,22);
  assert.equal(poor.coordinator.stats.validations,0);
});

test('loop bot browser planning waits for one worker and applies its response only during update',async()=>{
  let resolve,requests=0;
  const f=fixture({planRoute:()=>{requests++;return new Promise(done=>resolve=done);}});
  f.coordinator.update(1);f.coordinator.update(1);assert.equal(requests,1);assert.equal(f.calls.includes('evaluate'),false);
  resolve({result:{siteValid:true,valid:true,cost:4}});await Promise.resolve();assert.equal(f.connections.length,0);
  f.coordinator.update(.1);assert.equal(f.connections.length,1);assert.deepEqual(f.calls,['preview','adopt','build']);
  assert.equal(f.coordinator.planning,false);
});

test('stale or disposed bot workers cannot purchase tracks',async()=>{
  for(const mode of ['stale','disposed']){
    let resolve;const f=fixture({planRoute:()=>new Promise(done=>resolve=done)});f.coordinator.update(1);
    if(mode==='stale')f.railways.revision++;else f.coordinator.dispose();
    resolve({result:{siteValid:true,valid:true,cost:4}});await Promise.resolve();f.coordinator.update(.1);
    assert.equal(f.connections.length,0);assert.equal(f.game.logs,40);
  }
});

test('return-route detours preserve editor node counts and exact station anchors',()=>{
  const from={x:0,z:0},to={x:110,z:20},baseline={waypointCount:2,handles:[{x:7,z:2},{x:103,z:18}]};
  assert.deepEqual(loopBotRouteOptions(from,to,'blue'),{ownerId:'blue'});
  const left=loopBotRouteOptions(from,to,'blue',1,baseline),right=loopBotRouteOptions(from,to,'blue',2,baseline),wider=loopBotRouteOptions(from,to,'blue',5,baseline);
  for(const options of [left,right,wider]){assert.equal(options.waypoints.length,2);assert.equal(options.controlCount,2);assert.equal(options.ownerId,'blue');}
  for(let i=0;i<2;i++){
    const t=(i+1)/3,center={x:7+96*t,z:2+16*t};
    assert.ok(Math.abs((left.waypoints[i].x+right.waypoints[i].x)/2-center.x)<1e-10);
    assert.ok(Math.abs((left.waypoints[i].z+right.waypoints[i].z)/2-center.z)<1e-10);
    assert.ok(Math.hypot(wider.waypoints[i].x-center.x,wider.waypoints[i].z-center.z)>Math.hypot(left.waypoints[i].x-center.x,left.waypoints[i].z-center.z));
  }
  assert.equal(loopBotRouteOptions(from,to,'blue',31,baseline),null,'candidate family is bounded');
  const turnaround=loopBotRouteOptions(from,to,'blue',7,baseline);
  assert.equal(turnaround.controlCount,2);assert.equal(turnaround.waypoints.length,2);
  assert.ok(turnaround.waypoints.some(p=>(p.x-7)*96+(p.z-2)*16<0),'a return can turn beyond the station rather than crossing its outward track');
});

test('a blocked return is reshaped on later decisions before spending on unrelated outward lines',()=>{
  const f=fixture(),originalSnapshot=f.railways.snapshot,originalBuild=f.railways.build,built=[];
  f.railways.snapshot=()=>{const snapshot=originalSnapshot();return{...snapshot,cities:[...snapshot.cities,{id:'other-farm',ownerId:'gray',x:50,z:0,level:2}]};};
  f.railways.preview=(from,to,options)=>{f.calls.push('preview');return from==='farm'&&!options.waypoints?{siteValid:false,code:'route-blocked',waypointCount:1,handles:[{x:25,z:0},{x:0,z:0}]}:{siteValid:true,cost:4};};
  f.railways.build=(from,to,options)=>{built.push({from,to,options});return originalBuild.call(f.railways,from,to,options);};
  f.coordinator.update(1);assert.equal(f.connections.length,1);
  const before=f.coordinator.stats.previews;f.coordinator.update(3);assert.equal(f.coordinator.stats.previews-before,1);assert.equal(f.connections.length,1);assert.equal(f.coordinator.snapshot()[0].state,'shaping-loop');
  f.coordinator.update(3);assert.equal(f.connections.length,2);assert.equal(built[1].from,'farm');assert.equal(built[1].to,'own');assert.equal(built[1].options.waypoints.length,1);assert.notEqual(built[1].options.waypoints[0].z,0);
  f.coordinator.update(3);assert.equal(f.trains.length,1);assert.equal(f.game.logs,17);assert.ok(f.connections.every(link=>!Object.values(link).includes('other-farm')));f.coordinator.dispose();
});

test('an impossible return exhausts its bounded candidates then cools down without draining the wallet',()=>{
  const f=fixture();f.coordinator.update(1);const resources=f.game.logs;
  f.railways.preview=()=>({siteValid:false,code:'route-blocked',waypointCount:1,handles:[{x:25,z:0},{x:0,z:0}]});
  for(let i=0;i<31;i++){const before=f.coordinator.stats.previews;f.coordinator.update(3);assert.equal(f.coordinator.stats.previews-before,1);}
  const count=f.coordinator.stats.previews;f.coordinator.update(3);assert.equal(f.coordinator.stats.previews,count);assert.equal(f.connections.length,1);assert.equal(f.game.logs,resources);f.coordinator.dispose();
});

test('resource savings unlock a complete loop and train without any Gold income',()=>{
  const f=fixture({resources:22});f.coordinator.update(1);
  assert.equal(f.connections.length,0);assert.equal(f.coordinator.snapshot()[0].state,'saving');
  f.game.logs++;f.coordinator.update(30);assert.equal(f.connections.length,1);
  f.coordinator.update(3);f.coordinator.update(3);
  assert.equal(f.trains.length,1);assert.equal(f.game.logs,0);assert.equal(f.game.gold,0);
  f.coordinator.update(3);assert.equal(f.policies.at(-1).targetHouses,15);
});

test('worker completion checks current spendable Resources and preserves the return plus train reserve',async()=>{
  let resolve;const f=fixture({resources:23,planRoute:()=>new Promise(done=>resolve=done)});
  f.coordinator.update(1);assert.equal(f.coordinator.planning,true);
  f.game.debt=1;resolve({result:{siteValid:true,valid:true,cost:4,costResource:'resources'}});await Promise.resolve();f.coordinator.update(.1);
  assert.equal(f.connections.length,0,'an outstanding upkeep unit makes the full loop budget unaffordable');
  assert.equal(f.game.logs,23);assert.equal(f.coordinator.snapshot()[0].state,'saving');
  assert.deepEqual(f.calls,['preview','adopt']);
});
