import * as THREE from 'three';
import {createMilitaryAsset,MILITARY_KINDS,MILITARY_ART} from './military-assets.js';
import {createMilitaryPalette,militaryColors} from './military-palette.js';
import {applySceneStyle} from './scene-style.js';

const FRAMES=48,CLIPS=3,PAINT=['body','light','dark','roof','accent','trim'];
const finitePoint=p=>p&&['x','y','z'].every(key=>Number.isFinite(p[key]));
const matrix=new THREE.Matrix4(),rotation=new THREE.Quaternion(),scale=new THREE.Vector3(),up=new THREE.Vector3(0,1,0);

/** A distant silhouette still has an animated weapon/rotor. It costs a fraction
 * of a close rig's vertices; it never becomes a differently colored marker. */
function silhouette(parent,kind,palette){
  const root=new THREE.Group(),body=new THREE.Group();root.add(body);parent.add(root);
  const box=new THREE.BoxGeometry(1,1,1),cylinder=new THREE.CylinderGeometry(1,1,1,6),geometries=[box,cylinder];
  function part(x,y,z,w,h,d,role,geometry=box){const mesh=new THREE.Mesh(geometry,palette[role]);mesh.position.set(x,y,z);mesh.scale.set(w,h,d);body.add(mesh);return mesh;}
  let rotor;
  if(kind==='soldier'){
    part(0,.39,0,.27,.29,.18,'body');part(0,.62,.012,.19,.17,.18,'skin');part(0,.72,0,.125,.07,.12,'body',cylinder);
    for(const x of [-.07,.07])part(x,.14,0,.08,.28,.12,'dark');part(-.13,.43,.24,.06,.07,.39,'graphite');
  }else if(kind==='tank'){
    for(const x of [-.74,.74])part(x,.30,0,.43,.54,2.72,'rubber');
    part(0,.69,0,1.78,.47,2.50,'body');part(0,1.05,-.14,1.13,.46,1.21,'roof');part(0,1.12,1.02,.16,.16,1.28,'dark');
    part(0,1.12,1.65,.22,.21,.20,'steel');
  }else if(kind==='artillery'){
    for(const x of [-.60,.60]){const wheel=part(x,.33,-.1,.30,.18,.30,'rubber',cylinder);wheel.rotation.z=Math.PI/2;part(x*.6,.14,-.85,.13,.19,1.45,'dark');}
    part(0,.65,0,.96,.50,.22,'body');const gun=part(0,.90,.73,.15,.15,1.92,'dark');gun.rotation.x=-.18;
  }else{
    part(0,.73,.1,.89,.86,1.60,'body');part(0,.83,.84,.72,.54,.55,'glass');part(0,.80,-1.42,.20,.19,1.65,'dark');
    part(0,1.1,-2.15,.13,.7,.55,'body');part(0,.56,-.12,2.07,.12,.34,'body');
    for(const x of [-.52,.52])part(x,.10,0,.09,.13,1.95,'graphite');
    rotor=part(0,1.42,-.1,4.4,.04,.14,'graphite');
  }
  const muzzle=new THREE.Object3D();muzzle.position.set(0,.5,1);body.add(muzzle);
  return {root,muzzle,pose({time=0,attack=0,moving=0}={}){
    body.position.z=attack>0?-.08*Math.sin(Math.PI*attack):0;
    body.position.y=kind==='helicopter'?Math.sin(time*Math.PI*2)*.035:Math.abs(Math.sin(time*Math.PI*2))*.018*moving;
    if(rotor)rotor.rotation.y=time*Math.PI*6;
  },dispose(){geometries.forEach(g=>g.dispose());root.removeFromParent();}};
}

/** Compile only articulated transforms, not per-vertex animation. Every unit
 * of a kind shares this small texture. No Object3D skeletons are posed per frame. */
