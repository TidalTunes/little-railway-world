import { box, cylinder, roof, group, ico, beam, v, polygon } from './geometry.js';
import { M } from './palette.js';

// Bounds include every roof, wheel and trim piece. Placement uses the footprint,
// while detail stays inside it: an asset never silently occupies a neighbour.
export const ASSET_BOUNDS = Object.freeze({
  house: { width: 2.2, depth: 2.2, height: 2.4 },
  station: { width: 6.4, depth: 2.4, height: 2.4 },
  tree: { radius: .85, height: 2.8 },
  landmark: { radius: 2, height: 4.5 },
  apartment: { radius: 2.05, height: 5 },
  civic: { radius: 2.8, height: 5 },
  plaza: { radius: 2.6, height: .9 },
  tower: { radius: 2.1, height: 8 },
  farmPatch: { width: 3, depth: 4, height: 1.6 },
  cactus: { radius: .70, height: 2.4 },
  sheep: { width: .46, depth: .72, height: .53 },
  person: { radius: .17, height: .75 },
  trainCar: { width: 1.12, depth: 2.4, height: 1.6 },
});

const variantOf = (value, count) => ((Math.trunc(value) % count) + count) % count;

function asset(parent, name, { x = 0, y = 0, z = 0, rotation = 0, scale = 1 } = {}) {
  const g = group(parent, x, y, z, rotation);
  g.name = name;
  g.scale.setScalar(scale);
  g.userData.footprint = { ...ASSET_BOUNDS[name] };
  g.userData.rigidSurfaceAsset = true;
  return g;
}

function frontWindow(g, x, y, z, width = .36, height = .44, palette) {
  box(g, x, y, z, width + .10, height + .10, .035, palette?.trim??'trim');
  box(g, x, y, z + .025, width, height, .025, 'window');
}

export function house(parent, { x = 0, y = 0, z = 0, rotation = 0, variant = 0, color = 'plaster', scale = 1, palette } = {}) {
  const g = asset(parent, 'house', { x, y, z, rotation, scale });
  const type = variantOf(variant, 4);
  const h = type === 2 ? 1.65 : 1.42;
  const w = type === 1 ? 1.62 : 1.82;
  const d = type === 1 ? 1.90 : 1.72;
  const roofColor = palette?.roof??['roof', 'roofBlue', 'roofLight', 'roofDark'][type];
  const wall=palette?(type===2?palette.body:palette.light):color,trim=palette?.trim??'trim';
  box(g, 0, .07, 0, w + .10, .14, d + .10, 'platform');
  box(g, 0, h / 2 + .12, 0, w, h, d, wall);
  box(g, 0, h + .12, 0, w + .06, .10, d + .06, trim);
  roof(g, w + .24, d + .24, .51, h + .16, roofColor);
  const front = d / 2 + .022;
  box(g, 0, .53, front, .34, .80, .045, palette?.dark??'timber');
  frontWindow(g, -w * .29, .91, front,.36,.44,palette);
  frontWindow(g, w * .29, .91, front,.36,.44,palette);
  for (const side of [-1, 1]) {
    box(g, side * (w / 2 + .02), .92, 0, .035, .49, .48, trim);
    box(g, side * (w / 2 + .045), .92, 0, .025, .37, .36, 'window');
  }
  // One recognizable accent per house, rather than repeated tiny ornament.
  if (type === 1) {
    box(g, 0, 1.16, front + .035, .65, .10, .12, roofColor);
  } else if (type !== 2) {
    box(g, -.49, 1.97, -.35, .24, .50, .28, palette?.dark??'roofDark');
    box(g, -.49, 2.22, -.35, .29, .08, .33, trim);
  }
  return g;
}

