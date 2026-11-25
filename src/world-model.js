/**
 * Deterministic, renderer-independent railway world planner.
 *
 * All coordinates are metres in the x/z plane. Routes are sampled polylines with
 * cumulative distances; interval start/end values use those same distances.
 * Custom cities, rivers, mountains and connections can be supplied independently.
 * A connection's optional points are intermediate waypoints (its city endpoints
 * are always included). Ground is y=0, water y=-1.2 and track centre y=.42.
 * Scenery footprints include the outer silhouette, rather than just the trunk or
 * building wall, and are reserved before the renderer receives any assets.
 */
export const WORLD_DEFAULTS = Object.freeze({
  seed: 27, width: 130, depth: 95, cityRadius: 9.6, riverWidth: 5.4,
  groundY: 0, waterY: -1.2, railY: .42, sampleSpacing: .55,
});
export const CLEARANCES = Object.freeze({
  trackHalfWidth: 1.05, routeEdge: 1.35, cuttingHalfWidth: 1.08, track: 1.45, riverBank: .8, mountain: .35,
  objects: .32, worldEdge: .75, city: 1.25, stationOffset: 3,
  stationLength: 6.4, stationWidth: 2.4, stationEndDistance: 7,
  tunnelRoofHeight: 3.9, tunnelArchRadius: 1.4, tunnelArchSpring: 1.8, tunnelRockCover: .1, mountainFacets: 24, bridgeBank: 2.2, maximumGrade: .12,
});

const EPS = 1e-7;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp = (a, b, t) => a + (b - a) * t;
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const point = (p, y = WORLD_DEFAULTS.railY) => Array.isArray(p)
  ? { x: Number(p[0]), y, z: Number(p.length > 2 ? p[2] : p[1]) }
  : { x: Number(p.x), y, z: Number(p.z) };
const finitePoint = p => Number.isFinite(p.x) && Number.isFinite(p.z);

export function seededRandom(seed) {
  let h = 2166136261;
  for (const char of String(seed)) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return () => {
    h += 0x6D2B79F5;
    let t = h;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function pointSegmentDistance(x, z, a, b) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const t = clamp(((x - a.x) * dx + (z - a.z) * dz) / (dx * dx + dz * dz || 1), 0, 1);
  return Math.hypot(x - lerp(a.x, b.x, t), z - lerp(a.z, b.z, t));
}
export function distanceToLine(line, x, z) {
  let d = Infinity;
  for (let i = 1; i < line.points.length; i++) d = Math.min(d, pointSegmentDistance(x, z, line.points[i - 1], line.points[i]));
  return d;
}
export function distanceToRoutes(world, x, z) {
  return world.lines.reduce((d, line) => Math.min(d, distanceToLine(line, x, z)), Infinity);
}
export function distanceToRiver(world, x, z) {
  return distanceToLine(world.river, x, z);
}

export function inWorld(world, x, z, margin = 0) {
  let inside = false;
  const polygon = world.outline;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i], b = polygon[j];
    if ((a[1] > z) !== (b[1] > z) && x < (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
  }
  if (!inside) return false;
  if (margin <= 0) return true;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i], b = polygon[(i + 1) % polygon.length];
    if (pointSegmentDistance(x, z, {x:a[0],z:a[1]}, {x:b[0],z:b[1]}) < margin) return false;
  }
  return true;
}

/** Exact linear cone profile used by the renderer, including at tunnel portals. */
export function mountainHeight(mountain, x, z) {
  return Math.max(0, 1 - Math.hypot(x - mountain.x, z - mountain.z) / mountain.radius) * mountain.height;
}
export function surfaceHeight(world, x, z) {
  let height = WORLD_DEFAULTS.groundY;
  for (const mountain of world.mountains) height = Math.max(height, mountainHeight(mountain, x, z));
  return height;
}
export function worldSurface(world, x, z) {
  if (!inWorld(world, x, z)) return {type:'outside', height:-5};
  if (distanceToRiver(world, x, z) < world.river.width / 2) return {type:'water',height:world.river.y};
  const height = surfaceHeight(world, x, z);
  return {type:height > 0 ? 'mountain' : 'ground', height};
}

