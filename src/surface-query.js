import {pointBox} from './spatial-index.js';

/** Periodic images of a chart-space query/reservation. Index reservations with
 * these boxes too: a large object may cross the seam even when a small query
 * does not. Segment vertices stay in their authored chart coordinates. */
export function surfaceQueryBoxes(world,x,z,radius){
  const projection=world.surface?.projection;
  if(projection?.type!=='equirectangular')return[pointBox(x,z,radius)];
  const half=Math.PI*projection.radius,period=half*2;
  if(radius>=half)return[{minX:-half,maxX:half,minZ:z-radius,maxZ:z+radius}];
  const center=x>=-half&&x<half?x:((x+half)%period+period)%period-half;
  const box=pointBox(center,z,radius),boxes=[box];
  if(box.minX<=-half)boxes.push(pointBox(center+period,z,radius));
  if(box.maxX>=half)boxes.push(pointBox(center-period,z,radius));
  return boxes;
}

function clippedSegment(segment,box){
  const {a,b}=segment;
  let low=0,high=1;
  for(const [start,delta,min,max] of [[a.x,b.x-a.x,box.minX,box.maxX],[a.z,b.z-a.z,box.minZ,box.maxZ]]){
    if(Math.abs(delta)<1e-14){if(start<min||start>max)return null;continue;}
    const first=(min-start)/delta,last=(max-start)/delta;
    low=Math.max(low,Math.min(first,last));high=Math.min(high,Math.max(first,last));
    if(low>high)return null;
  }
  if(low===0&&high===1)return segment;
  return {a:{x:a.x+(b.x-a.x)*low,z:a.z+(b.z-a.z)*low},b:{x:a.x+(b.x-a.x)*high,z:a.z+(b.z-a.z)*high}};
}

/** Clip before converting to a local tangent frame. Merely wrapping two distant
 * endpoints can turn a line authored through Greenwich into a phantom short
 * segment across the date line. Clipping preserves the actual chart path. */
export function surfaceQuerySegments(world,tree,x,z,radius){
  const segments=[];
  for(const box of surfaceQueryBoxes(world,x,z,radius))for(const candidate of tree.query(box)){
    const segment=clippedSegment(candidate,box);if(segment)segments.push(segment);
  }
  return segments;
}
