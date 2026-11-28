import {isHarvestableWood} from './harvestable-wood.js';
import {isMineableOre} from './harvestable-ore.js';
import * as THREE from 'three';
import {createSettlementEconomy} from './settlement-economy.js';
import {createEconomicBots} from './economic-bots.js';
import {createTradeTrains} from './trade-trains.js';
import {createEconomyHud} from './economy-hud.js';
import {createLoopHud} from './loop-hud.js';
import './loop-hud.css';
import {sampleLine} from './world-model.js';
import {buildCircuitSelection,pickCircuitAt,nextCircuitId} from './railway-circuit-selection.js';
import {createCircuitSelectionArt} from './circuit-selection-art.js';
import {createResourceGainEffects} from './resource-gain-effects.js';
import './resource-gain-effects.css';
import {createResourceWork} from './resource-work.js';
import {createResourceWorkArt} from './resource-work-art.js';
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
import {pickRailwayCity,pickRailwayHandle,pickRailwayAnchor,railwayCityLabel,railwayDraftDirection} from './settlement-railway-input.js';
import {surfaceDistance} from './world-surface.js';
import {walkingBuildAim} from './walking-build-aim.js';

/** Session gameplay connects the existing movement, streamed scenery and shared
 * art. The rules stay independent of input, animation and the HUD. */
