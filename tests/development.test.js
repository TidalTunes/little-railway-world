import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DEFAULT_PLAYERS, normalizePlayers, normalizePlayerColor, cityDevelopment, cityRandom } from '../src/development.js';
import { generateWorld, validateWorld, pointSegmentDistance, CLEARANCES } from '../src/world-model.js';

const showcaseInput=JSON.parse(fs.readFileSync(new URL('../public/worlds/showcase.json',import.meta.url),'utf8'));
let showcase;
const getShowcase=()=>showcase??=generateWorld({...showcaseInput,density:0});
const compactInput={seed:'development-tests',bounds:{width:180,depth:140},density:0,
  cities:[{id:'a',x:-40,z:-20,level:3,ownerId:'coral'},{id:'b',x:40,z:-20,level:3,ownerId:'teal'}],
  river:{points:[[-110,40],[110,40]],width:4},mountains:[],connections:[{id:'ab',from:'a',to:'b'}]};

function geometry(world){
  return {
    cities:world.cities.map(({id,x,z,level,radius,development})=>({id,x,z,level,radius,development})),
    lines:world.lines.map(({id,points})=>({id,points})),
    streets:world.cityStreets.map(({ownerId,...street})=>street),
    assets:world.placements.map(({ownerId,...item})=>item),
    stations:world.stations.map(({ownerId,...station})=>station),
  };
}

test('player colors normalize to serializable OKLCH and identities remain stable',()=>{
  const players=normalizePlayers();
  assert.equal(players.length,4);
  assert.deepEqual(players.map(p=>p.id),DEFAULT_PLAYERS.map(p=>p.id));
  assert.deepEqual(JSON.parse(JSON.stringify(players)),players);
  const red=normalizePlayerColor('#ff0000');
  assert.ok(Math.abs(red.l-.627955)<.00001);
  assert.ok(Math.abs(red.c-.257683)<.00001);
  assert.ok(Math.abs(red.h-29.2339)<.001);
  assert.deepEqual(normalizePlayerColor({l:.6,c:.1,h:-30}),{l:.6,c:.1,h:330});
  for(const bad of [[],[{id:'x',color:'red'}],[{id:'x',color:{l:2,c:.1,h:10}}],
    [{id:'same'},{id:'same'}],[{id:''}]])assert.throws(()=>normalizePlayers(bad),/Invalid world/);
});

test('levels progressively increase coherent budgets, footprints and available features',()=>{
  let previous={radius:0,buildingBudget:0};
  for(let level=1;level<=10;level++){
    const next=cityDevelopment(level);
    assert.ok(next.radius>previous.radius);
    assert.ok(next.buildingBudget>previous.buildingBudget);
    for(const feature of previous.features??[])assert.ok(next.features.includes(feature));
    previous=next;
  }
  assert.deepEqual(cityDevelopment(1).features,['house']);
  assert.deepEqual(new Set(cityDevelopment(10).features),new Set(['house','landmark','apartment','plaza','civic','tower']));
  for(const bad of [0,11,3.2,NaN,'4',null])assert.throws(()=>cityDevelopment(bad),/integers from 1 through 10/);
  const one=cityRandom(42,'a'),again=cityRandom(42,'a'),different=cityRandom(42,'b');
  const sequence=Array.from({length:8},()=>one());
  assert.deepEqual(sequence,Array.from({length:8},()=>again()));
  assert.notDeepEqual(sequence,Array.from({length:8},()=>different()));
});

test('ownership inherits correctly without affecting procedural street or asset geometry',()=>{
  const first=generateWorld(compactInput);
  const second=generateWorld({...compactInput,players:normalizePlayers().map((p,i)=>({...p,color:{l:.45+i*.08,c:.12,h:i*75}})),
    cities:compactInput.cities.map(c=>({...c,ownerId:'blue'}))});
  assert.deepEqual(geometry(first),geometry(second));
  assert.equal(first.lines[0].ownerId,'coral');
  assert.equal(second.lines[0].ownerId,'blue');
  for(const item of [...second.placements.filter(p=>p.cityId),...second.stations,...second.cityStreets])assert.equal(item.ownerId,'blue');
  const override=generateWorld({...compactInput,connections:[{...compactInput.connections[0],ownerId:'gold'}],trainOwners:{'train-custom':'blue'}});
  assert.equal(override.lines[0].ownerId,'gold');
  assert.deepEqual(override.trainOwners,{'train-custom':'blue'});
  const unowned=compactInput.cities.map(({ownerId,level,...city})=>city);
  const inferred=generateWorld({...compactInput,cities:unowned});
  const upgraded=generateWorld({...compactInput,cities:unowned.map(c=>({...c,level:10}))});
  assert.deepEqual(inferred.cities.map(c=>c.ownerId),upgraded.cities.map(c=>c.ownerId),'developing a city never changes its default owner');
});

