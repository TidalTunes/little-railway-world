import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame,treeLogYield} from '../src/settlement-game.js';
import {createPlayerBot} from '../src/player-bots.js';

const flat=()=>({type:'ground',height:0});
const config=()=>({id:'bot:coral',ownerId:'coral',starterHouse:{id:'home-1',x:0,y:0,z:0,rotation:0},spawn:{x:0,z:2.5}});
function fixture(economic=true){const configuration=config(),world={seed:'economic-rules',gameplay:{...configuration,economy:economic}};
  return {world,configuration,game:createSettlementGame(world,{config:configuration,surfaceAt:flat})};}
const tree=index=>({id:`tree:${index}`,kind:'tree',x:20+index,z:20,scale:1});

test('economy flag applies to every owner, while legacy fixtures retain costs and rewards',()=>{
  const {game,world}=fixture();assert.equal(game.logs,12);assert.equal(game.gold,12);
  assert.deepEqual(game.constructionCost,{timber:8,tools:0});
  const yields=new Set();for(let i=0;i<20;i++){const result=game.chop(tree(i));yields.add(result.logs);assert.equal(result.logs,treeLogYield(world.seed,tree(i),true));}
  assert.deepEqual([...yields].sort(),[4,5,6]);
  const old=fixture(false).game;assert.equal(old.logs,0);assert.equal(old.gold,0);assert.equal(old.constructionCost.timber,10);
  assert.ok(old.chop(tree(1)).logs<=4);
  const before=game.snapshot();assert.equal(game.settleIncome(500),null);assert.deepEqual(game.snapshot(),before);
});

test('the first formed city unlocks the two-tool cost for later eight-timber homes',()=>{
  const {game}=fixture();game.addLogs(20);
  assert.ok(game.build({x:5,z:0}).ok);assert.ok(game.build({x:0,z:5}).ok);
  assert.equal(game.logs,16);assert.deepEqual(game.constructionCost,{timber:8,tools:2});
  const result=game.evaluateBuild({x:150,z:0});assert.equal(result.siteValid,true);assert.equal(result.valid,false);
  assert.equal(result.code,'not-enough-tools');assert.match(result.reason,/2 more tools/);
  assert.equal(game.build({x:150,z:0}).ok,false);assert.equal(game.houses.length,3);assert.equal(game.logs,16);
});

test('three scattered outposts can still be joined before requiring unavailable tools',()=>{
  const {game}=fixture();game.addLogs(32);
  assert.ok(game.build({x:5,z:0}).ok);assert.ok(game.build({x:18,z:0}).ok);
  assert.equal(game.cities.length,0);assert.equal(game.constructionCost.tools,0);
  assert.ok(game.build({x:12,z:0}).ok);assert.equal(game.cities.length,1);
  assert.equal(game.constructionCost.tools,2);
});

test('local adapter payment is atomic and never debited twice or called for an impossible site',()=>{
  const {game}=fixture();let timber=12,tools=0,payments=0,allow=false;
  game.setEconomy({resourcesAt:point=>({timber:point.x<80?timber:0,grain:0,tools}),spendConstruction(point,cost){
    payments++;if(!allow)return {ok:false,code:'resources-changed',reason:'Depot stock changed'};
    timber-=cost.timber;tools-=cost.tools;return {ok:true};
  }});
  const before=game.snapshot();assert.equal(game.build({x:50,z:0}).code,'resources-changed');assert.deepEqual(game.snapshot(),before);
  assert.equal(game.evaluateBuild({x:100,z:0}).code,'not-enough-timber');
  assert.equal(game.build({x:0,z:0}).siteValid,false);assert.equal(payments,1);
  allow=true;assert.ok(game.build({x:50,z:0}).ok);assert.equal(timber,4);assert.equal(game.logs,12,'adapter owns debit, so carried logs are not charged again');
  assert.equal(game.build({x:50,z:0}).ok,false);assert.equal(payments,2);
});

test('integer wallet commands reject overspending and overflow without changing spatial revisions',()=>{
  const {game}=fixture(),layout=game.spatialRevision;
  for(const amount of [-1,NaN,Infinity,1.2,Number.MAX_SAFE_INTEGER+1]){
    assert.equal(game.addLogs(amount).ok,false);assert.equal(game.spendLogs(amount).ok,false);assert.equal(game.creditGold(amount).ok,false);
  }
  assert.equal(game.spendLogs(13).ok,false);assert.equal(game.logs,12);
  assert.ok(game.spendLogs(2).ok);assert.ok(game.addLogs(5).ok);assert.ok(game.creditGold(7).ok);
  assert.equal(game.logs,15);assert.equal(game.gold,19);assert.equal(game.spatialRevision,layout);
  game.addLogs(Number.MAX_SAFE_INTEGER-game.logs);game.creditGold(Number.MAX_SAFE_INTEGER-game.gold);
  const before=game.snapshot();assert.equal(game.addLogs(1).ok,false);assert.equal(game.creditGold(1).ok,false);
  assert.equal(game.chop(tree(0)).code,'resource-overflow');assert.deepEqual(game.snapshot(),before);
});

test('a physical economic builder pauses for tools and resumes using depot timber without harvesting',()=>{
  const {game,world,configuration}=fixture();let stock={timber:80,grain:12,tools:0},paid=0;
  game.setEconomy({resourcesAt:()=>stock,spendConstruction(_point,cost){
    if(stock.timber<cost.timber||stock.tools<cost.tools)return {ok:false};
    stock.timber-=cost.timber;stock.tools-=cost.tools;paid++;return {ok:true};
  }});
  const built=[];const bot=createPlayerBot(world,game,{config:configuration,surfaceAt:flat,policy:{targetHouses:4},getPlacements:()=>[],onBuild:result=>built.push({house:result.house,position:bot.position})});
  for(let i=0;i<180;i++)bot.update(.25);
  assert.equal(game.houses.length,3);assert.equal(bot.stats.trees,0);assert.equal(paid,2);assert.equal(bot.stopped,false);
  stock.tools=2;
  for(let i=0;i<180&&game.houses.length<4;i++)bot.update(.25);
  assert.equal(game.houses.length,4);assert.equal(stock.tools,0);assert.equal(paid,3);assert.equal(game.logs,12);
  assert.equal(bot.stats.trees,0);assert.ok(built.every(({house,position})=>Math.hypot(house.x-position.x,house.z-position.z)<=7),'every placement remains within physical build reach');
});

test('builder policy can wake a finished settlement and sets an explicit timber reserve',()=>{
  const {game,world,configuration}=fixture(false);
  const bot=createPlayerBot(world,game,{config:configuration,surfaceAt:flat,policy:{targetHouses:1},getPlacements:()=>[]});
  bot.update(1);assert.equal(bot.stopped,true);
  bot.setPolicy({targetHouses:2,logReserve:3});assert.equal(bot.stopped,false);bot.update(1);
  assert.equal(game.houses.length,1);assert.equal(game.logs,0);assert.equal(bot.snapshot().policy.logReserve,3);
  assert.throws(()=>bot.setPolicy({logReserve:-1}));assert.throws(()=>bot.setPolicy({targetHouses:Infinity}));
});
