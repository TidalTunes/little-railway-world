import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {makeTrains,buildRailways} from '../src/railway.js';
import {M} from '../src/palette.js';
import {buildMapWorld} from '../src/map-world.js';
import {createWorldRenderer,compileDetailPacket,detailPacketTransfers,clipRailRanges} from '../src/world-renderer.js';
import {styleUniforms} from '../src/scene-style.js';

function cameraAt(x=0,z=0,span=40){
  const camera=new THREE.OrthographicCamera(-span,span,span,-span,.1,10000);
  camera.position.set(x,1000,z);camera.lookAt(x,0,z);camera.updateMatrixWorld();return camera;
}

test('streamed railway cells retain the exact full-line sleeper spacing',()=>{
  const line={id:'rail',points:[{x:0,y:.42,z:0},{x:40,y:.42,z:0}],distances:[0,40],length:40,bridges:[]};
  const sleepers=ranges=>{
    const root=new THREE.Group();buildRailways(root,{lines:[{...line,renderRanges:ranges}],river:{y:-1.2}});
    const result=root.children.filter(mesh=>mesh.material===M.timber).map(mesh=>Number(mesh.position.x.toFixed(8)));
    root.traverse(mesh=>mesh.geometry?.dispose());return result;
  };
  assert.deepEqual(sleepers([{start:0,end:10.2},{start:10.2,end:23.5},{start:23.5,end:40}]),sleepers([{start:0,end:40}]));
});
function fakeTraffic(count=2048){
  const poseBuffer=new Float32Array(count*3*6),trains=Array.from({length:count},(_,i)=>({
    id:`train-${i}`,ownerId:'coral',count:3,spacing:2.64,active:true,poseOffset:i*3,
  }));
  for(let i=0;i<count;i++)for(let car=0;car<3;car++){
    const offset=(i*3+car)*6;poseBuffer.set([i*24,.42,car*2.64,.23,1,0],offset);
  }
  return {trains,poseBuffer,update(){}};
}

