const SAMPLE=.5,CELL=1.25,HEIGHT=2.4,HALF_WIDTH=.62,HALF_CAR=1.24,EPS=1e-8;
const wrap=(n,length)=>((n%length)+length)%length;

/** Physical block reservations shared by all captured circuits. A line crossing
 * is a conflict even when it is not a graph junction; separated bridge decks are
 * not. Whole consists hold blocks until their last car clears them. No renderer,
 * wall clock, timers or dependency on a city's label enters the traffic model. */
export function createRailTraffic({sample,spacing=2.6,deceleration=6}={}){
  if(typeof sample!=='function')throw new TypeError('Traffic needs a route sampler');
  const crossings=createRailConflictZones({sample,spacing,deceleration});
  const claims=new Map(),held=new Map(),routes=new WeakMap();
  let steps=0,samples=0,blocked=0;
  const point={x:0,y:0,z:0,tangent:{x:0,y:0,z:1}};
  function cellsAt(train,distance){
    const length=train.routeLength??train.loop?.length;
    const route=train.loop??train.route??train;
    let cache=routes.get(route);if(!cache){cache=new Map();routes.set(route,cache);}
    const bucket=Math.floor(wrap(distance+(train.origin??0),length)/SAMPLE);
    let cells=cache.get(bucket);if(cells)return cells;
    const at=bucket*SAMPLE-(train.origin??0),p=sample(train,at,point);samples++;
    if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.z))return [];
    // Padding covers the half-metre sampling interval, curved track and the
    // entire width of a carriage, making the grid conservatively collision-safe.
    const radius=HALF_WIDTH+SAMPLE,y=Number.isFinite(p.y)?p.y:0;
    cells=[];
    for(let x=Math.floor((p.x-radius)/CELL);x<=Math.floor((p.x+radius)/CELL);x++)
      for(let z=Math.floor((p.z-radius)/CELL);z<=Math.floor((p.z+radius)/CELL);z++)
        for(let h=Math.floor((y-.25)/HEIGHT);h<=Math.floor((y+1.8)/HEIGHT);h++)cells.push(`${x},${z},${h}`);
    if(cache.size>=16384)cache.delete(cache.keys().next().value);cache.set(bucket,cells);return cells;
  }
  const tail=train=>Math.max(0,(train.carCount??train.cars?.length??1)-1)*spacing+HALF_CAR;
  function body(train){
    const cells=new Set(),front=train.distance+HALF_CAR,back=train.distance-tail(train);
    for(let d=back;d<front;d+=SAMPLE)for(const cell of cellsAt(train,d))cells.add(cell);
    for(const cell of cellsAt(train,front))cells.add(cell);return cells;
  }
  function release(id){const own=held.get(id);if(own)for(const key of own)if(claims.get(key)===id)claims.delete(key);held.delete(id);crossings.release(id);}
  function canSpawn(candidate,trains=[]){
    if(!crossings.canSpawn(candidate,trains))return false;
    const cells=body(candidate);
    if(!cells.size)return false;
    for(const train of trains){if(train.id===candidate.id||train.active===false)continue;
      for(const cell of body(train))if(cells.has(cell))return false;
    }
    for(const cell of cells){const owner=claims.get(cell);if(owner!==undefined&&owner!==candidate.id)return false;}
    return true;
  }
  function step(trains,dt){
    const moves=new Map();if(!Number.isFinite(dt)||dt<=0)return moves;
    steps++;const active=trains.filter(train=>train.active!==false),ids=new Set(active.map(train=>train.id));
    for(const id of held.keys())if(!ids.has(id))release(id);
    const crossingLimits=crossings.limits(active,dt);
    const bodies=new Map(),occupied=new Map(),ranges=new Map();
    for(const train of active){
      const cells=body(train);bodies.set(train.id,cells);
      for(const key of cells){let owners=occupied.get(key);if(!owners){owners=new Set();occupied.set(key,owners);}owners.add(train.id);}
      // Retain permission through a junction until the tail has cleared it.
      // At least a train-length of lookahead also makes opposed crossing
      // approaches yield before either nose occupies the crossing itself.
      const speed=Math.max(0,train.speed??0);
      // Do not claim even a prefix of somebody else's crossing zone. The
      // interlock covers the entire conflict interval, including shallow angles.
      const horizon=Math.min(Math.max(8,tail(train)+3,speed*speed/(2*deceleration)+3),Math.max(0,(crossingLimits.get(train.id)??Infinity)-.5));
      ranges.set(train.id,horizon);
      const desired=new Set(cells);
      if(train.maxAdvance>EPS)for(let d=SAMPLE;d<=horizon;d+=SAMPLE)for(const key of cellsAt(train,train.distance+HALF_CAR+d))desired.add(key);
      const own=held.get(train.id);
      if(own)for(const key of own)if(!desired.has(key)){if(claims.get(key)===train.id)claims.delete(key);own.delete(key);}
    }
    // Existing reservations survive this ordering. A newly contested block is
    // awarded deterministically; following trains then see the same authority.
    for(const train of active){
      let own=held.get(train.id);if(!own){own=new Set();held.set(train.id,own);}
      for(const key of bodies.get(train.id))if(!claims.has(key)||claims.get(key)===train.id){claims.set(key,train.id);own.add(key);}
      const requested=Math.max(0,train.maxAdvance??0);
      if(requested<=EPS){moves.set(train.id,{distance:train.distance,speed:0,blocked:false});continue;}
      const horizon=ranges.get(train.id);let clearance=horizon;
      for(let d=0;d<=horizon+EPS;d+=SAMPLE){
        const cells=cellsAt(train,train.distance+HALF_CAR+d);
        const conflict=cells.some(key=>{
          const owner=claims.get(key),physical=occupied.get(key);
          return owner!==undefined&&owner!==train.id||physical&&(physical.size>1||!physical.has(train.id));
        });
        if(conflict){clearance=Math.max(0,d-SAMPLE);break;}
        for(const key of cells){claims.set(key,train.id);own.add(key);}
      }
      const safeSpeed=Math.sqrt(2*deceleration*Math.max(0,clearance-.15));
      let advance=Math.min(requested,clearance,safeSpeed*dt);
      if(advance<EPS)advance=0;
      const waiting=advance+EPS<requested;if(waiting)blocked++;
      moves.set(train.id,{distance:train.distance+advance,speed:waiting?Math.min(train.desiredSpeed??advance/dt,advance/dt):train.desiredSpeed??requested/dt,blocked:waiting});
    }
    return moves;
  }
  return {canSpawn,step,release,clear(){claims.clear();held.clear();crossings.clear();},get stats(){return {steps,samples,blocked,reservedBlocks:claims.size,trains:held.size,crossings:crossings.stats};}};
}
import {createRailConflictZones} from './rail-conflict-zones.js';