export function createSettlementController({canvas,world,parent,mapParent,markerParent=parent,markerMapParent=mapParent,detail,getPlayer,onView,onClaimPointer=()=>{},reducedMotion}){
  const loopMode=world.gameplay.economy==='loops';
  let resourceWork=null;
  const resourcePlacements=()=>resourceWork?.placements??[];
  const railPlacements=()=>[...detail.placements,...resourcePlacements()];
  let bots=null,railInfrastructure={revision:0,buildings:[],paths:[],corridors:[]};
  const session=createSettlementSession(world,{getInfrastructure:()=>railInfrastructure,getActors:()=>{
    const player=getPlayer();return [...(player?.initialized?[player.position]:[]),...bots?.positions??[]];
  }});
  const game=session.player,art=createSettlementArt(parent,mapParent,world);
  const residents=createSettlementResidents(parent,world),levels=createCityLevelMarkers(markerParent,markerMapParent,world);
  const incomeEffects=createSettlementIncomeEffects(markerParent,markerMapParent,world);
  const resourceGains=loopMode?createResourceGainEffects(world,{parent:canvas.ownerDocument.body,document:canvas.ownerDocument}):null;
  const circuitArt=loopMode?createCircuitSelectionArt(parent,mapParent,world):null;
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
  bots=createPlayerBotSettlements({world,session,parent,mapParent,markerParent,markerMapParent,detail,reducedMotion,getExtraPlacements:resourcePlacements,getExtraRevision:()=>resourceWork?.placementRevision??0});
  const railways=createSettlementRailways(world,{session,getPlacements:railPlacements});
  const economy=world.gameplay.economy?createSettlementEconomy(world,{session,railways}):null;
  if(economy)for(const account of [game,...session.bots.map(entry=>entry.game)])account.setEconomy({
    resourcesAt:point=>economy.resourcesAt(account.ownerId,point),
    spendConstruction:(point,cost)=>economy.spendConstruction(account.ownerId,point,cost)});
  if(loopMode)resourceWork=createResourceWork(world,{session,getPlacements:()=>detail.placements});
  const resourceWorkArt=resourceWork?createResourceWorkArt(parent,world,resourceWork):null;
  const tradeArt=economy?createTradeTrains(parent,mapParent,world):null;
  const botRailPlanner=economy?createSettlementRailwayPlanner(world,railways,session,{getPlacements:railPlacements}):null;
  const economicBots=economy?createEconomicBots(world,{session,bots,railways,economy,onRailBuild:applyRailBuild,planRoute:(from,to,options)=>botRailPlanner.request(from,to,options)}):null;
  let inspectedCity=null,industryCity=null,economyView=null,economyViewKey='';
  let selectedCircuit=null,selectedCircuitAnchor=null,hoverCircuit=null,circuitCandidates=[],circuitPick=buildCircuitSelection(),circuitKey='',circuitArtKey='',hoverTime=0;
  const railPlanner=createSettlementRailwayPlanner(world,railways,session,{getPlacements:railPlacements});
  const railwayArt=createSettlementRailwayArt(parent,mapParent,world);
  const railPreviewFlow=createRailwayPreview(railways,railPlanner);
  let snapshot=game.snapshot(),tool='axe',pointer=null,press=null,placement=null,targetTree=null;
  let railSource=null,railTarget=null,railPreview=null,railClick=null,pendingRailBuild=false,railRevision=-1;
  let railSnapshot=railways.snapshot(),railLines=world.lines??[];
  const committedRailLines=new Map();
  let railPlanning=false,railConfirmed=false,railHover=null,railHoverAnchor=null,railWaypoints=null,railAttachments=null,railDrag=null;
  let railControlPair='',railControlCount,railReverse=false,railDirectionChosen=false;
  let walking=true,transitioning=false,ready=false,camera=null,pendingBuild=false,pendingChop=false,pendingHit=null,message='',messageTime=0;
  let revision=-1,sessionRevision=-1,detailRevision=-1,resourceRevision=-1,developmentDetailRevision=-1,developmentPlayer=null,scenery=[],collisions=[],meshes=[],houseMeshes=[],streets=[],previewKey='',disposed=false;
  const ray=new THREE.Raycaster(),ndc=new THREE.Vector2(),groundPlane=new THREE.Plane(new THREE.Vector3(0,1,0),-.8),intersection=new THREE.Vector3();
  const listeners=[];
  const focusCanvas=()=>canvas.focus({preventScroll:true});
  function releaseRailDrag(){
    const id=railDrag?.id;railDrag=null;
    if(id!==undefined&&canvas.hasPointerCapture?.(id))canvas.releasePointerCapture(id);
  }
  function releaseRailPress(){
    const id=press?.connecting?press.id:undefined;press=null;
    if(id!==undefined&&canvas.hasPointerCapture?.(id))canvas.releasePointerCapture(id);
  }
  function selectTool(next){
    if(next==='rail'&&(walking||transitioning)||next==='house'&&(!walking||transitioning))return;
    releaseRailDrag();releaseRailPress();
    tool=next;if(next!=='axe')clearCircuit();pointer=null;pendingBuild=false;pendingChop=false;previewKey='';message='';
    railSource=railTarget=railPreview=railClick=null;railPreviewFlow.clear();pendingRailBuild=false;press=null;focusCanvas();
    railPlanning=railConfirmed=false;railHover=railHoverAnchor=null;railWaypoints=railAttachments=null;railDrag=null;
    railControlPair='';railControlCount=undefined;railReverse=false;railDirectionChosen=false;
  }
  const hud=createSettlementHud({parent:canvas.parentElement,playerColor:'#257d70',
    onTool:selectTool,onView:()=>{selectTool('axe');onView();},
    onRailReverse:reverseRail,
    onChop:()=>{selectTool('axe');pendingChop=true;},
    onBuild:()=>{pendingBuild=true;focusCanvas();},onRailBuild:()=>{pendingRailBuild=railConfirmed&&!railPlanning&&!railDrag&&!press?.connecting&&!!railPreview?.valid;focusCanvas();},onCancel:()=>selectTool('axe')});
  function reverseRail(){
    if(!loopMode||!railSource||!(railTarget??railHover))return;
    releaseRailDrag();releaseRailPress();setRailDirection(!railReverse);railDirectionChosen=true;focusCanvas();
  }
  function setRailDirection(reverse){
    if(railReverse===reverse)return;
    railReverse=reverse;
    railWaypoints=railWaypoints?.slice().reverse()??null;
    if(railAttachments)railAttachments={from:railAttachments.to,to:railAttachments.from};
    railPreview=null;railPreviewFlow.clear();railConfirmed=false;pendingRailBuild=false;
  }
  function buyTrain(cityId,loopId){
    const result=economy.buyTrain(cityId,loopId,game.ownerId);
    notify(result.ok?'Train added':result.reason??'Complete a directed loop first');focusCanvas();
  }
  function changeIndustry(cityId,type){const result=economy?.setIndustry(cityId,type,game.ownerId);notify(result?.ok?`${type==='lumber'?'Timber yard':type==='farm'?'Market gardens':'Tool workshop'} selected`:result?.reason??(result?.code==='industry-cooldown'?'Let the current workshop finish changing':'Select your own town'));focusCanvas();}
  function depositTimber(){
    const position=getPlayer()?.position,local=economy?.resourcesAt(game.ownerId,position),city=economy?.city(local?.cityId);
    const amount=city?Math.min(game.logs,Math.max(0,city.capacity-city.stock.timber-city.incoming.timber)):game.logs;
    if(!game.logs)notify('Chop a tree to gather timber');
    else if(city&&!amount)notify('The timber depot is full');
    else{const result=economy?.depositTimber(game.ownerId,position,amount);notify(result?.ok?`${result.amount} timber stored in your town`:result?.reason??'Move close to your town to store timber');}
    focusCanvas();
  }
  const loopHud=loopMode?createLoopHud({parent:canvas.parentElement,world,ownerId:game.ownerId,onBuyTrain:buyTrain,onCycle:cycleCircuit,onClose:clearCircuit}):null;
  const economyHud=economy&&!loopMode?createEconomyHud({parent:canvas.parentElement,ownerId:game.ownerId,onIndustry:changeIndustry,onDeposit:depositTimber}):null;
  function listen(target,type,listener,options){target.addEventListener(type,listener,options);listeners.push(()=>target.removeEventListener(type,listener,options));}
  const eventPointer=event=>{const box=canvas.getBoundingClientRect();return {x:(event.clientX-box.left)/box.width*2-1,y:1-(event.clientY-box.top)/box.height*2};};
  function railAnchor(pointerValue){
    const hit=pickRailwayAnchor(world,{...railSnapshot,cities:railways.cities},camera,pointerValue,canvas.getBoundingClientRect());
    if(!hit)return null;
    if(hit.kind==='city')return hit;
    return railways.anchorAt(hit,{...hit,ownerId:game.ownerId});
  }
  function clearCircuit(){selectedCircuit=hoverCircuit=null;selectedCircuitAnchor=null;circuitCandidates=[];inspectedCity=null;}
  function cycleCircuit(direction=1){
    if(!circuitCandidates.length)return;
    const index=circuitCandidates.indexOf(selectedCircuit);
    selectedCircuit=circuitCandidates[(index+direction+circuitCandidates.length)%circuitCandidates.length];focusCanvas();
  }
  function circuitAt(point){return loopMode&&tool==='axe'&&!walking&&camera&&point?pickCircuitAt(world,circuitPick,camera,point,canvas.getBoundingClientRect()):null;}
  function groundAt(pointerValue){
    if(!camera||!pointerValue)return null;
    ndc.set(pointerValue.x,pointerValue.y);ray.setFromCamera(ndc,camera);
    return ray.ray.direction.y<-.01&&ray.ray.intersectPlane(groundPlane,intersection)?{x:intersection.x,z:intersection.z}:null;
  }
  function sameRailStart(anchor){
    if(!anchor||anchor.cityId!==railSource)return false;
    const station=railSnapshot.stations.find(station=>station.cityId===railSource);
    const start=railAttachments?.[railReverse?'to':'from']??(station?railways.anchorAt({}, {stationId:station.id,side:railReverse?-1:1})?.attachment:null);
    if(!anchor.attachment||!start)return true;
    return Math.hypot(start.x-anchor.attachment.x,start.z-anchor.attachment.z)<.1;
  }
  function chooseRailAnchor(anchor){
    if(!anchor)return;
    if(!railSource){
      railSource=anchor.cityId;railReverse=false;railDirectionChosen=false;railTarget=railHover=railHoverAnchor=null;
      railAttachments=anchor.attachment?{from:anchor.attachment}:null;railWaypoints=null;
    }else if(!sameRailStart(anchor)){
      if(anchor.cityId===railSource&&!railAttachments?.[railReverse?'to':'from']){
        const station=railSnapshot.stations.find(station=>station.cityId===railSource);
        if(station)railAttachments={...railAttachments,[railReverse?'to':'from']:railways.anchorAt({}, {stationId:station.id,side:railReverse?-1:1})?.attachment};
      }
      railTarget=anchor.cityId;railHover=railHoverAnchor=null;railWaypoints=null;
      railAttachments={...railAttachments,[railReverse?'from':'to']:anchor.attachment};
    }
    message='';railPreview=null;railPreviewFlow.clear();railConfirmed=false;pendingRailBuild=false;
  }
  function dragRail(event){
    if(!railDrag.moved&&Math.hypot(event.clientX-railDrag.x,event.clientY-railDrag.y)<2)return;
    railDrag.moved=true;pointer=eventPointer(event);
    const point=groundAt(pointer);if(!point)return;
    const handle=railDrag.points[railDrag.index],endpoint=handle.kind==='from'||handle.kind==='to';
    let hit=endpoint?railAnchor(pointer):null;
    if(hit?.kind==='city'){
      const station=railSnapshot.stations.find(station=>station.cityId===hit.cityId);
      if(station)hit=railways.anchorAt(hit,{stationId:station.id,side:handle.kind==='from'?1:-1,ownerId:game.ownerId});
    }
    // Keep the untouched end's explicit station/track identity. A moved end
    // may be temporarily wrong-way; the model shows it red without losing it.
    const position=hit?.attachment??point;
    railDrag.points[railDrag.index]={...handle,x:position.x,z:position.z,attachment:hit?.attachment};
    if(hit?.attachment){
      if((handle.kind==='from')!==railReverse)railSource=hit.cityId;else railTarget=hit.cityId;
    }
    railWaypoints=railDrag.points.filter(point=>point.kind==='bend').map(({x,z})=>({x,z}));
    const from=railDrag.points.find(point=>point.kind==='from'),to=railDrag.points.find(point=>point.kind==='to');
    railAttachments={from:from.attachment??{x:from.x,z:from.z},to:to.attachment??{x:to.x,z:to.z}};
  }
  listen(canvas,'pointermove',event=>{
    if(railDrag?.id===event.pointerId){event.preventDefault();event.stopImmediatePropagation();dragRail(event);return;}
    if(press?.id===event.pointerId&&Math.hypot(event.clientX-press.x,event.clientY-press.y)>=5)press.moved=true;
    if(press?.connecting){event.preventDefault();event.stopImmediatePropagation();}
    if(!walking)pointer=eventPointer(event);
  },true);
  listen(canvas,'pointerleave',event=>{if(!event.relatedTarget?.closest?.('.settlement-hud, .loop-hud')&&!railDrag&&!press?.connecting)pointer=null;});
  listen(canvas,'pointerdown',event=>{
    if(walking||transitioning||event.button!==0)return;
    pointer=eventPointer(event);
    const handles=railPreview?.handles??[],index=tool==='rail'&&railTarget?pickRailwayHandle(world,handles,camera,pointer,canvas.getBoundingClientRect()):-1;
    if(index>=0){
      event.preventDefault();event.stopImmediatePropagation();focusCanvas();onClaimPointer();
      railDrag={id:event.pointerId,index,x:event.clientX,y:event.clientY,moved:false,points:handles.map(point=>({...point}))};
      canvas.setPointerCapture?.(event.pointerId);return;
    }
    if(press){releaseRailPress();return;}
    const anchor=tool==='rail'?railAnchor(pointer):null;
    if(anchor){
      event.preventDefault();event.stopImmediatePropagation();focusCanvas();onClaimPointer();
      const started=!railSource;if(started)chooseRailAnchor(anchor);
      press={id:event.pointerId,x:event.clientX,y:event.clientY,tool,connecting:true,started,anchor};
      canvas.setPointerCapture?.(event.pointerId);return;
    }
    const circuit=circuitAt(pointer);if(circuit)onClaimPointer();
    focusCanvas();press={id:event.pointerId,x:event.clientX,y:event.clientY,tool,circuit};
  },true);
  listen(canvas.ownerDocument.defaultView,'pointerup',event=>{
    if(railDrag?.id===event.pointerId){event.preventDefault();event.stopImmediatePropagation();dragRail(event);releaseRailDrag();return;}
    if(press?.id!==event.pointerId)return;
    if(press.connecting){
      event.preventDefault();event.stopImmediatePropagation();pointer=eventPointer(event);
      if(press.moved||Math.hypot(event.clientX-press.x,event.clientY-press.y)>=5||!press.started)chooseRailAnchor(railAnchor(pointer));
      releaseRailPress();return;
    }
    if(!press.moved&&Math.hypot(event.clientX-press.x,event.clientY-press.y)<5){
      if(tool==='rail')railClick=eventPointer(event);
      else{
        const circuit=press.circuit&&circuitAt(eventPointer(event));
        if(circuit){
          selectedCircuit=nextCircuitId(circuit.loops,selectedCircuit);circuitCandidates=circuit.loops.map(loop=>loop.id);inspectedCity=null;
          const line=railSnapshot.lines.find(line=>line.id===circuit.anchor.lineId);
          selectedCircuitAnchor=line?sampleLine(line,circuit.anchor.distance):null;
        }
        else{clearCircuit();inspectedCity=pickRailwayCity(world,railways.cities,camera,eventPointer(event),canvas.getBoundingClientRect())?.id??null;}
      }
    }
    releaseRailPress();
  });
  listen(canvas,'pointercancel',()=>{releaseRailPress();releaseRailDrag();});
  listen(canvas,'lostpointercapture',event=>{if(railDrag?.id===event.pointerId)releaseRailDrag();if(press?.id===event.pointerId)releaseRailPress();});
  listen(canvas.ownerDocument.defaultView,'blur',()=>{releaseRailPress();releaseRailDrag();pendingBuild=false;pendingChop=false;pendingHit=null;pendingRailBuild=false;railClick=null;});
  listen(canvas,'dblclick',event=>{if(tool==='rail'||circuitAt(eventPointer(event))){event.preventDefault();event.stopImmediatePropagation();}},true);
  function clearRailScenery(result){
    for(const id of result.clearedTreeIds??[])if(reducedMotion?.matches||!detail.fellTree(id))detail.removeTree(id);
    detail.clearScenery?.(result.clearedPlacements??result.clearedPlacementIds??[],{animate:!reducedMotion?.matches});
  }
  function synchronize(){
    if(loopMode){const stations=railways.synchronizeStations();if(stations.changed)clearRailScenery(stations);}
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
        if(!loopMode)residents.sync(snapshot);levels.sync(snapshot.cities??[]);
      }
      revision=game.revision;
    }
    if(session.revision!==sessionRevision||detail.placementRevision!==detailRevision||(resourceWork?.placementRevision??0)!==resourceRevision){
      sessionRevision=session.revision;
      detailRevision=detail.placementRevision;resourceRevision=resourceWork?.placementRevision??0;
      scenery=[...detail.placements,...resourcePlacements(),...session.buildings,...villageObjects];
      collisions=[...detail.getCollisionPlacements(),...resourcePlacements(),...session.buildings,...villageObjects];
      meshes=[...detail.getTerrainMeshes(),...houseMeshes,...villageArt?.meshes??[],...bots.meshes,...railwayArt.meshes];
      streets=[...detail.cityStreets,...session.paths,...villagePaths];
    }
  }
  function findHarvestTarget(player){
    let selected=null,best=Infinity;
    const fx=Math.sin(player.heading),fz=Math.cos(player.heading);
    for(const item of scenery){
      const ore=loopMode&&isMineableOre(item);
      if(!ore&&(!isHarvestableWood(item)||game.isTreeRemoved(item))||session.shared.isSceneryRemoved(item))continue;
      const dx=item.x-player.position.x,dz=item.z-player.position.z,distance=Math.hypot(dx,dz);
      if(distance>(ore?SETTLEMENT.mineReach:SETTLEMENT.chopReach)||distance<1e-6
        ||ore&&Math.abs(player.position.y-(item.y??0))>1.2)continue;
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
    clearRailScenery(result);synchronize();
  }
  function updateRailways(){
    if(tool!=='rail'||walking||transitioning){railClick=null;pendingRailBuild=false;railwayArt.preview(null,{visible:false});return null;}
    const cities=railways.cities,hasCity=cities.some(city=>city.ownerId===game.ownerId&&(!loopMode||city.level>=2));
    if(railClick){chooseRailAnchor(railAnchor(railClick));railClick=null;}
    if(railSource&&!cities.some(city=>city.id===railSource)){railSource=railTarget=railHover=railHoverAnchor=null;railWaypoints=railAttachments=null;}
    if(railTarget&&!cities.some(city=>city.id===railTarget)){railTarget=null;railWaypoints=railAttachments=null;}
    if(railSource&&!railTarget&&(!press||press.connecting)){
      const anchor=railAnchor(pointer);railHoverAnchor=!sameRailStart(anchor)?anchor:null;railHover=railHoverAnchor?.cityId??null;
    }
    const destination=railTarget??railHover,pair=railSource&&destination?`${railSource}>${destination}`:'';
    if(pair!==railControlPair){
      railControlPair=pair;
      railControlCount=pair?(railWaypoints?.length??railwayControlCount(cities.find(city=>city.id===railSource),cities.find(city=>city.id===destination))):undefined;
    }
    // Selection order is independent of travel direction. Closing a circuit by
    // selecting the remaining entry first should produce the return track.
    // Defer flips until an endpoint drag ends: its captured handles have roles
    // in the current direction. An explicit R press remains authoritative.
    if(loopMode&&railSource&&destination&&!railDrag){
      const linked=(a,b)=>railSnapshot.connections.some(connection=>connection.from===a&&connection.to===b);
      setRailDirection(railwayDraftDirection({reverse:railReverse,locked:railDirectionChosen,
        start:railAttachments?.[railReverse?'to':'from'],
        end:railTarget?railAttachments?.[railReverse?'from':'to']:railHoverAnchor?.attachment,
        hasOutbound:linked(railSource,destination),hasReturn:linked(destination,railSource)}));
    }
    const from=railReverse?destination:railSource,to=railReverse?railSource:destination;
    const attachments={...railAttachments};
    if(!railTarget&&railHoverAnchor)attachments[railReverse?'from':'to']=railHoverAnchor.attachment;
    const options={waypoints:railWaypoints??undefined,attachments,controlCount:railControlCount};
    if(railSource&&destination){
      const state=railPreviewFlow.update(from,to,options,{dragging:!!railDrag||!!press?.connecting,gold:game.gold});
      railPreview=state.result;railPlanning=state.checking;railConfirmed=state.confirmed;
    }else{railPreviewFlow.clear();railPreview=null;railPlanning=railConfirmed=false;}
    if(pendingRailBuild&&railSource&&railTarget&&railConfirmed&&!railPlanning&&!railDrag&&!press?.connecting&&railPreview?.valid){
      const result=railways.build(from,to,{...options,requireCached:true});
      if(result.ok){
        applyRailBuild(result);notify(`−${result.cost} gold · ${loopMode?'one-way track built':'automatic freight connected'}`);railSource=railTarget=railHover=railHoverAnchor=railPreview=null;railWaypoints=railAttachments=null;railPreviewFlow.clear();railConfirmed=false;
      }else{railPreview=result;if(result.code==='world-changed')railPreviewFlow.clear();notify(result.reason??'Choose another route');}
    }
    pendingRailBuild=false;
    // Endpoints follow the fitted station port, rather than the unconstrained
    // cursor. Interior handles retain their requested edit positions.
    let guide=railPreview;
    if(!guide&&railSource&&press?.connecting&&press.moved){
      const end=groundAt(pointer),start=railAttachments?.[railReverse?'to':'from']??cities.find(city=>city.id===railSource);
      if(start&&end)guide={siteValid:true,valid:false,code:'choose-destination',attachments:{from:start,to:end}};
    }
    railwayArt.preview(guide,{cities,sourceCityId:railSource,targetCityId:destination,
      rangeCityId:loopMode?cities.find(city=>city.ownerId===game.ownerId)?.id:railSource,maxConnectionDistance:railways.maxConnectionDistance,
      visible:true,editable:!!railTarget&&railPreview?.code!=='out-of-range',handles:railPreview?.handles??[],activeHandle:railDrag?.index??-1});
    return {minHomes:loopMode?6:3,canReverse:loopMode&&!!railSource&&!!destination,reversed:railReverse,stage:railPlanning?'planning':railTarget&&railPreview?'preview':railSource?'destination':'source',hasCity,cost:railPreview?.cost??(economy?8:5),hovering:!!railHover,siteValid:!!railPreview?.siteValid,
      canBuild:!!railTarget&&railConfirmed&&!railDrag&&!press?.connecting&&!railPlanning&&!!railPreview?.valid,reason:railPreview?.reason??message,code:railPreview?.code??'',
      sourceLabel:railwayCityLabel(cities.find(city=>city.id===from),game.ownerId),targetLabel:railwayCityLabel(cities.find(city=>city.id===to),game.ownerId)};
  }
  function develop(player){
    if(!snapshot.pendingMilestones?.length)return;
    developmentPlayer={x:player.position.x,z:player.position.z};
    game.develop({player:player.position,placements:scenery,ready,isReadyAt});synchronize();
  }
  synchronize();
  return{
    game,art,hud,residents,villageArt,villageResidents,bots,session,railways,railwayArt,economy,economicBots,tradeArt,resourceWork,resourceWorkArt,loopHud,resourceGains,circuitArt,
    get building(){return tool==='house'||tool==='rail';},
    get railwayPlanning(){return tool==='rail';},
    get placements(){synchronize();return scenery;},get placementRevision(){synchronize();return `${detailRevision}:${sessionRevision}:${resourceRevision}`;},
    get cityStreets(){synchronize();return streets;},
    get railwayLines(){synchronize();return railLines;},
    getCollisionPlacements(){synchronize();return collisions;},getTerrainMeshes(){synchronize();return meshes;},
    keyDown(event){
      const key=event.key.toLowerCase();
      if(key==='escape'&&!walking&&tool==='axe'&&(selectedCircuit||inspectedCity)){clearCircuit();return true;}
      if(loopMode&&key==='enter'&&!walking&&!transitioning&&tool==='axe'&&selectedCircuit){if(!event.repeat)loopHud.buySelected();return true;}
      if(economy&&!loopMode&&key==='g'){if(!event.repeat)depositTimber();return true;}
      if(economy&&!loopMode&&['1','2','3'].includes(key)){if(!event.repeat&&industryCity)changeIndustry(industryCity,['lumber','farm','workshop'][Number(key)-1]);return true;}
      if(tool==='rail'&&key==='r'){if(!event.repeat)reverseRail();return true;}
      if(key==='t'){if(!event.repeat&&!walking&&!transitioning)selectTool(tool==='rail'?'axe':'rail');return true;}
      if(tool==='rail'&&['escape','enter','e'].includes(key)){
        if(!event.repeat){if(key==='enter')pendingRailBuild=railConfirmed&&!railPlanning&&!railDrag&&!press?.connecting&&!!railPreview?.valid;else selectTool('axe');}return true;
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
      const player=getPlayer();synchronize();const tree=findHarvestTarget(player);
      pendingHit=tree?{tree,time:.22}:null;
      if(!tree)notify(loopMode?'Face a nearby tree or ore deposit':'Face a nearby tree');
    },
    cancelBuild(){selectTool('axe');},
    update(dt,{walking:walkingNow,transitioning:transitionNow,camera:activeCamera,mapBlend=0,walkingWeight=Number(walkingNow),focus,viewportHeight=800,zoom=1,dayState,night=0,uiDt=dt}={}){
      if(disposed)return;
      walking=walkingNow;transitioning=transitionNow;camera=activeCamera;const player=getPlayer();
      if(walking&&tool==='rail'||!walking&&tool==='house')selectTool('axe');
      bots.simulate(dt,{completedDays:dayState?.completedDays??0});
      synchronize();
      resourceWork?.update(dt,{night,dayPhase:dayState?.phase});
      for(const event of resourceWork?.drainEvents()??[]){
        if(event.type==='gathered'&&event.ownerId===game.ownerId)resourceGains?.emit(event);
        else if(event.type==='tree-remove'){if(reducedMotion?.matches||!detail.fellTree(event.treeId,{direction:event.direction}))detail.removeTree(event.treeId);}
        else if(event.type==='tree-regrow')detail.restoreTree?.(event.treeId);
      }
      economy?.update(dt);economicBots?.update(dt);
      const economicEvents=economy?.drainEvents()??[];
      for(const event of economicEvents)if(event.type==='income'&&event.ownerId===game.ownerId){
        if(walkingWeight<.5)incomeEffects.emit(event.houses);canvas.dataset.lastIncome=String(event.amount);
      }
      for(const event of economicEvents){
        if(event.ownerId===game.ownerId&&['pickup','delivery'].includes(event.type))resourceGains?.emit(event);
        if(event.type==='pickup'&&event.cityOwnerId===game.ownerId&&event.gold>0)resourceGains?.emit({...event,kind:'gold',ownerId:game.ownerId,resource:'gold',amount:event.gold,resources:{gold:event.gold}});
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
          const ore=isMineableOre(tree),reach=ore?SETTLEMENT.mineReach:SETTLEMENT.chopReach;
          if(walking&&surfaceDistance(world,tree,player.position)<=reach&&!game.isTreeRemoved(tree)){
            const result=ore?game.mine(tree,{player:player.position}):game.chop(tree,{player:player.position});
            if(result.ok){
              if(!ore){resourceWork?.trackTree(tree);detail.fellTree(result.treeId,{direction:{x:tree.x-player.position.x,z:tree.z-player.position.z}});}
              if(!loopMode)notify(`+${result.logs} ${economy?'timber':'logs'}`);
              synchronize();if(!ore)develop(player);
            }
          }
        }
      }
      targetTree=ready&&walking&&!transitioning&&tool==='axe'?findHarvestTarget(player):null;
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
      const liveTrains=economy?.trains??[];
      tradeArt?.update(liveTrains,{camera,mapBlend,walkingWeight,viewportHeight,zoom});
      art.preview(placement,{visible:walking&&tool==='house'&&ready&&!transitioning,targetTree});art.update({mapBlend,dt:uiDt,reducedMotion:reducedMotion?.matches,night});
      const connectedHouses=snapshot.houses.filter(h=>h.connected).length;
      const target=placement?.house??player?.position??{x:0,z:0};
      let nearest=null,distance=Infinity;
      for(const cluster of snapshot.clusters??snapshot.cities??[]){const d=surfaceDistance(world,cluster,target);if(d<distance){distance=d;nearest=cluster;}}
      if(placement?.connectionHouseId)nearest=(snapshot.clusters??[]).find(cluster=>cluster.houseIds.includes(placement.connectionHouseId))??nearest;
      else if(placement&&!placement.connectionHouseId)nearest=null;
      const cityBuildings=(snapshot.buildings??[]).filter(item=>item.cityId===nearest?.id);
      const cityPending=(snapshot.pendingDevelopments??[]).filter(item=>item.cityId===nearest?.id).map(item=>item.type);
      if(!loopMode)residents.update(dt,{focus:focus??player.position,mapBlend,walkingWeight,visible:ready,reducedMotion:reducedMotion?.matches,night,dayPhase:dayState?.phase,unavailableHomes:art.construction.activeIds});
      resourceWorkArt?.update(dt,{focus:focus??player.position,mapBlend,walkingWeight,visible:!walking||ready,reducedMotion:reducedMotion?.matches,night,dayPhase:dayState?.phase,
        unavailableHomes:new Set([...art.construction.activeIds,...bots.entries.flatMap(entry=>[...entry.art.construction.activeIds])])});
      villageArt?.update({mapBlend});
      if(!loopMode)villageResidents?.update(dt,{focus:focus??player.position,mapBlend,walkingWeight,visible:ready,reducedMotion:reducedMotion?.matches,night,dayPhase:dayState?.phase});
      villageLevels?.update({camera,mapBlend,walkingWeight,viewportHeight});
      bots.update(dt,{camera,mapBlend,walkingWeight,focus:focus??player?.position,viewportHeight,night,dayPhase:dayState?.phase,uiDt});
      levels.update({camera,mapBlend,walkingWeight,viewportHeight});
      incomeEffects.update(uiDt,{camera,mapBlend,walkingWeight,viewportHeight,reducedMotion:reducedMotion?.matches});
      resourceGains?.update(uiDt,{camera,viewport:canvas.getBoundingClientRect(),mapBlend,walkingWeight,reducedMotion:reducedMotion?.matches});
      const resources=game.resourcesAt(placement?.house??player?.position);
      if(economy){
        const key=`${economy.revision}:${Math.floor(economy.elapsed)}`;
        if(key!==economyViewKey){economyViewKey=key;economyView=economy.snapshot();}
        const cityId=railTarget??railHover??railSource??(!walking?inspectedCity:null)??nearest?.id;
        const city=economyView.cities.find(city=>city.id===cityId);industryCity=city?.ownerId===game.ownerId?city.id:null;
        economyHud?.update({city,houses:snapshot.houses.length,walking,tool,night,time:economyView.time,nextPulse:economyView.nextPulse,
          delivered:economyView.stats.deliveries,carried:snapshot.logs,localCityId:economy.resourcesAt(game.ownerId,player?.position).cityId,stationCount:railSnapshot.stations.filter(station=>station.ownerId===game.ownerId).length,events:economicEvents,feedback:messageTime>0?message:''});
        const ownCity=economyView.cities.find(city=>city.ownerId===game.ownerId);
        const selectionKey=`${railRevision}:${(ownCity?.loops??[]).map(loop=>loop.id).join(',')}`;
        if(selectionKey!==circuitKey){
          circuitKey=selectionKey;circuitPick=buildCircuitSelection({loops:ownCity?.loops??[],lines:railSnapshot.lines});
          if(selectedCircuit&&!circuitPick.loops.some(loop=>loop.id===selectedCircuit))clearCircuit();
          circuitCandidates=circuitCandidates.filter(id=>circuitPick.loops.some(loop=>loop.id===id));
        }
        hoverTime-=uiDt;
        if(hoverTime<=0){hoverTime=.12;const hit=!press&&!transitioning?circuitAt(pointer):null;hoverCircuit=hit?.loops.find(loop=>loop.id===selectedCircuit)?.id??hit?.loops[0]?.id??null;}
        const shownCircuit=selectedCircuit??hoverCircuit,artKey=`${railRevision}:${shownCircuit??''}`;
        if(artKey!==circuitArtKey){circuitArtKey=artKey;circuitArt?.sync(circuitPick.loops.find(loop=>loop.id===shownCircuit),railSnapshot.lines);}
        circuitArt?.update({camera,viewportHeight,mapBlend,walkingWeight,visible:tool==='axe'&&!transitioning,hover:!selectedCircuit});
        loopHud?.update({camera,viewport:canvas.getBoundingClientRect(),anchor:selectedCircuitAnchor,transitioning,city:!walking?economyView.cities.find(city=>city.id===inspectedCity):null,ownCity,cities:economyView.cities,selectedLoopId:selectedCircuit,candidateIds:circuitCandidates,trains:liveTrains,
          houses:snapshot.houses.length,resources,walking,tool,night,feedback:messageTime>0?message:'',delivered:economyView.stats.laps});
        Object.assign(canvas.dataset,{selectedCircuit:selectedCircuit??'',hoverCircuit:hoverCircuit??'',circuitCandidates:String(circuitCandidates.length),resourcePopups:String(resourceGains?.visibleCount??0)});
        Object.assign(canvas.dataset,{resources:String(resources.resources??resources.timber),food:String(resources.food??0),production:String(economyView.stats.produced?.resources??0),economyTime:String(Math.floor(economy.elapsed)),deliveries:String(economyView.stats.deliveries),
          freightTrains:String(tradeArt.stats.active??0),localTools:String(resources.tools),localGrain:String(resources.grain),economyCity:city?.id??'',industry:city?.industry??''});
      }
      hud.update({logs:economy?resources.resources??resources.timber:snapshot.logs,economic:loopMode?'loops':!!economy,buildCost:game.constructionCost,resources,gold:snapshot.gold,nightAmount:night,dayPhase:dayState?.phase??'day',houses:snapshot.houses.length,connectedHouses,cityHouses:nearest?.houseCount??1,cityLevel:nearest?.level??0,buildings:cityBuildings,pendingMilestones:cityPending,tool,walking,ready,
        canBuild:!!placement?.valid,connected:placement?.connected??true,reason:placement?.reason??'',targetTree:!!targetTree&&!isMineableOre(targetTree),targetOre:isMineableOre(targetTree),message,railway:railwayHud??{minHomes:loopMode?6:3,hasCity:game.cities.some(city=>!loopMode||city.level>=2),cost:economy?8:5}});
      Object.assign(canvas.dataset,{gameplay:'settlement',logs:String(snapshot.logs),gold:String(snapshot.gold),incomeDay:String(snapshot.lastIncomeDay),incomeCoins:String(incomeEffects.visibleCount),houses:String(snapshot.houses.length),connectedHouses:String(connectedHouses),
        paths:String(snapshot.paths?.length??0),choppedTrees:String(snapshot.removedTreeIds.length),construction:String(art.construction.count),constructionDust:String(art.construction.dustCount),residentsIndoors:String(residents.stats.indoors??0),buildMode:String(tool==='house'),buildValid:String(!!placement?.valid),buildReason:placement?.code??'',
        cities:String(snapshot.cities?.length??0),cityLevels:(snapshot.cities??[]).map(city=>city.level).join(','),residents:String(resourceWork?.stats.workers??residents.stats?.residents??residents.stats?.count??0),
        farmVillages:String(villages?.cities?.length??0),villageResidents:String(villageResidents?.stats.residents??0),villageResidentsIndoors:String(villageResidents?.stats.indoors??0),
        playerBots:String(bots.entries.length),botHouses:bots.entries.map(entry=>entry.houseCount).join(','),
        railMode:String(tool==='rail'),railConnections:String(railSnapshot.connections.length),railStations:String(railSnapshot.stations.length),
        railSource:railSource??'',railTarget:railTarget??'',railHover:railHover??'',railHandles:String(railPreview?.handles?.length??0),railEditing:String(!!railDrag),railPlanning:String(railPlanning),railValid:String(!!railPreview?.valid),railReason:railPreview?.code??'',
        botLevels:bots.entries.map(entry=>entry.snapshot.cities[0]?.level??0).join(','),botStates:bots.entries.map(entry=>entry.bot.state).join(','),
        civicBuildings:String(snapshot.buildings?.length??0),buildingTypes:(snapshot.buildings??[]).map(item=>item.buildingType).join(','),pendingMilestones:(snapshot.pendingMilestones??[]).join(','),
        buildX:placement?.house?.x?.toFixed(2)??'',buildZ:placement?.house?.z?.toFixed(2)??'',buildRotation:placement?.house?.rotation?.toFixed(4)??'',targetTree:!isMineableOre(targetTree)?targetTree?.id??'':'',targetOre:isMineableOre(targetTree)?targetTree.id:''});
    },
    dispose(){disposed=true;releaseRailDrag();releaseRailPress();railPreviewFlow.dispose();railPlanner.dispose();botRailPlanner?.dispose();for(const remove of listeners)remove();hud.dispose();economyHud?.dispose();loopHud?.dispose();resourceGains?.dispose();circuitArt?.dispose();resourceWorkArt?.dispose();resourceWork?.dispose();economicBots?.dispose();tradeArt?.dispose();art.dispose();residents.dispose();levels.dispose();incomeEffects.dispose();villageArt?.dispose();villageResidents?.dispose();villageLevels?.dispose();bots.dispose();railwayArt.dispose();},
  };
}
