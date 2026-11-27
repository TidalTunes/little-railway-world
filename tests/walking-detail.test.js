import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Matrix4,Vector3,MeshLambertMaterial,ShaderLib} from 'three';
import {createWalkingDetail,walkingDetailPlan,WALKING_DETAIL_LIMITS} from '../src/walking-detail.js';
import {walkingGrassGeometry,addWalkingVegetationShader} from '../src/walking-vegetation.js';
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
  const shaders=layer.root.children.map(mesh=>{
    const shader={uniforms:{},vertexShader:ShaderLib.lambert.vertexShader,fragmentShader:ShaderLib.lambert.fragmentShader};
    mesh.material.onBeforeCompile(shader,{});return shader;
  });
  for(const visibilityWeight of [0,.2,.8,1,.5]){
    layer.update(focus,{placements,visible:visibilityWeight>0,visibilityWeight});
    assert.equal(layer.stats.builds,builds,'camera dolly weights never rebuild the vegetation');
    assert.deepEqual(layer.root.children.map(mesh=>mesh.instanceMatrix.version),versions);
    for(const shader of shaders){
      assert.equal(shader.uniforms.walkVisibility.value,visibilityWeight);
      assert.match(shader.vertexShader,/transformed \*= detailCoverage/,'all batches shrink continuously with the camera dolly');
    }
  }
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
    assert.ok(Math.abs(x)>=.94+.40-1e-8,'blade envelopes clear the physical 1.88-unit ballast');
    assert.ok(Math.abs(x-8)>=.8+.40-1e-8,'blade envelopes clear the actual 1.6-unit street');
    assert.ok(Math.abs(x+7)>=1.5-1e-8||Math.abs(z-8)>=1.5-1e-8,'ground carpets do not grow through the actual building envelope');
  }
  const second=walkingDetailPlan(world,placements,{x:6,z:0},{cityStreets:streets});
  const byId=new Map(plan.grass.map(item=>[item.id,item]));let overlaps=0;
  for(const item of second.grass)if(byId.has(item.id)){assert.deepEqual(item,byId.get(item.id));overlaps++;}
  assert.ok(overlaps>200,'moving the player does not regenerate the shared ground');
});

