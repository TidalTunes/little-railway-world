import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3} from 'three';
import {alignmentCandidates,sampleAlignment} from '../src/alignments.js';
import {surfacePoint} from '../src/world-surface.js';
import {createCircuitSelectionArt} from '../src/circuit-selection-art.js';

function line(id='rail',length=60){const alignment=alignmentCandidates({x:0,z:0,heading:0},{x:length,z:0,heading:0})[0];return{id,length:alignment.length,alignment};}
function fixture(world={}){const root=new Group(),map=new Group(),art=createCircuitSelectionArt(root,map,world);return{root,map,art};}
const loop=(pieces,revision=1)=>({id:'circuit',revision,segments:pieces});

test('selection highlights only traversed graph slices, excluding unused track after an offshoot',()=>{
  const{root,map,art}=fixture(),track=line();art.sync(loop([{lineId:'rail',start:14,end:28}]),[track]);art.update({mapBlend:.5});
  const geometry=root.children[0].geometry,positions=geometry.attributes.position;let min=Infinity,max=-Infinity;
  for(let i=0;i<positions.count;i++){min=Math.min(min,positions.getX(i));max=Math.max(max,positions.getX(i));assert.ok(Math.abs(positions.getZ(i))<1e-6);}
  assert.equal(min,14);assert.equal(max,28);assert.equal(map.children[0].geometry,geometry);assert.equal(map.children[0].material,root.children[0].material);assert.ok(root.children[0].visible&&map.children[0].visible);art.dispose();
});

test('unchanged selection and camera updates reuse the shared geometry; changed network revisions rebuild once',()=>{
  const{root,art}=fixture(),track=line(),selected=loop([{lineId:'rail',start:5,end:50}]);
  assert.equal(art.sync(selected,[track]),true);const geometry=root.children[0].geometry;
  assert.equal(art.sync(structuredClone(selected),[structuredClone(track)]),false,'equivalent snapshots share a network revision');
  for(let i=0;i<100;i++)art.update({mapBlend:i/100,viewportHeight:600+i});assert.equal(art.stats.rebuilds,1);assert.equal(root.children[0].geometry,geometry);
  assert.equal(art.sync({...selected,revision:2},[track]),true);assert.equal(art.stats.rebuilds,2);assert.notEqual(root.children[0].geometry,geometry);art.dispose();
});

test('highlight is subtler on hover, hidden in walking mode, and absent without a complete valid selection',()=>{
  const{root,map,art}=fixture(),track=line();art.sync(loop([{lineId:'rail',start:5,end:50}]),[track]);art.update();const selectedOpacity=root.children[0].material.opacity;
  art.update({hover:true});assert.ok(root.children[0].material.opacity<selectedOpacity);art.update({walkingWeight:1,mapBlend:.5});assert.equal(root.children[0].visible,false);assert.equal(map.children[0].visible,false);
  art.update({walkingWeight:0,visible:false});assert.equal(art.stats.visible,false);art.sync(null,[track]);art.update();assert.equal(art.stats.vertices,0);
  art.sync(loop([{lineId:'missing',start:0,end:5}]),[track]);art.update();assert.equal(art.stats.visible,false);art.dispose();assert.equal(root.children.length,0);assert.equal(map.children.length,0);
});

test('curves retain sampled positions and unit lateral offsets without straightening the route',()=>{
  const{root,art}=fixture(),alignment=alignmentCandidates({x:0,z:0,heading:0},{x:25,z:25,heading:Math.PI/2})[0],track={id:'curve',length:alignment.length,alignment};
  art.sync(loop([{lineId:'curve',start:0,end:track.length}]),[track]);
  const{position,previewOffset,previewSide}=root.children[0].geometry.attributes;assert.equal(position.count,art.stats.intervals*6);
  for(let i=0;i<art.stats.intervals;i++){const expected=sampleAlignment(alignment,alignment.length*i/art.stats.intervals);assert.ok(Math.hypot(position.getX(i*6)-expected.x,position.getZ(i*6)-expected.z)<1e-4);const lateral=new Vector3().fromBufferAttribute(previewOffset,i*6);assert.ok(Math.abs(lateral.length()-1)<1e-6);assert.equal(previewSide.getX(i*6),-1);}
  art.dispose();
});

test('large loops have a bounded sampling budget, while precise slice endpoints remain intact',()=>{
  const{root,art}=fixture(),track=line('huge',100000);art.sync(loop([{lineId:'huge',start:7,end:99993}]),[track]);
  assert.ok(art.stats.intervals<=8192);const positions=root.children[0].geometry.attributes.position;assert.equal(positions.getX(0),7);assert.equal(positions.getX(positions.count-1),99993);art.dispose();
});

test('surface projection and hollow screen-width shader keep map tracks readable without a glow',()=>{
  const radius=100,world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  const{root,art}=fixture(world),track=line();art.sync(loop([{lineId:'rail',start:5,end:15}]),[track]);
  const position=root.children[0].geometry.attributes.position,expected=surfacePoint(world,5,.55,0);assert.ok(new Vector3().fromBufferAttribute(position,0).distanceTo(expected)<1e-5);
  const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>'};root.children[0].material.onBeforeCompile(shader);
  assert.match(shader.vertexShader,/5\.2 \* selectionUnit/);assert.match(shader.fragmentShader,/smoothstep\(0\.61, 0\.67/);assert.match(shader.fragmentShader,/selectionSphereRadius/);assert.equal(shader.uniforms.selectionSphereRadius.value,radius);art.dispose();
});
