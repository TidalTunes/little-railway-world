import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from '../src/polygon-ops.js';
import {coastalSurfPolygons,coastalSurfGeometry} from '../src/coastal-surf.js';

const ring=(x0,z0,x1,z1)=>[[x0,z0],[x1,z0],[x1,z1],[x0,z1],[x0,z0]];
const area=polygons=>polygons.reduce((total,polygon)=>total+polygon.reduce((sum,ring,index)=>{
  let value=0;for(let i=1;i<ring.length;i++)value+=ring[i-1][0]*ring[i][1]-ring[i][0]*ring[i-1][1];
  return sum+Math.abs(value/2)*(index?-1:1);
},0),0);
const bounds={minX:-30,maxX:30,minZ:-30,maxZ:30};
const world={bounds,biomes:{ocean:[[ring(-30,-30,30,30),ring(-10,-10,10,10)]],sites:[{type:'plains',x:0,z:0}]}};

test('rounded coastal breakers stay strictly on authoritative water, including concave inlets',()=>{
  const original=structuredClone(world),surf=coastalSurfPolygons(world,bounds);
  assert.ok(area(surf)>65&&area(surf)<110);
  assert.ok(area(clipping.difference(surf,world.biomes.ocean))<1e-7,'foam cannot cover dry land');
  assert.deepEqual(world,original,'shore masks and placement coordinates are immutable');
  const inlet={...world,biomes:{...world.biomes,ocean:[[[[-25,-25],[25,-25],[25,25],[-25,25],[-25,-25]],
    [[-10,-10],[10,-10],[10,10],[3,10],[3,0],[-3,0],[-3,10],[-10,10],[-10,-10]]]]}};
  const concave=coastalSurfPolygons(inlet,bounds);
  assert.ok(area(concave)>60);
  assert.ok(area(clipping.difference(concave,inlet.biomes.ocean))<1e-7);
});

test('neighboring streamed pieces have the same breaker footprint as one combined region',()=>{
  const all=coastalSurfPolygons(world,bounds);
  const left=coastalSurfPolygons(world,{...bounds,maxX:0});
  const right=coastalSurfPolygons(world,{...bounds,minX:0});
  assert.ok(area(clipping.xor(all,clipping.union(left,right)))<1e-6,'cell edges never become a new shore');
  const empty=coastalSurfPolygons(world,{minX:-3,maxX:3,minZ:-3,maxZ:3});
  assert.equal(empty.length,0,'inland cells create no mesh');
});

test('coastal geometry is a small opaque painted batch at the shared water datum',()=>{
  const geometry=coastalSurfGeometry(world,bounds,-1.145);
  try{
    assert.ok(geometry.attributes.position.count<3000,'rounded corners have a bounded tessellation budget');
    assert.equal(geometry.attributes.position.count,geometry.attributes.color.count);
    assert.ok(geometry.attributes.position.array.every(Number.isFinite));
    assert.ok(geometry.attributes.color.array.every(value=>Number.isFinite(value)&&value>=0&&value<=1));
    for(let i=0;i<geometry.attributes.position.count;i++)assert.ok(Math.abs(geometry.attributes.position.getY(i)+1.145)<1e-6);
  }finally{geometry.dispose();}
});

test('a complete ocean never gets breakers along the date line or at the poles',()=>{
  const radius=1600,half=radius*Math.PI;
  const globe={surface:{type:'sphere',complete:true,radius,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},
    bounds:{minX:-half,maxX:half,minZ:-half/2,maxZ:half/2,width:half*2,depth:half},
    biomes:{ocean:[[ring(-half,-half/2,half,half/2)]]}};
  for(const region of [{minX:half-16,maxX:half,minZ:-8,maxZ:8},
    {minX:-8,maxX:8,minZ:half/2-16,maxZ:half/2}])assert.equal(coastalSurfPolygons(globe,region).length,0);
});

test('a real island crossing the date line keeps the same surf width on both sides',()=>{
  const radius=1600,half=radius*Math.PI,z=-radius*Math.PI/3;
  const ocean=clipping.difference([[ring(-half,-half/2,half,half/2)]],
    [[ring(half-10,z-10,half,z+10)]],[[ring(-half,z-10,-half+10,z+10)]]);
  const globe={surface:{type:'sphere',complete:true,radius,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},
    bounds:{minX:-half,maxX:half,minZ:-half/2,maxZ:half/2,width:half*2,depth:half},biomes:{ocean}};
  const east=coastalSurfPolygons(globe,{minX:half-20,maxX:half,minZ:z-20,maxZ:z+20});
  const west=coastalSurfPolygons(globe,{minX:-half,maxX:-half+20,minZ:z-20,maxZ:z+20});
  assert.ok(area(east)>40&&area(west)>40);
  assert.ok(Math.abs(area(east)-area(west))<.06,'high-latitude coast widths are physically symmetric at the seam');
  assert.ok(area(clipping.difference(east,ocean))<1e-6);
  assert.ok(area(clipping.difference(west,ocean))<1e-6);
});
