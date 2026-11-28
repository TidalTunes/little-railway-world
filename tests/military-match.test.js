import test from 'node:test';
import assert from 'node:assert/strict';
import {createMilitarySimulation} from '../src/military-simulation.js';
import {createMilitaryNavigation} from '../src/military-navigation.js';
import {createMatchState} from '../src/match-state.js';
import {Vector3} from 'three';
import {surfaceOffset,surfaceDistance,surfacePoint,surfaceFrame} from '../src/world-surface.js';
import {createSettlementSession} from '../src/settlement-session.js';
import {createSettlementRailways} from '../src/settlement-railways.js';
import {createSettlementEconomy} from '../src/settlement-economy.js';

function wallet(){return{logs:100,food:100,spendResources(n){if(this.logs<n)return{ok:false};this.logs-=n;return{ok:true};},spendFood(n){if(this.food<n)return{ok:false};this.food-=n;return{ok:true};},addLogs(n){this.logs+=n;}};}
function fixture({players,surface,surfaceAt=()=>({type:'ground',height:0}),placements=[],cities,botOwners=[]}={}){
  players??=[{id:'a',teamId:'blue',spawn:{x:-60,z:0,heading:0}},{id:'b',teamId:'blue',spawn:{x:-30,z:0,heading:0}},{id:'c',teamId:'red',spawn:{x:60,z:0,heading:0}}];
  const world={seed:'match-test',players,surface,gameplay:{match:{localPlayerId:players[0].id,players}}},accounts=new Map(players.map(p=>[p.id,wallet()]));
  cities??=players.map(p=>({id:`city-${p.id}`,ownerId:p.id,...p.spawn,radius:4}));
  const sim=createMilitarySimulation(world,{getCities:()=>cities,getPlacements:()=>placements,getAccount:id=>accounts.get(id),surfaceAt,botOwners});
  return{world,accounts,cities,sim};
}
function tick(sim,seconds,input){for(let t=0;t<seconds-1e-8;t+=.05){input?.();sim.update(.05);}}
function place(u,x,z,y=0){Object.assign(u,{x,z,y,nextShotAt:999});return u;}
const globe={type:'sphere',radius:100,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:100,centralLongitude:0,centralLatitude:0}};

test('a match creates one free owned infantry per player and possession is exclusive',()=>{
  const f=fixture();assert.equal(f.sim.units.length,3);assert.ok([...f.accounts.values()].every(a=>a.logs===100&&a.food===100));
  const own=f.sim.controlledUnit('a'),ally=f.sim.controlledUnit('b');assert.equal(own.avatarPlayerId,'a');assert.equal(f.sim.spawnPlayer('a').unit,own);assert.equal(f.sim.units.length,3);
  assert.equal(f.sim.possess('a',ally.id).code,'not-authorized');assert.equal(f.sim.setRole('a','tps').ok,true);assert.equal(f.sim.setRole('a','hybrid').code,'capture-required');
  assert.equal(f.sim.possess('a',ally.id).code,'unit-possessed');f.sim.release('b');assert.equal(f.sim.possess('a',ally.id).ok,true);assert.equal(ally.ownerId,'b');assert.equal(own.controlledBy,null);
  assert.equal(f.sim.possess('a',f.sim.controlledUnit('c').id).code,'not-authorized');assert.equal(f.sim.buy('a','tank').code,'role-restricted');
});

test('allied individual owners cannot target or damage each other with splash',()=>{
  const f=fixture(),art=f.sim.buy('a','artillery').unit,ally=f.sim.controlledUnit('b'),enemy=f.sim.controlledUnit('c');
  place(art,0,0);art.heading=0;art.nextShotAt=0;place(ally,.6,15);place(enemy,0,15);
  assert.equal(f.sim.command('a',[art.id],{type:'attack',targetId:ally.id}).code,'invalid-target');
  tick(f.sim,2.5);assert.equal(ally.hp,ally.maxHp);assert.ok(enemy.hp<enemy.maxHp);assert.equal(f.sim.allied('a','b'),true);
});

