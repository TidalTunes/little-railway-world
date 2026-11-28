import test from 'node:test';
import assert from 'node:assert/strict';
import {createMilitarySimulation,MILITARY_RULES,getMilitarySpawnZone} from '../src/military-simulation.js';
import {createMilitaryNavigation} from '../src/military-navigation.js';
import {MILITARY_MOTION,MILITARY_WEAPONS,militaryAngle,getMilitaryMuzzle,getMilitaryForward} from '../src/military-kinematics.js';

function wallet(resources=100,food=100){return{logs:resources,food,spendResources(n){if(this.logs<n)return{ok:false};this.logs-=n;return{ok:true};},spendFood(n){if(this.food<n)return{ok:false};this.food-=n;return{ok:true};},addLogs(n){this.logs+=n;return{ok:true};}};}
function fixture(options={}){
  const cities=options.cities??[{id:'a',ownerId:'teal',x:-25,z:0,radius:4},{id:'b',ownerId:'coral',x:25,z:0,radius:4}];
  const accounts=new Map(cities.map(c=>[c.ownerId,wallet(options.resources??100,options.food??100)])),placements=options.placements??[];
  const ground=options.surfaceAt??((x,z)=>({type:Math.abs(x)>200||Math.abs(z)>200?'outside':'ground',height:0}));
  const world={seed:'combat-test',players:[]},simulation=createMilitarySimulation(world,{getCities:()=>cities,getPlacements:()=>placements,getAccount:id=>accounts.get(id),surfaceAt:ground,botOwners:options.botOwners??[],seed:options.seed??'combat-test'});
  return{simulation,accounts,cities,placements,ground,world};
}
function advance(sim,seconds,step=.05){for(let t=0;t<seconds-1e-8;t+=step)sim.update(Math.min(step,seconds-t));}
function pose(unit,x,z,y=0){unit.x=x;unit.z=z;unit.y=y;unit.nextShotAt=0;unit.nextTargetAt=0;return unit;}

test('all unit purchases debit exact costs and spawn in a clear annulus without overlap',()=>{
  const f=fixture(),zone=getMilitarySpawnZone(f.cities[0]);
  for(const kind of ['soldier','tank','artillery','helicopter']){
    const result=f.simulation.buy('teal',kind);assert.equal(result.ok,true);const u=result.unit,d=Math.hypot(u.x-zone.x,u.z-zone.z);
    assert.ok(d>zone.innerRadius+u.radius);assert.ok(d<zone.outerRadius-u.radius);assert.equal(u.y,kind==='helicopter'?5:0);assert.equal(u.hp,MILITARY_RULES[kind].health);
  }
  assert.equal(f.accounts.get('teal').logs,39);assert.equal(f.accounts.get('teal').food,99);assert.equal(f.simulation.membershipRevision,4);
  for(const a of f.simulation.units)for(const b of f.simulation.units)if(a!==b&&(a.kind==='helicopter')===(b.kind==='helicopter'))assert.ok(Math.hypot(a.x-b.x,a.z-b.z)>a.radius+b.radius);
});

test('invalid purchases, blocked spawn, or a rejected second debit do not spend resources',()=>{
  const f=fixture();assert.equal(f.simulation.buy('teal','boat').ok,false);assert.equal(f.simulation.buy('missing','tank').ok,false);
  f.accounts.get('teal').food=0;assert.equal(f.simulation.buy('teal','soldier').ok,false);assert.equal(f.accounts.get('teal').logs,100);
  f.accounts.get('teal').food=1;f.accounts.get('teal').spendFood=()=>({ok:false});assert.equal(f.simulation.buy('teal','soldier').ok,false);assert.equal(f.accounts.get('teal').logs,100);
  const blocked=fixture({surfaceAt:()=>({type:'water',height:-1})});assert.equal(blocked.simulation.buy('teal','tank').code,'spawn-blocked');assert.equal(blocked.accounts.get('teal').logs,100);
});

