import * as THREE from 'three';
import {clipPolygonsToBounds} from './polygon-region.js';
import { buildWorld } from './world.js';
import { buildTerrain } from './geography.js';
import { consolidate } from './geometry.js';
import { bakeMaterialColors } from './color-batches.js';
import {serializeGeometryBVH,geometryBVHTransfers} from './geometry-bvh.js';
import {indexGeometryExact,geometryAttributeBytes} from './index-geometry.js';
import {warpGeometryToSurface,SURFACE_MAX_SEGMENT} from './world-surface.js';
import {tessellateSurfaceGeometry} from './surface-tessellation.js';
import {farmLivestockPlacements} from './farm-livestock.js';
import {treeId} from './mutable-trees.js';
import {sceneryPlacementId,REMOVABLE_SCENERY} from './mutable-scenery.js';

function segmentInterval(a,b,bounds){
  let lo=0,hi=1;
  for(const [start,delta,min,max]of [[a.x,b.x-a.x,bounds.minX,bounds.maxX],[a.z,b.z-a.z,bounds.minZ,bounds.maxZ]]){
    if(Math.abs(delta)<1e-12){if(start<min||start>max)return null;continue;}
    const first=(min-start)/delta,last=(max-start)/delta;
    lo=Math.max(lo,Math.min(first,last));hi=Math.min(hi,Math.max(first,last));
    if(hi-lo<1e-8)return null;
  }
  return [lo,hi];
}

export function clipRailRanges(line,bounds){
  const runs=[];
  for(let i=1;i<line.points.length;i++){
    const interval=segmentInterval(line.points[i-1],line.points[i],bounds);if(!interval)continue;
    const a=line.distances[i-1],length=line.distances[i]-a;
    const start=a+length*interval[0],end=a+length*interval[1],last=runs.at(-1);
    if(last&&start-last.end<1e-6)last.end=end;else runs.push({start,end});
  }
  return runs.flatMap(run=>(line.renderRanges??[{start:0,end:line.length}]).flatMap(range=>{
    const start=Math.max(range.start,run.start),end=Math.min(range.end,run.end);
    return end-start>1e-6?[{start,end}]:[];
  }));
}

