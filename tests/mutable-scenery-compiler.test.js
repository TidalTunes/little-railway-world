import test from 'node:test';
import assert from 'node:assert/strict';
import {BufferGeometry,BufferAttribute,Mesh,MeshBasicMaterial,DoubleSide,Raycaster,Vector3,Group} from 'three';
import {compileDetailPacket,detailPacketTransfers} from '../src/detail-compiler.js';
import {createMutableScenery,sceneryPlacementId} from '../src/mutable-scenery.js';
import {createMutableTrees} from '../src/mutable-trees.js';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {surfaceChartCoordinates,surfacePoint} from '../src/world-surface.js';
import {box} from '../src/geometry.js';

const bounds={minX:0,minZ:0,maxX:48,maxZ:48};
function network(mountains=[]){
  return generateWorld({seed:'mutable-compiler',bounds:{width:48,depth:48},outline:[[0,0],[48,0],[48,48],[0,48]],
    gameplay:{},cities:[],connections:[],rivers:[],mountains,density:0},{detail:'network'});
}
const farm=(id,x,z=12)=>({id,kind:'farm',x,z,width:6,depth:5,rotation:.17,variant:2,
  parcels:[{x:0,z:0,width:6,depth:5,crop:'pasture',feature:'trough',variant:3}]});
const region=placements=>({bounds,placements,lines:[],mountains:[],cities:[],stations:[],cityStreets:[]});
function assertTags(packet){
  const known=new Set([0,...packet.mutableScenery.map(p=>p.sceneryIndex)]),counts=new Map();
  for(const mesh of packet.meshes){
    assert.equal(mesh.sceneryIndex?.length,mesh.position.length/3,'every vertex has exactly one ownership tag');
    for(const tag of mesh.sceneryIndex){assert.ok(known.has(tag),`unknown/fractional ownership tag ${tag}`);counts.set(tag,(counts.get(tag)??0)+1);}
    const length=mesh.index?.length??mesh.sceneryIndex.length;
    for(let i=0;i<length;i+=3){
      const tags=[0,1,2].map(j=>mesh.sceneryIndex[mesh.index?mesh.index[i+j]:i+j]);
      assert.equal(tags[0],tags[1],'a triangle cannot join different owners');
      assert.equal(tags[0],tags[2],'a triangle cannot join different owners');
    }
  }
  return counts;
}
function hydrate(packet){
  return packet.meshes.map(item=>{
    const geometry=new BufferGeometry().setAttribute('position',new BufferAttribute(item.position.slice(),3));
    if(item.index)geometry.setIndex(new BufferAttribute(item.index.slice(),1));
    const mesh=new Mesh(geometry,new MeshBasicMaterial({side:DoubleSide}));mesh.updateMatrixWorld(true);return mesh;
  });
}
const dispose=meshes=>meshes.forEach(mesh=>{mesh.geometry.dispose();mesh.material.dispose();});
function assertOnlyCleared(packet,world,id){
  const meshes=hydrate(packet),manager=createMutableScenery(world);
  try{
    manager.addChunk('test',meshes,packet.mutableScenery,packet.meshes);
    manager.clear([id],{animate:false});
    const removed=packet.mutableScenery.find(p=>p.id===id),center=surfacePoint(world,removed.x,removed.y??0,removed.z);
    let moved=0,retained=0;
    meshes.forEach((mesh,i)=>{
      const positions=mesh.geometry.attributes.position,original=packet.meshes[i];
      for(let vertex=0;vertex<positions.count;vertex++)for(let axis=0;axis<3;axis++){
        const value=positions.array[vertex*3+axis];
        if(original.sceneryIndex[vertex]===removed.sceneryIndex){
          assert.ok(Math.abs(value-center.getComponent(axis))<.0001);moved++;
        }else{assert.equal(value,original.position[vertex*3+axis],'terrain and neighboring assets retain exact positions');retained++;}
      }
    });
    assert.ok(moved>0&&retained>0);
  }finally{manager.dispose();dispose(meshes);}
}

