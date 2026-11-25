import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { C } from './palette.js';
import { sampleLine } from './world-model.js';
import { playerColors } from './player-palette.js';
import {prepareMapTerrain} from './map-terrain.js';
import {compileMapTerrainGeometry} from './map-terrain-geometry.js';
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
function cityGlyph(city,player,material,sizeScale=1){
  const level=THREE.MathUtils.clamp(Math.round(Number(city.level)||1),1,10),radius=(1.75+level*.12)*sizeScale;
  const silhouette=level<=3
    ?[[-.61,.48],[.61,.48],[.61,-.10],[0,-.68],[-.61,-.10]]
    :level<=6
      ?[[-.75,.48],[.75,.48],[.75,-.07],[.43,-.07],[.43,-.34],[0,-.68],[-.43,-.34],[-.43,-.07],[-.75,-.07]]
      :[[-.73,.48],[.73,.48],[.73,-.07],[.39,-.07],[.39,-.40],[.18,-.40],[.18,-.74],[-.18,-.74],[-.18,-.40],[-.39,-.40],[-.39,-.07],[-.73,-.07]];
  const colors=player?playerColors(player):{body:C.roof,trim:C.trim};
  const tinted=(points,color,y)=>{
    const indexed=shapeGeometry([points]),geometry=indexed.toNonIndexed();indexed.dispose();
    geometry.translate(0,y,0);
    const values=new Float32Array(geometry.attributes.position.count*3);
    for(let i=0;i<values.length;i+=3){values[i]=color.r;values[i+1]=color.g;values[i+2]=color.b;}
    geometry.setAttribute('color',new THREE.BufferAttribute(values,3));return geometry;
  };
  const halo=tinted(Array.from({length:20},(_,i)=>[Math.cos(i*Math.PI/10)*radius,Math.sin(i*Math.PI/10)*radius]),colors.trim,.094);
  const body=tinted(silhouette.map(([x,z])=>[x*radius,z*radius]),colors.body,.097);
  const geometry=mergeGeometries([halo,body],false);halo.dispose();body.dispose();
  const glyph=new THREE.Mesh(geometry,material);glyph.name=`map-city-${city.id}`;
  glyph.position.set(city.x,0,city.z);glyph.userData={cityId:city.id,ownerId:city.ownerId??null,level};
  return glyph;
}

