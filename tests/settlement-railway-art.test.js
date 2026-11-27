import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createSettlementRailwayArt,buildJoinedSettlementTracks} from '../src/settlement-railway-art.js';
import {M} from '../src/palette.js';
import {integerPolygonOperation} from '../src/polygon-ops.js';

const world={players:[{id:'teal',color:{l:.60,c:.13,h:185}},{id:'coral',color:{l:.63,c:.14,h:24}}],river:{y:-1.8},rivers:[],mountains:[],outline:[[-100,-100],[100,-100],[100,100],[-100,100]]};
const line={id:'track-1',from:'home',to:'other',ownerId:'teal',length:20,points:[{x:0,y:.42,z:0},{x:0,y:.42,z:20}],distances:[0,20],bridges:[],tunnels:[]};
const stations=[{id:'station-home',kind:'station',cityId:'home',ownerId:'teal',x:-2.5,y:0,z:3,rotation:Math.PI/2},{id:'station-other',kind:'station',cityId:'other',ownerId:'coral',x:-2.5,y:0,z:17,rotation:Math.PI/2}];
const cities=[{id:'home',ownerId:'teal',x:-8,z:3,radius:4},{id:'other',ownerId:'coral',x:-8,z:17,radius:4}];
const snapshot={revision:1,lines:[line],stations,cities};
function fixture(t){const parent=new THREE.Group(),mapParent=new THREE.Group(),art=createSettlementRailwayArt(parent,mapParent,world);t.after(()=>art.dispose());return{parent,mapParent,art};}

function topTriangles(mesh,y){
  const points=mesh.geometry.attributes.position,triangles=[];
  for(let i=0;i<points.count;i+=3){
    if([0,1,2].some(offset=>Math.abs(points.getY(i+offset)-y)>1e-6))continue;
    const triangle=[0,1,2].map(offset=>[points.getX(i+offset),points.getZ(i+offset)]);triangles.push([...triangle,triangle[0]]);
  }
  return triangles;
}
const ringArea=ring=>Math.abs(ring.reduce((sum,point,i)=>{const next=ring[(i+1)%ring.length];return sum+point[0]*next[1]-next[0]*point[1];},0))/2;

test('fork ballast and rails have one unioned top surface without overlapping triangles',t=>{
  const forkPoints=[{x:0,y:.42,z:0},{x:0,y:.42,z:8},...Array.from({length:8},(_,i)=>{const angle=(i+1)/8*Math.PI/4;return{x:8-8*Math.cos(angle),y:.42,z:8+8*Math.sin(angle)};})];
  const distances=[0];for(let i=1;i<forkPoints.length;i++)distances.push(distances.at(-1)+Math.hypot(forkPoints[i].x-forkPoints[i-1].x,forkPoints[i].z-forkPoints[i-1].z));
  const fork={...line,id:'fork',points:forkPoints,distances,length:distances.at(-1)},group=new THREE.Group();
  t.after(()=>group.traverse(mesh=>mesh.geometry?.dispose()));
  const joined=buildJoinedSettlementTracks(group,world,[line,fork]);assert.ok(joined);
  for(const [kind,y]of [['ballast',.23],['rails',.42]]){
    const triangles=topTriangles(joined[kind],y);assert.ok(triangles.length>0);assert.ok(joined[kind].geometry.attributes.position.array.every(Number.isFinite));
    for(let i=0;i<triangles.length;i++)for(let j=i+1;j<triangles.length;j++){
      const overlap=integerPolygonOperation('intersection',[[triangles[i]]],[[triangles[j]]]);
      assert.ok(overlap.reduce((sum,polygon)=>sum+ringArea(polygon[0]),0)<1e-6,`${kind} top triangles may share edges, never area`);
    }
    const area=triangles.reduce((sum,triangle)=>sum+ringArea(triangle),0),separate=new THREE.Group();group.add(separate);
    const separateArea=[line,fork].reduce((sum,item)=>sum+topTriangles(buildJoinedSettlementTracks(separate,world,[item])[kind],y).reduce((n,triangle)=>n+ringArea(triangle),0),0);
    assert.ok(separateArea-area>(kind==='ballast'?10:.7),'the shared throat is removed from the duplicated surface area');
  }
});

test('joined planar tracks leave sloped routes untouched for the existing swept renderer',()=>{
  const parent=new THREE.Group(),sloped={...line,points:[{x:0,y:.42,z:0},{x:0,y:1.42,z:20}]};
  assert.equal(buildJoinedSettlementTracks(parent,world,[sloped]),null);assert.equal(parent.children.length,0);
});

test('committed railways batch all track and station art and retain exact rail elevation',t=>{
  const {art}=fixture(t);assert.equal(art.sync(snapshot),true);assert.ok(art.meshes.length>0&&art.meshes.length<6);
  const bounds=new THREE.Box3().setFromObject(art.root);assert.ok(bounds.min.z<=0&&bounds.max.z>=20);assert.ok(bounds.min.y<.001&&bounds.min.y>-.001);assert.ok(bounds.max.y>2);
  const mapStrokes=art.mapRoot.getObjectByName('built-map-railway-network').children;
  assert.equal(mapStrokes.length,2,'all station and line strokes share one paper/ink draw-call pair');
  assert.equal(art.stats.lines,1);assert.equal(art.stats.stations,2);
  for(const mesh of mapStrokes){assert.ok(mesh.geometry.attributes.railwayOffset);assert.ok(mesh.geometry.attributes.position.array.every(Number.isFinite));}
  const network=art.root.getObjectByName('built-railway-network'),identity=network.children[0].geometry;
  assert.equal(art.sync(snapshot),false);assert.equal(network.children[0].geometry,identity,'stable revisions never allocate replacement geometry');
});

test('shared station spines and endpoint stations render once even if a caller repeats ids',t=>{
  const {art}=fixture(t);art.sync({...snapshot,lines:[line,line],stations:[...stations,stations[0]]});
  assert.equal(art.mapRoot.getObjectByName('built-map-railway-network').children.length,2);assert.equal(art.stats.stations,2);assert.equal(art.stats.lines,1);
  const before=art.meshes.reduce((n,mesh)=>n+mesh.geometry.attributes.position.count,0);
  art.sync({...snapshot,revision:2});assert.equal(art.meshes.reduce((n,mesh)=>n+mesh.geometry.attributes.position.count,0),before);
});