test('flat detail retains distinct scenery ownership through shared primitives and color batching',()=>{
  const template=box(new Group(),0,0,0,1,1,1,'rock').geometry,templateAttributes=Object.keys(template.attributes);
  const world=network(),placements=[farm('field-a',12),{kind:'house',id:'keep-house',x:7,z:30,variant:2},
    farm('field-b',35),{kind:'nature',id:'groundcover',x:25,z:31,radius:4,style:'meadow',variant:4},
    {kind:'rock',id:'boulder',x:37,z:30,scale:1,variant:1},
    {kind:'tree',id:'oak',x:16,z:30,scale:1,variant:'broadleaf'}];
  const packet=compileDetailPacket(region(placements),world),counts=assertTags(packet);
  assert.deepEqual(packet.mutableScenery.map(p=>p.id),['field-a','field-b','groundcover','boulder']);
  assert.deepEqual(packet.mutableTrees.map(p=>p.id),['oak']);
  assert.ok(counts.get(0)>0,'terrain and buildings remain immutable');
  for(const placement of packet.mutableScenery){
    assert.ok(counts.get(placement.sceneryIndex)>0,`${placement.id} is rendered`);
    for(const mesh of packet.meshes)for(let vertex=0;vertex<mesh.sceneryIndex.length;vertex++){
      if(mesh.sceneryIndex[vertex]!==placement.sceneryIndex)continue;
      assert.ok(Math.hypot(mesh.position[vertex*3]-placement.x,mesh.position[vertex*3+2]-placement.z)<5,
        `${placement.id} must never tag a neighboring house, farm, or terrain`);
    }
  }
  assertOnlyCleared(packet,world,'field-a');
  assert.deepEqual(Object.keys(template.attributes),templateAttributes,'terrain and asset tagging cannot mutate a shared primitive template');
  const art=compileDetailPacket(region(placements),{...world,gameplay:false});
  assert.equal(art.mutableScenery,undefined);
  assert.ok(art.meshes.every(mesh=>mesh.sceneryIndex===undefined),'gameplay compilation cannot tag shared templates in later artwork');
});

test('compiling gameplay terrain leaves borrowed box geometry clean for subsequent mutable tree templates',()=>{
  const template=box(new Group(),0,0,0,1,1,1,'bark').geometry;
  const before=Object.fromEntries(Object.entries(template.attributes).map(([name,attribute])=>[name,attribute.array.slice()]));
  const world=network(),trees=['broadleaf','acacia','birch'].map((variant,i)=>({
    kind:'tree',id:`tree-after-compile-${variant}`,x:10+i*8,z:30,y:0,scale:1,rotation:.3,variant}));
  const packet=compileDetailPacket(region([farm('field-before-trees',12),...trees]),world);
  const parent=new Group(),manager=createMutableTrees(world);
  try{
    const chunk=manager.addChunk('after-compile',parent,packet.mutableTrees);
    assert.equal(chunk.meshes.length,3,'all three tree templates contain box-based branches and other primitives');
    for(const mesh of chunk.meshes){
      assert.equal(mesh.count,1);assert.ok(mesh.geometry.attributes.position.count>0);
      assert.equal(mesh.geometry.attributes.sceneryIndex,undefined,'instanced tree art never inherits scenery tags');
      assert.ok([...mesh.geometry.attributes.position.array].every(Number.isFinite));
    }
    assert.deepEqual(Object.keys(template.attributes),Object.keys(before));
    for(const [name,values]of Object.entries(before))assert.deepEqual(template.attributes[name].array,values);
  }finally{manager.dispose();}
  assert.equal(parent.children.length,0);
});

