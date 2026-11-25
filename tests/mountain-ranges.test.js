import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { Brush,Evaluator,SUBTRACTION } from 'three-bvh-csg';
import {compileMountainRange,rangeMeshData,rangeSurfaceHeight,rangeFootprintDistance,rangeSnowHeight} from '../src/mountain-ranges.js';
import {tunnelCutter} from '../src/geography.js';

function range(overrides={}){
  return compileMountainRange({id:'alpine-test',polygon:[[-60,-15],[-18,-23],[23,-18],[60,-12],[54,17],[3,23],[-56,14]],
    ridges:[{points:[[-52,0,14],[-15,-3,19],[16,3,24],[52,0,15]],width:18},
      {points:[[-12,-2,16],[-3,15,11]],width:9}],cellSize:4,snowLine:13,...overrides});
}
function geometry(data){
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.Float32BufferAttribute(data.vertices.flatMap(p=>[p.x,p.y,p.z]),3));
  geo.setIndex(data.triangles.flat());geo.computeVertexNormals();return geo;
}
function manifold(data){
  const edges=new Map();let volume=0;
  for(const ids of data.triangles){
    const [a,b,c]=ids.map(i=>new THREE.Vector3(data.vertices[i].x,data.vertices[i].y,data.vertices[i].z));
    assert.ok(b.clone().sub(a).cross(c.clone().sub(a)).length()>1e-9,'no degenerate facets');
    volume+=a.dot(b.clone().cross(c))/6;
    for(let i=0;i<3;i++){
      const a=ids[i],b=ids[(i+1)%3],key=a<b?`${a}:${b}`:`${b}:${a}`;
      if(!edges.has(key))edges.set(key,[]);edges.get(key).push(a<b?1:-1);
    }
  }
  for(const list of edges.values()){assert.equal(list.length,2,'closed two-manifold');assert.equal(list[0]+list[1],0,'consistent outward winding');}
  assert.ok(volume>0,'enclosed volume is outward-wound');
}
function sampleTriangle(data,ids,weights=[.23,.31,.46]){
  return ids.reduce((p,index,i)=>{const q=data.vertices[index];p.x+=q.x*weights[i];p.y+=q.y*weights[i];p.z+=q.z*weights[i];return p;},{x:0,y:0,z:0});
}

test('authored ranges remain deterministic, bounded, closed volumes with continuous ridgelines',()=>{
  const mountain=range(),data=rangeMeshData(mountain);
  assert.deepEqual(rangeMeshData(JSON.parse(JSON.stringify(mountain))),data,'cloned metadata gives identical facets');
  assert.notDeepEqual(rangeMeshData(range({seed:'another range'})).vertices,data.vertices,'seeds vary facets without changing the authored footprint');
  assert.ok(data.surfaceTriangles.length>300&&data.surfaceTriangles.length<1600);
  manifold(data);
  for(const p of data.vertices){
    assert.ok(rangeFootprintDistance(mountain,p.x,p.z)<1e-6,'all facets stay inside the authored polygon');
    assert.ok(Math.hypot(p.x-mountain.x,p.z-mountain.z)<=mountain.radius+1e-6);
    assert.ok(p.y>=mountain.range.base&&p.y<=mountain.height);
  }
  for(let x=-43;x<=43;x+=2){
    const height=rangeSurfaceHeight(mountain,x,0);
    assert.ok(height>7,'the mountain spine is continuous, with no gaps between isolated peaks');
  }
  const crest=Array.from({length:41},(_,i)=>rangeSurfaceHeight(mountain,-40+i*2,0));
  assert.ok(crest.filter((h,i)=>i>0&&i<crest.length-1&&h>crest[i-1]&&h>crest[i+1]).length>=3,'multiple summits and passes follow the same continuous ridge');
  assert.equal(rangeSurfaceHeight(mountain,0,50),0);assert.ok(rangeFootprintDistance(mountain,0,0)<0);
  assert.equal(rangeFootprintDistance(mountain,...mountain.range.polygon[0]),0);
  assert.ok(rangeFootprintDistance(mountain,0,50)>0);
});

test('the shared sampler exactly interpolates every rendered range facet',()=>{
  const mountain=range(),data=rangeMeshData(mountain),geo=geometry(data),material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(geo,material);mesh.updateMatrixWorld(true);
  for(let i=0;i<data.surfaceTriangles.length;i++){
    const p=sampleTriangle(data,data.surfaceTriangles[i]);
    assert.ok(Math.abs(rangeSurfaceHeight(mountain,p.x,p.z)-p.y)<1e-6);
    if(i%7===0){
      const hits=new THREE.Raycaster(new THREE.Vector3(p.x,40,p.z),new THREE.Vector3(0,-1,0),0,41).intersectObject(mesh);
      assert.ok(hits.length);assert.ok(Math.abs(hits[0].point.y-p.y)<2e-5,'GPU geometry and planner height agree');
    }
  }
  geo.dispose();material.dispose();
});

