import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementRailways,railwayControlCount,SETTLEMENT_RAILWAY} from '../src/settlement-railways.js';
import {sampleAlignment} from '../src/alignments.js';
import {surfaceDistance,surfaceOffset,surfacePoint,surfaceTangent,surfaceHeading} from '../src/world-surface.js';
import {physicalLineMetric,physicalDistanceAtChart} from '../src/physical-route.js';
const radius=1600,flat=()=>({type:'ground',height:0});
const near=(a,b,e=1e-6)=>assert.ok(Math.abs(a-b)<=e,`${a} ≈ ${b}`);
function fixture(latitude=75,{match=false,destinations=[[90,0]],maxDistance=140}={}){
  const world={seed:'polar-rail',surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},gameplay:{economy:'loops',railwayMaxDistance:maxDistance}};
  const origin={x:0,z:-latitude*Math.PI/180*radius},cities=[[0,0],...destinations].map(([x,z],i)=>({...surfaceOffset(world,origin.x,origin.z,x,z),id:`city-${i}`,ownerId:`owner-${i}`,level:2,houseCount:6,houseIds:[]}));
  if(match)world.gameplay.match={players:cities.map((c,i)=>({id:c.ownerId,teamId:i<2?'allies':'other'}))};
  const games=cities.map(c=>({ownerId:c.ownerId,cities:[c],resources:500,resourcesAt(){return{resources:this.resources};},spendResources(amount){this.resources-=amount;return{ok:true};}}));
  const actors=[],session={player:games[0],bots:games.slice(1).map(game=>({game})),buildings:[],revision:0,shared:{removedTreeIds:new Set(),getActors:()=>actors}};
  const rail=createSettlementRailways(world,{session,surfaceAt:flat,sceneryCatalog:[]});
  return{world,cities,games,session,rail,actors};
}

test('polar stations retain a fourteen-unit throat, three-unit platform offset, and rigid physical heading',()=>{
  for(const latitude of [0,60,75]){
    const{world,rail}=fixture(latitude);assert.equal(rail.synchronizeStations().stations.length,2);
    for(const station of rail.stations){
      const line=rail.lines.find(line=>line.id===station.lineId),metric=physicalLineMetric(world,line),a=sampleAlignment(line.alignment,0),b=sampleAlignment(line.alignment,line.length);
      near(metric.length,14,.02);near(surfaceDistance(world,station.center,station),3);
      near(surfaceDistance(world,station.center,a),7);near(surfaceDistance(world,station.center,b),7);
      const tangent=surfaceTangent(world,station.center.x,0,station.center.z,b.x-a.x,0,b.z-a.z).normalize();
      const lateral=surfacePoint(world,station.x,0,station.z).sub(surfacePoint(world,station.center.x,0,station.center.z)).normalize();
      assert.ok(Math.abs(tangent.dot(lateral))<.005,'platform lies beside, not on, the physical spine');
      near(Math.cos(surfaceHeading(world,station.x,station.z,station.rotation)-(Math.PI-station.physicalHeading)),1,1e-9);
      near(station.distance,line.length/2);
      for(const side of [-1,1]){const endpoint=side<0?a:b,anchor=rail.anchorAt(endpoint,{stationId:station.id,side,ownerId:station.ownerId});assert.equal(anchor.stationId,station.id);near(surfaceDistance(world,endpoint,anchor),0);}
    }
  }
});

test('polar route prices, controls and true physical curvature match distance rather than chart stretch',()=>{
  const{world,rail,cities}=fixture();rail.synchronizeStations();const preview=rail.evaluate(cities[0].id,cities[1].id);
  assert.ok(preview.valid,preview.reason);near(preview.distance,90);assert.equal(preview.cost,4);assert.equal(preview.waypointCount,1);
  assert.equal(railwayControlCount(cities[0],cities[1],world),1);assert.ok(railwayControlCount(cities[0],cities[1])>1,'regression fixture has a stretched chart');
  const line=preview.lines.at(-1),metric=physicalLineMetric(world,line);assert.ok(line.alignment.segments.some(s=>s.chartTransform));
  for(let s=.02;s<line.length-.02;s+=.19){
    const a=sampleAlignment(line.alignment,s-.01),b=sampleAlignment(line.alignment,s+.01),ta=surfaceTangent(world,a.x,a.y,a.z,a.tangent.x,0,a.tangent.z).normalize(),tb=surfaceTangent(world,b.x,b.y,b.z,b.tangent.x,0,b.tangent.z).normalize();
    const turn=Math.atan2(ta.clone().cross(tb).length(),ta.dot(tb)),length=physicalDistanceAtChart(metric,s+.01)-physicalDistanceAtChart(metric,s-.01);
    assert.ok(length/turn>=SETTLEMENT_RAILWAY.minRadius-1e-3,'minimum radius is physical at 75 degrees');
  }
  assert.ok(rail.build(cities[0].id,cities[1].id,{requireCached:true}).ok);
  const at=sampleAlignment(line.alignment,line.length*.48),anchor=rail.anchorAt(at,{lineId:line.id,distance:line.length*.48,ownerId:cities[0].ownerId});
  assert.equal(anchor.lineId,line.id);near(surfaceDistance(world,anchor,at),0,1e-5);
  const selected=rail.anchorAt(at,{ownerId:cities[0].ownerId});assert.equal(selected.lineId,line.id);near(surfaceDistance(world,selected,at),0,1e-5);
});

