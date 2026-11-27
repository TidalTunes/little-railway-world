import test from 'node:test';
import assert from 'node:assert/strict';
import {createTradeNetwork} from '../src/trade-network.js';
import {combineAlignments,straightSegment,sampleAlignment} from '../src/alignments.js';

const straight=(id,x1,z1,x2,z2)=>({id,alignment:combineAlignments([straightSegment({x:x1,z:z1},{x:x2,z:z2})])});
const station=(id,lineId,distance)=>({id:`station:${id}`,cityId:id,lineId,distance,x:999,z:999});
function junctionFixture(){
  const main=straight('main',0,0,100,0),branch={id:'branch',alignment:combineAlignments([{type:'arc',center:{x:50,z:30},radius:30,startAngle:-Math.PI/2,sweep:Math.PI/2,
    start:{x:50,y:.42,z:0},end:{x:80,y:.42,z:30},length:Math.PI*15,curvature:1/30}])};
  return {revision:7,lines:[main,branch],stations:[station('a','main',0),station('b','main',100),station('c','branch',branch.alignment.length)],
    connections:[{lineId:'branch',fromStationId:'station:a',toStationId:'station:c',fromJunction:{lineId:'main',distance:50}}]};
}
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);

test('routes start at rail station centers, split exact geometry, and cache city pairs',()=>{
  const snapshot=junctionFixture(),network=createTradeNetwork(snapshot),path=network.route('a','c');
  assert.equal(network.revision,7);assert.equal(network.route('a','c'),path);
  assert.deepEqual(path.segments.map(({lineId,start,end})=>({lineId,start,end})),[{lineId:'main',start:0,end:50},{lineId:'branch',start:0,end:Math.PI*15}]);
  close(path.length,50+Math.PI*15);assert.deepEqual(path.reversals,[]);
  const a=network.sample(path,0),b=network.sample(path,path.length);close(a.x,0);close(b.x,80);close(b.z,30);
  assert.equal(path.fromStationId,'station:a');assert.equal(path.toStationId,'station:c');
});

test('a trailing offshoot requires travel to a station and reversal, never a switch U-turn',()=>{
  const network=createTradeNetwork(junctionFixture()),path=network.route('b','c');
  assert.deepEqual(path.segments.map(s=>[s.lineId,s.start,s.end]),[['main',100,50],['main',50,0],['main',0,50],['branch',0,Math.PI*15]]);
  close(path.length,150+Math.PI*15);assert.deepEqual(path.reversals,[{distance:100,stationId:'station:a',cityId:'a'}]);
  for(let i=1;i<path.segments.length;i++){
    const distance=path.segments[i].offset,before=network.sample(path,distance-1e-5),after=network.sample(path,distance+1e-5);
    assert.ok(Math.hypot(before.x-after.x,before.z-after.z)<3e-5);
    const dot=before.tangent.x*after.tangent.x+before.tangent.z*after.tangent.z;
    assert.ok(distance===100?dot<-.9999:dot>.9999);
  }
});

test('reservation pieces are undirected and repeated turnaround pieces are reserved once',()=>{
  const network=createTradeNetwork(junctionFixture()),forward=network.route('a','c'),reverse=network.route('c','a'),detour=network.route('b','c');
  assert.deepEqual(network.reservationKeys(forward).sort(),network.reservationKeys(reverse).sort());
  assert.equal(network.reservationKeys(detour).filter(key=>!key.startsWith('rail-node:')).length,3);assert.equal(detour.segments.length,4);
  assert.deepEqual(network.reservationKeys(null),[]);
});

test('sampling follows circular arcs exactly, clamps endpoints and supports a reusable output',()=>{
  const snapshot=junctionFixture(),network=createTradeNetwork(snapshot),path=network.route('c','a'),out={tangent:{}};
  assert.equal(network.sample(path,10,out),out);
  const exact=sampleAlignment(snapshot.lines[1].alignment,snapshot.lines[1].alignment.length-10);
  close(out.x,exact.x);close(out.z,exact.z);close(out.tangent.x,-exact.tangent.x);close(out.tangent.z,-exact.tangent.z);
  close(out.angle,Math.atan2(out.tangent.x,out.tangent.z));assert.equal(out.lineId,'branch');
  close(network.sample(path,-100).z,30);close(network.sample(path,10000).x,0);
  assert.equal(network.sample(null,0),null);assert.equal(network.sample(path,NaN),null);
  const zero=network.route('a','a');assert.equal(zero.length,0);assert.equal(zero.segments.length,0);close(network.sample(zero,20).x,0);
});

