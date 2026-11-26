import test from 'node:test';
import assert from 'node:assert/strict';
import {BufferGeometry,Float32BufferAttribute,Matrix4,Vector3} from 'three';
import geography from '../data/europe-geography.json' with {type:'json'};
import {projectGeographic} from '../src/europe-projection.js';
import {generateWorld,validateWorld} from '../src/world-model.js';
import {EARTH_SURFACE_RADIUS,SURFACE_MAX_SEGMENT,normalizeSurface,surfaceFor,surfacePoint,surfaceNormal,surfaceTangent,surfaceFrame,surfacePoseMatrix,surfaceCoordinates,warpGeometryToSurface} from '../src/world-surface.js';

const surface={type:'sphere',radius:EARTH_SURFACE_RADIUS,origin:{longitude:10,latitude:52},projection:geography.projection};
const world={surface},radians=Math.PI/180;
const anchors=[[-3.7038,40.4168],[2.35,48.86],[-19,65],[37.62,55.75],[28.98,41.01],[-26,30],[45.5,71.5],[10,52]];
const chart=(lon,lat)=>projectGeographic(geography.projection,lon,lat);
function near(actual,expected,tolerance=1e-8,message='vector matches'){
  assert.ok(actual.distanceTo(expected)<=tolerance,`${message}: ${actual.toArray()} vs ${expected.toArray()}`);
}
function numericalTangent(x,y,z,dx,dy,dz){
  const h=1e-3;
  return surfacePoint(world,x+dx*h,y+dy*h,z+dz*h).sub(surfacePoint(world,x-dx*h,y-dy*h,z-dz*h)).multiplyScalar(1/(2*h));
}

test('surface positions independently match geographic sphere coordinates and radial elevations',()=>{
  const lon0=10*radians,lat0=52*radians;
  const east=new Vector3(-Math.sin(lon0),Math.cos(lon0),0);
  const up=new Vector3(Math.cos(lat0)*Math.cos(lon0),Math.cos(lat0)*Math.sin(lon0),Math.sin(lat0));
  const south=new Vector3(Math.sin(lat0)*Math.cos(lon0),Math.sin(lat0)*Math.sin(lon0),-Math.cos(lat0));
  for(const [lon,lat] of anchors)for(const elevation of [-1.2,0,.42,35]){
    const p=chart(lon,lat),phi=lat*radians,lambda=lon*radians;
    const globe=new Vector3(Math.cos(phi)*Math.cos(lambda),Math.cos(phi)*Math.sin(lambda),Math.sin(phi));
    const radius=EARTH_SURFACE_RADIUS+elevation;
    const expected=new Vector3(globe.dot(east)*radius,globe.dot(up)*radius-EARTH_SURFACE_RADIUS,globe.dot(south)*radius);
    const actual=surfacePoint(world,p.x,elevation,p.z);
    near(actual,expected);
    assert.ok(Math.abs(actual.clone().add(new Vector3(0,EARTH_SURFACE_RADIUS,0)).length()-radius)<1e-9);
    near(surfaceNormal(world,p.x,p.z),actual.clone().add(new Vector3(0,EARTH_SURFACE_RADIUS,0)).normalize());
  }
  near(surfacePoint(world,0,0,0),new Vector3());
  assert.ok(surfacePoint(world,...[chart(-4,40).x,0,chart(-4,40).z]).y<-20,'Iberia has real globe curvature below the origin tangent plane');
  assert.ok(EARTH_SURFACE_RADIUS*(1-Math.cos(SURFACE_MAX_SEGMENT/(2*EARTH_SURFACE_RADIUS)))<.004);
});

test('surface inverse recovers chart coordinates and elevation over the complete Europe extent',()=>{
  const target={};
  for(let latitude=30;latitude<=71.5;latitude+=4.15)for(let longitude=-26;longitude<=45.5;longitude+=7.15){
    const p=chart(longitude,latitude),elevation=(latitude-longitude)*.1;
    assert.equal(surfaceCoordinates(world,surfacePoint(world,p.x,elevation,p.z),target),target);
    assert.ok(Math.hypot(target.x-p.x,target.z-p.z)<1e-8);
    assert.ok(Math.abs(target.elevation-elevation)<1e-9);
  }
  assert.throws(()=>surfaceCoordinates(world,new Vector3(0,-EARTH_SURFACE_RADIUS,0)),/sphere center/);
});

test('analytic surface derivatives match independent central differences including radial slope',()=>{
  for(const [lon,lat] of anchors){
    const {x,z}=chart(lon,lat);
    for(const [dx,dy,dz] of [[1,0,0],[0,1,0],[0,0,1],[.3,.9,-.6]]){
      near(surfaceTangent(world,x,12,z,dx,dy,dz),numericalTangent(x,12,z,dx,dy,dz),2e-8,'exact Jacobian');
    }
    const frame=surfaceFrame(world,x,z),elements=frame.elements;
    const a=new Vector3().fromArray(elements,0),b=new Vector3().fromArray(elements,4),c=new Vector3().fromArray(elements,8);
    near(a,surfaceTangent(world,x,0,z,1,0,0).normalize());near(b,surfaceNormal(world,x,z));
    near(a.clone().cross(b),c);assert.ok(Math.abs(frame.determinant()-1)<1e-12);
    near(new Vector3().fromArray(elements,12),new Vector3());
  }
});

