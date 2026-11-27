import test from 'node:test';
import assert from 'node:assert/strict';
import {OrthographicCamera,PerspectiveCamera,Vector3} from 'three';
import {pickRailwayCity,pickRailwayHandle,railwayCityLabel} from '../src/settlement-railway-input.js';

test('railway city selection follows the floating level badge and ground location across zoom',()=>{
  const camera=new OrthographicCamera(-60,60,40,-40,.1,400);camera.position.set(0,70,70);camera.lookAt(0,0,0);
  const cities=[{id:'a',x:-22,z:0,y:.7,level:1},{id:'b',x:22,z:0,y:.7,level:5},{id:'outpost',x:0,z:0,level:0}];
  const viewport={width:1200,height:800};
  for(const zoom of [.5,1,2]){
    camera.zoom=zoom;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
    for(const city of cities.slice(0,2)){
      const point=new Vector3(city.x,city.y,city.z).project(camera);
      assert.equal(pickRailwayCity({},cities,camera,point,viewport)?.id,city.id);
      assert.equal(pickRailwayCity({},cities,camera,{x:point.x,y:point.y+48/viewport.height},viewport)?.id,city.id);
    }
  }
  assert.equal(pickRailwayCity({},[cities[2]],camera,{x:0,y:0},viewport),null);
  assert.equal(pickRailwayCity({},cities,camera,{x:.95,y:.95},viewport),null);
});

test('railway selection ignores cities behind the camera and missing view state',()=>{
  const camera=new OrthographicCamera(-10,10,10,-10,.1,100);camera.position.set(0,10,0);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  assert.equal(pickRailwayCity({},[{id:'hidden',x:0,y:20,z:0,level:1}],camera,{x:0,y:0},{width:800,height:800}),null);
  assert.equal(pickRailwayCity({},[],null,{x:0,y:0},{width:800,height:800}),null);
});

test('route control dots have the same comfortable pixel hit area at every overview zoom and viewport',()=>{
  const camera=new OrthographicCamera(-60,60,40,-40,.1,400);camera.position.set(0,70,70);camera.lookAt(0,0,0);
  const handles=[{x:-22,z:0},{x:22,z:0}];
  for(const viewport of [{width:1200,height:800},{width:390,height:844}])for(const zoom of [.5,1,3]){
    camera.zoom=zoom;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
    for(let index=0;index<handles.length;index++){
      const handle=handles[index],point=new Vector3(handle.x,.8,handle.z).project(camera);
      assert.equal(pickRailwayHandle({},handles,camera,point,viewport),index);
      assert.equal(pickRailwayHandle({},[handle],camera,{x:point.x+28/viewport.width,y:point.y},viewport),0,'a fourteen-pixel miss still grabs the dot');
      assert.equal(pickRailwayHandle({},[handle],camera,{x:point.x+32/viewport.width,y:point.y},viewport),-1,'a sixteen-pixel miss leaves camera panning available');
    }
  }
});

test('route picking selects the nearest visible handle rather than the first handle in a cluster',()=>{
  const camera=new PerspectiveCamera(50,1.5,.1,200);camera.position.set(0,35,35);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const handles=[{x:-.5,z:0},{x:.5,z:0}],viewport={width:900,height:600};
  const point=new Vector3(handles[1].x,.8,handles[1].z).project(camera);
  assert.equal(pickRailwayHandle({},handles,camera,point,viewport),1);
  assert.equal(pickRailwayHandle({},[{x:0,z:500}],camera,{x:0,y:0},viewport),-1,'points behind the camera cannot capture a drag');
  assert.equal(pickRailwayHandle({},handles,null,point,viewport),-1);
  assert.equal(pickRailwayHandle({},handles,camera,null,viewport),-1);
  assert.equal(pickRailwayHandle({},handles,camera,point,{width:0,height:600}),-1);
});

test('railway labels preserve named villages and identify player ownership without confusing neutral owners',()=>{
  assert.equal(railwayCityLabel({name:'Willow Fields',level:1,ownerId:'village-gray'},'teal'),'Willow Fields · 1');
  assert.equal(railwayCityLabel({level:2,ownerId:'teal'},'teal'),'Your city · 2');
  assert.equal(railwayCityLabel({level:1,ownerId:'village-gray'},'teal'),'Village city · 1');
  assert.equal(railwayCityLabel({level:3,ownerId:'coral'},'teal'),'Coral city · 3');
});
