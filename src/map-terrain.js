import clipping from './polygon-ops.js';
import {createMountainContours} from './mountain-contours.js';
import {hydrologyFor} from './hydrology.js';

/**
 * Clone-safe terrain drawing prepared in the world worker. All global Boolean
 * operations happen here; compileMapTerrainGeometry then triangulates the rings.
 * Input geography is immutable and no renderer resources are created.
 */
export function prepareMapTerrain(world){
  const island=[[world.outline]],hydrology=hydrologyFor(world);
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
  return {land,shores,river,ocean,mountains,colorField:{sites:world.biomes?.sites??[],bounds:world.bounds}};
}
