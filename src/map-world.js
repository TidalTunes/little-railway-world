import * as THREE from 'three';
import clipping from 'polygon-clipping';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { C } from './palette.js';
import { sampleLine } from './world-model.js';
import { playerColors } from './player-palette.js';
import { mountainMeshData } from './mountain-shape.js';

const BIOME_COLORS = {farmland:'farmland',forest:'forestFloor',plains:'grass',
  desert:'desert',ocean:'ocean',mountain:'mountainFloor'};
const LIVERY = {coral:'redLight',teal:'teal',gold:'gold',blue:'blue'};
const PALETTE = {
  grass:C.grass.clone().lerp(C.trim,.10), farmland:C.farmland.clone().lerp(C.trim,.08),
  forestFloor:C.forestFloor.clone().lerp(C.grass,.27), desert:C.desert.clone(),
  mountainFloor:C.mountainFloor.clone().lerp(C.grass,.25),
  contour0:C.rock.clone().lerp(C.grass,.18), contour1:C.rockLight.clone().lerp(C.rock,.35),
  ink:C.window.clone().lerp(C.rail,.18), paper:C.trim.clone(),
};

function ringForRiver(points,width){
  const left=[],right=[];
  points.forEach((p,i)=>{
    const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)];
    const length=Math.hypot(b.x-a.x,b.z-a.z)||1;
    const nx=(b.z-a.z)/length*width/2,nz=-(b.x-a.x)/length*width/2;
    left.push([p.x+nx,p.z+nz]);right.push([p.x-nx,p.z-nz]);
  });
  const ring=left.concat(right.reverse());return [...ring,ring[0]];
}

function shapeGeometry(rings){
  const shape=new THREE.Shape(rings[0].map(([x,z])=>new THREE.Vector2(x,-z)));
  rings.slice(1).forEach(ring=>shape.holes.push(new THREE.Path(ring.map(([x,z])=>new THREE.Vector2(x,-z)))));
  const geometry=new THREE.ShapeGeometry(shape);geometry.rotateX(-Math.PI/2);return geometry;
}

function pillGeometry(width,length){
  const r=width/2,end=(length-width)/2,s=new THREE.Shape();
  s.moveTo(-r,-end);s.lineTo(-r,end);s.absarc(0,end,r,Math.PI,0,true);
  s.lineTo(r,-end);s.absarc(0,-end,r,0,-Math.PI,true);s.closePath();
  const geometry=new THREE.ShapeGeometry(s,6);geometry.rotateX(-Math.PI/2);return geometry;
}

