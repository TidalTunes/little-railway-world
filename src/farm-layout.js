/** Shared field geometry keeps farm details and grazing reservations aligned. */
export function farmRandom(seed){
  let state=(Number(seed)||1)>>>0;
  return()=>{state=Math.imul(state,1664525)+1013904223|0;return(state>>>0)/4294967296;};
}

export function fieldDetailSeed(field,variant=0){
  const type=((Math.trunc(field.variant??variant)%3)+3)%3;
  return field.detailSeed??(type+1)*7117;
}

export function fieldOutline(field){
  const w=field.width/2,d=field.depth/2,points=field.polygon??[[-w,-d],[w,-d],[w,d],[-w,d]];
  const area=points.reduce((sum,p,index)=>{const q=points[(index+1)%points.length];return sum+p[0]*q[1]-q[0]*p[1];},0);
  if(Math.abs(area)<1e-8)throw new TypeError('Farm polygons must enclose a nonzero area');
  const outline=area<0?points.toReversed():points;
  for(let index=0;index<outline.length;index++){
    const a=outline[index],b=outline[(index+1)%outline.length],c=outline[(index+2)%outline.length];
    if((b[0]-a[0])*(c[1]-b[1])-(b[1]-a[1])*(c[0]-b[0])< -1e-8)throw new TypeError('Farm polygons must be convex');
  }
  return outline;
}

export function fieldContains(points,x,z,margin=0){
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length],dx=b[0]-a[0],dz=b[1]-a[1];
    if(dx*(z-a[1])-dz*(x-a[0])<margin*Math.hypot(dx,dz)-1e-8)return false;
  }
  return true;
}

export function fieldFeatureFootprint(points,feature,preferred,rng){
  if(!feature)return null;
  const centroid=points.reduce((p,q)=>[p[0]+q[0]/points.length,p[1]+q[1]/points.length],[0,0]);
  const radius=feature==='barn'?1.42:feature==='bales'?.84:.7;
  const candidates=Array.isArray(preferred)&&preferred.length===2&&preferred.every(Number.isFinite)?[preferred]:[];
  const start=Math.floor(rng()*points.length);
  for(const fraction of [.22,.38,.55,.72])for(let i=0;i<points.length;i++){
    const corner=points[(start+i)%points.length];
    candidates.push(corner.map((value,axis)=>value+(centroid[axis]-value)*fraction));
  }
  candidates.push(centroid);
  const center=candidates.find(point=>fieldContains(points,...point,radius));
  return center?{center,radius}:null;
}
