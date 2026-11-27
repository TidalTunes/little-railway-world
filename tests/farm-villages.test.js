import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,generateWorldRegion,worldSurface} from '../src/world-model.js';
import {createFarmVillages,FARM_VILLAGE_OWNER} from '../src/farm-villages.js';
import {fitsBiome} from '../src/biomes.js';
import {farmFootprintsOverlap} from '../src/farm-footprints.js';
import {sampleSettlementPath,settlementDoor} from '../src/settlement-paths.js';

const network=seed=>generateWorld(createSettlementWorld({seed}),{detail:'network'});
const base=network('first-settlement-v1'),villages=base.gameplay.farmVillages;

test('three seeded gray level-one hamlets remain separate from player ownership and railway cities',()=>{
  assert.deepEqual(network('first-settlement-v1').gameplay.farmVillages,villages);
  assert.notDeepEqual(network('another-world').gameplay.farmVillages,villages);
  assert.equal(villages.cities.length,3);assert.equal(villages.houses.length,9);assert.equal(villages.buildings.length,3);
  assert.equal(base.cities.length,0);assert.equal(base.lines.length,0);
  assert.equal(base.gameplay.starterHouse.ownerId,'teal');
  assert.deepEqual(base.players.find(player=>player.id===FARM_VILLAGE_OWNER).color,{l:.59,c:0,h:0});
  for(const city of villages.cities){
    assert.equal(city.level,1);assert.equal(city.ownerId,FARM_VILLAGE_OWNER);assert.equal(city.houseCount,3);assert.equal(city.houseIds.length,3);
    assert.equal(villages.buildings.filter(building=>building.cityId===city.id&&building.buildingType==='well').length,1);
    assert.deepEqual(villages.houses.filter(home=>home.cityId===city.id).map(home=>home.id),city.houseIds);
  }
  const ids=[...villages.houses,...villages.buildings,...villages.paths,...villages.farms,...villages.destinations].map(item=>item.id);
  assert.equal(new Set(ids).size,ids.length);assert.ok(ids.every(id=>id.startsWith('farm-village:')));
});

test('village footprints stay on flat farmland, with clear paths and actual cultivated fields at their destinations',()=>{
  for(const seed of ['first-settlement-v1','another-world',19]){
    const world=network(seed),snapshot=world.gameplay.farmVillages;
    assert.equal(snapshot.cities.length,3);
    for(const item of [...snapshot.houses,...snapshot.buildings,...snapshot.farms]){
      assert.ok(fitsBiome(world,'farmland',item.x,item.z,item.radius+.5));
      assert.deepEqual(worldSurface(world,item.x,item.z),{type:'ground',height:0});
    }
    const occupied=[...snapshot.houses,...snapshot.buildings,...snapshot.farms];
    for(let index=0;index<occupied.length;index++)for(const other of occupied.slice(0,index))
      assert.equal(farmFootprintsOverlap(world,occupied[index],other,.32),false,'home roofs, wells and field details keep their full envelopes');
    for(const home of snapshot.houses){
      assert.equal(home.scale,1,'art, foundations, doors and collision footprints share a single scale');
      const path=snapshot.paths.find(path=>path.fromHouseId===home.id),door=settlementDoor(world,home);
      assert.ok(path);assert.ok(Math.hypot(path.points[0].x-door.x,path.points[0].z-door.z)<1e-8);
    }
    for(const path of snapshot.paths){
      sampleSettlementPath(path.points,point=>assert.deepEqual(worldSurface(world,point.x,point.z),{type:'ground',height:0}));
      for(let index=1;index<path.points.length;index++){
        const a=path.points[index-1],b=path.points[index],length=Math.hypot(b.x-a.x,b.z-a.z);
        const corridor={x:(a.x+b.x)/2,z:(a.z+b.z)/2,width:path.width+.35,depth:length,rotation:Math.atan2(b.x-a.x,b.z-a.z),radius:Math.hypot(path.width+.35,length)/2};
        for(const field of snapshot.farms)assert.equal(farmFootprintsOverlap(world,corridor,field),false,'farm crops, fences and scenery cannot cross village paths');
      }
    }
    for(const destination of snapshot.destinations){
      const farm=snapshot.farms.find(farm=>farm.id===destination.farmId);
      assert.ok(farm&&farm.parcels.length&&farm.parcels.every(parcel=>parcel.polygon.length>=3));
      assert.ok(Math.hypot(destination.x-farm.x,destination.z-farm.z)<farm.radius+3);
      assert.ok(snapshot.paths.some(path=>path.cityId===destination.cityId&&path.toHouseId===destination.id&&path.trimEnd===false));
      for(const home of snapshot.houses.filter(home=>home.cityId===destination.cityId))assert.ok(Math.hypot(home.x-destination.x,home.z-destination.z)<24);
    }
  }
});

test('village reservations protect the entire layout from procedural scenery across detail chunks',()=>{
  const size=48,requests=new Map();
  for(const item of [...villages.houses,...villages.farms]){
    const key=`${Math.floor(item.x/size)}:${Math.floor(item.z/size)}`;requests.set(key,{x:item.x,z:item.z,size});
  }
  const regions=[...requests.values()].map(request=>generateWorldRegion(base,request)),fields=regions.flatMap(region=>region.placements.filter(item=>item.id.startsWith('farm-village:')));
  assert.equal(fields.length,villages.farms.length);assert.equal(new Set(fields.map(item=>item.id)).size,fields.length);
  for(const source of villages.farms){
    const generated=fields.find(field=>field.id===source.id);assert.ok(generated);
    assert.deepEqual(generated.parcels,source.parcels);assert.deepEqual(generated.livestock,source.livestock);
  }
  for(const region of regions){
    for(const item of region.placements){
      if(item.id.startsWith('farm-village:')||item.id.startsWith('starter-tree-'))continue;
      for(const reservation of villages.reservations)assert.ok(Math.hypot(item.x-reservation.x,item.z-reservation.z)>=item.radius+reservation.radius-1e-8);
    }
    for(const field of region.placements.filter(item=>item.id.startsWith('farm-village:'))){
      assert.ok(region.cullBounds.minX<=field.x-field.radius&&region.cullBounds.maxX>=field.x+field.radius);
      assert.ok(region.cullBounds.minZ<=field.z-field.radius&&region.cullBounds.maxZ>=field.z+field.radius);
    }
  }
  for(const request of [...requests.values()].reverse()){
    const repeated=generateWorldRegion(base,request),first=regions.find(region=>region.key===repeated.key);
    assert.deepEqual(repeated.placements,first.placements,'chunk request order cannot move a home or its farm');
  }
});

test('generation handles missing reservations and skips unsupported curved worlds',()=>{
  const config=createSettlementWorld();delete config.gameplay.reservations;
  assert.equal(generateWorld(config,{detail:'network'}).gameplay.farmVillages.cities.length,3);
  assert.deepEqual(createFarmVillages({...base,surface:{type:'sphere'}}).cities,[]);
  assert.deepEqual(createFarmVillages(base,{count:0}).cities,[]);
  const authored=createSettlementWorld(),again={...authored,gameplay:structuredClone(base.gameplay)};
  assert.deepEqual(generateWorld(again,{detail:'network'}).gameplay.farmVillages,villages,'recompiling a world removes previous generated reservations');
});
