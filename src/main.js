import * as THREE from 'three';
import { createViewController } from './view-controller.js';
import { createViewCompositor } from './view-compositor.js';
import { buildMapWorld } from './map-world.js';
import { createWorldRenderer } from './world-renderer.js';
import { makeTrains } from './railway.js';
import { generateWorld,validateWorld } from './world-model.js';
import { createStressWorld } from './stress-world.js';
import { createWorldWorker } from './world-worker-client.js';
import { createGeometryUploader } from './geometry-uploader.js';
import { ambience } from './ambience.js';
import { C,color } from './palette.js';
import {surfaceFor,surfacePoint,surfaceFrame} from './world-surface.js';
import {createSurfaceShell} from './surface-shell.js';
import './style.css';

const canvas=document.querySelector('#world'),scene=new THREE.Scene(),mapScene=new THREE.Scene();
scene.background=mapScene.background=C.backdrop;
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.info.autoReset=false;
const camera=new THREE.OrthographicCamera(-60,60,45,-45,.1,500);
camera.position.set(115,125,145);camera.lookAt(0,1,0);
scene.add(new THREE.HemisphereLight(color(.94,.035,221),color(.55,.025,169),2.15));
const sun=new THREE.DirectionalLight(color(.98,.04,84),3.25);
sun.position.set(-65,110,65);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:260});
sun.shadow.normalBias=.025;sun.shadow.bias=-.00015;sun.shadow.radius=3;
scene.add(sun,sun.target);
const fill=new THREE.DirectionalLight(color(.85,.035,218),.65);fill.position.set(40,30,-40);scene.add(fill,fill.target);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000),new THREE.MeshStandardMaterial({color:C.backdrop,roughness:1}));
ground.rotation.x=-Math.PI/2;ground.position.y=-5.7;ground.receiveShadow=true;scene.add(ground);

