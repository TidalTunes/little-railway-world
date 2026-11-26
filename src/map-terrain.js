import clipping from './polygon-ops.js';
import {createMountainContours} from './mountain-contours.js';
import {hydrologyFor} from './hydrology.js';
import {BoundsTree} from './spatial-index.js';

function polygonBounds(polygon){
  let minX=Infinity,minZ=Infinity,maxX=-Infinity,maxZ=-Infinity;
  for(const [x,z]of polygon[0]){minX=Math.min(minX,x);minZ=Math.min(minZ,z);maxX=Math.max(maxX,x);maxZ=Math.max(maxZ,z);}
  return{minX,minZ,maxX,maxZ};
}

function prepareGlobeTerrain(world,hydrology){
  const land=world.biomes.land,river=hydrology.water,ocean=world.biomes.ocean??[];
  // Dry coastal/lake interiors are already part of the generated biome model.
  // River ground can remain beneath the opaque, finer-tessellated bank/water
  // layers. The ocean sphere sits below these layers, so banks still need one
  // ocean cut at river mouths rather than relying on the sea to hide them.
  const banks=ocean.length&&hydrology.banks.length?clipping.difference(hydrology.banks,ocean):hydrology.banks;
  const shores=[...(world.biomes.oceanShore??[]),...banks];
  const waterTree=new BoundsTree([...river,...hydrology.banks],polygonBounds);
  const cutWater=contours=>contours.flatMap(polygon=>{
    const nearby=waterTree.query(polygonBounds(polygon));
    return nearby.length?clipping.difference([polygon],nearby):[polygon];
  });
  const mountains=(world.mountains??[]).map(mountain=>{
    // Global range meshes were clipped to dry coastal footprints when authored.
    // Preserve their river valleys with local cuts, avoiding a full worldwide
    // coastline intersection for each of the three contour levels.
    const contours=mountain.mapContours??createMountainContours(mountain);
    return{id:mountain.id,low:cutWater(contours.low),high:cutWater(contours.high),snow:cutWater(contours.snow)};
  });
  return{land,shores,river,ocean,mountains,colorField:{sites:world.biomes.sites??[],bounds:world.bounds,surface:world.surface}};
}

/**
 * Clone-safe terrain drawing prepared in the world worker. All global Boolean
 * operations happen here; compileMapTerrainGeometry then triangulates the rings.
 * Input geography is immutable and no renderer resources are created.
 */
export function prepareMapTerrain(world){
  const island=[[world.outline]],hydrology=hydrologyFor(world);
  if(world.surface?.complete&&world.biomes?.land)return prepareGlobeTerrain(world,hydrology);
  const river=hydrology.water,ocean=world.biomes?.ocean??[];
  const water=ocean.length?clipping.union(river,ocean):river;
  const riverBank=clipping.difference(hydrology.banks,water);
  const shores=world.biomes?.oceanShore?.length?clipping.union(riverBank,world.biomes.oceanShore):riverBank;
  const land=clipping.difference(island,water,shores);
  const mountains=(world.mountains??[]).map(mountain=>{
    const contours=mountain.mapContours??createMountainContours(mountain);
    return {id:mountain.id,low:clipping.intersection(contours.low,land),
      high:clipping.intersection(contours.high,land),snow:clipping.intersection(contours.snow,land)};
  });
  return {land,shores,river,ocean,mountains,colorField:{sites:world.biomes?.sites??[],bounds:world.bounds,surface:world.surface}};
}
