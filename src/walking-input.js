/** Keyboard and drag input for the fourth camera layer. Capturing these events
 * prevents Space/jump and WASD/walk from also driving the strategy controls. */
export function createWalkingInput(canvas,{isActive,onToggle,onExit}){
  const keys=new Set(),listeners=[];
  let pointer=null,lookX=0,lookY=0,pendingJump=false;
  const document=canvas.ownerDocument,window=document.defaultView??globalThis.window;
  function listen(target,type,fn,options){target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));}
  function clear(){
    const captured=pointer?.id;
    keys.clear();pointer=null;lookX=lookY=0;pendingJump=false;
    if(captured!==undefined&&canvas.hasPointerCapture?.(captured))canvas.releasePointerCapture(captured);
  }
  function consume(event){event.preventDefault();event.stopImmediatePropagation();}
  listen(canvas,'keydown',event=>{
    if(event.altKey||event.metaKey||event.ctrlKey)return;
    const key=event.key.toLowerCase();
    if(key==='v'){
      consume(event);if(!event.repeat){clear();onToggle();}return;
    }
    if(!isActive())return;
    if(['w','a','s','d',' ','shift','arrowleft','arrowright','arrowup','arrowdown'].includes(key)){
      if(key===' '&&!keys.has(key)&&!event.repeat)pendingJump=true;
      keys.add(key);consume(event);
    }else if(key==='escape'||key==='home'){
      consume(event);clear();onExit();
    }else if(['f','r','[',']','+','-','=','_'].includes(key))consume(event);
  },true);
  const keyUp=event=>{keys.delete(event.key.toLowerCase());};
  listen(canvas,'keyup',keyUp);listen(window,'keyup',keyUp);
  listen(canvas,'blur',clear);listen(window,'blur',clear);
  listen(document,'visibilitychange',()=>{if(document.hidden)clear();});
  listen(canvas,'pointerdown',event=>{
    if(!isActive())return;
    consume(event);canvas.focus?.({preventScroll:true});
    pointer={id:event.pointerId,x:event.clientX,y:event.clientY};canvas.setPointerCapture?.(event.pointerId);
  },true);
  listen(canvas,'pointermove',event=>{
    if(!isActive()||pointer?.id!==event.pointerId)return;
    consume(event);lookX-=(event.clientX-pointer.x)*.005;lookY+=(event.clientY-pointer.y)*.004;
    pointer.x=event.clientX;pointer.y=event.clientY;
  },true);
  const pointerEnd=event=>{if(pointer?.id===event.pointerId){pointer=null;if(canvas.hasPointerCapture?.(event.pointerId))canvas.releasePointerCapture(event.pointerId);}};
  listen(window,'pointerup',pointerEnd);listen(window,'pointercancel',pointerEnd);listen(canvas,'lostpointercapture',pointerEnd);
  listen(canvas,'wheel',event=>{if(isActive())consume(event);},{capture:true,passive:false});
  listen(canvas,'contextmenu',event=>{if(isActive())event.preventDefault();});
  return {clear,sample(dt=0){
    const value={forward:Number(keys.has('w'))-Number(keys.has('s')),right:Number(keys.has('d'))-Number(keys.has('a')),
      jump:pendingJump||keys.has(' '),sprint:keys.has('shift'),
      lookX:lookX+(Number(keys.has('arrowleft'))-Number(keys.has('arrowright')))*dt*1.6,
      lookY:lookY+(Number(keys.has('arrowdown'))-Number(keys.has('arrowup')))*dt*1.1};
    lookX=lookY=0;pendingJump=false;return value;
  },dispose(){clear();for(const remove of listeners)remove();}};
}
