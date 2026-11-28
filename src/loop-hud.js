import {loopHudState,loopResourceLabel} from './loop-hud-state.js';
import {createLoopHudAnchor} from './loop-hud-anchor.js';
const write=(node,value)=>{if(node.textContent!==String(value))node.textContent=value;};
const icons={wood:'<path d="m12 3-6 8h3l-4 6h5v4h4v-4h5l-4-6h3Z"/>',metal:'<path d="m5 16 3-10 9-2 4 10-6 7H8Z"/><path d="m8 6 7 8 6 0m-6 0-7 7"/>',food:'<path d="M12 21V7m0 6c-5 0-7-3-7-6 5 0 7 3 7 6Zm0 4c5 0 7-3 7-6-5 0-7 3-7 6Zm0-10c-3-3-3-5 0-6 3 1 3 3 0 6Z"/>',gold:'<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9 9h5l-4 6h5"/>',train:'<rect x="5" y="3" width="14" height="16" rx="3"/><path d="M5 11h14M8 6h8M8 22l2-3m6 3-2-3M8 15h1m6 0h1"/>'};
const icon=resource=>`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[resource]??icons.gold}</svg>`;

/** The only purchase action sits directly above the explicitly selected rail.
 * Its button and Enter shortcut share the same visible/affordable guard. */
export function createLoopHud({parent,world,ownerId,onBuyTrain,onCycle,onClose,document:doc=parent.ownerDocument}){
  const root=doc.createElement('aside');root.className='loop-hud';root.hidden=true;root.setAttribute('aria-label','Selected railway');
  root.innerHTML=`<div class="loop-actions" data-loop="route">
    <div class="loop-alternatives" data-loop="alternatives"><button data-loop="previous" aria-label="Previous circuit on this track">‹</button><span data-loop="index"></span><button data-loop="next" aria-label="Next circuit on this track">›</button></div>
    <button class="loop-buy" data-loop="buy" aria-keyshortcuts="Enter">${icon('train')}<kbd>Enter</kbd><strong class="loop-cost">${icon('gold')}<span data-loop="cost"></span></strong></button>
    <button class="loop-close" data-loop="close" aria-label="Close selection" title="Close · Esc">×</button></div>
    <p class="loop-shortfall" data-loop="shortfall" role="status" hidden></p>
    <div class="loop-city-facts" data-loop="city" hidden></div>`;
  parent.append(root);const nodes=Object.fromEntries([...root.querySelectorAll('[data-loop]')].map(node=>[node.dataset.loop,node]));
  const project=createLoopHudAnchor(world);let state=null,lastKey='',disposed=false,actionWidth=204;
  const buySelected=()=>{if(disposed||root.hidden||!state?.canBuy)return false;onBuyTrain?.(state.city.id,state.selected.id);return true;};
  const buy=()=>buySelected(),previous=()=>onCycle?.(-1),next=()=>onCycle?.(1),close=()=>onClose?.();
  const stop=event=>event.stopPropagation();nodes.buy.addEventListener('click',buy);nodes.previous.addEventListener('click',previous);nodes.next.addEventListener('click',next);nodes.close.addEventListener('click',close);
  for(const name of ['pointerdown','pointerup','click','dblclick','wheel','keydown','keyup'])root.addEventListener(name,stop);
  function update(props={}){
    if(disposed)return;
    state=loopHudState({...props,ownerId});const{city,selected,canBuy,shortfall}=state;
    const anchor=selected?props.anchor:city;
    const position=!props.walking&&!props.transitioning&&props.tool==='axe'&&city?project(anchor,props.camera,props.viewport):null;
    root.hidden=!position;if(!position)return;
    // The action keeps its true rail anchor, including near viewport edges.
    // Only the small button row is shifted inward to remain clickable.
    const alternatives=(props.candidateIds?.length??0)>1;
    function positionAction(){
      const x=Math.max(actionWidth/2+8,Math.min(props.viewport.width-actionWidth/2-8,position.x));
      root.style.left=`${x.toFixed(2)}px`;root.style.top=`${position.y.toFixed(2)}px`;
      root.style.setProperty('--loop-anchor-x',`${(position.x-x).toFixed(2)}px`);
      root.dataset.below=String(position.below);root.dataset.kind=selected?'route':'city';
    }
    const key=JSON.stringify([city.id,city.resource,state.station,selected?.id,state.cost,canBuy,shortfall,props.candidateIds]);
    if(key===lastKey){positionAction();return;}lastKey=key;
    root.dataset.resource=city.resource;root.dataset.circuit=selected?.id??'';
    nodes.route.hidden=!selected;nodes.city.hidden=!!selected;nodes.shortfall.hidden=!selected||!shortfall;
    if(selected){
      nodes.buy.disabled=!canBuy;write(nodes.cost,state.cost);
      nodes.buy.setAttribute('aria-label',`Add train · ${state.cost} gold`);nodes.buy.title=`Add train · ${state.cost} gold · Enter`;
      nodes.alternatives.hidden=!alternatives;const candidates=props.candidateIds??[];write(nodes.index,`${Math.max(0,candidates.indexOf(selected.id))+1}/${candidates.length}`);
      write(nodes.shortfall,`${shortfall} more gold`);
    }else{
      nodes.city.innerHTML=`<span>${icon(city.resource)} ${loopResourceLabel(city.resource)}</span>${state.station?`<span title="Gold per train visit">${icon('gold')}3</span>`:''}`;
    }
    // Layout is measured only when content changes; camera movement only writes transforms.
    actionWidth=root.offsetWidth||204;positionAction();
  }
  return{root,update,buySelected,get selectedLoopId(){return state?.selected?.id??null;},dispose(){disposed=true;nodes.buy.removeEventListener('click',buy);nodes.previous.removeEventListener('click',previous);nodes.next.removeEventListener('click',next);nodes.close.removeEventListener('click',close);for(const name of ['pointerdown','pointerup','click','dblclick','wheel','keydown','keyup'])root.removeEventListener(name,stop);root.remove();}};
}
