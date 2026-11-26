import * as THREE from 'three';
import {C} from './palette.js';
import {applySceneStyle} from './scene-style.js';
import {biomeAt,fitsBiome} from './biomes.js';
import {riverBankDistance} from './hydrology.js';
import {polylineTree,SpatialGrid,pointBox} from './spatial-index.js';
import {surfaceFor,surfaceDistance,surfacePoint,rigidSurfacePoseMatrix} from './world-surface.js';
import {fieldOutline,fieldContains,fieldFeatureFootprint,fieldDetailSeed,farmRandom} from './farm-layout.js';

// These are embellishments of the existing world, never replacement terrain or
// scenery. Stable world/asset coordinates and fixed GPU pools make entry cheap.
export const WALKING_DETAIL_LIMITS=Object.freeze({radius:22,padding:7,refreshDistance:5,
  grass:1500,flowers:160,pebbles:160,trim:1200,timber:280,litter:240,crops:900});
const tau=Math.PI*2,empty=[],kinds=['grass','flowers','pebbles','trim','timber','litter','crops'];
const palette={grass:['grassDark','leaf','grassLight'],flowers:['white','gold','lavender','leafPink'],
  pebbles:['gravel','rockLight','soilLight'],trim:['trim'],timber:['bark'],litter:['leafGold','soilLight','bark'],crops:['wheat']};
function hash(text){let h=2166136261;for(const c of String(text))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}
function distanceToSegment(x,z,{a,b}){const dx=b.x-a.x,dz=b.z-a.z,t=THREE.MathUtils.clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1),0,1);return Math.hypot(x-a.x-dx*t,z-a.z-dz*t);}
// Same convex inset and row count as farmRows in assets.js. Keeping the
// inset in physical asset space makes stalk rows coincide with the painted crop.
function cropInset(points,margin){
  let polygon=points;
  for(let i=0;i<points.length&&polygon.length>=3;i++){
    const a=points[i],b=points[(i+1)%points.length],dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz);
    if(length<1e-7)continue;
    const nx=dz/length,nz=-dx/length,limit=(a[0]*dz-a[1]*dx)/length-margin,output=[];
    for(let j=0;j<polygon.length;j++){
      const p=polygon[j],q=polygon[(j+1)%polygon.length],da=p[0]*nx+p[1]*nz-limit,db=q[0]*nx+q[1]*nz-limit;
      if(da<=0)output.push(p);
      if((da<0)!==(db<0)){const t=da/(da-db);output.push([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t]);}
    }
    polygon=output;
  }
  return polygon;
}
function itemKey(item){return String(item.id??`${item.kind}:${item.x}:${item.z}`);}
function radiusOf(item){return item.radius??(item.kind==='farm'?Math.hypot(item.width??3,item.depth??4)*(item.scale??1)/2:(item.kind==='tree'?.85:2.2)*(item.scale??1));}

/** Pure deterministic selection, also used by regression tests. Each record is
 * local to its real source asset; transforms are composed exactly once later. */
