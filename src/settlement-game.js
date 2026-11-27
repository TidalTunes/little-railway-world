import {worldSurface} from './world-model.js';
import {surfaceDistance,surfaceDisplacement,surfaceOffset} from './world-surface.js';
import {farmFootprintsOverlap} from './farm-footprints.js';
import {settlementHouseRotation,settlementCenterFacing,planSettlementPath,houseBlocksSettlementPath,sampleSettlementPath} from './settlement-paths.js';
import {pendingSettlementMilestones,settlementCenter,settlementCityLevel,settlementCivicSites,SETTLEMENT_CIVIC_SEARCH} from './settlement-progression.js';

export const SETTLEMENT=Object.freeze({houseCost:10,houseWidth:2.2,houseDepth:2.2,
  connectionRange:9,buildReach:7,chopReach:1.1,clearance:.22,maxHeightDifference:.14,
  playerRadius:.17,terrainSampleSpacing:.36});

const BLOCKING_KINDS=new Set(['house','tree','rock','farm','cactus','landmark','station','apartment','civic','tower']);
const copy=value=>structuredClone(value);
const finitePoint=point=>Number.isFinite(point?.x)&&Number.isFinite(point?.z);

function hash(value){
  let result=2166136261;
  for(const letter of String(value)){result^=letter.charCodeAt(0);result=Math.imul(result,16777619);}
  return result>>>0;
}

/** Generated placement IDs remain stable through chunk unload/reload. The
 * coordinate fallback also supports small authored test worlds without IDs. */
export function settlementTreeId(tree){
  return tree?.id!=null?String(tree.id):`tree:${tree?.x}:${tree?.z}:${tree?.variant??0}`;
}

export function treeLogYield(seed,tree){return 2+hash(`${seed}:${settlementTreeId(tree)}:logs`)%3;}

function houseFootprint(pose){
  const width=pose.width??SETTLEMENT.houseWidth,depth=pose.depth??SETTLEMENT.houseDepth;
  return {...pose,width,depth,radius:Math.hypot(width,depth)/2};
}

function circleTouchesHouse(world,house,point,radius,gap=SETTLEMENT.clearance){
  const delta=surfaceDisplacement(world,house,point),a=house.rotation??0,c=Math.cos(a),s=Math.sin(a);
  const x=delta.x*c-delta.z*s,z=delta.x*s+delta.z*c;
  const dx=Math.max(0,Math.abs(x)-(house.width??SETTLEMENT.houseWidth)/2),dz=Math.max(0,Math.abs(z)-(house.depth??SETTLEMENT.houseDepth)/2);
  return dx*dx+dz*dz<(radius+gap)**2;
}

function overlaps(world,house,item){
  const scale=item.scale??1;
  if(item.kind==='house'||item.kind==='civic'&&item.width&&item.depth)return farmFootprintsOverlap(world,houseFootprint(house),houseFootprint(item),SETTLEMENT.clearance);
  if(item.kind==='farm'&&item.width&&item.depth)return farmFootprintsOverlap(world,houseFootprint(house),item,SETTLEMENT.clearance);
  const radius=item.radius??({tree:.85,rock:.6,cactus:.7,landmark:2,station:3.42,apartment:2.05,civic:2.8,tower:2.1}[item.kind]??1)*scale;
  return circleTouchesHouse(world,house,item,radius);
}

/** Renderer-independent, session-local game rules. Rendering may animate a
 * fallen tree for a moment after chop(), but its reward can only be claimed
 * once and its collision reservation is immediately released. */
