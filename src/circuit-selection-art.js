import * as THREE from 'three';
import {sampleLine} from './world-model.js';
import {surfaceFor,surfacePoint} from './world-surface.js';

const MAX_PIECES=256,MAX_INTERVALS=8192,SAMPLE_SPACING=.6;

/** A hollow ribbon traces only the graph pieces actually traversed by a
 * selected circuit. Shared infrastructure beyond a branch is not highlighted.
 * Both strategy layers share one geometry, one shader, and no animation work. */
export function createCircuitSelectionArt(parent,mapParent,world){
  const viewport={value:800},mapWeight={value:0},radius={value:surfaceFor(world)?.radius??0};
  const material=new THREE.MeshBasicMaterial({name:'circuit-selection-gold',color:'#fff0a6',transparent:true,opacity:.96,
    depthTest:false,depthWrite:false,side:THREE.DoubleSide,toneMapped:false,fog:false});material.forceSinglePass=true;
  material.onBeforeCompile=shader=>{
    shader.uniforms.selectionViewport=viewport;shader.uniforms.selectionMapBlend=mapWeight;shader.uniforms.selectionSphereRadius=radius;
    shader.vertexShader=`attribute vec3 previewOffset; attribute float previewSide;
      attribute vec3 selectionMapPosition; attribute vec3 selectionMapOffset;
      varying float vSelectionSide; varying vec3 vSelectionWorld;
      uniform float selectionViewport; uniform float selectionMapBlend;\n`+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`vec3 selectionCenter = mix(position, selectionMapPosition, selectionMapBlend);
      vec3 selectionOffset = mix(previewOffset, selectionMapOffset, selectionMapBlend);
      vec4 selectionClip = projectionMatrix * modelViewMatrix * vec4(selectionCenter, 1.0);
      float selectionUnit = 2.0 * abs(selectionClip.w) / (max(selectionViewport, 1.0) * abs(projectionMatrix[1][1]));
      vec3 transformed = selectionCenter + selectionOffset * max(1.72, 7.2 * selectionUnit);
      vSelectionSide = previewSide; vSelectionWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`);
    shader.fragmentShader=`varying float vSelectionSide; varying vec3 vSelectionWorld; uniform float selectionSphereRadius;\n`+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      if (selectionSphereRadius > 0.0 && dot(normalize(vSelectionWorld + vec3(0.0, selectionSphereRadius, 0.0)), cameraPosition - vSelectionWorld) <= 0.0) discard;
      float selectionSide = abs(vSelectionSide);
      float selectionMask = smoothstep(0.54, 0.60, selectionSide) * (1.0 - smoothstep(0.97, 1.0, selectionSide));
      float selectionGold = smoothstep(0.60, 0.66, selectionSide) * (1.0 - smoothstep(0.90, 0.97, selectionSide));
      diffuseColor.rgb = mix(vec3(0.035, 0.095, 0.09), diffuseColor.rgb, selectionGold);
      diffuseColor.a *= selectionMask;`);
  };
  material.customProgramCacheKey=()=> 'circuit-hollow-selection-v2';
  let geometry=new THREE.BufferGeometry(),key=null,disposed=false,rebuilds=0,intervals=0,pieceCount=0;
  const meshes=[parent,mapParent].map((group,index)=>{const mesh=new THREE.Mesh(geometry,material);mesh.name=index?'selected-circuit-map':'selected-circuit';mesh.visible=false;mesh.frustumCulled=false;mesh.renderOrder=10;group.add(mesh);return mesh;});
  const identities=new WeakMap();let nextIdentity=0;
  const identity=value=>{if(!value||typeof value!=='object')return 0;if(!identities.has(value))identities.set(value,++nextIdentity);return identities.get(value);};
  function sync(loop,lines=[]){
    if(disposed)return false;
    const allPieces=loop?.segments??loop?.pieces??[],byId=new Map(lines.map(line=>[line.id,line]));
    const pieces=allPieces.length<=MAX_PIECES?allPieces.map(piece=>({...piece,line:byId.get(piece.lineId)})):[];
    const nextKey=loop?`${loop.id}:${loop.revision??''}:`+pieces.map(piece=>`${piece.lineId}:${piece.start}:${piece.end}:${piece.line?.length}:${piece.line?.geometryRevision??piece.line?.revision??loop.revision??identity(piece.line?.alignment??piece.line?.points)}`).join('|'):'';
    if(nextKey===key)return false;key=nextKey;
    const valid=pieces.length>0&&pieces.every(piece=>piece.line&&Number.isFinite(piece.start)&&Number.isFinite(piece.end)&&piece.start>=0&&piece.end<=piece.line.length+1e-6&&piece.end>piece.start);
    const usable=valid?pieces:[],length=usable.reduce((sum,piece)=>sum+piece.end-piece.start,0),requested=usable.map(piece=>Math.max(1,Math.ceil((piece.end-piece.start)/SAMPLE_SPACING)));
    const requestedTotal=requested.reduce((a,b)=>a+b,0),counts=requestedTotal<=MAX_INTERVALS?requested:usable.map(piece=>1+Math.floor((MAX_INTERVALS-usable.length)*(piece.end-piece.start)/length));
    intervals=counts.reduce((a,b)=>a+b,0);pieceCount=usable.length;
    const attributes={position:new Float32Array(intervals*18),previewOffset:new Float32Array(intervals*18),previewSide:new Float32Array(intervals*6),selectionMapPosition:new Float32Array(intervals*18),selectionMapOffset:new Float32Array(intervals*18)};
    const center=new THREE.Vector3(),corner=new THREE.Vector3(),flatCenter=new THREE.Vector3(),flatCorner=new THREE.Vector3();let cursor=0;
    function vertex(point,side){
      const nx=point.tangent.z,nz=-point.tangent.x,height=(point.y??.42)+.13;
      surfacePoint(world,point.x,height,point.z,center);surfacePoint(world,point.x+nx,height,point.z+nz,corner);corner.sub(center).normalize().multiplyScalar(side);
      surfacePoint(world,point.x,.87,point.z,flatCenter);surfacePoint(world,point.x+nx,.87,point.z+nz,flatCorner);flatCorner.sub(flatCenter).normalize().multiplyScalar(side);
      center.toArray(attributes.position,cursor*3);corner.toArray(attributes.previewOffset,cursor*3);flatCenter.toArray(attributes.selectionMapPosition,cursor*3);flatCorner.toArray(attributes.selectionMapOffset,cursor*3);attributes.previewSide[cursor++]=side;
    }
    for(let index=0;index<usable.length;index++){
      const piece=usable[index],count=counts[index];let before=sampleLine(piece.line,piece.start);
      for(let i=1;i<=count;i++){const next=sampleLine(piece.line,piece.start+(piece.end-piece.start)*i/count);vertex(before,-1);vertex(next,-1);vertex(before,1);vertex(before,1);vertex(next,-1);vertex(next,1);before=next;}
    }
    const previous=geometry;geometry=new THREE.BufferGeometry();
    for(const [name,array]of Object.entries(attributes))geometry.setAttribute(name,new THREE.BufferAttribute(array,name==='previewSide'?1:3));
    geometry.setDrawRange(0,cursor);for(const mesh of meshes){mesh.geometry=geometry;mesh.visible=false;}previous.dispose();rebuilds++;return true;
  }
  return{sync,
    update({viewportHeight=800,mapBlend=0,walkingWeight=0,visible=true,hover=false}={}){
      viewport.value=Math.max(1,viewportHeight);mapWeight.value=THREE.MathUtils.clamp(mapBlend,0,1);
      material.opacity=(hover?.78:1)*(1-THREE.MathUtils.smoothstep(walkingWeight,.05,.75));
      const show=!disposed&&visible&&intervals>0&&material.opacity>0;
      meshes[0].visible=show&&mapBlend<.999;meshes[1].visible=show&&mapBlend>.001;
    },
    get stats(){return{rebuilds,pieces:pieceCount,intervals,vertices:intervals*6,visible:meshes.some(mesh=>mesh.visible)};},
    dispose(){if(disposed)return;disposed=true;for(const mesh of meshes)mesh.removeFromParent();geometry.dispose();material.dispose();},
  };
}
