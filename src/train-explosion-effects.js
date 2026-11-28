import * as THREE from 'three';
import {rigidSurfacePoseMatrix} from './world-surface.js';
import {playerColors} from './player-palette.js';

const PARTICLES=24,MAX_BURSTS=8,LIFETIME=2.1;
const random=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};

/** Cosmetic, bounded wreck bursts. No collision, damage or economic mutation.
 * A single instanced batch per render layer goes entirely idle between events. */
export function createTrainExplosionEffects(root,mapRoot,world){
  const active=[],seen=new Set(),colors=new Map();let disposed=false;
  const geometry=new THREE.IcosahedronGeometry(1,0),capacity=MAX_BURSTS*PARTICLES;
  const opacity=new THREE.InstancedBufferAttribute(new Float32Array(capacity),1).setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('burstOpacity',opacity);
  function alpha(shader){
    shader.vertexShader='attribute float burstOpacity; varying float vBurstOpacity;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvBurstOpacity = burstOpacity;');
    shader.fragmentShader='varying float vBurstOpacity;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.a *= vBurstOpacity;');
  }
  const material=new THREE.MeshLambertMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:.17,transparent:true,depthWrite:false,flatShading:true});
  const mapMaterial=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,depthWrite:false});
  for(const m of[material,mapMaterial]){m.onBeforeCompile=alpha;m.customProgramCacheKey=()=> 'train-burst-v1';}
  const detail=new THREE.InstancedMesh(geometry,material,capacity),map=new THREE.InstancedMesh(geometry,mapMaterial,capacity);
  for(const mesh of[detail,map]){mesh.name='train-explosion';mesh.count=0;mesh.visible=false;mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.renderOrder=5;}
  root.add(detail);mapRoot.add(map);
  const frame=new THREE.Matrix4(),flat=new THREE.Matrix4(),local=new THREE.Matrix4(),matrix=new THREE.Matrix4();
  const position=new THREE.Vector3(),scale=new THREE.Vector3(),quaternion=new THREE.Quaternion(),axis=new THREE.Vector3(0,1,0);
  const smoke=new THREE.Color('#b8b6a8'),flash=new THREE.Color('#ffc46a'),steel=new THREE.Color('#263b3b');
  function emit(event){
    if(disposed||!event||![event.x,event.z].every(Number.isFinite))return false;
    const key=event.id??event.trainId;if(key&&seen.has(key))return false;
    if(key){seen.add(key);if(seen.size>128)seen.delete(seen.values().next().value);}
    if(active.length>=MAX_BURSTS)active.shift();
    if(!colors.has(event.ownerId))colors.set(event.ownerId,playerColors(world.players?.find(player=>player.id===event.ownerId)).body);
    active.push({x:event.x,y:Number.isFinite(event.y)?event.y:0,z:event.z,angle:event.angle??0,ownerId:event.ownerId,age:0,
      seed:[...String(key??active.length)].reduce((sum,c)=>sum+c.charCodeAt(0),0)});return true;
  }
  function update(dt,{mapBlend=0,reducedMotion=false,night=0}={}){
    if(disposed)return;
    if(!active.length){detail.visible=map.visible=false;detail.count=map.count=0;return;}
    const elapsed=Number.isFinite(dt)?Math.max(0,dt):0;
    for(let i=active.length-1;i>=0;i--){active[i].age+=elapsed;if(active[i].age>=(reducedMotion?.45:LIFETIME))active.splice(i,1);}
    let count=0;
    for(const burst of active){
      rigidSurfacePoseMatrix(world,burst.x,burst.y,burst.z,burst.angle,frame);flat.makeRotationY(burst.angle);flat.setPosition(burst.x,1.1,burst.z);
      for(let i=0;i<PARTICLES;i++){
        const n=burst.seed+i*17.31,kind=i<3?'flash':i<13?'smoke':'debris';
        if(reducedMotion&&kind!=='smoke')continue;
        const life=reducedMotion?.45:kind==='flash'?.24:kind==='smoke'?LIFETIME:1.2,t=burst.age/life;if(t>=1)continue;
        const angle=random(n)*Math.PI*2,travel=reducedMotion?0:burst.age,spread=kind==='smoke'?.7:2.2;
        const radius=(.15+random(n+1)*.4)+travel*spread*(.55+random(n+2)*.45);
        let y=.8+travel*(kind==='smoke'?1.2:3.5)- (kind==='debris'?4*travel*travel:0);
        y=Math.max(.08,y);
        const size=kind==='flash'?.65*(1-t):kind==='smoke'?.2+.65*t:.08+random(n+3)*.09;
        position.set(Math.sin(angle)*radius,y,Math.cos(angle)*radius);scale.setScalar(size);
        quaternion.setFromAxisAngle(axis,random(n+4)*6+travel*3);local.compose(position,quaternion,scale);
        matrix.multiplyMatrices(frame,local);detail.setMatrixAt(count,matrix);
        position.set(position.x*1.4,.08,position.z*1.4);scale.set(size*1.6,.06,size*1.6);local.compose(position,quaternion,scale);
        matrix.multiplyMatrices(flat,local);map.setMatrixAt(count,matrix);
        const color=kind==='flash'?flash:kind==='smoke'?smoke:i%2?colors.get(burst.ownerId):steel;
        detail.setColorAt(count,color);map.setColorAt(count,color);opacity.setX(count++,(kind==='smoke'?.65:.95)*(1-t)**1.4);
      }
    }
    material.emissiveIntensity=THREE.MathUtils.lerp(.17,.4,night);
    detail.count=map.count=count;detail.visible=count>0&&mapBlend<.999;map.visible=count>0&&mapBlend>.001;
    if(count){detail.instanceMatrix.needsUpdate=map.instanceMatrix.needsUpdate=opacity.needsUpdate=true;detail.instanceColor.needsUpdate=map.instanceColor.needsUpdate=true;}
  }
  return {emit,update,get stats(){return {bursts:active.length,particles:detail.count,capacity,remembered:seen.size};},
    dispose(){if(disposed)return;disposed=true;active.length=0;seen.clear();colors.clear();for(const m of[detail,map]){m.removeFromParent();m.dispose();}geometry.dispose();material.dispose();mapMaterial.dispose();}};
}
