import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleLandscape} from '../src/landscape-field.js';
import {surfaceChartCoordinates,surfaceOffset,surfaceHeading} from '../src/world-surface.js';
import {generateWorld,generateWorldRegion,validateWorld} from '../src/world-model.js';
import {biomeDistance} from '../src/biomes.js';

const sphere=(longitude=0,latitude=0)=>({type:'sphere',radius:1600,complete:true,origin:{longitude,latitude},
  projection:{type:'equirectangular',radius:1600,centralLongitude:longitude,centralLatitude:latitude}});
function landscape(type,extra={}){return{seed:'biome-art',bounds:{width:300,depth:220},
  outline:[[-150,-110],[150,-110],[150,110],[-150,110]],rivers:[],mountains:[],
  cities:[{id:'a',x:-120,z:-80,level:1,radius:4},{id:'b',x:120,z:-80,level:1,radius:4}],
  connections:[{from:'a',to:'b'}],biomes:{ocean:false,sites:[{type,x:0,z:0}]},...extra};}
const keys=['patch','detail','moisture'];
const average=values=>values.reduce((a,b)=>a+b,0)/values.length;

test('the ecological field is seeded, continuous in physical space, and seamless at date line and poles',()=>{
  const world={seed:'ecology',surface:sphere()},target={};
  for(const latitude of [-90,-65,0,65,90]){
    const a=surfaceChartCoordinates(world,-180,latitude),b=surfaceChartCoordinates(world,180,latitude);
    const left=sampleLandscape(world,a.x,a.z),right=sampleLandscape(world,b.x,b.z,target);
    assert.equal(right,target,'the terrain hot path reuses its result object');
    for(const key of keys){assert.ok(left[key]>=0&&left[key]<=1);assert.ok(Math.abs(left[key]-right[key])<1e-12);}
    const adjacent=surfaceOffset(world,a.x,a.z,.15,.15),near=sampleLandscape(world,adjacent.x,adjacent.z);
    for(const key of keys)assert.ok(Math.abs(left[key]-near[key])<.025,'neighboring terrain and objects share continuous districts');
  }
  for(const latitude of [-90,90]){
    const samples=[-170,-60,30,145].map(longitude=>{const p=surfaceChartCoordinates(world,longitude,latitude);return sampleLandscape(world,p.x,p.z);});
    for(const key of keys)assert.ok(samples.every(value=>value[key]===samples[0][key]),'all pole meridians are one place');
  }
  assert.deepEqual(sampleLandscape(structuredClone(world),13,29),sampleLandscape(world,13,29));
  assert.notEqual(sampleLandscape({...world,seed:'another'},13,29).patch,sampleLandscape(world,13,29).patch);
});

test('woodland grows in coherent cores with glades and related species while plains remain predominantly open',()=>{
  const forest=generateWorld(landscape('forest')),plains=generateWorld(landscape('plains'));
  const trees=forest.placements.filter(p=>p.kind==='tree'&&!p.cityId),meadowTrees=plains.placements.filter(p=>p.kind==='tree'&&!p.cityId);
  const land=[];for(let x=-130;x<=130;x+=10)for(let z=-90;z<=90;z+=10)land.push(sampleLandscape(forest,x,z).patch);
  assert.ok(trees.length>200&&trees.length<800,'dense woodland has a bounded canopy budget');
  assert.ok(meadowTrees.length>20&&meadowTrees.length<trees.length*.5,'meadows have occasional groves rather than a second forest');
  assert.ok(average(trees.map(p=>sampleLandscape(forest,p.x,p.z).patch))>average(land)+.08,'trees follow woodland cores instead of uniform scatter');
  const connected=trees.filter(a=>trees.some(b=>a!==b&&Math.hypot(a.x-b.x,a.z-b.z)<2.8));
  assert.ok(connected.length>trees.length*.6,'most woodland crowns have a close neighbor, forming masses rather than evenly spaced dots');
  assert.ok(new Set(trees.map(p=>p.variant)).size>=3,'several related tree families survive the coherent patches');
  assert.ok(forest.placements.some(p=>p.style==='meadow'),'open glades contain low meadow vegetation');
  assert.deepEqual(validateWorld(forest),[]);assert.deepEqual(validateWorld(plains),[]);
});

test('deserts organize dunes and stone districts around the same physical wind without Old World cactus scatter',()=>{
  const desert=generateWorld(landscape('desert',{surface:sphere(12,25)}));
  const nature=desert.placements.filter(p=>p.kind==='nature');
  assert.ok(nature.filter(p=>p.style==='dune').length>10);
  assert.ok(nature.filter(p=>p.style==='outcrop').length>5);
  assert.equal(desert.placements.filter(p=>p.kind==='cactus').length,0,'Sahara scenery uses scrub and rock');
  const sand=average(nature.filter(p=>p.style==='dune').map(p=>sampleLandscape(desert,p.x,p.z).patch));
  const stone=average(nature.filter(p=>p.style==='outcrop').map(p=>sampleLandscape(desert,p.x,p.z).patch));
  assert.ok(stone-sand>.15,'outcrops belong to distinct districts rather than random dune confetti');
  for(const p of nature){
    assert.ok(p.radius>=2&&p.radius<=7);assert.equal(p.scale,1);
    if(p.style==='dune')assert.ok(Math.abs(surfaceHeading(desert,p.x,p.z,p.rotation)-sampleLandscape(desert,p.x,p.z).windAngle)<.15,
      'neighboring dune ridges follow the same prevailing physical direction');
  }
  assert.deepEqual(validateWorld(desert),[]);
});

test('frozen scenery uses contained ice details and regional generation stays repeatable',()=>{
  const config=landscape('plains',{surface:sphere(20,72)});
  config.biomes.sites=[{type:'plains',x:-70,z:0,ice:true},{type:'forest',x:70,z:0}];
  const world=generateWorld(config),frost=world.placements.filter(p=>p.kind==='nature'&&p.style==='frost'&&p.x<0);
  assert.ok(frost.length>5,'frozen land has restrained snow ridges instead of ordinary vegetation');
  for(const p of frost)assert.ok(biomeDistance(world,'ice',p.x,p.z)>=p.radius);
  const network=generateWorld(config,{detail:'network'}),request={x:-64,z:0,size:64};
  assert.deepEqual(generateWorldRegion(network,request),generateWorldRegion(structuredClone(network),request));
  assert.deepEqual(validateWorld(world),[]);
});
