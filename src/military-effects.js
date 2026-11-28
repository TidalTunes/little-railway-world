import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {C} from './palette.js';
import {applySceneStyle} from './scene-style.js';

const DURATIONS=Object.freeze({tracer:.3,shell:.7,arc:1.4,rocket:.8});
const SURFACES=new Set(['grass','sand','water','stone']);
const CONTACTS=new Set(['footstep','track','rotor']);
const TRAIL_STEP=.075,TAU=Math.PI*2;
const noise=n=>{const value=Math.sin(n*127.1+311.7)*43758.5453;return value-Math.floor(value);};
const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
const coordinate=value=>Number.isFinite(value)&&Math.abs(value)<=1e7;
const pointValid=point=>point&&coordinate(point.x)&&coordinate(point.y)&&coordinate(point.z);
function capacity(value,name,maximum){
  if(!Number.isSafeInteger(value)||value<0||value>maximum)throw new RangeError(`${name} must be an integer from 0 to ${maximum}`);
  return value;
}
// Three levels cover every allowed pool size (at most 16,384 slots).
// Lowest-free selection preserves stable instance ordering after expiration;
// the age list independently preserves oldest-first saturation recycling.
const firstBit=bits=>31-Math.clz32(bits&-bits);
function resetPool(target){
  target.active=0;target.head=target.tail=-1;target.freeTop=0;target.nextExpiry=Infinity;
  target.freeGroups.fill(0);
  for(let word=0;word<target.freeWords.length;word++){
    const remaining=Math.min(32,target.slots.length-word*32);
    target.freeWords[word]=remaining===32?0xffffffff:2**remaining-1;
    target.freeGroups[word>>>5]|=1<<(word&31);target.freeTop|=1<<(word>>>5);
  }
  for(const slot of target.slots){slot.active=false;slot.previous=slot.next=-1;}
}
function pool(size){
  const words=Math.ceil(size/32);
  const target={slots:Array.from({length:size},(_,index)=>({index,active:false,serial:0,previous:-1,next:-1})),recycled:0,
    freeWords:new Uint32Array(words),freeGroups:new Uint32Array(Math.ceil(words/32))};
  resetPool(target);return target;
}
function unlink(target,slot){
  if(slot.previous<0)target.head=slot.next;else target.slots[slot.previous].next=slot.next;
  if(slot.next<0)target.tail=slot.previous;else target.slots[slot.next].previous=slot.previous;
  slot.previous=slot.next=-1;
}
function release(target,slot){
  unlink(target,slot);slot.active=false;target.active--;
  const word=slot.index>>>5,group=word>>>5;
  target.freeWords[word]|=1<<(slot.index&31);target.freeGroups[group]|=1<<(word&31);target.freeTop|=1<<group;
}
function projectileGeometry(rocket){
  const body=new THREE.CylinderGeometry(.075,.075,.32,6).rotateX(Math.PI/2);
  const nose=new THREE.ConeGeometry(.075,.16,6).rotateX(Math.PI/2).translate(0,0,.24);
  const parts=[body,nose];
  if(rocket){
    parts.push(new THREE.BoxGeometry(.27,.016,.16).translate(0,0,-.12));
    parts.push(new THREE.BoxGeometry(.016,.27,.16).translate(0,0,-.12));
  }
  const geometry=mergeGeometries(parts);for(const part of parts)part.dispose();return geometry;
}
function opacityMaterial(basic=false){
  const material=basic?new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,depthWrite:false,toneMapped:false}):
    new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,depthWrite:false,roughness:1,flatShading:true});
  material.onBeforeCompile=shader=>{
    shader.vertexShader='attribute float effectOpacity; varying float vEffectOpacity;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvEffectOpacity = effectOpacity;');
    shader.fragmentShader='varying float vEffectOpacity;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.a *= vEffectOpacity;');
  };
  material.customProgramCacheKey=()=>`military-effect-opacity-v1:${basic?'basic':'lit'}`;
  applySceneStyle(material);return material;
}

/** Cosmetic only. Positions are world coordinates with an identity parent.
 * fire/contact enqueue into fixed pools; update(0) can flush a whole burst.
 * No scene queries, collisions, damage, timers, listeners, or animation loop.
 * Recycling a projectile cancels it without manufacturing an impact. */
