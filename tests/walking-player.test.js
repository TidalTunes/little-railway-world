import test from 'node:test';
import assert from 'node:assert/strict';
import {BoxGeometry,Group,Mesh,MeshBasicMaterial,Vector3} from 'three';
import {createWalkingPlayer,WALKING} from '../src/walking-player.js';
import {generateWorld,worldSurface,distanceToRoutes} from '../src/world-model.js';
import {createIslandWorld} from '../src/island-world.js';
import {surfaceChartCoordinates,surfaceDistance,surfaceNormal,surfacePoint} from '../src/world-surface.js';

function flat(overrides={}){
  return{outline:[[-60,-60],[60,-60],[60,60],[-60,60]],mountains:[],cities:[],stations:[],placements:[],lines:[],
    river:{points:[],width:0,y:-1.2},rivers:[],...overrides};
}
function run(player,seconds,input={},hz=60){for(let i=0;i<seconds*hz;i++)player.update(1/hz,input);}

test('walking uses a persistent human-scale character and instant independent perspective camera',()=>{
  const parent=new Group(),world=flat(),original=structuredClone(world),player=createWalkingPlayer(parent,world);
  assert.equal(player.initialized,false);assert.equal(player.active,false);
  assert.equal(player.camera.isPerspectiveCamera,true);assert.equal(player.root.visible,false);
  assert.equal(player.enter({x:0,z:0}),true);assert.equal(player.active,true);assert.equal(player.initialized,true);
  assert.ok(player.root.getObjectByName('backpack'));assert.ok(player.root.getObjectByName('left-leg'));
  assert.ok(player.camera.position.distanceTo(surfacePoint(world,0,.035,0))<5);
  player.resize(16/9);assert.equal(player.camera.aspect,16/9);
  run(player,1,{forward:1});const saved={...player.position};player.exit();assert.equal(player.root.visible,false);
  run(player,1,{forward:1});assert.deepEqual(player.position,saved,'overview does not keep moving a hidden player');
  player.enter({x:30,z:30});assert.deepEqual(player.position,saved,'returning resumes the same player instead of teleporting');
  assert.deepEqual(world,original,'third person does not modify or regenerate world assets');
  player.dispose();assert.equal(player.root.parent,null);assert.equal(player.enter(),false);
});

test('fixed-step movement is frame-rate independent and diagonal input has no speed bonus',()=>{
  const make=()=>{const p=createWalkingPlayer(new Group(),flat());p.enter({x:0,z:0});return p;};
  const low=make(),high=make(),diagonal=make();
  run(low,2,{forward:1},30);run(high,2,{forward:1},120);run(diagonal,2,{forward:1,right:1},60);
  assert.ok(Math.abs(low.position.z-high.position.z)<1e-9);
  assert.ok(Math.abs(Math.hypot(diagonal.position.x,diagonal.position.z)-high.position.z)<1e-9);
  assert.ok(high.position.z>WALKING.speed*1.8&&high.position.z<WALKING.speed*2);
  const before={...high.position};run(high,1,{forward:1,sprint:true});assert.ok(high.position.z-before.z>4);
  [low,high,diagonal].forEach(p=>p.dispose());
});

test('camera-relative WASD follows orbit yaw, while pitch stays comfortable above the ground',()=>{
  const player=createWalkingPlayer(new Group(),flat());player.enter({x:0,z:0});
  player.update(0,{lookX:Math.PI/2,lookY:-100});assert.ok(player.pitch>=Math.PI/18);
  run(player,1,{forward:1});assert.ok(player.position.x>2.4);assert.ok(Math.abs(player.position.z)<1e-8);
  const before={...player.position};run(player,1,{right:1});assert.ok(player.position.z-before.z>2.4,'D moves to the actual screen right after orbiting');
  player.update(0,{lookY:100});assert.ok(player.pitch<=65*Math.PI/180);
  const direction=new Vector3();player.camera.getWorldDirection(direction);assert.ok(direction.y<-.1);
  player.dispose();
});

test('jump has one launch per press, lands exactly, and never accumulates hidden-tab time',()=>{
  const player=createWalkingPlayer(new Group(),flat());player.enter({x:0,z:0});const floor=player.position.y;
  player.update(1/60,{jump:true});assert.equal(player.grounded,false);assert.ok(player.position.y>floor);
  run(player,.3,{jump:true});assert.ok(player.position.y-floor>.6);
  run(player,1,{jump:true});assert.equal(player.grounded,true);assert.ok(Math.abs(player.position.y-floor)<1e-8);
  run(player,.3,{jump:true});assert.equal(player.grounded,true,'holding Space cannot bounce repeatedly');
  player.update(1/60,{jump:false});player.update(1/60,{jump:true});assert.equal(player.grounded,false);
  const before=player.position.z;player.update(100,{forward:1});assert.ok(player.position.z-before<.4,'catch-up is bounded after a suspended tab');
  player.dispose();
});

