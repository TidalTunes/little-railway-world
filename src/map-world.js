import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { C } from './palette.js';
import { sampleLine } from './world-model.js';
import { playerColors } from './player-palette.js';
import {prepareMapTerrain} from './map-terrain.js';
import {compileMapTerrainGeometry,MAP_SURFACE_HEIGHT_SCALE} from './map-terrain-geometry.js';
import {surfacePoint,surfaceFrame,surfaceNormal,surfaceTangent,surfaceCoordinates,SURFACE_MAX_SEGMENT} from './world-surface.js';
import {globeMapLighting} from './globe-lighting.js';
import {applySceneStyle} from './scene-style.js';
import {mapSymbolMetrics,mapCityRadius,declutterMapCities,MAP_CITY_DOT_DIAMETER,mapNetworkVisibility,applyMapNetworkVisibility} from './map-symbols.js';
const LIVERY = {coral:'redLight',teal:'teal',gold:'gold',blue:'blue'};
const PALETTE = {
  grass:C.grass.clone().lerp(C.trim,.10), farmland:C.farmland.clone().lerp(C.trim,.08),
  forestFloor:C.forestFloor.clone().lerp(C.grass,.27), desert:C.desert.clone(),
  mountainFloor:C.mountainFloor.clone().lerp(C.grass,.25),
  contour0:C.forestFloor.clone().lerp(C.grass,.32), contour1:C.rockLight.clone().lerp(C.grass,.20),
  ink:C.window.clone().lerp(C.rail,.18), paper:C.trim.clone(),
};

function shapeGeometry(rings){
  const shape=new THREE.Shape(rings[0].map(([x,z])=>new THREE.Vector2(x,-z)));
  rings.slice(1).forEach(ring=>shape.holes.push(new THREE.Path(ring.map(([x,z])=>new THREE.Vector2(x,-z)))));
  const geometry=new THREE.ShapeGeometry(shape);geometry.rotateX(-Math.PI/2);return geometry;
}

function pillGeometry(width,length){
  const r=width/2,end=(length-width)/2,s=new THREE.Shape();
  s.moveTo(-r,-end);s.lineTo(-r,end);s.absarc(0,end,r,Math.PI,0,true);
  s.lineTo(r,-end);s.absarc(0,-end,r,0,-Math.PI,true);s.closePath();
  const geometry=new THREE.ShapeGeometry(s,2);geometry.rotateX(-Math.PI/2);return geometry;
}

// One symbol per settlement: a house, a civic hall, or a stepped tower.
// Overall size changes at every level; silhouette changes only at clear tiers.
function cityGlyph(city,player,material,sizeScale=1,heightScale=1){
  const level=THREE.MathUtils.clamp(Math.round(Number(city.level)||1),1,10),radius=(1.75+level*.12)*sizeScale;
  const silhouette=level<=3
    ?[[-.61,.48],[.61,.48],[.61,-.10],[0,-.68],[-.61,-.10]]
    :level<=6
      ?[[-.75,.48],[.75,.48],[.75,-.07],[.43,-.07],[.43,-.34],[0,-.68],[-.43,-.34],[-.43,-.07],[-.75,-.07]]
      :[[-.73,.48],[.73,.48],[.73,-.07],[.39,-.07],[.39,-.40],[.18,-.40],[.18,-.74],[-.18,-.74],[-.18,-.40],[-.39,-.40],[-.39,-.07],[-.73,-.07]];
  const colors=player?playerColors(player):{body:C.roof,trim:C.trim};
  const tinted=(points,color,y)=>{
    const indexed=shapeGeometry([points]),geometry=indexed.toNonIndexed();indexed.dispose();
    geometry.translate(0,y*heightScale,0);
    const values=new Float32Array(geometry.attributes.position.count*3);
    for(let i=0;i<values.length;i+=3){values[i]=color.r;values[i+1]=color.g;values[i+2]=color.b;}
    geometry.setAttribute('color',new THREE.BufferAttribute(values,3));return geometry;
  };
  const disc=(scale,color,y)=>tinted(Array.from({length:12},(_,i)=>[Math.cos(i*Math.PI/6)*radius*scale,Math.sin(i*Math.PI/6)*radius*scale]),color,y);
  const rim=disc(1,PALETTE.ink,.091),halo=disc(.89,colors.trim,.094);
  const body=tinted(silhouette.map(([x,z])=>[x*radius,z*radius]),colors.body,.097);
  const geometry=mergeGeometries([rim,halo,body],false);rim.dispose();halo.dispose();body.dispose();
  const count=geometry.attributes.position.count,dotColors=new Float32Array(count*3);
  for(let i=0;i<count;i++)colors.body.toArray(dotColors,i*3);
  geometry.setAttribute('cityDotColor',new THREE.BufferAttribute(dotColors,3));
  geometry.setAttribute('cityCompactScale',new THREE.BufferAttribute(new Float32Array(count).fill(MAP_CITY_DOT_DIAMETER/(2*mapCityRadius(level))),1));
  const glyph=new THREE.Mesh(geometry,material);glyph.name=`map-city-${city.id}`;
  glyph.position.set(city.x,0,city.z);glyph.userData={cityId:city.id,ownerId:city.ownerId??null,level};
  return glyph;
}