test('id-less farm livestock use the removable placement identity instead of their district identity',()=>{
  const world=network(),field=farm(undefined,12);delete field.id;
  field.districtId='distinct-farmland-district';
  field.livestock=[{x:-1,z:1,rotation:.5,scale:1,radius:1.35,roamRadius:.65},
    {x:1,z:-1,rotation:2,scale:.9,radius:1.4,roamRadius:.7}];
  const canonicalId=sceneryPlacementId(field),packet=compileDetailPacket(region([field]),world);
  assert.notEqual(canonicalId,field.districtId);
  assert.equal(packet.mutableScenery[0].id,canonicalId);
  const sheep=packet.lifePlacements.filter(p=>p.kind==='sheep');assert.equal(sheep.length,2);
  for(const animal of sheep)assert.equal(animal.farmId,canonicalId,'clearing this field must also remove its animated herd');
  const artwork=compileDetailPacket(region([field]),{...world,gameplay:false});
  assert.deepEqual(sheep.map(p=>p.id),artwork.lifePlacements.map(p=>p.id),'normalizing ownership preserves animal identities');
  assert.ok(artwork.lifePlacements.every(p=>p.farmId===field.districtId),'non-gameplay farm ownership is unchanged');
  assert.equal(field.id,undefined);assert.equal(field.districtId,'distinct-farmland-district');
});

test('exact indexing keeps coincident removable assets independently removable',()=>{
  const world=network(),placements=[farm('first',12),farm('second',12)];
  const packet=compileDetailPacket(region(placements),world),counts=assertTags(packet);
  assert.equal(counts.get(1),counts.get(2));assert.ok(counts.get(1)>30);
  assert.ok(packet.meshes.some(mesh=>mesh.index&&mesh.sceneryIndex.includes(1)),'the regression exercises indexed asset geometry');
  for(const mesh of packet.meshes){
    const coordinates=tag=>Array.from({length:mesh.sceneryIndex.length},(_,i)=>i).filter(i=>mesh.sceneryIndex[i]===tag)
      .map(i=>[...mesh.position.slice(i*3,i*3+3)].join(':')).sort();
    assert.deepEqual(coordinates(1),coordinates(2),'equal positions do not merge ownership across assets');
  }
  assertOnlyCleared(packet,world,'first');
});

