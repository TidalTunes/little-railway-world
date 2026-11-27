import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame} from '../src/settlement-game.js';
import {createPlayerBot,PLAYER_BOT} from '../src/player-bots.js';
import {createEconomicBots} from '../src/economic-bots.js';
import {createSettlementEconomy} from '../src/settlement-economy.js';

const flat=()=>({type:'ground',height:0});
function fixture(profile='industrialist'){
  const config={id:'worker',ownerId:'coral',economicProfile:profile,starterHouse:{id:'home-1',x:0,y:0,z:0,rotation:0},spawn:{x:0,z:24}};
  const world={seed:'depot-worker',gameplay:{...config,economy:true}};
  const game=createSettlementGame(world,{surfaceAt:flat});game.addLogs(20);
  assert.ok(game.build({x:5,z:0}).ok);assert.ok(game.build({x:0,z:5}).ok);
  const session={player:game,bots:[],get revision(){return game.spatialRevision;},get spatialRevision(){return game.spatialRevision;}};
  const railways={revision:0,maxConnectionDistance:140,snapshot:()=>({revision:0,cities:game.cities,stations:[],lines:[],connections:[]})};
  const economy=createSettlementEconomy(world,{session,railways}),cityId=game.cities[0].id;
  if(profile==='industrialist')assert.ok(economy.setIndustry(cityId,'workshop',game.ownerId).ok);
  game.setEconomy({resourcesAt:point=>economy.resourcesAt(game.ownerId,point),spendConstruction:(point,cost)=>economy.spendConstruction(game.ownerId,point,cost)});
  const trees=[{x:3,z:24},{x:-3,z:26},{x:5,z:28},{x:-5,z:29}].map((point,index)=>({...point,id:`tree:${index}`,kind:'tree',scale:1}));
  const bot=createPlayerBot(world,game,{config,surfaceAt:flat,getPlacements:()=>trees});
  const deposits=[],transfer=economy.depositTimber;
  economy.depositTimber=(owner,point,amount)=>{const result=transfer(owner,point,amount);if(result.ok)deposits.push({owner,point,amount});return result;};
  const coordinator=createEconomicBots(world,{session,bots:[bot],railways,economy});
  function step(dt=1/30){const before=bot.position;bot.update(dt);coordinator.update(dt);
    assert.ok(Math.hypot(bot.position.x-before.x,bot.position.z-before.z)<=PLAYER_BOT.speed*dt+1e-6,'depot travel never teleports');}
  return {game,bot,economy,coordinator,cityId,deposits,step};
}

test('workshop gathers a bounded reserve at eight stock, walks home, and deposits real timber',()=>{
  const f=fixture();assert.ok(f.economy.depositTimber(f.game.ownerId,{x:0,z:0},8).ok);
  f.deposits.length=0;f.game.spendLogs(f.game.logs);
  for(let frame=0;frame<6000&&!f.deposits.length;frame++){
    const far=f.game.houses.every(home=>Math.hypot(home.x-f.bot.position.x,home.z-f.bot.position.z)>10);
    if(far)assert.equal(f.economy.city(f.cityId).stock.timber,8,'remote chopping cannot credit the depot');
    f.step();
  }
  assert.equal(f.deposits.length,1);assert.ok(f.bot.stats.trees>=1);assert.ok(f.bot.stats.trees<=3);
  const deposit=f.deposits[0];assert.equal(deposit.owner,f.game.ownerId);
  assert.ok(f.game.houses.some(home=>Math.hypot(home.x-deposit.point.x,home.z-deposit.point.z)<1.6),'handoff occurs at an actual owned doorstep');
  assert.equal(f.economy.city(f.cityId).stock.timber,14);assert.equal(f.bot.stats.logsDeposited,6);
  assert.equal(f.game.logs+6,f.bot.stats.logsEarned,'the entire supply comes from physically chopped trees');
  const harvested=f.bot.stats.trees;
  for(let frame=0;frame<600;frame++)f.step();
  assert.equal(f.bot.stats.trees,harvested,'a stocked workshop does not keep clearing the forest');
  f.economy.update(20);assert.ok(f.economy.city(f.cityId).stock.tools>0,'deposited timber actually feeds workshop production');
  f.coordinator.dispose();
});

test('other profiles deliver only surplus, preserve eight carried timber, and stop at full capacity',()=>{
  const f=fixture('merchant');f.game.addLogs(4);
  for(let frame=0;frame<6000&&!f.deposits.length;frame++)f.step();
  assert.equal(f.deposits.length,1);assert.equal(f.game.logs,8);assert.equal(f.deposits[0].amount,12);assert.equal(f.bot.stats.trees,0);
  const city=f.economy.city(f.cityId),room=city.capacity-city.stock.timber;
  f.game.addLogs(room);assert.ok(f.economy.depositTimber(f.game.ownerId,{x:0,z:0},room).ok);
  f.game.addLogs(12);const before=f.deposits.length;
  for(let frame=0;frame<600;frame++)f.step();
  assert.equal(f.deposits.length,before);assert.equal(f.game.logs,20);assert.equal(f.bot.stats.trees,0);
  f.coordinator.dispose();
});
