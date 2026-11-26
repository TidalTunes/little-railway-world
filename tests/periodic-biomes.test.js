import test from 'node:test';
import assert from 'node:assert/strict';
import {biomeAt,fitsBiome} from '../src/biomes.js';

const radius=1600,half=Math.PI*radius;
const rect=(left,right,top=-40,bottom=40)=>[[left,top],[right,top],[right,bottom],[left,bottom],[left,top]];
const world=polygons=>({surface:{type:'sphere',radius,complete:true,
  projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},
  biomes:{regions:[{id:'green',type:'plains',polygons}],oceanShore:[],lakeShore:[]}});

test('continuous biome footprints cross the complete-globe chart seam without a false shoreline',()=>{
  const rounded=Math.round(half*1e6)/1e6,globe=world([[rect(-rounded,rounded)]]),before=structuredClone(globe.biomes);
  for(const x of [half-.1,-half+.1,half+.1,-half-.1,half*3+.1]){
    assert.equal(biomeAt(globe,x,0),'plains');
    assert.equal(fitsBiome(globe,'plains',x,0,1),true);
    assert.equal(fitsBiome(globe,['forest','plains'],x,0,8),true);
  }
  assert.deepEqual(globe.biomes,before,'periodic clipping never mutates source geography');
  assert.equal(fitsBiome({...globe,surface:{...globe.surface,complete:false}},'plains',half-.1,0,1),false,
    'an incomplete surface retains its actual outer edge');
});

test('a real shoreline on one side of the date line remains impassable',()=>{
  const globe=world([[rect(half-20,half)]]);
  assert.equal(fitsBiome(globe,'plains',half-.1,0,1),false);
  assert.equal(fitsBiome(globe,'plains',half-2,0,1),true);
  assert.equal(biomeAt(globe,half+.2,0),null);
});

test('periodic footprint clearance retains holes and nearby coasts across the seam',()=>{
  const left=rect(half-20,half),right=rect(-half,-half+20),hole=rect(-half+.4,-half+1.2,-.3,.3).reverse();
  const globe=world([[left],[right,hole]]);
  assert.equal(fitsBiome(globe,'plains',half-.1,0,.35),true);
  assert.equal(fitsBiome(globe,'plains',half-.1,0,.65),false,'the opposite-side hole remains a real boundary');
  assert.equal(fitsBiome(globe,'plains',half-.1,39.5,1),false,'regional clipping cannot erase a nearby coast');
});
