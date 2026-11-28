import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createMilitaryBatch} from './military-batch.js';
import {createMilitaryEffects} from './military-effects.js';
import {MILITARY_KINDS,MILITARY_ART} from './military-assets.js';
import {applySceneStyle,styleUniforms} from './scene-style.js';
import './military-preview.css';

// This entry deliberately owns no world, economy, health, targeting AI or orders.
// Pairs in the stress tableau are fixed presentation cues, not combat behavior.
const $=selector=>document.querySelector(selector),canvas=$('#world');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'low-power'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.35));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
const scene=new THREE.Scene();scene.background=new THREE.Color('#bdd2ca');
const camera=new THREE.PerspectiveCamera(35,1,.05,1400),controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;controls.dampingFactor=.12;controls.minDistance=1.3;controls.maxDistance=700;controls.maxPolarAngle=Math.PI*.47;controls.enablePan=true;
const sky=new THREE.HemisphereLight('#e1f1ed','#85905a',2.7);scene.add(sky);
const sun=new THREE.DirectionalLight('#fff0cb',3.5);sun.position.set(-12,22,12);sun.castShadow=true;
sun.shadow.mapSize.set(1024,1024);sun.shadow.normalBias=.008;sun.shadow.bias=-.0003;scene.add(sun,sun.target);
const fill=new THREE.DirectionalLight('#bbdce4',.75);fill.position.set(10,6,-12);scene.add(fill);
const environment=new THREE.Group();scene.add(environment);
const ownedGeometry=[],ownedMaterial=[];
function material(color,kind='asset'){const m=applySceneStyle(new THREE.MeshStandardMaterial({color,roughness:1,flatShading:true}),{kind});ownedMaterial.push(m);return m;}
const grass=material('#9ba86b','terrain'),soil=material('#aa9271'),path=material('#c7bc94'),stone=material('#84978b'),wood=material('#6b7260');
const leaf=material('#527b50'),water=material('#5ea5a3','water');
function mesh(geometry,mat,x,y,z){ownedGeometry.push(geometry);const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);m.receiveShadow=true;m.castShadow=true;environment.add(m);return m;}
const base=mesh(new THREE.BoxGeometry(1,1,1),soil,0,-.44,0);
const ground=mesh(new THREE.BoxGeometry(1,1,1),grass,0,-.085,0);ground.castShadow=false;
const lane=mesh(new THREE.BoxGeometry(1,.008,1),path,0,.004,0);lane.castShadow=false;
const pool=mesh(new THREE.CylinderGeometry(1,1,.018,32),water,0,.018,5);pool.visible=false;
const decor=[];
for(let i=0;i<13;i++){
  const x=-10+i*1.65,z=-4.8-Math.sin(i*2.4)*.7,h=.85+(i%4)*.22;
  decor.push(mesh(new THREE.CylinderGeometry(.065,.09,h,5),wood,x,h/2,z));
  decor.push(mesh(new THREE.IcosahedronGeometry(h*.46,0),leaf,x,h*1.12,z));
}
for(let i=0;i<7;i++){
  const rock=mesh(new THREE.IcosahedronGeometry(.28+(i%3)*.11,0),stone,-9+i*3,.15,4.4+Math.sin(i*4)*.7);rock.scale.set(1,.6,.8);decor.push(rock);
}
const batch=createMilitaryBatch(scene,{capacity:2048});
const effects=createMilitaryEffects(scene,{maxProjectiles:256,maxParticles:768,maxMarks:256});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
let kind='all',team='teal',surface='grass',count=4,moving=false,exchange=!reducedMotion,paused=false;
let units=[],extent=12,time=0,lastFrame=0,raf=0,frames=0,frameTime=0,frameCost=0,lastStats=0,nextContact=0,statusUntil=0;
const pending=[],from=new THREE.Vector3(),to=new THREE.Vector3();
const hash=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
const setPressed=(element,value)=>element.setAttribute('aria-pressed',String(value));
setPressed($('#exchange'),exchange);