test('unloaded ground, buildings, river banks and world edges stop the player',()=>{
  const house={id:'house',kind:'house',x:0,z:3,y:0,rotation:0,scale:1};
  const player=createWalkingPlayer(new Group(),flat({placements:[house]}));player.enter({x:0,z:0});
  run(player,3,{forward:1,sprint:true});assert.ok(player.position.z<2,'cannot walk through a house');
  player.dispose();
  const locked=createWalkingPlayer(new Group(),flat(),{isReadyAt:(x,z)=>z<1});locked.enter({x:0,z:0});run(locked,2,{forward:1});assert.ok(locked.position.z<1);locked.dispose();
  const river={points:[{x:-60,z:2},{x:60,z:2}],width:2,y:-1.2};
  const shore=createWalkingPlayer(new Group(),flat({river,rivers:[river]}));shore.enter({x:0,z:-2});run(shore,3,{forward:1});assert.ok(shore.position.z<1);shore.dispose();
  const edge=createWalkingPlayer(new Group(),flat());edge.enter({x:0,z:59});run(edge,3,{forward:1});assert.ok(edge.position.z<=60);edge.dispose();
});

test('a real mesh bridge supports walking above water and the camera retracts before a wall',()=>{
  const river={points:[{x:-60,z:2},{x:60,z:2}],width:2,y:-1.2};
  const bridge=new Mesh(new BoxGeometry(2,.16,8),new MeshBasicMaterial());bridge.position.set(0,0,2);bridge.updateMatrixWorld(true);
  const world=flat({river,rivers:[river]}),player=createWalkingPlayer(new Group(),world,{getTerrainMeshes:()=>[bridge]});player.enter({x:0,z:-2});
  run(player,2,{forward:1});assert.ok(player.position.z>2.8,'existing bridge deck crosses the river without invented collision terrain');assert.ok(player.position.y>.1);
  player.dispose();bridge.geometry.dispose();bridge.material.dispose();
  const wall=new Mesh(new BoxGeometry(5,4,.3),new MeshBasicMaterial());wall.position.set(0,1,-2);wall.updateMatrixWorld(true);
  const occluded=createWalkingPlayer(new Group(),flat(),{getTerrainMeshes:()=>[wall]});occluded.enter({x:0,z:0});
  assert.ok(occluded.camera.position.z>-1.8,'the camera remains in front of the wall');
  occluded.dispose();wall.geometry.dispose();wall.material.dispose();
});

test('collision rays select a bounded neighborhood instead of scanning previously visited scenery',()=>{
  const near=new Mesh(new BoxGeometry(4,.1,4),new MeshBasicMaterial());near.position.y=-.1;near.updateMatrixWorld(true);
  const distant=Array.from({length:60},(_,i)=>{
    const mesh=new Mesh(new BoxGeometry(4,4,4),near.material);mesh.position.set(100+i*6,0,100);mesh.updateMatrixWorld(true);
    mesh.raycast=()=>{throw new Error('distant cached scenery must not enter a player raycast');};return mesh;
  });
  const meshes=[near,...distant],player=createWalkingPlayer(new Group(),flat(),{getTerrainMeshes:()=>meshes});player.enter({x:0,z:0});
  assert.equal(player.stats.meshes,1);const selections=player.stats.meshSelections;
  run(player,1,{});assert.equal(player.stats.meshSelections,selections,'idle frames reuse the local mesh list');
  run(player,1,{forward:1});assert.ok(player.stats.meshSelections>selections,'movement refreshes the padded local window');
  player.dispose();for(const mesh of meshes)mesh.geometry.dispose();near.material.dispose();
});

test('the island spawn resolves to real dry land outside buildings and remains close to its town',()=>{
  const world=generateWorld(createIslandWorld()),player=createWalkingPlayer(new Group(),world),town=world.cities[0];
  const spawn=player.prepareSpawn(town);assert.ok(spawn);assert.ok(surfaceDistance(world,spawn,town)<10);
  assert.ok(distanceToRoutes(world,spawn.x,spawn.z)>=WALKING.spawnRailClearance,'the full camera orbit stays clear of the moving railway corridor at spawn');
  assert.equal(worldSurface(world,spawn.x,spawn.z).type,'ground');assert.equal(player.initialized,false);
  assert.equal(player.enter(spawn),true);assert.ok(Math.abs(player.position.y-worldSurface(world,spawn.x,spawn.z).height-.035)<1e-9);
  player.dispose();
});

test('the globe traveller moves in physical units and remains upright at high latitude',()=>{
  const radius=1600,world=flat({surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}});
  const start=surfaceChartCoordinates(world,179.98,75),player=createWalkingPlayer(new Group(),world);player.enter(start,Math.PI/2);
  run(player,2,{forward:1});const distance=surfaceDistance(world,start,player.position);assert.ok(distance>5&&distance<5.4);
  const normal=surfaceNormal(world,player.position.x,player.position.z),art=player.root.getObjectByName('walking-traveller');
  const characterUp=new Vector3(0,1,0).applyQuaternion(art.quaternion);assert.ok(normal.dot(characterUp)>.999999);
  assert.ok(normal.dot(player.camera.up)>.999999);assert.ok(player.camera.position.toArray().every(Number.isFinite));
  player.dispose();
});
