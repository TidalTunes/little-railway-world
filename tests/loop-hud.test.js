import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,OrthographicCamera,Vector3} from 'three';
import {createLoopHud} from '../src/loop-hud.js';
import {createLoopHudAnchor} from '../src/loop-hud-anchor.js';
import {surfacePoint,surfaceNormal} from '../src/world-surface.js';

// A small DOM fixture handles the HUD's actual markup and event lifecycle;
// scene projection uses real Three cameras and surface transforms below.
function documentFixture(){
  class Element{
    constructor(tag,document){this.tagName=tag;this.ownerDocument=document;this.children=[];this.parentElement=null;this.dataset={};this.attributes={};this.listeners=new Map();this.hidden=false;this.disabled=false;this.style={setProperty(name,value){this[name]=value;}};this._text='';this._html='';}
    append(...elements){for(const element of elements){element.parentElement=this;this.children.push(element);}}
    remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(child=>child!==this);this.parentElement=null;}
    setAttribute(name,value){this.attributes[name]=value;if(name.startsWith('data-'))this.dataset[name.slice(5)]=value;if(name==='hidden')this.hidden=true;}
    getAttribute(name){return this.attributes[name]??null;}
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
    querySelectorAll(selector){assert.equal(selector,'[data-loop]');const result=[];for(const child of this.children){if(child.dataset.loop)result.push(child);result.push(...child.querySelectorAll(selector));}return result;}
    addEventListener(name,fn){if(!this.listeners.has(name))this.listeners.set(name,new Set());this.listeners.get(name).add(fn);}
    removeEventListener(name,fn){this.listeners.get(name)?.delete(fn);}
    dispatch(name){const event={stopped:false,stopPropagation(){this.stopped=true;}};for(let target=this;target;target=target.parentElement){for(const fn of target.listeners.get(name)??[])fn(event);if(event.stopped)break;}return event;}
  }
  const document={createElement(tag){return new Element(tag,document);}};document.body=document.createElement('body');return document;
}

const loop={id:'forest-farm',cost:20,cityIds:['home','farm'],stops:[{cityId:'home',resource:'resources'},{cityId:'farm',resource:'food'}]};
const alternate={...loop,id:'forest-mine',cost:30};
const city={id:'home',ownerId:'teal',resource:'resources',level:2,houseCount:6,x:0,y:.6,z:0,loops:[loop,alternate]};
const viewport={width:800,height:600};
function cameraFixture(){const camera=new PerspectiveCamera(50,4/3,.1,1000);camera.position.set(0,30,40);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);return camera;}
function fixture(){
  const document=documentFixture(),buys=[],cycles=[],closed=[],camera=cameraFixture();
  const hud=createLoopHud({parent:document.body,world:{},ownerId:'teal',onBuyTrain:(...args)=>buys.push(args),onCycle:delta=>cycles.push(delta),onClose:()=>closed.push(true)});
  const nodes=Object.fromEntries(hud.root.querySelectorAll('[data-loop]').map(node=>[node.dataset.loop,node]));
  const props={city,ownCity:city,selectedLoopId:loop.id,resources:{resources:20},walking:false,tool:'axe',camera,viewport,anchor:{x:5,y:.6,z:2},candidateIds:[loop.id]};
  return{document,hud,nodes,buys,cycles,closed,camera,props};
}

test('rail actions project the real surface point and follow perspective camera movement',()=>{
  const project=createLoopHudAnchor({}),camera=cameraFixture(),anchor={x:7,y:1,z:-4};
  function expected(){const point=new Vector3(anchor.x,anchor.y,anchor.z).project(camera);return{x:(point.x+1)*viewport.width/2,y:(1-point.y)*viewport.height/2};}
  const first={...project(anchor,camera,viewport)},a=expected();assert.ok(Math.abs(first.x-a.x)<1e-8);assert.ok(Math.abs(first.y-a.y)<1e-8);
  camera.position.x+=12;camera.updateMatrixWorld(true);const second=project(anchor,camera,viewport),b=expected();
  assert.ok(Math.abs(second.x-b.x)<1e-8);assert.ok(Math.abs(second.y-b.y)<1e-8);assert.notEqual(second.x,first.x);
  assert.equal(project({x:10000,z:0},camera,viewport),null);
  assert.equal(project({x:NaN,z:0},camera,viewport),null);assert.equal(project(anchor,camera,{width:0,height:600}),null);
  const behind=camera.position.clone().add(new Vector3(0,0,20).applyQuaternion(camera.quaternion));
  assert.equal(project(behind,camera,viewport),null,'an anchor behind the eye cannot remain clickable');
});