export function station(parent, { x = 0, y = 0, z = 0, rotation = 0, color = 'plaster', palette } = {}) {
  const g = asset(parent, 'station', { x, y, z, rotation });
  const trim=palette?.trim??'trim',roofColor=palette?.roof??'roofBlue',dark=palette?.dark??'timber';
  box(g, 0, .10, 0, 6.4, .20, 2.4, 'platform');
  box(g, 0, .208, 1.155, 6.4, .016, .09, palette?.accent??trim);
  box(g, -1.45, .97, -.42, 2.62, 1.54, 1.42, palette?.light??color);
  const roofGroup = group(g, -1.45, 0, -.42);
  roof(roofGroup, 2.82, 1.50, .49, 1.78, roofColor);
  box(g, -1.45, .74, .314, .50, 1.07, .045, dark);
  frontWindow(g, -2.22, 1.09, .314, .43, .53,palette);
  frontWindow(g, -.68, 1.09, .314, .43, .53,palette);
  // The shelter stops well behind the platform edge: the rail has its own space.
  box(g, 1.42, 1.80, -.10, 2.82, .14, 1.65, roofColor);
  for (const xx of [.20, 2.65]) {
    cylinder(g, xx, .98, .35, .055, .055, 1.55, palette?.body??'teal', 6);
  }
  box(g, 1.42, .51, -.56, 1.25, .12, .38, dark);
  box(g, 1.42, .75, -.74, 1.25, .39, .07, dark);
  for (const xx of [1.00, 1.84]) box(g, xx, .33, -.56, .08, .24, .30, 'metal');
  box(g, 2.88, .43, -.70, .30, .46, .30, palette?.body??'teal');
  // Warm platform lanterns remain inside the reserved shelter footprint.
  for(const xx of [.20,2.65]){
    box(g,xx,1.61,.35,.13,.20,.13,'lamp');
    box(g,xx,1.73,.35,.20,.055,.20,dark);
  }
  return g;
}

export function tree(parent, { x = 0, y = 0, z = 0, scale = 1, variant = 0 } = {}) {
  const g = asset(parent, 'tree', { x, y, z, scale });
  const type = variantOf(variant, 6);
  cylinder(g, 0, .50, 0, .085, .13, 1.00, 'bark', 5);
  if (type < 3) {
    cylinder(g, 0, 1.40, 0, 0, .80, 1.45, type === 1 ? 'pineLight' : 'pine', 7);
    cylinder(g, 0, 2.03, 0, 0, .57, 1.38, type === 2 ? 'pineDark' : 'pineLight', 7);
  } else {
    const foliage = ['leaf', 'leafGold', 'leafLight'][type - 3];
    ico(g, 0, 1.55, 0, .84, 1.05, .84, foliage);
  }
  return g;
}

function clockFace(g, x, y, z, radius, palette) {
  cylinder(g, x, y, z, radius, radius, .045, palette?.trim??'trim', 12).rotation.x = Math.PI / 2;
  box(g, x, y + radius * .20, z + .035, .035, radius * .51, .02, 'metal');
  box(g, x + radius * .16, y, z + .035, radius * .39, .035, .02, 'metal');
}

export function landmark(parent, { x = 0, y = 0, z = 0, rotation = 0, variant = 0, scale = 1, palette } = {}) {
  const g = asset(parent, 'landmark', { x, y, z, rotation, scale });
  const type = variantOf(variant, 3);
  if (type === 0) {
    box(g, 0, .10, 0, 2.20, .20, 2.20, 'platform');
    box(g, 0, 1.74, 0, 1.46, 3.28, 1.46, 'peach');
    box(g, 0, 3.40, 0, 1.66, .16, 1.66, 'trim');
    clockFace(g, 0, 2.77, .756, .37);
    const sideClock = group(g, .756, 2.77, 0, Math.PI / 2);
    clockFace(sideClock, 0, 0, 0, .37);
    roof(g, 1.84, 1.84, .71, 3.49, 'roofDark');
    cylinder(g, 0, 4.29, 0, .035, .045, .18, 'gold', 5);
    box(g, 0, .62, .75, .45, 1.04, .05, 'timber');
  } else if (type === 1) {
    box(g, 0, .08, 0, 2.02, .16, 2.82, 'platform');
    box(g, 0, .98, 0, 1.75, 1.80, 2.52, 'plaster');
    roof(g, 1.99, 2.76, .62, 1.90, 'roofBlue');
    box(g, 0, 1.67, .73, 1.02, 3.18, 1.04, 'plaster');
    box(g, 0, 3.26, .73, 1.14, .13, 1.16, 'trim');
    cylinder(g, 0, 3.79, .73, 0, .81, .94, 'teal', 4).rotation.y = Math.PI / 4;
    frontWindow(g, 0, 2.71, 1.27, .33, .55);
    box(g, 0, .62, 1.285, .45, 1.05, .05, 'timber');
    for (const side of [-1, 1]) box(g, side * .89, 1.24, -.55, .04, .66, .38, 'window');
  } else {
    box(g, 0, .07, 0, 2.28, .14, 2.28, 'platform');
    for (const xx of [-.62, .62]) {
      for (const zz of [-.62, .62]) box(g, xx, 1.33, zz, .15, 2.52, .15, 'timber');
      beam(g, v(xx, .48, -.62), v(xx, 2.38, .62), .10, 'timber');
    }
    cylinder(g, 0, 2.81, 0, .96, .96, 1.14, 'teal', 10);
    cylinder(g, 0, 2.27, 0, 1.01, 1.01, .12, 'trim', 10);
    cylinder(g, 0, 3.37, 0, 1.01, 1.01, .12, 'trim', 10);
    cylinder(g, 0, 3.66, 0, 0, 1.08, .48, 'roofBlue', 10);
  }
  if(palette){
    const colors={plaster:'light',peach:'light',trim:'trim',roofDark:'roof',roofBlue:'roof',teal:'body',timber:'dark',gold:'accent'};
    const replacements=new Map(Object.entries(colors).map(([name,key])=>[M[name],palette[key]]));
    g.traverse(part=>{if(part.isMesh&&replacements.has(part.material))part.material=replacements.get(part.material);});
  }
  return g;
}

