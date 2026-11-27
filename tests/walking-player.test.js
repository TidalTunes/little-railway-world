import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3,BoxGeometry,Group,Mesh,MeshBasicMaterial,Vector3} from 'three';
import {createWalkingPlayer,WALKING} from '../src/walking-player.js';
import {generateWorld,worldSurface,distanceToRoutes} from '../src/world-model.js';
import {person} from '../src/assets.js';
import {SETTLEMENT_MILESTONES} from '../src/settlement-progression.js';
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
  assert.ok(player.root.getObjectByName('traveller-axe'));assert.ok(player.root.getObjectByName('left-leg'));
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

test('the compact figure uses solid limbs and restrained steps that clear the ground',()=>{
  const player=createWalkingPlayer(new Group(),flat());player.enter({x:0,z:0});
  let meshes=0;player.root.traverse(child=>{if(child.isMesh)meshes++;});
  assert.ok(meshes<=20,'the entire figure, tool and contact shadow stay simple');
  assert.equal(player.root.getObjectByName('left-knee'),undefined);
  const boots=[];player.root.traverse(child=>{if(child.name==='boot')boots.push(child);});
  const point=new Vector3();let walkLift=0,runLift=0;
  for(const sprint of [false,true]){
    run(player,.5,{forward:1,sprint});
    for(let frame=0;frame<120;frame++){
      player.update(1/120,{forward:1,sprint});player.root.updateMatrixWorld(true);
      for(const boot of boots){
        let lowest=Infinity;
        for(const x of [-.5,.5])for(const z of [-.5,.5]){
          point.set(x,-.5,z).applyMatrix4(boot.matrixWorld);lowest=Math.min(lowest,point.y);
        }
        assert.ok(lowest>=-1e-8&&lowest<.06,'a short step never sinks or leaps above its supporting ground');
        if(sprint)runLift=Math.max(runLift,lowest);else walkLift=Math.max(walkLift,lowest);
      }
    }
  }
  assert.ok(runLift>walkLift+.015,'running has a slightly bigger step while retaining the same simple style');
  player.dispose();
});

test('walking against an obstacle settles the gait rather than marching through the collision',()=>{
  const world=flat({placements:[{kind:'house',x:0,z:3,y:0,rotation:0,scale:1}]});
  const player=createWalkingPlayer(new Group(),world);player.enter({x:0,z:0});
  run(player,3,{forward:1,sprint:true});
  const rotations=()=>['left-leg','right-leg','left-arm','right-arm'].map(name=>player.root.getObjectByName(name).rotation.x);
  const atRest=rotations();run(player,.5,{forward:1,sprint:true});
  rotations().forEach((angle,i)=>assert.ok(Math.abs(angle-atRest[i])<1e-5,'blocked feet and arms settle to rest'));
  player.dispose();
});

test('axe sweeps horizontally across the body while remaining attached to its hand',()=>{
  const player=createWalkingPlayer(new Group(),flat());player.enter({x:0,z:0});
  const arm=player.root.getObjectByName('right-arm'),axe=player.root.getObjectByName('traveller-axe');
  const handle=player.root.getObjectByName('axe-handle'),blade=player.root.getObjectByName('axe-head');
  assert.equal(axe.parent,arm);assert.equal(handle.parent,axe);assert.equal(blade.parent,axe);
  assert.ok(arm.position.x<0,'a figure facing +Z carries the axe on its anatomical right, -X');
  const original=structuredClone(player.position),grip=axe.position.clone(),attachment=blade.position.clone();
  player.update(1/120,{swing:true});assert.equal(player.swinging,true);
  let rightmost=Infinity,leftmost=-Infinity,highest=-Infinity;const point=new Vector3();
  for(let i=0;i<90;i++){
    player.update(1/120,{swing:true});
    player.root.updateMatrixWorld(true);blade.getWorldPosition(point);
    rightmost=Math.min(rightmost,point.x);leftmost=Math.max(leftmost,point.x);
    highest=Math.max(highest,new Box3().setFromObject(blade,true).max.y);
    assert.ok(axe.position.equals(grip)&&blade.position.equals(attachment),'the axe is a rigid assembly through the whole arc');
  }
  assert.ok(rightmost<-.35&&leftmost>.12,'the axe head crosses from the right to the left of the body');
  assert.ok(highest<.60,'the complete blade stays below the face rather than rising overhead');assert.equal(player.swinging,false);assert.ok(Math.abs(arm.rotation.x)<1e-8);
  assert.deepEqual(player.position,original,'a cosmetic swing does not move the player');
  run(player,1,{swing:true});assert.equal(player.swinging,false,'a held action cannot repeat itself');
  player.update(1/60,{});player.update(1/60,{swing:true});assert.equal(player.swinging,true);
  player.exit();assert.equal(player.swinging,false);player.enter({x:0,z:0});assert.equal(player.swinging,false);
  player.update(1/60,{swing:true});assert.equal(player.swinging,true);
  player.dispose();assert.equal(player.swinging,false);
});

test('the axe cutting edge leads the across-body stroke instead of pointing upward or hitting broadside',()=>{
  const player=createWalkingPlayer(new Group(),flat());player.enter({x:0,z:0});player.update(0,{swing:true});
  const axe=player.root.getObjectByName('traveller-axe'),blade=player.root.getObjectByName('axe-head');
  const previous=new Vector3(),point=new Vector3(),motion=new Vector3(),edge=new Vector3();
  for(let i=1;i<=80;i++){
    player.update(1/240,{});player.root.updateMatrixWorld(true);blade.getWorldPosition(point);
    const swingFraction=(i/240)/.58;
    if(swingFraction>.28&&swingFraction<.56){
      motion.subVectors(point,previous).normalize();edge.set(0,0,1).transformDirection(axe.matrixWorld);
      assert.ok(edge.dot(motion)>.96,'the sharp edge points along the travelling head throughout the cutting stroke');
      assert.ok(Math.abs(edge.y)<.01,'the blade cuts across at waist height');
    }
    previous.copy(point);
  }
  player.dispose();
});

