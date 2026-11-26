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
  colors:mesh.geometry.attributes.color?Array.from(mesh.geometry.attributes.color.array):null,
  routeOffset:mesh.geometry.attributes.routeOffset?Array.from(mesh.geometry.attributes.routeOffset.array):null,
}));

test('prepared map terrain is clone-safe and does not alter source geography',()=>{
  const world=generateWorld({density:0},{detail:'network'}),before=structuredClone(world);
  const prepared=prepareMapTerrain(world);
  assert.deepEqual(world,before);
  assert.deepEqual(structuredClone(prepared),prepared);
  for(const key of ['land','shores','river','ocean'])assert.ok(prepared[key].length,`${key} survives preparation`);
  assert.ok(prepared.colorField.sites.length>0&&prepared.mountains.length>0);
  const nonland=prepared.mountains.flatMap(m=>[m.low,m.high,m.snow]);
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
  const buffers=meshes.flatMap(mesh=>[mesh.position.buffer,...(mesh.vertexColor?[mesh.vertexColor.buffer]:[])]);
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

const rectangle=(x0,z0,x1,z1)=>[[[x0,z0],[x1,z0],[x1,z1],[x0,z1],[x0,z0]]];
const polygonArea=multi=>multi.reduce((sum,rings)=>sum+rings.reduce((total,ring,index)=>total+(index?-1:1)*Math.abs(ring.reduce((n,p,i)=>{
  const q=ring[(i+1)%ring.length];return n+p[0]*q[1]-p[1]*q[0];
},0))/2,0),0);
const sameCoverage=(a,b,message)=>assert.ok(polygonArea(polygons.xor(a,b))<1e-8,message);

function globeTerrainFixture(){
  const outline=rectangle(-60,-60,60,60)[0],coast=[rectangle(-42,-42,42,42)],lake=[rectangle(10,10,18,18)];
  const lakeBank=polygons.difference([rectangle(9,9,19,19)],lake),water=polygons.union([rectangle(-2,-60,2,60)],lake);
  const banks=polygons.union(polygons.difference([rectangle(-3,-60,3,60)],water),lakeBank);
  const land=polygons.difference([rectangle(-40,-40,40,40)],[rectangle(9,9,19,19)]);
  const contours={low:polygons.intersection([rectangle(-20,-20,20,20)],land),
    high:polygons.intersection([rectangle(-12,-12,12,12)],land),snow:[rectangle(-5,-5,5,5)]};
  return{outline,bounds:{width:120,depth:120},surface:{type:'sphere',complete:true,radius:1600},
    biomes:{land,ocean:polygons.difference([[outline]],coast),oceanShore:polygons.difference(coast,[rectangle(-40,-40,40,40)]),sites:[]},
    hydrology:{water,banks},mountains:[{id:'river-range',mapContours:contours}]};
}

test('complete-globe layered terrain preserves visible coast, lake shores and mountain river valleys',()=>{
  const world=globeTerrainFixture(),before=structuredClone(world),prepared=prepareMapTerrain(world);
  const legacy=prepareMapTerrain({...world,surface:{...world.surface,complete:false}});
  assert.deepEqual(world,before);assert.deepEqual(structuredClone(prepared),prepared);
  assert.equal(prepared.land,world.biomes.land,'already prepared dry coastal ground is reused');
  sameCoverage(polygons.union(prepared.shores),legacy.shores,'overlapping same-color sand keeps the same visible footprint');
  sameCoverage(polygons.difference(prepared.land,prepared.shores,prepared.river),legacy.land,'opaque shore and water layers preserve exposed ground');
  for(const level of ['low','high','snow'])sameCoverage(prepared.mountains[0][level],legacy.mountains[0][level],`${level} retains mountain river cuts`);
  assert.equal(polygonArea(polygons.intersection(prepared.shores,prepared.ocean)),0,'river-mouth sand never projects into the ocean');
});

test('complete-globe preparation avoids worldwide contour intersections and shoreline unions',()=>{
  const world=globeTerrainFixture(),original={...polygons};let prepared;
  try{
    polygons.intersection=()=>{throw new Error('Unexpected globe-wide contour intersection');};
    polygons.union=()=>{throw new Error('Unexpected global shoreline union');};
    prepared=prepareMapTerrain(world);
  }finally{Object.assign(polygons,original);}
  assert.ok(prepared.mountains[0].low.length>1,'the local river cut still separates mountain contours');
  assert.deepEqual(prepared.river,world.hydrology.water);
});
