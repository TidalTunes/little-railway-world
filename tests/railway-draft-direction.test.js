import test from 'node:test';
import assert from 'node:assert/strict';
import {railwayDraftDirection} from '../src/settlement-railway-input.js';
import {createSettlementRailways} from '../src/settlement-railways.js';
import {createDirectedRailNetwork} from '../src/directed-rail-network.js';

const entry={kind:'station',side:-1},exit={kind:'station',side:1},track={kind:'track',direction:1};

test('physical station ports determine travel direction independently of selection order',()=>{
  for(const reverse of [false,true]){
    assert.equal(railwayDraftDirection({start:exit,end:entry,reverse}),false);
    assert.equal(railwayDraftDirection({start:entry,end:exit,reverse}),true);
  }
});

test('a station port also determines direction when the other anchor is a track or implicit city',()=>{
  for(const other of [undefined,track])for(const reverse of [false,true]){
    assert.equal(railwayDraftDirection({start:entry,end:other,reverse}),true);
    assert.equal(railwayDraftDirection({start:exit,end:other,reverse}),false);
    assert.equal(railwayDraftDirection({start:other,end:entry,reverse}),false);
    assert.equal(railwayDraftDirection({start:other,end:exit,reverse}),true);
  }
});

test('conflicting or directionless explicit anchors preserve editable direction instead of oscillating',()=>{
  for(const reverse of [false,true])for(const [start,end] of [[entry,entry],[exit,exit],[track,track],[{kind:'track',direction:-1},entry]]){
    assert.equal(railwayDraftDirection({start,end,reverse,hasOutbound:true}),reverse);
  }
});

test('plain city selection proposes a missing return without changing explicit port intent',()=>{
  assert.equal(railwayDraftDirection({hasOutbound:true,hasReturn:false}),true);
  for(const [hasOutbound,hasReturn] of [[false,false],[false,true],[true,true]]){
    assert.equal(railwayDraftDirection({hasOutbound,hasReturn,reverse:true}),false);
  }
  assert.equal(railwayDraftDirection({start:exit,end:entry,hasOutbound:true}),false);
});

test('an explicit reverse command remains authoritative even when it temporarily invalidates the ports',()=>{
  for(const reverse of [false,true])for(const [start,end] of [[entry,exit],[exit,entry],[entry,entry],[undefined,undefined]]){
    assert.equal(railwayDraftDirection({start,end,reverse,locked:true,hasOutbound:true}),reverse);
  }
});

function fixture(){
  const cities=[{id:'a',x:0,z:0,ownerId:'teal',level:2,houseCount:6},{id:'b',x:65,z:20,ownerId:'gray',level:2,houseCount:6}];
  const buildings=cities.flatMap(city=>[[0,0],[4,0],[0,4],[-4,0],[0,-4],[4,4]].map(([x,z],index)=>({
    id:`${city.id}:home:${index}`,kind:'house',cityId:city.id,ownerId:city.ownerId,x:city.x+x,z:city.z+z,rotation:0,width:2.2,depth:2.2,
  })));
  for(const city of cities)city.houseIds=buildings.filter(home=>home.cityId===city.id).map(home=>home.id);
  const account=city=>({ownerId:city.ownerId,cities:[city],gold:200,spendGold(amount){this.gold-=amount;return {ok:true,totalGold:this.gold};}});
  const session={player:account(cities[0]),bots:[{game:account(cities[1])}],buildings,shared:{removedTreeIds:new Set()}};
  const rail=createSettlementRailways({seed:'directed-rail-test',gameplay:{economy:'loops'},rivers:[]},{
    session,surfaceAt:()=>({type:'ground',height:0}),sceneryCatalog:[],
  });
  rail.synchronizeStations();
  const port=(cityId,side)=>rail.anchorAt(null,{stationId:rail.stations.find(station=>station.cityId===cityId).id,side}).attachment;
  return {rail,session,port};
}

test('the remaining station ends complete a continuous return loop whichever end is selected first',()=>{
  for(const entryFirst of [true,false]){
    const {rail,port}=fixture();
    assert.equal(rail.build('a','b').ok,true);
    assert.equal(createDirectedRailNetwork(rail.snapshot()).loops('a').length,0);
    const first=entryFirst?{city:'a',anchor:port('a',-1)}:{city:'b',anchor:port('b',1)};
    const second=entryFirst?{city:'b',anchor:port('b',1)}:{city:'a',anchor:port('a',-1)};
    const reverse=railwayDraftDirection({start:first.anchor,end:second.anchor});
    assert.equal(reverse,entryFirst);
    const [from,to]=reverse?[second,first]:[first,second];
    const result=rail.build(from.city,to.city,{attachments:{from:from.anchor,to:to.anchor}});
    assert.equal(result.ok,true,result.reason);
    const graph=createDirectedRailNetwork(rail.snapshot()),loop=graph.loops('a')[0];
    assert.ok(loop,'the physical return joins both station spines into a directed loop');
    assert.deepEqual(loop.cityIds,['a','b']);
    assert.deepEqual(loop.stops.map(stop=>stop.cityId),['a','b']);
    for(const distance of [0,...loop.segments.map(segment=>segment.offset)]){
      const before=graph.sample(loop,distance-.001),after=graph.sample(loop,distance+.001);
      assert.ok(Math.hypot(after.x-before.x,after.z-before.z)<.003,'no positional jump at any join');
      assert.ok(before.tangent.x*after.tangent.x+before.tangent.z*after.tangent.z>.999,'no reversal at any join');
    }
  }
});

test('conflicting entry ports remain red without spending gold and can be repaired by moving one endpoint',()=>{
  const {rail,session,port}=fixture();
  const start=port('a',-1),end=port('b',-1),reverse=railwayDraftDirection({start,end});
  assert.equal(reverse,false);
  const gold=session.player.gold,invalid=rail.build('a','b',{attachments:{from:start,to:end}});
  assert.equal(invalid.code,'wrong-direction');
  assert.deepEqual(invalid.directionErrors,['from']);
  assert.equal(session.player.gold,gold);
  assert.equal(rail.snapshot().connections.length,0);
  assert.equal(rail.build('a','b',{attachments:{from:port('a',1),to:end}}).ok,true);
});

test('entry-first selection also closes a circuit through two ends of the same station',()=>{
  const {rail,port}=fixture(),station=rail.stations.find(item=>item.cityId==='a');
  const start=port('a',-1),end=port('a',1),reverse=railwayDraftDirection({start,end});
  assert.equal(reverse,true);
  const ux=Math.cos(station.heading),uz=Math.sin(station.heading),vx=uz,vz=-ux;
  const waypoints=[[20,10],[0,28],[-20,10]].map(([along,outward])=>({
    x:station.center.x+ux*along+vx*outward,z:station.center.z+uz*along+vz*outward,
  }));
  const result=rail.build('a','a',{attachments:{from:end,to:start},waypoints,controlCount:waypoints.length});
  assert.equal(result.ok,true,result.reason);
  const loops=createDirectedRailNetwork(rail.snapshot()).loops('a');
  assert.equal(loops.length,1);
  assert.deepEqual(loops[0].cityIds,['a']);
});
