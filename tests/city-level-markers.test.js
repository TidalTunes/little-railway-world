import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createCityLevelMarkers,cityMarkerPopulation} from '../src/city-level-markers.js';
import {playerColors} from '../src/player-palette.js';

function fixture(){
  const previous=globalThis.document,labels=[],glyphs=[],paints=[],strokes=[],stack=[];let x=0,y=0,path=[];
  const context={beginPath(){path=[];},arc(cx,cy,r){path.push([cx-r,cy-r],[cx+r,cy+r]);},
    fill(){paints.push({x,y,color:this.fillStyle,width:Math.max(...path.map(p=>p[0]))-Math.min(...path.map(p=>p[0]))});},
    moveTo(a,b){path.push([a,b]);},lineTo(a,b){path.push([a,b]);},closePath(){},
    save(){stack.push([x,y]);},restore(){[x,y]=stack.pop();},translate(a,b){x+=a;y+=b;},
    fillText(label){labels.push(label);glyphs.push({label,x,y,color:this.fillStyle});},strokeText(label){strokes.push({label,x,y});}};
  globalThis.document={createElement:()=>({getContext:()=>context})};
  const scene=new THREE.Group(),map=new THREE.Group(),world={players:[{id:'teal',color:{l:.62,c:.12,h:170}}],gameplay:{ownerId:'teal'}};
  const markers=createCityLevelMarkers(scene,map,world);
  if(previous===undefined)delete globalThis.document;else globalThis.document=previous;
  const camera=new THREE.PerspectiveCamera(50,1,.1,1000);camera.position.set(0,25,30);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  return {scene,map,markers,camera,labels,glyphs,paints,strokes,world};
}
const towns=Array.from({length:5},(_,i)=>({id:`city-${i}`,x:(i-2)*4,z:0,level:i+1}));

test('level and population remain identical across detailed and unboxed map labels',()=>{
  const {scene,map,markers,camera,labels}=fixture();
  try{
    markers.sync(towns);markers.update({camera,mapBlend:.5,viewportHeight:800});
    assert.deepEqual(labels,['1','3','1','3','2','6','2','6','3','9','3','9','4','12','4','12','5','15','5','15']);
    assert.equal(scene.children[0].count,5);assert.equal(map.children[0].count,5);
    assert.deepEqual(Array.from(scene.children[0].geometry.attributes.cityLevel.array).slice(0,5),[1,2,3,4,5]);
    assert.equal(scene.children[0].geometry,map.children[0].geometry);
    markers.update({camera,walkingWeight:1});assert.equal(scene.children[0].visible,false);assert.equal(map.children[0].visible,false);
    markers.sync([]);markers.update({camera});assert.equal(scene.children[0].count,0);
  }finally{markers.dispose();}
});

test('city badges retain their screen size through zoom and cull towns outside the view',()=>{
  const {scene,markers,camera}=fixture(),matrix=new THREE.Matrix4(),point=new THREE.Vector3(),rotation=new THREE.Quaternion(),scale=new THREE.Vector3();
  try{
    markers.sync([{x:0,z:0,level:3},{x:1000,z:0,level:1}]);
    function pixels(){markers.update({camera,viewportHeight:800});assert.equal(scene.children[0].count,1);
      scene.children[0].getMatrixAt(0,matrix);matrix.decompose(point,rotation,scale);point.applyMatrix4(camera.matrixWorldInverse);
      return scale.y*800*camera.projectionMatrix.elements[5]/(2*Math.abs(point.z));}
    assert.ok(Math.abs(pixels()-40)<.001);
    camera.position.multiplyScalar(2);camera.updateMatrixWorld(true);assert.ok(Math.abs(pixels()-40)<.001);
    markers.update({camera,mapBlend:1});assert.equal(scene.children[0].visible,false);
  }finally{markers.dispose();}
});

test('growing city counts reuses the numeral atlas and releases replaced buffers',()=>{
  const {scene,map,markers,camera}=fixture();
  try{
    const old=scene.children[0],material=old.material,atlas=material.map;let released=0;
    old.geometry.addEventListener('dispose',()=>released++);
    markers.sync(Array.from({length:12},(_,i)=>({x:i/4,z:0,level:1+i%5})));markers.update({camera});
    assert.equal(released,1);assert.equal(scene.children.length,1);assert.equal(map.children.length,1);
    assert.equal(scene.children[0].material,material);assert.equal(scene.children[0].material.map,atlas);
    assert.equal(scene.children[0].count,12);
  }finally{markers.dispose();}
  assert.equal(scene.children.length,0);assert.equal(map.children.length,0);
});


