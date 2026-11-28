import {worldSurface} from './world-model.js';
import {Matrix4,Vector3} from 'three';
import {surfaceDistance,surfaceOffset,surfaceDisplacement,surfaceHeading,surfacePoint,surfaceFrame,surfaceCoordinates} from './world-surface.js';
import {createMilitarySpatial} from './military-spatial.js';
import {createMatchState} from './match-state.js';
import {createMilitaryNavigation} from './military-navigation.js';
import {MILITARY_WEAPONS,MILITARY_MOTION,militaryAngle,militaryApproach,militaryTurn,getMilitaryMuzzle,getMilitaryForward,getMilitaryLocalDirection} from './military-kinematics.js';

const unitRules={
  soldier:{name:'Infantry',resources:1,food:1,health:6,attack:1,range:9,speed:2.4,interval:.9,accuracy:.76,airAccuracy:.20,splash:0,radius:.24,height:.65,projectile:'tracer'},
  tank:{name:'Tank',resources:20,food:0,health:28,attack:5,range:14,minRange:4.5,speed:1.65,interval:1.8,accuracy:.97,airAccuracy:.72,splash:1.6,radius:1.35,height:1.1,projectile:'shell'},
  artillery:{name:'Artillery',resources:20,food:0,health:12,attack:8,range:24,minRange:3,speed:1.35,interval:3.5,accuracy:.82,airAccuracy:.08,splash:3.8,radius:1.35,height:.9,projectile:'arc'},
  helicopter:{name:'Helicopter',resources:20,food:0,health:18,attack:2,range:15,speed:3.6,interval:.45,accuracy:.9,airAccuracy:.9,splash:.65,radius:.9,height:.9,projectile:'rocket'},
};
export const MILITARY_RULES=Object.freeze({step:1/20,maxUnits:2048,maxPerOwner:160,hoverHeight:5,spawnWidth:7,shieldMultiplier:.5,botAttackDelay:45,
  ...Object.fromEntries(Object.entries(unitRules).map(([kind,value])=>[kind,Object.freeze({...value,cost:Object.freeze({resources:value.resources,food:value.food})})]))});
const kinds=Object.keys(unitRules),finitePoint=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z);
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function seedHash(value){let n=2166136261;for(const c of String(value)){n^=c.charCodeAt(0);n=Math.imul(n,16777619);}return n>>>0;}
function randomSource(seed){let value=seedHash(seed);return()=>{value+=0x6D2B79F5;let n=value;n=Math.imul(n^n>>>15,n|1);n^=n+Math.imul(n^n>>>7,n|61);return((n^n>>>14)>>>0)/4294967296;};}

export function getMilitarySpawnZone(city){
  const homes=Array.isArray(city?.houses)?city.houses:null;
  const population=city?.population??city?.houseCount??homes?.length??1;
  const innerRadius=Math.max(3,city?.radius??city?.selectionRadius??(2.7+Math.sqrt(population)*1.6));
  return {ownerId:city?.ownerId,cityId:city?.id,x:city?.x??0,z:city?.z??0,innerRadius,outerRadius:innerRadius+MILITARY_RULES.spawnWidth};
}

/** A deterministic fixed-step combat model. Wallets, city positions, world
 * terrain and collision bodies remain owned by their existing game systems. */
