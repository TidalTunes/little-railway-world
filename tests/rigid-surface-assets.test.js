import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {house,station,person,farmPatch} from '../src/assets.js';
import {extractRigidSurfaceAssets} from '../src/rigid-surface-assets.js';
import {compileDetailPacket} from '../src/detail-compiler.js';
import {buildWorld} from '../src/world.js';
import {surfaceChartCoordinates,surfacePoint,surfaceNormal,surfaceTangent,rigidSurfacePoseMatrix} from '../src/world-surface.js';

const world={surface:{type:'sphere',radius:1600,origin:{longitude:0,latitude:0},complete:true,
  projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
const point=new THREE.Vector3();
function localBounds(object,frame=new THREE.Matrix4()){
  const bounds=new THREE.Box3();object.updateWorldMatrix(true,true);
  object.traverse(node=>{
    if(!node.isMesh)return;
    const matrix=frame.clone().multiply(node.matrixWorld),position=node.geometry.attributes.position;
    for(let i=0;i<position.count;i++)bounds.expandByPoint(point.fromBufferAttribute(position,i).applyMatrix4(matrix));
  });
  return bounds;
}
function closeBounds(a,b,tolerance=1e-8){
  assert.ok(a.min.distanceTo(b.min)<tolerance,`minimum ${a.min.toArray()} vs ${b.min.toArray()}`);
  assert.ok(a.max.distanceTo(b.max)<tolerance,`maximum ${a.max.toArray()} vs ${b.max.toArray()}`);
}

test('rigid scenery keeps dimensions and right angles across latitude and heading',()=>{
  for(const latitude of [-72,0,51.5,72])for(const yaw of [0,Math.PI/4,Math.PI/2]){
    const p=surfaceChartCoordinates(world,35,latitude),chart=new THREE.Group(),physical=new THREE.Group();
    const asset=house(chart,{x:p.x,y:.2,z:p.z,rotation:yaw,scale:1.1});
    const reference=house(new THREE.Group(),{scale:1.1});
    extractRigidSurfaceAssets(chart,physical,world);
    assert.equal(chart.children.length,0);assert.equal(physical.children.length,1);
    const matrix=asset.matrix,axes=[0,4,8].map(offset=>new THREE.Vector3().fromArray(matrix.elements,offset));
    for(const axis of axes)assert.ok(Math.abs(axis.length()-1.1)<1e-12);
    for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)assert.ok(Math.abs(axes[i].dot(axes[j]))<1e-12);
    assert.ok(new THREE.Vector3().setFromMatrixPosition(matrix).distanceTo(surfacePoint(world,p.x,.2,p.z))<1e-9);
    assert.ok(axes[1].normalize().distanceTo(surfaceNormal(world,p.x,p.z))<1e-12);
    assert.ok(axes[2].normalize().distanceTo(surfaceTangent(world,p.x,.2,p.z,Math.sin(yaw),0,Math.cos(yaw)).normalize())<1e-12);
    closeBounds(localBounds(physical,rigidSurfacePoseMatrix(world,p.x,.2,p.z,yaw).invert()),localBounds(reference));
  }
});

test('nested passengers move with their station and farm parcels keep one physical frame',()=>{
  const p=surfaceChartCoordinates(world,-12,68),chart=new THREE.Group(),physical=new THREE.Group();
  const building=station(chart,{x:p.x,z:p.z,rotation:.7});
  const passenger=person(building,{x:2,y:.21,z:.83,rotation:Math.PI});
  const farm=farmPatch(chart,{x:p.x+30,z:p.z,rotation:.4,width:12,depth:10,parcels:[
    {x:-3,z:0,width:6,depth:10,feature:'barn',crop:'pasture'},
    {x:3,z:0,width:6,depth:10,crop:'orchard'},
  ]});
  extractRigidSurfaceAssets(chart,physical,world);
  assert.equal(physical.children.length,2,'nested passengers are not independently projected');
  assert.equal(passenger.parent,building);assert.equal(passenger.matrixAutoUpdate,true);
  const reference=farmPatch(new THREE.Group(),{width:12,depth:10,parcels:[
    {x:-3,z:0,width:6,depth:10,feature:'barn',crop:'pasture'},
    {x:3,z:0,width:6,depth:10,crop:'orchard'},
  ]});
  closeBounds(localBounds(farm,rigidSurfacePoseMatrix(world,p.x+30,0,p.z,.4).invert()),localBounds(reference));
});

test('already-spherical meshes pass through extraction unchanged',()=>{
  const chart=new THREE.Group(),physical=new THREE.Group(),mesh=new THREE.Mesh(new THREE.BoxGeometry(1,2,3));
  mesh.position.set(20,-100,30);mesh.rotation.y=.4;mesh.userData.surfaceSpace=true;chart.add(mesh);chart.updateMatrixWorld(true);
  const before=mesh.matrixWorld.clone();extractRigidSurfaceAssets(chart,physical,world);physical.updateMatrixWorld(true);
  assert.deepEqual(mesh.matrixWorld.elements,before.elements);mesh.geometry.dispose();mesh.material.dispose();
});

test('detail packet merges rigid houses only after the geographic warp',()=>{
  for(const latitude of [0,51.5,72])for(const rotation of [0,Math.PI/4]){
    const p=surfaceChartCoordinates(world,15,latitude),bounds={minX:p.x-8,maxX:p.x+8,minZ:p.z-8,maxZ:p.z+8};
    // The outline is outside this artificial cell, leaving only the one house
    // in the packet so its dimensions can be measured independently of land.
    const network={...world,outline:[[0,100],[4,100],[4,104],[0,104]],cities:[],players:[],lines:[],mountains:[],stations:[],placements:[]};
    const placement={kind:'house',x:p.x,z:p.z,y:0,rotation,variant:0,scale:1};
    const packet=compileDetailPacket({bounds,placements:[placement]},network);
    const inverse=rigidSurfacePoseMatrix(world,p.x,0,p.z,rotation).invert(),actual=new THREE.Box3();
    let vertices=0;
    for(const mesh of packet.meshes){
      assert.ok(mesh.bvh);vertices+=mesh.position.length/3;
      for(let i=0;i<mesh.position.length;i+=3)actual.expandByPoint(point.fromArray(mesh.position,i).applyMatrix4(inverse));
    }
    assert.ok(vertices>100);
    closeBounds(actual,localBounds(house(new THREE.Group())),.0003);
    for(const mesh of packet.meshes)assert.ok([...mesh.position,...mesh.normal].every(Number.isFinite));
  }
});


test('city street cross sections retain physical width at high latitude',()=>{
  const p=surfaceChartCoordinates(world,20,72),chart=new THREE.Group(),physical=new THREE.Group();
  const network={...world,cities:[],players:[],lines:[],mountains:[],stations:[],placements:[],cityStreets:[
    {width:1.2,points:[{x:p.x,z:p.z},{x:p.x+4,z:p.z+4},{x:p.x+8,z:p.z+5}]},
  ]};
  const landscape=buildWorld(chart,network,{terrain:false,rigidAssets:physical});
  assert.equal(landscape.children.length,0);assert.equal(physical.children.length,1);
  const positions=physical.children[0].geometry.attributes.position,a=new THREE.Vector3(),b=new THREE.Vector3();
  for(let i=0;i<positions.count;i+=4){
    a.fromBufferAttribute(positions,i);b.fromBufferAttribute(positions,i+1);
    assert.ok(Math.abs(a.distanceTo(b)-1.2)<.0002,'road width is independent of latitude and heading');
  }
  physical.children[0].geometry.dispose();
});
