import { sampleLine } from './world-model.js';
import { sampleAlignmentInto } from './alignments.js';
import { createTraffic } from './traffic.js';

const SPACING = 2.64;
const HALF_LENGTH = 3.84;
const HALF_CAR = 1.20;
const HALF_WIDTH = .56;
const STEP = .05;
const modulo = (x, length) => ((x % length) + length) % length;
const key = (lineId, direction) => `${lineId}:${direction}`;

function trainOwner(world,id,homeCityId,line){
  const ownerId=world.trainOwners?.[id]??line?.ownerId
    ??world.cities.find(city=>city.id===homeCityId)?.ownerId??world.players?.[0]?.id??null;
  if(ownerId!==null&&world.players&&!world.players.some(player=>player.id===ownerId))
    throw new TypeError(`Invalid world: train ${id} references an unknown player`);
  return ownerId;
}

const pose = () => ({x:0,y:0,z:0,distance:0,tangent:{x:0,y:0,z:1},angle:0,heading:0,curvature:0,lineId:null});

function sampleLineInto(line, distance, out) {
  if(line.alignment)return sampleAlignmentInto(line.alignment,distance,out);
  const s=Math.max(0,Math.min(line.length,distance)),points=line.points,distances=line.distances;
  let lo=0,hi=points.length-1;
  while(lo+1<hi){const mid=(lo+hi)>>1;if(distances[mid]<=s)lo=mid;else hi=mid;}
  const a=points[lo],b=points[hi],span=distances[hi]-distances[lo],t=span>1e-9?(s-distances[lo])/span:0;
  const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,len=Math.hypot(dx,dy,dz)||1;
  out.x=a.x+dx*t;out.y=a.y+dy*t;out.z=a.z+dz*t;out.distance=s;
  out.tangent.x=dx/len;out.tangent.y=dy/len;out.tangent.z=dz/len;out.curvature=undefined;
  out.heading=Math.atan2(dz,dx);out.angle=Math.atan2(dx,dz);return out;
}

/** Arc length stays continuous through every city and around the closing seam.
 * Pass an output pose to avoid allocating while sampling thousands of cars. */
export function sampleNetworkPath(path, distance, out=pose()) {
  out.tangent??={x:0,y:0,z:0};
  const s=path.closed?modulo(distance,path.length):Math.max(0,Math.min(path.length,distance));
  const segments=path.segments;let lo=0,hi=segments.length-1;
  while(lo<hi){const mid=(lo+hi)>>1;if(s>=segments[mid].start+segments[mid].length-1e-9)lo=mid+1;else hi=mid;}
  const segment=segments[lo],local=Math.max(0,Math.min(segment.length,s-segment.start));
  sampleLineInto(segment.line,segment.direction>0?local:segment.length-local,out);
  out.distance=s;out.tangent.x*=segment.direction;out.tangent.y*=segment.direction;out.tangent.z*=segment.direction;
  out.heading=Math.atan2(out.tangent.z,out.tangent.x);out.angle=Math.atan2(out.tangent.x,out.tangent.z);
  if(Number.isFinite(out.curvature))out.curvature*=segment.direction;
  out.lineId=segment.lineId;return out;
}

function makePath(states, index, closed = true) {
  let length = 0;
  const segments = states.map(state => {
    const segment = { line: state.line, lineId: state.line.id, direction: state.direction,
      start: length, length: state.line.length };
    length += segment.length;
    return segment;
  });
  return { id: `circuit-${index + 1}`, segments, length, closed };
}

