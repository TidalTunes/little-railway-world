import { MeshBVH, acceleratedRaycast, CENTER } from 'three-mesh-bvh';

/** Worker-only construction. Indirect indexing preserves triangle/vertex order
 * and colors, and serialization shares buffers ready for transfer ownership. */
export function serializeGeometryBVH(geometry){
  const triangles=(geometry.index?.count??geometry.attributes.position?.count??0)/3;
  if(triangles<1)return null;
  const tree=new MeshBVH(geometry,{indirect:true,strategy:CENTER,targetLeafSize:12,setBoundingBox:false});
  return MeshBVH.serialize(tree,{cloneBuffers:false});
}

/** Hydration attaches an already-built tree; it never rebuilds on the UI thread.
 * Install only on static Mesh objects, since InstancedMesh owns instance traversal. */
export function installGeometryBVH(mesh,serialized){
  if(!serialized)return mesh;
  if(mesh.isInstancedMesh)throw new TypeError('Static geometry BVH installation does not replace InstancedMesh raycasting');
  const geometry=mesh.geometry;
  geometry.boundsTree=MeshBVH.deserialize(serialized,geometry,{setIndex:false});
  mesh.raycast=acceleratedRaycast;
  geometry.addEventListener('dispose',function clearBoundsTree(){
    this.boundsTree=null;this.removeEventListener('dispose',clearBoundsTree);
  });
  return mesh;
}

export function geometryBVHTransfers(serialized){
  if(!serialized)return [];
  return [...new Set([...serialized.roots,serialized.index?.buffer,serialized.indirectBuffer?.buffer].filter(Boolean))];
}
