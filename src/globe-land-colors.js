import {C,color} from './palette.js';
import {sampleLandscape} from './landscape-field.js';

const clamp=value=>Math.max(0,Math.min(1,value));
const smooth=value=>{const t=clamp(value);return t*t*(3-2*t);};
const mix=(a,b,t)=>a.clone().lerp(b,t);
const canopyFloor=color(.615,.079,145),dryHeath=color(.72,.071,99),sandstone=color(.77,.077,65),blueIce=color(.90,.035,220);

/** One restrained district palette for both ground and its scenery. A high
 * patch value is a closed grove or stony desert; open ground occupies the same
 * clearings used by the placement planner. This only paints existing vertices.
 */
export function paintLandscapeColor(target,landscape,forest=0,desert=0,ice=0,grass=0){
  const cover=smooth((landscape.patch-.27)/.46),dry=smooth((.57-landscape.moisture)/.36);
  target.lerp(C.meadow,forest*(1-cover)*.15);
  target.lerp(canopyFloor,forest*cover*.13);
  target.lerp(C.meadow,grass*(1-cover)*.11);
  target.lerp(dryHeath,grass*dry*.12);
  target.lerp(C.grassDark,grass*(1-dry)*cover*.07);
  target.lerp(C.desertLight,desert*(1-cover)*.20);
  target.lerp(sandstone,desert*cover*.24);
  target.lerp(blueIce,ice*dry*.13);
  const variation=(landscape.moisture-.5)*.028+(landscape.detail-.5)*.012;
  return target.multiplyScalar(1+variation*(1-ice*.8));
}

// These are vegetation families inside the existing placement biomes. Keeping
// them separate preserves every authored farm, forest and dry-land reservation.
const colors={
  tropical:mix(C.forestFloor,C.pineLight,.34),
  woodland:mix(C.grass,C.forestFloor,.82),
  taiga:mix(C.forestFloor,C.pine,.18),
  tundra:mix(C.meadow,C.soilLight,.35),
  savanna:mix(C.grass,C.farmland,.72),
  steppe:mix(C.farmland,C.desert,.24),
  mediterranean:mix(C.grass,C.desert,.22),
  cropland:mix(C.grass,C.farmland,.5),
  meadow:C.grass,
  desert:C.desert,
  ice:C.snow,
};

/** Climate labels are deliberately broad art direction, not a climate survey. */
export function landEcoregion(site){
  if(site.ice)return 'ice';
  if(site.ecoregion&&colors[site.ecoregion])return site.ecoregion;
  const latitude=Math.abs(site.latitude??0);
  if(latitude>=67)return 'tundra';
  if(site.type==='forest')return latitude<26?'tropical':latitude>53?'taiga':'woodland';
  if(site.type==='desert')return 'desert';
  if(site.type==='farmland')return 'cropland';
  return latitude<28?'savanna':latitude>54?'tundra':'meadow';
}

function hash(x,y,z){
  let value=Math.imul(x,374761393)^Math.imul(y,668265263)^Math.imul(z,1442695041);
  value=Math.imul(value^(value>>>13),1274126177);
  return ((value^(value>>>16))>>>0)/4294967295;
}
function noise(x,y,z,scale){
  x=x/scale+13.7;y=y/scale-4.2;z=z/scale+8.9;
  const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z),u=smooth(x-ix),v=smooth(y-iy),w=smooth(z-iz);
  const a=hash(ix,iy,iz)*(1-u)+hash(ix+1,iy,iz)*u;
  const b=hash(ix,iy+1,iz)*(1-u)+hash(ix+1,iy+1,iz)*u;
  const c=hash(ix,iy,iz+1)*(1-u)+hash(ix+1,iy,iz+1)*u;
  const d=hash(ix,iy+1,iz+1)*(1-u)+hash(ix+1,iy+1,iz+1)*u;
  return (a*(1-v)+b*v)*(1-w)+(c*(1-v)+d*v)*w;
}

/** A bounded color lookup field avoids scanning every geographic site for each
 * of the globe's hundreds of thousands of vertices. The samples use physical
 * spherical distances and 3-D noise, so date lines and poles are ordinary ground.
 */
