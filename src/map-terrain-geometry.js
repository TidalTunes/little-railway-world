import * as THREE from 'three';
import {colorTerrainGeometry,terrainColor} from './terrain-colors.js';
import {warpGeometryToSurface,SURFACE_MAX_SEGMENT} from './world-surface.js';
import {tessellateSurfaceGeometry,subdivideSurfaceRing} from './surface-tessellation.js';
import {indexGeometryExact,geometryAttributeBytes} from './index-geometry.js';
import {splitMapPolygons} from './map-tiles.js';
import {shoreColor} from './ocean-colors.js';
import {BoundsTree} from './spatial-index.js';
import {C} from './palette.js';

export const MAP_SURFACE_HEIGHT_SCALE=16;
export const MAP_SURFACE_SEGMENT=16;

/** Fade against the prepared contour itself, never the artificial tile edges.
 * River/lake cuts are real boundaries and keep their surrounding ground color.
 * The capped nearest query only inspects edges within the foothill blend band.
 */
function foothillColorField(multi,world,colorField){
  const radius=world.surface.projection?.radius??world.surface.radius,period=2*Math.PI*radius,edges=[];
  for(const polygon of multi)for(const ring of polygon)for(let i=0;i<ring.length;i++){
    const a=ring[i],b=ring[(i+1)%ring.length],dx=b[0]-a[0],dz=b[1]-a[1];
    if(dx===0&&dz===0)continue;
    // The two sides of a closed chart are identified, not mountain foothills.
    if((Math.abs(Math.abs(a[0])-period/2)<.002&&Math.abs(dx)<.002)
      ||(Math.abs(Math.abs(a[1])-period/4)<.002&&Math.abs(dz)<.002))continue;
    edges.push({a,b,dx,dz,length2:dx*dx+dz*dz,minX:Math.min(a[0],b[0]),maxX:Math.max(a[0],b[0]),
      minZ:Math.min(a[1],b[1]),maxZ:Math.max(a[1],b[1])});
  }
  const tree=new BoundsTree(edges),width=48;
  return (x,z,target)=>{
    let distance=width;
    for(const offset of [0,-period,period]){
      const px=x+offset;
      distance=tree.nearest(px,z,edge=>{
        const t=Math.max(0,Math.min(1,((px-edge.a[0])*edge.dx+(z-edge.a[1])*edge.dz)/edge.length2));
        return Math.hypot(px-edge.a[0]-t*edge.dx,z-edge.a[1]-t*edge.dz);
      },distance);
    }
    const t=Math.max(0,Math.min(1,distance/width)),blend=t*t*(3-2*t);
    terrainColor(colorField,x,z,{map:true,target});
    return target.multiplyScalar(1-.07*blend).lerp(C.forestFloor,.18*blend).lerp(C.mountainFloor,.08*blend);
  };
}

