import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { alignmentCandidates, createAlignment, inspectAlignment, sampleAlignment, sampleAlignmentPoints } from '../src/alignments.js';
import { generateWorld, sampleLine, validateWorld } from '../src/world-model.js';

const samePoint=(a,b,tolerance=1e-6)=>assert.ok(Math.hypot(a.x-b.x,a.z-b.z)<tolerance);
const sameDirection=(a,b,tolerance=1e-7)=>assert.ok(a.x*b.x+a.z*b.z>1-tolerance);

function checkAlignment(alignment,minimum){
  let total=0;
  for(const segment of alignment.segments){
    assert.ok(segment.length>0&&Number.isFinite(segment.length));
    assert.ok(Math.abs(segment.startDistance-total)<1e-6);
    if(segment.type==='arc'){
      assert.ok(segment.radius>=minimum-1e-8);
      assert.ok(Math.abs(segment.length-Math.abs(segment.sweep)*segment.radius)<1e-7);
    }
    total+=segment.length;
  }
  assert.ok(Math.abs(alignment.length-total)<1e-6);
  for(const segment of alignment.segments.slice(1)){
    const before=sampleAlignment(alignment,segment.startDistance-1e-5);
    const after=sampleAlignment(alignment,segment.startDistance+1e-5);
    samePoint(before,after,3e-5);sameDirection(before.tangent,after.tangent);
  }
  const sampled=sampleAlignmentPoints(alignment,.35);
  assert.equal(sampled.distances.at(-1),alignment.length);
  for(let s=.1;s<alignment.length;s+=.41){
    const a=sampleAlignment(alignment,Math.max(0,s-.01)),b=sampleAlignment(alignment,Math.min(alignment.length,s+.01));
    const angle=Math.abs(Math.atan2(a.tangent.x*b.tangent.z-a.tangent.z*b.tangent.x,a.tangent.x*b.tangent.x+a.tangent.z*b.tangent.z));
    assert.ok(angle<=.02/minimum+1e-7,'heading changes stay below maximum curvature');
  }
}

test('exact alignment primitives meet endpoint poses with continuous tangents and bounded curvature',()=>{
  for(let index=0;index<60;index++){
    const start={x:Math.sin(index)*13,z:Math.cos(index)*17,heading:index*.61};
    const end={x:30+Math.cos(index*.37)*11,z:24+Math.sin(index*.43)*19,heading:-index*.23};
    const radius=7+index%3,candidates=alignmentCandidates(start,end,{radius});
    assert.ok(candidates.length>0);
    for(const alignment of candidates.slice(0,2)){
      checkAlignment(alignment,radius);
      const a=sampleAlignment(alignment,0),b=sampleAlignment(alignment,alignment.length);
      samePoint(a,start);samePoint(b,end);
      sameDirection(a.tangent,{x:Math.cos(start.heading),z:Math.sin(start.heading)});
      sameDirection(b.tangent,{x:Math.cos(end.heading),z:Math.sin(end.heading)});
    }
  }
});

test('infeasible authored poses fail instead of drawing a full-circle railway loop',()=>{
  assert.throws(()=>createAlignment({x:0,z:0,heading:0},{x:0,z:1,heading:0},{radius:8}),/minimum turning radius.*loop/);
  assert.throws(()=>createAlignment({x:0,z:0,heading:0},{x:20,z:0,heading:0},{radius:0}),/positive/);
});

test('alignment diagnostics use the same solver and preserve solved spans around an infeasible bend',()=>{
  const start={x:0,z:0,heading:0},end={x:60,z:0,heading:0};
  const options={radius:8,waypoints:[{x:20,z:0},{x:20,z:1},{x:40,z:0}]};
  assert.throws(()=>createAlignment(start,end,options),/minimum turning radius/);
  const inspected=inspectAlignment(start,end,options),failed=inspected.spans.filter(span=>span.reason);
  assert.equal(failed.length,1);assert.equal(failed[0].fromIndex,1);assert.equal(failed[0].toIndex,2);assert.equal(failed[0].reason,'radius');
  for(const span of inspected.spans.filter(span=>!span.reason))checkAlignment(span.alignment,8);
  assert.ok(inspected.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z)));
  samePoint(inspected.points[0],start);samePoint(inspected.points.at(-1),end);
  const smooth={...options,waypoints:[{x:20,z:0},{x:23,z:0},{x:40,z:0}]};
  assert.ok(createAlignment(start,end,smooth));assert.ok(inspectAlignment(start,end,smooth).spans.every(span=>!span.reason));
});

