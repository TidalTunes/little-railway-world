const tau=Math.PI*2;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));

/** A foot spends its support phase at ground height, then recovers in a smooth
 * arc. Unlike rotating a whole leg, neither end of the support phase sinks. */
export function footstep(phase,{stance=.62,stride=.16,lift=.08,weight=1}={},target={}){
  const cycle=((phase/tau)%1+1)%1;
  const support=cycle<stance;
  const t=support?cycle/stance:(cycle-stance)/(1-stance);
  target.z=(support?1-2*t:-Math.cos(Math.PI*t))*stride*weight;
  target.y=support?0:Math.sin(Math.PI*t)**2*lift*weight;
  target.support=support;return target;
}

/** Solve a connected two-link limb in its forward/up plane. Both meshes meet
 * at their actual joint, including the crouch and recovery part of a stride. */
export function solveLeg(hipHeight,footHeight,footForward,upper,lower,target={}){
  const drop=hipHeight-footHeight,distance=clamp(Math.hypot(drop,footForward),.001,upper+lower-.00001);
  const aim=Math.atan2(-footForward,drop);
  const bend=Math.acos(clamp((upper*upper+distance*distance-lower*lower)/(2*upper*distance),-1,1));
  target.hip=aim-bend;
  target.knee=Math.PI-Math.acos(clamp((upper*upper+lower*lower-distance*distance)/(2*upper*lower),-1,1));
  target.ankle=-target.hip-target.knee;return target;
}
