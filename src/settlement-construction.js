import * as THREE from 'three';
import {rigidSurfacePoseMatrix,chartHeadingForSurface} from './world-surface.js';

export const CONSTRUCTION_SECONDS=2;
export const MAX_CONSTRUCTION_SITES=16;
const PUFFS=24;
const smooth=t=>{t=THREE.MathUtils.clamp(t,0,1);return t*t*(3-2*t);};
const noise=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};

/** A brief foundation-to-roof reveal writes only the new instances. Dust uses
 * two fixed-capacity batches, shared geometry and per-instance opacity. No
 * work or instance uploads remain after construction finishes. */
export function createSettlementConstruction(root,mapRoot,world){
  const active=new Map(),activeIds=new Set();let known=new Set(),initialized=false;
  const geometry=new THREE.IcosahedronGeometry(1,1);
  const opacity=new THREE.InstancedBufferAttribute(new Float32Array(MAX_CONSTRUCTION_SITES*PUFFS),1).setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('dustOpacity',opacity);
  const material=new THREE.MeshLambertMaterial({color:'#e8ddc1',emissive:'#c3b794',emissiveIntensity:.45,transparent:true,depthWrite:false,flatShading:true});
  material.onBeforeCompile=shader=>{
    shader.vertexShader='attribute float dustOpacity; varying float vDustOpacity;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvDustOpacity = dustOpacity;');
    shader.fragmentShader='varying float vDustOpacity;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.a *= vDustOpacity;');
  };
  material.customProgramCacheKey=()=> 'settlement-dust-v1';
  const dust=new THREE.InstancedMesh(geometry,material,MAX_CONSTRUCTION_SITES*PUFFS);
  // Map rendering has no lights. A separate basic material retains the same
  // faceted silhouette and opacity without adding a map lighting pass.
  const flatMaterial=new THREE.MeshBasicMaterial({color:'#dfd3b0',transparent:true,depthWrite:false});
  flatMaterial.onBeforeCompile=material.onBeforeCompile;flatMaterial.customProgramCacheKey=material.customProgramCacheKey;
  const mapDust=new THREE.InstancedMesh(geometry,flatMaterial,MAX_CONSTRUCTION_SITES*PUFFS);
  for(const mesh of [dust,mapDust]){mesh.name='construction-dust';mesh.count=0;mesh.visible=false;mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.renderOrder=4;}
  const dustRoot=new THREE.Group(),mapDustRoot=new THREE.Group();dustRoot.name=mapDustRoot.name='settlement-construction';
  dustRoot.add(dust);mapDustRoot.add(mapDust);root.add(dustRoot);mapRoot.add(mapDustRoot);
  const matrix=new THREE.Matrix4(),frame=new THREE.Matrix4(),mapFrame=new THREE.Matrix4(),local=new THREE.Matrix4();
  const scale=new THREE.Vector3(),position=new THREE.Vector3(),quaternion=new THREE.Quaternion(),axis=new THREE.Vector3(0,1,0),touched=new Set();
  const bounds=new THREE.Box3();
  function expandBounds(){
    // Elevated-only batches (windows, lamps) descend outside their finished
    // bounds. Union both growth endpoints before applying the temporary pose.
    touched.clear();
    for(const record of active.values())for(const slot of record.slots){
      if(!slot.batch.boundingBox)slot.batch.computeBoundingBox();
      if(!slot.batch.geometry.boundingBox)slot.batch.geometry.computeBoundingBox();
      matrix.copy(slot.pose).scale(scale.set(slot.map?.6:1,slot.map?1:0,slot.map?.6:1));
      bounds.copy(slot.batch.geometry.boundingBox).applyMatrix4(matrix);slot.batch.boundingBox.union(bounds);touched.add(slot.batch);
    }
    for(const batch of touched){if(!batch.boundingSphere)batch.boundingSphere=new THREE.Sphere();batch.boundingBox.getBoundingSphere(batch.boundingSphere);}
  }
  function writeBuildings(){
    touched.clear();
    for(const record of active.values()){
      const growth=.035+.965*smooth(record.age/1.55);
      for(const slot of record.slots){
        scale.set(slot.map?.6+.4*growth:1,slot.map?1:growth,slot.map?.6+.4*growth:1);
        matrix.copy(slot.pose).scale(scale);slot.batch.setMatrixAt(slot.index,matrix);
        slot.batch.instanceMatrix.addUpdateRange(slot.index*16,16);touched.add(slot.batch);
      }
    }
    for(const batch of touched)batch.instanceMatrix.needsUpdate=true;
  }
  function finish(record){
    for(const slot of record.slots){slot.batch.setMatrixAt(slot.index,slot.pose);slot.batch.instanceMatrix.addUpdateRange(slot.index*16,16);slot.batch.instanceMatrix.needsUpdate=true;}
    active.delete(record.item.id);activeIds.delete(record.item.id);
  }
  function drawDust(mapBlend){
    let count=0;
    for(const record of active.values()){
      const {item,seed}=record;
      const heading=chartHeadingForSurface(world,item.x,item.z,item.rotation??0);
      rigidSurfacePoseMatrix(world,item.x,item.y??0,item.z,heading,frame);
      rigidSurfacePoseMatrix(world,item.x,.72,item.z,heading,mapFrame);
      const width=(item.width??2.2)*(item.scale??1)/2,depth=(item.depth??2.2)*(item.scale??1)/2;
      for(let i=0;i<PUFFS;i++){
        const n=seed+i*17.31,delay=noise(n)*.34,lifetime=1.18+noise(n+4)*.4,t=(record.age-delay)/lifetime;
        if(t<=0||t>=1)continue;
        const angle=(i/PUFFS+noise(n+1)*.04)*Math.PI*2,s=Math.sin(angle),c=Math.cos(angle),edge=1/Math.max(Math.abs(s),Math.abs(c));
        const drift=.12+t*(.65+noise(n+2)*.6),size=(.16+.34*Math.sin(Math.PI*t*.85))*(.75+noise(n+3)*.5);
        position.set(s*(width*edge+drift),size*.53+t*(.18+noise(n+5)*.43),c*(depth*edge+drift));
        scale.set(size*(1.12+noise(n+6)*.4),size*.82,size);quaternion.setFromAxisAngle(axis,noise(n+7)*6+t*.5);
        local.compose(position,quaternion,scale);matrix.multiplyMatrices(frame,local);dust.setMatrixAt(count,matrix);
        position.y=.08;scale.y=.08;local.compose(position,quaternion,scale);matrix.multiplyMatrices(mapFrame,local);mapDust.setMatrixAt(count,matrix);
        opacity.setX(count++,.46*smooth(t/.14)*(1-smooth((t-.48)/.52)));
      }
    }
    dust.count=mapDust.count=count;dust.visible=count>0&&mapBlend<.999;mapDust.visible=count>0&&mapBlend>.001;
    if(count){dust.instanceMatrix.needsUpdate=mapDust.instanceMatrix.needsUpdate=opacity.needsUpdate=true;}
  }
  return{
    activeIds,
    beginSync(items,{animate=false,reducedMotion=false}={}){
      const next=new Set(items.map(item=>item.id));
      for(const record of active.values())if(!next.has(record.item.id)||reducedMotion)finish(record);
      for(const record of active.values())record.slots.length=0;
      if(initialized&&animate&&!reducedMotion)for(const item of items)if(!known.has(item.id)){
        if(active.size>=MAX_CONSTRUCTION_SITES)finish(active.values().next().value);
        const seed=[...String(item.id)].reduce((sum,char)=>sum+char.charCodeAt(0),0);
        active.set(item.id,{item:{...item},seed,age:0,slots:[]});activeIds.add(item.id);
      }
      known=next;initialized=true;
    },
    bind(item,batch,index,pose,{map=false}={}){active.get(item.id)?.slots.push({batch,index,pose:pose.clone(),map});},
    finishSync(){expandBounds();writeBuildings();},
    update(dt,{mapBlend=0,reducedMotion=false,night=0}={}){
      if(!active.size){dust.visible=mapDust.visible=false;dust.count=mapDust.count=0;return;}
      const elapsed=Number.isFinite(dt)?Math.max(0,dt):0;
      material.emissiveIntensity=THREE.MathUtils.lerp(.45,.035,night);
      for(const record of active.values()){record.age+=elapsed;if(record.age>=CONSTRUCTION_SECONDS||reducedMotion)finish(record);}
      writeBuildings();drawDust(mapBlend);
    },
    get count(){return active.size;},get dustCount(){return dust.count;},
    dispose(){active.clear();activeIds.clear();dustRoot.removeFromParent();mapDustRoot.removeFromParent();for(const mesh of [dust,mapDust])mesh.dispose();geometry.dispose();material.dispose();flatMaterial.dispose();},
  };
}
