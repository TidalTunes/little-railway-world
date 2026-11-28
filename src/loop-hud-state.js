import {LOOP_ECONOMY_RULES,loopTrainCost} from './loop-economy-rules.js';
const labels={resources:'Resources',wood:'Resources',metal:'Resources',food:'Food'};
export const loopResourceLabel=resource=>labels[resource]??'Resources';
export function loopCargo(loop,city){
  const stops=new Map((loop?.stops??[]).map(stop=>[stop.cityId,stop.resource]));
  // This is the route's maximum yield. Each destination must have stock when
  // the train reaches it; returning home only unloads cargo.
  stops.delete(city?.id??loop?.homeCityId);
  const result={resources:0,food:0};for(const value of stops.values()){
    const resource=value==='wood'||value==='metal'?'resources':value;
    if(Object.hasOwn(result,resource))result[resource]+=LOOP_ECONOMY_RULES.pickup;
  }
  return result;
}
export function loopTrainStatus(trains,loopId,homeCityId){
  const counts={queued:0,traffic:0,loading:0,moving:0};
  for(const train of loopId?trains??[]:[]){
    if(train.loopId!==loopId||train.homeCityId!==homeCityId)continue;
    if(train.state==='queued'||train.active===false)counts.queued++;
    else if(train.waitReason==='traffic'||train.blocked)counts.traffic++;
    else if(train.state==='dwell'||train.state==='dwelling')counts.loading++;
    else counts.moving++;
  }
  const words={queued:'queued',traffic:'in traffic',loading:'loading',moving:'running'};
  return{counts,label:Object.entries(counts).filter(([,count])=>count).map(([key,count])=>`${count} ${words[key]}`).join(' · ')};
}
export function loopHudState({city,ownCity,houses=1,resources={},trains=[],walking=true,ownerId,selectedLoopId}={}){
  const home=ownCity??(city?.ownerId===ownerId?city:null),loops=home?.loops??[],selected=loops.find(loop=>loop.id===selectedLoopId)??null;
  const inspected=selected?home:city,owned=inspected?.ownerId===ownerId;
  const stock=Number.isFinite(resources.resources)?resources.resources:0,cost=selected?loopTrainCost(selected.cityIds?.length??0):0,station=inspected?.hasStation??(inspected?.level>=2),count=inspected?.houseCount??houses;
  const destinationCount=new Set((selected?.cityIds??[]).filter(id=>id!==home?.id)).size;
  const departureGold=selected?(selected.departureGold??destinationCount*(LOOP_ECONOMY_RULES.pickupGold??1)):0;
  const foodStock=inspected?.stock?.food??inspected?.foodStock;
  return{city:inspected,owned,loops,selected,resource:inspected?.resource??null,station,houseCount:count,
    foodStock:Number.isFinite(foodStock)?Math.max(0,Math.floor(foodStock)):null,departureGold,
    trainStatus:loopTrainStatus(trains,selected?.id,home?.id),
    compact:walking,showRoutes:!walking&&owned&&!!selected,canBuy:!walking&&!!selected&&owned&&stock>=cost,cost,costResource:'resources',shortfall:Math.max(0,cost-stock),cargo:loopCargo(selected,inspected)};
}