export function compileMilitaryRig(kind,{low=false,frames=FRAMES}={}){
  if(!MILITARY_KINDS.includes(kind))throw new TypeError('Unknown unit kind');
  if(!Number.isSafeInteger(frames)||frames<8||frames>120)throw new RangeError('Animation clips require 8–120 frames');
  const palette=createMilitaryPalette('teal'),parent=new THREE.Group();
  const art=low?silhouette(parent,kind,palette.materials):createMilitaryAsset(parent,{kind,palette:palette.materials});
  const nodes=[],meshes=[];art.root.traverse(node=>{nodes.push(node);if(node.isMesh)meshes.push(node);});
  const reset=()=>{art.pose({time:0,moving:0,attack:0,aimYaw:0,elevation:0});art.root.updateMatrixWorld(true);};reset();
  const baseline=nodes.map(node=>node.matrix.clone()),animated=new Set();
  for(const pose of [{time:.19,moving:1,attack:0},{time:.63,moving:1,attack:0},{time:.13,attack:.18},{time:.25,attack:.3},{time:.31,attack:.55}]){
    art.pose({moving:0,attack:0,aimYaw:0,elevation:0,...pose});art.root.updateMatrixWorld(true);
    nodes.forEach((node,i)=>{if(node!==art.root&&node.matrix.elements.some((v,j)=>Math.abs(v-baseline[i].elements[j])>1e-7))animated.add(node);});
  }
  reset();const bones=[art.root,...animated],indices=new Map(bones.map((node,i)=>[node,i]));
  const positions=[],normals=[],colors=[],paints=[],boneIds=[],inverse=new THREE.Matrix4(),local=new THREE.Matrix4();
  for(const mesh of meshes){
    let bone=mesh;while(!indices.has(bone))bone=bone.parent;
    inverse.copy(bone.matrixWorld).invert();local.multiplyMatrices(inverse,mesh.matrixWorld);
    const geometry=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();geometry.applyMatrix4(local);
    const p=geometry.attributes.position,n=geometry.attributes.normal;let group=0;
    for(let i=0;i<p.count;i++){
      while(group<geometry.groups.length-1&&i>=geometry.groups[group].start+geometry.groups[group].count)group++;
      const material=Array.isArray(mesh.material)?mesh.material[geometry.groups[group]?.materialIndex??0]:mesh.material;
      const paint=PAINT.findIndex(role=>palette.materials[role]===material);
      positions.push(p.getX(i),p.getY(i),p.getZ(i));normals.push(n.getX(i),n.getY(i),n.getZ(i));
      colors.push(material.color.r,material.color.g,material.color.b);paints.push(paint);boneIds.push(indices.get(bone));
    }
    geometry.dispose();
  }
  const geometry=new THREE.BufferGeometry();
  for(const [name,data,size]of [['position',positions,3],['normal',normals,3],['color',colors,3],['militaryPaint',paints,1],['militaryBone',boneIds,1]])geometry.setAttribute(name,new THREE.Float32BufferAttribute(data,size));
  const width=bones.length*4,height=frames*CLIPS,data=new Float32Array(width*height*4),bounds=new THREE.Box3(),point=new THREE.Vector3();
  for(let clip=0;clip<CLIPS;clip++)for(let frame=0;frame<frames;frame++){
    const t=frame/(frames-1);art.pose({time:t,moving:clip===1?1:0,attack:clip===2?t:0,aimYaw:0,elevation:0});art.root.updateMatrixWorld(true);
    for(let bone=0;bone<bones.length;bone++)bones[bone].matrixWorld.toArray(data,((clip*frames+frame)*bones.length+bone)*16);
    // Include animated bounds, not only the neutral figure (rotors and recoil).
    for(let i=0;i<positions.length/3;i++){
      point.fromArray(positions,i*3).applyMatrix4(bones[boneIds[i]].matrixWorld);bounds.expandByPoint(point);
    }
  }
  art.pose({time:.18,moving:0,attack:.18,aimYaw:0,elevation:0});art.root.updateMatrixWorld(true);
  const muzzle=art.muzzle.getWorldPosition(new THREE.Vector3());
  const texture=new THREE.DataTexture(data,width,height,THREE.RGBAFormat,THREE.FloatType);texture.needsUpdate=true;texture.magFilter=texture.minFilter=THREE.NearestFilter;texture.generateMipmaps=false;
  geometry.boundingBox=bounds;geometry.boundingSphere=bounds.getBoundingSphere(new THREE.Sphere());
  art.dispose();palette.dispose();
  let disposed=false;
  return {geometry,texture,muzzle,bones:bones.length,frames,width,height,triangles:positions.length/9,bounds,
    dispose(){if(disposed)return;disposed=true;geometry.dispose();texture.dispose();}};
}

