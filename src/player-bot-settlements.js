import {Vector3} from 'three';
import {createPlayerBot} from './player-bots.js';
import {createPlayerBotArt} from './player-bot-art.js';
import {createSettlementArt} from './settlement-art.js';
import {createSettlementResidents} from './settlement-residents.js';
import {createCityLevelMarkers} from './city-level-markers.js';
import {surfacePoint} from './world-surface.js';
import {isHarvestableWood} from './harvestable-wood.js';
import {settlementTreeId} from './settlement-game.js';

export const BOT_SCHEDULING=Object.freeze({perFrame:8,localRadius:54,cellSize:64});
const layoutKey=snapshot=>[...snapshot.houses,...snapshot.buildings].map(item=>`${item.id}:${item.ownerId}:${item.cityId}:${item.x}:${item.y}:${item.z}:${item.rotation}:${item.scale}`).join('|')+';'+snapshot.paths.map(path=>`${path.id}:${path.cityId}:${path.points.map(point=>`${point.x},${point.y},${point.z}`).join('/')}`).join('|');

/** CPU settlers use nearby scenery and a fair, bounded update queue in large
 * matches. Decorative travellers are omitted when military avatars own them. */
export function createPlayerBotSettlements({world,session,parent,mapParent,markerParent,markerMapParent,detail,reducedMotion,getExtraPlacements=()=>[],getExtraRevision=()=>0}){
  const match=!!world.gameplay.match,loops=world.gameplay.economy==='loops',village=world.gameplay.farmVillages;
  const permanent=[...world.gameplay.botScenery??[],...village?.houses??[],...village?.buildings??[]],point=new Vector3();
  let sceneryRevision=-1,meshRevision=-1,meshes=[],cursor=0,disposed=false,lastIncomeDay=-1;
  const spatialRevision=()=>`${session.spatialRevision??session.revision}:${getExtraRevision()}`;
  const indexOf=items=>{const index=new Map();for(const item of items){surfacePoint(world,item.x,0,item.z,point);const key=`${Math.floor(point.x/64)}:${Math.floor(point.y/64)}:${Math.floor(point.z/64)}`;if(!index.has(key))index.set(key,[]);index.get(key).push(item);}return index;};
  const permanentIndex=match?indexOf(permanent):null,localScenery=new Map();let dynamicIndex=null,scenery=[],localRevision=0;
  function refreshScenery(){
    const next=spatialRevision();
    if(sceneryRevision!==next){
      scenery=[...session.buildings,...getExtraPlacements()];
      if(match)dynamicIndex=indexOf(scenery);else scenery=[...permanent.filter(item=>!session.shared.isSceneryRemoved?.(item)),...scenery];
      sceneryRevision=next;
    }
  }
  function localSnapshot(anchor){
    refreshScenery();surfacePoint(world,anchor.x,0,anchor.z,point);
    const r=BOT_SCHEDULING.localRadius,bounds=[Math.floor((point.x-r)/64),Math.floor((point.x+r)/64),Math.floor((point.y-r)/64),Math.floor((point.y+r)/64),Math.floor((point.z-r)/64),Math.floor((point.z+r)/64)];
    const key=bounds.join(':'),previous=localScenery.get(key);
    if(previous?.checkedRevision===sceneryRevision)return previous;
    const result=[];
    for(let x=bounds[0];x<=bounds[1];x++)for(let y=bounds[2];y<=bounds[3];y++)for(let z=bounds[4];z<=bounds[5];z++){
      const key=`${x}:${y}:${z}`;
      for(const item of permanentIndex.get(key)??[])if(!session.shared.isSceneryRemoved?.(item)&&!(isHarvestableWood(item)&&session.shared.removedTreeIds.has(settlementTreeId(item))))result.push(item);
      result.push(...dynamicIndex.get(key)??[]);
    }
    const signature=result.map(item=>`${item.id}:${item.kind}:${item.ownerId}:${item.x}:${item.y}:${item.z}:${item.rotation}:${item.width}:${item.depth}:${item.radius}:${item.scale}`).join('|');
    if(previous?.signature===signature){previous.checkedRevision=sceneryRevision;return previous;}
    const next={items:result,signature,revision:++localRevision,checkedRevision:sceneryRevision};
    if(localScenery.size>=512)localScenery.delete(localScenery.keys().next().value);
    localScenery.set(key,next);return next;
  }
  function getPlacements(anchor){
    if(match)return localSnapshot(anchor).items;
    refreshScenery();return scenery;
  }
  const entries=session.bots.map(({config,game})=>{
    const owner={ownerId:config.ownerId},art=createSettlementArt(parent,mapParent,world,owner);
    art.root.name=`${config.id}:settlement`;art.mapRoot.name=`${config.id}:map`;
    const residents=loops?null:createSettlementResidents(parent,world,owner),levels=createCityLevelMarkers(markerParent,markerMapParent,world,owner);
    const actor=match?null:createPlayerBotArt(parent,mapParent,world,{...owner,markerParent,markerMapParent});
    const bot=createPlayerBot(world,game,{config,getPlacements,getRevision:anchor=>match?localSnapshot(anchor).revision:spatialRevision(),getRole:()=>session.playerRole?.(game.ownerId)??'hybrid',coarseUpdates:match,
      onChop(result,tree,position){const direction={x:tree.x-position.x,z:tree.z-position.z};if(!detail.fellTree(result.treeId,{direction}))detail.removeTree(result.treeId);}});
    return {config,game,bot,art,residents,levels,actor,revision:-1,houseCount:-1,buildingCount:-1,snapshot:null,layout:null,pendingDt:0,position:bot.position};
  });
  const positions=entries.map(entry=>entry.position),scheduled=match&&entries.length>BOT_SCHEDULING.perFrame;
  const stats={updates:0,lastUpdates:0};
  function synchronize(){
    for(const entry of entries){
      const revision=entry.game.spatialRevision??entry.game.revision;if(entry.revision===revision)continue;
      const snapshot=entry.game.snapshot(),layout=layoutKey(snapshot);
      if(entry.layout!==layout){
        entry.art.sync(snapshot.houses,snapshot.paths,snapshot.buildings,{animate:entry.revision>=0,reducedMotion:reducedMotion?.matches});
        entry.residents?.sync(snapshot);entry.levels.sync(snapshot.cities);entry.layout=layout;
        entry.houseCount=snapshot.houses.length;entry.buildingCount=snapshot.buildings.length;meshRevision=-1;
      }
      entry.snapshot=snapshot;entry.revision=revision;
    }
  }
  synchronize();
  return {entries,
    get revision(){return entries.reduce((sum,entry)=>sum+entry.game.revision,0);},get stats(){return{...stats};},
    get positions(){return positions;},
    get meshes(){synchronize();const next=spatialRevision();if(meshRevision!==next){meshes=entries.flatMap(entry=>entry.art.meshes);meshRevision=next;}return meshes;},
    snapshot(){return entries.map(entry=>({...entry.bot.snapshot(),settlement:entry.game.snapshot()}));},
    simulate(dt,{completedDays=0}={}){
      if(disposed)return;stats.lastUpdates=0;
      if(Number.isFinite(dt)&&dt>0){
        for(const entry of entries)entry.pendingDt+=dt;
        const count=scheduled?Math.min(BOT_SCHEDULING.perFrame,entries.length):entries.length;
        for(let i=0;i<count;i++){
          const entry=entries[cursor];cursor=(cursor+1)%entries.length;
          entry.bot.update(entry.pendingDt);entry.pendingDt=0;entry.bot.readPosition(entry.position);stats.updates++;stats.lastUpdates++;
        }
      }
      if(completedDays!==lastIncomeDay){for(const entry of entries)entry.game.settleIncome(completedDays);lastIncomeDay=completedDays;}
      synchronize();
    },
    update(dt,{camera,mapBlend=0,walkingWeight=0,focus,viewportHeight=800,night=0,dayPhase,uiDt=dt}={}){
      if(disposed)return;synchronize();
      for(const entry of entries){
        entry.art.update({mapBlend,dt:uiDt,reducedMotion:reducedMotion?.matches,night});
        entry.residents?.update(dt,{focus,mapBlend,walkingWeight,visible:true,reducedMotion:reducedMotion?.matches,night,dayPhase,unavailableHomes:entry.art.construction.activeIds});
        entry.levels.update({camera,mapBlend,walkingWeight,viewportHeight});
        entry.actor?.update(entry.bot.snapshot(),{dt,camera,mapBlend,walkingWeight,focus,viewportHeight,reducedMotion:reducedMotion?.matches});
      }
    },
    dispose(){if(disposed)return;disposed=true;for(const entry of entries){entry.art.dispose();entry.residents?.dispose();entry.levels.dispose();entry.actor?.dispose();}},
  };
}
