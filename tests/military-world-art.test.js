import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createMilitaryWorldArt} from '../src/military-world-art.js';
import {militaryColors} from '../src/military-palette.js';

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
  const events=Array.from({length:50},(_,i)=>({type:'shot',unitId:'a',ownerId:'teal',kind:'tank',projectile:'shell',from:{x:0,y:1,z:0},to:{x:i*.01,y:0,z:5}}));
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