test('thousands of trains allocate detailed geometry only for visible owner templates',()=>{
  const world=generateWorld({density:0}),parent=new THREE.Group(),traffic=fakeTraffic();
  const rail=makeTrains(parent,world,{traffic});
  assert.equal(rail.trains.length,2048);assert.equal(rail.root.children.length,0);
  assert.ok(rail.trains.every(train=>train.parts.every(part=>!part.parent&&!part.children.length)));
  rail.updateView(cameraAt(),{mapBlend:1});assert.equal(rail.stats.templates,0);
  rail.updateView(cameraAt());
  assert.ok(rail.stats.visibleCars>0&&rail.stats.visibleCars<20);
  assert.equal(rail.stats.templates,2,'one cab and one carriage template serves every visible train');
  assert.ok(rail.root.children.length<=6,'material colors are baked; only distinct shading needs separate draws');
  const matrix=new THREE.Matrix4();
  for(const mesh of rail.root.children){
    assert.ok(mesh.isInstancedMesh);assert.equal(mesh.material.vertexColors,true);
    const shader={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
    mesh.material.onBeforeCompile(shader);
    assert.equal(shader.uniforms.worldNight,styleUniforms.night,'baking train colors also preserves their live night shader');
    assert.equal(mesh.userData.instanceTrainIds.length,mesh.count);
    mesh.getMatrixAt(0,matrix);assert.ok(Math.abs(matrix.elements[12])<1e-5);
    mesh.computeBoundingSphere();assert.ok(mesh.boundingSphere);
  }
  rail.updateView(cameraAt(2400));
  assert.ok(rail.root.children.every(mesh=>mesh.boundingSphere===null),'moving batches invalidate cached raycast bounds');
  assert.ok(rail.root.children.every(mesh=>mesh.userData.instanceTrainIds.some(id=>Number(id.split('-')[1])>90)));
  const resources=new Set();rail.root.traverse(mesh=>{if(mesh.geometry)resources.add(mesh.geometry);if(mesh.isInstancedMesh)resources.add(mesh);});
  rail.root.userData.ownedMaterials.forEach(material=>resources.add(material));
  const disposed=new Map([...resources].map(resource=>[resource,0]));
  for(const resource of resources)resource.addEventListener('dispose',()=>disposed.set(resource,disposed.get(resource)+1));
  rail.dispose();rail.dispose();assert.equal(parent.children.length,0);
  assert.ok([...disposed.values()].every(count=>count===1));
});

test('far maps batch city glyphs, skip hidden updates, and use one readable marker per train',()=>{
  const base=generateWorld({density:0}),traffic=fakeTraffic();
  const world={...base,cities:Array.from({length:256},(_,i)=>({...base.cities[i%base.cities.length],id:`city-${i}`,x:i*10,level:i%10+1}))};
  const rail=makeTrains(new THREE.Group(),world,{traffic}),map=buildMapWorld(new THREE.Group(),world);
  assert.ok(map.stats.cityBatches<=40);
  map.update(rail.trains,{visible:false});assert.equal(map.stats.trainBatches,0);
  map.update(rail.trains,{camera:cameraAt(0,0,2000),viewportHeight:1000});
  assert.equal(map.stats.farTrains,true);assert.equal(map.stats.updatedCars,2048);
  const outlines=map.root.getObjectByName('map-train-outlines');assert.equal(outlines.count,2048);
  const matrix=new THREE.Matrix4();outlines.getMatrixAt(0,matrix);
  assert.ok(Math.abs(matrix.elements[14]-2.64)<1e-5,'far symbols use the middle carriage pose');
  assert.ok(matrix.getMaxScaleOnAxis()>1,'far marker preserves a minimum screen size');
  const version=outlines.instanceMatrix.version;map.update(rail.trains,{visible:false});
  assert.equal(outlines.instanceMatrix.version,version);assert.equal(map.stats.updatedCars,0);
  map.update(rail.trains,{camera:cameraAt()});assert.equal(map.stats.updatedCars,6144);
  map.dispose();rail.dispose();
});

test('worker detail packets clip rail ownership, preserve color, and transfer independent buffers',()=>{
  const world=generateWorld({density:0}),region=generateWorldRegion(world,{x:0,z:0,size:48});
  const packet=compileDetailPacket(region,world);
  assert.ok(packet.meshes.length>0&&packet.meshes.length<=7,'terrain, water, surf and windows add bounded shading groups, never color-specific draws');
  assert.ok(packet.meshes.every(mesh=>mesh.color?.length===mesh.position.length&&mesh.material.vertexColors));
  const styles=packet.meshes.map(mesh=>mesh.material.sceneStyle);
  for(const expected of ['terrain','water','asset','window'])assert.ok(styles.includes(expected),`${expected} behavior survives color batching`);
  assert.ok(styles.every(style=>['terrain','water','surf','asset','window','lamp'].includes(style)));
  const transfer=detailPacketTransfers(packet);assert.equal(transfer.length,new Set(transfer).size);
  const cloned=structuredClone(packet,{transfer});assert.ok(cloned.meshes[0].position.length>0);
  assert.deepEqual(cloned.meshes.map(mesh=>mesh.material.sceneStyle),styles,'worker transfer preserves shader classification');
  assert.equal(packet.meshes[0].position.length,0,'packet geometry owns transferable arrays');
  const line={points:[{x:-10,z:0},{x:10,z:0}],distances:[0,20],length:20,renderRanges:[{start:3,end:12}]};
  assert.deepEqual(clipRailRanges(line,{minX:-4,maxX:4,minZ:-1,maxZ:1}),[{start:6,end:12}]);
});

function flatPacket({x,z,size}){
  const minX=Math.floor(x/size)*size,minZ=Math.floor(z/size)*size;
  const bounds={minX,minZ,maxX:minX+size,maxZ:minZ+size};
  return {bounds,meshes:[{position:new Float32Array([minX,0,minZ,minX+1,0,minZ,minX,0,minZ+1]),
    normal:new Float32Array([0,1,0,0,1,0,0,1,0]),color:new Float32Array(9).fill(1),
    material:{name:'test',color:[1,1,1],roughness:1,metalness:0,side:0,vertexColors:true}}]};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));

