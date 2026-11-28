import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementSession} from '../src/settlement-session.js';
import {createSettlementRailways} from '../src/settlement-railways.js';
const flat=()=>({type:'ground',height:0});
const home=(id,x,z=0)=>({id:`${id}:home-1`,ownerId:id,kind:'house',x,y:0,z,rotation:0,scale:1});
function fixture(seed='match',positions=[0,12,70],teams=['red','red','blue']){
  const players=['a','b','c'].map((id,i)=>({id,name:`Captain ${id.toUpperCase()}`,teamId:teams[i],role:'hybrid'}));
  const world={seed,players,gameplay:{economy:'loops',ownerId:'a',starterHouse:home('a',positions[0]),match:{localPlayerId:'a',players},playerBots:players.slice(1).map((p,i)=>({id:p.id,ownerId:p.id,starterHouse:home(p.id,positions[i+1])}))}};
  return{world,session:createSettlementSession(world,{surfaceAt:flat})};
}
const build=(game,x,z=0)=>{const result=game.build({x,z});assert.ok(result.ok,result.reason);return result;};
function fund(game){game.addLogs(300);game.addFood(100);}

test('three connected allied homes draw once among distinct contributors and transfer the complete city',()=>{
  const {session}=fixture(),before=session.accounts.map(game=>game.logs),result=build(session.player,6),event=session.drainEvents()[0];
  assert.equal(event.type,'city-founded');assert.deepEqual(event.candidates,['a','b']);assert.ok(event.candidates.includes(event.winnerId));assert.equal(result.events[0].id,event.id);
  const winner=session.gameForOwner(event.winnerId),loser=session.gameForOwner(event.winnerId==='a'?'b':'a'),city=session.cities[0];
  assert.equal(winner.houses.length,3);assert.equal(loser.houses.length,0);assert.equal(loser.cities.length,0);assert.equal(city.name,`Captain ${event.winnerId.toUpperCase()}`);assert.equal(city.houseCount,3);
  for(const item of [...winner.houses,...winner.buildings,...winner.paths]){assert.equal(item.ownerId,winner.ownerId);assert.equal(item.cityId,city.id);}
  assert.equal(session.player.logs,before[0]-8);assert.equal(session.bots[0].game.logs,before[1]);assert.equal(session.bots[1].game.logs,before[2]);
  assert.equal(session.drainEvents().length,0);assert.equal(session.paths.length,winner.paths.length);assert.equal(new Set(session.buildings.map(item=>item.id)).size,session.buildings.length);
});

test('the founding draw is deterministic, unweighted by homes and excludes enemy neighbours',()=>{
  const outcomes=new Set();
  for(let i=0;i<20;i++){
    const first=fixture(`draw-${i}`),second=fixture(`draw-${i}`);build(first.session.player,6);build(second.session.player,6);
    const a=first.session.drainEvents()[0],b=second.session.drainEvents()[0];assert.deepEqual(a,b);assert.deepEqual(a.candidates,['a','b']);outcomes.add(a.winnerId);
  }
  assert.equal(outcomes.size,2,'both the one-house and two-house contributors can win');
  const{session}=fixture('hostile',[0,12,70],['red','blue','blue']);build(session.player,6);
  assert.equal(session.cities.length,0);assert.equal(session.player.houses.length,2);assert.equal(session.player.paths.length,0);assert.equal(session.bots[0].game.houses.length,1);
});

test('a losing founder may build a fresh outpost and allied additions invite without another lottery',()=>{
  const{session}=fixture();build(session.player,6);const founded=session.drainEvents()[0],winner=session.gameForOwner(founded.winnerId),loser=session.gameForOwner(founded.winnerId==='a'?'b':'a');fund(loser);
  const addition=build(loser,0,-5);assert.equal(addition.house.ownerId,winner.ownerId);assert.equal(winner.cities[0].houseCount,4);assert.equal(loser.houses.length,0);
  const events=session.drainEvents();assert.equal(events.length,1);assert.equal(events[0].type,'city-invitation');assert.equal(events[0].playerId,loser.ownerId);
  build(loser,-35,0);assert.equal(loser.houses.length,1);assert.equal(loser.cities.length,0);assert.equal(session.cities.length,1);
});

test('established allied cities stay private and an owner cannot win a second founding slot',()=>{
  const{session}=fixture('private',[0,30,90]);for(const game of session.accounts)fund(game);
  build(session.player,5);build(session.player,0,5);const other=session.gameForOwner('b');build(other,25);build(other,30,5);session.drainEvents();
  const original=session.cities.map(city=>({id:city.id,ownerId:city.ownerId}));
  build(session.player,10,0);build(session.player,15,0);build(session.player,20,0);
  assert.equal(session.cities.length,2);assert.deepEqual(session.cities.map(city=>({id:city.id,ownerId:city.ownerId})),original);
  for(const city of session.cities)assert.ok(session.gameForOwner(city.ownerId).houses.filter(home=>home.cityId===city.id).length>=3);
  build(session.player,-35);build(session.player,-40);build(session.player,-35,5);
  assert.equal(session.player.cities.length,1);assert.equal(session.player.clusters.find(cluster=>cluster.x<-20).level,0);
  assert.ok(session.drainEvents().every(event=>event.type==='city-invitation'));
});

