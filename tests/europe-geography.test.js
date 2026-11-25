import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createEuropeWorld,projectEurope} from '../src/europe-world.js';

const data=JSON.parse(fs.readFileSync(new URL('../data/europe-geography.json',import.meta.url),'utf8'));
const cityReference=JSON.parse(fs.readFileSync(new URL('../data/europe-cities.json',import.meta.url),'utf8'));
const project=(lon,lat)=>[(lon-data.projection.centralLongitude)*data.projection.unitsPerLongitudeDegree,
  (data.projection.centralLatitude-lat)*data.projection.unitsPerLatitudeDegree];
function inRing([x,z],ring){
  let inside=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const [ax,az]=ring[i],[bx,bz]=ring[j];
    if((az>z)!==(bz>z)&&x<(bx-ax)*(z-az)/(bz-az)+ax)inside=!inside;
  }
  return inside;
}
const covers=(polygons,p)=>polygons.some(rings=>inRing(p,rings[0])&&!rings.slice(1).some(ring=>inRing(p,ring)));
function area(polygons){
  const ringArea=ring=>Math.abs(ring.reduce((sum,[x,z],i)=>{
    const next=ring[(i+1)%ring.length];return sum+x*next[1]-next[0]*z;
  },0))/2;
  return polygons.reduce((sum,rings)=>sum+ringArea(rings[0])-rings.slice(1).reduce((holes,ring)=>holes+ringArea(ring),0),0);
}

test('Europe projection is north-up and all polygon rings are finite, closed and clipped',()=>{
  assert.deepEqual(project(9.75,50.75),[0,0]);
  assert.equal(project(9.75,51.75)[1],-36);
  assert.ok(Math.abs(project(10.75,50.75)[0]-36*Math.cos(52*Math.PI/180))<1e-10);
  for(const key of ['land','ocean','landInterior','oceanShore','lakes','lakeShore'])for(const polygon of data[key])for(const ring of polygon){
    assert.ok(ring.length>=4);assert.deepEqual(ring[0],ring.at(-1));
    for(const [x,z]of ring){
      assert.ok(Number.isFinite(x)&&Number.isFinite(z));
      assert.ok(Math.abs(x)<=data.bounds.width/2+.001&&Math.abs(z)<=data.bounds.depth/2+.001);
    }
  }
});

test('coastline preserves major islands and partitions real land, beach and sea',()=>{
  for(const island of data.protectedIslands)assert.ok(covers(data.land,island.point),island.name);
  for(const [name,lon,lat]of [['North Sea',3,56],['Atlantic',-15,45],['Mediterranean',15,35],['Baltic',20,57],['Black Sea',34,43]]){
    const point=project(lon,lat);assert.ok(covers(data.ocean,point),name);assert.equal(covers(data.land,point),false,name);
  }
  for(const [name,lon,lat]of [['Paris',2.35,48.86],['Madrid',-3.7,40.42],['Berlin',13.4,52.52],['Moscow',37.62,55.75]]){
    assert.ok(covers(data.landInterior,project(lon,lat)),name);
  }
  const rectangle=area([[data.outline]]),land=area(data.land);
  assert.ok(Math.abs(land+area(data.ocean)+area(data.lakes)-rectangle)<.01,'land, lakes and ocean account for the complete map rectangle');
  assert.ok(Math.abs(area(data.landInterior)+area(data.oceanShore)+area(data.lakeShore)-land)<.01,'dry land and both shoreline types account for every land polygon');
  // Independent dense sampling detects overlaps/gaps beyond an area identity.
  for(let row=0;row<20;row++)for(let column=0;column<22;column++){
    const point=[(column+.37)/22*data.bounds.width-data.bounds.width/2,(row+.61)/20*data.bounds.depth-data.bounds.depth/2];
    const landCover=covers(data.land,point),seaCover=covers(data.ocean,point),lakeCover=covers(data.lakes,point);
    assert.equal(Number(landCover)+Number(seaCover)+Number(lakeCover),1);
    assert.equal(Number(covers(data.landInterior,point))+Number(covers(data.oceanShore,point))+Number(covers(data.lakeShore,point)),Number(landCover));
  }
});

