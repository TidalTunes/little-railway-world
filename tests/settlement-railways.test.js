import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementRailways,railwayControlCount,SETTLEMENT_RAILWAY} from '../src/settlement-railways.js';
import {createSettlementSession} from '../src/settlement-session.js';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,worldSurface,mountainHeight,CLEARANCES} from '../src/world-model.js';
import {sampleAlignment,combineAlignments,straightSegment,sampleAlignmentPoints} from '../src/alignments.js';

const flat=()=>({type:'ground',height:0});
const interior=preview=>preview.handles.filter(handle=>handle.kind==='bend').map(({x,z})=>({x,z}));
const endpoints=preview=>({from:{x:preview.handles[0].x,z:preview.handles[0].z},to:{x:preview.handles.at(-1).x,z:preview.handles.at(-1).z}});
function fixture({gold=20,surfaceAt=flat,placements=[],cities,maxConnectionDistance=1000}={}){
  cities??=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:55,z:20,ownerId:'coral',level:1,houseCount:3},{id:'c',x:48,z:-40,ownerId:'blue',level:1,houseCount:3}];
  const buildings=cities.flatMap(city=>[[0,0],[4,0],[0,4]].map(([x,z],index)=>({id:`${city.id}:home:${index}`,kind:'house',cityId:city.id,ownerId:city.ownerId,
    x:city.x+x,z:city.z+z,rotation:0,width:2.2,depth:2.2})));cities.forEach(city=>city.houseIds=buildings.filter(home=>home.cityId===city.id).map(home=>home.id));
  const player={cities:[cities[0]],ownerId:'teal',gold,logs:0,spendGold(amount){if(this.gold<amount)return{ok:false,code:'not-enough-gold'};this.gold-=amount;return {ok:true,totalGold:this.gold};}};
  const actors=[],session={player,bots:cities.slice(1).map(city=>({game:{cities:[city]}})),buildings,revision:0,shared:{removedTreeIds:new Set(),getActors:()=>actors}};
  const world={seed:'rail-test',gameplay:{...(maxConnectionDistance===null?{}:{railwayMaxDistance:maxConnectionDistance})},rivers:[]};
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
  world.gameplay.railwayMaxDistance=1000;
  const city={id:'player-city',x:-84,z:-43-2/3,ownerId:'teal',level:1,houseCount:3};
  const {session}=fixture({cities:[city]});session.buildings=[[0,0],[-6,3],[0,-5]].map(([x,z],index)=>({...starter,id:`actual-${index}`,x:starter.x+x,z:starter.z+z,cityId:city.id}));
  city.houseIds=session.buildings.map(home=>home.id);const rail=createSettlementRailways(world,{session});
  const targets=world.gameplay.farmVillages.cities;
  const first=rail.build(city.id,targets[0].id);assert.ok(first.ok,first.reason);assert.equal(first.paths.length,2);assert.ok(rail.sceneryCatalog.length>100);
  const second=rail.build(city.id,targets[1].id);assert.ok(second.ok,second.reason);assert.equal(rail.stations.length,3);assert.ok(second.fromJunction);
  for(const line of rail.lines){assertSmooth(line);for(const point of line.points){const surface=worldSurface(world,point.x,point.z);assert.ok(['ground','water','ocean','shore','mountain'].includes(surface.type));}}
});