export function createGlobeLandField(source,sites){
  const projection=source.surface.projection??{},radius=projection.radius??source.surface.radius;
  const longitudeOffset=(projection.centralLongitude??0)*Math.PI/180;
  const latitudeOffset=(projection.centralLatitude??0)*Math.PI/180;
  const columns=320,rows=160,values=new Float32Array(columns*(rows+1)*3);
  const prepared=sites.map(site=>{
    const latitude=latitudeOffset-site.z/radius,longitude=longitudeOffset+site.x/radius,c=Math.cos(latitude);
    const region=landEcoregion({...site,latitude:latitude*180/Math.PI});
    return {x:c*Math.sin(longitude),y:Math.sin(latitude),z:c*Math.cos(longitude),
      color:colors[region],forest:['tropical','woodland','taiga'].includes(region)?1:0,
      desert:region==='desert'?1:0,ice:region==='ice'?1:0,
      grass:['meadow','savanna','steppe','mediterranean','tundra'].includes(region)?1:0};
  });
  const distances=new Float64Array(prepared.length),width=.105,smoothing=width*.55;
  const landscape={},paint=C.grass.clone();
  for(let row=0;row<=rows;row++){
    const latitude=Math.PI/2-row*Math.PI/rows,cosine=row===0||row===rows?0:Math.cos(latitude),ny=Math.sin(latitude);
    for(let column=0;column<columns;column++){
      const longitude=-Math.PI+column*Math.PI*2/columns,nx=cosine*Math.sin(longitude),nz=cosine*Math.cos(longitude);
      // Low-frequency warping softens ecological boundaries without creating
      // small isolated spots or changing the exact biome geometry.
      const broad=noise(nx,ny,nz,.19),middle=noise(nx+.7,ny-.2,nz+.5,.08);
      const px=nx+(broad-.5)*.035,py=ny+(middle-.5)*.021,pz=nz+(noise(nx-.4,ny+.6,nz,.23)-.5)*.035;
      let nearest=Infinity;
      for(let i=0;i<prepared.length;i++){
        const site=prepared[i],dx=px-site.x,dy=py-site.y,dz=pz-site.z;
        distances[i]=Math.sqrt(dx*dx+dy*dy+dz*dz+smoothing*smoothing);nearest=Math.min(nearest,distances[i]);
      }
      let total=0,r=0,g=0,b=0,forest=0,desert=0,ice=0,grass=0;
      for(let i=0;i<prepared.length;i++){
        const site=prepared[i],weight=Math.exp(-(distances[i]-nearest)/width);
        total+=weight;r+=site.color.r*weight;g+=site.color.g*weight;b+=site.color.b*weight;
        forest+=site.forest*weight;desert+=site.desert*weight;ice+=site.ice*weight;grass+=site.grass*weight;
      }
      r/=total;g/=total;b/=total;forest/=total;desert/=total;ice/=total;grass/=total;
      const tundra=smooth((Math.abs(latitude)*180/Math.PI-61)/15)*(1-ice)*.88;
      r+=(colors.tundra.r-r)*tundra;g+=(colors.tundra.g-g)*tundra;b+=(colors.tundra.b-b)*tundra;
      const glade=smooth((broad-.42)/.4)*forest*(1-tundra)*.14;
      r+=(C.meadow.r-r)*glade;g+=(C.meadow.g-g)*glade;b+=(C.meadow.b-b)*glade;
      // Broad woodland glades and dry-country variation remain visible from
      // orbit. The same field is used locally; no forest objects are needed here.
      const vegetation=(broad-.5)*.10+(middle-.5)*.045;
      const shade=1+vegetation*(1-ice*.95)*(1+forest*.7);
      const index=(row*columns+column)*3;
      // The full ecology pass runs once over this fixed-size lookup, never for
      // each terrain vertex. Map and close detail sample the identical colors.
      sampleLandscape(source,(longitude-longitudeOffset)*radius,(latitudeOffset-latitude)*radius,landscape);
      paint.setRGB(r*shade,g*shade,b*shade);
      paintLandscapeColor(paint,landscape,forest*(1-tundra)*.65,desert*.8,ice,grass+tundra);
      values[index]=paint.r;values[index+1]=paint.g;values[index+2]=paint.b;
    }
  }
  // A chart's entire top/bottom row denotes a single physical point. Identical
  // values there also make interpolation converge smoothly from every meridian.
  for(const row of [0,rows])for(let column=1;column<columns;column++){
    const first=row*columns*3,index=(row*columns+column)*3;
    values[index]=values[first];values[index+1]=values[first+1];values[index+2]=values[first+2];
  }
  return {columns,rows,values,radius,longitudeOffset,latitudeOffset};
}

export function sampleGlobeLand(field,x,z,target){
  const {columns,rows,values,radius,longitudeOffset,latitudeOffset}=field;
  const longitude=x/radius+longitudeOffset,latitude=Math.max(-Math.PI/2,Math.min(Math.PI/2,latitudeOffset-z/radius));
  const u=((longitude/Math.PI/2+.5)%1+1)%1*columns;
  const v=(.5-latitude/Math.PI)*rows,column=Math.floor(u),row=Math.min(rows-1,Math.floor(v));
  const tx=u-column,ty=v-row,next=(column+1)%columns;
  const a=(row*columns+column)*3,b=(row*columns+next)*3,c=((row+1)*columns+column)*3,d=((row+1)*columns+next)*3;
  target.setRGB(
    (values[a]*(1-tx)+values[b]*tx)*(1-ty)+(values[c]*(1-tx)+values[d]*tx)*ty,
    (values[a+1]*(1-tx)+values[b+1]*tx)*(1-ty)+(values[c+1]*(1-tx)+values[d+1]*tx)*ty,
    (values[a+2]*(1-tx)+values[b+2]*tx)*(1-ty)+(values[c+2]*(1-tx)+values[d+2]*tx)*ty,
  );
  return target;
}