test('preview follows the proposed alignment, changes color when invalid, and keeps city targets visible before a destination is chosen',t=>{
  const {art}=fixture(t);art.preview(null,{cities,sourceCityId:'home',visible:true});
  const halos=art.root.getObjectByName('railway-city-targets');assert.ok(halos.visible);assert.equal(halos.count,1,'only the selected source is outlined before a destination is chosen');
  assert.equal(art.root.getObjectByName('railway-preview').visible,false);
  const result={valid:true,lines:[line],stations};art.preview(result,{cities,sourceCityId:'home',targetCityId:'other',visible:true});
  const preview=art.root.getObjectByName('railway-preview'),route=preview.getObjectByName('railway-route-preview');
  assert.ok(preview.visible);assert.equal(preview.children.filter(child=>child.visible&&child.isMesh).length,4);const positions=route.geometry.attributes.position;
  assert.ok(Math.abs(positions.getY(0)-.48)<1e-7);assert.ok(Math.abs(positions.getZ(route.geometry.drawRange.count-1)-20)<1e-7);
  const good=route.material.color.clone(),geometry=route.geometry;
  art.preview(result,{cities,sourceCityId:'home',targetCityId:'other',visible:true});assert.equal(route.geometry,geometry);
  art.preview({...result,valid:false,siteValid:false},{cities,sourceCityId:'home',targetCityId:'other',visible:true});
  const badRoute=preview.getObjectByName('railway-route-preview');assert.ok(!badRoute.material.color.equals(good));
  const target=new THREE.Color();halos.getColorAt(1,target);assert.ok(Math.abs(target.r-badRoute.material.color.r)<1e-7&&Math.abs(target.g-badRoute.material.color.g)<1e-7&&Math.abs(target.b-badRoute.material.color.b)<1e-7);
  art.preview(null,{cities,visible:false});art.update({mapBlend:1});assert.equal(halos.visible,false);assert.equal(preview.visible,false);
});

test('only selected cities get strong full-footprint rings and large cities are never capped',t=>{
  const {art}=fixture(t),selection=[{...cities[0],radius:22},{...cities[1],radius:34},{id:'unselected',x:40,z:40,radius:50}];
  art.preview(null,{cities:selection,visible:true});
  for(const root of [art.root,art.mapRoot]){assert.equal(root.getObjectByName('railway-city-targets').count,0);assert.equal(root.getObjectByName('railway-city-targets').visible,false);}
  art.preview(null,{cities:selection,sourceCityId:'home',targetCityId:'other',visible:true});
  for(const root of [art.root,art.mapRoot]){
    const ring=root.getObjectByName('railway-city-targets'),outline=root.getObjectByName('railway-city-outline'),matrix=new THREE.Matrix4();
    assert.equal(ring.count,2);assert.equal(outline.count,2);assert.ok(ring.visible&&outline.visible);
    ring.getMatrixAt(0,matrix);assert.ok(Math.abs(new THREE.Vector3().setFromMatrixScale(matrix).x-23.2)<1e-5);assert.equal(matrix.elements[12],selection[0].x);
    ring.getMatrixAt(1,matrix);assert.ok(Math.abs(new THREE.Vector3().setFromMatrixScale(matrix).x-35.2)<1e-5);
  }
  art.preview(null,{cities:selection,sourceCityId:'home',targetCityId:'home',visible:true});assert.equal(art.root.getObjectByName('railway-city-targets').count,1,'a duplicate source/target cannot draw twice');
});

test('source selection shows a thin dashed maximum-range boundary before a route exists',t=>{
  const {art}=fixture(t),options={cities,sourceCityId:'home',maxConnectionDistance:140,visible:true};art.preview(null,options);
  for(const root of [art.root,art.mapRoot]){
    const range=root.getObjectByName('railway-connection-range'),city=root.getObjectByName('railway-city-targets'),matrix=new THREE.Matrix4();
    assert.ok(range.visible);assert.equal(range.count,1);range.getMatrixAt(0,matrix);assert.equal(matrix.elements[12],cities[0].x);assert.equal(matrix.elements[14],cities[0].z);assert.equal(new THREE.Vector3().setFromMatrixScale(matrix).x,140);
    assert.equal(range.geometry,city.geometry,'selection and range boundaries share one immutable circle');
    const rangeShader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>'},cityShader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>'};
    range.material.onBeforeCompile(rangeShader);city.material.onBeforeCompile(cityShader);
    assert.ok(rangeShader.fragmentShader.includes('fract(vCircleArc)'));assert.ok(!cityShader.fragmentShader.includes('fract(vCircleArc)'));
    assert.ok(rangeShader.uniforms.circlePixels.value<cityShader.uniforms.circlePixels.value,'the planning boundary stays lighter than the selected city');
    assert.ok(rangeShader.vertexShader.includes('/ max(circleScale, 0.001)'),'stroke thickness is independent of circle radius');
  }
  art.preview({valid:true,siteValid:true,lines:[],stations:[],range:{maxConnectionDistance:95}},options);
  const matrix=new THREE.Matrix4();art.root.getObjectByName('railway-connection-range').getMatrixAt(0,matrix);assert.equal(new THREE.Vector3().setFromMatrixScale(matrix).x,95);
  art.preview(null,{cities,maxConnectionDistance:140,visible:true});assert.equal(art.root.getObjectByName('railway-connection-range').visible,false,'a range circle requires an actual source');
});

