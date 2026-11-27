import {biomeDistance, fitsBiome} from './biomes.js';
import {riverBankDistance} from './hydrology.js';
import {mountainFootprintDistance} from './mountain-shape.js';
import {createFarmEstate} from './farmland.js';
import {settlementDoor, sampleSettlementPath, houseBlocksSettlementPath} from './settlement-paths.js';
import {farmFootprintsOverlap} from './farm-footprints.js';
import {settlementMilestone} from './settlement-progression.js';

export const FARM_VILLAGE_OWNER='village-gray';
export const FARM_VILLAGE_PLAYER=Object.freeze({id:FARM_VILLAGE_OWNER,name:'Farm Villages',color:Object.freeze({l:.59,c:0,h:0})});

function randomFor(seed){let value=2166136261;for(const letter of String(seed))value=Math.imul(value^letter.charCodeAt(0),16777619);
  return()=>{value+=0x6D2B79F5;let x=Math.imul(value^value>>>15,value|1);x^=x+Math.imul(x^x>>>7,x|61);return((x^x>>>14)>>>0)/4294967296;};}
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const bounds=polygon=>({minX:Math.min(...polygon.map(p=>p[0])),maxX:Math.max(...polygon.map(p=>p[0])),
  minZ:Math.min(...polygon.map(p=>p[1])),maxZ:Math.max(...polygon.map(p=>p[1]))});

function dryFootprint(world,item){
  const radius=item.radius+.5;
  return fitsBiome(world,'farmland',item.x,item.z,radius)
    &&riverBankDistance(world,item.x,item.z)>=radius+.8
    &&world.mountains.every(mountain=>mountainFootprintDistance(mountain,item.x,item.z)>=radius+.35)
    &&(world.gameplay.reservations??[]).every(other=>distance(item,other)>=radius+other.radius);
}

const villageCivics=['well','market','chapel','clock','waterTower'];
// Different settlement patterns share a working lane, rather than repeating
// the same three-house fan around a well. Small offsets soften each frontage.
const villageLayouts=[
  {homes:[[-4.2,-4.2],[4.1,-5.3],[-4.1,1.2]],civic:[4.3,1.4]},
  {homes:[[-4.6,-6.2],[4.1,-2.9],[-4.5,1.3]],civic:[4.2,2.3]},
  {homes:[[-4.6,-3.9],[-.3,-7.6],[4.5,-4.5]],civic:[4.4,1.1]},
];
const tradingLayouts=[
  {homes:[[-4.3,-12.8],[4.2,-12.2],[-4.5,-7.2],[4.4,-7.4],[-4.2,-1.5],[4.3,-2.0]],civic:[-4.3,3.0]},
  {homes:[[-4.1,-9.8],[4.1,-9.3],[-4.3,-5.2],[4.3,-4.8],[-4.1,-.6],[4.2,-.2]],civic:[-4.3,4.3]},
  {homes:[[-4.6,-12.2],[.1,-15.1],[4.5,-11.8],[-4.6,-6.7],[4.5,-6.4],[-4.3,-1.1]],civic:[4.4,.7]},
];