function buildingColors(palette){
  return palette??{body:'peach',light:'plaster',dark:'roofDark',roof:'roofBlue',accent:'gold',trim:'trim'};
}

function windowsAround(g,width,depth,y,columns,palette){
  for(const angle of [0,Math.PI/2,Math.PI,Math.PI*1.5]){
    const side=group(g,0,0,0,angle),turned=angle===Math.PI/2||angle===Math.PI*1.5;
    const faceWidth=turned?depth:width,faceDepth=turned?width:depth;
    for(let i=0;i<columns;i++)frontWindow(side,(i-(columns-1)/2)*faceWidth/(columns+.55),y,faceDepth/2+.018,.38,.48,palette);
  }
}

export function apartment(parent,{x=0,y=0,z=0,rotation=0,variant=0,scale=1,palette}={}){
  const g=asset(parent,'apartment',{x,y,z,rotation,scale}),c=buildingColors(palette),type=variantOf(variant,3);
  const floors=type===0?3:4,height=floors*.91,width=type===1?2.40:2.52,depth=2.48;
  box(g,0,.09,0,2.80,.18,2.80,'platform');
  box(g,0,height/2+.18,0,width,height,depth,c.light);
  for(let floor=0;floor<floors;floor++){
    windowsAround(g,width,depth,.69+floor*.91,2,c);
    if(floor>0)box(g,0,.18+floor*.91,0,width+.045,.08,depth+.045,c.body);
  }
  box(g,0,.64,depth/2+.024,.46,.92,.06,c.dark);
  box(g,0,1.16,depth/2+.11,.78,.13,.33,c.roof);
  box(g,0,height+.20,0,2.70,.15,2.70,c.trim);
  if(type!==1){
    roof(g,2.78,2.76,.55,height+.28,c.roof);
    box(g,-.68,height+.56,-.54,.23,.42,.29,c.dark);
  }else{
    box(g,0,height+.34,0,2.72,.15,2.72,c.roof);
    box(g,-.48,height+.57,-.47,1.10,.32,1.05,c.body);
    box(g,-.48,height+.77,-.47,1.21,.12,1.16,c.roof);
    for(const xx of [-1.23,1.23])box(g,xx,height+.49,0,.10,.22,2.55,c.trim);
    for(const zz of [-1.23,1.23])box(g,0,height+.49,zz,2.55,.22,.10,c.trim);
  }
  return g;
}

