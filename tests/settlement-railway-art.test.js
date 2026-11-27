import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createSettlementRailwayArt,buildJoinedSettlementTracks} from '../src/settlement-railway-art.js';
import {M} from '../src/palette.js';
import {integerPolygonOperation} from '../src/polygon-ops.js';

const world={players:[{id:'teal',color:{l:.60,c:.13,h:185}},{id:'coral',color:{l:.63,c:.14,h:24}}],river:{y:-1.8},rivers:[],mountains:[],outline:[[-100,-100],[100,-100],[100,100],[-100,100]]};
const line={id:'track-1',from:'home',to:'other',ownerId:'teal',length:20,points:[{x:0,y:.42,z:0},{x:0,y:.42,z:20}],distances:[0,20],bridges:[],tunnels:[]};
const stations=[{id:'station-home',kind:'station',cityId:'home',ownerId:'teal',x:-2.5,y:0,z:3,rotation:Math.PI/2},{id:'station-other',kind:'station',cityId:'other',ownerId:'coral',x:-2.5,y:0,z:17,rotation:Math.PI/2}];
const cities=[{id:'home',ownerId:'teal',x:-8,z:3,radius:4},{id:'other',ownerId:'coral',x:-8,z:17,radius:4}];
const snapshot={revision:1,lines:[line],stations,cities};
function fixture(t){const parent=new THREE.Group(),mapParent=new THREE.Group(),art=createSettlementRailwayArt(parent,mapParent,world);t.after(()=>art.dispose());return{parent,mapParent,art};}

function topTriangles(mesh,y){
  const points=mesh.geometry.attributes.position,triangles=[];
  for(let i=0;i<points.count;i+=3){
    if([0,1,2].some(offset=>Math.abs(points.getY(i+offset)-y)>1e-6))continue;
    const triangle=[0,1,2].map(offset=>[points.getX(i+offset),points.getZ(i+offset)]);triangles.push([...triangle,triangle[0]]);
  }
  return triangles;
}
const ringArea=ring=>Math.abs(ring.reduce((sum,point,i)=>{const next=ring[(i+1)%ring.length];return sum+point[0]*next[1]-next[0]*point[1];},0))/2;

test('fork ballast and rails have one unioned top surface without overlapping triangles',t=>{
  const forkPoints=[{x:0,y:.42,z:0},{x:0,y:.42,z:8},...Array.from({length:8},(_,i)=>{const angle=(i+1)/8*Math.PI/4;return{x:8-8*Math.cos(angle),y:.42,z:8+8*Math.sin(angle)};})];
  const distances=[0];for(let i=1;i<forkPoints.length;i++)distances.push(distances.at(-1)+Math.hypot(forkPoints[i].x-forkPoints[i-1].x,forkPoints[i].z-forkPoints[i-1].z));
  const fork={...line,id:'fork',points:forkPoints,distances,length:distances.at(-1)},group=new THREE.Group();
  t.after(()=>group.traverse(mesh=>mesh.geometry?.dispose()));
  const joined=buildJoinedSettlementTracks(group,world,[line,fork]);assert.ok(joined);
  for(const [kind,y]of [['ballast',.23],['rails',.42]]){
    const triangles=topTriangles(joined[kind],y);assert.ok(triangles.length>0);assert.ok(joined[kind].geometry.attributes.position.array.every(Number.isFinite));
    for(let i=0;i<triangles.length;i++)for(let j=i+1;j<triangles.length;j++){
      const overlap=integerPolygonOperation('intersection',[[triangles[i]]],[[triangles[j]]]);
      assert.ok(overlap.reduce((sum,polygon)=>sum+ringArea(polygon[0]),0)<1e-6,`${kind} top triangles may share edges, never area`);
    }
    const area=triangles.reduce((sum,triangle)=>sum+ringArea(triangle),0),separate=new THREE.Group();group.add(separate);
    const separateArea=[line,fork].reduce((sum,item)=>sum+topTriangles(buildJoinedSettlementTracks(separate,world,[item])[kind],y).reduce((n,triangle)=>n+ringArea(triangle),0),0);
    assert.ok(separateArea-area>(kind==='ballast'?10:.7),'the shared throat is removed from the duplicated surface area');
  }
});

test('joined planar tracks leave sloped routes untouched for the existing swept renderer',()=>{
  const parent=new THREE.Group(),sloped={...line,points:[{x:0,y:.42,z:0},{x:0,y:1.42,z:20}]};
  assert.equal(buildJoinedSettlementTracks(parent,world,[sloped]),null);assert.equal(parent.children.length,0);
});

test('committed railways batch all track and station art and retain exact rail elevation',t=>{
  const {art}=fixture(t);assert.equal(art.sync(snapshot),true);assert.ok(art.meshes.length>0&&art.meshes.length<6);
  const bounds=new THREE.Box3().setFromObject(art.root);assert.ok(bounds.min.z<=0&&bounds.max.z>=20);assert.ok(bounds.min.y<.001&&bounds.min.y>-.001);assert.ok(bounds.max.y>2);
  const mapStrokes=art.mapRoot.getObjectByName('built-map-railway-network').children;
  assert.equal(mapStrokes.length,2,'all station and line strokes share one paper/ink draw-call pair');
  assert.equal(art.stats.lines,1);assert.equal(art.stats.stations,2);
  for(const mesh of mapStrokes){assert.ok(mesh.geometry.attributes.railwayOffset);assert.ok(mesh.geometry.attributes.position.array.every(Number.isFinite));}
  const network=art.root.getObjectByName('built-railway-network'),identity=network.children[0].geometry;
  assert.equal(art.sync(snapshot),false);assert.equal(network.children[0].geometry,identity,'stable revisions never allocate replacement geometry');
});

