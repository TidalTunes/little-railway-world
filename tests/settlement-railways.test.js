import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementRailways,SETTLEMENT_RAILWAY} from '../src/settlement-railways.js';
import {createSettlementSession} from '../src/settlement-session.js';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,worldSurface} from '../src/world-model.js';
import {sampleAlignment} from '../src/alignments.js';

const flat=()=>({type:'ground',height:0});
function fixture({gold=20,surfaceAt=flat,placements=[],cities}={}){
  cities??=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:55,z:20,ownerId:'coral',level:1,houseCount:3},{id:'c',x:48,z:-40,ownerId:'blue',level:1,houseCount:3}];
  const buildings=cities.flatMap(city=>[[0,0],[4,0],[0,4]].map(([x,z],index)=>({id:`${city.id}:home:${index}`,kind:'house',cityId:city.id,ownerId:city.ownerId,
    x:city.x+x,z:city.z+z,rotation:0,width:2.2,depth:2.2})));cities.forEach(city=>city.houseIds=buildings.filter(home=>home.cityId===city.id).map(home=>home.id));
  const player={cities:[cities[0]],ownerId:'teal',gold,logs:0,spendGold(amount){if(this.gold<amount)return{ok:false,code:'not-enough-gold'};this.gold-=amount;return {ok:true,totalGold:this.gold};}};
  const actors=[],session={player,bots:cities.slice(1).map(city=>({game:{cities:[city]}})),buildings,revision:0,shared:{removedTreeIds:new Set(),getActors:()=>actors}};
  const world={seed:'rail-test',gameplay:{},rivers:[]};
  return {world,session,cities,actors,placements,surfaceAt,rail:createSettlementRailways(world,{session,surfaceAt,getPlacements:()=>placements})};
}
function assertSmooth(line){
  assert.ok(line.length>0);assert.ok(line.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z)));
  for(let i=0;i<line.alignment.segments.length;i++){
    const segment=line.alignment.segments[i];if(segment.type==='arc')assert.ok(segment.radius>=SETTLEMENT_RAILWAY.minRadius-1e-6);
    if(i){const at=segment.startDistance,before=sampleAlignment(line.alignment,at-1e-6),after=sampleAlignment(line.alignment,at+1e-6);
      assert.ok(Math.hypot(before.x-after.x,before.z-after.z)<.00001);assert.ok(before.tangent.x*after.tangent.x+before.tangent.z*after.tangent.z>.999999);}
  }
}

test('railway purchase costs exactly five gold, creates stations and paths, and cannot repeat',()=>{
  const {rail,session}=fixture();const preview=rail.evaluate('a','b');assert.ok(preview.valid);assert.equal(session.player.gold,20);
  const result=rail.build('a','b',{requireCached:true});assert.ok(result.ok);assert.equal(session.player.gold,15);assert.equal(rail.stations.length,2);
  assert.equal(rail.lines.length,3);assert.equal(rail.paths.length,2);rail.lines.forEach(assertSmooth);
  assert.equal(rail.build('b','a').code,'already-connected');assert.equal(session.player.gold,15);
  const snapshot=rail.snapshot();snapshot.stations[0].x=999;assert.notEqual(rail.stations[0].x,999);
});

test('outposts, foreign-only pairs, self routes, and insufficient gold never create infrastructure',()=>{
  const {rail,session}=fixture({gold:4});assert.equal(rail.evaluate('a','b').code,'not-enough-gold');
  assert.equal(rail.build('a','b').ok,false);assert.equal(rail.evaluate('b','c').code,'not-your-city');
  assert.equal(rail.evaluate('a','a').code,'invalid-city');session.player.cities[0].level=0;session.player.cities[0].houseCount=2;
  assert.equal(rail.evaluate('a','b').code,'invalid-city');assert.equal(session.player.gold,4);assert.equal(rail.lines.length,0);
});

test('additional lines reuse a station and meet the shared network with a continuous tangent',()=>{
  const {rail}=fixture();assert.ok(rail.build('a','b').ok);const station=rail.stations.find(s=>s.cityId==='a'),before=rail.lines;
  const result=rail.build('a','c');assert.ok(result.ok,result.reason);assert.equal(rail.stations.length,3);assert.deepEqual(rail.stations.find(s=>s.cityId==='a'),station);
  assert.equal(rail.lines.filter(line=>line.id===station.lineId).length,1);assert.equal(result.lines.length,2);
  const branch=result.lines.at(-1),start=sampleAlignment(branch.alignment,0),junction=result.fromJunction;
  const shared=junction?before.find(line=>line.id===junction.lineId):before.find(line=>line.id===station.lineId);
  const distances=junction?[junction.distance]:[0,shared.length];
  assert.ok(distances.some(distance=>{const p=sampleAlignment(shared.alignment,distance);return Math.hypot(p.x-start.x,p.z-start.z)<1e-5&&Math.abs(p.tangent.x*start.tangent.x+p.tangent.z*start.tangent.z)>.999999;}));
  rail.lines.forEach(assertSmooth);
});

test('river crossings get bridge spans and the route footprint avoids occupied farms and houses',()=>{
  const farm={id:'farm',kind:'farm',x:25,z:8,width:12,depth:13,rotation:.15};
  const surfaceAt=(x,z)=>x>27&&x<30?{type:'water',height:-1.2}:flat();
  const {rail}=fixture({surfaceAt,placements:[farm]});const result=rail.build('a','b');assert.ok(result.ok,result.reason);
  assert.ok(result.lines.some(line=>line.bridges.length));
  for(const line of result.lines){assertSmooth(line);for(const point of line.points){const dx=point.x-farm.x,dz=point.z-farm.z,c=Math.cos(farm.rotation),s=Math.sin(farm.rotation);
    assert.ok(Math.hypot(Math.max(0,Math.abs(dx*c-dz*s)-farm.width/2),Math.max(0,Math.abs(dx*s+dz*c)-farm.depth/2))>=SETTLEMENT_RAILWAY.halfWidth);}}
});

