import {Vector3,Matrix4} from 'three';
import {sampleLine} from './world-model.js';
import {createAlignment,combineAlignments} from './alignments.js';
import {surfaceFor,surfaceTangent,surfaceFrame} from './world-surface.js';

const cache=new WeakMap(),tangent=new Vector3();
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));

/** Route centerlines are authored in geographic chart units. Distances travelled
 * by a car, its couplings and sleepers are measured on the actual surface. The
 * integral is cached against immutable alignment data, so streamed chart copies
 * reuse the same lookup table without modifying their geographic distances. */
export function physicalLineMetric(world,line){
  const surface=surfaceFor(world);if(!surface)return null;
  const key=line.alignment??line.points;
  let surfaces=cache.get(key);if(!surfaces){surfaces=new WeakMap();cache.set(key,surfaces);}
  let metric=surfaces.get(surface);if(metric)return metric;
  const distances=line.distances?.length?line.distances:[0,line.length];
  const chart=[0];
  for(let i=1;i<distances.length;i++){
    const start=distances[i-1],end=distances[i],steps=Math.max(1,Math.ceil((end-start)/.5));
    for(let j=1;j<=steps;j++)chart.push(start+(end-start)*j/steps);
  }
  const physical=new Float64Array(chart.length),speed=new Float64Array(chart.length);
  const scale=s=>{const p=sampleLine(line,s);return surfaceTangent(world,p.x,p.y,p.z,p.tangent.x,p.tangent.y,p.tangent.z,tangent).length()*(p.chartSpeed??1);};
  speed[0]=scale(0);
  for(let i=1;i<chart.length;i++){
    speed[i]=scale(chart[i]);
    physical[i]=physical[i-1]+(chart[i]-chart[i-1])*(speed[i-1]+4*scale((chart[i-1]+chart[i])/2)+speed[i])/6;
  }
  metric={chart:Float64Array.from(chart),physical,speed,length:physical.at(-1),chartLength:line.length};
  surfaces.set(surface,metric);return metric;
}
function interval(values,distance){
  let lo=0,hi=values.length-1;
  while(lo+1<hi){const mid=(lo+hi)>>1;if(values[mid]<=distance)lo=mid;else hi=mid;}
  return lo;
}
function valueAt(metric,index,t){
  const h=metric.chart[index+1]-metric.chart[index],a=metric.physical[index],b=metric.physical[index+1];
  const m0=metric.speed[index]*h,m1=metric.speed[index+1]*h;
  return a+t*(m0+t*(3*(b-a)-2*m0-m1+t*(2*(a-b)+m0+m1)));
}
export function physicalDistanceAtChart(metric,distance){
  if(!metric)return distance;
  const s=clamp(distance,0,metric.chartLength),i=interval(metric.chart,s);
  return valueAt(metric,i,(s-metric.chart[i])/(metric.chart[i+1]-metric.chart[i]));
}
export function chartDistanceAtPhysical(metric,distance){
  if(!metric)return distance;
  const s=clamp(distance,0,metric.length),i=interval(metric.physical,s),a=metric.physical[i],b=metric.physical[i+1];
  const h=metric.chart[i+1]-metric.chart[i],m0=metric.speed[i]*h,m1=metric.speed[i+1]*h;
  let t=(s-a)/(b-a||1);
  for(let iteration=0;iteration<3;iteration++){
    const derivative=m0+t*(2*(3*(b-a)-2*m0-m1)+3*t*(2*(a-b)+m0+m1));
    if(derivative<1e-12)break;
    t=clamp(t-(valueAt(metric,i,t)-s)/derivative,0,1);
  }
  return metric.chart[i]+h*t;
}
export function samplePhysicalLine(world,line,distance){
  return sampleLine(line,chartDistanceAtPhysical(physicalLineMetric(world,line),distance));
}

/** Under a local chart transform J, curvature is bounded by
 * sigmaMax / sigmaMin². Reserving that radius before alignment generation keeps
 * rigid consists clear on high-latitude turns instead of shrinking the cars. */
export function chartTurnRadius(world,points,physicalRadius){
  if(!surfaceFor(world))return physicalRadius;
  const xAxis=new Vector3(),zAxis=new Vector3();let multiplier=1;
  for(const p of points){
    surfaceTangent(world,p.x,0,p.z,1,0,0,xAxis);surfaceTangent(world,p.x,0,p.z,0,0,1,zAxis);
    const a=xAxis.lengthSq(),b=xAxis.dot(zAxis),c=zAxis.lengthSq(),gap=Math.hypot(a-c,2*b);
    const small=Math.max(1e-8,(a+c-gap)/2),large=Math.sqrt((a+c+gap)/2);
    multiplier=Math.max(multiplier,large/small);
  }
  // Small reserve accounts for the metric changing across the arc itself.
  return physicalRadius*multiplier*(1+.025+physicalRadius*multiplier/(surfaceFor(world).radius)*2);
}


