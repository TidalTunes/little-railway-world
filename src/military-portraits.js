import * as THREE from 'three';
import {createMilitaryAsset,MILITARY_KINDS} from './military-assets.js';
import {createMilitaryPalette} from './military-palette.js';
import {styleUniforms} from './scene-style.js';

const TILE_WIDTH=192,TILE_HEIGHT=144;

/** Render the actual game miniatures once, using the game's existing context.
 * The small four-tile target is released immediately; no second WebGL canvas,
 * background render loop or live portrait scenes survive this call. */
export function createMilitaryPortraits(renderer,{team,document:doc=globalThis.document}={}){
  if(!renderer||!doc?.createElement)return {};
  const canvas=doc.createElement('canvas');canvas.width=TILE_WIDTH;canvas.height=TILE_HEIGHT;
  const context=canvas.getContext('2d');if(!context)return {};
  const target=new THREE.WebGLRenderTarget(TILE_WIDTH*MILITARY_KINDS.length,TILE_HEIGHT,{depthBuffer:true,stencilBuffer:false,samples:4});
  target.texture.colorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,.01,100);
  const sky=new THREE.HemisphereLight('#e2f0e7','#627264',2.6),sun=new THREE.DirectionalLight('#fff0ce',3.4),fill=new THREE.DirectionalLight('#bddce8',1.1);
  sun.position.set(-4,7,5);fill.position.set(4,2,-3);scene.add(sky,sun,fill);
  const palette=createMilitaryPalette(team),assets=[],portraits={},pixels=new Uint8Array(TILE_WIDTH*TILE_HEIGHT*4);
  const box=new THREE.Box3(),center=new THREE.Vector3(),point=new THREE.Vector3();
  const previous={
    target:renderer.getRenderTarget(),cube:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),
    viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),scissorTest:renderer.getScissorTest(),
    clear:renderer.getClearColor(new THREE.Color()),alpha:renderer.getClearAlpha(),autoClear:renderer.autoClear,
    toneMapping:renderer.toneMapping,exposure:renderer.toneMappingExposure,colorSpace:renderer.outputColorSpace,
    shadow:renderer.shadowMap.enabled,xr:renderer.xr.enabled,night:styleUniforms.night.value,time:styleUniforms.time.value,
  };
  try{
    renderer.autoClear=false;renderer.shadowMap.enabled=false;renderer.xr.enabled=false;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;renderer.outputColorSpace=THREE.SRGBColorSpace;
    styleUniforms.night.value=0;styleUniforms.time.value=0;
    renderer.setRenderTarget(target);renderer.setScissorTest(false);renderer.setClearColor(0x000000,0);renderer.clear(true,true,true);renderer.setScissorTest(true);
    for(let index=0;index<MILITARY_KINDS.length;index++){
      const kind=MILITARY_KINDS[index],asset=createMilitaryAsset(scene,{kind,palette:palette.materials});assets.push(asset);
      asset.pose({time:kind==='helicopter'?.08:0,moving:0,attack:0});scene.updateMatrixWorld(true);box.setFromObject(asset.root);box.getCenter(center);
      camera.position.copy(center).add(new THREE.Vector3(5,3.6,7));camera.lookAt(center);camera.updateMatrixWorld(true);
      let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
      for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
        point.set(x,y,z).applyMatrix4(camera.matrixWorldInverse);minX=Math.min(minX,point.x);maxX=Math.max(maxX,point.x);minY=Math.min(minY,point.y);maxY=Math.max(maxY,point.y);
      }
      const halfHeight=Math.max((maxY-minY)/2,(maxX-minX)/2*TILE_HEIGHT/TILE_WIDTH)*1.11;
      const midX=(minX+maxX)/2,midY=(minY+maxY)/2,halfWidth=halfHeight*TILE_WIDTH/TILE_HEIGHT;
      camera.left=midX-halfWidth;camera.right=midX+halfWidth;camera.bottom=midY-halfHeight;camera.top=midY+halfHeight;camera.updateProjectionMatrix();
      // Pixel readback binds the resolved single-sample framebuffer. Rebind
      // the target before each tile so subsequent draws return to its MSAA
      // framebuffer instead of being overwritten by an empty resolve.
      renderer.setRenderTarget(target);
      renderer.setViewport(index*TILE_WIDTH,0,TILE_WIDTH,TILE_HEIGHT);renderer.setScissor(index*TILE_WIDTH,0,TILE_WIDTH,TILE_HEIGHT);renderer.render(scene,camera);
      renderer.readRenderTargetPixels(target,index*TILE_WIDTH,0,TILE_WIDTH,TILE_HEIGHT,pixels);
      const image=context.createImageData(TILE_WIDTH,TILE_HEIGHT),rowBytes=TILE_WIDTH*4;
      for(let y=0;y<TILE_HEIGHT;y++)image.data.set(pixels.subarray((TILE_HEIGHT-y-1)*rowBytes,(TILE_HEIGHT-y)*rowBytes),y*rowBytes);
      context.putImageData(image,0,0);portraits[kind]=canvas.toDataURL('image/png');asset.root.visible=false;
    }
    return portraits;
  }finally{
    for(const asset of assets)asset.dispose();palette.dispose();target.dispose();
    styleUniforms.night.value=previous.night;styleUniforms.time.value=previous.time;
    renderer.autoClear=previous.autoClear;renderer.toneMapping=previous.toneMapping;renderer.toneMappingExposure=previous.exposure;renderer.outputColorSpace=previous.colorSpace;
    renderer.shadowMap.enabled=previous.shadow;renderer.xr.enabled=previous.xr;
    renderer.setRenderTarget(previous.target,previous.cube,previous.mip);renderer.setViewport(previous.viewport);renderer.setScissor(previous.scissor);renderer.setScissorTest(previous.scissorTest);renderer.setClearColor(previous.clear,previous.alpha);
  }
}
