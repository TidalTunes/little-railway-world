import test from 'node:test';
import assert from 'node:assert/strict';
import {Color,Group,Matrix4,Vector3} from 'three';
import {createMilitaryEffects} from '../src/military-effects.js';

const from={x:1,y:2,z:3},to={x:8,y:0,z:12};
function fixture(options){
  const parent=new Group(),effects=createMilitaryEffects(parent,options),root=parent.getObjectByName('military-effects');
  return {parent,effects,root,dispose:()=>effects.dispose()};
}
function renderState(root){
  return root.children.map(mesh=>({name:mesh.name,count:mesh.count,visible:mesh.visible,
    matrices:[...mesh.instanceMatrix.array.slice(0,mesh.count*16)],
    colors:[...(mesh.instanceColor?.array.slice(0,mesh.count*3)??[])],
    opacity:[...mesh.geometry.getAttribute('effectOpacity').array.slice(0,mesh.count)]}));
}
function positionAt(mesh,index=0){const matrix=new Matrix4();mesh.getMatrixAt(index,matrix);return new Vector3().setFromMatrixPosition(matrix);}
const near=(a,b,tolerance=1e-5)=>assert.ok(Math.abs(a-b)<tolerance,`${a} differs from ${b}`);

test('projectiles have fixed travel times, reach the requested endpoint once, and leave only cosmetic records',()=>{
  const durations={tracer:.3,shell:.7,arc:1.4,rocket:.8};
  for(const [kind,duration]of Object.entries(durations)){
    const f=fixture();
    try{
      const shot=f.effects.fire({kind,from,to,surface:'grass'});assert.deepEqual(shot,{ok:true,id:1,duration});
      assert.equal(f.effects.stats.projectiles,1);assert.equal(f.effects.stats.impacts,0);
      assert.equal(f.effects.stats.drawCalls,0,'bursts defer uploads to the explicit update');
      f.effects.update(0);assert.ok(f.effects.stats.drawCalls>0);
      f.effects.update(duration/2);
      const batch=f.root.getObjectByName(kind==='tracer'?'military-flashes':kind==='rocket'?'military-rockets':'military-shells');
      const midpoint=positionAt(batch);near(midpoint.x,(from.x+to.x)/2);near(midpoint.z,(from.z+to.z)/2);
      assert.ok(kind==='arc'?midpoint.y>(from.y+to.y)/2+1:Math.abs(midpoint.y-(from.y+to.y)/2)<1e-5);
      f.effects.update(duration/2);
      assert.equal(f.effects.stats.projectiles,0);assert.equal(f.effects.stats.impacts,1);
      assert.deepEqual(f.effects.stats.lastImpact,{id:shot.id,kind,surface:'grass',...to,time:duration});
      f.effects.update(20);assert.equal(f.effects.stats.impacts,1);assert.equal(f.effects.stats.active,0);assert.equal(f.effects.stats.drawCalls,0);
      assert.equal(f.parent.children.length,1,'no environment geometry is modified or added outside the effect group');
    }finally{f.dispose();}
  }
});

test('coincident endpoints remain finite and input positions are copied at emission',()=>{
  const f=fixture();
  try{
    const point={x:4,y:1,z:-2};
    for(const kind of ['tracer','shell','arc','rocket'])assert.equal(f.effects.fire({kind,from:point,to:point}).ok,true);
    point.x=NaN;point.y=Infinity;f.effects.update(.15);
    for(const batch of renderState(f.root))assert.ok(batch.matrices.every(Number.isFinite));
    f.effects.update(2);assert.equal(f.effects.stats.impacts,4);
    assert.equal(f.effects.stats.lastImpact.x,4);assert.equal(f.effects.stats.lastImpact.y,1);assert.equal(f.effects.stats.lastImpact.z,-2);
  }finally{f.dispose();}
});

test('fixed-time smoke, impacts, particle movement and recycling are independent of update chunk size',()=>{
  const a=fixture({maxProjectiles:8,maxParticles:23,maxMarks:4}),b=fixture({maxProjectiles:8,maxParticles:23,maxMarks:4});
  try{
    for(const f of [a,b]){
      for(const kind of ['rocket','shell','arc','tracer'])f.effects.fire({kind,from,to,surface:'sand'});
      f.effects.contact({kind:'rotor',position:to,heading:.7,strength:1.2,surface:'sand'});
      f.effects.update(0);
    }
    for(const end of [.5,1,1.5,2,5]){
      a.effects.update(end-a.effects.stats.time);
      while(b.effects.stats.time<end)b.effects.update(Math.min(.125,end-b.effects.stats.time));
      assert.deepEqual(a.effects.stats,b.effects.stats);assert.deepEqual(renderState(a.root),renderState(b.root));
    }
    assert.equal(a.effects.stats.impacts,4);assert.equal(a.effects.stats.active,0);
  }finally{a.dispose();b.dispose();}
});