test('editing equal-distance route handles changes the spline while preserving tangent and radius constraints',()=>{
  const f=fixture(),initial=f.rail.evaluate('a','b'),line=initial.lines.at(-1),handles=initial.handles.filter(h=>h.kind==='bend');
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
    const waypoints=initial.handles.filter(h=>h.kind==='bend').map((point,index)=>({x:point.x,z:point.z+(index%2?-offset:offset)})),edited=rail.evaluate('a','b',{waypoints});
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
  const waypoints=automatic.handles.filter(h=>h.kind==='bend').map(({x,z})=>({x,z}));waypoints[0]={x:home.x,z:home.z};
  const invalid=rail.build('a','b',{waypoints});assert.equal(invalid.ok,false);assert.equal(invalid.code,'route-blocked');
  assert.equal(session.player.gold,20);assert.equal(rail.lines.length,0);
  assert.deepEqual(invalid.handles.filter(h=>h.kind==='bend').map(({x,z})=>({x,z})),waypoints);
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

test('synchronous drafts skip scenery and expensive terrain work but match authoritative geometry exactly',()=>{
  let surfaceCalls=0;const surfaceAt=()=>{surfaceCalls++;return flat();};
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:200,z:0,ownerId:'coral',level:1,houseCount:3}];
  const f=fixture({surfaceAt,cities}),draft=f.rail.preview('a','b');
  assert.ok(draft.valid);assert.equal(draft.provisional,true);assert.equal(f.rail.sceneryCatalog,null);
  assert.ok(surfaceCalls<200,'a live draft only probes a bounded number of station footprints');
  assert.deepEqual(draft.paths,[]);assert.deepEqual(draft.clearedPlacementIds,[]);
  assert.equal(f.rail.adoptPreview('a','b',draft,f.rail.geometryKey('a','b')),false,'provisional geometry cannot impersonate a completed worker validation');
  assert.equal(f.rail.build('a','b',{requireCached:true}).code,'world-changed');
  const options={waypoints:interior(draft),attachments:endpoints(draft)};options.waypoints[0].z-=5;
  surfaceCalls=0;const edited=f.rail.preview('a','b',options);assert.ok(edited.valid,edited.reason);
  assert.equal(surfaceCalls,0,'moving an interior node reuses grounded station sites');
  const worker=createSettlementRailways(f.world,{session:f.session,surfaceAt,getPlacements:()=>f.placements,initialState:f.rail.snapshot()});
  const authoritative=worker.evaluate('a','b',options);assert.ok(authoritative.valid,authoritative.reason);assert.equal(authoritative.provisional,false);
  assert.deepEqual(authoritative.stations,edited.stations);assert.deepEqual(authoritative.handles,edited.handles);
  assert.deepEqual(authoritative.lines.map(line=>line.alignment),edited.lines.map(line=>line.alignment));
  assert.deepEqual(authoritative.lines.map(line=>line.points),edited.lines.map(line=>line.points));
  assert.equal(f.session.player.gold,20);
});

test('interior node count depends only on city distance and submitted edits keep their positions and identity',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:200,z:0,ownerId:'coral',level:1,houseCount:3}],{rail}=fixture({cities});
  const initial=rail.preview('a','b'),count=Math.ceil(200/48)-1;assert.equal(initial.handles.length,count+2);
  assert.equal(count,4,'the 200-unit route now has four interior dots rather than seven');
  assert.equal(initial.handles[0].role,'from');assert.equal(initial.handles.at(-1).role,'to');
  const options={attachments:endpoints(initial),waypoints:interior(initial)};
  for(const offset of [10,30,60]){
    options.waypoints=interior(initial).map((p,i)=>({...p,z:p.z+Math.sin((i+1)/(count+1)*Math.PI)*offset}));
    const edited=rail.preview('a','b',options);assert.ok(edited.valid,edited.reason);assert.equal(edited.handles.length,count+2);
    assert.deepEqual(edited.handles.map(h=>h.id),initial.handles.map(h=>h.id));assert.deepEqual(interior(edited),options.waypoints);
    assert.deepEqual(endpoints(edited),options.attachments);assertSmooth(edited.lines.at(-1));
    assert.deepEqual(rail.evaluate('a','b',options).handles,edited.handles,'worker completion never redistributes edited controls');
  }
  const invalid=rail.preview('a','b',{...options,waypoints:[...options.waypoints,{x:90,z:50}]});
  assert.equal(invalid.code,'invalid-waypoints');assert.equal(invalid.handles.length,count+2);
});

