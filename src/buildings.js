import * as THREE from 'three';
import { box, cylinder, roof, group, beam, v, ico } from './geometry.js';
import { pick, range, rng } from './palette.js';

export const chimneys=[];
export const windmills=[];

export function house(parent,x,z,{w=2.5,d=2.2,h=2.5,rotation=0,wall,roofColor,shop=false}={}) {
  const g=group(parent,x,0,z,rotation);
  wall ||= pick(['plaster','peach','blush','sage','blue']);
  roofColor ||= pick(['roof','roof','roofLight','roofDark']);
  box(g,0,.13,0,w+.18,.26,d+.18,'platform');
  box(g,0,h/2+.2,0,w,h,d,wall);
  box(g,0,h+.19,0,w+.13,.18,d+.13,'trim');
  roof(g,w+.48,d+.5,.95,h+.27,roofColor);
  box(g,0,.35,d/2+.03,w,.24,.12,'trim');
  box(g,0,.72,d/2+.035,.43,1.06,.08,'timber');
  box(g,.12,.75,d/2+.085,.055,.055,.035,'gold');
  for(const side of [-1,1]){
    for(let floor=0;floor<(h>2.8?2:1);floor++){
      const yy=.97+floor*1.28;
      for(const xx of [-w*.29,w*.29]){
        box(g,xx,yy,side*(d/2+.03),.48,.68,.1,'trim');
        box(g,xx,yy+.02,side*(d/2+.09),.35,.51,.025,'window');
        box(g,xx,yy,side*(d/2+.11),.035,.51,.025,'trim');
        box(g,xx,yy-.04,side*(d/2+.11),.35,.035,.03,'trim');
        box(g,xx,yy-.36,side*(d/2+.12),.58,.09,.22,'trim');
        if(shop&&floor===0&&side===1){
          box(g,xx,yy-.36,side*(d/2+.26),.53,.12,.28,'timber');
          for(let k=0;k<3;k++)ico(g,xx+(k-1)*.16,yy-.22,d/2+.25,.13,.13,.13,pick(['redLight','leafPink','white']));
        }
      }
    }
  }
  for(const side of [-1,1]){
    box(g,side*(w/2+.025),h*.64,0,.06,.67,.45,'trim');
    box(g,side*(w/2+.065),h*.64,0,.025,.53,.32,'window');
  }
  box(g,0,h+.48,d/2+.02,.33,.36,.06,'trim');
  box(g,0,h+.48,d/2+.06,.22,.25,.04,'window');
  if(rng()>.24){
    box(g,w*.25,h+.87,-d*.18,.34,1.12,.39,'roofDark');
    box(g,w*.25,h+1.45,-d*.18,.43,.14,.48,'trim');
    if(rng()>.50){g.updateMatrixWorld(true);chimneys.push(g.localToWorld(v(w*.25,h+1.57,-d*.18)));}
  }
  if(shop){
    const awning=box(g,0,1.77,d/2+.53,w+.06,.14,.97,'white');awning.rotation.x=.15;
    for(let k=0;k<5;k++)box(g,-w*.44+k*w*.22,1.74,d/2+.54,w*.11,.15,.99,'redLight').rotation.x=.15;
    box(g,0,1.59,d/2+1.01,w+.06,.18,.07,'redLight');
  }
  return g;
}

export function clock(parent,x,y,z,s=.9){
  const g=group(parent,x,y,z);
  const face=cylinder(g,0,0,0,s,s,.08,'white',20);face.rotation.x=Math.PI/2;
  for(let i=0;i<12;i++){
    const a=i*Math.PI/6;
    box(g,Math.sin(a)*s*.79,Math.cos(a)*s*.79,.055,.035,.10,.02,'metal',0).rotation.z=-a;
  }
  beam(g,v(0,0,.08),v(-s*.34,s*.24,.08),.06,'metal');
  beam(g,v(0,0,.08),v(s*.04,s*.60,.08),.045,'metal');
  return g;
}

export function townHall(parent,x,z){
  const g=group(parent,x,0,z);
  house(g,0,0,{w:4.1,d:2.7,h:3.1,wall:'plaster',roofColor:'roof'});
  box(g,0,3.05,.6,1.63,5.9,1.65,'peach');
  box(g,0,5.8,.6,1.82,.22,1.84,'trim');
  box(g,0,4.1,1.46,1.77,.16,.13,'trim');
  clock(g,0,4.96,1.48,.55);
  roof(g,2.1,2.15,1.1,5.93,'roofDark').position.z=.6;
  cylinder(g,0,7.25,.6,.045,.06,.65,'gold');
  ico(g,0,7.6,.6,.12,.12,.12,'gold');
  for(const x of [-1.4,1.4])box(g,x,1.04,1.6,.14,2,.3,'trim');
  return g;
}

