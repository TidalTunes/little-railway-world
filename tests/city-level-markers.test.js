import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createCityLevelMarkers,cityMarkerPopulation,cityMarkerFoodStock,cityMarkerStock} from '../src/city-level-markers.js';
import {playerColors} from '../src/player-palette.js';

function fixture(){
  const previous=globalThis.document,labels=[],glyphs=[],paints=[],strokes=[],stack=[];let x=0,y=0,path=[];
  const context={beginPath(){path=[];},arc(cx,cy,r){path.push([cx-r,cy-r],[cx+r,cy+r]);},
    fill(){paints.push({x,y,color:this.fillStyle,width:Math.max(...path.map(p=>p[0]))-Math.min(...path.map(p=>p[0]))});},
    moveTo(a,b){path.push([a,b]);},lineTo(a,b){path.push([a,b]);},closePath(){},
    save(){stack.push([x,y]);},restore(){[x,y]=stack.pop();},translate(a,b){x+=a;y+=b;},
    measureText(label){return{width:String(label).length*18};},
    fillText(label){labels.push(label);glyphs.push({label,x,y,color:this.fillStyle,font:this.font});},strokeText(label){strokes.push({label,x,y});}};
  globalThis.document={createElement:()=>({getContext:()=>context})};
  const scene=new THREE.Group(),map=new THREE.Group(),world={players:[{id:'teal',color:{l:.62,c:.12,h:170}}],gameplay:{ownerId:'teal'}};
  const markers=createCityLevelMarkers(scene,map,world);
  if(previous===undefined)delete globalThis.document;else globalThis.document=previous;
  const camera=new THREE.PerspectiveCamera(50,1,.1,1000);camera.position.set(0,25,30);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  return {scene,map,markers,camera,labels,glyphs,paints,strokes,world};
}
const towns=Array.from({length:5},(_,i)=>({id:`city-${i}`,x:(i-2)*4,z:0,level:i+1}));

test('level and population share the same framed plate in both strategy layers',()=>{
  const {scene,map,markers,camera,labels}=fixture();
  try{
    markers.sync(towns);markers.update({camera,mapBlend:.5,viewportHeight:800});
    assert.deepEqual(labels,['1','3','2','6','3','9','4','12','5','15']);
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
    markers.update({camera});assert.deepEqual(labels,['2','7','2','6']);
    assert.deepEqual(Array.from(scene.children[0].geometry.attributes.cityPopulation.array).slice(0,2),[7,6]);
    const atlas=scene.children[0].material.map,version=atlas.version,geometry=scene.children[0].geometry;
    for(let i=0;i<20;i++){camera.position.x=i/10;camera.updateMatrixWorld(true);markers.update({camera,mapBlend:i/20});}
    markers.sync([{id:'home',x:0,z:0,level:2,houseCount:7},{id:'village',x:3,z:0,level:2,houseCount:6}]);
    assert.equal(atlas.version,version);assert.equal(scene.children[0].geometry,geometry);assert.equal(markers.stats.atlasUpdates,1);
    markers.sync([{id:'home',x:0,z:0,level:2,houseCount:8}]);assert.equal(markers.stats.atlasUpdates,2);assert.ok(atlas.version>version);
    assert.equal(cityMarkerPopulation({houseCount:6,population:100}),6);assert.equal(cityMarkerPopulation({houseIds:['a','b','c']}),3);
  }finally{markers.dispose();}
});

