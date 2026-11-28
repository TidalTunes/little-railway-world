import test from 'node:test';
import assert from 'node:assert/strict';
import {createRailConflictZones} from '../src/rail-conflict-zones.js';
const dt=1/30;
function train(id,angle,{distance=470,cars=3,y=0,origin=0}={}){
  return {id,loop:{length:1000,angle,y},routeLength:1000,origin,distance,speed:0,maxAdvance:0,carCount:cars,active:true};
}
const sample=(t,d,out={})=>{
  const at=(((d+t.origin)%1000)+1000)%1000-500;
  out.x=Math.cos(t.loop.angle)*at;out.z=Math.sin(t.loop.angle)*at;out.y=t.loop.y;
  out.tangent={x:Math.cos(t.loop.angle),z:Math.sin(t.loop.angle)};return out;
};
function advance(zones,trains,seconds){
  for(let i=0;i<seconds*30;i++){
    for(const t of trains){t.desiredSpeed=Math.min(5,t.speed+6*dt);t.maxAdvance=(t.speed+t.desiredSpeed)*.5*dt;}
    const limits=zones.limits(trains,dt);
    for(const t of trains){const gap=limits.get(t.id),distance=Math.min(t.maxAdvance,gap);t.distance+=distance;t.speed=distance+1e-8<t.maxAdvance?distance/dt:t.desiredSpeed;}
  }
}

test('shallow crossings grant one complete crossing at a time, then every train clears',()=>{
  for(const angle of [120,150,165])for(const offset of [-12,0,12])for(const cars of [1,3,6]){
    const trains=[train('train:1',0,{cars}),train('train:2',angle*Math.PI/180,{distance:470+offset})];
    const zones=createRailConflictZones({sample});advance(zones,trains,60);
    assert.ok(trains.every(t=>t.distance>540),`${angle}deg offset${offset} cars${cars}: ${trains.map(t=>t.distance)}`);
    assert.ok(zones.stats.zones>=1);
  }
});

test('three intersecting approaches share an atomic zone, preventing circular lease waits',()=>{
  const trains=[0,120,240].map((angle,i)=>train(`train:${i}`,angle*Math.PI/180));
  const zones=createRailConflictZones({sample});advance(zones,trains,60);
  assert.equal(zones.stats.zones,1);assert.ok(trains.every(t=>t.distance>540));
});

test('a denied front held exactly at the zone entry cannot adopt the winner lease',()=>{
  const trains=[train('a',0,{distance:481}),train('b',Math.PI*5/6,{distance:481})],zones=createRailConflictZones({sample});
  let held;
  for(let i=0;i<300;i++){
    for(const t of trains)t.maxAdvance=.15;
    const limits=zones.limits(trains,dt);const denied=trains.find(t=>Number.isFinite(limits.get(t.id)));
    if(denied){denied.distance+=limits.get(denied.id);held=denied;break;}
    for(const t of trains)t.distance+=.15;
  }
  assert.ok(held);const stopped=held.distance;
  for(let i=0;i<20;i++){const limits=zones.limits(trains,dt);assert.equal(limits.get(held.id),0);assert.equal(held.distance,stopped);}
});

test('a crossing remains reserved until the entire final carriage exits',()=>{
  const a=train('a',0,{distance:482,cars:6}),b=train('b',Math.PI/2,{distance:482}),zones=createRailConflictZones({sample});
  a.maxAdvance=b.maxAdvance=.1;
  let limits=zones.limits([a,b],dt);
  while(!Number.isFinite(limits.get('b'))){a.distance+=.1;b.distance+=.1;limits=zones.limits([a,b],dt);}
  a.distance=510;limits=zones.limits([a,b],dt);assert.ok(Number.isFinite(limits.get('b')),'tail still occupies crossing');
  a.distance=530;limits=zones.limits([a,b],dt);assert.equal(limits.get('b'),Infinity);
});

test('same-direction trunks and separated bridge decks need no crossing interlock',()=>{
  for(const other of [train('b',0),train('b',Math.PI/2,{y:8})]){
    const zones=createRailConflictZones({sample}),a=train('a',0);a.maxAdvance=other.maxAdvance=.1;
    assert.deepEqual([...zones.limits([a,other],dt).values()],[Infinity,Infinity]);assert.equal(zones.stats.zones,0);
  }
});