test('unknown owners and invalid levels fail before producing an incomplete world',()=>{
  for(const ownerId of ['unknown','']){
    assert.throws(()=>generateWorld({...compactInput,cities:compactInput.cities.map(c=>({...c,ownerId}))}),/unknown owner/);
    assert.throws(()=>generateWorld({...compactInput,connections:[{...compactInput.connections[0],ownerId}]}),/unknown owner/);
    assert.throws(()=>generateWorld({...compactInput,trainOwners:{train:ownerId}}),/unknown player/);
  }
  for(const level of [0,11,2.5,'5',Infinity])assert.throws(()=>generateWorld({...compactInput,cities:compactInput.cities.map(c=>({...c,level}))}),/levels must be integers/);
  assert.throws(()=>generateWorld({...compactInput,trainOwners:[]}),/trainOwners must be an object/);
  const world=generateWorld(compactInput);
  world.cities[0].level=12;world.lines[0].ownerId='missing';world.placements.find(p=>p.cityId).ownerId='missing';
  const types=new Set(validateWorld(world).map(v=>v.type));
  assert.ok(types.has('city-level')&&types.has('line-owner')&&types.has('asset-owner'));
});

test('showcase distributes all levels and owners with visibly richer, varied high-level hubs',()=>{
  const world=getShowcase();
  assert.equal(world.cities.length,16);
  assert.deepEqual(new Set(world.cities.map(c=>c.level)),new Set([1,2,3,4,5,6,7,8,9,10]));
  assert.equal(new Set(world.cities.map(c=>c.ownerId)).size,4);
  assert.ok(world.cities.filter(c=>Math.abs(c.z)<40).length>=8,'towns occupy the interior as well as the perimeter');
  assert.ok(world.lines.length>world.cities.length,'hub links join the two regional loops');
  assert.ok(world.lines.reduce((n,l)=>n+l.bridges.length,0)>=3);
  assert.ok(world.lines.reduce((n,l)=>n+l.tunnels.length,0)>=2);
  for(const city of world.cities){
    const buildings=world.placements.filter(p=>p.cityId===city.id);
    assert.equal(city.development.placedBuildings,buildings.length);
    assert.equal(city.development.streetCount,world.cityStreets.filter(s=>s.cityId===city.id).length);
    assert.ok(buildings.every(p=>Math.hypot(p.x-city.x,p.z-city.z)+p.radius<=city.radius+1e-6));
    if(city.level>=9){
      assert.ok(buildings.length>=20,`${city.id} is a substantial hub`);
      assert.ok(city.development.placedFeatures.includes('tower'));
      assert.ok(city.development.placedFeatures.includes('civic'));
      assert.ok(city.development.placedFeatures.includes('plaza'));
    }
    if(city.level===10)assert.ok(buildings.length>=25);
  }
  const twins=world.cities.filter(c=>c.level===10).map(city=>world.placements.filter(p=>p.cityId===city.id)
    .map(p=>[p.kind,p.variant,+(p.x-city.x).toFixed(3),+(p.z-city.z).toFixed(3)]));
  assert.notDeepEqual(twins[0],twins[1],'equal-level hubs have distinct reproducible plans');
  assert.deepEqual(validateWorld(world),[]);
});

test('city streets form connected graphs and every asset preserves their full width',()=>{
  const world=getShowcase();
  for(const city of world.cities){
    const streets=world.cityStreets.filter(s=>s.cityId===city.id),key=p=>`${p.x.toFixed(5)},${p.z.toFixed(5)}`;
    const graph=new Map();
    for(const street of streets){
      assert.equal(street.ownerId,city.ownerId);
      const a=key(street.points[0]),b=key(street.points.at(-1));
      if(!graph.has(a))graph.set(a,[]);if(!graph.has(b))graph.set(b,[]);
      graph.get(a).push(b);graph.get(b).push(a);
      for(const item of world.placements)assert.ok(pointSegmentDistance(item.x,item.z,...street.points)
        >=item.radius+street.width/2+CLEARANCES.street-1e-6,`${item.id} clears ${street.id}`);
    }
    const visited=new Set(),queue=[graph.keys().next().value];
    while(queue.length){const next=queue.pop();if(visited.has(next))continue;visited.add(next);queue.push(...graph.get(next));}
    assert.equal(visited.size,graph.size,`${city.id} street network is connected`);
  }
});
