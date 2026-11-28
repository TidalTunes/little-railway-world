import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementSession} from '../src/settlement-session.js';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {preparePlayerBotScenery} from '../src/player-bot-world.js';
import {createPlayerBot} from '../src/player-bots.js';
import {createSettlementRailways} from '../src/settlement-railways.js';
import {createSettlementEconomy} from '../src/settlement-economy.js';
import {createEconomicBots} from '../src/economic-bots.js';
import {LOOP_ECONOMY_RULES,loopTrainCost} from '../src/loop-economy-rules.js';

test('island loop rivals buy complete directed railway circuits through real physical settlements',()=>{
  const world=generateWorld(createSettlementWorld({economy:'loops',military:false}),{detail:'network'});
  preparePlayerBotScenery(world,generateWorldRegion);
  const bots=[];let infrastructure={revision:0,buildings:[],paths:[],corridors:[]};
  const session=createSettlementSession(world,{getActors:()=>bots.map(bot=>bot.position),getInfrastructure:()=>infrastructure});
  const village=world.gameplay.farmVillages,permanent=[...world.gameplay.botScenery,...village.houses,...village.buildings];
  let revision=-1,placements=[];
  function getPlacements(){
    if(revision!==session.revision){revision=session.revision;placements=[...permanent.filter(item=>!session.shared.isSceneryRemoved(item)),...session.buildings];}
    return placements;
  }
  const railways=createSettlementRailways(world,{session,getPlacements}),economy=createSettlementEconomy(world,{session,railways});
  const games=[session.player,...session.bots.map(entry=>entry.game)];
  for(const game of games)game.setEconomy({resourcesAt:point=>economy.resourcesAt(game.ownerId,point),
    spendConstruction:(point,cost)=>economy.spendConstruction(game.ownerId,point,cost),
    spendResources:amount=>economy.spendResources(game.ownerId,amount)});
  for(const {config,game}of session.bots)bots.push(createPlayerBot(world,game,{config,getPlacements,getRevision:()=>session.revision}));
  let railwayCost=0;
  const coordinator=createEconomicBots(world,{session,bots,railways,economy,onRailBuild(result){
    assert.equal(result.costResource,'resources');railwayCost+=result.cost;const data=railways.snapshot();
    infrastructure={revision:data.revision,buildings:data.stations,paths:data.paths,clearedPlacementIds:data.clearedPlacementIds,
      corridors:data.reservations.filter(item=>item.kind==='rail-corridor')};
  }});
  // Nine hundred simulated seconds, no renderer, timers, workers or server.
  for(let elapsed=0;elapsed<900;elapsed+=.5){
    for(const bot of bots)bot.update(.5);
    if(railways.synchronizeStations().changed){
      const data=railways.snapshot();infrastructure={revision:data.revision,buildings:data.stations,paths:data.paths,clearedPlacementIds:data.clearedPlacementIds,corridors:data.reservations.filter(item=>item.kind==='rail-corridor')};
    }
    economy.update(.5);
    const before=coordinator.stats.validations;coordinator.update(.5);assert.ok(coordinator.stats.validations-before<=1);
  }
  const result=economy.snapshot();
  assert.equal(bots.length,3);assert.ok(bots.every(bot=>bot.game.houses.length>=6),'every rival physically builds six houses for its station');
  assert.ok(coordinator.stats.routes>=2,'rivals buy both directions of a real circuit');
  assert.ok(result.stats.trainsBought>0,'a valid physical circle supports a purchased train');
  assert.ok(result.stats.laps>0,'a purchased train completes the actual track loop');
  assert.ok(bots.some(bot=>bot.game.houses.length>6),'trade-delivered Food lets a rival resume construction beyond the station milestone');
  let escrowGold=0;const aboard={resources:0,food:0};
  for(const train of result.trains){
    assert.equal(train.backing,false);assert.ok(['moving','dwell','queued','waiting-storage'].includes(train.state));
    assert.equal(train.active,train.state!=='queued','a queued train has no overlapping physical consist at the occupied home station');
    assert.ok(Number.isFinite(train.speed)&&train.speed>=0&&train.speed<=LOOP_ECONOMY_RULES.speed);
    assert.equal(train.cars.length,train.carPoses.length);assert.equal(train.cars[0].amount,0,'the home locomotive never buys its own stock');
    for(const pose of train.carPoses)assert.ok(Number.isFinite(pose.x)&&Number.isFinite(pose.y)&&Number.isFinite(pose.z));
    escrowGold+=train.escrowGold;for(const resource of ['resources','food'])aboard[resource]+=train.cargo[resource];
  }
  assert.ok(railwayCost>0);assert.ok(result.stats.trainSpent>=loopTrainCost(2));
  assert.ok(result.stats.goldPaid>0,'rivals pay suppliers for actual goods');
  assert.equal(result.stats.goldPaid,(result.stats.withdrawn.resources+result.stats.withdrawn.food)/LOOP_ECONOMY_RULES.pickupStock*LOOP_ECONOMY_RULES.pickupGold);
  assert.equal(result.stats.goldReserved-result.stats.goldPaid-result.stats.goldRefunded,escrowGold,'reserved fares are spent, refunded, or remain aboard');
  assert.equal(result.owners.reduce((sum,owner)=>sum+owner.gold,0)+escrowGold,games.length*LOOP_ECONOMY_RULES.startGold,'trading conserves every opening coin across players, villages and trains');
  for(const resource of ['resources','food']){
    assert.equal(result.stats.pickups[resource],result.stats.delivered[resource]+aboard[resource],'loaded goods are delivered or remain aboard');
    assert.equal(result.stats.pickups[resource],result.stats.withdrawn[resource]+result.stats.minted[resource],'only the explicit loading bonus creates resources');
  }
  const villages=result.cities.filter(city=>city.neutral),foodStock=villages.reduce((sum,city)=>sum+city.foodStock,0);
  assert.equal(foodStock,result.stats.produced.food-result.stats.withdrawn.food,'each village supplies only food that was actually harvested');
  assert.equal(result.owners.filter(owner=>owner.neutral).reduce((sum,owner)=>sum+owner.food,0),foodStock,'neutral wallet summaries do not duplicate village stock');
  assert.equal(result.owners.reduce((sum,owner)=>sum+owner.food,0)+aboard.food,games.length*LOOP_ECONOMY_RULES.startFood+result.stats.produced.food+result.stats.minted.food-result.stats.construction.food,'all Food is in a wallet, aboard, or consumed by construction');
  assert.ok(result.owners.some(owner=>owner.neutral&&owner.gold>0),'farm villages retain the coins paid for their Food');
  for(const owner of result.owners){
    assert.ok(Number.isSafeInteger(owner.gold)&&owner.gold>=0);assert.ok(owner.resources>=0&&owner.food>=0);
    assert.equal('resourceDebt' in owner,false);assert.equal('upkeep' in owner,false);
  }
  assert.equal(session.player.logs,LOOP_ECONOMY_RULES.startResources+10,'the starter earns ten daytime production ticks across fifteen minutes');
  assert.equal(session.player.food,LOOP_ECONOMY_RULES.startFood);
  assert.equal(session.player.gold,LOOP_ECONOMY_RULES.startGold,'an unconnected player pays no fares and earns no supplier coins');
  coordinator.dispose();
});
