import {walkingPlacementShapes,walkingContact} from './walking-collision.js';
import {SpatialGrid,pointBox} from './spatial-index.js';

const finitePoint=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
class Heap{
  constructor(){this.values=[];}
  push(value){const a=this.values;a.push(value);let i=a.length-1;while(i){const p=(i-1)>>1;if(a[p].score<=value.score)break;a[i]=a[p];i=p;}a[i]=value;}
  pop(){const a=this.values,first=a[0],last=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let c=i*2+1;if(c+1<a.length&&a[c+1].score<a[c].score)c++;if(a[c].score>=last.score)break;a[i]=a[c];i=c;}a[i]=last;}return first;}
  get length(){return this.values.length;}
}

/** Ground movement shares the traveller's simple asset bodies, never render
 * triangles. Searches are local, bounded, and only occur when an order changes. */
export function createMilitaryNavigation(world,{surfaceAt,getPlacements=()=>[]}={}){
  let placements=null,index=new SpatialGrid(12),revision=0;
  const contact={},terrainCache=new Map(),failedPaths=new Map(),stats={searches:0,visited:0,colliderRebuilds:0,terrainSamples:0,cacheHits:0,partialPaths:0};
  function refresh(){
    const values=getPlacements()??[];if(values===placements)return;placements=values;index=new SpatialGrid(12);revision++;failedPaths.clear();stats.colliderRebuilds++;
    for(const item of values)for(const body of walkingPlacementShapes(world,item)){
      if(body.cameraOnly||body.support)continue;
      const radius=(body.radius??Math.hypot(body.width,body.depth)/2)+Math.hypot(body.x,body.z);
      if(!Number.isFinite(radius))continue;
      index.insert(body,pointBox(item.x,item.z,radius));
    }
  }
  // Terrain is immutable during a session. A shared one-unit lattice keeps
  // repeated long orders from resampling coast/biome polygons thousands of
  // times. Bilinear heights preserve smooth movement; a cell touching water
  // stays blocked, conservatively keeping ground units away from shore edges.
  function sample(ix,iz){const key=`${ix}:${iz}`;let value=terrainCache.get(key);if(!value){value=surfaceAt(ix,iz);stats.terrainSamples++;if(terrainCache.size>=65536)terrainCache.delete(terrainCache.keys().next().value);terrainCache.set(key,value);}return value;}
  function terrain(x,z){const ix=Math.floor(x),iz=Math.floor(z),tx=x-ix,tz=z-iz,a=sample(ix,iz),b=sample(ix+1,iz),c=sample(ix,iz+1),d=sample(ix+1,iz+1),corners=[a,b,c,d];
    const dry=corners.every(p=>p&&['ground','mountain'].includes(p.type)),outside=corners.some(p=>!p||p.type==='outside');
    return{type:outside?'outside':dry?'ground':'water',height:(a?.height??0)*(1-tx)*(1-tz)+(b?.height??0)*tx*(1-tz)+(c?.height??0)*(1-tx)*tz+(d?.height??0)*tx*tz};}

  function clear(point,radius,air=false){
    if(!finitePoint(point))return false;const ground=terrain(point.x,point.z);
    if(!ground||!Number.isFinite(ground.height)||ground.type==='outside')return false;
    if(air)return true;
    if(!['ground','mountain'].includes(ground.type))return false;
    // The footprint must fit on dry land, not just its centre.
    for(const [dx,dz]of [[radius,0],[-radius,0],[0,radius],[0,-radius]]){
      const edge=terrain(point.x+dx,point.z+dz);
      if(!edge||!['ground','mountain'].includes(edge.type)||Math.abs(edge.height-ground.height)>radius*.7+.09)return false;
    }
    return !walkingContact(world,index.query(pointBox(point.x,point.z,radius)),point,ground.height+.01,radius,.65,contact);
  }
  function segment(a,b,radius,air=false){
    const length=distance(a,b),steps=Math.max(1,Math.ceil(length/.65));let height=terrain(a.x,a.z)?.height;
    for(let i=1;i<=steps;i++){
      const t=i/steps,p={x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t};if(!clear(p,radius,air))return false;
      const next=terrain(p.x,p.z).height;if(!air&&Math.abs(next-height)>length/steps*.7+.03)return false;height=next;
    }
    return true;
  }
  function nearest(point,radius,air=false,maxRadius=6){
    if(clear(point,radius,air))return{x:point.x,z:point.z};
    for(let ring=.8;ring<=maxRadius;ring+=.8)for(let n=0;n<16;n++){
      const angle=n*Math.PI/8+ring,p={x:point.x+Math.cos(angle)*ring,z:point.z+Math.sin(angle)*ring};if(clear(p,radius,air))return p;
    }
    return null;
  }
  function path(from,to,radius,air=false,{maxNodes=300,coarse=false}={}){
    stats.searches++;const failureKey=`${Math.round(from.x/2)}:${Math.round(from.z/2)}:${Math.round(to.x/3)}:${Math.round(to.z/3)}:${radius}:${air}:${maxNodes}:${coarse}`;
    if(failedPaths.has(failureKey)){stats.cacheHits++;return null;}
    const fail=()=>{if(failedPaths.size>=512)failedPaths.delete(failedPaths.keys().next().value);failedPaths.set(failureKey,true);return null;};
    const end=nearest(to,radius,air);if(!end)return fail();
    if(segment(from,end,radius,air))return[end];
    const step=coarse?4.5:Math.max(1.1,radius*2,Math.min(3,distance(from,end)/85)),pad=coarse?110:Math.max(12,Math.min(60,distance(from,end)*.5)),minX=Math.min(from.x,end.x)-pad,maxX=Math.max(from.x,end.x)+pad,minZ=Math.min(from.z,end.z)-pad,maxZ=Math.max(from.z,end.z)+pad;
    const queue=new Heap(),nodes=new Map(),cache=new Map(),key=(x,z)=>`${x}:${z}`;
    const initial={x:from.x,z:from.z,ix:0,iz:0,cost:0,score:distance(from,end),parent:null};queue.push(initial);nodes.set('0:0',initial);let found=null,closest=initial,visited=0;
    while(queue.length&&visited++<maxNodes){
      const current=queue.pop();if(current.closed)continue;current.closed=true;if(distance(current,end)<distance(closest,end))closest=current;
      if(distance(current,end)<step*1.5&&segment(current,end,radius,air)){found=current;break;}
      for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
        if(!dx&&!dz)continue;const ix=current.ix+dx,iz=current.iz+dz,id=key(ix,iz),x=from.x+ix*step,z=from.z+iz*step;
        if(x<minX||x>maxX||z<minZ||z>maxZ)continue;const old=nodes.get(id);if(old?.closed)continue;
        if(!cache.has(id))cache.set(id,clear({x,z},radius,air));if(!cache.get(id))continue;
        const cost=current.cost+Math.hypot(dx,dz)*step;if(old&&old.cost<=cost)continue;
        if(!segment(current,{x,z},radius,air))continue;
        const node={x,z,ix,iz,cost,score:cost+distance({x,z},end)*1.25,parent:current};nodes.set(id,node);queue.push(node);
      }
    }
    stats.visited+=visited;const complete=!!found;
    if(!found){if(distance(initial,end)-distance(closest,end)<Math.max(3,step*2))return fail();found=closest;stats.partialPaths++;}
    const raw=complete?[end]:[];for(let node=found;node!==initial;node=node.parent)raw.push({x:node.x,z:node.z});raw.reverse();
    const result=[];let previous=from;
    for(let i=0;i<raw.length;){let next=raw.length-1;while(next>i&&!segment(previous,raw[next],radius,air))next--;result.push(raw[next]);previous=raw[next];i=next+1;}
    result.complete=complete;return result;
  }
  refresh();return{refresh,clear,segment,nearest,path,terrain,get revision(){return revision;},get stats(){return{...stats,terrainCacheSize:terrainCache.size,failedCacheSize:failedPaths.size};},dispose(){placements=null;index.cells.clear();terrainCache.clear();failedPaths.clear();}};
}