export function walkingDetailPlan(world,placements,focus,{cityStreets=world.cityStreets??empty,groundCache}={}){
  const result=Object.fromEntries(kinds.map(kind=>[kind,[]])),radius=WALKING_DETAIL_LIMITS.radius+WALKING_DETAIL_LIMITS.padding;
  const nearby=(placements??empty).filter(p=>surfaceDistance(world,p,focus)<radius+radiusOf(p))
    .sort((a,b)=>surfaceDistance(world,a,focus)-surfaceDistance(world,b,focus)||itemKey(a).localeCompare(itemKey(b)));
  function add(kind,anchor,id,x,y,z,sx,sy,sz,rotation=0,color){
    const item={id,anchor,x,y,z,sx,sy,sz,rotation,color:color??palette[kind][hash(id)%palette[kind].length]};
    if(result[kind].length<WALKING_DETAIL_LIMITS[kind])result[kind].push(item);
    return item;
  }
  for(const item of nearby){
    const id=itemKey(item),rng=farmRandom(hash(id));
    if(item.kind==='house'&&Number.isFinite(item.variant)){
      const type=((item.variant%4)+4)%4,w=type===1?1.62:1.82,d=type===1?1.90:1.72,h=type===2?1.65:1.42,front=d/2+.069;
      // Mullions sit on the same authored panes; gutters, sills and hardware
      // stay inside the original 2.2 x 2.2 house envelope.
      for(const side of [-1,1]){
        const x=side*w*.29;
        add('trim',item,`${id}:mullion:${side}`,x,.91,front,.026,.43,.012);
        add('trim',item,`${id}:cross:${side}`,x,.91,front,.35,.023,.013);
        add('trim',item,`${id}:sill:${side}`,x,.654,front,.49,.043,.095);
        add('trim',item,`${id}:side-mullion:${side}`,side*(w/2+.065),.92,0,.012,.36,.025);
        add('trim',item,`${id}:side-cross:${side}`,side*(w/2+.065),.92,0,.012,.024,.35);
        add('timber',item,`${id}:gutter:${side}`,side*(w/2+.11),h+.16,0,.045,.055,d+.22,0,'roofDark');
      }
      add('trim',item,`${id}:threshold`,0,.145,front,.42,.025,.12,0,'platform');
      add('trim',item,`${id}:handle`,.105,.53,front+.009,.025,.045,.028,0,'gold');
      for(const x of [-.085,.085])add('timber',item,`${id}:door-panel:${x}`,x,.52,front-.018,.12,.52,.012,0,'timber');
    }else if(item.kind==='tree'){
      for(let j=0;j<3;j++){
        const a=j*tau/3+rng()*.2;
        add('timber',item,`${id}:root:${j}`,Math.sin(a)*.14,.06,Math.cos(a)*.14,.045,.095,.35,a);
      }
      for(let j=0;j<5;j++){
        const a=rng()*tau,r=.22+rng()*.36;
        add('litter',item,`${id}:leaf:${j}`,Math.sin(a)*r,.026,Math.cos(a)*r,.07+rng()*.06,.009,.035+rng()*.04,a);
      }
    }else if(item.kind==='farm'&&item.width&&item.depth){
      for(const [index,field]of (item.parcels??[{x:0,z:0,width:item.width,depth:item.depth,variant:item.variant}]).entries()){
        const crop=field.crop??['wheat','vegetables','lavender'][((field.variant??item.variant??0)%3+3)%3];
        if(!['wheat','lavender','pasture'].includes(crop))continue;
        const points=fieldOutline(field),random=farmRandom(fieldDetailSeed(field,item.variant));
        const feature=fieldFeatureFootprint(points,field.feature,field.featurePosition,random);
        const angle=field.rowsAngle??(field.rowsAlong==='x'?0:Math.PI/2),ca=Math.cos(angle),sa=Math.sin(angle);
        const pitch=Math.max(.4,field.rowPitch??(crop==='pasture'?.85:1.35));
        const reach=Math.hypot(field.width,field.depth)/2,step=.52,inset=cropInset(points,.25);
        if(inset.length<3)continue;
        const across=inset.map(([x,z])=>-x*sa+z*ca),low=Math.min(...across),high=Math.max(...across);
        const rowCount=Math.max(1,Math.min(18,Math.round((high-low)/pitch))),rowSpacing=(high-low)/rowCount;
        // Match the exact broad crop ribbons that are visible from strategy
        // view. Additional stalks emerge from those rows rather than inventing
        // a second field layout. Troughs/barns retain their reserved clearance.
        let attempts=0;
        for(let row=0;row<rowCount;row++)for(let u=Math.ceil(-reach/step)*step;u<=reach;u+=step){
          if(++attempts>1800||result[crop==='pasture'?'grass':'crops'].length>=WALKING_DETAIL_LIMITS[crop==='pasture'?'grass':'crops'])break;
          const v=low+(row+.5)*rowSpacing,px=u*ca-v*sa,pz=u*sa+v*ca;
          if(!fieldContains(points,px,pz,.20)||feature&&Math.hypot(px-feature.center[0],pz-feature.center[1])<feature.radius+.20)continue;
          if(feature&&Math.abs(v-(-feature.center[0]*sa+feature.center[1]*ca))<feature.radius+rowSpacing*.25
            &&Math.abs(u-(feature.center[0]*ca+feature.center[1]*sa))<feature.radius+.12)continue;
          const key=`${id}:parcel:${index}:${u.toFixed(3)}:${v.toFixed(3)}`,r=farmRandom(hash(key));
          const kind=crop==='pasture'?'grass':'crops',height=crop==='pasture'?.13+r()*.10:.22+r()*.14;
          add(kind,item,key,(field.x??0)+px,.068,(field.z??0)+pz,.10,height,.10,r()*tau,crop==='lavender'?'lavender':crop==='pasture'?'grassDark':'wheat');
        }
      }
    }
  }
  // Flat maps have a permanent world-space lattice. Globe assets above use
  // their exact rigid surface frames; free ground detail awaits a geodesic
  // lattice instead of stretching a chart grid around the poles.
  if(!surfaceFor(world)&&world.biomes){
    const obstacles=new SpatialGrid(5);
    for(const item of [...nearby,...(world.stations??[])])if(item.kind!=='sheep')obstacles.insert(item,pointBox(item.x,item.z,radiusOf(item)+.3));
    const rails=polylineTree(world.lines??empty),roads=polylineTree(cityStreets),step=1.25;
    const cx=Math.round(focus.x/WALKING_DETAIL_LIMITS.refreshDistance)*WALKING_DETAIL_LIMITS.refreshDistance;
    const cz=Math.round(focus.z/WALKING_DETAIL_LIMITS.refreshDistance)*WALKING_DETAIL_LIMITS.refreshDistance;
    const candidates=[];
    for(let gx=Math.floor((cx-radius)/step);gx<=Math.ceil((cx+radius)/step);gx++)for(let gz=Math.floor((cz-radius)/step);gz<=Math.ceil((cz+radius)/step);gz++){
      const id=`ground:${world.seed??0}:${gx}:${gz}`,r=farmRandom(hash(id));
      const x=(gx+.15+r()*.7)*step,z=(gz+.15+r()*.7)*step;
      const distance=(x-focus.x)**2+(z-focus.z)**2;if(distance>radius*radius)continue;
      candidates.push({id,r,x,z,distance});
    }
    candidates.sort((a,b)=>a.distance-b.distance);
    for(const {id,r,x,z}of candidates){
      if(groundCache?.has(id)){
        for(const [kind,item]of groundCache.get(id)??empty)if(result[kind].length<WALKING_DETAIL_LIMITS[kind])result[kind].push(item);
        continue;
      }
      groundCache?.set(id,null);
      const entries=[];
      const scatter=(kind,...args)=>{const item=add(kind,...args);entries.push([kind,item]);};
      const biome=biomeAt(world,x,z);if(!['plains','forest','farmland','desert'].includes(biome))continue;
      if(!fitsBiome(world,['plains','forest','farmland','desert'],x,z,.30)||riverBankDistance(world,x,z)<1.05)continue;
      if((world.mountains??empty).some(m=>Math.hypot(m.x-x,m.z-z)<(m.radius??0)+.5))continue;
      if((world.cities??empty).some(c=>Math.hypot(c.x-x,c.z-z)<(c.radius??0)+.3))continue;
      if(obstacles.query(pointBox(x,z,.3)).some(p=>Math.hypot(p.x-x,p.z-z)<radiusOf(p)+.25))continue;
      if(rails.nearest(x,z,s=>distanceToSegment(x,z,s),1.45)<1.45)continue;
      if(roads.nearest(x,z,s=>distanceToSegment(x,z,s)-(s.line.width??1)/2,1.0,1.5)<1.0)continue;
      const anchor={x,y:.024,z,rotation:0,scale:1},choice=r();
      if(biome==='desert'){
        if(choice<.14)scatter('pebbles',anchor,id,0,.035,0,.07+r()*.11,.045+r()*.04,.06+r()*.10,r()*tau,'desertRock');
        else if(choice<.34)scatter('grass',anchor,id,0,0,0,.16,.12+r()*.12,.16,r()*tau,'wheat');
      }else{
        const height=.13+r()*.18;
        scatter('grass',anchor,id,0,0,0,.14+r()*.08,height,.14+r()*.08,r()*tau,biome==='forest'?'grassDark':undefined);
        if(choice<.075)scatter('flowers',anchor,`${id}:flower`,0,height*.85,0,.07,.065,.07,r()*tau);
        else if(choice>.95)scatter('pebbles',anchor,`${id}:stone`,.13,.035,-.14,.07+r()*.08,.035+r()*.03,.07,r()*tau);
      }
      if(groundCache){
        groundCache.set(id,entries);
      }
    }
    // Repeated exploration retains a small reusable neighborhood, never the
    // whole planet. Distance fading hides incoming/retired outer cells.
    if(groundCache?.size>6000)for(const key of groundCache.keys()){groundCache.delete(key);if(groundCache.size<=4500)break;}
  }
  return result;
}

