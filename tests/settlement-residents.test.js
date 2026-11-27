import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3,Matrix4} from 'three';
import {createSettlementResidentSimulation,createSettlementResidents,buildResidentPathGraph,RESIDENT_LIMITS} from '../src/settlement-residents.js';
import {PERSON_HEIGHT} from '../src/person-scale.js';
import {M} from '../src/palette.js';
import {createSettlementGame} from '../src/settlement-game.js';

const world={seed:'citizens-test',players:[{id:'owner',color:{l:.61,c:.14,h:170}}],gameplay:{ownerId:'owner'}};
const point=(x,z,y=.015)=>({x,y,z});
function town(){
  const houses=[{id:'home-a',x:-5,y:0,z:0,rotation:0},{id:'home-b',x:5,y:0,z:0,rotation:0},{id:'home-c',x:0,y:0,z:5,rotation:Math.PI}];
  const cities=[{id:'city:home-a',houseIds:houses.map(home=>home.id),houseCount:3,level:1}];
  const paths=[{id:'a-b',fromHouseId:'home-a',toHouseId:'home-b',points:[point(-5,.9),point(-5,2),point(5,2),point(5,.9)]},
    {id:'c-a',fromHouseId:'home-c',toHouseId:'home-a',points:[point(0,4.1),point(0,2),point(-5,2),point(-5,.9)]}];
  return {houses,cities,paths};
}
function step(simulation,seconds){for(let i=0;i<Math.round(seconds*60);i++)simulation.update(1/60);}
function roadDistance(resident,paths){let best=Infinity;
  for(const path of paths)for(let i=1;i<path.points.length;i++){
    const a=path.points[i-1],b=path.points[i],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((resident.x-a.x)*dx+(resident.z-a.z)*dz)/(dx*dx+dz*dz)));
    best=Math.min(best,Math.hypot(resident.x-a.x-dx*t,resident.z-a.z-dz*t));
  }return best;
}

test('the third home brings one stable resident per home; outposts do not create citizens',()=>{
  const simulation=createSettlementResidentSimulation(world),snapshot=town();
  simulation.sync({...snapshot,houses:snapshot.houses.slice(0,2),cities:[]});assert.equal(simulation.residents.size,0);
  simulation.sync(snapshot);assert.equal(simulation.residents.size,3);const ids=simulation.snapshot().map(resident=>resident.id);
  step(simulation,3);const before=simulation.snapshot();simulation.sync(snapshot);
  assert.deepEqual(simulation.snapshot(),before,'re-syncing the world does not respawn or relocate anybody');
  assert.deepEqual(simulation.snapshot().map(resident=>resident.id),ids);
  const home={id:'home-d',x:10,y:0,z:0};snapshot.houses.push(home);snapshot.cities[0].houseIds.push(home.id);
  snapshot.paths.push({id:'b-d',fromHouseId:'home-b',toHouseId:home.id,points:[point(5,.9),point(5,2),point(10,2),point(10,.9)]});
  simulation.sync(snapshot);assert.equal(simulation.residents.size,4);
  snapshot.houses.push({id:'outpost',x:40,y:0,z:40});simulation.sync(snapshot);assert.equal(simulation.residents.size,4);
});

test('residents walk continuously on the real road graph and remain outside house doorways',()=>{
  const simulation=createSettlementResidentSimulation(world),snapshot=town();simulation.sync(snapshot);const first=simulation.snapshot();
  for(let frame=0;frame<60*75;frame++){
    const previous=simulation.snapshot();simulation.update(1/60);
    for(const [index,resident]of simulation.snapshot().entries()){
      assert.ok(roadDistance(resident,snapshot.paths)<1e-6);
      assert.ok(Math.hypot(resident.x-previous[index].x,resident.z-previous[index].z)<=resident.speed/60+1e-6,'movement never jumps at a junction');
      for(const house of snapshot.houses)assert.ok(Math.abs(resident.x-house.x)>.96||Math.abs(resident.z-house.z)>.96,'no shortcuts through a house');
      assert.ok(Math.abs(resident.y-.015)<1e-9,'feet track the path elevation');
    }
  }
  for(const [index,resident]of simulation.snapshot().entries()){assert.ok(resident.distance>20);assert.notDeepEqual([resident.x,resident.z],[first[index].x,first[index].z]);}
});

