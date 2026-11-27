import {isHarvestableWood,woodSourceId} from './harvestable-wood.js';
import {surfaceDisplacement,surfaceOffset} from './world-surface.js';

export const SETTLEMENT_PATH=Object.freeze({width:.45,houseWidth:2.2,houseDepth:2.2,
  doorOffset:.9,landingOffset:1.52,clearance:.04,step:.45,maxSlope:.32,sampleSpacing:.18,maxNodes:3200});
const BLOCKING=new Set(['house','tree','rock','farm','cactus','landmark','station','apartment','civic','tower']);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const finitePoint=point=>Number.isFinite(point?.x)&&Number.isFinite(point?.z);
const radiusOf=item=>item.radius??({tree:.85,rock:.6,cactus:.7,landmark:2,station:3.42,apartment:2.05,civic:2.8,tower:2.1}[item.kind]??1)*(item.scale??1);

/** Civic frontages look toward the local homes at placement time. Their
 * saved yaw stays fixed as the centre of mass moves with later growth. */
export function settlementCenterFacing(world,point,homes){
  if(!homes.length)return 0;
  let x=0,z=0;
  for(const home of homes){const delta=surfaceDisplacement(world,point,home);x+=delta.x;z+=delta.z;}
  return Math.hypot(x,z)>1e-7?Math.atan2(x,z):(homes[0].rotation??0);
}

/** A square lot follows the traveller's facing. Only the choice of frontage
 * changes: four quarter-turns preserve exactly the same corners. A saved seed
 * gives each placement its own preference without frame-to-frame randomness. */
export function settlementHouseRotation(world,point,homes,{heading=0,seed=world.seed??0,placement=0}={}){
  const axis=Number.isFinite(heading)?heading:0;
  let value=2166136261;
  for(const letter of `${seed}:${placement}:frontage`){value^=letter.charCodeAt(0);value=Math.imul(value,16777619);}
  // Final avalanche keeps adjacent placement numbers and seeds decorrelated.
  value^=value>>>16;value=Math.imul(value,0x7feb352d);value^=value>>>15;value=Math.imul(value,0x846ca68b);value^=value>>>16;
  const draw=(value>>>0)/4294967296,center=settlementCenterFacing(world,point,homes);
  const weights=Array.from({length:4},(_,quarter)=>homes.length?Math.exp(1.45*Math.cos(axis+quarter*Math.PI/2-center)):1);
  let remaining=draw*weights.reduce((sum,weight)=>sum+weight,0);
  for(let quarter=0;quarter<4;quarter++){
    remaining-=weights[quarter];if(remaining<=0||quarter===3)return axis+quarter*Math.PI/2;
  }
}

export function settlementDoor(world,house,offset=house.doorOffset??SETTLEMENT_PATH.doorOffset){
  const angle=house.rotation??0;
  return surfaceOffset(world,house.x,house.z,Math.sin(angle)*offset,Math.cos(angle)*offset);
}

const footprintDimensions=item=>({width:item.width??SETTLEMENT_PATH.houseWidth,depth:item.depth??SETTLEMENT_PATH.houseDepth});
const landingOffset=item=>Math.max((item.depth??SETTLEMENT_PATH.houseDepth)/2+.42,(item.doorOffset??SETTLEMENT_PATH.doorOffset)+.35);

export function sampleSettlementPath(points,visit,spacing=SETTLEMENT_PATH.sampleSpacing){
  for(let segment=1;segment<points.length;segment++){
    const a=points[segment-1],b=points[segment],steps=Math.max(1,Math.ceil(distance(a,b)/spacing));
    for(let i=segment===1?0:1;i<=steps;i++){
      const t=i/steps;
      if(visit({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t})===false)return false;
    }
  }
  return true;
}

/** Returns true when a proposed foundation covers an established walking
 * route. Paths may meet/cross each other; they never become building lots. */
