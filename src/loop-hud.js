import {loopHudState,loopResourceLabel} from './loop-hud-state.js';
import {createLoopHudAnchor} from './loop-hud-anchor.js';
import {resourceIcon} from './resource-icons.js';
import {LOOP_ECONOMY_RULES} from './loop-economy-rules.js';
const write=(node,value)=>{if(node.textContent!==String(value))node.textContent=value;};
const icon=resource=>resource==='train'?'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="16" rx="3"/><path d="M5 11h14M8 6h8M8 22l2-3m6 3-2-3M8 15h1m6 0h1"/></svg>':resourceIcon(resource==='food'?'food':resource==='gold'?'gold':'resources');

/** The only purchase action sits directly above the explicitly selected rail.
 * Its button and Enter shortcut share the same visible/affordable guard. */
export function createLoopHud({parent,world,ownerId,onBuyTrain,onCycle,onClose,document:doc=parent.ownerDocument}){
  const root=doc.createElement('aside');root.className='loop-hud';root.hidden=true;root.setAttribute('aria-label','Selected railway');
  root.innerHTML=`<div class="loop-actions" data-loop="route">
    <div class="loop-alternatives" data-loop="alternatives"><button data-loop="previous" aria-label="Previous circuit on this track">‹</button><span data-loop="index"></span><button data-loop="next" aria-label="Next circuit on this track">›</button></div>
    <button class="loop-buy" data-loop="buy" aria-keyshortcuts="Enter">${icon('train')}<kbd>Enter</kbd><strong class="loop-cost">${icon('resources')}<span data-loop="cost"></span></strong></button>
    <button class="loop-close" data-loop="close" aria-label="Close selection" title="Close · Esc">×</button></div>
    <div class="loop-operation" data-loop="operation" hidden><span class="loop-fare" data-loop="fare">${icon('gold')}<span data-loop="departure"></span></span><span data-loop="status" role="status" hidden></span></div>
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
    const key=JSON.stringify([city.id,city.resource,state.station,state.foodStock,selected?.id,state.cost,state.departureGold,state.trainStatus.label,canBuy,shortfall,props.candidateIds]);
    if(key===lastKey){positionAction();return;}lastKey=key;
    root.dataset.resource=city.resource;root.dataset.circuit=selected?.id??'';
    nodes.route.hidden=!selected;nodes.operation.hidden=!selected;nodes.city.hidden=!!selected;nodes.shortfall.hidden=!selected||!shortfall;
    if(selected){
      nodes.buy.disabled=!canBuy;write(nodes.cost,state.cost);
      const yieldDescription=`Takes ${LOOP_ECONOMY_RULES.pickupStock} Resource or Food per stocked destination; brings ${LOOP_ECONOMY_RULES.pickup} home.`;
      const fareDescription=`Reserves ${state.departureGold} Gold per lap at departure. Empty stops refund their fare. A train without enough Gold at departure is destroyed.`;
      nodes.buy.setAttribute('aria-label',`Add train · ${state.cost} resources. ${yieldDescription} ${fareDescription}`);nodes.buy.title=`Add train · ${state.cost} resources · Enter. ${yieldDescription} ${fareDescription}`;
      write(nodes.departure,`${state.departureGold} / lap`);nodes.fare.title=fareDescription;nodes.fare.setAttribute('aria-label',fareDescription);
      nodes.status.hidden=!state.trainStatus.label;write(nodes.status,state.trainStatus.label);
      nodes.alternatives.hidden=!alternatives;const candidates=props.candidateIds??[];write(nodes.index,`${Math.max(0,candidates.indexOf(selected.id))+1}/${candidates.length}`);
      write(nodes.shortfall,`${shortfall} more resources`);
    }else{
      nodes.city.innerHTML=`<span>${icon(city.resource)} ${loopResourceLabel(city.resource)}</span>${city.resource==='food'&&state.foodStock!==null?`<span class="loop-food-stock" title="${state.foodStock} Food available">${state.foodStock}</span>`:''}`;
    }
    // Layout is measured only when content changes; camera movement only writes transforms.
    actionWidth=root.offsetWidth||204;positionAction();
  }
  return{root,update,buySelected,get selectedLoopId(){return state?.selected?.id??null;},dispose(){disposed=true;nodes.buy.removeEventListener('click',buy);nodes.previous.removeEventListener('click',previous);nodes.next.removeEventListener('click',next);nodes.close.removeEventListener('click',close);for(const name of ['pointerdown','pointerup','click','dblclick','wheel','keydown','keyup'])root.removeEventListener(name,stop);root.remove();}};
}
