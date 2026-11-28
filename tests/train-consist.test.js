import test from 'node:test';
import assert from 'node:assert/strict';
import {createLoopEconomy,LOOP_ECONOMY} from '../src/loop-economy.js';
import {createCircuitConsist,TRAIN_CAR_SPACING} from '../src/train-consist.js';

const close=(actual,expected,tolerance=1e-7)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} should equal ${expected}`);
const STEP=LOOP_ECONOMY.trafficStep;
const loop=(distances=[0,20,40],length=60)=>({id:'loop',length,cityIds:distances.map((_,i)=>`city-${i}`),
  stationIds:distances.map((_,i)=>`station-${i}`),stops:distances.map((distance,i)=>({cityId:`city-${i}`,stationId:`station-${i}`,distance})),segments:[{lineId:'track',start:0,end:length,offset:0,length}]});
function fixture(initial=loop(),{foodStock=10,gold=50}={}){
  let current=initial;
  const cities=[...new Set(initial.cityIds)].map((id,i)=>({id,ownerId:i?'gray':'teal',level:2,houseCount:6,biome:i?'farmland':'forest',x:i*10,z:0,stock:{food:foodStock}}));
  const world={gameplay:{ownerId:'teal',starterHouse:{biome:'forest'},farmVillages:{ownerId:'gray',cities:cities.slice(1)}}};
  const game={ownerId:'teal',logs:1000,food:12,gold,cities:[cities[0]],
    creditGold(n){this.gold+=n;return{ok:true};},spendGold(n){if(this.gold<n)return{ok:false};this.gold-=n;return{ok:true};},
    addLogs(n){this.logs+=n;return{ok:true};},spendLogs(n){if(this.logs<n)return{ok:false};this.logs-=n;return{ok:true};},
    addFood(n){this.food+=n;return{ok:true};},spendFood(n){if(this.food<n)return{ok:false};this.food-=n;return{ok:true};}};
  const session={player:game,bots:[],revision:0},railways={revision:0,snapshot(){return{revision:this.revision};}};
  const sample=(circuit,distance,revision=0)=>{
    const along=((distance%circuit.length)+circuit.length)%circuit.length,angle=along/circuit.length*Math.PI*2,radius=circuit.length/(Math.PI*2);
    return{x:Math.cos(angle)*radius+revision*100,y:.42,z:Math.sin(angle)*radius,angle:-angle,tangent:{x:-Math.sin(angle),y:0,z:Math.cos(angle)}};
  };
  const economy=createLoopEconomy(world,{session,railways,networkFactory:snapshot=>{
    const circuit=structuredClone(current),revision=snapshot.revision;
    return{loops:()=>[circuit],sample:(route,distance)=>sample(route,distance,revision)};
  }});
  return{economy,game,sample,replace(next){current=next;railways.revision++;session.revision++;for(const id of next.cityIds.slice(1))if(!world.gameplay.farmVillages.cities.some(city=>city.id===id))world.gameplay.farmVillages.cities.push({id,ownerId:'gray',level:2,houseCount:6,stock:{food:foodStock},x:0,z:0});}};
}
function until(economy,condition,{limit=60,step=STEP}={}){
  for(let i=0;i<=Math.ceil(limit/step);i++){
    const trains=economy.trains;if(condition(trains))return trains;
    economy.update(step);
  }
  assert.fail(`Condition not reached within ${limit}s: ${JSON.stringify(economy.trains.map(({state,waitReason,distance,nextStopCityId,laps})=>({state,waitReason,distance,nextStopCityId,laps})))}`);
}
const foodTotal=economy=>economy.resourcesAt('teal').food+economy.resourcesAt('gray').food+economy.trains.reduce((sum,train)=>sum+train.cargo.food,0);
const goldTotal=economy=>economy.resourcesAt('teal').gold+(economy.resourcesAt('gray').gold??0)+economy.trains.reduce((sum,train)=>sum+train.escrowGold,0);

test('one city corresponds to one car, duplicate station visits are removed, and the home engine never loads cargo',()=>{
  const circuit=loop();circuit.stops.push({...circuit.stops[1],distance:25});circuit.cityIds.push('city-1');
  const plan=createCircuitConsist(circuit,'city-0');assert.equal(plan.fits,true);assert.equal(plan.cars.length,3);
  assert.deepEqual(plan.cars.map(car=>car.cityId),['city-0','city-1','city-2']);
  assert.deepEqual(plan.cars.map(car=>car.offset),[0,TRAIN_CAR_SPACING,TRAIN_CAR_SPACING*2]);
  const {economy,game}=fixture(circuit);assert.equal(economy.buyTrain('city-0','loop','teal').ok,true);
  const train=economy.trains[0];assert.equal(train.carCount,3);assert.equal(train.carPoses.length,3);
  assert.ok(train.cars.every(car=>car.amount===0));assert.equal(game.logs,980);assert.equal(game.gold,48);assert.equal(train.escrowGold,2);
  assert.equal(economy.drainEvents().filter(event=>event.type==='pickup').length,0);
});

test('the city-assigned car and pickup align at the station, then the entire train waits one second',()=>{
  const circuit=loop(),{economy,sample}=fixture(circuit);economy.buyTrain('city-0','loop','teal');economy.drainEvents();
  const [train]=until(economy,trains=>trains[0].state==='dwell'&&trains[0].stopCityId==='city-1');
  const station=sample(circuit,20),event=economy.drainEvents().find(event=>event.type==='pickup');
  assert.equal(train.speed,0);assert.equal(event.cityId,'city-1');close(train.dwellRemaining,1);
  close(train.carPoses[1].x,station.x);close(train.carPoses[1].z,station.z);close(event.x,station.x);close(event.z,station.z);assert.equal(event.carIndex,1);
  assert.ok(Math.hypot(train.carPoses[0].x-station.x,train.carPoses[0].z-station.z)>2.5);
  assert.deepEqual(train.cars.map(car=>car.amount),[0,1,0]);assert.equal(economy.city('city-1').stock.food,9);
  const arrived=economy.elapsed;economy.update(.9);assert.equal(economy.trains[0].state,'dwell');assert.deepEqual(economy.trains[0].carPoses,train.carPoses);
  until(economy,trains=>trains[0].state==='moving',{limit:1});close(economy.elapsed-arrived,1,STEP+1e-7);
  const departed=economy.trains[0];assert.deepEqual(departed.carPoses,train.carPoses,'departure starts from the aligned platform');
  until(economy,trains=>trains[0].distance>departed.distance+.05,{limit:1});assert.ok(economy.trains[0].speed>0);assert.ok(economy.trains[0].speed<LOOP_ECONOMY.speed,'the train accelerates away');
  close(foodTotal(economy),32);close(goldTotal(economy),50);
});

test('rear-car stops wrapping across home are served in forward order and only remote goods are delivered',()=>{
  const circuit=loop([0,20,39],40),{economy,sample}=fixture(circuit);economy.buyTrain('city-0','loop','teal');
  const plan=createCircuitConsist(circuit,'city-0');close(plan.stops[0].distance,4.2);assert.deepEqual(plan.stops[0].carIndices,[2]);
  const [train]=until(economy,trains=>trains[0].state==='dwell');const station=sample(circuit,39);
  assert.equal(train.stopCityId,'city-2');assert.equal(train.cars[2].amount,1);close(train.carPoses[2].x,station.x);close(train.carPoses[2].z,station.z);
  until(economy,trains=>trains[0].laps===1);
  assert.equal(economy.trains[0].state,'dwell');assert.equal(economy.resourcesAt('teal').food,14);
  const pickups=economy.drainEvents().filter(event=>event.type==='pickup');assert.deepEqual(pickups.map(event=>event.cityId),['city-2','city-1']);
  assert.ok(economy.trains[0].cars.every(car=>car.amount===0));close(foodTotal(economy),32);close(goldTotal(economy),50);
});

test('simultaneous home and trailing-car alignments load once at the real return and share one stop',()=>{
  const circuit=loop([0,37.4],40),{economy}=fixture(circuit);economy.buyTrain('city-0','loop','teal');
  assert.equal(economy.trains[0].state,'moving');assert.deepEqual(economy.trains[0].cargo,{resources:0,food:0});
  assert.equal(economy.drainEvents().filter(event=>event.type==='pickup').length,0,'an overlapping departure pose is not an arrival');
  const [train]=until(economy,trains=>trains[0].laps===1);assert.equal(train.state,'dwell');assert.equal(train.stopCityId,'city-0');close(train.dwellRemaining,1);
  const events=economy.drainEvents(),pickups=events.filter(event=>event.type==='pickup'),deliveries=events.filter(event=>event.type==='delivery');
  assert.equal(pickups.length,1);assert.equal(pickups[0].cityId,'city-1');assert.equal(deliveries.length,1);close(pickups[0].time,deliveries[0].time);
  assert.equal(economy.resourcesAt('teal').food,13);close(foodTotal(economy),22);close(goldTotal(economy),50);
});

test('car poses remain continuous through deceleration, station dwell, departure and home wrap',()=>{
  const {economy}=fixture();economy.buyTrain('city-0','loop','teal');let previous=economy.trains[0].carPoses,sawStop=false,sawMoving=false;
  for(let frame=0;frame<6000&&economy.trains[0].laps<2;frame++){
    economy.update(.01);const train=economy.trains[0],cars=train.carPoses;sawStop||=train.state==='dwell';sawMoving||=train.speed>0;
    for(let index=0;index<cars.length;index++)assert.ok(Math.hypot(cars[index].x-previous[index].x,cars[index].z-previous[index].z)<=LOOP_ECONOMY.speed*.01+1e-7,'render interpolation keeps each carriage inside its frame travel budget');
    previous=cars;
  }
  assert.equal(economy.trains[0].laps,2);assert.ok(sawStop&&sawMoving);
});

test('a one-city circuit has one empty engine, no fare, and valid undersized rejection is atomic',()=>{
  const single=fixture(loop([0],10));assert.equal(single.economy.buyTrain('city-0','loop','teal').ok,true);
  assert.equal(single.economy.trains[0].carPoses.length,1);until(single.economy,trains=>trains[0].laps===1);assert.equal(single.economy.trains[0].state,'dwell');assert.equal(single.game.gold,50);
  assert.deepEqual(single.economy.trains[0].cargo,{resources:0,food:0});assert.equal(single.economy.drainEvents().filter(event=>event.type==='pickup').length,0);
  const short=fixture(loop([0,2],4)),before=short.economy.snapshot();
  const result=short.economy.buyTrain('city-0','loop','teal');assert.equal(result.code,'circuit-too-short');assert.match(result.reason,/too short/);assert.deepEqual(short.economy.snapshot(),before);
  assert.equal(createCircuitConsist(loop([0,3],5.2),'city-0').fits,true,'compact valid circuits are not rejected by the consist builder');
});

test('existing trains keep captured geometry while newly purchased trains use the revised circuit',()=>{
  const first=loop([0,20],40),item=fixture(first);item.economy.buyTrain('city-0','loop','teal');until(item.economy,trains=>trains[0].distance>5);
  const before=item.economy.trains[0],next=loop();next.id='new-loop';next.stationIds=next.stationIds.map(id=>`new:${id}`);next.segments[0].lineId='new-track';
  item.replace(next);assert.equal(item.economy.buyTrain('city-0','new-loop','teal').ok,true);
  const [oldTrain,newTrain]=item.economy.trains;assert.deepEqual(oldTrain.carPoses,before.carPoses);assert.equal(oldTrain.carCount,2);assert.equal(newTrain.carCount,3);assert.ok(newTrain.x>100);
  until(item.economy,trains=>trains.every(train=>train.laps>=1));assert.ok(item.economy.trains[0].x<10);assert.ok(item.economy.trains[1].x>90);
});

test('new trains queue until the whole earlier consist clears their spawn and goods and Gold remain conserved',()=>{
  const {economy}=fixture();for(let i=0;i<2;i++)assert.equal(economy.buyTrain('city-0','loop','teal').ok,true);
  const [first,queued]=economy.trains;assert.equal(first.active,true);assert.equal(queued.active,false);assert.equal(queued.state,'queued');assert.equal(queued.waitReason,'station-occupied');
  assert.equal(queued.escrowGold,0);assert.ok(queued.cars.every(car=>car.amount===0));assert.equal(economy.resourcesAt('teal').gold,48);
  const admitted=until(economy,trains=>trains[1].active);assert.ok(admitted[0].simulationDistance>TRAIN_CAR_SPACING*2,'the first train tail clears the home platform before admission');
  assert.equal(admitted[1].state,'moving');assert.equal(admitted[1].escrowGold,2);
  until(economy,trains=>trains.every(train=>train.laps>=1));close(foodTotal(economy),32);close(goldTotal(economy),50);
  assert.equal(economy.snapshot().stats.trainSpent,40);
});

test('car-specific stops, finite transfers and queue admission are independent of update frame size',()=>{
  const a=fixture(),b=fixture();for(const item of[a,b]){item.economy.buyTrain('city-0','loop','teal');item.economy.buyTrain('city-0','loop','teal');}
  a.economy.update(75);for(let step=0;step<600;step++)b.economy.update(.125);
  assert.deepEqual(a.economy.snapshot(),b.economy.snapshot());assert.deepEqual(a.economy.drainEvents(),b.economy.drainEvents());
  assert.ok(a.economy.trains.every(train=>train.laps>0));const produced=a.economy.snapshot().stats.produced.food;close(foodTotal(a.economy),32+produced);close(goldTotal(a.economy),50);
});