test('out-of-range destinations keep selection and range context without any route or edit handles',t=>{
  const {art}=fixture(t),result={valid:false,siteValid:false,code:'out-of-range',range:{maxConnectionDistance:140},lines:[line],stations,handles:[{kind:'from',x:0,z:0},{kind:'to',x:0,z:20}]};
  art.preview(result,{cities,sourceCityId:'home',targetCityId:'other',visible:true,editable:true});art.update({mapBlend:1});
  for(const root of [art.root,art.mapRoot]){
    const range=root.getObjectByName('railway-connection-range'),selection=root.getObjectByName('railway-city-targets');
    assert.ok(range.visible);assert.equal(range.material.color.getHexString(),'5db6a5');assert.equal(selection.count,2);
    const color=new THREE.Color();selection.getColorAt(0,color);assert.equal(color.getHexString(),'5db6a5');selection.getColorAt(1,color);assert.equal(color.getHexString(),'ee7666');
    assert.equal(root.getObjectByName('railway-route-preview').visible,false);assert.equal(root.getObjectByName('blocked-railway-guide').visible,false);assert.equal(root.getObjectByName('railway-handle-rims').count,0);
  }
});

test('unchanged city and range boundaries retain buffers while size changes reuse the same pool',t=>{
  const {art}=fixture(t),options={cities,sourceCityId:'home',targetCityId:'other',maxConnectionDistance:140,visible:true};art.preview(null,options);
  const city=art.root.getObjectByName('railway-city-targets'),range=art.root.getObjectByName('railway-connection-range'),geometry=city.geometry,cityVersion=city.instanceMatrix.version,rangeVersion=range.instanceMatrix.version;
  for(let i=0;i<20;i++)art.preview(null,options);
  assert.equal(city.instanceMatrix.version,cityVersion);assert.equal(range.instanceMatrix.version,rangeVersion);assert.equal(city.geometry,geometry);assert.equal(range.geometry,geometry);
  art.preview(null,{...options,cities:[{...cities[0],radius:31},cities[1]],maxConnectionDistance:180});
  assert.equal(city.geometry,geometry);assert.equal(range.geometry,geometry);assert.ok(city.instanceMatrix.version>cityVersion);assert.ok(range.instanceMatrix.version>rangeVersion);
  art.preview(null,{visible:false});art.update();assert.equal(city.visible,false);assert.equal(range.visible,false);
});

test('map line widths are camera-driven uniforms while detailed geometry never changes across zoom modes',t=>{
  const {art}=fixture(t);art.sync(snapshot);const mapMesh=art.mapRoot.getObjectByName('built-map-railway-network').children[0],geometry=mapMesh.geometry;
  const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <alphatest_fragment>\n#include <opaque_fragment>'};mapMesh.material.onBeforeCompile(shader,{});
  assert.ok(shader.uniforms.railwayWidthScale);assert.ok(shader.vertexShader.includes('railwayOffset'));
  const camera=new THREE.OrthographicCamera(-100,100,100,-100,.1,1000);camera.position.set(0,100,0);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  art.update({camera,mapBlend:1,viewportHeight:800,zoom:1});assert.equal(art.root.visible,false);assert.equal(art.mapRoot.visible,true);assert.ok(shader.uniforms.railwayWidthScale.value>1);
  assert.equal(mapMesh.geometry,geometry);art.update({camera,mapBlend:0,zoom:.4});assert.equal(art.root.visible,true);assert.equal(art.mapRoot.visible,false);assert.equal(shader.uniforms.mapNetworkVisibility.value,0);
});

test('blocked alignments still display a clearly dashed red guide between selected cities',t=>{
  const {art}=fixture(t);art.preview({valid:false,lines:[],stations:[],fromCityId:'home',toCityId:'other'},{cities,sourceCityId:'home',targetCityId:'other',visible:true});
  for(const root of [art.root,art.mapRoot]){const guide=root.getObjectByName('blocked-railway-guide');assert.ok(guide.visible);assert.ok(guide.material.isLineDashedMaterial);assert.ok(guide.geometry.attributes.lineDistance);assert.ok(guide.geometry.attributes.position.array.every(Number.isFinite));}
  art.preview(null,{cities,visible:false});assert.equal(art.root.getObjectByName('blocked-railway-guide').visible,false);assert.equal(art.root.getObjectByName('blocked-railway-guide').geometry.drawRange.count,0);
});

test('preview uses two restrained outline and ink rail layers with a pixel width floor',t=>{
  const {art}=fixture(t);art.preview({valid:true,lines:[line],stations:[]},{cities,visible:true});
  const pool=art.root.getObjectByName('railway-preview'),core=pool.getObjectByName('railway-route-preview');
  const layers=pool.children.filter(mesh=>mesh.isMesh&&mesh.visible);
  assert.equal(layers.length,2);assert.equal(new Set(layers.map(mesh=>mesh.geometry)).size,1,'outline and rails share the uploaded route');
  assert.equal(pool.getObjectByName('railway-invalid-bend-glow').visible,false,'valid routes have no broad halo');
  const widths=[],pixels=[];
  for(const layer of layers){
    assert.ok(layer.material.isMeshBasicMaterial);assert.equal(layer.material.toneMapped,false);assert.equal(layer.material.depthTest,false);assert.equal(layer.material.depthWrite,false);assert.equal(layer.material.fog,false);assert.equal(layer.material.forceSinglePass,true);
    const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>'};layer.material.onBeforeCompile(shader);
    assert.ok(shader.vertexShader.includes('previewClip.w'));assert.ok(shader.fragmentShader.includes('smoothstep'));
    assert.ok(!shader.fragmentShader.includes('worldNight'),'night lighting cannot dim the construction overlay');
    widths.push(shader.uniforms.previewHalfWidth.value);pixels.push(shader.uniforms.previewPixels.value);
    art.update({viewportHeight:1100});assert.equal(shader.uniforms.previewViewport.value,1100);
  }
  assert.ok(widths.every((width,i)=>!i||width<widths[i-1]));assert.ok(pixels.every((width,i)=>!i||width<pixels[i-1]));
  assert.ok(Math.max(...pixels)<=4);assert.equal(core.material.color.getHexString(),'243d39');assert.equal(layers[0].material.color.getHexString(),'eee9d5');
  const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>'};core.material.onBeforeCompile(shader);
  assert.ok(shader.fragmentShader.includes('railMask'));assert.ok(shader.fragmentShader.includes('sleeperMask'));assert.ok(shader.fragmentShader.includes('fwidth(vPreviewDistance)'),'distant sleepers fade before they alias');
  assert.ok(core.geometry.attributes.previewDistance);
});