test('new station endpoints orbit a fixed city-edge circle with tangent heading and idempotent snapping',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:200,z:0,ownerId:'coral',level:1,houseCount:3}],f=fixture({cities});
  const initial=f.rail.preview('a','b'),options={attachments:endpoints(initial),waypoints:interior(initial)};
  options.attachments.from.z-=6;const moved=f.rail.preview('a','b',options);assert.ok(moved.valid,moved.reason);
  assert.deepEqual(endpoints(moved).to,options.attachments.to);assert.deepEqual(interior(moved),options.waypoints);
  assert.notDeepEqual(moved.stations.find(station=>station.cityId==='a'),initial.stations.find(station=>station.cityId==='a'));
  assert.deepEqual(moved.stations.find(station=>station.cityId==='b'),initial.stations.find(station=>station.cityId==='b'));
  const station=moved.stations.find(station=>station.cityId==='a'),first=initial.stations.find(station=>station.cityId==='a');
  assert.equal(station.orbitRadius,first.orbitRadius);
  assert.ok(Math.abs(Math.hypot(station.center.x,station.center.z)-station.orbitRadius)<1e-8);
  assert.ok(Math.abs(station.center.x*Math.cos(station.heading)+station.center.z*Math.sin(station.heading))<1e-8,'the track and platform are tangent to the city circle');
  const radius=Math.hypot(station.orbitRadius,7),endpoint=moved.handles[0];
  assert.ok(Math.abs(Math.hypot(endpoint.x,endpoint.z)-radius)<1e-8);
  assert.ok(Math.abs(endpoint.x*options.attachments.from.z-endpoint.z*options.attachments.from.x)<1e-8,'dragging follows cursor angle, never radial distance');
  const replay={...options,attachments:endpoints(moved)},replayed=f.rail.preview('a','b',replay);
  assert.deepEqual(replayed.stations,moved.stations);assert.deepEqual(replayed.handles,moved.handles);
  const farther={...options,attachments:{...options.attachments,from:{x:options.attachments.from.x*100,z:options.attachments.from.z*100}}};
  assert.deepEqual(f.rail.preview('a','b',farther).stations,moved.stations,'even a far-away cursor stays on the same orbital site');
  const full=f.rail.evaluate('a','b',options);assert.deepEqual(full.stations,moved.stations);assert.deepEqual(full.lines.map(line=>line.alignment),moved.lines.map(line=>line.alignment));
  assert.equal(f.rail.build('a','b',{...farther,requireCached:true}).code,'world-changed');assert.equal(f.session.player.gold,20);
  assert.ok(f.rail.build('a','b',{...options,requireCached:true}).ok);assert.equal(f.session.player.gold,15);
});

test('existing station attachment requests snap to physical ends or junctions and never relocate the station',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:100,z:0,ownerId:'coral',level:1,houseCount:3},{id:'c',x:-100,z:-40,ownerId:'blue',level:1,houseCount:3}];
  const {rail}=fixture({cities});assert.ok(rail.build('a','b').ok);
  const station=rail.stations.find(s=>s.cityId==='a'),spine=rail.lines.find(line=>line.id===station.lineId),target=spine.points[0];
  const options={attachments:{from:{x:target.x-.3,z:target.z+.2}}},draft=rail.preview('a','c',options);assert.ok(draft.valid,draft.reason);
  assert.ok(Math.hypot(draft.handles[0].x-target.x,draft.handles[0].z-target.z)<1e-7);
  assert.deepEqual(rail.stations.find(s=>s.cityId==='a'),station);assert.ok(!draft.stations.some(s=>s.cityId==='a'));
  const full=rail.evaluate('a','c',options);assert.deepEqual(full.handles,draft.handles);assert.deepEqual(full.lines.map(line=>line.alignment),draft.lines.map(line=>line.alignment));
  assertSmooth(full.lines.at(-1));
});

test('approach junctions persist and endpoint dragging slides continuously along the track',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:100,z:0,ownerId:'coral',level:1,houseCount:3},{id:'c',x:50,z:75,ownerId:'blue',level:1,houseCount:3}];
  const {rail}=fixture({cities});assert.ok(rail.build('a','b').ok);
  const existing=rail.lines.at(-1),point=sampleAlignment(existing.alignment,22),station=rail.stations.find(s=>s.cityId==='a');
  const options={attachments:{from:{x:point.x,z:point.z}}},draft=rail.preview('a','c',options);assert.ok(draft.valid,draft.reason);
  assert.equal(draft.fromJunction.lineId,existing.id);assert.equal(draft.fromJunction.distance,22);
  const start=sampleAlignment(draft.lines.at(-1).alignment,0);
  assert.ok(Math.hypot(start.x-point.x,start.z-point.z)<1e-7);
  assert.ok(Math.abs(start.tangent.x*point.tangent.x+start.tangent.z*point.tangent.z)>.999999);
  const full=rail.evaluate('a','c',options);assert.deepEqual(full.handles,draft.handles);assert.equal(full.valid,true);
  const dragged=rail.preview('a','c',{attachments:{from:{x:point.x+.2,z:point.z+.2}}});assert.ok(dragged.valid,dragged.reason);
  assert.equal(dragged.fromJunction.lineId,existing.id);assert.notEqual(dragged.fromJunction.distance,22);
  assert.ok(Math.hypot(point.x-dragged.handles[0].x,point.z-dragged.handles[0].z)<.3,'small cursor motion produces a small change in switch position');
  assert.deepEqual(rail.stations.find(s=>s.cityId==='a'),station);
});