function mainCircuits(world) {
  const lines = new Map(world.lines.map(line => [line.id, line]));
  if(world.traffic?.circuits){
    if(!Array.isArray(world.traffic.circuits))throw new TypeError('Traffic circuits must be an array');
    const ids=new Set();
    return world.traffic.circuits.map((circuit,index)=>{
      if(!Array.isArray(circuit.segments)||circuit.segments.length<2)throw new TypeError('A traffic circuit needs at least two segments');
      const states=circuit.segments.map(segment=>{
        const line=lines.get(segment.lineId),direction=segment.direction??1;
        if(!line||(direction!==1&&direction!==-1))throw new TypeError('Traffic circuit references an invalid line or direction');
        return{line,direction};
      });
      const path=makePath(states,index);path.id=String(circuit.id??path.id);
      if(ids.has(path.id))throw new TypeError('Traffic circuit IDs must be unique');ids.add(path.id);
      for(let i=0;i<states.length;i++){
        const a=states[i],b=states[(i+1)%states.length],end=sampleLine(a.line,a.direction>0?a.line.length:0),start=sampleLine(b.line,b.direction>0?0:b.line.length);
        const dot=(end.tangent.x*start.tangent.x+end.tangent.z*start.tangent.z)*a.direction*b.direction;
        if(Math.hypot(end.x-start.x,end.z-start.z)>1e-4||dot<.9999)throw new TypeError('Traffic circuit segments must meet with continuous tangents');
      }
      return path;
    });
  }
  const lineArea=new Map(world.lines.map(line=>{
    let area=0;for(let i=1;i<line.points.length;i++){const a=line.points[i-1],b=line.points[i];area+=a.x*b.z-b.x*a.z;}
    return[line.id,area];
  }));
  const states = new Map(world.lines.flatMap(line => [1, -1].map(direction =>
    [key(line.id, direction), { line, direction, key: key(line.id, direction), next: [] }])));
  for (const transition of world.transitions ?? []) {
    const from = states.get(key(transition.fromLineId, transition.fromEnd === 'end' ? 1 : -1));
    const to = states.get(key(transition.toLineId, transition.toEnd === 'start' ? 1 : -1));
    if (!from || !to || from.line === to.line) continue;
    const a = sampleLine(from.line, from.direction > 0 ? from.line.length : 0);
    const b = sampleLine(to.line, to.direction > 0 ? 0 : to.line.length);
    const dot = (a.tangent.x * b.tangent.x + a.tangent.z * b.tangent.z) * from.direction * to.direction;
    if (Math.hypot(a.x - b.x, a.z - b.z) > 1e-4 || dot < .9999) continue;
    from.next.push(to);
  }
  // Select the broadest city circuit in each connected component. Sidings stay
  // visible but do not introduce competing, unnecessary train routes into it.
  const components = [], remaining = new Set(lines.keys());
  while (remaining.size) {
    const first = remaining.values().next().value, component = new Set([first]), queue = [first];
    remaining.delete(first);
    while (queue.length) {
      const id = queue.shift();
      for (const direction of [1, -1]) for (const next of states.get(key(id, direction)).next) {
        if (component.has(next.line.id)) continue;
        component.add(next.line.id); remaining.delete(next.line.id); queue.push(next.line.id);
      }
    }
    components.push(component);
  }
  const paths = [];
  for (const component of components) {
    let best = null, bestScore = -Infinity, work = 0;
    const starts = [...states.values()].filter(state => component.has(state.line.id));
    const rank = new Map([...component].map((id, index) => [id, index]));
    for (const start of starts) {
      const visit = (current, chain, used) => {
        if (++work > 30000) return;
        for (const next of current.next) {
          if (next.key === start.key && chain.length >= 2) {
            const cities=new Set();let area=0,length=0;
            for(const state of chain){cities.add(state.line.from);cities.add(state.line.to);area+=lineArea.get(state.line.id)*state.direction;length+=state.line.length;}
            const score=cities.size*1e7+Math.abs(area)*100+length;
            const path=score>bestScore?makePath(chain,paths.length):null;
            if (score > bestScore) { best = path; bestScore = score; }
          } else if (!used.has(next.line.id) && rank.get(next.line.id) >= rank.get(start.line.id)) {
            used.add(next.line.id); chain.push(next); visit(next, chain, used); chain.pop(); used.delete(next.line.id);
          }
        }
      };
      visit(start, [start], new Set([start.line.id]));
    }
    if (best) paths.push(best);
  }
  return paths;
}

