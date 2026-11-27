import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame,SETTLEMENT} from '../src/settlement-game.js';
import {SETTLEMENT_MILESTONES,SETTLEMENT_BUILDINGS,settlementMilestone,settlementCenter,settlementCityLevel} from '../src/settlement-progression.js';
import {settlementHouseRotation,settlementCenterFacing,settlementDoor,houseBlocksSettlementPath,sampleSettlementPath} from '../src/settlement-paths.js';
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
    ['well',3],['market',6],['waterTower',9],['plaza',12],['hall',15],
  ]);
  for(const spec of SETTLEMENT_MILESTONES){
    assert.equal(settlementMilestone(spec.type),spec);assert.ok(Object.isFrozen(spec));
    assert.ok(spec.collisionWidth<=spec.width&&spec.collisionDepth<=spec.depth);
    assert.ok(spec.doorOffset<=spec.depth/2&&spec.height>0);
  }
  assert.equal(SETTLEMENT_BUILDINGS.length,9);assert.equal(new Set(SETTLEMENT_BUILDINGS.map(spec=>spec.type)).size,9);
  for(const type of ['clock','library','guildhall','chapel'])assert.ok(settlementMilestone(type),'special city art remains available');
  assert.equal(settlementMilestone('missing'),null);
  assert.deepEqual([0,1,2,3,5,6,8,9,11,12,14,15,100].map(settlementCityLevel),[0,0,0,1,1,2,2,3,3,4,4,5,5]);
});

test('civic frontages face arbitrary city centroids and retain a stable yaw at an exact zero vector',()=>{
  const homes=[{x:-3,z:-2,rotation:.37},{x:7,z:2,rotation:1},{x:2,z:9,rotation:-1}];
  const center=settlementCenter({},homes);assert.deepEqual(center,{x:2,z:3});
  for(const point of [{x:10,z:8},{x:-6,z:5},{x:-2,z:-9},{x:1,z:12}]){
    const rotation=settlementCenterFacing({},point,homes);assertFrontFaces({...point,rotation},center);
  }
  assert.equal(settlementCenterFacing({},center,homes),.37);
});

test('new homes use their connected city, exclude distant outposts and civic structures, and never rotate old homes',()=>{
  const game=make();earn(game);
  assert.equal(game.build({x:5,z:0}).ok,true);
  const before=game.houses;
  assert.equal(game.build({x:40,z:40}).ok,true);
  const point={x:5,z:5},preview=game.evaluateBuild(point);
  assert.equal(preview.house.rotation,settlementHouseRotation({seed:'progression'},point,before,{placement:4}));
  assert.equal(game.build(point).ok,true);
  for(const old of before)assert.equal(game.houses.find(home=>home.id===old.id).rotation,old.rotation);
  assert.equal(game.buildings.length,1,'three connected homes unlock the well despite a separate outpost');
  const connected=game.houses.filter(home=>home.connected),center=settlementCenter({},connected);
  const next=game.evaluateBuild({x:-5,z:5});assert.equal(next.house.rotation,settlementHouseRotation({seed:'progression'},next.house,connected,{placement:5}));
  assert.equal(game.houses.find(home=>home.x===40).connected,false);
});

