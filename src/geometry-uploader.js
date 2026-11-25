import * as THREE from 'three';

/** Upload one static mesh before it becomes visible. Drawing a single triangle
 * still initializes every attribute and the index buffer through public Three
 * APIs, without shading a full-size frame or compiling terrain materials. */
export function createGeometryUploader(renderer){
  const target=new THREE.WebGLRenderTarget(1,1,{depthBuffer:false});
  const scene=new THREE.Scene(),camera=new THREE.Camera(),empty=new THREE.BufferGeometry();
  const material=new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false,depthTest:false,toneMapped:false});
  const proxy=new THREE.Mesh(empty,material);proxy.frustumCulled=false;scene.add(proxy);
  return {
    upload(mesh){
      const geometry=mesh.geometry,{start,count}=geometry.drawRange;
      const previousTarget=renderer.getRenderTarget(),shadows=renderer.shadowMap.enabled;
      try{
        proxy.geometry=geometry;geometry.setDrawRange(0,3);
        renderer.shadowMap.enabled=false;renderer.setRenderTarget(target);renderer.render(scene,camera);
      }finally{
        geometry.setDrawRange(start,count);proxy.geometry=empty;
        renderer.setRenderTarget(previousTarget);renderer.shadowMap.enabled=shadows;
      }
    },
    dispose(){target.dispose();empty.dispose();material.dispose();},
  };
}