function conflictBlocks(paths) {
  const samples=[],byPath=new Map(),cells=new Map(),cellSize=2.8;
  for(const path of paths){
    const count=Math.ceil(path.length/1.2),list=[],p=pose();
    for(let i=0;i<count;i++){
      const distance=i/count*path.length;sampleNetworkPath(path,distance,p);
      const sample={index:samples.length,path,distance,x:p.x,z:p.z,spacing:path.length/count};
      samples.push(sample);list.push(sample);
    }
    byPath.set(path.id,list);
  }
  const parent=new Int32Array(samples.length);for(let i=0;i<parent.length;i++)parent[i]=i;
  const marked=new Uint8Array(samples.length);
  const find=i=>{while(parent[i]!==i){parent[i]=parent[parent[i]];i=parent[i];}return i;};
  const union=(a,b)=>{parent[find(a)]=find(b);marked[a]=1;marked[b]=1;};
  // Broad phase visits only neighboring spatial cells instead of comparing
  // every sampled route point against the entire railway network.
  for(const a of samples){
    const cx=Math.floor(a.x/cellSize),cz=Math.floor(a.z/cellSize);
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
      const bucket=cells.get(`${cx+dx},${cz+dz}`);if(!bucket)continue;
      for(const b of bucket){
        const along=Math.abs(a.distance-b.distance);
        if(a.path===b.path&&Math.min(along,a.path.length-along)<HALF_LENGTH*2+4)continue;
        if((a.x-b.x)**2+(a.z-b.z)**2<cellSize*cellSize)union(a.index,b.index);
      }
    }
    const id=`${cx},${cz}`;if(!cells.has(id))cells.set(id,[]);cells.get(id).push(a);
  }
  for(const list of byPath.values()){
    let first=null,previous=null;
    for(const sample of list)if(marked[sample.index]){
      if(previous&&sample.distance-previous.distance<HALF_LENGTH*2+3)union(previous.index,sample.index);
      first??=sample;previous=sample;
    }
    if(first&&previous&&modulo(first.distance-previous.distance,first.path.length)<HALF_LENGTH*2+3)union(previous.index,first.index);
  }
  const groups=new Map();
  for(const sample of samples)if(marked[sample.index]){
    const root=find(sample.index);if(!groups.has(root))groups.set(root,new Map());
    const group=groups.get(root);if(!group.has(sample.path.id))group.set(sample.path.id,[]);
    group.get(sample.path.id).push(sample);
  }
  return [...groups.values()].map((group,i)=>{
    const zones=[];
    for(const [pathId,selected] of group)for(const sample of selected){
      const previous=zones.at(-1),start=Math.max(0,sample.distance-sample.spacing),end=Math.min(sample.path.length,sample.distance+sample.spacing);
      if(previous?.pathId===pathId&&start<=previous.end+1e-6)previous.end=end;
      else zones.push({pathId,start,end});
    }
    return{id:`network-block-${i+1}`,owner:null,zones,queryStamp:0,waiters:new Set()};
  });
}

function occupies(train, block, distance=train.distance) {
  for(const zone of block.zones){
    if(zone.pathId!==train.path.id)continue;
    for(let period=-1;period<=1;period++){
      const center=distance+period*train.path.length;
      if(center+train.halfLength+.2>=zone.start&&center-train.halfLength-.2<=zone.end)return true;
    }
  }
  return false;
}

function copyPose(source,target){
  target.x=source.x;target.y=source.y;target.z=source.z;target.distance=source.distance;
  target.tangent.x=source.tangent.x;target.tangent.y=source.tangent.y;target.tangent.z=source.tangent.z;
  target.angle=source.angle;target.heading=source.heading;target.curvature=source.curvature;target.lineId=source.lineId;
}

function preparePoseBuffer(trains,world){
  let count=0;
  const owners=new Map((world.players??[]).map((player,index)=>[player.id,index]));
  for(const train of trains){
    train.poseOffset=count;count+=train.count;train.pose=pose();train.carPoses=Array.from({length:train.count},pose);
    train._nextCarPoses=Array.from({length:train.count},pose);train._cachedDistance=NaN;train._ownerIndex=owners.get(train.ownerId)??0;
  }
  return new Float32Array(count*6);
}
function sampleCars(train,distance,output){
  for(let i=0;i<train.count;i++)sampleNetworkPath(train.path,distance+(i-(train.count-1)/2)*train.spacing,output[i]);
}
function writePoseBuffer(train,buffer){
  for(let i=0;i<train.count;i++){
    const p=train.carPoses[i],offset=(train.poseOffset+i)*6;
    buffer[offset]=p.x;buffer[offset+1]=p.y;buffer[offset+2]=p.z;buffer[offset+3]=p.angle;
    buffer[offset+4]=train.active?1:0;buffer[offset+5]=train._ownerIndex;
  }
}
function refreshPoses(train,buffer){
  sampleCars(train,train.distance,train.carPoses);sampleNetworkPath(train.path,train.distance,train.pose);
  train._cachedDistance=train.distance;writePoseBuffer(train,buffer);
}

