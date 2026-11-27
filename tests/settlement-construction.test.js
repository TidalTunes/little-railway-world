import test from 'node:test';
import assert from 'node:assert/strict';
import {BoxGeometry,Group,InstancedMesh,Matrix4,MeshBasicMaterial,Vector3} from 'three';
import {createSettlementConstruction,CONSTRUCTION_SECONDS,MAX_CONSTRUCTION_SITES} from '../src/settlement-construction.js';
import {createSettlementArt} from '../src/settlement-art.js';

const world=()=>({seed:'construction',players:[{id:'teal',color:{l:.62,c:.12,h:170}}],gameplay:{ownerId:'teal'},
  outline:[[-100,-100],[100,-100],[100,100],[-100,100]],mountains:[],cities:[],stations:[],placements:[],lines:[],river:{points:[],width:0,y:-1.2},rivers:[]});
const home=index=>({id:`home-${index}`,kind:'house',x:index*4,y:.2,z:3,rotation:.4,variant:0,scale:1});
const pose=item=>new Matrix4().makeRotationY(item.rotation).setPosition(item.x,item.y,item.z);
const matrixAt=(batch,index)=>{const value=new Matrix4();batch.getMatrixAt(index,value);return value;};
const stored=matrix=>Array.from(new Float32Array(matrix.elements));
function fixture(capacity=64){
  const root=new Group(),mapRoot=new Group(),construction=createSettlementConstruction(root,mapRoot,world());
  const geometry=new BoxGeometry(1,1,1),material=new MeshBasicMaterial(),batch=new InstancedMesh(geometry,material,capacity),mapBatch=new InstancedMesh(geometry,material,capacity);
  function sync(items,options={animate:true}){
    construction.beginSync(items,options);
    items.forEach((item,index)=>{const matrix=pose(item),mapMatrix=new Matrix4().makeScale(1.6,1,1.6).setPosition(item.x,.66,item.z);
      batch.setMatrixAt(index,matrix);mapBatch.setMatrixAt(index,mapMatrix);construction.bind(item,batch,index,matrix);construction.bind(item,mapBatch,index,mapMatrix,{map:true});});
    construction.finishSync();
  }
  return {root,mapRoot,construction,batch,mapBatch,sync,dispose(){construction.dispose();batch.dispose();mapBatch.dispose();geometry.dispose();material.dispose();}};
}

test('only newly committed buildings grow, and two seconds restores exact detail and map transforms',()=>{
  const f=fixture(),existing=home(0),added=home(1);
  try{
    f.sync([existing]);assert.equal(f.construction.count,0,'initial saved buildings never animate even when animate is requested');
    const old=matrixAt(f.batch,0).elements,oldMap=matrixAt(f.mapBatch,0).elements;
    f.sync([existing,added]);assert.deepEqual([...f.construction.activeIds],[added.id]);
    assert.ok(matrixAt(f.batch,1).elements[5]<.04);assert.equal(matrixAt(f.batch,1).elements[13],Math.fround(added.y),'growth is anchored at the foundation');
    f.construction.update(.65);const progress=matrixAt(f.batch,1).elements[5];assert.ok(progress>.04&&progress<1);assert.ok(f.construction.dustCount>0);
    assert.deepEqual(matrixAt(f.batch,0).elements,old);assert.deepEqual(matrixAt(f.mapBatch,0).elements,oldMap);
    f.construction.update(CONSTRUCTION_SECONDS-.65);assert.equal(f.construction.count,0);assert.equal(f.construction.activeIds.size,0);assert.equal(f.construction.dustCount,0);
    assert.deepEqual(matrixAt(f.batch,1).elements,stored(pose(added)));
    assert.deepEqual(matrixAt(f.mapBatch,1).elements,stored(new Matrix4().makeScale(1.6,1,1.6).setPosition(added.x,.66,added.z)));
    const versions=[f.batch.instanceMatrix.version,f.mapBatch.instanceMatrix.version];for(let i=0;i<60;i++)f.construction.update(1/60);
    assert.deepEqual([f.batch.instanceMatrix.version,f.mapBatch.instanceMatrix.version],versions,'completed construction causes no further building uploads');
  }finally{f.dispose();}
});

