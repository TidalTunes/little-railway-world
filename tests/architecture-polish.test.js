import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {bench,house,station,landmark,farmPatch} from '../src/assets.js';
import {M} from '../src/palette.js';
import {clockFaceSpecs,CLOCK_HANDS,clockHandAngle} from '../src/clock-design.js';
import {createClockHands,CLOCK_LIMITS} from '../src/clock-hands.js';
import {rigidSurfacePoseMatrix,surfaceChartCoordinates} from '../src/world-surface.js';

function meshes(root){root.updateMatrixWorld(true);const list=[];root.traverse(m=>{if(m.isMesh)list.push(m);});return list;}
function vertices(mesh){const result=[],points=mesh.geometry.attributes.position;for(let i=0;i<points.count;i++)result.push(new THREE.Vector3().fromBufferAttribute(points,i).applyMatrix4(mesh.matrixWorld));return result;}

test('station downlights are compact ceiling fittings, and every bench has grounded legs',()=>{
  const stop=station(new THREE.Group()),lamps=meshes(stop).filter(m=>m.material===M.lamp);
  assert.equal(lamps.length,2);
  for(const lamp of lamps){const b=new THREE.Box3().setFromObject(lamp);assert.ok(b.max.y-b.min.y<.02);assert.ok(b.min.y>1.70&&b.max.y<1.73);}
  const seat=bench(new THREE.Group()),parts=meshes(seat),boxes=parts.map(m=>new THREE.Box3().setFromObject(m));
  assert.equal(boxes.filter(b=>b.min.y<1e-6).length,4,'all four feet meet the ground');
  const connected=new Set(boxes.map((b,i)=>b.min.y<1e-6?i:-1).filter(i=>i>=0));
  for(let before=-1;before!==connected.size;){before=connected.size;for(let i=0;i<boxes.length;i++)if([...connected].some(j=>boxes[i].intersectsBox(boxes[j])))connected.add(i);}
  assert.equal(connected.size,parts.length,'seat and back slats join real support frames');
});

test('water tower posts terminate under the tank and house variations use their roof silhouette',()=>{
  const water=landmark(new THREE.Group(),{variant:2}),parts=meshes(water);
  const uprights=parts.filter(m=>m.geometry.type==='BoxGeometry'&&m.scale.y>1.5&&Math.abs(m.quaternion.w-1)<1e-8);
  assert.equal(uprights.length,4);
  for(const post of uprights){const bounds=new THREE.Box3().setFromObject(post);assert.ok(bounds.max.y<=2.221);assert.ok(bounds.min.y>=.139);}
  const cottage=house(new THREE.Group(),{variant:1}),cottageParts=meshes(cottage);
  assert.ok(!cottageParts.some(m=>m.geometry.type==='BoxGeometry'&&m.position.z>.95&&m.position.y>1.05&&m.position.y<1.3), 'there is no colored bar above the door');
  const roof=cottageParts.find(m=>m.geometry.attributes.position.count===6);
  const ridge=vertices(roof).filter(v=>v.y>1.9);assert.ok(Math.abs(ridge[0].x-ridge[1].x)>1.6,'the narrow cottage turns its roof ridge');
});

test('farm boundaries have modeled crowns and timber rails without escaping their old strips',()=>{
  let hedges=0,fences=0;
  for(let variant=0;variant<12;variant++){
    const farm=farmPatch(new THREE.Group(),{width:8,depth:8,variant,parcels:[{x:0,z:0,width:8,depth:8,crop:'pasture',variant,hedgeEdges:[0,1,2,3]}]});
    for(const part of meshes(farm).filter(m=>['field-hedge','fence-post','fence-rail'].includes(m.name))){
      if(part.name==='field-hedge')hedges++;else fences++;
      for(const p of vertices(part)){
        assert.ok(Math.max(Math.abs(p.x),Math.abs(p.z))<=3.911,'boundary remains inside the parcel');
        assert.ok(Math.max(Math.abs(p.x),Math.abs(p.z))>=3.749,'old narrow boundary strip contains every detail');
        assert.ok(p.y>=.051&&p.y<=.421,'boundary sits on the field without towering over crops');
      }
      if(part.name!=='fence-rail')assert.ok(Math.min(...vertices(part).map(p=>p.y))<=.055,'posts and hedges penetrate the painted field surface');
      if(part.name==='field-hedge')assert.ok(part.geometry.attributes.position.count<=24,'small faceted crowns stay low polygon');
    }
  }
  assert.ok(hedges>20&&fences>20,'districts contain both leafy hedges and open timber fences');
});

