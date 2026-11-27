import * as THREE from 'three';
import {createSettlementEconomy} from './settlement-economy.js';
import {createEconomicBots} from './economic-bots.js';
import {createTradeTrains} from './trade-trains.js';
import {createEconomyHud} from './economy-hud.js';
import {SETTLEMENT} from './settlement-game.js';
import {createSettlementSession} from './settlement-session.js';
import {createPlayerBotSettlements} from './player-bot-settlements.js';
import {createSettlementArt} from './settlement-art.js';
import {createSettlementHud} from './settlement-hud.js';
import {createSettlementResidents} from './settlement-residents.js';
import {createCityLevelMarkers} from './city-level-markers.js';
import {createSettlementIncomeEffects} from './settlement-income-effects.js';
import {createSettlementRailways,railwayControlCount} from './settlement-railways.js';
import {createSettlementRailwayArt} from './settlement-railway-art.js';
import {createSettlementRailwayPlanner} from './settlement-railway-planner.js';
import {createRailwayPreview} from './settlement-railway-preview.js';
import {pickRailwayCity,pickRailwayHandle,railwayCityLabel} from './settlement-railway-input.js';
import {surfaceDistance} from './world-surface.js';
import {walkingBuildAim} from './walking-build-aim.js';

/** Session gameplay connects the existing movement, streamed scenery and shared
 * art. The rules stay independent of input, animation and the HUD. */
