import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildMapWorld} from '../src/map-world.js';
import {declutterMapCities,mapCityRadius,mapNetworkVisibility} from '../src/map-symbols.js';
import {styleUniforms} from '../src/scene-style.js';

function fixture(){
  const triangle=new Float32Array([-100,0,-100,100,0,-100,0,0,100]);
  const world={bounds:{width:2000,depth:1600},players:[],
    cities:[{id:'capital',x:0,z:0,level:10},{id:'town',x:12,z:0,level:5}],
    lines:[{id:'rail',points:[{x:-20,z:0},{x:20,z:0}],distances:[0,40],length:40}],
    mapTerrain:{meshes:[
      {color:'terrain',position:triangle.slice(),vertexColor:new Float32Array(9).fill(.5)},
      {color:'ocean',position:triangle.slice()},
    ]},
  };
  const map=buildMapWorld(new THREE.Group(),world),part=new THREE.Group();
  part.userData.poseOnly=true;part.position.set(3,.4,7);
  const trains=[{state:{id:'train',color:'coral',active:true},parts:[part]}];
  const camera=new THREE.OrthographicCamera(-1000,1000,750,-750,.1,10000);
  camera.position.set(0,1000,0);camera.up.set(0,0,-1);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  return {map,part,trains,camera,options:{camera,viewportHeight:750,dt:.1,reducedMotion:true}};
}

function compile(material){
  const shader={uniforms:{},vertexShader:THREE.ShaderLib.basic.vertexShader,fragmentShader:THREE.ShaderLib.basic.fragmentShader};
  material.onBeforeCompile(shader);return shader;
}

test('the railway network dissolves continuously at the widest zoom and is fully visible at home',()=>{
  assert.equal(mapNetworkVisibility(.38),0);
  assert.equal(mapNetworkVisibility(.5),0);
  assert.ok(Math.abs(mapNetworkVisibility(.65)-.5)<1e-12);
  assert.equal(mapNetworkVisibility(.8),1);
  assert.equal(mapNetworkVisibility(1),1);
  assert.equal(mapNetworkVisibility(),1,'callers without a camera keep their network');
  const epsilon=1e-6;
  assert.ok(mapNetworkVisibility(.5+epsilon)<1e-9,'the hidden boundary has no abrupt step');
  assert.ok(1-mapNetworkVisibility(.8-epsilon)<1e-9,'the visible boundary has no abrupt step');
  let previous=0;
  for(let i=0;i<=100;i++){
    const visibility=mapNetworkVisibility(.38+i*.01);
    assert.ok(visibility>=previous&&visibility<=1,'zooming in never reverses or overshoots the fade');
    previous=visibility;
  }
});

test('rail casings, ink, city stamps, and trains share one depth-correct dissolve while terrain stays intact',()=>{
  const {map,trains,camera,options}=fixture();
  try{
    map.update(trains,options);
    const names=['map-paper','map-ink','map-city-capital','map-train-outlines','map-train-redLight'];
    const meshes=names.map(name=>map.root.getObjectByName(name));
    assert.ok(meshes.every(Boolean),'the fixture includes every stacked symbol layer');
    const shaders=meshes.map(mesh=>compile(mesh.material));
    const visibility=shaders[0].uniforms.mapNetworkVisibility;
    assert.ok(visibility);
    for(let i=0;i<meshes.length;i++){
      assert.equal(shaders[i].uniforms.mapNetworkVisibility,visibility,'one uniform controls every layer');
      assert.equal(shaders[i].uniforms.worldNight,styleUniforms.night,'night coloring survives shader composition');
      assert.match(shaders[i].fragmentShader,/mapNetworkVisibility <= threshold\) discard/);
      assert.match(meshes[i].material.customProgramCacheKey(),/map-network-visibility/);
      assert.equal(meshes[i].material.transparent,false,'stacked artwork remains in the opaque depth pass');
      assert.equal(meshes[i].material.depthWrite,true);
      assert.equal(meshes[i].material.depthTest,true,'the globe can still occlude its far-side network');
    }
    assert.ok(shaders[1].uniforms.mapRouteScale,'rail width remains camera controlled');
    assert.ok(shaders[2].uniforms.mapCityScale,'city size remains camera controlled');
    camera.zoom=.65;camera.updateProjectionMatrix();map.update(trains,options);
    assert.ok(Math.abs(visibility.value-.5)<1e-12);
    for(const name of ['map-terrain','map-ocean']){
      const mesh=map.root.getObjectByName(name),shader=compile(mesh.material);
      assert.equal(shader.uniforms.mapNetworkVisibility,undefined,'land and water have no network mask');
      assert.equal(mesh.visible,true);
    }
  }finally{map.dispose();}
});

test('a hidden network skips decluttering and instance uploads, then resumes at the current train pose',()=>{
  const {map,part,trains,camera,options}=fixture();
  try{
    map.update(trains,options);
    const outlines=map.root.getObjectByName('map-train-outlines');
    const trainsVersion=outlines.instanceMatrix.version,trainMatrices=outlines.instanceMatrix.array.slice();
    const cityAttributes=map.root.getObjectByName('map-cities').children.map(mesh=>mesh.geometry.attributes.cityDetail);
    const cityVersions=cityAttributes.map(attribute=>attribute.version);
    const declutterPasses=map.stats.declutterPasses;
    camera.zoom=.4;camera.position.x+=20;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
    part.position.set(27,.4,19);
    for(let i=0;i<10;i++)map.update(trains,options);
    assert.equal(map.stats.networkVisibility,0);
    assert.equal(map.stats.updatedCars,0);
    assert.equal(map.stats.declutterPasses,declutterPasses);
    assert.equal(outlines.instanceMatrix.version,trainsVersion);
    assert.deepEqual(outlines.instanceMatrix.array,trainMatrices);
    cityAttributes.forEach((attribute,index)=>assert.equal(attribute.version,cityVersions[index]));
    for(const name of ['map-paper','map-ink','map-cities','map-trains'])assert.equal(map.root.getObjectByName(name).visible,false);
    for(const name of ['map-terrain','map-ocean'])assert.equal(map.root.getObjectByName(name).visible,true);
    camera.zoom=1;camera.updateProjectionMatrix();map.update(trains,options);
    assert.equal(map.stats.networkVisibility,1);
    assert.equal(map.stats.updatedCars,1);
    assert.ok(map.stats.declutterPasses>declutterPasses,'returning updates city overlap for the current camera');
    assert.ok(outlines.instanceMatrix.version>trainsVersion);
    const matrix=new THREE.Matrix4();outlines.getMatrixAt(0,matrix);
    assert.equal(matrix.elements[12],27,'the first visible frame uses the live train location');
    assert.equal(matrix.elements[14],19);
    for(const name of ['map-paper','map-ink','map-cities','map-trains'])assert.equal(map.root.getObjectByName(name).visible,true);
  }finally{map.dispose();}
});

test('enlarged city stamps declutter even when their centers cross multiple old grid cells',()=>{
  const radius=mapCityRadius(10);
  const cities=[
    {id:'priority',x:23,y:0,radius,visible:true},
    {id:'neighbor',x:49,y:0,radius,visible:true},
    {id:'distant',x:100,y:0,radius,visible:true},
  ];
  assert.ok(cities[1].x-cities[0].x<radius*2,'the enlarged silhouettes overlap');
  const targets=declutterMapCities(cities,2);
  assert.equal(targets.get('priority'),1);
  assert.equal(targets.get('neighbor'),0,'overlapping neighbor becomes an owner dot across the cell boundary');
  assert.equal(targets.get('distant'),1,'a separate city retains its complete stamp');
});
