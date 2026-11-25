import test from 'node:test';
import assert from 'node:assert/strict';
import reference from '../data/europe-cities.json' with {type:'json'};
import geography from '../data/europe-geography.json' with {type:'json'};
import {createEuropeWorld,projectEurope} from '../src/europe-world.js';
import {generateWorld,validateWorld} from '../src/world-model.js';
import {createNetworkTraffic,sampleNetworkPath} from '../src/network-traffic.js';
import {BoundsTree,pointBox,pointsBox} from '../src/spatial-index.js';

// Independently checked against the official F21 workbook's 2025 column.
const RANKED_IDS='istanbul moscow london paris madrid saint-petersburg barcelona berlin athens naples essen birmingham kyiv milan manchester rome vienna minsk lisbon bucharest warsaw munich hamburg budapest stockholm brussels valencia kharkiv amsterdam copenhagen liverpool lyon prague nizhny-novgorod turin dublin cologne belgrade sofia rostov-on-don leeds rotterdam helsinki porto glasgow dusseldorf frankfurt odesa stuttgart lille'.split(' ');
let network;
const europe=()=>network??=generateWorld(createEuropeWorld(),{detail:'network'});

test('the reference retains the audited UN 2025 top 50 and its exact population cutoff',()=>{
  assert.equal(reference.populationYear,2025);
  assert.equal(reference.populationUnit,'persons');
  assert.match(reference.populationDefinition,/DEGURBA/);
  assert.match(reference.source.url,/population\.un\.org\/wup\/assets\/Download\/Cities\/WUP2025-F21-DEGURBA-Cities_Pop\.xlsx$/);
  assert.equal(reference.source.sha256,'3a96030d87aec6c1c50f658d5321067d6345e1ab936c5d2854524f972caa75c0');
  assert.equal(reference.selection.strictTop50WithinSelection,true);
  assert.equal(reference.selection.eligibleCityCount,1049);
  assert.deepEqual(reference.cities.map(city=>city.id),RANKED_IDS);
  assert.equal(new Set(reference.cities.map(city=>city.unCityCode)).size,50);
  const countries=new Set(reference.selection.eligibleEuropeanCountryCodes),box=reference.selection.bbox;
  for(const [index,city] of reference.cities.entries()){
    assert.equal(city.rank,index+1);
    assert.ok(Number.isSafeInteger(city.population)&&city.population>0);
    if(index)assert.ok(reference.cities[index-1].population>=city.population);
    assert.ok(countries.has(city.countryCode)||city.id==='istanbul'&&city.unCityCode===2626);
    assert.ok(city.lon>=box.west&&city.lon<=box.east&&city.lat>=box.south&&city.lat<=box.north);
  }
  assert.equal(reference.cities[0].population,15014763);
  assert.equal(reference.cities[1].population,14524753);
  assert.equal(reference.cities[2].population,10416420);
  assert.equal(reference.cities.at(-1).population,893282);
  assert.deepEqual(reference.selection.nextExcludedCity,{name:'Marseille',population:891463});
});

test('the Europe factory preserves every source coordinate and population while assigning consistent development',()=>{
  const world=createEuropeWorld();
  assert.equal(world.camera.northUp,true);
  assert.equal(world.cities.length,50);
  assert.equal(new Set(world.cities.map(city=>city.ownerId)).size,4);
  assert.deepEqual(world.bounds,geography.bounds);
  for(const [index,city] of world.cities.entries()){
    const source=reference.cities[index];
    for(const key of Object.keys(source))assert.deepEqual(city[key],source[key],`${city.id}: ${key}`);
    assert.deepEqual({x:city.x,z:city.z},projectEurope(source.lon,source.lat));
    assert.equal(city.populationYear,2025);
    assert.ok(Number.isInteger(city.level)&&city.level>=4&&city.level<=10);
    if(index)assert.ok(world.cities[index-1].level>=city.level,'larger populations cannot have lower development');
    assert.ok(city.radius>0&&city.radius<=18);
    const nearest=Math.min(...world.cities.filter(other=>other!==city).map(other=>Math.hypot(city.x-other.x,city.z-other.z)));
    assert.ok(city.radius<=nearest*.44+1e-9,'nearby cities retain separate footprints');
  }
  assert.equal(world.cities[0].level,10);assert.equal(world.cities.at(-1).level,4);
  assert.equal(createEuropeWorld({trainCount:0}).traffic.trainCount,0);
});

