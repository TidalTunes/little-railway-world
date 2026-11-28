import test from 'node:test';
import assert from 'node:assert/strict';
import {createMilitaryHud,MILITARY_PURCHASES} from '../src/military-hud.js';
import {MILITARY_RULES} from '../src/military-simulation.js';

function documentFixture(){
  class Element{
    constructor(tag,doc){this.tagName=tag;this.ownerDocument=doc;this.children=[];this.parentElement=null;this.dataset={};this.attributes={};this.listeners=new Map();this.hidden=false;this.disabled=false;this.style={setProperty(name,value){this[name]=value;}};this._text='';}
    append(...items){for(const item of items){item.parentElement=this;this.children.push(item);}}
    remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(child=>child!==this);this.parentElement=null;}
    setAttribute(name,value){this.attributes[name]=value;if(name.startsWith('data-'))this.dataset[name.slice(5)]=value;if(name==='hidden')this.hidden=true;if(name==='disabled')this.disabled=true;}
    getAttribute(name){return this.attributes[name]??null;}
    set textContent(value){this._text=String(value);this.children=[];}
    get textContent(){return this._text+this.children.map(child=>child.textContent).join('');}
    set innerHTML(html){this.children=[];this._text='';const stack=[this];for(const match of html.matchAll(/<\/?([\w-]+)\b([^>]*?)>|([^<]+)/g)){
      if(match[3]){stack.at(-1)._text+=match[3];continue;}if(match[0].startsWith('</')){if(stack.length>1)stack.pop();continue;}
      const item=this.ownerDocument.createElement(match[1]);for(const attr of match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g))item.setAttribute(attr[1],attr[2]??'');
      stack.at(-1).append(item);if(!match[0].endsWith('/>')&&!['img','input','br'].includes(match[1]))stack.push(item);
    }}
    querySelectorAll(selector){assert.equal(selector,'[data-military]');const found=[];for(const child of this.children){if(child.dataset.military)found.push(child);found.push(...child.querySelectorAll(selector));}return found;}
    addEventListener(name,fn){if(!this.listeners.has(name))this.listeners.set(name,new Set());this.listeners.get(name).add(fn);}
    removeEventListener(name,fn){this.listeners.get(name)?.delete(fn);}
    dispatch(name){const event={stopped:false,stopPropagation(){this.stopped=true;}};for(let node=this;node;node=node.parentElement){for(const fn of node.listeners.get(name)??[])fn(event);if(event.stopped)break;}return event;}
  }
  const document={createElement:tag=>new Element(tag,document)};document.body=document.createElement('body');return document;
}
function fixture(){const document=documentFixture(),buys=[];const hud=createMilitaryHud({parent:document.body,onBuy:kind=>buys.push(kind),team:'teal'});const nodes=Object.fromEntries(hud.root.querySelectorAll('[data-military]').map(node=>[node.dataset.military,node]));return{document,hud,nodes,buys};}

test('military purchases use the combat prices and refuse unavailable or unaffordable purchases',()=>{
  const {hud,nodes,buys}=fixture();
  try{
    assert.equal(hud.buy('soldier'),false);assert.match(nodes.zone.textContent,/Spawn zone.*½ damage/);
    for(const unit of MILITARY_PURCHASES){assert.equal(unit.resources,MILITARY_RULES[unit.kind].cost.resources);assert.equal(unit.food,MILITARY_RULES[unit.kind].cost.food);assert.equal(nodes[unit.kind].getAttribute('aria-keyshortcuts'),unit.key);}
    hud.update({resources:20,food:0,available:true});assert.equal(nodes.soldier.disabled,true);assert.equal(nodes.tank.disabled,false);
    nodes.soldier.dispatch('click');assert.deepEqual(buys,[]);assert.match(nodes.soldier.title,/Needs 1 more Food/);
    nodes.tank.dispatch('click');assert.deepEqual(buys,['tank']);
    hud.update({resources:1,food:1,available:true});assert.equal(hud.buy('soldier'),true);assert.equal(hud.buy('tank'),false);assert.equal(nodes.tank.disabled,true);assert.match(nodes.tank.title,/19 more Resources/);
    hud.update({resources:100,food:100,available:false});assert.equal(hud.buy('helicopter'),false);assert.match(nodes.helicopter.title,/No spawn zone/);
    hud.update({resources:100,food:100,available:false,disabledReason:'Changing view'});assert.match(nodes.tank.title,/Changing view/);assert.doesNotMatch(nodes.tank.title,/No spawn zone/);
    hud.update({resources:100,food:100,visible:false});assert.equal(hud.buy('helicopter'),false);
    assert.deepEqual(buys,['tank','soldier']);assert.equal(hud.buy('unknown'),false);
  }finally{hud.dispose();}
});

test('portraits, selection and protection remain compact and update without replacing the buttons',()=>{
  const {hud,nodes}=fixture();
  try{
    hud.setPortraits({tank:'data:image/png;base64,AAA',soldier:'https://example.invalid/icon.png'});
    assert.equal(nodes['tank-portrait'].hidden,false);assert.equal(nodes['tank-portrait'].src,'data:image/png;base64,AAA');assert.equal(nodes['soldier-portrait'].hidden,true);
    hud.update({resources:{resources:40,food:12},selectedCount:5,shieldedCount:2,counts:{tank:3,soldier:2},walking:false});
    assert.equal(nodes.selection.hidden,false);assert.equal(nodes.selected.textContent,'5 selected');assert.equal(nodes.protected.hidden,false);assert.match(nodes.protected.title,/2 units.*Half damage/);
    assert.equal(nodes['tank-count'].textContent,'3');assert.equal(nodes['tank-count'].hidden,false);assert.equal(nodes['artillery-count'].hidden,true);assert.equal(nodes.helicopter.disabled,false);
    hud.update({resources:40,food:12,selectedCount:0,counts:{},walking:true,feedback:'Spawn zone is full'});
    assert.equal(nodes.selection.hidden,true);assert.equal(nodes.feedback.textContent,'Spawn zone is full');assert.equal(nodes.feedback.hidden,false);assert.equal(hud.root.dataset.walking,'true');assert.equal(nodes['tank-count'].hidden,true);
    hud.update({resources:40,food:12,selectedCount:1,shieldedCount:99});assert.match(nodes.protected.title,/1 unit in/);assert.equal(nodes.feedback.hidden,true);
  }finally{hud.dispose();}
});

test('unit button interactions stay out of world selection and disposal removes every listener',()=>{
  const {document,hud,nodes,buys}=fixture();let worldClicks=0;document.body.addEventListener('click',()=>worldClicks++);
  hud.update({resources:100,food:100});nodes.artillery.dispatch('click');assert.equal(worldClicks,0);assert.deepEqual(buys,['artillery']);
  assert.equal(nodes.tank.dispatch('pointerdown').stopped,true);assert.equal(nodes.tank.dispatch('contextmenu').stopped,true);
  hud.dispose();hud.dispose();assert.equal(document.body.children.length,0);assert.equal(hud.buy('tank'),false);
  nodes.tank.dispatch('click');hud.update({resources:100,food:100});hud.setPortraits({tank:'data:image/png;base64,BBB'});assert.deepEqual(buys,['artillery']);
  for(const node of [hud.root,...Object.values(nodes)])for(const listeners of node.listeners.values())assert.equal(listeners.size,0);
});
