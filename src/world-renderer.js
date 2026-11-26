import * as THREE from 'three';
import {applyDetailReveal,createDetailDepthMaterial} from './detail-reveal.js';
import {installGeometryBVH,geometryBVHTransfers} from './geometry-bvh.js';
import {surfaceFor,surfaceCoordinates,surfacePoint,surfaceChartRadius,surfaceDistance} from './world-surface.js';

export {compileDetailPacket,detailPacketTransfers,clipRailRanges} from './detail-compiler.js';

/** Bounded main-thread GPU cache; expensive geometry is supplied by a worker. */
export function createWorldRenderer(parent,world,{requestChunk,size=192,maxChunks=48,maxVisibleChunks=Infinity,maxPending=2,maxBytes=128*1024*1024,uploadMesh}={}){
  if(typeof requestChunk!=='function')throw new TypeError('Regional rendering requires a worker requestChunk function');
  // A fixed zoom boundary must be allowed to finish loading its full visible
  // footprint. Portrait views, shallow orbits and polar chart cells can need
  // more cells than the LRU target; only an explicit caller cap limits demand.
  const root=new THREE.Group();root.name='local-world-detail';parent.add(root);
  const cache=new Map(),pending=new Map(),incoming=new Map(),wanted=new Map(),required=new Map(),failures=new Map();
  const frustum=new THREE.Frustum(),coverageFrustum=new THREE.Frustum(),projection=new THREE.Matrix4(),direction=new THREE.Vector3();
  const point=new THREE.Vector3(),box=new THREE.Box3(),targetPoint=new THREE.Vector3();
  const surface=surfaceFor(world),ray=new THREE.Ray(),hit=new THREE.Vector3(),chart={};
  const shell=surface?new THREE.Sphere(new THREE.Vector3(0,-surface.radius,0),surface.radius):null;
  const patchBounds=new THREE.Box3(),cellSphere=new THREE.Sphere(),pole=new THREE.Vector3();
  let frame=0,disposed=false,coverageChecked=false;
  const maxHeight=Math.max(35,...world.mountains.map(m=>m.height));
  const features=[...world.cities,...world.mountains.filter(m=>!m.range),...world.stations];
  // City/station dimensions are physical; authored mountain radii are still
  // geographic footprints. Owner cells must load before either enters view.
  const geographicFeatures=new Set(world.mountains);
  const featureRadii=new Map(features.map(feature=>[feature,geographicFeatures.has(feature)?feature.radius??4
    :surfaceChartRadius(world,feature.x,feature.z,feature.radius??4)]));
  const stats={loadedChunks:0,visibleChunks:0,pendingChunks:0,requestedChunks:0,triangles:0,bytes:0,errors:0,requiredChunks:0,prefetchChunks:0,coverageLimited:false,budgetOverflow:false,maxBytes,uploadedMeshes:0,uploadingChunks:0,revealingChunks:0};
  const materialFor=(description,job)=>{
    const key=JSON.stringify(description);let material=job.materials.get(key);
    if(!material){
      material=applyDetailReveal(new THREE.MeshStandardMaterial({name:description.name,
        color:new THREE.Color().fromArray(description.color),roughness:description.roughness,
        metalness:description.metalness,side:description.side,flatShading:true,vertexColors:description.vertexColors}),job.reveal);
      job.materials.set(key,material);
    }
    return material;
  };
  function releaseResources(chunk){
    chunk.root.traverse(mesh=>{if(mesh.isMesh)mesh.geometry.dispose();});
    for(const material of chunk.materials.values())material.dispose();
    chunk.depthMaterial?.dispose();
  }
  function release(chunk){
    releaseResources(chunk);
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
        const b=job.packet.bounds,renderBounds=job.packet.renderBounds;
        if(renderBounds){
          geometry.boundingBox=new THREE.Box3(new THREE.Vector3().fromArray(renderBounds.min),new THREE.Vector3().fromArray(renderBounds.max));
          geometry.boundingSphere=geometry.boundingBox.getBoundingSphere(new THREE.Sphere());
        }else geometry.boundingSphere=new THREE.Sphere(new THREE.Vector3((b.minX+b.maxX)/2,maxHeight/2,(b.minZ+b.maxZ)/2),
          Math.hypot(b.maxX-b.minX,maxHeight+8,b.maxZ-b.minZ)/2);
        job.triangles+=(data.index?.length??data.position.length/3)/3;
        const mesh=new THREE.Mesh(geometry,materialFor(data.material,job));
        installGeometryBVH(mesh,data.bvh);
        const buffers=new Set([data.position.buffer,data.normal?.buffer,data.color?.buffer,data.index?.buffer,
          ...geometryBVHTransfers(data.bvh)].filter(Boolean));
        job.bytes+=[...buffers].reduce((n,buffer)=>n+buffer.byteLength,0);
        mesh.customDepthMaterial=job.depthMaterial;mesh.castShadow=true;mesh.receiveShadow=true;job.root.add(mesh);
        if(performance.now()>=deadline)return;
      }
    }
  }
  function publishReady(){
    for(const [key,job]of incoming){
      if(job.next<job.packet.meshes.length||(uploadMesh&&job.uploaded<job.next))continue;
      const b=job.packet.bounds;
      const rendered=job.packet.renderBounds;
      const chunk={key,root:job.root,bounds:rendered
        ?new THREE.Box3(new THREE.Vector3().fromArray(rendered.min),new THREE.Vector3().fromArray(rendered.max))
        :new THREE.Box3(new THREE.Vector3(b.minX,-4,b.minZ),new THREE.Vector3(b.maxX,maxHeight,b.maxZ)),
        last:frame,bytes:job.bytes,triangles:job.triangles,reveal:job.reveal,progress:0,
        materials:job.materials,depthMaterial:job.depthMaterial};
      root.add(job.root);cache.set(key,chunk);incoming.delete(key);
      stats.bytes+=job.bytes;stats.triangles+=job.triangles;stats.loadedChunks=cache.size;
    }
  }
  function releaseIncoming(job){
    job.cancelled=true;
    releaseResources(job);
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
    const controller=new AbortController(),task={controller};
    const job=Promise.resolve().then(()=>requestChunk(coordinates,{signal:controller.signal}));
    task.promise=job;pending.set(key,task);stats.pendingChunks=pending.size+incoming.size;
    Promise.resolve(job).then(packet=>{
      if(pending.get(key)!==task)return;
      pending.delete(key);if(!disposed&&wanted.has(key)){
        const group=new THREE.Group();group.name=`detail-${key}`;
        const reveal={value:0};
        incoming.set(key,{packet,root:group,next:0,uploaded:0,warming:false,bytes:0,triangles:0,
          reveal,materials:new Map(),depthMaterial:createDetailDepthMaterial(reveal)});
      }
    },error=>{
      if(pending.get(key)!==task)return;
      pending.delete(key);if(disposed||error?.name==='AbortError')return;
      failures.set(key,error);stats.errors++;root.userData.lastError=String(error?.message??error);
    }).finally(()=>{stats.pendingChunks=pending.size+incoming.size;});
  }

  const xs=world.outline.map(p=>p[0]),zs=world.outline.map(p=>p[1]);
  const extent={minX:Math.min(...xs),maxX:Math.max(...xs),minZ:Math.min(...zs),maxZ:Math.max(...zs)};
  const period=surface?.complete?extent.maxX-extent.minX:0;
  const angularChart=surface?.complete&&surface.projection.type==='equirectangular';
  // The closed ocean shell already covers cells with no terrain or objects.
  // Polygon bounds conservatively retain coastal cells; holes and concave
  // coasts may prefetch extra cells but can never lose an island or shoreline.
  const terrainBounds=angularChart&&Array.isArray(world.biomes?.land)
    ?[...world.biomes.land,...(world.biomes.oceanShore??[]),...(world.biomes.lakeShore??[])].map(polygon=>{
      const result={minX:Infinity,minZ:Infinity,maxX:-Infinity,maxZ:-Infinity};
      for(const [x,z]of polygon[0]){result.minX=Math.min(result.minX,x);result.maxX=Math.max(result.maxX,x);result.minZ=Math.min(result.minZ,z);result.maxZ=Math.max(result.maxZ,z);}
      return result;
    }):null;
  const occupiedBounds=terrainBounds?[...features.map(feature=>{
    const radius=featureRadii.get(feature);return {minX:feature.x-radius,maxX:feature.x+radius,minZ:feature.z-radius,maxZ:feature.z+radius};
  }),...(world.lines??[]).map(line=>{
    const bounds={minX:Infinity,minZ:Infinity,maxX:-Infinity,maxZ:-Infinity};
    for(const point of line.points??[]){bounds.minX=Math.min(bounds.minX,point.x);bounds.maxX=Math.max(bounds.maxX,point.x);bounds.minZ=Math.min(bounds.minZ,point.z);bounds.maxZ=Math.max(bounds.maxZ,point.z);}
    if(Number.isFinite(bounds.minX)){
      const radius=Math.max(surfaceChartRadius(world,bounds.minX,bounds.minZ,4),surfaceChartRadius(world,bounds.maxX,bounds.maxZ,4));
      bounds.minX-=radius;bounds.maxX+=radius;bounds.minZ-=radius;bounds.maxZ+=radius;
    }
    return bounds;
  })]:[];
  const terrainCells=new Map();
  function hasDetail(entry){
    if(!terrainBounds)return true;
    if(!terrainCells.has(entry.key)){
      const left=entry.x-size/2,right=entry.x+size/2,top=entry.z-size/2,bottom=entry.z+size/2;
      const overlaps=(bounds,shift=0)=>bounds.minX+shift<=right&&bounds.maxX+shift>=left&&bounds.minZ<=bottom&&bounds.maxZ>=top;
      terrainCells.set(entry.key,terrainBounds.some(bounds=>overlaps(bounds))
        ||occupiedBounds.some(bounds=>overlaps(bounds)||period&&(overlaps(bounds,-period)||overlaps(bounds,period))));
    }
    return terrainCells.get(entry.key);
  }
  function intersectsCoverage(entry){
    if(!angularChart)return true;
    const p=surface.projection,left=Math.max(extent.minX,entry.x-size/2),right=Math.min(extent.maxX,entry.x+size/2),
      top=Math.max(extent.minZ,entry.z-size/2),bottom=Math.min(extent.maxZ,entry.z+size/2);
    const latitude=p.centralLatitude*Math.PI/180-(top+bottom)/(2*p.radius),halfLatitude=(bottom-top)/(2*p.radius);
    const longitudeScale=Math.cos(Math.max(0,Math.abs(latitude)-halfLatitude));
    surfacePoint(world,(left+right)/2,(maxHeight-4)/2,(top+bottom)/2,cellSphere.center);
    // A path in the chart cannot be longer than its largest local metric.
    // This sphere therefore encloses the complete curved cell and its height.
    cellSphere.radius=(surface.radius+maxHeight)*Math.hypot((right-left)/(2*p.radius)*longitudeScale,halfLatitude)+(maxHeight+4)/2;
    return coverageFrustum.intersectsSphere(cellSphere);
  }
  const longitudeDelta=delta=>period?((delta+period/2)%period+period)%period-period/2:delta;
  function longitudeRanges(min,max){
    if(period&&max-min>=period)return [[extent.minX,extent.maxX]];
    if(!period)return [[Math.max(extent.minX,min),Math.min(extent.maxX,max)]];
    const start=((min-extent.minX)%period+period)%period+extent.minX,end=start+max-min;
    return end<=extent.maxX?[[start,end]]:[[start,extent.maxX],[extent.minX,end-period]];
  }
  function footprint(coverageCamera,target){
    coverageCamera.updateMatrixWorld();coverageCamera.getWorldDirection(direction);
    projection.multiplyMatrices(coverageCamera.projectionMatrix,coverageCamera.matrixWorldInverse);coverageFrustum.setFromProjectionMatrix(projection);
    let minX=Infinity,maxX=-Infinity,minZ=Infinity,maxZ=-Infinity;
    if(surface){
      let missed=false;
      patchBounds.makeEmpty();
      // Both the ground and tallest scenery can enter the frustum. Sample its
      // edges and centre against the real sphere, then request chart cells.
      for(const height of [-4,maxHeight])for(const x of [-1,0,1])for(const y of [-1,0,1]){
        ray.origin.set(x,y,-1).unproject(coverageCamera);ray.direction.copy(direction);shell.radius=surface.radius+height;
        if(!ray.intersectSphere(shell,hit)){missed=true;continue;}
        patchBounds.expandByPoint(hit);
        surfaceCoordinates(world,hit,chart);
        if(period&&target)chart.x=target.x+longitudeDelta(chart.x-target.x);
        minX=Math.min(minX,chart.x);maxX=Math.max(maxX,chart.x);minZ=Math.min(minZ,chart.z);maxZ=Math.max(maxZ,chart.z);
      }
      if(missed){minX=extent.minX;maxX=extent.maxX;minZ=extent.minZ;maxZ=extent.maxZ;}
      else if(angularChart){
        // Longitude expands near a pole; its chart width is not a physical
        // chord. Using it as curvature padding used to request the whole Earth
        // at an otherwise local zoom. Measure curvature in 3D instead.
        const p=surface.projection,span=patchBounds.getSize(point);
        const padding=Math.max(4,span.lengthSq()/(8*surface.radius))*p.radius/surface.radius;
        minZ=Math.max(extent.minZ,minZ-padding);maxZ=Math.min(extent.maxZ,maxZ+padding);
        let containsPole=false;
        for(const z of [extent.minZ,extent.maxZ]){
          surfacePoint(world,0,0,z,pole);
          if(point.subVectors(pole,shell.center).dot(direction)>=0)continue;
          pole.project(coverageCamera);
          if(Math.abs(pole.x)<=1&&Math.abs(pole.y)<=1&&pole.z>=-1&&pole.z<=1){
            containsPole=true;minZ=Math.min(minZ,z);maxZ=Math.max(maxZ,z);
          }
        }
        if(containsPole){minX=extent.minX;maxX=extent.maxX;}
        else{
          const closestPole=Math.max(Math.abs(p.centralLatitude*Math.PI/180-minZ/p.radius),Math.abs(p.centralLatitude*Math.PI/180-maxZ/p.radius));
          const longitudePadding=padding/Math.max(.01,Math.cos(closestPole));
          minX-=longitudePadding;maxX+=longitudePadding;
        }
      }else{
        const padding=Math.max(4,((maxX-minX)**2+(maxZ-minZ)**2)/(8*surface.radius));
        minX-=padding;maxX+=padding;minZ-=padding;maxZ+=padding;
      }
    }else for(const x of [-1,1])for(const y of [-1,1]){
      point.set(x,y,0).unproject(coverageCamera);
      const t=Math.abs(direction.y)>1e-5?-point.y/direction.y:0;point.addScaledVector(direction,t);
      minX=Math.min(minX,point.x);maxX=Math.max(maxX,point.x);minZ=Math.min(minZ,point.z);maxZ=Math.max(maxZ,point.z);
    }
    return {minX,maxX,minZ,maxZ};
  }
  function updateVisibility(camera,{dt=0,reveal=true,reducedMotion=false}={}){
    if(disposed)return;
    parent.updateWorldMatrix(true,false);camera.updateMatrixWorld();
    projection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);frustum.setFromProjectionMatrix(projection);
    stats.visibleChunks=stats.revealingChunks=0;
    for(const chunk of cache.values()){
      box.copy(chunk.bounds).applyMatrix4(parent.matrixWorld);chunk.root.visible=frustum.intersectsBox(box);
      if(chunk.root.visible){
        stats.visibleChunks++;
        if(reveal){
          chunk.progress=reducedMotion?1:Math.min(1,chunk.progress+Math.max(0,dt)/.38);
          chunk.reveal.value=chunk.progress*chunk.progress*(3-2*chunk.progress);
        }
        if(chunk.progress<1)stats.revealingChunks++;
      }
    }
  }
  function update(camera,{mapBlend=0,target,budgetMs=5,prewarm=false,coverageCamera=camera,coverageCameras,retainVisible=false}={}){
    if(disposed)return;frame++;root.visible=mapBlend<.999;
    if(!root.visible&&!prewarm)return;
    const footprints=[];
    if(target)targetPoint.copy(target);
    const candidate=(x,z)=>({key:`${x}:${z}`,x:x+size/2,z:z+size/2,size,
      distance:surface?surfaceDistance(world,targetPoint,{x:x+size/2,z:THREE.MathUtils.clamp(z+size/2,extent.minZ,extent.maxZ)})**2
        :longitudeDelta(x+size/2-targetPoint.x)**2+(z+size/2-targetPoint.z)**2});
    required.clear();wanted.clear();
    // The transition can protect both its widest destination and the current
    // displayed footprint. Union cells, not chart rectangles: a date-line
    // crossing must never turn two neighbouring footprints into a whole world.
    for(const coverage of coverageCameras?.length?coverageCameras:[coverageCamera]){
      const bounds=footprint(coverage,target),{minX,maxX,minZ,maxZ}=bounds;
      if(!target&&!footprints.length)targetPoint.set((minX+maxX)/2,0,(minZ+maxZ)/2);
      footprints.push(bounds);
      for(const [left,right]of longitudeRanges(minX,maxX))for(let x=Math.floor(left/size)*size;x<right;x+=size){
        for(let z=Math.floor(Math.max(extent.minZ,minZ)/size)*size;z<Math.min(extent.maxZ,maxZ);z+=size){
          const entry=candidate(x,z);if(hasDetail(entry)&&intersectsCoverage(entry))required.set(entry.key,entry);
        }
      }
      // Cities and mountains belong to their centre cell but may extend into a
      // neighbouring visible cell. Their owner region is therefore required too.
      for(const feature of features){
        const radius=featureRadii.get(feature);
        const x=period?targetPoint.x+longitudeDelta(feature.x-targetPoint.x):feature.x;
        if(x+radius<minX||x-radius>maxX||feature.z+radius<minZ||feature.z-radius>maxZ)continue;
        const entry=candidate(Math.floor(feature.x/size)*size,Math.floor(feature.z/size)*size);required.set(entry.key,entry);
      }
    }
    const candidates=[...required.values()].sort((a,b)=>a.distance-b.distance);
    coverageChecked=true;
    stats.requiredChunks=required.size;stats.coverageLimited=required.size>maxVisibleChunks;
    for(const entry of candidates.slice(0,maxVisibleChunks))wanted.set(entry.key,entry);
    if(!stats.coverageLimited){
      const prefetch=new Map();
      for(const {minX,maxX,minZ,maxZ}of footprints){
        for(const [left,right]of longitudeRanges(minX-size,maxX+size))for(let x=Math.floor(left/size)*size;x<right;x+=size){
          for(let z=Math.floor(Math.max(extent.minZ,minZ-size)/size)*size;z<Math.min(extent.maxZ,maxZ+size);z+=size){
            const entry=candidate(x,z);if(!wanted.has(entry.key)&&hasDetail(entry))prefetch.set(entry.key,entry);
          }
        }
      }
      for(const entry of [...prefetch.values()].sort((a,b)=>a.distance-b.distance)){
        if(wanted.size>=Math.min(maxChunks,required.size+36))break;wanted.set(entry.key,entry);
      }
    }
    stats.prefetchChunks=wanted.size-Math.min(required.size,maxVisibleChunks);
    // Ignore obsolete worker results before spending a frame hydrating/uploading
    // them. A moving camera always gives the newest visible cells priority.
    for(const [key,task]of pending)if(!wanted.has(key)){pending.delete(key);task.controller.abort();}
    for(const [key,job]of incoming)if(!wanted.has(key)){releaseIncoming(job);incoming.delete(key);}
    const started=performance.now();hydrate(started+budgetMs);warmOne();publishReady();
    updateVisibility(camera);
    for(const chunk of cache.values())if(wanted.has(chunk.key)||(retainVisible&&chunk.root.visible))chunk.last=frame;
    for(const [key,coordinates]of wanted){
      if(pending.size+incoming.size>=maxPending||performance.now()-started>=budgetMs)break;
      const estimate=cache.size?stats.bytes/cache.size:4*1024*1024;
      if(!required.has(key)&&stats.bytes+estimate*(1+pending.size+incoming.size)>maxBytes*.90)continue;
      if(!cache.has(key)&&!pending.has(key)&&!incoming.has(key)&&!failures.has(key))request(key,coordinates);
    }
    if(cache.size>maxChunks||stats.bytes>maxBytes){
      const removable=[...cache.values()].filter(chunk=>!required.has(chunk.key)&&!(retainVisible&&chunk.root.visible)).sort((a,b)=>{
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
    for(const task of pending.values())task.controller.abort();
    root.removeFromParent();wanted.clear();required.clear();pending.clear();incoming.clear();stats.loadedChunks=stats.pendingChunks=0;
  }
  function ready(){return !disposed&&coverageChecked&&!stats.coverageLimited&&(required.size>0||terrainBounds!==null)&&[...required.keys()].every(key=>cache.has(key));}
  return {root,update,updateVisibility,stats,dispose,get ready(){return ready();},
    get settled(){return ready()&&[...required.keys()].every(key=>{const chunk=cache.get(key);return !chunk.root.visible||chunk.progress>=1;});}};
}
