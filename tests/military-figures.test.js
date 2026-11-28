import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createSoldierArt,createHelicopterArt} from '../src/military-figures.js';

const variants=[['soldier',createSoldierArt,'tracer'],['helicopter',createHelicopterArt,'rocket']];
const paletteNames=['body','light','dark','roof','accent','trim','graphite','steel','rubber','skin','glass','canvas'];
function fixture(t,create){
  const parent=new THREE.Group(),sibling=new THREE.Group();parent.add(sibling);
  const palette=Object.fromEntries(paletteNames.map((name,i)=>[name,new THREE.MeshStandardMaterial({color:new THREE.Color().setHSL(i/12,.4,.5),flatShading:true})]));
  const art=create(parent,{palette});t.after(()=>{art.dispose();Object.values(palette).forEach(material=>material.dispose());});
  return{parent,sibling,palette,art};
}
function transforms(root){const result=[];root.traverse(node=>result.push({name:node.name,p:node.position.toArray(),q:node.quaternion.toArray(),s:node.scale.toArray()}));return result;}
function muzzlePose(art){art.root.updateMatrixWorld(true);return{point:art.muzzle.getWorldPosition(new THREE.Vector3()),direction:new THREE.Vector3(0,0,1).transformDirection(art.muzzle.matrixWorld)};}
function near(actual,expected,tolerance=1e-8){assert.ok(Math.abs(actual-expected)<tolerance,`${actual} should be close to ${expected}`);}

for(const[kind,create,projectile]of variants){
  test(`${kind} has a grounded low-poly silhouette using caller-owned paint`,t=>{
    const{art,palette}=fixture(t,create),geometries=new Set(),usedMaterials=new Set();let meshes=0,triangles=0;
    art.root.traverse(node=>{if(!node.isMesh)return;meshes++;geometries.add(node.geometry);triangles+=(node.geometry.index?.count??node.geometry.attributes.position.count)/3;
      for(const material of Array.isArray(node.material)?node.material:[node.material])usedMaterials.add(material);
      assert.ok(node.castShadow&&node.receiveShadow);
    });
    const bounds=new THREE.Box3().setFromObject(art.root,true),size=bounds.getSize(new THREE.Vector3());
    assert.equal(art.root.userData.kind,kind);assert.equal(art.muzzle.userData.projectile,projectile);near(bounds.min.y,0);
    if(kind==='soldier'){assert.ok(size.y>.72&&size.y<.78);assert.ok(size.x>.28&&size.x<.42);assert.ok(size.z<.6);}
    else{near(size.x,4.5);assert.ok(size.y>1.3&&size.y<1.5);assert.ok(size.z>4.4&&size.z<4.7);}
    assert.ok(meshes<=(kind==='soldier'?24:42));assert.ok(triangles<(kind==='soldier'?400:1100));assert.ok(geometries.size<=5);
    assert.ok([...usedMaterials].every(material=>Object.values(palette).includes(material)),'supplied paints are shared without clones');
    assert.ok(usedMaterials.has(palette.body)&&usedMaterials.has(palette.graphite));
    for(const geometry of geometries)for(const array of[geometry.attributes.position.array,geometry.attributes.normal.array])assert.ok(array.every(Number.isFinite));
    const pose=muzzlePose(art);assert.deepEqual(pose.direction.toArray(),[0,0,1]);assert.ok(pose.point.z>.4);
  });

  test(`${kind} muzzle turns right for positive yaw and upward for positive elevation`,t=>{
    const{art,parent}=fixture(t,create),yaw=.9,elevation=.4;
    art.pose({aimYaw:yaw,elevation});const aimed=muzzlePose(art);
    const expectedDirection=new THREE.Vector3(Math.sin(yaw)*Math.cos(elevation),Math.sin(elevation),Math.cos(yaw)*Math.cos(elevation));
    assert.ok(aimed.direction.distanceTo(expectedDirection)<1e-9);
    const expectedPoint=aimed.point.clone().applyAxisAngle(new THREE.Vector3(0,1,0),.7).add(new THREE.Vector3(4,2,-7));
    parent.position.set(4,2,-7);parent.rotation.y=.7;parent.updateMatrixWorld(true);
    assert.ok(muzzlePose(art).point.distanceTo(expectedPoint)<1e-9);
    const tipName=kind==='soldier'?'rifle-tip':'rocket-tube',tipCandidates=[];art.root.traverse(node=>{if(node.name===tipName)tipCandidates.push(node);});
    assert.ok(tipCandidates.some(tip=>new THREE.Box3().setFromObject(tip,true).expandByScalar(1e-7).containsPoint(muzzlePose(art).point)),'projectile originates at a visible barrel opening');
  });

  test(`${kind} gives a brief recoil after firing, then returns to its exact idle pose`,t=>{
    const{art}=fixture(t,create),neutral=transforms(art.root),rest=muzzlePose(art).point;
    art.pose({attack:.18});assert.deepEqual(transforms(art.root),neutral,'fire at .18 uses an unretracted muzzle');
    art.pose({attack:.315});const kicked=muzzlePose(art).point;assert.ok(kicked.z<rest.z-.01);assert.ok(Math.abs(kicked.y-rest.y)<.012);
    art.pose({attack:1});assert.deepEqual(transforms(art.root),neutral);
  });

  test(`${kind} poses are deterministic, finite, and preserve caller placement`,t=>{
    const{art}=fixture(t,create),geometries=[];art.root.traverse(node=>{if(node.isMesh)geometries.push(node.geometry);});
    art.root.position.set(3,kind==='helicopter'?1.3:0,-6);art.root.rotation.y=.2;art.root.scale.setScalar(1.4);
    const placement=transforms(art.root)[0],settings={time:1.23,moving:.8,attack:.3,aimYaw:.7,elevation:.3};
    art.pose(settings);const first=transforms(art.root);art.pose({time:91,moving:1,attack:.9});art.pose(settings);assert.deepEqual(transforms(art.root),first);
    for(const pose of[{time:NaN,moving:Infinity,attack:NaN,aimYaw:Infinity,elevation:NaN},{time:21,moving:-5,attack:2,aimYaw:-1,elevation:50},{time:-40,moving:8,attack:-1,elevation:-50}]){
      art.pose(pose);art.root.updateMatrixWorld(true);art.root.traverse(node=>assert.ok(node.matrixWorld.elements.every(Number.isFinite)));assert.deepEqual(transforms(art.root)[0],placement);
    }
    const after=[];art.root.traverse(node=>{if(node.isMesh)after.push(node.geometry);});assert.deepEqual(after,geometries);
    assert.equal(new Set(art.root.userData.animatedNodes).size,kind==='soldier'?6:7);
    for(const name of art.root.userData.animatedNodes)assert.ok(art.root.getObjectByName(name),`${name} is available to the instanced clip compiler`);
    art.pose({time:.125,moving:1});const cycle=transforms(art.root);art.pose({time:1.125,moving:1});assert.deepEqual(transforms(art.root),cycle,'one-second baked locomotion clips wrap without a seam');
  });

  test(`${kind} disposes its private geometry once without disposing any supplied materials`,t=>{
    const{art,parent,sibling,palette}=fixture(t,create),disposed=new Map(),materialDisposals=[];
    art.root.traverse(node=>{if(node.isMesh&&!disposed.has(node.geometry)){disposed.set(node.geometry,0);node.geometry.addEventListener('dispose',()=>disposed.set(node.geometry,disposed.get(node.geometry)+1));}});
    Object.values(palette).forEach(material=>material.addEventListener('dispose',()=>materialDisposals.push(material)));
    art.dispose();art.dispose();const before=transforms(art.root);art.pose({time:7,moving:1,attack:.4});
    assert.deepEqual(transforms(art.root),before);assert.deepEqual(parent.children,[sibling]);assert.equal(art.root.parent,null);
    assert.ok([...disposed.values()].every(count=>count===1));assert.deepEqual(materialDisposals,[]);
  });
}

