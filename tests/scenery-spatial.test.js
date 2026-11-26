import test from 'node:test';
import assert from 'node:assert/strict';
import {biomeAt,biomeDistance,fitsBiome} from '../src/biomes.js';
import {clipPolygonsToBounds} from '../src/polygon-region.js';
import clipping from '../src/polygon-ops.js';

const EPS=1e-7;
const rectangle=(x,z,w,h=w)=>[[x,z],[x+w,z],[x+w,z+h],[x,z+h],[x,z]];
const distance=(x,z,a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1];
  const t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1)));
  return Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz);};
function inRing(ring,x,z){let inside=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){
  const a=ring[i],b=ring[j];if(distance(x,z,a,b)<EPS)return true;
  if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
}return inside;}
const inside=(polygons,x,z)=>polygons.some(([outer,...holes])=>inRing(outer,x,z)&&!holes.some(hole=>inRing(hole,x,z)));
function signed(polygons,x,z){let best=Infinity;for(const polygon of polygons)for(const ring of polygon)for(let i=1;i<ring.length;i++)best=Math.min(best,distance(x,z,ring[i-1],ring[i]));return inside(polygons,x,z)?best:-best;}
const area=polygons=>polygons.reduce((n,rings)=>n+rings.reduce((sum,ring,i)=>sum+(i?-1:1)*Math.abs(ring.reduce((v,a,j)=>{const b=ring[(j+1)%ring.length];return v+a[0]*b[1]-b[0]*a[1];},0)/2),0),0);

const holes=Array.from({length:400},(_,i)=>rectangle((i%20)*4+1,Math.floor(i/20)*4+1,1.4));
const longRing=Array.from({length:129},(_,i)=>[130+12*Math.cos(i/128*Math.PI*2),50+9*Math.sin(i/128*Math.PI*2)]);
const coastline=[[rectangle(0,0,82),...holes],[rectangle(100,10,5)],[longRing]];

test('spatial biome membership and bounded clearance match brute force around holes and borders',()=>{
  const world={regions:[{type:'forest',polygons:coastline}],oceanShore:[],lakeShore:[]};
  const points=Array.from({length:700},(_,i)=>[(i*13.713)%155-5,(i*7.189)%90-5]);
  for(const epsilon of [-EPS*1.1,-EPS*.5,0,EPS*.5,EPS*1.1]){
    points.push([epsilon,40],[1+epsilon,1.5],[2.4+epsilon,1.5],[82+epsilon,40],[142+epsilon,50]);
  }
  const merged=clipping.union(coastline);
  for(const [x,z]of points){
    assert.equal(biomeAt(world,x,z),inside(coastline,x,z)?'forest':null,`membership at ${x},${z}`);
    const exact=signed(merged,x,z);
    assert.ok(Math.abs(biomeDistance(world,'forest',x,z)-exact)<1e-10,`distance at ${x},${z}`);
    for(const radius of [0,EPS*.5,.15,.7,1.2,5,30])assert.equal(fitsBiome(world,'forest',x,z,radius),exact>=radius-EPS,`clearance ${radius} at ${x},${z}`);
  }
});

test('regional polygon clipping preserves enclosing holes, disconnected islands, shore slivers and touching boundaries',()=>{
  const geometries=[coastline,
    [[rectangle(-100,-100,200),rectangle(-20,-20,40)]],
    [[rectangle(0,0,80),rectangle(.1,.1,79.8)]],
    [[[[-15,-10],[15,-10],[15,10],[10,10],[10,-5],[-10,-5],[-10,10],[-15,10],[-15,-10]]]],
    []];
  const cells=[{minX:0,minZ:0,maxX:3,maxZ:3},{minX:1.1,minZ:1.1,maxX:2,maxZ:2},
    {minX:-1,minZ:-1,maxX:1,maxZ:1},{minX:82,minZ:0,maxX:84,maxZ:4},
    {minX:90,minZ:0,maxX:110,maxZ:20},{minX:-12,minZ:0,maxX:12,maxZ:8},
    {minX:-2,minZ:-2,maxX:2,maxZ:2},{minX:300,minZ:300,maxX:310,maxZ:310}];
  for(const polygons of geometries){const before=structuredClone(polygons);
    for(const bounds of cells){
      const rect=[[rectangle(bounds.minX,bounds.minZ,bounds.maxX-bounds.minX,bounds.maxZ-bounds.minZ)]];
      const expected=clipping.intersection(polygons,rect),actual=clipPolygonsToBounds(polygons,bounds);
      assert.ok(area(clipping.xor(actual,expected))<1e-8,'regional clipping must have identical occupied area');
      assert.ok(Math.abs(area(actual)-area(expected))<1e-8);
    }
    assert.deepEqual(polygons,before,'cached broad phase must not mutate source geometry');
  }
});


test('bounded footprint queries keep union clearances across overlapping polygons and adjacent biome types',()=>{
  const world={regions:[{type:'plains',polygons:[[rectangle(0,0,10)],[rectangle(6,0,10)]]},
    {type:'forest',polygons:[[rectangle(16,0,10)]]}],oceanShore:[],lakeShore:[]};
  // Internal polygon and biome boundaries do not constrain a complete dry-land footprint.
  assert.ok(fitsBiome(world,'plains',8,5,4));
  assert.ok(fitsBiome(world,['plains','forest'],16,5,4));
  assert.equal(fitsBiome(world,'plains',16,5,4),false);
  assert.equal(fitsBiome(world,['plains','forest'],16,5,5.1),false);
});
