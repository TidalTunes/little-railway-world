import clipping from './polygon-ops.js';
import {BoundsTree,pointsBox} from './spatial-index.js';

const indexes=new WeakMap();
const ringBounds=ring=>pointsBox(ring.map(([x,z])=>({x,z})));
function indexFor(polygons){
  if(!indexes.has(polygons)){
    const entries=polygons.map(polygon=>({polygon,box:ringBounds(polygon[0]),
      holes:new BoundsTree(polygon.slice(1),ringBounds)}));
    indexes.set(polygons,new BoundsTree(entries,entry=>entry.box));
  }
  return indexes.get(polygons);
}

/** Exact regional clipping of immutable multipolygons. Outside polygons and
 * outside holes cannot affect an intersection, so avoid sending a planet's
 * worth of coastlines and rivers through the polygon sweep for each small cell.
 * Cached trees live only in the worker; neither source geometry nor winding is
 * changed. The Boolean operation retains islands, holes, and disconnected cuts.
 */
export function clipPolygonsToBounds(polygons,bounds){
  if(!polygons?.length)return [];
  const selected=indexFor(polygons).query(bounds).map(({polygon,holes})=>
    [polygon[0],...holes.query(bounds)]);
  if(!selected.length)return [];
  const rectangle=[[[bounds.minX,bounds.minZ],[bounds.maxX,bounds.minZ],
    [bounds.maxX,bounds.maxZ],[bounds.minX,bounds.maxZ],[bounds.minX,bounds.minZ]]];
  return clipping.intersection(selected,[rectangle]);
}
