import * as THREE from 'three';
import {person} from './assets.js';
import {consolidate} from './geometry.js';
import {bakeMaterialColors} from './color-batches.js';
import {createPlayerPalette} from './player-palette.js';
import {M} from './palette.js';
import {applySceneStyle} from './scene-style.js';
import {rigidSurfacePoseMatrix,surfaceDistance} from './world-surface.js';

export const RESIDENT_LIMITS=Object.freeze({visible:192,detailRadius:95,walkingRadius:48,doorInset:.24,selectionInterval:.25});
const epsilon=1e-5,clamp=(value,a,b)=>Math.max(a,Math.min(b,value));
const distance=(a,b)=>Math.hypot(b.x-a.x,b.z-a.z);
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

function trimmedPoints(points){
  const result=points.filter(p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z)).map(p=>({x:p.x,y:p.y??0,z:p.z}));
  for(let i=result.length-1;i>0;i--)if(distance(result[i],result[i-1])<epsilon)result.splice(i,1);
  if(result.length<2)return [];
  const length=result.slice(1).reduce((sum,p,i)=>sum+distance(result[i],p),0),inset=Math.min(RESIDENT_LIMITS.doorInset,length*.2);
  function trim(){let left=inset;while(result.length>1){const span=distance(result[0],result[1]);if(left<span){result[0]=mix(result[0],result[1],left/span);break;}left-=span;result.shift();}}
  trim();result.reverse();trim();result.reverse();return result;
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
  for(const path of paths){const cityId=pathCities.get(path.id);if(cityId==null)continue;const points=trimmedPoints(path.points??[]);
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

/** The simulation owns stable residents, independently of visible chunks or
 * camera level. Extending roads preserves position, gait phase and random seed. */
export function createSettlementResidentSimulation(world={}){
  let graph={nodes:new Map(),edges:new Map()},residents=new Map(),revision=0;
  function enterEdge(resident,node){
    const choices=node.edges.filter(edge=>edge.id!==resident.edge?.id),pool=choices.length?choices:node.edges;
    if(!pool.length){resident.moving=false;return;}
    const edge=pool[Math.floor(random(resident)*pool.length)];resident.edge=edge;
    resident.direction=edge.a.id===node.id?1:-1;resident.along=resident.direction===1?0:edge.length;resident.moving=true;
  }
  function sync({houses=[],paths=[],cities}={}){
    const membership=eligibleHomes(houses,cities);graph=buildResidentPathGraph(paths,membership);const alive=new Set();
    for(const house of houses){const cityId=membership.get(house.id);if(cityId==null)continue;const id=`resident:${house.id}`;alive.add(id);
      let resident=residents.get(id);
      if(resident){resident.cityId=cityId;
        if(!resident.onRoad){const start=nearestEdge(graph,house,cityId);if(start){Object.assign(resident,start.position);resident.edge=start.edge;resident.along=start.t*start.edge.length;resident.direction=start.t>.5?-1:1;resident.onRoad=true;}continue;}
        const same=resident.edge&&graph.edges.get(resident.edge.id);
        if(same)resident.edge=same;
        else{const match=nearestEdge(graph,resident,cityId),previousEdge=resident.edge,previousDirection=resident.direction;
          // A new intersection may split an existing edge beneath the walker.
          // Adopt the exact new segment only when it occupies the same place.
          if(match&&match.error<.0002&&Math.abs(match.position.y-resident.y)<.002){resident.edge=match.edge;resident.along=match.t*match.edge.length;
            const heading=Math.atan2(match.edge.b.x-match.edge.a.x,match.edge.b.z-match.edge.a.z);
            const previousHeading=previousEdge?Math.atan2((previousEdge.b.x-previousEdge.a.x)*previousDirection,(previousEdge.b.z-previousEdge.a.z)*previousDirection):resident.heading;
            resident.direction=Math.cos(heading-previousHeading)>=0?1:-1;}
        }
        continue;
      }
      const seed=hash(`${world.seed??'island'}:${id}`)||1;
      resident={id,houseId:house.id,cityId,randomState:seed,x:house.x,y:house.y??0,z:house.z,heading:house.rotation??0,
        edge:null,along:0,direction:1,wait:0,phase:0,moving:false,distance:0,onRoad:false};
      resident.speed=.58+random(resident)*.32;resident.wait=random(resident)*1.8;resident.phase=random(resident)*Math.PI*2;
      const start=nearestEdge(graph,house,cityId);
      if(start){Object.assign(resident,start.position);resident.edge=start.edge;resident.along=start.t*start.edge.length;resident.onRoad=true;
        resident.direction=start.t>.5?-1:1;resident.heading=Math.atan2((start.edge.b.x-start.edge.a.x)*resident.direction,(start.edge.b.z-start.edge.a.z)*resident.direction);}
      residents.set(id,resident);
    }
    for(const id of residents.keys())if(!alive.has(id))residents.delete(id);revision++;
  }
  function update(dt){
    if(!Number.isFinite(dt)||dt<=0)return;
    // Consume bounded steps so a long visible frame cannot skip junctions.
    const elapsed=Math.min(dt,.5);
    for(const resident of residents.values()){
      let remaining=elapsed,travelled=0;resident.moving=false;
      while(remaining>epsilon){
        if(resident.wait>0){const pause=Math.min(resident.wait,remaining);resident.wait-=pause;remaining-=pause;if(remaining<epsilon)break;}
        if(!resident.edge)break;
        const edge=resident.edge,available=resident.direction>0?edge.length-resident.along:resident.along;
        const advance=Math.min(available,resident.speed*remaining);resident.along+=advance*resident.direction;remaining-=advance/resident.speed;travelled+=advance;
        const t=clamp(resident.along/edge.length,0,1);resident.x=edge.a.x+(edge.b.x-edge.a.x)*t;resident.y=edge.a.y+(edge.b.y-edge.a.y)*t;resident.z=edge.a.z+(edge.b.z-edge.a.z)*t;
        if(available-advance>epsilon)break;
        let node=resident.direction>0?edge.b:edge.a;
        // A removed/re-routed road can finish at its old doorstep, but must not
        // jump to a replacement network on the other side of a building.
        node=graph.nodes.get(node.id)??null;
        if(!node){resident.edge=null;break;}
        enterEdge(resident,node);
        if(node.edges.length===1||random(resident)<.16)resident.wait=.35+random(resident)*1.55;
      }
      resident.moving=travelled>epsilon;resident.distance+=travelled;resident.phase+=travelled*Math.PI*2/.43;
      if(resident.edge){const edge=resident.edge,target=Math.atan2((edge.b.x-edge.a.x)*resident.direction,(edge.b.z-edge.a.z)*resident.direction);
        resident.heading+=wrap(target-resident.heading)*(1-Math.exp(-elapsed*10));}
    }
  }
  return {sync,update,get residents(){return residents;},get graph(){return graph;},get revision(){return revision;},
    snapshot(){return [...residents.values()].map(({edge,randomState,...resident})=>({...resident,pathIds:edge?[...edge.pathIds]:[],edgeId:edge?.id??null}));},
    dispose(){residents.clear();graph={nodes:new Map(),edges:new Map()};}};
}

/** Two fixed-capacity instanced draws replace a scene hierarchy per citizen.
 * The head and coat reuse the same .75-unit passenger template as stations. */
export function createSettlementResidents(parent,world){
  const root=new THREE.Group();root.name='settlement-residents';parent.add(root);
  const owner=world.players?.find(player=>player.id===world.gameplay?.ownerId),palette=createPlayerPalette(owner),template=new THREE.Group();
  const model=person(template,{color:palette.body});model.remove(model.children[0],model.children[1]);
  bakeMaterialColors(consolidate(template));const bodySource=template.children[0];
  const body=new THREE.InstancedMesh(bodySource.geometry,bodySource.material,RESIDENT_LIMITS.visible);body.name='resident-bodies';
  const limbMaterial=applySceneStyle(new THREE.MeshStandardMaterial({color:0xffffff,roughness:1,flatShading:true}));
  const limbs=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),limbMaterial,RESIDENT_LIMITS.visible*4);limbs.name='resident-limbs';
  for(const mesh of [body,limbs]){mesh.count=0;mesh.frustumCulled=false;mesh.castShadow=mesh.receiveShadow=true;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);root.add(mesh);}
  for(let index=0;index<RESIDENT_LIMITS.visible*4;index++)limbs.setColorAt(index,index%2?palette.body.color:M.metal.color);
  const simulation=createSettlementResidentSimulation(world),pose=new THREE.Matrix4(),part=new THREE.Object3D(),matrix=new THREE.Matrix4();
  const selected=[],candidates=[];let selectionAge=Infinity,previousFocus=null,previousRadius=0,rendered=0;
  function select(focus,radius){candidates.length=0;
    for(const resident of simulation.residents.values())if(resident.edge){const d=surfaceDistance(world,focus,resident);if(d<radius)candidates.push({resident,d});}
    candidates.sort((a,b)=>a.d-b.d);selected.length=0;
    for(let i=0;i<Math.min(RESIDENT_LIMITS.visible,candidates.length);i++)selected.push(candidates[i].resident);
    previousFocus={x:focus.x,z:focus.z};previousRadius=radius;selectionAge=0;
  }
  function sync(snapshot){simulation.sync(snapshot);selectionAge=Infinity;}
  function update(dt,{focus={x:0,z:0},mapBlend=0,walkingWeight=0,visible=true,reducedMotion=false}={}){
    simulation.update(dt);selectionAge+=dt;
    root.visible=visible&&mapBlend<.98;if(!root.visible){rendered=0;return;}
    const radius=walkingWeight>.5?RESIDENT_LIMITS.walkingRadius:RESIDENT_LIMITS.detailRadius;
    if(selectionAge>=RESIDENT_LIMITS.selectionInterval||!previousFocus||previousRadius!==radius||surfaceDistance(world,focus,previousFocus)>3)select(focus,radius);
    let index=0,limbIndex=0;
    for(const resident of selected){
      rigidSurfacePoseMatrix(world,resident.x,resident.y+.012,resident.z,resident.heading,pose);body.setMatrixAt(index++,pose);
      const stride=resident.moving&&!reducedMotion?Math.sin(resident.phase)*.31:0;
      for(const side of [-1,1]){
        // Pivot each straight leg at the hip; the ankle stays attached and the
        // small pendulum motion has no exaggerated knee lift or body bounce.
        const swing=stride*side;
        part.position.set(side*.055,.32-Math.cos(swing)*.16,-Math.sin(swing)*.16);part.rotation.set(swing,0,0);part.scale.set(.075,.32,.10);part.updateMatrix();
        matrix.copy(pose).multiply(part.matrix);limbs.setMatrixAt(limbIndex++,matrix);
        const armSwing=-swing*.65;
        part.position.set(side*.143,.53-Math.cos(armSwing)*.105,-Math.sin(armSwing)*.105);part.rotation.set(armSwing,0,side*-.035);part.scale.set(.052,.21,.075);part.updateMatrix();
        matrix.copy(pose).multiply(part.matrix);limbs.setMatrixAt(limbIndex++,matrix);
      }
    }
    body.count=rendered=index;limbs.count=limbIndex;body.instanceMatrix.needsUpdate=limbs.instanceMatrix.needsUpdate=true;
  }
  return {root,body,limbs,sync,update,snapshot:()=>simulation.snapshot(),
    get stats(){return {residents:simulation.residents.size,visible:rendered,edges:simulation.graph.edges.size,revision:simulation.revision,draws:rendered?2:0};},
    dispose(){simulation.dispose();root.removeFromParent();body.dispose();limbs.dispose();body.geometry.dispose();limbs.geometry.dispose();
      for(const material of template.userData.ownedMaterials??[])material.dispose();limbMaterial.dispose();Object.values(palette).forEach(material=>material.dispose());selected.length=candidates.length=0;},
  };
}