test('all pools stay bounded during thousands of requests and recycle oldest shots instead of inventing impacts',()=>{
  const f=fixture({maxProjectiles:3,maxParticles:9,maxMarks:2});
  try{
    const meshes=[...f.root.children],geometries=meshes.map(mesh=>mesh.geometry),materials=meshes.map(mesh=>mesh.material);
    for(let i=0;i<2000;i++){
      assert.equal(f.effects.fire({kind:'tracer',from,to:{x:i/10,y:0,z:0}}).ok,true);
      f.effects.contact({kind:'track',position:{x:i/10,y:0,z:0}});
    }
    assert.equal(f.effects.stats.projectiles,3);assert.equal(f.effects.stats.particles,9);assert.equal(f.effects.stats.marks,2);
    assert.equal(f.effects.stats.recycled.projectiles,1997);assert.ok(f.effects.stats.recycled.particles>0);assert.ok(f.effects.stats.recycled.marks>0);
    assert.equal(f.effects.stats.impacts,0);assert.equal(f.effects.stats.drawCalls,0);
    f.effects.update(0);assert.ok(f.effects.stats.drawCalls<=6);
    assert.deepEqual(f.root.children,meshes);assert.deepEqual(f.root.children.map(mesh=>mesh.geometry),geometries);assert.deepEqual(f.root.children.map(mesh=>mesh.material),materials);
    for(const mesh of meshes)assert.ok(mesh.count<=mesh.instanceMatrix.count);
    f.effects.update(.3);assert.equal(f.effects.stats.impacts,3,'only the three retained projectiles arrive');
    near(f.effects.stats.lastImpact.x,199.9);
    f.effects.update(1000);assert.equal(f.effects.stats.active,0);assert.equal(f.effects.stats.impacts,3);
  }finally{f.dispose();}
});

test('large pools reuse partially expired slots deterministically across bitset boundaries',()=>{
  const a=fixture({maxProjectiles:3,maxParticles:1057,maxMarks:1057}),b=fixture({maxProjectiles:3,maxParticles:1057,maxMarks:1057});
  try{
    for(const f of [a,b]){
      for(let i=0;i<3;i++)f.effects.fire({kind:'arc',from,to});
      for(let i=0;i<1200;i++)f.effects.contact({kind:'footstep',position:{x:i,y:0,z:0}});
      assert.equal(f.effects.stats.particles,1057);assert.equal(f.effects.stats.marks,1057);
      assert.equal(f.effects.stats.recycled.marks,143);
    }
    a.effects.update(2);for(let i=0;i<16;i++)b.effects.update(.125);
    assert.deepEqual(a.effects.stats,b.effects.stats);assert.deepEqual(renderState(a.root),renderState(b.root));
    assert.equal(a.effects.stats.projectiles,0);assert.equal(a.effects.stats.marks,3);
    for(const f of [a,b]){
      for(let i=0;i<40;i++)f.effects.contact({kind:'track',position:{x:i,y:0,z:1}});
      for(let i=0;i<3;i++)f.effects.fire({kind:'shell',from,to});
      f.effects.update(0);assert.equal(f.effects.stats.marks,83);assert.equal(f.effects.stats.projectiles,3);
    }
    assert.deepEqual(a.effects.stats,b.effects.stats);assert.deepEqual(renderState(a.root),renderState(b.root));
    for(const f of [a,b]){
      f.effects.clear();assert.equal(f.effects.stats.active,0);
      f.effects.contact({kind:'track',position:to});f.effects.update(0);assert.equal(f.effects.stats.marks,2);
    }
    assert.deepEqual(renderState(a.root),renderState(b.root));
  }finally{a.dispose();b.dispose();}
});