test('close range keeps architecture and trunks authoritative, while field detail follows its exact surface pose',()=>{
  const globe={surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
  const focus=surfaceChartCoordinates(globe,179.9,74),home={kind:'house',id:'polar-home',variant:1,...focus,y:.2,scale:1.25,rotation:.6};
  const farm={kind:'farm',id:'polar-field',...focus,y:.2,scale:1.25,rotation:.6,width:5,depth:6,parcels:[{x:0,z:0,width:5,depth:6,crop:'wheat'}]};
  const plan=walkingDetailPlan(globe,[home,farm],focus),layer=createWalkingDetail(new Group(),globe);
  layer.update(focus,{placements:[home,farm],visible:true});
  const mesh=layer.root.getObjectByName('walking-crops'),pose=rigidSurfacePoseMatrix(globe,farm.x,farm.y,farm.z,farm.rotation,new Matrix4()).scale(new Vector3().setScalar(farm.scale));
  for(const [index,item]of plan.crops.entries()){
    const expected=new Vector3(item.x,item.y,item.z).applyMatrix4(pose),actual=new Vector3().setFromMatrixPosition(getMatrix(mesh,index));
    assert.ok(actual.distanceTo(expected)<.0002,'stalks remain locked to the real parcel on the globe');
  }
  assert.equal(plan.grass.length,0,'no stretched latitude grid is introduced on the globe');
  assert.ok(Object.values(plan).flat().every(item=>item.anchor!==home),'no second guessed set of windows, sills, roof trim or roots');
  const center=surfacePoint(globe,farm.x,farm.y,farm.z);assert.ok(new Vector3().setFromMatrixPosition(getMatrix(mesh)).distanceTo(center)<5);
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

test('hard instance budgets hold in dense fields and streamed eviction retires their detail',()=>{
  const fields=Array.from({length:100},(_,i)=>({kind:'farm',id:`field-${i}`,x:(i%10)*.3,z:Math.floor(i/10)*.3,scale:1,width:5,depth:6,parcels:[{x:0,z:0,width:5,depth:6,crop:'wheat'}]}));
  const layer=createWalkingDetail(new Group(),{});layer.update({x:3,z:3},{placements:fields,visible:true});
  assert.equal(layer.root.children.length,4);
  for(const mesh of layer.root.children)assert.ok(mesh.count<=mesh.instanceMatrix.count);
  assert.equal(layer.root.getObjectByName('walking-crops').count,WALKING_DETAIL_LIMITS.crops);
  layer.update({x:3,z:3},{placements:[],revision:1,visible:true});
  assert.equal(layer.stats.instances,0);assert.equal(layer.root.getObjectByName('walking-crops').count,0);
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
  assert.notDeepEqual(matrices(layer),first,'the new house actually clears its grass footprint');
  layer.dispose();
});

test('grass is a continuous carpet in city verges, and only the trunk keeps grass away from trees',()=>{
  const world=meadow();world.cities=[{x:0,z:0,radius:20}];
  const tree={id:'oak',kind:'tree',x:0,z:0,radius:2,scale:1};
  const plan=walkingDetailPlan(world,[tree],{x:0,z:0});
  assert.ok(plan.grass.length>6500,'a dense nearby carpet replaces widely spaced tiny clumps');
  assert.ok(plan.grass.some(item=>Math.hypot(item.anchor.x,item.anchor.z)<1.2),'leaves cast shade over living ground instead of a bare canopy-sized circle');
  for(const item of plan.grass)assert.ok(Math.hypot(item.anchor.x,item.anchor.z)>=.62);
});

test('pastures grow a dense sward, preserve equipment clearances, and huge plots remain local',()=>{
  const field={x:0,z:0,width:3000,depth:3000,crop:'pasture',feature:'trough',featurePosition:[0,0],detailSeed:31};
  const farm={kind:'farm',id:'pasture',x:0,z:0,width:3000,depth:3000,scale:1,parcels:[field]};
  const plan=walkingDetailPlan({},[farm],{x:0,z:0});
  assert.ok(plan.grass.length>7000);assert.ok(plan.grass.length<=WALKING_DETAIL_LIMITS.grass);
  for(const item of plan.grass){
    assert.ok(Math.hypot(item.x,item.z)<29);
    assert.ok(Math.hypot(item.x,item.z)>=1.03,'equipment and player approaches remain bare');
    assert.equal(item.y,.055,'roots touch the exact field surface');
  }
});

test('blade geometry has stationary roots and shared shaders animate only uniforms without transparency',()=>{
  const geometry=walkingGrassGeometry(),positions=geometry.attributes.position;
  assert.equal(geometry.index.count/3,36,'twelve blades cost just 36 triangles per tile');
  assert.equal(Array.from({length:positions.count},(_,i)=>positions.getY(i)).filter(y=>y===0).length,24);
  for(let i=0;i<positions.count;i++)assert.ok(positions.getY(i)>=0&&positions.getY(i)<=1);
  const material=new MeshLambertMaterial(),focus={value:new Vector3()},time={value:2},player={value:new Vector3()};
  addWalkingVegetationShader(material,{focus,time,player},'grass');
  const shader={uniforms:{},vertexShader:ShaderLib.lambert.vertexShader,fragmentShader:ShaderLib.lambert.fragmentShader};
  material.onBeforeCompile(shader,{});
  assert.equal(shader.uniforms.walkTime,time);assert.equal(shader.uniforms.walkPlayer,player);
  assert.match(shader.vertexShader,/rootWeight = position.y \* position.y/);
  assert.match(shader.vertexShader,/dot\(worldWind, normalize\(bladeAxisX\)\)/,'random tile rotation cannot rotate the shared wind direction');
  assert.match(shader.vertexShader,/dot\(worldWind, normalize\(bladeAxisZ\)\)/);
  assert.match(shader.vertexShader,/transformed \*= detailCoverage/);
  assert.doesNotMatch(shader.fragmentShader,/detailDither/,'opaque blades fade their geometry without shimmering alpha masks');
  assert.equal(material.transparent,false);geometry.dispose();material.dispose();
});


test('a newly built settlement lane clears existing grass while keeping the surrounding meadow',()=>{
  const world=meadow(),layer=createWalkingDetail(new Group(),world),focus={x:0,z:0};
  try{
    layer.update(focus,{placements:[],revision:1,cityStreets:[],visible:true});
    const grass=layer.root.getObjectByName('walking-grass'),before=grass.count,builds=layer.stats.builds;
    const path={id:'path:home-2:home-1',width:.45,points:[{x:-10,z:0},{x:10,z:0}]};
    const lanes=[path];layer.update(focus,{placements:[],revision:2,cityStreets:lanes,visible:true});
    assert.equal(layer.stats.builds,builds+1);assert.ok(grass.count<before);assert.ok(grass.count>before*.94);
    const point=new Vector3();
    for(let i=0;i<grass.count;i++){point.setFromMatrixPosition(getMatrix(grass,i));
      if(point.x>=-10&&point.x<=10)assert.ok(Math.abs(point.z)>=path.width/2+.40-1e-6,'all blade envelopes clear the new path');
    }
    const version=grass.instanceMatrix.version;
    layer.update(focus,{placements:[],revision:3,cityStreets:lanes,visible:true});
    assert.equal(grass.instanceMatrix.version,version,'unchanged paths do not upload the grass again');
  }finally{layer.dispose();}
});


test('civic footprint masks rotate with the new buildings and preserve adjacent grass',()=>{
  const building={kind:'civic',buildingType:'market',id:'civic-market',x:0,z:0,width:3.4,depth:2.6,radius:2.15,rotation:.72,scale:1};
  const plan=walkingDetailPlan(meadow(),[building],{x:0,z:0}),c=Math.cos(building.rotation),s=Math.sin(building.rotation);
  for(const item of plan.grass){
    const {x,z}=item.anchor,u=x*c-z*s,v=x*s+z*c;
    assert.ok(Math.abs(u)>=building.width/2+.4||Math.abs(v)>=building.depth/2+.4,'no blades intersect the pavilion envelope');
  }
  assert.ok(plan.grass.some(({anchor:{x,z}})=>Math.hypot(x,z)<2.9),'ground remains alive immediately around the pavilion');
});
