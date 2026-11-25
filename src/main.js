import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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
const controls=new OrbitControls(camera,canvas);
controls.target.set(0,1.3,0);
controls.enableDamping=true;
controls.dampingFactor=.075;
controls.enablePan=true;
controls.panSpeed=.7;
controls.rotateSpeed=.45;
controls.minZoom=.8;
controls.maxZoom=5;
controls.minPolarAngle=Math.PI*.20;
controls.maxPolarAngle=Math.PI*.40;
controls.touches.ONE=THREE.TOUCH.ROTATE;
controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
controls.update();

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

let model,worldRoot,trains=[],railway,life,authoring;
let frameWidth=170,frameHeight=112,time=0;
function dispose(root){
  const geometries=new Set();root.traverse(node=>{if(node.geometry)geometries.add(node.geometry);});
  geometries.forEach(geometry=>geometry.dispose());root.removeFromParent();
}
function fitWorld(){
  const xs=model.outline.map(p=>p[0]),zs=model.outline.map(p=>p[1]);
  const width=Math.max(...xs)-Math.min(...xs),depth=Math.max(...zs)-Math.min(...zs);
  const radius=Math.hypot(width,depth),height=Math.max(0,...model.mountains.map(m=>m.height));
  controls.target.set((Math.max(...xs)+Math.min(...xs))/2,1.3,(Math.max(...zs)+Math.min(...zs))/2);
  camera.position.copy(controls.target).addScaledVector(new THREE.Vector3(115,125,145).normalize(),radius*1.5+height);
  camera.zoom=1;camera.far=Math.max(500,radius*5+height*3);controls.update();
  sun.target.position.copy(controls.target);
  sun.position.copy(controls.target).add(new THREE.Vector3(-65,110,65).multiplyScalar(Math.max(1,radius/161)));
  const extent=radius*.64;
  Object.assign(sun.shadow.camera,{left:-extent,right:extent,top:extent,bottom:-extent,far:Math.max(260,radius*3+height)});
  sun.shadow.camera.updateProjectionMatrix();
  ground.position.x=controls.target.x;ground.position.z=controls.target.z;ground.scale.setScalar(Math.max(1,radius/500));
  const inverse=camera.quaternion.clone().invert();
  const points=model.outline.flatMap(([x,z])=>[new THREE.Vector3(x,-3.4,z),new THREE.Vector3(x,4,z)]);
  model.mountains.forEach(m=>points.push(new THREE.Vector3(m.x,m.height,m.z)));
  let x=0,y=0;
  points.forEach(p=>{p.sub(controls.target).applyQuaternion(inverse);x=Math.max(x,Math.abs(p.x));y=Math.max(y,Math.abs(p.y));});
  frameWidth=x*2+10;frameHeight=y*2+10;
  resize();controls.saveState();
}
function loadWorld(input={}){
  const config=JSON.parse(JSON.stringify(input));
  const next=generateWorld(config),violations=validateWorld(next);
  if(violations.length)throw new Error(`Invalid world: ${violations[0].detail??violations[0].type}`);
  const root=new THREE.Group();
  try{
    buildWorld(root,next);
    const nextTrains=makeTrains(root,next),nextLife=ambience(root,next);
    if(worldRoot)dispose(worldRoot);
    model=next;worldRoot=root;railway=nextTrains;trains=railway.trains;life=nextLife;authoring=config;time=0;
    scene.add(root);life.update(0);fitWorld();
    return JSON.parse(JSON.stringify(model));
  }catch(error){dispose(root);throw error;}
}
function resize(){
  const width=innerWidth,height=innerHeight,aspect=width/height;
  const viewHeight=Math.max(frameHeight,frameWidth/aspect);
  camera.left=-viewHeight*aspect/2;camera.right=viewHeight*aspect/2;
  camera.top=viewHeight/2;camera.bottom=-viewHeight/2;camera.updateProjectionMatrix();
  renderer.setSize(width,height);
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
controls.saveState();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reducedMotion.matches;
reducedMotion.addEventListener('change',event=>{paused=event.matches;});
canvas.addEventListener('keydown',event=>{
  if(event.key===' '){paused=!paused;event.preventDefault();}
  if(event.key.toLowerCase()==='r'){
    const seed=String(Number.isFinite(Number(model.seed))?Number(model.seed)+1:Date.now());
    loadWorld({...authoring,seed});
    const url=new URL(location.href);url.searchParams.set('seed',seed);history.replaceState(null,'',url);
    event.preventDefault();
  }
  if(event.key==='Home'){controls.reset();event.preventDefault();}
  if(['+','=','-','_'].includes(event.key)){
    camera.zoom=THREE.MathUtils.clamp(camera.zoom*(event.key==='+'||event.key==='='?1.12:1/1.12),controls.minZoom,controls.maxZoom);
    camera.updateProjectionMatrix();event.preventDefault();
  }
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
    const offset=camera.position.clone().sub(controls.target),spherical=new THREE.Spherical().setFromVector3(offset);
    if(event.key==='ArrowLeft')spherical.theta-=.08;
    if(event.key==='ArrowRight')spherical.theta+=.08;
    if(event.key==='ArrowUp')spherical.phi-=.05;
    if(event.key==='ArrowDown')spherical.phi+=.05;
    spherical.phi=THREE.MathUtils.clamp(spherical.phi,controls.minPolarAngle,controls.maxPolarAngle);
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));controls.update();event.preventDefault();
  }
});
canvas.addEventListener('dblclick',()=>controls.reset());

let last=performance.now(),frames=0;
let frameHandle;
function frame(now){
  const dt=THREE.MathUtils.clamp((now-last)/1000,0,.05);last=now;
  if(!paused)time+=dt;
  railway.update(paused?0:dt);
  life.update(time);
  controls.update();
  renderer.render(scene,camera);
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
  get camera(){return {zoom:camera.zoom,width:innerWidth,height:innerHeight};},
};

// The authoring API is intentionally separate from the renderer, ready for an editor.
window.railway=Object.freeze({
  loadWorld,
  exportWorld:()=>JSON.parse(JSON.stringify(authoring)),
  inspectWorld:()=>JSON.parse(JSON.stringify(model)),
  generateWorld,
  validateWorld,
});
