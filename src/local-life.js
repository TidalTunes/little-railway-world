import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {C,M} from './palette.js';
import {applySceneStyle} from './scene-style.js';
import {surfaceFor,surfacePoint,surfaceOffset,surfaceDistance,chartHeadingForSurface,rigidSurfacePoseMatrix} from './world-surface.js';

// Only visible detail regions supply candidates. Both selection and drawing are
// capped; adding another continent does not add another animation loop.
export const LIFE_LIMITS=Object.freeze({sheep:48,flocks:6,butterflies:16,fireflies:48,radius:150});
const flockKinds=new Set(['tree','house','apartment','civic','tower','plaza']);
const insectKinds=new Set(['tree','farmPatch','plaza']);
const tau=Math.PI*2;
const flockFeather=24;
function seedOf(item){
  const text=String(item.id??`${item.kind}:${item.x.toFixed(3)}:${item.z.toFixed(3)}`);
  let hash=2166136261;for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
  return (hash>>>0)/4294967296;
}
function nearest(list,item,distance,capacity){
  if(list.length===capacity&&distance>=list.at(-1).distance)return;
  const record={item,distance,phase:seedOf(item)*tau};
  let index=list.length;while(index>0&&list[index-1].distance>distance)index--;
  list.splice(index,0,record);if(list.length>capacity)list.pop();
}

// Waypoints live in the clearance disk reserved by generation. Smooth starts
// and stops leave time to graze and turn before walking to the next spot.
function grazingMotion(item,phase,time,target){
  const size=item.scale??1,radius=Math.max(0,Math.min(item.roamRadius??.12*size,(item.radius??.7*size)-.55*size));
  const cycle=time/(18+phase/tau*10)+phase/tau*4,index=Math.floor(cycle),fraction=cycle-index;
  const point=(step,axis)=>{
    const hash=value=>{const n=Math.sin(value*127.1+phase*311.7)*43758.5453;return n-Math.floor(n);};
    const angle=hash(step+7)*tau,r=Math.sqrt(hash(step+47))*.9*radius;
    return (axis===0?Math.sin(angle):Math.cos(angle))*r;
  };
  const ax=point(index,0),az=point(index,1),bx=point(index+1,0),bz=point(index+1,1);
  const travel=THREE.MathUtils.clamp((fraction-.32)/.68,0,1),ease=travel*travel*(3-2*travel);
  const heading=Math.atan2(bx-ax,bz-az),previous=Math.atan2(ax-point(index-1,0),az-point(index-1,1));
  const turn=THREE.MathUtils.smoothstep(fraction,0,.32),delta=Math.atan2(Math.sin(heading-previous),Math.cos(heading-previous));
  target.dx=ax+(bx-ax)*ease;target.dz=az+(bz-az)*ease;
  target.heading=previous+delta*turn;target.walking=Math.sin(travel*Math.PI)**2;
  return target;
}

/** Geographic placement remains the source of truth. Chord distance gives the
 * same ordering as great-circle distance and handles the date line naturally. */
export function selectLocalLife(world,placements,focus,radius=LIFE_LIMITS.radius){
  const sheep=[],flocks=[],insects=[],curved=Boolean(surfaceFor(world));
  const center=curved?surfacePoint(world,focus.x,0,focus.z):null,p=new THREE.Vector3();
  const maxDistance=curved?2*world.surface.radius*Math.sin(Math.min(Math.PI,radius/world.surface.radius)/2):radius;
  for(const item of placements??[]){
    if(item.kind!=='sheep'&&!flockKinds.has(item.kind)&&!insectKinds.has(item.kind))continue;
    const distance=curved?surfacePoint(world,item.x,0,item.z,p).distanceToSquared(center):(item.x-focus.x)**2+(item.z-focus.z)**2;
    if(distance>maxDistance**2)continue;
    if(item.kind==='sheep')nearest(sheep,item,distance,LIFE_LIMITS.sheep);
    if(flockKinds.has(item.kind))nearest(flocks,item,distance,LIFE_LIMITS.flocks*8);
    if(insectKinds.has(item.kind))nearest(insects,item,distance,LIFE_LIMITS.fireflies/3);
  }
  const spacedFlocks=[];
  for(const candidate of flocks){
    if(spacedFlocks.every(other=>surfaceDistance(world,candidate.item,other.item)>12))spacedFlocks.push(candidate);
    if(spacedFlocks.length===LIFE_LIMITS.flocks)break;
  }
  return {sheep,flocks:spacedFlocks,insects};
}