test('streamed night materials compose with opaque chunk reveals and retain stable shader cache keys',async()=>{
  const world={outline:[[-10,-10],[10,-10],[10,10],[-10,10]],cities:[],mountains:[],stations:[]};
  const renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxChunks:1,maxVisibleChunks:1,requestChunk:request=>{
    const packet=flatPacket(request);
    packet.meshes=['asset','window','water'].map(sceneStyle=>({...packet.meshes[0],material:{...packet.meshes[0].material,sceneStyle}}));
    return packet;
  }});
  try{
    const camera=cameraAt(5,5,2),options={target:new THREE.Vector3(5,0,5),budgetMs:10};
    for(let i=0;i<20&&!renderer.ready;i++){renderer.update(camera,options);await flush();}
    assert.equal(renderer.ready,true);
    const materials=[];renderer.root.traverse(mesh=>{if(mesh.isMesh)materials.push(mesh.material);});
    assert.equal(materials.length,3,'each behavior hydrates exactly one opaque draw');
    for(const material of materials){
      const shader={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
      const key=material.customProgramCacheKey();material.onBeforeCompile(shader);
      assert.ok(shader.uniforms.detailReveal,'the earlier reveal hook remains installed');
      assert.equal(shader.uniforms.worldNight,styleUniforms.night);
      assert.equal(shader.uniforms.worldTime,styleUniforms.time);
      assert.match(shader.fragmentShader,/if \(detailReveal <= threshold\) discard/);
      assert.match(shader.vertexShader,/paintedPosition = \(modelMatrix \* paintPosition\)/);
      assert.match(key,/streamed-detail-reveal-v1.*painted-world/);
      assert.equal(material.customProgramCacheKey(),key,'compiling or changing uniforms does not create new shader variants');
      assert.equal(material.transparent,false);assert.equal(material.opacity,1);assert.equal(material.depthWrite,true);
    }
    assert.equal(new Set(materials.map(material=>material.customProgramCacheKey())).size,3,'different shader behaviors have distinct cache keys');
  }finally{renderer.dispose();}
});

test('local detail readiness covers every required cell and loading remains bounded',async()=>{
  const world=generateWorld({density:0}),parent=new THREE.Group(),requests=[];
  const renderer=createWorldRenderer(parent,world,{size:48,maxVisibleChunks:36,maxChunks:40,maxPending:2,
    requestChunk:request=>{requests.push(request);return Promise.resolve(flatPacket(request));}});
  const camera=cameraAt(0,0,12),options={mapBlend:0,target:new THREE.Vector3(),budgetMs:5};
  renderer.update(camera,{...options,mapBlend:1});assert.equal(requests.length,0);
  renderer.update(camera,{...options,mapBlend:1,prewarm:true});assert.ok(requests.length<=2);assert.equal(renderer.ready,false);
  for(let i=0;i<20&&!renderer.ready;i++){await flush();renderer.update(camera,options);}
  assert.equal(renderer.ready,true);assert.equal(renderer.stats.requiredChunks,renderer.stats.loadedChunks);
  assert.ok(renderer.stats.pendingChunks<=2);
  const resources=new Set();renderer.root.traverse(mesh=>{if(mesh.geometry)resources.add(mesh.geometry);if(mesh.material)resources.add(mesh.material);});
  const counts=new Map([...resources].map(resource=>[resource,0]));
  resources.forEach(resource=>resource.addEventListener('dispose',()=>counts.set(resource,counts.get(resource)+1)));
  renderer.dispose();renderer.dispose();assert.ok([...counts.values()].every(count=>count===1));
  const limited=createWorldRenderer(parent,world,{size:16,maxVisibleChunks:1,requestChunk:request=>Promise.resolve(flatPacket(request))});
  limited.update(cameraAt(),options);await flush();limited.update(cameraAt(),options);
  assert.ok(limited.stats.requiredChunks>1);assert.equal(limited.stats.coverageLimited,true);assert.equal(limited.ready,false);
  limited.dispose();
});

test('prefetch respects the byte budget without repeatedly requesting evicted cells',async()=>{
  const world=generateWorld({density:0}),requests=[];
  const renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxBytes:600,maxPending:2,
    requestChunk:request=>{requests.push(`${request.x}:${request.z}`);return Promise.resolve(flatPacket(request));}});
  const camera=cameraAt(0,0,12),options={target:new THREE.Vector3(),budgetMs:5};
  for(let i=0;i<30;i++){renderer.update(camera,options);await flush();}
  assert.equal(renderer.ready,true);assert.ok(renderer.stats.bytes<=600);
  assert.equal(requests.length,new Set(requests).size,'budget-limited prefetch does not re-request the same regions');
  renderer.dispose();
  const tiny=createWorldRenderer(new THREE.Group(),world,{size:48,maxBytes:100,
    requestChunk:request=>Promise.resolve(flatPacket(request))});
  for(let i=0;i<20&&!tiny.ready;i++){tiny.update(camera,options);await flush();}
  assert.equal(tiny.ready,true,'complete visible coverage takes priority over an impossibly small cache budget');
  assert.equal(tiny.stats.budgetOverflow,true);tiny.dispose();
});

