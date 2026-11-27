import * as THREE from 'three';
import {dayCycleAt} from './day-cycle.js';

// Shared uniforms keep every streamed cell and instanced carriage in sync.
// Animation time can pause while the independent day/night calendar continues.
export const styleUniforms={night:{value:0},time:{value:0}};
const styledMaterials=new WeakSet();

/** Surface-bound paint grain and water shimmer; no textures, render targets,
 * lights per building, or per-frame material walks. Preserve earlier shader
 * hooks (streamed reveals, map sizing, spherical shells) when composing. */
export function applySceneStyle(material,{kind=material.userData.sceneStyle??'asset',role='owner'}={}){
  if(styledMaterials.has(material))return material;
  styledMaterials.add(material);material.userData.sceneStyle=kind;
  const before=material.onBeforeCompile,cache=material.customProgramCacheKey.bind(material);
  const baseKey=cache(),basic=material.isMeshBasicMaterial;
  material.onBeforeCompile=(shader,renderer)=>{
    before.call(material,shader,renderer);
    shader.uniforms.worldNight=styleUniforms.night;shader.uniforms.worldTime=styleUniforms.time;
    shader.vertexShader='varying vec3 paintedPosition;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>',`#include <project_vertex>
      vec4 paintPosition = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        paintPosition = instanceMatrix * paintPosition;
      #endif
      paintedPosition = (modelMatrix * paintPosition).xyz;`);
    shader.fragmentShader=`uniform float worldNight; uniform float worldTime;
      varying vec3 paintedPosition;\n`+shader.fragmentShader;
    let finish='';
    if(kind==='map-symbol'){
      finish=role==='ink'?'outgoingLight = mix(outgoingLight, vec3(0.78, 0.49, 0.19), worldNight);'
        :role==='paper'?'outgoingLight = mix(outgoingLight, vec3(0.028, 0.073, 0.12), worldNight);'
        :'outgoingLight = mix(outgoingLight, outgoingLight * 0.88 + vec3(0.12, 0.075, 0.026), worldNight);';
    }else if(kind==='window'||kind==='lamp'){
      // A few darker panes keep the towns from becoming uniform light grids.
      finish=`float paneVariation = 0.72 + 0.28 * sin(dot(paintedPosition, vec3(1.7, 0.1, 2.3)));
        outgoingLight += vec3(1.5, 0.68, 0.16) * worldNight * paneVariation;`;
    }else if(kind==='water'||kind==='surf'){
      finish=`float rippleFootprint = length(fwidth(paintedPosition));
        float rippleVisibility = 1.0 - smoothstep(0.8, 4.0, rippleFootprint);
        float drift = sin(dot(paintedPosition, vec3(0.13, 0.05, -0.17)))
          + 0.45 * sin(dot(paintedPosition, vec3(-0.037, 0.061, 0.049)));
        float ripple = sin(dot(paintedPosition, vec3(0.72, 0.31, 1.18)) - worldTime * 0.65 + drift * 0.75);
        float brokenCrest = sin(dot(paintedPosition, vec3(-0.12, 0.047, 0.058)) - worldTime * 0.09);
        float crest = smoothstep(0.95, 0.998, ripple) * smoothstep(0.10, 0.75, brokenCrest) * rippleVisibility;
        outgoingLight *= 1.0 + ripple * 0.015 * rippleVisibility;
        outgoingLight += vec3(0.018, 0.035, 0.033) * crest * (1.0 - worldNight * 0.65);`;
      if(kind==='surf')finish+=`float wash = sin(dot(paintedPosition, vec3(0.19, 0.13, 0.24)) - worldTime * 0.65 + drift);
        outgoingLight *= 0.91 + 0.09 * wash;`;
      if(basic)finish+='outgoingLight = mix(outgoingLight, outgoingLight * vec3(0.12, 0.25, 0.40) + vec3(0.006, 0.014, 0.027), worldNight);';
    }else{
      const amount=kind==='terrain'?'0.065':'0.032';
      finish=`float paintFootprint = length(fwidth(paintedPosition));
        float grainVisibility = 1.0 - smoothstep(0.06, 0.50, paintFootprint);
        float grain = fract(sin(dot(floor(paintedPosition * 19.0), vec3(12.9898, 78.233, 45.164))) * 43758.5453) - 0.5;
        outgoingLight *= 1.0 + grain * ${amount} * grainVisibility;`;
      if(kind==='terrain')finish+=`float meadowMottle = sin(dot(paintedPosition, vec3(0.21, 0.13, 0.33))) * sin(dot(paintedPosition, vec3(-0.43, 0.27, 0.17)));
        outgoingLight *= 1.0 + meadowMottle * 0.024;`;
      if(basic||kind==='map')finish+='outgoingLight = mix(outgoingLight, outgoingLight * vec3(0.18, 0.29, 0.47) + vec3(0.008, 0.013, 0.023), worldNight);';
    }
    if(!basic&&!['map','map-symbol','window','lamp'].includes(kind))
      finish+='outgoingLight = mix(outgoingLight, outgoingLight * vec3(0.66, 0.85, 1.24) + vec3(0.002, 0.005, 0.013), worldNight);';
    shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',finish+'\n#include <opaque_fragment>');
  };
  material.customProgramCacheKey=()=>`${baseKey}|painted-world-v2:${kind}:${role}:${basic?'basic':'lit'}`;
  return material;
}

export function createDaylight({scene,mapScene,sky,sun,fill,renderer}){
  const cycle=dayCycleAt(0);
  const dayBackground=new THREE.Color(0xb8d5d9),nightBackground=new THREE.Color(0x081626);
  const daySky=new THREE.Color(0xc5e6ef),nightSky=new THREE.Color(0x6786b7);
  const dayGround=new THREE.Color(0x6d806c),nightGround=new THREE.Color(0x243c5e);
  const daySun=new THREE.Color(0xffe2ac),nightSun=new THREE.Color(0xb7d6ff);
  const dayFill=new THREE.Color(0xa1c7e5),nightFill=new THREE.Color(0x637eac);
  const background=dayBackground.clone();scene.background=mapScene.background=background;
  function update(dt,time,elapsedSeconds=time){
    const night=dayCycleAt(elapsedSeconds,cycle).night;
    styleUniforms.night.value=night;styleUniforms.time.value=time;
    background.copy(dayBackground).lerp(nightBackground,night);
    sky.color.copy(daySky).lerp(nightSky,night);sky.groundColor.copy(dayGround).lerp(nightGround,night);
    sky.intensity=THREE.MathUtils.lerp(1.55,.70,night);
    sun.color.copy(daySun).lerp(nightSun,night);sun.intensity=THREE.MathUtils.lerp(3.0,.90,night);
    fill.color.copy(dayFill).lerp(nightFill,night);fill.intensity=THREE.MathUtils.lerp(.54,.30,night);
    renderer.toneMappingExposure=THREE.MathUtils.lerp(1.03,.90,night);
    return night;
  }
  update(0,0);
  return{update,get night(){return cycle.night;},get phase(){return cycle.phase;},get clockTime(){return cycle.clockTime;}};
}
