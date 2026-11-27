import * as THREE from 'three';
import {tree} from './assets.js';
import {consolidate} from './geometry.js';
import {bakeMaterialColors} from './color-batches.js';
import {applyDetailReveal,createDetailDepthMaterial} from './detail-reveal.js';
import {applySceneStyle} from './scene-style.js';
import {rigidSurfacePoseMatrix} from './world-surface.js';

export const TREE_FALL_DURATION=.78;
export const TREE_REGROW_DURATION=1.2;
export const treeVariant=p=>({pine:Math.floor((p.scale??1)*7)%3,round:3,gold:4,light:5,broadleaf:6,acacia:7,birch:8}[p.variant]??0);
export const treeId=p=>p.id??`tree:${p.x}:${p.y??0}:${p.z}`;

// Raycast only instances in cells crossed by a short foot/camera ray. The
// geometry stays shared, and removal only changes a slot's active flag.
function installTreeRaycast(mesh,entries){
  const cellSize=8,cells=new Map(),bounds=new THREE.Box3(),instance=new THREE.Matrix4();
  const inverse=new THREE.Matrix4(),localRay=new THREE.Ray(),start=new THREE.Vector3(),end=new THREE.Vector3();
  const scratch=new THREE.Mesh(mesh.geometry,mesh.material),hits=[],candidates=new Set();
  mesh.geometry.computeBoundingBox();
  for(let index=0;index<entries.length;index++){
    instance.copy(entries[index].base).scale(new THREE.Vector3().setScalar(entries[index].placement.scale??1));bounds.copy(mesh.geometry.boundingBox).applyMatrix4(instance);
    for(let x=Math.floor(bounds.min.x/cellSize);x<=Math.floor(bounds.max.x/cellSize);x++)
      for(let y=Math.floor(bounds.min.y/cellSize);y<=Math.floor(bounds.max.y/cellSize);y++)
        for(let z=Math.floor(bounds.min.z/cellSize);z<=Math.floor(bounds.max.z/cellSize);z++){
          const key=`${x}:${y}:${z}`;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(index);
        }
  }
  mesh.raycast=(raycaster,intersects)=>{
    inverse.copy(mesh.matrixWorld).invert();localRay.copy(raycaster.ray).applyMatrix4(inverse);
    if(!localRay.intersectsSphere(mesh.boundingSphere))return;
    candidates.clear();
    // Walking rays are short; distant inspection rays use the ordinary broad
    // phase rather than enumerating thousands of empty spatial cells.
    if(Number.isFinite(raycaster.far)&&raycaster.far<=64){
      raycaster.ray.at(raycaster.near,start).applyMatrix4(inverse);raycaster.ray.at(raycaster.far,end).applyMatrix4(inverse);
      bounds.makeEmpty().expandByPoint(start).expandByPoint(end);
      for(let x=Math.floor(bounds.min.x/cellSize);x<=Math.floor(bounds.max.x/cellSize);x++)
        for(let y=Math.floor(bounds.min.y/cellSize);y<=Math.floor(bounds.max.y/cellSize);y++)
          for(let z=Math.floor(bounds.min.z/cellSize);z<=Math.floor(bounds.max.z/cellSize);z++)
            for(const index of cells.get(`${x}:${y}:${z}`)??[])candidates.add(index);
    }else for(let index=0;index<entries.length;index++)candidates.add(index);
    for(const index of candidates){
      if(!entries[index].active)continue;
      mesh.getMatrixAt(index,instance);scratch.matrixWorld.multiplyMatrices(mesh.matrixWorld,instance);
      hits.length=0;scratch.raycast(raycaster,hits);
      for(const hit of hits){hit.instanceId=index;hit.object=mesh;intersects.push(hit);}
    }
  };
}

/** One template per species, one instanced draw per species in each resident
 * cell. All geometry comes from the same tree art as the unchanged art world. */
