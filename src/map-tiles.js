import clipping from './polygon-ops.js';

function tileBounds(polygon,size){
  let minX=Infinity,minZ=Infinity,maxX=-Infinity,maxZ=-Infinity;
  for(const [x,z]of polygon[0]){
    if(!Number.isFinite(x)||!Number.isFinite(z))throw new TypeError('Map tiles require finite polygon coordinates');
    minX=Math.min(minX,x);maxX=Math.max(maxX,x);minZ=Math.min(minZ,z);maxZ=Math.max(maxZ,z);
  }
  return{left:Math.floor(minX/size),right:Math.ceil(maxX/size),top:Math.floor(minZ/size),bottom:Math.ceil(maxZ/size)};
}
const rectangle=(left,top,right,bottom,size)=>[[[
  [left*size,top*size],[right*size,top*size],[right*size,bottom*size],[left*size,bottom*size],[left*size,top*size],
]]];

/**
 * Keep continent triangulation local before bending it onto the sphere.
 * Each polygon is bisected along the aligned grid; children only process their
 * clipped fragment. This avoids re-clipping a whole coastline for every tile.
 * Holes and disconnected fragments are retained, coordinates are not jittered,
 * and the input is never mutated. Each returned polygon fits one size×size cell.
 */
export function splitMapPolygons(multi,size=192){
  if(!(Number.isFinite(size)&&size>0))throw new RangeError('Map tile size must be positive and finite');
  if(!Array.isArray(multi))throw new TypeError('Map tiles require a MultiPolygon');
  const output=[],stack=[];
  for(let i=multi.length-1;i>=0;i--){
    const polygon=multi[i];
    if(!Array.isArray(polygon)||!Array.isArray(polygon[0])||polygon[0].length<3)continue;
    stack.push({polygon,...tileBounds(polygon,size)});
  }
  while(stack.length){
    const node=stack.pop(),{polygon,left,right,top,bottom}=node;
    if(right<=left||bottom<=top)continue;
    if(right-left<=1&&bottom-top<=1){output.push(polygon);continue;}
    const horizontal=right-left>=bottom-top,cut=horizontal?Math.floor((left+right)/2):Math.floor((top+bottom)/2);
    const halves=horizontal
      ?[{left,right:cut,top,bottom},{left:cut,right,top,bottom}]
      :[{left,right,top,bottom:cut},{left,right,top:cut,bottom}];
    // Reverse push preserves deterministic west-to-east / north-to-south order.
    for(let h=halves.length-1;h>=0;h--){
      const half=halves[h],fragments=clipping.intersection([polygon],rectangle(half.left,half.top,half.right,half.bottom,size));
      for(let i=fragments.length-1;i>=0;i--){
        const fragment=fragments[i],tight=tileBounds(fragment,size);
        stack.push({polygon:fragment,left:Math.max(half.left,tight.left),right:Math.min(half.right,tight.right),
          top:Math.max(half.top,tight.top),bottom:Math.min(half.bottom,tight.bottom)});
      }
    }
  }
  return output;
}
