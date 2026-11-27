import * as THREE from 'three';
import {station,person} from './assets.js';
import {buildRailways} from './railway.js';
import {consolidate} from './geometry.js';
import {bakeMaterialColors} from './color-batches.js';
import {createPlayerPalette} from './player-palette.js';
import {FARM_VILLAGE_PLAYER} from './farm-villages.js';
import {buildCityStreets,streetFootprint,STREET_HEIGHT} from './city-streets.js';
import {sampleLine,worldSurface} from './world-model.js';
import {surfaceFor,surfacePoint,rigidSurfacePoseMatrix} from './world-surface.js';
import {tessellateSurfaceGeometry} from './surface-tessellation.js';
import {C,M} from './palette.js';
import {applySceneStyle} from './scene-style.js';
import {applyMapNetworkVisibility,mapNetworkVisibility} from './map-symbols.js';

const GOOD=new THREE.Color('#5db6a5'),BAD=new THREE.Color('#ee7666'),TRACK_INK=new THREE.Color('#243d39'),TRACK_PAPER=new THREE.Color('#eee9d5');
const HANDLE_CAPACITY=14,ENDPOINT_INK=new THREE.Color('#123f39'),HANDLE_PAPER=new THREE.Color('#f4fff3');
const NON_GEOMETRIC_FAILURES=new Set(['planning-failed','world-changed','not-enough-gold']);
const wholeRouteBlocked=result=>result?.siteValid===false&&!result.invalidBends?.length&&!NON_GEOMETRIC_FAILURES.has(result.code);
const unique=items=>[...new Map((items??[]).map(item=>[item.id,item])).values()];
const pointsFor=line=>{const count=Math.max(2,Math.ceil(line.length/.5)+1);return Array.from({length:count},(_,i)=>sampleLine(line,line.length*i/(count-1)));};

/** Planar junctions have one surface, not several intersecting strips. Union
 * before extrusion removes hidden internal walls and coplanar top triangles
 * where the rails divide, while keeping both actual rail centerlines intact.
 * Sloped/spherical authored routes retain the existing swept geometry. */
export function buildJoinedSettlementTracks(parent,world,lines){
  if(surfaceFor(world)||!lines.length)return null;
  const paths=[];let railY;
  for(const line of lines)for(const range of line.renderRanges??[{start:0,end:line.length}]){
    const count=Math.max(2,Math.ceil((range.end-range.start)/.30)+1);
    const points=Array.from({length:count},(_,i)=>sampleLine(line,range.start+(range.end-range.start)*i/(count-1)));
    railY??=points[0].y;if(points.some(point=>Math.abs(point.y-railY)>1e-5))return null;
    paths.push({points,width:1.88});
  }
  if(!paths.length)return null;
  const extrude=(strips,bottom,top,material,name)=>{
    const polygons=streetFootprint(world,strips,{x:0,z:0});
    const shapes=polygons.map(({outer,holes})=>{const shape=new THREE.Shape(outer.map(([x,z])=>new THREE.Vector2(x,-z)));shape.holes=holes.map(hole=>new THREE.Path(hole.map(([x,z])=>new THREE.Vector2(x,-z))));return shape;});
    const geometry=new THREE.ExtrudeGeometry(shapes,{depth:top-bottom,bevelEnabled:false,steps:1});geometry.rotateX(-Math.PI/2);geometry.translate(0,bottom,0);geometry.computeBoundingSphere();
    const mesh=new THREE.Mesh(geometry,material);mesh.name=name;mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);return mesh;
  };
  const ballast=extrude(paths,railY-.42,railY-.19,M.gravel,'joined-railway-ballast');
  const railPaths=paths.flatMap(({points})=>[-1,1].map(side=>({width:.095,points:points.map(point=>({x:point.x+point.tangent.z*side*.46,z:point.z-point.tangent.x*side*.46}))})));
  const rails=extrude(railPaths,railY-.09,railY,M.rail,'joined-railway-rails');
  return {ballast,rails};
}

/** Committed revisions rebuild meshes; live edits only upload pooled buffers.
 * A pale outline and ink rails keep a draft legible without a broad halo. Only
 * a failed bend gets a small red glow; affordability never colors the world. */
