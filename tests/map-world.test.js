import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { generateWorld } from '../src/world-model.js';
import { buildMapWorld } from '../src/map-world.js';
import { playerColors } from '../src/player-palette.js';

test('the map draws the complete world as a small set of flat unlit batches', () => {
  const world=generateWorld(),parent=new THREE.Group(),map=buildMapWorld(parent,world);
  assert.equal(map.root.parent,parent);
  const staticRoot=map.root.getObjectByName('map-static');
  assert.ok(staticRoot.children.length<40,'static drawings merge by material');
  for(const name of ['terrain','ocean','contour0','waterLight','ink']){
    assert.ok(staticRoot.getObjectByName(`map-${name}`),`${name} is represented in the map`);
  }
  const terrain=staticRoot.getObjectByName('map-terrain');
  assert.equal(terrain.material.vertexColors,true);
  assert.ok(new Set(terrain.geometry.attributes.color.array).size>20,'land biomes blend through continuous vertex colors');
  for(const mesh of staticRoot.children){
    assert.ok(mesh.material.isMeshBasicMaterial,'map colors do not depend on scene lights');
    assert.equal(mesh.material.toneMapped,false);
    assert.equal(mesh.castShadow,false);assert.equal(mesh.receiveShadow,false);
    assert.equal(mesh.material.map,null,'all map details are geometry, with no labels or texture text');
    const positions=mesh.geometry.attributes.position;
    for(let i=0;i<positions.count;i+=3){
      const y=positions.getY(i);
      assert.ok(y>=-1e-5&&y<=.1,'map ordering occupies only a thin horizontal layer');
      assert.ok(Math.abs(positions.getY(i+1)-y)<1e-6&&Math.abs(positions.getY(i+2)-y)<1e-6,
        'every triangle is horizontal, including mountain contours and asset glyphs');
    }
  }
  parent.updateMatrixWorld(true);
  const river=staticRoot.getObjectByName('map-waterLight');
  let intersections=0;
  for(const point of world.river.points){
    const ray=new THREE.Raycaster(new THREE.Vector3(point.x,1,point.z),new THREE.Vector3(0,-1,0));
    intersections+=ray.intersectObject(river).length;
  }
  assert.ok(intersections>10,'river centerline remains registered to its model coordinates');
  map.dispose();
});

test('map carriages mirror existing transformed train poses and visibility without a second clock', () => {
  const map=buildMapWorld(new THREE.Group(),generateWorld({density:0}));
  const source=new THREE.Group();source.position.set(3,7,-2);source.rotation.y=.37;
  const parts=Array.from({length:3},(_,i)=>{
    const part=new THREE.Group();part.position.set(2+i*2.64,.42,8);part.rotation.y=.63;
    source.add(part);return part;
  });
  const state={id:'train',color:'coral',active:true},trains=[{state,parts}];
  const matrix=new THREE.Matrix4(),actual=new THREE.Vector3(),expected=new THREE.Vector3(),rotation=new THREE.Quaternion(),scale=new THREE.Vector3();
  for(let step=0;step<3;step++){
    parts.forEach(part=>{part.position.x+=.7;part.rotation.y+=.2;});
    map.update(trains);
    const outlines=map.root.getObjectByName('map-train-outlines');
    assert.equal(outlines.count,3);
    for(let i=0;i<parts.length;i++){
      outlines.getMatrixAt(i,matrix);matrix.decompose(actual,rotation,scale);parts[i].getWorldPosition(expected);
      assert.ok(Math.hypot(actual.x-expected.x,actual.z-expected.z)<1e-5,'marker follows the same carriage');
      const heading=new THREE.Vector3(0,0,1).applyQuaternion(rotation);
      const expectedHeading=new THREE.Vector3(0,0,1).applyQuaternion(parts[i].getWorldQuaternion(new THREE.Quaternion()));
      assert.ok(heading.dot(expectedHeading)>.99999,'marker preserves train heading');
      assert.ok(Math.abs(scale.x-1)<1e-5,'active carriages have visible size');
    }
  }
  state.active=false;map.update(trains);
  const outlines=map.root.getObjectByName('map-train-outlines');
  for(let i=0;i<3;i++){outlines.getMatrixAt(i,matrix);assert.equal(matrix.getMaxScaleOnAxis(),0);}
  state.active=true;parts[1].visible=false;map.update(trains);
  outlines.getMatrixAt(1,matrix);assert.equal(matrix.getMaxScaleOnAxis(),0);
  assert.equal(state.distance,undefined,'the renderer creates no simulation state');
  map.dispose();
});

