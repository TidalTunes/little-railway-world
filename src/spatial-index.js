/** Conservative broad phases. Exact geometry is always evaluated by callers. */
export const pointBox=(x,z,r=0)=>({minX:x-r,minZ:z-r,maxX:x+r,maxZ:z+r});
export const boxesOverlap=(a,b)=>a.minX<=b.maxX&&a.maxX>=b.minX&&a.minZ<=b.maxZ&&a.maxZ>=b.minZ;
export function pointsBox(points){let minX=Infinity,minZ=Infinity,maxX=-Infinity,maxZ=-Infinity;for(const p of points){minX=Math.min(minX,p.x);minZ=Math.min(minZ,p.z);maxX=Math.max(maxX,p.x);maxZ=Math.max(maxZ,p.z);}return{minX,minZ,maxX,maxZ};}
function combine(items){let minX=Infinity,minZ=Infinity,maxX=-Infinity,maxZ=-Infinity;for(const {box} of items){minX=Math.min(minX,box.minX);minZ=Math.min(minZ,box.minZ);maxX=Math.max(maxX,box.maxX);maxZ=Math.max(maxZ,box.maxZ);}return{minX,minZ,maxX,maxZ};}
const boxDistance=(box,x,z)=>Math.hypot(Math.max(box.minX-x,0,x-box.maxX),Math.max(box.minZ-z,0,z-box.maxZ));
export class BoundsTree{
  constructor(items,bounds=item=>item){
    this.items=items;
    const build=entries=>{if(!entries.length)return null;const box=combine(entries);if(entries.length<=8)return{box,entries};
      const axis=box.maxX-box.minX>=box.maxZ-box.minZ?'X':'Z';entries.sort((a,b)=>(a.box[`min${axis}`]+a.box[`max${axis}`])-(b.box[`min${axis}`]+b.box[`max${axis}`]));
      const mid=entries.length>>1;return{box,left:build(entries.slice(0,mid)),right:build(entries.slice(mid))};};
    this.root=build(items.map(item=>({item,box:bounds(item)})));
  }
  query(box){const out=[],visit=node=>{if(!node||!boxesOverlap(node.box,box))return;if(node.entries){for(const entry of node.entries)if(boxesOverlap(entry.box,box))out.push(entry.item);}else{visit(node.left);visit(node.right);}};visit(this.root);return out;}
  nearest(x,z,exact,limit=Infinity,padding=0){let best=limit;const visit=node=>{if(!node||boxDistance(node.box,x,z)-padding>best)return;if(node.entries){for(const entry of node.entries)if(boxDistance(entry.box,x,z)-padding<=best)best=Math.min(best,exact(entry.item));return;}
      const a=boxDistance(node.left.box,x,z),b=boxDistance(node.right.box,x,z);if(a<b){visit(node.left);visit(node.right);}else{visit(node.right);visit(node.left);}};visit(this.root);return best;}
}
export class SpatialGrid{
  constructor(size=24){this.size=size;this.cells=new Map();}
  insert(item,box){const entry={item,box};for(let x=Math.floor(box.minX/this.size);x<=Math.floor(box.maxX/this.size);x++)for(let z=Math.floor(box.minZ/this.size);z<=Math.floor(box.maxZ/this.size);z++){const key=`${x},${z}`;if(!this.cells.has(key))this.cells.set(key,[]);this.cells.get(key).push(entry);}}
  query(box){const seen=new Set(),out=[];for(let x=Math.floor(box.minX/this.size);x<=Math.floor(box.maxX/this.size);x++)for(let z=Math.floor(box.minZ/this.size);z<=Math.floor(box.maxZ/this.size);z++)for(const entry of this.cells.get(`${x},${z}`)??[]){if(!seen.has(entry)&&boxesOverlap(entry.box,box)){seen.add(entry);out.push(entry.item);}}return out;}
}

const polylineIndexes=new WeakMap();
/** Shared immutable-network acceleration; appending lines invalidates the cache. */
export function polylineTree(lines){
  let cached=polylineIndexes.get(lines);
  if(!cached||cached.count!==lines.length){
    const items=lines.flatMap((line,lineIndex)=>line.points.slice(1).map((b,index)=>{
      const a=line.points[index],box=pointsBox([a,b]);return{a,b,index,line,lineIndex,box,...box};
    }));
    cached={count:lines.length,tree:new BoundsTree(items,s=>s.box)};polylineIndexes.set(lines,cached);
  }
  return cached.tree;
}