test('soldier has a planted foot throughout the stylized stride and both hands stay attached',t=>{
  const{art}=fixture(t,createSoldierArt),boots=[];art.root.traverse(node=>{if(node.name==='soldier-boot')boots.push(node);});
  for(let frame=0;frame<120;frame++){
    art.pose({time:frame/60,moving:1,aimYaw:.4,elevation:Math.sin(frame/20)*.4,attack:frame/120});art.root.updateMatrixWorld(true);
    const floors=boots.map(boot=>new THREE.Box3().setFromObject(boot,true).min.y);
    assert.ok(Math.min(...floors)>-1e-8,'neither foot penetrates the ground');assert.ok(Math.min(...floors)<1e-8,'one foot stays planted');
    for(const[name,handName]of[['soldier-right-arm','soldier-trigger-hand'],['soldier-left-arm','soldier-support-hand']]){
      const arm=art.root.getObjectByName(name),hand=art.root.getObjectByName(handName),wrist=new THREE.Vector3(0,.5,0).applyMatrix4(arm.matrixWorld);
      assert.ok(wrist.distanceTo(hand.getWorldPosition(new THREE.Vector3()))<1e-9,'solid sleeve ends at the mitten grip');
    }
  }
});

test('helicopter rotors move while the fuselage keeps a fixed caller-controlled altitude',t=>{
  const{art}=fixture(t,createHelicopterArt),body=art.root.getObjectByName('helicopter-body'),rotor=art.root.getObjectByName('helicopter-main-rotor'),tail=art.root.getObjectByName('helicopter-tail-rotor');
  art.root.position.y=1.3;art.pose({time:.1});assert.notEqual(rotor.rotation.y,0);assert.notEqual(tail.rotation.x,0);
  for(let frame=0;frame<120;frame++){
    art.pose({time:frame/30,moving:1,attack:frame/120});near(art.root.position.y,1.3);assert.equal(body.position.y,.70);assert.ok(Math.abs(body.rotation.x)<.06);assert.equal(body.rotation.z,0);
  }
  const shell=art.root.getObjectByName('helicopter-fuselage');assert.ok(shell.material.length===3,'glass and paint share the same continuous shell');
});

test('helicopter banks around its fuselage while rocket pods aim independently without leaving their mounts',t=>{
  const{art}=fixture(t,createHelicopterArt);art.root.position.y=5;
  art.pose({pitch:.24,roll:-.19});art.root.updateMatrixWorld(true);
  const mounts=['left','right'].map(side=>art.root.getObjectByName(`helicopter-aim-${side}`)),before=mounts.map(node=>node.getWorldPosition(new THREE.Vector3()));
  const shell=art.root.getObjectByName('helicopter-shell'),orientation=shell.getWorldQuaternion(new THREE.Quaternion());
  art.pose({pitch:.24,roll:-.19,aimYaw:.7,elevation:-.8});art.root.updateMatrixWorld(true);
  assert.equal(art.root.position.y,5);assert.ok(shell.getWorldQuaternion(new THREE.Quaternion()).angleTo(orientation)<1e-8,'weapon aiming does not twist the aircraft');
  mounts.forEach((node,i)=>assert.ok(node.getWorldPosition(new THREE.Vector3()).distanceTo(before[i])<1e-8,'pod keeps its fixed wing attachment'));
  assert.ok(muzzlePose(art).direction.y<-.7,'rocket launchers can point down from the fixed flight plane');
});
