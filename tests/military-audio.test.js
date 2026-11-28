import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,PerspectiveCamera,OrthographicCamera} from 'three';
import {createMilitaryAudio,synthesizeMilitarySound,militaryAudioPlacement,MILITARY_AUDIO_RULES,MILITARY_SOUND_DURATIONS} from '../src/military-audio.js';

class Target{
  constructor(){this.listeners=new Map();this.children=[];this.dataset={};this.attributes={};this.parentElement=null;this.hidden=false;}
  addEventListener(type,fn){const list=this.listeners.get(type)??new Set();list.add(fn);this.listeners.set(type,list);}
  removeEventListener(type,fn){this.listeners.get(type)?.delete(fn);}
  dispatch(type,properties={}){const event={type,isTrusted:true,stopPropagation(){},...properties};for(const fn of this.listeners.get(type)??[])fn(event);}
  append(...children){for(const child of children){child.parentElement=this;this.children.push(child);}}
  remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(node=>node!==this);this.parentElement=null;}
  setAttribute(key,value){this.attributes[key]=value;}
  getAttribute(key){return this.attributes[key];}
}
function contextFixture(){
  const sources=[],nodes=[];let context;
  const node=()=>{const item={connected:[],disconnected:false,connect(to){this.connected.push(to);},disconnect(){this.disconnected=true;this.connected=[];}};nodes.push(item);return item;};
  context={state:'suspended',currentTime:0,resumes:0,suspends:0,closes:0,destination:{},
    createDynamicsCompressor(){return{...node(),threshold:{value:0},knee:{value:0},ratio:{value:0},attack:{value:0},release:{value:0}};},
    createGain(){return{...node(),gain:{value:0}};},createStereoPanner(){return{...node(),pan:{value:0}};},
    createBuffer(channels,length,sampleRate){assert.equal(channels,1);const samples=new Float32Array(length);return{length,sampleRate,duration:length/sampleRate,getChannelData:()=>samples};},
    createBufferSource(){const source={...node(),playbackRate:{value:1},started:false,stopped:false,onended:null,start(at){this.started=true;this.at=at;},stop(){this.stopped=true;this.onended?.();}};sources.push(source);return source;},
    resume(){this.state='running';this.resumes++;return Promise.resolve();},suspend(){this.state='suspended';this.suspends++;return Promise.resolve();},close(){this.state='closed';this.closes++;return Promise.resolve();},
    advance(seconds){this.currentTime+=seconds;for(const source of sources)if(source.started&&!source.stopped&&source.at+source.buffer.duration/source.playbackRate.value<=this.currentTime){source.stopped=true;source.onended?.();}},
  };
  return{context,sources,nodes};
}
function fixture(t){
  const document=new Target(),window=new Target(),parent=new Target(),canvas=new Target();document.defaultView=window;document.createElement=()=>new Target();canvas.ownerDocument=document;canvas.parentElement=parent;parent.append(canvas);
  const idle=new Map();let nextIdle=0;window.requestIdleCallback=callback=>{const id=++nextIdle;idle.set(id,callback);return id;};window.cancelIdleCallback=id=>idle.delete(id);
  const mix=contextFixture();let created=0;const audio=createMilitaryAudio({canvas,muted:false,contextFactory:()=>{created++;return mix.context;}});
  const root=new Group(),camera=new OrthographicCamera(-60,60,45,-45,.1,300);camera.position.set(0,65,60);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);root.updateMatrixWorld(true);
  const options={camera,root,focus:{x:0,y:0,z:0},walkingWeight:0,mapBlend:0,events:[],units:[]};
  t.after(()=>audio.dispose());
  return{audio,document,window,parent,canvas,...mix,options,idle,flushIdle(remaining=20){const next=idle.entries().next().value;if(next){idle.delete(next[0]);next[1]({timeRemaining:()=>remaining});}},get created(){return created;},shot:(kind='tank',x=0,index=0)=>({type:'shot',unitId:`unit-${index}`,kind,from:{x,y:1,z:0},to:{x:x+5,y:0,z:0},time:index})};
}

