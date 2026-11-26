import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Matrix4,Mesh,MeshBasicMaterial,DoubleSide,Raycaster,Vector3,ShaderLib} from 'three';
import {compileMountainRange} from '../src/mountain-ranges.js';
import {mountainSurfaceHeight} from '../src/mountain-shape.js';
import {createMountainGeometry} from '../src/geography.js';
import {walkingGroundSampler} from '../src/walking-ground.js';
import {walkingDetailPlan,createWalkingDetail} from '../src/walking-detail.js';
import {WALKING_GRASS_ROOTS} from '../src/walking-vegetation.js';

const ring=[[-100,-100],[100,-100],[100,100],[-100,100],[-100,-100]];
function world(mountains=[]){return {seed:'grass-edges',mountains,lines:[],rivers:[],stations:[],
  biomes:{regions:[{type:'mountain',polygons:[[ring]]}],oceanShore:[]}};}
function hillside(){return compileMountainRange({id:'green-hill',polygon:[[-22,-30],[22,-30],[22,30],[-22,30]],
  ridges:[{points:[[0,-25,9],[0,25,9]],width:16}],cellSize:4,edgeWidth:9,snowLine:18});}

test('grass extends across green mountain footprints and fades continuously with the painted terrain',()=>{
  const mountain=hillside(),scene=world([mountain]),sampler=walkingGroundSampler(scene);
  const plan=walkingDetailPlan(scene,[],{x:-20,z:0});
  const outside=plan.grass.filter(p=>p.anchor.x<-22&&p.anchor.x>-25&&Math.abs(p.anchor.z)<10);
  const inside=plan.grass.filter(p=>p.anchor.x>-22&&p.anchor.x<-19&&Math.abs(p.anchor.z)<10);
  assert.ok(outside.length>140&&inside.length>120,'there is no bare mountain-radius or biome-boundary ring');
  assert.ok(inside.some(p=>p.anchor.y>.1),'grass climbs the real green foothills');
  const at=x=>sampler.vegetation(x,0,sampler.sample(x,0));
  assert.ok(Math.abs(at(-22.01).density-at(-21.99).density)<.01,'density is continuous through the foot of a hill');
  const steep={height:7,mountain,face:{normal:{x:1,y:.2,z:0}}};
  assert.ok(sampler.vegetation(0,0,steep).density<.01,'high bare cliffs do not grow a floating meadow');
});

test('dry ecotones thin the same stable grass lattice gradually instead of cutting it off at a biome edge',()=>{
  const scene=world();scene.biomes.sites=[{type:'plains',x:-10,z:0},{type:'desert',x:10,z:0}];
  const sampler=walkingGroundSampler(scene),values=[];
  for(let x=-8;x<=8;x+=.1)values.push(sampler.vegetation(x,0,sampler.sample(x,0)));
  assert.ok(values[0].density>.99&&values.at(-1).density<.06);
  assert.ok(values.some(p=>p.density>.2&&p.density<.8));
  for(let i=1;i<values.length;i++){
    assert.ok(Math.abs(values[i].density-values[i-1].density)<.08,'no categorical density jump');
    assert.ok(Math.abs(values[i].heightScale-values[i-1].heightScale)<.08,'no categorical blade-height jump');
    assert.ok(Math.max(...values[i].color.map((v,j)=>Math.abs(v-values[i-1].color[j])))<.08,'blade color follows the ground blend');
  }
});

test('each blade root follows the actual generated mountain facets, even across tile-sized ridges',()=>{
  const mountain=hillside(),scene=world([mountain]),plan=walkingDetailPlan(scene,[],{x:-17,z:0});
  const geometry=createMountainGeometry(mountain,[]),material=new MeshBasicMaterial({side:DoubleSide}),mesh=new Mesh(geometry,material);
  mesh.updateMatrixWorld(true);const ray=new Raycaster(),down=new Vector3(0,-1,0);let checked=0,crossings=0;
  for(const item of plan.grass.filter(p=>p.anchor.y>.1).filter((_,i)=>i%11===0)){
    const {x,z}=item.anchor,ca=Math.cos(item.rotation),sa=Math.sin(item.rotation);
    for(const [[u,v],index]of WALKING_GRASS_ROOTS.map((root,i)=>[root,i])){
      const px=x+(u*ca+v*sa)*item.sx,pz=z+(-u*sa+v*ca)*item.sz;
      ray.set(new Vector3(px,30,pz),down);const hit=ray.intersectObject(mesh)[0];
      if(!hit)continue;
      const actual=item.anchor.y+item.rootHeights[index];
      assert.ok(Math.abs(actual+.006-hit.point.y)<.00001,'roots use exact rendered triangles, with only a 6 mm planted overlap');
      checked++;
    }
    if(Math.max(...item.rootHeights)-Math.min(...item.rootHeights)>.12)crossings++;
  }
  assert.ok(checked>1500&&crossings>5,'exercise steep slopes as well as nearly flat toes');
  geometry.dispose();material.dispose();
});

