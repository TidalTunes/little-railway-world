import {alignmentCandidates,combineAlignments,createAlignment,sampleAlignment,sampleAlignmentPoints,straightSegment} from './alignments.js';
import {worldSurface,generateWorldRegion,mountainHeight,CLEARANCES} from './world-model.js';
import {mountainFootprintDistance} from './mountain-shape.js';
import {riverBankDistance} from './hydrology.js';
import {settlementTreeId} from './settlement-game.js';
import {planSettlementPath} from './settlement-paths.js';

export const SETTLEMENT_RAILWAY=Object.freeze({cost:5,minRadius:8,halfWidth:1.12,
  railY:.42,spineLength:14,stationOffset:3,stationWidth:6.4,stationDepth:2.4,
  sampleSpacing:.4,maxNodes:4200,latticeStep:3.141592653589793,stationOptions:7});
const TAU=Math.PI*2,dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z),copy=v=>structuredClone(v);
const finite=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z);
const railTerrain=new Set(['water','ocean','shore','ground','mountain']);
const keyFor=(a,b)=>[a,b].sort().join('|');
const PROTECTED=new Set(['house','station','civic','landmark','apartment','tower']);
const RECTANGLES=new Set(['house','farm','station','civic']);
const angleDelta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
const placementId=item=>item.kind==='tree'?settlementTreeId(item):item.id??`${item.kind}:${item.x}:${item.z}`;
const routeOptions=options=>({waypoints:(options?.waypoints===undefined?[]:Array.isArray(options.waypoints)?options.waypoints:[null]).map(p=>({x:p?.x,z:p?.z}))});
function routeHandles(alignment){
  const intervals=Math.max(2,Math.min(13,Math.ceil(alignment.length/28)));
  return Array.from({length:intervals-1},(_,i)=>{const distance=alignment.length*(i+1)/intervals,p=sampleAlignment(alignment,distance);return{x:p.x,z:p.z,distance};});
}
function selfIntersects(alignment){
  const count=Math.max(2,Math.ceil(alignment.length/1.5)),points=Array.from({length:count+1},(_,i)=>sampleAlignment(alignment,alignment.length*i/count));
  const cross=(a,b,c)=>(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);
  for(let i=1;i<points.length;i++)for(let j=i+3;j<points.length;j++){
    const a=points[i-1],b=points[i],c=points[j-1],d=points[j];
    if(cross(a,b,c)*cross(a,b,d)<-1e-8&&cross(c,d,a)*cross(c,d,b)<-1e-8)return true;
  }return false;
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
class Heap{
  items=[];
  push(item){let i=this.items.length;this.items.push(item);while(i){const p=(i-1)>>1;if(this.items[p].f<=item.f)break;this.items[i]=this.items[p];i=p;}this.items[i]=item;}
  pop(){const root=this.items[0],last=this.items.pop();if(this.items.length){let i=0;while(i*2+1<this.items.length){let c=i*2+1;if(c+1<this.items.length&&this.items[c+1].f<this.items[c].f)c++;if(this.items[c].f>=last.f)break;this.items[i]=this.items[c];i=c;}this.items[i]=last;}return root;}
}
function primitive(p,turn){
  const length=SETTLEMENT_RAILWAY.latticeStep,radius=SETTLEMENT_RAILWAY.minRadius;
  if(!turn)return straightSegment(p,{x:p.x+Math.cos(p.heading)*length,z:p.z+Math.sin(p.heading)*length},SETTLEMENT_RAILWAY.railY);
  const center={x:p.x-Math.sin(p.heading)*turn*radius,z:p.z+Math.cos(p.heading)*turn*radius};
  const startAngle=p.heading-turn*Math.PI/2,sweep=turn*length/radius;
  return {type:'arc',center,radius,startAngle,sweep,length,curvature:turn/radius,
    start:{x:p.x,y:SETTLEMENT_RAILWAY.railY,z:p.z},end:{x:center.x+Math.cos(startAngle+sweep)*radius,y:SETTLEMENT_RAILWAY.railY,z:center.z+Math.sin(startAngle+sweep)*radius}};
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
/** Heading-aware A*: every edge is already a feasible rail arc. No post-hoc
 * smoothing can cut across a house or tighten a mountain detour. */
function planRoute(start,end,allowed,{maxNodes=SETTLEMENT_RAILWAY.maxNodes}={}){
  const immediate=direct(start,end,allowed);if(immediate)return immediate;
  const heap=new Heap(),visited=new Map();let expanded=0;
  const key=p=>`${Math.round(p.x/1.5)}:${Math.round(p.z/1.5)}:${Math.round(((p.heading%TAU+TAU)%TAU)/TAU*16)%16}`;
  const first={...start,g:0,f:dist(start,end),parent:null,part:null};heap.push(first);visited.set(key(first),0);
  while(heap.items.length&&expanded++<maxNodes){
    const node=heap.pop();if(node.g>visited.get(key(node))+.001)continue;
    if(dist(node,end)<30&&expanded%3===0){
      const tail=direct(node,end,allowed);
      if(tail){const parts=[tail];for(let n=node;n?.part;n=n.parent)parts.unshift(n.part);return combineAlignments(parts,SETTLEMENT_RAILWAY.minRadius);}
    }
    for(const turn of [0,-1,1]){
      const part=combineAlignments([primitive(node,turn)],SETTLEMENT_RAILWAY.minRadius),pose=sampleAlignment(part,part.length);
      if(!acceptable(part,allowed))continue;
      const g=node.g+part.length*(turn?1.045:1),k=key(pose);
      if(g>Math.max(95,dist(start,end)*2.6)||g>=(visited.get(k)??Infinity)-.001)continue;
      visited.set(k,g);heap.push({...pose,g,f:g+dist(pose,end)*1.035,parent:node,part});
    }
  }return null;
}

/** Local authoritative infrastructure. Cities/accounts remain owned by their
 * games, while stations and corridors are one shared, persistent rail graph. */
export function createSettlementRailways(world,{session,getPlacements=()=>[],surfaceAt=(x,z)=>worldSurface(world,x,z),onBuild,initialState,sceneryCatalog}={}){
  if(!session?.player)throw new TypeError('Railways require a settlement session');
  const stations=[],lines=[],connections=[],paths=[],reservations=[],clearedPlacementIds=new Set(initialState?.clearedPlacementIds??[]);
  let revision=0,catalog=sceneryCatalog??null,cached=null;
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
  function obstacles(placements){return [...session.buildings,...world.gameplay?.farmVillages?.houses??[],...world.gameplay?.farmVillages?.buildings??[],
    ...stations,...placements.filter(item=>PROTECTED.has(item.kind))];}
  const dry=p=>{const ground=surfaceAt(p.x,p.z);return ground&&['ground','mountain'].includes(ground.type)&&Math.abs(ground.height)<.14;};
  function allowedWith(occupied,extraStations=[],joinPoints=[]){
    const blocked=spatial([...occupied,...extraStations]),railBlocked=trackObstacles();
    return p=>{
      const ground=surfaceAt(p.x,p.z);
      if(!ground||!railTerrain.has(ground.type))return false;
      if(blocked(p,SETTLEMENT_RAILWAY.halfWidth+.2))return false;
      // Check the physical corridor, not just its centreline, at every sample.
      for(const side of [-1,1]){const q={x:p.x+(p.tangent?.z??0)*side*SETTLEMENT_RAILWAY.halfWidth,z:p.z-(p.tangent?.x??1)*side*SETTLEMENT_RAILWAY.halfWidth},s=surfaceAt(q.x,q.z);
        if(!s||!railTerrain.has(s.type))return false;}
      // A switch may fan out of a shared station throat, but unrelated tracks
      // cannot cross on the level or accidentally lie on top of one another.
      if(!joinPoints.some(point=>dist(point,p)<12)&&railBlocked(p,.001))return false;
      return true;
    };
  }
  function stationOptions(city,other,occupied){
    const existing=stations.find(station=>station.cityId===city.id);if(existing)return [existing];
    const blocked=spatial(occupied),homes=[...session.buildings,...world.gameplay?.farmVillages?.houses??[]].filter(item=>item.cityId===city.id&&item.kind==='house');
    const radius=Math.max(3,...homes.map(home=>dist(home,city)+1.6)),bearing=Math.atan2(other.z-city.z,other.x-city.x),options=[];
    for(const extra of [3.4,6.4,9.4,12.4,16.4,20.4])for(let i=0;i<24;i++){
      const a=bearing+i/24*TAU,center={x:city.x+Math.cos(a)*(radius+extra),z:city.z+Math.sin(a)*(radius+extra)};
      for(const heading of [bearing,bearing-Math.PI/6,bearing+Math.PI/6,a+Math.PI/2])for(const side of [-1,1]){
        const normal={x:-Math.sin(heading),z:Math.cos(heading)},station={id:`rail-station:${city.id}`,kind:'station',cityId:city.id,ownerId:city.ownerId,
          x:center.x+normal.x*SETTLEMENT_RAILWAY.stationOffset*side,y:0,z:center.z+normal.z*SETTLEMENT_RAILWAY.stationOffset*side,
          rotation:Math.atan2(-normal.x*side,-normal.z*side),width:6.4,depth:2.4,radius:Math.hypot(3.2,1.2),
          platform:{width:2.4,length:6.4},lineId:`rail-spine:${city.id}`,distance:7,center,heading,side,cityHouseIds:[...city.houseIds??homes.map(home=>home.id)]};
        if(!boxSamples({...station,width:7,depth:3},point=>dry(point)&&!blocked(point,.22)))continue;
        const allowed=allowedWith(occupied,[station]);
        const start={x:center.x-Math.cos(heading)*7,z:center.z-Math.sin(heading)*7},end={x:center.x+Math.cos(heading)*7,z:center.z+Math.sin(heading)*7};
        if(!acceptable(combineAlignments([straightSegment(start,end,SETTLEMENT_RAILWAY.railY)]),allowed))continue;
        options.push({...station,score:dist(city,station)*1.8+dist(center,other)*.35+Math.abs(angleDelta(heading,bearing))*2});
      }
    }
    const selected=[];
    for(const option of options.sort((a,b)=>a.score-b.score)){
      if(selected.some(other=>dist(option,other)<2.5&&Math.abs(Math.sin(option.heading-other.heading))<.3))continue;
      selected.push(option);if(selected.length===SETTLEMENT_RAILWAY.stationOptions)break;
    }return selected;
  }
  function port(station,side,outgoing=true){return {x:station.center.x+Math.cos(station.heading)*7*side,z:station.center.z+Math.sin(station.heading)*7*side,
    heading:station.heading+(side<0?Math.PI:0)+(outgoing?0:Math.PI)};}
  function ports(station,other,outgoing){
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
    return [...ends,...junctions.sort((a,b)=>score(a)-score(b)).slice(0,8)].sort((a,b)=>score(a)-score(b));
  }
  function makeLine(id,alignment,from,to,stationIds=[]){
    const sampled=sampleAlignmentPoints(alignment,.35),bridges=[];let start=null;
    for(let i=0;i<sampled.points.length;i++){
      const p=sampled.points[i],wet=['water','ocean','shore'].includes(surfaceAt(p.x,p.z)?.type)||riverBankDistance(world,p.x,p.z)<2.2;
      if(wet&&start===null)start=Math.max(0,sampled.distances[i]-.6);
      if(start!==null&&(!wet||i===sampled.points.length-1)){const end=Math.min(alignment.length,sampled.distances[i]+.6);
        bridges.push({start,end,entry:sampleAlignment(alignment,start),exit:sampleAlignment(alignment,end)});start=null;}
    }
    const line={id,from,to,ownerId:session.player.ownerId,color:session.player.ownerId,closed:false,alignment,...sampled,
      bridges,tunnels:[],cuts:[],stationIds,stops:[]};
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
  function makeSpine(station){return makeLine(station.lineId,combineAlignments([straightSegment(port(station,-1),port(station,1),SETTLEMENT_RAILWAY.railY)]),station.cityId,station.cityId,[station.id]);}
  function findPlan(from,to,placements,{waypoints=[]}={}){
    const occupied=obstacles(placements),a=stationOptions(from,waypoints[0]??to,occupied),b=stationOptions(to,waypoints.at(-1)??from,occupied);
    if(!a.length||!b.length)return {code:'station-blocked',reason:'No clear station site near this city',blockedCityId:!a.length?from.id:to.id};
    const attempts=[];
    for(const sa of a)for(const sb of b){
      if(dist(sa,sb)<sa.radius+sb.radius+1)continue;
      if(!boxSamples(sa,p=>pointDistance(sb,p)>.3)||!boxSamples(sb,p=>pointDistance(sa,p)>.3))continue;
      for(const start of ports(sa,waypoints[0]??sb.center,true))for(const end of ports(sb,waypoints.at(-1)??sa.center,false)){
        const points=[start,...waypoints,end],length=points.slice(1).reduce((sum,p,i)=>sum+dist(points[i],p),0);
        const score=length+Math.abs(angleDelta(start.heading,Math.atan2(points[1].z-start.z,points[1].x-start.x)))*7+(sa.score??0)+(sb.score??0);
        attempts.push({sa,sb,start,end,score});
      }
    }
    attempts.sort((a,b)=>a.score-b.score);let chosen=null;
    for(const attempt of attempts.slice(0,160)){
      attempt.allowed=allowedWith(occupied,[attempt.sa,attempt.sb],[attempt.start,attempt.end]);
      let route;
      if(waypoints.length){try{route=createAlignment(attempt.start,attempt.end,{radius:SETTLEMENT_RAILWAY.minRadius,y:SETTLEMENT_RAILWAY.railY,waypoints,isAllowed:attempt.allowed});}catch{continue;}}
      else route=direct(attempt.start,attempt.end,attempt.allowed);
      const score=route?route.length+dist(attempt.sa,from)+dist(attempt.sb,to):Infinity;
      if(route&&acceptable(route,attempt.allowed)&&!selfIntersects(route)&&(!chosen||score<chosen.finalScore)){chosen={...attempt,route,finalScore:score};}
    }
    if(!chosen&&!waypoints.length)for(const attempt of attempts.slice(0,5)){
      attempt.allowed??=allowedWith(occupied,[attempt.sa,attempt.sb],[attempt.start,attempt.end]);
      const route=planRoute(attempt.start,attempt.end,attempt.allowed);if(route&&!selfIntersects(route)){chosen={...attempt,route};break;}
    }
    if(!chosen)return {code:'route-blocked',reason:waypoints.length?'Give the curve more room around buildings':'No clear railway route between these cities',waypoints,handles:copy(waypoints)};
    const newStations=[chosen.sa,chosen.sb].filter(station=>!stations.some(existing=>existing.id===station.id));
    const branch=makeLine(`rail-link:${keyFor(from.id,to.id)}`,chosen.route,from.id,to.id,[chosen.sa.id,chosen.sb.id]);
    const newLines=[...newStations.map(makeSpine),branch],clearedTreeIds=[],clearedPlacements=[];
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
        const path=planSettlementPath(world,{...station,kind:'civic',doorOffset:1.25},home,{placements:[...occupied,...placements.filter(item=>!removedScenery.has(placementId(item)))],removedTreeIds:removed,surfaceAt,maxNodes:900});
        if(path){newPaths.push({...path,id:`rail-access:${station.cityId}`,cityId:station.cityId,ownerId:station.ownerId});break;}
      }
    }
    return {code:'ready',reason:'Connect these cities',lines:newLines,stations:newStations,paths:newPaths,
      fromStationId:chosen.sa.id,toStationId:chosen.sb.id,fromJunction:chosen.start.junction??null,toJunction:chosen.end.junction??null,
      clearedTreeIds,clearedPlacements,clearedPlacementIds:clearedPlacements.map(placementId),handles:routeHandles(chosen.route),waypoints:copy(waypoints)};
  }
  function evaluate(fromCityId,toCityId,options={}){
    const route=routeOptions(options);
    const cities=allCities(),from=cities.find(city=>city.id===fromCityId),to=cities.find(city=>city.id===toCityId);
    const base={fromCityId,toCityId,cost:SETTLEMENT_RAILWAY.cost,affordable:session.player.gold>=SETTLEMENT_RAILWAY.cost,lines:[],stations:[],paths:[],clearedTreeIds:[],clearedPlacementIds:[],clearedPlacements:[],handles:[],waypoints:route.waypoints};
    const fail=(code,reason)=>({...base,valid:false,siteValid:false,code,reason});
    if(!from||!to||from===to)return fail('invalid-city','Choose two different cities');
    if(!from.playerOwned&&!to.playerOwned)return fail('not-your-city','One end must be your city');
    if(connections.some(connection=>connection.key===keyFor(from.id,to.id)))return fail('already-connected','These cities already have a railway');
    if(route.waypoints.length>32||route.waypoints.some(p=>!finite(p)))return fail('invalid-waypoints','Choose a valid curve');
    // Timber rewards and the day clock do not change rail feasibility. Only
    // occupied buildings / existing rail geometry invalidate an expensive plan.
    const cacheKey=geometryKey(from.id,to.id,route);
    if(cached?.key!==cacheKey){cached={key:cacheKey,plan:findPlan(from,to,scenery(),route)};}
    const plan=cached.plan;
    if(plan.code!=='ready')return {...base,...plan,valid:false,siteValid:false};
    return {...base,...copy(plan),siteValid:true,valid:base.affordable,code:base.affordable?'ready':'not-enough-gold',reason:base.affordable?plan.reason:'A railway costs 5 gold'};
  }
  function geometryKey(fromCityId,toCityId,options={}){allCities();return `${fromCityId}>${toCityId}:${revision}:${session.buildings.map(item=>item.id).join('|')}:${JSON.stringify(routeOptions(options).waypoints)}`;}
  function adoptPreview(fromCityId,toCityId,result,key,options={}){
    if(key!==geometryKey(fromCityId,toCityId,options)||result?.fromCityId!==fromCityId||result?.toCityId!==toCityId)return false;
    const plan={code:result.siteValid?'ready':result.code,reason:result.siteValid?'Connect these cities':result.reason};
    for(const field of ['lines','stations','paths','fromStationId','toStationId','fromJunction','toJunction','clearedTreeIds','clearedPlacements','clearedPlacementIds','handles','waypoints','blockedCityId'])if(field in result)plan[field]=copy(result[field]);
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
  return {evaluate,build,geometryKey,adoptPreview,get sceneryCatalog(){return catalog;},get revision(){return revision;},get cities(){return allCities();},get stations(){return copy(stations);},get lines(){return copy(lines);},get paths(){return copy(paths);},get reservations(){return copy(reservations);},
    snapshot(){const cities=allCities();return {revision,cities,stations:copy(stations),lines:copy(lines),paths:copy(paths),connections:copy(connections),reservations:copy(reservations),clearedPlacementIds:[...clearedPlacementIds]};}};
}
