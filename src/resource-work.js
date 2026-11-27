import {isHarvestableWood} from './harvestable-wood.js';
import {biomeAt} from './biomes.js';
import {cityResource} from './loop-economy.js';
export {cityResource} from './loop-economy.js';
import {worldSurface} from './world-model.js';
import {settlementDoor,planSettlementPath} from './settlement-paths.js';
import {settlementTreeId} from './settlement-game.js';

export const RESOURCE_WORK=Object.freeze({speed:1.12,workSeconds:3.8,restSeconds:3,amount:1,treeRegrowSeconds:95,searchRadius:38,routeInterval:.12,routeNodes:420});
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z),wrap=value=>Math.atan2(Math.sin(value),Math.cos(value));
const hash=value=>{let n=2166136261;for(const c of String(value))n=Math.imul(n^c.charCodeAt(0),16777619);return(n>>>0)/4294967296;};
const idOf=item=>isHarvestableWood(item)?settlementTreeId(item):item.id??`${item.kind}:${item.x}:${item.z}`;
const radius=item=>item.radius??(item.kind==='tree'?.85:(item.width||item.depth)?Math.hypot(item.width??2.2,item.depth??2.2)/2:.8)*(item.scale??1);
const solid=item=>['tree','rock','house','civic','farm','station','tower','apartment','cactus','landmark'].includes(item.kind)||item.kind==='nature'&&item.style==='outcrop';
function pointSegment(point,a,b){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(point.x-a.x-t*dx,point.z-a.z-t*dz);}


/** Simulation, not rendering, owns work. Every credit has a unique completed
 * round trip: leave a real doorway, reach a reachable node, work, return home.
 * The camera cannot create citizens, speed production, or pause distant towns. */
