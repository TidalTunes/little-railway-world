import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3,Group,Matrix4,Vector3} from 'three';
import {createSettlementArt} from '../src/settlement-art.js';
import {house} from '../src/assets.js';
import {consolidate} from '../src/geometry.js';
import {M} from '../src/palette.js';
import {createWalkingPlayer} from '../src/walking-player.js';

function world(){return {seed:'art-test',players:[{id:'teal',color:{l:.62,c:.12,h:170}}],
  gameplay:{ownerId:'teal'},outline:[[-100,-100],[100,-100],[100,100],[-100,100]],mountains:[],cities:[],stations:[],placements:[],lines:[],
  river:{points:[],width:0,y:-1.2},rivers:[]};}
function setup(){const scene=new Group(),map=new Group(),model=world();return{scene,map,model,art:createSettlementArt(scene,map,model)};}
const homes=()=>Array.from({length:4},(_,variant)=>({id:`home-${variant}`,kind:'house',x:variant*5-7,y:variant*.2,z:variant*3+2,
  rotation:variant*Math.PI/5,variant,ownerId:'teal',scale:1}));
function nearBounds(actual,expected){for(const bound of ['min','max'])for(const axis of ['x','y','z'])
  assert.ok(Math.abs(actual[bound][axis]-expected[bound][axis])<1e-5,`${bound}.${axis}: ${actual[bound][axis]} versus ${expected[bound][axis]}`);}
function previewMesh(root){return root.children.find(node=>node.isMesh&&node.material.transparent&&node.material.opacity===.30);}

test('instanced homes preserve all four original house silhouettes and their authored transforms',()=>{
  const {art}=setup();
  try{
    const placements=homes();art.sync(placements);
    for(const item of placements){
      const original=new Group();house(original,item);consolidate(original);original.updateMatrixWorld(true);
      const expected=new Box3().setFromObject(original),actual=new Box3();
      const batches=art.root.children.filter(node=>node.isInstancedMesh&&node.userData.variant===item.variant);
      assert.ok(batches.length>0);
      for(const mesh of batches){
        assert.equal(mesh.count,1);
        mesh.computeBoundingBox();actual.union(mesh.boundingBox);
        const matrix=new Matrix4();mesh.getMatrixAt(0,matrix);
        assert.ok(new Vector3().setFromMatrixPosition(matrix).distanceTo(new Vector3(item.x,item.y,item.z))<1e-5);
      }
      nearBounds(actual,expected);
      for(const mesh of original.children)mesh.geometry.dispose();
    }
  }finally{art.dispose();}
});

test('blueprints reuse the correct variant geometry and clear valid or invalid colors in both camera layers',()=>{
  const {art}=setup();
  try{
    art.sync(homes());const ghost=previewMesh(art.root),mapGhost=previewMesh(art.mapRoot),geometryByVariant=[];
    const childCount=art.root.children.length;
    for(let variant=0;variant<4;variant++){
      const item={...homes()[variant],x:4,z:6};
      art.preview({house:item,valid:true,connected:false},{visible:true});
      assert.equal(ghost.visible,true);assert.equal(mapGhost.visible,true);assert.equal(ghost.geometry,mapGhost.geometry);
      assert.equal(ghost.material,mapGhost.material);assert.equal(ghost.material.color.getHexString(),'5dd9b4');
      assert.equal(ghost.position.x,item.x);assert.equal(ghost.position.y,item.y);assert.equal(ghost.position.z,item.z);
      assert.equal(mapGhost.position.x,item.x);assert.equal(mapGhost.position.z,item.z);assert.equal(mapGhost.rotation.y,item.rotation);
      const original=new Group();house(original,{variant});consolidate(original);original.updateMatrixWorld(true);
      ghost.geometry.computeBoundingBox();nearBounds(ghost.geometry.boundingBox,new Box3().setFromObject(original));
      for(const mesh of original.children)mesh.geometry.dispose();
      geometryByVariant.push(ghost.geometry);
      art.preview({house:item,valid:false,connected:false},{visible:true});
      assert.equal(ghost.material.color.getHexString(),'ec565c');
      assert.equal(ghost.geometry,geometryByVariant[variant]);
    }
    assert.equal(new Set(geometryByVariant).size,4);
    for(let i=0;i<80;i++)art.preview({house:{...homes()[i%4],x:i/10},valid:!!(i%2)},{visible:true});
    assert.equal(art.root.children.length,childCount,'moving a blueprint does not add scene objects');
    art.update({mapBlend:1});assert.equal(art.root.visible,false);assert.equal(art.mapRoot.visible,true);assert.equal(mapGhost.visible,true);
    art.update({mapBlend:0});assert.equal(art.root.visible,true);assert.equal(art.mapRoot.visible,false);
    art.preview(null,{visible:false});assert.equal(ghost.visible,false);assert.equal(mapGhost.visible,false);
  }finally{art.dispose();}
});