test('globe anchors are surface-projected and disappear behind the horizon',()=>{
  const radius=100,world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  const anchor={x:12,y:.6,z:8},point=surfacePoint(world,anchor.x,anchor.y,anchor.z),normal=surfaceNormal(world,anchor.x,anchor.z);
  const camera=new OrthographicCamera(-150,150,100,-100,.1,1000);camera.position.copy(point).addScaledVector(normal,400);camera.lookAt(point);camera.updateMatrixWorld(true);
  const project=createLoopHudAnchor(world),position=project(anchor,camera,viewport);
  assert.ok(Math.abs(position.x-400)<1e-8);assert.ok(Math.abs(position.y-300)<1e-8);
  camera.position.copy(point).addScaledVector(normal,-400);camera.lookAt(point);camera.updateMatrixWorld(true);
  assert.equal(project(anchor,camera,viewport),null);
});

test('purchase button and Enter action share explicit selection and affordability guards',()=>{
  const{hud,nodes,buys,props}=fixture();
  try{
    assert.equal(hud.buySelected(),false);
    hud.update({...props,selectedLoopId:null});assert.equal(hud.root.hidden,false);assert.equal(nodes.route.hidden,true);assert.equal(nodes.city.hidden,false);assert.equal(hud.buySelected(),false);
    hud.update({...props,resources:{resources:19}});assert.equal(hud.selectedLoopId,loop.id);assert.equal(nodes.buy.disabled,true);assert.equal(nodes.shortfall.hidden,false);assert.equal(nodes.shortfall.textContent,'1 more resources');
    assert.equal(hud.buySelected(),false);nodes.buy.dispatch('click');assert.equal(buys.length,0);
    hud.update(props);assert.equal(nodes.buy.disabled,false);assert.equal(nodes.shortfall.hidden,true);assert.equal(nodes.cost.textContent,'20');assert.equal(nodes.buy.getAttribute('aria-label'),'Add train · 20 resources. Picks up 1 available Resources or Food per destination and delivers it home. Reserves 1 Gold per lap at departure. Empty stops refund their fare. A train without enough Gold at departure is destroyed.');
    assert.equal(hud.buySelected(),true);nodes.buy.dispatch('click');assert.deepEqual(buys,[[city.id,loop.id],[city.id,loop.id]]);
    hud.update({...props,selectedLoopId:'removed'});assert.equal(hud.selectedLoopId,null);assert.equal(hud.buySelected(),false);
    const foreign={...city,ownerId:'coral'};hud.update({...props,city:foreign,ownCity:foreign});assert.equal(hud.buySelected(),false);assert.equal(nodes.buy.disabled,true);
  }finally{hud.dispose();}
});

test('hidden route actions cannot buy during walking, tool changes, transitions or lost projection',()=>{
  const{hud,nodes,buys,props}=fixture();
  try{
    for(const patch of [{walking:true},{transitioning:true},{tool:'railway'},{anchor:null},{anchor:{x:10000,z:0}},{camera:null},{viewport:{width:0,height:600}}]){
      hud.update(props);assert.equal(hud.root.hidden,false);
      hud.update({...props,...patch});assert.equal(hud.root.hidden,true);assert.equal(hud.buySelected(),false);nodes.buy.dispatch('click');
    }
    assert.deepEqual(buys,[]);hud.update(props);assert.equal(hud.buySelected(),true);
  }finally{hud.dispose();}
});

