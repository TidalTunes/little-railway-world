import * as THREE from 'three';
import {colorTerrainGeometry} from './terrain-colors.js';

/** Pure worker compilation: each color becomes a transferable position buffer. */
export function compileMapTerrainGeometry(terrain){
  const batches=new Map();
  function polygons(multi,y,color,colored=false){
    for(const rings of multi){
      const shape=new THREE.Shape(rings[0].map(([x,z])=>new THREE.Vector2(x,-z)));
      for(const ring of rings.slice(1))shape.holes.push(new THREE.Path(ring.map(([x,z])=>new THREE.Vector2(x,-z))));
      let geometry=new THREE.ShapeGeometry(shape);geometry.rotateX(-Math.PI/2);geometry.translate(0,y,0);
      if(colored){const base=geometry;geometry=colorTerrainGeometry(base,terrain.colorField,{map:true});base.dispose();}
      const plain=geometry.index?geometry.toNonIndexed():geometry;
      if(!batches.has(color))batches.set(color,[]);
      batches.get(color).push({position:plain.attributes.position.array,vertexColor:plain.attributes.color?.array});
      if(plain!==geometry)geometry.dispose();plain.dispose();
    }
  }
  polygons(terrain.land,0,'terrain',true);polygons(terrain.shores,.003,'sand');
  polygons(terrain.river,.006,'waterLight');polygons(terrain.ocean,.007,'ocean');
  for(const mountain of terrain.mountains){
    polygons(mountain.low,.020,'contour0');polygons(mountain.high,.023,'contour1');polygons(mountain.snow,.033,'snow');
  }
  return [...batches].map(([color,arrays])=>{
    const position=new Float32Array(arrays.reduce((count,array)=>count+array.position.length,0));
    const vertexColor=arrays[0].vertexColor?new Float32Array(position.length):undefined;
    let offset=0;for(const array of arrays){position.set(array.position,offset);vertexColor?.set(array.vertexColor,offset);offset+=array.position.length;}
    return {color,position,...(vertexColor?{vertexColor}:{})};
  });
}
