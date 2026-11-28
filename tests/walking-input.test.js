import test from 'node:test';
import assert from 'node:assert/strict';
import {createWalkingInput} from '../src/walking-input.js';

// DOM capture listeners run before target bubble listeners, even when a
// strategy controller registered first. Node's bare EventTarget omits that
// ordering, so model the two target phases explicitly for these input tests.
class Surface{
  listeners=new Map();
  addEventListener(type,listener,options={}){
    const entries=this.listeners.get(type)??[];
    entries.push({listener,capture:options===true||options.capture===true});this.listeners.set(type,entries);
  }
  removeEventListener(type,listener,options={}){
    const capture=options===true||options.capture===true;
    this.listeners.set(type,(this.listeners.get(type)??[]).filter(entry=>entry.listener!==listener||entry.capture!==capture));
  }
  dispatch(type,properties={}){
    const event={type,key:'',pointerId:1,clientX:0,clientY:0,altKey:false,metaKey:false,ctrlKey:false,repeat:false,
      defaultPrevented:false,stopped:false,...properties,
      preventDefault(){this.defaultPrevented=true;},stopImmediatePropagation(){this.stopped=true;}};
    for(const phase of [true,false])for(const entry of [...(this.listeners.get(type)??[])]){
      if(event.stopped)break;if(entry.capture===phase)entry.listener(event);
    }
    return event;
  }
}
function fixture(t,{initialActive=false,onKey,combat=()=>false}={}){
  const document=new Surface(),window=new Surface(),canvas=new Surface();
  document.defaultView=window;canvas.ownerDocument=document;
  const captured=new Set(),released=[];let focusCount=0,active=initialActive,looking=true,toggles=0,exits=0,bubbleKeys=[];
  canvas.setPointerCapture=id=>captured.add(id);canvas.hasPointerCapture=id=>captured.has(id);
  canvas.releasePointerCapture=id=>{captured.delete(id);released.push(id);};canvas.focus=()=>focusCount++;
  canvas.addEventListener('keydown',event=>bubbleKeys.push(event.key));
  const input=createWalkingInput(canvas,{onKey,combat,canLook:()=>looking,isActive:()=>active,onToggle:()=>{active=!active;toggles++;},onExit:()=>{active=false;exits++;}});
  t.after(()=>input.dispose());
  return {input,canvas,window,document,captured,released,key:(key,properties={})=>canvas.dispatch('keydown',{key,...properties}),
    set active(value){active=value;},set looking(value){looking=value;},get active(){return active;},get toggles(){return toggles;},get exits(){return exits;},get bubbleKeys(){return bubbleKeys;},get focusCount(){return focusCount;}};
}
const empty={forward:0,right:0,jump:false,sprint:false,swing:false,lookX:0,lookY:0};

test('V toggles once per press in capture phase while modifier shortcuts and Tab remain available',t=>{
  const f=fixture(t);
  assert.equal(f.key('V').defaultPrevented,true);assert.equal(f.active,true);assert.equal(f.toggles,1);
  f.key('v',{repeat:true});assert.equal(f.toggles,1);assert.deepEqual(f.bubbleKeys,[]);
  for(const modifier of ['altKey','metaKey','ctrlKey']){
    assert.equal(f.key('v',{[modifier]:true}).defaultPrevented,false);assert.equal(f.toggles,1);
  }
  assert.equal(f.key('Tab').defaultPrevented,false);
  f.key('v');assert.equal(f.active,false);assert.equal(f.toggles,2);
  assert.equal(f.key('w').defaultPrevented,false);assert.deepEqual(f.input.sample(),empty);
  assert.equal(f.key('e').defaultPrevented,false);assert.deepEqual(f.input.sample(),empty);
});