test('projected action position updates without a state change and keeps its real anchor near edges',()=>{
  const{hud,props,camera}=fixture();
  try{
    hud.update(props);const old=Number.parseFloat(hud.root.style.left);camera.position.x+=8;camera.updateMatrixWorld(true);hud.update(props);
    assert.notEqual(Number.parseFloat(hud.root.style.left),old,'unchanged selection does not freeze projection');
    const flat=new OrthographicCamera(-100,100,75,-75,.1,1000);flat.position.set(0,100,0);flat.up.set(0,0,-1);flat.lookAt(0,0,0);flat.updateMatrixWorld(true);
    hud.update({...props,camera:flat,anchor:{x:98,y:.6,z:-70}});
    assert.equal(hud.root.hidden,false);assert.equal(hud.root.dataset.below,'true');
    const left=Number.parseFloat(hud.root.style.left),offset=Number.parseFloat(hud.root.style['--loop-anchor-x']);
    assert.ok(left<=viewport.width-96);assert.ok(Math.abs(left+offset-792)<.01,'the connecting stem still points to the clicked rail');
  }finally{hud.dispose();}
});

test('circuit cycling, event containment and disposal release the action controls',()=>{
  const{document,hud,nodes,props,buys,cycles,closed}=fixture();let worldClicks=0;document.body.addEventListener('click',()=>worldClicks++);
  hud.update({...props,candidateIds:[loop.id,alternate.id]});assert.equal(nodes.alternatives.hidden,false);assert.equal(nodes.index.textContent,'1/2');
  nodes.previous.dispatch('click');nodes.next.dispatch('click');nodes.close.dispatch('click');assert.deepEqual(cycles,[-1,1]);assert.deepEqual(closed,[true]);assert.equal(worldClicks,0);
  hud.update({...props,selectedLoopId:alternate.id,resources:{resources:30},candidateIds:[loop.id,alternate.id]});assert.equal(nodes.index.textContent,'2/2');assert.equal(hud.buySelected(),true);assert.deepEqual(buys,[[city.id,alternate.id]]);
  hud.dispose();assert.equal(document.body.children.length,0);assert.equal(hud.buySelected(),false);
  for(const node of [hud.root,...Object.values(nodes)])for(const listeners of node.listeners.values())assert.equal(listeners.size,0);
  nodes.buy.dispatch('click');nodes.previous.dispatch('click');nodes.close.dispatch('click');hud.update(props);
  assert.equal(buys.length,1);assert.deepEqual(cycles,[-1,1]);assert.deepEqual(closed,[true]);
});


test('route details show finite pickups, flat purchase price and reserved Gold without minted station bonuses',()=>{
  const {hud,nodes,props}=fixture();
  try{
    hud.update(props);assert.doesNotMatch(nodes.buy.title,/bonus|earn|upkeep|debt|per cargo car/i);
    assert.match(nodes.buy.title,/20 resources/);assert.match(nodes.buy.title,/Picks up 1 available Resources or Food per destination/);
    assert.match(nodes.fare.title,/Reserves 1 Gold per lap/);assert.equal(nodes.departure.textContent,'1 / lap');assert.equal(nodes.status.hidden,true);
    hud.update({...props,selectedLoopId:null});assert.equal(nodes.operation.hidden,true);assert.equal(nodes.city.textContent.trim(),'Resources');
    hud.update({...props,selectedLoopId:null,city:{...city,neutral:true,resource:'food',ownerId:'gray',stock:{food:13}}});assert.match(nodes.city.textContent,/Food.*13/);assert.match(nodes.city.innerHTML,/13 Food available/);
    hud.update({...props,selectedLoopId:null,city:{...city,neutral:true,resource:'food',ownerId:'gray',stock:{food:0}}});assert.match(nodes.city.textContent,/Food.*0/);
  }finally{hud.dispose();}
});

test('live route status updates independently from the price and permits buying before Gold is available',()=>{
  const {hud,nodes,props}=fixture(),train={loopId:loop.id,homeCityId:city.id,state:'queued',active:false};
  try{
    hud.update({...props,resources:{resources:20,gold:0},trains:[train]});assert.equal(nodes.buy.disabled,false);assert.equal(nodes.status.hidden,false);assert.equal(nodes.status.textContent,'1 queued');
    hud.update({...props,trains:[{...train,active:true,state:'moving',blocked:true,waitReason:'traffic'}]});assert.equal(nodes.status.textContent,'1 in traffic');
    hud.update({...props,trains:[{...train,active:true,state:'dwell'}]});assert.equal(nodes.status.textContent,'1 loading');
    hud.update({...props,trains:[{...train,active:true,state:'moving'}]});assert.equal(nodes.status.textContent,'1 running');
    hud.update({...props,trains:[]});assert.equal(nodes.status.hidden,true);
  }finally{hud.dispose();}
});