test('oldest recycling retains newer firing requests across staggered times',()=>{
  const f=fixture({maxProjectiles:2});
  try{
    f.effects.fire({kind:'arc',from,to:{x:10,y:0,z:0}});f.effects.update(.1);
    f.effects.fire({kind:'arc',from,to:{x:20,y:0,z:0}});f.effects.update(.1);
    const newest=f.effects.fire({kind:'arc',from,to:{x:30,y:0,z:0}});f.effects.update(2);
    assert.equal(f.effects.stats.impacts,2);assert.equal(f.effects.stats.lastImpact.id,newest.id);
    assert.equal(f.effects.stats.lastImpact.x,30);assert.equal(f.effects.stats.recycled.projectiles,1);
  }finally{f.dispose();}
});

test('water impacts splash, stone impacts chip, and only rockets leave a smoke trail',()=>{
  const a=fixture(),b=fixture(),water=fixture(),stone=fixture();
  try{
    a.effects.fire({kind:'shell',from,to});b.effects.fire({kind:'rocket',from,to});a.effects.update(.4);b.effects.update(.4);
    assert.equal(a.effects.stats.particles,0,'shell muzzle flashes expire without generating smoke');assert.ok(b.effects.stats.particles>=4);
    for(const [f,surface]of [[water,'water'],[stone,'stone']]){
      f.effects.fire({kind:'shell',from,to,surface});f.effects.update(.7);
      assert.equal(f.effects.stats.impacts,1);assert.equal(f.effects.stats.marks,1);assert.equal(f.effects.stats.lastImpact.surface,surface);
      const mesh=f.root.getObjectByName('military-particles');assert.equal(mesh.count,8);
      f.effects.update(.2);for(let i=0;i<mesh.count;i++)assert.ok(positionAt(mesh,i).y>=to.y,'debris never drops beneath its contact surface');
    }
    assert.notDeepEqual(renderState(water.root),renderState(stone.root),'surface-specific colors, silhouettes and lifetimes remain distinct');
  }finally{a.dispose();b.dispose();water.dispose();stone.dispose();}
});

test('footsteps, track pairs and rotor downwash honor heading, surface, and bounded strength',()=>{
  const f=fixture();
  try{
    assert.equal(f.effects.contact({kind:'footstep',position:to,heading:0}).ok,true);assert.equal(f.effects.stats.marks,1);
    f.effects.clear();f.effects.contact({kind:'track',position:to,heading:Math.PI/2,strength:1});f.effects.update(0);
    const marks=f.root.getObjectByName('military-marks');assert.equal(marks.count,2);
    const left=positionAt(marks,0),right=positionAt(marks,1);near(left.x,to.x);near(right.x,to.x);near(Math.abs(left.z-right.z),.46);
    f.effects.clear();f.effects.contact({kind:'track',position:to,surface:'water'});f.effects.update(0);
    assert.equal(f.effects.stats.marks,0,'water contacts leave no persistent wheel print');assert.ok(f.effects.stats.particles>0);
    f.effects.clear();f.effects.contact({kind:'rotor',position:to,strength:1e100,surface:'sand'});f.effects.update(0);
    assert.equal(f.effects.stats.particles,24,'art strength is clamped before allocating particles');assert.equal(f.effects.stats.marks,0);
    const particle=f.root.getObjectByName('military-particles');
    for(let i=0;i<particle.count;i++)assert.ok(positionAt(particle,i).distanceTo(new Vector3(to.x,to.y,to.z))>2);
    f.effects.update(5);assert.equal(f.effects.stats.active,0);
  }finally{f.dispose();}
});

test('invalid inputs and nonpositive or nonfinite dt cannot advance or corrupt active effects',()=>{
  const f=fixture();
  try{
    for(const input of [null,{}, {kind:'beam',from,to},{kind:'shell',from:{x:0,y:NaN,z:0},to},
      {kind:'shell',from,to:{x:Infinity,y:0,z:0}},{kind:'shell',from,to,surface:'lava'},
      {kind:'shell',from,to,color:'not-a-color'},{kind:'shell',from,to,color:new Color(NaN,0,0)}])assert.equal(f.effects.fire(input).ok,false);
    for(const input of [null,{}, {kind:'rotor',position:from,heading:Infinity},{kind:'track',position:from,strength:-1},
      {kind:'track',position:from,strength:NaN},{kind:'footstep',position:from,surface:'sky'}])assert.equal(f.effects.contact(input).ok,false);
    assert.equal(f.effects.stats.active,0);assert.equal(f.effects.stats.fired,0);assert.equal(f.effects.stats.contacts,0);
    f.effects.fire({kind:'rocket',from,to,color:'#aabbcc'});f.effects.update(0);const before=f.effects.stats,render=renderState(f.root);
    for(const dt of [0,-1,NaN,Infinity,-Infinity,undefined]){f.effects.update(dt);assert.deepEqual(f.effects.stats,before);assert.deepEqual(renderState(f.root),render);}
    f.effects.update(1e100);assert.equal(f.effects.stats.active,0);assert.equal(f.effects.stats.impacts,1);assert.ok(Number.isFinite(f.effects.stats.time));
    f.effects.update(Number.MAX_VALUE);assert.ok(Number.isFinite(f.effects.stats.time));
  }finally{f.dispose();}
});

