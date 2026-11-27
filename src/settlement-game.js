import {worldSurface} from './world-model.js';
import {surfaceDistance,surfaceDisplacement,surfaceOffset} from './world-surface.js';
import {farmFootprintsOverlap} from './farm-footprints.js';
import {settlementHouseRotation,planSettlementPath,houseBlocksSettlementPath,sampleSettlementPath} from './settlement-paths.js';
import {pendingSettlementMilestones,settlementCivicSites,SETTLEMENT_CIVIC_SEARCH} from './settlement-progression.js';

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
export function createSettlementGame(world,{config=world.gameplay,surfaceAt=(x,z)=>worldSurface(world,x,z)}={}){
  if(!config?.starterHouse||!finitePoint(config.starterHouse))throw new TypeError('Settlement requires a finite starter house');
  const ownerId=config.ownerId??config.starterHouse.ownerId??'teal';
  const starter={...copy(config.starterHouse),kind:'house',ownerId,cityId:'settlement',connected:true};
  const homes=[starter],buildings=[],paths=[],removed=new Set();
  let logs=0,revision=0,nextHouse=2,developmentSearching=false;
  const developmentSearch=new Map();

  function homeComponents(){
    const groups=new Map(homes.map(home=>[home.id,home.id]));
    const root=id=>{while(groups.get(id)!==id)id=groups.get(id);return id;};
    for(const path of paths){
      if(!groups.has(path.fromHouseId)||!groups.has(path.toHouseId))continue;
      const a=root(path.fromHouseId),b=root(path.toHouseId);if(a!==b)groups.set(b,a);
    }
    return new Map(homes.map(home=>[home.id,root(home.id)]));
  }

  function refreshConnections(){
    const components=homeComponents(),city=components.get(starter.id);
    for(const home of homes){home.connected=components.get(home.id)===city;home.cityId=home.connected?'settlement':null;}
  }

  function orientationHomes(point){
    if(!finitePoint(point))return [starter];
    const components=homeComponents(),reached=new Set();
    for(const home of homes)if(surfaceDistance(world,point,home)<=SETTLEMENT.connectionRange)reached.add(components.get(home.id));
    if(!reached.size){
      let nearest=homes[0],distance=Infinity;
      for(const home of homes){const d=surfaceDistance(world,point,home);if(d<distance){distance=d;nearest=home;}}
      reached.add(components.get(nearest.id));
    }
    return homes.filter(home=>reached.has(components.get(home.id)));
  }

  function validateSite(building,{player,placements=[],ready=true,isReadyAt}={}){
    if(!finitePoint(building)||!Number.isFinite(building.rotation))return ['invalid-position','Choose a place for your house'];
    if(!ready)return ['loading','Preparing this patch of ground'];
    if(player&&(!finitePoint(player)||circleTouchesHouse(world,building,player,SETTLEMENT.playerRadius,.12)))return ['player-blocked','Step away from the blueprint'];
    for(const home of [...homes,...buildings])if(overlaps(world,building,home))return ['house-blocked','Leave a little room between buildings'];
    for(const path of paths)if(houseBlocksSettlementPath(world,building,path))return ['path-blocked','Keep the village paths clear'];
    for(const item of placements){
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

  function evaluateBuild(pose,{player,placements=[],ready=true,enforceReach=true,isReadyAt}={}){
    const house=houseFootprint({kind:'house',x:pose?.x,z:pose?.z,rotation:finitePoint(pose)?settlementHouseRotation(world,pose,orientationHomes(pose)):0,
      scale:1,ownerId,variant:nextHouse%4});
    let connectionHouseId=null,distanceToCity=Infinity;
    if(finitePoint(house))for(const home of homes)if(home.connected){
      const distance=surfaceDistance(world,house,home);
      if(distance<distanceToCity){distanceToCity=distance;connectionHouseId=home.id;}
    }
    const connected=distanceToCity<=SETTLEMENT.connectionRange;
    const base={house,cost:SETTLEMENT.houseCost,affordable:logs>=SETTLEMENT.houseCost,
      connected,connectionHouseId:connected?connectionHouseId:null,distanceToCity,path:null,paths:[]};
    const invalid=(code,reason)=>({...base,valid:false,siteValid:false,code,reason});
    if(!finitePoint(house)||!Number.isFinite(house.rotation))return invalid('invalid-position','Choose a place for your house');
    if(!ready)return invalid('loading','Preparing this patch of ground');
    if(player&&(!finitePoint(player)||enforceReach&&surfaceDistance(world,player,house)>SETTLEMENT.buildReach))return invalid('out-of-reach','Move closer to build here');
    const siteError=validateSite(house,{player,placements,ready,isReadyAt});
    if(siteError)return invalid(...siteError);
    // One lane to each nearby component connects the town without adding a
    // triangle of redundant lanes every time a new neighbour is built.
    const components=homeComponents(),nearby=new Map();
    for(const home of homes){
      const distance=surfaceDistance(world,house,home);if(distance>SETTLEMENT.connectionRange)continue;
      const group=components.get(home.id);if(!nearby.has(group))nearby.set(group,[]);
      nearby.get(group).push({home,distance});
    }
    const groups=[...nearby.values()].sort((a,b)=>Number(b[0].home.connected)-Number(a[0].home.connected));
    for(const group of groups){
      group.sort((a,b)=>a.distance-b.distance);
      let planned=null;
      for(const {home} of group){
        planned=planSettlementPath(world,house,home,{placements:[...homes,...buildings,...placements],surfaceAt,removedTreeIds:removed});
        if(planned)break;
      }
      if(!planned)return invalid('path-blocked','Leave a clear route to the neighbouring houses');
      if(isReadyAt&&!sampleSettlementPath(planned.points,isReadyAt))return invalid('loading','Preparing the village path');
      base.paths.push(planned);
    }
    base.path=base.paths[0]??null;
    if(!base.affordable)return {...base,valid:false,siteValid:true,code:'not-enough-logs',reason:`Collect ${SETTLEMENT.houseCost-logs} more ${SETTLEMENT.houseCost-logs===1?'log':'logs'}`};
    return {...base,valid:true,siteValid:true,code:'ready',reason:connected?'Joins your settlement':'Starts a new outpost'};
  }

  function build(pose,context){
    const evaluation=evaluateBuild(pose,context);
    if(!evaluation.valid)return {ok:false,...evaluation};
    const house={...evaluation.house,id:`home-${nextHouse++}`,connected:evaluation.connected,
      cityId:evaluation.connected?'settlement':null};
    delete house.width;delete house.depth;
    homes.push(house);
    const builtPaths=evaluation.paths.map(path=>({...path,id:`path:${house.id}:${path.toHouseId}`,fromHouseId:house.id}));
    paths.push(...builtPaths);logs-=SETTLEMENT.houseCost;refreshConnections();revision++;
    const developed=develop(context);
    return {ok:true,house:copy(house),paths:copy(builtPaths),addedBuildings:developed.buildings,addedPaths:developed.paths,developmentSearching:developed.searching,cost:SETTLEMENT.houseCost,connected:house.connected,totalLogs:logs};
  }

  /** Unlocks remain pending when every safe site is occupied or unloaded. A
   * later tree clearing/streaming update can retry without charging timber. */
  function develop(context={}){
    const addedBuildings=[],addedPaths=[],cityHomes=homes.filter(home=>home.connected);
    const pending=pendingSettlementMilestones(homes,buildings),layoutKey=`${cityHomes.map(home=>home.id).join(':')}:${removed.size}`;
    const player=finitePoint(context.player)?context.player:null;
    const playerMoved=search=>Boolean(search.playerAnchor)!==Boolean(player)
      ||player&&surfaceDistance(world,search.playerAnchor,player)>1;
    let budget=SETTLEMENT_CIVIC_SEARCH.routeBudget;developmentSearching=false;
    if(context.ready!==false)for(const spec of pending){
      let search=developmentSearch.get(spec.type);
      if(!search||search.layoutKey!==layoutKey||search.placements!==context.placements||search.isReadyAt!==context.isReadyAt||search.complete&&playerMoved(search)){
        search={layoutKey,placements:context.placements,isReadyAt:context.isReadyAt,
          playerAnchor:player?{x:player.x,z:player.z}:null,offset:0,complete:false};developmentSearch.set(spec.type,search);
      }
      if(search.complete)continue;
      const sites=settlementCivicSites(world,cityHomes);let chosen=null,connection=null;
      for(let index=search.offset;index<sites.length;index++){
        const point=sites[index],candidate=houseFootprint({id:`civic-${spec.type}`,kind:'civic',buildingType:spec.type,
          x:point.x,z:point.z,rotation:settlementHouseRotation(world,point,cityHomes),scale:1,ownerId,connected:true,cityId:'settlement',...spec});
        const nearby=cityHomes.map(home=>({home,distance:surfaceDistance(world,candidate,home)}))
          .filter(item=>item.distance<=SETTLEMENT.connectionRange).sort((a,b)=>a.distance-b.distance);
        if(!nearby.length||validateSite(candidate,context)){search.offset=index+1;continue;}
        if(!budget){search.offset=index;developmentSearching=true;break;}
        budget--;search.offset=index+1;
        const path=planSettlementPath(world,candidate,nearby[0].home,{placements:[...homes,...buildings,...context.placements??[]],
          surfaceAt,removedTreeIds:removed,maxNodes:SETTLEMENT_CIVIC_SEARCH.maxRouteNodes});
        if(path&&(!context.isReadyAt||sampleSettlementPath(path.points,context.isReadyAt))){chosen=candidate;connection=path;break;}
      }
      if(chosen){
        buildings.push(chosen);paths.push(connection);addedBuildings.push(chosen);addedPaths.push(connection);search.complete=true;
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
      pendingMilestones:pendingSettlementMilestones(homes,buildings).map(spec=>spec.type)};
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

  return {
    get logs(){return logs;},get developmentSearching(){return developmentSearching;},get revision(){return revision;},get ownerId(){return ownerId;},
    get houses(){return copy(homes);},get buildings(){return copy(buildings);},
    get pendingMilestones(){return pendingSettlementMilestones(homes,buildings).map(spec=>spec.type);},get paths(){return copy(paths);},get removedTreeIds(){return new Set(removed);},
    isTreeRemoved(tree){return removed.has(typeof tree==='string'?tree:settlementTreeId(tree));},
    snapshot(){return {logs,revision,ownerId,developmentSearching,houses:copy(homes),buildings:copy(buildings),pendingMilestones:pendingSettlementMilestones(homes,buildings).map(spec=>spec.type),paths:copy(paths),removedTreeIds:[...removed]};},
    evaluateBuild,build,chop,develop,
  };
}