test('crossing streets share an actual intersection and overlapping doorstep strips are deduplicated',()=>{
  const membership=new Map([['a','town'],['b','town'],['c','town']]);
  const graph=buildResidentPathGraph([
    {id:'horizontal',fromHouseId:'a',toHouseId:'b',points:[point(-4,0),point(4,0)]},
    {id:'vertical',fromHouseId:'a',toHouseId:'c',points:[point(0,-4),point(0,4)]},
    {id:'overlap',fromHouseId:'a',toHouseId:'c',points:[point(-4,0),point(0,0),point(0,4)]},
  ],membership);
  const crossing=[...graph.nodes.values()].find(node=>node.x===0&&node.z===0);assert.ok(crossing);assert.equal(crossing.edges.length,4);
  assert.equal([...graph.edges.values()].filter(edge=>edge.pathIds.size===2).length,2);
  for(const edge of graph.edges.values())assert.ok(edge.length>0);
});

test('roads added under a moving resident split its edge without resetting position or gait',()=>{
  const simulation=createSettlementResidentSimulation(world),snapshot=town();simulation.sync(snapshot);step(simulation,7);
  const before=simulation.snapshot();snapshot.paths.push({id:'new-crossing',fromHouseId:'home-a',toHouseId:'home-c',points:[point(-2,-4),point(-2,6)]});
  simulation.sync(snapshot);
  for(const [index,resident]of simulation.snapshot().entries()){
    for(const key of ['x','y','z','heading','phase','distance'])assert.equal(resident[key],before[index][key],key);
  }
  step(simulation,10);for(const resident of simulation.snapshot())assert.ok(roadDistance(resident,snapshot.paths)<1e-6);
});

test('city merging keeps home-based resident identities and does not teleport citizens',()=>{
  const simulation=createSettlementResidentSimulation(world),snapshot=town();simulation.sync(snapshot);step(simulation,4);const before=simulation.snapshot();
  snapshot.cities[0].id='city:older-town';simulation.sync(snapshot);
  for(const [index,resident]of simulation.snapshot().entries()){
    assert.equal(resident.id,before[index].id);assert.equal(resident.x,before[index].x);assert.equal(resident.z,before[index].z);assert.equal(resident.cityId,'city:older-town');
  }
  step(simulation,5);for(const resident of simulation.snapshot())assert.ok(roadDistance(resident,snapshot.paths)<1e-6);
});

test('rerouted streets cannot teleport walkers to an unrelated new road',()=>{
  const simulation=createSettlementResidentSimulation(world),snapshot=town();simulation.sync(snapshot);step(simulation,4);const before=simulation.snapshot();
  snapshot.paths=snapshot.paths.map(path=>({...path,points:path.points.map(p=>({...p,x:p.x+20}))}));simulation.sync(snapshot);
  for(const [index,resident]of simulation.snapshot().entries()){assert.equal(resident.x,before[index].x);assert.equal(resident.z,before[index].z);}
  step(simulation,40);for(const resident of simulation.snapshot())assert.ok(resident.x<10,'removed street finishes in place instead of jumping to replacement');
});

test('same seed and roads reproduce the same residents and random walks',()=>{
  const a=createSettlementResidentSimulation(world),b=createSettlementResidentSimulation(world);a.sync(town());b.sync(town());step(a,40);step(b,40);assert.deepEqual(a.snapshot(),b.snapshot());
});

test('residents follow sloped path elevations and turn smoothly',()=>{
  const simulation=createSettlementResidentSimulation(world),snapshot=town();
  snapshot.paths=snapshot.paths.map(path=>({...path,points:path.points.map(p=>({...p,y:p.x*.08+.2}))}));simulation.sync(snapshot);
  for(let frame=0;frame<1000;frame++){
    const previous=simulation.snapshot();simulation.update(1/60);
    for(const [index,resident]of simulation.snapshot().entries()){
      assert.ok(Math.abs(resident.y-(resident.x*.08+.2))<1e-6);
      const turn=Math.atan2(Math.sin(resident.heading-previous[index].heading),Math.cos(resident.heading-previous[index].heading));assert.ok(Math.abs(turn)<.5);
    }
  }
});