test('rail construction clears only corridor trees without awarding logs',()=>{
  const {rail,placements,session}=fixture();const preview=rail.evaluate('a','b'),point=preview.lines.at(-1).points[20];
  placements.push({id:'on-rail',kind:'tree',...point,radius:.8},{id:'distant',kind:'tree',x:-75,z:75,radius:.8});
  // A fresh worker plan sees the canonical scenery; the authority adopts it.
  const worker=createSettlementRailways({seed:'rail-test',gameplay:{},rivers:[]},{session,getPlacements:()=>placements,surfaceAt:flat});
  const result=worker.evaluate('a','b');assert.ok(rail.adoptPreview('a','b',result,rail.geometryKey('a','b')));
  assert.ok(rail.build('a','b',{requireCached:true}).ok);assert.ok(session.shared.removedTreeIds.has('on-rail'));assert.ok(!session.shared.removedTreeIds.has('distant'));assert.equal(session.player.logs,0);
});

test('worker previews reuse geometry, honor the current wallet and reject stale occupancy',()=>{
  const {rail,world,session,surfaceAt}=fixture({gold:4}),key=rail.geometryKey('a','b');const preview=rail.evaluate('a','b');
  const authority=createSettlementRailways(world,{session,surfaceAt});session.player.gold=10;
  assert.ok(authority.adoptPreview('a','b',preview,key));assert.equal(authority.evaluate('a','b').affordable,true);
  session.buildings.push({id:'new-house',kind:'house',x:80,z:80});
  assert.equal(authority.adoptPreview('a','b',preview,key),false);assert.equal(authority.build('a','b',{requireCached:true}).code,'world-changed');assert.equal(session.player.gold,10);
});

test('stations cannot be built over a traveller and hydrated network states preserve station reuse',()=>{
  const {rail,world,session,surfaceAt,actors}=fixture();const preview=rail.evaluate('a','b');actors.push({...preview.stations[0]});
  assert.equal(rail.build('a','b',{requireCached:true}).code,'player-blocked');assert.equal(session.player.gold,20);actors.length=0;
  assert.ok(rail.build('a','b',{requireCached:true}).ok);const next=createSettlementRailways(world,{session,surfaceAt,initialState:rail.snapshot()});
  assert.equal(next.evaluate('a','b').code,'already-connected');assert.equal(next.stations.length,2);assert.equal(next.revision,rail.revision);
});

test('merging cities preserves station occupancy and canonical connection deduplication',()=>{
  const {rail,session}=fixture();assert.ok(rail.build('a','b').ok);const original=rail.stations.find(station=>station.cityId==='a');
  session.player.cities[0]={...session.player.cities[0],id:'merged-city'};
  assert.equal(rail.evaluate('merged-city','b').code,'already-connected');
  assert.equal(rail.stations.find(station=>station.id===original.id).cityId,'merged-city');assert.equal(rail.reservations.length,5);
});

test('the settlement wallet rejects invalid costs and cannot become negative',()=>{
  const world={seed:'wallet',gameplay:{ownerId:'teal',starterHouse:{id:'h',x:0,z:0,rotation:0}}},session=createSettlementSession(world,{surfaceAt:flat});
  assert.equal(session.player.spendGold(-5).code,'invalid-cost');assert.equal(session.player.spendGold(1.5).code,'invalid-cost');
  assert.equal(session.player.spendGold(5).code,'not-enough-gold');assert.equal(session.player.gold,0);
});

test('canonical off-screen island scenery supports the actual starter layout and shared farm routes',()=>{
  const world=generateWorld(createSettlementWorld(),{detail:'network'}),starter=world.gameplay.starterHouse;
  const city={id:'player-city',x:-84,z:-43-2/3,ownerId:'teal',level:1,houseCount:3};
  const {session}=fixture({cities:[city]});session.buildings=[[0,0],[-6,3],[0,-5]].map(([x,z],index)=>({...starter,id:`actual-${index}`,x:starter.x+x,z:starter.z+z,cityId:city.id}));
  city.houseIds=session.buildings.map(home=>home.id);const rail=createSettlementRailways(world,{session});
  const targets=world.gameplay.farmVillages.cities;
  const first=rail.build(city.id,targets[0].id);assert.ok(first.ok,first.reason);assert.equal(first.paths.length,2);assert.ok(rail.sceneryCatalog.length>100);
  const second=rail.build(city.id,targets[1].id);assert.ok(second.ok,second.reason);assert.equal(rail.stations.length,3);assert.ok(second.fromJunction);
  for(const line of rail.lines){assertSmooth(line);for(const point of line.points){const surface=worldSurface(world,point.x,point.z);assert.ok(['ground','water','mountain'].includes(surface.type));if(surface.type!=='water')assert.ok(surface.height<.14);}}
});

test('separated islands fail safely instead of laying unsupported rails across ocean',()=>{
  const surfaceAt=(x,z)=>Math.hypot(x,z)<19||Math.hypot(x-55,z-20)<19?flat():{type:'ocean',height:-1.2};
  const {rail,session}=fixture({surfaceAt});const result=rail.build('a','b');
  assert.equal(result.ok,false);assert.ok(['route-blocked','station-blocked'].includes(result.code));assert.equal(session.player.gold,20);assert.equal(rail.lines.length,0);
});
