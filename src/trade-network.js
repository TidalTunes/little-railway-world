import {sampleAlignmentInto} from './alignments.js';

const EPS=1e-6,JOIN_EPS=1e-4,TANGENT_DOT=.9999;
const pose=()=>({x:0,y:0,z:0,angle:0,tangent:{x:0,y:0,z:1}});
const finite=value=>Number.isFinite(value);
const near=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)<=JOIN_EPS;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

/** Infrastructure is immutable for this network's lifetime. Its graph uses
 * physical rail pieces and directed arrivals, not city-to-city shortcuts. */
export function createTradeNetwork(snapshot={}){
  const revision=snapshot.revision??0,records=new Map(),nodes=[],arcs=[],cities=new Map(),cache=new Map();
  for(const line of snapshot.lines??[]){
    if(line.previewOnly||!line.alignment?.segments?.length||!finite(line.alignment.length)||line.alignment.length<=EPS)continue;
    records.set(line.id,{line,length:line.alignment.length,cuts:[0,line.alignment.length],nodes:[],pieces:[]});
  }
  const stations=new Map((snapshot.stations??[]).map(station=>[station.id,station])),joins=[];
  const addCut=(record,distance)=>{
    if(!record||!finite(distance)||distance< -EPS||distance>record.length+EPS)return null;
    const s=clamp(distance,0,record.length);record.cuts.push(s);return s;
  };
  for(const station of stations.values())addCut(records.get(station.lineId),station.distance);
  function connect(a,sa,b,sb){
    if(!a||!b||a===b||!finite(sa)||!finite(sb)||sa< -EPS||sa>a.length+EPS||sb< -EPS||sb>b.length+EPS)return;
    const pa=sampleAlignmentInto(a.line.alignment,sa,pose()),pb=sampleAlignmentInto(b.line.alignment,sb,pose());
    // Metadata cannot create a teleport, even in an older or damaged save.
    if(!near(pa,pb))return;
    joins.push([a,addCut(a,sa),b,addCut(b,sb)]);
  }
  function stationEnd(branch,distance,station){
    const spine=records.get(station?.lineId);if(!spine||spine===branch)return;
    connect(branch,distance,spine,0);connect(branch,distance,spine,spine.length);
  }
  for(const connection of snapshot.connections??[]){
    const id=connection.lineId??connection.branchLineId??connection.id?.replace(/^connection:/,'rail-link:');
    const branch=records.get(id)??records.get(`rail-link:${connection.key}`);if(!branch)continue;
    for(const [side,distance]of [['from',0],['to',branch.length]]){
      const junction=connection[`${side}Junction`];
      if(junction)connect(branch,distance,records.get(junction.lineId),junction.distance);
      else stationEnd(branch,distance,stations.get(connection[`${side}StationId`]));
    }
  }
  // Older committed lines can predate connection metadata. Coincident physical
  // station ports remain valid; intersecting or merely nearby tracks do not.
  for(const record of records.values())for(const id of record.line.stationIds??[]){
    stationEnd(record,0,stations.get(id));stationEnd(record,record.length,stations.get(id));
  }
  for(const record of records.values()){
    record.cuts.sort((a,b)=>a-b);
    record.cuts=record.cuts.filter((value,index,all)=>index===0||value-all[index-1]>EPS);
    for(const distance of record.cuts){
      const id=nodes.length,point=sampleAlignmentInto(record.line.alignment,distance,pose());
      nodes.push({id,parent:id,outgoing:[],stations:[],point});record.nodes.push(id);
    }
  }
  function nodeAt(record,distance){
    let lo=0,hi=record.cuts.length-1;
    while(lo<hi){const mid=(lo+hi)>>1;if(record.cuts[mid]<distance-EPS)lo=mid+1;else hi=mid;}
    return record.nodes[lo];
  }
  function root(id){
    let current=id;while(nodes[current].parent!==current)current=nodes[current].parent;
    while(nodes[id].parent!==id){const next=nodes[id].parent;nodes[id].parent=current;id=next;}return current;
  }
  for(const [a,sa,b,sb]of joins)nodes[root(nodeAt(a,sa))].parent=root(nodeAt(b,sb));
  for(const station of stations.values()){
    const record=records.get(station.lineId);
    if(!record||!finite(station.distance)||station.distance< -EPS||station.distance>record.length+EPS)continue;
    const node=root(nodeAt(record,station.distance));nodes[node].stations.push(station);
    if(!cities.has(station.cityId))cities.set(station.cityId,[]);cities.get(station.cityId).push({node,station,record});
  }
  for(const record of records.values())for(let i=1;i<record.cuts.length;i++){
    const a=record.cuts[i-1],b=record.cuts[i];if(b-a<=EPS)continue;
    const pa=sampleAlignmentInto(record.line.alignment,a,pose()),pb=sampleAlignmentInto(record.line.alignment,b,pose());
    const key=`${record.line.id}:${a.toFixed(6)}:${b.toFixed(6)}`;
    record.pieces.push({start:a,end:b,key});
    for(const direction of [1,-1]){
      const from=root(record.nodes[direction>0?i-1:i]),to=root(record.nodes[direction>0?i:i-1]);
      const start=direction>0?pa:pb,end=direction>0?pb:pa;
      const arc={id:arcs.length,lineId:record.line.id,line:record.line,start:direction>0?a:b,end:direction>0?b:a,
        length:b-a,direction,from,to,key,sx:start.tangent.x*direction,sz:start.tangent.z*direction,
        ex:end.tangent.x*direction,ez:end.tangent.z*direction};
      arcs.push(arc);nodes[from].outgoing.push(arc.id);
    }
  }
  for(const node of nodes)if(node.stations.length||node.outgoing.length>2){
    const p=node.point;node.reservationKey=`rail-node:${p.x.toFixed(5)}:${p.y.toFixed(5)}:${p.z.toFixed(5)}`;
  }

  function route(fromCityId,toCityId){
    let targets=cache.get(fromCityId);if(!targets){targets=new Map();cache.set(fromCityId,targets);}
    if(targets.has(toCityId))return targets.get(toCityId);
    const origins=cities.get(fromCityId),destinations=cities.get(toCityId);
    if(!origins?.length||!destinations?.length){targets.set(toCityId,null);return null;}
    const destinationNodes=new Map(destinations.map(entry=>[entry.node,entry])),heap=[];
    function push(id,cost){let i=heap.length;heap.push({id,cost});while(i){const p=(i-1)>>1;if(heap[p].cost<=cost)break;heap[i]=heap[p];i=p;}heap[i]={id,cost};}
    function pop(){const first=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let child=i*2+1;if(child+1<heap.length&&heap[child+1].cost<heap[child].cost)child++;if(heap[child].cost>=last.cost)break;heap[i]=heap[child];i=child;}heap[i]=last;}return first;}
    const distances=new Float64Array(arcs.length);distances.fill(Infinity);
    const previous=new Int32Array(arcs.length);previous.fill(-1);
    let final=null,origin=origins.find(entry=>destinationNodes.has(entry.node));
    if(!origin){
      for(const entry of origins)for(const id of nodes[entry.node].outgoing){distances[id]=arcs[id].length;push(id,distances[id]);}
      while(heap.length){
        const current=pop();if(current.cost!==distances[current.id])continue;
        const arc=arcs[current.id],node=nodes[arc.to];
        if(destinationNodes.has(arc.to)){final=arc;break;}
        for(const id of node.outgoing){
          const next=arcs[id],dot=arc.ex*next.sx+arc.ez*next.sz;
          if(dot<TANGENT_DOT&&!(node.stations.length&&dot<=-TANGENT_DOT))continue;
          const cost=current.cost+next.length;if(cost>=distances[id]-EPS)continue;
          distances[id]=cost;previous[id]=arc.id;push(id,cost);
        }
      }
      if(!final){targets.set(toCityId,null);return null;}
    }
    const path=[];if(final)for(let id=final.id;id!==-1;id=previous[id])path.push(arcs[id]);path.reverse();
    origin??=origins.find(entry=>entry.node===path[0].from);
    const destination=destinationNodes.get(final?.to??origin.node),segments=[],reversals=[];let length=0;
    for(let i=0;i<path.length;i++){
      const arc=path[i],last=path[i-1];
      if(last&&last.ex*arc.sx+last.ez*arc.sz<0){const station=nodes[arc.from].stations[0];reversals.push({distance:length,stationId:station.id,cityId:station.cityId});}
      segments.push(Object.freeze({lineId:arc.lineId,start:arc.start,end:arc.end,length:arc.length,offset:length,direction:arc.direction,reservationKey:arc.key}));length+=arc.length;
    }
    const result=Object.freeze({revision,fromCityId,toCityId,length,segments:Object.freeze(segments),reversals:Object.freeze(reversals),
      fromStationId:origin.station.id,toStationId:destination.station.id,
      start:Object.freeze({lineId:origin.record.line.id,distance:origin.station.distance})});
    targets.set(toCityId,result);return result;
  }
  function sample(path,distance,out=pose()){
    if(!path||!finite(distance))return null;
    const s=clamp(distance,0,path.length),segments=path.segments;let segment=null;
    if(segments.length){
      let lo=0,hi=segments.length-1;while(lo<hi){const mid=(lo+hi)>>1;if(s>=segments[mid].offset+segments[mid].length)lo=mid+1;else hi=mid;}
      segment=segments[lo];
    }
    const lineId=segment?.lineId??path.start.lineId,record=records.get(lineId);if(!record)return null;
    const direction=segment?.direction??1,along=segment?segment.start+clamp(s-segment.offset,0,segment.length)*direction:path.start.distance;
    sampleAlignmentInto(record.line.alignment,along,out);out.tangent.x*=direction;out.tangent.y*=direction;out.tangent.z*=direction;
    out.distance=s;out.lineDistance=along;out.lineId=lineId;out.angle=Math.atan2(out.tangent.x,out.tangent.z);out.heading=Math.atan2(out.tangent.z,out.tangent.x);out.curvature*=direction;
    return out;
  }
  function reservationKeys(path){
    const keys=new Set();
    // A newly built offshoot can split an already occupied piece. Re-key the
    // old trip against current cuts before dispatching on a newer revision.
    for(const segment of path?.segments??[]){
      const record=records.get(segment.lineId);if(!record)continue;
      const start=Math.min(segment.start,segment.end),end=Math.max(segment.start,segment.end);
      for(const piece of record.pieces)if(piece.end>start+EPS&&piece.start<end-EPS)keys.add(piece.key);
      // Different edge pairs can meet at the same switch or opposite sides
      // of a platform. Reserve those shared physical points as well.
      for(let i=0;i<record.cuts.length;i++)if(record.cuts[i]>=start-EPS&&record.cuts[i]<=end+EPS){
        const key=nodes[root(record.nodes[i])].reservationKey;if(key)keys.add(key);
      }
    }
    return [...keys];
  }
  return {revision,route,sample,reservationKeys};
}
