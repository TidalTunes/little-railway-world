import {worldSurface} from './world-model.js';
import {surfaceDistance,surfaceDisplacement,surfaceOffset} from './world-surface.js';
import {farmFootprintsOverlap} from './farm-footprints.js';

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
  return {...pose,width:SETTLEMENT.houseWidth,depth:SETTLEMENT.houseDepth,
    radius:Math.hypot(SETTLEMENT.houseWidth,SETTLEMENT.houseDepth)/2};
}

function circleTouchesHouse(world,house,point,radius,gap=SETTLEMENT.clearance){
  const delta=surfaceDisplacement(world,house,point),a=house.rotation??0,c=Math.cos(a),s=Math.sin(a);
  const x=delta.x*c-delta.z*s,z=delta.x*s+delta.z*c;
  const dx=Math.max(0,Math.abs(x)-SETTLEMENT.houseWidth/2),dz=Math.max(0,Math.abs(z)-SETTLEMENT.houseDepth/2);
  return dx*dx+dz*dz<(radius+gap)**2;
}

function overlaps(world,house,item){
  const scale=item.scale??1;
  if(item.kind==='house')return farmFootprintsOverlap(world,houseFootprint(house),houseFootprint(item),SETTLEMENT.clearance);
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
  const homes=[starter],removed=new Set();
  let logs=0,revision=0,nextHouse=2;

  function connectedHomes(){
    const connected=new Set([starter.id]);let changed=true;
    while(changed){
      changed=false;
      for(const home of homes)if(!connected.has(home.id)&&homes.some(other=>connected.has(other.id)&&surfaceDistance(world,home,other)<=SETTLEMENT.connectionRange)){
        connected.add(home.id);changed=true;
      }
    }
    return connected;
  }

  function refreshConnections(){
    const connected=connectedHomes();
    for(const home of homes){home.connected=connected.has(home.id);home.cityId=home.connected?'settlement':null;}
  }

  function evaluateBuild(pose,{player,placements=[],ready=true,enforceReach=true}={}){
    const house=houseFootprint({kind:'house',x:pose?.x,z:pose?.z,rotation:pose?.rotation??0,
      scale:1,ownerId,variant:nextHouse%4});
    let connectionHouseId=null,distanceToCity=Infinity;
    if(finitePoint(house))for(const home of homes)if(home.connected){
      const distance=surfaceDistance(world,house,home);
      if(distance<distanceToCity){distanceToCity=distance;connectionHouseId=home.id;}
    }
    const connected=distanceToCity<=SETTLEMENT.connectionRange;
    const base={house,cost:SETTLEMENT.houseCost,affordable:logs>=SETTLEMENT.houseCost,
      connected,connectionHouseId:connected?connectionHouseId:null,distanceToCity};
    const invalid=(code,reason)=>({...base,valid:false,siteValid:false,code,reason});
    if(!finitePoint(house)||!Number.isFinite(house.rotation))return invalid('invalid-position','Choose a place for your house');
    if(!ready)return invalid('loading','Preparing this patch of ground');
    if(player&&(!finitePoint(player)||enforceReach&&surfaceDistance(world,player,house)>SETTLEMENT.buildReach))return invalid('out-of-reach','Move closer to build here');
    const c=Math.cos(house.rotation),s=Math.sin(house.rotation);
    let minHeight=Infinity,maxHeight=-Infinity;
    const nx=Math.ceil(SETTLEMENT.houseWidth/SETTLEMENT.terrainSampleSpacing),nz=Math.ceil(SETTLEMENT.houseDepth/SETTLEMENT.terrainSampleSpacing);
    for(let ix=0;ix<=nx;ix++)for(let iz=0;iz<=nz;iz++){
      const x=SETTLEMENT.houseWidth*(ix/nx-.5),z=SETTLEMENT.houseDepth*(iz/nz-.5);
      const point=surfaceOffset(world,house.x,house.z,x*c+z*s,z*c-x*s);
      const ground=surfaceAt(point.x,point.z);
      if(!ground||!Number.isFinite(ground.height)||!['ground','mountain'].includes(ground.type))return invalid('wet-ground','Choose dry ground away from the shore');
      minHeight=Math.min(minHeight,ground.height);maxHeight=Math.max(maxHeight,ground.height);
    }
    // Embed the .14-high foundation into accepted gentle slopes, rather than
    // suspending its downhill edge above the terrain.
    house.y=minHeight;
    if(maxHeight-minHeight>SETTLEMENT.maxHeightDifference)return invalid('steep-ground','Find a flatter patch of ground');
    if(player&&circleTouchesHouse(world,house,player,SETTLEMENT.playerRadius,.12))return invalid('player-blocked','Step away from the blueprint');
    for(const home of homes)if(overlaps(world,house,home))return invalid('house-blocked','Leave a little room between houses');
    for(const item of placements){
      if(!(BLOCKING_KINDS.has(item.kind)||item.kind==='nature'&&item.style==='outcrop')||!finitePoint(item)||homes.some(home=>home.id===item.id))continue;
      if(item.kind==='tree'&&removed.has(settlementTreeId(item)))continue;
      if(overlaps(world,house,item))return invalid(item.kind==='tree'?'tree-blocked':'scenery-blocked',item.kind==='tree'?'Chop this tree to clear the ground':'This spot is already occupied');
    }
    if(!base.affordable)return {...base,valid:false,siteValid:true,code:'not-enough-logs',reason:`Collect ${SETTLEMENT.houseCost-logs} more ${SETTLEMENT.houseCost-logs===1?'log':'logs'}`};
    return {...base,valid:true,siteValid:true,code:'ready',reason:connected?'Joins your settlement':'Starts a new outpost'};
  }

  function build(pose,context){
    const evaluation=evaluateBuild(pose,context);
    if(!evaluation.valid)return {ok:false,...evaluation};
    const house={...evaluation.house,id:`home-${nextHouse++}`,connected:evaluation.connected,
      cityId:evaluation.connected?'settlement':null};
    delete house.width;delete house.depth;
    homes.push(house);logs-=SETTLEMENT.houseCost;refreshConnections();revision++;
    return {ok:true,house:copy(house),cost:SETTLEMENT.houseCost,connected:house.connected,totalLogs:logs};
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
    get logs(){return logs;},get revision(){return revision;},get ownerId(){return ownerId;},
    get houses(){return copy(homes);},get removedTreeIds(){return new Set(removed);},
    isTreeRemoved(tree){return removed.has(typeof tree==='string'?tree:settlementTreeId(tree));},
    snapshot(){return {logs,revision,ownerId,houses:copy(homes),removedTreeIds:[...removed]};},
    evaluateBuild,build,chop,
  };
}
