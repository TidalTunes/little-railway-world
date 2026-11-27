/** Exact planar railway alignments. Circular arcs and straights meet with C1
 * tangency, and every curved piece obeys a hard minimum turning radius. */
const TAU=Math.PI*2;
const EPS=1e-8;
const mod=a=>((a%TAU)+TAU)%TAU;
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const distance=(a,b)=>Math.hypot(b.x-a.x,b.z-a.z);
const heading=p=>Number.isFinite(p.heading)?p.heading:Math.atan2(p.tangent.z,p.tangent.x);

export function straightSegment(a,b,y=.42,metadata={}){
  const length=distance(a,b);
  if(length<EPS)return null;
  return {...metadata,type:'line',start:{x:a.x,y,z:a.z},end:{x:b.x,y,z:b.z},
    heading:Math.atan2(b.z-a.z,b.x-a.x),length,curvature:0};
}
function arcSegment(center,a,b,turn,radius,y){
  const startAngle=Math.atan2(a.z-center.z,a.x-center.x);
  const endAngle=Math.atan2(b.z-center.z,b.x-center.x);
  let sweep=turn*mod(turn*(endAngle-startAngle));
  if(Math.abs(sweep)>TAU-1e-7)sweep=0;
  if(Math.abs(sweep)<EPS)return null;
  return {type:'arc',center:{x:center.x,z:center.z},radius,startAngle,sweep,
    start:{x:a.x,y,z:a.z},end:{x:b.x,y,z:b.z},length:Math.abs(sweep)*radius,curvature:turn/radius};
}
function circle(p,angle,turn,radius){return{x:p.x-Math.sin(angle)*turn*radius,z:p.z+Math.cos(angle)*turn*radius};}
function packageSegments(segments,radius){
  let length=0;
  const result=segments.filter(Boolean).map(segment=>{const s={...segment,startDistance:length};length+=segment.length;return{...s,endDistance:length};});
  return {segments:result,length,minRadius:radius,maxCurvature:result.reduce((m,s)=>Math.max(m,Math.abs(s.curvature)),0)};
}

/** All two-circle / three-circle bounded-curvature connections between poses. */
export function alignmentCandidates(start,end,{radius=8,y=.42}={}){
  if(!Number.isFinite(radius)||radius<=0)throw new TypeError('Railway minimum turning radius must be positive and finite');
  const a=heading(start),b=heading(end),candidates=[];
  const add=parts=>{
    const candidate=packageSegments(parts,radius);
    if(candidate.length<EPS)return;
    const p=sampleAlignment(candidate,candidate.length);
    if(distance(p,end)>1e-5||Math.cos(p.heading-b)<1-1e-7)return;
    candidates.push(candidate);
  };
  for(const turn0 of [-1,1])for(const turn1 of [-1,1]){
    const c0=circle(start,a,turn0,radius),c1=circle(end,b,turn1,radius),d=distance(c0,c1);
    if(d<EPS){
      if(turn0===turn1)add([arcSegment(c0,start,end,turn0,radius,y)]);
      continue;
    }
    let theta=Math.atan2(c1.z-c0.z,c1.x-c0.x);
    if(turn0!==turn1){
      if(d<2*radius-EPS)continue;
      theta+=Math.asin(clamp(2*turn0*radius/d,-1,1));
    }
    const tangent0={x:c0.x+turn0*Math.sin(theta)*radius,z:c0.z-turn0*Math.cos(theta)*radius};
    const tangent1={x:c1.x+turn1*Math.sin(theta)*radius,z:c1.z-turn1*Math.cos(theta)*radius};
    add([arcSegment(c0,start,tangent0,turn0,radius,y),straightSegment(tangent0,tangent1,y),arcSegment(c1,tangent1,end,turn1,radius,y)]);
  }
  for(const turn of [-1,1]){
    const c0=circle(start,a,turn,radius),c2=circle(end,b,turn,radius),d=distance(c0,c2);
    if(d<EPS||d>4*radius)continue;
    const mx=(c0.x+c2.x)/2,mz=(c0.z+c2.z)/2;
    const offset=Math.sqrt(Math.max(0,4*radius*radius-d*d/4)),nx=-(c2.z-c0.z)/d,nz=(c2.x-c0.x)/d;
    for(const side of [-1,1]){
      const middle={x:mx+nx*offset*side,z:mz+nz*offset*side};
      const t0={x:(c0.x+middle.x)/2,z:(c0.z+middle.z)/2},t1={x:(c2.x+middle.x)/2,z:(c2.z+middle.z)/2};
      add([arcSegment(c0,start,t0,turn,radius,y),arcSegment(middle,t0,t1,-turn,radius,y),arcSegment(c2,t1,end,turn,radius,y)]);
    }
  }
  return candidates.sort((x,y)=>x.length-y.length);
}

