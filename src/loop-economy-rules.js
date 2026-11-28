/** Shared launch-economy prices and calendar timings. Legacy economy is separate. */
export const LOOP_ECONOMY_RULES=Object.freeze({
  startResources:40,startFood:12,startGold:50,houseResources:8,houseFood:2,
  productionSeconds:60,daySeconds:300,nightSeconds:300,
  trackUnitLength:48,trackResourcesPerUnit:2,trainBase:20,trainPerCar:0,
  pickup:1,pickupGold:1,speed:5,dwell:1,acceleration:6,deceleration:6,trafficStep:1/30,
});

export function loopTrackCost(distance){
  return Number.isFinite(distance)&&distance>=0?Math.ceil(distance/LOOP_ECONOMY_RULES.trackUnitLength)*LOOP_ECONOMY_RULES.trackResourcesPerUnit:Infinity;
}

export function loopTrainCost(cityCount){
  return Number.isSafeInteger(cityCount)&&cityCount>0?LOOP_ECONOMY_RULES.trainBase+Math.max(0,cityCount-1)*LOOP_ECONOMY_RULES.trainPerCar:Infinity;
}
