import test from 'node:test';
import assert from 'node:assert/strict';
import {farmFootprintsOverlap} from '../src/farm-footprints.js';
import {surfaceChartCoordinates,surfaceOffset,chartHeadingForSurface} from '../src/world-surface.js';
import {validateWorld} from '../src/world-model.js';

const planar={};
const globe={surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},
  projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
const farm=(values={})=>{
  const item={kind:'farm',x:0,z:0,width:12,depth:16,rotation:0,scale:1,...values};
  item.radius=Math.hypot(item.width,item.depth)*item.scale/2;return item;
};
function check(world,a,b,gap,expected){
  assert.equal(farmFootprintsOverlap(world,a,b,gap),expected);
  assert.equal(farmFootprintsOverlap(world,b,a,gap),expected,'farm order cannot change a placement');
}

test('neighboring farm polygons retain lanes while their broad-phase circles overlap',()=>{
  for(const rotation of [0,.63,Math.PI/2,2.7]){
    const a=farm({rotation});
    const neighbor=gap=>farm({rotation,x:(12+gap)*Math.cos(rotation),z:-(12+gap)*Math.sin(rotation)});
    check(planar,a,neighbor(.5),.32,false);
    check(planar,a,neighbor(.32),.32,false);
    check(planar,a,neighbor(.31),.32,true);
    check(planar,a,neighbor(0),0,false);
    check(planar,a,neighbor(-.1),0,true);
  }
});

test('irregular footprints and legacy rectangles use their actual transformed silhouette',()=>{
  const a=farm({width:10,depth:10,footprint:[[-5,-5],[5,-5],[-5,5]]});
  check(planar,a,farm({width:3,depth:3,x:4,z:4}),.32,false);
  check(planar,a,farm({width:3,depth:3,x:-3,z:-3}),.32,true);
  const b=farm({x:12.5});check(planar,farm(),b,.32,false);
  b.rotation=Math.PI/2;check(planar,farm(),b,.32,true);
  b.x=20;check(planar,farm(),b,.32,false);
  b.x=8;b.width=2;b.depth=2;check(planar,farm(),b,.32,false);
});

test('physical farm clearance remains symmetric at high latitudes and across the date line',()=>{
  let crossedSeam=false;
  for(const latitude of [0,45,75,82])for(const heading of [0,.4,1.5,2.3]){
    const anchor=surfaceChartCoordinates(globe,179.95,latitude);
    const a=farm({...anchor,rotation:chartHeadingForSurface(globe,anchor.x,anchor.z,heading)});
    const neighbor=distance=>{
      const p=surfaceOffset(globe,anchor.x,anchor.z,distance*Math.cos(heading),-distance*Math.sin(heading));
      crossedSeam||=Math.abs(p.x-anchor.x)>5000;
      return farm({...p,rotation:chartHeadingForSurface(globe,p.x,p.z,heading)});
    };
    check(globe,a,neighbor(13),.32,false);
    check(globe,a,neighbor(11.5),.32,true);
  }
  assert.ok(crossedSeam,'the fixture actually crosses the periodic chart boundary');
});

test('spherical crop height gets a small conservative margin without discarding ordinary lanes',()=>{
  const a=farm(),b=farm({x:12.33});
  check(planar,a,b,.32,false);
  check(globe,a,b,.32,true);
  b.x=12.5;check(globe,a,b,.32,false);
  const far=farm({x:100});
  Object.defineProperty(far,'footprint',{get(){throw new Error('distant geometry should not be inspected');}});
  check(globe,a,far,.32,false);
});

test('world validation relaxes only farm-to-farm circles and still rejects real overlaps',()=>{
  const world={bounds:{width:200,depth:200},outline:[[-100,-100],[100,-100],[100,100],[-100,100]],
    cities:[],stations:[],lines:[],mountains:[],rivers:[],placements:[]};
  const a=farm({id:'a'}),b=farm({id:'b',x:12.5});
  const overlaps=()=>validateWorld(world).filter(violation=>violation.type==='asset-overlap');
  world.placements=[a,b];assert.deepEqual(overlaps(),[]);
  b.x=11.8;assert.equal(overlaps().length,1,'crossing farm silhouettes are rejected');
  b.x=12.5;b.kind='house';assert.equal(overlaps().length,1,'non-farm scenery retains its full circle');
});
