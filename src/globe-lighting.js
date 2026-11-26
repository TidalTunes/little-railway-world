/** Soft illumination follows the viewer, keeping every hemisphere readable. */
export function globeMapLighting(material,radius){
  material.onBeforeCompile=shader=>{
    shader.uniforms.mapSurfaceRadius={value:radius};
    shader.vertexShader='uniform float mapSurfaceRadius; varying float globeLight;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
      vec3 viewNormal=mat3(viewMatrix)*radialNormal;
      globeLight=0.57+0.43*max(0.0,dot(viewNormal,normalize(vec3(-0.35,0.5,1.0))));`);
    shader.fragmentShader='varying float globeLight;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',
      'outgoingLight *= globeLight;\n#include <opaque_fragment>');
  };
  material.customProgramCacheKey=()=> 'complete-globe-light';
  return material;
}
