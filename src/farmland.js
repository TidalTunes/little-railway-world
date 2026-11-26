import { biomeDistance, fitsBiome } from './biomes.js';
import {surfaceDistance,surfaceDisplacement,surfaceOffset,surfaceChartRadius} from './world-surface.js';

function randomFor(seed){
  let state=2166136261;
  for(const character of String(seed))state=Math.imul(state^character.charCodeAt(0),16777619);
  return()=>{state+=0x6D2B79F5;let t=Math.imul(state^state>>>15,state|1);
    t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};
}

const ringArea=ring=>Math.abs(ring.reduce((sum,p,i)=>{
  const q=ring[(i+1)%ring.length];return sum+p[0]*q[1]-q[0]*p[1];
},0)/2);
function polygonArea(polygons){
  return polygons.reduce((sum,rings)=>sum+ringArea(rings[0])-rings.slice(1).reduce((n,ring)=>n+ringArea(ring),0),0);
}
const boundsOf=points=>({minX:Math.min(...points.map(p=>p[0])),maxX:Math.max(...points.map(p=>p[0])),
  minZ:Math.min(...points.map(p=>p[1])),maxZ:Math.max(...points.map(p=>p[1]))});

// Convex, slightly oblique cuts produce adjoining fields with shared boundaries
// without reducing a district to repeated rows and columns. The gap is a lane.
function clip(polygon,nx,nz,limit){
  const result=[];
  for(let i=0;i<polygon.length;i++){
    const a=polygon[i],b=polygon[(i+1)%polygon.length],da=a[0]*nx+a[1]*nz-limit,db=b[0]*nx+b[1]*nz-limit;
    if(da<=0)result.push(a);
    if((da<0)!==(db<0)){const t=da/(da-db);result.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}
  }
  return result;
}

function parcelsFor(width,depth,seed,dominant){
  const random=randomFor(seed),w=width/2-.12,d=depth/2-.12;
  const notch=()=>.28+random()*Math.min(width,depth)*.12;
  const fields=[[[-w+notch(),-d],[w-notch(),-d],[w,-d+notch()],[w,d-notch()],
    [w-notch(),d],[-w+notch(),d],[-w,d-notch()],[-w,-d+notch()]]];
  const target=Math.max(3,Math.min(8,Math.round(width*depth/(23+random()*11))));
  for(let attempt=0;fields.length<target&&attempt<target*5;attempt++){
    const index=fields.reduce((best,p,i)=>ringArea(p)>ringArea(fields[best])?i:best,0),p=fields[index],b=boundsOf(p);
    const alongX=(b.maxX-b.minX)*(random()*.35+.85)>(b.maxZ-b.minZ),skew=(random()-.5)*.32;
    const nx=alongX?1:skew,nz=alongX?skew:1,values=p.map(([x,z])=>x*nx+z*nz);
    const low=Math.min(...values),high=Math.max(...values),split=low+(high-low)*(.32+random()*.36),gap=.20+random()*.10;
    const a=clip(p,nx,nz,split-gap/2),c=clip(p,-nx,-nz,-split-gap/2);
    if(a.length<3||c.length<3||Math.min(ringArea(a),ringArea(c))<7)continue;
    fields.splice(index,1,a,c);
  }
  const crops=['wheat','pasture','wheat','fallow','orchard','pasture','vegetables'];
  return fields.map((polygon,index)=>{
    const b=boundsOf(polygon),x=(b.minX+b.maxX)/2,z=(b.minZ+b.maxZ)/2;
    const crop=random()<.38?dominant:crops[Math.floor(random()*crops.length)],detailSeed=Math.floor(random()*1e8);
    return{x,z,width:b.maxX-b.minX,depth:b.maxZ-b.minZ,polygon:polygon.map(([px,pz])=>[px-x,pz-z]),
      crop,variant:Math.floor(random()*3),rowsAlong:random()<.18?'x':'z',detailSeed,
      // A few hedged edges and farm features punctuate open fields; every
      // district deliberately retains quiet parcels with no little objects.
      hedgeEdges:polygon.map((_,edge)=>edge).filter(()=>random()<.20),
      feature:index===0&&random()<.42?'barn':crop==='wheat'&&random()<.3?'bales':crop==='pasture'&&random()<.5?'trough':null};
  });
}

/** Plan neighboring field groups while preserving the complete circular
 * reservations used by the world. Regional requests use global cluster IDs
 * and seeds, so the same region is independent of worker request order. */