test('spawning into an occupied crossing is denied across separately captured routes',()=>{
  const a=train('a',0,{distance:500}),b=train('b',Math.PI*5/6,{distance:500}),zones=createRailConflictZones({sample});
  assert.equal(zones.canSpawn(b,[a]),false);a.distance=550;zones.limits([a],dt);assert.equal(zones.canSpawn(b,[a]),true);
});

test('circular seam and station origins use the same physical crossing',()=>{
  const shifted=(t,d,out={})=>{
    const at=(((d+t.origin+500)%1000)+1000)%1000-500;
    out.x=Math.cos(t.loop.angle)*at;out.z=Math.sin(t.loop.angle)*at;out.y=0;out.tangent={x:Math.cos(t.loop.angle),z:Math.sin(t.loop.angle)};return out;
  };
  const a=train('a',0,{distance:970}),b=train('b',Math.PI*5/6,{distance:870,origin:100}),zones=createRailConflictZones({sample:shifted});
  advance(zones,[a,b],60);assert.ok(a.distance>1040);assert.ok(b.distance>940);
});

test('profiles are cached, input records are untouched, and release/clear remove leases',()=>{
  const a=train('a',0,{distance:490}),b=train('b',Math.PI/2,{distance:480}),zones=createRailConflictZones({sample});
  a.maxAdvance=b.maxAdvance=.1;const before=structuredClone([a,b]);zones.limits([a,b],dt);const count=zones.stats.samples;
  zones.limits([a,b],dt);assert.equal(zones.stats.samples,count);assert.equal(zones.stats.builds,1);assert.deepEqual([a,b],before);
  assert.equal(zones.canSpawn(train('c',Math.PI/2,{distance:500}),[a]),false);
  zones.release('a');a.active=false;zones.limits([a,b],dt);zones.clear();assert.equal(zones.canSpawn(train('c',Math.PI/2,{distance:500}),[]),true);
  assert.equal(zones.limits([a,b],0).size,0);assert.equal(zones.limits([a,b],NaN).size,0);
});

test('point-only samplers derive the crossing headings rather than using a stale output tangent',()=>{
  const pointOnly=(t,d,out)=>{const p=sample(t,d);out.x=p.x;out.y=p.y;out.z=p.z;return out;};
  const trains=[train('a',0),train('b',Math.PI*5/6)],zones=createRailConflictZones({sample:pointOnly});
  advance(zones,trains,60);assert.ok(zones.stats.zones>0);assert.ok(trains.every(t=>t.distance>540));
});

test('a faster following train cannot reserve a crossing in front of its slower leader',()=>{
  const lead=train('lead',0,{distance:487}),follow=train('follow',0,{distance:483}),cross=train('cross',Math.PI/2,{distance:450});
  follow.loop=lead.loop;lead.maxAdvance=.01;follow.speed=5;follow.maxAdvance=.16;cross.maxAdvance=.01;
  const zones=createRailConflictZones({sample}),limits=zones.limits([follow,lead,cross],dt);
  assert.equal(limits.get('lead'),Infinity);assert.ok(Number.isFinite(limits.get('follow')));
});

test('long consists acquire nearby dependent crossings together instead of holding opposing halves',()=>{
  const a=train('a',0,{distance:475,cars:6}),b=train('b',1,{distance:465,cars:6});
  const bentSample=(t,d,out={})=>{
    if(t===a)return sample(t,d,out);
    const at=(((d+t.origin)%1000)+1000)%1000-500;
    if(at<0){out.x=20;out.z=at+10;out.tangent={x:0,z:1};}
    else if(at<20){out.x=20-at;out.z=10;out.tangent={x:-1,z:0};}
    else{out.x=0;out.z=30-at;out.tangent={x:0,z:-1};}
    out.y=0;return out;
  };
  const zones=createRailConflictZones({sample:bentSample});advance(zones,[a,b],60);
  assert.equal(zones.stats.zones,2,'the two separate physical crossings stay separate zones');
  assert.ok(a.distance>550,`horizontal consist stopped at ${a.distance}`);assert.ok(b.distance>560,`bent consist stopped at ${b.distance}`);
});
