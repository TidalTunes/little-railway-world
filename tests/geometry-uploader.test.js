import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createGeometryUploader} from '../src/geometry-uploader.js';

function mockRenderer({shadows=true,fail=false}={}){
  const initialTarget={name:'previous render target'},state={fail,target:initialTarget,calls:[],proxy:null,uploadTarget:null};
  return {state,initialTarget,shadowMap:{enabled:shadows},
    getRenderTarget(){return state.target;},
    setRenderTarget(target){state.target=target;state.calls.push(target);if(target?.isWebGLRenderTarget)state.uploadTarget=target;},
    render(scene,camera){
      state.proxy=scene.children[0];state.scene=scene;state.camera=camera;
      assert.equal(state.target.width,1);assert.equal(state.target.height,1);
      assert.equal(state.target.depthBuffer,false);assert.equal(this.shadowMap.enabled,false);
      assert.equal(state.proxy.frustumCulled,false,'upload cannot be skipped by the warmup camera frustum');
      assert.deepEqual(state.proxy.geometry.drawRange,{start:0,count:3},'only one triangle is submitted');
      assert.equal(state.proxy.material.colorWrite,false);assert.equal(state.proxy.material.depthWrite,false);
      assert.equal(state.proxy.material.depthTest,false);assert.equal(state.proxy.material.toneMapped,false);
      if(state.fail)throw new Error('mock draw failure');
    },
  };
}
function borrowedMesh(){
  const geometry=new THREE.BoxGeometry(2,3,4);geometry.setDrawRange(6,12);
  return new THREE.Mesh(geometry,new THREE.MeshStandardMaterial());
}

test('geometry upload restores draw range, target and shadow state without retaining the borrowed geometry',()=>{
  for(const shadows of [true,false]){
    const renderer=mockRenderer({shadows}),uploader=createGeometryUploader(renderer),mesh=borrowedMesh();
    const before=mesh.geometry.attributes.position.array.slice(),range={...mesh.geometry.drawRange};
    let borrowedDisposals=0;mesh.geometry.addEventListener('dispose',()=>borrowedDisposals++);
    uploader.upload(mesh);
    assert.deepEqual(mesh.geometry.drawRange,range);assert.deepEqual(mesh.geometry.attributes.position.array,before);
    assert.equal(renderer.state.target,renderer.initialTarget);assert.equal(renderer.shadowMap.enabled,shadows);
    assert.notEqual(renderer.state.proxy.geometry,mesh.geometry,'the persistent proxy releases its borrowed geometry reference');
    assert.equal(renderer.state.proxy.geometry.attributes.position,undefined,'the idle proxy uses an empty owned geometry');
    const owned=[renderer.state.uploadTarget,renderer.state.proxy.geometry,renderer.state.proxy.material],events=new Map(owned.map(resource=>[resource,0]));
    owned.forEach(resource=>resource.addEventListener('dispose',()=>events.set(resource,events.get(resource)+1)));
    uploader.dispose();assert.ok([...events.values()].every(count=>count===1));
    assert.equal(borrowedDisposals,0,'uploader disposal does not free geometry still owned by the detail cache');
    mesh.geometry.dispose();mesh.material.dispose();
  }
});

test('a failed GPU draw still restores every borrowed state and permits a subsequent upload',()=>{
  const renderer=mockRenderer({fail:true}),uploader=createGeometryUploader(renderer),mesh=borrowedMesh();
  mesh.geometry.setDrawRange(9,Infinity);let disposals=0;mesh.geometry.addEventListener('dispose',()=>disposals++);
  assert.throws(()=>uploader.upload(mesh),/mock draw failure/);
  assert.deepEqual(mesh.geometry.drawRange,{start:9,count:Infinity});
  assert.equal(renderer.state.target,renderer.initialTarget);assert.equal(renderer.shadowMap.enabled,true);
  assert.notEqual(renderer.state.proxy.geometry,mesh.geometry);assert.equal(disposals,0);
  renderer.state.fail=false;
  uploader.upload(mesh);
  assert.deepEqual(mesh.geometry.drawRange,{start:9,count:Infinity});assert.equal(renderer.state.target,renderer.initialTarget);
  uploader.dispose();assert.equal(disposals,0);mesh.geometry.dispose();mesh.material.dispose();
});
