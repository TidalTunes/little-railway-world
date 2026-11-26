import geography from '../data/earth-geography.json' with {type:'json'};
import {createEarthRanges} from './earth-ranges.js';
import {landEcoregion} from './globe-land-colors.js';

const ECOREGIONS={iberia:'mediterranean','north-african-coast':'mediterranean',patagonia:'steppe',
  'central-asia':'steppe',tibet:'steppe','new-zealand':'meadow'};

export const EARTH_RADIUS=1600;
export function projectEarth(longitude,latitude){return {x:EARTH_RADIUS*longitude*Math.PI/180,z:-EARTH_RADIUS*latitude*Math.PI/180};}

// Deliberately schematic land-following continental networks. These circuits
// convey a connected miniature world, not surveyed railways or service claims.
export const EARTH_CIRCUITS={
  'north-america':'seattle portland san-francisco los-angeles phoenix denver kansas-city chicago toronto montreal boston new-york washington atlanta dallas salt-lake-city',
  'south-america':'quito lima la-paz santiago cordoba buenos-aires rosario sao-paulo rio-de-janeiro brasilia cuiaba manaus',
  'europe':'lisbon madrid barcelona lyon turin milan vienna prague berlin brussels paris bordeaux',
  'britain':'london birmingham manchester leeds',
  'africa':'cairo khartoum addis-ababa nairobi dar-es-salaam lusaka johannesburg gaborone windhoek kinshasa abuja niamey algiers casablanca marrakech',
  'asia':'istanbul ankara tehran tashkent almaty urumqi beijing shanghai wuhan chengdu kunming bangkok yangon dhaka delhi lahore',
  'india':'mumbai hyderabad chennai bengaluru',
  'japan':'tokyo sendai niigata kanazawa kyoto hiroshima osaka nagoya',
  'australia':'perth adelaide melbourne sydney brisbane alice-springs',
  'new-zealand':'auckland hamilton wellington',
};
const WAYPOINTS={
  'seattle|portland':[[-122.3,46.8]],
  'portland|san-francisco':[[-122.7,43],[-122.3,40.4],[-121.5,38.6]],
  'san-francisco|los-angeles':[[-121.6,37.4],[-120.2,36.1],[-119.2,35.4],[-118.5,34.8]],
  'chicago|toronto':[[-86.1,41.6],[-83.2,41.9],[-82.3,42.8],[-80.6,43.2]],
  'toronto|montreal':[[-77.3,44.5],[-75.7,45.4]],
  'montreal|boston':[[-72.7,44.3]],
  'new-york|washington':[[-74.5,40.25],[-75.2,39.9],[-76.5,39.4]],
  'washington|atlanta':[[-78.1,37.7],[-80.8,35.3]],
  'salt-lake-city|seattle':[[-116.2,43.6],[-119.5,46.2]],
  'quito|lima':[[-78.8,-3.5],[-78,-7.5],[-76.8,-10.7]],
  'lima|la-paz':[[-75,-13.2],[-71.5,-16.4],[-69.2,-16.8]],
  'la-paz|santiago':[[-68.2,-20],[-68.9,-25.5],[-69.3,-30]],
  'santiago|cordoba':[[-68.8,-32.9],[-66.3,-33]],
  'rosario|sao-paulo':[[-56.2,-27.3],[-51.2,-25.4]],
  'sao-paulo|rio-de-janeiro':[[-45.5,-22.8],[-44.3,-22.4]],
  'rio-de-janeiro|brasilia':[[-43.7,-21],[-46.4,-18]],
  'lisbon|madrid':[[-8.1,39],[-6.2,39.6]],
  'barcelona|lyon':[[2.5,42.2],[3.1,43.5],[4.3,44.5]],
  'lyon|turin':[[6.1,45.5],[6.8,45.2]],
  'milan|vienna':[[11.2,45.6],[12.8,46.4],[14.7,47]],
  'bordeaux|lisbon':[[-.6,43.8],[-2.8,42.8],[-5.6,41.6],[-7.6,40.6],[-8.4,39.4]],
  'london|birmingham':[[-.8,51.9]],
  'leeds|london':[[-.6,52.8]],
  'khartoum|addis-ababa':[[34,12]],
  'nairobi|dar-es-salaam':[[37.6,-5.3],[38.8,-6.8]],
  'nairobi|dar-es-salaam':[[37.3,-4.5],[37.5,-6.3]],
  'dar-es-salaam|lusaka':[[36.5,-7.5],[32.7,-9.4],[30.4,-11.7]],
  'windhoek|kinshasa':[[17.5,-15],[16.5,-9]],
  'kinshasa|abuja':[[14,1],[11.5,5.5]],
  'algiers|casablanca':[[-1,34.8],[-4,34.1]],
  'marrakech|cairo':[[-3,31.8],[6,30.5],[15,29.5],[25,29],[30,29.2]],
  'istanbul|ankara':[[30.5,40.8]],
  'ankara|tehran':[[38,39],[44,37.5],[48,36.6]],
  'tehran|tashkent':[[59.6,36.3],[64.4,39.7]],
  'almaty|urumqi':[[81.5,44]],
  'urumqi|beijing':[[94,42],[101,40.5],[109,40]],
  'beijing|shanghai':[[117,36.7],[118.4,33],[119.7,31.9]],
  'shanghai|wuhan':[[119,31.2],[116,30.7]],
  'wuhan|chengdu':[[109,30.4]],
  'kunming|bangkok':[[100.5,20],[99.7,17]],
  'bangkok|yangon':[[99.5,14.1],[98.6,16.7]],
  'yangon|dhaka':[[96.1,21.9],[93.6,22.6],[91.3,23.8]],
  'dhaka|delhi':[[90.3,24.8],[89.4,25],[88,25],[83,26.5]],
  'lahore|istanbul':[[68,32.5],[62.2,34.3],[53.4,35.6],[50,36.3],[46.3,38],[41.3,39.9],[36.3,41.1],[31.6,40.7]],
  'mumbai|hyderabad':[[74.5,18]],
  'chennai|bengaluru':[[79,12.8]],
  'tokyo|sendai':[[139.7,36.6],[140.4,37.4]],
  'sendai|niigata':[[140,38]],
  'niigata|kanazawa':[[138,36.9],[137.2,36.5]],
  'kanazawa|kyoto':[[136.7,35.9],[136.1,35.5]],
  'kyoto|hiroshima':[[134.8,34.95],[133.4,34.65]],
  'hiroshima|osaka':[[133.2,35],[134.5,35.2]],
  'osaka|nagoya':[[136,34.9]],
  'nagoya|tokyo':[[137.5,35],[138.5,35.3],[139.2,35.6]],
  'perth|adelaide':[[121.47,-30.75],[126,-30.8],[130,-30.7],[133.2,-31.5],[135.6,-32],[138,-32.4],[138.5,-33.2]],
  'adelaide|melbourne':[[140.4,-35.8],[142.9,-37.1]],
  'melbourne|sydney':[[146.8,-36.1],[148,-35.3],[149.1,-35.2]],
  'sydney|brisbane':[[151,-31],[151.5,-28]],
  'brisbane|alice-springs':[[141,-25],[136,-24]],
  'alice-springs|perth':[[125,-26],[119,-30]],
  'hamilton|wellington':[[176,-38.7],[175.6,-40.35]],
  'wellington|auckland':[[175.5,-40.3],[175.3,-39.3],[175.1,-37.9]],
};

