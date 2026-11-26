import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createViewCompositor} from '../src/view-compositor.js';

function fixture({failRender=false,failCompile=false}={}){
  const world=new THREE.Scene(),map=new THREE.Scene(),view=new THREE.PerspectiveCamera();
  const geometry=new THREE.BoxGeometry(),material=new THREE.MeshStandardMaterial();
  const group=new THREE.Group(),hiddenGroup=new THREE.Group();hiddenGroup.visible=false;
  const renderables=[new THREE.Mesh(geometry,material),new THREE.Line(geometry,material),
    new THREE.Points(geometry,material),new THREE.Sprite(new THREE.SpriteMaterial()),
    new THREE.InstancedMesh(geometry,material,1),new THREE.Mesh(geometry,material)];
  renderables[1].visible=false;group.add(...renderables.slice(0,5));hiddenGroup.add(renderables[5]);
  const sun=new THREE.DirectionalLight();sun.castShadow=true;world.add(group,hiddenGroup,sun);
  const previousTarget={name:'previous target'},state={target:previousTarget,face:3,level:2,calls:[],initialized:[],draws:0};
  const renderer={toneMappingExposure:1.15,shadowMap:{enabled:true},
    getRenderTarget:()=>state.target,getActiveCubeFace:()=>state.face,getActiveMipmapLevel:()=>state.level,
    setRenderTarget(target,face=0,level=0){Object.assign(state,{target,face,level});},
    initRenderTarget(target){state.initialized.push(target);},
    render(source,camera){
      state.draws++;assert.equal(source,world);assert.equal(camera,view);
      assert.ok(renderables.every(object=>!object.visible),'the allocation pass cannot draw any geometry');
      assert.equal(sun.visible,true);assert.equal(sun.castShadow,true);
      assert.equal(group.visible,true);assert.equal(hiddenGroup.visible,false);
      assert.equal(state.target.width,640);assert.equal(state.target.height,360);
      if(failRender)throw new Error('shadow allocation failed');
    },
    compileAsync(source,camera,targetScene){
      assert.deepEqual(renderables.map(object=>object.visible),[true,false,true,true,true,true]);
      if(failCompile)throw new Error('compile setup failed');
      let resolve,reject;const promise=new Promise((ok,no)=>{resolve=ok;reject=no;});
      state.calls.push({source,camera,targetScene,target:state.target,shadows:this.shadowMap.enabled,resolve,reject});
      return promise;
    },
  };
  const compositor=createViewCompositor(renderer);compositor.resize(640,360);
  function restored(shadows=true){
    assert.equal(state.target,previousTarget);assert.equal(state.face,3);assert.equal(state.level,2);
    assert.equal(renderer.shadowMap.enabled,shadows);
    assert.deepEqual(renderables.map(object=>object.visible),[true,false,true,true,true,true]);
    assert.equal(group.visible,true);assert.equal(hiddenGroup.visible,false);assert.equal(sun.visible,true);
  }
  function dispose(){compositor.dispose();geometry.dispose();material.dispose();renderables[3].material.dispose();renderables[4].dispose();}
  return{world,map,view,geometry,material,renderer,state,compositor,restored,dispose};
}

