import test from 'node:test';
import assert from 'node:assert/strict';
import {straightSegment,combineAlignments,sampleAlignment} from '../src/alignments.js';
import {createDirectedRailNetwork} from '../src/directed-rail-network.js';
import {createSettlementEconomy} from '../src/settlement-economy.js';
import {LOOP_ECONOMY_RULES as RULES} from '../src/loop-economy-rules.js';

const STEP=1/30;

// Exact C1 straight/semicircle tracks, with physical station cuts and explicit
// forward joins. Crossings deliberately have no graph junction: the real
// network and traffic authority must still protect their physical overlap.
function stadium(id,rotation=0){
  const half=60,radius=18,c=Math.cos(rotation),s=Math.sin(rotation);
  // Put both outbound straights through the origin, with stations the same
  // distance upstream. Opposite owners therefore contest the crossing at once.
  const point=({x,y=0,z})=>({x:x*c-(z+radius)*s,y,z:x*s+(z+radius)*c});
  const transform=segment=>({...segment,start:point(segment.start),end:point(segment.end),
    ...(segment.type==='line'?{heading:segment.heading+rotation}:{center:point(segment.center),startAngle:segment.startAngle+rotation})});
  const arc=(x,angle)=>({type:'arc',center:{x,z:0},radius,startAngle:angle,sweep:Math.PI,
    start:{x:x+Math.cos(angle)*radius,y:0,z:Math.sin(angle)*radius},
    end:{x:x+Math.cos(angle+Math.PI)*radius,y:0,z:Math.sin(angle+Math.PI)*radius},length:Math.PI*radius,curvature:1/radius});
  const upper=combineAlignments([straightSegment({x:-half,z:-radius},{x:half,z:-radius},0),arc(half,-Math.PI/2)].map(transform),radius);
  const lower=combineAlignments([straightSegment({x:half,z:radius},{x:-half,z:radius},0),arc(-half,Math.PI/2)].map(transform),radius);
  const lines=[{id:`${id}:upper`,alignment:upper},{id:`${id}:lower`,alignment:lower}];
  const stations=[{id:`${id}:home-station`,cityId:`${id}:home`,lineId:lines[0].id,distance:15},
    {id:`${id}:farm-station`,cityId:`${id}:farm`,lineId:lines[1].id,distance:15}];
  const connections=[{lineId:lines[0].id,fromJunction:{lineId:lines[1].id,distance:lower.length},toJunction:{lineId:lines[1].id,distance:0}}];
  return {lines,stations,connections,home:sampleAlignment(upper,15),farm:sampleAlignment(lower,15)};
}

function fixture(angles){
  const owners=['teal','coral'],routes=angles.map((angle,i)=>stadium(owners[i],angle));
  const cities=routes.map((route,i)=>({id:`${owners[i]}:home`,ownerId:owners[i],...route.home,level:2,houseCount:6}));
  const farms=routes.map((route,i)=>({id:`${owners[i]}:farm`,ownerId:'gray',...route.farm,level:2,houseCount:6,foodStock:30}));
  const games=cities.map(city=>({ownerId:city.ownerId,logs:240,food:RULES.startFood,gold:RULES.startGold,population:6,cities:[city],
    spendLogs(amount){if(this.logs<amount)return {ok:false};this.logs-=amount;return {ok:true};},addLogs(amount){this.logs+=amount;return {ok:true};},
    spendFood(amount){if(this.food<amount)return {ok:false};this.food-=amount;return {ok:true};},addFood(amount){this.food+=amount;return {ok:true};},
    spendGold(amount){if(this.gold<amount)return {ok:false};this.gold-=amount;return {ok:true};},creditGold(amount){this.gold+=amount;return {ok:true};}}));
  const world={gameplay:{economy:'loops',ownerId:owners[0],farmVillages:{ownerId:'gray',cities:farms}}};
  const data={revision:1,lines:routes.flatMap(route=>route.lines),stations:routes.flatMap(route=>route.stations),connections:routes.flatMap(route=>route.connections)};
  const network=createDirectedRailNetwork(data);
  for(const city of cities){
    const loops=network.loops(city.id);assert.equal(loops.length,1,'each authored directed circuit closes through its physical stations');
    assert.equal(loops[0].cityIds.length,2);assert.ok(loops[0].length>300,'the loop has ample room for this small fleet');
  }
  const session={player:games[0],bots:games.slice(1).map(game=>({game})),revision:0};
  const railways={revision:1,snapshot:()=>data};
  const economy=createSettlementEconomy(world,{session,railways});
  const initial={resources:games.length*240,food:games.length*RULES.startFood+farms.reduce((sum,farm)=>sum+farm.foodStock,0),gold:games.length*RULES.startGold};
  function buy(count){
    for(let n=0;n<count;n++)for(const city of cities){const loop=economy.loops(city.id)[0];assert.ok(economy.buyTrain(city.id,loop.id,city.ownerId).ok);}
  }
  return {economy,initial,buy,games};
}

