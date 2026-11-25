import * as THREE from 'three';
import { box, cylinder, beam, v, group, mesh, ribbon, consolidate, ico } from './geometry.js';
import { M } from './palette.js';

const smooth=(a,b,x)=>THREE.MathUtils.smoothstep(x,a,b);
export function railHeight(x,z){
  return .34 + 3.6*Math.exp(-(((z-6)/9)**4))*smooth(23,29,x) + .8*Math.exp(-(((z+1)/5)**4))*smooth(30,35,-x);
}
const nodes=[[-27,18],[-35,13],[-38,5],[-35,-5],[-27,-12],[-14,-12],[-3,-10],[8,-13],[21,-15],[31,-13],[36,-6],[35,3],[29,12],[17,19],[2,21],[-13,20]];
const route=new THREE.CatmullRomCurve3(nodes.map(([x,z])=>v(x,0,z)),true,'catmullrom',.3);
route.arcLengthDivisions=1600;
export const trackLength=route.getLength();
export function railPoint(t){const p=route.getPointAt(((t%1)+1)%1);p.y=railHeight(p.x,p.z);return p;}
export function railTangent(t){return railPoint(t+.0002).sub(railPoint(t-.0002)).normalize();}
const trackSamples=Array.from({length:650},(_,i)=>railPoint(i/649));
export function trackDistance(x,z){let d=1000;for(const p of trackSamples)d=Math.min(d,Math.hypot(p.x-x,p.z-z));return d;}

function arch(parent,a,b){
  const length=Math.hypot(a.x-b.x,a.z-b.z)+.04,height=Math.min(a.y,b.y)-.16;
  const leftHeight=a.y-.16,rightHeight=b.y-.16;
  const opening=length/2-.33,spring=Math.max(.25,height*.40);
  const shape=new THREE.Shape();
  shape.moveTo(-length/2,.0);shape.lineTo(-length/2,leftHeight);shape.lineTo(length/2,rightHeight);shape.lineTo(length/2,0);
  shape.lineTo(opening,0);shape.lineTo(opening,spring);
  shape.quadraticCurveTo(opening,height-.42,0,height-.42);
  shape.quadraticCurveTo(-opening,height-.42,-opening,spring);
  shape.lineTo(-opening,0);shape.closePath();
  const geo=new THREE.ExtrudeGeometry(shape,{depth:1.7,bevelEnabled:false,curveSegments:8});
  geo.translate(0,0,-.85);
  const g=group(parent,(a.x+b.x)/2,0,(a.z+b.z)/2,-Math.atan2(b.z-a.z,b.x-a.x));
  mesh(g,geo,'platform');
  beam(g,v(-length/2,leftHeight+.07,0),v(length/2,rightHeight+.07,0),.22,'trim',1.92);
  for(const s of [-1,1]){
    beam(g,v(-length/2,leftHeight+.36,s*.89),v(length/2,rightHeight+.36,s*.89),.34,'platform',.14);
    box(g,-length/2,leftHeight+.43,s*.89,.36,.5,.24,'trim');
    // Light voussoirs pick out the arch without a texture.
    for(let j=0;j<9;j++){
      const ang=j/8*Math.PI;
      const xx=Math.cos(ang)*opening,yy=spring+Math.sin(ang)*(height-spring-.36);
      box(g,xx,yy,s*.87,.28,.18,.07,'trim').rotation.z=ang-Math.PI/2;
    }
  }
}

export function railway(parent){
  ribbon(parent,trackSamples,1.85,'gravel',-.13);
  const count=Math.ceil(trackLength/.57);
  for(let i=0;i<count;i++){
    const t=i/count,p=railPoint(t),dir=railTangent(t),angle=Math.atan2(dir.x,dir.z);
    box(parent,p.x,p.y-.035,p.z,1.58,.13,.20,'timber',angle);
  }
  for(const side of [-1,1]){
    const points=trackSamples.map((p,i)=>{const dir=railTangent(i/649);return p.clone().add(v(-dir.z,.07,dir.x).multiply(v(.51*side,1,.51*side)));});
    ribbon(parent,points,.10,'rail');
  }
  const arcCount=Math.floor(trackLength/3.1);
  for(let i=0;i<arcCount;i++){
    const a=railPoint(i/arcCount),b=railPoint((i+1)/arcCount),p=railPoint((i+.5)/arcCount);
    if(p.x>27&&p.y>.85)arch(parent,a,b);
    if(p.x<-33&&p.y>.55){
      for(const side of [-1,1]){
        const tangent=railTangent((i+.5)/arcCount),normal=v(-tangent.z,0,tangent.x).multiplyScalar(side*.7);
        const q=p.clone().add(normal);
        cylinder(parent,q.x,p.y/2-.13,q.z,.12,.15,p.y-.10,'timber',6);
        beam(parent,a.clone().add(normal).add(v(0,-.2,0)),b.clone().add(normal).add(v(0,-.2,0)),.22,'timber');
      }
    }
  }
  for(const t of [.02,.20,.48,.74]){
    const p=railPoint(t),d=railTangent(t),n=v(-d.z,0,d.x).multiplyScalar(1.45);p.add(n);
    cylinder(parent,p.x,p.y+.84,p.z,.045,.06,1.75,'metal',6);
    box(parent,p.x,p.y+1.63,p.z,.32,.52,.14,'metal',Math.atan2(d.x,d.z));
    const lamp=cylinder(parent,p.x,p.y+1.74,p.z+.09,.08,.08,.06,'redLight');lamp.rotation.x=Math.PI/2;
  }
}

