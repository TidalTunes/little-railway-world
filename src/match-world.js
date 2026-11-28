import {createEarthWorld,projectEarth} from './earth-world.js';
import {cityRandom} from './development.js';
import {surfaceOffset,surfaceDistance} from './world-surface.js';
import {mountainFootprintDistance} from './mountain-shape.js';
import {riverBankDistance} from './hydrology.js';
import {FARM_VILLAGE_PLAYER} from './farm-villages.js';
import {createFarmEstate} from './farmland.js';
import {settlementMilestone} from './settlement-progression.js';

export const MATCH_RULES=Object.freeze({teams:12,playersPerTeam:12,homeSpacing:38,sceneryRadius:36});
const REGIONS=[['teal','Verdant',14,51,185],['coral','Ember',-104,54,28],['gold','Ochre',-96,33,83],['blue','Cobalt',-62,-8,255],
  ['violet','Iris',-63,-34,305],['orange','Saffron',-5,12,58],['rose','Rose',24,-22,350],['mint','Jade',69,51,150],
  ['indigo','Indigo',87,22,275],['lime','Citron',119,39,115],['cyan','Azure',132,55,220],['copper','Copper',132,-25,42]];
const inRing=(ring,x,z)=>{let inside=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;};
const polygons=(rings)=>rings.map(polygon=>({polygon,minX:Math.min(...polygon[0].map(p=>p[0])),maxX:Math.max(...polygon[0].map(p=>p[0])),minZ:Math.min(...polygon[0].map(p=>p[1])),maxZ:Math.max(...polygon[0].map(p=>p[1]))}));
const contains=(regions,x,z)=>regions.some(({polygon,minX,maxX,minZ,maxZ})=>x>=minX&&x<=maxX&&z>=minZ&&z<=maxZ&&inRing(polygon[0],x,z)&&!polygon.slice(1).some(r=>inRing(r,x,z)));

/** The archived Earth remains untouched. A match reuses its geography and
 * scatters equal-sized teams across twelve broad, habitable continental areas. */