function sampledPolyline(nodes, y, spacing = WORLD_DEFAULTS.sampleSpacing) {
  const points = [];
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i - 1], b = nodes[i], steps = Math.max(1, Math.ceil(distance(a, b) / spacing));
    for (let j = 0; j < steps; j++) {
      if (i > 1 && j === 0 && distance(a, points.at(-1)) < EPS) continue;
      points.push({x:lerp(a.x,b.x,j/steps),y,z:lerp(a.z,b.z,j/steps)});
    }
  }
  points.push({...nodes.at(-1),y});
  const distances = [0];
  for (let i = 1; i < points.length; i++) distances.push(distances[i-1]+distance(points[i-1],points[i]));
  return {points,distances,length:distances.at(-1)};
}

/** Round user-supplied route corners without overshooting their control polygon. */
function roundedWaypoints(nodes, radius = 4) {
  if (nodes.length < 3) return nodes;
  const out = [nodes[0]];
  for (let i = 1; i < nodes.length-1; i++) {
    const prev = nodes[i-1], p = nodes[i], next = nodes[i+1];
    const d1 = distance(prev,p), d2 = distance(p,next);
    if (d1 < EPS || d2 < EPS) continue;
    const inset = Math.min(radius,d1*.3,d2*.3);
    const a = {x:p.x+(prev.x-p.x)*inset/d1,z:p.z+(prev.z-p.z)*inset/d1};
    const b = {x:p.x+(next.x-p.x)*inset/d2,z:p.z+(next.z-p.z)*inset/d2};
    out.push(a);
    for (let j = 1; j <= 10; j++) {
      const t=j/10,u=1-t;
      out.push({x:u*u*a.x+2*u*t*p.x+t*t*b.x,z:u*u*a.z+2*u*t*p.z+t*t*b.z});
    }
  }
  out.push(nodes.at(-1));
  return out;
}

/** sampleLine clamps open routes; angle is the rotation of a +z-facing train. */
export function sampleLine(line, distanceAlong) {
  const s = clamp(distanceAlong,0,line.length);
  let lo=0,hi=line.distances.length-1;
  while(lo+1<hi){const mid=(lo+hi)>>1;if(line.distances[mid]<=s)lo=mid;else hi=mid;}
  const a=line.points[lo],b=line.points[hi],span=line.distances[hi]-line.distances[lo];
  const t=span>EPS?(s-line.distances[lo])/span:0;
  const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,len=Math.hypot(dx,dy,dz)||1;
  return {x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),z:lerp(a.z,b.z,t),distance:s,
    tangent:{x:dx/len,y:dy/len,z:dz/len},angle:Math.atan2(dx,dz)};
}

function intervalsFor(line, signedDistance) {
  const intervals=[];
  let start=signedDistance(line.points[0],0)<=0?0:null;
  for(let i=1;i<line.points.length;i++){
    const a=line.points[i-1],b=line.points[i],fa=signedDistance(a,line.distances[i-1]),fb=signedDistance(b,line.distances[i]);
    if((fa<=0)===(fb<=0))continue;
    let lo=0,hi=1;
    for(let j=0;j<18;j++){
      const t=(lo+hi)/2,p={x:lerp(a.x,b.x,t),z:lerp(a.z,b.z,t)};
      const s=lerp(line.distances[i-1],line.distances[i],t);
      if((signedDistance(p,s)<=0)===(fa<=0))lo=t;else hi=t;
    }
    const crossing=lerp(line.distances[i-1],line.distances[i],(lo+hi)/2);
    if(fa>0)start=crossing;
    else {if(crossing-(start??0)>.01)intervals.push({start:start??0,end:crossing});start=null;}
  }
  if(start!==null&&line.length-start>.01)intervals.push({start,end:line.length});
  return intervals.map(interval=>({...interval,entry:sampleLine(line,interval.start),exit:sampleLine(line,interval.end)}));
}

