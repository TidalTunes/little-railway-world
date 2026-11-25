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
  let depthProxies;
  function shadowProxies(){
    if(depthProxies)return depthProxies;
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,1,0,0,0,0,1],3));
    geometry.setAttribute('normal',new THREE.Float32BufferAttribute([0,1,0,0,1,0,0,1,0],3));
    // Three's PCF shadow pass uses BasicDepthPacking and reverses FrontSide
    // art to BackSide. Normals affect its shader key even without lighting.
    // Hold distinct materials so async readiness tracks both shader programs.
    const regular=new THREE.Mesh(geometry,new THREE.MeshDepthMaterial({side:THREE.BackSide}));
    const instanced=new THREE.InstancedMesh(geometry,new THREE.MeshDepthMaterial({side:THREE.BackSide}),1);
    return depthProxies={geometry,objects:[regular,instanced]};
  }
  let width=1,height=1,allocatedWidth=1,allocatedHeight=1;
  function allocate(){
    if(width===allocatedWidth&&height===allocatedHeight)return;
    worldTarget.setSize(width,height);mapTarget.setSize(width,height);
    allocatedWidth=width;allocatedHeight=height;
    renderer.initRenderTarget(worldTarget);renderer.initRenderTarget(mapTarget);
  }
  function withTarget(target,callback){
    const previous=renderer.getRenderTarget(),face=renderer.getActiveCubeFace?.()??0;
    const level=renderer.getActiveMipmapLevel?.()??0;
    try{renderer.setRenderTarget(target);return callback();}
    finally{renderer.setRenderTarget(previous,face,level);}
  }
  function warmShadows(world,view){
    const hidden=[];
    try{
      // Keep the real lights in the scene so Three allocates their actual shadow
      // targets and applies shadow-type changes before compiling any materials.
      // No detailed geometry is drawn or uploaded during this allocation pass.
      world.traverse(object=>{
        if(object.visible&&(object.isMesh||object.isLine||object.isPoints||object.isSprite)){
          hidden.push(object);object.visible=false;
        }
      });
      renderer.render(world,view);
    }finally{for(const object of hidden)object.visible=true;}
  }
  return {
    resize(w,h){width=w;height=h;},
    async prepare(world,map,view){
      const shadows=renderer.shadowMap.enabled;
      withTarget(worldTarget,()=>{allocate();if(world&&view)warmShadows(world,view);});
      function compile(target,source,viewCamera,targetScene){
        const previousShadows=renderer.shadowMap.enabled;
        try{
          renderer.shadowMap.enabled=shadows;
          // compileAsync captures the program synchronously. Restore renderer
          // state immediately so the map can keep rendering while it finishes.
          return withTarget(target,()=>renderer.compileAsync(source,viewCamera,targetScene));
        }finally{renderer.shadowMap.enabled=previousShadows;}
      }
      // Offscreen targets use different tone-mapping/output shader variants.
      // Await each variant before compiling the same materials for the screen:
      // Three's async readiness check follows material.currentProgram.
      if(world&&view)await compile(worldTarget,world,view);
      if(world&&shadows){
        let shadowCamera;
        world.traverseVisible(object=>{if(!shadowCamera&&object.castShadow&&object.isDirectionalLight)shadowCamera=object.shadow.camera;});
        // compileAsync only prepares ordinary surface materials. Prepare the
        // two private shadow-depth variants separately, without rendering them.
        if(shadowCamera)for(const proxy of shadowProxies().objects)await compile(worldTarget,proxy,shadowCamera,world);
      }
      if(map&&view)await compile(mapTarget,map,view);
      await compile(null,scene,camera);
      if(world&&view)await compile(null,world,view);
    },
    render(world,map,view,blend){
      if(blend<=.001){renderer.setRenderTarget(null);renderer.render(world,view);return;}
      if(blend>=.999){renderer.setRenderTarget(null);renderer.render(map,view);return;}
      // The overview never pays for two multisampled half-float framebuffers.
      // Allocate them only when both representations are actually on screen.
      allocate();
      renderer.setRenderTarget(worldTarget);renderer.render(world,view);
      renderer.setRenderTarget(mapTarget);renderer.render(map,view);
      renderer.setRenderTarget(null);material.uniforms.blend.value=blend;
      renderer.render(scene,camera);
    },
    dispose(){
      worldTarget.dispose();mapTarget.dispose();quad.geometry.dispose();material.dispose();
      if(depthProxies){
        depthProxies.geometry.dispose();
        for(const proxy of depthProxies.objects){proxy.material.dispose();if(proxy.isInstancedMesh)proxy.dispose();}
        depthProxies=undefined;
      }
    },
  };
}
