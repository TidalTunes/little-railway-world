import {farmRandom,fieldContains,fieldFeatureFootprint,fieldDetailSeed,fieldOutline} from './farm-layout.js';
import {surfaceOffset,surfaceHeading,chartHeadingForSurface} from './world-surface.js';

export const SHEEP_FOOTPRINT=.7;

/** Sheep belong to the pasture, not an independent scenery lottery. Every
 * animal reserves its entire walkable disk inside one uncultivated parcel. */
export function createFarmLivestock(farm){
  const livestock=[];
  for(const [parcelIndex,field]of (farm.parcels??[]).entries()){
    if(field.crop!=='pasture')continue;
    const points=fieldOutline(field),seed=fieldDetailSeed(field,farm.variant);
    const feature=fieldFeatureFootprint(points,field.feature,field.featurePosition,farmRandom(seed));
    const rng=farmRandom(seed^0x7a34ef91);
    const area=Math.abs(points.reduce((sum,p,i)=>{const q=points[(i+1)%points.length];return sum+p[0]*q[1]-q[0]*p[1];},0))/2;
    const count=Math.max(2,Math.min(6,Math.round(area/42))),placed=[];
    const candidates=Array.from({length:80},()=>({x:(rng()-.5)*field.width,z:(rng()-.5)*field.depth,priority:rng()*5}));
    // Loose little herds favor the trough, leaving ample room to approach it.
    const center=feature?.center??points.reduce((p,q)=>[p[0]+q[0]/points.length,p[1]+q[1]/points.length],[0,0]);
    candidates.sort((a,b)=>Math.hypot(a.x-center[0],a.z-center[1])+a.priority-Math.hypot(b.x-center[0],b.z-center[1])-b.priority);
    for(const roamRadius of [1.1+rng()*.35,.65])for(const point of candidates){
      if(placed.length>=count)break;
      const radius=roamRadius+SHEEP_FOOTPRINT;
      if(!fieldContains(points,point.x,point.z,radius+.3))continue;
      if(feature&&Math.hypot(point.x-feature.center[0],point.z-feature.center[1])<radius+feature.radius+.2)continue;
      if(placed.some(other=>Math.hypot(point.x-other.x,point.z-other.z)<radius+other.radius+.25))continue;
      const animal={kind:'sheep',parcelIndex,x:point.x,z:point.z,rotation:rng()*Math.PI*2,scale:1,radius,roamRadius};
      placed.push(animal);
      livestock.push({...animal,x:point.x+field.x,z:point.z+field.z});
    }
  }
  return livestock;
}

/** Lift farm-local physical offsets into ordinary chart placements for the
 * bounded animation batches. The same exponential map drapes the field art. */
export function farmLivestockPlacements(world,farm){
  const heading=surfaceHeading(world,farm.x,farm.z,farm.rotation??0),cs=Math.cos(heading),sn=Math.sin(heading),scale=farm.scale??1;
  return(farm.livestock??[]).map((animal,index)=>{
    const x=animal.x*scale,z=animal.z*scale,point=surfaceOffset(world,farm.x,farm.z,x*cs+z*sn,-x*sn+z*cs);
    return{kind:'sheep',id:`${farm.districtId??farm.id}-sheep-${index}`,farmId:farm.districtId??farm.id,...point,
      y:(farm.y??0)+.07*scale,rotation:chartHeadingForSurface(world,point.x,point.z,heading+animal.rotation),
      scale:scale*(animal.scale??1),radius:animal.radius*scale,roamRadius:animal.roamRadius*scale};
  });
}
