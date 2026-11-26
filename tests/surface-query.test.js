import test from 'node:test';
import assert from 'node:assert/strict';
import {surfaceQueryBoxes,surfaceQuerySegments} from '../src/surface-query.js';
import {BoundsTree,SpatialGrid,pointsBox,pointBox} from '../src/spatial-index.js';
import {placementLineDistance,validateWorld} from '../src/world-model.js';
import {normalizePlayers} from '../src/development.js';

const radius=1600,half=Math.PI*radius,period=half*2;
const world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
  projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
const close=(a,b,tolerance=1e-5)=>assert.ok(Math.abs(a-b)<tolerance,`${a} differs from ${b}`);

test('periodic query boxes preserve ordinary charts and cover either longitude seam',()=>{
  assert.deepEqual(surfaceQueryBoxes({},4,5,2),[pointBox(4,5,2)]);
  assert.deepEqual(surfaceQueryBoxes(world,4,5,2),[pointBox(4,5,2)]);
  const east=surfaceQueryBoxes(world,half-2,5,3),west=surfaceQueryBoxes(world,-half+2,5,3);
  assert.equal(east.length,2);assert.equal(west.length,2);
  close(east[1].minX,east[0].minX-period);close(west[1].maxX,west[0].maxX+period);
  const unwrapped=surfaceQueryBoxes(world,half*3-2,5,3);
  assert.equal(unwrapped.length,east.length);
  for(let i=0;i<east.length;i++)for(const axis of ['minX','minZ','maxX','maxZ'])close(unwrapped[i][axis],east[i][axis]);
  const broad=surfaceQueryBoxes(world,0,5,half+20);
  assert.equal(broad.length,1);assert.equal(broad[0].minX,-half);assert.equal(broad[0].maxX,half);
});

test('a reservation crossing the date line is found by a small query that does not cross it',()=>{
  const grid=new SpatialGrid(),large={id:'large',x:half-2,z:0,radius:8};
  for(const box of surfaceQueryBoxes(world,large.x,large.z,large.radius))grid.insert(large,box);
  const boxes=surfaceQueryBoxes(world,-half+4,0,1);
  assert.equal(boxes.length,1,'the query itself stays away from the seam');
  assert.deepEqual(boxes.flatMap(box=>grid.query(box)),[large],'the wrapped reservation supplies the broad-phase hit');
});

test('bounded line clearance finds opposite-seam railways at low and high latitude',()=>{
  for(const latitude of [0,60,84]){
    const z=-radius*latitude*Math.PI/180,scale=Math.cos(latitude*Math.PI/180);
    const line={points:[{x:-half+2/scale,z:z-5},{x:-half+2/scale,z:z+5}]};
    close(placementLineDistance(world,line,half-1/scale,z,4),3,2e-4);
    assert.equal(placementLineDistance(world,line,half-1/scale,z,2),2,'a bounded miss returns its limit');
  }
});

test('periodic line clipping preserves an authored long route instead of inventing a short seam connection',()=>{
  const a=Object.freeze({x:-half+20,z:0}),b=Object.freeze({x:half-20,z:0});
  const segment=Object.freeze({a,b}),line={points:Object.freeze([a,b])};
  const tree=new BoundsTree([segment],item=>pointsBox([item.a,item.b]));
  assert.deepEqual(surfaceQuerySegments(world,tree,half-1,0,10),[],'the authored line ends before either seam neighborhood');
  assert.equal(placementLineDistance(world,line,half-1,0,10),10);
  close(placementLineDistance(world,line,half-1,0,30),19);
  close(placementLineDistance(world,line,half-1,0),19);
  close(placementLineDistance(world,line,0,0,10),0);
  assert.equal(a.x,-half+20);assert.equal(b.x,half-20,'query clipping never rewrites immutable route points');
});

test('asset and station validation catches opposite-seam railway intersections',()=>{
  const players=normalizePlayers(),line={id:'seam-rail',ownerId:players[0].id,length:10,
    points:[{x:-half+2,y:.42,z:-5},{x:-half+2,y:.42,z:5}],bridges:[],tunnels:[],cuts:[]};
  const model={...world,players,cities:[],cityStreets:[],lines:[line],mountains:[],rivers:[],
    river:{points:[],width:0},outline:[[-half-30,-100],[half+30,-100],[half+30,100],[-half-30,100]],
    placements:[{id:'seam-house',x:half-1,z:2,radius:2}],
    stations:[{id:'seam-platform',x:half-1,z:0,radius:4,rotation:0,platform:{width:2.4,length:6.4}}]};
  const violations=validateWorld(model);
  assert.ok(violations.some(v=>v.type==='asset-track'&&v.id==='seam-house'),'route broad phase spans the seam');
  assert.ok(violations.some(v=>v.type==='station-track'&&v.id==='seam-platform'),'station outer bounds and rectangle test both span the seam');
  const distant={...line,points:[{x:-half+20,y:.42,z:0},{x:half-20,y:.42,z:0}],length:period-40};
  const clear=validateWorld({...model,lines:[distant]});
  assert.ok(!clear.some(v=>v.type==='asset-track'||v.type==='station-track'),'a long authored route cannot create phantom seam collisions');
});