test('original combat clips are deterministic, distinct, finite and cleanly bounded',()=>{
  const fingerprints=new Set();
  for(const kind of Object.keys(MILITARY_SOUND_DURATIONS)){
    const a=synthesizeMilitarySound(kind),b=synthesizeMilitarySound(kind),variant=synthesizeMilitarySound(kind,{variant:1});
    assert.deepEqual(a,b);assert.notDeepEqual(a,variant);assert.equal(a.length,Math.ceil(MILITARY_SOUND_DURATIONS[kind]*24000));assert.equal(a[0],0);assert.equal(a.at(-1),0);
    let peak=0,energy=0,sum=0;for(const sample of a){assert.ok(Number.isFinite(sample));peak=Math.max(peak,Math.abs(sample));energy+=sample**2;sum+=sample;}
    assert.ok(peak>.1&&peak<=.821,`${kind} has an audible bounded transient`);assert.ok(Math.abs(sum/a.length)<.02);assert.ok(Math.sqrt(energy/a.length)>.025);fingerprints.add([...a.slice(100,110)].join(','));
  }
  assert.equal(fingerprints.size,8);assert.throws(()=>synthesizeMilitarySound('unknown'),/Unknown/);assert.throws(()=>synthesizeMilitarySound('rifle',{sampleRate:100}),/sample rate/);
});

test('context unlock needs a trusted gesture; buffered sounds never replay from a locked frame',t=>{
  const f=fixture(t);f.audio.update(.1,{...f.options,events:[f.shot()]});assert.equal(f.created,0);assert.equal(f.audio.stats.played,0);
  f.window.dispatch('pointerdown',{isTrusted:false});assert.equal(f.created,0);f.window.dispatch('keydown',{metaKey:true});assert.equal(f.created,0);
  f.window.dispatch('pointerdown');assert.equal(f.created,1);assert.equal(f.context.resumes,1);
  f.audio.update(.1,f.options);assert.equal(f.audio.stats.played,0,'unlock does not replay events dropped earlier');
  f.audio.update(.1,{...f.options,events:[f.shot()]});assert.equal(f.audio.stats.played,1);assert.equal(f.sources[0].started,true);
  assert.equal(f.context.closes,0);assert.equal(f.audio.stats.buffers,1);assert.ok(f.audio.stats.bufferBytes<120000);
});

test('sounds use focus attenuation and stereo placement; offscreen overview audio stays quiet',()=>{
  const root=new Group(),camera=new OrthographicCamera(-100,100,75,-75,.1,300);camera.position.set(0,100,0);camera.up.set(0,0,-1);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);root.updateMatrixWorld(true);
  const options={camera,root,focus:{x:0,y:0,z:0},mapBlend:1};
  const left=militaryAudioPlacement({x:-30,y:0,z:0},options),right=militaryAudioPlacement({x:30,y:0,z:0},options),centre=militaryAudioPlacement({x:0,y:0,z:0},options);
  assert.ok(left.pan<0&&right.pan>0);assert.equal(left.gain,right.gain);assert.ok(centre.gain>right.gain);assert.equal(militaryAudioPlacement({x:200,y:0,z:0},options),null);
  const close=new PerspectiveCamera(50,1,.1,100);close.position.set(0,2,4);close.lookAt(0,1,0);close.updateMatrixWorld(true);
  const behind={x:2,y:1,z:8},ground={camera:close,root,focus:{x:0,y:0,z:0},walkingWeight:1};
  assert.ok(militaryAudioPlacement(behind,ground)?.gain>0,'a nearby threat behind the player remains audible');assert.equal(militaryAudioPlacement(behind,{...ground,visibleOnly:true}),null,'rotors require visibility');
});

