import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createBiomes, fitsBiome } from '../src/biomes.js';
import { placeFarmland } from '../src/farmland.js';
import { farmPatch } from '../src/assets.js';

function plan(seed=27,density=1){
  const world={seed,bounds:{width:100,depth:80},outline:[[-50,-40],[50,-40],[50,40],[-50,40]],
    cities:[],stations:[],mountains:[],lines:[],placements:[]};
  world.biomes=createBiomes(world,{ocean:false,sites:[{id:'fields',type:'farmland',x:0,z:0}]});
  const obstacles=[{x:16,z:14,radius:9},{x:-18,z:-21,radius:4}];
  const valid=item=>fitsBiome(world,'farmland',item.x,item.z,item.radius+.75)
    &&Math.abs(item.z)>item.radius+1.45 // railway corridor
    &&Math.abs(item.x+31)>item.radius+3.5 // river and bank
    &&[...obstacles,...world.placements].every(other=>Math.hypot(item.x-other.x,item.z-other.z)>=item.radius+other.radius+.32);
  const result=placeFarmland(world,{density,canPlace:valid,add:item=>world.placements.push(item)});
  return{world,result,obstacles};
}

test('farmland is deterministic, aligned and genuinely denser than isolated small fields',()=>{
  const first=plan(),again=plan(),changed=plan(44);
  assert.deepEqual(again,first,'seed controls both plots and crop patterns');
  assert.notDeepEqual(changed.world.placements,first.world.placements,'different seeds change the coherent layout');
  assert.ok(first.result.area>1500,'a broad farming region receives substantial continuous cultivated acreage');
  assert.equal(new Set(first.world.placements.map(p=>p.rotation)).size,1,'all districts share a regional bearing');
  for(const farm of first.world.placements){
    assert.ok(farm.parcels.length>=4,'a district groups neighboring fields');
    assert.equal(farm.radius,Math.hypot(farm.width,farm.depth)/2,'the reserved circle encloses the full district');
    const coverage=farm.parcels.reduce((total,p)=>total+p.width*p.depth,0)/(farm.width*farm.depth);
    assert.ok(coverage>.85,'narrow lanes leave most of a district cultivated');
    for(let i=0;i<farm.parcels.length;i++){
      const p=farm.parcels[i];
      assert.ok(Math.abs(p.x)+p.width/2<=farm.width/2&&Math.abs(p.z)+p.depth/2<=farm.depth/2);
      for(const q of farm.parcels.slice(0,i))assert.ok(Math.abs(p.x-q.x)>=(p.width+q.width)/2
        ||Math.abs(p.z-q.z)>=(p.depth+q.depth)/2,'crop rectangles never overlap');
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
    for(const other of [...obstacles,...world.placements.slice(0,i)])assert.ok(
      Math.hypot(farm.x-other.x,farm.z-other.z)>=farm.radius+other.radius+.32);
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
        assert.ok(vertex.y>=-1e-5&&vertex.y<=.42+1e-5,'crop rows and bales obey their vertical envelope');
      }
    });
  }
  assert.throws(()=>farmPatch(new THREE.Group(),{width:3,depth:4,parcels:[{x:1,z:0,width:2,depth:2}]}),TypeError);
});