/** Pure worker compilation: each color becomes a transferable position buffer. */
export function compileMapTerrainGeometry(terrain,world=terrain){
  const spherical=world.surface?.type==='sphere',complete=world.surface?.complete;
  const batches=new Map();
  function polygons(multi,y,color,colored=false,sampleColor=null){
    for(const inputRings of complete?splitMapPolygons(multi,128):multi){
      const rings=spherical?inputRings.map(ring=>subdivideSurfaceRing(ring,SURFACE_MAX_SEGMENT)):inputRings;
      const shape=new THREE.Shape(rings[0].map(([x,z])=>new THREE.Vector2(x,-z)));
      for(const ring of rings.slice(1))shape.holes.push(new THREE.Path(ring.map(([x,z])=>new THREE.Vector2(x,-z))));
      let geometry=new THREE.ShapeGeometry(shape);geometry.rotateX(-Math.PI/2);geometry.translate(0,y,0);
      if(colored&&!complete){const base=geometry;geometry=colorTerrainGeometry(base,terrain.colorField,{map:true});base.dispose();}
      if(spherical){
        // The map shades by radial position; UVs and mesh normals are unused.
        for(const name of Object.keys(geometry.attributes))if(name!=='position'&&name!=='color')geometry.deleteAttribute(name);
        const chartGeometry=geometry;
        // Layered shores, water, and contours need the stricter chord budget.
        // Broad ground can use 32-unit interiors with 8-unit coasts.
        const step=complete&&color==='terrain'?32:MAP_SURFACE_SEGMENT;
        geometry=tessellateSurfaceGeometry(chartGeometry,step);chartGeometry.dispose();
        if(complete){
          const plain=geometry;geometry=indexGeometryExact(plain);plain.dispose();
          if(colored){
            const positions=geometry.attributes.position,values=new Float32Array(positions.count*3),sample=new THREE.Color();
            for(let i=0;i<positions.count;i++){
              terrainColor(terrain.colorField,positions.getX(i),positions.getZ(i),{map:true,target:sample});
              values[i*3]=sample.r;values[i*3+1]=sample.g;values[i*3+2]=sample.b;
            }
            geometry.setAttribute('color',new THREE.BufferAttribute(values,3));
          }
        }
      }
      if(color==='sand'||sampleColor){
        const positions=geometry.attributes.position,values=new Float32Array(positions.count*3),sample=new THREE.Color();
        for(let i=0;i<positions.count;i++){
          if(sampleColor)sampleColor(positions.getX(i),positions.getZ(i),sample);
          else shoreColor(terrain.colorField,positions.getX(i),positions.getZ(i),{map:true,target:sample});
          sample.toArray(values,i*3);
        }
        geometry.setAttribute('color',new THREE.BufferAttribute(values,3));
      }
      if(spherical){geometry.scale(1,MAP_SURFACE_HEIGHT_SCALE,1);warpGeometryToSurface(geometry,world);}
      const plain=geometry.index&&!complete?geometry.toNonIndexed():geometry;
      if(!batches.has(color))batches.set(color,[]);
      batches.get(color).push({position:plain.attributes.position.array,vertexColor:plain.attributes.color?.array,index:complete?plain.index?.array:undefined});
      if(plain!==geometry)geometry.dispose();plain.dispose();
    }
  }
  polygons(terrain.land,0,'terrain',true);polygons(terrain.shores,.003,'sand');
  polygons(terrain.river,.006,'waterLight');
  if(!world.surface?.complete)polygons(terrain.ocean,spherical?.010:.007,'ocean');
  for(const mountain of terrain.mountains){
    polygons(mountain.low,.020,'contour0',false,complete?foothillColorField(mountain.low,world,terrain.colorField):null);
    polygons(mountain.high,.023,'contour1');polygons(mountain.snow,.033,'snow');
  }
  return [...batches].map(([color,arrays])=>{
    const position=new Float32Array(arrays.reduce((count,array)=>count+array.position.length,0));
    const vertexColor=arrays[0].vertexColor?new Float32Array(position.length):undefined;
    let offset=0;for(const array of arrays){position.set(array.position,offset);vertexColor?.set(array.vertexColor,offset);offset+=array.position.length;}
    if(complete){
      const index=new Uint32Array(arrays.reduce((count,array)=>count+array.index.length,0));
      let cursor=0,base=0;for(const array of arrays){for(const vertex of array.index)index[cursor++]=base+vertex;base+=array.position.length/3;}
      return {color,position,index,...(vertexColor?{vertexColor}:{})};
    }
    if(spherical){
      const original=new THREE.BufferGeometry();original.setAttribute('position',new THREE.BufferAttribute(position,3));
      if(vertexColor)original.setAttribute('color',new THREE.BufferAttribute(vertexColor,3));
      const indexed=indexGeometryExact(original);
      if(geometryAttributeBytes(indexed)<geometryAttributeBytes(original)){
        const result={color,position:indexed.attributes.position.array,index:indexed.index.array,
          ...(vertexColor?{vertexColor:indexed.attributes.color.array}:{})};
        original.dispose();indexed.dispose();return result;
      }
      original.dispose();indexed.dispose();
    }
    return {color,position,...(vertexColor?{vertexColor}:{})};
  });
}
