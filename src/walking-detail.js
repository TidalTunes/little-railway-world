import * as THREE from 'three';
import {C} from './palette.js';
import {applySceneStyle} from './scene-style.js';
import {biomeAt,fitsBiome} from './biomes.js';
import {riverBankDistance} from './hydrology.js';
import {polylineTree,SpatialGrid,pointBox} from './spatial-index.js';
import {surfaceFor,surfaceDistance,surfaceDisplacement,surfacePoint,rigidSurfacePoseMatrix} from './world-surface.js';
import {fieldOutline,fieldContains,fieldFeatureFootprint,fieldDetailSeed,farmRandom} from './farm-layout.js';
import {walkingGrassGeometry,addWalkingVegetationShader} from './walking-vegetation.js';

// These are embellishments of the existing world, never replacement terrain or
// scenery. Stable world/asset coordinates and fixed GPU pools make entry cheap.
export const WALKING_DETAIL_LIMITS=Object.freeze({radius:23,padding:6,refreshDistance:5,
  grass:9600,flowers:100,pebbles:100,crops:2800});
const tau=Math.PI*2,empty=[],kinds=['grass','flowers','pebbles','crops'];
const palette={grass:['grass','grassLight','meadow'],flowers:['white','gold','lavender'],
  pebbles:['gravel','rockLight','soilLight'],crops:['wheat']};
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
function grassObstacle(item,x,z,margin=.40){
  const scale=item.scale??1,dx=(x-item.x)/scale,dz=(z-item.z)/scale,angle=item.rotation??0;
  const u=dx*Math.cos(angle)-dz*Math.sin(angle),v=dx*Math.sin(angle)+dz*Math.cos(angle),pad=margin/scale;
  if(item.kind==='tree')return Math.hypot(dx,dz)<.22+pad;
  if(item.kind==='farm')return (item.parcels??[{x:0,z:0,width:item.width??3,depth:item.depth??4}])
    .some(field=>fieldContains(fieldOutline(field),u-(field.x??0),v-(field.z??0),-pad));
  if(item.kind==='house')return Math.abs(u)<1.1+pad&&Math.abs(v)<1.1+pad;
  if(item.kind==='station')return Math.abs(u)<3.2+pad&&Math.abs(v)<1.2+pad;
  if(item.kind==='person'||item.kind==='sheep')return false;
  return Math.hypot(x-item.x,z-item.z)<radiusOf(item)+margin;
}

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
    const id=itemKey(item);
    // Houses and trees are complete at every distance. Attaching a second set
    // of guessed mullions, sills or roots creates seams rather than detail.
    if(item.kind==='farm'&&item.width&&item.depth){
      const delta=surfaceDisplacement(world,item,focus),angle=item.rotation??0,s=item.scale??1;
      const localFocus={x:(delta.x*Math.cos(angle)-delta.z*Math.sin(angle))/s,z:(delta.x*Math.sin(angle)+delta.z*Math.cos(angle))/s};
      const localRadius=radius/s;
      for(const [index,field]of (item.parcels??[{x:0,z:0,width:item.width,depth:item.depth,variant:item.variant}]).entries()){
        const crop=field.crop??['wheat','vegetables','lavender'][((field.variant??item.variant??0)%3+3)%3];
        if(!['wheat','lavender','pasture','vegetables','orchard'].includes(crop))continue;
        const points=fieldOutline(field),random=farmRandom(fieldDetailSeed(field,item.variant));
        const feature=fieldFeatureFootprint(points,field.feature,field.featurePosition,random);
        const angle=field.rowsAngle??(field.rowsAlong==='x'?0:Math.PI/2),ca=Math.cos(angle),sa=Math.sin(angle);
        const pasture=crop==='pasture'||crop==='orchard';
        if(result[pasture?'grass':'crops'].length>=WALKING_DETAIL_LIMITS[pasture?'grass':'crops'])continue;
        const pitch=Math.max(.4,field.rowPitch??(crop==='vegetables'?.8:1.35));
        const reach=Math.hypot(field.width,field.depth)/2,step=pasture?.55:.27,inset=cropInset(points,.25);
        if(inset.length<3)continue;
        const fx=localFocus.x-(field.x??0),fz=localFocus.z-(field.z??0);
        const nearby=(px,pz)=>(px-fx)**2+(pz-fz)**2<localRadius*localRadius;
        if(pasture){
          const minX=Math.ceil(Math.max(-field.width/2,fx-localRadius)/step),maxX=Math.floor(Math.min(field.width/2,fx+localRadius)/step);
          const minZ=Math.ceil(Math.max(-field.depth/2,fz-localRadius)/step),maxZ=Math.floor(Math.min(field.depth/2,fz+localRadius)/step);
          for(let gx=minX;gx<=maxX;gx++)for(let gz=minZ;gz<=maxZ;gz++){
            if(result.grass.length>=WALKING_DETAIL_LIMITS.grass)break;
            const key=`${id}:parcel:${index}:sward:${gx}:${gz}`,r=farmRandom(hash(key));
            const px=(gx+(r()-.5)*.45)*step,pz=(gz+(r()-.5)*.45)*step;
            if(!nearby(px,pz)||!fieldContains(points,px,pz,.33)||feature&&Math.hypot(px-feature.center[0],pz-feature.center[1])<feature.radius+.33)continue;
            add('grass',item,key,(field.x??0)+px,.055,(field.z??0)+pz,.57,.13+r()*.07,.57,r()*tau,'meadow');
          }
          continue;
        }
        const across=inset.map(([x,z])=>-x*sa+z*ca),low=Math.min(...across),high=Math.max(...across);
        const rowCount=Math.max(1,Math.min(18,Math.round((high-low)/pitch))),rowSpacing=(high-low)/rowCount;
        // Match the exact broad crop ribbons that are visible from strategy
        // view. Additional stalks emerge from those rows rather than inventing
        // a second field layout. Troughs/barns retain their reserved clearance.
        let attempts=0;
        const focusU=fx*ca+fz*sa,focusV=-fx*sa+fz*ca;
        const rowOrder=Array.from({length:rowCount},(_,i)=>i).sort((a,b)=>Math.abs(low+(a+.5)*rowSpacing-focusV)-Math.abs(low+(b+.5)*rowSpacing-focusV));
        const startU=Math.ceil(Math.max(-reach,focusU-localRadius)/step)*step,endU=Math.min(reach,focusU+localRadius);
        const columns=[];for(let u=startU;u<=endU;u+=step)columns.push(u);columns.sort((a,b)=>Math.abs(a-focusU)-Math.abs(b-focusU));
        for(const row of rowOrder)for(const u of columns){
          if(++attempts>3600||result.crops.length>=WALKING_DETAIL_LIMITS.crops)break;
          const v=low+(row+.5)*rowSpacing,px=u*ca-v*sa,pz=u*sa+v*ca;
          if(!nearby(px,pz)||!fieldContains(points,px,pz,.30)||feature&&Math.hypot(px-feature.center[0],pz-feature.center[1])<feature.radius+.30)continue;
          if(feature&&Math.abs(v-(-feature.center[0]*sa+feature.center[1]*ca))<feature.radius+rowSpacing*.25
            &&Math.abs(u-(feature.center[0]*ca+feature.center[1]*sa))<feature.radius+.12)continue;
          const key=`${id}:parcel:${index}:${u.toFixed(3)}:${v.toFixed(3)}`,r=farmRandom(hash(key));
          const height=crop==='vegetables'?.12+r()*.07:crop==='lavender'?.24+r()*.06:.32+r()*.09;
          add('crops',item,key,(field.x??0)+px,.060,(field.z??0)+pz,.32,height,.32,r()*tau,crop==='lavender'?'lavender':crop==='vegetables'?'leafLight':'wheat');
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
    const rails=polylineTree(world.lines??empty),roads=polylineTree(cityStreets),step=.60;
    const cx=Math.round(focus.x/WALKING_DETAIL_LIMITS.refreshDistance)*WALKING_DETAIL_LIMITS.refreshDistance;
    const cz=Math.round(focus.z/WALKING_DETAIL_LIMITS.refreshDistance)*WALKING_DETAIL_LIMITS.refreshDistance;
    const candidates=[];
    for(let gx=Math.floor((cx-radius)/step);gx<=Math.ceil((cx+radius)/step);gx++)for(let gz=Math.floor((cz-radius)/step);gz<=Math.ceil((cz+radius)/step);gz++){
      const id=`ground:${world.seed??0}:${gx}:${gz}`,r=farmRandom(hash(id));
      const x=(gx+.30+r()*.4)*step,z=(gz+.30+r()*.4)*step;
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
      if(!fitsBiome(world,['plains','forest','farmland','desert'],x,z,.35)||riverBankDistance(world,x,z)<1.10)continue;
      if((world.mountains??empty).some(m=>Math.hypot(m.x-x,m.z-z)<(m.radius??0)+.5))continue;
      if(obstacles.query(pointBox(x,z,.40)).some(p=>grassObstacle(p,x,z)))continue;
      // Physical ballast is 1.88 units wide. One blade envelope beyond that
      // edge (and each paved edge) leaves crisp verges without bare strips.
      if(rails.nearest(x,z,s=>distanceToSegment(x,z,s),1.34)<1.34)continue;
      if(roads.nearest(x,z,s=>distanceToSegment(x,z,s)-(s.line.width??1)/2,.40,1.5)<.40)continue;
      const anchor={x,y:-.006,z,rotation:0,scale:1},choice=r();
      if(biome==='desert'){
        if(choice<.014)scatter('pebbles',anchor,id,0,.032,0,.07+r()*.11,.045+r()*.04,.06+r()*.10,r()*tau,'desertRock');
        else if(choice<.045)scatter('grass',anchor,id,0,0,0,.38,.11+r()*.09,.38,r()*tau,'soilLight');
      }else{
        const patch=.5+.5*Math.sin(x*.21+Math.sin(z*.17))*Math.cos(z*.25-x*.08);
        const height=(biome==='forest'?.13:.18)+patch*.09+r()*.04;
        const color=biome==='forest'?'grassDark':patch>.65?'meadow':patch<.27?'grassDark':'grass';
        scatter('grass',anchor,id,0,0,0,.65,height,.65,r()*tau,color);
        if(choice<.012&&patch>.50&&biome!=='forest')scatter('flowers',anchor,`${id}:flower`,0,height*.82,0,.035,.025,.035,r()*tau);
        else if(choice>.996)scatter('pebbles',anchor,`${id}:stone`,.13,.025,-.14,.07+r()*.08,.035+r()*.03,.07,r()*tau);
      }
      if(groundCache){
        groundCache.set(id,entries);
      }
    }
    // Repeated exploration retains a small reusable neighborhood, never the
    // whole planet. Distance fading hides incoming/retired outer cells.
    if(groundCache?.size>18000)for(const key of groundCache.keys()){groundCache.delete(key);if(groundCache.size<=14000)break;}
  }
  return result;
}

export function createWalkingDetail(parent,world){
  const root=new THREE.Group();root.name='walking-close-detail';root.visible=false;parent.add(root);
  const focusUniform={value:new THREE.Vector3()},timeUniform={value:0},playerUniform={value:new THREE.Vector3()},visibilityUniform={value:1};
  const batches={},pose=new THREE.Matrix4(),local=new THREE.Matrix4(),matrix=new THREE.Matrix4();
  const position=new THREE.Vector3(),scale=new THREE.Vector3(),rotation=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0);
  for(const kind of kinds){
    const vegetation=kind==='grass'||kind==='crops',geometry=vegetation?walkingGrassGeometry({crop:kind==='crops'}):new THREE.IcosahedronGeometry(1,0);
    const material=applySceneStyle(new THREE.MeshLambertMaterial({color:0xffffff,flatShading:!vegetation,side:vegetation?THREE.DoubleSide:THREE.FrontSide}));
    addWalkingVegetationShader(material,{focus:focusUniform,time:timeUniform,player:playerUniform,visibility:visibilityUniform},kind);
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
  function update(focus,{placements=empty,revision=0,visible=false,visibilityWeight=1,time=0,playerPosition=focus,cityStreets=world.cityStreets??empty}={}){
    if(disposed||!Number.isFinite(focus?.x)||!Number.isFinite(focus?.z))return;
    root.visible=visible;surfacePoint(world,focus.x,focus.y??0,focus.z,focusUniform.value);timeUniform.value=time;
    surfacePoint(world,playerPosition.x,playerPosition.y??0,playerPosition.z,playerUniform.value);
    visibilityUniform.value=THREE.MathUtils.clamp(visibilityWeight,0,1);
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