/** A flat, unlit drawing of the existing world, with no independent simulation. */
export function buildMapWorld(parent,world){
  const root=new THREE.Group();root.name='map-world';parent.add(root);
  const staticRoot=new THREE.Group();staticRoot.name='map-static';root.add(staticRoot);
  const cityRoot=new THREE.Group();cityRoot.name='map-cities';root.add(cityRoot);
  const trainRoot=new THREE.Group();trainRoot.name='map-trains';root.add(trainRoot);
  const players=new Map((world.players??[]).map(player=>[player.id,player]));
  const ownerColors=new Map([...players].map(([id,player])=>[`player:${id}:body`,playerColors(player).body]));
  const trainColor=train=>players.has(train.state?.ownerId)?`player:${train.state.ownerId}:body`
    :LIVERY[train.state?.color]??train.state?.color??'redLight';
  const symbolScale=THREE.MathUtils.clamp(Math.sqrt((world.bounds?.width??130)*(world.bounds?.depth??95)/(130*95)),1,2.6);
  const materials=new Map(),batches=new Map(),ownedGeometries=new Set(),cityInstances=[];
  const stats={cityBatches:0,trainBatches:0,updatedCars:0,staticVertices:0,farTrains:false};
  const routeScale={value:1};
  let disposed=false;
  const material=name=>{
    if(!materials.has(name))materials.set(name,new THREE.MeshBasicMaterial({
      name:`map-${name}`,color:name==='terrain'?0xffffff:ownerColors.get(name)??PALETTE[name.replace('route-','')]??C[name]??C.trim,
      vertexColors:name==='terrain',side:THREE.DoubleSide,toneMapped:false,
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
      for(const index of [0,2,1,1,2,3]){
        const center=index<2?a:b;vertices.push(corners[index].x,y,corners[index].z);
        offsets.push(corners[index].x-center.x,0,corners[index].z-center.z);
      }
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
    geometry.setAttribute('routeOffset',new THREE.Float32BufferAttribute(offsets,3));add(geometry,color);
  };

  const terrain=world.mapTerrain??prepareMapTerrain(world);
  for(const {color,position,vertexColor}of terrain.meshes??compileMapTerrainGeometry(terrain)){
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(position,3));
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
        const step=segment.type==='line'?end-start:Math.max(.4,Math.sqrt(8*(segment.radius??8)*.025));
        const count=Math.max(1,Math.ceil((end-start)/step));
        for(let i=1;i<=count;i++)distances.push(start+(end-start)*i/count);
      }
      const points=distances.map(distance=>sampleLine(line,distance));
      strip(points,.96,.075,'route-paper');strip(points,.42,.078,'route-ink');
    }
  }

  for(const [color,geometries] of batches){
    const geometry=mergeGeometries(geometries,false);ownedGeometries.add(geometry);
    const mesh=new THREE.Mesh(geometry,material(color));mesh.name=`map-${color.replace('route-','')}`;staticRoot.add(mesh);
    stats.staticVertices+=geometry.attributes.position.count;
    geometries.forEach(geometry=>geometry.dispose());
  }
  batches.clear();

  const cityMaterial=new THREE.MeshBasicMaterial({name:'map-city',vertexColors:true,side:THREE.DoubleSide,toneMapped:false});
  materials.set('city-glyph',cityMaterial);
  if((world.cities?.length??0)<=32){
    for(const city of world.cities??[]){
      const glyph=cityGlyph(city,players.get(city.ownerId),cityMaterial,symbolScale);
      ownedGeometries.add(glyph.geometry);cityRoot.add(glyph);
    }
  }else{
    const groups=new Map(),matrix=new THREE.Matrix4();
    for(const city of world.cities){
      const key=`${city.ownerId}:${city.level}`;
      if(!groups.has(key))groups.set(key,[]);groups.get(key).push(city);
    }
    for(const [key,cities]of groups){
      const glyph=cityGlyph(cities[0],players.get(cities[0].ownerId),cityMaterial,symbolScale);
      ownedGeometries.add(glyph.geometry);
      const mesh=new THREE.InstancedMesh(glyph.geometry,cityMaterial,cities.length);
      mesh.name=`map-city-batch-${key}`;mesh.userData.instanceCityIds=cities.map(city=>city.id);
      cities.forEach((city,index)=>{matrix.makeTranslation(city.x,0,city.z);mesh.setMatrixAt(index,matrix);});
      mesh.computeBoundingSphere();cityRoot.add(mesh);cityInstances.push(mesh);
    }
  }
  stats.cityBatches=cityRoot.children.length;

  // Large worlds need wider color marks, while longitudinal size and every
  // carriage centre remain unchanged so adjacent cars keep their real spacing.
  const trainWidthScale=Math.min(symbolScale,1.8);
  const outline=pillGeometry(1.22*trainWidthScale,2.45),body=pillGeometry(.92*trainWidthScale,2.13);
  for(const geometry of [outline,body])ownedGeometries.add(geometry);
  const position=new THREE.Vector3(),forward=new THREE.Vector3(),quaternion=new THREE.Quaternion();
  let sourceTrains=null,instances=[],cachedOwners=[],cachedLiveries=[],cachedParts=[],farMode=false,cityScale=1;
  const cityMatrix=new THREE.Matrix4();
  const addInstances=(geometry,color,count,name)=>{
    const mesh=new THREE.InstancedMesh(geometry,material(color),count);mesh.name=name;
    mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);trainRoot.add(mesh);return mesh;
  };
  // Direct writes avoid a quaternion, matrix, and scene-graph walk per map car.
  const writeMatrix=(mesh,index,x,z,angle,y,active,scaleX=1,scaleZ=1)=>{
    const values=mesh.instanceMatrix.array,start=index*16,c=Math.cos(angle)*active,s=Math.sin(angle)*active;
    values[start]=c*scaleX;values[start+1]=0;values[start+2]=-s*scaleX;values[start+3]=0;
    values[start+4]=0;values[start+5]=active;values[start+6]=0;values[start+7]=0;
    values[start+8]=s*scaleZ;values[start+9]=0;values[start+10]=c*scaleZ;values[start+11]=0;
    values[start+12]=x;values[start+13]=y;values[start+14]=z;values[start+15]=1;
  };
  function update(trains=[],{visible=true,camera,viewportHeight=900,poseBuffer=trains.poseBuffer}={}){
    stats.updatedCars=0;
    if(disposed||!visible)return;
    const unitsPerPixel=camera?.isOrthographicCamera?(camera.top-camera.bottom)/camera.zoom/Math.max(1,viewportHeight):0;
    routeScale.value=Math.max(1,unitsPerPixel*.65/.42);
    const nextCityScale=Math.max(1,unitsPerPixel*4.5/(2.5*symbolScale));
    if(Math.abs(nextCityScale-cityScale)>1e-4){
      cityScale=nextCityScale;
      for(const glyph of cityRoot.children){
        if(glyph.isInstancedMesh){
          for(let index=0;index<glyph.count;index++){
            glyph.getMatrixAt(index,cityMatrix);cityMatrix.elements[0]=cityScale;cityMatrix.elements[10]=cityScale;
            glyph.setMatrixAt(index,cityMatrix);
          }
          glyph.instanceMatrix.needsUpdate=true;glyph.boundingSphere=null;
        }else glyph.scale.set(cityScale,1,cityScale);
      }
    }
    const nextFar=unitsPerPixel>.8;
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
    const scaleX=farMode?Math.max(1,unitsPerPixel*1.2/(1.22*trainWidthScale)):1;
    const scaleZ=farMode?Math.max(1,unitsPerPixel*2.8/2.45):1;
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
        x=position.x;z=position.z;angle=Math.atan2(forward.x,forward.z);
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