test('framed city tags fit actual population text without shrinking the type or losing ownership',()=>{
  const {scene,map,markers,camera,glyphs,paints,world}=fixture();
  try{
    markers.sync([{x:0,z:0,level:2,houseCount:6},{x:3,z:0,level:5,houseCount:29}]);markers.update({camera,mapBlend:1});
    const detailed=scene.children[0].material,flat=map.children[0].material;
    assert.equal(detailed,flat,'both strategy layers share the same framed atlas');
    assert.deepEqual(glyphs.map(glyph=>glyph.label),['2','6','5','29']);
    const frames=paints.filter(paint=>paint.color==='#c3a461');
    assert.equal(frames.length,2);assert.equal(frames[0].width,108);assert.equal(frames[1].width,126);
    assert.ok(frames.every(frame=>frame.width<155),'both ordinary populations are tighter than the old fixed frame');
    assert.equal(frames[0].x+frames[0].width/2+2,96,'the visible frame remains centered inside its atlas cell');
    assert.equal(frames[1].x+frames[1].width/2+2,288);
    assert.ok(paints.some(paint=>paint.color===playerColors(world.players[0]).body.getStyle()),'owner color remains on the level crest');
    assert.equal(glyphs[1].font,'650 30px system-ui, sans-serif');assert.equal(glyphs[3].font,glyphs[1].font);
    assert.equal(scene.children[0].geometry.attributes.cityPopulation.getX(1),29,'population keeps growing after level five');
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


test('village food stores appear above the unchanged centered plate and update only when stock changes',()=>{
  const {scene,map,markers,camera,glyphs,strokes}=fixture();
  const village={id:'farm',x:0,z:0,level:2,houseCount:6,neutral:true,resource:'food',stock:{food:12}};
  try{
    markers.sync([village]);markers.update({camera,mapBlend:1});
    assert.deepEqual(glyphs.map(glyph=>glyph.label),['2','6','12']);assert.deepEqual(strokes.map(stroke=>stroke.label),['12']);
    assert.ok(glyphs[2].y<glyphs[1].y,'Food is a separate line above level and population');
    const geometry=scene.children[0].geometry,texture=scene.children[0].material.map,version=texture.version;
    // The plate keeps its previous screen size/center despite extra atlas headroom.
    const position=geometry.attributes.position;
    assert.ok(Math.abs((position.getY(0)+position.getY(2))/2-.3)<1e-6);
    for(let i=0;i<30;i++)markers.update({camera,mapBlend:i/30});
    markers.sync([{...village}]);assert.equal(texture.version,version);
    markers.sync([{...village,stock:{food:0}}]);assert.ok(texture.version>version);assert.equal(glyphs.at(-1).label,'0');
    markers.update({camera,mapBlend:.5});assert.equal(scene.children[0].geometry,geometry);assert.equal(map.children[0].material.map,texture);
    assert.equal(markers.stats.atlasUpdates,2);
    assert.equal(cityMarkerFoodStock({...village,stock:{food:0},foodStock:99}),0);
    assert.equal(cityMarkerFoodStock({...village,stock:undefined,foodStock:7}),7);
    assert.equal(cityMarkerFoodStock({neutral:false,resource:'resources',stock:{food:7}}),null);
    assert.equal(cityMarkerFoodStock({...village,stock:{food:NaN}}),null);
  }finally{markers.dispose();}
});


test('player Resource stock uses the same larger overhead amount and separate atlas content as Food',()=>{
  const {scene,markers,camera,glyphs,strokes}=fixture();
  const owned={id:'home',x:0,z:0,level:2,houseCount:6,resource:'resources',stock:{resources:27,food:9}};
  const village={id:'farm',x:4,z:0,level:2,houseCount:6,neutral:true,stock:{food:27}};
  try{
    markers.sync([owned,village]);markers.update({camera});assert.equal(markers.stats.atlasCells,2);
    assert.deepEqual(strokes.map(x=>x.label),['27','27']);
    assert.equal(glyphs[2].font,'700 32px system-ui, sans-serif');assert.equal(glyphs[5].font,glyphs[2].font);
    assert.notEqual(glyphs[2].color,glyphs[5].color);assert.ok(glyphs[2].y<glyphs[1].y);
    const texture=scene.children[0].material.map,version=texture.version;
    markers.sync([{...owned,stock:{resources:26,food:9}},village]);assert.ok(texture.version>version);assert.equal(glyphs.at(-4).label,'26');
    assert.deepEqual(cityMarkerStock({...owned,stock:{resources:0}}),{resource:'resources',amount:0});
    assert.deepEqual(cityMarkerStock({...owned,stock:undefined,resourceStock:7}),{resource:'resources',amount:7});
    assert.equal(cityMarkerStock({...owned,stock:{resources:NaN}}),null);
  }finally{markers.dispose();}
});
