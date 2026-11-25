import * as THREE from 'three';
import clipping from 'polygon-clipping';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { C } from './palette.js';
import { sampleLine } from './world-model.js';
import { biomeDistance } from './biomes.js';
import { mountainMeshData } from './mountain-shape.js';

const BIOME_COLORS = {farmland:'farmland',forest:'forestFloor',plains:'grass',
  desert:'desert',ocean:'ocean',mountain:'mountainFloor'};
const LIVERY = {coral:'redLight',teal:'teal',gold:'gold',blue:'blue'};
const PALETTE = {
  grass:C.grass.clone().lerp(C.trim,.10), farmland:C.farmland.clone().lerp(C.trim,.08),
  forestFloor:C.forestFloor.clone().lerp(C.grass,.27), desert:C.desert.clone(),
  mountainFloor:C.mountainFloor.clone().lerp(C.grass,.25),
  contour0:C.rock.clone().lerp(C.grass,.10), contour1:C.rockLight.clone().lerp(C.rock,.5),
  contour2:C.rockLight.clone(), contour3:C.rockLight.clone().lerp(C.snow,.42),
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

/** A flat, unlit drawing of the existing world, with no independent simulation. */
export function buildMapWorld(parent,world){
  const root=new THREE.Group();root.name='map-world';parent.add(root);
  const staticRoot=new THREE.Group();staticRoot.name='map-static';root.add(staticRoot);
  const trainRoot=new THREE.Group();trainRoot.name='map-trains';root.add(trainRoot);
  const materials=new Map(),batches=new Map(),ownedGeometries=new Set();
  let disposed=false;
  const material=name=>{
    if(!materials.has(name))materials.set(name,new THREE.MeshBasicMaterial({
      name:`map-${name}`,color:PALETTE[name]??C[name]??C.trim,side:THREE.DoubleSide,toneMapped:false,
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
  const polygon=(points,y,color,x=0,z=0,rotation=0)=>add(shapeGeometry([points]),color,y,x,z,rotation);
  const rectangle=(x,z,width,depth,y,color,rotation=0)=>polygon([
    [-width/2,-depth/2],[width/2,-depth/2],[width/2,depth/2],[-width/2,depth/2],
  ],y,color,x,z,rotation);
  const circle=(x,z,radius,y,color,sides=12)=>polygon(Array.from({length:sides},(_,i)=>[
    Math.cos(i/sides*Math.PI*2)*radius,Math.sin(i/sides*Math.PI*2)*radius,
  ]),y,color,x,z);
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
    [.10,.31,.53,.74].forEach((fraction,i)=>polygons(
      clipping.intersection(mountainContours(mountain,fraction),land),.020+i*.003,`contour${i}`));
    if(mountain.height>8)polygons(clipping.intersection(mountainContours(mountain,.84),land),.033,'snow');
  }

  for(const p of world.placements??[]){
    const scale=p.scale??1,rotation=p.rotation??0;
    if(p.kind==='house'){
      rectangle(p.x,p.z,1.70*scale,1.85*scale,.044,'paper',rotation);
      rectangle(p.x,p.z,1.38*scale,1.53*scale,.046,['roof','roofLight','roofBlue'][Math.abs(p.variant??0)%3],rotation);
      rectangle(p.x,p.z,.12*scale,1.53*scale,.048,'paper',rotation);
    }else if(p.kind==='landmark'){
      circle(p.x,p.z,1.65*scale,.042,'sand');
      rectangle(p.x,p.z,1.9*scale,2.2*scale,.044,'paper',rotation);
      rectangle(p.x,p.z,1.45*scale,1.75*scale,.046,'roofBlue',rotation);
      circle(p.x,p.z,.30*scale,.048,'gold',8);
    }else if(p.kind==='farm'){
      rectangle(p.x,p.z,3*scale,4*scale,.039,'field',rotation);
      rectangle(p.x,p.z,2.76*scale,3.76*scale,.040,'wheat',rotation);
      for(const offset of [-.9,0,.9]){
        const x=p.x+Math.cos(rotation)*offset*scale,z=p.z-Math.sin(rotation)*offset*scale;
        rectangle(x,z,.14*scale,3.5*scale,.042,'farmland',rotation);
      }
    }else if(p.kind==='tree'){
      const radius=.80*scale;
      if(p.variant==='pine'){
        polygon([[-radius,radius*.68],[0,-radius],[radius,radius*.68]],.044,'pineLight',p.x,p.z);
        polygon([[0,-radius],[radius,radius*.68],[0,radius*.68]],.046,'pine',p.x,p.z);
      }else{
        circle(p.x,p.z,radius,.044,p.variant==='gold'?'leafGold':'leaf',8);
        circle(p.x-radius*.16,p.z-radius*.2,radius*.55,.046,p.variant==='gold'?'wheat':'leafLight',8);
      }
    }else if(p.kind==='cactus'){
      rectangle(p.x,p.z,.24*scale,1.22*scale,.044,'cactus',rotation);
      for(const side of [-1,1]){
        const offset=.27*side*scale,x=p.x+Math.cos(rotation)*offset,z=p.z-Math.sin(rotation)*offset;
        rectangle(x,z,.5*scale,.20*scale,.044,'cactus',rotation);
        const tip=.47*side*scale;
        rectangle(p.x+Math.cos(rotation)*tip-Math.sin(rotation)*.15*scale,
          p.z-Math.sin(rotation)*tip-Math.cos(rotation)*.15*scale,.16*scale,.45*scale,.044,'cactus',rotation);
      }
    }else if(p.kind==='rock')circle(p.x,p.z,.43*scale,.041,p.biome==='desert'?'desertRock':'rockLight',5);
    else if(p.kind==='sheep')circle(p.x,p.z,.23*scale,.045,'paper',8);
  }

  // Sparse wave strokes read as water without adding animated map noise.
  if(ocean.length){
    const xs=world.outline.map(p=>p[0]),zs=world.outline.map(p=>p[1]);
    for(let z=Math.min(...zs)+3,row=0;z<Math.max(...zs);z+=5,row++){
      for(let x=Math.min(...xs)+3+(row%2)*2.5;x<Math.max(...xs);x+=7){
        if(biomeDistance(world,'ocean',x,z)<1.8)continue;
        strip([[-1,-.12],[-.5,.12],[0,-.12],[.5,.12],[1,-.12]].map(([dx,dz])=>({x:x+dx,z:z+dz})),.12,.012,'oceanLight');
      }
    }
  }

  for(const line of world.lines){
    for(const range of line.renderRanges??[{start:0,end:line.length}]){
      const count=Math.max(1,Math.ceil((range.end-range.start)/.40));
      const points=Array.from({length:count+1},(_,i)=>sampleLine(line,range.start+(range.end-range.start)*i/count));
      strip(points,.96,.075,'paper');strip(points,.42,.078,'ink');
    }
  }
  for(const station of world.stations??[]){
    circle(station.x,station.z,.95,.085,'paper',20);
    circle(station.x,station.z,.59,.088,'ink',20);
    circle(station.x,station.z,.28,.091,'paper',16);
  }

  for(const [color,geometries] of batches){
    const geometry=mergeGeometries(geometries,false);ownedGeometries.add(geometry);
    const mesh=new THREE.Mesh(geometry,material(color));mesh.name=`map-${color}`;staticRoot.add(mesh);
    geometries.forEach(geometry=>geometry.dispose());
  }
  batches.clear();

  const outline=pillGeometry(1.22,2.45),body=pillGeometry(.92,2.13);
  const window=shapeGeometry([[[-.31,-.72],[.31,-.72],[.31,-.40],[-.31,-.40]]]);
  for(const geometry of [outline,body,window])ownedGeometries.add(geometry);
  const position=new THREE.Vector3(),forward=new THREE.Vector3(),quaternion=new THREE.Quaternion();
  const rotation=new THREE.Quaternion(),scale=new THREE.Vector3(),matrix=new THREE.Matrix4();
  let signature='',instances=[];
  const addInstances=(geometry,color,count,name)=>{
    const mesh=new THREE.InstancedMesh(geometry,material(color),count);mesh.name=name;
    mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);trainRoot.add(mesh);return mesh;
  };
  function update(trains=[]){
    if(disposed)return;
    const next=trains.map((train,i)=>`${train.state?.id??i}:${train.state?.color??'coral'}:${train.parts.length}`).join('|');
    if(next!==signature){
      trainRoot.children.forEach(mesh=>mesh.dispose());trainRoot.clear();instances=[];signature=next;
      const cars=trains.flatMap(train=>train.parts.map(part=>({train,part}))),count=cars.length;
      if(count){
        const outlines=addInstances(outline,'paper',count,'map-train-outlines');
        const windows=addInstances(window,'ink',count,'map-train-windows'),colors=new Map();
        for(const {train} of cars){const color=LIVERY[train.state?.color]??train.state?.color??'redLight';colors.set(color,(colors.get(color)??0)+1);}
        const bodies=new Map([...colors].map(([color,count])=>[color,{mesh:addInstances(body,color,count,`map-train-${color}`),next:0}]));
        cars.forEach(({train},i)=>{
          const body=bodies.get(LIVERY[train.state?.color]??train.state?.color??'redLight');
          instances.push([{mesh:outlines,index:i,y:.120},{mesh:body.mesh,index:body.next++,y:.123},{mesh:windows,index:i,y:.126}]);
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
