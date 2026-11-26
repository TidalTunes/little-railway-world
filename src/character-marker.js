import * as THREE from 'three';
import {C} from './palette.js';
import {surfaceFor,surfacePoint,surfaceNormal} from './world-surface.js';

function badgeGeometry(){
  const positions=[],colors=[],segments=40;
  const vertex=(radius,angle,color)=>{positions.push(Math.cos(angle)*radius,Math.sin(angle)*radius,0);colors.push(color.r,color.g,color.b);};
  // Adjacent annuli share their edges: no overlapping coplanar disks, textures,
  // transparent borders or extra draw calls for the three crisp color bands.
  for(const [inner,outer,color]of [[0,.61,C.redLight],[.61,.87,C.trim],[.87,1,C.teal]]){
    for(let i=0;i<segments;i++){
      const a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2;
      vertex(inner,a,color);vertex(outer,a,color);vertex(outer,b,color);
      if(inner>0){vertex(inner,a,color);vertex(outer,b,color);vertex(inner,b,color);}
    }
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.computeBoundingSphere();return geometry;
}

/** A location pin attached to the same surface position as the traveller.
 * The actual character stays in the world; this small companion dot only
 * becomes necessary when a person would be less than a few pixels tall. */
export function createCharacterMarker(scene,mapScene,world){
  const geometry=badgeGeometry();
  const material=new THREE.MeshBasicMaterial({vertexColors:true,transparent:true,depthTest:false,depthWrite:false,toneMapped:false});
  const overview=new THREE.Mesh(geometry,material),map=new THREE.Mesh(geometry,material.clone());
  overview.name='character-overview-marker';map.name='character-map-marker';overview.renderOrder=map.renderOrder=20;
  overview.visible=map.visible=false;scene.add(overview);mapScene.add(map);
  const base=new THREE.Vector3(),normal=new THREE.Vector3(),top=new THREE.Vector3(),eye=new THREE.Vector3(),viewPosition=new THREE.Vector3();
  const projectedBase=new THREE.Vector3(),projectedTop=new THREE.Vector3();
  let characterReadable=false;
  const smooth=(a,b,value)=>{const t=THREE.MathUtils.clamp((value-a)/(b-a),0,1);return t*t*(3-2*t);};
  function size(camera,position,viewportHeight){
    viewPosition.copy(position).applyMatrix4(camera.matrixWorldInverse);
    const e=camera.projectionMatrix.elements,w=e[3]*viewPosition.x+e[7]*viewPosition.y+e[11]*viewPosition.z+e[15];
    return 2*Math.abs(w)/(Math.max(1,viewportHeight)*Math.abs(e[5]));
  }
  return{root:overview,mapRoot:map,get characterReadable(){return characterReadable;},
    update({position,initialized=false,camera,mapBlend=0,walking=false,walkingWeight=walking?1:0,viewportHeight=800}={}){
      overview.visible=map.visible=characterReadable=false;if(!initialized||!position||!camera)return;
      camera.updateMatrixWorld(true);
      surfacePoint(world,position.x,position.y??0,position.z,base);surfaceNormal(world,position.x,position.z,normal);
      if(surfaceFor(world)&&normal.dot(eye.copy(camera.position).sub(base))<=0)return;
      top.copy(base).addScaledVector(normal,.96);projectedBase.copy(base).project(camera);projectedTop.copy(top).project(camera);
      if(projectedBase.z < -1||projectedBase.z>1||Math.abs(projectedBase.x)>1.08||Math.abs(projectedBase.y)>1.08)return;
      const height=Math.abs(projectedTop.y-projectedBase.y)*viewportHeight/2;
      // Retain a broad overlap with the locator's 4–12px fade. Below five
      // pixels an articulated person cannot add useful detail, so the caller
      // may skip its individual mesh and shadow draws while keeping the same
      // persistent scene object and its location pin.
      characterReadable=height>=5;
      const opacity=(1-smooth(4,12,height))*(1-smooth(.3,.9,walkingWeight));
      if(opacity>.001&&mapBlend<.999){
        overview.visible=true;overview.position.copy(base).addScaledVector(normal,.55);overview.quaternion.copy(camera.quaternion);
        overview.scale.setScalar(size(camera,overview.position,viewportHeight)*5.4);overview.material.opacity=opacity;
      }
      if(mapBlend>.001){
        map.visible=true;surfacePoint(world,position.x,surfaceFor(world)?2.4:.62,position.z,map.position);
        map.quaternion.copy(camera.quaternion);map.scale.setScalar(size(camera,map.position,viewportHeight)*6.5);map.material.opacity=1;
      }
    },
    dispose(){overview.removeFromParent();map.removeFromParent();geometry.dispose();overview.material.dispose();map.material.dispose();},
  };
}
