import {alignmentCandidates,combineAlignments,createAlignment,inspectAlignment,sampleAlignment,sampleAlignmentPoints,straightSegment} from './alignments.js';
import {worldSurface,generateWorldRegion,mountainHeight,CLEARANCES} from './world-model.js';
import {mountainFootprintDistance} from './mountain-shape.js';
import {riverBankDistance} from './hydrology.js';
import {settlementTreeId} from './settlement-game.js';
import {planSettlementPath} from './settlement-paths.js';

export const SETTLEMENT_RAILWAY=Object.freeze({cost:5,minRadius:8,halfWidth:1.12,
  railY:.42,spineLength:14,stationOffset:3,stationWidth:6.4,stationDepth:2.4,
  sampleSpacing:.4,stationOptions:7});
const TAU=Math.PI*2,dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z),copy=v=>structuredClone(v);
const finite=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z);
const railTerrain=new Set(['water','ocean','shore','ground','mountain']);
const keyFor=(a,b)=>[a,b].sort().join('|');
const PROTECTED=new Set(['house','station','civic','landmark','apartment','tower']);
const RECTANGLES=new Set(['house','farm','station','civic']);
const angleDelta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
const placementId=item=>item.kind==='tree'?settlementTreeId(item):item.id??`${item.kind}:${item.x}:${item.z}`;
const routeOptions=options=>({waypoints:(options?.waypoints===undefined?[]:Array.isArray(options.waypoints)?options.waypoints:[null]).map(p=>({x:p?.x,z:p?.z})),
  attachments:Object.fromEntries(['from','to'].filter(key=>options?.attachments?.[key]!==undefined).map(key=>[key,{x:options.attachments[key]?.x,z:options.attachments[key]?.z}])),
  ...(options?.controlCount!==undefined?{controlCount:options.controlCount}:{})});
