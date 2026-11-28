import test from 'node:test';
import assert from 'node:assert/strict';
import {settlementHudProgress,settlementHudRailway,settlementHudConstruction,settlementHudRate,settlementHudProductionClock} from '../src/settlement-hud.js';

test('construction guidance distinguishes timber and tools instead of claiming timber is enough',()=>{
  const buildCost={timber:8,tools:2},input={economic:true,logs:8,buildCost};
  const missing=settlementHudConstruction({...input,resources:{tools:0}});
  assert.equal(missing.affordable,false);assert.equal(missing.costLabel,'8 timber + 2 tools');assert.equal(missing.readiness,'Need 2 more tools.');
  const ready=settlementHudConstruction({...input,resources:{tools:2}});assert.equal(ready.affordable,true);assert.equal(ready.readiness,'Timber and tools ready.');
  const unknown=settlementHudConstruction(input);assert.equal(unknown.affordable,false);assert.equal(unknown.readiness,'Timber ready; 2 tools also required.');
  const both=settlementHudConstruction({...input,logs:5,resources:{tools:1}});assert.equal(both.shortage,'3 more timber + 1 more tool');assert.ok(!both.readiness.includes('logs'));
  const legacy=settlementHudConstruction({logs:10});assert.equal(legacy.affordable,true);assert.equal(legacy.costLabel,'10 logs');assert.equal(legacy.readiness,'Enough logs gathered.');
});

test('construction requires both resources and food from the current wallet',()=>{
  const input={economic:'loops',buildCost:{resources:8,food:2},logs:999};
  const missing=settlementHudConstruction({...input,resources:{resources:7,food:1,resourceNet:99}});
  assert.equal(missing.costLabel,'8 resources + 2 food');assert.equal(missing.shortage,'1 more resources + 1 more food');assert.equal(missing.affordable,false);
  const ready=settlementHudConstruction({...input,resources:{resources:8,food:2}});assert.equal(ready.affordable,true);assert.equal(ready.readiness,'Resources and food ready.');
  assert.equal(settlementHudConstruction({...input,resources:{resources:0,food:2,resourceNet:-3}}).affordable,false);
});

test('resource railway shortfalls remain cost feedback and gold cannot pay them',()=>{
  const route={stage:'preview',hasCity:true,siteValid:true,canBuild:false,cost:12,costResource:'resources',code:'not-enough-resources'};
  const short=settlementHudRailway(route,{resources:{resources:4},gold:999});
  assert.equal(short.canBuild,false);assert.equal(short.shortfall,8);assert.equal(short.missingGold,0);assert.equal(short.status,'8 resources short');assert.equal(short.statusKind,'cost');
  const ready=settlementHudRailway({...route,canBuild:true,code:'ready'},{resources:12,gold:0});assert.equal(ready.canBuild,true);assert.equal(ready.costResource,'resources');
  const invalid=settlementHudRailway({...route,siteValid:false,code:'invalid-alignment',reason:'Give this bend more room'},{resources:0});assert.equal(invalid.statusKind,'error');
});

test('production countdown follows authoritative tick time and stays paused overnight',()=>{
  assert.equal(settlementHudProductionClock({daytime:true,secondsRemaining:60}).label,'1:00');
  assert.equal(settlementHudProductionClock({daytime:true,secondsRemaining:.01}).label,'0:01');
  assert.equal(settlementHudProductionClock({daytime:true,secondsRemaining:60,interval:60}).progress,0);
  assert.equal(settlementHudProductionClock({daytime:true,secondsRemaining:30,interval:60}).progress,.5);
  const sunset=settlementHudProductionClock({daytime:false,secondsRemaining:360,interval:60},'night');
  assert.equal(sunset.label,'6:00');assert.equal(sunset.progress,0);assert.match(sunset.description,/pauses at night/);
  assert.equal(settlementHudProductionClock({daytime:false,secondsRemaining:61},'night').label,'1:01');
});