test('TPS contributors can add to allied cities but cannot found outposts or win a draw',()=>{
  const{session}=fixture();assert.ok(session.setPlayerRole('b','tps').ok);assert.equal(session.gameForOwner('b').evaluateBuild({x:30,z:0}).code,'outside-allied-city');
  build(session.player,6);const event=session.drainEvents()[0];assert.deepEqual(event.candidates,['a']);assert.equal(event.winnerId,'a');
  build(session.gameForOwner('b'),0,-5);assert.equal(session.player.cities[0].houseCount,4);assert.equal(session.gameForOwner('b').cities.length,0);
  assert.equal(session.setPlayerRole('absent','tps').ok,false);
});

test('capture preserves city identity, moves home/civic/path ownership and releases the old owner slot',()=>{
  const{session}=fixture();build(session.player,6);const city=session.cities[0],previous=session.gameForOwner(city.ownerId),newOwner=session.gameForOwner('c'),balance=previous.resourcesAt(),incoming=newOwner.resourcesAt(),seen=[];
  session.drainEvents();const off=session.onCityOwnershipChanged(event=>seen.push(event));const captured=session.captureCity(city.id,'c');
  assert.ok(captured.ok);assert.equal(captured.city.id,city.id);assert.equal(captured.city.name,'Captain C');assert.deepEqual(newOwner.resourcesAt(),incoming);assert.deepEqual(previous.resourcesAt(),balance);
  assert.equal(previous.houses.length,0);assert.equal(previous.cities.length,0);assert.equal(newOwner.cities.length,1);assert.equal(newOwner.cities[0].houseCount,3);assert.equal(newOwner.houses.length,4,'captor retains their unrelated outpost');
  for(const item of [...newOwner.houses,...newOwner.buildings,...newOwner.paths].filter(item=>item.cityId===city.id))assert.equal(item.ownerId,'c');
  assert.equal(seen.length,1);assert.equal(seen[0].type,'city-captured');assert.equal(seen[0].previousOwnerId,previous.ownerId);off();
  assert.equal(session.captureCity(city.id,'c').code,'already-owned');assert.equal(session.captureCity('missing','a').code,'invalid-city');assert.equal(session.captureCity(city.id,'missing').code,'invalid-owner');
});

test('team range combines allied city circles while railway authority remains individual',()=>{
  const cities=[{id:'a-city',ownerId:'a',x:0,z:0,level:2,houseCount:6,houseIds:[]},{id:'b-city',ownerId:'b',x:90,z:0,level:2,houseCount:6,houseIds:[]},{id:'c-city',ownerId:'c',x:180,z:0,level:2,houseCount:6,houseIds:[]}];
  const{world}=fixture();world.gameplay.railwayMaxDistance=100;
  const games=cities.map(city=>({ownerId:city.ownerId,cities:[city],logs:500,resourcesAt:()=>({resources:500}),spendResources:()=>({ok:true})}));
  const session={player:games[0],bots:games.slice(1).map(game=>({game})),buildings:[],revision:0,shared:{removedTreeIds:new Set(),getActors:()=>[]}};
  const rail=createSettlementRailways(world,{session,surfaceAt:flat,sceneryCatalog:[]});assert.ok(rail.synchronizeStations().changed);
  assert.deepEqual(rail.rangeCities('a').map(city=>city.id).sort(),['a-city','b-city']);
  const covered=rail.preview('a-city','c-city');assert.notEqual(covered.code,'out-of-range',covered.reason);assert.equal(rail.preview('b-city','c-city').code,'not-your-city');
  cities[2].x=220;assert.equal(rail.preview('a-city','c-city').code,'out-of-range');
  rail.transferCityOwnership('a-city','b');assert.equal(rail.stations.find(station=>station.cityId==='a-city').ownerId,'b');assert.equal(rail.lines.find(line=>line.id===rail.stations.find(station=>station.cityId==='a-city').lineId).ownerId,'b');
});

test('an occupied captor can steward an unassigned city without taking a second command slot',()=>{
  const{session}=fixture('steward',[0,30,90]);for(const game of session.accounts)fund(game);
  build(session.player,5);build(session.player,0,5);const other=session.gameForOwner('b');build(other,25);build(other,30,5);
  const target=other.cities[0].id;assert.equal(session.captureCity(target,'a').code,'city-slot-occupied');
  const capture=session.captureCity(target,'a',{steward:true});assert.ok(capture.ok);assert.equal(capture.city.steward,true);assert.equal(capture.city.unassigned,true);assert.equal(session.player.cities.filter(city=>!city.steward).length,1);
  assert.equal(capture.event.steward,true);const assigned=session.captureCity(target,'c');assert.ok(assigned.ok);assert.equal(assigned.city.steward,undefined);assert.equal(assigned.city.unassigned,undefined);assert.equal(session.player.cities.length,1);assert.equal(session.gameForOwner('c').cities.length,1);
});

test('a TPS captor can accept its own unassigned stewardship without moving any physical assets',()=>{
  const{session}=fixture();build(session.player,6);const id=session.cities[0].id;session.setPlayerRole('c','tps');
  assert.ok(session.captureCity(id,'c',{steward:true}).ok);const game=session.gameForOwner('c'),homes=game.houses,revision=session.spatialRevision;
  const accepted=session.captureCity(id,'c');assert.ok(accepted.ok);assert.equal(accepted.city.steward,undefined);assert.equal(accepted.event.previousOwnerId,'c');assert.equal(accepted.event.ownerId,'c');
  assert.ok(session.spatialRevision>revision);assert.deepEqual(game.houses.map(({steward,...home})=>home),homes.map(({steward,...home})=>home));assert.equal(session.captureCity(id,'c').code,'already-owned');
});