function makeOutline(width,depth) {
  // A convex twelve-sided tile keeps every generated world clipped cleanly.
  return [[-.50,-.22],[-.43,-.43],[-.20,-.50],[.22,-.50],[.44,-.40],[.50,-.17],
    [.50,.23],[.40,.44],[.18,.50],[-.22,.50],[-.44,.39],[-.50,.12]]
    .map(([x,z])=>[x*width,z*depth]);
}
function assert(condition, message) { if (!condition) throw new TypeError(`Invalid world: ${message}`); }
function normalizeCities(input, bounds, random) {
  if (input.cities) {
    assert(Array.isArray(input.cities)&&input.cities.length>=2,'at least two cities are required');
    const cities=input.cities.map((city,i)=>({...city,id:String(city.id??`city-${i+1}`),...point(city,0),radius:city.radius??WORLD_DEFAULTS.cityRadius,stationIds:[]}));
    assert(cities.every(c=>finitePoint(c)&&Number.isFinite(c.radius)&&c.radius>0),'cities require finite x/z and positive radii');
    assert(new Set(cities.map(c=>c.id)).size===cities.length,'city IDs must be unique');
    return cities;
  }
  const anchors=[['westhaven',-47,25],['pineford',-43,-20],['summit',-16,-29],['alder',16,-27],
    ['eastmere',46,-17],['sunfield',47,23],['meadow',16,30],['willow',-16,23]];
  assert(Number.isFinite(Number(input.cityCount??8)),'cityCount must be finite');
  const count=clamp(Math.round(input.cityCount??8),3,20),scale=Math.min(bounds.width/130,bounds.depth/95);
  if(count!==8)return Array.from({length:count},(_,i)=>{
    const a=Math.PI*2*i/count+.35+(random()-.5)*.14;
    return {id:`city-${i+1}`,x:Math.cos(a)*bounds.width*.35,z:Math.sin(a)*bounds.depth*.32,
      y:0,radius:Math.min(WORLD_DEFAULTS.cityRadius*scale,Math.min(bounds.width,bounds.depth)*.85/count),stationIds:[]};
  });
  return anchors.map(([id,x,z])=>({id,x:x*bounds.width/130+(random()-.5)*2.6*scale,z:z*bounds.depth/95+(random()-.5)*2.6*scale,
    y:0,radius:WORLD_DEFAULTS.cityRadius*scale,stationIds:[]}));
}

function footprintCorners(item) {
  const width=item.platform?.width??item.width??0,length=item.platform?.length??item.length??0;
  const a=item.rotation??0,c=Math.cos(a),s=Math.sin(a);
  return [[-length/2,-width/2],[length/2,-width/2],[length/2,width/2],[-length/2,width/2]]
    .map(([x,z])=>({x:item.x+x*c+z*s,z:item.z-x*s+z*c}));
}
function segmentCrosses(a,b,c,d) {
  const cross=(p,q,r)=>(q.x-p.x)*(r.z-p.z)-(q.z-p.z)*(r.x-p.x);
  return cross(a,b,c)*cross(a,b,d)<-EPS&&cross(c,d,a)*cross(c,d,b)<-EPS;
}
function distanceToRectangle(item,x,z) {
  const a=item.rotation??0,c=Math.cos(a),s=Math.sin(a),dx=x-item.x,dz=z-item.z;
  const xx=dx*c-dz*s,zz=dx*s+dz*c;
  return Math.hypot(Math.max(0,Math.abs(xx)-item.platform.length/2),Math.max(0,Math.abs(zz)-item.platform.width/2));
}
function rectangleToLine(item,line) {
  const corners=footprintCorners(item);
  let closest=Infinity;
  for(const corner of corners)closest=Math.min(closest,distanceToLine(line,corner.x,corner.z));
  for(let i=0;i<line.points.length;i++){
    const p=line.points[i];closest=Math.min(closest,distanceToRectangle(item,p.x,p.z));
    if(i)for(let j=0;j<4;j++)if(segmentCrosses(line.points[i-1],p,corners[j],corners[(j+1)%4]))return 0;
  }
  return closest;
}

