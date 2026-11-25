import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {terrainColor,colorTerrainGeometry} from '../src/terrain-colors.js';
import {consolidate} from '../src/geometry.js';
import {bakeMaterialColors} from '../src/color-batches.js';
import {M} from '../src/palette.js';

const world={bounds:{width:200,depth:100},biomes:{sites:[
  {type:'forest',x:-30,z:0},{type:'desert',x:30,z:0},
]}};

test('biome color transitions are continuous and independent of regional compilation',()=>{
  let largest=0;
  for(let x=-20;x<20;x+=.1){
    const a=terrainColor(world,x,0),b=terrainColor(world,x+.1,0);
    largest=Math.max(largest,Math.hypot(a.r-b.r,a.g-b.g,a.b-b.b));
    const regional={terrainSource:world,bounds:{minX:0,maxX:192,minZ:0,maxZ:192}};
    assert.deepEqual(terrainColor(regional,x,0),a);
    assert.deepEqual(terrainColor(structuredClone(world),x,0),a);
  }
  assert.ok(largest<.03,`no hard color step: ${largest}`);
  assert.ok(terrainColor(world,-30,0).g<terrainColor(world,30,0).g,'biomes retain distinct colors');
});

test('terrain tessellation preserves shore and hole areas while bounding color interpolation spans',()=>{
  const shape=new THREE.Shape([new THREE.Vector2(0,0),new THREE.Vector2(60,0),new THREE.Vector2(60,40),new THREE.Vector2(0,40)]);
  shape.holes.push(new THREE.Path([new THREE.Vector2(10,10),new THREE.Vector2(10,20),new THREE.Vector2(20,20),new THREE.Vector2(20,10)]));
  const input=new THREE.ShapeGeometry(shape);input.rotateX(-Math.PI/2);
  const geometry=colorTerrainGeometry(input,world,{maxEdge:8}),p=geometry.attributes.position;
  let area=0;
  for(let i=0;i<p.count;i+=3){
    const points=[0,1,2].map(k=>[p.getX(i+k),p.getZ(i+k)]);
    const [a,b,c]=points;area+=Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]))/2;
    for(let j=0;j<3;j++)assert.ok(Math.hypot(points[j][0]-points[(j+1)%3][0],points[j][1]-points[(j+1)%3][1])<=8.00001);
  }
  assert.ok(Math.abs(area-2300)<.001);assert.equal(geometry.attributes.color.count,p.count);
  const before=Array.from(geometry.attributes.color.array),root=new THREE.Group();root.add(new THREE.Mesh(geometry,M.terrainVertex));
  bakeMaterialColors(consolidate(root));
  assert.deepEqual(Array.from(root.children[0].geometry.attributes.color.array),before,'material batching preserves painted terrain exactly');
  input.dispose();root.children[0].geometry.dispose();root.userData.ownedMaterials.forEach(m=>m.dispose());
});
