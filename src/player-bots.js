import {SETTLEMENT,settlementTreeId} from './settlement-game.js';
import {worldSurface} from './world-model.js';

export const PLAYER_BOT=Object.freeze({speed:2.3,targetHouses:15,swingDuration:.58,swingImpact:.22,
  constructionTime:2,decisionInterval:.16,radius:.17,searchRadius:38,navigationStep:.65,maxRouteNodes:1100,routeNodeBudget:12});
const tau=Math.PI*2;
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const wrap=value=>Math.atan2(Math.sin(value),Math.cos(value));
const solidKinds=new Set(['house','civic','apartment','tower','station','landmark','tree','rock','farm','cactus']);
const finite=point=>Number.isFinite(point?.x)&&Number.isFinite(point?.z);
function hash(value){let n=2166136261;for(const char of String(value)){n^=char.charCodeAt(0);n=Math.imul(n,16777619);}return(n>>>0)/4294967296;}

class Queue{
  items=[];
  push(item){const a=this.items;a.push(item);let i=a.length-1;while(i){const p=(i-1)>>1;if(a[p].score<=item.score)break;a[i]=a[p];i=p;}a[i]=item;}
  pop(){const a=this.items,result=a[0],last=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let child=i*2+1;if(child+1<a.length&&a[child+1].score<a[child].score)child++;if(a[child].score>=last.score)break;a[i]=a[child];i=child;}a[i]=last;}return result;}
  get length(){return this.items.length;}
}

/** A bounded, renderer-independent traveller. The rules own every tree reward,
 * house, road and milestone; the bot only chooses inputs and walks to them.
 * Its CPU scenery catalogue remains available when no camera is nearby. */
