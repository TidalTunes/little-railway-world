import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {M} from './palette.js';

const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
const clamp=(value,min,max)=>Math.min(max,Math.max(min,finite(value)));
const smooth=value=>value*value*(3-2*value);
// Shared GPU clips loop at one second. Wheel speed is a complete number of
// turns in that interval; moving controls motion strength, never clip length.
const cyclePhase=time=>((finite(time)%1+1)%1)*Math.PI*2;
// Fire belongs to the caller at .18. The mechanism remains still through the
// aim, retracts immediately after firing, then settles without an elastic bounce.
function recoilAt(attack){
  const t=clamp(attack,0,1);
  if(t<=.18||t>=1)return 0;
  return t<.27?smooth((t-.18)/.09):1-smooth((t-.27)/.73);
}

function armorGeometry(){
  const outline=[[-.32,-.5],[.32,-.5],[.5,-.32],[.5,.32],[.32,.5],[-.32,.5],[-.5,.32],[-.5,-.32]];
  const rings=[[-.5,.84],[-.30,1],[.27,1],[.5,.82]].map(([y,scale])=>outline.map(([x,z])=>[x*scale,y,z*scale]));
  const positions=[],tri=(a,b,c)=>positions.push(...a,...b,...c);
  for(let ring=0;ring<rings.length-1;ring++)for(let i=0;i<8;i++){
    const j=(i+1)%8,a=rings[ring][i],b=rings[ring+1][i],c=rings[ring+1][j],d=rings[ring][j];
    tri(a,b,c);tri(a,c,d);
  }
  for(let i=0;i<8;i++){const j=(i+1)%8;tri([0,-.5,0],rings[0][i],rings[0][j]);tri([0,.5,0],rings[3][j],rings[3][i]);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.computeVertexNormals();return geometry;
}

function builder(parent,kind,palette={}){
  const root=new THREE.Group();root.name=`military-${kind}`;root.userData.kind=kind;parent?.add(root);
  const paint={body:M.teal,light:M.sage,dark:M.roofBlue,roof:M.teal,accent:M.gold,trim:M.trim,
    graphite:M.metal,steel:M.rail,rubber:M.window,glass:M.window,canvas:M.plaster,...palette};
  const owned=new Set(),own=geometry=>(owned.add(geometry),geometry);
  const cube=own(new THREE.BoxGeometry(1,1,1)),armor=own(armorGeometry());
  const cylinder=own(new THREE.CylinderGeometry(1,1,1,10));
  const group=(name,container=root,x=0,y=0,z=0)=>{const node=new THREE.Group();node.name=name;node.position.set(x,y,z);container.add(node);return node;};
  function part(container,name,geometry,material,x,y,z,w=1,h=1,d=1){
    const mesh=new THREE.Mesh(geometry,paint[material]);mesh.name=name;mesh.position.set(x,y,z);mesh.scale.set(w,h,d);
    mesh.castShadow=true;mesh.receiveShadow=true;container.add(mesh);return mesh;
  }
  const box=(container,name,material,x,y,z,w,h,d)=>part(container,name,cube,material,x,y,z,w,h,d);
  const plate=(container,name,material,x,y,z,w,h,d)=>part(container,name,armor,material,x,y,z,w,h,d);
  function round(container,name,material,x,y,z,radius,length,axis='y'){
    const mesh=part(container,name,cylinder,material,x,y,z,radius,length,radius);
    if(axis==='x')mesh.rotation.z=Math.PI/2;else if(axis==='z')mesh.rotation.x=Math.PI/2;
    return mesh;
  }
  function beam(container,name,material,a,b,width,depth=width){
    const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),mid=start.clone().add(end).multiplyScalar(.5);
    const mesh=box(container,name,material,mid.x,mid.y,mid.z,width,start.distanceTo(end),depth);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),end.sub(start).normalize());return mesh;
  }
  let disposed=false;
  return{root,own,group,part,box,plate,round,beam,paint,cube,get disposed(){return disposed;},
    dispose(){if(disposed)return;disposed=true;root.removeFromParent();for(const geometry of owned)geometry.dispose();owned.clear();}};
}

function trackGeometry(){
  const shape=new THREE.Shape();
  const points=[[-1.20,.17],[-1.04,0],[1.04,0],[1.20,.17],[1.20,.39],[1.04,.56],[-1.04,.56],[-1.20,.39]];
  points.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();
  const hole=new THREE.Path();hole.moveTo(-.97,.10);hole.lineTo(-1.08,.20);hole.lineTo(-1.08,.36);hole.lineTo(-.97,.46);
  hole.lineTo(.97,.46);hole.lineTo(1.08,.36);hole.lineTo(1.08,.20);hole.lineTo(.97,.10);hole.closePath();shape.holes.push(hole);
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:.36,steps:1,bevelEnabled:false,curveSegments:1});
  geometry.rotateY(Math.PI/2);geometry.translate(-.18,0,0);return geometry;
}