test('pending validation uses normal ink rails and only a geometric blocking result turns the route red',t=>{
  const {art}=fixture(t),options={cities,sourceCityId:'home',targetCityId:'other',visible:true,editable:true},handles=[{x:0,z:0,kind:'from'},{x:0,z:20,kind:'to'}];
  art.preview({valid:false,provisional:true,lines:[line],stations,handles},options);
  const core=art.root.getObjectByName('railway-route-preview'),target=new THREE.Color(),endpoint=new THREE.Color();
  assert.equal(core.material.color.getHexString(),'243d39');
  art.root.getObjectByName('railway-city-targets').getColorAt(1,target);art.root.getObjectByName('railway-handle-centres').getColorAt(0,endpoint);
  for(const value of [target,endpoint])assert.equal(value.getHexString(),'5db6a5');
  art.preview({valid:false,siteValid:false,provisional:false,lines:[line],stations,handles},options);assert.equal(core.material.color.getHexString(),'ee7666');
  art.root.getObjectByName('railway-city-targets').getColorAt(1,target);art.root.getObjectByName('railway-handle-centres').getColorAt(0,endpoint);
  assert.ok(target.r>target.g&&endpoint.r>endpoint.g);
});

test('unaffordable routes never turn red, including after validation and wallet changes',t=>{
  const {art}=fixture(t),options={cities,sourceCityId:'home',targetCityId:'other',visible:true,editable:true};
  const handles=[{x:0,z:0,kind:'from'},{x:0,z:20,kind:'to'}],result={valid:true,siteValid:true,affordable:true,lines:[line],stations,handles};
  art.preview(result,options);
  const route=art.root.getObjectByName('railway-route-preview'),station=art.root.getObjectByName('railway-station-preview'),target=new THREE.Color(),endpoint=new THREE.Color();
  const color=route.material.color.clone(),platformColor=station.material.color.clone();
  for(const provisional of [true,false]){
    art.preview({...result,valid:false,affordable:false,code:'not-enough-gold',provisional},options);
    assert.ok(route.material.color.equals(color));assert.ok(station.material.color.equals(platformColor));
    art.root.getObjectByName('railway-city-targets').getColorAt(1,target);art.root.getObjectByName('railway-handle-centres').getColorAt(0,endpoint);
    assert.equal(target.getHexString(),'5db6a5');assert.equal(endpoint.getHexString(),'5db6a5');assert.equal(art.root.getObjectByName('railway-invalid-bend-glow').visible,false);
  }
  art.preview({...result,valid:false,siteValid:undefined,affordable:false},options);assert.ok(route.material.color.equals(color),'missing site validity is pending, never a financial geometry error');
});

test('operational validation failures and wallet errors cannot mark a feasible draft red',t=>{
  const {art}=fixture(t),options={cities,sourceCityId:'home',targetCityId:'other',visible:true,editable:true};
  const handles=[{kind:'from',x:0,z:0},{kind:'to',x:0,z:20}],result={valid:false,siteValid:false,lines:[line],stations,handles};
  for(const code of ['planning-failed','world-changed','not-enough-gold']){
    art.preview({...result,code},options);
    assert.equal(art.root.getObjectByName('railway-route-preview').material.color.getHexString(),'243d39');
    assert.equal(art.root.getObjectByName('railway-invalid-bend-glow').visible,false);
    const color=new THREE.Color();art.root.getObjectByName('railway-city-targets').getColorAt(1,color);assert.equal(color.getHexString(),'5db6a5');
    art.root.getObjectByName('railway-handle-centres').getColorAt(0,color);assert.equal(color.getHexString(),'5db6a5');
  }
  art.preview({...result,code:'route-blocked'},options);assert.equal(art.root.getObjectByName('railway-route-preview').material.color.getHexString(),'ee7666','actual impossibility still produces red feedback');
});

test('a bad bend highlights only its local span and handle while the rest of the railway remains normal',t=>{
  const {art}=fixture(t),options={cities,sourceCityId:'home',targetCityId:'other',visible:true,editable:true};
  const handles=[{kind:'from',x:0,z:0},{kind:'bend',index:0,x:0,z:5},{kind:'bend',index:1,x:0,z:10},{kind:'to',x:0,z:20}];
  const invalidBends=[{index:1,x:0,z:10,reason:'radius',points:[{x:0,y:.42,z:8},{x:.3,y:.42,z:10},{x:0,y:.42,z:12}]}];
  const result={valid:false,siteValid:false,provisional:true,lines:[{...line,previewOnly:true}],stations,handles,invalidBends};art.preview(result,options);
  const route=art.root.getObjectByName('railway-route-preview'),highlight=art.root.getObjectByName('railway-invalid-bend-glow'),geometry=highlight.geometry,allocations=art.stats.previewBufferAllocations;
  assert.equal(route.material.color.getHexString(),'243d39');assert.ok(highlight.visible);assert.equal(highlight.material.color.getHexString(),'ee7666');
  const positions=geometry.attributes.position;for(let i=0;i<geometry.drawRange.count;i++)assert.ok(positions.getZ(i)>=8&&positions.getZ(i)<=12,'red feedback cannot spill over the full route');
  const color=new THREE.Color(),pins=art.root.getObjectByName('railway-handle-pins');
  pins.getColorAt(1,color);assert.equal(color.getHexString(),'5db6a5');pins.getColorAt(2,color);assert.equal(color.getHexString(),'ee7666');
  art.root.getObjectByName('railway-handle-centres').getColorAt(0,color);assert.equal(color.getHexString(),'5db6a5');
  art.root.getObjectByName('railway-city-targets').getColorAt(1,color);assert.equal(color.getHexString(),'5db6a5');
  for(let frame=0;frame<60;frame++){invalidBends[0].points[1].x=frame*.01;art.preview({...result},options);assert.equal(highlight.geometry,geometry);}
  assert.equal(art.stats.previewBufferAllocations,allocations);
  art.preview({...result,valid:true,siteValid:true,invalidBends:[]},options);assert.equal(highlight.visible,false);assert.equal(highlight.geometry.drawRange.count,0);
});