export function civic(parent,{x=0,y=0,z=0,rotation=0,variant=0,scale=1,palette}={}){
  const g=asset(parent,'civic',{x,y,z,rotation,scale}),c=buildingColors(palette),type=variantOf(variant,3);
  box(g,0,.09,0,3.90,.18,3.90,'platform');
  box(g,0,1.31,-.15,3.35,2.26,2.72,c.light);
  windowsAround(group(g,0,0,-.15),3.35,2.72,1.37,3,c);
  box(g,0,.78,1.235,.67,1.18,.06,c.dark);
  box(g,0,.22,1.64,2.86,.12,.47,c.trim);
  for(const xx of [-1.27,-.66,.66,1.27])cylinder(g,xx,1.24,1.55,.105,.13,1.92,c.trim,8);
  box(g,0,2.24,1.48,3.12,.20,.56,c.body);
  box(g,0,2.43,1.48,3.40,.18,.72,c.roof);
  roof(g,3.70,3.02,.62,2.48,c.roof);
  if(type===0){
    box(g,0,3.27,-.43,1.15,1.55,1.18,c.body);
    box(g,0,4.05,-.43,1.30,.14,1.33,c.trim);
    const clock=group(g,0,3.65,.181);clockFace(clock,0,0,0,.29,c);
    roof(group(g,0,0,-.43),1.50,1.53,.51,4.12,c.roof);
    cylinder(g,0,4.74,-.43,.035,.045,.20,c.accent,6);
  }else if(type===1){
    cylinder(g,0,3.06,-.14,.70,.84,.70,c.body,8);
    cylinder(g,0,3.47,-.14,0,.89,.55,c.roof,8);
    cylinder(g,0,3.80,-.14,.045,.065,.14,c.accent,6);
  }else{
    for(const side of [-1,1]){
      const cupola=group(g,side*1.20,0,-.67);
      box(cupola,0,3.12,0,.63,.76,.65,c.body);
      roof(cupola,.82,.84,.44,3.52,c.roof);
    }
    box(g,0,2.88,1.50,.50,.53,.10,c.accent);
  }
  return g;
}

export function plaza(parent,{x=0,y=0,z=0,rotation=0,variant=0,scale=1,palette}={}){
  const g=asset(parent,'plaza',{x,y,z,rotation,scale}),c=buildingColors(palette),type=variantOf(variant,3);
  cylinder(g,0,.06,0,2.58,2.58,.12,'platform',16);
  cylinder(g,0,.13,0,2.43,2.43,.06,'grassLight',16);
  box(g,0,.173,0,4.62,.024,.72,'sand');box(g,0,.175,0,.72,.024,4.62,'sand');
  for(const xx of [-1.43,1.43])for(const zz of [-1.43,1.43]){
    cylinder(g,xx,.20,zz,.48,.50,.16,c.trim,8);
    ico(g,xx,.48,zz,.45,.30,.45,type===2?'leafGold':'leaf',0);
  }
  for(const side of [-1,1]){
    box(g,side*1.52,.33,0,.37,.12,1.20,c.dark);
    box(g,side*1.72,.48,0,.08,.36,1.20,c.body);
  }
  cylinder(g,0,.25,0,.78,.86,.18,c.trim,12);
  if(type===1){
    cylinder(g,0,.44,0,.25,.36,.34,c.body,6);
    ico(g,0,.72,0,.20,.15,.20,c.accent);
  }else{
    cylinder(g,0,.35,0,.68,.68,.035,'waterLight',12);
    cylinder(g,0,.52,0,.12,.17,.34,c.body,8);
    cylinder(g,0,.70,0,.35,.13,.10,c.trim,10);
    cylinder(g,0,.76,0,.30,.30,.025,'waterLight',10);
  }
  return g;
}

export function tower(parent,{x=0,y=0,z=0,rotation=0,variant=0,scale=1,palette}={}){
  const g=asset(parent,'tower',{x,y,z,rotation,scale}),c=buildingColors(palette),type=variantOf(variant,3);
  const top=5.6+type*.55,width=2.32,depth=2.48;
  box(g,0,.10,0,2.94,.20,2.94,'platform');
  box(g,0,top/2+.10,0,width,top-.20,depth,c.light);
  for(let floor=0;floor<Math.floor(top/.94);floor++){
    windowsAround(g,width,depth,.75+floor*.90,2,c);
    box(g,0,1.22+floor*.90,0,width+.035,.075,depth+.035,c.body);
  }
  for(const side of [-1,1]){
    box(g,side*(width/2-.12),top/2,depth/2+.028,.15,top-.20,.055,c.body);
    box(g,side*(width/2-.12),top/2,-depth/2-.028,.15,top-.20,.055,c.body);
  }
  box(g,0,.67,depth/2+.05,.55,1.0,.06,c.dark);
  box(g,0,top+.04,0,2.57,.18,2.73,c.trim);
  box(g,0,top+.18,0,2.63,.15,2.79,c.roof);
  box(g,0,top+.55,-.15,1.48,.60,1.58,c.body);
  if(type===2)roof(group(g,0,0,-.15),1.70,1.80,.38,top+.86,c.roof);
  else box(g,0,top+.90,-.15,1.65,.12,1.75,c.roof);
  if(type===1)cylinder(g,0,top+1.15,-.15,.035,.055,.42,c.accent,6);
  return g;
}