function wheel(parent,x,z,r=.27){
  const w=cylinder(parent,x,.31,z,r,r,.13,'metal',10);w.rotation.z=Math.PI/2;
  const hub=cylinder(parent,x*1.03,.31,z,r*.40,r*.40,.15,'gold',8);hub.rotation.z=Math.PI/2;
}
function locomotive(parent,mat){
  box(parent,0,.46,0,1.08,.25,2.50,'metal');
  box(parent,0,.62,0,1.15,.13,2.50,mat);
  const boiler=cylinder(parent,0,1.02,.38,.43,.43,1.60,mat,10);boiler.rotation.x=Math.PI/2;
  const front=cylinder(parent,0,1.02,1.20,.36,.36,.07,'metal',10);front.rotation.x=Math.PI/2;
  for(const z of [.05,.75]){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.437,.035,4,10),M.gold);ring.position.set(0,1.02,z);parent.add(ring);
  }
  box(parent,0,1.13,-.72,1.02,1.14,.83,mat);
  box(parent,0,1.8,-.72,1.20,.16,1.07,'metal');
  for(const side of [-1,1]){
    box(parent,side*.52,1.35,-.72,.035,.43,.49,'window');
    box(parent,side*.54,1.1,-.72,.055,.06,.57,'gold');
  }
  box(parent,0,1.34,-.285,.62,.39,.04,'window');
  cylinder(parent,0,1.57,.78,.17,.12,.6,'metal',8);
  cylinder(parent,0,1.86,.78,.22,.22,.10,'metal',8);
  cylinder(parent,0,1.51,.1,.15,.18,.25,'gold',8);
  box(parent,0,.41,1.40,1.15,.18,.28,mat);
  const light=cylinder(parent,0,1.1,1.28,.14,.14,.10,'gold',10);light.rotation.x=Math.PI/2;
  for(const x of [-.55,.55]){
    for(const z of [-.78,-.05,.73])wheel(parent,x,z);
    beam(parent,v(x*1.07,.32,-.79),v(x*1.07,.32,.76),.06,'rail');
  }
}
function carriage(parent,mat,index){
  box(parent,0,.45,0,1.05,.18,2.65,'metal');
  box(parent,0,1.03,0,1.12,1.05,2.52,mat);
  box(parent,0,1.49,0,1.13,.22,2.55,'trim');
  box(parent,0,1.73,0,1.24,.24,2.75,'roofBlue');
  box(parent,0,.81,0,1.15,.08,2.54,'gold');
  for(const side of [-1,1]){
    for(let i=-1;i<=1;i++){
      box(parent,side*.569,1.28,i*.69,.025,.46,.48,'window');
      box(parent,side*.588,1.28,i*.69,.03,.45,.035,'trim');
    }
    for(const z of [-.81,.81])wheel(parent,side*.55,z,.23);
  }
  for(const z of [-1.27,1.27]){
    box(parent,0,1.22,z,.48,.53,.035,'window');
    box(parent,0,.50,z*1.14,.17,.12,.39,'metal');
  }
  if(index===2)box(parent,0,1.92,.35,.48,.16,.60,'roofBlue');
}

export function makeTrain(scene,{color='red',offset=0,speed=1.8,cars=3}={}){
  const parts=[];
  for(let i=0;i<=cars;i++){
    const g=group(scene);i===0?locomotive(g,color):carriage(g,color,i);consolidate(g);parts.push(g);
  }
  return {parts,offset,speed,update(time){
    const progress=offset+time*speed/trackLength;
    parts.forEach((part,i)=>{
      const t=progress-i*2.94/trackLength;
      const a=railPoint(t+.0015),b=railPoint(t-.0015),p=railPoint(t);
      part.position.copy(p).add(v(0,.10,0));
      part.rotation.set(0,Math.atan2(a.x-b.x,a.z-b.z),0);
      part.rotateX(-Math.atan2(a.y-b.y,Math.hypot(a.x-b.x,a.z-b.z)));
    });
  }};
}
