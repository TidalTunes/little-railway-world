import {Matrix4,Vector3,Vector4} from 'three';
import {surfacePoint} from './world-surface.js';

/** Match the city level badge's screen position, with a generous hit area for
 * the town beneath it. A click never depends on streamed building geometry. */
export function pickRailwayCity(world,cities,camera,pointer,{width,height}={}){
  if(!camera||!pointer||!width||!height)return null;
  camera.updateMatrixWorld(true);
  const point=new Vector3();let chosen=null,best=Infinity;
  for(const city of cities){
    if(!(city.level>=1))continue;
    surfacePoint(world,city.x,city.y??.7,city.z,point).project(camera);
    if(point.z< -1||point.z>1)continue;
    const dx=(point.x-pointer.x)*width/2,dy=(pointer.y-point.y)*height/2;
    const distance=Math.min(Math.hypot(dx,dy-24),Math.hypot(dx,dy));
    if(distance<=32&&distance<best){best=distance;chosen=city;}
  }
  return chosen;
}

export function railwayCityLabel(city,ownerId){
  if(!city)return '';
  if(city.name)return `${city.name} · ${city.level}`;
  const owner=city.ownerId===ownerId?'Your':['neutral','village-gray'].includes(city.ownerId)?'Village':`${String(city.ownerId??'').replace(/^./,letter=>letter.toUpperCase())}`;
  return `${owner} city · ${city.level}`;
}

export function pickRailwayHandle(world,handles,camera,pointer,{width,height}={}){
  if(!camera||!pointer||!width||!height)return -1;
  camera.updateMatrixWorld(true);const point=new Vector3();let best=15,selected=-1;
  handles.forEach((handle,index)=>{surfacePoint(world,handle.x,.8,handle.z,point).project(camera);
    if(point.z< -1||point.z>1)return;
    const distance=Math.hypot((point.x-pointer.x)*width/2,(point.y-pointer.y)*height/2);
    if(distance<best){best=distance;selected=index;}
  });return selected;
}

/** Pick physical connection points before the city badge. Screen-space hit
 * areas stay comfortable at every zoom; track distances remain in world units.
 * Station spines expose their two ports rather than an ambiguous interior. */
export function pickRailwayAnchor(world,{cities=[],stations=[],lines=[]}={},camera,pointer,{width,height}={}){
  if(!camera||!Number.isFinite(pointer?.x)||!Number.isFinite(pointer?.y)||!(width>0)||!(height>0)||Math.abs(pointer.x)>1||Math.abs(pointer.y)>1)return null;
  camera.updateMatrixWorld(true);
  const matrix=new Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse),point=new Vector3();
  const a=new Vector4(),b=new Vector4(),lineById=new Map(lines.map(line=>[line.id,line]));
  const project=(x,y,z,out)=>{surfacePoint(world,x,y,z,point);return out.set(point.x,point.y,point.z,1).applyMatrix4(matrix);};
  const visible=p=>p.w>0&&Math.abs(p.x)<=p.w&&Math.abs(p.y)<=p.w&&Math.abs(p.z)<=p.w;
  let chosen=null,best=Infinity,depth=Infinity;
  const nearer=(distance,z)=>distance<best-1e-6||(Math.abs(distance-best)<=1e-6&&z<depth);
  for(const station of stations){
    if(!Number.isFinite(station.center?.x)||!Number.isFinite(station.center?.z)||!Number.isFinite(station.heading))continue;
    const line=lineById.get(station.lineId),half=(line?.length??station.spineLength??14)/2,y=line?.points?.[0]?.y??.42;
    for(const side of [-1,1]){
      const x=station.center.x+Math.cos(station.heading)*half*side,z=station.center.z+Math.sin(station.heading)*half*side;
      project(x,y,z,a);if(!visible(a))continue;
      const distance=Math.hypot((a.x/a.w-pointer.x)*width/2,(a.y/a.w-pointer.y)*height/2),ndcDepth=a.z/a.w;
      if(distance<=14&&nearer(distance,ndcDepth)){best=distance;depth=ndcDepth;chosen={kind:'station',stationId:station.id,cityId:station.cityId,side,x,z};}
    }
  }
  if(chosen)return chosen;
  const spineIds=new Set(stations.map(station=>station.lineId));
  for(const line of lines){
    if(spineIds.has(line.id)||String(line.id).startsWith('rail-spine:')||line.previewOnly)continue;
    const points=line.points??[];let cumulative=0;
    for(let i=1;i<points.length;i++){
      const start=points[i-1],end=points[i];
      const startDistance=line.distances?.[i-1]??cumulative;
      cumulative=startDistance+Math.hypot(end.x-start.x,(end.y??.42)-(start.y??.42),end.z-start.z);
      const endDistance=line.distances?.[i]??cumulative,span=endDistance-startDistance;
      if(!(span>0))continue;
      project(start.x,start.y??.42,start.z,a);project(end.x,end.y??.42,end.z,b);
      for(const range of line.renderRanges??[{start:startDistance,end:endDistance}]){
        let lo=Math.max(0,(range.start-startDistance)/span),hi=Math.min(1,(range.end-startDistance)/span);
        if(lo>hi)continue;
        // Clip in homogeneous coordinates, including segments crossing the
        // viewport/near plane. Hidden endpoints cannot claim a nearby click.
        for(const axis of ['x','y','z'])for(const sign of [-1,1]){
          const value=a.w+sign*a[axis],change=b.w+sign*b[axis]-value;
          if(Math.abs(change)<1e-12){if(value<0)lo=Infinity;}
          else if(change>0)lo=Math.max(lo,-value/change);
          else hi=Math.min(hi,-value/change);
        }
        if(lo>hi)continue;
        const aw=a.w+(b.w-a.w)*lo,bw=a.w+(b.w-a.w)*hi;if(!(aw>0&&bw>0))continue;
        const ax=(a.x+(b.x-a.x)*lo)/aw,ay=(a.y+(b.y-a.y)*lo)/aw;
        const bx=(a.x+(b.x-a.x)*hi)/bw,by=(a.y+(b.y-a.y)*hi)/bw;
        const dx=(bx-ax)*width/2,dy=(by-ay)*height/2,px=(pointer.x-ax)*width/2,py=(pointer.y-ay)*height/2;
        const squared=dx*dx+dy*dy,t=squared>1e-12?Math.max(0,Math.min(1,(px*dx+py*dy)/squared)):0;
        const distance=Math.hypot(px-dx*t,py-dy*t);if(distance>10)continue;
        // A linear screen fraction is not a linear world fraction in a
        // perspective camera. Undo the homogeneous divide before snapping.
        const worldT=lo+(hi-lo)*(t*aw/((1-t)*bw+t*aw));
        const w=a.w+(b.w-a.w)*worldT,ndcDepth=(a.z+(b.z-a.z)*worldT)/w;
        if(nearer(distance,ndcDepth)){best=distance;depth=ndcDepth;chosen={kind:'track',lineId:line.id,distance:startDistance+span*worldT,x:start.x+(end.x-start.x)*worldT,z:start.z+(end.z-start.z)*worldT};}
      }
    }
  }
  if(chosen)return chosen;
  const city=pickRailwayCity(world,cities,camera,pointer,{width,height});
  return city?{kind:'city',cityId:city.id,x:city.x,z:city.z}:null;
}
