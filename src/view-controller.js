import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CAMERA_ZOOM,modeForZoom,mapBlendForZoom,shouldStopFollowing,fitZoomForSpan,smoothZoom } from './camera-modes.js';
import { C } from './palette.js';
import {mapNetworkVisibility} from './map-symbols.js';
import { surfaceFor,surfacePoint,surfaceFrame,surfaceNormal,surfaceTangent,surfaceOffset as offsetOnSurface } from './world-surface.js';

const ease=(rate,dt,reduced)=>reduced?1:1-Math.exp(-rate*dt);
const centerOf=train=>train.parts[Math.floor(train.parts.length/2)];
// Map markers use the same 16× radial layer spacing as map-terrain-geometry.
// Keep this lightweight: importing that compiler here also loads tessellation.
const SPHERICAL_MAP_TRAIN_HEIGHT=.123*16;
const GLOBE_MAP_TILT=.48;
// A local view is an orthographic diorama: orbit changes its heading, never
// its ground inclination. Allowing pitch to approach the horizon visually
// flattens streets and buildings even when the surface frame is orthonormal.
const DETAIL_POLAR_ANGLE=Math.PI/4;
const POLE_LIMIT=85*Math.PI/180;
const wrappedLongitude=(value,radius)=>THREE.MathUtils.euclideanModulo(value+Math.PI*radius,2*Math.PI*radius)-Math.PI*radius;

