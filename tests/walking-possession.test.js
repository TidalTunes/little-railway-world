import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3} from 'three';
import {createWalkingPlayer,WALKING} from '../src/walking-player.js';
import {surfaceChartCoordinates,surfaceNormal,surfacePoint,surfaceOffset} from '../src/world-surface.js';

const flat={outline:[[-60,-60],[60,-60],[60,60],[-60,60]],mountains:[],cities:[],stations:[],placements:[],lines:[],river:{points:[],width:0,y:-1.2},rivers:[]};
const globe={...flat,surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
const angleDifference=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
function fixture(t,world=flat){const player=createWalkingPlayer(new Group(),world);t.after(()=>player.dispose());return player;}

test('possession immediately replaces the camera focus and framing without moving either body',t=>{
  const player=fixture(t),infantry={id:'infantry',kind:'soldier',x:0,y:0,z:0,heading:.4},tank={id:'tank',kind:'tank',x:20,y:1,z:-15,heading:-1.2};
  const originals=structuredClone([infantry,tank]);assert.equal(player.followUnit(infantry,0),true);
  assert.equal(player.initialized,true);assert.equal(player.active,true);assert.equal(player.root.visible,false);assert.equal(player.kind,'soldier');
  assert.ok(player.cameraTarget.distanceTo(new Vector3(0,WALKING.cameraHeight,0))<1e-9);
  player.followUnit(tank,0);assert.equal(player.kind,'tank');assert.deepEqual(player.position,{x:20,y:1,z:-15});
  assert.ok(player.cameraTarget.distanceTo(new Vector3(20,2,-15))<1e-9);assert.ok(Math.abs(player.camera.position.distanceTo(player.cameraTarget)-6)<1e-9);
  const direction=player.camera.getWorldDirection(new Vector3()),expected=player.cameraTarget.clone().sub(player.camera.position).normalize();assert.ok(direction.dot(expected)>.999999);
  assert.ok(Math.abs(angleDifference(player.heading,tank.heading))<1e-9);assert.deepEqual([infantry,tank],originals);
});

test('repeated follow frames retain cursor aim while the controlled chassis turns independently',t=>{
  const player=fixture(t),tank={id:'tank',kind:'tank',x:0,y:0,z:0,heading:.3};player.followUnit(tank,0);
  player.followUnit(tank,1/60,{lookX:.7,lookY:.15});const heading=player.heading,pitch=player.pitch;
  tank.heading=-2;player.followUnit(tank,1/60);assert.ok(Math.abs(angleDifference(player.heading,heading))<1e-9);assert.equal(player.pitch,pitch);assert.equal(player.facingHeading,-2);
  const camera=player.camera.position.clone(),target=player.cameraTarget.clone();
  for(let i=0;i<30;i++)player.followUnit(tank,0);
  assert.ok(player.camera.position.distanceTo(camera)<1e-9&&player.cameraTarget.distanceTo(target)<1e-9,'render refreshes do not accumulate orbit or zoom drift');
  const saved=player.exit();assert.equal(player.active,false);assert.deepEqual(saved,player.position);player.followUnit(tank,0);assert.equal(player.active,true);assert.equal(player.heading,heading);
});

test('globe possession follows high-latitude seam motion with radial up and fixed helicopter framing',t=>{
  const player=fixture(t,globe),start=surfaceChartCoordinates(globe,179.999,78),heli={id:'heli',kind:'helicopter',...start,y:5,heading:Math.PI/2};
  player.followUnit(heli,0);let previous=player.camera.position.clone();
  for(let i=0;i<16;i++){
    Object.assign(heli,surfaceOffset(globe,heli.x,heli.z,.4,0));player.followUnit(heli,1/60);
    assert.ok(player.camera.position.distanceTo(previous)<.6,'crossing the chart seam cannot fling the camera around the globe');previous.copy(player.camera.position);
    const up=surfaceNormal(globe,heli.x,heli.z),target=surfacePoint(globe,heli.x,heli.y+1,heli.z);
    assert.ok(up.dot(player.camera.up)>.999999);assert.ok(player.cameraTarget.distanceTo(target)<1e-8);assert.ok(Math.abs(player.camera.position.distanceTo(target)-8)<1e-8);
  }
  assert.ok(heli.x<0,'the path actually crosses the longitude seam');
  const other={id:'ground',kind:'soldier',...surfaceChartCoordinates(globe,-66,-55),y:0,heading:-.6};player.followUnit(other,0);
  assert.ok(player.cameraTarget.distanceTo(surfacePoint(globe,other.x,WALKING.cameraHeight,other.z))<1e-8);
  assert.ok(surfaceNormal(globe,other.x,other.z).dot(player.camera.up)>.999999);assert.ok(player.camera.position.toArray().every(Number.isFinite));
});