test('estimated rates retain signs and meaningful positive, negative and neutral states',()=>{
  assert.deepEqual(settlementHudRate(12.36),{value:12.4,tone:'positive',label:'+12.4/min'});
  assert.deepEqual(settlementHudRate(-5),{value:-5,tone:'negative',label:'−5/min'});
  for(const input of [0,-.01,undefined,NaN,Infinity])assert.deepEqual(settlementHudRate(input),{value:0,tone:'zero',label:'+0/min'});
});

test('HUD city growth uses homes through each of the five three-home milestones',()=>{
  for(let houses=0;houses<=18;houses++){
    const state=settlementHudProgress(houses);
    assert.equal(state.level,Math.min(5,Math.floor(houses/3)));
    assert.equal(state.houses,houses);
    assert.equal(state.complete,houses>=15);
    if(houses<15){
      assert.equal(state.next,(state.level+1)*3);
      assert.equal(state.progress,(houses%3)/3);
    }else{
      assert.equal(state.next,null);assert.equal(state.progress,1);
    }
  }
});

test('HUD keeps incomplete outposts at level zero and handles unavailable counts',()=>{
  assert.deepEqual(settlementHudProgress(2),{houses:2,level:0,complete:false,progress:2/3,next:3});
  for(const value of [undefined,NaN,Infinity,-3])assert.deepEqual(settlementHudProgress(value),{houses:0,level:0,complete:false,progress:0,next:3});
});

test('railway guidance starts with a formed owned city and never offers an endpoint purchase',()=>{
  const empty=settlementHudRailway(null,{gold:20});
  assert.equal(empty.stage,'source');assert.equal(empty.cost,5);
  assert.equal(empty.status,'City at 3 homes');
  assert.equal(empty.canBuild,false);assert.equal(empty.showConfirm,false);
  const source=settlementHudRailway({hasCity:true,stage:'source',canBuild:true},{gold:20});
  assert.equal(source.selection,'New railway');assert.equal(source.status,'');
  assert.equal(source.canBuild,false);assert.equal(source.showConfirm,false);
  const destination=settlementHudRailway({hasCity:true,stage:'destination',sourceLabel:'Pine Town',canBuild:true},{gold:20});
  assert.equal(destination.selection,'Pine Town → …');
  assert.equal(destination.canBuild,false);assert.equal(destination.showConfirm,false);
  assert.equal(destination.status,'Choose destination');
  assert.equal(settlementHudRailway({hasCity:true,stage:'destination'},{gold:0}).status,destination.status,'free route exploration keeps its interaction hint before purchase');
  const hover=settlementHudRailway({hasCity:true,stage:'destination',hovering:true,siteValid:true,sourceLabel:'Pine Town',targetLabel:'River Village',reason:'Connect these cities'},{gold:0});
  assert.equal(hover.selection,'Pine Town → River Village');assert.equal(hover.status,'Preview');
  assert.equal(hover.statusKind,'info');assert.equal(hover.canBuild,false);assert.equal(hover.showConfirm,false);
});

test('railway confirmation requires a ready, valid, affordable preview',()=>{
  const preview={stage:'preview',hasCity:true,siteValid:true,canBuild:true,sourceLabel:'Pine Town',targetLabel:'River Village',cost:5,code:'ready',reason:'Connect these cities'};
  const ready=settlementHudRailway(preview,{gold:5});
  assert.equal(ready.canBuild,true);assert.equal(ready.showConfirm,true);
  assert.equal(ready.selection,'Pine Town → River Village');
  assert.equal(ready.status,'Ready');assert.equal(ready.statusKind,'success');
  for(const gold of [0,4,4.9,NaN,Infinity]){
    const state=settlementHudRailway(preview,{gold});
    assert.equal(state.canBuild,false);assert.equal(state.showConfirm,true);
    assert.match(state.status,/gold short/);assert.equal(state.statusKind,'cost');
  }
  const loading=settlementHudRailway(preview,{gold:20,ready:false});
  assert.equal(loading.canBuild,false);assert.equal(loading.status,'Preparing…');
  const noCity=settlementHudRailway({...preview,hasCity:false},{gold:20});
  assert.equal(noCity.canBuild,false);assert.equal(noCity.status,'City at 3 homes');
  const blocked=settlementHudRailway({...preview,siteValid:false,canBuild:false,code:'route-blocked',reason:'The route crosses a house.'},{gold:20});
  assert.equal(blocked.canBuild,false);assert.equal(blocked.status,'The route crosses a house');
  assert.equal(blocked.statusKind,'error');
});

