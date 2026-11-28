import {Matrix4,Vector3,Ray,Box3} from 'three';
import {rigidSurfacePoseMatrix,surfaceDisplacement,surfaceHeading,surfaceChartRadius,chartHeadingForSurface} from './world-surface.js';
import {surfaceQueryBoxes} from './surface-query.js';

const delta={},local={},a={},b={},localRay=new Ray(),hit=new Vector3();
const finite=value=>Number.isFinite(value);

function shape(world,item,{x=0,z=0,width,depth,radius,height=2,bottom=0,support=false,dynamic=false,cameraOnly=false}){
  const scale=item.scale??1,savedRotation=item.rotation??0;
  const rotation=item.rotationSpace==='surface'?chartHeadingForSurface(world,item.x,item.z,savedRotation):savedRotation;
  const angle=item.rotationSpace==='surface'?savedRotation:surfaceHeading(world,item.x,item.z,rotation);
  const result={item,x:x*scale,z:z*scale,width:width*scale,depth:depth*scale,radius:radius===undefined?undefined:radius*scale,
    bottom:(item.y??0)+bottom*scale,top:(item.y??0)+height*scale,angle,ca:Math.cos(angle),sa:Math.sin(angle),support,dynamic,cameraOnly};
  result.inverse=rigidSurfacePoseMatrix(world,item.x,item.y??0,item.z,rotation,new Matrix4()).invert();
  const halfX=result.radius??result.width/2,halfZ=result.radius??result.depth/2;
  result.box=new Box3(new Vector3(result.x-halfX,bottom*scale,result.z-halfZ),new Vector3(result.x+halfX,height*scale,result.z+halfZ));
  return result;
}

/** Gameplay bodies are deliberately independent of roof trim, poles, leaves,
 * and decorative mesh triangles. Low slabs support feet; solids only obstruct. */
export function walkingPlacementShapes(world,item){
  if(!item||!finite(item.x)||!finite(item.z))return [];
  const kind=item.kind??(item.width&&item.depth?'station':null),type=item.buildingType??kind;
  const make=options=>shape(world,item,options),shapes=[];
  if(kind==='station')return [
    make({width:6.4,depth:2.4,height:.20,support:true}),
    make({x:-1.45,z:-.42,width:2.62,depth:1.42,height:2.22}),
    make({x:1.42,z:-.56,width:1.25,depth:.34,height:.76}),
    make({x:1.42,z:-.10,width:2.82,depth:1.65,bottom:1.71,height:1.87}),
    ...[.20,2.65].map(x=>make({x,z:.35,width:.12,depth:.12,height:1.8})),
    make({x:2.88,z:-.70,width:.29,depth:.29,height:.63}),
  ];
  if(type==='plaza')return [
    make({radius:2.43,height:.18,support:true}),make({radius:.86,height:.82}),
    ...[-1,1].map(side=>make({x:side*1.52,width:.38,depth:1.2,height:.72})),
    ...[-1,1].flatMap(x=>[-1,1].map(z=>make({x:x*1.43,z:z*1.43,radius:.50,height:.8}))),
  ];
  if(kind==='tree'){
    const variant=((Math.floor(item.variant??0)%9)+9)%9;
    const crown=variant<3?{radius:.80,bottom:.675,height:2.72}:variant<6?{radius:.84,bottom:.50,height:2.60}
      :variant===6?{radius:.84,bottom:.86,height:2.50}:variant===7?{radius:.84,bottom:1.16,height:1.86}
      :{x:.07,width:1.10,depth:1.12,bottom:.97,height:2.73};
    return [make({radius:.14,height:item.height??2.7}),make({...crown,cameraOnly:true})];
  }
  if(kind==='cactus'||kind==='rock'||kind==='landmark')return [make({
    radius:kind==='cactus'?.31:kind==='rock'?(item.collisionRadius??.59):1.35,
    height:item.height??(kind==='cactus'?2.4:kind==='rock'?.6:8),
  })];
  if(item.buildingType){
    if(item.collisionBoxes)return item.collisionBoxes.map(box=>make({...box,height:item.height??2}));
    return [make({width:item.collisionWidth??item.width,depth:item.collisionDepth??item.depth,z:item.collisionOffsetZ??0,height:item.height??3})];
  }
  const variant=((item.variant??0)%4),spec={house:{width:variant===1?1.62:1.82,depth:variant===1?1.9:1.72,height:2.4},
    apartment:{width:2.52,depth:2.48,height:5.5},civic:{z:-.15,width:3.35,depth:2.72,height:5},tower:{width:2.32,depth:2.48,height:9}}[kind];
  if(spec)shapes.push(make(spec));
  return shapes;
}

/** An active carriage is one box, regardless of its wheels, cargo or paint.
 * Queued/removed trains have no body. Only nearby cars are materialized. */
export function walkingTrainShapes(world,trains,focus,range=12){
  const shapes=[];
  for(const train of trains??[]){
    if(train.active===false)continue;
    const poses=train.carPoses??[train];
    for(let index=0;index<poses.length;index++){
      const pose=poses[index];if(!pose||![pose.x,pose.z,pose.angle].every(finite))continue;
      surfaceDisplacement(world,focus,pose,delta);if(Math.hypot(delta.x,delta.z)>range)continue;
      shapes.push(shape(world,{...pose,rotation:pose.angle},{width:1.18,depth:2.4,height:index===0?1.56:1.2,dynamic:true}));
    }
  }
  return shapes;
}