export function createSettlementRailwayArt(parent,mapParent,world){
  const root=new THREE.Group(),mapRoot=new THREE.Group();root.name='settlement-railways';mapRoot.name='settlement-map-railways';parent.add(root);mapParent.add(mapRoot);
  const network=new THREE.Group(),mapNetwork=new THREE.Group(),ghost=new THREE.Group(),mapGhost=new THREE.Group();
  network.name='built-railway-network';mapNetwork.name='built-map-railway-network';ghost.name='railway-preview';mapGhost.name='map-railway-preview';
  root.add(network,ghost);mapRoot.add(mapNetwork,mapGhost);ghost.visible=mapGhost.visible=false;
  const players=new Map((world.players??[]).map(player=>[player.id,player]));players.set(FARM_VILLAGE_PLAYER.id,FARM_VILLAGE_PLAYER);
  const widthScale={value:1},visibility={value:1};
  const makeMapMaterial=(name,color)=>{
    const material=applySceneStyle(new THREE.MeshBasicMaterial({name,color,depthWrite:false,side:THREE.DoubleSide,toneMapped:false}),{kind:'map-symbol'});
    const compile=material.onBeforeCompile,cache=material.customProgramCacheKey();
    material.onBeforeCompile=(shader,renderer)=>{compile.call(material,shader,renderer);shader.uniforms.railwayWidthScale=widthScale;
      shader.vertexShader='attribute vec3 railwayOffset; uniform float railwayWidthScale;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','vec3 transformed = vec3(position) + railwayOffset * (railwayWidthScale - 1.0);');};
    material.customProgramCacheKey=()=>`${cache}|built-railway-map-width-v1`;
    applyMapNetworkVisibility(material,visibility);return material;
  };
  const mapRim=makeMapMaterial('railway-map-paper',C.trim),mapInk=makeMapMaterial('railway-map-ink',C.window);
  const mapPathMaterial=new THREE.MeshBasicMaterial({color:C.sand,depthWrite:false,side:THREE.DoubleSide});
  const previewViewport={value:800};
  const makePreviewMaterial=(name,width,pixels,opacity,color,pattern='solid')=>{
    const material=new THREE.MeshBasicMaterial({name,color,transparent:true,opacity,depthWrite:false,depthTest:false,side:THREE.DoubleSide,toneMapped:false,fog:false});material.forceSinglePass=true;
    material.onBeforeCompile=shader=>{
      shader.uniforms.previewViewport=previewViewport;shader.uniforms.previewHalfWidth={value:width/2};shader.uniforms.previewPixels={value:pixels};
      shader.vertexShader='attribute vec3 previewOffset; attribute float previewSide; attribute float previewDistance; varying float vPreviewSide; varying float vPreviewDistance; uniform float previewViewport; uniform float previewHalfWidth; uniform float previewPixels;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`vec4 previewClip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        float previewUnit = 2.0 * abs(previewClip.w) / (previewViewport * abs(projectionMatrix[1][1]));
        vec3 transformed = position + previewOffset * max(previewHalfWidth, previewPixels * previewUnit);
        vPreviewSide = previewSide; vPreviewDistance = previewDistance;`);
      shader.fragmentShader='varying float vPreviewSide; varying float vPreviewDistance;\n'+shader.fragmentShader;
      const mask=pattern==='rails'?`float railMask = 1.0 - smoothstep(0.10, 0.22, abs(abs(vPreviewSide) - 0.54));
        float sleeperMask = (1.0 - smoothstep(0.10, 0.21, abs(fract(vPreviewDistance / 0.95) - 0.5)))
          * (1.0 - smoothstep(0.72, 0.90, abs(vPreviewSide)))
          * (1.0 - smoothstep(0.22, 0.48, fwidth(vPreviewDistance)));
        diffuseColor.a *= max(railMask, sleeperMask);`
        :`diffuseColor.a *= 1.0 - smoothstep(${pattern==='glow'?'0.12':'0.84'}, 1.0, abs(vPreviewSide));`;
      shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n'+mask);
    };
    material.customProgramCacheKey=()=>`railway-preview-outline-v2:${width}:${pixels}:${pattern}`;return material;
  };
  const previewMaterials=[makePreviewMaterial('railway-preview-outline',2.12,4.0,.88,TRACK_PAPER),makePreviewMaterial('railway-preview-rails',1.78,3.4,.96,TRACK_INK,'rails')];
  const invalidMaterials=[makePreviewMaterial('railway-invalid-bend-glow',4.0,7,.27,BAD,'glow'),makePreviewMaterial('railway-invalid-bend-rails',1.78,3.4,1,BAD,'rails')];
  const ghostMaterial=new THREE.MeshBasicMaterial({color:TRACK_PAPER,transparent:true,opacity:.18,depthWrite:false,depthTest:false,side:THREE.DoubleSide,toneMapped:false,fog:false});ghostMaterial.forceSinglePass=true;
  const ghostEdgeMaterial=new THREE.LineBasicMaterial({color:GOOD,transparent:true,opacity:.90,depthWrite:false,depthTest:false,toneMapped:false,fog:false});
  const blockedGuideMaterial=new THREE.LineDashedMaterial({color:BAD,dashSize:.65,gapSize:.5,transparent:true,opacity:.9,depthWrite:false,depthTest:false,toneMapped:false,fog:false});
  // A unit centreline plus a shader-expanded edge keeps stroke widths stable
  // even when the selected city's footprint or connection range is very large.
  const circleSegments=192,circlePositions=new Float32Array((circleSegments+1)*6),circleSides=new Float32Array((circleSegments+1)*2),circleArcs=new Float32Array((circleSegments+1)*2),circleIndices=[];
  for(let i=0;i<=circleSegments;i++)for(let side=0;side<2;side++){
    const index=i*2+side,angle=i/circleSegments*Math.PI*2;circlePositions[index*3]=Math.cos(angle);circlePositions[index*3+2]=Math.sin(angle);circleSides[index]=side?1:-1;circleArcs[index]=i/circleSegments*48;
    if(i<circleSegments&&side===0)circleIndices.push(index,index+2,index+1,index+1,index+2,index+3);
  }
  const circleGeometry=new THREE.BufferGeometry();circleGeometry.setAttribute('position',new THREE.BufferAttribute(circlePositions,3));circleGeometry.setAttribute('circleSide',new THREE.BufferAttribute(circleSides,1));circleGeometry.setAttribute('circleArc',new THREE.BufferAttribute(circleArcs,1));circleGeometry.setIndex(circleIndices);
  function circleMaterial(name,color,halfWidth,pixels,opacity,dashed=false){
    const material=new THREE.MeshBasicMaterial({name,color,transparent:true,opacity,depthWrite:false,depthTest:false,side:THREE.DoubleSide,toneMapped:false,fog:false});material.forceSinglePass=true;
    material.onBeforeCompile=shader=>{
      shader.uniforms.previewViewport=previewViewport;shader.uniforms.circleHalfWidth={value:halfWidth};shader.uniforms.circlePixels={value:pixels};
      shader.vertexShader='attribute float circleSide; attribute float circleArc; varying float vCircleSide; varying float vCircleArc; uniform float previewViewport; uniform float circleHalfWidth; uniform float circlePixels;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`vec4 circlePosition = vec4(position, 1.0); float circleScale = 1.0;
        #ifdef USE_INSTANCING
          circlePosition = instanceMatrix * circlePosition; circleScale = length(instanceMatrix[0].xyz);
        #endif
        vec4 circleClip = projectionMatrix * modelViewMatrix * circlePosition;
        float circleUnit = 2.0 * abs(circleClip.w) / (previewViewport * abs(projectionMatrix[1][1]));
        vec3 transformed = position + normalize(position) * circleSide * max(circleHalfWidth, circlePixels * circleUnit) / max(circleScale, 0.001);
        vCircleSide = circleSide; vCircleArc = circleArc;`);
      shader.fragmentShader='varying float vCircleSide; varying float vCircleArc;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
        diffuseColor.a *= 1.0 - smoothstep(0.75, 1.0, abs(vCircleSide));
        ${dashed?'diffuseColor.a *= 1.0 - smoothstep(0.28, 0.36, abs(fract(vCircleArc) - 0.5));':''}`);
    };
    material.customProgramCacheKey=()=>`railway-selection-circle-v1:${halfWidth}:${pixels}:${dashed}`;return material;
  }
  const cityCircleOutline=circleMaterial('railway-city-outline',TRACK_PAPER,.48,3.3,.96),cityCircleInk=circleMaterial('railway-city-targets',0xffffff,.24,1.65,1);
  const rangeCircleOutline=circleMaterial('railway-connection-range-outline',TRACK_PAPER,.25,1.8,.65,true),rangeCircleInk=circleMaterial('railway-connection-range',GOOD,.11,.85,.85,true);
  function circleBatch(parent,material,capacity,order){
    const batch=new THREE.InstancedMesh(circleGeometry,material,capacity);batch.name=material.name;batch.count=0;batch.visible=false;batch.frustumCulled=false;batch.renderOrder=order;parent.add(batch);return batch;
  }
  const circlePools=[root,mapRoot].map(parent=>({
    cityOutline:circleBatch(parent,cityCircleOutline,2,8),cities:circleBatch(parent,cityCircleInk,2,9),
    rangeOutline:circleBatch(parent,rangeCircleOutline,1,6),range:circleBatch(parent,rangeCircleInk,1,7),
  }));
  const directed=world.gameplay?.economy==='loops';
  const arrowGeometry=new THREE.BufferGeometry();arrowGeometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,.85,-.58,0,-.55,0,0,-.18,0,0,.85,0,0,-.18,.58,0,-.55],3));arrowGeometry.computeVertexNormals();
  const arrowMaterial=new THREE.MeshBasicMaterial({name:'railway-direction-arrows',color:'#f4e6b0',depthWrite:false,side:THREE.DoubleSide,toneMapped:false,fog:false});
  const previewArrowMaterial=arrowMaterial.clone();previewArrowMaterial.depthTest=false;previewArrowMaterial.name='railway-preview-direction-arrows';
  for(const [material,pixels] of [[arrowMaterial,4.2],[previewArrowMaterial,4.8]]){
    material.onBeforeCompile=shader=>{shader.uniforms.arrowViewport=previewViewport;shader.uniforms.arrowPixels={value:pixels};
      shader.vertexShader='uniform float arrowViewport; uniform float arrowPixels;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`vec4 arrowCenter = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float arrowUnit = 2.0 * abs(arrowCenter.w) / (arrowViewport * abs(projectionMatrix[1][1]));
        vec3 transformed = position * max(1.0, arrowPixels * arrowUnit);`);};
    material.customProgramCacheKey=()=>`railway-direction-v1:${pixels}`;
  }
  applyMapNetworkVisibility(arrowMaterial,visibility);
  function arrowPool(parent,preview=false,capacity=2048){const batch=new THREE.InstancedMesh(arrowGeometry,preview?previewArrowMaterial:arrowMaterial,capacity);batch.name=preview?'railway-preview-direction-arrows':'railway-direction-arrows';batch.count=0;batch.frustumCulled=false;batch.renderOrder=preview?18:11;parent.add(batch);return batch;}
  const builtArrows=[arrowPool(root),arrowPool(mapRoot)],draftArrows=[arrowPool(ghost,true),arrowPool(mapGhost,true)];
  function updateArrows(batches,lines){
    const capacity=directed?(lines??[]).filter(line=>line.length>0&&!line.previewOnly).reduce((sum,line)=>sum+Math.max(1,Math.floor(line.length/12)),0):0;
    for(let layer=0;layer<batches.length;layer++){let batch=batches[layer];let index=0;
      if(capacity>batch.instanceMatrix.count){const previous=batch;batch=arrowPool(previous.parent,previous.material===previewArrowMaterial,2**Math.ceil(Math.log2(capacity)));batches[layer]=batch;previous.removeFromParent();previous.dispose();}
      if(directed)for(const line of lines??[]){if(!(line.length>0)||line.previewOnly)continue;
        const count=Math.max(1,Math.floor(line.length/12));for(let i=0;i<count;i++){
          const p=sampleLine(line,line.length*(i+.5)/count),heading=Math.atan2(p.tangent?.z??0,p.tangent?.x??1);
          rigidSurfacePoseMatrix(world,p.x,layer?.86:(p.y??.42)+.12,p.z,Math.PI/2-heading,pose);batch.setMatrixAt(index++,pose);
        }
      }
      batch.count=index;batch.visible=index>0;batch.instanceMatrix.needsUpdate=true;batch.boundingSphere=null;
    }
  }
  const stats={lines:0,stations:0,detailBatches:0,mapBatches:0,rebuilds:0,previewBufferAllocations:0,previewUpdates:0};
  let disposed=false,revision=null,previewResult=null,previewKey='',previewVisible=false;
  let handlePoints=[],handleCount=0,handleIndex=-1,handlesVisible=false;
  const dotGeometry=new THREE.CircleGeometry(1,24),dotMaterial=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,depthTest:false,depthWrite:false,toneMapped:false,fog:false});
  const handleBatches=[root,mapRoot].map(parent=>['railway-handle-rims','railway-handle-centres','railway-handle-pins'].map((name,index)=>{
    const batch=new THREE.InstancedMesh(dotGeometry,dotMaterial,HANDLE_CAPACITY);batch.name=name;batch.count=0;batch.frustumCulled=false;batch.renderOrder=20+index;parent.add(batch);return batch;
  }));
  const pose=new THREE.Matrix4(),scale=new THREE.Vector3(),center=new THREE.Vector3(),corner=new THREE.Vector3(),view=new THREE.Vector3();
  const seenLines=new Set(),seenStations=new Set(),previewLines=[],invalidLines=[],fallbackSamples=new WeakMap(),guideSamples=[],activeGuidePoints=[],invalidIndices=new Set();
  const stationGeometry=new THREE.BoxGeometry(6.4,.21,2.4);stationGeometry.translate(0,.105,0);
  const stationEdges=new THREE.EdgesGeometry(stationGeometry);
  function dynamicBuffer(size,ribbon=true){
    const geometry=new THREE.BufferGeometry(),attributes=ribbon?{position:3,previewOffset:3,previewSide:1,previewDistance:1}:{position:3,lineDistance:1};
    for(const [name,stride]of Object.entries(attributes))geometry.setAttribute(name,new THREE.BufferAttribute(new Float32Array(size*stride),stride).setUsage(THREE.DynamicDrawUsage));
    geometry.setDrawRange(0,0);stats.previewBufferAllocations++;return geometry;
  }
  function makePreviewPool(group,map){
    const pool={group,map,capacity:8192,geometry:dynamicBuffer(8192),meshes:[],invalidCapacity:2048,invalidGeometry:dynamicBuffer(2048),invalidMeshes:[],stations:[],guideCapacity:1024,guideGeometry:dynamicBuffer(1024,false)};
    for(let i=0;i<previewMaterials.length;i++){
      const mesh=new THREE.Mesh(pool.geometry,previewMaterials[i]);mesh.name=i===1?'railway-route-preview':previewMaterials[i].name;mesh.frustumCulled=false;mesh.renderOrder=11+i;mesh.visible=false;pool.meshes.push(mesh);group.add(mesh);
    }
    for(let i=0;i<invalidMaterials.length;i++){
      const mesh=new THREE.Mesh(pool.invalidGeometry,invalidMaterials[i]);mesh.name=invalidMaterials[i].name;mesh.frustumCulled=false;mesh.renderOrder=13+i;mesh.visible=false;pool.invalidMeshes.push(mesh);group.add(mesh);
    }
    pool.guide=new THREE.Line(pool.guideGeometry,blockedGuideMaterial);pool.guide.name='blocked-railway-guide';pool.guide.renderOrder=15;pool.guide.frustumCulled=false;pool.guide.visible=false;group.add(pool.guide);
    return pool;
  }
  const previewPools=[makePreviewPool(ghost,false),makePreviewPool(mapGhost,true)];
  function reservePreview(pool,count,kind='route'){
    const guide=kind==='guide',invalid=kind==='invalid',capacityKey=guide?'guideCapacity':invalid?'invalidCapacity':'capacity',geometryKey=guide?'guideGeometry':invalid?'invalidGeometry':'geometry';
    if(count<=pool[capacityKey])return;
    pool[capacityKey]=2**Math.ceil(Math.log2(count));const old=pool[geometryKey];pool[geometryKey]=dynamicBuffer(pool[capacityKey],!guide);
    if(guide)pool.guide.geometry=pool[geometryKey];else for(const mesh of invalid?pool.invalidMeshes:pool.meshes)mesh.geometry=pool[geometryKey];old.dispose();
  }
  function uploadPreview(geometry,count){
    geometry.setDrawRange(0,count);geometry.boundingBox=null;geometry.boundingSphere=null;
    for(const attribute of Object.values(geometry.attributes)){attribute.clearUpdateRanges();attribute.addUpdateRange(0,count*attribute.itemSize);attribute.needsUpdate=true;}
  }
  function writePreviewVertex(pool,geometry,index,point,nx,nz,side,distance){
    const height=pool.map?.81:(point.y??0)+.06,attributes=geometry.attributes;
    surfacePoint(world,point.x,height,point.z,center);surfacePoint(world,point.x+nx,height,point.z+nz,corner);corner.sub(center);
    attributes.position.setXYZ(index,center.x,center.y,center.z);attributes.previewOffset.setXYZ(index,corner.x*side,corner.y*side,corner.z*side);attributes.previewSide.setX(index,side);attributes.previewDistance.setX(index,distance);
  }
  function updateRoutes(lines=previewLines,kind='route'){
    const invalid=kind==='invalid';let vertexCount=0;for(const points of lines)vertexCount+=(points.length-1)*6;
    for(const pool of previewPools){
      reservePreview(pool,vertexCount,kind);let index=0;const geometry=invalid?pool.invalidGeometry:pool.geometry;
      for(const points of lines){let distance=points[0].distance??0;for(let i=1;i<points.length;i++){
        const a=points[i-1],b=points[i],previous=points[Math.max(0,i-2)],next=points[Math.min(points.length-1,i+1)];
        const aLength=Math.hypot(b.x-previous.x,b.z-previous.z)||1,bLength=Math.hypot(next.x-a.x,next.z-a.z)||1;
        const anx=a.tangent?.z??(b.z-previous.z)/aLength,anz=a.tangent?-a.tangent.x:-(b.x-previous.x)/aLength;
        const bnx=b.tangent?.z??(next.z-a.z)/bLength,bnz=b.tangent?-b.tangent.x:-(next.x-a.x)/bLength;
        const nextDistance=distance+Math.hypot(b.x-a.x,b.z-a.z);
        writePreviewVertex(pool,geometry,index++,a,anx,anz,-1,distance);writePreviewVertex(pool,geometry,index++,b,bnx,bnz,-1,nextDistance);writePreviewVertex(pool,geometry,index++,a,anx,anz,1,distance);
        writePreviewVertex(pool,geometry,index++,a,anx,anz,1,distance);writePreviewVertex(pool,geometry,index++,b,bnx,bnz,-1,nextDistance);writePreviewVertex(pool,geometry,index++,b,bnx,bnz,1,nextDistance);distance=nextDistance;
      }}
      uploadPreview(geometry,vertexCount);for(const mesh of invalid?pool.invalidMeshes:pool.meshes)mesh.visible=vertexCount>0;
    }
  }
  function updateGuide(points,count){
    for(const pool of previewPools){
      reservePreview(pool,count,'guide');const attributes=pool.guideGeometry.attributes;let distance=0;
      for(let i=0;i<count;i++){
        surfacePoint(world,points[i].x,.84,points[i].z,center);
        if(i)distance+=Math.hypot(center.x-attributes.position.getX(i-1),center.y-attributes.position.getY(i-1),center.z-attributes.position.getZ(i-1));
        attributes.position.setXYZ(i,center.x,center.y,center.z);attributes.lineDistance.setX(i,distance);
      }
      uploadPreview(pool.guideGeometry,count);pool.guide.visible=count>1;
    }
  }
  function updateStations(stations=[]){
    seenStations.clear();let index=0;
    for(const item of stations){
      if(seenStations.has(item.id))continue;seenStations.add(item.id);
      for(const pool of previewPools){
        let platform=pool.stations[index];
        if(!platform){
          platform=new THREE.Mesh(stationGeometry,ghostMaterial);platform.name='railway-station-preview';platform.renderOrder=16;platform.matrixAutoUpdate=false;
          const outline=new THREE.LineSegments(stationEdges,ghostEdgeMaterial);outline.renderOrder=17;platform.add(outline);pool.stations.push(platform);pool.group.add(platform);
        }
        platform.visible=true;rigidSurfacePoseMatrix(world,item.x,pool.map?.81:item.y??0,item.z,item.rotation??0,platform.matrix);platform.matrixWorldNeedsUpdate=true;
      }
      index++;
    }
    for(const pool of previewPools)for(let i=index;i<pool.stations.length;i++)pool.stations[i].visible=false;
  }
  function clear(group,{materials=false}={}){
    const geometries=new Set();group.traverse(mesh=>{if(mesh.isMesh||mesh.isLine)geometries.add(mesh.geometry);});
    for(const geometry of geometries)geometry.dispose();group.clear();
    if(materials){for(const material of group.userData.ownedMaterials??[])material.dispose();group.userData.ownedMaterials=[];}
  }
  function mapStrip(points,width,height,material,target=mapNetwork){
    if(points.length<2)return;
    const positions=[],offsets=[];
    for(let i=1;i<points.length;i++){
      const pair=[points[i-1],points[i]],corners=[];
      for(const point of pair){
        const dx=pair[1].x-pair[0].x,dz=pair[1].z-pair[0].z,length=Math.hypot(dx,dz)||1;
        const nx=point.tangent?.z??dz/length,nz=point.tangent?-point.tangent.x:-dx/length;
        surfacePoint(world,point.x,height,point.z,center);
        for(const sign of [-1,1]){
          surfacePoint(world,point.x+nx*sign*width/2,height,point.z+nz*sign*width/2,corner);
          corners.push({point:corner.clone(),offset:corner.clone().sub(center)});
        }
      }
      for(const index of [0,2,1,1,2,3]){corners[index].point.toArray(positions,positions.length);corners[index].offset.toArray(offsets,offsets.length);}
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('railwayOffset',new THREE.Float32BufferAttribute(offsets,3));geometry.computeBoundingSphere();
    const mesh=new THREE.Mesh(geometry,material);mesh.name='railway-map-stroke';mesh.renderOrder=10;target.add(mesh);return mesh;
  }
  function buildPaths(paths){
    if(!paths?.length)return;
    const group=new THREE.Group();network.add(group);
    for(const mesh of buildCityStreets(group,{...world,cityStreets:paths})){
      const original=mesh.geometry;mesh.geometry=tessellateSurfaceGeometry(original,.6);original.dispose();const positions=mesh.geometry.attributes.position;
      for(let i=0;i<positions.count;i++){
        const x=positions.getX(i),z=positions.getZ(i);surfacePoint(world,x,worldSurface(world,x,z).height+STREET_HEIGHT,z,center);positions.setXYZ(i,center.x,center.y,center.z);
      }
      positions.needsUpdate=true;mesh.geometry.computeVertexNormals();mesh.geometry.computeBoundingSphere();mesh.castShadow=false;
    }
    for(const path of paths)mapStrip(path.points,path.width??.7,.64,mapPathMaterial);
  }
  function sync(snapshot={}){
    if(disposed||snapshot.revision!==undefined&&snapshot.revision===revision)return false;
    clear(network,{materials:true});clear(mapNetwork);buildPaths(snapshot.paths);
    const lines=unique(snapshot.lines).filter(line=>line.length>0),railWorld={...world,lines};
    if(lines.length){
      const joined=buildJoinedSettlementTracks(network,world,lines);
      buildRailways(network,railWorld,{...(surfaceFor(world)?{surfaceRoot:network}:{}),skipTrackBed:!!joined,skipRails:!!joined});
    }
    const palettes=new Map(),stations=unique(snapshot.stations);
    for(const item of stations){
      if(!palettes.has(item.ownerId))palettes.set(item.ownerId,createPlayerPalette(players.get(item.ownerId)));
      const palette=palettes.get(item.ownerId),building=station(network,{palette});
      person(building,{x:.65,y:.21,z:.83,color:palette.body,rotation:Math.PI});person(building,{x:2.22,y:.21,z:.83,color:palette.accent,variant:1});
      rigidSurfacePoseMatrix(world,item.x,item.y??0,item.z,item.rotation??0,pose);building.applyMatrix4(pose);
      const stationPoints=[{x:item.x-Math.cos(item.rotation??0)*2.8,z:item.z+Math.sin(item.rotation??0)*2.8},{x:item.x+Math.cos(item.rotation??0)*2.8,z:item.z-Math.sin(item.rotation??0)*2.8}];
      mapStrip(stationPoints,1.1,.77,mapRim);mapStrip(stationPoints,.45,.78,mapInk);
    }
    if(network.children.length)bakeMaterialColors(consolidate(network));
    for(const palette of palettes.values())for(const material of Object.values(palette))material.dispose();
    for(const line of lines){const points=pointsFor(line);mapStrip(points,.84,.73,mapRim);mapStrip(points,.42,.74,mapInk);}
    if(mapNetwork.children.length)consolidate(mapNetwork);
    for(const mesh of mapNetwork.children){mesh.name='railway-map-stroke';mesh.renderOrder=10;mesh.castShadow=mesh.receiveShadow=false;}
    updateArrows(builtArrows,lines);
    stats.lines=lines.length;stats.stations=stations.length;stats.detailBatches=network.children.length;stats.mapBatches=mapNetwork.children.length;stats.rebuilds++;
    revision=snapshot.revision??(revision??0)+1;network.updateMatrixWorld(true);return true;
  }
  const cityRadius=city=>Math.max(3.4,Number.isFinite(city.radius)?city.radius:3.4)+1.2;
  function refreshCircles(source,target,result,range){
    const selected=source?[source]:[];if(target&&target.id!==source?.id)selected.push(target);
    for(let layer=0;layer<circlePools.length;layer++){
      const pool=circlePools[layer];pool.cities.count=pool.cityOutline.count=selected.length;
      for(let i=0;i<selected.length;i++){
        const city=selected[i],radius=cityRadius(city),color=city.id===target?.id&&wholeRouteBlocked(result)?BAD:GOOD;
        rigidSurfacePoseMatrix(world,city.x,layer?.82:(city.y??0)+.13,city.z,0,pose);pose.scale(scale.set(radius,1,radius));
        pool.cities.setMatrixAt(i,pose);pool.cityOutline.setMatrixAt(i,pose);pool.cities.setColorAt(i,color);
      }
      pool.range.count=pool.rangeOutline.count=source&&range>0?1:0;
      if(pool.range.count){
        rigidSurfacePoseMatrix(world,source.x,layer?.82:(source.y??0)+.12,source.z,0,pose);pose.scale(scale.set(range,1,range));
        pool.range.setMatrixAt(0,pose);pool.rangeOutline.setMatrixAt(0,pose);
      }
      for(const batch of Object.values(pool)){
        batch.instanceMatrix.needsUpdate=true;if(batch.instanceColor)batch.instanceColor.needsUpdate=true;batch.boundingBox=batch.boundingSphere=null;
      }
    }
  }
  function showCircles(){for(const pool of circlePools)for(const batch of Object.values(pool))batch.visible=previewVisible&&batch.count>0;}
  function preview(result,{cities=[],sourceCityId=null,targetCityId=null,maxConnectionDistance,visible=false,editable=false,handles=result?.handles??[],activeHandle=-1}={}){
    if(disposed)return;
    // Endpoints are model constraints (station or junction positions), not raw
    // pointer positions. Never let an optional drag overlay move their rings.
    if(result?.handles?.length)handles=result.handles;
    const outOfRange=result?.code==='out-of-range';
    handlePoints=handles;handleCount=outOfRange?0:Math.min(HANDLE_CAPACITY,handles.length);handleIndex=activeHandle;handlesVisible=visible&&editable&&!outOfRange;
    const blocked=wholeRouteBlocked(result),color=blocked?BAD:GOOD;
    invalidIndices.clear();for(const bend of result?.invalidBends??[])invalidIndices.add(bend.index);
    for(const layers of handleBatches){
      for(const batch of layers)batch.count=handlesVisible?handleCount:0;
      for(let i=0;i<handleCount;i++){
        const kind=handles[i].kind??handles[i].role,endpoint=kind==='from'||kind==='to',badBend=!endpoint&&invalidIndices.has(handles[i].index??i-1),handleColor=badBend?BAD:color;
        layers[0].setColorAt(i,endpoint?HANDLE_PAPER:badBend?BAD:ENDPOINT_INK);layers[1].setColorAt(i,endpoint?handleColor:HANDLE_PAPER);layers[2].setColorAt(i,endpoint?ENDPOINT_INK:handleColor);
      }
      for(const batch of layers)if(batch.instanceColor)batch.instanceColor.needsUpdate=true;
    }
    previewVisible=visible;ghost.visible=mapGhost.visible=visible&&!!result&&!outOfRange;
    const source=cities.find(city=>city.id===sourceCityId),target=cities.find(city=>city.id===targetCityId),rangeValue=result?.range?.maxConnectionDistance??maxConnectionDistance;
    const range=Number.isFinite(rangeValue)&&rangeValue>0?rangeValue:0;
    const key=`${source?.id}:${source?.x}:${source?.y}:${source?.z}:${source?.radius}:${target?.id}:${target?.x}:${target?.y}:${target?.z}:${target?.radius}:${blocked}:${range}`;
    if(key!==previewKey){refreshCircles(source,target,result,range);previewKey=key;}showCircles();
    // The preview flow publishes an immutable result for every changed key.
    // Waiting for validation or holding a stationary handle needs no uploads.
    if(result===previewResult)return;previewResult=result;stats.previewUpdates++;
    ghostMaterial.color.copy(blocked?BAD:TRACK_PAPER);ghostEdgeMaterial.color.copy(color);blockedGuideMaterial.color.copy(blocked?BAD:TRACK_INK);
    previewMaterials[0].color.copy(TRACK_PAPER);previewMaterials[1].color.copy(blocked?BAD:TRACK_INK);
    previewLines.length=invalidLines.length=0;seenLines.clear();
    for(const bend of outOfRange?[]:result?.invalidBends??[])if(bend.points?.length>1)invalidLines.push(bend.points);
    for(const line of outOfRange?[]:result?.lines??[]){
      if(seenLines.has(line.id)||!(line.length>0))continue;seenLines.add(line.id);
      let points=line.points;
      if(!points?.length){points=fallbackSamples.get(line);if(!points){points=pointsFor(line);fallbackSamples.set(line,points);}}
      if(points.length>1)previewLines.push(points);
    }
    let guideCount=0;
    if(result&&!outOfRange&&!previewLines.length){
      const source=result.handles?.find(handle=>(handle.kind??handle.role)==='from')??result.attachments?.from??cities.find(city=>city.id===(sourceCityId??result.fromCityId));
      const target=result.handles?.find(handle=>(handle.kind??handle.role)==='to')??result.attachments?.to??cities.find(city=>city.id===(targetCityId??result.toCityId));
      if(source&&target){
        const waypoints=result.waypoints??[];
        for(let i=0;i<=waypoints.length;i++){
          const a=i?waypoints[i-1]:source,b=i<waypoints.length?waypoints[i]:target,count=Math.max(2,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/2)+1);
          for(let j=i?1:0;j<count;j++){
            const t=j/(count-1),point=guideSamples[guideCount]??(guideSamples[guideCount]={x:0,y:.78,z:0});point.x=THREE.MathUtils.lerp(a.x,b.x,t);point.z=THREE.MathUtils.lerp(a.z,b.z,t);activeGuidePoints[guideCount]=point;guideCount++;
          }
        }
      }
    }
    // Even an impossible placement retains the requested corridor. Its outline
    // connects the snapped endpoints and the dashed centre remains editable.
    activeGuidePoints.length=guideCount;if(guideCount>1)previewLines.push(activeGuidePoints);
    updateRoutes();updateRoutes(invalidLines,'invalid');updateStations(outOfRange?[]:result?.stations);
    updateGuide(guideSamples,guideCount);updateArrows(draftArrows,outOfRange?[]:result?.lines);
  }
  return{root,mapRoot,sync,preview,stats,get revision(){return revision;},get meshes(){return network.children.filter(mesh=>mesh.isMesh&&mesh.material.userData.sceneStyle!=='window');},
    update({mapBlend=0,camera,viewportHeight=800,zoom=1}={}){
      if(disposed)return;root.visible=mapBlend<.999;mapRoot.visible=mapBlend>.001;
      visibility.value=mapNetworkVisibility(zoom);previewViewport.value=Math.max(1,viewportHeight);
      if(camera){camera.updateMatrixWorld(true);view.set(0,0,0).applyMatrix4(camera.matrixWorldInverse);const e=camera.projectionMatrix.elements,w=e[3]*view.x+e[7]*view.y+e[11]*view.z+e[15];widthScale.value=Math.max(1,2*Math.abs(w)/(Math.max(1,viewportHeight)*Math.abs(e[5]))*3/.42);}
      if(camera&&handlesVisible){const e=camera.projectionMatrix.elements;
        for(let index=0;index<handleCount;index++){
          const handle=handlePoints[index],kind=handle.kind??handle.role,endpoint=kind==='from'||kind==='to';
          surfacePoint(world,handle.x,.8,handle.z,center);view.copy(center).applyMatrix4(camera.matrixWorldInverse);
          const w=e[3]*view.x+e[7]*view.y+e[11]*view.z+e[15],unit=2*Math.abs(w)/(Math.max(1,viewportHeight)*Math.abs(e[5]));
          for(const layers of handleBatches)layers.forEach((batch,layer)=>{
            const pixels=endpoint?(layer===0?12.2:layer===1?9.2:3.1):(layer===0?9.6:layer===1?7:2.1);
            const radius=unit*pixels*(index===handleIndex?1.22:1);pose.compose(center,camera.quaternion,scale.setScalar(radius));batch.setMatrixAt(index,pose);
          });
        }for(const layers of handleBatches)for(const batch of layers)batch.instanceMatrix.needsUpdate=true;
      }
      ghost.visible=mapGhost.visible=previewVisible&&!!previewResult&&previewResult.code!=='out-of-range';showCircles();
    },
    dispose(){
      if(disposed)return;disposed=true;for(const batch of [...builtArrows,...draftArrows])batch.dispose();arrowGeometry.dispose();arrowMaterial.dispose();previewArrowMaterial.dispose();clear(network,{materials:true});clear(mapNetwork);
      for(const pool of previewPools){pool.geometry.dispose();pool.invalidGeometry.dispose();pool.guideGeometry.dispose();pool.group.clear();}stationGeometry.dispose();stationEdges.dispose();
      for(const pool of circlePools)for(const batch of Object.values(pool))batch.dispose();circleGeometry.dispose();
      for(const layers of handleBatches)for(const batch of layers)batch.dispose();dotGeometry.dispose();dotMaterial.dispose();
      for(const material of [mapRim,mapInk,mapPathMaterial,ghostMaterial,ghostEdgeMaterial,blockedGuideMaterial,cityCircleOutline,cityCircleInk,rangeCircleOutline,rangeCircleInk,...previewMaterials,...invalidMaterials])material.dispose();
      root.removeFromParent();mapRoot.removeFromParent();root.clear();mapRoot.clear();
    },
  };
}
