import { biomeDistance, fitsBiome } from './biomes.js';

function randomFor(seed){
  let state=2166136261;
  for(const character of String(seed))state=Math.imul(state^character.charCodeAt(0),16777619);
  return()=>{state+=0x6D2B79F5;let t=Math.imul(state^state>>>15,state|1);
    t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};
}

function polygonArea(polygons){
  const area=ring=>Math.abs(ring.reduce((sum,p,i)=>{
    const q=ring[(i+1)%ring.length];return sum+p[0]*q[1]-q[0]*p[1];
  },0)/2);
  return polygons.reduce((sum,rings)=>sum+area(rings[0])-rings.slice(1).reduce((n,ring)=>n+area(ring),0),0);
}

function parcelsFor(width,depth,variant){
  const columns=width>=10?[.32,.38,.30]:[.54,.46],rows=[.53,.47];
  const border=.10,gapX=.24,gapZ=.30;
  const innerWidth=width-border*2-gapX*(columns.length-1),innerDepth=depth-border*2-gapZ;
  const palettes=[[0,0,1],[0,1,1],[0,0,2]],palette=palettes[variant%palettes.length];
  const parcels=[];let x=-width/2+border;
  for(let column=0;column<columns.length;column++){
    const w=innerWidth*columns[column];let z=-depth/2+border;
    for(let row=0;row<rows.length;row++){
      const d=innerDepth*rows[row];
      parcels.push({x:x+w/2,z:z+d/2,width:w,depth:d,variant:palette[(column+row)%palette.length]});
      z+=d+gapZ;
    }
    x+=w+gapX;
  }
  return parcels;
}

/** Plan grouped crop parcels without weakening the world's placement rules.
 * canPlace(item) must enforce all world/object clearances, and add(item) must
 * immediately reserve that item in the world before the next callback runs.
 * Width/depth and parcel coordinates are local and unscaled; radius is the
 * complete outer rectangle's circumscribed circle, including every crop row.
 */
export function placeFarmland(world,{density=1,canPlace,add}={}){
  if(typeof canPlace!=='function'||typeof add!=='function')throw new TypeError('Farmland requires canPlace and add callbacks');
  const regions=(world.biomes?.regions??[]).filter(region=>region.type==='farmland');
  const regionBounds=world.detailRegion;
  const regionArea=regions.reduce((total,region)=>total+polygonArea(region.polygons),0);
  const area=regionBounds?Math.min(regionArea,(regionBounds.maxX-regionBounds.minX)*(regionBounds.maxZ-regionBounds.minZ)):regionArea;
  const amount=Math.max(0,Math.min(3,Number(density)||0));
  const result={districts:[],area:0,targetArea:area*Math.min(.50,.28*amount)};
  if(!amount||!area)return result;
  const candidates=[];
  for(const region of regions){
    const random=randomFor(`${world.seed}:farmland:${region.id}`);
    // The whole agricultural region follows one cadastral grid. Its phase and
    // gentle bearing change with the seed, while adjoining plots stay aligned.
    const rotation=(Math.floor(random()*5)-2)*Math.PI/24,cos=Math.cos(rotation),sin=Math.sin(rotation);
    const local=region.polygons.flatMap(rings=>rings[0]).map(([x,z])=>({u:x*cos-z*sin,v:x*sin+z*cos}));
    const minU=Math.min(...local.map(p=>p.u)),maxU=Math.max(...local.map(p=>p.u));
    const minV=Math.min(...local.map(p=>p.v)),maxV=Math.max(...local.map(p=>p.v));
    const step=5.2,phaseU=random()*step,phaseV=random()*step,variant=Math.floor(random()*3);
    let startU=minU+phaseU,endU=maxU,startV=minV+phaseV,endV=maxV;
    if(regionBounds){
      const corners=[[regionBounds.minX,regionBounds.minZ],[regionBounds.maxX,regionBounds.minZ],[regionBounds.maxX,regionBounds.maxZ],[regionBounds.minX,regionBounds.maxZ]].map(([x,z])=>({u:x*cos-z*sin,v:x*sin+z*cos}));
      const lowU=Math.min(...corners.map(p=>p.u)),lowV=Math.min(...corners.map(p=>p.v));
      startU+=Math.max(0,Math.ceil((lowU-startU)/step))*step;startV+=Math.max(0,Math.ceil((lowV-startV)/step))*step;
      endU=Math.min(endU,Math.max(...corners.map(p=>p.u)));endV=Math.min(endV,Math.max(...corners.map(p=>p.v)));
    }
    for(let u=startU;u<endU;u+=step)for(let v=startV;v<endV;v+=step){
      const x=u*cos+v*sin,z=-u*sin+v*cos,clearance=biomeDistance(world,'farmland',x,z);
      if(clearance<4.4)continue;
      candidates.push({x,z,rotation,regionId:region.id,variant,clearance,
        score:clearance+random()*2});
    }
  }
  candidates.sort((a,b)=>b.score-a.score||a.x-b.x||a.z-b.z);
  // Reserve broad estates first, then use smaller grouped plots along the
  // usable margins. Each estate contains several tightly adjacent parcels.
  for(const [width,depth]of [[15.2,13.6],[11.2,9.8],[7.6,6.4]]){
    const radius=Math.hypot(width,depth)/2;
    for(const candidate of candidates){
      if(result.area>=result.targetArea)return result;
      if(candidate.used||candidate.clearance<radius||!fitsBiome(world,'farmland',candidate.x,candidate.z,radius))continue;
      if(result.districts.some(d=>Math.hypot(candidate.x-d.x,candidate.z-d.z)<radius+d.radius))continue;
      const districtId=`farm-${candidate.regionId}-${regionBounds?`${regionBounds.minX}-${regionBounds.minZ}-`:""}${result.districts.length+1}`;
      const item={kind:'farm',x:candidate.x,y:0,z:candidate.z,width,depth,radius,scale:1,
        rotation:candidate.rotation,variant:candidate.variant,districtId,
        parcels:parcelsFor(width,depth,candidate.variant)};
      if(!canPlace(item))continue;
      add(item);candidate.used=true;
      result.districts.push({id:districtId,x:item.x,z:item.z,width,depth,radius,
        rotation:item.rotation,parcelCount:item.parcels.length});
      result.area+=width*depth;
    }
  }
  return result;
}
