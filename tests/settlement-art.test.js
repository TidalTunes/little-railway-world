import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3,Group,Matrix4,Vector3,Raycaster} from 'three';
import {createSettlementArt} from '../src/settlement-art.js';
import {house} from '../src/assets.js';
import {consolidate} from '../src/geometry.js';
import {M} from '../src/palette.js';
import {createWalkingPlayer} from '../src/walking-player.js';
import {buildSettlementBuilding} from '../src/settlement-building-assets.js';
import {SETTLEMENT_BUILDINGS as SETTLEMENT_MILESTONES} from '../src/settlement-progression.js';

function world(){return {seed:'art-test',players:[{id:'teal',color:{l:.62,c:.12,h:170}}],
  gameplay:{ownerId:'teal'},outline:[[-100,-100],[100,-100],[100,100],[-100,100]],mountains:[],cities:[],stations:[],placements:[],lines:[],
  river:{points:[],width:0,y:-1.2},rivers:[]};}
function setup(){const scene=new Group(),map=new Group(),model=world();return{scene,map,model,art:createSettlementArt(scene,map,model)};}
const homes=()=>Array.from({length:4},(_,variant)=>({id:`home-${variant}`,kind:'house',x:variant*5-7,y:variant*.2,z:variant*3+2,
  rotation:variant*Math.PI/5,variant,ownerId:'teal',scale:1}));
const civics=()=>SETTLEMENT_MILESTONES.map((spec,index)=>({...spec,id:`civic-${spec.type}`,kind:'civic',buildingType:spec.type,cityId:'city:home-0',
  x:index*6-9,y:index*.08,z:-6-index,rotation:index*Math.PI/6,ownerId:'teal',scale:1}));
function nearBounds(actual,expected){for(const bound of ['min','max'])for(const axis of ['x','y','z'])
  assert.ok(Math.abs(actual[bound][axis]-expected[bound][axis])<1e-5,`${bound}.${axis}: ${actual[bound][axis]} versus ${expected[bound][axis]}`);}
function previewMesh(root){return root.getObjectByName('settlement-blueprint');}

test('neutral villages use their own gray palette without changing player art or geometry',()=>{
  const model=world();model.players.push({id:'village-gray',color:{l:.59,c:0,h:0}});
  const scene=new Group(),map=new Group(),owned=createSettlementArt(scene,map,model),neutral=createSettlementArt(scene,map,model,{ownerId:'village-gray'});
  try{
    const placements=homes();owned.sync(placements);neutral.sync(placements.map(home=>({...home,ownerId:'village-gray'})));
    const marker=art=>art.mapRoot.children.find(node=>node.isInstancedMesh).material.color;
    const gray=marker(neutral),teal=marker(owned);
    assert.ok(Math.max(gray.r,gray.g,gray.b)-Math.min(gray.r,gray.g,gray.b)<1e-5);
    assert.ok(teal.g-teal.r>.05,'the player keeps their existing teal palette');
    for(const source of owned.meshes){
      const other=neutral.meshes.find(mesh=>mesh.name===source.name&&mesh.userData.variant===source.userData.variant);
      assert.ok(other);assert.deepEqual(Array.from(other.instanceMatrix.array),Array.from(source.instanceMatrix.array));
    }
    assert.equal(neutral.construction.count,0,'generated village buildings appear complete');
  }finally{owned.dispose();neutral.dispose();}
});

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

