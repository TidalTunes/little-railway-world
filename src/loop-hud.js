import './loop-hud.css';
import {loopHudState,loopResourceLabel} from './loop-hud-state.js';
const write=(node,value)=>{if(node.textContent!==String(value))node.textContent=value;};
const icons={wood:'<path d="m12 3-6 8h3l-4 6h5v4h4v-4h5l-4-6h3Z"/>',metal:'<path d="m5 16 3-10 9-2 4 10-6 7H8Z"/><path d="m8 6 7 8 6 0m-6 0-7 7"/>',food:'<path d="M12 21V7m0 6c-5 0-7-3-7-6 5 0 7 3 7 6Zm0 4c5 0 7-3 7-6-5 0-7 3-7 6Zm0-10c-3-3-3-5 0-6 3 1 3 3 0 6Z"/>',gold:'<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9 9h5l-4 6h5"/>'};
const icon=resource=>`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[resource]??icons.gold}</svg>`;

/** One small city / circuit inspector. Purchases call the authority exactly
 * once; inspection, loop selection and camera movement never create trains. */
export function createLoopHud({parent,ownerId,onBuyTrain}){
  const root=document.createElement('aside');root.className='loop-hud';root.setAttribute('aria-label','City railway');
  root.innerHTML=`<div class="loop-city-heading"><span class="loop-resource-icon" data-loop="icon"></span><div><span class="loop-eyebrow" data-loop="owner"></span><strong data-loop="title"></strong></div><span class="loop-visit" data-loop="visit" title="Gold paid to this city owner for each train visit">+3<span> / visit</span></span></div>
    <div class="loop-unlock" data-loop="unlock"><p data-loop="station"></p><div class="loop-progress" aria-hidden="true"><i data-loop="progress"></i></div></div>
    <p class="loop-walking-note" data-loop="walking"></p>
    <section class="loop-routes" data-loop="routes" hidden>
      <div class="loop-route-top"><span class="loop-eyebrow">YOUR CIRCUIT</span><span data-loop="trains"></span></div>
      <p class="loop-empty" data-loop="empty">Connect outward and return tracks.</p>
      <div data-loop="purchase" hidden><label class="loop-select-label" data-loop="select-label">Route<select data-loop="select" aria-label="Choose a train circuit"></select></label>
        <p class="loop-circuit" data-loop="circuit"></p><div class="loop-yields" data-loop="cargo"></div>
        <button type="button" data-loop="buy"><span>Buy train</span><span class="loop-buy-cost" data-loop="cost"></span></button>
        <p class="loop-caption" data-loop="caption"></p>
      </div>
    </section>
    <p class="loop-feedback" data-loop="feedback" role="status" hidden></p>`;
  parent.append(root);const nodes=Object.fromEntries([...root.querySelectorAll('[data-loop]')].map(node=>[node.dataset.loop,node]));
  let selectedLoopId=null,state=null,lastProps=null,lastKey='',optionsKey='',cargoKey='';
  const choose=()=>{selectedLoopId=nodes.select.value;lastKey='';if(lastProps)update(lastProps);};
  const buy=event=>{event.stopPropagation();if(state?.canBuy&&state.selected)onBuyTrain?.(state.city.id,state.selected.id);};
  const stop=event=>event.stopPropagation();nodes.select.addEventListener('change',choose);nodes.buy.addEventListener('click',buy);
  for(const name of ['pointerdown','pointerup','click','dblclick','wheel','keydown','keyup'])root.addEventListener(name,stop);
  function update(props={}){
    lastProps=props;state=loopHudState({...props,ownerId,selectedLoopId});selectedLoopId=state.selected?.id??null;
    const{city,owned,loops,selected,resource,station,houseCount,compact,showRoutes,canBuy,cost,shortfall,cargo}=state;
    const key=JSON.stringify([city,props.houses,props.resources?.gold,compact,props.tool,(props.night??0)>.45,props.feedback,selectedLoopId,props.delivered]);if(key===lastKey)return;lastKey=key;
    root.dataset.theme=(props.night??0)>.45?'night':'day';root.dataset.compact=String(compact);root.dataset.resource=resource??'wood';root.dataset.tool=props.tool??'axe';
    nodes.icon.innerHTML=icon(resource??'wood');write(nodes.owner,city?(owned?'YOUR CITY':city.neutral?'FARM VILLAGE':'NEIGHBORING CITY'):'YOUR SETTLEMENT');
    write(nodes.title,city?`${loopResourceLabel(resource)} production`:'Build your town');
    nodes.visit.hidden=!station;
    nodes.unlock.hidden=station;write(nodes.station,`Station at 6 homes · ${Math.min(6,houseCount)}/6`);nodes.progress.style.width=`${Math.min(1,houseCount/6)*100}%`;
    nodes.walking.hidden=!compact||!station;write(nodes.walking,'Workers gather. Trains bring resources home.');
    nodes.routes.hidden=!showRoutes;
    write(nodes.trains,city?.trains?`${city.trains} ${city.trains===1?'train':'trains'}`:'');
    nodes.empty.hidden=!!selected;nodes.purchase.hidden=!selected;
    if(selected){
      const nextOptions=loops.map(loop=>`${loop.id}:${loop.cityIds?.length}:${loop.cost}`).join('|');
      if(optionsKey!==nextOptions){optionsKey=nextOptions;nodes.select.replaceChildren(...loops.map((loop,index)=>{const option=document.createElement('option');option.value=loop.id;option.textContent=`Circuit ${index+1} · ${loop.cityIds?.length??0} cities`;return option;}));}
      nodes.select.value=selected.id;nodes['select-label'].hidden=loops.length<2;
      write(nodes.circuit,`${selected.cityIds?.length??0} cities · one-way circuit`);
      const nextCargo=JSON.stringify(cargo);if(cargoKey!==nextCargo){cargoKey=nextCargo;nodes.cargo.replaceChildren(...Object.entries(cargo).filter(([,amount])=>amount>0).map(([good,amount])=>{const item=document.createElement('span');item.dataset.resource=good;item.innerHTML=icon(good);const text=document.createElement('b');text.textContent=`${amount} ${loopResourceLabel(good).toLowerCase()}`;item.append(text);return item;}));}
      nodes.cargo.hidden=!Object.values(cargo).some(Boolean);nodes.buy.disabled=!canBuy;write(nodes.cost,`${cost} gold`);
      write(nodes.caption,shortfall?`Need ${shortfall} more gold.`:'Resources arrive after each complete circuit.');
    }
    nodes.feedback.hidden=!props.feedback;write(nodes.feedback,props.feedback??'');
  }
  return{root,update,get selectedLoopId(){return selectedLoopId;},dispose(){nodes.select.removeEventListener('change',choose);nodes.buy.removeEventListener('click',buy);for(const name of ['pointerdown','pointerup','click','dblclick','wheel','keydown','keyup'])root.removeEventListener(name,stop);root.remove();}};
}
