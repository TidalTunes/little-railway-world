import test from 'node:test';
import assert from 'node:assert/strict';
import {OrthographicCamera,Vector3} from 'three';
import {pickRailwayCity} from '../src/settlement-railway-input.js';

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