test('blueprints use one simple lot cube with valid or invalid colors in both camera layers',()=>{
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
      ghost.geometry.computeBoundingBox();nearBounds(ghost.geometry.boundingBox,new Box3(new Vector3(-1.1,0,-1.1),new Vector3(1.1,2.2,1.1)));
      assert.equal(ghost.geometry.index.count,36,'only six cube faces, with no roof or window detail');
      geometryByVariant.push(ghost.geometry);
      art.preview({house:item,valid:false,connected:false},{visible:true});
      assert.equal(ghost.material.color.getHexString(),'ec565c');
      assert.equal(ghost.geometry,geometryByVariant[variant]);
    }
    assert.equal(new Set(geometryByVariant).size,1);
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
  const {art,scene,map}=setup();art.sync(homes(),[],civics());
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

test('milestone templates retain their exact placement, distinguish map marks and join collision mesh selection',()=>{
  const {art}=setup();
  try{
    const buildings=civics();art.sync(homes(),[],buildings);
    const glyphs=[];
    for(const item of buildings){
      const original=new Group();buildSettlementBuilding(original,item);consolidate(original);original.updateMatrixWorld(true);
      const expected=new Box3().setFromObject(original),actual=new Box3();
      const batches=art.root.children.filter(node=>node.isInstancedMesh&&node.userData.buildingType===item.buildingType);
      for(const batch of batches){
        assert.equal(batch.count,1);const pose=new Matrix4(),point=new Vector3();batch.getMatrixAt(0,pose);
        // A circular plaza rotated inside an instanced AABB is intentionally
        // conservative. Compare actual transformed vertices, not that box.
        const vertices=batch.geometry.attributes.position;
        for(let index=0;index<vertices.count;index++)actual.expandByPoint(point.fromBufferAttribute(vertices,index).applyMatrix4(pose));
      }
      nearBounds(actual,expected);
      assert.ok(art.meshes.some(mesh=>mesh.userData.buildingType===item.buildingType));
      const marker=art.mapRoot.getObjectByName(`settlement-civic-map-${item.buildingType}`),pose=new Matrix4();marker.getMatrixAt(0,pose);
      assert.equal(marker.count,0,'city landmarks defer to the single level numeral');
      glyphs.push(Array.from(marker.geometry.attributes.position.array).join(','));
      for(const mesh of original.children)mesh.geometry.dispose();
    }
    assert.equal(new Set(glyphs).size,SETTLEMENT_MILESTONES.length,'every milestone has a different wordless map symbol');
    const before=art.root.children.filter(node=>node.isInstancedMesh&&node.userData.buildingType),geometries=before.map(batch=>batch.geometry);
    const expanded=[...buildings,...buildings.map((item,index)=>({...item,id:`second-${index}`,x:item.x+30}))];
    art.sync(homes(),[],expanded);
    const grown=art.root.children.filter(node=>node.isInstancedMesh&&node.userData.buildingType);
    assert.deepEqual(grown.map(batch=>batch.geometry),geometries,'capacity growth reuses the same authored building geometry');
    for(const batch of grown)assert.equal(batch.count,2);
    art.sync(homes(),[],[]);assert.ok(grown.every(batch=>batch.count===0));
    assert.equal(art.meshes.some(mesh=>mesh.userData.buildingType),false,'removed civic batches cannot affect the camera');
  }finally{art.dispose();}
});


test('settlement paths merge junctions, sit on the terrain and remain visible in the map',()=>{
  const {art}=setup();
  try{
    const paths=[{id:'lane-a',width:.45,points:[{x:-5,z:0},{x:5,z:0}]},
      {id:'lane-b',width:.45,points:[{x:0,z:-5},{x:0,z:5}]}];
    art.sync(homes(),paths);art.root.updateMatrixWorld(true);
    const lanes=art.root.getObjectByName('settlement-paths'),mapLanes=art.mapRoot.getObjectByName('settlement-map-paths');
    assert.equal(lanes.children.length,1,'connected paths share a single joined surface');
    assert.equal(mapLanes.children.length,1);
    const mesh=lanes.children[0],positions=mesh.geometry.attributes.position;
    for(let i=0;i<positions.count;i++)assert.ok(Math.abs(positions.getY(i)-.026)<1e-6);
    const hits=new Raycaster(new Vector3(.03,2,.02),new Vector3(0,-1,0)).intersectObject(mesh);
    assert.equal(hits.length,1,'the crossing has one surface, not overlapping strips');
    const flat=mapLanes.children[0].geometry.attributes.position;
    for(let i=0;i<flat.count;i++)assert.ok(Math.abs(flat.getY(i)-.62)<1e-6);
    const old=mesh.geometry;let released=0;old.addEventListener('dispose',()=>released++);
    art.sync(homes(),[]);assert.equal(released,1);assert.equal(lanes.children.length,0);
  }finally{art.dispose();}
});

test('the connection preview follows the proposed door path instead of crossing the house centers',()=>{
  const {art}=setup();
  try{
    const points=[{x:1,y:0,z:2},{x:1,y:0,z:4},{x:3,y:0,z:4}];
    art.preview({house:homes()[0],valid:true,connected:true,path:{points}},{visible:true});
    const path=art.root.getObjectByName('settlement-path-preview'),position=path.geometry.attributes.position;
    assert.equal(path.visible,true);assert.equal(path.geometry.drawRange.count,(points.length-1)*2);
    for(const [i,point] of [points[0],points[1],points[1],points[2]].entries()){assert.equal(position.getX(i),point.x);assert.equal(position.getZ(i),point.z);}
    const second=[{x:8,y:0,z:2},{x:9,y:0,z:4}];
    art.preview({house:homes()[0],valid:true,paths:[{points},{points:second}]},{visible:true});
    for(const root of [art.root,art.mapRoot]){
      const preview=root.getObjectByName('settlement-path-preview');assert.equal(preview.visible,true);assert.equal(preview.geometry.drawRange.count,6);
      assert.equal(preview.geometry.attributes.position.getX(4),8);
    }
    art.preview({house:homes()[0],valid:true,connected:false},{visible:true});assert.equal(path.visible,false);assert.equal(art.mapRoot.getObjectByName('settlement-path-preview').visible,false);
  }finally{art.dispose();}
});


test('the far map retains only isolated home symbols rather than logos for city members',()=>{
  const {art}=setup();
  try{
    art.sync(homes().map((home,index)=>({...home,cityId:index<3?'city:one':null})));
    const markers=art.mapRoot.children.filter(mesh=>mesh.isInstancedMesh&&!mesh.userData.buildingType);
    assert.equal(markers.length,1);assert.equal(markers[0].count,1);
  }finally{art.dispose();}
});
