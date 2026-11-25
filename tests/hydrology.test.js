import test from 'node:test';
import assert from 'node:assert/strict';
import {generateWorld,validateWorld,worldSurface} from '../src/world-model.js';
import {riversOf,riverBankDistance,createHydrology} from '../src/hydrology.js';

const base={bounds:{width:100,depth:90},cities:[{id:'west',x:-30,z:0},{id:'east',x:30,z:0}],
  connections:[{from:'west',to:'east'}],mountains:[],biomes:{ocean:false},density:0};

test('multiple rivers retain their own widths and create independent bridge crossings',()=>{
  const world=generateWorld({...base,rivers:[
    {id:'small',width:2,smooth:false,points:[[-12,-45],[-12,45]]},
    {id:'large',width:6,smooth:false,points:[[12,-45],[12,45]]},
  ]});
  assert.equal(riversOf(world).length,2);
  assert.equal(riverBankDistance(world,-10,0),1);
  assert.equal(riverBankDistance(world,14,0),-1);
  assert.equal(worldSurface(world,14,0).type,'water');
  assert.equal(world.lines[0].bridges.length,2);
  assert.ok(world.lines[0].bridges[1].end-world.lines[0].bridges[1].start>
    world.lines[0].bridges[0].end-world.lines[0].bridges[0].start+3.9);
  assert.deepEqual(validateWorld(world),[]);
});

test('a dry geographical world can have no river without a synthetic watercourse',()=>{
  const world=generateWorld({...base,rivers:[]});
  assert.equal(riverBankDistance(world,0,0),Infinity);
  assert.deepEqual(createHydrology(world),{water:[],banks:[]});
  assert.equal(world.lines[0].bridges.length,0);
  assert.equal(worldSurface(world,0,0).type,'ground');
  assert.deepEqual(validateWorld(world),[]);
});

test('geographic strait crossings receive bridge decks while dry routes stay on land',()=>{
  const outline=[[-50,-45],[50,-45],[50,45],[-50,45],[-50,-45]];
  const rectangle=(a,b)=>[[[a,-45],[b,-45],[b,45],[a,45],[a,-45]]];
  const world=generateWorld({...base,outline,rivers:[],biomes:{sites:[{type:'plains',x:-25,z:0}],
    geography:{ocean:[rectangle(-2,2)],oceanShore:[rectangle(-2.9,-2),rectangle(2,2.9)],
      landInterior:[rectangle(-50,-2.9),rectangle(2.9,50)]}}});
  assert.equal(world.lines[0].bridges.length,1);
  assert.equal(worldSurface(world,0,0).type,'ocean');
  assert.deepEqual(validateWorld(world),[]);
});
