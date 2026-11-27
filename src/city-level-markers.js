import * as THREE from 'three';
import {surfaceFor,surfacePoint,surfaceNormal} from './world-surface.js';
import {playerColors} from './player-palette.js';

const TILE_WIDTH=160,TILE_HEIGHT=80,ATLAS_COLUMNS=8,MARKER_HEIGHT=40;
const populationFormat=new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1});
export function cityMarkerPopulation(city){
  const value=city?.houseCount??city?.population??city?.houseIds?.length;
  return Number.isFinite(value)?Math.max(0,Math.floor(value)):Math.max(0,Math.floor(city?.level??0)*3);
}

/** One owner atlas serves all city nameplates. New house counts repaint only
 * during settlement sync; camera movement never creates text or geometry. */
function statisticsAtlas(owner){
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),colors=playerColors(owner);
  canvas.width=ATLAS_COLUMNS*TILE_WIDTH;canvas.height=TILE_HEIGHT;
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  texture.generateMipmaps=false;texture.minFilter=THREE.LinearFilter;
  const grid={value:new THREE.Vector2(ATLAS_COLUMNS,1)};let key='',cells=0,updates=0;
  function polygon(points,color){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=color;ctx.fill();}
  function paint(cell,index){
    const x=index%ATLAS_COLUMNS*TILE_WIDTH,y=Math.floor(index/ATLAS_COLUMNS)*TILE_HEIGHT;
    ctx.save();ctx.translate(x,y);
    polygon([[9,11],[148,11],[157,20],[157,60],[148,69],[9,69],[2,60],[2,20]],'#c3a461');
    polygon([[10,14],[147,14],[154,21],[154,59],[147,66],[10,66],[5,59],[5,21]],'#183c3e');
    polygon([[29,15],[49,24],[49,49],[29,63],[10,49],[10,24]],colors.body.getStyle());
    polygon([[29,15],[49,24],[49,49],[29,63],[36,41]],colors.dark.getStyle());
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f0f0dc';ctx.font='700 42px system-ui, sans-serif';ctx.fillText(String(cell.level),29,41);
    // The resident silhouette keeps population distinct from the level numeral.
    ctx.beginPath();ctx.arc(73,30,6,0,Math.PI*2);ctx.fillStyle='#b8ccc2';ctx.fill();
    polygon([[67,39],[79,39],[84,53],[62,53]],'#b8ccc2');
    ctx.fillStyle='#f0f0dc';ctx.font=`650 ${cell.population>=1000?25:30}px system-ui, sans-serif`;
    ctx.fillText(cell.population>=1000?populationFormat.format(cell.population):String(cell.population),117,41);
    ctx.restore();
  }
  return {texture,grid,
    sync(cities){
      const entries=[],lookup=new Map();
      for(const city of cities){const level=THREE.MathUtils.clamp(Math.floor(city.level),1,5),population=cityMarkerPopulation(city),id=`${level}:${population}`;
        if(!lookup.has(id)){lookup.set(id,entries.length);entries.push({level,population});}}
      const nextKey=entries.map(entry=>`${entry.level}:${entry.population}`).join('|');
      if(nextKey!==key){
        key=nextKey;cells=entries.length;const rows=Math.max(1,2**Math.ceil(Math.log2(Math.max(1,Math.ceil(cells/ATLAS_COLUMNS)))));
        // A larger atlas releases the old GPU allocation before reuploading.
        if(canvas.height!==rows*TILE_HEIGHT)texture.dispose();
        canvas.width=ATLAS_COLUMNS*TILE_WIDTH;canvas.height=rows*TILE_HEIGHT;grid.value.set(ATLAS_COLUMNS,rows);
        entries.forEach(paint);texture.needsUpdate=true;updates++;
      }
      return cities.map(city=>lookup.get(`${THREE.MathUtils.clamp(Math.floor(city.level),1,5)}:${cityMarkerPopulation(city)}`));
    },get cells(){return cells;},get updates(){return updates;},
  };
}

