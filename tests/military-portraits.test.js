import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createMilitaryPortraits} from '../src/military-portraits.js';
import {styleUniforms} from '../src/scene-style.js';

function fixture({failAt=-1}={}){
  const initialTarget=new THREE.WebGLRenderTarget(22,34),initialViewport=new THREE.Vector4(5,7,800,600),initialScissor=new THREE.Vector4(13,18,211,242),renders=[],images=[],disposed=new Set();let msaaBound=false,target=initialTarget,cube=2,mip=1,viewport=initialViewport.clone(),scissor=initialScissor.clone(),scissorTest=false,clear=new THREE.Color('#334455'),alpha=.6;
  const renderer={autoClear:true,shadowMap:{enabled:true},xr:{enabled:true},toneMapping:THREE.NeutralToneMapping,toneMappingExposure:.73,outputColorSpace:THREE.LinearSRGBColorSpace,
    getRenderTarget:()=>target,getActiveCubeFace:()=>cube,getActiveMipmapLevel:()=>mip,getViewport:v=>v.copy(viewport),getScissor:v=>v.copy(scissor),getScissorTest:()=>scissorTest,getClearColor:c=>c.copy(clear),getClearAlpha:()=>alpha,
    setRenderTarget:(next,face=0,level=0)=>{target=next;cube=face;mip=level;msaaBound=true;},setViewport:(...args)=>{viewport=args[0]?.isVector4?args[0].clone():new THREE.Vector4(...args);},setScissor:(...args)=>{scissor=args[0]?.isVector4?args[0].clone():new THREE.Vector4(...args);},setScissorTest:value=>{scissorTest=value;},setClearColor:(color,opacity)=>{clear=new THREE.Color(color);alpha=opacity;},clear(){},
    render(scene,camera){
      assert.equal(msaaBound,true,'drawing after pixel readback must rebind the MSAA target');assert.equal(this.shadowMap.enabled,false);assert.equal(this.xr.enabled,false);assert.equal(styleUniforms.night.value,0);assert.equal(target.width,768);assert.equal(target.height,144);
      const rig=scene.children.find(child=>child.isGroup&&child.visible);assert.ok(rig,'each portrait renders a real unit rig');rig.updateMatrixWorld(true);
      const bounds=new THREE.Box3().setFromObject(rig),p=new THREE.Vector3();for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
        p.set(x,y,z).project(camera);assert.ok(Math.abs(p.x)<1&&Math.abs(p.y)<1,'whole miniature fits its portrait');
      }
      rig.traverse(node=>{if(node.geometry)node.geometry.addEventListener('dispose',()=>disposed.add(node.geometry));for(const material of Array.isArray(node.material)?node.material:node.material?[node.material]:[])material.addEventListener('dispose',()=>disposed.add(material));});
      target.addEventListener('dispose',()=>disposed.add(target));renders.push({kind:rig.userData.kind,viewport:viewport.clone(),rig});if(renders.length===failAt)throw new Error('render interrupted');
    },
    readRenderTargetPixels(target,x,y,width,height,pixels){msaaBound=false;for(let row=0;row<height;row++)for(let col=0;col<width;col++){const offset=(row*width+col)*4;pixels[offset]=row;pixels[offset+1]=x/192;pixels[offset+2]=0;pixels[offset+3]=255;}},
  };
  const context={createImageData:(w,h)=>({width:w,height:h,data:new Uint8ClampedArray(w*h*4)}),putImageData:image=>images.push(image)};
  const canvas={getContext:type=>{assert.equal(type,'2d');return context;},toDataURL:type=>{assert.equal(type,'image/png');return`data:image/png;base64,portrait${images.length}`;}};
  const document={createElement:tag=>{assert.equal(tag,'canvas');return canvas;}};
  function assertRestored(){assert.equal(target,initialTarget);assert.equal(cube,2);assert.equal(mip,1);assert.deepEqual(viewport,initialViewport);assert.deepEqual(scissor,initialScissor);assert.equal(scissorTest,false);assert.equal(clear.getHexString(),'334455');assert.equal(alpha,.6);assert.equal(renderer.autoClear,true);assert.equal(renderer.shadowMap.enabled,true);assert.equal(renderer.xr.enabled,true);assert.equal(renderer.toneMapping,THREE.NeutralToneMapping);assert.equal(renderer.toneMappingExposure,.73);assert.equal(renderer.outputColorSpace,THREE.LinearSRGBColorSpace);}
  return{renderer,document,renders,images,disposed,assertRestored,dispose:()=>initialTarget.dispose()};
}

test('portraits reuse the renderer, frame the actual rigs and flip readback into upright transparent PNGs',()=>{
  const f=fixture(),night=styleUniforms.night.value,time=styleUniforms.time.value;styleUniforms.night.value=.92;styleUniforms.time.value=876;
  try{
    const portraits=createMilitaryPortraits(f.renderer,{document:f.document,team:'coral'});
    assert.deepEqual(Object.keys(portraits),['soldier','tank','artillery','helicopter']);assert.equal(f.renders.length,4);assert.equal(f.images.length,4);
    f.renders.forEach((frame,i)=>{assert.deepEqual(frame.viewport.toArray(),[i*192,0,192,144]);assert.equal(frame.rig.parent,null);assert.ok(portraits[frame.kind].startsWith('data:image/png'));});
    for(const [index,image]of f.images.entries()){assert.equal(image.data[0],143);assert.equal(image.data[1],index);assert.equal(image.data[image.data.length-4],0);assert.equal(image.data[3],255);}
    assert.ok(f.disposed.size>25,'temporary target, palettes and geometry are all disposed');f.assertRestored();assert.equal(styleUniforms.night.value,.92);assert.equal(styleUniforms.time.value,876);
  }finally{styleUniforms.night.value=night;styleUniforms.time.value=time;f.dispose();}
});

test('interrupted portrait rendering still restores the live renderer and night uniforms',()=>{
  const f=fixture({failAt:2}),night=styleUniforms.night.value;styleUniforms.night.value=.7;
  try{assert.throws(()=>createMilitaryPortraits(f.renderer,{document:f.document}),/render interrupted/);f.assertRestored();assert.equal(styleUniforms.night.value,.7);assert.ok(f.disposed.size>10);for(const frame of f.renders)assert.equal(frame.rig.parent,null);}
  finally{styleUniforms.night.value=night;f.dispose();}
});
