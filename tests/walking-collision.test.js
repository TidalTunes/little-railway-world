import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,BoxGeometry,Mesh,MeshBasicMaterial,Vector3} from 'three';
import {createWalkingPlayer,WALKING} from '../src/walking-player.js';
import {walkingPlacementShapes,walkingTrainShapes,walkingContact,walkingSlabHeight,walkingRailSegments,walkingRailHeight,walkingRayDistance} from '../src/walking-collision.js';
import {polylineTree} from '../src/spatial-index.js';
import {surfaceChartCoordinates} from '../src/world-surface.js';

const flat=(extra={})=>({outline:[[-60,-60],[60,-60],[60,60],[-60,60]],mountains:[],cities:[],stations:[],placements:[],lines:[],river:{points:[],width:0,y:-1.2},rivers:[],...extra});
const run=(player,seconds,input={})=>{for(let i=0;i<seconds*120;i++)player.update(1/120,input);};
const contact=(world,bodies,point,y=.035)=>walkingContact(world,bodies,point,y,WALKING.radius,WALKING.height,{});

test('station platforms are a single support plane and their buildings remain solid in any orientation',()=>{
  for(const rotation of [0,.67,Math.PI/2]){
    const world=flat(),station={kind:'station',x:7,y:0,z:3,rotation},bodies=walkingPlacementShapes(world,station);
    const point=(x,z)=>({x:7+x*Math.cos(rotation)+z*Math.sin(rotation),z:3-x*Math.sin(rotation)+z*Math.cos(rotation)});
    assert.equal(walkingSlabHeight(world,bodies,point(1,.85),.035,WALKING.stepHeight),.2);
    assert.equal(contact(world,bodies,point(1,.85),.235),null,'passengers can use the open platform');
    assert.ok(contact(world,bodies,point(-1.45,-.42),.235),'the waiting-room body is solid');
    assert.ok(contact(world,bodies,point(1.42,-.56),.235),'the bench has a single body');
    assert.equal(walkingSlabHeight(world,bodies,point(4,0),.035,WALKING.stepHeight),null);
  }
});

test('authored and earned fountains use the same round basin and leave the four paths open',()=>{
  const world=flat();
  for(const kind of ['plaza','civic'])for(const variant of [0,1,2]){
    const bodies=walkingPlacementShapes(world,{kind,...(kind==='civic'?{buildingType:'plaza'}:{}),variant,x:0,y:0,z:0});
    assert.equal(walkingSlabHeight(world,bodies,{x:0,z:-2},.035,.32),.18);
    assert.equal(contact(world,bodies,{x:0,z:-1.4},.215),null);
    assert.ok(contact(world,bodies,{x:0,z:-.95},.215));
    assert.equal(contact(world,bodies,{x:.8,z:.8},.215),null,'a round basin does not have invisible square corners');
    assert.equal(contact(world,bodies,{x:0,z:0},1),null,'body queries honor vertical clearance');
  }
});

test('sliding follows a rotated building wall instead of the world coordinate axes',()=>{
  const rotation=Math.PI/4,house={kind:'house',x:0,y:0,z:0,rotation};
  const world=flat({placements:[house]}),player=createWalkingPlayer(new Group(),world);
  player.enter({x:-2,z:-.1},Math.PI/2);
  const bodies=walkingPlacementShapes(world,house);let slideFrames=0;
  for(let frame=0;frame<180;frame++){
    const before={...player.position};player.update(1/120,{forward:1});
    assert.equal(contact(world,bodies,player.position,player.position.y),null,'the capsule remains outside the body');
    if(player.position.z<before.z-1e-4)slideFrames++;
  }
  assert.ok(slideFrames>15,'forward pressure slides along the oblique wall');
  assert.ok(player.position.x>-.9&&player.position.z<-.75);player.dispose();
});

test('decorative prop meshes never support the feet or intercept torso/camera rays',()=>{
  const decoration=new Mesh(new BoxGeometry(20,.3,20),new MeshBasicMaterial());decoration.position.y=.25;
  decoration.material.userData.sceneStyle='asset';decoration.updateMatrixWorld(true);
  decoration.raycast=()=>{throw new Error('prop triangles must not participate in walking queries');};
  const station={kind:'station',x:0,y:0,z:0};
  const player=createWalkingPlayer(new Group(),flat({placements:[station]}),{getTerrainMeshes:()=>[decoration]});
  assert.ok(player.enter({x:1,z:.8}));run(player,.1);
  assert.ok(Math.abs(player.position.y-.235)<1e-8);assert.equal(player.stats.meshes,0);
  player.dispose();decoration.geometry.dispose();decoration.material.dispose();
});

test('a moving train displaces an idle walker sideways, blocks walking, and disappears when inactive',()=>{
  const world=flat();let trains=[];
  const player=createWalkingPlayer(new Group(),world,{getCollisionTrains:()=>trains});player.enter({x:0,z:0});
  trains=[{id:'train',active:true,carPoses:[{x:0,y:.42,z:0,angle:0},{x:0,y:.42,z:-2.42,angle:0}]}];
  player.update(1/60);
  assert.ok(Math.abs(player.position.x)>=.76,'the simple car envelope pushes the person clear');
  assert.equal(contact(world,walkingTrainShapes(world,trains,player.position),player.position),null);
  run(player,1,{right:1});assert.ok(player.position.x>=.76-.005,'the player cannot walk through a carriage');
  trains[0].active=false;run(player,.4,{right:1});assert.ok(player.position.x<.1,'queued/removed trains leave no ghost collision');
  assert.equal(player.stats.trainBodies,0);player.dispose();
});

