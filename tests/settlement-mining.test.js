import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame,SETTLEMENT} from '../src/settlement-game.js';
import {LOOP_ECONOMY_RULES as RULES} from '../src/loop-economy-rules.js';
import {isMineableOre} from '../src/harvestable-ore.js';

const ore={id:'ore:owner:teal:0',kind:'rock',workKind:'ore',resource:'resources',x:5,y:0,z:5};
const player={x:5,y:.035,z:4};
function fixture(shared){
  const world={seed:'mine-test',gameplay:{economy:'loops',ownerId:'teal',starterHouse:{id:'home-1',x:0,y:0,z:0,rotation:0}}};
  return createSettlementGame(world,{surfaceAt:()=>({type:'ground',height:0}),shared});
}

test('ore swings award exactly one shared construction resource without consuming scenery',()=>{
  const game=fixture(),initial=game.logs,spatial=game.spatialRevision;
  for(let i=0;i<8;i++){
    const result=game.mine(ore,{player});assert.equal(result.ok,true);assert.equal(result.amount,1);
    assert.equal(result.resource,'resources');assert.equal(game.resourcesAt().resources,initial+i+1);game.updateHarvesting(RULES.miningSeconds);
  }
  assert.deepEqual(game.constructionCost,{resources:8,food:2});
  assert.equal(game.population,1);assert.equal(game.spatialRevision,spatial);assert.equal(game.removedTreeIds.size,0);
  const built=game.build({x:5,z:0});assert.equal(built.ok,true);
  assert.equal(game.resourcesAt().resources,initial);assert.equal(game.population,2);
});

test('mining rejects decoration, distant or cleared deposits, invalid positions and overflow atomically',()=>{
  let cleared=false;const game=fixture({isSceneryRemoved:()=>cleared}),before=game.snapshot();
  assert.equal(isMineableOre({...ore,workKind:undefined}),false);
  for(const target of [{...ore,resource:undefined},{...ore,kind:'tree'},{...ore,id:''},{...ore,x:NaN}])assert.equal(game.mine(target,{player}).ok,false);
  for(const position of [undefined,{x:NaN,z:5},{x:5,z:5+SETTLEMENT.mineReach+.01},{x:5,y:3,z:4}])assert.equal(game.mine(ore,{player:position}).code,'out-of-reach');
  cleared=true;assert.equal(game.mine(ore,{player}).code,'deposit-cleared');assert.deepEqual(game.snapshot(),before);
  cleared=false;game.addLogs(Number.MAX_SAFE_INTEGER-game.logs);const full=game.snapshot();
  assert.equal(game.mine(ore,{player}).code,'resource-overflow');assert.deepEqual(game.snapshot(),full);
});

test('a forest tree and desert ore feed the same balance while only player chopping removes a node',()=>{
  const game=fixture(),tree={id:'tree:near',kind:'tree',x:5,y:0,z:5};
  const initial=game.resourcesAt().resources,cut=game.chop(tree,{player});
  assert.ok(cut.ok);assert.equal(cut.amount,1);
  assert.equal(game.mine(ore,{player}).ok,true);
  assert.equal(game.resourcesAt().resources,initial+cut.amount+1);
  assert.equal(game.isTreeRemoved(tree),true);assert.equal(game.isTreeRemoved(ore),false);
  assert.equal(game.chop(tree,{player}).code,'already-chopped');
  assert.ok(!('wood' in game.resourcesAt())&&!('metal' in game.resourcesAt()));
});

test('loop house payments spend both wallets and missing food never spends resources or reserves a site',()=>{
  const game=fixture();assert.equal(game.gold,50);assert.equal(game.food,12);
  game.spendFood(11);const before=game.snapshot();
  const rejected=game.build({x:5,z:0});assert.equal(rejected.code,'not-enough-food');assert.equal(rejected.siteValid,true);
  assert.deepEqual(game.snapshot(),before);
  game.addFood(1);assert.ok(game.build({x:5,z:0}).ok);
  assert.equal(game.food,0);assert.equal(game.logs,32);assert.equal(game.population,2);
  for(const amount of [-1,NaN,Infinity,.5,Number.MAX_SAFE_INTEGER+1]){
    assert.equal(game.spendFood(amount).ok,false);assert.equal(game.addFood(amount).ok,false);
  }
  assert.equal(game.spendFood(1).ok,false);assert.equal(game.food,0);
});


test('loop wallets retain finite Gold payments without passive house income or upkeep',()=>{
  const game=fixture(),before=game.snapshot();
  assert.equal(game.gold,50);assert.equal(game.resourcesAt().gold,50);
  assert.equal(game.settleIncome(100),null);
  assert.deepEqual(game.snapshot(),before);
  assert.equal(game.spendGold(3).ok,true);assert.equal(game.gold,47);
  assert.equal(game.creditGold(1).ok,true);assert.equal(game.resourcesAt().gold,48);
  const paid=game.snapshot();
  assert.equal(game.spendGold(49).code,'not-enough-gold');
  assert.equal(game.spendGold(0).code,'invalid-cost');
  assert.equal(game.creditGold(-1).code,'invalid-credit');
  assert.deepEqual(game.snapshot(),paid);
  assert.equal('lastIncomeDay' in game.snapshot(),false);
  for(const key of ['resourceDebt','resourceNet','upkeep'])assert.equal(key in game.resourcesAt(),false);
  assert.deepEqual(game.resourcesAt().rates,{resources:0,food:0,gold:0});
});


test('mining uses one cooldown per player, immune to click spam, cloned targets, and aim changes',()=>{
  const game=fixture(),other=fixture(),initial=game.logs;
  assert.equal(game.miningProgress,1);assert.ok(game.mine(ore,{player}).ok);assert.equal(game.miningCooldown,1.2);assert.equal(game.miningProgress,0);
  const before=game.snapshot();
  for(let i=0;i<100;i++){
    const target={...ore,id:i%2?'another-deposit':ore.id};
    const result=game.mine(target,{player});assert.equal(result.code,'mining-cooldown');assert.equal(result.remainingSeconds,1.2);
  }
  assert.deepEqual(game.snapshot(),before);assert.equal(game.logs,initial+1);assert.ok(other.mine(ore,{player}).ok,'other owners have independent work timers');
  for(const dt of [0,-1,NaN,Infinity])game.updateHarvesting(dt);
  assert.equal(game.miningCooldown,1.2);game.updateHarvesting(.6);assert.ok(Math.abs(game.miningProgress-.5)<1e-8);
  assert.equal(game.mine({...ore,id:'other'},{player}).code,'mining-cooldown');
  game.updateHarvesting(.599);assert.equal(game.mine(ore,{player}).code,'mining-cooldown');
  game.updateHarvesting(.001);assert.ok(game.mine(ore,{player}).ok);assert.equal(game.logs,initial+2);
  game.updateHarvesting(20);assert.equal(game.miningCooldown,0);assert.equal(game.logs,initial+2,'time alone never produces ore rewards');
});

test('failed mining does not start a cooldown and work timers are frame independent',()=>{
  const a=fixture(),b=fixture();assert.equal(a.mine(ore,{player:{x:100,z:100}}).ok,false);assert.equal(a.miningProgress,1);
  for(const game of [a,b])assert.ok(game.mine(ore,{player}).ok);
  a.updateHarvesting(1.2);for(let i=0;i<72;i++)b.updateHarvesting(1/60);
  assert.ok(a.mine(ore,{player}).ok);assert.ok(b.mine(ore,{player}).ok);assert.deepEqual(a.snapshot(),b.snapshot());
});