test('zero budgets disable optional layers, and unsafe capacities are rejected before attaching anything',()=>{
  const f=fixture({maxProjectiles:1,maxParticles:0,maxMarks:0});
  try{
    assert.equal(f.effects.fire({kind:'arc',from,to}).ok,true);f.effects.update(0);assert.equal(f.effects.stats.drawCalls,2);
    assert.equal(f.effects.stats.particles,0);f.effects.update(5);assert.equal(f.effects.stats.impacts,1);assert.equal(f.effects.stats.active,0);
  }finally{f.dispose();}
  const disabled=fixture({maxProjectiles:0,maxParticles:0,maxMarks:0});
  try{assert.equal(disabled.effects.fire({kind:'shell',from,to}).code,'capacity-zero');disabled.effects.contact({kind:'rotor',position:from});disabled.effects.update(1);assert.equal(disabled.effects.stats.active,0);}finally{disabled.dispose();}
  const parent=new Group();
  for(const options of [{maxProjectiles:-1},{maxParticles:1.5},{maxMarks:Infinity},{maxParticles:100000000}])assert.throws(()=>createMilitaryEffects(parent,options),RangeError);
  assert.equal(parent.children.length,0);assert.throws(()=>createMilitaryEffects(null),TypeError);
});

test('materials compose per-instance fade with the shared scene styling',()=>{
  const f=fixture();
  try{
    for(const mesh of f.root.children){
      assert.equal(mesh.isInstancedMesh,true);assert.ok(mesh.material.isMeshStandardMaterial||mesh.material.isMeshBasicMaterial);
      assert.equal(mesh.material.userData.sceneStyle,mesh.material.isMeshBasicMaterial?'lamp':'asset');assert.equal(mesh.material.depthWrite,false);
      const shader={uniforms:{},vertexShader:'#include <begin_vertex>\n#include <project_vertex>',fragmentShader:'#include <color_fragment>\n#include <opaque_fragment>'};
      mesh.material.onBeforeCompile(shader,null);
      assert.match(shader.vertexShader,/effectOpacity/);assert.match(shader.fragmentShader,/diffuseColor.a \*= vEffectOpacity/);
      assert.ok(shader.uniforms.worldNight);assert.ok(shader.uniforms.worldTime);
    }
  }finally{f.dispose();}
});

test('authored ballistic timing and apex reach the same landing point without early impact',()=>{
  const f=fixture();
  try{
    assert.equal(f.effects.fire({kind:'arc',from,to,duration:2.4,arcHeight:7}).duration,2.4);
    f.effects.update(1.2);near(positionAt(f.root.getObjectByName('military-shells')).y,8);
    f.effects.update(1);assert.equal(f.effects.stats.impacts,0);
    f.effects.update(.2);assert.equal(f.effects.stats.impacts,1);assert.equal(f.effects.stats.lastImpact.time,2.4);
    for(const input of [{duration:0},{duration:NaN},{arcHeight:-1},{arcHeight:Infinity}])assert.equal(f.effects.fire({kind:'arc',from,to,...input}).ok,false);
  }finally{f.dispose();}
});

