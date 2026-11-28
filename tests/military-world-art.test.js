import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createMilitaryWorldArt} from '../src/military-world-art.js';
import {militaryColors} from '../src/military-palette.js';
import {getMilitaryMuzzle,getMilitaryForward} from '../src/military-kinematics.js';

const owner={id:'teal',color:{l:.64,c:.13,h:178}},enemy={id:'coral',color:{l:.65,c:.16,h:29}};
const world={players:[owner,enemy],gameplay:{ownerId:'teal'}};
function fixture(t,capacity=16){
  const parent=new THREE.Group(),mapParent=new THREE.Group(),art=createMilitaryWorldArt(parent,mapParent,world,{capacity});t.after(()=>art.dispose());
  const camera=new THREE.OrthographicCamera(-18,18,18,-18,.1,200);camera.position.set(0,30,25);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  return{parent,mapParent,art,camera};
}
const unit=(id,kind='soldier',extra={})=>({id,kind,ownerId:'teal',team:owner,x:0,y:0,z:0,heading:0,moving:false,hp:12,maxHp:12,shielded:false,...extra});
const zones=[{ownerId:'teal',x:0,z:0,innerRadius:5,outerRadius:12},{ownerId:'coral',x:30,z:20,innerRadius:6,outerRadius:13}];
function matrixPosition(mesh,index=0){const m=new THREE.Matrix4();mesh.getMatrixAt(index,m);return new THREE.Vector3().setFromMatrixPosition(m);}

test('the same stable combat units drive colored rigs, health, selection and home protection in both layers',t=>{
  const{art,camera}=fixture(t),units=[unit('s'),unit('t','tank',{x:3,shielded:true,hp:6}),unit('a','artillery',{x:-3,ownerId:'coral',team:enemy}),unit('h','helicopter',{z:-4,y:5})];
  const simulation={units,membershipRevision:1,spawnZones:zones};
  art.update(.1,{simulation,camera,mapBlend:.5,selectedIds:new Set(['s','t'])});
  assert.equal(art.stats.units,4);assert.equal(art.stats.visible,4);assert.equal(art.stats.healthBars,3);assert.equal(art.stats.selected,2);assert.equal(art.stats.protected,1);assert.equal(art.stats.spawnZones,1);
  assert.equal(art.root.getObjectByName('military-spawn-zone').children.length,3,'one home has a faint annulus and two boundaries');
  assert.equal(art.mapRoot.getObjectByName('military-map-helicopter').count,1);assert.equal(matrixPosition(art.mapRoot.getObjectByName('military-map-helicopter')).y,Math.fround(.8));
  const health=art.root.getObjectByName('military-health-detail'),background=art.root.getObjectByName('military-health-back-detail'),a=new THREE.Matrix4(),b=new THREE.Matrix4();
  health.getMatrixAt(0,a);background.getMatrixAt(0,b);assert.ok(new THREE.Vector3().setFromMatrixScale(a).x<new THREE.Vector3().setFromMatrixScale(b).x*.51,'half-health fill is anchored within the full backplate');
  const artillery=art.mapRoot.getObjectByName('military-map-artillery'),tint=new THREE.Color();artillery.getColorAt(0,tint);
  assert.ok(tint.toArray().every((v,i)=>Math.abs(v-militaryColors(enemy).body.toArray()[i])<1e-6));
  art.update(.1,{simulation,camera,mapBlend:1,selectedIds:['s']});assert.equal(art.root.visible,false);assert.equal(art.mapRoot.visible,true);assert.equal(art.stats.healthBars,3);
});

