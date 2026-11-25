import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import clipping from 'polygon-clipping';
import { generateWorld, CLEARANCES } from '../src/world-model.js';

const showcaseInput=JSON.parse(fs.readFileSync(new URL('../public/worlds/showcase.json',import.meta.url),'utf8'));
const worlds=new Map();
function showcase(seed=showcaseInput.seed){
  if(!worlds.has(seed))worlds.set(seed,generateWorld({...showcaseInput,seed}));
  return worlds.get(seed);
}
const dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function pointSegment(p,a,b){
  const dx=b.x-a.x,dz=b.z-a.z;
  const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));
  return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);
}
function cross(a,b,c){return(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);}
function segmentPair(a,b,c,d){
  const abC=cross(a,b,c),abD=cross(a,b,d),cdA=cross(c,d,a),cdB=cross(c,d,b);
  if(abC*abD<0&&cdA*cdB<0)return 0;
  return Math.min(pointSegment(a,c,d),pointSegment(b,c,d),pointSegment(c,a,b),pointSegment(d,a,b));
}
function pointLine(p,points){let best=Infinity;for(let i=1;i<points.length;i++)best=Math.min(best,pointSegment(p,points[i-1],points[i]));return best;}
function linePair(a,b){let best=Infinity;for(let i=1;i<a.length;i++)for(let j=1;j<b.length;j++)best=Math.min(best,segmentPair(a[i-1],a[i],b[j-1],b[j]));return best;}
function ringPoints(ring){const points=ring.map(([x,z])=>({x,z}));if(dist(points[0],points.at(-1))>1e-8)points.push(points[0]);return points;}
function inRing(p,ring){
  let inside=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const a=ring[i],b=ring[j];
    if(pointSegment(p,{x:a[0],z:a[1]},{x:b[0],z:b[1]})<1e-8)return true;
    if((a[1]>p.z)!==(b[1]>p.z)&&p.x<(b[0]-a[0])*(p.z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
  }
  return inside;
}
function inPolygons(p,polygons){return polygons.some(poly=>inRing(p,poly[0])&&!poly.slice(1).some(hole=>inRing(p,hole)));}
function rectanglePoints(item){
  const c=Math.cos(item.rotation),s=Math.sin(item.rotation),length=item.platform.length,width=item.platform.width;
  const points=[[-length/2,-width/2],[length/2,-width/2],[length/2,width/2],[-length/2,width/2]]
    .map(([x,z])=>({x:item.x+x*c+z*s,z:item.z-x*s+z*c}));
  points.push(points[0]);return points;
}
function assertConnected(streets,label){
  const key=p=>`${p.x.toFixed(5)},${p.z.toFixed(5)}`,adjacency=new Map();
  for(const street of streets)for(let i=1;i<street.points.length;i++){
    const a=key(street.points[i-1]),b=key(street.points[i]);
    if(!adjacency.has(a))adjacency.set(a,[]);if(!adjacency.has(b))adjacency.set(b,[]);
    adjacency.get(a).push(b);adjacency.get(b).push(a);
  }
  assert.ok(adjacency.size>1,`${label} has a usable street graph`);
  const seen=new Set(),queue=[adjacency.keys().next().value];
  while(queue.length){const key=queue.pop();if(seen.has(key))continue;seen.add(key);queue.push(...adjacency.get(key));}
  assert.equal(seen.size,adjacency.size,`${label} streets form one connected network`);
}
function auditStreets(world){
  const outline=ringPoints(world.outline);
  const dry=clipping.union(...world.biomes.regions.filter(r=>['forest','farmland','plains','desert'].includes(r.type)).map(r=>r.polygons));
  const dryBoundaries=dry.flatMap(p=>p.map(ringPoints));
  for(const city of world.cities)assertConnected(world.cityStreets.filter(s=>s.cityId===city.id),city.id);
  for(const street of world.cityStreets){
    const city=world.cities.find(c=>c.id===street.cityId),r=street.width/2;
    assert.ok(street.width>0&&street.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.z)));
    for(const p of street.points){
      assert.ok(inRing(p,world.outline),`${street.id} stays on the island`);
      assert.ok(inPolygons(p,dry),`${street.id} stays on dry ground`);
      assert.ok(dist(p,city)+r<=city.radius+.001,`${street.id} stays inside its city`);
    }
    assert.ok(linePair(street.points,outline)>=r+CLEARANCES.worldEdge-.001,`${street.id} clears the island edge`);
    for(const boundary of dryBoundaries)assert.ok(linePair(street.points,boundary)>=r-.001,`${street.id} clears the dry-biome boundary`);
    assert.ok(linePair(street.points,world.river.points)>=r+world.river.width/2+CLEARANCES.riverBank-.001,`${street.id} clears river banks`);
    for(const line of world.lines)assert.ok(linePair(street.points,line.points)>=r+CLEARANCES.track-.001,`${street.id} clears ${line.id}`);
    for(const mountain of world.mountains)assert.ok(pointLine(mountain,street.points)>=r+mountain.radius+CLEARANCES.mountain-.001,`${street.id} clears ${mountain.id}`);
    for(const station of world.stations){
      const corners=rectanglePoints(station);
      const polygon=corners.map(p=>[p.x,p.z]);
      assert.ok(street.points.every(p=>!inRing(p,polygon)),`${street.id} never runs through ${station.id}`);
      assert.ok(linePair(street.points,corners)>=r-.001,`${street.id} clears ${station.id}`);
    }
    for(const item of world.placements)assert.ok(pointLine(item,street.points)>=r+item.radius+CLEARANCES.street-.001,`${street.id} clears ${item.id}`);
  }
  // Independent pairwise circles include every new dense city and farm asset.
  for(let i=0;i<world.placements.length;i++)for(let j=0;j<i;j++){
    const a=world.placements[i],b=world.placements[j];
    assert.ok(dist(a,b)>=a.radius+b.radius+CLEARANCES.objects-.001,`${a.id} overlaps ${b.id}`);
  }
}