test('burst concurrency, event intake, buffer variants and repeated shot rates stay bounded',t=>{
  const f=fixture(t);f.audio.unlock();
  for(let frame=0;frame<20;frame++){
    f.context.advance(.06);const events=Array.from({length:600},(_,index)=>f.shot(['soldier','tank','artillery','helicopter'][index%4],index%12,index+frame*600));
    f.audio.update(.06,{...f.options,events});assert.ok(f.audio.stats.voices<=MILITARY_AUDIO_RULES.maxVoices);assert.ok(f.audio.stats.buffers<=4*MILITARY_AUDIO_RULES.variants);
  }
  assert.ok(f.audio.stats.played>10);assert.ok(f.audio.stats.dropped>10000);assert.ok(f.audio.stats.peakVoices<=16);
  const before=f.audio.stats.buffers;f.context.advance(2);f.audio.update(.1,{...f.options,events:[f.shot()]});assert.ok(f.audio.stats.buffers<=before+1);
  f.context.advance(2);f.audio.update(.1,f.options);assert.equal(f.audio.stats.voices,0);assert.ok(f.sources.every(source=>source.disconnected));
});

test('impact and destruction sounds follow outcome events rather than predicting hits',t=>{
  const f=fixture(t);f.audio.unlock();
  const at={x:0,y:0,z:0};f.audio.update(.1,{...f.options,events:[{type:'damage',amount:3,unitId:'first'},{type:'impact',kind:'soldier',position:at,time:1},{type:'destroyed',kind:'tank',position:at,time:1}]});
  assert.equal(f.audio.stats.played,2);assert.equal(f.audio.stats.buffers,2);
  assert.ok(f.sources.some(source=>source.buffer.duration===MILITARY_SOUND_DURATIONS.blast));assert.ok(f.sources.some(source=>source.buffer.duration===MILITARY_SOUND_DURATIONS.ricochet));
});

test('pause, mute and tab hiding stop current voices and discard sounds until resumed',async t=>{
  const f=fixture(t);f.audio.unlock();f.audio.update(.1,{...f.options,events:[f.shot()]});assert.equal(f.audio.stats.voices,1);
  f.audio.update(.1,{...f.options,paused:true,events:[f.shot('artillery')]});assert.equal(f.audio.stats.voices,0);assert.equal(f.context.state,'suspended');assert.equal(f.audio.stats.played,1);
  await Promise.resolve();await Promise.resolve();f.audio.update(.1,f.options);await Promise.resolve();f.audio.update(.1,f.options);assert.equal(f.audio.stats.played,1);
  f.context.advance(1);f.audio.update(.1,{...f.options,events:[f.shot()]});assert.equal(f.audio.stats.played,2);
  f.document.hidden=true;f.document.dispatch('visibilitychange');assert.equal(f.audio.stats.voices,0);assert.equal(f.context.state,'suspended');f.audio.update(.1,{...f.options,events:[f.shot('artillery')]});
  f.audio.setMuted(true);assert.equal(f.audio.stats.muted,true);const button=f.parent.children.find(child=>child.className==='military-audio-toggle');assert.equal(button.getAttribute('aria-pressed'),'true');assert.equal(button.getAttribute('aria-label'),'Unmute combat sounds');
  f.document.hidden=false;f.document.dispatch('visibilitychange');f.window.dispatch('pointerdown');assert.equal(f.context.state,'suspended');assert.equal(f.audio.stats.played,2);
  f.audio.setMuted(false);await Promise.resolve();await Promise.resolve();f.audio.update(.1,f.options);assert.equal(f.audio.stats.played,2);
});

