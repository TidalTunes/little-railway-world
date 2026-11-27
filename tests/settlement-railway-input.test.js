import test from 'node:test';
import assert from 'node:assert/strict';
import {OrthographicCamera,PerspectiveCamera,Vector3} from 'three';
import {pickRailwayAnchor,pickRailwayCity,pickRailwayHandle,railwayCityLabel} from '../src/settlement-railway-input.js';

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

const topCamera=()=>{const camera=new OrthographicCamera(-60,60,40,-40,.1,400);camera.position.set(0,80,0);camera.up.set(0,0,-1);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);return camera;};
const project=(camera,x,z,y=.42)=>new Vector3(x,y,z).project(camera);
const track=(id,start,end)=>({id,points:[{y:.42,...start},{y:.42,...end}],distances:[0,Math.hypot(end.x-start.x,end.z-start.z)],length:Math.hypot(end.x-start.x,end.z-start.z)});
const near=(actual,expected,message)=>assert.ok(Math.abs(actual-expected)<1e-7,message??`${actual} should equal ${expected}`);

test('railway anchors use track-centered station ports, with constant pixel priority over tracks and badges',()=>{
  const camera=topCamera(),station={id:'station',cityId:'town',lineId:'spine',center:{x:0,z:0},x:0,z:3,heading:0};
  const state={cities:[{id:'town',level:2,x:0,z:0}],stations:[station],lines:[track('spine',{x:-7,z:0},{x:7,z:0}),track('route',{x:7,z:0},{x:30,z:0})]};
  for(const viewport of [{width:1200,height:800},{width:390,height:844}])for(const zoom of [.5,1,2]){
    camera.zoom=zoom;camera.updateProjectionMatrix();
    for(const side of [-1,1]){
      const pointer=project(camera,7*side,0),hit=pickRailwayAnchor({},state,camera,pointer,viewport);
      assert.deepEqual(hit,{kind:'station',stationId:'station',cityId:'town',side,x:7*side,z:0});
      const offset={x:pointer.x,y:pointer.y+27/viewport.height};
      assert.equal(pickRailwayAnchor({},state,camera,offset,viewport)?.kind,'station','station port has a 14px radius independent of zoom');
    }
  }
});

test('station port selection follows heading and the actual spine length, choosing the nearest port',()=>{
  const camera=topCamera(),viewport={width:1200,height:800};
  const station={id:'station',cityId:'town',lineId:'spine',center:{x:2,z:3},heading:Math.PI/2};
  const state={stations:[station],lines:[track('spine',{x:2,z:-8},{x:2,z:14})]};
  const hit=pickRailwayAnchor({},state,camera,project(camera,2,14),viewport);
  assert.equal(hit.side,1);near(hit.x,2);near(hit.z,14);
  camera.zoom=.1;camera.updateProjectionMatrix();
  assert.equal(pickRailwayAnchor({},state,camera,project(camera,2,-8),viewport)?.side,-1,'overlapping hit circles select the nearer station port');
});

test('track anchors project onto segment interiors and preserve distance in perspective',()=>{
  const camera=new PerspectiveCamera(50,1.5,.1,300);camera.position.set(0,35,35);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const line=track('sloping-on-screen',{x:-20,z:-20},{x:24,z:18}),t=.37,x=-20+44*t,z=-20+38*t,viewport={width:900,height:600};
  const hit=pickRailwayAnchor({},{lines:[line]},camera,project(camera,x,z),viewport);
  assert.equal(hit.kind,'track');assert.equal(hit.lineId,line.id);near(hit.x,x);near(hit.z,z);near(hit.distance,line.length*t);
  const roundtrip=project(camera,hit.x,hit.z),pointer=project(camera,x,z);near(roundtrip.x,pointer.x);near(roundtrip.y,pointer.y);
});

