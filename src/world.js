import * as THREE from 'three';
import { box, cylinder, ico, beam, v, group, polygon, ribbon, consolidate } from './geometry.js';
import { rng, range, pick } from './palette.js';
import { terrain, mountain, tree, inIsland, riverDistance, field, fence, sheep } from './landscape.js';
import { railway, trackDistance } from './railway.js';
import { house, townHall, station, church, windmill, person, lamp, car } from './buildings.js';

function road(root,points,width=1.5){
  const curve=new THREE.CatmullRomCurve3(points.map(([x,z])=>v(x,.035,z)));
  ribbon(root,curve.getPoints(60),width,'sand');
}
function fountain(parent,x,z){
  const g=group(parent,x,0,z);
  cylinder(g,0,.13,0,1.7,1.8,.26,'platform',12);
  cylinder(g,0,.30,0,1.24,1.3,.34,'trim',12);
  cylinder(g,0,.49,0,1.10,1.10,.035,'water',12);
  cylinder(g,0,.86,0,.17,.27,.8,'platform');
  cylinder(g,0,1.25,0,.58,.25,.18,'trim',10);
  cylinder(g,0,1.36,0,.45,.45,.035,'waterLight',10);
  ico(g,0,1.56,0,.16,.24,.16,'trim');
}
function market(root,x,z){
  const g=group(root,x,0,z);
  for(const side of [-1,1])for(const zz of [-.7,.7])box(g,side*.9,1.0,zz,.07,1.8,.07,'timber');
  box(g,0,.79,0,1.9,.14,1.5,'timber');
  for(let i=0;i<6;i++){
    box(g,(i-2.5)*.35,1.94,0,.35,.12,1.9,i%2?'white':'gold');
    for(let j=0;j<3;j++)ico(g,(i-2.5)*.28,.95,(j-1)*.3,.12,.13,.12,i%2?'redLight':'leafLight');
  }
}

