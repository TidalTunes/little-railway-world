import test from 'node:test';
import assert from 'node:assert/strict';
import {OrthographicCamera,PerspectiveCamera,Vector3} from 'three';
import {buildCircuitSelection,circuitCandidatesAt,pickCircuitAt,nextCircuitId} from '../src/railway-circuit-selection.js';
import {pickRailwayAnchor} from '../src/settlement-railway-input.js';

const viewport={width:1200,height:800};
const topCamera=()=>{const camera=new OrthographicCamera(-60,60,40,-40,.1,400);camera.position.set(0,80,0);camera.up.set(0,0,-1);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);return camera;};
const project=(camera,x,z,y=.42)=>new Vector3(x,y,z).project(camera);
const line=(id,start,end,extra={})=>{
  const length=Math.hypot(end.x-start.x,end.z-start.z);
  return {id,points:[{y:.42,...start},{y:.42,...end}],distances:[0,length],length,...extra};
};
const circuit=(id,lineId,start,end)=>({id,segments:[{lineId,start,end,length:end-start,offset:0,direction:1}]});
const ids=loops=>loops.map(loop=>loop.id);

test('selectable snapshots union eligible portions and intersect visible ranges without mutating inputs',()=>{
  const track=line('shared',{x:-30,z:0},{x:30,z:0},{renderRanges:[{start:0,end:18},{start:24,end:60}]}),
    loops=[circuit('first','shared',5,20),circuit('second','shared',15,30),circuit('third','shared',40,50)];
  const state={loops,lines:[track]},before=structuredClone(state),selection=buildCircuitSelection(state);
  assert.equal(selection.prepared,true);
  assert.deepEqual(selection.lines[0].renderRanges,[{start:5,end:18},{start:24,end:30},{start:40,end:50}]);
  assert.deepEqual(state,before);selection.lines[0].renderRanges[0].start=100;assert.deepEqual(state,before);
  assert.notEqual(selection.loops,loops);assert.notEqual(selection.lines[0],track);
});

test('candidates use the actual split interval instead of the parent line ID',()=>{
  const loops=[circuit('left','shared',0,20),circuit('middle','shared',15,40),circuit('right','shared',40,60),circuit('other','cross',0,60)];
  const pick=distance=>ids(circuitCandidatesAt(loops,{kind:'track',lineId:'shared',distance}));
  assert.deepEqual(pick(10),['left']);assert.deepEqual(pick(17),['left','middle']);assert.deepEqual(pick(30),['middle']);
  assert.deepEqual(pick(40),['middle','right']);assert.deepEqual(pick(55),['right']);assert.deepEqual(pick(70),[]);
  assert.deepEqual(circuitCandidatesAt(loops,{kind:'station',lineId:'shared',distance:10}),[]);
  assert.deepEqual(circuitCandidatesAt(loops,{kind:'track',lineId:'shared',distance:NaN}),[]);
  assert.deepEqual(circuitCandidatesAt(loops,null),[]);
});

test('picking a route excludes unused stretches on the same physical railway',()=>{
  const track=line('shared',{x:-30,z:0},{x:30,z:0}),loops=[circuit('left','shared',0,15),circuit('right','shared',45,60)],camera=topCamera();
  const state=buildCircuitSelection({loops,lines:[track]});
  assert.deepEqual(ids(pickCircuitAt({},state,camera,project(camera,-20,0),viewport).loops),['left']);
  assert.deepEqual(ids(pickCircuitAt({},state,camera,project(camera,20,0),viewport).loops),['right']);
  assert.equal(pickCircuitAt({},state,camera,project(camera,0,0),viewport),null,'the untraversed interval cannot select a circuit');
  assert.equal(pickCircuitAt({},state,camera,project(camera,0,20),viewport),null);
});

test('a nearby unrelated route cannot capture the click before an eligible circuit',()=>{
  const camera=topCamera(),eligible=line('eligible',{x:-30,z:0},{x:30,z:0}),unrelated=line('unrelated',{x:-30,z:.3},{x:30,z:.3});
  const loops=[circuit('ours','eligible',0,60)],state={loops,lines:[unrelated,eligible],cities:[{id:'badge',x:0,z:.3,level:2}]};
  const hit=pickCircuitAt({},state,camera,project(camera,0,.3),viewport);
  assert.equal(hit.anchor.lineId,'eligible');assert.deepEqual(ids(hit.loops),['ours']);
});

