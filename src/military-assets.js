import {createSoldierArt,createHelicopterArt} from './military-figures.js';
import {createTankArt,createArtilleryArt} from './military-vehicles.js';
import {createMilitaryPalette} from './military-palette.js';

export const MILITARY_KINDS=Object.freeze(['soldier','tank','artillery','helicopter']);
export const MILITARY_ART=Object.freeze({
  soldier:{name:'Foot soldier',attackDuration:.42,projectile:'tracer'},
  tank:{name:'Tank',attackDuration:.72,projectile:'shell'},
  artillery:{name:'Artillery',attackDuration:1.1,projectile:'arc'},
  helicopter:{name:'Attack helicopter',attackDuration:.55,projectile:'rocket'},
});
const builders={soldier:createSoldierArt,tank:createTankArt,artillery:createArtilleryArt,helicopter:createHelicopterArt};

/** A caller-controlled art rig. No AI, world registration, health or damage. */
export function createMilitaryAsset(parent,{kind='soldier',team,palette}={}){
  if(!builders[kind])throw new TypeError(`Unknown military asset: ${kind}`);
  const owned=palette?null:createMilitaryPalette(team),art=builders[kind](parent,{palette:palette??owned.materials});
  let disposed=false;
  return {...art,kind,attackDuration:MILITARY_ART[kind].attackDuration,
    setColor(value){owned?.setColor(value);},
    dispose(){if(disposed)return;disposed=true;art.dispose();art.root.removeFromParent();owned?.dispose();}};
}