test('possessed infantry moves and jumps from refreshed input and fires only on manual demand',()=>{
  const f=fixture(),unit=f.sim.controlledUnit('a'),enemy=f.sim.controlledUnit('c');place(unit,0,0);place(enemy,0,6);unit.heading=0;unit.nextShotAt=0;
  tick(f.sim,1);assert.equal(f.sim.stats.shots,0,'possession disables autonomous firing');
  tick(f.sim,2,()=>f.sim.setDirectControl('a',{aimYaw:0,aimAt:{x:enemy.x,y:.36,z:enemy.z},fire:true}));assert.ok(enemy.hp<enemy.maxHp);
  place(enemy,80,0);let highest=0;tick(f.sim,1,()=>{f.sim.setDirectControl('a',{forward:1,aimYaw:0,sprint:true,jump:true});highest=Math.max(highest,unit.y);});
  assert.ok(unit.z>2);assert.ok(highest>.3);assert.equal(unit.y,0);const before=unit.z;tick(f.sim,1);assert.ok(unit.z-before<1.5,'stale input is stopped');assert.equal(unit.speed,0);
});

test('direct vehicle input respects bounded steering and manual cannon blind spots',()=>{
  const f=fixture(),tank=f.sim.buy('a','tank').unit;place(tank,0,0);tank.heading=0;tank.nextShotAt=0;f.sim.possess('a',tank.id);
  tick(f.sim,.5,()=>f.sim.setDirectControl('a',{forward:1,aimYaw:Math.PI}));assert.ok(Math.abs(tank.heading)<.5);assert.ok(surfaceDistance(f.world,tank,{x:0,z:0})<.01);
  tank.heading=0;tick(f.sim,1,()=>f.sim.setDirectControl('a',{aimYaw:0,aimAt:{x:0,y:.4,z:2},fire:true}));assert.equal(f.sim.stats.shots,0);
  tick(f.sim,2,()=>f.sim.setDirectControl('a',{aimYaw:0,aimAt:{x:0,y:1,z:10},fire:true}));assert.ok(f.sim.stats.shots>0);
});

test('globe direct movement, navigation and range remain physical across longitude seams at high latitude',()=>{
  const spawn={x:Math.PI*100-.6,z:-120,heading:Math.PI/2},players=[{id:'a',teamId:'blue',spawn}],f=fixture({players,surface:globe}),unit=f.sim.controlledUnit('a'),start={x:unit.x,z:unit.z};
  tick(f.sim,2,()=>f.sim.setDirectControl('a',{forward:1,aimYaw:Math.PI/2}));assert.ok(unit.x<0,'crosses date line');assert.ok(surfaceDistance(f.world,start,unit)>4);assert.ok(surfaceDistance(f.world,start,unit)<5);
  const target=surfaceOffset(f.world,unit.x,unit.z,8,0);f.sim.release('a');assert.equal(f.sim.command('a',[unit.id],{type:'move',...target}).ok,true);tick(f.sim,5);assert.ok(surfaceDistance(f.world,unit,target)<.1);
  const nav=createMilitaryNavigation(f.world,{surfaceAt:()=>({type:'ground',height:0})});assert.equal(nav.nearest({x:0,z:200},.24),null);assert.ok(nav.segment(start,target,.24));nav.dispose();
});

test('spherical target acquisition and shot endpoints use physical tangent distances',()=>{
  const a={x:Math.PI*100-.4,z:-125,heading:Math.PI/2},world={surface:globe},b=surfaceOffset(world,a.x,a.z,7,0),players=[{id:'a',teamId:'blue',spawn:a},{id:'c',teamId:'red',spawn:{...b,heading:0}}],f=fixture({players,surface:globe});
  const shooter=f.sim.controlledUnit('a'),target=f.sim.controlledUnit('c');f.sim.release('a');shooter.nextShotAt=0;target.nextShotAt=999;
  tick(f.sim,2);const shot=f.sim.drainEvents().find(e=>e.type==='shot');assert.ok(shot);assert.ok(surfaceDistance(f.world,shot.from,shot.to)<12);assert.ok(Math.abs(shot.localTo.x)<12);assert.equal(shot.surfaceOrigin.y,shooter.y);
  const physical=new Vector3(shot.localTo.x,shot.localTo.y,shot.localTo.z).applyMatrix4(surfaceFrame(f.world,shot.surfaceOrigin.x,shot.surfaceOrigin.z)).add(surfacePoint(f.world,shot.surfaceOrigin.x,shot.surfaceOrigin.y,shot.surfaceOrigin.z));
  assert.ok(physical.distanceTo(surfacePoint(f.world,shot.to.x,shot.to.y,shot.to.z))<1e-8,'effect endpoint and authoritative impact are the same physical point');
});

