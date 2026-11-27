import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementRailways} from '../src/settlement-railways.js';
import {createDirectedRailNetwork} from '../src/directed-rail-network.js';
import {sampleAlignment} from '../src/alignments.js';

function fixture({surfaceAt=()=>({type:'ground',height:0})}={}){
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:2,houseCount:6},{id:'b',x:65,z:20,ownerId:'gray',level:2,houseCount:6},{id:'c',x:45,z:-60,ownerId:'orange',level:2,houseCount:6}];
  const buildings=cities.flatMap(city=>[[0,0],[4,0],[0,4],[-4,0],[0,-4],[4,4]].map(([x,z],index)=>({id:`${city.id}:home:${index}`,kind:'house',cityId:city.id,ownerId:city.ownerId,x:city.x+x,z:city.z+z,rotation:0,width:2.2,depth:2.2})));
  for(const city of cities)city.houseIds=buildings.filter(h=>h.cityId===city.id).map(h=>h.id);
  const makeAccount=city=>({ownerId:city.ownerId,cities:[city],gold:200,spendGold(amount){this.gold-=amount;return {ok:true,totalGold:this.gold};}});
  const session={player:makeAccount(cities[0]),bots:cities.slice(1).map(city=>({game:makeAccount(city)})),buildings,shared:{removedTreeIds:new Set()}};
  const world={seed:'directed-rail-test',gameplay:{economy:'loops'},rivers:[]};
  return {cities,session,world,rail:createSettlementRailways(world,{session,surfaceAt,sceneryCatalog:[]})};
}

test('level two creates deterministic fixed-direction stations, with no railway charge',()=>{
  const f=fixture();f.cities[2].level=1;f.cities[2].houseCount=3;
  assert.equal(f.rail.evaluate('a','b').code,'station-required');
  const added=f.rail.synchronizeStations();assert.equal(added.changed,true);assert.equal(added.stations.length,2);assert.equal(f.session.player.gold,200);
  assert.equal(f.rail.synchronizeStations().changed,false);
  const original=f.rail.stations;assert.equal(f.rail.evaluate('a','c').code,'station-required');
  assert.deepEqual(f.rail.stations,original);const other=fixture();other.cities[2].level=1;other.cities[2].houseCount=3;other.rail.synchronizeStations();assert.deepEqual(other.rail.stations,original);
});

test('outward and return tracks form a physically continuous one-way circle',()=>{
  const {rail}=fixture();rail.synchronizeStations();
  const first=rail.build('a','b');assert.equal(first.ok,true,first.reason);
  assert.equal(createDirectedRailNetwork(rail.snapshot()).loops('a').length,0);
  const second=rail.build('b','a');assert.equal(second.ok,true,second.reason);
  assert.notEqual(first.connection.id,second.connection.id);
  const graph=createDirectedRailNetwork(rail.snapshot()),loops=graph.loops('a');assert.ok(loops.length>0);
  const loop=loops[0];assert.deepEqual(loop.cityIds,['a','b']);assert.equal(loop.stops.length,2);
  for(const piece of loop.segments)assert.equal(piece.direction,1);
  for(let distance=0;distance<loop.length;distance+=.3){const a=graph.sample(loop,distance),b=graph.sample(loop,distance+.001);assert.ok(Math.hypot(a.x-b.x,a.z-b.z)<.002);assert.ok(a.tangent.x*b.tangent.x+a.tangent.z*b.tangent.z>.999);}
  const a=graph.sample(loop,-.001),b=graph.sample(loop,.001);assert.ok(Math.hypot(a.x-b.x,a.z-b.z)<.003);assert.ok(a.tangent.x*b.tangent.x+a.tangent.z*b.tangent.z>.999);
});

test('foreign platforms cannot extend jurisdiction past another city',()=>{
  const {rail}=fixture();rail.synchronizeStations();assert.ok(rail.build('a','b').ok);
  const result=rail.evaluate('b','c');assert.equal(result.valid,false);assert.equal(result.code,'outside-jurisdiction');
  assert.equal(rail.evaluate('a','c').siteValid,true);
});

test('endpoint dragging snaps forward onto exact approach geometry',()=>{
  const {rail}=fixture();rail.synchronizeStations();const built=rail.build('a','b');assert.ok(built.ok);
  const line=built.lines.at(-1),point=sampleAlignment(line.alignment,line.length*.22),draft=rail.preview('a','c',{attachments:{from:point}});
  assert.ok(draft.fromJunction);const start=sampleAlignment(draft.lines.at(-1).alignment,0);
  assert.ok(start.tangent.x*point.tangent.x+start.tangent.z*point.tangent.z>.9999);
});

test('directed graph refuses reversed, displaced and crossing-only joins',()=>{
  const {rail}=fixture();rail.synchronizeStations();assert.ok(rail.build('a','b').ok);assert.ok(rail.build('b','a').ok);
  const snapshot=rail.snapshot(),connection=snapshot.connections[0];connection.toStationId=snapshot.stations.find(s=>s.cityId==='c').id;
  assert.equal(createDirectedRailNetwork(snapshot).loops('a').length,0);
});


test('unchanged failed station sites do not retry terrain work every frame or wallet update',()=>{
  let probes=0;const f=fixture({surfaceAt:()=>{probes++;return {type:'water',height:-1};}});
  assert.equal(f.rail.synchronizeStations().changed,false);assert.ok(probes>0);const first=probes;
  for(let frame=0;frame<120;frame++){f.session.player.gold++;f.rail.synchronizeStations();}assert.equal(probes,first);
  f.cities[0].x+=3;f.rail.synchronizeStations();assert.ok(probes>first,'moving a city reconsiders its new station orbit');
});
