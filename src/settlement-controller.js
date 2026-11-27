import * as THREE from 'three';
import {createSettlementGame,SETTLEMENT} from './settlement-game.js';
import {createSettlementArt} from './settlement-art.js';
import {createSettlementHud} from './settlement-hud.js';
import {surfaceDistance,surfaceOffset} from './world-surface.js';

/** Session gameplay connects the existing movement, streamed scenery and shared
 * art. The rules stay independent of input, animation and the HUD. */
export function createSettlementController({canvas,world,parent,mapParent,detail,getPlayer,onView,reducedMotion}){
  const game=createSettlementGame(world),art=createSettlementArt(parent,mapParent,world);
  let snapshot=game.snapshot(),tool='axe',pointer=null,press=null,placement=null,targetTree=null;
  let walking=true,transitioning=false,ready=false,camera=null,pendingBuild=false,pendingHit=null,message='',messageTime=0;
  let revision=-1,detailRevision=-1,scenery=[],collisions=[],meshes=[],houseMeshes=[],streets=[],previewKey='',disposed=false;
  const ray=new THREE.Raycaster(),ndc=new THREE.Vector2(),groundPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0),intersection=new THREE.Vector3();
  const listeners=[];
  const focusCanvas=()=>canvas.focus({preventScroll:true});
  function selectTool(next){tool=next;pointer=null;pendingBuild=false;previewKey='';message='';focusCanvas();}
  const hud=createSettlementHud({parent:canvas.parentElement,playerColor:'#257d70',
    onTool:selectTool,onView:()=>{selectTool('axe');onView();},
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
  listen(canvas.ownerDocument.defaultView,'blur',()=>{press=null;pendingBuild=false;pendingHit=null;});
  function synchronize(){
    const changed=game.revision!==revision;
    if(changed){
      const previousCount=snapshot.houses.length;snapshot=game.snapshot();
      if(revision<0||snapshot.houses.length!==previousCount){art.sync(snapshot.houses,snapshot.paths??[]);houseMeshes=art.meshes;}
      revision=game.revision;
    }
    if(changed||detail.placementRevision!==detailRevision){
      detailRevision=detail.placementRevision;
      scenery=[...detail.placements,...snapshot.houses];
      collisions=[...detail.getCollisionPlacements(),...snapshot.houses];
      meshes=[...detail.getTerrainMeshes(),...houseMeshes];
      streets=[...detail.cityStreets,...snapshot.paths??[]];
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
  function context(player,pose){return {player:player.position,enforceReach:walking,placements:scenery,ready:detail.hasCoverageAt(pose,2),isReadyAt};}
  function notify(text){message=text;messageTime=3.2;}
  synchronize();
  return{
    game,art,hud,
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
      if(tool==='house'&&input.swing){pendingBuild=true;input.swing=false;}
      return input;
    },
    onSwing(){
      const player=getPlayer();synchronize();const tree=findTree(player);
      pendingHit=tree?{tree,time:.22}:null;
      if(!tree)notify('Step closer and face a tree');
    },
    cancelBuild(){selectTool('axe');},
    update(dt,{walking:walkingNow,transitioning:transitionNow,camera:activeCamera,mapBlend=0}={}){
      if(disposed)return;
      walking=walkingNow;transitioning=transitionNow;camera=activeCamera;const player=getPlayer();
      detail.updateTrees(reducedMotion?.matches?1:dt);synchronize();
      ready=!!player?.initialized&&detail.hasCoverageAt(player.position,2);
      if(messageTime>0){messageTime-=dt;if(messageTime<=0)message='';}
      if(pendingHit){
        pendingHit.time-=dt;
        if(pendingHit.time<=0){
          const tree=pendingHit.tree;pendingHit=null;
          // Recheck reach at impact, not just when the swing was requested.
          if(walking&&surfaceDistance(world,tree,player.position)<=SETTLEMENT.chopReach&&!game.isTreeRemoved(tree)){
            const result=game.chop(tree,{player:player.position});
            if(result.ok){detail.fellTree(result.treeId,{direction:{x:tree.x-player.position.x,z:tree.z-player.position.z}});notify(`+${result.logs} logs`);synchronize();}
          }
        }
      }
      targetTree=ready&&walking&&!transitioning&&tool==='axe'?findTree(player):null;
      if(ready&&tool==='house'&&!transitioning){
        const pose=candidate(player),buildContext=context(player,pose);
        const key=`${pose.x}:${pose.z}:${player.position.x}:${player.position.z}:${walking}:${buildContext.ready}:${revision}:${detailRevision}`;
        // An idle blueprint keeps its route. Re-plan only after aim, world or
        // player changes; the final build still validates the current scene.
        if(key!==previewKey){placement=game.evaluateBuild(pose,buildContext);previewKey=key;}
        if(pendingBuild){
          const result=game.build(pose,context(player,pose));
          if(result.ok){notify(result.connected?'House built · settlement expanded':'House built · new outpost');synchronize();tool='axe';pointer=null;}
          else{message='';messageTime=0;}
        }
      }else{placement=null;previewKey='';}
      pendingBuild=false;
      art.preview(placement,{visible:tool==='house'&&ready&&!transitioning,targetTree});art.update({mapBlend});
      const connectedHouses=snapshot.houses.filter(h=>h.connected).length;
      hud.update({logs:snapshot.logs,houses:snapshot.houses.length,connectedHouses,tool,walking,ready,
        canBuild:!!placement?.valid,connected:placement?.connected??true,reason:placement?.reason??'',targetTree:!!targetTree,message});
      Object.assign(canvas.dataset,{gameplay:'settlement',logs:String(snapshot.logs),houses:String(snapshot.houses.length),connectedHouses:String(connectedHouses),
        paths:String(snapshot.paths?.length??0),choppedTrees:String(snapshot.removedTreeIds.length),buildMode:String(tool==='house'),buildValid:String(!!placement?.valid),buildReason:placement?.code??'',
        buildX:placement?.house?.x?.toFixed(2)??'',buildZ:placement?.house?.z?.toFixed(2)??'',targetTree:targetTree?.id??''});
    },
    dispose(){disposed=true;for(const remove of listeners)remove();hud.dispose();art.dispose();},
  };
}
