import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {preparePlayerBotScenery} from '../src/player-bot-world.js';
import {createSettlementSession} from '../src/settlement-session.js';
import {createPlayerBot} from '../src/player-bots.js';

test('the default desert settler physically harvests cacti and builds its six-house station milestone',()=>{
  const world=generateWorld(createSettlementWorld(),{detail:'network'});preparePlayerBotScenery(world,generateWorldRegion);
  const session=createSettlementSession(world),entry=session.bots.find(candidate=>candidate.config.biome==='desert');
  assert.ok(entry,'the default map has a dryland competitor');
  // Force one home's worth of harvesting. This fixture has no production or
  // regrowth, so its ten founding cacti must cover the entire resource deficit.
  const houseCost=entry.game.constructionCost.resources;
  assert.equal(entry.game.spendResources(houseCost).ok,true);
  const openingResources=entry.game.logs;
  const village=world.gameplay.farmVillages,permanent=[...world.gameplay.botScenery,...village.houses,...village.buildings];
  let revision=-1,placements=[];const hits=[];
  const getPlacements=()=>{
    if(revision!==session.revision){revision=session.revision;placements=[...permanent,...session.buildings];}
    return placements;
  };
  const bot=createPlayerBot(world,entry.game,{config:entry.config,getPlacements,getRevision:()=>session.revision,
    policy:{targetHouses:6},onChop:(hit,source,position)=>{
      assert.ok(Math.hypot(position.x-source.x,position.z-source.z)<1.1,'the axe reaches its actual source');
      hits.push({...hit,kind:source.kind});
    }});
  for(let time=0;time<300&&!bot.stopped;time+=.5)bot.update(.5);
  assert.equal(entry.game.houses.length,6);assert.equal(entry.game.cities[0].level,2);
  assert.ok(hits.some(hit=>hit.kind==='cactus'));assert.ok(hits.every(hit=>session.shared.removedTreeIds.has(hit.treeId)));
  assert.ok(hits.length>=houseCost,'the settler physically replaces the spent Resources');
  assert.ok(hits.every(hit=>hit.amount===1&&hit.logs===1),'each cactus supplies exactly one Resource');
  assert.equal(entry.game.logs,openingResources+hits.length-5*houseCost,'no passive production or invented Resources fund this fixture');
  assert.equal(new Set(hits.map(hit=>hit.treeId)).size,hits.length);assert.equal(bot.stats.blocked,0);
  assert.equal(session.player.houses.length,1,'rival building never mutates the human settlement');
});