test('instanced passenger-sized art uses two bounded batches and survives map/detail changes',()=>{
  const root=new Group(),residents=createSettlementResidents(root,world);residents.sync(town());residents.update(1/60,{focus:{x:0,z:0}});
  assert.equal(root.children.length,1);assert.equal(residents.root.children.length,2);assert.equal(residents.stats.residents,3);assert.equal(residents.body.count,3);assert.equal(residents.limbs.count,12);
  assert.equal(residents.body.instanceMatrix.count,RESIDENT_LIMITS.visible);assert.equal(residents.limbs.instanceMatrix.count,RESIDENT_LIMITS.visible*4);
  residents.body.geometry.computeBoundingBox();assert.ok(Math.abs(residents.body.geometry.boundingBox.max.y-PERSON_HEIGHT)<.02);
  const matrix=new Matrix4();residents.body.getMatrixAt(0,matrix);const position=new Vector3().setFromMatrixPosition(matrix);assert.ok(Math.abs(position.y-.027)<1e-6);
  const before=residents.snapshot();residents.update(.1,{mapBlend:1});assert.equal(residents.root.visible,false);assert.equal(residents.stats.visible,0);assert.equal(residents.stats.residents,3);
  residents.update(.1,{mapBlend:0,focus:{x:0,z:0}});assert.equal(residents.root.visible,true);assert.deepEqual(residents.snapshot().map(item=>item.id),before.map(item=>item.id));
  const owned=new Set([residents.body.geometry,residents.body.material,residents.limbs.geometry,residents.limbs.material]),disposed=new Set();for(const resource of owned)resource.addEventListener('dispose',()=>disposed.add(resource));
  let sharedDisposed=false;M.peach.addEventListener('dispose',()=>sharedDisposed=true);residents.dispose();assert.equal(root.children.length,0);assert.equal(disposed.size,owned.size);assert.equal(sharedDisposed,false);
});

test('render capacity remains fixed while population grows and off-camera residents continue walking',()=>{
  const root=new Group(),residents=createSettlementResidents(root,world),snapshot=town();
  snapshot.houses=Array.from({length:400},(_,index)=>({id:`home-${index}`,x:(index%20)*.1,z:0,y:0}));snapshot.cities[0].houseIds=snapshot.houses.map(home=>home.id);
  snapshot.paths=[{id:'long-road',fromHouseId:'home-0',toHouseId:'home-1',points:[point(0,1.2),point(80,1.2)]}];residents.sync(snapshot);
  residents.update(.1,{focus:{x:0,z:0}});assert.equal(residents.stats.residents,400);assert.equal(residents.stats.visible,RESIDENT_LIMITS.visible);assert.equal(residents.root.children.length,2);
  for(let i=0;i<50;i++)residents.update(.1,{focus:{x:1000,z:1000}});assert.equal(residents.stats.visible,0);
  assert.ok(residents.snapshot().every(item=>item.distance>1));residents.dispose();
});


test('a resident waiting for a first road joins it once, without respawning existing walkers',()=>{
  const simulation=createSettlementResidentSimulation(world),snapshot=town();simulation.sync({...snapshot,paths:[]});
  assert.equal(simulation.residents.size,3);assert.ok(simulation.snapshot().every(resident=>resident.onRoad===false));
  simulation.sync(snapshot);assert.ok(simulation.snapshot().every(resident=>resident.onRoad&&resident.edgeId));
  step(simulation,6);assert.ok(simulation.snapshot().every(resident=>resident.distance>1));
});

function routineTown(){
  const snapshot=town(),cityId=snapshot.cities[0].id;
  snapshot.buildings=[{id:'market',buildingType:'market',x:-3,z:-5,cityId},
    {id:'well',buildingType:'well',x:3,z:5,cityId},{id:'garden',buildingType:'plaza',x:8,z:6,cityId}];
  for(const [id,points]of [
    ['market',[point(-3,-3.8),point(-3,2),point(-5,2),point(-5,.9)]],
    ['well',[point(3,4.1),point(3,2),point(-5,2),point(-5,.9)]],
    ['garden',[point(8,3.5),point(8,2),point(-5,2),point(-5,.9)]],
  ])snapshot.paths.push({id:`civic:${id}`,fromHouseId:id,toHouseId:'home-a',cityId,points});
  return snapshot;
}