test('walking captures movement, jumping and strategy shortcuts without invoking a Space pause',t=>{
  const f=fixture(t,{initialActive:true});let paused=false;
  f.canvas.addEventListener('keydown',event=>{if(event.key===' ')paused=!paused;});
  for(const key of ['w','d',' ','Shift'])assert.equal(f.key(key).defaultPrevented,true);
  assert.deepEqual(f.input.sample(),{...empty,forward:1,right:1,jump:true,sprint:true});assert.equal(paused,false);
  f.key('s');f.key('a');assert.deepEqual(f.input.sample(),{...empty,jump:true,sprint:true});
  for(const key of ['f','r','[',']','+','-','=','_'])assert.equal(f.key(key).defaultPrevented,true);
  assert.deepEqual(f.bubbleKeys,[]);
  f.canvas.dispatch('keyup',{key:'w'});f.window.dispatch('keyup',{key:'Shift'});
  assert.deepEqual(f.input.sample(),{...empty,forward:-1,jump:true});
  f.key('Escape');assert.equal(f.exits,1);assert.equal(f.active,false);assert.deepEqual(f.input.sample(),empty);
  f.key(' ');assert.equal(paused,true,'Space returns to the strategy controller after leaving walking');
});

test('touch drag samples each displacement once and held arrows scale with frame time',t=>{
  const f=fixture(t,{initialActive:true});
  assert.equal(f.canvas.dispatch('pointerdown',{pointerId:7,pointerType:'touch',clientX:100,clientY:200}).defaultPrevented,true);
  assert.equal(f.focusCount,1);assert.ok(f.captured.has(7));
  f.canvas.dispatch('pointermove',{pointerId:8,clientX:900,clientY:900});
  f.canvas.dispatch('pointermove',{pointerId:7,clientX:120,clientY:190});
  f.canvas.dispatch('pointermove',{pointerId:7,clientX:130,clientY:180});
  const sample=f.input.sample();assert.ok(Math.abs(sample.lookX+.15)<1e-12);assert.ok(Math.abs(sample.lookY+.08)<1e-12);
  assert.deepEqual(f.input.sample(),empty);
  f.key('ArrowLeft');f.key('ArrowDown');
  assert.deepEqual(f.input.sample(.1),{...empty,lookX:.16000000000000003,lookY:.11000000000000001});
  assert.deepEqual(f.input.sample(.05),{...empty,lookX:.08000000000000002,lookY:.05500000000000001});
  f.window.dispatch('pointerup',{pointerId:7});assert.deepEqual(f.released,[7]);
  f.canvas.dispatch('pointermove',{pointerId:7,pointerType:'touch',clientX:1000,clientY:1000});
  assert.deepEqual(f.input.sample(),empty);
  assert.equal(f.canvas.dispatch('wheel').defaultPrevented,true);
  assert.equal(f.canvas.dispatch('contextmenu').defaultPrevented,true);
});

test('a quick Space tap between animation frames delivers one jump and held Space remains held',t=>{
  const f=fixture(t,{initialActive:true});
  f.key(' ');f.canvas.dispatch('keyup',{key:' '});
  assert.equal(f.input.sample().jump,true,'a full tap cannot disappear between frames');
  assert.equal(f.input.sample().jump,false,'the tap latch is consumed exactly once');
  f.key(' ');assert.equal(f.input.sample().jump,true);assert.equal(f.input.sample().jump,true);
  f.key(' ',{repeat:true});assert.equal(f.input.sample().jump,true);
  f.window.dispatch('keyup',{key:' '});assert.equal(f.input.sample().jump,false);
  f.key(' ');f.canvas.dispatch('keyup',{key:' '});f.window.dispatch('blur');
  assert.equal(f.input.sample().jump,false,'focus loss drops a queued jump');
});

test('E swings once per press, including a quick tap, without repeating while held',t=>{
  const f=fixture(t,{initialActive:true});
  assert.equal(f.key('E').defaultPrevented,true);
  f.canvas.dispatch('keyup',{key:'E'});
  assert.deepEqual(f.input.sample(),{...empty,swing:true});
  assert.deepEqual(f.input.sample(),empty);
  f.key('e');assert.equal(f.input.sample().swing,true);
  f.key('e',{repeat:true});assert.equal(f.input.sample().swing,false);
  f.key('e');assert.equal(f.input.sample().swing,false,'duplicate keydown cannot queue a second swing');
  f.window.dispatch('keyup',{key:'e'});
  f.key('e');assert.equal(f.input.sample().swing,true);
  assert.deepEqual(f.bubbleKeys,[]);
});

