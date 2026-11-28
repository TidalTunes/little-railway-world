/** Only authored resource deposits are mineable; decorative boulders stay scenery. */
export const isMineableOre=item=>item?.kind==='rock'&&item.resource==='resources'&&item.workKind==='ore'
  &&typeof item.id==='string'&&item.id.length>0;