function farmRandom(seed){
  let state=(Number(seed)||1)>>>0;
  return()=>{state=Math.imul(state,1664525)+1013904223|0;return(state>>>0)/4294967296;};
}
function fieldContains(points,x,z,margin=0){
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length],dx=b[0]-a[0],dz=b[1]-a[1];
    if(dx*(z-a[1])-dz*(x-a[0])<margin*Math.hypot(dx,dz)-1e-8)return false;
  }
  return true;
}
function fieldSpan(points,position,alongX){
  const intersections=[],fixed=alongX?1:0,along=1-fixed;
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length];
    if((a[fixed]<=position&&b[fixed]>position)||(b[fixed]<=position&&a[fixed]>position)){
      const t=(position-a[fixed])/(b[fixed]-a[fixed]);intersections.push(a[along]+(b[along]-a[along])*t);
    }
  }
  return intersections.length<2?null:[Math.min(...intersections),Math.max(...intersections)];
}
function farmRows(parent,points,width,depth,alongX,material,pitch,height,feature){
  const across=alongX?depth:width;if(across<=.4)return;
  const count=Math.max(1,Math.floor((across-.35)/pitch));
  const spacing=(across-.35)/count,thickness=Math.min(.17,spacing*.24);
  for(let index=0;index<count;index++){
    const offset=-across/2+.175+spacing*(index+.5);
    const low=fieldSpan(points,offset-thickness/2,alongX),high=fieldSpan(points,offset+thickness/2,alongX);
    if(!low||!high)continue;
    const from=Math.max(low[0],high[0])+.17,to=Math.min(low[1],high[1])-.17;
    const fixed=alongX?1:0,along=1-fixed;
    const spans=feature&&Math.abs(offset-feature.center[fixed])<feature.radius+thickness/2
      ?[[from,Math.min(to,feature.center[along]-feature.radius)],[Math.max(from,feature.center[along]+feature.radius),to]]:[[from,to]];
    for(const [start,end]of spans){
      if(end-start<.3)continue;
      box(parent,alongX?(start+end)/2:offset,.07+height/2,alongX?offset:(start+end)/2,
        alongX?end-start:thickness,height,alongX?thickness:end-start,material);
    }
  }
}
function fieldFeature(parent,points,feature){
  if(!feature)return null;
  const center=points.reduce((p,q)=>[p[0]+q[0]/points.length,p[1]+q[1]/points.length],[0,0]);
  const radius=feature==='barn'?1.42:.7;
  if(!fieldContains(points,...center,radius))return null;
  const f=group(parent,center[0],0,center[1]);
  if(feature==='barn'){
    box(f,0,.075,0,1.96,.035,1.98,'soilLight');
    box(f,-.15,.53,0,1.05,.93,1.38,'plaster');
    roof(group(f,-.15,0,0),1.21,1.56,.35,1.01,'roof');
    box(f,-.15,.42,.701,.54,.67,.028,'timber');
    box(f,-.15,.76,.725,.62,.075,.035,'trim');
    for(const z of [-.4,0])box(f,.7,.23,z,.3,.31,.3,'gold');
  }else if(feature==='bales'){
    for(const [x,z]of [[-.27,-.17],[.27,-.17],[0,.25]])cylinder(f,x,.25,z,.17,.17,.38,'gold',7).rotation.z=Math.PI/2;
  }else if(feature==='trough'){
    box(f,0,.16,0,.82,.22,.42,'timber');box(f,0,.275,0,.69,.018,.29,'water');
    for(const x of [-.47,.47])box(f,x,.24,.39,.075,.38,.075,'timber');
    box(f,0,.34,.39,1.01,.06,.055,'timber');
  }
  return{center,radius};
}

