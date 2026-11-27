import * as THREE from 'three';
import {C} from './palette.js';

/** One rooted wildflower: a triangular stem, two folded leaves, five broad
 * petals and a raised pollen centre. Petal tint is the only instance colour;
 * stems remain green in white, buttercup and lavender patches alike. */
export function walkingFlowerGeometry(){
  const positions=[],colors=[],masks=[],indices=[];
  const add=(point,color,mask=0)=>{const index=positions.length/3;positions.push(...point);colors.push(color.r,color.g,color.b);masks.push(mask);return index;};
  const face=(a,b,c,color,mask=0)=>indices.push(add(a,color,mask),add(c,color,mask),add(b,color,mask));
  const stemBase=[],stemTop=[];
  for(let i=0;i<3;i++){
    const a=i*Math.PI*2/3;stemBase.push([Math.cos(a)*.023,0,Math.sin(a)*.023]);
    stemTop.push([.045+Math.cos(a)*.018,.94,Math.sin(a)*.018]);
  }
  for(let i=0;i<3;i++){
    const j=(i+1)%3;face(stemBase[i],stemBase[j],stemTop[i],C.leaf);face(stemBase[j],stemTop[j],stemTop[i],C.leaf);
  }
  for(const [angle,height]of [[.45,.28],[3.9,.48]]){
    const c=Math.cos(angle),s=Math.sin(angle),point=(u,y,v)=>[.045*height/.94+u*c-v*s,y,u*s+v*c];
    const root=point(0,height,0),left=point(.14,height+.055,-.060),tip=point(.32,height+.17,0),right=point(.14,height+.055,.060),fold=point(.15,height+.10,0);
    face(root,left,fold,C.leaf);face(left,tip,fold,C.leafLight);
    face(root,fold,right,C.leaf);face(fold,tip,right,C.leafLight);
  }
  const cx=.045,cy=.89;
  for(let i=0;i<5;i++){
    const a=i*Math.PI*2/5,c=Math.cos(a),s=Math.sin(a),point=(r,y,w)=>[cx+r*c-w*s,y,r*s+w*c];
    const root=point(.065,cy,0),left=point(.29,cy+.015,-.14),tip=point(.48,cy+.075,0),right=point(.29,cy+.015,.14),fold=point(.29,cy+.065,0);
    face(root,left,fold,C.white,1);face(left,tip,fold,C.white,1);
    face(root,fold,right,C.white,1);face(fold,tip,right,C.white,1);
    const next=(i+1)*Math.PI*2/5;
    face([cx,.99,0],[cx+Math.cos(a)*.12,.91,Math.sin(a)*.12],[cx+Math.cos(next)*.12,.91,Math.sin(next)*.12],C.gold);
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  geometry.setAttribute('flowerPetal',new THREE.Float32BufferAttribute(masks,1));
  geometry.setIndex(indices);geometry.computeVertexNormals();
  return geometry;
}