/** A geographic drawing of the existing world, with no independent simulation. */
export function buildMapWorld(parent,world){
  const spherical=world.surface?.type==='sphere',heightScale=spherical?MAP_SURFACE_HEIGHT_SCALE:1;
  const root=new THREE.Group();root.name='map-world';parent.add(root);
  const staticRoot=new THREE.Group();staticRoot.name='map-static';root.add(staticRoot);
  const cityRoot=new THREE.Group();cityRoot.name='map-cities';root.add(cityRoot);
  const trainRoot=new THREE.Group();trainRoot.name='map-trains';root.add(trainRoot);
  const players=new Map((world.players??[]).map(player=>[player.id,player]));
  const ownerColors=new Map([...players].map(([id,player])=>[`player:${id}:body`,playerColors(player).body]));
  const trainColor=train=>players.has(train.state?.ownerId)?`player:${train.state.ownerId}:body`
    :LIVERY[train.state?.color]??train.state?.color??'redLight';
  const symbolScale=THREE.MathUtils.clamp(Math.sqrt((world.bounds?.width??130)*(world.bounds?.depth??95)/(130*95)),1,2.6);
  const materials=new Map(),batches=new Map(),ownedGeometries=new Set(),cityInstances=[],cityEntries=[],routeMeshes=[];
  const surfacePosition=new THREE.Vector3(),surfaceCorner=new THREE.Vector3(),surfaceCenter=new THREE.Vector3();
  const routeUp=new THREE.Vector3(),routeForward=new THREE.Vector3(),routeRight=new THREE.Vector3();
  const cityTransform=(city,target)=>{
    surfaceFrame(world,city.x,city.z,target);
    target.setPosition(surfacePoint(world,city.x,0,city.z,surfacePosition));return target;
  };
  const stats={cityBatches:0,trainBatches:0,updatedCars:0,staticVertices:0,farTrains:false,declutterPasses:0,cityAttributeUpdates:0,networkVisibility:1};
  const routeScale={value:1},cityScale={value:1},networkVisibility={value:1};
  let disposed=false;
  const material=(name,vertexColors=false)=>{
    if(!materials.has(name))materials.set(name,new THREE.MeshBasicMaterial({
      name:`map-${name}`,color:vertexColors||name==='terrain'?0xffffff:ownerColors.get(name)??PALETTE[name.replace('route-','')]??C[name]??C.trim,
      vertexColors:vertexColors||name==='terrain',side:THREE.DoubleSide,toneMapped:false,
    }));
    const result=materials.get(name);
    if(name.startsWith('route-')&&!result.userData.routeShader){
      result.userData.routeShader=true;
      result.onBeforeCompile=shader=>{
        shader.uniforms.mapRouteScale=routeScale;
        shader.vertexShader='attribute vec3 routeOffset; uniform float mapRouteScale;\n'+shader.vertexShader;
        shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',
          'vec3 transformed = vec3(position) + routeOffset * (mapRouteScale - 1.0);');
      };
      result.customProgramCacheKey=()=> 'map-route-width';
    }
    if(spherical&&['terrain','sand','waterLight','ocean','contour0','contour1','snow'].includes(name)&&!result.userData.surfaceShader){
      result.userData.surfaceShader=true;
      result.onBeforeCompile=shader=>{
        shader.uniforms.mapSurfaceRadius={value:world.surface.radius};
        shader.vertexShader='uniform float mapSurfaceRadius; varying float surfaceLight;\n'+shader.vertexShader;
        shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
          vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
          surfaceLight=0.52+0.52*max(0.0,dot(radialNormal,normalize(vec3(-0.45,0.82,0.35))));`);
        shader.fragmentShader='varying float surfaceLight;\n'+shader.fragmentShader;
        shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',
          'outgoingLight *= surfaceLight;\n#include <opaque_fragment>');
      };
      result.customProgramCacheKey=()=> 'map-surface-light';
      if(world.surface.complete)globeMapLighting(result,world.surface.radius);
    }
    if(!result.userData.mapStyle){
      result.userData.mapStyle=true;
      const symbol=name.startsWith('route-')||name==='paper'||name.startsWith('player:')||Object.values(LIVERY).includes(name);
      applySceneStyle(result,{kind:symbol?'map-symbol':['ocean','waterLight'].includes(name)?'water':'map',
        role:name.endsWith('paper')?'paper':name.endsWith('ink')?'ink':'owner'});
      if(symbol)applyMapNetworkVisibility(result,networkVisibility);
    }
    return result;
  };
  const add=(geometry,color,y=0,x=0,z=0,rotation=0)=>{
    geometry.rotateY(rotation);geometry.translate(x,y,z);
    const plain=geometry.index?geometry.toNonIndexed():geometry;
    if(plain!==geometry)geometry.dispose();
    for(const attribute of Object.keys(plain.attributes))if(attribute!=='position'&&attribute!=='routeOffset')plain.deleteAttribute(attribute);
    if(!batches.has(color))batches.set(color,[]);batches.get(color).push(plain);
  };
  const strip=(points,width,y,color)=>{
    const vertices=[],offsets=[];
    for(let i=0;i<points.length-1;i++){
      const a=points[i],b=points[i+1];
      const nx=b.x-a.x,nz=b.z-a.z,length=Math.hypot(nx,nz)||1;
      const normal=p=>p.tangent?{x:p.tangent.z,z:-p.tangent.x}:{x:nz/length,z:-nx/length};
      const na=normal(a),nb=normal(b);
      const corners=[{x:a.x-na.x*width/2,z:a.z-na.z*width/2},{x:a.x+na.x*width/2,z:a.z+na.z*width/2},
        {x:b.x-nb.x*width/2,z:b.z-nb.z*width/2},{x:b.x+nb.x*width/2,z:b.z+nb.z*width/2}];
      const sphericalCorners=spherical?[a,b].flatMap((center,index)=>{
        const normal=index?nb:na;
        surfacePoint(world,center.x,y*heightScale,center.z,surfaceCenter);
        surfaceNormal(world,center.x,center.z,routeUp);
        surfaceTangent(world,center.x,y*heightScale,center.z,-normal.z,0,normal.x,routeForward).normalize();
        routeRight.crossVectors(routeUp,routeForward).normalize();
        // The map stroke is a physical ribbon before screen-size scaling,
        // so longitude compression never thins polar connections.
        return [-1,1].map(sign=>{
          surfaceCorner.copy(surfaceCenter).addScaledVector(routeRight,sign*width/2);
          surfaceCorner.y+=world.surface.radius;
          surfaceCorner.setLength(world.surface.radius+y*heightScale);
          surfaceCorner.y-=world.surface.radius;
          return surfaceCorner.clone();
        });
      }):null;
      for(const index of [0,2,1,1,2,3]){
        const center=index<2?a:b,corner=corners[index];
        if(spherical){
          surfaceCorner.copy(sphericalCorners[index]);
          surfacePoint(world,center.x,y*heightScale,center.z,surfaceCenter);
          vertices.push(surfaceCorner.x,surfaceCorner.y,surfaceCorner.z);
          offsets.push(surfaceCorner.x-surfaceCenter.x,surfaceCorner.y-surfaceCenter.y,surfaceCorner.z-surfaceCenter.z);
        }else{
          vertices.push(corner.x,y,corner.z);offsets.push(corner.x-center.x,0,corner.z-center.z);
        }
      }
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
    geometry.setAttribute('routeOffset',new THREE.Float32BufferAttribute(offsets,3));add(geometry,color);
  };

  const terrain=world.mapTerrain??prepareMapTerrain(world);
  for(const {color,position,vertexColor,index}of terrain.meshes??compileMapTerrainGeometry(terrain,world)){
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(position,3));
    if(index)geometry.setIndex(new THREE.BufferAttribute(index,1));
    if(vertexColor)geometry.setAttribute('color',new THREE.BufferAttribute(vertexColor,3));
    batches.set(color,[geometry]);
  }

  for(const line of world.lines){
    for(const range of line.renderRanges??[{start:0,end:line.length}]){
      // Straights need only their endpoints. Circular segments use a bounded
      // sagitta, independent of the number of cities or the world's extent.
      const distances=[range.start];
      for(const segment of line.alignment?.segments??[{startDistance:0,endDistance:line.length,type:'arc',radius:8}]){
        const start=Math.max(range.start,segment.startDistance),end=Math.min(range.end,segment.endDistance);
        if(end<=start)continue;
        const chartStep=segment.type==='line'?end-start:Math.max(.4,Math.sqrt(8*(segment.radius??8)*.025));
        const step=spherical?Math.min(SURFACE_MAX_SEGMENT,chartStep):chartStep;
        const count=Math.max(1,Math.ceil((end-start)/step));
        for(let i=1;i<=count;i++)distances.push(start+(end-start)*i/count);
      }
      const points=distances.map(distance=>sampleLine(line,distance));
      strip(points,.96,.075,'route-paper');strip(points,.42,.078,'route-ink');
    }
  }

  for(const [color,geometries] of batches){
    const geometry=mergeGeometries(geometries,false);ownedGeometries.add(geometry);
    const mesh=new THREE.Mesh(geometry,material(color,!!geometry.attributes.color));mesh.name=`map-${color.replace('route-','')}`;staticRoot.add(mesh);
    if(color.startsWith('route-')){mesh.frustumCulled=false;routeMeshes.push(mesh);}
    stats.staticVertices+=geometry.attributes.position.count;
    geometries.forEach(geometry=>geometry.dispose());
  }
  batches.clear();

  const cityMaterial=new THREE.MeshBasicMaterial({name:'map-city',vertexColors:true,side:THREE.DoubleSide,toneMapped:false});
  cityMaterial.onBeforeCompile=shader=>{
    shader.uniforms.mapCityScale=cityScale;
    shader.vertexShader='uniform float mapCityScale; attribute float cityDetail; attribute float cityCompactScale; attribute vec3 cityDotColor;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <color_vertex>',`#include <color_vertex>
      #ifdef USE_COLOR
        vColor.xyz=mix(cityDotColor,vColor.xyz,cityDetail);
      #endif`);
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',
      'float citySize=mapCityScale*mix(cityCompactScale,1.0,cityDetail); vec3 transformed = vec3(position.x * citySize, position.y, position.z * citySize);');
  };
  cityMaterial.customProgramCacheKey=()=> 'map-city-screen-size-v2';
  applySceneStyle(cityMaterial,{kind:'map-symbol',role:'owner'});
  applyMapNetworkVisibility(cityMaterial,networkVisibility);
  materials.set('city-glyph',cityMaterial);
  const cityEntry=(city,attribute,index=0,instanced=false)=>cityEntries.push({city,attribute,index,instanced,detail:1,target:1,
    anchor:surfacePoint(world,city.x,0,city.z),normal:spherical?surfaceNormal(world,city.x,city.z):null});
  if((world.cities?.length??0)<=32){
    for(const city of world.cities??[]){
      const glyph=cityGlyph(city,players.get(city.ownerId),cityMaterial,symbolScale,heightScale);
      const detailAttribute=new THREE.BufferAttribute(new Float32Array(glyph.geometry.attributes.position.count).fill(1),1);
      detailAttribute.setUsage(THREE.DynamicDrawUsage);glyph.geometry.setAttribute('cityDetail',detailAttribute);cityEntry(city,detailAttribute);
      if(spherical){glyph.matrixAutoUpdate=false;cityTransform(city,glyph.matrix);}
      glyph.frustumCulled=false;
      ownedGeometries.add(glyph.geometry);cityRoot.add(glyph);
    }
  }else{
    const groups=new Map(),matrix=new THREE.Matrix4();
    for(const city of world.cities){
      const key=`${city.ownerId}:${city.level}`;
      if(!groups.has(key))groups.set(key,[]);groups.get(key).push(city);
    }
    for(const [key,cities]of groups){
      const glyph=cityGlyph(cities[0],players.get(cities[0].ownerId),cityMaterial,symbolScale,heightScale);
      const detailAttribute=new THREE.InstancedBufferAttribute(new Float32Array(cities.length).fill(1),1);
      detailAttribute.setUsage(THREE.DynamicDrawUsage);glyph.geometry.setAttribute('cityDetail',detailAttribute);
      ownedGeometries.add(glyph.geometry);
      const mesh=new THREE.InstancedMesh(glyph.geometry,cityMaterial,cities.length);
      // Zoom only changes a shared shader uniform. A few bounded symbol
      // batches are cheaper than uploading every city transform each frame.
      mesh.frustumCulled=false;
      mesh.name=`map-city-batch-${key}`;mesh.userData.instanceCityIds=cities.map(city=>city.id);
      cities.forEach((city,index)=>{cityTransform(city,matrix);mesh.setMatrixAt(index,matrix);cityEntry(city,detailAttribute,index,true);});
      mesh.computeBoundingSphere();cityRoot.add(mesh);cityInstances.push(mesh);
    }
  }
  stats.cityBatches=cityRoot.children.length;
  cityEntries.sort((a,b)=>(b.city.level??1)-(a.city.level??1)||String(a.city.id).localeCompare(String(b.city.id)));
  const cityCameraPosition=new THREE.Vector3(Infinity,0,0),cityCameraQuaternion=new THREE.Quaternion();
  const cityProjection=new THREE.Vector3(),cityNormal=new THREE.Vector3(),cityViewDirection=new THREE.Vector3();
  let cityUnits=NaN,cityViewport=NaN,cityAspect=NaN,declutterClock=Infinity;
  function updateCityDetails(camera,unitsPerPixel,viewportHeight,dt,reducedMotion){
    if(!camera?.isOrthographicCamera||!cityEntries.length)return;
    const aspect=(camera.right-camera.left)/(camera.top-camera.bottom),viewportWidth=viewportHeight*aspect;
    declutterClock+=dt;
    const changed=Math.abs(Math.log(unitsPerPixel/cityUnits))>.015||cityViewport!==viewportHeight||cityAspect!==aspect
      ||camera.position.distanceToSquared(cityCameraPosition)>(unitsPerPixel*2)**2
      ||camera.quaternion.angleTo(cityCameraQuaternion)>.003;
    if(changed&&declutterClock>=.075){
      root.updateWorldMatrix(true,false);camera.getWorldDirection(cityViewDirection);
      const projected=cityEntries.map(entry=>{
        cityProjection.copy(entry.anchor).applyMatrix4(root.matrixWorld).project(camera);
        const front=!entry.normal||cityNormal.copy(entry.normal).transformDirection(root.matrixWorld).dot(cityViewDirection)<-.035;
        return {id:entry.city.id,x:cityProjection.x*viewportWidth/2,y:cityProjection.y*viewportHeight/2,
          radius:mapCityRadius(entry.city.level),previous:entry.target,
          visible:front&&Math.abs(cityProjection.x)<1+2*mapCityRadius(10)/viewportWidth&&Math.abs(cityProjection.y)<1+2*mapCityRadius(10)/viewportHeight&&Math.abs(cityProjection.z)<=1};
      });
      const targets=declutterMapCities(projected,unitsPerPixel);
      for(const entry of cityEntries)entry.target=targets.get(entry.city.id);
      cityCameraPosition.copy(camera.position);cityCameraQuaternion.copy(camera.quaternion);
      cityUnits=unitsPerPixel;cityViewport=viewportHeight;cityAspect=aspect;declutterClock=0;stats.declutterPasses++;
    }
    const easing=reducedMotion?1:1-Math.exp(-12*Math.min(.1,Math.max(0,dt))),dirty=new Set();
    for(const entry of cityEntries){
      const next=Math.abs(entry.detail-entry.target)<.002?entry.target:entry.detail+(entry.target-entry.detail)*easing;
      if(next===entry.detail)continue;entry.detail=next;
      if(entry.instanced)entry.attribute.setX(entry.index,next);else entry.attribute.array.fill(next);
      dirty.add(entry.attribute);
    }
    for(const attribute of dirty){attribute.needsUpdate=true;stats.cityAttributeUpdates++;}
  }

  // Large worlds need wider color marks, while longitudinal size and every
  // carriage centre remain unchanged so adjacent cars keep their real spacing.
  const trainWidthScale=Math.min(symbolScale,1.8);
  const outline=pillGeometry(1.22*trainWidthScale,2.45),body=pillGeometry(.92*trainWidthScale,2.13);
  for(const geometry of [outline,body])ownedGeometries.add(geometry);
  const position=new THREE.Vector3(),forward=new THREE.Vector3(),quaternion=new THREE.Quaternion();
  let sourceTrains=null,instances=[],cachedOwners=[],cachedLiveries=[],cachedParts=[],farMode=false;
  const markerPoint=new THREE.Vector3(),markerUp=new THREE.Vector3(),markerForward=new THREE.Vector3(),markerRight=new THREE.Vector3(),chartPoint={},chartForward={};
  let markerX=NaN,markerZ=NaN;
  const addInstances=(geometry,color,count,name)=>{
    const mesh=new THREE.InstancedMesh(geometry,material(color),count);mesh.name=name;
    mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);trainRoot.add(mesh);return mesh;
  };
  // Direct writes avoid a quaternion, matrix, and scene-graph walk per map car.
  const writeMatrix=(mesh,index,x,z,angle,y,active,scaleX=1,scaleZ=1)=>{
    const values=mesh.instanceMatrix.array,start=index*16,c=Math.cos(angle)*active,s=Math.sin(angle)*active;
    if(spherical){
      if(x!==markerX||z!==markerZ){surfaceNormal(world,x,z,markerUp);markerX=x;markerZ=z;}
      surfacePoint(world,x,y*heightScale,z,markerPoint);
      // Keep glyph size fixed, but derive its heading from the actual route
      // differential: longitude compresses strongly at high globe latitudes.
      surfaceTangent(world,x,y*heightScale,z,s,0,c,markerForward).normalize();
      markerRight.crossVectors(markerUp,markerForward).normalize();
      for(let axis=0;axis<3;axis++){
        values[start+axis]=markerRight.getComponent(axis)*active*scaleX;
        values[start+4+axis]=markerUp.getComponent(axis)*active;
        values[start+8+axis]=markerForward.getComponent(axis)*active*scaleZ;
      }
      values[start+12]=markerPoint.x;values[start+13]=markerPoint.y;values[start+14]=markerPoint.z;
    }else{
      values[start]=c*scaleX;values[start+1]=0;values[start+2]=-s*scaleX;
      values[start+4]=0;values[start+5]=active;values[start+6]=0;
      values[start+8]=s*scaleZ;values[start+9]=0;values[start+10]=c*scaleZ;
      values[start+12]=x;values[start+13]=y;values[start+14]=z;
    }
    values[start+3]=0;values[start+7]=0;values[start+11]=0;values[start+15]=1;
  };
  function update(trains=[],{visible=true,camera,viewportHeight=900,poseBuffer=trains.poseBuffer,dt=1/60,reducedMotion=false}={}){
    stats.updatedCars=0;
    if(disposed||!visible)return;
    const unitsPerPixel=camera?.isOrthographicCamera?(camera.top-camera.bottom)/camera.zoom/Math.max(1,viewportHeight):0;
    const metrics=mapSymbolMetrics(unitsPerPixel,symbolScale,trainWidthScale);
    routeScale.value=metrics.routeScale;cityScale.value=metrics.cityScale;
    networkVisibility.value=stats.networkVisibility=mapNetworkVisibility(camera?.zoom);
    const showNetwork=networkVisibility.value>0;
    cityRoot.visible=trainRoot.visible=showNetwork;
    for(const mesh of routeMeshes)mesh.visible=showNetwork;
    // Traffic keeps simulating; fully hidden atlas marks need no projection,
    // decluttering, matrix uploads or draw calls. Their next frame catches up.
    if(!showNetwork)return;
    updateCityDetails(camera,unitsPerPixel,viewportHeight,dt,reducedMotion);
    // Keep one enlarged marker until individual carriages are naturally at
    // least that long on screen. The old fixed cutoff shrank the new markers
    // abruptly while the player was still viewing the regional map.
    const nextFar=metrics.trainScaleZ>1;
    let changed=sourceTrains!==trains||cachedOwners.length!==trains.length||farMode!==nextFar;
    farMode=nextFar;stats.farTrains=farMode;
    for(let i=0;!changed&&i<trains.length;i++)changed=cachedOwners[i]!==trains[i].state?.ownerId||cachedLiveries[i]!==trains[i].state?.color||cachedParts[i]!==trains[i].parts;
    if(changed){
      trainRoot.children.forEach(mesh=>mesh.dispose());trainRoot.clear();instances=[];sourceTrains=trains;
      cachedOwners=trains.map(train=>train.state?.ownerId);cachedLiveries=trains.map(train=>train.state?.color);cachedParts=trains.map(train=>train.parts);
      const cars=trains.flatMap(train=>(farMode?[train.parts[Math.floor(train.parts.length/2)]]:train.parts).filter(Boolean).map(part=>({train,part}))),count=cars.length;
      if(count){
        const outlines=addInstances(outline,'paper',count,'map-train-outlines');
        const colors=new Map();
        for(const {train}of cars){const color=trainColor(train);colors.set(color,(colors.get(color)??0)+1);}
        const bodies=new Map([...colors].map(([color,count])=>[color,{mesh:addInstances(body,color,count,`map-train-${color}`),next:0}]));
        cars.forEach(({train,part},i)=>{
          const entry=bodies.get(trainColor(train));
          instances.push({train,part,outlineIndex:i,outline:outlines,body:entry.mesh,bodyIndex:entry.next++});
        });
      }
      stats.trainBatches=trainRoot.children.length;
    }
    root.updateWorldMatrix(true,false);
    const scaleX=farMode?metrics.trainScaleX:1;
    const scaleZ=farMode?metrics.trainScaleZ:1;
    for(const instance of instances){
      const {train,part}=instance;let x,z,angle,active;
      if(poseBuffer&&part.userData.poseOnly){
        const index=part.userData.poseIndex*6;x=poseBuffer[index];z=poseBuffer[index+2];
        angle=poseBuffer[index+3];active=poseBuffer[index+4]>0&&train.state?.active!==false?1:0;
      }else if(part.userData.poseOnly){
        x=part.position.x;z=part.position.z;angle=part.rotation.y;active=part.visible&&train.state?.active!==false?1:0;
      }else{
        part.getWorldPosition(position);part.getWorldQuaternion(quaternion);
        forward.set(0,0,1).applyQuaternion(quaternion).add(position);
        root.worldToLocal(position);root.worldToLocal(forward);forward.sub(position);
        if(spherical){
          surfaceCoordinates(world,position,chartPoint);
          surfaceCoordinates(world,forward.add(position),chartForward);
          x=chartPoint.x;z=chartPoint.z;angle=Math.atan2(chartForward.x-x,chartForward.z-z);
        }else{x=position.x;z=position.z;angle=Math.atan2(forward.x,forward.z);}
        active=part.visible&&train.state?.active!==false?1:0;
      }
      writeMatrix(instance.outline,instance.outlineIndex,x,z,angle,.120,active,scaleX,scaleZ);
      writeMatrix(instance.body,instance.bodyIndex,x,z,angle,.123,active,scaleX,scaleZ);stats.updatedCars++;
    }
    trainRoot.children.forEach(mesh=>{mesh.instanceMatrix.needsUpdate=true;});
  }

  function dispose(){
    if(disposed)return;disposed=true;
    trainRoot.children.forEach(mesh=>mesh.dispose());cityInstances.forEach(mesh=>mesh.dispose());
    ownedGeometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose());
    root.clear();root.removeFromParent();
  }
  return {root,update,dispose,stats};
}
