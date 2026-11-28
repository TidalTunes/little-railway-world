import {MILITARY_RULES} from './military-simulation.js';

const write=(node,value)=>{if(node.textContent!==String(value))node.textContent=String(value);};
const names={soldier:'Infantry',tank:'Tank',artillery:'Artillery',helicopter:'Helicopter'};

/** Role decisions and body handoffs are explicit actions, separate from camera
 * movement. Only eligible, unoccupied bodies enter the deployment roster. */
export function createMatchHud({parent,player,team,onPossess,onRole,onInvitation,onView,onCursor,onResume}){
  const doc=parent.ownerDocument,root=doc.createElement('aside');root.className='match-hud';
  root.setAttribute('aria-label','Team and field command');
  root.innerHTML=`<div class="match-banner"><i aria-hidden="true">◆</i><span data-match="team"></span><span class="match-role" data-match="role"></span></div>
    <div class="match-body" data-match="body"><span class="match-body-name" data-match="body-name"></span><span class="match-health"><i data-match="health"></i></span>
      <button data-action="picker" title="Choose a unit · Q"><kbd>Q</kbd> Switch unit</button><button data-action="view"><kbd>V</kbd><span data-match="view-label">Map</span></button></div>
    <div class="match-capture" data-match="capture" hidden><span data-match="capture-label"></span><div><i data-match="capture-progress"></i></div></div>
    <div class="match-crosshair" data-match="crosshair" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    <section class="match-picker" data-match="picker" aria-label="Choose a unit" hidden>
      <header><span><small>DEPLOYMENT</small><strong data-match="picker-title">Your units</strong></span><button data-action="close-picker" aria-label="Close unit selection">×</button></header>
      <div class="match-filters" data-match="filters"><button data-filter="all" aria-pressed="true">All</button>${Object.entries(names).map(([id,name])=>`<button data-filter="${id}" aria-pressed="false">${name}</button>`).join('')}</div>
      <div class="match-roster" data-match="roster"></div><p data-match="empty" hidden>No available units</p>
      <footer><button data-action="previous">‹</button><span data-match="page"></span><button data-action="next">›</button></footer>
    </section>
    <section class="match-decision" data-match="decision" role="dialog" aria-label="City command" hidden>
      <small data-match="decision-label">CITY FOUNDED</small><div class="match-wheel" data-match="wheel"><span data-match="winner"></span></div>
      <h2 data-match="decision-title"></h2><p data-match="decision-copy"></p><div class="match-decision-actions" data-match="decision-actions"></div>
    </section><p class="match-notice" data-match="notice" role="status" hidden></p>`;
  parent.append(root);
  const nodes=Object.fromEntries([...root.querySelectorAll('[data-match]')].map(node=>[node.dataset.match,node]));
  write(nodes.team,team?.name??'Your team');
  let state={},open=false,filter='all',page=0,rosterKey='',noticeTime=0,decision=null,decisionTime=0,queue=[],portraits={},winner=null,disposed=false;
  const participant=id=>state.players?.find(p=>p.id===id)?.name??id;
  function togglePicker(value=!open){const wasOpen=open;open=value;nodes.picker.hidden=!open;rosterKey='';if(open){page=0;onCursor?.();}else if(wasOpen)onResume?.();renderRoster();}
  function renderRoster(){
    if(!open)return;
    const choices=(state.eligible??[]).filter(unit=>filter==='all'||unit.kind===filter),pages=Math.max(1,Math.ceil(choices.length/24));page=Math.max(0,Math.min(page,pages-1));
    const shown=choices.slice(page*24,page*24+24),key=shown.map(unit=>`${unit.id}:${Math.ceil(unit.hp)}:${unit.id===state.unit?.id}`).join('|')+`:${page}:${pages}:${filter}`;
    if(key===rosterKey)return;rosterKey=key;nodes.roster.replaceChildren();
    for(const unit of shown){
      const button=doc.createElement('button');button.className='match-unit';button.dataset.unit=unit.id;button.setAttribute('aria-pressed',String(unit.id===state.unit?.id));
      if(portraits[unit.kind]){const image=doc.createElement('img');image.src=portraits[unit.kind];image.alt='';button.append(image);}
      const copy=doc.createElement('span'),title=doc.createElement('strong'),owner=doc.createElement('small');write(title,names[unit.kind]);write(owner,participant(unit.ownerId));copy.append(title,owner);button.append(copy);
      const hp=doc.createElement('span');hp.className='match-unit-health';write(hp,`${Math.ceil(unit.hp)}/${unit.maxHp??MILITARY_RULES[unit.kind]?.health??unit.hp}`);button.append(hp);nodes.roster.append(button);
    }
    write(nodes.page,`${choices.length} available · ${page+1} / ${pages}`);nodes.empty.hidden=!!choices.length;
    root.querySelector('[data-action="previous"]').disabled=page===0;root.querySelector('[data-action="next"]').disabled=page===pages-1;
  }
  function dismiss(){decision=null;nodes.decision.hidden=true;onResume?.();}
  function startDecision(event){
    decision=event;decisionTime=0;nodes.decision.hidden=false;nodes['decision-actions'].replaceChildren();onCursor?.();
    const lottery=event.type==='city-founded';nodes.wheel.hidden=!lottery;
    write(nodes['decision-label'],lottery?'CITY FOUNDED':event.type==='city-award-offered'?'CITY CAPTURED':'FIELD COMMAND');
    if(lottery){nodes.wheel.dataset.spinning='true';write(nodes['decision-title'],'Choosing a city commander');write(nodes['decision-copy'],'Every founding player has an equal chance.');}
    else finishDecision();
  }
  function action(label,id,primary=false){const button=doc.createElement('button');button.dataset.decision=id;button.className=primary?'match-primary':'';write(button,label);nodes['decision-actions'].append(button);}
  function finishDecision(){
    if(!decision)return;nodes.wheel.dataset.spinning='false';
    const winner=decision.winnerId??decision.ownerId,own=winner===player.id;
    if(decision.type==='city-founded'){
      write(nodes.winner,participant(winner));write(nodes['decision-title'],own?'Your city, your command':`${participant(winner)} takes command`);
      write(nodes['decision-copy'],own?'You can now develop this city and command its army.':'Join the field permanently and control allied units, or remain a founder and build elsewhere.');
      if(own)action('Continue','dismiss',true);else{action('Join the field','tps',true);action('Keep founding','dismiss');}
    }else if(decision.type==='city-award-offered'){
      write(nodes['decision-title'],'A city needs a commander');write(nodes['decision-copy'],'Accept this captured city to regain strategy view and manage its economy.');action('Take command','accept',true);action('Stay in the field','decline');
    }else{
      write(nodes['decision-title'],'Join this city’s field forces?');write(nodes['decision-copy'],`Your house belongs to ${participant(decision.ownerId)}. Field players can control any available allied unit. Only capturing a city restores strategy command.`);action('Join the field','tps',true);action('Keep founding','dismiss');
    }
  }
  function click(event){
    event.stopPropagation();const button=event.target.closest('button');if(!button||button.disabled)return;
    if(button.dataset.unit){togglePicker(false);const result=onPossess?.(button.dataset.unit);if(result?.ok===false)togglePicker(true);return;}
    if(button.dataset.filter){filter=button.dataset.filter;page=0;for(const b of nodes.filters.children)b.setAttribute('aria-pressed',String(b===button));renderRoster();return;}
    if(button.dataset.decision){
      const action=button.dataset.decision,event=decision;dismiss();
      if(action==='tps')onRole?.('tps');if(action==='accept'||action==='decline')onInvitation?.(event,action==='accept');return;
    }
    const action=button.dataset.action;if(action==='picker')togglePicker();else if(action==='close-picker')togglePicker(false);else if(action==='view')onView?.();else if(action==='previous'){page--;renderRoster();}else if(action==='next'){page++;renderRoster();}
  }
  root.addEventListener('click',click);const stop=event=>event.stopPropagation();for(const name of ['pointerdown','pointerup','wheel','keydown','keyup'])root.addEventListener(name,stop);
  return {root,togglePicker,get modal(){return open||!!decision;},get pickerOpen(){return open;},
    setPortraits(value){portraits=value;rosterKey='';},
    notice(message){write(nodes.notice,message);noticeTime=3;nodes.notice.hidden=false;},
    event(event){if(event.type==='match-won')winner=event.teamName??event.teamId;if(event.type==='city-founded'&&event.candidates?.includes(player.id)||event.type==='city-invitation'&&event.playerId===player.id||event.type==='city-award-offered'&&(event.toPlayerId??event.playerId)===player.id)queue.push(event);},
    close(){togglePicker(false);},
    update(dt,next){
      if(disposed)return;state=next;const tps=next.role==='tps',unit=next.unit;
      if(next.invitationIds){
        const active=new Set(next.invitationIds),valid=event=>event.type!=='city-award-offered'||active.has(event.invitation?.id??event.invitationId??event.id);
        queue=queue.filter(valid);if(decision&&!valid(decision))dismiss();
      }
      root.dataset.role=tps?'tps':'hybrid';root.dataset.walking=String(!!next.walking);
      write(nodes.role,winner?'VICTORY':tps?'FIELD':'COMMAND');if(winner)write(nodes.team,`${winner} controls the world`);
      const capture=next.capture;nodes.capture.hidden=!capture;
      if(capture){write(nodes['capture-label'],`${capture.contested?'Contested':'Capturing'} · ${capture.name??'Enemy city'}`);nodes['capture-progress'].style.width=`${Math.min(1,capture.progress)*100}%`;}
      write(nodes['body-name'],unit?names[unit.kind]:'Choose a unit');
      nodes.health.style.width=`${Math.max(0,Math.min(1,(unit?.hp??0)/(unit?.maxHp??MILITARY_RULES[unit?.kind]?.health??1)))*100}%`;
      write(nodes['view-label'],tps?'Deploy':next.walking?'Map':'Control');write(nodes['picker-title'],tps?'Allied units':'Your units');
      nodes.crosshair.hidden=!next.walking||next.building||!unit||open||!!decision;
      if(noticeTime>0){noticeTime-=dt;if(noticeTime<=0)nodes.notice.hidden=true;}
      if(!decision&&queue.length)startDecision(queue.shift());
      if(decision?.type==='city-founded'&&decisionTime<2.4){decisionTime+=dt;const candidates=decision.candidates??[];write(nodes.winner,participant(candidates[Math.floor(decisionTime*12)%candidates.length]));if(decisionTime>=2.4)finishDecision();}
      renderRoster();
    },
    dispose(){disposed=true;root.removeEventListener('click',click);for(const name of ['pointerdown','pointerup','wheel','keydown','keyup'])root.removeEventListener(name,stop);root.remove();},
  };
}