test('idle armies keep GPU buffers stable and moved poses do not rebuild the shared rigs',t=>{
  const{art,camera}=fixture(t),units=[unit('t','tank')],simulation={units,membershipRevision:1,spawnZones:zones};
  art.update(.1,{simulation,camera});const before=art.stats.art,meshes=art.root.getObjectByName('military-assets').children,geometries=meshes.map(m=>m.geometry),matrices=meshes.map(m=>m.instanceMatrix);
  for(let i=0;i<20;i++)art.update(.1,{simulation,camera});assert.equal(art.stats.art.poseWrites,before.poseWrites);assert.equal(art.stats.art.uploads,before.uploads);
  units[0].x=4;units[0].moving=true;art.update(.1,{simulation,camera});assert.equal(art.stats.art.poseWrites,before.poseWrites+1);assert.deepEqual(meshes.map(m=>m.geometry),geometries);assert.deepEqual(meshes.map(m=>m.instanceMatrix),matrices);
  assert.ok(art.stats.art.drawCalls<=8);assert.equal(art.stats.capacity,16);
  const restore=art.prepare();assert.ok(art.root.visible&&art.mapRoot.visible);assert.ok(meshes.every(m=>m.visible));restore();assert.equal(art.mapRoot.visible,false);
});

test('shots and destruction use a single bounded effect simulation with shared map buffers',t=>{
  const{art,camera}=fixture(t,4),units=[unit('a','tank')],simulation={units,membershipRevision:1,spawnZones:zones};
  const events=Array.from({length:50},(_,i)=>({type:'shot',unitId:'a',ownerId:'teal',kind:'tank',projectile:'shell',from:getMilitaryMuzzle(units[0]),to:{x:i*.01,y:0,z:5}}));
  events.push({type:'destroyed',unitId:'b',ownerId:'coral',kind:'tank',position:{x:2,y:0,z:3}});
  art.update(0,{simulation,camera,mapBlend:1,events});assert.equal(art.stats.effects.fired,50);assert.equal(art.stats.effects.projectiles,4);assert.equal(art.stats.effects.recycled.projectiles,46);
  const source=art.root.getObjectByName('military-effects'),map=art.mapRoot.getObjectByName('military-map-effects');
  assert.ok(matrixPosition(source.getObjectByName('military-shells')).z>1.5,'the shot begins at the actual barrel rather than the hull center');
  assert.equal(source.children.length,map.children.length);
  for(let i=0;i<source.children.length;i++){
    assert.equal(map.children[i].geometry,source.children[i].geometry);assert.equal(map.children[i].instanceMatrix,source.children[i].instanceMatrix);assert.equal(map.children[i].instanceColor,source.children[i].instanceColor);assert.equal(map.children[i].count,source.children[i].count);
  }
  assert.ok(art.stats.effects.particles<=24);art.update(1,{simulation,camera,mapBlend:1});assert.equal(art.stats.effects.impacts,4);assert.equal(art.stats.effects.projectiles,0);
  art.update(10,{simulation,camera,mapBlend:1});assert.equal(art.stats.effects.active,0);assert.ok(map.children.every(m=>!m.visible));
});

test('20 Hz movement is smoothly presented without altering simulation positions, while teleports snap',t=>{
  const{art,camera}=fixture(t),units=[unit('t','tank',{heading:Math.PI-.05})],simulation={units,membershipRevision:1,spawnZones:zones};
  art.update(.016,{simulation,camera});const tank=art.root.getObjectByName('military-assets').children.find(mesh=>mesh.name.startsWith('tank-')&&mesh.count);
  units[0].x=1;units[0].heading=-Math.PI+.05;units[0].moving=true;
  art.update(.016,{simulation,camera});const first=matrixPosition(tank).x;assert.ok(first>0&&first<.5);assert.equal(units[0].x,1);
  art.update(.016,{simulation,camera});const second=matrixPosition(tank).x;assert.ok(second>first&&second<1);
  const m=new THREE.Matrix4(),q=new THREE.Quaternion();tank.getMatrixAt(0,m);q.setFromRotationMatrix(m);assert.ok(Math.abs(q.y)>.99,'heading crosses the wrap by the short arc');
  const writes=art.stats.art.poseWrites;art.update(0,{simulation,camera});assert.equal(art.stats.art.poseWrites,writes,'a paused frame does not continually upload a smoothing tail');
  units.push(unit('new','soldier',{x:3}));simulation.membershipRevision++;art.update(.016,{simulation,camera});assert.ok(matrixPosition(tank).x>second&&matrixPosition(tank).x<1,'adding a unit preserves survivors’ motion');
  units[0].x=50;art.update(.016,{simulation,camera});camera.position.x=50;camera.lookAt(50,0,0);camera.updateMatrixWorld(true);art.update(.2,{simulation,camera});assert.equal(matrixPosition(tank).x,50);
});