test('movement obeys owner commands, navigates around buildings, and stops at destination',()=>{
  const f=fixture({placements:[{kind:'house',id:'obstacle',x:0,z:0,y:0,scale:3,rotation:0}]}),unit=pose(f.simulation.buy('teal','soldier').unit,-6,0);
  assert.equal(f.simulation.command('coral',[unit.id],{type:'move',x:6,z:0}).ok,false);
  assert.equal(f.simulation.command('teal',[unit.id],{type:'move',x:6,z:0}).ok,true);
  let detoured=false;for(let i=0;i<240;i++){f.simulation.update(.05);if(Math.abs(unit.z)>3)detoured=true;assert.ok(!(Math.abs(unit.x)<2.73+.20&&Math.abs(unit.z)<2.58+.20),'never enters house body');}
  assert.ok(detoured);assert.ok(Math.hypot(unit.x-6,unit.z)<.1);assert.equal(unit.order,null);
});

test('water is never crossed by ground units, while helicopters keep a fixed terrain clearance',()=>{
  const f=fixture({surfaceAt:(x,z)=>({type:Math.abs(x)<1&&Math.abs(z)<10?'water':'ground',height:Math.abs(x)<1&&Math.abs(z)<10?-1:Math.max(0,x*.02)})});
  const unit=pose(f.simulation.buy('teal','soldier').unit,-4,0),heli=pose(f.simulation.buy('teal','helicopter').unit,-4,2,5);
  f.simulation.command('teal',[unit.id,heli.id],{type:'move',x:6,z:0});
  let wetAir=false;for(let i=0;i<400;i++){f.simulation.update(.05);assert.notEqual(f.ground(unit.x,unit.z).type,'water');assert.equal(heli.y,f.ground(heli.x,heli.z).height+5);if(f.ground(heli.x,heli.z).type==='water')wetAir=true;}
  assert.ok(wetAir);assert.ok(unit.x>3);assert.ok(heli.x>4);
});

test('shots hit only enemy units, respect own spawn shielding, and remove defeated units',()=>{
  const f=fixture(),shooter=pose(f.simulation.buy('teal','tank').unit,13,0),target=pose(f.simulation.buy('coral','soldier').unit,20,0),friend=pose(f.simulation.buy('teal','soldier').unit,20,.3);
  shooter.heading=Math.PI/2;shooter.nextShotAt=0;target.nextShotAt=friend.nextShotAt=999;
  advance(f.simulation,1.1);const events=f.simulation.drainEvents(),hit=events.find(e=>e.type==='damage'&&e.unitId===target.id);
  assert.ok(hit);assert.equal(hit.shielded,true);assert.ok(hit.amount<=2.5);assert.equal(friend.hp,6);
  pose(target,5,0);target.nextShotAt=999;advance(f.simulation,5);assert.ok(!f.simulation.units.includes(target));assert.ok(f.simulation.stats.kills>=1);assert.ok(f.simulation.drainEvents().some(e=>e.type==='destroyed'&&e.unitId===target.id));
});

test('artillery damages clustered enemies; infantry has no splash and aircraft evade most infantry shots',()=>{
  const f=fixture(),artillery=pose(f.simulation.buy('teal','artillery').unit,-8,0),a=pose(f.simulation.buy('coral','tank').unit,5,0),b=pose(f.simulation.buy('coral','tank').unit,5,1.3);
  artillery.heading=Math.PI/2;a.nextShotAt=b.nextShotAt=999;advance(f.simulation,2.2);assert.ok(a.hp<28&&b.hp<28);
  assert.equal(MILITARY_RULES.soldier.splash,0);assert.ok(MILITARY_RULES.soldier.airAccuracy<MILITARY_RULES.soldier.accuracy/2);assert.ok(MILITARY_RULES.artillery.airAccuracy<MILITARY_RULES.artillery.accuracy/2);
  assert.ok(MILITARY_RULES.helicopter.interval<MILITARY_RULES.soldier.interval);assert.ok(MILITARY_RULES.tank.accuracy>.95);
});

test('fixed-step combat gives identical outcomes at different render frame rates',()=>{
  const run=step=>{const f=fixture();pose(f.simulation.buy('teal','tank').unit,-4,0);pose(f.simulation.buy('coral','tank').unit,4,0);advance(f.simulation,8,step);return{units:f.simulation.units.map(u=>({x:u.x,z:u.z,hp:u.hp})),shots:f.simulation.stats.shots,damage:f.simulation.stats.damage};};
  assert.deepEqual(run(1/60),run(.1));
});

