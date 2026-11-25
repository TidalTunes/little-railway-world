import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {compileMountainRange} from '../src/mountain-ranges.js';
import {mountainSurfaceHeight,mountainFootprintDistance} from '../src/mountain-shape.js';
import {mountainSurfaceColor,mountainTrees} from '../src/mountain-cover.js';
import {terrainColor} from '../src/terrain-colors.js';
import {buildMountains,createMountainGeometry} from '../src/geography.js';
import {C,M} from '../src/palette.js';

function fixture(){
  const mountain=compileMountainRange({id:'forest-test',polygon:[[-70,-40],[70,-40],[70,40],[-70,40]],
    ridges:[{points:[[-60,0,18],[0,0,27],[60,0,18]],width:27}],cellSize:5,snowLine:18});
  return{mountain,world:{mountains:[mountain],lines:[],river:{points:[],width:1},density:1}};
}
const colorsClose=(a,b)=>Math.max(Math.abs(a.r-b.r),Math.abs(a.g-b.g),Math.abs(a.b-b.b))<1e-6;
function dispose(root){root.traverse(node=>node.geometry?.dispose());}

test('mountain toes match adjacent ground while high cliffs and excavated walls retain exposed stone',()=>{
  const {mountain,world}=fixture();
  world.biomes={sites:[{type:'desert',x:-80,z:0},{type:'forest',x:80,z:0}]};
  for(const [x,z]of [[-70,10],[70,-20],[20,40]]){
    const actual=mountainSurfaceColor(world,mountain,{x,y:0,z},{x:.5,y:.8,z:0});
    assert.ok(colorsClose(actual,terrainColor(world,x,z)),'the mountain edge has no gray or green outline');
  }
  const meadow=mountainSurfaceColor(world,mountain,{x:20,y:2,z:20},{x:0,y:1,z:0});
  assert.ok(meadow.g>meadow.r,'gentle lower ground remains vegetated');
  const cliff=mountainSurfaceColor(world,mountain,{x:20,y:22,z:20},{x:.97,y:.24,z:0});
  assert.ok(colorsClose(cliff,C.rockDark),'steep high slopes are entirely exposed rock');
  const wall=mountainSurfaceColor(world,mountain,{x:0,y:2,z:0},{x:1,y:0,z:0},{surface:false});
  assert.ok(colorsClose(wall,C.rockLight),'cut walls are not painted with vegetation');
  const roof=mountainSurfaceColor(world,mountain,{x:0,y:3,z:0},{x:0,y:-1,z:0},{surface:false});
  assert.ok(colorsClose(roof,C.rockDark),'downward tunnel ceilings retain shaded stone');
});

test('neighboring mountain slices agree on their vegetation colors at the shared surface seam',()=>{
  const {mountain,world}=fixture(),scenes=[];
  function edge(bounds){
    const scene=new THREE.Group();scenes.push(scene);
    buildMountains(scene,{...world,density:0,mountains:[{...mountain,renderBounds:bounds}]});
    const geo=scene.getObjectByName(`mountain-${mountain.id}-surface`).geometry;
    const p=geo.attributes.position,n=geo.attributes.normal,c=geo.attributes.color,result=new Map();
    for(let i=0;i<p.count;i++)if(Math.abs(p.getX(i))<1e-7&&n.getY(i)>.18){
      const key=`${p.getY(i).toFixed(5)}:${p.getZ(i).toFixed(5)}:${n.getY(i).toFixed(4)}`;
      result.set(key,new THREE.Color(c.getX(i),c.getY(i),c.getZ(i)));
    }return result;
  }
  const west=edge({minX:-70,maxX:0,minZ:-40,maxZ:40}),east=edge({minX:0,maxX:70,minZ:-40,maxZ:40});
  assert.ok(west.size>10);
  for(const [key,color]of west){assert.ok(east.has(key),key);assert.ok(colorsClose(color,east.get(key)),key);}
  scenes.forEach(dispose);
});

