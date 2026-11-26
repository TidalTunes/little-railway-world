import { biomeDistance, fitsBiome } from './biomes.js';
import {surfaceDistance,surfaceDisplacement,surfaceOffset,surfaceChartRadius,surfaceHeading,chartHeadingForSurface} from './world-surface.js';
import {farmFootprintsOverlap} from './farm-footprints.js';

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

const cropFamilies=[['wheat','fallow','pasture'],['pasture','wheat','orchard'],
  ['orchard','pasture','wheat'],['vegetables','wheat','pasture']];

function outlineFor(width,depth,seed){
  const random=randomFor(`${seed}:boundary`),w=width/2-.12,d=depth/2-.12;
  const notch=()=>.25+random()*Math.min(width,depth)*.16;
  return[[-w+notch(),-d],[w-notch(),-d],[w,-d+notch()],[w,d-notch()],
    [w-notch(),d],[-w+notch(),d],[-w,d-notch()],[-w,-d+notch()]];
}

function parcelsFor(width,depth,seed,family,footprint){
  const random=randomFor(seed),fields=[footprint];
  // Acreage, rather than a minimum garden count, decides the subdivision.
  // Small edge plots stay one field; broad estates have a few working parcels.
  const target=Math.max(1,Math.min(6,Math.round(width*depth/(100+random()*65))));
  for(let attempt=0;fields.length<target&&attempt<target*5;attempt++){
    const index=fields.reduce((best,p,i)=>ringArea(p)>ringArea(fields[best])?i:best,0),p=fields[index],b=boundsOf(p);
    const alongX=(b.maxX-b.minX)*(random()*.45+.8)>(b.maxZ-b.minZ),skew=(random()-.5)*.65;
    const nx=alongX?1:skew,nz=alongX?skew:1,values=p.map(([x,z])=>x*nx+z*nz);
    const low=Math.min(...values),high=Math.max(...values),split=low+(high-low)*(.28+random()*.44),gap=.24+random()*.16;
    const a=clip(p,nx,nz,split-gap/2),c=clip(p,-nx,-nz,-split-gap/2);
    if(a.length<3||c.length<3||Math.min(ringArea(a),ringArea(c))<26)continue;
    fields.splice(index,1,a,c);
  }
  return fields.map((polygon,index)=>{
    const b=boundsOf(polygon),x=(b.minX+b.maxX)/2,z=(b.minZ+b.maxZ)/2;
    const crop=random()<.72?family[0]:family[1+Math.floor(random()*2)],detailSeed=Math.floor(random()*1e8);
    const center=polygon.reduce((p,q)=>[p[0]+q[0]/polygon.length,p[1]+q[1]/polygon.length],[0,0]);
    const edge=Math.floor(random()*polygon.length),a=polygon[edge],c=polygon[(edge+1)%polygon.length];
    const featurePosition=[center[0]*.5+(a[0]+c[0])*.25-x,center[1]*.5+(a[1]+c[1])*.25-z];
    return{x,z,width:b.maxX-b.minX,depth:b.maxZ-b.minZ,polygon:polygon.map(([px,pz])=>[px-x,pz-z]),
      crop,variant:Math.floor(random()*3),rowsAngle:(random()<.2?0:Math.PI/2)+(random()-.5)*.12,
      rowPitch:.72+random()*.38,tone:.25+random()*.5,detailSeed,featurePosition,
      // A few hedged edges and farm features punctuate open fields; every
      // district deliberately retains quiet parcels with no little objects.
      hedgeEdges:polygon.map((_,edge)=>edge).filter(()=>random()<.16),
      feature:index===0&&ringArea(polygon)>85&&random()<.2?'barn':crop==='wheat'&&random()<.17?'bales':crop==='pasture'&&random()<.12?'trough':null};
  });
}