test('adjacent regional banks measure the global shoreline rather than the artificial cell boundary',()=>{
  const base=generateWorld({density:0});
  const world={...base,outline:[[-20,-20],[20,-20],[20,20],[-20,20]],lines:[],cities:[],stations:[],placements:[],mountains:[],cityStreets:[],
    river:{width:1,y:-1.2,points:[{x:-30,z:-30,y:-1.2},{x:30,z:-30,y:-1.2}]},
    biomes:{regions:[],shoreWidth:.9,ocean:[[[[-20,-20],[20,20],[20,-20],[-20,-20]]]],
      oceanShore:[[[[-20,-20],[20,20],[18.8,20],[5,6.2],[0,.6],[-5,-3.8],[-20,-18.8],[-20,-20]]]]}};
  world.biomes.regions=[{id:'ocean',type:'ocean',polygons:world.biomes.ocean}];
  const expected=-1.2+(.6/Math.SQRT2/.9)*1.2+.015;
  for(const [minX,maxX]of [[-20,0],[0,20]]){
    const bounds={minX,maxX,minZ:-20,maxZ:20};
    const packet=compileDetailPacket({bounds,cullBounds:bounds,lines:[],cities:[],stations:[],mountains:[],placements:[],cityStreets:[]},world);
    const found=packet.meshes.flatMap(mesh=>{
      const heights=[];
      for(let i=0;i<mesh.position.length;i+=3)if(Math.abs(mesh.position[i])<1e-5&&Math.abs(mesh.position[i+2]-.6)<1e-5)heights.push(mesh.position[i+1]);
      return heights;
    });
    assert.ok(found.some(y=>Math.abs(y-expected)<1e-5),'both sides keep the same globally measured sloping-bank height');
  }
});

test('regional eviction frees old geometry and independently fading chunk materials',async()=>{
  const base=generateWorld({density:0}),world={...base,cities:[],mountains:[],stations:[],outline:[[-500,-500],[500,-500],[500,500],[-500,500]]};
  const renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxChunks:4,maxVisibleChunks:4,
    requestChunk:request=>Promise.resolve(flatPacket(request))});
  const load=async(x)=>{
    const camera=cameraAt(x,0,12),options={target:new THREE.Vector3(x,0,0),budgetMs:5};
    for(let i=0;i<15;i++){renderer.update(camera,options);await flush();if(renderer.ready)return;}
    assert.fail('visible regions should finish loading');
  };
  await load(0);
  const oldGeometries=[],oldMaterials=new Set(),events=new Map();
  renderer.root.traverse(mesh=>{if(mesh.geometry)oldGeometries.push(mesh.geometry);if(mesh.material)oldMaterials.add(mesh.material);});
  for(const resource of [...oldGeometries,...oldMaterials]){
    events.set(resource,0);resource.addEventListener('dispose',()=>events.set(resource,events.get(resource)+1));
  }
  await load(192);assert.ok(renderer.stats.loadedChunks<=4);
  assert.ok(oldGeometries.every(geometry=>events.get(geometry)===1));
  assert.ok([...oldMaterials].every(material=>events.get(material)===1),'evicted chunks release their own fade materials');
  renderer.dispose();assert.ok([...oldMaterials].every(material=>events.get(material)===1));
});

test('late worker completions and failures cannot resurrect a disposed regional renderer',async()=>{
  const world=generateWorld({density:0}),parent=new THREE.Group(),jobs=[];
  const renderer=createWorldRenderer(parent,world,{size:48,requestChunk:request=>new Promise((resolve,reject)=>jobs.push({request,resolve,reject}))});
  renderer.update(cameraAt(0,0,12));await flush();assert.equal(jobs.length,2);
  renderer.dispose();jobs[0].resolve(flatPacket(jobs[0].request));jobs[1].reject(new Error('replaced worker'));
  await flush();assert.equal(parent.children.length,0);assert.equal(renderer.stats.loadedChunks,0);
  assert.equal(renderer.stats.bytes,0);assert.equal(renderer.stats.errors,0);
  const attempts=[];
  const failed=createWorldRenderer(parent,world,{size:48,requestChunk:request=>{
    attempts.push(`${request.x}:${request.z}`);throw new Error('worker unavailable');
  }});
  for(let i=0;i<20;i++){failed.update(cameraAt(0,0,12));await flush();}
  assert.equal(failed.ready,false);assert.ok(failed.stats.errors>0);assert.match(failed.root.userData.lastError,/worker unavailable/);
  assert.equal(attempts.length,new Set(attempts).size,'failed requests are not retried every frame');failed.dispose();
});