test('exact thresholds add one free civic building each, with paths and preserved house counts',()=>{
  const game=make();earn(game,160);const startingLogs=game.logs,lastMilestone=SETTLEMENT_MILESTONES.at(-1).houses;
  for(let index=1;index<lastMilestone;index++){
    const oldHomes=game.houses,result=game.build({x:index*5,z:0});assert.equal(result.ok,true);
    finish(game);
    assert.equal(game.houses.length,index+1);
    assert.equal(game.clusters[0].level,Math.floor((index+1)/3));assert.equal(game.cities.length,index+1>=3?1:0);
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
  const preview=game.evaluateBuild({x:8,z:0});assert.equal(preview.cityHouseCount,4);
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

test('lot corners follow the traveller while four seeded doorway choices favour the local centre',()=>{
  const homes=[{x:0,z:10}],point={x:0,z:0},counts=[0,0,0,0];
  for(let seed=0;seed<2000;seed++){
    const rotation=settlementHouseRotation({},point,homes,{seed,placement:2});
    counts[Math.round(rotation/(Math.PI/2))]++;
    assert.equal(settlementHouseRotation({},point,homes,{seed,placement:2}),rotation,'repeated previews use no time-dependent randomness');
  }
  assert.ok(counts.every(count=>count>50),'every frontage is possible');
  assert.ok(counts[0]>counts[1]*3&&counts[0]>counts[3]*3&&counts[0]>counts[2]*8,'inward doors dominate without being mandatory');
  const heading=.367,cornerSet=angle=>[-1,1].flatMap(x=>[-1,1].map(z=>[
    (x*Math.cos(angle)+z*Math.sin(angle)).toFixed(8),(z*Math.cos(angle)-x*Math.sin(angle)).toFixed(8),
  ].join(':'))).sort();
  for(let seed=0;seed<100;seed++){
    const rotation=settlementHouseRotation({},point,homes,{heading,seed,placement:2});
    assert.deepEqual(cornerSet(rotation),cornerSet(heading),'doorway randomness must never rotate the square lot corners');
  }
  const game=make();earn(game);const pose={x:5,z:5},context={heading};
  const preview=game.evaluateBuild(pose,context);assert.equal(game.evaluateBuild(pose,context).house.rotation,preview.house.rotation);
  assert.equal(game.build(pose,context).house.rotation,preview.house.rotation,'commit preserves the preview choice');
});

test('separate outposts become their own cities at three homes and merge without replacing civic assets',()=>{
  const game=make();earn(game);
  for(const x of [5,10,27,32,37]){assert.equal(game.build({x,z:0}).ok,true);finish(game);}
  assert.equal(game.cities.length,2);assert.ok(game.cities.every(city=>city.houseCount===3&&city.level===1));
  const before=game.buildings;assert.equal(before.length,2);assert.ok(before.every(building=>building.buildingType==='well'));
  assert.equal(new Set(before.map(building=>building.id)).size,2,'reward IDs are unique per city');
  for(const city of game.cities){
    assert.deepEqual(city.houseIds,game.houses.filter(home=>home.cityId===city.id).map(home=>home.id));
    assert.equal(game.paths.filter(path=>path.cityId===city.id).length,3,'two home lanes and one civic lane');
  }
  assert.equal(game.build({x:18,z:0}).ok,true);finish(game);
  assert.equal(game.cities.length,1);const city=game.cities[0];
  assert.equal(city.id,'city:home-1');assert.equal(city.level,2);assert.equal(city.houseCount,7);
  assert.ok(game.houses.every(home=>home.cityId===city.id));assert.ok(game.paths.every(path=>path.cityId===city.id));
  assert.ok(game.buildings.every(building=>building.cityId===city.id));
  for(const old of before){const kept=game.buildings.find(building=>building.id===old.id);assert.ok(kept);assert.equal(kept.x,old.x);assert.equal(kept.z,old.z);assert.equal(kept.rotation,old.rotation);}
  assert.deepEqual(game.buildings.map(building=>building.buildingType),['well','well','market'],'merging retains both wells and only unlocks the next new type');
  const snapshot=game.snapshot();game.cities[0].houseIds.length=0;game.snapshot().cities[0].level=99;assert.deepEqual(game.snapshot(),snapshot);
});

test('pending civic rewards are tracked independently for cities with blocked and clear sites',()=>{
  const game=make();earn(game);const placements=[];
  const corridor=point=>Math.abs(point.z)<2.1&&(point.x>=-1.4&&point.x<=11.4||point.x>=38.6&&point.x<=51.4);
  const restricted={placements,isReadyAt:corridor};
  for(const x of [5,10,40,45,50]){assert.equal(game.build({x,z:0},restricted).ok,true);finish(game,restricted);}
  assert.equal(game.cities.length,2);assert.equal(game.buildings.length,0);
  assert.deepEqual(game.pendingDevelopments.map(({cityId,type})=>[cityId,type]),[['city:home-1','well'],['city:home-4','well']]);
  finish(game,{placements,isReadyAt:point=>point.x<20||corridor(point)});
  assert.equal(game.buildings.length,1);assert.equal(game.buildings[0].cityId,'city:home-1');
  assert.deepEqual(game.pendingDevelopments.map(({cityId,type})=>[cityId,type]),[['city:home-4','well']]);
  finish(game,{placements,isReadyAt:()=>true});assert.equal(game.buildings.length,2);assert.deepEqual(game.pendingDevelopments,[]);
});

test('city level remains five after fifteen homes and extra buildings stay reserved for special types',()=>{
  const game=make();earn(game,160);
  for(let index=1;index<18;index++){assert.equal(game.build({x:index*5,z:0}).ok,true);finish(game);}
  assert.equal(game.cities[0].houseCount,18);assert.equal(game.cities[0].level,5);
  assert.deepEqual(game.buildings.map(building=>building.buildingType),['well','market','waterTower','plaza','hall']);
  assert.deepEqual(game.pendingMilestones,[]);
});

test('clearing scenery retries an exhausted civic search even when its placement array remains unchanged',()=>{
  let sceneryRevision=0;const cleared=new Set();
  const game=createSettlementGame({seed:'progression',gameplay:{ownerId:'teal',starterHouse:{id:'home-1',kind:'house',x:0,y:0,z:0,rotation:0,scale:1}}},
    {surfaceAt:flat,shared:{isSceneryRemoved:item=>cleared.has(item.id),getSceneryRevision:()=>sceneryRevision}});
  earn(game);const restricted={isReadyAt:point=>Math.abs(point.z)<2.1&&point.x>=-1.4&&point.x<=11.4};
  assert.ok(game.build({x:5,z:0},restricted).ok);assert.ok(game.build({x:10,z:0},restricted).ok);finish(game,restricted);
  const field={id:'wide-field',kind:'farm',x:5,z:0,width:80,depth:80,radius:56.6,rotation:0},context={placements:[field]};
  finish(game,context);assert.equal(game.buildings.length,0);assert.equal(game.developmentSearching,false);
  cleared.add(field.id);sceneryRevision++;
  const result=finish(game,context);assert.equal(game.buildings.length,1);assert.equal(game.buildings[0].buildingType,'well');
  assert.equal(result.searching,false);assert.ok(game.paths.some(path=>path.fromHouseId===game.buildings[0].id),'the civic access lane ignores the same cleared field');
});
