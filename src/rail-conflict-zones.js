const SAMPLE=.75,CONTACT=3.5,HEIGHT=2.4,PADDING=3.5,HALF_CAR=1.24,EPS=1e-8;
const wrap=(value,length)=>((value%length)+length)%length;
const stableId=(a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true});
const routeOf=train=>train.loop??train.route;

/** Atomic right-of-way for physical crossings. Unlike ordinary following
 * blocks, every conflicting approach to one crossing shares a single lease.
 * The coarse traffic layer still enforces actual carriage separation. */
export function createRailConflictZones({sample,spacing=2.6,deceleration=6}={}){
  if(typeof sample!=='function')throw new TypeError('Crossing zones require a route sampler');
  const cached=new WeakMap(),profiles=[];
  let zones=[],totalSamples=0,sampleCalls=0,builds=0;
  const point={x:0,y:0,z:0,tangent:{x:0,y:0,z:1}};
  const valid=train=>train&&Number.isFinite(train.distance)&&Number.isFinite(train.origin??0);
  function profile(train){
    const route=routeOf(train),length=train.routeLength??route?.length;
    if(!route||typeof route!=='object'||!Number.isFinite(length)||length<=0)return null;
    let result=cached.get(route);if(result)return result;
    const count=Math.max(4,Math.ceil(length/SAMPLE)),step=length/count;
    result={route,length,count,step,offset:totalSamples,points:new Float64Array(count*3),headings:new Float64Array(count*2),zones:[]};
    for(let i=0;i<count;i++){
      point.tangent.x=point.tangent.z=NaN;
      const p=sample(train,i*step-(train.origin??0),point);sampleCalls++;
      if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.z))return null;
      result.points.set([p.x,Number.isFinite(p.y)?p.y:0,p.z],i*3);
      const dx=p.tangent?.x,dz=p.tangent?.z,n=Math.hypot(dx??0,dz??0);
      if(n>EPS&&Number.isFinite(n)){result.headings[i*2]=dx/n;result.headings[i*2+1]=dz/n;}
    }
    for(let i=0;i<count;i++)if(!result.headings[i*2]&&!result.headings[i*2+1]){
      const before=wrap(i-1,count)*3,after=wrap(i+1,count)*3,dx=result.points[after]-result.points[before],dz=result.points[after+2]-result.points[before+2],n=Math.hypot(dx,dz);
      result.headings[i*2]=n>EPS?dx/n:1;result.headings[i*2+1]=n>EPS?dz/n:0;
    }
    totalSamples+=count;cached.set(route,result);profiles.push(result);return result;
  }
  function rebuild(){
    builds++;const parent=new Int32Array(totalSamples);parent.fill(-1);
    const root=node=>{let top=node;while(parent[top]!==top)top=parent[top];while(parent[node]!==node){const next=parent[node];parent[node]=top;node=next;}return top;};
    const mark=node=>{if(parent[node]<0)parent[node]=node;return node;};
    const union=(a,b)=>{a=root(mark(a));b=root(mark(b));if(a!==b)parent[Math.max(a,b)]=Math.min(a,b);};
    const bins=new Map(),expanded=new Uint8Array(totalSamples);
    function expand(p,index){
      const center=p.offset+index;if(expanded[center])return;expanded[center]=1;
      const radius=Math.ceil(PADDING/p.step);
      for(let d=-radius;d<=radius;d++)union(center,p.offset+wrap(index+d,p.count));
    }
    // The spatial hash avoids comparing all pairs of samples on large circuits.
    // Adjacency on a route is excluded: an ordinary curve is not a crossing.
    for(const p of profiles)for(let i=0;i<p.count;i++){
      const at=i*3,x=p.points[at],y=p.points[at+1],z=p.points[at+2],bx=Math.floor(x/CONTACT),bz=Math.floor(z/CONTACT);
      for(let ox=-1;ox<=1;ox++)for(let oz=-1;oz<=1;oz++)for(const other of bins.get(`${bx+ox},${bz+oz}`)??[]){
        const q=other.profile,j=other.index,bt=j*3;
        if(p===q&&Math.min(Math.abs(i-j),p.count-Math.abs(i-j))*p.step<8)continue;
        if(Math.abs(x-q.points[bt])>CONTACT||Math.abs(z-q.points[bt+2])>CONTACT||Math.abs(y-q.points[bt+1])>=HEIGHT)continue;
        const dot=p.headings[i*2]*q.headings[j*2]+p.headings[i*2+1]*q.headings[j*2+1];
        if(dot>=.7)continue;
        expand(p,i);expand(q,j);union(p.offset+i,q.offset+j);
      }
      const key=`${bx},${bz}`;let bucket=bins.get(key);if(!bucket){bucket=[];bins.set(key,bucket);}bucket.push({profile:p,index:i});
    }
    // Adjacent conflict intervals form one indivisible interlock, including
    // triple crossings and intervals straddling the circular route seam.
    for(const p of profiles)for(let i=0;i<p.count;i++){
      const a=p.offset+i,b=p.offset+(i+1)%p.count;if(parent[a]>=0&&parent[b]>=0)union(a,b);
    }
    const components=new Map();
    for(const p of profiles){
      p.zones=[];let run=null;
      for(let i=0;i<p.count;i++){
        const id=parent[p.offset+i]>=0?root(p.offset+i):-1;
        if(id<0){run=null;continue;}
        let zone=components.get(id);if(!zone){zone={anchor:id,routes:new Map(),owners:new Set(),entered:new Set()};components.set(id,zone);}
        let intervals=zone.routes.get(p);if(!intervals){intervals=[];zone.routes.set(p,intervals);p.zones.push(zone);}
        if(run?.zone===zone)run.interval.end=(i+.5)*p.step;
        else {const interval={start:(i-.5)*p.step,end:(i+.5)*p.step};intervals.push(interval);run={zone,interval};}
      }
    }
    // Adding a captured route can merge existing crossing components. Preserve
    // every incumbent so it can clear; newcomers wait until all tails leave.
    for(const old of zones){
      const replacement=parent[old.anchor]>=0?components.get(root(old.anchor)):null;if(!replacement)continue;
      for(const id of old.owners)replacement.owners.add(id);
      for(const id of old.entered)replacement.entered.add(id);
    }
    zones=[...components.values()];
  }
  function prepare(trains){const before=profiles.length;for(const train of trains)if(valid(train))profile(train);if(profiles.length!==before)rebuild();}
  const backLength=train=>Math.max(0,(train.carCount??train.cars?.length??1)-1)*spacing+HALF_CAR;
  function touches(train,p,intervals){
    const front=(train.origin??0)+train.distance+HALF_CAR,back=(train.origin??0)+train.distance-backLength(train);
    for(const interval of intervals){
      const shift=Math.floor((front-interval.start)/p.length)*p.length;
      if(interval.start+shift<front-EPS&&interval.end+shift>back+EPS)return true;
    }
    return false;
  }
  function clearance(train,p,intervals){
    const front=(train.origin??0)+train.distance+HALF_CAR;let best=Infinity;
    for(const interval of intervals){
      const shift=Math.floor((front-interval.start)/p.length)*p.length;
      if(front<=interval.end+shift+EPS)return 0;
      best=Math.min(best,interval.start+shift+p.length-front);
    }
    return Math.max(0,best);
  }
  function release(id){for(const zone of zones){zone.owners.delete(id);zone.entered.delete(id);}}
  function canSpawn(candidate,activeTrains=[]){
    if(!valid(candidate))return false;prepare([...activeTrains,candidate]);const p=profile(candidate);if(!p)return false;
    for(const zone of p.zones){
      if(!touches(candidate,p,zone.routes.get(p)))continue;
      if([...zone.owners].some(id=>id!==candidate.id))return false;
      for(const train of activeTrains)if(train.id!==candidate.id&&train.active!==false&&valid(train)){
        const q=profile(train),intervals=zone.routes.get(q);if(intervals&&touches(train,q,intervals))return false;
      }
    }
    return true;
  }
  function limits(trains,dt){
    const result=new Map();if(!Number.isFinite(dt)||dt<=0)return result;
    prepare(trains);const active=new Map();
    for(const train of trains)if(train.active!==false&&valid(train)){const p=profile(train);if(p)active.set(train.id,{train,p});result.set(train.id,Infinity);}
    for(const zone of zones){
      for(const id of zone.owners){
        const entry=active.get(id),intervals=entry&&zone.routes.get(entry.p);
        if(!intervals){zone.owners.delete(id);zone.entered.delete(id);continue;}
        if(touches(entry.train,entry.p,intervals))zone.entered.add(id);
        else if(zone.entered.has(id)){zone.owners.delete(id);zone.entered.delete(id);}
      }
      // Adopt already occupied zones when initializing around a running fleet.
      for(const [id,{train,p}]of active){const intervals=zone.routes.get(p);if(intervals&&touches(train,p,intervals)){zone.owners.add(id);zone.entered.add(id);}}
    }
    const requests=[],wantedById=new Map();
    for(const [id,{train,p}]of active){
      const speed=Math.max(0,train.speed??0),braking=speed*speed/(2*deceleration),front=(train.origin??0)+train.distance+HALF_CAR;
      const bodyLength=HALF_CAR+backLength(train),wanted=new Set(),passages=[];
      let horizon=braking+6+Math.max(0,train.maxAdvance??0),nearest=Infinity;
      for(const zone of p.zones){
        const intervals=zone.routes.get(p),gap=clearance(train,p,intervals);let exit=Infinity,occupiedExit=-Infinity;
        for(const interval of intervals){
          const shift=Math.floor((front-interval.start)/p.length)*p.length,end=interval.end+shift-front;
          if(end> -bodyLength+EPS&&interval.start+shift<front-EPS)occupiedExit=Math.max(occupiedExit,end);
          const start=end>=-EPS?0:interval.start+shift+p.length-front;
          if(Math.abs(start-gap)<EPS)exit=Math.min(exit,end>=-EPS?end:end+p.length);
        }
        passages.push({zone,gap,exit});
        if(occupiedExit> -Infinity){wanted.add(zone);horizon=Math.max(horizon,occupiedExit+bodyLength+braking+1);}
      }
      // Reserve the minimum connected chain that lets the whole consist clear
      // each crossing before stopping at the next. Long trains cannot keep one
      // crossing occupied while waiting for an incompatible adjacent crossing.
      let changed=true;
      while(changed){changed=false;for(const passage of passages)if(!wanted.has(passage.zone)&&passage.gap<=horizon){
        wanted.add(passage.zone);horizon=Math.max(horizon,passage.exit+bodyLength+braking+1);changed=true;
      }}
      for(const passage of passages)if(wanted.has(passage.zone))nearest=Math.min(nearest,passage.gap);
      for(const zone of p.zones)if(zone.owners.has(id)&&!zone.entered.has(id)&&!wanted.has(zone))zone.owners.delete(id);
      wantedById.set(id,wanted);if(wanted.size)requests.push({id,wanted,nearest});
    }
    // A fast follower must never win a lease in front of the slower train that
    // physically blocks its route to the crossing. Distance breaks that tie.
    requests.sort((a,b)=>a.nearest-b.nearest||stableId(a.id,b.id));
    for(const {id,wanted}of requests){
      if([...wanted].some(zone=>[...zone.owners].some(owner=>owner!==id))){
        for(const zone of zones)if(zone.owners.has(id)&&!zone.entered.has(id))zone.owners.delete(id);
        continue;
      }
      for(const zone of wanted)zone.owners.add(id);
    }
    for(const [id,{train,p}]of active)for(const zone of p.zones){
      if(zone.owners.has(id))continue;
      const gap=clearance(train,p,zone.routes.get(p));
      if(zone.owners.size||wantedById.get(id)?.has(zone))result.set(id,Math.min(result.get(id),gap));
    }
    return result;
  }
  return {canSpawn,limits,release,clear(){for(const zone of zones){zone.owners.clear();zone.entered.clear();}},
    get stats(){return {profiles:profiles.length,zones:zones.length,samples:sampleCalls,builds};}};
}
