// CSS-pixel dimensions keep the atlas readable on a phone, a large desktop,
// and a whole-planet view without scaling geometry or adding more draw calls.
export const MAP_SYMBOL_PIXELS=Object.freeze({railCore:1.4,cityReferenceRadius:7.5,trainWidth:2.7,trainLength:6.8});
export const MAP_CITY_DOT_DIAMETER=3.4;

export const mapCityRadius=level=>(1.75+Math.max(1,Math.min(10,Math.round(Number(level)||1)))*.12)*MAP_SYMBOL_PIXELS.cityReferenceRadius/2.5;

/** Priority-ordered screen circles use a tiny spatial grid. Secondary cities
 * stay at their real anchors as owner dots; no geographic point is displaced.
 * A two-pixel promotion margin prevents toggling when a pair nearly touches. */
export function declutterMapCities(cities,unitsPerPixel){
  const fraction=Math.max(0,Math.min(1,(unitsPerPixel-.6)/.6));
  const strength=fraction*fraction*(3-2*fraction),grid=new Map(),cellSize=24,targets=new Map();
  for(const city of cities){
    if(!city.visible||strength===0){targets.set(city.id,1);continue;}
    const column=Math.floor(city.x/cellSize),row=Math.floor(city.y/cellSize),padding=(city.previous??1)>.5?1:2.5;
    let crowded=false;
    for(let dx=-1;dx<=1&&!crowded;dx++)for(let dy=-1;dy<=1&&!crowded;dy++){
      for(const other of grid.get(`${column+dx}:${row+dy}`)??[]){
        if(Math.hypot(city.x-other.x,city.y-other.y)<city.radius+other.radius+padding){crowded=true;break;}
      }
    }
    targets.set(city.id,crowded?1-strength:1);
    if(!crowded){const key=`${column}:${row}`;if(!grid.has(key))grid.set(key,[]);grid.get(key).push(city);}
  }
  return targets;
}

export function mapSymbolMetrics(unitsPerPixel,symbolScale=1,trainWidthScale=1){
  if(!(unitsPerPixel>0))return {routeScale:1,cityScale:1,trainScaleX:1,trainScaleZ:1};
  return {
    routeScale:unitsPerPixel*MAP_SYMBOL_PIXELS.railCore/.42,
    cityScale:unitsPerPixel*MAP_SYMBOL_PIXELS.cityReferenceRadius/(2.5*symbolScale),
    trainScaleX:Math.max(1,unitsPerPixel*MAP_SYMBOL_PIXELS.trainWidth/(1.22*trainWidthScale)),
    trainScaleZ:Math.max(1,unitsPerPixel*MAP_SYMBOL_PIXELS.trainLength/2.45),
  };
}
