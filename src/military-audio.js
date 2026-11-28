import {Vector3} from 'three';
import {surfaceDistance,surfacePoint} from './world-surface.js';

export const MILITARY_AUDIO_RULES=Object.freeze({sampleRate:24000,variants:3,maxVoices:16,maxStartsPerFrame:6,maxEventsPerFrame:128,masterGain:.34,rotorInterval:.5,maxRotors:2});
export const MILITARY_SOUND_DURATIONS=Object.freeze({rifle:.20,cannon:.82,howitzer:1.10,rocket:.43,ricochet:.16,impact:.34,blast:1.18,rotor:.46});
const GAIN={rifle:.56,cannon:.85,howitzer:.9,rocket:.55,ricochet:.22,impact:.44,blast:.93,rotor:.15};
const GAP={rifle:.025,cannon:.055,howitzer:.08,rocket:.055,ricochet:.035,impact:.055,blast:.08,rotor:0};
const TAU=Math.PI*2,clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
const finitePoint=point=>Number.isFinite(point?.x)&&Number.isFinite(point?.z);
const seedHash=value=>{let result=2166136261;for(const c of String(value)){result^=c.charCodeAt(0);result=Math.imul(result,16777619);}return result>>>0;};
const decay=(time,seconds)=>time<0?0:Math.exp(-time/seconds)*(1-Math.exp(-time/.0012));
const fallingTone=(time,start,end,fall)=>Math.sin(TAU*(end*time+(start-end)*fall*(1-Math.exp(-time/fall))));
let rememberedMuted=false;

/** Original, deterministic mono recordings synthesized from noise and decaying
 * resonances. No downloaded audio, oscillators per shot, or external assets. */
export function synthesizeMilitarySound(kind,{sampleRate=MILITARY_AUDIO_RULES.sampleRate,variant=0}={}){
  if(!Object.hasOwn(MILITARY_SOUND_DURATIONS,kind))throw new TypeError(`Unknown military sound: ${kind}`);
  if(!Number.isFinite(sampleRate)||sampleRate<8000||sampleRate>96000)throw new RangeError('Audio sample rate must be 8–96 kHz');
  let seed=seedHash(`${kind}:${variant}`),low=0,mid=0,high=0,dc=0;
  const random=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return (seed>>>0)/2147483648-1;};
  const duration=MILITARY_SOUND_DURATIONS[kind],samples=new Float32Array(Math.ceil(duration*sampleRate));
  const lowA=1-Math.exp(-TAU*110/sampleRate),midA=1-Math.exp(-TAU*850/sampleRate),highA=1-Math.exp(-TAU*3200/sampleRate),dcA=1-Math.exp(-TAU*18/sampleRate);
  const pitch=1+((Math.abs(Math.trunc(variant))%3)-1)*.055;
  for(let i=0;i<samples.length;i++){
    const t=i/sampleRate,n=random();low+=(n-low)*lowA;mid+=(n-mid)*midA;high+=(n-high)*highA;
    let signal=0;
    if(kind==='rifle'){
      for(const delay of [0,.055]){const age=t-delay;if(age<0)continue;signal+=(high-mid*.4)*2.1*decay(age,.019)+fallingTone(age,210*pitch,92*pitch,.018)*.28*decay(age,.028);}
      signal+=(high-mid)*.18*decay(t-.105,.022);
    }else if(kind==='cannon'){
      signal=(high-mid*.3)*1.25*decay(t,.035)+(low*4+mid*.9)*decay(t,.24)+fallingTone(t,93*pitch,34*pitch,.035)*.40*decay(t,.16);
      signal+=(high-mid)*.16*decay(t-.14,.045);
    }else if(kind==='howitzer'){
      signal=(high-mid)*.9*decay(t,.04)+(low*5.2+mid*1.5)*decay(t,.34)+fallingTone(t,68*pitch,26*pitch,.05)*.43*decay(t,.25);
      signal+=(mid-low)*.35*decay(t-.13,.15);
    }else if(kind==='rocket'){
      signal=high*1.4*decay(t,.022)+(high-mid)*.9*(1-Math.exp(-t/.018))*Math.exp(-t/.12)+low*2.4*decay(t,.11);
    }else if(kind==='ricochet'){
      signal=(n-mid)*.85*decay(t,.014)+Math.sin(TAU*1320*pitch*t)*.12*decay(t,.035)+Math.sin(TAU*2070*pitch*t)*.06*decay(t,.025);
    }else if(kind==='impact'){
      signal=high*1.3*decay(t,.032)+(mid*1.3+low*2.4)*decay(t,.085)+fallingTone(t,150*pitch,49*pitch,.025)*.22*decay(t,.07);
    }else if(kind==='blast'){
      signal=high*.75*decay(t,.035)+(mid*1.65+low*5)*decay(t,.30)+fallingTone(t,74*pitch,23*pitch,.05)*.37*decay(t,.30);
      signal+=(high-mid)*.22*(decay(t-.16,.06)+decay(t-.27,.08));
    }else if(kind==='rotor'){
      const chop=Math.pow(.5+.5*Math.sin(TAU*17.5*t),5);
      signal=(mid*1.9+low*1.6)*(.15+.85*chop)+Math.sin(TAU*70*t)*.075*(.4+.6*chop);
    }
    // Remove sub-audible offset and give every cached clip clean zero edges.
    dc+=(signal-dc)*dcA;const fade=Math.min(1,t/.003,(duration-t)/.025);samples[i]=Math.tanh((signal-dc)*1.5)*.82*Math.max(0,fade);
  }
  samples[0]=samples[samples.length-1]=0;return samples;
}

