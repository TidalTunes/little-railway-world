/** Shared launch-economy prices and calendar timings. Legacy economy is separate. */
export const LOOP_ECONOMY_RULES=Object.freeze({
  startResources:40,startFood:12,houseResources:8,houseFood:2,
  productionSeconds:60,daySeconds:300,nightSeconds:300,
  trackUnitLength:48,trackResourcesPerUnit:2,trainBase:10,trainPerCar:5,
  pickup:2,visitResources:2,speed:10,dwell:0,
});

export function loopTrackCost(distance){
  return Number.isFinite(distance)&&distance>=0?Math.ceil(distance/LOOP_ECONOMY_RULES.trackUnitLength)*LOOP_ECONOMY_RULES.trackResourcesPerUnit:Infinity;
}

export function loopTrainCost(cityCount){
  return Number.isSafeInteger(cityCount)&&cityCount>0?LOOP_ECONOMY_RULES.trainBase+Math.max(0,cityCount-1)*LOOP_ECONOMY_RULES.trainPerCar:Infinity;
}
