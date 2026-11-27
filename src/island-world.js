import Clipper from 'clipper-lib';
import clipping from './polygon-ops.js';
import {compileMountainRange} from './mountain-ranges.js';

// A deliberately legible little landscape for designing the game: the coast,
// watershed and mountain pass stay fixed while the seed varies its settlements
// and vegetation. Every feature is ordinary world-authoring data.
const MAIN_COAST=[[-119,-44],[-110,-71],[-88,-83],[-72,-78],[-50,-91],[-20,-96],
  [3,-87],[20,-82],[38,-91],[58,-81],[70,-64],[96,-57],[113,-38],[117,-19],
  [104,-8],[88,-10],[80,2],[87,16],[108,27],[115,46],[103,63],[84,72],
  [64,67],[48,77],[22,88],[-3,85],[-25,91],[-50,81],[-63,65],[-85,67],
  [-108,51],[-121,32],[-119,13],[-106,0],[-108,-19]];
const ISLE_COASTS=[
  [[111,-70],[121,-74],[130,-68],[132,-58],[125,-53],[116,-58]],
  [[-127,58],[-120,54],[-113,61],[-117,72],[-128,76],[-134,68]],
  [[99,83],[110,79],[120,84],[122,94],[113,100],[102,95]],
];
const LAKE_COAST=[[-13,-21],[-7,-29],[4,-31],[14,-24],[15,-15],[10,-9],
  [3,-6],[-8,-11],[-15,-15]];
const FRAME=[[-140,-100],[-132,-110],[132,-110],[140,-100],[140,100],
  [132,110],[-132,110],[-140,100]];
const SHORE_WIDTH=1.15;

function roundedRing(points,iterations=2){
  let ring=points.map(point=>[...point]);
  for(let pass=0;pass<iterations;pass++){
    const next=[];
    for(let i=0;i<ring.length;i++){
      const a=ring[i],b=ring[(i+1)%ring.length];
      next.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],
        [a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75]);
    }
    ring=next;
  }
  return [...ring,[...ring[0]]];
}

// Offset actual coastlines, not their bounding boxes, so narrow coves and the
// little islands retain the same full-footprint beach clearance as the mainland.
function offsetLand(polygons,distance){
  const scale=10000,offset=new Clipper.ClipperOffset(2,.04*scale);
  for(const polygon of polygons){
    const path=polygon[0].slice(0,-1).map(([x,z])=>({X:Math.round(x*scale),Y:Math.round(z*scale)}));
    if(!Clipper.Clipper.Orientation(path))path.reverse();
    offset.AddPath(path,Clipper.JoinType.jtRound,Clipper.EndType.etClosedPolygon);
  }
  const result=new Clipper.Paths();offset.Execute(result,distance*scale);
  return result.map(path=>{const ring=path.map(({X,Y})=>[X/scale,Y/scale]);return [[...ring,[...ring[0]]]];});
}

export function createIslandGeography({coasts=[MAIN_COAST,...ISLE_COASTS],lakeCoasts=[LAKE_COAST],frame=FRAME,shoreWidth=SHORE_WIDTH}={}){
  const coast=coasts.map(ring=>[roundedRing(ring)]);
  const inland=offsetLand(coast,-shoreWidth),lakes=lakeCoasts.map(ring=>[roundedRing(ring)]);
  const lakeAndShore=offsetLand(lakes,shoreWidth);
  return {
    ocean:clipping.difference([[frame]],coast),
    oceanShore:clipping.difference(coast,inland),
    landInterior:clipping.difference(inland,lakeAndShore),
    lakes,lakeShore:clipping.difference(lakeAndShore,lakes),
  };
}

/** Compact, flat game-design environment. Earth remains a separate preset. */
export function createIslandWorld({seed='island-sandbox-v1',trainCount=12}={}){
  if(!Number.isInteger(trainCount)||trainCount<0||trainCount>128)
    throw new TypeError('Island trains must be an integer from 0 through 128');
  const cities=[
    {id:'westhaven',name:'Westhaven',x:-89,z:10,level:4,ownerId:'coral'},
    {id:'pineford',name:'Pineford',x:-82,z:-43,level:3,ownerId:'teal'},
    {id:'highmeadow',name:'Highmeadow',x:-9,z:-66,level:2,ownerId:'gold'},
    {id:'eastwood',name:'Eastwood',x:45,z:-51,level:3,ownerId:'teal'},
    {id:'cove',name:'Cove',x:74,z:-28,level:2,ownerId:'blue'},
    {id:'sunport',name:'Sunport',x:69,z:46,level:4,ownerId:'blue'},
    {id:'meadowford',name:'Meadowford',x:8,z:61,level:3,ownerId:'gold'},
    {id:'willow',name:'Willow',x:-49,z:46,level:2,ownerId:'coral'},
  ];
  const connections=cities.map((city,index)=>({
    id:`island-${city.id}`,from:city.id,to:cities[(index+1)%cities.length].id,
    // The bay railway follows the inland bank and crosses the river once.
    ...(city.id==='cove'?{points:[[65,8]]}:{}),
  }));
  return {
    name:'Little Island',seed,bounds:{width:280,depth:220},outline:structuredClone(FRAME),
    camera:{startInDetail:true},density:1.08,minTurnRadius:8,throatLength:4,
    cities,connections,
    rivers:[{id:'willow-river',name:'Willow River',width:3.1,
      points:[[7,-14],[17,0],[8,16],[31,28],[48,19],[66,22],[85,24],[106,29],[132,34]]}],
    mountains:[compileMountainRange({id:'greyspine',seed:'island-greyspine-v1',
      polygon:[[-68,-66],[-57,-77],[-44,-79],[-29,-66],[-22,-48],[-28,-31],
        [-22,-18],[-33,-8],[-48,-15],[-60,-33],[-65,-49]],
      ridges:[{width:16,points:[[-52,-67,15],[-45,-53,25],[-43,-37,22],[-34,-21,12]]},
        {width:10,points:[[-47,-48,19],[-58,-42,14]]}],
      cellSize:3.1,edgeWidth:6.5,snowLine:20,
    })],
    traffic:{trainCount,circuits:[{id:'island-circuit',segments:connections.map(line=>({lineId:line.id,direction:1}))}]},
    biomes:{sites:[
      {id:'western-heath',type:'plains',x:-108,z:15},
      {id:'pine-woods',type:'forest',x:-87,z:-56},
      {id:'ridge-woods',type:'forest',x:-63,z:-6},
      {id:'north-meadows',type:'plains',x:-3,z:-75},
      {id:'east-woods',type:'forest',x:42,z:-57},
      {id:'cove-woods',type:'forest',x:91,z:-31},
      {id:'lake-meadow',type:'plains',x:12,z:-21},
      {id:'willow-fields',type:'farmland',x:-35,z:29},
      {id:'river-fields',type:'farmland',x:29,z:12},
      {id:'southern-fields',type:'farmland',x:7,z:63},
      {id:'south-west-heath',type:'plains',x:-88,z:59},
      {id:'sunport-meadow',type:'plains',x:66,z:47},
      {id:'dune-coast',type:'desert',x:100,z:57},
      {id:'south-isles',type:'plains',x:111,z:89},
    ],geography:createIslandGeography()},
    geography:{name:'Little Island',kind:'authored-island',version:1,
      description:'A compact island with wooded uplands, a lake-fed river, farm valley, sheltered eastern bay and offshore islets.'},
  };
}
