import {worldSurface} from './world-model.js';
import {SpatialGrid,pointBox} from './spatial-index.js';
import {createMilitaryNavigation} from './military-navigation.js';

const unitRules={
  soldier:{name:'Infantry',resources:1,food:1,health:6,attack:1,range:9,speed:2.4,interval:.9,accuracy:.76,airAccuracy:.20,splash:0,radius:.24,height:.65,projectile:'tracer'},
  tank:{name:'Tank',resources:20,food:0,health:28,attack:5,range:14,speed:1.65,interval:1.8,accuracy:.97,airAccuracy:.72,splash:1.6,radius:1.35,height:1.1,projectile:'shell'},
  artillery:{name:'Artillery',resources:20,food:0,health:12,attack:8,range:24,minRange:3,speed:1.35,interval:3.5,accuracy:.82,airAccuracy:.08,splash:3.8,radius:1.35,height:.9,projectile:'arc'},
  helicopter:{name:'Helicopter',resources:20,food:0,health:18,attack:2,range:15,speed:3.6,interval:.45,accuracy:.9,airAccuracy:.9,splash:.65,radius:.9,height:.9,projectile:'rocket'},
};
export const MILITARY_RULES=Object.freeze({step:1/20,maxUnits:2048,maxPerOwner:160,hoverHeight:5,spawnWidth:7,shieldMultiplier:.5,botAttackDelay:45,
  ...Object.fromEntries(Object.entries(unitRules).map(([kind,value])=>[kind,Object.freeze({...value,cost:Object.freeze({resources:value.resources,food:value.food})})]))});
