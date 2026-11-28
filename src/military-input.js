/** Screen-space RTS picking stays independent of terrain/render detail. */
export function pickMilitaryUnit(units,point,project,{ownerId,enemy=false}={}){
  let best=null,nearest=Infinity;
  for(const unit of units){
    if(unit.hp<=0||ownerId&&(enemy?unit.ownerId===ownerId:unit.ownerId!==ownerId))continue;
    const p=project(unit);if(!p||p.visible===false)continue;
    const distance=Math.hypot(p.x-point.x,p.y-point.y);
    if(distance<Math.max(10,p.radius??12)&&distance<nearest){best=unit;nearest=distance;}
  }
  return best;
}
export function militaryUnitsInBox(units,a,b,project,ownerId){
  const left=Math.min(a.x,b.x),right=Math.max(a.x,b.x),top=Math.min(a.y,b.y),bottom=Math.max(a.y,b.y);
  return units.filter(unit=>{
    if(unit.ownerId!==ownerId||unit.hp<=0)return false;
    const p=project(unit);return p&&p.visible!==false&&p.x>=left&&p.x<=right&&p.y>=top&&p.y<=bottom;
  }).map(unit=>unit.id);
}

/** Capture only army gestures. Ordinary city/railway taps still reach the
 * existing inspectors; overview camera dragging uses the middle button. */
export function createMilitaryInput(canvas,{getState,project,groundAt,onSelect,onCommand,onClaimPointer}){
  const document=canvas.ownerDocument,window=document.defaultView,listeners=[];
  const marquee=document.createElement('div');marquee.className='military-marquee';marquee.hidden=true;document.body.append(marquee);
  let gesture=null;
  const point=event=>({x:event.clientX,y:event.clientY});
  const enabled=state=>state.active&&!state.walking&&!state.transitioning&&!state.blocked;
  const consume=event=>{event.preventDefault();event.stopImmediatePropagation();};
  const listen=(target,type,handler,options)=>{target.addEventListener(type,handler,options);listeners.push(()=>target.removeEventListener(type,handler,options));};
  function reset(){gesture=null;marquee.hidden=true;}
  function draw(end){
    marquee.hidden=false;marquee.style.left=`${Math.min(gesture.start.x,end.x)}px`;marquee.style.top=`${Math.min(gesture.start.y,end.y)}px`;
    marquee.style.width=`${Math.abs(end.x-gesture.start.x)}px`;marquee.style.height=`${Math.abs(end.y-gesture.start.y)}px`;
  }
  listen(document,'pointerdown',event=>{
    const state=getState();if(event.target!==canvas||!enabled(state)||event.pointerType==='touch')return;
    if(event.button===2&&state.selectedIds.size){
      reset();consume(event);onClaimPointer();canvas.focus({preventScroll:true});
      const hit=pickMilitaryUnit(state.units,point(event),project,{ownerId:state.ownerId,enemy:true}),destination=groundAt(point(event));
      if(hit)onCommand({type:'attack',targetId:hit.id});else if(destination)onCommand({type:'move',...destination});return;
    }
    if(event.button!==0)return;
    const hit=pickMilitaryUnit(state.units,point(event),project,{ownerId:state.ownerId});
    gesture={id:event.pointerId,start:point(event),hit:hit?.id,shift:event.shiftKey,moved:false};
    if(hit){consume(event);onClaimPointer();canvas.focus({preventScroll:true});}
  },true);
  // City/rail inspectors use canvas capture and still receive ordinary taps.
  // Stop before the target's bubble phase: OrbitControls records a pointer
  // even when LEFT is null, so letting it see this down and later swallowing
  // the marquee's up would leave its internal capture stuck indefinitely.
  listen(canvas,'pointerdown',event=>{
    if(event.button===0&&gesture?.id===event.pointerId&&enabled(getState()))event.stopPropagation();
  },true);
  listen(document,'pointermove',event=>{
    if(!gesture||gesture.id!==event.pointerId)return;
    if(!enabled(getState())){reset();return;}
    if(Math.hypot(event.clientX-gesture.start.x,event.clientY-gesture.start.y)>5){
      if(!gesture.moved)onClaimPointer();gesture.moved=true;
    }
    if(gesture.moved){consume(event);draw(point(event));}
  },true);
  // Window capture precedes the old window-level railway click handler.
  listen(window,'pointerup',event=>{
    if(!gesture||gesture.id!==event.pointerId)return;
    const current=gesture,state=getState();reset();if(!enabled(state))return;
    if(current.moved){consume(event);onSelect(militaryUnitsInBox(state.units,current.start,point(event),project,state.ownerId),current.shift);}
    else if(current.hit){consume(event);onSelect([current.hit],current.shift);}
    else if(!current.shift)onSelect([],false);
  },true);
  listen(window,'pointercancel',reset,true);listen(window,'blur',reset);
  listen(document,'visibilitychange',()=>{if(document.hidden)reset();});
  listen(canvas,'contextmenu',event=>{if(enabled(getState()))event.preventDefault();});
  // Double clicks belong to the army layer, never the camera's home reset.
  listen(canvas,'dblclick',event=>{if(enabled(getState()))consume(event);},true);
  return {get selecting(){return !!gesture?.moved;},reset,dispose(){reset();listeners.forEach(remove=>remove());marquee.remove();}};
}
