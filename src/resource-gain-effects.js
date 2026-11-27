import {Vector3,MathUtils} from 'three';
import {surfaceFor,surfacePoint,surfaceNormal} from './world-surface.js';

const RESOURCES=['wood','metal','food','gold'];
const KINDS=new Set(['pickup','delivery','production','gold','gathered']);
const CAPTIONS={pickup:'On board',delivery:'',production:'',gold:'',gathered:'Gathered'};
const ICONS={
  wood:'<path fill="#a97145" d="m4 8 9-5 8 5v9l-9 5-8-5z"/><path fill="#dcac75" d="m4 8 8 5 9-5-8-5z"/><path fill="#ba8755" d="m12 13 9-5v9l-9 5z"/><path fill="none" stroke="#f5d4a5" stroke-width="1.4" d="m8 6 8 5v9"/>',
  metal:'<path fill="#8caeb7" d="m5 6 11-2 6 10-7 7-12-3z"/><path fill="#c3d7d8" d="m5 6 11-2-3 10-10 4z"/><path fill="#597d88" d="m13 14 9 0-7 7-12-3z"/>',
  food:'<path fill="none" stroke="#f3cc70" stroke-width="1.6" stroke-linecap="round" d="M12 21V5"/><path fill="#f3cc70" d="M12 8C7 8 6 5 7 3c4 0 5 2 5 5Zm0 5C7 13 5 10 6 8c4 0 6 2 6 5Zm0 5c-5 0-7-3-6-5 4 0 6 2 6 5Zm0-8c0-5 2-7 5-7 1 3-1 6-5 7Zm0 5c0-5 3-7 6-7 1 3-1 6-6 7Zm0 5c0-5 3-7 6-7 1 3-1 6-6 7Z"/>',
  gold:'<path fill="#c18c34" d="m8 2 9 1 5 7-2 9-8 4-9-5-1-9z"/><path fill="#f4cd67" d="m8 4 8 1 4 6-2 7-6 3-7-4-1-7z"/><path fill="none" stroke="#9c722e" stroke-width="2" stroke-linecap="round" d="M12 8v9"/>',
};

/** Bounded, authoritative feedback. IDs are optional, but an event with an ID
 * cannot create a second gain while retained in the recent-event window. The
 * queue never changes wallet balances or derives income from visual motion. */
export function createResourceGainQueue({maxActive=24,duration=2.8,mergeWindow=.45,mergeDistance=2.8,maxRemembered=512}={}){
  maxActive=Math.max(1,Math.min(64,Math.floor(maxActive)||24));duration=Number.isFinite(duration)?Math.max(.1,duration):2.8;
  maxRemembered=Math.max(1,Math.min(4096,Math.floor(maxRemembered)||512));mergeWindow=Number.isFinite(mergeWindow)?Math.max(0,mergeWindow):.45;mergeDistance=Number.isFinite(mergeDistance)?Math.max(0,mergeDistance):2.8;
  const active=[],seen=new Map();let clock=0,serial=0;
  function emit(event){
    if(!event||!Number.isFinite(event.x)||!Number.isFinite(event.z)||event.y!==undefined&&!Number.isFinite(event.y))return null;
    const resources={};for(const resource of RESOURCES){const amount=event.resources?.[resource]??(event.resource===resource?event.amount:0);if(Number.isFinite(amount)&&amount>0)resources[resource]=amount;}
    if(!Object.keys(resources).length)return null;
    const kind=KINDS.has(event.kind)?event.kind:KINDS.has(event.type)?event.type:'production';
    const dedupe=event.id==null?null:`${event.ownerId??''}:${kind}:${event.id}`;
    if(dedupe&&seen.has(dedupe))return null;
    if(dedupe){seen.set(dedupe,clock);while(seen.size>maxRemembered)seen.delete(seen.keys().next().value);}
    let item=active.find(item=>item.kind===kind&&item.ownerId===event.ownerId&&clock-item.born<=mergeWindow&&Math.hypot(item.x-event.x,item.z-event.z)<=mergeDistance);
    if(item){for(const resource of RESOURCES)if(resources[resource])item.resources[resource]=(item.resources[resource]??0)+resources[resource];item.version++;return item;}
    if(active.length>=maxActive)active.shift();
    item={serial:++serial,version:0,kind,ownerId:event.ownerId,x:event.x,y:event.y??0,z:event.z,resources,born:clock,age:0,duration};active.push(item);return item;
  }
  return{emit,update(dt){clock+=Math.max(0,Number.isFinite(dt)?dt:0);for(let i=active.length-1;i>=0;i--){active[i].age=clock-active[i].born;if(active[i].age>=duration)active.splice(i,1);}},
    get active(){return active;},get elapsed(){return clock;},get capacity(){return maxActive;},get remembered(){return seen.size;},
    clear(){active.length=0;},dispose(){active.length=0;seen.clear();}};
}

