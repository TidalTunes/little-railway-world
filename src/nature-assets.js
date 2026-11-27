import { BufferGeometry, Float32BufferAttribute } from 'three';
import { group, mesh } from './geometry.js';
import { C, M, random } from './palette.js';

export const NATURE_STYLES=Object.freeze(['meadow','scrub','dune','outcrop','frost']);

// Each small landscape is one coloured mesh, with no disk beneath it and no
// per-object materials. Empty space between its details is actual terrain.
export function naturePatch(parent,{x=0,y=0,z=0,radius=4,rotation=0,scale=1,variant=0,style='meadow'}={}){
  if(!Number.isFinite(radius)||radius<=0)throw new TypeError('Nature radius must be positive and finite');
  if(!NATURE_STYLES.includes(style))throw new TypeError('Unknown nature style');
  const root=group(parent,x,y,z,rotation);root.name='nature';root.scale.setScalar(scale);
  root.userData.rigidSurfaceAsset=true;root.userData.surfaceFootprint=true;
  root.userData.footprint={radius,height:Math.min(1.8,radius*.34)};
  const rng=random((Math.trunc(variant)^0x63a9b7)|0),positions=[],colors=[];
  const tint=(name,mix,amount)=>C[name].clone().lerp(C[mix],amount);
  const triangle=(a,b,c,color)=>{
    const ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2],vx=c[0]-a[0],vy=c[1]-a[1],vz=c[2]-a[2];
    if(Math.hypot(uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx)<1e-10)return;
    positions.push(...a,...b,...c);
    for(let i=0;i<3;i++)colors.push(color.r,color.g,color.b);
  };
  const quad=(a,b,c,d,color)=>{triangle(a,b,c,color);triangle(a,c,d,color);};
  const unit=Math.min(1,radius/3),height=Math.min(1.8,radius*.34);
  const place=(index,count,reach=.68)=>{
    const angle=index*2.3999632297+rng()*.45,distance=Math.sqrt((index+.3)/count)*radius*reach;
    return[Math.cos(angle)*distance,Math.sin(angle)*distance];
  };
  const rock=(cx,cz,width,depth,h,color,angle=0)=>{
    const rings=[],ca=Math.cos(angle),sa=Math.sin(angle),sides=5;
    for(let i=0;i<sides;i++){
      const a=i*Math.PI*2/sides,px=Math.cos(a)*width,pz=Math.sin(a)*depth;
      const tx=px*ca-pz*sa,tz=px*sa+pz*ca;
      rings.push({low:[cx+tx,.012,cz+tz],high:[cx+tx*.72+h*.10,h*(.52+rng()*.21),cz+tz*.72]});
    }
    const peak=[cx-width*.12,h,cz+depth*.07];
    for(let i=0;i<sides;i++){
      const a=rings[i],b=rings[(i+1)%sides],side=color.clone().multiplyScalar(.82+.035*i);
      quad(a.low,a.high,b.high,b.low,side);
      triangle(a.high,peak,b.high,color.clone().multiplyScalar(.94+rng()*.08));
    }
  };
  // Small broad leaves belong to the ground, rather than competing with the
  // fine animated grass. A shallow folded surface catches light from above;
  // there are no crossed billboards, freestanding spikes or tall flower flags.
  const groundcover=(cx,cz,size,color)=>{
    const turn=rng()*Math.PI*2;
    for(let leaf=0;leaf<3;leaf++){
      const a=turn+leaf*Math.PI*2/3+rng()*.15,ca=Math.cos(a),sa=Math.sin(a);
      const length=size*(.78+rng()*.22),width=length*.46,lift=length*.22;
      const point=(along,across,y)=>[cx+ca*along-sa*across,y,cz+sa*along+ca*across];
      const center=point(length*.56,0,.012+lift);
      const rim=[point(.01,0,.012),point(length*.40,width,.016),
        point(length*.86,width*.72,.020),point(length,0,.022),
        point(length*.86,-width*.72,.020),point(length*.40,-width,.016)];
      const tone=color.clone().multiplyScalar(.94+rng()*.10);
      for(let edge=0;edge<rim.length;edge++)triangle(center,rim[edge],rim[(edge+1)%rim.length],tone);
    }
  };
  const blossom=(cx,cz,size,color)=>{
    const h=.055*unit,center=[cx,h+.008*unit,cz],turn=rng()*Math.PI*2;
    for(let i=0;i<6;i++){
      const a=turn-i*Math.PI/3,b=turn-(i+1)*Math.PI/3;
      triangle(center,[cx+Math.cos(a)*size,h,cz+Math.sin(a)*size],
        [cx+Math.cos(b)*size,h,cz+Math.sin(b)*size],color);
    }
  };
  // An asymmetric wind crest: a long, gently sloping windward face and a
  // short slip face. The ends taper into the terrain rather than forming tiles.
  const ridge=(cx,cz,length,width,h,bend,color,shadow)=>{
    const sections=7,rows=[],profile=.78+rng()*.46,crestOffset=(rng()-.5)*.18;
    // Fit the complete curved crest inside its reservation before generating
    // vertices. This leaves freedom to vary the silhouette without clipping.
    const extentX=Math.abs(cx)+length/2,extentZ=Math.abs(cz)+Math.abs(bend)*1.24+width*.72;
    const fit=Math.min(1,radius*.94/Math.hypot(extentX,extentZ));
    cx*=fit;cz*=fit;length*=fit;width*=fit;bend*=fit;
    for(let i=0;i<=sections;i++){
      const t=i/sections,shape=Math.sin(Math.PI*t),along=(t-.5)*length;
      const curve=shape*bend+Math.sin(t*Math.PI*2)*bend*.24,edge=width*Math.pow(shape,profile);
      rows.push([[cx+along,.018,cz+curve-edge*.72],
        [cx+along,h*Math.pow(shape,.9)*(1+crestOffset*(t-.5))+.018,cz+curve+edge*.18],
        [cx+along,.018,cz+curve+edge*.40]]);
    }
    for(let i=0;i<sections;i++){
      const a=rows[i],b=rows[i+1];
      quad(a[0],a[1],b[1],b[0],color.clone().multiplyScalar(.96+(i%3)*.018));
      quad(a[1],a[2],b[2],b[1],shadow);
    }
  };
  const ridgeDistrict=(frozen,color,shadow)=>{
    const count=1+Math.floor(rng()*4),direction=rng()<.5?-1:1;
    const drift=(rng()-.5)*radius*.30,spacing=radius*(.24+rng()*.10);
    for(let i=0;i<count;i++){
      const along=(i-(count-1)/2),prominence=count===1?1:(.45+rng()*.55);
      const length=radius*(count===1?1.65+rng()*.28:.70+rng()*.87);
      const width=radius*(count===1?.40+rng()*.21:.17+rng()*.18);
      const cx=drift+along*radius*(.05+rng()*.10)+(rng()-.5)*radius*.16;
      const cz=along*spacing+(rng()-.5)*radius*.10;
      const bend=radius*(.04+rng()*.17)*direction;
      const h=height*prominence*(frozen?.23+rng()*.20:.48+rng()*.40);
      ridge(cx,cz,length,width,h,bend,color.clone().multiplyScalar(.97+rng()*.04),shadow);
    }
  };

  if(style==='meadow'){
    const color=tint('grass','leafLight',.20+rng()*.16),count=4+Math.floor(rng()*3);
    let flowers=0;
    for(let i=0;i<count;i++){
      const [cx,cz]=place(i,count,.48+rng()*.20),size=(.11+rng()*.07)*unit;
      groundcover(cx,cz,size,color);
      if(flowers<2&&rng()<.30){
        blossom(cx+size*.14,cz-size*.08,(.020+rng()*.009)*unit,
          flowers++%2===0?tint('white','leafGold',.12):tint('leafGold','grass',.12));
      }
    }
    if(variant%4===0){
      // A pale weathered stone interrupts the softer vegetation occasionally.
      rock(-radius*.12,radius*.1,.45*unit,.27*unit,.28*unit,tint('rockLight','grass',.18),.5);
    }
  }else if(style==='scrub'){
    const foliage=tint('sage','cactus',.32+rng()*.18);
    for(let i=0;i<5;i++){
      const [cx,cz]=place(i,5,.66),size=(.31+rng()*.27)*unit;
      rock(cx,cz,size,size*.76,size*.70,foliage,rng()*Math.PI);
      if(i<3)groundcover(cx+size*.65,cz-size*.1,.12*unit,tint('sand','leafGold',.25));
    }
    rock(-radius*.21,-radius*.13,.4*unit,.24*unit,.19*unit,tint('desertRock','sand',.35),.8);
  }else if(style==='dune'){
    const sand=tint('desertLight','desert',.24+rng()*.22),shade=tint('desert','desertRock',.10);
    ridgeDistrict(false,sand,shade);
    if(variant%3===0)groundcover(-radius*.52,radius*.17,.12*unit,tint('sage','sand',.52));
  }else if(style==='outcrop'){
    const stone=tint('rock','mountainFloor',.15+rng()*.18);
    const count=2+Math.floor(rng()*3),major=Math.floor(rng()*count);
    for(let i=0;i<count;i++){
      const cx=(i-(count-1)/2)*radius*.30,cz=(rng()-.5)*radius*.34;
      const size=radius*(i===major?.25+rng()*.05:.13+rng()*.07);
      rock(cx,cz,size,size*(.54+rng()*.25),height*(i===major?.81+rng()*.19:.38+rng()*.30),stone,.10+rng()*.16);
    }
    for(let i=0;i<3;i++){
      const [cx,cz]=place(i+1,5,.72);
      rock(cx,cz,.21*unit,.17*unit,.20*unit,tint('rockLight','grassDark',.12),.18);
    }
    groundcover(-radius*.12,radius*.43,.12*unit,C.grassDark);
  }else{
    const snow=tint('snow','blue',.04+rng()*.06),ice=tint('blue','snow',.55);
    ridgeDistrict(true,snow,ice);
    if(variant%2===0)rock(-radius*.33,radius*.34,.39*unit,.24*unit,.24*unit,ice,.18);
  }

  const geometry=new BufferGeometry();
  geometry.setAttribute('position',new Float32BufferAttribute(positions,3));
  geometry.setAttribute('color',new Float32BufferAttribute(colors,3));geometry.computeVertexNormals();
  const detail=mesh(root,geometry,M.terrainVertex);detail.userData.surfaceGround=true;
  return root;
}
