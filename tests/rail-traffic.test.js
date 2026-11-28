import test from 'node:test';
import assert from 'node:assert/strict';
import {createRailTraffic} from '../src/rail-traffic.js';

const dt=1/30;
function fixture(){
  const sample=(train,d,out={})=>{
    const at=((d%1000)+1000)%1000-500,route=train.loop;
    return Object.assign(out,{x:route.axis==='z'?route.offset:at,z:route.axis==='z'?at:route.offset,y:route.height??0});
  };
  const traffic=createRailTraffic({sample});
  const train=(id,{axis='x',offset=0,height=0,distance=480,cars=3,route,stopped=false}={})=>({id,loop:route??{axis,offset,height,length:1000},distance,carCount:cars,routeLength:1000,speed:0,active:true,stopped});
  function tick(trains){
    for(const item of trains){item.desiredSpeed=item.stopped?0:Math.min(5,item.speed+6*dt);item.maxAdvance=item.stopped?0:(item.speed+item.desiredSpeed)*.5*dt;}
    const moves=traffic.step(trains,dt);
    for(const item of trains)Object.assign(item,moves.get(item.id));
    return moves;
  }
  function clearConsists(trains){
    for(let i=0;i<trains.length;i++)for(let j=i+1;j<trains.length;j++){
      if(!trains[i].active||!trains[j].active)continue;
      for(let a=0;a<trains[i].carCount;a++)for(let b=0;b<trains[j].carCount;b++){
        const p=sample(trains[i],trains[i].distance-a*2.6),q=sample(trains[j],trains[j].distance-b*2.6);
        if(Math.abs(p.y-q.y)>2.5)continue;
        assert.ok(Math.hypot(p.x-q.x,p.z-q.z)>1.8,`cars overlap: ${trains[i].id}/${trains[j].id}`);
      }
    }
  }
  return {traffic,train,tick,clearConsists,sample};
}

test('spawn clearance includes the last carriage and active stopped trains',()=>{
  const {traffic,train}=fixture(),leader=train('leader',{distance:515,cars:6,stopped:true});
  const waiting=train('waiting',{distance:500});
  assert.equal(traffic.canSpawn(waiting,[leader]),false,'engine clearance alone is insufficient');
  leader.distance=527;assert.equal(traffic.canSpawn(waiting,[leader]),true);
  leader.active=false;leader.distance=500;assert.equal(traffic.canSpawn(waiting,[leader]),true,'depot queue is not rendered physical traffic');
});

test('following trains brake behind an occupied station, then resume after its full consist clears',()=>{
  const {traffic,train,tick,clearConsists}=fixture();
  const leader=train('leader',{distance:510,stopped:true,cars:4});
  const follower=train('follower',{distance:480,route:leader.loop});
  for(let i=0;i<360;i++){tick([leader,follower]);clearConsists([leader,follower]);}
  assert.ok(follower.blocked);assert.equal(follower.speed,0);assert.ok(follower.distance<leader.distance-10);
  const at=follower.distance;leader.stopped=false;
  for(let i=0;i<240;i++){tick([leader,follower]);clearConsists([leader,follower]);}
  assert.ok(follower.distance>at+20);assert.equal(follower.blocked,false);
  assert.ok(traffic.stats.samples<500,'route cross-sections are cached rather than resampled per car per frame');
});

test('crossing routes give one full train right of way, without a graph junction',()=>{
  const {train,tick,clearConsists}=fixture();
  const a=train('east',{cars:5}),b=train('north',{axis:'z',cars:4});
  let yielded=false;
  for(let i=0;i<900;i++){tick([a,b]);clearConsists([a,b]);yielded||=a.blocked||b.blocked;}
  assert.ok(yielded,'one approaching train yields');
  assert.ok(a.distance>540&&b.distance>540,'both trains eventually clear the crossing');
});

test('physically separated bridge decks pass without unnecessary blocking',()=>{
  const {train,tick,clearConsists}=fixture(),a=train('east'),b=train('bridge',{axis:'z',height:6});
  for(let i=0;i<300;i++){tick([a,b]);clearConsists([a,b]);assert.equal(a.blocked,false);assert.equal(b.blocked,false);}
  assert.ok(a.distance>520&&b.distance>520);
});

test('physical reservations also protect independently captured route revisions',()=>{
  const {traffic,train,tick}=fixture(),a=train('old',{distance:500}),b=train('new',{distance:500});
  assert.notEqual(a.loop,b.loop);assert.equal(traffic.canSpawn(b,[a]),false);
  tick([a]);assert.equal(traffic.canSpawn(b,[]),false,'forward authority remains held between admissions');
  traffic.release(a.id);assert.equal(traffic.canSpawn(b,[]),true);
  tick([a]);traffic.step([],dt);assert.equal(traffic.stats.reservedBlocks,0,'removed trains release their blocks');
});

test('traffic preserves requested terminal speed and never mutates the supplied train descriptors',()=>{
  const {traffic,train}=fixture(),a=train('a');a.speed=1;a.desiredSpeed=1.2;a.maxAdvance=1.1*dt;
  const before=structuredClone(a),move=traffic.step([a],dt).get(a.id);
  assert.deepEqual(a,before);assert.equal(move.speed,1.2);assert.equal(move.distance,a.distance+a.maxAdvance);
});


test('shallow crossing interlocks avoid mutual reservations and release the junction after the tail',()=>{
  for(const degrees of [30,90,120,150,165,175]){
    const route=angle=>({length:1000,angle});
    const a={id:'train:1',loop:route(0),distance:430,carCount:3,speed:0,active:true};
    const b={id:'train:2',loop:route(degrees*Math.PI/180),distance:430,carCount:5,speed:0,active:true};
    const sample=(t,d,out={})=>Object.assign(out,{x:(d-500)*Math.cos(t.loop.angle),z:(d-500)*Math.sin(t.loop.angle),y:0,
      tangent:{x:Math.cos(t.loop.angle),y:0,z:Math.sin(t.loop.angle)}});
    const traffic=createRailTraffic({sample});let yielded=false;
    for(let i=0;i<1500;i++){
      for(const t of [a,b]){t.desiredSpeed=Math.min(5,t.speed+.2);t.maxAdvance=(t.speed+t.desiredSpeed)/60;}
      const moves=traffic.step([a,b],1/30);for(const t of[a,b])Object.assign(t,moves.get(t.id));
      yielded||=a.blocked||b.blocked;
      for(let ai=0;ai<a.carCount;ai++)for(let bi=0;bi<b.carCount;bi++){
        const p=sample(a,a.distance-ai*2.6),q=sample(b,b.distance-bi*2.6);
        assert.ok(Math.hypot(p.x-q.x,p.z-q.z)>1.8,`${degrees}° crossing preserves carriage clearance`);
      }
    }
    assert.ok(yielded);assert.ok(a.distance>550&&b.distance>550,`${degrees}° crossing: both trains must proceed, got ${a.distance}/${b.distance}`);
  }
});
