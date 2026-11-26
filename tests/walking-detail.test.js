import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Matrix4,Vector3} from 'three';
import {createWalkingDetail,walkingDetailPlan,WALKING_DETAIL_LIMITS} from '../src/walking-detail.js';
import {surfaceChartCoordinates,surfacePoint,rigidSurfacePoseMatrix} from '../src/world-surface.js';
import {fieldContains,fieldOutline,fieldFeatureFootprint,fieldDetailSeed,farmRandom} from '../src/farm-layout.js';

const ring=[[-100,-100],[100,-100],[100,100],[-100,100],[-100,-100]];
function meadow(){return {seed:'close-test',biomes:{regions:[{type:'plains',polygons:[[ring]]}],oceanShore:[]},cities:[],stations:[],mountains:[],lines:[],rivers:[],cityStreets:[]};}
function matrices(layer){return layer.root.children.map(mesh=>Array.from(mesh.instanceMatrix.array.subarray(0,mesh.count*16)));}
function getMatrix(mesh,index=0){const value=new Matrix4();mesh.getMatrixAt(index,value);return value;}

test('close detail prewarms hidden and changes no source world or strategy placements',()=>{
  const world=meadow(),placements=[{id:'home',kind:'house',variant:1,x:3,z:5,y:0,scale:.8,rotation:.7},
    {id:'oak',kind:'tree',variant:'broadleaf',x:-4,z:3,scale:1.2,radius:1.1}];
  const before=structuredClone({world,placements}),layer=createWalkingDetail(new Group(),world),focus={x:0,z:0};
  for(const batch of layer.root.children){assert.ok(batch.instanceColor,'empty pools allocate colors before shader precompilation');assert.equal(batch.count,0);}
  layer.update(focus,{placements,visible:false});
  assert.equal(layer.root.visible,false);assert.equal(layer.stats.ready,true);assert.ok(layer.stats.instances>500);
  assert.deepEqual({world,placements},before);
  const warm=matrices(layer),builds=layer.stats.builds,versions=layer.root.children.map(mesh=>mesh.instanceMatrix.version);
  layer.update(focus,{placements,visible:true,time:12});
  assert.equal(layer.root.visible,true);assert.equal(layer.stats.builds,builds);
  assert.deepEqual(matrices(layer),warm,'switching view uses exactly the prewarmed instances');
  layer.update({x:1,z:1},{placements,visible:true,time:13});
  assert.deepEqual(layer.root.children.map(mesh=>mesh.instanceMatrix.version),versions,'ordinary movement/wind does not upload geometry');
  layer.dispose();layer.dispose();assert.equal(layer.root.parent,null);
});

test('ground detail is deterministic, excludes real water/rail/road/asset clearances and stays bounded',()=>{
  const world=meadow();world.rivers=[{width:3,points:[{x:-100,z:0},{x:100,z:0}]}];
  world.lines=[{points:[{x:0,z:-100},{x:0,z:100}]}];
  const streets=[{width:1.6,points:[{x:8,z:-50},{x:8,z:50}]}],placements=[{id:'barn',kind:'house',variant:0,x:-7,z:8,radius:2.2,scale:1}];
  const plan=walkingDetailPlan(world,placements,{x:0,z:0},{cityStreets:streets});
  assert.deepEqual(walkingDetailPlan(world,structuredClone(placements),{x:0,z:0},{cityStreets:streets}),plan);
  for(const [kind,items]of Object.entries(plan))assert.ok(items.length<=WALKING_DETAIL_LIMITS[kind]);
  for(const item of [...plan.grass,...plan.flowers,...plan.pebbles].filter(p=>p.id.startsWith('ground:'))){
    const {x,z}=item.anchor;
    assert.ok(Math.abs(z)>=2.55-1e-8,'river channel and sloped banks remain clear');
    assert.ok(Math.abs(x)>=1.45-1e-8,'rails retain their clearance');
    assert.ok(Math.abs(x-8)>=1.8-1e-8,'the real street corridor remains clear');
    assert.ok(Math.hypot(x+7,z-8)>=2.45-1e-8,'ground clumps do not grow through buildings');
  }
  const second=walkingDetailPlan(world,placements,{x:6,z:0},{cityStreets:streets});
  const byId=new Map(plan.grass.map(item=>[item.id,item]));let overlaps=0;
  for(const item of second.grass)if(byId.has(item.id)){assert.deepEqual(item,byId.get(item.id));overlaps++;}
  assert.ok(overlaps>200,'moving the player does not regenerate the shared ground');
});

