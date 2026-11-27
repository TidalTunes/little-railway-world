/** Wood sources share harvesting, clearing and regrowth, but keep their own art. */
export const isHarvestableWood=item=>item?.kind==='tree'||item?.kind==='cactus';
export const woodSourceId=item=>item?.id!=null?String(item.id):`${item?.kind==='cactus'?'cactus':'tree'}:${item?.x}:${item?.z}:${item?.variant??0}`;
// Preserve the historical streamed-tree identity used by compiled world cells.
export const streamedWoodSourceId=item=>item.id??`${item.kind==='cactus'?'cactus':'tree'}:${item.x}:${item.y??0}:${item.z}`;