test('bright shots and explosions share four unshadowed lights that clear, cull and dispose',()=>{
  const f=fixture({maxLights:4}),lights=f.parent.children.filter(node=>node.isPointLight);
  try{
    assert.equal(lights.length,4);assert.ok(lights.every(light=>!light.castShadow));
    for(let i=0;i<30;i++)f.effects.fire({kind:'shell',from:{x:i,y:1,z:0},to:{x:i+10,y:0,z:0}});
    f.effects.update(.02,{focus:{x:0,z:0}});assert.equal(f.effects.stats.activeLights,4);assert.ok(lights.some(light=>light.intensity>5));
    const glow=f.root.getObjectByName('military-glows');assert.ok(glow.count>0);assert.equal(glow.material.toneMapped,false);
    f.effects.update(.7,{focus:{x:20,z:0}});assert.ok(f.effects.stats.activeLights>0);assert.ok(f.root.getObjectByName('military-flashes').count>0,'landings create bright expanding fireballs');
    f.effects.update(0,{focus:{x:1000,z:1000}});assert.equal(f.effects.stats.activeLights,0);
    f.effects.update(0,{focus:{x:20,z:0},mapBlend:1});assert.equal(f.effects.stats.activeLights,0);
    f.effects.update(0,{focus:{x:20,z:0},reducedMotion:true});assert.equal(f.effects.stats.activeLights,0);
    f.effects.clear();assert.equal(f.effects.stats.activeLights,0);assert.deepEqual(f.parent.children.filter(node=>node.isPointLight),lights);
  }finally{f.dispose();}
  assert.equal(f.parent.children.length,0);
});

test('impact marks sit on terrain and airborne explosions leave no floating decal',()=>{
  const f=fixture();
  try{
    f.effects.fire({kind:'shell',from,to:{x:10,y:.6,z:0},groundY:.1});f.effects.update(.7);
    assert.equal(f.effects.stats.marks,1);near(positionAt(f.root.getObjectByName('military-marks')).y,.118);
    f.effects.clear();f.effects.fire({kind:'rocket',from,to:{x:10,y:5,z:0},groundY:.1});f.effects.update(.8);
    assert.equal(f.effects.stats.marks,0);assert.ok(f.effects.stats.particles>0);
    assert.equal(f.effects.fire({kind:'shell',from,to,groundY:NaN}).ok,false);
  }finally{f.dispose();}
});

test('clear cancels pending effects and disposal releases every owned GPU resource exactly once',()=>{
  const f=fixture(),resources=new Set(f.root.children.flatMap(mesh=>[mesh,mesh.geometry,mesh.material])),counts=new Map();
  for(const resource of resources){counts.set(resource,0);resource.addEventListener('dispose',()=>counts.set(resource,counts.get(resource)+1));}
  f.effects.fire({kind:'rocket',from,to});f.effects.update(.1);assert.ok(f.effects.stats.active>0);
  f.effects.clear();assert.equal(f.effects.stats.active,0);assert.equal(f.effects.stats.drawCalls,0);f.effects.update(5);assert.equal(f.effects.stats.impacts,0);
  f.effects.fire({kind:'shell',from,to});f.effects.update(0);f.effects.dispose();f.effects.dispose();
  assert.equal(f.effects.stats.disposed,true);assert.equal(f.effects.stats.active,0);assert.equal(f.parent.children.length,0);
  for(const value of counts.values())assert.equal(value,1);
  assert.equal(f.effects.fire({kind:'shell',from,to}).code,'disposed');assert.equal(f.effects.contact({kind:'rotor',position:to}).code,'disposed');
  const before=f.effects.stats;f.effects.update(10);f.effects.clear();assert.deepEqual(f.effects.stats,before);
});

test('surface-local trajectories, debris and lights retain their copied rigid emission frame',t=>{
  const parent=new Group(),effects=createMilitaryEffects(parent,{maxProjectiles:2,maxParticles:32,maxMarks:4,maxLights:4});t.after(()=>effects.dispose());
  const transform=new Matrix4().makeRotationZ(Math.PI/2).setPosition(100,-20,10),original=transform.clone();
  effects.fire({kind:'arc',from:{x:0,y:0,z:0},to:{x:0,y:0,z:10},duration:1,arcHeight:2,groundY:0,transform});
  transform.identity();effects.update(.5,{focus:{x:100,y:-20,z:15}});
  const matrix=new Matrix4(),point=new Vector3();effects.root.getObjectByName('military-shells').getMatrixAt(0,matrix);point.setFromMatrixPosition(matrix);
  assert.ok(point.distanceTo(new Vector3(0,2,5).applyMatrix4(original))<1e-6,'the parabola rises along local radial up, not global Y');
  assert.ok(effects.stats.activeLights>0);
  effects.update(.5,{focus:{x:100,y:-20,z:20}});const marks=effects.root.getObjectByName('military-marks');marks.getMatrixAt(0,matrix);
  assert.ok(new Vector3().setFromMatrixPosition(matrix).distanceTo(new Vector3(0,.018,10).applyMatrix4(original))<1e-5,'impact decals retain the curved-world frame');
  assert.equal(effects.stats.impacts,1);
});
