import * as THREE from 'three';
import {M} from './palette.js';
import {worldSurface,pointSegmentDistance} from './world-model.js';
import {polylineTree} from './spatial-index.js';
import {surfaceQuerySegments} from './surface-query.js';
import {surfacePoint,surfaceNormal,surfaceFrame,surfaceOffset,surfaceDisplacement,surfaceDistance,surfaceHeading,surfaceChartRadius,chartHeadingForSurface,rigidSurfacePoseMatrix} from './world-surface.js';

export const WALKING=Object.freeze({height:.96,radius:.17,speed:2.65,sprintSpeed:4.6,jumpSpeed:4.05,gravity:11.5,
  stepHeight:.32,maxSlope:.78,cameraDistance:3.6,cameraHeight:.65,spawnRailClearance:4.5,fov:54,near:.045,far:140});
const solids=new Set(['house','apartment','civic','tower','landmark','station','tree','rock','cactus']);
const tau=Math.PI*2,clamp=THREE.MathUtils.clamp;
const wrap=angle=>Math.atan2(Math.sin(angle),Math.cos(angle));

/** A single articulated, human-scale traveller. The world never gets rescaled
 * or copied for this view; the same .75-unit station passengers set the scale. */
function traveller(parent){
  const root=new THREE.Group();root.name='walking-traveller';parent.add(root);
  const body=new THREE.Group();root.add(body);
  const box=new THREE.BoxGeometry(1,1,1),sphere=new THREE.IcosahedronGeometry(1,1),cap=new THREE.CylinderGeometry(.118,.125,.07,8);
  const geometries=[box,sphere,cap];
  function part(group,name,x,y,z,w,h,d,material,geometry=box){
    const mesh=new THREE.Mesh(geometry,material);mesh.name=name;mesh.position.set(x,y,z);mesh.scale.set(w,h,d);
    mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;
  }
  part(body,'traveller-coat',0,.515,0,.29,.30,.19,M.teal);
  part(body,'coat-hem',0,.375,0,.32,.075,.22,M.teal);
  part(body,'shirt-collar',0,.67,.021,.15,.045,.15,M.trim);
  part(body,'scarf',0,.654,.12,.095,.07,.035,M.gold);
  part(body,'scarf-tail',.055,.563,.125,.055,.16,.025,M.gold);
  part(body,'traveller-face',0,.77,.005,.105,.12,.10,M.peach,sphere);
  part(body,'traveller-hair',0,.831,-.025,.19,.055,.15,M.timber);
  part(body,'traveller-cap',0,.874,0,1,1,1,M.redLight,cap);
  part(body,'cap-brim',0,.845,.09,.20,.028,.12,M.roof);
  part(body,'cap-badge',0,.878,.117,.047,.032,.012,M.gold);
  for(const side of [-1,1])part(body,'eye',side*.038,.785,.097,.017,.023,.012,M.window);
  part(body,'backpack',0,.52,-.145,.23,.26,.14,M.roof);
  part(body,'backpack-flap',0,.641,-.165,.245,.055,.145,M.roofLight);
  part(body,'backpack-buckle',0,.565,-.221,.043,.06,.012,M.gold);
  for(const side of [-1,1])part(body,'backpack-strap',side*.106,.535,.103,.032,.26,.018,M.timber);
  const arms=[],legs=[];
  for(const side of [-1,1]){
    const arm=new THREE.Group();arm.name=side<0?'left-arm':'right-arm';arm.position.set(side*.18,.625,0);body.add(arm);arms.push(arm);
    part(arm,'sleeve',0,-.102,0,.095,.205,.115,M.teal);
    part(arm,'hand',0,-.227,.006,.075,.08,.075,M.peach);
    const leg=new THREE.Group();leg.name=side<0?'left-leg':'right-leg';leg.position.set(side*.085,.365,0);root.add(leg);legs.push(leg);
    part(leg,'trousers',0,-.145,0,.105,.275,.12,M.roofBlue);
    part(leg,'boot',0,-.315,.035,.12,.10,.19,M.timber);
    part(leg,'boot-sole',0,-.36,.035,.125,.025,.195,M.metal);
  }
  // A tiny contact shadow anchors the traveller even outside the sun's moving
  // shadow map. It is one transparent primitive, never a dynamic texture.
  const shadowMaterial=new THREE.MeshBasicMaterial({color:0x173c37,transparent:true,opacity:.16,depthWrite:false});
  const shadowGeometry=new THREE.CircleGeometry(.24,16);geometries.push(shadowGeometry);
  const shadow=new THREE.Mesh(shadowGeometry,shadowMaterial);shadow.matrixAutoUpdate=false;shadow.name='traveller-contact-shadow';parent.add(shadow);
  return{root,body,arms,legs,shadow,dispose(){geometries.forEach(g=>g.dispose());shadowMaterial.dispose();}};
}