test('house accents follow the exact authored variant, scale and rigid surface pose',()=>{
  const globe={surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
  const focus=surfaceChartCoordinates(globe,179.9,74),home={kind:'house',id:'polar-home',variant:1,...focus,y:.2,scale:1.25,rotation:.6};
  const plan=walkingDetailPlan(globe,[home],focus),layer=createWalkingDetail(new Group(),globe);
  layer.update(focus,{placements:[home],visible:true});
  const mesh=layer.root.getObjectByName('walking-trim'),pose=rigidSurfacePoseMatrix(globe,home.x,home.y,home.z,home.rotation,new Matrix4()).scale(new Vector3().setScalar(home.scale));
  for(const [index,item]of plan.trim.entries()){
    const expected=new Vector3(item.x,item.y,item.z).applyMatrix4(pose),actual=new Vector3().setFromMatrixPosition(getMatrix(mesh,index));
    assert.ok(actual.distanceTo(expected)<.0002,'detail remains locked to the real building on the globe');
  }
  assert.equal(plan.grass.length,0,'no stretched latitude grid is introduced on the globe');
  assert.equal(plan.trim.find(p=>p.id.endsWith('mullion:-1')).x,-1.62*.29);
  const center=surfacePoint(globe,home.x,home.y,home.z);assert.ok(new Vector3().setFromMatrixPosition(getMatrix(mesh)).distanceTo(center)<3);
  layer.dispose();
});

test('field stalks preserve parcel polygons, painted row spacing and trough clearance',()=>{
  const field={x:0,z:0,width:8,depth:10,crop:'wheat',rowsAngle:0,rowPitch:1.35,detailSeed:731,feature:'trough',featurePosition:[0,0]};
  const farm={kind:'farm',id:'field',x:1,z:2,width:8,depth:10,rotation:.8,scale:1.2,parcels:[field]};
  const plan=walkingDetailPlan({},[farm],{x:1,z:2}),points=fieldOutline(field);
  const feature=fieldFeatureFootprint(points,field.feature,field.featurePosition,farmRandom(fieldDetailSeed(field)));
  assert.ok(plan.crops.length>50);
  const low=-field.depth/2+.25,high=field.depth/2-.25,count=Math.round((high-low)/field.rowPitch),pitch=(high-low)/count;
  for(const p of plan.crops){
    assert.equal(p.anchor,farm);assert.ok(fieldContains(points,p.x,p.z,.20));
    assert.ok(Math.hypot(p.x-feature.center[0],p.z-feature.center[1])>=feature.radius+.20);
    const row=(p.z-low)/pitch-.5;
    assert.ok(Math.abs(row-Math.round(row))<1e-8,'individual stalks coincide with the actual broad painted rows');
  }
});

test('hard instance budgets hold in dense scenery and streamed eviction retires asset ornament',()=>{
  const homes=Array.from({length:1000},(_,i)=>({kind:'house',id:`home-${i}`,variant:i%4,x:(i%32)*.3,z:Math.floor(i/32)*.3,scale:1}));
  const layer=createWalkingDetail(new Group(),{});layer.update({x:3,z:3},{placements:homes,visible:true});
  assert.equal(layer.root.children.length,7);
  for(const mesh of layer.root.children)assert.ok(mesh.count<=mesh.instanceMatrix.count);
  assert.equal(layer.root.getObjectByName('walking-trim').count,WALKING_DETAIL_LIMITS.trim);
  layer.update({x:3,z:3},{placements:[],revision:1,visible:true});
  assert.equal(layer.stats.instances,0);assert.equal(layer.root.getObjectByName('walking-trim').count,0);
  layer.dispose();
});


test('distant streamed publications preserve cached close detail while nearby source changes refresh it',()=>{
  const world=meadow(),home={id:'near',kind:'house',variant:0,x:2,z:4,scale:1};
  const street={width:1,points:[{x:3,z:-8},{x:3,z:8}]};
  const layer=createWalkingDetail(new Group(),world),focus={x:0,z:0};
  layer.update(focus,{placements:[home],cityStreets:[street],revision:1});
  const first=matrices(layer),builds=layer.stats.builds;
  const distant={id:'other-continent',kind:'house',variant:2,x:10000,z:10000,scale:1};
  const remoteStreet={width:1,points:[{x:10000,z:9000},{x:10000,z:12000}]};
  layer.update(focus,{placements:[distant,home],cityStreets:[remoteStreet,street],revision:2,visible:true});
  assert.equal(layer.stats.builds,builds,'a global streaming revision does not regenerate the local landscape');
  assert.deepEqual(matrices(layer),first);
  const nearby={id:'neighbor',kind:'house',variant:1,x:-4,z:3,scale:1};
  layer.update(focus,{placements:[distant,home,nearby],cityStreets:[remoteStreet,street],revision:3,visible:true});
  assert.equal(layer.stats.builds,builds+1,'a newly resident nearby source really does refresh decorations and exclusion masks');
  assert.ok(layer.root.getObjectByName('walking-trim').count>12);
  layer.dispose();
});