function rectanglesOverlap(a,b){
  // Half extents match the authoritative carriage envelope. Checking every
  // pair (including the tail) catches collisions engine-only tests miss.
  const at=a.tangent,bt=b.tangent,dx=b.x-a.x,dz=b.z-a.z;
  for(const [x,z] of [[at.x,at.z],[-at.z,at.x],[bt.x,bt.z],[-bt.z,bt.x]]){
    const ar=1.24*Math.abs(x*at.x+z*at.z)+.62*Math.abs(-x*at.z+z*at.x);
    const br=1.24*Math.abs(x*bt.x+z*bt.z)+.62*Math.abs(-x*bt.z+z*bt.x);
    if(Math.abs(x*dx+z*dz)>=ar+br-1e-6)return false;
  }
  return true;
}
function assertClear(trains,time){
  const active=trains.filter(train=>train.active);
  for(let i=0;i<active.length;i++)for(let j=i+1;j<active.length;j++)
    for(let a=0;a<active[i].carPoses.length;a++)for(let b=0;b<active[j].carPoses.length;b++){
      const p=active[i].carPoses[a],q=active[j].carPoses[b];
      if(Math.abs(p.y-q.y)>2.4)continue;
      assert.equal(rectanglesOverlap(p,q),false,`${time.toFixed(2)}s carriage overlap ${active[i].id}:${a}/${active[j].id}:${b}`);
    }
}
function assertConserved(economy,initial){
  const snapshot=economy.snapshot(),{stats,trains,owners}=snapshot;
  const escrow=trains.reduce((sum,train)=>sum+train.escrowGold,0);
  assert.equal(owners.reduce((sum,owner)=>sum+owner.gold,0)+escrow,initial.gold,'all coins are in a wallet or reserved for a trip');
  assert.equal(stats.goldReserved-stats.goldPaid-stats.goldRefunded,escrow);
  assert.equal(stats.goldPaid,(stats.withdrawn.resources+stats.withdrawn.food)/RULES.pickupStock*RULES.pickupGold);
  for(const resource of ['resources','food']){
    const aboard=trains.reduce((sum,train)=>sum+train.cargo[resource],0),wallets=owners.reduce((sum,owner)=>sum+owner[resource],0);
    const spent=stats.construction[resource]+(resource==='resources'?stats.trainSpent:0);
    assert.equal(wallets+aboard+spent,initial[resource]+stats.produced[resource]+stats.minted[resource],`traffic cannot duplicate or lose ${resource}`);
    assert.equal(stats.pickups[resource],stats.withdrawn[resource]+stats.minted[resource]);
    assert.equal(stats.pickups[resource],stats.delivered[resource]+aboard);
  }
  return snapshot;
}
function run(f,seconds){
  const waits=new Set(),stopped=new Set(),admitted=new Set();let blockedTicks=0;
  for(let tick=1;tick<=seconds*30;tick++){
    f.economy.update(0,{elapsedSeconds:tick*STEP});
    const trains=f.economy.trains;
    for(const train of trains){
      if(train.state==='queued')waits.add(train.id);
      if(train.active)admitted.add(train.id);
      if(train.state==='dwell'){stopped.add(train.id);assert.equal(train.speed,0);}
      if(train.blocked)blockedTicks++;
      assert.ok(train.speed>=0&&train.speed<=RULES.speed);
    }
    assertClear(trains,tick*STEP);
    if(tick%30===0)assertConserved(f.economy,f.initial);
  }
  return {waits,stopped,admitted,blockedTicks,snapshot:assertConserved(f.economy,f.initial)};
}

test('four trains queue at purchase, follow through actual station stops, and all complete the directed circuit',()=>{
  const f=fixture([0]);f.buy(4);
  assert.equal(f.economy.trains.filter(train=>train.active).length,1);
  assert.equal(f.economy.trains.filter(train=>train.state==='queued').length,3);
  const observed=run(f,180);
  assert.equal(observed.waits.size,3);assert.equal(observed.admitted.size,4);assert.equal(observed.stopped.size,4);
  assert.ok(observed.blockedTicks>0,'following trains yield for occupied station approaches');
  for(const train of observed.snapshot.trains)assert.ok(train.laps>=2,`${train.id} must not remain queued or deadlock behind a station`);
  assert.ok(observed.snapshot.stats.delivered.food>=8);
});

for(const degrees of [90,165])test(`opposing owners on ${degrees}° crossing circuits keep every carriage clear and make progress`,()=>{
  const f=fixture([0,degrees*Math.PI/180]);f.buy(3);
  const observed=run(f,240);
  assert.equal(observed.admitted.size,6);
  assert.ok(observed.blockedTicks>0,'the physical crossing requires yielding despite the absence of a graph junction');
  for(const train of observed.snapshot.trains)assert.ok(train.laps>=2,`${train.id} is stuck at ${train.simulationDistance.toFixed(2)} in ${train.state}`);
  assert.equal(observed.stopped.size,6);
  assert.ok(observed.snapshot.stats.delivered.food>=12);
  for(const owner of ['teal','coral'])assert.ok(observed.snapshot.trains.some(train=>train.ownerId===owner&&train.laps>=2));
});
