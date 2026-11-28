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

/** The first sunset is at 300s, then once per complete day/night pair. */
export function completedDayCount(elapsedSeconds){
  return Number.isFinite(elapsedSeconds)?Math.max(0,Math.floor((elapsedSeconds+DAY_NIGHT_CYCLE.nightSeconds)/cycleSeconds)):0;
}

/** One shared calendar can suspend at a precise wall-clock boundary. Resuming
 * rebases that boundary, so hidden time never becomes a simulation backlog.
 * Legacy callers remain continuous unless they explicitly pause the clock. */
export function createDayCalendar(){
  let wall=0,anchorWall=0,anchorElapsed=0,paused=false;
  const state={};
  function read(wallSeconds=wall){
    if(Number.isFinite(wallSeconds))wall=Math.max(wall,wallSeconds);
    const elapsed=anchorElapsed+(paused?0:wall-anchorWall);dayCycleAt(elapsed,state);
    state.elapsedSeconds=elapsed;state.completedDays=completedDayCount(elapsed);
    state.dayNumber=Math.floor(elapsed/cycleSeconds)+1;return state;
  }
  return{
    read,
    setPaused(next,wallSeconds=wall){
      const current=read(wallSeconds);
      if(Boolean(next)!==paused){anchorElapsed=current.elapsedSeconds;anchorWall=wall;paused=Boolean(next);}
      return read();
    },
    get paused(){return paused;},
    advance(wallSeconds){
      const current=read(wallSeconds),phaseEnd=current.phase==='day'?DAY_NIGHT_CYCLE.daySeconds:cycleSeconds;
      // Keep the requested boundary exact. Summed offsets can round a skip
      // down to 599.9999999999999 and report the phase we just left.
      anchorElapsed=Math.floor(current.elapsedSeconds/cycleSeconds)*cycleSeconds+phaseEnd;
      anchorWall=wall;return read();
    },
  };
}
