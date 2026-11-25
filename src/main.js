import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildWorld } from './world.js';
import { makeTrain } from './railway.js';
import { ambience } from './ambience.js';
import { C, color } from './palette.js';
import './style.css';

const canvas=document.querySelector('#world');
const scene=new THREE.Scene();
scene.background=C.backdrop;
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.15;
renderer.outputColorSpace=THREE.SRGBColorSpace;

const camera=new THREE.OrthographicCamera(-60,60,45,-45,.1,500);
camera.position.set(95,100,125);
camera.lookAt(0,1,0);
const controls=new OrbitControls(camera,canvas);
controls.target.set(0,1.3,0);
controls.enableDamping=true;
controls.dampingFactor=.075;
controls.enablePan=true;
controls.panSpeed=.7;
controls.rotateSpeed=.45;
controls.minZoom=.8;
controls.maxZoom=3.5;
controls.minPolarAngle=Math.PI*.20;
controls.maxPolarAngle=Math.PI*.40;
controls.touches.ONE=THREE.TOUCH.ROTATE;
controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
controls.update();

scene.add(new THREE.HemisphereLight(color(.94,.035,221),color(.55,.025,169),2.15));
const sun=new THREE.DirectionalLight(color(.98,.04,84),3.25);
sun.position.set(-35,70,35);
sun.castShadow=true;
sun.shadow.mapSize.set(4096,4096);
Object.assign(sun.shadow.camera,{left:-65,right:65,top:65,bottom:-65,near:1,far:160});
sun.shadow.normalBias=.025;
sun.shadow.bias=-.00015;
sun.shadow.radius=3;
scene.add(sun);
const fill=new THREE.DirectionalLight(color(.85,.035,218),.65);fill.position.set(40,30,-40);scene.add(fill);

const ground=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000),new THREE.MeshStandardMaterial({color:C.backdrop,roughness:1}));
ground.rotation.x=-Math.PI/2;ground.position.y=-5.7;ground.receiveShadow=true;scene.add(ground);

buildWorld(scene);
const trains=[
  makeTrain(scene,{color:'red',offset:.76,speed:1.9,cars:3}),
  makeTrain(scene,{color:'teal',offset:.25,speed:1.9,cars:2}),
];
trains.forEach(train=>train.update(0));
const life=ambience(scene,trains);

function resize(){
  const width=innerWidth,height=innerHeight,aspect=width/height;
  const viewHeight=Math.max(73,103/aspect);
  camera.left=-viewHeight*aspect/2;camera.right=viewHeight*aspect/2;
  camera.top=viewHeight/2;camera.bottom=-viewHeight/2;camera.updateProjectionMatrix();
  renderer.setSize(width,height);
}
window.addEventListener('resize',resize);resize();
controls.saveState();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reducedMotion.matches;
reducedMotion.addEventListener('change',event=>{paused=event.matches;});
canvas.addEventListener('keydown',event=>{
  if(event.key===' '){paused=!paused;event.preventDefault();}
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

let time=0,last=performance.now(),frames=0;
let frameHandle;
function frame(now){
  const dt=Math.min((now-last)/1000,.05);last=now;
  if(!paused)time+=dt;
  trains.forEach(train=>train.update(time));
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
