import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Matrix4} from 'three';
import {createResourceWork} from '../src/resource-work.js';
import {createResourceWorkArt} from '../src/resource-work-art.js';

const ground=()=>({type:'ground',height:0});
function fixture(resource='wood'){
  const houses=[0,1,2].map(i=>({id:`home-${i}`,kind:'house',x:(i-1)*4,z:0,y:0,rotation:0,width:2.2,depth:2.2,ownerId:'teal',cityId:'town'}));
  const city={id:'town',x:0,z:0,radius:6,level:1,houseCount:3,houseIds:houses.map(home=>home.id),biome:resource==='wood'?'forest':resource==='metal'?'desert':'plains'};
  const trees=[-5,0,5].map((x,i)=>({id:`tree-${i}`,kind:'tree',x,z:8,y:0,scale:.75,variant:'round'}));
  let revision=0;
  const session={player:{ownerId:'teal',houses,cities:[city]},bots:[],shared:{removedTreeIds:new Set(),touchTrees(){revision++;},isSceneryRemoved(){return false;},getPaths(){return[];}},get spatialRevision(){return revision;},get buildings(){return houses;}};
  const world={seed:'workers',players:[{id:'teal',color:{l:.6,c:.12,h:170}}],gameplay:{economy:'loops',ownerId:'teal',guaranteedTrees:trees}};
  return{world,session,trees,houses,city};
}
function run(work,seconds,options={}){const events=[];for(let i=0;i<Math.ceil(seconds*20);i++){work.update(.05,options);events.push(...work.drainEvents());}return events;}

test('cosmetic work makes real outward and return trips without removing trees or producing income',()=>{
  const {world,session,houses}=fixture(),work=createResourceWork(world,{session,surfaceAt:ground});
  assert.equal(work.workers.size,3);let gathers=0;
  for(let frame=0;frame<900;frame++){
    const before=work.snapshot();work.update(.05);
    for(const [index,worker]of work.snapshot().entries()){
      assert.ok(Math.hypot(worker.x-before[index].x,worker.z-before[index].z)<=worker.speed*.05+1e-5,'worker cannot teleport');
      for(const house of houses)assert.ok(Math.abs(worker.x-house.x)>1.03||Math.abs(worker.z-house.z)>.88,'no route crosses a house');
      assert.equal(worker.resource,'resources');assert.equal(worker.workKind,'tree');
    }
    for(const event of work.drainEvents()){
      assert.notEqual(event.type,'tree-remove');assert.notEqual(event.type,'production');
      if(event.type==='gathered'){gathers++;const worker=work.workers.get(event.workerId);assert.equal(event.cosmetic,true);assert.equal(event.resource,'resources');assert.equal(event.workKind,'tree');assert.equal(event.ownerId,'teal');assert.equal(event.x,worker.x);assert.equal(event.z,worker.z);assert.equal(worker.carrying,true);}
    }
  }
  assert.ok(gathers>=3);assert.ok(work.stats.completedTrips>=3);assert.equal(work.stats.production,0);assert.equal(session.shared.removedTreeIds.size,0);assert.equal(work.stats.regrowing,0);work.dispose();
});

test('capturing a home transfers its existing cosmetic worker to the new owner',()=>{
  const {world,session,houses,city}=fixture(),work=createResourceWork(world,{session,surfaceAt:ground});
  const worker=work.workers.get(`worker:${houses[0].id}`),oldPosition={x:worker.x,z:worker.z};
  session.player.cities=[];session.bots=[{game:{ownerId:'coral',houses,cities:[{...city,ownerId:'coral'}]}}];
  for(const home of houses)home.ownerId='coral';session.shared.touchTrees();work.sync();
  assert.equal(work.workers.get(worker.id),worker,'capture preserves the NPC instead of respawning it');
  assert.equal(worker.ownerId,'coral');assert.deepEqual({x:worker.x,z:worker.z},oldPosition);work.dispose();
});

