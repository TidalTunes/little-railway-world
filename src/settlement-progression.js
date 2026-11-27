import {surfaceDisplacement,surfaceOffset} from './world-surface.js';

/** Art envelopes and unlock thresholds are shared by the rules, renderer and
 * wordless HUD. Bonus civic buildings never count as homes themselves. */
export const SETTLEMENT_MILESTONES=Object.freeze([
  {type:'well',houses:3,width:2.2,depth:2.2,doorOffset:.9,height:1.8,collisionWidth:1.3,collisionDepth:1.14,collisionOffsetZ:0},
  {type:'market',houses:5,width:3.4,depth:2.6,doorOffset:1.12,height:2.3,collisionWidth:2.98,collisionDepth:2.02,collisionOffsetZ:0},
  {type:'clock',houses:8,width:2.2,depth:2.2,doorOffset:.9,height:4.5,collisionWidth:1.66,collisionDepth:1.66,collisionOffsetZ:0},
  {type:'hall',houses:12,width:3.9,depth:3.9,doorOffset:1.9,height:4.9,collisionWidth:3.48,collisionDepth:3.4,collisionOffsetZ:.08},
  {type:'waterTower',houses:16,width:2.3,depth:2.3,doorOffset:1.1,height:4.0,collisionWidth:1.30,collisionDepth:1.30,collisionOffsetZ:0},
  {type:'plaza',houses:20,width:5.2,depth:5.2,doorOffset:2.48,height:.9,collisionWidth:1.72,collisionDepth:1.72,collisionOffsetZ:0,
    collisionBoxes:Object.freeze([
      {x:0,z:0,width:1.72,depth:1.72},
      ...[-1,1].map(side=>({x:side*1.52,z:0,width:.38,depth:1.20})),
      ...[-1,1].flatMap(x=>[-1,1].map(z=>({x:x*1.43,z:z*1.43,width:1,depth:1}))),
    ].map(Object.freeze))},
  {type:'library',houses:24,width:3.9,depth:3.9,doorOffset:1.9,height:3.9,collisionWidth:3.48,collisionDepth:3.4,collisionOffsetZ:.08},
  {type:'guildhall',houses:30,width:3.9,depth:3.9,doorOffset:1.9,height:4.0,collisionWidth:3.48,collisionDepth:3.4,collisionOffsetZ:.08},
  {type:'chapel',houses:36,width:2.2,depth:2.9,doorOffset:1.4,height:4.3,collisionWidth:1.82,collisionDepth:2.60,collisionOffsetZ:0},
].map(Object.freeze));

export const SETTLEMENT_CIVIC_SEARCH=Object.freeze({routeBudget:4,maxRouteNodes:700});

export function settlementMilestone(type){return SETTLEMENT_MILESTONES.find(spec=>spec.type===type)??null;}

export function settlementCenter(world,homes){
  if(!homes.length)return null;
  const anchor=homes[0];let x=0,z=0;
  for(const home of homes){const delta=surfaceDisplacement(world,anchor,home);x+=delta.x;z+=delta.z;}
  return surfaceOffset(world,anchor.x,anchor.z,x/homes.length,z/homes.length);
}

export function pendingSettlementMilestones(homes,buildings){
  const count=homes.filter(home=>home.connected).length,built=new Set(buildings.map(building=>building.buildingType));
  return SETTLEMENT_MILESTONES.filter(spec=>count>=spec.houses&&!built.has(spec.type));
}

/** Deterministic compact search, nearest the centre first. The rules validate
 * every candidate; this function never clears space or moves existing assets. */
export function settlementCivicSites(world,homes){
  const center=settlementCenter(world,homes);if(!center)return [];
  const candidates=[center],phase=.38196601125*Math.PI*2;
  for(let ring=0;ring<7;ring++){
    const radius=2.6+ring*1.7,count=12+ring*4;
    for(let index=0;index<count;index++){
      const angle=index/count*Math.PI*2+phase*ring;
      candidates.push(surfaceOffset(world,center.x,center.z,Math.sin(angle)*radius,Math.cos(angle)*radius));
    }
  }
  // A stretched town can have an empty geometric centre well away from its
  // streets. A few nearby frontage sites keep that layout eligible too.
  for(const home of homes)for(let index=0;index<4;index++){
    const angle=(home.rotation??0)+index*Math.PI/2;
    candidates.push(surfaceOffset(world,home.x,home.z,Math.sin(angle)*3.6,Math.cos(angle)*3.6));
  }
  return candidates.sort((a,b)=>Math.hypot(a.x-center.x,a.z-center.z)-Math.hypot(b.x-center.x,b.z-center.z)).slice(0,240);
}
