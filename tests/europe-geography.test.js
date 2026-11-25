import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createEuropeWorld,projectEurope} from '../src/europe-world.js';
import {projectGeographicHeading} from '../src/europe-projection.js';

const data=JSON.parse(fs.readFileSync(new URL('../data/europe-geography.json',import.meta.url),'utf8'));
const cityReference=JSON.parse(fs.readFileSync(new URL('../data/europe-cities.json',import.meta.url),'utf8'));
const project=(lon,lat)=>{const {x,z}=projectEurope(lon,lat);return[x,z];};
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

test('Europe projection is conformal, centered and all polygon rings are finite, closed and clipped',()=>{
  assert.equal(data.projection.type,'lambert-conformal-conic');
  assert.ok(Math.hypot(...project(10,52))<1e-10);
  assert.ok(project(10,53)[1]<0);
  assert.ok(project(11,52)[0]>0);
  for(const key of ['land','ocean','landInterior','oceanShore','lakes','lakeShore'])for(const polygon of data[key])for(const ring of polygon){
    assert.ok(ring.length>=4);assert.deepEqual(ring[0],ring.at(-1));
    for(const [x,z]of ring){
      assert.ok(Number.isFinite(x)&&Number.isFinite(z));
      assert.ok(Math.abs(x)<=data.bounds.width/2+.001&&Math.abs(z)<=data.bounds.depth/2+.001);
    }
  }
});

test('projected coordinates match independent PROJ LCC reference values',()=>{
  // pyproj 3.7.2 / PROJ, +proj=lcc +lat_0=52 +lon_0=10 +lat_1=35
  // +lat_2=65 +ellps=GRS80, meters divided by3000 and northing negated.
  const references=[
    [-3.7038,40.4168,-378.0392244226265,381.2342006905634],
    [-9.14,38.72,-540.9402612861065,407.682513744411],
    [2.35,48.86,-180.46142253827657,103.09292947747295],
    [-19,65,-444.41353841064443,-560.1586776728135],
    [37.62,55.75,547.4295418777992,-238.0810151868844],
    [28.98,41.01,515.3668609537807,328.3192030188501],
  ];
  for(const [lon,lat,x,z] of references){
    const actual=projectEurope(lon,lat);
    assert.ok(Math.hypot(actual.x-x,actual.z-z)<1e-8,`${lon},${lat}`);
  }
});

test('Spain and the full map preserve local aspect, right angles and geographic station headings',()=>{
  const {semiMajorAxis:a,inverseFlattening}=data.projection.ellipsoid,f=1/inverseFlattening,e2=f*(2-f);
  const h=1e-5,radians=Math.PI/180;
  for(const [lon,lat] of [[-4,37],[-4,40],[-4,43],[-19,65],[15,65],[37,56],[29,41],[10,30],[10,71.5]]){
    const west=projectEurope(lon-h,lat),east=projectEurope(lon+h,lat),south=projectEurope(lon,lat-h),north=projectEurope(lon,lat+h);
    const ex=(east.x-west.x)/(2*h*radians),ez=(east.z-west.z)/(2*h*radians);
    const nx=(north.x-south.x)/(2*h*radians),nz=(north.z-south.z)/(2*h*radians);
    const base=1-e2*Math.sin(lat*radians)**2;
    const parallelRadius=a/Math.sqrt(base)*Math.cos(lat*radians),meridianRadius=a*(1-e2)/base**1.5;
    const scaleEast=Math.hypot(ex,ez)/parallelRadius,scaleNorth=Math.hypot(nx,nz)/meridianRadius;
    assert.ok(Math.abs(scaleEast/scaleNorth-1)<1e-7,`${lon},${lat}: east and north have equal local scale`);
    assert.ok(Math.abs((ex*nx+ez*nz)/(Math.hypot(ex,ez)*Math.hypot(nx,nz)))<1e-7,'east and north stay perpendicular');
    for(const [bearing,dx,dz] of [[0,nx,nz],[Math.PI/2,ex,ez]]){
      const heading=projectGeographicHeading(data.projection,lon,lat,bearing);
      assert.ok((Math.sin(heading)*dx+Math.cos(heading)*dz)/Math.hypot(dx,dz)>.99999999,'station axes follow geographic bearings');
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
  const extent=area([[data.outline]]),land=area(data.land);
  assert.ok(data.outline.length<400,'curved extent remains cheap for runtime boundary checks');
  assert.ok(Math.abs(land+area(data.ocean)+area(data.lakes)-extent)<.01,'land, lakes and ocean account for the complete projected geographic extent');
  assert.ok(Math.abs(area(data.landInterior)+area(data.oceanShore)+area(data.lakeShore)-land)<.01,'dry land and both shoreline types account for every land polygon');
  // Independent dense sampling detects overlaps/gaps beyond an area identity.
  for(let row=0;row<20;row++)for(let column=0;column<22;column++){
    const point=[(column+.37)/22*data.bounds.width-data.bounds.width/2,(row+.61)/20*data.bounds.depth-data.bounds.depth/2];
    if(!inRing(point,data.outline))continue;
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
