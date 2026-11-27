import {ExtrudeGeometry,Shape,Path} from 'three';
import {box,cylinder,roof,group,ico,mesh} from './geometry.js';
import {landmark,civic,plaza} from './assets.js';
import {settlementMilestone} from './settlement-progression.js';

/** Small town landmarks use the same painted timber, stone and roof language
 * as the houses. Their +Z frontage is the route planner's entrance. */
export function buildSettlementBuilding(parent,{buildingType,x=0,y=0,z=0,rotation=0,scale=1,palette}={}){
  const spec=settlementMilestone(buildingType);
  if(!spec)throw new TypeError(`Unknown settlement building: ${buildingType}`);
  const c=palette??{body:'teal',light:'sage',dark:'roofDark',roof:'roofBlue',accent:'gold',trim:'trim'};
  let root;
  if(buildingType==='clock')root=landmark(parent,{x,y,z,rotation,scale,variant:0,palette,animatedClocks:true});
  else if(buildingType==='hall')root=civic(parent,{x,y,z,rotation,scale,variant:0,palette,animatedClocks:true});
  else if(buildingType==='waterTower')root=landmark(parent,{x,y,z,rotation,scale,variant:2,palette});
  else if(buildingType==='plaza')root=plaza(parent,{x,y,z,rotation,scale,variant:0,palette});
  else if(buildingType==='library')root=civic(parent,{x,y,z,rotation,scale,variant:1,palette});
  else if(buildingType==='guildhall')root=civic(parent,{x,y,z,rotation,scale,variant:2,palette});
  else if(buildingType==='chapel')root=landmark(parent,{x,y,z,rotation,scale,variant:1,palette});
  else{
    root=group(parent,x,y,z,rotation);root.scale.setScalar(scale);
    if(buildingType==='well'){
      box(root,0,.05,0,2.08,.10,2.08,'platform');
      // A genuine open stone ring, with water below its coping. One extrusion
      // joins the inside, outside and top instead of overlapping solid caps.
      const ring=new Shape(),inside=new Path(),sides=8;
      for(let i=0;i<=sides;i++){
        const a=i*Math.PI*2/sides;
        if(i){ring.lineTo(Math.cos(a)*.53,Math.sin(a)*.53);inside.lineTo(Math.cos(-a)*.35,Math.sin(-a)*.35);}
        else{ring.moveTo(.53,0);inside.moveTo(.35,0);}
      }
      ring.holes.push(inside);
      const masonry=new ExtrudeGeometry(ring,{depth:.48,bevelEnabled:false,steps:1});masonry.rotateX(-Math.PI/2);
      mesh(root,masonry,c.light,0,.10,0);
      cylinder(root,0,.295,0,.349,.349,.025,'water',8);
      for(const side of [-1,1])box(root,side*.58,.75,0,.105,1.30,.13,c.dark);
      box(root,0,1.39,0,1.30,.10,.14,c.dark);
      const axle=cylinder(root,0,1.03,0,.045,.045,1.12,c.dark,8);axle.rotation.z=Math.PI/2;
      box(root,0,.79,0,.018,.46,.018,'timber');
      roof(root,1.74,1.54,.34,1.40,c.roof);
    }else{
      box(root,0,.06,0,3.36,.12,2.50,'platform');
      for(const xx of [-1.36,1.36])for(const zz of [-.90,.90])box(root,xx,.88,zz,.12,1.52,.12,c.dark);
      box(root,0,1.64,0,2.88,.10,1.96,c.trim);
      roof(root,3.18,2.34,.60,1.66,c.roof);
      // One low counter leaves the canopy open and its silhouette readable.
      box(root,0,.30,.42,2.45,.36,.56,c.body);
      box(root,0,.51,.42,2.57,.06,.66,c.trim);
      for(const [index,xx]of [-.78,0,.78].entries()){
        box(root,xx,.59,.42,.61,.10,.45,c.dark);
        for(const dx of [-.14,.14])ico(root,xx+dx,.65,.42,.095,.065,.12,['leafGold','redLight','leaf'][index]);
      }
    }
  }
  root.name=`settlement-${buildingType}`;
  root.userData.rigidSurfaceAsset=true;
  root.userData.footprint={width:spec.width,depth:spec.depth,height:spec.height};
  root.userData.entrance={x:0,z:spec.doorOffset};
  root.userData.buildingType=buildingType;
  return root;
}
