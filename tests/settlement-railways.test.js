import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementRailways,SETTLEMENT_RAILWAY} from '../src/settlement-railways.js';
import {createSettlementSession} from '../src/settlement-session.js';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,worldSurface,mountainHeight,CLEARANCES} from '../src/world-model.js';
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

test('river crossings get bridges and removable farms do not bend the route',()=>{
  const farm={id:'farm',kind:'farm',x:25,z:8,width:12,depth:13,rotation:.15};
  const surfaceAt=(x,z)=>x>27&&x<30?{type:'water',height:-1.2}:flat();
  const baseline=fixture({surfaceAt}).rail.evaluate('a','b');
  const {rail}=fixture({surfaceAt,placements:[farm]});const result=rail.build('a','b');assert.ok(result.ok,result.reason);
  assert.ok(result.lines.some(line=>line.bridges.length));
  assert.deepEqual(result.lines.map(line=>line.alignment),baseline.lines.map(line=>line.alignment));
  assert.deepEqual(result.clearedPlacementIds,['farm']);assert.equal(result.clearedPlacements[0].kind,'farm');
  assert.deepEqual(rail.snapshot().clearedPlacementIds,['farm']);result.lines.forEach(assertSmooth);
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
  const previous=rail.revision;
  session.player.cities[0]={...session.player.cities[0],id:'merged-city'};
  const snapshot=rail.snapshot();assert.equal(snapshot.revision,previous+1);assert.equal(snapshot.revision,rail.revision,'reconciliation and its revision publish atomically');
  assert.equal(snapshot.stations.find(station=>station.id===original.id).cityId,'merged-city');
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
  for(const line of rail.lines){assertSmooth(line);for(const point of line.points){const surface=worldSurface(world,point.x,point.z);assert.ok(['ground','water','ocean','shore','mountain'].includes(surface.type));}}
});

test('editing equal-distance route handles changes the spline while preserving tangent and radius constraints',()=>{
  const f=fixture(),initial=f.rail.evaluate('a','b'),line=initial.lines.at(-1),handles=initial.handles;
  assert.ok(handles.length>0);const spacing=line.length/(handles.length+1);
  handles.forEach((point,index)=>{assert.ok(Math.abs(point.distance-spacing*(index+1))<1e-8);
    const sample=sampleAlignment(line.alignment,point.distance);assert.ok(Math.hypot(sample.x-point.x,sample.z-point.z)<1e-8);});
  const waypoints=handles.map(point=>({x:point.x,z:point.z+12})),options={waypoints};
  const edited=f.rail.evaluate('a','b',options);assert.ok(edited.valid,edited.reason);assert.deepEqual(edited.waypoints,waypoints);
  assert.notDeepEqual(edited.lines.at(-1).points,line.points);edited.lines.forEach(assertSmooth);
  for(const waypoint of waypoints)assert.ok(edited.lines.at(-1).points.some(point=>Math.hypot(point.x-waypoint.x,point.z-waypoint.z)<.36));
  assert.equal(f.session.player.gold,20);assert.equal(f.rail.build('a','b',{requireCached:true}).code,'world-changed','an edited curve cannot be confirmed as the initial curve');
  assert.ok(f.rail.build('a','b',{...options,requireCached:true}).ok);assert.equal(f.session.player.gold,15);
});

test('opposite destinations use the shorter back of an existing station without moving it',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:100,z:0,ownerId:'coral',level:1,houseCount:3},{id:'c',x:-80,z:0,ownerId:'blue',level:1,houseCount:3}];
  const {rail}=fixture({cities}),first=rail.build('a','b');assert.ok(first.ok);
  const station=rail.stations.find(s=>s.cityId==='a'),original=first.lines.at(-1).points[0],next=rail.evaluate('a','c');assert.ok(next.valid,next.reason);
  const start=next.lines.at(-1).points[0];assert.equal(next.fromJunction,null);
  assert.ok(Math.abs(Math.hypot(start.x-original.x,start.z-original.z)-SETTLEMENT_RAILWAY.spineLength)<1e-5);
  assert.deepEqual(rail.stations.find(s=>s.cityId==='a'),station);
});