test('a tight station approach marks its endpoint without blaming a distant interior bend',t=>{
  const {art}=fixture(t),handles=[{kind:'from',x:0,z:0},{kind:'bend',index:0,x:0,z:10},{kind:'to',x:0,z:20}];
  const result={valid:false,siteValid:false,lines:[line],stations:[],handles,
    invalidBends:[{handleKind:'from',reason:'radius',points:[{x:0,y:.42,z:0},{x:.3,y:.42,z:1},{x:0,y:.42,z:2}]}]};
  art.preview(result,{visible:true,editable:true});
  const color=new THREE.Color();
  for(const root of [art.root,art.mapRoot]){
    const centres=root.getObjectByName('railway-handle-centres'),pins=root.getObjectByName('railway-handle-pins');
    centres.getColorAt(0,color);assert.equal(color.getHexString(),'ee7666');
    centres.getColorAt(2,color);assert.equal(color.getHexString(),'5db6a5');
    pins.getColorAt(1,color);assert.equal(color.getHexString(),'5db6a5');
    const highlight=root.getObjectByName('railway-invalid-bend-glow'),positions=highlight.geometry.attributes.position;
    for(let i=0;i<highlight.geometry.drawRange.count;i++)assert.ok(positions.getZ(i)<=2,'warning stays at the failed approach');
  }
  art.preview({...result,valid:true,siteValid:true,invalidBends:[]},{visible:true,editable:true});
  art.root.getObjectByName('railway-handle-centres').getColorAt(0,color);assert.equal(color.getHexString(),'5db6a5','endpoint warning clears after repair');
});

test('endpoint rings follow snapped model handles even when a caller supplies raw drag coordinates',t=>{
  const {art}=fixture(t),handles=[{kind:'from',x:2,z:3},{kind:'to',x:4,z:20}];
  art.preview({valid:true,siteValid:true,lines:[line],stations:[],handles},{visible:true,editable:true,handles:handles.map(handle=>({...handle,x:90,z:90})),activeHandle:0});
  const camera=new THREE.OrthographicCamera(-100,100,100,-100,.1,1000);camera.position.set(0,100,0);camera.lookAt(0,0,0);art.update({camera});
  for(const root of [art.root,art.mapRoot]){
    const matrix=new THREE.Matrix4();root.getObjectByName('railway-handle-rims').getMatrixAt(0,matrix);assert.equal(matrix.elements[12],2);assert.equal(matrix.elements[14],3);
  }
});

test('an impossible provisional alignment is already red before worker validation',t=>{
  const {art}=fixture(t),options={cities,sourceCityId:'home',targetCityId:'other',visible:true},pending={valid:false,siteValid:true,provisional:true,lines:[line],stations:[]};
  art.preview(pending,options);assert.equal(art.root.getObjectByName('railway-route-preview').material.color.getHexString(),'243d39');
  art.preview({...pending,siteValid:false,lines:[],code:'invalid-alignment'},options);
  const guide=art.root.getObjectByName('blocked-railway-guide'),target=new THREE.Color();
  assert.ok(guide.visible);assert.ok(guide.material.color.r>guide.material.color.g);
  assert.equal(art.root.getObjectByName('railway-route-preview').visible,true);assert.equal(art.root.getObjectByName('railway-route-preview').material.color.getHexString(),'ee7666');
  art.root.getObjectByName('railway-city-targets').getColorAt(1,target);assert.ok(target.r>target.g);
});

test('impossible placements keep a restrained red outlined guide attached to model endpoints',t=>{
  const {art}=fixture(t),options={cities,sourceCityId:'home',targetCityId:'other',visible:true};
  const handles=[{kind:'from',x:31,z:12},{kind:'bend',x:36,z:20},{kind:'to',x:42,z:17}],attachments={from:{x:29,z:13},to:{x:40,z:18}};
  const result={valid:false,siteValid:false,provisional:true,lines:[],stations:[],handles,attachments,waypoints:[handles[1]]};art.preview(result,options);
  for(const root of [art.root,art.mapRoot]){
    const core=root.getObjectByName('railway-route-preview'),guide=root.getObjectByName('blocked-railway-guide'),positions=core.geometry.attributes.position,last=core.geometry.drawRange.count-1;
    assert.ok(core.visible&&guide.visible);assert.equal(core.material.color.getHexString(),'ee7666');assert.equal(root.getObjectByName('railway-invalid-bend-glow').visible,false);
    assert.equal(positions.getX(0),31);assert.equal(positions.getZ(0),12);assert.equal(positions.getX(last),42);assert.equal(positions.getZ(last),17);
    assert.equal(guide.geometry.attributes.position.getX(0),31);assert.equal(guide.geometry.attributes.position.getX(guide.geometry.drawRange.count-1),42);
    assert.ok(Array.from({length:guide.geometry.drawRange.count},(_,i)=>guide.geometry.attributes.position.getX(i)).includes(36),'the failed corridor still passes through the requested bend');
  }
  const core=art.root.getObjectByName('railway-route-preview'),geometry=core.geometry,allocations=art.stats.previewBufferAllocations;
  art.preview({...result,handles:undefined},options);assert.equal(core.geometry.attributes.position.getX(0),29,'attachment coordinates precede the city-center fallback');
  art.preview({valid:true,lines:[line],stations:[]},options);assert.equal(core.geometry,geometry);assert.equal(art.stats.previewBufferAllocations,allocations);assert.equal(art.root.getObjectByName('blocked-railway-guide').visible,false);
});

