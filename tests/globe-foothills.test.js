import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {compileMapTerrainGeometry} from '../src/map-terrain-geometry.js';
import {terrainColor} from '../src/terrain-colors.js';
import {surfaceCoordinates} from '../src/world-surface.js';

const radius=1600,half=Math.PI*radius;
const world={surface:{type:'sphere',complete:true,radius,origin:{longitude:0,latitude:0},
  projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}},
  bounds:{width:half*2,depth:half}};
const ring=(x0,z0,x1,z1)=>[[x0,z0],[x1,z0],[x1,z1],[x0,z1],[x0,z0]];
const colorField={...world,sites:[{x:0,z:0,type:'plains'}]};
const distance=(a,b)=>Math.hypot(...a.map((value,i)=>value-b[i]));
function compile(low,high=[],surface=world){
  return compileMapTerrainGeometry({land:[],shores:[],river:[],ocean:[],colorField,
    mountains:[{id:'range',low,high,snow:[]}]},surface);
}
function samples(packet){
  const result=[],point=new THREE.Vector3();
  for(let i=0;i<packet.position.length;i+=3){
    point.fromArray(packet.position,i);
    result.push({...surfaceCoordinates(world,point),color:Array.from(packet.vertexColor?.slice(i,i+3)??[])});
  }
  return result;
}

test('full-globe foothills match surrounding terrain at their real boundary, including water holes',()=>{
  const low=[[ring(-256,-96,256,96),ring(-20,-20,20,20)]],packet=compile(low)[0];
  assert.equal(packet.color,'contour0');assert.equal(packet.vertexColor.length,packet.position.length);
  let borders=0,holes=0,inside=0;
  for(const p of samples(packet)){
    const base=terrainColor(colorField,p.x,p.z,{map:true}).toArray();
    const outer=Math.abs(Math.abs(p.x)-256)<.002||Math.abs(Math.abs(p.z)-96)<.002;
    const hole=(Math.abs(Math.abs(p.x)-20)<.002&&Math.abs(p.z)<20.002)
      ||(Math.abs(Math.abs(p.z)-20)<.002&&Math.abs(p.x)<20.002);
    if(outer||hole){assert.ok(distance(p.color,base)<.00003,'there is no hard contour color edge');borders++;if(hole)holes++;}
    if(Math.abs(p.x-128)<.002&&Math.abs(p.z)<20){
      assert.ok(distance(p.color,base)>.015,'artificial tile borders do not become pale foothills');inside++;
    }
  }
  assert.ok(borders>20&&holes>4&&inside>2,'fixture exercises outer edges, lake edges and interior tile seams');
});

test('foothill color work preserves every contour triangle, shoreline cut, and higher rock layer',()=>{
  const low=[[ring(-180,-80,180,80),ring(10,-15,40,15)]],before=structuredClone(low);
  // Low and high start from identical rings to prove coloring adds no geometry.
  const packets=compile(low,structuredClone(low)),lowPacket=packets.find(p=>p.color==='contour0'),highPacket=packets.find(p=>p.color==='contour1');
  assert.deepEqual(low,before,'coloring is read-only');
  assert.equal(lowPacket.position.length,highPacket.position.length);
  assert.deepEqual(lowPacket.index,highPacket.index,'no subdivisions or topology changes');
  assert.equal(highPacket.vertexColor,undefined,'the high rock contour retains its existing material');
  const a=samples(lowPacket),b=samples(highPacket);
  assert.ok(a.every((p,i)=>Math.hypot(p.x-b[i].x,p.z-b[i].z)<.001),'layer footprints and holes remain exact');
});

test('mountain foothills remain continuous across a full-globe date-line cut',()=>{
  const low=[[ring(half-120,-80,half,80)],[ring(-half,-80,-half+120,80)]];
  const packet=compile(low)[0],seam=samples(packet).filter(p=>Math.abs(Math.abs(p.x)-half)<.002&&Math.abs(p.z)<10);
  assert.ok(seam.length>=4);
  for(const p of seam){
    const base=terrainColor(colorField,p.x,p.z,{map:true}).toArray();
    assert.ok(distance(p.color,base)>.015,'the chart cut is not a foothill boundary');
    const other=seam.find(q=>Math.sign(q.x)!==Math.sign(p.x)&&Math.abs(q.z-p.z)<.002);
    assert.ok(other);assert.ok(distance(p.color,other.color)<.00001,'both sides use the same tint');
  }
});

test('planar and regional spherical presets retain their original low-contour material',()=>{
  const low=[[ring(-20,-20,20,20)]];
  for(const surface of [{}, {...world,surface:{...world.surface,complete:false}}]){
    const packet=compile(low,[],surface)[0];
    assert.equal(packet.color,'contour0');assert.equal(packet.vertexColor,undefined);
  }
});