function localPoint(world,body,point){
  surfaceDisplacement(world,body.item,point,delta);
  local.x=delta.x*body.ca-delta.z*body.sa-body.x;local.z=delta.x*body.sa+delta.z*body.ca-body.z;return local;
}

/** Circle against an oriented footprint. Rounded corners avoid the invisible
 * square padding that used to catch the player when sliding past a building. */
export function walkingContact(world,bodies,point,footHeight,radius,height,out={}){
  let best=0;out.depth=0;
  for(const body of bodies){
    if(body.cameraOnly||body.support||footHeight>=body.top-.001||footHeight+height<=body.bottom+.001)continue;
    const p=localPoint(world,body,point);let nx,nz,depth;
    if(body.radius!==undefined){
      const distance=Math.hypot(p.x,p.z);depth=body.radius+radius-distance;
      if(depth<=0)continue;nx=distance>1e-9?p.x/distance:1;nz=distance>1e-9?p.z/distance:0;
    }else{
      const hx=body.width/2,hz=body.depth/2,qx=p.x-Math.max(-hx,Math.min(hx,p.x)),qz=p.z-Math.max(-hz,Math.min(hz,p.z)),distance=Math.hypot(qx,qz);
      if(distance>1e-9){depth=radius-distance;if(depth<=0)continue;nx=qx/distance;nz=qz/distance;}
      else if(hx-Math.abs(p.x)<=hz-Math.abs(p.z)||body.dynamic){nx=p.x<0?-1:1;nz=0;depth=hx+radius-Math.abs(p.x);}
      else{nx=0;nz=p.z<0?-1:1;depth=hz+radius-Math.abs(p.z);}
    }
    if(depth>best){best=depth;out.depth=depth;out.x=nx*body.ca+nz*body.sa;out.z=-nx*body.sa+nz*body.ca;out.body=body;}
  }
  return best>1e-8?out:null;
}

export function walkingSlabHeight(world,bodies,point,previousHeight,stepHeight){
  let result=null;
  for(const body of bodies){
    if(body.cameraOnly)continue;
    // A solid's simple top can catch a descending jump, but never lifts a
    // person who is underneath it onto a roof or out of a fountain.
    if(!body.support&&(!finite(previousHeight)||previousHeight<body.top-.04))continue;
    if(body.support&&finite(previousHeight)&&body.top>previousHeight+stepHeight)continue;
    const p=localPoint(world,body,point),inside=body.radius!==undefined?Math.hypot(p.x,p.z)<=body.radius:Math.abs(p.x)<=body.width/2&&Math.abs(p.z)<=body.depth/2;
    if(inside&&(result===null||body.top>result))result=body.top;
  }
  return result;
}

/** Clip long chart segments before tangent conversion, preserving rail height.
 * Otherwise a Greenwich route can become a phantom bridge at the date line. */
export function walkingRailSegments(world,tree,point,radius=5){
  const result=[];
  for(const box of surfaceQueryBoxes(world,point.x,point.z,surfaceChartRadius(world,point.x,point.z,radius)))for(const segment of tree.query(box)){
    const {a,b}=segment;let lo=0,hi=1;
    for(const [start,span,min,max]of [[a.x,b.x-a.x,box.minX,box.maxX],[a.z,b.z-a.z,box.minZ,box.maxZ]]){
      if(Math.abs(span)<1e-12){if(start<min||start>max){hi=-1;break;}continue;}
      const first=(min-start)/span,last=(max-start)/span;
      lo=Math.max(lo,Math.min(first,last));hi=Math.min(hi,Math.max(first,last));
    }
    if(lo>hi)continue;
    const at=t=>({x:a.x+(b.x-a.x)*t,y:(a.y??.42)+((b.y??.42)-(a.y??.42))*t,z:a.z+(b.z-a.z)*t});
    result.push(lo===0&&hi===1?segment:{a:at(lo),b:at(hi)});
  }
  return result;
}

/** Continuous rail cap with a short shoulder ramp. Sleepers remain visual;
 * feet no longer alternate by .10 every .85 units or snag an individual rail. */
export function walkingRailHeight(world,segments,point,previousHeight,stepHeight){
  let result=null;
  for(const {a:from,b:to}of segments){
    surfaceDisplacement(world,point,from,a);surfaceDisplacement(world,point,to,b);
    const dx=b.x-a.x,dz=b.z-a.z,length=dx*dx+dz*dz,t=length?Math.max(0,Math.min(1,-(a.x*dx+a.z*dz)/length)):0;
    const distance=Math.hypot(a.x+dx*t,a.z+dz*t);if(distance>1.13)continue;
    const rail=(from.y??.42)+((to.y??.42)-(from.y??.42))*t;
    const shoulder=Math.max(0,Math.min(1,(distance-.58)/.55));
    const level=rail-.23*shoulder;
    if(finite(previousHeight)&&(level>previousHeight+stepHeight||previousHeight>rail+1.7))continue;
    if(result===null||level>result)result=level;
  }
  return result;
}

export function walkingRayDistance(bodies,origin,direction,length){
  let nearest=length;
  for(const body of bodies){
    if(body.support)continue;
    localRay.set(origin,direction).applyMatrix4(body.inverse);
    if(body.box.containsPoint(localRay.origin))return 0;
    if(localRay.intersectBox(body.box,hit)){
      // The body transform is rigid, so local and world distances agree.
      const distance=hit.distanceTo(localRay.origin);if(distance<nearest)nearest=distance;
    }
  }
  return nearest;
}
