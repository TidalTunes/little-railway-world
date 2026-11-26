import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from '../src/polygon-ops.js';
import {splitMapPolygons} from '../src/map-tiles.js';

const ringArea=ring=>Math.abs(ring.reduce((sum,a,i)=>{const b=ring[(i+1)%ring.length];return sum+a[0]*b[1]-b[0]*a[1];},0))/2;
const area=multi=>multi.reduce((sum,polygon)=>sum+ringArea(polygon[0])-polygon.slice(1).reduce((holes,ring)=>holes+ringArea(ring),0),0);
const close=points=>[...points,[...points[0]]];
const fixture=()=>[
  [close([[-313,-191],[201,-177],[339,133],[23,247],[-287,103]]),
    close([[-101,-83],[-86,71],[79,93],[91,-67]]),
    close([[170,37],[188,79],[227,71],[224,31]])],
  [close([[-509,151],[-441,147],[-433,213],[-501,231]])],
];

test('recursive map tiles preserve exact polygon coverage, holes and disconnected islands',()=>{
  const source=fixture(),snapshot=structuredClone(source),tiles=splitMapPolygons(source,64);
  assert.ok(tiles.length>30);assert.deepEqual(source,snapshot);
  assert.ok(Math.abs(area(tiles)-area(source))<1e-8,'tile areas add up without gaps or overlapping fill');
  assert.ok(area(clipping.xor(clipping.union(...tiles.map(polygon=>[polygon])),source))<1e-8);
  for(const hole of source[0].slice(1))assert.ok(area(clipping.intersection(tiles,[[hole]]))<1e-8);
  for(const polygon of tiles){
    const points=polygon.flat(),xs=points.map(point=>point[0]),zs=points.map(point=>point[1]);
    const minX=Math.min(...xs),maxX=Math.max(...xs),minZ=Math.min(...zs),maxZ=Math.max(...zs);
    assert.ok(maxX-minX<=64+1e-9&&maxZ-minZ<=64+1e-9);
    const cellX=Math.floor((minX+maxX)/128)*64,cellZ=Math.floor((minZ+maxZ)/128)*64;
    assert.ok(minX>=cellX-1e-9&&maxX<=cellX+64+1e-9&&minZ>=cellZ-1e-9&&maxZ<=cellZ+64+1e-9,
      'every triangle can be bounded to one aligned grid cell');
  }
  assert.deepEqual(splitMapPolygons(source,64),tiles,'fragment order and coordinates are deterministic');
});

function seamIntervals(tiles,axis,coordinate,side){
  const intervals=[];
  for(const polygon of tiles){
    const values=polygon[0].map(point=>point[axis]),center=(Math.min(...values)+Math.max(...values))/2;
    if(side<0?center>=coordinate:center<=coordinate)continue;
    for(const ring of polygon)for(let i=1;i<ring.length;i++){
      const a=ring[i-1],b=ring[i];
      if(a[axis]===coordinate&&b[axis]===coordinate){
        const low=Math.min(a[1-axis],b[1-axis]),high=Math.max(a[1-axis],b[1-axis]);
        if(high-low>1e-10)intervals.push([low,high]);
      }
    }
  }
  intervals.sort((a,b)=>a[0]-b[0]);const merged=[];
  for(const [low,high]of intervals){
    const previous=merged.at(-1);
    if(previous&&low<=previous[1]+1e-9)previous[1]=Math.max(previous[1],high);else merged.push([low,high]);
  }
  return merged.map(pair=>pair.map(value=>Number(value.toFixed(9))));
}

test('independently clipped neighbors have identical shared-edge intervals including holes crossing seams',()=>{
  const tiles=splitMapPolygons(fixture(),64);let compared=0;
  for(const axis of [0,1])for(let coordinate=-256;coordinate<=192;coordinate+=64){
    const left=seamIntervals(tiles,axis,coordinate,-1),right=seamIntervals(tiles,axis,coordinate,1);
    assert.deepEqual(left,right,`axis${axis} seam${coordinate}`);if(left.length)compared++;
  }
  assert.ok(compared>10,'the fixture checks many nontrivial seams');
});

test('grid-aligned geometry terminates cleanly and a hole entirely within a tile stays a hole',()=>{
  const source=[[close([[-128,-128],[128,-128],[128,128],[-128,128]]),close([[7,9],[7,23],[29,23],[29,9]])]];
  const tiles=splitMapPolygons(source,64);assert.equal(tiles.length,16);
  assert.equal(tiles.filter(polygon=>polygon.length===2).length,1);
  assert.ok(Math.abs(area(tiles)-area(source))<1e-10);
  assert.deepEqual(splitMapPolygons([],64),[]);
  for(const size of [0,-1,NaN,Infinity])assert.throws(()=>splitMapPolygons(source,size),RangeError);
});