function separated(a,b,x,z,dx,dz){
  const at=a.tangent,bt=b.tangent;
  const extent=HALF_CAR*(Math.abs(x*at.x+z*at.z)+Math.abs(x*bt.x+z*bt.z))
    +HALF_WIDTH*(Math.abs(-x*at.z+z*at.x)+Math.abs(-x*bt.z+z*bt.x))+.06;
  return Math.abs(dx*x+dz*z)>=extent;
}
function overlap(a,b){
  const dx=b.x-a.x,dz=b.z-a.z;
  if(dx*dx+dz*dz>2.7*2.7)return false;
  const at=a.tangent,bt=b.tangent;
  return !separated(a,b,at.x,at.z,dx,dz)&&!separated(a,b,-at.z,at.x,dx,dz)
    &&!separated(a,b,bt.x,bt.z,dx,dz)&&!separated(a,b,-bt.z,bt.x,dx,dz);
}

/** Mutable car grid keeps broad-phase collision checks local. Car pose objects,
 * bucket arrays and their entries survive successive simulation frames. */
function collisionIndex(paths,trains){
  const size=4;let minX=Infinity,minZ=Infinity,maxX=-Infinity;
  for(const path of paths)for(const segment of path.segments)for(const p of segment.line.points){
    minX=Math.min(minX,p.x);minZ=Math.min(minZ,p.z);maxX=Math.max(maxX,p.x);
  }
  const originX=Math.floor(minX/size)-3,originZ=Math.floor(minZ/size)-3,columns=Math.ceil((maxX-minX)/size)+8,cells=new Map();
  const cell=(x,z)=>(Math.floor(z/size)-originZ)*columns+Math.floor(x/size)-originX;
  for(const train of trains)train._cars=train.carPoses.map(p=>({train,pose:p,cell:null,index:0}));
  const update=train=>{
    for(const car of train._cars){
      const id=cell(car.pose.x,car.pose.z);if(car.cell===id)continue;
      if(car.cell!==null){const previous=cells.get(car.cell),last=previous.pop();if(last!==car){previous[car.index]=last;last.index=car.index;}}
      let bucket=cells.get(id);if(!bucket){bucket=[];cells.set(id,bucket);}
      car.cell=id;car.index=bucket.length;bucket.push(car);
    }
  };
  const collides=(train,poses)=>{
    for(const p of poses){
      const id=cell(p.x,p.z);
      for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){
        const bucket=cells.get(id+dz*columns+dx);if(!bucket)continue;
        for(const car of bucket)if(car.train!==train&&overlap(p,car.pose))return true;
      }
    }
    return false;
  };
  return{update,collides};
}

function collectZones(zones,start,end,stamp,out){
  let lo=0,hi=zones.length;
  while(lo<hi){const mid=(lo+hi)>>1;if(zones[mid].start<=end)lo=mid+1;else hi=mid;}
  for(let i=lo-1;i>=0&&zones[i].maximumEnd>=start;i--){
    const zone=zones[i];if(zone.end<start||zone.block.queryStamp===stamp)continue;
    zone.block.queryStamp=stamp;out.push(zone.block);
  }
}
function blockIndex(paths,blocks){
  const byPath=new Map(paths.map(path=>[path.id,[]]));
  for(const block of blocks)for(const zone of block.zones)byPath.get(zone.pathId).push({...zone,block});
  for(const zones of byPath.values()){
    zones.sort((a,b)=>a.start-b.start);let end=-Infinity;
    for(const zone of zones){end=Math.max(end,zone.end);zone.maximumEnd=end;}
  }
  let stamp=0;
  return(train,distance,out)=>{
    out.length=0;const zones=byPath.get(train.path.id);if(!zones.length)return out;
    const queryStamp=++stamp,half=train.halfLength+.2,length=train.path.length;
    collectZones(zones,distance-half,distance+half,queryStamp,out);
    if(distance<half)collectZones(zones,distance-half+length,length,queryStamp,out);
    if(distance+half>length)collectZones(zones,0,distance+half-length,queryStamp,out);
    return out;
  };
}

