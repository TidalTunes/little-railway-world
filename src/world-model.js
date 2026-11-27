import { BoundsTree, SpatialGrid, pointBox, pointsBox, boxesOverlap, polylineTree } from './spatial-index.js';
import { createBiomes, biomeAt, biomeDistance, fitsBiome } from './biomes.js';
import { createAlignment, combineAlignments, straightSegment, sampleAlignment, sampleAlignmentPoints } from './alignments.js';
import { mountainSurfaceHeight, mountainFootprintDistance } from './mountain-shape.js';
import { normalizePlayers, cityDevelopment, cityRandom, CITY_ASSET_RADII } from './development.js';
import { placeFarmland } from './farmland.js';
import { createFarmVillages } from './farm-villages.js';
import {createPlayerBotStarts,playerBotReservations} from './player-bot-world.js';
import {farmFootprintsOverlap} from './farm-footprints.js';
import {sampleLandscape} from './landscape-field.js';
import {riversOf,riverBankDistance,riverCenterDistance,createHydrology} from './hydrology.js';
import {normalizeSurface,surfaceDistance,surfaceDisplacement,surfaceOffset,surfaceChartRadius,surfaceHeading,chartHeadingForSurface} from './world-surface.js';
import {surfaceQueryBoxes,surfaceQuerySegments} from './surface-query.js';
import {physicalLineMetric,chartDistanceAtPhysical,chartTurnRadius,createSurfaceAlignment} from './physical-route.js';
/**
 * Deterministic, renderer-independent railway world planner.
 *
 * Positions are geographic chart coordinates on spherical worlds, or physical
 * x/z coordinates on planar worlds. Footprints, streets and vehicle spacing
 * use physical surface units. Routes retain their exact chart line/arc data;
 * physical arc-length lookups connect that authoring data to the simulation.
 * Custom cities, rivers, mountains and connections can be supplied independently.
 * A connection's optional points are intermediate waypoints (its city endpoints
 * are always included). Ground is y=0, water y=-1.2 and track centre y=.42.
 * Scenery footprints include the outer silhouette, rather than just the trunk or
 * building wall, and are reserved before the renderer receives any assets.
 */
export const WORLD_DEFAULTS = Object.freeze({
  seed: 27, width: 130, depth: 95, cityRadius: 9.6, riverWidth: 5.4,
  groundY: 0, waterY: -1.2, railY: .42, sampleSpacing: .35, minTurnRadius: 8, throatLength: 4,
});
export const CLEARANCES = Object.freeze({
  trackHalfWidth: 1.05, routeEdge: 1.35, cuttingHalfWidth: 1.08, track: 1.45, riverBank: .8, mountain: .35,
  objects: .32, street: .28, worldEdge: .75, city: 1.25, stationOffset: 3,
  stationLength: 6.4, stationWidth: 2.4, stationEndDistance: 7,
  tunnelRoofHeight: 3.9, tunnelArchRadius: 1.4, tunnelArchSpring: 1.8, tunnelRockCover: .1, bridgeBank: 2.2, maximumGrade: .12,
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
const lineTrees=new WeakMap(),circleGrids=new WeakMap();
const physicalCircleGrids=new WeakMap();
function segmentItems(line){return line.points.slice(1).flatMap((b,index)=>{
  const a=line.points[index],period=line.period;
  // Generated local streets cross the longitude seam along the short surface
  // path. Split their index entries at the seam; authored rail lines retain
  // their explicit chart paths and never infer a different connection.
  if(period&&Math.abs(b.x-a.x)>period/2){
    const bx=b.x-Math.sign(b.x-a.x)*period,edge=Math.sign(a.x)*period/2,t=(edge-a.x)/(bx-a.x);
    const middle={x:edge,z:lerp(a.z,b.z,t)},opposite={...middle,x:-edge};
    return[{a,b:middle,index,box:pointsBox([a,middle])},{a:opposite,b,index,box:pointsBox([opposite,b])}];
  }
  return[{a,b,index,box:pointsBox([a,b])}];
});}
function lineTree(line){let cached=lineTrees.get(line);if(!cached||cached.count!==line.points.length){cached={count:line.points.length,tree:new BoundsTree(segmentItems(line),s=>s.box),box:pointsBox(line.points)};lineTrees.set(line,cached);}return cached;}
function routeTree(world){return polylineTree(world.lines);}
function nearCircles(items,item,extra=0){let cached=circleGrids.get(items);if(!cached||cached.count>items.length){cached={count:0,grid:new SpatialGrid()};circleGrids.set(items,cached);}while(cached.count<items.length){const p=items[cached.count++];cached.grid.insert(p,pointBox(p.x,p.z,p.radius??0));}return cached.grid.query(pointBox(item.x,item.z,item.radius+extra));}
const footprintRadius=(world,p,r=p.radius)=>surfaceChartRadius(world,p.x,p.z,r);
function nearbyPhysical(world,items,item,extra=0){
  if(!world.surface)return nearCircles(items,item,extra);
  let cached=physicalCircleGrids.get(items);
  if(!cached||cached.count>items.length){cached={count:0,grid:new SpatialGrid()};physicalCircleGrids.set(items,cached);}
  while(cached.count<items.length){const p=items[cached.count++];for(const box of surfaceQueryBoxes(world,p.x,p.z,footprintRadius(world,p,p.radius??0)))cached.grid.insert(p,box);}
  const boxes=surfaceQueryBoxes(world,item.x,item.z,footprintRadius(world,item,item.radius+extra));
  if(boxes.length===1)return cached.grid.query(boxes[0]);
  return [...new Set(boxes.flatMap(box=>cached.grid.query(box)))];
}
function physicalSegmentDistance(world,p,a,b){
  const aa=surfaceDisplacement(world,p,a),bb=surfaceDisplacement(world,p,b);
  return pointSegmentDistance(0,0,aa,bb);
}
/** Bounded exact local surface clearance. The chart tree remains a conservative
 * broad phase; its Euclidean nearest ordering is invalid on a globe. */
export function placementLineDistance(world,line,x,z,limit=Infinity){
  if(!world.surface)return Math.min(limit,distanceToLine(line,x,z));
  const p={x,z};
  // Any authored vertex supplies an upper bound, including for an unbounded
  // caller. Keep the tangent query local before handling periodic endpoints.
  if(!Number.isFinite(limit))for(const vertex of line.points)limit=Math.min(limit,surfaceDistance(world,p,vertex));
  if(!Number.isFinite(limit)||limit===0)return limit;
  const segments=surfaceQuerySegments(world,lineTree(line).tree,x,z,footprintRadius(world,p,limit));
  let best=limit;for(const {a,b} of segments)best=Math.min(best,physicalSegmentDistance(world,p,a,b));return best;
}
function placementRouteDistance(world,x,z,limit){
  if(!world.surface)return Math.min(limit,distanceToRoutes(world,x,z));
  const p={x,z},segments=surfaceQuerySegments(world,routeTree(world),x,z,footprintRadius(world,p,limit));
  let best=limit;for(const {a,b} of segments)best=Math.min(best,physicalSegmentDistance(world,p,a,b));return best;
}
export function distanceToLine(line,x,z){
  if(line.points.length>32)return lineTree(line).tree.nearest(x,z,s=>pointSegmentDistance(x,z,s.a,s.b));
  let d=Infinity;for(let i=1;i<line.points.length;i++)d=Math.min(d,pointSegmentDistance(x,z,line.points[i-1],line.points[i]));return d;
}
export function distanceToRoutes(world,x,z){return routeTree(world).nearest(x,z,s=>pointSegmentDistance(x,z,s.a,s.b));}
export function distanceToRiver(world, x, z) {
  return riverCenterDistance(world, x, z);
}

export function inWorld(world, x, z, margin = 0) {
  if(world.surface?.complete&&world.surface.projection.type==='equirectangular'){
    const p=world.surface.projection,latitude=p.centralLatitude*Math.PI/180-z/p.radius;
    return Number.isFinite(x)&&Number.isFinite(latitude)&&Math.abs(latitude)<=Math.PI/2+1e-10;
  }
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

/** Exact height of the shared triangulated mountain surface. */
export function mountainHeight(mountain, x, z) {
  return mountainSurfaceHeight(mountain,x,z);
}
export function surfaceHeight(world, x, z) {
  let height = WORLD_DEFAULTS.groundY;
  for (const mountain of world.mountains) height = Math.max(height, mountainHeight(mountain, x, z));
  return height;
}
export function worldSurface(world, x, z) {
  if (!inWorld(world, x, z)) return {type:'outside', height:-5};
  if (riverBankDistance(world, x, z) < 0) return {type:'water',height:world.river.y};
  if(world.biomes){
    const biome=biomeAt(world,x,z);
    if(biome==='ocean')return{type:'ocean',height:world.river.y};
    if(biome==='shore')return{type:'shore',height:world.river.y*(1-clamp(-biomeDistance(world,'ocean',x,z)/world.biomes.shoreWidth,0,1))};
  }
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
  if(line.alignment)return sampleAlignment(line.alignment,distanceAlong);
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
      const t=(lo+hi)/2,s=lerp(line.distances[i-1],line.distances[i],t);
      const p=line.alignment?sampleLine(line,s):{x:lerp(a.x,b.x,t),z:lerp(a.z,b.z,t)};
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
    assert(Array.isArray(input.cities)&&(input.cities.length>=2||input.gameplay&&input.cities.length===0),'at least two cities are required outside settlement mode');
    const cities=input.cities.map((city,i)=>({...city,id:String(city.id??`city-${i+1}`),...point(city,0),radius:city.radius??cityDevelopment(city.level??3).radius,stationIds:[]}));
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
      y:0,radius:Math.min(WORLD_DEFAULTS.cityRadius*scale,Math.min(bounds.width,bounds.depth)*1.05/count),stationIds:[]};
  });
  return anchors.map(([id,x,z])=>({id,x:x*bounds.width/130+(random()-.5)*2.6*scale,z:z*bounds.depth/95+(random()-.5)*2.6*scale,
    y:0,radius:WORLD_DEFAULTS.cityRadius*scale,stationIds:[]}));
}

