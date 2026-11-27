import * as THREE from 'three';
import {station,person} from './assets.js';
import {buildRailways} from './railway.js';
import {consolidate,ribbon} from './geometry.js';
import {bakeMaterialColors} from './color-batches.js';
import {createPlayerPalette,playerColors} from './player-palette.js';
import {FARM_VILLAGE_PLAYER} from './farm-villages.js';
import {buildCityStreets,streetFootprint,STREET_HEIGHT} from './city-streets.js';
import {sampleLine,worldSurface} from './world-model.js';
import {surfaceFor,surfacePoint,rigidSurfacePoseMatrix} from './world-surface.js';
import {tessellateSurfaceGeometry} from './surface-tessellation.js';
import {C,M} from './palette.js';
import {applySceneStyle} from './scene-style.js';
import {applyMapNetworkVisibility,mapNetworkVisibility} from './map-symbols.js';

const GOOD=new THREE.Color('#66d9bc'),BAD=new THREE.Color('#f06b66');
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

/** Only committed network revisions rebuild meshes. Ghosts share the exact
 * proposed alignment; neither camera changes nor hover renders resample it. */
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
  const ghostMaterial=new THREE.MeshBasicMaterial({color:GOOD,transparent:true,opacity:.45,depthWrite:false,depthTest:false,side:THREE.DoubleSide,toneMapped:false});
  const ghostEdgeMaterial=new THREE.LineBasicMaterial({color:GOOD,transparent:true,opacity:.90,depthWrite:false,depthTest:false,toneMapped:false});
  const blockedGuideMaterial=new THREE.LineDashedMaterial({color:BAD,dashSize:.65,gapSize:.5,transparent:true,opacity:.9,depthWrite:false,depthTest:false,toneMapped:false});
  const haloGeometry=new THREE.RingGeometry(.90,1,48);haloGeometry.rotateX(-Math.PI/2);
  const haloMaterial=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.85,depthWrite:false,side:THREE.DoubleSide,toneMapped:false});
  const stats={lines:0,stations:0,detailBatches:0,mapBatches:0,rebuilds:0};
  let halos=null,mapHalos=null,haloCapacity=0,disposed=false,revision=null,previewResult=null,previewKey='',previewVisible=false;
  let handlePoints=[],handleIndex=-1,handlesVisible=false;
  const dotGeometry=new THREE.CircleGeometry(1,20),dotRim=new THREE.MeshBasicMaterial({color:'#164c48',depthTest:false,depthWrite:false,toneMapped:false}),
    dotFill=new THREE.MeshBasicMaterial({color:'#f4f3da',depthTest:false,depthWrite:false,toneMapped:false});
  const handleBatches=[root,mapRoot].map(parent=>[dotRim,dotFill].map((material,index)=>{
    const batch=new THREE.InstancedMesh(dotGeometry,material,12);batch.name=index?'railway-handle-centres':'railway-handle-rims';batch.count=0;batch.frustumCulled=false;batch.renderOrder=20+index;parent.add(batch);return batch;
  }));
  const pose=new THREE.Matrix4(),scale=new THREE.Vector3(),center=new THREE.Vector3(),corner=new THREE.Vector3(),view=new THREE.Vector3();
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
    stats.lines=lines.length;stats.stations=stations.length;stats.detailBatches=network.children.length;stats.mapBatches=mapNetwork.children.length;stats.rebuilds++;
    revision=snapshot.revision??(revision??0)+1;network.updateMatrixWorld(true);return true;
  }
  function refreshHalos(cities,sourceCityId,targetCityId,result){
    if(cities.length>haloCapacity){
      for(const batch of [halos,mapHalos]){batch?.removeFromParent();batch?.dispose();}
      haloCapacity=2**Math.ceil(Math.log2(Math.max(8,cities.length)));
      halos=new THREE.InstancedMesh(haloGeometry,haloMaterial,haloCapacity);mapHalos=new THREE.InstancedMesh(haloGeometry,haloMaterial,haloCapacity);
      halos.name=mapHalos.name='railway-city-targets';halos.renderOrder=mapHalos.renderOrder=13;root.add(halos);mapRoot.add(mapHalos);
    }
    if(!halos)return;
    halos.count=mapHalos.count=cities.length;
    cities.forEach((city,index)=>{
      const selected=city.id===sourceCityId||city.id===targetCityId,color=city.id===targetCityId&&result&&!result.valid?BAD:selected?GOOD:playerColors(players.get(city.ownerId)).body;
      const radius=Math.max(3.4,Math.min(6.2,city.radius??3.4))*(selected?1.10:1);
      rigidSurfacePoseMatrix(world,city.x,(city.y??0)+.13,city.z,0,pose);pose.scale(scale.set(radius,1,radius));halos.setMatrixAt(index,pose);halos.setColorAt(index,color);
      rigidSurfacePoseMatrix(world,city.x,.82,city.z,0,pose);pose.scale(scale.set(radius,1,radius));mapHalos.setMatrixAt(index,pose);mapHalos.setColorAt(index,color);
    });
    for(const batch of [halos,mapHalos]){batch.instanceMatrix.needsUpdate=true;if(batch.instanceColor)batch.instanceColor.needsUpdate=true;batch.computeBoundingSphere();}
  }
  function preview(result,{cities=[],sourceCityId=null,targetCityId=null,visible=false,editable=false,handles=result?.handles??[],activeHandle=-1}={}){
    if(disposed)return;
    handlePoints=handles.slice(0,12);handleIndex=activeHandle;handlesVisible=visible&&editable;
    for(const layers of handleBatches)for(const batch of layers)batch.count=handlesVisible?handlePoints.length:0;
    previewVisible=visible;ghost.visible=mapGhost.visible=visible&&!!result;
    const key=`${sourceCityId}:${targetCityId}:${result?.valid}:${cities.map(city=>`${city.id},${city.x},${city.z},${city.radius}`).join(';')}`;
    if(key!==previewKey){refreshHalos(cities,sourceCityId,targetCityId,result);previewKey=key;}
    if(halos)halos.visible=mapHalos.visible=visible;
    if(result===previewResult)return;previewResult=result;clear(ghost);clear(mapGhost);
    ghostMaterial.color.copy(result?.valid?GOOD:BAD);ghostEdgeMaterial.color.copy(ghostMaterial.color);
    if(!result)return;
    const lines=unique(result.lines).filter(line=>line.length>0);
    if(!lines.length&&!result.valid){
      const source=cities.find(city=>city.id===(sourceCityId??result.fromCityId)),target=cities.find(city=>city.id===(targetCityId??result.toCityId));
      if(source&&target){
        const guidePoints=[source,...result.waypoints??[],target],samples=[];
        for(let i=1;i<guidePoints.length;i++){
          const a=guidePoints[i-1],b=guidePoints[i],count=Math.max(2,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/2)+1);
          for(let j=i===1?0:1;j<count;j++){const t=j/(count-1);samples.push({x:THREE.MathUtils.lerp(a.x,b.x,t),z:THREE.MathUtils.lerp(a.z,b.z,t)});}
        }
        for(const [group,map]of [[ghost,false],[mapGhost,true]]){
          const points=samples.map(point=>surfacePoint(world,point.x,.84,point.z,new THREE.Vector3()));
          const guide=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),blockedGuideMaterial);guide.name='blocked-railway-guide';guide.renderOrder=12;guide.computeLineDistances();group.add(guide);
        }
      }
    }
    for(const line of lines){
      const points=pointsFor(line),raised=points.map(point=>({...point,y:(point.y??0)+.06}));
      const strip=ribbon(ghost,raised,1.78,ghostMaterial);strip.name='railway-route-preview';strip.castShadow=strip.receiveShadow=false;strip.renderOrder=11;
      if(surfaceFor(world)){const positions=strip.geometry.attributes.position;for(let i=0;i<positions.count;i++){surfacePoint(world,positions.getX(i),positions.getY(i),positions.getZ(i),center);positions.setXYZ(i,center.x,center.y,center.z);}positions.needsUpdate=true;strip.geometry.computeBoundingSphere();}
      mapStrip(points,1.15,.81,ghostMaterial,mapGhost);
    }
    for(const item of unique(result.stations))for(const [target,height]of [[ghost,item.y??0],[mapGhost,.81]]){
      const geometry=new THREE.BoxGeometry(6.4,.21,2.4);geometry.translate(0,.105,0);
      const platform=new THREE.Mesh(geometry,ghostMaterial);platform.name='railway-station-preview';platform.renderOrder=12;
      const outline=new THREE.LineSegments(new THREE.EdgesGeometry(geometry),ghostEdgeMaterial);platform.add(outline);
      rigidSurfacePoseMatrix(world,item.x,height,item.z,item.rotation??0,pose);platform.applyMatrix4(pose);target.add(platform);
    }
  }
  return{root,mapRoot,sync,preview,stats,get revision(){return revision;},get meshes(){return network.children.filter(mesh=>mesh.isMesh&&mesh.material.userData.sceneStyle!=='window');},
    update({mapBlend=0,camera,viewportHeight=800,zoom=1}={}){
      if(disposed)return;root.visible=mapBlend<.999;mapRoot.visible=mapBlend>.001;
      visibility.value=mapNetworkVisibility(zoom);
      if(camera){camera.updateMatrixWorld(true);view.set(0,0,0).applyMatrix4(camera.matrixWorldInverse);const e=camera.projectionMatrix.elements,w=e[3]*view.x+e[7]*view.y+e[11]*view.z+e[15];widthScale.value=Math.max(1,2*Math.abs(w)/(Math.max(1,viewportHeight)*Math.abs(e[5]))*3/.42);}
      if(camera&&handlesVisible){const e=camera.projectionMatrix.elements;
        handlePoints.forEach((handle,index)=>{
          surfacePoint(world,handle.x,.8,handle.z,center);view.copy(center).applyMatrix4(camera.matrixWorldInverse);
          const w=e[3]*view.x+e[7]*view.y+e[11]*view.z+e[15],unit=2*Math.abs(w)/(Math.max(1,viewportHeight)*Math.abs(e[5]));
          for(const layers of handleBatches)layers.forEach((batch,layer)=>{
            const radius=unit*(layer?5.8:8.2)*(index===handleIndex?1.22:1);pose.compose(center,camera.quaternion,scale.setScalar(radius));batch.setMatrixAt(index,pose);
          });
        });for(const layers of handleBatches)for(const batch of layers)batch.instanceMatrix.needsUpdate=true;
      }
      ghost.visible=mapGhost.visible=previewVisible&&!!previewResult;if(halos)halos.visible=mapHalos.visible=previewVisible;
    },
    dispose(){
      if(disposed)return;disposed=true;clear(network,{materials:true});clear(mapNetwork);clear(ghost);clear(mapGhost);
      for(const batch of [halos,mapHalos])batch?.dispose();haloGeometry.dispose();
      for(const layers of handleBatches)for(const batch of layers)batch.dispose();dotGeometry.dispose();dotRim.dispose();dotFill.dispose();
      for(const material of [mapRim,mapInk,mapPathMaterial,ghostMaterial,ghostEdgeMaterial,blockedGuideMaterial,haloMaterial])material.dispose();
      root.removeFromParent();mapRoot.removeFromParent();root.clear();mapRoot.clear();
    },
  };
}