test('primary clicks and touch taps queue one swing with a five pixel tolerance',t=>{
  for(const pointerType of ['mouse','touch']){
    const f=fixture(t,{initialActive:true});
    f.canvas.dispatch('pointerdown',{pointerType,button:0,clientX:100,clientY:200});
    assert.equal(f.input.sample().swing,false,'a held pointer has not clicked yet');
    f.canvas.dispatch('pointermove',{clientX:103,clientY:204});
    f.window.dispatch('pointerup',{button:0,clientX:103,clientY:204});
    assert.equal(f.input.sample().swing,true);
    assert.deepEqual(f.input.sample(),empty);
    assert.deepEqual(f.released,pointerType==='touch'?[1]:[]);
  }
});

test('orbit drags, canceled gestures, secondary buttons and other pointers never swing',t=>{
  for(const cancel of ['pointercancel','lostpointercapture']){
    const f=fixture(t,{initialActive:true});
    f.canvas.dispatch('pointerdown');
    (cancel==='pointercancel'?f.window:f.canvas).dispatch(cancel);
    f.window.dispatch('pointerup');
    assert.deepEqual(f.input.sample(),empty);
  }
  for(const properties of [{button:2},{isPrimary:false}]){
    const f=fixture(t,{initialActive:true});
    f.canvas.dispatch('pointerdown',properties);f.window.dispatch('pointerup',properties);
    assert.deepEqual(f.input.sample(),empty);
  }
  const f=fixture(t,{initialActive:true});
  f.canvas.dispatch('pointerdown',{clientX:100,clientY:200});
  f.canvas.dispatch('pointermove',{clientX:106,clientY:200});
  f.canvas.dispatch('pointermove',{clientX:100,clientY:200});
  f.window.dispatch('pointerup',{clientX:100,clientY:200});
  assert.equal(f.input.sample().swing,false,'returning an orbit drag to its start cannot become a click');
  f.canvas.dispatch('pointerdown');
  f.window.dispatch('pointerup',{clientX:6});
  assert.equal(f.input.sample().swing,false,'release displacement counts even without a final move event');
  f.canvas.dispatch('pointerdown',{pointerId:1,pointerType:'touch'});
  f.canvas.dispatch('pointerdown',{pointerId:2,isPrimary:false});
  f.window.dispatch('pointerup',{pointerId:2});
  assert.equal(f.input.sample().swing,false,'another pointer cannot end the active gesture');
  assert.deepEqual([...f.captured],[1]);
  f.window.dispatch('pointercancel',{pointerId:1});
});

test('blur, hidden pages, exit and disposal clear held controls and release an active orbit',t=>{
  for(const clear of [f=>f.canvas.dispatch('blur'),f=>f.window.dispatch('blur'),f=>{
    f.document.hidden=true;f.document.dispatch('visibilitychange');
  },f=>f.key('Home'),f=>f.key('v'),f=>f.input.clear(),f=>f.input.dispose()]){
    const f=fixture(t,{initialActive:true});
    f.key('w');f.key(' ');f.key('e');f.canvas.dispatch('pointerdown',{pointerId:4,pointerType:'touch'});
    f.canvas.dispatch('pointermove',{pointerId:4,clientX:30,clientY:40});
    clear(f);assert.deepEqual(f.input.sample(),empty);assert.equal(f.captured.size,0);assert.deepEqual(f.released,[4]);
    f.window.dispatch('pointerup',{pointerId:4});assert.equal(f.input.sample().swing,false,'release after reset cannot attack');
  }
  const f=fixture(t,{initialActive:true});f.input.dispose();
  assert.equal(f.key('v').defaultPrevented,false);assert.equal(f.toggles,0);
  assert.equal(f.canvas.dispatch('wheel').defaultPrevented,false);
});


test('gameplay keys take priority in both camera modes without leaking into movement or strategy',t=>{
  for(const initialActive of [false,true]){
    const handled=[];const f=fixture(t,{initialActive,onKey:event=>{
      if(!['b','e','r','enter','escape'].includes(event.key.toLowerCase()))return false;
      handled.push(event.key);return true;
    }});
    for(const key of ['b','e','r','Enter','Escape'])assert.equal(f.key(key).defaultPrevented,true);
    assert.deepEqual(f.input.sample(),empty);assert.deepEqual(f.bubbleKeys,[]);
    assert.equal(f.exits,0);assert.equal(handled.length,5);
    assert.equal(f.key('b',{metaKey:true}).defaultPrevented,false);
    assert.equal(handled.length,5,'browser modifier shortcuts never reach gameplay');
    f.key('v');assert.equal(f.toggles,1,'the camera toggle remains available');
  }
});


