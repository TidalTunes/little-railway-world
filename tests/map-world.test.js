import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { generateWorld } from '../src/world-model.js';
import { buildMapWorld } from '../src/map-world.js';

test('the map draws the complete world as a small set of flat unlit batches', () => {
  const world=generateWorld(),parent=new THREE.Group(),map=buildMapWorld(parent,world);
  assert.equal(map.root.parent,parent);
  const staticRoot=map.root.getObjectByName('map-static');
  assert.ok(staticRoot.children.length<40,'static drawings merge by material');
  for(const name of ['farmland','forestFloor','grass','desert','ocean','mountainFloor','waterLight','ink']){
    assert.ok(staticRoot.getObjectByName(`map-${name}`),`${name} is represented in the map`);
  }
  for(const mesh of staticRoot.children){
    assert.ok(mesh.material.isMeshBasicMaterial,'map colors do not depend on scene lights');
    assert.equal(mesh.material.toneMapped,false);
    assert.equal(mesh.castShadow,false);assert.equal(mesh.receiveShadow,false);
    assert.equal(mesh.material.map,null,'all map details are geometry, with no labels or texture text');
    const positions=mesh.geometry.attributes.position;
    for(let i=0;i<positions.count;i+=3){
      const y=positions.getY(i);
      assert.ok(y>=-1e-5&&y<=.1,'map ordering occupies only a thin horizontal layer');
      assert.ok(Math.abs(positions.getY(i+1)-y)<1e-6&&Math.abs(positions.getY(i+2)-y)<1e-6,
        'every triangle is horizontal, including mountain contours and asset glyphs');
    }
  }
  parent.updateMatrixWorld(true);
  const river=staticRoot.getObjectByName('map-waterLight');
  let intersections=0;
  for(const point of world.river.points){
    const ray=new THREE.Raycaster(new THREE.Vector3(point.x,1,point.z),new THREE.Vector3(0,-1,0));
    intersections+=ray.intersectObject(river).length;
  }
  assert.ok(intersections>10,'river centerline remains registered to its model coordinates');
  map.dispose();
});

test('map carriages mirror existing transformed train poses and visibility without a second clock', () => {
  const map=buildMapWorld(new THREE.Group(),generateWorld({density:0}));
  const source=new THREE.Group();source.position.set(3,7,-2);source.rotation.y=.37;
  const parts=Array.from({length:3},(_,i)=>{
    const part=new THREE.Group();part.position.set(2+i*2.64,.42,8);part.rotation.y=.63;
    source.add(part);return part;
  });
  const state={id:'train',color:'coral',active:true},trains=[{state,parts}];
  const matrix=new THREE.Matrix4(),actual=new THREE.Vector3(),expected=new THREE.Vector3(),rotation=new THREE.Quaternion(),scale=new THREE.Vector3();
  for(let step=0;step<3;step++){
    parts.forEach(part=>{part.position.x+=.7;part.rotation.y+=.2;});
    map.update(trains);
    const outlines=map.root.getObjectByName('map-train-outlines');
    assert.equal(outlines.count,3);
    for(let i=0;i<parts.length;i++){
      outlines.getMatrixAt(i,matrix);matrix.decompose(actual,rotation,scale);parts[i].getWorldPosition(expected);
      assert.ok(Math.hypot(actual.x-expected.x,actual.z-expected.z)<1e-5,'marker follows the same carriage');
      const heading=new THREE.Vector3(0,0,1).applyQuaternion(rotation);
      const expectedHeading=new THREE.Vector3(0,0,1).applyQuaternion(parts[i].getWorldQuaternion(new THREE.Quaternion()));
      assert.ok(heading.dot(expectedHeading)>.99999,'marker preserves train heading');
      assert.ok(Math.abs(scale.x-1)<1e-5,'active carriages have visible size');
    }
  }
  state.active=false;map.update(trains);
  const outlines=map.root.getObjectByName('map-train-outlines');
  for(let i=0;i<3;i++){outlines.getMatrixAt(i,matrix);assert.equal(matrix.getMaxScaleOnAxis(),0);}
  state.active=true;parts[1].visible=false;map.update(trains);
  outlines.getMatrixAt(1,matrix);assert.equal(matrix.getMaxScaleOnAxis(),0);
  assert.equal(state.distance,undefined,'the renderer creates no simulation state');
  map.dispose();
});

test('map replacement frees its owned materials, buffers and instance resources exactly once', () => {
  const parent=new THREE.Group(),map=buildMapWorld(parent,generateWorld({density:0}));
  const part=new THREE.Group();map.update([{state:{id:'a',color:'teal',active:true},parts:[part]}]);
  const geometries=new Set(),materials=new Set(),instances=[];
  map.root.traverse(mesh=>{
    if(!mesh.isMesh)return;geometries.add(mesh.geometry);materials.add(mesh.material);
    if(mesh.isInstancedMesh)instances.push(mesh);
  });
  const disposed=new Map();
  for(const resource of [...geometries,...materials,...instances]){
    disposed.set(resource,0);resource.addEventListener('dispose',()=>disposed.set(resource,disposed.get(resource)+1));
  }
  map.dispose();map.dispose();map.update([]);
  assert.equal(parent.children.length,0,'disposing also detaches the map');
  for(const count of disposed.values())assert.equal(count,1,'per-map GPU resources are disposed once');
});