const worldPoint=new Vector3(),viewPoint=new Vector3(),screenPoint=new Vector3();
/** Focus-relative distance keeps the strategy camera from sounding hundreds
 * of metres above the board. Ground view retains nearby off-screen warnings. */
export function militaryAudioPlacement(position,{camera,root,focus,world,walkingWeight=0,mapBlend=0,visibleOnly=false}={}){
  if(!finitePoint(position)||!camera||!finitePoint(focus))return null;
  const walking=walkingWeight>.5,range=walking?62:mapBlend>.5?180:110;
  const distance=Math.hypot(surfaceDistance(world,position,focus),((position.y??0)-(focus.y??0))*.35);
  if(distance>=range)return null;
  surfacePoint(world,position.x,position.y??0,position.z,worldPoint);if(root?.matrixWorld)worldPoint.applyMatrix4(root.matrixWorld);
  viewPoint.copy(worldPoint).applyMatrix4(camera.matrixWorldInverse);screenPoint.copy(worldPoint).project(camera);
  const visible=screenPoint.z>=-1&&screenPoint.z<=1&&Math.abs(screenPoint.x)<1.12&&Math.abs(screenPoint.y)<1.12;
  if(!visible&&(visibleOnly||!walking||distance>28))return null;
  const scale=camera.isOrthographicCamera?Math.max(1,(camera.right-camera.left)/camera.zoom*.5):Math.max(4,Math.abs(viewPoint.z)*.8);
  const pan=clamp(viewPoint.x/scale,-.85,.85),distanceGain=(1-distance/range)**2;
  return{pan,distance,visible,gain:distanceGain*(walking?1:mapBlend>.5?.40:.64)*(visible?1:.4)};
}

const CSS=`.military-audio-toggle{position:absolute;z-index:13;right:max(18px,env(safe-area-inset-right));top:66px;display:grid;place-items:center;width:34px;height:32px;box-sizing:border-box;padding:5px;border:1px solid #b89d6180;border-radius:4px;background:var(--hud-panel,#183c3e);color:var(--hud-ink,#f0f0dc);cursor:pointer;pointer-events:auto;touch-action:manipulation}.military-audio-toggle[data-embedded=true]{position:relative;inset:auto;margin:8px auto 0}.military-audio-toggle:hover{background:#315856}.military-audio-toggle:focus-visible{outline:2px solid #f0d58d;outline-offset:3px}.military-audio-toggle:active{background:#40786c}.military-audio-toggle svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.military-audio-toggle[data-muted=true]{color:#b8ccc2}.military-audio-toggle[data-muted=true] .military-audio-waves,.military-audio-toggle[data-muted=false] .military-audio-slash{display:none}.military-audio-toggle:disabled{opacity:.5;cursor:default}@media(max-width:700px){.military-audio-toggle{right:9px}}`;