test('mouse cursor look needs no drag and does not consume placement hover',t=>{
  const f=fixture(t,{initialActive:true});let observed=0;
  f.canvas.addEventListener('pointermove',()=>observed++);
  f.canvas.dispatch('pointermove',{clientX:100,clientY:200,pointerType:'mouse'});
  assert.deepEqual(f.input.sample(),empty,'first hover anchors without rotating');
  const event=f.canvas.dispatch('pointermove',{clientX:130,clientY:180,pointerType:'mouse'});
  assert.deepEqual(f.input.sample(),{...empty,lookX:-.15,lookY:-.08});
  assert.equal(event.defaultPrevented,false);assert.equal(observed,2);
  assert.deepEqual(f.input.sample(),empty,'each cursor displacement is sampled once');
  f.canvas.dispatch('pointerdown',{clientX:130,clientY:180,pointerType:'mouse'});
  assert.equal(f.captured.size,0,'mouse can move naturally from world to HUD');
  f.canvas.dispatch('pointerleave');
  f.window.dispatch('pointerup',{clientX:130,clientY:180,pointerType:'mouse'});
  assert.equal(f.input.sample().swing,false,'releasing over HUD cannot swing');
});

test('mode transitions, UI entry, focus loss and build aiming reset cursor anchors',t=>{
  const f=fixture(t,{initialActive:true});
  const move=(x,y=200)=>f.canvas.dispatch('pointermove',{clientX:x,clientY:y,pointerType:'mouse'});
  move(100);move(120);assert.equal(f.input.sample().lookX,-.1);
  f.looking=false;
  const event=move(500);
  assert.equal(event.defaultPrevented,false,'build placement continues to receive hover');
  assert.deepEqual(f.input.sample(),empty);
  f.looking=true;move(600);assert.deepEqual(f.input.sample(),empty);
  move(620);assert.equal(f.input.sample().lookX,-.1);
  for(const reset of [()=>f.canvas.dispatch('pointerleave'),()=>f.window.dispatch('blur'),()=>f.input.clear()]){
    reset();move(1000);assert.deepEqual(f.input.sample(),empty);
    move(1020);assert.equal(f.input.sample().lookX,-.1);
  }
  f.active=false;move(50);assert.deepEqual(f.input.sample(),empty);
  f.active=true;move(80);assert.deepEqual(f.input.sample(),empty,'entering third person never snaps');
  move(100);assert.equal(f.input.sample().lookX,-.1);
  f.canvas.dispatch('pointerleave');
  f.canvas.dispatch('pointerenter',{clientX:110,clientY:200,pointerType:'mouse'});
  move(120);assert.equal(f.input.sample().lookX,-.05,'re-entry starts at the edge rather than the old cursor');
});

test('look stays finite and bounded across bad coordinates, large deltas and suspended frames',t=>{
  const f=fixture(t,{initialActive:true});
  f.canvas.dispatch('pointermove',{clientX:0,clientY:0});
  f.canvas.dispatch('pointermove',{clientX:100000,clientY:-100000});
  assert.deepEqual(f.input.sample(),{...empty,lookX:-.4,lookY:-.32});
  f.canvas.dispatch('pointermove',{clientX:Infinity,clientY:NaN});
  f.canvas.dispatch('pointermove',{clientX:20,clientY:30});
  assert.deepEqual(f.input.sample(),empty,'invalid browser coordinates reset the reference');
  for(let i=1;i<8;i++)f.canvas.dispatch('pointermove',{clientX:20+80*i,clientY:30+80*i});
  assert.deepEqual(f.input.sample(),{...empty,lookX:-.65,lookY:.45});
  f.key('ArrowRight');f.key('ArrowUp');
  const delayed=f.input.sample(200);
  assert.ok(Math.abs(delayed.lookX+.16)<1e-12);assert.ok(Math.abs(delayed.lookY+.11)<1e-12);
  assert.deepEqual(f.input.sample(NaN),empty);
});


