import {pickRailwayAnchor} from './settlement-railway-input.js';

const EPS=1e-6;
const segments=loop=>loop.segments??loop.pieces??[];
const interval=piece=>Number.isFinite(piece?.start)&&Number.isFinite(piece?.end)&&piece.end>piece.start
  ?{start:piece.start,end:piece.end}:null;

function union(ranges){
  const ordered=ranges.sort((a,b)=>a.start-b.start||a.end-b.end),result=[];
  for(const range of ordered){
    const previous=result.at(-1);
    if(previous&&range.start<=previous.end+EPS)previous.end=Math.max(previous.end,range.end);
    else result.push({...range});
  }
  return result;
}

/** The caller supplies the owned city's loops. A junction can divide a line
 * between several circuits, so eligibility belongs to distance intervals,
 * never to a whole line ID. Rebuild only when the railway network changes. */
export function buildCircuitSelection({loops=[],lines=[]}={}){
  const rangesByLine=new Map();
  for(const loop of loops)for(const piece of segments(loop)){
    const range=interval(piece);if(!range||!piece.lineId)continue;
    if(!rangesByLine.has(piece.lineId))rangesByLine.set(piece.lineId,[]);
    rangesByLine.get(piece.lineId).push(range);
  }
  const selected=[];
  for(const line of lines){
    const eligible=rangesByLine.get(line.id);if(!eligible||line.previewOnly)continue;
    const length=line.length??line.alignment?.length??line.distances?.at(-1)??Infinity;
    const visible=line.renderRanges??[{start:0,end:length}],ranges=[];
    for(const range of union(eligible))for(const shown of visible){
      const start=Math.max(0,range.start,shown.start),end=Math.min(length,range.end,shown.end);
      if(end>start)ranges.push({start,end});
    }
    if(ranges.length)selected.push({...line,renderRanges:union(ranges)});
  }
  return {loops:[...loops],lines:selected,prepared:true};
}

export function circuitCandidatesAt(loops=[],anchor){
  if(anchor?.kind!=='track'||!Number.isFinite(anchor.distance)||!anchor.lineId)return [];
  const seen=new Set();
  return loops.filter(loop=>{
    if(seen.has(loop.id))return false;
    const covered=segments(loop).some(piece=>{
      const range=interval(piece);
      return piece.lineId===anchor.lineId&&range&&anchor.distance>=range.start-EPS&&anchor.distance<=range.end+EPS;
    });
    if(covered)seen.add(loop.id);return covered;
  });
}

/** Route picking shares the track editor's screen-space tolerance, depth
 * handling, and perspective-correct distance. Badges cannot capture a click. */
export function pickCircuitAt(world,state={},camera,pointer,box){
  const selection=state.prepared?state:buildCircuitSelection(state);
  const anchor=pickRailwayAnchor(world,{cities:[],stations:[],lines:selection.lines,includeStationSpines:true},camera,pointer,box);
  if(!anchor)return null;
  const loops=circuitCandidatesAt(selection.loops,anchor);
  return loops.length?{anchor,loops}:null;
}

/** Repeated clicks on a shared section cycle only its covering circuits. */
export function nextCircuitId(candidates=[],currentId=null){
  if(!candidates.length)return null;
  const index=candidates.findIndex(loop=>loop.id===currentId);
  return candidates[(index+1)%candidates.length].id;
}