export function createSettlementGame(world,{config=world.gameplay,surfaceAt=(x,z)=>worldSurface(world,x,z),shared}={}){
  if(!config?.starterHouse||!finitePoint(config.starterHouse))throw new TypeError('Settlement requires a finite starter house');
  const ownerId=config.ownerId??config.starterHouse.ownerId??'teal';
  const starter={...copy(config.starterHouse),kind:'house',ownerId,cityId:null,connected:false};
  const homes=[starter],buildings=[],paths=[],links=[],removed=shared?.removedTreeIds??new Set();
  const foreignBuildings=()=>shared?.getBuildings?.()??[];
  const foreignPaths=()=>shared?.getPaths?.()??[];
  const sceneryRemoved=item=>shared?.isSceneryRemoved?.(item)??false;
  const availableScenery=items=>(items??[]).filter(item=>!sceneryRemoved(item));
  // Neutral villages are permanent world occupancy, not player-owned homes.
  // Keep them out of component growth and income even when towns touch, and
  // retain their reservations while their scenery chunk is off screen.
  const villages=copy(config.farmVillages??{});
  const villageBuildings=[...villages.houses??[],...villages.buildings??[]],villagePaths=villages.paths??[];
  let cities=[],clusters=[];
  let logs=0,gold=0,lastIncomeDay=0,revision=0,nextHouse=2,developmentSearching=false;
  const developmentSearch=new Map();

  function homeComponents(items=homes,edges=links){
    const groups=new Map(items.map(home=>[home.id,home.id])),order=new Map(items.map((home,index)=>[home.id,index]));
    const root=id=>{while(groups.get(id)!==id)id=groups.get(id);return id;};
    for(const edge of edges){
      if(!groups.has(edge.fromHouseId)||!groups.has(edge.toHouseId))continue;
      const a=root(edge.fromHouseId),b=root(edge.toHouseId);
      if(a!==b)groups.set(order.get(a)<order.get(b)?b:a,order.get(a)<order.get(b)?a:b);
    }
    return new Map(items.map(home=>[home.id,root(home.id)]));
  }

  const cityIdFor=anchor=>`city:${anchor}`;
  function refreshConnections(){
    const components=homeComponents(),groups=new Map();
    for(const home of homes){const root=components.get(home.id);if(!groups.has(root))groups.set(root,[]);groups.get(root).push(home);}
    const previous=new Map(homes.map(home=>[home.id,home.cityId]));
    cities=[];clusters=[];
    for(const [anchor,cluster] of groups){
      const cityId=cluster.length>=3?cityIdFor(anchor):null;
      for(const home of cluster){home.connected=Boolean(cityId);home.cityId=cityId;}
      const center=settlementCenter(world,cluster),record={id:cityIdFor(anchor),...center,ownerId,level:settlementCityLevel(cluster.length),houseCount:cluster.length,houseIds:cluster.map(home=>home.id)};
      clusters.push(record);
      if(!cityId)continue;
      const oldIds=new Set(cluster.map(home=>previous.get(home.id)).filter(Boolean));
      for(const building of buildings)if(oldIds.has(building.cityId))building.cityId=cityId;
      cities.push(record);
    }
    const byId=new Map([...homes,...buildings].map(item=>[item.id,item]));
    for(const path of paths)path.cityId=byId.get(path.fromHouseId)?.cityId??byId.get(path.toHouseId)?.cityId??null;
  }

  function orientationHomes(point){
    if(!finitePoint(point))return [];
    const components=homeComponents(),reached=new Set();
    for(const home of homes)if(surfaceDistance(world,point,home)<=SETTLEMENT.connectionRange)reached.add(components.get(home.id));
    // A distant outpost has no imaginary relationship with a far-away town.
    return homes.filter(home=>reached.has(components.get(home.id)));
  }

  function pendingDevelopments(){
    return cities.flatMap(city=>pendingSettlementMilestones(homes.filter(home=>home.cityId===city.id),buildings.filter(building=>building.cityId===city.id))
      .map(spec=>({...spec,cityId:city.id})));
  }
  const pendingTypes=()=>[...new Set(pendingDevelopments().map(spec=>spec.type))];

  function validateSite(building,{player,placements=[],ready=true,isReadyAt}={}){
    if(!finitePoint(building)||!Number.isFinite(building.rotation))return ['invalid-position','Choose a place for your house'];
    if(!ready)return ['loading','Preparing this patch of ground'];
    if(player&&(!finitePoint(player)||circleTouchesHouse(world,building,player,SETTLEMENT.playerRadius,.12)))return ['player-blocked','Step away from the blueprint'];
    for(const actor of shared?.getActors?.()??[])if(finitePoint(actor)&&circleTouchesHouse(world,building,actor,SETTLEMENT.playerRadius,.12))return ['player-blocked','Leave room for the travellers'];
    for(const home of [...homes,...buildings,...villageBuildings,...foreignBuildings()])if(overlaps(world,building,home))return ['house-blocked','Leave a little room between buildings'];
    for(const path of [...paths,...villagePaths,...foreignPaths()])if(houseBlocksSettlementPath(world,building,path))return ['path-blocked','Keep the village paths clear'];
    for(const item of placements){
      if(sceneryRemoved(item))continue;
      if(!(BLOCKING_KINDS.has(item.kind)||item.kind==='nature'&&item.style==='outcrop')||!finitePoint(item)||homes.some(home=>home.id===item.id)||buildings.some(home=>home.id===item.id))continue;
      if(item.kind==='tree'&&removed.has(settlementTreeId(item)))continue;
      if(overlaps(world,building,item))return [item.kind==='tree'?'tree-blocked':'scenery-blocked',item.kind==='tree'?'Chop this tree to clear the ground':'This spot is already occupied'];
    }
    const c=Math.cos(building.rotation),s=Math.sin(building.rotation),width=building.width??SETTLEMENT.houseWidth,depth=building.depth??SETTLEMENT.houseDepth;
    let minHeight=Infinity,maxHeight=-Infinity;
    const nx=Math.ceil(width/SETTLEMENT.terrainSampleSpacing),nz=Math.ceil(depth/SETTLEMENT.terrainSampleSpacing);
    for(let ix=0;ix<=nx;ix++)for(let iz=0;iz<=nz;iz++){
      const x=width*(ix/nx-.5),z=depth*(iz/nz-.5),point=surfaceOffset(world,building.x,building.z,x*c+z*s,z*c-x*s);
      if(isReadyAt&&!isReadyAt(point))return ['loading','Preparing this patch of ground'];
      const ground=surfaceAt(point.x,point.z);
      if(!ground||!Number.isFinite(ground.height)||!['ground','mountain'].includes(ground.type))return ['wet-ground','Choose dry ground away from the shore'];
      minHeight=Math.min(minHeight,ground.height);maxHeight=Math.max(maxHeight,ground.height);
    }
    // Low foundations embed into gentle slopes instead of hovering downhill.
    building.y=minHeight;
    if(maxHeight-minHeight>SETTLEMENT.maxHeightDifference)return ['steep-ground','Find a flatter patch of ground'];
    return null;
  }

  function evaluateBuild(pose,{player,heading=0,placements=[],ready=true,enforceReach=true,isReadyAt}={}){
    const neighbours=orientationHomes(pose);
    const house=houseFootprint({id:`${config.idPrefix??''}home-${nextHouse}`,kind:'house',x:pose?.x,z:pose?.z,
      rotation:finitePoint(pose)?settlementHouseRotation(world,pose,neighbours,{heading,seed:world.seed,placement:nextHouse}):0,
      scale:1,ownerId,variant:nextHouse%4});
    let connectionHouseId=null,distanceToCity=Infinity;
    for(const home of neighbours){const distance=surfaceDistance(world,house,home);if(distance<distanceToCity){distanceToCity=distance;connectionHouseId=home.id;}}
    const cityHouseCount=neighbours.length+1,connected=cityHouseCount>=3;
    const cityId=connected?cityIdFor(neighbours[0].id):null;
    house.cityId=cityId;house.connected=connected;
    const base={house,cost:SETTLEMENT.houseCost,affordable:logs>=SETTLEMENT.houseCost,
      connected,cityId,cityHouseCount,cityLevel:settlementCityLevel(cityHouseCount),connectionHouseId,distanceToCity,path:null,paths:[],links:[]};
    const invalid=(code,reason)=>({...base,valid:false,siteValid:false,code,reason});
    if(!finitePoint(house)||!Number.isFinite(house.rotation))return invalid('invalid-position','Choose a place for your house');
    if(!ready)return invalid('loading','Preparing this patch of ground');
    if(player&&(!finitePoint(player)||enforceReach&&surfaceDistance(world,player,house)>SETTLEMENT.buildReach))return invalid('out-of-reach','Move closer to build here');
    const siteError=validateSite(house,{player,placements,ready,isReadyAt});
    if(siteError)return invalid(...siteError);
    // Logical neighbour links survive before city formation. They reserve no
    // visible road; on the third home every dormant route is planned again
    // against the complete current layout, including the new foundation.
    const components=homeComponents(),nearby=new Map(),obstacles=[...homes,...buildings,...villageBuildings,...foreignBuildings(),house,...availableScenery(placements)];
    const route=(from,to)=>planSettlementPath(world,from,to,{placements:obstacles,surfaceAt,removedTreeIds:removed});
    for(const home of homes){
      const distance=surfaceDistance(world,house,home);if(distance>SETTLEMENT.connectionRange)continue;
      const group=components.get(home.id);if(!nearby.has(group))nearby.set(group,[]);nearby.get(group).push({home,distance});
    }
    for(const group of nearby.values()){
      group.sort((a,b)=>a.distance-b.distance);let planned=null;
      for(const {home} of group){planned=route(house,home);if(planned)break;}
      if(!planned)return invalid('path-blocked','Leave a clear route to the neighbouring houses');
      if(isReadyAt&&!sampleSettlementPath(planned.points,isReadyAt))return invalid('loading','Preparing the village path');
      base.links.push(planned);
      if(connected)base.paths.push({...planned,cityId});
    }
    if(connected){
      const reached=new Set(neighbours.map(home=>home.id)),visible=new Set(paths.map(path=>path.id)),byId=new Map(homes.map(home=>[home.id,home]));
      for(const link of links){
        if(visible.has(link.id)||!reached.has(link.fromHouseId))continue;
        const planned=route(byId.get(link.fromHouseId),byId.get(link.toHouseId));
        if(!planned)return invalid('path-blocked','Leave room for the new city paths');
        if(isReadyAt&&!sampleSettlementPath(planned.points,isReadyAt))return invalid('loading','Preparing the village path');
        base.paths.push({...planned,cityId});
      }
    }
    base.path=base.paths[0]??null;
    if(!base.affordable)return {...base,valid:false,siteValid:true,code:'not-enough-logs',reason:`Collect ${SETTLEMENT.houseCost-logs} more ${SETTLEMENT.houseCost-logs===1?'log':'logs'}`};
    return {...base,valid:true,siteValid:true,code:'ready',reason:connected?'Joins your city':neighbours.length?'Grows your settlement':'Starts a new outpost'};
  }

  function build(pose,context){
    const evaluation=evaluateBuild(pose,context);
    if(!evaluation.valid)return {ok:false,...evaluation};
    const house={...evaluation.house};nextHouse++;
    delete house.width;delete house.depth;
    homes.push(house);links.push(...evaluation.links);
    paths.push(...evaluation.paths);logs-=SETTLEMENT.houseCost;refreshConnections();revision++;
    const developed=develop(context);
    return {ok:true,house:copy(house),paths:copy(evaluation.paths),addedBuildings:developed.buildings,addedPaths:developed.paths,
      developmentSearching:developed.searching,cost:SETTLEMENT.houseCost,connected:house.connected,cityId:house.cityId,
      cityHouseCount:evaluation.cityHouseCount,cityLevel:evaluation.cityLevel,totalLogs:logs};
  }

  /** Unlocks remain pending when every safe site is occupied or unloaded. A
   * later tree clearing/streaming update can retry without charging timber. */
  function develop(context={}){
    const addedBuildings=[],addedPaths=[],pending=pendingDevelopments();
    const player=finitePoint(context.player)?context.player:null;
    const playerMoved=search=>Boolean(search.playerAnchor)!==Boolean(player)
      ||player&&surfaceDistance(world,search.playerAnchor,player)>1;
    let budget=SETTLEMENT_CIVIC_SEARCH.routeBudget,candidateBudget=SETTLEMENT_CIVIC_SEARCH.candidateBudget;developmentSearching=false;
    if(context.ready!==false)for(const spec of pending){
      const cityHomes=homes.filter(home=>home.cityId===spec.cityId),key=`${spec.cityId}:${spec.type}`,layoutKey=`${cityHomes.map(home=>home.id).join(':')}:${removed.size}:${shared?.getSceneryRevision?.()??0}`;
      let search=developmentSearch.get(key);
      if(!search||search.layoutKey!==layoutKey||search.placements!==context.placements||search.isReadyAt!==context.isReadyAt||search.complete&&playerMoved(search)){
        search={layoutKey,placements:context.placements,isReadyAt:context.isReadyAt,
          playerAnchor:player?{x:player.x,z:player.z}:null,offset:0,complete:false};developmentSearch.set(key,search);
      }
      if(search.complete)continue;
      const sites=settlementCivicSites(world,cityHomes);let chosen=null,connection=null;
      for(let index=search.offset;index<sites.length;index++){
        if(!budget||!candidateBudget){search.offset=index;developmentSearching=true;break;}
        candidateBudget--;
        const point=sites[index],candidate=houseFootprint({id:`civic:${spec.cityId}:${spec.type}`,kind:'civic',buildingType:spec.type,
          x:point.x,z:point.z,rotation:settlementCenterFacing(world,point,cityHomes),scale:1,ownerId,connected:true,...spec});
        const nearby=cityHomes.map(home=>({home,distance:surfaceDistance(world,candidate,home)}))
          .filter(item=>item.distance<=SETTLEMENT.connectionRange).sort((a,b)=>a.distance-b.distance);
        if(!nearby.length||validateSite(candidate,context)){search.offset=index+1;continue;}
        budget--;search.offset=index+1;
        const path=planSettlementPath(world,candidate,nearby[0].home,{placements:[...homes,...buildings,...villageBuildings,...foreignBuildings(),...availableScenery(context.placements)],
          surfaceAt,removedTreeIds:removed,maxNodes:SETTLEMENT_CIVIC_SEARCH.maxRouteNodes});
        if(path&&(!context.isReadyAt||sampleSettlementPath(path.points,context.isReadyAt))){chosen=candidate;connection=path;break;}
      }
      if(chosen){
        connection.cityId=spec.cityId;buildings.push(chosen);paths.push(connection);addedBuildings.push(chosen);addedPaths.push(connection);search.complete=true;
      }else if(search.offset>=sites.length){
        search.complete=true;
        // Keep the cursor while walking, but revisit earlier sites after a
        // complete pass if the traveller has since freed meaningful space.
        if(playerMoved(search))developmentSearching=true;
      }
      else developmentSearching=true;
    }
    if(addedBuildings.length)revision++;
    return {buildings:copy(addedBuildings),paths:copy(addedPaths),searching:developmentSearching,
      pendingMilestones:pendingTypes(),pendingDevelopments:copy(pendingDevelopments())};
  }

  function chop(tree,{player}={}){
    if(tree?.kind!=='tree'||!finitePoint(tree))return {ok:false,code:'not-a-tree'};
    const treeId=settlementTreeId(tree);
    if(removed.has(treeId))return {ok:false,code:'already-chopped'};
    if(player&&(!finitePoint(player)||surfaceDistance(world,player,tree)>SETTLEMENT.chopReach))return {ok:false,code:'out-of-reach'};
    const gained=treeLogYield(world.seed,tree);
    removed.add(treeId);logs+=gained;revision++;
    return {ok:true,treeId,logs:gained,totalLogs:logs};
  }

  /** Residents never enter this calculation. Only owned homes belonging to a
   * formed city earn income. Repeated frames or view changes cannot pay twice. */
  function settleIncome(completedDays){
    if(!Number.isSafeInteger(completedDays)||completedDays<=lastIncomeDay)return null;
    const days=completedDays-lastIncomeDay;
    const eligible=homes.filter(home=>home.ownerId===ownerId&&home.connected&&home.cityId!=null);
    lastIncomeDay=completedDays;
    const amount=eligible.length*days;gold+=amount;revision++;
    return {id:`income:${completedDays}`,day:completedDays,days,amount,totalGold:gold,houses:copy(eligible)};
  }

  // Other construction systems use the same authoritative wallet. Failed
  // plans never debit it, and repeated commands cannot overspend the account.
  function spendGold(amount){
    if(!Number.isSafeInteger(amount)||amount<=0)return {ok:false,code:'invalid-cost'};
    if(gold<amount)return {ok:false,code:'not-enough-gold',cost:amount,totalGold:gold};
    gold-=amount;revision++;return {ok:true,cost:amount,totalGold:gold};
  }

  refreshConnections();
  return {
    get logs(){return logs;},get gold(){return gold;},get developmentSearching(){return developmentSearching;},get revision(){return revision;},get ownerId(){return ownerId;},
    get houses(){return copy(homes);},get buildings(){return copy(buildings);},get cities(){return copy(cities);},get clusters(){return copy(clusters);},
    get pendingMilestones(){return pendingTypes();},get pendingDevelopments(){return copy(pendingDevelopments());},get paths(){return copy(paths);},get removedTreeIds(){return new Set(removed);},
    isTreeRemoved(tree){return removed.has(typeof tree==='string'?tree:settlementTreeId(tree));},
    snapshot(){return {logs,gold,lastIncomeDay,revision,ownerId,developmentSearching,houses:copy(homes),buildings:copy(buildings),cities:copy(cities),clusters:copy(clusters),pendingMilestones:pendingTypes(),pendingDevelopments:copy(pendingDevelopments()),paths:copy(paths),removedTreeIds:[...removed]};},
    evaluateBuild,build,chop,develop,settleIncome,spendGold,
  };
}
