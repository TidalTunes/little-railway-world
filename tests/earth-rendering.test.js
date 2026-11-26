import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createSurfaceShell} from '../src/surface-shell.js';
import {createWorldRenderer} from '../src/world-renderer.js';
import {surfacePoint,surfaceNormal,surfaceFrame} from '../src/world-surface.js';
import {compileMapTerrainGeometry} from '../src/map-terrain-geometry.js';
import {terrainColor} from '../src/terrain-colors.js';

const radius=1600,half=Math.PI*radius;
const world={surface:{type:'sphere',complete:true,radius,origin:{longitude:0,latitude:0},
  projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},
  outline:[[-half,-half/2],[half,-half/2],[half,half/2],[-half,half/2]],
  bounds:{width:half*2,depth:half},mountains:[],stations:[],cities:[]};

test('complete Earth ocean closes every hemisphere below the land, with bounded geometry',()=>{
  const shell=createSurfaceShell(world),center=new THREE.Vector3(0,-radius,0),vertex=new THREE.Vector3();
  const resources=new Set();
  for(const group of [shell.map,shell.detail]){
    assert.equal(group.children.length,1,'no cut edge or bottom cap on a full planet');
    const mesh=group.children[0],positions=mesh.geometry.attributes.position;
    resources.add(mesh.geometry);resources.add(mesh.material);
    assert.ok(mesh.geometry.index.count/3<70000,'ocean is an efficient closed sphere');
    for(let i=0;i<positions.count;i++){
      vertex.fromBufferAttribute(positions,i);
      const elevation=vertex.distanceTo(center)-radius;
      assert.ok(elevation<-.6&&elevation>-4.6);
    }
    mesh.updateMatrixWorld();
    for(const direction of [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){
      const normal=new THREE.Vector3(...direction),origin=center.clone().addScaledVector(normal,radius*2);
      assert.ok(new THREE.Raycaster(origin,normal.negate()).intersectObject(mesh).length,'each hemisphere is sealed');
    }
  }
  let disposals=0;for(const resource of resources)resource.addEventListener('dispose',()=>disposals++);
  shell.dispose();shell.dispose();assert.equal(disposals,resources.size);
});

test('full globe map compiles geographic land and leaves ocean to the closed sphere',()=>{
  const rectangle=[[[[-20,-20],[20,-20],[20,20],[-20,20],[-20,-20]]]];
  const meshes=compileMapTerrainGeometry({land:rectangle,shores:[],river:[],ocean:[[world.outline]],mountains:[],
    colorField:{sites:[]}},world);
  assert.deepEqual(meshes.map(mesh=>mesh.color),['terrain']);
  const center=new THREE.Vector3(0,-radius,0),point=new THREE.Vector3();
  for(let i=0;i<meshes[0].position.length;i+=3){
    point.fromArray(meshes[0].position,i);assert.ok(Math.abs(point.distanceTo(center)-radius)<.001);
  }
});

test('terrain color is continuous at the date line and polar sites carry ice',()=>{
  const globe={...world,biomes:{sites:[{x:half-25,z:0,type:'forest'},{x:-half+10,z:0,type:'desert'},
    {x:0,z:half/2-50,type:'plains',ice:true}]}};
  for(const z of [-100,0,100]){
    const a=terrainColor(globe,-half,z).toArray(),b=terrainColor(globe,half,z).toArray();
    assert.ok(a.every((value,i)=>Math.abs(value-b[i])<1e-12));
  }
  const ice=terrainColor(globe,0,half/2-50),grass=terrainColor({...world,biomes:{sites:[{x:0,z:0,type:'plains'}]}},0,0);
  assert.ok(ice.r>grass.r&&ice.b>grass.b,'ice sites render pale snow rather than green grass');
});

test('close detail crosses the date line without requesting the rest of the globe',async()=>{
  const x=half-4,z=-400,target=surfacePoint(world,x,0,z),normal=surfaceNormal(world,x,z);
  const camera=new THREE.OrthographicCamera(-40,40,40,-40,.1,5000);
  camera.position.copy(target).addScaledVector(normal,500);
  camera.up.set(0,0,-1).applyMatrix4(surfaceFrame(world,x,z));camera.lookAt(target);camera.updateMatrixWorld();
  const requests=[],parent=new THREE.Group();
  const renderer=createWorldRenderer(parent,world,{size:96,maxPending:4,maxChunks:40,requestChunk:request=>{
    requests.push(request);
    return {bounds:{minX:request.x-48,maxX:request.x+48,minZ:request.z-48,maxZ:request.z+48},meshes:[]};
  }});
  for(let i=0;i<20&&!renderer.ready;i++){
    renderer.update(camera,{target:new THREE.Vector3(x,0,z),budgetMs:10});
    await new Promise(resolve=>setImmediate(resolve));
  }
  assert.equal(renderer.ready,true);assert.equal(renderer.stats.coverageLimited,false);
  assert.ok(renderer.stats.requiredChunks<=9);
  assert.ok(requests.some(request=>request.x>half-100));
  assert.ok(requests.some(request=>request.x< -half+100));
  assert.ok(requests.every(request=>Math.abs(request.x)>half-400),'requests stay local on both sides of the seam');
  renderer.dispose();
});

function globeCamera(latitude,zoom,aspect=1.8,phi=Math.PI/4,longitude=0){
  const target=new THREE.Vector3(radius*longitude*Math.PI/180,1.3,-radius*latitude*Math.PI/180),center=surfacePoint(world,target.x,target.y,target.z),
    frame=surfaceFrame(world,target.x,target.z),height=Math.max(radius*2.2,radius*2.2/aspect);
  const camera=new THREE.OrthographicCamera(-height*aspect/2,height*aspect/2,height/2,-height/2,.1,radius*8);
  camera.position.copy(center).add(new THREE.Vector3().setFromSphericalCoords(radius*3,phi,0).applyMatrix4(frame));
  camera.up.set(0,1,0).transformDirection(frame);camera.lookAt(center);
  camera.zoom=zoom*radius*2.2/230;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
  return {camera,target};
}
const emptyCell=request=>({bounds:{minX:request.x-request.size/2,maxX:request.x+request.size/2,
  minZ:request.z-request.size/2,maxZ:request.z+request.size/2},meshes:[]});
const tick=()=>new Promise(resolve=>setImmediate(resolve));

test('fixed globe detail entry loads complete coverage at both poles without a whole-Earth request',async()=>{
  for(const aspect of [1.8,.75])for(const zoom of [.78,1])for(const latitude of [-85,0,50,85]){
    const {camera,target}=globeCamera(latitude,zoom,aspect),requests=[];
    // A tiny LRU target must not evict required polar cells or cap readiness.
    // It also suppresses prefetch so the coverage assertions use required cells.
    const renderer=createWorldRenderer(new THREE.Group(),world,{maxChunks:1,maxPending:16,requestChunk:request=>{
      requests.push(request);return emptyCell(request);
    }});
    assert.equal(renderer.ready,false);
    for(let i=0;i<40&&!renderer.ready;i++){renderer.update(camera,{target,budgetMs:10});await tick();}
    assert.equal(renderer.ready,true,`detail is available at ${latitude}°, zoom ${zoom}, aspect ${aspect}`);
    assert.equal(renderer.stats.coverageLimited,false);
    assert.ok(renderer.stats.requiredChunks<=192,'a polar footprint stays local even when it includes every longitude');
    assert.equal(new Set(requests.map(request=>`${request.x}:${request.z}`)).size,requests.length,'required cells remain cached through preparation');
    assert.equal(requests.length,renderer.stats.requiredChunks);
    if(Math.abs(latitude)>80)assert.ok(requests.every(request=>Math.sign(request.z)===-Math.sign(latitude)&&Math.abs(request.z)>radius*Math.PI/3),
      'polar coverage stays in the requested polar cap');
    const direction=camera.getWorldDirection(new THREE.Vector3()),normal=new THREE.Vector3(),point=new THREE.Vector3();
    for(let lat=-90;lat<=90;lat+=2)for(let lon=-180;lon<180;lon+=3)for(const height of [0,35]){
      const x=radius*lon*Math.PI/180,z=-radius*lat*Math.PI/180;
      surfaceNormal(world,x,z,normal);if(normal.dot(direction)>=0)continue;
      surfacePoint(world,x,height,z,point).project(camera);
      if(Math.abs(point.x)>=.999||Math.abs(point.y)>=.999||point.z< -1||point.z>1)continue;
      assert.ok(requests.some(request=>x>=request.x-request.size/2&&x<=request.x+request.size/2&&z>=request.z-request.size/2&&z<=request.z+request.size/2),
        `visible ${lon}°,${lat}° at height ${height} belongs to a required cell`);
    }
    renderer.dispose();assert.equal(renderer.ready,false);
  }
});

test('closed-globe ocean needs no detail packets, while islands and offshore objects retain theirs',async()=>{
  const {camera,target}=globeCamera(85,.78),requests=[];
  const ocean={...world,biomes:{land:[],oceanShore:[]}};
  const renderer=createWorldRenderer(new THREE.Group(),ocean,{requestChunk:request=>{requests.push(request);return emptyCell(request);}});
  renderer.update(camera,{target,mapBlend:1});assert.equal(renderer.ready,false,'an unexamined view is not ready');
  renderer.update(camera,{target,mapBlend:1,prewarm:true});await tick();
  assert.equal(renderer.ready,true);assert.equal(renderer.stats.requiredChunks,0);assert.equal(requests.length,0);
  renderer.dispose();
  const z=target.z,island=[[[[-8,z-8],[8,z-8],[8,z+8],[-8,z+8],[-8,z-8]]]],objects={...ocean,
    biomes:{land:island,oceanShore:[]},stations:[{x:400,z,radius:4}]};
  const required=[];
  const populated=createWorldRenderer(new THREE.Group(),objects,{maxChunks:1,requestChunk:request=>{required.push(request);return emptyCell(request);}});
  for(let i=0;i<20&&!populated.ready;i++){populated.update(camera,{target,budgetMs:10});await tick();}
  assert.equal(populated.ready,true);
  assert.ok(required.some(request=>Math.abs(request.x)<=request.size/2&&Math.abs(request.z-z)<=request.size/2),'a tiny island still loads');
  assert.ok(required.some(request=>Math.abs(request.x-400)<=request.size/2&&Math.abs(request.z-z)<=request.size/2),'an offshore station keeps its owner cell');
  assert.ok(required.length<8);populated.dispose();
});

test('transition coverage unions exact destination cells across the date line',async()=>{
  const first=globeCamera(50,1,1.8,Math.PI/4,176),second=globeCamera(50,1,1.8,.1,-176);
  async function load(cameras){
    const requests=[];
    const renderer=createWorldRenderer(new THREE.Group(),world,{maxChunks:1,maxPending:16,requestChunk:request=>{
      requests.push(`${request.x}:${request.z}`);return emptyCell(request);
    }});
    for(let i=0;i<30&&!renderer.ready;i++){
      renderer.update(first.camera,{coverageCameras:cameras,target:first.target,budgetMs:10});await tick();
    }
    assert.equal(renderer.ready,true);assert.equal(renderer.stats.coverageLimited,false);renderer.dispose();
    return new Set(requests);
  }
  const a=await load([first.camera]),b=await load([second.camera]),union=await load([first.camera,second.camera]);
  assert.deepEqual(union,new Set([...a,...b]));
  assert.ok(union.size<64,'unioning nearby views across the seam must remain local');
});

test('cold pan preparation retains visible detail while destination coverage catches up',async()=>{
  const plane={...world,surface:null,outline:[[-800,-800],[800,-800],[800,800],[-800,800]]};
  function cameraAt(x){
    const camera=new THREE.OrthographicCamera(-20,20,20,-20,.1,500);
    camera.position.set(x,200,80);camera.lookAt(x,0,0);camera.updateMatrixWorld();return camera;
  }
  const shown=cameraAt(10),destination=cameraAt(394),requests=[];
  const renderer=createWorldRenderer(new THREE.Group(),plane,{size:96,maxChunks:4,maxVisibleChunks:4,maxPending:4,requestChunk:request=>{
    requests.push(request);return emptyCell(request);
  }});
  for(let i=0;i<15&&!renderer.ready;i++){renderer.update(shown,{target:new THREE.Vector3(10,0,0),budgetMs:10});await tick();}
  assert.equal(renderer.ready,true);
  const visible=renderer.root.children.filter(chunk=>chunk.visible);assert.ok(visible.length);
  for(let i=0;i<15;i++){
    renderer.update(shown,{target:new THREE.Vector3(394,0,0),coverageCamera:destination,retainVisible:true,budgetMs:10});await tick();
    assert.ok(visible.every(chunk=>chunk.parent===renderer.root),'loading destination coverage cannot evict detail still visible in the current view');
    if(renderer.ready)break;
  }
  assert.equal(renderer.ready,true);
  renderer.updateVisibility(destination);
  assert.ok(visible.every(chunk=>!chunk.visible),'the current camera refreshes visibility in the same frame');
  assert.ok(renderer.root.children.some(chunk=>chunk.visible),'ready destination cells become visible immediately');
  renderer.update(destination,{target:new THREE.Vector3(394,0,0),retainVisible:true,budgetMs:10});
  assert.ok(visible.every(chunk=>chunk.parent===null),'old cells become evictable when the displayed camera advances');
  renderer.dispose();
});
