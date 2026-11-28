const labels={resources:'Resources',wood:'Resources',metal:'Resources',food:'Food',gold:'Gold'};
export const loopResourceLabel=resource=>labels[resource]??'Resources';
export function loopCargo(loop,city){
  const stops=new Map((loop?.stops??[]).map(stop=>[stop.cityId,stop.resource]));
  if(city&&(loop?.cityIds??[]).includes(city.id))stops.set(city.id,city.resource);
  const result={resources:0,food:0};for(const value of stops.values()){
    const resource=value==='wood'||value==='metal'?'resources':value;
    if(Object.hasOwn(result,resource))result[resource]+=10;
  }
  return result;
}
export function loopHudState({city,ownCity,houses=1,resources={},walking=true,ownerId,selectedLoopId}={}){
  const home=ownCity??(city?.ownerId===ownerId?city:null),loops=home?.loops??[],selected=loops.find(loop=>loop.id===selectedLoopId)??null;
  const inspected=selected?home:city,owned=inspected?.ownerId===ownerId;
  const gold=Number.isFinite(resources.gold)?resources.gold:0,cost=selected?.cost??0,station=inspected?.hasStation??(inspected?.level>=2),count=inspected?.houseCount??houses;
  return{city:inspected,owned,loops,selected,resource:inspected?.resource??null,station,houseCount:count,
    compact:walking,showRoutes:!walking&&owned&&!!selected,canBuy:!walking&&!!selected&&owned&&gold>=cost,cost,shortfall:Math.max(0,cost-gold),cargo:loopCargo(selected,inspected)};
}