const kinds=Object.keys(unitRules),finitePoint=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z),distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
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
  const random=randomSource(seed),units=[],lookup=new Map(),events=[],projectiles=[],navigation=createMilitaryNavigation(world,{surfaceAt,getPlacements});
  let elapsed=0,accumulator=0,membershipRevision=0,nextId=1,disposed=false,spatial=new SpatialGrid(12),zones=[],refreshAt=-1,routeBudget=0;
  const bots=new Map(),stats={shots:0,hits:0,kills:0,spawned:0,damage:0,shieldedDamage:0,targetChecks:0,steps:0,droppedTime:0};
  function event(value){if(events.length<4096)events.push({...value,time:elapsed});}
  function refresh(){zones=(getCities()??[]).filter(c=>finitePoint(c)&&c.ownerId&&c.ownerId!=='neutral'&&!c.neutral).map(getMilitarySpawnZone);navigation.refresh();refreshAt=elapsed+.5;}
  function grid(){spatial=new SpatialGrid(12);for(const unit of units)spatial.insert(unit,pointBox(unit.x,unit.z,unit.radius));}
  function shielded(unit){return zones.some(zone=>zone.ownerId===unit.ownerId&&distance(zone,unit)<=zone.outerRadius);}
  function team(ownerId){return world.players?.find(p=>p.id===ownerId)??ownerId;}
  function accountBalance(account){const totals=account.resourcesAt?.({x:0,z:0});return{resources:totals?.resources??account.logs??0,food:totals?.food??account.food??0};}
  function occupied(point,radius,air){return spatial.query(pointBox(point.x,point.z,radius+2)).some(u=>(u.kind==='helicopter')===air&&distance(point,u)<radius+u.radius+.18);}
  function buy(ownerId,kind){
    if(disposed)return{ok:false,code:'disposed'};const spec=unitRules[kind];if(!spec)return{ok:false,code:'invalid-unit'};
    if(units.length>=MILITARY_RULES.maxUnits||units.filter(u=>u.ownerId===ownerId).length>=MILITARY_RULES.maxPerOwner)return{ok:false,code:'unit-limit'};
    refresh();const zone=zones.find(z=>z.ownerId===ownerId);if(!zone)return{ok:false,code:'no-city'};
    const account=getAccount(ownerId);if(!account)return{ok:false,code:'no-account'};const balance=accountBalance(account),cost={resources:spec.resources,food:spec.food};
    if(balance.resources<cost.resources||balance.food<cost.food)return{ok:false,code:'not-enough-resources',cost,missing:{resources:Math.max(0,cost.resources-balance.resources),food:Math.max(0,cost.food-balance.food)}};
    const air=kind==='helicopter';let point=null;grid();
    for(let attempt=0;attempt<160;attempt++){
      const angle=random()*Math.PI*2,inner=zone.innerRadius+spec.radius+.3,outer=zone.outerRadius-spec.radius-.3;
      if(inner>=outer)break;const radius=Math.sqrt(inner*inner+random()*(outer*outer-inner*inner)),candidate={x:zone.x+Math.cos(angle)*radius,z:zone.z+Math.sin(angle)*radius};
      // Air units also begin over dry land, then may fly across bays.
      if(!navigation.clear(candidate,spec.radius,false)||occupied(candidate,spec.radius,air))continue;point=candidate;break;
    }
    if(!point)return{ok:false,code:'spawn-blocked'};
    // Validate both funds and spawn before spending. Refund the first debit if
    // an external wallet rejects the second, so a failed purchase is atomic.
    const debit=(account.spendResources??account.spendLogs)?.call(account,cost.resources);if(!debit?.ok)return{ok:false,code:debit?.code??'not-enough-resources',cost};
    if(cost.food){const food=account.spendFood?.(cost.food);if(!food?.ok){(account.creditResources??account.addLogs)?.call(account,cost.resources);return{ok:false,code:food?.code??'not-enough-food',cost};}}
    const unit={id:`military-${nextId++}`,ownerId,team:team(ownerId),kind,...point,y:surfaceAt(point.x,point.z).height+(air?MILITARY_RULES.hoverHeight:0),heading:random()*Math.PI*2,
      hp:spec.health,maxHp:spec.health,radius:spec.radius,moving:false,shielded:true,order:null,targetId:null,path:[],pathIndex:0,goal:null,nextTargetAt:elapsed+random()*.2,nextShotAt:elapsed+.3+random()*.4,nextRouteAt:0,routeFailures:0,phase:random(),active:true};
    units.push(unit);lookup.set(unit.id,unit);membershipRevision++;stats.spawned++;event({type:'spawned',unitId:unit.id,ownerId,kind,position:{...point,y:unit.y}});return{ok:true,unit,cost};
  }
  function command(ownerId,ids,order){
    if(disposed||!Array.isArray(ids)||!['move','attack','stop'].includes(order?.type))return{ok:false,code:'invalid-order'};
    const selected=[...new Set(ids)].map(id=>lookup.get(id)).filter(u=>u?.ownerId===ownerId&&u.hp>0);if(!selected.length)return{ok:false,code:'no-units'};
    if(order.type==='move'&&!finitePoint(order))return{ok:false,code:'invalid-target'};
    const enemy=order.type==='attack'?lookup.get(order.targetId):null;if(order.type==='attack'&&(!enemy||enemy.ownerId===ownerId))return{ok:false,code:'invalid-target'};
    const columns=Math.ceil(Math.sqrt(selected.length)),spacing=selected.some(u=>u.kind!=='soldier')?3:.85;
    let accepted=0;selected.forEach((unit,index)=>{
      let destination=null;if(order.type==='move'){destination=navigation.nearest({x:order.x+(index%columns-(Math.min(columns,selected.length)-1)/2)*spacing,z:order.z+(Math.floor(index/columns)-(Math.ceil(selected.length/columns)-1)/2)*spacing},unit.radius,unit.kind==='helicopter');if(!destination)return;}
      accepted++;if(order.type==='attack'&&unit.order?.type==='attack'&&unit.order.targetId===enemy.id)return;
      unit.order=order.type==='move'?{type:'move',...destination}:order.type==='attack'?{type:'attack',targetId:enemy.id}:null;
      unit.path=[];unit.pathIndex=0;unit.goal=null;unit.targetId=enemy?.id??null;unit.nextRouteAt=elapsed;unit.nextTargetAt=elapsed;unit.routeFailures=0;
    });return accepted?{ok:true,count:accepted}:{ok:false,code:'blocked-target'};
  }
  function nearestEnemy(unit){const spec=unitRules[unit.kind];let best=null,d2=spec.range**2;
    for(const other of spatial.query(pointBox(unit.x,unit.z,spec.range))){stats.targetChecks++;if(other.ownerId===unit.ownerId||other.hp<=0)continue;
      const sq=(unit.x-other.x)**2+(unit.z-other.z)**2+(unit.y-other.y)**2;if(sq<d2&&sq>=(spec.minRange??0)**2){d2=sq;best=other;}}
    return best;
  }
  function inRange(unit,target){const spec=unitRules[unit.kind],range=Math.hypot(unit.x-target.x,unit.y-target.y,unit.z-target.z);return range<=spec.range&&range>=(spec.minRange??0);}
  function shoot(unit,target){const spec=unitRules[unit.kind],hit=random()<(target.kind==='helicopter'?spec.airAccuracy:spec.accuracy),targetSpec=unitRules[target.kind],from={x:unit.x,y:unit.y+spec.height,z:unit.z},to={x:target.x,y:target.y+targetSpec.height*.55,z:target.z};
    if(!hit){const angle=random()*Math.PI*2,miss=target.radius+1.2+random()*2;to.x+=Math.cos(angle)*miss;to.z+=Math.sin(angle)*miss;if(target.kind==='helicopter')to.y-=2+random()*2;}
    const duration={tracer:.3,shell:.7,arc:1.4,rocket:.8}[spec.projectile];
    projectiles.push({at:elapsed+duration,ownerId:unit.ownerId,kind:unit.kind,targetId:target.id,position:to,hit,attack:spec.attack,splash:spec.splash});
    event({type:'shot',unitId:unit.id,ownerId:unit.ownerId,kind:unit.kind,projectile:spec.projectile,from,to,hit,duration});stats.shots++;unit.nextShotAt=elapsed+spec.interval;
  }
  function damage(unit,amount){const reduced=shielded(unit),applied=amount*(reduced?MILITARY_RULES.shieldMultiplier:1);unit.hp=Math.max(0,unit.hp-applied);stats.damage+=applied;if(reduced)stats.shieldedDamage+=amount-applied;
    event({type:'damage',unitId:unit.id,amount:applied,shielded:reduced});if(unit.hp<=0&&unit.active){unit.active=false;stats.kills++;event({type:'destroyed',unitId:unit.id,kind:unit.kind,ownerId:unit.ownerId,position:{x:unit.x,y:unit.y,z:unit.z}});}}
  function impacts(){for(let i=projectiles.length-1;i>=0;i--){const shot=projectiles[i];if(shot.at>elapsed)continue;projectiles.splice(i,1);let hits=0;
      if(shot.splash>0){for(const target of spatial.query(pointBox(shot.position.x,shot.position.z,shot.splash+1))){if(target.hp<=0||target.ownerId===shot.ownerId)continue;const range=Math.hypot(target.x-shot.position.x,target.y+unitRules[target.kind].height*.55-shot.position.y,target.z-shot.position.z);
          if(range<=shot.splash+target.radius*.35){damage(target,Math.max(1,Math.round(shot.attack*(1-.55*clamp(range/shot.splash,0,1)))));hits++;}}}
      else{const target=lookup.get(shot.targetId);if(shot.hit&&target?.hp>0&&distance(target,shot.position)<target.radius+.8){damage(target,shot.attack);hits++;}}
      stats.hits+=hits;event({type:'impact',kind:shot.kind,position:shot.position,splash:shot.splash,hit:hits>0});
    }}
  function move(unit,goal,dt){const spec=unitRules[unit.kind],air=unit.kind==='helicopter';
    if(!unit.goal||distance(goal,unit.goal)>2.5){unit.goal={...goal};unit.path=[];unit.pathIndex=0;unit.nextRouteAt=Math.min(unit.nextRouteAt,elapsed);}
    if(!unit.path.length&&elapsed>=unit.nextRouteAt&&routeBudget>0){routeBudget--;unit.path=navigation.path(unit,unit.goal,spec.radius,air,{maxNodes:unit.routeFailures?900:300,coarse:unit.routeFailures>0})??[];unit.pathIndex=0;unit.routeFailures=unit.path.length?0:unit.routeFailures+1;unit.nextRouteAt=elapsed+(unit.path.length?1.5:Math.min(12,1.5*2**Math.min(3,unit.routeFailures)));}
    const waypoint=unit.path[unit.pathIndex];if(!waypoint)return false;const d=distance(unit,waypoint),step=Math.min(d,spec.speed*dt);if(d<.05){unit.pathIndex++;if(unit.pathIndex>=unit.path.length){const complete=unit.path.complete!==false;unit.path=[];unit.nextRouteAt=elapsed;unit.goal=complete?null:unit.goal;if(complete&&unit.order?.type==='move')unit.order=null;}return false;}
    let dx=(waypoint.x-unit.x)/d,dz=(waypoint.z-unit.z)/d;
    for(const other of spatial.query(pointBox(unit.x,unit.z,unit.radius+2))){
      if(other===unit||other.hp<=0||(other.kind==='helicopter')!==air)continue;
      const ox=other.x-unit.x,oz=other.z-unit.z,ahead=ox*dx+oz*dz,gap=unit.radius+other.radius+.12;
      if(ahead>0&&ahead<gap+.35&&Math.abs(ox*dz-oz*dx)<gap){const oldX=dx;dx=oldX*.25+dz*.97;dz=dz*.25-oldX*.97;break;}
    }
    // Nearby-body repulsion shares the spatial target index. Different flight
    // layers do not push each other, and building/water checks remain final.
    let pushX=0,pushZ=0;for(const other of spatial.query(pointBox(unit.x,unit.z,unit.radius+2))){if(other===unit||other.hp<=0||(other.kind==='helicopter')!==air)continue;const ox=unit.x-other.x,oz=unit.z-other.z,dist=Math.hypot(ox,oz),gap=unit.radius+other.radius+.14;if(dist<gap&&dist>.001){pushX+=ox/dist*(gap-dist)*.6;pushZ+=oz/dist*(gap-dist)*.6;}}
    let next={x:unit.x+dx*step+clamp(pushX,-step*.65,step*.65),z:unit.z+dz*step+clamp(pushZ,-step*.65,step*.65)};
    for(let pass=0;pass<2;pass++)for(const other of spatial.query(pointBox(next.x,next.z,unit.radius+2))){
      if(other===unit||other.hp<=0||(other.kind==='helicopter')!==air)continue;const ox=next.x-other.x,oz=next.z-other.z,dist=Math.hypot(ox,oz),gap=unit.radius+other.radius+.04;
      if(dist<gap){const nx=dist>.0001?ox/dist:Math.cos(unit.phase*6.28),nz=dist>.0001?oz/dist:Math.sin(unit.phase*6.28);next={x:other.x+nx*gap,z:other.z+nz*gap};}
    }
    if(!navigation.segment(unit,next,spec.radius,air)){unit.path=[];unit.nextRouteAt=elapsed+.5;return false;}
    const actual=distance(unit,next),heading=Math.atan2(next.x-unit.x,next.z-unit.z);unit.x=next.x;unit.z=next.z;unit.y=surfaceAt(unit.x,unit.z).height+(air?MILITARY_RULES.hoverHeight:0);unit.heading=heading;return actual>.001;
  }
  function updateBots(){const owners=typeof botOwners==='function'?botOwners():botOwners;
    for(const ownerId of owners??[]){let bot=bots.get(ownerId);if(!bot){bot={nextBuy:.45+random()*.35,nextOrder:MILITARY_RULES.botAttackDelay+random()*9,sequence:0,spent:0};bots.set(ownerId,bot);}
      const army=units.filter(u=>u.ownerId===ownerId);if(elapsed>=bot.nextBuy&&army.length<10&&bot.spent<55){bot.nextBuy=elapsed+.45+random()*.15;const vehicles=['tank','artillery','helicopter'],choice=seedHash(ownerId)%3,mix=[vehicles[choice],'soldier',vehicles[(choice+1)%3],'soldier','soldier','soldier','soldier','soldier'];let kind=mix[bot.sequence%mix.length];if(bot.spent+unitRules[kind].resources>55)kind='soldier';const result=buy(ownerId,kind);if(result.ok){bot.sequence++;bot.spent+=result.cost.resources;}else bot.nextBuy=elapsed+10;}
      if(elapsed<bot.nextOrder||!army.length)continue;bot.nextOrder=elapsed+8+random()*4;
      const own=zones.find(z=>z.ownerId===ownerId),enemyUnits=units.filter(u=>u.ownerId!==ownerId&&u.hp>0),enemy=enemyUnits.sort((a,b)=>distance(own??army[0],a)-distance(own??army[0],b))[0];
      if(enemy)command(ownerId,army.map(u=>u.id),{type:'attack',targetId:enemy.id});
      else{const target=zones.filter(z=>z.ownerId!==ownerId&&getAccount(z.ownerId)).sort((a,b)=>distance(own??army[0],a)-distance(own??army[0],b))[0];if(target){const angle=Math.atan2((own?.z??army[0].z)-target.z,(own?.x??army[0].x)-target.x);command(ownerId,army.map(u=>u.id),{type:'move',x:target.x+Math.cos(angle)*(target.outerRadius+2),z:target.z+Math.sin(angle)*(target.outerRadius+2)});}}
    }}
  function tick(dt){elapsed+=dt;stats.steps++;if(elapsed>=refreshAt)refresh();routeBudget=1;grid();updateBots();impacts();
    for(const unit of units){if(unit.hp<=0)continue;unit.shielded=shielded(unit);unit.moving=false;let target=lookup.get(unit.targetId);
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
      if(fireTarget){unit.heading=Math.atan2(fireTarget.x-unit.x,fireTarget.z-unit.z);if(elapsed>=unit.nextShotAt)shoot(unit,fireTarget);}
      if(unit.order?.type==='move')unit.moving=move(unit,unit.order,dt);
      else if(unit.order?.type==='attack'&&target&&!inRange(unit,target)){const spec=unitRules[unit.kind],d=distance(unit,target),stand=Math.max(spec.minRange??0,spec.range*.7),dx=(unit.x-target.x)/Math.max(.001,d),dz=(unit.z-target.z)/Math.max(.001,d);unit.moving=move(unit,{x:target.x+dx*stand,z:target.z+dz*stand},dt);}
    }
    for(let i=units.length-1;i>=0;i--)if(units[i].hp<=0){lookup.delete(units[i].id);units.splice(i,1);membershipRevision++;}
  }
  refresh();return{units,buy,command,update(dt){if(disposed||!Number.isFinite(dt)||dt<=0)return;const accepted=Math.min(dt,.5);stats.droppedTime+=dt-accepted;accumulator+=accepted;while(accumulator+1e-9>=MILITARY_RULES.step){accumulator-=MILITARY_RULES.step;tick(MILITARY_RULES.step);}},
    drainEvents(){return events.splice(0);},get membershipRevision(){return membershipRevision;},get elapsed(){return elapsed;},get spawnZones(){return zones;},get stats(){return{...stats,units:units.length,projectiles:projectiles.length,events:events.length,navigation:navigation.stats};},
    dispose(){if(disposed)return;disposed=true;units.length=0;lookup.clear();events.length=0;projectiles.length=0;bots.clear();navigation.dispose();}};
}
