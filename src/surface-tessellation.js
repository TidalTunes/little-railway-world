import * as THREE from 'three';

/**
 * Split chart triangles before bending them. All long edges are bisected,
 * independently of the opposite vertex, so shared edges keep identical samples.
 * Attributes are interpolated in chart space; the surface transform subsequently
 * carries normals through its Jacobian. The input is never modified.
 */
export function tessellateSurfaceGeometry(input,maxSegment=8){
  if(!(maxSegment>0&&Number.isFinite(maxSegment)))throw new RangeError('Surface segment length must be positive and finite');
  const names=Object.keys(input.attributes),attributes=names.map(name=>input.attributes[name]);
  if(attributes.some(attribute=>attribute.isInterleavedBufferAttribute))throw new TypeError('Surface tessellation needs ordinary buffer attributes');
  const positions=input.attributes.position;
  if(!positions||positions.itemSize!==3)throw new TypeError('Surface tessellation needs three-dimensional positions');
  const offsets=[],sizes=[];let stride=0;
  for(const attribute of attributes){offsets.push(stride);sizes.push(attribute.itemSize);stride+=attribute.itemSize;}
  const positionOffset=offsets[names.indexOf('position')],out=attributes.map(()=>[]),maxSquared=maxSegment*maxSegment*(1+1e-12);
  const read=index=>{
    const vertex=new Float64Array(stride);
    for(let a=0;a<attributes.length;a++)for(let c=0;c<sizes[a];c++)vertex[offsets[a]+c]=attributes[a].array[index*sizes[a]+c];
    return vertex;
  };
  const midpoint=(a,b)=>{const point=new Float64Array(stride);for(let i=0;i<stride;i++)point[i]=(a[i]+b[i])*.5;return point;};
  const long=(a,b)=>{const dx=a[positionOffset]-b[positionOffset],dz=a[positionOffset+2]-b[positionOffset+2];return dx*dx+dz*dz>maxSquared;};
  const emit=vertex=>{for(let a=0;a<attributes.length;a++)for(let c=0;c<sizes[a];c++)out[a].push(vertex[offsets[a]+c]);};
  const indices=input.index?.array,count=indices?.length??positions.count,stack=[];
  for(let i=0;i<count;i+=3){
    stack.push([read(indices?indices[i]:i),read(indices?indices[i+1]:i+1),read(indices?indices[i+2]:i+2)]);
    while(stack.length){
      const [a,b,c]=stack.pop(),ab=long(a,b),bc=long(b,c),ca=long(c,a),mask=(ab?1:0)|(bc?2:0)|(ca?4:0);
      if(!mask){emit(a);emit(b);emit(c);continue;}
      const d=ab?midpoint(a,b):null,e=bc?midpoint(b,c):null,f=ca?midpoint(c,a):null;
      if(mask===7)stack.push([a,d,f],[d,b,e],[f,e,c],[d,e,f]);
      else if(mask===1)stack.push([a,d,c],[d,b,c]);
      else if(mask===2)stack.push([a,b,e],[a,e,c]);
      else if(mask===4)stack.push([a,b,f],[b,c,f]);
      else if(mask===3)stack.push([a,d,c],[d,e,c],[d,b,e]);
      else if(mask===5)stack.push([a,d,f],[d,b,c],[d,c,f]);
      else stack.push([a,b,e],[a,e,f],[f,e,c]);
    }
  }
  const geometry=new THREE.BufferGeometry();
  for(let a=0;a<attributes.length;a++)geometry.setAttribute(names[a],new THREE.Float32BufferAttribute(out[a],sizes[a],attributes[a].normalized));
  return geometry;
}

/** Dyadic shoreline samples match the subdivision of the same edge in detail. */
export function subdivideSurfaceRing(ring,maxSegment=8){
  if(!(maxSegment>0&&Number.isFinite(maxSegment)))throw new RangeError('Surface segment length must be positive and finite');
  if(!ring.length)return [];
  const result=[],first=ring[0],last=ring.at(-1),closed=first[0]===last[0]&&first[1]===last[1];
  for(let i=0;i<ring.length-(closed?1:0);i++){
    const a=ring[i],b=ring[(i+1)%ring.length],length=Math.hypot(b[0]-a[0],b[1]-a[1]);
    const count=2**Math.max(0,Math.ceil(Math.log2(length/maxSegment)));
    for(let j=0;j<count;j++)result.push([a[0]+(b[0]-a[0])*j/count,a[1]+(b[1]-a[1])*j/count]);
  }
  if(closed)result.push([...first]);return result;
}
