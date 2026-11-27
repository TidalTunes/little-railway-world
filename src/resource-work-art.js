import * as THREE from 'three';
import {createSettlementResidents} from './settlement-residents.js';
import {applySceneStyle} from './scene-style.js';
import {rigidSurfacePoseMatrix,surfaceDistance} from './world-surface.js';

/** Productive citizens reuse the bounded two-draw passenger rig. Ore is three
 * small shared instanced rock/vein draws; no geometry is generated per frame. */
export function createResourceWorkArt(parent,world,work){
  const groups=new Map(),oreRoot=new THREE.Group();oreRoot.name='resource-ore-nodes';parent.add(oreRoot);
  const rockMaterial=applySceneStyle(new THREE.MeshStandardMaterial({color:0x7c6962,roughness:1,flatShading:true}));
  const veinMaterial=applySceneStyle(new THREE.MeshStandardMaterial({color:0xd0a174,roughness:.75,metalness:.12,flatShading:true}));
  const rockGeometry=new THREE.DodecahedronGeometry(1,0),veinGeometry=new THREE.BoxGeometry(1,1,1),capacity=96;
  const rocks=new THREE.InstancedMesh(rockGeometry,rockMaterial,capacity),veins=new THREE.InstancedMesh(veinGeometry,veinMaterial,capacity*2);
  for(const mesh of[rocks,veins]){mesh.count=0;mesh.castShadow=mesh.receiveShadow=true;mesh.frustumCulled=false;oreRoot.add(mesh);}
  const cargoMaterial=applySceneStyle(new THREE.MeshStandardMaterial({color:0xffffff,roughness:1,flatShading:true}));
  const cargoGeometry=new THREE.BoxGeometry(.22,.17,.24),cargo=new THREE.InstancedMesh(cargoGeometry,cargoMaterial,192);
  cargo.name='worker-carried-resources';cargo.count=0;cargo.frustumCulled=false;cargo.castShadow=true;parent.add(cargo);
  const cargoColors={wood:new THREE.Color(0x9d683b),metal:new THREE.Color(0x91a1a1),food:new THREE.Color(0xc5a65a),gold:new THREE.Color(0xcfae42)};
  const pose=new THREE.Matrix4(),part=new THREE.Object3D(),matrix=new THREE.Matrix4();let oreSignature='';
  function sync(){
    for(const worker of work.workers.values())if(!groups.has(worker.ownerId)){
      const selected=new Map();
      const simulation={residents:selected,sync(){},snapshot:()=>[...selected.values()],get revision(){return work.revision;},get visibilityRevision(){return work.visibilityRevision;},get stats(){return{indoors:[...selected.values()].filter(worker=>worker.indoors).length};}};
      const art=createSettlementResidents(parent,world,{ownerId:worker.ownerId,simulation});groups.set(worker.ownerId,{selected,art});
    }
    for(const {selected}of groups.values())selected.clear();for(const worker of work.workers.values())groups.get(worker.ownerId).selected.set(worker.id,worker);
    const signature=work.placements.map(item=>item.id).join('|');if(signature===oreSignature)return;oreSignature=signature;
    let index=0,veinIndex=0;
    for(const item of work.placements.slice(0,Math.floor(capacity/3))){
      rigidSurfacePoseMatrix(world,item.x,item.y,item.z,item.rotation,pose);
      for(let i=0;i<3;i++){
        part.position.set((i-1)*.48,.23+(i===1?.19:0),i===1?-.17:.12);part.rotation.set(.1*i,.8*i,.15*(i-1));part.scale.set(i===1?.7:.52,i===1?.65:.39,.52);part.updateMatrix();matrix.copy(pose).multiply(part.matrix);rocks.setMatrixAt(index++,matrix);
        part.position.y+=i===1?.48:.27;part.rotation.set(-.6,.8*i,.12);part.scale.set(.10,.055,.36);part.updateMatrix();matrix.copy(pose).multiply(part.matrix);veins.setMatrixAt(veinIndex++,matrix);
        part.position.x+=.18;part.position.y-=.04;part.scale.set(.06,.05,.22);part.updateMatrix();matrix.copy(pose).multiply(part.matrix);veins.setMatrixAt(veinIndex++,matrix);
      }
    }
    rocks.count=index;veins.count=veinIndex;rocks.instanceMatrix.needsUpdate=veins.instanceMatrix.needsUpdate=true;
  }
  function update(dt,options={}){
    sync();for(const {art}of groups.values())art.update(dt,options);oreRoot.visible=options.visible!==false&&(options.mapBlend??0)<.98;
    cargo.visible=oreRoot.visible;let count=0;const radius=(options.walkingWeight??0)>.5?48:95,focus=options.focus??{x:0,z:0};
    if(cargo.visible)for(const worker of work.workers.values())if(worker.carrying&&!worker.indoors&&count<192&&surfaceDistance(world,focus,worker)<radius){
      rigidSurfacePoseMatrix(world,worker.x,worker.y+.012,worker.z,worker.heading,pose);
      part.position.set(0,.43,.19);part.rotation.set(0,0,0);part.scale.set(1,1,1);part.updateMatrix();matrix.copy(pose).multiply(part.matrix);cargo.setMatrixAt(count,matrix);cargo.setColorAt(count++,cargoColors[worker.resource]);
    }
    cargo.count=count;cargo.instanceMatrix.needsUpdate=true;if(cargo.instanceColor)cargo.instanceColor.needsUpdate=true;
  }
  return{update,get placements(){return work.placements;},get stats(){return{visible:[...groups.values()].reduce((sum,{art})=>sum+art.stats.visible,0),draws:[...groups.values()].reduce((sum,{art})=>sum+art.stats.draws,0)+(rocks.count?2:0)+(cargo.count?1:0)};},
    dispose(){for(const{art}of groups.values())art.dispose();groups.clear();oreRoot.removeFromParent();cargo.removeFromParent();cargo.dispose();cargoGeometry.dispose();cargoMaterial.dispose();rocks.dispose();veins.dispose();rockGeometry.dispose();veinGeometry.dispose();rockMaterial.dispose();veinMaterial.dispose();}};
}