test('shared station spines and endpoint stations render once even if a caller repeats ids',t=>{
  const {art}=fixture(t);art.sync({...snapshot,lines:[line,line],stations:[...stations,stations[0]]});
  assert.equal(art.mapRoot.getObjectByName('built-map-railway-network').children.length,2);assert.equal(art.stats.stations,2);assert.equal(art.stats.lines,1);
  const before=art.meshes.reduce((n,mesh)=>n+mesh.geometry.attributes.position.count,0);
  art.sync({...snapshot,revision:2});assert.equal(art.meshes.reduce((n,mesh)=>n+mesh.geometry.attributes.position.count,0),before);
});

test('preview follows the proposed alignment, changes color when invalid, and keeps city targets visible before a destination is chosen',t=>{
  const {art}=fixture(t);art.preview(null,{cities,sourceCityId:'home',visible:true});
  const halos=art.root.getObjectByName('railway-city-targets');assert.ok(halos.visible);assert.equal(halos.count,2);
  assert.equal(art.root.getObjectByName('railway-preview').visible,false);
  const result={valid:true,lines:[line],stations};art.preview(result,{cities,sourceCityId:'home',targetCityId:'other',visible:true});
  const preview=art.root.getObjectByName('railway-preview'),route=preview.getObjectByName('railway-route-preview');
  assert.ok(preview.visible);assert.equal(preview.children.length,3);const positions=route.geometry.attributes.position;
  assert.ok(Math.abs(positions.getY(0)-.48)<1e-7);assert.ok(Math.abs(positions.getZ(positions.count-1)-20)<1e-7);
  const good=route.material.color.clone(),geometry=route.geometry;
  art.preview(result,{cities,sourceCityId:'home',targetCityId:'other',visible:true});assert.equal(route.geometry,geometry);
  art.preview({...result,valid:false},{cities,sourceCityId:'home',targetCityId:'other',visible:true});
  const badRoute=preview.getObjectByName('railway-route-preview');assert.ok(!badRoute.material.color.equals(good));
  const target=new THREE.Color();halos.getColorAt(1,target);assert.ok(Math.abs(target.r-badRoute.material.color.r)<1e-7&&Math.abs(target.g-badRoute.material.color.g)<1e-7&&Math.abs(target.b-badRoute.material.color.b)<1e-7);
  art.preview(null,{cities,visible:false});art.update({mapBlend:1});assert.equal(halos.visible,false);assert.equal(preview.visible,false);
});

test('map line widths are camera-driven uniforms while detailed geometry never changes across zoom modes',t=>{
  const {art}=fixture(t);art.sync(snapshot);const mapMesh=art.mapRoot.getObjectByName('built-map-railway-network').children[0],geometry=mapMesh.geometry;
  const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <alphatest_fragment>\n#include <opaque_fragment>'};mapMesh.material.onBeforeCompile(shader,{});
  assert.ok(shader.uniforms.railwayWidthScale);assert.ok(shader.vertexShader.includes('railwayOffset'));
  const camera=new THREE.OrthographicCamera(-100,100,100,-100,.1,1000);camera.position.set(0,100,0);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  art.update({camera,mapBlend:1,viewportHeight:800,zoom:1});assert.equal(art.root.visible,false);assert.equal(art.mapRoot.visible,true);assert.ok(shader.uniforms.railwayWidthScale.value>1);
  assert.equal(mapMesh.geometry,geometry);art.update({camera,mapBlend:0,zoom:.4});assert.equal(art.root.visible,true);assert.equal(art.mapRoot.visible,false);assert.equal(shader.uniforms.mapNetworkVisibility.value,0);
});

test('blocked alignments still display a clearly dashed red guide between selected cities',t=>{
  const {art}=fixture(t);art.preview({valid:false,lines:[],stations:[],fromCityId:'home',toCityId:'other'},{cities,sourceCityId:'home',targetCityId:'other',visible:true});
  for(const root of [art.root,art.mapRoot]){const guide=root.getObjectByName('blocked-railway-guide');assert.ok(guide);assert.ok(guide.material.isLineDashedMaterial);assert.ok(guide.geometry.attributes.lineDistance);assert.ok(guide.geometry.attributes.position.array.every(Number.isFinite));}
  art.preview(null,{cities,visible:false});assert.equal(art.root.getObjectByName('blocked-railway-guide'),undefined);
});

test('revision replacement and disposal release owned batches without disposing shared palette materials',t=>{
  const {art,parent,mapParent}=fixture(t);let sharedDisposals=0,geometryDisposals=0,bakedDisposals=0;
  const shared=()=>sharedDisposals++;M.gravel.addEventListener('dispose',shared);M.window.addEventListener('dispose',shared);t.after(()=>{M.gravel.removeEventListener('dispose',shared);M.window.removeEventListener('dispose',shared);});
  art.sync(snapshot);const mesh=art.meshes[0];mesh.geometry.addEventListener('dispose',()=>geometryDisposals++);mesh.material.addEventListener('dispose',()=>bakedDisposals++);
  art.sync({...snapshot,revision:2});assert.equal(geometryDisposals,1);assert.equal(bakedDisposals,1);
  art.preview({valid:true,lines:[line],stations},{cities,visible:true});art.dispose();art.dispose();art.update({mapBlend:1});
  assert.equal(parent.children.length,0);assert.equal(mapParent.children.length,0);assert.equal(sharedDisposals,0);
  assert.equal(art.sync({...snapshot,revision:3}),false);
});