test('track attachments project continuously onto exact straights and arcs and replay without drift',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:100,z:0,ownerId:'coral',level:1,houseCount:3},{id:'c',x:50,z:75,ownerId:'blue',level:1,houseCount:3}];
  const f=fixture({cities});assert.ok(f.rail.build('a','b').ok);const existing=f.rail.lines.at(-1),station=f.rail.stations.find(s=>s.cityId==='a');
  const arc=existing.alignment.segments.filter(segment=>segment.type==='arc').at(-1);
  for(const distance of [22.137,22.387,22.637,arc.startDistance+arc.length*.47]){
    const point=sampleAlignment(existing.alignment,distance),options={attachments:{from:{x:point.x-point.tangent.z*.3,z:point.z+point.tangent.x*.3}}};
    const draft=f.rail.preview('a','c',options);assert.ok(draft.valid,draft.reason);
    assert.equal(draft.fromJunction.lineId,existing.id);assert.ok(Math.abs(draft.fromJunction.distance-distance)<1e-8);
    assert.ok(Math.hypot(draft.handles[0].x-point.x,draft.handles[0].z-point.z)<1e-8);
    const start=sampleAlignment(draft.lines.at(-1).alignment,0);assert.ok(Math.abs(start.tangent.x*point.tangent.x+start.tangent.z*point.tangent.z)>.999999);
    const replay=f.rail.preview('a','c',{attachments:{from:endpoints(draft).from}});
    assert.deepEqual(replay.fromJunction,draft.fromJunction);assert.deepEqual(replay.handles,draft.handles);
    const full=f.rail.evaluate('a','c',options);assert.ok(full.valid,full.reason);assert.deepEqual(full.lines,draft.lines);assert.deepEqual(full.fromJunction,draft.fromJunction);
  }
  assert.deepEqual(f.rail.stations.find(s=>s.cityId==='a'),station);assert.equal(f.session.player.gold,15);
});

test('a station can branch from a second connected line without inventing a station or duplicating its rail',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:100,z:0,ownerId:'teal',level:1,houseCount:3},
    {id:'c',x:140,z:100,ownerId:'blue',level:1,houseCount:3},{id:'d',x:160,z:40,ownerId:'coral',level:1,houseCount:3}];
  const f=fixture({cities});assert.ok(f.rail.build('a','b').ok);const extension=f.rail.build('b','d');assert.ok(extension.ok,extension.reason);
  const existing=extension.lines.at(-1),distance=existing.length*.5,point=sampleAlignment(existing.alignment,distance);
  const options={attachments:{from:{x:point.x,z:point.z}}},draft=f.rail.preview('a','c',options);assert.ok(draft.valid,draft.reason);
  assert.equal(draft.fromJunction.lineId,existing.id);assert.ok(Math.abs(draft.fromJunction.distance-distance)<1e-8);
  const worker=createSettlementRailways(f.world,{session:f.session,surfaceAt:flat,initialState:f.rail.snapshot()});
  const validated=worker.evaluate('a','c',options);assert.deepEqual(validated.fromJunction,draft.fromJunction);assert.deepEqual(validated.handles,draft.handles);
  assert.ok(f.rail.adoptPreview('a','c',validated,f.rail.geometryKey('a','c',options),options));
  const count=f.rail.stations.length,built=f.rail.build('a','c',{...options,requireCached:true});assert.ok(built.ok,built.reason);
  assert.equal(f.rail.stations.length,count+1);assert.equal(f.rail.lines.filter(line=>line.id===existing.id).length,1);
  assert.deepEqual(built.connection.fromJunction,validated.fromJunction);assertSmooth(built.lines.at(-1));
});

