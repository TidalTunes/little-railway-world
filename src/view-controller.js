import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CAMERA_ZOOM,modeForZoom,shouldStopFollowing,fitZoomForSpan } from './camera-modes.js';
import { C } from './palette.js';
import { surfaceFor,surfacePoint,surfaceFrame,surfaceNormal } from './world-surface.js';

const ease=(rate,dt,reduced)=>reduced?1:1-Math.exp(-rate*dt);
const centerOf=train=>train.parts[Math.floor(train.parts.length/2)];
// Map markers use the same 16× radial layer spacing as map-terrain-geometry.
// Keep this lightweight: importing that compiler here also loads tessellation.
const SPHERICAL_MAP_TRAIN_HEIGHT=.123*16;
const GLOBE_MAP_TILT=.48;

export function createViewController({canvas,camera,scene,mapScene,reducedMotion,getTrains,getWorldRoot,getWorld=()=>null,onPause,onRegenerate,isDetailReady=()=>true}){
  // Navigation keeps the user's orbit. The displayed camera can rise above it
  // for the map or train view without feeding automatic motion into OrbitControls.
  const navigation=camera.clone(),chartCamera=camera.clone(),coverageChart=camera.clone(),coverageView=camera.clone();
  const controls=new OrbitControls(navigation,canvas);
  Object.assign(controls,{enableDamping:true,dampingFactor:.075,panSpeed:.7,rotateSpeed:.45,
    minZoom:CAMERA_ZOOM.min,maxZoom:CAMERA_ZOOM.max,minPolarAngle:Math.PI*.20,maxPolarAngle:Math.PI*.40});
  controls.target.set(0,1.3,0);controls.update();
  let mode='world',blend=0,closeBlend=0,selected=null,hovered=null,zoomGoal=null;
  let zoomScale=1;
  let homePosition=new THREE.Vector3(),homeTarget=new THREE.Vector3();
  let lastPointer=null,gesture=null,gestureBlocked=false,hoverClock=0;
  const pointers=new Set(),raycaster=new THREE.Raycaster();
  raycaster.firstHitOnly=true;
  const pickMeshes=[];
  const projected=new THREE.Vector3(),pointerNDC=new THREE.Vector2(),cameraOffset=new THREE.Vector3();
  const spherical=new THREE.Spherical(),followTarget=new THREE.Vector3(),delta=new THREE.Vector3();
  const tangentFrame=new THREE.Matrix4(),surfaceTarget=new THREE.Vector3(),surfaceOffset=new THREE.Vector3();
  const surfaceUp=new THREE.Vector3(),viewDirection=new THREE.Vector3(),markerYaw=new THREE.Quaternion(),vertical=new THREE.Vector3(0,1,0);
  const chartBounds=new WeakMap();
  const domState={};
  const ringGeometry=new THREE.RingGeometry(.94,1,64);ringGeometry.rotateX(-Math.PI/2);
  const ringMaterial=new THREE.MeshBasicMaterial({color:C.trim,transparent:true,opacity:.9,depthWrite:false,toneMapped:false,side:THREE.DoubleSide});
  const ring=new THREE.Mesh(ringGeometry,ringMaterial),mapRing=new THREE.Mesh(ringGeometry,ringMaterial.clone());
  ring.visible=mapRing.visible=false;scene.add(ring);mapScene.add(mapRing);
  ring.renderOrder=3;mapRing.renderOrder=10;

  function constrainTarget(){
    const world=getWorld();
    if(!surfaceFor(world))return;
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
  function buildChartCamera(destination,close,map){
    destination.copy(navigation);
    spherical.setFromVector3(cameraOffset.copy(navigation.position).sub(controls.target));
    spherical.phi=THREE.MathUtils.lerp(spherical.phi,.36,close);
    spherical.phi=THREE.MathUtils.lerp(spherical.phi,surfaceFor(getWorld())?GLOBE_MAP_TILT:.00001,map);
    destination.position.copy(controls.target).add(cameraOffset.setFromSpherical(spherical));
    destination.lookAt(controls.target);destination.updateMatrixWorld(true);
    return destination;
  }
  function bendCamera(destination,chart){
    destination.copy(chart);
    const world=getWorld();
    if(surfaceFor(world)){
      surfaceFrame(world,controls.target.x,controls.target.z,tangentFrame);
      surfacePoint(world,controls.target.x,controls.target.y,controls.target.z,surfaceTarget);
      surfaceOffset.copy(chart.position).sub(controls.target).applyMatrix4(tangentFrame);
      destination.position.copy(surfaceTarget).add(surfaceOffset);
      destination.up.copy(chart.up).transformDirection(tangentFrame);
      destination.lookAt(surfaceTarget);
    }
    destination.updateMatrixWorld(true);
    return destination;
  }
  function updateCamera(){
    buildChartCamera(chartCamera,closeBlend,blend);bendCamera(camera,chartCamera);
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
    clearSelection();hovered=null;flushControls();
    navigation.position.copy(homePosition);controls.target.copy(homeTarget);
    navigation.zoom=1;navigation.updateProjectionMatrix();controls.update();
    mode=modeForZoom(1/zoomScale);blend=mode==='map'||!isDetailReady()?1:0;closeBlend=0;ring.visible=mapRing.visible=false;
    constrainTarget();
    if(surfaceFor(getWorld()))updateCamera();
    else{getWorldRoot()?.scale.set(1,1-blend*.985,1);chartCamera.copy(navigation);camera.copy(navigation);camera.updateMatrixWorld(true);}
    updateDOM();
  }
  function updateDOM(){
    const values={view:mode,following:selected?.state.id??'',zoom:navigation.zoom.toFixed(3),mapBlend:blend.toFixed(3)};
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
    if(event.key===' ')onPause();
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
  return {
    navigation,chartCamera,controls,reset,
    get coverageCamera(){
      const close=selected?1:THREE.MathUtils.smoothstep(navigation.zoom/zoomScale,1.9,2.8);
      return bendCamera(coverageView,buildChartCamera(coverageChart,close,0));
    },
    setScale(value){zoomScale=Math.max(1,Number(value)||1);controls.maxZoom=CAMERA_ZOOM.max*zoomScale;},
    get zoomScale(){return zoomScale;},
    get wantsDetail(){return navigation.zoom/zoomScale>.52||selected!==null;},
    setHome(){homePosition.copy(navigation.position);homeTarget.copy(controls.target);reset();},
    get mode(){return mode;},get blend(){return blend;},get selected(){return selected?.state.id??null;},
    update(dt){
      if(zoomGoal!==null){
        navigation.zoom=THREE.MathUtils.lerp(navigation.zoom,zoomGoal,ease(7,dt,reducedMotion.matches));
        if(Math.abs(navigation.zoom-zoomGoal)<.002){navigation.zoom=zoomGoal;zoomGoal=null;}
        navigation.updateProjectionMatrix();
      }
      if(selected&&(!selected.state.active||(zoomGoal===null&&shouldStopFollowing(navigation.zoom/zoomScale))))selected=null;
      mode=modeForZoom(navigation.zoom/zoomScale,mode);configureInput();controls.update();
      if(selected){
        followTarget.copy(centerOf(selected).position);followTarget.y=.75;
        delta.copy(controls.target).lerp(followTarget,ease(7,dt,reducedMotion.matches)).sub(controls.target);controls.target.add(delta);navigation.position.add(delta);
      }
      constrainTarget();
      blend=THREE.MathUtils.lerp(blend,mode==='map'||!isDetailReady()?1:0,ease(8,dt,reducedMotion.matches));
      if(blend<.001)blend=0;if(blend>.999)blend=1;
      const closeTarget=selected?1:THREE.MathUtils.smoothstep(navigation.zoom/zoomScale,1.9,2.8);
      closeBlend=THREE.MathUtils.lerp(closeBlend,closeTarget,ease(6,dt,reducedMotion.matches));
      updateCamera();
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
            surfaceFrame(world,part.position.x,part.position.z,tangentFrame);
            marker.quaternion.setFromRotationMatrix(tangentFrame).multiply(markerYaw.setFromAxisAngle(vertical,part.rotation.y));
          }else{
            marker.position.set(part.position.x,height,part.position.z);
            marker.rotation.set(0,part.rotation.y,0);
          }
          marker.scale.set(1.35,1,4.65);
          marker.material.opacity=selected?.state.id===highlighted.state.id ? .95 : .48;
        }
      }
      updateDOM();
    },
  };
}