function mountainContours(mountain,fraction){
  const {vertices,surfaceTriangles}=mountainMeshData(mountain),height=mountain.height*fraction;
  const polygons=[];
  for(const triangle of surfaceTriangles){
    const points=triangle.map(index=>vertices[index]),ring=[];
    for(let i=0;i<3;i++){
      const a=points[i],b=points[(i+1)%3];
      if(a.y>=height)ring.push([a.x,a.z]);
      if((a.y>=height)!==(b.y>=height)){
        const t=(height-a.y)/(b.y-a.y);ring.push([a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t]);
      }
    }
    if(ring.length>=3){
      const snapped=ring.map(([x,z])=>[Math.round(x*1e6)/1e6,Math.round(z*1e6)/1e6]);
      polygons.push([[...snapped,snapped[0]]]);
    }
  }
  return polygons.length?clipping.union(...polygons):[];
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
  const materials=new Map(),batches=new Map(),ownedGeometries=new Set();
  let disposed=false;
  const material=name=>{
    if(!materials.has(name))materials.set(name,new THREE.MeshBasicMaterial({
      name:`map-${name}`,color:ownerColors.get(name)??PALETTE[name]??C[name]??C.trim,side:THREE.DoubleSide,toneMapped:false,
    }));
    return materials.get(name);
  };
  const add=(geometry,color,y=0,x=0,z=0,rotation=0)=>{
    geometry.rotateY(rotation);geometry.translate(x,y,z);
    const plain=geometry.index?geometry.toNonIndexed():geometry;
    if(plain!==geometry)geometry.dispose();
    for(const attribute of Object.keys(plain.attributes))if(attribute!=='position')plain.deleteAttribute(attribute);
    if(!batches.has(color))batches.set(color,[]);batches.get(color).push(plain);
  };
  const polygons=(multi,y,color)=>multi.forEach(rings=>add(shapeGeometry(rings),color,y));
  const strip=(points,width,y,color)=>{
    const vertices=[];
    for(let i=0;i<points.length-1;i++){
      const a=points[i],b=points[i+1];
      const nx=b.x-a.x,nz=b.z-a.z,length=Math.hypot(nx,nz)||1;
      const normal=p=>p.tangent?{x:p.tangent.z,z:-p.tangent.x}:{x:nz/length,z:-nx/length};
      const na=normal(a),nb=normal(b);
      const corners=[{x:a.x-na.x*width/2,z:a.z-na.z*width/2},{x:a.x+na.x*width/2,z:a.z+na.z*width/2},
        {x:b.x-nb.x*width/2,z:b.z-nb.z*width/2},{x:b.x+nb.x*width/2,z:b.z+nb.z*width/2}];
      for(const index of [0,2,1,1,2,3])vertices.push(corners[index].x,y,corners[index].z);
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));add(geometry,color);
  };

  const island=[[world.outline]],riverRing=ringForRiver(world.river.points,world.river.width);
  const bankRing=ringForRiver(world.river.points,world.river.width+1.6);
  const river=clipping.intersection(island,[[riverRing]]),ocean=world.biomes?.ocean??[];
  const water=ocean.length?clipping.union(river,ocean):river;
  const riverBank=clipping.difference(clipping.intersection(island,[[bankRing]]),water);
  const shores=world.biomes?.oceanShore?.length?clipping.union(riverBank,world.biomes.oceanShore):riverBank;
  const land=clipping.difference(island,water,shores);
  polygons(land,0,'grass');polygons(shores,.003,'sand');
  for(const biome of world.biomes?.regions??[]){
    if(biome.type!=='ocean')polygons(clipping.intersection(biome.polygons,land),.004,BIOME_COLORS[biome.type]??'grass');
  }
  polygons(river,.006,'waterLight');polygons(ocean,.007,'ocean');
  for(const mountain of world.mountains){
    [.12,.51].forEach((fraction,i)=>polygons(
      clipping.intersection(mountainContours(mountain,fraction),land),.020+i*.003,`contour${i}`));
    if(mountain.height>8)polygons(clipping.intersection(mountainContours(mountain,.84),land),.033,'snow');
  }

  for(const line of world.lines){
    for(const range of line.renderRanges??[{start:0,end:line.length}]){
      const count=Math.max(1,Math.ceil((range.end-range.start)/.40));
      const points=Array.from({length:count+1},(_,i)=>sampleLine(line,range.start+(range.end-range.start)*i/count));
      strip(points,.96,.075,'paper');strip(points,.42,.078,'ink');
    }
  }

  for(const [color,geometries] of batches){
    const geometry=mergeGeometries(geometries,false);ownedGeometries.add(geometry);
    const mesh=new THREE.Mesh(geometry,material(color));mesh.name=`map-${color}`;staticRoot.add(mesh);
    geometries.forEach(geometry=>geometry.dispose());
  }
  batches.clear();

  const cityMaterial=new THREE.MeshBasicMaterial({name:'map-city',vertexColors:true,side:THREE.DoubleSide,toneMapped:false});
  materials.set('city-glyph',cityMaterial);
  for(const city of world.cities??[]){
    const glyph=cityGlyph(city,players.get(city.ownerId),cityMaterial,symbolScale);
    ownedGeometries.add(glyph.geometry);cityRoot.add(glyph);
  }

  // Large worlds need wider color marks, while longitudinal size and every
  // carriage centre remain unchanged so adjacent cars keep their real spacing.
  const trainWidthScale=Math.min(symbolScale,1.8);
  const outline=pillGeometry(1.22*trainWidthScale,2.45),body=pillGeometry(.92*trainWidthScale,2.13);
  for(const geometry of [outline,body])ownedGeometries.add(geometry);
  const position=new THREE.Vector3(),forward=new THREE.Vector3(),quaternion=new THREE.Quaternion();
  const rotation=new THREE.Quaternion(),scale=new THREE.Vector3(),matrix=new THREE.Matrix4();
  let signature='',instances=[];
  const addInstances=(geometry,color,count,name)=>{
    const mesh=new THREE.InstancedMesh(geometry,material(color),count);mesh.name=name;
    mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);trainRoot.add(mesh);return mesh;
  };
  function update(trains=[]){
    if(disposed)return;
    const next=trains.map((train,i)=>`${train.state?.id??i}:${trainColor(train)}:${train.parts.length}`).join('|');
    if(next!==signature){
      trainRoot.children.forEach(mesh=>mesh.dispose());trainRoot.clear();instances=[];signature=next;
      const cars=trains.flatMap(train=>train.parts.map(part=>({train,part}))),count=cars.length;
      if(count){
        const outlines=addInstances(outline,'paper',count,'map-train-outlines');
        const colors=new Map();
        for(const {train} of cars){const color=trainColor(train);colors.set(color,(colors.get(color)??0)+1);}
        const bodies=new Map([...colors].map(([color,count])=>[color,{mesh:addInstances(body,color,count,`map-train-${color}`),next:0}]));
        cars.forEach(({train},i)=>{
          const body=bodies.get(trainColor(train));
          instances.push([{mesh:outlines,index:i,y:.120},{mesh:body.mesh,index:body.next++,y:.123}]);
        });
      }
    }
    root.updateWorldMatrix(true,false);
    let index=0;
    for(const train of trains)for(const part of train.parts){
      part.getWorldPosition(position);part.getWorldQuaternion(quaternion);
      forward.set(0,0,1).applyQuaternion(quaternion).add(position);
      root.worldToLocal(position);root.worldToLocal(forward);forward.sub(position);
      rotation.setFromAxisAngle(THREE.Object3D.DEFAULT_UP,Math.atan2(forward.x,forward.z));
      scale.setScalar(part.visible&&train.state?.active!==false?1:0);
      for(const instance of instances[index++]??[]){
        position.y=instance.y;matrix.compose(position,rotation,scale);instance.mesh.setMatrixAt(instance.index,matrix);
      }
    }
    trainRoot.children.forEach(mesh=>{mesh.instanceMatrix.needsUpdate=true;});
  }
  function dispose(){
    if(disposed)return;disposed=true;
    trainRoot.children.forEach(mesh=>mesh.dispose());
    ownedGeometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose());
    root.clear();root.removeFromParent();
  }
  return {root,update,dispose};
}