test('each completed gathering trip has one cosmetic event at its actual node and no home-credit event',()=>{
  const{world,session}=fixture(),work=createResourceWork(world,{session,surfaceAt:ground}),events=run(work,80);
  const gathered=events.filter(event=>event.type==='gathered');assert.ok(gathered.length>3);assert.equal(new Set(gathered.map(event=>event.id)).size,gathered.length);
  for(const event of gathered){const worker=work.workers.get(event.workerId);assert.ok(Math.hypot(event.x-worker.home.x,event.z-worker.home.z)>4);assert.equal(event.amount,1);assert.equal(event.resource,'resources');assert.ok(event.nodeId);}
  assert.equal(events.filter(event=>event.type==='production'||event.type==='tree-remove').length,0);assert.ok(work.stats.completedTrips>0);work.dispose();
});

test('water and blocked routes prevent cosmetic trips without an invisible work animation',()=>{
  const{world,session}=fixture(),work=createResourceWork(world,{session,surfaceAt:(x,z)=>({type:z>3&&z<5?'water':'ground',height:0})});
  assert.equal(run(work,70).filter(event=>event.type==='gathered').length,0);assert.ok(work.snapshot().every(worker=>worker.distance===0));assert.equal(work.stats.production,0);work.dispose();
});

test('manual cuts regrow in the shared authoritative set while NPC visits leave restored trees intact',()=>{
  const{world,session,trees}=fixture();session.shared.removedTreeIds.add(trees[0].id);
  const work=createResourceWork(world,{session,surfaceAt:ground,tuning:{treeRegrowSeconds:3}}),events=run(work,45);
  assert.ok(events.some(event=>event.type==='tree-regrow'&&event.treeId===trees[0].id));assert.equal(events.filter(event=>event.type==='tree-remove').length,0);
  assert.equal(session.shared.removedTreeIds.size,0);assert.ok(events.some(event=>event.type==='gathered'));work.dispose();
});

test('trees never regrow through newly built homes or permanent rail clearings',()=>{
  const{world,session,trees}=fixture();session.shared.removedTreeIds.add(trees[0].id);session.shared.removedTreeIds.add(trees[1].id);
  session.shared.isSceneryRemoved=id=>id===trees[1].id;
  session.player.houses.push({id:'block',kind:'house',x:trees[0].x,z:trees[0].z,width:2.2,depth:2.2});
  const work=createResourceWork(world,{session,surfaceAt:ground,tuning:{treeRegrowSeconds:1}}),events=run(work,12);
  assert.ok(session.shared.removedTreeIds.has(trees[0].id));assert.ok(session.shared.removedTreeIds.has(trees[1].id));
  assert.ok(!events.some(event=>event.type==='tree-regrow'&&[trees[0].id,trees[1].id].includes(event.treeId)));
});

test('workers finish their actual return home at night and do not work while indoors',()=>{
  const{world,session}=fixture(),work=createResourceWork(world,{session,surfaceAt:ground});run(work,8);
  const before=work.snapshot();work.update(.05,{dayPhase:'night'});
  for(const[index,worker]of work.snapshot().entries())assert.ok(Math.hypot(worker.x-before[index].x,worker.z-before[index].z)<=worker.speed*.05+1e-5);
  run(work,30,{dayPhase:'night'});assert.ok(work.snapshot().every(worker=>worker.indoors));assert.equal(run(work,20,{dayPhase:'night'}).length,0);
  assert.ok(run(work,35,{dayPhase:'day'}).some(event=>event.type==='gathered'));work.dispose();
});

test('desert ore is deterministic, visibly placed outside homes, and supplies returning miners',()=>{
  const a=fixture('metal'),b=fixture('metal'),first=createResourceWork(a.world,{session:a.session,surfaceAt:ground}),second=createResourceWork(b.world,{session:b.session,surfaceAt:ground});
  assert.equal(first.placements.length,3);assert.deepEqual(first.placements,second.placements);
  for(const ore of first.placements)for(const home of a.houses)assert.ok(Math.hypot(ore.x-home.x,ore.z-home.z)>2.5);
  for(const ore of first.placements){assert.equal(ore.resource,'resources');assert.equal(ore.workKind,'ore');}
  assert.ok(run(first,65).some(event=>event.type==='gathered'&&event.resource==='resources'&&event.workKind==='ore'));first.dispose();second.dispose();
});