function headGeometry(){
  const head=new THREE.IcosahedronGeometry(1,0).scale(.125,.14,.15),parts=[head];
  for(const side of [-1,1])parts.push(new THREE.BoxGeometry(.09,.035,.075).translate(side*.145,.04,-.015).toNonIndexed());
  const geometry=mergeGeometries(parts);parts.forEach(part=>part.dispose());return geometry;
}
function wingGeometry(){
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,.48,.015,.12,.25,0,.22],3));
  geometry.setIndex([0,1,2]);geometry.computeVertexNormals();return geometry;
}

/** A handful of grazing sheep, rooftop swallows, meadow butterflies and dusk
 * fireflies. No animated object is baked into a terrain chunk, and every rigid
 * pose is reconstructed from geographic coordinates (never warped twice). */
export function createLocalLife(parent,world){
  const root=new THREE.Group();root.name='local-life';parent.add(root);
  const batches=[],ownedMaterials=[],curved=Boolean(surfaceFor(world));
  function batch(name,geometry,material,capacity,shadow=true){
    const object=new THREE.InstancedMesh(geometry,material,capacity);object.name=name;
    object.count=0;object.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    // Instances occupy a tiny moving window; a stale geometry sphere cannot
    // represent them. Selection already excludes the rest of the world.
    object.frustumCulled=false;object.castShadow=shadow;object.receiveShadow=shadow;root.add(object);batches.push(object);return object;
  }
  const wool=batch('grazing-sheep-wool',new THREE.IcosahedronGeometry(1,1),M.white,LIFE_LIMITS.sheep);
  const heads=batch('grazing-sheep-heads',headGeometry(),M.roofBlue,LIFE_LIMITS.sheep);
  const feet=batch('grazing-sheep-feet',new THREE.BoxGeometry(.055,.18,.055),M.metal,LIFE_LIMITS.sheep*4);
  const birdMaterial=applySceneStyle(M.roofBlue.clone());ownedMaterials.push(birdMaterial);
  const birdBodies=batch('local-swallow-bodies',new THREE.IcosahedronGeometry(1,0).scale(.07,.065,.21),birdMaterial,LIFE_LIMITS.flocks*3,false);
  const wingMaterial=applySceneStyle(M.roofBlue.clone());wingMaterial.side=THREE.DoubleSide;ownedMaterials.push(wingMaterial);
  const birdWings=batch('local-swallow-wings',wingGeometry(),wingMaterial,LIFE_LIMITS.flocks*6,false);
  for(const object of [birdBodies,birdWings]){
    const visibility=new THREE.InstancedBufferAttribute(new Float32Array(object.instanceMatrix.count),1);
    visibility.setUsage(THREE.DynamicDrawUsage);object.geometry.setAttribute('lifeVisibility',visibility);
    const material=object.material,before=material.onBeforeCompile,key=material.customProgramCacheKey();
    material.transparent=true;material.depthWrite=false;material.forceSinglePass=true;
    material.onBeforeCompile=(shader,renderer)=>{
      before(shader,renderer);
      shader.vertexShader='attribute float lifeVisibility; varying float faunaVisibility;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nfaunaVisibility=lifeVisibility;');
      shader.fragmentShader='varying float faunaVisibility;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>','diffuseColor.a*=faunaVisibility;\n#include <opaque_fragment>');
    };
    material.customProgramCacheKey=()=>`${key}|fauna-fade-v1`;
  }
  const butterflyMaterial=applySceneStyle(M.white.clone());butterflyMaterial.side=THREE.DoubleSide;ownedMaterials.push(butterflyMaterial);
  const butterflyWings=batch('meadow-butterflies',new THREE.PlaneGeometry(.19,.25).rotateX(-Math.PI/2).translate(.09,0,0),butterflyMaterial,LIFE_LIMITS.butterflies*2,false);
  const glowMaterial=new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,
    uniforms:{night:{value:0}},
    vertexShader:`varying vec2 vUv; varying vec3 vTint;
      void main(){
        vUv=uv; vTint=instanceColor;
        mat4 transform=modelViewMatrix*instanceMatrix;
        vec4 center=transform*vec4(0.,0.,0.,1.);
        center.xy+=position.xy*length(transform[0].xyz);
        gl_Position=projectionMatrix*center;
      }`,
    fragmentShader:`uniform float night; varying vec2 vUv; varying vec3 vTint;
      void main(){
        float r=length(vUv-.5)*2.;
        float halo=pow(max(0.,1.-r),2.4);
        float core=1.-smoothstep(.08,.24,r);
        gl_FragColor=vec4(vTint*(.5+core),night*(halo*.42+core*.58));
      }`,
  });ownedMaterials.push(glowMaterial);
  const fireflies=batch('woodland-fireflies',new THREE.PlaneGeometry(1,1),glowMaterial,LIFE_LIMITS.fireflies,false);
  // Set instance colors once; uniforms control the whole batch at dusk.
  for(let i=0;i<LIFE_LIMITS.fireflies;i++)fireflies.setColorAt(i,C.gold.clone().lerp(C.white,i%3*.12));
  for(let i=0;i<LIFE_LIMITS.butterflies*2;i++)butterflyWings.setColorAt(i,[C.gold,C.leafPink,C.lavender][Math.floor(i/2)%3]);
  const pose=new THREE.Matrix4(),part=new THREE.Matrix4(),composed=new THREE.Matrix4(),orientation=new THREE.Quaternion(),position=new THREE.Vector3(),scale=new THREE.Vector3(),point={};
  const axisX=new THREE.Vector3(1,0,0),axisZ=new THREE.Vector3(0,0,1),focusPoint=new THREE.Vector3(),lastFocus=new THREE.Vector3(Infinity,0,0),renderedFocus=new THREE.Vector3(Infinity,0,0);
  let selected={sheep:[],flocks:[],insects:[]},flocks=[],previousPlacements=null,previousRevision=-1,lastTime=NaN,frozenTime=null,previousReducedMotion=false;
  const grazing={};
  const stats={sheep:0,birds:0,butterflies:0,fireflies:0,instances:0,selections:0,updates:0,drawCalls:batches.length};
  function frame(item,dx,dz,height,angle,physicalHeading=false){
    surfaceOffset(world,item.x,item.z,dx,dz,point);
    if(physicalHeading)angle=chartHeadingForSurface(world,point.x,point.z,angle);
    if(curved)rigidSurfacePoseMatrix(world,point.x,height,point.z,angle,pose);
    else pose.makeRotationY(angle).setPosition(point.x,height,point.z);
  }
  function instance(object,index,x,y,z,sx=1,sy=1,sz=1,tilt=0,axis=axisX){
    position.set(x,y,z);scale.set(sx,sy,sz);orientation.setFromAxisAngle(axis,tilt);
    part.compose(position,orientation,scale);composed.multiplyMatrices(pose,part);object.setMatrixAt(index,composed);
  }
  function update(time,{focus={x:0,z:0},placements=[],revision=0,detailBlend=1,reducedMotion=false,night=0}={}){
    root.visible=detailBlend>.001;
    if(!root.visible)return;
    if(reducedMotion){if(frozenTime===null)frozenTime=time;time=frozenTime;}else frozenTime=null;
    if(curved)surfacePoint(world,focus.x,0,focus.z,focusPoint);else focusPoint.set(focus.x,0,focus.z);
    const focusMoved=focusPoint.distanceToSquared(renderedFocus)>1e-10;
    const changed=placements!==previousPlacements||revision!==previousRevision||focusPoint.distanceToSquared(lastFocus)>36;
    if(changed){
      selected=selectLocalLife(world,placements,focus);
      // A terrain chunk's box does not include the birds flying above it.
      // Keep their anchors even when that chunk leaves the frustum or cache;
      // moving the focus never reassigns an existing flock to a new rooftop.
      flocks=flocks.filter(({item})=>surfaceDistance(world,item,focus)<LIFE_LIMITS.radius+flockFeather);
      for(const candidate of selected.flocks){
        if(flocks.length===LIFE_LIMITS.flocks)break;
        if(flocks.every(other=>surfaceDistance(world,candidate.item,other.item)>12))
          flocks.push({...candidate,bornAt:!Number.isFinite(lastTime)||reducedMotion||time===lastTime?time-1:time});
      }
      previousPlacements=placements;previousRevision=revision;lastFocus.copy(focusPoint);stats.selections++;
    }
    night=THREE.MathUtils.clamp(night,0,1);glowMaterial.uniforms.night.value=night;
    fireflies.visible=night>.01;butterflyWings.visible=night<.9;
    // Paused simulation does no matrix uploads. Changing dusk only changes one
    // uniform, and a new region remains visible even under reduced motion.
    if(!changed&&!focusMoved&&time===lastTime&&reducedMotion===previousReducedMotion)return;
    lastTime=time;previousReducedMotion=reducedMotion;renderedFocus.copy(focusPoint);
    let sheepCount=0,birdCount=0,butterflyCount=0,flyCount=0;
    for(const {item,phase} of selected.sheep){
      const {dx,dz,heading,walking}=grazingMotion(item,phase,time,grazing),gait=Math.sin(time*5.5+phase)*walking;
      frame(item,dx,dz,(item.y??0)+.008,heading,true);
      pose.scale(scale.setScalar(item.scale??1));
      instance(wool,sheepCount,0,.31+Math.abs(gait)*.012,-.035,.23,.22,.30);
      const graze=(1-walking)*(.45+Math.sin(time*.8+phase)*.13);
      instance(heads,sheepCount,0,.34-graze*.12,.245,1,1,1,graze);
      for(let j=0;j<4;j++)instance(feet,sheepCount*4+j,j%2?.12:-.12,.10,j<2?-.16:.16,1,1,1,gait*(j===0||j===3?.18:-.18));
      sheepCount++;
    }
    for(const {item,phase,bornAt} of flocks){
      const visibility=(1-THREE.MathUtils.smoothstep(surfaceDistance(world,item,focus),LIFE_LIMITS.radius-20,LIFE_LIMITS.radius+flockFeather))
        *(reducedMotion?1:THREE.MathUtils.smoothstep(time-bornAt,0,.8));
      for(let member=0;member<3;member++){
        const angle=time*.18+phase+member*.13,radius=2.5+member*.48;
        frame(item,Math.sin(angle)*radius,Math.cos(angle)*radius,(item.y??0)+11+Math.sin(angle*.8)*.5+member*.22,Math.PI/2+angle,true);
        instance(birdBodies,birdCount,0,0,0);
        birdBodies.geometry.attributes.lifeVisibility.setX(birdCount,visibility);
        const flap=Math.sin(time*6.2+phase+member*.7)*.43;
        instance(birdWings,birdCount*2,0,0,0,1,1,1,flap,axisZ);
        instance(birdWings,birdCount*2+1,0,0,0,1,1,1,Math.PI-flap,axisZ);
        birdWings.geometry.attributes.lifeVisibility.setX(birdCount*2,visibility);
        birdWings.geometry.attributes.lifeVisibility.setX(birdCount*2+1,visibility);birdCount++;
      }
    }
    for(const {item,phase} of selected.insects){
      const meadow=item.kind==='farmPatch'||item.kind==='plaza';
      if(meadow&&butterflyCount<LIFE_LIMITS.butterflies){
        const angle=time*.36+phase;
        frame(item,Math.sin(angle)*.7,Math.cos(angle*1.3)*.6,(item.y??0)+2+Math.sin(time*1.2+phase)*.22,angle,true);
        const flap=.35+Math.sin(time*14+phase)*.65;
        instance(butterflyWings,butterflyCount*2,0,0,0,1,1,1,flap,axisZ);
        instance(butterflyWings,butterflyCount*2+1,0,0,0,1,1,1,Math.PI-flap,axisZ);butterflyCount++;
      }
      for(let member=0;member<3;member++){
        const a=time*.21+phase+member*tau/3,pulse=.5+.5*Math.sin(time*1.15+phase+member*1.7);
        // Glows float above the reserved tree/field envelope, never under roofs.
        frame(item,Math.cos(a)*.55,Math.sin(a*1.3)*.55,(item.y??0)+(meadow?2.1:3.9)+Math.sin(a*2)*.18,0);
        const size=.24+pulse*.22;instance(fireflies,flyCount++,0,0,0,size,size,size);
      }
    }
    wool.count=heads.count=sheepCount;feet.count=sheepCount*4;birdBodies.count=birdCount;birdWings.count=birdCount*2;
    butterflyWings.count=butterflyCount*2;fireflies.count=flyCount;
    for(const batch of batches)if(batch.count)batch.instanceMatrix.needsUpdate=true;
    if(birdCount)for(const batch of [birdBodies,birdWings])batch.geometry.attributes.lifeVisibility.needsUpdate=true;
    Object.assign(stats,{sheep:sheepCount,birds:birdCount,butterflies:butterflyCount,fireflies:flyCount,
      instances:sheepCount+birdCount+butterflyCount+flyCount,updates:stats.updates+1});
  }
  function dispose(){for(const batch of batches){batch.geometry.dispose();batch.dispose();}for(const material of ownedMaterials)material.dispose();root.removeFromParent();}
  return {root,stats,update,dispose};
}
