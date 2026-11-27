import * as THREE from 'three';
import {M} from './palette.js';

export const TRAVELLER_SWING_DURATION=.58;
const ease=t=>t*t*(3-2*t);

/** One small painted figure, shared by every camera layer. Broad shapes and
 * single-piece limbs keep the silhouette legible even from the strategy view. */
export function createTravellerArt(parent,{coatMaterial=M.teal,capMaterial=M.redLight,trouserMaterial=M.roofBlue}={}){
  const root=new THREE.Group();root.name='walking-traveller';parent.add(root);
  const body=new THREE.Group();body.name='traveller-body';root.add(body);
  const box=new THREE.BoxGeometry(1,1,1),sphere=new THREE.IcosahedronGeometry(1,0);
  const cap=new THREE.CylinderGeometry(.118,.125,.055,8);
  // The blade is one tapered, closed prism. Its wooden handle meets the socket
  // inside the head, and the gripping mitten remains attached to the same arm.
  const bladeShape=new THREE.Shape();
  bladeShape.moveTo(.038,-.045);bladeShape.lineTo(.038,.045);
  bladeShape.lineTo(-.17,.10);bladeShape.lineTo(-.17,-.10);bladeShape.closePath();
  const blade=new THREE.ExtrudeGeometry(bladeShape,{depth:.065,bevelEnabled:false,steps:1});
  blade.rotateY(Math.PI/2);blade.translate(-.0325,0,0);
  const geometries=[box,sphere,cap,blade];
  function part(group,name,x,y,z,w,h,d,material,geometry=box){
    const mesh=new THREE.Mesh(geometry,material);mesh.name=name;mesh.position.set(x,y,z);mesh.scale.set(w,h,d);
    mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;
  }
  part(body,'traveller-coat',0,.385,0,.24,.26,.16,coatMaterial);
  part(body,'traveller-face',0,.59,.006,.115,.10,.115,M.peach,sphere);
  part(body,'traveller-cap',0,.6875,-.006,1,1,1,capMaterial,cap);
  part(body,'cap-brim',0,.666,.085,.18,.022,.09,capMaterial);
  for(const side of [-1,1])part(body,'eye',side*.034,.603,.100,.014,.018,.015,M.window);
  const arms=[],legs=[];
  for(const side of [-1,1]){
    // The figure faces +Z, so its anatomical right is -X.
    const arm=new THREE.Group();arm.name=side<0?'right-arm':'left-arm';arm.position.set(side*.146,.48,0);arm.rotation.order='YXZ';body.add(arm);arms.push(arm);
    part(arm,'sleeve',0,-.06,0,.066,.15,.10,coatMaterial);
    part(arm,'mitten',0,-.145,.008,.045,.045,.046,M.peach,sphere);
    const leg=new THREE.Group();leg.name=side<0?'right-leg':'left-leg';leg.position.set(side*.055,.29,0);root.add(leg);legs.push(leg);
    part(leg,'trousers',0,-.14,0,.075,.30,.10,trouserMaterial);
    part(leg,'boot',0,-.285,.015,.09,.08,.13,M.timber);
  }
  const rightArm=arms[0],axe=new THREE.Group();axe.name='traveller-axe';axe.position.set(0,-.145,.008);axe.scale.setScalar(.82);rightArm.add(axe);
  part(axe,'axe-handle',0,-.105,0,.037,.33,.041,M.timber);
  part(axe,'axe-head',0,-.225,0,1,1,1,M.rail,blade);
  const shadowMaterial=new THREE.MeshBasicMaterial({color:0x173c37,transparent:true,opacity:.16,depthWrite:false});
  const shadowGeometry=new THREE.CircleGeometry(.18,16);geometries.push(shadowGeometry);
  const shadow=new THREE.Mesh(shadowGeometry,shadowMaterial);shadow.matrixAutoUpdate=false;shadow.name='traveller-contact-shadow';parent.add(shadow);
  return{root,body,arms,legs,rightArm,axe,shadow,dispose(){geometries.forEach(g=>g.dispose());shadowMaterial.dispose();}};
}

/** Shared toy-like gait and right-hand axe sweep, independent of movement AI. */
export function poseTravellerArt(art,{gait=0,moving=0,running=0,grounded=true,swingElapsed=TRAVELLER_SWING_DURATION}={}){
  art.body.position.y=grounded?Math.abs(Math.sin(gait))*.008*moving:0;
  art.body.rotation.x=grounded?running*moving*.07:0;
  art.body.rotation.z=grounded?Math.sin(gait)*moving*.025:0;
  art.body.rotation.y=0;
  for(let side=0;side<2;side++){
    const phase=gait+side*Math.PI;
    const angle=grounded?Math.sin(phase)*(.22+running*.10)*moving:(side===0?-.16:.16);
    const lift=grounded?Math.max(0,Math.cos(phase))*(.024+running*.018)*moving:.025;
    const leg=art.legs[side];leg.rotation.x=angle;
    // Compensate the tilted boot's lowest corner. Even this deliberately
    // simple step keeps the solid feet above the shared supporting surface.
    leg.position.y=-.035+.325*Math.cos(angle)+(Math.sin(angle)>0?.08:.05)*Math.abs(Math.sin(angle))+lift;
    art.arms[side].rotation.y=0;art.arms[side].position.z=0;
    art.arms[side].rotation.x=grounded?-Math.sin(phase)*(side===0?.10:.24)*moving:-.2;
    art.arms[side].rotation.z=side===0?-.10:.06;
  }
  art.axe.rotation.y=0;
  if(swingElapsed<TRAVELLER_SWING_DURATION){
    // Wind to the right, sweep across the chest, then return to the side.
    // The arm's yaw carries the tool horizontally; pitch never lifts it
    // overhead. A small forward shoulder shift clears the front of the coat.
    const t=swingElapsed/TRAVELLER_SWING_DURATION;
    let weight,yaw;
    if(t<.25){weight=ease(t/.25);yaw=-.95*weight;}
    else if(t<.65){weight=1;yaw=THREE.MathUtils.lerp(-.95,1.15,ease((t-.25)/.40));}
    else{weight=1-ease((t-.65)/.35);yaw=1.15*weight;}
    art.rightArm.rotation.set(-1.27*weight,yaw,-.10*(1-weight));
    art.rightArm.position.z=.075*weight;
    // Turn the grip around the handle so the cutting edge leads the sweep.
    // Without this quarter turn, pitching the arm points the blade skyward.
    art.axe.rotation.y=Math.PI/2*weight;
    art.body.rotation.y=yaw*.08;
  }
}