function routineStep(simulation,seconds,options={dayPhase:'day'}){
  for(let frame=0;frame<seconds*60;frame++)simulation.update(1/60,options);
}

test('daytime routines visit civic entrances, linger at varied distances and chat without leaving the paths',()=>{
  const simulation=createSettlementResidentSimulation({...world,seed:'routines'}),snapshot=routineTown();simulation.sync(snapshot);
  const visited=new Set(),activities=new Set(),paces=new Set(simulation.snapshot().map(resident=>resident.speed));
  assert.equal(paces.size,3,'neighbours have individually seeded walking paces');
  for(let frame=0;frame<240*60;frame++){
    const previous=simulation.snapshot();simulation.update(1/60,{dayPhase:'day'});
    assert.ok(simulation.stats.routeSearches<=RESIDENT_LIMITS.routeBudget);
    for(const [index,resident]of simulation.snapshot().entries()){
      activities.add(resident.activity);if(resident.arrived&&!resident.moving)visited.add(resident.destinationKind);
      assert.ok(roadDistance(resident,snapshot.paths)<1e-6,'every errand and waiting spot belongs to a real path');
      assert.ok(Math.hypot(resident.x-previous[index].x,resident.z-previous[index].z)<=resident.speed/60+1e-6,'purposeful travel remains continuous');
    }
  }
  for(const kind of ['market','well','plaza','junction'])assert.ok(visited.has(kind),`${kind} receives actual visits`);
  assert.ok(activities.has('walking')&&activities.has('lingering')&&activities.has('chatting'));
  assert.equal(new Set(simulation.snapshot().map(resident=>resident.arrivalOffset)).size,3,'visitors do not all wait at exactly the same point');
});

test('night sends residents to their own homes without teleporting, and dawn restarts their local errands',()=>{
  const simulation=createSettlementResidentSimulation(world),snapshot=routineTown();simulation.sync(snapshot);routineStep(simulation,80);
  const before=simulation.snapshot();simulation.update(1/60,{night:1});
  for(const [index,resident]of simulation.snapshot().entries())assert.ok(Math.hypot(resident.x-before[index].x,resident.z-before[index].z)<=resident.speed/60+1e-6);
  routineStep(simulation,120,{night:1});const resting=simulation.snapshot();
  assert.equal(simulation.stats.activities.resting,3);
  for(const resident of resting){
    const home=snapshot.houses.find(house=>house.id===resident.houseId);
    assert.equal(resident.activity,'resting');assert.equal(resident.destinationId,resident.houseId);
    assert.ok(Math.hypot(resident.x-home.x,resident.z-home.z)<2.1,'rest is on their own doorstep approach');
    assert.ok(roadDistance(resident,snapshot.paths)<1e-6);
  }
  routineStep(simulation,20,{night:1});
  for(const [index,resident]of simulation.snapshot().entries()){
    assert.equal(resident.x,resting[index].x);assert.equal(resident.z,resting[index].z);assert.equal(resident.distance,resting[index].distance);
  }
  routineStep(simulation,16,{night:0});assert.equal(simulation.stats.activities.resting,0);
  for(const [index,resident]of simulation.snapshot().entries())assert.ok(resident.distance>resting[index].distance+1,'each resident resumes after its own dawn delay');
});