function grassGeometry(){
  const vertices=[];
  for(let i=0;i<3;i++){
    const angle=i*Math.PI/3,c=Math.cos(angle),s=Math.sin(angle),height=1-i*.10;
    vertices.push(-.28*c,0,-.28*s,.28*c,0,.28*s,.18*c,height,.18*s);
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();return geometry;
}

export function createWalkingDetail(parent,world){
  const root=new THREE.Group();root.name='walking-close-detail';root.visible=false;parent.add(root);
  const focusUniform={value:new THREE.Vector3()},timeUniform={value:0};
  const batches={},pose=new THREE.Matrix4(),local=new THREE.Matrix4(),matrix=new THREE.Matrix4();
  const position=new THREE.Vector3(),scale=new THREE.Vector3(),rotation=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0);
  for(const kind of kinds){
    const vegetation=kind==='grass'||kind==='crops',geometry=vegetation?grassGeometry():kind==='flowers'||kind==='pebbles'?new THREE.IcosahedronGeometry(1,0):new THREE.BoxGeometry(1,1,1);
    const material=applySceneStyle(new THREE.MeshStandardMaterial({color:0xffffff,roughness:1,flatShading:true,side:vegetation?THREE.DoubleSide:THREE.FrontSide}));
    const before=material.onBeforeCompile,key=material.customProgramCacheKey();
    material.onBeforeCompile=(shader,renderer)=>{
      before(shader,renderer);shader.uniforms.walkFocus=focusUniform;shader.uniforms.walkTime=timeUniform;
      shader.vertexShader='uniform vec3 walkFocus; uniform float walkTime; varying float walkDistance;\n'+shader.vertexShader;
      if(vegetation)shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
        transformed.x += sin(walkTime * 1.7 + instanceMatrix[3].x * 1.2 + instanceMatrix[3].z * 0.8) * position.y * position.y * 0.10;`);
      shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>',`#include <project_vertex>
        walkDistance = distance((modelMatrix * instanceMatrix * vec4(0.,0.,0.,1.)).xyz, walkFocus);`);
      shader.fragmentShader='varying float walkDistance;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>',`#include <clipping_planes_fragment>
        float detailCoverage = 1.0 - smoothstep(15.0, 22.0, walkDistance);
        float detailDither = fract(dot(floor(gl_FragCoord.xy), vec2(0.754877666, 0.569840291)));
        if(detailCoverage <= detailDither) discard;`);
    };
    material.customProgramCacheKey=()=>`${key}|walking-detail-v1:${kind}`;
    const batch=new THREE.InstancedMesh(geometry,material,WALKING_DETAIL_LIMITS[kind]);batch.name=`walking-${kind}`;
    // Allocate colors even for currently empty pools, so precompilation uses
    // the same instancing shader variant that a later neighborhood needs.
    batch.setColorAt(0,C.white);batch.count=0;batch.frustumCulled=false;batch.castShadow=false;batch.receiveShadow=true;batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    root.add(batch);batches[kind]=batch;
  }
  const stats={builds:0,instances:0,drawCalls:kinds.length,ready:false};
  let previousPlacements=null,previousRevision=-1,previousStreets=null,lastFocus={x:Infinity,z:Infinity},disposed=false;
  let localPlacements=[],localStreets=[];
  const groundCache=new Map();
  const sameRecords=(a,b)=>{if(a.length!==b.length)return false;const members=new Set(a);return b.every(item=>members.has(item));};
  function streetsNear(streets,focus){
    const radius=WALKING_DETAIL_LIMITS.radius+WALKING_DETAIL_LIMITS.padding;
    return streets.filter(street=>street.points?.some((point,index)=>surfaceDistance(world,point,focus)<radius+(street.width??1)
      ||!surfaceFor(world)&&index>0&&distanceToSegment(focus.x,focus.z,{a:street.points[index-1],b:point})<radius+(street.width??1)));
  }
  function update(focus,{placements=empty,revision=0,visible=false,time=0,cityStreets=world.cityStreets??empty}={}){
    if(disposed||!Number.isFinite(focus?.x)||!Number.isFinite(focus?.z))return;
    root.visible=visible;surfacePoint(world,focus.x,focus.y??0,focus.z,focusUniform.value);timeUniform.value=time;
    const sourceChanged=placements!==previousPlacements||revision!==previousRevision||cityStreets!==previousStreets;
    const moved=!Number.isFinite(lastFocus.x)||surfaceDistance(world,focus,lastFocus)>=WALKING_DETAIL_LIMITS.refreshDistance;
    if(!sourceChanged&&!moved)return;
    const radius=WALKING_DETAIL_LIMITS.radius+WALKING_DETAIL_LIMITS.padding;
    const nextPlacements=placements.filter(item=>surfaceDistance(world,item,focus)<radius+radiusOf(item));
    const nextStreets=streetsNear(cityStreets,focus);
    const localChanged=!sameRecords(localPlacements,nextPlacements)||!sameRecords(localStreets,nextStreets);
    previousPlacements=placements;previousRevision=revision;previousStreets=cityStreets;
    // Publishing an unrelated continent changes the renderer's revision but
    // cannot change this player's detail. Retain both matrices and ground cache.
    if(!moved&&!localChanged&&stats.ready)return;
    if(sourceChanged&&localChanged)groundCache.clear();
    localPlacements=nextPlacements;localStreets=nextStreets;
    const plan=walkingDetailPlan(world,localPlacements,focus,{cityStreets:localStreets,groundCache});let count=0;
    for(const kind of kinds){
      const batch=batches[kind],items=plan[kind];batch.count=items.length;count+=items.length;
      for(const [index,item]of items.entries()){
        const anchor=item.anchor;
        rigidSurfacePoseMatrix(world,anchor.x,anchor.y??0,anchor.z,anchor.rotation??0,pose);pose.scale(scale.setScalar(anchor.scale??1));
        position.set(item.x,item.y,item.z);scale.set(item.sx,item.sy,item.sz);rotation.setFromAxisAngle(up,item.rotation);
        local.compose(position,rotation,scale);matrix.multiplyMatrices(pose,local);batch.setMatrixAt(index,matrix);batch.setColorAt(index,C[item.color]??C.grass);
      }
      batch.instanceMatrix.needsUpdate=true;if(batch.instanceColor)batch.instanceColor.needsUpdate=true;
    }
    lastFocus={x:focus.x,z:focus.z};
    Object.assign(stats,{builds:stats.builds+1,instances:count,ready:true});
  }
  function dispose(){if(disposed)return;disposed=true;for(const batch of Object.values(batches)){batch.geometry.dispose();batch.material.dispose();batch.dispose();}root.removeFromParent();}
  return {root,stats,update,dispose};
}