test('natural city lanes remain connected and clear across their entire polylines',()=>{
  for(const seed of [showcaseInput.seed,42])auditStreets(showcase(seed));
});

test('showcase cities gain density while retaining curved lanes and distinct seeded plans',()=>{
  const world=showcase(),buildings=world.placements.filter(p=>p.cityId);
  assert.ok(buildings.length>=220,`showcase has ${buildings.length} city buildings; the former sparse plan had187`);
  const high=world.cities.filter(c=>c.level>=8);
  let naturalCount=0;
  for(const city of high){
    const streets=world.cityStreets.filter(s=>s.cityId===city.id);
    if(streets.some(s=>s.points.length>2&&s.points.some(p=>pointSegment(p,s.points[0],s.points.at(-1))>.12)))naturalCount++;
    const lots=buildings.filter(p=>p.cityId===city.id);
    assert.ok(lots.length>=(city.level>=9?25:18),`${city.id} remains a substantial developed city`);
    assert.ok(lots.every(p=>p.scale>=.7&&p.scale<=1.1),'density does not come from nearly invisible buildings');
  }
  assert.ok(naturalCount>=Math.ceil(high.length*.6),'most developed cities contain genuinely curved lanes');
  const other=showcase(42);
  assert.notDeepEqual(world.cityStreets,other.cityStreets,'another seed creates distinct organic plans');
});

function parcelGap(a,b){return Math.hypot(Math.max(0,Math.abs(a.x-b.x)-(a.width+b.width)/2),Math.max(0,Math.abs(a.z-b.z)-(a.depth+b.depth)/2));}

test('farm districts contain densely packed, connected crop parcels with shared orientation',()=>{
  const world=showcase(),farms=world.placements.filter(p=>p.kind==='farm');
  assert.ok(world.farmland&&farms.length>0,'farmland is described by compiled district metadata');
  assert.equal(world.farmland.districts.length,farms.length);
  assert.equal(new Set(farms.map(f=>f.districtId)).size,farms.length);
  assert.ok(Math.abs(world.farmland.area-farms.reduce((sum,f)=>sum+f.width*f.depth,0))<.000001,'reported district acreage matches reserved geometry');
  let cropArea=0;
  for(const farm of farms){
    assert.ok(farm.width>0&&farm.depth>0);
    assert.ok(farm.radius>=Math.hypot(farm.width,farm.depth)/2-.000001,'district reserves its full rectangular silhouette');
    assert.ok(farm.parcels.length>=4,'a district groups adjacent fields');
    let area=0;
    const neighbors=farm.parcels.map(()=>[]);
    for(let i=0;i<farm.parcels.length;i++){
      const a=farm.parcels[i];
      assert.ok(a.width>0&&a.depth>0);
      assert.ok(Math.abs(a.x)+a.width/2<=farm.width/2+.000001);
      assert.ok(Math.abs(a.z)+a.depth/2<=farm.depth/2+.000001);
      area+=a.width*a.depth;
      for(let j=0;j<i;j++){
        const b=farm.parcels[j],overlapX=(a.width+b.width)/2-Math.abs(a.x-b.x),overlapZ=(a.depth+b.depth)/2-Math.abs(a.z-b.z);
        assert.ok(overlapX<=.000001||overlapZ<=.000001,'crop parcel interiors never overlap');
        if(parcelGap(a,b)<=.65){neighbors[i].push(j);neighbors[j].push(i);}
      }
    }
    assert.ok(area/(farm.width*farm.depth)>=.80,'crop parcels occupy at least80% of a district');
    const seen=new Set(),queue=[0];
    while(queue.length){const index=queue.pop();if(seen.has(index))continue;seen.add(index);queue.push(...neighbors[index]);}
    assert.equal(seen.size,farm.parcels.length,'all parcels connect through narrow shared lanes');
    cropArea+=area;
  }
  assert.ok(cropArea>=1600,`crop area ${cropArea.toFixed(1)} should substantially exceed the former790 square units`);
  assert.ok(farms.every(f=>Math.abs(Math.sin(f.rotation-farms[0].rotation))<.000001),'districts follow one coherent regional orientation');
});

test('density zero disables farms without changing deterministic city development',()=>{
  const input={seed:73,bounds:{width:180,depth:140},cities:[{id:'a',x:-40,z:-20,level:8},{id:'b',x:40,z:-20,level:8}],
    river:{points:[[-110,40],[110,40]],width:4},mountains:[],connections:[{from:'a',to:'b'}]};
  const none=generateWorld({...input,density:0}),some=generateWorld({...input,density:.4});
  assert.equal(none.placements.filter(p=>p.kind==='farm').length,0);
  assert.equal(none.farmland.area,0);
  assert.deepEqual(none.cityStreets,some.cityStreets);
  assert.deepEqual(none.placements.filter(p=>p.cityId),some.placements.filter(p=>p.cityId));
});