function animateMaterial(material,rig,time,duration,{depth=false}={}){
  const previous=material.onBeforeCompile;
  material.onBeforeCompile=(shader,renderer)=>{
    previous.call(material,shader,renderer);Object.assign(shader.uniforms,{militaryTime:time,militaryClips:{value:rig.texture}});
    shader.vertexShader=`attribute float militaryBone; attribute vec3 militaryState;
      uniform float militaryTime; uniform sampler2D militaryClips; mat4 militaryRig;
      ${depth?'':'attribute float militaryPaint; attribute vec3 militaryBody; attribute vec3 militaryLight; attribute vec3 militaryDark;'}
      mat4 militaryFrame(float row){float x=militaryBone*4.0;
        return mat4(texture2D(militaryClips,vec2((x+.5)/${rig.width}.0,(row+.5)/${rig.height}.0)),
          texture2D(militaryClips,vec2((x+1.5)/${rig.width}.0,(row+.5)/${rig.height}.0)),
          texture2D(militaryClips,vec2((x+2.5)/${rig.width}.0,(row+.5)/${rig.height}.0)),
          texture2D(militaryClips,vec2((x+3.5)/${rig.width}.0,(row+.5)/${rig.height}.0)));}
      mat4 militaryPose(){float elapsed=militaryTime-militaryState.z;
        bool firing=elapsed>=0.0&&elapsed<${duration};
        float clip=firing?2.0:(militaryState.x>.05?1.0:0.0);
        float f=(firing?elapsed/${duration}:fract(militaryTime+militaryState.y))*${rig.frames-1}.0;
        float row=clip*${rig.frames}.0+floor(f);float next=min(row+1.0,(clip+1.0)*${rig.frames}.0-1.0);
        return militaryFrame(row)*(1.0-fract(f))+militaryFrame(next)*fract(f);}
      \n`+shader.vertexShader;
    if(!depth)shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>',`#include <beginnormal_vertex>
      militaryRig=militaryPose();objectNormal=mat3(militaryRig)*objectNormal;`);
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      ${depth?'militaryRig=militaryPose();':''}transformed=(militaryRig*vec4(transformed,1.0)).xyz;`);
    if(!depth)shader.vertexShader=shader.vertexShader.replace('#include <color_vertex>',`#include <color_vertex>
      if(militaryPaint>-.5){
        vColor.rgb=militaryPaint<.5?militaryBody:militaryPaint<1.5?militaryLight:militaryPaint<2.5?militaryDark:
          militaryPaint<3.5?mix(militaryBody,militaryDark,.30):militaryPaint<4.5?mix(militaryBody,militaryLight,.22):vec3(.83,.85,.77);
      }`);
  };
  material.customProgramCacheKey=()=>`military-rig-v1:${rig.width}:${rig.height}:${duration}:${depth}`;
  return material;
}

/** Two instanced draws per kind at most. Commands touch instance buffers; ordinary
 * animation advances one uniform. LOD/culling repacks at most six times a second. */
