import {createSettlementGame} from './settlement-game.js';

/** One local authority for all settlers. Accounts and city graphs are private
 * to an owner; harvested trees and occupied ground belong to the whole world.
 * Commands are synchronous, so a second axe hit cannot claim the same tree. */
export function createSettlementSession(world,{getActors=()=>[],surfaceAt}={}){
  const games=[],removedTreeIds=new Set();
  let cachedRevision=-1,buildings=[],paths=[];
  const revision=()=>games.reduce((sum,game)=>sum+game.revision,0);
  function refresh(){
    const next=revision();if(next===cachedRevision)return;
    buildings=games.flatMap(game=>[...game.houses,...game.buildings]);
    paths=games.flatMap(game=>game.paths);cachedRevision=next;
  }
  const shared={removedTreeIds,getActors,
    getBuildings(){refresh();return buildings;},getPaths(){refresh();return paths;}};
  const player=createSettlementGame(world,{shared,surfaceAt});games.push(player);
  const bots=(world.gameplay.playerBots??[]).map(source=>{
    const config={...source,idPrefix:`${source.id}:`,farmVillages:world.gameplay.farmVillages};
    const game=createSettlementGame(world,{config,shared,surfaceAt});games.push(game);
    return {config,game};
  });
  return {player,bots,shared,
    get revision(){return revision();},
    get buildings(){refresh();return buildings;},
    get paths(){refresh();return paths;},
  };
}