function placeStations(world) {
  const stations=[];
  // One substantial station per city keeps the skyline legible at a wide zoom.
  for(const city of world.cities){
    const options=[];
    for(const line of world.lines){
      if(line.from!==city.id&&line.to!==city.id)continue;
      const from=line.from===city.id;
      for(const endDistance of [7,8.5,10]){
        if(line.length<endDistance*2+1)continue;
        const d=from?endDistance:line.length-endDistance,p=sampleLine(line,d);
        for(const side of [-1,1]){
          const nx=-p.tangent.z,nz=p.tangent.x;
          const station={id:`station-${city.id}`,kind:'station',cityId:city.id,lineId:line.id,distance:d,
            x:p.x+nx*CLEARANCES.stationOffset*side,y:0,z:p.z+nz*CLEARANCES.stationOffset*side,
            rotation:-Math.atan2(p.tangent.z,p.tangent.x)+(side>0?Math.PI:0),side,
            radius:Math.hypot(CLEARANCES.stationLength/2,CLEARANCES.stationWidth/2),
            platform:{width:CLEARANCES.stationWidth,length:CLEARANCES.stationLength}};
          if(!inWorld(world,station.x,station.z,station.radius+CLEARANCES.worldEdge))continue;
          if(world.mountains.some(m=>distance(station,m)<station.radius+m.radius+CLEARANCES.mountain))continue;
          if(rectangleToLine(station,world.river)<world.river.width/2+CLEARANCES.riverBank)continue;
          if(world.lines.some(other=>rectangleToLine(station,other)<CLEARANCES.trackHalfWidth+.25))continue;
          if(stations.some(other=>distance(station,other)<station.radius+other.radius+CLEARANCES.objects))continue;
          const score=distance(station,city)+endDistance*.05;
          options.push({station,score});
        }
      }
    }
    options.sort((a,b)=>a.score-b.score);
    if(options.length){const station=options[0].station;stations.push(station);city.stationIds.push(station.id);}
  }
  world.stations=stations;
  for(const line of world.lines){
    const served=stations.filter(s=>s.lineId===line.id);
    line.stationIds=served.map(s=>s.id);
    for(const stop of line.stops){
      const station=served.find(s=>s.cityId===stop.cityId);
      if(station)stop.distance=station.distance;
    }
  }
}

function canPlace(world,item,{cityId=null,keepOutsideCities=false}={}) {
  const r=item.radius;
  if(!inWorld(world,item.x,item.z,r+CLEARANCES.worldEdge))return false;
  if(distanceToRoutes(world,item.x,item.z)<r+CLEARANCES.track)return false;
  if(distanceToRiver(world,item.x,item.z)<r+world.river.width/2+CLEARANCES.riverBank)return false;
  if(world.mountains.some(m=>distance(item,m)<m.radius+r+CLEARANCES.mountain))return false;
  if(keepOutsideCities&&world.cities.some(c=>distance(item,c)<c.radius+r+CLEARANCES.city))return false;
  if(cityId&&world.cities.some(c=>c.id!==cityId&&distance(item,c)<c.radius+r*.5))return false;
  if(world.stations.some(s=>distance(item,s)<r+s.radius+CLEARANCES.objects))return false;
  if(world.placements.some(p=>distance(item,p)<r+p.radius+CLEARANCES.objects))return false;
  return true;
}
function placeScenery(world,random,density) {
  const add=item=>world.placements.push({id:`asset-${world.placements.length+1}`,y:0,rotation:random()*Math.PI*2,...item});
  for(let ci=0;ci<world.cities.length;ci++){
    const city=world.cities[ci];
    // Candidates are independent of previous accepted candidates: stable and repeatable.
    for(let attempt=0,accepted=0;attempt<200&&accepted<7;attempt++){
      const a=random()*Math.PI*2,r=Math.sqrt(random())*Math.max(2,city.radius-1.8);
      const kind=accepted===0?'landmark':'house',radius=kind==='landmark'?2:1.56;
      const item={kind,cityId:city.id,x:city.x+Math.cos(a)*r,z:city.z+Math.sin(a)*r,radius,scale:1,
        variant:kind==='landmark'?ci%3:Math.floor(random()*6),rotation:Math.round(a/(Math.PI/2))*Math.PI/2};
      if(canPlace(world,item,{cityId:city.id})){add(item);accepted++;}
    }
  }
  const scale=Math.sqrt(world.bounds.width*world.bounds.depth/(130*95));
  const farmCount=Math.max(2,Math.round(8*density*scale));
  for(let attempt=0,accepted=0;attempt<800&&accepted<farmCount;attempt++){
    const item={kind:'farm',x:(random()-.5)*world.bounds.width*.88,z:(random()-.5)*world.bounds.depth*.82,
      radius:2.5,scale:1,variant:Math.floor(random()*3),rotation:Math.floor(random()*4)*Math.PI/2};
    if(canPlace(world,item,{keepOutsideCities:true})){add(item);accepted++;}
  }
  // Groves leave open meadows. Large canopy discs reserve space for all later details.
  const groves=Array.from({length:13},()=>({x:(random()-.5)*world.bounds.width*.9,z:(random()-.5)*world.bounds.depth*.85}));
  const treeTarget=Math.round(245*density*scale);
  for(let attempt=0,accepted=0;attempt<treeTarget*32&&accepted<treeTarget;attempt++){
    const grove=groves[Math.floor(random()*groves.length)],a=random()*Math.PI*2,r=Math.sqrt(random())*12;
    const size=.72+random()*.52;
    const item={kind:'tree',x:grove.x+Math.cos(a)*r,z:grove.z+Math.sin(a)*r,radius:.85*size,
      scale:size,variant:random()<.66?'pine':random()<.55?'round':'gold'};
    if(canPlace(world,item,{keepOutsideCities:true})){add(item);accepted++;}
  }
  for(let attempt=0,accepted=0;attempt<1200&&accepted<Math.round(70*density*scale);attempt++){
    const kind=attempt%7===0?'sheep':'rock',size=.6+random()*.55;
    const item={kind,x:(random()-.5)*world.bounds.width*.9,z:(random()-.5)*world.bounds.depth*.9,
      radius:kind==='sheep'?.7:.65*size,scale:kind==='sheep'?1:size,variant:Math.floor(random()*3)};
    if(canPlace(world,item,{keepOutsideCities:true})){add(item);accepted++;}
  }
}

