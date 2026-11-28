import * as THREE from 'three';
import {createMilitaryBatch} from './military-batch.js';
import {createMilitaryEffects} from './military-effects.js';
import {MILITARY_KINDS,MILITARY_ART} from './military-assets.js';
import {militaryColors} from './military-palette.js';
import {MILITARY_WEAPONS,getMilitaryLocalDirection} from './military-kinematics.js';
import {worldSurface} from './world-model.js';
import {surfacePoint,surfaceNormal,surfaceFrame,surfaceDisplacement,surfaceOffset,rigidSurfacePoseMatrix,chartHeadingForSurface} from './world-surface.js';

const UP=new THREE.Vector3(0,1,0),IDENTITY=new THREE.Quaternion();
const WHITE=new THREE.Color('#f5f1d7'),INK=new THREE.Color('#102d35'),SHIELD=new THREE.Color('#a6e6dc');
const WOUNDED=new THREE.Color('#efd186'),CRITICAL=new THREE.Color('#ef897a');
const SIZE={soldier:.52,tank:1.5,artillery:1.4,helicopter:2.2};
const HEIGHT={soldier:.88,tank:1.6,artillery:1.7,helicopter:1.65};
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const angleDelta=(to,from)=>Math.atan2(Math.sin(to-from),Math.cos(to-from));
const phase=id=>{let n=0;for(const c of String(id))n=(n*31+c.charCodeAt(0))>>>0;return(n%997)/997;};
const finitePoint=p=>p&&[p.x,p.y,p.z].every(Number.isFinite);

function basic(name,{opacity=1,depthTest=false}={}){
  return new THREE.MeshBasicMaterial({name,color:0xffffff,transparent:true,opacity,depthTest,depthWrite:false,
    side:THREE.DoubleSide,toneMapped:false,fog:false});
}
function instances(parent,name,geometry,capacity,material,order=21){
  const mesh=new THREE.InstancedMesh(geometry,material,capacity);mesh.name=name;mesh.count=0;mesh.visible=false;
  mesh.frustumCulled=false;mesh.renderOrder=order;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.setColorAt(0,WHITE);mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);parent.add(mesh);return mesh;
}
function flush(mesh){mesh.visible=mesh.count>0;if(mesh.count){mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;}}
function polygon(points){const shape=new THREE.Shape(points.map(([x,z])=>new THREE.Vector2(x,-z)));return new THREE.ShapeGeometry(shape).rotateX(-Math.PI/2);}
function markerGeometry(kind){
  if(kind==='soldier')return new THREE.CircleGeometry(1,6).rotateX(-Math.PI/2);
  if(kind==='tank')return polygon([[-.8,-.9],[.8,-.9],[.8,.55],[.3,.55],[.3,1.1],[-.3,1.1],[-.3,.55],[-.8,.55]]);
  if(kind==='artillery')return polygon([[0,1.25],[-.9,-.65],[-.34,-.65],[-.34,-1],[.34,-1],[.34,-.65],[.9,-.65]]);
  return polygon([[-.26,-1.15],[.26,-1.15],[.26,-.2],[1.1,-.2],[1.1,.24],[.3,.24],[.3,.8],[0,1.15],[-.3,.8],[-.3,.24],[-1.1,.24],[-1.1,-.2],[-.26,-.2]]);
}
function shieldGeometry(){
  const shape=new THREE.Shape([new THREE.Vector2(-.5,.45),new THREE.Vector2(.5,.45),new THREE.Vector2(.42,-.17),new THREE.Vector2(0,-.55),new THREE.Vector2(-.42,-.17)]);
  return new THREE.ShapeGeometry(shape);
}

/** One live military renderer. Articulation is baked once into shared GPU
 * clips; the two render layers share effect buffers rather than simulating
 * projectiles twice. All overlays have fixed instance capacities. */
