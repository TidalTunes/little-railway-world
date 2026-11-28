import * as THREE from 'three';
import {worldSurface} from './world-model.js';
import {createMilitarySimulation,MILITARY_RULES} from './military-simulation.js';
import {createMilitaryWorldArt} from './military-world-art.js';
import {createMilitaryHud} from './military-hud.js';
import {createMilitaryPortraits} from './military-portraits.js';
import {createMilitaryInput} from './military-input.js';

const KINDS=['soldier','tank','artillery','helicopter'];

/** Bridges the existing owner wallets/world to combat; the economy never
 * depends on cosmetic unit meshes, projectiles, or input selection. */
export function createMilitaryController({canvas,world,parent,mapParent,settlement,renderer,onClaimPointer=()=>{},reducedMotion}){
  const ownerId=settlement.game.ownerId,selectedIds=new Set(),session=settlement.session;
  const games=[session.player,...session.bots.map(entry=>entry.game)],accounts=new Map(games.map(game=>[game.ownerId,game]));
  const team=world.players.find(player=>player.id===ownerId);
  let cities=[],cityRevision=-1;
  let camera=null,mapBlend=0,walking=true,transitioning=false,feedback='',feedbackUntil=0,disposed=false;
  function getCities(){
    if(cityRevision===session.spatialRevision)return cities;cityRevision=session.spatialRevision;
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
  let rosterRevision=-1,own=[],counts={};
  const raycaster=new THREE.Raycaster(),ndc=new THREE.Vector2(),point=new THREE.Vector3(),inverse=new THREE.Matrix4();
  const input=createMilitaryInput(canvas,{getState:()=>({active:!disposed,walking,transitioning,blocked:settlement.railwayPlanning,ownerId,units:simulation.units,selectedIds}),
    project,groundAt,onSelect(ids,add){if(!add)selectedIds.clear();for(const id of ids)selectedIds.add(id);},
    onCommand(order){const result=simulation.command(ownerId,[...selectedIds],order);if(!result.ok)notify('No clear route');else art.command?.(order);},
    onClaimPointer(){settlement.cancelPointerSelection();onClaimPointer();}});
  function notify(text){feedback=text;feedbackUntil=simulation.elapsed+2.2;}
  function buy(kind){
    if(disposed||transitioning)return{ok:false,code:'transitioning'};
    const result=simulation.buy(ownerId,kind);
    if(result.ok){notify(`${MILITARY_RULES[kind].name} ready`);if(!walking)selectedIds.add(result.unit.id);}
    else notify(result.code==='spawn-blocked'?'Spawn zone is full':result.code==='unit-limit'?'Unit limit reached':result.code==='no-city'?'A home is required':'Not enough Resources or Food');
    canvas.focus({preventScroll:true});return result;
  }
  function project(unit){
    if(!camera)return null;const rect=canvas.getBoundingClientRect(),flat=mapBlend>.5;
    point.set(unit.x,flat?.8:unit.y+(unit.kind==='soldier'?.45:1),unit.z);
    (flat?mapParent:parent).updateWorldMatrix(true,false);point.applyMatrix4((flat?mapParent:parent).matrixWorld).project(camera);
    return{x:rect.left+(point.x+1)*rect.width/2,y:rect.top+(1-point.y)*rect.height/2,visible:point.z>=-1&&point.z<=1&&Math.abs(point.x)<1.05&&Math.abs(point.y)<1.05,radius:unit.kind==='soldier'?12:18};
  }
  function groundAt(screen){
    if(!camera)return null;const rect=canvas.getBoundingClientRect();ndc.set((screen.x-rect.left)/rect.width*2-1,1-(screen.y-rect.top)/rect.height*2);
    raycaster.setFromCamera(ndc,camera);const root=mapBlend>.5?mapParent:parent;root.updateWorldMatrix(true,false);inverse.copy(root.matrixWorld).invert();raycaster.ray.applyMatrix4(inverse);
    if(Math.abs(raycaster.ray.direction.y)<1e-7)return null;
    let height=0;for(let i=0;i<6;i++){
      const distance=(height-raycaster.ray.origin.y)/raycaster.ray.direction.y;if(distance<0)return null;
      raycaster.ray.at(distance,point);const ground=worldSurface(world,point.x,point.z);if(mapBlend>.5||Math.abs(ground.height-height)<.03)break;height=ground.height;
    }return{x:point.x,z:point.z};
  }
  const document=canvas.ownerDocument;
  function keyDown(event){
    if(event.altKey||event.metaKey||event.ctrlKey||event.target?.closest?.('input,textarea,select,[contenteditable=true]'))return;
    const key=event.key.toLowerCase();
    if(['1','2','3','4'].includes(key)){event.preventDefault();event.stopImmediatePropagation();if(!event.repeat)buy(KINDS[Number(key)-1]);}
    else if(key==='escape'&&!walking&&!settlement.railwayPlanning&&selectedIds.size){event.preventDefault();event.stopImmediatePropagation();selectedIds.clear();}
  }
  document.addEventListener('keydown',keyDown,true);
  return {simulation,art,hud,input,selectedIds,project,groundAt,buy,
    get selecting(){return input.selecting;},
    prepare(){hud.setPortraits(createMilitaryPortraits(renderer,{team}));},
    update(dt,options){
      if(disposed)return;({camera,mapBlend=0,walking=false,transitioning=false}=options);
      if(walking||transitioning||settlement.railwayPlanning)input.reset();
      simulation.update(options.renderReady===false?0:dt);
      if(rosterRevision!==simulation.membershipRevision){
        rosterRevision=simulation.membershipRevision;own=[];counts={};const alive=new Set();
        for(const unit of simulation.units){alive.add(unit.id);if(unit.ownerId===ownerId){own.push(unit);counts[unit.kind]=(counts[unit.kind]??0)+1;}}
        for(const id of selectedIds)if(!alive.has(id))selectedIds.delete(id);
      }
      if(options.renderReady!==false)art.update(dt,{simulation,events:simulation.drainEvents(),...options,selectedIds,ownerId,reducedMotion:reducedMotion?.matches});
      let shieldedCount=0;for(const unit of own)if(selectedIds.has(unit.id)&&unit.shielded)shieldedCount++;
      const stock=settlement.game.resourcesAt();hud.update({resources:stock.resources,food:stock.food,counts,available:!transitioning,disabledReason:'Changing view',walking,selectedCount:selectedIds.size,
        shieldedCount,feedback:simulation.elapsed<feedbackUntil?feedback:''});
      const stats=simulation.stats;Object.assign(canvas.dataset,{militaryUnits:String(simulation.units.length),militaryOwned:String(own.length),militarySelected:String(selectedIds.size),militaryShots:String(stats.shots),militaryKills:String(stats.kills)});
    },
    dispose(){if(disposed)return;disposed=true;document.removeEventListener('keydown',keyDown,true);input.dispose();hud.dispose();art.dispose();simulation.dispose();selectedIds.clear();},
  };
}