test('disposing during budgeted hydration releases partially installed buffers and materials',async()=>{
  const world=generateWorld({density:0}),request={x:24,z:24,size:48},packet=flatPacket(request);
  packet.meshes.push({...packet.meshes[0],position:packet.meshes[0].position.slice()});
  const renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxPending:1,requestChunk:()=>Promise.resolve(packet)});
  renderer.update(cameraAt(0,0,12));await flush();
  renderer.update(cameraAt(0,0,12),{budgetMs:0});
  assert.equal(renderer.stats.loadedChunks,0,'a partially hydrated chunk is not published');
  const original=THREE.BufferGeometry.prototype.dispose;let disposed=0;
  THREE.BufferGeometry.prototype.dispose=function(){if(this.attributes.position?.array===packet.meshes[0].position)disposed++;return original.call(this);};
  try{renderer.dispose();renderer.dispose();assert.equal(disposed,1);}finally{THREE.BufferGeometry.prototype.dispose=original;}
});

test('detail readiness waits for incremental GPU uploads and starts at most one mesh per frame',async()=>{
  const world={outline:[[-10,-10],[10,-10],[10,10],[-10,10]],cities:[],mountains:[],stations:[]},uploads=[];
  const renderer=createWorldRenderer(new THREE.Group(),world,{size:48,maxChunks:1,maxVisibleChunks:1,
    requestChunk:request=>{const packet=flatPacket(request);packet.meshes.push({...packet.meshes[0]},{...packet.meshes[0]});return packet;},
    uploadMesh:mesh=>uploads.push(mesh)});
  const camera=cameraAt(5,5,2),options={target:new THREE.Vector3(5,0,5),budgetMs:5};
  renderer.update(camera,options);await flush();
  for(let i=1;i<=3;i++){
    renderer.update(camera,options);assert.equal(uploads.length,i);
    assert.equal(renderer.ready,i===3,'a complete CPU packet stays hidden until its last GPU buffer upload');
  }
  assert.equal(renderer.stats.uploadedMeshes,3);renderer.dispose();
});

test('asynchronous GPU upload acknowledgements respect disposal and failed uploads release resources',async()=>{
  const world={outline:[[-10,-10],[10,-10],[10,10],[-10,10]],cities:[],mountains:[],stations:[]};
  const camera=cameraAt(5,5,2),options={target:new THREE.Vector3(5,0,5),budgetMs:5};
  const parent=new THREE.Group();let acknowledge,mesh;
  const renderer=createWorldRenderer(parent,world,{size:48,maxChunks:1,maxVisibleChunks:1,
    requestChunk:flatPacket,uploadMesh:item=>{mesh=item;return new Promise(resolve=>{acknowledge=resolve;});}});
  renderer.update(camera,options);await flush();renderer.update(camera,options);
  assert.equal(renderer.ready,false);assert.ok(mesh);let geometryDisposals=0,materialDisposals=0;
  mesh.geometry.addEventListener('dispose',()=>geometryDisposals++);mesh.material.addEventListener('dispose',()=>materialDisposals++);
  renderer.dispose();acknowledge();await flush();
  assert.equal(parent.children.length,0);assert.equal(geometryDisposals,1);assert.equal(materialDisposals,1);
  assert.equal(renderer.stats.uploadedMeshes,0,'late completion cannot mark a discarded chunk uploaded');
  let failedDisposals=0;
  const failed=createWorldRenderer(parent,world,{size:48,maxChunks:1,maxVisibleChunks:1,
    requestChunk:flatPacket,uploadMesh:item=>{
      item.geometry.addEventListener('dispose',()=>failedDisposals++);throw new Error('GPU upload rejected');
    }});
  failed.update(camera,options);await flush();failed.update(camera,options);
  assert.equal(failed.ready,false);assert.equal(failed.stats.errors,1);assert.equal(failedDisposals,1);
  assert.equal(failed.stats.bytes,0);failed.dispose();assert.equal(failedDisposals,1);
});
