import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createDetailBase} from '../src/detail-base.js';

function fixture(spherical=true){
  const radius=1600,world=spherical?{surface:{type:'sphere',radius}}:{};
  const parent=new THREE.Group(),staticRoot=new THREE.Group(),sources=[];
  const heights={terrain:0,contour0:.32,contour1:.368,snow:.528,sand:.048,waterLight:.096,ocean:.16,'route-paper':1.2,'route-ink':1.248};
  for(const [key,height]of Object.entries(heights)){
    const geometry=new THREE.BufferGeometry();
    const positions=spherical?[0,height,0,radius+height,-radius,0,0,-radius,-radius-height]:[0,height,0,1,height,0,0,height,1];
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex([0,1,2]);
    if(key==='terrain'||key==='sand')geometry.setAttribute('color',new THREE.Float32BufferAttribute([.2,.4,.1,.3,.5,.2,.1,.3,.2],3));
    if(key.startsWith('route-'))geometry.setAttribute('routeOffset',new THREE.Float32BufferAttribute([1,0,0,-1,0,0,1,0,0],3));
    const material=new THREE.MeshBasicMaterial({name:`map-${key}`,color:key==='terrain'?0xffffff:0x879b63});
    const source=new THREE.Mesh(geometry,material);staticRoot.add(source);sources.push(source);
  }
  // Symbols are not scenery, even if a caller accidentally includes one here.
  const glyph=new THREE.Mesh(sources[0].geometry,new THREE.MeshBasicMaterial({name:'map-city'}));staticRoot.add(glyph);
  const base=createDetailBase(parent,staticRoot,world);
  return {parent,staticRoot,sources,base,world,dispose(){base.dispose();for(const source of sources){source.geometry.dispose();source.material.dispose();}glyph.material.dispose();}};
}
function shaderFor(material){
  const shader={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
  material.onBeforeCompile(shader);return shader;
}

test('coarse detail borrows every terrain and route buffer without changing source attributes',()=>{
  const f=fixture();
  try{
    assert.equal(f.base.root.parent,f.parent);assert.equal(f.base.root.children.length,9);
    for(const [index,source]of f.sources.entries()){
      const mesh=f.base.root.children[index];assert.equal(mesh.geometry,source.geometry);
      assert.equal(mesh.geometry.attributes.position.array,source.geometry.attributes.position.array);
      assert.equal(mesh.geometry.index,source.geometry.index);assert.equal(mesh.geometry.attributes.normal,undefined);
      assert.equal(mesh.castShadow,false);assert.equal(mesh.receiveShadow,true);assert.equal(mesh.frustumCulled,false);
      assert.notEqual(mesh.material,source.material);assert.equal(mesh.material.isMeshStandardMaterial,true);
      assert.equal(mesh.material.flatShading,false);
    }
    assert.equal(f.base.root.getObjectByName('detail-base-city'),undefined);
  }finally{f.dispose();}
});

test('vertex-colored land and shores use white material while uncolored layers preserve source colors',()=>{
  const f=fixture();
  try{
    for(const [index,source]of f.sources.entries()){
      const material=f.base.root.children[index].material,colored=!!source.geometry.attributes.color;
      assert.equal(material.vertexColors,colored);
      assert.equal(material.color.getHex(),colored?0xffffff:source.material.color.getHex());
      assert.notEqual(material.color,source.material.color);
    }
  }finally{f.dispose();}
});

test('sphere shaders replace exaggerated map elevations and supply finite radial normals for both hemispheres',()=>{
  const f=fixture();
  const heights=[-1.35,-.18,-.16,-.14,-1.24,-1.27,-1.27,.025,.035];
  try{
    for(const [index,mesh]of f.base.root.children.entries()){
      const shader=shaderFor(mesh.material),radius=shader.uniforms.detailBaseRadius.value,height=shader.uniforms.detailBaseHeight.value;
      assert.equal(radius,1600);assert.equal(height,heights[index]);
      assert.match(shader.vertexShader,/vec3 objectNormal = detailBaseNormal/);
      assert.match(shader.vertexShader,/detailBaseNormal \* \(detailBaseRadius \+ detailBaseHeight\)/);
      assert.ok(!shader.vertexShader.includes('#include <beginnormal_vertex>'));
      assert.ok(!shader.vertexShader.includes('#include <begin_vertex>'));
      for(let i=0;i<mesh.geometry.attributes.position.count;i++){
        const center=new THREE.Vector3(0,-radius,0),point=new THREE.Vector3().fromBufferAttribute(mesh.geometry.attributes.position,i);
        const normal=point.sub(center).normalize(),transformed=normal.clone().multiplyScalar(radius+height).add(center);
        assert.ok(normal.toArray().every(Number.isFinite));assert.ok(transformed.toArray().every(Number.isFinite));
        assert.ok(Math.abs(transformed.distanceTo(center)-radius-height)<1e-10);
        assert.ok(Math.abs(normal.length()-1)<1e-12);
      }
    }
  }finally{f.dispose();}
});

test('planar shaders lower the same borrowed surface and give it an upward lighting normal',()=>{
  const f=fixture(false);
  try{
    for(const mesh of f.base.root.children){
      const shader=shaderFor(mesh.material);assert.equal(shader.uniforms.detailBaseRadius.value,0);
      assert.match(shader.vertexShader,/vec3 detailBaseNormal = vec3\(0.0, 1.0, 0.0\)/);
      assert.match(shader.vertexShader,/vec3 transformed = vec3\(position.x, detailBaseHeight, position.z\)/);
      assert.ok(mesh.material.customProgramCacheKey().startsWith('detail-base-plane-v1|painted-world-'));
      assert.ok(shader.uniforms.worldNight,'streaming fallback shares the day/night state');
      assert.ok(shader.fragmentShader.includes('paintedPosition'),'height correction composes with surface paint');
    }
  }finally{f.dispose();}
});

test('disposing the coarse layer is idempotent and never releases source geometry or source materials',()=>{
  const f=fixture(),counts={geometry:0,sourceMaterial:0,baseMaterial:0};
  f.sources.forEach(source=>{
    source.geometry.addEventListener('dispose',()=>counts.geometry++);
    source.material.addEventListener('dispose',()=>counts.sourceMaterial++);
  });
  f.base.root.children.forEach(mesh=>mesh.material.addEventListener('dispose',()=>counts.baseMaterial++));
  f.base.dispose();f.base.dispose();
  assert.deepEqual(counts,{geometry:0,sourceMaterial:0,baseMaterial:9});
  assert.equal(f.base.root.parent,null);assert.equal(f.base.root.children.length,0);
  assert.equal(f.staticRoot.children.length,10);assert.ok(f.sources.every(source=>source.geometry.attributes.position.count===3));
  f.dispose();assert.deepEqual(counts,{geometry:9,sourceMaterial:9,baseMaterial:9});
});
