import * as THREE from 'three';
import {surfaceFor,surfacePoint,surfaceNormal} from './world-surface.js';
import {playerColors} from './player-palette.js';

// Five numerals share one small atlas and one draw per view. They belong to
// whole cities; neither individual roofs nor civic buildings need a map logo.
function levelAtlas(owner){
  const canvas=document.createElement('canvas');canvas.width=640;canvas.height=128;
  const ctx=canvas.getContext('2d'),colors=playerColors(owner);
  for(let level=1;level<=5;level++){
    const x=(level-.5)*128;
    ctx.beginPath();ctx.arc(x,64,49,0,Math.PI*2);ctx.fillStyle=colors.dark.getStyle();ctx.fill();
    ctx.beginPath();ctx.arc(x,64,45,0,Math.PI*2);ctx.fillStyle=colors.body.getStyle();ctx.fill();
    ctx.font='700 78px system-ui, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillStyle=colors.trim.getStyle();ctx.fillText(String(level),x,67);
  }
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}

export function createCityLevelMarkers(scene,mapScene,world,{ownerId=world.gameplay.ownerId}={}){
  const owner=world.players.find(player=>player.id===ownerId),texture=levelAtlas(owner);
  const material=new THREE.MeshBasicMaterial({map:texture,transparent:true,depthTest:false,depthWrite:false,toneMapped:false});
  material.onBeforeCompile=shader=>{
    shader.vertexShader='attribute float cityLevel;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <uv_vertex>',`#include <uv_vertex>
      vMapUv.x = (vMapUv.x + cityLevel - 1.0) / 5.0;`);
  };
  material.customProgramCacheKey=()=> 'city-level-numerals-v1';
  let cities=[],capacity=0,geometry,overview,map;
  const position=new THREE.Vector3(),projected=new THREE.Vector3(),normal=new THREE.Vector3(),eye=new THREE.Vector3();
  const matrix=new THREE.Matrix4(),scale=new THREE.Vector3(),viewPosition=new THREE.Vector3(),cameraUp=new THREE.Vector3();
  function allocate(count){
    if(count<=capacity)return;
    overview?.removeFromParent();map?.removeFromParent();overview?.dispose();map?.dispose();geometry?.dispose();
    capacity=Math.max(8,2**Math.ceil(Math.log2(count)));geometry=new THREE.PlaneGeometry(1,1);
    geometry.setAttribute('cityLevel',new THREE.InstancedBufferAttribute(new Float32Array(capacity),1));
    overview=new THREE.InstancedMesh(geometry,material,capacity);map=new THREE.InstancedMesh(geometry,material,capacity);
    overview.name='city-levels';map.name='city-levels-map';
    for(const mesh of [overview,map]){mesh.count=0;mesh.frustumCulled=false;mesh.renderOrder=18;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);}
    scene.add(overview);mapScene.add(map);
  }
  function pixelSize(camera,point,viewportHeight){
    viewPosition.copy(point).applyMatrix4(camera.matrixWorldInverse);
    const e=camera.projectionMatrix.elements,w=e[3]*viewPosition.x+e[7]*viewPosition.y+e[11]*viewPosition.z+e[15];
    return 2*Math.abs(w)/(Math.max(1,viewportHeight)*Math.abs(e[5]));
  }
  allocate(1);
  return{
    sync(next){cities=next;allocate(cities.length);},
    update({camera,mapBlend=0,walkingWeight=0,viewportHeight=800}={}){
      if(!overview)return;
      overview.visible=mapBlend<.999&&walkingWeight<.8;map.visible=mapBlend>.001&&walkingWeight<.8;
      overview.count=map.count=0;if(!camera||(!overview.visible&&!map.visible))return;
      material.opacity=1-THREE.MathUtils.smoothstep(walkingWeight,.1,.8);
      camera.updateMatrixWorld(true);cameraUp.set(0,1,0).applyQuaternion(camera.quaternion);let index=0;
      for(const city of cities){
        surfacePoint(world,city.x,city.y??.7,city.z,position);surfaceNormal(world,city.x,city.z,normal);
        if(surfaceFor(world)&&normal.dot(eye.copy(camera.position).sub(position))<=0)continue;
        projected.copy(position).project(camera);
        if(projected.z< -1||projected.z>1||Math.abs(projected.x)>1.08||Math.abs(projected.y)>1.08)continue;
        const pixel=pixelSize(camera,position,viewportHeight);
        // Lift the number a little above the town without covering doorways.
        position.addScaledVector(cameraUp,pixel*24);scale.setScalar(pixel*42);
        matrix.compose(position,camera.quaternion,scale);
        overview.setMatrixAt(index,matrix);map.setMatrixAt(index,matrix);
        geometry.attributes.cityLevel.setX(index,THREE.MathUtils.clamp(city.level,1,5));index++;
      }
      overview.count=map.count=index;
      overview.instanceMatrix.needsUpdate=map.instanceMatrix.needsUpdate=geometry.attributes.cityLevel.needsUpdate=true;
    },
    dispose(){overview?.removeFromParent();map?.removeFromParent();overview?.dispose();map?.dispose();geometry?.dispose();material.dispose();texture.dispose();cities=[];},
  };
}
