import {isHarvestableWood,streamedWoodSourceId} from './harvestable-wood.js';
import {alignmentCandidates,combineAlignments,createAlignment,inspectAlignment,sampleAlignment,sampleAlignmentPoints,straightSegment} from './alignments.js';
import {worldSurface,generateWorldRegion,mountainHeight,CLEARANCES} from './world-model.js';
import {mountainFootprintDistance} from './mountain-shape.js';
import {riverBankDistance} from './hydrology.js';
import {settlementTreeId} from './settlement-game.js';
import {planSettlementPath} from './settlement-paths.js';
import {BoundsTree,pointBox} from './spatial-index.js';
import {LOOP_ECONOMY_RULES,loopTrackCost} from './loop-economy-rules.js';
import {surfaceFor,surfacePoint,surfaceTangent,surfaceDistance,surfaceDisplacement,surfaceOffset,surfaceHeading,chartHeadingForSurface,surfaceChartRadius} from './world-surface.js';
import {localPhysicalAlignment} from './physical-route.js';
import {Vector3} from 'three';

export const SETTLEMENT_RAILWAY=Object.freeze({cost:5,minRadius:8,halfWidth:1.12,
  railY:.42,spineLength:14,stationOffset:3,stationWidth:6.4,stationDepth:2.4,
  sampleSpacing:.4,stationOptions:7,maxConnectionDistance:140});
const TAU=Math.PI*2,dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z),copy=v=>structuredClone(v);
const finite=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z);
const railTerrain=new Set(['water','ocean','shore','ground','mountain']);
const keyFor=(a,b)=>[a,b].sort().join('|');
const PROTECTED=new Set(['house','station','civic','landmark','apartment','tower']);
const RECTANGLES=new Set(['house','farm','station','civic']);
const angleDelta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
const mod=a=>((a%TAU)+TAU)%TAU;
function projectSegment(segment,point){
  if(segment.chartTransform){const t=segment.chartTransform,dx=point.x-t.x,dz=point.z-t.z,det=t.xx*t.zz-t.xz*t.zx;
    point={x:(t.zz*dx-t.xz*dz)/det,z:(t.xx*dz-t.zx*dx)/det};}
  let local;
  if(segment.type==='line'){
    const dx=segment.end.x-segment.start.x,dz=segment.end.z-segment.start.z;
    local=Math.max(0,Math.min(segment.length,((point.x-segment.start.x)*dx+(point.z-segment.start.z)*dz)/segment.length));
  }else{
    const angle=Math.atan2(point.z-segment.center.z,point.x-segment.center.x),sweep=mod((angle-segment.startAngle)*Math.sign(segment.sweep));
    local=sweep<=Math.abs(segment.sweep)?sweep*segment.radius:dist(point,segment.start)<=dist(point,segment.end)?0:segment.length;
  }
  // Canonical arc distance makes a returned point stable when replayed as the
  // next drag anchor, including after worker serialization.
  return Math.max(segment.startDistance,Math.min(segment.endDistance,Math.round((segment.startDistance+local)*1e9)/1e9));
}
const rawSegmentBox=segment=>segment.type==='arc'?{minX:segment.center.x-segment.radius,maxX:segment.center.x+segment.radius,
  minZ:segment.center.z-segment.radius,maxZ:segment.center.z+segment.radius}:{minX:Math.min(segment.start.x,segment.end.x),maxX:Math.max(segment.start.x,segment.end.x),
  minZ:Math.min(segment.start.z,segment.end.z),maxZ:Math.max(segment.start.z,segment.end.z)};
function segmentBox(segment){
  const box=rawSegmentBox(segment),t=segment.chartTransform;if(!t)return box;
  const points=[[box.minX,box.minZ],[box.minX,box.maxZ],[box.maxX,box.minZ],[box.maxX,box.maxZ]].map(([x,z])=>({x:t.x+t.xx*x+t.xz*z,z:t.z+t.zx*x+t.zz*z}));
  return{minX:Math.min(...points.map(p=>p.x)),maxX:Math.max(...points.map(p=>p.x)),minZ:Math.min(...points.map(p=>p.z)),maxZ:Math.max(...points.map(p=>p.z))};
}
const placementId=item=>isHarvestableWood(item)?settlementTreeId(item):item.id??`${item.kind}:${item.x}:${item.z}`;
const routeOptions=options=>({waypoints:(options?.waypoints===undefined?[]:Array.isArray(options.waypoints)?options.waypoints:[null]).map(p=>({x:p?.x,z:p?.z})),
  attachments:Object.fromEntries(['from','to'].filter(key=>options?.attachments?.[key]!==undefined).map(key=>{const a=options.attachments[key];return [key,{x:a?.x,z:a?.z,...(a?.kind?{kind:a.kind}:{}),...(a?.stationId?{stationId:a.stationId,side:a.side}:{}),...(a?.lineId?{lineId:a.lineId,distance:a.distance,direction:a.direction??1}:{})}];})),
  ...(options?.controlCount!==undefined?{controlCount:options.controlCount}:{}),
  ...(options?.ownerId!==undefined?{ownerId:options.ownerId}:{})});
const validControlCount=count=>Number.isInteger(count)&&count>=1&&count<=12;
export const railwayControlCount=(from,to,world=null)=>Math.max(1,Math.min(12,Math.ceil(surfaceDistance(world,from,to)/LOOP_ECONOMY_RULES.trackUnitLength)-1));
const waypointCount=(from,to,controlCount)=>validControlCount(controlCount)?controlCount:railwayControlCount(from,to);
function routeHandles(from,to,alignment,{waypoints=[],attachments={},controlCount}={},start,end){
  const count=waypointCount(from,to,controlCount),point=(p,kind,index)=>{
    const requested=kind==='from'||kind==='to'?attachments[kind]:null;
    const attachment=p.attachment??(requested?.stationId||requested?.lineId?requested:null);
    return {x:p.x,z:p.z,id:kind==='bend'?`bend:${index}`:kind,kind,role:kind==='bend'?'waypoint':kind,...(kind==='bend'?{index}:{}),...(Number.isFinite(p.distance)?{distance:p.distance}:{}),...(attachment?{attachment:copy(attachment)}:{})};
  };
  const first=start??(alignment?sampleAlignment(alignment,0):attachments.from??from),last=end??(alignment?sampleAlignment(alignment,alignment.length):attachments.to??to);
  const interiors=Array.from({length:count},(_,i)=>waypoints[i]??(alignment?sampleAlignment(alignment,alignment.length*(i+1)/(count+1)):
    {x:first.x+(last.x-first.x)*(i+1)/(count+1),z:first.z+(last.z-first.z)*(i+1)/(count+1)}));
  return [point(first,'from'),...interiors.map((p,i)=>point(p,'bend',i)),point(last,'to')];
}
function crossingPoint(points){
  const cross=(a,b,c)=>(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);
  for(let i=1;i<points.length;i++)for(let j=i+3;j<points.length;j++){
    const a=points[i-1],b=points[i],c=points[j-1],d=points[j];
    if(cross(a,b,c)*cross(a,b,d)<-1e-8&&cross(c,d,a)*cross(c,d,b)<-1e-8){
      const t=cross(c,d,a)/(cross(c,d,a)-cross(c,d,b));return{x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t,firstIndex:i,secondIndex:j};
    }
  }return null;
}
function selfIntersects(alignment){
  const count=Math.max(2,Math.ceil(alignment.length/1.5)),points=Array.from({length:count+1},(_,i)=>sampleAlignment(alignment,alignment.length*i/count));
  return !!crossingPoint(points);
}
function intervalsFor(line,signedDistance){
  const result=[];let start=signedDistance(line.points[0],0)<=0?0:null;
  for(let i=1;i<line.points.length;i++){
    const previous=line.distances[i-1],current=line.distances[i],inside=signedDistance(line.points[i-1],previous)<=0,next=signedDistance(line.points[i],current)<=0;
    if(inside===next)continue;
    let low=previous,high=current;
    for(let j=0;j<16;j++){const distance=(low+high)/2;if((signedDistance(sampleAlignment(line.alignment,distance),distance)<=0)===inside)low=distance;else high=distance;}
    const crossing=(low+high)/2;
    if(!inside)start=crossing;else{if(crossing-(start??0)>.01)result.push({start:start??0,end:crossing});start=null;}
  }
  if(start!==null&&line.length-start>.01)result.push({start,end:line.length});
  return result.map(span=>({...span,entry:sampleAlignment(line.alignment,span.start),exit:sampleAlignment(line.alignment,span.end)}));
}
function pointDistance(item,point,world){
  const {x:dx,z:dz}=surfaceDisplacement(world,item,point);
  if(RECTANGLES.has(item.kind)){
    const rotation=item.rotationSpace==='surface'?item.rotation??0:surfaceHeading(world,item.x,item.z,item.rotation??0),c=Math.cos(rotation),s=Math.sin(rotation),scale=item.scale??1;
    const x=dx*c-dz*s,z=dx*s+dz*c,w=(item.width??2.2)*scale/2,d=(item.depth??2.2)*scale/2;
    return Math.hypot(Math.max(0,Math.abs(x)-w),Math.max(0,Math.abs(z)-d));
  }
  return Math.hypot(dx,dz)-(item.radius??(item.kind==='tree'?.85:.7)*(item.scale??1));
}
function spatial(items,world){
  const size=8,buckets=new Map(),position=new Vector3();
  for(const item of items){const radius=(item.radius??Math.hypot(item.width??2.2,item.depth??2.2)/2)*(item.scale??1);
    surfacePoint(world,item.x,0,item.z,position);
    for(let x=Math.floor((position.x-radius)/size);x<=Math.floor((position.x+radius)/size);x++)for(let y=Math.floor((position.y-radius)/size);y<=Math.floor((position.y+radius)/size);y++)for(let z=Math.floor((position.z-radius)/size);z<=Math.floor((position.z+radius)/size);z++){
      const key=`${x}:${y}:${z}`;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(item);
    }}
  return(point,radius,ignore)=>{surfacePoint(world,point.x,0,point.z,position);const seen=new Set();
    for(let x=Math.floor((position.x-radius)/size);x<=Math.floor((position.x+radius)/size);x++)for(let y=Math.floor((position.y-radius)/size);y<=Math.floor((position.y+radius)/size);y++)for(let z=Math.floor((position.z-radius)/size);z<=Math.floor((position.z+radius)/size);z++){
      for(const item of buckets.get(`${x}:${y}:${z}`)??[]){if(seen.has(item))continue;seen.add(item);if(pointDistance(item,point,world)<radius&&!ignore?.(item))return true;}}
    return false;};
}
function boxSamples(item,visit,world){
  const rotation=item.rotationSpace==='surface'?item.rotation:surfaceHeading(world,item.x,item.z,item.rotation),c=Math.cos(rotation),s=Math.sin(rotation),nx=Math.ceil(item.width/.7),nz=Math.ceil(item.depth/.7);
  for(let ix=0;ix<=nx;ix++)for(let iz=0;iz<=nz;iz++){
    const x=item.width*(ix/nx-.5),z=item.depth*(iz/nz-.5);
    if(!visit(surfaceOffset(world,item.x,item.z,x*c+z*s,-x*s+z*c)))return false;
  }return true;
}
function acceptable(alignment,allowed){
  if(alignment.segments.some(s=>s.type==='arc'&&Math.abs(s.sweep)>Math.PI+1e-6))return false;
  const count=Math.ceil(alignment.length/SETTLEMENT_RAILWAY.sampleSpacing);
  for(let i=0;i<=count;i++){const sample=sampleAlignment(alignment,alignment.length*i/count);if(!allowed(sample))return false;}
  return true;
}
function direct(start,end,allowed){
  return alignmentCandidates(start,end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY})
    .find(route=>route.length<dist(start,end)*1.65+18&&acceptable(route,allowed))??null;
}
/** Local authoritative infrastructure. Cities/accounts remain owned by their
 * games, while stations and corridors are one shared, persistent rail graph. */