test('hidden shared rail portions and draft previews do not act as selectable routes',()=>{
  const camera=topCamera(),track=line('shared',{x:-30,z:0},{x:30,z:0},{renderRanges:[{start:0,end:15},{start:45,end:60}]}),loops=[circuit('whole','shared',0,60)];
  assert.equal(pickCircuitAt({},{loops,lines:[track]},camera,project(camera,0,0),viewport),null);
  assert.equal(pickCircuitAt({},{loops,lines:[{...track,previewOnly:true}]},camera,project(camera,-25,0),viewport),null);
  assert.equal(pickCircuitAt({},{loops,lines:[{...track,renderRanges:[]}]},camera,project(camera,-25,0),viewport),null);
});

test('circuit selection includes station tracks and ports without enabling editor branches in station interiors',()=>{
  const camera=topCamera(),spine=line('rail-spine:home',{x:-7,z:0},{x:7,z:0});
  const loop={id:'home-loop',segments:[{lineId:spine.id,start:7,end:14},{lineId:spine.id,start:0,end:7}]},state={loops:[loop],lines:[spine]};
  for(const x of [-7,0,7]){
    const pointer=project(camera,x,0),hit=pickCircuitAt({},state,camera,pointer,viewport);
    assert.equal(hit.anchor.lineId,spine.id);assert.ok(Math.abs(hit.anchor.distance-(x+7))<1e-7);assert.deepEqual(ids(hit.loops),[loop.id]);
    assert.equal(pickRailwayAnchor({},{lines:[spine]},camera,pointer,viewport),null,'editor picking still excludes the station spine');
  }
  const station={id:'home-station',cityId:'home',lineId:spine.id,center:{x:0,z:0},heading:0};
  assert.equal(pickRailwayAnchor({},{lines:[spine],stations:[station]},camera,project(camera,0,0),viewport),null);
  assert.equal(pickRailwayAnchor({},{lines:[spine],stations:[station]},camera,project(camera,7,0),viewport).kind,'station','editor ports remain typed station anchors');
});

test('perspective route picking retains accurate linear distance at a junction split',()=>{
  const camera=new PerspectiveCamera(50,1.5,.1,300);camera.position.set(0,35,35);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const track=line('diagonal',{x:-20,z:-20},{x:24,z:18}),loops=[circuit('first','diagonal',0,track.length*.5),circuit('last','diagonal',track.length*.5,track.length)];
  for(const t of [.2,.7]){
    const hit=pickCircuitAt({},{loops,lines:[track]},camera,project(camera,-20+44*t,-20+38*t),{width:900,height:600});
    assert.ok(Math.abs(hit.anchor.distance-track.length*t)<1e-7);assert.deepEqual(ids(hit.loops),[t<.5?'first':'last']);
  }
});

test('shared-route clicks cycle the eligible circuits in stable supplied order',()=>{
  const a=circuit('a','track',0,10),b=circuit('b','track',0,10),c=circuit('c','other',0,10);
  const candidates=circuitCandidatesAt([a,b,a,c],{kind:'track',lineId:'track',distance:5});
  assert.deepEqual(ids(candidates),['a','b']);assert.equal(nextCircuitId(candidates),'a');
  assert.equal(nextCircuitId(candidates,'a'),'b');assert.equal(nextCircuitId(candidates,'b'),'a');
  assert.equal(nextCircuitId(candidates,'stale'),'a');assert.equal(nextCircuitId([a],'a'),'a');assert.equal(nextCircuitId([],'a'),null);
});

test('invalid route pieces and invalid camera state leave the map interaction untouched',()=>{
  const camera=topCamera(),track=line('track',{x:-30,z:0},{x:30,z:0}),loops=[{id:'bad',segments:[{lineId:'track',start:0,end:NaN},{lineId:'track',start:20,end:10}]}];
  assert.deepEqual(buildCircuitSelection({loops,lines:[track]}).lines,[]);
  const state={loops:[circuit('valid','track',0,60)],lines:[track]};
  assert.equal(pickCircuitAt({},state,null,{x:0,y:0},viewport),null);
  assert.equal(pickCircuitAt({},state,camera,null,viewport),null);
  assert.equal(pickCircuitAt({},state,camera,{x:0,y:0},{width:0,height:800}),null);
  assert.equal(pickCircuitAt({},undefined,camera,{x:0,y:0},viewport),null);
});