/** Inferred waypoint headings are layout choices, not geographic constraints.
 * Wider physical curves occasionally cannot pass a close waypoint with the
 * default bisector. Search those headings while retaining every anchor and any
 * explicitly authored headings; every chosen leg still obeys the same radius. */
export function createSurfaceAlignment(start,end,options){
  let original;
  try{return createAlignment(start,end,options);}catch(error){original=error;}
  const waypoints=options.waypoints??[];
  if(options.world){try{return localPhysicalAlignment(options.world,start,end,options);}catch{}}
  if(!waypoints.length)throw original;
  const nodes=[start,...waypoints,end],choices=nodes.map((p,i)=>{
    if(i===0||i===nodes.length-1||Number.isFinite(p.heading))return[{pose:p,penalty:0}];
    const heading=Math.atan2(nodes[i+1].z-nodes[i-1].z,nodes[i+1].x-nodes[i-1].x);
    return Array.from({length:31},(_,j)=>{const offset=(j-15)*.1;return{pose:{...p,heading:heading+offset},penalty:Math.abs(offset)*options.radius*.05};});
  });
  let previous=choices[0].map(c=>({...c,cost:0,parts:[]}));
  for(let i=1;i<choices.length;i++){
    const current=[];
    for(const candidate of choices[i]){
      let best=null;
      for(const from of previous){
        let part;try{part=createAlignment(from.pose,candidate.pose,{...options,waypoints:[]});}catch{continue;}
        const cost=from.cost+part.length+candidate.penalty;
        if(!best||cost<best.cost)best={...candidate,cost,parts:[...from.parts,part]};
      }
      if(best)current.push(best);
    }
    if(!current.length)throw original;previous=current;
  }
  previous.sort((a,b)=>a.cost-b.cost);return combineAlignments(previous[0].parts,options.radius);
}


function localPhysicalAlignment(world,start,end,options){
  const nodes=[start,...(options.waypoints??[]),end],anchor={x:(start.x+end.x)/2,z:(start.z+end.z)/2};
  const frame=surfaceFrame(world,anchor.x,anchor.z,new Matrix4()),e=column(frame,0),south=column(frame,2);
  const chartX=surfaceTangent(world,anchor.x,0,anchor.z,1,0,0,new Vector3()),chartZ=surfaceTangent(world,anchor.x,0,anchor.z,0,0,1,new Vector3());
  const a=chartX.dot(e),b=chartZ.dot(e),c=chartX.dot(south),d=chartZ.dot(south),det=a*d-b*c;
  if(Math.abs(det)<1e-8)throw new RangeError('A railway cannot use a singular pole chart');
  const transform={x:anchor.x,z:anchor.z,xx:d/det,xz:-b/det,zx:-c/det,zz:a/det};
  const mapped=p=>{
    const dx=p.x-anchor.x,dz=p.z-anchor.z,pose={...p,x:a*dx+b*dz,z:c*dx+d*dz};
    if(Number.isFinite(p.heading))pose.heading=Math.atan2(c*Math.cos(p.heading)+d*Math.sin(p.heading),a*Math.cos(p.heading)+b*Math.sin(p.heading));
    return pose;
  };
  let reserve=1;
  for(const p of nodes){
    surfaceTangent(world,p.x,0,p.z,transform.xx,0,transform.zx,chartX);
    surfaceTangent(world,p.x,0,p.z,transform.xz,0,transform.zz,chartZ);
    const aa=chartX.lengthSq(),bb=chartX.dot(chartZ),cc=chartZ.lengthSq(),gap=Math.hypot(aa-cc,2*bb);
    reserve=Math.max(reserve,Math.sqrt((aa+cc+gap)/2)/Math.max(1e-8,(aa+cc-gap)/2));
  }
  const physicalRadius=options.physicalRadius??options.radius,reservedRadius=physicalRadius*reserve*(1.015+physicalRadius*reserve/world.surface.radius*2);
  const isAllowed=options.isAllowed??(()=>true),toChart=p=>({x:transform.x+transform.xx*p.x+transform.xz*p.z,z:transform.z+transform.zx*p.x+transform.zz*p.z});
  const alignment=createSurfaceAlignment(mapped(start),mapped(end),{...options,world:null,radius:reservedRadius,
    waypoints:(options.waypoints??[]).map(mapped),isAllowed:p=>isAllowed(toChart(p))});
  for(const segment of alignment.segments)segment.chartTransform=transform;
  return alignment;
}
const column=(matrix,index)=>new Vector3().setFromMatrixColumn(matrix,index);