function footprintCorners(item,world={}) {
  const width=item.platform?.width??item.width??0,length=item.platform?.length??item.length??0;
  const a=surfaceHeading(world,item.x,item.z,item.rotation??0),c=Math.cos(a),s=Math.sin(a);
  return [[-length/2,-width/2],[length/2,-width/2],[length/2,width/2],[-length/2,width/2]]
    .map(([x,z])=>surfaceOffset(world,item.x,item.z,x*c+z*s,-x*s+z*c));
}
function segmentCrosses(a,b,c,d) {
  const cross=(p,q,r)=>(q.x-p.x)*(r.z-p.z)-(q.z-p.z)*(r.x-p.x);
  return cross(a,b,c)*cross(a,b,d)<-EPS&&cross(c,d,a)*cross(c,d,b)<-EPS;
}
function distanceToRectangle(item,x,z,world={}) {
  const a=surfaceHeading(world,item.x,item.z,item.rotation??0),c=Math.cos(a),s=Math.sin(a),d=surfaceDisplacement(world,item,{x,z}),dx=d.x,dz=d.z;
  const xx=dx*c-dz*s,zz=dx*s+dz*c;
  return Math.hypot(Math.max(0,Math.abs(xx)-item.platform.length/2),Math.max(0,Math.abs(zz)-item.platform.width/2));
}
function rectangleToLine(item,line,world={}) {
  if(world.surface){
    const local={...item,x:0,z:0,rotation:surfaceHeading(world,item.x,item.z,item.rotation??0)};
    const corners=footprintCorners(local),radius=footprintRadius(world,item,item.radius+CLEARANCES.trackHalfWidth+.3);
    let closest=Infinity;
    for(const segment of surfaceQuerySegments(world,lineTree(line).tree,item.x,item.z,radius)){
      const a=surfaceDisplacement(world,item,segment.a),b=surfaceDisplacement(world,item,segment.b);
      closest=Math.min(closest,distanceToRectangle(local,a.x,a.z),distanceToRectangle(local,b.x,b.z));
      for(let i=0;i<4;i++){
        if(segmentCrosses(a,b,corners[i],corners[(i+1)%4]))return 0;
        closest=Math.min(closest,pointSegmentDistance(corners[i].x,corners[i].z,a,b));
      }
    }
    return closest;
  }
  const corners=footprintCorners(item);
  return lineTree(line).tree.nearest(item.x,item.z,segment=>{
    const {a,b}=segment;
    let closest=Math.min(distanceToRectangle(item,a.x,a.z),distanceToRectangle(item,b.x,b.z));
    for(let i=0;i<4;i++){
      if(segmentCrosses(a,b,corners[i],corners[(i+1)%4]))return 0;
      closest=Math.min(closest,pointSegmentDistance(corners[i].x,corners[i].z,a,b));
    }
    return closest;
  },Infinity,item.radius??Math.hypot(item.platform.length,item.platform.width)/2);
}

