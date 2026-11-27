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
import {createDayCalendar} from './day-cycle.js';
import {createNightSky} from './night-sky.js';
import {createWalkingPlayer} from './walking-player.js';
import {createWalkingDetail} from './walking-detail.js';
import {createWalkingInput} from './walking-input.js';
import {createWalkingSky} from './walking-sky.js';
import {createCharacterTransition} from './character-transition.js';
import {createCharacterMarker} from './character-marker.js';
import {createClockHands} from './clock-hands.js';
import {createSettlementController} from './settlement-controller.js';
import './style.css';
import './settlement-hud.css';

const canvas=document.querySelector('#world'),scene=new THREE.Scene(),mapScene=new THREE.Scene();
const artCanvasDescription=canvas.getAttribute('aria-label');
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
let walker,walkingDetail,characterMarker,clockHands,walkSpawn,entryFrame=false,walkingMode=false,walkingBuffersReady=false;
let settlement;
function refreshCanvasCursor(){
  const mode=settlement?.building?'build':walkingMode?'hidden':'overview';
  if(canvas.dataset.cursor!==mode)canvas.dataset.cursor=mode;
}
let transitionMapStart=0,renderedMapBlend=0;
let loadingVersion=0,shaderReady=false,shaderJob=null,generationMs=0,loadMs=0,loadStarted=0;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let characterTransition=createCharacterTransition({reducedMotion});
const daylight=createDaylight({scene,mapScene,sky,sun,fill,renderer});
const calendar=createDayCalendar();
let daylightStartedAt;
const calendarWallTime=()=>daylightStartedAt===undefined?0:(performance.now()-daylightStartedAt)/1000;
const advanceDayNight=()=>calendar.advance(calendarWallTime());
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
const walkingInput=createWalkingInput(canvas,{isActive:()=>walkingMode||characterTransition.active,onToggle:()=>walkingMode?leaveWalking():enterWalking(),onExit:leaveWalking,
  canLook:()=>!settlement?.building,
  onKey:event=>{
    if(event.key.toLowerCase()==='n'){if(!event.repeat)advanceDayNight();return true;}
    return settlement?.keyDown(event)??false;
  }});
