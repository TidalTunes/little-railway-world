import {settlementCityLevel} from './settlement-progression.js';

const text=(element,value)=>{if(element.textContent!==value)element.textContent=value;};
const count=value=>Number.isFinite(value)?Math.max(0,Math.floor(value)):0;
const number=new Intl.NumberFormat('en-US');
const compactNumber=new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:0});
const inventoryNumber=value=>value<10000?number.format(value):compactNumber.format(value);

/** Progress belongs to homes, even while a landmark is waiting for clear space. */
export function settlementHudProgress(houseCount){
  const houses=count(houseCount),level=settlementCityLevel(houses),complete=level===5;
  return {houses,level,complete,progress:complete?1:(houses-level*3)/3,next:complete?null:(level+1)*3};
}

/** Choosing endpoints never confirms a purchase. Only a valid, affordable
 * preview exposes the separate build action. These are presentation guards;
 * the controller still validates and spends the gold on confirmation. */
export function settlementHudRailway(railway,{gold=0,ready=true}={}){
  const stage=['source','destination','planning','preview'].includes(railway?.stage)?railway.stage:'source';
  const cost=Number.isFinite(railway?.cost)?count(railway.cost):5,hasCity=Boolean(railway?.hasCity);
  const missingGold=Math.max(0,cost-count(gold)),affordable=missingGold===0,showConfirm=stage==='preview';
  const source=railway?.sourceLabel||'Your city',target=railway?.targetLabel||'Destination';
  const selection=stage==='source'?'Choose your city':stage==='destination'&&!railway?.hovering?`${source} → …`:`${source} → ${target}`;
  const reason=typeof railway?.reason==='string'?railway.reason.replace(/[.!]$/,''):'',code=railway?.code;
  // A wallet or worker problem is not evidence that the route is impossible.
  // Local geometric failures still need feedback while a handle is being dragged.
  const siteInvalid=railway?.siteValid===false&&!['not-enough-gold','planning-failed','world-changed'].includes(code)
    &&(showConfirm||railway?.hovering||stage==='planning'&&Boolean(code));
  const canBuild=Boolean(ready&&hasCity&&affordable&&showConfirm&&railway?.canBuild&&railway?.siteValid!==false);
  let status,statusKind='info';
  if(!ready)status='Preparing…';
  else if(!hasCity)status='3 homes to start';
  else if(siteInvalid){status=reason||'Give the route more room';statusKind='error';}
  else if(stage==='planning')status='Checking route…';
  else if(stage==='destination'&&railway?.hovering&&railway?.siteValid)status='Click to shape route';
  else if(!affordable&&showConfirm){status=`${missingGold} more gold needed`;statusKind='cost';}
  else if(canBuild){status='Drag dots to shape the line';statusKind='success';}
  else if(reason&&code!=='ready'&&code!=='not-enough-gold')status=reason;
  else if(showConfirm)status='Checking route…';
  else status=stage==='source'?'': 'Hover a city · click to choose';
  return {stage,cost,hasCity,affordable,missingGold,showConfirm,canBuild,selection,status,statusKind};
}