function fleetCounts(world,paths){
  const capacities=paths.map(path=>Math.max(0,Math.floor(path.length/12))),capacity=capacities.reduce((a,b)=>a+b,0);
  const defaults=paths.map((path,index)=>Math.min(capacities[index],Math.max(1,Math.min(new Set(path.segments.flatMap(segment=>[segment.line.from,segment.line.to])).size,Math.floor(path.length/18)))));
  const configured=world.traffic?.trainCount;
  if(configured===undefined)return{counts:defaults,requested:defaults.reduce((a,b)=>a+b,0),capacity};
  if(!Number.isInteger(configured)||configured<0||configured>100000)throw new TypeError('Traffic trainCount must be an integer from 0 through 100000');
  if(!capacity)return{counts:capacities,requested:configured,capacity};
  const total=Math.min(configured,capacity),counts=capacities.map(value=>Math.floor(total*value/capacity));
  let remaining=total-counts.reduce((a,b)=>a+b,0);
  const order=capacities.map((value,index)=>({index,fraction:total*value/capacity-counts[index]})).sort((a,b)=>b.fraction-a.fraction||a.index-b.index);
  for(const {index} of order)if(remaining>0&&counts[index]<capacities[index]){counts[index]++;remaining--;}
  return{counts,requested:configured,capacity};
}

/** Continuous circuit traffic. Whole consists reserve crossings, spatially
 * nearby cars provide the collision broad phase, and path leaders set headway. */
