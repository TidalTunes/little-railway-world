import cityReference from '../data/europe-cities.json' with {type:'json'};
import geography from '../data/europe-geography.json' with {type:'json'};
import {createEuropeRanges} from './europe-ranges.js';
import {projectGeographic,projectGeographicHeading} from './europe-projection.js';

/** Shared conformal coordinates; grid north is negative z, grid east positive x. */
export function projectEurope(longitude,latitude){
  return projectGeographic(geography.projection,longitude,latitude);
}

// Schematic railway corridors, not a survey of real railway rights of way.
// Coastal waypoints keep long alignments on their respective land masses.
const ROUTES=[
  ['paris','lille'],['lille','brussels'],
  ['brussels','rotterdam'],
  ['rotterdam','amsterdam'],
  ['amsterdam','essen',[[5.65,52.02]]],
  ['essen','dusseldorf'],['dusseldorf','cologne'],['cologne','frankfurt'],
  ['frankfurt','stuttgart'],['stuttgart','munich'],
  ['munich','milan',[[11.40,47.26],[11.42,46.78],[10.70,46.40],[10.20,45.55]]],
  ['milan','turin'],['turin','lyon',[[6.65,45.30],[6.05,45.55]]],
  ['lyon','barcelona',[[4.40,44.10],[3.20,43.45],[2.80,42.75],[2.75,42.05]]],
  ['barcelona','valencia',[[1.10,41.30],[.40,40.85],[-.40,40.10]]],
  ['valencia','madrid',[[-.62,38.98],[-1.85,39.05],[-2.15,40.05]]],
  ['madrid','lisbon',[[-6.35,39.55],[-7.49,39.82],[-8.50,39.23]]],
  ['lisbon','porto',[[-9.05,39.15],[-8.42,40.20],[-8.30,40.85]]],
  ['porto','paris',[[-4.70,41.65],[-2.67,42.85],[-1.47,43.48],[-.58,44.84],[.68,47.39]]],

  ['berlin','warsaw'],['warsaw','minsk'],['minsk','moscow'],['moscow','nizhny-novgorod'],
  ['nizhny-novgorod','rostov-on-don',[[41.45,52.70],[39.20,51.67],[40.40,48.90]]],
  ['rostov-on-don','kharkiv',[[39.30,48.57]]],['kharkiv','kyiv'],['kyiv','odesa',[[30.50,47.10]]],
  ['odesa','bucharest',[[28.80,47.00],[27.59,47.16],[27.99,45.43]]],
  ['bucharest','sofia'],['sofia','belgrade',[[21.90,43.32]]],
  ['belgrade','budapest'],['budapest','vienna'],['vienna','prague'],['prague','berlin'],
  ['munich','vienna'],['frankfurt','berlin'],

  ['milan','rome',[[11.34,44.49],[11.25,43.77]]],['rome','naples',[[13.40,41.60],[14.00,41.30]]],
  ['naples','vienna',[[14.85,41.10],[14.05,42.20],[13.20,43.35],[11.70,44.50],[11.80,45.60],[13.50,46.40],[14.30,47.10]]],
  ['sofia','athens',[[23.10,41.15],[22.35,40.20],[22.10,39.30],[22.40,38.65],[23.20,38.45]]],
  ['athens','istanbul',[[23.65,38.35],[23.00,38.55],[22.30,38.80],[22.35,39.50],[22.25,40.20],[22.80,40.80],[23.55,41.10],[25.40,41.25],[26.60,41.65],[27.50,41.35]]],
  ['istanbul','bucharest',[[27.40,41.65],[26.30,42.80],[26.10,43.70]]],

  ['berlin','hamburg'],
  // Jutland -> Little Belt -> Funen -> Great Belt -> Zealand: real rail crossings.
  ['hamburg','copenhagen',[[9.40,54.95],[9.70,55.48],[10.45,55.38],[11.25,55.43],[12.05,55.63]]],
  // The Øresund rail corridor reaches Malmö, then stays inland through Sweden.
  ['copenhagen','stockholm',[[13.10,55.60],[14.30,56.40],[14.50,57.00],[15.65,58.10],[16.75,58.85]]],
  // No Gulf of Bothnia causeway: the long northern railway corridor is intentional.
  ['stockholm','helsinki',[[17.40,60.00],[16.50,60.80],[16.00,62.00],[18.50,64.20],[20.50,65.40],[22.80,66.10],[24.10,66.15],[25.70,65.70],[26.00,64.70],[25.60,62.50],[24.00,60.70]]],
  ['helsinki','saint-petersburg',[[26.50,60.80],[28.75,60.80],[29.80,60.35]]],
  ['saint-petersburg','moscow'],

  ['london','birmingham',[[-1.25,51.75]]],['birmingham','liverpool'],
  ['liverpool','glasgow',[[-2.70,53.85],[-2.75,54.35],[-2.93,54.89],[-3.35,55.12]]],
  ['glasgow','leeds',[[-3.18,55.95],[-2.15,55.70],[-1.65,54.97],[-1.55,54.52],[-1.08,53.96]]],
  ['leeds','manchester'],['manchester','london',[[-1.15,52.95],[-1.10,52.50]]],
];

