/** Spacious regional circuits: explicit topology avoids expensive cycle discovery. */
export function createStressWorld({cities=256,trains=2048,seed='continental-256'}={}){
  const requested=Number(cities),fleet=Number(trains);
  if(!Number.isFinite(requested)||requested<8||requested>4096||!Number.isInteger(requested)||requested%8!==0)throw new TypeError('Stress cities must be a multiple of 8 from 8 through4096');
  if(!Number.isInteger(fleet)||fleet<0||fleet>32768)throw new TypeError('Stress trains must be an integer from 0 through32768');
  const groups=requested/8,columns=Math.ceil(Math.sqrt(groups*2)),rows=Math.ceil(groups/columns),pitch=500,radius=190;
  const width=columns*pitch+300,depth=rows*pitch+300,halfW=width/2,halfD=depth/2,bevel=100;
  const riverZ=rows%2?pitch/2:0;
  const config={seed,bounds:{width,depth},outline:[[-halfW,-halfD+bevel],[-halfW+bevel,-halfD],[halfW-bevel,-halfD],[halfW,-halfD+bevel],[halfW,halfD-bevel],[halfW-bevel,halfD],[-halfW+bevel,halfD],[-halfW,halfD-bevel]],
    density:1,minTurnRadius:9,cities:[],connections:[],mountains:[],river:{width:10,points:[[-halfW-100,riverZ],[halfW+100,riverZ]]},traffic:{trainCount:fleet,circuits:[]}};
  const owners=['coral','teal','gold','blue'];
  for(let g=0;g<groups;g++){
    const x=(g%columns-(columns-1)/2)*pitch,z=(Math.floor(g/columns)-(rows-1)/2)*pitch,segments=[];
    for(let i=0;i<8;i++){
      const angle=i*Math.PI/4,id=`region-${g+1}-city-${i+1}`;
      config.cities.push({id,x:x+Math.cos(angle)*radius,z:z+Math.sin(angle)*radius,level:1+(g*3+i*7)%10,ownerId:owners[(g+i)%4]});
      const lineId=`regional-${g+1}-${i+1}`;
      config.connections.push({id:lineId,from:id,to:`region-${g+1}-city-${(i+1)%8+1}`});segments.push({lineId,direction:1});
    }
    config.traffic.circuits.push({id:`circuit-${g+1}`,segments});
    if(g%columns>0)config.connections.push({id:`connector-west-${g+1}`,from:`region-${g}-city-1`,to:`region-${g+1}-city-5`});
    if(g%columns===0&&g>=columns)config.connections.push({id:`connector-north-${g+1}`,from:`region-${g-columns+1}-city-3`,to:`region-${g+1}-city-7`});
  }
  // Put a handful of real mountain passes on regional routes, separated from
  // the central river and town lots. Coarse topology remains inexpensive.
  for(let g=0;g<groups;g+=8){
    const a=config.cities[g*8+5],b=config.cities[g*8+6];
    const x=(a.x+b.x)/2,z=(a.z+b.z)/2;
    if(Math.abs(z-riverZ)>30)config.mountains.push({id:`regional-pass-${g+1}`,x,z,radius:23,height:24});
  }
  return config;
}
export const createStressWorldInput=({seed,cityCount=256,trainCount=2048}={})=>createStressWorld({seed,cities:cityCount,trains:trainCount});
