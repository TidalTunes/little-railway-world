import * as THREE from 'three';
import {person} from './assets.js';
import {consolidate} from './geometry.js';
import {bakeMaterialColors} from './color-batches.js';
import {createPlayerPalette} from './player-palette.js';
import {M} from './palette.js';
import {applySceneStyle} from './scene-style.js';
import {rigidSurfacePoseMatrix,surfaceDistance} from './world-surface.js';
import {settlementDoor} from './settlement-paths.js';

export const RESIDENT_LIMITS=Object.freeze({visible:192,detailRadius:95,walkingRadius:48,doorInset:.24,selectionInterval:.25,routineRadius:24,indoorOffset:.2,doorstepHeight:.14,routeBudget:3,routeNodes:900,routeLength:160});
/** Shared by the right arm and its tool, so a pick/axe stays in the hand. */
export function residentWorkSwing(resident,reducedMotion=false){
  if(resident.activity!=='working')return 0;
  if(reducedMotion)return -.35;
  const cycle=resident.workCycle??1.3,time=resident.workTime??resident.idleTime??0,t=((time%cycle)+cycle)%cycle/cycle;
  const ease=value=>value*value*(3-2*value),lift=resident.workKind==='ore'?-.95:resident.workKind==='food'?-.48:-.75;
  // A readable lift, one short stroke, then a quiet beat. Every cycle begins
  // and ends at rest instead of endlessly waving a tool like a pendulum.
  if(t<.24)return 0;
  if(t<.58)return lift*ease((t-.24)/.34);
  if(t<.76)return lift+(-.12-lift)*ease((t-.58)/.18);
  return -.12*(1-ease((t-.76)/.24));
}
const epsilon=1e-5,clamp=(value,a,b)=>Math.max(a,Math.min(b,value));
const distance=(a,b)=>Math.hypot(b.x-a.x,b.z-a.z);
const spatialDistance=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y,b.z-a.z);
const pointKey=p=>`${Math.round(p.x*10000)}:${Math.round(p.z*10000)}:${Math.round(p.y*1000)}`;
const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t});
const wrap=angle=>Math.atan2(Math.sin(angle),Math.cos(angle));
function hash(value){let result=2166136261;for(const char of String(value)){result^=char.charCodeAt(0);result=Math.imul(result,16777619);}return result>>>0;}
function random(resident){let x=resident.randomState;x^=x<<13;x^=x>>>17;x^=x<<5;resident.randomState=x>>>0;return resident.randomState/4294967296;}

function eligibleHomes(houses,cities){
  const membership=new Map();
  if(Array.isArray(cities))for(const city of cities){
    const ids=city.houseIds??[];
    if(ids.length>=3)for(const id of ids)membership.set(id,city.id);
  }
  // The explicit city list is authoritative. This fallback also lets authoring
  // fixtures use homes carrying their own settled city ID.
  else{
    const groups=new Map();for(const house of houses)if(house.cityId!=null){if(!groups.has(house.cityId))groups.set(house.cityId,[]);groups.get(house.cityId).push(house.id);}
    for(const [id,homes]of groups)if(homes.length>=3)for(const home of homes)membership.set(home,id);
  }
  return membership;
}

function trimmedPoints(points,{trimStart=true,trimEnd=true}={}){
  const result=points.filter(p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z)).map(p=>({x:p.x,y:p.y??0,z:p.z}));
  for(let i=result.length-1;i>0;i--)if(distance(result[i],result[i-1])<epsilon)result.splice(i,1);
  if(result.length<2)return [];
  const length=result.slice(1).reduce((sum,p,i)=>sum+distance(result[i],p),0),inset=Math.min(RESIDENT_LIMITS.doorInset,length*.2);
  function trim(){let left=inset;while(result.length>1){const span=distance(result[0],result[1]);if(left<span){result[0]=mix(result[0],result[1],left/span);break;}left-=span;result.shift();}}
  if(trimStart)trim();result.reverse();if(trimEnd)trim();result.reverse();return result;
}

/** Exact intersections become choices; unrelated nearby roads never become a
 * shortcut across a garden or house. Doorsteps stop outside the wall face. */