test('coincident controls cannot hide a cusp, while collinear duplicates remain valid',()=>{
  const start={x:0,z:0,heading:0},end={x:60,z:40,heading:Math.PI/4};
  const options={radius:8,waypoints:[{x:20,z:0},{x:20,z:0},{x:40,z:20}]};
  assert.throws(()=>createAlignment(start,end,options),/coincident.*minimum turning radius/);
  const inspected=inspectAlignment(start,end,options),failed=inspected.spans.filter(span=>span.reason);
  assert.equal(failed.length,1);assert.equal(failed[0].fromIndex,1);assert.equal(failed[0].toIndex,2);assert.equal(failed[0].reason,'radius');
  samePoint(failed[0].points[0],failed[0].points.at(-1));
  assert.ok(inspected.points.length>100,'the coincident failure preserves the surrounding draft');
  for(const span of inspected.spans.filter(span=>!span.reason))checkAlignment(span.alignment,8);
  const straightEnd={x:60,z:0,heading:Math.PI*2},straight={radius:8,waypoints:[{x:20,z:0},{x:20,z:0}]};
  checkAlignment(createAlignment(start,straightEnd,straight),8);
  assert.ok(inspectAlignment(start,straightEnd,straight).spans.every(span=>!span.reason));
});

function checkWorldNetwork(world){
  assert.deepEqual(validateWorld(world),[]);
  for(const line of world.lines)checkAlignment(line.alignment,world.minTurnRadius);
  for(const transition of world.transitions){
    const first=world.lines.find(l=>l.id===transition.fromLineId),second=world.lines.find(l=>l.id===transition.toLineId);
    const arriving=sampleLine(first,transition.fromEnd==='start'?0:first.length);
    const departing=sampleLine(second,transition.toEnd==='start'?0:second.length);
    const arrivalSign=transition.fromEnd==='start'?-1:1,departureSign=transition.toEnd==='start'?1:-1;
    samePoint(arriving,departing);
    sameDirection({x:arriving.tangent.x*arrivalSign,z:arriving.tangent.z*arrivalSign},
      {x:departing.tangent.x*departureSign,z:departing.tangent.z*departureSign});
    assert.ok(world.transitions.some(t=>t.fromLineId===transition.toLineId&&t.fromEnd===transition.toEnd&&t.toLineId===transition.fromLineId&&t.toEnd===transition.fromEnd));
  }
  for(const section of world.sharedSections){
    assert.ok(section.lines.length>=2);
    for(const entry of section.lines){
      const line=world.lines.find(l=>l.id===entry.lineId);
      samePoint(sampleLine(line,entry.forward?entry.start:entry.end),section.points[0]);
      samePoint(sampleLine(line,entry.forward?entry.end:entry.start),section.points.at(-1));
      if(line.id!==section.ownerLineId){
        const mid=(entry.start+entry.end)/2;
        assert.ok(!line.renderRanges.some(r=>mid>r.start&&mid<r.end),'duplicate shared throat is rendered only once');
      }
    }
  }
}

test('8-city and 12-city worlds retain traversable city tangents across varied seeds',()=>{
  for(const cityCount of [8,12])for(let seed=0;seed<6;seed++){
    const world=generateWorld({cityCount,seed,density:.04});
    checkWorldNetwork(world);
    assert.ok(world.lines.every(l=>l.alignment.segments.some(s=>s.type==='arc')),'every city connection receives rounded approaches');
    for(const city of world.cities)assert.ok(world.transitions.some(t=>t.cityId===city.id),'every ring city is traversable');
  }
});

test('Crossroads uses gentle authored curves, a true shared throat, and one interior crossing',()=>{
  const config=JSON.parse(fs.readFileSync(new URL('../public/worlds/crossroads.json',import.meta.url),'utf8'));
  const world=generateWorld({...config,density:.05});checkWorldNetwork(world);
  assert.equal(world.junctions.length,1);
  assert.ok(world.sharedSections.length>0);
  assert.ok(world.lines.some(l=>l.tunnels.length));
  assert.ok(world.lines.every(l=>l.alignment.segments.every(s=>s.type!=='arc'||Math.abs(s.sweep)<=Math.PI)));
  assert.throws(()=>generateWorld({...config,connections:[config.connections[0],{...config.connections[0],id:'duplicate'}]}),/overlapping duplicate/);
});
