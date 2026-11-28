import {resourceIcon} from './resource-icons.js';
import {MILITARY_KINDS} from './military-assets.js';
import {militaryColors} from './military-palette.js';
import {MILITARY_RULES} from './military-simulation.js';

export const MILITARY_PURCHASES=Object.freeze(MILITARY_KINDS.map((kind,index)=>Object.freeze({
  kind,key:String(index+1),label:MILITARY_RULES[kind].name,...MILITARY_RULES[kind].cost,
})));
const shield='<svg viewBox="0 0 20 22" fill="none" aria-hidden="true"><path d="M10 2 17 5v6c0 4-3.4 7-7 9-3.6-2-7-5-7-9V5Z" fill="currentColor" opacity=".2"/><path d="M10 2 17 5v6c0 4-3.4 7-7 9-3.6-2-7-5-7-9V5Z" stroke="currentColor" stroke-width="1.5"/><path d="m6.5 11 2.2 2.2 4.8-5" stroke="currentColor" stroke-width="1.5"/></svg>';
const write=(node,value)=>{if(node.textContent!==String(value))node.textContent=String(value);};
const count=value=>Math.max(0,Math.floor(Number(value)||0));

/** Purchase shortcuts are presented beside real miniature portraits. Selection
 * and world input remain the controller's responsibility; no tutorial layer. */
export function createMilitaryHud({parent=globalThis.document?.body,onBuy,team,portraits={},document:doc=parent?.ownerDocument}={}){
  const root=doc.createElement('aside');root.className='military-hud';root.setAttribute('aria-label','Military units');
  root.style.setProperty('--military-team',`#${militaryColors(team).body.getHexString()}`);
  root.innerHTML=`<div class="military-unit-rail" role="group" aria-label="Recruit units">${MILITARY_PURCHASES.map(unit=>
    `<button type="button" class="military-buy" data-military="${unit.kind}" aria-keyshortcuts="${unit.key}" disabled>
      <kbd>${unit.key}</kbd><span class="military-unit-count" data-military="${unit.kind}-count" hidden></span>
      <img class="military-portrait" data-military="${unit.kind}-portrait" alt="" draggable="false" hidden>
      <span class="military-unit-label">${unit.label}</span>
      <span class="military-unit-cost"><span>${resourceIcon('resources')}<b>${unit.resources}</b></span>${unit.food?`<span>${resourceIcon('food')}<b>${unit.food}</b></span>`:''}</span>
    </button>`).join('')}</div>
    <div class="military-zone" data-military="zone" title="Friendly units inside your city’s spawn zone take half damage"><span>Spawn zone</span><span>${shield}½ damage</span></div>
    <div class="military-selection" data-military="selection" hidden><strong data-military="selected"></strong><span class="military-protected" data-military="protected" hidden>${shield}<span>½</span></span></div>
    <p class="military-feedback" data-military="feedback" role="status" aria-live="polite" hidden></p>`;
  parent.append(root);const nodes=Object.fromEntries([...root.querySelectorAll('[data-military]')].map(node=>[node.dataset.military,node]));
  let disposed=false,lastKey='',current={resources:0,food:0,available:false},listeners=[];
  function buy(kind){
    const unit=MILITARY_PURCHASES.find(item=>item.kind===kind);
    if(disposed||root.hidden||!unit||!current.available||current.resources<unit.resources||current.food<unit.food)return false;
    onBuy?.(kind);return true;
  }
  for(const unit of MILITARY_PURCHASES){const click=()=>buy(unit.kind);nodes[unit.kind].addEventListener('click',click);listeners.push([nodes[unit.kind],'click',click]);}
  const stop=event=>event.stopPropagation();
  for(const name of ['pointerdown','pointerup','click','dblclick','wheel','contextmenu']){root.addEventListener(name,stop);listeners.push([root,name,stop]);}
  function setPortraits(next={}){
    if(disposed)return;
    for(const unit of MILITARY_PURCHASES){const source=next[unit.kind];if(typeof source!=='string'||!source.startsWith('data:image/'))continue;
      const image=nodes[`${unit.kind}-portrait`];image.src=source;image.hidden=false;}
  }
  function update(props={}){
    if(disposed)return;
    const wallet=typeof props.resources==='object'?props.resources:null;
    current={resources:count(wallet?.resources??props.resources),food:count(props.food??wallet?.food),available:props.available!==false,disabledReason:props.disabledReason??'No spawn zone available'};
    root.hidden=props.visible===false;root.dataset.walking=String(!!props.walking);
    const selected=count(props.selectedCount),protectedCount=Math.min(selected,count(props.shieldedCount)),counts=props.counts??{},feedback=typeof props.feedback==='string'?props.feedback:props.feedback?.message??'';
    const key=JSON.stringify([current,selected,protectedCount,counts,feedback]);if(key===lastKey)return;lastKey=key;
    for(const unit of MILITARY_PURCHASES){
      const button=nodes[unit.kind],affordable=current.resources>=unit.resources&&current.food>=unit.food;
      button.disabled=!current.available||!affordable;button.dataset.affordable=String(affordable);
      const cost=`${unit.resources} ${unit.resources===1?'Resource':'Resources'}${unit.food?` + ${unit.food} Food`:''}`;
      const missing=[];if(current.resources<unit.resources)missing.push(`${unit.resources-current.resources} more Resources`);if(current.food<unit.food)missing.push(`${unit.food-current.food} more Food`);
      const reason=!current.available?current.disabledReason:missing.length?`Needs ${missing.join(' and ')}`:'';
      button.title=`${unit.label} · ${unit.key} · ${cost}${reason?` · ${reason}`:''}`;
      button.setAttribute('aria-label',`Recruit ${unit.label.toLowerCase()} for ${cost}${reason?`. ${reason}`:''}`);
      const total=count(counts[unit.kind]);nodes[`${unit.kind}-count`].hidden=!total;write(nodes[`${unit.kind}-count`],total);
    }
    nodes.selection.hidden=!selected;write(nodes.selected,`${selected} selected`);nodes.protected.hidden=!protectedCount;
    nodes.protected.title=`${protectedCount} ${protectedCount===1?'unit':'units'} in your spawn zone · Half damage`;
    nodes.protected.setAttribute('aria-label',nodes.protected.title);nodes.feedback.hidden=!feedback;write(nodes.feedback,feedback);
  }
  setPortraits(portraits);update({available:false});
  return {root,update,setPortraits,buy,dispose(){if(disposed)return;disposed=true;for(const[node,name,fn]of listeners)node.removeEventListener(name,fn);listeners=[];root.remove();}};
}
