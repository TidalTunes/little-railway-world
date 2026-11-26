import test from 'node:test';
import assert from 'node:assert/strict';
import geography from '../data/earth-geography.json' with {type:'json'};
import {createEarthWorld,projectEarth,EARTH_RADIUS,EARTH_CIRCUITS} from '../src/earth-world.js';
import {generateWorld,generateWorldRegion,validateWorld} from '../src/world-model.js';
import {biomeDistance} from '../src/biomes.js';
import {createNetworkTraffic} from '../src/network-traffic.js';

const masks={biomes:{ice:geography.ice,regions:['land','landInterior','ocean','oceanShore','lakes'].map(type=>({type,polygons:geography[type]}))}};
const distance=(kind,lon,lat)=>{const p=projectEarth(lon,lat);return biomeDistance(masks,kind,p.x,p.z);};
let input,network;
function factory(){return input??=createEarthWorld();}
function world(){return network??=generateWorld(factory(),{detail:'network'});}

test('Earth cities form substantial residential neighborhoods with regional boundary clearance',()=>{
  const model={...world(),density:0},regions=new Map(),cities=[];
  for(const city of model.cities){
    const key=`${Math.floor(city.x/192)}:${Math.floor(city.z/192)}`;
    if(!regions.has(key))regions.set(key,generateWorldRegion(model,city));
  }
  const placements=[],cityStreets=[];
  for(const region of regions.values()){
    placements.push(...region.placements);cityStreets.push(...region.cityStreets);cities.push(...region.cities);
  }
  const houses=placements.filter(p=>p.kind==='house');
  assert.ok(placements.length>=1100,'the former fixed eight-unit footprints held only 77 buildings across Earth');
  assert.ok(houses.length>=700,'development produces hundreds of actual homes rather than unfilled budgets');
  assert.ok(cities.filter(c=>houses.filter(p=>p.cityId===c.id).length>=3).length>=70,'most cities have a residential neighborhood');
  assert.ok(cities.every(c=>c.radius>=16),'higher-level Earth cities use their development footprint');
  const sources=new Map(factory().cities.map(c=>[c.id,c]));
  for(const city of cities){
    assert.equal(city.x,sources.get(city.id).x);assert.equal(city.z,sources.get(city.id).z);
    assert.ok(placements.filter(p=>p.cityId===city.id).every(p=>Math.hypot(p.x-city.x,p.z-city.z)+p.radius<=city.radius+1e-6));
  }
  // Combining separately generated regions detects cross-cell overlaps as
  // well as coastal, track, station, street, and mountain clipping.
  assert.deepEqual(validateWorld({...model,cities,placements,cityStreets}),[]);
});

test('Earth geography covers every continent and keeps islands, inland water and exact polar ice',()=>{
  for(const [name,lon,lat]of [['North America',-100,40],['South America',-60,-10],['Africa',20,0],['Europe',10,50],['Asia',90,40],['Australia',135,-25],['Antarctica',0,-80]]){
    assert.ok(distance('land',lon,lat)>0,`${name} is real source land`);
  }
  for(const island of geography.protectedIslands)assert.ok(distance('land',island.longitude,island.latitude)>=0,island.name);
  for(const [lon,lat]of [[-140,0],[-30,0],[80,-25],[0,85]])assert.ok(distance('ocean',lon,lat)>0);
  assert.ok(distance('ice',-42,74)>0&&distance('ice',30,-80)>0);
  assert.ok(distance('ice',-19,65)<0,'Greenland ice uses its source component, never a rectangular Iceland/Baffin overlay');
  assert.ok(geography.lakeFeatures.length>100&&geography.rivers.length>=40);
  assert.ok(geography.rivers.every(river=>river.paths.every(path=>path.length>=2&&path.every(p=>p.every(Number.isFinite)))));
  assert.ok(geography.sources.every(source=>source.license==='Public domain'&&/^[0-9a-f]{64}$/.test(source.sha256)&&source.page.startsWith('https://www.naturalearthdata.com/')));
});