/** Locate actual at-grade crossings for the train reservation controller. */
function buildJunctions(world) {
  const junctions=[];
  const cross=(ax,az,bx,bz)=>ax*bz-az*bx;
  const segments=world.lines.map(line=>line.points.slice(1).map((b,i)=>{
    const a=line.points[i];
    return {a,b,index:i,minX:Math.min(a.x,b.x),maxX:Math.max(a.x,b.x),minZ:Math.min(a.z,b.z),maxZ:Math.max(a.z,b.z)};
  }));
  for(let li=0;li<world.lines.length;li++)for(let lj=li+1;lj<world.lines.length;lj++){
    const first=world.lines[li],second=world.lines[lj];
    for(const u of segments[li])for(const v of segments[lj]){
      if(u.maxX<v.minX-EPS||v.maxX<u.minX-EPS||u.maxZ<v.minZ-EPS||v.maxZ<u.minZ-EPS)continue;
      const rx=u.b.x-u.a.x,rz=u.b.z-u.a.z,sx=v.b.x-v.a.x,sz=v.b.z-v.a.z;
      const qx=v.a.x-u.a.x,qz=v.a.z-u.a.z,denominator=cross(rx,rz,sx,sz);
      const r2=rx*rx+rz*rz;
      if(Math.abs(denominator)<1e-10){
        if(Math.abs(cross(qx,qz,rx,rz))>1e-7)continue;
        const t0=(qx*rx+qz*rz)/(r2||1),t1=t0+(sx*rx+sz*rz)/(r2||1);
        const overlap=(Math.min(1,Math.max(t0,t1))-Math.max(0,Math.min(t0,t1)))*Math.sqrt(r2);
        assert(overlap<.0001,`routes ${first.id} and ${second.id} overlap; shared railway segments must be represented by one connection`);
        continue;
      }
      const t=cross(qx,qz,sx,sz)/denominator,h=cross(qx,qz,rx,rz)/denominator;
      if(t<-.000001||t>1.000001||h<-.000001||h>1.000001)continue;
      const d1=lerp(first.distances[u.index],first.distances[u.index+1],clamp(t,0,1));
      const d2=lerp(second.distances[v.index],second.distances[v.index+1],clamp(h,0,1));
      const atEnd=(line,d)=>d<.001||d>line.length-.001;
      const shareCity=first.from===second.from||first.from===second.to||first.to===second.from||first.to===second.to;
      if(shareCity&&atEnd(first,d1)&&atEnd(second,d2))continue;
      const x=lerp(u.a.x,u.b.x,clamp(t,0,1)),z=lerp(u.a.z,u.b.z,clamp(t,0,1));
      let junction=junctions.find(j=>Math.hypot(j.x-x,j.z-z)<.05);
      if(!junction){junction={id:`junction-${junctions.length+1}`,x,y:WORLD_DEFAULTS.railY,z,lines:[]};junctions.push(junction);}
      for(const [line,distance] of [[first,d1],[second,d2]])if(!junction.lines.some(entry=>entry.lineId===line.id))junction.lines.push({lineId:line.id,distance});
    }
  }
  world.junctions=junctions;
}

