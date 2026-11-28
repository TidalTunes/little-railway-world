import test from 'node:test';
import assert from 'node:assert/strict';
import {Ray,Vector3,Matrix4} from 'three';
import {pickWorldGround} from '../src/world-picking.js';
import {surfaceChartCoordinates,surfacePoint,surfaceNormal,surfaceFrame,surfaceDistance} from '../src/world-surface.js';

const world={surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
function aimedRay(chart,height=0){
  const target=surfacePoint(world,chart.x,height,chart.z),up=surfaceNormal(world,chart.x,chart.z),east=new Vector3(1,0,0).transformDirection(surfaceFrame(world,chart.x,chart.z,new Matrix4()));
  const origin=target.clone().addScaledVector(up,18).addScaledVector(east,12);
  return{target,ray:new Ray(origin,target.clone().sub(origin).normalize())};
}

test('globe picking recovers physical chart positions at high latitude and either longitude seam',()=>{
  for(const [longitude,latitude]of [[0,0],[179.99,78],[-179.99,-72],[93,85]]){
    const chart=surfaceChartCoordinates(world,longitude,latitude),{ray,target}=aimedRay(chart),before=ray.clone();
    const picked=pickWorldGround(world,ray,{surfaceAt:()=>({height:0})});assert.ok(picked);
    assert.ok(surfaceDistance(world,chart,picked)<1e-7);assert.ok(surfacePoint(world,picked.x,picked.y,picked.z).distanceTo(target)<1e-7);
    assert.ok(ray.origin.equals(before.origin)&&ray.direction.equals(before.direction),'picking leaves the caller’s ray intact');
  }
});

test('angled globe picks converge on terrain elevation while map picks remain at sea level',()=>{
  const chart=surfaceChartCoordinates(world,143,74),{ray,target}=aimedRay(chart,2.3);let samples=0;
  const hit=pickWorldGround(world,ray,{surfaceAt:()=>{samples++;return{height:2.3};}});assert.ok(hit);assert.ok(samples>=2&&samples<=8);
  assert.ok(surfacePoint(world,hit.x,hit.y,hit.z).distanceTo(target)<1e-7);
  const flat=pickWorldGround(world,ray,{flat:true,surfaceAt:()=>{throw new Error('map picking must not sample terrain');}});
  assert.ok(flat);assert.equal(flat.y,0);assert.ok(surfaceDistance(world,flat,chart)>1,'the same angled ray hits the lower map sphere farther away');
});

test('globe ray misses return null without sampling terrain or picking the far side',()=>{
  const chart=surfaceChartCoordinates(world,-170,80),point=surfacePoint(world,chart.x,0,chart.z),up=surfaceNormal(world,chart.x,chart.z),east=new Vector3(1,0,0).transformDirection(surfaceFrame(world,chart.x,chart.z));
  const origin=point.clone().addScaledVector(up,10),surfaceAt=()=>{throw new Error('a ray miss must not sample terrain');};
  assert.equal(pickWorldGround(world,new Ray(origin,up),{surfaceAt}),null);
  assert.equal(pickWorldGround(world,new Ray(origin,east),{surfaceAt}),null);
  assert.equal(pickWorldGround(world,aimedRay(chart).ray,{surfaceAt:()=>({height:NaN})}),null);
});

test('flat-world picking handles elevated ground, parallel rays and rays pointing away',()=>{
  const ray=new Ray(new Vector3(7,8,9),new Vector3(0,-1,0));
  assert.deepEqual(pickWorldGround({},ray,{surfaceAt:()=>({height:1.5})}),{x:7,y:1.5,z:9});
  assert.equal(pickWorldGround({},new Ray(ray.origin,new Vector3(1,0,0))),null);
  assert.equal(pickWorldGround({},new Ray(ray.origin,new Vector3(0,1,0))),null);
});