test('capture needs twenty uncontested seconds, excludes villages and offers the city to a TPS ally',()=>{
  const f=fixture(),captor=f.sim.controlledUnit('a'),defender=f.sim.controlledUnit('c'),city=f.cities.find(c=>c.ownerId==='c');f.cities.splice(f.cities.findIndex(c=>c.ownerId==='b'),1);f.sim.setRole('b','tps');place(captor,city.x,city.z);place(defender,100,0);
  tick(f.sim,10);assert.ok(f.sim.captures.find(s=>s.cityId===city.id).progress>.4);place(defender,city.x+2,city.z);tick(f.sim,.5);assert.equal(f.sim.captures.find(s=>s.cityId===city.id).progress,0);
  place(defender,100,0);tick(f.sim,20.5);const events=f.sim.drainEvents(),capture=events.find(e=>e.type==='city-captured');assert.equal(capture.toOwnerId,'a');assert.equal(events.filter(e=>e.type==='city-captured').length,1);
  city.ownerId='a';tick(f.sim,.6);const invitation=f.sim.match.invitations[0];assert.equal(invitation.toPlayerId,'b');assert.equal(f.sim.match.player('c').role,'tps');
  assert.equal(f.sim.acceptCity('b',invitation.id).ok,true);assert.equal(f.sim.match.player('b').role,'hybrid');city.ownerId='b';tick(f.sim,.6);
  assert.equal(f.sim.match.winnerTeamId,'blue');assert.ok(f.sim.drainEvents().some(e=>e.type==='city-awarded'));
});

test('a helicopter crosses ocean to capture a city and defending vehicles contest its full twenty-second hold',()=>{
  const surfaceAt=(x,z)=>({type:x>0&&x<40?'water':'ground',height:0}),f=fixture({surface:globe,surfaceAt}),helicopter=f.sim.buy('a','helicopter').unit,tank=f.sim.buy('c','tank').unit,city=f.cities.find(c=>c.ownerId==='c');
  place(helicopter,-10,0,5);place(tank,130,30);place(f.sim.controlledUnit('c'),130,-30);helicopter.heading=Math.PI/2;
  assert.ok(f.sim.command('a',[helicopter.id],{type:'move',x:city.x,z:city.z}).ok);let crossedOcean=false;
  tick(f.sim,25,()=>{if(surfaceAt(helicopter.x,helicopter.z).type==='water')crossedOcean=true;});
  assert.ok(crossedOcean);assert.ok(surfaceDistance(f.world,helicopter,city)<.3);assert.equal(helicopter.y,5);assert.ok(!f.sim.drainEvents().some(e=>e.type==='city-captured'));
  place(tank,city.x+2,city.z);tick(f.sim,.5);const capture=f.sim.captures.find(c=>c.cityId===city.id);assert.equal(capture.contested,true);assert.equal(capture.progress,0);
  place(tank,130,30);tick(f.sim,19);assert.ok(!f.sim.drainEvents().some(e=>e.type==='city-captured'));tick(f.sim,1.5);
  const event=f.sim.drainEvents().find(e=>e.type==='city-captured');assert.equal(event.cityId,city.id);assert.equal(event.toOwnerId,'a');assert.equal(event.teamId,'blue');f.sim.dispose();
});

test('roles do not demote founders before a city exists and cannot voluntarily restore commander access',()=>{
  const state=createMatchState({players:[{id:'a',teamId:'blue'},{id:'b',teamId:'red'}]});state.syncCities([]);assert.equal(state.player('a').role,'hybrid');assert.equal(state.winnerTeamId,null);
  state.syncCities([{id:'city',ownerId:'a'}]);assert.equal(state.winnerTeamId,null);state.setRole('a','tps');state.syncCities([{id:'city',ownerId:'a'}]);assert.equal(state.player('a').role,'tps');assert.equal(state.setRole('a','hybrid').ok,false);
});