test('mountain forests are deterministic, bounded, nonoverlapping and identically owned across regional seams',()=>{
  const {mountain,world}=fixture(),whole=mountainTrees(world,mountain);
  assert.ok(whole.length>20&&whole.length<200,'the broad foothills carry a restrained forest');
  assert.deepEqual(mountainTrees(structuredClone(world),structuredClone(mountain)),whole);
  const west=mountainTrees(world,{...mountain,renderBounds:{minX:-70,maxX:0,minZ:-40,maxZ:40}});
  const east=mountainTrees(world,{...mountain,renderBounds:{minX:0,maxX:70,minZ:-40,maxZ:40}});
  const sorted=list=>list.sort((a,b)=>a.id.localeCompare(b.id));
  assert.deepEqual(sorted([...west,...east]),sorted([...whole]),'seams create neither forest gaps nor duplicates');
  for(let i=0;i<whole.length;i++){
    const a=whole[i];assert.equal(a.y,mountainSurfaceHeight(mountain,a.x,a.z));
    assert.ok(mountainFootprintDistance(mountain,a.x,a.z)<-a.radius);
    for(let j=i+1;j<whole.length;j++){
      const b=whole[j];assert.ok(Math.hypot(a.x-b.x,a.z-b.z)>a.radius+b.radius,'complete crowns do not overlap');
    }
  }
  assert.deepEqual(mountainTrees({...world,density:0},mountain),[]);
});

test('tree crowns clear the rail cutting, river banks, stations and scene assets',()=>{
  const {mountain,world}=fixture(),anchor=mountainTrees(world,mountain)[25];
  const line={id:'forest-rail',points:[{x:anchor.x,y:.42,z:-50},{x:anchor.x,y:.42,z:50}]};
  const withRail=mountainTrees({...world,lines:[line]},mountain);
  assert.ok(withRail.length>0);
  for(const p of withRail)assert.ok(Math.abs(p.x-anchor.x)>=p.radius+3,'crowns leave room for wide cut lips and portals');
  const withRiver=mountainTrees({...world,river:{width:3,points:[{x:-80,z:anchor.z},{x:80,z:anchor.z}]}},mountain);
  for(const p of withRiver)assert.ok(Math.abs(p.z-anchor.z)>=p.radius+2.35);
  for(const field of ['placements','stations','cities']){
    const trees=mountainTrees({...world,[field]:[{x:anchor.x,z:anchor.z,radius:4}]},mountain);
    assert.ok(trees.length<mountainTrees(world,mountain).length);
    for(const p of trees)assert.ok(Math.hypot(p.x-anchor.x,p.z-anchor.z)>=p.radius+4.3);
  }
});

test('vegetation rests on exact facets and coloring never changes the rendered mountain surface',()=>{
  const {mountain,world}=fixture(),scene=new THREE.Group(),original=createMountainGeometry(mountain,[]);
  buildMountains(scene,world);scene.updateMatrixWorld(true);
  const surface=scene.getObjectByName(`mountain-${mountain.id}-surface`);
  assert.equal(surface.material,M.terrainVertex);assert.equal(surface.material.vertexColors,true);
  const expanded=original.toNonIndexed();
  assert.deepEqual(surface.geometry.attributes.position.array,expanded.attributes.position.array,
    'surface color adds no displacement, extra ground plane, or clipping changes');
  assert.equal(surface.geometry.attributes.color.count,surface.geometry.attributes.position.count);
  assert.ok(surface.geometry.attributes.color.array.every(Number.isFinite));
  let trees=0,crownVertices=0;
  scene.traverse(node=>{
    const p=node.userData.treePlacement;if(p){trees++;assert.equal(node.position.y,mountainSurfaceHeight(mountain,p.x,p.z));}
    if(!node.isMesh||![M.pine,M.pineLight,M.pineDark].includes(node.material))return;
    const pos=node.geometry.attributes.position;
    for(let i=0;i<pos.count;i++){
      const p=new THREE.Vector3().fromBufferAttribute(pos,i).applyMatrix4(node.matrixWorld);
      assert.ok(p.y>mountainSurfaceHeight(mountain,p.x,p.z)+.1,'foliage does not intersect the hillside');crownVertices++;
    }
  });
  assert.ok(trees>20&&crownVertices>100);
  original.dispose();expanded.dispose();dispose(scene);
});
