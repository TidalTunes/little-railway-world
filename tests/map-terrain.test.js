import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import polygons from '../src/polygon-ops.js';
import {generateWorld} from '../src/world-model.js';
import {prepareMapTerrain} from '../src/map-terrain.js';
import {compileMapTerrainGeometry} from '../src/map-terrain-geometry.js';
import {buildMapWorld} from '../src/map-world.js';

const staticGeometry=map=>map.root.getObjectByName('map-static').children.map(mesh=>({
  name:mesh.name,positions:Array.from(mesh.geometry.attributes.position.array),
  routeOffset:mesh.geometry.attributes.routeOffset?Array.from(mesh.geometry.attributes.routeOffset.array):null,
}));

test('prepared map terrain is clone-safe and does not alter source geography',()=>{
  const world=generateWorld({density:0},{detail:'network'}),before=structuredClone(world);
  const prepared=prepareMapTerrain(world);
  assert.deepEqual(world,before);
  assert.deepEqual(structuredClone(prepared),prepared);
  for(const key of ['land','shores','river','ocean'])assert.ok(prepared[key].length,`${key} survives preparation`);
  assert.ok(prepared.biomes.length>0&&prepared.mountains.length>0);
  assert.equal(prepared.biomes.some(biome=>biome.type==='ocean'),false);
  const nonland=[...prepared.biomes.map(b=>b.polygons),...prepared.mountains.flatMap(m=>[m.low,m.high,m.snow])];
  for(const shapes of nonland){
    const outside=polygons.difference(shapes,prepared.land);
    const area=outside.reduce((sum,rings)=>sum+rings.reduce((total,ring)=>total+Math.abs(ring.reduce((n,p,i)=>{
      const q=ring[(i+1)%ring.length];return n+p[0]*q[1]-p[1]*q[0];
    },0))/2,0),0);
    assert.ok(area<1e-9,'biomes and every mountain contour are already clipped to exposed land');
  }
});

test('worker-triangulated map buffers survive transfer and preserve the complete static drawing',()=>{
  const world=generateWorld({density:0},{detail:'network'}),baseline=buildMapWorld(new THREE.Group(),world);
  const meshes=compileMapTerrainGeometry(prepareMapTerrain(world));
  const buffers=meshes.map(mesh=>mesh.position.buffer);
  const packet=structuredClone({meshes},{transfer:buffers});
  assert.ok(buffers.every(buffer=>buffer.byteLength===0),'worker buffers are transferred instead of copied');
  const map=buildMapWorld(new THREE.Group(),{...world,mapTerrain:packet});
  try{assert.deepEqual(staticGeometry(map),staticGeometry(baseline));}
  finally{baseline.dispose();map.dispose();}
});

test('a cloned prepared map draws identical geometry without any main-thread polygon Boolean operation',()=>{
  const world=generateWorld({density:0},{detail:'network'});
  const baseline=buildMapWorld(new THREE.Group(),world),expected=staticGeometry(baseline);
  const prepared=structuredClone(prepareMapTerrain(world)),original={...polygons};
  let map;
  try{
    for(const name of Object.keys(polygons))polygons[name]=()=>{throw new Error(`Unexpected main-thread ${name}`);};
    map=buildMapWorld(new THREE.Group(),{...world,mapTerrain:prepared});
    assert.deepEqual(staticGeometry(map),expected,'worker preparation preserves every static vertex and route offset');
  }finally{
    Object.assign(polygons,original);baseline.dispose();map?.dispose();
  }
});