let model,worldRoot,detail,trains=[],railway,life,authoring,mapWorld,surfaceShell,worker,pendingWorker;
let loadingVersion=0,shaderReady=false,shaderJob=null,generationMs=0,loadMs=0,loadStarted=0;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reducedMotion.matches;
reducedMotion.addEventListener('change',event=>{paused=event.matches;});
const compositor=createViewCompositor(renderer);
const geometryUploader=createGeometryUploader(renderer);
const view=createViewController({canvas,camera,scene,mapScene,reducedMotion,
  getTrains:()=>trains,getWorldRoot:()=>worldRoot,getWorld:()=>model,
  isDetailReady:()=>!!detail?.ready&&shaderReady,
  onPause:()=>{paused=!paused;},
  onRegenerate:()=>{
    if(!model)return;
    const seed=String(Number.isFinite(Number(model.seed))?Number(model.seed)+1:Date.now());
    loadWorld({...authoring,seed}).catch(reportError);
    const url=new URL(location.href);url.searchParams.set('seed',seed);history.replaceState(null,'',url);
  },
});
const {navigation,controls}=view;
let frameWidth=170,frameHeight=112,time=0;
const cameraDirection=new THREE.Vector3(115,125,145).normalize(),sunDirection=new THREE.Vector3(-65,110,65);
const lightFrame=new THREE.Matrix4(),localSun=new THREE.Vector3();
function disposeLife(){
  if(!life)return;
  life.root.traverse(node=>node.geometry?.dispose());life.root.removeFromParent();life=null;
}
function fitWorld(){
  view.reset();
  const xs=model.outline.map(p=>p[0]),zs=model.outline.map(p=>p[1]);
  const width=Math.max(...xs)-Math.min(...xs),depth=Math.max(...zs)-Math.min(...zs);
  const radius=Math.hypot(width,depth),height=Math.max(0,...model.mountains.map(m=>m.height));
  ground.visible=!surfaceFor(model);
  view.setScale(Math.max(1,radius/410));
  controls.target.set((Math.max(...xs)+Math.min(...xs))/2,1.3,(Math.max(...zs)+Math.min(...zs))/2);
  const direction=model.camera?.northUp?new THREE.Vector3(0,125,180).normalize():cameraDirection;
  navigation.position.copy(controls.target).addScaledVector(direction,radius*1.5+height);
  navigation.zoom=1;navigation.far=Math.max(500,radius*5+height*3);controls.update();
  ground.position.x=controls.target.x;ground.position.z=controls.target.z;ground.scale.setScalar(Math.max(1,radius/500));
  const inverse=navigation.quaternion.clone().invert();
  const points=model.outline.flatMap(([x,z])=>[new THREE.Vector3(x,-3.4,z),new THREE.Vector3(x,4,z)]);
  model.mountains.forEach(m=>points.push(new THREE.Vector3(m.x,m.height,m.z)));
  let x=0,y=0;
  points.forEach(p=>{p.sub(controls.target).applyQuaternion(inverse);x=Math.max(x,Math.abs(p.x));y=Math.max(y,Math.abs(p.y));});
  // Fit the flat projection as well: an isometric fit alone clips the northern
  // and southern corners when a continental world opens directly as a map.
  if(view.zoomScale>1){
    const plan=navigation.clone(),offset=new THREE.Vector3().subVectors(navigation.position,controls.target);
    const spherical=new THREE.Spherical().setFromVector3(offset);spherical.phi=.00001;
    plan.position.copy(controls.target).add(offset.setFromSpherical(spherical));plan.lookAt(controls.target);
    const planInverse=plan.quaternion.clone().invert();
    for(const [px,pz]of model.outline){
      const p=new THREE.Vector3(px,0,pz).sub(controls.target).applyQuaternion(planInverse);
      x=Math.max(x,Math.abs(p.x));y=Math.max(y,Math.abs(p.y));
    }
  }
  frameWidth=x*2+Math.max(10,x*.20);frameHeight=y*2+Math.max(10,y*.20);
  view.setScale(Math.max(view.zoomScale,frameHeight/230));
  resize();view.setHome();
}
function fitShadows(){
  const span=Math.max((camera.right-camera.left)/camera.zoom,(camera.top-camera.bottom)/camera.zoom);
  const extent=Math.min(480,Math.max(45,span*.72)),texel=extent*2/2048;
  const x=Math.round(controls.target.x/texel)*texel,z=Math.round(controls.target.z/texel)*texel;
  if(surfaceFor(model)){
    surfacePoint(model,x,0,z,sun.target.position);surfaceFrame(model,x,z,lightFrame);
    localSun.copy(sunDirection).applyMatrix4(lightFrame);
    sun.position.copy(sun.target.position).addScaledVector(localSun,Math.max(1,extent/95));
    fill.position.set(40,30,-40).applyMatrix4(lightFrame).add(sun.target.position);fill.target.position.copy(sun.target.position);
  }else{
    sun.target.position.set(x,0,z);
    sun.position.copy(sun.target.position).addScaledVector(sunDirection,Math.max(1,extent/95));
    fill.position.set(40,30,-40);fill.target.position.set(0,0,0);
  }
  const c=sun.shadow.camera;
  if(Math.abs(c.right-extent)>.1){Object.assign(c,{left:-extent,right:extent,top:extent,bottom:-extent,far:Math.max(260,extent*4)});c.updateProjectionMatrix();}
}
function reportError(error){
  if(error.name==='AbortError')return;
  canvas.dataset.error=error.message;console.error(error);
}
async function loadWorld(input={}){
  const version=++loadingVersion,config=structuredClone(input);loadStarted=performance.now();
  canvas.dataset.loading='true';delete canvas.dataset.error;
  pendingWorker?.dispose();const nextWorker=createWorldWorker();pendingWorker=nextWorker;
  let nextMap,nextRailway,nextDetail,nextShell,root;
  try{
    const generated=await nextWorker.request('generate',config);
    if(version!==loadingVersion)throw new DOMException('World replaced','AbortError');
    const next=generated.world;root=new THREE.Group();
    nextMap=buildMapWorld(new THREE.Group(),next);
    nextShell=createSurfaceShell(next);
    if(nextShell){root.add(nextShell.detail);nextMap.root.add(nextShell.map);}
    nextRailway=makeTrains(root,next);
    nextDetail=createWorldRenderer(root,next,{requestChunk:region=>nextWorker.request('chunk',region),uploadMesh:mesh=>geometryUploader.upload(mesh)});
    disposeLife();surfaceShell?.dispose();detail?.dispose();railway?.dispose();worldRoot?.removeFromParent();mapWorld?.dispose();
    worker?.dispose();worker=nextWorker;pendingWorker=null;
    model=next;worldRoot=root;railway=nextRailway;trains=railway.trains;detail=nextDetail;
    mapWorld=nextMap;surfaceShell=nextShell;mapScene.add(mapWorld.root);scene.add(root);authoring=config;time=0;
    shaderReady=false;shaderJob=null;generationMs=generated.milliseconds;fitWorld();
    canvas.dataset.cities=String(model.cities.length);canvas.dataset.trains=String(trains.length);
    canvas.dataset.surface=surfaceFor(model)?'sphere':'plane';
    canvas.dataset.loading='false';loadMs=performance.now()-loadStarted;
    clearMeasurements();return model;
  }catch(error){
    if(version===loadingVersion){canvas.dataset.loading='false';pendingWorker=null;}
    nextShell?.dispose();nextDetail?.dispose();nextRailway?.dispose();nextMap?.dispose();root?.removeFromParent();
    nextWorker.dispose();throw error;
  }
}
function resize(){
  const width=innerWidth,height=innerHeight,aspect=width/height,viewHeight=Math.max(frameHeight,frameWidth/aspect);
  navigation.left=-viewHeight*aspect/2;navigation.right=viewHeight*aspect/2;
  navigation.top=viewHeight/2;navigation.bottom=-viewHeight/2;navigation.updateProjectionMatrix();
  renderer.setSize(width,height);
  compositor.resize(Math.round(width*renderer.getPixelRatio()),Math.round(height*renderer.getPixelRatio()));
}
window.addEventListener('resize',resize);resize();