test('endpoint snapping excludes disconnected own rails and connected rails owned by another player',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:100,z:0,ownerId:'coral',level:1,houseCount:3},{id:'c',x:50,z:75,ownerId:'blue',level:1,houseCount:3}];
  const f=fixture({cities});assert.ok(f.rail.build('a','b').ok);const state=f.rail.snapshot(),existing=state.lines.at(-1),anchor=sampleAlignment(existing.alignment,30);
  const add=(id,a,b,ownerId)=>{const alignment=combineAlignments([straightSegment(a,b)]);state.lines.push({id,ownerId,stationIds:[],alignment,...sampleAlignmentPoints(alignment)});};
  add('isolated',{x:25,z:-45},{x:75,z:-45},'teal');
  add('rail-link:foreign',anchor,{x:50,z:-65},'blue');
  state.connections.push({id:'connection:foreign',fromStationId:state.stations[0].id,fromJunction:{lineId:existing.id,distance:30},toStationId:'foreign'});
  const rail=createSettlementRailways(f.world,{session:f.session,surfaceAt:flat,initialState:state});
  for(const attachment of [{x:50,z:-45},{x:50,z:-65}]){
    const draft=rail.preview('a','c',{attachments:{from:attachment}});assert.ok(draft.valid,draft.reason);
    assert.equal(draft.fromJunction.lineId,existing.id);assert.ok(Math.hypot(draft.handles[0].x-attachment.x,draft.handles[0].z-attachment.z)>35);
  }
});

test('a switch cannot exempt foreign or disconnected rails that cross exactly at its attachment',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:100,z:0,ownerId:'coral',level:1,houseCount:3},{id:'c',x:50,z:75,ownerId:'blue',level:1,houseCount:3}];
  const f=fixture({cities});assert.ok(f.rail.build('a','b').ok);const state=f.rail.snapshot(),existing=state.lines.at(-1),point=sampleAlignment(existing.alignment,30);
  const options={attachments:{from:{x:point.x,z:point.z}}};assert.ok(f.rail.preview('a','c',options).valid);
  for(const ownerId of ['teal','blue']){
    const alignment=combineAlignments([straightSegment({x:point.x,z:point.z-20},{x:point.x,z:point.z+20})]),crossing={id:'unrelated-crossing',ownerId,stationIds:[],alignment,...sampleAlignmentPoints(alignment)};
    const rail=createSettlementRailways(f.world,{session:f.session,surfaceAt:flat,initialState:{...state,lines:[...state.lines,crossing]}});
    const draft=rail.preview('a','c',options);assert.equal(draft.siteValid,false,'coincident tracks do not imply shared ownership or connectivity');
    assert.equal(rail.evaluate('a','c',options).siteValid,false);assert.equal(rail.build('a','c',options).ok,false);assert.equal(f.session.player.gold,15);
  }
});

test('railway range defaults to 140, includes its boundary, and cannot be bypassed by dragging endpoints',()=>{
  const cities=distance=>[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:distance,z:0,ownerId:'coral',level:1,houseCount:3}];
  const edge=fixture({cities:cities(140),maxConnectionDistance:null}),ready=edge.rail.preview('a','b');
  assert.equal(edge.rail.maxConnectionDistance,140);assert.equal(ready.distance,140);assert.equal(ready.maxConnectionDistance,140);assert.ok(ready.valid,ready.reason);
  const outside=fixture({cities:cities(140.001),maxConnectionDistance:null,surfaceAt:()=>{throw new Error('Out-of-range routes must not query terrain');}});
  const options={attachments:{from:{x:60,z:0},to:{x:65,z:0}}};
  for(const result of [outside.rail.preview('a','b',options),outside.rail.evaluate('a','b',options),outside.rail.build('a','b',options),outside.rail.build('a','b',{...options,requireCached:true})]){
    assert.equal(result.code,'out-of-range');assert.equal(result.valid,false);assert.equal(result.distance,140.001);assert.equal(result.maxConnectionDistance,140);
    assert.deepEqual(result.range,{distance:140.001,maxConnectionDistance:140});assert.equal(result.reason,'Outside connection range');
    assert.equal(result.lines.length,0);assert.equal(result.stations.length,0);
  }
  assert.equal(outside.rail.sceneryCatalog,null);assert.equal(outside.session.player.gold,20);assert.equal(outside.rail.revision,0);
  assert.equal(outside.rail.adoptPreview('a','b',{...ready,provisional:false},outside.rail.geometryKey('a','b',options),options),false);
  const configured=fixture({cities:cities(145),maxConnectionDistance:150});assert.equal(configured.rail.maxConnectionDistance,150);assert.ok(configured.rail.preview('a','b').valid);
  const sameCities=fixture({cities:cities(140),maxConnectionDistance:150});assert.notEqual(sameCities.rail.geometryKey('a','b'),edge.rail.geometryKey('a','b'));
  for(const value of [0,-1,NaN,Infinity,'200'])assert.throws(()=>fixture({maxConnectionDistance:value}),/positive and finite/);
});

