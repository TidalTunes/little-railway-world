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
