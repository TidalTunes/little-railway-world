import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorldRenderer} from '../src/world-renderer.js';

const flush=()=>new Promise(resolve=>setImmediate(resolve));
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-12,`${actual} differs from ${expected}`);
function world(width=1200){return {outline:[[0,0],[width,0],[width,48],[0,48]],cities:[],mountains:[],stations:[]};}
function cameraAt(x=24,z=24,span=8){
  const camera=new THREE.OrthographicCamera(-span,span,span,-span,.1,2000);
  camera.position.set(x,1000,z);camera.lookAt(x,0,z);camera.updateMatrixWorld();return camera;
}
function flatPacket({x,z,size},meshCount=1){
  const minX=Math.floor(x/size)*size,minZ=Math.floor(z/size)*size;
  const bounds={minX,minZ,maxX:minX+size,maxZ:minZ+size};
  return {bounds,meshes:Array.from({length:meshCount},()=>({
    position:new Float32Array([minX,0,minZ,minX+1,0,minZ,minX,0,minZ+1]),
    normal:new Float32Array([0,1,0,0,1,0,0,1,0]),
    material:{name:'test',color:[.4,.5,.3],roughness:1,metalness:0,side:THREE.FrontSide,vertexColors:false},
  }))};
}
function shaderFor(material){
  const shader={uniforms:{},fragmentShader:material.isMeshDepthMaterial?THREE.ShaderLib.depth.fragmentShader:THREE.ShaderLib.standard.fragmentShader};
  material.onBeforeCompile(shader);return shader;
}
function fixture(t,options={}){
  const parent=new THREE.Group(),renderer=createWorldRenderer(parent,world(),{size:48,maxChunks:1,maxPending:1,requestChunk:request=>flatPacket(request),...options});
  t.after(()=>renderer.dispose());
  return {parent,renderer,update(camera=cameraAt()){renderer.update(camera,{target:new THREE.Vector3(camera.position.x,0,camera.position.z),budgetMs:100});}};
}
async function load(f,camera=cameraAt()){
  for(let i=0;i<12&&!f.renderer.ready;i++){f.update(camera);await flush();}
  assert.equal(f.renderer.ready,true,'fixture region must finish loading');
  return f.renderer.root.children;
}

test('published chunks start fully dissolved only after their GPU upload is acknowledged',async t=>{
  let acknowledge,uploaded;
  const f=fixture(t,{uploadMesh:mesh=>{uploaded=mesh;return new Promise(resolve=>{acknowledge=resolve;});}});
  f.update();await flush();f.update();
  assert.ok(uploaded);assert.equal(f.renderer.root.children.length,0);assert.equal(f.renderer.ready,false);
  const reveal=shaderFor(uploaded.material).uniforms.detailReveal;
  assert.equal(reveal.value,0);f.renderer.updateVisibility(cameraAt(),{dt:1,reveal:true});assert.equal(reveal.value,0);
  acknowledge();await flush();f.update();
  assert.equal(f.renderer.root.children.length,1);assert.equal(f.renderer.ready,true);assert.equal(f.renderer.settled,false);
  assert.equal(reveal.value,0,'publishing itself does not advance the reveal');
  assert.equal(f.renderer.stats.revealingChunks,1);assert.equal(f.renderer.stats.uploadedMeshes,1);
});

test('reveal eases over 0.38 seconds and advances only when the chunk is visible and detail is being shown',async t=>{
  const f=fixture(t),[chunk]=await load(f),reveal=shaderFor(chunk.children[0].material).uniforms.detailReveal;
  f.renderer.updateVisibility(cameraAt(),{dt:5,reveal:false});assert.equal(reveal.value,0);
  f.renderer.updateVisibility(cameraAt(),{dt:.095,reveal:true});near(reveal.value,.15625);
  f.renderer.updateVisibility(cameraAt(600),{dt:5,reveal:true});assert.equal(chunk.visible,false);near(reveal.value,.15625);
  assert.equal(f.renderer.stats.revealingChunks,0);
  f.renderer.updateVisibility(cameraAt(),{dt:.095,reveal:true});assert.equal(chunk.visible,true);near(reveal.value,.5);
  f.renderer.updateVisibility(cameraAt(),{dt:1,reveal:false});near(reveal.value,.5);assert.equal(f.renderer.settled,false);
  f.renderer.updateVisibility(cameraAt(),{dt:.19,reveal:true});near(reveal.value,1);assert.equal(f.renderer.settled,true);
  assert.equal(f.renderer.stats.revealingChunks,0);
  f.renderer.updateVisibility(cameraAt(),{dt:20,reveal:true});near(reveal.value,1);
});

test('reduced motion reveals visible detail immediately while respecting overview and visibility gates',async t=>{
  const f=fixture(t),[chunk]=await load(f),reveal=shaderFor(chunk.children[0].material).uniforms.detailReveal;
  f.renderer.updateVisibility(cameraAt(),{dt:1,reveal:false,reducedMotion:true});assert.equal(reveal.value,0);
  f.renderer.updateVisibility(cameraAt(600),{dt:1,reveal:true,reducedMotion:true});assert.equal(reveal.value,0);
  f.renderer.updateVisibility(cameraAt(),{dt:0,reveal:true,reducedMotion:true});assert.equal(reveal.value,1);
  assert.equal(f.renderer.settled,true);
});