export function placeFarmland(world,{density=1,canPlace,add}={}){
  if(typeof canPlace!=='function'||typeof add!=='function')throw new TypeError('Farmland requires canPlace and add callbacks');
  const regions=(world.biomes?.regions??[]).filter(region=>region.type==='farmland'),regionBounds=world.detailRegion;
  const regionArea=regions.reduce((total,region)=>total+polygonArea(region.polygons),0);
  const area=regionBounds?Math.min(regionArea,(regionBounds.maxX-regionBounds.minX)*(regionBounds.maxZ-regionBounds.minZ)):regionArea;
  const amount=Math.max(0,Math.min(3,Number(density)||0));
  const result={districts:[],area:0,cultivatedArea:0,targetArea:area*Math.min(.50,.28*amount)};
  if(!amount||!area)return result;
  const candidates=[];
  for(const region of regions){
    const random=randomFor(`${world.seed}:farmland:${region.id}`),bearing=(random()-.5)*Math.PI/3;
    const cos=Math.cos(bearing),sin=Math.sin(bearing),step=48,reach=34,phaseX=random()*step,phaseZ=random()*step;
    const corners=region.polygons.flatMap(rings=>rings[0]),b=boundsOf(corners);
    if(regionBounds){b.minX=Math.max(b.minX,regionBounds.minX);b.maxX=Math.min(b.maxX,regionBounds.maxX);
      b.minZ=Math.max(b.minZ,regionBounds.minZ);b.maxZ=Math.min(b.maxZ,regionBounds.maxZ);}
    if(b.maxX<=b.minX||b.maxZ<=b.minZ)continue;
    const local=[[b.minX,b.minZ],[b.maxX,b.minZ],[b.maxX,b.maxZ],[b.minX,b.maxZ]].map(([x,z])=>[x*cos-z*sin,x*sin+z*cos]);
    const lb=boundsOf(local);
    for(let column=Math.floor((lb.minX-phaseX-reach)/step);column<=Math.ceil((lb.maxX-phaseX+reach)/step);column++){
      for(let row=Math.floor((lb.minZ-phaseZ-reach)/step);row<=Math.ceil((lb.maxZ-phaseZ+reach)/step);row++){
        const clusterId=`${region.id}-${column}-${row}`,rng=randomFor(`${world.seed}:farm-cluster:${clusterId}`);
        const u=column*step+phaseX+(rng()-.5)*12,v=row*step+phaseZ+(rng()-.5)*12;
        const cx=u*cos+v*sin,cz=-u*sin+v*cos,rotation=bearing+(rng()-.5)*.22,phase=rng()*Math.PI*2;
        const dominant=['wheat','pasture','wheat','orchard'][Math.floor(rng()*4)],priority=rng()*4;
        if(cx<b.minX-reach||cx>b.maxX+reach||cz<b.minZ-reach||cz>b.maxZ+reach)continue;
        for(let index=0;index<42;index++){
          const angle=phase+index*2.399963229728653,r=4.9*Math.sqrt(index),x=cx+Math.cos(angle)*r,z=cz+Math.sin(angle)*r;
          if(x<b.minX||x>b.maxX||z<b.minZ||z>b.maxZ)continue;
          const clearance=biomeDistance(world,'farmland',x,z);
          if(clearance<4.1)continue;
          const shape=randomFor(`${world.seed}:${clusterId}:${index}`);
          candidates.push({x,z,rotation,clusterId,dominant,clearance,seed:`${world.seed}:${clusterId}:${index}`,
            width:12.6+shape()*5.4,depth:9.6+shape()*4.4,score:priority+Math.min(clearance,14)*.18-r*.21});
        }
      }
    }
  }
  candidates.sort((a,b)=>b.score-a.score||a.x-b.x||a.z-b.z);
  // Compact estates are tried first; smaller edge plots fill the remaining
  // space around their neighbors instead of sprinkling identical stamps.
  for(const scale of [1,.76,.56])for(const candidate of candidates){
    if(result.area>=result.targetArea)return result;
    if(candidate.used)continue;
    const width=candidate.width*scale,depth=candidate.depth*scale,radius=Math.hypot(width,depth)/2;
    let nearest=null,nearestDistance=Infinity;
    for(const district of result.districts){
      const distance=surfaceDistance(world,candidate,district);
      if(distance<nearestDistance&&distance<radius+district.radius+10){nearest=district;nearestDistance=distance;}
    }
    const positions=[];
    if(nearest){
      const displacement=surfaceDisplacement(world,nearest,candidate),angle=Math.atan2(displacement.z,displacement.x),distance=radius+nearest.radius+.45;
      // At most three tangent placements make an estate grow beside existing
      // fields. This packs the reserved circles themselves, not only their art.
      for(const offset of [0,.24,-.24])positions.push({...surfaceOffset(world,nearest.x,nearest.z,Math.cos(angle+offset)*distance,Math.sin(angle+offset)*distance),
        rotation:nearest.rotation,clusterId:nearest.clusterId});
    }
    positions.push(candidate);
    let item;
    for(const position of positions){
      if(result.districts.some(d=>surfaceDistance(world,position,d)<radius+d.radius+.32))continue;
      if(!fitsBiome(world,'farmland',position.x,position.z,surfaceChartRadius(world,position.x,position.z,radius)))continue;
      const districtId=`farm-${candidate.clusterId}-${candidate.seed.split(':').at(-1)}`;
      const proposal={kind:'farm',x:position.x,y:0,z:position.z,width,depth,radius,scale:1,rotation:position.rotation,
        variant:0,districtId,clusterId:position.clusterId};
      if(canPlace(proposal)){
        proposal.parcels=parcelsFor(width,depth,candidate.seed,candidate.dominant);item=proposal;break;
      }
    }
    if(!item)continue;
    add(item);candidate.used=true;
    result.districts.push({id:item.districtId,clusterId:item.clusterId,x:item.x,z:item.z,width,depth,radius,
      rotation:item.rotation,parcelCount:item.parcels.length});
    result.area+=width*depth;
    result.cultivatedArea+=item.parcels.reduce((sum,p)=>sum+ringArea(p.polygon),0);
  }
  return result;
}