test('missing gold is a cost hint and earning it never changes geometric validity',()=>{
  const route={stage:'preview',hasCity:true,siteValid:true,canBuild:false,cost:5,code:'not-enough-gold',reason:'A railway costs 5 gold'};
  const short=settlementHudRailway(route,{gold:3});
  assert.equal(short.status,'2 gold short');assert.equal(short.statusKind,'cost');
  assert.equal(short.missingGold,2);assert.equal(short.affordable,false);assert.equal(short.canBuild,false);
  const funded=settlementHudRailway({...route,canBuild:true,code:'ready'},{gold:5});
  assert.equal(funded.affordable,true);assert.equal(funded.missingGold,0);assert.equal(funded.canBuild,true);assert.equal(funded.statusKind,'success');
  const stillUnchecked=settlementHudRailway(route,{gold:5});
  assert.equal(stillUnchecked.canBuild,false,'funding cannot bypass controller validation');
  assert.equal(stillUnchecked.statusKind,'info');assert.equal(stillUnchecked.status,'Checking…');
});

test('an impossible local bend stays an error during dragging regardless of the wallet',()=>{
  const bend={stage:'planning',hasCity:true,siteValid:false,canBuild:false,code:'invalid-alignment',reason:'Give this bend more room.'};
  for(const gold of [0,3,5,100]){
    const state=settlementHudRailway(bend,{gold});
    assert.equal(state.status,'Give this bend more room');assert.equal(state.statusKind,'error');assert.equal(state.canBuild,false);
  }
  const selected=settlementHudRailway({...bend,stage:'preview'},{gold:3});
  assert.equal(selected.status,'Give this bend more room','a shortfall does not hide an impossible placement');
  assert.equal(selected.statusKind,'error');
});

test('range failures explain the unavailable city while hovering or selected, independently of gold',()=>{
  for(const stage of ['destination','preview'])for(const gold of [0,5,100]){
    const state=settlementHudRailway({stage,hovering:stage==='destination',hasCity:true,siteValid:false,canBuild:false,
      code:'out-of-range',reason:'City is outside railway range'},{gold});
    assert.equal(state.status,'City is outside railway range');assert.equal(state.statusKind,'error');
    assert.equal(state.canBuild,false);assert.equal(state.showConfirm,stage==='preview');
  }
});

test('worker and stale-world failures do not claim that placement is impossible',()=>{
  for(const code of ['planning-failed','world-changed']){
    const route={stage:'preview',hasCity:true,siteValid:false,canBuild:false,code,reason:'Route checks could not finish.'};
    const state=settlementHudRailway(route,{gold:20});
    assert.equal(state.status,'Route checks could not finish');assert.equal(state.statusKind,'info');assert.equal(state.canBuild,false);
  }
  const pending=settlementHudRailway({stage:'planning',hasCity:true,siteValid:true,canBuild:false,code:'not-enough-gold'},{gold:3});
  assert.equal(pending.status,'Checking…');assert.equal(pending.statusKind,'info');assert.equal(pending.canBuild,false);
});


test('loop construction and railway guidance use resources and the six-home station milestone',()=>{
  const state=settlementHudConstruction({economic:'loops',logs:99,buildCost:{resources:8},resources:{resources:5,food:10,gold:60}});
  assert.equal(state.costLabel,'8 resources');assert.equal(state.shortage,'3 more resources');assert.equal(state.affordable,false);
  assert.equal(settlementHudConstruction({economic:'loops',logs:0,resources:{resources:8},buildCost:{resources:8}}).affordable,true);
  assert.equal(settlementHudRailway({minHomes:6,hasCity:false}).status,'Station at 6 homes');
  const reverse=settlementHudRailway({stage:'preview',hasCity:true,siteValid:true,canBuild:true,canReverse:true,reversed:true,sourceLabel:'Village',targetLabel:'Your city',cost:11},{gold:60});
  assert.equal(reverse.selection,'Village → Your city');assert.equal(reverse.canReverse,true);assert.equal(reverse.reversed,true);assert.equal(reverse.canBuild,true);
});