export function createEarthWorld({seed='earth-continental-railways',trainCount=250}={}){
  const owners=['coral','teal','gold','blue'];
  // Development supplies the footprint: an eight-unit cap left even the
  // world's largest cities with room for only a station and a few houses.
  const cities=geography.cities.map((city,index)=>({...city,level:Math.max(5,Math.min(10,Math.round(4+Math.log10(Math.max(city.sourcePopulation,100000)/100000)*2))),
    ownerId:owners[index%owners.length]}));
  const connections=[],circuits=[];
  for(const [id,names]of Object.entries(EARTH_CIRCUITS)){
    const stops=names.split(' '),segments=[];
    for(let i=0;i<stops.length;i++){
      const from=stops[i],to=stops[(i+1)%stops.length],lineId=`earth-${from}-${to}`,waypoints=WAYPOINTS[`${from}|${to}`];
      connections.push({id:lineId,from,to,...(waypoints?{points:waypoints.map(([lon,lat])=>projectEarth(lon,lat))}:{})});
      segments.push({lineId,direction:1});
    }
    circuits.push({id:`earth-${id}`,segments});
  }
  return {name:'Earth',seed,bounds:{...geography.bounds},outline:structuredClone(geography.outline),camera:{northUp:true},
    surface:{type:'sphere',radius:EARTH_RADIUS,origin:{longitude:0,latitude:0},complete:true,projection:{...geography.projection}},
    density:.6,minTurnRadius:4,throatLength:1.5,cities,connections,
    rivers:geography.rivers.flatMap(river=>river.paths.map((points,index)=>({id:`${river.id}-${index+1}`,name:river.name,points,smooth:false,
      width:['amazonas','amazon','nile','congo','mississippi','yangtze','chang-jiang','ganges','brahmaputra'].includes(river.id)?2.1:1.1}))),
    mountains:createEarthRanges((lon,lat)=>{const p=projectEarth(lon,lat);return[p.x,p.z];},geography.landInterior),
    traffic:{trainCount,circuits},
    biomes:{sites:geography.biomeSites.map(site=>({...site,ecoregion:ECOREGIONS[site.id]??landEcoregion(site)})),geography:{ocean:geography.ocean,landInterior:geography.landInterior,
      oceanShore:geography.oceanShore,lakes:geography.lakes,lakeShore:geography.lakeShore,ice:geography.ice}},
    geography:{name:geography.name,bbox:{...geography.bbox},projection:{...geography.projection},polarIce:geography.ice,
      sources:structuredClone(geography.sources),methodology:{...geography.methodology},
      railwayMethod:'Schematic land-following regional circuits, not a survey of existing railways. No overseas intercontinental railway links. City tiles may move slightly inland to keep assets dry.'},
  };
}