function configure(){
  effects.clear();pending.length=0;units=[];lastStats=0;frames=frameTime=frameCost=0;
  const stress=count>4;
  if(!stress){
    const kinds=kind==='all'?MILITARY_KINDS:[kind];
    kinds.forEach((type,i)=>units.push({id:i,kind:type,x:kind==='all'?[-5.4,-2.15,2.1,5.3][i]:0,y:type==='helicopter'?.75:0,z:kind==='all'?(type==='helicopter'?-1.5:0):0,heading:0,team,moving,phase:hash(i),nextShot:time+.5+i*.65}));
    extent=kind==='all'?11.5:kind==='soldier'?2.7:kind==='helicopter'?5.1:4.4;
  }else{
    const columns=Math.ceil(Math.sqrt(count/2)),rows=Math.ceil(count/2/columns),gap=4.9;
    extent=Math.max(columns,rows)*gap*.6+10;
    for(let i=0;i<count;i++){
      const side=i%2,index=Math.floor(i/2),x=(index%columns-(columns-1)/2)*gap,z=(Math.floor(index/columns)*gap+5)*(side?1:-1);
      const type=kind==='all'?MILITARY_KINDS[index%4]:kind;
      units.push({id:i,kind:type,x,y:type==='helicopter'?1.2:0,z,heading:side?Math.PI:0,team:side?'coral':team,moving,phase:hash(i),nextShot:time+hash(i+7)*9,target:i^1});
    }
    extent=Math.max(columns*gap/2,rows*gap+6)+5;
  }
  batch.setUnits(units);base.scale.set(extent*2,.68,extent*1.65);ground.scale.set(extent*2,.17,extent*1.65);
  // Long formations need ground under every pair, not a distant void.
  if(stress){base.scale.z=ground.scale.z=extent*2.05;}
  lane.scale.set(stress?3:extent*1.8,1,stress?extent*2:1.8);lane.position.z=stress?0:-2.6;
  pool.scale.set(extent*.77,1,extent*.31);pool.position.set(0,.018,stress?0:extent*.48);pool.visible=surface==='water';
  for(const item of decor)item.visible=!stress&&kind==='all';
  sun.castShadow=!stress;sun.shadow.camera.left=sun.shadow.camera.bottom=-extent;sun.shadow.camera.right=sun.shadow.camera.top=extent;sun.shadow.camera.far=70;sun.shadow.camera.updateProjectionMatrix();
  const focusHeight=kind==='soldier'&&!stress?.36:.75;
  controls.target.set(0,focusHeight,stress?0:.2);
  const distance=stress?extent*2.9:kind==='all'?21:kind==='soldier'?3.2:kind==='helicopter'?9:7.8;
  camera.near=Math.max(.025,distance*.008);camera.far=Math.max(150,distance*5);camera.updateProjectionMatrix();
  camera.position.set(distance*.62,distance*.62,distance*.92);camera.lookAt(controls.target);controls.update();
  scene.fog=new THREE.Fog(scene.background,stress?extent*5:75,stress?extent*8:150);resize();
  $('#visible-count').textContent=`${units.length.toLocaleString()} ${units.length===1?'unit':'units'}`;
}

// The cue scheduler launches only a bounded number per rendered frame. Projectile
// capacity is fixed and old cosmetic trails recycle; it cannot grow with battle time.
function cue(unit){
  const shot=batch.attack(unit.id);if(!shot)return;
  if(pending.length<512)pending.push({id:unit.id,at:time+shot.fireDelay,kind:shot.projectile});
}
function emitCues(){
  let budget=24;
  if(exchange)for(const unit of units){if(unit.nextShot<=time&&budget>0){cue(unit);unit.nextShot=time+2.5+hash(unit.id+Math.floor(time))*6;budget--;}}
  for(let i=pending.length-1;i>=0;i--){
    const shot=pending[i];if(shot.at>time)continue;
    const unit=units[shot.id];batch.muzzleAt(unit.id,from);
    if(count>4){const target=units[unit.target];to.set(target.x+(hash(unit.id+time)*.7-.35),.12,target.z);}
    else to.set(unit.x+Math.sin(unit.id*7)*.65,surface==='water'?.04:.06,Math.min(extent*.65,3.9));
    effects.fire({kind:shot.kind,from,to,surface,color:unit.team==='coral'?'#d37358':'#f3cd77'});pending.splice(i,1);
  }
  if(moving&&time>=nextContact){
    nextContact=time+.18;
    // Contact details are only useful nearby, and are deliberately capped.
    for(let i=0;i<Math.min(units.length,12);i++){
      const u=units[i];if(camera.position.distanceTo(u)>32)continue;
      effects.contact({kind:u.kind==='helicopter'?'rotor':u.kind==='soldier'?'footstep':'track',position:{x:u.x,y:.02,z:u.z},heading:u.heading,strength:u.kind==='helicopter'?.65:.4,surface});
    }
  }
}

