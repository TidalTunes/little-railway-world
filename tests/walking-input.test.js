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
function fixture(t,{initialActive=false}={}){
  const document=new Surface(),window=new Surface(),canvas=new Surface();
  document.defaultView=window;canvas.ownerDocument=document;
  const captured=new Set(),released=[];let focusCount=0,active=initialActive,toggles=0,exits=0,bubbleKeys=[];
  canvas.setPointerCapture=id=>captured.add(id);canvas.hasPointerCapture=id=>captured.has(id);
  canvas.releasePointerCapture=id=>{captured.delete(id);released.push(id);};canvas.focus=()=>focusCount++;
  canvas.addEventListener('keydown',event=>bubbleKeys.push(event.key));
  const input=createWalkingInput(canvas,{isActive:()=>active,onToggle:()=>{active=!active;toggles++;},onExit:()=>{active=false;exits++;}});
  t.after(()=>input.dispose());
  return {input,canvas,window,document,captured,released,key:(key,properties={})=>canvas.dispatch('keydown',{key,...properties}),
    get active(){return active;},get toggles(){return toggles;},get exits(){return exits;},get bubbleKeys(){return bubbleKeys;},get focusCount(){return focusCount;}};
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

test('pointer orbit samples each displacement once and held arrows scale with frame time',t=>{
  const f=fixture(t,{initialActive:true});
  assert.equal(f.canvas.dispatch('pointerdown',{pointerId:7,clientX:100,clientY:200}).defaultPrevented,true);
  assert.equal(f.focusCount,1);assert.ok(f.captured.has(7));
  f.canvas.dispatch('pointermove',{pointerId:8,clientX:900,clientY:900});
  f.canvas.dispatch('pointermove',{pointerId:7,clientX:120,clientY:190});
  f.canvas.dispatch('pointermove',{pointerId:7,clientX:130,clientY:180});
  const sample=f.input.sample();assert.ok(Math.abs(sample.lookX+.15)<1e-12);assert.ok(Math.abs(sample.lookY+.08)<1e-12);
  assert.deepEqual(f.input.sample(),empty);
  f.key('ArrowLeft');f.key('ArrowDown');
  assert.deepEqual(f.input.sample(.5),{...empty,lookX:.8,lookY:.55});
  assert.deepEqual(f.input.sample(.25),{...empty,lookX:.4,lookY:.275});
  f.window.dispatch('pointerup',{pointerId:7});assert.deepEqual(f.released,[7]);
  f.canvas.dispatch('pointermove',{pointerId:7,clientX:1000,clientY:1000});
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
    assert.deepEqual(f.released,[1]);
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
  f.canvas.dispatch('pointerdown',{pointerId:1});
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
    f.key('w');f.key(' ');f.key('e');f.canvas.dispatch('pointerdown',{pointerId:4});
    f.canvas.dispatch('pointermove',{pointerId:4,clientX:30,clientY:40});
    clear(f);assert.deepEqual(f.input.sample(),empty);assert.equal(f.captured.size,0);assert.deepEqual(f.released,[4]);
    f.window.dispatch('pointerup',{pointerId:4});assert.equal(f.input.sample().swing,false,'release after reset cannot attack');
  }
  const f=fixture(t,{initialActive:true});f.input.dispose();
  assert.equal(f.key('v').defaultPrevented,false);assert.equal(f.toggles,0);
  assert.equal(f.canvas.dispatch('wheel').defaultPrevented,false);
});