test('continuous route dragging updates pooled buffers and station poses without replacing any meshes or allocations',t=>{
  const {art}=fixture(t);art.sync(snapshot);
  const points=Array.from({length:240},(_,i)=>({x:Math.sin(i/239*Math.PI)*3,y:.42,z:i/239*20}));
  const liveLine={...line,points},result={valid:false,provisional:true,lines:[liveLine],stations:stations.map(item=>({...item}))},options={cities,sourceCityId:'home',targetCityId:'other',visible:true};
  art.preview(result,options);
  const pools=[art.root.getObjectByName('railway-preview'),art.mapRoot.getObjectByName('map-railway-preview')],children=pools.map(pool=>[...pool.children]);
  const routes=pools.map(pool=>pool.getObjectByName('railway-route-preview')),geometries=routes.map(route=>route.geometry),arrays=geometries.map(geometry=>geometry.attributes.position.array);
  const allocations=art.stats.previewBufferAllocations,rebuilds=art.stats.rebuilds,committed=art.meshes.map(mesh=>mesh.geometry),platform=pools[0].getObjectByName('railway-station-preview');
  let disposals=0;for(const geometry of geometries)geometry.addEventListener('dispose',()=>disposals++);
  for(let frame=0;frame<120;frame++){
    points[80].x=frame*.01;result.stations[0].x=-2.5+frame*.02;art.preview({...result},options);
    for(let i=0;i<pools.length;i++){assert.deepEqual(pools[i].children,children[i]);assert.equal(routes[i].geometry,geometries[i]);assert.equal(routes[i].geometry.attributes.position.array,arrays[i]);}
  }
  assert.equal(disposals,0);assert.equal(art.stats.previewBufferAllocations,allocations);assert.equal(art.stats.rebuilds,rebuilds);assert.deepEqual(art.meshes.map(mesh=>mesh.geometry),committed);
  assert.ok(Math.abs(platform.matrix.elements[12]-(-2.5+119*.02))<1e-7);
  assert.ok(Math.abs(geometries[0].attributes.position.getX(79*6+1)-1.19)<1e-7);
  assert.equal(geometries[0].drawRange.count,239*6);assert.equal(geometries[0].attributes.position.usage,THREE.DynamicDrawUsage);
  art.preview({valid:true,lines:[line],stations:[]},options);assert.equal(routes[0].geometry,geometries[0]);assert.equal(geometries[0].drawRange.count,6);assert.equal(platform.visible,false);
});

test('an unchanged provisional result never rewrites or uploads pooled geometry while validation is pending',t=>{
  const {art}=fixture(t),options={cities,visible:true,editable:true},result={valid:true,siteValid:true,provisional:true,lines:[line],stations,handles:[{kind:'from',x:0,z:0},{kind:'to',x:0,z:20}]};
  art.preview(result,options);
  const geometries=new Set();for(const root of [art.root,art.mapRoot])root.traverse(mesh=>{if(mesh.geometry)geometries.add(mesh.geometry);});
  const versions=[...geometries].flatMap(geometry=>Object.values(geometry.attributes).map(attribute=>[attribute,attribute.version]));
  const updates=art.stats.previewUpdates,allocations=art.stats.previewBufferAllocations;
  for(let i=0;i<120;i++)art.preview(result,{...options,activeHandle:i%2});
  assert.equal(art.stats.previewUpdates,updates);assert.equal(art.stats.previewBufferAllocations,allocations);
  for(const [attribute,version]of versions)assert.equal(attribute.version,version,'idle geometry retains its GPU version');
  art.preview(result,{...options,visible:false});assert.equal(art.root.getObjectByName('railway-preview').visible,false,'visibility still responds independently of geometry identity');
  art.preview({...result},options);assert.equal(art.stats.previewUpdates,updates+1,'a changed geometry key publishes a new result and updates the same pools');
});

test('adjacent curved preview segments share their edge vertices so the track outline has no seams',t=>{
  const {art}=fixture(t),points=[{x:0,y:.42,z:0},{x:3,y:.42,z:3},{x:3,y:.42,z:6}];
  art.preview({valid:true,lines:[{...line,points}],stations:[]},{visible:true});
  for(const root of [art.root,art.mapRoot]){
    const geometry=root.getObjectByName('railway-route-preview').geometry;
    for(const name of ['position','previewOffset'])for(let component=0;component<3;component++){
      const array=geometry.attributes[name].array;assert.equal(array[1*3+component],array[6*3+component]);assert.equal(array[5*3+component],array[8*3+component]);
    }
  }
});

test('all fourteen handles stay screen-sized, endpoints have larger outlined rings and the active point enlarges',t=>{
  const {art}=fixture(t),handles=Array.from({length:15},(_,i)=>({x:i,z:0,kind:i===0?'from':i===13?'to':'waypoint'}));
  art.preview({valid:true,lines:[line],stations:[],handles},{cities,visible:true,editable:true,activeHandle:4});
  const camera=new THREE.OrthographicCamera(-100,100,100,-100,.1,1000);camera.position.set(0,100,0);camera.lookAt(0,0,0);
  art.update({camera,viewportHeight:800});const matrix=new THREE.Matrix4(),radii=[];
  for(const root of [art.root,art.mapRoot]){
    const rims=root.getObjectByName('railway-handle-rims'),centres=root.getObjectByName('railway-handle-centres'),pins=root.getObjectByName('railway-handle-pins');
    for(const mesh of [rims,centres,pins])assert.equal(mesh.count,14);
    for(let i=0;i<14;i++){rims.getMatrixAt(i,matrix);radii[i]=new THREE.Vector3().setFromMatrixScale(matrix).x;}
    assert.ok(radii[0]>radii[1]);assert.equal(radii[0],radii[13]);assert.ok(radii[4]>radii[3]);
    rims.getMatrixAt(0,matrix);const radius=new THREE.Vector3().setFromMatrixScale(matrix).x;centres.getMatrixAt(0,matrix);assert.ok(new THREE.Vector3().setFromMatrixScale(matrix).x<radius,'endpoint center leaves a visible outer ring');
    assert.ok(Math.abs(radii[1]-.25*9.6)<1e-6,'radius stays at the requested pixels');
  }
  art.preview(null,{visible:false});assert.equal(art.root.getObjectByName('railway-handle-rims').count,0);
});