export function createCityLevelMarkers(scene,mapScene,world,{ownerId=world.gameplay.ownerId}={}){
  const owner=world.players.find(player=>player.id===ownerId),atlas=statisticsAtlas(owner),texture=atlas.texture;
  const material=new THREE.MeshBasicMaterial({map:texture,transparent:true,depthTest:false,depthWrite:false,toneMapped:false});
  material.onBeforeCompile=shader=>{
    shader.uniforms.cityAtlasGrid=atlas.grid;
    shader.vertexShader='attribute float cityMarkerIndex; uniform vec2 cityAtlasGrid;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <uv_vertex>',`#include <uv_vertex>
      vMapUv = (vMapUv + vec2(mod(cityMarkerIndex, cityAtlasGrid.x), cityAtlasGrid.y - 1.0 - floor(cityMarkerIndex / cityAtlasGrid.x))) / cityAtlasGrid;`);
  };
  material.customProgramCacheKey=()=> 'city-level-population-v2';
  let cities=[],slots=[],capacity=0,geometry,overview,map;
  const position=new THREE.Vector3(),projected=new THREE.Vector3(),normal=new THREE.Vector3(),eye=new THREE.Vector3();
  const matrix=new THREE.Matrix4(),scale=new THREE.Vector3(),viewPosition=new THREE.Vector3(),cameraUp=new THREE.Vector3();
  function allocate(count){
    if(count<=capacity)return;
    overview?.removeFromParent();map?.removeFromParent();overview?.dispose();map?.dispose();geometry?.dispose();
    capacity=Math.max(8,2**Math.ceil(Math.log2(count)));geometry=new THREE.PlaneGeometry(2,1);
    for(const name of ['cityLevel','cityPopulation','cityMarkerIndex'])geometry.setAttribute(name,new THREE.InstancedBufferAttribute(new Float32Array(capacity),1));
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
    sync(next){cities=next.filter(city=>Number.isFinite(city.level)&&city.level>=1);slots=atlas.sync(cities);allocate(cities.length);},
    update({camera,mapBlend=0,walkingWeight=0,viewportHeight=800}={}){
      if(!overview)return;
      overview.visible=mapBlend<.999&&walkingWeight<.8;map.visible=mapBlend>.001&&walkingWeight<.8;
      overview.count=map.count=0;if(!camera||(!overview.visible&&!map.visible))return;
      material.opacity=1-THREE.MathUtils.smoothstep(walkingWeight,.1,.8);
      camera.updateMatrixWorld(true);cameraUp.set(0,1,0).applyQuaternion(camera.quaternion);let index=0;
      for(let source=0;source<cities.length;source++){
        const city=cities[source];surfacePoint(world,city.x,city.y??.7,city.z,position);surfaceNormal(world,city.x,city.z,normal);
        if(surfaceFor(world)&&normal.dot(eye.copy(camera.position).sub(position))<=0)continue;
        projected.copy(position).project(camera);
        if(projected.z< -1||projected.z>1||Math.abs(projected.x)>1.08||Math.abs(projected.y)>1.08)continue;
        const pixel=pixelSize(camera,position,viewportHeight);
        // One shared pose avoids ghost labels during layer crossfade. The full
        // map places the nameplate on the city; detailed towns retain headroom.
        position.addScaledVector(cameraUp,pixel*24*(1-THREE.MathUtils.smoothstep(mapBlend,0,1)));scale.setScalar(pixel*MARKER_HEIGHT);
        matrix.compose(position,camera.quaternion,scale);
        overview.setMatrixAt(index,matrix);map.setMatrixAt(index,matrix);
        geometry.attributes.cityLevel.setX(index,THREE.MathUtils.clamp(city.level,1,5));
        geometry.attributes.cityPopulation.setX(index,cityMarkerPopulation(city));geometry.attributes.cityMarkerIndex.setX(index,slots[source]);index++;
      }
      overview.count=map.count=index;
      overview.instanceMatrix.needsUpdate=map.instanceMatrix.needsUpdate=true;
      for(const name of ['cityLevel','cityPopulation','cityMarkerIndex'])geometry.attributes[name].needsUpdate=true;
    },
    get stats(){return{cities:cities.length,atlasCells:atlas.cells,atlasUpdates:atlas.updates};},
    dispose(){overview?.removeFromParent();map?.removeFromParent();overview?.dispose();map?.dispose();geometry?.dispose();material.dispose();texture.dispose();cities=[];},
  };
}