test('animated clock hands match the shared building faces on flat and spherical terrain',()=>{
  const sphere={surface:{type:'sphere',radius:1600,complete:true,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};
  for(const world of [{},sphere]){
    const location=world.surface?surfaceChartCoordinates(world,179.9,72):{x:12,z:-9};
    const item={kind:'landmark',variant:0,...location,y:.14,rotation:.8,scale:1.3};
    const clocks=createClockHands(new THREE.Group(),world);clocks.update(0,{focus:item,placements:[item]});
    assert.equal(clocks.hands.count,8);
    const model=rigidSurfacePoseMatrix(world,item.x,item.y,item.z,item.rotation).scale(new THREE.Vector3(1.3,1.3,1.3));
    const m=new THREE.Matrix4(),part=new THREE.Object3D();
    for(const [faceIndex,spec]of clockFaceSpecs(item.kind,item.variant).entries()){
      part.position.set(spec.x,spec.y,spec.z);part.rotation.set(0,spec.rotation,0);part.scale.set(1,1,1);part.updateMatrix();
      const face=model.clone().multiply(part.matrix);
      for(const [handIndex,hand]of CLOCK_HANDS.entries()){
        const angle=clockHandAngle(0,handIndex),length=spec.radius*hand.length;
        part.position.set(-Math.sin(angle)*length*.43,Math.cos(angle)*length*.43,hand.z);
        part.rotation.set(0,0,angle);part.scale.set(spec.radius*hand.width,length,.008);part.updateMatrix();
        const expected=face.clone().multiply(part.matrix);clocks.hands.getMatrixAt(faceIndex*2+handIndex,m);
        expected.elements.forEach((value,i)=>assert.ok(Math.abs(value-m.elements[i])<.0002));
      }
    }
    const before=Array.from(clocks.hands.instanceMatrix.array);clocks.update(2,{focus:item,placements:[item]});
    assert.notDeepEqual(Array.from(clocks.hands.instanceMatrix.array),before,'hands turn with simulation time');
    clocks.dispose();assert.equal(clocks.root.parent,null);
  }
});

test('town clock update has a fixed draw budget, skips paused uploads and hides with detail',()=>{
  const clocks=createClockHands(new THREE.Group(),{}),placements=Array.from({length:500},(_,i)=>({kind:'landmark',variant:0,x:i%20,z:Math.floor(i/20)}));
  clocks.update(10,{placements});assert.equal(clocks.hands.count,CLOCK_LIMITS.faces*2);assert.equal(clocks.root.children.length,1);
  const version=clocks.hands.instanceMatrix.version;clocks.update(10.01,{placements});assert.equal(clocks.hands.instanceMatrix.version,version);
  clocks.update(20,{placements,reducedMotion:true});const stepped=Array.from(clocks.hands.instanceMatrix.array);
  clocks.update(20.9,{placements,reducedMotion:true});assert.deepEqual(Array.from(clocks.hands.instanceMatrix.array),stepped);
  clocks.update(40,{placements,reducedMotion:true});assert.notDeepEqual(Array.from(clocks.hands.instanceMatrix.array),stepped,'reduced motion clocks still tell calendar time');
  clocks.update(50,{visible:false});assert.equal(clocks.root.visible,false);clocks.dispose();
});


test('earned clock tower and hall reuse animated clock faces without inventing clocks on wells or markets',()=>{
  const clocks=createClockHands(new THREE.Group(),{}),placements=['well','market','clock','hall'].map((buildingType,index)=>({
    id:`civic-${buildingType}`,kind:'civic',buildingType,x:index*5,z:0,y:0,rotation:index*.7,scale:1,
  }));
  try{
    clocks.update(0,{placements});assert.equal(clocks.hands.count,10,'four tower dials and one hall dial');
    const before=Array.from(clocks.hands.instanceMatrix.array.slice(0,160));
    clocks.update(3,{placements});assert.notDeepEqual(Array.from(clocks.hands.instanceMatrix.array.slice(0,160)),before);
    clocks.update(3,{placements:placements.slice(0,2),revision:1});assert.equal(clocks.hands.count,0);
  }finally{clocks.dispose();}
});