test('city selection radii enclose actual homes and civic footprints and retain a larger authored radius',()=>{
  const f=fixture();f.cities[0].radius=2;f.cities[1].radius=120;
  f.session.buildings.push({id:'far-home',cityId:'a',kind:'house',x:40,z:0,width:3,depth:4},
    {id:'far-civic',cityId:'a',kind:'civic',x:70,z:10,width:12,depth:8,rotation:.7});
  const cities=f.rail.cities,city=cities.find(city=>city.id==='a');
  assert.ok(city.radius>=Math.hypot(70,10)+Math.hypot(12,8)/2);assert.equal(cities.find(city=>city.id==='b').radius,120);
  assert.ok(cities.find(city=>city.id==='c').radius<10,'unrelated city buildings do not inflate another town');
});

test('terrain validation can reject an immediate draft but never reshapes it or spends gold',()=>{
  const f=fixture({surfaceAt:(x,z)=>x>22&&x<30?{type:'outside',height:-5}:flat()}),draft=f.rail.preview('a','b');assert.ok(draft.siteValid);
  const full=f.rail.evaluate('a','b');assert.equal(full.valid,false);assert.equal(full.code,'route-blocked');
  assert.deepEqual(full.handles,draft.handles);assert.deepEqual(full.lines.map(line=>line.alignment),draft.lines.map(line=>line.alignment));
  assert.equal(f.rail.build('a','b',{requireCached:true}).ok,false);assert.equal(f.session.player.gold,20);
});

test('a bounded control-count snapshot preserves edited nodes when city growth crosses a distance threshold',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:239,z:0,ownerId:'coral',level:1,houseCount:3}],f=fixture({cities});
  const initial=f.rail.preview('a','b'),options={controlCount:railwayControlCount(cities[0],cities[1]),waypoints:interior(initial)};
  assert.equal(initial.waypointCount,options.controlCount);
  assert.equal(options.controlCount,4);
  cities[1].x=241;cities[1].houseCount=4;
  assert.equal(f.rail.preview('a','b').waypointCount,5,'new drafts use the new city distance');
  const preserved=f.rail.preview('a','b',options);assert.ok(preserved.valid,preserved.reason);
  assert.equal(preserved.waypointCount,4);assert.deepEqual(interior(preserved),options.waypoints);
  assert.deepEqual(preserved.handles.map(h=>h.id),initial.handles.map(h=>h.id));
  const worker=createSettlementRailways(f.world,{session:f.session,surfaceAt:flat,initialState:f.rail.snapshot()});
  const validated=worker.evaluate('a','b',options);assert.ok(validated.valid,validated.reason);
  assert.deepEqual(validated.handles,preserved.handles);assert.deepEqual(validated.lines.map(line=>line.alignment),preserved.lines.map(line=>line.alignment));
  assert.notEqual(f.rail.geometryKey('a','b',{controlCount:6}),f.rail.geometryKey('a','b',{controlCount:7}));
  for(const controlCount of [0,13,2.5,NaN,Infinity,'6',null]){
    const invalid=f.rail.preview('a','b',{controlCount});assert.equal(invalid.code,'invalid-waypoints');assert.ok(invalid.handles.length<=14);
  }
  assert.equal(f.session.player.gold,20);
});