export function buildWorld(scene){
  const root=group(scene);
  terrain(root);
  const mountains=group(root);
  mountain(mountains,-17,-25,10.2,14.8);
  mountain(mountains,-4,-27,10.3,20.3);
  mountain(mountains,8,-28,7.5,12.0);
  mountains.updateMatrixWorld(true);
  const mountainRay=new THREE.Raycaster();
  for(let i=0;i<140;i++){
    const x=range(-28,17),z=range(-32,-15);
    if(!inIsland(x,z,1)||trackDistance(x,z)<2.5)continue;
    mountainRay.set(v(x,30,z),v(0,-1,0));
    const hit=mountainRay.intersectObjects(mountains.children,false)[0];
    if(hit&&hit.point.y<5.5)tree(root,x,z,range(.55,.95),'pine').position.y=hit.point.y-.12;
  }
  for(const [x,z,s] of [[-29,-22,5],[-10,-19,5],[8,-23,4],[29,-24,4],[-39,16,3]])
    ico(root,x,.25,z,s,1.6,s*.8,'grassDark',1);

  // Three neighborhoods, each organized around its own station.
  road(root,[[-31,9],[-23,9],[-15,9],[-10,12],[-11,17]],1.7);
  road(root,[[-28,5],[-27,10],[-27,15],[-20,16],[-11,17]],1.5);
  road(root,[[-21,6],[-21,10],[-21,15]],1.5);
  box(root,-20.9,.035,11.8,6.5,.08,5.6,'sand');
  townHall(root,-21,7);
  fountain(root,-21,12);
  const homes=[[-28.8,6.6,2.2,2.4],[-25.6,6.2,2.4,3.1],[-16,6.9,2.5,3.8],[-12.6,8.2,2.3,2.9],[-30,11.4,2.6,2.5],[-26.9,12.1,2.1,3.4],[-15.7,12.2,2.6,3.3],[-12.3,13.0,2.0,2.5],[-25.9,15.6,2.3,2.0]];
  homes.forEach(([x,z,w,h],i)=>house(root,x,z,{w,h,d:2.2,rotation:i%3===0?.10:0,shop:i===4||i===6}));
  station(root,-18.4,17.1,-.075);
  market(root,-24.2,11.8);market(root,-17.9,10.8);
  for(const [x,z] of [[-24,14],[-18,14],[-28,9],[-11,15]])lamp(root,x,z);
  for(let i=0;i<14;i++)person(root,range(-25,-17),range(10,15),pick(['red','white','teal','gold','blue']),range(0,6));
  car(root,-28,8.8,'blue',Math.PI/2);car(root,-11,15.3,'red',-.3);

  road(root,[[10,-19],[16,-19],[23,-19],[29,-17]],1.7);
  road(root,[[16,-25],[17,-20],[19,-15]],1.5);
  church(root,23,-23);
  house(root,11.5,-21.3,{w:2.8,d:2.5,h:3.4,wall:'blue',roofColor:'roof'});
  house(root,15,-22.2,{w:2.7,d:2.4,h:2.6,wall:'plaster'});
  house(root,11,-16.9,{w:2.4,d:2.1,h:2.3,rotation:Math.PI,wall:'sage'});
  house(root,16,-16.4,{w:2.7,d:2.3,h:3.1,rotation:Math.PI,wall:'peach',shop:true});
  house(root,28,-20.2,{w:2.7,d:2.4,h:2.9,wall:'blush'});
  house(root,31.2,-17.1,{w:2.2,d:2.4,h:2.5,wall:'plaster'});
  station(root,23,-16.8,-.1);
  for(let i=0;i<8;i++)person(root,range(12,26),range(-19.6,-18.2),pick(['teal','white','roof','gold']));
  car(root,17.2,-20.4,'gold',-.2);

  road(root,[[-3,27],[6,25],[15,24],[25,21]],1.5);
  road(root,[[7,25],[9,22],[12,20]],1.2);
  house(root,3,27.3,{w:2.2,d:2.4,h:2.3,wall:'plaster'});
  house(root,7.4,27.2,{w:2.5,d:2.3,h:2.8,wall:'peach',shop:true});
  house(root,12,26.7,{w:2.7,d:2.2,h:2.1,wall:'sage'});
  house(root,17.1,25.4,{w:2.4,d:2.5,h:3.1,wall:'plaster'});
  house(root,22,23.9,{w:2.6,d:2.3,h:2.3,wall:'blue'});
  station(root,11.3,22.6,Math.PI+.16);
  for(const [x,z] of [[4.6,24.2],[18.7,23.2],[23.1,21.8]])tree(root,x,z,.85,'gold');
  car(root,18.1,23,'teal',1.8);
  for(let i=0;i<7;i++)person(root,range(4,19),range(23.2,25),pick(['redLight','teal','white']));

  // Fields in the quiet valley, with orchard and farmyard.
  field(root,-20,-5.7,7.4,4.5,'wheat',-.12);
  field(root,-10,-5.5,7.1,4.2,'lavender',-.12);
  field(root,-1.4,-5.0,6.4,4.6,'leaf',-.12);
  windmill(root,-29,-8.5);
  house(root,-31,-15.6,{w:3.2,d:3.5,h:2.2,wall:'roof',roofColor:'roofBlue',rotation:.2});
  box(root,-31,.9,-13.79,1.3,1.5,.04,'trim');
  box(root,-31,.9,-13.75,1.1,1.35,.04,'roofDark');
  fence(root,-24,-8.9,18,-.1);
  road(root,[[-32,-13],[-28,-9],[-24,-9],[-14,-9],[-4,-8]],.85);
  for(let i=0;i<3;i++)for(let j=0;j<4;j++)tree(root,-30+i*2.5,-21+j*1.9,.58,'gold');
  for(const [x,z] of [[-26,-14],[-24,-15],[-25,-16]])cylinder(root,x,.42,z,.56,.56,.75,'wheat',8).rotation.z=Math.PI/2;
  field(root,-29,19.8,5.4,4,'wheat',.22);
  field(root,28,-5,4,5,'lavender',.2);
  fence(root,-11,28,11,0);fence(root,-12,22.5,5.6,-Math.PI/2);
  for(let i=0;i<9;i++)sheep(root,range(-10,-2),range(24,28),range(0,6.28));

  // A little waterside landing.
  const dock=group(root,15,0,7.2,.25);
  for(let j=0;j<10;j++)box(dock,0,.28,-j*.3,1.65,.16,.24,'timber');
  for(const x of [-.7,.7])for(const z of [0,-2.7])cylinder(dock,x,.3,z,.08,.08,1.0,'bark',6);
  house(root,16.7,9.3,{w:2.2,d:1.7,h:1.7,wall:'white',roofColor:'roofBlue',rotation:.25});
  person(root,15.4,7.9,'gold');

  railway(root);

  const exclusion=[[-21,11,12,8],[20,-20,13,6],[12,25,13,4],[-15,-5,16,4],[-30,-17,6,6],[-4,-26,22,8],[-7,26,6,4],[16,9,4,3],[29,-5,4,4]];
  for(let i=0;i<680;i++){
    const x=range(-43,43),z=range(-31,31);
    if(!inIsland(x,z,2)||riverDistance(x,z)<4.8||trackDistance(x,z)<2.8)continue;
    if(exclusion.some(([xx,zz,w,d])=>Math.abs(x-xx)<w&&Math.abs(z-zz)<d))continue;
    if(rng()>.73)continue;
    const type=z<-14||x<-32?'pine':pick(['pine','pine','leaf','leaf','gold']);
    tree(root,x,z,range(.65,1.25),type);
  }
  // Deliberate woodland compositions, not an even scatter.
  for(const [cx,cz] of [[-36,19],[-5,12],[5,10],[39,-15],[-34,-25]]){
    for(let i=0;i<13;i++){
      const x=cx+range(-3.2,3.2),z=cz+range(-2.9,2.9);
      if(inIsland(x,z,1)&&riverDistance(x,z)>4.5&&trackDistance(x,z)>2.1)tree(root,x,z,range(.6,1.1),i%4?'pine':'leaf');
    }
  }
  for(let i=0;i<340;i++){
    const x=range(-43,43),z=range(-30,30);
    if(!inIsland(x,z,1.5)||riverDistance(x,z)<4.4||trackDistance(x,z)<1.65)continue;
    if(exclusion.some(([xx,zz,w,d])=>Math.abs(x-xx)<w&&Math.abs(z-zz)<d))continue;
    if(i%5===0)ico(root,x,.17,z,.45,.33,.36,pick(['rock','rockLight']));
    else if(i%3===0){
      for(let j=0;j<3;j++){
        const xx=x+range(-.25,.25),zz=z+range(-.25,.25);
        cylinder(root,xx,.17,zz,.022,.025,.33,'leaf',4);
        ico(root,xx,.35,zz,.09,.09,.09,pick(['gold','white','leafPink']));
      }
    }else ico(root,x,.22,z,.42,.34,.34,'leafLight');
  }
  // Telegraph poles lend the railway a continuous human scale.
  for(const [x,z] of [[-31,20],[-6,23],[27,18],[38,-7],[-40,8]]){
    cylinder(root,x,1.7,z,.065,.09,3.4,'timber',6);
    box(root,x,3.18,z,1.4,.11,.11,'timber');
    for(const s of [-.5,0,.5])cylinder(root,x+s,3.29,z,.07,.07,.16,'white',6);
  }
  consolidate(root);
  return root;
}
