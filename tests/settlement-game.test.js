import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame,SETTLEMENT,settlementTreeId,treeLogYield} from '../src/settlement-game.js';

const flat=()=>({type:'ground',height:0});
const config=()=>({ownerId:'teal',starterHouse:{id:'home-1',x:0,y:0,z:0,rotation:0,kind:'house',scale:1,variant:0,ownerId:'teal'}});
const make=(surfaceAt=flat)=>createSettlementGame({seed:'rules-test',gameplay:config()},{surfaceAt});
const tree=(index,x=20,z=20)=>({id:`tree-${index}`,kind:'tree',x,z,scale:1,radius:.85});
function earn(game,count=5){for(let i=0;i<count;i++)assert.equal(game.chop(tree(`earn-${game.revision}-${i}`)).ok,true);}

test('settlements begin with one owned home, no logs, and independent session state',()=>{
  const input=config(),world={seed:'first',gameplay:input},before=structuredClone(world);
  const game=createSettlementGame(world,{surfaceAt:flat}),other=createSettlementGame(world,{surfaceAt:flat});
  assert.equal(game.logs,0);assert.equal(game.houses.length,1);assert.equal(game.houses[0].ownerId,'teal');
  assert.equal(game.houses[0].connected,true);assert.deepEqual(world,before);
  game.houses[0].x=100;game.snapshot().houses[0].z=100;
  assert.equal(game.houses[0].x,0);assert.equal(game.houses[0].z,0);
  game.chop(tree(0));assert.equal(other.logs,0);assert.equal(other.revision,0);
});

test('a tree has a deterministic 2–4 log reward and can only be chopped once across reloads',()=>{
  const game=make(),yields=new Set();
  for(let i=0;i<50;i++){
    const item=tree(i),before=game.logs,result=game.chop(item);
    assert.equal(result.ok,true);assert.equal(result.logs,treeLogYield('rules-test',item));
    assert.ok(result.logs>=2&&result.logs<=4);yields.add(result.logs);
    assert.equal(result.totalLogs,before+result.logs);
    const revision=game.revision;
    assert.deepEqual(game.chop(structuredClone(item)),{ok:false,code:'already-chopped'});
    assert.equal(game.logs,result.totalLogs);assert.equal(game.revision,revision);
  }
  assert.deepEqual([...yields].sort(),[2,3,4]);
  const removed=game.removedTreeIds;removed.clear();assert.equal(game.isTreeRemoved(tree(0)),true);
  assert.equal(settlementTreeId({x:1,z:2,variant:3}),settlementTreeId({x:1,z:2,variant:3}));
});

test('chopping rejects non-trees and trees outside physical reach without changing resources',()=>{
  const game=make();
  assert.equal(game.chop({kind:'house',x:0,z:0}).ok,false);
  assert.equal(game.chop(tree(0,3,0),{player:{x:0,z:0}}).code,'out-of-reach');
  assert.equal(game.chop(tree(0,1,0),{player:{x:0,z:0}}).ok,true);
  assert.equal(game.revision,1);
});

test('a house costs exactly ten logs, belongs to the player, and repeated overlapping builds cannot spend twice',()=>{
  const game=make(),point={x:4,z:0,rotation:.3};
  assert.equal(game.evaluateBuild(point).code,'not-enough-logs');
  assert.equal(game.evaluateBuild(point).siteValid,true);
  assert.equal(game.build(point).ok,false);assert.equal(game.revision,0);
  earn(game);const before=game.logs,result=game.build(point);
  assert.equal(result.ok,true);assert.equal(game.logs,before-10);
  assert.equal(result.house.ownerId,'teal');assert.equal(result.house.rotation,0,'the city sets the frontage axis');
  assert.equal(result.house.connected,true);assert.equal(game.houses.length,2);
  const after=game.logs,revision=game.revision;
  assert.equal(game.build(point).code,'house-blocked');assert.equal(game.logs,after);assert.equal(game.revision,revision);
});

