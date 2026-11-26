import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3} from 'three';
import {naturePatch,NATURE_STYLES} from '../src/nature-assets.js';
import {tree,ASSET_BOUNDS} from '../src/assets.js';
import {M} from '../src/palette.js';
import {extractRigidSurfaceAssets} from '../src/rigid-surface-assets.js';
import {surfaceChartCoordinates} from '../src/world-surface.js';
import {compileDetailPacket} from '../src/detail-compiler.js';

test('natural vignettes fit their reserved circles with fixed geometry and material budgets',()=>{
  for(const style of NATURE_STYLES)for(const radius of [2,4,7])for(let variant=0;variant<20;variant++){
    const root=naturePatch(new Group(),{style,radius,variant}),mesh=root.children[0];
    assert.equal(root.userData.rigidSurfaceAsset,true);assert.equal(root.userData.surfaceFootprint,true);
    assert.equal(mesh.userData.surfaceGround,true);assert.equal(mesh.material,M.terrainVertex);
    const positions=mesh.geometry.attributes.position,colors=mesh.geometry.attributes.color;
    assert.equal(colors.count,positions.count);assert.ok(positions.count/3<=150,'patch count never increases with acreage');
    for(let i=0;i<positions.count;i++){
      assert.ok(Math.hypot(positions.getX(i),positions.getZ(i))<=radius+1e-6,`${style} remains within its clearance`);
      assert.ok(positions.getY(i)>=0&&positions.getY(i)<=root.userData.footprint.height+1e-6,`${style} stays within its height`);
    }
    assert.ok([...mesh.geometry.attributes.normal.array,...colors.array].every(Number.isFinite));
  }
});

test('natural vignettes are deterministic, varied and share their terrain batch',()=>{
  for(const style of NATURE_STYLES){
    const a=naturePatch(new Group(),{style,variant:19}),b=naturePatch(new Group(),{style,variant:19});
    const c=naturePatch(new Group(),{style,variant:20});
    assert.deepEqual(a.children[0].geometry.attributes.position.array,b.children[0].geometry.attributes.position.array);
    assert.deepEqual(a.children[0].geometry.attributes.color.array,b.children[0].geometry.attributes.color.array);
    assert.notDeepEqual(a.children[0].geometry.attributes.color.array,c.children[0].geometry.attributes.color.array);
    assert.equal(a.children[0].material,c.children[0].material);
  }
});

test('wind-shaped patches vary crest counts and silhouettes rather than repeating a paired stamp',()=>{
  for(const style of ['dune','frost','outcrop']){
    const counts=new Set(),silhouettes=new Set();
    for(let variant=0;variant<48;variant++){
      const mesh=naturePatch(new Group(),{style,variant,radius:5}).children[0],positions=mesh.geometry.attributes.position;
      counts.add(positions.count);
      let minX=Infinity,maxX=-Infinity,minZ=Infinity,maxZ=-Infinity,maxY=0;
      for(let i=0;i<positions.count;i++){
        minX=Math.min(minX,positions.getX(i));maxX=Math.max(maxX,positions.getX(i));
        minZ=Math.min(minZ,positions.getZ(i));maxZ=Math.max(maxZ,positions.getZ(i));maxY=Math.max(maxY,positions.getY(i));
      }
      silhouettes.add([maxX-minX,maxZ-minZ,maxY].map(value=>value.toFixed(2)).join(':'));
    }
    assert.ok(counts.size>=3,`${style} has different feature counts`);
    assert.ok(silhouettes.size>=40,`${style} varies length, width and height across seeds`);
  }
});

const globe={surface:{type:'sphere',radius:1600,origin:{longitude:0,latitude:0},complete:true,
  projection:{type:'equirectangular',radius:1600,centralLongitude:0,centralLatitude:0}}};

test('natural geometry retains its authored ground height at the equator, poles and date line',()=>{
  const point=new Vector3();
  for(const latitude of [0,72,86])for(const style of NATURE_STYLES){
    const p=surfaceChartCoordinates(globe,179.9,latitude),chart=new Group(),physical=new Group();
    const root=naturePatch(chart,{...p,style,radius:7,variant:3,rotation:.7,y:.1});
    const positions=root.children[0].geometry.attributes.position;
    const low=Math.min(...Array.from({length:positions.count},(_,i)=>positions.getY(i)));
    const high=Math.max(...Array.from({length:positions.count},(_,i)=>positions.getY(i)));
    extractRigidSurfaceAssets(chart,physical,globe);physical.updateMatrixWorld(true);
    const mesh=root.children[0],ground=mesh.geometry.attributes.position;
    assert.ok(ground.count/3<=300,'surface conformity remains bounded');
    for(let i=0;i<ground.count;i++){
      point.fromBufferAttribute(ground,i).applyMatrix4(mesh.matrixWorld);
      const height=Math.hypot(point.x,point.y+globe.surface.radius,point.z)-globe.surface.radius;
      assert.ok(height>=low+.1-1e-6&&height<=high+.1+1e-6,'all features stand on the radial surface');
    }
  }
});

test('new tree silhouettes stay inside the existing crown reservation and geometry budget',()=>{
  const point=new Vector3();
  for(const variant of [6,7,8])for(const scale of [.7,1,1.4]){
    const root=tree(new Group(),{variant,scale,rotation:.71});root.updateMatrixWorld(true);
    let triangles=0;
    root.traverse(node=>{
      if(!node.isMesh)return;
      assert.ok(Object.values(M).includes(node.material));
      const positions=node.geometry.attributes.position;triangles+=(node.geometry.index?.count??positions.count)/3;
      for(let i=0;i<positions.count;i++){
        point.fromBufferAttribute(positions,i).applyMatrix4(node.matrixWorld);
        assert.ok(Math.hypot(point.x,point.z)<=ASSET_BOUNDS.tree.radius*scale+1e-6);
        assert.ok(point.y>=-1e-6&&point.y<=ASSET_BOUNDS.tree.height*scale+1e-6);
      }
    });
    assert.ok(triangles<=64,'a species uses one simple crown');
  }
});

test('nature placements compile into worker packets with existing material and vertex colors',()=>{
  const p=surfaceChartCoordinates(globe,35,72),bounds={minX:p.x-10,maxX:p.x+10,minZ:p.z-10,maxZ:p.z+10};
  const world={...globe,outline:[[0,100],[4,100],[4,104],[0,104]],cities:[],players:[],lines:[],mountains:[],stations:[],placements:[]};
  const packet=compileDetailPacket({bounds,placements:[{kind:'nature',style:'dune',radius:7,...p,rotation:.4,variant:12}]},world);
  assert.equal(packet.meshes.length,1,'the new art reuses a single existing batch');
  assert.ok(packet.meshes[0].material.vertexColors&&packet.meshes[0].color,'natural color survives worker compilation');
  assert.ok([...packet.meshes[0].position,...packet.meshes[0].normal].every(Number.isFinite));
});