// A narrow DOM fixture exercises live economy and tool changes, not only the
// construction copy helpers. The HUD still uses its actual production markup.
function hudDocument(){
  class Element{
    constructor(tag,doc){this.tagName=tag;this.ownerDocument=doc;this.children=[];this.parentElement=null;this.dataset={};this.attributes={};this.listeners=new Map();this.hidden=false;this.disabled=false;this.style={setProperty(name,value){this[name]=value;}};this._text='';this._html='';}
    append(...elements){for(const element of elements){element.parentElement=this;this.children.push(element);}}
    remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(child=>child!==this);}
    setAttribute(name,value){this.attributes[name]=value;if(name.startsWith('data-'))this.dataset[name.slice(5)]=value;if(name==='hidden')this.hidden=true;}
    getAttribute(name){return this.attributes[name];}
    set textContent(value){this._text=String(value);this.children=[];}
    get textContent(){return this._text+this.children.map(child=>child.textContent).join('');}
    set innerHTML(html){
      this._html=html;this.children=[];this._text='';const stack=[this];
      for(const match of html.matchAll(/<\/?([\w-]+)\b([^>]*?)>|([^<]+)/g)){
        if(match[3]){stack.at(-1)._text+=match[3];continue;}
        if(match[0].startsWith('</')){if(stack.length>1)stack.pop();continue;}
        const element=this.ownerDocument.createElement(match[1]);
        for(const attr of match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g))element.setAttribute(attr[1],attr[2]??'');
        stack.at(-1).append(element);if(!match[0].endsWith('/>'))stack.push(element);
      }
    }
    get innerHTML(){return this._html;}
    querySelectorAll(selector){const key=selector.match(/^\[([^\]]+)\]$/)?.[1];assert.ok(key);const result=[];for(const child of this.children){if(Object.hasOwn(child.attributes,key))result.push(child);result.push(...child.querySelectorAll(selector));}return result;}
    querySelector(selector){return this.querySelectorAll(selector)[0]??null;}
    addEventListener(name,fn){if(!this.listeners.has(name))this.listeners.set(name,new Set());this.listeners.get(name).add(fn);}
    removeEventListener(name,fn){this.listeners.get(name)?.delete(fn);}
  }
  const doc={createElement:tag=>new Element(tag,doc)};doc.body=doc.createElement('body');return doc;
}