test('preview changes avoid committed instance uploads and capacity grows without duplicating house geometry',()=>{
  const {art}=setup();
  try{
    art.sync(homes());const firstBatches=art.root.children.filter(node=>node.isInstancedMesh),geometries=firstBatches.map(batch=>batch.geometry);
    const versions=firstBatches.map(batch=>batch.instanceMatrix.version);
    for(let i=0;i<30;i++)art.preview({house:{...homes()[i%4],x:i},valid:true,connected:false},{visible:true});
    assert.deepEqual(firstBatches.map(batch=>batch.instanceMatrix.version),versions);
    const expanded=Array.from({length:33},(_,index)=>({...homes()[index%4],id:`home-${index}`,x:index*4}));
    art.sync(expanded);
    const batches=art.root.children.filter(node=>node.isInstancedMesh);
    assert.equal(batches.length,firstBatches.length);
    assert.deepEqual(batches.map(batch=>batch.geometry),geometries,'capacity reuses baked template geometry');
    for(const batch of batches){
      assert.equal(batch.instanceMatrix.count,64);
      assert.equal(batch.count,expanded.filter(home=>home.variant===batch.userData.variant).length);
      assert.ok(batch.boundingSphere.radius>0&&Number.isFinite(batch.boundingSphere.radius));
    }
    const markers=art.mapRoot.children.find(node=>node.isInstancedMesh);
    assert.equal(markers.count,expanded.length);
  }finally{art.dispose();}
});

test('committed houses expose real transformed collision bounds and retract a nearby walking camera',()=>{
  const {art,scene,model}=setup(),placement={id:'home-1',kind:'house',x:0,y:0,z:-2,rotation:0,variant:0,scale:1};
  art.sync([placement]);const meshes=art.meshes;
  assert.ok(meshes.length>0);assert.equal(meshes.some(mesh=>mesh.material.userData.sceneStyle==='window'),false);
  assert.ok(meshes.every(mesh=>mesh.boundingBox.containsPoint(new Vector3(0,1,-2))));
  const player=createWalkingPlayer(scene,model,{getCollisionPlacements:()=>[placement],getTerrainMeshes:()=>meshes});
  try{
    assert.equal(player.enter({x:0,z:0}),true);
    assert.ok(player.camera.position.z>-1.05,'the actual house wall retracts the camera before it clips');
  }finally{player.dispose();art.dispose();}
});

test('disposing settlement art releases every owned visible resource without disposing shared world materials',()=>{
  const {art,scene,map}=setup();art.sync(homes());
  const resources=new Set();
  const remember=()=>{for(const root of [art.root,art.mapRoot])root.traverse(node=>{
    if(node.geometry)resources.add(node.geometry);if(node.material)resources.add(node.material);if(node.isInstancedMesh)resources.add(node);
  });};
  for(let variant=0;variant<4;variant++){art.preview({house:homes()[variant],valid:true},{visible:true});remember();}
  const counts=new Map([...resources].map(resource=>[resource,0]));
  for(const resource of resources)resource.addEventListener('dispose',()=>counts.set(resource,counts.get(resource)+1));
  let sharedDisposals=0;const onShared=()=>sharedDisposals++;
  M.window.addEventListener('dispose',onShared);M.platform.addEventListener('dispose',onShared);
  art.dispose();
  M.window.removeEventListener('dispose',onShared);M.platform.removeEventListener('dispose',onShared);
  assert.equal(art.root.parent,null);assert.equal(art.mapRoot.parent,null);assert.equal(scene.children.length,0);assert.equal(map.children.length,0);
  assert.equal(sharedDisposals,0);
  for(const [resource,count]of counts)assert.equal(count,1,`${resource.type??'resource'} must dispose exactly once`);
});
