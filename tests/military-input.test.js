import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createMilitaryInput,pickMilitaryUnit,militaryUnitsInBox} from '../src/military-input.js';

// Model real capture -> target capture -> target bubble -> ancestor bubble.
// Node EventTarget alone does not expose the pointer leak this guards against.
class Surface{
  constructor(parent=null){this.parent=parent;this.listeners=new Map();this.children=[];this.style={};this.hidden=false;}
  addEventListener(type,fn,options={}){const list=this.listeners.get(type)??[];list.push({fn,capture:options===true||options.capture===true});this.listeners.set(type,list);}
  removeEventListener(type,fn,options={}){const capture=options===true||options.capture===true;this.listeners.set(type,(this.listeners.get(type)??[]).filter(entry=>entry.fn!==fn||entry.capture!==capture));}
  append(...children){for(const child of children){child.parent=this;this.children.push(child);}}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(child=>child!==this);this.parent=null;}
  dispatch(type,properties={}){
    const event={type,target:this,button:0,buttons:0,pointerId:1,pointerType:'mouse',clientX:100,clientY:100,pageX:100,pageY:100,shiftKey:false,ctrlKey:false,metaKey:false,altKey:false,
      defaultPrevented:false,stopped:false,immediate:false,...properties,
      preventDefault(){this.defaultPrevented=true;},stopPropagation(){this.stopped=true;},stopImmediatePropagation(){this.stopped=true;this.immediate=true;}};
    const ancestors=[];for(let node=this.parent;node;node=node.parent)ancestors.push(node);
    function invoke(node,capture){event.currentTarget=node;for(const entry of [...node.listeners.get(type)??[]]){if(event.immediate)break;if(entry.capture===capture)entry.fn(event);}}
    for(const node of [...ancestors].reverse()){if(event.stopped)break;invoke(node,true);}
    if(!event.stopped)invoke(this,true);
    if(!event.stopped)invoke(this,false);
    for(const node of ancestors){if(event.stopped)break;invoke(node,false);}
    return event;
  }
}
function fixture(t){
  const window=new Surface(),document=new Surface(window),body=new Surface(document),canvas=new Surface(body);document.defaultView=window;document.body=body;body.append(canvas);
  document.createElement=()=>new Surface();canvas.ownerDocument=document;canvas.clientWidth=1000;canvas.clientHeight=750;canvas.getBoundingClientRect=()=>({left:0,top:0,width:1000,height:750});
  const captured=new Set();canvas.setPointerCapture=id=>captured.add(id);canvas.releasePointerCapture=id=>captured.delete(id);canvas.focus=()=>{};
  const camera=new THREE.PerspectiveCamera(45,4/3,.1,1000);camera.position.set(20,30,40);camera.lookAt(0,0,0);
  const controls=new OrbitControls(camera,canvas);controls.enableDamping=false;controls.mouseButtons.LEFT=null;controls.mouseButtons.MIDDLE=THREE.MOUSE.ROTATE;
  let inspectorPress=false,inspectorDown=0,inspectorClicks=0,cameraResets=0,claims=0;
  canvas.addEventListener('pointerdown',event=>{if(event.button===0){inspectorPress=true;inspectorDown++;}},true);
  window.addEventListener('pointerup',()=>{if(inspectorPress)inspectorClicks++;inspectorPress=false;});
  canvas.addEventListener('dblclick',()=>cameraResets++);
  const state={active:true,walking:false,transitioning:false,blocked:false,ownerId:'teal',selectedIds:new Set(),units:[
    {id:'first',ownerId:'teal',hp:6,x:200,z:200},
    {id:'second',ownerId:'teal',hp:6,x:220,z:245},
    {id:'enemy',ownerId:'coral',hp:6,x:265,z:210},
  ]};
  const selections=[],commands=[],project=unit=>({x:unit.x,y:unit.z,visible:!unit.hidden,radius:12});
  const baseline=()=>[document,window,canvas].map(node=>[...node.listeners.values()].reduce((sum,list)=>sum+list.length,0));const originalListeners=baseline();
  const input=createMilitaryInput(canvas,{getState:()=>state,project,groundAt:p=>({x:p.x/10,z:p.y/10}),
    onSelect(ids,add){selections.push({ids,add});if(!add)state.selectedIds.clear();ids.forEach(id=>state.selectedIds.add(id));},
    onCommand:order=>commands.push(order),onClaimPointer(){claims++;inspectorPress=false;}});
  t.after(()=>{input.dispose();controls.dispose();});
  const pointer=(type,x,y,extra={})=>canvas.dispatch(type,{clientX:x,clientY:y,pageX:x,pageY:y,...extra});
  return{canvas,document,window,body,camera,controls,captured,state,input,selections,commands,pointer,project,baseline,originalListeners,
    get inspectorDown(){return inspectorDown;},get inspectorClicks(){return inspectorClicks;},get cameraResets(){return cameraResets;},get claims(){return claims;}};
}