export function createMilitarySimulation(world,{getCities=()=>[],getPlacements=()=>[],getAccount=()=>null,surfaceAt=(x,z)=>worldSurface(world,x,z),seed=world.seed??'military',botOwners=[]}={}){
  const distance=(a,b)=>surfaceDistance(world,a,b),delta=(a,b)=>surfaceDisplacement(world,a,b),offset=(p,dx,dz)=>surfaceOffset(world,p.x,p.z,dx,dz);
  const frameScratch=new Matrix4(),pointScratch=new Vector3(),originScratch=new Vector3();
  function localPoint(origin,point,height=point.y??0){
    if(!world.surface)return{x:point.x-origin.x,y:height-origin.y,z:point.z-origin.z};
    const e=surfaceFrame(world,origin.x,origin.z,frameScratch).elements,v=surfacePoint(world,point.x,height,point.z,pointScratch).sub(surfacePoint(world,origin.x,origin.y,origin.z,originScratch));
    return{x:v.x*e[0]+v.y*e[1]+v.z*e[2],y:v.x*e[4]+v.y*e[5]+v.z*e[6],z:v.x*e[8]+v.y*e[9]+v.z*e[10]};
  }
  function chartPoint(origin,local){
    if(!world.surface)return{x:origin.x+local.x,y:origin.y+local.y,z:origin.z+local.z};
    const e=surfaceFrame(world,origin.x,origin.z,frameScratch).elements,p=surfacePoint(world,origin.x,origin.y,origin.z,pointScratch);
    p.x+=e[0]*local.x+e[4]*local.y+e[8]*local.z;p.y+=e[1]*local.x+e[5]*local.y+e[9]*local.z;p.z+=e[2]*local.x+e[6]*local.y+e[10]*local.z;
    const result=surfaceCoordinates(world,p);return{x:result.x,y:result.elevation,z:result.z};
  }
  const match=createMatchState(world.gameplay?.match),playerTeams=new Map((world.players??[]).map(p=>[p.id,p.teamId??p.id]));
  const teamId=ownerId=>match.player(ownerId)?.teamId??playerTeams.get(ownerId)??ownerId,allied=(a,b)=>teamId(a)===teamId(b);
  const random=randomSource(seed),units=[],lookup=new Map(),events=[],projectiles=[],navigation=createMilitaryNavigation(world,{surfaceAt,getPlacements});
  let elapsed=0,accumulator=0,membershipRevision=0,nextId=1,disposed=false,spatial=createMilitarySpatial(world),zones=[],refreshAt=-1,routeBudget=0;
  const bots=new Map(),directInputs=new Map(),captures=new Map();let botCursor=0,captureAt=0,respawnAt=0;
  const stats={shots:0,hits:0,kills:0,spawned:0,damage:0,shieldedDamage:0,targetChecks:0,steps:0,droppedTime:0};
  function event(value){if(events.length<4096)events.push({...value,time:elapsed});}
  function refresh(){const cities=(getCities()??[]).map(city=>{const capture=captures.get(city.id);return capture?.pending&&capture.ownerId===city.ownerId?{...city,ownerId:capture.playerId,steward:true}:city;});match.syncCities(cities);for(const value of match.drainEvents())event(value);zones=cities.filter(c=>finitePoint(c)&&c.ownerId&&c.ownerId!=='neutral'&&!c.neutral).map(getMilitarySpawnZone);navigation.refresh();refreshAt=elapsed+.5;}
  function grid(){spatial=createMilitarySpatial(world);for(const unit of units)spatial.insert(unit,unit,unit.radius);}
  function shielded(unit){return zones.some(zone=>allied(zone.ownerId,unit.ownerId)&&distance(zone,unit)<=zone.outerRadius);}
  function team(ownerId){return world.players?.find(p=>p.id===ownerId)??ownerId;}
  function accountBalance(account){const totals=account.resourcesAt?.({x:0,z:0});return{resources:totals?.resources??account.logs??0,food:totals?.food??account.food??0};}
  function occupied(point,radius,air){return spatial.query(point,radius+2).some(u=>(u.kind==='helicopter')===air&&distance(point,u)<radius+u.radius+.18);}
  function buy(ownerId,kind){
    if(disposed)return{ok:false,code:'disposed'};const spec=unitRules[kind];if(!spec)return{ok:false,code:'invalid-unit'};
    if(match.player(ownerId)?.role==='tps')return{ok:false,code:'role-restricted'};
    if(units.length>=MILITARY_RULES.maxUnits||units.filter(u=>u.ownerId===ownerId).length>=MILITARY_RULES.maxPerOwner)return{ok:false,code:'unit-limit'};
    refresh();const zone=zones.find(z=>z.ownerId===ownerId);if(!zone)return{ok:false,code:'no-city'};
    const account=getAccount(ownerId);if(!account)return{ok:false,code:'no-account'};const balance=accountBalance(account),cost={resources:spec.resources,food:spec.food};
    if(balance.resources<cost.resources||balance.food<cost.food)return{ok:false,code:'not-enough-resources',cost,missing:{resources:Math.max(0,cost.resources-balance.resources),food:Math.max(0,cost.food-balance.food)}};
    const air=kind==='helicopter';let point=null;grid();
    for(let attempt=0;attempt<160;attempt++){
      const angle=random()*Math.PI*2,inner=zone.innerRadius+spec.radius+.3,outer=zone.outerRadius-spec.radius-.3;
      if(inner>=outer)break;const radius=Math.sqrt(inner*inner+random()*(outer*outer-inner*inner)),candidate=offset(zone,Math.cos(angle)*radius,Math.sin(angle)*radius);
      // Air units also begin over dry land, then may fly across bays.
      if(!navigation.clear(candidate,spec.radius,false)||occupied(candidate,spec.radius,air))continue;point=candidate;break;
    }
    if(!point)return{ok:false,code:'spawn-blocked'};
    // Validate both funds and spawn before spending. Refund the first debit if
    // an external wallet rejects the second, so a failed purchase is atomic.
    const debit=(account.spendResources??account.spendLogs)?.call(account,cost.resources);if(!debit?.ok)return{ok:false,code:debit?.code??'not-enough-resources',cost};
    if(cost.food){const food=account.spendFood?.(cost.food);if(!food?.ok){(account.creditResources??account.addLogs)?.call(account,cost.resources);return{ok:false,code:food?.code??'not-enough-food',cost};}}
    return createUnit(ownerId,kind,point,cost);
  }
  function createUnit(ownerId,kind,point,cost={resources:0,food:0},heading=random()*Math.PI*2){
    const spec=unitRules[kind],air=kind==='helicopter';
    const unit={id:`military-${nextId++}`,ownerId,teamId:teamId(ownerId),team:team(ownerId),kind,...point,y:surfaceAt(point.x,point.z).height+(air?MILITARY_RULES.hoverHeight:0),heading,
      aimYaw:0,elevation:MILITARY_WEAPONS[kind].restElevation,pitch:0,roll:0,speed:0,velocityX:0,velocityZ:0,turnVelocity:0,shotPlan:null,
      hp:spec.health,maxHp:spec.health,radius:spec.radius,moving:false,shielded:false,order:null,targetId:null,path:[],pathIndex:0,goal:null,nextTargetAt:elapsed+random()*.2,nextShotAt:elapsed+.3+random()*.4,nextRouteAt:0,routeFailures:0,phase:random(),active:true};
    units.push(unit);lookup.set(unit.id,unit);membershipRevision++;stats.spawned++;event({type:'spawned',unitId:unit.id,ownerId,kind,position:{...point,y:unit.y}});return{ok:true,unit,cost};
  }
  function spawnPlayer(playerId,{respawn=false}={}){
    const player=match.player(playerId);if(!player)return{ok:false,code:'unknown-player'};
    const existing=lookup.get(player.avatarId);if(existing?.hp>0)return{ok:true,unit:existing,existing:true};
    if(units.length>=MILITARY_RULES.maxUnits)return{ok:false,code:'unit-limit'};
    const safeCity=respawn?(zones.find(z=>z.ownerId===playerId)??zones.find(z=>allied(z.ownerId,playerId))):null;
    const origin=safeCity??player.spawn??zones.find(z=>z.ownerId===playerId);if(!finitePoint(origin))return{ok:false,code:'no-spawn'};
    grid();let point=navigation.nearest(origin,unitRules.soldier.radius,false);
    if(point&&occupied(point,unitRules.soldier.radius,false))point=null;
    for(let attempt=0;!point&&attempt<80;attempt++){const a=attempt*2.399963229728653,r=.7*Math.sqrt(attempt+1),candidate=offset(origin,Math.sin(a)*r,Math.cos(a)*r);if(navigation.clear(candidate,unitRules.soldier.radius,false)&&!occupied(candidate,unitRules.soldier.radius,false))point=candidate;}
    if(!point)return{ok:false,code:'spawn-blocked'};
    const result=createUnit(playerId,'soldier',point,undefined,surfaceHeading(world,origin.x,origin.z,origin.heading??0));
    result.unit.avatarPlayerId=playerId;match.setAvatar(playerId,result.unit.id);possess(playerId,result.unit.id);return result;
  }
  function controlledUnit(playerId){return lookup.get(match.player(playerId)?.unitId)??null;}
  function syncPlayerAvatar(playerId,pose){
    const player=match.player(playerId),unit=lookup.get(player?.avatarId),point=pose?.position??pose;if(!unit||!finitePoint(point)||player.role!=='hybrid'||match.controller(unit.id)!==playerId)return{ok:false,code:'unavailable-avatar'};
    unit.x=point.x;unit.z=point.z;unit.y=Number.isFinite(point.y)?point.y:surfaceAt(unit.x,unit.z).height;
    unit.heading=surfaceHeading(world,unit.x,unit.z,pose.heading??0);unit.speed=Math.max(0,Number(pose.speed)||0);unit.moving=unit.speed>.01;
    unit.swingTime=pose.swingTime??0;unit.externalUntil=elapsed+.2;return{ok:true,unit};
  }
  function release(playerId){const unit=controlledUnit(playerId),result=match.release(playerId);directInputs.delete(playerId);if(unit){unit.controlledBy=null;unit.botDriver=false;unit.botDriveGoal=null;unit.speed=0;unit.velocityX=unit.velocityZ=0;}return result;}
  function possess(playerId,unitId){const unit=lookup.get(unitId),previous=controlledUnit(playerId),result=match.possess(playerId,unit);if(!result.ok)return result;
    if(previous){previous.controlledBy=null;previous.botDriver=false;}match.player(playerId).respawnAt=null;directInputs.delete(playerId);unit.controlledBy=playerId;unit.botDriver=false;unit.botDriveGoal=null;unit.order=null;unit.path=[];unit.goal=null;unit.targetId=null;unit.shotPlan=null;unit.speed=0;return{...result,unit};}
  function setDirectControl(playerId,input={}){if(disposed||!controlledUnit(playerId))return{ok:false,code:'no-controlled-unit'};
    controlledUnit(playerId).botDriver=false;
    const previous=directInputs.get(playerId),jump=!!input.jump&&!previous?.jump;
    directInputs.set(playerId,{forward:clamp(Number(input.forward)||0,-1,1),right:clamp(Number(input.right)||0,-1,1),
      aimYaw:Number.isFinite(input.aimYaw??input.yaw)?(input.aimYaw??input.yaw):controlledUnit(playerId).heading,
      aimPitch:Number.isFinite(input.aimPitch??input.pitch)?(input.aimPitch??input.pitch):0,
      aimAt:finitePoint(input.aimAt)&&Number.isFinite(input.aimAt.y)?{...input.aimAt}:null,fire:!!input.fire,sprint:!!input.sprint,jump:!!input.jump,jumpPressed:jump||(previous?.jumpPressed??false),at:elapsed});return{ok:true};}
  function inviteCity(fromPlayerId,cityId,toPlayerId){const result=match.inviteCity(cityId,fromPlayerId,toPlayerId);if(result.ok)event({type:'city-award-offered',...result.invitation});return result;}
  function acceptCity(playerId,id){const previous=controlledUnit(playerId),result=match.acceptCity(playerId,id);if(result.ok){
    if(previous&&!controlledUnit(playerId)){previous.controlledBy=null;previous.speed=0;directInputs.delete(playerId);const own=units.find(u=>u.ownerId===playerId&&u.hp>0&&!match.controller(u.id));if(own)possess(playerId,own.id);}
    event({type:'city-awarded',...result});}return result;}
  function manualMove(unit,input,dt){
    const spec=unitRules[unit.kind],motion=MILITARY_MOTION[unit.kind],air=unit.kind==='helicopter',length=Math.min(1,Math.hypot(input.forward,input.right)),normal=Math.max(1,Math.hypot(input.forward,input.right));
    const dx=(Math.sin(input.aimYaw)*input.forward-Math.cos(input.aimYaw)*input.right)/normal,dz=(Math.cos(input.aimYaw)*input.forward+Math.sin(input.aimYaw)*input.right)/normal;
    const desired=length>.001?Math.atan2(dx,dz):input.aimYaw;
    if(length>.001||unit.kind==='soldier')turnChassis(unit,desired,dt);
    const error=Math.abs(militaryAngle(desired-unit.heading)),speed=spec.speed*(unit.kind==='soldier'&&input.sprint?1.65:1)*length*clamp((.8-error)/.6,0,1);
    unit.speed=militaryApproach(unit.speed,speed,(speed>unit.speed?motion.acceleration:motion.braking)*dt);
    const step=unit.speed*dt*(error>1.1?0:1),sx=Math.sin(unit.heading)*step,sz=Math.cos(unit.heading)*step,next=offset(unit,sx,sz);
    const neighbors=spatial.query(unit,unit.radius+2),blocked=neighbors.some(other=>other!==unit&&other.hp>0&&(other.kind==='helicopter')===air&&distance(other,next)<unit.radius+other.radius+.035);
    if(step>.0001&&!blocked&&navigation.segment(unit,next,unit.radius,air)){unit.x=next.x;unit.z=next.z;unit.moving=true;}else if(step>.0001)unit.speed=0;
    const height=surfaceAt(unit.x,unit.z).height;
    if(unit.kind==='soldier'){
      if(input.jumpPressed&&(unit.jumpHeight??0)<=.001){unit.jumpVelocity=3.8;input.jumpPressed=false;}
      if((unit.jumpVelocity??0)!==0||(unit.jumpHeight??0)>0){unit.jumpVelocity=(unit.jumpVelocity??0)-10*dt;unit.jumpHeight=Math.max(0,(unit.jumpHeight??0)+unit.jumpVelocity*dt);if(!unit.jumpHeight)unit.jumpVelocity=0;}
    }
    unit.y=height+(air?MILITARY_RULES.hoverHeight:(unit.jumpHeight??0));
  }
  function manualAim(unit,input,dt){
    const weapon=MILITARY_WEAPONS[unit.kind],spec=unitRules[unit.kind];let aimAt=input.aimAt;
    if(aimAt&&unit.kind==='artillery'&&distance(unit,aimAt)>spec.range){const d=delta(unit,aimAt),length=Math.hypot(d.x,d.z),point=offset(unit,d.x/length*spec.range,d.z/length*spec.range);aimAt={...point,y:surfaceAt(point.x,point.z).height};}
    let solution=aimAt?weaponSolution(unit,aimAt):null;
    const requestedYaw=solution?.yaw??militaryAngle(input.aimYaw-unit.heading),requestedElevation=solution?.elevation??input.aimPitch;
    if(weapon.yawLimit<Math.PI&&!unit.moving&&Math.abs(requestedYaw)>weapon.yawLimit*.72){turnChassis(unit,input.aimYaw,dt);if(aimAt)solution=weaponSolution(unit,aimAt);}
    const yaw=solution?.yaw??militaryAngle(input.aimYaw-unit.heading),elevation=solution?.elevation??requestedElevation;
    unit.aimYaw=militaryTurn(unit.aimYaw,clamp(yaw,-weapon.yawLimit,weapon.yawLimit),weapon.yawRate*dt);
    unit.elevation=militaryApproach(unit.elevation,clamp(elevation,weapon.minElevation,weapon.maxElevation),weapon.elevationRate*dt);
    if(!input.fire||elapsed<unit.nextShotAt||Math.abs(militaryAngle(yaw-unit.aimYaw))>weapon.tolerance||Math.abs(elevation-unit.elevation)>weapon.tolerance||solution?.valid===false)return;
    const muzzle=getMilitaryMuzzle({...unit,x:0,y:0,z:0}),forward=getMilitaryForward(unit);let target=null,travel=spec.range;
    if(unit.kind!=='artillery')for(const enemy of spatial.query(unit,spec.range)){
      if(enemy.hp<=0||allied(unit.ownerId,enemy.ownerId))continue;const relative=localPoint(unit,enemy,enemy.y+unitRules[enemy.kind].height*.55),v={x:relative.x-muzzle.x,y:relative.y-muzzle.y,z:relative.z-muzzle.z},along=v.x*forward.x+v.y*forward.y+v.z*forward.z;
      const range=distance(unit,enemy);if(along<0||range<(spec.minRange??0)||range>spec.range||along>travel)continue;
      if(Math.hypot(v.x-forward.x*along,v.y-forward.y*along,v.z-forward.z*along)<=enemy.radius+.15){target=enemy;travel=along;}
    }
    if(input.aimAt&&distance(unit,input.aimAt)<(spec.minRange??0))return;
    let horizontal=travel*Math.hypot(forward.x,forward.z),arcHeight=0;
    if(unit.kind==='artillery'){
      horizontal=Math.min(spec.range,solution?Math.hypot(solution.to.x-muzzle.x,solution.to.z-muzzle.z):spec.range);
      if(horizontal<(spec.minRange??0))return;arcHeight=solution?.arcHeight??Math.max(0,forward.y/Math.max(.001,Math.hypot(forward.x,forward.z))*horizontal/4);
    }
    const flat=Math.max(.001,Math.hypot(forward.x,forward.z));shoot(unit,target,{arcHeight,to:{x:muzzle.x+forward.x/flat*horizontal,z:muzzle.z+forward.z/flat*horizontal}},true);
  }
  function command(ownerId,ids,order){
    if(disposed||!Array.isArray(ids)||!['move','attack','stop'].includes(order?.type))return{ok:false,code:'invalid-order'};
    if(match.player(ownerId)?.role==='tps')return{ok:false,code:'role-restricted'};
    const selected=[...new Set(ids)].map(id=>lookup.get(id)).filter(u=>u?.ownerId===ownerId&&u.hp>0&&!match.controller(u.id));if(!selected.length)return{ok:false,code:'no-units'};
    if(order.type==='move'&&!finitePoint(order))return{ok:false,code:'invalid-target'};
    const enemy=order.type==='attack'?lookup.get(order.targetId):null;if(order.type==='attack'&&(!enemy||allied(enemy.ownerId,ownerId)))return{ok:false,code:'invalid-target'};
    const columns=Math.ceil(Math.sqrt(selected.length)),spacing=selected.some(u=>u.kind!=='soldier')?3:.85;
    let accepted=0;selected.forEach((unit,index)=>{
      let destination=null;if(order.type==='move'){destination=navigation.nearest(offset(order,(index%columns-(Math.min(columns,selected.length)-1)/2)*spacing,(Math.floor(index/columns)-(Math.ceil(selected.length/columns)-1)/2)*spacing),unit.radius,unit.kind==='helicopter');if(!destination)return;}
      accepted++;if(order.type==='attack'&&unit.order?.type==='attack'&&unit.order.targetId===enemy.id)return;
      if(order.type==='move'&&unit.order?.type==='move'&&distance(unit.order,destination)<.2)return;
      unit.order=order.type==='move'?{type:'move',...destination}:order.type==='attack'?{type:'attack',targetId:enemy.id}:null;
      unit.path=[];unit.pathIndex=0;unit.goal=null;unit.targetId=enemy?.id??null;unit.nextRouteAt=elapsed;unit.nextTargetAt=elapsed;unit.routeFailures=0;unit.shotPlan=null;unit.standOffTargetId=null;
    });return accepted?{ok:true,count:accepted}:{ok:false,code:'blocked-target'};
  }
  function nearestEnemy(unit){const spec=unitRules[unit.kind];let best=null,d2=spec.range**2;
    for(const other of spatial.query(unit,spec.range)){stats.targetChecks++;if(allied(other.ownerId,unit.ownerId)||other.hp<=0)continue;
      const sq=distance(unit,other)**2+(unit.y-other.y)**2;if(sq<d2&&sq>=(spec.minRange??0)**2&&weaponSolution(unit,other).valid){d2=sq;best=other;}}
    return best;
  }
  function inRange(unit,target){const spec=unitRules[unit.kind],range=Math.hypot(distance(unit,target),unit.y-target.y);return range<=spec.range&&range>=(spec.minRange??0)&&weaponSolution(unit,target).valid;}
  function weaponSolution(unit,target,offset={x:0,y:0,z:0}){
    const weapon=MILITARY_WEAPONS[unit.kind],relative=localPoint(unit,target,target.y+(unitRules[target.kind]?.height??0)*.55),to={x:relative.x+offset.x,y:unit.y+relative.y+offset.y,z:relative.z+offset.z};
    // Solve the yaw/elevation pivots directly. Iterating from the current
    // barrel pose is unstable when a close target sits beside an offset pod.
    const pose={kind:unit.kind,x:0,y:unit.y,z:0,heading:unit.heading,pitch:unit.pitch,roll:unit.roll};
    let yaw=0,elevation=weapon.restElevation,arcHeight=unit.kind==='artillery'?distance(unit,target)*.38:0,reachable=true;
    for(let i=0;i<(unit.kind==='artillery'?3:1);i++){
      // All canonical body pivots lie on the Y axis, so heading leaves that
      // point unchanged. Undo body lean around it before solving the mount.
      const local=getMilitaryLocalDirection(unit,{x:to.x,y:to.y-unit.y+4*arcHeight-weapon.bodyPivot[1],z:to.z});local.y+=weapon.bodyPivot[1];
      const x=local.x-weapon.yawPivot[0],y=local.y-weapon.yawPivot[1],z=local.z-weapon.yawPivot[2],radius=Math.hypot(x,z);
      const lateral=weapon.muzzle[0]-weapon.yawPivot[0];reachable=radius>=Math.abs(lateral);
      yaw=militaryAngle(Math.atan2(x,z)-Math.asin(clamp(lateral/Math.max(radius,1e-9),-1,1)));
      const forward=x*Math.sin(yaw)+z*Math.cos(yaw)-(weapon.pitchPivot[2]-weapon.yawPivot[2]),vertical=y-(weapon.pitchPivot[1]-weapon.yawPivot[1]);
      const offset=weapon.muzzle[1]-weapon.pitchPivot[1],length=Math.hypot(forward,vertical);
      elevation=Math.atan2(vertical,forward)-Math.asin(clamp(offset/Math.max(length,1e-9),-1,1));
      if(unit.kind==='artillery'&&i<2){pose.aimYaw=yaw;pose.elevation=elevation;const muzzle=getMilitaryMuzzle(pose);arcHeight=Math.hypot(to.x-muzzle.x,to.z-muzzle.z)*.38;}
    }
    return{yaw,elevation,arcHeight,to,valid:reachable&&elevation>=weapon.minElevation&&elevation<=weapon.maxElevation};
  }

  function prepareShot(unit,target){
    if(unit.shotPlan?.targetId===target.id)return unit.shotPlan;
    const spec=unitRules[unit.kind],hit=random()<(target.kind==='helicopter'?spec.airAccuracy:spec.accuracy),offset={x:0,y:0,z:0};
    if(!hit){const angle=random()*Math.PI*2,miss=target.radius+1.2+random()*2;offset.x=Math.cos(angle)*miss;offset.z=Math.sin(angle)*miss;if(target.kind==='helicopter')offset.y=-2-random()*2;}
    // A miss must still be a physically reachable firing solution.
    for(let i=0;i<4&&!weaponSolution(unit,target,offset).valid;i++){offset.x*=.5;offset.y*=.5;offset.z*=.5;}
    return unit.shotPlan={targetId:target.id,hit,offset};
  }
  function shoot(unit,target,solution,manual=false){
    const spec=unitRules[unit.kind],hit=manual||unit.shotPlan.hit,localFrom=getMilitaryMuzzle({...unit,x:0,y:0,z:0}),forward=getMilitaryForward(unit),
      horizontal=Math.hypot(solution.to.x-localFrom.x,solution.to.z-localFrom.z),flat=Math.max(.001,Math.hypot(forward.x,forward.z)),arcHeight=solution.arcHeight;
    const localTo={x:localFrom.x+forward.x/flat*horizontal,y:localFrom.y+forward.y/flat*horizontal-4*arcHeight,z:localFrom.z+forward.z/flat*horizontal};
    const from=chartPoint(unit,localFrom),to=chartPoint(unit,localTo);
    const duration={tracer:.3,shell:.7,arc:1.4,rocket:.8}[spec.projectile];
    projectiles.push({at:elapsed+duration,ownerId:unit.ownerId,kind:unit.kind,targetId:target?.id??null,position:to,hit,attack:spec.attack,splash:spec.splash});
    event({type:'shot',unitId:unit.id,ownerId:unit.ownerId,kind:unit.kind,projectile:spec.projectile,from,to,hit,duration,arcHeight,forward,
      surfaceOrigin:{x:unit.x,y:unit.y,z:unit.z},localFrom,localTo,localForward:forward});stats.shots++;unit.nextShotAt=elapsed+spec.interval;unit.shotPlan=null;
  }
  function damage(unit,amount){const reduced=shielded(unit),applied=amount*(reduced?MILITARY_RULES.shieldMultiplier:1);unit.hp=Math.max(0,unit.hp-applied);stats.damage+=applied;if(reduced)stats.shieldedDamage+=amount-applied;
    event({type:'damage',unitId:unit.id,amount:applied,shielded:reduced});if(unit.hp<=0&&unit.active){unit.active=false;stats.kills++;event({type:'destroyed',unitId:unit.id,kind:unit.kind,ownerId:unit.ownerId,position:{x:unit.x,y:unit.y,z:unit.z}});}}
  function impacts(){for(let i=projectiles.length-1;i>=0;i--){const shot=projectiles[i];if(shot.at>elapsed)continue;projectiles.splice(i,1);let hits=0;
      if(shot.splash>0){for(const target of spatial.query(shot.position,shot.splash+1)){if(target.hp<=0||allied(target.ownerId,shot.ownerId))continue;const range=Math.hypot(distance(target,shot.position),target.y+unitRules[target.kind].height*.55-shot.position.y);
          if(range<=shot.splash+target.radius*.35){damage(target,Math.max(1,Math.round(shot.attack*(1-.55*clamp(range/shot.splash,0,1)))));hits++;}}}
      else{const target=lookup.get(shot.targetId);if(shot.hit&&target?.hp>0&&!allied(target.ownerId,shot.ownerId)&&distance(target,shot.position)<target.radius+.8){damage(target,shot.attack);hits++;}}
      stats.hits+=hits;event({type:'impact',kind:shot.kind,position:shot.position,splash:shot.splash,hit:hits>0});
    }}
  function turnChassis(unit,target,dt){
    const previous=unit.heading,remaining=Math.max(0,MILITARY_MOTION[unit.kind].turnRate*dt-(unit.turnSpent??0));unit.heading=militaryTurn(previous,target,remaining);
    const change=militaryAngle(unit.heading-previous);unit.turnVelocity+=change/dt;unit.turnSpent=(unit.turnSpent??0)+Math.abs(change);
    // The independent weapon servo compensates during aim(). Its relative
    // traverse must obey its own speed limit, even when the hull turns.
  }
  function move(unit,goal,dt){const spec=unitRules[unit.kind],motion=MILITARY_MOTION[unit.kind],air=unit.kind==='helicopter';
    if(!unit.goal||distance(goal,unit.goal)>2.5){unit.goal={...goal};unit.path=[];unit.pathIndex=0;unit.nextRouteAt=Math.min(unit.nextRouteAt,elapsed);}
    if(!unit.path.length&&elapsed>=unit.nextRouteAt&&routeBudget>0){routeBudget--;unit.path=navigation.path(unit,unit.goal,spec.radius,air,{maxNodes:unit.routeFailures?900:300,coarse:unit.routeFailures>0})??[];unit.pathIndex=0;unit.routeFailures=unit.path.length?0:unit.routeFailures+1;unit.nextRouteAt=elapsed+(unit.path.length?1.5:Math.min(12,1.5*2**Math.min(3,unit.routeFailures)));}
    let waypoint=unit.path[unit.pathIndex];if(!waypoint)return false;let d=distance(unit,waypoint);
    if(d<.07){unit.pathIndex++;if(unit.pathIndex>=unit.path.length){const complete=unit.path.complete!==false;unit.path=[];unit.nextRouteAt=elapsed;unit.goal=complete?null:unit.goal;if(complete&&unit.order?.type==='move')unit.order=null;if(complete&&unit.botDriver)unit.botDriveGoal=null;return false;}waypoint=unit.path[unit.pathIndex];d=distance(unit,waypoint);}
    const headingDelta=delta(unit,waypoint);let dx=headingDelta.x/d,dz=headingDelta.z/d;
    const neighbors=spatial.query(unit,unit.radius+4);
    for(const other of neighbors){
      if(other===unit||other.hp<=0||(other.kind==='helicopter')!==air)continue;
      const relative=delta(unit,other),ox=relative.x,oz=relative.z,ahead=ox*dx+oz*dz,gap=unit.radius+other.radius+.14;
      // Begin yielding before contact so heavy chassis have room to turn.
      if(ahead>0&&ahead<gap+1.4&&Math.abs(ox*dz-oz*dx)<gap+.1){const length=Math.max(.001,Math.hypot(ox,oz));dx=(oz-ox*.18)/length;dz=(-ox-oz*.18)/length;break;}
    }
    const desiredHeading=Math.atan2(dx,dz);turnChassis(unit,desiredHeading,dt);
    const error=Math.abs(militaryAngle(desiredHeading-unit.heading));
    const alignment=clamp((.7-error)/.45,0,1),last=unit.pathIndex===unit.path.length-1;
    const targetSpeed=Math.min(spec.speed*alignment,last?Math.sqrt(2*motion.braking*Math.max(0,d-.025)):spec.speed);
    unit.speed=militaryApproach(unit.speed,targetSpeed,(targetSpeed>unit.speed?motion.acceleration:motion.braking)*dt);
    // Pivot on the spot before reversing. Translation is always along the
    // chassis, never a lateral collision correction or a snap to a waypoint.
    const step=Math.min(d,unit.speed*dt)*(error>1.1?0:1),forwardX=Math.sin(unit.heading),forwardZ=Math.cos(unit.heading);
    let next=offset(unit,forwardX*step,forwardZ*step);
    const touches=point=>neighbors.some(other=>other!==unit&&other.hp>0&&(other.kind==='helicopter')===air&&distance(point,other)<unit.radius+other.radius+.035);
    if(touches(next)){
      let low=0,high=1;for(let i=0;i<7;i++){const middle=(low+high)*.5,point=offset(unit,forwardX*step*middle,forwardZ*step*middle);if(touches(point))high=middle;else low=middle;}
      next=offset(unit,forwardX*step*low,forwardZ*step*low);unit.speed*=low;
    }
    if(!navigation.segment(unit,next,spec.radius,air)){
      // Keep turning toward this already-validated waypoint instead of
      // paying for a new route on every corner while the hull catches up.
      unit.speed=0;unit.blockedFor=(unit.blockedFor??0)+dt;
      if(unit.blockedFor>.8){unit.path=[];unit.nextRouteAt=elapsed+.5;unit.blockedFor=0;}return false;
    }
    unit.blockedFor=0;const actual=distance(unit,next);unit.x=next.x;unit.z=next.z;unit.y=surfaceAt(unit.x,unit.z).height+(air?MILITARY_RULES.hoverHeight:0);return actual>.001;
  }
  function aim(unit,target,dt){
    const weapon=MILITARY_WEAPONS[unit.kind];
    if(!target){unit.shotPlan=null;unit.aimYaw=militaryTurn(unit.aimYaw,0,weapon.yawRate*dt);unit.elevation=militaryApproach(unit.elevation,weapon.restElevation,weapon.elevationRate*dt);return;}
    const plan=prepareShot(unit,target);let solution=weaponSolution(unit,target,plan.offset);
    // Infantry and rocket pods have a finite traverse. A stationary body
    // turns to help them; driving vehicles retain their movement heading.
    if(weapon.yawLimit<Math.PI&&!unit.moving&&Math.abs(solution.yaw)>weapon.yawLimit*.72){const d=delta(unit,target);turnChassis(unit,Math.atan2(d.x,d.z),dt);solution=weaponSolution(unit,target,plan.offset);}
    const desiredYaw=clamp(solution.yaw,-weapon.yawLimit,weapon.yawLimit),desiredElevation=clamp(solution.elevation,weapon.minElevation,weapon.maxElevation);
    unit.aimYaw=militaryTurn(unit.aimYaw,desiredYaw,weapon.yawRate*dt);unit.elevation=militaryApproach(unit.elevation,desiredElevation,weapon.elevationRate*dt);
    const aligned=Math.abs(militaryAngle(solution.yaw-unit.aimYaw))<=weapon.tolerance&&Math.abs(solution.elevation-unit.elevation)<=weapon.tolerance;
    if(solution.valid&&aligned&&elapsed>=unit.nextShotAt)shoot(unit,target,solution);
  }
  function driveTpsBot(ownerId,bot){
    let unit=controlledUnit(ownerId);
    if(!unit){const avatar=lookup.get(match.player(ownerId)?.avatarId),available=avatar?.hp>0&&!match.controller(avatar.id)?avatar:units.find(u=>u.hp>0&&allied(u.ownerId,ownerId)&&!match.controller(u.id));
      if(available){possess(ownerId,available.id);unit=available;}else{const player=match.player(ownerId);player.respawnAt??=elapsed+5;return;}}
    unit.botDriver=true;if(elapsed<(bot.nextDriveOrder??0))return;bot.nextDriveOrder=elapsed+4;
    const target=(getCities()??[]).filter(c=>match.player(c.ownerId)&&!c.outpost&&!c.neutral&&!c.village&&(c.houseCount??3)>=3&&!allied(c.ownerId,ownerId)).reduce((best,city)=>!best||distance(unit,city)<distance(unit,best)?city:best,null);
    unit.botDriveGoal=target?{x:target.x,z:target.z}:null;
  }
  function updateBots(){const owners=typeof botOwners==='function'?botOwners():botOwners;
    const roster=owners??[],armies=new Map();for(const unit of units){let army=armies.get(unit.ownerId);if(!army)armies.set(unit.ownerId,army=[]);if(!match.controller(unit.id))army.push(unit);}
    for(let b=0;b<Math.min(8,roster.length);b++){const ownerId=roster[botCursor++%roster.length];let bot=bots.get(ownerId);if(!bot){bot={nextBuy:.45+random()*.35,nextOrder:MILITARY_RULES.botAttackDelay+random()*9,sequence:0,spent:0};bots.set(ownerId,bot);}
      if(match.player(ownerId)?.role==='tps'){driveTpsBot(ownerId,bot);continue;}
      const army=armies.get(ownerId)??[],city=(getCities()??[]).find(c=>c.ownerId===ownerId&&!c.outpost&&(c.level??Math.floor((c.houseCount??0)/3))>=2),ready=!match.players.length||!!city;
      if(ready&&elapsed>=bot.nextBuy&&army.length<10&&bot.spent<55){bot.nextBuy=elapsed+.45+random()*.15;const vehicles=['tank','artillery','helicopter'],choice=seedHash(ownerId)%3,mix=[vehicles[choice],'soldier',vehicles[(choice+1)%3],'soldier','soldier','soldier','soldier','soldier'];let kind=mix[bot.sequence%mix.length];if(bot.spent+unitRules[kind].resources>55)kind='soldier';const balance=getAccount(ownerId)?accountBalance(getAccount(ownerId)):{resources:0,food:0};
        const reserve=match.players.length&&(balance.resources<unitRules[kind].resources+8||balance.food<unitRules[kind].food+2),result=reserve?{ok:false}:buy(ownerId,kind);if(result.ok){bot.sequence++;bot.spent+=result.cost.resources;}else bot.nextBuy=elapsed+10;}
      if(elapsed<bot.nextOrder||!army.length)continue;bot.nextOrder=elapsed+8+random()*4;
      if(match.players.length){const origin=zones.find(z=>z.ownerId===ownerId)??army[0],target=(getCities()??[]).filter(c=>match.player(c.ownerId)&&!c.outpost&&!c.neutral&&!c.village&&(c.houseCount??3)>=3&&!allied(c.ownerId,ownerId)).reduce((best,city)=>!best||distance(origin,city)<distance(origin,best)?city:best,null);
        if(target){command(ownerId,army.map(u=>u.id),{type:'move',x:target.x,z:target.z});continue;}}
      const own=zones.find(z=>z.ownerId===ownerId),enemyUnits=units.filter(u=>!allied(u.ownerId,ownerId)&&u.hp>0),enemy=enemyUnits.sort((a,b)=>distance(own??army[0],a)-distance(own??army[0],b))[0];
      if(enemy)command(ownerId,army.map(u=>u.id),{type:'attack',targetId:enemy.id});
      else{const target=zones.filter(z=>!allied(z.ownerId,ownerId)&&getAccount(z.ownerId)).sort((a,b)=>distance(own??army[0],a)-distance(own??army[0],b))[0];if(target){const d=delta(target,own??army[0]),angle=Math.atan2(d.z,d.x);command(ownerId,army.map(u=>u.id),{type:'move',...offset(target,Math.cos(angle)*(target.outerRadius+2),Math.sin(angle)*(target.outerRadius+2))});}}
    }}
  function updateCaptures(){
    if(!match.players.length||elapsed<captureAt)return;captureAt=elapsed+.25;
    const cities=getCities()??[],live=new Set();
    for(const city of cities){
      if(!city?.id||!match.player(city.ownerId)||city.neutral||city.village||city.outpost||Number.isFinite(city.houseCount)&&city.houseCount<3)continue;live.add(city.id);
      let state=captures.get(city.id);if(!state||state.ownerId!==city.ownerId){state={cityId:city.id,ownerId:city.ownerId,teamId:null,playerId:null,progress:0,lastAt:elapsed,pending:false};captures.set(city.id,state);}
      if(state.pending)continue;const dt=Math.min(.3,elapsed-state.lastAt);state.lastAt=elapsed;
      // Every crewed unit can hold ground beneath it. Aircraft therefore let
      // teams contest cities across oceans without a separate transport class.
      const present=spatial.query(city,Math.max(3,city.radius??4)+2).filter(u=>u.hp>0&&distance(u,city)<=Math.max(3,city.radius??4)+2),teams=new Set(present.map(u=>teamId(u.ownerId)));
      if(teams.size!==1||teams.has(teamId(city.ownerId))){state.contested=teams.size>1;state.progress=0;state.teamId=null;state.playerId=null;continue;}
      const participant=u=>match.controller(u.id)??u.ownerId,captor=present.reduce((best,u)=>!best||String(participant(u)).localeCompare(String(participant(best)))<0?u:best,null),attackingTeam=teamId(captor.ownerId);
      if(state.teamId!==attackingTeam){state.progress=0;state.teamId=attackingTeam;state.playerId=participant(captor);}
      if(!present.some(u=>participant(u)===state.playerId))state.playerId=participant(captor);
      state.contested=false;state.progress=Math.min(1,state.progress+dt/20);
      if(state.progress<1)continue;state.pending=true;match.recordCapture(city.id,state.playerId);
      event({type:'city-captured',cityId:city.id,fromOwnerId:city.ownerId,toOwnerId:state.playerId,teamId:state.teamId});
      const candidates=match.players.filter(p=>p.teamId===state.teamId&&p.role==='tps'&&!p.assignedCityIds.length);candidates.sort((a,b)=>(a.id===state.playerId?-1:b.id===state.playerId?1:String(a.id).localeCompare(String(b.id))));
      if(candidates.length)inviteCity(state.playerId,city.id,candidates[0].id);
    }
    for(const id of captures.keys())if(!live.has(id))captures.delete(id);
  }
  function updateRespawns(){
    if(elapsed<respawnAt)return;respawnAt=elapsed+.25;
    for(const player of match.players){if(!player.respawnAt||elapsed<player.respawnAt||controlledUnit(player.id))continue;
      const available=units.find(u=>u.hp>0&&!match.controller(u.id)&&(player.role==='tps'?allied(u.ownerId,player.id):u.ownerId===player.id));
      const result=available?possess(player.id,available.id):spawnPlayer(player.id,{respawn:true});
      if(result.ok)event({type:'player-respawned',playerId:player.id,unitId:result.unit?.id??result.unitId});else player.respawnAt=elapsed+5;
    }
  }
  function tick(dt){elapsed+=dt;stats.steps++;if(elapsed>=refreshAt)refresh();routeBudget=1;grid();updateBots();impacts();
    for(const unit of units){if(unit.hp<=0)continue;unit.shielded=shielded(unit);unit.moving=false;unit.turnVelocity=0;unit.turnSpent=0;const oldX=unit.x,oldZ=unit.z,controller=match.controller(unit.id),input=controller?(directInputs.get(controller)??{forward:0,right:0,aimYaw:unit.heading,aimPitch:unit.elevation,fire:false}):null;let target=lookup.get(unit.targetId);
      if(controller){if(input.at!==undefined&&elapsed-input.at>.3){input.forward=0;input.right=0;input.fire=false;}if(unit.botDriver){if(unit.botDriveGoal)unit.moving=move(unit,unit.botDriveGoal,dt);if(elapsed>=unit.nextTargetAt){unit.targetId=nearestEnemy(unit)?.id??null;unit.nextTargetAt=elapsed+.25+unit.phase*.12;}unit._fireTarget=lookup.get(unit.targetId);}else if(elapsed<(unit.externalUntil??0))unit.moving=unit.speed>.01;else manualMove(unit,input,dt);}else{
      if(unit.order?.type==='attack'){target=lookup.get(unit.order.targetId);if(!target||target.hp<=0){unit.order=null;target=null;}}
      else{if(target&&(target.hp<=0||!inRange(unit,target)))target=null;if(elapsed>=unit.nextTargetAt){target=nearestEnemy(unit);unit.nextTargetAt=elapsed+.25+unit.phase*.12;}}
      unit.targetId=target?.id??null;
      let fireTarget=target&&inRange(unit,target)?target:null;
      // An explicit pursuit must not make a passing enemy invisible. Keep the
      // pursuit order while responding to nearby threats at the same cadence.
      if(!fireTarget&&unit.order?.type==='attack'){
        if(elapsed>=unit.nextTargetAt){unit.opportunityId=nearestEnemy(unit)?.id??null;unit.nextTargetAt=elapsed+.25+unit.phase*.12;}
        const nearby=lookup.get(unit.opportunityId);if(nearby?.hp>0&&inRange(unit,nearby))fireTarget=nearby;
      }
      if(unit.order?.type==='move')unit.moving=move(unit,unit.order,dt);
      else if(unit.order?.type==='attack'&&target&&(!inRange(unit,target)||unit.standOffTargetId===target.id)){
        const spec=unitRules[unit.kind],d=distance(unit,target),stand=Math.max(spec.minRange??0,spec.range*.7);
        // Directly above/below a target there is no horizontal separation
        // vector. Use the unit's stable phase, never its turning heading: a
        // heading-relative fallback would reverse the goal on every tick.
        const relative=delta(target,unit),dx=d>.1?relative.x/d:Math.sin(unit.phase*Math.PI*2),dz=d>.1?relative.z/d:Math.cos(unit.phase*Math.PI*2);
        if(d<=.1)unit.standOffTargetId=target.id;
        // Finish this initial separation before turning back to shoot. At
        // the exact depression boundary, turning an off-center pod changes
        // its range and otherwise alternates pursuit and aiming every tick.
        if(unit.standOffTargetId===target.id&&d>=stand*.8)unit.standOffTargetId=null;
        else unit.moving=move(unit,offset(target,dx*stand,dz*stand),dt);
      }
        unit._fireTarget=fireTarget;
      }
      if(!unit.moving)unit.speed=militaryApproach(unit.speed,0,MILITARY_MOTION[unit.kind].braking*dt);
      const travelled=delta({x:oldX,z:oldZ},unit);unit.velocityX=travelled.x/dt;unit.velocityZ=travelled.z/dt;
      if(unit.kind==='helicopter'){
        const forward=unit.velocityX*Math.sin(unit.heading)+unit.velocityZ*Math.cos(unit.heading),side=unit.velocityX*Math.cos(unit.heading)-unit.velocityZ*Math.sin(unit.heading);
        unit.pitch=militaryApproach(unit.pitch,clamp(forward/unitRules.helicopter.speed*.16,-.12,.16),.6*dt);
        unit.roll=militaryApproach(unit.roll,clamp(-side*.06-unit.turnVelocity*unit.speed*.045,-.22,.22),.7*dt);
      }
      if(controller&&!unit.botDriver){if(elapsed>=(unit.externalUntil??0))manualAim(unit,input,dt);}else aim(unit,unit._fireTarget&&inRange(unit,unit._fireTarget)?unit._fireTarget:null,dt);
    }
    updateCaptures();
    for(let i=units.length-1;i>=0;i--)if(units[i].hp<=0){const dead=units[i],controller=match.controller(dead.id),avatar=dead.avatarPlayerId;match.removeUnit(dead.id);lookup.delete(dead.id);units.splice(i,1);membershipRevision++;const player=match.player(controller??avatar);if(player&&!controlledUnit(player.id))player.respawnAt=elapsed+5;}
    updateRespawns();
  }
  refresh();for(const player of match.players)spawnPlayer(player.id);
  return{units,buy,command,match,spawnPlayer,syncPlayerAvatar,possess,release,controlledUnit,setDirectControl,control:setDirectControl,setRole:(playerId,role)=>match.setRole(playerId,role),inviteCity,acceptCity,declineCity:(playerId,id)=>match.declineCity(playerId,id),allied,
    get captures(){return [...captures.values()];},update(dt){if(disposed||!Number.isFinite(dt)||dt<=0)return;const accepted=Math.min(dt,.5);stats.droppedTime+=dt-accepted;accumulator+=accepted;while(accumulator+1e-9>=MILITARY_RULES.step){accumulator-=MILITARY_RULES.step;tick(MILITARY_RULES.step);}},
    drainEvents(){return events.splice(0);},get membershipRevision(){return membershipRevision;},get elapsed(){return elapsed;},get spawnZones(){return zones;},get stats(){return{...stats,units:units.length,projectiles:projectiles.length,events:events.length,navigation:navigation.stats};},
    dispose(){if(disposed)return;disposed=true;units.length=0;lookup.clear();events.length=0;projectiles.length=0;bots.clear();directInputs.clear();captures.clear();match.dispose();navigation.dispose();}};
}
