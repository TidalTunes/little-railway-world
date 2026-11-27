import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,ShaderLib} from 'three';
import {walkingFlowerGeometry} from '../src/walking-flowers.js';
import {createWalkingDetail,walkingDetailPlan,WALKING_DETAIL_LIMITS} from '../src/walking-detail.js';

const ring=[[-100,-100],[100,-100],[100,100],[-100,100],[-100,-100]];
const meadow=()=>({seed:'flower-test',biomes:{regions:[{type:'plains',polygons:[[ring]]}],oceanShore:[]},cities:[],stations:[],mountains:[],lines:[],rivers:[],cityStreets:[]});

test('flowers have attached stems, folded leaves, five petals and a raised pollen centre in one small mesh',()=>{
  const geometry=walkingFlowerGeometry(),p=geometry.attributes.position,n=geometry.attributes.normal,mask=geometry.attributes.flowerPetal,color=geometry.attributes.color;
  assert.equal(geometry.index.count/3,39,'more readable flowers still cost fewer than forty triangles');
  assert.equal(p.count,mask.count);assert.equal(p.count,color.count);
  let roots=0,petalVertices=0,nonPetalVertices=0;
  for(let i=0;i<p.count;i++){
    assert.ok(p.getY(i)>=0&&p.getY(i)<=1,'the entire plant grows from its authored ground point');
    if(p.getY(i)===0)roots++;
    if(i<18)assert.ok(n.getX(i)*(p.getX(i)-.045*p.getY(i)/.94)+n.getZ(i)*p.getZ(i)>0,'stem normals point outward');
    else assert.ok(n.getY(i)>0,'leaves, petals and pollen receive daylight on their upper surface');
    if(mask.getX(i)){
      petalVertices++;assert.ok(p.getY(i)>.88,'instance tint only touches the flower head');
    }else nonPetalVertices++;
  }
  assert.equal(petalVertices,5*4*3,'five folded petals each use four triangles');
  assert.ok(roots>=6);assert.ok(nonPetalVertices>30);geometry.dispose();
});

test('flower clumps are deterministic, locally grouped, fixed to the ground and bounded across movement',()=>{
  const world=meadow(),plan=walkingDetailPlan(world,[],{x:0,z:0}),cache=new Map();
  const cached=walkingDetailPlan(world,[],{x:0,z:0},{groundCache:cache});
  assert.deepEqual(cached.flowers,plan.flowers);assert.ok(plan.flowers.length>70);
  assert.ok(plan.flowers.length<=WALKING_DETAIL_LIMITS.flowers);
  const groups=new Map();
  for(const bloom of plan.flowers){
    if(!groups.has(bloom.clump))groups.set(bloom.clump,[]);groups.get(bloom.clump).push(bloom);
    assert.equal(bloom.y,0);assert.equal(bloom.anchor.y,-.002,'stem starts at the real terrain, not the grass tips');
    assert.ok(bloom.sy>=.25&&bloom.sy<=.36);
  }
  assert.ok(groups.size>7&&groups.size<25);
  for(const group of groups.values()){
    assert.ok(group.length>=3&&group.length<=9);
    for(const a of group)for(const b of group)assert.ok(Math.hypot(a.anchor.x-b.anchor.x,a.anchor.z-b.anchor.z)<=2);
    assert.equal(new Set(group.map(p=>p.color)).size,1,'each patch reads as a coherent plant family');
  }
  const byId=new Map(plan.flowers.map(p=>[p.id,p]));let shared=0;
  for(const bloom of walkingDetailPlan(world,[],{x:6,z:0},{groundCache:cache}).flowers)if(byId.has(bloom.id)){
    assert.deepEqual(bloom,byId.get(bloom.id));shared++;
  }
  assert.ok(shared>30,'moving the camera preserves individual plants');
});

test('flower clusters respect water, rail, street, field and rotated civic clearances',()=>{
  const world=meadow();world.rivers=[{width:3,points:[{x:-100,z:0},{x:100,z:0}]}];
  world.lines=[{points:[{x:0,z:-100},{x:0,z:100}]}];
  const streets=[{width:1.6,points:[{x:8,z:-50},{x:8,z:50}]}];
  const market={id:'market',kind:'civic',buildingType:'market',x:-7,z:8,width:3.4,depth:2.6,rotation:.72,radius:2.2};
  const farm={id:'crop',kind:'farm',x:-7,z:-9,width:6,depth:7,rotation:0,parcels:[{width:6,depth:7,crop:'wheat'}]};
  const plan=walkingDetailPlan(world,[market,farm],{x:0,z:0},{cityStreets:streets});assert.ok(plan.flowers.length>30);
  for(const {anchor:{x,z}}of plan.flowers){
    assert.ok(Math.abs(z)>=2.55);assert.ok(Math.abs(x)>=1.34);assert.ok(Math.abs(x-8)>=1.2);
    const dx=x-market.x,dz=z-market.z,u=dx*Math.cos(.72)-dz*Math.sin(.72),v=dx*Math.sin(.72)+dz*Math.cos(.72);
    assert.ok(Math.abs(u)>=2.1||Math.abs(v)>=1.7,'flower heads clear the rotated pavilion');
    assert.ok(Math.abs(x-farm.x)>=3.4||Math.abs(z-farm.z)>=3.9,'no flowers sprout through crop ribbons');
  }
});

test('flower colours preserve green stems, root-fixed wind and one unchanged instance upload while moving',()=>{
  const layer=createWalkingDetail(new Group(),meadow());
  try{
    const placements=[];layer.update({x:0,z:0},{placements,visible:true});
    const flowers=layer.root.getObjectByName('walking-flowers'),version=flowers.instanceMatrix.version;
    assert.ok(flowers.count>0);assert.equal(layer.root.children.length,4,'flowers share one existing draw call');
    assert.equal(flowers.material.vertexColors,true);assert.equal(flowers.material.transparent,false);
    const shader={uniforms:{},vertexShader:ShaderLib.lambert.vertexShader,fragmentShader:ShaderLib.lambert.fragmentShader};
    flowers.material.onBeforeCompile(shader,{});
    assert.match(shader.vertexShader,/mix\(vec3\(1.0\), instanceColor.rgb, flowerPetal\)/);
    assert.match(shader.vertexShader,/rootWeight = position.y \* position.y/);
    layer.update({x:.2,z:.1},{placements,visible:true,time:2});
    assert.equal(shader.uniforms.walkTime.value,2);assert.equal(flowers.instanceMatrix.version,version);
  }finally{layer.dispose();}
});
