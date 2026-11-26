import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import geography from '../data/europe-geography.json' with {type:'json'};
import {tessellateSurfaceGeometry,subdivideSurfaceRing} from '../src/surface-tessellation.js';
import {compileMapTerrainGeometry,MAP_SURFACE_HEIGHT_SCALE} from '../src/map-terrain-geometry.js';
import {buildMapWorld} from '../src/map-world.js';
import {compileDetailPacket,detailPacketTransfers} from '../src/detail-compiler.js';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {EARTH_SURFACE_RADIUS,surfacePoint,surfaceNormal,surfaceFrame,surfaceCoordinates} from '../src/world-surface.js';

const surface={type:'sphere',radius:EARTH_SURFACE_RADIUS,origin:{longitude:10,latitude:52},projection:geography.projection};
const rectangle=(x,z,w,d)=>[[[[x,z],[x+w,z],[x+w,z+d],[x,z+d],[x,z]]]];
function emptyTerrain(){return {land:rectangle(600,400,80,80),shores:[],river:[],ocean:[],mountains:[],colorField:{sites:[]}};}
function mapWorld(){
  const terrain=emptyTerrain();terrain.shores=rectangle(620,420,20,20);
  return {surface,bounds:{width:80,depth:80},cities:[{id:'city',x:640,z:440,level:6}],players:[],
    lines:[{id:'route',points:[{x:600,y:.42,z:440},{x:680,y:.42,z:440}],distances:[0,80],length:80,
      alignment:{segments:[]}}],mapTerrain:terrain};
}

function triangles(geometry,fn){
  const a=geometry.attributes.position.array,index=geometry.index?.array;
  for(let i=0;i<(index?.length??a.length/3);i+=3){
    const points=[0,1,2].map(j=>new THREE.Vector3().fromArray(a,3*(index?index[i+j]:i+j)));fn(points);
  }
}

test('curvature subdivision preserves triangle area, winding, attributes and matching shared-edge samples',()=>{
  const base=new THREE.BufferGeometry();
  // Two very different triangles share the same long boundary.
  base.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,64,0,0,0,0,48,64,0,0,0,0,0,19,0,-9],3));
  base.setAttribute('color',new THREE.Float32BufferAttribute([0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,19/64,0,-9/48],3));
  const original=base.attributes.position.array.slice(),geometry=tessellateSurfaceGeometry(base,8);
  assert.deepEqual(base.attributes.position.array,original,'source buffers remain borrowed and unchanged');
  let area=0;const edges=[new Set(),new Set()];
  triangles(geometry,points=>{
    const [a,b,c]=points,twice=b.clone().sub(a).cross(c.clone().sub(a)).y;
    assert.ok(twice<0,'input winding remains exact');area-=twice/2;
    for(let i=0;i<3;i++)assert.ok(points[i].distanceTo(points[(i+1)%3])<=8.000001);
    const side=points.some(p=>p.z>0)?0:1;
    for(const p of points)if(p.z===0)edges[side].add(p.x);
  });
  assert.ok(Math.abs(area-(64*48/2+64*9/2))<1e-8);
  assert.deepEqual([...edges[0]].sort((a,b)=>a-b),[...edges[1]].sort((a,b)=>a-b));
  for(let i=0;i<geometry.attributes.position.count;i++){
    assert.ok(Math.abs(geometry.attributes.color.getX(i)-geometry.attributes.position.getX(i)/64)<1e-6);
    assert.ok(Math.abs(geometry.attributes.color.getZ(i)-geometry.attributes.position.getZ(i)/48)<1e-6);
  }
  base.dispose();geometry.dispose();
});

test('shoreline sampling preserves open and closed rings and stays finer than overview interiors',()=>{
  const ring=[[600,400],[680,400],[680,480],[600,480]];
  for(const input of [ring,[...ring,ring[0]]]){
    const before=structuredClone(input),samples=subdivideSurfaceRing(input,8);
    assert.deepEqual(input,before);
    for(let i=0;i<samples.length;i++)assert.ok(Math.hypot(samples[i][0]-samples[(i+1)%samples.length][0],samples[i][1]-samples[(i+1)%samples.length][1])<=8);
  }
  const world=mapWorld(),mesh=compileMapTerrainGeometry(world.mapTerrain,world).find(mesh=>mesh.color==='terrain');
  const points=[];
  for(let i=0;i<mesh.position.length;i+=3){
    const p=surfaceCoordinates(world,new THREE.Vector3().fromArray(mesh.position,i));
    if(Math.abs(p.x-600)<.0001)points.push(p.z);
  }
  points.sort((a,b)=>a-b);
  assert.ok(Math.abs(points[0]-400)<.0001&&Math.abs(points.at(-1)-480)<.0001);
  for(let i=1;i<points.length;i++)assert.ok(points[i]-points[i-1]<=8.0002,'triangulation retains shoreline samples');
});

