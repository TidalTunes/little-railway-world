import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementRailways} from '../src/settlement-railways.js';
import {createDirectedRailNetwork} from '../src/directed-rail-network.js';
import {sampleAlignment} from '../src/alignments.js';

function fixture({surfaceAt=()=>({type:'ground',height:0})}={}){
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:2,houseCount:6},{id:'b',x:65,z:20,ownerId:'gray',level:2,houseCount:6},{id:'c',x:45,z:-60,ownerId:'orange',level:2,houseCount:6}];
  const buildings=cities.flatMap(city=>[[0,0],[4,0],[0,4],[-4,0],[0,-4],[4,4]].map(([x,z],index)=>({id:`${city.id}:home:${index}`,kind:'house',cityId:city.id,ownerId:city.ownerId,x:city.x+x,z:city.z+z,rotation:0,width:2.2,depth:2.2})));
  for(const city of cities)city.houseIds=buildings.filter(h=>h.cityId===city.id).map(h=>h.id);
  const makeAccount=city=>({ownerId:city.ownerId,cities:[city],gold:0,logs:40,
    resourcesAt(){return {resources:this.logs};},
    spendResources(amount){if(this.resourcesAt().resources<amount)return {ok:false,code:'not-enough-resources'};this.logs-=amount;return {ok:true,totalResources:this.resourcesAt().resources};},
    spendGold(){assert.fail('loop railways must not spend Gold');}});
  const session={player:makeAccount(cities[0]),bots:cities.slice(1).map(city=>({game:makeAccount(city)})),buildings,shared:{removedTreeIds:new Set()}};
  const world={seed:'directed-rail-test',gameplay:{economy:'loops'},rivers:[]};
  return {cities,session,world,rail:createSettlementRailways(world,{session,surfaceAt,sceneryCatalog:[]})};
}