test('empty-ground marquee never enters OrbitControls and subsequent middle drag still rotates normally',t=>{
  const f=fixture(t);
  f.pointer('pointerdown',100,100);assert.equal(f.inspectorDown,1,'city/rail capture still receives the initial tap');assert.equal(f.controls._pointers.length,0,'LEFT=null alone would still have tracked this pointer');assert.equal(f.captured.size,0);
  f.pointer('pointermove',300,300,{buttons:1});assert.equal(f.input.selecting,true);assert.equal(f.claims,1);assert.equal(f.body.children.at(-1).hidden,false);
  f.pointer('pointerup',300,300);assert.deepEqual(f.selections,[{ids:['first','second'],add:false}]);assert.equal(f.inspectorClicks,0);assert.equal(f.input.selecting,false);assert.equal(f.controls._pointers.length,0);
  const before=f.camera.position.clone();f.pointer('pointerdown',400,300,{button:1,buttons:4});assert.equal(f.controls._pointers.length,1);assert.equal(f.captured.size,1);
  f.pointer('pointermove',470,340,{button:1,buttons:4});f.pointer('pointerup',470,340,{button:1});
  assert.ok(f.camera.position.distanceTo(before)>1,'the actual OrbitControls camera still moves after army selection');assert.equal(f.controls._pointers.length,0);assert.equal(f.captured.size,0);
});

test('ordinary city/rail taps still reach their inspector while owned-unit taps are exclusive',t=>{
  const f=fixture(t);
  f.pointer('pointerdown',100,100);f.pointer('pointerup',100,100);assert.equal(f.inspectorDown,1);assert.equal(f.inspectorClicks,1);assert.deepEqual(f.selections,[{ids:[],add:false}]);assert.equal(f.controls._pointers.length,0);
  f.pointer('pointerdown',200,200);f.pointer('pointerup',200,200);assert.equal(f.inspectorDown,1);assert.equal(f.inspectorClicks,1);assert.deepEqual([...f.state.selectedIds],['first']);
  f.pointer('pointerdown',220,245,{shiftKey:true});f.pointer('pointerup',220,245,{shiftKey:true});assert.deepEqual([...f.state.selectedIds],['first','second']);assert.equal(f.controls._pointers.length,0);
});

test('right click attacks an enemy or moves to ground, without letting the camera record a pointer',t=>{
  const f=fixture(t);f.state.selectedIds.add('first');
  f.pointer('pointerdown',265,210,{button:2,buttons:2});f.pointer('pointerup',265,210,{button:2});assert.deepEqual(f.commands[0],{type:'attack',targetId:'enemy'});
  f.pointer('pointerdown',600,500,{button:2,buttons:2});f.pointer('pointerup',600,500,{button:2});assert.deepEqual(f.commands[1],{type:'move',x:60,z:50});assert.equal(f.controls._pointers.length,0);
  assert.equal(f.canvas.dispatch('contextmenu').defaultPrevented,true);
});

