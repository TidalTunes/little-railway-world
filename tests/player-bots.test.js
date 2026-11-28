import test from 'node:test';
import assert from 'node:assert/strict';
import {createPlayerBot,PLAYER_BOT} from '../src/player-bots.js';
import {createSettlementGame,treeLogYield} from '../src/settlement-game.js';
import {createSettlementSession} from '../src/settlement-session.js';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {preparePlayerBotScenery} from '../src/player-bot-world.js';

const flat=()=>({type:'ground',height:0});
const configuration=()=>({id:'bot:coral',ownerId:'coral',idPrefix:'bot:coral:',
  starterHouse:{id:'bot:coral:home-1',kind:'house',ownerId:'coral',x:0,y:0,z:0,rotation:0},spawn:{x:0,z:2.5,heading:0}});
function fixture({scenery=[],surfaceAt=flat,...options}={}){
  const config=configuration(),world={seed:'bot-test',gameplay:config};
  const game=createSettlementGame(world,{config,surfaceAt});
  const bot=createPlayerBot(world,game,{config,surfaceAt,getPlacements:()=>scenery,...options});
  return{bot,game,world};
}
function grove(){
  const trees=[];
  for(let x=-20;x<=20;x+=3.5)for(let z=-20;z<=20;z+=3.5){
    if(Math.hypot(x,z)>5)trees.push({id:`tree:${x}:${z}`,kind:'tree',x,z,scale:1,radius:.85});
  }
  return trees;
}

test('player bots never invent timber or buildings when the world has no trees',()=>{
  const {bot,game}=fixture();
  for(let i=0;i<120;i++)bot.update(1);
  assert.equal(game.logs,0);assert.equal(game.houses.length,1);
  assert.equal(bot.stats.trees,0);assert.equal(bot.stats.houses,0);
  assert.equal(bot.stopped,false);assert.deepEqual(bot.position,{x:0,y:.035,z:2.5});
});

test('bots physically route around water and strike a real tree within axe reach',()=>{
  const tree={id:'reachable-tree',kind:'tree',x:0,z:8,scale:1,radius:.85};
  const surfaceAt=(x,z)=>({height:0,type:Math.abs(x)<1&&z>4.6&&z<5.4?'water':'ground'});
  const hits=[];let clock=0;
  const {bot,game,world}=fixture({scenery:[tree],surfaceAt,onChop:(result,target,position)=>hits.push({result,target,position,clock})});
  let previous=bot.position,swingStarted=null,planningSeen=false;
  for(let i=0;i<1200&&!hits.length;i++){
    const previousNodes=bot.stats.routeNodes;
    clock+=1/60;bot.update(1/60);
    assert.ok(bot.stats.routeNodes-previousNodes<=PLAYER_BOT.routeNodeBudget,'a route search yields after its per-frame node budget');
    planningSeen ||= bot.state==='planning';
    const snapshot=bot.snapshot(),position=bot.position;
    assert.ok(Math.hypot(position.x-previous.x,position.z-previous.z)<=PLAYER_BOT.speed/60+1e-7,'walking never teleports');
    assert.equal(surfaceAt(position.x,position.z).type,'ground','a route never walks through water');
    if(snapshot.state==='chopping'&&swingStarted===null)swingStarted=clock;
    previous=position;
  }
  assert.equal(hits.length,1);assert.equal(hits[0].target.id,tree.id);
  assert.ok(Math.hypot(hits[0].position.x-tree.x,hits[0].position.z-tree.z)<=1.1);
  assert.ok(hits[0].clock-swingStarted>=PLAYER_BOT.swingImpact-.02,'reward waits for the axe impact');
  assert.equal(game.logs,treeLogYield(world.seed,tree));assert.equal(game.isTreeRemoved(tree),true);
  assert.ok(bot.stats.routeSearches>0);assert.ok(planningSeen);assert.equal(bot.stats.blocked,0);
});

test('one bot earns every house, grows one city with five landmarks, then becomes inert',()=>{
  const scenery=grove(),builds=[],hits=[];
  const {bot,game}=fixture({scenery,onBuild:result=>builds.push(result),onChop:result=>hits.push(result)});
  for(let elapsed=0;elapsed<600&&!bot.stopped;elapsed+=.5)bot.update(.5);
  assert.equal(bot.stopped,true);assert.equal(game.houses.length,15);assert.equal(builds.length,14);
  assert.equal(game.cities.length,1);assert.equal(game.cities[0].level,5);assert.equal(game.cities[0].houseCount,15);
  assert.deepEqual(game.buildings.map(item=>item.buildingType).sort(),['hall','market','plaza','waterTower','well']);
  assert.ok(game.houses.every(home=>home.connected&&home.ownerId==='coral'));
  assert.equal(game.logs,hits.reduce((sum,hit)=>sum+hit.logs,0)-140);
  assert.equal(new Set(hits.map(hit=>hit.treeId)).size,hits.length,'a tree pays at most once');
  assert.ok(hits.every(hit=>hit.logs>=2&&hit.logs<=4));
  const frozen=bot.snapshot(),saved=game.snapshot();bot.update(60);
  assert.deepEqual(bot.snapshot(),frozen);assert.deepEqual(game.snapshot(),saved,'a finished city neither chops nor builds');
});

test('bot construction respects the same two-second build pause',()=>{
  let builds=0;
  const {bot}=fixture({scenery:grove(),onBuild:()=>builds++});
  for(let i=0;i<2000&&!builds;i++)bot.update(1/60);
  assert.equal(builds,1);assert.equal(bot.state,'construction');
  const position=bot.position;bot.update(1.8);
  assert.equal(bot.state,'construction');assert.deepEqual(bot.position,position);assert.equal(builds,1);
  bot.update(.4);assert.notEqual(bot.state,'construction');
});

