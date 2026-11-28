import * as THREE from 'three';
import {styleUniforms} from './scene-style.js';

/** One tiny point batch behind each representation. No bloom pass and no
 * lights; the globe and its terrain simply paint over the night sky. */
export function createNightSky(scene,mapScene){
  const positions=new Float32Array(420*3),directions=new Float32Array(420*3),sizes=new Float32Array(420);
  let state=71139;
  const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
  for(let i=0;i<sizes.length;i++){
    positions[i*3]=random()*2-1;positions[i*3+1]=random()*2-1;positions[i*3+2]=random();
    sizes[i]=random()>.94?3.0:1.0+random()*1.2;
    const y=random()*2-1,angle=random()*Math.PI*2,r=Math.sqrt(1-y*y);
    directions.set([Math.cos(angle)*r,y,Math.sin(angle)*r],i*3);
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geometry.setAttribute('starSize',new THREE.BufferAttribute(sizes,1));
  geometry.setAttribute('skyDirection',new THREE.BufferAttribute(directions,3));
  // Opaque render queue is intentional: sky is drawn before the planet, never
  // over its opaque surface as a transparent, depth-disabled star layer would.
  const material=new THREE.ShaderMaterial({transparent:false,depthWrite:false,depthTest:false,toneMapped:false,
    uniforms:{worldNight:styleUniforms.night,worldTime:styleUniforms.time,skyColor:{value:scene.background},
      anchored:{value:0},skyView:{value:new THREE.Matrix3()},skyProjection:{value:new THREE.Matrix4()},skyUp:{value:new THREE.Vector3(0,1,0)}},
    vertexShader:`attribute float starSize; attribute vec3 skyDirection; varying float seed;
      uniform float anchored; uniform mat3 skyView; uniform mat4 skyProjection; uniform vec3 skyUp;
      void main(){seed=position.z;
        gl_Position=vec4(position.xy,0.999,1.0);
        if(anchored>0.5){
          vec3 direction=skyView*skyDirection;
          vec4 clip=skyProjection*vec4(direction,0.0);
          gl_Position=vec4(clip.xy,clip.w*0.999,clip.w);
          if(direction.z>=0.0||dot(skyDirection,skyUp)<0.025)gl_Position=vec4(2.0,2.0,2.0,1.0);
        }
        gl_PointSize=starSize;
      }`,
    fragmentShader:`uniform float worldNight;uniform float worldTime;uniform vec3 skyColor;varying float seed;
      void main(){float glow=1.0-smoothstep(0.12,0.5,length(gl_PointCoord-0.5));
      if(glow<0.01)discard;
      float twinkle=0.82+0.18*sin(worldTime*0.4+seed*37.0);
      vec3 star=mix(vec3(0.55,0.74,1.0),vec3(1.0,0.83,0.56),seed);
      gl_FragColor=vec4(mix(skyColor,star,glow*worldNight*twinkle*0.76),1.0);
      #include <colorspace_fragment>
      }`});
  const mapMaterial=material.clone();mapMaterial.uniforms.worldNight=styleUniforms.night;mapMaterial.uniforms.worldTime=styleUniforms.time;
  mapMaterial.uniforms.skyColor.value=scene.background;
  const meshes=[scene,mapScene].map((parent,index)=>{const points=new THREE.Points(geometry,index?mapMaterial:material);points.name='night-stars';
    points.frustumCulled=false;points.renderOrder=-1000;points.visible=false;parent.add(points);return points;});
  return{update(camera,{walking=false}={}){
    material.uniforms.anchored.value=walking&&camera?.isPerspectiveCamera?1:0;
    if(camera){camera.updateMatrixWorld();material.uniforms.skyView.value.setFromMatrix4(camera.matrixWorldInverse);
      material.uniforms.skyProjection.value.copy(camera.projectionMatrix);material.uniforms.skyUp.value.copy(camera.up).normalize();}
    for(const mesh of meshes)mesh.visible=styleUniforms.night.value>.005;
  },dispose(){meshes.forEach(mesh=>mesh.removeFromParent());geometry.dispose();material.dispose();mapMaterial.dispose();}};
}