/** Plan adjoining agricultural estates. Circular reservations protect all
 * non-farm obstacles; neighboring farms compare their actual field hulls.
 * Regional requests use global cluster IDs
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
    const cos=Math.cos(bearing),sin=Math.sin(bearing),step=56,reach=38,phaseX=random()*step,phaseZ=random()*step;
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
        const family=cropFamilies[Math.floor(rng()*cropFamilies.length)],priority=rng()*4;
        if(cx<b.minX-reach||cx>b.maxX+reach||cz<b.minZ-reach||cz>b.maxZ+reach)continue;
        for(let index=0;index<28;index++){
          const angle=phase+index*2.399963229728653,r=6.2*Math.sqrt(index),x=cx+Math.cos(angle)*r,z=cz+Math.sin(angle)*r;
          if(x<b.minX||x>b.maxX||z<b.minZ||z>b.maxZ)continue;
          const clearance=biomeDistance(world,'farmland',x,z);
          if(clearance<4.1)continue;
          const shape=randomFor(`${world.seed}:${clusterId}:${index}`);
          candidates.push({x,z,rotation:chartHeadingForSurface(world,x,z,rotation),clusterId,family,clearance,seed:`${world.seed}:${clusterId}:${index}`,
            width:22+shape()*8,depth:16+shape()*8,score:priority+Math.min(clearance,18)*.18-r*.21});
        }
      }
    }
  }
  candidates.sort((a,b)=>b.score-a.score||a.x-b.x||a.z-b.z);
  // Compact estates are tried first; smaller edge plots fill the remaining
  // space around their neighbors instead of sprinkling identical stamps.
  for(const scale of [1,.7,.46])for(const candidate of candidates){
    if(result.area>=result.targetArea)return result;
    if(candidate.used)continue;
    const width=candidate.width*scale,depth=candidate.depth*scale,radius=Math.hypot(width,depth)/2;
    const footprint=outlineFor(width,depth,candidate.seed);
    let nearest=null,nearestDistance=Infinity;
    for(const district of result.districts){
      const distance=surfaceDistance(world,candidate,district);
      if(distance<nearestDistance&&distance<radius+district.radius+10){nearest=district;nearestDistance=distance;}
    }
    const positions=[];
    if(nearest){
      const displacement=surfaceDisplacement(world,nearest,candidate),heading=surfaceHeading(world,nearest.x,nearest.z,nearest.rotation);
      const cs=Math.cos(heading),sn=Math.sin(heading),dx=displacement.x*cs-displacement.z*sn,dz=displacement.x*sn+displacement.z*cs;
      const gap=world.surface?.type==='sphere'?.65:.44;
      const clamp=(value,span)=>Math.max(-span,Math.min(span,value));
      const options=[[(width+nearest.width)/2+gap,clamp(dz,nearest.depth*.3)],[-(width+nearest.width)/2-gap,clamp(dz,nearest.depth*.3)],
        [clamp(dx,nearest.width*.3),(depth+nearest.depth)/2+gap],[clamp(dx,nearest.width*.3),-(depth+nearest.depth)/2-gap]];
      options.sort((a,b)=>Math.hypot(a[0]-dx,a[1]-dz)-Math.hypot(b[0]-dx,b[1]-dz));
      for(const [u,v]of options){
        const position=surfaceOffset(world,nearest.x,nearest.z,u*cs+v*sn,-u*sn+v*cs);
        positions.push({...position,rotation:chartHeadingForSurface(world,position.x,position.z,heading),clusterId:nearest.clusterId,family:nearest.family});
      }
    }
    positions.push(candidate);
    let item;
    for(const position of positions){
      const districtId=`farm-${candidate.clusterId}-${candidate.seed.split(':').at(-1)}`;
      const proposal={kind:'farm',x:position.x,y:0,z:position.z,width,depth,radius,scale:1,rotation:position.rotation,
        variant:0,districtId,clusterId:position.clusterId,footprint};
      if(result.districts.some(d=>farmFootprintsOverlap(world,proposal,d,.32)))continue;
      if(!fitsBiome(world,'farmland',position.x,position.z,surfaceChartRadius(world,position.x,position.z,radius)))continue;
      if(canPlace(proposal)){
        proposal.family=position.family??candidate.family;
        proposal.parcels=parcelsFor(width,depth,candidate.seed,proposal.family,footprint);item=proposal;break;
      }
    }
    if(!item)continue;
    add(item);candidate.used=true;
    result.districts.push({kind:'farm',id:item.districtId,clusterId:item.clusterId,x:item.x,z:item.z,width,depth,radius,footprint,family:item.family,
      rotation:item.rotation,parcelCount:item.parcels.length});
    result.area+=width*depth;
    result.cultivatedArea+=item.parcels.reduce((sum,p)=>sum+ringArea(p.polygon),0);
  }
  return result;
}
