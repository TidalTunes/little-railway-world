import test from 'node:test';
import assert from 'node:assert/strict';
import floating from 'polygon-clipping';
import polygons,{integerPolygonOperation,polygonOpsStats} from '../src/polygon-ops.js';

const ring=(x1,z1,x2,z2)=>[[x1,z1],[x2,z1],[x2,z2],[x1,z2],[x1,z1]];
const rect=(...coordinates)=>[[ring(...coordinates)]];
const area=multi=>multi.reduce((total,polygon)=>total+polygon.reduce((sum,ring,index)=>{
  const signed=ring.reduce((value,[x,z],i)=>{const next=ring[(i+1)%ring.length];return value+x*next[1]-z*next[0];},0)/2;
  return sum+(index?-1:1)*Math.abs(signed);
},0),0);

test('integer polygon operations preserve nested islands, holes and arbitrary input winding',()=>{
  const donut=[[ring(0,0,20,20).reverse(),ring(3,3,17,17)]];
  const island=rect(7,7,13,13),before=structuredClone(donut);
  const union=integerPolygonOperation('union',donut,island);
  assert.equal(union.length,2);
  assert.equal(union.reduce((n,p)=>n+p.length-1,0),1);
  assert.equal(area(union),400-196+36);
  assert.deepEqual(donut,before,'inputs remain unchanged');
  for(const polygon of union)for(const path of polygon)assert.deepEqual(path[0],path.at(-1));
  const cut=integerPolygonOperation('difference',rect(0,0,20,20),rect(3,3,17,17));
  assert.equal(cut.length,1);assert.equal(cut[0].length,2);assert.equal(area(cut),204);
});

test('variadic intersection requires membership in every operand while difference removes all clips',()=>{
  const a=rect(0,0,10,10),b=rect(2,-2,8,12),c=rect(-2,3,12,7);
  assert.equal(area(integerPolygonOperation('intersection',a,b,c)),24);
  assert.equal(area(integerPolygonOperation('difference',a,b,c)),24);
  assert.equal(area(integerPolygonOperation('union',a,b,c)),140);
  for(const name of ['union','intersection','difference','xor']){
    assert.ok(Math.abs(area(integerPolygonOperation(name,a,b,c))-area(floating[name](a,b,c)))<1e-7,name);
  }
});

test('integer fallback accepts polygon inputs, touching boundaries and precision-scale slivers',()=>{
  const a=[ring(0,0,1,1)],b=rect(1+1e-8,0,2,1);
  const union=integerPolygonOperation('union',a,b);
  assert.equal(area(union),2);assert.equal(union.length,1);
  assert.deepEqual(integerPolygonOperation('intersection',a,[]),[]);
  assert.equal(area(integerPolygonOperation('difference',a,[])),1);
  assert.equal(area(integerPolygonOperation('xor',[],a)),1);
  assert.deepEqual(integerPolygonOperation('union',[[[[0,0],[1,1],[2,2],[0,0]]]]),[]);
});

test('ordinary operations keep the floating fast path and malformed input errors are not hidden',()=>{
  const before=polygonOpsStats.fallbacks,a=rect(-2,-2,2,2),b=rect(0,0,4,4);
  assert.deepEqual(polygons.intersection(a,b),floating.intersection(a,b));
  assert.equal(polygonOpsStats.fallbacks,before);
  assert.throws(()=>polygons.union({invalid:true}),/valid Polygon/);
  assert.equal(polygonOpsStats.fallbacks,before);
  assert.throws(()=>integerPolygonOperation('union',[[[[NaN,0],[0,1],[1,0]]]]),/finite/);
});
