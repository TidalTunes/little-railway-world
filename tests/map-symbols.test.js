import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildMapWorld} from '../src/map-world.js';
import {MAP_SYMBOL_PIXELS,mapSymbolMetrics} from '../src/map-symbols.js';
import {styleUniforms} from '../src/scene-style.js';
import {surfacePoint,surfaceNormal,surfaceFrame} from '../src/world-surface.js';

function emptyWorld(){return {bounds:{width:2000,depth:1600},cities:[],players:[],lines:[],mapTerrain:{meshes:[]}};}

test('atlas symbols stay readable and bounded in CSS pixels from regional to planetary views',()=>{
  for(const units of [.08,.4,2,8,40])for(const symbolScale of [1,2.6]){
    const metrics=mapSymbolMetrics(units,symbolScale,1.8);
    assert.ok(Math.abs(.42*metrics.routeScale/units-MAP_SYMBOL_PIXELS.railCore)<1e-10);
    assert.ok(Math.abs(.96*metrics.routeScale/units-3.2)<1e-10,'ivory casing maintains a crisp subpixel margin around its ink');
    for(const level of [1,5,10]){
      const diameter=2*(1.75+level*.12)*symbolScale*metrics.cityScale/units;
      assert.ok(diameter>=11&&diameter<=18,'development tiers stay recognizable without overwhelming the atlas');
    }
    if(units>1){
      assert.ok(Math.abs(1.22*1.8*metrics.trainScaleX/units-MAP_SYMBOL_PIXELS.trainWidth)<1e-10);
      assert.ok(Math.abs(2.45*metrics.trainScaleZ/units-MAP_SYMBOL_PIXELS.trainLength)<1e-10);
    }
  }
});

test('zooming hundreds of city stamps only updates one uniform, without rebuilding or uploading instances',()=>{
  const world=emptyWorld();
  world.cities=Array.from({length:512},(_,i)=>({id:`city-${i}`,x:i%32*30,z:Math.floor(i/32)*30,level:i%10+1}));
  const map=buildMapWorld(new THREE.Group(),world),cities=map.root.getObjectByName('map-cities');
  try{
    assert.equal(map.stats.cityBatches,10,'a development tier shares its one compact symbol');
    const meshes=[...cities.children],versions=meshes.map(mesh=>mesh.instanceMatrix.version);
    const matrices=meshes.map(mesh=>mesh.instanceMatrix.array.slice());
    const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <opaque_fragment>'};
    meshes[0].material.onBeforeCompile(shader);
    assert.ok(shader.uniforms.mapCityScale,'camera scale belongs to a shared shader uniform');
    assert.equal(shader.uniforms.worldNight,styleUniforms.night,'night palette composes with city sizing');
    assert.match(meshes[0].material.customProgramCacheKey(),/map-city-screen-size.*map-symbol/);
    const camera=new THREE.OrthographicCamera(-1000,1000,750,-750,.1,10000);
    for(const zoom of [.4,1,4,12]){
      camera.zoom=zoom;map.update([],{camera,viewportHeight:750});
      assert.equal(shader.uniforms.mapCityScale.value,mapSymbolMetrics(2/zoom,2.6,1.8).cityScale);
      meshes.forEach((mesh,index)=>{
        assert.equal(mesh.instanceMatrix.version,versions[index],'zoom causes no city transform upload');
        assert.deepEqual(mesh.instanceMatrix.array,matrices[index]);
        assert.equal(mesh.frustumCulled,false,'GPU enlarged glyphs cannot be culled using their smaller authoring bounds');
        assert.ok(mesh.geometry.attributes.position.count<=96,'border and development icon remain a single compact mesh');
      });
    }
    const before=shader.uniforms.mapCityScale.value;
    camera.zoom=.1;map.update([],{visible:false,camera,viewportHeight:750});
    assert.equal(shader.uniforms.mapCityScale.value,before,'hidden maps skip even their uniform updates');
  }finally{map.dispose();}
});

test('map railway stroke width is physical at every latitude before applying the pixel-width uniform',()=>{
  const radius=1600,world=emptyWorld();
  world.surface={type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}};
  for(const latitude of [0,45,80]){
    const z=-radius*latitude*Math.PI/180;
    world.lines.push({id:`north-south-${latitude}`,points:[{x:0,z:z-5},{x:0,z:z+5}],distances:[0,10],length:10});
  }
  const map=buildMapWorld(new THREE.Group(),world);
  try{
    const rail=map.root.getObjectByName('map-ink'),offset=rail.geometry.attributes.routeOffset,point=new THREE.Vector3();
    for(let i=0;i<offset.count;i++){
      point.fromBufferAttribute(offset,i);
      assert.ok(Math.abs(point.length()-.21)<1e-6,'longitude compression cannot thin rail connections near the poles');
    }
    const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <opaque_fragment>'};
    rail.material.onBeforeCompile(shader);
    assert.equal(shader.uniforms.worldNight,styleUniforms.night,'night ink composes with physical rail widening');
    assert.match(rail.material.customProgramCacheKey(),/map-route-width.*map-symbol:ink/);
    const camera=new THREE.OrthographicCamera(-2000,2000,1500,-1500,.1,10000);
    map.update([],{camera,viewportHeight:1000});
    assert.equal(shader.uniforms.mapRouteScale.value,mapSymbolMetrics(3,2.6).routeScale);
    assert.match(shader.vertexShader,/routeOffset \* \(mapRouteScale - 1.0\)/);
  }finally{map.dispose();}
});

