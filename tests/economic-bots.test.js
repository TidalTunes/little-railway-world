import test from 'node:test';
import assert from 'node:assert/strict';
import {createEconomicBots} from '../src/economic-bots.js';

function fixture({profile='merchant',gold=30,houseCount=3,tools=2,grain=8,cost=9,blocked=false,planRoute}={}){
  const city={id:'home',ownerId:'coral',x:0,z:0,houseCount,level:Math.floor(houseCount/3)};
  const cities=[city,{id:'farm',ownerId:'gray',x:20,z:10},{id:'workshop',ownerId:'blue',x:30,z:-10},{id:'lumber',ownerId:'gold',x:40,z:0}];
  const stocks=cities.map(item=>({...item,industry:item.id==='home'?'lumber':item.id,stock:{timber:12,grain,tools},incoming:{grain:0},canChooseIndustry:true,industryCost:0}));
  const game={ownerId:'coral',logs:12,gold,cities:[city],houses:Array.from({length:houseCount},(_,i)=>({id:`h${i}`})),constructionCost:{timber:8,tools:2},
    resourcesAt(){return {timber:this.logs,tools,grain};},spendGold(amount){if(amount>this.gold)return {ok:false};this.gold-=amount;return {ok:true};}};
  const policies=[],bot={game,config:{id:'bot:coral',economicProfile:profile},setPolicy(policy){policies.push(policy);}};
  const session={spatialRevision:0,revision:0},connections=[],calls=[],callbacks=[];
  const railways={revision:0,maxConnectionDistance:140,canExtend:source=>source.id==='home',cities,
    geometryKey(from,to){return `${from}>${to}:${session.spatialRevision}:${this.revision}`;},
    adoptPreview(from,to,result,key,options){calls.push({method:'adopt',from,to,options});return result?.provisional!==true&&key===this.geometryKey(from,to);},
    snapshot:()=>({cities,connections}),
    preview(from,to,options){calls.push({method:'preview',from,to,options});return {siteValid:true,cost};},
    evaluate(from,to,options){calls.push({method:'evaluate',from,to,options});return {valid:!blocked,code:blocked?'route-blocked':'ready',cost};},
    build(from,to,options){calls.push({method:'build',from,to,options});const paid=game.spendGold(cost);if(!paid.ok)return paid;
      connections.push({from,to});this.revision++;return {ok:true,from,to,cost};},
  };
  const industries=[];const economy={cities:stocks,city:id=>stocks.find(item=>item.id===id),setIndustry(id,type,ownerId){industries.push({id,type,ownerId});stocks.find(item=>item.id===id).industry=type;return {ok:true};}};
  const coordinator=createEconomicBots({gameplay:{economy:true}},{session,bots:[bot],railways,economy,planRoute,onRailBuild:result=>callbacks.push(result)});
  return {coordinator,game,policies,session,railways,calls,callbacks,stocks,industries};
}

test('profiles choose complementary markets and legitimate paid owner routes',()=>{
  for(const [profile,industry,target,destination]of [['merchant','lumber',6,'farm'],['industrialist','workshop',9,'lumber'],['agrarian','farm',15,'workshop']]){
    const f=fixture({profile});f.coordinator.update(1);
    assert.equal(f.coordinator.snapshot()[0].industry,industry);assert.equal(f.policies.at(-1).targetHouses,target);
    const built=f.calls.find(call=>call.method==='build');assert.equal(built.to,destination);
    assert.deepEqual(built.options,{ownerId:'coral',requireCached:true});assert.equal(f.game.gold,21);
    assert.equal(f.game.logs,12);assert.equal(f.callbacks.length,1);
    assert.deepEqual(f.calls.map(call=>call.method),['preview','evaluate','build']);
  }
});