test('touch dragging can pause for placement without accumulating a hidden camera jump',t=>{
  const f=fixture(t,{initialActive:true});
  f.canvas.dispatch('pointerdown',{pointerType:'touch',clientX:100,clientY:100});
  f.canvas.dispatch('pointermove',{pointerType:'touch',clientX:120,clientY:100});
  assert.equal(f.input.sample().lookX,-.1);
  f.looking=false;
  f.canvas.dispatch('pointermove',{pointerType:'touch',clientX:600,clientY:600});
  assert.deepEqual(f.input.sample(),empty);
  f.looking=true;
  f.canvas.dispatch('pointermove',{pointerType:'touch',clientX:610,clientY:600});
  assert.deepEqual(f.input.sample(),empty);
  f.canvas.dispatch('pointermove',{pointerType:'touch',clientX:630,clientY:600});
  assert.equal(f.input.sample().lookX,-.1);
});

function pointerLock(f,{deferred=false,reject=false}={}){
  let requests=0,exits=0;f.document.pointerLockElement=null;
  const acquire=()=>{f.document.pointerLockElement=f.canvas;f.document.dispatch('pointerlockchange');};
  f.canvas.requestPointerLock=()=>{requests++;if(reject)return Promise.reject(new Error('Pointer lock unavailable'));if(!deferred)acquire();};
  f.document.exitPointerLock=()=>{exits++;f.document.pointerLockElement=null;f.document.dispatch('pointerlockchange');};
  return{acquire,get requests(){return requests;},get exits(){return exits;}};
}

test('pointer lock is requested only from gestures and relative movement can turn through multiple full circles',t=>{
  const f=fixture(t,{initialActive:true}),lock=pointerLock(f);
  for(let i=0;i<10;i++){f.canvas.dispatch('pointermove',{clientX:300+i});f.input.sample(.016);}
  assert.equal(lock.requests,0,'sampling and hover never ask for pointer lock');
  f.canvas.dispatch('pointerdown',{clientX:500,clientY:300});f.window.dispatch('pointerup',{clientX:500,clientY:300});f.input.sample();
  assert.equal(lock.requests,1);assert.equal(f.input.locked,true);
  let angle=0;
  for(let frame=0;frame<80;frame++){
    f.canvas.dispatch('pointermove',{clientX:500,clientY:300,movementX:40,movementY:0});
    f.document.dispatch('mousemove',{clientX:500,clientY:300,movementX:40,movementY:0});
    const sample=f.input.sample(1/60);assert.equal(sample.lookX,-.2,'pointer and mouse events do not double-count locked movement');angle+=sample.lookX;
  }
  assert.ok(Math.abs(angle)>Math.PI*4,'frozen screen coordinates cannot stop full-circle yaw');
  f.document.dispatch('mousemove',{movementX:0,movementY:-20});assert.equal(f.input.sample().lookY,-.08);
  f.document.dispatch('mousemove',{movementX:Infinity,movementY:NaN});assert.deepEqual(f.input.sample(),empty);
});

test('Escape and Tab free the cursor for the HUD without leaving the character view',t=>{
  for(const key of ['Escape','Tab']){
    const f=fixture(t,{initialActive:true}),lock=pointerLock(f);f.canvas.dispatch('pointerdown');f.window.dispatch('pointerup');f.input.sample();
    f.key('w');f.key('e');const event=f.key(key);assert.equal(lock.exits,1);assert.equal(f.input.locked,false);assert.equal(f.active,true);assert.equal(f.exits,0);
    assert.equal(event.defaultPrevented,key==='Escape');assert.deepEqual(f.input.sample(),empty);
    f.document.dispatch('mousemove',{movementX:50,movementY:20});assert.deepEqual(f.input.sample(),empty,'released pointer events cannot keep turning');
    f.canvas.dispatch('pointermove',{clientX:800,clientY:500});assert.deepEqual(f.input.sample(),empty,'HUD return establishes a fresh cursor anchor');
    f.canvas.dispatch('pointerdown',{clientX:800,clientY:500});assert.equal(lock.requests,2,'a later explicit canvas click can reacquire look');
  }
});

