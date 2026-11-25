import * as THREE from 'three';

// Crossfade complete renders so the change of representation has no transparent
// geometry sorting, disappearing roofs, or doubled shadows.
export function createViewCompositor(renderer){
  const options={type:THREE.HalfFloatType,depthBuffer:true,samples:2};
  const worldTarget=new THREE.WebGLRenderTarget(1,1,options);
  const mapTarget=new THREE.WebGLRenderTarget(1,1,options);
  const material=new THREE.ShaderMaterial({
    depthTest:false,depthWrite:false,toneMapped:false,
    uniforms:{worldTexture:{value:worldTarget.texture},mapTexture:{value:mapTarget.texture},
      blend:{value:0},toneMappingExposure:{value:renderer.toneMappingExposure}},
    vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}',
    fragmentShader:`varying vec2 vUv;
      uniform sampler2D worldTexture;
      uniform sampler2D mapTexture;
      uniform float blend;
      #include <tonemapping_pars_fragment>
      void main(){
        vec3 worldColor=ACESFilmicToneMapping(texture2D(worldTexture,vUv).rgb);
        vec3 mapColor=texture2D(mapTexture,vUv).rgb;
        gl_FragColor=vec4(mix(worldColor,mapColor,blend),1.0);
        #include <colorspace_fragment>
      }`,
  });
  const scene=new THREE.Scene(),quad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),material);
  quad.frustumCulled=false;scene.add(quad);
  const camera=new THREE.Camera();
  return {
    resize(width,height){worldTarget.setSize(width,height);mapTarget.setSize(width,height);},
    render(world,map,view,blend){
      if(blend<=.001){renderer.setRenderTarget(null);renderer.render(world,view);return;}
      if(blend>=.999){renderer.setRenderTarget(null);renderer.render(map,view);return;}
      renderer.setRenderTarget(worldTarget);renderer.render(world,view);
      renderer.setRenderTarget(mapTarget);renderer.render(map,view);
      renderer.setRenderTarget(null);material.uniforms.blend.value=blend;
      renderer.render(scene,camera);
    },
    dispose(){worldTarget.dispose();mapTarget.dispose();quad.geometry.dispose();material.dispose();},
  };
}