test('major lakes remain inland water with their own complete bank band',()=>{
  const names=new Set(data.lakeFeatures.map(lake=>lake.name));
  for(const name of ['Ladoga','Onega','Vänern','Vättern','Geneva','Constance','Balaton','Saimaa','Garda','Loch Ness']){
    assert.ok(names.has(name),name);
  }
  assert.equal(new Set(data.lakeFeatures.map(lake=>lake.id)).size,data.lakeFeatures.length);
  for(const lake of data.lakeFeatures){
    assert.ok(covers(data.lakes,lake.point),`${lake.name} is water`);
    for(const key of ['land','landInterior','ocean','oceanShore','lakeShore'])assert.equal(covers(data[key],lake.point),false,`${lake.name} is not ${key}`);
    assert.ok(lake.area>0&&lake.sourceIds.length>0);
  }
  // Sample immediately outside the water edge as well as the large-scale grid:
  // the bank may be interrupted by a nearby lake or coastline but never overlap.
  let bankSamples=0;
  for(const polygon of data.lakes){
    const ring=polygon[0],step=Math.max(1,Math.floor(ring.length/12));
    for(let i=0;i<ring.length-1;i+=step){
      const a=ring[i],b=ring[i+1],length=Math.hypot(b[0]-a[0],b[1]-a[1]);
      if(length<.1)continue;
      const point=[(a[0]+b[0])/2+(b[1]-a[1])*.35/length,(a[1]+b[1])/2-(b[0]-a[0])*.35/length];
      if(!covers(data.land,point))continue;
      assert.equal(covers(data.landInterior,point),false,'lake-adjacent land is reserved as bank');
      assert.equal(Number(covers(data.oceanShore,point))+Number(covers(data.lakeShore,point)),1,'bank belongs to exactly one shoreline');
      bankSamples++;
    }
  }
  assert.ok(bankSamples>100,'bank test samples the complete set of lakes');
});

test('named rivers retain finite nonzero paths and reproducible public-domain provenance',()=>{
  const names=new Set(data.rivers.map(river=>river.name));
  for(const name of ['Rhine','Danube','Seine','Thames','Po','Dnieper','Volga'])assert.ok(names.has(name));
  assert.equal(new Set(data.rivers.map(river=>river.id)).size,data.rivers.length);
  for(const river of data.rivers){
    assert.ok(river.paths.length>0&&river.sourceIds.length>0);
    for(const path of river.paths){
      assert.ok(path.length>=2);
      let length=0;
      for(let i=0;i<path.length;i++){
        const [x,z]=path[i];assert.ok(Number.isFinite(x)&&Number.isFinite(z));
        assert.ok(Math.abs(x)<=data.bounds.width/2+.001&&Math.abs(z)<=data.bounds.depth/2+.001);
        if(i)length+=Math.hypot(x-path[i-1][0],z-path[i-1][1]);
      }
      assert.ok(length>0);
    }
  }
  for(const source of data.sources){
    assert.equal(source.license,'Public domain');assert.match(source.sha256,/^[0-9a-f]{64}$/);
    assert.ok(source.url.startsWith('https://naturalearth.s3.amazonaws.com/'));
  }
  assert.ok(new Set(data.biomeSites.map(site=>site.type)).size===4);
  assert.ok(data.statistics.landVertices<25000,'coastline and lake holes remain a compact regional subset');
});

test('the 50-city factory preserves geographic coordinates and places every city on real land',()=>{
  const world=createEuropeWorld();
  assert.equal(world.cities.length,50);
  assert.equal(new Set(world.cities.map(city=>city.id)).size,50);
  assert.deepEqual(world.bounds,data.bounds);
  for(const city of world.cities){
    const source=cityReference.cities.find(candidate=>candidate.id===city.id);
    assert.ok(source,city.id);
    assert.deepEqual(projectEurope(source.lon,source.lat),{x:city.x,z:city.z});
    const projected=project(source.lon,source.lat);
    assert.deepEqual([city.x,city.z],projected);
    assert.equal(city.population,source.population);
    assert.ok(covers(data.land,projected),`${city.name} lies on real land`);
    assert.equal(covers(data.ocean,projected),false,`${city.name} is not sea`);
    assert.equal(covers(data.lakes,projected),false,`${city.name} is not a lake`);
  }
});
