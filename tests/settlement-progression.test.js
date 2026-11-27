import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame,SETTLEMENT} from '../src/settlement-game.js';
import {SETTLEMENT_MILESTONES,settlementMilestone,settlementCenter} from '../src/settlement-progression.js';
import {settlementHouseRotation,settlementDoor,houseBlocksSettlementPath,sampleSettlementPath} from '../src/settlement-paths.js';
import {farmFootprintsOverlap} from '../src/farm-footprints.js';

const flat=()=>({type:'ground',height:0});
const tree=(id,x=100,z=100,radius=.85)=>({id,kind:'tree',x,z,radius});
const make=(surfaceAt=flat)=>createSettlementGame({seed:'progression',gameplay:{ownerId:'teal',starterHouse:{id:'home-1',kind:'house',x:0,y:0,z:0,rotation:0,scale:1}}},{surfaceAt});
const earn=(game,count=80)=>{for(let i=0;i<count;i++)game.chop(tree(`earn-${i}`));};
const footprint=item=>({...item,width:item.width??2.2,depth:item.depth??2.2});
function finish(game,context={}){let passes=0,result;do{result=game.develop(context);assert.ok(++passes<=100,'search converges without another user action');}while(result.searching);return result;}
function assertFrontFaces(home,center){
  const length=Math.hypot(center.x-home.x,center.z-home.z);
  assert.ok(Math.abs(Math.sin(home.rotation)-(center.x-home.x)/length)<1e-9);
  assert.ok(Math.abs(Math.cos(home.rotation)-(center.z-home.z)/length)<1e-9);
}

function blockedCivicTown(surfaceAt=flat){
  const game=make(surfaceAt);earn(game);const restricted={isReadyAt:point=>Math.abs(point.z)<2.1&&point.x>=-1.4&&point.x<=11.4};
  assert.equal(game.build({x:5,z:0},restricted).ok,true);assert.equal(game.build({x:10,z:0},restricted).ok,true);finish(game,restricted);
  const placements=game.houses.flatMap((home,index)=>Array.from({length:12},(_,i)=>({kind:'tree',id:`ring-${index}-${i}`,
    x:home.x+Math.sin(i/12*Math.PI*2)*1.8,z:home.z+Math.cos(i/12*Math.PI*2)*1.8,radius:.3})));
  return {game,placements};
}

test('milestone specifications are shared, immutable, and have full art and collision envelopes',()=>{
  assert.deepEqual(SETTLEMENT_MILESTONES.map(({type,houses})=>[type,houses]),[
    ['well',3],['market',5],['clock',8],['hall',12],['waterTower',16],['plaza',20],['library',24],['guildhall',30],['chapel',36],
  ]);
  for(const spec of SETTLEMENT_MILESTONES){
    assert.equal(settlementMilestone(spec.type),spec);assert.ok(Object.isFrozen(spec));
    assert.ok(spec.collisionWidth<=spec.width&&spec.collisionDepth<=spec.depth);
    assert.ok(spec.doorOffset<=spec.depth/2&&spec.height>0);
  }
  assert.equal(settlementMilestone('missing'),null);
});

test('frontages face arbitrary city centroids and retain a stable yaw at an exact zero vector',()=>{
  const homes=[{x:-3,z:-2,rotation:.37},{x:7,z:2,rotation:1},{x:2,z:9,rotation:-1}];
  const center=settlementCenter({},homes);assert.deepEqual(center,{x:2,z:3});
  for(const point of [{x:10,z:8},{x:-6,z:5},{x:-2,z:-9},{x:1,z:12}]){
    const rotation=settlementHouseRotation({},point,homes);assertFrontFaces({...point,rotation},center);
  }
  assert.equal(settlementHouseRotation({},center,homes),.37);
});