test('city population comes from homes and updates the cached plate only when statistics change',()=>{
  const {scene,markers,camera,labels}=fixture();
  try{
    markers.sync([{id:'home',x:0,z:0,level:2,houseCount:7},{id:'village',x:3,z:0,level:2,houseCount:6}]);
    markers.update({camera});assert.deepEqual(labels,['2','7','2','7','2','6','2','6']);
    assert.deepEqual(Array.from(scene.children[0].geometry.attributes.cityPopulation.array).slice(0,2),[7,6]);
    const atlas=scene.children[0].material.map,version=atlas.version,geometry=scene.children[0].geometry;
    for(let i=0;i<20;i++){camera.position.x=i/10;camera.updateMatrixWorld(true);markers.update({camera,mapBlend:i/20});}
    markers.sync([{id:'home',x:0,z:0,level:2,houseCount:7},{id:'village',x:3,z:0,level:2,houseCount:6}]);
    assert.equal(atlas.version,version);assert.equal(scene.children[0].geometry,geometry);assert.equal(markers.stats.atlasUpdates,1);
    markers.sync([{id:'home',x:0,z:0,level:2,houseCount:8}]);assert.equal(markers.stats.atlasUpdates,2);assert.ok(atlas.version>version);
    assert.equal(cityMarkerPopulation({houseCount:6,population:100}),6);assert.equal(cityMarkerPopulation({houseIds:['a','b','c']}),3);
  }finally{markers.dispose();}
});

test('map labels keep ownership and population without an enclosing painted panel',()=>{
  const {scene,map,markers,camera,glyphs,paints,strokes,world}=fixture();
  try{
    markers.sync([{x:0,z:0,level:2,houseCount:6}]);markers.update({camera,mapBlend:1});
    const detailed=scene.children[0].material,flat=map.children[0].material;
    assert.equal(detailed.map,flat.map,'both styles share one cached texture allocation');
    const shader=material=>{const s={uniforms:{},vertexShader:'#include <uv_vertex>'};material.onBeforeCompile(s);return s;};
    assert.equal(shader(detailed).uniforms.cityMarkerStyle.value,0);assert.equal(shader(flat).uniforms.cityMarkerStyle.value,1);
    const mapGlyphs=glyphs.filter(glyph=>glyph.x===160);
    assert.deepEqual(mapGlyphs.map(glyph=>glyph.label),['2','6']);
    assert.equal(mapGlyphs[0].color,playerColors(world.players[0]).body.getStyle());
    assert.ok(strokes.some(stroke=>stroke.x===160&&stroke.label==='2'),'level keeps a crisp contrast outline');
    assert.ok(paints.filter(paint=>paint.x===0).some(paint=>paint.width>100),'detailed view retains its existing plate');
    assert.ok(paints.filter(paint=>paint.x===160).every(paint=>paint.width<32),'only the small resident icon is painted behind map glyphs');
  }finally{markers.dispose();}
});

test('full map city statistics are centered and both layers share the interpolated position',()=>{
  const {scene,map,markers,camera}=fixture(),a=new THREE.Matrix4(),b=new THREE.Matrix4(),point=new THREE.Vector3(),projected=new THREE.Vector3();
  try{
    markers.sync([{id:'home',x:0,y:.7,z:0,level:2,houseCount:6}]);
    for(const mapBlend of [0,.25,.5,.75,1]){
      markers.update({camera,mapBlend,viewportHeight:800});scene.children[0].getMatrixAt(0,a);map.children[0].getMatrixAt(0,b);
      assert.deepEqual(a.elements,b.elements);point.setFromMatrixPosition(a);projected.set(0,.7,0).project(camera);point.project(camera);
      const pixels=(point.y-projected.y)*400,expected=24*(1-THREE.MathUtils.smoothstep(mapBlend,0,1));assert.ok(Math.abs(pixels-expected)<1e-4);
    }
    markers.sync([{x:0,z:0,level:0,houseCount:2}]);markers.update({camera});assert.equal(scene.children[0].count,0,'outposts do not appear as cities');
  }finally{markers.dispose();}
});