export function farmPatch(parent, { x = 0, y = 0, z = 0, rotation = 0, variant = 0, scale = 1,
  width = 3, depth = 4, parcels } = {}) {
  if(!Number.isFinite(width)||!Number.isFinite(depth)||width<=0||depth<=0)throw new TypeError('Farm dimensions must be positive and finite');
  const fields=parcels??[{x:0,z:0,width,depth,variant}];
  if(!Array.isArray(fields)||fields.some(p=>![p.x,p.z,p.width,p.depth].every(Number.isFinite)
    ||p.width<=0||p.depth<=0||Math.abs(p.x)+p.width/2>width/2+1e-7
    ||Math.abs(p.z)+p.depth/2>depth/2+1e-7))throw new TypeError('Farm parcels must stay inside their district');
  for(const field of fields)if(field.polygon&&(!Array.isArray(field.polygon)||field.polygon.length<3
    ||field.polygon.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite)
      ||Math.abs(p[0])>field.width/2+1e-7||Math.abs(p[1])>field.depth/2+1e-7)))throw new TypeError('Farm polygons must stay inside their parcel');
  const outlines=fields.map(field=>{
    const w=field.width/2,d=field.depth/2,points=field.polygon??[[-w,-d],[w,-d],[w,d],[-w,d]];
    const area=points.reduce((sum,p,index)=>{const q=points[(index+1)%points.length];return sum+p[0]*q[1]-q[0]*p[1];},0);
    if(Math.abs(area)<1e-8)throw new TypeError('Farm polygons must enclose a nonzero area');
    const outline=area<0?points.toReversed():points;
    for(let index=0;index<outline.length;index++){
      const a=outline[index],b=outline[(index+1)%outline.length],c=outline[(index+2)%outline.length];
      if((b[0]-a[0])*(c[1]-b[1])-(b[1]-a[1])*(c[0]-b[0])< -1e-8)throw new TypeError('Farm polygons must be convex');
    }
    return outline;
  });
  const g = asset(parent, 'farmPatch', { x, y, z, rotation, scale });
  g.userData.footprint={width,depth,height:ASSET_BOUNDS.farmPatch.height,radius:Math.hypot(width,depth)/2};
  for(const [index,field]of fields.entries()){
    const type=variantOf(field.variant??variant,3),f=group(g,field.x,0,field.z),w=field.width,d=field.depth;
    const points=outlines[index];
    const crop=field.feature==='barn'?'pasture':field.crop??['wheat','vegetables','lavender'][type];
    const base={wheat:['wheat','gold','leafGold'][type],pasture:['meadow','grassLight','grass'][type],
      orchard:['grass','grassDark','meadow'][type],fallow:['soilLight','field','soilLight'][type],vegetables:'leafLight',lavender:'lavender'}[crop]??'wheat';
    polygon(f,points,.055,base);
    const rng=farmRandom(field.detailSeed??(type+1)*7117),feature=fieldFeature(f,points,field.feature);
    const available=(x,z,r)=>fieldContains(points,x,z,r)&&(!feature||Math.hypot(x-feature.center[0],z-feature.center[1])>feature.radius+r);
    if(crop==='wheat'||crop==='vegetables'||crop==='lavender'||crop==='fallow'){
      farmRows(f,points,w,d,field.rowsAlong==='x',crop==='wheat'?'gold':crop==='fallow'?'field':crop==='lavender'?'lavender':'leaf',crop==='fallow'?.95:.63,crop==='fallow'?.025:.065,feature);
    }else if(crop==='orchard'){
      const columns=Math.min(4,Math.max(1,Math.floor(w/1.5))),rows=Math.min(3,Math.max(1,Math.floor(d/1.5)));
      for(let column=0;column<columns;column++)for(let row=0;row<rows;row++){
        const x=(column-(columns-1)/2)*Math.min(1.65,(w-.9)/columns),z=(row-(rows-1)/2)*Math.min(1.65,(d-.9)/rows);
        if(!available(x,z,.40))continue;
        box(f,x,.28,z,.065,.45,.065,'bark');
        ico(f,x,.69+rng()*.12,z,.34,.38,.34,type===1?'leafGold':'leaf');
      }
    }else{
      // Uncultivated grass between working plots gives the crops breathing
      // room. Sparse tufts remain subordinate to the field's broad silhouette.
      for(let index=0;index<3;index++){
        const x=(rng()-.5)*w*.8,z=(rng()-.5)*d*.8;
        if(available(x,z,.18))ico(f,x,.12,z,.15,.075,.12,'grassDark');
      }
    }
    for(const edge of field.hedgeEdges??[]){
      if(!Number.isInteger(edge)||edge<0||edge>=points.length)continue;
      const a=points[edge],b=points[(edge+1)%points.length],dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz);
      if(length<1.5)continue;
      const gate=Math.min(.72,length*.2),end=.28,segments=[[end,length*.5-gate/2],[length*.5+gate/2,length-end]];
      for(const [from,to]of segments){
        if(to-from<.3)continue;const t=(from+to)/2/length;
        box(f,a[0]+dx*t-dz/length*.12,.21,a[1]+dz*t+dx/length*.12,to-from,.3,.15,'pineLight',-Math.atan2(dz,dx));
      }
    }
  }
  return g;
}

