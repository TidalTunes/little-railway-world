import test from 'node:test';
import assert from 'node:assert/strict';
import {Vector3} from 'three';
import {generateWorld,validateWorld,sampleLine,CLEARANCES} from '../src/world-model.js';
import {surfacePoint,rigidSurfacePoseMatrix} from '../src/world-surface.js';

const radius=1600;
const sphere=(world,p)=>surfacePoint(world,p.x,0,p.z).add(new Vector3(0,radius,0));
// Independent 3D arc measurements avoid validating planner units with itself.
const groundDistance=(world,a,b)=>sphere(world,a).angleTo(sphere(world,b))*radius;

function fixture(latitude){
  return generateWorld({seed:9,bounds:{width:700,depth:300},outline:[[-350,-150],[350,-150],[350,150],[-350,150]],
    surface:{type:'sphere',radius,complete:false,origin:{longitude:0,latitude},
      projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:latitude}},density:0,
    cities:[{id:'a',x:-120,z:0,level:8},{id:'b',x:120,z:0,level:8}],connections:[{from:'a',to:'b'}],
    rivers:[],mountains:[],biomes:{sites:[{id:'green',type:'plains',x:0,z:0}]}});
}

test('high-latitude neighborhoods reserve full physical footprints rather than squeezed chart circles',()=>{
  for(const latitude of [0,60,75]){
    const world=fixture(latitude);
    assert.ok(world.placements.length>=40,`latitude ${latitude} still has substantial neighborhoods`);
    assert.deepEqual(validateWorld(world),[]);
    for(const city of world.cities)for(const p of world.placements.filter(p=>p.cityId===city.id)){
      assert.ok(groundDistance(world,city,p)+p.radius<=city.radius+1e-5,'physical city boundary');
    }
    for(let i=0;i<world.placements.length;i++)for(let j=0;j<i;j++){
      const a=world.placements[i],b=world.placements[j];
      assert.ok(groundDistance(world,a,b)>=a.radius+b.radius+CLEARANCES.objects-1e-5,'actual houses cannot overlap');
    }
    if(latitude===75)assert.ok(world.placements.some(p=>{
      const c=world.cities.find(c=>c.id===p.cityId);return Math.hypot(p.x-c.x,p.z-c.z)>c.radius;
    }),'a physical city correctly occupies more longitude-chart space near a pole');
  }
});

test('stations retain their track offset and face the rails in physical coordinates',()=>{
  for(const latitude of [0,60,75]){
    const world=fixture(latitude);assert.equal(world.stations.length,2);
    for(const station of world.stations){
      const line=world.lines.find(l=>l.id===station.lineId),p=sampleLine(line,station.distance);
      assert.ok(Math.abs(groundDistance(world,station,p)-CLEARANCES.stationOffset)<1e-6);
      const pose=rigidSurfacePoseMatrix(world,station.x,0,station.z,station.rotation),forward=new Vector3().setFromMatrixColumn(pose,2);
      const towardTrack=surfacePoint(world,p.x,0,p.z).sub(surfacePoint(world,station.x,0,station.z)).normalize();
      assert.ok(forward.dot(towardTrack)>.99999,'platform front faces its railway');
    }
  }
});


test('a city spanning the date line grows continuous physical neighborhoods in its deterministic owner region',async()=>{
  const {generateWorldRegion}=await import('../src/world-model.js');
  const half=Math.PI*radius,z=-radius*Math.PI/3;
  const world=generateWorld({seed:9,bounds:{width:half*2,depth:half},outline:[[-half,-half/2],[half,-half/2],[half,half/2],[-half,half/2]],
    surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
      projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},density:0,
    cities:[{id:'seam-city',x:half-4,z,level:8},{id:'neighbor',x:half-164,z,level:8}],connections:[{from:'neighbor',to:'seam-city'}],
    rivers:[],mountains:[],biomes:{ocean:false,sites:[{id:'green',type:'plains',x:0,z:0}]}},{detail:'network'});
  const city=world.cities[0],region=generateWorldRegion(world,{x:city.x,z:city.z,size:192});
  assert.ok(region.placements.length>=20,'the seam must not remove half the usable neighborhood');
  assert.ok(region.placements.some(p=>p.x>half-70),'the city occupies its original side');
  assert.ok(region.placements.some(p=>p.x< -half+70),'the same city crosses the date line');
  assert.deepEqual(validateWorld({...world,placements:region.placements,cityStreets:region.cityStreets}),[]);
  for(const p of region.placements)assert.ok(groundDistance(world,city,p)+p.radius<=city.radius+1e-5);
  for(const street of region.cityStreets)for(let i=1;i<street.points.length;i++)
    assert.ok(groundDistance(world,street.points[i-1],street.points[i])<2,'street samples remain nearby across the seam');
  generateWorldRegion(world,{x:-half+4,z,size:192});
  assert.deepEqual(generateWorldRegion(world,{x:city.x,z:city.z,size:192}),region,'neighbor request order cannot alter owner geometry');
});