test('the live ledger combines materials, mining changes the action, and legacy worlds retain logs and timber',async()=>{
  const {createSettlementHud}=await import('../src/settlement-hud.js'),previous=globalThis.document,doc=hudDocument();globalThis.document=doc;
  const hud=createSettlementHud({parent:doc.body});
  try{
    const nodes=Object.fromEntries(hud.root.querySelectorAll('[data-hud]').map(node=>[node.dataset.hud,node]));
    const buttons=Object.fromEntries(hud.root.querySelectorAll('[data-action]').map(node=>[node.dataset.action,node]));
    hud.update({economic:'loops',resources:{resources:21,food:7,gold:8},logs:99,gold:8,buildCost:{resources:8},cityHouses:29,targetOre:true});
    assert.equal(nodes['timber-label'].textContent,'Resources');assert.equal(nodes.logs.textContent,'21');assert.equal(nodes.food.textContent,'7');
    assert.equal(nodes['metal-stock'],undefined,'there is only one materials compartment');
    assert.equal(nodes['gold-stock'].hidden,false);assert.equal(nodes['gold-stock'].getAttribute('aria-hidden'),'false');assert.equal(nodes.gold.textContent,'8');assert.equal(nodes['gold-rate'].textContent,'+0/min');assert.match(nodes.announcements.textContent,/8 gold/);assert.doesNotMatch(nodes['gold-stock'].getAttribute('aria-label'),/earn|income|sunset/i);assert.equal(hud.showIncome({amount:99}),false);
    assert.equal(nodes['wood-stock'].dataset.resource,'resources');assert.equal(nodes['city-progress'].textContent,'29');
    assert.match(nodes['stock-symbol'].innerHTML,/data-material="wood"/);assert.match(nodes['stock-symbol'].innerHTML,/data-material="ore"/);
    assert.equal(nodes['cost-symbol'].innerHTML,nodes['stock-symbol'].innerHTML);assert.equal(nodes['house-cost'].parentElement.getAttribute('aria-label'),'8 resources');
    assert.equal(buttons.axe.querySelector('[data-action-label]').textContent,'Mine');assert.match(buttons.axe.getAttribute('aria-label'),/Mine nearby ore/);
    assert.equal(hud.root.dataset.target,'true');
    hud.update({resources:{resources:0,food:1,gold:8,resourceNet:-7},rates:{resources:-5,food:2.5,gold:-2},buildCost:{resources:8,food:2},productionClock:{daytime:false,secondsRemaining:360,interval:60},dayPhase:'night'});
    assert.equal(nodes.logs.textContent,'0','obsolete net/debt fields cannot replace the actual balance');assert.equal(nodes.logs.dataset.negative,undefined);assert.equal(nodes['resources-rate'].textContent,'−5/min');assert.equal(nodes['resources-rate'].dataset.tone,'negative');
    assert.equal(nodes['food-rate'].textContent,'+2.5/min');assert.equal(nodes['food-rate'].dataset.tone,'positive');
    assert.equal(nodes['gold-rate'].textContent,'−2/min');assert.equal(nodes['gold-rate'].dataset.tone,'negative');assert.match(nodes['resources-rate'].title,/Estimated.*train transfers/);assert.equal(nodes['production-clock'].dataset.paused,'true');assert.equal(nodes['clock-time'].textContent,'6:00');
    assert.doesNotMatch(nodes['resources-rate'].title,/upkeep|debt/i);assert.doesNotMatch(nodes['resources-rate'].getAttribute('aria-label'),/upkeep|debt/i);
    assert.equal(nodes['food-cost'].hidden,false);assert.equal(nodes['house-food-cost'].textContent,'2');assert.equal(nodes['house-cost'].parentElement.getAttribute('aria-label'),'8 resources + 2 food');assert.equal(hud.root.dataset.affordable,'false');
    hud.update({resources:{resources:0,food:1,gold:50},productionClock:{daytime:true,secondsRemaining:59,interval:60},dayPhase:'day'});assert.equal(nodes.gold.textContent,'50','the loop wallet overrides the legacy Gold prop');assert.equal(nodes['clock-time'].textContent,'0:59');assert.equal(nodes['production-clock'].dataset.paused,'false');
    hud.update({targetOre:false,targetTree:false});assert.equal(buttons.axe.querySelector('[data-action-label]').textContent,'Chop');assert.match(buttons.axe.getAttribute('aria-label'),/Chop trees or mine ore/);assert.equal(hud.root.dataset.target,'false');
    hud.update({economic:false,logs:5,buildCost:{timber:10}});assert.equal(nodes['timber-label'].textContent,'Logs');assert.equal(nodes.logs.textContent,'5');assert.equal(nodes['food-stock'].hidden,true);assert.equal(nodes['resources-rate'].hidden,true);assert.equal(nodes['gold-rate'].hidden,true);assert.equal(nodes['production-clock'].hidden,true);assert.equal(nodes['gold-stock'].hidden,false);assert.equal(nodes['gold-stock'].getAttribute('aria-hidden'),'false');assert.match(nodes.announcements.textContent,/8 gold/);
    assert.doesNotMatch(nodes['stock-symbol'].innerHTML,/data-material="ore"/);assert.equal(nodes['house-cost'].parentElement.getAttribute('aria-label'),'10 logs');
    hud.update({economic:true,logs:8,resources:{tools:1},buildCost:{timber:8,tools:2}});assert.equal(nodes['timber-label'].textContent,'Timber');assert.equal(hud.root.dataset.affordable,'false');assert.match(buttons.house.getAttribute('aria-label'),/Need 1 more tool/);
  }finally{hud.dispose();if(previous===undefined)delete globalThis.document;else globalThis.document=previous;}
});