export function createMilitaryWorldArt(parent,mapParent,world,{capacity=2048}={}){
  if(!parent?.isObject3D||!mapParent?.isObject3D)throw new TypeError('Military art requires two scene parents');
  if(!Number.isSafeInteger(capacity)||capacity<1||capacity>8192)throw new RangeError('Military capacity must be 1–8192');
  const root=new THREE.Group(),mapRoot=new THREE.Group();root.name='military-world';mapRoot.name='military-map';parent.add(root);mapParent.add(mapRoot);
  const batch=createMilitaryBatch(root,{capacity,world});
  const effects=createMilitaryEffects(root,{maxProjectiles:Math.min(capacity,256),maxParticles:Math.min(capacity*6,1536),maxMarks:Math.min(capacity,256),maxLights:4});
  const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedMeshes=[];
  const geometry=g=>(ownedGeometry.add(g),g),material=m=>(ownedMaterial.add(m),m);
  const create=(p,n,g,m,order)=>{const mesh=instances(p,n,g,capacity,m,order);ownedMeshes.push(mesh);return mesh;};
  const ringGeometry=geometry(new THREE.RingGeometry(.87,1,32).rotateX(-Math.PI/2));
  const barGeometry=geometry(new THREE.PlaneGeometry(1,1));
  const shieldGeo=geometry(shieldGeometry());
  const outlineMaterial=material(basic('military-selected',{opacity:.95}));
  const protectedMaterial=material(basic('military-protected',{opacity:.6}));
  const barMaterial=material(basic('military-health'));
  const detailBarMaterial=material(basic('military-health-detail'));
  const mapMarkerMaterial=material(basic('military-map-unit'));
  const mapRimMaterial=material(basic('military-map-unit-rim'));
  function overlay(group,suffix){const healthMaterial=suffix==='detail'?detailBarMaterial:barMaterial;return{
    selection:create(group,`military-selection-${suffix}`,ringGeometry,outlineMaterial,19),
    protection:create(group,`military-protection-${suffix}`,ringGeometry,protectedMaterial,18),
    healthBack:create(group,`military-health-back-${suffix}`,barGeometry,healthMaterial,22),
    health:create(group,`military-health-${suffix}`,barGeometry,healthMaterial,23),
    shield:create(group,`military-shield-${suffix}`,shieldGeo,healthMaterial,24),
  };}
  const detailOverlay=overlay(root,'detail'),mapOverlay=overlay(mapRoot,'map');
  const mapMarkers=new Map(MILITARY_KINDS.map(kind=>{const g=geometry(markerGeometry(kind));return[kind,{
    rim:create(mapRoot,`military-map-${kind}-rim`,g,mapRimMaterial,19),
    fill:create(mapRoot,`military-map-${kind}`,g,mapMarkerMaterial,20),
  }];}));
  // These are render aliases, not additional effect pools. Their instance data
  // belongs to the detailed effects and is uploaded once per frame.
  const mapEffects=new THREE.Group();mapEffects.name='military-map-effects';mapRoot.add(mapEffects);
  const effectAliases=effects.root.children.map(source=>{
    const glow=source.name==='military-glows',m=material(basic(`${source.name}-map`,{opacity:glow?.25:1,depthTest:!!world.surface}));
    m.blending=source.material.blending;
    m.onBeforeCompile=shader=>{
      shader.vertexShader='attribute float effectOpacity; varying float vEffectOpacity; varying vec2 vMapGlow;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvEffectOpacity=effectOpacity;vMapGlow=position.xz;');
      if(!world.surface)shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>',`vec4 mvPosition=instanceMatrix*vec4(transformed,1.0);
        mvPosition.y=.95;mvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;`);
      shader.fragmentShader='varying float vEffectOpacity; varying vec2 vMapGlow;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>\ndiffuseColor.a*=vEffectOpacity;${glow?'diffuseColor.a*=pow(max(0.0,1.0-dot(vMapGlow,vMapGlow)),2.0);':''}`);
    };
    m.customProgramCacheKey=()=> `military-map-effects-v3:${glow}:${!!world.surface}`;
    const mesh=new THREE.InstancedMesh(source.geometry,m,source.instanceMatrix.count);mesh.name=`${source.name}-map`;
    mesh.instanceMatrix=source.instanceMatrix;mesh.instanceColor=source.instanceColor;mesh.frustumCulled=false;mesh.renderOrder=25;mesh.count=0;mesh.visible=false;mapEffects.add(mesh);
    ownedMeshes.push(mesh);return{source,mesh};
  });
  const zoneRoots=[new THREE.Group(),new THREE.Group()];zoneRoots.forEach((group,i)=>{group.name='military-spawn-zone';(i?mapRoot:root).add(group);});
  let zoneKey='',zoneGeometries=[],zoneMaterials=[],zoneCount=0;
  const poses=new Map(),renderUnits=[],teamColors=new Map(),owners=new Map((world.players??[]).map(player=>[player.id,player]));
  const matrix=new THREE.Matrix4(),position=new THREE.Vector3(),size=new THREE.Vector3(),quaternion=new THREE.Quaternion();
  const rootInverse=new THREE.Matrix4(),mapInverse=new THREE.Matrix4();
  const surfaceMatrix=new THREE.Matrix4(),effectMatrix=new THREE.Matrix4(),effectInverse=new THREE.Matrix4(),surfaceUp=new THREE.Vector3(),surfaceFocus=new THREE.Vector3(),displacement={},offsetPosition={};
  const projected=new THREE.Vector3(),view=new THREE.Vector3(),cameraUp=new THREE.Vector3(),cameraRight=new THREE.Vector3(),color=new THREE.Color();
  let revision=null,lastUnits=null,clock=0,disposed=false,drawn=0,healthCount=0,shieldCount=0,selectedCount=0,contactAt=0;
  const colorFor=unit=>{const key=unit.ownerId??unit.team??'teal';if(!teamColors.has(key))teamColors.set(key,militaryColors(owners.get(unit.ownerId)??unit.team??'teal'));return teamColors.get(key);};
  function syncUnits(simulation,dt){
    const units=simulation?.units??[],next=simulation?.membershipRevision??units.length;
    if(revision!==next||lastUnits!==units){
      const previous=new Map(poses);renderUnits.length=0;poses.clear();
      for(let i=0;i<Math.min(units.length,capacity);i++){
        const unit=units[i],record=previous.get(unit.id)??{...unit,aimYaw:unit.aimYaw??0,elevation:unit.elevation??MILITARY_WEAPONS[unit.kind].restElevation,pitch:unit.pitch??0,roll:unit.roll??0,team:owners.get(unit.ownerId)??unit.team??'teal',phase:phase(unit.id)};
        record.source=unit;poses.set(unit.id,record);renderUnits.push(record);
      }
      batch.setUnits(renderUnits);
      revision=next;lastUnits=units;
    }
    const alpha=1-Math.exp(-22*dt);
    for(const pose of renderUnits){
      const unit=pose.source;surfaceDisplacement(world,pose,unit,displacement);
      const dx=displacement.x,dy=unit.y-pose.y,dz=displacement.z,turn=angleDelta(unit.heading??0,pose.heading??0);
      const aim=angleDelta(unit.aimYaw??0,pose.aimYaw),elevation=(unit.elevation??MILITARY_WEAPONS[unit.kind].restElevation)-pose.elevation,pitch=(unit.pitch??0)-pose.pitch,roll=(unit.roll??0)-pose.roll;
      const moved=dx*dx+dy*dy+dz*dz>1e-10||Math.abs(turn)>1e-5||Math.abs(aim)>1e-5||Math.abs(elevation)>1e-5||Math.abs(pitch)>1e-5||Math.abs(roll)>1e-5||pose.moving!==unit.moving;
      if(moved&&(dt>0||dx*dx+dy*dy+dz*dz>16)){
        const snap=dx*dx+dy*dy+dz*dz>16,blend=snap?1:alpha;
        // Surface conversion uses `elevation` for chart altitude internally.
        // Never use the rig pose as its output: that would erase barrel pitch.
        surfaceOffset(world,pose.x,pose.z,dx*blend,dz*blend,offsetPosition);pose.x=offsetPosition.x;pose.z=offsetPosition.z;
        pose.y+=dy*blend;pose.heading=(pose.heading??0)+turn*blend;pose.moving=unit.moving;
        pose.aimYaw+=aim*blend;pose.elevation+=elevation*blend;pose.pitch+=pitch*blend;pose.roll+=roll*blend;
        // Settle exactly rather than indefinitely uploading imperceptible tails.
        if(Math.abs(unit.x-pose.x)<1e-5)pose.x=unit.x;if(Math.abs(unit.y-pose.y)<1e-5)pose.y=unit.y;if(Math.abs(unit.z-pose.z)<1e-5)pose.z=unit.z;
        if(Math.abs(angleDelta(unit.heading??0,pose.heading))<1e-5)pose.heading=unit.heading??0;
        for(const key of['aimYaw','elevation','pitch','roll']){const target=unit[key]??(key==='elevation'?MILITARY_WEAPONS[unit.kind].restElevation:0);if(Math.abs(key==='aimYaw'?angleDelta(target,pose[key]):target-pose[key])<1e-5)pose[key]=target;}
        batch.setPose(unit.id,pose);
      }
      pose.hp=unit.hp;pose.maxHp=unit.maxHp;pose.shielded=unit.shielded;
      pose.groundY=pose.y-(pose.kind==='helicopter'?5:0);
    }
    return renderUnits;
  }
  function syncZones(zones,ownerId){
    const own=(zones??[]).filter(zone=>zone.ownerId===ownerId&&[zone.x,zone.z,zone.innerRadius,zone.outerRadius].every(Number.isFinite)&&zone.outerRadius>zone.innerRadius);
    const key=own.map(zone=>`${zone.ownerId}:${zone.x}:${zone.z}:${zone.innerRadius}:${zone.outerRadius}`).join('|');if(key===zoneKey)return;
    zoneKey=key;zoneCount=own.length;
    zoneRoots.forEach(group=>group.clear());zoneGeometries.forEach(g=>g.dispose());zoneMaterials.forEach(m=>m.dispose());zoneGeometries=[];zoneMaterials=[];
    for(const zone of own){
      const owner=colorFor(zone).body;
      for(const[inner,outer,opacity]of[[zone.innerRadius,zone.outerRadius,.035],[zone.innerRadius-.06,zone.innerRadius+.06,.35],[zone.outerRadius-.1,zone.outerRadius+.1,.7]]){
        const g=new THREE.RingGeometry(Math.max(.01,inner),outer,128).rotateX(-Math.PI/2),m=basic('military-spawn-boundary',{opacity});m.color.copy(owner).lerp(WHITE,.25);zoneGeometries.push(g);zoneMaterials.push(m);
        for(let i=0;i<2;i++){const mesh=new THREE.Mesh(g,m);mesh.matrixAutoUpdate=false;rigidSurfacePoseMatrix(world,zone.x,i?1.15:(zone.y??0)+.045,zone.z,chartHeadingForSurface(world,zone.x,zone.z,0),mesh.matrix);mesh.renderOrder=8;zoneRoots[i].add(mesh);}
      }
    }
  }
  function pixelSize(camera,p,height){view.copy(p).applyMatrix4(camera.matrixWorldInverse);const e=camera.projectionMatrix.elements,w=e[3]*view.x+e[7]*view.y+e[11]*view.z+e[15];return 2*Math.abs(w)/(Math.max(1,height)*Math.abs(e[5]));}
  function write(mesh,p,q,s,tint){const index=mesh.count++;matrix.compose(p,q,s);if(world.surface){surfaceFrame(world,p.x,p.z,surfaceMatrix);surfaceMatrix.setPosition(surfacePoint(world,p.x,p.y,p.z,projected));matrix.setPosition(0,0,0).premultiply(surfaceMatrix);}mesh.setMatrixAt(index,matrix);mesh.setColorAt(index,tint);}
  function writeBillboard(mesh,p,q,s,tint,inverse){const index=mesh.count++;matrix.compose(p,q,s).premultiply(inverse);mesh.setMatrixAt(index,matrix);mesh.setColorAt(index,tint);}
  function clearOverlays(){for(const layer of[detailOverlay,mapOverlay])for(const mesh of Object.values(layer))mesh.count=0;for(const pair of mapMarkers.values()){pair.rim.count=pair.fill.count=0;}}
  function overlayUnit(layer,unit,pixel,camera,map,selected,walkingWeight){
    const layerRoot=map?mapRoot:root,inverse=map?mapInverse:rootInverse;
    const ground=map?.76:(unit.groundY??unit.y-(unit.kind==='helicopter'?5:0))+.05;
    const radius=Math.max(SIZE[unit.kind]??1,map?pixel*8:0);
    if(selected){position.set(unit.x,ground,unit.z);size.set(radius,1,radius);write(layer.selection,position,IDENTITY,size,WHITE);if(!map)selectedCount++;}
    if(unit.shielded){position.set(unit.x,ground+.006,unit.z);size.set(radius+.22,1,radius+.22);write(layer.protection,position,IDENTITY,size,SHIELD);if(!map)shieldCount++;}
    // Vehicles always show health. Infantry keep their clean silhouettes and
    // only acquire the small shield emblem while protected by their home.
    const health=unit.kind!=='soldier',barWidth=health?(map?29:32):0,barHeight=4;
    if(!health&&!unit.shielded)return;
    const y=map?.8:unit.y+HEIGHT[unit.kind];surfacePoint(world,unit.x,y,unit.z,position).applyMatrix4(layerRoot.matrixWorld);
    position.addScaledVector(cameraUp,pixel*(map?12:8));
    if(health){
      size.set(pixel*(barWidth+2),pixel*(barHeight+2),1);writeBillboard(layer.healthBack,position,camera.quaternion,size,INK,inverse);
      const fraction=clamp(unit.hp/Math.max(1,unit.maxHp));
      position.addScaledVector(cameraRight,-pixel*barWidth*(1-fraction)*.5);size.set(pixel*barWidth*fraction,pixel*barHeight,1);
      color.copy(fraction>.45?SHIELD:fraction>.2?WOUNDED:CRITICAL);
      if(fraction>0)writeBillboard(layer.health,position,camera.quaternion,size,color,inverse);
      position.addScaledVector(cameraRight,pixel*barWidth*(1-fraction)*.5);if(!map)healthCount++;
    }
    if(unit.shielded){position.addScaledVector(cameraRight,-pixel*(health?barWidth*.5+7:0));size.setScalar(pixel*(walkingWeight>.5?8:7));writeBillboard(layer.shield,position,camera.quaternion,size,SHIELD,inverse);}
  }
  function update(dt,{simulation,events=[],camera,mapBlend=0,walkingWeight=0,viewportHeight=800,selectedIds=[],night=0,visible=true,zones,focus,reducedMotion=false,ownerId=world.gameplay?.ownerId}={}){
    if(disposed)return;
    const elapsed=Number.isFinite(dt)?Math.max(0,dt):0;clock+=elapsed;
    const units=syncUnits(simulation,elapsed);syncZones(zones??simulation?.spawnZones,ownerId);
    root.visible=visible&&mapBlend<.999;mapRoot.visible=visible&&mapBlend>.001;
    detailBarMaterial.depthTest=walkingWeight>.5;
    root.updateWorldMatrix(true,false);mapRoot.updateWorldMatrix(true,false);rootInverse.copy(root.matrixWorld).invert();mapInverse.copy(mapRoot.matrixWorld).invert();
    // Chassis motion stays smooth, but a firing weapon must face the actual
    // shot tangent that frame. Correct only its local aim for the smoothed body.
    for(const event of events)if(event.type==='shot'&&finitePoint(event.forward)){
      const pose=poses.get(event.unitId);if(!pose)continue;
      const direction=getMilitaryLocalDirection(pose,event.forward);
      pose.aimYaw=Math.atan2(direction.x,direction.z);pose.elevation=Math.atan2(direction.y,Math.hypot(direction.x,direction.z));
      batch.setPose(event.unitId,{aimYaw:pose.aimYaw,elevation:pose.elevation});
    }
    batch.update(clock,{camera,viewportHeight,forceDetail:walkingWeight>.8});
    for(const event of events){
      if(event.type==='shot'&&finitePoint(event.from)&&finitePoint(event.to)){
        batch.attack(event.unitId);
        const local=world.surface&&event.surfaceOrigin&&finitePoint(event.localFrom)&&finitePoint(event.localTo),origin=event.surfaceOrigin;
        if(local)rigidSurfacePoseMatrix(world,origin.x,origin.y??0,origin.z,chartHeadingForSurface(world,origin.x,origin.z,0),effectMatrix);
        let groundY=world.outline?worldSurface(world,event.to.x,event.to.z).height:0;
        // The target ground has its own curvature. Measuring it in the launch
        // frame keeps impact dust/scorch marks on Earth at long firing ranges.
        if(local)groundY=surfacePoint(world,event.to.x,groundY,event.to.z,position).applyMatrix4(effectInverse.copy(effectMatrix).invert()).y;
        effects.fire({kind:event.projectile??MILITARY_ART[event.kind]?.projectile??'tracer',from:local?event.localFrom:event.from,to:local?event.localTo:event.to,duration:event.duration,arcHeight:event.arcHeight,
          ...(local?{transform:effectMatrix}:{}),groundY,surface:event.surface??'grass'});
      }else if(event.type==='destroyed'&&finitePoint(event.position)){
        const p=event.position;if(world.surface)rigidSurfacePoseMatrix(world,p.x,p.y,p.z,chartHeadingForSurface(world,p.x,p.z,0),effectMatrix);
        effects.burst({kind:event.kind,position:world.surface?{x:0,y:0,z:0}:p,...(world.surface?{transform:effectMatrix}:{}),color:colorFor(event).body,surface:event.surface??'grass'});
      }
    }
    if(camera&&clock>=contactAt){
      contactAt=clock+.18;let budget=12;
      for(const unit of units){if(!unit.moving||budget<=0)continue;surfacePoint(world,unit.x,unit.y,unit.z,position).applyMatrix4(root.matrixWorld);const distance=camera.position.distanceTo(position);if(distance>70)continue;
        if(unit.kind==='helicopter'&&distance>28)continue;budget--;
        const y=unit.groundY??unit.y-(unit.kind==='helicopter'?5:0);if(world.surface)rigidSurfacePoseMatrix(world,unit.x,y,unit.z,chartHeadingForSurface(world,unit.x,unit.z,0),effectMatrix);
        effects.contact({kind:unit.kind==='helicopter'?'rotor':unit.kind==='soldier'?'footstep':'track',position:world.surface?{x:0,y:0,z:0}:{x:unit.x,y,z:unit.z},...(world.surface?{transform:effectMatrix}:{}),heading:unit.heading,strength:unit.kind==='helicopter'?.25:unit.kind==='soldier'?.5:.8});
      }
    }
    const listener=focus&&world.surface?surfacePoint(world,focus.x,focus.y??0,focus.z,surfaceFocus):focus??camera?.position;
    effects.update(elapsed,{focus:listener,night,mapBlend,reducedMotion,camera});for(const{source,mesh}of effectAliases){mesh.count=source.count;mesh.visible=source.visible;}
    clearOverlays();drawn=healthCount=shieldCount=selectedCount=0;
    zoneRoots[0].visible=walkingWeight<.8;zoneRoots[1].visible=true;
    if(camera&&visible){
      camera.updateMatrixWorld(true);cameraUp.set(0,1,0).applyQuaternion(camera.quaternion);cameraRight.set(1,0,0).applyQuaternion(camera.quaternion);
      const selected=selectedIds instanceof Set?selectedIds:new Set(selectedIds);
      for(let i=0;i<Math.min(units.length,capacity);i++){const unit=units[i];
        const layerRoot=mapBlend>.5?mapRoot:root;surfacePoint(world,unit.x,mapBlend>.5?.8:unit.y+.5,unit.z,position).applyMatrix4(layerRoot.matrixWorld);projected.copy(position).project(camera);
        if(world.surface){surfaceNormal(world,unit.x,unit.z,surfaceUp).transformDirection(layerRoot.matrixWorld);if(surfaceUp.dot(view.copy(camera.position).sub(position))<=0)continue;}
        if(projected.z< -1||projected.z>1||Math.abs(projected.x)>1.12||Math.abs(projected.y)>1.12)continue;
        const pixel=pixelSize(camera,position,viewportHeight);drawn++;
        if(mapBlend<.999&&(walkingWeight<.5||camera.position.distanceToSquared(position)<55*55))overlayUnit(detailOverlay,unit,pixel,camera,false,selected.has(unit.id),walkingWeight);
        if(mapBlend>.001){
          overlayUnit(mapOverlay,unit,pixel,camera,true,selected.has(unit.id),walkingWeight);
          const pair=mapMarkers.get(unit.kind),radius=pixel*(unit.kind==='soldier'?4.3:6);position.set(unit.x,.8,unit.z);quaternion.setFromAxisAngle(UP,unit.heading??0);
          size.set(radius*1.25,1,radius*1.25);write(pair.rim,position,quaternion,size,INK);size.set(radius,1,radius);write(pair.fill,position,quaternion,size,color.copy(colorFor(unit).body).lerp(WHITE,night*.12));
        }
      }
    }
    for(const layer of[detailOverlay,mapOverlay])for(const mesh of Object.values(layer))flush(mesh);
    for(const pair of mapMarkers.values()){flush(pair.rim);flush(pair.fill);}
  }
  return{root,mapRoot,update,poseFor:id=>poses.get(id)??null,
    prepare(){const visibility=[];for(const group of[root,mapRoot])group.traverse(node=>{visibility.push([node,node.visible]);node.visible=true;});return()=>{for(const[node,visible]of visibility)node.visible=visible;};},
    get stats(){return{capacity,units:batch.stats.units,visible:drawn,healthBars:Math.max(detailOverlay.healthBack.count,mapOverlay.healthBack.count),protected:Math.max(detailOverlay.protection.count,mapOverlay.protection.count),selected:Math.max(detailOverlay.selection.count,mapOverlay.selection.count),spawnZones:zoneCount,art:batch.stats,effects:effects.stats,disposed};},
    dispose(){if(disposed)return;disposed=true;batch.dispose();effects.dispose();for(const mesh of ownedMeshes)mesh.dispose();for(const g of ownedGeometry)g.dispose();for(const m of ownedMaterial)m.dispose();zoneGeometries.forEach(g=>g.dispose());zoneMaterials.forEach(m=>m.dispose());root.removeFromParent();mapRoot.removeFromParent();poses.clear();renderUnits.length=0;teamColors.clear();}};
}
