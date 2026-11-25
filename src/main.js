import * as THREE from 'three';
import { createViewController } from './view-controller.js';
import { createViewCompositor } from './view-compositor.js';
import { buildMapWorld } from './map-world.js';
import { buildWorld } from './world.js';
import { makeTrains } from './railway.js';
import { generateWorld,validateWorld } from './world-model.js';
import { ambience } from './ambience.js';
import { C, color } from './palette.js';
import './style.css';

const canvas=document.querySelector('#world');
const scene=new THREE.Scene();
scene.background=C.backdrop;
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.15;
renderer.outputColorSpace=THREE.SRGBColorSpace;

const camera=new THREE.OrthographicCamera(-60,60,45,-45,.1,500);
camera.position.set(115,125,145);
camera.lookAt(0,1,0);

scene.add(new THREE.HemisphereLight(color(.94,.035,221),color(.55,.025,169),2.15));
const sun=new THREE.DirectionalLight(color(.98,.04,84),3.25);
sun.position.set(-65,110,65);
sun.castShadow=true;
sun.shadow.mapSize.set(4096,4096);
Object.assign(sun.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:260});
sun.shadow.normalBias=.025;
sun.shadow.bias=-.00015;
sun.shadow.radius=3;
scene.add(sun);scene.add(sun.target);
const fill=new THREE.DirectionalLight(color(.85,.035,218),.65);fill.position.set(40,30,-40);scene.add(fill);

const ground=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000),new THREE.MeshStandardMaterial({color:C.backdrop,roughness:1}));
ground.rotation.x=-Math.PI/2;ground.position.y=-5.7;ground.receiveShadow=true;scene.add(ground);

