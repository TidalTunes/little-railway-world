import * as THREE from 'three';
import { color } from './palette.js';
import {applySceneStyle} from './scene-style.js';

// Ownership uses one hue family across roofs, walls, city marks and trains.
// Geometry and development never depend on the color a player chooses.
export function playerColors(player){
  const {l=.64,c=.14,h=22}=player?.color??{};
  const tone=(lightness,chroma)=>color(lightness,chroma,h);
  return {
    body:tone(THREE.MathUtils.clamp(l,.48,.72),Math.min(c,.17)),
    light:tone(.83,Math.min(c*.44,.075)),
    dark:tone(.38,Math.min(c*.65,.09)),
    roof:tone(THREE.MathUtils.clamp(l-.08,.43,.65),Math.min(c*.95,.16)),
    accent:tone(THREE.MathUtils.clamp(l+.06,.57,.77),Math.min(c*1.08,.18)),
    trim:tone(.94,Math.min(c*.13,.02)),
  };
}

/** Caller owns these materials; dispose them with the world that uses them. */
export function createPlayerPalette(player){
  return Object.fromEntries(Object.entries(playerColors(player)).map(([role,value])=>[
    role,applySceneStyle(new THREE.MeshStandardMaterial({name:`player-${player?.id??'neutral'}-${role}`,
      color:value,roughness:1,metalness:0,flatShading:true})),
  ]));
}
