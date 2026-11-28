import * as THREE from 'three';
import {M} from './palette.js';

const UP=new THREE.Vector3(0,1,0),TAU=Math.PI*2;
const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
const unit=value=>THREE.MathUtils.clamp(finite(value),0,1);
const recoil=value=>value>.18&&value<.45?Math.sin((value-.18)/.27*Math.PI):0;
const materials=palette=>({body:M.teal,light:M.sage,dark:M.roofBlue,roof:M.teal,accent:M.leafLight,trim:M.trim,
  graphite:M.metal,steel:M.rail,rubber:M.window,skin:M.peach,glass:M.window,canvas:M.timber,...palette});

/** Geometries are private to one figure; materials always belong to its caller.
 * A few shared primitives keep the articulated meshes cheap to compile into
 * the same instanced rig used by a large animated army. */
function figure(parent,kind,palette){
  const root=new THREE.Group();root.name=kind;root.userData.kind=kind;parent?.add(root);
  const owned=new Set(),p=materials(palette),box=own(new THREE.BoxGeometry(1,1,1));
  const cylinder=own(new THREE.CylinderGeometry(1,1,1,8)),sphere=own(new THREE.IcosahedronGeometry(1,0));
  const direction=new THREE.Vector3();let disposed=false;
  function own(geometry){owned.add(geometry);return geometry;}
  function group(parent,name,x=0,y=0,z=0){const node=new THREE.Group();node.name=name;node.position.set(x,y,z);parent.add(node);return node;}
  function mesh(parent,name,geometry,material,x=0,y=0,z=0,w=1,h=1,d=1){
    const node=new THREE.Mesh(geometry,material);node.name=name;node.position.set(x,y,z);node.scale.set(w,h,d);
    node.castShadow=node.receiveShadow=true;parent.add(node);return node;
  }
  function block(parent,name,x,y,z,w,h,d,material){return mesh(parent,name,box,material,x,y,z,w,h,d);}
  function beamPose(node,a,b,width,depth=width){
    direction.subVectors(b,a);node.position.copy(a).add(b).multiplyScalar(.5);
    node.scale.set(width,direction.length(),depth);node.quaternion.setFromUnitVectors(UP,direction.normalize());
  }
  function beam(parent,name,a,b,width,material,geometry=box,depth=width){
    const node=mesh(parent,name,geometry,material);beamPose(node,new THREE.Vector3(...a),new THREE.Vector3(...b),width,depth);return node;
  }
  function dispose(){if(disposed)return;disposed=true;root.removeFromParent();root.clear();for(const geometry of owned)geometry.dispose();owned.clear();}
  return{root,p,box,cylinder,sphere,own,group,mesh,block,beam,beamPose,dispose,get disposed(){return disposed;}};
}

/** A station-passenger-sized painted soldier. Both mitten grips belong to the
 * rifle, while two solid sleeve beams stay joined to the shoulders. */
