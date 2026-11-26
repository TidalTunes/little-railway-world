import * as THREE from 'three';
import {C} from './palette.js';
import {surfaceFor,surfacePoint,warpGeometryToSurface} from './world-surface.js';
import {tessellateSurfaceGeometry} from './surface-tessellation.js';

/** A cut edge makes the finite Earth section tangible. It sits beneath both
 * representations; the geographic surface itself is never flattened. */
export function createSurfaceShell(world){
  if(!surfaceFor(world))return null;
  const outline=world.outline,depth=32,geometries=[],materials=[];
  const detail=new THREE.Group(),map=new THREE.Group();
  detail.name=map.name='curved-earth-section';
  const dark=C.ocean.clone().lerp(C.rockDark,.48).multiplyScalar(.72);
  const top=C.ocean.clone().multiplyScalar(.76),point=new THREE.Vector3();
  function edge(upper){
    const vertices=[],colors=[];
    for(let i=0;i<outline.length;i++){
      const a=outline[i],b=outline[(i+1)%outline.length],steps=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/8));
      for(let j=0;j<steps;j++){
        const endpoints=[j/steps,(j+1)/steps].map(t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);
        const corners=[[...endpoints[0],upper],[...endpoints[1],upper],[...endpoints[0],-depth],[...endpoints[1],-depth]];
        for(const k of [0,2,1,1,2,3]){
          const [x,z,y]=corners[k];surfacePoint(world,x,y,z,point);vertices.push(point.x,point.y,point.z);
          const color=k<2?top:dark;colors.push(color.r,color.g,color.b);
        }
      }
    }
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
    geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.computeVertexNormals();geometries.push(geometry);
    return geometry;
  }
  const shape=new THREE.Shape(outline.map(([x,z])=>new THREE.Vector2(x,-z)));
  const plane=new THREE.ShapeGeometry(shape);plane.rotateX(-Math.PI/2);plane.translate(0,-depth,0);
  const bottom=tessellateSurfaceGeometry(plane,64);plane.dispose();warpGeometryToSurface(bottom,world);geometries.push(bottom);
  for(const [group,height]of [[detail,-3.4],[map,0]]){
    const edgeMaterial=new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.DoubleSide,toneMapped:false});
    const bottomMaterial=new THREE.MeshBasicMaterial({color:dark,side:THREE.DoubleSide,toneMapped:false});materials.push(edgeMaterial,bottomMaterial);
    group.add(new THREE.Mesh(edge(height),edgeMaterial),new THREE.Mesh(bottom,bottomMaterial));
  }
  let disposed=false;
  return {detail,map,dispose(){if(disposed)return;disposed=true;detail.removeFromParent();map.removeFromParent();
    geometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose());}};
}
