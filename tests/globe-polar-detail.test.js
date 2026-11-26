import test from 'node:test';
import assert from 'node:assert/strict';
import {generateWorld} from '../src/world-model.js';
import {compileDetailPacket} from '../src/detail-compiler.js';

test('complete-globe detail cells at both poles compile without artificial island-edge geometry',()=>{
  const radius=1600,half=Math.PI*radius;
  const base=generateWorld({density:0},{detail:'network'});
  const world={...base,
    surface:{type:'sphere',radius,complete:true,origin:{longitude:0,latitude:0},
      projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},
    outline:[[-half,-half/2],[half,-half/2],[half,half/2],[-half,half/2]],
    bounds:{width:half*2,depth:half},cities:[],lines:[],mountains:[],stations:[],placements:[],cityStreets:[],
    hydrology:{water:[],banks:[]},rivers:[],biomes:{...base.biomes,ocean:[],oceanShore:[]}};
  for(const latitude of [-90,90]){
    const pole=-latitude*Math.PI/180*radius,z=Math.floor(pole/192)*192;
    const bounds={minX:0,maxX:192,minZ:z,maxZ:z+192};
    const packet=compileDetailPacket({bounds,cullBounds:bounds,
      placements:[],cities:[],lines:[],mountains:[],stations:[],cityStreets:[]},world);
    assert.ok(packet.meshes.length>0,`${latitude}° cell contains terrain`);
    let poleVertices=0;
    for(const mesh of packet.meshes){
      for(const attribute of ['position','normal','color'])assert.ok(mesh[attribute].every(Number.isFinite));
      for(let i=0;i<mesh.position.length;i+=3){
        const x=mesh.position[i],y=mesh.position[i+1]+radius,z=mesh.position[i+2];
        const elevation=Math.hypot(x,y,z)-radius;
        assert.ok(elevation>=-3.401&&elevation<=.019,'terrain preserves its radial layers at the poles');
        if(Math.hypot(x,y)<.001)poleVertices++;
      }
    }
    assert.ok(poleVertices>0,'the actual pole boundary is exercised');
  }
});