export function createSoldierArt(parent,{palette}={}){
  const f=figure(parent,'soldier',palette),{root,p,group,mesh,block}=f;
  const aim=group(root,'soldier-aim',0,.29,0);
  block(aim,'soldier-coat',0,.105,0,.245,.265,.17,p.body);
  block(aim,'soldier-belt',0,-.002,.004,.249,.026,.18,p.dark);
  block(aim,'soldier-collar',0,.235,.012,.115,.026,.106,p.light);
  mesh(aim,'soldier-face',f.sphere,p.skin,0,.304,.008,.114,.108,.113);
  const helmet=f.own(new THREE.CylinderGeometry(.087,.124,.086,8));
  mesh(aim,'soldier-helmet',helmet,p.body,0,.414,-.008);
  block(aim,'soldier-helmet-rim',0,.375,.009,.259,.022,.25,p.roof);
  for(const side of [-1,1])block(aim,'soldier-eye',side*.033,.313,.104,.012,.016,.009,p.graphite);
  const legs=[];
  for(const side of [-1,1]){
    const leg=group(root,side<0?'soldier-right-leg':'soldier-left-leg',side*.056,.27,0);legs.push(leg);
    block(leg,'soldier-trousers',0,-.105,0,.08,.23,.10,p.dark);
    block(leg,'soldier-boot',0,-.23,.015,.094,.08,.13,p.rubber);
  }
  const weapon=group(aim,'soldier-rifle',-.066,.167,.11);
  block(weapon,'rifle-stock',0,0,-.103,.058,.062,.145,p.dark);
  block(weapon,'rifle-receiver',0,0,.018,.067,.06,.13,p.graphite);
  block(weapon,'rifle-handguard',0,.004,.111,.064,.058,.115,p.dark);
  block(weapon,'rifle-magazine',0,-.058,.028,.038,.072,.053,p.graphite);
  const barrel=mesh(weapon,'rifle-barrel',f.cylinder,p.steel,0,.007,.227,.014,.126,.014);barrel.rotation.x=Math.PI/2;
  const tip=mesh(weapon,'rifle-tip',f.cylinder,p.graphite,0,.007,.294,.020,.03,.020);tip.rotation.x=Math.PI/2;
  const muzzle=new THREE.Object3D();muzzle.name='soldier-muzzle';muzzle.position.set(0,.007,.309);muzzle.userData.projectile='tracer';weapon.add(muzzle);
  const grips=[new THREE.Vector3(0,-.039,-.05),new THREE.Vector3(.006,-.036,.13)];
  const shoulders=[new THREE.Vector3(-.145,.197,0),new THREE.Vector3(.145,.197,0)],hand=new THREE.Vector3();
  const arms=grips.map((grip,index)=>{
    mesh(weapon,index?'soldier-support-hand':'soldier-trigger-hand',f.sphere,p.skin,grip.x,grip.y,grip.z,.036,.037,.036);
    return block(aim,index?'soldier-left-arm':'soldier-right-arm',0,0,0,.066,.15,.085,p.body);
  });
  root.userData.animatedNodes=['soldier-aim','soldier-rifle','soldier-right-arm','soldier-left-arm','soldier-right-leg','soldier-left-leg'];
  function pose({time=0,moving=0,attack=0,aimYaw=0,elevation=0}={}){
    if(f.disposed)return;
    time=finite(time);moving=unit(moving);attack=unit(attack);const gait=(time%1)*TAU,kick=recoil(attack);
    aim.position.y=.29+Math.abs(Math.sin(gait))*.005*moving;aim.position.z=-.009*kick;
    aim.rotation.set(0,finite(aimYaw)%TAU,0);
    weapon.position.z=.11-.022*kick;weapon.rotation.x=-THREE.MathUtils.clamp(finite(elevation),-.55,.85)+.022*kick;weapon.updateMatrix();
    for(let i=0;i<2;i++){
      const phase=gait+i*Math.PI,angle=Math.sin(phase)*.27*moving,leg=legs[i];leg.rotation.x=angle;
      leg.position.y=.27*Math.cos(angle)+(Math.sin(angle)>0?.08:.05)*Math.abs(Math.sin(angle))+Math.max(0,Math.cos(phase))*.021*moving;
      hand.copy(grips[i]).applyMatrix4(weapon.matrix);f.beamPose(arms[i],shoulders[i],hand,.066,.08);
    }
  }
  pose();return{root,muzzle,pose,dispose:f.dispose};
}

/** Closed faceted shell. Glass uses the same vertices as the painted body,
 * so cockpit seams cannot float above or clip through the fuselage. */
