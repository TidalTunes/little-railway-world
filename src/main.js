import * as THREE from 'three';
import { createViewController } from './view-controller.js';
import { createViewCompositor } from './view-compositor.js';
import { buildMapWorld } from './map-world.js';
import { createWorldRenderer } from './world-renderer.js';
import {createDetailBase} from './detail-base.js';
import { makeTrains } from './railway.js';
import { generateWorld,validateWorld } from './world-model.js';
import { createStressWorld } from './stress-world.js';
import { createLaunchWorld } from './world-presets.js';
import { createWorldWorker } from './world-worker-client.js';
import { createGeometryUploader } from './geometry-uploader.js';
import { localAmbience } from './ambience.js';
import { C,color } from './palette.js';
import {surfaceFor,surfacePoint,surfaceFrame,surfaceChartCoordinates,surfaceDisplacement} from './world-surface.js';
import {createSurfaceShell} from './surface-shell.js';
import {createDaylight,styleUniforms} from './scene-style.js';
import {createNightSky} from './night-sky.js';
import {createWalkingPlayer} from './walking-player.js';
import {createWalkingDetail} from './walking-detail.js';
import {createWalkingInput} from './walking-input.js';
import {createWalkingSky} from './walking-sky.js';
import './style.css';

const canvas=document.querySelector('#world'),scene=new THREE.Scene(),mapScene=new THREE.Scene();
scene.background=mapScene.background=C.backdrop;
// Keep fog in the material program from startup. Switching camera layers only
// changes its uniforms, avoiding a new shader compilation on the first walk.
scene.fog=new THREE.Fog(C.backdrop,1e6,2e6);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.info.autoReset=false;
const camera=new THREE.OrthographicCamera(-60,60,45,-45,.1,500);
camera.position.set(115,125,145);camera.lookAt(0,1,0);
const sky=new THREE.HemisphereLight(color(.94,.035,221),color(.55,.025,169),2.15);scene.add(sky);
const sun=new THREE.DirectionalLight(color(.98,.04,84),3.25);
sun.position.set(-65,110,65);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:260});
sun.shadow.normalBias=.025;sun.shadow.bias=-.00015;sun.shadow.radius=3;
scene.add(sun,sun.target);
const fill=new THREE.DirectionalLight(color(.85,.035,218),.65);fill.position.set(40,30,-40);scene.add(fill,fill.target);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000),new THREE.MeshStandardMaterial({color:C.backdrop,roughness:1}));
ground.rotation.x=-Math.PI/2;ground.position.y=-5.7;ground.receiveShadow=true;scene.add(ground);

let model,worldRoot,detail,trains=[],railway,life,authoring,mapWorld,surfaceShell,detailBase,worker,pendingWorker;
let walker,walkingDetail,walkSpawn,entryFrame=false;
let loadingVersion=0,shaderReady=false,shaderJob=null,generationMs=0,loadMs=0,loadStarted=0;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const daylight=createDaylight({scene,mapScene,sky,sun,fill,renderer,reducedMotion,
  initialNight:new URLSearchParams(location.search).get('time')==='night'});
