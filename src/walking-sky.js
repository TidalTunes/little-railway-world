import * as THREE from 'three';

/** A single far-depth triangle, drawn before the existing night stars. Its
 * world-oriented view ray keeps the sky stationary as the player looks around;
 * no dome geometry, textures, noise octaves, or extra render target is needed. */
export function createWalkingSky(scene){
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute([-1,-1,0,3,-1,0,-1,3,0],3));
  const uniforms={
    inverseProjection:{value:new THREE.Matrix4()},cameraWorld:{value:new THREE.Matrix4()},
    skyUp:{value:new THREE.Vector3(0,1,0)},sunDirection:{value:new THREE.Vector3(-65,110,65).normalize()},
    horizonColor:{value:new THREE.Color(0xb8d5d9)},dayZenith:{value:new THREE.Color(0x5ba4d3)},
    nightZenith:{value:new THREE.Color(0x071226)},cloudColor:{value:new THREE.Color(0xf4f1de)},
    sunColor:{value:new THREE.Color(0xffeac6)},night:{value:0},strength:{value:1},
  };
  const material=new THREE.ShaderMaterial({name:'walking-sky',uniforms,depthWrite:false,depthTest:true,toneMapped:false,fog:false,
    vertexShader:`uniform mat4 inverseProjection; uniform mat4 cameraWorld; varying vec3 skyRay;
      void main(){
        vec4 ray = inverseProjection * vec4(position.xy, 1.0, 1.0);
        skyRay = mat3(cameraWorld) * ray.xyz;
        gl_Position = vec4(position.xy, 1.0, 1.0);
      }`,
    fragmentShader:`uniform vec3 skyUp; uniform vec3 sunDirection; uniform vec3 horizonColor;
      uniform vec3 dayZenith; uniform vec3 nightZenith; uniform vec3 cloudColor; uniform vec3 sunColor;
      uniform float night; uniform float strength; varying vec3 skyRay;
      float cloudLobe(vec2 p, vec2 center, vec2 size){
        vec2 q = (p-center)/size;
        return exp2(-dot(q,q)*2.8);
      }
      void main(){
        vec3 ray = normalize(skyRay);
        float elevation = dot(ray, skyUp);
        float altitude = max(elevation, 0.0);
        float horizonClearance = smoothstep(0.012, 0.14, altitude);
        vec3 color = mix(horizonColor, mix(dayZenith, nightZenith, night), pow(altitude, 0.62));
        float sunFacing = max(dot(ray, sunDirection), 0.0);
        float warmHaze = pow(sunFacing, 10.0) * pow(1.0-altitude, 2.0) * horizonClearance;
        color = mix(color, sunColor, warmHaze * 0.32 * (1.0-night));
        // Two quiet cloud banks are world-oriented, not painted onto the
        // screen. Analytic lobes avoid texture fetches and expensive noise.
        vec3 reference = abs(skyUp.y)<0.92 ? vec3(0.,1.,0.) : vec3(0.,0.,1.);
        vec3 east = normalize(cross(reference,skyUp));
        vec3 north = cross(skyUp,east);
        vec2 cloudPlane = vec2(dot(ray,east),dot(ray,north))/max(altitude,0.08);
        float cloud = cloudLobe(cloudPlane,vec2(-2.0,1.6),vec2(1.20,0.23))
          + cloudLobe(cloudPlane,vec2(-1.75,1.64),vec2(0.54,0.40))*0.55
          + cloudLobe(cloudPlane,vec2(2.4,-0.8),vec2(1.30,0.28))
          + cloudLobe(cloudPlane,vec2(2.8,-0.75),vec2(0.53,0.43))*0.45;
        cloud = smoothstep(0.20,0.90,cloud) * horizonClearance;
        color = mix(color, cloudColor, cloud * 0.52 * (1.0-night));
        float sunDisc = smoothstep(0.99989,0.99997,sunFacing) * horizonClearance * (1.0-night);
        color = mix(color, sunColor, sunDisc * 0.80);
        // Exactly the fog/background color at and below the horizon avoids a
        // hard seam where distant terrain fades into the atmospheric band.
        gl_FragColor = vec4(mix(horizonColor,color,strength),1.0);
        #include <colorspace_fragment>
      }`});
  const root=new THREE.Mesh(geometry,material);root.name='walking-sky';root.visible=false;
  root.frustumCulled=false;root.renderOrder=-1001;scene.add(root);
  let disposed=false;
  function update(camera,{visible=false,strength=1,night=0,up=camera?.up,sunDirection,horizonColor=scene.background}={}){
    if(disposed)return;
    root.visible=visible;
    if(camera){camera.updateMatrixWorld();uniforms.inverseProjection.value.copy(camera.projectionMatrixInverse);uniforms.cameraWorld.value.copy(camera.matrixWorld);}
    uniforms.night.value=THREE.MathUtils.clamp(Number.isFinite(night)?night:0,0,1);
    uniforms.strength.value=THREE.MathUtils.clamp(Number.isFinite(strength)?strength:1,0,1);
    if(up?.isVector3&&up.lengthSq()>1e-12)uniforms.skyUp.value.copy(up).normalize();
    if(sunDirection?.isVector3&&sunDirection.lengthSq()>1e-12)uniforms.sunDirection.value.copy(sunDirection).normalize();
    if(horizonColor?.isColor)uniforms.horizonColor.value.copy(horizonColor);
  }
  function dispose(){if(disposed)return;disposed=true;root.removeFromParent();geometry.dispose();material.dispose();}
  return{root,update,dispose};
}
