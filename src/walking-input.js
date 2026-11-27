/** Cursor look and keyboard input for the fourth camera layer. Capturing action
 * events prevents Space/jump and WASD/walk from also driving strategy controls. */
export function createWalkingInput(canvas,{isActive,onToggle,onExit,onKey=()=>false,canLook=()=>true}){
  const keys=new Set(),listeners=[];
  let pointer=null,hover=null,lookX=0,lookY=0,pendingJump=false,pendingSwing=false;
  let active=!!isActive(),looking=!!canLook();
  const document=canvas.ownerDocument,window=document.defaultView??globalThis.window;
  function listen(target,type,fn,options){target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));}
  function resetLook(){hover=null;lookX=lookY=0;if(pointer)pointer.lookReady=false;}
  function clear(){
    const captured=pointer?.id;
    keys.clear();pointer=null;resetLook();pendingJump=pendingSwing=false;
    if(captured!==undefined&&canvas.hasPointerCapture?.(captured))canvas.releasePointerCapture(captured);
  }
  function syncMode(){
    const nextActive=!!isActive(),nextLooking=!!canLook();
    if(nextActive!==active)clear();else if(nextLooking!==looking)resetLook();
    active=nextActive;looking=nextLooking;return active;
  }
  function consume(event){event.preventDefault();event.stopImmediatePropagation();}
  const finitePoint=event=>Number.isFinite(event.clientX)&&Number.isFinite(event.clientY);
  const touchPointer=event=>event.pointerType==='touch'||event.pointerType==='pen';
  function addLook(dx,dy){
    // Browser resizes and fast re-entry can produce an isolated large delta.
    // Bound both each displacement and each frame's accumulated rotation.
    const clamp=(value,limit)=>Math.max(-limit,Math.min(limit,value));
    lookX=clamp(lookX-clamp(dx,80)*.005,.65);
    lookY=clamp(lookY+clamp(dy,80)*.004,.45);
  }
  listen(canvas,'keydown',event=>{
    syncMode();
    if(event.altKey||event.metaKey||event.ctrlKey)return;
    if(onKey(event)){consume(event);return;}
    const key=event.key.toLowerCase();
    if(key==='v'){
      consume(event);if(!event.repeat){clear();onToggle();}return;
    }
    if(!active)return;
    if(['w','a','s','d',' ','e','shift','arrowleft','arrowright','arrowup','arrowdown'].includes(key)){
      if(key===' '&&!keys.has(key)&&!event.repeat)pendingJump=true;
      if(key==='e'&&!keys.has(key)&&!event.repeat)pendingSwing=true;
      keys.add(key);consume(event);
    }else if(key==='escape'||key==='home'){
      consume(event);clear();onExit();
    }else if(['f','r','[',']','+','-','=','_'].includes(key))consume(event);
  },true);
  const keyUp=event=>{keys.delete(event.key.toLowerCase());};
  listen(canvas,'keyup',keyUp);listen(window,'keyup',keyUp);
  listen(canvas,'blur',clear);listen(window,'blur',clear);
  listen(document,'visibilitychange',()=>{if(document.hidden)clear();});
  listen(canvas,'pointerenter',event=>{
    syncMode();resetLook();
    if(active&&looking&&!touchPointer(event)&&finitePoint(event))hover={id:event.pointerId,x:event.clientX,y:event.clientY};
  });
  listen(canvas,'pointerleave',()=>{
    resetLook();
    if(pointer&&!pointer.touch)pointer.click=false;
  });
  listen(canvas,'pointerdown',event=>{
    if(!syncMode())return;
    consume(event);canvas.focus?.({preventScroll:true});
    if(pointer||!finitePoint(event))return;
    pointer={id:event.pointerId,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,
      touch:touchPointer(event),lookReady:looking,click:(event.button??0)===0&&event.isPrimary!==false};
    // Mouse hover must be allowed to leave the canvas for HUD controls. Only
    // touch/pen need capture to finish their drag gesture outside the surface.
    if(pointer.touch)canvas.setPointerCapture?.(event.pointerId);
    else if(looking)hover={id:event.pointerId,x:event.clientX,y:event.clientY};
  },true);
  function trackDrag(event){
    if((event.clientX-pointer.startX)**2+(event.clientY-pointer.startY)**2>25)pointer.click=false;
  }
  listen(canvas,'pointermove',event=>{
    if(!syncMode())return;
    if(!finitePoint(event)){resetLook();return;}
    if(pointer?.id===event.pointerId)trackDrag(event);
    if(!looking){resetLook();return;}
    if(pointer?.touch||touchPointer(event)){
      if(pointer?.id!==event.pointerId)return;
      consume(event);
      if(pointer.lookReady)addLook(event.clientX-pointer.x,event.clientY-pointer.y);
      pointer.lookReady=true;pointer.x=event.clientX;pointer.y=event.clientY;return;
    }
    if(event.isPrimary===false||pointer&&pointer.id!==event.pointerId)return;
    if(hover?.id===event.pointerId)addLook(event.clientX-hover.x,event.clientY-hover.y);
    hover={id:event.pointerId,x:event.clientX,y:event.clientY};
    // Unpressed hover stays observable by placement aiming and other UI logic.
  },true);
  const pointerEnd=event=>{
    if(pointer?.id!==event.pointerId)return;
    if(event.type==='pointerup'){
      trackDrag(event);
      if(isActive()&&pointer.click&&(event.button??0)===0)pendingSwing=true;
    }
    if(event.type!=='pointerup')resetLook();
    pointer=null;
    if(canvas.hasPointerCapture?.(event.pointerId))canvas.releasePointerCapture(event.pointerId);
  };
  listen(window,'pointerup',pointerEnd);listen(window,'pointercancel',pointerEnd);listen(canvas,'lostpointercapture',pointerEnd);
  listen(canvas,'wheel',event=>{if(isActive())consume(event);},{capture:true,passive:false});
  listen(canvas,'contextmenu',event=>{if(isActive())event.preventDefault();});
  return {clear,sample(dt=0){
    syncMode();
    const elapsed=Number.isFinite(dt)?Math.max(0,Math.min(dt,.1)):0;
    const value={forward:Number(keys.has('w'))-Number(keys.has('s')),right:Number(keys.has('d'))-Number(keys.has('a')),
      jump:pendingJump||keys.has(' '),sprint:keys.has('shift'),swing:pendingSwing,
      lookX:lookX+(Number(keys.has('arrowleft'))-Number(keys.has('arrowright')))*elapsed*1.6,
      lookY:lookY+(Number(keys.has('arrowdown'))-Number(keys.has('arrowup')))*elapsed*1.1};
    lookX=lookY=0;pendingJump=pendingSwing=false;return value;
  },dispose(){clear();for(const remove of listeners)remove();}};
}