test('144 free avatars stay bounded and bot-builder synchronization does not duplicate bodies',()=>{
  const players=Array.from({length:144},(_,i)=>({id:`p${i}`,teamId:`t${Math.floor(i/12)}`,spawn:{x:(i%12)*35,z:Math.floor(i/12)*35,heading:0}})),f=fixture({players});
  assert.equal(f.sim.units.length,144);const avatar=f.sim.controlledUnit('p0');assert.equal(f.sim.syncPlayerAvatar('p0',{x:1,z:2,y:0,heading:1,speed:1}).ok,true);f.sim.update(.05);assert.equal(avatar.x,1);assert.equal(avatar.z,2);
  tick(f.sim,2);assert.equal(f.sim.units.length,144);assert.equal(f.sim.stats.shots,0);assert.equal(f.sim.stats.navigation.searches,0);assert.ok(f.sim.stats.navigation.terrainCacheSize<5000);
});

test('screen-right input moves right in the behind-character camera and builder snapshots are accepted',()=>{
  const f=fixture(),unit=f.sim.controlledUnit('a');place(unit,0,0);unit.heading=0;
  tick(f.sim,1.5,()=>f.sim.setDirectControl('a',{right:1,aimYaw:0}));assert.ok(unit.x<-.5);assert.ok(Math.abs(unit.z)<.25);
  assert.equal(f.sim.syncPlayerAvatar('a',{position:{x:3,y:0,z:4},heading:.5,speed:1}).ok,true);assert.equal(unit.x,3);
});

test('outposts and gray villages cannot be captured and founders do not lose their role',()=>{
  const cities=[{id:'founder',ownerId:'a',x:-60,z:0,radius:4,outpost:true,houseCount:1},{id:'enemy',ownerId:'c',x:60,z:0,radius:4,outpost:true,houseCount:1},{id:'village',ownerId:'neutral',x:0,z:0,radius:4,village:true,houseCount:6}],f=fixture({cities});
  place(f.sim.controlledUnit('a'),60,0);place(f.sim.controlledUnit('c'),100,0);tick(f.sim,22);assert.equal(f.sim.captures.length,0);assert.equal(f.sim.match.player('a').role,'hybrid');assert.equal(f.sim.match.winnerTeamId,null);
});

test('match bots preserve construction funds and wait for a level-two city before recruiting',()=>{
  const cities=[{id:'founder',ownerId:'a',x:-60,z:0,radius:4,outpost:true,houseCount:1,level:0},{id:'enemy',ownerId:'c',x:60,z:0,radius:4,outpost:false,houseCount:3,level:1}],f=fixture({cities,botOwners:['c']});
  f.accounts.get('c').logs=40;f.accounts.get('c').food=12;tick(f.sim,5);assert.equal(f.sim.units.length,3);assert.equal(f.accounts.get('c').logs,40);
  cities[1].level=2;cities[1].houseCount=6;tick(f.sim,4);assert.ok(f.sim.units.length>3);assert.ok(f.accounts.get('c').logs>=8);assert.ok(f.accounts.get('c').food>=2);
});

test('a defeated controlled body is replaced after five seconds without spending the player wallet',()=>{
  const f=fixture(),unit=f.sim.controlledUnit('a');unit.hp=0;f.sim.update(.05);assert.equal(f.sim.controlledUnit('a'),null);tick(f.sim,4.8);assert.equal(f.sim.controlledUnit('a'),null);
  tick(f.sim,.5);const replacement=f.sim.controlledUnit('a');assert.ok(replacement);assert.notEqual(replacement.id,unit.id);assert.equal(replacement.kind,'soldier');assert.equal(f.accounts.get('a').logs,100);
  assert.ok(f.sim.drainEvents().some(e=>e.type==='player-respawned'));
});

test('accepting a captured city releases an allied-owned body before restoring commander permissions',()=>{
  const f=fixture({cities:[{id:'ca',ownerId:'a',x:-60,z:0,radius:4},{id:'cc',ownerId:'c',x:60,z:0,radius:4}]}),own=f.sim.controlledUnit('b'),ally=f.sim.controlledUnit('a');
  f.sim.setRole('b','tps');f.sim.release('a');assert.ok(f.sim.possess('b',ally.id).ok);
  f.sim.match.recordCapture('cc','a');const invitation=f.sim.inviteCity('a','cc','b').invitation;assert.ok(invitation);
  assert.ok(f.sim.acceptCity('b',invitation.id).ok);assert.equal(f.sim.match.player('b').role,'hybrid');assert.equal(f.sim.controlledUnit('b'),own);assert.equal(ally.controlledBy,null);assert.equal(f.sim.match.controller(ally.id),null);
});

