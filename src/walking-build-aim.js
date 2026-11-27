import {surfaceOffset} from './world-surface.js';

const DEFAULT_PITCH=Math.PI/10,DEFAULT_DISTANCE=3.8;
const AIM_HEIGHT=DEFAULT_DISTANCE*Math.tan(DEFAULT_PITCH);
const finite=Number.isFinite;

// Match a ground ray in the useful middle of its range, then ease its slope to
// zero at each limit so looking through a reach boundary does not jerk the lot.
function boundedDistance(distance,min,max){
  if(distance<=min)return min;
  if(distance>=max)return max;
  const shoulder=Math.min(.35,(max-min)/4);
  if(distance<min+shoulder){
    const t=(distance-min)/shoulder;
    return min+shoulder*t*t*(2-t);
  }
  if(distance>max-shoulder){
    const t=(max-distance)/shoulder;
    return max-shoulder*t*t*(2-t);
  }
  return distance;
}

/** Aim from the character along the camera's tangent heading. Positive pitch
 * looks down; camera obstruction/retraction never changes building reach.
 * Position is in the world chart, while distance and heading use physical
 * tangent units, matching the walking camera on both flat maps and the globe.
 */
export function walkingBuildAim(world,pose={},options={}){
  const x=finite(pose?.position?.x)?pose.position.x:0;
  const z=finite(pose?.position?.z)?pose.position.z:0;
  const heading=finite(pose?.heading)?pose.heading:0;
  const pitch=finite(pose?.pitch)?pose.pitch:DEFAULT_PITCH;
  const max=Math.max(0,finite(options?.maxDistance)?options.maxDistance:7);
  const min=Math.min(max,Math.max(0,finite(options?.minDistance)?options.minDistance:2.2));
  const rayDistance=pitch<=0?max:pitch>=Math.PI/2?min:AIM_HEIGHT/Math.tan(pitch);
  const distance=boundedDistance(rayDistance,min,max);
  return surfaceOffset(world,x,z,Math.sin(heading)*distance,Math.cos(heading)*distance);
}
