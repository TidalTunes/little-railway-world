import {LOOP_ECONOMY_RULES,loopTrainCost} from './loop-economy-rules.js';

const DETOURS=[28,-28,44,-44,64,-64];
const TURNAROUNDS=[28,-28,44,-44].flatMap(offset=>[-.8,.8].flatMap(bias=>[1,-1,2].map(second=>({offset,bias,second}))));
const ROUTE_VARIANTS=DETOURS.length+TURNAROUNDS.length;

/** Keep the same distance-based control count as the player's editor. A small
 * family of bowed corridors gives a return track room beside its outward
 * sibling; probes are spread across decisions, never searched in one frame. */
export function loopBotRouteOptions(from,to,ownerId,attempt=0,baseline={}){
  if(attempt===0)return{ownerId};
  const start=baseline.handles?.[0]??from,end=baseline.handles?.at(-1)??to;
  const dx=end.x-start.x,dz=end.z-start.z,length=Math.hypot(dx,dz)||1;
  const count=baseline.waypointCount??Math.max(1,Math.min(12,Math.ceil(Math.hypot(to.x-from.x,to.z-from.z)/LOOP_ECONOMY_RULES.trackUnitLength)-1));
  const turnaround=TURNAROUNDS[attempt-DETOURS.length-1],offset=DETOURS[attempt-1]??turnaround?.offset;if(offset===undefined)return null;
  return{ownerId,controlCount:count,waypoints:Array.from({length:count},(_,index)=>{
    // Some platform directions require passing beyond one city before
    // turning home. A midpoint bow alone keeps crossing the outward track.
    // Shift the same handles past an endpoint; never add editing nodes.
    const t=(index+1)/(count+1)+(turnaround?.bias??0),bow=turnaround?offset*(index?turnaround.second:1):Math.sin(t*Math.PI)*offset;
    return{x:start.x+dx*t-dz/length*bow,z:start.z+dz*t+dx/length*bow};
  })};
}

/** Rivals use the same build, rail and train commands as the player. Their
 * only plan is to reach a station, close a useful loop, then grow the town. */
