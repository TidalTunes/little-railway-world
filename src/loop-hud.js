import './loop-hud.css';
import {loopHudState,loopResourceLabel} from './loop-hud-state.js';
const write=(node,value)=>{if(node.textContent!==String(value))node.textContent=value;};
const icons={wood:'<path d="m12 3-6 8h3l-4 6h5v4h4v-4h5l-4-6h3Z"/>',metal:'<path d="m5 16 3-10 9-2 4 10-6 7H8Z"/><path d="m8 6 7 8 6 0m-6 0-7 7"/>',food:'<path d="M12 21V7m0 6c-5 0-7-3-7-6 5 0 7 3 7 6Zm0 4c5 0 7-3 7-6-5 0-7 3-7 6Zm0-10c-3-3-3-5 0-6 3 1 3 3 0 6Z"/>',gold:'<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9 9h5l-4 6h5"/>',train:'<rect x="5" y="3" width="14" height="16" rx="3"/><path d="M5 11h14M8 6h8M8 22l2-3m6 3-2-3M8 15h1m6 0h1"/>'};
const icon=resource=>`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[resource]??icons.gold}</svg>`;
const cityLabel=(city,ownerId,index)=>city?.ownerId===ownerId?'Home':city?.name??(city?.neutral?'Farm village':`Town ${index+1}`);

/** The inspector follows explicit map selection. Inspection never chooses an
 * arbitrary loop or launches a train; only the purchase button spends gold. */
