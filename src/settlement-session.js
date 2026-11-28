import {createSettlementGame,SETTLEMENT} from './settlement-game.js';
import {surfaceDistance} from './world-surface.js';

const hash=value=>{let n=2166136261;for(const c of String(value))n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;};

/** One local authority for wallets, occupied land and optional allied founding.
 * Team membership allows cooperation, never access to another owner's wallet. */
export function createSettlementSession(world,{getActors=()=>[],getInfrastructure=()=>null,surfaceAt}={}){
  const games=[],removedTreeIds=new Set(),authorities=new Map(),events=[],ownershipListeners=new Set();
  const roles=new Map((world.gameplay?.match?.players??[]).map(player=>[player.id,player.role??'hybrid']));
  const match=world.gameplay?.match,roster=new Map((match?.players??world.players??[]).map(player=>[player.id,player]));
  let treeRevision=0,cachedRevision=-1,buildings=[],paths=[],reservedPaths=[],clearedPlacementIds=new Set(),clearedRevision=-1,eventSequence=0;
  const revision=()=>treeRevision+games.reduce((sum,game)=>sum+(game.spatialRevision??game.revision),0)+(getInfrastructure()?.revision??0);
  const allied=(a,b)=>a===b||!!match&&roster.get(a)?.teamId!=null&&roster.get(a)?.teamId===roster.get(b)?.teamId;
  const allCities=()=>[...authorities.values()].flatMap(authority=>authority.state().cities);
  const emit=event=>{const result={...event,id:`settlement:${++eventSequence}`};events.push(result);return result;};
  function refreshCleared(infrastructure=getInfrastructure()){
    const next=infrastructure?.revision??0;if(next===clearedRevision)return;
    clearedPlacementIds=new Set(infrastructure?.clearedPlacementIds??[]);clearedRevision=next;
  }
  function refresh(){
    const next=revision();if(next===cachedRevision)return;
    const infrastructure=getInfrastructure(),states=[...authorities.values()].map(authority=>authority.state());
    buildings=[...states.flatMap(state=>[...state.homes,...state.buildings]),...infrastructure?.buildings??[]];
    paths=[...states.flatMap(state=>state.paths),...infrastructure?.paths??[]];
    reservedPaths=[...paths,...infrastructure?.corridors??[]];refreshCleared(infrastructure);cachedRevision=next;
  }
  function graph(ownerId){
    const states=[...authorities].filter(([id])=>allied(ownerId,id)).map(([,authority])=>authority.state()),homes=states.flatMap(state=>state.homes),links=states.flatMap(state=>state.links),parent=new Map(homes.map(home=>[home.id,home.id]));
    const root=id=>{while(parent.get(id)!==id){parent.set(id,parent.get(parent.get(id)));id=parent.get(id);}return id;};
    for(const link of links)if(parent.has(link.fromHouseId)&&parent.has(link.toHouseId)){const a=root(link.fromHouseId),b=root(link.toHouseId);if(a!==b)parent.set(a<b?b:a,a<b?a:b);}
    const groups=new Map();for(const home of homes){const id=root(home.id);if(!groups.has(id))groups.set(id,[]);groups.get(id).push(home);}
    return{states,homes,links,groups};
  }
  function constructionContext(ownerId,point){
    if(!Number.isFinite(point?.x)||!Number.isFinite(point?.z))return{homes:[],links:[],paths:[],canFound:false};
    const data=graph(ownerId),established=new Map(allCities().map(city=>[city.id,city])),near=[];
    for(const homes of data.groups.values()){
      const distance=Math.min(...homes.map(home=>surfaceDistance(world,point,home)));if(distance>SETTLEMENT.connectionRange)continue;
      const city=homes.map(home=>established.get(home.cityId)).find(Boolean);near.push({homes,distance,city});
    }
    // A new house may join one established city. It must never fuse two
    // independently owned allied cities merely because their suburbs touch.
    const selected=near.filter(group=>group.city).sort((a,b)=>a.distance-b.distance||a.city.id.localeCompare(b.city.id))[0];
    const homes=near.filter(group=>!group.city||group===selected).flatMap(group=>group.homes),ids=new Set(homes.map(home=>home.id));
    const occupied=new Set(allCities().filter(city=>!city.steward).map(city=>city.ownerId)),contributors=new Set([ownerId,...homes.map(home=>home.contributorId??home.ownerId)]);
    return{homes,links:data.links.filter(link=>ids.has(link.fromHouseId)&&ids.has(link.toHouseId)),paths:data.states.flatMap(state=>state.paths).filter(path=>ids.has(path.fromHouseId)&&ids.has(path.toHouseId)),cityId:selected?.city.id??null,canFound:[...contributors].some(id=>!occupied.has(id)&&(roles.get(id)??'hybrid')==='hybrid')};
  }
  function moveGroup(houseIds,cityId,winnerId,{steward=false}={}){
    const ids=new Set(houseIds),target=authorities.get(winnerId),targetState=target.state(),changed=new Set(),moved={homes:[],buildings:[],paths:[],links:[]};
    const cityIds=new Set();for(const authority of authorities.values())for(const home of authority.state().homes)if(ids.has(home.id)&&home.cityId)cityIds.add(home.cityId);
    for(const [ownerId,authority]of authorities){
      const state=authority.state();
      for(const kind of ['homes','buildings','paths','links']){
        const list=state[kind];
        for(let i=list.length-1;i>=0;i--){const item=list[i],take=kind==='homes'?ids.has(item.id):kind==='buildings'?cityIds.has(item.cityId):ids.has(item.fromHouseId)||ids.has(item.toHouseId)||kind==='paths'&&cityIds.has(item.cityId);
          if(!take)continue;list.splice(i,1);moved[kind].push(item);changed.add(ownerId);
        }
      }
    }
    for(const kind of ['homes','buildings','paths','links']){
      const seen=new Set(targetState[kind].map(item=>item.id));
      for(const item of moved[kind].sort((a,b)=>a.id.localeCompare(b.id))){
        if(kind==='homes')item.contributorId??=item.ownerId;
        item.ownerId=winnerId;item.cityId=cityId;if(kind==='homes'){item.connected=!!cityId;if(steward)item.steward=true;else delete item.steward;}
        if(!seen.has(item.id)){targetState[kind].push(item);seen.add(item.id);}
      }
    }
    changed.add(winnerId);for(const id of changed)authorities.get(id).changed();cachedRevision=-1;
    return target;
  }
  function resolveConstruction({ownerId,houseId,context}){
    const data=graph(ownerId),group=[...data.groups.values()].find(homes=>homes.some(home=>home.id===houseId));
    if(!group)return null;
    const formed=allCities(),existing=formed.find(city=>group.some(home=>home.cityId===city.id)),ids=group.map(home=>home.id).sort(),resultEvents=[];
    const newHouse=group.find(home=>home.id===houseId);newHouse.contributorId??=ownerId;
    if(existing){
      const target=moveGroup(ids,existing.id,existing.ownerId,{steward:!!existing.steward}),development=target.develop(context);
      if(ownerId!==existing.ownerId)resultEvents.push(emit({type:'city-invitation',cityId:existing.id,ownerId:existing.ownerId,playerId:ownerId,contributorId:ownerId,houseId}));
      return{city:target.state().cities.find(city=>city.id===existing.id),development,events:resultEvents};
    }
    const occupied=new Set(formed.filter(city=>!city.steward).map(city=>city.ownerId)),candidates=[...new Set(group.map(home=>home.contributorId??home.ownerId))].filter(id=>!occupied.has(id)&&(roles.get(id)??'hybrid')==='hybrid').sort();
    if(group.length<3||!candidates.length){
      for(const home of group){home.cityId=null;home.connected=false;}
      for(const id of new Set(group.map(home=>home.ownerId)))authorities.get(id).changed();
      return{events:resultEvents};
    }
    const cityId=`city:${ids[0]}`,winnerId=candidates[hash(`${world.seed}:${cityId}:founding:${candidates.join('|')}`)%candidates.length],target=moveGroup(ids,cityId,winnerId),development=target.develop(context);
    resultEvents.push(emit({type:'city-founded',cityId,ownerId:winnerId,winnerId,candidates,houseIds:ids,contributorId:ownerId,name:roster.get(winnerId)?.name??winnerId}));
    return{city:target.state().cities.find(city=>city.id===cityId),development,events:resultEvents};
  }
  function captureCity(cityId,newOwnerId,{steward=false}={}){
    if(!match)return{ok:false,code:'not-a-match'};
    if(!authorities.has(newOwnerId))return{ok:false,code:'invalid-owner'};
    const city=allCities().find(city=>city.id===cityId);if(!city)return{ok:false,code:'invalid-city'};
    if(city.ownerId===newOwnerId&&!(city.steward&&!steward))return{ok:false,code:'already-owned'};
    if(!steward&&allCities().some(city=>city.id!==cityId&&city.ownerId===newOwnerId&&!city.steward))return{ok:false,code:'city-slot-occupied'};
    const previousOwnerId=city.ownerId;moveGroup(city.houseIds,cityId,newOwnerId,{steward});
    const event=emit({type:'city-captured',cityId,previousOwnerId,ownerId:newOwnerId,steward:!!steward,unassigned:!!steward,houseIds:[...city.houseIds],name:roster.get(newOwnerId)?.name??newOwnerId});
    for(const listener of ownershipListeners)listener(event);
    return{ok:true,city:structuredClone(allCities().find(city=>city.id===cityId)),event};
  }
  const shared={removedTreeIds,getActors,touchTrees(){treeRevision++;},
    registerAuthority(ownerId,authority){authorities.set(ownerId,authority);},
    ...(match?{constructionContext,resolveConstruction,playerRole:id=>roles.get(id)??'hybrid'}:{}),
    isSceneryRemoved(item){refreshCleared();return clearedPlacementIds.has(typeof item==='string'?item:item.id??`${item.kind}:${item.x}:${item.z}`);},
    getSceneryRevision(){return getInfrastructure()?.revision??0;},
    getBuildings(){refresh();return buildings;},getPaths(){refresh();return reservedPaths;}};
  const player=createSettlementGame(world,{shared,surfaceAt});games.push(player);
  const bots=(world.gameplay.playerBots??[]).map(source=>{
    const config={...source,idPrefix:`${source.id}:`,farmVillages:world.gameplay.farmVillages};
    const game=createSettlementGame(world,{config,shared,surfaceAt});games.push(game);
    return {config,game};
  });
  return {player,bots,shared,areAllied:allied,captureCity,playerRole(id){return roles.get(id)??'hybrid';},
    setPlayerRole(id,role){if(!authorities.has(id)||!['hybrid','tps'].includes(role))return{ok:false,code:'invalid-role'};roles.set(id,role);return{ok:true,playerId:id,role};},
    get accounts(){return [...games];},gameForOwner(ownerId){return games.find(game=>game.ownerId===ownerId)??null;},
    get cities(){return structuredClone(allCities());},
    drainEvents(){return events.splice(0);},onCityOwnershipChanged(listener){ownershipListeners.add(listener);return()=>ownershipListeners.delete(listener);},
    get revision(){return revision();},get spatialRevision(){return revision();},
    get buildings(){refresh();return buildings;},
    get paths(){refresh();return paths;},
  };
}
