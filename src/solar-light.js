import {DAY_NIGHT_CYCLE} from './day-cycle.js';

/** A local east-to-west arc for the existing shadow light. Sun and moon hand
 * over at zero direct intensity; ambient light keeps the horizon readable.
 * A six-degree floor bounds grazing shadows without flattening midday light. */
export function solarLightAt(elapsedSeconds,out={}){
  const elapsed=Number.isFinite(elapsedSeconds)?Math.max(0,elapsedSeconds):0;
  const cycle=DAY_NIGHT_CYCLE.daySeconds+DAY_NIGHT_CYCLE.nightSeconds,seconds=elapsed%cycle;
  const night=seconds>=DAY_NIGHT_CYCLE.daySeconds;
  const progress=(night?seconds-DAY_NIGHT_CYCLE.daySeconds:seconds)/(night?DAY_NIGHT_CYCLE.nightSeconds:DAY_NIGHT_CYCLE.daySeconds);
  const angle=progress*Math.PI,height=Math.max(0,Math.sin(angle));
  const x=-Math.cos(angle),y=.12+height*(night?.83:1.13),z=night?-.52:.52;
  const length=Math.hypot(x,y,z),horizon=Math.min(1,height/.20);
  out.x=x/length;out.y=y/length;out.z=z/length;
  out.strength=horizon*horizon*(3-2*horizon);out.phase=night?'night':'day';
  return out;
}
