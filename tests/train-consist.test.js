import test from 'node:test';
import assert from 'node:assert/strict';
import {createLoopEconomy} from '../src/loop-economy.js';
import {createCircuitConsist,TRAIN_CAR_SPACING} from '../src/train-consist.js';

const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-7,`${actual} should equal ${expected}`);
const loop=(distances=[0,20,40],length=60)=>({id:'loop',length,cityIds:distances.map((_,i)=>`city-${i}`),
  stationIds:distances.map((_,i)=>`station-${i}`),stops:distances.map((distance,i)=>({cityId:`city-${i}`,stationId:`station-${i}`,distance})),segments:[{lineId:'track',start:0,end:length,offset:0,length}]});
function fixture(initial=loop()){
  let current=initial;
  const cities=initial.cityIds.map((id,i)=>({id,ownerId:i?'gray':'teal',level:2,houseCount:6,biome:i?'farmland':'forest',x:i*10,z:0}));
  const world={gameplay:{ownerId:'teal',starterHouse:{biome:'forest'},farmVillages:{ownerId:'gray',cities:cities.slice(1)}}};
  const game={ownerId:'teal',logs:1000,gold:0,cities:[cities[0]],creditGold(n){this.gold+=n;return{ok:true};},spendGold(n){if(this.gold<n)return{ok:false};this.gold-=n;return{ok:true};},addLogs(n){this.logs+=n;return{ok:true};},spendLogs(n){if(this.logs<n)return{ok:false};this.logs-=n;return{ok:true};}};
  const session={player:game,bots:[],revision:0},railways={revision:0,snapshot(){return{revision:this.revision};}};
  const sample=(circuit,distance,revision=0)=>{
    const along=((distance%circuit.length)+circuit.length)%circuit.length,angle=along/circuit.length*Math.PI*2,radius=circuit.length/(Math.PI*2);
    return{x:Math.cos(angle)*radius+revision*100,y:.42,z:Math.sin(angle)*radius,angle:-angle,tangent:{x:-Math.sin(angle),y:0,z:Math.cos(angle)}};
  };
  const economy=createLoopEconomy(world,{session,railways,networkFactory:snapshot=>{
    const circuit=structuredClone(current),revision=snapshot.revision;
    return{loops:()=>[circuit],sample:(route,distance)=>sample(route,distance,revision)};
  }});
  return{economy,game,sample,replace(next){current=next;railways.revision++;session.revision++;for(const id of next.cityIds.slice(1))if(!world.gameplay.farmVillages.cities.some(city=>city.id===id))world.gameplay.farmVillages.cities.push({id,ownerId:'gray',level:2,x:0,z:0});}};
}

test('one city corresponds to one train car, including the engine, with duplicate station visits removed',()=>{
  const circuit=loop();circuit.stops.push({...circuit.stops[1],distance:25});circuit.cityIds.push('city-1');
  const plan=createCircuitConsist(circuit,'city-0');assert.equal(plan.fits,true);assert.equal(plan.cars.length,3);
  assert.deepEqual(plan.cars.map(car=>car.cityId),['city-0','city-1','city-2']);
  assert.deepEqual(plan.cars.map(car=>car.offset),[0,TRAIN_CAR_SPACING,TRAIN_CAR_SPACING*2]);
  const {economy}=fixture(circuit);assert.equal(economy.buyTrain('city-0','loop','teal').ok,true);
  const train=economy.trains[0];assert.equal(train.carCount,3);assert.equal(train.carPoses.length,3);
  assert.equal(train.cars[0].amount,2);assert.equal(train.cars[1].amount,0);assert.equal(train.cars[2].amount,0);
});

test('the city-assigned trailing car aligns with the station and the popup, while the engine stays ahead',()=>{
  const circuit=loop(),{economy,sample}=fixture(circuit);economy.buyTrain('city-0','loop','teal');economy.drainEvents();
  const arrival=(20+TRAIN_CAR_SPACING)/10;economy.update(arrival);
  const train=economy.trains[0],station=sample(circuit,20),event=economy.drainEvents().find(event=>event.type==='pickup');
  assert.equal(train.state,'moving');assert.equal(event.cityId,'city-1');
  close(train.carPoses[1].x,station.x);close(train.carPoses[1].z,station.z);
  close(event.x,station.x);close(event.z,station.z);assert.equal(event.carIndex,1);
  assert.ok(Math.hypot(train.carPoses[0].x-station.x,train.carPoses[0].z-station.z)>2.5);
  assert.equal(train.cars[1].amount,2);assert.equal(train.cars[2].amount,0);
  economy.update(.075);const departed=economy.trains[0];assert.equal(departed.state,'moving');
  const next=sample(circuit,20+.75);close(departed.carPoses[1].x,next.x);close(departed.carPoses[1].z,next.z);
});

