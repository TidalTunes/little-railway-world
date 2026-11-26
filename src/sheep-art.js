import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {box,ico} from './geometry.js';

export const SHEEP=Object.freeze({legHeight:.26,legWidth:.065,legDepth:.078,stride:.045,stepLength:.20,stepLift:.026});

export function sheepHeadGeometry(){
  const head=new THREE.IcosahedronGeometry(1,1).scale(.105,.12,.14),parts=[head];
  parts.push(new THREE.BoxGeometry(.13,.15,.13).translate(0,-.035,-.08).toNonIndexed());
  for(const side of [-1,1])parts.push(new THREE.BoxGeometry(.085,.035,.055).translate(side*.128,.025,-.02).toNonIndexed());
  const geometry=mergeGeometries(parts);parts.forEach(part=>part.dispose());return geometry;
}

/** The static fallback uses the same body envelope and leg attachment heights
 * as its animated counterpart, so changing detail levels cannot alter scale. */
export function buildSheepArt(parent){
  for(const x of [-.12,.12])for(const z of [-.14,.14]){
    box(parent,x,SHEEP.legHeight/2,z,SHEEP.legWidth,SHEEP.legHeight,SHEEP.legDepth,'metal');
  }
  ico(parent,0,.31,-.035,.23,.22,.30,'white',1);
  box(parent,0,.305,.17,.13,.15,.13,'roofBlue');
  ico(parent,0,.34,.25,.105,.12,.14,'roofBlue',1);
  for(const side of [-1,1])box(parent,side*.128,.365,.23,.085,.035,.055,'roofBlue');
  return parent;
}