test('team coverage union survives worker adoption and authoritative purchase beyond one circle',()=>{
  const{world,rail,cities,session,games}=fixture(75,{match:true,destinations:[[85,50],[165,40]],maxDistance:100});rail.synchronizeStations();
  assert.ok(surfaceDistance(world,cities[0],cities[2])>100);assert.ok(surfaceDistance(world,cities[1],cities[2])<100);
  const preview=rail.evaluate(cities[0].id,cities[2].id);assert.ok(preview.valid,preview.reason);
  const receiver=createSettlementRailways(world,{session,surfaceAt:flat,sceneryCatalog:[],initialState:rail.snapshot()}),key=receiver.geometryKey(cities[0].id,cities[2].id);
  assert.ok(receiver.adoptPreview(cities[0].id,cities[2].id,preview,key));
  const built=receiver.build(cities[0].id,cities[2].id,{requireCached:true});assert.ok(built.ok,built.reason);assert.equal(games[0].resources,500-preview.cost);
});

test('city selection footprint uses physical housing spread at high latitude',()=>{
  const{world,rail,cities,session}=fixture(),city=cities[0],position=surfaceOffset(world,city.x,city.z,12,0);
  session.buildings.push({id:'wide-home',kind:'house',cityId:city.id,ownerId:city.ownerId,...position,width:4,depth:2,rotation:Math.PI/2,rotationSpace:'surface'});
  const selected=rail.cities.find(c=>c.id===city.id);near(selected.radius,12+Math.hypot(4,2)/2);
});

test('physical house footprints prevent polar platforms clipping a building outside its chart-sized box',()=>{
  const baseline=fixture();baseline.rail.synchronizeStations();const original=baseline.rail.stations.find(s=>s.cityId==='city-0');
  const f=fixture(),position=surfaceOffset(f.world,original.x,original.z,4.5,0);
  f.session.buildings.push({id:'protected-building',kind:'civic',...position,width:8,depth:3,rotation:0,rotationSpace:'surface'});
  f.rail.synchronizeStations();const station=f.rail.stations.find(s=>s.cityId==='city-0');
  assert.ok(station,'another clear tangent site remains available');
  assert.ok(surfaceDistance(f.world,original,station)>1,'the original platform intersects the physical building and must move');
  const rotation=surfaceHeading(f.world,station.x,station.z,station.rotation),c=Math.cos(rotation),s=Math.sin(rotation);
  for(let ix=0;ix<=14;ix++)for(let iz=0;iz<=6;iz++){
    const x=7*(ix/14-.5),z=3*(iz/6-.5),point=surfaceOffset(f.world,station.x,station.z,x*c+z*s,-x*s+z*c);
    assert.ok(surfaceDistance(f.world,point,position)>1.45,'platform probes remain outside the building’s inscribed footprint');
  }
});

test('station startup never enumerates the full planet scenery outline',()=>{
  const{world,session}=fixture();world.bounds={width:10000,depth:5000};world.biomes=[];world.lines=[];world.cities=[];
  world.gameplay.botScenery=[{id:'known-distant-tree',kind:'tree',x:500,z:0,scale:1}];
  Object.defineProperty(world,'outline',{get(){throw new Error('Startup must not enumerate the Earth outline');}});
  const rail=createSettlementRailways(world,{session,surfaceAt:flat});
  assert.equal(rail.synchronizeStations().stations.length,2);
  assert.deepEqual(rail.sceneryCatalog.map(item=>item.id),['known-distant-tree']);
});


test('unchanged match station synchronization does not clone every account city list again',()=>{
  const {rail,session,games}=fixture(60,{match:true});let reads=0,spatialRevision=0;
  Object.defineProperty(session,'spatialRevision',{get:()=>spatialRevision});
  for(const game of games){const cities=game.cities;Object.defineProperty(game,'cities',{get(){reads++;return structuredClone(cities);}});}
  rail.synchronizeStations();const before=reads;
  for(let i=0;i<20;i++)assert.equal(rail.synchronizeStations().changed,false);
  assert.equal(reads,before,'idle synchronization returns before any city snapshots');
  spatialRevision++;rail.synchronizeStations();assert.ok(reads>before,'an authoritative layout revision still refreshes city eligibility');
});
