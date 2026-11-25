/** Pure authoring rules for player identity and city development. */
export const DEFAULT_PLAYERS = Object.freeze([
  Object.freeze({id:'coral',name:'Coral Railway',color:Object.freeze({l:.65,c:.18,h:28})}),
  Object.freeze({id:'teal',name:'Teal Railway',color:Object.freeze({l:.64,c:.12,h:185})}),
  Object.freeze({id:'gold',name:'Golden Railway',color:Object.freeze({l:.75,c:.15,h:83})}),
  Object.freeze({id:'blue',name:'Blue Railway',color:Object.freeze({l:.61,c:.16,h:255})}),
]);
const fail=message=>{throw new TypeError(`Invalid world: ${message}`);};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/** Normalize author colors to serializable OKLCH (L 0..1, C 0..0.4, H 0..360). */
export function normalizePlayerColor(color) {
  if(typeof color==='string'&&/^#[\da-f]{6}$/i.test(color)){
    const rgb=[1,3,5].map(i=>parseInt(color.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
    const [r,g,b]=rgb;
    const ll=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b);
    const mm=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b);
    const ss=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
    const l=.2104542553*ll+.793617785*mm-.0040720468*ss;
    const a=1.9779984951*ll-2.428592205*mm+.4505937099*ss;
    const bb=.0259040371*ll+.7827717662*mm-.808675766*ss;
    return {l:clamp(l,0,1),c:Math.min(.4,Math.hypot(a,bb)),h:(Math.atan2(bb,a)*180/Math.PI+360)%360};
  }
  if(!color||typeof color!=='object'||![color.l,color.c,color.h].every(Number.isFinite)
    ||color.l<0||color.l>1||color.c<0||color.c>.4)fail('player colors require OKLCH {l:0..1,c:0..0.4,h:finite} or #RRGGBB');
  return {l:color.l,c:color.c,h:((color.h%360)+360)%360};
}
export function normalizePlayers(input=DEFAULT_PLAYERS) {
  if(!Array.isArray(input)||input.length<1)fail('at least one player is required');
  const players=input.map((p,i)=>{
    if(!p||typeof p!=='object')fail('players require objects');
    const id=String(p.id??`player-${i+1}`);
    if(!id.trim())fail('player IDs must not be empty');
    return {id,name:String(p.name??`Railway ${i+1}`),color:normalizePlayerColor(p.color??DEFAULT_PLAYERS[i%4].color)};
  });
  if(new Set(players.map(p=>p.id)).size!==players.length)fail('player IDs must be unique');
  return players;
}
export function cityRandom(seed,cityId) {
  let h=2166136261;
  for(const char of `${seed}:city:${cityId}`)h=Math.imul(h^char.charCodeAt(0),16777619);
  return ()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};
}
export function cityDevelopment(level) {
  if(!Number.isInteger(level)||level<1||level>10)fail('city levels must be integers from 1 through 10');
  const features=['house'];
  if(level>=2)features.push('landmark');
  if(level>=4)features.push('apartment','plaza');
  if(level>=6)features.push('civic');
  if(level>=8)features.push('tower');
  return {radius:[9,10.5,12,13.5,16,19,22,25,28,31][level-1],buildingBudget:[3,5,7,10,13,17,21,26,31,37][level-1],
    streetWidth:level>=7?.72:level>=4?.62:.52,streetSpacing:level>=4?7.8:5.4,features};
}
export const CITY_ASSET_RADII=Object.freeze({house:1.56,landmark:2,apartment:2.05,civic:2.8,plaza:2.6,tower:2.1});
