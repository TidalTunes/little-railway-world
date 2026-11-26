import * as THREE from 'three';
import {C} from './palette.js';
import {surfaceFor,surfacePoint,surfaceCoordinates,warpGeometryToSurface} from './world-surface.js';
import {tessellateSurfaceGeometry} from './surface-tessellation.js';
import {globeMapLighting} from './globe-lighting.js';
import {oceanColor} from './ocean-colors.js';

function createPlanet(world){
  const radius=world.surface.radius,detail=new THREE.Group(),map=new THREE.Group(),resources=[];
  detail.name=map.name='earth-ocean';
  // One closed ocean sphere seals the antimeridian and poles. Land keeps its
  // exact coastline above it; the whole ocean needs no polygon triangulation.
  let oceanColors;
  for(const [group,elevation]of [[map,-.65],[detail,-4.5]]){
    const geometry=new THREE.SphereGeometry(radius+elevation,256,128);
    geometry.translate(0,-radius,0);
    if(!oceanColors){
      const position=geometry.attributes.position,point=new THREE.Vector3(),chart={},sample=new THREE.Color();
      oceanColors=new Float32Array(position.count*3);
      for(let i=0;i<position.count;i++){
        point.fromBufferAttribute(position,i);surfaceCoordinates(world,point,chart);
        oceanColor(world,chart.x,chart.z,sample);sample.toArray(oceanColors,i*3);
      }
    }
    geometry.setAttribute('color',new THREE.BufferAttribute(oceanColors,3));
    const material=globeMapLighting(new THREE.MeshBasicMaterial({color:0xffffff,vertexColors:true,toneMapped:group===detail}),radius);
    resources.push(geometry,material);group.add(new THREE.Mesh(geometry,material));
  }
  let disposed=false;
  return {detail,map,dispose(){if(disposed)return;disposed=true;
    detail.removeFromParent();map.removeFromParent();resources.forEach(resource=>resource.dispose());}};
}

/** A cut edge makes the finite Earth section tangible. It sits beneath both
 * representations; the geographic surface itself is never flattened. */
export function createSurfaceShell(world){
  if(!surfaceFor(world))return null;
  if(world.surface.complete)return createPlanet(world);
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
    const edgeMaterial=new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.DoubleSide,toneMapped:group===detail});
    const bottomMaterial=new THREE.MeshBasicMaterial({color:dark,side:THREE.DoubleSide,toneMapped:group===detail});materials.push(edgeMaterial,bottomMaterial);
    group.add(new THREE.Mesh(edge(height),edgeMaterial),new THREE.Mesh(bottom,bottomMaterial));
  }
  let disposed=false;
  return {detail,map,dispose(){if(disposed)return;disposed=true;detail.removeFromParent();map.removeFromParent();
    geometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose());}};
}