let model,worldRoot,trains=[],railway,life,authoring,mapWorld;
const mapScene=new THREE.Scene();mapScene.background=C.backdrop;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reducedMotion.matches;
reducedMotion.addEventListener('change',event=>{paused=event.matches;});
const compositor=createViewCompositor(renderer);
const view=createViewController({canvas,camera,scene,mapScene,reducedMotion,
  getTrains:()=>trains,getWorldRoot:()=>worldRoot,
  onPause:()=>{paused=!paused;},
  onRegenerate:()=>{
    const seed=String(Number.isFinite(Number(model.seed))?Number(model.seed)+1:Date.now());
    loadWorld({...authoring,seed});
    const url=new URL(location.href);url.searchParams.set('seed',seed);history.replaceState(null,'',url);
  },
});
const {navigation,controls}=view;
let frameWidth=170,frameHeight=112,time=0;
function dispose(root){
  const geometries=new Set();root.traverse(node=>{if(node.geometry)geometries.add(node.geometry);});
  geometries.forEach(geometry=>geometry.dispose());root.removeFromParent();
}
function fitWorld(){
  // Clear orbit inertia before a replacement world establishes its home frame.
  view.reset();
  const xs=model.outline.map(p=>p[0]),zs=model.outline.map(p=>p[1]);
  const width=Math.max(...xs)-Math.min(...xs),depth=Math.max(...zs)-Math.min(...zs);
  const radius=Math.hypot(width,depth),height=Math.max(0,...model.mountains.map(m=>m.height));
  controls.target.set((Math.max(...xs)+Math.min(...xs))/2,1.3,(Math.max(...zs)+Math.min(...zs))/2);
  navigation.position.copy(controls.target).addScaledVector(new THREE.Vector3(115,125,145).normalize(),radius*1.5+height);
  navigation.zoom=1;navigation.far=Math.max(500,radius*5+height*3);controls.update();
  sun.target.position.copy(controls.target);
  sun.position.copy(controls.target).add(new THREE.Vector3(-65,110,65).multiplyScalar(Math.max(1,radius/161)));
  const extent=radius*.64;
  Object.assign(sun.shadow.camera,{left:-extent,right:extent,top:extent,bottom:-extent,far:Math.max(260,radius*3+height)});
  sun.shadow.camera.updateProjectionMatrix();
  ground.position.x=controls.target.x;ground.position.z=controls.target.z;ground.scale.setScalar(Math.max(1,radius/500));
  const inverse=navigation.quaternion.clone().invert();
  const points=model.outline.flatMap(([x,z])=>[new THREE.Vector3(x,-3.4,z),new THREE.Vector3(x,4,z)]);
  model.mountains.forEach(m=>points.push(new THREE.Vector3(m.x,m.height,m.z)));
  let x=0,y=0;
  points.forEach(p=>{p.sub(controls.target).applyQuaternion(inverse);x=Math.max(x,Math.abs(p.x));y=Math.max(y,Math.abs(p.y));});
  frameWidth=x*2+10;frameHeight=y*2+10;
  resize();view.setHome();
}
function loadWorld(input={}){
  const config=JSON.parse(JSON.stringify(input));
  const next=generateWorld(config),violations=validateWorld(next);
  if(violations.length)throw new Error(`Invalid world: ${violations[0].detail??violations[0].type}`);
  const root=new THREE.Group();
  let nextMap;
  try{
    buildWorld(root,next);
    const nextTrains=makeTrains(root,next),nextLife=ambience(root,next);
    nextMap=buildMapWorld(new THREE.Group(),next);
    if(worldRoot)dispose(worldRoot);
    mapWorld?.dispose();mapWorld=nextMap;mapScene.add(mapWorld.root);
    model=next;worldRoot=root;railway=nextTrains;trains=railway.trains;life=nextLife;authoring=config;time=0;
    scene.add(root);life.update(0);fitWorld();
    return JSON.parse(JSON.stringify(model));
  }catch(error){nextMap?.dispose();dispose(root);throw error;}
}
function resize(){
  const width=innerWidth,height=innerHeight,aspect=width/height;
  const viewHeight=Math.max(frameHeight,frameWidth/aspect);
  navigation.left=-viewHeight*aspect/2;navigation.right=viewHeight*aspect/2;
  navigation.top=viewHeight/2;navigation.bottom=-viewHeight/2;navigation.updateProjectionMatrix();
  renderer.setSize(width,height);
  compositor.resize(Math.round(width*renderer.getPixelRatio()),Math.round(height*renderer.getPixelRatio()));
}
const parameters=new URLSearchParams(location.search);
const initial={seed:parameters.get('seed')??27};
const cityCount=Number(parameters.get('cities'));
if(Number.isFinite(cityCount)&&cityCount>=3&&cityCount<=20)initial.cityCount=cityCount;
if(parameters.get('layout')==='crossroads'){
  const response=await fetch(new URL('./worlds/crossroads.json',location.href));
  if(!response.ok)throw new Error('Could not load the authored world');
  const preset=await response.json();
  if(parameters.has('seed'))preset.seed=parameters.get('seed');
  loadWorld(preset);
}else loadWorld(initial);
window.addEventListener('resize',resize);resize();
let last=performance.now(),frames=0;
let frameHandle;
function frame(now){
  const dt=THREE.MathUtils.clamp((now-last)/1000,0,.05);last=now;
  if(!paused)time+=dt;
  railway.update(paused?0:dt);
  if(view.blend<1)life.update(time);
  view.update(dt);
  mapWorld.update(trains);
  compositor.render(scene,mapScene,camera,view.blend);
  frames++;
  if(frames===1){document.documentElement.dataset.ready='true';}
  frameHandle=requestAnimationFrame(frame);
}
document.addEventListener('visibilitychange',()=>{
  if(document.hidden)cancelAnimationFrame(frameHandle);
  else{last=performance.now();frameHandle=requestAnimationFrame(frame);}
});
frameHandle=requestAnimationFrame(frame);

// Read-only diagnostics make visual and animation verification reproducible.
window.__railway={
  get ready(){return frames>0;},
  get time(){return time;},
  get paused(){return paused;},
  get trains(){return trains.map(t=>({x:t.parts[0].position.x,y:t.parts[0].position.y,z:t.parts[0].position.z,cars:t.parts.length}));},
  get render(){return {...renderer.info.render,geometries:renderer.info.memory.geometries};},
  get camera(){return {zoom:camera.zoom,width:innerWidth,height:innerHeight,mode:view.mode,mapBlend:view.blend,following:view.selected};},
};

// The authoring API is intentionally separate from the renderer, ready for an editor.
window.railway=Object.freeze({
  loadWorld,
  exportWorld:()=>JSON.parse(JSON.stringify(authoring)),
  inspectWorld:()=>JSON.parse(JSON.stringify(model)),
  generateWorld,
  validateWorld,
});