const nightSky=createNightSky(scene,mapScene);
const walkingSky=createWalkingSky(scene),walkingSunDirection=new THREE.Vector3();
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
const walkingInput=createWalkingInput(canvas,{isActive:()=>!!walker?.active,onToggle:()=>walker?.active?leaveWalking():enterWalking(),onExit:leaveWalking});
function enterWalking(){
  if(!walker||walker.active)return;
  const town=model.cities[0],spawnOffset=town&&walkSpawn?surfaceDisplacement(model,town,walkSpawn,{}):null;
  const heading=spawnOffset?Math.atan2(spawnOffset.x,spawnOffset.z)
    :Math.atan2(controls.target.x-navigation.position.x,controls.target.z-navigation.position.z);
  const previousHeightScale=worldRoot.scale.y;
  worldRoot.scale.set(1,1,1);worldRoot.updateMatrixWorld(true);
  if(!walker.enter(walkSpawn,heading)){worldRoot.scale.y=previousHeightScale;worldRoot.updateMatrixWorld(true);return;}
  view.setInputEnabled(false);
  scene.fog.near=28;scene.fog.far=85;entryFrame=true;
  canvas.dataset.view='person';canvas.style.cursor='grab';clearMeasurements();
}
function leaveWalking(){
  if(!walker?.active)return;
  const point=walker.exit();walkingInput.clear();walkingDetail.root.visible=false;
  scene.fog.near=1e6;scene.fog.far=2e6;
  walkingSky.root.visible=false;
  view.setInputEnabled(true);view.overlook(point);clearMeasurements();
}
let frameWidth=170,frameHeight=112,time=0;
const cameraDirection=new THREE.Vector3(115,125,145).normalize(),sunDirection=new THREE.Vector3(-72,94,54);
const lightFrame=new THREE.Matrix4(),localSun=new THREE.Vector3();
canvas.addEventListener('keydown',event=>{
  if(event.key.toLowerCase()!=='n'||event.repeat||event.ctrlKey||event.metaKey||event.altKey)return;
  event.preventDefault();daylight.toggle();
});
function disposeLife(){
  if(!life)return;
  life.dispose();life=null;
}
function fitWorld(){
  view.reset();
  if(model.surface?.complete){
    const radius=model.surface.radius,home=surfaceChartCoordinates(model,model.camera?.longitude??10,model.camera?.latitude??25);
    ground.visible=false;
    frameWidth=frameHeight=radius*2.2;
    view.setScale(frameHeight/230);
    controls.target.set(home.x,1.3,home.z);
    const localOrbit=new THREE.Vector3().setFromSphericalCoords(1,Math.PI/4,0);
    navigation.position.copy(controls.target).addScaledVector(localOrbit,radius*3);
    navigation.zoom=1;navigation.far=radius*8;controls.update();
    resize();view.setHome();return;
  }
  const xs=model.outline.map(p=>p[0]),zs=model.outline.map(p=>p[1]);
  const width=Math.max(...xs)-Math.min(...xs),depth=Math.max(...zs)-Math.min(...zs);
  const radius=Math.hypot(width,depth),height=Math.max(0,...model.mountains.map(m=>m.height));
  ground.visible=!surfaceFor(model);
  const startInDetail=model.camera?.startInDetail===true;
  view.setScale(startInDetail?1:Math.max(1,radius/410));
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
  view.setScale(startInDetail?1:Math.max(view.zoomScale,frameHeight/230));
  resize();view.setHome();
}
function fitShadows(focus=view.renderTarget,walking=false){
  const span=Math.max((camera.right-camera.left)/camera.zoom,(camera.top-camera.bottom)/camera.zoom);
  const extent=walking?18:Math.min(480,Math.max(45,span*.72)),texel=extent*2/2048;
  const x=Math.round(focus.x/texel)*texel,z=Math.round(focus.z/texel)*texel;
  if(surfaceFor(model)){
    surfacePoint(model,x,0,z,sun.target.position);surfaceFrame(model,x,z,lightFrame);
    sky.position.set(0,1,0).applyMatrix4(lightFrame);
    localSun.copy(sunDirection).applyMatrix4(lightFrame);
    sun.position.copy(sun.target.position).addScaledVector(localSun,Math.max(1,extent/95));
    fill.position.set(40,30,-40).applyMatrix4(lightFrame).add(sun.target.position);fill.target.position.copy(sun.target.position);
  }else{
    sky.position.set(0,1,0);sun.target.position.set(x,0,z);
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
  let nextMap,nextRailway,nextDetail,nextShell,nextBase,root;
  try{
    const generated=await nextWorker.request('generate',config);
    if(version!==loadingVersion)throw new DOMException('World replaced','AbortError');
    const next=generated.world;root=new THREE.Group();
    nextMap=buildMapWorld(new THREE.Group(),next);
    nextBase=createDetailBase(root,nextMap.root.getObjectByName('map-static'),next);
    nextShell=createSurfaceShell(next);
    if(nextShell){root.add(nextShell.detail);nextMap.root.add(nextShell.map);}
    nextRailway=makeTrains(root,next);
    nextDetail=createWorldRenderer(root,next,{maxPending:3,requestChunk:(region,options)=>nextWorker.request('chunk',region,options),uploadMesh:mesh=>geometryUploader.upload(mesh)});
    leaveWalking();walker?.dispose();walkingDetail?.dispose();
    disposeLife();detailBase?.dispose();surfaceShell?.dispose();detail?.dispose();railway?.dispose();worldRoot?.removeFromParent();mapWorld?.dispose();
    worker?.dispose();worker=nextWorker;pendingWorker=null;
    model=next;worldRoot=root;railway=nextRailway;trains=railway.trains;detail=nextDetail;
    mapWorld=nextMap;surfaceShell=nextShell;detailBase=nextBase;mapScene.add(mapWorld.root);scene.add(root);authoring=config;time=0;
    shaderReady=false;shaderJob=null;generationMs=generated.milliseconds;fitWorld();
    walker=createWalkingPlayer(root,model,{getCollisionPlacements:()=>detail.getCollisionPlacements(),
      getTerrainMeshes:()=>detail.getTerrainMeshes(),isReadyAt:(x,z)=>detail.hasCoverageAt({x,z},1)});
    walker.resize(innerWidth/innerHeight);
    walkSpawn=walker.prepareSpawn(model.cities[0]??controls.target);
    walkingDetail=createWalkingDetail(root,model);
    if(walkSpawn)walkingDetail.update(walkSpawn,{visible:false});
    canvas.dataset.cities=String(model.cities.length);canvas.dataset.trains=String(trains.length);
    canvas.dataset.surface=surfaceFor(model)?'sphere':'plane';
    if(document.activeElement===document.body)canvas.focus({preventScroll:true});
    canvas.dataset.loading='false';loadMs=performance.now()-loadStarted;
    clearMeasurements();return model;
  }catch(error){
    if(version===loadingVersion){canvas.dataset.loading='false';pendingWorker=null;}
    nextBase?.dispose();nextShell?.dispose();nextDetail?.dispose();nextRailway?.dispose();nextMap?.dispose();root?.removeFromParent();
    nextWorker.dispose();throw error;
  }
}
function resize(){
  const width=innerWidth,height=innerHeight,aspect=width/height,viewHeight=Math.max(frameHeight,frameWidth/aspect);
  navigation.left=-viewHeight*aspect/2;navigation.right=viewHeight*aspect/2;
  navigation.top=viewHeight/2;navigation.bottom=-viewHeight/2;navigation.updateProjectionMatrix();
  renderer.setSize(width,height);
  walker?.resize(aspect);
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
    geometries:String(renderer.info.memory.geometries),activeTrains:String(active),mapNetworkVisibility:mapWorld.stats.networkVisibility.toFixed(3),
    visibleTrains:String(railway.stats?.visibleTrains??0),detailChunks:String(detail.stats?.chunks??detail.stats?.loadedChunks??0),
    detailReady:String(detail.ready),detailSettled:String(detail.settled),detailRevealing:String(detail.stats.revealingChunks),detailBase:String(detailBase.root.visible),detailRequired:String(detail.stats.requiredChunks??0),
    detailPending:String(detail.stats.pendingChunks??0),detailWorkers:String(worker.stats.workers),detailWorkerMs:String(Math.round(worker.stats.lastChunkMs)),detailBytes:String(detail.stats.bytes??0),
    detailLimited:String(detail.stats.coverageLimited??false),detailErrors:String(detail.stats.errors??0),
    transitionCpuMax:transitionCpuMax.toFixed(2),transitionFrameMax:transitionFrameMax.toFixed(2),transitionFrames:String(transitionSamples),
    transitionPeak,
    trafficCpu:trafficCpu.toFixed(2),detailCpu:detailCpu.toFixed(2),viewCpu:viewCpu.toFixed(2),renderCpu:renderCpu.toFixed(2),
    simulationSeconds:time.toFixed(1),
    simulationCpu:(railway.stats.simulationMs??0).toFixed(2),poseCpu:(railway.stats.poseMs??0).toFixed(2),
    generationMs:generationMs.toFixed(0),loadMs:loadMs.toFixed(0),night:daylight.night.toFixed(3),
    walking:String(!!walker?.active),playerX:walker?.position.x.toFixed(3),playerY:walker?.position.y.toFixed(3),playerZ:walker?.position.z.toFixed(3),
    playerGrounded:String(walker?.grounded),walkingInstances:String(walkingDetail?.stats.instances??0),
    lifeInstances:String(life?.stats?.instances??life?.stats?.active??0),lifeSheep:String(life?.stats?.sheep??0),lifeBirds:String(life?.stats?.birds??0)});
}
function frame(now){
  const start=performance.now(),interval=now-last,dt=THREE.MathUtils.clamp(interval/1000,0,.05);last=now;
  if(model){
    if(!paused)time+=dt;
    daylight.update(dt,time);nightSky.update();scene.fog.color.copy(scene.background);
    let stamp=performance.now();
    railway.update(paused?0:dt);
    trafficCpu=performance.now()-stamp;stamp=performance.now();
    const walking=!!walker?.active;
    if(walking)walker.update(dt,walkingInput.sample(dt));else view.updateNavigation(dt);
    const activeCamera=walking?walker.camera:camera,focus=walking?walker.position:controls.target;
    const groundFocus=walker?.initialized?walker.position:walkSpawn;
    detail.update(activeCamera,{mapBlend:walking||view.wantsDetail?0:1,target:focus,budgetMs:2,
      groundFocus,groundRadius:40,groundOnly:walking,
      coverageCameras:walking?undefined:view.coverageCameras,retainVisible:walking||view.blend<1});
    if(groundFocus)walkingDetail.update(groundFocus,{placements:detail.placements,revision:detail.placementRevision,
      cityStreets:detail.cityStreets,visible:walking,time,night:daylight.night});
    if(!shaderReady&&!shaderJob){
      const version=loadingVersion;
      renderer.shadowMap.enabled=true;
      if(!life)life=localAmbience(worldRoot,model);
      shaderJob=compositor.prepare(scene,mapScene,camera)
        .then(()=>{if(version===loadingVersion)shaderReady=true;})
        .catch(error=>{if(version===loadingVersion){shaderJob=null;reportError(error);}});
    }
    detailCpu=performance.now()-stamp;stamp=performance.now();
    if(!walking)view.updatePresentation(dt);
    const blend=walking?0:view.blend,renderFocus=walking?walker.position:view.renderTarget;
    detail.updateVisibility(activeCamera,{dt,reveal:shaderReady&&blend<.999,reducedMotion:reducedMotion.matches||entryFrame});
    entryFrame=false;detailBase.root.visible=walking||!detail.settled;
    railway.updateView(activeCamera,{mapBlend:blend,focus:renderFocus});
    if(blend<.999){
      fitShadows(renderFocus,walking);
      if(!life)life=localAmbience(worldRoot,model);
      life.update(time,{focus:renderFocus,placements:detail.lifePlacements,revision:detail.lifeRevision,
        detailBlend:1-blend,reducedMotion:reducedMotion.matches,night:styleUniforms.night.value});
    }
    if(life)life.root.visible=blend<.999;
    walkingSunDirection.subVectors(sun.position,sun.target.position).normalize();
    walkingSky.update(activeCamera,{visible:walking,night:daylight.night,sunDirection:walkingSunDirection,horizonColor:scene.background});
    mapWorld.update(trains,{visible:blend>.001,camera,viewportHeight:innerHeight,poseBuffer:railway.poseBuffer,dt,reducedMotion:reducedMotion.matches});
    viewCpu=performance.now()-stamp;stamp=performance.now();
    renderer.info.reset();renderer.shadowMap.enabled=blend<.999;
    compositor.render(scene,mapScene,activeCamera,blend);
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
  get camera(){return {zoom:camera.zoom,width:innerWidth,height:innerHeight,mode:walker?.active?'person':view.mode,mapBlend:walker?.active?0:view.blend,following:view.selected};},
};
window.railway=Object.freeze({
  setNight:enabled=>daylight.setNight(enabled),
  loadWorld:input=>loadWorld(input).then(world=>structuredClone(world)),
  exportWorld:()=>structuredClone(authoring),inspectWorld:()=>structuredClone(model),generateWorld,validateWorld,createStressWorld,
});
const parameters=new URLSearchParams(location.search);
try{
  await loadWorld(await createLaunchWorld(parameters,location.href));
}catch(error){reportError(error);}