/** One bounded event-driven sound mixer. Context creation/resume occurs only
 * after a user gesture. Hidden, muted and paused frames discard new events;
 * they never create a backlog to play when the listener returns. */
export function createMilitaryAudio({canvas,parent=canvas?.parentElement,controlsParent,contextFactory,world,muted=rememberedMuted}={}){
  const document=canvas?.ownerDocument??globalThis.document,window=document?.defaultView??globalThis;
  const AudioContextType=window.AudioContext??window.webkitAudioContext;
  const supported=!!contextFactory||typeof AudioContextType==='function';
  const makeContext=contextFactory??(()=>new AudioContextType({latencyHint:'interactive'}));
  let context=null,compressor=null,master=null,disposed=false,unlocked=false,paused=false,resuming=false,suspending=false;
  let clock=0,nextRotor=0,rotorVoices=0,warmHandle=null,warmIndex=0;
  const voices=new Set(),buffers=new Map(),lastKind=new Map(),listeners=[],candidates=[];
  const warmJobs=Array.from({length:MILITARY_AUDIO_RULES.variants},(_,variant)=>Object.keys(MILITARY_SOUND_DURATIONS).map(kind=>({kind,variant}))).flat();
  const nativeIdle=typeof window.requestIdleCallback==='function';
  const requestIdle=nativeIdle?fn=>window.requestIdleCallback(fn):fn=>setTimeout(()=>fn({timeRemaining:()=>8}),48);
  const cancelIdle=nativeIdle?id=>window.cancelIdleCallback(id):id=>clearTimeout(id);
  const totals={played:0,dropped:0,culled:0,peakVoices:0,failures:0};
  let toggle=null,style=null;
  function listen(target,name,handler,options){target?.addEventListener(name,handler,options);listeners.push(()=>target?.removeEventListener(name,handler,options));}
  if(document?.createElement&&parent){
    style=document.createElement('style');style.textContent=CSS;parent.append(style);
    toggle=document.createElement('button');toggle.type='button';toggle.className='military-audio-toggle';toggle.dataset.embedded=String(!!controlsParent);
    toggle.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 5-5 4H3v6h3l5 4Z"/><path class="military-audio-waves" d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/><path class="military-audio-slash" d="m15 9 6 6m0-6-6 6"/></svg>';
    (controlsParent??parent).append(toggle);
    listen(toggle,'click',event=>{event.stopPropagation();setMuted(!muted);if(!muted)unlock();});
    for(const name of ['pointerdown','pointerup','dblclick','contextmenu'])listen(toggle,name,event=>event.stopPropagation());
  }
  function updateControl(){if(!toggle)return;toggle.dataset.muted=String(muted);toggle.disabled=!supported;toggle.setAttribute('aria-pressed',String(muted));toggle.setAttribute('aria-keyshortcuts','M');const label=!supported?'Combat audio unavailable':muted?'Unmute combat sounds':'Mute combat sounds';toggle.setAttribute('aria-label',label);toggle.title=supported?`${label} · M`:label;}
  function finish(voice){if(!voices.delete(voice))return;if(voice.kind==='rotor')rotorVoices--;voice.source.onended=null;voice.source.disconnect();voice.gain.disconnect();voice.pan?.disconnect();}
  function stopAll(){for(const voice of [...voices]){try{voice.source.stop();}catch{}finish(voice);}rotorVoices=0;nextRotor=clock+MILITARY_AUDIO_RULES.rotorInterval;}
  function wanted(){return !disposed&&unlocked&&!muted&&!paused&&!document?.hidden;}
  function cancelWarmup(){if(warmHandle!==null)cancelIdle(warmHandle);warmHandle=null;}
  function warmup(){
    if(warmHandle!==null||!wanted()||context?.state!=='running')return;
    while(warmIndex<warmJobs.length&&buffers.has(`${warmJobs[warmIndex].kind}:${warmJobs[warmIndex].variant}`))warmIndex++;
    if(warmIndex===warmJobs.length)return;
    // One clip per idle callback, so a new battle never compiles the whole bank
    // on one frame. Safari fallback also spreads clips across separate turns.
    warmHandle=requestIdle(deadline=>{warmHandle=null;if(!wanted())return;if(deadline.timeRemaining()>=6){const job=warmJobs[warmIndex++];bufferFor(job.kind,job.variant);}warmup();});
  }
  function syncContext(){
    if(!context||context.state==='closed')return;
    if(!wanted()){
      cancelWarmup();stopAll();if(context.state==='running'&&!suspending){suspending=true;Promise.resolve(context.suspend()).catch(()=>{totals.failures++;}).finally(()=>{suspending=false;if(wanted())syncContext();});}
    }else if(context.state!=='running'&&!resuming){
      resuming=true;Promise.resolve(context.resume()).catch(()=>{totals.failures++;}).finally(()=>{resuming=false;if(!wanted()||context.state==='running')syncContext();});
    }else warmup();
  }
  function unlock(){
    if(disposed||!supported||muted||paused||document?.hidden)return false;
    if(!context){
      try{context=makeContext();compressor=context.createDynamicsCompressor();compressor.threshold.value=-14;compressor.knee.value=9;compressor.ratio.value=8;compressor.attack.value=.003;compressor.release.value=.16;
        master=context.createGain();master.gain.value=MILITARY_AUDIO_RULES.masterGain;compressor.connect(master);master.connect(context.destination);
      }catch{totals.failures++;compressor?.disconnect();master?.disconnect();if(context&&context.state!=='closed')Promise.resolve(context.close()).catch(()=>{});context=null;compressor=master=null;return false;}
    }
    unlocked=true;syncContext();return true;
  }
  function setMuted(value){muted=Boolean(value);rememberedMuted=muted;syncContext();updateControl();}
  function bufferFor(kind,variant){
    const key=`${kind}:${variant}`;if(buffers.has(key))return buffers.get(key);
    const samples=synthesizeMilitarySound(kind,{variant}),buffer=context.createBuffer(1,samples.length,MILITARY_AUDIO_RULES.sampleRate);buffer.getChannelData(0).set(samples);buffers.set(key,buffer);return buffer;
  }
  function play(kind,position,key,options){
    const place=militaryAudioPlacement(position,options);if(!place||place.gain<.015){totals.culled++;return false;}
    const now=context.currentTime,last=lastKind.get(kind)??-Infinity;
    if(voices.size>=MILITARY_AUDIO_RULES.maxVoices||now-last<GAP[kind]||kind==='rotor'&&rotorVoices>=MILITARY_AUDIO_RULES.maxRotors){totals.dropped++;return false;}
    const source=context.createBufferSource(),gain=context.createGain(),pan=context.createStereoPanner?.()??null;
    source.buffer=bufferFor(kind,seedHash(key)%MILITARY_AUDIO_RULES.variants);source.playbackRate.value=.975+(seedHash(`${key}:rate`)%51)/1000;
    gain.gain.value=GAIN[kind]*place.gain;if(pan){pan.pan.value=place.pan;source.connect(gain);gain.connect(pan);pan.connect(compressor);}else{source.connect(gain);gain.connect(compressor);}
    const voice={source,gain,pan,kind,until:now+source.buffer.duration/source.playbackRate.value+.05};voices.add(voice);if(kind==='rotor')rotorVoices++;
    source.onended=()=>finish(voice);source.start(now);lastKind.set(kind,now);totals.played++;totals.peakVoices=Math.max(totals.peakVoices,voices.size);return true;
  }
  function eventSound(event){
    if(event.type==='shot')return{kind:{soldier:'rifle',tank:'cannon',artillery:'howitzer',helicopter:'rocket'}[event.kind],position:event.from,priority:event.kind==='soldier'?1:3};
    if(event.type==='impact')return{kind:event.kind==='soldier'?'ricochet':'impact',position:event.position,priority:2};
    if(event.type==='destroyed')return{kind:event.kind==='soldier'?'impact':'blast',position:event.position,priority:4};
    return null;
  }
  const gesture=event=>{
    if(event.isTrusted===false||event.altKey||event.metaKey||event.ctrlKey)return;
    const editing=event.target?.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(event.target?.tagName??'')||event.target?.closest?.('[contenteditable="true"], [role="textbox"]');
    if(event.type==='keydown'&&(event.code==='KeyM'||String(event.key).toLowerCase()==='m')&&!event.shiftKey&&!event.repeat&&!editing){setMuted(!muted);event.preventDefault?.();}
    if(!editing)unlock();
  };
  // Window capture runs before the army/rail keyboard handlers consume keys.
  for(const name of ['pointerdown','pointerup','keydown'])listen(window,name,gesture,true);
  listen(document,'visibilitychange',syncContext);
  updateControl();
  return{unlock,setMuted,
    update(dt,{events=[],units=[],camera,root,focus,walkingWeight=0,mapBlend=0,paused:nextPaused=false}={}){
      if(disposed)return;paused=Boolean(nextPaused);if(Number.isFinite(dt)&&dt>0)clock+=Math.min(dt,.25);syncContext();
      if(!wanted()||context?.state!=='running'){totals.dropped+=events.length;return;}
      for(const voice of voices)if(voice.until<context.currentTime)finish(voice);
      root?.updateWorldMatrix?.(true,false);camera?.updateMatrixWorld?.(true);
      const options={camera,root,focus,walkingWeight,mapBlend,world};candidates.length=0;
      for(let index=0;index<Math.min(events.length,MILITARY_AUDIO_RULES.maxEventsPerFrame);index++){
        const event=events[index],sound=eventSound(event);if(sound?.kind&&finitePoint(sound.position))candidates.push({...sound,key:`${event.type}:${event.unitId??index}:${event.time??clock}`});
      }
      if(events.length>MILITARY_AUDIO_RULES.maxEventsPerFrame)totals.dropped+=events.length-MILITARY_AUDIO_RULES.maxEventsPerFrame;
      candidates.sort((a,b)=>b.priority-a.priority);let starts=0;
      for(const sound of candidates){if(starts>=MILITARY_AUDIO_RULES.maxStartsPerFrame){totals.dropped++;continue;}if(play(sound.kind,sound.position,sound.key,options))starts++;}
      if(clock>=nextRotor&&walkingWeight>.15&&mapBlend<.5&&starts<MILITARY_AUDIO_RULES.maxStartsPerFrame){
        nextRotor=clock+MILITARY_AUDIO_RULES.rotorInterval;let nearest=null,other=null,nearestD=28,otherD=28;
        for(const unit of units){if(unit.kind!=='helicopter'||unit.hp<=0||!finitePoint(unit)||!finitePoint(focus))continue;const distance=surfaceDistance(world,unit,focus);if(distance<nearestD){other=nearest;otherD=nearestD;nearest=unit;nearestD=distance;}else if(distance<otherD){other=unit;otherD=distance;}}
        for(const unit of [nearest,other])if(unit&&starts<MILITARY_AUDIO_RULES.maxStartsPerFrame&&play('rotor',unit,unit.id,{...options,visibleOnly:true}))starts++;
      }
    },
    get stats(){return{...totals,supported,unlocked,muted,paused,disposed,state:context?.state??'locked',voices:voices.size,buffers:buffers.size,bufferBytes:[...buffers.values()].reduce((sum,buffer)=>sum+buffer.length*4,0),rotorVoices,warming:warmHandle!==null};},
    dispose(){if(disposed)return;disposed=true;listeners.forEach(remove=>remove());cancelWarmup();stopAll();buffers.clear();lastKind.clear();candidates.length=0;compressor?.disconnect();master?.disconnect();if(context&&context.state!=='closed')Promise.resolve(context.close()).catch(()=>{});toggle?.remove();style?.remove();},
  };
}