test('bot armies stage, use mixed units, and retain a resource reserve',()=>{
  const f=fixture({botOwners:['coral']});advance(f.simulation,44);assert.ok(f.simulation.units.length>=4);assert.ok(f.simulation.units.every(u=>u.order===null));assert.ok(new Set(f.simulation.units.map(u=>u.kind)).size>=3);
  advance(f.simulation,25);assert.ok(f.accounts.get('coral').logs>=45);assert.ok(f.simulation.units.some(u=>u.order?.type==='move'));
});

test('target broad phase avoids all-pairs scans and bounded events are disposed cleanly',()=>{
  const cities=Array.from({length:4},(_,i)=>({id:`city${i}`,ownerId:['teal','coral','blue','ochre'][i],x:-140+i*90,z:0,radius:20}));
  const f=fixture({cities,resources:200,food:200});for(const city of cities)for(let i=0;i<60;i++)assert.equal(f.simulation.buy(city.ownerId,'soldier').ok,true);
  advance(f.simulation,2);assert.equal(f.simulation.units.length,240);assert.ok(f.simulation.stats.targetChecks<240*240*3);
  const revision=f.simulation.membershipRevision;f.simulation.update(20);assert.ok(f.simulation.stats.droppedTime>=19.5);assert.equal(f.simulation.membershipRevision,revision);
  f.simulation.dispose();f.simulation.dispose();assert.equal(f.simulation.units.length,0);assert.equal(f.simulation.stats.events,0);assert.equal(f.simulation.buy('teal','soldier').code,'disposed');
});

test('navigation reuses stable collision geometry and respects bounded search budget',()=>{
  const placements=[{id:'block',kind:'house',x:0,y:0,z:0,scale:30}],nav=createMilitaryNavigation({},{getPlacements:()=>placements,surfaceAt:()=>({type:'ground',height:0})});
  nav.refresh();nav.refresh();assert.equal(nav.stats.colliderRebuilds,1);assert.equal(nav.path({x:-40,z:0},{x:40,z:0},.24,false,{maxNodes:20}).complete,false);assert.ok(nav.stats.visited<=21);
});

test('orders keep ground formations separated while converging on a point',()=>{
  const f=fixture(),a=pose(f.simulation.buy('teal','tank').unit,-4,0),b=pose(f.simulation.buy('teal','tank').unit,4,0);
  f.simulation.command('teal',[a.id],{type:'move',x:4,z:0});f.simulation.command('teal',[b.id],{type:'move',x:-4,z:0});
  for(let i=0;i<340;i++){f.simulation.update(.05);assert.ok(Math.hypot(a.x-b.x,a.z-b.z)>=a.radius+b.radius-.001);}
  assert.ok(a.x>3.8&&b.x<-3.8,'opposing orders pass around each other instead of deadlocking');
});

test('real island starter regions admit all unit types on dry safe terrain',async()=>{
  const [{createSettlementWorld},{generateWorld,generateWorldRegion},{prepareMilitaryScenery,createMilitaryCollisionSource},{createSettlementSession}]=await Promise.all([
    import('../src/settlement-world.js'),import('../src/world-model.js'),import('../src/military-scenery.js'),import('../src/settlement-session.js')]);
  const world=generateWorld(createSettlementWorld({economy:'loops'}),{detail:'network'});prepareMilitaryScenery(world,generateWorldRegion);
  const session=createSettlementSession(world),games=[session.player,...session.bots.map(entry=>entry.game)],getPlacements=createMilitaryCollisionSource(world,{session});
  const cities=games.map(game=>({...game.houses[0],ownerId:game.ownerId,radius:4,id:`city:${game.ownerId}`}));
  for(const game of games){game.addLogs(100);game.addFood(100);}
  const sim=createMilitarySimulation(world,{getCities:()=>cities,getPlacements,getAccount:id=>games.find(g=>g.ownerId===id)});
  for(const city of cities)for(const kind of ['soldier','tank','artillery','helicopter'])assert.equal(sim.buy(city.ownerId,kind).ok,true,`${city.ownerId} ${kind} has a valid spawn`);
  assert.equal(sim.units.length,games.length*4);sim.dispose();
});