export function sampleAlignmentInto(alignment,distanceAlong,out){
  const s=clamp(distanceAlong,0,alignment.length),segments=alignment.segments;
  if(!segments.length)throw new TypeError('An alignment must contain a nonzero segment');
  let lo=0,hi=segments.length-1;
  while(lo<hi){const mid=(lo+hi)>>1;if(segments[mid].endDistance<s-EPS)lo=mid+1;else hi=mid;}
  const segment=segments[lo],local=clamp(s-segment.startDistance,0,segment.length),fraction=local/segment.length;
  let x,z,angle;
  if(segment.type==='line'){
    x=segment.start.x+(segment.end.x-segment.start.x)*fraction;
    z=segment.start.z+(segment.end.z-segment.start.z)*fraction;angle=segment.heading;
  }else{
    const theta=segment.startAngle+segment.sweep*fraction;
    x=segment.center.x+Math.cos(theta)*segment.radius;z=segment.center.z+Math.sin(theta)*segment.radius;
    angle=theta+Math.sign(segment.sweep)*Math.PI/2;
  }
  const tangent=out.tangent??(out.tangent={x:0,y:0,z:0});
  let tx=Math.cos(angle),tz=Math.sin(angle);out.chartSpeed=1;
  if(segment.chartTransform){
    const t=segment.chartTransform,cx=t.x+t.xx*x+t.xz*z,cz=t.z+t.zx*x+t.zz*z;
    const dx=t.xx*tx+t.xz*tz,dz=t.zx*tx+t.zz*tz,speed=Math.hypot(dx,dz);
    x=cx;z=cz;tx=dx/speed;tz=dz/speed;angle=Math.atan2(tz,tx);out.chartSpeed=speed;
  }
  tangent.x=tx;tangent.y=0;tangent.z=tz;
  out.x=x;out.y=segment.start.y;out.z=z;out.distance=s;out.heading=angle;
  out.angle=Math.atan2(tangent.x,tangent.z);out.curvature=segment.curvature;
  return out;
}
export function sampleAlignment(alignment,distanceAlong){
  return sampleAlignmentInto(alignment,distanceAlong,{tangent:{x:0,y:0,z:0}});
}

export function sampleAlignmentPoints(alignment,spacing=.35){
  const points=[],distances=[];
  for(const segment of alignment.segments){
    const count=Math.max(1,Math.ceil(segment.length/spacing));
    for(let i=0;i<count;i++){
      const s=segment.startDistance+segment.length*i/count;
      if(distances.length&&s-distances.at(-1)<EPS)continue;
      const p=sampleAlignment(alignment,s);points.push({x:p.x,y:p.y,z:p.z});distances.push(s);
    }
  }
  const p=sampleAlignment(alignment,alignment.length);points.push({x:p.x,y:p.y,z:p.z});distances.push(alignment.length);
  return {points,distances,length:alignment.length};
}

export function combineAlignments(parts,radius=8){
  return packageSegments(parts.flatMap(part=>part?.segments??(part?[part]:[])),radius);
}

function waypointPoses(start,end,waypoints){
  const nodes=[start,...waypoints,end];
  return nodes.map((p,i)=>{
    if(i===0||i===nodes.length-1)return{...p,heading:heading(p)};
    if(Number.isFinite(p.heading))return p;
    const before=nodes[i-1],after=nodes[i+1];
    return {...p,heading:Math.atan2(after.z-before.z,after.x-before.x)};
  });
}
const noLoop=candidate=>candidate.segments.every(s=>s.type!=='arc'||Math.abs(s.sweep)<=Math.PI+1e-7)
  &&candidate.segments.reduce((turn,s)=>turn+(s.type==='arc'?Math.abs(s.sweep):0),0)<=Math.PI*1.5+1e-7;
const sameHeading=(a,b)=>Math.abs(Math.atan2(Math.sin(a.heading-b.heading),Math.cos(a.heading-b.heading)))<=1e-7;

/** Interpolates intermediate poses; isAllowed can reject paths outside terrain. */
export function createAlignment(start,end,{radius=8,y=.42,waypoints=[],isAllowed=()=>true}={}){
  const poses=waypointPoses(start,end,waypoints);
  const parts=[];
  for(let i=1;i<poses.length;i++){
    if(distance(poses[i-1],poses[i])<EPS){
      if(!sameHeading(poses[i-1],poses[i]))throw new TypeError('Invalid world: coincident waypoints cannot change heading within the minimum turning radius');
      continue;
    }
    const candidates=alignmentCandidates(poses[i-1],poses[i],{radius,y});
    const chosen=candidates.find(candidate=>noLoop(candidate)&&sampleAlignmentPoints(candidate,.45).points.every(isAllowed));
    if(!chosen)throw new TypeError('Invalid world: waypoints cannot fit the outline and minimum turning radius without a railway loop');
    parts.push(chosen);
  }
  const result=combineAlignments(parts,radius);
  if(!result.segments.length)throw new TypeError('Invalid world: railway alignment has no length');
  return result;
}