test('grass root offsets upload once with the bounded instance pools and retain shader attribute headroom',()=>{
  const mountain=hillside(),scene=world([mountain]),layer=createWalkingDetail(new Group(),scene);
  const focus={x:-17,z:0};layer.update(focus,{visible:true});
  const mesh=layer.root.getObjectByName('walking-grass'),plan=walkingDetailPlan(scene,[],focus),matrix=new Matrix4(),root=new Vector3();
  const attrs=Array.from({length:6},(_,i)=>mesh.geometry.attributes[`grassRoots${i}`]);
  const versions=attrs.map(a=>a.version);
  for(let index=0;index<mesh.count;index+=53){
    const item=plan.grass[index];mesh.getMatrixAt(index,matrix);
    for(let j=0;j<24;j++){
      const [x,z]=WALKING_GRASS_ROOTS[j],dy=attrs[j>>2].array[index*4+j%4];
      root.set(x,dy,z).applyMatrix4(matrix);
      assert.ok(Math.abs(root.y-(mountainSurfaceHeight(mountain,root.x,root.z)-.006))<.00002);
    }
  }
  layer.update({...focus,x:focus.x+.5},{visible:true,time:10});
  assert.deepEqual(attrs.map(a=>a.version),versions,'wind and ordinary walking never resample or upload terrain');
  const slots=Object.values(mesh.geometry.attributes).reduce((n,a)=>n+Math.ceil(a.itemSize/4),0)+4+1;
  assert.ok(slots<=16,'grass stays within the minimum WebGL2 vertex-attribute limit');
  const shader={uniforms:{},vertexShader:ShaderLib.lambert.vertexShader,fragmentShader:ShaderLib.lambert.fragmentShader};
  mesh.material.onBeforeCompile(shader,{});assert.match(shader.vertexShader,/mix\(grassGround\(grassRoot.x\), grassGround\(grassRoot.y\), grassRoot.z\)/);
  layer.dispose();
});

test('open railway cuttings and low tunnel portals keep their wider excavated shoulders clear',()=>{
  const mountain=hillside(),scene=world([mountain]);
  const points=Array.from({length:101},(_,i)=>({x:0,y:.42,z:i-50})),distances=points.map((_,i)=>i);
  scene.lines=[{id:'cut',points,distances,length:100,cuts:[{mountainId:mountain.id,start:10,end:90}],tunnels:[]}];
  const plan=walkingDetailPlan(scene,[],{x:0,z:0});
  assert.ok(plan.grass.length>1000);
  for(const item of plan.grass)assert.ok(Math.abs(item.anchor.x)>=2.50,'blade fans clear open-cut lips, not merely ballast');
  const mesh=new Mesh(createMountainGeometry(mountain,scene.lines,scene),new MeshBasicMaterial({side:DoubleSide}));
  mesh.updateMatrixWorld(true);const ray=new Raycaster(),down=new Vector3(0,-1,0);let count=0;
  for(const item of plan.grass.filter(p=>Math.abs(p.anchor.x)<4&&p.anchor.y>.1).filter((_,i)=>i%9===0)){
    ray.set(new Vector3(item.anchor.x,30,item.anchor.z),down);const hit=ray.intersectObject(mesh)[0];
    assert.ok(hit&&Math.abs(hit.point.y-item.anchor.y-.006)<.0001,'accepted grass remains on surviving CSG surface');count++;
  }
  assert.ok(count>5);mesh.geometry.dispose();mesh.material.dispose();
});