test('long orders continue across bounded partial routes and detour around a long river',()=>{
  const f=fixture({surfaceAt:(x,z)=>({type:Math.abs(x)<2&&Math.abs(z)<45?'water':'ground',height:0})});
  const unit=pose(f.simulation.buy('teal','soldier').unit,-15,0);
  assert.equal(f.simulation.command('teal',[unit.id],{type:'move',x:15,z:0}).ok,true);
  for(let i=0;i<1800;i++){f.simulation.update(.05);assert.notEqual(f.ground(unit.x,unit.z).type,'water');}
  assert.ok(Math.hypot(unit.x-15,unit.z)<.2,'the original destination survives local partial route completion');
  assert.equal(unit.order,null);assert.ok(f.simulation.stats.navigation.partialPaths>0);
});

test('ocean move commands reject ground-only selections but retain valid aircraft orders',()=>{
  const f=fixture({surfaceAt:(x,z)=>({type:z>8?'water':'ground',height:0})}),soldier=f.simulation.buy('teal','soldier').unit,heli=f.simulation.buy('teal','helicopter').unit;
  assert.equal(f.simulation.command('teal',[soldier.id],{type:'move',x:0,z:30}).code,'blocked-target');
  const result=f.simulation.command('teal',[soldier.id,heli.id],{type:'move',x:0,z:30});assert.equal(result.ok,true);assert.equal(result.count,1);assert.equal(soldier.order,null);assert.equal(heli.order.type,'move');
});


test('units fire at nearby enemies while pursuing a farther attack target',()=>{
  const f=fixture(),unit=pose(f.simulation.buy('teal','soldier').unit,0,0),near=pose(f.simulation.buy('coral','soldier').unit,4,0),far=pose(f.simulation.buy('coral','soldier').unit,50,0);
  near.nextShotAt=far.nextShotAt=999;f.simulation.command('teal',[unit.id],{type:'attack',targetId:far.id});advance(f.simulation,.5);
  assert.ok(f.simulation.drainEvents().some(event=>event.type==='shot'&&event.unitId===unit.id&&Math.abs(event.to.x-near.x)<6));assert.equal(unit.order.targetId,far.id);
});

test('frontier rivals travel beyond their founding regions and all factions engage',async()=>{
  const [{createSettlementWorld},{generateWorld,generateWorldRegion},{prepareMilitaryScenery,createMilitaryCollisionSource},{createSettlementSession}]=await Promise.all([import('../src/settlement-world.js'),import('../src/world-model.js'),import('../src/military-scenery.js'),import('../src/settlement-session.js')]);
  const world=generateWorld(createSettlementWorld(),{detail:'network'});prepareMilitaryScenery(world,generateWorldRegion);const session=createSettlementSession(world),games=[session.player,...session.bots.map(entry=>entry.game)];
  const getPlacements=createMilitaryCollisionSource(world,{session}),cities=games.map(game=>({...game.houses[0],id:`city:${game.ownerId}`,ownerId:game.ownerId,radius:3}));
  const sim=createMilitarySimulation(world,{getCities:()=>cities,getPlacements,getAccount:id=>games.find(game=>game.ownerId===id),botOwners:session.bots.map(entry=>entry.game.ownerId)});
  for(const kind of ['tank','artillery','helicopter','soldier','soldier','soldier'])assert.equal(sim.buy(session.player.ownerId,kind).ok,true);
  const firingOwners=new Set(),origins=new Map();let goldGroundTravel=0;
  for(let tick=0;tick<3600;tick++){sim.update(.05);for(const event of sim.drainEvents())if(event.type==='shot')firingOwners.add(event.ownerId);
    for(const unit of sim.units){if(!origins.has(unit.id))origins.set(unit.id,{x:unit.x,z:unit.z});if(unit.ownerId==='gold'&&unit.kind!=='helicopter')goldGroundTravel=Math.max(goldGroundTravel,Math.hypot(unit.x-origins.get(unit.id).x,unit.z-origins.get(unit.id).z));}}
  assert.equal(firingOwners.size,4);assert.ok(sim.stats.kills>15);assert.ok(goldGroundTravel>100,'eastern ground army advances across the island instead of failing its long route at spawn');
  assert.ok(sim.stats.navigation.terrainCacheSize<=65536);assert.ok(sim.stats.navigation.failedCacheSize<=512);sim.dispose();
});