// Instrumentation is sampled once a second, with bounded storage and no visible UI.
const frameTimes=new Float32Array(180),cpuTimes=new Float32Array(180);
let sampleCount=0,sampleCursor=0,measurementAt=0,frames=0,last=performance.now(),frameHandle;
let transitionCpuMax=0,transitionFrameMax=0,transitionSamples=0;
let transitionPeak='';
let trafficCpu=0,detailCpu=0,viewCpu=0,renderCpu=0;
function clearMeasurements(){sampleCount=sampleCursor=0;transitionCpuMax=transitionFrameMax=transitionSamples=0;transitionPeak='';measurementAt=performance.now();}
function metrics(now,interval,cpu){
  frameTimes[sampleCursor]=interval;cpuTimes[sampleCursor]=cpu;
  sampleCursor=(sampleCursor+1)%frameTimes.length;sampleCount=Math.min(sampleCount+1,frameTimes.length);
  if(view.blend>.001&&view.blend<.999){
    if(cpu>transitionCpuMax)transitionPeak=JSON.stringify({traffic:trafficCpu,detail:detailCpu,view:viewCpu,render:renderCpu,blend:view.blend});
    transitionSamples++;transitionCpuMax=Math.max(transitionCpuMax,cpu);transitionFrameMax=Math.max(transitionFrameMax,interval);
  }
  if(now-measurementAt<1000)return;measurementAt=now;
  const percentile=values=>[...values.subarray(0,sampleCount)].sort((a,b)=>a-b)[Math.floor((sampleCount-1)*.95)]??0;
  const active=trains.reduce((count,train)=>count+(train.state.active?1:0),0);
  Object.assign(canvas.dataset,{frameP95:percentile(frameTimes).toFixed(2),cpuP95:percentile(cpuTimes).toFixed(2),
    drawCalls:String(renderer.info.render.calls),triangles:String(renderer.info.render.triangles),
    geometries:String(renderer.info.memory.geometries),activeTrains:String(active),
    visibleTrains:String(railway.stats?.visibleTrains??0),detailChunks:String(detail.stats?.chunks??detail.stats?.loadedChunks??0),
    detailReady:String(detail.ready),detailRequired:String(detail.stats.requiredChunks??0),
    detailPending:String(detail.stats.pendingChunks??0),detailBytes:String(detail.stats.bytes??0),
    detailLimited:String(detail.stats.coverageLimited??false),detailErrors:String(detail.stats.errors??0),
    transitionCpuMax:transitionCpuMax.toFixed(2),transitionFrameMax:transitionFrameMax.toFixed(2),transitionFrames:String(transitionSamples),
    transitionPeak,
    trafficCpu:trafficCpu.toFixed(2),detailCpu:detailCpu.toFixed(2),viewCpu:viewCpu.toFixed(2),renderCpu:renderCpu.toFixed(2),
    simulationSeconds:time.toFixed(1),
    simulationCpu:(railway.stats.simulationMs??0).toFixed(2),poseCpu:(railway.stats.poseMs??0).toFixed(2),
    generationMs:generationMs.toFixed(0),loadMs:loadMs.toFixed(0)});
}
function frame(now){
  const start=performance.now(),interval=now-last,dt=THREE.MathUtils.clamp(interval/1000,0,.05);last=now;
  if(model){
    if(!paused)time+=dt;
    let stamp=performance.now();
    railway.update(paused?0:dt);
    trafficCpu=performance.now()-stamp;stamp=performance.now();
    detail.update(camera,{mapBlend:view.wantsDetail?0:1,target:controls.target,budgetMs:2,
      coverageCamera:surfaceFor(model)?view.coverageCamera:view.mode==='close'?camera:navigation});
    if(detail.ready&&!shaderReady&&!shaderJob){
      const version=loadingVersion;
      renderer.shadowMap.enabled=true;
      railway.updateView(camera,{mapBlend:view.blend,focus:controls.target,prewarm:true});
      if(!life&&model.cities.length<=32){life=ambience(worldRoot,model);life.update(time);}
      shaderJob=compositor.prepare(scene,mapScene,camera)
        .then(()=>{if(version===loadingVersion)shaderReady=true;})
        .catch(error=>{if(version===loadingVersion){shaderJob=null;reportError(error);}});
    }
    detailCpu=performance.now()-stamp;stamp=performance.now();
    view.update(dt);
    railway.updateView(camera,{mapBlend:view.blend,focus:controls.target});
    if(view.blend<.999){
      fitShadows();
      if(!life&&model.cities.length<=32)life=ambience(worldRoot,model);
      life?.update(time);
    }
    mapWorld.update(trains,{visible:view.blend>.001,camera,viewportHeight:innerHeight,poseBuffer:railway.poseBuffer});
    viewCpu=performance.now()-stamp;stamp=performance.now();
    renderer.info.reset();renderer.shadowMap.enabled=view.blend<.999;
    compositor.render(scene,mapScene,camera,view.blend);
    renderCpu=performance.now()-stamp;
    metrics(now,interval,performance.now()-start);frames++;
    document.documentElement.dataset.ready='true';
  }else renderer.render(mapScene,camera);
  frameHandle=requestAnimationFrame(frame);
}
document.addEventListener('visibilitychange',()=>{
  if(document.hidden)cancelAnimationFrame(frameHandle);
  else{last=performance.now();clearMeasurements();frameHandle=requestAnimationFrame(frame);}
});
frameHandle=requestAnimationFrame(frame);

