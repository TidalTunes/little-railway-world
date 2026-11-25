import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {colorTerrainGeometry} from '../src/terrain-colors.js';

const source={bounds:{width:100,depth:100},biomes:{sites:[
  {type:'desert',x:-10,z:-15},{type:'forest',x:10,z:15},
]}};

function terrain(points,bounds,holes=[]){
  const shape=new THREE.Shape(points.map(([x,z])=>new THREE.Vector2(x,-z)));
  for(const hole of holes)shape.holes.push(new THREE.Path(hole.map(([x,z])=>new THREE.Vector2(x,-z))));
  const input=new THREE.ShapeGeometry(shape);input.rotateX(-Math.PI/2);
  const geometry=colorTerrainGeometry(input,{terrainSource:source,terrainChunk:true,bounds});input.dispose();
  const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));mesh.updateMatrixWorld();return mesh;
}
function renderedColor(mesh,x,z){
  const hit=new THREE.Raycaster(new THREE.Vector3(x,1,z),new THREE.Vector3(0,-1,0)).intersectObject(mesh)[0];
  assert.ok(hit,`surface at ${x}, ${z}`);
  const p=mesh.geometry.attributes.position,c=mesh.geometry.attributes.color,f=hit.face;
  const barycentric=THREE.Triangle.getBarycoord(hit.point,new THREE.Vector3().fromBufferAttribute(p,f.a),
    new THREE.Vector3().fromBufferAttribute(p,f.b),new THREE.Vector3().fromBufferAttribute(p,f.c),new THREE.Vector3());
  return [0,1,2].map(k=>c.array[f.a*3+k]*barycentric.x+c.array[f.b*3+k]*barycentric.y+c.array[f.c*3+k]*barycentric.z);
}
function area(mesh){
  const p=mesh.geometry.attributes.position;let sum=0;
  for(let i=0;i<p.count;i+=3)sum+=Math.abs((p.getX(i+1)-p.getX(i))*(p.getZ(i+2)-p.getZ(i))
    -(p.getZ(i+1)-p.getZ(i))*(p.getX(i+2)-p.getX(i)))/2;
  return sum;
}
function dispose(mesh){mesh.geometry.dispose();mesh.material.dispose();}

test('adjacent detail chunks render identical seam colors despite different collinear shore vertices',()=>{
  // A coast tangency can leave a boundary vertex on just one local polygon.
  // Before canonical edge sampling this fixture had a 0.117 RGB color step.
  const west=terrain([[-20,-40],[0,-40],[0,3],[0,40],[-20,40]],{minX:-20,maxX:0,minZ:-40,maxZ:40});
  const east=terrain([[0,-40],[20,-40],[20,40],[0,40]],{minX:0,maxX:20,minZ:-40,maxZ:40});
  let maximum=0;
  for(let z=-39.9;z<39.9;z+=.1){
    const a=renderedColor(west,-1e-7,z),b=renderedColor(east,1e-7,z);
    maximum=Math.max(maximum,...a.map((value,i)=>Math.abs(value-b[i])));
  }
  assert.ok(maximum<1e-5,`rendered seam color error ${maximum}`);
  assert.ok(Math.abs(area(west)-1600)<.001&&Math.abs(area(east)-1600)<.001,'no area changes or missing strips');
  dispose(west);dispose(east);
});

test('canonical edge subdivision preserves irregular shores, holes and horizontal seams',()=>{
  const south=terrain([[-40,-20],[40,-20],[40,0],[7.3,0],[-40,0]],{minX:-40,maxX:40,minZ:-20,maxZ:0},
    [[[-12,-14],[-6,-14],[-6,-8],[-12,-8]]]);
  const north=terrain([[-40,0],[40,0],[40,20],[-40,20]],{minX:-40,maxX:40,minZ:0,maxZ:20});
  for(let x=-39.9;x<39.9;x+=.25){
    const a=renderedColor(south,x,-1e-7),b=renderedColor(north,x,1e-7);
    assert.ok(Math.max(...a.map((value,i)=>Math.abs(value-b[i])))<1e-5);
  }
  assert.ok(Math.abs(area(south)-(1600-36))<.001,'lake hole area is preserved');
  const ray=new THREE.Raycaster(new THREE.Vector3(-9,1,-11),new THREE.Vector3(0,-1,0));
  assert.equal(ray.intersectObject(south).length,0,'the lake stays open');
  dispose(south);dispose(north);
});

test('edge refinement adds perimeter work without producing thin fans across a whole detail cell',()=>{
  const input=new THREE.PlaneGeometry(192,192);input.rotateX(-Math.PI/2);
  const ordinary=colorTerrainGeometry(input,source);
  const regional=colorTerrainGeometry(input,{terrainSource:source,terrainChunk:true,
    bounds:{minX:-96,maxX:96,minZ:-96,maxZ:96}});
  const extra=(regional.attributes.position.count-ordinary.attributes.position.count)/3;
  assert.ok(extra>0&&extra<=384,'one 192-unit cell needs at most its 384 canonical perimeter samples');
  input.dispose();ordinary.dispose();regional.dispose();
});
