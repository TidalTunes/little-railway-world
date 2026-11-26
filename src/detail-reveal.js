import * as THREE from 'three';

// Keep streamed meshes opaque and depth-correct while they arrive. A short,
// spatially stable dissolve avoids transparent roof sorting and chunk flashes.
export function applyDetailReveal(material,reveal){
  material.onBeforeCompile=shader=>{
    shader.uniforms.detailReveal=reveal;
    shader.fragmentShader='uniform float detailReveal;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <alphatest_fragment>',`#include <alphatest_fragment>
      if (detailReveal < 0.9999) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (detailReveal <= threshold) discard;
      }`);
  };
  material.customProgramCacheKey=()=> 'streamed-detail-reveal-v1';
  return material;
}

export function createDetailDepthMaterial(reveal){
  return applyDetailReveal(new THREE.MeshDepthMaterial({depthPacking:THREE.BasicDepthPacking,side:THREE.BackSide}),reveal);
}