export function createResourceWork(world,{session,getPlacements=()=>[],surfaceAt=(x,z)=>worldSurface(world,x,z),tuning={}}={}){
  if(!session?.player)throw new TypeError('Resource work requires a settlement session');
  const settings={...RESOURCE_WORK,...tuning},workers=new Map(),nodes=new Map(),events=[],regrowth=new Map(),claims=new Map(),sources=new Map(),routeCache=new Map();
  let time=0,revision=0,placementRevision=0,visibilityRevision=0,layoutKey='',layoutRevision=-1,sceneryRevision=-1,removedKey='',dark=false,nextRoute=0,planningCursor=0,production=0,routeSearches=0;
  let scenery=[],buildings=[],paths=[],cityRecords=[],placements=[];
  let knownBlockers=new Set(),blockersInitialized=false;
  const removed=session.shared?.removedTreeIds??new Set();
  const emit=event=>events.push({...event,time});
  const markTrees=()=>session.shared?.touchTrees?.();
  function refreshScenery(){
    const key=session.spatialRevision??session.revision??0;if(key===sceneryRevision)return;sceneryRevision=key;
    const village=world.gameplay?.farmVillages,seen=new Set();scenery=[];
    for(const item of [...world.gameplay?.botScenery??[],...world.gameplay?.guaranteedTrees??[],...village?.farms??[],...getPlacements()]){
      const id=idOf(item);if(seen.has(id))continue;seen.add(id);sources.set(id,item);
      if(!session.shared?.isSceneryRemoved?.(item))scenery.push(item);
    }
    buildings=[...session.buildings??[],...village?.houses??[],...village?.buildings??[]];
    paths=[...session.shared?.getPaths?.()??session.paths??[],...village?.paths??[]];routeCache.clear();
    const fresh=buildings.filter(item=>!knownBlockers.has(idOf(item)));
    if(blockersInitialized&&fresh.length)for(const worker of workers.values())if(['outbound','returning'].includes(worker.activity)&&routeBlocked(worker,fresh)){worker.reroute=true;worker.rerouteWait=0;}
    knownBlockers=new Set(buildings.map(idOf));blockersInitialized=true;
  }
  function emptySite(point,padding=.8){
    const ground=surfaceAt(point.x,point.z);if(!ground||!['ground','mountain'].includes(ground.type)||!Number.isFinite(ground.height))return false;
    for(const item of [...scenery,...buildings,...placements])if(solid(item)&&!(isHarvestableWood(item)&&removed.has(idOf(item)))&&distance(point,item)<padding+radius(item)+.3)return false;
    return !paths.some(path=>(path.points??[]).slice(1).some((b,i)=>pointSegment(point,path.points[i],b)<padding+(path.width??.7)/2+.25));
  }
  function makeOre(city){
    const result=[];
    for(let i=0;i<48&&result.length<3;i++){
      const angle=hash(`${world.seed}:${city.id}:ore`)*Math.PI*2+i*2.39996323,r=(city.radius??5)+3+Math.floor(i/12)*3.2;
      const point={x:city.x+Math.sin(angle)*r,z:city.z+Math.cos(angle)*r};
      if(world.biomes?.regions&&biomeAt(world,point.x,point.z)!=='desert'||!emptySite(point,1.05)||result.some(item=>distance(item,point)<3.4))continue;
      const item={id:`ore:${city.id}:${result.length}`,kind:'rock',resource:'metal',...point,y:surfaceAt(point.x,point.z).height,radius:.94,scale:1,rotation:angle,cityId:city.id};
      result.push(item);
    }
    return result;
  }
  function sync(){
    refreshScenery();
    if(layoutRevision===sceneryRevision)return;layoutRevision=sceneryRevision;
    const village=world.gameplay?.farmVillages;
    const records=[session.player,...(session.bots??[]).map(entry=>entry.game)].flatMap(game=>{
      const homes=game.houses;return game.cities.map(city=>({...city,ownerId:game.ownerId,homes:homes.filter(home=>(city.houseIds??[]).includes(home.id)||home.cityId===city.id)}));
    }).concat((village?.cities??[]).map(city=>({...city,ownerId:city.ownerId??village.ownerId,neutral:true,homes:(village.houses??[]).filter(home=>home.cityId===city.id||(city.houseIds??[]).includes(home.id))})));
    const key=records.map(city=>`${city.id}:${city.ownerId}:${city.homes.map(home=>home.id).join(',')}`).join('|');
    if(key===layoutKey)return;layoutKey=key;cityRecords=records;const alive=new Set();
    for(const city of records){
      city.resource=cityResource(world,city,{neutral:city.neutral});
      if(city.resource==='metal'&&!placements.some(item=>item.cityId===city.id)){const ore=makeOre(city);placements.push(...ore);if(ore.length)placementRevision++;}
      for(const home of city.homes){
        const id=`worker:${home.id}`;alive.add(id);let worker=workers.get(id);
        if(worker){worker.cityId=city.id;worker.resource=city.resource;worker.home=home;continue;}
        const door=settlementDoor(world,home),seed=hash(`${world.seed}:${id}`);
        worker={id,houseId:home.id,ownerId:city.ownerId,cityId:city.id,resource:city.resource,home,...door,y:home.y??0,heading:home.rotation??0,
          speed:settings.speed*(.9+seed*.2),phase:seed*Math.PI*2,idleTime:0,distance:0,moving:false,indoors:dark,
          activity:dark?'indoors':'waiting',wait:seed*2.5,route:[],routeIndex:0,nodeId:null,carrying:false,trip:0,edge:true};
        workers.set(id,worker);visibilityRevision++;
      }
    }
    for(const [id,worker]of workers)if(!alive.has(id)){claims.delete(worker.nodeId);workers.delete(id);visibilityRevision++;}
    revision++;
  }
  function nodesFor(worker){
    const city=cityRecords.find(city=>city.id===worker.cityId);if(!city)return[];
    if(worker.resource==='wood')return scenery.filter(item=>isHarvestableWood(item)&&!removed.has(idOf(item))&&distance(item,city)<=settings.searchRadius).map(item=>({id:idOf(item),resource:'wood',source:item,...item}));
    if(worker.resource==='metal')return placements.filter(item=>item.cityId===city.id&&!session.shared?.isSceneryRemoved?.(item)).map(item=>({...item,source:item}));
    if(worker.resource==='food')return(world.gameplay?.farmVillages?.destinations??[]).filter(item=>item.cityId===city.id&&!session.shared?.isSceneryRemoved?.(item.farmId)).map(item=>({...item,resource:'food',gate:true}));
    const civic=buildings.filter(item=>item.cityId===city.id&&item.kind==='civic');
    return(civic.length?civic:city.homes.filter(home=>home.id!==worker.houseId)).map(item=>({...item,id:`work:${item.id}`,resource:'gold',building:item}));
  }
  function targetFor(node,worker){
    if(node.building){const b=node.building,p=settlementDoor(world,b,Math.max((b.depth??2.2)/2+.55,1.65));return {...p};}
    if(node.gate)return{x:node.x,z:node.z};
    const angle=Math.atan2(worker.home.x-node.x,worker.home.z-node.z),offset=(node.resource==='wood'? radius(node)+.38:1.35);
    return{x:node.x+Math.sin(angle)*offset,z:node.z+Math.cos(angle)*offset};
  }
  function routeTo(worker,node){
    const target=targetFor(node,worker),cacheKey=`${worker.houseId}:${node.id}:${sceneryRevision}`;
    if(routeCache.has(cacheKey))return routeCache.get(cacheKey);
    routeSearches++;
    // A tiny non-solid destination has its doorway at the work point. The
    // ordinary path planner checks the complete route, not a straight shortcut.
    const fake={id:`work-target:${node.id}`,kind:'work-target',...target,depth:-.84,doorOffset:0,rotation:Math.atan2(worker.home.x-target.x,worker.home.z-target.z)};
    const obstacles=[...scenery,...buildings,...placements].filter(item=>!(isHarvestableWood(item)&&removed.has(idOf(item))));
    const route=planSettlementPath(world,worker.home,fake,{placements:obstacles,surfaceAt,removedTreeIds:removed,width:.22,maxNodes:settings.routeNodes});
    routeCache.set(cacheKey,route?.points??null);return route?.points??null;
  }
  function release(worker){if(claims.get(worker.nodeId)===worker.id)claims.delete(worker.nodeId);}
  function choose(worker){
    const candidates=nodesFor(worker).filter(node=>node.resource!=='wood'||!claims.has(node.id)).sort((a,b)=>distance(worker.home,a)-distance(worker.home,b));
    // Rotate the first few work sites so every house doesn't stream into the
    // same corner of the same field or crowd a single ore face.
    const shortlist=candidates.slice(0,9),offset=Math.floor(hash(worker.id)*Math.min(3,shortlist.length));
    for(let i=0;i<Math.min(3,shortlist.length);i++){
      const node=shortlist[(i+offset)%shortlist.length],route=routeTo(worker,node);if(!route)continue;
      nodes.set(node.id,node);worker.nodeId=node.id;worker.route=route;worker.routeIndex=1;worker.activity='outbound';worker.indoors=false;worker.carrying=false;
      if(node.resource==='wood')claims.set(node.id,worker.id);visibilityRevision++;return true;
    }
    worker.wait=3;return false;
  }
  function segmentHits(a,b,item){
    if(['house','civic','apartment','station','tower','landmark','farm'].includes(item.kind)){
      const c=Math.cos(item.rotation??0),s=Math.sin(item.rotation??0),local=p=>({x:(p.x-item.x)*c-(p.z-item.z)*s,z:(p.x-item.x)*s+(p.z-item.z)*c});
      const start=local(a),end=local(b),width=(item.width??2.2)*(item.scale??1)/2+.15,depth=(item.depth??2.2)*(item.scale??1)/2+.15;
      let lo=0,hi=1;
      for(const axis of ['x','z']){const delta=end[axis]-start[axis],extent=axis==='x'?width:depth;if(Math.abs(delta)<1e-9){if(Math.abs(start[axis])>extent)return false;continue;}
        const first=(-extent-start[axis])/delta,second=(extent-start[axis])/delta;lo=Math.max(lo,Math.min(first,second));hi=Math.min(hi,Math.max(first,second));if(lo>hi)return false;}
      return true;
    }
    return pointSegment(item,a,b)<radius(item)+.15;
  }
  function routeBlocked(worker,obstacles){
    let previous=worker;
    for(const point of worker.route.slice(worker.routeIndex)){for(const item of obstacles)if(item.id!==worker.houseId&&segmentHits(previous,point,item))return true;previous=point;}
    return false;
  }
  function reroute(worker){
    const node=nodes.get(worker.nodeId),returning=worker.activity==='returning';
    if(!returning&&!nodeAvailable(worker)){goHome(worker);return;}
    const target=returning?worker.home:targetFor(node,worker),heading=Math.atan2(target.x-worker.x,target.z-worker.z);
    const to=returning?worker.home:{id:`work-target:${node.id}`,kind:'work-target',...target,depth:-.84,doorOffset:0,rotation:heading+Math.PI};
    // One queued replan owns a fixed total node budget. No worker performs a
    // full collision scan every animation frame after construction changes.
    const obstacles=[...scenery,...buildings,...placements].filter(item=>!(isHarvestableWood(item)&&removed.has(idOf(item)))&&!session.shared?.isSceneryRemoved?.(item));
    let plan=null;
    for(const offset of [0,Math.PI/2,-Math.PI/2,Math.PI]){
      const from={id:`worker-origin:${worker.id}`,kind:'work-target',x:worker.x,z:worker.z,depth:-.84,doorOffset:0,rotation:heading+offset};
      routeSearches++;plan=planSettlementPath(world,from,to,{placements:obstacles,surfaceAt,removedTreeIds:removed,width:.22,maxNodes:Math.max(24,Math.floor(settings.routeNodes/4))});if(plan)break;
    }
    if(!plan){worker.rerouteWait=2;return;}
    if(returning){worker.route=plan.points;worker.routeIndex=1;}
    else{const visited=worker.route.slice(0,worker.routeIndex);visited.push({x:worker.x,y:worker.y,z:worker.z});worker.route=[...visited,...plan.points.slice(1)];worker.routeIndex=visited.length;}
    worker.reroute=false;worker.rerouteWait=0;
  }
  function goHome(worker){
    const visited=worker.route.slice(0,Math.max(1,worker.routeIndex));
    // Reverse the actual travelled prefix at dusk, retaining the current point
    // so the worker never teleports to an arbitrary road or home.
    if(!visited.length)visited.push({...settlementDoor(world,worker.home),y:worker.home.y??0});
    worker.route=[{x:worker.x,y:worker.y,z:worker.z},...visited.reverse()];worker.routeIndex=1;worker.activity='returning';worker.wait=0;release(worker);worker.reroute=routeBlocked(worker,buildings);worker.rerouteWait=0;
  }
  function arriveHome(worker){
    if(worker.carrying){worker.trip++;production+=settings.amount;emit({type:'production',id:`${worker.id}:${worker.trip}`,ownerId:worker.ownerId,cityId:worker.cityId,resource:worker.resource,amount:settings.amount,
      workerId:worker.id,nodeId:worker.nodeId,x:worker.x,y:worker.y,z:worker.z});worker.carrying=false;revision++;}
    release(worker);worker.nodeId=null;worker.route=[];worker.routeIndex=0;worker.activity=dark?'indoors':'waiting';worker.indoors=dark;worker.wait=settings.restSeconds;visibilityRevision++;
  }
  function nodeAvailable(worker){const node=nodes.get(worker.nodeId);return !!node&&!session.shared?.isSceneryRemoved?.(node.farmId??node.id)&&!(worker.resource==='wood'&&removed.has(node.id));}
  function finishWork(worker){
    const node=nodes.get(worker.nodeId);
    if(!nodeAvailable(worker)){goHome(worker);return;}
    if(worker.resource==='wood'){
      if(!node||removed.has(node.id)){goHome(worker);return;}
      removed.add(node.id);regrowth.set(node.id,time+settings.treeRegrowSeconds);markTrees();emit({type:'tree-remove',id:node.id,treeId:node.id,direction:{x:node.x-worker.x,z:node.z-worker.z}});
    }
    worker.carrying=true;emit({type:'gathered',id:`${worker.id}:${worker.trip+1}:gathered`,ownerId:worker.ownerId,cityId:worker.cityId,workerId:worker.id,nodeId:worker.nodeId,
      resource:worker.resource,amount:settings.amount,x:worker.x,y:worker.y,z:worker.z});goHome(worker);
  }
  function trackTree(tree){if(!isHarvestableWood(tree))return false;const id=idOf(tree);sources.set(id,tree);if(removed.has(id)&&!regrowth.has(id)&&!session.shared?.isSceneryRemoved?.(id))regrowth.set(id,time+settings.treeRegrowSeconds);return true;}
  function updateRegrowth(){
    const signature=[...removed].sort().join('|');if(signature!==removedKey){removedKey=signature;for(const id of removed)if(!regrowth.has(id)&&!session.shared?.isSceneryRemoved?.(id))regrowth.set(id,time+settings.treeRegrowSeconds);}
    for(const [id,due]of regrowth){
      if(!removed.has(id)||session.shared?.isSceneryRemoved?.(id)){regrowth.delete(id);continue;}
      if(time<due)continue;
      const tree=sources.get(id);if(!tree){regrowth.set(id,time+10);continue;}
      const blocked=(session.shared?.getActors?.()??[]).some(actor=>distance(actor,tree)<radius(tree)+.3)||buildings.some(item=>distance(item,tree)<radius(item)+radius(tree)+.3)||paths.some(path=>(path.points??[]).slice(1).some((b,i)=>pointSegment(tree,path.points[i],b)<radius(tree)+(path.width??.7)/2+.25))||[...workers.values()].some(worker=>!worker.indoors&&(distance(worker,tree)<1.25||['outbound','returning'].includes(worker.activity)&&routeBlocked(worker,[tree])));
      if(blocked){regrowth.set(id,time+10);continue;}
      removed.delete(id);regrowth.delete(id);markTrees();emit({type:'tree-regrow',id,treeId:id,tree});revision++;
    }
  }
  function update(dt,{night=0,dayPhase}={}){
    if(!Number.isFinite(dt)||dt<=0)return;sync();time+=dt;
    const nextDark=dayPhase?dayPhase==='night':night>(dark?.35:.65);
    if(nextDark!==dark){dark=nextDark;for(const worker of workers.values()){
      if(dark&&['outbound','working'].includes(worker.activity))goHome(worker);
      else if(dark&&worker.activity==='waiting'){worker.activity='indoors';worker.indoors=true;visibilityRevision++;}
      else if(!dark&&worker.indoors){worker.activity='waiting';worker.indoors=false;worker.wait=hash(worker.id)*3;visibilityRevision++;}
    }}
    updateRegrowth();
    if(time>=nextRoute){nextRoute=time+settings.routeInterval;const list=[...workers.values()];for(let i=0;i<list.length;i++){
      const index=(planningCursor+i)%list.length,worker=list[index];if(worker.reroute&&worker.rerouteWait<=0){reroute(worker);planningCursor=(index+1)%list.length;break;}if(!dark&&worker.activity==='waiting'&&worker.wait<=0){choose(worker);planningCursor=(index+1)%list.length;break;}
    }}
    for(const worker of workers.values()){
      worker.idleTime+=dt;worker.moving=false;if(worker.indoors)continue;if(worker.reroute){worker.rerouteWait=Math.max(0,(worker.rerouteWait??0)-dt);continue;}
      if(worker.activity==='waiting'){worker.wait=Math.max(0,worker.wait-dt);continue;}
      if(['working','outbound'].includes(worker.activity)&&!nodeAvailable(worker))goHome(worker);
      if(worker.activity==='working'){worker.wait-=dt;if(worker.wait<=0)finishWork(worker);continue;}
      let remaining=worker.speed*dt;
      while(remaining>1e-7&&worker.routeIndex<worker.route.length){const target=worker.route[worker.routeIndex],span=distance(worker,target),advance=Math.min(span,remaining);
        if(span<1e-7){worker.routeIndex++;continue;}
        worker.heading+=wrap(Math.atan2(target.x-worker.x,target.z-worker.z)-worker.heading)*Math.min(1,dt*10);
        const t=advance/span;worker.x+=(target.x-worker.x)*t;worker.z+=(target.z-worker.z)*t;worker.y=surfaceAt(worker.x,worker.z).height+.015;
        worker.moving=true;worker.distance+=advance;worker.phase+=advance*Math.PI*2/.43;remaining-=advance;if(advance>=span-1e-7)worker.routeIndex++;
      }
      if(worker.routeIndex>=worker.route.length){if(worker.activity==='outbound'){worker.activity='working';worker.wait=settings.workSeconds;const node=nodes.get(worker.nodeId);if(node)worker.heading=Math.atan2((node.lookX??node.x)-worker.x,(node.lookZ??node.z)-worker.z);}else if(worker.activity==='returning')arriveHome(worker);}
    }
  }
  sync();
  return{update,sync,workers,get residents(){return workers;},get nodes(){return [...nodes.values()];},trackTree,get placements(){return placements.filter(item=>!session.shared?.isSceneryRemoved?.(item));},get placementRevision(){return placementRevision;},get revision(){return revision;},get visibilityRevision(){return visibilityRevision;},get elapsed(){return time;},
    get stats(){return{workers:workers.size,residents:workers.size,indoors:[...workers.values()].filter(worker=>worker.indoors).length,production,routeSearches,regrowing:regrowth.size};},
    snapshot(){return [...workers.values()].map(({home,route,...worker})=>({...worker,route:route.map(point=>({...point}))}));},
    drainEvents(){return events.splice(0);},dispose(){workers.clear();nodes.clear();events.length=0;regrowth.clear();claims.clear();sources.clear();routeCache.clear();placements=[];}};
}
