import * as THREE from 'three';
import {styleUniforms} from './scene-style.js';

/** One tiny point batch behind each representation. No bloom pass and no
 * lights; the globe and its terrain simply paint over the night sky. */
export function createNightSky(scene,mapScene){
  const positions=new Float32Array(420*3),sizes=new Float32Array(420);
  let state=71139;
  const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
  for(let i=0;i<sizes.length;i++){
    positions[i*3]=random()*2-1;positions[i*3+1]=random()*2-1;positions[i*3+2]=random();
    sizes[i]=random()>.94?3.0:1.0+random()*1.2;
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geometry.setAttribute('starSize',new THREE.BufferAttribute(sizes,1));
  // Opaque render queue is intentional: sky is drawn before the planet, never
  // over its opaque surface as a transparent, depth-disabled star layer would.
  const material=new THREE.ShaderMaterial({transparent:false,depthWrite:false,depthTest:false,toneMapped:false,
    uniforms:{worldNight:styleUniforms.night,worldTime:styleUniforms.time,skyColor:{value:scene.background}},
    vertexShader:`attribute float starSize; varying float seed; void main(){seed=position.z;gl_Position=vec4(position.xy,0.999,1.0);gl_PointSize=starSize;}`,
    fragmentShader:`uniform float worldNight;uniform float worldTime;uniform vec3 skyColor;varying float seed;
      void main(){float glow=1.0-smoothstep(0.12,0.5,length(gl_PointCoord-0.5));
      if(glow<0.01)discard;
      float twinkle=0.82+0.18*sin(worldTime*0.4+seed*37.0);
      vec3 star=mix(vec3(0.55,0.74,1.0),vec3(1.0,0.83,0.56),seed);
      gl_FragColor=vec4(mix(skyColor,star,glow*worldNight*twinkle*0.76),1.0);
      #include <colorspace_fragment>
      }`});
  const meshes=[scene,mapScene].map(parent=>{const points=new THREE.Points(geometry,material);points.name='night-stars';
    points.frustumCulled=false;points.renderOrder=-1000;points.visible=false;parent.add(points);return points;});
  return{update(){for(const mesh of meshes)mesh.visible=styleUniforms.night.value>.005;},dispose(){meshes.forEach(mesh=>mesh.removeFromParent());geometry.dispose();material.dispose();}};
}