test('track selection uses a ten-pixel radius and nearest visible crossing instead of line order',()=>{
  const camera=topCamera(),viewport={width:1200,height:800};
  const horizontal=track('horizontal',{x:-20,z:0},{x:20,z:0}),vertical=track('vertical',{x:0,z:-20},{x:0,z:20});
  assert.equal(pickRailwayAnchor({},{lines:[horizontal,vertical]},camera,project(camera,0,.6),viewport)?.lineId,'vertical');
  for(const zoom of [.5,1,2]){
    camera.zoom=zoom;camera.updateProjectionMatrix();const pointer=project(camera,0,0);
    assert.equal(pickRailwayAnchor({},{lines:[horizontal]},camera,{x:pointer.x,y:pointer.y+19/viewport.height},viewport)?.kind,'track');
    assert.equal(pickRailwayAnchor({},{lines:[horizontal]},camera,{x:pointer.x,y:pointer.y+21/viewport.height},viewport),null);
  }
  const elevated={...horizontal,id:'elevated',points:horizontal.points.map(point=>({...point,y:5}))};
  assert.equal(pickRailwayAnchor({},{lines:[horizontal,elevated]},camera,project(camera,0,0),viewport)?.lineId,'elevated','a depth tie-break selects the visible front track at an exact crossing');
});

test('only rendered track ranges can be anchors, while crossing offscreen endpoints remain selectable',()=>{
  const camera=topCamera(),viewport={width:1200,height:800},line=track('long',{x:-100,z:0},{x:100,z:0});
  assert.equal(pickRailwayAnchor({},{lines:[line]},camera,project(camera,0,0),viewport)?.lineId,'long');
  const clipped={...line,renderRanges:[{start:0,end:80},{start:120,end:200}]};
  assert.equal(pickRailwayAnchor({},{lines:[clipped]},camera,project(camera,0,0),viewport),null,'a hidden shared track range cannot intercept the cursor');
  const hit=pickRailwayAnchor({},{lines:[clipped]},camera,project(camera,35,0),viewport);near(hit.distance,135);
  assert.equal(pickRailwayAnchor({},{lines:[{...line,renderRanges:[]}]},camera,project(camera,0,0),viewport),null);
});

test('station interiors fall through to city badges and do not masquerade as branchable tracks',()=>{
  const camera=topCamera(),viewport={width:1200,height:800},city={id:'town',level:2,x:0,z:0};
  const state={cities:[city],stations:[{id:'station',cityId:'town',lineId:'spine',center:{x:0,z:0},heading:0}],lines:[track('spine',{x:-7,z:0},{x:7,z:0})]};
  const pointer=project(camera,0,0,.7),badge={x:pointer.x,y:pointer.y+48/viewport.height};
  assert.deepEqual(pickRailwayAnchor({},state,camera,pointer,viewport),{kind:'city',cityId:'town',x:0,z:0});
  assert.deepEqual(pickRailwayAnchor({},state,camera,badge,viewport),{kind:'city',cityId:'town',x:0,z:0});
  assert.equal(pickRailwayAnchor({},{...state,cities:[]},camera,pointer,viewport),null);
});

test('anchor picking rejects offscreen ports, hidden tracks, and invalid pointer state',()=>{
  const camera=topCamera(),viewport={width:1200,height:800},pointer={x:0,y:0};
  const station={id:'hidden',cityId:'town',lineId:'spine',center:{x:70,z:0},heading:Math.PI/2};
  assert.equal(pickRailwayAnchor({},{stations:[station]},camera,{x:.999,y:0},viewport),null);
  const hidden=track('hidden',{x:-10,z:0,y:100},{x:10,z:0,y:100});
  assert.equal(pickRailwayAnchor({},{lines:[hidden]},camera,pointer,viewport),null);
  for(const bad of [null,{x:NaN,y:0},{x:0,y:Infinity},{x:1.1,y:0}])assert.equal(pickRailwayAnchor({},{},camera,bad,viewport),null);
  assert.equal(pickRailwayAnchor({},{},null,pointer,viewport),null);
  assert.equal(pickRailwayAnchor({},{},camera,pointer,{width:0,height:800}),null);
});
