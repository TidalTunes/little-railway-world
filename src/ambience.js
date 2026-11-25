import * as THREE from 'three';
import { box,cylinder,ico,beam,v,group,mesh,consolidate } from './geometry.js';
import { M,C,range,rng } from './palette.js';
import { river, inIsland } from './landscape.js';
import { chimneys, windmills } from './buildings.js';

export function ambience(scene,trains){
  const ripples=[];
  for(let i=0;i<85;i++){
    const t=rng(),p=river.getPointAt(t),d=river.getTangentAt(t),n=v(-d.z,0,d.x).multiplyScalar(range(-2.5,2.5));p.add(n);
    const m=box(scene,p.x,.115,p.z,range(.18,.85),.012,.045,'foam',-Math.atan2(d.z,d.x));
    m.castShadow=false;m.receiveShadow=false;
    ripples.push({mesh:m,t,offset:n,phase:range(0,6.28)});
  }
  const boat=group(scene);
  const hull=new THREE.CylinderGeometry(.53,.32,1.95,5,1);hull.rotateX(Math.PI/2);
  const hullMesh=mesh(boat,hull,'roofDark',0,.33,0);hullMesh.scale.y=.65;
  box(boat,0,.44,0,.8,.12,1.8,'trim');
  box(boat,0,.77,-.2,.63,.55,.63,'white');
  box(boat,0,.86,.13,.48,.25,.025,'window');
  box(boat,0,1.10,-.2,.8,.12,.85,'roofBlue');
  cylinder(boat,0,1.32,-.46,.08,.08,.4,'red');
  const wake=group(boat);
  for(const s of [-1,1])beam(wake,v(s*.2,.19,-1),v(s*.95,.19,-3),.045,'foam');
  consolidate(boat);

  const sailboat=group(scene,29,.1,9.6,-1.5);
  const sailHull=ico(sailboat,0,.19,0,.55,.25,1.5,'white',0);
  cylinder(sailboat,0,1.7,0,.035,.04,3,'timber',6);
  const sailGeo=new THREE.BufferGeometry().setFromPoints([v(.08,3.05,0),v(.08,.75,0),v(.08,.75,1.2)]);sailGeo.computeVertexNormals();
  const sailMat=M.white.clone();sailMat.side=THREE.DoubleSide;mesh(sailboat,sailGeo,sailMat);
  const jib=new THREE.BufferGeometry().setFromPoints([v(.06,2.6,0),v(.06,.7,0),v(.06,.7,-.95)]);jib.computeVertexNormals();
  const jibMat=M.gold.clone();jibMat.side=THREE.DoubleSide;mesh(sailboat,jib,jibMat);
  consolidate(sailboat);

  const smoke=[];
  const smokeOrigins=[...trains.map(train=>({train})),...chimneys.slice(0,7).map(position=>({position}))];
  smokeOrigins.forEach((origin,j)=>{
    const count=origin.train?9:4;
    for(let i=0;i<count;i++){
      const mat=new THREE.MeshStandardMaterial({color:C.white,flatShading:true,transparent:true,opacity:.5,depthWrite:false,roughness:1});
      const puff=ico(scene,0,0,0,.2,.2,.2,mat,0);puff.castShadow=false;puff.receiveShadow=false;
      smoke.push({puff,origin,phase:i/count,cycle:origin.train?4.0:5.8,seed:j*.7});
    }
  });

  const balloon=group(scene,-30,18,11);
  const profile=[[.0,-2.3],[.65,-1.9],[1.65,-.8],[2.05,.5],[1.8,1.8],[.95,2.6],[0,2.85]].map(([x,y])=>new THREE.Vector2(x,y));
  for(let i=0;i<10;i++)mesh(balloon,new THREE.LatheGeometry(profile,1,i/10*Math.PI*2,Math.PI*2/10),i%2?'trim':'redLight');
  box(balloon,0,-3.3,0,.85,.65,.74,'timber');
  box(balloon,0,-2.98,0,.95,.13,.85,'gold');
  for(const x of [-.36,.36])for(const z of [-.28,.28])beam(balloon,v(x,-3,z),v(x*.95,-1.9,z*.95),.035,'timber');
  consolidate(balloon);

  const birds=[];
  for(let i=0;i<7;i++){
    const g=group(scene);const left=group(g),right=group(g);
    beam(left,v(0,0,0),v(-.35,.09,.1),.065,'white');beam(left,v(-.35,.09,.1),v(-.61,.01,.22),.05,'white');
    beam(right,v(0,0,0),v(.35,.09,.1),.065,'white');beam(right,v(.35,.09,.1),v(.61,.01,.22),.05,'white');
    ico(g,0,0,0,.07,.07,.23,'white');
    birds.push({g,left,right,phase:i*.7});
  }

  return {update(time){
    ripples.forEach(({mesh,t,offset,phase})=>{
      const p=river.getPointAt((t+time*.0017)%1).add(offset);
      mesh.visible=inIsland(p.x,p.z,.4);
      mesh.position.set(p.x,.115,p.z);mesh.scale.x=.6+Math.sin(time*.9+phase)*.3;
    });
    const t=.5+Math.sin(time*.011)*.29,p=river.getPointAt(t),d=river.getTangentAt(t);
    boat.position.copy(p).add(v(0,Math.sin(time*1.7)*.035,0));boat.rotation.y=Math.atan2(d.x,d.z);
    sailboat.rotation.z=Math.sin(time*.8)*.035;
    smoke.forEach(({puff,origin,phase,cycle,seed})=>{
      const age=(time/cycle+phase)%1;
      const p=origin.train?origin.train.parts[0].localToWorld(v(0,1.95,.78)):origin.position;
      puff.position.copy(p).add(v(age*2.7,age*3.7,age*.8));
      const size=(origin.train?.15:.09)+age*.53;
      puff.scale.set(size,size*.89,size);puff.material.opacity=(1-age)*.49;
      puff.rotation.set(age+seed,age*2,seed);
    });
    windmills.forEach(w=>w.rotation.z=time*.23);
    balloon.position.y=18+Math.sin(time*.35)*.35;balloon.rotation.y=Math.sin(time*.07)*.15;
    birds.forEach(({g,left,right,phase},i)=>{
      const angle=time*.045+phase*.07;
      g.position.set(4+Math.cos(angle)*10+i*.8,15+Math.sin(time*.6+phase)*.25+i*.2,4+Math.sin(angle)*6-i*.9);
      g.rotation.y=-angle;
      left.rotation.z=Math.sin(time*4.5+phase)*.32;right.rotation.z=-left.rotation.z;
    });
  }};
}
