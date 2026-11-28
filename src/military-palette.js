import {MeshStandardMaterial,Color} from 'three';
import {playerColors} from './player-palette.js';
import {C} from './palette.js';
import {applySceneStyle} from './scene-style.js';

export const MILITARY_TEAMS=Object.freeze([
  {id:'teal',name:'Teal',color:{l:.64,c:.13,h:178}},
  {id:'coral',name:'Coral',color:{l:.65,c:.16,h:29}},
  {id:'blue',name:'Blue',color:{l:.62,c:.14,h:254}},
  {id:'ochre',name:'Ochre',color:{l:.72,c:.14,h:84}},
]);
export function militaryColors(team=MILITARY_TEAMS[0]){
  if(typeof team==='string'){
    const preset=MILITARY_TEAMS.find(item=>item.id===team);if(preset)return playerColors(preset);
    if(!/^#[\da-f]{6}$/i.test(team))throw new TypeError('Use a team or a six-digit hex color');
    const body=new Color(team);
    return {body,light:body.clone().lerp(C.trim,.65),dark:body.clone().multiplyScalar(.38),
      roof:body.clone().multiplyScalar(.72),accent:body.clone().lerp(C.trim,.20),trim:C.trim.clone()};
  }
  return playerColors(team);
}

/** These materials belong to the asset library, never the live world palette. */
export function createMilitaryPalette(team){
  const shades={...militaryColors(team),graphite:C.metal,steel:C.rail,rubber:C.window,
    skin:C.peach,glass:C.roofBlue,canvas:C.timber};
  const palette=Object.fromEntries(Object.entries(shades).map(([role,color])=>[role,
    applySceneStyle(new MeshStandardMaterial({name:`military-${role}`,color,roughness:role==='glass'?.35:.93,flatShading:true}))]));
  let disposed=false;
  return {materials:palette,setColor(next){if(disposed)return;const colors=militaryColors(next);for(const [role,color]of Object.entries(colors))palette[role].color.copy(color);},
    dispose(){if(disposed)return;disposed=true;for(const material of Object.values(palette))material.dispose();}};
}
