import test from 'node:test';
import assert from 'node:assert/strict';
import {terrainColor} from '../src/terrain-colors.js';
import {sampleLandscape} from '../src/landscape-field.js';
import {mountainSurfaceColor} from '../src/mountain-cover.js';

function field(type,seed='landscape-palette'){
  return {seed,bounds:{width:1000,depth:1000},biomes:{sites:[{x:0,z:0,type}]}};
}
const light=color=>(color.r+color.g+color.b)/3;
const mean=values=>values.reduce((sum,value)=>sum+value,0)/values.length;

test('woodland floor follows the same broad groves and clearings as the scenery field',()=>{
  const world=field('forest'),glades=[],groves=[];
  for(let x=-300;x<=300;x+=10)for(let z=-300;z<=300;z+=10){
    const district=sampleLandscape(world,x,z),ground=terrainColor(world,x,z);
    assert.ok(ground.g>ground.r,'variation retains the woodland palette');
    if(district.patch<.3)glades.push(light(ground));
    if(district.patch>.7)groves.push(light(ground));
  }
  assert.ok(glades.length>100&&groves.length>100,'both landscape structures occur');
  assert.ok(mean(glades)-mean(groves)>.012,'dense groves sit over quieter, darker floor');
  assert.ok(mean(glades)-mean(groves)<.07,'the floor remains a subtle continuous backdrop');
});

test('seeded globe districts agree between independent map and detail workers',()=>{
  const radius=1600,world={...field('forest'),surface:{type:'sphere',radius,complete:true,
    origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}};
  const packet=structuredClone({seed:world.seed,sites:world.biomes.sites,surface:world.surface});
  const sitesBefore=structuredClone(world.biomes.sites),points=[[0,0],[192,-64],[-192,400],[Math.PI*radius,0]];
  const expected=points.map(([x,z])=>terrainColor(world,x,z));
  points.forEach(([x,z],index)=>assert.deepEqual(terrainColor(packet,x,z,{map:true}),expected[index]));
  const changed={...world,seed:'a-different-landscape'};
  assert.ok(points.some(([x,z],index)=>Math.abs(light(terrainColor(changed,x,z))-light(expected[index]))>.0001),
    'reusing the same geographic sites does not reuse another seed’s district colors');
  points.forEach(([x,z],index)=>assert.deepEqual(terrainColor(world,x,z),expected[index]));
  assert.deepEqual(world.biomes.sites,sitesBefore,'visual ecology does not mutate the geography');
});

test('mountain shoulders retain dry ground and green alpine meadows without changing their common toe',()=>{
  const mountain={height:30},normal={x:0,y:1,z:0};
  for(const type of ['forest','plains','desert']){
    const world=field(type),toe={x:15,y:0,z:30};
    assert.deepEqual(mountainSurfaceColor(world,mountain,toe,normal),terrainColor(world,toe.x,toe.z));
    for(const height of [2,5,10,15]){
      const color=mountainSurfaceColor(world,mountain,{...toe,y:height},normal);
      assert.ok(color.toArray().every(value=>Number.isFinite(value)&&value>=0&&value<=1));
      assert.ok(type==='desert'?color.r>color.g:color.g>color.r,
        'lower and alpine shoulders belong to their surrounding ecology');
    }
  }
});
