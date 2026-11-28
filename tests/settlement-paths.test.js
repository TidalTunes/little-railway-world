import test from 'node:test';
import assert from 'node:assert/strict';
import {planSettlementPath,planSettlementPathSteps,sampleSettlementPath,settlementDoor,houseBlocksSettlementPath,SETTLEMENT_PATH} from '../src/settlement-paths.js';

const flat=()=>({type:'ground',height:0});
const home=(id,x,z,rotation=0)=>({id,kind:'house',x,z,y:0,rotation,scale:1});
const route=(from,to,options={})=>planSettlementPath({},from,to,{surfaceAt:flat,...options});

function distanceToSegment(point,a,b){
  const x=b.x-a.x,z=b.z-a.z,length=x*x+z*z;
  const t=Math.max(0,Math.min(1,((point.x-a.x)*x+(point.z-a.z)*z)/length));
  return Math.hypot(point.x-a.x-x*t,point.z-a.z-z*t);
}

test('clear neighbouring homes share a direct frontage path with flush door endpoints',()=>{
  const from=home('a',0,0),to=home('b',5,0),path=route(from,to);
  assert.ok(path);assert.equal(path.width,.45);assert.equal(path.points.length,4);
  assert.deepEqual(path.points[0],{...settlementDoor({},from),y:.015});
  assert.deepEqual(path.points.at(-1),{...settlementDoor({},to),y:.015});
  assert.equal(path.fromHouseId,'a');assert.equal(path.toHouseId,'b');
  assert.deepEqual(route(from,to),path,'route choices are deterministic');
});

test('a lane bends cleanly around the full tree crown instead of clipping it',()=>{
  const tree={id:'tree',kind:'tree',x:2.5,z:1.52,radius:.85};
  const path=route(home('a',0,0),home('b',5,0),{placements:[tree]});
  assert.ok(path);assert.ok(path.points.length<=8,'grid search is simplified into a few straight runs');
  for(let i=1;i<path.points.length;i++)
    assert.ok(distanceToSegment(tree,path.points[i-1],path.points[i])>=tree.radius+path.width/2+SETTLEMENT_PATH.clearance-.002);
  const cleared=route(home('a',0,0),home('b',5,0),{placements:[tree],removedTreeIds:new Set(['tree'])});
  assert.equal(cleared.points.length,4,'felled trees immediately release lane space');
});

test('back-to-front plots route around the neighbouring home, never through its foundation',()=>{
  const from=home('a',0,-5),to=home('b',0,0),path=route(from,to);
  assert.ok(path);assert.ok(path.points.some(point=>Math.abs(point.x)>1.3));
  // Ignore each doorstep's intentional short contact with its own foundation.
  const main={...path,points:path.points.slice(1,-1)};
  assert.equal(houseBlocksSettlementPath({},from,main,0),false);
  assert.equal(houseBlocksSettlementPath({},to,main,0),false);
  assert.equal(houseBlocksSettlementPath({},home('c',3,3),path),false);
});

test('water and abrupt slopes are checked across the entire lane width and length',()=>{
  const from=home('a',0,0),to=home('b',5,0);
  assert.equal(route(from,to,{surfaceAt:x=>({type:x>2&&x<3?'water':'ground',height:0})}),null);
  assert.equal(route(from,to,{surfaceAt:x=>({type:'ground',height:x>2&&x<3?3:0})}),null);
  const pond=(x,z)=>({type:Math.hypot(x-2.5,z-1.52)<.8?'water':'ground',height:0});
  const path=route(from,to,{surfaceAt:pond});assert.ok(path);
  assert.equal(sampleSettlementPath(path.points,point=>Math.hypot(point.x-2.5,point.z-1.52)>=.8+path.width/2-.03),true);
});

test('small whole-route sampling checks gaps between waypoints',()=>{
  const points=[{x:0,z:0},{x:5,z:0}];let samples=0;
  assert.equal(sampleSettlementPath(points,point=>{samples++;return point.x<2||point.x>3;}),false);
  assert.ok(samples>2);
});


test('civic routes respect wide rectangular envelopes and use each building’s actual entrance',()=>{
  const hall={id:'hall',kind:'civic',buildingType:'hall',x:0,z:0,rotation:Math.PI/2,width:3.9,depth:3.9,doorOffset:1.9};
  const connection=route(hall,home('destination',6,0,Math.PI));assert.ok(connection);
  assert.ok(Math.abs(connection.points[0].x-1.9)<1e-9);assert.ok(Math.abs(connection.points[0].z)<1e-9);
  const market={id:'market',kind:'civic',buildingType:'market',x:0,z:2.5,rotation:0,width:3.4,depth:2.6,doorOffset:1.12};
  const path=route(home('left',-5,1),home('right',5,1),{placements:[market]});assert.ok(path);
  assert.equal(houseBlocksSettlementPath({},market,path,0),false);
  const through={width:.45,points:[{x:-3,z:2.5},{x:3,z:2.5}]};
  assert.equal(houseBlocksSettlementPath({},market,through),true);
});


test('incremental route planning yields during blocked searches and returns the identical collision-safe path',()=>{
  const from=home('a',0,0),to=home('b',12,0),obstacle={id:'grove',kind:'rock',x:6,z:1.52,radius:2.4};
  let samples=0,largestSlice=0,slices=0,last=0;
  const options={placements:[obstacle],surfaceAt:()=>{samples++;return flat();},nodeBudget:2};
  const search=planSettlementPathSteps({},from,to,options);let result;
  do{result=search.next();largestSlice=Math.max(largestSlice,samples-last);last=samples;slices++;}while(!result.done);
  assert.ok(result.value);assert.ok(slices>5,'an obstacle search is spread across updates');
  assert.ok(largestSlice<samples/2,'no one update performs the whole search');
  assert.deepEqual(result.value,planSettlementPath({},from,to,{...options,surfaceAt:flat}));
});

test('distant immutable paths cache their bounds instead of resampling across every house candidate',()=>{
  let reads=0;const points=Array.from({length:50},(_,i)=>({get x(){reads++;return i;},get z(){reads++;return 0;}})),path={width:.45,points};
  assert.equal(houseBlocksSettlementPath({},home('far',100,100),path),false);const indexedReads=reads;
  for(let i=0;i<100;i++)assert.equal(houseBlocksSettlementPath({},home(`far-${i}`,100+i,100),path),false);
  assert.equal(reads,indexedReads,'the distant path is rejected from cached bounds');
  assert.equal(houseBlocksSettlementPath({},home('near',25,0),path),true,'the broad phase preserves exact local collisions');
});
