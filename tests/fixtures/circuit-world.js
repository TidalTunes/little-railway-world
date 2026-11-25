import { sampleAlignmentPoints } from '../../src/alignments.js';

/** Exact circles isolate traffic scaling from terrain and renderer cost. */
export function circuitWorld({circuits=32,citiesPerCircuit=8,radius=190,trainCount=2048,overlap=false}={}){
  const lines=[],cities=[],descriptors=[],transitions=[];
  for(let circuit=0;circuit<circuits;circuit++){
    const center={x:overlap?circuit*radius*1.2:(circuit%8)*radius*2.5,z:overlap?0:Math.floor(circuit/8)*radius*2.5},segments=[];
    for(let i=0;i<citiesPerCircuit;i++){
      const id=`route-${circuit}-${i}`,cityId=`city-${circuit}-${i}`,nextId=`city-${circuit}-${(i+1)%citiesPerCircuit}`;
      const startAngle=i/citiesPerCircuit*Math.PI*2,sweep=Math.PI*2/citiesPerCircuit,length=radius*sweep;
      const start={x:center.x+Math.cos(startAngle)*radius,y:.42,z:center.z+Math.sin(startAngle)*radius};
      const end={x:center.x+Math.cos(startAngle+sweep)*radius,y:.42,z:center.z+Math.sin(startAngle+sweep)*radius};
      const alignment={length,minRadius:radius,segments:[{type:'arc',center,radius,startAngle,sweep,start,end,length,startDistance:0,endDistance:length,curvature:1/radius}]};
      lines.push({id,from:cityId,to:nextId,alignment,...sampleAlignmentPoints(alignment),stops:[{distance:7},{distance:length-7}]});
      cities.push({id:cityId,...start});segments.push({lineId:id,direction:1});
      transitions.push({fromLineId:id,fromEnd:'end',toLineId:`route-${circuit}-${(i+1)%citiesPerCircuit}`,toEnd:'start'});
    }
    descriptors.push({id:`circuit-${circuit+1}`,segments});
  }
  return{lines,cities,transitions,junctions:[],traffic:{trainCount,circuits:descriptors}};
}
