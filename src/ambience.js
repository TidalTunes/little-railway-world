import * as THREE from 'three';
import { box,cylinder,ico,beam,v,group,mesh,consolidate } from './geometry.js';
import { M } from './palette.js';
import { biomeDistance,fitsBiome } from './biomes.js';
import { seededRandom,sampleLine,inWorld,surfaceHeight } from './world-model.js';
import {surfaceFor,surfacePoseMatrix,rigidSurfacePoseMatrix,warpGeometryToSurface} from './world-surface.js';

export function ambience(parent,world){
  const root=group(parent),random=seededRandom(`${world.seed}-life`),dummy=new THREE.Object3D();
  root.name='ambience';
  const curved=Boolean(surfaceFor(world)),attitude=new THREE.Matrix4(),inverseYaw=new THREE.Matrix4();
  // Animation positions stay in the generation chart. Only the render matrix
  // changes, so repeated updates never feed curved coordinates back as input.
  const pose=object=>{
    if(!curved)return;
    object.matrixAutoUpdate=false;
    rigidSurfacePoseMatrix(world,object.position.x,object.position.y,object.position.z,object.rotation.y,object.matrix);
    // Chart yaw determines the physical heading. Roll, pitch and animation
    // scale remain local to that rigid frame rather than inheriting map shear.
    attitude.makeRotationFromQuaternion(object.quaternion)
      .premultiply(inverseYaw.makeRotationY(-object.rotation.y)).scale(object.scale);
    object.matrix.multiply(attitude);object.matrixWorldNeedsUpdate=true;
  };
  const ripples=new THREE.InstancedMesh(new THREE.BoxGeometry(1,.015,.055),M.foam,64);
  ripples.name='river-ripples';
  ripples.instanceMatrix.setUsage(THREE.DynamicDrawUsage);ripples.frustumCulled=false;root.add(ripples);
  const phases=Array.from({length:world.river.length>0?64:0},()=>({s:random()*world.river.length,offset:(random()-.5)*Math.max(0,world.river.width-1.3),length:.3+random()*.7}));
  ripples.count=phases.length;
  const boat=group(root);
  boat.name='river-boat';
  ico(boat,0,.14,0,.44,.24,1.08,'roofDark');
  box(boat,0,.24,0,.68,.12,1.55,'trim');
  box(boat,0,.47,-.20,.49,.39,.60,'white');
  box(boat,0,.51,.108,.36,.23,.025,'window');
  box(boat,0,.70,-.20,.63,.08,.76,'roofBlue');
  for(const side of [-1,1])beam(boat,v(side*.22,.045,-.9),v(side*.60,.045,-2.0),.045,'foam');
  consolidate(boat);
  // Stay within the island even for authored rivers with long off-map endpoints.
  const navigable=[];
  if(world.river.length>0)for(let s=0;s<=world.river.length;s+=.5){const p=sampleLine(world.river,s);if(inWorld(world,p.x,p.z,2.5))navigable.push(s);}
  const boatStart=navigable[0]??0,boatEnd=navigable.at(-1)??0;

  const oceanLife=group(root);
  oceanLife.name='ocean-ripples';
  let sailboat=null,berth=null,best=2.2;
  if(world.biomes?.ocean.length){
    for(let i=0;i<420;i++){
      const x=(random()-.5)*world.bounds.width,z=(random()-.5)*world.bounds.depth;
      const clearance=biomeDistance(world,'ocean',x,z);
      if(clearance>best){best=clearance;berth={x,z};}
      if(i%3===0&&fitsBiome(world,['ocean'],x,z,1.1)){
        const ripple=box(oceanLife,x,world.river.y+.055,z,.6+random()*1.1,.015,.055,'foam',.15);
        ripple.castShadow=false;
      }
    }
    if(berth){
      sailboat=group(root,berth.x,world.river.y+.035,berth.z,-.6);
      sailboat.name='sailboat';
      ico(sailboat,0,.17,0,.43,.23,1.13,'white');
      cylinder(sailboat,0,1.36,0,.035,.04,2.55,'timber',6);
      const sail=new THREE.BufferGeometry().setFromPoints([v(.03,2.6,0),v(.03,.48,0),v(.03,.48,.91)]);
      sail.setIndex([0,1,2,2,1,0]);sail.computeVertexNormals();mesh(sailboat,sail,'trim');
      const jib=new THREE.BufferGeometry().setFromPoints([v(.04,2.12,-.06),v(.04,.48,-.06),v(.04,.48,-.81)]);
      jib.setIndex([0,1,2,2,1,0]);jib.computeVertexNormals();mesh(sailboat,jib,'gold');
      consolidate(sailboat);
    }
    consolidate(oceanLife);
    if(curved)oceanLife.traverse(node=>{if(node.isMesh)warpGeometryToSurface(node.geometry,world);});
  }
  const bx=-world.bounds.width*.33,bz=world.bounds.depth*.20,by=surfaceHeight(world,bx,bz)+14;
  const balloon=group(root,bx,by,bz);
  balloon.name='balloon';
  const profile=[[0,-2.0],[.55,-1.65],[1.4,-.65],[1.75,.5],[1.5,1.6],[.8,2.25],[0,2.5]].map(([x,y])=>new THREE.Vector2(x,y));
  for(let i=0;i<10;i++)mesh(balloon,new THREE.LatheGeometry(profile,1,i/10*Math.PI*2,Math.PI*2/10),i%2?'trim':'redLight');
  box(balloon,0,-2.9,0,.72,.55,.64,'timber');
  box(balloon,0,-2.62,0,.80,.10,.72,'gold');
  for(const x of [-.30,.30])for(const z of [-.25,.25])beam(balloon,v(x,-2.65,z),v(x,-1.65,z),.035,'timber');
  consolidate(balloon);
  const birds=[];
  for(let i=0;i<5;i++){
    const g=group(root),left=group(g),right=group(g);
    g.name=`bird-${i+1}`;
    beam(left,v(0,0,0),v(-.48,.10,.17),.065,'white');
    beam(right,v(0,0,0),v(.48,.10,.17),.065,'white');
    ico(g,0,0,0,.07,.07,.19,'white');consolidate(left);consolidate(right);birds.push({g,left,right});
  }
  const flightY=Math.max(10,...world.mountains.map(m=>m.height+3));
  pose(boat);if(sailboat)pose(sailboat);pose(balloon);birds.forEach(({g})=>pose(g));
  return {root,update(time){
    phases.forEach((phase,i)=>{
      const p=sampleLine(world.river,(phase.s+time*.18)%world.river.length);
      const nx=p.tangent.z,nz=-p.tangent.x;
      const x=p.x+nx*phase.offset,z=p.z+nz*phase.offset;
      dummy.position.set(x,world.river.y+.05,z);dummy.rotation.set(0,p.angle+Math.PI/2,0);
      dummy.scale.set(inWorld(world,x,z,.65)?phase.length*Math.min(1,world.river.width):0,1,Math.min(1,world.river.width/.15));
      if(curved)surfacePoseMatrix(world,x,dummy.position.y,z,dummy.rotation.y,dummy.matrix).scale(dummy.scale);
      else dummy.updateMatrix();
      ripples.setMatrixAt(i,dummy.matrix);
    });ripples.instanceMatrix.needsUpdate=true;
    const fraction=.5-Math.cos(time*.025)*.46;
    boat.visible=false;
    if(world.river.length>0){
      const p=sampleLine(world.river,boatStart+(boatEnd-boatStart)*fraction);
      boat.position.set(p.x,world.river.y+.035,p.z);boat.rotation.y=p.angle+(Math.sin(time*.025)<0?Math.PI:0);
      boat.visible=world.river.width>=1.6&&inWorld(world,p.x,p.z,2.2);
      pose(boat);
    }
    if(sailboat){sailboat.position.y=world.river.y+.035+Math.sin(time*.8)*.025;sailboat.rotation.z=Math.sin(time*.7)*.025;pose(sailboat);}
    balloon.position.y=by+Math.sin(time*.35)*.3;balloon.rotation.y=Math.sin(time*.07)*.12;
    pose(balloon);
    birds.forEach(({g,left,right},i)=>{
      const angle=time*.045+i*.09;
      g.position.set(Math.cos(angle)*13+i*.65,flightY+i*.25,Math.sin(angle)*7-i*.75);
      g.rotation.y=-angle;left.rotation.z=Math.sin(time*4.5+i*.7)*.35;right.rotation.z=-left.rotation.z;
      pose(g);
    });
  }};
}