test('early preparation warms streamed, train, shadow and target-specific variants before chunks exist',async()=>{
  const f=fixture(),{world,map,view,renderer,state,compositor}=f;
  let borrowedDisposals=0;f.geometry.addEventListener('dispose',()=>borrowedDisposals++);
  f.material.addEventListener('dispose',()=>borrowedDisposals++);
  const pending=compositor.prepare(world,map,view);
  assert.equal(state.draws,1);assert.equal(state.initialized.length,2);assert.equal(state.calls.length,1);
  const [worldTarget,mapTarget]=state.initialized;
  assert.equal(state.calls[0].source,world);assert.equal(state.calls[0].target,worldTarget);
  assert.equal(worldTarget.samples,2);assert.equal(mapTarget.samples,2);f.restored();
  // Live map frames can disable shadows while compilation is pending. All
  // variants still use the detailed scene's original shadow configuration.
  renderer.shadowMap.enabled=false;
  for(let i=0;i<13;i++){
    assert.equal(state.calls.length,i+1,'each shader variant is awaited before reusing its material');
    assert.equal(state.calls[i].shadows,true);f.restored(false);
    state.calls[i].resolve();await Promise.resolve();
  }
  await pending;f.restored(false);
  const surfaceProxies=state.calls.slice(1,4).map(call=>call.source);
  const depthProxies=state.calls.slice(4,7).map(call=>call.source);
  for(let i=1;i<=6;i++){
    assert.equal(state.calls[i].target,worldTarget);assert.equal(state.calls[i].targetScene,world);
    assert.equal(state.calls[i].camera,i<4?view:world.children.find(object=>object.isDirectionalLight).shadow.camera);
  }
  assert.equal(state.calls[7].source,map);assert.equal(state.calls[7].target,mapTarget);
  assert.notEqual(state.calls[8].source,world);assert.notEqual(state.calls[8].source,map);assert.equal(state.calls[8].target,null);
  assert.equal(state.calls[9].source,world);assert.equal(state.calls[9].target,null);
  for(let i=0;i<3;i++){
    const call=state.calls[10+i];assert.equal(call.source,surfaceProxies[i]);assert.equal(call.target,null);
    assert.equal(call.camera,view);assert.equal(call.targetScene,world);
  }
  assert.deepEqual(surfaceProxies.map(proxy=>proxy.material.side),[THREE.FrontSide,THREE.DoubleSide,THREE.FrontSide]);
  assert.deepEqual(depthProxies.map(proxy=>proxy.material.side),[THREE.BackSide,THREE.DoubleSide,THREE.BackSide]);
  for(const [index,proxy]of surfaceProxies.entries()){
    assert.equal(proxy.material.isMeshStandardMaterial,true);assert.equal(proxy.material.vertexColors,true);
    assert.equal(proxy.material.flatShading,true);assert.equal(proxy.receiveShadow,true);
    assert.equal(!!proxy.isInstancedMesh,index===2);
    if(index<2){
      assert.equal(proxy.material.customProgramCacheKey(),'streamed-detail-reveal-v1');
      const shader={uniforms:{},fragmentShader:THREE.ShaderLib.standard.fragmentShader};proxy.material.onBeforeCompile(shader);
      assert.equal(shader.uniforms.detailReveal.value,1);assert.match(shader.fragmentShader,/if \(detailReveal <= threshold\) discard/);
    }else assert.equal(proxy.count,1);
  }
  for(const [index,proxy]of depthProxies.entries()){
    assert.equal(proxy.material.isMeshDepthMaterial,true);assert.equal(proxy.material.depthPacking,THREE.BasicDepthPacking);
    assert.equal(proxy.material.vertexColors,false);assert.equal(!!proxy.isInstancedMesh,index===2);
    if(index<2)assert.equal(proxy.material.customProgramCacheKey(),'streamed-detail-reveal-v1');
  }
  const proxies=[...surfaceProxies,...depthProxies];
  for(const proxy of proxies){
    assert.equal(proxy.geometry,surfaceProxies[0].geometry);assert.equal(proxy.geometry.attributes.normal.count,3);
    assert.equal(proxy.geometry.attributes.color.count,3);assert.equal(proxy.geometry.attributes.position.count,3);
    assert.equal(proxy.parent,null,'proxies are compiled, never inserted into or drawn with the world');
  }
  assert.equal(new Set(proxies.map(proxy=>proxy.material)).size,6,'distinct materials retain their own async program state');
  const owned=[proxies[0].geometry,...proxies.map(proxy=>proxy.material),...proxies.filter(proxy=>proxy.isInstancedMesh)];
  const disposals=new Map(owned.map(object=>[object,0]));
  owned.forEach(object=>object.addEventListener('dispose',()=>disposals.set(object,disposals.get(object)+1)));
  compositor.dispose();compositor.dispose();assert.equal(borrowedDisposals,0,'preparation never owns scene geometry or materials');
  assert.ok([...disposals.values()].every(count=>count===1),'held shader resources are released exactly once');
  f.geometry.dispose();f.material.dispose();world.traverse(object=>{if(object.isSprite)object.material.dispose();if(object.isInstancedMesh)object.dispose();});
});

test('failed shadow allocation or shader setup restores visibility and the complete prior target binding',async()=>{
  for(const failure of [{failRender:true},{failCompile:true}]){
    const f=fixture(failure);
    await assert.rejects(f.compositor.prepare(f.world,f.map,f.view),/shadow allocation failed|compile setup failed/);
    f.restored();assert.equal(f.state.calls.length,0);f.dispose();
  }
});

test('asynchronous compilation rejection leaves live renderer state untouched and does not start the next variant',async()=>{
  const f=fixture(),pending=f.compositor.prepare(f.world,f.map,f.view);
  f.restored();f.renderer.shadowMap.enabled=false;
  f.state.calls[0].reject(new Error('driver rejected shader'));
  await assert.rejects(pending,/driver rejected shader/);
  f.restored(false);assert.equal(f.state.calls.length,1);f.dispose();
});

test('surface and depth proxy programs remain retained across preparations and failed variants restore renderer state',async()=>{
  const f=fixture();
  let pending=f.compositor.prepare(f.world,f.map,f.view);
  for(let i=0;i<13;i++){f.state.calls[i].resolve();await Promise.resolve();}
  await pending;
  const proxies=f.state.calls.slice(1,7).map(call=>call.source);
  pending=f.compositor.prepare(f.world,f.map,f.view);
  for(let i=13;i<19;i++){
    if(i>13)assert.equal(f.state.calls[i].source,proxies[i-14]);
    f.state.calls[i].resolve();await Promise.resolve();
  }
  assert.equal(f.state.calls[19].source,proxies[5]);
  f.state.calls[19].reject(new Error('depth program failed'));
  await assert.rejects(pending,/depth program failed/);
  assert.equal(f.state.calls.length,20);f.restored();f.dispose();
});