// These checks exercise physical constraints rather than particular animation
// frames: a command cannot teleport a hull's facing or slide it sideways.
test('heavy chassis accelerate and turn at bounded rates without sideways gliding',()=>{
  const f=fixture(),tank=pose(f.simulation.buy('teal','tank').unit,0,0);tank.heading=0;
  f.simulation.command('teal',[tank.id],{type:'move',x:0,z:-12});let travelled=0;
  for(let i=0;i<240;i++){
    const old={x:tank.x,z:tank.z,heading:tank.heading,speed:tank.speed};f.simulation.update(.05);
    const dx=tank.x-old.x,dz=tank.z-old.z;travelled+=Math.hypot(dx,dz);
    assert.ok(Math.abs(militaryAngle(tank.heading-old.heading))<=MILITARY_MOTION.tank.turnRate*.05+1e-8);
    assert.ok(tank.speed<=old.speed+MILITARY_MOTION.tank.acceleration*.05+1e-8);
    assert.ok(Math.abs(dx*Math.cos(tank.heading)-dz*Math.sin(tank.heading))<1e-8,'motion follows tracks, not turret or waypoint direction');
    if(i===0){assert.ok(Math.abs(tank.heading)<.05);assert.ok(Math.hypot(dx,dz)<1e-6,'a reversal begins by pivoting');}
  }
  assert.ok(travelled>7);assert.ok(tank.z<-7);
});

test('a tank traverses its turret toward a rear target without turning its idle chassis',()=>{
  const f=fixture(),tank=pose(f.simulation.buy('teal','tank').unit,0,0),target=pose(f.simulation.buy('coral','tank').unit,0,-11);
  tank.heading=0;target.nextShotAt=999;let firstShot=null;
  for(let i=0;i<100;i++){
    const yaw=tank.aimYaw;f.simulation.update(.05);
    assert.equal(tank.heading,0);assert.ok(Math.abs(militaryAngle(tank.aimYaw-yaw))<=MILITARY_WEAPONS.tank.yawRate*.05+1e-8);
    for(const event of f.simulation.drainEvents())if(event.type==='shot'&&event.unitId===tank.id)firstShot??=event;
  }
  assert.ok(firstShot);assert.ok(firstShot.time>2,'weapon must traverse before it can shoot behind itself');
  assert.ok(firstShot.to.z<firstShot.from.z);
});

test('tank minimum range and gun depression prevent impossible point-blank shots',()=>{
  const f=fixture(),tank=pose(f.simulation.buy('teal','tank').unit,0,0),target=pose(f.simulation.buy('coral','soldier').unit,0,3);
  tank.heading=0;target.nextShotAt=999;advance(f.simulation,3);assert.equal(f.simulation.stats.shots,0);
  pose(tank,0,0,1);pose(target,0,5);target.nextShotAt=999;advance(f.simulation,3);assert.equal(f.simulation.stats.shots,0,'a target beyond minimum range can still be below gun depression on lower ground');
  pose(tank,0,0);pose(target,0,9);target.nextShotAt=999;advance(f.simulation,3);assert.ok(f.simulation.stats.shots>0,'a reachable target can be engaged');
});

test('limited helicopter and artillery mounts turn their chassis to engage targets behind them',()=>{
  for(const kind of ['helicopter','artillery']){
    const f=fixture(),unit=pose(f.simulation.buy('teal',kind).unit,0,0,kind==='helicopter'?5:0),target=pose(f.simulation.buy('coral','tank').unit,0,-11);
    unit.heading=0;target.nextShotAt=999;let fired=false;
    for(let i=0;i<160;i++){
      const heading=unit.heading;f.simulation.update(.05);
      assert.ok(Math.abs(militaryAngle(unit.heading-heading))<=MILITARY_MOTION[kind].turnRate*.05+1e-8);
      for(const event of f.simulation.drainEvents())if(event.type==='shot'&&event.unitId===unit.id)fired=true;
    }
    assert.ok(fired,`${kind} can acquire a rear target with bounded body and weapon rotation`);assert.ok(Math.abs(unit.heading)>1);
  }
});