test('new homes use their connected city, exclude distant outposts and civic structures, and never rotate old homes',()=>{
  const game=make();earn(game);
  assert.equal(game.build({x:5,z:0}).ok,true);
  const before=game.houses;
  assert.equal(game.build({x:40,z:40}).ok,true);
  const point={x:5,z:5},preview=game.evaluateBuild(point);assertFrontFaces(preview.house,{x:2.5,z:0});
  assert.equal(game.build(point).ok,true);
  for(const old of before)assert.equal(game.houses.find(home=>home.id===old.id).rotation,old.rotation);
  assert.equal(game.buildings.length,1,'three connected homes unlock the well despite a separate outpost');
  const connected=game.houses.filter(home=>home.connected),center=settlementCenter({},connected);
  const next=game.evaluateBuild({x:-5,z:5});assertFrontFaces(next.house,center);
  assert.equal(game.houses.find(home=>home.x===40).connected,false);
});

test('exact thresholds add one free civic building each, with paths and preserved house counts',()=>{
  const game=make();earn(game,160);const startingLogs=game.logs,lastMilestone=SETTLEMENT_MILESTONES.at(-1).houses;
  for(let index=1;index<lastMilestone;index++){
    const oldHomes=game.houses,result=game.build({x:index*5,z:0});assert.equal(result.ok,true);
    finish(game);
    assert.equal(game.houses.length,index+1);
    assert.equal(game.logs,startingLogs-index*SETTLEMENT.houseCost,'civic development never consumes extra logs');
    const eligible=SETTLEMENT_MILESTONES.filter(spec=>spec.houses<=index+1);
    assert.deepEqual(game.buildings.map(building=>building.buildingType),eligible.map(spec=>spec.type));
    for(const old of oldHomes)assert.equal(game.houses.find(home=>home.id===old.id).rotation,old.rotation);
  }
  const built=game.buildings;assert.equal(game.paths.length,lastMilestone-1+SETTLEMENT_MILESTONES.length);
  for(const building of built){
    const spec=settlementMilestone(building.buildingType);
    assert.equal(building.kind,'civic');assert.equal(building.ownerId,'teal');assert.equal(building.connected,true);
    assert.equal(building.width,spec.width);assert.equal(building.depth,spec.depth);assert.equal(building.height,spec.height);
    const path=game.paths.find(path=>path.fromHouseId===building.id);assert.ok(path);
    const door=settlementDoor({},building);assert.ok(Math.hypot(path.points[0].x-door.x,path.points[0].z-door.z)<1e-9);
    for(const other of [...game.houses,...built])if(other.id!==building.id)
      assert.equal(farmFootprintsOverlap({},footprint(building),footprint(other),SETTLEMENT.clearance),false);
    for(const otherPath of game.paths)if(otherPath.fromHouseId!==building.id&&otherPath.toHouseId!==building.id)
      assert.equal(houseBlocksSettlementPath({},building,otherPath),false,'bonus structures respect existing lanes');
  }
  const before=game.snapshot();for(let i=0;i<4;i++)finish(game);
  assert.deepEqual(game.snapshot(),before,'retries never duplicate milestones or alter resources');
  game.buildings[0].width=999;game.snapshot().buildings.length=0;assert.equal(game.buildings.length,SETTLEMENT_MILESTONES.length);assert.equal(game.buildings[0].width,2.2);
});

test('an earned building waits for a blocked site, then safely appears after that tree is cleared',()=>{
  // Two narrow town streets and one small civic clearing, with water elsewhere.
  const terrain=(x,z)=>({type:(x>=-1.4&&x<=11.4&&Math.abs(z)<2.1)||(Math.abs(x-5)<1.3&&z>1.5&&z<4.9)?'ground':'water',height:0});
  const game=make(terrain);earn(game);const blocker=tree('clearing-tree',5,3.6,.9),placements=[blocker],context={placements};
  assert.equal(game.build({x:5,z:0},context).ok,true);assert.equal(game.build({x:10,z:0},context).ok,true);finish(game,context);
  assert.deepEqual(game.pendingMilestones,['well']);assert.equal(game.buildings.length,0);
  const original=game.houses,logs=game.logs,revision=game.revision;
  assert.equal(game.develop(context).buildings.length,0);assert.equal(game.revision,revision);
  const reward=game.chop(blocker).logs;
  const occupied={placements,player:{x:5,z:3.6}};finish(game,occupied);
  assert.equal(game.buildings.length,0,'the player cannot be enclosed by an automatic building');
  finish(game,{placements,player:{x:20,z:20}});
  assert.equal(game.buildings.length,1);assert.deepEqual(game.pendingMilestones,[]);
  assert.equal(game.logs,logs+reward);assert.deepEqual(game.houses,original);
  assert.equal(game.isTreeRemoved(blocker),true);
});

