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
  railway.updateView(null);
  for(const train of railway.trains){
    const player=world.players.find(player=>player.id===train.state.ownerId),colors=playerColors(player);
    for(const part of train.parts){
      assert.equal(part.children.length,0,'pose handles do not duplicate carriage geometry');
      const meshes=railway.root.children.filter(mesh=>!mesh.userData.isTrainConnector&&mesh.userData.instanceTrainIds.includes(train.state.id));
      for(const role of ['body','roof']){
        const expected=colors[role];
        const found=meshes.some(mesh=>{
          assert.equal(mesh.userData.ownerId,player.id);
          assert.equal(mesh.material.vertexColors,true);
          const attribute=mesh.geometry.attributes.color;
          for(let i=0;i<attribute.count;i++)if(Math.abs(attribute.getX(i)-expected.r)<1e-6&&
            Math.abs(attribute.getY(i)-expected.g)<1e-6&&Math.abs(attribute.getZ(i)-expected.b)<1e-6)return true;
          return false;
        });
        assert.ok(found,`${role} keeps its owner's exact linear color in the shared geometry`);
      }
    }
  }
  railway.dispose();
});