test('all authored European railways compile with legal curvature and real bridge/tunnel structures',()=>{
  const world=europe();
  assert.equal(world.lines.length,54);
  assert.deepEqual(validateWorld(world),[]);
  assert.ok(world.lines.some(line=>line.tunnels.length>0),'mountain corridors create tunnels');
  for(const id of ['europe-hamburg-copenhagen','europe-copenhagen-stockholm']){
    assert.ok(world.lines.find(line=>line.id===id).bridges.length>0,`${id} bridges its real straits`);
  }
  const british=new Set(reference.cities.filter(city=>city.countryCode==='GBR').map(city=>city.id));
  for(const line of world.lines){
    assert.equal(british.has(line.from),british.has(line.to),'no invented cross-Channel causeway');
    assert.notEqual(line.from,'dublin');assert.notEqual(line.to,'dublin');
    for(const segment of line.alignment.segments)if(segment.type==='arc')assert.ok(segment.radius>=4-1e-8);
  }
});

function inRing([x,z],ring){
  let inside=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const a=ring[i],b=ring[j];
    if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
  }
  return inside;
}
test('railways stay on land except for short actual strait and estuary crossings',()=>{
  const sea=new BoundsTree(geography.ocean.map(polygon=>({polygon,box:pointsBox(polygon[0].map(([x,z])=>({x,z})))})),item=>item.box);
  const isSea=point=>sea.query(pointBox(point.x,point.z,.001)).some(({polygon})=>
    inRing([point.x,point.z],polygon[0])&&!polygon.slice(1).some(hole=>inRing([point.x,point.z],hole)));
  for(const line of europe().lines){
    let start=null,longest=0;
    for(let index=0;index<line.points.length;index++){
      const s=line.distances[index];
      if(isSea(line.points[index])){
        start??=s;longest=Math.max(longest,s-start);
        assert.ok(line.bridges.some(bridge=>s>=bridge.start-.7&&s<=bridge.end+.7),`${line.id} supports every sea crossing`);
      }else start=null;
    }
    // The longest intended crossing is the Great Belt; the other corridors
    // never enter open ocean. This also catches accidental Gulf/Baltic chords.
    assert.ok(longest<=11,`${line.id} has no long ocean causeway (${longest})`);
    if(line.id!=='europe-hamburg-copenhagen')assert.ok(longest<=5.5,`${line.id} crosses only a short strait or estuary`);
  }
});

test('180 trains operate on three continuous regional circuits, including Britain and the Danish bridges',()=>{
  const traffic=createNetworkTraffic(europe());
  assert.equal(traffic.trains.length,180);
  assert.equal(traffic.trains.filter(train=>train.active).length,180);
  assert.deepEqual(traffic.paths.map(path=>path.id),['europe-west','europe-north-east','europe-britain']);
  const usedLines=new Set(),served=new Set();
  for(const path of traffic.paths){
    assert.ok(traffic.trains.some(train=>train.path===path));
    for(const segment of path.segments){
      assert.equal(usedLines.has(segment.lineId),false,'operating circuits avoid long shared reservations');
      usedLines.add(segment.lineId);served.add(segment.line.from);served.add(segment.line.to);
      const before=sampleNetworkPath(path,segment.start-1e-5),after=sampleNetworkPath(path,segment.start+1e-5);
      assert.ok(Math.hypot(after.x-before.x,after.z-before.z)<2.1e-5);
      assert.ok(before.tangent.x*after.tangent.x+before.tangent.z*after.tangent.z>.999999);
    }
  }
  assert.equal(served.size,43);
  assert.ok(usedLines.has('europe-hamburg-copenhagen')&&usedLines.has('europe-copenhagen-stockholm'));
  const start=traffic.trains.map(train=>train.distance);
  for(let step=0;step<150;step++)traffic.update(.2);
  for(const path of traffic.paths)assert.ok(traffic.trains.some((train,index)=>train.path===path&&Math.abs(train.distance-start[index])>10));
  assert.equal(traffic.trains.filter(train=>train.active).length,180);
});