export function buildResidentPathGraph(paths,membership){
  const segments=[],nodes=new Map(),edges=new Map(),pathCities=new Map();
  for(const path of paths){const city=path.cityId??membership.get(path.fromHouseId)??membership.get(path.toHouseId);if(city!=null)pathCities.set(path.id,city);}
  // Civic-to-civic routes inherit their network through an explicitly shared
  // endpoint, without using geometric proximity to jump between settlements.
  const endpointCities=new Map(membership);
  for(let pass=0;pass<2;pass++)for(const path of paths){const city=pathCities.get(path.id)??endpointCities.get(path.fromHouseId)??endpointCities.get(path.toHouseId);if(city==null)continue;
    pathCities.set(path.id,city);endpointCities.set(path.fromHouseId,city);endpointCities.set(path.toHouseId,city);}
  for(const path of paths){const cityId=pathCities.get(path.id);if(cityId==null)continue;const points=trimmedPoints(path.points??[],path);
    for(let index=1;index<points.length;index++){
      const a=points[index-1],b=points[index];if(distance(a,b)<epsilon)continue;
      segments.push({a,b,pathId:path.id,cityId,index,cuts:[0,1]});
    }
  }
  // Eight-unit bins keep graph rebuilding local as a town gains hundreds of
  // streets. This happens only on a settlement revision, never each frame.
  const buckets=new Map(),pairs=new Set(),cell=8;
  for(const [index,segment]of segments.entries()){
    const {a,b}=segment;
    for(let x=Math.floor(Math.min(a.x,b.x)/cell);x<=Math.floor(Math.max(a.x,b.x)/cell);x++)for(let z=Math.floor(Math.min(a.z,b.z)/cell);z<=Math.floor(Math.max(a.z,b.z)/cell);z++){
      const key=`${segment.cityId}:${x}:${z}`;if(!buckets.has(key))buckets.set(key,[]);const bucket=buckets.get(key);
      for(const otherIndex of bucket){const pair=`${otherIndex}:${index}`;if(pairs.has(pair))continue;pairs.add(pair);
        const other=segments[otherIndex];if(other.pathId===segment.pathId)continue;
        const rx=b.x-a.x,rz=b.z-a.z,sx=other.b.x-other.a.x,sz=other.b.z-other.a.z;
        const qx=other.a.x-a.x,qz=other.a.z-a.z,denominator=rx*sz-rz*sx;
        if(Math.abs(denominator)>epsilon){
          const t=(qx*sz-qz*sx)/denominator,u=(qx*rz-qz*rx)/denominator;
          if(t>=-epsilon&&t<=1+epsilon&&u>=-epsilon&&u<=1+epsilon&&Math.abs(mix(a,b,t).y-mix(other.a,other.b,u).y)<.12){segment.cuts.push(clamp(t,0,1));other.cuts.push(clamp(u,0,1));}
        }else if(Math.abs(qx*rz-qz*rx)<epsilon){
          // Shared doorstep strips may overlap before the routes diverge.
          const lengthSquared=rx*rx+rz*rz,otherLength=sx*sx+sz*sz;
          for(const p of [other.a,other.b]){const t=((p.x-a.x)*rx+(p.z-a.z)*rz)/lengthSquared;if(t>epsilon&&t<1-epsilon&&Math.abs(mix(a,b,t).y-p.y)<.12)segment.cuts.push(t);}
          for(const p of [a,b]){const u=((p.x-other.a.x)*sx+(p.z-other.a.z)*sz)/otherLength;if(u>epsilon&&u<1-epsilon&&Math.abs(mix(other.a,other.b,u).y-p.y)<.12)other.cuts.push(u);}
        }
      }
      bucket.push(index);
    }
  }
  function nodeAt(point,cityId){const id=`${cityId}:${pointKey(point)}`;if(!nodes.has(id))nodes.set(id,{id,cityId,...point,edges:[]});return nodes.get(id);}
  for(const segment of segments){segment.cuts.sort((a,b)=>a-b);for(let index=1;index<segment.cuts.length;index++){
    const from=segment.cuts[index-1],to=segment.cuts[index];if(to-from<epsilon)continue;
    const a=nodeAt(mix(segment.a,segment.b,from),segment.cityId),b=nodeAt(mix(segment.a,segment.b,to),segment.cityId);
    if(a.id===b.id)continue;const id=[a.id,b.id].sort().join('|');
    if(edges.has(id)){edges.get(id).pathIds.add(segment.pathId);continue;}
    const edge={id,a,b,cityId:segment.cityId,length:distance(a,b),pathIds:new Set([segment.pathId])};edges.set(id,edge);a.edges.push(edge);b.edges.push(edge);
  }}
  return {nodes,edges};
}

