import {Vector3,MathUtils} from 'three';
import {surfaceFor,surfacePoint,surfaceNormal} from './world-surface.js';
import {resourceIcon} from './resource-icons.js';

const RESOURCES=['resources','food','gold'];
const KINDS=new Set(['pickup','delivery','production','gold','gathered']);
function gainResources(event,signed=false){
  const resources={};
  const valid=amount=>Number.isFinite(amount)&&(signed||amount>0)?amount:0;
  if(event.resources){
    // Historical receipts may still contain separate timber and ore amounts.
    // A canonical balance, when present, is authoritative rather than additive.
    const stock=event.resources;
    const materials=Object.hasOwn(stock,'resources')?valid(stock.resources):valid(stock.wood)+valid(stock.metal);
    if(materials)resources.resources=materials;
    for(const name of ['food','gold'])if(valid(stock[name]))resources[name]=stock[name];
  }else{
    const name=event.resource==='wood'||event.resource==='metal'?'resources':event.resource;
    if(RESOURCES.includes(name)&&valid(event.amount))resources[name]=event.amount;
  }
  return resources;
}

function quantityLabel(item,amount){return item.kind==='production'?`${amount<0?'−':'+'}${Math.abs(amount)}`:item.kind==='gathered'||amount===1?'':String(amount);}
function receiptWidth(item){
  let width=0,count=0;
  for(const resource of RESOURCES)if(item.resources[resource]){const label=quantityLabel(item,item.resources[resource]);width+=20+(label?3+label.length*8:0);count++;}
  return width+Math.max(0,count-1)*7;
}

/** Bounded, authoritative feedback. IDs are optional, but an event with an ID
 * cannot create a second gain while retained in the recent-event window. The
 * queue never changes wallet balances or derives income from visual motion. */
export function createResourceGainQueue({maxActive=24,duration=2.8,mergeWindow=.45,mergeDistance=2.8,maxRemembered=512}={}){
  maxActive=Math.max(1,Math.min(64,Math.floor(maxActive)||24));duration=Number.isFinite(duration)?Math.max(.1,duration):2.8;
  maxRemembered=Math.max(1,Math.min(4096,Math.floor(maxRemembered)||512));mergeWindow=Number.isFinite(mergeWindow)?Math.max(0,mergeWindow):.45;mergeDistance=Number.isFinite(mergeDistance)?Math.max(0,mergeDistance):2.8;
  const active=[],seen=new Map();let clock=0,serial=0;
  function emit(event){
    if(!event||!Number.isFinite(event.x)||!Number.isFinite(event.z)||event.y!==undefined&&!Number.isFinite(event.y))return null;
    const kind=KINDS.has(event.kind)?event.kind:KINDS.has(event.type)?event.type:'production';
    const resources=gainResources(event,kind==='production');
    if(!Object.keys(resources).length)return null;
    const dedupe=event.id==null?null:`${event.ownerId??''}:${kind}:${event.id}`;
    if(dedupe&&seen.has(dedupe))return null;
    if(dedupe){seen.set(dedupe,clock);while(seen.size>maxRemembered)seen.delete(seen.keys().next().value);}
    let item=active.find(item=>item.kind===kind&&item.ownerId===event.ownerId&&clock-item.born<=mergeWindow&&Math.hypot(item.x-event.x,item.z-event.z)<=mergeDistance);
    if(item){for(const resource of RESOURCES)if(resources[resource]){item.resources[resource]=(item.resources[resource]??0)+resources[resource];if(!item.resources[resource])delete item.resources[resource];}if(!Object.keys(item.resources).length){active.splice(active.indexOf(item),1);return null;}item.version++;return item;}
    if(active.length>=maxActive)active.shift();
    item={serial:++serial,version:0,kind,ownerId:event.ownerId,x:event.x,y:event.y??0,z:event.z,resources,born:clock,age:0,duration};active.push(item);return item;
  }
  return{emit,update(dt){clock+=Math.max(0,Number.isFinite(dt)?dt:0);for(let i=active.length-1;i>=0;i--){active[i].age=clock-active[i].born;if(active[i].age>=duration)active.splice(i,1);}},
    get active(){return active;},get elapsed(){return clock;},get capacity(){return maxActive;},get remembered(){return seen.size;},
    clear(){active.length=0;},dispose(){active.length=0;seen.clear();}};
}

/** Small resource symbols anchored to the same planar/spherical surface
 * as the world. One reusable DOM pool serves both strategy render layers;
 * third-person events keep aging and cannot replay when zooming back out. */
export function createResourceGainEffects(world,{parent,document:doc=globalThis.document,...settings}={}){
  const queue=createResourceGainQueue(settings),pool=[],point=new Vector3(),normal=new Vector3(),eye=new Vector3();
  const root=doc?.createElement('div');let disposed=false,visibleCount=0;
  if(root){root.className='resource-gains';root.setAttribute('aria-hidden','true');(parent??doc.body).appendChild(root);}
  function slot(index){
    if(pool[index])return pool[index];
    const element=doc.createElement('div'),row=doc.createElement('span');element.className='resource-gain';row.className='resource-gain-values';element.appendChild(row);root.appendChild(element);
    const values={};for(const resource of RESOURCES){const value=doc.createElement('span'),icon=doc.createElement('span'),amount=doc.createElement('b');value.className='resource-gain-value';value.dataset.resource=resource;icon.className='resource-gain-icon';icon.innerHTML=resourceIcon(resource);value.append(icon,amount);row.appendChild(value);values[resource]={value,amount};}
    return pool[index]={element,values,serial:null,version:null,width:0};
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
          if(entry.serial!==item.serial||entry.version!==item.version){
            entry.serial=item.serial;entry.version=item.version;entry.element.dataset.kind=item.kind;entry.width=receiptWidth(item);
            for(const resource of RESOURCES){const amount=item.resources[resource]??0,label=quantityLabel(item,amount);entry.values[resource].value.hidden=!amount;entry.values[resource].value.dataset.negative=String(amount<0);entry.values[resource].amount.hidden=!label;entry.values[resource].amount.textContent=label;}
          }
          // Reserve the complete icon row. Every upward move clears one prior
          // row permanently; no DOM layout reads or new nodes are needed.
          const left=x-entry.width/2,right=x+entry.width/2,height=20,gap=7;
          for(let pass=0;pass<screenPositions.length;pass++){
            const overlap=screenPositions.find(previous=>left<previous.right+gap&&right>previous.left-gap&&y-height<previous.bottom+gap&&y>previous.top-gap);
            if(!overlap)break;y=overlap.top-gap;
          }
          screenPositions.push({left,right,top:y-height,bottom:y});
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