export function createMilitaryEffects(parent,{maxProjectiles=48,maxParticles=256,maxMarks=96}={}){
  if(!parent?.isObject3D)throw new TypeError('Effects require a Three.js parent');
  capacity(maxProjectiles,'maxProjectiles',2048);capacity(maxParticles,'maxParticles',16384);capacity(maxMarks,'maxMarks',8192);
  const projectiles=pool(maxProjectiles),particles=pool(maxParticles),marks=pool(maxMarks);
  const transientPools=[particles,marks],allPools=[projectiles,particles,marks];
  const root=new THREE.Group();root.name='military-effects';parent.add(root);
  let time=0,serial=0,disposed=false,dirty=false,fired=0,impacts=0,contacts=0,rejected=0,lastImpact=null;
  const position=new THREE.Vector3(),direction=new THREE.Vector3(),scale=new THREE.Vector3(),rotation=new THREE.Quaternion(),matrix=new THREE.Matrix4();
  const forward=new THREE.Vector3(0,0,1),up=new THREE.Vector3(0,1,0),color=new THREE.Color(),inputColor=new THREE.Color();
  function batch(name,geometry,size,basic=false){
    const opacity=new THREE.InstancedBufferAttribute(new Float32Array(size),1).setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('effectOpacity',opacity);
    const material=opacityMaterial(basic),mesh=new THREE.InstancedMesh(geometry,material,size);
    mesh.name=`military-${name}`;mesh.count=0;mesh.visible=false;mesh.frustumCulled=false;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.castShadow=false;mesh.receiveShadow=false;
    if(size){mesh.setColorAt(0,C.white);mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);}
    root.add(mesh);return {mesh,opacity,count:0};
  }
  const shellBatch=batch('shells',projectileGeometry(false),maxProjectiles);
  const rocketBatch=batch('rockets',projectileGeometry(true),maxProjectiles);
  const lightBatch=batch('flashes',new THREE.BoxGeometry(1,1,1),maxProjectiles+maxParticles,true);
  const particleBatch=batch('particles',new THREE.IcosahedronGeometry(1,0),maxParticles);
  const markBatch=batch('marks',new THREE.CircleGeometry(1,8).rotateX(-Math.PI/2),maxMarks);
  markBatch.mesh.material.polygonOffset=true;markBatch.mesh.material.polygonOffsetFactor=-1;markBatch.mesh.material.polygonOffsetUnits=-1;
  const batches=[shellBatch,rocketBatch,lightBatch,particleBatch,markBatch];
  function acquire(target){
    if(!target.slots.length)return null;
    let slot;
    if(target.freeTop){
      const group=firstBit(target.freeTop),word=group*32+firstBit(target.freeGroups[group]),index=word*32+firstBit(target.freeWords[word]);
      target.freeWords[word]&=~(1<<(index&31));
      if(!target.freeWords[word]){
        target.freeGroups[group]&=~(1<<(word&31));
        if(!target.freeGroups[group])target.freeTop&=~(1<<group);
      }
      slot=target.slots[index];target.active++;
    }else{slot=target.slots[target.head];unlink(target,slot);target.recycled++;}
    slot.previous=target.tail;slot.next=-1;
    if(target.tail<0)target.head=slot.index;else target.slots[target.tail].next=slot.index;
    target.tail=slot.index;slot.active=true;slot.serial=++serial;dirty=true;return slot;
  }
  function reject(code){rejected++;return {ok:false,code};}
  function readColor(value,fallback){
    if(value===undefined){inputColor.copy(fallback);return true;}
    if(value?.isColor){
      if(![value.r,value.g,value.b].every(channel=>Number.isFinite(channel)&&channel>=0&&channel<=16))return false;
      inputColor.copy(value);return true;
    }
    if(Number.isInteger(value)&&value>=0&&value<=0xffffff){inputColor.setHex(value);return true;}
    if(typeof value==='string'&&(/^#(?:[a-f\d]{3}|[a-f\d]{6})$/i.test(value)||Object.hasOwn(THREE.Color.NAMES,value.toLowerCase()))){inputColor.set(value.toLowerCase());return true;}
    return false;
  }
  function particle({born=time,life=.5,x,y,z,vx=0,vy=0,vz=0,gravity=0,size=.1,aspect=1,heading=0,spin=0,alpha=.5,tint=C.soilLight,mode='dust'}){
    const slot=acquire(particles);if(!slot)return;
    Object.assign(slot,{born,life,x,y,z,vx,vy,vz,gravity,size,aspect,heading,spin,alpha,mode,r:tint.r,g:tint.g,b:tint.b});
    particles.nextExpiry=Math.min(particles.nextExpiry,born+life);
  }
  function mark({born=time,life=3,x,y,z,sx=.2,sz=.2,heading=0,alpha=.2,tint=C.soil,expand=0}){
    const slot=acquire(marks);if(!slot)return;
    Object.assign(slot,{born,life,x,y:y+.018,z,sx,sz,heading,alpha,expand,r:tint.r,g:tint.g,b:tint.b});
    marks.nextExpiry=Math.min(marks.nextExpiry,born+life);
  }
  function pose(shot,at){
    const u=clamp((at-shot.born)/shot.duration,0,1);
    position.set(shot.fx+(shot.tx-shot.fx)*u,shot.fy+(shot.ty-shot.fy)*u+4*shot.height*u*(1-u),shot.fz+(shot.tz-shot.fz)*u);
    direction.set(shot.tx-shot.fx,shot.ty-shot.fy+4*shot.height*(1-2*u),shot.tz-shot.fz);
    if(direction.lengthSq()<1e-16)direction.copy(forward);else direction.normalize();
  }
  function fire(input){
    if(disposed)return {ok:false,code:'disposed'};
    if(!input||!Object.hasOwn(DURATIONS,input.kind)||!pointValid(input.from)||!pointValid(input.to))return reject('invalid-projectile');
    const surface=input.surface??'grass';if(!SURFACES.has(surface)||!readColor(input.color,input.kind==='tracer'?C.gold:C.metal))return reject('invalid-appearance');
    const shot=acquire(projectiles);if(!shot)return {ok:false,code:'capacity-zero'};
    const {from,to,kind}=input,distance=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);
    Object.assign(shot,{kind,surface,born:time,duration:DURATIONS[kind],fx:from.x,fy:from.y,fz:from.z,tx:to.x,ty:to.y,tz:to.z,
      height:kind==='arc'?clamp(distance*.23,1.5,9):0,nextTrail:1,r:inputColor.r,g:inputColor.g,b:inputColor.b});
    const id=shot.serial;fired++;
    const strength=kind==='tracer'?.1:.19;
    particle({x:from.x,y:from.y,z:from.z,life:.09,size:strength,aspect:1.3,tint:C.gold,alpha:.95,mode:'flash',heading:noise(id)*TAU});
    particle({x:from.x,y:from.y,z:from.z,life:.14,size:strength*.7,tint:C.white,alpha:.75,mode:'flash'});
    return {ok:true,id,duration:shot.duration};
  }
  function impact(shot){
    impacts++;lastImpact={id:shot.serial,kind:shot.kind,surface:shot.surface,x:shot.tx,y:shot.ty,z:shot.tz,time};
    const water=shot.surface==='water',stone=shot.surface==='stone',sand=shot.surface==='sand';
    const count=shot.kind==='tracer'?4:shot.kind==='arc'?12:8,force=shot.kind==='tracer'?.55:shot.kind==='arc'?1.3:1;
    const tint=water?C.foam:stone?C.rockLight:sand?C.sand:C.soilLight;
    for(let index=0;index<count;index++){
      const seed=shot.serial*31+index*7,angle=noise(seed)*TAU,speed=(.32+noise(seed+1)*.9)*force;
      particle({x:shot.tx,y:shot.ty+.035,z:shot.tz,born:time,life:water||stone?.45+noise(seed+2)*.35:.65+noise(seed+2)*.45,
        vx:Math.sin(angle)*speed,vz:Math.cos(angle)*speed,vy:(water?1.2:stone?.7:.25)*force+noise(seed+3)*.5,
        gravity:water||stone?3:0,size:(water?.045:stone?.06:.15)*( .7+noise(seed+4)*.6)*force,
        aspect:water?2.5:stone?1.3:.8,heading:angle,spin:stone?3:0,tint,alpha:water?.75:stone?.85:.42,mode:water?'splash':stone?'chip':'dust'});
    }
    if(!water)particle({x:shot.tx,y:shot.ty+.1,z:shot.tz,born:time,life:.08,size:.16*force,tint:C.gold,alpha:.6,mode:'flash'});
    mark({x:shot.tx,y:shot.ty,z:shot.tz,born:time,life:water?1:3.5,sx:.25*force,sz:.19*force,heading:noise(shot.serial+9)*TAU,
      alpha:water?.18:stone?.14:.22,tint:water?C.foam:stone?C.rockDark:C.soil,expand:water?3:.12});
    release(projectiles,shot);dirty=true;
  }
  function trail(shot){
    pose(shot,time);const seed=shot.serial*67+shot.nextTrail*13;
    particle({x:position.x,y:position.y,z:position.z,born:time,life:.42+noise(seed)*.2,size:.09+noise(seed+1)*.035,
      vx:(noise(seed+2)-.5)*.12,vy:.16,vz:(noise(seed+3)-.5)*.12,tint:C.rockLight,alpha:.3,mode:'smoke'});
    shot.nextTrail++;
  }
  function contact(input){
    if(disposed)return {ok:false,code:'disposed'};
    if(!input||!CONTACTS.has(input.kind)||!pointValid(input.position))return reject('invalid-contact');
    const heading=input.heading??0,strength=input.strength??1,surface=input.surface??'grass';
    if(!Number.isFinite(heading)||!Number.isFinite(strength)||strength<0||!SURFACES.has(surface))return reject('invalid-contact');
    if(!strength)return {ok:true,id:null};
    const id=++serial,amount=clamp(strength,0,3),{x,y,z}=input.position,water=surface==='water',stone=surface==='stone';contacts++;
    const tint=water?C.foam:stone?C.gravel:surface==='sand'?C.sand:C.soilLight;
    if(input.kind==='rotor'){
      const count=Math.ceil(8*amount),radius=1.1+amount*.5;
      for(let index=0;index<count;index++){
        const seed=id*13+index*11,angle=index/count*TAU+noise(seed)*.3;
        particle({x:x+Math.sin(angle)*radius,y:y+.04,z:z+Math.cos(angle)*radius,
          vx:Math.sin(angle)*(1+amount*.5),vz:Math.cos(angle)*(1+amount*.5),vy:.1+noise(seed+1)*.14,
          size:.12+noise(seed+2)*.15,life:.65+noise(seed+3)*.4,aspect:.55,tint,alpha:water?.2:.28,heading:angle});
      }
    }else{
      const tracked=input.kind==='track',count=tracked?3:2;
      for(let index=0;index<count;index++){
        const seed=id*17+index*5,angle=heading+(noise(seed)-.5)*2;
        particle({x,y:y+.035,z,vx:Math.sin(angle)*.2*amount,vy:.12*amount,vz:Math.cos(angle)*.2*amount,
          size:(tracked?.13:.07)*amount,life:.35+noise(seed+1)*.25,aspect:.75,tint,alpha:water?.25:.28,heading:angle});
      }
      if(!water&&!stone){
        const count=tracked?2:1;
        for(let index=0;index<count;index++){
          const side=tracked?(index?1:-1)*.23*amount:0;
          mark({x:x+Math.cos(heading)*side,y,z:z-Math.sin(heading)*side,life:tracked?3:1.5,
            sx:(tracked?.11:.055)*amount,sz:(tracked?.3:.11)*amount,heading,alpha:tracked?.18:.12,tint:surface==='sand'?C.desertRock:C.field});
        }
      }
    }
    return {ok:true,id};
  }
  function expire(){
    for(const target of transientPools)if(time>=target.nextExpiry){
      // Recycled records can leave an earlier lower bound, but never a late
      // one. Recompute only when that bound is reached, not for every event.
      target.nextExpiry=Infinity;
      for(const slot of target.slots)if(slot.active){
        const expiry=slot.born+slot.life;
        if(time>=expiry){release(target,slot);dirty=true;}
        else target.nextExpiry=Math.min(target.nextExpiry,expiry);
      }
    }
  }
  function write(target,slot,opacity){
    const index=target.count++;matrix.compose(position,rotation,scale);target.mesh.setMatrixAt(index,matrix);
    color.setRGB(slot.r,slot.g,slot.b);target.mesh.setColorAt(index,color);target.opacity.setX(index,opacity);
  }
  function draw(){
    for(const target of batches)target.count=0;
    for(const shot of projectiles.slots)if(shot.active){
      pose(shot,time);rotation.setFromUnitVectors(forward,direction);
      if(shot.kind==='tracer'){scale.set(.035,.035,.55);write(lightBatch,shot,.95);}
      else{scale.setScalar(shot.kind==='rocket'?1.45:shot.kind==='arc'?1.2:1);write(shot.kind==='rocket'?rocketBatch:shellBatch,shot,1);}
    }
    for(const slot of particles.slots)if(slot.active){
      const age=time-slot.born,u=clamp(age/slot.life,0,1),fade=(1-u)*(1-u);
      position.set(slot.x+slot.vx*age,Math.max(slot.y,slot.y+slot.vy*age-.5*slot.gravity*age*age),slot.z+slot.vz*age);
      rotation.setFromAxisAngle(up,slot.heading+slot.spin*age);
      const size=slot.size*(slot.mode==='flash'?1+u*.6:slot.mode==='chip'||slot.mode==='splash'?1-u*.25:1+u*1.8);
      scale.set(size,size*slot.aspect,size);
      write(slot.mode==='flash'?lightBatch:particleBatch,slot,slot.alpha*fade);
    }
    for(const slot of marks.slots)if(slot.active){
      const u=clamp((time-slot.born)/slot.life,0,1);position.set(slot.x,slot.y,slot.z);rotation.setFromAxisAngle(up,slot.heading);
      scale.set(slot.sx*(1+u*slot.expand),1,slot.sz*(1+u*slot.expand));write(markBatch,slot,slot.alpha*(1-u)*(1-u));
    }
    for(const target of batches){
      const {mesh,count,opacity}=target;mesh.count=count;mesh.visible=count>0;
      if(count){mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;opacity.needsUpdate=true;}
    }
    dirty=false;
  }
  function update(dt){
    if(disposed)return;
    if(Number.isFinite(dt)&&dt>0){
      const end=Number.isFinite(time+dt)?time+dt:Number.MAX_VALUE;
      // Fixed emission times, in chronological order, make pooling and poses
      // independent of frame size. Work is bounded by active shots, not dt.
      while(true){
        let next=null,at=Infinity,isTrail=false;
        for(const shot of projectiles.slots)if(shot.active){
          const impactAt=shot.born+shot.duration,trailAt=shot.kind==='rocket'&&shot.nextTrail*TRAIL_STEP<shot.duration?shot.born+shot.nextTrail*TRAIL_STEP:Infinity;
          const eventAt=Math.min(impactAt,trailAt);
          if(eventAt<=end&&(eventAt<at||eventAt===at&&shot.serial<(next?.serial??Infinity))){next=shot;at=eventAt;isTrail=trailAt<impactAt;}
        }
        if(!next)break;
        time=at;expire();if(isTrail)trail(next);else impact(next);
      }
      time=end;expire();
      for(const target of allPools)if(count(target)){dirty=true;break;}
    }
    if(dirty)draw();
  }
  function clear(){
    if(disposed)return;
    for(const target of allPools)resetPool(target);
    lastImpact=null;dirty=true;draw();
  }
  function count(target){return target.active;}
  return {fire,contact,update,clear,
    get stats(){
      const active={projectiles:count(projectiles),particles:count(particles),marks:count(marks)};let drawCalls=0;
      for(const target of batches)if(target.mesh.visible&&target.mesh.count)drawCalls++;
      return {...active,active:active.projectiles+active.particles+active.marks,capacity:{projectiles:maxProjectiles,particles:maxParticles,marks:maxMarks},
        drawCalls,batches:batches.length,fired,impacts,contacts,rejected,recycled:{projectiles:projectiles.recycled,particles:particles.recycled,marks:marks.recycled},
        time,disposed,lastImpact:lastImpact?{...lastImpact}:null};
    },
    dispose(){
      if(disposed)return;clear();disposed=true;root.removeFromParent();
      for(const {mesh}of batches){mesh.dispose();mesh.geometry.dispose();mesh.material.dispose();}
    },
  };
}
