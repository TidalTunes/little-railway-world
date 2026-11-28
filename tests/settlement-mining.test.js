import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame,SETTLEMENT} from '../src/settlement-game.js';
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
    assert.equal(result.resource,'resources');assert.equal(game.resourcesAt().resources,initial+i+1);
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
  assert.ok(cut.ok);assert.ok(cut.amount>=4&&cut.amount<=6);
  assert.equal(game.mine(ore,{player}).ok,true);
  assert.equal(game.resourcesAt().resources,initial+cut.amount+1);
  assert.equal(game.isTreeRemoved(tree),true);assert.equal(game.isTreeRemoved(ore),false);
  assert.equal(game.chop(tree,{player}).code,'already-chopped');
  assert.ok(!('wood' in game.resourcesAt())&&!('metal' in game.resourcesAt()));
});

test('loop house payments spend both wallets and missing food never spends resources or reserves a site',()=>{
  const game=fixture();assert.equal(game.gold,0);assert.equal(game.food,12);
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


test('loop wallets have only Resources and Food and cannot mint or spend coins',()=>{
  const game=fixture(),before=game.snapshot();
  assert.equal(game.creditGold(20).code,'currency-removed');
  assert.equal(game.spendGold(0).code,'currency-removed');
  assert.equal(game.settleIncome(100),null);
  assert.deepEqual(game.snapshot(),before);
  for(const key of ['gold','lastIncomeDay'])assert.equal(key in game.snapshot(),false);
  for(const key of ['gold','resourceDebt','resourceNet','upkeep'])assert.equal(key in game.resourcesAt(),false);
  assert.deepEqual(game.resourcesAt().rates,{resources:0,food:0});
});