export function createPlayerBot(world,game,{config,getPlacements=()=>world.gameplay?.botScenery??[],
  getRevision=()=>game.revision,onChop=()=>{},onBuild=()=>{},surfaceAt=(x,z)=>worldSurface(world,x,z)}={}){
  if(!finite(config?.spawn)||!finite(config?.starterHouse))throw new TypeError('Player bot requires a spawn and starting house');
  const position={x:config.spawn.x,y:surfaceAt(config.spawn.x,config.spawn.z).height+.035,z:config.spawn.z};
  const anchor=config.starterHouse,phase=hash(`${world.seed}:${config.id}`)*tau,terrainCache=new Map();
  let heading=config.spawn.heading??0,speed=0,gait=0,swingTime=0,state='thinking',cooldown=hash(config.id)*.4;
  let revision=null,placements=[],obstacles=new Map(),route=[],routeIndex=0,job=null,impact=false,stopped=false;
  let siteIndex=0,sites=[],clearingTree=null,treeChoices=[],treeIndex=0,chosenRevision=null,planner=null;
  let constructionTime=0,elapsed=0,statusRevision=-1,houseCount=1,level=0;
  function updateStatus(){if(statusRevision!==game.revision){statusRevision=game.revision;houseCount=game.houses.length;level=game.cities[0]?.level??0;}}
  const stats={distance:0,trees:0,logsEarned:0,houses:0,routeSearches:0,routeNodes:0,siteChecks:0,blocked:0};

  function refresh(){
    const next=getRevision();if(next===revision)return;
    revision=next;
    // Most of the world's trees are irrelevant to this town. Keep one small,
    // stable source array per world mutation, including any foreign buildings.
    const seen=new Set();placements=[];
    for(const item of [...getPlacements(),...game.houses,...game.buildings]){
      if(!finite(item)||distance(item,anchor)>PLAYER_BOT.searchRadius+14)continue;
      const key=item.id??item;if(seen.has(key))continue;seen.add(key);placements.push(item);
    }
    obstacles=new Map();
    for(const item of placements){
      if(!(solidKinds.has(item.kind)||item.kind==='nature'&&item.style==='outcrop')||item.kind==='tree'&&game.isTreeRemoved(item))continue;
      const scale=item.scale??1,circle=item.kind==='tree'||['rock','cactus','nature'].includes(item.kind);
      const radius=(item.kind==='tree'?.14*scale:item.kind==='rock'?.59*scale:item.kind==='cactus'?.31*scale:item.radius??1);
      const halfWidth=(item.width??(item.kind==='house'?2.2:3.5))*scale/2,halfDepth=(item.depth??(item.kind==='house'?2.2:3.5))*scale/2;
      const bound=(circle?radius:Math.hypot(halfWidth,halfDepth))+PLAYER_BOT.radius+.04;
      const shape={x:item.x,z:item.z,circle,radius,halfWidth,halfDepth,c:Math.cos(item.rotation??0),s:Math.sin(item.rotation??0)};
      for(let x=Math.floor((item.x-bound)/3);x<=Math.floor((item.x+bound)/3);x++)for(let z=Math.floor((item.z-bound)/3);z<=Math.floor((item.z+bound)/3);z++){
        const key=`${x}:${z}`;if(!obstacles.has(key))obstacles.set(key,[]);obstacles.get(key).push(shape);
      }
    }
    treeChoices=[];treeIndex=0;siteIndex=0;clearingTree=null;chosenRevision=null;
  }
  function ground(point){
    // Navigation and feet use the same surface source. Cache only exact rounded
    // samples; water and steep terrain never become assumed flat ground.
    const key=`${Math.round(point.x*10000)}:${Math.round(point.z*10000)}`;
    if(!terrainCache.has(key)){if(terrainCache.size>32000)terrainCache.clear();terrainCache.set(key,surfaceAt(point.x,point.z));}
    return terrainCache.get(key);
  }
  function clear(point,padding=.035){
    const center=ground(point);if(!center||!Number.isFinite(center.height)||!['ground','mountain'].includes(center.type))return false;
    for(const [dx,dz]of [[.17,0],[-.17,0],[0,.17],[0,-.17]]){
      const edge=ground({x:point.x+dx,z:point.z+dz});
      if(!edge||!['ground','mountain'].includes(edge.type)||Math.abs(edge.height-center.height)>.17*.65)return false;
    }
    for(const item of obstacles.get(`${Math.floor(point.x/3)}:${Math.floor(point.z/3)}`)??[]){
      const dx=point.x-item.x,dz=point.z-item.z;
      if(item.circle){
        const radius=item.radius+PLAYER_BOT.radius+padding;
        if(dx*dx+dz*dz<radius*radius)return false;
      }else{
        const x=dx*item.c-dz*item.s,z=dx*item.s+dz*item.c;
        if(Math.abs(x)<item.halfWidth+PLAYER_BOT.radius+padding&&Math.abs(z)<item.halfDepth+PLAYER_BOT.radius+padding)return false;
      }
    }
    return true;
  }
  function clearSegment(a,b,padding=.035){
    const length=distance(a,b),count=Math.max(1,Math.ceil(length/.08));let last=ground(a);
    for(let i=1;i<=count;i++){
      const point={x:a.x+(b.x-a.x)*i/count,z:a.z+(b.z-a.z)*i/count};
      if(!clear(point,padding))return false;
      const next=ground(point);if(Math.abs(next.height-last.height)>length/count*.65+.008)return false;last=next;
    }
    return true;
  }
  // Searches and line-of-sight cleanup yield across frames. A difficult route
  // must never consume a whole render frame just because its bot is offscreen.
  function* navigate(target){
    if(!clear(target))return null;
    if(clearSegment(position,target))return[{...target}];
    stats.routeSearches++;yield;
    const step=PLAYER_BOT.navigationStep,pad=5,minX=Math.min(position.x,target.x)-pad,maxX=Math.max(position.x,target.x)+pad;
    const minZ=Math.min(position.z,target.z)-pad,maxZ=Math.max(position.z,target.z)+pad;
    const initial={x:position.x,z:position.z,ix:0,iz:0,cost:0,score:distance(position,target),parent:null};
    const nodes=new Map([['0:0',initial]]),queue=new Queue();queue.push(initial);let found=null,count=0;
    while(queue.length&&count++<PLAYER_BOT.maxRouteNodes){
      if(count%PLAYER_BOT.routeNodeBudget===0)yield;
      stats.routeNodes++;
      const current=queue.pop();if(current.closed||nodes.get(`${current.ix}:${current.iz}`)!==current)continue;current.closed=true;
      if(distance(current,target)<step*1.5&&clearSegment(current,target)){found=current;break;}
      for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
        if(!dx&&!dz)continue;
        const ix=current.ix+dx,iz=current.iz+dz,key=`${ix}:${iz}`,old=nodes.get(key);
        if(old?.closed||old?.blocked)continue;
        const x=position.x+ix*step,z=position.z+iz*step;
        if(x<minX||x>maxX||z<minZ||z>maxZ)continue;
        const cost=current.cost+Math.hypot(dx,dz)*step;if(old&&cost>=old.cost)continue;
        const point={x,z};if(!clear(point)){nodes.set(key,{blocked:true});continue;}
        if(!clearSegment(current,point))continue;
        const node={x,z,ix,iz,cost,score:cost+distance(point,target),parent:current};nodes.set(key,node);queue.push(node);
      }
    }
    if(!found)return null;
    const reversed=[target];for(let node=found;node;node=node.parent)reversed.push({x:node.x,z:node.z});
    const raw=reversed.reverse(),points=[];let index=0;
    while(index<raw.length-1){
      yield;let next=raw.length-1,checks=0;
      while(next>index+1&&!clearSegment(raw[index],raw[next])){next--;if(++checks%3===0)yield;}
      points.push({...raw[next]});index=next;
    }
    if(points.some((point,index)=>!clearSegment(index?points[index-1]:position,point)))return null;
    return points;
  }
  const context=player=>({placements,ready:true,enforceReach:true,heading:job?.heading??heading,...(player?{player}:{})});
  function beginRoute(points,nextJob){route=points;routeIndex=0;job=nextJob;state='walking';cooldown=0;}
  function* chooseTree(preferred=null){
    if(!treeChoices.length||chosenRevision!==revision||preferred){
      treeChoices=placements.filter(item=>item.kind==='tree'&&!game.isTreeRemoved(item)&&distance(item,anchor)<=PLAYER_BOT.searchRadius)
        .sort((a,b)=>(preferred&&a.id===preferred.id?-1e4:distance(position,a)+distance(anchor,a)*.2)
          -(preferred&&b.id===preferred.id?-1e4:distance(position,b)+distance(anchor,b)*.2));
      treeIndex=0;chosenRevision=revision;
    }
    // Two trees, at most two full route searches each, per decision tick.
    for(let attempt=0;attempt<2&&treeIndex<treeChoices.length;attempt++,treeIndex++){
      const tree=treeChoices[treeIndex];if(game.isTreeRemoved(tree))continue;
      const angle=Math.atan2(position.x-tree.x,position.z-tree.z);
      for(const offset of [0,Math.PI/2,-Math.PI/2,Math.PI]){
        const target={x:tree.x+Math.sin(angle+offset)*.86,z:tree.z+Math.cos(angle+offset)*.86};
        if(!clear(target))continue;
        if(offset!==0&&Math.abs(offset)!==Math.PI&& !clearSegment(position,target))continue;
        const points=yield* navigate(target);if(points){beginRoute(points,{kind:'tree',tree});return true;}
      }
    }
    if(treeIndex>=treeChoices.length){treeChoices=[];cooldown=2;}
    return false;
  }
  function createSites(){
    sites=[];
    // Tight, irregular concentric sampling keeps development around its first
    // home. All poses still pass ordinary footprints, paths, terrain and reach.
    for(let ring=0;ring<9;ring++){
      const radius=4.2+ring*2.9,count=10+ring*5;
      for(let i=0;i<count;i++){
        const angle=i/count*tau+phase+ring*.37;
        sites.push({x:anchor.x+Math.sin(angle)*radius,z:anchor.z+Math.cos(angle)*radius});
      }
    }
  }
  function* chooseHouse(){
    const houses=game.houses;
    for(let checks=0;checks<5&&siteIndex<sites.length;checks++,siteIndex++){
      yield;
      const site=sites[siteIndex];if(!houses.some(home=>distance(site,home)<=SETTLEMENT.connectionRange))continue;
      const facing=Math.atan2(site.x-position.x,site.z-position.z);
      stats.siteChecks++;
      const evaluation=game.evaluateBuild(site,{placements,heading:facing,player:position,enforceReach:false});
      if(!evaluation.siteValid){
        if(evaluation.code==='tree-blocked'&&!clearingTree)clearingTree=placements.filter(item=>item.kind==='tree'&&!game.isTreeRemoved(item)&&distance(item,site)<Math.hypot(SETTLEMENT.houseWidth,SETTLEMENT.houseDepth)/2+(item.radius??.85*(item.scale??1))+SETTLEMENT.clearance)
          .sort((a,b)=>distance(a,position)-distance(b,position))[0]??null;
        continue;
      }
      const nextJob={kind:'house',site:{...site},heading:facing};
      if(distance(position,site)<SETTLEMENT.buildReach-.3){
        job=nextJob;state='building';constructionTime=0;return true;
      }
      const fromAngle=Math.atan2(position.x-site.x,position.z-site.z);
      for(const offset of [0,Math.PI/2,-Math.PI/2,Math.PI]){
        const stand={x:site.x+Math.sin(fromAngle+offset)*2.5,z:site.z+Math.cos(fromAngle+offset)*2.5};
        const points=yield* navigate(stand);if(points){beginRoute(points,nextJob);return true;}
      }
    }
    if(siteIndex>=sites.length){
      if(clearingTree){const tree=clearingTree;clearingTree=null;siteIndex=0;return yield* chooseTree(tree);}
      siteIndex=0;cooldown=2;
    }
    return false;
  }
  function* think(){
    refresh();speed=0;
    const development=game.develop(context(position));
    if(development.buildings.length){refresh();constructionTime=PLAYER_BOT.constructionTime;state='construction';return;}
    if(game.houses.length>=PLAYER_BOT.targetHouses){
      if(!game.pendingMilestones.length){stopped=true;state='complete';job=null;return;}
      // Level-five homes stop immediately. A crowded landmark site may need a
      // final tree clearing; the same axe/reach/reward rules apply to that work.
      if(!development.searching){
        const homes=game.houses,center={x:homes.reduce((sum,p)=>sum+p.x,0)/homes.length,z:homes.reduce((sum,p)=>sum+p.z,0)/homes.length};
        const tree=placements.filter(p=>p.kind==='tree'&&!game.isTreeRemoved(p)&&distance(p,center)<18)
          .sort((a,b)=>distance(a,center)-distance(b,center))[0];
        if(tree)yield* chooseTree(tree);
      }
      return;
    }
    if(game.logs<SETTLEMENT.houseCost)yield* chooseTree();else yield* chooseHouse();
  }
  function planStep(){
    const result=planner.next();
    if(result.done){planner=null;if(state==='planning')state='thinking';}
  }
  function advance(step){
    elapsed+=step;refresh();
    if(stopped)return;
    cooldown=Math.max(0,cooldown-step);speed=0;
    if(state==='walking'){
      if(job.kind==='tree'&&game.isTreeRemoved(job.tree)){route=[];job=null;state='thinking';return;}
      let remaining=PLAYER_BOT.speed*step,travelled=0;
      while(remaining>1e-8&&routeIndex<route.length){
        const target=route[routeIndex],length=distance(position,target),amount=Math.min(remaining,length);
        if(length<1e-6){routeIndex++;continue;}
        const next={x:position.x+(target.x-position.x)*amount/length,z:position.z+(target.z-position.z)*amount/length};
        if(!clearSegment(position,next,0)){stats.blocked++;route=[];state='thinking';cooldown=.4;job=null;return;}
        const direction=Math.atan2(target.x-position.x,target.z-position.z);
        heading+=wrap(direction-heading)*Math.min(1,step*14);
        position.x=next.x;position.z=next.z;position.y=ground(next).height+.035;
        travelled+=amount;remaining-=amount;if(amount>=length-1e-8)routeIndex++;
      }
      stats.distance+=travelled;gait+=travelled*tau/1.05;speed=travelled/step;
      if(routeIndex>=route.length){state=job.kind==='tree'?'chopping':'building';if(state==='chopping'){swingTime=PLAYER_BOT.swingDuration;impact=false;heading=Math.atan2(job.tree.x-position.x,job.tree.z-position.z);}else constructionTime=0;}
    }else if(state==='chopping'){
      swingTime=Math.max(0,swingTime-step);
      if(!impact&&swingTime<=PLAYER_BOT.swingDuration-PLAYER_BOT.swingImpact){
        impact=true;const result=game.chop(job.tree,{player:position});
        if(result.ok){stats.trees++;stats.logsEarned+=result.logs;onChop(result,job.tree,{...position});}
      }
      if(!swingTime){job=null;state='thinking';cooldown=.2;}
    }else if(state==='building'){
      heading+=wrap(job.heading-heading)*Math.min(1,step*14);
      const result=game.build(job.site,context(position));
      if(result.ok){stats.houses++;onBuild(result);state='construction';constructionTime=PLAYER_BOT.constructionTime;}
      else{state='thinking';cooldown=.3;siteIndex++;}
      job=null;
    }else if(state==='construction'){
      constructionTime-=step;if(constructionTime<=0){state='thinking';cooldown=.12;}
    }else if(state==='planning')planStep();
    else if(!cooldown){cooldown=PLAYER_BOT.decisionInterval;state='planning';planner=think();planStep();}
  }
  createSites();refresh();
  return{
    game,config,
    update(dt){if(!Number.isFinite(dt)||dt<=0||stopped)return;let left=Math.min(dt,60);while(left>1e-8&&!stopped){const step=Math.min(left,1/30);advance(step);left-=step;}},
    snapshot(){updateStatus();return{id:config.id,ownerId:game.ownerId,position:{...position},heading,speed,gait,swingTime,state,
      houseCount,logs:game.logs,level,stopped,elapsed,stats:{...stats},
      target:job?.kind==='tree'?{kind:'tree',id:settlementTreeId(job.tree),x:job.tree.x,z:job.tree.z}:job?.site?{kind:'house',...job.site}:null};},
    get position(){return{...position};},get state(){return state;},get stopped(){return stopped;},get stats(){return{...stats};},
  };
}
