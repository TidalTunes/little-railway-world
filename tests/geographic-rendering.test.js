import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import clipping from 'polygon-clipping';
import {generateWorld,generateWorldRegion,worldSurface} from '../src/world-model.js';
import {buildMapWorld} from '../src/map-world.js';
import {compileDetailPacket} from '../src/detail-compiler.js';
import {biomeAt} from '../src/biomes.js';

const geography=JSON.parse(fs.readFileSync(new URL('../data/europe-geography.json',import.meta.url),'utf8'));
const project=(lon,lat)=>({x:(lon-9.75)*geography.projection.unitsPerLongitudeDegree,z:(50.75-lat)*36});
const rectangle=(minX,minZ,maxX,maxZ)=>[[[[minX,minZ],[maxX,minZ],[maxX,maxZ],[minX,maxZ],[minX,minZ]]]];
let realNetwork;
function geographicNetwork(){
  return realNetwork??=generateWorld({seed:'geography-rendering-regression',bounds:geography.bounds,outline:geography.outline,
    density:0,mountains:[],cities:[
      {id:'paris',...project(2.35,48.86),level:1,radius:5},
      {id:'brussels',...project(4.35,50.85),level:1,radius:5},
    ],connections:[{from:'paris',to:'brussels'}],
    rivers:geography.rivers.flatMap(river=>river.paths.map((points,index)=>({
      id:`${river.id}-${index}`,points,width:river.scaleRank<4?1.8:1,smooth:false,
    }))),
    biomes:{sites:geography.biomeSites,geography:{ocean:geography.ocean,oceanShore:geography.oceanShore,
      landInterior:geography.landInterior,lakes:geography.lakes,lakeShore:geography.lakeShore}},
  },{detail:'network'});
}

function checkPacket(packet){
  assert.ok(packet.meshes.length>0);
  for(const mesh of packet.meshes){
    for(const attribute of ['position','normal','color']){
      assert.ok(mesh[attribute]?.length>0,`${attribute} exists`);
      assert.ok(mesh[attribute].every(Number.isFinite),`${attribute} remains finite`);
    }
    const vertices=mesh.position.length/3;
    assert.equal((mesh.index?.length??vertices)%3,0);
    if(mesh.index)assert.ok(mesh.index.every(index=>index>=0&&index<vertices));
  }
}

test('complete real coast, lakes and river ribbons compile into a finite map',()=>{
  const world=geographicNetwork(),parent=new THREE.Group();
  assert.equal(world.rivers.length,114);
  for(const key of ['water','banks'])for(const polygon of world.hydrology[key])for(const ring of polygon){
    assert.ok(new Set(ring.slice(0,-1).map(point=>point.join(','))).size>=3,'quantized clipping slivers cannot become collapsed rings');
  }
  const map=buildMapWorld(parent,world);
  try{
    assert.ok(map.stats.staticVertices>10000,'the actual detailed geographic boundaries are exercised');
    map.root.traverse(node=>{
      if(!node.geometry)return;
      assert.ok(node.geometry.attributes.position.array.every(Number.isFinite));
    });
  }finally{map.dispose();}
  assert.equal(parent.children.length,0);
});

test('real inland, estuary and archipelago detail tiles compile without polygon or buffer errors',()=>{
  const world=geographicNetwork();
  for(const [name,lon,lat] of [['Paris',2.35,48.86],['London',-.12,51.5],['Stockholm',18.07,59.33],['Istanbul',28.98,41.01]]){
    const region=generateWorldRegion(world,{...project(lon,lat),size:192});
    const packet=compileDetailPacket(region,world);
    assert.ok(packet.meshes.length>0,name);checkPacket(packet);
  }
});

function lakeInput(){
  const extent=rectangle(-100,-100,100,100),ocean=rectangle(-100,-100,-80,100);
  const oceanShore=rectangle(-80,-100,-79.1,100),lakes=rectangle(-5,-5,5,5);
  const lakeMargin=rectangle(-5.9,-5.9,5.9,5.9);
  return {seed:'inland-lake',bounds:{width:200,depth:200},outline:extent[0][0],density:0,mountains:[],rivers:[],
    cities:[{id:'a',x:20,z:20,radius:4,level:1},{id:'b',x:50,z:20,radius:4,level:1}],
    connections:[{from:'a',to:'b'}],biomes:{sites:[{id:'dry',type:'plains',x:20,z:20}],
      geography:{ocean,oceanShore,lakes,lakeShore:clipping.difference(lakeMargin,lakes),
        landInterior:clipping.difference(extent,ocean,oceanShore,lakeMargin)}}};
}

test('inland lake banks retain their sloping surface in a detail tile with no sea geometry',()=>{
  const world=generateWorld(lakeInput(),{detail:'network'}),bounds={minX:-16,minZ:-16,maxX:16,maxZ:16};
  assert.equal(biomeAt(world,5.45,0),'shore');
  assert.equal(worldSurface(world,5.45,0).type,'shore');
  assert.ok(Math.abs(worldSurface(world,5.45,0).height+.6)<1e-6);
  const packet=compileDetailPacket({bounds,cullBounds:bounds,cities:[],lines:[],mountains:[],stations:[],placements:[],cityStreets:[]},world);
  checkPacket(packet);
  const root=new THREE.Group(),material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
  for(const item of packet.meshes){
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(item.position,3));
    if(item.index)geometry.setIndex(new THREE.BufferAttribute(item.index,1));
    root.add(new THREE.Mesh(geometry,material));
  }
  root.updateMatrixWorld(true);
  const ray=new THREE.Raycaster(new THREE.Vector3(5.45,10,0),new THREE.Vector3(0,-1,0));
  const hits=ray.intersectObject(root,true);
  assert.ok(hits.length>0);
  assert.ok(Math.abs(hits[0].point.y+.585)<.002,'bank connects ground to inland water instead of becoming flat ground');
  root.traverse(node=>node.geometry?.dispose());material.dispose();
});

test('geographic lakes remain water when an authored world uses the legacy single-river field',()=>{
  const input=lakeInput();delete input.rivers;
  input.river={points:[[-100,70],[100,70]],width:2,smooth:false};
  const world=generateWorld(input,{detail:'network'});
  assert.ok(world.lakes?.length>0);
  assert.ok(world.hydrology?.water.length>0);
  assert.equal(biomeAt(world,0,0),'ocean');
  const map=buildMapWorld(new THREE.Group(),world);
  assert.ok(map.stats.staticVertices>0);map.dispose();
});
