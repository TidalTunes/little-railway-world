import {BufferAttribute,BufferGeometry} from 'three';

/** Index a non-indexed Float32 geometry without changing any attribute bits.
 * A numeric open-addressed table avoids per-vertex strings and allocations.
 * The source stays untouched; callers own and dispose both geometries.
 */
export function indexGeometryExact(geometry){
  if(geometry.index)throw new TypeError('Exact indexing requires non-indexed geometry');
  if(Object.keys(geometry.morphAttributes).length)throw new TypeError('Exact indexing does not support morph attributes');
  const names=Object.keys(geometry.attributes),attributes=names.map(name=>geometry.attributes[name]);
  const count=geometry.attributes.position?.count??0;
  for(const attribute of attributes){
    if(attribute.isInterleavedBufferAttribute||!(attribute.array instanceof Float32Array)
      ||attribute.count!==count||!Number.isInteger(attribute.itemSize)||attribute.itemSize<1){
      throw new TypeError('Exact indexing requires equally sized, non-interleaved Float32 attributes');
    }
  }
  const words=attributes.map(attribute=>new Uint32Array(attribute.array.buffer,attribute.array.byteOffset,attribute.array.length));
  const indices=new Uint32Array(count),representatives=new Uint32Array(count);
  let capacity=1;while(capacity<count*2)capacity*=2;
  const slots=new Int32Array(capacity),mask=capacity-1;
  let unique=0;
  for(let vertex=0;vertex<count;vertex++){
    let hash=0x811c9dc5;
    for(let a=0;a<attributes.length;a++){
      const size=attributes[a].itemSize,offset=vertex*size;
      for(let component=0;component<size;component++)hash=Math.imul(hash^words[a][offset+component],16777619);
    }
    // Float coordinates share many low bits, so avalanche before masking.
    hash^=hash>>>16;hash=Math.imul(hash,0x85ebca6b);
    hash^=hash>>>13;hash=Math.imul(hash,0xc2b2ae35);hash^=hash>>>16;
    let slot=hash&mask;
    while(slots[slot]){
      const representative=slots[slot]-1;
      let equal=true;
      for(let a=0;equal&&a<attributes.length;a++){
        const size=attributes[a].itemSize,offset=vertex*size,previous=representative*size;
        for(let component=0;component<size;component++){
          if(words[a][offset+component]!==words[a][previous+component]){equal=false;break;}
        }
      }
      if(equal)break;
      slot=(slot+1)&mask;
    }
    if(slots[slot])indices[vertex]=indices[slots[slot]-1];
    else{slots[slot]=vertex+1;indices[vertex]=unique;representatives[unique++]=vertex;}
  }
  const result=new BufferGeometry();
  for(let a=0;a<attributes.length;a++){
    const source=attributes[a],size=source.itemSize,array=new Float32Array(unique*size),output=new Uint32Array(array.buffer);
    for(let vertex=0;vertex<unique;vertex++){
      const offset=vertex*size,previous=representatives[vertex]*size;
      for(let component=0;component<size;component++)output[offset+component]=words[a][previous+component];
    }
    const attribute=new BufferAttribute(array,size,source.normalized);
    attribute.name=source.name;attribute.setUsage(source.usage);attribute.gpuType=source.gpuType;
    result.setAttribute(names[a],attribute);
  }
  // 0xffff is reserved for primitive restart, so never use it as a vertex.
  result.setIndex(new BufferAttribute(unique<=65535?new Uint16Array(indices):indices,1));
  result.name=geometry.name;
  for(const group of geometry.groups)result.addGroup(group.start,group.count,group.materialIndex);
  result.setDrawRange(geometry.drawRange.start,geometry.drawRange.count);
  result.boundingBox=geometry.boundingBox?.clone()??null;
  result.boundingSphere=geometry.boundingSphere?.clone()??null;
  return result;
}

export function geometryAttributeBytes(geometry){
  return Object.values(geometry.attributes).reduce((total,attribute)=>total+attribute.array.byteLength,0)
    +(geometry.index?.array.byteLength??0);
}