function britishCities(){
  const radius=1600,world=emptyWorld();
  world.surface={type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}};
  world.cities=[['london',-.1276,51.5072,10],['birmingham',-1.902,52.4862,7],['manchester',-2.2426,53.4808,8],['leeds',-1.5491,53.8008,6]]
    .map(([id,lon,lat,level])=>({id,x:radius*lon*Math.PI/180,z:-radius*lat*Math.PI/180,level}));
  const x=radius*-1.3*Math.PI/180,z=-radius*53*Math.PI/180,focus=surfacePoint(world,x,0,z),normal=surfaceNormal(world,x,z);
  const camera=new THREE.OrthographicCamera(-1760,1760,1760,-1760,.1,14000);
  camera.position.copy(focus).addScaledVector(normal,5000);
  camera.up.setFromMatrixColumn(surfaceFrame(world,x,z),2).negate();camera.lookAt(focus);camera.updateMatrixWorld(true);
  return {world,camera};
}

test('dense British cities keep one priority stamp and anchored owner dots on both phone and desktop globes',()=>{
  for(const viewportHeight of [300,700]){
    const {world,camera}=britishCities(),map=buildMapWorld(new THREE.Group(),world);
    try{
      const glyphs=world.cities.map(city=>map.root.getObjectByName(`map-city-${city.id}`));
      const matrices=glyphs.map(glyph=>glyph.matrix.clone());
      const projected=world.cities.map(city=>surfacePoint(world,city.x,0,city.z).project(camera).multiplyScalar(viewportHeight/2));
      assert.ok(projected[2].distanceTo(projected[3])<4,'fixture has a truly crowded Manchester/Leeds pair');
      const options={camera,viewportHeight,dt:1/60};
      map.update([],options);
      assert.ok(glyphs.some(glyph=>{const detail=glyph.geometry.attributes.cityDetail.getX(0);return detail>0&&detail<1;}),
        'secondary glyphs ease down instead of popping off');
      for(let i=0;i<60;i++)map.update([],options);
      const detail=glyphs.map(glyph=>glyph.geometry.attributes.cityDetail.getX(0));
      assert.equal(detail[0],1,'highest development London retains its full stamp');
      assert.ok(detail.slice(1).every(value=>value===0),'crowded secondary cities become small owner dots');
      const units=(camera.top-camera.bottom)/viewportHeight;
      const shader={uniforms:{},vertexShader:THREE.ShaderLib.basic.vertexShader,fragmentShader:THREE.ShaderLib.basic.fragmentShader};
      glyphs[0].material.onBeforeCompile(shader);
      for(let i=1;i<glyphs.length;i++){
        const glyph=glyphs[i];glyph.geometry.computeBoundingBox();
        const pixels=2*glyph.geometry.boundingBox.max.x*shader.uniforms.mapCityScale.value*glyph.geometry.attributes.cityCompactScale.getX(0)/units;
        assert.ok(Math.abs(pixels-3.4)<.00001,'secondary city retains a bounded, readable owner dot');
        const color=new THREE.Vector3().fromBufferAttribute(glyph.geometry.attributes.cityDotColor,0);
        assert.ok(color.length()>0,'compact glyph carries its owner color');
      }
      const passes=map.stats.declutterPasses,uploads=map.stats.cityAttributeUpdates;
      for(let i=0;i<20;i++)map.update([],options);
      assert.equal(map.stats.declutterPasses,passes,'stationary camera skips projection and overlap work');
      assert.equal(map.stats.cityAttributeUpdates,uploads,'settled symbols cause no attribute uploads');
      camera.position.x+=units*.25;camera.updateMatrixWorld();
      map.update([],options);assert.equal(map.stats.declutterPasses,passes,'subpixel movement cannot churn the layout');
      camera.zoom=24;camera.updateProjectionMatrix();
      map.update([],options);
      assert.ok(glyphs.slice(1).some(glyph=>glyph.geometry.attributes.cityDetail.getX(0)<1),'zoom restoration is also eased');
      for(let i=0;i<60;i++)map.update([],options);
      assert.ok(glyphs.every(glyph=>glyph.geometry.attributes.cityDetail.getX(0)===1),'regional zoom restores every full city stamp');
      glyphs.forEach((glyph,index)=>assert.deepEqual(glyph.matrix.elements,matrices[index].elements,'decluttering never moves a real anchor'));
    }finally{map.dispose();}
  }
});

test('city priority is stable across input ordering and reduced motion updates without an animation tail',()=>{
  const {world,camera}=britishCities(),reverse={...world,cities:[...world.cities].reverse()};
  const maps=[world,reverse].map(model=>buildMapWorld(new THREE.Group(),model));
  try{
    maps.forEach(map=>map.update([],{camera,viewportHeight:300,dt:1/60,reducedMotion:true}));
    const details=map=>Object.fromEntries(world.cities.map(city=>[city.id,map.root.getObjectByName(`map-city-${city.id}`).geometry.attributes.cityDetail.getX(0)]));
    assert.deepEqual(details(maps[0]),details(maps[1]));
    assert.ok(Object.values(details(maps[0])).every(value=>value===0||value===1));
  }finally{maps.forEach(map=>map.dispose());}
});
