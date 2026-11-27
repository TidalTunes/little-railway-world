import {sampleAlignmentInto} from './alignments.js';

const EPS=1e-6,JOIN_EPS=1e-4,DOT=.9999;
const pose=()=>({x:0,y:0,z:0,angle:0,tangent:{x:0,y:0,z:1}});
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const close=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)<=JOIN_EPS;
const aligned=(a,b)=>a.tangent.x*b.tangent.x+a.tangent.z*b.tangent.z>=DOT;

/** Directed physical pieces, not city-label shortcuts. A crossing is not a
 * junction, a near miss is not a join, and a station never reverses a train. */
export function createDirectedRailNetwork(snapshot={}){
  const revision=snapshot.revision??0,records=new Map(),nodes=[],arcs=[],joins=[],cityStations=new Map(),cache=new Map();
  const stations=new Map((snapshot.stations??[]).map(station=>[station.id,station]));
  for(const line of snapshot.lines??[])if(!line.previewOnly&&line.alignment?.length>EPS){
    records.set(line.id,{line,length:line.alignment.length,cuts:[0,line.alignment.length],nodes:[]});
  }
  function addCut(record,distance){
    if(!record||!Number.isFinite(distance)||distance< -EPS||distance>record.length+EPS)return null;
    const value=clamp(distance,0,record.length);record.cuts.push(value);return value;
  }
  for(const station of stations.values())addCut(records.get(station.lineId),station.distance);
  function connect(a,sa,b,sb){
    if(!a||!b||a===b||!Number.isFinite(sa)||!Number.isFinite(sb)||sa< -EPS||sb< -EPS||sa>a.length+EPS||sb>b.length+EPS)return;
    const pa=sampleAlignmentInto(a.line.alignment,sa,pose()),pb=sampleAlignmentInto(b.line.alignment,sb,pose());
    if(!close(pa,pb)||!aligned(pa,pb))return;
    joins.push([a,addCut(a,sa),b,addCut(b,sb)]);
  }
  const connected=new Set();
  for(const connection of snapshot.connections??[]){
    const branch=records.get(connection.lineId??connection.branchLineId??connection.id?.replace(/^connection:/,'rail-link:'))??records.get(`rail-link:${connection.key}`);
    if(!branch)continue;connected.add(branch.line.id);
    for(const [side,distance] of [['from',0],['to',branch.length]]){
      const junction=connection[`${side}Junction`];
      if(junction)connect(branch,distance,records.get(junction.lineId),junction.distance);
      else{const spine=records.get(stations.get(connection[`${side}StationId`])?.lineId);connect(branch,distance,spine,side==='from'?spine?.length:0);}
    }
  }
  // Support authored/hydrated station joins, with the same forward port rule.
  for(const record of records.values())if(!connected.has(record.line.id))for(const id of record.line.stationIds??[]){
    const spine=records.get(stations.get(id)?.lineId);connect(record,0,spine,spine?.length);connect(record,record.length,spine,0);
  }
  for(const record of records.values()){
    record.cuts.sort((a,b)=>a-b);record.cuts=record.cuts.filter((v,i,all)=>i===0||v-all[i-1]>EPS);
    for(const distance of record.cuts){const id=nodes.length;record.nodes.push(id);nodes.push({id,parent:id,outgoing:[],stations:[]});}
  }
  const nodeAt=(record,distance)=>record.nodes[record.cuts.findIndex(value=>Math.abs(value-distance)<EPS*2)];
  function root(id){let at=id;while(nodes[at].parent!==at)at=nodes[at].parent;while(nodes[id].parent!==id){const next=nodes[id].parent;nodes[id].parent=at;id=next;}return at;}
  for(const [a,sa,b,sb] of joins)nodes[root(nodeAt(a,sa))].parent=root(nodeAt(b,sb));
  for(const station of stations.values()){
    const record=records.get(station.lineId);if(!record||!Number.isFinite(station.distance)||station.distance<0||station.distance>record.length)continue;
    const node=root(nodeAt(record,station.distance));nodes[node].stations.push(station);
    if(!cityStations.has(station.cityId))cityStations.set(station.cityId,[]);cityStations.get(station.cityId).push({node,station});
  }
  for(const record of records.values())for(let i=1;i<record.cuts.length;i++){
    const start=record.cuts[i-1],end=record.cuts[i],a=sampleAlignmentInto(record.line.alignment,start,pose()),b=sampleAlignmentInto(record.line.alignment,end,pose());
    const arc={id:arcs.length,lineId:record.line.id,start,end,length:end-start,direction:1,from:root(record.nodes[i-1]),to:root(record.nodes[i]),sx:a.tangent.x,sz:a.tangent.z,ex:b.tangent.x,ez:b.tangent.z};
    arcs.push(arc);nodes[arc.from].outgoing.push(arc.id);
  }
  for(const node of nodes)node.outgoing.sort((a,b)=>arcs[a].lineId.localeCompare(arcs[b].lineId)||arcs[a].start-arcs[b].start);
  function loops(cityId){
    if(cache.has(cityId))return cache.get(cityId);
    const found=[],signatures=new Set();let explored=0;
    for(const origin of cityStations.get(cityId)??[]){
      const path=[],visited=new Set([origin.node]),visitedCities=new Set([cityId]);
      function visit(nodeId,last){
        if(found.length>=24||explored++>=12000||path.length>=128)return;
        for(const id of nodes[nodeId].outgoing){
          const next=arcs[id];if(last&&last.ex*next.sx+last.ez*next.sz<DOT)continue;
          if(next.to===origin.node){
            if(!path.length||next.ex*path[0].sx+next.ez*path[0].sz<DOT)continue;
            const complete=[...path,next],signature=complete.map(piece=>`${piece.lineId}:${piece.start.toFixed(5)}:${piece.end.toFixed(5)}`).join('|');
            if(signatures.has(signature))continue;signatures.add(signature);
            let length=0;const segments=[],stops=[],cityIds=[],stationIds=[];
            for(const arc of complete){
              for(const station of nodes[arc.from].stations)if(!stationIds.includes(station.id)){stops.push({cityId:station.cityId,stationId:station.id,distance:length});stationIds.push(station.id);if(!cityIds.includes(station.cityId))cityIds.push(station.cityId);}
              segments.push({lineId:arc.lineId,start:arc.start,end:arc.end,length:arc.length,offset:length,direction:1});length+=arc.length;
            }
            let hash=2166136261;for(const c of signature)hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;
            found.push({id:`loop:${cityId}:${hash.toString(36)}`,revision,cityId,cityIds,stationIds,stops,length,segments,pieces:segments});continue;
          }
          if(visited.has(next.to))continue;
          const reached=nodes[next.to].stations.map(station=>station.cityId);if(reached.some(id=>visitedCities.has(id)))continue;
          visited.add(next.to);for(const id of reached)visitedCities.add(id);path.push(next);visit(next.to,next);path.pop();visited.delete(next.to);for(const id of reached)visitedCities.delete(id);
        }
      }
      visit(origin.node,null);
    }
    found.sort((a,b)=>a.length-b.length||a.id.localeCompare(b.id));cache.set(cityId,found);return found;
  }
  function sample(loop,distance,out=pose()){
    if(!loop?.segments?.length||!Number.isFinite(distance)||!(loop.length>0))return null;
    const s=((distance%loop.length)+loop.length)%loop.length,segments=loop.segments;let lo=0,hi=segments.length-1;
    while(lo<hi){const mid=(lo+hi)>>1;if(s>=segments[mid].offset+segments[mid].length)lo=mid+1;else hi=mid;}
    const piece=segments[lo],record=records.get(piece.lineId);if(!record)return null;
    const along=piece.start+clamp(s-piece.offset,0,piece.length);sampleAlignmentInto(record.line.alignment,along,out);
    out.distance=s;out.lineDistance=along;out.lineId=piece.lineId;out.angle=Math.atan2(out.tangent.x,out.tangent.z);out.heading=Math.atan2(out.tangent.z,out.tangent.x);return out;
  }
  return {revision,loops,sample};
}
