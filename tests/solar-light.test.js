import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {solarLightAt} from '../src/solar-light.js';
import {createDaylight} from '../src/scene-style.js';
import {surfaceFrame,surfaceNormal,surfaceChartCoordinates} from '../src/world-surface.js';

const vector=state=>new THREE.Vector3(state.x,state.y,state.z);

test('sun shadows sweep from morning to evening and shorten toward noon',()=>{
  const morning=solarLightAt(35),noon=solarLightAt(150),evening=solarLightAt(265);
  assert.ok(morning.x<-.6&&evening.x>.6,'sun crosses the ground from east to west');
  assert.ok(noon.y>morning.y&&noon.y>evening.y,'higher midday light shortens shadows');
  assert.ok(Math.abs(noon.x)<1e-12);
  assert.ok(Math.abs(morning.y-evening.y)<1e-12);
  for(const state of [morning,noon,evening])assert.equal(state.phase,'day');
  const midnight=solarLightAt(450);
  assert.equal(midnight.phase,'night');assert.ok(midnight.z<0&&noon.z>0,'moon uses its own arc');
});

test('a single shadow light hands over sun and moon only after its strength fades to zero',()=>{
  for(const boundary of [300,600,900,1200]){
    const before=solarLightAt(boundary-.001),after=solarLightAt(boundary+.001),at=solarLightAt(boundary);
    assert.equal(at.strength,0);
    assert.ok(before.strength<1e-8&&after.strength<1e-8,'direction handover cannot pop a visible shadow');
  }
  const sunrise=[0,5,10,15,20,30].map(time=>solarLightAt(time).strength);
  assert.equal(sunrise[0],0);assert.equal(sunrise.at(-1),1);
  assert.ok(sunrise.every((value,i)=>i===0||value>=sunrise[i-1]));
});

test('solar samples are finite, periodic, deterministic and safely above grazing incidence',()=>{
  const out={};assert.equal(solarLightAt(85,out),out);
  for(let t=0;t<600;t+=1.37){
    const state=solarLightAt(t),repeated=solarLightAt(t+600*100);
    assert.ok(Math.abs(vector(state).length()-1)<1e-12);
    assert.ok(state.y>.10);assert.ok(state.strength>=0&&state.strength<=1);
    assert.ok(vector(state).distanceTo(vector(repeated))<1e-11);
  }
  for(const value of [-1,NaN,Infinity,undefined])assert.deepEqual(solarLightAt(value),solarLightAt(0));
});

test('daylight publishes the same direction in direct and stepped time while retaining readable ambient light',()=>{
  const make=()=>{
    const scene=new THREE.Scene(),mapScene=new THREE.Scene(),sky=new THREE.HemisphereLight(),sun=new THREE.DirectionalLight(),fill=new THREE.DirectionalLight();
    return {sky,sun,fill,light:createDaylight({scene,mapScene,sky,sun,fill,renderer:{}})};
  };
  const stepped=make(),direct=make();
  for(let t=0;t<=430;t++)stepped.light.update(1,0,t);
  direct.light.update(.016,0,430);
  assert.ok(stepped.light.direction.equals(direct.light.direction));
  assert.equal(stepped.sun.intensity,direct.sun.intensity);
  const reference=direct.light.direction;
  direct.light.update(.016,0,300);
  assert.equal(direct.light.direction,reference,'direction is reused instead of allocated per frame');
  assert.equal(direct.sun.intensity,0);assert.ok(direct.sky.intensity>=.2);assert.ok(direct.fill.intensity>=.09);
  direct.light.update(.016,0,450);assert.ok(direct.sun.intensity>.5);
});


test('local solar elevation is preserved across globe longitudes, poles and flat maps',()=>{
  const world={surface:{type:'sphere',radius:1800,complete:true,origin:{longitude:0,latitude:0},
    projection:{type:'equirectangular',centralLongitude:0,centralLatitude:0,radius:1000}}};
  for(const [longitude,latitude] of [[0,0],[140,65],[-179,-40],[85,89.999]]){
    const point=surfaceChartCoordinates(world,longitude,latitude),normal=surfaceNormal(world,point.x,point.z);
    for(const t of [10,150,280,310,450,590]){
      const state=solarLightAt(t),direction=vector(state).applyMatrix4(surfaceFrame(world,point.x,point.z));
      assert.ok(Math.abs(direction.length()-1)<1e-12);
      assert.ok(Math.abs(direction.dot(normal)-state.y)<1e-12,'light elevation follows the local ground normal');
    }
  }
  const state=solarLightAt(75);
  assert.ok(vector(state).applyMatrix4(surfaceFrame({},0,0)).equals(vector(state)));
});
