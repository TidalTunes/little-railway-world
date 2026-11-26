import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createFarmLivestock,farmLivestockPlacements,SHEEP_FOOTPRINT} from '../src/farm-livestock.js';
import {farmRandom,fieldContains,fieldFeatureFootprint} from '../src/farm-layout.js';
import {farmPatch} from '../src/assets.js';
import {extractRigidSurfaceAssets} from '../src/rigid-surface-assets.js';
import {compileDetailPacket} from '../src/detail-compiler.js';
import {createIslandWorld} from '../src/island-world.js';
import {generateWorld,generateWorldRegion,validateWorld} from '../src/world-model.js';
import {surfaceChartCoordinates,surfacePoint,surfaceDisplacement,surfaceHeading} from '../src/world-surface.js';

const globe={surface:{type:'sphere',radius:1600,origin:{longitude:0,latitude:0},complete:true,
  projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
const pasture={x:0,z:0,width:19,depth:14,crop:'pasture',detailSeed:179,feature:'trough',featurePosition:[5,2],
  polygon:[[-9.5,-5],[-6,-7],[8,-7],[9.5,5],[5,7],[-9.5,7]],hedgeEdges:[0,1,2,3,4,5]};
function fixture(){
  const farm={kind:'farm',districtId:'pasture-fixture',x:12,z:8,y:0,rotation:.72,scale:1,width:19,depth:14,parcels:[pasture]};
  farm.livestock=createFarmLivestock(farm);return farm;
}

test('pasture sheep have deterministic room to roam without reaching crops, hedges, troughs or each other',()=>{
  let animals=0,troughs=0;
  for(const seed of ['island-sandbox-v1','pasture-2','pasture-3']){
    const world=generateWorld(createIslandWorld({seed}));
    assert.deepEqual(validateWorld(world),[],'nested livestock preserve complete farm, railway and water reservations');
    for(const farm of world.placements.filter(item=>item.kind==='farm')){
      assert.deepEqual(farm.livestock,createFarmLivestock(farm));
      for(const animal of farm.livestock){
        const field=farm.parcels[animal.parcelIndex],x=animal.x-field.x,z=animal.z-field.z;
        assert.equal(field.crop,'pasture','livestock never trample planted or ploughed fields');
        assert.equal(animal.radius,animal.roamRadius+SHEEP_FOOTPRINT);
        assert.ok(animal.roamRadius>=.65&&animal.roamRadius<=1.45);
        assert.ok(fieldContains(field.polygon,x,z,animal.radius+.3),'the full walkable disk stays beyond the hedgerow and lane');
        const feature=fieldFeatureFootprint(field.polygon,field.feature,field.featurePosition,farmRandom(field.detailSeed));
        if(feature){assert.ok(Math.hypot(x-feature.center[0],z-feature.center[1])>=animal.radius+feature.radius+.2);troughs++;}
        for(const other of farm.livestock.filter(other=>other!==animal))
          assert.ok(Math.hypot(animal.x-other.x,animal.z-other.z)>=animal.radius+other.radius+.24,'even opposite walking phases cannot make sheep overlap');
        animals++;
      }
      for(const [index,field]of farm.parcels.entries())if(field.crop==='pasture'&&field.width>6&&field.depth>6)
        assert.ok(farm.livestock.some(animal=>animal.parcelIndex===index),'usable pastures receive animals without a random spawn chance');
    }
    for(const sheep of world.placements.filter(item=>item.kind==='sheep'))
      assert.equal(sheep.radius,sheep.roamRadius+SHEEP_FOOTPRINT,'wild meadow sheep reserve walking space too');
  }
  assert.ok(animals>20);assert.ok(troughs>0);
});

test('a trough pasture gets a small herd while crops and impossibly thin pens remain empty',()=>{
  const farm=fixture();assert.ok(farm.livestock.length>=3&&farm.livestock.length<=6);
  for(const crop of ['wheat','fallow','orchard','vegetables'])
    assert.deepEqual(createFarmLivestock({...farm,parcels:[{...pasture,crop}]}),[]);
  assert.deepEqual(createFarmLivestock({...farm,parcels:[{...pasture,width:1,depth:10,polygon:[[-.5,-5],[.5,-5],[.5,5],[-.5,5]]}]}),[]);
});

test('authored clockwise pastures and variant-derived feature seeds agree with the rendered trough',()=>{
  for(const variant of [0,1,2,-1,5,2.7])for(const fieldVariant of [undefined,2,-1]){
    const field={...pasture,detailSeed:undefined,featurePosition:undefined,variant:fieldVariant};
    const farm={...fixture(),variant,parcels:[field]},reversed={...farm,parcels:[{...field,polygon:field.polygon.toReversed()}]};
    const animals=createFarmLivestock(farm);
    assert.ok(animals.length>=3);
    assert.deepEqual(createFarmLivestock(reversed),animals,'ring direction does not alter the herd');
    for(const source of [farm,reversed]){
      const rendered=farmPatch(new THREE.Group(),{...source,livestock:[]});
      const trough=rendered.children[0].children.find(child=>child.userData.surfaceAnchor);
      assert.ok(trough,'exercise the renderer-selected fallback trough position');
      for(const animal of animals)
        assert.ok(Math.hypot(animal.x-field.x-trough.position.x,animal.z-field.z-trough.position.z)>=animal.radius+.7+.2,
          `variant ${variant}, parcel variant ${fieldVariant}: movement avoids the actual rendered trough`);
    }
  }
});

test('static and streamed pasture animals share grounded positions on flat and polar worlds',()=>{
  for(const world of [{},globe])for(const scale of [.7,1,1.4]){
    const farm={...fixture(),...(world.surface?surfaceChartCoordinates(world,179.9,76):{}),scale};
    const chart=new THREE.Group(),physical=new THREE.Group(),staticFarm=farmPatch(chart,farm);
    const staticAnimals=staticFarm.children.filter(child=>child.name==='sheep');
    const placements=farmLivestockPlacements(world,farm);
    assert.equal(staticAnimals.length,placements.length);
    if(world.surface)extractRigidSurfaceAssets(chart,physical,world);
    (world.surface?physical:chart).updateMatrixWorld(true);
    const heading=surfaceHeading(world,farm.x,farm.z,farm.rotation),cs=Math.cos(heading),sn=Math.sin(heading);
    for(const [index,animal]of placements.entries()){
      const actual=new THREE.Vector3().setFromMatrixPosition(staticAnimals[index].matrixWorld);
      assert.ok(actual.distanceTo(surfacePoint(world,animal.x,animal.y,animal.z))<1e-8,'fallback and animation start at exactly the same ground position');
      const displacement=surfaceDisplacement(world,farm,animal),local=farm.livestock[index];
      assert.ok(Math.abs((displacement.x*cs-displacement.z*sn)/scale-local.x)<1e-8);
      assert.ok(Math.abs((displacement.x*sn+displacement.z*cs)/scale-local.z)<1e-8);
    }
    const bounds={minX:farm.x-28,maxX:farm.x+28,minZ:farm.z-24,maxZ:farm.z+24};
    const network={...world,outline:[[0,100],[4,100],[4,104],[0,104]],cities:[],players:[],lines:[],mountains:[],stations:[],placements:[]};
    const packet=compileDetailPacket({bounds,placements:[farm]},network);
    assert.equal(packet.lifePlacements.length,placements.length,'nested livestock survive worker packet serialization');
    for(const [index,animal]of packet.lifePlacements.entries()){
      const expected=placements[index];
      assert.equal(animal.id,expected.id);assert.equal(animal.roamRadius,expected.roamRadius);
      assert.equal(animal.radius,expected.radius);assert.equal(animal.x,expected.x);assert.equal(animal.z,expected.z);
    }
    const animated=farmPatch(new THREE.Group(),{...farm,animatedLife:true});
    assert.equal(animated.children.filter(child=>child.name==='sheep').length,0,'streamed geometry does not double-render animated livestock');
  }
});

test('regenerating detail regions retains stable pasture animal identities and positions',()=>{
  const world=generateWorld(createIslandWorld(),{detail:'network'});
  const a=generateWorldRegion(world,{x:0,z:0,size:96}),b=generateWorldRegion(world,{x:-96,z:0,size:96});
  const sheep=region=>region.placements.filter(item=>item.kind==='farm').flatMap(farm=>farmLivestockPlacements(world,farm));
  const first=sheep(a),second=sheep(b);
  assert.ok(first.length+second.length>0);
  assert.deepEqual(sheep(generateWorldRegion(world,{x:-96,z:0,size:96})),second);
  assert.deepEqual(sheep(generateWorldRegion(world,{x:0,z:0,size:96})),first);
  assert.equal(new Set([...first,...second].map(item=>item.id)).size,first.length+second.length);
});