function nearestEdge(graph,point,cityId){let best=null;
  for(const edge of graph.edges.values())if(edge.cityId===cityId){const {a,b}=edge,dx=b.x-a.x,dz=b.z-a.z;
    const t=clamp(((point.x-a.x)*dx+(point.z-a.z)*dz)/(edge.length*edge.length),0,1),position=mix(a,b,t),error=distance(position,point);
    if(!best||error<best.error)best={edge,t,error,position};}
  return best;
}

class RouteHeap{
  constructor(){this.items=[];}
  push(item){const a=this.items;a.push(item);let i=a.length-1;while(i){const p=(i-1)>>1;if(a[p].score<=item.score)break;a[i]=a[p];i=p;}a[i]=item;}
  pop(){const a=this.items,first=a[0],last=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let child=i*2+1;if(child+1<a.length&&a[child+1].score<a[child].score)child++;if(a[child].score>=last.score)break;a[i]=a[child];i=child;}a[i]=last;}return first;}
  get length(){return this.items.length;}
}

function localRoute(from,to){
  if(from.id===to.id)return [];
  const queue=new RouteHeap(),seen=new Map([[from.id,{node:from,cost:0,parent:null,edge:null}]]);
  queue.push({...seen.get(from.id),score:distance(from,to)});let visits=0;
  while(queue.length&&visits++<RESIDENT_LIMITS.routeNodes){
    const current=queue.pop();if(current.cost!==seen.get(current.node.id)?.cost)continue;
    if(current.node.id===to.id){const route=[];for(let item=current;item.edge;item=item.parent)route.push(item.edge.id);return route.length<=RESIDENT_LIMITS.routeLength?route.reverse():null;}
    for(const edge of current.node.edges){const node=edge.a.id===current.node.id?edge.b:edge.a,cost=current.cost+edge.length,old=seen.get(node.id);
      if(old&&old.cost<=cost)continue;
      const entry={node,cost,parent:current,edge,score:cost+distance(node,to)};seen.set(node.id,entry);queue.push(entry);
    }
  }
  return null;
}

function routineDestinations(graph,paths,houses,buildings,membership,extraDestinations=[]){
  const destinations=new Map(),byCity=new Map(),entrances=new Map();
  for(const path of paths){const points=trimmedPoints(path.points??[],path),cityId=path.cityId??membership.get(path.fromHouseId)??membership.get(path.toHouseId);if(!points.length||cityId==null)continue;
    for(const [id,point]of [[path.fromHouseId,points[0]],[path.toHouseId,points.at(-1)]]){
      const node=graph.nodes.get(`${cityId}:${pointKey(point)}`);if(node&&!entrances.has(id))entrances.set(id,node);
    }
  }
  const add=target=>{destinations.set(target.id,target);if(!byCity.has(target.cityId))byCity.set(target.cityId,[]);byCity.get(target.cityId).push(target);};
  for(const item of [...houses,...buildings]){
    const cityId=membership.get(item.id)??item.cityId;if(cityId==null)continue;
    let node=entrances.get(item.id);
    if(!node){const nearest=nearestEdge(graph,item,cityId);if(nearest)node=distance(nearest.edge.a,item)<distance(nearest.edge.b,item)?nearest.edge.a:nearest.edge.b;}
    if(!node)continue;
    const kind=item.buildingType??'home';
    add({id:item.id,cityId,kind,nodeId:node.id,x:node.x,z:node.z,lookX:item.x,lookZ:item.z,heading:Math.atan2(item.x-node.x,item.z-node.z)});
  }
  // Farm errands belong to authored field-access paths, never to whichever
  // street happens to be closest across a hedge, crop bed or neighbouring town.
  for(const item of extraDestinations){
    const node=entrances.get(item.id);
    if(item.kind!=='farm'||!node||node.cityId!==item.cityId||destinations.has(item.id))continue;
    const lookX=item.lookX??item.x,lookZ=item.lookZ??item.z;
    add({id:item.id,cityId:item.cityId,kind:'farm',nodeId:node.id,x:node.x,z:node.z,lookX,lookZ,heading:Math.atan2(lookX-node.x,lookZ-node.z)});
  }
  for(const node of graph.nodes.values())if(node.edges.length>=3)add({id:`junction:${node.id}`,cityId:node.cityId,kind:'junction',nodeId:node.id,x:node.x,z:node.z,heading:0});
  // Small towns with a single through-road still have quiet places to stop
  // and look around, all of them on an existing path rather than in gardens.
  for(const [cityId,list]of byCity)if(!list.some(target=>target.kind==='junction')){
    const nodes=[...graph.nodes.values()].filter(node=>node.cityId===cityId&&node.edges.length===2);
    for(const node of nodes.slice(0,8))add({id:`junction:${node.id}`,cityId,kind:'junction',nodeId:node.id,x:node.x,z:node.z,heading:0});
  }
  return {destinations,byCity};
}

