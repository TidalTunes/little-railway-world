import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createSettlementSession} from '../src/settlement-session.js';
import {createPlayerBotSettlements} from '../src/player-bot-settlements.js';
import {createMutableTrees} from '../src/mutable-trees.js';

const home=(id,ownerId,x)=>({id,ownerId,kind:'house',x,y:0,z:0,rotation:0,scale:1,variant:0});
function fixture(t,{tree,loaded=false,count=2,scenery=[],getInfrastructure}={}){
  const previous=globalThis.document;
  globalThis.document={createElement:()=>({getContext:()=>({beginPath(){},arc(){},fill(){},fillText(){}})})};
  const world={seed:'rendered-bots',players:[{id:'teal',color:{l:.62,c:.12,h:170}},{id:'coral',color:{l:.63,c:.14,h:22}},{id:'blue',color:{l:.63,c:.14,h:250}}],
    outline:[[-80,-80],[80,-80],[80,80],[-80,80]],mountains:[],cities:[],stations:[],placements:[],lines:[],
    river:{points:[],width:0,y:-1.2},rivers:[],gameplay:{ownerId:'teal',starterHouse:home('home-1','teal',-40),
      botScenery:[...scenery,...tree?[tree]:[]],playerBots:['coral','blue'].slice(0,count).map((ownerId,index)=>({id:`bot:${ownerId}`,ownerId,
        starterHouse:home(`bot:${ownerId}:home-1`,ownerId,index*24),spawn:{x:index*24,z:2.5,heading:0}}))}};
  const scene=new THREE.Group(),map=new THREE.Group(),treeRoot=new THREE.Group(),trees=createMutableTrees(world);
  if(loaded&&tree)trees.addChunk('loaded',treeRoot,[tree]);
  const calls=[],detail={fellTree(id,options){calls.push(['fall',id]);return trees.fellTree(id,options);},removeTree(id){calls.push(['remove',id]);return trees.removeTree(id);}};
  const session=createSettlementSession(world,{getInfrastructure}),bots=createPlayerBotSettlements({world,session,parent:scene,mapParent:map,markerParent:scene,markerMapParent:map,detail});
  if(previous===undefined)delete globalThis.document;else globalThis.document=previous;
  const camera=new THREE.OrthographicCamera(-45,45,30,-30,.1,400);camera.position.set(12,60,-60);camera.lookAt(12,0,0);camera.updateMatrixWorld(true);
  t.after(()=>{bots.dispose();trees.dispose();});return{world,scene,map,treeRoot,trees,calls,session,bots,camera};
}
function grow(entry){
  for(let i=0;i<12;i++)entry.game.chop({id:`${entry.config.id}:fuel-${i}`,kind:'tree',x:70,z:70});
  const x=entry.config.starterHouse.x;
  assert.ok(entry.game.build({x:x+5,z:0}).ok);assert.ok(entry.game.build({x,z:5}).ok);
}

test('render integration keeps each owner’s city, resident network and nighttime return independent',t=>{
  const {bots,session,camera}=fixture(t);const original=session.player.snapshot();
  for(const entry of bots.entries)grow(entry);
  bots.simulate(0);
  assert.deepEqual(session.player.snapshot(),{...original,removedTreeIds:session.player.snapshot().removedTreeIds},'foreign construction cannot change player homes or balances');
  for(const entry of bots.entries){
    assert.equal(entry.houseCount,3);assert.equal(entry.residents.stats.residents,3);
    assert.ok(entry.snapshot.houses.every(house=>house.ownerId===entry.config.ownerId));
    assert.ok(entry.residents.snapshot().every(resident=>resident.houseId.startsWith(`${entry.config.id}:`)));
  }
  for(let step=0;step<600;step++)bots.update(.2,{camera,focus:{x:12,z:0},dayPhase:'night',night:1});
  for(const entry of bots.entries){assert.equal(entry.residents.stats.indoors,3);assert.equal(entry.residents.stats.visible,0);}
  const artRevisions=bots.entries.map(entry=>entry.art.revision),layouts=bots.entries.map(entry=>entry.snapshot);
  bots.simulate(0,{completedDays:1});bots.simulate(0,{completedDays:1});
  assert.deepEqual(bots.entries.map(entry=>entry.game.gold),[3,3]);assert.equal(session.player.gold,0);
  assert.deepEqual(bots.entries.map(entry=>entry.art.revision),artRevisions,'income does not rebuild building meshes or reset resident graphs');
  bots.entries.forEach((entry,index)=>assert.equal(entry.snapshot,layouts[index],'wallet changes do not clone the full scenery/resident layout'));
  for(let step=0;step<100;step++)bots.update(.2,{camera,focus:{x:12,z:0},dayPhase:'day',night:0});
  for(const entry of bots.entries){assert.equal(entry.residents.stats.indoors,0);assert.equal(entry.residents.stats.visible,3);}
});

