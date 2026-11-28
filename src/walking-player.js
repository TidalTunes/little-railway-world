import * as THREE from 'three';
import {createTravellerArt,poseTravellerArt,TRAVELLER_SWING_DURATION} from './traveller-art.js';
import {playerColors} from './player-palette.js';
import {applySceneStyle} from './scene-style.js';
import {PERSON_HEIGHT,PERSON_RADIUS} from './person-scale.js';
import {worldSurface,pointSegmentDistance} from './world-model.js';
import {polylineTree} from './spatial-index.js';
import {surfaceQuerySegments} from './surface-query.js';
import {walkingPlacementShapes,walkingTrainShapes,walkingContact,walkingSlabHeight,walkingRailSegments,walkingRailHeight,walkingRayDistance} from './walking-collision.js';
import {surfacePoint,surfaceNormal,surfaceFrame,surfaceOffset,surfaceDisplacement,surfaceDistance,surfaceHeading,surfaceChartRadius,chartHeadingForSurface,rigidSurfacePoseMatrix} from './world-surface.js';

export const WALKING=Object.freeze({height:PERSON_HEIGHT,radius:PERSON_RADIUS,speed:2.65,sprintSpeed:4.6,jumpSpeed:4.05,gravity:11.5,
  stepHeight:.32,maxSlope:.78,cameraDistance:2.85,cameraHeight:.50,spawnRailClearance:4.5,fov:54,near:.045,far:140});
const tau=Math.PI*2,clamp=THREE.MathUtils.clamp;
const physicsStep=1/120;
const swingDuration=TRAVELLER_SWING_DURATION;
const wrap=angle=>Math.atan2(Math.sin(angle),Math.cos(angle));

/** Render-space rays and physical surface offsets agree with the shared world
 * meshes, including at high latitudes. No input listeners or renderer owned. */
