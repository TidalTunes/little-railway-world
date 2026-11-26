import {C} from './palette.js';
import {terrainColor} from './terrain-colors.js';
import {mountainSurfaceHeight,mountainSnowHeight,mountainFootprintDistance} from './mountain-shape.js';
import {riverBankDistance} from './hydrology.js';
import {biomeDistance} from './biomes.js';
import {polylineTree,BoundsTree,pointBox} from './spatial-index.js';

const clamp=(n)=>Math.max(0,Math.min(1,n));
const smooth=(a,b,n)=>{const t=clamp((n-a)/(b-a));return t*t*(3-2*t);};
function seedFor(text){let n=2166136261;for(const c of text)n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;}
function noise(seed,x,z){let n=Math.imul(x,374761393)^Math.imul(z,668265263)^seed;n=Math.imul(n^n>>>13,1274126177);return((n^n>>>16)>>>0)/4294967295;}

/** Color only: the mountain's shared geometric surface is never displaced. */
export function mountainSurfaceColor(world,mountain,point,normal,{surface=true,target}={}){
  const color=target??C.rock.clone(),brightness=normal.x*-.55+normal.y*.77+normal.z*.32;
  const stone=normal.y<-.15?C.rockDark:normal.y>=0&&normal.y<.15?C.rockLight
    :brightness<.05?C.rockDark:brightness>.68?C.rockLight:C.rock;
  if(!surface||normal.y<.18)return color.copy(stone);
  const h=Math.max(0,point.y),altitude=h/mountain.height;
  terrainColor(world.terrainSource??world,point.x,point.z,{target:color});
  // Gentle lower shoulders retain their surrounding ground color. Higher
  // meadows become cooler and quieter before the exposed rock takes over.
  const meadow=smooth(.05,.28,altitude)*(1-smooth(.47,.72,altitude));
  color.lerp(C.meadow,.25*meadow);
  const forest=.5+.5*Math.sin(point.x*.077+Math.sin(point.z*.041)*2.1)*Math.sin(point.z*.091-.8);
  color.lerp(C.forestFloor,.22*forest*smooth(.025,.16,altitude)*(1-smooth(.30,.53,altitude)));
  const steep=smooth(.90,.48,normal.y),high=smooth(.44,.79,altitude);
  const rock=Math.max(steep,high)*smooth(.015,.12,altitude);
  return color.lerp(stone,rock);
}

function segmentDistance(x,z,a,b){
  const dx=b.x-a.x,dz=b.z-a.z,t=clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1));
  return Math.hypot(x-a.x-dx*t,z-a.z-dz*t);
}
const obstacleCache=new WeakMap();
function obstacles(world){
  if(!obstacleCache.has(world)){
    const items=[...(world.placements??[]),...(world.stations??[]),...(world.cities??[])].map(p=>({
      x:p.x,z:p.z,radius:p.radius??Math.hypot(p.width??2,p.depth??2)/2,
    }));
    obstacleCache.set(world,new BoundsTree(items,p=>pointBox(p.x,p.z,p.radius)));
  }return obstacleCache.get(world);
}

/**
 * Global jittered lattice gives deterministic, non-overlapping tree groups.
 * Region copies own centres only, so visiting adjacent cells cannot duplicate
 * or reshuffle a forest. Sampling is bounded to the requested local rectangle.
 */
export function mountainTrees(world,mountain){
  if(world.density===0)return [];
  const extent=mountain.range?.bounds??{minX:mountain.x-mountain.radius,maxX:mountain.x+mountain.radius,
    minZ:mountain.z-mountain.radius,maxZ:mountain.z+mountain.radius};
  const own=mountain.renderBounds??extent;
  const bounds={minX:Math.max(extent.minX,own.minX),maxX:Math.min(extent.maxX,own.maxX),
    minZ:Math.max(extent.minZ,own.minZ),maxZ:Math.min(extent.maxZ,own.maxZ)};
  const spacing=5.4,seed=seedFor(`mountain-forest:${mountain.range?.seed??mountain.id}`),result=[];
  const source=world.terrainSource??world,sites=source.biomes?.sites??[];
  const tracks=polylineTree(source.lines??world.lines??[]),reserved=obstacles(world);
  for(let iz=Math.floor(bounds.minZ/spacing);iz<=Math.floor(bounds.maxZ/spacing);iz++){
    for(let ix=Math.floor(bounds.minX/spacing);ix<=Math.floor(bounds.maxX/spacing);ix++){
      const x=(ix+.5+(noise(seed,ix,iz)-.5)*.44)*spacing;
      const z=(iz+.5+(noise(seed^0x537,ix,iz)-.5)*.44)*spacing;
      if(x<bounds.minX||x>=bounds.maxX||z<bounds.minZ||z>=bounds.maxZ)continue;
      const scale=.72+noise(seed^0x173,ix,iz)*.30,radius=.85*scale;
      if(source.surface?.complete&&source.biomes&&biomeDistance(source,'ice',x,z)>=-radius-.2)continue;
      if(mountainFootprintDistance(mountain,x,z)>-radius-.2)continue;
      const y=mountainSurfaceHeight(mountain,x,z),altitude=y/mountain.height;
      if(y<.18||y>Math.min(mountain.height*.55,mountainSnowHeight(mountain,x,z)-2.8))continue;
      const patch=.5+.5*Math.sin(x*.077+Math.sin(z*.041)*2.1)*Math.sin(z*.091-.8);
      let moisture=1,nearest=Infinity;
      for(const site of sites){const d=(site.x-x)**2+(site.z-z)**2;if(d<nearest){nearest=d;moisture=site.type==='desert'?.10:site.type==='forest'?1.18:.83;}}
      if(noise(seed^0x927,ix,iz)>(.20+.62*patch)*moisture*(1-smooth(.36,.57,altitude)))continue;
      // Keep the entire crown away from portals, cut lips, railways and water.
      const railClear=radius+3;
      if(tracks.nearest(x,z,s=>segmentDistance(x,z,s.a,s.b),railClear)<railClear)continue;
      if(riverBankDistance(source,x,z)<radius+.85)continue;
      if(source.biomes&&biomeDistance(source,'ocean',x,z)>-radius-.85)continue;
      if(reserved.query(pointBox(x,z,radius+.3)).some(p=>Math.hypot(p.x-x,p.z-z)<radius+p.radius+.3))continue;
      let safe=true;
      for(let j=0;j<16;j++){
        const angle=j*Math.PI/8,h=mountainSurfaceHeight(mountain,x+Math.cos(angle)*radius,z+Math.sin(angle)*radius);
        if(Math.abs(h-y)>.40*scale){safe=false;break;}
      }
      if(!safe)continue;
      result.push({id:`${mountain.id}:tree:${ix}:${iz}`,x,y,z,scale,radius,variant:Math.floor(noise(seed^0x293,ix,iz)*3)});
    }
  }
  return result;
}
