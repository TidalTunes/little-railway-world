import {biomeAt,biomeDistance,fitsBiome} from './biomes.js';
import {cityRandom} from './development.js';
import {riverBankDistance} from './hydrology.js';
import {mountainFootprintDistance} from './mountain-shape.js';
import {sampleLandscape} from './landscape-field.js';

export const PLAYER_BOT_WORLD=Object.freeze({owners:['coral','gold','blue'],spacing:38,sceneryRadius:44,chunkSize:192});
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);

/** Pick independent woodland homesteads. Only each home and its doorstep are
 * reserved: expanding players still have to fell the actual surrounding trees. */
export function createPlayerBotStarts(world,{count=3}={}){
  if(!world.gameplay||world.surface||!Number.isFinite(count)||count<1)return [];
  const owners=PLAYER_BOT_WORLD.owners.filter(id=>id!==world.gameplay.ownerId&&world.players.some(player=>player.id===id));
  const random=cityRandom(world.seed,'player-bot-starts'),candidates=[];
  const reservations=world.gameplay.reservations??[],human=world.gameplay.starterHouse;
  for(let z=-world.bounds.depth/2+18;z<world.bounds.depth/2-18;z+=6){
    for(let x=-world.bounds.width/2+18;x<world.bounds.width/2-18;x+=6){
      const candidate={x:x+(random()-.5)*3,z:z+(random()-.5)*3};
      if(!fitsBiome(world,['forest','plains'],candidate.x,candidate.z,14)
        ||biomeDistance(world,'forest',candidate.x,candidate.z)<-5
        ||riverBankDistance(world,candidate.x,candidate.z)<18
        ||world.mountains.some(mountain=>mountainFootprintDistance(mountain,candidate.x,candidate.z)<18)
        ||human&&distance(human,candidate)<PLAYER_BOT_WORLD.spacing
        ||reservations.some(other=>distance(candidate,other)<14+other.radius))continue;
      let woodland=0;
      for(let angle=0;angle<Math.PI*2;angle+=Math.PI/6){
        const px=candidate.x+Math.sin(angle)*19,pz=candidate.z+Math.cos(angle)*19;
        if(biomeAt(world,px,pz)==='forest'){
          const ecology=sampleLandscape(world,px,pz),core=Math.max(0,Math.min(1,(ecology.patch-.35)/.34));
          woodland+=core*core*(3-2*core)*(.55+ecology.detail*.45);
        }
      }
      const ecology=sampleLandscape(world,candidate.x,candidate.z);
      // A broad timber catchment is more useful than the darkest single grove;
      // a lighter central glade leaves room for the first construction sites.
      if(woodland<2)continue;
      candidates.push({...candidate,score:woodland+Math.max(0,biomeDistance(world,'forest',candidate.x,candidate.z))*.04
        +(1-Math.abs(ecology.patch-.52))*1.2+random()*.25});
    }
  }
  candidates.sort((a,b)=>b.score-a.score||a.x-b.x||a.z-b.z);
  // The best single grove can sit between two other good sites and block both.
  // With only three competitors, a small bounded group search preserves room
  // for everyone instead of greedily giving the first owner the whole forest.
  const target=Math.min(Math.floor(count),owners.length),result=[];
  let selected=[],bestScore=-Infinity;
  function choose(start,group,score){
    if(group.length>selected.length||group.length===selected.length&&score>bestScore){selected=[...group];bestScore=score;}
    if(group.length===target)return;
    for(let index=start;index<candidates.length;index++){
      const candidate=candidates[index];
      if(selected.length===target&&score+candidate.score*(target-group.length)<=bestScore)break;
      if(group.some(other=>distance(other,candidate)<PLAYER_BOT_WORLD.spacing))continue;
      choose(index+1,[...group,candidate],score+candidate.score);
    }
  }
  choose(0,[],0);
  for(const candidate of selected){
    const ownerId=owners[result.length],id=`bot:${ownerId}`,rotation=random()*Math.PI*2;
    const starterHouse={id:`${id}:home-1`,kind:'house',x:candidate.x,y:0,z:candidate.z,rotation,
      width:2.2,depth:2.2,scale:1,variant:result.length%4,ownerId,radius:Math.hypot(2.2,2.2)/2};
    const spawn={x:candidate.x+Math.sin(rotation)*3.4,z:candidate.z+Math.cos(rotation)*3.4,heading:rotation};
    result.push({id,ownerId,starterHouse,spawn});
  }
  return result;
}

export function playerBotReservations(bots){
  return bots.flatMap(bot=>[
    {id:`${bot.id}:home-reservation`,x:bot.starterHouse.x,z:bot.starterHouse.z,radius:bot.starterHouse.radius+.65},
    {id:`${bot.id}:spawn-reservation`,x:bot.spawn.x,z:bot.spawn.z,radius:1.05},
  ]);
}

/** A CPU-only copy of the canonical detail placements lets agents keep working
 * offscreen. No geometry compilation, extra detail chunks or scene objects are
 * needed. Preserve authored IDs exactly as the renderer does. */
export function preparePlayerBotScenery(world,generateRegion){
  const bots=world.gameplay?.playerBots??[];
  if(!bots.length)return [];
  const size=PLAYER_BOT_WORLD.chunkSize,radius=PLAYER_BOT_WORLD.sceneryRadius,requests=new Map();
  for(const bot of bots){
    const home=bot.starterHouse;
    for(let x=Math.floor((home.x-radius)/size);x<=Math.floor((home.x+radius)/size);x++){
      for(let z=Math.floor((home.z-radius)/size);z<=Math.floor((home.z+radius)/size);z++){
        requests.set(`${x}:${z}`,{x:x*size,z:z*size,size});
      }
    }
  }
  const placements=[];
  for(const request of requests.values()){
    for(const item of generateRegion(world,request).placements){
      if(!bots.some(bot=>distance(bot.starterHouse,item)<=radius+(item.radius??0)))continue;
      placements.push(item.kind==='tree'&&!item.id?{...item,id:`tree:${item.x}:${item.y??0}:${item.z}`}:item);
    }
  }
  world.gameplay.botScenery=placements;
  return placements;
}