const STATION_HEADINGS={essen:Math.PI/2,valencia:Math.PI/2,liverpool:Math.PI/2,
  athens:Math.PI/4,istanbul:0,odesa:2.1,sofia:0};

// Keep the three operating circuits edge-disjoint: opposing traffic on a long
// shared corridor would reserve the entire corridor and strand most trains.
// The northern circuit intentionally traverses the actual Danish crossings.
const CIRCUITS={
  'europe-west':'paris lille brussels rotterdam amsterdam essen dusseldorf cologne frankfurt stuttgart munich milan turin lyon barcelona valencia madrid lisbon porto',
  'europe-north-east':'berlin hamburg copenhagen stockholm helsinki saint-petersburg moscow nizhny-novgorod rostov-on-don kharkiv kyiv odesa bucharest sofia belgrade budapest vienna prague',
  'europe-britain':'london birmingham liverpool glasgow leeds manchester',
};

/** Geographic showcase. Ownership is art direction; population is source data. */
export function createEuropeWorld({seed='europe-50-2025',trainCount=180}={}){
  const owners=['coral','teal','gold','blue'],minimum=cityReference.cities.at(-1).population;
  const maximum=cityReference.cities[0].population;
  const cities=cityReference.cities.map((city,index)=>{
    const level=Math.max(4,Math.min(10,4+Math.round(6*Math.log(city.population/minimum)/Math.log(maximum/minimum))));
    return {...city,...projectEurope(city.lon,city.lat),populationYear:cityReference.populationYear,
      // Model railHeading is atan2(dz,dx); the projection helper uses the
      // train's atan2(dx,dz) convention, so convert the geographic axis once.
      ...(city.id in STATION_HEADINGS?{railHeading:Math.PI/2-projectGeographicHeading(geography.projection,city.lon,city.lat,Math.PI/2+STATION_HEADINGS[city.id]),throatLength:1}:{}),
      level,radius:Math.min(18,9+level*.9),ownerId:owners[index%owners.length]};
  });
  for(const city of cities){
    const nearest=Math.min(...cities.filter(other=>other!==city).map(other=>Math.hypot(city.x-other.x,city.z-other.z)));
    city.radius=Math.min(city.radius,nearest*.44);
  }
  const connections=ROUTES.map(([from,to,waypoints])=>({id:`europe-${from}-${to}`,from,to,
    ...(waypoints?{points:waypoints.map(([longitude,latitude])=>projectEurope(longitude,latitude))}:{})}));
  const circuits=Object.entries(CIRCUITS).map(([id,names])=>{
    const stops=names.split(' ');
    return{id,segments:stops.map((from,index)=>{
      const to=stops[(index+1)%stops.length];
      const line=connections.find(line=>line.from===from&&line.to===to||line.from===to&&line.to===from);
      return{lineId:line.id,direction:line.from===from?1:-1};
    })};
  });
  return {
    name:'Europe · 50 largest cities',seed,bounds:{...geography.bounds},outline:structuredClone(geography.outline),
    camera:{northUp:true},density:.7,minTurnRadius:4,throatLength:1.5,cities,connections,
    rivers:geography.rivers.flatMap(river=>river.paths.map((points,index)=>({
      id:`${river.id}-${index+1}`,name:river.name,points,smooth:false,
      width:['danube','volga','dnieper','nile'].includes(river.id)?2.1:
        ['rhine','rhone','po','don','vistula','elbe','loire','seine','tagus','douro'].includes(river.id)?1.4:.85,
    }))),
    mountains:createEuropeRanges((lon,lat)=>{const {x,z}=projectEurope(lon,lat);return[x,z];},geography.landInterior),
    traffic:{trainCount,circuits},
    biomes:{sites:structuredClone(geography.biomeSites),geography:{
      ocean:structuredClone(geography.ocean),landInterior:structuredClone(geography.landInterior),oceanShore:structuredClone(geography.oceanShore),
      lakes:structuredClone(geography.lakes),lakeShore:structuredClone(geography.lakeShore),
    }},
    geography:{name:geography.name,bbox:{...geography.bbox},projection:{...geography.projection},
      sources:structuredClone(geography.sources),citySource:{...cityReference.source},
      citySelection:{...cityReference.selection},railwayMethod:'Schematic land-following corridors; Great Belt, Little Belt and Øresund use real crossing locations; Britain and Ireland have no overseas rail link.'},
  };
}
