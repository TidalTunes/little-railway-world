import * as THREE from 'three';

/** A small, irregular carpet tile. Its twelve leaves share one indexed mesh;
 * each leaf is a tapered ribbon with a bent shoulder, never a cone or spike. */
export function walkingGrassGeometry({crop=false}={}){
  const positions=[],normals=[],indices=[],rootIndices=[];
  const count=crop?7:12;
  for(let blade=0;blade<count;blade++){
    const angle=blade*2.39996323,spread=Math.sqrt((blade+.5)/count)*.46;
    const x=Math.cos(angle)*spread,z=Math.sin(angle)*spread;
    const facing=angle+blade*.73,c=Math.cos(facing),s=Math.sin(facing);
    const h=.70+(Math.sin(blade*13.73)*.5+.5)*.30,width=crop?.065:.07;
    const lean=.13+((blade*7)%5)*.027,base=positions.length/3;
    const points=[[-width,0,0],[width,0,0],[-width*.55,h*.56,lean*.34],[width*.55,h*.56,lean*.34],[0,h,lean]];
    for(const [vertex,[u,y,v]]of points.entries()){
      rootIndices.push(blade*2,blade*2+1,vertex===4?.5:vertex%2);
      positions.push(x+u*c-v*s,y,z+u*s+v*c);
      // Upward-biased normals keep fine two-sided leaves softly lit. The
      // silhouette carries the detail without black slivers between blades.
      normals.push(-s*.35,.93675,c*.35);
    }
    indices.push(base,base+1,base+2,base+1,base+3,base+2,base+2,base+3,base+4);
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));
  if(!crop)geometry.setAttribute('grassRoot',new THREE.Float32BufferAttribute(rootIndices,3));
  geometry.setIndex(indices);return geometry;
}

/** Shared root endpoints let the terrain sampler conform the fan to each
 * real ground facet without changing its geometry or adding draw calls. */
export const WALKING_GRASS_ROOTS=Object.freeze((()=>{
  const geometry=walkingGrassGeometry(),p=geometry.attributes.position,roots=[];
  for(let blade=0;blade<12;blade++)for(let side=0;side<2;side++)roots.push([p.getX(blade*5+side),p.getZ(blade*5+side)]);
  geometry.dispose();return roots;
})());

/** Uniform-only motion. Every effect is multiplied by height squared, leaving
 * all blade roots exactly on their authored surface, including paused gusts. */
export function addWalkingVegetationShader(material,{focus,time,player,visibility={value:1}},kind){
  const before=material.onBeforeCompile,key=material.customProgramCacheKey();
  const vegetation=kind==='grass'||kind==='crops'||kind==='flowers';
  material.onBeforeCompile=(shader,renderer)=>{
    before(shader,renderer);
    shader.uniforms.walkFocus=focus;shader.uniforms.walkTime=time;shader.uniforms.walkPlayer=player;shader.uniforms.walkVisibility=visibility;
    shader.vertexShader=`uniform vec3 walkFocus; uniform vec3 walkPlayer; uniform float walkTime; uniform float walkVisibility;
      varying float walkDistance; varying float bladeHeight;
      ${kind==='flowers'?'attribute float flowerPetal;':''}
      ${kind==='grass'?`attribute vec3 grassRoot;
      attribute vec4 grassRoots0; attribute vec4 grassRoots1; attribute vec4 grassRoots2;
      attribute vec4 grassRoots3; attribute vec4 grassRoots4; attribute vec4 grassRoots5;
      float grassGround(float index) {
        if(index < 4.0) return grassRoots0[int(index)];
        if(index < 8.0) return grassRoots1[int(index - 4.0)];
        if(index < 12.0) return grassRoots2[int(index - 8.0)];
        if(index < 16.0) return grassRoots3[int(index - 12.0)];
        if(index < 20.0) return grassRoots4[int(index - 16.0)];
        return grassRoots5[int(index - 20.0)];
      }`:''}\n`+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      vec3 walkOrigin = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
      walkDistance = distance(walkOrigin, walkFocus);
      bladeHeight = position.y;
      float detailCoverage = (1.0 - smoothstep(15.0, 23.0, walkDistance)) * smoothstep(0.0, 1.0, walkVisibility);
      ${vegetation?`
      float rootWeight = position.y * position.y;
      vec3 bladeAxisX = (modelMatrix * instanceMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz;
      vec3 bladeAxisY = (modelMatrix * instanceMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
      vec3 bladeAxisZ = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 1.0, 0.0)).xyz;
      float plantHeight = length(bladeAxisY);
      bladeAxisY = normalize(bladeAxisY);
      float gust = 0.055 + 0.020 * sin(dot(walkOrigin.xz, vec2(0.23, 0.31)) - walkTime * 1.25);
      float flutter = 0.007 * sin(dot(walkOrigin.xz, vec2(2.8, -1.7)) - walkTime * 2.7);
      vec3 worldWind = (vec3(0.88, 0.0, 0.47) * gust + vec3(0.30, 0.0, -0.90) * flutter) * clamp(plantHeight / 0.23, 0.7, 1.6)${kind==='flowers'?' * 0.42':''};
      // Project the same world-space wind into each randomly rotated tile.
      // Dividing out instance scale preserves its physical displacement.
      transformed.x += dot(worldWind, normalize(bladeAxisX)) / max(length(bladeAxisX), 0.01) * rootWeight;
      transformed.z += dot(worldWind, normalize(bladeAxisZ)) / max(length(bladeAxisZ), 0.01) * rootWeight;
      vec3 fromPlayer = walkOrigin - walkPlayer;
      float playerHeight = abs(dot(fromPlayer, bladeAxisY));
      fromPlayer -= bladeAxisY * dot(fromPlayer, bladeAxisY);
      float playerDistance = length(fromPlayer);
      float press = (1.0 - smoothstep(0.16, 0.75, playerDistance)) * (1.0 - smoothstep(0.5, 1.8, playerHeight));
      fromPlayer /= max(playerDistance, 0.08);
      transformed.x += dot(fromPlayer, normalize(bladeAxisX)) / max(length(bladeAxisX), 0.01) * press * rootWeight * 0.19;
      transformed.z += dot(fromPlayer, normalize(bladeAxisZ)) / max(length(bladeAxisZ), 0.01) * press * rootWeight * 0.19;
      transformed.y *= 1.0 - press * 0.44;
      `:''}
      ${kind==='grass'?'transformed.y += mix(grassGround(grassRoot.x), grassGround(grassRoot.y), grassRoot.z);':''}
      transformed *= detailCoverage;`);
    if(kind==='flowers')shader.vertexShader=shader.vertexShader.replace('#include <color_vertex>',
      THREE.ShaderChunk.color_vertex.replace('vColor.rgb *= instanceColor.rgb;',
        'vColor.rgb *= mix(vec3(1.0), instanceColor.rgb, flowerPetal);'));
    shader.fragmentShader='varying float walkDistance; varying float bladeHeight;\n'+shader.fragmentShader;
    if(vegetation){
      shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
        diffuseColor.rgb *= mix(0.84, 1.08, clamp(bladeHeight, 0.0, 1.0));`);
      shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_begin>',`#include <normal_fragment_begin>
        normal = normalize(vNormal);`);
    }
  };
  material.customProgramCacheKey=()=>`${key}|walking-vegetation-v5:${kind}`;
  return material;
}