function treadRibs(cube){
  const pieces=[],rotation=new THREE.Quaternion(),position=new THREE.Vector3(),scale=new THREE.Vector3(.39,.035,.10),matrix=new THREE.Matrix4();
  const points=[[-1.04,.018],[1.04,.018],[1.183,.17],[1.183,.39],[1.04,.542],[-1.04,.542],[-1.183,.39],[-1.183,.17]];
  for(let i=0;i<points.length;i++){
    const [az,ay]=points[i],[bz,by]=points[(i+1)%points.length],length=Math.hypot(bz-az,by-ay),count=Math.max(1,Math.round(length/.21));
    rotation.setFromAxisAngle(new THREE.Vector3(1,0,0),Math.atan2(-(by-ay),bz-az));
    for(let j=0;j<count;j++)for(const side of [-1,1]){
      const t=(j+.5)/count;position.set(side*.84,ay+(by-ay)*t,az+(bz-az)*t);matrix.compose(position,rotation,scale);pieces.push(cube.clone().applyMatrix4(matrix));
    }
  }
  const geometry=mergeGeometries(pieces);pieces.forEach(piece=>piece.dispose());return geometry;
}

/** Compact painted armor with a readable turret and continuous track outlines.
 * Every supplied material remains owned by the caller; pose only changes rigid
 * transforms so the same rig can be sampled into an instanced animation atlas. */
export function createTankArt(parent,{palette}={}){
  const b=builder(parent,'tank',palette),{root,group,box,plate,round}=b;
  const track=b.own(trackGeometry());
  for(const side of [-1,1])b.part(root,side<0?'tank-track-right':'tank-track-left',track,'rubber',side*.84,0,0);
  b.part(root,'tank-tread-ribs',b.own(treadRibs(b.cube)),'graphite',0,0,0);
  const wheels=[];
  for(const side of [-1,1])for(let i=0;i<3;i++){
    const wheel=group(`tank-wheel-${side<0?'right':'left'}-${i}`,root,side*.99,.28,(i-1)*.76);wheels.push(wheel);
    round(wheel,'tank-road-wheel','graphite',0,0,0,.232,.07,'x');
    round(wheel,'tank-wheel-hub','steel',side*.045,0,0,.105,.035,'x');
    box(wheel,'tank-wheel-spoke','dark',side*.066,0,0,.012,.30,.035);
    round(wheel,'tank-wheel-pin','trim',side*.075,0,0,.035,.016,'x');
  }
  const hull=group('tank-hull');
  plate(hull,'tank-lower-armor','dark',0,.48,-.03,1.61,.30,2.09);
  plate(hull,'tank-upper-armor','body',0,.69,0,1.80,.43,2.13);
  for(const side of [-1,1]){
    plate(hull,'tank-fender','light',side*.84,.59,-.03,.41,.11,2.23);
    round(hull,'tank-headlamp-rim','dark',side*.59,.69,1.002,.098,.07,'z');
    round(hull,'tank-headlamp','trim',side*.59,.69,1.044,.066,.02,'z');
  }
  box(hull,'tank-front-band','trim',0,.806,.796,.89,.025,.115);
  box(hull,'tank-engine-grille','graphite',0,.91,-.73,.70,.018,.31);
  for(const x of [-.23,0,.23])box(hull,'tank-grille-fin','dark',x,.924,-.73,.075,.025,.29);
  plate(hull,'tank-rear-stowage','dark',0,.73,-1.02,.82,.23,.25);
  const turret=group('tank-aim',hull,0,.88,-.08);
  round(turret,'tank-turret-ring','graphite',0,.045,0,.53,.14);
  plate(turret,'tank-turret-armor','body',0,.29,0,1.20,.46,1.10);
  round(turret,'tank-hatch-rim','dark',-.18,.535,-.12,.22,.06);
  round(turret,'tank-hatch','light',-.18,.574,-.12,.175,.04);
  box(turret,'tank-sight-frame','light',.19,.527,.17,.27,.11,.16);
  box(turret,'tank-sight-glass','glass',.19,.531,.257,.19,.045,.016);
  box(turret,'tank-owner-stripe','trim',.31,.526,-.21,.12,.025,.32);
  const pitch=group('tank-elevation',turret,0,.27,.45);
  plate(pitch,'tank-mantlet','light',0,0,.02,.43,.32,.32);
  const barrel=group('tank-recoil',pitch);
  round(barrel,'tank-barrel-sleeve','dark',0,0,.25,.105,.45,'z');
  round(barrel,'tank-barrel','body',0,0,.86,.075,1.03,'z');
  round(barrel,'tank-barrel-collar','trim',0,0,1.24,.087,.075,'z');
  plate(barrel,'tank-muzzle-block','dark',0,0,1.405,.215,.20,.21);
  round(barrel,'tank-bore','graphite',0,0,1.513,.052,.012,'z');
  const muzzle=group('tank-muzzle',barrel,0,0,1.52);muzzle.userData.projectile='shell';
  function pose({time=0,moving=0,attack=0,aimYaw=0,elevation=0}={}){
    if(b.disposed)return;
    const motion=clamp(moving,0,1),phase=cyclePhase(time),recoil=recoilAt(attack);
    hull.position.y=Math.sin(phase*2)*.006*motion;hull.position.z=-.025*recoil;
    hull.rotation.x=.015*recoil;turret.rotation.y=finite(aimYaw);pitch.rotation.x=-clamp(elevation,-.22,.65);barrel.position.z=-.15*recoil;
    for(const wheel of wheels)wheel.rotation.x=motion>0?phase*2:0;
  }
  pose();return{root,muzzle,pose,dispose:b.dispose};
}

