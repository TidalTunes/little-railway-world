import * as THREE from 'three';

/** Upload one mesh before it becomes visible. Drawing a single triangle still
 * initializes every attribute and index buffer through public Three APIs.
 * Instanced meshes also share their real matrix/color buffers with the proxy. */
export function createGeometryUploader(renderer){
  const target=new THREE.WebGLRenderTarget(1,1,{depthBuffer:false});
  const scene=new THREE.Scene(),camera=new THREE.Camera(),empty=new THREE.BufferGeometry();
  const material=new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false,depthTest:false,toneMapped:false});
  const proxy=new THREE.Mesh(empty,material);proxy.frustumCulled=false;scene.add(proxy);
  const instanced=new WeakMap();let disposed=false;
  function instanceProxy(source){
    if(instanced.has(source))return instanced.get(source);
    const mesh=new THREE.InstancedMesh(empty,material,1);mesh.frustumCulled=false;
    const record={mesh,idleMatrix:mesh.instanceMatrix,matrix:null,color:null};
    // Three attaches GPU buffer disposal to the mesh that first uploads them.
    // Keep one proxy per source, so a never-shown source still frees its warm
    // buffers when it is disposed. These tiny proxies share source lifetime;
    // disposing the uploader cannot free an instance buffer still in use.
    const release=()=>{
      source.removeEventListener('dispose',release);instanced.delete(source);
      mesh.instanceMatrix=record.matrix??record.idleMatrix;mesh.instanceColor=record.color;
      mesh.dispose();mesh.instanceMatrix=record.idleMatrix;mesh.instanceColor=null;
      record.matrix=null;record.color=null;
    };
    source.addEventListener('dispose',release);instanced.set(source,record);return record;
  }
  return {
    upload(mesh){
      if(disposed)return;
      const geometry=mesh.geometry,{start,count}=geometry.drawRange;
      const previousTarget=renderer.getRenderTarget(),shadows=renderer.shadowMap.enabled;
      const face=renderer.getActiveCubeFace?.()??0,level=renderer.getActiveMipmapLevel?.()??0;
      const record=mesh.isInstancedMesh?instanceProxy(mesh):null,active=record?.mesh??proxy;
      try{
        if(record){
          record.matrix=mesh.instanceMatrix;record.color=mesh.instanceColor;
          active.instanceMatrix=record.matrix;active.instanceColor=record.color;
          scene.remove(proxy);scene.add(active);
        }
        active.geometry=geometry;geometry.setDrawRange(0,3);
        renderer.shadowMap.enabled=false;renderer.setRenderTarget(target);renderer.render(scene,camera);
      }finally{
        geometry.setDrawRange(start,count);active.geometry=empty;
        if(record){
          active.instanceMatrix=record.idleMatrix;active.instanceColor=null;
          scene.remove(active);scene.add(proxy);
        }
        try{renderer.setRenderTarget(previousTarget,face,level);}
        finally{renderer.shadowMap.enabled=shadows;}
      }
    },
    dispose(){if(disposed)return;disposed=true;target.dispose();empty.dispose();material.dispose();},
  };
}
