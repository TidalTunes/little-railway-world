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

test('preparation warms real shadow allocation and awaits target-specific shader variants without holding renderer state',async()=>{
  const f=fixture(),{world,map,view,renderer,state,compositor}=f;
  let borrowedDisposals=0;f.geometry.addEventListener('dispose',()=>borrowedDisposals++);
  f.material.addEventListener('dispose',()=>borrowedDisposals++);
  const pending=compositor.prepare(world,map,view);
  assert.equal(state.draws,1);assert.equal(state.initialized.length,2);assert.equal(state.calls.length,1);
  const [worldTarget,mapTarget]=state.initialized;
  assert.equal(state.calls[0].source,world);assert.equal(state.calls[0].target,worldTarget);
  assert.equal(worldTarget.samples,2);assert.equal(mapTarget.samples,2);f.restored();
  // The regular map frame disables shadows while compilation is pending. Every
  // world compile must still use the original detailed-render configuration.
  renderer.shadowMap.enabled=false;
  state.calls[0].resolve();await Promise.resolve();
  assert.equal(state.calls.length,2);assert.equal(state.calls[1].source.isMesh,true);
  assert.equal(state.calls[1].source.isInstancedMesh,undefined);
  assert.equal(state.calls[1].target,worldTarget);assert.equal(state.calls[1].targetScene,world);
  assert.equal(state.calls[1].camera,world.children.find(object=>object.isDirectionalLight).shadow.camera);f.restored(false);
  state.calls[1].resolve();await Promise.resolve();
  assert.equal(state.calls.length,3);assert.equal(state.calls[2].source.isInstancedMesh,true);
  assert.equal(state.calls[2].source.count,1);assert.equal(state.calls[2].target,worldTarget);
  assert.equal(state.calls[2].targetScene,world);f.restored(false);
  state.calls[2].resolve();await Promise.resolve();
  assert.equal(state.calls.length,4);assert.equal(state.calls[3].source,map);
  assert.equal(state.calls[3].target,mapTarget);f.restored(false);
  state.calls[3].resolve();await Promise.resolve();
  assert.equal(state.calls.length,5);assert.notEqual(state.calls[4].source,world);
  assert.notEqual(state.calls[4].source,map);assert.equal(state.calls[4].target,null);f.restored(false);
  state.calls[4].resolve();await Promise.resolve();
  assert.equal(state.calls.length,6);assert.equal(state.calls[5].source,world);
  assert.equal(state.calls[5].target,null);assert.equal(state.calls[5].shadows,true);f.restored(false);
  state.calls[5].resolve();await pending;f.restored(false);
  const proxies=[state.calls[1].source,state.calls[2].source];
  assert.notEqual(proxies[0].material,proxies[1].material);
  for(const proxy of proxies){
    assert.equal(proxy.material.isMeshDepthMaterial,true);assert.equal(proxy.material.side,THREE.BackSide);
    assert.equal(proxy.material.depthPacking,THREE.BasicDepthPacking);assert.equal(proxy.material.vertexColors,false);
    assert.equal(proxy.material.flatShading,undefined);assert.equal(proxy.geometry.attributes.normal.count,3);
    assert.equal(proxy.geometry.attributes.position.count,3);assert.equal(proxy.parent,null);
  }
  const owned=[proxies[0].geometry,...proxies.map(proxy=>proxy.material),proxies[1]],disposals=new Map(owned.map(object=>[object,0]));
  owned.forEach(object=>object.addEventListener('dispose',()=>disposals.set(object,disposals.get(object)+1)));
  compositor.dispose();assert.equal(borrowedDisposals,0,'preparation never owns scene geometry or materials');
  assert.ok([...disposals.values()].every(count=>count===1),'held depth resources are released exactly once');
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

test('shadow proxy programs stay cached across preparations and a rejected depth variant releases no borrowed scene resources',async()=>{
  const f=fixture();
  let pending=f.compositor.prepare(f.world,f.map,f.view);
  for(let i=0;i<6;i++){f.state.calls[i].resolve();await Promise.resolve();}
  await pending;
  const regular=f.state.calls[1].source,instanced=f.state.calls[2].source;
  pending=f.compositor.prepare(f.world,f.map,f.view);
  f.state.calls[6].resolve();await Promise.resolve();
  assert.equal(f.state.calls[7].source,regular);
  f.state.calls[7].resolve();await Promise.resolve();
  assert.equal(f.state.calls[8].source,instanced);
  f.state.calls[8].reject(new Error('depth program failed'));
  await assert.rejects(pending,/depth program failed/);
  assert.equal(f.state.calls.length,9);f.restored();
  assert.equal(regular.geometry,instanced.geometry);f.dispose();
});
