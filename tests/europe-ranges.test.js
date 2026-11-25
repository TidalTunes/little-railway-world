import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import clipping from 'polygon-clipping';
import {createEuropeRanges,EUROPE_RANGE_SPECS} from '../src/europe-ranges.js';
import {projectEurope} from '../src/europe-world.js';
import {rangeFootprintDistance,rangeSurfaceHeight,rangeMeshData} from '../src/mountain-ranges.js';
import {createMountainGeometry} from '../src/geography.js';
import {createMountainContours} from '../src/mountain-contours.js';
import {buildMapWorld} from '../src/map-world.js';

const geography=JSON.parse(fs.readFileSync(new URL('../data/europe-geography.json',import.meta.url)));
const cities=JSON.parse(fs.readFileSync(new URL('../data/europe-cities.json',import.meta.url))).cities;
// The geographic factory exposes objects; range authoring deliberately accepts a
// small projection adapter and stays independent of the city/route implementation.
const project=(lon,lat)=>{const p=projectEurope(lon,lat);return [p.x,p.z];};
const ranges=createEuropeRanges(project,geography.landInterior);
const area=ring=>Math.abs(ring.reduce((sum,p,i)=>{const q=ring[(i+1)%ring.length];return sum+p[0]*q[1]-q[0]*p[1];},0)/2);
const multiArea=multi=>multi.reduce((sum,rings)=>sum+area(rings[0])-rings.slice(1).reduce((n,hole)=>n+area(hole),0),0);

test('major European ranges follow geographic anchors and remain inside dry land including lake setbacks',()=>{
  assert.ok(ranges.length>=EUROPE_RANGE_SPECS.length);assert.ok(ranges.length<50,'coastal fragments remain bounded');
  assert.equal(new Set(ranges.map(range=>range.id)).size,ranges.length);
  for(const mountain of ranges){
    const outside=clipping.difference([[mountain.range.polygon,...mountain.range.holes]],geography.landInterior);
    assert.ok(multiArea(outside)<1e-6,`${mountain.id} stays off water and banks`);
    assert.ok(mountain.range.cellSize<=8&&mountain.range.cellSize>=2);
  }
  for(const [id,lon,lat]of [['alps',7.0,45.85],['pyrenees',.55,42.7],['scandinavian',8.2,61.6],
    ['carpathians',25.5,45.65],['apennines',13.55,42.5],['caucasus',42.45,43.1],
    ['scottish-highlands',-3.5,57.1],['iceland-highlands',-16.7,64.6]]){
    const mountain=ranges.find(m=>m.id===id),[x,z]=project(lon,lat);
    assert.ok(mountain,`${id} exists`);assert.ok(rangeSurfaceHeight(mountain,x,z)>3,`${id} rises at its authored spine`);
  }
  assert.equal(ranges.find(m=>m.id==='alps').height,35);assert.equal(ranges.find(m=>m.id==='caucasus').height,35);
  assert.equal(ranges.find(m=>m.id==='scottish-highlands').height,12);
  const carpathians=ranges.find(m=>m.id==='carpathians');
  assert.ok(rangeFootprintDistance(carpathians,...project(24,47))>0,'the Carpathian arc leaves the Transylvanian basin open');
  for(const city of cities)assert.ok(ranges.every(m=>rangeFootprintDistance(m,...project(city.lon,city.lat))>=0),`${city.id} center remains in its plain or valley`);
  for(let i=0;i<ranges.length;i++)for(let j=i+1;j<ranges.length;j++){
    const overlap=clipping.intersection([[ranges[i].range.polygon,...ranges[i].range.holes]],[[ranges[j].range.polygon,...ranges[j].range.holes]]);
    assert.ok(multiArea(overlap)<1e-6,`${ranges[i].id} and ${ranges[j].id} do not overlap rock surfaces`);
  }
});

test('an Alpine tunnel remains compact when excavated in 192-unit regional cells and unrelated cuts are skipped',()=>{
  const mountain=ranges.find(m=>m.id==='alps'),a=project(11.4,48.4),b=project(11.4,44.5),length=b[1]-a[1],n=Math.ceil(length/.6);
  const points=Array.from({length:n+1},(_,i)=>({x:a[0],y:.42,z:a[1]+length*i/n}));
  const line={points,distances:points.map((_,i)=>length*i/n),length,
    cuts:[{mountainId:mountain.id,start:0,end:length}],tunnels:[{mountainId:mountain.id,start:20,end:length-20}]};
  let maxTriangles=0,maxBytes=0;
  for(const x of [-192,0])for(const z of [0,192]){
    const local={...mountain,renderBounds:{minX:x,maxX:x+192,minZ:z,maxZ:z+192}};
    const geo=createMountainGeometry(local,[line]);
    const triangles=(geo.index?.count??geo.attributes.position.count)/3;
    const bytes=Object.values(geo.attributes).reduce((sum,a)=>sum+a.array.byteLength,geo.index?.array.byteLength??0);
    maxTriangles=Math.max(maxTriangles,triangles);maxBytes=Math.max(maxBytes,bytes);
    if(x===-192){
      const untouched=createMountainGeometry(local,[]);
      assert.deepEqual(geo.attributes.position.array,untouched.attributes.position.array,'a remote cutter does not rebuild the regional geometry');
      assert.deepEqual(geo.index.array,untouched.index.array);untouched.dispose();
    }
    geo.dispose();
  }
  assert.ok(maxTriangles>1000&&maxTriangles<6000);assert.ok(maxBytes<512*1024,'each regional massif uses less than half a megabyte before batching');
  const cache=rangeMeshData(mountain);assert.equal(rangeMeshData({...mountain}),cache,'regional clones share the full range cache');
});

test('worker-prepared mountain contours are clone-safe and let map construction avoid terrain sampling',()=>{
  const mountain=ranges.find(m=>m.id==='alps'),mapContours=createMountainContours(mountain);
  const clone=structuredClone(mapContours);assert.deepEqual(clone,mapContours);
  assert.ok(clone.low.length&&clone.high.length&&clone.snow.length);
  assert.ok(JSON.stringify(clone).length<50000);
  const cached={height:mountain.height,mapContours:clone};
  Object.defineProperty(cached,'range',{get(){throw new Error('map attempted to build detailed terrain');}});
  const world={outline:[[-200,70],[200,70],[200,300],[-200,300]],river:{width:1,points:[{x:-195,z:70,y:-1.2},{x:-195,z:300,y:-1.2}]},
    cities:[],lines:[],mountains:[cached],players:[],placements:[],stations:[]};
  const map=buildMapWorld(new THREE.Group(),world);
  assert.ok(map.stats.staticVertices>100,'cached map contours still produce visible terrain shapes');map.dispose();
});