export function createMatchWorld({seed='earth-match-v1'}={}){
  const world=createEarthWorld({seed,trainCount:0}),land=polygons(world.biomes.geography.landInterior),lakes=polygons(world.biomes.geography.lakes??[]),ice=polygons(world.biomes.geography.ice??[]);
  const query={...world,rivers:world.rivers.map(r=>({...r,points:r.points.map(([x,z])=>({x,z}))}))};
  const dry=p=>contains(land,p.x,p.z)&&!contains(lakes,p.x,p.z)&&!contains(ice,p.x,p.z)
    &&riverBankDistance(query,p.x,p.z)>4&&world.mountains.every(m=>mountainFootprintDistance(m,p.x,p.z)>8);
  const biome=p=>world.biomes.sites.reduce((best,site)=>Math.hypot(site.x-p.x,site.z-p.z)<Math.hypot(best.x-p.x,best.z-p.z)?site:best).type;
  const safe=p=>dry(p)&&Array.from({length:8},(_,i)=>surfaceOffset(world,p.x,p.z,Math.sin(i*Math.PI/4)*9,Math.cos(i*Math.PI/4)*9)).every(dry);
  const teams=[],players=[],roster=[],trees=[];
  for(const [teamIndex,[id,name,lon,lat,h]]of REGIONS.entries()){
    const center=projectEarth(lon,lat),random=cityRandom(seed,`match:${id}`),phase=random()*Math.PI*2,color={l:.66,c:.13,h};
    const homes=[];
    for(let attempt=0;attempt<1800&&homes.length<MATCH_RULES.playersPerTeam;attempt++){
      const angle=phase+attempt*2.399963229728653,radius=attempt?16*Math.sqrt(attempt):0;
      const p=surfaceOffset(world,center.x,center.z,Math.sin(angle)*radius,Math.cos(angle)*radius);
      if(!safe(p)||homes.some(home=>surfaceDistance(world,p,home)<MATCH_RULES.homeSpacing))continue;
      homes.push(p);
    }
    if(homes.length!==MATCH_RULES.playersPerTeam)throw new Error(`No safe match starts in ${name}`);
    teams.push({id,name,color,center:{...center},playerIds:[]});
    for(const [member,p]of homes.entries()){
      const playerId=teamIndex===0&&member===0?'teal':`team-${String(teamIndex+1).padStart(2,'0')}-player-${String(member+1).padStart(2,'0')}`;
      const player={id:playerId,name:`${name} ${member+1}`,teamId:id,color:{...color}},rotation=random()*Math.PI*2;
      const starterHouse={id:playerId==='teal'?'home-1':`bot:${playerId}:home-1`,kind:'house',...p,y:0,rotation,rotationSpace:'surface',width:2.2,depth:2.2,scale:1,variant:member%4,ownerId:playerId,radius:Math.hypot(2.2,2.2)/2};
      const spawn={...surfaceOffset(world,p.x,p.z,Math.sin(rotation)*3.4,Math.cos(rotation)*3.4),heading:rotation},type=biome(p),grove=[];
      for(let attempt=0;attempt<80&&grove.length<8;attempt++){
        const angle=rotation+attempt*2.399963229728653,radius=7+(attempt%5)*1.6,point=surfaceOffset(world,p.x,p.z,Math.sin(angle)*radius,Math.cos(angle)*radius);
        if(!dry(point)||homes.some(home=>surfaceDistance(world,home,point)<3)||grove.some(tree=>surfaceDistance(world,tree,point)<2.4))continue;
        grove.push({id:`${playerId==='teal'?'starter':'bot:'+playerId}:grove:${grove.length+1}`,kind:type==='desert'?'cactus':'tree',...point,y:0,rotation:angle,scale:.9,variant:type==='desert'?grove.length%3:3,radius:.765,biome:type});
      }
      if(grove.length<8)throw new Error(`Insufficient starter resources for ${playerId}`);
      players.push(player);teams.at(-1).playerIds.push(playerId);trees.push(...grove);
      roster.push({id:playerId,name:player.name,teamId:id,role:'hybrid',spawn,starterHouse,biome:type,guaranteedTrees:grove});
    }
  }
  const local=roster[0],bots=roster.slice(1).map(p=>({id:`bot:${p.id}`,ownerId:p.id,teamId:p.teamId,starterHouse:p.starterHouse,spawn:p.spawn,biome:p.biome,guaranteedTrees:p.guaranteedTrees}));
  const reservations=roster.flatMap(p=>[{id:`${p.id==='teal'?'starter':'bot:'+p.id}:home-reservation`,x:p.starterHouse.x,z:p.starterHouse.z,radius:p.starterHouse.radius+.65},{id:`${p.id==='teal'?'starter':'bot:'+p.id}:spawn-reservation`,x:p.spawn.x,z:p.spawn.z,radius:1.05}]);
  reservations.push(...trees.map(tree=>({id:tree.id,x:tree.x,z:tree.z,radius:tree.radius+.22})));
  const farmVillages={ownerId:FARM_VILLAGE_PLAYER.id,houses:[],buildings:[],paths:[],cities:[],farms:[],destinations:[],reservations:[]};
  for(const [index,team]of teams.entries()){
    let center;
    for(let attempt=0;attempt<1600;attempt++){
      const angle=attempt*2.399963229728653,radius=60+Math.sqrt(attempt)*9,p=surfaceOffset(world,team.center.x,team.center.z,Math.sin(angle)*radius,Math.cos(angle)*radius);
      if(!safe(p)||roster.some(player=>surfaceDistance(world,p,player.starterHouse)<55)||farmVillages.cities.some(c=>surfaceDistance(world,p,c)<60))continue;
      if(!Array.from({length:12},(_,i)=>surfaceOffset(world,p.x,p.z,Math.sin(i*Math.PI/6)*25,Math.cos(i*Math.PI/6)*25)).every(dry))continue;
      center=p;break;
    }
    if(!center)throw new Error(`No safe trading village for ${team.id}`);
    const id=`farm-village:match:${team.id}`,ownerId=FARM_VILLAGE_PLAYER.id,at=(x,z)=>({...surfaceOffset(world,center.x,center.z,x,z),y:0}),houses=[];
    for(let i=0;i<6;i++){
      const angle=i*Math.PI/3,home={id:`${id}:home:${i+1}`,kind:'house',...at(Math.sin(angle)*7,Math.cos(angle)*7),rotation:0,width:2.2,depth:2.2,scale:1,variant:i%4,ownerId,cityId:id,connected:true,radius:1.56};
      home.rotation=angle+Math.PI;home.rotationSpace='surface';houses.push(home);
      const from=at(Math.sin(angle)*5.4,Math.cos(angle)*5.4),to=at(Math.sin(angle)*2,Math.cos(angle)*2);
      farmVillages.paths.push({id:`${id}:path:${i}`,cityId:id,ownerId,fromHouseId:home.id,toHouseId:`${id}:civic`,width:.62,trimStart:true,trimEnd:true,points:[{...from,y:.015},{...to,y:.015}]});
    }
    const buildingType=['well','market','waterTower','clock'][index%4],spec=settlementMilestone(buildingType);
    const building={...spec,id:`${id}:civic`,kind:'civic',buildingType,...at(0,0),rotation:0,rotationSpace:'surface',scale:1,ownerId,cityId:id,connected:true,radius:Math.hypot(spec.width,spec.depth)/2};
    const farms=[-1,1].map((side,i)=>createFarmEstate({id:`${id}:farm:${i}`,districtId:`${id}:farm:${i}`,clusterId:id,...at(side*17,5),width:10,depth:12,rotation:0,family:['wheat','pasture','fallow'],seed:`${seed}:${id}:${i}`}));
    const destinations=farms.map((farm,i)=>({...at((i?1:-1)*11,5),id:`${id}:field-gate:${i}`,cityId:id,kind:'farm',farmId:farm.id,lookX:farm.x,lookZ:farm.z}));
    for(const [i,stop]of destinations.entries())farmVillages.paths.push({id:`${id}:field-path:${i}`,cityId:id,ownerId,fromHouseId:building.id,toHouseId:stop.id,width:.62,points:[{...at((i?1:-1)*2,1),y:.015},{...at((i?1:-1)*11,1),y:.015},{...stop,y:.015}]});
    farmVillages.houses.push(...houses);farmVillages.buildings.push(building);farmVillages.farms.push(...farms);farmVillages.destinations.push(...destinations);
    farmVillages.cities.push({id,...center,ownerId,level:2,houseCount:6,houseIds:houses.map(h=>h.id),radius:8.6,bot:true,layout:index%3});
    farmVillages.reservations.push(...[...houses,building,...farms].map(item=>({id:item.id,x:item.x,z:item.z,radius:item.radius+.5,kind:item.kind})));
  }
  for(const path of farmVillages.paths)for(let i=1;i<path.points.length;i++){
    const a=path.points[i-1],b=path.points[i],steps=Math.max(1,Math.ceil(surfaceDistance(world,a,b)));
    for(let n=0;n<=steps;n++)farmVillages.reservations.push({id:`${path.id}:${i}:${n}`,x:a.x+(b.x-a.x)*n/steps,z:a.z+(b.z-a.z)*n/steps,radius:.62,kind:'path'});
  }
  reservations.push(...farmVillages.reservations);players.push(structuredClone(FARM_VILLAGE_PLAYER));
  return {...world,name:'Earth · Twelve Banners',players,cities:[],connections:[],traffic:{trainCount:0,circuits:[]},camera:{...world.camera,startInDetail:true},
    gameplay:{version:3,economy:'loops',ownerId:local.id,starterHouse:local.starterHouse,spawn:local.spawn,guaranteedTrees:trees,reservations,farmVillages,farmVillageCount:0,playerBots:bots,playerBotCount:bots.length,
      military:{enabled:true,startResources:40,startFood:12,startGold:50},startSeconds:0,
      match:{version:1,localPlayerId:local.id,teams,players:roster}},
    geography:{...world.geography,name:'Earth · Twelve Banners',kind:'earth-match'}};
}