test('larger route buffers grow only when necessary and every shared ghost geometry disposes once',t=>{
  const {art}=fixture(t),points=Array.from({length:1800},(_,i)=>({x:i*.02,y:.42,z:i*.1})),options={cities,visible:true};
  art.preview({valid:true,lines:[{...line,points}],stations},options);
  const core=art.root.getObjectByName('railway-route-preview'),identity=core.geometry,allocations=art.stats.previewBufferAllocations;
  assert.ok(identity.attributes.position.count>=1799*6);assert.equal(identity.drawRange.count,1799*6);
  art.preview({valid:true,lines:[line],stations},options);assert.equal(core.geometry,identity);assert.equal(art.stats.previewBufferAllocations,allocations);
  const geometries=new Set();for(const root of [art.root,art.mapRoot])root.traverse(mesh=>{if(mesh.geometry)geometries.add(mesh.geometry);});
  const counts=new Map();for(const geometry of geometries){counts.set(geometry,0);geometry.addEventListener('dispose',()=>counts.set(geometry,counts.get(geometry)+1));}
  art.dispose();for(const count of counts.values())assert.equal(count,1);
});

test('revision replacement and disposal release owned batches without disposing shared palette materials',t=>{
  const {art,parent,mapParent}=fixture(t);let sharedDisposals=0,geometryDisposals=0,bakedDisposals=0;
  const shared=()=>sharedDisposals++;M.gravel.addEventListener('dispose',shared);M.window.addEventListener('dispose',shared);t.after(()=>{M.gravel.removeEventListener('dispose',shared);M.window.removeEventListener('dispose',shared);});
  art.sync(snapshot);const mesh=art.meshes[0];mesh.geometry.addEventListener('dispose',()=>geometryDisposals++);mesh.material.addEventListener('dispose',()=>bakedDisposals++);
  art.sync({...snapshot,revision:2});assert.equal(geometryDisposals,1);assert.equal(bakedDisposals,1);
  art.preview({valid:true,lines:[line],stations},{cities,visible:true});art.dispose();art.dispose();art.update({mapBlend:1});
  assert.equal(parent.children.length,0);assert.equal(mapParent.children.length,0);assert.equal(sharedDisposals,0);
  assert.equal(art.sync({...snapshot,revision:3}),false);
});


test('directed rail arrows follow the travel tangent on built spines and live previews',t=>{
  const art=createSettlementRailwayArt(new THREE.Group(),new THREE.Group(),{...world,gameplay:{economy:'loops'}});t.after(()=>art.dispose());
  art.sync(snapshot);art.preview({valid:true,lines:[line],stations:[]},{visible:true});
  const matrix=new THREE.Matrix4(),direction=new THREE.Vector3(0,0,1);
  for(const root of [art.root,art.mapRoot])for(const name of ['railway-direction-arrows','railway-preview-direction-arrows']){
    const arrows=root.getObjectByName(name);assert.ok(arrows.visible);assert.equal(arrows.count,1);arrows.getMatrixAt(0,matrix);
    assert.equal(matrix.elements[12],0);assert.equal(matrix.elements[14],10);const forward=direction.clone().transformDirection(matrix);assert.ok(forward.z>.9999);
  }
  const arrows=art.root.getObjectByName('railway-preview-direction-arrows'),geometry=arrows.geometry;
  for(let i=0;i<20;i++)art.preview({valid:true,lines:[line],stations:[]},{visible:true});assert.equal(arrows.geometry,geometry);
  art.preview(null,{visible:false});assert.equal(arrows.count,0);
});


test('direction overlays fade out for third person without hiding or rebuilding physical rails',t=>{
  const art=createSettlementRailwayArt(new THREE.Group(),new THREE.Group(),{...world,gameplay:{economy:'loops'}});t.after(()=>art.dispose());
  art.sync(snapshot);art.preview({valid:true,lines:[line],stations:[]},{visible:true});
  const rails=art.root.getObjectByName('built-railway-network'),railMeshes=[...rails.children],railGeometry=railMeshes.map(mesh=>mesh.geometry);
  const arrows=[art.root,art.mapRoot].flatMap(root=>['railway-direction-arrows','railway-preview-direction-arrows'].map(name=>root.getObjectByName(name)));
  const geometry=arrows.map(batch=>batch.geometry),versions=arrows.map(batch=>batch.instanceMatrix.version),counts=arrows.map(batch=>batch.count),rebuilds=art.stats.rebuilds;
  for(const mapBlend of [0,.5,1]){
    art.update({mapBlend,walkingWeight:0});
    assert.ok(arrows.every(batch=>batch.visible&&batch.material.opacity===1));
    art.update({mapBlend,walkingWeight:.4});
    const halfway=arrows[0].material.opacity;assert.ok(halfway>0&&halfway<1);assert.ok(arrows.every(batch=>batch.visible&&batch.material.opacity===halfway));
    art.update({mapBlend,walkingWeight:.85});assert.ok(arrows.every(batch=>!batch.visible&&batch.material.opacity===0));
    art.update({mapBlend,walkingWeight:1});assert.ok(arrows.every(batch=>!batch.visible));
    assert.equal(art.root.visible,mapBlend<.999);assert.equal(art.mapRoot.visible,mapBlend>.001);
    assert.equal(rails.visible,true);assert.deepEqual(rails.children,railMeshes);assert.deepEqual(railMeshes.map(mesh=>mesh.geometry),railGeometry);
    art.update({mapBlend,walkingWeight:.4});assert.ok(arrows.every(batch=>batch.visible&&batch.material.opacity===halfway));
    art.update({mapBlend,walkingWeight:0});assert.ok(arrows.every(batch=>batch.visible&&batch.material.opacity===1));
  }
  assert.deepEqual(arrows.map(batch=>batch.geometry),geometry);assert.deepEqual(arrows.map(batch=>batch.instanceMatrix.version),versions);
  assert.deepEqual(arrows.map(batch=>batch.count),counts);assert.equal(art.stats.rebuilds,rebuilds);
});

