import {createSettlementGame} from './settlement-game.js';

/** One local authority for all settlers. Accounts and city graphs are private
 * to an owner; harvested trees and occupied ground belong to the whole world.
 * Commands are synchronous, so a second axe hit cannot claim the same tree. */
export function createSettlementSession(world,{getActors=()=>[],getInfrastructure=()=>null,surfaceAt}={}){
  const games=[],removedTreeIds=new Set();
  let cachedRevision=-1,buildings=[],paths=[],reservedPaths=[],clearedPlacementIds=new Set();
  const revision=()=>games.reduce((sum,game)=>sum+(game.spatialRevision??game.revision),0)+(getInfrastructure()?.revision??0);
  function refresh(){
    const next=revision();if(next===cachedRevision)return;
    const infrastructure=getInfrastructure();
    buildings=[...games.flatMap(game=>[...game.houses,...game.buildings]),...infrastructure?.buildings??[]];
    paths=[...games.flatMap(game=>game.paths),...infrastructure?.paths??[]];
    reservedPaths=[...paths,...infrastructure?.corridors??[]];clearedPlacementIds=new Set(infrastructure?.clearedPlacementIds??[]);cachedRevision=next;
  }
  const shared={removedTreeIds,getActors,
    isSceneryRemoved(item){refresh();return clearedPlacementIds.has(typeof item==='string'?item:item.id??`${item.kind}:${item.x}:${item.z}`);},
    getSceneryRevision(){return getInfrastructure()?.revision??0;},
    getBuildings(){refresh();return buildings;},getPaths(){refresh();return reservedPaths;}};
  const player=createSettlementGame(world,{shared,surfaceAt});games.push(player);
  const bots=(world.gameplay.playerBots??[]).map(source=>{
    const config={...source,idPrefix:`${source.id}:`,farmVillages:world.gameplay.farmVillages};
    const game=createSettlementGame(world,{config,shared,surfaceAt});games.push(game);
    return {config,game};
  });
  return {player,bots,shared,
    get revision(){return revision();},get spatialRevision(){return revision();},
    get buildings(){refresh();return buildings;},
    get paths(){refresh();return paths;},
  };
}
