import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createBiomes, fitsBiome } from '../src/biomes.js';
import { placeFarmland } from '../src/farmland.js';
import { farmPatch,ASSET_BOUNDS } from '../src/assets.js';
import { farmFootprintsOverlap } from '../src/farm-footprints.js';

function plan(seed=27,density=1){
  const world={seed,bounds:{width:100,depth:80},outline:[[-50,-40],[50,-40],[50,40],[-50,40]],
    cities:[],stations:[],mountains:[],lines:[],placements:[]};
  world.biomes=createBiomes(world,{ocean:false,sites:[{id:'fields',type:'farmland',x:0,z:0}]});
  const obstacles=[{x:16,z:14,radius:9},{x:-18,z:-21,radius:4}];
  const valid=item=>fitsBiome(world,'farmland',item.x,item.z,item.radius+.75)
    &&Math.abs(item.z)>item.radius+1.45 // railway corridor
    &&Math.abs(item.x+31)>item.radius+3.5 // river and bank
    &&obstacles.every(other=>Math.hypot(item.x-other.x,item.z-other.z)>=item.radius+other.radius+.32)
    &&world.placements.every(other=>!farmFootprintsOverlap(world,item,other,.32));
  const result=placeFarmland(world,{density,canPlace:valid,add:item=>world.placements.push(item)});
  return{world,result,obstacles};
}

const area=points=>Math.abs(points.reduce((sum,p,index)=>{
  const q=points[(index+1)%points.length];return sum+p[0]*q[1]-q[0]*p[1];
},0))/2;
function separated(a,b){
  for(const polygon of [a,b])for(let index=0;index<polygon.length;index++){
    const p=polygon[index],q=polygon[(index+1)%polygon.length],nx=q[1]-p[1],nz=p[0]-q[0];
    const aa=a.map(p=>p[0]*nx+p[1]*nz),bb=b.map(p=>p[0]*nx+p[1]*nz);
    if(Math.max(...aa)<=Math.min(...bb)+1e-7||Math.max(...bb)<=Math.min(...aa)+1e-7)return true;
  }
  return false;
}
const inConvex=(point,polygon)=>polygon.every((a,index)=>{
  const b=polygon[(index+1)%polygon.length];
  return(b[0]-a[0])*(point.z-a[1])-(b[1]-a[1])*(point.x-a[0])>=-1e-5;
});

test('farmland has deterministic adjoining estates with broad, coherent working parcels',()=>{
  const first=plan(),again=plan(),changed=plan(44);
  assert.deepEqual(again,first,'seed controls both plots and crop patterns');
  assert.notDeepEqual(changed.world.placements,first.world.placements,'different seeds change the coherent layout');
  assert.ok(first.result.area>1500,'a broad farming region receives substantial continuous cultivated acreage');
  const clusters=new Map();
  for(const farm of first.world.placements){
    if(!clusters.has(farm.clusterId))clusters.set(farm.clusterId,[]);
    clusters.get(farm.clusterId).push(farm);
  }
  assert.ok(clusters.size>1&&clusters.size<first.world.placements.length/2,'estates form local groups');
  for(const farms of clusters.values())assert.equal(new Set(farms.map(farm=>farm.rotation)).size,1,'neighbors share a local bearing');
  assert.ok(new Set(first.world.placements.map(p=>p.width.toFixed(2))).size>10,'estate dimensions do not repeat three stamps');
  assert.ok(new Set(first.world.placements.map(p=>p.parcels.length)).size>=3,'small edge plots stay simple while broad estates subdivide');
  assert.deepEqual(new Set([27,44,12,3].flatMap(seed=>plan(seed).world.placements.flatMap(farm=>farm.parcels.map(p=>p.crop)))),new Set(['wheat','pasture','orchard','fallow','vegetables']));
  const fieldAreas=first.world.placements.flatMap(farm=>farm.parcels.map(p=>area(p.polygon))).sort((a,b)=>a-b);
  assert.ok(fieldAreas[Math.floor(fieldAreas.length/2)]>60,'fields read as working acreage rather than tiny garden squares');
  const gaps=first.world.placements.map(farm=>Math.min(...first.world.placements.filter(other=>other!==farm)
    .map(other=>Math.hypot(farm.x-other.x,farm.z-other.z)-farm.radius-other.radius))).sort((a,b)=>a-b);
  assert.ok(gaps[Math.floor(gaps.length/2)]<0,'actual hulls adjoin even when their conservative circles overlap');
  for(const farm of first.world.placements){
    assert.ok(farm.parcels.length>=1&&farm.parcels.length<=6,'an estate contains a few broad working fields');
    assert.ok(farm.parcels.every(p=>farm.family.includes(p.crop)),'neighboring fields share a regional crop family');
    assert.equal(farm.radius,Math.hypot(farm.width,farm.depth)/2,'the reserved circle encloses the full district');
    const coverage=farm.parcels.reduce((total,p)=>total+area(p.polygon),0)/(farm.width*farm.depth);
    assert.ok(coverage>.80,'narrow lanes and corner headlands leave most of a district cultivated');
    for(let i=0;i<farm.parcels.length;i++){
      const p=farm.parcels[i];
      assert.ok(Math.abs(p.x)+p.width/2<=farm.width/2&&Math.abs(p.z)+p.depth/2<=farm.depth/2);
      const polygon=p.polygon.map(([x,z])=>[x+p.x,z+p.z]);
      for(const q of farm.parcels.slice(0,i))assert.ok(separated(polygon,q.polygon.map(([x,z])=>[x+q.x,z+q.z])),'neighboring oblique parcels never overlap');
    }
  }
});