test('swing timing is independent of frame rate and does not block walking or jumping',()=>{
  const make=()=>{const p=createWalkingPlayer(new Group(),flat());p.enter({x:0,z:0});return p;};
  const low=make(),high=make(),moving=make();
  low.update(0,{swing:true});high.update(0,{swing:true});
  run(low,.4,{},30);run(high,.4,{},120);
  for(const axis of ['x','y','z'])assert.ok(Math.abs(low.root.getObjectByName('right-arm').rotation[axis]-high.root.getObjectByName('right-arm').rotation[axis])<1e-10);
  moving.update(1/60,{swing:true,jump:true,forward:1});
  run(moving,.2,{forward:1});assert.equal(moving.grounded,false);assert.ok(moving.position.z>.3);assert.equal(moving.swinging,true);
  [low,high,moving].forEach(p=>p.dispose());
});

test('the traveller shares station passenger scale and proportions, with distinct clothes and tool',()=>{
  const player=createWalkingPlayer(new Group(),flat());player.enter({x:0,z:0});player.root.updateMatrixWorld(true);
  const bounds=new Box3();player.root.getObjectByName('walking-traveller').traverse(mesh=>{
    if(mesh.isMesh&&!mesh.name.startsWith('axe-'))bounds.union(new Box3().setFromObject(mesh,true));
  });
  const passengers=new Group(),waiting=person(passengers,{variant:1});passengers.updateMatrixWorld(true);
  const passengerBounds=new Box3().setFromObject(waiting,true);
  assert.ok(Math.abs(bounds.min.y)<1e-7,'the player stands on the same ground datum');
  assert.ok(Math.abs(bounds.max.y-WALKING.height)<1e-7,'declared player height matches the visible figure');
  assert.ok(Math.abs(bounds.getSize(new Vector3()).y-passengerBounds.getSize(new Vector3()).y)<.01,'cap-to-sole scale matches a waiting passenger');
  const face=player.root.getObjectByName('traveller-face'),coat=player.root.getObjectByName('traveller-coat');
  assert.equal(face.geometry.type,'IcosahedronGeometry');assert.equal(coat.geometry.type,'BoxGeometry');
  assert.ok(Math.abs(coat.scale.x-.24)<1e-9&&Math.abs(face.scale.x-.115)<1e-9,'torso and head share passenger proportions');
  assert.ok(player.root.getObjectByName('cap-brim')&&player.root.getObjectByName('traveller-axe'),'cap and axe retain the player identity');
  player.dispose();
});


test('earned civic buildings use their own rotated body bounds instead of a generic hall',()=>{
  for(const spec of SETTLEMENT_MILESTONES)for(const rotation of [0,.67,Math.PI/2]){
    const building={...spec,id:`civic-${spec.type}`,kind:'civic',buildingType:spec.type,x:0,z:0,y:0,rotation,scale:1};
    const world=flat({placements:[building]}),player=createWalkingPlayer(new Group(),world);
    const c=Math.cos(rotation),s=Math.sin(rotation),edge=spec.collisionOffsetZ-spec.collisionDepth/2;
    try{
      assert.equal(player.enter({x:-s*4,z:-c*4},rotation),true);
      run(player,2,{forward:1,sprint:true});
      const local=player.position.x*s+player.position.z*c;
      assert.ok(local<=edge-WALKING.radius+.015,`${spec.type} stays outside its actual body`);
      assert.ok(local>edge-WALKING.radius-.12,`${spec.type} has no oversized invisible collision wall`);
    }finally{player.dispose();}
  }
});

test('the fountain garden leaves its entrances open while benches and planters remain solid',()=>{
  const spec=SETTLEMENT_MILESTONES.find(item=>item.type==='plaza');
  for(const rotation of [0,.67]){
    const c=Math.cos(rotation),s=Math.sin(rotation),point=(x,z)=>({x:x*c+z*s,z:-x*s+z*c});
    const building={...spec,id:'civic-plaza',kind:'civic',buildingType:'plaza',x:0,z:0,y:0,rotation,scale:1};
    const player=createWalkingPlayer(new Group(),flat({placements:[building]}));
    try{
      const entrance=point(0,-2);assert.equal(player.enter(entrance,rotation),true);
      assert.ok(Math.hypot(player.position.x-entrance.x,player.position.z-entrance.z)<.01,'the plaza path is walkable');
      run(player,.15,{forward:1});
      assert.ok(player.position.x*s+player.position.z*c>-1.8,'the player can advance along the path');
    }finally{player.dispose();}
    const sidePlayer=createWalkingPlayer(new Group(),flat({placements:[building]}));
    try{
      sidePlayer.enter(point(3.5,0),rotation-Math.PI/2);run(sidePlayer,1,{forward:1,sprint:true});
      const localX=sidePlayer.position.x*c-sidePlayer.position.z*s;
      assert.ok(localX>=1.71+WALKING.radius-.015&&localX<1.71+WALKING.radius+.12,'the side bench blocks the traveller before the fountain');
    }finally{sidePlayer.dispose();}
  }
});