test('routines stay in their own nearby city even when another civic entrance is close',()=>{
  const first=routineTown(),second=routineTown(),dx=24;
  second.houses=second.houses.map(home=>({...home,id:`other:${home.id}`,x:home.x+dx}));
  second.cities=[{...second.cities[0],id:'other-city',houseIds:second.houses.map(home=>home.id)}];
  second.buildings=second.buildings.map(building=>({...building,id:`other:${building.id}`,cityId:'other-city',x:building.x+dx}));
  second.paths=second.paths.map(path=>({...path,id:`other:${path.id}`,cityId:'other-city',fromHouseId:`other:${path.fromHouseId}`,toHouseId:`other:${path.toHouseId}`,points:path.points.map(p=>({...p,x:p.x+dx}))}));
  const snapshot={houses:[...first.houses,...second.houses],cities:[...first.cities,...second.cities],paths:[...first.paths,...second.paths],buildings:[...first.buildings,...second.buildings]};
  const simulation=createSettlementResidentSimulation(world);simulation.sync(snapshot);
  for(let frame=0;frame<180*60;frame++){
    simulation.update(1/60,{dayPhase:'day'});
    for(const resident of simulation.snapshot()){
      const own=resident.cityId==='other-city'?second:first;
      assert.ok(roadDistance(resident,own.paths)<1e-6);
      if(resident.destinationId?.startsWith('other:'))assert.equal(resident.cityId,'other-city');
      assert.ok(resident.x>=(resident.cityId==='other-city'?dx-5:-5)-1e-6&&resident.x<=(resident.cityId==='other-city'?dx+8:8)+1e-6);
    }
  }
});

test('a growing town and night arrival preserve resident identities, positions and bounded route work',()=>{
  const simulation=createSettlementResidentSimulation(world),snapshot=routineTown();simulation.sync(snapshot);routineStep(simulation,9);
  const before=simulation.snapshot();snapshot.paths.push({id:'new-crossing',cityId:snapshot.cities[0].id,fromHouseId:'home-a',toHouseId:'home-c',points:[point(-2,-3),point(-2,6)]});
  simulation.sync(snapshot);
  for(const [index,resident]of simulation.snapshot().entries())for(const key of ['id','x','y','z','heading','phase','distance'])assert.equal(resident[key],before[index][key],key);
  for(let frame=0;frame<120*60;frame++){simulation.update(1/60,{dayPhase:'night'});assert.ok(simulation.stats.routeSearches<=RESIDENT_LIMITS.routeBudget);}
  assert.equal(simulation.stats.activities.resting,3);
  const paused=simulation.snapshot();simulation.update(0,{dayPhase:'day'});assert.deepEqual(simulation.snapshot(),paused,'simulation pause leaves routine and gait state unchanged');
});

test('real settlement growth and civic IDs feed routines and preserve citizens when two cities merge',()=>{
  const game=createSettlementGame({seed:'progression',gameplay:{ownerId:'teal',starterHouse:{id:'home-1',kind:'house',x:0,y:0,z:0,rotation:0,scale:1}}},{surfaceAt:()=>({type:'ground',height:0})});
  for(let i=0;i<60;i++)game.chop({id:`tree-${i}`,kind:'tree',x:100,z:100});
  const simulation=createSettlementResidentSimulation({seed:'real-city-routines'});
  for(const x of [5,10,27,32,37]){assert.equal(game.build({x,z:0}).ok,true);while(game.developmentSearching)game.develop();simulation.sync(game.snapshot());}
  assert.equal(game.cities.length,2);assert.equal(simulation.residents.size,6);
  const visits=new Set();
  for(let frame=0;frame<150*60;frame++){simulation.update(1/60,{dayPhase:'day'});for(const resident of simulation.snapshot())if(resident.arrived)visits.add(resident.destinationId);}
  for(const building of game.buildings)assert.ok(visits.has(building.id),'each real well receives visits from its own town');
  const before=simulation.snapshot();assert.equal(game.build({x:18,z:0}).ok,true);while(game.developmentSearching)game.develop();simulation.sync(game.snapshot());
  assert.equal(simulation.residents.size,7);
  for(const old of before){const resident=simulation.snapshot().find(item=>item.id===old.id);assert.equal(resident.x,old.x);assert.equal(resident.z,old.z);assert.equal(resident.phase,old.phase);}
  routineStep(simulation,130,{dayPhase:'night'});assert.equal(simulation.stats.activities.resting,7);
  for(const resident of simulation.snapshot()){assert.equal(resident.cityId,game.cities[0].id);assert.equal(resident.destinationId,resident.houseId);assert.ok(roadDistance(resident,game.paths)<1e-6);}
});
