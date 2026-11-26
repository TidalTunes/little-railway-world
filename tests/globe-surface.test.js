import test from 'node:test';
import assert from 'node:assert/strict';
import {BufferGeometry,Float32BufferAttribute,Matrix4,Vector3} from 'three';
import {generateWorld,validateWorld} from '../src/world-model.js';
import {normalizeSurface,surfaceChartCoordinates,surfaceGeographicCoordinates,surfacePoint,surfaceCoordinates,surfaceNormal,surfaceTangent,surfaceFrame,surfacePoseMatrix,warpGeometryToSurface} from '../src/world-surface.js';

const radius=1600,radians=Math.PI/180;
const surface={type:'sphere',radius,origin:{longitude:0,latitude:0},complete:true,
  projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}};
const globe={surface},chart=(longitude,latitude)=>({x:radius*longitude*radians,z:-radius*latitude*radians});
const close=(actual,expected,tolerance=1e-8)=>assert.ok(actual.distanceTo(expected)<tolerance,`${actual.toArray()} vs ${expected.toArray()}`);
function numerical(x,y,z,dx,dy,dz){
  const h=.0001;
  return surfacePoint(globe,x+h*dx,y+h*dy,z+h*dz).sub(surfacePoint(globe,x-h*dx,y-h*dy,z-h*dz)).multiplyScalar(1/(2*h));
}

test('complete globe metadata and equirectangular chart constants survive normalization and worker cloning',()=>{
  const normalized=normalizeSurface(surface);
  assert.deepEqual(normalized,surface);assert.notEqual(normalized.projection,surface.projection);
  assert.equal(normalizeSurface({...surface,complete:false}).complete,false);
  const world=generateWorld({surface,density:0},{detail:'network'});
  assert.deepEqual(structuredClone(world.surface),surface);assert.deepEqual(validateWorld(world),[]);
  for(const value of [0,-1,Infinity,NaN,'1600'])assert.throws(()=>normalizeSurface({...surface,projection:{...surface.projection,radius:value}}),/chart radius/);
  for(const complete of [1,'true',null])assert.throws(()=>normalizeSurface({...surface,complete}),/complete must be a boolean/);
});

test('geographic helpers preserve both chart seam edges and full latitude range',()=>{
  const target={},inverse={};
  for(const longitude of [-540,-180,-83,0,121,180,540])for(const latitude of [-90,-67,0,52,90]){
    const expected=chart(longitude,latitude);
    assert.equal(surfaceChartCoordinates(globe,longitude,latitude,target),target);
    assert.ok(Math.hypot(target.x-expected.x,target.z-expected.z)<1e-10);
    assert.equal(surfaceGeographicCoordinates(globe,target.x,target.z,inverse),inverse);
    assert.ok(Math.abs(inverse.longitude-longitude)<1e-10);assert.ok(Math.abs(inverse.latitude-latitude)<1e-10);
  }
  assert.equal(surfaceChartCoordinates(globe,-180,0).x,-Math.PI*radius);
  assert.equal(surfaceChartCoordinates(globe,180,0).x,Math.PI*radius);
  assert.throws(()=>surfaceChartCoordinates(globe,0,91),/latitude/);
  assert.throws(()=>surfaceGeographicCoordinates(globe,0,-Math.PI*radius),/between the poles/);
  assert.throws(()=>surfaceChartCoordinates({},0,0),/spherical world/);
});

test('all hemispheres and poles map independently to the same exact sphere',()=>{
  for(const longitude of [-180,-139,-90,-21,0,58,90,147,180])for(const latitude of [-90,-72,-35,0,43,81,90])for(const elevation of [-1.2,0,27]){
    const {x,z}=chart(longitude,latitude),lambda=longitude*radians,phi=latitude*radians,r=radius+elevation;
    const expected=new Vector3(r*Math.cos(phi)*Math.sin(lambda),r*Math.cos(phi)*Math.cos(lambda)-radius,-r*Math.sin(phi));
    const point=surfacePoint(globe,x,elevation,z);close(point,expected);
    assert.ok(Math.abs(point.clone().add(new Vector3(0,radius,0)).length()-r)<1e-9);
    close(surfaceNormal(globe,x,z),expected.clone().add(new Vector3(0,radius,0)).normalize());
  }
  close(surfacePoint(globe,0,0,0),new Vector3());
  close(surfacePoint(globe,Math.PI*radius,0,0),new Vector3(0,-2*radius,0));
});

test('sphere inverse roundtrips globally, wraps the seam and chooses a deterministic meridian at poles',()=>{
  for(let longitude=-180;longitude<=180;longitude+=15)for(let latitude=-90;latitude<=90;latitude+=10){
    const {x,z}=chart(longitude,latitude),point=surfacePoint(globe,x,12,z),inverse=surfaceCoordinates(globe,point);
    const expectedX=Math.abs(latitude)===90?0:longitude===180?-Math.PI*radius:x;
    assert.ok(Math.abs(inverse.x-expectedX)<1e-8,`${longitude},${latitude} longitude`);
    assert.ok(Math.abs(inverse.z-z)<1e-8);assert.ok(Math.abs(inverse.elevation-12)<1e-9);
    close(surfacePoint(globe,inverse.x,inverse.elevation,inverse.z),point);
  }
  // Nonzero chart and rendered origins are independent, including a polar view.
  for(const latitude of [-90,0,90]){
    const rotated={surface:{...surface,origin:{longitude:-110,latitude},projection:{...surface.projection,centralLongitude:30,centralLatitude:-15}}};
    const p=surfaceChartCoordinates(rotated,170,-40),q=surfaceCoordinates(rotated,surfacePoint(rotated,p.x,3,p.z));
    assert.ok(Math.hypot(p.x-q.x,p.z-q.z)<1e-8);assert.ok(Math.abs(q.elevation-3)<1e-9);
  }
});