test('capital reserve skips expensive validation until the real wallet can afford food as well as track',()=>{
  const f=fixture({gold:10,cost:9});f.coordinator.update(1);
  assert.equal(f.coordinator.stats.validations,0);assert.equal(f.callbacks.length,0);assert.equal(f.game.gold,10);
  const previews=f.coordinator.stats.previews;f.coordinator.update(3);assert.equal(f.coordinator.stats.previews,previews,'unchanged poverty does not refit every possible route');
  f.game.gold=11;f.coordinator.update(3);
  assert.equal(f.coordinator.stats.validations,1);assert.equal(f.game.gold,2);assert.equal(f.callbacks.length,1);
});

test('browser strategy uses one pending worker and commits its exact authoritative result on an update',async()=>{
  let resolve,requests=0;
  const f=fixture({planRoute:(_from,_to,options)=>{assert.equal(options.ownerId,'coral');requests++;return new Promise(done=>resolve=done);}});
  f.coordinator.update(1);assert.equal(f.coordinator.planning,true);assert.equal(requests,1);
  f.coordinator.update(60);assert.equal(requests,1);assert.equal(f.calls.some(call=>call.method==='evaluate'),false,'no full scenery validation on the render thread');
  resolve({result:{siteValid:true,valid:true,cost:9,provisional:false}});await Promise.resolve();
  assert.equal(f.callbacks.length,0,'worker completion itself cannot spend while paused');
  f.coordinator.update(.1);assert.equal(f.coordinator.planning,false);assert.equal(f.game.gold,21);
  assert.deepEqual(f.calls.map(call=>call.method),['preview','adopt','build']);
});

test('stale, unaffordable and disposed worker responses cannot spend a bot wallet',async()=>{
  for(const change of ['world','wallet','dispose']){
    let resolve;const f=fixture({planRoute:()=>new Promise(done=>resolve=done)});f.coordinator.update(1);
    if(change==='world')f.session.spatialRevision++;
    if(change==='wallet')f.game.gold=1;
    if(change==='dispose')f.coordinator.dispose();
    const balance=f.game.gold;resolve({result:{siteValid:true,valid:true,cost:9,provisional:false}});await Promise.resolve();
    f.coordinator.update(.1);assert.equal(f.callbacks.length,0);assert.equal(f.game.gold,balance);
    assert.equal(f.calls.some(call=>call.method==='build'),false);
  }
});

test('geometry failures are cached across wallet changes and retried after a relevant world edit',()=>{
  const f=fixture({blocked:true});f.coordinator.update(1);
  assert.equal(f.coordinator.stats.validations,1);assert.equal(f.game.gold,30);
  f.coordinator.update(3);f.coordinator.update(3);const checked=f.calls.filter(call=>call.method==='evaluate');
  assert.equal(checked.length,3);assert.equal(new Set(checked.map(call=>call.to)).size,3,'other markets still receive a fair attempt');
  f.game.gold=50;f.session.revision++;f.coordinator.update(3);assert.equal(f.coordinator.stats.validations,3);
  f.session.spatialRevision++;f.coordinator.update(3);assert.equal(f.coordinator.stats.validations,4);
  assert.equal(f.calls.filter(call=>call.method==='build').length,0);
});

test('shortage stages housing at three while keeping trade decisions active after level five',()=>{
  const hungry=fixture({tools:0,grain:0});hungry.coordinator.update(1);
  assert.equal(hungry.policies.at(-1).targetHouses,3);assert.equal(hungry.policies.at(-1).logReserve,0);
  assert.equal(hungry.coordinator.stats.routes,1,'tools and food shortages trigger trade instead of endless logging');
  const mature=fixture({profile:'agrarian',houseCount:15,gold:60});mature.coordinator.update(1);mature.coordinator.update(3);
  assert.equal(mature.coordinator.stats.routes,2);assert.equal(mature.policies.at(-1).targetHouses,15);
});

test('one update performs at most one authoritative validation, including a large elapsed time',()=>{
  const f=fixture();for(const dt of [1,60,600]){const before=f.coordinator.stats.validations;f.coordinator.update(dt);assert.ok(f.coordinator.stats.validations-before<=1);}
  const before=f.coordinator.stats;f.coordinator.dispose();f.coordinator.update(600);assert.deepEqual(f.coordinator.stats,before);
});