window.__railway={
  get ready(){return frames>0;},get time(){return time;},get paused(){return paused;},
  get trains(){return trains.map(t=>({id:t.state.id,ownerId:t.state.ownerId,homeCityId:t.state.homeCityId,
    x:t.parts[0].position.x,y:t.parts[0].position.y,z:t.parts[0].position.z,cars:t.parts.length}));},
  get render(){return {...renderer.info.render,geometries:renderer.info.memory.geometries,...railway?.stats,...detail?.stats};},
  get camera(){return {zoom:camera.zoom,width:innerWidth,height:innerHeight,mode:view.mode,mapBlend:view.blend,following:view.selected};},
};
window.railway=Object.freeze({
  loadWorld:input=>loadWorld(input).then(world=>structuredClone(world)),
  exportWorld:()=>structuredClone(authoring),inspectWorld:()=>structuredClone(model),generateWorld,validateWorld,createStressWorld,
});
const parameters=new URLSearchParams(location.search),layout=parameters.get('layout')??(parameters.has('cities')?'classic':'europe');
try{
  let input;
  if(layout==='stress')input=createStressWorld({cities:parameters.has('cities')?Number(parameters.get('cities')):256,
    trains:parameters.has('trains')?Number(parameters.get('trains')):2048,seed:parameters.get('seed')??'continental-railway'});
  else if(layout==='europe'){
    const {createEuropeWorld}=await import('./europe-world.js');
    input=createEuropeWorld({...(parameters.has('seed')?{seed:parameters.get('seed')}:{}),
      ...(parameters.has('trains')?{trainCount:Number(parameters.get('trains'))}:{})});
  }
  else if(['crossroads','showcase'].includes(layout)){
    const response=await fetch(new URL(`./worlds/${layout}.json`,location.href));
    if(!response.ok)throw new Error('Could not load the authored world');input=await response.json();
    if(parameters.has('seed'))input.seed=parameters.get('seed');
  }else input={seed:parameters.get('seed')??27,cityCount:Number(parameters.get('cities'))||8};
  await loadWorld(input);
}catch(error){reportError(error);}