function shieldGeometry(){
  const shape=new THREE.Shape();shape.moveTo(-.65,-.14);shape.lineTo(.65,-.14);shape.lineTo(.65,.34);shape.lineTo(.47,.53);shape.lineTo(-.47,.53);shape.lineTo(-.65,.34);shape.closePath();
  const hole=new THREE.Path();hole.absarc(0,.25,.145,0,Math.PI*2,true);shape.holes.push(hole);
  return new THREE.ExtrudeGeometry(shape,{depth:.11,steps:1,bevelEnabled:false,curveSegments:2});
}

export function createArtilleryArt(parent,{palette}={}){
  const b=builder(parent,'artillery',palette),{root,group,box,plate,round,beam}=b;
  const wheels=[];
  for(const side of [-1,1]){
    const wheel=group(`artillery-wheel-${side<0?'right':'left'}`,root,side*.65,.36,0);wheels.push(wheel);
    round(wheel,'artillery-tire','rubber',0,0,0,.36,.19,'x');
    round(wheel,'artillery-wheel-disc','dark',side*.102,0,0,.255,.035,'x');
    for(const angle of [0,Math.PI/2]){const spoke=box(wheel,'artillery-wheel-spoke','steel',side*.126,0,0,.016,.43,.044);spoke.rotation.x=angle;}
    round(wheel,'artillery-wheel-hub','body',side*.141,0,0,.105,.047,'x');
  }
  const carriage=group('artillery-carriage');
  box(carriage,'artillery-axle','graphite',0,.36,0,1.31,.12,.13);
  plate(carriage,'artillery-bed','dark',0,.47,-.13,.94,.21,.72);
  for(const side of [-1,1]){
    beam(carriage,'artillery-trail','body',[side*.18,.34,-.26],[side*.50,.13,-1.24],.14,.16);
    plate(carriage,'artillery-ground-spade','graphite',side*.51,.065,-1.27,.33,.13,.24);
    box(carriage,'artillery-trail-cap','light',side*.50,.15,-1.18,.14,.04,.22);
  }
  plate(carriage,'artillery-tool-chest','canvas',0,.43,-.64,.38,.22,.32);
  box(carriage,'artillery-chest-band','dark',0,.546,-.64,.07,.025,.31);
  // The lower shield clears the tops of both tires, including its full yaw
  // sweep and recoil squash. A solid pedestal carries the raised turntable.
  round(carriage,'artillery-pedestal','dark',0,.68,.10,.23,.33);
  const aim=group('artillery-aim',carriage,0,.90,.10);
  round(aim,'artillery-turntable','graphite',0,-.07,0,.32,.12);
  b.part(aim,'artillery-shield',b.own(shieldGeometry()),'body',0,0,.095);
  for(const side of [-1,1]){
    box(aim,'artillery-shield-edge','light',side*.58,.12,.217,.055,.38,.018);
    round(aim,'artillery-trunnion','steel',side*.20,.25,.15,.105,.10,'x');
  }
  const pitch=group('artillery-elevation',aim,0,.25,.15),barrel=group('artillery-recoil',pitch);
  plate(barrel,'artillery-breech','dark',0,0,-.15,.29,.27,.38);
  round(barrel,'artillery-barrel-sleeve','light',0,0,.28,.115,.51,'z');
  round(barrel,'artillery-barrel','body',0,0,.81,.078,.79,'z');
  round(barrel,'artillery-muzzle-collar','trim',0,0,1.175,.094,.09,'z');
  round(barrel,'artillery-bore','graphite',0,0,1.226,.059,.012,'z');
  const muzzle=group('artillery-muzzle',barrel,0,0,1.233);muzzle.userData.projectile='arc';
  round(aim,'artillery-adjustment-wheel','dark',-.36,.04,-.24,.115,.045,'x');
  box(aim,'artillery-crank','trim',-.398,.11,-.24,.033,.035,.12);
  function pose({time=0,moving=0,attack=0,aimYaw=0,elevation=.55}={}){
    if(b.disposed)return;
    const recoil=recoilAt(attack),phase=cyclePhase(time),motion=clamp(moving,0,1);
    carriage.position.z=-.065*recoil;carriage.scale.y=1-.018*recoil;
    aim.rotation.y=finite(aimYaw);pitch.rotation.x=-clamp(elevation,-.08,1.3);barrel.position.z=-.20*recoil;
    for(const wheel of wheels)wheel.rotation.x=motion>0?phase:0;
  }
  pose();return{root,muzzle,pose,dispose:b.dispose};
}