test('the real island completes three independent offscreen level-five cities without player income or duplicate harvests',()=>{
  const world=generateWorld(createSettlementWorld({economy:false}),{detail:'network'});
  preparePlayerBotScenery(world,generateWorldRegion);
  const bots=[],session=createSettlementSession(world,{getActors:()=>bots.map(bot=>bot.position)});
  const village=world.gameplay.farmVillages,permanent=[...world.gameplay.botScenery,...village.houses,...village.buildings];
  let lastRevision=-1,placements=[];const harvested=[];
  function getPlacements(){if(lastRevision!==session.revision){lastRevision=session.revision;placements=[...permanent,...session.buildings];}return placements;}
  for(const {config,game} of session.bots)bots.push(createPlayerBot(world,game,{config,getPlacements,
    getRevision:()=>session.revision,onChop:result=>harvested.push(result)}));
  const playerBefore=session.player.snapshot();
  for(let elapsed=0;elapsed<600&&!bots.every(bot=>bot.stopped);elapsed+=.5)bots.forEach(bot=>bot.update(.5));
  assert.equal(bots.length,3);assert.ok(bots.every(bot=>bot.stopped));
  for(const bot of bots){
    assert.equal(bot.game.houses.length,15);assert.equal(bot.game.cities.length,1);assert.equal(bot.game.cities[0].level,5);
    assert.equal(bot.game.buildings.length,5);assert.equal(bot.stats.blocked,0,'default paths remain physically clear');
    assert.ok(bot.stats.distance>100);assert.ok(bot.stats.trees>=35);assert.ok(bot.stats.routeNodes<20000,'routing stays bounded');
    assert.equal(bot.game.logs,bot.stats.logsEarned-140);
  }
  assert.equal(new Set(harvested.map(hit=>hit.treeId)).size,harvested.length,'competing settlers cannot harvest the same world tree');
  assert.deepEqual(session.player.houses,playerBefore.houses);assert.equal(session.player.logs,0);assert.equal(session.player.gold,0);
  assert.equal(session.player.settleIncome(1).amount,0,'foreign cities never contribute to the player account');
  assert.equal(new Set(session.buildings.map(building=>building.id)).size,session.buildings.length,'all ownership namespaces are unique');
});

test('polar travellers move and harvest in physical surface units rather than stretched chart units',async()=>{
  const{surfaceOffset,surfaceDistance}=await import('../src/world-surface.js');
  const world={seed:'polar-worker',surface:{type:'sphere',radius:180,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:180,centralLongitude:0,centralLatitude:0}}};
  const anchor={x:100,z:-180*Math.PI/180*75},tree={id:'polar-tree',kind:'tree',...surfaceOffset(world,anchor.x,anchor.z,5,5),scale:1};
  const config={...configuration(),starterHouse:{...configuration().starterHouse,...anchor},spawn:{...surfaceOffset(world,anchor.x,anchor.z,0,2.5),heading:0}};world.gameplay=config;
  const game=createSettlementGame(world,{config,surfaceAt:flat}),hits=[],bot=createPlayerBot(world,game,{config,surfaceAt:flat,getPlacements:()=>[tree],onChop:(result,target,position)=>hits.push({result,target,position})});
  for(let i=0;i<1500&&!hits.length;i++){const before=bot.position;bot.update(1/60);assert.ok(surfaceDistance(world,before,bot.position)<=PLAYER_BOT.speed/60+1e-6);}
  assert.equal(hits.length,1);assert.ok(surfaceDistance(world,tree,hits[0].position)<=1.1);assert.ok(bot.stats.distance>2);assert.ok(game.isTreeRemoved(tree));
  game.addLogs(100);for(let i=0;i<1800&&game.houses.length<2;i++)bot.update(1/60);assert.ok(game.houses.length>=2,'the same worker places a physically sized home at high latitude');
});

test('a TPS role change cancels an in-flight physical task before it can harvest or build',()=>{
  let role='hybrid';const{bot,game}=fixture({scenery:[{id:'tree',kind:'tree',x:0,z:8,scale:1}],getRole:()=>role,coarseUpdates:true});
  for(let i=0;i<100&&bot.state!=='walking';i++)bot.update(.1);assert.equal(bot.state,'walking');const before=bot.position;
  role='tps';bot.update(1);assert.equal(bot.state,'tps');assert.deepEqual(bot.position,before);assert.equal(game.logs,0);assert.equal(game.houses.length,1);
  role='hybrid';for(let i=0;i<200&&!game.isTreeRemoved('tree');i++)bot.update(.1);assert.ok(game.isTreeRemoved('tree'));
});

test('coarse simulation retains elapsed time while yielding one bounded planning slice per scheduled visit',()=>{
  const{bot}=fixture({scenery:[{id:'tree',kind:'tree',x:0,z:8,scale:1}],coarseUpdates:true,surfaceAt:(x,z)=>({height:0,type:Math.abs(x)<1&&z>4.6&&z<5.4?'water':'ground'})});
  for(let i=0;i<30;i++){const before=bot.stats.routeNodes;bot.update(.6);assert.ok(bot.stats.routeNodes-before<=PLAYER_BOT.routeNodeBudget);}
  assert.ok(Math.abs(bot.snapshot().elapsed-18)<1e-8);assert.ok(bot.stats.routeSearches>0);
});
