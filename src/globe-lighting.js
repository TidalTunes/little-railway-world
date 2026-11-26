/** Soft illumination follows the viewer, keeping every hemisphere readable. */
export function globeMapLighting(material,radius){
  material.onBeforeCompile=shader=>{
    shader.uniforms.mapSurfaceRadius={value:radius};
    shader.vertexShader='uniform float mapSurfaceRadius; varying float globeLight;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
      vec3 viewNormal=mat3(viewMatrix)*radialNormal;
      globeLight=0.44+0.62*max(0.0,dot(viewNormal,normalize(vec3(-0.48,0.58,0.92))));`);
    shader.fragmentShader='varying float globeLight;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',
      'outgoingLight *= globeLight;\n outgoingLight *= mix(vec3(0.91,0.97,1.05), vec3(1.04,1.01,0.93), smoothstep(0.50,1.0,globeLight));\n#include <opaque_fragment>');
  };
  material.customProgramCacheKey=()=> 'complete-globe-light-v2';
  return material;
}