test('gray workers visit field gates while all non-desert players cut trees, including plains settlements',()=>{
  const{world,session,houses,city}=fixture('gold');
  const villageHomes=houses.map(home=>({...home,id:`gray:${home.id}`,cityId:'village',ownerId:'village-gray',x:home.x+40}));
  world.gameplay.farmVillages={ownerId:'village-gray',houses:villageHomes,cities:[{...city,id:'village',x:40,ownerId:'village-gray',houseIds:villageHomes.map(home=>home.id)}],destinations:[{id:'field-gate',cityId:'village',x:40,z:9,lookX:44,lookZ:9,kind:'farm'}]};
  const work=createResourceWork(world,{session,surfaceAt:ground}),events=run(work,70),visits=events.filter(event=>event.type==='gathered');
  assert.ok(visits.some(event=>event.resource==='resources'&&event.ownerId==='teal'&&event.workKind==='tree'));assert.ok(visits.some(event=>event.resource==='food'&&event.ownerId==='village-gray'));assert.equal(events.filter(event=>event.type==='production').length,0);work.dispose();
});

test('cosmetic worker artwork is bounded, reflects poses, and never advances work or the economy',()=>{
  const{world,session}=fixture('metal'),work=createResourceWork(world,{session,surfaceAt:ground}),root=new Group(),art=createResourceWorkArt(root,world,work);
  run(work,6);const before=work.snapshot();art.update(.1,{focus:{x:0,z:0},mapBlend:0});assert.ok(art.stats.visible>0);assert.deepEqual(work.snapshot(),before);
  art.update(100,{mapBlend:1});assert.equal(art.stats.visible,0);assert.deepEqual(work.snapshot(),before);art.dispose();assert.equal(root.children.length,0);assert.equal(work.workers.size,3);
});

test('a manually chopped tree outside the initial catalogue retains its exact regrowth source',()=>{
  const{world,session}=fixture();const work=createResourceWork(world,{session,surfaceAt:ground,tuning:{treeRegrowSeconds:1}});
  const tree={id:'distant-manual',kind:'tree',x:90,z:90,y:0,scale:1};session.shared.removedTreeIds.add(tree.id);work.trackTree(tree);
  const events=run(work,2);assert.ok(events.some(event=>event.type==='tree-regrow'&&event.treeId===tree.id));assert.equal(session.shared.removedTreeIds.has(tree.id),false);
});

test('permanently clearing a mine aborts the cosmetic visit and does not replace the reserved site',()=>{
  const{world,session}=fixture('metal'),cleared=new Set();session.shared.isSceneryRemoved=item=>cleared.has(typeof item==='string'?item:item?.id);
  const work=createResourceWork(world,{session,surfaceAt:ground});run(work,5);for(const node of work.placements)cleared.add(node.id);session.shared.touchTrees();
  const events=run(work,45);assert.equal(events.filter(event=>event.type==='gathered').length,0);assert.ok(work.snapshot().every(worker=>worker.activity==='waiting'));assert.equal(work.placements.length,0);work.dispose();
});

test('idle frames reuse the city membership instead of cloning every account every frame',()=>{
  const{world,session}=fixture(),houses=session.player.houses,cities=session.player.cities;let reads=0;
  Object.defineProperty(session.player,'houses',{get(){reads++;return structuredClone(houses);}});Object.defineProperty(session.player,'cities',{get(){reads++;return structuredClone(cities);}});
  const work=createResourceWork(world,{session,surfaceAt:ground});const before=reads;run(work,2);assert.equal(reads,before);
});