test('bot chops animate loaded trees and permanently suppress unloaded trees on later hydration',t=>{
  for(const loaded of [false,true]){
    const tree={id:`bot-tree-${loaded}`,kind:'tree',variant:'round',x:0,y:0,z:6,scale:1};
    const {bots,session,trees,treeRoot,calls}=fixture(t,{tree,loaded,count:1});
    for(let frame=0;frame<600&&!session.shared.removedTreeIds.has(tree.id);frame++)bots.simulate(1/60);
    assert.ok(session.shared.removedTreeIds.has(tree.id));assert.ok(trees.removed.has(tree.id));
    assert.deepEqual(calls,loaded?[['fall',tree.id]]:[['fall',tree.id],['remove',tree.id]]);
    assert.equal(trees.activeFalls,loaded?1:0);
    trees.update(1);assert.equal(trees.activeFalls,0);
    const chunk=trees.addChunk('reloaded',treeRoot,[tree]);assert.equal(chunk.entries.length,0,'offscreen harvests never respawn as the camera arrives');
  }
});

test('growth publishes replacement collision batches and disposing the manager removes all rendered layers',t=>{
  const {bots,scene,map,camera}=fixture(t);const old=bots.meshes;
  for(const entry of bots.entries)grow(entry);bots.simulate(0);
  assert.notEqual(bots.meshes,old);assert.ok(bots.meshes.length>=old.length);
  bots.update(.2,{camera,focus:{x:12,z:0},mapBlend:1});
  for(const entry of bots.entries){assert.equal(entry.art.root.visible,false);assert.equal(entry.art.mapRoot.visible,true);assert.equal(entry.actor.root.visible,false);}
  bots.dispose();assert.equal(scene.children.length,0);assert.equal(map.children.length,0);
});

test('bots release cleared offscreen farm obstacles from their permanent navigation catalogue',t=>{
  let infrastructure={revision:0,clearedPlacementIds:[]};
  const tree={id:'orchard-tree',kind:'tree',variant:'round',x:0,y:0,z:7,scale:1};
  const farm={id:'offscreen-farm',kind:'farm',x:0,z:7,y:0,width:8,depth:7,radius:5.4,rotation:0};
  const {bots,session,world}=fixture(t,{tree,scenery:[farm],count:1,getInfrastructure:()=>infrastructure});
  for(let frame=0;frame<900;frame++)bots.simulate(1/60);
  assert.equal(session.shared.removedTreeIds.has(tree.id),false,'the farmer cannot walk into the uncleared field to reach the tree');
  infrastructure={revision:1,clearedPlacementIds:[farm.id]};
  for(let frame=0;frame<900&&!session.shared.removedTreeIds.has(tree.id);frame++)bots.simulate(1/60);
  assert.ok(session.shared.removedTreeIds.has(tree.id),'offscreen navigation refreshes immediately after clearing');
  assert.ok(world.gameplay.botScenery.some(item=>item.id===farm.id),'the authored source remains intact for deterministic streaming');
});
