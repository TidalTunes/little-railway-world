import * as THREE from 'three';
import {C} from './palette.js';

const fields=new WeakMap();
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
function hash(x,z){
  let n=Math.imul(x,374761393)^Math.imul(z,668265263);
  n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;
}
/** Continuous world-space variation: independent of generation order/chunks. */
export function terrainNoise(x,z,scale=24){
  x/=scale;z/=scale;const ix=Math.floor(x),iz=Math.floor(z),u=smooth(x-ix),v=smooth(z-iz);
  const a=hash(ix,iz)*(1-u)+hash(ix+1,iz)*u,b=hash(ix,iz+1)*(1-u)+hash(ix+1,iz+1)*u;
  return a*(1-v)+b*v;
}
function fieldFor(world){
  const source=world.terrainSource??world,sites=source.biomes?.sites??source.sites;
  if(!sites?.length)return null;
  if(!fields.has(sites)){
    const extent=Math.hypot(source.bounds?.width??130,source.bounds?.depth??95);
    const width=Math.min(22,Math.max(4.5,extent*.011));
    const colors={farmland:C.grass.clone().lerp(C.farmland,.43),forest:C.grass.clone().lerp(C.forestFloor,.78),
      plains:C.grass.clone(),desert:C.desert.clone()};
    fields.set(sites,{sites:sites.map(site=>({...site,color:colors[site.type]??C.grass})),width,distances:new Float64Array(sites.length)});
  }
  return fields.get(sites);
}

/** Visual ecotones do not alter the exact biome masks used by asset clearance. */
export function terrainColor(world,x,z,{map=false,target=new THREE.Color()}={}){
  const field=fieldFor(world);
  if(!field)return target.copy(C.grass);
  const {sites,width,distances}=field;
  const px=x+(terrainNoise(x+171,z-87,45)-.5)*width*.85;
  const pz=z+(terrainNoise(x-73,z+119,39)-.5)*width*.85;
  // Every site within the blend band participates, so even four-way junctions
  // are continuous. The small distance array is reused between vertex samples.
  let nearest=Infinity,total=0;
  for(let i=0;i<sites.length;i++){
    distances[i]=Math.hypot(px-sites[i].x,pz-sites[i].z);nearest=Math.min(nearest,distances[i]);
  }
  target.setRGB(0,0,0);
  for(let i=0;i<sites.length;i++){
    const weight=smooth(1-(distances[i]-nearest)/width),color=sites[i].color;
    target.r+=color.r*weight;target.g+=color.g*weight;target.b+=color.b*weight;total+=weight;
  }
  target.multiplyScalar(1/total);
  // Broad, subtle meadow variation, with quieter values in the network map.
  const variation=(terrainNoise(x,z,29)-.5)*.09+(terrainNoise(x+243,z-192,91)-.5)*.07;
  target.multiplyScalar(1+variation*(map?.42:1));
  if(map)target.lerp(C.trim,.09);
  return target;
}

/** Subdivide only long edges of a flat surface so color doesn't stretch across
 * an entire country. Split points stay in the original triangles, preserving
 * every shore, hole, and local terrain boundary exactly. */
