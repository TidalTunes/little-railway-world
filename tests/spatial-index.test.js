import test from 'node:test';
import assert from 'node:assert/strict';
import {BoundsTree,SpatialGrid,pointBox,boxesOverlap,polylineTree} from '../src/spatial-index.js';

function random(){let n=4189;return()=>{n=Math.imul(n,1664525)+1013904223|0;return(n>>>0)/2**32;};}
test('conservative BVH queries and exact nearest results agree with exhaustive geometry',()=>{
  const rng=random(),items=Array.from({length:600},(_,id)=>({id,x:rng()*600-300,z:rng()*600-300,radius:rng()*8}));
  const box=p=>pointBox(p.x,p.z,p.radius),tree=new BoundsTree(items,box),grid=new SpatialGrid(19);
  for(const item of items)grid.insert(item,box(item));
  for(let i=0;i<180;i++){
    const x=rng()*700-350,z=rng()*700-350,query=pointBox(x,z,rng()*25);
    const expected=items.filter(p=>boxesOverlap(box(p),query)).map(p=>p.id).sort((a,b)=>a-b);
    assert.deepEqual(tree.query(query).map(p=>p.id).sort((a,b)=>a-b),expected);
    assert.deepEqual(grid.query(query).map(p=>p.id).sort((a,b)=>a-b),expected);
    const distance=p=>Math.max(0,Math.hypot(p.x-x,p.z-z)-p.radius);
    assert.ok(Math.abs(tree.nearest(x,z,distance)-Math.min(...items.map(distance)))<1e-8);
  }
});
test('empty indexes and an appended network keep correct query semantics',()=>{
  assert.deepEqual(new BoundsTree([]).query(pointBox(0,0,1)),[]);
  assert.equal(new BoundsTree([]).nearest(0,0,()=>0),Infinity);
  const lines=[{points:[{x:0,z:0},{x:1,z:0}]}],first=polylineTree(lines);
  assert.equal(polylineTree(lines),first);
  lines.push({points:[{x:8,z:0},{x:9,z:0}]});
  assert.notEqual(polylineTree(lines),first);
  assert.equal(polylineTree(lines).query(pointBox(8.5,0,.1)).length,1);
});
