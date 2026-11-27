import {biomeDistance, fitsBiome} from './biomes.js';
import {riverBankDistance} from './hydrology.js';
import {mountainFootprintDistance} from './mountain-shape.js';
import {createFarmEstate} from './farmland.js';
import {settlementDoor, sampleSettlementPath} from './settlement-paths.js';
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

function villageAt(world,region,center,bearing){
  const random=randomFor(`${world.seed}:${region.id}:village-layout`),cityId=`farm-village:${region.id}`;
  const cos=Math.cos(bearing),sin=Math.sin(bearing),at=(x,z)=>({x:center.x+x*cos+z*sin,y:0,z:center.z-x*sin+z*cos});
  const houses=[[-3.7,-3.8],[3.7,-4.6],[random()*.7-.35,-7.5]].map(([x,z],index)=>{
    const rotation=bearing+Math.atan2(-x,-z),scale=1;
    return{id:`${cityId}:home:${index+1}`,kind:'house',...at(x,z),rotation,scale,variant:Math.floor(random()*3),
      width:2.2,depth:2.2,radius:Math.hypot(2.2,2.2)*scale/2,ownerId:FARM_VILLAGE_OWNER,cityId,connected:true};
  });
  const well={...settlementMilestone('well'),id:`${cityId}:well`,kind:'civic',buildingType:'well',...at(3.4,.2),
    radius:Math.hypot(2.2,2.2)/2,rotation:bearing-Math.PI/2,scale:1,ownerId:FARM_VILLAGE_OWNER,cityId,connected:true};
  const hub={id:`${cityId}:green`,...at(0,0)},paths=[];
  function path(id,from,to,points,trimStart=false,trimEnd=false){paths.push({id:`${cityId}:path:${id}`,cityId,ownerId:FARM_VILLAGE_OWNER,
    fromHouseId:from.id,toHouseId:to.id,width:.62,trimStart,trimEnd,points:points.map(p=>({...p,y:.015}))});}
  for(const building of [...houses,well])path(building.id,building,hub,[settlementDoor(world,building),at(
    (building.x-center.x)*cos-(building.z-center.z)*sin+Math.sin(building.rotation-bearing)*1.6,
    (building.x-center.x)*sin+(building.z-center.z)*cos+Math.cos(building.rotation-bearing)*1.6),hub],true);

  const families=[['wheat','pasture','fallow'],['pasture','wheat','orchard'],['vegetables','wheat','pasture']];
  const family=families[Math.floor(random()*families.length)],farms=[],destinations=[];
  for(const [index,side]of [-1,1].entries()){
    const width=11.5+random()*1.7,depth=11+random()*1.7,z=8.5+index*.7;
    const farm=createFarmEstate({id:`${cityId}:farm:${index+1}`,districtId:`${cityId}:farm:${index+1}`,clusterId:cityId,
      ...at(side*(width/2+2.1),z),width,depth,rotation:bearing,family,seed:`${world.seed}:${cityId}:farm:${index}`});
    const stop={id:`${cityId}:field-gate:${index+1}`,cityId,kind:'farm',...at(0,5+index*6),farmId:farm.id,lookX:farm.x,lookZ:farm.z};
    path(`field-${index+1}`,index?destinations[index-1]:hub,stop,[index?destinations[index-1]:hub,stop]);
    farms.push(farm);destinations.push(stop);
  }
  const cityCenter=houses.reduce((sum,house)=>({x:sum.x+house.x/3,z:sum.z+house.z/3}),{x:0,z:0});
  const city={id:cityId,...cityCenter,ownerId:FARM_VILLAGE_OWNER,level:1,houseCount:3,houseIds:houses.map(home=>home.id),radius:7,bot:true};
  return {houses,buildings:[well],paths,cities:[city],farms,destinations};
}

/** Place whole working hamlets before scenery. Farms, homes and access lanes
 * share one bearing and reservation plan; workers never improvise villages
 * from whichever scenery chunks happen to be loaded. */
export function createFarmVillages(world,{count=3}={}){
  const result={ownerId:FARM_VILLAGE_OWNER,houses:[],buildings:[],paths:[],cities:[],destinations:[],farms:[],reservations:[]};
  if(world.surface||!world.gameplay||count<=0)return result;
  const regions=(world.biomes?.regions??[]).filter(region=>region.type==='farmland');
  for(const region of regions){
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
        const candidate=villageAt(world,region,center,baseBearing+rotation),occupied=[...candidate.houses,...candidate.buildings,...candidate.farms];
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