// Compact faceted symbols share the timber, metal and paint of the world.
const symbol=body=>`<svg class="settlement-symbol" viewBox="0 0 32 32" fill="none" aria-hidden="true">${body}</svg>`;
const symbols={
  log:symbol('<path class="settlement-log-bark" d="m3 15 15-9 11 6v11l-15 8-11-6z"/><path class="settlement-log-light" d="m3 15 15-9 11 6-15 8z"/><path class="settlement-log-cut" d="m3 15 11 5v11L3 25z"/><path class="settlement-log-grain" d="m6 20 5 2v5l-5-3z"/><path class="settlement-log-seam" d="m17 23 9-5"/>'),
  coin:symbol('<path class="settlement-coin-edge" d="m16 2 7 2 6 7 1 7-4 8-7 4-8-1-7-6-2-8 4-8z"/><path class="settlement-coin-face" d="m16 5 6 2 4 5 1 6-4 6-5 3-6-1-5-5-2-6 4-6z"/><path class="settlement-coin-shine" d="m6 14 3-5 7-4 6 2-7 1-6 4-2 8z"/><path class="settlement-coin-mark" d="M14 10h4v13h-4z"/>'),
  sun:symbol('<path class="settlement-sun-rays" d="M14 0h4v5h-4zM14 27h4v5h-4zM0 14h5v4H0zM27 14h5v4h-5zM4 6l2-2 4 4-2 2zM22 24l2-2 4 4-2 2zM4 26l4-4 2 2-4 4zM22 8l4-4 2 2-4 4z"/><path class="settlement-sun-face" d="m16 7 7 3 3 6-3 7-7 3-6-3-3-7 3-6z"/><path class="settlement-sun-shade" d="m16 7 7 3 3 6-3 7-7 3 5-10z"/>'),
  moon:symbol('<path class="settlement-moon-face" d="m19 3-8 2-6 6-1 8 4 7 8 3 8-3 4-6-6 1-6-3-3-6 1-5z"/><path class="settlement-moon-shade" d="m4 19 4 7 8 3 8-3 4-6-6 1-6 4-7-2z"/>'),
  axe:symbol('<path fill="var(--settlement-log-light)" d="m8 29 4 1L25 5l-4-2z"/><path fill="currentColor" d="m15 4-8 1-5 9 11 5 9-11z"/><path fill="var(--settlement-gold-light)" d="m2 14 11 5 2-4-11-5z"/>'),
  house:symbol('<path fill="currentColor" d="M5 15h22v15H5z"/><path fill="var(--settlement-log-cut)" d="M13 20h6v10h-6zM7 17h4v5H7zM21 17h4v5h-4z"/><path fill="var(--settlement-key-paint,var(--settlement-city))" d="M1 15 16 2l15 13z"/>'),
  rail:symbol('<path stroke="currentColor" stroke-width="3" d="m11 3-5 27M21 3l5 27M10 8h12M9 14h14M8 20h16M7 26h18"/>'),
  map:symbol('<path fill="currentColor" d="m2 7 9-4 10 4 9-4v23l-9 4-10-4-9 4z"/><path stroke="var(--settlement-gold-light)" stroke-width="1.5" d="M11 4v21M21 8v21"/><path stroke="var(--settlement-gold-face)" stroke-width="2" stroke-linecap="round" d="m6 21 9-8 10 5"/>'),
  walk:symbol('<path fill="currentColor" d="m13 2 7-1 3 5-4 5-6-1-3-4zM10 12h12l3 11h-5l-1-7-1 14h-5l-1-14-2 7H6z"/>'),
  check:symbol('<path stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" d="m6 16 7 7L27 8"/>'),
  close:symbol('<path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="m8 8 16 16M24 8 8 24"/>'),
  move:symbol('<path fill="currentColor" d="m16 2 5 6h-3v6h6v-3l6 5-6 5v-3h-6v6h3l-5 6-5-6h3v-6H8v3l-6-5 6-5v3h6V8h-3z"/>'),
  run:symbol('<path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="m15 13 5 5 6-4M15 13l-5 8-6 1M15 13l5-5 5 3M12 12l-5 3M14 22l6 7"/><path fill="currentColor" d="m21 2 5 1 1 4-4 2-4-3z"/>'),
  jump:symbol('<path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M16 22V4m-6 6 6-6 6 6M4 26l5 3h14l5-3"/>'),
};

const actionIcon={axe:'axe',house:'house',rail:'rail',view:'map',build:'check',cancel:'close','rail-build':'check','rail-cancel':'close','day-night':'moon'};
const keyAction=(action,key,label,extra='')=>`<button type="button" data-action="${action}" title="${label} · ${key}" ${extra.includes('aria-label=')?'':`aria-label="${label}"`} ${extra}><span class="settlement-action-icon" data-action-icon aria-hidden="true">${symbols[actionIcon[action]]}</span><kbd>${key}</kbd><span class="settlement-action-label" data-action-label aria-hidden="true">${label}</span></button>`;

