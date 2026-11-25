import * as THREE from 'three';
import { box, cylinder, ico, beam, v, group, polygon, extrudedPolygon, mesh, ribbon } from './geometry.js';
import { range, rng, pick, M } from './palette.js';

export const outline=[[-45,-14],[-39,-26],[-23,-32],[-5,-34],[17,-32],[34,-25],[43,-12],[45,4],[40,20],[27,29],[9,33],[-12,32],[-31,25],[-42,13],[-46,0]];
export const river = new THREE.CatmullRomCurve3([[-46,-3],[-34,-1],[-23,3],[-13,4],[-2,0],[9,1],[20,7],[31,9],[46,6]].map(([x,z])=>v(x,.08,z)));

export function inIsland(x,z,margin=0){
  x*=1+margin/40;z*=1+margin/30;
  let yes=false;for(let i=0,j=outline.length-1;i<outline.length;j=i++){
    const [a,b]=outline[i],[c,d]=outline[j];
    if((b>z)!==(d>z)&&x<(c-a)*(z-b)/(d-b)+a)yes=!yes;
  }return yes;
}
const riverSamples=river.getPoints(150);
export function riverDistance(x,z){let result=1e6;for(const p of riverSamples)result=Math.min(result,Math.hypot(x-p.x,z-p.z));return result;}

export function tree(parent,x,z,size=1,type='pine'){
  const g=group(parent,x,0,z,range(0,6.28));
  g.scale.setScalar(size);
  cylinder(g,0,.83,0,.10,.17,1.66,'bark',5);
  if(type==='pine'){
    cylinder(g,0,1.55,0,0,1.05,2.0,'pine',6);
    cylinder(g,0,2.25,0,0,.86,1.9,'pineLight',6).rotation.y=.25;
    cylinder(g,0,2.98,0,0,.59,1.65,'pine',6).rotation.y=.5;
  }else{
    const mat=type==='gold'?'leafGold':type==='pink'?'leafPink':pick(['leaf','leaf','leafLight']);
    beam(g,v(0,.8,0),v(.53,1.95,.1),.11,'bark');
    ico(g,0,2.18,0,1.02,1.28,.98,mat,0).rotation.y=range(0,3);
    ico(g,.62,1.99,.15,.69,.81,.67,mat);
    ico(g,-.4,2.72,-.08,.62,.73,.65,mat);
  }
  return g;
}

export function terrain(parent){
  extrudedPolygon(parent,outline,-.55,4.9,'soil');
  extrudedPolygon(parent,outline,0,.58,'grass');
  // Uneven strata make the island read as a hand-cut cross-section.
  for(let i=0;i<outline.length;i++){
    const a=outline[i],b=outline[(i+1)%outline.length];
    const len=Math.hypot(a[0]-b[0],a[1]-b[1]);
    const count=Math.ceil(len/3);
    for(let j=0;j<count;j++){
      const t=(j+.5)/count,x=a[0]+(b[0]-a[0])*t,z=a[1]+(b[1]-a[1])*t;
      ico(parent,x,-2.0+range(-.5,.2),z,range(1.3,2.7),range(1.0,2.2),range(.5,1.1),pick(['soil','soilLight','rockDark']));
    }
    const layer=beam(parent,v(a[0],-1.16,a[1]),v(b[0],-1.16,b[1]),.16,'soilLight',.2);
    layer.receiveShadow=true;
  }
  for(let i=0;i<170;i++){
    const x=range(-44,44),z=range(-31,31),s=range(2,6);
    const coords=[[x-s,z-s*.3],[x+s,z],[x+s*.2,z+s*.8]];
    if(coords.every(([xx,zz])=>inIsland(xx,zz,1)))polygon(parent,coords,.008,pick(['grass','grassLight','meadow','grassDark']));
  }
  function riverSurface(width,y,mat){
    const left=[],right=[];
    for(let i=0;i<=140;i++){
      const p=river.getPoint(i/140),d=river.getTangent(i/140),n=v(-d.z,0,d.x).multiplyScalar(width/2);
      left.push([p.x+n.x,p.z+n.z]);right.push([p.x-n.x,p.z-n.z]);
    }
    let coords=left.concat(right.reverse());
    // Clip the water to the actual cutaway edge, including its angled shoreline.
    for(let i=0;i<outline.length;i++){
      const a=outline[i],b=outline[(i+1)%outline.length],input=coords;coords=[];
      const cross=p=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]);
      for(let j=0;j<input.length;j++){
        const p=input[j],q=input[(j+1)%input.length],cp=cross(p),cq=cross(q);
        if(cp>=0)coords.push(p);
        if((cp>=0)!==(cq>=0)){const t=cp/(cp-cq);coords.push([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t]);}
      }
    }
    polygon(parent,coords,y,mat);
  }
  riverSurface(8.0,.045,'sand');
  riverSurface(6.65,.08,'water');
  riverSurface(4.9,.095,'waterLight');
  for(let i=0;i<130;i++){
    const t=range(.02,.98),p=river.getPoint(t),tangent=river.getTangent(t);
    const side=rng()>.5?1:-1;
    const normal=v(-tangent.z,0,tangent.x).multiplyScalar(side*range(3.1,3.9));
    p.add(normal);
    if(rng()>.25&&inIsland(p.x,p.z,.5))ico(parent,p.x,.12,p.z,range(.24,.75),range(.15,.48),range(.2,.52),pick(['rockLight','rock','sand']));
  }
  // The river spills over the front edge of the miniature.
  for(let i=0;i<13;i++){
    const z=3.7+i*.47,x=z>=4?45-(z-4)*5/16:45-(4-z)*2/16;
    box(parent,x+.05,-2.62,z,.20,5.4,.48,i%4?'waterLight':'foam');
    ico(parent,x+.1,-5.27,z,.52,.25,.45,'foam');
  }
}