test('shots launch from their canonical muzzle along the barrel and artillery takes a high arc',()=>{
  for(const kind of ['soldier','tank','artillery','helicopter']){
    const f=fixture(),unit=pose(f.simulation.buy('teal',kind).unit,0,0,kind==='helicopter'?5:0),target=pose(f.simulation.buy('coral','tank').unit,0,kind==='soldier'?7:11);
    unit.heading=0;target.nextShotAt=999;let shot=null;
    for(let i=0;i<120&&!shot;i++){f.simulation.update(.05);shot=f.simulation.drainEvents().find(e=>e.type==='shot'&&e.unitId===unit.id);}
    assert.ok(shot,kind);const muzzle=getMilitaryMuzzle(unit),forward=getMilitaryForward(unit);
    assert.ok(Math.hypot(shot.from.x-muzzle.x,shot.from.y-muzzle.y,shot.from.z-muzzle.z)<1e-8);
    const launch={x:shot.to.x-shot.from.x,y:shot.to.y-shot.from.y+4*shot.arcHeight,z:shot.to.z-shot.from.z},length=Math.hypot(launch.x,launch.y,launch.z);
    assert.ok((launch.x*forward.x+launch.y*forward.y+launch.z*forward.z)/length>.999999,'trajectory initially follows visible barrel');
    if(kind==='artillery'){assert.ok(shot.arcHeight>2.5);assert.ok(forward.y>.6);assert.equal(shot.duration,1.4);}else assert.equal(shot.arcHeight,0);
  }
});

test('a moving target must be reacquired before a gun fires again',()=>{
  const f=fixture(),tank=pose(f.simulation.buy('teal','tank').unit,0,0),target=pose(f.simulation.buy('coral','tank').unit,0,11);
  tank.heading=0;target.nextShotAt=999;let fired=false;
  for(let i=0;i<60&&!fired;i++){f.simulation.update(.05);fired=f.simulation.drainEvents().some(e=>e.type==='shot'&&e.unitId===tank.id);}
  assert.ok(fired);pose(target,0,-11);target.nextShotAt=999;tank.nextShotAt=0;
  advance(f.simulation,.5);assert.equal(f.simulation.drainEvents().filter(e=>e.type==='shot'&&e.unitId===tank.id).length,0);
  advance(f.simulation,3);assert.ok(f.simulation.drainEvents().some(e=>e.type==='shot'&&e.unitId===tank.id&&e.to.z<0));
});

test('helicopters lean into forward motion and turns while retaining fixed altitude',()=>{
  const f=fixture(),heli=pose(f.simulation.buy('teal','helicopter').unit,0,0,5);heli.heading=0;
  f.simulation.command('teal',[heli.id],{type:'move',x:0,z:30});advance(f.simulation,2);
  assert.ok(heli.pitch>.12);assert.equal(heli.y,5);
  f.simulation.command('teal',[heli.id],{type:'move',x:30,z:heli.z});let banked=false;
  for(let i=0;i<40;i++){f.simulation.update(.05);banked||=Math.abs(heli.roll)>.03;assert.equal(heli.y,5);assert.ok(Math.abs(heli.roll)<=.22);}
  assert.ok(banked);f.simulation.command('teal',[heli.id],{type:'stop'});advance(f.simulation,2);assert.ok(Math.abs(heli.pitch)<.001&&Math.abs(heli.roll)<.001);
});

test('a helicopter directly above its target moves to a stable firing stand-off',()=>{
  const f=fixture(),heli=pose(f.simulation.buy('teal','helicopter').unit,0,0,5),target=pose(f.simulation.buy('coral','tank').unit,0,0);
  heli.heading=0;target.nextShotAt=999;f.simulation.command('teal',[heli.id],{type:'attack',targetId:target.id});
  let fired=false,maxSeparation=0;
  for(let i=0;i<200;i++){
    f.simulation.update(.05);maxSeparation=Math.max(maxSeparation,Math.hypot(heli.x-target.x,heli.z-target.z));assert.equal(heli.y,5);
    fired||=f.simulation.drainEvents().some(event=>event.type==='shot'&&event.unitId===heli.id);
  }
  assert.ok(maxSeparation>1,'the aircraft leaves an unreachable straight-down firing angle');
  assert.ok(fired,'the aircraft reaches a valid depression angle and engages');
  assert.ok(f.simulation.stats.navigation.searches<12,'coincident targets do not request a fresh zero-length path every tick');
});
