import * as THREE from 'three';
import {installGeometryBVH,geometryBVHTransfers} from './geometry-bvh.js';

export {compileDetailPacket,detailPacketTransfers,clipRailRanges} from './detail-compiler.js';

/** Bounded main-thread GPU cache; expensive geometry is supplied by a worker. */
export function createWorldRenderer(parent,world,{requestChunk,size=192,maxChunks=48,maxVisibleChunks=36,maxPending=2,maxBytes=128*1024*1024,uploadMesh}={}){
  if(typeof requestChunk!=='function')throw new TypeError('Regional rendering requires a worker requestChunk function');
  maxVisibleChunks=Math.min(maxVisibleChunks,maxChunks);
  const root=new THREE.Group();root.name='local-world-detail';parent.add(root);
  const cache=new Map(),pending=new Map(),incoming=new Map(),materials=new Map(),wanted=new Map(),required=new Map(),failures=new Map();
  const frustum=new THREE.Frustum(),projection=new THREE.Matrix4(),direction=new THREE.Vector3();
  const point=new THREE.Vector3(),box=new THREE.Box3(),targetPoint=new THREE.Vector3();
  let frame=0,disposed=false;
  const maxHeight=Math.max(35,...world.mountains.map(m=>m.height));
  const features=[...world.cities,...world.mountains.filter(m=>!m.range),...world.stations];
  const stats={loadedChunks:0,visibleChunks:0,pendingChunks:0,requestedChunks:0,triangles:0,bytes:0,errors:0,requiredChunks:0,prefetchChunks:0,coverageLimited:false,budgetOverflow:false,maxBytes,uploadedMeshes:0,uploadingChunks:0};
  const materialFor=description=>{
    const key=JSON.stringify(description);let entry=materials.get(key);
    if(!entry){entry={material:new THREE.MeshStandardMaterial({name:description.name,
      color:new THREE.Color().fromArray(description.color),roughness:description.roughness,
      metalness:description.metalness,side:description.side,flatShading:true,vertexColors:description.vertexColors}),refs:0};materials.set(key,entry);}
    entry.refs++;return {key,material:entry.material};
  };
  function release(chunk){
    chunk.root.traverse(mesh=>{
      if(!mesh.isMesh)return;mesh.geometry.dispose();
      const entry=materials.get(mesh.userData.materialKey);if(entry&&!--entry.refs){entry.material.dispose();materials.delete(mesh.userData.materialKey);}
    });
    root.remove(chunk.root);cache.delete(chunk.key);stats.bytes-=chunk.bytes;stats.triangles-=chunk.triangles;
  }
  function hydrate(deadline){
    for(const [key,job]of incoming){
      while(job.next<job.packet.meshes.length){
        const data=job.packet.meshes[job.next++],geometry=new THREE.BufferGeometry();
        geometry.setAttribute('position',new THREE.BufferAttribute(data.position,3));
        if(data.index){geometry.setIndex(new THREE.BufferAttribute(data.index,1));}
        if(data.normal){geometry.setAttribute('normal',new THREE.BufferAttribute(data.normal,3));}
        else geometry.computeVertexNormals();
        if(data.color){geometry.setAttribute('color',new THREE.BufferAttribute(data.color,3));}
        // Worker already owns the expensive vertex traversal. A conservative
        // cell bound is enough for culling these material batches.
        const b=job.packet.bounds;
        geometry.boundingSphere=new THREE.Sphere(new THREE.Vector3((b.minX+b.maxX)/2,maxHeight/2,(b.minZ+b.maxZ)/2),
          Math.hypot(b.maxX-b.minX,maxHeight+8,b.maxZ-b.minZ)/2);
        job.triangles+=(data.index?.length??data.position.length/3)/3;
        const material=materialFor(data.material),mesh=new THREE.Mesh(geometry,material.material);
        installGeometryBVH(mesh,data.bvh);
        const buffers=new Set([data.position.buffer,data.normal?.buffer,data.color?.buffer,data.index?.buffer,
          ...geometryBVHTransfers(data.bvh)].filter(Boolean));
        job.bytes+=[...buffers].reduce((n,buffer)=>n+buffer.byteLength,0);
        mesh.userData.materialKey=material.key;mesh.castShadow=true;mesh.receiveShadow=true;job.root.add(mesh);
        if(performance.now()>=deadline)return;
      }
    }
  }
  function publishReady(){
    for(const [key,job]of incoming){
      if(job.next<job.packet.meshes.length||(uploadMesh&&job.uploaded<job.next))continue;
      const b=job.packet.bounds;
      const chunk={key,root:job.root,bounds:new THREE.Box3(new THREE.Vector3(b.minX,-4,b.minZ),
        new THREE.Vector3(b.maxX,maxHeight,b.maxZ)),last:frame,bytes:job.bytes,triangles:job.triangles};
      root.add(job.root);cache.set(key,chunk);incoming.delete(key);
      stats.bytes+=job.bytes;stats.triangles+=job.triangles;stats.loadedChunks=cache.size;
    }
  }
  function releaseIncoming(job){
    job.cancelled=true;
    job.root.traverse(mesh=>{
      if(!mesh.isMesh)return;mesh.geometry.dispose();
      const entry=materials.get(mesh.userData.materialKey);
      if(entry&&!--entry.refs){entry.material.dispose();materials.delete(mesh.userData.materialKey);}
    });
  }
  function warmOne(){
    if(!uploadMesh)return;
    for(const [key,job]of incoming){
      if(job.warming||job.uploaded>=job.next)continue;
      job.warming=true;
      const complete=()=>{if(!disposed&&!job.cancelled){job.uploaded++;job.warming=false;stats.uploadedMeshes++;}};
      const fail=error=>{
        if(disposed||job.cancelled)return;
        releaseIncoming(job);incoming.delete(key);failures.set(key,error);stats.errors++;
        root.userData.lastError=String(error?.message??error);
      };
      try{
        const result=uploadMesh(job.root.children[job.uploaded]);
        if(result?.then)Promise.resolve(result).then(complete,fail);else complete();
      }catch(error){fail(error);}
      // Uploading a large vertex buffer can take measurable driver time.
      // Never start a second mesh in this animation frame, even with spare CPU budget.
      return;
    }
  }

  function request(key,coordinates){
    stats.requestedChunks++;
    const job=Promise.resolve().then(()=>requestChunk(coordinates));
    pending.set(key,job);stats.pendingChunks=pending.size+incoming.size;
    Promise.resolve(job).then(packet=>{pending.delete(key);if(!disposed){
      const group=new THREE.Group();group.name=`detail-${key}`;
      incoming.set(key,{packet,root:group,next:0,uploaded:0,warming:false,bytes:0,triangles:0});
    }},error=>{
      pending.delete(key);if(disposed)return;failures.set(key,error);stats.errors++;root.userData.lastError=String(error?.message??error);
    }).finally(()=>{stats.pendingChunks=pending.size+incoming.size;});
  }
  const xs=world.outline.map(p=>p[0]),zs=world.outline.map(p=>p[1]);
  const extent={minX:Math.min(...xs),maxX:Math.max(...xs),minZ:Math.min(...zs),maxZ:Math.max(...zs)};
  function update(camera,{mapBlend=0,target,budgetMs=5,prewarm=false,coverageCamera=camera}={}){
    if(disposed)return;frame++;root.visible=mapBlend<.999;
    if(!root.visible&&!prewarm)return;
    parent.updateWorldMatrix(true,false);camera.updateMatrixWorld();projection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);frustum.setFromProjectionMatrix(projection);
    coverageCamera.updateMatrixWorld();coverageCamera.getWorldDirection(direction);
    let minX=Infinity,maxX=-Infinity,minZ=Infinity,maxZ=-Infinity;
    for(const x of [-1,1])for(const y of [-1,1]){
      point.set(x,y,0).unproject(coverageCamera);
      const t=Math.abs(direction.y)>1e-5?-point.y/direction.y:0;point.addScaledVector(direction,t);
      minX=Math.min(minX,point.x);maxX=Math.max(maxX,point.x);minZ=Math.min(minZ,point.z);maxZ=Math.max(maxZ,point.z);
    }
    if(target)targetPoint.copy(target);else targetPoint.set((minX+maxX)/2,0,(minZ+maxZ)/2);
    const candidate=(x,z)=>({key:`${x}:${z}`,x:x+size/2,z:z+size/2,size,
      distance:(x+size/2-targetPoint.x)**2+(z+size/2-targetPoint.z)**2});
    required.clear();wanted.clear();
    for(let x=Math.floor(Math.max(extent.minX,minX)/size)*size;x<Math.min(extent.maxX,maxX);x+=size){
      for(let z=Math.floor(Math.max(extent.minZ,minZ)/size)*size;z<Math.min(extent.maxZ,maxZ);z+=size){
        const entry=candidate(x,z);required.set(entry.key,entry);
      }
    }
    // Cities and mountains belong to their centre cell but may extend into a
    // neighbouring visible cell. Their owner region is therefore required too.
    for(const feature of features){
      const radius=feature.radius??4;
      if(feature.x+radius<minX||feature.x-radius>maxX||feature.z+radius<minZ||feature.z-radius>maxZ)continue;
      const entry=candidate(Math.floor(feature.x/size)*size,Math.floor(feature.z/size)*size);required.set(entry.key,entry);
    }
    const candidates=[...required.values()].sort((a,b)=>a.distance-b.distance);
    stats.requiredChunks=required.size;stats.coverageLimited=required.size>maxVisibleChunks;
    for(const entry of candidates.slice(0,maxVisibleChunks))wanted.set(entry.key,entry);
    if(!stats.coverageLimited){
      const prefetch=[];
      for(let x=Math.floor(Math.max(extent.minX,minX-size)/size)*size;x<Math.min(extent.maxX,maxX+size);x+=size){
        for(let z=Math.floor(Math.max(extent.minZ,minZ-size)/size)*size;z<Math.min(extent.maxZ,maxZ+size);z+=size){
          const entry=candidate(x,z);if(!wanted.has(entry.key))prefetch.push(entry);
        }
      }
      prefetch.sort((a,b)=>a.distance-b.distance);
      for(const entry of prefetch){if(wanted.size>=Math.min(maxChunks,required.size+36))break;wanted.set(entry.key,entry);}
    }
    stats.prefetchChunks=wanted.size-Math.min(required.size,maxVisibleChunks);
    stats.visibleChunks=0;
    for(const chunk of cache.values()){
      if(wanted.has(chunk.key))chunk.last=frame;
      box.copy(chunk.bounds).applyMatrix4(parent.matrixWorld);chunk.root.visible=frustum.intersectsBox(box);
      if(chunk.root.visible)stats.visibleChunks++;
    }
    const started=performance.now();hydrate(started+budgetMs);warmOne();publishReady();
    for(const [key,coordinates]of wanted){
      if(pending.size+incoming.size>=maxPending||performance.now()-started>=budgetMs)break;
      const estimate=cache.size?stats.bytes/cache.size:4*1024*1024;
      if(!required.has(key)&&stats.bytes+estimate*(1+pending.size+incoming.size)>maxBytes*.90)continue;
      if(!cache.has(key)&&!pending.has(key)&&!incoming.has(key)&&!failures.has(key))request(key,coordinates);
    }
    if(cache.size>maxChunks||stats.bytes>maxBytes){
      const removable=[...cache.values()].filter(chunk=>!required.has(chunk.key)).sort((a,b)=>{
        const priority=Number(wanted.has(a.key))-Number(wanted.has(b.key));
        return priority||a.last-b.last;
      });
      for(const chunk of removable){if(cache.size<=maxChunks&&stats.bytes<=maxBytes)break;release(chunk);}
    }
    stats.budgetOverflow=stats.bytes>maxBytes;
    stats.loadedChunks=cache.size;stats.pendingChunks=pending.size+incoming.size;
    stats.uploadingChunks=uploadMesh?[...incoming.values()].filter(job=>job.uploaded<job.next).length:0;
  }
  function dispose(){
    if(disposed)return;disposed=true;for(const chunk of [...cache.values()])release(chunk);
    for(const job of incoming.values())releaseIncoming(job);
    root.removeFromParent();wanted.clear();required.clear();pending.clear();incoming.clear();stats.loadedChunks=stats.pendingChunks=0;
  }
  return {root,update,stats,dispose,get ready(){return !stats.coverageLimited&&required.size>0&&[...required.keys()].every(key=>cache.has(key));}};
}