/** Invalid topology or non-finite input throws; crowded optional scenery is skipped. */
export function generateWorld(input = {}) {
  const seed=input.seed??WORLD_DEFAULTS.seed,random=seededRandom(seed);
  const bounds={width:Number(input.bounds?.width??WORLD_DEFAULTS.width),depth:Number(input.bounds?.depth??WORLD_DEFAULTS.depth)};
  assert(Number.isFinite(bounds.width)&&Number.isFinite(bounds.depth)&&bounds.width>=35&&bounds.depth>=30,'bounds must be finite and at least 35 × 30');
  const cities=normalizeCities(input,bounds,random);
  const outline=input.outline?input.outline.map(p=>[Number(p[0]),Number(p[1])]):makeOutline(bounds.width,bounds.depth);
  assert(outline.length>=3&&outline.every(p=>p.every(Number.isFinite)),'outline requires at least three finite points');
  const world={version:1,seed,bounds,outline,cities,lines:[],stations:[],placements:[],junctions:[]};
  assert(cities.every(c=>inWorld(world,c.x,c.z,.5)),'cities must be inside the world outline');
  const riverNodes=input.river?.points??[[-.64,.015],[-.42,-.025],[-.20,.035],[.02,.00],[.22,.075],[.43,.055],[.64,.015]]
    .map(([x,z])=>[x*bounds.width,z*bounds.depth]);
  const rawRiverPoints=riverNodes.map(p=>point(p,WORLD_DEFAULTS.waterY));
  assert(rawRiverPoints.every(finitePoint),'river requires finite points');
  const riverPoints=rawRiverPoints.filter((p,i)=>i===0||distance(p,rawRiverPoints[i-1])>EPS);
  assert(riverPoints.length>=2,'river requires at least two distinct points');
  const riverWidth=Number(input.river?.width??WORLD_DEFAULTS.riverWidth);
  assert(Number.isFinite(riverWidth)&&riverWidth>0,'river width must be positive');
  world.river={...sampledPolyline(roundedWaypoints(riverPoints,9),WORLD_DEFAULTS.waterY,1),width:riverWidth,y:WORLD_DEFAULTS.waterY};
  assert(Number.isFinite(world.river.length)&&world.river.length>EPS,'river must have positive length');
  const scale=Math.min(bounds.width/130,bounds.depth/95);
  const northPair=[...cities].sort((a,b)=>a.z-b.z).slice(0,2);
  const mid={x:(northPair[0].x+northPair[1].x)/2,z:(northPair[0].z+northPair[1].z)/2};
  const defaultMountains=input.cities?[]:[
    {id:'high-pass',...mid,radius:10*scale,height:13*scale},
    {id:'north-spire',x:mid.x-7*scale,z:mid.z-11*scale,radius:6.8*scale,height:10*scale},
    {id:'east-spire',x:mid.x+11*scale,z:mid.z-10*scale,radius:7*scale,height:9*scale},
  ];
  const generatedMountains=defaultMountains.filter(m=>inWorld(world,m.x,m.z,m.radius+.1)
    &&distanceToRiver(world,m.x,m.z)>m.radius+riverWidth/2+CLEARANCES.riverBank
    &&cities.every(c=>distance(c,m)>m.radius+2));
  world.mountains=(input.mountains??generatedMountains).map((m,i)=>({...m,id:String(m.id??`mountain-${i+1}`),x:Number(m.x),z:Number(m.z),radius:Number(m.radius),height:Number(m.height)}));
  assert(world.mountains.every(m=>finitePoint(m)&&Number.isFinite(m.radius)&&m.radius>0&&Number.isFinite(m.height)&&m.height>0),'mountains require finite x/z and positive radius/height');
  assert(new Set(world.mountains.map(m=>m.id)).size===world.mountains.length,'mountain IDs must be unique');
  assert(world.mountains.every(m=>inWorld(world,m.x,m.z,m.radius+.1)),'mountain footprints must stay inside the world outline');
  assert(world.mountains.every(m=>distanceToRiver(world,m.x,m.z)>m.radius+riverWidth/2+CLEARANCES.riverBank),'mountain footprints must not overlap the river or its banks');
  const defaultConnections=(cities.length===2?cities.slice(0,1):cities).map((city,i)=>({from:city.id,to:cities[(i+1)%cities.length].id}));
  if(cities.length===8){defaultConnections.push({from:cities[7].id,to:cities[2].id},{from:cities[6].id,to:cities[3].id});}
  const connections=input.connections??defaultConnections,colors=['coral','teal','gold','blue','coral','gold','teal','blue','gold','coral'];
  assert(Array.isArray(connections)&&connections.length>0,'at least one connection is required');
  for(let i=0;i<connections.length;i++){
    const connection=connections[i],from=cities.find(c=>c.id===String(connection.from)),to=cities.find(c=>c.id===String(connection.to));
    assert(from&&to&&from!==to,'connections must reference two different existing city IDs');
    const waypoints=(connection.points??connection.waypoints??[]).map(p=>point(p));
    assert(waypoints.every(finitePoint),'connection waypoints require finite x/z');
    const nodes=[point(from),...waypoints,point(to)].filter((p,j,list)=>j===0||distance(p,list[j-1])>EPS);
    const line={id:String(connection.id??`line-${i+1}`),from:from.id,to:to.id,color:connection.color??colors[i%colors.length],closed:false,
      ...sampledPolyline(roundedWaypoints(nodes),WORLD_DEFAULTS.railY),bridges:[],tunnels:[],cuts:[],stationIds:[]};
    assert(line.length>EPS,'connections must have nonzero length');
    assert(line.points.every(p=>inWorld(world,p.x,p.z,CLEARANCES.routeEdge))
      &&world.outline.every(([x,z])=>distanceToLine(line,x,z)>=CLEARANCES.routeEdge),
      'entire railway corridors must stay inside the world outline');
    line.bridges=intervalsFor(line,p=>distanceToRiver(world,p.x,p.z)-riverWidth/2-CLEARANCES.bridgeBank);
    for(const mountain of world.mountains){
      const cuts=intervalsFor(line,p=>distance(p,mountain)-mountain.radius-CLEARANCES.cuttingHalfWidth);
      line.cuts.push(...cuts.map(cut=>({...cut,mountainId:mountain.id}))); 
      // A portal is possible only when the entire masonry arch is backed by
      // rock. Centre-only cover fails for a railway grazing the mountain flank.
      const tunnels=intervalsFor(line,(p,s)=>{
        const tangent=sampleLine(line,s).tangent,nx=-tangent.z,nz=tangent.x;
        let deficit=CLEARANCES.tunnelRoofHeight-mountainHeight(mountain,p.x,p.z);
        for(let j=0;j<=24;j++){
          const a=j/24*Math.PI,lateral=Math.cos(a)*CLEARANCES.tunnelArchRadius;
          const archY=WORLD_DEFAULTS.railY+CLEARANCES.tunnelArchSpring+Math.sin(a)*CLEARANCES.tunnelArchRadius;
          // The inscribed circle is a lower bound on every face of the
          // rendered polygonal cone, even for very tall custom mountains.
          const innerRadius=mountain.radius*Math.cos(Math.PI/CLEARANCES.mountainFacets);
          const rockHeight=Math.max(0,1-Math.hypot(p.x+nx*lateral-mountain.x,p.z+nz*lateral-mountain.z)/innerRadius)*mountain.height;
          deficit=Math.max(deficit,archY+CLEARANCES.tunnelRockCover-rockHeight);
        }
        return deficit;
      });
      for(const tunnel of tunnels){
        const cut=cuts.find(c=>c.start<=tunnel.start+EPS&&c.end>=tunnel.end-EPS);
        line.tunnels.push({...tunnel,mountainId:mountain.id,cutStart:cut?.start??tunnel.start,cutEnd:cut?.end??tunnel.end,
          cutEntry:cut?.entry??tunnel.entry,cutExit:cut?.exit??tunnel.exit});
      }
    }
    line.tunnels.sort((a,b)=>a.start-b.start);
    line.cuts.sort((a,b)=>a.start-b.start);
    line.stops=[{cityId:from.id,distance:Math.min(CLEARANCES.stationEndDistance,line.length*.25)},
      {cityId:to.id,distance:line.length-Math.min(CLEARANCES.stationEndDistance,line.length*.25)}];
    world.lines.push(line);
  }
  assert(new Set(world.lines.map(l=>l.id)).size===world.lines.length,'line IDs must be unique');
  buildJunctions(world);
  placeStations(world);
  world.placements=[];
  placeScenery(world,random,clamp(Number(input.density??1)||0,0,3));
  return world;
}

