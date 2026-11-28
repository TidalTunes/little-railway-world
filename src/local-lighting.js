import * as THREE from 'three';
import {rigidSurfacePoseMatrix,surfaceDistance} from './world-surface.js';

export const LOCAL_LIGHT_LIMITS=Object.freeze({lights:8,searchRadius:65,refreshSeconds:.25});

/** A fixed pool of real, unshadowed lamps. Nearby windows and station downlights
 * illuminate ground and geometry; distant towns never add shader lights or
 * shadow passes. Stable slots fade before moving to another fixture. */
export function createLocalLighting(scene,world){
  const slots=Array.from({length:LOCAL_LIGHT_LIMITS.lights},()=>{
    const light=new THREE.PointLight(0xffc78d,0,6,2);light.name='local-window-light';light.castShadow=false;scene.add(light);
    return {light,source:null,target:null,weight:0};
  });
  const matrix=new THREE.Matrix4(),point=new THREE.Vector3();
  let sources=[],previous=null,previousRevision=null,lastFocus=null,refresh=0,disposed=false,selections=0;
  function rebuild(placements){
    sources=[];lastFocus=null;
    for(const item of placements){
      const kind=item.kind??item.buildingType,scale=item.scale??1;
      if(!['house','station','civic','landmark','apartment','tower'].includes(kind))continue;
      if(item.buildingType&&['well','waterTower','fountain'].includes(item.buildingType))continue;
      const lamps=kind==='station'?[[.78,1.64,-.15,7,9],[2.06,1.64,-.15,7,9]]
        :kind==='house'?[[0,.91,(item.variant??0)%4===1?1.15:1.06,5.4,5.5]]
        :[[0,1.15,1.65,7.5,8]];
      rigidSurfacePoseMatrix(world,item.x,item.y??0,item.z,item.rotation??0,matrix);
      lamps.forEach(([x,y,z,radius,intensity],index)=>{
        point.set(x*scale,y*scale,z*scale).applyMatrix4(matrix);
        sources.push({id:`${item.id??`${kind}:${item.x}:${item.z}`}:${index}`,x:item.x,z:item.z,
          position:point.clone(),radius:radius*scale,intensity});
      });
    }
  }
  function select(focus){
    selections++;
    const chosen=sources.map(source=>({source,distance:surfaceDistance(world,source,focus)}))
      .filter(item=>item.distance<LOCAL_LIGHT_LIMITS.searchRadius).sort((a,b)=>a.distance-b.distance)
      .slice(0,LOCAL_LIGHT_LIMITS.lights).map(item=>item.source);
    const assigned=new Set();
    for(const slot of slots){
      const keep=chosen.find(source=>source.id===slot.source?.id);
      slot.target=keep??null;if(keep){assigned.add(keep.id);slot.source=keep;slot.light.position.copy(keep.position);slot.light.distance=keep.radius;}
    }
    const remaining=chosen.filter(source=>!assigned.has(source.id));
    for(const slot of slots)if(!slot.target)slot.target=remaining.shift()??null;
    lastFocus={x:focus.x,z:focus.z};refresh=0;
  }
  function update(dt,{placements=[],revision=0,focus={x:0,z:0},night=0,mapBlend=0}={}){
    if(disposed)return;
    const delta=Number.isFinite(dt)?Math.max(0,dt):0;refresh+=delta;
    const changed=placements!==previous||revision!==previousRevision;
    if(changed){previous=placements;previousRevision=revision;rebuild(placements);}
    const strength=THREE.MathUtils.smoothstep(night,.05,.85)*(1-THREE.MathUtils.smoothstep(mapBlend,.6,1));
    if(strength>0&&(changed||!lastFocus||refresh>=LOCAL_LIGHT_LIMITS.refreshSeconds&&surfaceDistance(world,focus,lastFocus)>1.5))select(focus);
    for(const slot of slots){
      const moving=slot.source?.id!==slot.target?.id,target=slot.target&&!moving&&strength>0?1:0;
      slot.weight=THREE.MathUtils.damp(slot.weight,target,9,delta);
      if(moving&&slot.weight<.01){slot.source=slot.target;slot.weight=0;
        if(slot.source){slot.light.position.copy(slot.source.position);slot.light.distance=slot.source.radius;}}
      slot.light.intensity=(slot.source?.intensity??0)*slot.weight*strength;
    }
  }
  return {update,get lights(){return slots.map(slot=>slot.light);},get stats(){return {capacity:slots.length,active:slots.filter(slot=>slot.light.intensity>.01).length,sources:sources.length,selections};},
    dispose(){if(disposed)return;disposed=true;for(const slot of slots){slot.light.removeFromParent();slot.light.dispose();}sources=[];}};
}