export function createNetworkTraffic(world) {
  const paths=mainCircuits(world);
  if(!paths.length){
    const fallback=createTraffic(world),lines=new Map(world.lines.map(line=>[line.id,line]));
    for(const train of fallback.trains){
      const line=lines.get(train.lineId);train.color=line.color;train.path=makePath([{line,direction:1}],0,false);
      train.homeCityId=line.from;train.ownerId=trainOwner(world,train.id,line.from,line);
    }
    const poseBuffer=preparePoseBuffer(fallback.trains,world);
    for(const train of fallback.trains)refreshPoses(train,poseBuffer);
    return{trains:fallback.trains,mode:'shuttles',paths:[],poseBuffer,poseStride:6,
      stats:{requestedTrainCount:world.traffic?.trainCount??fallback.trains.length,trainCount:fallback.trains.length,capacity:fallback.capacity},
      get reservations(){return fallback.reservations;},
      sampleTrain:(train,offset=0,out)=>sampleNetworkPath(train.path,train.distance+offset,out),
      update(dt){fallback.update(dt);for(const train of fallback.trains)refreshPoses(train,poseBuffer);}};
  }
  const trains=[],fleet=fleetCounts(world,paths);
  for(const [pathIndex,path] of paths.entries()){
    const homes=[...new Set(path.segments.flatMap(segment=>[segment.line.from,segment.line.to]))],count=fleet.counts[pathIndex];
    path.trains=[];
    for(let i=0;i<count;i++){
      const id=`${path.id}-train-${i+1}`,homeCityId=homes[i%homes.length];
      const train={id,path,homeCityId,ownerId:trainOwner(world,id,homeCityId),color:['coral','teal','gold','blue'][i%4],
        distance:i/count*path.length,count:3,spacing:SPACING,halfLength:HALF_LENGTH,direction:1,speed:2.6,active:false,waiting:false,_leader:null};
      trains.push(train);path.trains.push(train);
    }
  }
  const poseBuffer=preparePoseBuffer(trains,world);
  for(const train of trains)refreshPoses(train,poseBuffer);
  const blocks=conflictBlocks(paths),byId=new Map(trains.map(train=>[train.id,train]));
  const queryBlocks=blockIndex(paths,blocks),grid=collisionIndex(paths,trains),relevant=[],current=[];
  const spawnOrder=[];
  function available(block,train,queue=false){
    if(block.owner===train.id)return true;
    const first=block.waiters.values().next().value;
    if(block.owner||(first!==undefined&&first!==train.id)){
      if(queue)block.waiters.add(train.id);return false;
    }
    return true;
  }
  function reserve(block,train){block.owner=train.id;block.waiters.delete(train.id);}
  function tryAdmission(train,distance){
    queryBlocks(train,distance,relevant);
    if(relevant.some(block=>!available(block,train)))return false;
    sampleCars(train,distance,train._nextCarPoses);
    if(grid.collides(train,train._nextCarPoses))return false;
    train.distance=distance;refreshPoses(train,poseBuffer);
    for(const block of relevant)reserve(block,train);
    train.active=true;grid.update(train);writePoseBuffer(train,poseBuffer);return true;
  }
  function activate(train,findSpace=false){
    if(tryAdmission(train,train.distance)||!findSpace)return;
    // A queued train has never been rendered. Admit it into an actual free
    // headway instead of indefinitely retrying an occupied crossing spawn.
    spawnOrder.length=0;
    for(const other of train.path.trains)if(other.active)spawnOrder.push(other);
    spawnOrder.sort((a,b)=>a.distance-b.distance);
    if(!spawnOrder.length){
      for(let i=1;i<12;i++)if(tryAdmission(train,train.path.length*i/12))return;
    }else for(let i=0;i<spawnOrder.length;i++){
      const a=spawnOrder[i],b=spawnOrder[(i+1)%spawnOrder.length];
      const gap=spawnOrder.length===1?train.path.length:modulo(b.distance-a.distance,train.path.length);
      if(gap<train.halfLength*2+a.halfLength+b.halfLength+1.8)continue;
      if(tryAdmission(train,modulo(a.distance+gap/2,train.path.length)))return;
    }
  }
  for(const train of trains)activate(train);
  function step(dt){
    // Externally edited train positions remain supported by the authoring API.
    for(const train of trains)if(train._cachedDistance!==train.distance){refreshPoses(train,poseBuffer);if(train.active)grid.update(train);}
    for(const block of blocks)if(block.owner&&!occupies(byId.get(block.owner),block))block.owner=null;
    for(const train of trains)if(!train.active){
      train._spawnRetry=(train._spawnRetry??0)-dt;
      if(train._spawnRetry<=0){activate(train,true);train._spawnRetry=.5;}
    }
    for(const path of paths){
      path.trains.sort((a,b)=>a.distance-b.distance);
      let first=null,previous=null;
      for(const train of path.trains)if(train.active){if(previous)previous._leader=train;first??=train;previous=train;}
      if(previous)previous._leader=previous===first?null:first;
    }
    for(const train of trains){
      if(!train.active){train.waiting=true;continue;}
      train.waiting=false;let advance=train.speed*dt;
      if(train._leader){const leader=train._leader,gap=modulo(leader.distance-train.distance,train.path.length)-train.halfLength-leader.halfLength-.8;advance=Math.min(advance,Math.max(0,gap));}
      const desired=modulo(train.distance+advance,train.path.length);
      queryBlocks(train,desired,relevant);queryBlocks(train,train.distance,current);
      let blocked=false;
      for(const block of relevant)if(!available(block,train,true))blocked=true;
      for(const block of current)if(!available(block,train,true))blocked=true;
      if(!blocked){sampleCars(train,desired,train._nextCarPoses);blocked=grid.collides(train,train._nextCarPoses);}
      if(blocked){train.waiting=true;continue;}
      for(const block of relevant)reserve(block,train);for(const block of current)reserve(block,train);
      train.distance=desired;
      for(let i=0;i<train.count;i++)copyPose(train._nextCarPoses[i],train.carPoses[i]);
      sampleNetworkPath(train.path,desired,train.pose);train._cachedDistance=desired;
      grid.update(train);writePoseBuffer(train,poseBuffer);
    }
  }
  return{mode:'circuits',trains,paths,poseBuffer,poseStride:6,
    stats:{requestedTrainCount:fleet.requested,trainCount:trains.length,capacity:fleet.capacity},
    sampleTrain:(train,offset=0,out)=>sampleNetworkPath(train.path,train.distance+offset,out),
    get reservations(){return blocks.map(block=>({id:block.id,trainId:block.owner,zones:block.zones}));},
    update(dt){
      if(!Number.isFinite(dt)||dt<0)throw new TypeError('Traffic time step must be finite and nonnegative');
      if(!dt)return;const steps=Math.ceil(dt/STEP);
      for(let i=0;i<steps;i++)step(dt/steps);
    }};
}