function placeStations(world) {
  const stations=[];
  // One substantial station per city keeps the skyline legible at a wide zoom.
  for(const city of world.cities){
    const options=[];
    for(const line of world.lines){
      if(line.from!==city.id&&line.to!==city.id)continue;
      const from=line.from===city.id;
      const metric=physicalLineMetric(world,line);
      const physicalLength=metric?.length??line.length;
      for(const endDistance of [0,7,8.5,10]){
        if(physicalLength<endDistance*2+1)continue;
        const d=chartDistanceAtPhysical(metric,from?endDistance:physicalLength-endDistance),p=sampleLine(line,d);
        for(const side of [-1,1]){
          const heading=surfaceHeading(world,p.x,p.z,p.angle),nx=-Math.cos(heading),nz=Math.sin(heading);
          const position=surfaceOffset(world,p.x,p.z,nx*CLEARANCES.stationOffset*side,nz*CLEARANCES.stationOffset*side);
          const facing=surfaceDisplacement(world,position,p);
          const station={id:`station-${city.id}`,kind:'station',cityId:city.id,ownerId:city.ownerId,lineId:line.id,distance:d,
            ...position,y:0,rotation:chartHeadingForSurface(world,position.x,position.z,Math.atan2(facing.x,facing.z)),side,
            radius:Math.hypot(CLEARANCES.stationLength/2,CLEARANCES.stationWidth/2),
            platform:{width:CLEARANCES.stationWidth,length:CLEARANCES.stationLength}};
          const reservation=footprintRadius(world,station,station.radius+CLEARANCES.worldEdge);
          if(!inWorld(world,station.x,station.z,reservation))continue;
          if(world.biomes&&!fitsBiome(world,['farmland','forest','plains','desert'],station.x,station.z,footprintRadius(world,station)))continue;
          if(world.mountains.some(m=>mountainFootprintDistance(m,station.x,station.z)<footprintRadius(world,station,station.radius+CLEARANCES.mountain)))continue;
          if(world.surface?riverBankDistance(world,station.x,station.z)<footprintRadius(world,station,station.radius+CLEARANCES.riverBank):riversOf(world).some(river=>rectangleToLine(station,river)<river.width/2+CLEARANCES.riverBank))continue;
          if(world.lines.some(other=>surfaceQueryBoxes(world,station.x,station.z,footprintRadius(world,station,station.radius+CLEARANCES.trackHalfWidth+.25)).some(box=>boxesOverlap(box,lineTree(other).box))&&rectangleToLine(station,other,world)<CLEARANCES.trackHalfWidth+.25))continue;
          if(stations.some(other=>surfaceDistance(world,station,other)<station.radius+other.radius+CLEARANCES.objects))continue;
          const score=surfaceDistance(world,station,city)+endDistance*.05;
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
  if(world.gameplay?.reservations?.some(p=>surfaceDistance(world,item,p)<r+p.radius))return false;
  if(!inWorld(world,item.x,item.z))return false;
  if(world.detailRegion&&!cityId){const b=world.detailRegion,edge=footprintRadius(world,item,r+CLEARANCES.objects/2);if(item.x-edge<b.minX||item.x+edge>b.maxX||item.z-edge<b.minZ||item.z+edge>b.maxZ)return false;}
  if(world.biomes&&!fitsBiome(world,['farmland','forest','plains','desert'],item.x,item.z,footprintRadius(world,item)))return false;
  if(!inWorld(world,item.x,item.z,footprintRadius(world,item,r+CLEARANCES.worldEdge)))return false;
  if(placementRouteDistance(world,item.x,item.z,r+CLEARANCES.track)<r+CLEARANCES.track)return false;
  if(riverBankDistance(world,item.x,item.z)<footprintRadius(world,item,r+CLEARANCES.riverBank))return false;
  if(nearCircles(world.mountains,{...item,radius:footprintRadius(world,item,r+CLEARANCES.mountain)}).some(m=>mountainFootprintDistance(m,item.x,item.z)<footprintRadius(world,item,r+CLEARANCES.mountain)))return false;
  if(keepOutsideCities&&nearbyPhysical(world,world.cities,item,CLEARANCES.city).some(c=>surfaceDistance(world,item,c)<c.radius+r+CLEARANCES.city))return false;
  if(cityId&&nearbyPhysical(world,world.cities,item,world.detailRegion?CLEARANCES.objects:0).some(c=>c.id!==cityId&&surfaceDistance(world,item,c)<c.radius+(world.detailRegion?r+CLEARANCES.objects:r*.5)))return false;
  if(nearbyPhysical(world,world.stations,item,CLEARANCES.objects).some(s=>surfaceDistance(world,item,s)<r+s.radius+CLEARANCES.objects))return false;
  if(nearbyPhysical(world,world.placements,item,CLEARANCES.objects).some(p=>surfaceDistance(world,item,p)<r+p.radius+CLEARANCES.objects
    &&(item.kind!=='farm'||p.kind!=='farm'||farmFootprintsOverlap(world,item,p,CLEARANCES.objects))))return false;
  if((world.cityStreets??[]).some(street=>placementLineDistance(world,street,item.x,item.z,r+street.width/2+CLEARANCES.street)<r+street.width/2+CLEARANCES.street))return false;
  return true;
}
/** Settlements grow along winding lanes, then fill their frontages compactly. */
function placeCityDevelopment(world,selectedCities=world.cities) {
  const dry=['farmland','forest','plains','desert'];
  const period=world.surface?.complete&&world.surface.projection.type==='equirectangular'?2*Math.PI*world.surface.projection.radius:undefined;
  const distance=(a,b)=>surfaceDistance(world,a,b);
  const distanceToLine=(line,x,z)=>placementLineDistance(world,line,x,z,8);
  for(const city of selectedCities){
    const spec=city.development,rng=cityRandom(world.seed,city.id),chartAxis=city.railAxis??{x:1,z:0};
    const heading=surfaceHeading(world,city.x,city.z,Math.atan2(chartAxis.x,chartAxis.z)),axis={x:Math.sin(heading),z:Math.cos(heading)};
    const normal={x:-axis.z,z:axis.x},width=spec.streetWidth,spacing=spec.streetSpacing;
    const local=(u,v,side)=>surfaceOffset(world,city.x,city.z,axis.x*u+normal.x*v*side,axis.z*u+normal.z*v*side);
    const streetPointIsClear=p=>{
      const r=width/2+.12;
      if(distance(p,city)>city.radius-r||!inWorld(world,p.x,p.z,footprintRadius(world,p,r+CLEARANCES.worldEdge)))return false;
      if(!fitsBiome(world,dry,p.x,p.z,footprintRadius(world,p,r))||placementRouteDistance(world,p.x,p.z,CLEARANCES.track+r)<CLEARANCES.track+r)return false;
      if(riverBankDistance(world,p.x,p.z)<footprintRadius(world,p,CLEARANCES.riverBank+r))return false;
      if(world.mountains.some(m=>mountainFootprintDistance(m,p.x,p.z)<footprintRadius(world,p,r+CLEARANCES.mountain)))return false;
      if(nearbyPhysical(world,world.cities,{...p,radius:r},world.detailRegion?CLEARANCES.objects:0).some(c=>c.id!==city.id&&distance(p,c)<c.radius+(world.detailRegion?r+CLEARANCES.objects:r*.5)))return false;
      if(nearbyPhysical(world,world.stations,{...p,radius:r}).some(s=>distanceToRectangle(s,p.x,p.z,world)<r))return false;
      return true;
    };
    const edgeIsClear=points=>{
      for(let k=1;k<points.length;k++){
        const a=points[k-1],b=points[k],n=Math.max(1,Math.ceil(distance(a,b)/.6));
        const travel=surfaceDisplacement(world,a,b);
        for(let i=0;i<=n;i++)if(!streetPointIsClear(surfaceOffset(world,a.x,a.z,travel.x*i/n,travel.z*i/n)))return false;
      }
      return true;
    };
    const station=world.stations.find(s=>s.cityId===city.id);
    const stationDelta=station?surfaceDisplacement(world,city,station):null;
    const stationSide=station?Math.sign(stationDelta.x*normal.x+stationDelta.z*normal.z):rng()<.5?1:-1;
    const planSide=side=>{
      // Nodes grow outwards from a station-back lane. Their spacing prevents
      // overbuilding roads; no lattice or right-angle pattern underlies them.
      const random=cityRandom(world.seed,`${city.id}:lanes:${side}`),nodes=[],edges=[];
      const originV=side===stationSide?5.1:3.7;
      const center=local((random()-.5)*city.radius*.12,Math.max(originV+.6,city.radius*.46),side);
      // Rivers and coastlines often occupy the station's immediate back lane.
      // Find the closest usable block within this same city before abandoning
      // its whole neighborhood; the source city and railway never move.
      const starts=[];
      for(let v=originV;v<city.radius-2;v+=3.2)for(let u=-city.radius*.7;u<=city.radius*.7;u+=2.5){
        const p=local(u,v,side);starts.push({p,score:u*u+(v-originV)**2});
      }
      starts.sort((a,b)=>a.score-b.score);
      for(const {p} of starts)if(streetPointIsClear(p)){nodes.push(p);break;}
      if(!nodes.length)return{side,edges,center};
      const bend=(a,b,amount)=>{
        const length=distance(a,b),travel=surfaceDisplacement(world,a,b),nx=-travel.z/length,nz=travel.x/length,n=Math.max(3,Math.ceil(length/1.1));
        return Array.from({length:n+1},(_,i)=>{
          if(i===0)return a;if(i===n)return b;
          const t=i/n,offset=Math.sin(Math.PI*t)*amount;
          return surfaceOffset(world,a.x,a.z,travel.x*t+nx*offset,travel.z*t+nz*offset);
        });
      };
      const joinsExisting=points=>edges.some(edge=>{
        const shared=[points[0],points.at(-1)].filter(p=>p===edge.points[0]||p===edge.points.at(-1));
        return points.some(p=>!shared.some(q=>distance(p,q)<2.1)&&distanceToLine(edge,p.x,p.z)<width+1.15);
      });
      // Street coverage follows available area, rather than the number of
      // homes: denser development fills blocks instead of paving more land.
      const target=Math.max(2,Math.ceil((city.radius/7.5)**2));
      for(let attempt=0;attempt<(city.radius<14?280:900)&&nodes.length<target;attempt++){
        const angle=random()*Math.PI*2,r=Math.sqrt(random()),u=Math.cos(angle)*city.radius*.77*r;
        const v=Math.max(originV+.6,city.radius*.46)+Math.sin(angle)*Math.max(2,city.radius*.34)*r;
        const p=local(u,v,side);
        if(distance(p,city)>city.radius-1.7)continue;
        const near=nodes.map(node=>({node,distance:distance(node,p)})).sort((a,b)=>a.distance-b.distance);
        if(near[0].distance<spacing*.72||near[0].distance>spacing*1.65||!streetPointIsClear(p))continue;
        const a=near[0].node;
        // Leave room at junctions for a block of buildings between branches.
        if(edges.some(edge=>{
          const other=edge.points[0]===a?edge.points[1]:edge.points.at(-1)===a?edge.points.at(-2):null;
          if(!other)return false;
          const u=surfaceDisplacement(world,a,other),v=surfaceDisplacement(world,a,p);
          return (u.x*v.x+u.z*v.z)/(distance(other,a)*distance(p,a))>.73;
        }))continue;
        const points=bend(a,p,(random()-.5)*Math.min(1.8,near[0].distance*.2));
        if(!edgeIsClear(points)||joinsExisting(points))continue;
        nodes.push(p);edges.push({points,width,...(period?{period}:{})});
      }
      // A few short links make higher-level neighborhoods walkable loops,
      // rather than expanding the settlement into a dense web of streets.
      if(city.level>=4){
        const pairs=[];
        for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
          const a=nodes[i],b=nodes[j],d=distance(a,b);
          if(d>spacing*1.5||edges.some(e=>e.points[0]===a&&e.points.at(-1)===b||e.points[0]===b&&e.points.at(-1)===a))continue;
          pairs.push({a,b,d});
        }
        pairs.sort((a,b)=>a.d-b.d);
        let links=0;
        for(const {a,b,d} of pairs){
          if(links>=Math.floor(city.level/3))break;
          const points=bend(a,b,(random()-.5)*Math.min(1.2,d*.14));
          if(edgeIsClear(points)&&!joinsExisting(points)){edges.push({points,width,...(period?{period}:{})});links++;}
        }
      }
      if(!edges.length){
        for(const direction of [-1,1]){
          const b=local(direction*2.8,originV+random()*.6,side),points=bend(nodes[0],b,.2*direction);
          if(edgeIsClear(points)){edges.push({points,width,...(period?{period}:{})});break;}
        }
      }
      return{side,edges,center};
    };
    const plans=[planSide(1),planSide(-1)];
    // Choose usable frontage, not road length: a long lane trapped between a
    // station and the city edge is less useful than a compact inhabited side.
    for(const plan of plans){
      const radius=CITY_ASSET_RADII.house*.9,offset=radius+width/2+CLEARANCES.street+.1;
      plan.capacity=0;
      for(const street of plan.edges)for(let i=1;i<street.points.length;i++){
        const a=street.points[i-1],b=street.points[i],len=distance(a,b);
        for(const side of [-1,1]){
          const travel=surfaceDisplacement(world,a,b);
          const item={...surfaceOffset(world,a.x,a.z,travel.x/2-travel.z/len*offset*side,travel.z/2+travel.x/len*offset*side),radius};
          if(distance(item,city)+radius<=city.radius&&canPlace(world,item,{cityId:city.id})
            &&plan.edges.every(edge=>distanceToLine(edge,item.x,item.z)>=radius+width/2+CLEARANCES.street))plan.capacity+=len;
        }
      }
    }
    plans.sort((a,b)=>b.capacity-a.capacity||(a.side===stationSide?-1:1));
    const plan=plans[0],streets=plan.edges.map((e,i)=>({id:`street-${city.id}-${i+1}`,cityId:city.id,ownerId:city.ownerId,...e}));
    world.cityStreets.push(...streets);
    spec.streetCount=streets.length;
    spec.connectionCount=world.lines.filter(l=>l.from===city.id||l.to===city.id).length;
    if(!streets.length)continue;
    const frontages=streets.flatMap(street=>street.points.slice(1).map((b,i)=>({a:street.points[i],b,length:distance(street.points[i],b)})));
    const priority=spec.features.filter(k=>k!=='house').reverse();
    const kindFor=i=>{
      // Give even a narrow coastal neighborhood a residential core before
      // using its scarce dry lots for large landmarks and civic buildings.
      if(i<3)return 'house';
      if(i<priority.length+3)return priority[i-3];
      const value=rng();
      if(city.level>=8&&value<.12)return 'tower';
      if(city.level>=4&&value<(city.level>=8?.38:.25))return 'apartment';
      return 'house';
    };
    let placed=0;
    const cityBuildings=[],lotPools=new Map();
    const poolFor=kind=>{
      if(lotPools.has(kind))return lotPools.get(kind);
      // Each potential lot checks static terrain/rail/street clearance once.
      // Repeated random searches spent most of their time rediscovering the
      // same blocked ground, and still missed usable gaps between houses.
      const random=cityRandom(world.seed,`${city.id}:lots:${kind}`),pool=[];
      for(const {a,b,length} of frontages){
        const travel=surfaceDisplacement(world,a,b),ux=travel.x/length,uz=travel.z/length,steps=Math.max(1,Math.ceil(length/.72));
        for(let i=0;i<steps;i++)for(const side of [-1,1])for(let row=0;row<(kind==='house'?2:1);row++){
          const t=(i+.18+random()*.64)/steps;
          const scale=kind==='house'?.86+random()*.1:.9+random()*.09,radius=CITY_ASSET_RADII[kind]*scale;
          const offset=radius+width/2+CLEARANCES.street+.06+random()*.12+row*(2.8+CLEARANCES.objects);
          const position=surfaceOffset(world,a.x,a.z,travel.x*t-uz*offset*side,travel.z*t+ux*offset*side);
          const streetCenter=surfaceOffset(world,a.x,a.z,travel.x*t,travel.z*t),facing=surfaceDisplacement(world,position,streetCenter);
          const item={kind,cityId:city.id,ownerId:city.ownerId,
            ...position,y:0,radius,scale,
            variant:Math.floor(random()*8),rotation:chartHeadingForSurface(world,position.x,position.z,Math.atan2(facing.x,facing.z))};
          if(distance(item,city)+radius>city.radius||!canPlace(world,item,{cityId:city.id}))continue;
          const neighbor=cityBuildings.length?Math.min(...cityBuildings.map(p=>distance(item,p)-radius-p.radius)):Infinity;
          pool.push({item,neighbor,score:distance(item,plan.center)*.3+row*.4});
        }
      }
      lotPools.set(kind,pool);return pool;
    };
    const tryPlaceBuilding=kind=>{
      const pool=poolFor(kind);let best=null,bestScore=Infinity;
      for(const lot of pool){
        if(lot.blocked)continue;
        const score=lot.score+(Number.isFinite(lot.neighbor)?lot.neighbor*1.8:0);
        if(score<bestScore){best=lot;bestScore=score;}
      }
      if(!best)return false;
      const item={...best.item,id:`city-${city.id}-building-${placed+1}`,biome:biomeAt(world,best.item.x,best.item.z)};
      world.placements.push(item);cityBuildings.push(item);placed++;
      // A new building changes only the neighbor gap; geographic tests and
      // candidate generation are never repeated as the neighborhood fills.
      for(const candidates of lotPools.values())for(const lot of candidates){
        if(lot.blocked)continue;
        const gap=distance(item,lot.item)-item.radius-lot.item.radius;
        if(gap<CLEARANCES.objects)lot.blocked=true;else lot.neighbor=Math.min(lot.neighbor,gap);
      }
      return true;
    };
    for(let lot=0;lot<spec.buildingBudget;lot++)tryPlaceBuilding(kindFor(lot));
    for(let missed=0;placed<spec.buildingBudget&&missed<3;)if(!tryPlaceBuilding('house'))missed++;else missed=0;
    spec.placedBuildings=placed;
    spec.placedFeatures=[...new Set(cityBuildings.map(p=>p.kind))];
  }
}

function placeScenery(world,random,density) {
  const add=item=>world.placements.push({id:world.detailRegion?`asset-${world.detailRegion.minX}-${world.detailRegion.minZ}-${world.placements.length+1}`:`asset-${world.placements.length+1}`,y:0,rotation:random()*Math.PI*2,biome:biomeAt(world,item.x,item.z),...item});
  const region=world.detailRegion;
  const scale=Math.sqrt((region?(region.maxX-region.minX)*(region.maxZ-region.minZ):world.bounds.width*world.bounds.depth)/(130*95));
  const unfrozen=item=>!world.surface?.complete||inWorld(world,item.x,item.z)&&biomeDistance(world,'ice',item.x,item.z)<-footprintRadius(world,item);
  world.farmland=placeFarmland(world,{density,canPlace:item=>unfrozen(item)&&canPlace(world,item,{keepOutsideCities:true}),add});
  if(density<=0)return;
  const bounds=region??{minX:-world.bounds.width*.47,maxX:world.bounds.width*.47,minZ:-world.bounds.depth*.47,maxZ:world.bounds.depth*.47};
  const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
  // Global jittered cells supply bounded candidates, never sixteen repeated
  // grove stamps. A shared physical noise field shapes canopy cores, glades,
  // species neighborhoods and dry-country districts across chunk boundaries.
  const candidates=(spacing,label,limit,sort=true)=>{
    spacing/=Math.sqrt(Math.min(2,density));
    const area=(bounds.maxX-bounds.minX)*(bounds.maxZ-bounds.minZ);
    spacing=Math.max(spacing,Math.sqrt(area/limit));
    const list=[];
    for(let iz=Math.floor(bounds.minZ/spacing);iz<=Math.floor(bounds.maxZ/spacing);iz++)for(let ix=Math.floor(bounds.minX/spacing);ix<=Math.floor(bounds.maxX/spacing);ix++){
      const rng=seededRandom(`${world.seed}:landscape:${label}:${ix}:${iz}`);
      const x=(ix+.08+rng()*.84)*spacing,z=(iz+.08+rng()*.84)*spacing;
      if(x<bounds.minX||x>=bounds.maxX||z<bounds.minZ||z>=bounds.maxZ||!inWorld(world,x,z))continue;
      list.push({x,z,rng,priority:rng()});
    }
    return sort?list.sort((a,b)=>a.priority-b.priority):list;
  };
  const allowed=(item,biomes,frozen=false)=>
    (frozen?biomeDistance(world,'ice',item.x,item.z)>=footprintRadius(world,item):unfrozen(item))
    &&fitsBiome(world,biomes,item.x,item.z,footprintRadius(world,item))
    &&canPlace(world,item,{keepOutsideCities:true});
  const treeTarget=Math.round(310*density*scale),ecology={};let trees=0;
  // Crowns are roughly two units across. The old 3.8-unit candidate spacing
  // could never close a canopy, while random budget truncation scattered the
  // surviving trees evenly. Fill the strongest ecological cores first from a
  // closer lattice: the same bounded budget now forms irregular woodland masses.
  const canopy=candidates(2.2,'canopy',12000,false).filter(p=>{
    p.biome=biomeAt(world,p.x,p.z);if(p.biome!=='forest'&&p.biome!=='plains')return false;
    p.ecology=sampleLandscape(world,p.x,p.z);if(p.ecology.ecoregion==='polar')return false;
    p.priority=p.biome==='forest'?1+p.ecology.patch*.75+p.ecology.detail*.25+p.priority*.025:p.priority;
    return true;
  }).sort((a,b)=>b.priority-a.priority);
  for(const p of canopy){
    if(trees>=treeTarget)break;
    const biome=p.biome,e=p.ecology,rng=p.rng;
    const core=smooth((e.patch-.35)/.34),grove=smooth((e.patch-.57)/.2);
    const coverage=biome==='forest'?core*(.55+e.detail*.45):.004+grove*.054;
    // Chart cells converge towards a pole; thinning preserves physical density.
    const metric=world.surface?.projection.type==='equirectangular'?Math.max(.06,Math.cos(e.latitude*Math.PI/180)):1;
    if(rng()>coverage*metric||e.ecoregion==='polar')continue;
    const mature=biome==='forest'?core:grove,size=.48+mature*.48+rng()*.25;
    let species=e.ecoregion==='tropical'?(biome==='plains'||e.moisture<.38?'acacia':'broadleaf'):
      e.ecoregion==='boreal'?(e.moisture>.65?'birch':'pine'):
      e.moisture<.36?'pine':e.moisture>.62?'birch':e.detail>.62?'gold':'broadleaf';
    if(rng()<.09)species=species==='pine'?'birch':'round';
    const item={kind:'tree',x:p.x,z:p.z,radius:.85*size,scale:size,variant:species,landscapeLayer:'canopy',
      rotation:chartHeadingForSurface(world,p.x,p.z,rng()*Math.PI*2)};
    if(allowed(item,['forest','plains'])){add(item);trees++;}
  }
  let patches=0,sheep=0,cacti=0;
  const patchTarget=Math.round(48*density*scale),sheepTarget=Math.round(14*density*scale),cactusTarget=Math.round(12*density*scale);
  for(const p of candidates(14,'understory',1800)){
    const biome=biomeAt(world,p.x,p.z);if(!['forest','plains','desert'].includes(biome))continue;
    const e=sampleLandscape(world,p.x,p.z,ecology),rng=p.rng;
    const frozen=world.surface?.complete&&biomeDistance(world,'ice',p.x,p.z)>0;
    let style=null,radius=2+rng()*2.4;
    if(frozen){if(rng()<.36)style='frost';}
    else if(biome==='desert'){
      if(e.patch<.55&&rng()<.7){style='dune';radius=4.1+rng()*2.8;}
      else if(e.patch>.61&&rng()<.67){style='outcrop';radius=2.8+rng()*2.3;}
      else if(e.moisture>.47&&rng()<.28)style='scrub';
    }else if(biome==='forest'){
      if(e.patch<.47&&rng()<.45){style='meadow';radius=2.8+rng()*2.1;}
      else if(e.detail>.72&&rng()<.18)style='outcrop';
    }else if(e.ecoregion==='polar'){
      if(rng()<.4)style=e.moisture>.52?'scrub':'frost';
    }else if(e.patch<.6&&rng()<.46){style=e.moisture<.34?'scrub':'meadow';radius=2.6+rng()*2.5;}
    else if(e.detail>.7&&rng()<.38)style='outcrop';
    if(style&&patches<patchTarget){
      const item={kind:'nature',x:p.x,z:p.z,radius,scale:1,style,variant:Math.floor(rng()*65536),
        rotation:chartHeadingForSurface(world,p.x,p.z,e.windAngle+(rng()-.5)*.28)};
      if(allowed(item,biome,frozen)){add(item);patches++;}
    }
    // Flocks graze together in selected glades. Sparse plant colonies stay in
    // dry districts; Old World deserts use scrub rather than American cacti.
    const herd=!frozen&&biome==='plains'&&e.ecoregion!=='polar'&&e.patch<.58&&e.moisture>.36&&rng()<.17;
    const american=!world.surface?.complete||(e.longitude>-125&&e.longitude<-60);
    const colony=!frozen&&biome==='desert'&&american&&e.patch>.5&&e.patch<.72&&rng()<.2;
    if(!herd&&!colony)continue;
    const count=2+Math.floor(rng()*4),heading=rng()*Math.PI*2;
    for(let i=0;i<count;i++){
      const kind=herd?'sheep':'cactus';if(herd?sheep>=sheepTarget:cacti>=cactusTarget)break;
      const angle=rng()*Math.PI*2,offset=2.4+rng()*4.8,pos=surfaceOffset(world,p.x,p.z,Math.cos(angle)*offset,Math.sin(angle)*offset);
      const size=herd?1:.72+rng()*.35,roamRadius=herd?.9+rng()*.5:0,item={kind,...pos,radius:herd?.7+roamRadius:.7*size,
        ...(herd?{roamRadius}:{}),scale:size,variant:Math.floor(rng()*3),
        rotation:chartHeadingForSurface(world,pos.x,pos.z,heading+(rng()-.5)*.65)};
      if(allowed(item,biome)){add(item);if(herd)sheep++;else cacti++;}
    }
  }
}

function configureRailAxes(world,connections,throatLength){
  for(const city of world.cities){
    const incident=connections.filter(c=>c.from===city.id||c.to===city.id).map(c=>{
      const from=c.from===city.id,other=world.cities.find(t=>t.id===(from?c.to:c.from));
      const target=c.waypoints.length?(from?c.waypoints[0]:c.waypoints.at(-1)):other;
      const d=distance(city,target)||1;
      return{connection:c,end:from?'start':'end',x:(target.x-city.x)/d,z:(target.z-city.z)/d};
    });
    let axis=incident.length?{x:incident[0].x,z:incident[0].z}:{x:1,z:0},opposition=Infinity;
    for(let i=0;i<incident.length;i++)for(let j=i+1;j<incident.length;j++){
      const a=incident[i],b=incident[j],dot=a.x*b.x+a.z*b.z;
      if(dot>=opposition)continue;opposition=dot;
      const dx=a.x-b.x,dz=a.z-b.z,len=Math.hypot(dx,dz);
      if(len>EPS)axis={x:dx/len,z:dz/len};
    }
    if(city.railHeading!==undefined){
      assert(Number.isFinite(city.railHeading),'city railHeading must be a finite angle in radians');
      axis={x:Math.cos(city.railHeading),z:Math.sin(city.railHeading)};
    }
    if(axis.x<0||(Math.abs(axis.x)<EPS&&axis.z<0))axis={x:-axis.x,z:-axis.z};
    city.railAxis=axis;
    const nearest=Math.min(...incident.map(item=>distance(city,world.cities.find(t=>t.id===(item.connection.from===city.id?item.connection.to:item.connection.from)))));
    const requested=city.throatLength??throatLength;
    assert(Number.isFinite(requested)&&requested>=0,'city throatLength must be finite and nonnegative');
    city.throatLength=Math.min(requested,nearest*.18);
    for(const item of incident){
      const side=item.x*axis.x+item.z*axis.z>=0?1:-1;
      item.connection[item.end==='start'?'fromPort':'toPort']={cityId:city.id,side,
        x:city.x+axis.x*side*city.throatLength,z:city.z+axis.z*side*city.throatLength,
        heading:Math.atan2(axis.z*side,axis.x*side)};
    }
  }
}
function outwardPose(line,end,s){
  const pose=sampleLine(line,end==='start'?s:line.length-s),sign=end==='start'?1:-1;
  return{...pose,tangent:{x:pose.tangent.x*sign,y:0,z:pose.tangent.z*sign},curvature:(pose.curvature??0)*sign};
}
function commonPrefix(a,b){
  const directed=item=>item.end==='start'?item.line.alignment.segments:item.line.alignment.segments.toReversed();
  const aa=directed(a),bb=directed(b);let ia=0,ib=0,usedA=0,usedB=0,total=0;
  while(ia<aa.length&&ib<bb.length){
    const pa=outwardPose(a.line,a.end,total+1e-6),pb=outwardPose(b.line,b.end,total+1e-6);
    if(distance(pa,pb)>1e-5||pa.tangent.x*pb.tangent.x+pa.tangent.z*pb.tangent.z<1-1e-8||Math.abs(pa.curvature-pb.curvature)>1e-8)break;
    const step=Math.min(aa[ia].length-usedA,bb[ib].length-usedB);
    if(step<EPS)break;total+=step;usedA+=step;usedB+=step;
    if(usedA>=aa[ia].length-EPS){ia++;usedA=0;}
    if(usedB>=bb[ib].length-EPS){ib++;usedB=0;}
  }
  return total;
}
function buildSharedNetwork(world){
  world.sharedSections=[];world.transitions=[];
  for(const line of world.lines){line.sharedSections=[];line.renderRanges=[{start:0,end:line.length}];}
  for(const city of world.cities){
    const incident=world.lines.flatMap(line=>line.from===city.id?[{line,end:'start',port:line.fromPort}]:line.to===city.id?[{line,end:'end',port:line.toPort}]:[]);
    for(const from of incident)for(const to of incident)if(from.line!==to.line&&from.port.side!==to.port.side)
      world.transitions.push({cityId:city.id,fromLineId:from.line.id,fromEnd:from.end,toLineId:to.line.id,toEnd:to.end});
    for(const side of [-1,1]){
      const members=incident.filter(item=>item.port.side===side);
      if(members.length<2)continue;
      const prefix=new Map();
      const key=(a,b)=>[a.line.id,b.line.id].sort().join('|');
      for(let i=0;i<members.length;i++)for(let j=i+1;j<members.length;j++)prefix.set(key(members[i],members[j]),commonPrefix(members[i],members[j]));
      const boundaries=[0,...new Set([...prefix.values()].filter(v=>v>EPS).map(v=>Math.round(v*1e7)/1e7))].sort((a,b)=>a-b);
      for(let k=1;k<boundaries.length;k++){
        const lo=boundaries[k-1],hi=boundaries[k],mid=(lo+hi)/2,remaining=[...members];
        while(remaining.length){
          const owner=remaining.shift(),group=[owner];
          for(let j=remaining.length-1;j>=0;j--)if((prefix.get(key(owner,remaining[j]))??0)>mid){group.push(remaining[j]);remaining.splice(j,1);}
          if(group.length<2)continue;
          group.sort((a,b)=>world.lines.indexOf(a.line)-world.lines.indexOf(b.line));
          const lead=group[0],id=`shared-${city.id}-${side}-${world.sharedSections.length+1}`;
          const points=Array.from({length:Math.max(2,Math.ceil((hi-lo)/.35)+1)},(_,i)=>{
            const p=outwardPose(lead.line,lead.end,lo+(hi-lo)*i/(Math.max(2,Math.ceil((hi-lo)/.35)+1)-1));return{x:p.x,y:p.y,z:p.z};
          });
          const section={id,cityId:city.id,side,ownerLineId:lead.line.id,length:hi-lo,points,lines:[]};
          for(const item of group){
            const start=item.end==='start'?lo:item.line.length-hi,end=item.end==='start'?hi:item.line.length-lo;
            const ref={id,cityId:city.id,side,start,end,ownerLineId:lead.line.id};item.line.sharedSections.push(ref);
            section.lines.push({lineId:item.line.id,start,end,forward:item.end==='start'});
            if(item!==lead)item.line.renderRanges=item.line.renderRanges.flatMap(r=>{
              if(end<=r.start+EPS||start>=r.end-EPS)return[r];
              return[{start:r.start,end:Math.max(r.start,start)},{start:Math.min(r.end,end),end:r.end}].filter(range=>range.end-range.start>EPS);
            });
          }
          world.sharedSections.push(section);
        }
      }
    }
  }
}
function sharedAt(world,first,second,d1,d2,margin=.5){
  return world.sharedSections.some(section=>{
    const a=section.lines.find(l=>l.lineId===first.id),b=section.lines.find(l=>l.lineId===second.id);
    return a&&b&&d1>=a.start-margin&&d1<=a.end+margin&&d2>=b.start-margin&&d2<=b.end+margin;
  });
}

/** Locate actual at-grade crossings for the train reservation controller. */
function buildJunctions(world) {
  const junctions=[];
  const cross=(ax,az,bx,bz)=>ax*bz-az*bx;
  const tree=routeTree(world),segments=tree.items;
  for(const u of segments)for(const v of tree.query({minX:u.minX-EPS,maxX:u.maxX+EPS,minZ:u.minZ-EPS,maxZ:u.maxZ+EPS})){
    if(v.lineIndex<=u.lineIndex)continue;
    const first=u.line,second=v.line;
      if(u.maxX<v.minX-EPS||v.maxX<u.minX-EPS||u.maxZ<v.minZ-EPS||v.maxZ<u.minZ-EPS)continue;
      if(sharedAt(world,first,second,(first.distances[u.index]+first.distances[u.index+1])/2,(second.distances[v.index]+second.distances[v.index+1])/2))continue;
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
  world.junctions=junctions;
}

/** Invalid topology or non-finite input throws; crowded optional scenery is skipped. */
export function generateWorld(input = {}, options = {}) {
  const seed=input.seed??WORLD_DEFAULTS.seed,random=seededRandom(seed);
  const bounds={width:Number(input.bounds?.width??WORLD_DEFAULTS.width),depth:Number(input.bounds?.depth??WORLD_DEFAULTS.depth)};
  assert(Number.isFinite(bounds.width)&&Number.isFinite(bounds.depth)&&bounds.width>=35&&bounds.depth>=30,'bounds must be finite and at least 35 × 30');
  const players=normalizePlayers(input.players);
  const cities=normalizeCities(input,bounds,random);
  const playerIds=new Set(players.map(p=>p.id));
  for(const [cityIndex,city] of cities.entries()){
    const rng=cityRandom(seed,city.id);
    city.level=city.level??(input.cities?1+Math.floor(rng()*10):3);
    const specification=cityDevelopment(city.level);
    city.ownerId=String(city.ownerId??players[Math.floor(cityRandom(seed,`${city.id}:owner`)()*players.length)].id);
    assert(playerIds.has(city.ownerId),`city ${city.id} references unknown owner ${city.ownerId}`);
    if(input.cities&&input.cities[cityIndex].radius==null)city.radius=specification.radius;
    city.development={...specification,radius:city.radius,variantSeed:`${seed}:city:${city.id}`,placedBuildings:0,streetCount:0,connectionCount:0};
  }
  const trainOwners={...(input.trainOwners??{})};
  assert(input.trainOwners===undefined||(input.trainOwners&&typeof input.trainOwners==='object'&&!Array.isArray(input.trainOwners)),'trainOwners must be an object keyed by train ID');
  assert(Object.values(trainOwners).every(id=>playerIds.has(id)),'trainOwners references an unknown player');
  const outline=input.outline?input.outline.map(p=>[Number(p[0]),Number(p[1])]):makeOutline(bounds.width,bounds.depth);
  assert(outline.length>=3&&outline.every(p=>p.every(Number.isFinite)),'outline requires at least three finite points');
  const world={version:2,seed,bounds,outline,geography:input.geography,camera:input.camera,surface:normalizeSurface(input.surface),players,trainOwners,traffic:structuredClone(input.traffic??{}),density:clamp(Number(input.density??1)||0,0,3),detailMode:options.detail??'full',cities,lines:[],stations:[],placements:[],cityStreets:[],junctions:[]};
  if(input.gameplay)world.gameplay=structuredClone(input.gameplay);
  assert(cities.every(c=>inWorld(world,c.x,c.z,.5)),'cities must be inside the world outline');
  const defaultRiver={points:[[-.64,.015],[-.42,-.025],[-.20,.035],[.02,.00],[.22,.075],[.43,.055],[.64,.015]]
    .map(([x,z])=>[x*bounds.width,z*bounds.depth])};
  const riverSpecs=input.rivers??[input.river??defaultRiver];
  assert(Array.isArray(riverSpecs),'rivers must be an array');
  const normalizedRivers=riverSpecs.map((spec,index)=>{
    const raw=spec.points.map(p=>point(p,WORLD_DEFAULTS.waterY));
    assert(raw.every(finitePoint),'river requires finite points');
    const points=raw.filter((p,i)=>i===0||distance(p,raw[i-1])>EPS);
    assert(points.length>=2,'river requires at least two distinct points');
    const width=Number(spec.width??WORLD_DEFAULTS.riverWidth);
    assert(Number.isFinite(width)&&width>0,'river width must be positive');
    const line=sampledPolyline(spec.smooth===false?points:roundedWaypoints(points,9),WORLD_DEFAULTS.waterY,spec.smooth===false?Infinity:1);
    assert(Number.isFinite(line.length)&&line.length>EPS,'river must have positive length');
    return{...line,id:spec.id??`river-${index+1}`,name:spec.name,width,y:WORLD_DEFAULTS.waterY};
  });
  // The single-river alias remains compatible with existing world files.
  world.river=normalizedRivers[0]??{points:[],distances:[],length:0,width:0,y:WORLD_DEFAULTS.waterY};
  if(input.rivers!==undefined)world.rivers=normalizedRivers;
  world.lakes=input.biomes?.geography?.lakes;world.lakeShore=input.biomes?.geography?.lakeShore;
  if(input.rivers!==undefined||world.lakes?.length)world.hydrology=createHydrology(world);
  const riverWidth=world.river.width;
  const scale=Math.min(bounds.width/130,bounds.depth/95);
  const northPair=[...cities].sort((a,b)=>a.z-b.z).slice(0,2);
  const mid={x:((northPair[0]?.x??0)+(northPair[1]?.x??0))/2,z:((northPair[0]?.z??0)+(northPair[1]?.z??0))/2};
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
  assert(world.mountains.every(m=>(m.range?m.range.polygon.every(([x,z])=>inWorld(world,x,z)):inWorld(world,m.x,m.z,m.radius+.1))),'mountain footprints must stay inside the world outline');
  assert(world.mountains.every(m=>m.range||riverBankDistance(world,m.x,m.z)>m.radius+CLEARANCES.riverBank),'mountain footprints must not overlap the river or its banks');
  if(input.biomes?.geography)world.biomes=createBiomes(world,input.biomes);
  const defaultConnections=(cities.length===2?cities.slice(0,1):cities).map((city,i)=>({from:city.id,to:cities[(i+1)%cities.length].id}));
  if(cities.length===8){defaultConnections.push({from:cities[7].id,to:cities[2].id},{from:cities[6].id,to:cities[3].id});}
  const rawConnections=input.connections??defaultConnections,colors=['coral','teal','gold','blue','coral','gold','teal','blue','gold','coral'];
  assert(Array.isArray(rawConnections)&&(rawConnections.length>0||world.gameplay&&cities.length===0),'at least one connection is required outside settlement mode');
  const connections=rawConnections.map((c,i)=>({...c,id:String(c.id??`line-${i+1}`),from:String(c.from),to:String(c.to),waypoints:(c.points??c.waypoints??[]).map(p=>({...point(p),...(Number.isFinite(p.heading)?{heading:p.heading}:{})}))}));
  assert(connections.every(c=>cities.some(t=>t.id===c.from)&&cities.some(t=>t.id===c.to)&&c.from!==c.to),'connections must reference two different existing city IDs');
  const edgeKeys=connections.map(c=>[c.from,c.to].sort().join('|'));
  assert(new Set(edgeKeys).size===edgeKeys.length,'overlapping duplicate city connections must be represented by one railway');
  const minTurnRadius=Number(input.minTurnRadius??WORLD_DEFAULTS.minTurnRadius),throatLength=Number(input.throatLength??WORLD_DEFAULTS.throatLength);
  assert(Number.isFinite(minTurnRadius)&&minTurnRadius>0,'minTurnRadius must be positive and finite');
  assert(Number.isFinite(throatLength)&&throatLength>=0,'throatLength must be finite and nonnegative');
  world.minTurnRadius=minTurnRadius;configureRailAxes(world,connections,throatLength);
  for(let i=0;i<connections.length;i++){
    const connection=connections[i],from=cities.find(c=>c.id===String(connection.from)),to=cities.find(c=>c.id===String(connection.to));
    assert(from&&to&&from!==to,'connections must reference two different existing city IDs');
    const waypoints=connection.waypoints;
    assert(waypoints.every(finitePoint),'connection waypoints require finite x/z');
    const start=connection.fromPort,end={...connection.toPort,heading:connection.toPort.heading+Math.PI};
    const turnRadius=chartTurnRadius(world,[start,...waypoints,end],minTurnRadius);
    let middle;
    try{middle=(world.surface?createSurfaceAlignment:createAlignment)(start,end,{radius:turnRadius,physicalRadius:minTurnRadius,world,waypoints,y:WORLD_DEFAULTS.railY,
      isAllowed:p=>inWorld(world,p.x,p.z,CLEARANCES.routeEdge)});}
    catch(error){throw new TypeError(`${error.message} (${connection.id})`,{cause:error});}
    const alignment=combineAlignments([straightSegment(from,start),middle,straightSegment(end,to)],turnRadius);
    const ownerId=String(connection.ownerId??from.ownerId);
    assert(playerIds.has(ownerId),`line ${connection.id} references unknown owner ${ownerId}`);
    const line={id:connection.id,from:from.id,to:to.id,ownerId,color:connection.color??colors[i%colors.length],closed:false,
      fromPort:connection.fromPort,toPort:connection.toPort,alignment,
      ...sampleAlignmentPoints(alignment,WORLD_DEFAULTS.sampleSpacing),bridges:[],tunnels:[],cuts:[],stationIds:[]};
    assert(line.length>EPS,'connections must have nonzero length');
    assert(line.points.every(p=>inWorld(world,p.x,p.z,CLEARANCES.routeEdge))
      &&world.outline.every(([x,z])=>distanceToLine(line,x,z)>=CLEARANCES.routeEdge),
      'entire railway corridors must stay inside the world outline');
    line.bridges=intervalsFor(line,p=>Math.min(riverBankDistance(world,p.x,p.z),
      input.biomes?.geography?-biomeDistance(world,'ocean',p.x,p.z):Infinity)-CLEARANCES.bridgeBank);
    for(const mountain of world.mountains){
      if(distanceToLine(line,mountain.x,mountain.z)>mountain.radius+footprintRadius(world,mountain,CLEARANCES.cuttingHalfWidth))continue;
      const cuts=intervalsFor(line,p=>mountainFootprintDistance(mountain,p.x,p.z)-footprintRadius(world,p,CLEARANCES.cuttingHalfWidth));
      line.cuts.push(...cuts.map(cut=>({...cut,mountainId:mountain.id}))); 
      // A portal is possible only when the entire masonry arch is backed by
      // rock. Centre-only cover fails for a railway grazing the mountain flank.
      const tunnels=intervalsFor(line,(p,s)=>{
        const tangent=sampleLine(line,s).tangent,nx=-tangent.z,nz=tangent.x;
        let deficit=CLEARANCES.tunnelRoofHeight-mountainHeight(mountain,p.x,p.z);
        for(let j=0;j<=24;j++){
          const a=j/24*Math.PI,lateral=Math.cos(a)*CLEARANCES.tunnelArchRadius;
          const archY=WORLD_DEFAULTS.railY+CLEARANCES.tunnelArchSpring+Math.sin(a)*CLEARANCES.tunnelArchRadius;
          const angle=surfaceHeading(world,p.x,p.z,Math.atan2(tangent.x,tangent.z));
          const edge=world.surface?surfaceOffset(world,p.x,p.z,-Math.cos(angle)*lateral,Math.sin(angle)*lateral):{x:p.x+nx*lateral,z:p.z+nz*lateral};
          const rockHeight=mountainHeight(mountain,edge.x,edge.z);
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
  buildSharedNetwork(world);
  buildJunctions(world);
  world.biomes??=createBiomes(world,input.biomes);
  if(world.gameplay)world.gameplay.reservations=(world.gameplay.reservations??[]).filter(item=>!item.id?.startsWith('bot:'));
  if(world.gameplay?.farmVillageCount){
    world.gameplay.reservations=(world.gameplay.reservations??[]).filter(item=>!item.id?.startsWith('farm-village:'));
    const villages=createFarmVillages(world,{count:world.gameplay.farmVillageCount});
    world.gameplay.farmVillages=villages;
    world.gameplay.reservations.push(...villages.reservations);
  }
  if(world.gameplay&&Object.hasOwn(world.gameplay,'playerBotCount')){
    world.gameplay.playerBots=createPlayerBotStarts(world,{count:world.gameplay.playerBotCount});
    world.gameplay.reservations.push(...playerBotReservations(world.gameplay.playerBots));
    delete world.gameplay.botScenery;
  }
  placeStations(world);
  world.placements=[];
  if(options.detail!=='network'){
    placeCityDevelopment(world);placeScenery(world,random,world.density);
    if(world.gameplay)world.placements.push(...structuredClone(world.gameplay.guaranteedTrees??[]));
  }
  return world;
}

/** Deterministic bounded detail. The coarse world is never mutated or cached here. */
export function generateWorldRegion(network,{x=0,z=0,size=192}={}){
  assert([x,z,size].every(Number.isFinite)&&size>0,'region requires finite coordinates and positive size');
  const cellX=Math.floor(x/size),cellZ=Math.floor(z/size),key=`${size}:${cellX}:${cellZ}`;
  const bounds={minX:cellX*size,minZ:cellZ*size,maxX:(cellX+1)*size,maxZ:(cellZ+1)*size};
  const owns=p=>p.x>=bounds.minX&&p.x<bounds.maxX&&p.z>=bounds.minZ&&p.z<bounds.maxZ;
  const cities=network.cities.map(c=>({...c,stationIds:[...c.stationIds],development:{...c.development,placedBuildings:0,streetCount:0,placedFeatures:[]}}));
  const owned=cities.filter(owns),working={...network,cities,placements:[],cityStreets:[],detailRegion:bounds};
  placeCityDevelopment(working,owned);
  placeScenery(working,seededRandom(`${network.seed}:region:${key}`),network.density??1);
  if(network.gameplay)working.placements.push(...structuredClone((network.gameplay.guaranteedTrees??[]).filter(owns)));
  const mountains=network.mountains.filter(m=>m.range?boxesOverlap(bounds,m.range.bounds):owns(m))
    .map(m=>m.range?{...m,renderBounds:bounds}:m),stations=network.stations.filter(owns);
  const lines=network.lines.filter(line=>boxesOverlap(bounds,lineTree(line).box));
  const villageFarms=working.placements.filter(item=>item.kind==='farm'&&item.id?.startsWith('farm-village:'));
  const margin=Math.max(mountains.some(m=>m.range)?1.2:0,...owned.map(c=>footprintRadius(network,c)),...mountains.filter(m=>!m.range).map(m=>m.radius),...stations.map(s=>footprintRadius(network,s)),...villageFarms.map(farm=>farm.radius));
  return{key,bounds,cullBounds:{minX:bounds.minX-margin,minZ:bounds.minZ-margin,maxX:bounds.maxX+margin,maxZ:bounds.maxZ+margin},
    cities:owned,placements:working.placements,cityStreets:working.cityStreets,stations,lines,mountains,farmland:working.farmland};
}

/** Machine-readable geometric violations; an empty array is a clean plan. */
export function validateWorld(world) {
  const violations=[];
  const distance=(a,b)=>surfaceDistance(world,a,b);
  const add=(type,id,detail)=>violations.push({type,id,detail});
  try{normalizeSurface(world.surface);}catch(error){add('surface','world',error.message);return violations;}
  const playerIds=new Set((world.players??[]).map(p=>p.id));
  try{normalizePlayers(world.players??[]);}catch(error){add('players','world',error.message);}
  for(const city of world.cities){
    if(!playerIds.has(city.ownerId))add('city-owner',city.id,'City references an unknown player');
    if(!Number.isInteger(city.level)||city.level<1||city.level>10)add('city-level',city.id,'City level must be an integer from 1 through 10');
  }
  for(const [id,ownerId] of Object.entries(world.trainOwners??{}))if(!playerIds.has(ownerId))add('train-owner',id,'Train references an unknown player');
  for(const line of world.lines)if(!playerIds.has(line.ownerId))add('line-owner',line.id,'Railway references an unknown player');
  const dry=['farmland','forest','plains','desert'];
  for(const street of world.cityStreets??[]){
    const city=world.cities.find(c=>c.id===street.cityId);
    if(!city||street.ownerId!==city.ownerId)add('street-owner',street.id,'Street must belong to its existing city owner');
    if(!Number.isFinite(street.width)||street.width<=0||street.points.length<2||!street.points.every(finitePoint)){
      add('street-geometry',street.id,'Street requires a positive width and finite points');continue;
    }
    for(let i=1;i<street.points.length;i++){
      const a=street.points[i-1],b=street.points[i],steps=Math.max(1,Math.ceil(distance(a,b)/.5)),r=street.width/2;
      const travel=surfaceDisplacement(world,a,b);
      for(let j=0;j<=steps;j++){
        const p=surfaceOffset(world,a.x,a.z,travel.x*j/steps,travel.z*j/steps);
        if(!inWorld(world,p.x,p.z,footprintRadius(world,p,r+CLEARANCES.worldEdge)-.001)||city&&distance(p,city)>city.radius-r+.001)add('street-edge',street.id,'Street leaves its dry city footprint');
        if(world.biomes&&!fitsBiome(world,dry,p.x,p.z,footprintRadius(world,p,r)-.001))add('street-biome',street.id,'Street enters ocean, shore, or mountain');
        if(placementRouteDistance(world,p.x,p.z,r+CLEARANCES.track)<r+CLEARANCES.track-.001)add('street-track',street.id,'Street enters railway clearance');
        if(riverBankDistance(world,p.x,p.z)<footprintRadius(world,p,r+CLEARANCES.riverBank)-.001)add('street-water',street.id,'Street enters river bank');
        if(world.mountains.some(m=>mountainFootprintDistance(m,p.x,p.z)<footprintRadius(world,p,r+CLEARANCES.mountain)-.001))add('street-mountain',street.id,'Street crosses a mountain');
        if(world.stations.some(station=>distanceToRectangle(station,p.x,p.z,world)<r-.001))add('street-station',street.id,'Street overlaps a station');
      }
    }
  }
  for(const city of world.cities){
    const streets=(world.cityStreets??[]).filter(s=>s.cityId===city.id);
    if(!streets.length)continue;
    const key=p=>`${p.x.toFixed(5)},${p.z.toFixed(5)}`,graph=new Map();
    for(const street of streets)for(let i=1;i<street.points.length;i++){
      const a=key(street.points[i-1]),b=key(street.points[i]);
      if(!graph.has(a))graph.set(a,new Set());if(!graph.has(b))graph.set(b,new Set());
      graph.get(a).add(b);graph.get(b).add(a);
    }
    const visited=new Set(),queue=[graph.keys().next().value];
    while(queue.length){const id=queue.pop();if(visited.has(id))continue;visited.add(id);queue.push(...graph.get(id));}
    if(visited.size!==graph.size)add('street-connectivity',city.id,'City street graph is disconnected');
  }
  for(const line of world.lines){
    if(!Number.isFinite(line.length)||line.length<=0)add('route-length',line.id,'Route length must be positive');
    if(line.alignment)for(const segment of line.alignment.segments)if(segment.type==='arc'&&segment.radius<(world.minTurnRadius??WORLD_DEFAULTS.minTurnRadius)-1e-6)add('route-curvature',line.id,'Railway bend is tighter than its minimum turning radius');
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
    if(station.ownerId!==world.cities.find(c=>c.id===station.cityId)?.ownerId)add('station-owner',station.id,'Station must belong to its city owner');
    for(const line of world.lines)if(surfaceQueryBoxes(world,station.x,station.z,footprintRadius(world,station,station.radius+CLEARANCES.trackHalfWidth+.25)).some(box=>boxesOverlap(box,lineTree(line).box))&&rectangleToLine(station,line,world)<CLEARANCES.trackHalfWidth+.25-.001)add('station-track',station.id,`Platform overlaps ${line.id}`);
    if(world.surface?riverBankDistance(world,station.x,station.z)<footprintRadius(world,station,station.radius+CLEARANCES.riverBank)-.001:riversOf(world).some(river=>rectangleToLine(station,river)<river.width/2+CLEARANCES.riverBank-.001))add('station-water',station.id,'Platform enters river bank');
  }
  for(let i=0;i<world.placements.length;i++){
    const item=world.placements[i],r=item.radius;
    if(item.cityId&&item.ownerId!==world.cities.find(c=>c.id===item.cityId)?.ownerId)add('asset-owner',item.id,'City asset must belong to its city owner');
    for(const street of world.cityStreets??[])if(placementLineDistance(world,street,item.x,item.z,r+street.width/2+CLEARANCES.street)<r+street.width/2+CLEARANCES.street-.001)add('asset-street',item.id,'Footprint enters a city street');
    if(world.biomes&&!fitsBiome(world,['farmland','forest','plains','desert'],item.x,item.z,footprintRadius(world,item)-.001))add('asset-biome',item.id,'Footprint enters ocean, shore, or mountain');
    if(!inWorld(world,item.x,item.z,footprintRadius(world,item,r+CLEARANCES.worldEdge)-.001))add('asset-edge',item.id,'Footprint crosses island edge');
    if(placementRouteDistance(world,item.x,item.z,r+CLEARANCES.track)<r+CLEARANCES.track-.001)add('asset-track',item.id,'Footprint enters railway clearance');
    if(riverBankDistance(world,item.x,item.z)<footprintRadius(world,item,r+CLEARANCES.riverBank)-.001)add('asset-water',item.id,'Footprint enters river bank');
    for(const mountain of world.mountains)if(mountainFootprintDistance(mountain,item.x,item.z)<footprintRadius(world,item,r+CLEARANCES.mountain)-.001)add('asset-mountain',item.id,`Footprint intersects ${mountain.id}`);
    for(const station of world.stations)if(distance(item,station)<r+station.radius+CLEARANCES.objects-.001)add('asset-station',item.id,`Footprint intersects ${station.id}`);
    for(let j=0;j<i;j++)if(distance(item,world.placements[j])<r+world.placements[j].radius+CLEARANCES.objects-.001
      &&(item.kind!=='farm'||world.placements[j].kind!=='farm'||farmFootprintsOverlap(world,item,world.placements[j],CLEARANCES.objects-.001)))
      add('asset-overlap',item.id,`Footprint intersects ${world.placements[j].id}`);
  }
  return violations;
}
