import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createEarthWorld,projectEarth,EARTH_RADIUS} from '../src/earth-world.js';
import {terrainColor} from '../src/terrain-colors.js';
import {createGlobeLandField,landEcoregion} from '../src/globe-land-colors.js';

const earth=createEarthWorld(),sample=(world,longitude,latitude,map=false)=>{
  const p=projectEarth(longitude,latitude);return terrainColor(world,p.x,p.z,{map});
};
const distance=(a,b)=>Math.hypot(a.r-b.r,a.g-b.g,a.b-b.b);

test('Earth uses coherent vegetation families while retaining its exact placement biome sites',()=>{
  const families=new Set(earth.biomes.sites.map(site=>site.ecoregion));
  for(const family of ['tropical','woodland','taiga','tundra','savanna','steppe','mediterranean','cropland','desert','ice'])assert.ok(families.has(family),family);
  assert.equal(landEcoregion({type:'forest',latitude:10}),'tropical');
  assert.equal(landEcoregion({type:'forest',latitude:45}),'woodland');
  assert.equal(landEcoregion({type:'forest',latitude:60}),'taiga');
  assert.equal(landEcoregion({type:'plains',latitude:74}),'tundra');
  assert.ok(earth.biomes.sites.every(site=>['forest','farmland','plains','desert'].includes(site.type)),'visual families never change asset placement masks');
  assert.deepEqual(createEarthWorld().biomes.sites,earth.biomes.sites,'the field remains seeded and serializable');
});

test('globe ecology blends over a geographic region instead of a narrow Voronoi border',()=>{
  const sites=[{...projectEarth(-18,0),type:'forest'},{...projectEarth(18,0),type:'desert'}];
  const world={...earth,biomes:{sites}},west=sample(world,-16,0),east=sample(world,16,0),contrast=distance(west,east);
  assert.ok(contrast>.15,'forest and desert retain a strong, readable identity');
  let largest=0,active=0;
  for(let longitude=-12;longitude<12;longitude+=.25){
    const step=distance(sample(world,longitude,0),sample(world,longitude+.25,0));
    largest=Math.max(largest,step);if(step>contrast*.001)active++;
  }
  assert.ok(largest<contrast*.04,`one quarter degree cannot become a stripe: ${largest/contrast}`);
  assert.ok(active>60,'the transition is spread across many geographic samples');
  assert.ok(distance(sample(world,-3,0),west)>contrast*.15,'the forest side already participates before the dividing line');
  assert.ok(distance(sample(world,3,0),east)>contrast*.15,'the desert side still participates after the dividing line');
});

test('globe terrain and its variation close exactly at the date line and converge at both poles',()=>{
  for(const latitude of [-90,-85,-70,-30,0,45,85,90]){
    assert.ok(distance(sample(earth,-180,latitude),sample(earth,180,latitude))<1e-12);
    assert.ok(distance(sample(earth,-540,latitude),sample(earth,540,latitude))<1e-12);
    assert.ok(distance(sample(earth,-179.999,latitude),sample(earth,179.999,latitude))<.0001,'no seam stripe');
  }
  for(const latitude of [-90,90]){
    const pole=sample(earth,0,latitude);
    for(const longitude of [-180,-120,-40,50,110,179]){
      assert.ok(distance(pole,sample(earth,longitude,latitude))<1e-12,'all meridians meet at one color');
      assert.ok(distance(pole,sample(earth,longitude,latitude*.99999))<.0001,'the field approaches the pole continuously');
    }
  }
});

test('map and detailed chunks sample the identical continuous globe field',()=>{
  const regional={terrainSource:earth,bounds:{minX:-192,maxX:0,minZ:-1536,maxZ:-1344}};
  for(const [longitude,latitude]of [[-60,-5],[18,25],[20,5],[10,50],[120,62],[-42,75],[120,-80]]){
    const p=projectEarth(longitude,latitude),detail=terrainColor(earth,p.x,p.z);
    assert.deepEqual(detail,terrainColor(earth,p.x,p.z,{map:true}),'zoom does not recolor the ground');
    assert.deepEqual(detail,terrainColor(regional,p.x,p.z),'workers and chunk boundaries share one field');
    assert.deepEqual(detail,terrainColor({biomes:{sites:earth.biomes.sites},surface:earth.surface},p.x,p.z),'field is independent of local bounds');
    assert.ok(detail.toArray().every(value=>Number.isFinite(value)&&value>=0&&value<=1));
  }
  const ice=sample(earth,80,-80),forest=sample(earth,-60,-5),desert=sample(earth,18,25);
  assert.ok(ice.r>desert.r&&ice.g>forest.g&&ice.b>.8,'polar ice stays pale');
  assert.ok(forest.g>forest.r&&desert.r>desert.g,'wet and dry landscapes keep their distinct palette');
});

test('macro vegetation gains coherent variation with bounded reusable storage',()=>{
  const world={...earth,biomes:{sites:[{...projectEarth(0,20),type:'forest'}]}},samples=[];
  for(let longitude=-30;longitude<=30;longitude+=2)samples.push(sample(world,longitude,20));
  assert.ok(Math.max(...samples.map(color=>color.g))-Math.min(...samples.map(color=>color.g))>.008,'forest has broad glades, not one flat fill');
  assert.ok(samples.slice(1).every((color,i)=>distance(color,samples[i])<.04),'variation remains coherent at a geographic scale');
  const field=createGlobeLandField(earth,earth.biomes.sites);
  assert.ok(field.values.byteLength<1024*1024,'the globe needs less than one MiB of shared color samples');
  assert.equal(field.values.length,field.columns*(field.rows+1)*3);
  const target=new THREE.Color();
  assert.equal(terrainColor(earth,EARTH_RADIUS,0,{target}),target,'per-vertex sampling can reuse its destination');
});