test('a house across a return route triggers bounded replanning without teleporting',()=>{
  const{world,session}=fixture(),work=createResourceWork(world,{session,surfaceAt:ground});let target=null;
  for(let i=0;i<800&&!target;i++){work.update(.05);work.drainEvents();target=[...work.workers.values()].find(worker=>worker.activity==='returning'&&worker.carrying&&Math.hypot(worker.x-worker.home.x,worker.z-worker.home.z)>6);}
  assert.ok(target);const home=target.home,dx=home.x-target.x,dz=home.z+.9-target.z,length=Math.hypot(dx,dz);
  const obstruction={id:'new-crossing-home',kind:'house',x:target.x+dx/length*3,z:target.z+dz/length*3,width:2.2,depth:2.2,rotation:0};
  session.player.houses.push(obstruction);session.shared.touchTrees();let returned=false,sawReroute=false;const trip=target.trip;
  for(let i=0;i<1000&&!returned;i++){
    const before={x:target.x,z:target.z},searches=work.stats.routeSearches;work.update(.05);sawReroute||=target.reroute||work.stats.routeSearches>searches;
    assert.ok(Math.hypot(target.x-before.x,target.z-before.z)<=target.speed*.05+1e-5);
    assert.ok(Math.abs(target.x-obstruction.x)>1.1||Math.abs(target.z-obstruction.z)>1.1,'worker never crosses the new walls');
    assert.ok(work.drainEvents().every(event=>event.type!=='production'));if(target.trip>trip){returned=true;assert.ok(Math.hypot(target.x-home.x,target.z-home.z-.9)<1e-6);}
  }
  assert.ok(sawReroute);assert.ok(returned,'the worker eventually reaches its actual home');work.dispose();
});

test('desert homesteads expose reachable player ore before a city exists and retain those sites through formation',()=>{
  const{world,session,houses,city}=fixture('metal'),extra=houses.splice(1);houses[0].biome='desert';session.player.cities=[];
  const work=createResourceWork(world,{session,surfaceAt:ground}),before=structuredClone(work.placements);
  assert.equal(work.workers.size,0);assert.equal(before.length,3);
  for(const ore of before){assert.ok(ore.id.startsWith('ore:owner:teal:'));assert.equal(ore.resource,'resources');assert.equal(ore.workKind,'ore');assert.ok(Math.hypot(ore.x-houses[0].x,ore.z-houses[0].z)<11);}
  houses.push(...extra);session.player.cities=[city];session.shared.touchTrees();work.sync();
  assert.deepEqual(work.placements,before,'city formation does not replace, duplicate or move starter deposits');assert.equal(work.workers.size,3);
  assert.ok(run(work,45).some(event=>event.type==='gathered'&&event.workKind==='ore'),'the guaranteed deposits have real routes from their home doors');work.dispose();
});

test('unclaimed deserts get bounded deterministic ore, every exposed node has artwork, and clearing keeps its reservation',()=>{
  const{world,session}=fixture('metal');world.biomes={regions:[{id:'dunes',type:'desert',polygons:[[[[-120,-120],[120,-120],[120,120],[-120,120],[-120,-120]]]]}],oceanShore:[]};
  const cleared=new Set();session.shared.isSceneryRemoved=item=>cleared.has(typeof item==='string'?item:item.id);
  const work=createResourceWork(world,{session,surfaceAt:ground}),root=new Group(),art=createResourceWorkArt(root,world,work);
  const all=work.placements;assert.ok(all.length>32);assert.ok(all.length<=64);assert.ok(all.some(node=>!node.ownerId));
  for(const node of all){assert.equal(node.workKind,'ore');assert.equal(node.resource,'resources');assert.ok(node.x>=-120&&node.x<=120&&node.z>=-120&&node.z<=120);}
  art.update(.1,{focus:{x:0,z:0}});assert.equal(root.getObjectByName('resource-ore-nodes').children[0].count,all.length*3);
  cleared.add(all[4].id);session.shared.touchTrees();work.sync();assert.equal(work.placements.length,all.length-1);assert.ok(!work.placements.some(node=>node.id===all[4].id));
  art.update(.1,{focus:{x:0,z:0}});assert.equal(root.getObjectByName('resource-ore-nodes').children[0].count,(all.length-1)*3);art.dispose();work.dispose();assert.equal(root.children.length,0);
});