test('adjacent regional slices preserve exact facet heights, seam vertices, snowline and watertight volumes',()=>{
  const mountain=range(),split=3.75;
  const west=rangeMeshData(mountain,{minX:-70,maxX:split,minZ:-30,maxZ:30});
  const east=rangeMeshData(mountain,{minX:split,maxX:70,minZ:-30,maxZ:30});
  manifold(west);manifold(east);
  function seam(data){return data.vertices.filter(p=>Math.abs(p.x-split)<1e-8&&p.y>=0)
    .map(p=>[p.z,p.y]).sort((a,b)=>a[0]-b[0]);}
  const a=seam(west),b=seam(east);assert.equal(a.length,b.length);assert.ok(a.length>12);
  for(let i=0;i<a.length;i++){assert.ok(Math.abs(a[i][0]-b[i][0])<1e-8);assert.ok(Math.abs(a[i][1]-b[i][1])<1e-8);}
  for(const data of [west,east])for(const ids of data.surfaceTriangles){
    const p=sampleTriangle(data,ids);
    assert.ok(Math.abs(rangeSurfaceHeight(mountain,p.x,p.z)-p.y)<2e-6,'slicing never resamples or changes the underlying surface');
  }
  for(const [z]of a)assert.equal(rangeSnowHeight(mountain,split,z),rangeSnowHeight(JSON.parse(JSON.stringify(mountain)),split,z));
  const empty=rangeMeshData(mountain,{minX:200,maxX:210,minZ:200,maxZ:210});
  assert.equal(empty.vertices.length,0);assert.equal(empty.triangles.length,0);
});

test('continuous range volumes accept the existing swept tunnel cutter, including across a region seam',()=>{
  const mountain=range(),material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
  const line={points:Array.from({length:141},(_,i)=>({x:-70+i,y:.42,z:0})),distances:Array.from({length:141},(_,i)=>i),length:140};
  const cutter=new Brush(tunnelCutter(line,0,140),material);cutter.updateMatrixWorld(true);
  const evaluator=new Evaluator();evaluator.attributes=['position','normal'];evaluator.useGroups=false;
  const meshes=[];
  for(const bounds of [{minX:-70,maxX:0,minZ:-30,maxZ:30},{minX:0,maxX:70,minZ:-30,maxZ:30}]){
    const source=new Brush(geometry(rangeMeshData(mountain,bounds)),material);source.updateMatrixWorld(true);
    const cut=evaluator.evaluate(source,cutter,SUBTRACTION);cut.updateMatrixWorld(true);meshes.push(cut);
    source.geometry.dispose();
  }
  for(const z of [-.72,0,.72]){
    const hits=new THREE.Raycaster(new THREE.Vector3(-70,1.42,z),new THREE.Vector3(1,0,0),0,140).intersectObjects(meshes);
    assert.equal(hits.length,0,'the train corridor stays clear through the range and through the shared chunk wall');
  }
  const rock=new THREE.Raycaster(new THREE.Vector3(3,40,4),new THREE.Vector3(0,-1,0),0,45).intersectObjects(meshes);
  assert.ok(rock.length&&rock[0].point.y>7,'adjacent ridgeline remains intact');
  cutter.geometry.dispose();meshes.forEach(mesh=>mesh.geometry.dispose());material.dispose();
});

test('concave range outlines remain closed and malformed authored ranges fail clearly',()=>{
  const mountain=range({polygon:[[-30,-25],[30,-25],[30,25],[6,25],[6,2],[-6,2],[-6,25],[-30,25]],
    ridges:[{points:[[-20,0,12],[0,-12,18],[20,0,12]],width:15}]});
  manifold(rangeMeshData(mountain));assert.equal(rangeSurfaceHeight(mountain,0,15),0);
  for(const spec of [{polygon:[]},{cellSize:0},{cellSize:.00001},{ridges:[]},
    {ridges:[{points:[[0,0,10],[0,0,10]],width:2}]},{snowLine:-1}])assert.throws(()=>range(spec),/Mountain range:/);
});


test('interior lakes and valley basins remain open through both the surface and its closed volume',()=>{
  const mountain=range({holes:[[[-7,-5],[7,-5],[7,5],[-7,5]]]});
  const data=rangeMeshData(mountain);manifold(data);
  assert.equal(rangeSurfaceHeight(mountain,0,0),0);assert.ok(rangeFootprintDistance(mountain,0,0)>0);
  for(const ids of data.surfaceTriangles){const p=sampleTriangle(data,ids);assert.ok(!(Math.abs(p.x)<7-1e-7&&Math.abs(p.z)<5-1e-7));}
});
