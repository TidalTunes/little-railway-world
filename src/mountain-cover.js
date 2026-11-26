import {C} from './palette.js';
import {terrainColor} from './terrain-colors.js';
import {mountainSurfaceHeight,mountainSnowHeight,mountainFootprintDistance} from './mountain-shape.js';
import {riverBankDistance} from './hydrology.js';
import {biomeDistance} from './biomes.js';
import {polylineTree,BoundsTree,pointBox} from './spatial-index.js';
import {sampleLandscape} from './landscape-field.js';

const clamp=(n)=>Math.max(0,Math.min(1,n));
const smooth=(a,b,n)=>{const t=clamp((n-a)/(b-a));return t*t*(3-2*t);};
function seedFor(text){let n=2166136261;for(const c of text)n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;}
function noise(seed,x,z){let n=Math.imul(x,374761393)^Math.imul(z,668265263)^seed;n=Math.imul(n^n>>>13,1274126177);return((n^n>>>16)>>>0)/4294967295;}
const coverSample={};

/** Color only: the mountain's shared geometric surface is never displaced. */
export function mountainSurfaceColor(world,mountain,point,normal,{surface=true,target}={}){
  const color=target??C.rock.clone(),brightness=normal.x*-.55+normal.y*.77+normal.z*.32;
  // CSG splits a vertical wall into many triangles; roundoff can put their
  // nominally zero Y normals on either side of zero. Give both the same stone
  // tone, or those invisible numerical differences become bright stripes.
  const stone=normal.y<-.15?C.rockDark:Math.abs(normal.y)<.15?C.rockLight
    :brightness<.05?C.rockDark:brightness>.68?C.rockLight:C.rock;
  if(!surface||normal.y<.18)return color.copy(stone);
  const h=Math.max(0,point.y),altitude=h/mountain.height;
  terrainColor(world.terrainSource??world,point.x,point.z,{target:color});
  sampleLandscape(world.terrainSource??world,point.x,point.z,coverSample);
  // Carry surrounding vegetation up the lower shoulders, with coherent grove
  // pockets giving way to open alpine meadows. Dry and frozen foothills keep
  // their own ground palette rather than acquiring an unrelated green belt.
  const vegetation=smooth(0,.10,color.g-color.r),forest=smooth(.28,.68,coverSample.patch);
  const meadow=smooth(.06,.30,altitude)*(1-smooth(.56,.79,altitude));
  color.lerp(C.meadow,(.22+.12*coverSample.moisture)*meadow*vegetation);
  color.lerp(C.forestFloor,.32*forest*vegetation*smooth(.025,.16,altitude)*(1-smooth(.31,.56,altitude)));
  const steep=smooth(.90,.48,normal.y),high=smooth(.53,.84,altitude);
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
  const source=world.terrainSource??world,sites=source.biomes?.sites??[],landscape={};
  const projection=source.surface?.projection,equirectangular=projection?.type==='equirectangular';
  const rowSpacing=equirectangular?spacing*projection.radius/source.surface.radius:spacing;
  const period=equirectangular?2*Math.PI*projection.radius:0,originX=equirectangular?-period/2:0;
  const tracks=polylineTree(source.lines??world.lines??[]),reserved=obstacles(world);
  for(let iz=Math.floor(bounds.minZ/rowSpacing);iz<=Math.floor(bounds.maxZ/rowSpacing);iz++){
    // Chart longitudes contract on the globe. Keep physical crown spacing by
    // fitting a whole number of columns around each latitude row. The most
    // poleward possible jitter controls spacing, and periodic columns preserve
    // it across the date line. Row definitions never depend on chunk bounds.
    let columns=0,columnSpacing=spacing;
    if(equirectangular){
      const latitude=projection.centralLatitude*Math.PI/180-(iz+.5)*rowSpacing/projection.radius;
      const poleward=Math.min(Math.PI/2,Math.abs(latitude)+.22*rowSpacing/projection.radius);
      columns=Math.max(1,Math.floor(2*Math.PI*source.surface.radius*Math.cos(poleward)/spacing));
      columnSpacing=period/columns;
    }
    for(let index=Math.floor((bounds.minX-originX)/columnSpacing);index<=Math.floor((bounds.maxX-originX)/columnSpacing);index++){
      const ix=columns?((index%columns)+columns)%columns:index;
      const x=originX+(index+.5+(noise(seed,ix,iz)-.5)*.44)*columnSpacing;
      const z=(iz+.5+(noise(seed^0x537,ix,iz)-.5)*.44)*rowSpacing;
      if(x<bounds.minX||x>=bounds.maxX||z<bounds.minZ||z>=bounds.maxZ)continue;
      sampleLandscape(source,x,z,landscape);
      const patch=smooth(.28,.68,landscape.patch);
      const scale=.68+patch*.22+noise(seed^0x173,ix,iz)*.12,radius=.85*scale;
      if(source.surface?.complete&&source.biomes&&biomeDistance(source,'ice',x,z)>=-radius-.2)continue;
      if(mountainFootprintDistance(mountain,x,z)>-radius-.2)continue;
      const y=mountainSurfaceHeight(mountain,x,z),altitude=y/mountain.height;
      if(y<.18||y>Math.min(mountain.height*.55,mountainSnowHeight(mountain,x,z)-2.8))continue;
      let moisture=1,nearest=Infinity;
      for(const site of sites){const d=(site.x-x)**2+(site.z-z)**2;if(d<nearest){nearest=d;moisture=site.type==='desert'?.10:site.type==='forest'?1.18:.83;}}
      if(noise(seed^0x927,ix,iz)>(.14+.73*patch)*moisture*(1-smooth(.36,.57,altitude)))continue;
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
