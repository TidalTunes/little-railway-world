import * as THREE from 'three';
import {M} from './palette.js';
import {clockFaceSpecs,CLOCK_HANDS,clockHandAngle} from './clock-design.js';
import {rigidSurfacePoseMatrix,surfaceDistance} from './world-surface.js';

export const CLOCK_LIMITS=Object.freeze({faces:256,radius:360});
/** One draw call for every nearby clock hand. Only resident scenery contributes
 * faces, and a revision or a meaningful camera move rebuilds the tiny pose list. */
export function createClockHands(parent,world){
  const root=new THREE.Group();root.name='town-clock-hands';parent.add(root);
  const hands=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),M.metal,CLOCK_LIMITS.faces*2);
  hands.name='clock-hands';hands.count=0;hands.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  hands.frustumCulled=false;hands.castShadow=false;root.add(hands);
  const frames=[],pose=new THREE.Matrix4(),faceMatrix=new THREE.Matrix4(),local=new THREE.Matrix4(),part=new THREE.Object3D();
  let previousPlacements=null,previousRevision=-1,lastFocus=null,lastTime=-1;
  function rebuild(placements,focus){
    frames.length=0;
    const clocks=[];
    for(const item of placements){
      const kind=item.buildingType?(item.buildingType==='clock'?'landmark':item.buildingType==='hall'?'civic':null):item.kind;
      const specs=kind?clockFaceSpecs(kind,item.buildingType?0:item.variant):[];
      if(!specs.length)continue;
      const distance=surfaceDistance(world,item,focus);
      if(distance<=CLOCK_LIMITS.radius)clocks.push({item,specs,distance});
    }
    clocks.sort((a,b)=>a.distance-b.distance);
    for(const {item,specs}of clocks){
      rigidSurfacePoseMatrix(world,item.x,item.y??0,item.z,item.rotation??0,pose);
      const scale=item.scale??1;pose.scale(new THREE.Vector3(scale,scale,scale));
      for(const spec of specs){
        if(frames.length===CLOCK_LIMITS.faces)break;
        part.position.set(spec.x,spec.y,spec.z);part.rotation.set(0,spec.rotation,0);part.scale.set(1,1,1);part.updateMatrix();
        faceMatrix.copy(pose).multiply(part.matrix);
        frames.push({matrix:faceMatrix.clone(),radius:spec.radius});
      }
    }
    lastTime=-1;
  }
  return {root,hands,
    update(time,{focus={x:0,z:0},placements=[],revision=0,visible=true,reducedMotion=false}={}){
      root.visible=visible;if(!visible)return;
      if(placements!==previousPlacements||revision!==previousRevision||!lastFocus||surfaceDistance(world,focus,lastFocus)>16){
        rebuild(placements,focus);previousPlacements=placements;previousRevision=revision;lastFocus={x:focus.x,z:focus.z};
      }
      // Reduced motion uses deliberate minute steps but still tells the same
      // time. Normal updates stay bounded instead of uploading every frame.
      const tick=reducedMotion?Math.floor(time):Math.floor(time*12)/12;
      if(tick===lastTime)return;lastTime=tick;
      let index=0;
      for(const frame of frames)for(const [handIndex,hand]of CLOCK_HANDS.entries()){
        const angle=clockHandAngle(tick,handIndex),length=frame.radius*hand.length;
        part.position.set(-Math.sin(angle)*length*.43,Math.cos(angle)*length*.43,hand.z);
        part.rotation.set(0,0,angle);part.scale.set(frame.radius*hand.width,length,.008);part.updateMatrix();
        local.copy(frame.matrix).multiply(part.matrix);hands.setMatrixAt(index++,local);
      }
      hands.count=index;hands.instanceMatrix.needsUpdate=true;
    },
    dispose(){hands.dispose();hands.geometry.dispose();root.removeFromParent();frames.length=0;},
  };
}