const validControlCount=count=>Number.isInteger(count)&&count>=1&&count<=12;
export const railwayControlCount=(from,to)=>Math.max(1,Math.min(12,Math.ceil(dist(from,to)/48)-1));
const waypointCount=(from,to,controlCount)=>validControlCount(controlCount)?controlCount:railwayControlCount(from,to);
function routeHandles(from,to,alignment,{waypoints=[],attachments={},controlCount}={},start,end){
  const count=waypointCount(from,to,controlCount),point=(p,kind,index)=>({x:p.x,z:p.z,id:kind==='bend'?`bend:${index}`:kind,kind,role:kind==='bend'?'waypoint':kind,...(kind==='bend'?{index}:{}),...(Number.isFinite(p.distance)?{distance:p.distance}:{})});
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
      const t=cross(c,d,a)/(cross(c,d,a)-cross(c,d,b));return{x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t};
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
function pointDistance(item,point){
  const dx=point.x-item.x,dz=point.z-item.z;
  if(RECTANGLES.has(item.kind)){
    const c=Math.cos(item.rotation??0),s=Math.sin(item.rotation??0),scale=item.scale??1;
    const x=dx*c-dz*s,z=dx*s+dz*c,w=(item.width??2.2)*scale/2,d=(item.depth??2.2)*scale/2;
    return Math.hypot(Math.max(0,Math.abs(x)-w),Math.max(0,Math.abs(z)-d));
  }
  return Math.hypot(dx,dz)-(item.radius??(item.kind==='tree'?.85:.7)*(item.scale??1));
}
function spatial(items){
  const size=8,buckets=new Map();
  for(const item of items){const radius=item.radius??Math.hypot(item.width??2.2,item.depth??2.2)/2;
    for(let x=Math.floor((item.x-radius)/size);x<=Math.floor((item.x+radius)/size);x++)for(let z=Math.floor((item.z-radius)/size);z<=Math.floor((item.z+radius)/size);z++){
      const key=`${x}:${z}`;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(item);
    }}
  return(point,radius)=>{const seen=new Set();for(let x=Math.floor((point.x-radius)/size);x<=Math.floor((point.x+radius)/size);x++)for(let z=Math.floor((point.z-radius)/size);z<=Math.floor((point.z+radius)/size);z++){
    for(const item of buckets.get(`${x}:${z}`)??[]){if(seen.has(item))continue;seen.add(item);if(pointDistance(item,point)<radius)return true;}}
    return false;};
}
function boxSamples(item,visit){
  const c=Math.cos(item.rotation),s=Math.sin(item.rotation),nx=Math.ceil(item.width/.7),nz=Math.ceil(item.depth/.7);
  for(let ix=0;ix<=nx;ix++)for(let iz=0;iz<=nz;iz++){
    const x=item.width*(ix/nx-.5),z=item.depth*(iz/nz-.5);
    if(!visit({x:item.x+x*c+z*s,z:item.z-x*s+z*c}))return false;
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
  const stations=[],lines=[],connections=[],paths=[],reservations=[],clearedPlacementIds=new Set(initialState?.clearedPlacementIds??[]);
  let revision=0,catalog=sceneryCatalog??null,cached=null,geometryCache=null,occupiedCache=null;
  const stationCache=new Map();
  if(initialState){
    for(const [target,key]of [[stations,'stations'],[lines,'lines'],[connections,'connections'],[paths,'paths'],[reservations,'reservations']])target.push(...copy(initialState[key]??[]));
    revision=initialState.revision??0;
  }
  let trackObstacleRevision=-1,trackBlocked=()=>false;
  function trackObstacles(){
    if(trackObstacleRevision!==revision){
      trackBlocked=spatial(lines.flatMap(line=>line.points.map(point=>({...point,radius:SETTLEMENT_RAILWAY.halfWidth*1.65}))));
      trackObstacleRevision=revision;
    }return trackBlocked;
  }
  function scenery(){
    if(!catalog){
      const found=new Map();
      if(world.bounds&&world.biomes&&world.lines&&world.cities){
        const b={minX:Math.min(...world.outline.map(p=>p[0])),maxX:Math.max(...world.outline.map(p=>p[0])),
          minZ:Math.min(...world.outline.map(p=>p[1])),maxZ:Math.max(...world.outline.map(p=>p[1]))},size=192;
        for(let x=Math.floor(b.minX/size);x<=Math.floor((b.maxX-.001)/size);x++)for(let z=Math.floor(b.minZ/size);z<=Math.floor((b.maxZ-.001)/size);z++){
          for(const source of generateWorldRegion(world,{x:x*size,z:z*size,size}).placements){
            const item=source.kind==='tree'&&!source.id?{...source,id:`tree:${source.x}:${source.y??0}:${source.z}`}:source;
            found.set(item.id??`${item.kind}:${item.x}:${item.z}`,item);
          }
        }
      }
      for(const item of [...world.placements??[],...world.gameplay?.guaranteedTrees??[],...world.gameplay?.botScenery??[]])found.set(item.id??`${item.kind}:${item.x}:${item.z}`,item);
      catalog=[...found.values()];
    }
    const found=new Map(catalog.map(item=>[item.id??`${item.kind}:${item.x}:${item.z}`,item]));
    for(const item of getPlacements())found.set(item.id??`${item.kind}:${item.x}:${item.z}`,item);
    for(const item of world.gameplay?.farmVillages?.farms??[])found.set(placementId(item),item);
    return [...found.values()].filter(item=>!clearedPlacementIds.has(placementId(item)));
  }
  function allCities(){
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
      for(const connection of connections){connection.from=aliases.get(connection.from)??connection.from;connection.to=aliases.get(connection.to)??connection.to;connection.key=keyFor(connection.from,connection.to);}
      revision++;cached=null;
    }
    return cities.map(city=>({...city,playerOwned:city.ownerId===session.player.ownerId,stationId:stations.find(station=>station.cityId===city.id)?.id??null}));
  }
  function obstacles(){
    const items=[...session.buildings,...world.gameplay?.farmVillages?.houses??[],...world.gameplay?.farmVillages?.buildings??[],
      ...stations,...(world.placements??[]).filter(item=>PROTECTED.has(item.kind)),...getPlacements().filter(item=>PROTECTED.has(item.kind))];
    const key=items.map(item=>`${item.id}:${item.x}:${item.z}:${item.rotation??0}:${item.width??0}:${item.depth??0}`).join('|');
    if(occupiedCache?.key!==key){occupiedCache={key,items,blocked:spatial(items)};stationCache.clear();}
    return occupiedCache;
  }
  const dry=p=>{const ground=surfaceAt(p.x,p.z);return ground&&['ground','mountain'].includes(ground.type)&&Math.abs(ground.height)<.14;};
  function allowedWith(occupied,extraStations=[],joinPoints=[],terrain=true){
    const blocked=occupied.blocked??spatial(occupied),extraBlocked=spatial(extraStations),railBlocked=trackObstacles();
    return p=>{
      if(blocked(p,SETTLEMENT_RAILWAY.halfWidth+.2)||extraBlocked(p,SETTLEMENT_RAILWAY.halfWidth+.2))return false;
      if(terrain){const ground=surfaceAt(p.x,p.z);
      if(!ground||!railTerrain.has(ground.type))return false;
      // Check the physical corridor, not just its centreline, at every sample.
      for(const side of [-1,1]){const q={x:p.x+(p.tangent?.z??0)*side*SETTLEMENT_RAILWAY.halfWidth,z:p.z-(p.tangent?.x??1)*side*SETTLEMENT_RAILWAY.halfWidth},s=surfaceAt(q.x,q.z);
        if(!s||!railTerrain.has(s.type))return false;}}
      // A switch may fan out of a shared station throat, but unrelated tracks
      // cannot cross on the level or accidentally lie on top of one another.
      if(!joinPoints.some(point=>dist(point,p)<12)&&railBlocked(p,.001))return false;
      return true;
    };
  }
  function stationOptions(city,other,occupied,attachment){
    const existing=stations.find(station=>station.cityId===city.id);if(existing)return [existing];
    const blocked=occupied.blocked,homes=[...session.buildings,...world.gameplay?.farmVillages?.houses??[]].filter(item=>item.cityId===city.id&&item.kind==='house');
    const cityExtent=Math.max(3,...homes.map(home=>dist(home,city)+1.6)),orbitRadius=Math.max(10,cityExtent+5),bearing=Math.atan2(other.z-city.z,other.x-city.x);
    const endpointOffset=Math.atan2(7,orbitRadius);
    const make=angle=>{
        angle=Math.round(((angle%TAU+TAU)%TAU)*1e12)/1e12;
        const center={x:city.x+Math.cos(angle)*orbitRadius,z:city.z+Math.sin(angle)*orbitRadius},heading=angle+Math.PI/2;
        const normal={x:-Math.sin(heading),z:Math.cos(heading)},station={id:`rail-station:${city.id}`,kind:'station',cityId:city.id,ownerId:city.ownerId,
          x:center.x+normal.x*SETTLEMENT_RAILWAY.stationOffset,y:0,z:center.z+normal.z*SETTLEMENT_RAILWAY.stationOffset,
          rotation:Math.atan2(-normal.x,-normal.z),width:6.4,depth:2.4,radius:Math.hypot(3.2,1.2),
          platform:{width:2.4,length:6.4},lineId:`rail-spine:${city.id}`,distance:7,center,heading,side:1,attachmentSide:1,orbitRadius,
          cityHouseIds:[...city.houseIds??homes.map(home=>home.id)]};
        return {...station,score:dist(port(station,1),other)*.35+Math.abs(angleDelta(heading,bearing))*2};
    };
    const fits=station=>{
        if(!boxSamples({...station,width:7,depth:3},point=>!blocked(point,.22)))return false;
        // Five probes locate the draft on level land. The worker checks the
        // full station footprint later, without selecting a different site.
        const c=Math.cos(station.rotation),s=Math.sin(station.rotation);
        if(![[0,0],[-3.5,-1.5],[-3.5,1.5],[3.5,-1.5],[3.5,1.5]].every(([x,z])=>dry({x:station.x+x*c+z*s,z:station.z-x*s+z*c})))return false;
        const allowed=allowedWith(occupied,[station],[],false),{center,heading}=station;
        const start={x:center.x-Math.cos(heading)*7,z:center.z-Math.sin(heading)*7},end={x:center.x+Math.cos(heading)*7,z:center.z+Math.sin(heading)*7};
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
      const angle=Math.atan2(attachment.z-city.z,attachment.x-city.x)-endpointOffset,requested=make(angle),station=grounded(requested);
      return [station??{...requested,siteBlocked:true}];
    }
    let selected=stationCache.get(cacheKey);
    if(!selected){
      const options=Array.from({length:24},(_,i)=>make(bearing+i/24*TAU));
      selected=[];
      for(const option of options.sort((a,b)=>a.score-b.score)){
        if(selected.some(other=>dist(option,other)<2.5&&Math.abs(Math.sin(option.heading-other.heading))<.3))continue;
        const site=grounded(option);if(!site)continue;
        selected.push(site);if(selected.length===SETTLEMENT_RAILWAY.stationOptions)break;
      }
      while(stationCache.size>=512)stationCache.delete(stationCache.keys().next().value);
      stationCache.set(cacheKey,selected);
    }
    return selected;
  }
  function port(station,side,outgoing=true){return {x:station.center.x+Math.cos(station.heading)*7*side,z:station.center.z+Math.sin(station.heading)*7*side,
    heading:station.heading+(side<0?Math.PI:0)+(outgoing?0:Math.PI)};}
  function ports(station,other,outgoing,attachment){
    if(!stations.some(item=>item.id===station.id)&&station.attachmentSide)return [port(station,station.attachmentSide,outgoing)];
    const ends=[port(station,-1,outgoing),port(station,1,outgoing)],junctions=[];
    if(stations.some(item=>item.id===station.id))for(const line of lines){
      if(line.id===station.lineId||!line.stationIds.includes(station.id))continue;
      // A later railway can share an established approach and peel away at a
      // tangent switch. The existing bed is never duplicated or overwritten.
      for(let distance=10;distance<line.length-8;distance+=12){
        const p=sampleAlignment(line.alignment,distance);
        for(const direction of [0,Math.PI])junctions.push({...p,heading:p.heading+direction,
          junction:{lineId:line.id,distance,x:p.x,z:p.z,heading:p.heading}});
      }
    }
    const score=p=>dist(p,other)+Math.abs(angleDelta(p.heading+(outgoing?0:Math.PI),Math.atan2(other.z-p.z,other.x-p.x)))*8;
    // Even a busy station always exposes both physical ends. Junction search
    // must never crowd the back port out of the bounded candidate budget.
    if(attachment){const retained=junctions.filter(p=>dist(p,attachment)<1e-5),choices=retained.length?retained:ends,nearest=Math.min(...choices.map(p=>dist(p,attachment)));
      return choices.filter(p=>dist(p,attachment)<nearest+1e-5).sort((a,b)=>score(a)-score(b));}
    return [...ends,...junctions.sort((a,b)=>score(a)-score(b)).slice(0,8)].sort((a,b)=>score(a)-score(b));
  }
  function makeLine(id,alignment,from,to,stationIds=[],metadata=true){
    const sampled=sampleAlignmentPoints(alignment,.35),bridges=[];let start=null;
    const line={id,from,to,ownerId:session.player.ownerId,color:session.player.ownerId,closed:false,alignment,...sampled,
      bridges,tunnels:[],cuts:[],stationIds,stops:[]};
    if(!metadata)return line;
    for(let i=0;i<sampled.points.length;i++){
      const p=sampled.points[i],wet=['water','ocean','shore'].includes(surfaceAt(p.x,p.z)?.type)||riverBankDistance(world,p.x,p.z)<2.2;
      if(wet&&start===null)start=Math.max(0,sampled.distances[i]-.6);
      if(start!==null&&(!wet||i===sampled.points.length-1)){const end=Math.min(alignment.length,sampled.distances[i]+.6);
        bridges.push({start,end,entry:sampleAlignment(alignment,start),exit:sampleAlignment(alignment,end)});start=null;}
    }
    for(const mountain of world.mountains??[]){
      if(!line.points.some(p=>dist(p,mountain)<mountain.radius+CLEARANCES.cuttingHalfWidth+1))continue;
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
  function guideLine(from,to,points){
    const distances=[0];for(let i=1;i<points.length;i++)distances.push(distances.at(-1)+dist(points[i-1],points[i]));
    return {id:`rail-link:${keyFor(from.id,to.id)}`,from:from.id,to:to.id,ownerId:session.player.ownerId,color:session.player.ownerId,
      points,distances,length:distances.at(-1),previewOnly:true,closed:false,bridges:[],tunnels:[],cuts:[],stops:[]};
  }
  function failedDraft(from,to,attempt,options){
    const inspection=inspectAlignment(attempt.start,attempt.end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY,
      waypoints:options.waypoints,isAllowed:attempt.allowed}),bad=[];
    const severity=index=>{
      const a=inspection.poses[index],p=inspection.poses[index+1],b=inspection.poses[index+2];
      const turn=Math.abs(angleDelta(Math.atan2(b.z-p.z,b.x-p.x),Math.atan2(p.z-a.z,p.x-a.x)));
      return Math.tan(Math.min(Math.PI-.001,turn)/2)*SETTLEMENT_RAILWAY.minRadius/Math.max(.01,Math.min(dist(a,p),dist(p,b)));
    };
    const poseSamples=new Map();let sampleOffset=0;
    for(const span of inspection.spans){
      poseSamples.set(span.fromIndex,sampleOffset);
      sampleOffset+=span.points.length-1;poseSamples.set(span.toIndex,sampleOffset);
    }
    const bendContext=index=>{
      const center=poseSamples.get(index+1);if(center===undefined)return [];
      let first=center,last=center,length=0;
      while(first>0&&length<10){length+=dist(inspection.points[first],inspection.points[first-1]);first--;}
      length=0;
      while(last<inspection.points.length-1&&length<10){length+=dist(inspection.points[last],inspection.points[last+1]);last++;}
      // A collapsed failed span can be hidden beneath its handle. Include the
      // adjoining real curve so the warning remains visible at map scale.
      return inspection.points.slice(first,last+1);
    };
    const mark=(index,points,reason,focus,limit=SETTLEMENT_RAILWAY.minRadius*2.5)=>{
      if(index<0||index>=options.waypoints.length)return;
      const p=options.waypoints[index],runs=[];let current=[];
      for(const point of points){
        if(dist(point,focus??p)<=limit)current.push(point);
        else if(current.length){if(current.length>1)runs.push(current);current=[];}
      }
      if(current.length>1)runs.push(current);
      // Keep separate fragments for the same bend; joining distant samples
      // would draw a red chord through otherwise valid track.
      for(const fragment of runs.length?runs:points.length>1?[points]:[])bad.push({index,x:p.x,z:p.z,reason,points:fragment});
    };
    for(const span of inspection.spans){
      if(!span.reason)continue;
      const choices=[span.fromIndex-1,span.toIndex-1].filter(i=>i>=0&&i<options.waypoints.length).sort((a,b)=>severity(b)-severity(a));
      mark(choices[0],bendContext(choices[0]),span.reason);
    }
    const crossing=crossingPoint(inspection.points);
    if(crossing&&!bad.length){
      const index=options.waypoints.reduce((best,p,i)=>dist(p,crossing)<dist(options.waypoints[best],crossing)?i:best,0);
      mark(index,inspection.points,'intersection',crossing,SETTLEMENT_RAILWAY.minRadius*1.5);
    }
    const newStations=[attempt.sa,attempt.sb].filter(station=>!stations.some(existing=>existing.id===station.id));
    const branch=guideLine(from,to,inspection.points);
    return {lines:[...newStations.map(station=>makeSpine(station,false)),branch],stations:newStations,invalidBends:bad,
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
      if(dist(sa,sb)<sa.radius+sb.radius+1)continue;
      if(!boxSamples(sa,p=>pointDistance(sb,p)>.3)||!boxSamples(sb,p=>pointDistance(sa,p)>.3))continue;
      for(const start of ports(sa,waypoints[0]??sb.center,true,attachments.from))for(const end of ports(sb,waypoints.at(-1)??sa.center,false,attachments.to)){
        const points=[start,...waypoints,end],length=points.slice(1).reduce((sum,p,i)=>sum+dist(points[i],p),0);
        const score=length+Math.abs(angleDelta(start.heading,Math.atan2(points[1].z-start.z,points[1].x-start.x)))*7+(sa.score??0)+(sb.score??0);
        attempts.push({sa,sb,start,end,score});
      }
    }
    attempts.sort((a,b)=>a.score-b.score);let chosen=null;
    for(const attempt of attempts.slice(0,24)){
      attempt.allowed=allowedWith(occupied,[attempt.sa,attempt.sb],[attempt.start,attempt.end],false);
      let route;
      if(waypoints.length){try{route=createAlignment(attempt.start,attempt.end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY,waypoints,isAllowed:attempt.allowed});}catch{continue;}}
      else route=direct(attempt.start,attempt.end,attempt.allowed);
      const score=route?route.length+dist(attempt.sa,from)+dist(attempt.sb,to):Infinity;
      if(route&&(!chosen||score<chosen.finalScore)&&acceptable(route,attempt.allowed)&&!selfIntersects(route)){chosen={...attempt,route,finalScore:score};}
    }
    if(!chosen&&!waypoints.length)for(const attempt of attempts.slice(0,3)){
      attempt.allowed??=allowedWith(occupied,[attempt.sa,attempt.sb],[attempt.start,attempt.end],false);
      const dx=attempt.end.x-attempt.start.x,dz=attempt.end.z-attempt.start.z,length=Math.hypot(dx,dz);
      // A small deterministic set of bypasses replaces an unbounded search on
      // the input thread. Invalid drafts stay editable instead of stalling.
      for(const offset of [12,-12,24,-24]){let route;
        try{route=createAlignment(attempt.start,attempt.end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY,
          waypoints:[{x:(attempt.start.x+attempt.end.x)/2-dz/length*offset,z:(attempt.start.z+attempt.end.z)/2+dx/length*offset}],isAllowed:attempt.allowed});}catch{continue;}
        if(acceptable(route,attempt.allowed)&&!selfIntersects(route)){chosen={...attempt,route};break;}
      }if(chosen)break;
    }
    if(!chosen){
      const result=blocked('route-blocked',waypoints.length?'Give the curve more room around buildings':'No clear railway route between these cities');
      if(waypoints.length&&attempts.length){const attempt=attempts[0];attempt.allowed??=allowedWith(occupied,[attempt.sa,attempt.sb],[attempt.start,attempt.end],false);
        const draft=failedDraft(from,to,attempt,options);
        const reason=draft.invalidBends.some(bend=>bend.reason==='radius')?'Give this bend more room':
          draft.invalidBends.some(bend=>bend.reason==='intersection')?'Keep this bend from crossing the line':result.reason;
        return {...result,...draft,reason};}
      return result;
    }
    const newStations=[chosen.sa,chosen.sb].filter(station=>!stations.some(existing=>existing.id===station.id));
    const branch=makeLine(`rail-link:${keyFor(from.id,to.id)}`,chosen.route,from.id,to.id,[chosen.sa.id,chosen.sb.id],false);
    return {code:'ready',reason:'Connect these cities',lines:[...newStations.map(station=>makeSpine(station,false)),branch],stations:newStations,
      fromStationId:chosen.sa.id,toStationId:chosen.sb.id,fromJunction:chosen.start.junction??null,toJunction:chosen.end.junction??null,
      handles:routeHandles(from,to,chosen.route,options,chosen.start,chosen.end),waypoints:copy(waypoints),attachments:copy(attachments),waypointCount:waypointCount(from,to,options.controlCount),invalidBends:[]};
  }
  function findPlan(geometry,placements,occupied){
    if(geometry.code!=='ready')return geometry;
    const newStations=geometry.stations,branch=geometry.lines.at(-1),start=sampleAlignment(branch.alignment,0),end=sampleAlignment(branch.alignment,branch.length);
    const allowed=allowedWith([...occupied.items,...placements.filter(item=>PROTECTED.has(item.kind))],newStations,[start,end]);
    if(newStations.some(station=>!boxSamples({...station,width:7,depth:3},dry))||geometry.lines.some(line=>!acceptable(line.alignment,allowed))){
      return {...geometry,code:'route-blocked',reason:'Keep the line inside the world and platforms on clear level land'};
    }
    const newLines=geometry.lines.map(line=>makeLine(line.id,line.alignment,line.from,line.to,line.stationIds)),clearedTreeIds=[],clearedPlacements=[];
    for(const item of placements){
      if(PROTECTED.has(item.kind)||session.shared.removedTreeIds.has(placementId(item))||clearedPlacementIds.has(placementId(item)))continue;
      const intersectsLine=newLines.some(line=>line.points.some(point=>pointDistance(item,point)<SETTLEMENT_RAILWAY.halfWidth+.25));
      const intersectsStation=newStations.some(station=>boxSamples(station,point=>pointDistance(item,point)>.2)===false);
      if(!intersectsLine&&!intersectsStation)continue;
      if(item.kind==='tree')clearedTreeIds.push(settlementTreeId(item));
      else clearedPlacements.push({...item,id:placementId(item)});
    }
    const removed=new Set([...session.shared.removedTreeIds,...clearedTreeIds]),newPaths=[];
    for(const station of newStations){
      const homes=[...session.buildings,...world.gameplay?.farmVillages?.houses??[]].filter(home=>home.kind==='house'&&home.cityId===station.cityId).sort((a,b)=>dist(a,station)-dist(b,station));
      for(const home of homes.slice(0,3)){
        // The path router treats civic lots as rectangles; stations have the
        // same rectangular footprint, rather than a large circular exclusion.
        const removedScenery=new Set(clearedPlacements.map(placementId));
        const path=planSettlementPath(world,{...station,kind:'civic',doorOffset:1.25},home,{placements:[...occupied.items,...placements.filter(item=>!removedScenery.has(placementId(item)))],removedTreeIds:removed,surfaceAt,maxNodes:900});
        if(path){newPaths.push({...path,id:`rail-access:${station.cityId}`,cityId:station.cityId,ownerId:station.ownerId});break;}
      }
    }
    return {...geometry,lines:newLines,paths:newPaths,clearedTreeIds,clearedPlacements,clearedPlacementIds:clearedPlacements.map(placementId)};
  }
  function resultFor(fromCityId,toCityId,options={},provisional=false){
    const route=routeOptions(options);
    const cities=allCities(),from=cities.find(city=>city.id===fromCityId),to=cities.find(city=>city.id===toCityId);
    const base={fromCityId,toCityId,cost:SETTLEMENT_RAILWAY.cost,affordable:session.player.gold>=SETTLEMENT_RAILWAY.cost,provisional,
      lines:[],stations:[],paths:[],clearedTreeIds:[],clearedPlacementIds:[],clearedPlacements:[],handles:[],waypoints:route.waypoints,attachments:route.attachments};
    const fail=(code,reason)=>({...base,valid:false,siteValid:false,code,reason});
    if(!from||!to||from===to)return fail('invalid-city','Choose two different cities');
    if(!from.playerOwned&&!to.playerOwned)return fail('not-your-city','One end must be your city');
    if(connections.some(connection=>connection.key===keyFor(from.id,to.id)))return fail('already-connected','These cities already have a railway');
    base.waypointCount=waypointCount(from,to,route.controlCount);base.handles=routeHandles(from,to,null,route);
    if(route.controlCount!==undefined&&!validControlCount(route.controlCount)||route.waypoints.length&&route.waypoints.length!==base.waypointCount||route.waypoints.some(p=>!finite(p))||Object.values(route.attachments).some(p=>!finite(p)))return fail('invalid-waypoints','Keep the route control points and choose a valid curve');
    // Timber rewards and the day clock do not change rail feasibility. Only
    // occupied buildings / existing rail geometry invalidate an expensive plan.
    const cacheKey=geometryKey(from.id,to.id,route);
    if(!provisional&&cached?.key===cacheKey){const plan=cached.plan;
      return plan.code==='ready'?{...base,...copy(plan),siteValid:true,valid:base.affordable,code:base.affordable?'ready':'not-enough-gold',reason:base.affordable?plan.reason:'A railway costs 5 gold'}:
        {...base,...copy(plan),siteValid:false,valid:false};}
    const occupied=obstacles();
    if(geometryCache?.key!==cacheKey)geometryCache={key:cacheKey,plan:findGeometry(from,to,occupied,route)};
    const plan=provisional?geometryCache.plan:findPlan(geometryCache.plan,scenery(),occupied);
    if(!provisional)cached={key:cacheKey,plan};
    if(plan.code!=='ready')return {...base,...copy(plan),valid:false,siteValid:false};
    return {...base,...copy(plan),siteValid:true,valid:base.affordable,code:base.affordable?'ready':'not-enough-gold',reason:base.affordable?plan.reason:'A railway costs 5 gold'};
  }
  const preview=(from,to,options={})=>resultFor(from,to,options,true),evaluate=(from,to,options={})=>resultFor(from,to,options,false);
  function geometryKey(fromCityId,toCityId,options={}){const cities=allCities();return `${fromCityId}>${toCityId}:${revision}:${cities.map(city=>`${city.id}:${city.x}:${city.z}:${city.houseCount}`).join('|')}:${obstacles().key}:${JSON.stringify(routeOptions(options))}`;}
  function adoptPreview(fromCityId,toCityId,result,key,options={}){
    if(result?.provisional||key!==geometryKey(fromCityId,toCityId,options)||result?.fromCityId!==fromCityId||result?.toCityId!==toCityId)return false;
    const plan={code:result.siteValid?'ready':result.code,reason:result.siteValid?'Connect these cities':result.reason};
    for(const field of ['lines','stations','paths','fromStationId','toStationId','fromJunction','toJunction','clearedTreeIds','clearedPlacements','clearedPlacementIds','handles','waypoints','attachments','waypointCount','invalidBends','blockedCityId'])if(field in result)plan[field]=copy(result[field]);
    cached={key,plan};return true;
  }
  function build(fromCityId,toCityId,{requireCached=false,...options}={}){
    if(requireCached&&cached?.key!==geometryKey(fromCityId,toCityId,options))return {ok:false,code:'world-changed',reason:'The city changed; preparing a fresh route'};
    const result=evaluate(fromCityId,toCityId,options);if(!result.valid)return {ok:false,...result};
    for(const actor of session.shared.getActors?.()??[])if(finite(actor)&&result.stations.some(station=>pointDistance(station,actor)<.25)){
      return {ok:false,...result,valid:false,code:'player-blocked',reason:'Move away from the new platform'};
    }
    const payment=session.player.spendGold(SETTLEMENT_RAILWAY.cost);if(!payment.ok)return {ok:false,...result,...payment};
    const connection={id:`connection:${keyFor(fromCityId,toCityId)}`,key:keyFor(fromCityId,toCityId),from:fromCityId,to:toCityId,
      fromStationId:result.fromStationId,toStationId:result.toStationId,fromJunction:result.fromJunction,toJunction:result.toJunction,ownerId:session.player.ownerId,cost:SETTLEMENT_RAILWAY.cost};
    stations.push(...result.stations);lines.push(...result.lines);paths.push(...result.paths);connections.push(connection);
    for(const id of result.clearedTreeIds)session.shared.removedTreeIds.add(id);
    for(const id of result.clearedPlacementIds)clearedPlacementIds.add(id);
    for(const station of result.stations)reservations.push({...station});
    for(const line of result.lines)reservations.push({id:line.id,kind:'rail-corridor',width:SETTLEMENT_RAILWAY.halfWidth*2+.3,points:line.points});
    revision++;cached=null;const built={ok:true,...result,connection:copy(connection),totalGold:payment.totalGold,revision};onBuild?.(built);return built;
  }
  return {preview,evaluate,build,geometryKey,adoptPreview,get sceneryCatalog(){return catalog;},get revision(){return revision;},get cities(){return allCities();},get stations(){return copy(stations);},get lines(){return copy(lines);},get paths(){return copy(paths);},get reservations(){return copy(reservations);},
    snapshot(){const cities=allCities();return {revision,cities,stations:copy(stations),lines:copy(lines),paths:copy(paths),connections:copy(connections),reservations:copy(reservations),clearedPlacementIds:[...clearedPlacementIds]};}};
}
