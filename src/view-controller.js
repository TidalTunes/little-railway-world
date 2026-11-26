import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CAMERA_ZOOM,modeForZoom,mapBlendForZoom,shouldStopFollowing,fitZoomForSpan } from './camera-modes.js';
import { C } from './palette.js';
import { surfaceFor,surfacePoint,surfaceFrame,surfaceNormal,surfaceTangent } from './world-surface.js';

const ease=(rate,dt,reduced)=>reduced?1:1-Math.exp(-rate*dt);
const centerOf=train=>train.parts[Math.floor(train.parts.length/2)];
// Map markers use the same 16× radial layer spacing as map-terrain-geometry.
// Keep this lightweight: importing that compiler here also loads tessellation.
const SPHERICAL_MAP_TRAIN_HEIGHT=.123*16;
const GLOBE_MAP_TILT=.48;
const POLE_LIMIT=85*Math.PI/180;
const wrappedLongitude=(value,radius)=>THREE.MathUtils.euclideanModulo(value+Math.PI*radius,2*Math.PI*radius)-Math.PI*radius;

export function createViewController({canvas,camera,scene,mapScene,reducedMotion,getTrains,getWorldRoot,getWorld=()=>null,onPause,onRegenerate,isDetailReady=()=>true}){
  // Navigation keeps the user's orbit. The displayed camera can rise above it
  // for the map or train view without feeding automatic motion into OrbitControls.
  const navigation=camera.clone(),chartCamera=camera.clone(),coverageChart=camera.clone(),coverageView=camera.clone(),proposedChart=camera.clone(),proposedView=camera.clone(),presentation=camera.clone();
  const presentationTarget=new THREE.Vector3(0,1.3,0);
  let waitingForDetail=false,resumingZoom=false,navigationDelta=0;
  const coverageViews=[coverageView,proposedView];
  const controls=new OrbitControls(navigation,canvas);
  Object.assign(controls,{enableDamping:true,dampingFactor:.075,panSpeed:.7,rotateSpeed:.45,
    minZoom:CAMERA_ZOOM.min,maxZoom:CAMERA_ZOOM.max,minPolarAngle:Math.PI*.20,maxPolarAngle:Math.PI*.40});
  controls.target.set(0,1.3,0);controls.update();
  let mode='world',blend=0,selected=null,hovered=null,zoomGoal=null;
  let zoomScale=1;
  let homePosition=new THREE.Vector3(),homeTarget=new THREE.Vector3();
  let lastPointer=null,gesture=null,gestureBlocked=false,hoverClock=0;
  const pointers=new Set(),heldKeys=new Set(),raycaster=new THREE.Raycaster();
  raycaster.firstHitOnly=true;
  const pickMeshes=[];
  const projected=new THREE.Vector3(),pointerNDC=new THREE.Vector2(),cameraOffset=new THREE.Vector3();
  const spherical=new THREE.Spherical(),followTarget=new THREE.Vector3(),delta=new THREE.Vector3();
  const tangentFrame=new THREE.Matrix4(),surfaceTarget=new THREE.Vector3(),surfaceOffset=new THREE.Vector3();
  const surfaceUp=new THREE.Vector3(),viewDirection=new THREE.Vector3(),markerForward=new THREE.Vector3(),markerRight=new THREE.Vector3();
  const keyboardRight=new THREE.Vector3(),keyboardUp=new THREE.Vector3();
  const chartBounds=new WeakMap();
  const domState={};
  const ringGeometry=new THREE.RingGeometry(.94,1,64);ringGeometry.rotateX(-Math.PI/2);
  const ringMaterial=new THREE.MeshBasicMaterial({color:C.trim,transparent:true,opacity:.9,depthWrite:false,toneMapped:false,side:THREE.DoubleSide});
  const ring=new THREE.Mesh(ringGeometry,ringMaterial),mapRing=new THREE.Mesh(ringGeometry,ringMaterial.clone());
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
    spherical.phi=THREE.MathUtils.lerp(spherical.phi,surface&&!surface.complete?GLOBE_MAP_TILT:.00001,map);
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

  function flushControls(){const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.enableDamping=damping;}
  function clearSelection(){selected=null;zoomGoal=null;}
  const zoomClamp=value=>Math.max(CAMERA_ZOOM.min,Math.min(CAMERA_ZOOM.max*zoomScale,value));
  function followZoom(){return zoomScale*Math.max(CAMERA_ZOOM.follow,fitZoomForSpan({
    viewWidth:(navigation.right-navigation.left)/zoomScale,viewHeight:(navigation.top-navigation.bottom)/zoomScale,
    spanWidth:40,spanHeight:32,padding:.1}));}
  function select(train){
    if(!train?.state.active)return;
    flushControls();selected=train;hovered=null;zoomGoal=followZoom();
    if(reducedMotion.matches){navigation.zoom=zoomGoal;navigation.updateProjectionMatrix();zoomGoal=null;}
  }
  function reset(){
    clearSelection();heldKeys.clear();hovered=null;flushControls();
    navigation.position.copy(homePosition);controls.target.copy(homeTarget);
    navigation.zoom=1;navigation.updateProjectionMatrix();controls.update();
    constrainTarget();presentation.copy(navigation);presentationTarget.copy(controls.target);
    waitingForDetail=!isDetailReady()&&navigation.zoom>CAMERA_ZOOM.mapBlendEnd*zoomScale;
    resumingZoom=waitingForDetail;
    if(waitingForDetail)presentation.zoom=CAMERA_ZOOM.mapBlendEnd*zoomScale;
    presentation.updateProjectionMatrix();blend=mapBlendForZoom(presentation.zoom/zoomScale);
    mode=modeForZoom(presentation.zoom/zoomScale);ring.visible=mapRing.visible=false;
    updateCamera();updateDOM();
  }
  function updateDOM(){
    const values={view:mode,following:selected?.state.id??'',zoom:presentation.zoom.toFixed(3),requestedZoom:navigation.zoom.toFixed(3),detailWaiting:String(waitingForDetail),mapBlend:blend.toFixed(3)};
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
    const plan=mode==='map'||mode==='close'||blend>.7;
    controls.enableRotate=!plan&&!selected;controls.enablePan=!selected;controls.screenSpacePanning=!plan&&!surfaceFor(getWorld());
    controls.mouseButtons.LEFT=plan?THREE.MOUSE.PAN:THREE.MOUSE.ROTATE;
    controls.touches.ONE=plan?THREE.TOUCH.PAN:THREE.TOUCH.ROTATE;
    controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
  }
  function moveKeyboard(horizontal,verticalAmount,seconds){
    if(!horizontal&&!verticalAmount)return;
    const length=Math.hypot(horizontal,verticalAmount);horizontal/=length;verticalAmount/=length;
    clearSelection();
    const surface=surfaceFor(getWorld());
    const span=Math.max(navigation.right-navigation.left,navigation.top-navigation.bottom)/navigation.zoom;
    const speed=surface?.complete?Math.min(surface.radius*.95,span*.30):span*.30;
    // Project the displayed screen axes onto the ground chart at every zoom.
    // Translating both target and camera preserves the orbit instead of turning.
    keyboardRight.set(1,0,0).applyQuaternion(chartCamera.quaternion);keyboardRight.y=0;keyboardRight.normalize();
    keyboardUp.set(0,1,0).applyQuaternion(chartCamera.quaternion);keyboardUp.y=0;keyboardUp.normalize();
    delta.copy(keyboardRight).multiplyScalar(horizontal*speed*seconds).addScaledVector(keyboardUp,-verticalAmount*speed*seconds);
    if(surface?.complete&&surface.projection.type==='equirectangular'){
      // The camera uses an orthonormal tangent frame, while chart longitude
      // shrinks by cos(latitude) on the sphere. Invert that metric so a
      // diagonal local orbit still pans along the visible screen axes.
      const projection=surface.projection;
      const latitude=projection.centralLatitude*Math.PI/180-controls.target.z/projection.radius;
      const scale=projection.radius/(surface.radius+controls.target.y);
      delta.x*=scale/Math.max(Math.cos(latitude),Math.cos(POLE_LIMIT));
      delta.z*=scale;
    }
    controls.target.add(delta);navigation.position.add(delta);
    constrainTarget();
  }
  function releaseKeys(){heldKeys.clear();}
  function keyUp(event){heldKeys.delete(event.key.toLowerCase());}
  canvas.addEventListener('keyup',keyUp);window.addEventListener('keyup',keyUp);
  canvas.addEventListener('blur',releaseKeys);window.addEventListener('blur',releaseKeys);
  canvas.ownerDocument.addEventListener('visibilitychange',()=>{if(canvas.ownerDocument.hidden)releaseKeys();});
  canvas.addEventListener('pointerdown',event=>{
    pointers.add(event.pointerId);
    if(pointers.size>1){gestureBlocked=true;gesture=null;}
    if(event.button===0&&pointers.size===1){gesture={id:event.pointerId,x:event.clientX,y:event.clientY,moved:false,touch:event.pointerType==='touch'};gestureBlocked=false;}
    zoomGoal=null;
  },{capture:true});
  canvas.addEventListener('pointermove',event=>{
    if(gesture?.id===event.pointerId&&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)>6)gesture.moved=true;
    lastPointer={x:event.clientX,y:event.clientY,touch:event.pointerType==='touch'};
  });
  function pointerEnd(event){
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
  canvas.addEventListener('dblclick',reset);
  canvas.addEventListener('keydown',event=>{
    if(event.altKey||event.metaKey||event.ctrlKey)return;
    let handled=true;
    const letter=event.key.toLowerCase();
    if(['w','a','s','d'].includes(letter)){
      if(!heldKeys.has(letter)){
        heldKeys.add(letter);flushControls();
        // A brief key tap gives feedback even if keyup arrives before a frame;
        // held movement is time based and does not depend on OS repeat rate.
        moveKeyboard(letter==='a'?-1:letter==='d'?1:0,letter==='w'?-1:letter==='s'?1:0,.06);
        controls.update();
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
      if(mode==='world'&&!selected){
        const offset=navigation.position.clone().sub(controls.target),spherical=new THREE.Spherical().setFromVector3(offset);
        if(event.key==='ArrowLeft')spherical.theta-=.08;if(event.key==='ArrowRight')spherical.theta+=.08;
        if(event.key==='ArrowUp')spherical.phi-=.05;if(event.key==='ArrowDown')spherical.phi+=.05;
        spherical.phi=THREE.MathUtils.clamp(spherical.phi,controls.minPolarAngle,controls.maxPolarAngle);
        navigation.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
      }else{
        clearSelection();
        const right=new THREE.Vector3(1,0,0).applyQuaternion(chartCamera.quaternion),up=new THREE.Vector3(0,1,0).applyQuaternion(chartCamera.quaternion);
        right.y=up.y=0;right.normalize();up.normalize();
        const amount=(navigation.top-navigation.bottom)/navigation.zoom*.045;
        const delta=(event.key==='ArrowLeft'?right.multiplyScalar(-amount):event.key==='ArrowRight'?right.multiplyScalar(amount):event.key==='ArrowUp'?up.multiplyScalar(amount):up.multiplyScalar(-amount));
        controls.target.add(delta);navigation.position.add(delta);
      }
      controls.update();constrainTarget();
    }else handled=false;
    if(handled)event.preventDefault();
  });
  function updateNavigation(dt){
      navigationDelta=dt;
      if(zoomGoal!==null){
        navigation.zoom=THREE.MathUtils.lerp(navigation.zoom,zoomGoal,ease(7,dt,reducedMotion.matches));
        if(Math.abs(navigation.zoom-zoomGoal)<.002){navigation.zoom=zoomGoal;zoomGoal=null;}
        navigation.updateProjectionMatrix();
      }
      if(selected&&(!selected.state.active||(zoomGoal===null&&shouldStopFollowing(navigation.zoom/zoomScale))))selected=null;
      moveKeyboard(Number(heldKeys.has('d'))-Number(heldKeys.has('a')),Number(heldKeys.has('s'))-Number(heldKeys.has('w')),Math.min(.1,Math.max(0,dt)));
      configureInput();controls.update();
      if(selected){
        followTarget.copy(centerOf(selected).position);followTarget.y=.75;
        const surface=surfaceFor(getWorld());
        if(surface?.complete)followTarget.x=controls.target.x+wrappedLongitude(followTarget.x-controls.target.x,surface.radius);
        delta.copy(controls.target).lerp(followTarget,ease(7,dt,reducedMotion.matches)).sub(controls.target);controls.target.add(delta);navigation.position.add(delta);
      }
      constrainTarget();
  }
  function resumedZoom(dt){
    if(reducedMotion.matches)return navigation.zoom;
    const previous=presentation.zoom,requested=navigation.zoom;
    // Catch up in proportional zoom steps. A large follow request must not
    // skip the whole tilt interval on the first frame after loading finishes.
    const step=Math.exp(Math.max(0,dt));
    const next=THREE.MathUtils.clamp(THREE.MathUtils.lerp(previous,requested,ease(10,dt,false)),previous/step,previous*step);
    return Math.abs(next-requested)<.002?requested:next;
  }
  function updatePresentation(dt){
    const entry=CAMERA_ZOOM.mapBlendEnd*zoomScale,ready=isDetailReady();
    waitingForDetail=navigation.zoom>entry&&!ready;
    if(navigation.zoom<=entry){
      // Returning to the overview always cancels a pending detail entry.
      presentation.copy(navigation);presentationTarget.copy(controls.target);resumingZoom=false;
    }else if(ready){
      const nextZoom=resumingZoom?resumedZoom(dt):navigation.zoom;
      presentation.copy(navigation);presentationTarget.copy(controls.target);
      presentation.zoom=nextZoom;
      if(presentation.zoom===navigation.zoom)resumingZoom=false;
    }else{
      resumingZoom=true;
      if(presentation.zoom<=entry){
        // Keep the visible map at the same geographic scale while a fast input
        // waits for geometry. Requested zoom remains intact in navigation.
        presentation.copy(navigation);presentationTarget.copy(controls.target);presentation.zoom=entry;
      }
      // Already detailed: retain the complete presented camera while the next
      // region loads. Never flatten or zoom out because a cache entry is cold.
    }
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
        }
      }
      updateDOM();
  }
  return {
    navigation,chartCamera,controls,reset,updateNavigation,updatePresentation,
    update(dt){updateNavigation(dt);updatePresentation(dt);},
    get coverageCamera(){
      buildChartCamera(coverageChart,0);
      // Prepare the widest detailed footprint before crossing the boundary,
      // including a rapid jump straight to train-follow or a close zoom.
      coverageChart.zoom=Math.max(CAMERA_ZOOM.mapBlendEnd*zoomScale,Math.min(navigation.zoom,presentation.zoom));
      coverageChart.updateProjectionMatrix();
      return bendCamera(coverageView,coverageChart);
    },
    get coverageCameras(){
      this.coverageCamera;
      const entry=CAMERA_ZOOM.mapBlendEnd*zoomScale;
      const proposedZoom=Math.max(entry,resumingZoom?resumedZoom(navigationDelta):navigation.zoom);
      buildChartCamera(proposedChart,mapBlendForZoom(proposedZoom/zoomScale));
      proposedChart.zoom=proposedZoom;proposedChart.updateProjectionMatrix();
      bendCamera(proposedView,proposedChart);
      return coverageViews;
    },
    setScale(value){zoomScale=Math.max(1,Number(value)||1);controls.maxZoom=CAMERA_ZOOM.max*zoomScale;},
    get zoomScale(){return zoomScale;},
    get wantsDetail(){return navigation.zoom/zoomScale>CAMERA_ZOOM.detailPrefetch||blend<1||selected!==null;},
    get waitingForDetail(){return waitingForDetail;},get renderTarget(){return presentationTarget;},
    setHome(){homePosition.copy(navigation.position);homeTarget.copy(controls.target);reset();},
    get mode(){return mode;},get blend(){return blend;},get selected(){return selected?.state.id??null;},
  };
}