/** Runs in a worker: actual terrain, CSG, assets and rail art become plain buffers. */
export function compileDetailPacket(region,network){
  const bounds=region.bounds;
  const sourcePlacements=(region.placements??[]).map(p=>network.gameplay&&p.kind==='tree'&&!p.id?{...p,id:treeId(p)}:p);
  const mutableTrees=network.gameplay?sourcePlacements.filter(p=>p.kind==='tree'):[];
  const mutableScenery=network.gameplay?sourcePlacements.filter(p=>REMOVABLE_SCENERY.has(p.kind)).map((p,i)=>({...p,id:sceneryPlacementId(p),sceneryIndex:i+1})):[];
  const sceneryIndices=network.gameplay?new Map(sourcePlacements.filter(p=>REMOVABLE_SCENERY.has(p.kind)).map((p,i)=>[p,i+1])):null;
  const islands=clipPolygonsToBounds([[network.outline]],bounds);
  const mountainIds=new Set((region.mountains??[]).map(m=>m.id));
  const lines=(region.lines??network.lines).map(line=>({...line,renderRanges:clipRailRanges(line,bounds),
    tunnels:line.tunnels.filter(t=>mountainIds.has(t.mountainId))}));
  // A mountain belongs to one region but a traversing line can belong to an
  // adjacent cell. Its complete cutter is still needed for the owned massif.
  for(const line of network.lines){
    if(lines.some(candidate=>candidate.id===line.id)||!line.cuts?.some(c=>mountainIds.has(c.mountainId)))continue;
    lines.push({...line,renderRanges:[],tunnels:line.tunnels.filter(t=>mountainIds.has(t.mountainId))});
  }
  const root=new THREE.Group(),surfaceRoot=network.surface?.type==='sphere'?new THREE.Group():null,ownedMaterials=new Set();
  const local={...network,...region,lines,terrainChunk:true,terrainSource:network,
    placements:network.gameplay?sourcePlacements.filter(p=>p.kind!=='tree'):sourcePlacements,
    cityStreets:region.cityStreets??[],stations:region.stations??[],mountains:region.mountains??[]};
  if(network.biomes)local.biomes={...network.biomes,
    ocean:network.biomes.ocean?.length?clipPolygonsToBounds(network.biomes.ocean,bounds):[],
    oceanShore:network.biomes.oceanShore?.length?clipPolygonsToBounds(network.biomes.oceanShore,bounds):[]};
  try{
    for(const island of islands)buildTerrain(root,{...local,outline:island[0]});
    buildWorld(root,local,{terrain:false,rigidAssets:surfaceRoot,animatedLife:true,mutablePlacements:sceneryIndices});
    if(sceneryIndices)root.traverse(node=>{if(node.isMesh&&!node.geometry.attributes.sceneryIndex){node.geometry=node.geometry.clone();node.geometry.setAttribute('sceneryIndex',new THREE.Float32BufferAttribute(new Float32Array(node.geometry.attributes.position.count),1));}});
    for(const group of [root,surfaceRoot].filter(Boolean))group.traverse(node=>{for(const material of node.userData.ownedMaterials??[])ownedMaterials.add(material);});
    // Geographic terrain needs the exact chart-to-sphere mapping. Rigid
    // assets and physical-width rails are already in surface coordinates:
    // only combine them after this warp, so latitude cannot squeeze the art.
    if(surfaceRoot){
      consolidate(root);
      for(const mesh of root.children){
        const chartGeometry=mesh.geometry;
        mesh.geometry=tessellateSurfaceGeometry(chartGeometry,SURFACE_MAX_SEGMENT);
        chartGeometry.dispose();warpGeometryToSurface(mesh.geometry,network);
      }
      while(surfaceRoot.children.length)root.add(surfaceRoot.children[0]);
    }
    bakeMaterialColors(consolidate(root));
    root.userData.ownedMaterials.forEach(material=>ownedMaterials.add(material));
    const renderBounds=new THREE.Box3();
    const meshes=root.children.map(mesh=>{
      const original=mesh.geometry,indexed=indexGeometryExact(original);
      if(geometryAttributeBytes(indexed)<geometryAttributeBytes(original)){mesh.geometry=indexed;original.dispose();}
      else indexed.dispose();
      const geometry=mesh.geometry,material=mesh.material;
      geometry.computeBoundingBox();renderBounds.union(geometry.boundingBox);
      return {position:geometry.attributes.position.array,normal:geometry.attributes.normal?.array,color:geometry.attributes.color?.array,sceneryIndex:geometry.attributes.sceneryIndex?.array,
        index:geometry.index?.array,bvh:serializeGeometryBVH(geometry),material:{name:material.name,color:material.color.toArray(),
          roughness:material.roughness??1,metalness:material.metalness??0,side:material.side,flatShading:true,vertexColors:material.vertexColors,sceneStyle:material.userData.sceneStyle??'asset'}};
    });
    const lifeKinds=new Set(['sheep','tree','farmPatch','house','apartment','civic','tower','plaza']);
    const lifePlacements=sourcePlacements.flatMap(p=>p.kind==='farm'?farmLivestockPlacements(network,p).map(animal=>({...animal,farmId:network.gameplay?sceneryPlacementId(p):animal.farmId})):lifeKinds.has(p.kind)?[p]:[])
      .map(p=>({kind:p.kind,id:p.id,farmId:p.farmId,x:p.x,y:p.y??0,z:p.z,rotation:p.rotation??0,radius:p.radius??0,scale:p.scale??1,
        ...(Number.isFinite(p.roamRadius)?{roamRadius:p.roamRadius}:{})}));
    // Walking mode uses the same authored/generated objects as the overview.
    // Send their small source records alongside the existing geometry, so
    // collisions and nearby embellishments never regenerate a different town.
    const placements=[...sourcePlacements,...(region.stations??[]).map(p=>({...p,kind:'station'}))];
    return {key:region.key??`${bounds.minX}:${bounds.minZ}`,bounds:region.cullBounds??bounds,cellBounds:bounds,meshes,lifePlacements,
      placements,...(network.gameplay?{mutableTrees,mutableScenery}:{}),cityStreets:region.cityStreets??[],
      renderBounds:renderBounds.isEmpty()?null:{min:renderBounds.min.toArray(),max:renderBounds.max.toArray()}};
  }finally{
    for(const group of [root,surfaceRoot].filter(Boolean))group.traverse(node=>{if(node.geometry)node.geometry.dispose();
      for(const material of node.userData.ownedMaterials??[])ownedMaterials.add(material);});
    ownedMaterials.forEach(material=>material.dispose());root.clear();surfaceRoot?.clear();
  }
}

export function detailPacketTransfers(packet){
  return [...new Set(packet.meshes.flatMap(mesh=>[mesh.position?.buffer,mesh.normal?.buffer,mesh.color?.buffer,mesh.sceneryIndex?.buffer,mesh.index?.buffer,...geometryBVHTransfers(mesh.bvh)]).filter(Boolean))];
}
