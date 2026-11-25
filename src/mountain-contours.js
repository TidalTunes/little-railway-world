import clipping from './polygon-ops.js';
import {mountainMeshData,mountainSnowHeight} from './mountain-shape.js';

function contourPolygons(mountain,threshold){
  const {vertices,surfaceTriangles}=mountainMeshData(mountain),polygons=[];
  for(const triangle of surfaceTriangles){
    const points=triangle.map(index=>vertices[index]),ring=[];
    const values=points.map(p=>p.y-threshold(p.x,p.z));
    for(let i=0;i<3;i++){
      const a=points[i],b=points[(i+1)%3],da=values[i],db=values[(i+1)%3];
      if(da>=0)ring.push([a.x,a.z]);
      if((da>=0)!==(db>=0)){
        const t=da/(da-db);ring.push([a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t]);
      }
    }
    if(ring.length>=3){
      const snapped=ring.map(([x,z])=>[Math.round(x*1e6)/1e6,Math.round(z*1e6)/1e6]);
      polygons.push([[...snapped,snapped[0]]]);
    }
  }
  return polygons.length?clipping.union(...polygons):[];
}

/** Pure, structured-clone-safe contour polygons, suitable for worker preparation. */
export function mountainContours(mountain,fraction){
  return contourPolygons(mountain,()=>mountain.height*fraction);
}

export function createMountainContours(mountain){
  return {low:mountainContours(mountain,.12),high:mountainContours(mountain,.62),
    snow:mountain.range?contourPolygons(mountain,(x,z)=>mountainSnowHeight(mountain,x,z))
      :mountain.height>8?mountainContours(mountain,.84):[]};
}
