import test from 'node:test';
import assert from 'node:assert/strict';
import {generateWorld,generateWorldRegion,validateWorld,CLEARANCES,pointSegmentDistance} from '../src/world-model.js';
import {createStressWorld} from '../src/stress-world.js';
const input=createStressWorld(),network=generateWorld(input,{detail:'network'});

test('stress preset compiles a valid256-city network and explicit2048-train circuits without scenery',()=>{
  assert.equal(network.cities.length,256);
  assert.equal(network.traffic.trainCount,2048);
  assert.equal(network.traffic.circuits.length,32);
  assert.equal(network.placements.length,0);assert.equal(network.cityStreets.length,0);
  assert.deepEqual(validateWorld(network),[]);
  const byId=new Map(network.lines.map(l=>[l.id,l]));let total=0;
  for(const circuit of network.traffic.circuits){
    assert.equal(circuit.segments.length,8);
    const lines=circuit.segments.map(s=>byId.get(s.lineId));
    for(let i=0;i<lines.length;i++){
      const current=lines[i],next=lines[(i+1)%lines.length];
      assert.equal(current.to,next.from);
      assert.ok(network.transitions.some(t=>t.fromLineId===current.id&&t.fromEnd==='end'&&t.toLineId===next.id&&t.toEnd==='start'));
      total+=current.length;
    }
  }
  assert.ok(total>=2048*16,'regional loops provide real room for the requested fleet');
  assert.doesNotThrow(()=>structuredClone(network));
});

test('regional detail is repeatable, bounded and independent of exploration order',()=>{
  const city=network.cities[0],a=generateWorldRegion(network,city),b=generateWorldRegion(network,{x:city.x+192,z:city.z});
  const again=generateWorldRegion(network,city);
  assert.deepEqual(a,again);
  assert.equal(network.placements.length,0);assert.equal(network.cityStreets.length,0);
  assert.ok(network.cities.every(c=>c.development.placedBuildings===0),'network metadata remains immutable');
  assert.ok(a.placements.length>0&&a.placements.length<900,'only a bounded local neighborhood is generated');
  assert.ok(a.cities.length<10&&a.lines.length<network.lines.length);
  const ids=new Set(a.placements.map(p=>p.id));
  assert.ok(b.placements.every(p=>!ids.has(p.id)),'neighboring packets have globally unique asset IDs');
  for(const packet of [a,b]){
    for(const item of packet.placements){
      if(item.cityId)continue;
      assert.ok(item.x-item.radius>=packet.bounds.minX&&item.x+item.radius<=packet.bounds.maxX);
      assert.ok(item.z-item.radius>=packet.bounds.minZ&&item.z+item.radius<=packet.bounds.maxZ);
    }
    for(const station of packet.stations)assert.ok(station.x>=packet.bounds.minX&&station.x<packet.bounds.maxX);
  }
  // Independent cross-packet check catches scenery crossing cells or building
  // collisions hidden when only one detail packet is validated at a time.
  for(const p of a.placements)for(const q of b.placements)assert.ok(Math.hypot(p.x-q.x,p.z-q.z)>=p.radius+q.radius+CLEARANCES.objects-1e-6);
  const combined={...network,cities:network.cities.map(c=>a.cities.find(t=>t.id===c.id)??b.cities.find(t=>t.id===c.id)??c),placements:[...a.placements,...b.placements],cityStreets:[...a.cityStreets,...b.cityStreets]};
  assert.deepEqual(validateWorld(combined),[]);
});

test('regional generation survives structured cloning and retains exact clearance',()=>{
  const clone=structuredClone(network),city=clone.cities[16],packet=generateWorldRegion(clone,city);
  assert.ok(packet.placements.length>0);
  for(const item of packet.placements)for(const line of clone.lines){
    let closest=Infinity;for(let i=1;i<line.points.length;i++)closest=Math.min(closest,pointSegmentDistance(item.x,item.z,line.points[i-1],line.points[i]));
    assert.ok(closest>=item.radius+CLEARANCES.track-1e-6);
  }
});

test('stress factory requires complete eight-city regions and supports small odd-row layouts',()=>{
  for(const cities of [0,7,9,257,4104])assert.throws(()=>createStressWorld({cities}),/multiple of 8/);
  for(const cities of [8,24,64]){const world=generateWorld(createStressWorld({cities,trains:16}),{detail:'network'});assert.equal(world.cities.length,cities);assert.deepEqual(validateWorld(world),[]);}
});