export function colorTerrainGeometry(input,world,{map=false,maxEdge=map?24:8}={}){
  if(!Number.isFinite(maxEdge)||maxEdge<=0)throw new TypeError('Terrain color edge spacing must be positive and finite');
  const position=input.attributes.position,index=input.index,vertices=[],colors=[],color=new THREE.Color();
  const stack=[],edge2=maxEdge*maxEdge;
  // Independent shoreline clipping can add different collinear vertices on
  // opposite sides of one chunk edge. Both sides therefore use the same 2-unit
  // samples, with extra vertices interpolated along that shared color curve.
  const bounds=!map&&world.terrainChunk?world.bounds:null,edgeStep=2;
  const edgeColors=new Map(),edgeEnd=new THREE.Color();
  const edges=bounds?[[0,bounds.minX,2],[0,bounds.maxX,2],[2,bounds.minZ,0],[2,bounds.maxZ,0]]:[];
  const edgeEpsilon=bounds?Math.max(1e-6,...edges.map(([,value])=>Math.abs(value)*1e-7)):0;
  function edgeSample(axis,value,offset){
    const key=`${axis}:${value}:${offset}`;
    if(!edgeColors.has(key)){
      const x=axis===0?value:offset,z=axis===2?value:offset;
      edgeColors.set(key,terrainColor(world,x,z));
    }
    return edgeColors.get(key);
  }
  function vertexColor(p){
    for(const [axis,value,along]of edges)if(Math.abs(p[axis]-value)<=edgeEpsilon){
      const lower=Math.floor(p[along]/edgeStep)*edgeStep,t=(p[along]-lower)/edgeStep;
      color.copy(edgeSample(axis,value,lower));
      edgeEnd.copy(edgeSample(axis,value,lower+edgeStep));
      return color.lerp(edgeEnd,t);
    }
    return terrainColor(world,p[0],p[2],{map,target:color});
  }
  function boundarySplit(triangle){
    for(let j=0;j<3;j++){
      const a=triangle[j],b=triangle[(j+1)%3];
      for(const [axis,value,along]of edges){
        if(Math.abs(a[axis]-value)>edgeEpsilon||Math.abs(b[axis]-value)>edgeEpsilon)continue;
        const lo=Math.min(a[along],b[along]),hi=Math.max(a[along],b[along]);
        const first=Math.ceil((lo+edgeEpsilon)/edgeStep)*edgeStep,last=Math.floor((hi-edgeEpsilon)/edgeStep)*edgeStep;
        if(first>last)continue;
        const split=Math.max(first,Math.min(last,Math.round((lo+hi)/2/edgeStep)*edgeStep));
        const t=(split-a[along])/(b[along]-a[along]),m=a.map((n,k)=>n+(b[k]-n)*t);m[along]=split;
        return {j,m};
      }
    }
    return null;
  }
  const sampleColors=[new THREE.Color(),new THREE.Color(),new THREE.Color()],probe=new THREE.Color();
  function nearlyLinear(triangle){
    triangle.forEach((p,i)=>terrainColor(world,p[0],p[2],{map:true,target:sampleColors[i]}));
    for(const weights of [[.5,.5,0],[0,.5,.5],[.5,0,.5],[1/3,1/3,1/3]]){
      let x=0,z=0,r=0,g=0,b=0;
      for(let i=0;i<3;i++){const w=weights[i];x+=triangle[i][0]*w;z+=triangle[i][2]*w;
        r+=sampleColors[i].r*w;g+=sampleColors[i].g*w;b+=sampleColors[i].b*w;}
      terrainColor(world,x,z,{map:true,target:probe});
      if(Math.max(Math.abs(probe.r-r),Math.abs(probe.g-g),Math.abs(probe.b-b))>.004)return false;
    }
    return true;
  }
  const read=i=>[position.getX(i),position.getY(i),position.getZ(i)];
  const size=index?.count??position.count;
  for(let i=0;i<size;i+=3){
    stack.push([read(index?index.getX(i):i),read(index?index.getX(i+1):i+1),read(index?index.getX(i+2):i+2)]);
    while(stack.length){
      const triangle=stack.pop();let longest=-1,maximum=edge2;
      for(let j=0;j<3;j++){
        const a=triangle[j],b=triangle[(j+1)%3],distance=(a[0]-b[0])**2+(a[2]-b[2])**2;
        if(distance>maximum){maximum=distance;longest=j;}
      }
      // At overview scale, broad almost-uniform ground needs no fine mesh.
      // Still sample at least every 192 units so narrow transition bands cannot
      // disappear across continent-sized initial triangulation faces.
      if(longest>=0&&map&&maximum<=(maxEdge*8)**2&&nearlyLinear(triangle))longest=-1;
      if(longest>=0){
        const a=triangle[longest],b=triangle[(longest+1)%3],c=triangle[(longest+2)%3],m=a.map((n,k)=>(n+b[k])/2);
        stack.push([a,m,c],[m,b,c]);continue;
      }
      // Refine the perimeter only after ordinary interior tessellation. Doing
      // this first would create long, skinny fans across an entire chunk.
      const boundary=boundarySplit(triangle);
      if(boundary){
        const {j,m}=boundary,a=triangle[j],b=triangle[(j+1)%3],c=triangle[(j+2)%3];
        stack.push([a,m,c],[m,b,c]);continue;
      }
      for(const p of triangle){
        vertices.push(...p);vertexColor(p);colors.push(color.r,color.g,color.b);
      }
    }
  }
  const result=new THREE.BufferGeometry();
  result.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  result.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  result.computeVertexNormals();return result;
}