test('clear default routes and edited corners stay close to the requested direct alignment',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:100,z:0,ownerId:'coral',level:1,houseCount:3}],{rail}=fixture({cities});
  const initial=rail.evaluate('a','b'),line=initial.lines.at(-1);
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
  assert.ok(line.length<distance(line.points[0],line.points.at(-1))*1.03,'unobstructed routes should be nearly straight');
  for(const offset of [5,15,25,50]){
    const waypoints=initial.handles.map((point,index)=>({x:point.x,z:point.z+(index%2?-offset:offset)})),edited=rail.evaluate('a','b',{waypoints});
    assert.ok(edited.valid,edited.reason);const route=edited.lines.at(-1),points=[route.points[0],...waypoints,route.points.at(-1)];
    const requestedLength=points.slice(1).reduce((sum,p,i)=>sum+distance(points[i],p),0);
    assert.ok(route.length<requestedLength*1.12,'corner smoothing must not introduce a long loop or detour');assertSmooth(route);
  }
});

test('a direct mountain crossing receives covered tunnels and open cuttings instead of a detour',()=>{
  const mountain={id:'ridge',x:28,z:10,radius:15,height:13},surfaceAt=(x,z)=>{const height=mountainHeight(mountain,x,z);return{type:height>0?'mountain':'ground',height};};
  const f=fixture({surfaceAt});f.world.mountains=[mountain];
  const result=f.rail.evaluate('a','b');assert.ok(result.valid,result.reason);
  const line=result.lines.at(-1);assert.ok(line.cuts.length);assert.ok(line.tunnels.length);assert.ok(line.length<65,'the route cuts through the ridge');
  for(const span of line.tunnels){assert.equal(span.mountainId,mountain.id);assert.ok(span.cutStart<=span.start&&span.cutEnd>=span.end);
    for(const portal of [span.entry,span.exit])assert.ok(mountainHeight(mountain,portal.x,portal.z)>=CLEARANCES.tunnelRoofHeight-.01);}
  result.lines.forEach(assertSmooth);
});

test('invalid or self-crossing edits cannot spend gold or alter existing infrastructure',()=>{
  const {rail,session}=fixture();
  for(const waypoints of [[{x:NaN,z:2}],Array.from({length:33},()=>({x:10,z:2})),[{x:18,z:-20},{x:40,z:20},{x:18,z:20},{x:40,z:-20}]]){
    const result=rail.build('a','b',{waypoints});assert.equal(result.ok,false);assert.ok(['invalid-waypoints','route-blocked'].includes(result.code));
  }
  assert.equal(session.player.gold,20);assert.equal(rail.stations.length,0);
});

test('an editable route cannot demolish an occupied house even when a handle is pulled onto it',()=>{
  const {rail,session}=fixture(),home={id:'occupied-home',kind:'house',x:27,z:8,width:3,depth:3,rotation:.3};session.buildings.push(home);
  const automatic=rail.evaluate('a','b');assert.ok(automatic.valid,automatic.reason);
  for(const line of automatic.lines)for(const point of line.points){
    const dx=point.x-home.x,dz=point.z-home.z,c=Math.cos(home.rotation),s=Math.sin(home.rotation);
    assert.ok(Math.hypot(Math.max(0,Math.abs(dx*c-dz*s)-home.width/2),Math.max(0,Math.abs(dx*s+dz*c)-home.depth/2))>=SETTLEMENT_RAILWAY.halfWidth);
  }
  const invalid=rail.build('a','b',{waypoints:[{x:home.x,z:home.z}]});assert.equal(invalid.ok,false);assert.equal(invalid.code,'route-blocked');
  assert.equal(session.player.gold,20);assert.equal(rail.lines.length,0);assert.deepEqual(invalid.handles,[{x:home.x,z:home.z}]);
});

test('separated islands and bays get continuous bridges without forcing a detour',()=>{
  const surfaceAt=(x,z)=>Math.hypot(x,z)<19||Math.hypot(x-55,z-20)<19?flat():{type:'ocean',height:-1.2};
  const {rail,session}=fixture({surfaceAt});const result=rail.build('a','b');
  assert.ok(result.ok,result.reason);assert.equal(session.player.gold,15);
  const crossing=result.lines.at(-1);assert.ok(crossing.bridges.length);assertSmooth(crossing);
  for(let i=0;i<crossing.points.length;i++)if(surfaceAt(crossing.points[i].x,crossing.points[i].z).type==='ocean'){
    assert.ok(crossing.bridges.some(span=>span.start<=crossing.distances[i]&&span.end>=crossing.distances[i]));
  }
});

test('routes cannot escape the authored world boundary',()=>{
  const surfaceAt=(x,z)=>Math.hypot(x,z)<19||Math.hypot(x-55,z-20)<19?flat():{type:'outside',height:-5};
  const {rail,session}=fixture({surfaceAt});const result=rail.build('a','b');
  assert.equal(result.ok,false);assert.ok(['route-blocked','station-blocked'].includes(result.code));assert.equal(session.player.gold,20);assert.equal(rail.lines.length,0);
});