test('simultaneous captured-city offers cannot award one player two command slots',()=>{
  const state=createMatchState({players:[{id:'a',teamId:'blue'},{id:'b',teamId:'blue',role:'tps'},{id:'c',teamId:'red'},{id:'d',teamId:'red'}]});
  state.syncCities([{id:'one',ownerId:'c'},{id:'two',ownerId:'d'}]);state.recordCapture('one','a');state.recordCapture('two','a');
  const first=state.inviteCity('one','a','b').invitation,second=state.inviteCity('two','a','b').invitation;assert.ok(first&&second);
  assert.equal(state.acceptCity('b',first.id).ok,true);assert.equal(state.player('b').role,'hybrid');assert.deepEqual(state.player('b').assignedCityIds,['one']);
  assert.equal(state.invitations.length,0,'accepting command expires every other queued offer to that player');
  assert.equal(state.acceptCity('b',second.id).code,'invalid-invitation');assert.deepEqual(state.player('b').cityIds,['one']);assert.deepEqual(state.player('a').cityIds,['two'],'the second city stays with its steward');
  assert.equal(state.drainEvents().filter(event=>event.reason==='city-award').length,1);
});

test('an invitation is revalidated if an external city update fills the recipient’s slot',()=>{
  const state=createMatchState({players:[{id:'a',teamId:'blue'},{id:'b',teamId:'blue',role:'tps'},{id:'c',teamId:'red'}]});
  state.syncCities([{id:'capture',ownerId:'c'}]);state.recordCapture('capture','a');const invitation=state.inviteCity('capture','a','b').invitation;
  state.syncCities([{id:'capture',ownerId:'a',steward:true},{id:'existing',ownerId:'b'}]);
  assert.equal(state.acceptCity('b',invitation.id).code,'invalid-invitation');assert.equal(state.player('b').role,'tps');assert.deepEqual(state.player('b').assignedCityIds,['existing']);assert.deepEqual(state.player('a').cityIds,['capture']);
});

test('unfounded roster teams keep a match alive after the first city capture',()=>{
  const state=createMatchState({players:[{id:'a',teamId:'a'},{id:'b',teamId:'b'},{id:'c',teamId:'c'}]});state.syncCities([{id:'ca',ownerId:'a'},{id:'cb',ownerId:'b'}]);state.recordCapture('cb','a');state.syncCities([{id:'ca',ownerId:'a'},{id:'cb',ownerId:'a',steward:true}]);assert.equal(state.winnerTeamId,null);
});

test('a TPS bot possesses an allied body and navigates toward enemy cities without RTS permission',()=>{
  const f=fixture({botOwners:['b'],cities:[{id:'enemy',ownerId:'c',x:5,z:0,radius:4,houseCount:3,level:1}]}),bot=f.sim.controlledUnit('b');place(bot,-8,0);place(f.sim.controlledUnit('c'),60,0);f.sim.setRole('b','tps');f.sim.release('b');
  assert.equal(f.sim.command('b',[bot.id],{type:'move',x:5,z:0}).code,'role-restricted');tick(f.sim,10);assert.equal(f.sim.controlledUnit('b'),bot);assert.ok(bot.x>0);assert.ok(bot.botDriver);assert.ok(f.sim.stats.navigation.searches<10);
});

