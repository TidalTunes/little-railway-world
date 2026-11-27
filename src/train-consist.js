export const TRAIN_CAR_SPACING=2.6;
const EPS=1e-7;
const wrap=(distance,length)=>((distance%length)+length)%length;

/** Each town owns one position in the train. A trailing car reaches a station
 * after the engine, including stations just before home across the loop seam.
 * Sort those physical alignments, rather than teleporting the train backwards
 * to the next city label. Simultaneous alignments share a loading pause. */
export function createCircuitConsist(loop,homeCityId){
  const length=loop?.length;if(!Number.isFinite(length)||length<=0)return null;
  const home=loop.stops?.find(stop=>stop.cityId===homeCityId&&Number.isFinite(stop.distance));if(!home)return null;
  const origin=wrap(home.distance,length),seen=new Set([homeCityId]);
  const ordered=(loop.stops??[]).filter(stop=>Number.isFinite(stop.distance)&&stop.cityId!==homeCityId)
    .map(stop=>({...stop,relativeDistance:wrap(stop.distance-origin,length)})).sort((a,b)=>a.relativeDistance-b.relativeDistance);
  const unique=[home];
  for(const stop of ordered)if(!seen.has(stop.cityId)){seen.add(stop.cityId);unique.push(stop);}
  if((loop.cityIds??[]).some(id=>!seen.has(id)))return null;
  const cars=unique.map((stop,index)=>{
    const offset=index*TRAIN_CAR_SPACING,stationDistance=wrap(stop.distance,length),distance=wrap(stationDistance-origin+offset,length);
    return {index,cityId:stop.cityId,stationId:stop.stationId??null,offset,stationDistance,
      loadDistance:distance<EPS||length-distance<EPS?0:distance};
  });
  if(length+EPS<cars.length*TRAIN_CAR_SPACING)return {fits:false,minimumLength:cars.length*TRAIN_CAR_SPACING,cars,origin};
  const stops=[];
  for(const car of [...cars].sort((a,b)=>a.loadDistance-b.loadDistance||a.index-b.index)){
    const previous=stops.at(-1);
    if(previous&&Math.abs(previous.distance-car.loadDistance)<=EPS)previous.carIndices.push(car.index);
    else stops.push({distance:car.loadDistance,carIndices:[car.index]});
  }
  return {fits:true,cars,origin,departure:stops[0].carIndices,stops:stops.slice(1)};
}
