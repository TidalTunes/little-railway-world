import {createIslandGeography} from './island-world.js';
import {compileMountainRange} from './mountain-ranges.js';

const FRAME=[[-252,-180],[-237,-198],[237,-198],[252,-180],[252,180],[237,198],[-237,198],[-252,180]];
const COAST=[[-218,-76],[-203,-123],[-166,-149],[-139,-137],[-106,-163],[-53,-174],
  [-8,-155],[26,-147],[65,-165],[106,-146],[123,-115],[172,-101],[204,-67],[212,-34],
  [187,-13],[154,-18],[141,3],[153,25],[194,45],[209,80],[185,112],[151,130],
  [114,120],[84,141],[40,160],[-7,154],[-45,164],[-91,144],[-111,115],[-153,122],
  [-192,94],[-219,58],[-214,22],[-187,3],[-195,-31]];
const ISLETS=[
  [[201,-125],[218,-132],[235,-121],[238,-104],[225,-94],[208,-103]],
  [[-231,106],[-216,98],[-202,111],[-211,129],[-232,138],[-243,123]],
  [[176,150],[196,141],[216,151],[220,169],[204,180],[184,172]],
];
const LAKES=[
  [[-18,-44],[-6,-60],[15,-60],[30,-47],[31,-31],[20,-20],[5,-15],[-15,-26],[-23,-34]],
  [[-170,-91],[-158,-107],[-139,-106],[-128,-94],[-130,-77],[-145,-70],[-164,-77]],
];

/** A larger authored playground keeps scenery streamed and local. Geographic
 * detail comes from ordinary shores, watersheds and biome districts, not a
 * baked terrain mesh or a map-wide catalogue of individual assets. */
export function createFrontierIsland({seed='first-settlement-v1'}={}){
  return{
    name:'The Longshore',seed,bounds:{width:504,depth:396},outline:structuredClone(FRAME),
    camera:{startInDetail:true},density:1.04,minTurnRadius:8,throatLength:4,
    cities:[],connections:[],traffic:{trainCount:0,circuits:[]},
    rivers:[
      {id:'longshore-river',name:'Longshore River',width:3.4,points:[[12,-34],[29,-8],[19,10],[44,24],[65,13],[91,23],[120,25],[152,37],[188,49],[225,59]]},
      {id:'highland-stream',name:'Highland Stream',width:2.1,points:[[-7,-115],[-15,-94],[-8,-74],[2,-55],[12,-34]]},
      {id:'alder-stream',name:'Alder Stream',width:2.5,points:[[-147,-84],[-139,-60],[-154,-39],[-145,-15],[-164,11],[-186,25],[-218,38],[-239,44]]},
    ],
    mountains:[
      compileMountainRange({id:'western-crown',seed:'longshore-western-crown',
        polygon:[[-132,-145],[-109,-159],[-85,-145],[-62,-123],[-54,-101],[-68,-84],[-86,-90],[-100,-110],[-123,-120]],
        ridges:[{width:18,points:[[-111,-141,20],[-94,-127,32],[-78,-109,25]]},{width:11,points:[[-97,-129,26],[-118,-126,15]]}],
        cellSize:3.5,edgeWidth:7,snowLine:25}),
      compileMountainRange({id:'eastern-crown',seed:'longshore-eastern-crown',
        polygon:[[8,-129],[29,-151],[51,-153],[71,-135],[86,-111],[79,-91],[57,-79],[39,-91],[26,-111]],
        ridges:[{width:19,points:[[34,-133,26],[50,-120,35],[65,-98,23]]},{width:12,points:[[48,-123,27],[67,-129,18]]}],
        cellSize:3.5,edgeWidth:7,snowLine:27}),
      compileMountainRange({id:'redstone-ridge',seed:'longshore-redstone',
        polygon:[[103,-75],[120,-87],[141,-79],[153,-59],[148,-40],[131,-28],[115,-39],[107,-56]],
        ridges:[{width:17,points:[[124,-71,14],[133,-55,18],[131,-43,12]]}],
        cellSize:3.8,edgeWidth:8,snowLine:false}),
    ],
    biomes:{sites:[
      {id:'starter-woods',type:'forest',x:-92,z:-45},
      {id:'alder-woods',type:'forest',x:-174,z:-52},
      {id:'western-headland',type:'plains',x:-192,z:-108},
      {id:'crown-woods',type:'forest',x:-123,z:-133},
      {id:'northern-pass',type:'plains',x:-25,z:-127},
      {id:'pine-arm',type:'forest',x:-44,z:-84},
      {id:'lake-woods',type:'forest',x:30,z:-77},
      {id:'eastern-woods',type:'forest',x:95,z:-117},
      {id:'redstone-desert',type:'desert',x:164,z:-61},
      {id:'dry-bay',type:'desert',x:155,z:-2},
      {id:'west-bank-fields',type:'farmland',x:-160,z:38},
      {id:'willow-fields',type:'farmland',x:-75,z:21},
      {id:'river-fields',type:'farmland',x:0,z:36},
      {id:'east-bank-fields',type:'farmland',x:82,z:-5},
      {id:'southern-fields',type:'farmland',x:-24,z:112},
      {id:'sunward-fields',type:'farmland',x:120,z:99},
      {id:'western-meadow',type:'plains',x:-113,z:90},
      {id:'southwood-arm',type:'forest',x:-60,z:74},
      {id:'southern-heath',type:'plains',x:47,z:119},
      {id:'dune-coast',type:'desert',x:184,z:75},
      {id:'south-isles',type:'plains',x:199,z:161},
    ],geography:createIslandGeography({coasts:[COAST,...ISLETS],lakeCoasts:LAKES,frame:FRAME,shoreWidth:1.4})},
    geography:{name:'The Longshore',kind:'frontier-island',version:1,
      description:'A broad island of branching woodlands, a highland pass, twin lakes, fertile river corridors and a dry eastern headland.'},
  };
}