/** Machine-readable geometric violations; an empty array is a clean plan. */
export function validateWorld(world) {
  const violations=[];
  const add=(type,id,detail)=>violations.push({type,id,detail});
  for(const line of world.lines){
    if(!Number.isFinite(line.length)||line.length<=0)add('route-length',line.id,'Route length must be positive');
    for(let i=1;i<line.points.length;i++){
      const a=line.points[i-1],b=line.points[i];
      if(!finitePoint(a)||!finitePoint(b)||!Number.isFinite(b.y))add('route-coordinate',line.id,'Non-finite route point');
      if(Math.abs(b.y-a.y)/(distance(a,b)||1)>CLEARANCES.maximumGrade+EPS)add('route-grade',line.id,'Grade exceeds 12 percent');
    }
    for(const type of ['bridges','tunnels','cuts'])for(const span of line[type]){
      if(span.start<0||span.end>line.length+EPS||span.end<=span.start)add('structure-interval',line.id,`Invalid ${type} interval`);
      if(type==='tunnels'){
        const mountain=world.mountains.find(m=>m.id===span.mountainId);
        for(const p of [span.entry,span.exit])if(mountainHeight(mountain,p.x,p.z)<CLEARANCES.tunnelRoofHeight-.01)add('tunnel-cover',line.id,'Portal lacks roof coverage');
      }
    }
  }
  for(const station of world.stations){
    for(const line of world.lines)if(rectangleToLine(station,line)<CLEARANCES.trackHalfWidth+.25-.001)add('station-track',station.id,`Platform overlaps ${line.id}`);
    if(rectangleToLine(station,world.river)<world.river.width/2+CLEARANCES.riverBank-.001)add('station-water',station.id,'Platform enters river bank');
  }
  for(let i=0;i<world.placements.length;i++){
    const item=world.placements[i],r=item.radius;
    if(!inWorld(world,item.x,item.z,r+CLEARANCES.worldEdge-.001))add('asset-edge',item.id,'Footprint crosses island edge');
    if(distanceToRoutes(world,item.x,item.z)<r+CLEARANCES.track-.001)add('asset-track',item.id,'Footprint enters railway clearance');
    if(distanceToRiver(world,item.x,item.z)<r+world.river.width/2+CLEARANCES.riverBank-.001)add('asset-water',item.id,'Footprint enters river bank');
    for(const mountain of world.mountains)if(distance(item,mountain)<r+mountain.radius+CLEARANCES.mountain-.001)add('asset-mountain',item.id,`Footprint intersects ${mountain.id}`);
    for(const station of world.stations)if(distance(item,station)<r+station.radius+CLEARANCES.objects-.001)add('asset-station',item.id,`Footprint intersects ${station.id}`);
    for(let j=0;j<i;j++)if(distance(item,world.placements[j])<r+world.placements[j].radius+CLEARANCES.objects-.001)add('asset-overlap',item.id,`Footprint intersects ${world.placements[j].id}`);
  }
  return violations;
}
