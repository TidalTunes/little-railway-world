import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {generateWorld} from '../src/world-model.js';
import {createNetworkTraffic} from '../src/network-traffic.js';
import {makeTrains} from '../src/railway.js';
import {playerColors} from '../src/player-palette.js';

test('train ownership follows its home city and stays stable while crossing other cities',()=>{
  const world=generateWorld({density:0}),traffic=createNetworkTraffic(world);
  const owners=new Map(traffic.trains.map(train=>[train.id,train.ownerId]));
  assert.ok(new Set(owners.values()).size>=3,'the fleet represents multiple players');
  for(const train of traffic.trains){
    assert.equal(train.ownerId,world.cities.find(city=>city.id===train.homeCityId).ownerId);
  }
  for(let i=0;i<400;i++)traffic.update(.25);
  for(const train of traffic.trains)assert.equal(train.ownerId,owners.get(train.id));
  const target=traffic.trains[0],replacement=world.players.find(player=>player.id!==target.ownerId);
  world.trainOwners={[target.id]:replacement.id};
  const reassigned=createNetworkTraffic(world);
  for(const train of reassigned.trains){
    assert.equal(train.ownerId,train.id===target.id?replacement.id:owners.get(train.id),
      'an explicit ownership assignment affects only its train');
  }
});

test('shuttle ownership inherits the line operator and accepts a per-train override',()=>{
  const world=generateWorld({density:0,mountains:[],
    cities:[{id:'a',x:-35,z:15},{id:'b',x:35,z:15}],
    connections:[{id:'link',from:'a',to:'b'}]});
  world.lines[0].ownerId=world.players[2].id;
  let traffic=createNetworkTraffic(world);
  assert.equal(traffic.mode,'shuttles');
  assert.equal(traffic.trains[0].ownerId,world.players[2].id);
  world.trainOwners={[traffic.trains[0].id]:world.players[1].id};
  traffic=createNetworkTraffic(world);
  assert.equal(traffic.trains[0].ownerId,world.players[1].id);
});

test('rendered train bodies and roofs both use their owners palette',()=>{
  const world=generateWorld({density:0}),root=new THREE.Group(),railway=makeTrains(root,world);
  for(const train of railway.trains){
    const player=world.players.find(player=>player.id===train.state.ownerId),colors=playerColors(player);
    for(const part of train.parts){
      const materials=part.children.filter(mesh=>mesh.isMesh).map(mesh=>mesh.material);
      for(const role of ['body','roof']){
        const material=materials.find(material=>material.name===`player-${player.id}-${role}`);
        assert.ok(material,`${role} has a player material`);
        assert.ok(material.color.equals(colors[role]),`${role} agrees with map/player color`);
      }
    }
  }
  const materials=new Set(root.userData.ownedMaterials),geometries=new Set();
  root.traverse(node=>{if(node.geometry)geometries.add(node.geometry);});
  materials.forEach(material=>material.dispose());geometries.forEach(geometry=>geometry.dispose());
});