test('unloaded civic ground stays pending and later streaming retries preserve the unlocked reward',()=>{
  const game=make();earn(game);const placements=[];
  const limited={placements,isReadyAt:point=>Math.abs(point.z)<2.1&&point.x>=-1.4&&point.x<=11.4};
  assert.equal(game.build({x:5,z:0},limited).ok,true);assert.equal(game.build({x:10,z:0},limited).ok,true);finish(game,limited);
  assert.equal(game.buildings.length,0);assert.deepEqual(game.pendingMilestones,['well']);
  const before=game.logs;finish(game,{placements,isReadyAt:()=>true});
  assert.equal(game.buildings.length,1);assert.equal(game.logs,before);
});

test('outpost houses do not trigger city development until an actual connecting route joins them',()=>{
  const game=make();earn(game);
  assert.equal(game.build({x:16,z:0}).ok,true);assert.equal(game.build({x:23,z:0}).ok,true);
  assert.equal(game.houses.length,3);assert.equal(game.buildings.length,0);assert.deepEqual(game.pendingMilestones,[]);
  const preview=game.evaluateBuild({x:8,z:0});assertFrontFaces(preview.house,{x:13,z:0});
  assert.equal(game.build({x:8,z:0}).ok,true);finish(game);
  assert.ok(game.houses.every(home=>home.connected));assert.deepEqual(game.buildings.map(building=>building.buildingType),['well']);
});


test('bounded civic searches resume rather than repeating blocked routes, then stop after a complete pass',()=>{
  const {game,placements}=blockedCivicTown();
  const context={placements},revision=game.revision;
  const first=game.develop(context);assert.equal(first.searching,true);assert.equal(game.developmentSearching,true);
  finish(game,context);assert.equal(game.developmentSearching,false);assert.equal(game.revision,revision);
  assert.deepEqual(game.pendingMilestones,['well']);assert.equal(game.buildings.length,0);
  const result=game.develop(context);assert.equal(result.searching,false);assert.equal(result.buildings.length,0);
  finish(game,{placements:[]});assert.equal(game.buildings.length,1,'new scenery context starts a fresh search');
});

test('walking preserves an active civic search and only meaningful movement retries an exhausted pass',()=>{
  const {game,placements}=blockedCivicTown(),revision=game.revision;
  let passes=0,result;
  do{
    result=game.develop({placements,player:{x:100+passes*.02,z:100}});passes++;
    assert.ok(passes<40,'small walking steps must not restart the candidate cursor');
  }while(result.searching);
  assert.ok(passes>1,'the fixture spans several bounded routing passes');
  for(const x of [100.75,100.99,101])assert.equal(game.develop({placements,player:{x,z:100}}).searching,false);
  assert.equal(game.revision,revision);assert.deepEqual(game.pendingMilestones,['well']);
  assert.equal(game.develop({placements,player:{x:101.01,z:100}}).searching,true,'moving beyond the original anchor rearms the search');
  finish(game,{placements,player:{x:101.01,z:100}});
  assert.equal(game.developmentSearching,false);
});

test('movement during a bounded pass schedules one final revisit of sites already checked',()=>{
  let samples=0;
  const {game,placements}=blockedCivicTown(()=>{samples++;return flat();});
  const context={placements,player:{x:100,z:100}};samples=0;
  finish(game,context);const onePassSamples=samples;
  samples=0;context.player={x:102,z:100};
  assert.equal(game.develop(context).searching,true);
  context.player={x:105,z:100};finish(game,context);
  assert.equal(samples,onePassSamples*2,'a complete pass is followed by one full revisit using the new player anchor');
  assert.equal(game.develop(context).searching,false,'the final stationary pass stays exhausted');
});
