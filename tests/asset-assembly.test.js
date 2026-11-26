import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {house,station,landmark,apartment,civic,tower,tree,buildTrainCar} from '../src/assets.js';

const builders={house:[house,4],station:[station,1],landmark:[landmark,3],apartment:[apartment,3],
  civic:[civic,3],tower:[tower,3],tree:[tree,9],train:[buildTrainCar,2]};
function pieces(root){root.updateMatrixWorld(true);const meshes=[];root.traverse(mesh=>{if(mesh.isMesh)meshes.push(mesh);});return meshes;}

test('building, train and tree assemblies have no disconnected floating parts',()=>{
  // Contact graphs catch the millimetre seams in window frames, clocks,
  // platform furniture and roof caps that are conspicuous at ground level.
  for(const [name,[build,count]]of Object.entries(builders))for(let variant=0;variant<count;variant++){
    const meshes=pieces(build(new THREE.Group(),{variant,cab:variant===1}));
    const bounds=meshes.map(mesh=>new THREE.Box3().setFromObject(mesh,true));
    const connected=new Set(bounds.map((box,i)=>box.min.y<1e-5?i:-1).filter(i=>i>=0));
    for(let previous=-1;previous!==connected.size;){
      previous=connected.size;
      for(let i=0;i<bounds.length;i++)if(!connected.has(i)&&[...connected].some(j=>bounds[j].clone().expandByScalar(1e-5).intersectsBox(bounds[i])))connected.add(i);
    }
    assert.equal(connected.size,bounds.length,`${name} ${variant}: every part connects to the ground-supported assembly`);
  }
});

test('pitched roofs close onto a supporting wall or cornice instead of hovering',()=>{
  for(const [name,[build,count]]of Object.entries(builders))for(let variant=0;variant<count;variant++){
    const meshes=pieces(build(new THREE.Group(),{variant,cab:variant===1}));
    for(const mesh of meshes){
      if(mesh.geometry.attributes.position.count!==6)continue;
      const bounds=new THREE.Box3().setFromObject(mesh,true),center=bounds.getCenter(new THREE.Vector3());
      const ray=new THREE.Raycaster(new THREE.Vector3(center.x,30,center.z),new THREE.Vector3(0,-1,0));
      const support=ray.intersectObjects(meshes.filter(other=>other!==mesh),false)[0];
      assert.ok(support&&support.point.y>=bounds.min.y-1e-5,`${name} ${variant}: roof underside touches its supporting building`);
    }
  }
});