test('chunks own independent dissolve materials but share programs and synchronize shadow dissolve with their visible meshes',async t=>{
  const f=fixture(t,{maxChunks:2,maxPending:2,requestChunk:request=>flatPacket(request,2)}),chunks=await load(f,cameraAt(48,24,18));
  assert.equal(chunks.length,2);
  const [first,second]=chunks.map(chunk=>chunk.children[0]);
  assert.notEqual(first.material,second.material);
  assert.equal(first.material.customProgramCacheKey(),second.material.customProgramCacheKey());
  const firstReveal=shaderFor(first.material).uniforms.detailReveal,secondReveal=shaderFor(second.material).uniforms.detailReveal;
  assert.notEqual(firstReveal,secondReveal);
  for(const chunk of chunks){
    const [a,b]=chunk.children;assert.equal(a.material,b.material,'same shading within a chunk needs only one material');
    assert.equal(a.customDepthMaterial,b.customDepthMaterial);
    const visible=shaderFor(a.material),shadow=shaderFor(a.customDepthMaterial);
    assert.equal(visible.uniforms.detailReveal,shadow.uniforms.detailReveal);
    assert.match(visible.fragmentShader,/if \(detailReveal <= threshold\) discard/);
    assert.match(shadow.fragmentShader,/if \(detailReveal <= threshold\) discard/);
    assert.equal(a.material.transparent,false);assert.equal(a.material.depthWrite,true);
  }
  const resources=new Set();
  for(const chunk of chunks)for(const mesh of chunk.children)for(const resource of [mesh.geometry,mesh.material,mesh.customDepthMaterial])resources.add(resource);
  const disposals=new Map([...resources].map(resource=>[resource,0]));
  resources.forEach(resource=>resource.addEventListener('dispose',()=>disposals.set(resource,disposals.get(resource)+1)));
  f.renderer.updateVisibility(cameraAt(),{dt:.19,reveal:true});near(firstReveal.value,.5);near(secondReveal.value,0);
  f.renderer.dispose();f.renderer.dispose();assert.equal(f.parent.children.length,0);
  assert.ok([...disposals.values()].every(count=>count===1),'each geometry, visible material and shared chunk shadow material is released exactly once');
});

test('obsolete in-flight worker results are discarded before any hydration or GPU upload',async t=>{
  const jobs=[],uploads=[];
  const f=fixture(t,{requestChunk:request=>new Promise(resolve=>jobs.push({request,resolve})),uploadMesh:mesh=>uploads.push(mesh)});
  f.update();await flush();assert.equal(jobs.length,1);
  f.update(cameraAt(600));jobs[0].resolve(flatPacket(jobs[0].request));await flush();f.update(cameraAt(600));await flush();
  assert.equal(uploads.length,0);assert.equal(f.renderer.stats.loadedChunks,0);assert.equal(jobs.length,2);
  assert.equal(jobs[1].request.x,600,'the next request prioritizes the current camera location');
  jobs[1].resolve(flatPacket(jobs[1].request));await flush();f.update(cameraAt(600));
  assert.equal(uploads.length,1);assert.equal(uploads[0].geometry.attributes.position.getX(0),576);
  assert.equal(f.renderer.ready,true);assert.equal(f.renderer.stats.uploadedMeshes,1);
});

test('moving the view cancels obsolete requests and a late response cannot replace a newer request for the same cell',async t=>{
  const jobs=[];
  const f=fixture(t,{requestChunk:(request,{signal})=>new Promise(resolve=>jobs.push({request,signal,resolve}))});
  f.update();await flush();
  f.update(cameraAt(600));await flush();assert.equal(jobs[0].signal.aborted,true);
  f.update();await flush();assert.equal(jobs[1].signal.aborted,true);assert.equal(jobs.length,3);
  jobs[0].resolve(flatPacket(jobs[0].request));await flush();f.update();await flush();
  assert.equal(jobs.length,3,'the stale response must not remove its replacement from pending');
  assert.equal(f.renderer.root.children.length,0);
  jobs[2].resolve(flatPacket(jobs[2].request));await flush();f.update();
  assert.equal(f.renderer.ready,true);assert.equal(f.renderer.stats.errors,0);
});

test('moving away during an asynchronous upload releases the obsolete chunk once and ignores its acknowledgement',async t=>{
  const uploads=[];
  const f=fixture(t,{uploadMesh:mesh=>new Promise(resolve=>uploads.push({mesh,resolve}))});
  f.update();await flush();f.update();assert.equal(uploads.length,1);
  const old=uploads[0],resources=[old.mesh.geometry,old.mesh.material,old.mesh.customDepthMaterial];
  const disposals=new Map(resources.map(resource=>[resource,0]));
  resources.forEach(resource=>resource.addEventListener('dispose',()=>disposals.set(resource,disposals.get(resource)+1)));
  f.update(cameraAt(600));assert.ok([...disposals.values()].every(count=>count===1));
  old.resolve();await flush();f.update(cameraAt(600));
  assert.equal(f.renderer.stats.uploadedMeshes,0,'an old acknowledgement cannot publish a canceled chunk');
  assert.equal(f.renderer.root.getObjectByName('detail-0:0'),undefined);
  f.renderer.dispose();assert.ok([...disposals.values()].every(count=>count===1));
});