test('health billboards keep their screen proportions while the world flattens toward map view',t=>{
  const{art,parent,camera}=fixture(t),simulation={units:[unit('t','tank')],membershipRevision:1,spawnZones:zones};
  art.update(.1,{simulation,camera,mapBlend:.5});const health=art.root.getObjectByName('military-health-back-detail'),a=new THREE.Matrix4(),b=new THREE.Matrix4();health.getMatrixAt(0,a);a.premultiply(art.root.matrixWorld);
  parent.scale.y=.2;art.update(.1,{simulation,camera,mapBlend:.5});health.getMatrixAt(0,b);b.premultiply(art.root.matrixWorld);
  const sa=new THREE.Vector3().setFromMatrixScale(a),sb=new THREE.Vector3().setFromMatrixScale(b);
  const rotation=new THREE.Quaternion();b.decompose(new THREE.Vector3(),rotation,new THREE.Vector3());
  assert.ok(sa.distanceTo(sb)<1e-6);assert.ok(rotation.angleTo(camera.quaternion)<1e-3,'the card still faces the camera');
});

test('ground-view health and shields respect nearby range and terrain occlusion',t=>{
  const{art,camera}=fixture(t),simulation={units:[unit('near','tank',{shielded:true}),unit('far','tank',{x:60,shielded:true})],membershipRevision:1,spawnZones:zones};
  camera.left=-100;camera.right=100;camera.updateProjectionMatrix();
  art.update(.1,{simulation,camera,walkingWeight:1});assert.equal(art.stats.healthBars,1);assert.equal(art.stats.protected,1);assert.equal(art.root.getObjectByName('military-health-detail').material.depthTest,true);
  art.update(.1,{simulation,camera,walkingWeight:0});assert.equal(art.stats.healthBars,2);assert.equal(art.root.getObjectByName('military-health-detail').material.depthTest,false);
});

test('cleanup releases shared resources once and leaves sibling scene content intact',t=>{
  const{art,parent,mapParent,camera}=fixture(t),sibling=new THREE.Group();parent.add(sibling);
  art.update(0,{simulation:{units:[unit('a','tank')],membershipRevision:1,spawnZones:zones},camera});
  const watched=new Map();for(const root of[art.root,art.mapRoot])root.traverse(node=>{for(const value of[node.geometry,node.material,node.customDepthMaterial])if(value&&!watched.has(value)){watched.set(value,0);value.addEventListener('dispose',()=>watched.set(value,watched.get(value)+1));}});
  art.dispose();art.dispose();assert.ok([...watched.values()].every(n=>n===1));assert.deepEqual(parent.children,[sibling]);assert.equal(mapParent.children.length,0);assert.equal(art.stats.disposed,true);
});

