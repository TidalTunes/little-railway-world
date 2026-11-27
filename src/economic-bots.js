export const ECONOMIC_BOT_PROFILES=Object.freeze({
  merchant:Object.freeze({industry:'lumber',targetHouses:6,markets:['farm','workshop','lumber'],goldReserve:2}),
  industrialist:Object.freeze({industry:'workshop',targetHouses:9,markets:['lumber','farm','workshop'],goldReserve:2}),
  agrarian:Object.freeze({industry:'farm',targetHouses:15,markets:['workshop','lumber','farm'],goldReserve:2}),
});
const names=Object.keys(ECONOMIC_BOT_PROFILES),distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const finite=point=>Number.isFinite(point?.x)&&Number.isFinite(point?.z);

/** Economic decisions issue the same paid commands as a player. Travellers
 * still walk/chop/build in player-bots; this coordinator only sets their work
 * policy and buys useful infrastructure, at a bounded cadence. */
export function createEconomicBots(world,{session,bots,railways,economy,onRailBuild=()=>{},planRoute}={}){
  const entries=(Array.isArray(bots)?bots:bots?.entries??[]).map((entry,index)=>{
    const bot=entry.bot??entry,game=entry.game??bot.game,config=entry.config??bot.config??{};
    const name=ECONOMIC_BOT_PROFILES[config.economicProfile??config.profile]?config.economicProfile??config.profile:names[index%names.length];
    return {bot,game,config,name,profile:ECONOMIC_BOT_PROFILES[name],due:index,state:'homestead',targetHouses:3,failures:new Map(),routes:0,refilling:false};
  });
  let elapsed=0,cursor=0,disposed=false,pending=null;
  const stats={decisions:0,previews:0,validations:0,routes:0,industries:0};
  const enabled=Boolean(world.gameplay?.economy);
  if(enabled)for(const entry of entries)entry.bot.setPolicy({targetHouses:3,logReserve:0});

  function remember(entry,key,signature,code,retryAt=Infinity,cost){
    entry.failures.set(key,{signature,code,retryAt,cost});
    if(entry.failures.size>256)entry.failures.delete(entry.failures.keys().next().value);
  }
  function connected(cities,connections){
    const roots=new Map(cities.map(city=>[city.id,city.id]));
    const root=id=>{while(roots.has(id)&&roots.get(id)!==id)id=roots.get(id);return id;};
    for(const link of connections)if(roots.has(link.from)&&roots.has(link.to))roots.set(root(link.from),root(link.to));
    return root;
  }
  const goldReserve=entry=>entry.profile.goldReserve+(entry.game.gold>=20?2:0);
  function commit(entry,from,to,options,plan,revision,key){
    if(!plan||plan.siteValid===false||plan.valid===false&&plan.code!=='not-enough-gold'){
      remember(entry,key,revision,plan?.code??'route-blocked');return;
    }
    if(!Number.isSafeInteger(plan.cost)||plan.cost<0||entry.game.gold-plan.cost<goldReserve(entry)){entry.state='saving';return;}
    const result=railways.build(from,to,{...options,requireCached:true});
    if(result.ok){entry.routes++;stats.routes++;entry.state='connected';onRailBuild(result);}
    else remember(entry,key,revision,result.code,['player-blocked','world-changed'].includes(result.code)?elapsed+6:Infinity);
  }
  function finishPending(){
    const request=pending;if(!request?.response)return;
    pending=null;
    const {entry,from,to,options,geometryKey,revision,key,response}=request;
    if(response.stale||geometryKey!==railways.geometryKey(from,to,options)){entry.state='replanning';return;}
    if(response.error){entry.state='planning-unavailable';remember(entry,key,revision,'planning-unavailable',elapsed+15);return;}
    // Human editing may have replaced the model's single cached plan while
    // this result was waiting. Restore only this exact, still-current result.
    if(!railways.adoptPreview(from,to,response.result,geometryKey,options)){entry.state='replanning';return;}
    commit(entry,from,to,options,response.result,revision,key);
  }
  function timberSupply(entry,city,market){
    const {game,bot}=entry;if(!economy.depositTimber||!bot.requestTimberDelivery||!market)return 0;
    const workshop=market.industry==='workshop';
    const stock=(market.stock?.timber??0)+(market.incoming?.timber??0),room=Math.max(0,(market.capacity??0)-stock);
    const target=12+Math.max(1,market.level??1)*2;
    if(workshop&&stock<=8)entry.refilling=true;
    if(!workshop||stock>=target||room===0)entry.refilling=false;
    const needed=entry.refilling?Math.min(target-stock,room):0,keepCarried=workshop?0:8;
    const available=Math.max(0,game.logs-keepCarried),amount=Math.min(available,workshop?Math.min(12,needed):room);
    if(amount>0&&!bot.deliveringTimber&&(amount>=Math.min(8,needed)||!workshop)){
      bot.requestTimberDelivery({cityId:city.id,amount,keepCarried,transfer(point,requested){
        const current=economy.city(city.id);
        if(!current||workshop&&current.industry!=='workshop')return {ok:false,code:'industry-changed'};
        const held=current.stock.timber+current.incoming.timber;
        const capacity=Math.max(0,current.capacity-held),deficit=workshop?Math.max(0,12+Math.max(1,current.level??1)*2-held):capacity;
        const quantity=Math.min(requested,capacity,deficit,Math.max(0,game.logs-keepCarried));
        if(!quantity){bot.setPolicy({logReserve:0});return {ok:false,code:'depot-stocked'};}
        const result=economy.depositTimber(game.ownerId,point,quantity);
        // Reconsider production demand next decision; don't begin another
        // logging trip using the reserve from before this delivery.
        if(result.ok)bot.setPolicy({logReserve:0});
        return result;
      }});
    }
    return needed>0?Math.min(12,Math.max(8,needed)):0;
  }
  function decide(entry){
    stats.decisions++;
    const {game,bot,profile}=entry,owned=game.cities;
    const city=owned.slice().sort((a,b)=>b.houseCount-a.houseCount||String(a.id).localeCompare(String(b.id)))[0];
    if(!city){entry.targetHouses=3;entry.state='homestead';bot.setPolicy({targetHouses:3,logReserve:0});return;}
    let market=economy.city(city.id),industryReserve=0;
    if(market&&market.industry!==profile.industry&&market.canChooseIndustry){
      const amount=typeof market.industryCost==='number'?market.industryCost:market.industryCost?.timber??0;
      const available=game.resourcesAt(city);
      if(available.timber>=amount){
        const result=economy.setIndustry(city.id,profile.industry,game.ownerId);
        if(result.ok){stats.industries++;market=economy.city(city.id);}
      }else industryReserve=Math.max(0,amount-(available.timber-game.logs));
    }
    const resources=game.resourcesAt(city),cost=game.constructionCost;
    const supplied=(resources.tools??0)>=cost.tools;
    const hasFood=market?.fed||(market?.stock?.grain??0)>0||(market?.incoming?.grain??0)>0;
    // A third home establishes a depot. Beyond it, avoid expanding a hungry
    // settlement or cutting an entire forest while waiting on imported tools.
    entry.targetHouses=supplied&&hasFood?profile.targetHouses:Math.max(3,game.houses.length);
    const supplyReserve=timberSupply(entry,city,market);
    bot.setPolicy({targetHouses:entry.targetHouses,logReserve:Math.max(industryReserve,supplyReserve)});
    entry.state=entry.targetHouses>game.houses.length?'growing':supplied?'trading':'awaiting-tools';

    const network=railways.snapshot(),cities=network.cities??railways.cities,markets=new Map(economy.cities.map(item=>[item.id,item]));
    const component=connected(cities,network.connections??[]),ownedIds=new Set(owned.map(item=>item.id));
    const sources=cities.filter(source=>ownedIds.has(source.id)||railways.canExtend?.(source,game.ownerId));
    const candidates=[];
    for(const from of sources)for(const to of cities){
      if(from.id===to.id||!finite(from)||!finite(to)||component(from.id)===component(to.id))continue;
      const length=distance(from,to);if(length>(railways.maxConnectionDistance??140))continue;
      const other=markets.get(to.id);if(!other)continue;
      const preference=profile.markets.indexOf(other.industry),stock=other.stock??{};
      let value=preference<0?0:18-preference*4;
      if((resources.tools??0)<2&&(stock.tools>0||other.industry==='workshop'))value+=36;
      if(!hasFood&&(stock.grain>0||other.industry==='farm'))value+=28;
      if(profile.industry==='workshop'&&(resources.timber??0)<8&&(stock.timber>0||other.industry==='lumber'))value+=22;
      if(other.industry!==profile.industry)value+=8;
      // Complementary markets stay interesting after the housing target, and
      // a connected foreign depot can extend the same shared trade network.
      candidates.push({from,to,score:value-length*.08});
    }
    candidates.sort((a,b)=>b.score-a.score||String(a.to.id).localeCompare(String(b.to.id))||String(a.from.id).localeCompare(String(b.from.id)));
    const revision=`${session.spatialRevision??session.revision}:${railways.revision}`;
    const reserve=goldReserve(entry),options={ownerId:game.ownerId};
    for(const {from,to}of candidates.slice(0,12)){
      const key=`${from.id}>${to.id}`,failed=entry.failures.get(key);
      if(failed?.signature===revision&&elapsed<failed.retryAt&&
        (failed.cost===undefined||game.gold-failed.cost<reserve))continue;
      stats.previews++;const draft=railways.preview(from.id,to.id,options);
      if(!draft.siteValid){remember(entry,key,revision,draft.code);continue;}
      if(!Number.isSafeInteger(draft.cost)||draft.cost<0){remember(entry,key,revision,'invalid-cost');continue;}
      if(game.gold-draft.cost<reserve){entry.state='saving';remember(entry,key,revision,'saving',Infinity,draft.cost);continue;}
      // Exactly one expensive route validation is permitted per update call.
      stats.validations++;
      if(planRoute){
        const request={entry,from:from.id,to:to.id,options,geometryKey:railways.geometryKey(from.id,to.id,options),revision,key,response:null};
        pending=request;entry.state='planning';
        try{Promise.resolve(planRoute(from.id,to.id,options)).then(response=>{
          if(!disposed&&pending===request)request.response=response??{error:'Missing route response'};
        },()=>{if(!disposed&&pending===request)request.response={error:'Route planning failed'};});}
        catch{request.response={error:'Route planning failed'};}
      }else commit(entry,from.id,to.id,options,railways.evaluate(from.id,to.id,options),revision,key);
      return;
    }
  }
  return {
    update(dt){
      if(!enabled||disposed||!Number.isFinite(dt)||dt<=0||!entries.length)return;
      elapsed+=Math.min(dt,60);
      if(pending){finishPending();return;}
      for(let offset=0;offset<entries.length;offset++){
        const index=(cursor+offset)%entries.length,entry=entries[index];if(elapsed<entry.due)continue;
        entry.due=elapsed+3;cursor=(index+1)%entries.length;decide(entry);break;
      }
    },
    snapshot(){return entries.map(entry=>({id:entry.config.id,ownerId:entry.game.ownerId,profile:entry.name,industry:entry.profile.industry,
      targetHouses:entry.targetHouses,state:entry.state,routes:entry.routes,failedPairs:entry.failures.size}));},
    get stats(){return {...stats};},
    get planning(){return Boolean(pending);},
    dispose(){disposed=true;pending=null;for(const entry of entries)entry.failures.clear();},
  };
}