export function createSettlementRailways(world,{session,getPlacements=()=>[],surfaceAt=(x,z)=>worldSurface(world,x,z),onBuild,initialState,sceneryCatalog}={}){
  if(!session?.player)throw new TypeError('Railways require a settlement session');
  const metricDistance=(a,b)=>surfaceDistance(world,a,b),offset=(p,x,z)=>surfaceOffset(world,p.x,p.z,x,z),delta=(a,b)=>surfaceDisplacement(world,a,b);
  const footprintDistance=(item,p)=>pointDistance(item,p,world),footprintSamples=(item,visit)=>boxSamples(item,visit,world),spatialIndex=items=>spatial(items,world);
  function curvedRoute(start,end,options){
    if(!surfaceFor(world))return createAlignment(start,end,options);
    let radius=options.radius;
    const a=new Vector3(),b=new Vector3(),ta=new Vector3(),tb=new Vector3(),cross=new Vector3();
    // The local affine solve retains exact anchors. Its arcs can reach a
    // different latitude from those anchors, so verify their actual surface
    // curvature before accepting them; at most two wider re-solves are needed.
    for(let attempt=0;attempt<3;attempt++){
      const route=localPhysicalAlignment(world,start,end,{...options,physicalRadius:radius});let minimum=Infinity;
      for(const segment of route.segments)if(segment.type==='arc'){
        const count=Math.max(2,Math.ceil(segment.length/.4));
        for(let i=0;i<=count;i++){
          const s=segment.startDistance+segment.length*i/count,lo=Math.max(segment.startDistance,s-.01),hi=Math.min(segment.endDistance,s+.01);
          if(hi-lo<1e-6)continue;
          const p=sampleAlignment(route,lo),q=sampleAlignment(route,hi);
          surfacePoint(world,p.x,p.y,p.z,a);surfacePoint(world,q.x,q.y,q.z,b);
          surfaceTangent(world,p.x,p.y,p.z,p.tangent.x,0,p.tangent.z,ta).normalize();surfaceTangent(world,q.x,q.y,q.z,q.tangent.x,0,q.tangent.z,tb).normalize();
          const turn=Math.atan2(cross.crossVectors(ta,tb).length(),ta.dot(tb));
          if(turn>1e-9)minimum=Math.min(minimum,a.distanceTo(b)/turn);
        }
      }
      if(minimum>=options.radius)return route;
      radius*=options.radius/minimum*1.025;
    }
    throw new RangeError('The surface curve needs more turning room');
  }
  const configuredDistance=world.gameplay?.railwayMaxDistance,maxConnectionDistance=configuredDistance===undefined?SETTLEMENT_RAILWAY.maxConnectionDistance:configuredDistance;
  if(!Number.isFinite(maxConnectionDistance)||maxConnectionDistance<=0)throw new TypeError('Railway maximum connection distance must be positive and finite');
  const directed=world.gameplay?.economy==='loops',economic=!!world.gameplay?.economy,accounts=[session.player,...session.bots.map(bot=>bot.game)];
  const connectionKey=(a,b)=>directed?`${a}>${b}`:keyFor(a,b);
  const matchMode=!!world.gameplay?.match,teams=new Map((world.gameplay?.match?.players??world.players??[]).map(player=>[player.id,player.teamId]));
  const allied=(a,b)=>a===b||matchMode&&(session.areAllied?.(a,b)??(teams.get(a)!=null&&teams.get(a)===teams.get(b)));
  let synchronizing=false,stationSyncKey=null,stationSpatialKey=null,cityCache=null;
  let account=session.player;
  const asAccount=(options,work)=>{const previous=account;account=accounts.find(game=>game.ownerId===(options?.ownerId??session.player.ownerId))??session.player;try{return work();}finally{account=previous;}};
  const stations=[],lines=[],connections=[],paths=[],reservations=[],clearedPlacementIds=new Set(initialState?.clearedPlacementIds??[]);
  let revision=0,catalog=sceneryCatalog??null,cached=null,geometryCache=null,occupiedCache=null,networkCache=null;
  const lazyScenery=!!world.surface?.complete||!!world.gameplay?.match,sceneryRegions=new Set();
  const stationCache=new Map();
  let reachability={revision:-1,adjacency:null,stations:null,results:new Map()};
  if(initialState){
    for(const [target,key]of [[stations,'stations'],[lines,'lines'],[connections,'connections'],[paths,'paths'],[reservations,'reservations']])target.push(...copy(initialState[key]??[]));
    revision=initialState.revision??0;
  }
  let trackObstacleRevision=-1,trackBlocked=()=>false;
  function trackObstacles(){
    if(trackObstacleRevision!==revision){
      trackBlocked=spatialIndex(lines.flatMap(line=>line.points.map(point=>({...point,lineId:line.id,radius:SETTLEMENT_RAILWAY.halfWidth*1.65}))));
      trackObstacleRevision=revision;
    }return trackBlocked;
  }
  function network(){
    if(networkCache?.revision===revision&&networkCache.ownerId===account.ownerId)return networkCache;
    const byId=new Map(lines.map(line=>[line.id,line])),stationById=new Map(stations.map(station=>[station.id,station]));
    const parent=new Map(lines.filter(line=>(economic||line.ownerId===account.ownerId)).map(line=>[line.id,line.id]));
    const root=id=>{let next=id;while(parent.get(next)!==next)next=parent.get(next);while(parent.get(id)!==id){const previous=parent.get(id);parent.set(id,next);id=previous;}return next;};
    const join=(a,b)=>{if(parent.has(a)&&parent.has(b))parent.set(root(a),root(b));};
    const connected=new Set();
    for(const connection of connections){
      const id=connection.id?.replace(/^connection:/,'rail-link:')??`rail-link:${connection.key}`;connected.add(id);
      join(id,connection.fromJunction?.lineId??stationById.get(connection.fromStationId)?.lineId);
      join(id,connection.toJunction?.lineId??stationById.get(connection.toStationId)?.lineId);
    }
    // Hydrated older records can lack a connection entry. Only an actual
    // coincident endpoint establishes connectivity; city labels are not edges.
    for(const line of lines)if(!connected.has(line.id))for(const id of line.stationIds??[]){
      const station=stationById.get(id);if(!station)continue;
      if([line.points[0],line.points.at(-1)].some(p=>p&&[-1,1].some(side=>metricDistance(p,port(station,side))<1e-5)))join(line.id,station.lineId);
    }
    const spines=new Set(stations.map(station=>station.lineId)),groups=new Map(),entries=[];
    for(const line of lines)for(const segment of line.alignment?.segments??[]){
      const item={line,segment,box:segmentBox(segment)};entries.push(item);
      if(parent.has(line.id)&&!spines.has(line.id)){
        const key=root(line.id);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(item);
      }
    }
    const trees=new Map([...groups].map(([id,items])=>[id,new BoundsTree(items,item=>item.box)]));
    networkCache={revision,ownerId:account.ownerId,byId,components:new Map([...parent.keys()].map(id=>[id,root(id)])),tree:new BoundsTree(entries,item=>item.box),stationTrees:new Map(stations.map(station=>
      [station.id,parent.has(station.lineId)?trees.get(root(station.lineId)):null])),switches:new Map()};
    return networkCache;
  }
  // A player's building jurisdiction ends at the next city's station. Rail
  // branches remain usable, but a connected empire does not grant a global
  // right to build from every remote platform.
  function directLines(stationId){
    const start=stations.find(station=>station.id===stationId);if(!start)return new Set();
    if(reachability.revision!==revision){
      const adjacency=new Map(lines.map(line=>[line.id,new Set()])),byId=new Map(stations.map(station=>[station.id,station]));
      const link=(a,b)=>{if(adjacency.has(a)&&adjacency.has(b)){adjacency.get(a).add(b);adjacency.get(b).add(a);}};
      for(const connection of connections){const branch=connection.lineId??connection.id.replace(/^connection:/,'rail-link:');
        link(branch,connection.fromJunction?.lineId??byId.get(connection.fromStationId)?.lineId);
        link(branch,connection.toJunction?.lineId??byId.get(connection.toStationId)?.lineId);
      }
      reachability={revision,adjacency,stations:new Set(stations.map(station=>station.lineId)),results:new Map()};
    }
    if(reachability.results.has(stationId))return reachability.results.get(stationId);
    const found=new Set([start.lineId]),queue=[start.lineId];
    for(let i=0;i<queue.length;i++)for(const next of reachability.adjacency.get(queue[i])??[])if(!found.has(next)&&(!reachability.stations.has(next)||next===start.lineId)){found.add(next);queue.push(next);}
    reachability.results.set(stationId,found);return found;
  }
  function ownedLines(ownerId=account.ownerId){const result=new Set();for(const station of stations)if(station.ownerId===ownerId)for(const id of directLines(station.id))result.add(id);return result;}
  function canExtend(city,ownerId=session.player.ownerId){
    if(typeof city==='string')city=allCities().find(item=>item.id===city);
    if(!city)return false;if(city.ownerId===ownerId)return true;if(!economic)return false;
    const station=stations.find(item=>item.cityId===city.id);if(!station)return false;
    if(directed){const permitted=ownedLines(ownerId);return connections.some(connection=>(connection.fromStationId===station.id||connection.toStationId===station.id)&&permitted.has(connection.lineId??connection.id.replace(/^connection:/,'rail-link:')));}
    const components=network().components,component=components.get(station.lineId);
    return component!==undefined&&stations.some(item=>item.ownerId===ownerId&&components.get(item.lineId)===component);
  }
  function anchorAt(point,settings={}){
    const ownerId=settings.ownerId??session.player.ownerId,stationId=settings.stationId??point?.stationId,lineId=settings.lineId??point?.lineId;
    const side=settings.side??point?.side,distanceHint=settings.distance??point?.distance,direction=settings.direction??point?.direction??1;
    const resultForStation=station=>{if(side!==-1&&side!==1)return null;const p=port(station,side,true),attachment={kind:'station',stationId:station.id,side,x:p.x,z:p.z};
      return {...p,cityId:station.cityId,stationId:station.id,side,kind:'station',attachment,fromAllowed:side===1,toAllowed:side===-1,accessible:station.ownerId===ownerId};};
    if(stationId){const station=stations.find(s=>s.id===stationId);return station?resultForStation(station):null;}
    const resultForTrack=(line,distance)=>{
      if(!Number.isFinite(distance)||distance<0||distance>line.length)return null;
      const p=sampleAlignment(line.alignment,distance),candidates=stations.filter(station=>directLines(station.id).has(line.id));
      const requested=settings.cityId??point?.cityId;
      candidates.sort((a,b)=>Number(b.cityId===requested)-Number(a.cityId===requested)||Number(b.ownerId===ownerId)-Number(a.ownerId===ownerId)||metricDistance(a,p)-metricDistance(b,p)||a.id.localeCompare(b.id));
      const city=candidates[0]??stations.find(station=>station.cityId===line.from),cityId=city?.cityId??line.from;
      const attachment={kind:'track',lineId:line.id,distance,x:p.x,z:p.z,direction};
      return {...p,cityId,kind:'track',lineId:line.id,distance,direction,attachment,fromAllowed:direction===1,toAllowed:direction===1,accessible:ownedLines(ownerId).has(line.id)};
    };
    if(lineId){const line=lines.find(l=>l.id===lineId);if(!line?.alignment)return null;
      // Screen picking may estimate the arc distance. Reproject onto the exact
      // selected primitive when a world point is supplied, never another line.
      let distance=distanceHint;
      if(finite(point)){let error=Infinity;for(const segment of line.alignment.segments){const at=projectSegment(segment,point),p=sampleAlignment(line.alignment,at),d=metricDistance(p,point);if(d<error){error=d;distance=at;}}}
      return resultForTrack(line,distance);
    }
    if(!finite(point))return null;
    const maxDistance=settings.maxDistance??4;let best=null;
    for(const station of stations)if(!settings.cityId||station.cityId===settings.cityId)for(const end of [-1,1]){
      const p=port(station,end,true),error=metricDistance(p,point);if(error<=maxDistance&&(!best||error<best.error)){const attachment={kind:'station',stationId:station.id,side:end,x:p.x,z:p.z};best={...p,error,cityId:station.cityId,stationId:station.id,side:end,kind:'station',attachment,fromAllowed:end===1,toAllowed:end===-1,accessible:station.ownerId===ownerId};}
    }
    const spines=new Set(stations.map(station=>station.lineId));
    for(const line of lines)if(!spines.has(line.id)&&line.alignment)for(const segment of line.alignment.segments){
      const distance=projectSegment(segment,point),p=sampleAlignment(line.alignment,distance),error=metricDistance(p,point);
      if(error<=maxDistance&&(!best||error<best.error-1e-5))best={...resultForTrack(line,distance),error};
    }
    return best;
  }
  function normalizedOptions(options={}){
    const result=routeOptions(options);if(!directed)return result;
    for(const [side,attachment] of Object.entries(result.attachments))if(attachment.stationId||attachment.lineId){
      const anchor=anchorAt(attachment,{...attachment,ownerId:options.ownerId??account.ownerId});if(anchor)result.attachments[side]=anchor.attachment;
    }
    return result;
  }
  function nearestTrack(station,point){
    let best=null;
    const direct=directed?directLines(station.id):null;
    const tree=network().stationTrees.get(station.id),inspect=({line,segment})=>{
      if(direct&&!direct.has(line.id))return Infinity;
      const distance=projectSegment(segment,point),sample=sampleAlignment(line.alignment,distance),error=metricDistance(sample,point);
      if(!best||error<best.error-1e-8||Math.abs(error-best.error)<1e-8&&(line.id<best.line.id||line.id===best.line.id&&distance<best.distance))best={line,distance,sample,error};
      return error;
    };
    // Chart bounds cannot prune a physical-distance search near the poles.
    if(surfaceFor(world))for(const item of tree?.items??[])inspect(item);
    else tree?.nearest(point.x,point.z,inspect);
    return best;
  }
  function switchLines(point){
    const index=network(),reference=point.junction?.lineId??point.stationLineId,component=index.components.get(reference),key=`${reference}:${point.x}:${point.z}`;
    if(!index.switches.has(key)){
      const ids=new Set();for(const {line,segment}of index.tree.query(pointBox(point.x,point.z,1e-5))){
        if(component!==undefined&&index.components.get(line.id)===component&&metricDistance(sampleAlignment(line.alignment,projectSegment(segment,point)),point)<1e-5)ids.add(line.id);
      }
      while(index.switches.size>=256)index.switches.delete(index.switches.keys().next().value);
      index.switches.set(key,ids);
    }return index.switches.get(key);
  }
  function scenery(geometry){
    if(!catalog){
      const found=new Map();
      if(!lazyScenery&&world.bounds&&world.biomes&&world.lines&&world.cities){
        const b={minX:Math.min(...world.outline.map(p=>p[0])),maxX:Math.max(...world.outline.map(p=>p[0])),
          minZ:Math.min(...world.outline.map(p=>p[1])),maxZ:Math.max(...world.outline.map(p=>p[1]))},size=192;
        for(let x=Math.floor(b.minX/size);x<=Math.floor((b.maxX-.001)/size);x++)for(let z=Math.floor(b.minZ/size);z<=Math.floor((b.maxZ-.001)/size);z++){
          for(const source of generateWorldRegion(world,{x:x*size,z:z*size,size}).placements){
            const item=isHarvestableWood(source)&&!source.id?{...source,id:streamedWoodSourceId(source)}:source;
            found.set(item.id??`${item.kind}:${item.x}:${item.z}`,item);
          }
        }
      }
      for(const item of [...world.placements??[],...world.gameplay?.guaranteedTrees??[],...world.gameplay?.botScenery??[]])found.set(item.id??`${item.kind}:${item.x}:${item.z}`,item);
      catalog=[...found.values()];
    }
    // Match startup already owns bounded spawn/village scenery. Never scan
    // Earth's outline to create a station. A committed route's worker fills
    // only the geographic cells intersected by that requested corridor.
    if(lazyScenery&&geometry?.code==='ready'&&world.bounds&&world.biomes&&world.lines&&world.cities){
      const size=192,needed=new Set();
      for(const line of geometry.lines??[])for(const point of line.points??[]){
        const radius=surfaceChartRadius(world,point.x,point.z,8);
        for(let x=Math.floor((point.x-radius)/size);x<=Math.floor((point.x+radius)/size);x++)for(let z=Math.floor((point.z-radius)/size);z<=Math.floor((point.z+radius)/size);z++)needed.add(`${x}:${z}`);
      }
      if([...needed].some(key=>!sceneryRegions.has(key))){
        const found=new Map(catalog.map(item=>[item.id??`${item.kind}:${item.x}:${item.z}`,item]));
        for(const key of needed)if(!sceneryRegions.has(key)){
          const [x,z]=key.split(':').map(Number);
          for(const source of generateWorldRegion(world,{x:x*size,z:z*size,size}).placements){
            const item=isHarvestableWood(source)&&!source.id?{...source,id:streamedWoodSourceId(source)}:source;
            found.set(item.id??`${item.kind}:${item.x}:${item.z}`,item);
          }
          sceneryRegions.add(key);
        }
        catalog=[...found.values()];
      }
    }
    const found=new Map(catalog.map(item=>[item.id??`${item.kind}:${item.x}:${item.z}`,item]));
    for(const item of getPlacements())found.set(item.id??`${item.kind}:${item.x}:${item.z}`,item);
    for(const item of world.gameplay?.farmVillages?.farms??[])found.set(placementId(item),item);
    return [...found.values()].filter(item=>!clearedPlacementIds.has(placementId(item)));
  }
  function transferCityOwnership(cityId,ownerId){
    let changed=false;
    for(const station of stations)if(station.cityId===cityId&&station.ownerId!==ownerId){
      station.ownerId=ownerId;changed=true;
      const spine=lines.find(line=>line.id===station.lineId);if(spine){spine.ownerId=ownerId;spine.color=ownerId;}
    }
    for(const item of [...paths,...reservations])if(item.cityId===cityId)item.ownerId=ownerId;
    if(changed){revision++;cached=geometryCache=networkCache=null;stationSyncKey=null;}
    return changed;
  }
  session.onCityOwnershipChanged?.(event=>transferCityOwnership(event.cityId,event.ownerId));
  function allCities(){
    const cacheKey=`${session.spatialRevision??session.revision??0}:${revision}`;
    if(matchMode&&session.spatialRevision!==undefined&&cityCache?.key===cacheKey)return cityCache.cities.map(city=>({...city,playerOwned:city.ownerId===account.ownerId}));
    const cities=[...session.player.cities,...session.bots.flatMap(bot=>bot.game.cities),...world.gameplay?.farmVillages?.cities??[]]
      .filter(city=>city.level>=1&&city.houseCount>=3),aliases=new Map();
    // A joined neighbourhood keeps its physical stations. Resolve old city
    // IDs through the homes that originally founded each station and account.
    for(const station of stations){
      if(cities.some(city=>city.id===station.cityId))continue;
      const city=cities.find(city=>city.ownerId===station.ownerId&&city.houseIds?.some(id=>station.cityHouseIds?.includes(id)));
      if(city)aliases.set(station.cityId,city.id);
    }
    if(aliases.size){
      for(const station of stations)station.cityId=aliases.get(station.cityId)??station.cityId;
      for(const line of lines){line.from=aliases.get(line.from)??line.from;line.to=aliases.get(line.to)??line.to;}
      for(const path of paths)path.cityId=aliases.get(path.cityId)??path.cityId;
      for(const reservation of reservations)if(reservation.cityId)reservation.cityId=aliases.get(reservation.cityId)??reservation.cityId;
      for(const connection of connections){connection.from=aliases.get(connection.from)??connection.from;connection.to=aliases.get(connection.to)??connection.to;connection.key=connectionKey(connection.from,connection.to);}
      revision++;cached=null;
    }
    if(matchMode)for(const city of cities)transferCityOwnership(city.id,city.ownerId);
    const cityById=new Map(cities.map(city=>[city.id,city])),radii=new Map(),stationByCity=new Map(stations.map(station=>[station.cityId,station.id]));
    // Index buildings once: a civic building far from the mean is still part
    // of the town, and every physical footprint must fit its selection disk.
    for(const item of [...session.buildings,...world.gameplay?.farmVillages?.houses??[],...world.gameplay?.farmVillages?.buildings??[]]){
      const city=cityById.get(aliases.get(item.cityId)??item.cityId);if(!city||!PROTECTED.has(item.kind)||item.kind==='station')continue;
      const radius=Math.max(item.radius??0,Math.hypot(item.width??2.2,item.depth??2.2)/2)*(item.scale??1);
      radii.set(city.id,Math.max(radii.get(city.id)??0,metricDistance(city,item)+radius));
    }
    const result=cities.map(city=>({...city,radius:Math.max(Number.isFinite(city.radius)?city.radius:0,radii.get(city.id)??0,3),stationId:stationByCity.get(city.id)??null}));
    if(matchMode&&session.spatialRevision!==undefined)cityCache={key:`${session.spatialRevision??session.revision??0}:${revision}`,cities:result};
    return result.map(city=>({...city,playerOwned:city.ownerId===account.ownerId}));
  }
  function obstacles(){
    const items=[...session.buildings,...world.gameplay?.farmVillages?.houses??[],...world.gameplay?.farmVillages?.buildings??[],
      ...stations,...(world.placements??[]).filter(item=>PROTECTED.has(item.kind)),...getPlacements().filter(item=>PROTECTED.has(item.kind))];
    const key=items.map(item=>`${item.id}:${item.x}:${item.z}:${item.rotation??0}:${item.width??0}:${item.depth??0}`).join('|');
    if(occupiedCache?.key!==key){occupiedCache={key,items,blocked:spatialIndex(items)};stationCache.clear();}
    return occupiedCache;
  }
  const dry=p=>{const ground=surfaceAt(p.x,p.z);return ground&&['ground','mountain'].includes(ground.type)&&Math.abs(ground.height)<.14;};
  function allowedWith(occupied,extraStations=[],joinPoints=[],terrain=true){
    const blocked=occupied.blocked??spatialIndex(occupied),extraBlocked=spatialIndex(extraStations),railBlocked=trackObstacles();
    const switches=joinPoints.map(point=>({point,lines:switchLines(point)}));
    return p=>{
      if(blocked(p,SETTLEMENT_RAILWAY.halfWidth+.2)||extraBlocked(p,SETTLEMENT_RAILWAY.halfWidth+.2))return false;
      if(terrain){const ground=surfaceAt(p.x,p.z);
      if(!ground||!railTerrain.has(ground.type))return false;
      // Check the physical corridor, not just its centreline, at every sample.
      const yaw=surfaceHeading(world,p.x,p.z,Math.atan2(p.tangent?.x??1,p.tangent?.z??0));
      for(const side of [-1,1]){const q=offset(p,Math.cos(yaw)*side*SETTLEMENT_RAILWAY.halfWidth,-Math.sin(yaw)*side*SETTLEMENT_RAILWAY.halfWidth),s=surfaceAt(q.x,q.z);
        if(!s||!railTerrain.has(s.type))return false;}}
      // A switch may fan out of a shared station throat, but unrelated tracks
      // cannot cross on the level or accidentally lie on top of one another.
      if(railBlocked(p,.001,item=>switches.some(join=>join.lines.has(item.lineId)&&metricDistance(join.point,p)<12)))return false;
      return true;
    };
  }
  function stationOptions(city,other,occupied,attachment){
    const existing=stations.find(station=>station.cityId===city.id);if(existing)return [existing];
    if(directed&&!synchronizing)return [];
    const blocked=occupied.blocked,homes=[...session.buildings,...world.gameplay?.farmVillages?.houses??[]].filter(item=>item.cityId===city.id&&item.kind==='house');
    const cityExtent=Math.max(3,...homes.map(home=>metricDistance(home,city)+1.6)),orbitRadius=Math.max(10,cityExtent+5),toward=delta(city,other),bearing=Math.atan2(toward.z,toward.x);
    const endpointOffset=Math.atan2(7,orbitRadius);
    const make=angle=>{
        angle=Math.round(((angle%TAU+TAU)%TAU)*1e12)/1e12;
        const center=offset(city,Math.cos(angle)*orbitRadius,Math.sin(angle)*orbitRadius),physicalHeading=angle+Math.PI/2;
        const normal={x:-Math.sin(physicalHeading),z:Math.cos(physicalHeading)},site=offset(center,normal.x*SETTLEMENT_RAILWAY.stationOffset,normal.z*SETTLEMENT_RAILWAY.stationOffset);
        const heading=Math.PI/2-chartHeadingForSurface(world,center.x,center.z,Math.PI/2-physicalHeading);
        const station={id:`rail-station:${city.id}`,kind:'station',cityId:city.id,ownerId:city.ownerId,
          ...site,y:0,rotation:chartHeadingForSurface(world,site.x,site.z,Math.atan2(-normal.x,-normal.z)),physicalHeading,width:6.4,depth:2.4,radius:Math.hypot(3.2,1.2),
          platform:{width:2.4,length:6.4},lineId:`rail-spine:${city.id}`,distance:7,center,heading,side:1,attachmentSide:1,orbitRadius,
          cityHouseIds:[...city.houseIds??homes.map(home=>home.id)]};
        station.distance=dist(port(station,-1),port(station,1))/2;
        return {...station,score:metricDistance(port(station,1),other)*.35+Math.abs(angleDelta(physicalHeading,bearing))*2};
    };
    const fits=station=>{
        if(!footprintSamples({...station,width:7,depth:3},point=>!blocked(point,.22)))return false;
        // Five probes locate the draft on level land. The worker checks the
        // full station footprint later, without selecting a different site.
        const rotation=surfaceHeading(world,station.x,station.z,station.rotation),c=Math.cos(rotation),s=Math.sin(rotation);
        if(![[0,0],[-3.5,-1.5],[-3.5,1.5],[3.5,-1.5],[3.5,1.5]].every(([x,z])=>dry(offset(station,x*c+z*s,-x*s+z*c))))return false;
        const allowed=allowedWith(occupied,[station],[],false),start=port(station,-1),end=port(station,1);
        return acceptable(combineAlignments([straightSegment(start,end,SETTLEMENT_RAILWAY.railY)]),allowed);
    };
    const cacheKey=`${city.id}:${city.x}:${city.z}:${other.x}:${other.z}:${orbitRadius}:${revision}`;
    const grounded=station=>{
      const key=`site:${cacheKey}:${station.heading}`;
      if(!stationCache.has(key)){
        while(stationCache.size>=512)stationCache.delete(stationCache.keys().next().value);
        stationCache.set(key,fits(station)?station:null);
      }
      return stationCache.get(key);
    };
    // The active port is itself on a concentric circle. Its angular offset
    // makes cursor→site→snapped-cursor replay exactly idempotent, without
    // storing a mutable station pose in UI state.
    if(attachment){
      const toward=delta(city,attachment),angle=Math.atan2(toward.z,toward.x)-endpointOffset,requested=make(angle),station=grounded(requested);
      return [station??{...requested,siteBlocked:true}];
    }
    let selected=stationCache.get(cacheKey);
    if(!selected){
      const options=Array.from({length:24},(_,i)=>make(bearing+i/24*TAU));
      selected=[];
      for(const option of options.sort((a,b)=>a.score-b.score)){
        if(selected.some(other=>metricDistance(option,other)<2.5&&Math.abs(Math.sin(option.heading-other.heading))<.3))continue;
        const site=grounded(option);if(!site)continue;
        selected.push(site);if(selected.length===SETTLEMENT_RAILWAY.stationOptions)break;
      }
      while(stationCache.size>=512)stationCache.delete(stationCache.keys().next().value);
      stationCache.set(cacheKey,selected);
    }
    return selected;
  }
  function port(station,side,outgoing=true){
    if(!Number.isFinite(station.physicalHeading))return {x:station.center.x+Math.cos(station.heading)*7*side,z:station.center.z+Math.sin(station.heading)*7*side,
      heading:station.heading+(side<0?Math.PI:0)+(outgoing?0:Math.PI),stationLineId:station.lineId};
    const h=station.physicalHeading,a=offset(station.center,-Math.cos(h)*7,-Math.sin(h)*7),b=offset(station.center,Math.cos(h)*7,Math.sin(h)*7);
    return {...(side<0?a:b),heading:Math.atan2(b.z-a.z,b.x-a.x)+(side<0?Math.PI:0)+(outgoing?0:Math.PI),stationLineId:station.lineId};
  }
  function ports(station,other,outgoing,attachment){
    if(!directed&&!stations.some(item=>item.id===station.id)&&station.attachmentSide)return [port(station,station.attachmentSide,outgoing)];
    const stationPort=side=>({...port(station,side,outgoing),attachment:{kind:'station',stationId:station.id,side,x:port(station,side).x,z:port(station,side).z},wrongDirection:directed&&side!==(outgoing?1:-1)});
    const ends=directed?(attachment?[stationPort(-1),stationPort(1)]:[stationPort(outgoing?1:-1)]):[port(station,-1,outgoing),port(station,1,outgoing)],junctions=[];
    if(directed&&attachment?.stationId){const exact=stations.find(s=>s.id===attachment.stationId);if(!exact)return [];
      const side=attachment.side;if(side!==-1&&side!==1)return [];
      return [{...port(exact,side,outgoing),attachment,wrongDirection:side!==(outgoing?1:-1)}];
    }
    if(directed&&attachment?.lineId){const line=lines.find(l=>l.id===attachment.lineId);if(!line||!Number.isFinite(attachment.distance)||attachment.distance<0||attachment.distance>line.length)return [];
      const p=sampleAlignment(line.alignment,attachment.distance),direction=attachment.direction??1;
      return [{...p,heading:p.heading+(direction===-1?Math.PI:0),attachment,wrongDirection:direction!==1,junction:{lineId:line.id,distance:attachment.distance,x:p.x,z:p.z,heading:p.heading}}];
    }
    const score=p=>metricDistance(p,other)+Math.abs(angleDelta(p.heading+(outgoing?0:Math.PI),Math.atan2(other.z-p.z,other.x-p.x)))*8;
    if(attachment){
      const nearest=nearestTrack(station,attachment),endDistance=Math.min(...ends.map(p=>metricDistance(p,attachment)));
      // Exact station ends win ties at the shared throat. Otherwise the cursor
      // projects onto an exact primitive, never a sampled or fixed switch dot.
      if(!nearest||endDistance<=nearest.error+1e-5)return ends.filter(p=>metricDistance(p,attachment)<endDistance+1e-5).sort((a,b)=>score(a)-score(b));
      const {line,distance,sample:p}=nearest,junction={lineId:line.id,distance,x:p.x,z:p.z,heading:p.heading};
      return (directed?[0]:[0,Math.PI]).map(direction=>({...p,heading:p.heading+direction,junction,...(directed?{attachment:{kind:'track',lineId:line.id,distance,x:p.x,z:p.z,direction:1}}:{})})).sort((a,b)=>score(a)-score(b));
    }
    if(!directed&&stations.some(item=>item.id===station.id))for(const line of lines){
      if(line.id===station.lineId||(!economic&&line.ownerId!==account.ownerId)||!(line.stationIds??[]).includes(station.id))continue;
      // A later railway can share an established approach and peel away at a
      // tangent switch. The existing bed is never duplicated or overwritten.
      for(let distance=10;distance<line.length-8;distance+=12){
        const p=sampleAlignment(line.alignment,distance);
        for(const direction of [0,Math.PI])junctions.push({...p,heading:p.heading+direction,
          junction:{lineId:line.id,distance,x:p.x,z:p.z,heading:p.heading}});
      }
    }
    // Even a busy station always exposes both physical ends. Junction search
    // must never crowd the back port out of the bounded candidate budget.
    return [...ends,...junctions.sort((a,b)=>score(a)-score(b)).slice(0,8)].sort((a,b)=>score(a)-score(b));
  }
  function makeLine(id,alignment,from,to,stationIds=[],metadata=true){
    const sampled=sampleAlignmentPoints(alignment,.35),bridges=[];let start=null;
    const line={id,from,to,ownerId:account.ownerId,color:account.ownerId,directed,closed:false,alignment,...sampled,
      bridges,tunnels:[],cuts:[],stationIds,stops:[]};
    if(!metadata)return line;
    for(let i=0;i<sampled.points.length;i++){
      const p=sampled.points[i],wet=['water','ocean','shore'].includes(surfaceAt(p.x,p.z)?.type)||riverBankDistance(world,p.x,p.z)<2.2;
      if(wet&&start===null)start=Math.max(0,sampled.distances[i]-.6);
      if(start!==null&&(!wet||i===sampled.points.length-1)){const end=Math.min(alignment.length,sampled.distances[i]+.6);
        bridges.push({start,end,entry:sampleAlignment(alignment,start),exit:sampleAlignment(alignment,end)});start=null;}
    }
    for(const mountain of world.mountains??[]){
      if(!line.points.some(p=>metricDistance(p,mountain)<mountain.radius+CLEARANCES.cuttingHalfWidth+1))continue;
      const cuts=intervalsFor(line,p=>mountainFootprintDistance(mountain,p.x,p.z)-CLEARANCES.cuttingHalfWidth);
      line.cuts.push(...cuts.map(cut=>({...cut,mountainId:mountain.id})));
      const tunnels=intervalsFor(line,(p,distance)=>{
        const tangent=sampleAlignment(alignment,distance).tangent;
        let deficit=CLEARANCES.tunnelRoofHeight-mountainHeight(mountain,p.x,p.z);
        for(let i=0;i<=24;i++){
          const angle=i/24*Math.PI,lateral=Math.cos(angle)*CLEARANCES.tunnelArchRadius;
          const height=SETTLEMENT_RAILWAY.railY+CLEARANCES.tunnelArchSpring+Math.sin(angle)*CLEARANCES.tunnelArchRadius;
          deficit=Math.max(deficit,height+CLEARANCES.tunnelRockCover-mountainHeight(mountain,p.x-tangent.z*lateral,p.z+tangent.x*lateral));
        }return deficit;
      });
      for(const tunnel of tunnels){const cut=cuts.find(c=>c.start<=tunnel.start+1e-6&&c.end>=tunnel.end-1e-6);
        line.tunnels.push({...tunnel,mountainId:mountain.id,cutStart:cut?.start??tunnel.start,cutEnd:cut?.end??tunnel.end,
          cutEntry:cut?.entry??tunnel.entry,cutExit:cut?.exit??tunnel.exit});}
    }
    line.cuts.sort((a,b)=>a.start-b.start);line.tunnels.sort((a,b)=>a.start-b.start);return line;
  }
  function makeSpine(station,metadata=true){return makeLine(station.lineId,combineAlignments([straightSegment(port(station,-1),port(station,1),SETTLEMENT_RAILWAY.railY)]),station.cityId,station.cityId,[station.id],metadata);}
  function nextLinkId(from,to){const base=`rail-link:${connectionKey(from,to)}`;let id=base,index=2;while(lines.some(line=>line.id===id))id=`${base}:${index++}`;return id;}
  function guideLine(from,to,points){
    const distances=[0];for(let i=1;i<points.length;i++)distances.push(distances.at(-1)+metricDistance(points[i-1],points[i]));
    return {id:`rail-link:${connectionKey(from.id,to.id)}`,from:from.id,to:to.id,ownerId:account.ownerId,color:account.ownerId,
      points,distances,length:distances.at(-1),previewOnly:true,closed:false,bridges:[],tunnels:[],cuts:[],stops:[]};
  }
  function failedDraft(from,to,attempt,options){
    const inspection=inspectAlignment(attempt.start,attempt.end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY,
      waypoints:options.waypoints,isAllowed:attempt.allowed}),bad=[];
    const samples=inspection.points,distances=[0];
    for(let i=1;i<samples.length;i++)distances.push(distances.at(-1)+metricDistance(samples[i-1],samples[i]));
    const poseSamples=new Map();
    for(const span of inspection.spans){poseSamples.set(span.fromIndex,span.offset);poseSamples.set(span.toIndex,span.offset+span.points.length-1);}
    const mark=(first,last,reason)=>{
      const center=(distances[first]+distances[last])/2;
      let poseIndex=0,nearest=Infinity;
      for(const [index,sampleIndex] of poseSamples){const separation=Math.abs(distances[sampleIndex]-center);
        if(separation<=nearest){nearest=separation;poseIndex=index;}}
      const pose=inspection.poses[poseIndex],padding=1.5;
      const low=distances[first]-padding,high=distances[last]+padding;
      while(first>0&&distances[first]>low)first--;
      while(last<samples.length-1&&distances[last]<high)last++;
      if(last<=first)return;
      bad.push({...(poseIndex===0?{handleKind:'from'}:poseIndex===inspection.poses.length-1?{handleKind:'to'}:{index:poseIndex-1}),
        x:pose.x,z:pose.z,reason,points:samples.slice(first,last+1)});
    };
    // The warning follows the failing samples themselves. Control positions
    // only identify which handle can help; they never decide where red is drawn.
    for(const violation of inspection.violations)mark(violation.startIndex,violation.endIndex,violation.reason);
    const crossing=crossingPoint(samples);
    if(crossing){mark(crossing.firstIndex-1,crossing.firstIndex,'intersection');mark(crossing.secondIndex-1,crossing.secondIndex,'intersection');}
    const newStations=[attempt.sa,attempt.sb].filter(station=>!stations.some(existing=>existing.id===station.id));
    const branch=guideLine(from,to,inspection.points);
    return {lines:[...newStations.map(station=>makeSpine(station,false)),branch],stations:newStations,invalidBends:bad,
      fromStationId:attempt.sa.id,toStationId:attempt.sb.id,fromJunction:attempt.start.junction??null,toJunction:attempt.end.junction??null,
      handles:routeHandles(from,to,null,options,attempt.start,attempt.end)};
  }
  function findGeometry(from,to,occupied,options){
    const {waypoints=[],attachments={}}=options,a=stationOptions(from,to,occupied,attachments.from),b=stationOptions(to,from,occupied,attachments.to);
    const blocked=(code,reason,extra={})=>({code,reason,lines:[],stations:[],handles:routeHandles(from,to,null,options),waypoints:copy(waypoints),attachments:copy(attachments),waypointCount:waypointCount(from,to,options.controlCount),...extra});
    if(!a.length||!b.length||a[0].siteBlocked||b[0].siteBlocked){
      const start=a.length?ports(a[0],to,true,attachments.from)[0]:{...from,heading:Math.atan2(to.z-from.z,to.x-from.x)};
      const end=b.length?ports(b[0],from,false,attachments.to)[0]:{...to,heading:Math.atan2(to.z-from.z,to.x-from.x)};
      const newStations=[a[0],b[0]].filter(station=>station&&!stations.some(existing=>existing.id===station.id));
      const points=inspectAlignment(start,end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY,waypoints}).points;
      return blocked('station-blocked','Choose clear level ground around this city',{blockedCityId:!a.length||a[0].siteBlocked?from.id:to.id,
        stations:newStations,handles:routeHandles(from,to,null,options,start,end),lines:[...newStations.map(station=>makeSpine(station,false)),guideLine(from,to,points)]});
    }
    const attempts=[];
    for(const sa of a)for(const sb of b){
      if(sa.id!==sb.id&&metricDistance(sa,sb)<sa.radius+sb.radius+1)continue;
      if(sa.id!==sb.id&&(!footprintSamples(sa,p=>footprintDistance(sb,p)>.3)||!footprintSamples(sb,p=>footprintDistance(sa,p)>.3)))continue;
      for(const start of ports(sa,waypoints[0]??sb.center,true,attachments.from))for(const end of ports(sb,waypoints.at(-1)??sa.center,false,attachments.to)){
        const points=[start,...waypoints,end],length=points.slice(1).reduce((sum,p,i)=>sum+metricDistance(points[i],p),0);
        const score=length+Math.abs(angleDelta(start.heading,Math.atan2(points[1].z-start.z,points[1].x-start.x)))*7+(sa.score??0)+(sb.score??0);
        attempts.push({sa,sb,start,end,score});
      }
    }
    attempts.sort((a,b)=>a.score-b.score);
    const wrong=directed&&attempts.find(attempt=>attempt.start.wrongDirection||attempt.end.wrongDirection);
    if(wrong){
      const directionErrors=[...(wrong.start.wrongDirection?['from']:[]),...(wrong.end.wrongDirection?['to']:[])];
      const points=inspectAlignment(wrong.start,wrong.end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY,waypoints}).points;
      return blocked('wrong-direction',directionErrors.length===2?'Start at an exit and finish at an entry':directionErrors[0]==='from'?'Start at a station exit or follow the rail arrows':'Finish at a station entry or follow the rail arrows',{
        directionErrors,lines:[guideLine(from,to,points)],stations:[],fromStationId:wrong.sa.id,toStationId:wrong.sb.id,
        fromJunction:wrong.start.junction??null,toJunction:wrong.end.junction??null,handles:routeHandles(from,to,null,options,wrong.start,wrong.end)});
    }
    let chosen=null;
    for(const attempt of attempts.slice(0,24)){
      attempt.allowed=allowedWith(occupied,[attempt.sa,attempt.sb],[attempt.start,attempt.end],false);
      let route;
      if(waypoints.length||surfaceFor(world)){try{route=curvedRoute(attempt.start,attempt.end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY,waypoints,isAllowed:attempt.allowed});}catch{continue;}}
      else route=direct(attempt.start,attempt.end,attempt.allowed);
      const score=route?route.length+metricDistance(attempt.sa,from)+metricDistance(attempt.sb,to):Infinity;
      if(route&&(!chosen||score<chosen.finalScore)&&acceptable(route,attempt.allowed)&&!selfIntersects(route)){chosen={...attempt,route,finalScore:score};}
    }
    if(!chosen&&!waypoints.length)for(const attempt of attempts.slice(0,3)){
      attempt.allowed??=allowedWith(occupied,[attempt.sa,attempt.sb],[attempt.start,attempt.end],false);
      const dx=attempt.end.x-attempt.start.x,dz=attempt.end.z-attempt.start.z,length=Math.hypot(dx,dz);
      // A small deterministic set of bypasses replaces an unbounded search on
      // the input thread. Invalid drafts stay editable instead of stalling.
      for(const offset of [12,-12,24,-24]){let route;
        try{route=curvedRoute(attempt.start,attempt.end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY,
          waypoints:[{x:(attempt.start.x+attempt.end.x)/2-dz/length*offset,z:(attempt.start.z+attempt.end.z)/2+dx/length*offset}],isAllowed:attempt.allowed});}catch{continue;}
        if(acceptable(route,attempt.allowed)&&!selfIntersects(route)){chosen={...attempt,route};break;}
      }if(chosen)break;
    }
    if(!chosen){
      const result=blocked('route-blocked',waypoints.length?'Give the curve more room around buildings':'No clear railway route between these cities');
      if(attempts.length){const attempt=attempts[0];attempt.allowed??=allowedWith(occupied,[attempt.sa,attempt.sb],[attempt.start,attempt.end],false);
        const draft=failedDraft(from,to,attempt,options);
        const reason=draft.invalidBends.some(bend=>bend.reason==='radius')?'Give this bend more room':
          draft.invalidBends.some(bend=>bend.reason==='intersection')?'Keep this bend from crossing the line':result.reason;
        return {...result,...draft,reason};}
      return result;
    }
    const newStations=[chosen.sa,chosen.sb].filter(station=>!stations.some(existing=>existing.id===station.id));
    const branch=makeLine(nextLinkId(from.id,to.id),chosen.route,from.id,to.id,[chosen.sa.id,chosen.sb.id],false);
    return {code:'ready',reason:'Connect these cities',lines:[...newStations.map(station=>makeSpine(station,false)),branch],stations:newStations,
      fromStationId:chosen.sa.id,toStationId:chosen.sb.id,fromJunction:chosen.start.junction??null,toJunction:chosen.end.junction??null,
      handles:routeHandles(from,to,chosen.route,options,chosen.start,chosen.end),waypoints:copy(waypoints),attachments:copy(attachments),waypointCount:waypointCount(from,to,options.controlCount),invalidBends:[]};
  }
  function findPlan(geometry,placements,occupied){
    if(geometry.code!=='ready')return geometry;
    const newStations=geometry.stations,branch=geometry.lines.at(-1),stationById=new Map([...stations,...newStations].map(station=>[station.id,station]));
    const start={...sampleAlignment(branch.alignment,0),junction:geometry.fromJunction,stationLineId:stationById.get(geometry.fromStationId)?.lineId};
    const end={...sampleAlignment(branch.alignment,branch.length),junction:geometry.toJunction,stationLineId:stationById.get(geometry.toStationId)?.lineId};
    const allowed=allowedWith([...occupied.items,...placements.filter(item=>PROTECTED.has(item.kind))],newStations,[start,end]);
    if(newStations.some(station=>!footprintSamples({...station,width:7,depth:3},dry))||geometry.lines.some(line=>!acceptable(line.alignment,allowed))){
      return {...geometry,code:'route-blocked',reason:'Keep the line inside the world and platforms on clear level land'};
    }
    const newLines=geometry.lines.map(line=>makeLine(line.id,line.alignment,line.from,line.to,line.stationIds)),clearedTreeIds=[],clearedPlacements=[],permanentWoodIds=[];
    for(const item of placements){
      const id=placementId(item);
      if(PROTECTED.has(item.kind)||clearedPlacementIds.has(id))continue;
      const intersectsLine=newLines.some(line=>line.points.some(point=>footprintDistance(item,point)<SETTLEMENT_RAILWAY.halfWidth+.25));
      const intersectsStation=newStations.some(station=>footprintSamples(station,point=>footprintDistance(item,point)>.2)===false);
      if(!intersectsLine&&!intersectsStation)continue;
      if(isHarvestableWood(item)){
        // A harvested root can still sit beneath the new railway. Reserve it
        // permanently even though there is no standing source left to animate.
        permanentWoodIds.push(id);
        if(!session.shared.removedTreeIds.has(id))clearedTreeIds.push(id);
      }
      else clearedPlacements.push({...item,id:placementId(item)});
    }
    const removed=new Set([...session.shared.removedTreeIds,...clearedTreeIds]),newPaths=[];
    for(const station of newStations){
      const homes=[...session.buildings,...world.gameplay?.farmVillages?.houses??[]].filter(home=>home.kind==='house'&&home.cityId===station.cityId).sort((a,b)=>metricDistance(a,station)-metricDistance(b,station));
      for(const home of homes.slice(0,3)){
        // The path router treats civic lots as rectangles; stations have the
        // same rectangular footprint, rather than a large circular exclusion.
        const removedScenery=new Set(clearedPlacements.map(placementId));
        const path=planSettlementPath(world,{...station,kind:'civic',doorOffset:1.25},home,{placements:[...occupied.items,...placements.filter(item=>!removedScenery.has(placementId(item)))],removedTreeIds:removed,surfaceAt,maxNodes:900});
        if(path){newPaths.push({...path,id:`rail-access:${station.cityId}`,cityId:station.cityId,ownerId:station.ownerId});break;}
      }
    }
    return {...geometry,lines:newLines,paths:newPaths,clearedTreeIds,clearedPlacements,clearedPlacementIds:[...permanentWoodIds,...clearedPlacements.map(placementId)]};
  }
  function resultFor(fromCityId,toCityId,options={},provisional=false){
    const route=normalizedOptions(options);
    const cities=allCities(),from=cities.find(city=>city.id===fromCityId),to=cities.find(city=>city.id===toCityId);
    if(route.controlCount===undefined&&from&&to)route.controlCount=railwayControlCount(from,to,world);
    const range={maxConnectionDistance,distance:from&&to?metricDistance(from,to):null};
    const cost=directed?loopTrackCost(range.distance??0):economic?8+Math.ceil((range.distance??0)/50):SETTLEMENT_RAILWAY.cost;
    const costResource=directed?'resources':'gold',balance=directed?(account.resourcesAt?.().resources??account.logs??0):account.gold;
    const shortage={code:`not-enough-${costResource}`,reason:`A railway costs ${cost} ${costResource}`};
    const base={fromCityId,toCityId,ownerId:account.ownerId,cost,costResource,affordable:balance>=cost,provisional,
      ...range,range,lines:[],stations:[],paths:[],clearedTreeIds:[],clearedPlacementIds:[],clearedPlacements:[],handles:[],waypoints:route.waypoints,attachments:route.attachments};
    const fail=(code,reason)=>({...base,valid:false,siteValid:false,code,reason});
    if(options.ownerId!==undefined&&!accounts.some(game=>game.ownerId===options.ownerId))return fail('invalid-owner','Choose a valid railway owner');
    if(!from||!to||from===to&&!(directed&&route.attachments.from&&route.attachments.to))return fail('invalid-city','Choose two railway endpoints');
    if(!from.playerOwned&&!to.playerOwned&&!(economic&&(canExtend(from,account.ownerId)||canExtend(to,account.ownerId))))return fail('not-your-city','Start from your city or connected network');
    if(directed&&(!from.stationId||!to.stationId))return fail('station-required','Stations unlock at city level 2');
    if(directed&&!from.playerOwned&&!to.playerOwned&&!route.attachments.from&&!route.attachments.to)return fail('outside-jurisdiction','Connect to your station or its approach before another city');
    if(!matchMode&&base.distance>maxConnectionDistance)return fail('out-of-range','Outside connection range');
    const coverage=cities.filter(city=>city.stationId&&allied(city.ownerId,account.ownerId));
    if(directed&&(matchMode?![from,to].every(endpoint=>coverage.some(city=>metricDistance(city,endpoint)<=maxConnectionDistance)):!coverage.some(city=>metricDistance(city,from)<=maxConnectionDistance&&metricDistance(city,to)<=maxConnectionDistance)))return fail('out-of-range',matchMode?'Outside your team’s connection range':'Outside your city’s connection range');
    if(!directed&&connections.some(connection=>connection.key===connectionKey(from.id,to.id)))return fail('already-connected','These cities already have a railway');
    base.waypointCount=waypointCount(from,to,route.controlCount);base.handles=routeHandles(from,to,null,route);
    if(directed&&Object.entries(route.attachments).some(([side,attachment])=>attachment.stationId&&(![-1,1].includes(attachment.side)||!stations.some(station=>station.id===attachment.stationId&&station.cityId===(side==='from'?from.id:to.id)))||attachment.lineId&&(!lines.some(line=>line.id===attachment.lineId)||![1,-1].includes(attachment.direction??1))))return fail('invalid-anchor','Choose an existing station end or rail');
    if(route.controlCount!==undefined&&!validControlCount(route.controlCount)||route.waypoints.length&&route.waypoints.length!==base.waypointCount||route.waypoints.some(p=>!finite(p))||Object.values(route.attachments).some(p=>!finite(p)))return fail('invalid-waypoints','Keep the route control points and choose a valid curve');
    // Timber rewards and the day clock do not change rail feasibility. Only
    // occupied buildings / existing rail geometry invalidate an expensive plan.
    const cacheKey=geometryKey(from.id,to.id,route);
    if(!provisional&&cached?.key===cacheKey){const plan=cached.plan;
      return plan.code==='ready'?{...base,...copy(plan),siteValid:true,valid:base.affordable,...(base.affordable?{code:'ready',reason:plan.reason}:shortage)}:
        {...base,...copy(plan),siteValid:false,valid:false};}
    const occupied=obstacles();
    if(geometryCache?.key!==cacheKey)geometryCache={key:cacheKey,plan:findGeometry(from,to,occupied,route)};
    const plan=provisional?geometryCache.plan:findPlan(geometryCache.plan,scenery(geometryCache.plan),occupied);
    if(plan.code!=='ready'){if(!provisional)cached={key:cacheKey,plan};return {...base,...copy(plan),valid:false,siteValid:false};}
    if(directed){const allowed=ownedLines(),fromLine=plan.fromJunction?.lineId??stations.find(s=>s.id===plan.fromStationId)?.lineId,toLine=plan.toJunction?.lineId??stations.find(s=>s.id===plan.toStationId)?.lineId;
      if(!allowed.has(fromLine)&&!allowed.has(toLine))return {...base,...copy(plan),valid:false,siteValid:false,code:'outside-jurisdiction',reason:'Connect to your station or its approach before another city'};
    }
    if(!provisional)cached={key:cacheKey,plan};
    return {...base,...copy(plan),siteValid:true,valid:base.affordable,...(base.affordable?{code:'ready',reason:plan.reason}:shortage)};
  }
  const preview=(from,to,options={})=>asAccount(options,()=>resultFor(from,to,options,true)),evaluate=(from,to,options={})=>asAccount(options,()=>resultFor(from,to,options,false));
  function geometryKey(fromCityId,toCityId,options={}){const cities=allCities(),route=normalizedOptions(options),from=cities.find(city=>city.id===fromCityId),to=cities.find(city=>city.id===toCityId);
    if(route.controlCount===undefined&&from&&to)route.controlCount=railwayControlCount(from,to,world);
    return `${options.ownerId??session.player.ownerId}:${fromCityId}>${toCityId}:${maxConnectionDistance}:${revision}:${cities.map(city=>`${city.id}:${city.ownerId}:${city.x}:${city.z}:${city.houseCount}`).join('|')}:${obstacles().key}:${JSON.stringify(routeOptions(route))}`;}
  function adoptPreview(fromCityId,toCityId,result,key,options={}){
    const cities=allCities(),from=cities.find(city=>city.id===fromCityId),to=cities.find(city=>city.id===toCityId);
    if(!from||!to||!matchMode&&metricDistance(from,to)>maxConnectionDistance)return false;
    if(result?.provisional||key!==geometryKey(fromCityId,toCityId,options)||result?.fromCityId!==fromCityId||result?.toCityId!==toCityId)return false;
    const plan={code:result.siteValid?'ready':result.code,reason:result.siteValid?'Connect these cities':result.reason};
    for(const field of ['lines','stations','paths','fromStationId','toStationId','fromJunction','toJunction','clearedTreeIds','clearedPlacements','clearedPlacementIds','handles','waypoints','attachments','waypointCount','invalidBends','blockedCityId','directionErrors'])if(field in result)plan[field]=copy(result[field]);
    cached={key,plan};return true;
  }
  function buildAs(fromCityId,toCityId,{requireCached=false,...options}={}){
    const cities=allCities(),from=cities.find(city=>city.id===fromCityId),to=cities.find(city=>city.id===toCityId);
    if(from&&to&&!matchMode&&metricDistance(from,to)>maxConnectionDistance)return {ok:false,...evaluate(fromCityId,toCityId,options)};
    if(requireCached&&cached?.key!==geometryKey(fromCityId,toCityId,options))return {ok:false,code:'world-changed',reason:'The city changed; preparing a fresh route'};
    const result=evaluate(fromCityId,toCityId,options);if(!result.valid)return {ok:false,...result};
    for(const actor of session.shared.getActors?.()??[])if(finite(actor)&&result.stations.some(station=>footprintDistance(station,actor)<.25)){
      return {ok:false,...result,valid:false,code:'player-blocked',reason:'Move away from the new platform'};
    }
    const payment=result.costResource==='resources'?(account.spendResources??account.spendLogs).call(account,result.cost):account.spendGold(result.cost);
    if(!payment.ok)return {ok:false,...result,...payment,...(result.costResource==='resources'&&payment.code==='not-enough-timber'?{code:'not-enough-resources'}:{})};
    const connection={id:result.lines.at(-1).id.replace(/^rail-link:/,'connection:'),key:connectionKey(fromCityId,toCityId),from:fromCityId,to:toCityId,
      lineId:result.lines.at(-1).id,directed,fromStationId:result.fromStationId,toStationId:result.toStationId,fromJunction:result.fromJunction,toJunction:result.toJunction,ownerId:account.ownerId,cost:result.cost,costResource:result.costResource};
    stations.push(...result.stations);lines.push(...result.lines);paths.push(...result.paths);connections.push(connection);
    for(const id of result.clearedTreeIds)session.shared.removedTreeIds.add(id);
    for(const id of result.clearedPlacementIds)clearedPlacementIds.add(id);
    for(const station of result.stations)reservations.push({...station});
    for(const line of result.lines)reservations.push({id:line.id,kind:'rail-corridor',width:SETTLEMENT_RAILWAY.halfWidth*2+.3,points:line.points});
    revision++;cached=null;const built={ok:true,...result,connection:copy(connection),totalGold:payment.totalGold,...(result.costResource==='resources'?{totalResources:payment.totalResources??payment.totalLogs??account.resourcesAt?.()?.resources}:{}),revision};onBuild?.(built);return built;
  }
  const build=(from,to,options={})=>asAccount(options,()=>buildAs(from,to,options));
  function synchronizeStations(){
    if(!directed)return {ok:true,changed:false,stations:[],lines:[],paths:[],clearedTreeIds:[],clearedPlacements:[],clearedPlacementIds:[]};
    const added={ok:true,changed:false,stations:[],lines:[],paths:[],clearedTreeIds:[],clearedPlacements:[],clearedPlacementIds:[]};
    // Wallet changes do not retry site searches. Production may change an
    // account every few seconds; only spatial revisions or city growth matter.
    const syncKey=()=>`${session.spatialRevision??session.revision??0}:${revision}:`+[...session.player.cities,...session.bots.flatMap(bot=>bot.game.cities),...world.gameplay?.farmVillages?.cities??[]].map(city=>`${city.id}:${city.ownerId}:${city.x}:${city.z}:${city.level}:${city.houseCount}`).join('|');
    const spatialKey=`${session.spatialRevision??session.revision??0}:${revision}`;
    if(matchMode&&session.spatialRevision!==undefined&&spatialKey===stationSpatialKey)return added;
    const key=syncKey();if(key===stationSyncKey){stationSpatialKey=spatialKey;return added;}stationSyncKey=key;stationSpatialKey=spatialKey;
    const eligible=allCities().filter(city=>city.level>=2&&city.houseCount>=6&&!stations.some(station=>station.cityId===city.id));
    if(!eligible.length)return added;
    const previous=account;synchronizing=true;
    try{for(const city of eligible){
      account=accounts.find(game=>game.ownerId===city.ownerId)??{ownerId:city.ownerId};
      let hash=2166136261;for(const character of `${world.seed}:${city.id}:station`)hash=Math.imul(hash^character.charCodeAt(0),16777619)>>>0;
      const bearing=hash/4294967296*TAU,other=offset(city,Math.cos(bearing)*100,Math.sin(bearing)*100),occupied=obstacles();
      const station=stationOptions(city,other,occupied)[0];if(!station)continue;
      const available=scenery(),homes=occupied.items.filter(item=>item.kind==='house'&&item.cityId===station.cityId),reach=Math.max(16,...homes.map(home=>metricDistance(home,station)+8));
      const localScenery=matchMode?available.filter(item=>metricDistance(item,station)<=reach+(item.radius??Math.hypot(item.width??0,item.depth??0)/2)*(item.scale??1)):available;
      const result=findPlan({code:'ready',stations:[station],lines:[makeSpine(station,false)],fromStationId:station.id,toStationId:station.id},localScenery,occupied);
      if(result.code!=='ready')continue;
      stations.push(station);lines.push(...result.lines);paths.push(...result.paths);reservations.push({...station});
      for(const line of result.lines)reservations.push({id:line.id,kind:'rail-corridor',width:SETTLEMENT_RAILWAY.halfWidth*2+.3,points:line.points});
      for(const id of result.clearedTreeIds)session.shared.removedTreeIds.add(id);
      for(const id of result.clearedPlacementIds)clearedPlacementIds.add(id);
      for(const key of ['stations','lines','paths','clearedTreeIds','clearedPlacements','clearedPlacementIds'])added[key].push(...result[key]??[]);
      revision++;cached=geometryCache=null;added.changed=true;
    }}finally{account=previous;synchronizing=false;}
    stationSyncKey=syncKey();stationSpatialKey=`${session.spatialRevision??session.revision??0}:${revision}`;added.revision=revision;return added;
  }
  return {preview,evaluate,build,canExtend,anchorAt,synchronizeStations,geometryKey,adoptPreview,transferCityOwnership,rangeCities(ownerId=session.player.ownerId){return allCities().filter(city=>city.stationId&&allied(city.ownerId,ownerId));},get maxConnectionDistance(){return maxConnectionDistance;},get sceneryCatalog(){return catalog;},get revision(){return revision;},get cities(){return allCities();},get stations(){return copy(stations);},get lines(){return copy(lines);},get paths(){return copy(paths);},get reservations(){return copy(reservations);},
    snapshot(){const cities=allCities();return {revision,cities,stations:copy(stations),lines:copy(lines),paths:copy(paths),connections:copy(connections),reservations:copy(reservations),clearedPlacementIds:[...clearedPlacementIds]};}};
}