test('city membership follows the house graph and bridges can join earlier outposts',()=>{
  const game=make();earn(game,25);
  assert.equal(game.evaluateBuild({x:16,z:0}).connected,false);
  assert.equal(game.build({x:16,z:0}).house.connected,false);
  assert.equal(game.evaluateBuild({x:23,z:0}).connected,false,'an unconnected outpost is not the starting city');
  assert.equal(game.build({x:8,z:0}).connected,true);
  assert.equal(game.houses.find(home=>home.x===16).connected,true,'the new middle house joins both ends');
  assert.equal(game.evaluateBuild({x:23,z:0}).connected,true,'membership grows transitively');
  assert.ok(game.houses.every(home=>home.cityId==='settlement'));
});

test('the full rotated footprint rejects water, boundaries and steep terrain even when its center is dry',()=>{
  let game=make((x,z)=>({type:x>5.6?'water':'ground',height:0}));
  assert.equal(game.evaluateBuild({x:5,z:0}).code,'wet-ground');
  const angled=config();angled.starterHouse.rotation=Math.PI/4;
  game=createSettlementGame({seed:'rules-test',gameplay:angled},{surfaceAt:(x,z)=>({type:x>6.3?'outside':'ground',height:0})});
  assert.equal(game.evaluateBuild({x:5,z:0}).code,'wet-ground');
  game=make((x,z)=>({type:'mountain',height:(x-5)*.4}));
  assert.equal(game.evaluateBuild({x:5,z:0}).code,'steep-ground');
  game=make(()=>({type:'mountain',height:2}));earn(game);
  assert.equal(game.build({x:5,z:0}).house.y,2);
  game=make(x=>({type:'ground',height:2+(x-5)*.04}));earn(game);
  const home=game.build({x:5,z:0}).house;
  assert.ok(Math.abs(home.y-(2-1.1*.04))<1e-9,'foundation seats at the downhill edge');
  assert.ok(home.y+.14>2+1.1*.04,'its top remains above the uphill edge');
});

test('blueprints reject unloaded ground, distant locations and the player footprint',()=>{
  const game=make();earn(game);
  assert.equal(game.evaluateBuild({x:5,z:0},{ready:false}).code,'loading');
  assert.equal(game.evaluateBuild({x:9,z:0},{player:{x:0,z:0}}).code,'out-of-reach');
  assert.equal(game.evaluateBuild({x:5,z:0},{player:{x:5,z:0}}).code,'player-blocked');
  assert.equal(game.evaluateBuild({x:5,z:0},{player:{x:2.8,z:0}}).valid,true);
  assert.equal(game.evaluateBuild({x:NaN,z:0}).code,'invalid-position');
  assert.equal(game.evaluateBuild({x:5,z:0,rotation:Infinity}).house.rotation,0,'a caller cannot override the city orientation');
});

test('overview can build at a distance without building over or trapping the persistent traveller',()=>{
  const game=make();earn(game);const player={x:6,z:0},before=game.snapshot();
  const occupied={x:6,z:0},context={player,enforceReach:false};
  assert.equal(game.evaluateBuild(occupied,context).code,'player-blocked');
  assert.equal(game.build(occupied,context).ok,false);
  assert.deepEqual(game.snapshot(),before,'a rejected overview build spends no logs and creates no house');
  assert.equal(game.evaluateBuild({x:30,z:0},{player}).code,'out-of-reach');
  assert.equal(game.evaluateBuild({x:30,z:0},context).valid,true,'overview still permits distant clear sites');
  assert.equal(game.build({x:30,z:0},context).ok,true);
  assert.equal(game.logs,before.logs-SETTLEMENT.houseCost);
});

