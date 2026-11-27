/** The calendar runs independently of movement and ambient-animation time.
 * A day and a night each own exactly five minutes. Their last twenty seconds
 * blend into the next phase, so launch is bright and midnight never snaps. */
export const DAY_NIGHT_CYCLE=Object.freeze({daySeconds:300,nightSeconds:300,transitionSeconds:20});
const cycleSeconds=DAY_NIGHT_CYCLE.daySeconds+DAY_NIGHT_CYCLE.nightSeconds;
const smoothstep=value=>value*value*(3-2*value);

/** Optional output lets the render loop reuse one tiny state object. */
export function dayCycleAt(elapsedSeconds,out={}){
  const elapsed=Number.isFinite(elapsedSeconds)?Math.max(0,elapsedSeconds):0;
  const seconds=elapsed%cycleSeconds,isNight=seconds>=DAY_NIGHT_CYCLE.daySeconds;
  const duration=isNight?DAY_NIGHT_CYCLE.nightSeconds:DAY_NIGHT_CYCLE.daySeconds;
  const phaseSeconds=isNight?seconds-DAY_NIGHT_CYCLE.daySeconds:seconds;
  const transition=Math.min(1,Math.max(0,(phaseSeconds-duration+DAY_NIGHT_CYCLE.transitionSeconds)/DAY_NIGHT_CYCLE.transitionSeconds));
  out.phase=isNight?'night':'day';out.cycleSeconds=seconds;
  out.night=isNight?1-smoothstep(transition):smoothstep(transition);
  // Existing clock geometry uses seconds as in-world minutes and starts at
  // 10:08. Offset it to 06:00 at dawn; one ten-minute cycle advances 24 hours.
  out.clockTime=seconds/cycleSeconds*24*60+6*60-(10*60+8);
  return out;
}