test('unconnected crossings, mismatched metadata, kinks and preview-only branches are not routes',()=>{
  for(const mode of ['crossing','bad-metadata','kink','preview']){
    const snapshot=junctionFixture();
    if(mode==='crossing')snapshot.connections=[];
    if(mode==='bad-metadata')snapshot.connections[0].fromJunction.distance=49;
    if(mode==='kink')snapshot.lines[1]=straight('branch',50,0,50,50);
    if(mode==='preview')snapshot.lines[1].previewOnly=true;
    snapshot.stations[2].distance=snapshot.lines[1].alignment.length;
    const network=createTradeNetwork(snapshot);assert.equal(network.route('a','c'),null,mode);assert.equal(network.route('a','c'),null);
  }
  assert.equal(createTradeNetwork().route('a','b'),null);
});

test('committed station spines use physical ports and retain connectivity through city ID merges',()=>{
  const a=straight('rail-spine:a',-7,0,7,0),b=straight('rail-spine:b',93,0,107,0),link=straight('rail-link:a|b',7,0,93,0);
  link.stationIds=['station:a','station:b'];
  const stations=[station('a',a.id,7),station('b',b.id,7)];stations[0].cityId='merged-a';
  const network=createTradeNetwork({lines:[a,b,link],stations,connections:[{id:'connection:a|b',key:'b|merged-a',from:'merged-a',to:'b',fromStationId:'station:a',toStationId:'station:b'}]});
  const path=network.route('merged-a','b');close(path.length,100);assert.deepEqual(path.segments.map(s=>s.lineId),[a.id,link.id,b.id]);
  assert.equal(network.route('a','b'),null);
  const legacy=createTradeNetwork({lines:[a,b,link],stations});close(legacy.route('merged-a','b').length,100);
});

test('a city with several stations uses the shortest connected physical route',()=>{
  const lines=[straight('long',0,0,100,0),straight('short',0,10,20,10)],stations=[station('a','long',0),station('b','long',100),
    {...station('a2','short',0),cityId:'a'},{...station('b2','short',20),cityId:'b'}];
  const network=createTradeNetwork({lines,stations}),path=network.route('a','b');
  close(path.length,20);assert.equal(path.fromStationId,'station:a2');assert.equal(path.toStationId,'station:b2');
});

test('active trips retain their exact poses and lock newly split pieces after additive revisions',()=>{
  const snapshot=junctionFixture(),initial=createTradeNetwork({...snapshot,revision:6,lines:[snapshot.lines[0]],connections:[],stations:snapshot.stations.slice(0,2)});
  const oldRoute=initial.route('a','b'),next=createTradeNetwork(snapshot);
  const edges=keys=>keys.filter(key=>!key.startsWith('rail-node:'));
  assert.equal(edges(initial.reservationKeys(oldRoute)).length,1);assert.equal(edges(next.reservationKeys(oldRoute)).length,2);
  close(next.sample(oldRoute,75).x,75);
  const crossing=next.reservationKeys(next.route('a','c'));
  assert.ok(next.reservationKeys(oldRoute).some(key=>crossing.includes(key)));
});

test('opposite terminal arrivals reserve their common platform despite sharing no edge pieces',()=>{
  const line=straight('main',0,0,100,0),network=createTradeNetwork({lines:[line],stations:[station('a','main',0),station('hub','main',50),station('b','main',100)]});
  const left=network.reservationKeys(network.route('a','hub')),right=network.reservationKeys(network.route('b','hub'));
  const shared=left.filter(key=>right.includes(key));assert.equal(shared.length,1);assert.ok(shared[0].startsWith('rail-node:'));
});