function fuselageGeometry(){
  const sections=[[-.84,.15,.17,.68],[-.48,.36,.27,.69],[.24,.34,.29,.71],[.78,.22,.19,.68],[1.05,.055,.075,.63]];
  const ring=[[-.7,-1],[.7,-1],[1,-.35],[1,.45],[.55,1],[-.55,1],[-1,.45],[-1,-.35]],points=[];
  for(const[z,w,h,y]of sections)for(const[x,v]of ring)points.push([x*w,y+v*h,z]);
  const positions=[],groups=[];
  function triangle(a,b,c,material){const start=positions.length/3;positions.push(...a,...b,...c);groups.push({start,count:3,material});}
  for(let i=0;i<sections.length-1;i++)for(let j=0;j<8;j++){
    const a=points[i*8+j],b=points[i*8+(j+1)%8],c=points[(i+1)*8+(j+1)%8],d=points[(i+1)*8+j];
    const material=i>=2&&j>=3&&j<=5?1:j===0?2:0;triangle(a,b,d,material);triangle(b,c,d,material);
  }
  for(let j=1;j<7;j++){triangle(points[0],points[j+1],points[j],0);triangle(points.at(-8),points[32+j],points[32+j+1],0);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.computeVertexNormals();
  // Consecutive equal-material faces share draw groups; no material is cloned.
  for(const item of groups){const last=geometry.groups.at(-1);if(last?.materialIndex===item.material)last.count+=item.count;else geometry.addGroup(item.start,item.count,item.material);}
  return geometry;
}

function finGeometry(){
  const profile=[[.83,-1.82],[1.42,-2.08],[1.17,-2.25],[.83,-2.17]],points=[];
  for(const x of [-.034,.034])for(const[y,z]of profile)points.push(x,y,z);
  const indices=[0,2,1,0,3,2,4,5,6,4,6,7];
  for(let i=0;i<4;i++){const j=(i+1)%4;indices.push(i,j,i+4,j,j+4,i+4);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}

/** The caller sets the fixed flight altitude on root. The rotor and recoil
 * animate without shifting the fuselage above or below that flight plane. */
export function createHelicopterArt(parent,{palette}={}){
  const f=figure(parent,'helicopter',palette),{root,p,group,mesh,block}=f;
  const aim=group(root,'helicopter-aim'),body=group(aim,'helicopter-body');
  mesh(body,'helicopter-fuselage',f.own(fuselageGeometry()),[p.body,p.glass,p.dark]);
  const boomGeometry=f.own(new THREE.CylinderGeometry(.054,.127,1,6));
  f.beam(body,'helicopter-tail-boom',[0,.70,-.68],[0,.97,-2.12],1,p.body,boomGeometry);
  mesh(body,'helicopter-tail-fin',f.own(finGeometry()),p.roof);
  block(body,'helicopter-tailplane',0,.91,-1.81,.67,.045,.23,p.accent);
  f.beam(body,'cockpit-center-frame',[0,1.008,.24],[0,.876,.78],.021,p.graphite);
  f.beam(body,'cockpit-front-frame',[0,.876,.78],[0,.706,1.05],.021,p.graphite);
  for(const side of [-1,1]){
    f.beam(body,'helicopter-skid',[side*.44,.035,-.66],[side*.44,.035,.72],.035,p.graphite,f.cylinder);
    f.beam(body,'helicopter-skid-toe',[side*.44,.035,.72],[side*.44,.105,.90],.035,p.graphite,f.cylinder);
    for(const z of [-.43,.46])f.beam(body,'helicopter-skid-strut',[side*.25,.48,z],[side*.44,.07,z],.033,p.steel,f.cylinder);
    const wing=block(body,'helicopter-stub-wing',side*.57,.61,-.05,.66,.07,.34,p.body);wing.rotation.z=-side*.08;
    const pod=mesh(body,'helicopter-rocket-pod',f.cylinder,p.dark,side*.82,.50,.09,.145,.68,.145);pod.rotation.x=Math.PI/2;
    const rim=mesh(body,'rocket-pod-rim',f.cylinder,p.steel,side*.82,.50,.435,.147,.025,.147);rim.rotation.x=Math.PI/2;
    const face=mesh(body,'rocket-pod-face',f.cylinder,p.graphite,side*.82,.50,.451,.119,.012,.119);face.rotation.x=Math.PI/2;
    for(const [x,y]of [[-.047,-.027],[.047,-.027],[0,.054]]){
      const tube=mesh(body,'rocket-tube',f.cylinder,p.rubber,side*.82+x,.50+y,.459,.031,.008,.031);tube.rotation.x=Math.PI/2;
    }
  }
  mesh(body,'helicopter-rotor-mast',f.cylinder,p.steel,0,1.135,-.11,.055,.32,.055);
  const rotor=group(body,'helicopter-main-rotor',0,1.31,-.11);
  block(rotor,'main-rotor-blade',0,0,0,4.5,.028,.13,p.graphite);block(rotor,'main-rotor-blade',0,.007,0,.13,.028,4.5,p.graphite);
  for(const side of [-1,1]){block(rotor,'main-rotor-tip',side*2.10,.016,0,.23,.012,.131,p.trim);block(rotor,'main-rotor-tip',0,.023,side*2.10,.131,.012,.23,p.trim);}
  mesh(rotor,'main-rotor-hub',f.cylinder,p.dark,0,.034,0,.11,.078,.11);
  const tailRotor=group(body,'helicopter-tail-rotor',-.10,1.04,-2.12);
  block(tailRotor,'tail-rotor-blade',0,0,0,.035,.61,.065,p.graphite);block(tailRotor,'tail-rotor-blade',-.007,0,0,.035,.065,.61,p.graphite);
  const tailHub=mesh(tailRotor,'tail-rotor-hub',f.cylinder,p.steel,0,0,0,.055,.12,.055);tailHub.rotation.z=Math.PI/2;
  const muzzle=new THREE.Object3D();muzzle.name='helicopter-muzzle';muzzle.position.set(-.82,.554,.463);muzzle.userData.projectile='rocket';body.add(muzzle);
  root.userData.animatedNodes=['helicopter-aim','helicopter-body','helicopter-main-rotor','helicopter-tail-rotor'];
  function pose({time=0,moving=0,attack=0,aimYaw=0,elevation=0}={}){
    if(f.disposed)return;
    time=finite(time);moving=unit(moving);attack=unit(attack);const phase=(time%1)*TAU,kick=recoil(attack);
    aim.rotation.y=finite(aimYaw)%TAU;body.position.y=0;body.position.z=-.018*kick;
    body.rotation.set(-THREE.MathUtils.clamp(finite(elevation),-.5,.65)-moving*.035+.012*kick,0,0);
    rotor.rotation.y=(phase*4)%TAU;tailRotor.rotation.x=(phase*6)%TAU;
  }
  pose();return{root,muzzle,pose,dispose:f.dispose};
}