test('cutting and mining tools stay bounded, animate cosmetically, and respect reduced motion',()=>{
  const{world,session}=fixture('metal'),work=createResourceWork(world,{session,surfaceAt:ground}),root=new Group(),art=createResourceWorkArt(root,world,work),worker=[...work.workers.values()][0];
  worker.activity='working';worker.workKind='ore';worker.moving=false;worker.indoors=false;
  art.update(.1,{focus:worker});const tools=root.getObjectByName('worker-hand-tools'),a=new Matrix4(),b=new Matrix4();assert.equal(tools.count,2);tools.getMatrixAt(0,a);
  worker.workTime+=.65;art.update(.1,{focus:worker});tools.getMatrixAt(0,b);assert.notDeepEqual(a.elements,b.elements);
  art.update(.1,{focus:worker,reducedMotion:true});tools.getMatrixAt(0,a);worker.workTime+=.3;art.update(.1,{focus:worker,reducedMotion:true});tools.getMatrixAt(0,b);assert.deepEqual(a.elements,b.elements);
  worker.workKind='tree';art.update(.1,{focus:worker});assert.equal(tools.count,2);worker.workKind='food';art.update(.1,{focus:worker});assert.equal(tools.count,0);
  art.update(.1,{mapBlend:1});assert.equal(tools.visible,false);assert.equal(work.stats.production,0);art.dispose();work.dispose();assert.equal(root.children.length,0);
});

test('work visits include a grounded inspection, deliberate strokes and packing without crowding a site',()=>{
  for(const biome of ['wood','metal']){
    const{world,session,trees}=fixture(biome),work=createResourceWork(world,{session,surfaceAt:ground}),stages=new Set(),treeSnapshot=structuredClone(trees);
    for(let frame=0;frame<1600;frame++){
      work.update(.05);const occupied=new Set();
      for(const worker of work.workers.values()){
        stages.add(worker.activity);
        if(['outbound','inspecting','working','packing'].includes(worker.activity)){
          assert.ok(!occupied.has(worker.nodeId),'a node has only one active visitor');occupied.add(worker.nodeId);
        }
        if(['inspecting','working','packing'].includes(worker.activity)){
          if(worker.activity!=='inspecting')assert.equal(worker.moving,false);assert.equal(worker.y,.015);
          if(worker.workKind==='tree'){
            const tree=trees.find(item=>item.id===worker.nodeId),span=Math.hypot(worker.x-tree.x,worker.z-tree.z);
            assert.ok(span>.3&&span<.6,'the axe reaches a trunk without the body penetrating it');
          }
          if(worker.activity==='packing')assert.equal(worker.carrying,true);
        }
      }
      assert.ok(work.drainEvents().every(event=>event.type==='gathered'&&event.cosmetic));
    }
    for(const stage of ['inspecting','working','packing','returning','waiting'])assert.ok(stages.has(stage),`${biome} visitor uses ${stage}`);
    assert.deepEqual(trees,treeSnapshot);assert.equal(work.stats.production,0);assert.equal(session.shared.removedTreeIds.size,0);work.dispose();
  }
});