test('active house growth survives art re-sync and instance capacity reallocation without restarting',()=>{
  const art=createSettlementArt(new Group(),new Group(),world()),houses=Array.from({length:15},(_,index)=>home(index));
  try{
    art.sync(houses);houses.push(home(15));art.sync(houses,[],[],{animate:true});art.update({dt:.7});
    const first=art.root.children.filter(mesh=>mesh.isInstancedMesh&&mesh.userData.variant===0),poses=first.map(batch=>matrixAt(batch,15).elements),geometries=first.map(batch=>batch.geometry);
    art.sync(houses,[],[],{animate:true});
    for(const [index,batch]of first.entries())assert.deepEqual(matrixAt(batch,15).elements,poses[index],'ordinary settlement sync preserves elapsed growth');
    let disposed=0;first.forEach(batch=>batch.addEventListener('dispose',()=>disposed++));houses.push(home(16));art.sync(houses,[],[],{animate:true});
    const expanded=art.root.children.filter(mesh=>mesh.isInstancedMesh&&mesh.userData.variant===0);
    assert.equal(disposed,first.length);assert.deepEqual(expanded.map(batch=>batch.geometry),geometries);assert.ok(expanded.every(batch=>batch.instanceMatrix.count===32));
    for(const [index,batch]of expanded.entries())assert.deepEqual(matrixAt(batch,15).elements,poses[index],'reallocation rebinds the growing instance at the same progress');
    assert.equal(art.construction.count,2);art.update({dt:1.3});assert.deepEqual([...art.construction.activeIds],[home(16).id]);
    for(const batch of expanded)assert.deepEqual(matrixAt(batch,15).elements,stored(pose(home(15))));
    art.update({dt:.7});assert.equal(art.construction.count,0);
    for(const batch of expanded)assert.deepEqual(matrixAt(batch,16).elements,stored(pose(home(16))));
  }finally{art.dispose();}
});

test('construction keeps full bounds conservative throughout growth and keeps civic transforms exact',()=>{
  const art=createSettlementArt(new Group(),new Group(),world()),existing=home(0),civic={id:'hall',kind:'civic',buildingType:'hall',x:7,y:.4,z:-4,rotation:.6,scale:1.2,width:3.9,depth:3.9};
  try{
    art.sync([existing]);art.sync([existing],[],[civic],{animate:true});
    const batches=art.root.children.filter(mesh=>mesh.isInstancedMesh&&mesh.userData.buildingType==='hall');assert.ok(batches.length>0);
    const bounds=batches.map(batch=>batch.boundingBox.clone().expandByScalar(1e-5)),spheres=batches.map(batch=>{const sphere=batch.boundingSphere.clone();sphere.radius+=1e-5;return sphere;}),full=pose(civic).scale(new Vector3().setScalar(civic.scale));
    for(const dt of [.2,.6,.8,.4]){
      art.update({dt});
      for(const [index,batch]of batches.entries()){
        const matrix=matrixAt(batch,0),points=batch.geometry.attributes.position,point=new Vector3();
        for(let i=0;i<points.count;i++){point.fromBufferAttribute(points,i).applyMatrix4(matrix);assert.ok(bounds[index].containsPoint(point),`${batch.name} ${batch.material.userData.sceneStyle??'solid'} full bounds must contain animated vertex ${point.toArray()}`);assert.ok(spheres[index].containsPoint(point),'frustum sphere must contain the entire growth sweep');}
      }
    }
    assert.equal(art.construction.count,0);for(const batch of batches)assert.deepEqual(matrixAt(batch,0).elements,stored(full));
  }finally{art.dispose();}
});