export function houseBlocksSettlementPath(world,house,path,gap=.12){
  const {width,depth}=footprintDimensions(house),scale=house.scale??1,halfWidth=width*scale/2,halfDepth=depth*scale/2;
  const margin=(path.width??SETTLEMENT_PATH.width)/2+gap,c=Math.cos(house.rotation??0),s=Math.sin(house.rotation??0);
  return !sampleSettlementPath(path.points,point=>{
    const delta=surfaceDisplacement(world,house,point),x=delta.x*c-delta.z*s,z=delta.x*s+delta.z*c;
    const dx=Math.max(0,Math.abs(x)-halfWidth),dz=Math.max(0,Math.abs(z)-halfDepth);
    return dx*dx+dz*dz>=margin*margin;
  });
}

class MinHeap{
  constructor(){this.items=[];}
  push(item){const a=this.items;a.push(item);let i=a.length-1;
    while(i){const p=(i-1)>>1;if(a[p].score<=item.score)break;a[i]=a[p];i=p;}a[i]=item;}
  pop(){const a=this.items,first=a[0],last=a.pop();if(a.length){let i=0;
    while(i*2+1<a.length){let child=i*2+1;if(child+1<a.length&&a[child+1].score<a[child].score)child++;
      if(a[child].score>=last.score)break;a[i]=a[child];i=child;}a[i]=last;}return first;}
  get length(){return this.items.length;}
}

/** A small local router: direct clear frontages are a single segment; a bounded
 * eight-neighbour search handles a tree, another house, or a shallow bay.
 * Line-of-sight simplification removes grid stair-steps without cutting corners.
 * This remains pure data, so detailed and overhead views share the same path. */
