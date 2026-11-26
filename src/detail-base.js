import * as THREE from 'three';
import {applySceneStyle} from './scene-style.js';

// The borrowed overview geometry uses deliberately exaggerated radial layers.
// Replace those heights in the shader, keeping a quiet continuous surface just
// below the streamed terrain and a narrow route underneath the real railway.
// Overview land spans rivers. Keep it below their real water surface too.
const HEIGHTS=Object.freeze({
  terrain:-1.35,contour0:-.18,contour1:-.16,snow:-.14,
  sand:-1.24,waterLight:-1.27,ocean:-1.27,
  'route-paper':.025,'route-ink':.035,
});

function baseMaterial(source,geometry,height,radius){
  const vertexColors=!!geometry.getAttribute('color');
  const material=new THREE.MeshStandardMaterial({
    name:source.name.replace(/^map-/,'detail-base-'),
    color:vertexColors?0xffffff:source.color,
    vertexColors,roughness:1,metalness:0,side:THREE.DoubleSide,
    flatShading:false,depthWrite:true,depthTest:true,
  });
  material.onBeforeCompile=shader=>{
    shader.uniforms.detailBaseHeight={value:height};
    shader.uniforms.detailBaseRadius={value:radius};
    shader.vertexShader='uniform float detailBaseHeight; uniform float detailBaseRadius;\n'+shader.vertexShader;
    // Map buffers intentionally omit normals. Supply the physical radial/up
    // normal before StandardMaterial transforms it into view space for light.
    const normal=radius>0?'normalize(position + vec3(0.0, detailBaseRadius, 0.0))':'vec3(0.0, 1.0, 0.0)';
    shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>',`
      vec3 detailBaseNormal = ${normal};
      vec3 objectNormal = detailBaseNormal;
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif
    `);
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',radius>0
      ?'vec3 transformed = detailBaseNormal * (detailBaseRadius + detailBaseHeight) - vec3(0.0, detailBaseRadius, 0.0);'
      :'vec3 transformed = vec3(position.x, detailBaseHeight, position.z);');
  };
  material.customProgramCacheKey=()=>`detail-base-${radius>0?'sphere':'plane'}-v1`;
  return applySceneStyle(material,{kind:/water|ocean/.test(source.name)?'water':'terrain'});
}

/** Immediate coarse scenery for a region whose detailed chunks are streaming.
 * All buffers belong to the overview: neither their contents nor their lifetime
 * are changed here. Dispose this layer before disposing the source map. */
export function createDetailBase(parent,staticRoot,world){
  const root=new THREE.Group();root.name='detail-base';parent.add(root);
  const materials=new Set(),radius=world.surface?.type==='sphere'?world.surface.radius:0;
  let disposed=false;
  staticRoot?.traverse(source=>{
    if(!source.isMesh||!source.geometry?.getAttribute('position')||Array.isArray(source.material))return;
    const key=source.material.name.replace(/^map-/,'');
    if(!Object.hasOwn(HEIGHTS,key))return;
    const material=baseMaterial(source.material,source.geometry,HEIGHTS[key],radius);
    materials.add(material);
    const mesh=new THREE.Mesh(source.geometry,material);mesh.name=`detail-base-${key}`;
    mesh.castShadow=false;mesh.receiveShadow=true;
    // Source bounds describe the higher overview shells. This small fixed set
    // of global batches must never disappear because those bounds were borrowed.
    mesh.frustumCulled=false;root.add(mesh);
  });
  return {root,dispose(){
    if(disposed)return;disposed=true;
    materials.forEach(material=>material.dispose());materials.clear();
    root.clear();root.removeFromParent();
  }};
}