test('overview, HUD focus, hidden pages and explicit release safely cancel relative input',t=>{
  for(const release of [f=>{f.active=false;f.input.sample();},f=>f.document.dispatch('focusin',{target:{}}),f=>f.document.dispatch('pointerdown',{target:{}}),f=>{f.document.hidden=true;f.document.dispatch('visibilitychange');},f=>f.input.releaseLook(),f=>f.window.dispatch('blur')]){
    const f=fixture(t,{initialActive:true}),lock=pointerLock(f);f.canvas.dispatch('pointerdown');f.key('w');f.key('e');
    f.document.dispatch('mousemove',{movementX:20,movementY:10});release(f);assert.equal(f.input.locked,false);assert.equal(lock.exits,1);
    f.window.dispatch('pointerup');assert.deepEqual(f.input.sample(),empty,'release cannot queue a latent swing or movement');
  }
});

test('late lock acquisition after a mode exit is released and V requests lock only on entry',t=>{
  const f=fixture(t),lock=pointerLock(f,{deferred:true});f.key('v');assert.equal(lock.requests,1);
  f.key('v');assert.equal(lock.requests,1,'leaving during the visual transition must not relock');lock.acquire();
  assert.equal(f.input.locked,false);assert.equal(lock.exits,1);assert.deepEqual(f.input.sample(),empty);
});

test('denied pointer lock falls back without an unhandled rejection or losing keyboard controls',async t=>{
  const f=fixture(t,{initialActive:true}),lock=pointerLock(f,{reject:true});f.canvas.dispatch('pointerdown');f.window.dispatch('pointerup');f.input.sample();
  await Promise.resolve();assert.equal(f.input.locked,false);assert.equal(lock.requests,1);
  f.canvas.dispatch('pointermove',{clientX:100,clientY:200});f.canvas.dispatch('pointermove',{clientX:120,clientY:200});assert.equal(f.input.sample().lookX,-.1);
  f.key('w');assert.equal(f.input.sample().forward,1);f.input.releaseLook();
  f.canvas.requestPointerLock=()=>{throw new Error('unsupported');};assert.equal(f.input.requestLook(),false);
});

test('unlocked edge turning keeps full-circle look possible when pointer lock is unavailable',t=>{
  const f=fixture(t,{initialActive:true});f.canvas.getBoundingClientRect=()=>({left:0,top:0,width:1000,height:600});
  f.canvas.dispatch('pointerenter',{clientX:999,clientY:300,pointerType:'mouse'});
  let angle=0;for(let frame=0;frame<60;frame++)angle+=f.input.sample(.1).lookX;assert.ok(angle<-Math.PI*2);
  f.canvas.dispatch('pointerleave');assert.deepEqual(f.input.sample(.1),empty,'edge turning stops as soon as the cursor enters the HUD');
  f.canvas.dispatch('pointerenter',{clientX:500,clientY:300,pointerType:'mouse'});assert.deepEqual(f.input.sample(.1),empty,'central cursor has no automatic drift');
});

test('relative mouse movement cancels a drag click even when client coordinates remain fixed',t=>{
  const f=fixture(t,{initialActive:true});pointerLock(f);f.canvas.dispatch('pointerdown',{clientX:500,clientY:300});
  f.document.dispatch('mousemove',{movementX:8,movementY:0});f.window.dispatch('pointerup',{clientX:500,clientY:300});assert.equal(f.input.sample().swing,false);
  f.canvas.dispatch('pointerdown',{clientX:500,clientY:300});f.window.dispatch('pointerup',{clientX:500,clientY:300});assert.equal(f.input.sample().swing,true);
  assert.equal(f.input.sample().swing,false,'a locked click still delivers one action');
});

 test('combat clicks are latched between frames and never trigger the mining action',t=>{
  const f=fixture(t,{initialActive:true,combat:()=>true});
  f.canvas.dispatch('pointerdown',{button:0});f.window.dispatch('pointerup',{button:0});
  assert.equal(f.input.sample().fire,true);assert.equal(f.input.sample().fire,false);assert.equal(f.input.sample().swing,false);
  f.canvas.dispatch('pointerdown',{button:0});assert.equal(f.input.sample().fire,true);assert.equal(f.input.sample().fire,true);
  f.window.dispatch('blur');assert.equal(f.input.sample().fire,false);
  f.key('e');assert.equal(f.input.sample().swing,true);
});