/** Inspect the same exact pose solver after a draft fails. Obstacle failures
 * retain the shortest radius-safe candidate, so the preview does not invent a
 * sharp hook that the solver never considered. Only radius failures use an
 * unbuildable Hermite guide, with its actual curvature inspected below. */
export function inspectAlignment(start,end,{radius=8,y=.42,waypoints=[],isAllowed=()=>true}={}){
  const poses=waypointPoses(start,end,waypoints),spans=[],points=[],violations=[];
  const append=(sampled,flags)=>{
    const offset=points.length?points.length-1:0;
    points.push(...(points.length?sampled.slice(1):sampled));
    for(const kind of ['radius','obstacle']){
      let first=-1;
      for(let j=0;j<=sampled.length;j++){
        if(j<sampled.length&&flags[kind]?.[j]){if(first<0)first=j;}
        else if(first>=0){violations.push({reason:kind,startIndex:offset+first,endIndex:offset+j-1});first=-1;}
      }
    }
    return offset;
  };
  for(let i=1;i<poses.length;i++){
    const a=poses[i-1],b=poses[i],length=distance(a,b);
    if(length<EPS){
      if(sameHeading(a,b))continue;
      const sampled=[{x:a.x,y,z:a.z},{x:b.x,y,z:b.z}];
      const offset=append(sampled,{radius:[true,true]});
      spans.push({fromIndex:i-1,toIndex:i,alignment:undefined,points:sampled,offset,reason:'radius'});continue;
    }
    const shapes=alignmentCandidates(a,b,{radius,y}).filter(noLoop);
    const alignment=shapes.find(candidate=>sampleAlignmentPoints(candidate,.45).points.every(isAllowed));
    const displayAlignment=alignment??shapes[0];
    let sampled,curvatures,tangents;
    if(displayAlignment)sampled=sampleAlignmentPoints(displayAlignment,.45).points;
    else{
      const reach=Math.min(length/3,radius);
      const c={x:a.x+Math.cos(a.heading)*reach,z:a.z+Math.sin(a.heading)*reach};
      const d={x:b.x-Math.cos(b.heading)*reach,z:b.z-Math.sin(b.heading)*reach};
      // Bound the maximum step, including the accelerated middle of a long
      // cubic. Endpoint curvature is evaluated analytically, not inferred from
      // a far-away control polygon or from unevenly spaced samples.
      const count=Math.max(6,Math.min(2048,Math.ceil(3*Math.max(distance(a,c),distance(c,d),distance(d,b))/.4)));
      curvatures=[];tangents=[];
      sampled=Array.from({length:count+1},(_,j)=>{const t=j/count,u=1-t;
        const dx=3*u*u*(c.x-a.x)+6*u*t*(d.x-c.x)+3*t*t*(b.x-d.x);
        const dz=3*u*u*(c.z-a.z)+6*u*t*(d.z-c.z)+3*t*t*(b.z-d.z);
        const ddx=6*u*(d.x-2*c.x+a.x)+6*t*(b.x-2*d.x+c.x);
        const ddz=6*u*(d.z-2*c.z+a.z)+6*t*(b.z-2*d.z+c.z);
        const speed=Math.hypot(dx,dz);tangents.push({x:dx,z:dz});
        curvatures.push(speed<EPS?Infinity:Math.abs(dx*ddz-dz*ddx)/(speed*speed*speed));
        return {x:u*u*u*a.x+3*u*u*t*c.x+3*u*t*t*d.x+t*t*t*b.x,y,
          z:u*u*u*a.z+3*u*u*t*c.z+3*u*t*t*d.z+t*t*t*b.z};});
    }
    const reason=alignment?null:shapes.length?'obstacle':'radius';
    const flags={radius:curvatures?.map(curvature=>curvature>1/radius+1e-6),obstacle:sampled.map(point=>!isAllowed(point))};
    if(tangents)for(let j=1;j<sampled.length;j++){
      const a=tangents[j-1],b=tangents[j],turn=Math.abs(Math.atan2(a.x*b.z-a.z*b.x,a.x*b.x+a.z*b.z));
      // A collinear reversal has zero curvature on either side of its cusp.
      // Catch the heading discontinuity even when the zero-speed point falls
      // between samples rather than exactly on one.
      if(turn>distance(sampled[j-1],sampled[j])/radius+1e-6)flags.radius[j-1]=flags.radius[j]=true;
    }
    const offset=append(sampled,flags);
    spans.push({fromIndex:i-1,toIndex:i,alignment,points:sampled,offset,reason});
  }
  return {poses,spans,points,violations};
}