test('committed revisions and changed previews cannot flash direction arrows while walking',t=>{
  const art=createSettlementRailwayArt(new THREE.Group(),new THREE.Group(),{...world,gameplay:{economy:'loops'}});t.after(()=>art.dispose());
  art.update({walkingWeight:1});art.sync(snapshot);art.preview({valid:true,lines:[line],stations:[]},{visible:true});
  const batches=()=>[art.root,art.mapRoot].flatMap(root=>['railway-direction-arrows','railway-preview-direction-arrows'].map(name=>root.getObjectByName(name)));
  assert.ok(batches().every(batch=>batch.count>0&&!batch.visible));
  art.sync({...snapshot,revision:2});art.preview({valid:true,lines:[{...line,id:'changed'}],stations:[]},{visible:true});
  assert.ok(batches().every(batch=>batch.count>0&&!batch.visible));
  art.update({walkingWeight:0});assert.ok(batches().every(batch=>batch.visible));
});

test('station port affordances match canonical spine ends and exist only during strategy railway planning',t=>{
  const art=createSettlementRailwayArt(new THREE.Group(),new THREE.Group(),{...world,gameplay:{economy:'loops'}});t.after(()=>art.dispose());
  const station={...stations[0],lineId:line.id};art.sync({...snapshot,stations:[station]});
  const batches=[art.root,art.mapRoot].map(root=>root.getObjectByName('railway-station-ports'));
  assert.ok(batches.every(mesh=>mesh.count===2&&!mesh.visible));
  art.preview(null,{visible:true});
  const matrix=new THREE.Matrix4(),geometry=batches[0].geometry,versions=batches.map(mesh=>mesh.instanceMatrix.version);
  for(const mesh of batches){
    assert.ok(mesh.visible);assert.equal(mesh.material.depthTest,false);assert.equal(mesh.material.color.getHexString(),'f4e6b0');
    for(const [index,z]of [[0,0],[1,20]]){mesh.getMatrixAt(index,matrix);assert.equal(matrix.elements[12],0);assert.equal(matrix.elements[14],z);}
    assert.deepEqual(mesh.userData.ports.map(port=>[port.stationId,port.cityId,port.role,port.x,port.z]),[
      ['station-home','home','entry',0,0],['station-home','home','exit',0,20],
    ]);
    const shader={uniforms:{},vertexShader:'#include <begin_vertex>'};mesh.material.onBeforeCompile(shader);
    assert.ok(shader.uniforms.portViewport);assert.match(shader.vertexShader,/portUnit/,'ports retain a modest pixel radius when zoomed out');
  }
  for(const walkingWeight of [0,.4,1,.4,0]){
    art.update({mapBlend:.5,walkingWeight});assert.ok(batches.every(mesh=>mesh.visible===(walkingWeight<.85)));
  }
  assert.equal(batches[0].geometry,geometry);assert.equal(batches[1].geometry,geometry);
  assert.deepEqual(batches.map(mesh=>mesh.instanceMatrix.version),versions,'camera transitions do not rewrite static port positions');
  art.preview(null,{visible:false});assert.ok(batches.every(mesh=>!mesh.visible));
  art.update({walkingWeight:1});art.sync({...snapshot,revision:2,stations:[station]});art.preview(null,{visible:true});
  assert.ok(batches.every(mesh=>!mesh.visible),'new station geometry cannot flash its ports in third person');
});

test('the owning city range stays anchored while a return route starts at a foreign station',t=>{
  const {art}=fixture(t),owned={...cities[0],x:-37,z:12},foreign={...cities[1],x:42,z:-16};
  art.preview(null,{cities:[owned,foreign],sourceCityId:foreign.id,targetCityId:owned.id,rangeCityId:owned.id,maxConnectionDistance:140,visible:true});
  const matrix=new THREE.Matrix4();
  for(const root of [art.root,art.mapRoot]){
    const range=root.getObjectByName('railway-connection-range'),selected=root.getObjectByName('railway-city-targets');
    range.getMatrixAt(0,matrix);assert.equal(matrix.elements[12],owned.x);assert.equal(matrix.elements[14],owned.z);assert.equal(new THREE.Vector3().setFromMatrixScale(matrix).x,140);
    assert.equal(selected.count,2);selected.getMatrixAt(0,matrix);assert.equal(matrix.elements[12],foreign.x);assert.equal(matrix.elements[14],foreign.z);
    selected.getMatrixAt(1,matrix);assert.equal(matrix.elements[12],owned.x);assert.equal(matrix.elements[14],owned.z);
  }
  art.preview(null,{cities:[owned,foreign],sourceCityId:foreign.id,rangeCityId:owned.id,maxConnectionDistance:140,visible:true});
  art.root.getObjectByName('railway-connection-range').getMatrixAt(0,matrix);assert.equal(matrix.elements[12],owned.x);
  art.preview(null,{cities:[owned,foreign],sourceCityId:foreign.id,rangeCityId:foreign.id,maxConnectionDistance:140,visible:true});
  art.root.getObjectByName('railway-connection-range').getMatrixAt(0,matrix);assert.equal(matrix.elements[12],foreign.x,'changing only the range anchor refreshes its placement');
});


test('station access paths stay in detailed scenery without appearing as map railways',t=>{
  const {art}=fixture(t),paths=[{id:'station-path',width:.7,points:[{x:-8,z:3},{x:-2.5,z:3}]}];
  art.sync({...snapshot,paths});
  const network=art.root.getObjectByName('built-railway-network'),map=art.mapRoot.getObjectByName('built-map-railway-network');
  assert.equal(map.children.length,2,'only the two route casing/ink batches remain in the map');
  assert.ok(network.children.some(mesh=>mesh.material?.userData?.sceneStyle==='street'||mesh.material?.name==='street-surface'||mesh.geometry?.attributes?.position?.count>0));
  const withPaths=network.children.reduce((total,mesh)=>total+(mesh.geometry?.attributes.position.count??0),0);
  art.sync({...snapshot,revision:2,paths:[]});
  assert.ok(withPaths>network.children.reduce((total,mesh)=>total+(mesh.geometry?.attributes.position.count??0),0),'detailed access path geometry is retained');
});