export function createMilitaryBatch(parent,{capacity=2048}={}){
  if(!Number.isSafeInteger(capacity)||capacity<1||capacity>8192)throw new RangeError('Military capacity must be 1–8192');
  const root=new THREE.Group();root.name='military-assets';parent.add(root);
  const time={value:0},batches=[],byKind=new Map(),units=[],lookup=new Map(),colorCache=new Map();
  let disposed=false,dirty=true,lodAt=-Infinity,poseWrites=0,uploads=0,lastCamera=null,lastHeight=0,lastDetail=false;
  const worldMatrix=new Float64Array(16),worldPoint=new THREE.Vector3(),viewMatrix=new Float64Array(16),projectionMatrix=new Float64Array(16),clipMatrix=new THREE.Matrix4(),frustum=new THREE.Frustum(),sphere=new THREE.Sphere();
  for(const kind of MILITARY_KINDS){
    const pair=[];
    for(const low of [false,true]){
      const rig=compileMilitaryRig(kind,{low}),geometry=rig.geometry;
      for(const name of ['militaryState','militaryBody','militaryLight','militaryDark'])geometry.setAttribute(name,new THREE.InstancedBufferAttribute(new Float32Array(capacity*3),3).setUsage(THREE.DynamicDrawUsage));
      const material=animateMaterial(applySceneStyle(new THREE.MeshStandardMaterial({name:`${kind}-${low?'far':'near'}`,vertexColors:true,roughness:1,flatShading:true})),rig,time,MILITARY_ART[kind].attackDuration);
      const mesh=new THREE.InstancedMesh(geometry,material,capacity);mesh.name=material.name;mesh.count=0;mesh.frustumCulled=false;mesh.castShadow=!low;mesh.receiveShadow=true;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      const depth=animateMaterial(new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking}),rig,time,MILITARY_ART[kind].attackDuration,{depth:true});mesh.customDepthMaterial=depth;
      root.add(mesh);const batch={kind,low,rig,mesh,depth,count:0};batches.push(batch);pair.push(batch);
    }
    byKind.set(kind,pair);
  }
  function shades(team){const key=typeof team==='string'?team:JSON.stringify(team??'teal');if(!colorCache.has(key)){const colors=militaryColors(team);if(colorCache.size>=64)colorCache.delete(colorCache.keys().next().value);colorCache.set(key,colors);}return colorCache.get(key);}
  function setUnits(values){
    if(disposed)return; if(!Array.isArray(values)||values.length>capacity)throw new RangeError('Military unit capacity exceeded');
    const ids=new Set();
    for(const unit of values){if(ids.has(unit.id)||unit.id==null||!MILITARY_KINDS.includes(unit.kind)||!finitePoint(unit)||!Number.isFinite(unit.heading??0)||!Number.isFinite(unit.scale??1)||(unit.scale??1)<=0)throw new TypeError('Invalid military unit');ids.add(unit.id);shades(unit.team);}
    units.length=0;lookup.clear();
    for(const unit of values){const record={...unit,heading:unit.heading??0,scale:unit.scale??1,moving:unit.moving?1:0,phase:Number.isFinite(unit.phase)?unit.phase:0,attackStart:-100,batch:null,slot:-1,colors:shades(unit.team)};units.push(record);lookup.set(record.id,record);}dirty=true;
  }
  function setPose(id,pose){
    const unit=lookup.get(id);if(disposed||!unit)return false;
    for(const key of ['x','y','z','heading','scale'])if(pose[key]!==undefined&&(!Number.isFinite(pose[key])||key==='scale'&&pose[key]<=0))return false;
    for(const key of ['x','y','z','heading','scale','moving'])if(pose[key]!==undefined)unit[key]=key==='moving'?Number(!!pose[key]):pose[key];dirty=true;return true;
  }
  function setColor(id,team){const unit=lookup.get(id);if(disposed||!unit)return false;unit.colors=shades(team);unit.team=team;dirty=true;return true;}
  function attack(id){
    const unit=lookup.get(id);if(disposed||!unit)return null;unit.attackStart=time.value;
    if(unit.batch){const attr=unit.batch.mesh.geometry.attributes.militaryState;attr.setZ(unit.slot,time.value);attr.needsUpdate=true;uploads++;}
    return {duration:MILITARY_ART[unit.kind].attackDuration,fireDelay:MILITARY_ART[unit.kind].attackDuration*.18,projectile:MILITARY_ART[unit.kind].projectile};
  }
  function muzzleAt(id,target=new THREE.Vector3()){
    const unit=lookup.get(id);if(!unit)return null;root.updateWorldMatrix(true,false);
    rotation.setFromAxisAngle(up,unit.heading);return target.copy(byKind.get(unit.kind)[0].rig.muzzle).multiplyScalar(unit.scale).applyQuaternion(rotation).add(unit).applyMatrix4(root.matrixWorld);
  }
  function update(elapsed,{camera,viewportHeight=720,forceDetail=false,visibilityTime=elapsed}={}){
    if(disposed||!Number.isFinite(elapsed)||elapsed<0)return;time.value=elapsed;root.updateWorldMatrix(true,false);
    if(!Number.isFinite(visibilityTime))visibilityTime=elapsed;
    if(!dirty&&visibilityTime-lodAt<1/6)return;
    lodAt=visibilityTime;
    const changed=dirty||root.matrixWorld.elements.some((v,i)=>v!==worldMatrix[i])||camera!==lastCamera||viewportHeight!==lastHeight||forceDetail!==lastDetail||camera&&(camera.matrixWorld.elements.some((v,i)=>v!==viewMatrix[i])||camera.projectionMatrix.elements.some((v,i)=>v!==projectionMatrix[i]));
    if(!changed)return;worldMatrix.set(root.matrixWorld.elements);dirty=false;lastCamera=camera;lastHeight=viewportHeight;lastDetail=forceDetail;
    if(camera){viewMatrix.set(camera.matrixWorld.elements);projectionMatrix.set(camera.projectionMatrix.elements);frustum.setFromProjectionMatrix(clipMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));}
    for(const batch of batches)batch.count=0;
    for(const unit of units){
      let pixels=Infinity,visible=true;
      if(camera){
        const h=unit.kind==='soldier'?.78:unit.kind==='helicopter'?3:1.7;
        worldPoint.set(unit.x,unit.y,unit.z).applyMatrix4(root.matrixWorld);const distance=camera.position.distanceTo(worldPoint);
        pixels=camera.isOrthographicCamera?h*unit.scale*viewportHeight*camera.zoom/(camera.top-camera.bottom):h*unit.scale*viewportHeight/(2*Math.tan(camera.fov*Math.PI/360)*Math.max(1,distance));
        sphere.center.set(unit.x,unit.y+h*.5,unit.z);sphere.radius=(unit.kind==='helicopter'?3:unit.kind==='soldier'?.55:2.4)*unit.scale;sphere.applyMatrix4(root.matrixWorld);
        visible=distance<(camera.far??Infinity)&&pixels>1.0&&frustum.intersectsSphere(sphere);
      }
      if(!visible){unit.batch=null;unit.slot=-1;continue;}
      const batch=byKind.get(unit.kind)[!forceDetail&&pixels<38?1:0],i=batch.count++,mesh=batch.mesh;unit.batch=batch;unit.slot=i;
      rotation.setFromAxisAngle(up,unit.heading);scale.setScalar(unit.scale);matrix.compose(unit,rotation,scale);mesh.setMatrixAt(i,matrix);poseWrites++;
      mesh.geometry.attributes.militaryState.setXYZ(i,unit.moving,unit.phase,unit.attackStart);
      for(const [role,name]of [['body','militaryBody'],['light','militaryLight'],['dark','militaryDark']]){const color=unit.colors[role];mesh.geometry.attributes[name].setXYZ(i,color.r,color.g,color.b);}
    }
    for(const batch of batches){batch.mesh.count=batch.count;batch.mesh.visible=batch.count>0;if(!batch.count)continue;batch.mesh.instanceMatrix.needsUpdate=true;for(const name of ['militaryState','militaryBody','militaryLight','militaryDark'])batch.mesh.geometry.attributes[name].needsUpdate=true;uploads++;}
  }
  function stats(){return {units:units.length,visible:batches.reduce((n,b)=>n+b.count,0),near:batches.filter(b=>!b.low).reduce((n,b)=>n+b.count,0),far:batches.filter(b=>b.low).reduce((n,b)=>n+b.count,0),drawCalls:batches.filter(b=>b.count).length,triangles:batches.reduce((n,b)=>n+b.count*b.rig.triangles,0),poseWrites,uploads,capacity,
    animationBytes:batches.reduce((n,b)=>n+b.rig.texture.image.data.byteLength,0),disposed};}
  return {root,setUnits,setPose,setColor,attack,muzzleAt,update,get stats(){return stats();},
    dispose(){if(disposed)return;disposed=true;root.removeFromParent();for(const batch of batches){batch.rig.dispose();batch.mesh.material.dispose();batch.depth.dispose();batch.mesh.dispose();}lookup.clear();units.length=0;colorCache.clear();}};
}