/** Stable residents take short, cosmetic errands on their own city's paths.
 * A globally bounded route budget spreads decisions across frames, while the
 * current segment, position and gait survive new streets and city merges. */
export function createSettlementResidentSimulation(world={}){
  let graph={nodes:new Map(),edges:new Map()},residents=new Map(),revision=0;
  let destinations=new Map(),byCity=new Map(),homes=new Map(),dark=false,routeBudget=0,routeSearches=0,visibilityRevision=0;
  const activityCounts={walking:0,lingering:0,chatting:0,entering:0,indoors:0,leaving:0};
  function enterEdge(resident,node,edge){
    if(!edge||!node.edges.includes(edge)){resident.moving=false;return false;}
    resident.edge=edge;resident.direction=edge.a.id===node.id?1:-1;resident.along=resident.direction===1?0:edge.length;return true;
  }
  function setDestination(resident,target){
    resident.destinationId=target?.id??null;resident.destinationKind=target?.kind??null;resident.route=[];
    resident.activity=dark?'heading-home':'walking';resident.arrived=false;
  }
  function chooseDestination(resident,node){
    const home=destinations.get(resident.houseId),choices=(byCity.get(resident.cityId)??[]).filter(target=>
      target.id!==resident.destinationId&&target.nodeId!==node.id&&(!home||distance(target,home)<=RESIDENT_LIMITS.routineRadius));
    if(dark){setDestination(resident,home);return;}
    const weighted=choices.map(target=>({target,weight:target.kind==='home'?(target.id===resident.houseId? .3:.7):
      target.kind==='market'?2.8:target.kind==='farm'?2.6:target.kind==='well'?2.1:target.kind==='plaza'?2.5:target.kind==='junction'?1.25:1.6}));
    if(!weighted.length){setDestination(resident,home);resident.wait=2+random(resident)*3;return;}
    let roll=random(resident)*weighted.reduce((sum,item)=>sum+item.weight,0),target=weighted.at(-1).target;
    for(const item of weighted){roll-=item.weight;if(roll<=0){target=item.target;break;}}
    setDestination(resident,target);
  }
  function homePassage(resident){
    const home=homes.get(resident.houseId),target=destinations.get(resident.houseId),node=graph.nodes.get(target?.nodeId);
    if(!home||!node)return null;
    const door={...settlementDoor(world,home),y:(home.y??0)+RESIDENT_LIMITS.doorstepHeight};
    // Only the short, known doorway approach can leave the street graph. A
    // missing entrance must never send someone through a neighbour's garden.
    if(distance(door,node)>.85)return null;
    const inside={...settlementDoor(world,home,RESIDENT_LIMITS.indoorOffset),y:door.y};
    return {entry:{x:node.x,y:node.y,z:node.z},door,inside};
  }
  function beginEntering(resident){
    const passage=homePassage(resident);
    if(!passage){resident.activity='lingering';resident.wait=4;return false;}
    resident.portal={mode:'entering',points:[passage.entry,passage.door,passage.inside],index:0};
    resident.activity='entering';resident.wait=0;resident.route=[];resident.lookHeading=null;return true;
  }
  function beginLeaving(resident){
    const passage=homePassage(resident);if(!passage){resident.wait=1;return false;}
    resident.portal={mode:'leaving',points:[passage.door,passage.entry],index:0};
    resident.indoors=false;visibilityRevision++;resident.activity='leaving';resident.arrived=false;resident.lookHeading=null;return true;
  }
  function finishPassage(resident,mode){
    resident.portal=null;
    if(mode==='entering'){
      resident.indoors=true;visibilityRevision++;resident.activity='indoors';resident.wait=dark?0:1+random(resident)*7;
      resident.lookHeading=null;return;
    }
    // Growth can split the old doorway segment or rename its city. Reattach
    // only at the very same point; never snap from a doorway to a new street.
    const match=nearestEdge(graph,resident,resident.cityId);
    if(match&&match.error<.0002&&Math.abs(match.position.y-resident.y)<.002){
      resident.edge=match.edge;resident.along=match.t*match.edge.length;resident.direction=match.t>.5?-1:1;
    }else resident.edge=null;
    resident.route=[];resident.destinationId=null;resident.destinationKind=null;resident.arrived=false;
    resident.activity=dark?'heading-home':'walking';resident.lookHeading=null;resident.wait=0;
  }
  function advancePassage(resident,remaining){
    let travelled=0;
    while(resident.portal&&remaining>epsilon){
      const portal=resident.portal,target=portal.points[portal.index],span=spatialDistance(resident,target);
      if(span<=epsilon){if(++portal.index>=portal.points.length)finishPassage(resident,portal.mode);continue;}
      const speed=resident.speed*.94,advance=Math.min(span,speed*remaining),next=mix(resident,target,advance/span);
      if(distance(resident,target)>epsilon)resident.lookHeading=Math.atan2(target.x-resident.x,target.z-resident.z);
      Object.assign(resident,next);remaining-=advance/speed;travelled+=advance;
      if(advance>=span-epsilon&&++portal.index>=portal.points.length)finishPassage(resident,portal.mode);
    }
    return {remaining,travelled};
  }
  function arrive(resident,target){
    resident.arrived=true;resident.route=[];resident.lookHeading=target.lookX===undefined?target.heading:Math.atan2(target.lookX-resident.x,target.lookZ-resident.z);
    if(dark&&target.id===resident.houseId){beginEntering(resident);return;}
    resident.activity='lingering';
    const duration=target.kind==='market'?[4,8]:target.kind==='farm'?[5,9]:target.kind==='well'?[2,5]:target.kind==='plaza'?[5,10]:target.kind==='junction'?[2,5]:target.kind==='home'?[1,4]:[3,6];
    resident.wait=(duration[0]+random(resident)*duration[1])*resident.tempo;
    if(target.kind==='junction')resident.lookHeading=resident.heading+(random(resident)-.5)*Math.PI;
  }
  function leaveNode(resident,node){
    let target=destinations.get(resident.destinationId);
    if(!target||target.cityId!==resident.cityId||resident.arrived){chooseDestination(resident,node);target=destinations.get(resident.destinationId);}
    if(!target){resident.wait=1;return false;}
    if(target.nodeId===node.id){arrive(resident,target);return false;}
    let edge=resident.route.length?graph.edges.get(resident.route[0]):null;
    if(!edge||!node.edges.includes(edge)){
      resident.route=[];
      if(!routeBudget){resident.wait=.08;return false;}
      routeBudget--;routeSearches++;
      const goal=graph.nodes.get(target.nodeId),route=goal?localRoute(node,goal):null;
      if(!route){
        // An unreachable or removed destination never pulls someone across a
        // lawn. Try a different daytime errand after a short stationary pause.
        resident.arrived=!dark;resident.wait=dark?4:1+random(resident)*2;return false;
      }
      resident.route=route;edge=graph.edges.get(route[0]);
    }
    resident.route.shift();return enterEdge(resident,node,edge);
  }
  function sync({houses=[],paths=[],cities,buildings=[],destinations:extraDestinations=[]}={}){
    const membership=eligibleHomes(houses,cities);homes=new Map(houses.map(home=>[home.id,home]));graph=buildResidentPathGraph(paths,membership);const alive=new Set();
    ({destinations,byCity}=routineDestinations(graph,paths,houses,buildings,membership,extraDestinations));
    for(const house of houses){const cityId=membership.get(house.id);if(cityId==null)continue;const id=`resident:${house.id}`;alive.add(id);
      let resident=residents.get(id);
      if(resident){resident.cityId=cityId;resident.route=resident.route.filter(edge=>graph.edges.has(edge));
        if(resident.indoors||resident.portal)continue;
        if(!resident.onRoad){const start=nearestEdge(graph,house,cityId);if(start){Object.assign(resident,start.position);resident.edge=start.edge;resident.along=start.t*start.edge.length;resident.direction=start.t>.5?-1:1;resident.onRoad=true;}continue;}
        const same=resident.edge&&graph.edges.get(resident.edge.id);
        if(same)resident.edge=same;
        else{const match=nearestEdge(graph,resident,cityId),previousEdge=resident.edge,previousDirection=resident.direction;
          if(match&&match.error<.0002&&Math.abs(match.position.y-resident.y)<.002){resident.edge=match.edge;resident.along=match.t*match.edge.length;
            const heading=Math.atan2(match.edge.b.x-match.edge.a.x,match.edge.b.z-match.edge.a.z);
            const previousHeading=previousEdge?Math.atan2((previousEdge.b.x-previousEdge.a.x)*previousDirection,(previousEdge.b.z-previousEdge.a.z)*previousDirection):resident.heading;
            resident.direction=Math.cos(heading-previousHeading)>=0?1:-1;resident.route=[];}
        }
        continue;
      }
      const seed=hash(`${world.seed??'island'}:${id}`)||1;
      resident={id,houseId:house.id,cityId,randomState:seed,x:house.x,y:house.y??0,z:house.z,heading:house.rotation??0,
        edge:null,along:0,direction:1,wait:0,phase:0,moving:false,distance:0,onRoad:false,route:[],destinationId:null,destinationKind:null,
        activity:'lingering',arrived:false,idleTime:0,lookHeading:null,nightDelay:0,indoors:false,portal:null};
      resident.speed=.58+random(resident)*.32;resident.wait=random(resident)*1.8;resident.phase=random(resident)*Math.PI*2;
      resident.tempo=.85+random(resident)*.3;resident.arrivalOffset=.18+random(resident)*.7;
      const start=nearestEdge(graph,house,cityId);
      if(start){Object.assign(resident,start.position);resident.edge=start.edge;resident.along=start.t*start.edge.length;resident.onRoad=true;
        resident.direction=start.t>.5?-1:1;resident.heading=Math.atan2((start.edge.b.x-start.edge.a.x)*resident.direction,(start.edge.b.z-start.edge.a.z)*resident.direction);}
      residents.set(id,resident);
    }
    for(const id of residents.keys())if(!alive.has(id))residents.delete(id);revision++;
  }
  function update(dt,{night=0,dayPhase}={}){
    if(!Number.isFinite(dt)||dt<=0)return;
    const nextDark=dayPhase?dayPhase==='night':night>(dark?.35:.65);
    if(nextDark!==dark){dark=nextDark;for(const resident of residents.values()){
      resident.route=[];resident.nightDelay=dark?random(resident)*6:0;
      if(resident.indoors){resident.wait=dark?0:1+random(resident)*7;continue;}
      if(resident.portal)continue;
      resident.arrived=false;resident.destinationId=null;resident.destinationKind=null;
      resident.wait=dark?Math.min(resident.wait,resident.nightDelay):1+random(resident)*7;resident.activity=dark?'heading-home':'lingering';
    }}
    const elapsed=Math.min(dt,.5);routeBudget=RESIDENT_LIMITS.routeBudget;routeSearches=0;
    for(const resident of residents.values()){
      let remaining=elapsed,travelled=0;resident.moving=false;resident.idleTime+=elapsed;resident.nightDelay=Math.max(0,resident.nightDelay-elapsed);
      if(dark&&!resident.indoors&&!resident.portal&&resident.nightDelay===0&&resident.destinationId!==resident.houseId)setDestination(resident,destinations.get(resident.houseId));
      // A stopped resident remains at the node until their visit or route
      // request is ready; no zero-distance loops or abrupt sideways movement.
      while(remaining>epsilon){
        if(resident.indoors&&dark)break;
        if(resident.wait>0){const pause=Math.min(resident.wait,remaining);resident.wait-=pause;remaining-=pause;if(remaining<epsilon)break;}
        if(resident.indoors&&!beginLeaving(resident))break;
        if(resident.portal){const result=advancePassage(resident,remaining);remaining=result.remaining;travelled+=result.travelled;continue;}
        const edge=resident.edge;if(!edge)break;
        const available=resident.direction>0?edge.length-resident.along:resident.along;
        if(available<=epsilon){
          const oldNode=resident.direction>0?edge.b:edge.a,node=graph.nodes.get(oldNode.id);
          if(!node){resident.edge=null;break;}
          if(!leaveNode(resident,node))continue;
          resident.activity=dark?'heading-home':'walking';resident.lookHeading=null;continue;
        }
        const target=destinations.get(resident.destinationId),toward=resident.direction>0?edge.b:edge.a;
        const stop=target?.nodeId===toward.id&&!resident.arrived?Math.min(resident.arrivalOffset,edge.length*.65):0;
        if(stop&&available<=stop+epsilon){arrive(resident,target);continue;}
        const speed=resident.speed*(dark?.94:1),advance=Math.min(available-stop,speed*remaining);
        resident.along+=advance*resident.direction;remaining-=advance/speed;travelled+=advance;
        const t=clamp(resident.along/edge.length,0,1);resident.x=edge.a.x+(edge.b.x-edge.a.x)*t;resident.y=edge.a.y+(edge.b.y-edge.a.y)*t;resident.z=edge.a.z+(edge.b.z-edge.a.z)*t;
      }
      resident.moving=travelled>epsilon;resident.distance+=travelled;resident.phase+=travelled*Math.PI*2/.43;
      const edge=resident.edge,target=resident.lookHeading??(edge?Math.atan2((edge.b.x-edge.a.x)*resident.direction,(edge.b.z-edge.a.z)*resident.direction):resident.heading);
      resident.heading+=wrap(target-resident.heading)*(1-Math.exp(-elapsed*8));
    }
    // Conversations use small local bins and at most eight neighbours. They
    // turn people toward one another without adding actors, props or errands.
    const waiting=new Map();
    for(const resident of residents.values())if(!dark&&!resident.indoors&&!resident.portal&&!resident.moving&&resident.wait>.2&&resident.arrived){
      resident.activity='lingering';
      const key=`${resident.cityId}:${Math.floor(resident.x/2)}:${Math.floor(resident.z/2)}`;
      if(!waiting.has(key))waiting.set(key,[]);if(waiting.get(key).length<8)waiting.get(key).push(resident);
    }
    for(const resident of residents.values())if(!dark&&resident.activity==='lingering'&&resident.arrived){
      let partner=null;const x=Math.floor(resident.x/2),z=Math.floor(resident.z/2);
      for(let dx=-1;dx<=1&&!partner;dx++)for(let dz=-1;dz<=1&&!partner;dz++)for(const other of waiting.get(`${resident.cityId}:${x+dx}:${z+dz}`)??[]){
        const gap=distance(resident,other);if(other!==resident&&gap>.12&&gap<1.5){partner=other;break;}
      }
      if(partner){resident.activity='chatting';resident.lookHeading=Math.atan2(partner.x-resident.x,partner.z-resident.z);}
    }
    for(const key of Object.keys(activityCounts))activityCounts[key]=0;
    for(const resident of residents.values())activityCounts[resident.activity==='heading-home'?'walking':resident.activity]=(activityCounts[resident.activity==='heading-home'?'walking':resident.activity]??0)+1;
  }
  return {sync,update,get residents(){return residents;},get graph(){return graph;},get revision(){return revision;},
    get visibilityRevision(){return visibilityRevision;},
    get stats(){return {night:dark,indoors:activityCounts.indoors,routeSearches,activities:{...activityCounts}};},
    snapshot(){return [...residents.values()].map(({edge,randomState,route,lookHeading,portal,...resident})=>({...resident,transition:portal?.mode??null,pathIds:edge?[...edge.pathIds]:[],edgeId:edge?.id??null}));},
    dispose(){residents.clear();destinations.clear();byCity.clear();homes.clear();graph={nodes:new Map(),edges:new Map()};}};
}

