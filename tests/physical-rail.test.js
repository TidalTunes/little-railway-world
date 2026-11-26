import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Matrix4,Vector3} from 'three';
import {sampleAlignmentPoints,sampleAlignment} from '../src/alignments.js';
import {physicalLineMetric,physicalDistanceAtChart,chartDistanceAtPhysical,chartTurnRadius,createSurfaceAlignment} from '../src/physical-route.js';
import {buildRailways,makeTrains} from '../src/railway.js';
import {createNetworkTraffic,sampleNetworkPath} from '../src/network-traffic.js';
import {surfacePoint,surfaceTangent,warpGeometryToSurface} from '../src/world-surface.js';
import {physicalRailPoint} from '../src/physical-rail-geometry.js';
import {tunnelCutter} from '../src/geography.js';
import {M} from '../src/palette.js';

const radius=1600;
const spherical=()=>({surface:{type:'sphere',radius,origin:{longitude:0,latitude:0},projection:{type:'equirectangular',radius,centralLongitude:0,centralLatitude:0}}});
function straight(latitude,angle=0,length=50){
  const z=-latitude*Math.PI/180*radius,dx=Math.sin(angle)*length,dz=Math.cos(angle)*length;
  return{id:'line',from:'a',to:'b',length,points:[{x:0,y:.42,z},{x:dx,y:.42,z:z+dz}],distances:[0,length],bridges:[],tunnels:[]};
}
const near=(actual,expected,tolerance=1e-4)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≈ ${expected}`);
const column=(matrix,index)=>new Vector3().setFromMatrixColumn(matrix,index);

test('surface route metric measures physical travel and has a stable inverse at every heading',()=>{
  for(const latitude of [0,30,60,75])for(const angle of [0,Math.PI/4,Math.PI/2]){
    const world=spherical(),line=straight(latitude,angle),metric=physicalLineMetric(world,line);
    assert.equal(physicalLineMetric(world,{...line}),metric,'streamed line copies reuse immutable route data');
    for(let s=0;s<=line.length;s+=.173)near(chartDistanceAtPhysical(metric,physicalDistanceAtChart(metric,s)),s,1e-7);
    if(angle===Math.PI/2)near(metric.length,line.length*Math.cos(latitude*Math.PI/180)*(radius+.42)/radius,1e-8);
    assert.equal(line.length,50,'geographic route distance remains authored');
  }
});

test('globe sleepers, rail gauge and ballast retain their physical dimensions at all latitudes and headings',()=>{
  for(const latitude of [0,60,75])for(const angle of [0,Math.PI/4,Math.PI/2]){
    const line=straight(latitude,angle),world={...spherical(),lines:[line],river:{y:-1.2}},chart=new Group(),surfaceRoot=new Group();
    buildRailways(chart,world,{surfaceRoot});surfaceRoot.updateMatrixWorld(true);
    assert.equal(chart.children.length,0,'spherical rails bypass the geographic mesh warp');
    const rails=surfaceRoot.children.filter(mesh=>mesh.material===M.rail),sleepers=surfaceRoot.children.filter(mesh=>mesh.material===M.timber);
    assert.equal(rails.length,2);assert.ok(sleepers.length>3);
    for(const mesh of sleepers){near(column(mesh.matrixWorld,0).length(),1.56,1e-8);near(column(mesh.matrixWorld,1).length(),.10,1e-8);near(column(mesh.matrixWorld,2).length(),.23,1e-8);}
    const a=rails[0].geometry.attributes.position,b=rails[1].geometry.attributes.position;
    for(let i=0;i<a.count;i+=4){
      const center=attribute=>new Vector3().fromBufferAttribute(attribute,i+2).add(new Vector3().fromBufferAttribute(attribute,i+3)).multiplyScalar(.5);
      near(center(a).distanceTo(center(b)),.92,2e-4);
      near(new Vector3().fromBufferAttribute(a,i+2).distanceTo(new Vector3().fromBufferAttribute(a,i+3)),.095,2e-4);
    }
    for(let i=1;i<sleepers.length;i++)near(sleepers[i].position.distanceTo(sleepers[i-1].position),.85,2e-4);
  }
});

function circleWorld(latitude){
  const world={...spherical(),lines:[],cities:[],transitions:[],junctions:[],traffic:{trainCount:4}},center={x:0,z:-latitude*Math.PI/180*radius},r=130;
  for(let i=0;i<4;i++){
    const theta=i*Math.PI/2,length=r*Math.PI/2,id=`line-${i}`;
    const start={x:center.x+Math.cos(theta)*r,y:.42,z:center.z+Math.sin(theta)*r};
    const end={x:center.x+Math.cos(theta+Math.PI/2)*r,y:.42,z:center.z+Math.sin(theta+Math.PI/2)*r};
    const alignment={length,minRadius:r,segments:[{type:'arc',center,radius:r,startAngle:theta,sweep:Math.PI/2,start,end,length,startDistance:0,endDistance:length,curvature:1/r}]};
    world.lines.push({id,from:`city-${i}`,to:`city-${(i+1)%4}`,alignment,...sampleAlignmentPoints(alignment)});
    world.cities.push({id:`city-${i}`,...start});
    world.transitions.push({fromLineId:id,fromEnd:'end',toLineId:`line-${(i+1)%4}`,toEnd:'start'},
      {fromLineId:`line-${(i+1)%4}`,fromEnd:'start',toLineId:id,toEnd:'end'});
  }
  return world;
}

test('spherical circuit consists keep physical coupling spacing through turns, line boundaries and motion',()=>{
  const world=circleWorld(65),traffic=createNetworkTraffic(world),path=traffic.paths[0];
  assert.equal(traffic.mode,'circuits');
  for(let s=0;s<path.length;s+=3.71){
    const a=sampleNetworkPath(path,s),b=sampleNetworkPath(path,s+2.64);
    const pa=surfacePoint(world,a.x,a.y,a.z),pb=surfacePoint(world,b.x,b.y,b.z);
    assert.ok(pa.distanceTo(pb)>2.62&&pa.distanceTo(pb)<2.641,'couplings use physical rather than chart arc length');
  }
  for(const segment of path.segments){
    const a=sampleNetworkPath(path,segment.start-1e-5),b=sampleNetworkPath(path,segment.start+1e-5);
    near(surfacePoint(world,a.x,a.y,a.z).distanceTo(surfacePoint(world,b.x,b.y,b.z)),2e-5,1e-7);
  }
  traffic.update(1);assert.ok(traffic.trains.every(t=>t.active));
  const view=makeTrains(new Group(),world,{traffic});view.updateView();
  const matrix=new Matrix4();
  for(const mesh of view.root.children)for(let i=0;i<mesh.count;i++){
    mesh.getMatrixAt(i,matrix);const x=column(matrix,0),y=column(matrix,1),z=column(matrix,2);
    for(const axis of [x,y,z])near(axis.length(),1,1e-6);
    near(x.dot(y),0,1e-6);near(x.dot(z),0,1e-6);near(y.dot(z),0,1e-6);
  }
  view.dispose();
});

test('spherical shuttle fallback uses physical end stops, velocity and carriage spacing',()=>{
  const line=straight(60,Math.PI/2,200),world={...spherical(),lines:[line],cities:[{id:'a'},{id:'b'}],junctions:[]};
  const traffic=createNetworkTraffic(world),train=traffic.trains[0];
  assert.equal(traffic.mode,'shuttles');assert.ok(train.end<100&&train.end>90);
  const before=traffic.sampleTrain(train),p=surfacePoint(world,before.x,before.y,before.z);
  traffic.update(2);const after=traffic.sampleTrain(train);near(p.distanceTo(surfacePoint(world,after.x,after.y,after.z)),5.2,1e-4);
  const cars=train.carPoses.map(p=>surfacePoint(world,p.x,p.y,p.z));
  near(cars[0].distanceTo(cars[1]),2.64,1e-5);near(cars[1].distanceTo(cars[2]),2.64,1e-5);
});

test('high latitude tunnel excavation keeps its physical cross section after geographic terrain warping',()=>{
  const world=spherical(),line=straight(70,0,30),geometry=tunnelCutter(line,0,line.length,world);
  warpGeometryToSurface(geometry,world);
  const position=geometry.attributes.position,first=new Vector3().fromBufferAttribute(position,0),second=new Vector3().fromBufferAttribute(position,1);
  near(first.distanceTo(second),2.16,2e-4);
  near(first.distanceTo(physicalRailPoint(world,{...line.points[0],angle:0},-1.08,-.9)),0,2e-4);
  geometry.dispose();
});

test('minimum chart turn radii reserve enough physical room for rigid cars at high latitude',()=>{
  const world=spherical();
  near(chartTurnRadius({},[{x:0,z:0}],8),8);
  for(const latitude of [0,45,60,75]){
    const p={x:0,z:-latitude*Math.PI/180*radius},r=chartTurnRadius(world,[p],8);
    assert.ok(r*Math.cos(latitude*Math.PI/180)**2>=8,'anisotropic chart curvature cannot shrink the physical turn radius');
  }
});


test('close London and Auckland routes fit physical turns without loops, lost waypoints or reduced train scale',()=>{
  const world=spherical(),cases=[{
    start:{x:-4.462480122104325,z:-1437.2408222428096,heading:2.4430228274585595},
    end:{x:-52.70134625402727,z:-1464.287411171159,heading:4.0096836247798},
    waypoints:[{x:-22.340214425527417,z:-1449.3214108560912}],
  },{
    start:{x:4891.820584768582,z:1036.277276940866,heading:-.10966170021030368},
    end:{x:4894.353287180119,z:1053.6189314904852,heading:1.1187863338305961},waypoints:[],
  }];
  for(const {start,end,waypoints} of cases){
    const alignment=createSurfaceAlignment(start,end,{world,physicalRadius:4,radius:chartTurnRadius(world,[start,...waypoints,end],4),waypoints,y:.42});
    assert.ok(alignment.segments.some(segment=>segment.chartTransform),'tight route uses metric-correct chart ellipses');
    const line={alignment,...sampleAlignmentPoints(alignment)},metric=physicalLineMetric(world,line);
    for(const waypoint of waypoints)assert.ok(alignment.segments.some(segment=>{
      const p=sampleAlignment(alignment,segment.startDistance);return Math.hypot(p.x-waypoint.x,p.z-waypoint.z)<1e-8;
    }),'authored geographic anchors remain exact');
    for(const [s,expected] of [[0,start],[alignment.length,end]]){
      const p=sampleAlignment(alignment,s);near(Math.hypot(p.x-expected.x,p.z-expected.z),0,1e-8);near(Math.cos(p.heading-expected.heading),1,1e-10);
    }
    for(let s=.02;s<line.length-.02;s+=.07){
      const a=sampleAlignment(alignment,s-.01),b=sampleAlignment(alignment,s+.01);
      const ta=surfaceTangent(world,a.x,a.y,a.z,a.tangent.x,0,a.tangent.z).normalize(),tb=surfaceTangent(world,b.x,b.y,b.z,b.tangent.x,0,b.tangent.z).normalize();
      const turn=Math.atan2(ta.clone().cross(tb).length(),ta.dot(tb));
      const length=physicalDistanceAtChart(metric,s+.01)-physicalDistanceAtChart(metric,s-.01);
      assert.ok(length/turn>=4-1e-4,'true spherical minimum turn radius accommodates rigid cars');
    }
    for(let s=0;s<metric.length-1;s+=.43){
      const a=sampleAlignment(alignment,chartDistanceAtPhysical(metric,s)),b=sampleAlignment(alignment,chartDistanceAtPhysical(metric,s+.5));
      near(surfacePoint(world,a.x,a.y,a.z).distanceTo(surfacePoint(world,b.x,b.y,b.z)),.5,.0004);
    }
  }
});
