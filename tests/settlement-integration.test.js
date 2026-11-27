import test from 'node:test';
import assert from 'node:assert/strict';
import {Group} from 'three';
import {createSettlementWorld} from '../src/settlement-world.js';
import {createSettlementGame,SETTLEMENT} from '../src/settlement-game.js';
import {generateWorld,generateWorldRegion,worldSurface} from '../src/world-model.js';
import {createNetworkTraffic} from '../src/network-traffic.js';
import {createWalkingPlayer} from '../src/walking-player.js';
import {surfaceDistance} from '../src/world-surface.js';

function surroundings(world){
  const regions=[];
  // Small cells deliberately divide the guaranteed first grove across owners.
  for(let x=-112;x<-48;x+=16)for(let z=-64;z<-16;z+=16)
    regions.push(generateWorldRegion(world,{x,z,size:16}));
  return regions;
}

test('both full and streamed settlement generation remain free of cities and rail traffic',()=>{
  const config=createSettlementWorld(),network=generateWorld(config,{detail:'network'}),full=generateWorld(config);
  for(const world of [network,full]){
    assert.deepEqual(world.cities,[]);assert.deepEqual(world.lines,[]);assert.deepEqual(world.stations,[]);
    assert.deepEqual(world.cityStreets,[]);assert.deepEqual(world.junctions,[]);
    assert.equal(world.placements.some(p=>['house','apartment','civic','station','tower'].includes(p.kind)),false);
    const traffic=createNetworkTraffic(world);traffic.update(.5);
    assert.equal(traffic.trains.length,0);assert.equal(traffic.paths.length,0);
  }
  for(const region of surroundings(network)){
    assert.deepEqual(region.cities,[]);assert.deepEqual(region.lines,[]);assert.deepEqual(region.stations,[]);assert.deepEqual(region.cityStreets,[]);
  }
});

test('starter reservations prevent generated props from occupying the house, spawn or guaranteed grove',()=>{
  for(const seed of ['first-settlement-v1','clear-start-two']){
    const config=createSettlementWorld({seed}),network=generateWorld(config,{detail:'network'});
    for(const placements of [generateWorld(config).placements,surroundings(network).flatMap(region=>region.placements)]){
      const starterIds=new Set(config.gameplay.guaranteedTrees.map(tree=>tree.id));
      for(const item of placements){
        if(starterIds.has(item.id))continue;
        for(const reservation of config.gameplay.reservations)
          assert.ok(surfaceDistance(network,item,reservation)>=item.radius+reservation.radius-1e-8,
            `${item.id} overlaps a reserved starting footprint`);
      }
    }
  }
});

test('streamed cells own each starter tree once, reload deterministically, and preserve source authoring',()=>{
  const config=createSettlementWorld(),originalConfig=structuredClone(config),network=generateWorld(config,{detail:'network'}),originalNetwork=structuredClone(network);
  const regions=surroundings(network),placements=regions.flatMap(region=>region.placements);
  const ids=placements.map(item=>item.id);
  assert.equal(new Set(ids).size,ids.length);
  for(const tree of config.gameplay.guaranteedTrees)assert.equal(placements.filter(item=>item.id===tree.id).length,1,tree.id);
  for(const region of regions){
    for(const item of region.placements){
      const b=region.bounds;
      assert.ok(item.x>=b.minX&&item.x<b.maxX&&item.z>=b.minZ&&item.z<b.maxZ);
    }
    assert.deepEqual(generateWorldRegion(network,{x:region.bounds.minX,z:region.bounds.minZ,size:16}),region);
  }
  assert.deepEqual(config,originalConfig);assert.deepEqual(network,originalNetwork);
});

test('the initialized traveller starts on dry ground facing an accessible tree and removal releases its collision',()=>{
  const config=createSettlementWorld(),world=generateWorld(config,{detail:'network'}),game=createSettlementGame(world);
  const placements=surroundings(world).flatMap(region=>region.placements);
  let collision=[...placements,...game.houses];
  const player=createWalkingPlayer(new Group(),world,{getCollisionPlacements:()=>collision});
  try{
    const spawn=player.prepareSpawn(config.gameplay.spawn);
    assert.ok(spawn);assert.equal(spawn.x,config.gameplay.spawn.x);assert.equal(spawn.z,config.gameplay.spawn.z);
    assert.equal(player.enter(spawn,config.gameplay.spawn.heading),true);
    assert.equal(player.grounded,true);assert.equal(worldSurface(world,player.position.x,player.position.z).type,'ground');
    const first=placements.find(item=>item.id===config.gameplay.guaranteedTrees[0].id);
    assert.ok(surfaceDistance(world,player.position,first)<SETTLEMENT.chopReach);
    assert.equal(player.heading,0);assert.equal(first.x,player.position.x);assert.ok(first.z>player.position.z);
    for(let i=0;i<60;i++)player.update(1/60,{forward:1});
    const stoppedAt=player.position.z;
    assert.ok(stoppedAt<first.z-.2,'the standing trunk stops the player');
    assert.ok(player.stats.blocked>0);
    const result=game.chop(first,{player:player.position});assert.equal(result.ok,true);
    collision=collision.filter(item=>item.id!==result.treeId);
    for(let i=0;i<36;i++)player.update(1/60,{forward:1});
    assert.ok(player.position.z>first.z+.5,'chopping frees the same route through the grove');
    assert.equal(game.chop(first,{player:player.position}).code,'already-chopped');
  }finally{player.dispose();}
});

test('the real starter grove supplies enough timber and clear neighbouring ground for the first new home',()=>{
  const config=createSettlementWorld(),world=generateWorld(config,{detail:'network'}),game=createSettlementGame(world);
  const placements=surroundings(world).flatMap(region=>region.placements);
  for(const tree of config.gameplay.guaranteedTrees)assert.equal(game.chop(tree).ok,true);
  const before=game.logs;
  assert.ok(before>=20);
  const site={x:-88,z:-40,rotation:0},context={player:config.gameplay.spawn,placements,ready:true};
  const preview=game.evaluateBuild(site,context);
  assert.equal(preview.valid,true);assert.equal(preview.connected,false);assert.equal(preview.cityHouseCount,2);
  const result=game.build(site,context);
  assert.equal(result.ok,true);assert.equal(game.logs,before-8);assert.equal(game.houses.length,2);
  assert.equal(game.houses.every(home=>!home.connected),true);assert.deepEqual(game.cities,[]);assert.deepEqual(game.paths,[]);
});