/** Two fixed-capacity instanced draws replace a scene hierarchy per citizen.
 * The head and coat reuse the same .75-unit passenger template as stations. */
export function createSettlementResidents(parent,world,{ownerId=world.gameplay?.ownerId,simulation:externalSimulation}={}){
  const root=new THREE.Group();root.name='settlement-residents';parent.add(root);
  const owner=world.players?.find(player=>player.id===ownerId),palette=createPlayerPalette(owner),template=new THREE.Group();
  const model=person(template,{color:palette.body});model.remove(model.children[0],model.children[1]);
  bakeMaterialColors(consolidate(template));const bodySource=template.children[0];
  const body=new THREE.InstancedMesh(bodySource.geometry,bodySource.material,RESIDENT_LIMITS.visible);body.name='resident-bodies';
  const limbMaterial=applySceneStyle(new THREE.MeshStandardMaterial({color:0xffffff,roughness:1,flatShading:true}));
  const limbs=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),limbMaterial,RESIDENT_LIMITS.visible*4);limbs.name='resident-limbs';
  for(const mesh of [body,limbs]){mesh.count=0;mesh.frustumCulled=false;mesh.castShadow=mesh.receiveShadow=true;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);root.add(mesh);}
  for(let index=0;index<RESIDENT_LIMITS.visible*4;index++)limbs.setColorAt(index,index%2?palette.body.color:M.metal.color);
  const simulation=externalSimulation??createSettlementResidentSimulation(world),pose=new THREE.Matrix4(),part=new THREE.Object3D(),matrix=new THREE.Matrix4();
  const selected=[],candidates=[],gaitWeights=new Map();let selectionAge=Infinity,previousFocus=null,previousRadius=0,rendered=0,visibilityRevision=-1;
  function select(focus,radius){candidates.length=0;
    for(const resident of simulation.residents.values())if(resident.edge&&!resident.indoors){const d=surfaceDistance(world,focus,resident);if(d<radius)candidates.push({resident,d});}
    candidates.sort((a,b)=>a.d-b.d);selected.length=0;
    for(let i=0;i<Math.min(RESIDENT_LIMITS.visible,candidates.length);i++)selected.push(candidates[i].resident);
    previousFocus={x:focus.x,z:focus.z};previousRadius=radius;selectionAge=0;
  }
  function sync(snapshot){simulation.sync(snapshot);selectionAge=Infinity;}
  function update(dt,{focus={x:0,z:0},mapBlend=0,walkingWeight=0,visible=true,reducedMotion=false,night=0,dayPhase,unavailableHomes}={}){
    if(!externalSimulation)simulation.update(dt,{night,dayPhase});selectionAge+=dt;
    root.visible=visible&&mapBlend<.98;if(!root.visible){rendered=0;return;}
    const radius=walkingWeight>.5?RESIDENT_LIMITS.walkingRadius:RESIDENT_LIMITS.detailRadius;
    if(visibilityRevision!==simulation.visibilityRevision||selectionAge>=RESIDENT_LIMITS.selectionInterval||!previousFocus||previousRadius!==radius||surfaceDistance(world,focus,previousFocus)>3)select(focus,radius);
    visibilityRevision=simulation.visibilityRevision;
    let index=0,limbIndex=0;
    for(const resident of selected){
      if(resident.indoors||unavailableHomes?.has?.(resident.houseId))continue;
      rigidSurfacePoseMatrix(world,resident.x,resident.y+.012,resident.z,resident.heading,pose);body.setMatrixAt(index++,pose);
      const previous=gaitWeights.get(resident.id)??0,target=resident.moving?1:0;
      const weight=reducedMotion?0:previous+(target-previous)*(1-Math.exp(-Math.max(0,dt)*12));
      if(!gaitWeights.has(resident.id)&&gaitWeights.size>=RESIDENT_LIMITS.visible*2)gaitWeights.delete(gaitWeights.keys().next().value);
      gaitWeights.set(resident.id,weight);
      const stride=Math.sin(resident.phase)*.27*weight;
      for(const side of [-1,1]){
        // Pivot each straight leg at the hip; the ankle stays attached and the
        // small pendulum motion has no exaggerated knee lift or body bounce.
        const swing=stride*side;
        part.position.set(side*.055,.32-Math.cos(swing)*.16,-Math.sin(swing)*.16);part.rotation.set(swing,0,0);part.scale.set(.075,.32,.10);part.updateMatrix();
        matrix.copy(pose).multiply(part.matrix);limbs.setMatrixAt(limbIndex++,matrix);
        const greeting=resident.activity==='working'?(side===1||resident.workKind==='food'?residentWorkSwing(resident,reducedMotion):-.12):!reducedMotion&&resident.activity==='chatting'&&side===1?-.28+Math.sin(resident.idleTime*2.2)*.08:0;
        const armSwing=resident.carrying?-.72:-swing*.65+greeting;
        part.position.set(side*.143,.53-Math.cos(armSwing)*.105,-Math.sin(armSwing)*.105);part.rotation.set(armSwing,0,side*-.035);part.scale.set(.052,.21,.075);part.updateMatrix();
        matrix.copy(pose).multiply(part.matrix);limbs.setMatrixAt(limbIndex++,matrix);
      }
    }
    body.count=rendered=index;limbs.count=limbIndex;body.instanceMatrix.needsUpdate=limbs.instanceMatrix.needsUpdate=true;
  }
  return {root,body,limbs,sync,update,snapshot:()=>simulation.snapshot(),
    get stats(){return {residents:simulation.residents.size,visible:rendered,edges:simulation.graph?.edges.size??0,revision:simulation.revision,draws:rendered?2:0,...simulation.stats};},
    dispose(){if(!externalSimulation)simulation.dispose();root.removeFromParent();body.dispose();limbs.dispose();body.geometry.dispose();limbs.geometry.dispose();
      for(const material of template.userData.ownedMaterials??[])material.dispose();limbMaterial.dispose();Object.values(palette).forEach(material=>material.dispose());selected.length=candidates.length=0;gaitWeights.clear();},
  };
}
