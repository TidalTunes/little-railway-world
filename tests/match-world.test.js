import test from 'node:test';
import assert from 'node:assert/strict';
import {createMatchWorld,MATCH_RULES} from '../src/match-world.js';
import {generateWorld,worldSurface} from '../src/world-model.js';
import {surfaceDistance,surfaceOffset} from '../src/world-surface.js';
import {normalizePlayers} from '../src/development.js';
import {preparePlayerBotScenery} from '../src/player-bot-world.js';
import {prepareMilitaryScenery} from '../src/military-scenery.js';

const input=createMatchWorld(),world=generateWorld(input,{detail:'network'});

test('Earth match has twelve balanced teams with distinct deterministic players and ordinary daytime accounts',()=>{
  const {match}=world.gameplay;
  assert.equal(match.players.length,144);assert.equal(match.teams.length,12);assert.equal(new Set(match.players.map(p=>p.id)).size,144);
  assert.equal(world.players.length,145,'neutral food villages have one separate shared owner');
  assert.equal(world.gameplay.playerBots.length,143);assert.equal(match.localPlayerId,'teal');
  assert.deepEqual(world.gameplay.military,{enabled:true,startResources:40,startFood:12,startGold:50});assert.equal(world.gameplay.startSeconds,0);
  assert.equal(world.cities.length,0);assert.equal(world.lines.length,0);assert.equal(world.traffic.trainCount,0);
  assert.deepEqual(normalizePlayers(input.players),world.players,'normalization preserves team identity');
  for(const team of match.teams){const players=match.players.filter(p=>p.teamId===team.id);assert.equal(players.length,12);assert.deepEqual(team.playerIds,players.map(p=>p.id));for(const player of players){assert.equal(player.role,'hybrid');assert.deepEqual(world.players.find(p=>p.id===player.id).color,team.color);}}
  assert.deepEqual(createMatchWorld().gameplay.match,match);
  assert.notDeepEqual(createMatchWorld({seed:'another-match'}).gameplay.spawn,world.gameplay.spawn);
});

test('every player has dry, flat physical breathing room and guaranteed reachable timber',()=>{
  const roster=world.gameplay.match.players;
  for(const [index,player]of roster.entries()){
    const home=player.starterHouse;
    assert.deepEqual(worldSurface(world,player.spawn.x,player.spawn.z),{type:'ground',height:0});
    assert.deepEqual(worldSurface(world,home.x,home.z),{type:'ground',height:0});
    assert.equal(player.guaranteedTrees.length,8);
    for(const other of roster.slice(0,index))assert.ok(surfaceDistance(world,home,other.starterHouse)>=MATCH_RULES.homeSpacing-1e-5);
    for(const tree of player.guaranteedTrees){assert.ok(surfaceDistance(world,home,tree)<15);assert.equal(worldSurface(world,tree.x,tree.z).height,0);assert.ok(['tree','cactus'].includes(tree.kind));}
  }
  for(const [index,team]of world.gameplay.match.teams.entries())for(const other of world.gameplay.match.teams.slice(0,index))assert.ok(surfaceDistance(world,team.center,other.center)>500,'teams occupy separate continental areas');
});

test('each continental team has a neutral level-two village supplying food near its starts',()=>{
  const villages=world.gameplay.farmVillages;assert.equal(villages.cities.length,12);assert.equal(villages.houses.length,72);assert.equal(villages.farms.length,24);
  assert.equal(villages.ownerId,'village-gray','the shared village art uses the neutral palette');
  for(const [index,city]of villages.cities.entries()){
    assert.equal(city.ownerId,'village-gray');assert.equal(city.level,2);assert.equal(city.houseCount,6);assert.equal(city.bot,true);
    assert.ok(surfaceDistance(world,city,world.gameplay.match.teams[index].center)<450);
    for(const house of villages.houses.filter(h=>h.cityId===city.id))assert.deepEqual(worldSurface(world,house.x,house.z),{type:'ground',height:0});
  }
});

test('globe combat shares a bounded canonical scenery catalog instead of generating the whole planet',()=>{
  const calls=[],home=world.gameplay.starterHouse,tree={id:'near',kind:'tree',...surfaceOffset(world,home.x,home.z,5,0),y:0,radius:1};
  const catalog=preparePlayerBotScenery(world,(network,request)=>{calls.push(request);return{placements:[tree,{id:'ocean',kind:'tree',x:0,y:0,z:0,radius:1}]};});
  assert.ok(calls.length<100);assert.equal(calls.length,new Set(calls.map(r=>`${r.x}:${r.z}`)).size);
  assert.ok(catalog.every(p=>p.id==='near'));
  assert.equal(prepareMilitaryScenery(world,()=>assert.fail('military should reuse the catalog')),catalog);
});