/** Render-space rays and physical surface offsets agree with the shared world
 * meshes, including at high latitudes. No input listeners or renderer owned. */
export function createWalkingPlayer(parent,world,{getCollisionPlacements=()=>world.placements??[],getTerrainMeshes=()=>[],isReadyAt=()=>true}={}){
  const root=new THREE.Group();root.name='walking-player';root.visible=false;parent.add(root);
  const art=traveller(root),camera=new THREE.PerspectiveCamera(WALKING.fov,1,WALKING.near,WALKING.far);
  camera.name='walking-camera';
  const position={x:0,y:0,z:0},velocity={x:0,y:0,z:0},matrix=new THREE.Matrix4(),frame=new THREE.Matrix4(),shadowTilt=new THREE.Matrix4().makeRotationX(-Math.PI/2);
  const up=new THREE.Vector3(),groundPoint=new THREE.Vector3(),target=new THREE.Vector3(),desired=new THREE.Vector3(),direction=new THREE.Vector3();
  const forwardVector=new THREE.Vector3(),rightVector=new THREE.Vector3(),ray=new THREE.Raycaster(),hits=[];ray.firstHitOnly=true;
  const collisionDelta={},stepPoint={},samplePoint={},groundTarget=new THREE.Vector3();
  const routeTree=polylineTree(world.lines??[]),railA={},railB={};
  const meshCenter=new THREE.Vector3(),meshSphere=new THREE.Sphere();
  let active=false,initialized=false,disposed=false,grounded=true,heading=0,orbit=0,pitch=Math.PI/10,jumpDown=false,gait=0,bodyTurn=0;
  let meshes=[],meshSource=null,meshFocus={x:Infinity,y:0,z:Infinity},obstacles=[],source=null,obstacleFocus={x:Infinity,z:Infinity},accumulator=0,floorHeight=0;
  const stats={steps:0,blocked:0,raycasts:0,obstacles:0,meshes:0,meshSelections:0};

  function refreshScene(force=false){
    const nextMeshes=getTerrainMeshes()??[];
    if(force||nextMeshes!==meshSource||!Number.isFinite(meshFocus.x)||surfaceDistance(world,position,meshFocus)>2||Math.abs(position.y-meshFocus.y)>2){
      meshSource=nextMeshes;meshFocus={...position};surfacePoint(world,position.x,position.y,position.z,meshCenter);
      // The resident cache may contain many whole continents' earlier views.
      // Only nearby cells can hit a foot, torso or 3.6-unit camera ray. Keep
      // this conservative selection stable while moving within its padding.
      meshes=nextMeshes.filter(mesh=>{
        const geometry=mesh.geometry;if(!geometry)return false;
        if(!geometry.boundingSphere)geometry.computeBoundingSphere();
        meshSphere.copy(geometry.boundingSphere).applyMatrix4(mesh.matrixWorld);
        return meshSphere.distanceToPoint(meshCenter)<=WALKING.cameraDistance+4;
      });stats.meshes=meshes.length;stats.meshSelections++;
    }
    const next=getCollisionPlacements()??[];
    if(force||next!==source||!Number.isFinite(obstacleFocus.x)||surfaceDistance(world,position,obstacleFocus)>6){
      source=next;obstacleFocus={x:position.x,z:position.z};
      const all=next.concat((world.stations??[]).map(item=>({...item,kind:'station'}))),seen=new Set();
      obstacles=all.filter(p=>{
        if(!solids.has(p.kind??(p.width&&p.depth?'station':'')))return false;
        const key=p.id??p;if(seen.has(key))return false;seen.add(key);
        return surfaceDistance(world,p,position)<26+(p.radius??4);
      });stats.obstacles=obstacles.length;
    }
  }

  function placementBlocked(point,height=position.y){
    for(const item of obstacles){
      const kind=item.kind??'station',scale=item.scale??1;
      if(height>(item.y??0)+(kind==='tree'?2.7:kind==='rock'?.6:kind==='cactus'?2.4:8)*scale)continue;
      surfaceDisplacement(world,item,point,collisionDelta);
      let radius;
      if(kind==='tree')radius=.14*scale;
      else if(kind==='cactus')radius=.31*scale;
      else if(kind==='rock')radius=.59*scale;
      else if(kind==='landmark')radius=1.35*scale;
      if(radius!==undefined){if(Math.hypot(collisionDelta.x,collisionDelta.z)<radius+WALKING.radius)return true;continue;}
      // Small oriented boxes let the player pass under roof overhangs and along
      // station platforms, instead of colliding with a whole reserved city lot.
      const angle=surfaceHeading(world,item.x,item.z,item.rotation??0),ca=Math.cos(angle),sa=Math.sin(angle);
      let x=collisionDelta.x*ca-collisionDelta.z*sa,z=collisionDelta.x*sa+collisionDelta.z*ca;
      let w=(((item.variant??0)%4)===1?1.62:1.82)*scale,d=(((item.variant??0)%4)===1?1.9:1.72)*scale;
      if(kind==='station'){x+=1.45*scale;z+=.42*scale;w=2.62*scale;d=1.42*scale;}
      else if(kind==='apartment'){w=2.52*scale;d=2.48*scale;}
      else if(kind==='civic'){z+=.15*scale;w=3.35*scale;d=2.72*scale;}
      else if(kind==='tower'){w=2.32*scale;d=2.48*scale;}
      if(Math.abs(x)<w/2+WALKING.radius&&Math.abs(z)<d/2+WALKING.radius)return true;
    }
    return false;
  }

  function cast(origin,rayDirection,maxDistance){
    if(!meshes.length)return null;
    ray.set(origin,rayDirection);ray.near=.018;ray.far=maxDistance;stats.raycasts++;
    hits.length=0;ray.intersectObjects(meshes,false,hits);return hits[0]??null;
  }

  function groundAt(point,previousHeight=undefined){
    const sampled=worldSurface(world,point.x,point.z);
    // Cast only around the feet. A downward ray from the sky would snap a
    // person inside a tunnel onto its mountain, or onto a nearby roof.
    if(previousHeight!==undefined&&meshes.length){
      surfacePoint(world,point.x,previousHeight+WALKING.stepHeight+.06,point.z,groundPoint);
      surfaceNormal(world,point.x,point.z,up);direction.copy(up).negate();
      const hit=cast(groundPoint,direction,WALKING.stepHeight+1.7);
      if(hit){
        const elevation=previousHeight+WALKING.stepHeight+.06-hit.distance;
        const normal=hit.face?.normal;
        // The merged meshes are in surface/render coordinates already.
        const slope=normal?normal.dot(up):1;
        if(elevation>-.34&&slope>.51)return{height:elevation,type:'mesh',slope};
      }
    }
    return sampled;
  }

  function walkable(point,{height=position.y,spawn=false}={}){
    const ground=groundAt(point,spawn?undefined:height);
    if(!Number.isFinite(ground.height)||['outside','ocean','water'].includes(ground.type)||ground.height<-.3)return null;
    if(placementBlocked(point,height))return null;
    // Spawn on an actual supporting slope; movement can step onto a slightly
    // raised rail/curb but cannot climb a wall or walk up a mountain cliff.
    if(spawn){
      for(const [dx,dz]of [[.24,0],[-.24,0],[0,.24],[0,-.24]]){
        surfaceOffset(world,point.x,point.z,dx,dz,samplePoint);
        const edge=worldSurface(world,samplePoint.x,samplePoint.z);
        if(['outside','ocean','water'].includes(edge.type)||Math.abs(edge.height-ground.height)>.24*WALKING.maxSlope)return null;
      }
    }
    return ground;
  }

  function prepareSpawn(focus={x:0,z:0}){
    if(disposed)return null;
    const anchor={x:Number.isFinite(focus.x)?focus.x:0,z:Number.isFinite(focus.z)?focus.z:0};
    const saved={...position};position.x=anchor.x;position.z=anchor.z;refreshScene(true);
    const anchors=[anchor,...[...(world.cities??[])].sort((a,b)=>surfaceDistance(world,a,anchor)-surfaceDistance(world,b,anchor)).slice(0,3)];
    let found=null;
    for(const center of anchors){
      position.x=center.x;position.z=center.z;refreshScene(true);
      for(let ring=0;ring<=12&&!found;ring++){
        const count=ring?Math.max(8,Math.ceil(ring*5)):1;
        for(let i=0;i<count;i++){
          const angle=i/count*tau+.31*ring;
          surfaceOffset(world,center.x,center.z,Math.sin(angle)*ring*.8,Math.cos(angle)*ring*.8,stepPoint);
          // A city focus often lies exactly on its station's railway. Start on
          // a neighboring street with room for the whole trailing camera orbit,
          // so a passing train cannot engulf the camera on the first turn.
          // This applies only to spawn selection; walking may cross the rails.
          const railway=surfaceQuerySegments(world,routeTree,stepPoint.x,stepPoint.z,surfaceChartRadius(world,stepPoint.x,stepPoint.z,WALKING.spawnRailClearance));
          if(railway.some(({a,b})=>{
            surfaceDisplacement(world,stepPoint,a,railA);surfaceDisplacement(world,stepPoint,b,railB);
            return pointSegmentDistance(0,0,railA,railB)<WALKING.spawnRailClearance;
          }))continue;
          const support=walkable(stepPoint,{spawn:true,height:worldSurface(world,stepPoint.x,stepPoint.z).height});
          if(support){found={x:stepPoint.x,y:support.height+.035,z:stepPoint.z};break;}
        }
      }
      if(found)break;
    }
    Object.assign(position,saved);refreshScene(true);return found;
  }

  function setPose(dt,speed){
    heading+=wrap(bodyTurn-heading)*Math.min(1,dt*15);
    const angle=chartHeadingForSurface(world,position.x,position.z,heading);
    rigidSurfacePoseMatrix(world,position.x,position.y,position.z,angle,matrix);
    matrix.decompose(art.root.position,art.root.quaternion,art.root.scale);
    const moving=Math.min(1,speed/WALKING.speed),stride=Math.sin(gait)*.62*moving;
    art.body.position.y=grounded?Math.abs(Math.sin(gait))*moving*.016:0;
    art.body.rotation.z=grounded?Math.sin(gait*.5)*moving*.025:0;
    art.arms[0].rotation.x=grounded?stride:-.32;art.arms[1].rotation.x=grounded?-stride:-.32;
    art.legs[0].rotation.x=grounded?-stride:.35;art.legs[1].rotation.x=grounded?stride:-.22;
    rigidSurfacePoseMatrix(world,position.x,Math.min(position.y,floorHeight)+.036,position.z,angle,matrix);
    art.shadow.matrix.copy(matrix).multiply(shadowTilt);art.shadow.matrixWorldNeedsUpdate=true;
    art.shadow.material.opacity=.16/(1+Math.max(0,position.y-floorHeight)*1.6);
  }

  function updateCamera(dt=0,snap=false){
    surfaceFrame(world,position.x,position.z,frame);const e=frame.elements;
    up.set(e[4],e[5],e[6]);rightVector.set(e[0],e[1],e[2]);forwardVector.set(e[8],e[9],e[10]);
    target.copy(surfacePoint(world,position.x,position.y+WALKING.cameraHeight,position.z,groundTarget));
    const distance=WALKING.cameraDistance,horizontal=Math.cos(pitch)*distance;
    desired.copy(target).addScaledVector(rightVector,-Math.sin(orbit)*horizontal).addScaledVector(forwardVector,-Math.cos(orbit)*horizontal).addScaledVector(up,Math.sin(pitch)*distance);
    direction.subVectors(desired,target);const length=direction.length();direction.divideScalar(length);
    const hit=cast(target,direction,length+.14);
    if(hit)desired.copy(target).addScaledVector(direction,Math.max(.32,hit.distance-.18));
    // Collision retracts instantly; outward movement is damped so a door jamb
    // cannot jerk the camera away from the traveller on the next frame.
    if(snap||hit||dt<=0)camera.position.copy(desired);else camera.position.lerp(desired,1-Math.exp(-15*dt));
    camera.up.copy(up);camera.lookAt(target);camera.updateMatrixWorld(true);
  }

  function blockedRay(next,height){
    if(!meshes.length)return false;
    surfacePoint(world,position.x,height+.43,position.z,groundPoint);
    surfacePoint(world,next.x,height+.43,next.z,groundTarget);
    direction.subVectors(groundTarget,groundPoint);const length=direction.length();if(length<1e-8)return false;
    direction.divideScalar(length);const hit=cast(groundPoint,direction,length+WALKING.radius);
    return Boolean(hit&&hit.distance<length+WALKING.radius);
  }

  function move(dx,dz,dt){
    surfaceOffset(world,position.x,position.z,dx,dz,stepPoint);
    if(!isReadyAt(stepPoint.x,stepPoint.z)){stats.blocked++;return false;}
    const ground=walkable(stepPoint);
    if(!ground||ground.height>position.y+Math.max(WALKING.stepHeight,Math.hypot(dx,dz)*WALKING.maxSlope)||blockedRay(stepPoint,position.y)){stats.blocked++;return false;}
    if(ground.type==='mesh'&&ground.slope<1/Math.sqrt(1+WALKING.maxSlope**2)
      ||ground.type==='mountain'&&ground.height-worldSurface(world,position.x,position.z).height>Math.hypot(dx,dz)*WALKING.maxSlope){stats.blocked++;return false;}
    position.x=stepPoint.x;position.z=stepPoint.z;
    floorHeight=ground.height;
    if(grounded&&position.y-ground.height<.55)position.y=ground.height+.035;
    else if(grounded)grounded=false;
    return true;
  }

  function update(dt,input={}){
    if(!active||disposed)return;
    dt=clamp(Number.isFinite(dt)?dt:0,0,.12);refreshScene();
    orbit=wrap(orbit+(Number.isFinite(input.lookX)?input.lookX:0));
    pitch=clamp(pitch+(Number.isFinite(input.lookY)?input.lookY:0),Math.PI/18,Math.PI*65/180);
    const wantsJump=Boolean(input.jump);if(wantsJump&&!jumpDown&&grounded){velocity.y=WALKING.jumpSpeed;grounded=false;}jumpDown=wantsJump;
    let forward=clamp(input.forward??0,-1,1),right=clamp(input.right??0,-1,1),length=Math.hypot(forward,right);
    if(length>1){forward/=length;right/=length;}
    const speed=input.sprint?WALKING.sprintSpeed:WALKING.speed;
    const x=(Math.sin(orbit)*forward-Math.cos(orbit)*right)*speed,z=(Math.cos(orbit)*forward+Math.sin(orbit)*right)*speed;
    accumulator+=dt;
    while(accumulator>=1/120-1e-12){
      const step=1/120;accumulator-=step;stats.steps++;
      const damp=1-Math.exp(-18*step);velocity.x+=(x-velocity.x)*damp;velocity.z+=(z-velocity.z)*damp;
      const dx=velocity.x*step,dz=velocity.z*step;
      if(Math.hypot(dx,dz)>.000001){
        if(!move(dx,dz,step)){if(Math.abs(dx)>1e-8)move(dx,0,step);if(Math.abs(dz)>1e-8)move(0,dz,step);}
        bodyTurn=Math.atan2(velocity.x,velocity.z);gait+=Math.hypot(dx,dz)*6.8;
      }
      if(!grounded){
        velocity.y-=WALKING.gravity*step;position.y+=velocity.y*step;
        const floor=groundAt(position,position.y);
        floorHeight=floor.height;
        if(position.y<=floor.height+.035&&velocity.y<=0){position.y=floor.height+.035;velocity.y=0;grounded=true;}
      }
    }
    setPose(dt,Math.hypot(velocity.x,velocity.z));updateCamera(dt);
  }

  return{root,camera,position,velocity,stats,prepareSpawn,update,
    get active(){return active;},get initialized(){return initialized;},get grounded(){return grounded;},get heading(){return orbit;},get pitch(){return pitch;},
    enter(focus,initialHeading=0,{respawn=false}={}){
      if(disposed)return false;
      if(initialized&&!respawn){active=true;root.visible=true;refreshScene(true);setPose(0,0);updateCamera(0,true);return true;}
      const spawn=prepareSpawn(focus);if(!spawn)return false;
      Object.assign(position,spawn);velocity.x=velocity.y=velocity.z=0;heading=orbit=bodyTurn=Number.isFinite(initialHeading)?initialHeading:0;
      floorHeight=spawn.y-.035;
      pitch=Math.PI/10;accumulator=0;jumpDown=false;grounded=true;active=initialized=true;root.visible=true;refreshScene(true);setPose(0,0);updateCamera(0,true);return true;
    },
    exit(){active=false;root.visible=false;velocity.x=velocity.y=velocity.z=0;jumpDown=false;return{...position};},
    resize(aspect){camera.aspect=Math.max(.01,Number.isFinite(aspect)?aspect:1);camera.updateProjectionMatrix();},
    dispose(){if(disposed)return;disposed=true;active=false;root.removeFromParent();art.dispose();root.clear();},
  };
}
