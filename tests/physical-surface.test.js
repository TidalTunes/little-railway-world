import test from 'node:test';
import assert from 'node:assert/strict';
import {Matrix4,OrthographicCamera,Vector3} from 'three';
import geography from '../data/europe-geography.json' with {type:'json'};
import {EARTH_SURFACE_RADIUS,surfaceChartCoordinates,surfacePoint,surfaceFrame,
  rigidSurfacePoseMatrix,surfaceOffset,surfaceDisplacement,surfaceDistance,
  surfaceHeading,chartHeadingForSurface,surfaceChartRadius} from '../src/world-surface.js';

const radius=1600,radians=Math.PI/180;
const globe={surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
  projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
const europe={surface:{type:'sphere',radius:EARTH_SURFACE_RADIUS,origin:{longitude:10,latitude:52},projection:geography.projection}};
const near=(actual,expected,tolerance=1e-8,message='physical vectors agree')=>
  assert.ok(actual.distanceTo(expected)<tolerance,`${message}: ${actual.toArray()} vs ${expected.toArray()}`);
const close=(actual,expected,tolerance=1e-8,message='physical values agree')=>
  assert.ok(Math.abs(actual-expected)<tolerance,`${message}: ${actual} vs ${expected}`);
const wrapped=(value,period)=>((value+period/2)%period+period)%period-period/2;

test('rigid assets retain dimensions, orthogonality and physical route heading at every latitude',()=>{
  const pose=new Matrix4(),center=new Vector3(),forward=new Vector3(),right=new Vector3(),up=new Vector3();
  for(const world of [globe,europe])for(const latitude of [0,45,75,84])for(const longitude of [-25,0,140]){
    const anchor=surfaceChartCoordinates(world,longitude,latitude);
    for(const heading of [0,.37,Math.PI/2,2.4,Math.PI,5.3]){
      assert.equal(rigidSurfacePoseMatrix(world,anchor.x,.42,anchor.z,heading,pose),pose);
      const e=pose.elements;right.fromArray(e,0);up.fromArray(e,4);forward.fromArray(e,8);center.fromArray(e,12);
      for(const axis of [right,up,forward])close(axis.length(),1,1e-12,'rigid axes have unit scale');
      close(right.dot(up),0,1e-12);close(right.dot(forward),0,1e-12);close(up.dot(forward),0,1e-12);
      close(pose.determinant(),1,1e-12,'no reflection or shear');
      near(center,surfacePoint(world,anchor.x,.42,anchor.z));
      const h=1e-3;
      const numericalForward=surfacePoint(world,anchor.x+Math.sin(heading)*h,.42,anchor.z+Math.cos(heading)*h)
        .sub(surfacePoint(world,anchor.x-Math.sin(heading)*h,.42,anchor.z-Math.cos(heading)*h)).normalize();
      near(forward,numericalForward,2e-8,'rigid train points along the actual surface route');
      const corners=[new Vector3(-.6,0,-1.32),new Vector3(.6,0,-1.32),new Vector3(-.6,1.5,-1.32),new Vector3(-.6,0,1.32)];
      const transformed=corners.map(point=>point.clone().applyMatrix4(pose));
      for(let i=1;i<corners.length;i++)close(transformed[i].distanceTo(transformed[0]),corners[i].distanceTo(corners[0]),1e-9,
        'car width, height and length survive placement');
    }
  }
});

test('chart and physical heading conversions preserve a requested unit heading without latitude skew',()=>{
  for(const world of [globe,europe])for(const latitude of [0,45,75,84]){
    const anchor=surfaceChartCoordinates(world,30,latitude),frame=surfaceFrame(world,anchor.x,anchor.z);
    for(const desired of [0,.4,Math.PI/2,2.8,-2,-Math.PI/2]){
      const chart=chartHeadingForSurface(world,anchor.x,anchor.z,desired);
      close(wrapped(surfaceHeading(world,anchor.x,anchor.z,chart)-desired,2*Math.PI),0,1e-12);
      const pose=rigidSurfacePoseMatrix(world,anchor.x,0,anchor.z,chart);
      const actual=new Vector3().fromArray(pose.elements,8);
      const expected=new Vector3(Math.sin(desired),0,Math.cos(desired)).applyMatrix4(frame);
      near(actual,expected,1e-12,'physical heading agrees with the rigid asset axis');
    }
  }
});

test('physical offsets and logarithmic displacements invert across high latitudes, poles and the date line',()=>{
  for(const world of [globe,europe])for(const [longitude,latitude] of [[0,0],[35,45],[179.9,75],[-179.9,-60],[10,84]]){
    const anchor=surfaceChartCoordinates(world,longitude,latitude);
    for(const [dx,dz] of [[0,0],[1,0],[0,-1],[1.25,.95],[-18,45],[120,-90],[0,-400]]){
      const target={};assert.equal(surfaceOffset(world,anchor.x,anchor.z,dx,dz,target),target);
      assert.equal('elevation' in target,false,'a physical ground offset does not acquire elevation');
      const displacement={};assert.equal(surfaceDisplacement(world,anchor,target,displacement),displacement);
      close(displacement.x,dx,2e-8);close(displacement.z,dz,2e-8);
      close(surfaceDistance(world,anchor,target),Math.hypot(dx,dz),2e-8,'distance equals the commanded physical arc');
      close(surfaceDistance(world,target,anchor),surfaceDistance(world,anchor,target),1e-10,'distance is symmetric');
      const physical=surfacePoint(world,target.x,0,target.z).add(new Vector3(0,world.surface.radius,0));
      close(physical.length(),world.surface.radius,1e-9,'offset remains on the exact sphere');
    }
  }
});

test('great-circle distances remain correct at coincident, seam-adjacent and antipodal points',()=>{
  const anchor=surfaceChartCoordinates(globe,0,0);
  close(surfaceDistance(globe,anchor,anchor),0);
  close(surfaceDistance(globe,anchor,surfaceChartCoordinates(globe,90,0)),radius*Math.PI/2);
  close(surfaceDistance(globe,anchor,surfaceChartCoordinates(globe,180,0)),radius*Math.PI);
  const antipodal=surfaceDisplacement(globe,anchor,surfaceChartCoordinates(globe,180,0));
  close(Math.hypot(antipodal.x,antipodal.z),radius*Math.PI,1e-8,'an antipodal logarithm cannot masquerade as zero distance');
  const roundTrip=surfaceOffset(globe,anchor.x,anchor.z,antipodal.x,antipodal.z);
  near(surfacePoint(globe,roundTrip.x,0,roundTrip.z),surfacePoint(globe,radius*Math.PI,0,0));
  close(surfaceDistance(globe,surfaceChartCoordinates(globe,179.9,0),surfaceChartCoordinates(globe,-179.9,0)),radius*.2*radians);
  const nearby=surfaceOffset(globe,anchor.x,anchor.z,1e-6,0);
  close(surfaceDistance(globe,anchor,nearby),1e-6,1e-11,'very short distances do not lose precision through acos');
});

test('chart broad-phase disks enclose every bearing of a physical circular footprint',()=>{
  for(const world of [globe,europe])for(const latitude of [0,45,75,84])for(const physicalRadius of [4,30,100]){
    const anchor=surfaceChartCoordinates(world,0,latitude),bound=surfaceChartRadius(world,anchor.x,anchor.z,physicalRadius);
    for(let i=0;i<720;i++){
      const angle=i*Math.PI/360,target=surfaceOffset(world,anchor.x,anchor.z,physicalRadius*Math.sin(angle),physicalRadius*Math.cos(angle));
      const chartDistance=Math.hypot(target.x-anchor.x,target.z-anchor.z);
      assert.ok(chartDistance<=bound+1e-9,`${world===globe?'globe':'Europe'} at ${latitude}°, radius ${physicalRadius}, bearing ${i/2}°: ${chartDistance} exceeds ${bound}`);
    }
  }
  // A footprint containing a pole can span every longitude. Measure chart
  // longitude periodically, since -180 and +180 identify the same meridian.
  const anchor=surfaceChartCoordinates(globe,179.9,84),physicalRadius=200;
  const bound=surfaceChartRadius(globe,anchor.x,anchor.z,physicalRadius);
  for(let i=0;i<720;i++){
    const angle=i*Math.PI/360,target=surfaceOffset(globe,anchor.x,anchor.z,physicalRadius*Math.sin(angle),physicalRadius*Math.cos(angle));
    const distance=Math.hypot(wrapped(target.x-anchor.x,2*Math.PI*radius),target.z-anchor.z);
    assert.ok(distance<=bound+1e-9,'a pole-crossing physical footprint remains inside its periodic chart bound');
  }
});

test('rigid detail remains proportional under yaw and portrait or landscape orthographic framing',()=>{
  for(const latitude of [0,45,75,84])for(const heading of [0,Math.PI/4,Math.PI/2]){
    const anchor=surfaceChartCoordinates(globe,30,latitude),frame=surfaceFrame(globe,anchor.x,anchor.z);
    const center=surfacePoint(globe,anchor.x,0,anchor.z),normal=new Vector3().fromArray(frame.elements,4);
    const pose=rigidSurfacePoseMatrix(globe,anchor.x,0,anchor.z,chartHeadingForSurface(globe,anchor.x,anchor.z,heading));
    for(const [width,height] of [[1200,800],[800,1200]]){
      const aspect=width/height,camera=new OrthographicCamera(-50*aspect,50*aspect,50,-50,.1,10000);
      const offset=new Vector3().setFromSphericalCoords(200,Math.PI/4,heading).applyMatrix4(frame);
      camera.position.copy(center).add(offset);camera.up.copy(normal);camera.lookAt(center);camera.updateMatrixWorld(true);
      const screen=point=>point.clone().applyMatrix4(pose).project(camera).multiply(new Vector3(width/2,height/2,1));
      const origin=screen(new Vector3()),right=screen(new Vector3(1,0,0)).sub(origin),forward=screen(new Vector3(0,0,1)).sub(origin);
      close(Math.hypot(right.x,right.y),height/100,1e-9,'one transverse world unit has uniform pixel scale');
      close(Math.hypot(forward.x,forward.y),height/100*Math.SQRT1_2,1e-9,'ground foreshortening is fixed at 45 degrees');
    }
  }
});

test('physical helpers keep planar worlds unchanged and reuse supplied outputs',()=>{
  const world={},anchor={x:4,z:-8},target={};
  assert.equal(surfaceOffset(world,anchor.x,anchor.z,3,4,target),target);assert.deepEqual(target,{x:7,z:-4});
  const displacement={};assert.equal(surfaceDisplacement(world,anchor,target,displacement),displacement);assert.deepEqual(displacement,{x:3,z:4});
  close(surfaceDistance(world,anchor,target),5);close(surfaceChartRadius(world,4,-8,12),12);
  close(surfaceHeading(world,4,-8,.7),.7);close(chartHeadingForSurface(world,4,-8,.7),.7);
  const expected=new Matrix4().makeRotationY(.7).setPosition(4,2,-8);
  assert.deepEqual(rigidSurfacePoseMatrix(world,4,2,-8,.7).elements,expected.elements);
});