test('district reservations preserve complete object, rail, river, biome and city clearances',()=>{
  const {world,obstacles}=plan();
  for(let i=0;i<world.placements.length;i++){
    const farm=world.placements[i];
    assert.ok(fitsBiome(world,'farmland',farm.x,farm.z,farm.radius+.75));
    assert.ok(Math.abs(farm.z)>farm.radius+1.45);
    assert.ok(Math.abs(farm.x+31)>farm.radius+3.5);
    for(const other of obstacles)assert.ok(
      Math.hypot(farm.x-other.x,farm.z-other.z)>=farm.radius+other.radius+.32);
    for(const other of world.placements.slice(0,i))assert.equal(farmFootprintsOverlap(world,farm,other,.32),false);
  }
  const zero=plan(27,0),sparse=plan(27,.2),dense=plan(27,2);
  assert.equal(zero.world.placements.length,0);assert.equal(zero.result.area,0);
  assert.ok(sparse.result.area<dense.result.area,'density changes actual acreage');
});

test('rendered irregular parcels stay inside their scaled, rotated district reservation',()=>{
  const fixtures=[...plan().world.placements.slice(0,8),{width:9,depth:8,parcels:[
    {x:-2.25,z:-1.3,width:4.1,depth:5,variant:0},
    {x:2.1,z:-2.1,width:4.0,depth:3.4,variant:1},
    {x:2.1,z:1.85,width:4.0,depth:3.8,variant:2},
  ]}];
  for(const fixture of fixtures)for(const scale of [.7,1,1.4])for(const rotation of [0,.63,2.1]){
    const farm=farmPatch(new THREE.Group(),{...fixture,x:14,z:-7,y:1.3,rotation,scale});
    farm.updateMatrixWorld(true);
    const inverse=farm.matrixWorld.clone().invert(),vertex=new THREE.Vector3();
    farm.traverse(mesh=>{
      if(!mesh.isMesh)return;const transform=inverse.clone().multiply(mesh.matrixWorld);
      const positions=mesh.geometry.attributes.position;
      for(let i=0;i<positions.count;i++){
        vertex.fromBufferAttribute(positions,i).applyMatrix4(transform);
        assert.ok(Math.abs(vertex.x)<=fixture.width/2+1e-5&&Math.abs(vertex.z)<=fixture.depth/2+1e-5);
        assert.ok(Math.hypot(vertex.x,vertex.z)<=Math.hypot(fixture.width,fixture.depth)/2+1e-5);
        assert.ok(vertex.y>=-1e-5&&vertex.y<=ASSET_BOUNDS.farmPatch.height+1e-5,'crops, orchard crowns and barns obey their vertical envelope');
      }
    });
  }
  assert.throws(()=>farmPatch(new THREE.Group(),{width:3,depth:4,parcels:[{x:1,z:0,width:2,depth:2}]}),TypeError);
});

test('every crop, hedge and farm feature stays within its actual oblique parcel',()=>{
  let features=0,orchards=0,hedges=0;
  for(const seed of [27,44,12,3])for(const fixture of plan(seed).world.placements){
    const root=farmPatch(new THREE.Group(),fixture);root.updateMatrixWorld(true);
    let triangles=0;
    for(const [index,field]of fixture.parcels.entries()){
      const group=root.children[index],inverse=group.matrixWorld.clone().invert(),point=new THREE.Vector3();
      if(field.feature)features++;if(field.crop==='orchard')orchards++;hedges+=field.hedgeEdges.length;
      group.traverse(mesh=>{
        if(!mesh.isMesh)return;const matrix=inverse.clone().multiply(mesh.matrixWorld),position=mesh.geometry.attributes.position;
        triangles+=(mesh.geometry.index?.count??position.count)/3;
        for(let vertex=0;vertex<position.count;vertex++){
          point.fromBufferAttribute(position,vertex).applyMatrix4(matrix);
          assert.ok(inConvex(point,field.polygon),`${seed}: ${fixture.districtId}/${index} ${field.crop} stays inside its field`);
        }
      });
    }
    assert.ok(triangles<2000,'details retain a small geometry budget per estate');
  }
  assert.ok(features>5&&orchards>5&&hedges>30,'the test exercises sparse farm details as well as quiet working fields');
});

test('regional generation keeps cluster identity and details independent of request order',()=>{
  const source=plan().world;
  function region(minX,minZ){
    const world={...source,placements:[],detailRegion:{minX,maxX:minX+48,minZ,maxZ:minZ+40}};
    placeFarmland(world,{density:1,canPlace:item=>item.x-item.radius>=minX&&item.x+item.radius<=minX+48
      &&item.z-item.radius>=minZ&&item.z+item.radius<=minZ+40
      &&world.placements.every(other=>!farmFootprintsOverlap(world,item,other,.32)),add:item=>world.placements.push(item)});
    return world.placements;
  }
  const a=region(-48,-40),b=region(0,0);
  assert.ok(a.length>0&&b.length>0);
  assert.deepEqual(region(0,0),b);assert.deepEqual(region(-48,-40),a);
  assert.equal(new Set([...a,...b].map(farm=>farm.districtId)).size,a.length+b.length);
});