test('an impossible close bend keeps the complete draft and diagnoses only the actual radius failure',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:200,z:0,ownerId:'coral',level:1,houseCount:3}],f=fixture({cities});
  const initial=f.rail.preview('a','b'),options={attachments:endpoints(initial),waypoints:interior(initial)};
  options.waypoints[1]={x:options.waypoints[0].x,z:options.waypoints[0].z+1};
  const bad=f.rail.preview('a','b',options);assert.equal(bad.siteValid,false);assert.equal(bad.code,'route-blocked');
  assert.equal(bad.reason,'Give this bend more room');
  assert.deepEqual(interior(bad),options.waypoints);assert.deepEqual(endpoints(bad),endpoints(initial));
  assert.ok(bad.invalidBends.length);assert.deepEqual([...new Set(bad.invalidBends.map(bend=>bend.index))],[1]);
  for(const bend of bad.invalidBends){
    assert.equal(bend.reason,'radius');assert.equal(bend.x,options.waypoints[1].x);assert.equal(bend.z,options.waypoints[1].z);
    assert.ok(bend.points.length>1);for(let i=1;i<bend.points.length;i++)assert.ok(Math.hypot(bend.points[i].x-bend.points[i-1].x,bend.points[i].z-bend.points[i-1].z)<.6,'local fragments never jump across an unrelated part of the curve');
    const center=bend.points.findIndex(point=>Math.hypot(point.x-bend.x,point.z-bend.z)<1e-8);
    assert.ok(center>0&&center<bend.points.length-1,'the warning includes both sides of its control');
    const length=points=>points.slice(1).reduce((sum,point,i)=>sum+Math.hypot(point.x-points[i].x,point.z-points[i].z),0);
    for(const side of [bend.points.slice(0,center+1),bend.points.slice(center)]){
      assert.ok(length(side)>=10&&length(side)<10.6,'even a tiny failed span includes ten units of adjacent curve, without coloring distant track');
    }
  }
  const branch=bad.lines.at(-1);assert.equal(branch.previewOnly,true);assert.equal(branch.alignment,undefined);
  assert.ok(branch.points.length>300,'the rest of the route remains visible');
  const start=branch.points[0],end=branch.points.at(-1);
  assert.ok(Math.hypot(start.x-bad.handles[0].x,start.z-bad.handles[0].z)<1e-8);
  assert.ok(Math.hypot(end.x-bad.handles.at(-1).x,end.z-bad.handles.at(-1).z)<1e-8);
  for(let i=1;i<branch.points.length;i++)assert.ok(Math.hypot(branch.points[i].x-branch.points[i-1].x,branch.points[i].z-branch.points[i-1].z)<.6,'the preview guide remains continuous through the failed span');
  const validated=f.rail.evaluate('a','b',options);assert.deepEqual(validated.lines,bad.lines);assert.deepEqual(validated.invalidBends,bad.invalidBends);
  assert.equal(f.rail.build('a','b',{...options,requireCached:true}).ok,false);assert.equal(f.session.player.gold,20);
  options.waypoints[1]={...options.waypoints[0]};
  const collapsed=f.rail.preview('a','b',options);assert.equal(collapsed.siteValid,false);
  assert.ok(collapsed.invalidBends.some(bend=>bend.reason==='radius'&&bend.points.length>40),'exactly overlapping controls retain visible neighboring curve context');
  assert.equal(f.rail.evaluate('a','b',options).siteValid,false,'validation also rejects the hidden cusp');
  assert.equal(f.rail.build('a','b',{...options,requireCached:true}).ok,false);assert.equal(f.session.player.gold,20);
  options.waypoints[1]={x:options.waypoints[0].x+3,z:options.waypoints[0].z};
  const healed=f.rail.preview('a','b',options);assert.equal(healed.siteValid,true);assert.deepEqual(healed.invalidBends,[]);
  assertSmooth(healed.lines.at(-1));
});

test('a blocked orbital station stays visibly snapped to its tangent circle',()=>{
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:1,houseCount:3},{id:'b',x:200,z:0,ownerId:'coral',level:1,houseCount:3}],f=fixture({cities});
  const initial=f.rail.preview('a','b'),station=initial.stations.find(s=>s.cityId==='a'),endpoint=initial.handles[0];
  f.session.buildings.push({id:'occupied-platform-site',kind:'house',x:station.x,z:station.z,width:3,depth:3,rotation:station.rotation});
  const requested={x:endpoint.x*10,z:endpoint.z*10},options={waypoints:interior(initial),attachments:{...endpoints(initial),from:requested}};
  const blocked=f.rail.preview('a','b',options);assert.equal(blocked.code,'station-blocked');assert.equal(blocked.siteValid,false);
  assert.deepEqual(endpoints(blocked).from,{x:endpoint.x,z:endpoint.z});
  const snapped=blocked.stations.find(s=>s.cityId==='a');assert.equal(snapped.siteBlocked,true);
  assert.equal(snapped.x,station.x);assert.equal(snapped.z,station.z);assert.equal(snapped.heading,station.heading);
  assert.ok(blocked.lines.at(-1).points.length>2,'the invalid snapped station still has a visible route guide');
  const authoritative=f.rail.evaluate('a','b',options);assert.deepEqual(authoritative.handles,blocked.handles);assert.deepEqual(authoritative.stations,blocked.stations);
  assert.equal(f.rail.build('a','b',{...options,requireCached:true}).ok,false);assert.equal(f.session.player.gold,20);
});
