import * as THREE from 'three';
import {surfaceFor,surfacePoint,surfaceNormal} from './world-surface.js';

const DURATION=2.8;
function coinGeometry(){
  const positions=[],colors=[],segments=12;
  const vertex=(x,y,color)=>{positions.push(x,y,0);colors.push(color.r,color.g,color.b);};
  const rim=new THREE.Color('#b17b26'),gold=new THREE.Color('#f5c756'),shine=new THREE.Color('#ffe6a0');
  for(let i=0;i<segments;i++){
    const a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2;
    vertex(0,0,gold);vertex(Math.cos(a)*.76,Math.sin(a)*.76,gold);vertex(Math.cos(b)*.76,Math.sin(b)*.76,gold);
    const edge=i<6?shine:rim;
    for(const [r,angle]of [[.76,a],[1,a],[1,b],[.76,a],[1,b],[.76,b]])vertex(Math.cos(angle)*r,Math.sin(angle)*r,edge);
  }
  // A quiet impressed stroke gives the coin a recognizable face at 18px.
  for(const [x,y]of [[-.09,-.43],[.09,-.43],[.09,.43],[-.09,-.43],[.09,.43],[-.09,.43]])vertex(x,y,rim);
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.computeBoundingSphere();return geometry;
}

/** One temporary instanced batch per render layer, independent of resident
 * count. Every eligible home gets one coin; offscreen coins cost no draw work. */
export function createSettlementIncomeEffects(scene,mapScene,world){
  const geometry=coinGeometry(),material=new THREE.MeshBasicMaterial({vertexColors:true,transparent:true,depthTest:false,depthWrite:false,toneMapped:false});
  let homes=[],age=DURATION,capacity=0,overview,map;
  const point=new THREE.Vector3(),normal=new THREE.Vector3(),eye=new THREE.Vector3(),projected=new THREE.Vector3();
  const viewPoint=new THREE.Vector3(),up=new THREE.Vector3(),scale=new THREE.Vector3(),matrix=new THREE.Matrix4();
  function allocate(count){
    if(count<=capacity)return;
    for(const mesh of [overview,map]){mesh?.removeFromParent();mesh?.dispose();}
    capacity=Math.max(16,2**Math.ceil(Math.log2(count)));
    overview=new THREE.InstancedMesh(geometry,material,capacity);map=new THREE.InstancedMesh(geometry,material,capacity);
    overview.name='house-income';map.name='house-income-map';
    for(const mesh of [overview,map]){mesh.count=0;mesh.visible=false;mesh.frustumCulled=false;mesh.renderOrder=24;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);}
    scene.add(overview);mapScene.add(map);
  }
  allocate(1);
  return{
    emit(houses){homes=houses.map(({x,y=0,z})=>({x,y,z}));age=0;allocate(homes.length);},
    update(dt,{camera,mapBlend=0,walkingWeight=0,viewportHeight=800,reducedMotion=false}={}){
      age+=Math.max(0,dt);overview.visible=map.visible=false;overview.count=map.count=0;
      if(age>=DURATION){homes=[];return;}if(!camera||walkingWeight>.8)return;
      camera.updateMatrixWorld(true);up.set(0,1,0).applyQuaternion(camera.quaternion);
      const t=age/DURATION,rise=reducedMotion?0:34*(1-(1-t)**2);
      material.opacity=Math.min(1,age/.12,(DURATION-age)/.55)*(1-THREE.MathUtils.smoothstep(walkingWeight,.1,.8));
      let index=0;
      for(const home of homes){
        surfacePoint(world,home.x,home.y+THREE.MathUtils.lerp(2.1,.8,mapBlend),home.z,point);surfaceNormal(world,home.x,home.z,normal);
        if(surfaceFor(world)&&normal.dot(eye.copy(camera.position).sub(point))<=0)continue;
        projected.copy(point).project(camera);if(projected.z< -1||projected.z>1||Math.abs(projected.x)>1.08||Math.abs(projected.y)>1.08)continue;
        viewPoint.copy(point).applyMatrix4(camera.matrixWorldInverse);const e=camera.projectionMatrix.elements;
        const w=e[3]*viewPoint.x+e[7]*viewPoint.y+e[11]*viewPoint.z+e[15],pixel=2*Math.abs(w)/(Math.max(1,viewportHeight)*Math.abs(e[5]));
        point.addScaledVector(up,pixel*(12+rise));scale.setScalar(pixel*10);
        matrix.compose(point,camera.quaternion,scale);overview.setMatrixAt(index,matrix);map.setMatrixAt(index++,matrix);
      }
      overview.count=map.count=index;overview.visible=mapBlend<.999&&index>0;map.visible=mapBlend>.001&&index>0;
      overview.instanceMatrix.needsUpdate=map.instanceMatrix.needsUpdate=true;
    },
    get active(){return age<DURATION&&homes.length>0;},
    get visibleCount(){return Math.max(overview.count,map.count);},
    dispose(){for(const mesh of [overview,map]){mesh.removeFromParent();mesh.dispose();}geometry.dispose();material.dispose();homes=[];},
  };
}