test('aim and banking interpolate, while firing faces the canonical trajectory and retains its duration and arc',t=>{
  const{art,camera}=fixture(t),units=[unit('a','artillery',{heading:0,aimYaw:0,elevation:.55})],simulation={units,membershipRevision:1,spawnZones:zones};
  art.update(0,{simulation,camera,walkingWeight:1});
  const mesh=art.root.getObjectByName('artillery-near'),aim=mesh.geometry.attributes.militaryAim;
  units[0].heading=.3;units[0].aimYaw=.4;units[0].elevation=.85;units[0].pitch=.06;units[0].roll=-.04;
  art.update(.016,{simulation,camera,walkingWeight:1});
  assert.ok(aim.getX(0)>0&&aim.getX(0)<.4);assert.ok(aim.getY(0)>.55&&aim.getY(0)<.85);assert.ok(aim.getZ(0)>0&&aim.getZ(0)<.06);assert.ok(aim.getW(0)<0&&aim.getW(0)>-.04);
  const from=getMilitaryMuzzle(units[0]),forward=getMilitaryForward(units[0]),to={x:10,y:0,z:8},event={type:'shot',unitId:'a',ownerId:'teal',kind:'artillery',projectile:'arc',from,forward,to,duration:2,arcHeight:6};
  art.update(0,{simulation,camera,walkingWeight:1,events:[event],night:1,focus:{x:0,y:0,z:0}});
  const matrix=new THREE.Matrix4();mesh.getMatrixAt(0,matrix);const heading=Math.atan2(matrix.elements[8],matrix.elements[10]);
  const renderedForward=getMilitaryForward({kind:'artillery',heading,aimYaw:aim.getX(0),elevation:aim.getY(0),pitch:aim.getZ(0),roll:aim.getW(0)});
  assert.ok(new THREE.Vector3().copy(renderedForward).distanceTo(forward)<1e-6,'aim correction removes frame interpolation error at emission');
  const shells=art.root.getObjectByName('military-shells');assert.ok(matrixPosition(shells).distanceTo(from)<1e-6,'canonical simulation origin is preserved');
  assert.equal(art.stats.effects.lights,4);assert.ok(art.stats.effects.activeLights>0);
  art.update(.5,{simulation,camera,walkingWeight:1});const u=.25,expected=new THREE.Vector3(from.x+(to.x-from.x)*u,from.y+(to.y-from.y)*u+4*6*u*(1-u),from.z+(to.z-from.z)*u);
  assert.ok(matrixPosition(shells).distanceTo(expected)<1e-6,'effect uses the exact combat duration and parabola, not its preset');
  art.update(0,{simulation,camera,mapBlend:1,night:1});assert.equal(art.stats.effects.activeLights,0,'map aliases do not leave hidden detail lights running');
  const glow=art.mapRoot.getObjectByName('military-glows-map');assert.equal(glow.material.blending,THREE.AdditiveBlending);assert.ok(glow.material.opacity<=.25);
  const shader={vertexShader:THREE.ShaderLib.basic.vertexShader,fragmentShader:THREE.ShaderLib.basic.fragmentShader,uniforms:{}};glow.material.onBeforeCompile(shader);assert.match(shader.fragmentShader,/dot\(vMapGlow,vMapGlow\)/,'map flashes fade toward the edges');
});

