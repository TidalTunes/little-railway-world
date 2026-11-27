import './economy-hud.css';

const names={lumber:'Timber yard',farm:'Market gardens',workshop:'Tool workshop'};
const goods=['timber','grain','tools'];
const icons={timber:'▰',grain:'✦',tools:'⚒'};
const write=(node,value)=>{if(node.textContent!==String(value))node.textContent=value;};

/** A single contextual depot inspector. It never advances economic state. */
export function createEconomyHud({parent,ownerId,onIndustry,onDeposit}){
  const root=document.createElement('aside');root.className='economy-hud';root.setAttribute('aria-label','Town economy');
  root.innerHTML=`<div class="economy-guidance"><span class="economy-eyebrow">YOUR FIRST TRADE</span><p data-economy="guide"></p></div>
    <section data-economy="depot" hidden>
      <div class="economy-heading"><span class="economy-eyebrow" data-economy="owner"></span><strong data-economy="title"></strong><span data-economy="income"></span></div>
      <div class="economy-stocks">${goods.map(g=>`<div class="economy-stock economy-${g}"><span aria-hidden="true">${icons[g]}</span><strong data-economy="${g}">0</strong><span>${g}</span><small data-economy="${g}-incoming"></small></div>`).join('')}</div>
      <button type="button" class="economy-deposit" data-economy="deposit" aria-keyshortcuts="G" hidden></button><p class="economy-flow" data-economy="flow"></p>
      <div class="economy-industries" role="group" aria-label="Town specialization">${Object.keys(names).map((name,i)=>`<button type="button" data-industry="${name}" aria-keyshortcuts="${i+1}"><kbd>${i+1}</kbd>${names[name]}</button>`).join('')}</div>
      <p class="economy-caption" data-economy="change"></p>
    </section>
    <p class="economy-feedback" data-economy="feedback" role="status" hidden></p>
    <div class="economy-trade"><span class="economy-trade-dot"></span><span data-economy="trade">Rail connects producers to buyers</span></div>`;
  parent.append(root);
  const nodes=Object.fromEntries([...root.querySelectorAll('[data-economy]')].map(el=>[el.dataset.economy,el]));
  let currentCity=null,lastKey='',lastTrade='',tradeUntil=0;
  const choose=event=>{if(event.target.closest('.economy-deposit')){onDeposit();event.stopPropagation();return;}const button=event.target.closest('[data-industry]');if(button&&!button.disabled&&currentCity)onIndustry(currentCity.id,button.dataset.industry);event.stopPropagation();};
  const stop=event=>event.stopPropagation();root.addEventListener('click',choose);
  for(const name of ['pointerdown','pointerup','dblclick','wheel','keydown','keyup'])root.addEventListener(name,stop);
  return {root,
    update({city,houses=1,walking=true,tool='axe',night=0,time=0,nextPulse=20,delivered=0,carried=0,localCityId=null,stationCount=0,events=[],feedback=''}={}){
      currentCity=city;
      for(const event of events)if(event.type==='delivery'&&(event.buyerOwnerId===ownerId||event.sellerOwnerId===ownerId)){
        lastTrade=event.buyerOwnerId===ownerId?`Arrived · ${event.quantity} ${event.resource}${event.payment?` for ${event.payment} gold`:''}`:`Sold ${event.quantity} ${event.resource} · +${event.payment} gold`;tradeUntil=time+8;
      }
      const countdown=Math.max(1,Math.ceil(nextPulse-time)),own=city?.ownerId===ownerId;
      const key=JSON.stringify([city,houses,walking,tool,night>.45,countdown,delivered,carried,localCityId,stationCount,time<tradeUntil,feedback]);if(key===lastKey)return;lastKey=key;
      root.dataset.theme=night>.45?'night':'day';root.dataset.walking=String(walking);root.dataset.tool=tool;
      nodes.feedback.hidden=!feedback;write(nodes.feedback,feedback);
      nodes.depot.hidden=!city;
      write(nodes.guide,houses<3?'Chop a tree. Build two nearby homes to found your town.':!stationCount?'Connect a farm for food. Fed homes earn gold; imported tools let your town grow.': 'Food earns income. Tools enable growth. Trade with a town producing what yours needs.');
      root.querySelector('.economy-guidance').hidden=houses>=3&&!!city;
      if(city){
        write(nodes.owner,own?'YOUR TOWN':city.neutral?'FARMING VILLAGE':'TRADING PARTNER');
        write(nodes.title,names[city.industry]);
        write(nodes.income,`+${city.income} gold / 20s`);
        for(const good of goods){write(nodes[good],city.stock[good]);write(nodes[`${good}-incoming`],city.incoming[good]?`+${city.incoming[good]} en route`:'');}
        const output=city.industry==='lumber'?'timber':city.industry==='farm'?'grain':'tools';
        const food=Math.ceil(city.houseCount/3);
        write(nodes.flow,`${city.industry==='workshop'?'Timber → ':''}+${Math.floor(city.rates[output])} ${output} · ${food} grain feeds ${city.houseCount} homes · next ${countdown}s`);
        const buttons=root.querySelectorAll('[data-industry]');
        for(const button of buttons){button.hidden=!own;button.setAttribute('aria-pressed',String(button.dataset.industry===city.industry));button.disabled=city.industryCooldown>0&&button.dataset.industry!==city.industry;}
        const depositAmount=Math.min(carried,Math.max(0,city.capacity-city.stock.timber-city.incoming.timber));
        nodes.deposit.hidden=!own||!walking||carried===0;nodes.deposit.disabled=localCityId!==city.id||!depositAmount;write(nodes.deposit,depositAmount?`G · Store ${depositAmount} carried timber`:'Timber depot full');
        write(nodes.change,own?`${city.fed?'Homes fed':'Awaiting grain'} · ${city.boosted?'Tools boost output and income':'Spare tools boost output and fed-home income'}${city.industryCooldown?` · change in ${Math.ceil(city.industryCooldown)}s`:city.canChooseIndustry?' · first change free':` · change costs ${city.industryCost} timber`}`:'Automatic trade · timber 1 · grain 1 · tools 3 gold');
        nodes['timber'].parentElement.title=own?`${carried} timber carried; ${city.stock.timber} in this depot. Nearby construction can use both.`:'Local depot stock';
      }
      write(nodes.trade,time<tradeUntil?lastTrade:delivered?`${delivered} deliveries · trains find buyers automatically`:'Rail connects producers to buyers');
      root.querySelector('.economy-trade-dot').dataset.active=String(time<tradeUntil);
    },
    dispose(){root.removeEventListener('click',choose);for(const name of ['pointerdown','pointerup','dblclick','wheel','keydown','keyup'])root.removeEventListener(name,stop);root.remove();}
  };
}
