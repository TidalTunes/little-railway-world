import * as THREE from 'three';
import {createSettlementGame,SETTLEMENT} from './settlement-game.js';
import {createSettlementArt} from './settlement-art.js';
import {createSettlementHud} from './settlement-hud.js';
import {createSettlementResidents} from './settlement-residents.js';
import {createCityLevelMarkers} from './city-level-markers.js';
import {createSettlementIncomeEffects} from './settlement-income-effects.js';
import {surfaceDistance,surfaceOffset} from './world-surface.js';

/** Session gameplay connects the existing movement, streamed scenery and shared
 * art. The rules stay independent of input, animation and the HUD. */
export function createSettlementController({canvas,world,parent,mapParent,markerParent=parent,markerMapParent=mapParent,detail,getPlayer,onView,onDayNight=()=>{},reducedMotion}){
  const game=createSettlementGame(world),art=createSettlementArt(parent,mapParent,world);
  const residents=createSettlementResidents(parent,world),levels=createCityLevelMarkers(markerParent,markerMapParent,world);
  const incomeEffects=createSettlementIncomeEffects(markerParent,markerMapParent,world);
  let snapshot=game.snapshot(),tool='axe',pointer=null,press=null,placement=null,targetTree=null;
  let walking=true,transitioning=false,ready=false,camera=null,pendingBuild=false,pendingChop=false,pendingHit=null,message='',messageTime=0;
  let revision=-1,detailRevision=-1,developmentDetailRevision=-1,developmentPlayer=null,scenery=[],collisions=[],meshes=[],houseMeshes=[],streets=[],previewKey='',disposed=false;
  const ray=new THREE.Raycaster(),ndc=new THREE.Vector2(),groundPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0),intersection=new THREE.Vector3();
  const listeners=[],facing=new THREE.Vector3();
  const focusCanvas=()=>canvas.focus({preventScroll:true});
  function selectTool(next){tool=next;pointer=null;pendingBuild=false;pendingChop=false;previewKey='';message='';focusCanvas();}
  const hud=createSettlementHud({parent:canvas.parentElement,playerColor:'#257d70',
    onTool:selectTool,onView:()=>{selectTool('axe');onView();},onDayNight:()=>{onDayNight();focusCanvas();},
    onChop:()=>{selectTool('axe');pendingChop=true;},
    onBuild:()=>{pendingBuild=true;focusCanvas();},onCancel:()=>selectTool('axe')});
  function listen(target,type,listener,options){target.addEventListener(type,listener,options);listeners.push(()=>target.removeEventListener(type,listener,options));}
  listen(canvas,'pointermove',event=>{
    if(tool!=='house'||event.buttons)return;
    const box=canvas.getBoundingClientRect();pointer={x:(event.clientX-box.left)/box.width*2-1,y:1-(event.clientY-box.top)/box.height*2};
  });
  // The HUD's Build button must commit the last visible preview, not silently
  // move it back in front of the traveller when the pointer leaves the canvas.
  listen(canvas,'pointerleave',event=>{if(!event.relatedTarget?.closest?.('.settlement-hud'))pointer=null;});
  listen(canvas,'pointerdown',event=>{
    if(walking||transitioning||tool!=='house'||event.button!==0)return;
    event.preventDefault();event.stopImmediatePropagation();focusCanvas();
    press={id:event.pointerId,x:event.clientX,y:event.clientY};canvas.setPointerCapture?.(event.pointerId);
  },true);
  listen(canvas.ownerDocument.defaultView,'pointerup',event=>{
    if(press?.id!==event.pointerId)return;
    pendingBuild=Math.hypot(event.clientX-press.x,event.clientY-press.y)<5;press=null;
    if(canvas.hasPointerCapture?.(event.pointerId))canvas.releasePointerCapture(event.pointerId);
  });
  listen(canvas,'pointercancel',()=>{press=null;});
  listen(canvas.ownerDocument.defaultView,'blur',()=>{press=null;pendingBuild=false;pendingChop=false;pendingHit=null;});
  function synchronize(){
    const changed=game.revision!==revision;
    if(changed){
      const previousCount=snapshot.houses.length,previousBuildings=snapshot.buildings?.length??0;snapshot=game.snapshot();
      if(revision<0||snapshot.houses.length!==previousCount||(snapshot.buildings?.length??0)!==previousBuildings){
        art.sync(snapshot.houses,snapshot.paths??[],snapshot.buildings??[],{animate:revision>=0,reducedMotion:reducedMotion?.matches});houseMeshes=art.meshes;
        residents.sync(snapshot);levels.sync(snapshot.cities??[]);
      }
      revision=game.revision;
    }
    if(changed||detail.placementRevision!==detailRevision){
      detailRevision=detail.placementRevision;
      scenery=[...detail.placements,...snapshot.houses,...(snapshot.buildings??[])];
      collisions=[...detail.getCollisionPlacements(),...snapshot.houses,...(snapshot.buildings??[])];
      meshes=[...detail.getTerrainMeshes(),...houseMeshes];
      streets=[...detail.cityStreets,...(snapshot.paths??[])];
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
  function candidate(player){
    let point;
    if(pointer&&camera){
      ndc.set(pointer.x,pointer.y);ray.setFromCamera(ndc,camera);
      if(ray.ray.intersectPlane(groundPlane,intersection)&&ray.ray.direction.y<-.01)point={x:intersection.x,z:intersection.z};
    }
    if(!point)point=surfaceOffset(world,player.position.x,player.position.z,Math.sin(player.heading)*3.8,Math.cos(player.heading)*3.8);
    return point;
  }
  // Overview lifts the arm's-reach limit, but the traveller still occupies a
  // real footprint. Never allow a new house to trap the persistent character.
  const isReadyAt=point=>detail.hasCoverageAt(point,1);
  function context(player,pose){
    const heading=walking||!camera?player.heading:Math.atan2(camera.getWorldDirection(facing).x,facing.z);
    return {player:player.position,heading,enforceReach:walking,placements:scenery,ready:detail.hasCoverageAt(pose,2),isReadyAt};}
  function notify(text){message=text;messageTime=3.2;}
  function develop(player){
    if(!snapshot.pendingMilestones?.length)return;
    developmentPlayer={x:player.position.x,z:player.position.z};
    game.develop({player:player.position,placements:scenery,ready,isReadyAt});synchronize();
  }
  synchronize();
  return{
    game,art,hud,residents,
    get building(){return tool==='house';},
    get placements(){synchronize();return scenery;},get placementRevision(){synchronize();return `${detailRevision}:${revision}`;},
    get cityStreets(){synchronize();return streets;},
    getCollisionPlacements(){synchronize();return collisions;},getTerrainMeshes(){synchronize();return meshes;},
    keyDown(event){
      const key=event.key.toLowerCase();
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
    update(dt,{walking:walkingNow,transitioning:transitionNow,camera:activeCamera,mapBlend=0,walkingWeight=Number(walkingNow),focus,viewportHeight=800,dayState,night=0,uiDt=dt}={}){
      if(disposed)return;
      walking=walkingNow;transitioning=transitionNow;camera=activeCamera;const player=getPlayer();
      const income=game.settleIncome(dayState?.completedDays??0);
      if(income?.amount>0){
        if(walkingWeight>.5)hud.showIncome(income);else incomeEffects.emit(income.houses);
        canvas.dataset.lastIncome=String(income.amount);
      }
      detail.updateTrees(reducedMotion?.matches?1:dt);synchronize();
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
            if(result.ok){detail.fellTree(result.treeId,{direction:{x:tree.x-player.position.x,z:tree.z-player.position.z}});notify(`+${result.logs} logs`);synchronize();develop(player);}
          }
        }
      }
      targetTree=ready&&walking&&!transitioning&&tool==='axe'?findTree(player):null;
      if(ready&&tool==='house'&&!transitioning){
        const pose=candidate(player),buildContext=context(player,pose);
        const key=`${pose.x}:${pose.z}:${player.position.x}:${player.position.z}:${buildContext.heading}:${walking}:${buildContext.ready}:${revision}:${detailRevision}`;
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
      art.preview(placement,{visible:tool==='house'&&ready&&!transitioning,targetTree});art.update({mapBlend,dt:uiDt,reducedMotion:reducedMotion?.matches,night});
      const connectedHouses=snapshot.houses.filter(h=>h.connected).length;
      const target=placement?.house??player?.position??{x:0,z:0};
      let nearest=null,distance=Infinity;
      for(const cluster of snapshot.clusters??snapshot.cities??[]){const d=surfaceDistance(world,cluster,target);if(d<distance){distance=d;nearest=cluster;}}
      if(placement?.connectionHouseId)nearest=(snapshot.clusters??[]).find(cluster=>cluster.houseIds.includes(placement.connectionHouseId))??nearest;
      else if(placement&&!placement.connectionHouseId)nearest=null;
      const cityBuildings=(snapshot.buildings??[]).filter(item=>item.cityId===nearest?.id);
      const cityPending=(snapshot.pendingDevelopments??[]).filter(item=>item.cityId===nearest?.id).map(item=>item.type);
      residents.update(dt,{focus:focus??player.position,mapBlend,walkingWeight,visible:ready,reducedMotion:reducedMotion?.matches,night,dayPhase:dayState?.phase,unavailableHomes:art.construction.activeIds});
      levels.update({camera,mapBlend,walkingWeight,viewportHeight});
      incomeEffects.update(uiDt,{camera,mapBlend,walkingWeight,viewportHeight,reducedMotion:reducedMotion?.matches});
      hud.update({logs:snapshot.logs,gold:snapshot.gold,nightAmount:night,dayPhase:dayState?.phase??'day',houses:snapshot.houses.length,connectedHouses,cityHouses:nearest?.houseCount??1,cityLevel:nearest?.level??0,buildings:cityBuildings,pendingMilestones:cityPending,tool,walking,ready,
        canBuild:!!placement?.valid,connected:placement?.connected??true,reason:placement?.reason??'',targetTree:!!targetTree,message});
      Object.assign(canvas.dataset,{gameplay:'settlement',logs:String(snapshot.logs),gold:String(snapshot.gold),incomeDay:String(snapshot.lastIncomeDay),incomeCoins:String(incomeEffects.visibleCount),houses:String(snapshot.houses.length),connectedHouses:String(connectedHouses),
        paths:String(snapshot.paths?.length??0),choppedTrees:String(snapshot.removedTreeIds.length),construction:String(art.construction.count),constructionDust:String(art.construction.dustCount),residentsIndoors:String(residents.stats.indoors??0),buildMode:String(tool==='house'),buildValid:String(!!placement?.valid),buildReason:placement?.code??'',
        cities:String(snapshot.cities?.length??0),cityLevels:(snapshot.cities??[]).map(city=>city.level).join(','),residents:String(residents.stats?.residents??residents.stats?.count??0),
        civicBuildings:String(snapshot.buildings?.length??0),buildingTypes:(snapshot.buildings??[]).map(item=>item.buildingType).join(','),pendingMilestones:(snapshot.pendingMilestones??[]).join(','),
        buildX:placement?.house?.x?.toFixed(2)??'',buildZ:placement?.house?.z?.toFixed(2)??'',buildRotation:placement?.house?.rotation?.toFixed(4)??'',targetTree:targetTree?.id??''});
    },
    dispose(){disposed=true;for(const remove of listeners)remove();hud.dispose();art.dispose();residents.dispose();levels.dispose();incomeEffects.dispose();},
  };
}