export function mountain(parent,x,z,r,h){
  const n=7,base=[],middle=[];
  const phase=range(0,Math.PI);
  for(let i=0;i<n;i++){
    const a=i/n*Math.PI*2+phase,rr=r*range(.85,1.15);
    base.push(v(x+Math.cos(a)*rr,0,z+Math.sin(a)*rr*.8));
    middle.push(v(x+Math.cos(a)*rr*.45+.8,h*.48+range(-1,1),z+Math.sin(a)*rr*.43));
  }
  const peak=v(x+range(-2,2),h,z+.6);
  const mats=[M.rock,M.rockLight,M.rockDark];
  const tri=(a,b,c,mat)=>{
    const geo=new THREE.BufferGeometry().setFromPoints([a,b,c]);geo.computeVertexNormals();
    const m=mesh(parent,geo,mat);m.material.side=THREE.DoubleSide;
  };
  for(let i=0;i<n;i++){
    const j=(i+1)%n;
    tri(base[i],middle[i],base[j],mats[i%3]);tri(base[j],middle[i],middle[j],mats[(i+1)%3]);
    tri(middle[i],peak,middle[j],mats[i%3]);
    const a=middle[i].clone().lerp(peak,.33+range(-.13,.12));
    const b=middle[j].clone().lerp(peak,.33+range(-.13,.12));
    a.add(v(0,.045,0));b.add(v(0,.045,0));
    tri(a,peak.clone().add(v(0,.05,0)),b,M.snow);
  }
}

export function fence(parent,x,z,length,rotation=0){
  const g=group(parent,x,0,z,rotation);
  for(let i=0;i<=length;i+=1.35){box(g,i,.46,0,.12,.92,.12,'timber');}
  box(g,length/2,.36,0,length,.09,.08,'trim');
  box(g,length/2,.71,0,length,.09,.08,'trim');
}

export function field(parent,x,z,w,d,kind='wheat',rotation=0){
  const g=group(parent,x,0,z,rotation);
  box(g,0,.035,0,w,.07,d,kind==='wheat'?'wheat':'field');
  for(let i=-w/2+.2;i<w/2;i+=.46){
    box(g,i,.085,0,.12,.09,d,'soil');
    for(let j=-d/2+.2;j<d/2;j+=.4){
      if(kind==='wheat')box(g,i+.14,.23,j,.21,.29,.23,'wheat');
      else if(kind==='lavender')ico(g,i+.14,.25,j,.17,.3,.18,'lavender');
      else ico(g,i+.14,.20,j,.18,.23,.18,'leafLight');
    }
  }
}

export function sheep(parent,x,z,rotation=0){
  const g=group(parent,x,0,z,rotation);
  ico(g,0,.58,0,.54,.39,.33,'white',1);
  ico(g,.48,.58,0,.21,.25,.2,'rockDark');
  for(const a of [-.25,.25])for(const b of [-.18,.18])box(g,a,.22,b,.07,.38,.07,'rockDark');
  ico(g,.47,.81,.16,.10,.05,.14,'rockDark');
}
