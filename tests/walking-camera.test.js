import test from 'node:test';
import assert from 'node:assert/strict';
import {BoxGeometry,Group,Mesh,MeshBasicMaterial,Vector3} from 'three';
import {createWalkingPlayer,WALKING} from '../src/walking-player.js';
import {buildRailways} from '../src/railway.js';
import {surfaceChartCoordinates,surfaceDistance,surfacePoint} from '../src/world-surface.js';

function flat(overrides={}){
  return{outline:[[-600,-600],[600,-600],[600,600],[-600,600]],mountains:[],cities:[],stations:[],placements:[],lines:[],
    river:{points:[],width:0,y:-1.2},rivers:[],...overrides};
}

test('steady running has no render-step stalls or world pitch jitter at mismatched refresh rates',()=>{
  for(const dts of [[1/60],[1/90],[1/144],[1/144,1/72,1/110,1/95,1/65,1/150]]){
    const player=createWalkingPlayer(new Group(),flat());player.enter({x:0,z:0});
    const direction=new Vector3(),initialDirection=player.camera.getWorldDirection(new Vector3());
    let time=0,frame=0,lastZ=player.camera.position.z;
    while(time<4){
      const dt=dts[frame++%dts.length];player.update(dt,{forward:1,sprint:true});time+=dt;
      if(time>2){
        assert.ok(Math.abs((player.camera.position.z-lastZ)/dt-WALKING.sprintSpeed)<1e-8,
          'camera translation remains continuous even on a frame with no physics step');
        player.camera.getWorldDirection(direction);
        assert.ok(direction.distanceTo(initialDirection)<1e-10,'unmodified orbit must keep the entire world at a constant pitch');
        assert.ok(player.position.z-player.renderPosition.z>=-1e-8&&player.position.z-player.renderPosition.z<=WALKING.sprintSpeed/120+1e-8,
          'render interpolation stays within one physical tick and never predicts through obstacles');
        const art=player.root.getObjectByName('walking-traveller');
        assert.ok(Math.abs(art.position.z-player.renderPosition.z)<1e-10,'the visible character and camera use the same interpolated position');
      }
      lastZ=player.camera.position.z;
    }
    player.dispose();
  }
});

test('continuous railway support removes sleeper bobbing without pitching the camera',()=>{
  const world=flat(),railway=new Group(),line={points:[
    {x:0,y:.42,z:-20,tangent:{x:0,z:1},angle:0},{x:0,y:.42,z:20,tangent:{x:0,z:1},angle:0}],
    distances:[0,40],length:40,bridges:[],tunnels:[]};
  buildRailways(railway,{...world,lines:[line]});railway.updateMatrixWorld(true);
  const meshes=[];railway.traverse(mesh=>{if(mesh.isMesh)meshes.push(mesh);});
  let lines=[];const player=createWalkingPlayer(new Group(),world,{getTerrainMeshes:()=>meshes,getCollisionLines:()=>lines});
  player.enter({x:-3,z:-10},Math.PI/2);lines=[line];
  for(let frame=0;frame<65;frame++)player.update(1/60,{forward:1});
  player.update(0,{lookX:-Math.PI/2});
  const direction=new Vector3(),initialDirection=player.camera.getWorldDirection(new Vector3());
  let lastHeight=player.position.y,lastCameraHeight=player.camera.position.y,maxPhysicalStep=0,maxCameraStep=0;
  for(let frame=0;frame<240;frame++){
    player.update(1/60,{forward:1,sprint:true});
    if(frame>60){
      maxPhysicalStep=Math.max(maxPhysicalStep,Math.abs(player.position.y-lastHeight));
      maxCameraStep=Math.max(maxCameraStep,Math.abs(player.camera.position.y-lastCameraHeight));
      player.camera.getWorldDirection(direction);
      assert.ok(direction.distanceTo(initialDirection)<1e-10,'stepping on sleepers never tilts the world');
    }
    lastHeight=player.position.y;lastCameraHeight=player.camera.position.y;
  }
  assert.ok(Math.abs(player.position.y-.455)<1e-8,'feet rest on the rail-height envelope');
  assert.ok(maxPhysicalStep<1e-8,'sleepers never enter the movement support queries');
  assert.ok(maxCameraStep<.025,'the camera absorbs short steps instead of snapping vertically with the feet');
  player.dispose();for(const geometry of new Set(meshes.map(mesh=>mesh.geometry)))geometry.dispose();
});

test('camera collision retracts immediately and recovers smoothly without changing orbit angle',()=>{
  const wall=new Mesh(new BoxGeometry(5,4,.3),new MeshBasicMaterial());wall.position.set(0,1,-1.3);wall.updateMatrixWorld(true);
  let meshes=[];
  const player=createWalkingPlayer(new Group(),flat(),{getTerrainMeshes:()=>meshes});player.enter({x:0,z:0});
  const initialDirection=player.camera.getWorldDirection(new Vector3()),direction=new Vector3();
  assert.ok(Math.abs(player.camera.position.distanceTo(player.cameraTarget)-WALKING.cameraDistance)<1e-10);
  meshes=[wall];player.update(1/144);
  const retracted=player.camera.position.distanceTo(player.cameraTarget);
  assert.ok(player.camera.position.z>-1.15,'the first obstructed frame keeps the camera in front of the wall');
  assert.ok(retracted<1.3,'collision never waits for damping');
  meshes=[];player.update(1/144);
  const recovering=player.camera.position.distanceTo(player.cameraTarget);
  assert.ok(recovering>retracted&&recovering<WALKING.cameraDistance-.5,'clearing an obstruction cannot snap outward');
  for(let frame=0;frame<144;frame++){
    player.update(1/144);player.camera.getWorldDirection(direction);
    assert.ok(direction.distanceTo(initialDirection)<1e-10,'retraction changes distance, never the viewing angle');
  }
  assert.ok(Math.abs(player.camera.position.distanceTo(player.cameraTarget)-WALKING.cameraDistance)<1e-6);
  player.dispose();wall.geometry.dispose();wall.material.dispose();
});

test('visual interpolation stays local while running across the globe date line',()=>{
  const radius=1600,world=flat({surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}});
  const player=createWalkingPlayer(new Group(),world),start=surfaceChartCoordinates(world,179.9,75);
  player.enter(start,Math.PI/2);
  let previous={...player.renderPosition},crossed=false;
  for(let frame=0;frame<432;frame++){
    player.update(1/144,{forward:1,sprint:true});
    if(previous.x>0&&player.renderPosition.x<0)crossed=true;
    const step=surfaceDistance(world,previous,player.renderPosition);
    assert.ok(step<WALKING.sprintSpeed/144+1e-6,'the rendered position never takes a long chart-coordinate path through the globe');
    if(frame>144)assert.ok(Math.abs(step-WALKING.sprintSpeed/144)<1e-6,'high-latitude motion stays smooth through the seam');
    const worldPosition=surfacePoint(world,player.renderPosition.x,player.renderPosition.y,player.renderPosition.z);
    assert.ok(player.camera.position.distanceTo(worldPosition)<4,'camera stays beside the person at the seam');
    previous={...player.renderPosition};
  }
  assert.equal(crossed,true,'the regression actually crosses the longitude seam');player.dispose();
});