test('dust stays within fixed capacity and switches cleanly between detailed, blended and flat map layers',()=>{
  const f=fixture(),items=Array.from({length:MAX_CONSTRUCTION_SITES+8},(_,index)=>home(index));
  try{
    f.sync([]);f.sync(items);assert.equal(f.construction.count,MAX_CONSTRUCTION_SITES);assert.equal(f.construction.activeIds.size,MAX_CONSTRUCTION_SITES);
    const dust=f.root.getObjectByName('construction-dust'),mapDust=f.mapRoot.getObjectByName('construction-dust');
    assert.equal(dust.geometry,mapDust.geometry);assert.equal(dust.instanceMatrix.count,MAX_CONSTRUCTION_SITES*24);
    f.construction.update(.5,{mapBlend:0});assert.ok(f.construction.dustCount>0);assert.ok(f.construction.dustCount<=dust.instanceMatrix.count);
    assert.equal(dust.visible,true);assert.equal(mapDust.visible,false);assert.equal(dust.count,mapDust.count);
    f.construction.update(0,{mapBlend:.5});assert.equal(dust.visible,true);assert.equal(mapDust.visible,true);
    f.construction.update(0,{mapBlend:1});assert.equal(dust.visible,false);assert.equal(mapDust.visible,true);
    for(let i=0;i<mapDust.count;i++){
      const matrix=matrixAt(mapDust,i),scale=new Vector3().setFromMatrixScale(matrix);assert.ok(Math.abs(scale.y-.08)<1e-6,'map dust remains a thin silhouette');
      const opacity=mapDust.geometry.attributes.dustOpacity.getX(i);assert.ok(opacity>0&&opacity<=.46+1e-6);
    }
    f.construction.update(2,{mapBlend:1});assert.equal(dust.visible,false);assert.equal(mapDust.visible,false);assert.equal(dust.count,0);assert.equal(mapDust.count,0);
  }finally{f.dispose();}
});

test('reduced motion immediately settles active work and skips new reveals without disturbing existing homes',()=>{
  const f=fixture(),first=home(0),second=home(1),third=home(2);
  try{
    f.sync([first]);f.sync([first,second]);f.construction.update(.3);assert.equal(f.construction.count,1);
    f.construction.update(0,{reducedMotion:true});assert.equal(f.construction.count,0);assert.equal(f.construction.dustCount,0);
    assert.deepEqual(matrixAt(f.batch,1).elements,stored(pose(second)));
    f.sync([first,second,third],{animate:true,reducedMotion:true});assert.equal(f.construction.count,0);
    for(const [index,item]of [first,second,third].entries())assert.deepEqual(matrixAt(f.batch,index).elements,stored(pose(item)));
    f.sync([first,second,third,home(3)]);assert.equal(f.construction.count,1);
    f.sync([first,second,third],{animate:true});assert.equal(f.construction.count,0,'removing a site cancels its active state');
  }finally{f.dispose();}
});

test('construction disposes both instance buffers, shared geometry and both materials exactly once',()=>{
  const root=new Group(),mapRoot=new Group(),construction=createSettlementConstruction(root,mapRoot,world());
  const dust=root.getObjectByName('construction-dust'),mapDust=mapRoot.getObjectByName('construction-dust');
  const resources=new Set([dust,mapDust,dust.geometry,dust.material,mapDust.material]),counts=new Map();
  for(const item of resources){counts.set(item,0);item.addEventListener('dispose',()=>counts.set(item,counts.get(item)+1));}
  construction.beginSync([]);construction.beginSync([home(0)],{animate:true});construction.update(.3);assert.ok(construction.count>0);
  construction.dispose();assert.equal(root.children.length,0);assert.equal(mapRoot.children.length,0);assert.equal(construction.count,0);assert.equal(construction.activeIds.size,0);
  for(const count of counts.values())assert.equal(count,1);
});