test('level two creates deterministic fixed-direction stations, with no railway charge',()=>{
  const f=fixture();f.cities[2].level=1;f.cities[2].houseCount=3;
  assert.equal(f.rail.evaluate('a','b').code,'station-required');
  const added=f.rail.synchronizeStations();assert.equal(added.changed,true);assert.equal(added.stations.length,2);assert.equal(f.session.player.gold,0);assert.equal(f.session.player.logs,40);
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

test('explicit station ends preserve a wrong-way editable draft and reject payment',()=>{
  const {rail,session}=fixture();rail.synchronizeStations();const a=rail.stations.find(s=>s.cityId==='a'),b=rail.stations.find(s=>s.cityId==='b');
  const from=rail.anchorAt(null,{stationId:a.id,side:-1}),to=rail.anchorAt(null,{stationId:b.id,side:-1});
  assert.equal(from.cityId,'a');assert.equal(from.fromAllowed,false);assert.equal(from.toAllowed,true);
  const options={attachments:{from:from.attachment,to:to.attachment}},draft=rail.preview('a','b',options);
  assert.equal(draft.code,'wrong-direction');assert.equal(draft.siteValid,false);assert.deepEqual(draft.directionErrors,['from']);
  assert.deepEqual(draft.handles[0].attachment,from.attachment);assert.equal(draft.handles[0].x,from.x);assert.equal(draft.handles[0].z,from.z);assert.ok(draft.lines[0].points.length>1);
  const gold=session.player.gold;assert.equal(rail.build('a','b',options).code,'wrong-direction');assert.equal(session.player.gold,gold);assert.equal(rail.snapshot().connections.length,0);
  options.attachments.from=rail.anchorAt(null,{stationId:a.id,side:1}).attachment;
  assert.equal(rail.evaluate('a','b',options).valid,true);
});

test('coordinate dragging can select either station end without silently flipping it',()=>{
  const {rail}=fixture();rail.synchronizeStations();const station=rail.stations.find(s=>s.cityId==='a'),entry=rail.anchorAt(null,{stationId:station.id,side:-1});
  const result=rail.preview('a','b',{attachments:{from:{x:entry.x,z:entry.z}}});assert.equal(result.code,'wrong-direction');assert.equal(result.handles[0].attachment.side,-1);
  assert.ok(Math.hypot(result.handles[0].x-entry.x,result.handles[0].z-entry.z)<1e-8);
});

test('multiple physical routes between the same cities retain unique infrastructure identities',()=>{
  const {rail}=fixture();rail.synchronizeStations();const first=rail.build('a','b');assert.ok(first.ok,first.reason);
  const options={waypoints:[{x:60,z:-50}]},second=rail.build('a','b',options);assert.ok(second.ok,second.reason);assert.notEqual(first.connection.id,second.connection.id);assert.notEqual(first.lines[0].id,second.lines[0].id);
  assert.equal(rail.snapshot().connections.filter(connection=>connection.from==='a'&&connection.to==='b').length,2);
  const firstPoints=first.lines[0].points,secondPoints=second.lines[0].points;assert.notDeepEqual(firstPoints,secondPoints);
  const ids=rail.lines.map(line=>line.id);assert.equal(new Set(ids).size,ids.length);
  const count=rail.lines.length;assert.equal(rail.build('a','b',options).ok,false,'an overlapping duplicate cannot be placed');assert.equal(rail.lines.length,count);
});

test('typed track anchors stay on the selected physical line and reverse directions are rejected',()=>{
  const {rail}=fixture();rail.synchronizeStations();const first=rail.build('a','b');assert.ok(first.ok);const line=first.lines.at(-1),point=sampleAlignment(line.alignment,line.length*.25);
  const anchor=rail.anchorAt({...point,x:point.x+.05},{lineId:line.id,distance:line.length*.25,ownerId:'teal',maxDistance:.001});
  assert.equal(anchor.attachment.lineId,line.id);assert.equal(anchor.cityId,'a');assert.equal(anchor.accessible,true);
  const exact=sampleAlignment(line.alignment,anchor.attachment.distance);assert.ok(Math.hypot(exact.x-anchor.x,exact.z-anchor.z)<1e-7);
  const draft=rail.preview('a','c',{attachments:{from:{...anchor.attachment,direction:-1}}});assert.equal(draft.code,'wrong-direction');assert.deepEqual(draft.directionErrors,['from']);
  assert.equal(draft.handles[0].attachment.lineId,line.id);assert.equal(draft.handles[0].attachment.direction,-1);
});

test('blocked drafts retain explicit station and track anchors before any interior edits',()=>{
  const {rail,session}=fixture();rail.synchronizeStations();const built=rail.build('a','b');assert.ok(built.ok);
  const a=rail.stations.find(s=>s.cityId==='a'),b=rail.stations.find(s=>s.cityId==='b'),c=rail.stations.find(s=>s.cityId==='c');
  const stationFrom=rail.anchorAt(null,{stationId:a.id,side:1}).attachment,stationTo=rail.anchorAt(null,{stationId:b.id,side:-1}).attachment;
  const blocked=rail.preview('a','b',{attachments:{from:stationFrom,to:stationTo}});assert.equal(blocked.code,'route-blocked');
  assert.deepEqual(blocked.handles[0].attachment,stationFrom);assert.deepEqual(blocked.handles.at(-1).attachment,stationTo);
  const line=built.lines.at(-1),track=rail.anchorAt(null,{lineId:line.id,distance:line.length*.25}).attachment,to=rail.anchorAt(null,{stationId:c.id,side:-1}).attachment;
  session.buildings.push({id:'block-the-anchor',kind:'house',x:track.x,z:track.z,width:8,depth:8});
  const result=rail.preview('a','c',{attachments:{from:track,to}});assert.equal(result.code,'route-blocked');
  const retained=result.handles[0].attachment;
  assert.equal(retained.kind,'track');assert.equal(retained.lineId,track.lineId);assert.equal(retained.direction,track.direction);
  assert.ok(Math.abs(retained.distance-track.distance)<1e-7);assert.ok(Math.hypot(retained.x-track.x,retained.z-track.z)<1e-7);
  assert.deepEqual(result.handles.at(-1).attachment,to);
  result.handles[0].attachment.distance=999;assert.notEqual(track.distance,999,'returned handles cannot mutate the submitted anchor');
});

test('loop railway prices use straight city distance and spend Resources with zero Gold',()=>{
  const {rail,session}=fixture();rail.synchronizeStations();
  const straight=rail.preview('a','b'),bent=rail.preview('a','b',{waypoints:[{x:60,z:-50}]});
  assert.equal(straight.costResource,'resources');assert.equal(straight.cost,4);
  assert.equal(bent.cost,straight.cost,'bending does not add priced distance units');
  assert.equal(bent.waypointCount,straight.waypointCount);
  assert.notDeepEqual(bent.lines[0].points,straight.lines[0].points);
  const built=rail.build('a','b');assert.equal(built.ok,true,built.reason);
  assert.equal(built.costResource,'resources');assert.equal(built.connection.costResource,'resources');
  assert.equal(built.totalResources,36);assert.equal(session.player.logs,36);assert.equal(session.player.gold,0);
});

test('loop affordability refreshes after spending without rebuilding cached or adopted geometry',()=>{
  let probes=0;const {rail,session}=fixture({surfaceAt:()=>{probes++;return {type:'ground',height:0};}});rail.synchronizeStations();
  const plan=rail.evaluate('a','b'),key=rail.geometryKey('a','b'),checked=probes;
  assert.equal(plan.valid,true);session.player.logs=3;session.player.gold=1000;
  const poor=rail.evaluate('a','b');assert.equal(poor.siteValid,true);assert.equal(poor.valid,false);
  assert.equal(poor.code,'not-enough-resources');assert.equal(poor.costResource,'resources');assert.equal(probes,checked);
  assert.equal(rail.adoptPreview('a','b',plan,key),true);
  assert.equal(rail.build('a','b',{requireCached:true}).code,'not-enough-resources');assert.equal(probes,checked);assert.equal(session.player.logs,3);
  session.player.logs=4;
  const built=rail.build('a','b',{requireCached:true});assert.equal(built.ok,true,built.reason);assert.equal(built.totalResources,0);assert.equal(probes,checked);
  assert.equal(session.player.gold,1000,'Gold never pays for a resource-priced railway');
});
