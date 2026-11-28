import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,OrthographicCamera} from 'three';
import {createResourceGainQueue,createResourceGainEffects} from '../src/resource-gain-effects.js';

function documentFixture(){
  class Element{
    constructor(tag){this.tagName=tag;this.children=[];this.style={};this.dataset={};this.hidden=false;this.parentElement=null;this.textContent='';}
    setAttribute(name,value){this[name]=value;}
    append(...elements){for(const element of elements)this.appendChild(element);}
    appendChild(element){this.children.push(element);element.parentElement=this;return element;}
    remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(item=>item!==this);this.parentElement=null;}
  }
  return{body:new Element('body'),createElement:tag=>new Element(tag)};
}
function fixture(){
  const document=documentFixture(),effects=createResourceGainEffects({}, {document}),camera=new PerspectiveCamera(50,1,.1,1000);
  camera.position.set(0,25,30);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  return{document,effects,camera,options:{camera,viewport:{left:10,top:20,width:800,height:800}}};
}
const gain=(overrides={})=>({id:'cut-1',ownerId:'teal',kind:'production',x:0,y:0,z:0,resource:'resources',amount:1,...overrides});

test('only actual positive finite resource events create receipts, with exact unrounded amounts',()=>{
  const queue=createResourceGainQueue();
  for(const patch of [{amount:0},{amount:-1},{amount:NaN},{amount:Infinity},{x:NaN},{z:Infinity},{y:NaN},{resource:'unknown'}])assert.equal(queue.emit(gain(patch)),null);
  assert.equal(queue.active.length,0);
  queue.emit(gain({amount:1.25}));assert.equal(queue.active[0].resources.resources,1.25);
  assert.equal(queue.emit(gain({amount:1.25})),null,'re-reading a unique event must not invent a second gain');
});

test('nearby bursts merge without mixing owners, collected cargo, or credited resources',()=>{
  const queue=createResourceGainQueue();
  queue.emit(gain());queue.emit(gain({id:'cut-2',x:2,amount:3}));assert.equal(queue.active.length,1);assert.deepEqual(queue.active[0].resources,{resources:4});
  queue.emit(gain({id:'train',kind:'pickup',resources:{resources:20,food:0,gold:0}}));
  queue.emit(gain({id:'return',kind:'delivery',resources:{resources:20}}));
  queue.emit(gain({id:'other',ownerId:'blue'}));assert.equal(queue.active.length,4);
  queue.update(.5);queue.emit(gain({id:'cut-3'}));assert.equal(queue.active.length,5,'a later collection gets its own receipt');
  queue.update(3);assert.equal(queue.active.length,0);assert.equal(queue.emit(gain()),null,'expiry does not permit replaying the same authoritative event');
});

test('legacy timber and ore receipts combine once while canonical resources remain authoritative',()=>{
  const queue=createResourceGainQueue({mergeWindow:0});
  const old=queue.emit(gain({resources:{wood:2,metal:3,food:4},amount:99}));
  assert.deepEqual(old.resources,{resources:5,food:4},'the explicit receipt does not repeat its single-resource fallback');
  const canonical=queue.emit(gain({id:'new',x:10,resources:{resources:7,wood:2,metal:3,gold:1}}));
  assert.deepEqual(canonical.resources,{resources:7,gold:1});
  assert.equal(queue.emit(gain({id:'ore',x:20,resource:'metal',amount:2})).resources.resources,2);
});

test('sustained production stays bounded in both active receipts and duplicate history',()=>{
  const queue=createResourceGainQueue({maxActive:6,maxRemembered:16});
  for(let i=0;i<500;i++)queue.emit(gain({id:`work-${i}`,x:i*4}));
  assert.equal(queue.active.length,6);assert.equal(queue.remembered,16);assert.equal(queue.active[0].x,494*4);
  queue.clear();assert.equal(queue.active.length,0);assert.equal(queue.remembered,16);
  queue.dispose();assert.equal(queue.remembered,0);
});

test('all resource icons and exact quantities share one projection in map and detailed strategy views',()=>{
  const{document,effects,options}=fixture();effects.emit(gain({kind:'pickup',resources:{resources:30,food:30,gold:0}}));
  effects.update(.2,{...options,mapBlend:0});assert.equal(effects.visibleCount,1);
  const popup=document.body.children[0].children[0],values=popup.children[0].children;
  assert.equal(popup.children.length,1,'resource rows have no caption');assert.equal(values.length,3);assert.equal(values[0].children[1].textContent,'30');assert.equal(values[1].children[1].textContent,'30');assert.equal(values[2].hidden,true);
  assert.match(values[0].children[0].innerHTML,/data-material="wood"/);assert.match(values[0].children[0].innerHTML,/data-material="ore"/);
  effects.update(.1,{...options,mapBlend:.5});assert.equal(effects.visibleCount,1,'a render-layer transition cannot double the receipt');
  effects.update(.1,{...options,mapBlend:1});assert.equal(effects.visibleCount,1);assert.match(popup.style.transform,/410\.00px/,'canvas left offset is included');
  effects.dispose();assert.equal(document.body.children.length,0);
});