test('globe draping and rigid extraction retain ownership across multiple surface batches',()=>{
  const radius=1600,world={...network(),outline:[[0,0],[4,0],[4,4],[0,4]],surface:{type:'sphere',radius,complete:true,
    origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  const anchor=surfaceChartCoordinates(world,50,72),placements=[{...farm('globe-field',anchor.x,anchor.z),width:16,depth:12,
    parcels:[{x:0,z:0,width:16,depth:12,crop:'pasture',feature:'trough',variant:3}]},
    {kind:'nature',id:'globe-nature',x:anchor.x+90,z:anchor.z,style:'dune',radius:7,rotation:.4,variant:12}];
  const local={...region(placements),bounds:{minX:anchor.x-20,maxX:anchor.x+110,minZ:anchor.z-20,maxZ:anchor.z+20}};
  const packet=compileDetailPacket(local,world),counts=assertTags(packet);
  assert.ok(counts.get(1)>0&&counts.get(2)>0);
  assert.ok(packet.meshes.every(mesh=>[...mesh.position].every(Number.isFinite)));
  assertOnlyCleared(packet,world,'globe-field');
});

test('packet transfers include ownership buffers exactly once and retain placement identities',()=>{
  const packet=compileDetailPacket(region([farm('transfer-field',12),farm('neighbor',35)]),network());
  const expected=packet.meshes.map(mesh=>mesh.sceneryIndex.slice()),descriptions=structuredClone(packet.mutableScenery);
  const buffers=detailPacketTransfers(packet);assert.equal(new Set(buffers).size,buffers.length);
  for(const mesh of packet.meshes)assert.equal(buffers.filter(buffer=>buffer===mesh.sceneryIndex.buffer).length,1);
  const copy=structuredClone(packet,{transfer:buffers});
  assert.deepEqual(copy.mutableScenery,descriptions);
  copy.meshes.forEach((mesh,i)=>assert.deepEqual(mesh.sceneryIndex,expected[i]));
  for(const mesh of packet.meshes)assert.equal(mesh.sceneryIndex.byteLength,0,'ownership buffers transfer with geometry instead of cloning');
  assertTags(copy);
});

function railwayFixture(){
  const mountain={id:'new-pass',x:24,z:24,radius:10,height:12},world=network([mountain]);
  const points=Array.from({length:65},(_,i)=>({x:24,y:.42,z:8+i*.5}));
  const line={id:'new-player-line',points,distances:points.map((_,i)=>i*.5),length:32,bridges:[],tunnels:[],
    cuts:[{mountainId:mountain.id,start:4,end:28}]};
  return {world,line};
}
function corridorHits(packet,x=24){
  const meshes=hydrate(packet);
  try{
    return new Raycaster(new Vector3(x,1.42,8),new Vector3(0,0,1),0,32).intersectObjects(meshes).length;
  }finally{dispose(meshes);}
}
function assertCut(packet){
  assert.equal(corridorHits(packet),0,'a new railway cuts the actual mountain replacement geometry');
  assert.ok(corridorHits(packet,28)>0,'the neighboring mountain remains intact');
  const meshes=hydrate(packet);
  try{
    const hits=new Raycaster(new Vector3(24,25,24),new Vector3(0,-1,0),0,30).intersectObjects(meshes);
    assert.ok(hits.length>0,'terrain remains beneath the open cutting');
    assert.ok(hits.every(hit=>hit.point.y<.04),'replacement terrain does not bake duplicate player-owned rails');
  }finally{dispose(meshes);}
}

test('replacement compilation excavates new network lines despite the region retaining its old lines',()=>{
  const {world,line}=railwayFixture(),local=generateWorldRegion(world,{x:24,z:24,size:48});
  assert.deepEqual(local.lines,[]);
  assert.ok(corridorHits(compileDetailPacket(local,world))>0,'the baseline mountain blocks the corridor');
  const packet=compileDetailPacket(local,{...world,lines:[line]});assertCut(packet);
  assert.deepEqual(local.lines,[]);assert.deepEqual(world.lines,[],'compilation cannot mutate canonical scenery generation');
});

test('world worker uses per-request railway cuts and transfers scenery metadata without mutating its shared world',async t=>{
  const {world,line}=railwayFixture(),messages=[],oldSelf=Object.getOwnPropertyDescriptor(globalThis,'self');
  const field=farm('worker-field',8,8);
  field.parcels[0].polygon=[[-3,-2.5],[3,-2.5],[3,2.5],[-3,2.5]];
  world.gameplay.farmVillages={farms:[field]};
  globalThis.self={postMessage(message,transfer=[]){messages.push(structuredClone(message,{transfer}));}};
  t.after(()=>{if(oldSelf)Object.defineProperty(globalThis,'self',oldSelf);else delete globalThis.self;});
  await import('../src/world-worker.js?mutable-scenery-compiler-test');
  const port={close(){}};
  self.onmessage({data:{id:'attach',type:'attach-port',port}});port.onmessage({data:{world}});
  assert.deepEqual(messages.pop(),{id:'attach',result:{ready:true}});
  const request=railwayLines=>{
    self.onmessage({data:{id:'chunk',type:'chunk',payload:{x:24,z:24,size:48,railwayLines}}});
    const response=messages.pop();assert.equal(response.error,undefined);return response.result;
  };
  const replacement=request([line]);assertCut(replacement);
  const counts=assertTags(replacement);
  assert.deepEqual(replacement.mutableScenery.map(p=>p.id),['worker-field']);
  assert.ok(counts.get(1)>0,'the real worker transfers nonzero ownership as well as immutable terrain tags');
  assert.ok(corridorHits(request([]))>0,'request-specific cuts cannot leak into the shared generation world');
  assert.deepEqual(world.lines,[]);
});