test('workers physically cross their own door at dusk and leave in staggered daylight departures',()=>{
  const{world,session}=fixture(),work=createResourceWork(world,{session,surfaceAt:ground}),seen=new Set();
  for(let frame=0;frame<80;frame++){
    const before=work.snapshot();work.update(.05,{dayPhase:'night'});
    for(const[index,worker]of [...work.workers.values()].entries()){
      seen.add(worker.activity);assert.ok(Math.hypot(worker.x-before[index].x,worker.z-before[index].z)<=worker.speed*.05+1e-6);
      if(worker.activity==='entering'){assert.equal(worker.indoors,false);assert.ok(worker.y>=0&&worker.y<=.14);}
    }
  }
  assert.ok(seen.has('entering'));assert.ok([...work.workers.values()].every(worker=>worker.indoors));
  for(const worker of work.workers.values()){assert.ok(Math.abs(worker.x-worker.home.x)<1e-6);assert.ok(Math.abs(worker.z-worker.home.z-.2)<1e-6);assert.ok(Math.abs(worker.y-.14)<1e-6);}
  const departureTimes=new Map();
  for(let frame=0;frame<160;frame++){
    const before=work.snapshot();work.update(.05,{dayPhase:'day'});
    for(const[index,worker]of [...work.workers.values()].entries()){
      assert.ok(Math.hypot(worker.x-before[index].x,worker.z-before[index].z)<=worker.speed*.05+1e-6);
      if(worker.activity==='leaving'&&!departureTimes.has(worker.id))departureTimes.set(worker.id,frame);
    }
  }
  assert.equal(departureTimes.size,3);assert.ok(new Set(departureTimes.values()).size>1);assert.equal(work.stats.production,0);work.dispose();
});

test('static ore art and owner grouping retain their revisions across ordinary animation frames',()=>{
  const{world,session}=fixture('metal'),work=createResourceWork(world,{session,surfaceAt:ground}),root=new Group(),art=createResourceWorkArt(root,world,work);
  art.update(.05,{focus:{x:0,z:0}});const rocks=root.getObjectByName('resource-ore-nodes').children[0],buffer=rocks.instanceMatrix.array,version=rocks.instanceMatrix.version,membership=work.membershipRevision;
  for(let frame=0;frame<100;frame++){work.update(.05);art.update(.05,{focus:{x:0,z:0}});}
  assert.equal(rocks.instanceMatrix.array,buffer);assert.equal(rocks.instanceMatrix.version,version,'static ore is not uploaded with each animation frame');assert.equal(work.membershipRevision,membership);
  art.dispose();work.dispose();
});

test('manually cut cactus regrows at its own source and blocked rail clearings stay cleared',()=>{
  const{world,session}=fixture('metal'),cactus={id:'dryland-cactus',kind:'cactus',x:15,z:8,scale:1,variant:1};
  session.shared.removedTreeIds.add(cactus.id);
  const work=createResourceWork(world,{session,surfaceAt:ground,tuning:{treeRegrowSeconds:1}});
  assert.equal(work.trackTree(cactus),true);const events=run(work,2);
  assert.ok(events.some(event=>event.type==='tree-regrow'&&event.treeId===cactus.id));
  assert.equal(session.shared.removedTreeIds.has(cactus.id),false);
  session.shared.removedTreeIds.add(cactus.id);work.trackTree(cactus);assert.equal(work.stats.regrowing,1);
  session.shared.isSceneryRemoved=id=>id===cactus.id;
  assert.ok(!run(work,2).some(event=>event.type==='tree-regrow'&&event.treeId===cactus.id));
  assert.equal(work.stats.regrowing,0,'a new railway cancels pending regrowth rather than retrying forever');work.dispose();
});


test('a pending blocked worker search is cancelled at dusk instead of dispatching an indoor worker later',()=>{
  const {world,session}=fixture(),work=createResourceWork(world,{session,surfaceAt:(x,z)=>({type:z>3&&z<5?'water':'ground',height:0})});
  for(const worker of work.workers.values())worker.wait=0;
  work.update(.05,{dayPhase:'day'});assert.ok(work.stats.routeSearches>0);
  assert.ok([...work.workers.values()].every(worker=>worker.activity==='waiting'));
  run(work,15,{dayPhase:'night'});assert.ok([...work.workers.values()].every(worker=>worker.indoors));
  assert.equal(work.drainEvents().length,0);work.dispose();
});
