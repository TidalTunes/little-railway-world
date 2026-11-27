import {createSettlementRailways} from './settlement-railways.js';

let world,catalog;
self.onmessage=({data})=>{
  if(data.type==='initialize'){world=data.world;catalog=undefined;return;}
  const {id,from,to,state,network,placements}=data;
  try{
    const removedTreeIds=new Set(state.player.removedTreeIds);
    const session={player:state.player,bots:state.bots.map(game=>({game})),buildings:state.buildings,
      shared:{removedTreeIds,getActors:()=>state.actors??[]}};
    const railways=createSettlementRailways(world,{session,initialState:network,sceneryCatalog:catalog,getPlacements:()=>placements});
    const result=railways.evaluate(from,to);catalog=railways.sceneryCatalog;
    self.postMessage({id,result});
  }catch(error){self.postMessage({id,error:error.message});}
};