export function createSettlementController({canvas,world,parent,mapParent,markerParent=parent,markerMapParent=mapParent,detail,getPlayer,onView,reducedMotion}){
  let bots=null,railInfrastructure={revision:0,buildings:[],paths:[],corridors:[]};
  const session=createSettlementSession(world,{getInfrastructure:()=>railInfrastructure,getActors:()=>{
    const player=getPlayer();return [...(player?.initialized?[player.position]:[]),...bots?.positions??[]];
  }});
  const game=session.player,art=createSettlementArt(parent,mapParent,world);
  const residents=createSettlementResidents(parent,world),levels=createCityLevelMarkers(markerParent,markerMapParent,world);
  const incomeEffects=createSettlementIncomeEffects(markerParent,markerMapParent,world);
  // A single gray batch serves all farming villages. They share the scenery
  // and resident systems, while player rules and resource notifications only
  // ever receive the player's own settlement snapshot.
  const villages=world.gameplay.farmVillages;
  const villageObjects=[...villages?.houses??[],...villages?.buildings??[]],villagePaths=villages?.paths??[];
  let villageArt=null,villageResidents=null,villageLevels=null;
  if(villages?.cities?.length){
    const ownership={ownerId:villages.ownerId};
    villageArt=createSettlementArt(parent,mapParent,world,ownership);
    villageArt.root.name='farm-villages';villageArt.mapRoot.name='farm-villages-map';
    villageArt.sync(villages.houses,villagePaths,villages.buildings);
    villageResidents=createSettlementResidents(parent,world,ownership);villageResidents.root.name='farm-village-residents';villageResidents.sync(villages);
    villageLevels=createCityLevelMarkers(markerParent,markerMapParent,world,ownership);villageLevels.sync(villages.cities);
  }
  bots=createPlayerBotSettlements({world,session,parent,mapParent,markerParent,markerMapParent,detail,reducedMotion});
  const railways=createSettlementRailways(world,{session,getPlacements:()=>detail.placements});
  const economy=world.gameplay.economy?createSettlementEconomy(world,{session,railways}):null;
  if(economy)for(const account of [game,...session.bots.map(entry=>entry.game)])account.setEconomy({
    resourcesAt:point=>economy.resourcesAt(account.ownerId,point),
    spendConstruction:(point,cost)=>economy.spendConstruction(account.ownerId,point,cost)});
  const tradeArt=economy?createTradeTrains(parent,mapParent,world):null;
  const botRailPlanner=economy?createSettlementRailwayPlanner(world,railways,session,{getPlacements:()=>detail.placements}):null;
  const economicBots=economy?createEconomicBots(world,{session,bots,railways,economy,onRailBuild:applyRailBuild,planRoute:(from,to,options)=>botRailPlanner.request(from,to,options)}):null;
  let inspectedCity=null,industryCity=null,economyView=null,economyViewKey='';
  const railPlanner=createSettlementRailwayPlanner(world,railways,session,{getPlacements:()=>detail.placements});
  const railwayArt=createSettlementRailwayArt(parent,mapParent,world);
  const railPreviewFlow=createRailwayPreview(railways,railPlanner);
  let snapshot=game.snapshot(),tool='axe',pointer=null,press=null,placement=null,targetTree=null;
  let railSource=null,railTarget=null,railPreview=null,railClick=null,pendingRailBuild=false,railRevision=-1;
  let railSnapshot=railways.snapshot(),railLines=world.lines??[];
  const committedRailLines=new Map();
  let railPlanning=false,railConfirmed=false,railHover=null,railWaypoints=null,railAttachments=null,railDrag=null;
  let railControlPair='',railControlCount;
  let walking=true,transitioning=false,ready=false,camera=null,pendingBuild=false,pendingChop=false,pendingHit=null,message='',messageTime=0;
  let revision=-1,sessionRevision=-1,detailRevision=-1,developmentDetailRevision=-1,developmentPlayer=null,scenery=[],collisions=[],meshes=[],houseMeshes=[],streets=[],previewKey='',disposed=false;
  const ray=new THREE.Raycaster(),ndc=new THREE.Vector2(),groundPlane=new THREE.Plane(new THREE.Vector3(0,1,0),-.8),intersection=new THREE.Vector3();
  const listeners=[];
  const focusCanvas=()=>canvas.focus({preventScroll:true});
  function releaseRailDrag(){
    const id=railDrag?.id;railDrag=null;
    if(id!==undefined&&canvas.hasPointerCapture?.(id))canvas.releasePointerCapture(id);
  }
  function selectTool(next){
    if(next==='rail'&&(walking||transitioning)||next==='house'&&(!walking||transitioning))return;
    releaseRailDrag();
    tool=next;pointer=null;pendingBuild=false;pendingChop=false;previewKey='';message='';
    railSource=railTarget=railPreview=railClick=null;railPreviewFlow.clear();pendingRailBuild=false;press=null;focusCanvas();
    railPlanning=railConfirmed=false;railHover=null;railWaypoints=railAttachments=null;railDrag=null;
    railControlPair='';railControlCount=undefined;
  }
  const hud=createSettlementHud({parent:canvas.parentElement,playerColor:'#257d70',
    onTool:selectTool,onView:()=>{selectTool('axe');onView();},
    onChop:()=>{selectTool('axe');pendingChop=true;},
    onBuild:()=>{pendingBuild=true;focusCanvas();},onRailBuild:()=>{pendingRailBuild=railConfirmed&&!railPlanning&&!!railPreview?.valid;focusCanvas();},onCancel:()=>selectTool('axe')});
  function changeIndustry(cityId,type){const result=economy?.setIndustry(cityId,type,game.ownerId);notify(result?.ok?`${type==='lumber'?'Timber yard':type==='farm'?'Market gardens':'Tool workshop'} selected`:result?.reason??(result?.code==='industry-cooldown'?'Let the current workshop finish changing':'Select your own town'));focusCanvas();}
  function depositTimber(){
    const position=getPlayer()?.position,local=economy?.resourcesAt(game.ownerId,position),city=economy?.city(local?.cityId);
    const amount=city?Math.min(game.logs,Math.max(0,city.capacity-city.stock.timber-city.incoming.timber)):game.logs;
    if(!game.logs)notify('Chop a tree to gather timber');
    else if(city&&!amount)notify('The timber depot is full');
    else{const result=economy?.depositTimber(game.ownerId,position,amount);notify(result?.ok?`${result.amount} timber stored in your town`:result?.reason??'Move close to your town to store timber');}
    focusCanvas();
  }
  const economyHud=economy?createEconomyHud({parent:canvas.parentElement,ownerId:game.ownerId,onIndustry:changeIndustry,onDeposit:depositTimber}):null;
  function listen(target,type,listener,options){target.addEventListener(type,listener,options);listeners.push(()=>target.removeEventListener(type,listener,options));}
  const eventPointer=event=>{const box=canvas.getBoundingClientRect();return {x:(event.clientX-box.left)/box.width*2-1,y:1-(event.clientY-box.top)/box.height*2};};
  function dragRail(event){
    if(!railDrag.moved&&Math.hypot(event.clientX-railDrag.x,event.clientY-railDrag.y)<2)return;
    railDrag.moved=true;
    pointer=eventPointer(event);ndc.set(pointer.x,pointer.y);ray.setFromCamera(ndc,camera);
    if(ray.ray.direction.y<-.01&&ray.ray.intersectPlane(groundPlane,intersection)){
      railDrag.points[railDrag.index]={...railDrag.points[railDrag.index],x:intersection.x,z:intersection.z};
      railWaypoints=railDrag.points.filter(point=>point.kind==='bend').map(({x,z})=>({x,z}));
      const from=railDrag.points.find(point=>point.kind==='from'),to=railDrag.points.find(point=>point.kind==='to');
      railAttachments={from:{x:from.x,z:from.z},to:{x:to.x,z:to.z}};
    }
  }
  listen(canvas,'pointermove',event=>{
    if(railDrag?.id===event.pointerId){event.preventDefault();event.stopImmediatePropagation();dragRail(event);return;}
    if(press?.id===event.pointerId&&Math.hypot(event.clientX-press.x,event.clientY-press.y)>=5)press.moved=true;
    if(tool==='rail')pointer=eventPointer(event);
  },true);
  listen(canvas,'pointerleave',event=>{if(!event.relatedTarget?.closest?.('.settlement-hud')&&!railDrag)pointer=null;});
  listen(canvas,'pointerdown',event=>{
    if(walking||transitioning||event.button!==0)return;
    pointer=eventPointer(event);
    const handles=railPreview?.handles??[],index=tool==='rail'&&railTarget?pickRailwayHandle(world,handles,camera,pointer,canvas.getBoundingClientRect()):-1;
    if(index>=0){
      event.preventDefault();event.stopImmediatePropagation();focusCanvas();
      railDrag={id:event.pointerId,index,x:event.clientX,y:event.clientY,moved:false,points:handles.map(point=>({...point}))};
      canvas.setPointerCapture?.(event.pointerId);return;
    }
    if(press){press=null;return;}
    focusCanvas();press={id:event.pointerId,x:event.clientX,y:event.clientY,tool};
  },true);
  listen(canvas.ownerDocument.defaultView,'pointerup',event=>{
    if(railDrag?.id===event.pointerId){dragRail(event);releaseRailDrag();return;}
    if(press?.id!==event.pointerId)return;
    if(!press.moved&&Math.hypot(event.clientX-press.x,event.clientY-press.y)<5){
      if(tool==='rail')railClick=eventPointer(event);
      else inspectedCity=pickRailwayCity(world,railways.cities,camera,eventPointer(event),canvas.getBoundingClientRect())?.id??null;
    }
    press=null;
  });
  listen(canvas,'pointercancel',()=>{press=null;releaseRailDrag();});
  listen(canvas,'lostpointercapture',event=>{if(railDrag?.id===event.pointerId)releaseRailDrag();});
  listen(canvas.ownerDocument.defaultView,'blur',()=>{press=null;releaseRailDrag();pendingBuild=false;pendingChop=false;pendingHit=null;pendingRailBuild=false;railClick=null;});
  listen(canvas,'dblclick',event=>{if(tool==='rail'){event.preventDefault();event.stopImmediatePropagation();}},true);
  function synchronize(){
    if(railRevision!==railways.revision){
      railSnapshot=railways.snapshot();railRevision=railways.revision;railwayArt.sync(railSnapshot);
      detail.setRailways?.(railSnapshot.lines);
      // Committed track geometry is immutable. Keep its identity across copied
      // network snapshots so distant construction cannot rebuild local grass.
      for(const line of railSnapshot.lines)if(!committedRailLines.has(line.id))committedRailLines.set(line.id,line);
      railLines=[...world.lines??[],...railSnapshot.lines.map(line=>committedRailLines.get(line.id))];
      railInfrastructure={revision:railRevision,buildings:railSnapshot.stations,paths:railSnapshot.paths??[],
        clearedPlacementIds:railSnapshot.clearedPlacementIds??[],corridors:railSnapshot.reservations.filter(item=>item.kind==='rail-corridor')};
    }
    const changed=game.revision!==revision;
    if(changed){
      const previousCount=snapshot.houses.length,previousBuildings=snapshot.buildings?.length??0;snapshot=game.snapshot();
      if(revision<0||snapshot.houses.length!==previousCount||(snapshot.buildings?.length??0)!==previousBuildings){
        art.sync(snapshot.houses,snapshot.paths??[],snapshot.buildings??[],{animate:revision>=0,reducedMotion:reducedMotion?.matches});houseMeshes=art.meshes;
        residents.sync(snapshot);levels.sync(snapshot.cities??[]);
      }
      revision=game.revision;
    }
    if(session.revision!==sessionRevision||detail.placementRevision!==detailRevision){
      sessionRevision=session.revision;
      detailRevision=detail.placementRevision;
      scenery=[...detail.placements,...session.buildings,...villageObjects];
      collisions=[...detail.getCollisionPlacements(),...session.buildings,...villageObjects];
      meshes=[...detail.getTerrainMeshes(),...houseMeshes,...villageArt?.meshes??[],...bots.meshes,...railwayArt.meshes];
      streets=[...detail.cityStreets,...session.paths,...villagePaths];
    }
  }
  function findTree(player){
    let selected=null,best=Infinity;
    const fx=Math.sin(player.heading),fz=Math.cos(player.heading);
    for(const item of scenery){
      if(item.kind!=='tree'||game.isTreeRemoved(item))continue;
      const dx=item.x-player.position.x,dz=item.z-player.position.z,distance=Math.hypot(dx,dz);
      if(distance>SETTLEMENT.chopReach||distance<1e-6)continue;
      const facing=(dx*fx+dz*fz)/distance;
      if(facing<.30)continue;
      const score=distance-facing*.5;if(score<best){best=score;selected=item;}
    }
    return selected;
  }
  function candidate(player){return walkingBuildAim(world,player,{maxDistance:SETTLEMENT.buildReach});}
  const isReadyAt=point=>detail.hasCoverageAt(point,1);
  function context(player,pose){return {player:player.position,heading:player.heading,enforceReach:true,placements:scenery,ready:detail.hasCoverageAt(pose,2),isReadyAt};}
  function notify(text){message=text;messageTime=3.2;}
  function applyRailBuild(result){
    for(const id of result.clearedTreeIds??[])if(reducedMotion?.matches||!detail.fellTree(id))detail.removeTree(id);
    detail.clearScenery?.(result.clearedPlacements??result.clearedPlacementIds??[],{animate:!reducedMotion?.matches});
    synchronize();
  }
  function updateRailways(){
    if(tool!=='rail'||walking||transitioning){railClick=null;pendingRailBuild=false;railwayArt.preview(null,{visible:false});return null;}
    const cities=railways.cities,hasCity=cities.some(city=>city.ownerId===game.ownerId),box=canvas.getBoundingClientRect();
    if(railClick){
      const city=pickRailwayCity(world,cities,camera,railClick,box);railClick=null;
      if(city){
        if(!railSource){if(railways.canExtend(city)){railSource=city.id;message='';}else notify('Choose your city or its connected network');}
        else if(city.id===railSource){railSource=railTarget=railHover=null;railWaypoints=railAttachments=null;railPreview=null;railPreviewFlow.clear();}
        else{if(railTarget!==city.id)railWaypoints=railAttachments=null;railTarget=city.id;railHover=null;message='';}
      }
    }
    if(railSource&&!cities.some(city=>city.id===railSource)){railSource=railTarget=railHover=null;railWaypoints=railAttachments=null;}
    if(railTarget&&!cities.some(city=>city.id===railTarget)){railTarget=null;railWaypoints=railAttachments=null;}
    if(railSource&&!railTarget&&!press){const hover=pickRailwayCity(world,cities,camera,pointer,box);railHover=hover?.id!==railSource?hover?.id??null:null;}
    const destination=railTarget??railHover,pair=railSource&&destination?`${railSource}>${destination}`:'';
    if(pair!==railControlPair){
      railControlPair=pair;
      railControlCount=pair?railwayControlCount(cities.find(city=>city.id===railSource),cities.find(city=>city.id===destination)):undefined;
    }
    const options={waypoints:railWaypoints??undefined,attachments:railAttachments??undefined,controlCount:railControlCount};
    if(railSource&&destination){
      const state=railPreviewFlow.update(railSource,destination,options,{dragging:!!railDrag,gold:game.gold});
      railPreview=state.result;railPlanning=state.checking;railConfirmed=state.confirmed;
    }else{railPreviewFlow.clear();railPreview=null;railPlanning=railConfirmed=false;}
    if(pendingRailBuild&&railSource&&railTarget&&railConfirmed&&!railPlanning&&!railDrag&&railPreview?.valid){
      const result=railways.build(railSource,railTarget,{...options,requireCached:true});
      if(result.ok){
        applyRailBuild(result);notify(`−${result.cost} gold · automatic freight connected`);railSource=railTarget=railHover=railPreview=null;railWaypoints=railAttachments=null;railPreviewFlow.clear();railConfirmed=false;
      }else{railPreview=result;if(result.code==='world-changed')railPreviewFlow.clear();notify(result.reason??'Choose another route');}
    }
    pendingRailBuild=false;
    // Endpoints follow the fitted station port, rather than the unconstrained
    // cursor. Interior handles retain their requested edit positions.
    railwayArt.preview(railPreview,{cities,sourceCityId:railSource,targetCityId:destination,maxConnectionDistance:railways.maxConnectionDistance,
      visible:true,editable:!!railTarget&&railPreview?.code!=='out-of-range',handles:railPreview?.handles??[],activeHandle:railDrag?.index??-1});
    return {stage:railPlanning?'planning':railTarget&&railPreview?'preview':railSource?'destination':'source',hasCity,cost:railPreview?.cost??(economy?8:5),hovering:!!railHover,siteValid:!!railPreview?.siteValid,
      canBuild:!!railTarget&&railConfirmed&&!railDrag&&!railPlanning&&!!railPreview?.valid,reason:railPreview?.reason??message,code:railPreview?.code??'',
      sourceLabel:railwayCityLabel(cities.find(city=>city.id===railSource),game.ownerId),targetLabel:railwayCityLabel(cities.find(city=>city.id===destination),game.ownerId)};
  }
  function develop(player){
    if(!snapshot.pendingMilestones?.length)return;
    developmentPlayer={x:player.position.x,z:player.position.z};
    game.develop({player:player.position,placements:scenery,ready,isReadyAt});synchronize();
  }
  synchronize();
  return{
    game,art,hud,residents,villageArt,villageResidents,bots,session,railways,railwayArt,economy,economicBots,tradeArt,
    get building(){return tool==='house'||tool==='rail';},
    get placements(){synchronize();return scenery;},get placementRevision(){synchronize();return `${detailRevision}:${sessionRevision}`;},
    get cityStreets(){synchronize();return streets;},
    get railwayLines(){synchronize();return railLines;},
    getCollisionPlacements(){synchronize();return collisions;},getTerrainMeshes(){synchronize();return meshes;},
    keyDown(event){
      const key=event.key.toLowerCase();
      if(economy&&key==='g'){if(!event.repeat)depositTimber();return true;}
      if(economy&&['1','2','3'].includes(key)){if(!event.repeat&&industryCity)changeIndustry(industryCity,['lumber','farm','workshop'][Number(key)-1]);return true;}
      if(key==='t'){if(!event.repeat&&!walking&&!transitioning)selectTool(tool==='rail'?'axe':'rail');return true;}
      if(tool==='rail'&&['escape','enter','e'].includes(key)){
        if(!event.repeat){if(key==='enter')pendingRailBuild=railConfirmed&&!railPlanning&&!!railPreview?.valid;else selectTool('axe');}return true;
      }
      if(key==='b'){if(!event.repeat)selectTool(tool==='house'?'axe':'house');return true;}
      if(tool==='house'&&['escape','enter','e'].includes(key)){
        if(!event.repeat){if(key==='escape'||key==='e')selectTool('axe');else pendingBuild=true;}return true;
      }
      // Regenerating the art would discard a session without warning.
      return key==='r';
    },
    prepareInput(input){
      if(pendingChop){input.swing=true;pendingChop=false;}
      if(tool==='house'&&input.swing){pendingBuild=true;input.swing=false;}
      return input;
    },
    onSwing(){
      const player=getPlayer();synchronize();const tree=findTree(player);
      pendingHit=tree?{tree,time:.22}:null;
      if(!tree)notify('Step closer and face a tree');
    },
    cancelBuild(){selectTool('axe');},
    update(dt,{walking:walkingNow,transitioning:transitionNow,camera:activeCamera,mapBlend=0,walkingWeight=Number(walkingNow),focus,viewportHeight=800,zoom=1,dayState,night=0,uiDt=dt}={}){
      if(disposed)return;
      walking=walkingNow;transitioning=transitionNow;camera=activeCamera;const player=getPlayer();
      if(walking&&tool==='rail'||!walking&&tool==='house')selectTool('axe');
      bots.simulate(dt,{completedDays:dayState?.completedDays??0});
      economy?.update(dt);economicBots?.update(dt);
      const economicEvents=economy?.drainEvents()??[];
      for(const event of economicEvents)if(event.type==='income'&&event.ownerId===game.ownerId){
        if(walkingWeight<.5)incomeEffects.emit(event.houses);canvas.dataset.lastIncome=String(event.amount);
      }
      const income=game.settleIncome(dayState?.completedDays??0);
      if(income?.amount>0){
        if(walkingWeight>.5)hud.showIncome(income);else incomeEffects.emit(income.houses);
        canvas.dataset.lastIncome=String(income.amount);
      }
      detail.updateTrees(reducedMotion?.matches?1:uiDt);synchronize();
      ready=!!player?.initialized&&detail.hasCoverageAt(player.position,2);
      // A search may yield its bounded routing budget across frames. Once a
      // pass is exhausted, only new terrain, clearing or a moved player retries it.
      const playerFreedSpace=ready&&snapshot.pendingMilestones?.length&&(!developmentPlayer||surfaceDistance(world,developmentPlayer,player.position)>1);
      if(ready&&(developmentDetailRevision!==detailRevision||game.developmentSearching||playerFreedSpace)){
        developmentDetailRevision=detailRevision;develop(player);
      }
      if(messageTime>0){messageTime-=dt;if(messageTime<=0)message='';}
      if(pendingHit){
        pendingHit.time-=dt;
        if(pendingHit.time<=0){
          const tree=pendingHit.tree;pendingHit=null;
          // Recheck reach at impact, not just when the swing was requested.
          if(walking&&surfaceDistance(world,tree,player.position)<=SETTLEMENT.chopReach&&!game.isTreeRemoved(tree)){
            const result=game.chop(tree,{player:player.position});
            if(result.ok){detail.fellTree(result.treeId,{direction:{x:tree.x-player.position.x,z:tree.z-player.position.z}});notify(`+${result.logs} ${economy?'timber':'logs'}`);synchronize();develop(player);}
          }
        }
      }
      targetTree=ready&&walking&&!transitioning&&tool==='axe'?findTree(player):null;
      if(ready&&walking&&tool==='house'&&!transitioning){
        const pose=candidate(player),buildContext=context(player,pose);
        const nearbyActors=bots.positions.filter(point=>surfaceDistance(world,point,pose)<4)
          .map(point=>`${point.x.toFixed(2)},${point.z.toFixed(2)}`).join(';');
        const key=`${pose.x}:${pose.z}:${player.position.x}:${player.position.z}:${buildContext.heading}:${walking}:${buildContext.ready}:${sessionRevision}:${detailRevision}:${economy?.revision??game.revision}:${nearbyActors}`;
        // An idle blueprint keeps its route. Re-plan only after aim, world or
        // player changes; the final build still validates the current scene.
        if(key!==previewKey){placement=game.evaluateBuild(pose,buildContext);previewKey=key;}
        if(pendingBuild){
          const result=game.build(pose,context(player,pose));
          if(result.ok){notify(result.connected?'House built · city expanded':result.cityHouseCount>1?'House built · settlement expanded':'House built · new outpost');synchronize();tool='axe';pointer=null;}
          else{message='';messageTime=0;}
        }
      }else{placement=null;previewKey='';}
      pendingBuild=false;
      const railwayHud=updateRailways();
      railwayArt.update({mapBlend,camera,viewportHeight,walkingWeight,zoom});
      tradeArt?.update(economy.trains,{camera,mapBlend,walkingWeight,viewportHeight,zoom});
      art.preview(placement,{visible:walking&&tool==='house'&&ready&&!transitioning,targetTree});art.update({mapBlend,dt:uiDt,reducedMotion:reducedMotion?.matches,night});
      const connectedHouses=snapshot.houses.filter(h=>h.connected).length;
      const target=placement?.house??player?.position??{x:0,z:0};
      let nearest=null,distance=Infinity;
      for(const cluster of snapshot.clusters??snapshot.cities??[]){const d=surfaceDistance(world,cluster,target);if(d<distance){distance=d;nearest=cluster;}}
      if(placement?.connectionHouseId)nearest=(snapshot.clusters??[]).find(cluster=>cluster.houseIds.includes(placement.connectionHouseId))??nearest;
      else if(placement&&!placement.connectionHouseId)nearest=null;
      const cityBuildings=(snapshot.buildings??[]).filter(item=>item.cityId===nearest?.id);
      const cityPending=(snapshot.pendingDevelopments??[]).filter(item=>item.cityId===nearest?.id).map(item=>item.type);
      residents.update(dt,{focus:focus??player.position,mapBlend,walkingWeight,visible:ready,reducedMotion:reducedMotion?.matches,night,dayPhase:dayState?.phase,unavailableHomes:art.construction.activeIds});
      villageArt?.update({mapBlend});
      villageResidents?.update(dt,{focus:focus??player.position,mapBlend,walkingWeight,visible:ready,reducedMotion:reducedMotion?.matches,night,dayPhase:dayState?.phase});
      villageLevels?.update({camera,mapBlend,walkingWeight,viewportHeight});
      bots.update(dt,{camera,mapBlend,walkingWeight,focus:focus??player?.position,viewportHeight,night,dayPhase:dayState?.phase,uiDt});
      levels.update({camera,mapBlend,walkingWeight,viewportHeight});
      incomeEffects.update(uiDt,{camera,mapBlend,walkingWeight,viewportHeight,reducedMotion:reducedMotion?.matches});
      const resources=game.resourcesAt(placement?.house??player?.position);
      if(economy){
        const key=`${economy.revision}:${Math.floor(economy.elapsed)}`;
        if(key!==economyViewKey){economyViewKey=key;economyView=economy.snapshot();}
        const cityId=railTarget??railHover??railSource??(!walking?inspectedCity:null)??nearest?.id;
        const city=economyView.cities.find(city=>city.id===cityId);industryCity=city?.ownerId===game.ownerId?city.id:null;
        economyHud.update({city,houses:snapshot.houses.length,walking,tool,night,time:economyView.time,nextPulse:economyView.nextPulse,
          delivered:economyView.stats.deliveries,carried:snapshot.logs,localCityId:economy.resourcesAt(game.ownerId,player?.position).cityId,stationCount:railSnapshot.stations.filter(station=>station.ownerId===game.ownerId).length,events:economicEvents,feedback:messageTime>0?message:''});
        Object.assign(canvas.dataset,{economyTime:String(Math.floor(economy.elapsed)),deliveries:String(economyView.stats.deliveries),
          freightTrains:String(tradeArt.stats.active??0),localTools:String(resources.tools),localGrain:String(resources.grain),economyCity:city?.id??'',industry:city?.industry??''});
      }
      hud.update({logs:economy?resources.timber:snapshot.logs,economic:!!economy,buildCost:game.constructionCost,resources,gold:snapshot.gold,nightAmount:night,dayPhase:dayState?.phase??'day',houses:snapshot.houses.length,connectedHouses,cityHouses:nearest?.houseCount??1,cityLevel:nearest?.level??0,buildings:cityBuildings,pendingMilestones:cityPending,tool,walking,ready,
        canBuild:!!placement?.valid,connected:placement?.connected??true,reason:placement?.reason??'',targetTree:!!targetTree,message,railway:railwayHud??{hasCity:game.cities.length>0,cost:economy?8:5}});
      Object.assign(canvas.dataset,{gameplay:'settlement',logs:String(snapshot.logs),gold:String(snapshot.gold),incomeDay:String(snapshot.lastIncomeDay),incomeCoins:String(incomeEffects.visibleCount),houses:String(snapshot.houses.length),connectedHouses:String(connectedHouses),
        paths:String(snapshot.paths?.length??0),choppedTrees:String(snapshot.removedTreeIds.length),construction:String(art.construction.count),constructionDust:String(art.construction.dustCount),residentsIndoors:String(residents.stats.indoors??0),buildMode:String(tool==='house'),buildValid:String(!!placement?.valid),buildReason:placement?.code??'',
        cities:String(snapshot.cities?.length??0),cityLevels:(snapshot.cities??[]).map(city=>city.level).join(','),residents:String(residents.stats?.residents??residents.stats?.count??0),
        farmVillages:String(villages?.cities?.length??0),villageResidents:String(villageResidents?.stats.residents??0),villageResidentsIndoors:String(villageResidents?.stats.indoors??0),
        playerBots:String(bots.entries.length),botHouses:bots.entries.map(entry=>entry.houseCount).join(','),
        railMode:String(tool==='rail'),railConnections:String(railSnapshot.connections.length),railStations:String(railSnapshot.stations.length),
        railSource:railSource??'',railTarget:railTarget??'',railHover:railHover??'',railHandles:String(railPreview?.handles?.length??0),railEditing:String(!!railDrag),railPlanning:String(railPlanning),railValid:String(!!railPreview?.valid),railReason:railPreview?.code??'',
        botLevels:bots.entries.map(entry=>entry.snapshot.cities[0]?.level??0).join(','),botStates:bots.entries.map(entry=>entry.bot.state).join(','),
        civicBuildings:String(snapshot.buildings?.length??0),buildingTypes:(snapshot.buildings??[]).map(item=>item.buildingType).join(','),pendingMilestones:(snapshot.pendingMilestones??[]).join(','),
        buildX:placement?.house?.x?.toFixed(2)??'',buildZ:placement?.house?.z?.toFixed(2)??'',buildRotation:placement?.house?.rotation?.toFixed(4)??'',targetTree:targetTree?.id??''});
    },
    dispose(){disposed=true;releaseRailDrag();railPreviewFlow.dispose();railPlanner.dispose();botRailPlanner?.dispose();for(const remove of listeners)remove();hud.dispose();economyHud?.dispose();economicBots?.dispose();tradeArt?.dispose();art.dispose();residents.dispose();levels.dispose();incomeEffects.dispose();villageArt?.dispose();villageResidents?.dispose();villageLevels?.dispose();bots.dispose();railwayArt.dispose();},
  };
}