test('globe military rigs, map markers and local-frame projectiles agree at high latitude',async t=>{
  const {surfacePoint,surfaceFrame,surfaceOffset,rigidSurfacePoseMatrix,chartHeadingForSurface}=await import('../src/world-surface.js');
  const globe={...world,surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
  const parent=new THREE.Group(),mapParent=new THREE.Group(),art=createMilitaryWorldArt(parent,mapParent,globe,{capacity:8});t.after(()=>art.dispose());
  const unitA=unit('t','tank',{x:1600*Math.PI/2,z:-1600*Math.PI/3,heading:.7,aimYaw:.3,elevation:.2}),units=[unitA],simulation={units,membershipRevision:1,spawnZones:[]};
  const origin=surfacePoint(globe,unitA.x,0,unitA.z),frame=surfaceFrame(globe,unitA.x,unitA.z),camera=new THREE.PerspectiveCamera(50,1,.1,100);
  camera.up.set(0,1,0).transformDirection(frame);camera.position.copy(new THREE.Vector3(0,16,22).applyMatrix4(frame)).add(origin);camera.lookAt(origin);camera.updateMatrixWorld(true);
  art.update(0,{simulation,camera,mapBlend:.5});
  const tank=art.root.getObjectByName('tank-near'),marker=art.mapRoot.getObjectByName('military-map-tank'),matrix=new THREE.Matrix4();tank.getMatrixAt(0,matrix);
  assert.ok(matrixPosition(tank).distanceTo(origin)<1e-4);assert.equal(marker.count,1);
  const scale=new THREE.Vector3().setFromMatrixScale(matrix);assert.ok(scale.distanceTo(new THREE.Vector3(1,1,1))<1e-6,'latitude cannot stretch unit dimensions');
  assert.ok(matrixPosition(marker).distanceTo(surfacePoint(globe,unitA.x,.8,unitA.z))<1e-4);
  const localFrom=getMilitaryMuzzle({...unitA,x:0,y:0,z:0}),localTo={x:8,y:0,z:12},to=surfaceOffset(globe,unitA.x,unitA.z,8,12);to.y=0;
  const effectFrame=rigidSurfacePoseMatrix(globe,unitA.x,unitA.y,unitA.z,chartHeadingForSurface(globe,unitA.x,unitA.z,0));
  art.update(0,{simulation,camera,events:[{type:'shot',unitId:'t',kind:'tank',projectile:'shell',from:{...unitA},to,surfaceOrigin:{x:unitA.x,y:unitA.y,z:unitA.z},localFrom,localTo,duration:1,arcHeight:0}],focus:unitA});
  const shell=art.root.getObjectByName('military-shells');assert.ok(matrixPosition(shell).distanceTo(new THREE.Vector3().copy(localFrom).applyMatrix4(effectFrame))<1e-4);
  assert.ok(art.poseFor('t'));assert.equal(art.poseFor('unknown'),null);
  const opposite=unit('hidden','tank',{x:unitA.x-Math.PI*1600,z:-unitA.z});units.push(opposite);simulation.membershipRevision++;
  art.update(0,{simulation,camera,mapBlend:1});assert.equal(marker.count,1,'the far side of Earth cannot leak city-scale overlays through the globe');
});

test('moving 144 globe avatars preserves weapon elevation when a new vehicle joins the batch',async t=>{
  const {surfaceChartCoordinates,surfaceOffset}=await import('../src/world-surface.js');
  const globe={...world,surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
  const anchor=surfaceChartCoordinates(globe,83,66),art=createMilitaryWorldArt(new THREE.Group(),new THREE.Group(),globe,{capacity:256});t.after(()=>art.dispose());
  const units=Array.from({length:144},(_,i)=>unit(`avatar-${i}`,'soldier',{...surfaceOffset(globe,anchor.x,anchor.z,(i%12)*4,Math.floor(i/12)*4),heading:.7,aimYaw:.2,elevation:.18}));
  const simulation={units,membershipRevision:1,spawnZones:[]};art.update(0,{simulation});
  const firstPose=art.poseFor(units[0].id);
  for(let frame=0;frame<12;frame++){
    for(const u of units){const p=surfaceOffset(globe,u.x,u.z,.04,.025);u.x=p.x;u.z=p.z;u.heading+=.005;u.elevation+=.002;u.moving=true;}
    art.update(1/60,{simulation});
    for(const u of units)for(const key of ['x','y','z','heading','aimYaw','elevation','pitch','roll'])assert.ok(Number.isFinite(art.poseFor(u.id)[key]),`${u.id}.${key} stays finite after surface interpolation`);
  }
  const before=firstPose.elevation;assert.ok(before>.18&&before<units[0].elevation,'barrel elevation is smoothed independently of geographic altitude');
  units.push(unit('recruited-tank','tank',{...surfaceOffset(globe,anchor.x,anchor.z,-6,2),elevation:.14}));simulation.membershipRevision++;
  assert.doesNotThrow(()=>art.update(1/60,{simulation}));assert.equal(art.stats.units,145);assert.equal(art.poseFor(units[0].id),firstPose);
  assert.ok(firstPose.elevation>=before);assert.equal(art.poseFor('recruited-tank').elevation,.14);
  for(const mesh of art.root.getObjectByName('military-assets').children){
    assert.ok(Array.from(mesh.instanceMatrix.array.subarray(0,mesh.count*16)).every(Number.isFinite));
    assert.ok(Array.from(mesh.geometry.attributes.militaryAim.array.subarray(0,mesh.count*4)).every(Number.isFinite));
  }
});
