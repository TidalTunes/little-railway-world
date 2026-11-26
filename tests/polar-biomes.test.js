import test from 'node:test';
import assert from 'node:assert/strict';
import {createBiomes,biomeAt,biomeDistance,fitsBiome} from '../src/biomes.js';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {compileMountainRange} from '../src/mountain-ranges.js';
import {mountainTrees} from '../src/mountain-cover.js';

const surface={type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},
  projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}};
const vegetation=new Set(['tree','farm','sheep','cactus']);
function input(){return{seed:'polar-vegetation',bounds:{width:200,depth:160},
  outline:[[-100,-80],[100,-80],[100,80],[-100,80]],surface,rivers:[],density:.45,
  cities:[{id:'a',x:65,z:-15,radius:4,level:1},{id:'b',x:65,z:15,radius:4,level:1}],
  connections:[{from:'a',to:'b'}],mountains:[],biomes:{ocean:false,sites:[
    {id:'ice',type:'plains',x:-50,z:0,ice:true},{id:'forest',type:'forest',x:50,z:-40},
    {id:'farmland',type:'farmland',x:50,z:40},
  ]}};}
function assertUnfrozen(world,placements){
  for(const item of placements)if(vegetation.has(item.kind)){
    assert.ok(biomeDistance(world,'ice',item.x,item.z)<-item.radius,
      `${item.kind} ${item.id} keeps its complete footprint off ice`);
  }
}

test('frozen sites keep their biome identity and supply a full-footprint mask including mountain land',()=>{
  const world={...input(),cities:[],lines:[],stations:[],mountains:[{id:'polar-peak',x:-50,z:0,radius:12,height:20}]};
  const biomes=createBiomes(world,world.biomes);
  assert.equal(biomes.regions.find(region=>region.id==='ice').ice,true);
  assert.equal(biomes.regions.find(region=>region.id==='ice').type,'plains');
  assert.equal(biomeAt(biomes,-50,0),'mountain');
  assert.equal(fitsBiome(biomes,'ice',-50,0,20),true,'mountain holes must not remove the frozen mask');
  assert.equal(fitsBiome(biomes,'ice',60,0,1),false);
  assert.deepEqual(createBiomes(structuredClone(world),structuredClone(world.biomes)),biomes);
  assert.deepEqual(structuredClone(biomes).ice,biomes.ice);
});

test('global scenery and regional detail keep ordinary vegetation off ice without removing temperate detail',()=>{
  const config=input(),world=generateWorld(config);
  assert.ok(world.placements.some(item=>item.kind==='tree'));
  assert.ok(world.placements.some(item=>item.kind==='farm'));
  assertUnfrozen(world,world.placements);
  const network=generateWorld(config,{detail:'network'});
  for(const request of [{x:-64,z:0,size:64},{x:0,z:0,size:64}]){
    const first=generateWorldRegion(network,request),second=generateWorldRegion(network,request);
    assert.deepEqual(first.placements,second.placements);assertUnfrozen(network,first.placements);
  }
});

test('farm reservations cannot cross frozen farmland borders even when adjacent regions share a biome type',()=>{
  const config=input();config.biomes.sites=[
    {id:'frozen-field',type:'farmland',x:-50,z:0,ice:true},
    {id:'warm-field',type:'farmland',x:50,z:0},
  ];
  const world=generateWorld(config),farms=world.placements.filter(item=>item.kind==='farm');
  assert.ok(farms.length>0);assert.ok(farms.every(item=>item.x>item.radius));assertUnfrozen(world,farms);
});

test('legacy planar scenery ignores ice metadata and keeps its prior deterministic layout',()=>{
  const frozen=input();delete frozen.surface;
  const plain=structuredClone(frozen);delete plain.biomes.sites[0].ice;
  const a=generateWorld(frozen),b=generateWorld(plain);
  assert.equal(a.biomes.ice,undefined);assert.deepEqual(a.placements,b.placements);
  assert.ok(a.placements.some(item=>item.kind==='tree'&&item.x<0),'legacy plains still allow scattered trees');
});

test('polar mountain forests obey the same crown clearance and regional ownership as ground vegetation',()=>{
  const mountain=compileMountainRange({id:'polar-range',polygon:[[-70,-40],[70,-40],[70,40],[-70,40]],
    ridges:[{points:[[-60,0,18],[0,0,27],[60,0,18]],width:27}],cellSize:5,snowLine:18});
  const world={seed:'polar-range',surface,bounds:{width:180,depth:120},outline:[[-90,-60],[90,-60],[90,60],[-90,60]],
    mountains:[mountain],lines:[],cities:[],stations:[],river:{points:[],width:1},density:1};
  const config={ocean:false,sites:[{id:'ice',type:'plains',x:-45,z:0,ice:true},{id:'woods',type:'forest',x:45,z:0}]};
  world.biomes=createBiomes(world,config);
  const trees=mountainTrees(world,mountain);assert.ok(trees.length>10);
  for(const tree of trees)assert.ok(biomeDistance(world,'ice',tree.x,tree.z)<-tree.radius-.2);
  const west=mountainTrees(world,{...mountain,renderBounds:{minX:-70,maxX:0,minZ:-40,maxZ:40}});
  const east=mountainTrees(world,{...mountain,renderBounds:{minX:0,maxX:70,minZ:-40,maxZ:40}});
  assert.equal(west.length,0);assert.deepEqual(east,trees);
  const frozen={...world,biomes:createBiomes(world,{ocean:false,sites:[config.sites[0]]})};
  assert.deepEqual(mountainTrees(frozen,mountain),[]);
});