function announce(text){$('#status').textContent=text;$('#status').classList.add('show');statusUntil=performance.now()+1500;}
for(const button of document.querySelectorAll('[data-kind]'))button.addEventListener('click',()=>{kind=button.dataset.kind;document.querySelectorAll('[data-kind]').forEach(el=>setPressed(el,el===button));configure();});
function recolor(next){team=next;document.querySelectorAll('[data-team]').forEach(el=>setPressed(el,el.dataset.team===next));for(const unit of units)if(count<=4||unit.id%2===0){unit.team=next;batch.setColor(unit.id,next);}}
for(const button of document.querySelectorAll('[data-team]'))button.addEventListener('click',()=>recolor(button.dataset.team));
$('#team-color').addEventListener('input',event=>recolor(event.target.value));
function fire(){if(paused){paused=false;setPressed($('#pause'),false);$('#pause').textContent='Pause';}for(const unit of units.slice(0,24))cue(unit);}
$('#fire').addEventListener('click',fire);
$('#moving').addEventListener('click',()=>{moving=!moving;setPressed($('#moving'),moving);for(const unit of units){unit.moving=moving;batch.setPose(unit.id,{moving});}});
$('#exchange').addEventListener('click',()=>{exchange=!exchange;setPressed($('#exchange'),exchange);});
$('#pause').addEventListener('click',()=>{paused=!paused;setPressed($('#pause'),paused);$('#pause').textContent=paused?'Resume':'Pause';});
$('#count').addEventListener('change',event=>{count=Number(event.target.value);configure();});
$('#surface').addEventListener('change',event=>{surface=event.target.value;grass.color.set({grass:'#9ba86b',sand:'#c6b085',stone:'#99a49b',water:'#b6ba91'}[surface]);pool.visible=surface==='water';});
window.addEventListener('keydown',event=>{if(event.code==='Space'&&!/INPUT|SELECT|BUTTON/.test(document.activeElement.tagName)){event.preventDefault();fire();}});
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(raf);announce('Rendering paused. Reload to restore the preview.');});
function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}
window.addEventListener('resize',resize);
function frame(now){
  raf=requestAnimationFrame(frame);if(now-lastFrame<1000/30-.5)return;
  const delta=lastFrame?Math.min(.1,(now-lastFrame)/1000):0;lastFrame=now;
  const start=performance.now();controls.update();
  const near=Math.max(.025,camera.position.distanceTo(controls.target)*.005);
  if(Math.abs(camera.near-near)>.001){camera.near=near;camera.updateProjectionMatrix();}camera.updateMatrixWorld();
  if(!paused)time+=delta;
  batch.update(time,{camera,viewportHeight:innerHeight,forceDetail:count<=4,visibilityTime:now/1000});
  if(!paused){emitCues();effects.update(delta);styleUniforms.time.value=time;}
  const cpu=performance.now()-start;renderer.render(scene,camera);
  frameCost+=cpu;frames++;frameTime+=delta;
  if(now-lastStats>700){
    const stats=batch.stats,fx=effects.stats,fps=Math.round(frames/Math.max(.001,frameTime));
    $('#visible-count').textContent=`${stats.visible.toLocaleString()} / ${stats.units.toLocaleString()} units`;
    $('#performance').textContent=`${fps} fps · ${(frameCost/frames).toFixed(1)} ms update · ${stats.drawCalls} unit draws · ${stats.triangles<1000?stats.triangles:Math.round(stats.triangles/1000)+'k'} triangles`;
    Object.assign($('#performance').dataset,{units:stats.units,visible:stats.visible,draws:stats.drawCalls,triangles:stats.triangles,near:stats.near,far:stats.far,projectiles:fx.projectiles,particles:fx.particles,marks:fx.marks,impacts:fx.impacts,animationBytes:stats.animationBytes,frameMs:(frameCost/frames).toFixed(3),fps,cap:30,renderCalls:renderer.info.render.calls});
    frames=frameTime=frameCost=0;lastStats=now;
  }
  if(statusUntil&&now>statusUntil){$('#status').classList.remove('show');statusUntil=0;}
}
// Do not leave a hidden tab rendering on the user's Mac.
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);lastFrame=0;if(!document.hidden)raf=requestAnimationFrame(frame);});
window.addEventListener('pageshow',event=>{if(event.persisted){lastFrame=0;cancelAnimationFrame(raf);raf=requestAnimationFrame(frame);}});
window.addEventListener('pagehide',event=>{cancelAnimationFrame(raf);if(event.persisted)return;controls.dispose();batch.dispose();effects.dispose();ownedGeometry.forEach(g=>g.dispose());ownedMaterial.forEach(m=>m.dispose());renderer.dispose();});
configure();raf=requestAnimationFrame(frame);