test('only two nearby visible helicopters can emit quiet rotor cues',t=>{
  const f=fixture(t);f.audio.unlock();const units=Array.from({length:150},(_,i)=>({id:`heli-${i}`,kind:'helicopter',hp:18,x:i<3?i*4:200+i,y:5,z:0}));
  f.audio.update(.5,{...f.options,walkingWeight:1,units});assert.equal(f.audio.stats.rotorVoices,2);assert.equal(f.audio.stats.played,2);
  f.context.advance(.5);f.audio.update(.5,{...f.options,walkingWeight:0,mapBlend:1,units});assert.equal(f.audio.stats.rotorVoices,0);assert.equal(f.audio.stats.played,2,'the map does not hum with every distant helicopter');
});

test('disposing the audio layer closes its context, removes UI/listeners and stops every source',t=>{
  const f=fixture(t);f.audio.unlock();f.audio.update(.1,{...f.options,events:[f.shot()]});f.audio.dispose();f.audio.dispose();assert.equal(f.context.closes,1);assert.equal(f.audio.stats.voices,0);assert.equal(f.audio.stats.buffers,0);assert.equal(f.parent.children.length,1);assert.equal(f.audio.stats.disposed,true);
  for(const target of [f.window,f.document])for(const listeners of target.listeners.values())assert.equal(listeners.size,0);
  assert.ok(f.sources.every(source=>source.stopped&&source.disconnected));f.window.dispatch('pointerdown');f.audio.update(.1,{...f.options,events:[f.shot()]});assert.equal(f.audio.stats.played,1);
});

test('M mute works under pointer lock while ignoring editing, modifiers and repeats',t=>{
  const f=fixture(t);let prevented=0,stopped=0;const key={key:'m',code:'KeyM',preventDefault(){prevented++;},stopPropagation(){stopped++;}};
  f.window.dispatch('keydown',key);assert.equal(f.audio.stats.muted,true);assert.equal(f.created,0);assert.equal(prevented,1);assert.equal(stopped,0,'other game handlers retain their normal event flow');
  for(const extra of [{repeat:true},{metaKey:true},{ctrlKey:true},{altKey:true},{shiftKey:true},{target:{tagName:'INPUT'}},{target:{isContentEditable:true}}])f.window.dispatch('keydown',{...key,...extra});
  assert.equal(f.audio.stats.muted,true);assert.equal(prevented,1);
  f.window.dispatch('keydown',key);assert.equal(f.audio.stats.muted,false);assert.equal(f.created,1);assert.equal(prevented,2);
  const button=f.parent.children.find(child=>child.className==='military-audio-toggle');assert.equal(button.getAttribute('aria-keyshortcuts'),'M');assert.equal(button.title,'Mute combat sounds · M');
});

test('sound prewarming compiles one clip per idle turn and cancels for pause, mute and teardown',async t=>{
  const f=fixture(t);assert.equal(f.idle.size,0);f.audio.unlock();await Promise.resolve();await Promise.resolve();
  assert.equal(f.idle.size,1);assert.equal(f.audio.stats.buffers,0);
  f.flushIdle(2);assert.equal(f.audio.stats.buffers,0,'busy frames defer synthesis');assert.equal(f.idle.size,1);
  f.flushIdle();assert.equal(f.audio.stats.buffers,1);assert.equal(f.idle.size,1);assert.equal(f.audio.stats.played,0,'prewarming never starts audio');
  f.audio.update(0,{...f.options,paused:true});assert.equal(f.idle.size,0);
  await Promise.resolve();await Promise.resolve();f.audio.update(.1,f.options);await Promise.resolve();await Promise.resolve();assert.equal(f.idle.size,1);
  f.audio.setMuted(true);assert.equal(f.idle.size,0);f.audio.setMuted(false);await Promise.resolve();await Promise.resolve();
  for(let i=0;i<24;i++)f.flushIdle();assert.equal(f.audio.stats.buffers,24);assert.equal(f.idle.size,0);assert.ok(f.audio.stats.bufferBytes<1500000);
  f.audio.dispose();assert.equal(f.idle.size,0);assert.equal(f.audio.stats.buffers,0);
});