test('rear-car stops wrapping across home are served in physical forward order without teleporting',()=>{
  const circuit=loop([0,20,39],40),{economy,sample}=fixture(circuit);economy.buyTrain('city-0','loop','teal');
  const plan=createCircuitConsist(circuit,'city-0');close(plan.stops[0].distance,4.2);assert.deepEqual(plan.stops[0].carIndices,[2]);
  economy.update(plan.stops[0].distance/10);
  const train=economy.trains[0],station=sample(circuit,39);assert.equal(train.cars[2].amount,2);
  close(train.carPoses[2].x,station.x);close(train.carPoses[2].z,station.z);
  economy.update(4-economy.elapsed);
  assert.equal(economy.trains[0].laps,1);assert.equal(economy.resourcesAt('teal').food,4);
  const pickups=economy.drainEvents().filter(event=>event.type==='pickup');
  assert.deepEqual(pickups.map(event=>event.cityId),['city-0','city-2','city-1','city-0']);
});

test('simultaneous station alignments load once without pausing either carriage',()=>{
  const circuit=loop([0,37.4],40),{economy}=fixture(circuit);economy.buyTrain('city-0','loop','teal');
  assert.equal(economy.trains[0].state,'moving');assert.deepEqual(economy.trains[0].cargo,{resources:2,food:2});
  economy.update(.75);assert.equal(economy.trains[0].state,'moving');
  economy.update(3.25);assert.equal(economy.trains[0].laps,1);
  const events=economy.drainEvents();assert.equal(events.filter(event=>event.type==='pickup'&&event.time===0).length,2);
  assert.equal(events.filter(event=>event.type==='delivery').length,1);assert.equal(economy.resourcesAt('teal').food,2);
});

test('all car positions remain continuous across station passage and home wrap',()=>{
  const circuit=loop(),{economy}=fixture(circuit);economy.buyTrain('city-0','loop','teal');
  let previous=economy.trains[0].carPoses;
  for(let frame=0;frame<1550;frame++){
    economy.update(.01);const cars=economy.trains[0].carPoses;
    for(let index=0;index<cars.length;index++)assert.ok(Math.hypot(cars[index].x-previous[index].x,cars[index].z-previous[index].z)<=.1000001,'a car never jumps further than its travel speed');
    previous=cars;
  }
  assert.equal(economy.trains[0].laps,2);
});

test('a one-city circuit has only an engine and undersized circuits are rejected before payment',()=>{
  const single=fixture(loop([0],10));assert.equal(single.economy.buyTrain('city-0','loop','teal').ok,true);
  assert.equal(single.economy.trains[0].carPoses.length,1);single.economy.update(3);assert.equal(single.economy.trains[0].laps,3);
  const short=fixture(loop([0,2],4)),before=short.economy.snapshot();
  const result=short.economy.buyTrain('city-0','loop','teal');assert.equal(result.code,'circuit-too-short');assert.match(result.reason,/too short/);
  assert.deepEqual(short.economy.snapshot(),before);
  assert.equal(createCircuitConsist(loop([0,3],5.2),'city-0').fits,true,'compact valid circuits are not rejected');
});

test('existing trains keep captured geometry while new trains use revised circuits and their new city count',()=>{
  const first=loop([0,20],40),test=fixture(first);test.economy.buyTrain('city-0','loop','teal');test.economy.update(2);
  const before=test.economy.trains[0],next=loop();next.id='new-loop';next.stationIds=next.stationIds.map(id=>`new:${id}`);next.segments[0].lineId='new-track';
  test.replace(next);assert.equal(test.economy.buyTrain('city-0','new-loop','teal').ok,true);
  const [oldTrain,newTrain]=test.economy.trains;
  assert.deepEqual(oldTrain.carPoses,before.carPoses);assert.equal(oldTrain.carCount,2);assert.equal(newTrain.carCount,3);assert.ok(newTrain.x>100);
  test.economy.update(4);assert.ok(test.economy.trains[0].x<10);assert.ok(test.economy.trains[1].x>90);
});

test('car-specific passages preserve frame-independent rewards with simultaneous trains',()=>{
  const a=fixture(),b=fixture();for(const item of[a,b]){item.economy.buyTrain('city-0','loop','teal');item.economy.buyTrain('city-0','loop','teal');}
  assert.ok(a.economy.trains.every(train=>train.active&&train.state==='moving'));
  assert.ok(a.economy.trains.every(train=>train.cars[0].amount===2),'each train departs immediately, without an exclusive loop queue');
  a.economy.update(75);for(let step=0;step<600;step++)b.economy.update(.125);
  assert.deepEqual(a.economy.snapshot(),b.economy.snapshot());assert.deepEqual(a.economy.drainEvents(),b.economy.drainEvents());
});