export function planSettlementPath(world,from,to,{placements=[],surfaceAt,removedTreeIds=new Set(),width=SETTLEMENT_PATH.width,maxNodes=SETTLEMENT_PATH.maxNodes}={}){
  if(!finitePoint(from)||!finitePoint(to)||typeof surfaceAt!=='function')return null;
  const start=settlementDoor(world,from,landingOffset(from)),end=settlementDoor(world,to,landingOffset(to));
  const doorA=settlementDoor(world,from),doorB=settlementDoor(world,to),margin=width/2+SETTLEMENT_PATH.clearance;
  const pad=4,minX=Math.min(start.x,end.x)-pad,maxX=Math.max(start.x,end.x)+pad;
  const minZ=Math.min(start.z,end.z)-pad,maxZ=Math.max(start.z,end.z)+pad;
  const obstacles=[],seenIds=new Set();
  for(const item of [from,to,...placements]){
    if(!finitePoint(item)||!(BLOCKING.has(item.kind)||item.kind==='nature'&&item.style==='outcrop'))continue;
    if(item.id!=null&&seenIds.has(item.id))continue;if(item.id!=null)seenIds.add(item.id);
    if(isHarvestableWood(item)&&removedTreeIds.has(woodSourceId(item)))continue;
    // Keep whole tree canopies free so the route reads clearly from above too.
    const rectangle=item.kind==='house'||['farm','civic'].includes(item.kind)&&item.width&&item.depth;
    const dimensions=rectangle?footprintDimensions(item):null,scale=item.scale??1;
    const radius=rectangle?Math.hypot(dimensions.width,dimensions.depth)*scale/2:radiusOf(item);
    if(item.x+radius<minX||item.x-radius>maxX||item.z+radius<minZ||item.z-radius>maxZ)continue;
    obstacles.push({item,rectangle,radius:radius+margin,c:Math.cos(item.rotation??0),s:Math.sin(item.rotation??0),
      halfWidth:(dimensions?.width??0)*scale/2,
      halfDepth:(dimensions?.depth??0)*scale/2});
  }
  const terrainCache=new Map(),clearanceCache=new Map();
  const pointKey=(x,z)=>`${Math.round(x*1e6)}:${Math.round(z*1e6)}`;
  function terrainAt(x,z){const key=pointKey(x,z);if(!terrainCache.has(key))terrainCache.set(key,surfaceAt(x,z));return terrainCache.get(key);}
  function clearPoint(point,ignored){
    const key=pointKey(point.x,point.z);
    if(!ignored&&clearanceCache.has(key))return clearanceCache.get(key);
    const result=checkPoint(point,ignored);if(!ignored)clearanceCache.set(key,result);return result;
  }
  function checkPoint(point,ignored){
    for(const obstacle of obstacles){
      if(ignored===obstacle.item)continue;
      const {item,c,s}=obstacle,delta=surfaceDisplacement(world,item,point);
      if(obstacle.rectangle){
        const x=delta.x*c-delta.z*s,z=delta.x*s+delta.z*c;
        const dx=Math.max(0,Math.abs(x)-obstacle.halfWidth),dz=Math.max(0,Math.abs(z)-obstacle.halfDepth);
        if(dx*dx+dz*dz<margin*margin)return false;
      }else if(delta.x*delta.x+delta.z*delta.z<obstacle.radius*obstacle.radius)return false;
    }
    let min=Infinity,max=-Infinity;
    for(const [dx,dz] of [[0,0],[width/2,0],[-width/2,0],[0,width/2],[0,-width/2]]){
      const ground=terrainAt(point.x+dx,point.z+dz);
      if(!ground||!Number.isFinite(ground.height)||!['ground','mountain'].includes(ground.type))return false;
      min=Math.min(min,ground.height);max=Math.max(max,ground.height);
    }
    return max-min<=width*SETTLEMENT_PATH.maxSlope;
  }
  function clearSegment(a,b,ignored){
    let previous=null;
    return sampleSettlementPath([a,b],point=>{
      if(!clearPoint(point,ignored))return false;
      const height=terrainAt(point.x,point.z).height;
      if(previous&&Math.abs(height-previous.height)>distance(point,previous)*SETTLEMENT_PATH.maxSlope+.008)return false;
      previous={...point,height};return true;
    });
  }
  // The short doorstep strip is allowed to touch its own foundation only.
  if(!clearSegment(doorA,start,from)||!clearSegment(end,doorB,to))return null;
  let route;
  if(clearSegment(start,end))route=[start,end];
  else{
    const step=SETTLEMENT_PATH.step,nodes=new Map(),queue=new MinHeap(),key=(ix,iz)=>`${ix}:${iz}`;
    const initial={x:start.x,z:start.z,ix:0,iz:0,cost:0,score:distance(start,end),parent:null};
    nodes.set('0:0',initial);queue.push(initial);let found=null,visited=0;
    while(queue.length&&visited++<maxNodes){
      const current=queue.pop();if(current.closed||nodes.get(key(current.ix,current.iz))!==current)continue;current.closed=true;
      if(distance(current,end)<=step*1.5&&clearSegment(current,end)){found=current;break;}
      for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
        if(!dx&&!dz)continue;
        const ix=current.ix+dx,iz=current.iz+dz,id=key(ix,iz),x=start.x+ix*step,z=start.z+iz*step;
        if(x<minX||x>maxX||z<minZ||z>maxZ)continue;
        const old=nodes.get(id);if(old?.closed||old?.blocked)continue;
        const next=old??{x,z,ix,iz};
        if(!old&&!clearPoint(next)){next.blocked=true;nodes.set(id,next);continue;}
        const cost=current.cost+Math.hypot(dx,dz)*step;
        if(old&&cost>=old.cost)continue;
        if(!clearSegment(current,next))continue;
        const updated={x,z,ix,iz,cost,score:cost+distance(next,end),parent:current};
        nodes.set(id,updated);queue.push(updated);
      }
    }
    if(!found)return null;
    const reverse=[end];for(let node=found;node;node=node.parent)reverse.push({x:node.x,z:node.z});
    const raw=reverse.reverse();route=[raw[0]];
    for(let index=0;index<raw.length-1;){let next=raw.length-1;
      while(next>index+1&&!clearSegment(raw[index],raw[next]))next--;
      route.push(raw[next]);index=next;
    }
  }
  const points=[doorA,...route,doorB].filter((point,index,array)=>!index||distance(point,array[index-1])>.001)
    .map(point=>({x:point.x,y:terrainAt(point.x,point.z).height+.015,z:point.z}));
  return {id:`path:${from.id??'preview'}:${to.id}`,fromHouseId:from.id??'preview',toHouseId:to.id,width,points};
}