export function createWalkingPlayer(parent,world,{getCollisionPlacements=()=>world.placements??[],getTerrainMeshes=()=>[],getCollisionTrains=()=>[],getCollisionLines=()=>world.lines??[],isReadyAt=()=>true}={}){
  const root=new THREE.Group();root.name='walking-player';root.visible=false;parent.add(root);
  const owner=world.players?.find(player=>player.id===world.gameplay?.ownerId);
  const cap=owner?applySceneStyle(new THREE.MeshStandardMaterial({name:'player-hat',color:playerColors(owner).body,roughness:1,flatShading:true})):null;
  const art=createTravellerArt(root,cap?{capMaterial:cap}:{}),camera=new THREE.PerspectiveCamera(WALKING.fov,1,WALKING.near,WALKING.far);
  camera.name='walking-camera';
  const position={x:0,y:0,z:0},previousPosition={x:0,y:0,z:0},renderPosition={x:0,y:0,z:0},velocity={x:0,y:0,z:0},matrix=new THREE.Matrix4(),frame=new THREE.Matrix4(),shadowTilt=new THREE.Matrix4().makeRotationX(-Math.PI/2);
  const up=new THREE.Vector3(),groundPoint=new THREE.Vector3(),target=new THREE.Vector3(),desired=new THREE.Vector3(),direction=new THREE.Vector3();
  const forwardVector=new THREE.Vector3(),rightVector=new THREE.Vector3(),ray=new THREE.Raycaster(),hits=[];ray.firstHitOnly=true;
  const contact={},slide={},escape={},stepPoint={},samplePoint={},renderOrigin={},renderDelta={},groundTarget=new THREE.Vector3();
  let collisionLines=getCollisionLines()??[],routeTree=polylineTree(collisionLines),railSegments=[],railFocus={x:Infinity,z:Infinity};
  const railA={},railB={};
  const meshCenter=new THREE.Vector3(),meshSphere=new THREE.Sphere();
  let active=false,initialized=false,disposed=false,grounded=true,heading=0,orbit=0,pitch=Math.PI/10,jumpDown=false,gait=0,bodyTurn=0,runBlend=0,poseSpeed=0,swingTime=swingDuration,swingDown=false;
  let meshes=[],meshSource=null,meshFocus={x:Infinity,y:0,z:Infinity},obstacles=[],bodies=[],trainBodies=[],source=null,obstacleFocus={x:Infinity,z:Infinity},accumulator=0,floorHeight=0,previousFloorHeight=0,renderFloorHeight=0;
  let cameraElevation=0,cameraArm=WALKING.cameraDistance,followKind=null,followId=null;
  const stats={steps:0,swings:0,blocked:0,raycasts:0,obstacles:0,meshes:0,meshSelections:0};

  function refreshScene(force=false){
    const nextMeshes=getTerrainMeshes()??[];
    if(force||nextMeshes!==meshSource||!Number.isFinite(meshFocus.x)||surfaceDistance(world,position,meshFocus)>2||Math.abs(position.y-meshFocus.y)>2){
      meshSource=nextMeshes;meshFocus={...position};surfacePoint(world,position.x,position.y,position.z,meshCenter);
      // The resident cache may contain many whole continents' earlier views.
      // Only nearby cells can hit a foot, torso or camera obstruction ray. Keep
      // this conservative selection stable while moving within its padding.
      meshes=nextMeshes.filter(mesh=>{
        const geometry=mesh.geometry;if(!geometry)return false;
        // Terrain triangles retain real cliffs/tunnel walls. Styled props use
        // explicit bodies, never their decoration, as collision geometry.
        const style=mesh.material?.userData?.sceneStyle;
        if(style&&style!=='terrain')return false;
        if(mesh.isInstancedMesh&&!mesh.boundingSphere)mesh.computeBoundingSphere();
        if(!geometry.boundingSphere)geometry.computeBoundingSphere();
        meshSphere.copy(mesh.boundingSphere??geometry.boundingSphere).applyMatrix4(mesh.matrixWorld);
        return meshSphere.distanceToPoint(meshCenter)<=WALKING.cameraDistance+4;
      });stats.meshes=meshes.length;stats.meshSelections++;
    }
    const next=getCollisionPlacements()??[];
    if(force||next!==source||!Number.isFinite(obstacleFocus.x)||surfaceDistance(world,position,obstacleFocus)>6){
      source=next;obstacleFocus={x:position.x,z:position.z};
      const all=next.concat((world.stations??[]).map(item=>({...item,kind:'station'}))),seen=new Set();
      obstacles=all.filter(p=>{
        if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.z))return false;
        const key=p.id??p;if(seen.has(key))return false;seen.add(key);
        return surfaceDistance(world,p,position)<26+(p.radius??4);
      });bodies=obstacles.flatMap(item=>walkingPlacementShapes(world,item));stats.obstacles=bodies.filter(body=>!body.support).length;
    }
    const nextLines=getCollisionLines()??[];
    const changedLines=nextLines!==collisionLines;
    if(changedLines){collisionLines=nextLines;routeTree=polylineTree(collisionLines);}
    if(force||changedLines||surfaceDistance(world,position,railFocus)>2){
      railFocus={x:position.x,z:position.z};
      railSegments=walkingRailSegments(world,routeTree,position);
    }
    trainBodies=walkingTrainShapes(world,getCollisionTrains(),position);
    stats.trainBodies=trainBodies.length;
  }

  function placementBlocked(point,height=position.y){
    return walkingContact(world,bodies,point,height,WALKING.radius,WALKING.height,contact)
      ??walkingContact(world,trainBodies,point,height,WALKING.radius,WALKING.height,contact);
  }

  function cast(origin,rayDirection,maxDistance){
    if(!meshes.length)return null;
    ray.set(origin,rayDirection);ray.near=.018;ray.far=maxDistance;stats.raycasts++;
    hits.length=0;ray.intersectObjects(meshes,false,hits);return hits[0]??null;
  }

  function groundAt(point,previousHeight=undefined){
    const sampled=worldSurface(world,point.x,point.z);
    const slab=walkingSlabHeight(world,bodies,point,previousHeight,WALKING.stepHeight),rail=walkingRailHeight(world,railSegments,point,previousHeight,WALKING.stepHeight);
    const support=Math.max(slab??-Infinity,rail??-Infinity);
    if(Number.isFinite(support))return {height:support,type:'support',slope:1};
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
        const edge=groundAt(samplePoint);
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

  function setPose(dt,speed,travelled=0){
    heading+=wrap(bodyTurn-heading)*Math.min(1,dt*15);
    const angle=chartHeadingForSurface(world,renderPosition.x,renderPosition.z,heading);
    rigidSurfacePoseMatrix(world,renderPosition.x,renderPosition.y,renderPosition.z,angle,matrix);
    matrix.decompose(art.root.position,art.root.quaternion,art.root.scale);
    const moving=clamp(speed/.7,0,1),running=THREE.MathUtils.smoothstep(speed,WALKING.speed*.97,WALKING.sprintSpeed*.96);
    runBlend+=(running-runBlend)*(dt>0?1-Math.exp(-12*dt):1);
    // Distance drives a small toy-like shuffle. Each leg stays a single solid
    // piece; its top remains concealed in the coat instead of exposing joints.
    if(grounded)gait+=travelled*tau/THREE.MathUtils.lerp(1.05,1.42,runBlend);
    poseTravellerArt(art,{gait,moving,running:runBlend,grounded,swingElapsed:swingTime});
    rigidSurfacePoseMatrix(world,renderPosition.x,Math.min(renderPosition.y,renderFloorHeight)+.036,renderPosition.z,angle,matrix);
    art.shadow.matrix.copy(matrix).multiply(shadowTilt);art.shadow.matrixWorldNeedsUpdate=true;
    art.shadow.material.opacity=.16/(1+Math.max(0,renderPosition.y-renderFloorHeight)*1.6);
  }

  function updateCamera(dt=0,snap=false){
    surfaceFrame(world,renderPosition.x,renderPosition.z,frame);const e=frame.elements;
    up.set(e[4],e[5],e[6]);rightVector.set(e[0],e[1],e[2]);forwardVector.set(e[8],e[9],e[10]);
    // Feet follow continuous supports; only the viewing focus eases
    // those small height changes; camera position and aim share that same focus.
    cameraElevation=snap||dt<=0?renderPosition.y:THREE.MathUtils.lerp(cameraElevation,renderPosition.y,1-Math.exp(-14*dt));
    const vehicle=followKind&&followKind!=='soldier';
    target.copy(surfacePoint(world,renderPosition.x,cameraElevation+(vehicle?1:WALKING.cameraHeight),renderPosition.z,groundTarget));
    const distance=followKind==='helicopter'?8:vehicle?6:WALKING.cameraDistance,horizontal=Math.cos(pitch)*distance;
    desired.copy(target).addScaledVector(rightVector,-Math.sin(orbit)*horizontal).addScaledVector(forwardVector,-Math.cos(orbit)*horizontal).addScaledVector(up,Math.sin(pitch)*distance);
    direction.subVectors(desired,target);const length=direction.length();direction.divideScalar(length);
    const hit=cast(target,direction,length+.14);
    const obstruction=Math.min(hit?.distance??length,walkingRayDistance(bodies,target,direction,length),walkingRayDistance(trainBodies,target,direction,length));
    const allowed=Math.max(.32,obstruction<length?obstruction-.18:length);
    // Only the obstruction arm changes length. Damping a camera's world
    // position while aiming at an undamped target makes the entire world pitch
    // on every physics step. New obstacles retract immediately; recovery eases.
    cameraArm=snap||dt<=0||allowed<cameraArm?allowed:THREE.MathUtils.lerp(cameraArm,allowed,1-Math.exp(-15*dt));
    camera.position.copy(target).addScaledVector(direction,cameraArm);
    camera.up.copy(up);camera.lookAt(target);camera.updateMatrixWorld(true);
  }

  function interpolatePosition(){
    const alpha=clamp(accumulator/physicsStep,0,1);
    // Physical surface offsets interpolate across the globe's date line as
    // well as on the island. Chart-coordinate lerp would cross the whole map.
    surfaceDisplacement(world,previousPosition,position,renderDelta);
    surfaceOffset(world,previousPosition.x,previousPosition.z,renderDelta.x*alpha,renderDelta.z*alpha,renderPosition);
    renderPosition.y=THREE.MathUtils.lerp(previousPosition.y,position.y,alpha);
    renderFloorHeight=THREE.MathUtils.lerp(previousFloorHeight,floorHeight,alpha);
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
    // A moving carriage must not engulf a stationary person. Resolve its
    // simple side envelope once per render frame, before advancing the walk.
    for(let pass=0;pass<4;pass++){
      const overlap=walkingContact(world,trainBodies,position,position.y,WALKING.radius,WALKING.height,contact);if(!overlap)break;
      const body=overlap.body,nx=overlap.x,nz=overlap.z,depth=overlap.depth;
      let cleared=false;
      for(let attempt=0;attempt<2&&!cleared;attempt++){
        let dx=nx*(depth+.002),dz=nz*(depth+.002);
        if(attempt){
          // A platform building may occupy the nearest side of the carriage.
          // Try its opposite flank rather than leaving the person embedded.
          surfaceDisplacement(world,body.item,position,renderDelta);
          const localX=renderDelta.x*body.ca-renderDelta.z*body.sa;
          const offset=-(localX<0?-1:1)*(body.width/2+WALKING.radius+.002)-localX;
          dx=body.ca*offset;dz=-body.sa*offset;
        }
        surfaceOffset(world,position.x,position.z,dx,dz,escape);
        const floor=groundAt(escape,position.y);
        if(!isReadyAt(escape.x,escape.z)||['outside','ocean','water'].includes(floor.type)||floor.height>position.y+WALKING.stepHeight
          ||walkingContact(world,bodies,escape,position.y,WALKING.radius,WALKING.height,slide))continue;
        position.x=escape.x;position.z=escape.z;previousPosition.x=escape.x;previousPosition.z=escape.z;cleared=true;
        if(grounded){floorHeight=floor.height;position.y=floor.height+.035;previousPosition.y=position.y;previousFloorHeight=floorHeight;}
      }
      if(!cleared)break;
    }
    orbit=wrap(orbit+(Number.isFinite(input.lookX)?input.lookX:0));
    pitch=clamp(pitch+(Number.isFinite(input.lookY)?input.lookY:0),Math.PI/18,Math.PI*65/180);
    const wantsJump=Boolean(input.jump);if(wantsJump&&!jumpDown&&grounded){velocity.y=WALKING.jumpSpeed;grounded=false;}jumpDown=wantsJump;
    const wantsSwing=Boolean(input.swing);
    if(wantsSwing&&!swingDown&&swingTime>=swingDuration){swingTime=0;bodyTurn=orbit;stats.swings++;}
    swingDown=wantsSwing;swingTime=Math.min(swingDuration,swingTime+dt);
    let forward=clamp(input.forward??0,-1,1),right=clamp(input.right??0,-1,1),length=Math.hypot(forward,right);
    if(length>1){forward/=length;right/=length;}
    const speed=input.sprint?WALKING.sprintSpeed:WALKING.speed;
    const x=(Math.sin(orbit)*forward-Math.cos(orbit)*right)*speed,z=(Math.cos(orbit)*forward+Math.sin(orbit)*right)*speed;
    accumulator+=dt;renderOrigin.x=renderPosition.x;renderOrigin.z=renderPosition.z;
    while(accumulator>=physicsStep-1e-12){
      const step=physicsStep;accumulator-=step;stats.steps++;
      Object.assign(previousPosition,position);previousFloorHeight=floorHeight;
      const damp=1-Math.exp(-18*step);velocity.x+=(x-velocity.x)*damp;velocity.z+=(z-velocity.z)*damp;
      const dx=velocity.x*step,dz=velocity.z*step;
      if(Math.hypot(dx,dz)>.000001){
        if(!move(dx,dz,step)){
          surfaceOffset(world,position.x,position.z,dx,dz,stepPoint);const collision=placementBlocked(stepPoint);
          if(collision){
            const into=Math.min(0,dx*collision.x+dz*collision.z);
            const sx=dx-into*collision.x,sz=dz-into*collision.z;
            if(Math.hypot(sx,sz)>1e-8)move(sx,sz,step);
          }else{if(Math.abs(dx)>1e-8)move(dx,0,step);if(Math.abs(dz)>1e-8)move(0,dz,step);}
        }
        bodyTurn=Math.atan2(velocity.x,velocity.z);
      }
      if(!grounded){
        const previousY=position.y;velocity.y-=WALKING.gravity*step;position.y+=velocity.y*step;
        const floor=groundAt(position,Math.max(previousY,position.y));
        floorHeight=floor.height;
        if(position.y<=floor.height+.035&&velocity.y<=0){position.y=floor.height+.035;velocity.y=0;grounded=true;}
      }
    }
    interpolatePosition();
    if(swingTime<swingDuration)bodyTurn=orbit;
    const travelled=surfaceDistance(world,renderOrigin,renderPosition),actualSpeed=dt>0?travelled/dt:0;
    poseSpeed+=(actualSpeed-poseSpeed)*(1-Math.exp(-24*dt));
    setPose(dt,poseSpeed,travelled);updateCamera(dt);
  }

  return{root,camera,position,renderPosition,cameraTarget:target,velocity,stats,prepareSpawn,update,
    /** Combat owns movement; this adapter supplies the same rigid globe camera
     * and construction aiming pose when a different body is possessed. */
    followUnit(unit,dt=0,input={}){
      if(!unit)return false;
      const changed=unit.id!==followId;
      followId=unit.id;followKind=unit.kind;active=initialized=true;
      if(changed){orbit=unit.heading??0;pitch=unit.kind==='helicopter'?.38:.2;cameraArm=WALKING.cameraDistance;}
      orbit=wrap(orbit+(Number.isFinite(input.lookX)?input.lookX:0));
      pitch=clamp(pitch+(Number.isFinite(input.lookY)?input.lookY:0),-.38,Math.PI*65/180);
      Object.assign(position,{x:unit.x,y:unit.y,z:unit.z});Object.assign(renderPosition,position);Object.assign(previousPosition,position);
      heading=bodyTurn=unit.heading??orbit;floorHeight=renderFloorHeight=unit.ground??unit.y;grounded=!unit.airborne;
      refreshScene(changed);updateCamera(dt,changed);root.visible=false;
      swingTime=Math.min(swingDuration,swingTime+dt);
      if(input.swing&&swingTime>=swingDuration&&unit.kind==='soldier'){swingTime=0;stats.swings++;}
      return true;
    },
    get kind(){return followKind??'soldier';},get swinging(){return swingTime<swingDuration;},get active(){return active;},get initialized(){return initialized;},get grounded(){return grounded;},get heading(){return orbit;},get facingHeading(){return bodyTurn;},get pitch(){return pitch;},
    enter(focus,initialHeading=0,{respawn=false}={}){
      if(disposed)return false;
      if(initialized&&!respawn){active=true;root.visible=true;refreshScene(true);setPose(0,0);updateCamera(0,true);return true;}
      const spawn=prepareSpawn(focus);if(!spawn)return false;
      Object.assign(position,spawn);velocity.x=velocity.y=velocity.z=0;heading=orbit=bodyTurn=Number.isFinite(initialHeading)?initialHeading:0;
      Object.assign(previousPosition,spawn);Object.assign(renderPosition,spawn);
      floorHeight=previousFloorHeight=renderFloorHeight=spawn.y-.035;
      pitch=Math.PI/10;accumulator=0;jumpDown=false;poseSpeed=runBlend=gait=0;swingTime=swingDuration;swingDown=false;grounded=true;active=initialized=true;root.visible=true;refreshScene(true);setPose(0,0);updateCamera(0,true);return true;
    },
    exit(){active=false;root.visible=false;poseSpeed=runBlend=0;swingTime=swingDuration;swingDown=false;setPose(0,0);velocity.x=velocity.y=velocity.z=0;jumpDown=false;return{...position};},
    resize(aspect){camera.aspect=Math.max(.01,Number.isFinite(aspect)?aspect:1);camera.updateProjectionMatrix();},
    dispose(){if(disposed)return;disposed=true;active=false;swingTime=swingDuration;swingDown=false;root.removeFromParent();art.dispose();root.clear();cap?.dispose();},
  };
}
