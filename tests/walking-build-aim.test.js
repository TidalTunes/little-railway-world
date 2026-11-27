import test from 'node:test';
import assert from 'node:assert/strict';
import {walkingBuildAim} from '../src/walking-build-aim.js';
import {surfaceChartCoordinates,surfaceDistance,surfaceDisplacement} from '../src/world-surface.js';

const near=(actual,expected,tolerance=1e-9)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} ≠ ${expected}`);
const position={x:12,y:3,z:-8};
const aim=(pitch,heading=0,options)=>walkingBuildAim({}, {position,heading,pitch},options);
const reach=point=>Math.hypot(point.x-position.x,point.z-position.z);

test('default aim is 3.8 units ahead of the character along the camera heading',()=>{
  for(const heading of [0,Math.PI/2,Math.PI,-Math.PI/2,.73,Math.PI*6+.73]){
    const point=aim(Math.PI/10,heading);
    near(point.x,position.x+Math.sin(heading)*3.8);
    near(point.z,position.z+Math.cos(heading)*3.8);
    assert.deepEqual(Object.keys(point).sort(),['x','z']);
  }
  assert.deepEqual(position,{x:12,y:3,z:-8},'aiming cannot mutate player state');
});

test('looking up extends aim and looking down brings it closer without exceeding reach',()=>{
  near(reach(aim(Math.PI/18)),7);
  near(reach(aim(Math.PI*65/180)),2.2);
  assert.ok(reach(aim(.25))>reach(aim(Math.PI/10)));
  assert.ok(reach(aim(.4))<reach(aim(Math.PI/10)));
  let previous=Infinity;
  for(let i=0;i<=2000;i++){
    const distance=reach(aim(-Math.PI+i*Math.PI*2/2000));
    assert.ok(distance>=2.2-1e-10&&distance<=7+1e-10);
    assert.ok(distance<=previous+1e-10,'pitch-to-distance must be monotonic through the horizon and vertical');
    previous=distance;
  }
});

test('reach limits have continuous slopes and preserve the ordinary ground-ray response',()=>{
  const height=3.8*Math.tan(Math.PI/10),atDistance=d=>reach(aim(Math.atan(height/d)));
  for(const boundary of [2.2,2.55,6.65,7]){
    const h=1e-5,left=(atDistance(boundary)-atDistance(boundary-h))/h,right=(atDistance(boundary+h)-atDistance(boundary))/h;
    assert.ok(Math.abs(left-right)<.0002,`distance response is smooth at ${boundary}`);
  }
  for(const distance of [2.7,3.8,4.5,6])near(atDistance(distance),distance);
});

test('custom near and far limits never allow a lot beyond the supplied reach',()=>{
  for(const options of [{maxDistance:4},{maxDistance:1},{maxDistance:0},{maxDistance:5,minDistance:3},{maxDistance:2,minDistance:9}]){
    const minimum=Math.min(options.maxDistance,options.minDistance??2.2);
    for(const pitch of [-1,0,.1,.3,.7,Math.PI/2,2]){
      const distance=reach(aim(pitch,.31,options));
      assert.ok(distance<=options.maxDistance+1e-10);
      assert.ok(distance>=minimum-1e-10);
    }
  }
  near(reach(aim(Math.PI/2,0,{minDistance:0})),0);
});

test('missing and nonfinite pose values or limits produce stable finite fallbacks',()=>{
  for(const pose of [undefined,null,{}, {position:null},{position:{x:NaN,z:Infinity},heading:NaN,pitch:Infinity}]){
    const point=walkingBuildAim({},pose);
    near(point.x,0);near(point.z,3.8);
  }
  for(const value of [NaN,Infinity,-Infinity,'3']){
    const point=walkingBuildAim({}, {position,heading:value,pitch:value},{maxDistance:value,minDistance:value});
    near(point.x,12);near(point.z,-4.2);
  }
  assert.deepEqual(walkingBuildAim({}, {position},{maxDistance:-1}),{x:12,z:-8});
  const nullOptions=walkingBuildAim({}, {position},null);
  near(nullOptions.x,12);near(nullOptions.z,-4.2);
});

test('globe aim preserves physical reach and heading at high latitudes and across the seam',()=>{
  const radius=2000,world={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  for(const [longitude,latitude] of [[0,0],[40,80],[179.98,70],[-179.98,-70],[0,90]]){
    const origin=surfaceChartCoordinates(world,longitude,latitude);
    for(const heading of [0,.61,Math.PI/2,Math.PI,-Math.PI/2]){
      const point=walkingBuildAim(world,{position:origin,heading,pitch:Math.PI/10});
      assert.ok(Number.isFinite(point.x)&&Number.isFinite(point.z));
      near(surfaceDistance(world,origin,point),3.8,1e-8);
      const displacement=surfaceDisplacement(world,origin,point);
      near(displacement.x,Math.sin(heading)*3.8,1e-8);
      near(displacement.z,Math.cos(heading)*3.8,1e-8);
    }
  }
});
