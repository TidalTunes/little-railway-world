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

test('island bot economies form, trade and grow under ordinary costs with conserved resources',()=>{
  const world=generateWorld(createSettlementWorld({economy:true}),{detail:'network'});
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
  const games=[session.player,...session.bots.map(entry=>entry.game)],initialGold=economy.snapshot().owners.reduce((sum,owner)=>sum+owner.gold,0);
  for(const game of games)game.setEconomy({resourcesAt:point=>economy.resourcesAt(game.ownerId,point),
    spendConstruction:(point,cost)=>economy.spendConstruction(game.ownerId,point,cost)});
  for(const {config,game}of session.bots)bots.push(createPlayerBot(world,game,{config,getPlacements,getRevision:()=>session.revision}));
  let railwayCost=0;
  const coordinator=createEconomicBots(world,{session,bots,railways,economy,onRailBuild(result){
    railwayCost+=result.cost;const data=railways.snapshot();
    infrastructure={revision:data.revision,buildings:data.stations,paths:data.paths,clearedPlacementIds:data.clearedPlacementIds,
      corridors:data.reservations.filter(item=>item.kind==='rail-corridor')};
  }});
  // Nine hundred simulated seconds, no renderer, timers, workers or server.
  for(let elapsed=0;elapsed<900;elapsed+=.5){
    for(const bot of bots)bot.update(.5);economy.update(.5);
    const before=coordinator.stats.validations;coordinator.update(.5);assert.ok(coordinator.stats.validations-before<=1);
  }
  const result=economy.snapshot();
  assert.equal(bots.length,3);assert.ok(bots.every(bot=>bot.game.houses.length>=3));
  assert.ok(bots.some(bot=>bot.game.houses.length>3),'delivered tools support real growth beyond the starter city');
  assert.deepEqual(bots.map(bot=>economy.city(bot.game.cities[0].id).industry),['lumber','workshop','farm']);
  assert.ok(coordinator.stats.routes>=3);assert.ok(result.stats.deliveries>0);assert.ok(result.stats.unitsDelivered>0);
  for(const resource of ['timber','grain','tools']){
    const produced=result.stats.produced[resource]+(resource==='timber'?games.length*12+bots.reduce((sum,bot)=>sum+bot.stats.logsEarned,0):0);
    const spent=result.stats.consumed[resource]+result.stats.construction[resource]+result.stats.industrySpent[resource]+result.stats.discarded[resource];
    const stored=result.cities.reduce((sum,city)=>sum+city.stock[resource],0)+(resource==='timber'?games.reduce((sum,game)=>sum+game.logs,0):0);
    const cargo=result.trains.reduce((sum,train)=>sum+(train.cargo?.resource===resource?train.cargo.quantity:0),0);
    assert.equal(produced-spent,stored+cargo,`${resource} is conserved through harvests, depots, construction and freight`);
  }
  assert.equal(result.owners.reduce((sum,owner)=>sum+owner.gold,0)+result.escrow,initialGold+result.stats.currencyMinted-railwayCost);
  assert.equal(session.player.logs,12);assert.equal(session.player.gold,12,'bots never spend or reward the human wallet');
  coordinator.dispose();
});