function villageAt(world,region,center,bearing,index){
  const random=randomFor(`${world.seed}:${region.id}:village-layout`),cityId=`farm-village:${region.id}`;
  const trading=world.gameplay.economy==='loops',layouts=trading?tradingLayouts:villageLayouts;
  const variation=Math.floor(randomFor(`${world.seed}:village-variety`)()*15),layoutIndex=(variation+index)%layouts.length,layout=layouts[layoutIndex];
  const cos=Math.cos(bearing),sin=Math.sin(bearing),at=(x,z)=>({x:center.x+x*cos+z*sin,y:0,z:center.z-x*sin+z*cos});
  const jitter=()=>random()*.44-.22;
  const lanes=[...(trading?[[.2+jitter(),-12.4],[-.3+jitter(),-8.0]]:[]),[-.4+jitter(),-5.2],[.35+jitter(),-1],[-.55+jitter(),7.7],[.4+jitter(),12.5]];
  const junctions=lanes.map(([x,z],i)=>({id:`${cityId}:lane:${i}`,...at(x,z)}));
  const frontages=[];
  const facing=(position,target)=>Math.atan2(target.x-position.x,target.z-position.z);
  const nearestJunction=position=>junctions.reduce((best,point)=>distance(position,point)<distance(position,best)?point:best);
  const houses=layout.homes.map(([x,z],i)=>{
    const position=at(x+jitter(),z+jitter()),junction=nearestJunction(position),rotation=facing(position,junction);
    const home={id:`${cityId}:home:${i+1}`,kind:'house',...position,rotation,scale:1,variant:Math.floor(random()*3),
      width:2.2,depth:2.2,radius:Math.hypot(2.2,2.2)/2,ownerId:FARM_VILLAGE_OWNER,cityId,connected:true};
    frontages.push([home,junction]);return home;
  });
  const civicType=villageCivics[(variation+index*2)%villageCivics.length],spec=settlementMilestone(civicType);
  const position=at(layout.civic[0]+jitter(),layout.civic[1]+jitter()),junction=nearestJunction(position);
  const civic={...spec,id:`${cityId}:civic`,kind:'civic',buildingType:civicType,...position,
    radius:Math.hypot(spec.width,spec.depth)/2,rotation:facing(position,junction),scale:1,ownerId:FARM_VILLAGE_OWNER,cityId,connected:true};
  frontages.push([civic,junction]);
  const paths=[];
  function path(id,from,to,points,trimStart=false,trimEnd=false){paths.push({id:`${cityId}:path:${id}`,cityId,ownerId:FARM_VILLAGE_OWNER,
    fromHouseId:from.id,toHouseId:to.id,width:.62,trimStart,trimEnd,points:points.map(p=>({...p,y:.015}))});}
  for(const [building,target]of frontages){
    const landing=Math.max(building.depth/2+.42,(building.doorOffset??.9)+.35);
    path(building.id,building,target,[settlementDoor(world,building),settlementDoor(world,building,landing),target],true);
  }
  const families=[['wheat','pasture','fallow'],['pasture','wheat','orchard'],['vegetables','wheat','pasture']];
  const family=families[Math.floor(random()*families.length)],farms=[],destinations=[];
  for(const [i,side]of [-1,1].entries()){
    const width=(trading?8.4:10.6)+random()*2.2,depth=(trading?8:9.5)+random()*(trading?1.4:2.6),z=(trading?12.6:10.5)+random()*1.8;
    const farm=createFarmEstate({id:`${cityId}:farm:${i+1}`,districtId:`${cityId}:farm:${i+1}`,clusterId:cityId,
      ...at(side*(width/2+2.9),z),width,depth,rotation:bearing+(random()-.5)*.11,family,seed:`${world.seed}:${cityId}:farm:${i}`});
    const junctionIndex=junctions.length-2+i;
    const stop={...junctions[junctionIndex],id:`${cityId}:field-gate:${i+1}`,cityId,kind:'farm',farmId:farm.id,lookX:farm.x,lookZ:farm.z};
    junctions[junctionIndex]=stop;farms.push(farm);destinations.push(stop);
  }
  for(let i=1;i<junctions.length;i++)path(`lane-${i}`,junctions[i-1],junctions[i],[junctions[i-1],junctions[i]]);
  const cityCenter=houses.reduce((sum,home)=>({x:sum.x+home.x/houses.length,z:sum.z+home.z/houses.length}),{x:0,z:0});
  const radius=Math.max(...houses.map(home=>distance(home,cityCenter)+home.radius));
  const city={id:cityId,...cityCenter,ownerId:FARM_VILLAGE_OWNER,level:trading?2:1,houseCount:houses.length,houseIds:houses.map(home=>home.id),radius,bot:true,layout:layoutIndex};
  return {houses,buildings:[civic],paths,cities:[city],farms,destinations};
}