/** Screen-sized enamel receipts anchored to the same planar/spherical surface
 * as the world. One reusable DOM pool serves both strategy render layers;
 * third-person events keep aging and cannot replay when zooming back out. */
export function createResourceGainEffects(world,{parent,document:doc=globalThis.document,...settings}={}){
  const queue=createResourceGainQueue(settings),pool=[],point=new Vector3(),normal=new Vector3(),eye=new Vector3();
  const root=doc?.createElement('div');let disposed=false,visibleCount=0;
  if(root){root.className='resource-gains';root.setAttribute('aria-hidden','true');(parent??doc.body).appendChild(root);}
  function slot(index){
    if(pool[index])return pool[index];
    const element=doc.createElement('div'),caption=doc.createElement('span'),row=doc.createElement('span');element.className='resource-gain';caption.className='resource-gain-caption';row.className='resource-gain-values';element.append(caption,row);root.appendChild(element);
    const values={};for(const resource of RESOURCES){const value=doc.createElement('span'),icon=doc.createElement('span'),amount=doc.createElement('b');value.className='resource-gain-value';value.dataset.resource=resource;icon.className='resource-gain-icon';icon.innerHTML=`<svg viewBox="0 0 24 24" focusable="false">${ICONS[resource]}</svg>`;value.append(icon,amount);row.appendChild(value);values[resource]={value,amount};}
    return pool[index]={element,caption,values,serial:null,version:null};
  }
  return{
    emit(event){return disposed?null:queue.emit(event);},
    update(dt,{camera,viewport,viewportWidth=globalThis.innerWidth??800,viewportHeight=globalThis.innerHeight??600,mapBlend=0,walkingWeight=0,reducedMotion=false}={}){
      if(disposed)return;queue.update(dt);visibleCount=0;
      const bounds=viewport??{left:0,top:0,width:viewportWidth,height:viewportHeight};
      if(root&&camera&&walkingWeight<.8&&bounds.width>0&&bounds.height>0){
        camera.updateMatrixWorld(true);const fade=1-MathUtils.smoothstep(walkingWeight,.1,.8),screenPositions=[];
        for(const item of queue.active){
          surfacePoint(world,item.x,item.y+MathUtils.lerp(1.8,.7,mapBlend),item.z,point);
          if(surfaceFor(world)){surfaceNormal(world,item.x,item.z,normal);if(normal.dot(eye.copy(camera.position).sub(point))<=0)continue;}
          point.project(camera);if(point.z< -1||point.z>1||Math.abs(point.x)>1||Math.abs(point.y)>1)continue;
          const entry=slot(visibleCount++),t=item.age/item.duration,rise=reducedMotion?0:24*(1-(1-t)**3);
          const x=(point.x+1)*bounds.width/2+(bounds.left??0);let y=(1-point.y)*bounds.height/2+(bounds.top??0)-18-rise;
          // Simultaneous cargo and owner-gold receipts remain legible. A fixed
          // bounded collision pass avoids DOM layout reads in the frame loop.
          for(const previous of screenPositions)if(Math.abs(previous.x-x)<100&&Math.abs(previous.y-y)<34)y=previous.y-34;
          screenPositions.push({x,y});
          if(entry.serial!==item.serial||entry.version!==item.version){
            entry.serial=item.serial;entry.version=item.version;entry.element.dataset.kind=item.kind;entry.caption.textContent=CAPTIONS[item.kind];entry.caption.hidden=!CAPTIONS[item.kind];
            for(const resource of RESOURCES){const amount=item.resources[resource]??0;entry.values[resource].value.hidden=!amount;if(amount)entry.values[resource].amount.textContent=`+${amount}`;}
          }
          entry.element.hidden=false;entry.element.style.transform=`translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) translate(-50%,-100%)`;
          entry.element.style.opacity=String(Math.max(0,Math.min(1,item.age/.1,(item.duration-item.age)/.65))*fade);
        }
      }
      for(let i=visibleCount;i<pool.length;i++)pool[i].element.hidden=true;
    },
    get active(){return queue.active.length>0;},get visibleCount(){return visibleCount;},get stats(){return{active:queue.active.length,visible:visibleCount,allocated:pool.length,remembered:queue.remembered};},
    dispose(){if(disposed)return;disposed=true;root?.remove();pool.length=0;queue.dispose();visibleCount=0;},
  };
}
