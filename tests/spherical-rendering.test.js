import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import geography from '../data/europe-geography.json' with {type:'json'};
import {generateWorld} from '../src/world-model.js';
import {makeTrains} from '../src/railway.js';
import {createWorldRenderer} from '../src/world-renderer.js';
import {createSurfaceShell} from '../src/surface-shell.js';
import {surfacePoint,surfaceNormal,surfaceFrame,warpGeometryToSurface,EARTH_SURFACE_RADIUS} from '../src/world-surface.js';

const surface={type:'sphere',radius:EARTH_SURFACE_RADIUS,projection:geography.projection,
  origin:{longitude:10,latitude:52}};
const world={...generateWorld({density:0}),surface,outline:[[-1000,-800],[1000,-800],[1000,800],[-1000,800]],
  cities:[],stations:[],mountains:[]};
function cameraAt(x,z,span=18){
  const camera=new THREE.OrthographicCamera(-span,span,span,-span,.1,4000);
  const target=surfacePoint(world,x,0,z),up=surfaceNormal(world,x,z);
  camera.position.copy(target).addScaledVector(up,500);
  camera.up.set(0,0,-1).applyMatrix4(surfaceFrame(world,x,z));
  camera.lookAt(target);camera.updateMatrixWorld();return camera;
}

test('curved section shell stays below the surface and releases shared geometry once',()=>{
  assert.equal(createSurfaceShell({...world,surface:null}),null);
  const shell=createSurfaceShell(world),resources=new Set(),center=new THREE.Vector3(0,-surface.radius,0),vertex=new THREE.Vector3();
  for(const root of [shell.detail,shell.map])root.traverse(mesh=>{
    if(!mesh.isMesh)return;resources.add(mesh.geometry);resources.add(mesh.material);
    const position=mesh.geometry.attributes.position;
    for(let i=0;i<position.count;i++){
      vertex.fromBufferAttribute(position,i);
      const elevation=vertex.distanceTo(center)-surface.radius;
      assert.ok(elevation<=.0002&&elevation>=-32.0002,'the underside cannot intrude through ground or water');
    }
  });
  const disposals=new Map([...resources].map(resource=>[resource,0]));
  for(const resource of resources)resource.addEventListener('dispose',()=>disposals.set(resource,disposals.get(resource)+1));
  shell.dispose();shell.dispose();assert.ok([...disposals.values()].every(count=>count===1));
});

test('detailed train instances sit on the sphere and wheels share the transformed railway frame',()=>{
  const x=612,z=355,angle=.72,poseBuffer=new Float32Array([x,.42,z,angle,1,0]);
  const traffic={trains:[{id:'curved-train',ownerId:'coral',count:1,spacing:2.64,active:true,poseOffset:0}],poseBuffer,update(){}};
  const parent=new THREE.Group(),rail=makeTrains(parent,world,{traffic}),camera=cameraAt(x,z);
  rail.updateView(camera);
  assert.equal(rail.stats.visibleCars,1,'culling uses the curved position, far from its chart coordinates');
  const mesh=rail.root.children[0],matrix=new THREE.Matrix4();mesh.getMatrixAt(0,matrix);
  assert.ok(new THREE.Vector3().setFromMatrixPosition(matrix).distanceTo(surfacePoint(world,x,.42,z))<.0001);
  const actualUp=new THREE.Vector3().setFromMatrixColumn(matrix,1).normalize();
  assert.ok(actualUp.dot(surfaceNormal(world,x,z))>.999999);
  // First carriage cab faces the opposite direction. Compare four wheel-contact
  // positions with exact curved chart points, not with the pose helper itself.
  const heading=angle+Math.PI;
  for(const side of [-.46,.46])for(const along of [-.72,.72]){
    const local=new THREE.Vector3(side,0,along).applyMatrix4(matrix);
    const dx=Math.cos(heading)*side+Math.sin(heading)*along,dz=-Math.sin(heading)*side+Math.cos(heading)*along;
    assert.ok(local.distanceTo(surfacePoint(world,x+dx,.42,z+dz))<.001,'wheel and rail differ by less than a millimeter in miniature units');
  }
  assert.equal(rail.trains[0].parts[0].position.x,poseBuffer[0],'simulation pose stays in the generation chart');
  rail.dispose();
});

test('spherical detail requests cover the geographic target and hydrate actual curved bounds',async()=>{
  const requests=[],parent=new THREE.Group(),x=612,z=355,size=48;
  const renderer=createWorldRenderer(parent,world,{size,maxPending:2,maxChunks:40,
    requestChunk:request=>{
      requests.push(request);
      const minX=Math.floor(request.x/size)*size,minZ=Math.floor(request.z/size)*size;
      const geometry=new THREE.PlaneGeometry(40,40,10,10);geometry.rotateX(-Math.PI/2);geometry.translate(minX+24,0,minZ+24);
      warpGeometryToSurface(geometry,world);
      const bounds=geometry.boundingBox;
      return {bounds:{minX,minZ,maxX:minX+size,maxZ:minZ+size},
        renderBounds:{min:bounds.min.toArray(),max:bounds.max.toArray()},meshes:[{
          position:geometry.attributes.position.array,normal:geometry.attributes.normal.array,index:geometry.index.array,
          material:{name:'curved-test',color:[1,1,1],roughness:1,metalness:0,side:0,vertexColors:false}}]};
    }});
  const camera=cameraAt(x,z),options={target:new THREE.Vector3(x,0,z),coverageCamera:camera,budgetMs:5};
  for(let i=0;i<40&&!renderer.ready;i++){renderer.update(camera,options);await new Promise(resolve=>setImmediate(resolve));}
  renderer.update(camera,options);
  assert.equal(renderer.ready,true);
  assert.ok(requests.some(request=>Math.floor(request.x/size)===Math.floor(x/size)&&Math.floor(request.z/size)===Math.floor(z/size)));
  assert.ok(renderer.stats.requiredChunks<=9,'local views retain bounded coverage on the globe');
  const target=surfacePoint(world,x,0,z);
  let visible=0;
  renderer.root.traverseVisible(mesh=>{
    if(!mesh.isMesh)return;visible++;
    assert.ok(mesh.geometry.boundingSphere.center.y< -20,'GPU culling bounds are in curved coordinates');
  });
  assert.ok(visible>0);
  assert.ok(new THREE.Raycaster(camera.position,new THREE.Vector3().subVectors(target,camera.position).normalize())
    .intersectObject(renderer.root,true).length>0,'the transformed surface is pickable with the actual camera');
  renderer.dispose();
});
