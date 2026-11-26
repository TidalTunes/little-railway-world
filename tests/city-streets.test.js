import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildCityStreets,streetFootprint,STREET_HEIGHT} from '../src/city-streets.js';
import {surfaceChartCoordinates,surfaceOffset,surfaceDistance} from '../src/world-surface.js';

function streets(){return[
  {cityId:'town',width:1,points:[{x:-5,z:0},{x:0,z:0},{x:5,z:0}]},
  {cityId:'town',width:1,points:[{x:0,z:0},{x:0,z:5}]},
];}

test('connected paths form one watertight surface without overlapping junction triangles',()=>{
  const world={cities:[{id:'town',x:0,z:0}],cityStreets:streets()},parent=new THREE.Group();
  const paths=buildCityStreets(parent,world);assert.equal(paths.length,1);
  const footprint=streetFootprint(world,world.cityStreets,{x:0,z:0});assert.equal(footprint.length,1);
  assert.equal(footprint[0].holes.length,0);
  parent.updateMatrixWorld(true);
  for(const [x,z]of [[.11,.15],[-.19,.27],[.23,-.15],[.12,4.8],[-4.8,.12]]){
    const hits=new THREE.Raycaster(new THREE.Vector3(x,2,z),new THREE.Vector3(0,-1,0)).intersectObjects(paths);
    assert.equal(hits.length,1,'each interior sample has one road surface, never coplanar overlapping strips');
    assert.ok(Math.abs(hits[0].point.y-STREET_HEIGHT)<1e-7);
  }
  const normal=paths[0].geometry.getAttribute('normal');for(let i=0;i<normal.count;i++)assert.ok(normal.getY(i)>.999);
  paths.forEach(path=>path.geometry.dispose());
});

test('street loops retain open courtyards and rounded ends stay inside reserved widths',()=>{
  const loop=[{width:.6,points:[{x:-3,z:-3},{x:3,z:-3},{x:3,z:3},{x:-3,z:3},{x:-3,z:-3}]}];
  const result=streetFootprint({},loop,{x:0,z:0});assert.equal(result.length,1);assert.equal(result[0].holes.length,1);
  const straight=streetFootprint({},[{width:.6,points:[{x:0,z:0},{x:4,z:0}]}],{x:0,z:0})[0];
  for(const [x,z]of straight.outer){
    const closest=Math.max(0,Math.min(4,x));assert.ok(Math.hypot(x-closest,z)<=.30002);
  }
});

test('joined globe paths keep physical width and sit flush on the same spherical ground',()=>{
  const radius=1600,world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  const anchor=surfaceChartCoordinates(world,179.9,76);world.cities=[{id:'town',...anchor}];
  const a=surfaceOffset(world,anchor.x,anchor.z,-5,0),b=surfaceOffset(world,anchor.x,anchor.z,5,0);
  world.cityStreets=[{cityId:'town',width:.6,points:[a,b]}];
  const outline=streetFootprint(world,world.cityStreets,anchor)[0];
  assert.ok(Math.abs(Math.max(...outline.outer.map(p=>p[1]))-.3)<.0001);
  const parent=new THREE.Group(),surfaceRoot=new THREE.Group(),[path]=buildCityStreets(parent,world,{surfaceRoot});
  assert.equal(path.parent,surfaceRoot);const positions=path.geometry.getAttribute('position');
  for(let i=0;i<positions.count;i++)assert.ok(Math.abs(Math.hypot(positions.getX(i),positions.getY(i)+radius,positions.getZ(i))-radius-STREET_HEIGHT)<.0002);
  assert.ok(Math.abs(surfaceDistance(world,a,b)-10)<1e-6);path.geometry.dispose();
});
