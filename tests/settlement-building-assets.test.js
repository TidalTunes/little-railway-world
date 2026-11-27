import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3,Group,Matrix4,Raycaster,Vector3} from 'three';
import {buildSettlementBuilding} from '../src/settlement-building-assets.js';
import {SETTLEMENT_MILESTONES} from '../src/settlement-progression.js';
import {createPlayerPalette} from '../src/player-palette.js';
import {M} from '../src/palette.js';
import {consolidate} from '../src/geometry.js';
import {landmark,civic,plaza} from '../src/assets.js';

function release(root){consolidate(root);for(const mesh of root.children)mesh.geometry.dispose();}

test('milestone architecture fits its shared reservation and has a front entry at the planned path endpoint',()=>{
  for(const spec of SETTLEMENT_MILESTONES){
    const root=buildSettlementBuilding(new Group(),{buildingType:spec.type});root.updateMatrixWorld(true);
    try{
      const bounds=new Box3().setFromObject(root,true);
      assert.ok(bounds.min.y>=-1e-7&&bounds.max.y<=spec.height+1e-6,`${spec.type} fits its height`);
      assert.ok(bounds.min.x>=-spec.width/2-1e-6&&bounds.max.x<=spec.width/2+1e-6,`${spec.type} fits its width`);
      assert.ok(bounds.min.z>=-spec.depth/2-1e-6&&bounds.max.z<=spec.depth/2+1e-6,`${spec.type} fits its depth`);
      assert.deepEqual(root.userData.footprint,{width:spec.width,depth:spec.depth,height:spec.height});
      assert.deepEqual(root.userData.entrance,{x:0,z:spec.doorOffset});
      // Frontage ground is a low continuous stone plinth, without an entrance
      // post or wall that would block a traveller at the path endpoint.
      const hits=new Raycaster(new Vector3(0,.73,spec.doorOffset),new Vector3(0,-1,0),0,.8).intersectObject(root,true);
      assert.ok(hits.length>0&&hits[0].point.y<=.22,`${spec.type} has an accessible doorstep`);
    }finally{release(root);}
  }
});

test('all milestone meshes reuse world or owner materials and retain a bounded geometry budget',()=>{
  const palette=createPlayerPalette({id:'purple',color:{l:.62,c:.12,h:300}}),allowed=new Set([...Object.values(M),...Object.values(palette)]);
  try{
    for(const spec of SETTLEMENT_MILESTONES){
      const root=buildSettlementBuilding(new Group(),{buildingType:spec.type,palette});let triangles=0,ownedPieces=0;
      root.traverse(part=>{if(!part.isMesh)return;
        assert.ok(allowed.has(part.material),'building does not create untracked materials');
        if(Object.values(palette).includes(part.material))ownedPieces++;
        triangles+=(part.geometry.index?.count??part.geometry.attributes.position.count)/3;
        assert.ok([...part.geometry.attributes.position.array].every(Number.isFinite));
      });
      assert.ok(ownedPieces>=4,`${spec.type} carries the player's palette`);
      assert.ok(triangles<1600,`${spec.type} stays inexpensive`);release(root);
    }
  }finally{for(const material of Object.values(palette))material.dispose();}
});

test('clock and hall retain the original clock faces without duplicate fixed hands',()=>{
  for(const buildingType of ['clock','hall']){
    const root=buildSettlementBuilding(new Group(),{buildingType}),faces=[];
    root.traverse(part=>{if(part.name==='clock-face')faces.push(part);});
    assert.equal(faces.length,buildingType==='clock'?4:1);
    assert.ok(faces.every(face=>face.children.every(part=>part.isMesh)),'moving hand pivots belong only to the shared clock renderer');
    release(root);
  }
});

test('later milestones retain the established civic assets and do not add railway stations or clocks',()=>{
  const assets=[['waterTower',landmark,2],['plaza',plaza,0],['library',civic,1],['guildhall',civic,2],['chapel',landmark,1]];
  for(const [type,build,variant]of assets){
    const current=buildSettlementBuilding(new Group(),{buildingType:type}),original=build(new Group(),{variant}),meshes=[];
    original.traverse(part=>{if(part.isMesh)meshes.push(part);});let index=0;
    current.updateMatrixWorld(true);original.updateMatrixWorld(true);
    current.traverse(part=>{
      assert.notEqual(part.name,'station');assert.notEqual(part.name,'clock-face');
      if(!part.isMesh)return;
      const expected=meshes[index++];assert.ok(expected);
      assert.deepEqual(part.geometry.attributes.position.array,expected.geometry.attributes.position.array);
      assert.deepEqual(part.matrixWorld.elements,expected.matrixWorld.elements);
      assert.equal(part.material,expected.material,'existing material ownership remains intact');
    });
    assert.equal(index,meshes.length);release(current);release(original);
  }
});

test('milestone placement composes one common transform without changing the local model',()=>{
  const pose={x:13,y:.8,z:-7,rotation:.71,scale:1.2},point=new Vector3();
  for(const {type}of SETTLEMENT_MILESTONES){
    const original=buildSettlementBuilding(new Group(),{buildingType:type}),placed=buildSettlementBuilding(new Group(),{buildingType:type,...pose});
    original.updateMatrixWorld(true);placed.updateMatrixWorld(true);
    const transform=new Matrix4().makeRotationY(pose.rotation).scale(new Vector3().setScalar(pose.scale));transform.setPosition(pose.x,pose.y,pose.z);
    const before=[],after=[];original.traverse(part=>{if(part.isMesh)before.push(part);});placed.traverse(part=>{if(part.isMesh)after.push(part);});
    assert.equal(before.length,after.length);
    for(let i=0;i<before.length;i++){
      const vertex=before[i].geometry.attributes.position;
      for(let j=0;j<vertex.count;j++){
        point.fromBufferAttribute(vertex,j).applyMatrix4(before[i].matrixWorld).applyMatrix4(transform);
        const actual=new Vector3().fromBufferAttribute(after[i].geometry.attributes.position,j).applyMatrix4(after[i].matrixWorld);
        assert.ok(point.distanceTo(actual)<1e-5);
      }
    }
    release(original);release(placed);
  }
});