/** Numeric resources, nearby city growth and keyboard controls share the world
 * palette. Callback events stop here rather than reaching character input.
 * update accepts the existing settlement state plus gold, dayPhase and optional
 * nightAmount (lighting blend, so dusk text stays legible before the day ends),
 * and railway:{stage,canBuild,siteValid,cost,code,reason,sourceLabel,targetLabel,hasCity}.
 * showIncome({amount, days}) presents a brief third-person payout notification.
 */
export function createSettlementHud({
  parent=document.body,playerColor='#37a98d',onTool=()=>{},onView=()=>{},
  onBuild=()=>{},onCancel=()=>{},onDayNight=()=>{},onChop=null,onRailBuild=()=>{},
}={}){
  const root=document.createElement('aside');
  root.className='settlement-hud';root.setAttribute('aria-label','Settlement controls');
  root.style.setProperty('--settlement-owner',playerColor);
  root.innerHTML=`
    <div class="settlement-inventory" role="group" aria-label="Resources">
      <div class="settlement-resource settlement-wood" data-hud="wood-stock" aria-label="No logs. Ten logs builds a house."><strong data-hud="logs">0</strong><span class="settlement-resource-caption">${symbols.log}<span>Logs</span></span></div>
      <div class="settlement-resource settlement-gold" data-hud="gold-stock" aria-label="No gold"><strong data-hud="gold">0</strong><span class="settlement-resource-caption">${symbols.coin}<span>Gold</span></span></div>
    </div>
    <div class="settlement-development" data-hud="development" role="group" aria-label="Settlement development">
      <span class="settlement-level" aria-hidden="true">
        <svg class="settlement-level-paint" viewBox="0 0 64 64"><path d="m32 8 17 7 7 17-7 17-17 7-17-7-7-17 7-17z"/><path d="m32 8 17 7 7 17-7 17-17 7 11-24z"/></svg>
        <svg class="settlement-progress" viewBox="0 0 64 64"><circle class="settlement-progress-track" cx="32" cy="32" r="29"/><circle class="settlement-progress-arc" data-hud="progress" cx="32" cy="32" r="29" pathLength="1"/></svg>
        <strong data-hud="level">0</strong>
      </span>
      <span class="settlement-growth"><span class="settlement-label" data-hud="city-label">Outpost</span><strong data-hud="city-progress">1 / 3</strong><span class="settlement-growth-caption" data-hud="growth-caption">toward city</span></span>
    </div>
    <div class="settlement-day-control"><span class="settlement-phase-label"><span data-hud="phase-symbol" data-kind="sun">${symbols.sun}</span><span class="settlement-label" data-hud="day-phase">Daytime</span></span>${keyAction('day-night','N','Night','aria-keyshortcuts="N" aria-label="Skip to night and collect daily income"')}</div>
    <div class="settlement-income" data-hud="income" role="status" aria-live="polite" aria-atomic="true" hidden>
      <span class="settlement-income-rule" aria-hidden="true"></span>
      <span class="settlement-income-copy"><span class="settlement-income-amount"><strong data-hud="income-amount">+0</strong><span class="settlement-income-currency">${symbols.coin}<span>Gold</span></span></span><span class="settlement-income-label" data-hud="income-label">Day's earnings</span></span>
      <span class="settlement-income-rule" aria-hidden="true"></span>
    </div>
    <div class="settlement-dock">
      <div class="settlement-build-actions" data-hud="build-actions" role="group" aria-label="House placement" hidden>
        <span class="settlement-placement-note"><span class="settlement-cost" aria-label="Ten logs">${symbols.log}<strong>10</strong></span><span data-hud="placement">Joins city</span></span>
        <span class="settlement-validity" data-hud="validity"></span>
        <div class="settlement-placement-keys">${keyAction('build','Enter','Place','aria-keyshortcuts="Enter"')}${keyAction('cancel','Esc','Cancel','aria-keyshortcuts="Escape"')}</div>
      </div>
      <div class="settlement-rail-actions" data-hud="rail-actions" role="group" aria-label="Railway placement" hidden>
        <span class="settlement-placement-note"><span class="settlement-cost">${symbols.coin}<strong data-hud="rail-cost">5</strong></span><span class="settlement-rail-selection" data-hud="rail-selection">Choose your city</span></span>
        <span class="settlement-rail-status" data-hud="rail-status"></span>
        <div class="settlement-placement-keys">${keyAction('rail-build','Enter','Build line','aria-keyshortcuts="Enter" hidden')}${keyAction('rail-cancel','Esc','Cancel','aria-keyshortcuts="Escape"')}</div>
      </div>
      <div class="settlement-actions" role="group" aria-label="Tools and camera">
        ${keyAction('axe','E','Chop','class="settlement-tool" aria-pressed="true" aria-keyshortcuts="E" aria-label="Select axe. E or click to chop a nearby tree."')}
        ${keyAction('house','B','Build','class="settlement-tool" aria-pressed="false" aria-keyshortcuts="B" aria-label="Place a house. Costs ten logs."')}
        ${keyAction('rail','T','Railway','class="settlement-tool" aria-pressed="false" aria-keyshortcuts="T" aria-label="Plan a railway. Costs five gold. Start from one of your cities." hidden')}
        ${keyAction('view','V','Overview','aria-keyshortcuts="V" aria-label="Switch to overview"')}
      </div>
      <div class="settlement-movement" data-hud="movement" aria-label="WASD moves, Shift runs, Space jumps"><span title="Move · WASD">${symbols.move}<kbd>WASD</kbd></span><span title="Run · Shift">${symbols.run}<kbd>Shift</kbd></span><span title="Jump · Space">${symbols.jump}<kbd>Space</kbd></span></div>
    </div>
    <div class="settlement-sr-only" data-hud="announcements" role="status" aria-live="polite" aria-atomic="true"></div>`;
  parent.append(root);
  const nodes=Object.fromEntries([...root.querySelectorAll('[data-hud]')].map(node=>[node.dataset.hud,node]));
  const buttons=Object.fromEntries([...root.querySelectorAll('[data-action]')].map(node=>[node.dataset.action,node]));
  const viewLabel=buttons.view.querySelector('[data-action-label]'),phaseLabel=buttons['day-night'].querySelector('[data-action-label]');
  let current={},announced='',rendered='',incomeTimer=null,incomeAnimation=null,disposed=false;
  const handlers={axe:()=>{onTool('axe');onChop?.();},house:()=>onTool('house'),rail:()=>onTool('rail'),view:onView,build:onBuild,cancel:onCancel,'rail-build':onRailBuild,'rail-cancel':onCancel,'day-night':onDayNight};
  function activate(event){const button=event.target.closest('button[data-action]');if(button&&!button.disabled)handlers[button.dataset.action]?.();event.stopPropagation();}
  const stop=event=>event.stopPropagation();
  root.addEventListener('click',activate);
  for(const name of ['pointerdown','pointerup','dblclick','keydown','keyup','wheel'])root.addEventListener(name,stop);

  function update(next={}){
    if(disposed)return;
    current={...current,...next};
    const {logs:rawLogs=0,gold:rawGold=0,houses=1,connectedHouses=houses,cityHouses=connectedHouses,tool='axe',walking=true,
      ready=true,canBuild=false,connected=true,reason='',targetTree=false,message='',visible=true,dayPhase='day',nightAmount,railway=null}=current;
    const logs=count(rawLogs),gold=count(rawGold),growth=settlementHudProgress(cityHouses),night=dayPhase==='night';
    const rail=settlementHudRailway(railway,{gold,ready}),railPlanning=tool==='rail'&&!walking;
    const lowLight=Number.isFinite(nightAmount)?nightAmount>=.45:night;
    const signature=JSON.stringify([logs,gold,houses,growth.houses,tool,walking,ready,Boolean(canBuild),Boolean(connected),reason,Boolean(targetTree),message,visible,night,lowLight,rail]);
    if(signature===rendered)return;rendered=signature;
    const building=tool==='house'&&walking;
    root.hidden=!visible;Object.assign(root.dataset,{tool,ready:String(Boolean(ready)),valid:String(Boolean(canBuild)),affordable:String(logs>=10),target:String(Boolean(targetTree)&&walking&&tool==='axe'),phase:night?'night':'day',theme:lowLight?'night':'day'});
    text(nodes.logs,inventoryNumber(logs));text(nodes.gold,inventoryNumber(gold));
    nodes['wood-stock'].title=`${number.format(logs)} logs`;nodes['gold-stock'].title=`${number.format(gold)} gold`;
    nodes['wood-stock'].setAttribute('aria-label',`${logs} logs. Ten logs builds one house.`);
    nodes['gold-stock'].setAttribute('aria-label',`${gold} gold. Your city homes earn one gold each at sunset.`);
    text(nodes.level,String(growth.level));text(nodes['city-label'],growth.level?'City level':'Outpost');
    text(nodes['city-progress'],growth.complete?'Max':`${growth.houses} / ${growth.next}`);
    text(nodes['growth-caption'],growth.complete?'fully grown':growth.level?'next level':'toward city');
    nodes.progress.setAttribute('stroke-dasharray',`${growth.progress} 1`);
    nodes.development.dataset.complete=String(growth.complete);
    const development=growth.complete?`City level 5. ${growth.houses} homes. Maximum level.`:`${growth.level?`City level ${growth.level}`:'Outpost'}. ${growth.houses} of ${growth.next} homes toward ${growth.level?'the next level':'forming a city'}.`;
    nodes.development.setAttribute('aria-label',development);
    text(nodes['day-phase'],night?'Nighttime':'Daytime');text(phaseLabel,night?'Day':'Night');
    const phaseSymbol=night?'moon':'sun';
    if(nodes['phase-symbol'].dataset.kind!==phaseSymbol){nodes['phase-symbol'].innerHTML=symbols[phaseSymbol];nodes['phase-symbol'].dataset.kind=phaseSymbol;}
    buttons['day-night'].setAttribute('aria-label',night?'Skip to day':'Skip to night and collect daily income');
    nodes['build-actions'].hidden=!building;
    text(nodes.placement,connected?'Joins city':'New home');
    nodes.placement.setAttribute('aria-label',connected?'Spend ten logs. Joins a city with a path.':'Spend ten logs. Paths form at three nearby homes.');
    const invalidReason=reason||(logs<10?`${10-logs} more logs needed`:'Choose clear, level ground');
    text(nodes.validity,!ready?'Preparing…':canBuild?'':logs<10?`${10-logs} logs short`:invalidReason.replace(/[.!]$/,''));
    nodes.validity.hidden=ready&&canBuild;
    nodes.validity.dataset.valid=String(Boolean(canBuild));
    nodes['rail-actions'].hidden=!railPlanning;nodes['rail-actions'].dataset.stage=rail.stage;
    text(nodes['rail-cost'],number.format(rail.cost));nodes['rail-cost'].parentElement.setAttribute('aria-label',`${rail.cost} gold`);text(nodes['rail-selection'],rail.selection);text(nodes['rail-status'],rail.status);
    nodes['rail-status'].hidden=!rail.status;
    nodes['rail-status'].dataset.kind=rail.statusKind;
    buttons['rail-build'].hidden=!rail.showConfirm;buttons['rail-build'].disabled=!railPlanning||!rail.canBuild;
    buttons['rail-build'].setAttribute('aria-label',rail.canBuild?`Build railway. Spend ${rail.cost} gold. ${rail.selection}.`:`Cannot build railway. ${rail.status}.`);
    buttons.rail.hidden=walking;buttons.axe.hidden=!walking;buttons.house.hidden=!walking;
    buttons.rail.setAttribute('aria-label',`Plan a railway. Costs ${rail.cost} gold. ${rail.hasCity?'Select one of your cities, then a destination.':'Grow to 3 homes first.'}`);
    buttons.axe.setAttribute('aria-pressed',String(tool==='axe'));buttons.house.setAttribute('aria-pressed',String(building));buttons.rail.setAttribute('aria-pressed',String(railPlanning));
    buttons.house.setAttribute('aria-label',`Place a house. Costs ten logs. ${logs>=10?'Enough logs gathered.':`${10-logs} more logs needed.`}`);
    for(const key of ['axe','house','rail','view','cancel','rail-cancel','day-night'])buttons[key].disabled=!ready;
    buttons.axe.disabled=!ready||!walking;buttons.house.disabled=!ready||!walking;
    buttons.build.disabled=!ready||!canBuild||!building;
    buttons.build.setAttribute('aria-label',canBuild?`Build house. Spend ten logs. ${connected?'Joins a city.':'Paths form at three nearby homes.'}`:`Cannot build here. ${invalidReason}`);
    text(viewLabel,walking?'Overview':'Walk');buttons.view.title=`${walking?'Overview':'Walk'} · V`;buttons.view.setAttribute('aria-label',walking?'Switch to overview':'Return to your traveller');
    const viewIcon=walking?'map':'walk';if(buttons.view.dataset.icon!==viewIcon){buttons.view.querySelector('[data-action-icon]').innerHTML=symbols[viewIcon];buttons.view.dataset.icon=viewIcon;}
    const toggleIcon=night?'sun':'moon';if(buttons['day-night'].dataset.icon!==toggleIcon){buttons['day-night'].querySelector('[data-action-icon]').innerHTML=symbols[toggleIcon];buttons['day-night'].dataset.icon=toggleIcon;}
    buttons['day-night'].title=`${night?'Day':'Night'} · N`;
    nodes.movement.hidden=!walking||building;
    const toolAnnouncement=railPlanning?`Railway selected. ${rail.cost} gold. ${rail.selection}. ${rail.status}. ${rail.showConfirm?'Drag route dots to adjust. Enter confirms the purchase. ':''}Escape cancels.`:building?'House placement selected. Aim at clear ground. Enter places; Escape cancels.':walking?'Axe selected. E or click chops a nearby tree.':'T plans a railway. V returns to your traveller to build houses.';
    const announcement=[ready?`${logs} logs. ${gold} gold.`:'Preparing your clearing.',development,toolAnnouncement,walking?'':'Overview.',message].filter(Boolean).join(' ');
    if(announcement!==announced){text(nodes.announcements,announcement);announced=announcement;}
  }
  function showIncome({amount,days=1}={}){
    const earned=count(amount);if(disposed||!earned)return false;
    clearTimeout(incomeTimer);incomeAnimation?.cancel();
    text(nodes['income-amount'],`+${number.format(earned)}`);
    text(nodes['income-label'],days>1?`${count(days)} days' earnings`:"Day's earnings");
    nodes.income.hidden=false;Object.assign(nodes.income.dataset,{amount:String(earned),days:String(Math.max(1,count(days)))});
    const reducedMotion=parent.ownerDocument?.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    incomeAnimation=nodes.income.animate?.(reducedMotion?[
      {opacity:0,offset:0},{opacity:1,offset:.08},{opacity:1,offset:.84},{opacity:0,offset:1},
    ]:[
      {opacity:0,transform:'translateY(12px)',offset:0},{opacity:1,transform:'translateY(0)',offset:.09},
      {opacity:1,transform:'translateY(0)',offset:.80},{opacity:0,transform:'translateY(-8px)',offset:1},
    ],{duration:4200,easing:'ease-out',fill:'both'});
    incomeTimer=setTimeout(()=>{nodes.income.hidden=true;incomeAnimation?.cancel();incomeAnimation=null;incomeTimer=null;},4200);
    return true;
  }
  update();
  return {root,update,showIncome,dispose(){disposed=true;clearTimeout(incomeTimer);incomeAnimation?.cancel();root.removeEventListener('click',activate);for(const name of ['pointerdown','pointerup','dblclick','keydown','keyup','wheel'])root.removeEventListener(name,stop);root.remove();}};
}