test('map replacement frees its owned materials, buffers and instance resources exactly once', () => {
  const parent=new THREE.Group(),map=buildMapWorld(parent,generateWorld({density:0}));
  const part=new THREE.Group();map.update([{state:{id:'a',color:'teal',active:true},parts:[part]}]);
  const geometries=new Set(),materials=new Set(),instances=[];
  map.root.traverse(mesh=>{
    if(!mesh.isMesh)return;geometries.add(mesh.geometry);materials.add(mesh.material);
    if(mesh.isInstancedMesh)instances.push(mesh);
  });
  const disposed=new Map();
  for(const resource of [...geometries,...materials,...instances]){
    disposed.set(resource,0);resource.addEventListener('dispose',()=>disposed.set(resource,disposed.get(resource)+1));
  }
  map.dispose();map.dispose();map.update([]);
  assert.equal(parent.children.length,0,'disposing also detaches the map');
  for(const count of disposed.values())assert.equal(count,1,'per-map GPU resources are disposed once');
});

test('far-map geometry depends on geography and cities, never the number of decorative assets or stations', () => {
  const world=generateWorld({cityCount:16,density:0});
  const plain=buildMapWorld(new THREE.Group(),{...world,placements:[],stations:[]});
  const kinds=['house','landmark','tree','farm','rock','cactus','sheep'];
  const detailed=buildMapWorld(new THREE.Group(),{...world,
    placements:Array.from({length:1400},(_,i)=>({kind:kinds[i%kinds.length],x:i%30,z:i%20,scale:1,variant:i%3})),
    stations:Array.from({length:50},(_,i)=>({x:i,z:i})),
  });
  const staticGeometry=map=>map.root.getObjectByName('map-static').children.map(mesh=>({
    name:mesh.name,positions:Array.from(mesh.geometry.attributes.position.array),
  }));
  assert.deepEqual(staticGeometry(detailed),staticGeometry(plain),
    'zoomed-out network summaries do not inherit individual houses, trees, fields, rocks, or station marks');
  assert.equal(detailed.root.getObjectByName('map-cities').children.length,16);
  assert.ok(detailed.root.getObjectByName('map-static').children.length<20,
    'broad terrain and rail colors keep the static material set restrained');
  plain.dispose();detailed.dispose();
});

test('one city glyph encodes ownership and steadily increasing development across all ten levels', () => {
  const players=[{id:'orchid',color:{l:.62,c:.13,h:310}},{id:'copper',color:{l:.64,c:.14,h:38}}];
  const world=generateWorld({cityCount:10,density:0});
  world.players=players;
  world.cities.forEach((city,i)=>Object.assign(city,{ownerId:players[i%2].id,level:i+1}));
  const map=buildMapWorld(new THREE.Group(),world),cityRoot=map.root.getObjectByName('map-cities');
  assert.equal(cityRoot.children.length,world.cities.length,'each city has exactly one symbol');
  let previousSize=0;
  for(const city of world.cities){
    const glyph=cityRoot.getObjectByName(`map-city-${city.id}`);
    assert.ok(glyph?.isMesh);assert.equal(glyph.children.length,0,'a city is one merged glyph, not a building cluster');
    assert.equal(glyph.userData.level,city.level);assert.equal(glyph.userData.ownerId,city.ownerId);
    assert.equal(glyph.position.x,city.x);assert.equal(glyph.position.z,city.z);
    glyph.geometry.computeBoundingBox();
    const size=glyph.geometry.boundingBox.getSize(new THREE.Vector3());
    assert.ok(size.x>previousSize,'every development level has a visibly larger footprint');previousSize=size.x;
    const colors=glyph.geometry.attributes.color,owner=playerColors(players.find(player=>player.id===city.ownerId)).body;
    assert.ok(Array.from({length:colors.count},(_,i)=>i).some(i=>
      Math.abs(colors.getX(i)-owner.r)<1e-6&&Math.abs(colors.getY(i)-owner.g)<1e-6&&Math.abs(colors.getZ(i)-owner.b)<1e-6),
    'city ink comes from its owner palette');
    assert.equal(glyph.material.map,null);assert.equal(glyph.material.toneMapped,false);
    const positions=glyph.geometry.attributes.position;
    assert.ok(positions.count<120,'development adds only a concise silhouette, never fine scenery');
    for(let i=0;i<positions.count;i++)assert.ok(Number.isFinite(positions.getX(i))&&Number.isFinite(positions.getZ(i)));
  }
  map.dispose();
});