test('trees, rocks, field footprints and outcrops reserve their whole visible footprint',()=>{
  const game=make();earn(game);const pose={x:5,z:0};
  for(const placement of [tree(0,6.4,0),{kind:'rock',x:6.4,z:0,scale:1},
    {kind:'farm',x:8,z:0,width:5,depth:2,radius:3,rotation:.3,scale:1},
    {kind:'nature',style:'outcrop',x:7,z:0,radius:1.8}])
    assert.equal(game.evaluateBuild(pose,{placements:[placement]}).siteValid,false,placement.kind);
  const grassy={kind:'nature',style:'meadow',x:5,z:0,radius:2};
  assert.equal(game.evaluateBuild(pose,{placements:[grassy]}).valid,true,'small ground cover does not reserve an entire building lot');
});

test('chopped trees stop blocking a site while unchopped neighboring trees remain obstacles',()=>{
  const game=make();earn(game);const pose={x:5,z:0},first=tree(0,5,0),second=tree(1,6,0);
  assert.equal(game.evaluateBuild(pose,{placements:[first]}).code,'tree-blocked');
  game.chop(first);
  assert.equal(game.evaluateBuild(pose,{placements:[first]}).valid,true);
  assert.equal(game.evaluateBuild(pose,{placements:[first,second]}).code,'tree-blocked');
});

test('house spacing uses oriented foundations instead of oversized circular city lots',()=>{
  const game=make();earn(game);
  assert.equal(game.evaluateBuild({x:2.5,z:0}).valid,true);
  assert.equal(game.evaluateBuild({x:2.3,z:0}).code,'house-blocked');
  assert.equal(game.evaluateBuild({x:2.5,z:0,rotation:Math.PI/4}).valid,true,'manual rotation does not change the city-aligned footprint');
  assert.equal(SETTLEMENT.houseCost,10);
});


test('the city axis propagates, its lane joins front doors, and snapshots cannot mutate it',()=>{
  const input=config();input.starterHouse.rotation=Math.PI/2;
  const game=createSettlementGame({seed:'aligned',gameplay:input},{surfaceAt:flat});earn(game);
  const preview=game.evaluateBuild({x:0,z:5,rotation:-.4});
  assert.equal(preview.house.rotation,Math.PI/2);
  assert.ok(preview.path);assert.equal(preview.path.toHouseId,'home-1');
  const result=game.build({x:0,z:5,rotation:-.4});
  assert.equal(result.ok,true);assert.equal(result.house.rotation,Math.PI/2);
  assert.equal(result.paths.length,1);assert.equal(result.paths[0].fromHouseId,result.house.id);
  assert.equal(game.paths[0].points[0].x,.9);
  assert.equal(game.paths[0].points[0].z,5);
  game.paths[0].points[0].x=100;game.snapshot().paths.length=0;
  assert.equal(game.paths[0].points[0].x,.9);assert.equal(game.paths.length,1);
});

test('established lanes stay open and unloaded routes cannot silently become town connections',()=>{
  const game=make();earn(game,12);
  assert.equal(game.evaluateBuild({x:7,z:0},{isReadyAt:p=>p.x<2||p.x>5}).code,'loading');
  assert.equal(game.paths.length,0);
  assert.equal(game.build({x:7,z:0}).ok,true);
  assert.equal(game.paths.length,1);
  assert.equal(game.evaluateBuild({x:3.5,z:1.5}).code,'path-blocked');
  const original=game.snapshot();
  assert.equal(game.build({x:3.5,z:1.5}).ok,false);
  assert.deepEqual(game.snapshot(),original);
});

test('water separating neighbouring plots does not produce an imaginary city connection',()=>{
  const game=make(x=>({type:x>2&&x<3?'water':'ground',height:0}));earn(game);
  const before=game.snapshot(),preview=game.evaluateBuild({x:5,z:0});
  assert.equal(preview.code,'path-blocked');assert.equal(preview.valid,false);
  assert.equal(game.build({x:5,z:0}).ok,false);assert.deepEqual(game.snapshot(),before);
});