test('sphere map terrain follows radial heights and its curvature error stays below layer separation',()=>{
  const world=mapWorld(),meshes=compileMapTerrainGeometry(world.mapTerrain,world),point=new THREE.Vector3();
  const samples={};
  for(const mesh of meshes){
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(mesh.position,3));
    if(mesh.index)geometry.setIndex(new THREE.BufferAttribute(mesh.index,1));
    const height=mesh.color==='terrain'?0:.003*MAP_SURFACE_HEIGHT_SCALE;
    samples[mesh.color]=[];
    triangles(geometry,vertices=>{
      for(const vertex of vertices){
        const chart=surfaceCoordinates(world,vertex);
        assert.ok(Math.abs(chart.elevation-height)<.0001,'every vertex lies on its assigned sphere shell');
      }
      point.copy(vertices[0]).add(vertices[1]).add(vertices[2]).multiplyScalar(1/3);
      const elevation=surfaceCoordinates(world,point).elevation;
      assert.ok(elevation>height-.022,'triangle chords cannot sink through an adjacent map layer');
      samples[mesh.color].push(elevation);
    });
    geometry.dispose();
  }
  assert.ok(Math.min(...samples.sand)>Math.max(...samples.terrain));
  const transferred=structuredClone({meshes},{transfer:meshes.flatMap(mesh=>[mesh.position.buffer,...(mesh.vertexColor?[mesh.vertexColor.buffer]:[]),...(mesh.index?[mesh.index.buffer]:[])])});
  assert.ok(transferred.meshes.every(mesh=>mesh.position.length>0));
});

test('globe map routes, cities and live markers stay registered and tangent while zoom glyph sizes change',()=>{
  const world=mapWorld();delete world.lines[0].alignment;
  const map=buildMapWorld(new THREE.Group(),world),matrix=new THREE.Matrix4(),position=new THREE.Vector3();
  try{
    const route=map.root.getObjectByName('map-ink'),chart={};
    for(let i=0;i<route.geometry.attributes.position.count;i++){
      position.fromBufferAttribute(route.geometry.attributes.position,i);surfaceCoordinates(world,position,chart);
      assert.ok(Math.abs(chart.elevation-.078*MAP_SURFACE_HEIGHT_SCALE)<.0001);
      const offset=new THREE.Vector3().fromBufferAttribute(route.geometry.attributes.routeOffset,i);
      assert.ok(Math.abs(offset.length()-.21)<1e-5,'route casing has a physical width independent of map projection');
      const center=surfaceCoordinates(world,position.clone().sub(offset));
      assert.ok(Math.abs(center.z-440)<.0001,'stroke center keeps its original chart alignment');
    }
    const city=map.root.getObjectByName('map-city-city');
    assert.ok(new THREE.Vector3().setFromMatrixPosition(city.matrix).distanceTo(surfacePoint(world,640,0,440))<1e-9);
    const part=new THREE.Object3D();part.userData.poseOnly=true;part.userData.poseIndex=0;
    const trains=[{state:{color:'redLight',active:true},parts:[part]}];trains.poseBuffer=new Float32Array([640,.42,440,.7,1,0]);
    const camera=new THREE.OrthographicCamera(-500,500,500,-500,.1,10000);
    for(const zoom of [1,5]){
      camera.zoom=zoom;map.update(trains,{camera,viewportHeight:1000});
      const marker=map.root.getObjectByName('map-train-outlines');marker.getMatrixAt(0,matrix);
      assert.ok(new THREE.Vector3().setFromMatrixPosition(matrix).distanceTo(surfacePoint(world,640,.120*MAP_SURFACE_HEIGHT_SCALE,440))<.0001);
      assert.ok(new THREE.Vector3().fromArray(matrix.elements,4).normalize().dot(surfaceNormal(world,640,440))>.999999);
      const expected=new THREE.Vector3(Math.sin(.7),0,Math.cos(.7)).applyMatrix4(surfaceFrame(world,640,440));
      assert.ok(new THREE.Vector3().fromArray(matrix.elements,8).normalize().dot(expected)>.999999);
      assert.ok(new THREE.Vector3().fromArray(city.matrix.elements,4).dot(surfaceNormal(world,640,440))>.999999);
    }
    trains[0].state.active=false;map.update(trains);map.root.getObjectByName('map-train-outlines').getMatrixAt(0,matrix);
    assert.equal(matrix.getMaxScaleOnAxis(),0);
    const terrainMaterial=map.root.getObjectByName('map-terrain').material;
    assert.equal(terrainMaterial.depthTest,true);assert.equal(terrainMaterial.depthWrite,true);
    const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <opaque_fragment>'};
    terrainMaterial.onBeforeCompile(shader);
    assert.equal(shader.uniforms.mapSurfaceRadius.value,surface.radius);assert.match(shader.fragmentShader,/surfaceLight/);
  }finally{map.dispose();}
});

test('worker sphere detail bounds and BVHs describe warped vertices while packet chart bounds remain unchanged',()=>{
  const base=generateWorld({density:0},{detail:'network'}),world={...base,surface};
  const region=generateWorldRegion(world,{x:0,z:0,size:48}),packet=compileDetailPacket(region,world);
  assert.deepEqual(packet.cellBounds,region.bounds);assert.deepEqual(packet.bounds,region.cullBounds);
  assert.ok(packet.renderBounds&&packet.meshes.every(mesh=>mesh.bvh));
  for(const mesh of packet.meshes)for(let i=0;i<mesh.position.length;i+=3)for(let axis=0;axis<3;axis++){
    assert.ok(mesh.position[i+axis]>=packet.renderBounds.min[axis]-1e-6&&mesh.position[i+axis]<=packet.renderBounds.max[axis]+1e-6);
  }
  assert.ok(packet.renderBounds.min[1]<-.5,'terrain and base follow the curved surface');
  const transfer=detailPacketTransfers(packet);assert.equal(transfer.length,new Set(transfer).size);
  const copy=structuredClone(packet,{transfer});assert.ok(copy.meshes.every(mesh=>mesh.position.length));
});
