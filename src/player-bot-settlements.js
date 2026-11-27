import {createPlayerBot} from './player-bots.js';
import {createPlayerBotArt} from './player-bot-art.js';
import {createSettlementArt} from './settlement-art.js';
import {createSettlementResidents} from './settlement-residents.js';
import {createCityLevelMarkers} from './city-level-markers.js';

/** CPU settlers continue outside the camera's detail cache. Only their small
 * actors animate every frame; houses, streets and resident networks rebuild
 * when construction changes their owner’s layout. */
export function createPlayerBotSettlements({world,session,parent,mapParent,markerParent,markerMapParent,detail,reducedMotion}){
  const village=world.gameplay.farmVillages;
  const permanent=[...world.gameplay.botScenery??[],...village?.houses??[],...village?.buildings??[]];
  let scenery=[],sceneryRevision=-1,meshRevision=-1,meshes=[];
  const spatialRevision=()=>session.spatialRevision??session.revision;
  function getPlacements(){
    if(sceneryRevision!==spatialRevision()){
      scenery=[...permanent.filter(item=>!session.shared.isSceneryRemoved?.(item)),...session.buildings];sceneryRevision=spatialRevision();
    }
    return scenery;
  }
  const entries=session.bots.map(({config,game})=>{
    const owner={ownerId:config.ownerId};
    const art=createSettlementArt(parent,mapParent,world,owner);
    art.root.name=`${config.id}:settlement`;art.mapRoot.name=`${config.id}:map`;
    const residents=createSettlementResidents(parent,world,owner);
    const levels=createCityLevelMarkers(markerParent,markerMapParent,world,owner);
    const actor=createPlayerBotArt(parent,mapParent,world,{...owner,markerParent,markerMapParent});
    const bot=createPlayerBot(world,game,{config,getPlacements,getRevision:spatialRevision,
      onChop(result,tree,position){
        const direction={x:tree.x-position.x,z:tree.z-position.z};
        if(!detail.fellTree(result.treeId,{direction}))detail.removeTree(result.treeId);
      }});
    return {config,game,bot,art,residents,levels,actor,revision:-1,houseCount:-1,buildingCount:-1,snapshot:null};
  });
  function synchronize(){
    for(const entry of entries){
      const revision=entry.game.spatialRevision??entry.game.revision;
      if(entry.revision===revision)continue;
      const snapshot=entry.game.snapshot();
      if(entry.houseCount!==snapshot.houses.length||entry.buildingCount!==snapshot.buildings.length){
        entry.art.sync(snapshot.houses,snapshot.paths,snapshot.buildings,{animate:entry.revision>=0,reducedMotion:reducedMotion?.matches});
        entry.residents.sync(snapshot);entry.levels.sync(snapshot.cities);
        entry.houseCount=snapshot.houses.length;entry.buildingCount=snapshot.buildings.length;meshRevision=-1;
      }
      entry.snapshot=snapshot;entry.revision=revision;
    }
  }
  synchronize();
  return {entries,
    get revision(){return entries.reduce((sum,entry)=>sum+entry.game.revision,0);},
    get positions(){return entries.map(entry=>entry.bot.position);},
    get meshes(){synchronize();if(meshRevision!==spatialRevision()){meshes=entries.flatMap(entry=>entry.art.meshes);meshRevision=spatialRevision();}return meshes;},
    snapshot(){return entries.map(entry=>({...entry.bot.snapshot(),settlement:entry.game.snapshot()}));},
    simulate(dt,{completedDays=0}={}){
      for(const entry of entries){entry.bot.update(dt);entry.game.settleIncome(completedDays);}
      synchronize();
    },
    update(dt,{camera,mapBlend=0,walkingWeight=0,focus,viewportHeight=800,night=0,dayPhase,uiDt=dt}={}){
      synchronize();
      for(const entry of entries){
        entry.art.update({mapBlend,dt:uiDt,reducedMotion:reducedMotion?.matches,night});
        entry.residents.update(dt,{focus,mapBlend,walkingWeight,visible:true,reducedMotion:reducedMotion?.matches,night,dayPhase,
          unavailableHomes:entry.art.construction.activeIds});
        entry.levels.update({camera,mapBlend,walkingWeight,viewportHeight});
        entry.actor.update(entry.bot.snapshot(),{dt,camera,mapBlend,walkingWeight,focus,viewportHeight,reducedMotion:reducedMotion?.matches});
      }
    },
    dispose(){for(const entry of entries){entry.art.dispose();entry.residents.dispose();entry.levels.dispose();entry.actor.dispose();}},
  };
}
