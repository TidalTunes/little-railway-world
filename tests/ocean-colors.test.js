import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {oceanColor,shoreColor,coastDistance,coastExposure} from '../src/ocean-colors.js';
import {terrainColor} from '../src/terrain-colors.js';
import {createSurfaceShell} from '../src/surface-shell.js';

const radius=1600,half=radius*Math.PI;
const ring=(x0,z0,x1,z1)=>[[x0,z0],[x1,z0],[x1,z1],[x0,z1],[x0,z0]];
function globe(){
  return {surface:{type:'sphere',complete:true,radius,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},
    bounds:{width:half*2,depth:half},biomes:{ocean:[[ring(-half,-half/2,half,half/2),ring(-10,-10,10,10)]],
      shoreWidth:.9,sites:[{type:'forest',x:0,z:0}]}};
}
const closeColor=(a,b,epsilon=1e-10)=>assert.ok(a.toArray().every((value,i)=>Math.abs(value-b.toArray()[i])<epsilon),
  `${a.toArray()} and ${b.toArray()} describe the same surface color`);

test('ocean colors are identical across the date line and at every longitude of a pole',()=>{
  const world=globe();
  for(const z of [-1000,-1,0,600,2200])closeColor(oceanColor(world,-half,z),oceanColor(world,half,z));
  for(const z of [-half/2,half/2])for(const longitude of [-170,-45,0,135,180])
    closeColor(oceanColor(world,longitude/180*half,z),oceanColor(world,0,z));
});

test('identified chart edges never produce a false continental shelf',()=>{
  const world=globe(),unbroken={...world,biomes:{...world.biomes,ocean:[]}};
  for(const z of [-2000,-300,0,1800]){
    assert.equal(coastDistance(world,half,z,80),80,'chart cut is not a coast');
    closeColor(oceanColor(world,half,z),oceanColor(unbroken,half,z));
  }
});

test('continental shelves brighten water locally and keep chunk sampling deterministic',()=>{
  const world=globe(),unbroken={...world,biomes:{...world.biomes,ocean:[]}};
  const shallow=oceanColor(world,12,0),deep=oceanColor(unbroken,12,0);
  assert.ok(shallow.g>deep.g+.05&&shallow.b>deep.b,'nearby coast contributes visible turquoise shallows');
  closeColor(oceanColor(world,500,0),oceanColor(unbroken,500,0));
  for(const [x,z]of [[12,0],[500,200],[-half,600]])closeColor(oceanColor(world,x,z),oceanColor({terrainSource:world},x,z));
});

test('wet coasts meet the inland biome exactly without a uniformly pale outline',()=>{
  const world=globe(),inland=shoreColor(world,9.1,0,{map:true}),ground=terrainColor(world,9.1,0,{map:true});
  closeColor(inland,ground);
  const coast=shoreColor(world,10,0,{map:true}),middle=shoreColor(world,9.55,0,{map:true});
  assert.ok(coast.toArray().some((value,i)=>Math.abs(value-inland.toArray()[i])>.01));
  for(let i=0;i<3;i++)assert.ok(middle.toArray()[i]>=Math.min(coast.toArray()[i],inland.toArray()[i])-.002
    &&middle.toArray()[i]<=Math.max(coast.toArray()[i],inland.toArray()[i])+.002,'shore colors vary smoothly from wet sand to ground');
});

test('coastal character forms continuous districts, including globe seams and polar shores',()=>{
  const world={...globe(),seed:'coastal-districts'},samples=[];
  for(let x=-300;x<=300;x+=2)samples.push(coastExposure(world,x,0));
  assert.ok(Math.max(...samples)-Math.min(...samples)>.25,'headlands and quiet shore stretches have visibly different surf');
  for(let i=1;i<samples.length;i++)assert.ok(Math.abs(samples[i]-samples[i-1])<.15,'character changes smoothly along the coast');
  for(const z of [-1600,0,1800])assert.ok(Math.abs(coastExposure(world,-half,z)-coastExposure(world,half,z))<1e-10);
  assert.equal(coastExposure(world,half,half/2),coastExposure(world,0,half/2),'the pole has only one coastal character');
  const z=-radius*80*Math.PI/180,polar={...world,biomes:{...world.biomes,
    ocean:[[ring(-half,-half/2,half,half/2),ring(-10,z-10,10,z+10)]]}};
  const ice=shoreColor(polar,10,z),beach=shoreColor(world,10,0);
  assert.ok(ice.b>beach.b+.1&&ice.r>beach.r,'polar margins read as blue-white ice, not warm sand');
});

test('both ocean representations share opaque closed shells and identical color samples',()=>{
  const shell=createSurfaceShell(globe()),map=shell.map.children[0],detail=shell.detail.children[0];
  try{
    assert.equal(map.geometry.attributes.color.array,detail.geometry.attributes.color.array,'one immutable ocean color buffer is shared');
    for(const mesh of [map,detail]){
      assert.equal(mesh.material.transparent,false);assert.equal(mesh.material.opacity,1);
      assert.equal(mesh.material.depthWrite,true);assert.equal(mesh.material.side,THREE.FrontSide);
      assert.equal(mesh.material.vertexColors,true);
      assert.ok(mesh.geometry.attributes.color.array.every(value=>Number.isFinite(value)&&value>=0&&value<=1));
    }
  }finally{shell.dispose();}
});

test('the atmosphere is a single bounded map-only rim with shared night shading and owned disposal',()=>{
  const shell=createSurfaceShell(globe()),rim=shell.map.children.find(mesh=>mesh.name==='earth-atmosphere');
  assert.ok(rim);
  assert.equal(shell.detail.children.some(mesh=>mesh.name==='earth-atmosphere'),false);
  assert.equal(rim.material.side,THREE.BackSide);
  assert.equal(rim.material.depthWrite,false);
  assert.ok(rim.geometry.index.count/3<17000);
  const shaders={vertexShader:rim.material.vertexShader,fragmentShader:rim.material.fragmentShader};
  assert.ok(shaders.fragmentShader.includes('worldNight'));
  let disposed=0;rim.geometry.addEventListener('dispose',()=>disposed++);rim.material.addEventListener('dispose',()=>disposed++);
  shell.dispose();shell.dispose();assert.equal(disposed,2);
});
