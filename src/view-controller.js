import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CAMERA_ZOOM,clampZoom,modeForZoom,shouldStopFollowing,fitZoomForSpan } from './camera-modes.js';
import { C } from './palette.js';

const ease=(rate,dt,reduced)=>reduced?1:1-Math.exp(-rate*dt);
const centerOf=train=>train.parts[Math.floor(train.parts.length/2)];

export function createViewController({canvas,camera,scene,mapScene,reducedMotion,getTrains,getWorldRoot,onPause,onRegenerate}){
  // Navigation keeps the user's orbit. The displayed camera can rise above it
  // for the map or train view without feeding automatic motion into OrbitControls.
  const navigation=camera.clone();
  const controls=new OrbitControls(navigation,canvas);
  Object.assign(controls,{enableDamping:true,dampingFactor:.075,panSpeed:.7,rotateSpeed:.45,
    minZoom:CAMERA_ZOOM.min,maxZoom:CAMERA_ZOOM.max,minPolarAngle:Math.PI*.20,maxPolarAngle:Math.PI*.40});
  controls.target.set(0,1.3,0);controls.update();
  let mode='world',blend=0,closeBlend=0,selected=null,hovered=null,zoomGoal=null;
  let homePosition=new THREE.Vector3(),homeTarget=new THREE.Vector3();
  let lastPointer=null,gesture=null,gestureBlocked=false,hoverClock=0;
  const pointers=new Set(),raycaster=new THREE.Raycaster();
  const ringGeometry=new THREE.RingGeometry(.94,1,64);ringGeometry.rotateX(-Math.PI/2);
  const ringMaterial=new THREE.MeshBasicMaterial({color:C.trim,transparent:true,opacity:.9,depthWrite:false,toneMapped:false,side:THREE.DoubleSide});
  const ring=new THREE.Mesh(ringGeometry,ringMaterial),mapRing=new THREE.Mesh(ringGeometry,ringMaterial.clone());
  ring.visible=mapRing.visible=false;scene.add(ring);mapScene.add(mapRing);
  ring.renderOrder=3;mapRing.renderOrder=10;

  function flushControls(){const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.enableDamping=damping;}
  function clearSelection(){selected=null;zoomGoal=null;}
  function followZoom(){return Math.max(CAMERA_ZOOM.follow,fitZoomForSpan({
    viewWidth:navigation.right-navigation.left,viewHeight:navigation.top-navigation.bottom,
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
    mode='world';blend=0;closeBlend=0;ring.visible=mapRing.visible=false;
    getWorldRoot()?.scale.set(1,1,1);camera.copy(navigation);camera.updateMatrixWorld(true);
    updateDOM();
  }
  function updateDOM(){
    canvas.dataset.view=mode;canvas.dataset.following=selected?.state.id??'';
    canvas.dataset.zoom=navigation.zoom.toFixed(3);
    canvas.dataset.mapBlend=blend.toFixed(3);
  }
  function screenPosition(train,part=centerOf(train)){
    const p=part.position.clone();
    p.y=blend>.7 ? .3 : (p.y+.8)*(getWorldRoot()?.scale.y??1);
    return p.project(camera);
  }
  function isVisible(train,part){
    if(!train.state.active)return false;
    if(!part)return train.parts.some(car=>isVisible(train,car));
    if(!part.visible)return false;
    const p=screenPosition(train,part);
    if(Math.abs(p.x)>1.05||Math.abs(p.y)>1.05||p.z < -1||p.z>1)return false;
    if(blend>.7)return true;
    raycaster.setFromCamera(new THREE.Vector2(p.x,p.y),camera);
    const hits=raycaster.intersectObject(getWorldRoot(),true);
    const hit=hits.find(hit=>{
      let object=hit.object;while(object){if(!object.visible)return false;object=object.parent;}return true;
    });
    let object=hit?.object;
    while(object){if(object.userData.trainId===train.state.id)return true;object=object.parent;}
    return false;
  }
  function pick(x,y,touch=false){
    const rect=canvas.getBoundingClientRect(),limit=touch?28:17;
    let best=null,bestDistance=Infinity;
    getWorldRoot()?.updateMatrixWorld(true);camera.updateMatrixWorld(true);
    for(const train of getTrains()){
      if(!train.state.active)continue;
      for(const part of train.parts){
        const p=part.position.clone();p.y=blend>.7?.3:(p.y+.8)*(getWorldRoot()?.scale.y??1);p.project(camera);
        if(p.z < -1||p.z>1)continue;
        const d=Math.hypot((p.x+1)*rect.width/2+rect.left-x,(1-p.y)*rect.height/2+rect.top-y);
        if(d<limit&&d<bestDistance&&isVisible(train,part)){best=train;bestDistance=d;}
      }
    }
    return best;
  }
  function nearestTrain(){
    return getTrains().filter(train=>isVisible(train)).sort((a,b)=>{
      const x=screenPosition(a),y=screenPosition(b);return x.x*x.x+x.y*x.y-y.x*y.x-y.y*y.y;
    })[0];
  }
  function cycle(direction){
    const trains=getTrains().filter(t=>t.state.active);
    if(!trains.length)return;
    const index=trains.indexOf(selected),next=index<0?(direction>0?0:trains.length-1):(index+direction+trains.length)%trains.length;
    select(trains[next]);
  }
  function configureInput(){
    const plan=mode==='map'||mode==='close';
    controls.enableRotate=!plan&&!selected;controls.enablePan=!selected;controls.screenSpacePanning=!plan;
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
    if(!pointers.size&&!lastPointer.touch){hovered=pick(lastPointer.x,lastPointer.y);canvas.style.cursor=hovered?'pointer':selected?'default':'grab';}
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
      zoomGoal=null;navigation.zoom=clampZoom(navigation.zoom*(event.key==='+'||event.key==='='?1.16:1/1.16));navigation.updateProjectionMatrix();
    }else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
      if(mode==='world'&&!selected){
        const offset=navigation.position.clone().sub(controls.target),spherical=new THREE.Spherical().setFromVector3(offset);
        if(event.key==='ArrowLeft')spherical.theta-=.08;if(event.key==='ArrowRight')spherical.theta+=.08;
        if(event.key==='ArrowUp')spherical.phi-=.05;if(event.key==='ArrowDown')spherical.phi+=.05;
        spherical.phi=THREE.MathUtils.clamp(spherical.phi,controls.minPolarAngle,controls.maxPolarAngle);
        navigation.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
      }else{
        clearSelection();
        const right=new THREE.Vector3(1,0,0).applyQuaternion(camera.quaternion),up=new THREE.Vector3(0,1,0).applyQuaternion(camera.quaternion);
        right.y=up.y=0;right.normalize();up.normalize();
        const amount=(navigation.top-navigation.bottom)/navigation.zoom*.045;
        const delta=(event.key==='ArrowLeft'?right.multiplyScalar(-amount):event.key==='ArrowRight'?right.multiplyScalar(amount):event.key==='ArrowUp'?up.multiplyScalar(amount):up.multiplyScalar(-amount));
        controls.target.add(delta);navigation.position.add(delta);
      }
      controls.update();
    }else handled=false;
    if(handled)event.preventDefault();
  });
  return {
    navigation,controls,reset,
    setHome(){homePosition.copy(navigation.position);homeTarget.copy(controls.target);reset();},
    get mode(){return mode;},get blend(){return blend;},get selected(){return selected?.state.id??null;},
    update(dt){
      if(zoomGoal!==null){
        navigation.zoom=THREE.MathUtils.lerp(navigation.zoom,zoomGoal,ease(7,dt,reducedMotion.matches));
        if(Math.abs(navigation.zoom-zoomGoal)<.002){navigation.zoom=zoomGoal;zoomGoal=null;}
        navigation.updateProjectionMatrix();
      }
      if(selected&&(!selected.state.active||(zoomGoal===null&&shouldStopFollowing(navigation.zoom))))selected=null;
      mode=modeForZoom(navigation.zoom,mode);configureInput();controls.update();
      if(selected){
        const p=centerOf(selected).position.clone();p.y=.75;
        const target=controls.target.clone().lerp(p,ease(7,dt,reducedMotion.matches));
        const delta=target.sub(controls.target);controls.target.add(delta);navigation.position.add(delta);
      }
      blend=THREE.MathUtils.lerp(blend,mode==='map'?1:0,ease(8,dt,reducedMotion.matches));
      if(blend<.001)blend=0;if(blend>.999)blend=1;
      const closeTarget=selected?1:THREE.MathUtils.smoothstep(navigation.zoom,1.9,2.8);
      closeBlend=THREE.MathUtils.lerp(closeBlend,closeTarget,ease(6,dt,reducedMotion.matches));
      camera.copy(navigation);
      const spherical=new THREE.Spherical().setFromVector3(navigation.position.clone().sub(controls.target));
      spherical.phi=THREE.MathUtils.lerp(spherical.phi,.36,closeBlend);
      spherical.phi=THREE.MathUtils.lerp(spherical.phi,.00001,blend);
      camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
      camera.lookAt(controls.target);camera.updateMatrixWorld(true);
      getWorldRoot()?.scale.set(1,1-blend*.985,1);
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
          marker.position.set(part.position.x,marker===ring ? .045 : .6,part.position.z);
          marker.rotation.y=part.rotation.y;
          marker.scale.set(1.35,1,4.65);
          marker.material.opacity=selected?.state.id===highlighted.state.id ? .95 : .48;
        }
      }
      updateDOM();
    },
  };
}