export function createLoopHud({parent,ownerId,onBuyTrain,onCycle,onClose}){
  const root=document.createElement('aside');root.className='loop-hud';root.hidden=true;root.setAttribute('aria-label','Selected railway');
  root.innerHTML=`<header class="loop-heading"><span class="loop-emblem" data-loop="icon"></span><div class="loop-heading-copy"><strong data-loop="title"></strong><span data-loop="subtitle"></span></div><button class="loop-close" data-loop="close" aria-label="Close selection">×</button></header>
    <section data-loop="route"><div class="loop-stops" data-loop="stops"></div>
      <div class="loop-manifest"><span>Per circuit</span><div class="loop-yields" data-loop="cargo"></div></div>
      <div class="loop-service" data-loop="service"><span data-loop="status"></span><strong data-loop="fleet"></strong><div class="loop-journey"><i data-loop="journey"></i></div></div>
      <div class="loop-purchase"><div class="loop-alternatives" data-loop="alternatives"><button data-loop="previous" aria-label="Previous circuit on this track">‹</button><span data-loop="index"></span><button data-loop="next" aria-label="Next circuit on this track">›</button></div><button class="loop-buy" data-loop="buy"><span>${icon('train')}Add train</span><strong data-loop="cost"></strong></button></div>
      <p class="loop-shortfall" data-loop="shortfall" hidden></p></section>
    <div class="loop-city-facts" data-loop="city"></div>
    <p class="loop-feedback" data-loop="feedback" role="status" hidden></p>`;
  parent.append(root);const nodes=Object.fromEntries([...root.querySelectorAll('[data-loop]')].map(node=>[node.dataset.loop,node]));
  let state=null,lastKey='';
  const buy=()=>{if(state?.canBuy)onBuyTrain?.(state.city.id,state.selected.id);};
  const previous=()=>onCycle?.(-1),next=()=>onCycle?.(1),close=()=>onClose?.();
  const stop=event=>event.stopPropagation();nodes.buy.addEventListener('click',buy);nodes.previous.addEventListener('click',previous);nodes.next.addEventListener('click',next);nodes.close.addEventListener('click',close);
  for(const name of ['pointerdown','pointerup','click','dblclick','wheel','keydown','keyup'])root.addEventListener(name,stop);
  function update(props={}){
    state=loopHudState({...props,ownerId});const{city,selected,cargo,canBuy,shortfall}=state;
    root.hidden=!!props.walking||props.tool!=='axe'||!city;if(root.hidden)return;
    const trains=(props.trains??[]).filter(train=>train.loopId===selected?.id&&train.ownerId===ownerId),train=trains.find(train=>train.state==='dwell')??trains.find(train=>train.state==='moving')??trains[0];
    const progress=train?.state==='dwell'?train.dwellProgress:(train?.distance??0)/(train?.length||1);
    nodes.journey.style.width=`${Math.max(0,Math.min(1,progress))*100}%`;nodes.service.dataset.stopped=String(train?.state==='dwell');
    const key=JSON.stringify([city?.id,city?.level,city?.houseCount,city?.resource,selected?.id,selected?.trainCount,props.resources?.gold,props.candidateIds,props.feedback,train?.state,train?.stopCityId,train?.nextStopCityId,trains.length]);if(key===lastKey)return;lastKey=key;
    root.dataset.resource=city.resource;root.dataset.circuit=selected?.id??'';
    nodes.icon.innerHTML=icon(selected?'train':city.resource);
    const ordinal=state.loops.findIndex(loop=>loop.id===selected?.id)+1;
    write(nodes.title,selected?`Circuit ${String(ordinal).padStart(2,'0')}`:cityLabel(city,ownerId,0));
    write(nodes.subtitle,selected?`${selected.cityIds.length} stops · one way`:`Level ${city.level} · ${city.houseCount} homes`);
    nodes.route.hidden=!selected;nodes.city.hidden=!!selected;
    if(selected){
      nodes.stops.replaceChildren(...selected.stops.map((stop,index)=>{
        const town=props.cities?.find(item=>item.id===stop.cityId),item=document.createElement('span');item.className='loop-stop';item.dataset.resource=stop.resource;item.dataset.home=String(stop.cityId===city.id);item.title=cityLabel(town,ownerId,index);
        item.innerHTML=icon(stop.resource);const label=document.createElement('span');label.textContent=cityLabel(town,ownerId,index);item.append(label);return item;
      }));
      nodes.cargo.replaceChildren(...Object.entries(cargo).filter(([,amount])=>amount>0).map(([resource,amount])=>{const item=document.createElement('span');item.dataset.resource=resource;item.title=loopResourceLabel(resource);item.innerHTML=icon(resource);const value=document.createElement('b');value.textContent=`+${amount}`;item.append(value);return item;}));
      if(!Object.values(cargo).some(Boolean))write(nodes.cargo,'Gold-producing stops');
      const stop=props.cities?.find(city=>city.id===train?.stopCityId);
      write(nodes.status,!train?'No service':train.state==='dwell'?`Loading · ${cityLabel(stop,ownerId,0)}`:train.state==='waiting'?'Waiting for clear track':'In transit');
      write(nodes.fleet,`${trains.length} ${trains.length===1?'train':'trains'}`);
      nodes.service.hidden=!trains.length;
      nodes.buy.disabled=!canBuy;nodes.cost.innerHTML=`${icon('gold')} ${state.cost}`;
      const candidates=props.candidateIds??[];nodes.alternatives.hidden=candidates.length<2;write(nodes.index,`${Math.max(0,candidates.indexOf(selected.id))+1}/${candidates.length}`);
      nodes.shortfall.hidden=!shortfall;write(nodes.shortfall,`${shortfall} more gold needed`);
    }else{
      nodes.city.innerHTML=`<span>${icon(city.resource)} ${loopResourceLabel(city.resource)} production</span><span>${icon('gold')} +3 per train visit</span>`;
      nodes.city.lastElementChild.hidden=!state.station;
    }
    nodes.feedback.hidden=!props.feedback;write(nodes.feedback,props.feedback??'');
  }
  return{root,update,get selectedLoopId(){return state?.selected?.id??null;},dispose(){nodes.buy.removeEventListener('click',buy);nodes.previous.removeEventListener('click',previous);nodes.next.removeEventListener('click',next);nodes.close.removeEventListener('click',close);for(const name of ['pointerdown','pointerup','click','dblclick','wheel','keydown','keyup'])root.removeEventListener(name,stop);root.remove();}};
}