test('capture and city award transfer real settlements, stations and minute production without moving wallets',()=>{
  const flat=()=>({type:'ground',height:0}),home=(id,x)=>({id:`${id}:home-1`,ownerId:id,kind:'house',x,y:0,z:0,rotation:0,scale:1});
  const players=[{id:'a',teamId:'blue',spawn:{x:0,z:8}},{id:'b',teamId:'blue',spawn:{x:70,z:8}},{id:'c',teamId:'red',spawn:{x:140,z:8}}];
  const world={seed:'integrated-capture',players,gameplay:{economy:'loops',ownerId:'a',starterHouse:home('a',0),match:{localPlayerId:'a',players},playerBots:players.slice(1).map(p=>({id:p.id,ownerId:p.id,starterHouse:home(p.id,p.spawn.x)}))}};
  const session=createSettlementSession(world,{surfaceAt:flat}),railways=createSettlementRailways(world,{session,surfaceAt:flat,sceneryCatalog:[]}),economy=createSettlementEconomy(world,{session,railways});
  for(const game of session.accounts){
    assert.deepEqual([game.logs,game.food,game.gold],[40,12,50]);
    game.setEconomy({resourcesAt:p=>economy.resourcesAt(game.ownerId,p),spendConstruction:(p,c)=>economy.spendConstruction(game.ownerId,p,c),spendResources:n=>economy.spendResources(game.ownerId,n),creditResources:n=>economy.creditResources(game.ownerId,n)});
  }
  for(const x of [5,-5])assert.ok(session.player.build({x,z:0}).ok);
  const enemy=session.gameForOwner('c');
  for(let radius=5;enemy.houses.length<6&&radius<=10;radius+=2.5)for(let i=0;i<12&&enemy.houses.length<6;i++)enemy.build({x:140+Math.cos(i*Math.PI/6)*radius,z:Math.sin(i*Math.PI/6)*radius});
  assert.equal(enemy.houses.length,6);railways.synchronizeStations();const target=enemy.cities[0],station=railways.stations.find(s=>s.cityId===target.id);assert.ok(station);
  const sim=createMilitarySimulation(world,{getCities:()=>session.cities,getPlacements:()=>session.buildings,getAccount:id=>session.gameForOwner(id),surfaceAt:flat});
  sim.setRole('b','tps');session.setPlayerRole('b','tps');place(sim.controlledUnit('a'),target.x,target.z);place(sim.controlledUnit('b'),70,30);place(sim.controlledUnit('c'),200,30);
  const balances=()=>session.accounts.map(game=>[game.logs,game.food,game.gold]),beforeCapture=balances();let captures=0;
  function advance(seconds){for(let i=0;i<Math.round(seconds/.05);i++){
    sim.update(.05);for(const event of sim.drainEvents()){
      if(event.type==='city-captured'){captures++;assert.ok(session.captureCity(event.cityId,event.toOwnerId,{steward:true}).ok);}
      if(event.type==='city-awarded')assert.ok(session.captureCity(event.cityId,event.toOwnerId).ok);
      if(event.type==='role-changed')session.setPlayerRole(event.playerId,event.role);
    }
    economy.update(.05);railways.synchronizeStations();
  }}
  advance(21);assert.equal(captures,1);assert.deepEqual(balances(),beforeCapture);assert.equal(session.cities.find(c=>c.id===target.id).ownerId,'a');assert.equal(economy.city(target.id).ownerId,'a');
  assert.equal(railways.stations.find(s=>s.id===station.id).ownerId,'a');assert.equal(session.playerRole('c'),'tps');assert.equal(enemy.population,0);
  advance(39);const first=economy.drainEvents().filter(e=>e.type==='production');assert.deepEqual(first.map(e=>[e.ownerId,e.amount]).sort(),[['a',9],['b',1]]);
  const invitation=sim.match.invitations.find(invite=>invite.toPlayerId==='b');assert.ok(invitation);const beforeAward=balances();assert.ok(sim.acceptCity('b',invitation.id).ok);advance(.6);
  assert.deepEqual(balances(),beforeAward);assert.equal(session.playerRole('b'),'hybrid');assert.equal(session.cities.find(c=>c.id===target.id).ownerId,'b');assert.equal(railways.stations.find(s=>s.id===station.id).ownerId,'b');assert.equal(economy.city(target.id).ownerId,'b');
  advance(59.4);const second=economy.drainEvents().filter(e=>e.type==='production');assert.deepEqual(second.map(e=>[e.ownerId,e.amount]).sort(),[['a',3],['b',7]]);
  sim.dispose();sim.update(1);assert.equal(sim.units.length,0);assert.deepEqual(sim.drainEvents(),[]);assert.equal(sim.buy('a','soldier').code,'disposed');
});