export function station(parent,x,z,rotation=0){
  const g=group(parent,x,0,z,rotation);
  box(g,0,.15,0,10,.3,2.8,'platform');
  box(g,0,.31,1.31,10,.035,.13,'white');
  for(let i=-4;i<=4;i++)box(g,i,.32,1.13,.37,.025,.11,'gold');
  house(g,-1,-1.8,{w:4,d:2.5,h:2.1,wall:'plaster',roofColor:'roofBlue'});
  for(const x of [-4,-1,2,4]){
    cylinder(g,x,1.15,.28,.065,.065,2,'teal',6);
    beam(g,v(x,1.55,.28),v(x,2.04,1.05),.065,'teal');
  }
  box(g,0,2.2,.4,9.9,.16,1.8,'roofBlue');
  box(g,0,2.13,1.29,9.9,.15,.1,'teal');
  clock(g,-1,2.42,-.49,.34);
  for(const x of [2.5,-3.3]){
    box(g,x,.63,.2,1.1,.12,.35,'timber');
    box(g,x,.87,-.01,1.1,.36,.09,'timber');
    box(g,x-.39,.46,.2,.08,.28,.3,'metal');box(g,x+.39,.46,.2,.08,.28,.3,'metal');
  }
  box(g,4,.6,-.5,.48,.58,.42,'teal');
  return g;
}

export function lamp(parent,x,z){
  cylinder(parent,x,1.3,z,.045,.07,2.6,'metal',6);
  box(parent,x,2.65,z,.28,.35,.28,'gold');
  cylinder(parent,x,2.89,z,.02,.23,.17,'roofBlue',4);
}

export function church(parent,x,z){
  const g=group(parent,x,0,z,-.13);
  house(g,0,0,{w:3.6,d:5.1,h:3.2,wall:'plaster',roofColor:'roofBlue'});
  box(g,0,2.8,2.2,1.8,5.6,1.9,'plaster');
  box(g,0,5.58,2.2,2.05,.2,2.15,'trim');
  for(const dx of [-.5,.5])box(g,dx,4.85,3.18,.29,.83,.06,'window');
  cylinder(g,0,6.83,2.2,.0,1.55,2.5,'teal',4).rotation.y=Math.PI/4;
  beam(g,v(0,8.0,2.2),v(0,8.75,2.2),.06,'gold');
  beam(g,v(-.22,8.48,2.2),v(.22,8.48,2.2),.06,'gold');
}

export function windmill(parent,x,z){
  const g=group(parent,x,0,z);
  cylinder(g,0,2.2,0,.75,1.25,4.4,'plaster',8);
  cylinder(g,0,4.9,0,0,1.05,1.2,'roofDark',8);
  box(g,0,.7,1.13,.48,1.3,.08,'timber');
  box(g,0,2.6,.84,.35,.58,.09,'window');
  const sails=group(g,0,3.95,1.0);
  cylinder(sails,0,0,0,.17,.17,.3,'timber').rotation.x=Math.PI/2;
  for(let j=0;j<4;j++){
    const arm=group(sails,0,0,0);arm.rotation.z=j*Math.PI/2+.2;
    box(arm,0,1.45,0,.095,3.0,.12,'timber');
    box(arm,.28,1.83,.02,.60,1.75,.07,'trim');
    for(let k=0;k<6;k++)box(arm,.28,1.1+k*.29,.08,.62,.045,.05,'timber');
    box(arm,.56,1.83,.09,.05,1.76,.05,'timber');
  }
  windmills.push(sails);
}

export function person(parent,x,z,shirt='red',rotation=0){
  const g=group(parent,x,0,z,rotation);
  box(g,0,.62,0,.23,.38,.19,shirt);
  ico(g,0,.91,0,.14,.15,.14,'peach');
  box(g,-.07,.27,0,.075,.39,.095,'metal');box(g,.07,.27,0,.075,.39,.095,'metal');
  beam(g,v(-.15,.76,0),v(-.18,.46,.04),.065,'peach');
  beam(g,v(.15,.76,0),v(.18,.46,.04),.065,'peach');
  if(rng()>.5)cylinder(g,0,1.04,0,.17,.17,.075,'gold',8);
}

export function car(parent,x,z,mat='red',rotation=0){
  const g=group(parent,x,0,z,rotation);
  box(g,0,.4,0,.89,.35,1.65,mat);
  box(g,0,.71,-.05,.77,.36,.82,mat);
  box(g,0,.74,.38,.65,.23,.035,'window').rotation.x=-.18;
  box(g,0,.74,-.49,.65,.23,.035,'window').rotation.x=.18;
  for(const s of [-1,1]){
    box(g,s*.399,.72,-.05,.035,.23,.65,'window');
    for(const zz of [-.5,.52])cylinder(g,s*.47,.28,zz,.19,.19,.12,'metal',8).rotation.z=Math.PI/2;
    box(g,s*.29,.44,.84,.16,.12,.06,'white');
  }
  return g;
}