test('complete globe chart metadata and source coast remain finite at dateline and poles',()=>{
  const model=factory(),half=Math.PI*EARTH_RADIUS;
  assert.equal(model.surface.complete,true);assert.equal(model.surface.radius,1600);
  assert.equal(model.surface.projection.type,'equirectangular');
  assert.equal(model.bounds.width,half*2);assert.equal(model.bounds.depth,half);
  for(const key of ['land','landInterior','ocean','oceanShore','lakes','lakeShore','ice'])for(const polygon of geography[key])for(const ring of polygon){
    assert.ok(ring.length>=4&&ring.every(([x,z])=>Number.isFinite(x)&&Number.isFinite(z)&&Math.abs(x)<=half+1e-5&&Math.abs(z)<=half/2+1e-5));
    assert.deepEqual(ring[0],ring.at(-1));
  }
  for(const longitude of [-179.99,-90,0,90,179.99]){
    assert.ok(distance('landInterior',longitude,-89.9)>0,'Antarctica continues to the pole');
    assert.ok(distance('oceanShore',longitude,-89.9)<-10,'chart edges do not create polar beaches');
  }
  for(const longitude of [-179.99,179.99]){
    assert.ok(distance('landInterior',longitude,68)>0,'Chukotka land wraps across the dateline');
    assert.ok(distance('oceanShore',longitude,68)<-1,'the periodic longitude seam is not a coast');
  }
  assert.deepEqual(structuredClone(model),model,'factory input is worker-cloneable without runtime objects');
});

test('global city layout is sourced, deterministic and split into closed land-mass circuits',()=>{
  const model=factory(),ids=new Set(model.cities.map(city=>city.id)),used=[];
  assert.equal(ids.size,96);assert.equal(model.connections.length,96);
  assert.equal(Object.keys(EARTH_CIRCUITS).length,10);
  assert.ok(model.cities.every(city=>city.sourceId&&city.country&&Number.isFinite(city.longitude)&&Number.isFinite(city.latitude)&&city.inlandOffset<=13));
  assert.ok(model.cities.every(city=>biomeDistance(masks,'landInterior',city.x,city.z)>=3.9999),'city centers have a dry reservation');
  const lines=new Map(model.connections.map(line=>[line.id,line]));
  for(const circuit of model.traffic.circuits){
    const members=circuit.segments.map(segment=>lines.get(segment.lineId));
    assert.ok(members.every(Boolean));
    members.forEach((line,index)=>{
      assert.equal(line.to,members[(index+1)%members.length].from);used.push(line.id);
      assert.ok(ids.has(line.from)&&ids.has(line.to));
    });
  }
  assert.equal(new Set(used).size,model.connections.length);
  assert.deepEqual(createEarthWorld(),model);
});

test('complete Earth network validates, has no long sea causeways and runs all requested trains',()=>{
  const model=world();assert.deepEqual(validateWorld(model),[]);
  assert.equal(model.lines.length,96);assert.ok(model.mountains.length>=30);
  assert.ok(model.mountains.every(m=>m.range.cellSize>=6&&m.range.cellSize<=20));
  for(const line of model.lines){
    let oceanRun=0;
    for(let i=0;i<line.points.length;i+=8){
      const point=line.points[i],step=i?line.distances[i]-line.distances[Math.max(0,i-8)]:0;
      oceanRun=biomeDistance(model,'ocean',point.x,point.z)>.05?oceanRun+step:0;
      assert.ok(oceanRun<20,`${line.id} must not become a long ocean causeway`);
    }
  }
  const traffic=createNetworkTraffic(model);
  assert.equal(traffic.trains.length,250);
  traffic.update(.2); // Admission moves any crossing-blocked initial spawn into a safe open headway.
  assert.ok(traffic.trains.every(train=>train.active));
  assert.ok(traffic.trains.every(train=>train.carPoses.every(pose=>Number.isFinite(pose.x)&&Number.isFinite(pose.z))));
});
