// Canonical weapon geometry, shared by the headless simulation and both art
// LODs. Assets face +Z; elevation is positive up, body pitch is nose-down.
const weapon=(yawPivot,pitchPivot,muzzle,options)=>Object.freeze({yawPivot:Object.freeze(yawPivot),pitchPivot:Object.freeze(pitchPivot),muzzle:Object.freeze(muzzle),bodyPivot:Object.freeze([0,0,0]),...options});
export const MILITARY_WEAPONS=Object.freeze({
  soldier:weapon([0,.29,0],[-.066,.457,.11],[-.066,.464,.419],{minElevation:-.55,maxElevation:.85,yawRate:4.5,elevationRate:3,yawLimit:1.35,restElevation:0,tolerance:.025}),
  tank:weapon([0,.88,-.08],[0,1.15,.37],[0,1.15,1.89],{minElevation:-.22,maxElevation:.65,yawRate:1.3,elevationRate:.7,yawLimit:Math.PI,restElevation:0,tolerance:.018}),
  artillery:weapon([0,.90,.10],[0,1.15,.25],[0,1.15,1.483],{minElevation:.55,maxElevation:1.3,yawRate:.85,elevationRate:.6,yawLimit:.85,restElevation:.55,tolerance:.02}),
  helicopter:weapon([-.82,.50,.09],[-.82,.50,.09],[-.82,.554,.463],{bodyPivot:Object.freeze([0,.70,0]),minElevation:-1.3,maxElevation:.65,yawRate:2.8,elevationRate:1.8,yawLimit:1.1,restElevation:0,tolerance:.025}),
});
export const MILITARY_MOTION=Object.freeze({
  soldier:Object.freeze({turnRate:5.5,acceleration:10,braking:14}),
  tank:Object.freeze({turnRate:.9,acceleration:.7,braking:1.8}),
  artillery:Object.freeze({turnRate:1.15,acceleration:.8,braking:2}),
  helicopter:Object.freeze({turnRate:1.8,acceleration:2.1,braking:3}),
});
export const militaryAngle=value=>Math.atan2(Math.sin(value),Math.cos(value));
export const militaryApproach=(value,target,step)=>value+Math.max(-step,Math.min(step,target-value));
export const militaryTurn=(value,target,step)=>militaryAngle(value+Math.max(-step,Math.min(step,militaryAngle(target-value))));
function rotateX(p,a){const c=Math.cos(a),s=Math.sin(a),y=p.y;p.y=y*c-p.z*s;p.z=y*s+p.z*c;return p;}
function rotateY(p,a){const c=Math.cos(a),s=Math.sin(a),x=p.x;p.x=x*c+p.z*s;p.z=p.z*c-x*s;return p;}
function rotateZ(p,a){const c=Math.cos(a),s=Math.sin(a),x=p.x;p.x=x*c-p.y*s;p.y=x*s+p.y*c;return p;}
function around(p,pivot,rotate,angle){p.x-=pivot[0];p.y-=pivot[1];p.z-=pivot[2];rotate(p,angle);p.x+=pivot[0];p.y+=pivot[1];p.z+=pivot[2];return p;}
function body(p,unit,pivot){around(p,pivot,rotateZ,unit.roll??0);around(p,pivot,rotateX,unit.pitch??0);return rotateY(p,unit.heading??0);}
export function getMilitaryMuzzle(unit){
  const spec=MILITARY_WEAPONS[unit.kind],p={x:spec.muzzle[0],y:spec.muzzle[1],z:spec.muzzle[2]};
  around(p,spec.pitchPivot,rotateX,-(unit.elevation??spec.restElevation));around(p,spec.yawPivot,rotateY,unit.aimYaw??0);body(p,unit,spec.bodyPivot);
  const scale=unit.scale??1;return{x:(unit.x??0)+p.x*scale,y:(unit.y??0)+p.y*scale,z:(unit.z??0)+p.z*scale};
}
export function getMilitaryForward(unit){
  const p={x:0,y:0,z:1};rotateX(p,-(unit.elevation??MILITARY_WEAPONS[unit.kind].restElevation));rotateY(p,unit.aimYaw??0);rotateZ(p,unit.roll??0);rotateX(p,unit.pitch??0);return rotateY(p,unit.heading??0);
}
/** Convert a world direction into an independently aimed weapon's body frame. */
export function getMilitaryLocalDirection(unit,direction){
  const p={...direction};rotateY(p,-(unit.heading??0));rotateX(p,-(unit.pitch??0));return rotateZ(p,-(unit.roll??0));
}
