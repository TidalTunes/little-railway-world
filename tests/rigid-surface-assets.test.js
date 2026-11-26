import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {house,station,person,farmPatch} from '../src/assets.js';
import {extractRigidSurfaceAssets} from '../src/rigid-surface-assets.js';
import {compileDetailPacket} from '../src/detail-compiler.js';
import {buildWorld} from '../src/world.js';
import {surfaceChartCoordinates,surfacePoint,surfaceNormal,surfaceTangent,surfaceOffset,rigidSurfacePoseMatrix} from '../src/world-surface.js';

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

test('nested passengers move with their station and farm parcels keep one estate root',()=>{
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
  const bounds=localBounds(farm,rigidSurfacePoseMatrix(world,p.x+30,0,p.z,.4).invert());
  assert.ok(Math.abs(bounds.min.x+6)<.001&&Math.abs(bounds.max.x-6)<.001);
  assert.ok(Math.abs(bounds.min.z+5)<.001&&Math.abs(bounds.max.z-5)<.001);
  assert.ok(bounds.min.y<.05,'ground bends below the original estate tangent plane');
});

test('large farm ground follows the sphere while trees and farm buildings remain rigid and grounded',()=>{
  for(const latitude of [0,72])for(const yaw of [0,.7])for(const scale of [.7,1.4]){
    const p=surfaceChartCoordinates(world,35,latitude),chart=new THREE.Group(),physical=new THREE.Group(),elevation=.2;
    const farm=farmPatch(chart,{x:p.x,y:elevation,z:p.z,rotation:yaw,scale,width:30,depth:24,parcels:[
      {x:-8,z:0,width:14,depth:24,crop:'wheat',feature:'barn',featurePosition:[-4,8],rowsAngle:.3,hedgeEdges:[0,1,2]},
      {x:7,z:0,width:16,depth:24,crop:'orchard',rowsAngle:.3,hedgeEdges:[2,3]},
    ]});
    chart.updateMatrixWorld(true);
    const inverse=farm.matrixWorld.clone().invert(),grounds=new Map(),anchors=[];
    farm.traverse(node=>{
      if(node.userData.surfaceAnchor)anchors.push(node);
      if(node.isMesh&&node.userData.surfaceGround){
        const matrix=inverse.clone().multiply(node.matrixWorld),positions=node.geometry.attributes.position,heights=[];
        for(let i=0;i<positions.count;i++)heights.push(point.fromBufferAttribute(positions,i).applyMatrix4(matrix).y);
        grounds.set(node,{low:elevation+Math.min(...heights)*scale,high:elevation+Math.max(...heights)*scale,material:node.material});
      }
    });
    extractRigidSurfaceAssets(chart,physical,world);physical.updateMatrixWorld(true);
    assert.ok(grounds.size>8&&anchors.length>8,'exercise crops, hedges, an offset barn, and orchard trees');
    const radial=point=>Math.hypot(point.x,point.y+world.surface.radius,point.z)-world.surface.radius;
    let triangles=0;
    for(const [mesh,{low,high,material}]of grounds){
      assert.equal(mesh.material,material,'draping adds no material batches');
      const positions=mesh.geometry.attributes.position;triangles+=positions.count/3;
      for(let i=0;i<positions.count;i++){
        const height=radial(point.fromBufferAttribute(positions,i).applyMatrix4(mesh.matrixWorld));
        assert.ok(height>=low-.00001&&height<=high+.00001,'vertices retain their authored radial height');
      }
      if(high-low<1e-6){
        const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
        for(let i=0;i<positions.count;i+=3){
          a.fromBufferAttribute(positions,i).applyMatrix4(mesh.matrixWorld);
          b.fromBufferAttribute(positions,i+1).applyMatrix4(mesh.matrixWorld);
          c.fromBufferAttribute(positions,i+2).applyMatrix4(mesh.matrixWorld);
          const height=radial(a.add(b).add(c).multiplyScalar(1/3));
          assert.ok(height>=low-.004,'the painted surface also follows the sphere between vertices');
        }
      }
    }
    assert.ok(triangles<1600,'one-time draping retains a bounded estate geometry budget');
    for(const anchor of anchors){
      const origin=new THREE.Vector3().setFromMatrixPosition(anchor.matrixWorld);
      assert.ok(Math.abs(radial(origin)-elevation)<1e-8,'each complete detail is grounded at its own position');
      const axes=[0,4,8].map(offset=>new THREE.Vector3().fromArray(anchor.matrixWorld.elements,offset));
      for(const axis of axes)assert.ok(Math.abs(axis.length()-scale)<1e-10,'rigid detail dimensions stay unchanged');
      for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)assert.ok(Math.abs(axes[i].dot(axes[j]))<1e-10,'details never bend or shear');
      const normal=origin.clone().add(new THREE.Vector3(0,world.surface.radius,0)).normalize();
      assert.ok(axes[1].normalize().distanceTo(normal)<1e-10,'each detail stands along its own radial normal');
    }
  }
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

test('worker packets retain draped farmland elevation and painted vertex colors',()=>{
  const p=surfaceChartCoordinates(world,15,72),bounds={minX:p.x-20,maxX:p.x+20,minZ:p.z-20,maxZ:p.z+20};
  const network={...world,outline:[[0,100],[4,100],[4,104],[0,104]],cities:[],players:[],lines:[],mountains:[],stations:[],placements:[]};
  const packet=compileDetailPacket({bounds,placements:[{kind:'farm',x:p.x,z:p.z,width:30,depth:24,rotation:.4,
    parcels:[{x:0,z:0,width:30,depth:24,crop:'wheat',rowsAngle:.3,tone:.35}]}]},network);
  assert.ok(packet.meshes.length>0);
  for(const mesh of packet.meshes){
    assert.ok(mesh.color&&mesh.material.vertexColors,'painted crop colors survive batching');
    for(let i=0;i<mesh.position.length;i+=3){
      const elevation=Math.hypot(mesh.position[i],mesh.position[i+1]+world.surface.radius,mesh.position[i+2])-world.surface.radius;
      assert.ok(Math.min(Math.abs(elevation-.055),Math.abs(elevation-.064))<.0004,'packet positions sit on the intended shell');
    }
  }
});


test('city street cross sections retain physical width at high latitude',()=>{
  const p=surfaceChartCoordinates(world,20,72),chart=new THREE.Group(),physical=new THREE.Group();
  // Probe actual filled width instead of depending on a ribbon's vertex order:
  // the joined street is now an indexed polygon with round caps and junctions.
  for(const heading of [0,.72,Math.PI/2]){
    const along={x:Math.cos(heading),z:Math.sin(heading)},across={x:-along.z,z:along.x};
    const a=surfaceOffset(world,p.x,p.z,-4*along.x,-4*along.z),b=surfaceOffset(world,p.x,p.z,4*along.x,4*along.z);
    const network={...world,cities:[],players:[],lines:[],mountains:[],stations:[],placements:[],cityStreets:[{width:1.2,points:[a,b]}]};
    const landscape=buildWorld(chart,network,{terrain:false,rigidAssets:physical});
    assert.equal(landscape.children.length,0);assert.equal(physical.children.length,1);
    physical.updateMatrixWorld(true);
    for(const distance of [-.61,-.59,0,.59,.61]){
      const point=surfaceOffset(world,p.x,p.z,across.x*distance,across.z*distance);
      const normal=surfaceNormal(world,point.x,point.z,new THREE.Vector3());
      const origin=surfacePoint(world,point.x,2,point.z,new THREE.Vector3());
      const hits=new THREE.Raycaster(origin,normal.negate()).intersectObject(physical,true);
      assert.equal(hits.length>0,Math.abs(distance)<.6,'road width is independent of latitude and heading');
    }
    physical.children[0].geometry.dispose();physical.clear();landscape.removeFromParent();
  }
});