const transitionFocus=new THREE.Vector3();
const smoothStep=(a,b,value)=>{const t=THREE.MathUtils.clamp((value-a)/(b-a),0,1);return t*t*(3-2*t);};
function walkingTarget(){return walker.cameraTarget.clone();}
function transitionSphere(){const surface=surfaceFor(model);return surface?{center:new THREE.Vector3(0,-surface.radius,0),radius:surface.radius}:undefined;}
function displayedCamera(){return characterTransition.active?characterTransition.camera:walkingMode?walker.camera:camera;}
function displayedTarget(){
  if(characterTransition.active)return characterTransition.target.clone();
  if(walkingMode)return walkingTarget();
  const point=view.renderTarget;return surfacePoint(model,point.x,point.y,point.z,new THREE.Vector3());
}
function snapshotCamera(){
  const source=displayedCamera(),snapshot=source.clone();
  snapshot.isOrthographicCamera=!!source.isOrthographicCamera;snapshot.isPerspectiveCamera=!snapshot.isOrthographicCamera;
  return snapshot;
}
function spawnHeading(){
  if(model.gameplay)return model.gameplay.spawn.heading??0;
  const town=model.cities[0],offset=town&&walkSpawn?surfaceDisplacement(model,town,walkSpawn,{}):null;
  return offset?Math.atan2(offset.x,offset.z):Math.atan2(controls.target.x-navigation.position.x,controls.target.z-navigation.position.z);
}
function initializeCharacter(){
  if(!walker||walker.initialized||!walkSpawn||!detail.hasCoverageAt(walkSpawn,2))return;
  // Resolve the persistent character against the fully resident building and
  // tree records, even when the player has not entered walking mode yet.
  const scale=worldRoot.scale.y;worldRoot.scale.set(1,1,1);worldRoot.updateMatrixWorld(true);
  if(walker.enter(walkSpawn,spawnHeading())){
    if(settlement){walkingMode=true;view.setInputEnabled(false);entryFrame=true;refreshCanvasCursor();}
    else walker.exit();
    walker.root.visible=true;walkSpawn={...walker.position};
  }
  worldRoot.scale.y=scale;worldRoot.updateMatrixWorld(true);
}
function finishCharacterTransition(){
  view.setInputEnabled(!walkingMode);walkingInput.sample(0);
  canvas.dataset.view=walkingMode?'person':view.mode;
  canvas.dataset.cameraTransition='false';canvas.dataset.walkingWeight=walkingMode?'1.000':'0.000';
}
function enterWalking(){
  if(!walker||walkingMode)return;
  const fromCamera=snapshotCamera(),fromTarget=displayedTarget();
  const previousHeightScale=worldRoot.scale.y;
  worldRoot.scale.set(1,1,1);worldRoot.updateMatrixWorld(true);
  if(!walker.enter(walkSpawn,spawnHeading())){worldRoot.scale.y=previousHeightScale;worldRoot.updateMatrixWorld(true);return;}
  walkingMode=true;view.setInputEnabled(false);transitionMapStart=renderedMapBlend;
  characterTransition.begin({fromCamera,toCamera:walker.camera,fromTarget,toTarget:walkingTarget(),toWalking:true,sphere:transitionSphere()});
  entryFrame=true;
  if(!characterTransition.active)finishCharacterTransition();
  canvas.dataset.view='person';refreshCanvasCursor();clearMeasurements();
}
function leaveWalking(){
  if(!walker||!walkingMode)return;
  settlement?.cancelBuild();
  const fromCamera=snapshotCamera(),fromTarget=displayedTarget(),heading=walker.heading;
  const point=walker.exit();walker.root.visible=true;walkingInput.clear();walkingMode=false;refreshCanvasCursor();
  view.setInputEnabled(false);view.overlook(point,{heading,zoom:view.zoomScale*1.35});
  const target=view.renderTarget;surfacePoint(model,target.x,target.y,target.z,transitionFocus);
  transitionMapStart=renderedMapBlend;
  characterTransition.begin({fromCamera,toCamera:camera,fromTarget,toTarget:transitionFocus,toWalking:false,sphere:transitionSphere()});
  if(!characterTransition.active)finishCharacterTransition();
  clearMeasurements();
}
let frameWidth=170,frameHeight=112,time=0;
const cameraDirection=new THREE.Vector3(115,125,145).normalize(),sunDirection=new THREE.Vector3();
const lightFrame=new THREE.Matrix4(),localSun=new THREE.Vector3();
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
function fitShadows(focus=view.renderTarget,walkingWeight=0){
  // Keep the one shadow light on the current local solar/lunar arc. The
  // ground frame rotates that direction with the globe without shearing it.
  sunDirection.copy(daylight.direction).multiplyScalar(130);
  const span=Math.max((camera.right-camera.left)/camera.zoom,(camera.top-camera.bottom)/camera.zoom);
  const overviewExtent=Math.min(480,Math.max(45,span*.72)),extent=THREE.MathUtils.lerp(overviewExtent,18,walkingWeight),texel=extent*2/2048;
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
    walkingMode=false;walkingInput.clear();view.setInputEnabled(true);
    characterTransition=createCharacterTransition({reducedMotion});transitionMapStart=renderedMapBlend=0;
    scene.fog.near=1e6;scene.fog.far=2e6;walkingSky.root.visible=false;
    settlement?.dispose();settlement=null;refreshCanvasCursor();
    walker?.dispose();walkingDetail?.dispose();characterMarker?.dispose();clockHands?.dispose();
    disposeLife();detailBase?.dispose();surfaceShell?.dispose();detail?.dispose();railway?.dispose();worldRoot?.removeFromParent();mapWorld?.dispose();
    worker?.dispose();worker=nextWorker;pendingWorker=null;
    model=next;worldRoot=root;railway=nextRailway;trains=railway.trains;detail=nextDetail;
    mapWorld=nextMap;surfaceShell=nextShell;detailBase=nextBase;mapScene.add(mapWorld.root);scene.add(root);authoring=config;time=0;
    shaderReady=false;shaderJob=null;generationMs=generated.milliseconds;fitWorld();
    if(model.gameplay)settlement=createSettlementController({canvas,world:model,parent:root,mapParent:mapWorld.root,markerParent:scene,markerMapParent:mapScene,detail,getPlayer:()=>walker,
      onView:()=>walkingMode?leaveWalking():enterWalking(),onDayNight:advanceDayNight,reducedMotion});
    walker=createWalkingPlayer(root,model,{getCollisionPlacements:()=>settlement?settlement.getCollisionPlacements():detail.getCollisionPlacements(),
      getTerrainMeshes:()=>settlement?settlement.getTerrainMeshes():detail.getTerrainMeshes(),isReadyAt:(x,z)=>detail.hasCoverageAt({x,z},1)});
    walker.resize(innerWidth/innerHeight);
    walkSpawn=walker.prepareSpawn(model.gameplay?.spawn??model.cities[0]??controls.target);
    walkingDetail=createWalkingDetail(root,model);walkingBuffersReady=false;
    characterMarker=createCharacterMarker(scene,mapScene,model);
    clockHands=createClockHands(root,model);
    if(walkSpawn)walkingDetail.update(walkSpawn,{visible:false});
    canvas.dataset.cities=String(model.cities.length);canvas.dataset.trains=String(trains.length);
    canvas.dataset.surface=surfaceFor(model)?'sphere':'plane';
    if(settlement)canvas.setAttribute('aria-label','Your island settlement. Move the cursor to look around. WASD moves, Shift runs, Space jumps. Face a nearby tree and press E or click to chop. Each tree gives 2 to 4 logs. Press B to preview a house costing 10 logs; move the pointer to aim, click or Enter to build, Escape to cancel. Red means blocked or unaffordable. House lots follow your facing direction, with doors more likely to face nearby homes. Three homes form a city and connect by paths. City levels 1 through 5 unlock at 3, 6, 9, 12 and 15 homes, marked by a well, market, water tower, fountain garden and town hall. Residents wander the paths and sleep indoors at night. Gray level-one farming villages have their own residents who visit nearby fields. Rival coral, gold and blue settlers chop real trees and build their own cities to level five, then stop. Their resources and income are separate from yours. V switches between your traveller and overview. Each player-owned city home earns one gold at sunset; gray village homes earn you no income. Day and night each last five minutes; N or the day/night button advances to the next phase for testing.');
    else canvas.setAttribute('aria-label',artCanvasDescription);
    if(document.activeElement===document.body)canvas.focus({preventScroll:true});
    if(daylightStartedAt===undefined)daylightStartedAt=performance.now();
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
  if(characterTransition.active){characterTransition.finish();finishCharacterTransition();if(!walkingMode)view.updatePresentation(0);}
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
  if(characterTransition.active||view.blend>.001&&view.blend<.999){
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
    generationMs:generationMs.toFixed(0),loadMs:loadMs.toFixed(0),night:daylight.night.toFixed(3),dayPhase:daylight.phase,dayElapsed:calendar.read().elapsedSeconds.toFixed(1),dayNumber:String(calendar.read().dayNumber),
    walking:String(walkingMode),playerX:walker?.position.x.toFixed(3),playerY:walker?.position.y.toFixed(3),playerZ:walker?.position.z.toFixed(3),
    playerGrounded:String(walker?.grounded),playerSwings:String(walker?.stats.swings??0),walkingInstances:String(walkingDetail?.stats.instances??0),
    lifeInstances:String(life?.stats?.instances??life?.stats?.active??0),lifeSheep:String(life?.stats?.sheep??0),lifeBirds:String(life?.stats?.birds??0)});
}
function frame(now){
  const start=performance.now(),interval=now-last,dt=THREE.MathUtils.clamp(interval/1000,0,.05);last=now;
  if(model){
    if(!paused)time+=dt;
    const dayState=calendar.read((now-(daylightStartedAt??now))/1000);
    daylight.update(dt,time,dayState.elapsedSeconds);nightSky.update();scene.fog.color.copy(scene.background);
    let stamp=performance.now();
    railway.update(paused?0:dt);
    trafficCpu=performance.now()-stamp;stamp=performance.now();
    const wasTransitioning=characterTransition.active;
    if(wasTransitioning){
      // Input remains captured, but a walk or orbit cannot move either camera
      // endpoint while their framing is being joined. Held movement resumes
      // normally afterward; buffered drag/jump impulses are discarded.
      walkingInput.sample(0);characterTransition.update(dt);
      if(!characterTransition.active)finishCharacterTransition();
    }else if(walkingMode){
      const input=walkingInput.sample(dt),swings=walker.stats.swings;
      walker.update(dt,settlement?settlement.prepareInput(input):input);
      if(walker.stats.swings>swings)settlement?.onSwing();
    }
    else view.updateNavigation(dt);
    if(!walkingMode&&!characterTransition.active)view.updatePresentation(dt);
    const groundLayer=walkingMode||characterTransition.active;
    const walkingWeight=characterTransition.active?characterTransition.walkingWeight:Number(walkingMode);
    const activeCamera=displayedCamera(),focus=groundLayer?walker.position:controls.target;
    const blend=characterTransition.active?transitionMapStart*(1-smoothStep(0,.3,characterTransition.progress)):walkingMode?0:view.blend;
    renderedMapBlend=blend;
    if(groundLayer)worldRoot.scale.set(1,1,1);
    const overviewSpan=Math.max((camera.right-camera.left)/camera.zoom,(camera.top-camera.bottom)/camera.zoom);
    const groundRadius=characterTransition.active&&!walkingMode?Math.min(140,Math.max(40,overviewSpan*.55)):40;
    let groundFocus=walker?.initialized?walker.position:walkSpawn;
    detail.update(activeCamera,{mapBlend:groundLayer||view.wantsDetail?0:1,target:focus,budgetMs:2,
      groundFocus,groundRadius,groundOnly:groundLayer,
      coverageCameras:groundLayer?undefined:view.coverageCameras,retainVisible:groundLayer||view.blend<1});
    initializeCharacter();groundFocus=walker?.initialized?walker.position:walkSpawn;
    settlement?.update(paused&&!walkingMode?0:dt,{walking:walkingMode,transitioning:characterTransition.active,camera:activeCamera,mapBlend:blend,walkingWeight,focus,viewportHeight:innerHeight,dayState,night:daylight.night,uiDt:dt});
    if(walker?.initialized)walker.root.visible=true;
    if(groundFocus)walkingDetail.update(groundFocus,{placements:settlement?.placements??detail.placements,revision:settlement?.placementRevision??detail.placementRevision,
      cityStreets:settlement?.cityStreets??detail.cityStreets,visible:walkingWeight>.001,visibilityWeight:walkingWeight,time,night:daylight.night});
    // Shader compilation alone does not upload hidden instance attributes.
    // Allocate these fixed GPU pools during startup, before the first dolly.
    if(walkingDetail.stats.ready&&!walkingBuffersReady){
      for(const batch of walkingDetail.root.children)geometryUploader.upload(batch);
      walkingBuffersReady=true;
    }
    scene.fog.near=Math.exp(THREE.MathUtils.lerp(Math.log(1e6),Math.log(28),walkingWeight));
    scene.fog.far=Math.exp(THREE.MathUtils.lerp(Math.log(2e6),Math.log(85),walkingWeight));
    if(!shaderReady&&!shaderJob){
      const version=loadingVersion;
      renderer.shadowMap.enabled=true;
      if(!life)life=localAmbience(worldRoot,model);
      shaderJob=compositor.prepare(scene,mapScene,camera)
        .then(()=>{if(version===loadingVersion)shaderReady=true;})
        .catch(error=>{if(version===loadingVersion){shaderJob=null;reportError(error);}});
    }
    detailCpu=performance.now()-stamp;stamp=performance.now();
    const renderFocus=groundLayer?walker.renderPosition:view.renderTarget;
    clockHands.update(daylight.clockTime,{focus:renderFocus,placements:settlement?.placements??detail.placements,revision:settlement?.placementRevision??detail.placementRevision,
      visible:blend<.999,reducedMotion:reducedMotion.matches});
    detail.updateVisibility(activeCamera,{dt,reveal:shaderReady&&blend<.999,reducedMotion:reducedMotion.matches||entryFrame});
    entryFrame=false;detailBase.root.visible=groundLayer||!detail.settled;
    railway.updateView(activeCamera,{mapBlend:blend,focus:renderFocus});
    if(blend<.999){
      fitShadows(renderFocus,walkingWeight);
      if(!life)life=localAmbience(worldRoot,model);
      life.update(time,{focus:renderFocus,placements:detail.lifePlacements,revision:detail.lifeRevision,
        detailBlend:1-blend,reducedMotion:reducedMotion.matches,night:styleUniforms.night.value});
    }
    if(life)life.root.visible=blend<.999;
    walkingSunDirection.subVectors(sun.position,sun.target.position).normalize();
    walkingSky.update(activeCamera,{visible:walkingWeight>.001,strength:walkingWeight,night:daylight.night,sunDirection:walkingSunDirection,horizonColor:scene.background});
    mapWorld.update(trains,{visible:blend>.001,camera,viewportHeight:innerHeight,poseBuffer:railway.poseBuffer,dt,reducedMotion:reducedMotion.matches});
    characterMarker.update({position:walker.renderPosition,initialized:walker.initialized,camera:activeCamera,mapBlend:blend,
      walking:walkingMode,walkingWeight,viewportHeight:innerHeight});
    // Keep the figure where it can be read; its fixed-size locator represents
    // the same position once the figure becomes subpixel geometry.
    walker.root.visible=walker.initialized&&(groundLayer||blend<.999&&characterMarker.characterReadable);
    canvas.dataset.view=walkingMode?'person':view.mode;refreshCanvasCursor();
    canvas.dataset.cameraTransition=String(characterTransition.active);canvas.dataset.walkingWeight=walkingWeight.toFixed(3);
    canvas.dataset.mapBlend=blend.toFixed(3);canvas.dataset.characterVisible=String(walker.initialized&&walker.root.visible);
    canvas.dataset.characterMarker=String(characterMarker.root.visible||characterMarker.mapRoot.visible);
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
  get camera(){return {zoom:camera.zoom,width:innerWidth,height:innerHeight,mode:walkingMode?'person':view.mode,mapBlend:renderedMapBlend,following:view.selected,transitioning:characterTransition.active};},
};
window.railway=Object.freeze({
  loadWorld:input=>loadWorld(input).then(world=>structuredClone(world)),
  exportWorld:()=>structuredClone(authoring),inspectWorld:()=>structuredClone(model),
  inspectSettlement:()=>settlement?{player:settlement.game.snapshot(),bots:settlement.bots.snapshot()}:null,
  generateWorld,validateWorld,createStressWorld,
});
const parameters=new URLSearchParams(location.search);
try{
  await loadWorld(await createLaunchWorld(parameters,location.href));
}catch(error){reportError(error);}