test('surface pose preserves chart yaw, local metric and translation',()=>{
  const target=new Matrix4(),{x,z}=chart(-4,40),y=.42;
  for(const angle of [0,.3,Math.PI/2,Math.PI]){
    assert.equal(surfacePoseMatrix(world,x,y,z,angle,target),target);
    near(new Vector3().fromArray(target.elements,12),surfacePoint(world,x,y,z));
    near(new Vector3().fromArray(target.elements,0),numericalTangent(x,y,z,Math.cos(angle),0,-Math.sin(angle)),2e-8);
    near(new Vector3().fromArray(target.elements,4),surfaceNormal(world,x,z));
    near(new Vector3().fromArray(target.elements,8),numericalTangent(x,y,z,Math.sin(angle),0,Math.cos(angle)),2e-8);
    assert.ok(target.determinant()>0,'winding is preserved');
  }
});

test('geometry warp preserves attributes and topology while normals follow the exact inverse transpose',()=>{
  const {x,z}=chart(40,35),positions=[x,4,z,x+2,4.6,z,x,5,z+2];
  const u=new Vector3(1,.3,0),v=new Vector3(0,.5,1),n=u.clone().cross(v).normalize(),t=u.clone().normalize();
  const geometry=new BufferGeometry().setAttribute('position',new Float32BufferAttribute(positions,3));
  geometry.setAttribute('normal',new Float32BufferAttribute([...n,...n,...n],3));
  geometry.setAttribute('tangent',new Float32BufferAttribute([...t,1,...t,1,...t,1],4));
  geometry.setAttribute('color',new Float32BufferAttribute([1,0,0,0,1,0,0,0,1],3));
  geometry.setIndex([0,1,2]);geometry.addGroup(0,3,2);
  const original=geometry.clone(),colors=geometry.getAttribute('color'),indices=geometry.index;
  geometry.boundsTree={stale:true};
  assert.equal(warpGeometryToSurface(geometry,world),geometry);
  assert.equal(geometry.boundsTree,null,'stale acceleration data cannot survive a position warp');
  assert.equal(geometry.getAttribute('color'),colors);assert.equal(geometry.index,indices);assert.deepEqual(geometry.groups,[{start:0,count:3,materialIndex:2}]);
  for(let i=0;i<3;i++){
    const p=new Vector3().fromBufferAttribute(original.getAttribute('position'),i);
    near(new Vector3().fromBufferAttribute(geometry.getAttribute('position'),i),surfacePoint(world,p.x,p.y,p.z),8e-5);
    const normal=new Vector3().fromBufferAttribute(geometry.getAttribute('normal'),i);
    assert.ok(Math.abs(normal.dot(numericalTangent(p.x,p.y,p.z,...u)))<2e-7);
    assert.ok(Math.abs(normal.dot(numericalTangent(p.x,p.y,p.z,...v)))<2e-7);
    assert.ok(Math.abs(normal.length()-1)<1e-7);
    near(new Vector3().fromBufferAttribute(geometry.getAttribute('tangent'),i),surfaceTangent(world,p.x,p.y,p.z,...t).normalize(),1e-7);
    assert.equal(geometry.getAttribute('tangent').getW(i),1);
  }
  assert.ok(geometry.boundingSphere.radius>0);assert.ok(geometry.boundingBox.containsPoint(new Vector3().fromBufferAttribute(geometry.getAttribute('position'),0)));
  geometry.dispose();original.dispose();
});

test('planar helpers remain identity operations and optional outputs are reused',()=>{
  const plane={},vector=new Vector3(),matrix=new Matrix4(),point={x:8,y:3,z:-2};
  assert.equal(surfaceFor(plane),null);assert.equal(surfaceFor(world),surface);
  assert.equal(surfacePoint(plane,8,3,-2,vector),vector);near(vector,new Vector3(8,3,-2));
  near(surfaceNormal(plane,8,-2),new Vector3(0,1,0));
  near(surfaceTangent(plane,8,3,-2,.2,.6,.7),new Vector3(.2,.6,.7));
  assert.equal(surfaceFrame(plane,8,-2,matrix),matrix);assert.deepEqual(matrix.elements,new Matrix4().elements);
  assert.deepEqual(surfaceCoordinates(plane,point),{x:8,z:-2,elevation:3});
  assert.deepEqual(surfacePoseMatrix(plane,8,3,-2,.7).elements,new Matrix4().makeRotationY(.7).setPosition(8,3,-2).elements);
  const geometry=new BufferGeometry().setAttribute('position',new Float32BufferAttribute([1,2,3],3));
  assert.equal(warpGeometryToSurface(geometry,plane),geometry);assert.deepEqual([...geometry.attributes.position.array],[1,2,3]);
});

test('surface metadata is validated, cloned into the worker model and survives structured cloning',()=>{
  const normalized=normalizeSurface(surface);
  assert.deepEqual(normalized,surface);assert.notEqual(normalized,surface);assert.notEqual(normalized.projection,surface.projection);
  const network=generateWorld({density:0,surface},{detail:'network'});
  assert.deepEqual(network.surface,surface);assert.notEqual(network.surface,surface);assert.deepEqual(structuredClone(network.surface),surface);
  assert.deepEqual(validateWorld(network),[]);
  const corrupt=structuredClone(surface);corrupt.radius=-1;
  assert.throws(()=>generateWorld({surface:corrupt},{detail:'network'}),/radius/);
  network.surface=corrupt;assert.ok(validateWorld(network).some(v=>v.type==='surface'));
  for(const invalid of [{...surface,type:'plane'},...[0,-1,Infinity,NaN,'2000'].map(radius=>({...surface,radius})),{...surface,origin:{longitude:10,latitude:90}},
    {...surface,projection:{...surface.projection,coneConstant:0}},{...surface,projection:{...surface.projection,eccentricity:1}}]){
    assert.throws(()=>normalizeSurface(invalid),/Invalid world surface/);
  }
});