test('train body and camera queries use carriage orientation and exclude distant/queued cars',()=>{
  const world=flat(),trains=[{active:true,carPoses:[{x:0,y:.42,z:0,angle:Math.PI/2},{x:100,y:.42,z:0,angle:0}]},{active:false,carPoses:[{x:2,y:.42,z:0,angle:0}]}];
  const bodies=walkingTrainShapes(world,trains,{x:0,z:0});assert.equal(bodies.length,1);
  assert.ok(contact(world,bodies,{x:.9,z:0}));assert.equal(contact(world,bodies,{x:0,z:.9}),null);
  const distance=walkingRayDistance(bodies,new Vector3(0,.8,-3),new Vector3(0,0,1),5);
  assert.ok(Math.abs(distance-2.41)<1e-9,'the camera uses the same carriage body');
});

test('rails support bridges and tunnel floors at one stable height, with a low shoulder to step onto',()=>{
  const world=flat(),segments=[{a:{x:0,y:.42,z:-20},b:{x:0,y:.42,z:20}}];
  for(const z of [-10,-9.7,-9.15,0,11])assert.equal(walkingRailHeight(world,segments,{x:0,z},.455,.32),.42);
  const shoulder=walkingRailHeight(world,segments,{x:1,z:0},.035,.32);assert.ok(shoulder>.2&&shoulder<.32);
  assert.equal(walkingRailHeight(world,segments,{x:0,z:0},5,.32),null,'walking over a mountain cannot snap down to its tunnel');
  assert.equal(walkingRailHeight(world,segments,{x:2,z:0},.035,.32),null);
  const river={points:[{x:-60,z:0},{x:60,z:0}],width:4,y:-1.2},bridgeWorld=flat({river,rivers:[river]});
  let lines=[];const player=createWalkingPlayer(new Group(),bridgeWorld,{getCollisionLines:()=>lines});
  player.enter({x:1,z:-6});lines=[{points:[segments[0].a,segments[0].b]}];run(player,4,{forward:1});
  assert.ok(player.position.z>4,'a real route supplies continuous support across the river without sleeper meshes');
  assert.ok(player.position.y>.23&&player.position.y<.36);player.dispose();
});

test('a carriage pushes toward its clear flank when a building blocks the nearest escape',()=>{
  const house={kind:'house',x:1.8,y:0,z:0,rotation:0},world=flat({placements:[house]});let trains=[];
  const player=createWalkingPlayer(new Group(),world,{getCollisionTrains:()=>trains});player.enter({x:0,z:0});
  trains=[{active:true,carPoses:[{x:0,y:.42,z:0,angle:0}]}];player.update(1/60);
  assert.ok(player.position.x<-.76,'the opposite side is used rather than leaving the player inside the train');
  assert.equal(contact(world,walkingPlacementShapes(world,house),player.position),null);player.dispose();
});

test('a jump onto a fountain lands on its simple basin top instead of falling through the prop',()=>{
  const world=flat({placements:[{kind:'plaza',x:0,y:0,z:0}]}),player=createWalkingPlayer(new Group(),world);
  player.enter({x:0,z:-1.2});player.update(1/120,{jump:true});
  run(player,.35,{forward:1});run(player,1,{});
  assert.ok(Math.abs(player.position.z)<.86);assert.equal(player.grounded,true);
  assert.ok(Math.abs(player.position.y-.855)<1e-8,'the clean top supports the landing');
  player.dispose();
});

test('globe rail queries clip before tangent projection and retain elevated support heights',()=>{
  const radius=1600,world=flat({surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}});
  const a={...surfaceChartCoordinates(world,-179.9,0),y:.7},b={...surfaceChartCoordinates(world,179.9,0),y:.7};
  const seam=surfaceChartCoordinates(world,180,0),tree=polylineTree([{points:[a,b]}]);
  const near=walkingRailSegments(world,tree,seam);assert.equal(near.length,2);
  assert.equal(walkingRailHeight(world,near,seam,.735,.32),null,'a long route through Greenwich does not cross the date line');
  const center=surfaceChartCoordinates(world,0,0),middle=walkingRailSegments(world,tree,center);
  assert.equal(walkingRailHeight(world,middle,center,.735,.32),.7,'clipping does not reset an elevated route to the default rail height');
});

test('tree crowns obstruct only the camera while movement and foot support keep the slim trunk',()=>{
  const world=flat();
  for(const variant of [0,3,6,7,8])for(const scale of [.7,1,1.4]){
    const bodies=walkingPlacementShapes(world,{kind:'tree',x:0,y:0,z:0,variant,scale});
    assert.equal(bodies.length,2);
    const crown=bodies.find(body=>body.cameraOnly);assert.ok(crown);
    const x=.42*scale,y=(crown.bottom+crown.top)/2;
    const ray=walkingRayDistance(bodies,new Vector3(x,y,-3),new Vector3(0,0,1),6);
    assert.ok(ray<3,'the camera ray is stopped by the canopy away from the trunk');
    assert.equal(walkingContact(world,bodies,{x:.55*scale,z:0},y,.17,.75),null,'foliage does not become an invisible movement wall');
    assert.equal(walkingSlabHeight(world,[crown],{x:0,z:0},crown.top+.2,.32),null,'camera-only foliage cannot support a landing');
  }
});

test('the walking camera retracts before entering a tree crown beside the trunk',()=>{
  const tree={kind:'tree',x:.58,y:0,z:-2,variant:3},player=createWalkingPlayer(new Group(),flat({placements:[tree]}));
  player.enter({x:0,z:0});
  assert.ok(player.camera.position.distanceTo(player.cameraTarget)<1.1,'camera stops before the leaf envelope');
  assert.ok(player.camera.position.z>-1.16,'camera remains in front of the crown');
  assert.ok(Math.abs(player.position.x)<1e-8&&Math.abs(player.position.z)<1e-8,'the narrow trunk leaves the original spawn walkable');
  player.dispose();
});