test('third-person and off-screen gains stay hidden, age normally, and do not replay after expiry',()=>{
  const{effects,options}=fixture();effects.emit(gain());effects.emit(gain({id:'distant',x:10000}));
  effects.update(.2,options);assert.equal(effects.visibleCount,1);
  effects.update(.1,{...options,walkingWeight:1});assert.equal(effects.visibleCount,0);assert.equal(effects.active,true);
  effects.update(3,{...options,walkingWeight:1});effects.update(.1,options);assert.equal(effects.visibleCount,0);assert.equal(effects.active,false);
  assert.equal(effects.emit(gain()),null);effects.dispose();assert.equal(effects.emit(gain({id:'late'})),null);
});

test('gathering uses a single unlabelled resource symbol and DOM slots are reused',()=>{
  const{document,effects,options}=fixture();effects.emit(gain({kind:'gathered'}));effects.emit(gain({kind:'production'}));effects.update(.2,options);
  const slots=document.body.children[0].children;assert.equal(slots.length,2);
  for(const slot of slots){assert.equal(slot.children.length,1);assert.equal(slot.children[0].children.filter(value=>!value.hidden).length,1);assert.equal(slot.children[0].children[0].children[1].hidden,true);}
  assert.notEqual(slots[0].style.transform,slots[1].style.transform);
  effects.update(3,options);effects.emit(gain({id:'new-work'}));effects.update(.2,options);assert.equal(effects.stats.allocated,2);assert.equal(effects.visibleCount,1);assert.equal(slots[1].hidden,true);effects.dispose();
});

test('merged NPC gathering remains icon-only while train counts stay exact without plus prefixes',()=>{
  const{document,effects,options}=fixture();
  effects.emit(gain({id:'gather-1',kind:'gathered'}));effects.emit(gain({id:'gather-2',kind:'gathered'}));
  effects.emit(gain({id:'cargo',kind:'pickup',resources:{resources:11,food:2.5,gold:3}}));effects.update(.2,options);
  const slots=document.body.children[0].children,gathered=slots[0].children[0].children,cargo=slots[1].children[0].children;
  assert.equal(gathered[0].children[1].hidden,true);assert.equal(gathered[0].children[1].textContent,'');
  assert.equal(cargo[0].children[1].textContent,'11');assert.equal(cargo[1].children[1].textContent,'2.5');assert.equal(cargo[2].children[1].textContent,'3');
  effects.dispose();
});

test('simultaneous train and gold rows keep a gap without displacing separate small symbols',()=>{
  const{document,effects}=fixture(),camera=new OrthographicCamera(-50,50,50,-50,.1,1000);
  camera.position.set(0,100,0);camera.up.set(0,0,-1);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const options={camera,viewportWidth:800,viewportHeight:800,reducedMotion:true};
  effects.emit(gain({kind:'pickup',resources:{resources:20,food:10,gold:3}}));effects.emit(gain({id:'gold',kind:'gold',resource:'gold',amount:3,x:8}));
  effects.update(.2,options);
  const ys=()=>document.body.children[0].children.filter(slot=>!slot.hidden).map(slot=>Number(slot.style.transform.match(/translate3d\([^,]+,([^p]+)px/)[1]));
  const broad=ys();assert.ok(broad[0]-20-broad[1]>=7,'a broad train row keeps the nearby gold popup outside its bounds');
  effects.update(3,options);effects.emit(gain({id:'single',kind:'gathered'}));effects.emit(gain({id:'apart',kind:'gathered',x:10}));effects.update(.2,options);
  const separate=ys();assert.equal(separate[0],separate[1],'small separated resource symbols stay at their sources');
  assert.equal(effects.stats.allocated,2);effects.dispose();
});

test('reduced-motion receipts stay anchored and support orthographic cameras',()=>{
  const{document,effects}=fixture(),camera=new OrthographicCamera(-15,15,15,-15,.1,1000);camera.position.set(0,25,30);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const options={camera,viewportWidth:800,viewportHeight:800,reducedMotion:true};effects.emit(gain());effects.update(.2,options);const popup=document.body.children[0].children[0],before=popup.style.transform;
  effects.update(.8,options);assert.equal(popup.style.transform,before);assert.equal(effects.visibleCount,1);effects.dispose();
});

test('globe receipts use the curved surface and cannot show through the far hemisphere',()=>{
  const radius=100,world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  const document=documentFixture(),effects=createResourceGainEffects(world,{document}),camera=new PerspectiveCamera(50,1,.1,1000);
  camera.position.set(0,200,0);camera.up.set(0,0,-1);camera.lookAt(0,-100,0);camera.updateMatrixWorld(true);
  effects.emit(gain({id:'near'}));effects.emit(gain({id:'far',x:Math.PI*radius}));effects.update(.2,{camera,viewportWidth:800,viewportHeight:800,mapBlend:1});
  assert.equal(effects.visibleCount,1);assert.equal(effects.stats.active,2);effects.dispose();
});