test('RTS double clicks cannot reset the camera; walking and railway tools keep their existing input',t=>{
  const f=fixture(t);assert.equal(f.pointer('dblclick',200,200).defaultPrevented,true);assert.equal(f.cameraResets,0);
  for(const blocked of ['walking','transitioning','blocked']){
    f.state[blocked]=true;assert.equal(f.pointer('dblclick',200,200).defaultPrevented,false);
    const selections=f.selections.length;f.pointer('pointerdown',200,200);f.pointer('pointerup',200,200);assert.equal(f.selections.length,selections);assert.equal(f.controls._pointers.length,0);f.state[blocked]=false;
  }
  assert.equal(f.cameraResets,3);
});

test('focus loss and disposal remove marquee state and listeners without leaking an input capture',t=>{
  const f=fixture(t);f.pointer('pointerdown',100,100);f.pointer('pointermove',300,300,{buttons:1});assert.equal(f.input.selecting,true);
  f.window.dispatch('blur');assert.equal(f.input.selecting,false);assert.equal(f.controls._pointers.length,0);
  f.input.dispose();f.input.dispose();assert.deepEqual(f.baseline(),f.originalListeners);assert.equal(f.body.children.length,1);
});

test('selection only includes living visible owned units; right-click picking only includes enemies',()=>{
  const units=[{id:'a',ownerId:'teal',hp:2,x:10,z:20},{id:'b',ownerId:'coral',hp:6,x:12,z:20},{id:'dead',ownerId:'teal',hp:0,x:11,z:20},{id:'hidden',ownerId:'teal',hp:6,x:14,z:20,hidden:true}];
  const project=unit=>({x:unit.x,y:unit.z,visible:!unit.hidden});
  assert.equal(pickMilitaryUnit(units,{x:12,y:20},project,{ownerId:'teal'}).id,'a');assert.equal(pickMilitaryUnit(units,{x:10,y:20},project,{ownerId:'teal',enemy:true}).id,'b');
  assert.deepEqual(militaryUnitsInBox(units,{x:0,y:0},{x:40,y:40},project,'teal'),['a']);
});

test('team-aware enemy picking excludes allied owners while own-unit selection stays private',()=>{
  const units=[{id:'own',ownerId:'teal',hp:6,x:0,z:0},{id:'ally',ownerId:'mint',hp:6,x:2,z:0},{id:'enemy',ownerId:'coral',hp:6,x:5,z:0}];
  const teams={teal:'green',mint:'green',coral:'red'},allied=(a,b)=>teams[a]===teams[b],project=u=>({x:u.x,y:u.z,visible:true});
  assert.equal(pickMilitaryUnit(units,{x:2,y:0},project,{ownerId:'teal',enemy:true,allied}).id,'enemy');
  assert.equal(pickMilitaryUnit(units,{x:2,y:0},project,{ownerId:'teal',allied}).id,'own');
  assert.deepEqual(militaryUnitsInBox(units,{x:-10,y:-10},{x:10,y:10},project,'teal'),['own']);
});

test('right-clicking an allied unit becomes a ground move, while hostile units remain attackable',t=>{
  const f=fixture(t);f.state.selectedIds.add('first');f.state.units.push({id:'ally',ownerId:'mint',hp:6,x:400,z:350});
  f.state.allied=(a,b)=>a===b||['teal','mint'].includes(a)&&['teal','mint'].includes(b);
  f.pointer('pointerdown',400,350,{button:2,buttons:2});f.pointer('pointerup',400,350,{button:2});assert.deepEqual(f.commands[0],{type:'move',x:40,z:35});
  f.pointer('pointerdown',265,210,{button:2,buttons:2});f.pointer('pointerup',265,210,{button:2});assert.deepEqual(f.commands[1],{type:'attack',targetId:'enemy'});
  assert.equal(f.controls._pointers.length,0);
});
