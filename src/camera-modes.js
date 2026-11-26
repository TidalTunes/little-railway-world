/** Pure orthographic camera rules. Zoom is relative to the fitted world view;
 * viewport aspect changes framing, never the mode thresholds. */
export const CAMERA_ZOOM = Object.freeze({
  min: .38,
  max: 9,
  default: 1,
  mapEnter: .68,
  mapExit: .82,
  closeEnter: 2.4,
  closeExit: 2,
  follow: 3.2,
  followExit: 2,
  mapBlendStart: 1,
  mapBlendEnd: .78,
  detailPrefetch: .35,
});

export const FOLLOW_ZOOM = CAMERA_ZOOM.follow;

/** Invalid values fall back safely; infinities clamp to the nearest limit. */
export function clampZoom(value, fallback = CAMERA_ZOOM.default) {
  const backup = typeof fallback === 'number' && Number.isFinite(fallback)
    ? fallback : CAMERA_ZOOM.default;
  const zoom = typeof value === 'number' && !Number.isNaN(value) ? value : backup;
  return Math.max(CAMERA_ZOOM.min, Math.min(CAMERA_ZOOM.max, zoom));
}

/** Hysteresis keeps small wheel/pinch changes from flickering between modes. */
export function modeForZoom(zoom, previous = 'world') {
  const value = clampZoom(zoom);
  if (previous === 'map' && value < CAMERA_ZOOM.mapExit) return 'map';
  if (previous === 'close' && value > CAMERA_ZOOM.closeExit) return 'close';
  if (value <= CAMERA_ZOOM.mapEnter) return 'map';
  if (value >= CAMERA_ZOOM.closeEnter) return 'close';
  return 'world';
}

/** Continuous, eased top-down projection blend. This intentionally does not
 * depend on mode: crossing a hysteresis boundary must never snap the camera. */
export function mapBlendForZoom(zoom) {
  const value = clampZoom(zoom);
  const fraction = Math.max(0, Math.min(1,
    (CAMERA_ZOOM.mapBlendStart - value) /
    (CAMERA_ZOOM.mapBlendStart - CAMERA_ZOOM.mapBlendEnd)));
  return fraction * fraction * (3 - 2 * fraction);
}

/** Following requires an explicit train selection in the interaction layer.
 * This helper only answers when zooming out should release that selection. */
export function shouldStopFollowing(zoom) {
  return clampZoom(zoom) < CAMERA_ZOOM.followExit;
}

/** Largest zoom that keeps a requested world rectangle visible. Pass camera
 * right-left/top-bottom before zoom is applied. A padding of .15 adds 15% of
 * each span on every side. Both portrait and landscape obey the same formula.
 * Global zoom limits take precedence if the requested span cannot fit.
 * Invalid framing inputs return the safe fallback instead of NaN/Infinity. */
export function fitZoomForSpan({
  viewWidth,
  viewHeight,
  spanWidth,
  spanHeight,
  padding = .15,
  fallback = FOLLOW_ZOOM,
} = {}) {
  if (![viewWidth, viewHeight, spanWidth, spanHeight].every(value =>
    typeof value === 'number' && Number.isFinite(value) && value > 0)) {
    return clampZoom(fallback);
  }
  const safePadding = typeof padding === 'number' && Number.isFinite(padding)
    ? Math.max(0, padding) : .15;
  const margin = 1 + 2 * safePadding;
  return clampZoom(Math.min(viewWidth / (spanWidth * margin),
    viewHeight / (spanHeight * margin)), fallback);
}

/** Ease proportional scale, with a finite travel speed for distant follow
 * requests. This is the exact solution of a capped first-order response in
 * log zoom, so 30/60/144 Hz produce the same camera after equal elapsed time. */
export function smoothZoom(current,target,seconds,reduced=false){
  if(reduced)return target;
  const dt=Math.max(0,Number.isFinite(seconds)?seconds:0);
  if(!dt||current===target)return current;
  const start=Math.log(current),end=Math.log(target),error=Math.abs(end-start);
  const rate=14,speed=1.8,threshold=speed/rate;
  const cappedTime=Math.max(0,(error-threshold)/speed);
  const travel=dt<=cappedTime?speed*dt:
    error-Math.min(error,threshold)*Math.exp(-rate*(dt-cappedTime));
  const next=Math.exp(start+Math.sign(end-start)*travel);
  return Math.abs(next-target)<1e-6?target:next;
}
