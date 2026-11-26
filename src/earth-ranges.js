import clipping from './polygon-ops.js';
import {compileMountainRange} from './mountain-ranges.js';
import {EUROPE_RANGE_SPECS} from './europe-ranges.js';

// Artistic physical-region envelopes in longitude/latitude, not a DEM. Source
// coastlines trim every massif; ridgelines supply coherent continuous relief.
const range=(id,polygon,points,width=45,snowLine=24,cellSize=18)=>({id,polygon,ridges:[{points,width}],snowLine,cellSize});
export const EARTH_RANGE_SPECS=[
  range('rockies',[[-145,63],[-136,61],[-126,55],[-115,49],[-106,40],[-103,34],[-108,32],[-114,39],[-121,46],[-131,52],[-143,58]],
    [[-142,61,27],[-132,57,32],[-122,51,40],[-115,46,35],[-109,40,39],[-106,35,28]],55,24,20),
  range('cascades',[[-125,51],[-120,51],[-119,46],[-120,41],[-123,40],[-125,45]],
    [[-123,49,26],[-121.8,46.6,34],[-121.5,43.5,29],[-122,41.5,25]],30,20,14),
  range('sierra-nevada-america',[[-122,40],[-119.8,40],[-116,35],[-118,34.5],[-121,37]],
    [[-120.5,39.2,26],[-119.2,37.5,38],[-118.2,36,37]],28,24,14),
  range('appalachians',[[-84,35],[-82,34],[-77,39],[-72,43],[-67,46],[-69,48],[-75,45],[-81,41],[-85,37]],
    [[-83.5,35.5,20],[-80.5,38,18],[-76.5,41,17],[-72.5,44,20],[-69,46,17]],35,false,18),
  range('mexican-sierra',[[-113,31],[-108,32],[-103,26],[-99,22],[-98,18],[-102,17],[-106,23],[-111,27]],
    [[-110,30,26],[-107,26,31],[-103,22,28],[-100,19,36]],42,30,18),
  range('northern-andes',[[-79,10],[-73,11],[-69,7],[-72,2],[-75,-4],[-78,-7],[-81,-6],[-80,1],[-77,5]],
    [[-74,9,29],[-73,6,38],[-76,3,35],[-78,0,43],[-78.5,-5,38]],38,28,18),
  range('central-andes',[[-81,-5],[-77,-4],[-73,-10],[-68,-15],[-64,-21],[-66,-30],[-69,-36],[-72,-35],[-71,-26],[-71,-19],[-77,-12]],
    [[-78,-7,38],[-75,-11,46],[-71,-16,45],[-68,-21,47],[-69,-27,46],[-70,-33,45]],48,28,20),
  range('southern-andes',[[-72,-34],[-69,-34],[-69,-40],[-70,-45],[-71,-49],[-67,-54],[-70,-56],[-75,-51],[-75,-45],[-74,-39]],
    [[-70.5,-35,39],[-71.5,-40,34],[-72,-45,35],[-73,-49,37],[-69.5,-54,24]],35,18,18),
  range('brazilian-highlands',[[-49,-18],[-44,-18],[-39,-21],[-42,-25],[-47,-26],[-51,-23]],
    [[-46,-19,19],[-43.5,-22,25],[-46,-24,20],[-49,-22,16]],35,false,18),
  ...EUROPE_RANGE_SPECS.filter(spec=>['alps','pyrenees','scandinavian','carpathians','apennines','high-atlas','caucasus'].includes(spec.id)).map(spec=>({...spec,id:`earth-${spec.id}`,cellSize:12,ridges:spec.ridges.map(ridge=>({...ridge,width:ridge.width*.8}))})),
  range('ethiopian-highlands',[[35,15],[40,15],[43,10],[40,5],[35,7],[33,11]],
    [[37,13,35],[39,10,38],[38,7,29]],43,32,18),
  range('east-african-rift',[[28,4],[32,5],[38,-1],[39,-6],[35,-10],[29,-6]],
    [[30,2,29],[35,-1,42],[36,-3,39],[33,-7,27]],36,32,18),
  range('drakensberg',[[27,-27],[30,-26],[32,-29],[29,-33],[26,-31]],
    [[29,-27,27],[29.5,-29,31],[27.5,-31,22]],29,26,16),
  range('urals',[[55,68],[62,68],[62,61],[61,54],[57,50],[54,52],[57,58],[55,64]],
    [[59,66,23],[59,62,22],[59.5,57,20],[58,53,19]],35,19,20),
  range('zagros',[[43,38],[48,36],[53,32],[57,28],[55,26],[50,29],[46,32],[42,35]],
    [[44.5,36.5,28],[48,33.8,34],[51,31,31],[55,28,25]],40,28,18),
  range('hindu-kush',[[64,39],[72,39],[77,36],[74,32],[67,33],[63,36]],
    [[66,36,34],[70,36.3,46],[73.5,36,49]],48,27,18),
  range('himalaya',[[73,36],[79,34],[86,31],[93,30],[97,27],[95,25],[88,27],[81,29],[75,32]],
    [[75,34,48],[80,31,51],[85,28.5,55],[89,28.2,52],[94,28,48],[96,26.5,37]],48,30,16),
  range('tibetan-highlands',[[76,36],[82,38],[91,37],[100,34],[100,29],[95,28],[88,30],[82,32]],
    [[79,35,32],[85,35,38],[91,34.5,40],[97,32,35]],65,32,20),
  range('tian-shan',[[70,44],[78,45],[88,44],[95,41],[92,39],[84,41],[76,41],[69,41]],
    [[72,42.4,36],[77,43,43],[83,42.5,42],[89,42,38],[93,40.5,31]],42,27,20),
  range('altai',[[82,51],[90,52],[98,48],[97,45],[91,46],[84,48]],
    [[85,49,31],[89,49.5,38],[94,47.5,35]],40,24,20),
  range('southeast-asian-highlands',[[96,27],[102,26],[105,21],[106,17],[103,16],[99,20],[96,23]],
    [[98,25,32],[101,23,30],[103.5,20,27],[104,17.5,21]],37,false,18),
  range('japanese-alps',[[135,36],[137,37.5],[140,38],[141,36],[139,34],[136,34]],
    [[136.5,35.8,24],[138,36.2,35],[139.2,37,27]],22,22,12),
  range('great-dividing-range',[[144,-17],[148,-18],[151,-25],[153,-29],[151,-36],[147,-39],[144,-37],[148,-33],[148,-27],[145,-22]],
    [[146,-19,18],[148,-25,22],[150,-30,25],[149,-35,26],[146,-37,20]],34,25,20),
  range('new-zealand-alps',[[166,-45],[169,-42],[172,-40],[174,-42],[171,-45],[168,-47]],
    [[172,-41.7,27],[170,-43.4,36],[168,-45.1,30]],25,18,14),
];
const bounds=ring=>({minX:Math.min(...ring.map(p=>p[0])),maxX:Math.max(...ring.map(p=>p[0])),minZ:Math.min(...ring.map(p=>p[1])),maxZ:Math.max(...ring.map(p=>p[1]))});
const overlap=(a,b)=>a.minX<=b.maxX&&a.maxX>=b.minX&&a.minZ<=b.maxZ&&a.maxZ>=b.minZ;
const area=ring=>Math.abs(ring.reduce((sum,p,i)=>{const q=ring[(i+1)%ring.length];return sum+p[0]*q[1]-p[1]*q[0];},0))/2;

export function createEarthRanges(project,land){
  const pieces=land.map(polygon=>({polygon,bounds:bounds(polygon[0])})),result=[];
  for(const spec of EARTH_RANGE_SPECS){
    const polygon=spec.polygon.map(p=>project(...p));polygon.push([...polygon[0]]);
    const box=bounds(polygon),local=pieces.filter(p=>overlap(box,p.bounds)).map(p=>p.polygon);
    if(!local.length)continue;
    const clipped=clipping.intersection([[polygon]],local).filter(rings=>area(rings[0])>120).sort((a,b)=>area(b[0])-area(a[0]));
    for(const [index,rings]of clipped.entries()){
      const extent=bounds(rings[0]),narrow=Math.min(extent.maxX-extent.minX,extent.maxZ-extent.minZ);
      result.push(compileMountainRange({id:`${spec.id}${index?`-${index+1}`:''}`,seed:spec.id,polygon:rings[0],holes:rings.slice(1),
        cellSize:Math.max(6,Math.min(spec.cellSize??18,narrow/3)),snowLine:spec.snowLine,
        ridges:spec.ridges.map(ridge=>({width:ridge.width,points:ridge.points.map(([lon,lat,height])=>[...project(lon,lat),height])}))}));
    }
  }
  return result;
}