test('surface derivatives and rotated metric poses remain exact on both sides of the seam and near both poles',()=>{
  for(const longitude of [-180,-150,0,150,180])for(const latitude of [-89.999,-70,0,70,89.999]){
    const {x,z}=chart(longitude,latitude),elevation=8;
    for(const [dx,dy,dz] of [[1,0,0],[0,1,0],[0,0,1],[.2,.7,-.4]])close(surfaceTangent(globe,x,elevation,z,dx,dy,dz),numerical(x,elevation,z,dx,dy,dz),3e-8);
    for(const yaw of [0,.6,Math.PI/2]){
      const pose=surfacePoseMatrix(globe,x,elevation,z,yaw);
      close(new Vector3().fromArray(pose.elements,0),numerical(x,elevation,z,Math.cos(yaw),0,-Math.sin(yaw)),3e-8);
      close(new Vector3().fromArray(pose.elements,8),numerical(x,elevation,z,Math.sin(yaw),0,Math.cos(yaw)),3e-8);
      close(new Vector3().fromArray(pose.elements,12),surfacePoint(globe,x,elevation,z));
      assert.ok(pose.determinant()>0);
    }
  }
  const p=chart(45,60);
  assert.ok(Math.abs(surfaceTangent(globe,p.x,0,p.z,1,0,0).length()-.5)<1e-12);
  assert.ok(Math.abs(surfaceTangent(globe,p.x,0,p.z,0,0,1).length()-1)<1e-12);
});

test('frames and pole poses are finite, properly oriented and periodic across the longitude seam',()=>{
  const matrix=new Matrix4();
  for(const longitude of [-180,-90,0,90,180])for(const latitude of [-90,-89.999,0,89.999,90]){
    const {x,z}=chart(longitude,latitude),frame=surfaceFrame(globe,x,z,matrix);
    assert.equal(frame,matrix);assert.ok(frame.elements.every(Number.isFinite));
    const east=new Vector3().fromArray(frame.elements,0),up=new Vector3().fromArray(frame.elements,4),south=new Vector3().fromArray(frame.elements,8);
    close(east.clone().cross(up),south);close(up,surfaceNormal(globe,x,z));
    assert.ok(Math.abs(frame.determinant()-1)<1e-12);
    close(surfacePoint(globe,x+Math.PI*radius*2,0,z),surfacePoint(globe,x,0,z));
    const wrapped=surfaceFrame(globe,x+Math.PI*radius*2,z);
    frame.elements.forEach((v,i)=>assert.ok(Math.abs(v-wrapped.elements[i])<1e-12));
    const pose=surfacePoseMatrix(globe,x,0,z,.7);assert.ok(pose.elements.every(Number.isFinite));
    if(Math.abs(latitude)===90){assert.ok(Math.abs(pose.determinant())<1e-12);assert.equal(surfaceTangent(globe,x,0,z,1,0,0).length(),0);}
  }
});

test('geometry normals and tangents remain finite at poles and match exact slope transforms away from them',()=>{
  const points=[chart(-180,-90),chart(42,-89.99),chart(137,-63),chart(-91,34),chart(180,89.99),chart(180,90)];
  const u=new Vector3(1,.2,0),v=new Vector3(0,-.3,1),normal=u.clone().cross(v).normalize();
  const vertices=[],normals=[],tangents=[];
  for(const [i,p] of points.entries()){
    vertices.push(p.x,2,p.z);normals.push(...(i===0||i===points.length-1?[0,1,0]:normal.toArray()));tangents.push(1,0,0,1);
  }
  const geometry=new BufferGeometry().setAttribute('position',new Float32BufferAttribute(vertices,3))
    .setAttribute('normal',new Float32BufferAttribute(normals,3)).setAttribute('tangent',new Float32BufferAttribute(tangents,4));
  const before=geometry.attributes.position.clone();warpGeometryToSurface(geometry,globe);
  for(const key of ['position','normal','tangent'])assert.ok([...geometry.attributes[key].array].every(Number.isFinite));
  for(let i=0;i<points.length;i++){
    const n=new Vector3().fromBufferAttribute(geometry.attributes.normal,i),t=new Vector3().fromBufferAttribute(geometry.attributes.tangent,i);
    assert.ok(Math.abs(n.length()-1)<1e-7);assert.ok(Math.abs(t.length()-1)<1e-7);
    if(i===0||i===points.length-1)close(n,surfaceNormal(globe,before.getX(i),before.getZ(i)),1e-7);
    else{
      assert.ok(Math.abs(n.dot(numerical(before.getX(i),2,before.getZ(i),...u)))<2e-7);
      assert.ok(Math.abs(n.dot(numerical(before.getX(i),2,before.getZ(i),...v)))<2e-7);
    }
  }
  geometry.dispose();
});
