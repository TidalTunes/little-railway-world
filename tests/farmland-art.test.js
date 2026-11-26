import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { farmPatch, ASSET_BOUNDS } from '../src/assets.js';
import { M } from '../src/palette.js';

const inConvex=(point,polygon)=>polygon.every((a,index)=>{
  const b=polygon[(index+1)%polygon.length];
  return(b[0]-a[0])*(point.z-a[1])-(b[1]-a[1])*(point.x-a[0])>=-1e-5;
});

test('angled cultivation, headland features and hedges obey the actual irregular field',()=>{
  const outline=[[-12,-8],[8,-10],[13,6],[-8,10],[-14,2]];
  for(const rowsAngle of [-2.4,-.37,0,1.2])for(const crop of ['wheat','pasture','orchard','fallow','vegetables']){
    const root=farmPatch(new THREE.Group(),{width:28,depth:20,parcels:[{
      x:0,z:0,width:28,depth:20,polygon:outline,crop,rowsAngle,rowPitch:.73,tone:.6,detailSeed:35,
      feature:crop==='pasture'?'trough':crop==='wheat'?'barn':'bales',featurePosition:[9,2],hedgeEdges:[0,1,2,3,4],
    }]});
    root.updateMatrixWorld(true);
    const inverse=root.matrixWorld.clone().invert(),point=new THREE.Vector3();
    root.traverse(mesh=>{
      if(!mesh.isMesh)return;
      const matrix=inverse.clone().multiply(mesh.matrixWorld),positions=mesh.geometry.attributes.position;
      for(let index=0;index<positions.count;index++){
        point.fromBufferAttribute(positions,index).applyMatrix4(matrix);
        assert.ok(inConvex(point,outline),`${crop} at ${rowsAngle}: detail must remain inside its parcel`);
        assert.ok(point.y>=0&&point.y<=ASSET_BOUNDS.farmPatch.height,'all farm accents stay in the reserved height');
      }
    });
  }
});

test('large and narrow fields keep a fixed art budget and reuse shared materials',()=>{
  for(const [width,depth]of [[30,24],[2500,2],[2,2500],[800,800]])for(const crop of ['orchard','wheat','vegetables','fallow']){
    const root=farmPatch(new THREE.Group(),{width,depth,parcels:[{
      x:0,z:0,width,depth,crop,rowsAngle:0,rowPitch:.01,hedgeEdges:[0,1,2,3],detailSeed:24,
    }]});
    let triangles=0;
    root.traverse(mesh=>{
      if(!mesh.isMesh)return;
      triangles+=(mesh.geometry.index?.count??mesh.geometry.attributes.position.count)/3;
      assert.ok(Object.values(M).includes(mesh.material),'farm art reuses the existing material batches');
      if(mesh.material.vertexColors)assert.ok(mesh.geometry.attributes.color,'paint survives scenery consolidation');
    });
    assert.ok(triangles<1100,`${crop}: acreage must not increase the geometry budget`);
  }
});

test('farm details remain deterministic while crop tone varies within a shared batch',()=>{
  const fixture={width:18,depth:14,parcels:[{x:0,z:0,width:18,depth:14,crop:'wheat',rowsAngle:.37,tone:.2,
    detailSeed:53,feature:'barn',hedgeEdges:[0,2]}]};
  const first=farmPatch(new THREE.Group(),fixture),second=farmPatch(new THREE.Group(),fixture);
  const signature=root=>{
    const result=[];
    root.updateMatrixWorld(true);
    root.traverse(mesh=>{if(mesh.isMesh)result.push([mesh.matrixWorld.toArray(),Array.from(mesh.geometry.attributes.position.array)]);});
    return result;
  };
  assert.deepEqual(signature(first),signature(second));
  const other=farmPatch(new THREE.Group(),{...fixture,parcels:[{...fixture.parcels[0],tone:.8}]}),a=first.children[0].children[0],b=other.children[0].children[0];
  assert.equal(a.material,b.material);
  assert.notDeepEqual(a.geometry.attributes.color.array,b.geometry.attributes.color.array);
});
