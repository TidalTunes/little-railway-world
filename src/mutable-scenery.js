import {Vector3} from 'three';
import {surfacePoint} from './world-surface.js';

export const REMOVABLE_SCENERY=new Set(['farm','nature','rock','cactus','sheep']);
export const sceneryPlacementId=p=>p.id??`${p.kind}:${p.x}:${p.z}`;
export const SCENERY_CLEAR_DURATION=.55;

/** Source IDs survive material batching and exact vertex indexing. Removing a
 * field animates only its own vertices; neighbouring crops and the terrain
 * never need to be hidden or rebuilt. Offscreen removals survive streaming. */
export function createMutableScenery(world,{onChange=()=>{}}={}){
  const removed=new Set(),chunks=new Map(),records=new Map(),active=new Set(),buffers=new Map();let revision=0,bytes=0;
  // Count backing allocations, not views: several material batches can retain
  // ownership views into the same transferred buffer. Animation snapshots only
  // contribute while a cleared prop is actually shrinking.
  function retain(array){const buffer=array.buffer,count=buffers.get(buffer)??0;if(!count)bytes+=buffer.byteLength;buffers.set(buffer,count+1);}
  function release(array){const buffer=array.buffer,count=buffers.get(buffer);if(count>1)buffers.set(buffer,count-1);else if(count){bytes-=buffer.byteLength;buffers.delete(buffer);}}
  function hide(entry,scale){
    for(const part of entry.parts){
      const position=part.mesh.geometry.attributes.position;
      // Most scenery is never cleared. Snapshot only an actively shrinking
      // object instead of retaining a second copy of every resident mesh.
      if(scale>0&&!part.original){
        part.original=new Float32Array(part.indices.length*3);
        retain(part.original);
        part.indices.forEach((index,i)=>{part.original[i*3]=position.getX(index);part.original[i*3+1]=position.getY(index);part.original[i*3+2]=position.getZ(index);});
      }
      let start=part.indices[0],previous=start;
      for(let i=0;i<part.indices.length;i++){
        const index=part.indices[i],offset=i*3;
        position.setXYZ(index,entry.center.x+(scale?(part.original[offset]-entry.center.x)*scale:0),
          entry.center.y+(scale?(part.original[offset+1]-entry.center.y)*scale:0),
          entry.center.z+(scale?(part.original[offset+2]-entry.center.z)*scale:0));
        if(index>previous+1){position.addUpdateRange(start*3,(previous-start+1)*3);start=index;}previous=index;
      }
      if(part.indices.length){position.addUpdateRange(start*3,(previous-start+1)*3);position.needsUpdate=true;}
      if(scale===0&&part.original){release(part.original);part.original=null;}
    }
  }
  function markRemoved(entry){for(const part of entry.parts)part.state.removedTags.add(entry.sceneryIndex);}
  function rayState(mesh,tags){
    const originalRaycast=mesh.raycast,state={mesh,tags,originalRaycast,removedTags:new Set()},hits=[];
    // Removed props stop affecting camera/foot probes immediately. Keeping the
    // original BVH is safe for unchanged neighbours; shrinking props are
    // filtered by their source tag, so no per-frame BVH rebuild is needed.
    state.raycast=function(raycaster,intersections){
      if(!state.removedTags.size)return originalRaycast.call(this,raycaster,intersections);
      const first=raycaster.firstHitOnly;hits.length=0;
      try{raycaster.firstHitOnly=false;originalRaycast.call(this,raycaster,hits);}finally{raycaster.firstHitOnly=first;}
      let closest=null;
      for(const hit of hits){
        const triangle=hit.faceIndex*3,index=this.geometry.index?.getX(triangle)??triangle;
        if(state.removedTags.has(tags[index]))continue;
        if(first){if(!closest||hit.distance<closest.distance)closest=hit;}else intersections.push(hit);
      }
      if(closest)intersections.push(closest);
    };
    mesh.raycast=state.raycast;return state;
  }
  function addChunk(key,meshes,descriptions,packets){
    removeChunk(key);
    const byIndex=new Map(descriptions.map(p=>[p.sceneryIndex,{id:sceneryPlacementId(p),sceneryIndex:p.sceneryIndex,placement:p,
      center:surfacePoint(world,p.x,p.y??0,p.z,new Vector3()),parts:[],elapsed:0}])),states=[];
    meshes.forEach((mesh,meshIndex)=>{
      const tags=packets[meshIndex]?.sceneryIndex;if(!tags)return;
      const lists=new Map();
      for(let i=0;i<tags.length;i++){const id=tags[i];if(!byIndex.has(id))continue;if(!lists.has(id))lists.set(id,[]);lists.get(id).push(i);}
      if(!lists.size)return;const state=rayState(mesh,tags);states.push(state);retain(tags);
      for(const [id,list]of lists){const indices=new Uint32Array(list);retain(indices);byIndex.get(id).parts.push({mesh,state,indices,original:null});}
    });
    const entries=[...byIndex.values()];chunks.set(key,{entries,states});
    for(const entry of entries){
      if(!records.has(entry.id))records.set(entry.id,new Set());records.get(entry.id).add(entry);
      if(removed.has(entry.id)){markRemoved(entry);hide(entry,0);}
    }
    return entries;
  }
  function removeChunk(key){
    const chunk=chunks.get(key);if(!chunk)return;
    for(const entry of chunk.entries){
      active.delete(entry);const copies=records.get(entry.id);copies?.delete(entry);if(!copies?.size)records.delete(entry.id);
      for(const part of entry.parts){release(part.indices);if(part.original){release(part.original);part.original=null;}}
    }
    for(const state of chunk.states){release(state.tags);if(state.mesh.raycast===state.raycast)state.mesh.raycast=state.originalRaycast;}
    chunks.delete(key);
  }
  function clear(items,{animate=true}={}){
    let changed=false;
    for(const item of items){
      if(item==null)continue;const id=typeof item==='string'?item:sceneryPlacementId(item),already=removed.has(id);
      if(already&&animate)continue;
      if(!already){removed.add(id);changed=true;}
      for(const entry of records.get(id)??[]){
        markRemoved(entry);
        if(animate&&entry.parts.length){entry.elapsed=0;active.add(entry);}
        else{active.delete(entry);hide(entry,0);}
      }
    }
    if(changed){revision++;onChange();}return changed;
  }
  return {removed,addChunk,removeChunk,clear,get revision(){return revision;},get activeCount(){return active.size;},get bytes(){return bytes;},
    update(dt){
      if(!Number.isFinite(dt)||dt<=0)return;
      for(const entry of active){entry.elapsed=Math.min(SCENERY_CLEAR_DURATION,entry.elapsed+dt);
        const t=entry.elapsed/SCENERY_CLEAR_DURATION;hide(entry,1-t*t*(3-2*t));if(t>=1)active.delete(entry);}
    },
    dispose(){for(const key of chunks.keys())removeChunk(key);active.clear();records.clear();removed.clear();},
  };
}