export function createMutableTrees(world,{onChange=()=>{}}={}){
  const templates=new Map(),chunks=new Map(),records=new Map(),removed=new Set(),falling=new Set(),growing=new Set();
  const matrix=new THREE.Matrix4(),rotation=new THREE.Matrix4(),scale=new THREE.Vector3(),axis=new THREE.Vector3();
  let revision=0,disposed=false;
  function templateFor(variant){
    if(!templates.has(variant)){
      const source=new THREE.Group();tree(source,{variant});bakeMaterialColors(consolidate(source));
      const mesh=source.children[0];mesh.geometry.computeBoundingBox();mesh.geometry.computeBoundingSphere();
      templates.set(variant,{geometry:mesh.geometry,material:mesh.material});source.clear();
    }
    return templates.get(variant);
  }
  function changed(){revision++;onChange();}
  function addChunk(key,parent,placements,{reveal={value:1}}={}){
    if(disposed)throw new Error('Cannot add trees to a disposed renderer');
    removeChunk(key);
    const root=new THREE.Group();root.name=`mutable-trees-${key}`;parent.add(root);
    const byVariant=new Map(),meshes=[],materials=[],entries=[],bounds=new THREE.Box3();
    const depth=createDetailDepthMaterial(reveal);let bytes=0,triangles=0;
    for(const placement of placements){
      const id=treeId(placement);if(records.has(id))continue;
      const variant=treeVariant(placement);if(!byVariant.has(variant))byVariant.set(variant,[]);
      byVariant.get(variant).push({id,placement,active:!removed.has(id),elapsed:0});
    }
    for(const [variant,items]of byVariant){
      const template=templateFor(variant),material=applyDetailReveal(template.material.clone(),reveal);
      applySceneStyle(material,{kind:template.material.userData.sceneStyle??'asset'});materials.push(material);
      const mesh=new THREE.InstancedMesh(template.geometry,material,items.length);mesh.name=`trees-${variant}`;
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.castShadow=mesh.receiveShadow=true;mesh.customDepthMaterial=depth;
      mesh.userData.mutableTreeBatch=true;root.add(mesh);meshes.push(mesh);
      let padding=0;
      for(let index=0;index<items.length;index++){
        const entry=items[index],p=entry.placement,s=p.scale??1;
        entry.mesh=mesh;entry.index=index;entry.chunk=key;
        entry.base=rigidSurfacePoseMatrix(world,p.x,p.y??0,p.z,p.rotation??0);
        matrix.copy(entry.base).scale(scale.setScalar(s));mesh.setMatrixAt(index,matrix);
        records.set(entry.id,entry);entries.push(entry);padding=Math.max(padding,s*3.2);
      }
      mesh.computeBoundingBox();mesh.boundingBox.expandByScalar(padding);
      mesh.boundingSphere=mesh.boundingBox.getBoundingSphere(new THREE.Sphere());bounds.union(mesh.boundingBox);
      for(const entry of items)if(!entry.active)mesh.setMatrixAt(entry.index,matrix.copy(entry.base).scale(scale.setScalar(0)));
      installTreeRaycast(mesh,items);
      bytes+=mesh.instanceMatrix.array.byteLength;
      triangles+=(template.geometry.index?.count??template.geometry.attributes.position.count)/3*items.length;
    }
    const chunk={key,root,meshes,materials,depth,entries,bounds,bytes,triangles};chunks.set(key,chunk);return chunk;
  }
  function removeChunk(key){
    const chunk=chunks.get(key);if(!chunk)return;
    for(const entry of chunk.entries){records.delete(entry.id);falling.delete(entry);growing.delete(entry);}
    for(const mesh of chunk.meshes)mesh.dispose();
    chunk.materials.forEach(material=>material.dispose());chunk.depth.dispose();chunk.root.removeFromParent();chunks.delete(key);
  }
  function deactivate(entry){
    entry.active=false;removed.add(entry.id);changed();
  }
  function fellTree(id,{direction={x:1,z:0}}={}){
    const entry=records.get(id);if(disposed||!entry?.active)return false;
    deactivate(entry);growing.delete(entry);entry.elapsed=0;
    // Express the requested direction in the tree's original tangent frame.
    // Its authored yaw stays in base; the pivot is always the trunk root.
    const length=Math.hypot(direction.x??0,direction.z??0)||1,dx=(direction.x??0)/length,dz=(direction.z??0)/length;
    const yaw=entry.placement.rotation??0;
    entry.axis=new THREE.Vector3(dz*Math.cos(yaw)+dx*Math.sin(yaw),0,-dx*Math.cos(yaw)+dz*Math.sin(yaw)).normalize();
    if(entry.axis.lengthSq()<.01)entry.axis.set(0,0,-1);
    falling.add(entry);return true;
  }
  function removeTree(id){
    if(disposed||removed.has(id))return false;
    const entry=records.get(id);removed.add(id);
    if(entry){
      entry.active=false;falling.delete(entry);growing.delete(entry);entry.mesh.setMatrixAt(entry.index,matrix.copy(entry.base).scale(scale.setScalar(0)));
      entry.mesh.instanceMatrix.addUpdateRange(entry.index*16,16);entry.mesh.instanceMatrix.needsUpdate=true;
    }
    changed();return true;
  }
  function restoreTree(id,{animate=true}={}){
    if(disposed||!removed.delete(id))return false;
    const entry=records.get(id);
    if(entry){
      falling.delete(entry);entry.active=true;entry.elapsed=0;
      if(animate)growing.add(entry);else growing.delete(entry);
      entry.mesh.setMatrixAt(entry.index,matrix.copy(entry.base).scale(scale.setScalar((entry.placement.scale??1)*(animate?.12:1))));
      entry.mesh.instanceMatrix.addUpdateRange(entry.index*16,16);entry.mesh.instanceMatrix.needsUpdate=true;
    }
    changed();return true;
  }
  function update(dt){
    if(disposed||!falling.size&&!growing.size)return;
    const dirty=new Set();
    for(const entry of falling){
      entry.elapsed=Math.min(TREE_FALL_DURATION,entry.elapsed+Math.max(0,dt));
      const fall=Math.min(1,entry.elapsed/.60),fade=THREE.MathUtils.smoothstep(entry.elapsed,.58,TREE_FALL_DURATION);
      rotation.makeRotationAxis(axis.copy(entry.axis),Math.PI*.49*fall*fall);
      matrix.multiplyMatrices(entry.base,rotation).scale(scale.setScalar((entry.placement.scale??1)*(1-fade)));
      entry.mesh.setMatrixAt(entry.index,matrix);entry.mesh.instanceMatrix.addUpdateRange(entry.index*16,16);dirty.add(entry.mesh);
      if(entry.elapsed>=TREE_FALL_DURATION)falling.delete(entry);
    }
    for(const entry of growing){
      entry.elapsed=Math.min(TREE_REGROW_DURATION,entry.elapsed+Math.max(0,dt));
      const progress=THREE.MathUtils.smoothstep(entry.elapsed,0,TREE_REGROW_DURATION);
      matrix.copy(entry.base).scale(scale.setScalar((entry.placement.scale??1)*(.12+.88*progress)));
      entry.mesh.setMatrixAt(entry.index,matrix);entry.mesh.instanceMatrix.addUpdateRange(entry.index*16,16);dirty.add(entry.mesh);
      if(entry.elapsed>=TREE_REGROW_DURATION)growing.delete(entry);
    }
    for(const mesh of dirty)mesh.instanceMatrix.needsUpdate=true;
  }
  function dispose(){
    if(disposed)return;disposed=true;
    for(const key of [...chunks.keys()])removeChunk(key);
    for(const template of templates.values()){template.geometry.dispose();template.material.dispose();}
    templates.clear();removed.clear();records.clear();falling.clear();growing.clear();
  }
  return {addChunk,removeChunk,fellTree,removeTree,restoreTree,update,dispose,removed,
    get revision(){return revision;},get activeFalls(){return falling.size;},get templateCount(){return templates.size;},
    get meshes(){return [...chunks.values()].flatMap(chunk=>chunk.meshes);}};
}