export function sheep(parent, { x = 0, y = 0, z = 0, rotation = 0 } = {}) {
  const g = asset(parent, 'sheep', { x, y, z, rotation });
  for (const xx of [-.12, .12]) {
    for (const zz of [-.16, .16]) box(g, xx, .10, zz, .06, .20, .06, 'metal');
  }
  ico(g, 0, .31, -.035, .23, .22, .30, 'white');
  ico(g, 0, .34, .24, .13, .15, .12, 'roofBlue');
  return g;
}

export function person(parent, { x = 0, y = 0, z = 0, rotation = 0, color = 'red', variant = 0 } = {}) {
  const g = asset(parent, 'person', { x, y, z, rotation });
  box(g, -.055, .16, 0, .075, .32, .10, 'metal');
  box(g, .055, .16, 0, .075, .32, .10, 'metal');
  box(g, 0, .42, 0, .24, .28, .16, color);
  ico(g, 0, .65, 0, .115, .10, .115, 'peach');
  if (variantOf(variant, 2) === 1) cylinder(g, 0, .725, 0, .135, .135, .04, 'gold', 7);
  return g;
}

export function buildTrainCar(parent, { color = 'red', cab = false, palette } = {}) {
  const g = asset(parent, 'trainCar');
  const body=palette?.body??color,roofColor=palette?.roof??'roofBlue',trim=palette?.trim??'trim';
  box(g, 0, .34, 0, .91, .19, 2.10, 'metal');
  box(g, 0, .88, 0, 1.02, .94, 2.12, body);
  box(g, 0, 1.26, 0, 1.035, .10, 2.14, trim);
  box(g, 0, 1.39, -.015, 1.10, .19, 2.19, roofColor);
  box(g, 0, .65, 0, 1.035, .065, 2.14, palette?.accent??'gold');
  for (const side of [-1, 1]) {
    for (const zz of [-.54, .49]) {
      box(g, side * .519, 1.075, zz, .028, .39, .69, 'window');
    }
    for (const zz of [-.67, .67]) {
      cylinder(g, side * .48, .22, zz, .22, .22, .14, 'metal', 8).rotation.z = Math.PI / 2;
    }
  }
  for (const zz of [-1.07, 1.07]) {
    box(g, 0, 1.075, zz, .66, .37, .025, 'window');
    box(g, 0, .33, zz * 1.06, .18, .12, .12, 'metal');
  }
  if (cab) {
    box(g, 0, .77, 1.085, .86, .25, .12, body);
    for (const xx of [-.31, .31]) box(g, xx, .79, 1.151, .14, .13, .03, 'lamp');
    box(g, 0, 1.515, -.35, .48, .06, .45, palette?.body??color);
  }
  return g;
}

export function cactus(parent,{x=0,y=0,z=0,rotation=0,scale=1,variant=0}={}){
  const g=asset(parent,'cactus',{x,y,z,rotation,scale});
  const height=variant%2?1.8:2.2;
  cylinder(g,0,height/2,0,.16,.20,height,'cactus',6);
  ico(g,0,height,0,.16,.17,.16,'cactus');
  for(const [side,level] of [[-1,.72],[1,1.1]]){
    beam(g,v(0,level,0),v(side*.47,level,0),.16,'cactus');
    cylinder(g,side*.47,level+.24,0,.10,.12,.50,'cactus',6);
    ico(g,side*.47,level+.49,0,.10,.11,.10,'cactus');
  }
  return g;
}
