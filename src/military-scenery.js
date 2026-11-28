import {isHarvestableWood,streamedWoodSourceId} from './harvestable-wood.js';

/** CPU-only canonical placements for the small combat island. Generate them
 * in the world worker, with the exact same regions/IDs as streamed detail. */
export function prepareMilitaryScenery(world,generateRegion){
  if(!world.gameplay?.military?.enabled||world.surface)return [];
  const size=192,placements=[];
  for(let x=Math.floor(-world.bounds.width/2/size);x<=Math.floor(world.bounds.width/2/size);x++){
    for(let z=Math.floor(-world.bounds.depth/2/size);z<=Math.floor(world.bounds.depth/2/size);z++){
      for(const item of generateRegion(world,{x:x*size,z:z*size,size}).placements){
        placements.push(isHarvestableWood(item)&&!item.id?{...item,id:streamedWoodSourceId(item)}:item);
      }
    }
  }
  world.gameplay.militaryScenery=placements;
  return placements;
}

/** Render streaming never changes military collision geometry. Only actual
 * construction, clearing, harvesting, or newly created ore invalidates it. */
export function createMilitaryCollisionSource(world,{session,getExtraPlacements=()=>[],getExtraRevision=()=>0}){
  let revision=-1,extraRevision=-1,placements=[];
  const villages=world.gameplay.farmVillages;
  const scenery=world.gameplay.militaryScenery??world.gameplay.botScenery??world.placements??[];
  const permanent=[...scenery,...world.gameplay.guaranteedTrees??[],...villages?.houses??[],...villages?.buildings??[],...world.stations??[]];
  return ()=>{
    const next=session.spatialRevision,extra=getExtraRevision();
    if(next===revision&&extra===extraRevision)return placements;
    revision=next;extraRevision=extra;const ids=new Set();
    placements=[...permanent,...session.buildings,...getExtraPlacements()].filter(item=>{
      const id=item.id??`${item.kind}:${item.x}:${item.z}`;
      if(ids.has(id)||session.shared.isSceneryRemoved(item)||session.shared.removedTreeIds.has(id))return false;
      ids.add(id);return true;
    });
    return placements;
  };
}
