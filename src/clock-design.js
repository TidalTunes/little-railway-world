import {box,cylinder,group} from './geometry.js';

const variantOf=(value,count)=>((Math.trunc(value)%count)+count)%count;
// Authored in each building's own coordinates. Static scenery and animated
// hands consume these exact centers, so no second version of the tower exists.
export function clockFaceSpecs(kind,variant=0){
  if(variantOf(variant,3)!==0)return [];
  if(kind==='landmark')return [
    {x:0,y:2.77,z:.745,rotation:0,radius:.38},
    {x:.745,y:2.77,z:0,rotation:Math.PI/2,radius:.38},
    {x:0,y:2.77,z:-.745,rotation:Math.PI,radius:.38},
    {x:-.745,y:2.77,z:0,rotation:-Math.PI/2,radius:.38},
  ];
  if(kind==='civic')return [{x:0,y:3.65,z:.175,rotation:0,radius:.30}];
  return [];
}
export const CLOCK_HANDS=Object.freeze([
  {length:.50,width:.075,z:.042,period:720},
  {length:.72,width:.050,z:.050,period:60},
]);
// A minute-hand revolution takes one minute of simulation time. The shorter
// hand keeps the real 12:1 ratio, and all town clocks share the same time.
export function clockHandAngle(time,index){
  return -Math.PI*2*((index===0?10/12+8/720:8/60)+(time??0)/CLOCK_HANDS[index].period);
}
export function buildClockFace(parent,spec,{palette,animated=false}={}){
  const {x,y,z,rotation=0,radius}=spec,g=group(parent,x,y,z,rotation);
  g.name='clock-face';
  const rim=cylinder(g,0,0,0,radius,radius,.06,palette?.dark??'timber',20);
  rim.rotation.x=Math.PI/2;
  const dial=cylinder(g,0,0,.033,radius*.88,radius*.88,.012,palette?.trim??'trim',20);
  dial.rotation.x=Math.PI/2;
  for(let mark=0;mark<12;mark++){
    const angle=-mark*Math.PI/6,major=mark%3===0;
    const tick=box(g,-Math.sin(angle)*radius*.73,Math.cos(angle)*radius*.73,.041,
      radius*(major?.065:.038),radius*(major?.17:.10),.006,'metal');
    tick.rotation.z=angle;tick.castShadow=false;
  }
  if(!animated)for(const [index,hand]of CLOCK_HANDS.entries()){
    const pivot=group(g);pivot.rotation.z=clockHandAngle(0,index);
    box(pivot,0,radius*hand.length*.43,hand.z,radius*hand.width,radius*hand.length,.008,'metal').castShadow=false;
  }
  const pin=cylinder(g,0,0,.047,radius*.055,radius*.055,.032,palette?.dark??'timber',8);
  pin.rotation.x=Math.PI/2;pin.castShadow=false;
  return g;
}
