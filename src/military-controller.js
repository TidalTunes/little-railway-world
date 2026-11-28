import * as THREE from 'three';
import {worldSurface} from './world-model.js';
import {createMilitarySimulation,MILITARY_RULES} from './military-simulation.js';
import {createMilitaryWorldArt} from './military-world-art.js';
import {createMilitaryHud} from './military-hud.js';
import {createMilitaryPortraits} from './military-portraits.js';
import {createMilitaryInput} from './military-input.js';
import {createMilitaryAudio} from './military-audio.js';
import {createMatchHud} from './match-hud.js';
import {surfacePoint,surfaceNormal,surfaceDistance,surfaceCoordinates} from './world-surface.js';
import {pickWorldGround} from './world-picking.js';

const KINDS=['soldier','tank','artillery','helicopter'];

/** Bridges the existing owner wallets/world to combat; the economy never
 * depends on cosmetic unit meshes, projectiles, or input selection. */
export function createMilitaryController({canvas,world,parent,mapParent,settlement,renderer,onClaimPointer=()=>{},onControl=()=>{},onView=()=>{},onCursor=()=>{},reducedMotion}){
  const ownerId=settlement.game.ownerId,selectedIds=new Set(),session=settlement.session;
  const games=[session.player,...session.bots.map(entry=>entry.game)],accounts=new Map(games.map(game=>[game.ownerId,game]));
  const team=world.players.find(player=>player.id===ownerId),matchMode=!!world.gameplay?.match;
  let cities=[],cityRevision=-1;
  let camera=null,mapBlend=0,walking=true,transitioning=false,feedback='',feedbackUntil=0,disposed=false;
  function getCities(){
    if(cityRevision===session.spatialRevision)return cities;cityRevision=session.spatialRevision;
    if(matchMode){
      const buildings=session.buildings;
      cities=session.cities.map(city=>({...city,radius:Math.max(3,...buildings.filter(item=>item.cityId===city.id).map(item=>surfaceDistance(world,city,item)+(item.radius??2)))}));
      for(const game of games)if(!cities.some(city=>city.ownerId===game.ownerId)&&game.houses.length){
        const home=game.houses[0];cities.push({id:`outpost:${game.ownerId}`,ownerId:game.ownerId,x:home.x,z:home.z,radius:3,houseCount:game.houses.length,outpost:true});
      }return cities;
    }
    cities=games.map(game=>{
      const homes=game.houses,city=game.cities[0],x=city?.x??homes.reduce((sum,h)=>sum+h.x,0)/homes.length,z=city?.z??homes.reduce((sum,h)=>sum+h.z,0)/homes.length;
      const owned=session.buildings.filter(item=>item.ownerId===game.ownerId);
      const radius=Math.max(3,city?.radius??0,...owned.map(item=>Math.hypot(item.x-x,item.z-z)+(item.radius??2)));
      return{id:city?.id??`outpost:${game.ownerId}`,ownerId:game.ownerId,x,z,radius,houseCount:homes.length};
    });return cities;
  }
  const getPlacements=()=>settlement.getMilitaryCollisionPlacements();
  const simulation=createMilitarySimulation(world,{getCities,getPlacements,getAccount:id=>accounts.get(id),botOwners:session.bots.map(entry=>entry.game.ownerId)});
  const art=createMilitaryWorldArt(parent,mapParent,world,{capacity:MILITARY_RULES.maxUnits});
  const hud=createMilitaryHud({parent:canvas.parentElement,team,onBuy:buy});
  const audio=createMilitaryAudio({canvas,world,controlsParent:hud.root});
  const local=()=>simulation.match?.player(ownerId),role=()=>local()?.role??'hybrid';
  const matchHud=matchMode?createMatchHud({parent:canvas.parentElement,player:local(),team:world.gameplay.match.teams.find(t=>t.id===team.teamId),
    onPossess:possess,onRole:setRole,onInvitation:(event,accept)=>{
      const result=accept?simulation.acceptCity(ownerId,event.invitation?.id??event.invitationId??event.id):simulation.declineCity(ownerId,event.invitation?.id??event.invitationId??event.id);
      if(result?.ok===false)matchHud.notice('This command slot is no longer available');
    },onView,onCursor,onResume:()=>canvas.focus({preventScroll:true})}):null;
  let lastUnitId=null,rosterTimer=0,eligible=[],lastRole='hybrid';
  function eligibleUnits(){return simulation.units.filter(unit=>unit.hp>0&&(role()==='tps'?simulation.match.allied(ownerId,unit.ownerId):unit.ownerId===ownerId)&&(!simulation.match.controller(unit.id)||simulation.match.controller(unit.id)===ownerId));}
  function possess(id){
    const result=simulation.possess(ownerId,id);if(!result.ok){matchHud?.notice(result.code==='unit-possessed'?'This unit is already being controlled':'That unit is unavailable');return result;}
    lastUnitId=id;selectedIds.clear();settlement.cancelBuild();onControl(simulation.controlledUnit(ownerId));return result;
  }
  function setRole(value){const result=simulation.setRole(ownerId,value);if(result.ok){session.setPlayerRole(ownerId,value);settlement.cancelBuild();if(value==='tps'&&!walking)onControl(simulation.controlledUnit(ownerId)??simulation.units.find(u=>u.id===local()?.avatarId));}return result;}
  function enterGround(){
    if(!matchMode)return true;
    const unit=simulation.controlledUnit(ownerId)??simulation.units.find(u=>u.id===(lastUnitId??local()?.lastUnitId??local()?.avatarId))??eligibleUnits()[0];
    if(!unit){matchHud.togglePicker(true);return false;}
    const result=simulation.possess(ownerId,unit.id);if(!result.ok){matchHud.togglePicker(true);return false;}lastUnitId=unit.id;return true;
  }
  function leaveGround(){if(!matchMode)return true;if(role()==='tps'){matchHud.togglePicker();return false;}lastUnitId=simulation.controlledUnit(ownerId)?.id??lastUnitId;simulation.release(ownerId);return true;}
  let rosterRevision=-1,own=[],counts={};
  const raycaster=new THREE.Raycaster(),ndc=new THREE.Vector2(),point=new THREE.Vector3(),inverse=new THREE.Matrix4();
  const input=createMilitaryInput(canvas,{getState:()=>({active:!disposed&&role()!=='tps',walking,transitioning,blocked:settlement.railwayPlanning||matchHud?.modal,ownerId,units:simulation.units,selectedIds,allied:simulation.allied}),
    project,groundAt,onSelect(ids,add){if(!add)selectedIds.clear();for(const id of ids)selectedIds.add(id);},
    onCommand(order){const result=simulation.command(ownerId,[...selectedIds],order);if(!result.ok)notify('No clear route');else art.command?.(order);},
    onClaimPointer(){settlement.cancelPointerSelection();onClaimPointer();}});
  function notify(text){feedback=text;feedbackUntil=simulation.elapsed+2.2;}
  function buy(kind){
    if(disposed||transitioning||role()==='tps')return{ok:false,code:'transitioning'};
    const result=simulation.buy(ownerId,kind);
    if(result.ok){notify(`${MILITARY_RULES[kind].name} ready`);if(!walking)selectedIds.add(result.unit.id);}
    else notify(result.code==='spawn-blocked'?'Spawn zone is full':result.code==='unit-limit'?'Unit limit reached':result.code==='no-city'?'A home is required':'Not enough Resources or Food');
    canvas.focus({preventScroll:true});return result;
  }
  function project(unit){
    if(!camera)return null;const rect=canvas.getBoundingClientRect(),flat=mapBlend>.5;
    surfacePoint(world,unit.x,flat?.8:unit.y+(unit.kind==='soldier'?.45:1),unit.z,point);
    if(world.surface){const normal=surfaceNormal(world,unit.x,unit.z),eye=camera.position.clone().sub(point);if(normal.dot(eye)<=0)return null;}
    (flat?mapParent:parent).updateWorldMatrix(true,false);point.applyMatrix4((flat?mapParent:parent).matrixWorld).project(camera);
    return{x:rect.left+(point.x+1)*rect.width/2,y:rect.top+(1-point.y)*rect.height/2,visible:point.z>=-1&&point.z<=1&&Math.abs(point.x)<1.05&&Math.abs(point.y)<1.05,radius:unit.kind==='soldier'?12:18};
  }
  function groundAt(screen){
    if(!camera)return null;const rect=canvas.getBoundingClientRect();ndc.set((screen.x-rect.left)/rect.width*2-1,1-(screen.y-rect.top)/rect.height*2);
    raycaster.setFromCamera(ndc,camera);const root=mapBlend>.5?mapParent:parent;root.updateWorldMatrix(true,false);inverse.copy(root.matrixWorld).invert();raycaster.ray.applyMatrix4(inverse);
    return pickWorldGround(world,raycaster.ray,{flat:mapBlend>.5});
  }
  function aimAt(unit){
    if(!camera)return null;
    raycaster.setFromCamera(new THREE.Vector2(0,0),camera);parent.updateWorldMatrix(true,false);
    raycaster.ray.applyMatrix4(inverse.copy(parent.matrixWorld).invert());
    const ground=pickWorldGround(world,raycaster.ray),range=MILITARY_RULES[unit.kind].range;
    let closest=Infinity,target=null;
    for(const enemy of simulation.units){
      if(simulation.allied(unit.ownerId,enemy.ownerId)||surfaceDistance(world,unit,enemy)>range+2)continue;
      surfacePoint(world,enemy.x,enemy.y+(enemy.kind==='soldier'?.35:.7),enemy.z,point);
      const along=point.clone().sub(raycaster.ray.origin).dot(raycaster.ray.direction);
      if(along>0&&along<closest&&raycaster.ray.distanceSqToPoint(point)<Math.max(.2,enemy.radius*.7)**2){closest=along;target={x:enemy.x,y:enemy.y+(enemy.kind==='soldier'?.35:.7),z:enemy.z};}
    }
    if(target)return target;if(ground&&surfaceDistance(world,unit,ground)<=range)return ground;
    raycaster.ray.at(range+3,point);
    if(world.surface){const chart=surfaceCoordinates(world,point,{});return{x:chart.x,y:chart.elevation,z:chart.z};}
    return{x:point.x,y:point.y,z:point.z};
  }
  const document=canvas.ownerDocument;
  function keyDown(event){
    if(event.altKey||event.metaKey||event.ctrlKey||event.target?.closest?.('input,textarea,select,[contenteditable=true]'))return;
    const key=event.key.toLowerCase();
    if(matchMode&&key==='q'){event.preventDefault();event.stopImmediatePropagation();if(!event.repeat){
      if(!walking&&selectedIds.size===1&&!matchHud.pickerOpen)possess([...selectedIds][0]);else matchHud.togglePicker();
    }}
    else if(matchMode&&key==='escape'&&matchHud.pickerOpen){event.preventDefault();event.stopImmediatePropagation();matchHud.close();}
    else if(['1','2','3','4'].includes(key)){event.preventDefault();event.stopImmediatePropagation();if(!event.repeat)buy(KINDS[Number(key)-1]);}
    else if(key==='escape'&&!walking&&!settlement.railwayPlanning&&selectedIds.size){event.preventDefault();event.stopImmediatePropagation();selectedIds.clear();}
  }
  document.addEventListener('keydown',keyDown,true);
  return {simulation,art,audio,hud,input,matchHud,selectedIds,project,groundAt,buy,possess,enterGround,leaveGround,setRole,
    get role(){return role();},get matchMode(){return matchMode;},get modal(){return !!matchHud?.modal;},
    get controlledUnit(){return matchMode?simulation.controlledUnit(ownerId):null;},
    get renderUnit(){const unit=simulation.controlledUnit?.(ownerId)??simulation.units.find(u=>u.id===(lastUnitId??local()?.lastUnitId));return unit?{...unit,...art.poseFor?.(unit.id)}:null;},
    control(input,pose){
      if(!matchMode)return;
      const unit=simulation.controlledUnit(ownerId);if(!unit)return;
      const blocked=!!matchHud.modal,aimYaw=pose.heading,aimPitch=-pose.pitch;
      simulation.setDirectControl(ownerId,{forward:blocked?0:input.forward,right:blocked?0:input.right,aimYaw,aimPitch,aimAt:aimAt(unit),
        fire:!blocked&&!settlement.building&&!!input.fire,jump:!blocked&&input.jump,sprint:input.sprint});
    },
    get selecting(){return input.selecting;},
    prepare(){const portraits=createMilitaryPortraits(renderer,{team});hud.setPortraits(portraits);matchHud?.setPortraits(portraits);},
    update(dt,options){
      if(disposed)return;({camera,mapBlend=0,walking=false,transitioning=false}=options);
      if(walking||transitioning||settlement.railwayPlanning)input.reset();
      if(matchMode){
        for(const entry of settlement.bots.entries){const p=simulation.match.player(entry.game.ownerId);if(p?.role==='hybrid'&&p.unitId===p.avatarId){const pose=entry.bot.snapshot();simulation.syncPlayerAvatar?.(p.id,{...pose.position,heading:pose.heading,speed:pose.speed,swingTime:pose.swingTime});}}
        for(const event of session.drainEvents()){
          matchHud.event(event.type==='match-won'?{...event,teamName:world.gameplay.match.teams.find(t=>t.id===event.teamId)?.name}:event);
          if(event.type==='city-founded')for(const id of event.candidates??[])if(id!==event.winnerId&&id!==ownerId){simulation.setRole(id,'tps');session.setPlayerRole(id,'tps');simulation.release(id);}
        }
      }
      simulation.update(options.renderReady===false?0:dt);
      if(rosterRevision!==simulation.membershipRevision){
        rosterRevision=simulation.membershipRevision;own=[];counts={};const alive=new Set();
        for(const unit of simulation.units){alive.add(unit.id);if(unit.ownerId===ownerId){own.push(unit);counts[unit.kind]=(counts[unit.kind]??0)+1;}}
        for(const id of selectedIds)if(!alive.has(id))selectedIds.delete(id);
      }
      const events=options.renderReady===false?[]:simulation.drainEvents();
      if(matchMode){
        for(const event of events){
          if(event.type==='city-captured'||event.type==='city-awarded'){
            const recipient=event.toOwnerId??event.ownerId,result=session.captureCity(event.cityId,recipient,{steward:event.type==='city-captured'});
            if(!result.ok&&result.code!=='already-owned')matchHud.notice('City command could not be transferred');
          }
          if(event.type==='city-award-offered'&&(event.toPlayerId??event.invitation?.toPlayerId)!==ownerId)simulation.acceptCity(event.toPlayerId??event.invitation?.toPlayerId,event.invitation?.id??event.invitationId??event.id);
          matchHud.event(event.type==='match-won'?{...event,teamName:world.gameplay.match.teams.find(t=>t.id===event.teamId)?.name}:event);
          if(event.type==='match-won')matchHud.notice(`${world.gameplay.match.teams.find(t=>t.id===event.teamId)?.name??'A team'} controls the world`);
        }
        for(const p of simulation.match.players)session.setPlayerRole(p.id,p.role);
        if(lastRole!==role()){lastRole=role();settlement.cancelBuild();if(role()==='tps'&&!walking){enterGround();onControl(simulation.controlledUnit(ownerId));}}
        rosterTimer-=dt;if(rosterTimer<=0){rosterTimer=.3;eligible=eligibleUnits();}
        const unit=simulation.controlledUnit(ownerId);
        if(walking&&!unit&&!matchHud.modal)matchHud.togglePicker(true);
        matchHud.update(dt,{unit:unit??simulation.units.find(u=>u.id===lastUnitId),role:role(),walking,building:settlement.building,players:simulation.match.players,eligible,invitationIds:simulation.match.invitations.map(i=>i.id),capture:simulation.captures.filter(c=>c.progress>0&&!c.pending&&c.playerId===ownerId).map(c=>({...c,name:cities.find(city=>city.id===c.cityId)?.name}))[0]});
        document.body.dataset.playerRole=role();document.body.dataset.controlKind=unit?.kind??'soldier';document.body.dataset.match='true';
        Object.assign(canvas.dataset,{playerRole:role(),matchTeams:String(world.gameplay.match.teams.length),matchPlayers:String(simulation.match.players.length),controlledUnit:unit?.id??'',controlledKind:unit?.kind??''});
      }
      if(options.renderReady!==false)art.update(dt,{simulation,events,...options,selectedIds,ownerId,reducedMotion:reducedMotion?.matches});
      audio.update(dt,{events,units:simulation.units,...options,world,root:parent,paused:dt<=0||options.renderReady===false});
      let shieldedCount=0;for(const unit of own)if(selectedIds.has(unit.id)&&unit.shielded)shieldedCount++;
      const stock=settlement.game.resourcesAt();hud.update({resources:stock.resources,food:stock.food,counts,visible:role()!=='tps',available:!transitioning,disabledReason:'Changing view',walking,selectedCount:selectedIds.size,
        shieldedCount,feedback:simulation.elapsed<feedbackUntil?feedback:''});
      const stats=simulation.stats;Object.assign(canvas.dataset,{militaryUnits:String(simulation.units.length),militaryOwned:String(own.length),militarySelected:String(selectedIds.size),militaryShots:String(stats.shots),militaryKills:String(stats.kills)});
    },
    dispose(){if(disposed)return;disposed=true;document.removeEventListener('keydown',keyDown,true);input.dispose();audio.dispose();hud.dispose();matchHud?.dispose();art.dispose();simulation.dispose();selectedIds.clear();delete document.body.dataset.playerRole;delete document.body.dataset.controlKind;delete document.body.dataset.match;},
  };
}