export function createViewController({canvas,camera,scene,mapScene,reducedMotion,getTrains,getWorldRoot,getWorld=()=>null,onPause,onRegenerate,isDetailReady=()=>true}){
  // Navigation stores a ground focus and yaw at a fixed local inclination.
  // The overview can rise above that rig without changing its navigation pose.
  const navigation=camera.clone(),chartCamera=camera.clone(),coverageChart=camera.clone(),coverageView=camera.clone(),proposedChart=camera.clone(),proposedView=camera.clone(),presentation=camera.clone();
  const presentationTarget=new THREE.Vector3(0,1.3,0);
  let navigationDelta=0;
  const coverageViews=[coverageView,proposedView];
  const controls=new OrbitControls(navigation,canvas);
  Object.assign(controls,{enableDamping:true,dampingFactor:.075,panSpeed:.7,rotateSpeed:.45,
    minZoom:CAMERA_ZOOM.min,maxZoom:CAMERA_ZOOM.max,
    minPolarAngle:DETAIL_POLAR_ANGLE,maxPolarAngle:DETAIL_POLAR_ANGLE});
  controls.target.set(0,1.3,0);controls.update();
  let mode='world',blend=0,selected=null,hovered=null,zoomGoal=null,inputEnabled=true;
  let zoomScale=1;
  let homePosition=new THREE.Vector3(),homeTarget=new THREE.Vector3();
  let lastPointer=null,gesture=null,gestureBlocked=false,hoverClock=0,inputPlan=null;
  const pointers=new Set(),heldKeys=new Set(),raycaster=new THREE.Raycaster();
  raycaster.firstHitOnly=true;
  const pickMeshes=[];
  const projected=new THREE.Vector3(),pointerNDC=new THREE.Vector2(),cameraOffset=new THREE.Vector3();
  const spherical=new THREE.Spherical(),followTarget=new THREE.Vector3(),delta=new THREE.Vector3();
  const tangentFrame=new THREE.Matrix4(),surfaceTarget=new THREE.Vector3(),surfaceOffset=new THREE.Vector3();
  const surfaceUp=new THREE.Vector3(),viewDirection=new THREE.Vector3(),markerForward=new THREE.Vector3(),markerRight=new THREE.Vector3();
  const keyboardRight=new THREE.Vector3(),keyboardUp=new THREE.Vector3();
  const keyboardVelocity=new THREE.Vector2(),keyboardIntent=new THREE.Vector2(),keyboardTravel=new THREE.Vector2();
  const keyboardDestination={x:0,z:0};
  const stoppedPosition=new THREE.Vector3(),stoppedTarget=new THREE.Vector3();
  const chartBounds=new WeakMap();
  const domState={};
  const ringGeometry=new THREE.RingGeometry(.94,1,64);ringGeometry.rotateX(-Math.PI/2);
  const ringMaterial=new THREE.MeshBasicMaterial({color:C.trim,transparent:true,opacity:.9,depthWrite:false,toneMapped:true,side:THREE.DoubleSide});
  const ring=new THREE.Mesh(ringGeometry,ringMaterial),mapRing=new THREE.Mesh(ringGeometry,ringMaterial.clone());
  mapRing.material.toneMapped=false;
  ring.visible=mapRing.visible=false;scene.add(ring);mapScene.add(mapRing);
  ring.renderOrder=3;mapRing.renderOrder=10;

  function constrainTarget(){
    const world=getWorld();
    const surface=surfaceFor(world);
    if(!surface)return;
    if(surface.complete){
      // Longitude is periodic. Translate navigation by the same chart wrap so
      // the physical camera remains continuous when crossing the date line.
      delta.set(wrappedLongitude(controls.target.x,surface.radius)-controls.target.x,0,
        THREE.MathUtils.clamp(controls.target.z,-surface.radius*POLE_LIMIT,surface.radius*POLE_LIMIT)-controls.target.z);
      controls.target.add(delta);navigation.position.add(delta);return;
    }
    let bounds=chartBounds.get(world);
    if(!bounds){
      if(world.outline?.length){
        const xs=world.outline.map(point=>point[0]),zs=world.outline.map(point=>point[1]);
        bounds={left:Math.min(...xs),right:Math.max(...xs),top:Math.min(...zs),bottom:Math.max(...zs)};
      }else if(world.bounds){
        bounds={left:-world.bounds.width/2,right:world.bounds.width/2,top:-world.bounds.depth/2,bottom:world.bounds.depth/2};
      }else return;
      const margin=Math.max(8,Math.min(bounds.right-bounds.left,bounds.bottom-bounds.top)*.05);
      bounds.left-=margin;bounds.right+=margin;bounds.top-=margin;bounds.bottom+=margin;
      chartBounds.set(world,bounds);
    }
    delta.set(THREE.MathUtils.clamp(controls.target.x,bounds.left,bounds.right)-controls.target.x,0,
      THREE.MathUtils.clamp(controls.target.z,bounds.top,bounds.bottom)-controls.target.z);
    controls.target.add(delta);navigation.position.add(delta);
  }
  function buildChartCamera(destination,map,source=navigation,target=controls.target){
    destination.copy(source);
    spherical.setFromVector3(cameraOffset.copy(source.position).sub(target));
    const surface=surfaceFor(getWorld());
    spherical.phi=THREE.MathUtils.lerp(DETAIL_POLAR_ANGLE,surface&&!surface.complete?GLOBE_MAP_TILT:.00001,map);
    // Only tilt toward the far edge of the current view. Keeping the same
    // azimuth avoids turning the world sideways while zooming into its surface.
    // Deliberate orbit changes keep their heading in the overview as well.
    destination.position.copy(target).add(cameraOffset.setFromSpherical(spherical));
    destination.lookAt(target);destination.updateMatrixWorld(true);
    return destination;
  }
  function bendCamera(destination,chart,target=controls.target){
    destination.copy(chart);
    const world=getWorld();
    if(surfaceFor(world)){
      surfaceFrame(world,target.x,target.z,tangentFrame);
      surfacePoint(world,target.x,target.y,target.z,surfaceTarget);
      surfaceOffset.copy(chart.position).sub(target).applyMatrix4(tangentFrame);
      destination.position.copy(surfaceTarget).add(surfaceOffset);
      destination.up.copy(chart.up).transformDirection(tangentFrame);
      destination.lookAt(surfaceTarget);
    }
    destination.updateMatrixWorld(true);
    return destination;
  }
  function updateCamera(){
    buildChartCamera(chartCamera,blend,presentation,presentationTarget);bendCamera(camera,chartCamera,presentationTarget);
    getWorldRoot()?.scale.set(1,surfaceFor(getWorld())?1:1-blend*.985,1);
  }

  function flushControls(){
    // Drain an old gesture's inertial deltas without applying its remaining
    // travel. Applying the whole tail when WASD starts jumps the ground focus.
    const damping=controls.enableDamping,zoom=navigation.zoom;
    stoppedPosition.copy(navigation.position);stoppedTarget.copy(controls.target);
    controls.enableDamping=false;controls.update();
    navigation.position.copy(stoppedPosition);controls.target.copy(stoppedTarget);navigation.zoom=zoom;
    navigation.updateProjectionMatrix();controls.update();controls.enableDamping=damping;
  }
  function clearSelection(){selected=null;zoomGoal=null;}
  const zoomClamp=value=>Math.max(CAMERA_ZOOM.min,Math.min(CAMERA_ZOOM.max*zoomScale,value));
  function followZoom(){return zoomScale*Math.max(CAMERA_ZOOM.follow,fitZoomForSpan({
    viewWidth:(navigation.right-navigation.left)/zoomScale,viewHeight:(navigation.top-navigation.bottom)/zoomScale,
    spanWidth:40,spanHeight:32,padding:.1}));}
  function select(train){
    if(!train?.state.active)return;
    releaseKeys();flushControls();selected=train;hovered=null;zoomGoal=followZoom();
    if(reducedMotion.matches){navigation.zoom=zoomGoal;navigation.updateProjectionMatrix();zoomGoal=null;}
  }
  function reset(){
    clearSelection();releaseKeys();hovered=null;flushControls();
    navigation.position.copy(homePosition);controls.target.copy(homeTarget);
    navigation.zoom=1;navigation.updateProjectionMatrix();controls.update();
    constrainTarget();presentation.copy(navigation);presentationTarget.copy(controls.target);
    presentation.updateProjectionMatrix();blend=mapBlendForZoom(presentation.zoom/zoomScale);
    mode=modeForZoom(presentation.zoom/zoomScale);ring.visible=mapRing.visible=false;
    configureInput();updateCamera();updateDOM();
  }
  function updateDOM(){
    const values={view:mode,following:selected?.state.id??'',zoom:presentation.zoom.toFixed(3),requestedZoom:navigation.zoom.toFixed(3),detailLoading:String(blend<1&&!isDetailReady()),mapBlend:blend.toFixed(3)};
    for(const key in values)if(domState[key]!==values[key])canvas.dataset[key]=domState[key]=values[key];
  }
  function screenPosition(train,part=centerOf(train),target=projected){
    const world=getWorld(),p=part.position;
    if(surfaceFor(world))surfacePoint(world,p.x,blend>.7?SPHERICAL_MAP_TRAIN_HEIGHT:p.y+.8,p.z,target);
    else{target.copy(p);target.y=blend>.7 ? .3 : (p.y+.8)*(getWorldRoot()?.scale.y??1);}
    return target.project(camera);
  }
  function isVisible(train,part){
    if(!train.state.active)return false;
    if(blend>.7&&mapNetworkVisibility(camera.zoom)===0)return false;
    if(!part)return train.parts.some(car=>isVisible(train,car));
    if(!part.visible)return false;
    const p=screenPosition(train,part);
    if(Math.abs(p.x)>1.05||Math.abs(p.y)>1.05||p.z < -1||p.z>1)return false;
    if(surfaceFor(getWorld())){
      surfaceNormal(getWorld(),part.position.x,part.position.z,surfaceUp);
      if(surfaceUp.dot(camera.getWorldDirection(viewDirection))>=0)return false;
    }
    if(blend>.7)return true;
    raycaster.setFromCamera(pointerNDC.set(p.x,p.y),camera);
    pickMeshes.length=0;
    getWorldRoot()?.traverseVisible(object=>{
      if(object.isMesh&&(!object.isInstancedMesh||object.count>0))pickMeshes.push(object);
    });
    const hit=raycaster.intersectObjects(pickMeshes,false)[0];
    if(hit?.object.userData.instanceTrainIds?.[hit.instanceId]===train.state.id)return true;
    let object=hit?.object;
    while(object){if(object.userData.trainId===train.state.id)return true;object=object.parent;}
    return false;
  }
  function pick(x,y,touch=false){
    const rect=canvas.getBoundingClientRect(),limit=touch?28:17;
    const candidates=[];
    getWorldRoot()?.updateMatrixWorld(true);camera.updateMatrixWorld(true);
    for(const train of getTrains()){
      if(!train.state.active)continue;
      for(const part of train.parts){
        const p=screenPosition(train,part);
        if(p.z < -1||p.z>1)continue;
        const d=Math.hypot((p.x+1)*rect.width/2+rect.left-x,(1-p.y)*rect.height/2+rect.top-y);
        if(d<limit)candidates.push({train,part,d});
      }
    }
    candidates.sort((a,b)=>a.d-b.d);
    for(const candidate of candidates)if(isVisible(candidate.train,candidate.part))return candidate.train;
    return null;
  }
  function nearestTrain(){
    const candidates=[];
    for(const train of getTrains()){
      if(!train.state.active)continue;
      const p=screenPosition(train);
      if(Math.abs(p.x)<=1.05&&Math.abs(p.y)<=1.05&&p.z>=-1&&p.z<=1)candidates.push({train,d:p.x*p.x+p.y*p.y});
    }
    candidates.sort((a,b)=>a.d-b.d);
    for(const candidate of candidates)if(isVisible(candidate.train))return candidate.train;
  }
  function cycle(direction){
    const trains=getTrains().filter(t=>t.state.active);
    if(!trains.length)return;
    const index=trains.indexOf(selected),next=index<0?(direction>0?0:trains.length-1):(index+direction+trains.length)%trains.length;
    select(trains[next]);
  }
  function configureInput(){
    // Every local view uses one ground pivot. In particular, crossing into
    // close view must not turn an orbit gesture into a chart-space pan. Only
    // the fully flattened overview drags the map beneath the camera.
    const plan=blend===1&&mode==='map';
    if(inputPlan!==null&&plan!==inputPlan)flushControls();
    inputPlan=plan;
    controls.enabled=inputEnabled;
    controls.enableRotate=!plan;controls.enablePan=plan&&!selected;controls.screenSpacePanning=false;
    controls.mouseButtons.LEFT=plan?THREE.MOUSE.PAN:THREE.MOUSE.ROTATE;
    controls.touches.ONE=plan?THREE.TOUCH.PAN:THREE.TOUCH.ROTATE;
    controls.touches.TWO=plan?THREE.TOUCH.DOLLY_PAN:THREE.TOUCH.DOLLY_ROTATE;
  }
  function moveKeyboard(horizontal,verticalAmount,distance){
    if(!horizontal&&!verticalAmount)return;
    clearSelection();
    const surface=surfaceFor(getWorld());
    const span=Math.max(navigation.right-navigation.left,navigation.top-navigation.bottom)/presentation.zoom;
    const speed=distance??(surface?.complete?Math.min(surface.radius*.95,span*.30):span*.30);
    // Project the displayed screen axes onto the ground chart at every zoom.
    // Translating both target and camera preserves the orbit instead of turning.
    keyboardRight.set(1,0,0).applyQuaternion(chartCamera.quaternion);keyboardRight.y=0;keyboardRight.normalize();
    keyboardUp.set(0,1,0).applyQuaternion(chartCamera.quaternion);keyboardUp.y=0;keyboardUp.normalize();
    delta.copy(keyboardRight).multiplyScalar(horizontal*speed).addScaledVector(keyboardUp,-verticalAmount*speed);
    if(surface?.complete&&surface.projection.type==='equirectangular'){
      // Integrate a constant physical bearing on the globe (a rhumb line).
      // Dividing by cos(start latitude) only works for infinitesimal steps:
      // at high latitude a finite diagonal step acquires sideways skew, and
      // its path changes with frame rate. The latitude-integrated metric keeps
      // screen-relative motion and distance consistent at every latitude.
      const projection=surface.projection;
      const latitude=projection.centralLatitude*Math.PI/180-controls.target.z/projection.radius;
      const radius=surface.radius+controls.target.y;
      const nextLatitude=THREE.MathUtils.clamp(latitude-delta.z/radius,-POLE_LIMIT,POLE_LIMIT);
      const latitudeTravel=nextLatitude-latitude;
      const meridianTravel=Math.log(Math.tan(Math.PI/4+nextLatitude/2)/Math.tan(Math.PI/4+latitude/2));
      const eastScale=Math.abs(latitudeTravel)>1e-9?latitudeTravel/meridianTravel:Math.cos(latitude);
      delta.x*=projection.radius/(radius*eastScale);
      delta.z=-latitudeTravel*projection.radius;
    }else if(surface){
      offsetOnSurface(getWorld(),controls.target.x,controls.target.z,delta.x,delta.z,keyboardDestination);
      delta.set(keyboardDestination.x-controls.target.x,0,keyboardDestination.z-controls.target.z);
    }
    controls.target.add(delta);navigation.position.add(delta);
    constrainTarget();
  }
  function updateKeyboard(dt){
    keyboardIntent.set(Number(heldKeys.has('d'))-Number(heldKeys.has('a')),Number(heldKeys.has('s'))-Number(heldKeys.has('w')));
    if(keyboardIntent.lengthSq()>1)keyboardIntent.normalize();
    if(reducedMotion.matches){
      keyboardVelocity.copy(keyboardIntent);keyboardTravel.copy(keyboardIntent).multiplyScalar(dt);
    }else{
      const rate=keyboardIntent.lengthSq()?10:14,decay=Math.exp(-rate*dt);
      // Integrate the exponential velocity curve, rather than taking a frame's
      // final velocity as its average. Travel therefore does not depend on FPS.
      keyboardTravel.copy(keyboardVelocity).sub(keyboardIntent).multiplyScalar((1-decay)/rate).addScaledVector(keyboardIntent,dt);
      keyboardVelocity.sub(keyboardIntent).multiplyScalar(decay).add(keyboardIntent);
      if(!keyboardIntent.lengthSq()&&keyboardVelocity.lengthSq()<1e-24)keyboardVelocity.set(0,0);
    }
    moveKeyboard(keyboardTravel.x,keyboardTravel.y);
  }
  function releaseKeys(){heldKeys.clear();keyboardVelocity.set(0,0);keyboardTravel.set(0,0);}
  function keyUp(event){heldKeys.delete(event.key.toLowerCase());}
  canvas.addEventListener('keyup',keyUp);window.addEventListener('keyup',keyUp);
  canvas.addEventListener('blur',releaseKeys);window.addEventListener('blur',releaseKeys);
  canvas.ownerDocument.addEventListener('visibilitychange',()=>{if(canvas.ownerDocument.hidden)releaseKeys();});
  canvas.addEventListener('pointerdown',event=>{
    if(!inputEnabled)return;
    pointers.add(event.pointerId);
    if(pointers.size>1){gestureBlocked=true;gesture=null;}
    if(event.button===0&&pointers.size===1){gesture={id:event.pointerId,x:event.clientX,y:event.clientY,moved:false,touch:event.pointerType==='touch'};gestureBlocked=false;}
    zoomGoal=null;
  },{capture:true});
  canvas.addEventListener('pointermove',event=>{
    if(!inputEnabled)return;
    if(gesture?.id===event.pointerId&&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)>6)gesture.moved=true;
    lastPointer={x:event.clientX,y:event.clientY,touch:event.pointerType==='touch'};
  });
  function pointerEnd(event){
    if(!inputEnabled)return;
    const tap=gesture?.id===event.pointerId&&!gesture.moved&&!gestureBlocked&&event.type==='pointerup'
      &&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)<=6;
    const source=gesture;
    pointers.delete(event.pointerId);
    if(tap){const train=pick(event.clientX,event.clientY,source.touch);if(train)select(train);else clearSelection();}
    if(!pointers.size){gesture=null;gestureBlocked=false;}
  }
  window.addEventListener('pointerup',pointerEnd);
  window.addEventListener('pointercancel',pointerEnd);
  canvas.addEventListener('pointerleave',()=>{hovered=null;lastPointer=null;canvas.style.cursor=selected?'default':'grab';});
  canvas.addEventListener('wheel',()=>{zoomGoal=null;},{passive:true});
  canvas.addEventListener('dblclick',()=>{if(inputEnabled)reset();});
  canvas.addEventListener('keydown',event=>{
    if(!inputEnabled||event.altKey||event.metaKey||event.ctrlKey)return;
    let handled=true;
    const letter=event.key.toLowerCase();
    if(['w','a','s','d'].includes(letter)){
      if(!heldKeys.has(letter)){
        heldKeys.add(letter);clearSelection();flushControls();
      }
    }else if(event.key===' ')onPause();
    else if(event.key==='Home')reset();
    else if(event.key==='Escape')clearSelection();
    else if(event.key.toLowerCase()==='r')onRegenerate();
    else if(event.key.toLowerCase()==='f')select(nearestTrain());
    else if(event.key==='[')cycle(-1);
    else if(event.key===']')cycle(1);
    else if(['+','=','-','_'].includes(event.key)){
      zoomGoal=null;navigation.zoom=zoomClamp(navigation.zoom*(event.key==='+'||event.key==='='?1.16:1/1.16));navigation.updateProjectionMatrix();
    }else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
      flushControls();
      if(mode==='world'&&!selected&&(event.key==='ArrowLeft'||event.key==='ArrowRight')){
        const offset=navigation.position.clone().sub(controls.target),spherical=new THREE.Spherical().setFromVector3(offset);
        if(event.key==='ArrowLeft')spherical.theta-=.08;if(event.key==='ArrowRight')spherical.theta+=.08;
        navigation.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
      }else{
        const horizontal=Number(event.key==='ArrowRight')-Number(event.key==='ArrowLeft');
        const vertical=Number(event.key==='ArrowDown')-Number(event.key==='ArrowUp');
        moveKeyboard(horizontal,vertical,(navigation.top-navigation.bottom)/presentation.zoom*.045);
      }
      controls.update();constrainTarget();
    }else handled=false;
    if(handled)event.preventDefault();
  });
  function updateNavigation(dt){
      if(!inputEnabled)return;
      navigationDelta=dt;
      if(zoomGoal!==null){
        navigation.zoom=THREE.MathUtils.lerp(navigation.zoom,zoomGoal,ease(7,dt,reducedMotion.matches));
        if(Math.abs(navigation.zoom-zoomGoal)<.002){navigation.zoom=zoomGoal;zoomGoal=null;}
        navigation.updateProjectionMatrix();
      }
      if(selected&&(!selected.state.active||(zoomGoal===null&&shouldStopFollowing(navigation.zoom/zoomScale))))selected=null;
      updateKeyboard(Math.min(.1,Math.max(0,dt)));
      configureInput();controls.update();
      if(selected){
        followTarget.copy(centerOf(selected).position);followTarget.y=.75;
        const surface=surfaceFor(getWorld());
        if(surface?.complete)followTarget.x=controls.target.x+wrappedLongitude(followTarget.x-controls.target.x,surface.radius);
        delta.copy(controls.target).lerp(followTarget,ease(7,dt,reducedMotion.matches)).sub(controls.target);controls.target.add(delta);navigation.position.add(delta);
      }
      constrainTarget();
  }
  function nextZoom(dt){return smoothZoom(presentation.zoom,navigation.zoom,dt,reducedMotion.matches);}
  function updatePresentation(dt){
    if(!inputEnabled)return;
    const zoom=nextZoom(dt);
    // Streaming never drives navigation. The always-available world surface
    // remains under progressively arriving scenery at every scale and target.
    presentation.copy(navigation);presentationTarget.copy(controls.target);presentation.zoom=zoom;
    presentation.updateProjectionMatrix();
    blend=mapBlendForZoom(presentation.zoom/zoomScale);
    mode=modeForZoom(presentation.zoom/zoomScale,mode);configureInput();updateCamera();
      hoverClock+=dt;
      if(hoverClock>.12&&lastPointer&&!lastPointer.touch&&!pointers.size&&!selected){
        hoverClock=0;hovered=pick(lastPointer.x,lastPointer.y);
        canvas.style.cursor=hovered?'pointer':'grab';
      }
      const highlighted=selected??hovered;
      ring.visible=mapRing.visible=!!highlighted?.state.active;
      mapRing.visible&&=mapNetworkVisibility(camera.zoom)>0;
      if(highlighted){
        const part=centerOf(highlighted);
        for(const marker of [ring,mapRing]){
          const world=getWorld(),height=marker===ring ? .045 : surfaceFor(world)?1.6:.6;
          if(surfaceFor(world)){
            surfacePoint(world,part.position.x,height,part.position.z,marker.position);
            surfaceNormal(world,part.position.x,part.position.z,surfaceUp);
            surfaceTangent(world,part.position.x,height,part.position.z,Math.sin(part.rotation.y),0,Math.cos(part.rotation.y),markerForward).normalize();
            markerRight.crossVectors(surfaceUp,markerForward).normalize();
            tangentFrame.makeBasis(markerRight,surfaceUp,markerForward);
            marker.quaternion.setFromRotationMatrix(tangentFrame);
          }else{
            marker.position.set(part.position.x,height,part.position.z);
            marker.rotation.set(0,part.rotation.y,0);
          }
          marker.scale.set(1.35,1,4.65);
          marker.material.opacity=selected?.state.id===highlighted.state.id ? .95 : .48;
          if(marker===mapRing)marker.material.opacity*=mapNetworkVisibility(camera.zoom);
        }
      }
      updateDOM();
  }
  return {
    navigation,chartCamera,controls,reset,updateNavigation,updatePresentation,
    setInputEnabled(enabled){
      releaseKeys();clearSelection();hovered=null;lastPointer=null;gesture=null;pointers.clear();
      flushControls();inputEnabled=Boolean(enabled);controls.enabled=inputEnabled;ring.visible=mapRing.visible=false;
    },
    // The walking player occupies this same chart. Return instantly to a
    // useful overview centered on their real position, retaining orbit yaw.
    overlook(point){
      releaseKeys();clearSelection();flushControls();
      delta.set(point.x-controls.target.x,(point.y??0)+1.3-controls.target.y,point.z-controls.target.z);
      navigation.position.add(delta);controls.target.add(delta);
      navigation.zoom=Math.min(navigation.zoom,zoomScale);navigation.updateProjectionMatrix();controls.update();
      constrainTarget();presentation.copy(navigation);presentationTarget.copy(controls.target);
      blend=mapBlendForZoom(presentation.zoom/zoomScale);mode=modeForZoom(presentation.zoom/zoomScale);
      configureInput();updateCamera();updateDOM();
    },
    update(dt){updateNavigation(dt);updatePresentation(dt);},
    get coverageCamera(){
      buildChartCamera(coverageChart,0);
      // Prefetch a bounded local footprint while still in the overview. Once
      // detailed, keep the requested region proportional to the visible scale.
      coverageChart.zoom=Math.max(CAMERA_ZOOM.mapBlendEnd*zoomScale,presentation.zoom);
      coverageChart.updateProjectionMatrix();
      return bendCamera(coverageView,coverageChart);
    },
    get coverageCameras(){
      this.coverageCamera;
      const entry=CAMERA_ZOOM.mapBlendEnd*zoomScale;
      const proposedZoom=nextZoom(navigationDelta);
      if(proposedZoom<entry){proposedView.copy(coverageView);return coverageViews;}
      buildChartCamera(proposedChart,mapBlendForZoom(proposedZoom/zoomScale));
      proposedChart.zoom=proposedZoom;proposedChart.updateProjectionMatrix();
      bendCamera(proposedView,proposedChart);
      return coverageViews;
    },
    setScale(value){zoomScale=Math.max(1,Number(value)||1);controls.maxZoom=CAMERA_ZOOM.max*zoomScale;},
    get zoomScale(){return zoomScale;},
    get wantsDetail(){return navigation.zoom/zoomScale>CAMERA_ZOOM.detailPrefetch||blend<1||selected!==null;},
    get waitingForDetail(){return false;},get renderTarget(){return presentationTarget;},
    setHome(){homePosition.copy(navigation.position);homeTarget.copy(controls.target);reset();},
    get mode(){return mode;},get blend(){return blend;},get selected(){return selected?.state.id??null;},
  };
}