function layoutClear(world,candidate){
  const occupied=[...candidate.houses,...candidate.buildings,...candidate.farms];
  for(let i=0;i<occupied.length;i++)for(const other of occupied.slice(0,i))if(farmFootprintsOverlap(world,occupied[i],other,.32))return false;
  for(const path of candidate.paths){
    for(const building of [...candidate.houses,...candidate.buildings])
      if(building.id!==path.fromHouseId&&building.id!==path.toHouseId&&houseBlocksSettlementPath(world,building,path))return false;
    for(let i=1;i<path.points.length;i++){
      const a=path.points[i-1],b=path.points[i],length=distance(a,b);
      const corridor={x:(a.x+b.x)/2,z:(a.z+b.z)/2,width:path.width+.35,depth:length,
        radius:Math.hypot(path.width+.35,length)/2,rotation:Math.atan2(b.x-a.x,b.z-a.z)};
      if(candidate.farms.some(farm=>farmFootprintsOverlap(world,corridor,farm)))return false;
    }
  }
  return true;
}

/** Place whole working hamlets before scenery. Farms, homes and access lanes
 * share one bearing and reservation plan; workers never improvise villages
 * from whichever scenery chunks happen to be loaded. */
export function createFarmVillages(world,{count=3}={}){
  const result={ownerId:FARM_VILLAGE_OWNER,houses:[],buildings:[],paths:[],cities:[],destinations:[],farms:[],reservations:[]};
  if(world.surface||!world.gameplay||count<=0)return result;
  const regions=(world.biomes?.regions??[]).filter(region=>region.type==='farmland');
  for(const [regionIndex,region]of regions.entries()){
    if(result.cities.length>=count)break;
    const b=bounds(region.polygons.flatMap(polygon=>polygon[0])),random=randomFor(`${world.seed}:${region.id}:village-sites`),candidates=[];
    const baseBearing=(random()-.5)*Math.PI;
    for(let x=b.minX+7;x<b.maxX-7;x+=5)for(let z=b.minZ+7;z<b.maxZ-7;z+=5){
      const center={x:x+(random()-.5)*2,z:z+(random()-.5)*2},clearance=biomeDistance(world,'farmland',center.x,center.z);
      if(clearance<8||result.cities.some(city=>distance(city,center)<37))continue;
      candidates.push({...center,score:clearance+random()*5});
    }
    candidates.sort((a,b)=>b.score-a.score||a.x-b.x||a.z-b.z);
    let selected=null;
    for(const center of candidates){
      for(const rotation of [0,Math.PI/2,Math.PI,Math.PI*1.5]){
        const candidate=villageAt(world,region,center,baseBearing+rotation,regionIndex),occupied=[...candidate.houses,...candidate.buildings,...candidate.farms];
        if(!layoutClear(world,candidate))continue;
        if(!occupied.every(item=>dryFootprint(world,item)&&result.reservations.every(other=>distance(item,other)>=item.radius+other.radius+.5)))continue;
        if(candidate.paths.some(path=>!sampleSettlementPath(path.points,p=>dryFootprint(world,{...p,radius:path.width/2}))))continue;
        selected=candidate;break;
      }
      if(selected)break;
    }
    if(!selected)continue;
    for(const key of ['houses','buildings','paths','cities','destinations','farms'])result[key].push(...selected[key]);
    // A point chain reserves the exact access corridor, rather than clearing
    // a giant circle around the hamlet and leaving its farms isolated.
    result.reservations.push(...[...selected.houses,...selected.buildings,...selected.farms].map(item=>({
      id:item.id,x:item.x,z:item.z,radius:item.radius+.32,kind:item.kind})));
    for(const path of selected.paths)sampleSettlementPath(path.points,point=>{
      result.reservations.push({...point,id:path.id,radius:path.width/2+.3,kind:'path'});
    },.9);
  }
  return result;
}