export function createLoopBots(world,{session,bots,railways,economy,onRailBuild=()=>{},planRoute}={}){
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z),entries=(Array.isArray(bots)?bots:bots?.entries??[]).map((entry,index)=>({
    bot:entry.bot??entry,game:entry.game??entry.bot?.game??entry.game,config:entry.config??entry.bot?.config??{},due:index,
    state:'growing-station',targetHouses:6,routes:0,trains:0,partnerId:null,failures:new Map(),probes:new Map(),
  }));
  let elapsed=0,cursor=0,pending=null,disposed=false;
  const stats={decisions:0,previews:0,validations:0,routes:0,trains:0};
  const availableResources=entry=>economy.resourcesAt?.(entry.game.ownerId)?.resources??entry.game.resourcesAt?.()?.resources??entry.game.logs??0;
  const reserveFor=(cost,closing)=>loopTrainCost(2)+(closing?0:cost);
  for(const entry of entries)entry.bot.setPolicy({targetHouses:6,logReserve:0});
  function fail(entry,key,code){entry.failures.set(key,{code,retryAt:elapsed+30});entry.state=code==='not-enough-resources'?'saving':'finding-loop';}
  function commit(request,plan){
    const {entry,from,to,options,key}=request;
    if(!plan?.siteValid||plan.valid===false&&plan.code!=='not-enough-resources'){fail(entry,key,plan?.code??'route-blocked');return;}
    // Recheck spendable resources after worker adoption: a train or house
    // purchase may have consumed them while this geometry was being checked.
    if(!Number.isFinite(plan.cost)||availableResources(entry)-plan.cost<reserveFor(plan.cost,request.closing)){fail(entry,key,'not-enough-resources');return;}
    const result=railways.build(from,to,{...options,requireCached:true});
    if(result.ok){entry.routes++;stats.routes++;entry.state='closing-loop';onRailBuild(result);}
    else fail(entry,key,result.code);
  }
  function finishPending(){
    const request=pending;if(!request?.response)return;
    pending=null;const {response,from,to,options,geometryKey,entry,key}=request;
    if(response.error||response.stale){fail(entry,key,'planning-unavailable');return;}
    if(railways.geometryKey(from,to,options)!==geometryKey||!railways.adoptPreview(from,to,response.result,geometryKey,options)){entry.state='replanning';return;}
    commit(request,response.result);
  }
  function decide(entry){
    stats.decisions++;const city=entry.game.cities[0];
    if(!city||city.level<2){entry.state='growing-station';entry.targetHouses=6;entry.bot.setPolicy({targetHouses:6,logReserve:0});return;}
    const cityState=economy.city(city.id),ownedTrains=economy.trains.filter(train=>train.ownerId===entry.game.ownerId);
    if(ownedTrains.length){
      entry.trains=ownedTrains.length;entry.targetHouses=15;entry.state=entry.game.houses.length>=15?'trading':'growing';
      entry.bot.setPolicy({targetHouses:15,logReserve:0});return;
    }
    entry.targetHouses=6;entry.bot.setPolicy({targetHouses:6,logReserve:0});
    const loops=cityState?.loops??[];
    if(loops.length){
      const ranked=loops.slice().sort((a,b)=>a.cost-b.cost||a.length-b.length);
      const purchased=economy.buyTrain(city.id,ranked[0].id,entry.game.ownerId);
      if(purchased.ok){entry.trains++;stats.trains++;entry.state='trading';}
      else entry.state='saving-train';return;
    }
    const snapshot=railways.snapshot(),connections=snapshot.connections??[],cities=snapshot.cities??railways.cities??[];
    let available=cities.filter(other=>other.id!==city.id&&other.level>=2&&distance(city,other)<=railways.maxConnectionDistance);
    const incomplete=available.filter(other=>connections.some(link=>link.from===city.id&&link.to===other.id)&&!connections.some(link=>link.from===other.id&&link.to===city.id));
    // Do not drain the train budget buying unrelated outward tracks while a
    // paid approach is waiting for its return. Finish that investment first.
    if(incomplete.length)available=incomplete;
    const resource=cityState?.resource??'resources';
    const score=other=>{
      const type=economy.city(other.id)?.resource;
      return (type==='food'?35:type!==resource?20:0)-distance(city,other)*.1;
    };
    available.sort((a,b)=>(a.id===entry.partnerId?-100:0)-(b.id===entry.partnerId?-100:0)||score(b)-score(a)||a.id.localeCompare(b.id));
    for(const partner of available){
      // Directed city links are distinct: the return route must close the
      // circle, and cannot reuse the outward track against its arrows.
      const outward=connections.some(link=>link.from===city.id&&link.to===partner.id);
      const returning=connections.some(link=>link.from===partner.id&&link.to===city.id);
      if(outward&&returning)continue;
      const from=outward?partner.id:city.id,to=outward?city.id:partner.id,key=`${from}>${to}`;
      if(entry.failures.get(key)?.retryAt>elapsed)continue;
      let probe=entry.probes.get(key);
      if(!probe||probe.revision!==railways.revision||probe.attempt>ROUTE_VARIANTS){probe={revision:railways.revision,attempt:0,baseline:null};entry.probes.set(key,probe);}
      const options=loopBotRouteOptions(cities.find(candidate=>candidate.id===from)??city,cities.find(candidate=>candidate.id===to)??partner,entry.game.ownerId,probe.attempt,probe.baseline??{});stats.previews++;
      const preview=railways.preview(from,to,options);
      if(probe.attempt===0)probe.baseline=preview;probe.attempt++;
      if(!preview?.siteValid){
        if(['route-blocked','invalid-alignment'].includes(preview?.code)&&probe.attempt<=ROUTE_VARIANTS){entry.state='shaping-loop';return;}
        fail(entry,key,preview?.code??'route-blocked');continue;
      }
      if(!Number.isFinite(preview.cost)||availableResources(entry)-preview.cost<reserveFor(preview.cost,outward)){fail(entry,key,'not-enough-resources');continue;}
      entry.partnerId=partner.id;stats.validations++;
      const request={entry,from,to,options,key,closing:outward,geometryKey:railways.geometryKey(from,to,options),response:null};
      if(planRoute){
        pending=request;entry.state='planning';
        try{Promise.resolve(planRoute(from,to,options)).then(response=>{if(!disposed&&pending===request)request.response=response??{error:true};},()=>{if(!disposed&&pending===request)request.response={error:true};});}
        catch{request.response={error:true};}
      }else commit(request,railways.evaluate(from,to,options));
      return;
    }
  }
  return {
    update(dt){
      if(disposed||!Number.isFinite(dt)||dt<=0||!entries.length)return;
      elapsed+=Math.min(dt,60);if(pending){finishPending();return;}
      for(let offset=0;offset<entries.length;offset++){
        const index=(cursor+offset)%entries.length,entry=entries[index];if(elapsed<entry.due)continue;
        entry.due=elapsed+3;cursor=(index+1)%entries.length;decide(entry);break;
      }
    },
    snapshot(){return entries.map(entry=>({id:entry.config.id,ownerId:entry.game.ownerId,profile:'loop-builder',targetHouses:entry.targetHouses,
      state:entry.state,routes:entry.routes,trains:entry.trains,partnerId:entry.partnerId,failedPairs:entry.failures.size}));},
    get stats(){return {...stats};},get planning(){return Boolean(pending);},
    dispose(){disposed=true;pending=null;for(const entry of entries){entry.failures.clear();entry.probes.clear();}},
  };
}
