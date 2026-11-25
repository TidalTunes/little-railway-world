import * as THREE from 'three';

const BIOME_COLORS={farmland:'farmland',forest:'forestFloor',plains:'grass',
  desert:'desert',ocean:'ocean',mountain:'mountainFloor'};

/** Pure worker compilation: each color becomes a transferable position buffer. */
export function compileMapTerrainGeometry(terrain){
  const batches=new Map();
  function polygons(multi,y,color){
    for(const rings of multi){
      const shape=new THREE.Shape(rings[0].map(([x,z])=>new THREE.Vector2(x,-z)));
      for(const ring of rings.slice(1))shape.holes.push(new THREE.Path(ring.map(([x,z])=>new THREE.Vector2(x,-z))));
      const geometry=new THREE.ShapeGeometry(shape);geometry.rotateX(-Math.PI/2);geometry.translate(0,y,0);
      const plain=geometry.index?geometry.toNonIndexed():geometry;
      if(!batches.has(color))batches.set(color,[]);
      batches.get(color).push(plain.attributes.position.array);
      if(plain!==geometry)geometry.dispose();plain.dispose();
    }
  }
  polygons(terrain.land,0,'grass');polygons(terrain.shores,.003,'sand');
  for(const biome of terrain.biomes)polygons(biome.polygons,.004,BIOME_COLORS[biome.type]??'grass');
  polygons(terrain.river,.006,'waterLight');polygons(terrain.ocean,.007,'ocean');
  for(const mountain of terrain.mountains){
    polygons(mountain.low,.020,'contour0');polygons(mountain.high,.023,'contour1');polygons(mountain.snow,.033,'snow');
  }
  return [...batches].map(([color,arrays])=>{
    const position=new Float32Array(arrays.reduce((count,array)=>count+array.length,0));
    let offset=0;for(const array of arrays){position.set(array,offset);offset+=array.length;}
    return {color,position};
  });
}