test('map train colors use stable player ownership and re-batch when ownership changes', () => {
  const world=generateWorld({density:0});
  world.players=[{id:'orchid',color:{l:.62,c:.13,h:310}},{id:'copper',color:{l:.64,c:.14,h:38}}];
  const map=buildMapWorld(new THREE.Group(),world),part=new THREE.Group();
  const state={id:'owned-train',ownerId:'orchid',color:'teal',active:true},trains=[{state,parts:[part]}];
  map.update(trains);
  const orchid=map.root.getObjectByName('map-train-player:orchid:body');
  assert.ok(orchid);assert.ok(orchid.material.color.equals(playerColors(world.players[0]).body),
    'owner identity takes precedence over an older route livery');
  let disposed=0;orchid.addEventListener('dispose',()=>disposed++);
  state.ownerId='copper';map.update(trains);
  assert.equal(disposed,1,'obsolete instance buffers are freed when the ownership grouping changes');
  assert.equal(map.root.getObjectByName('map-train-player:orchid:body'),undefined);
  const copper=map.root.getObjectByName('map-train-player:copper:body');
  assert.ok(copper.material.color.equals(playerColors(world.players[1]).body));
  assert.equal(state.ownerId,'copper','rendering does not change train ownership');
  map.dispose();
});

test('large maps enlarge city symbols and train width without changing carriage length or positions',()=>{
  const base=generateWorld({density:0}),wide={...base,bounds:{width:320,depth:250}};
  const small=buildMapWorld(new THREE.Group(),base),large=buildMapWorld(new THREE.Group(),wide);
  const glyphSize=map=>new THREE.Box3().setFromObject(map.root.getObjectByName('map-cities').children[0]).getSize(new THREE.Vector3());
  const ratio=glyphSize(large).x/glyphSize(small).x;
  assert.ok(ratio>2&&ratio<=2.6,'larger worlds preserve readable symbols with bounded enlargement');
  const parts=[new THREE.Group(),new THREE.Group(),new THREE.Group()];
  parts.forEach((part,i)=>part.position.set(7,.42,4+i*2.64));
  const train={state:{id:'sample',color:'teal',active:true},parts};small.update([train]);large.update([train]);
  const a=small.root.getObjectByName('map-train-outlines'),b=large.root.getObjectByName('map-train-outlines');
  a.geometry.computeBoundingBox();b.geometry.computeBoundingBox();
  const sizeA=a.geometry.boundingBox.getSize(new THREE.Vector3()),sizeB=b.geometry.boundingBox.getSize(new THREE.Vector3());
  assert.ok(sizeB.x/sizeA.x>=1.5&&sizeB.x/sizeA.x<=2);
  assert.ok(Math.abs(sizeB.z-sizeA.z)<1e-6,'carriage length is unchanged');
  assert.ok(sizeB.z<2.64,'adjacent carriage outlines retain a longitudinal gap');
  const matrixA=new THREE.Matrix4(),matrixB=new THREE.Matrix4();
  for(let i=0;i<parts.length;i++){a.getMatrixAt(i,matrixA);b.getMatrixAt(i,matrixB);assert.deepEqual(matrixA.elements,matrixB.elements);}
  assert.equal(large.root.getObjectByName('map-train-windows'),undefined,'tiny map window detail is omitted');
  small.dispose();large.dispose();
});
