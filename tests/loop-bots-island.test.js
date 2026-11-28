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

test('island loop rivals buy complete directed railway circuits through real physical settlements',()=>{
  const world=generateWorld(createSettlementWorld({economy:'loops'}),{detail:'network'});
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
  for(const train of result.trains)assert.equal(train.backing,false);
  assert.equal(result.owners.reduce((sum,owner)=>sum+owner.gold,0),initialGold+result.stats.currencyMinted-railwayCost-result.stats.trainSpent);
  assert.equal(session.player.logs,42,'the starting resident produces 30 resources in fifteen minutes');assert.equal(session.player.gold,60,'bots never spend or reward the human wallet');
  coordinator.dispose();
});
