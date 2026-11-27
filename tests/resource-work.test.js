import test from 'node:test';
import assert from 'node:assert/strict';
import {Group} from 'three';
import {createResourceWork,cityResource} from '../src/resource-work.js';
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

test('city resources are fixed by biome, with food reserved for gray villages',()=>{
  assert.equal(cityResource({}, {biome:'forest'}),'wood');assert.equal(cityResource({}, {biome:'desert'}),'metal');
  assert.equal(cityResource({}, {biome:'farmland'}),'gold');assert.equal(cityResource({}, {biome:'mountain'}),'gold');
  assert.equal(cityResource({gameplay:{farmVillages:{ownerId:'village-gray'}}}, {biome:'forest',ownerId:'village-gray'}),'food');assert.equal(cityResource({}, {},{neutral:true}),'food');
});

test('resources require a real outward trip, working pause, and return to the same doorway',()=>{
  const {world,session,houses}=fixture(),work=createResourceWork(world,{session,surfaceAt:ground,tuning:{treeRegrowSeconds:30}});
  assert.equal(work.workers.size,3);assert.equal(run(work,5).filter(e=>e.type==='production').length,0);
  let returns=0,removed=0;
  for(let frame=0;frame<700;frame++){
    const before=work.snapshot();work.update(.05);
    for(const [index,worker]of work.snapshot().entries()){
      assert.ok(Math.hypot(worker.x-before[index].x,worker.z-before[index].z)<=worker.speed*.05+1e-5,'worker cannot teleport');
      for(const house of houses)assert.ok(Math.abs(worker.x-house.x)>1.03||Math.abs(worker.z-house.z)>.88,'no route crosses a house');
    }
    for(const event of work.drainEvents()){
      if(event.type==='tree-remove')removed++;
      if(event.type==='production'){
        returns++;const worker=work.workers.get(event.id.split(':').slice(0,-1).join(':')),home=houses.find(home=>home.id===worker.houseId);
        assert.ok(Math.hypot(worker.x-home.x,worker.z-home.z-.9)<1e-6);assert.equal(event.resource,'wood');assert.equal(event.amount,1);assert.equal(event.ownerId,'teal');
      }
    }
  }
  assert.ok(returns>=3);assert.ok(removed>=returns);assert.ok(work.snapshot().every(worker=>worker.distance>10));
});

test('water and blocked routes prevent production instead of using an invisible timer',()=>{
  const{world,session}=fixture();const work=createResourceWork(world,{session,surfaceAt:(x,z)=>({type:z>3&&z<5?'water':'ground',height:0})});
  assert.equal(run(work,70).filter(event=>event.type==='production').length,0);assert.ok(work.snapshot().every(worker=>worker.distance===0));
});

test('manual and NPC cuts regrow in the shared authoritative tree set and can be harvested again',()=>{
  const{world,session,trees}=fixture();session.shared.removedTreeIds.add(trees[0].id);
  const work=createResourceWork(world,{session,surfaceAt:ground,tuning:{treeRegrowSeconds:3}}),events=run(work,45);
  assert.ok(events.some(event=>event.type==='tree-regrow'&&event.treeId===trees[0].id));
  const cuts=events.filter(event=>event.type==='tree-remove');assert.ok(cuts.length>3);assert.ok(new Set(cuts.map(event=>event.treeId)).size<cuts.length,'a restored source is reusable');
  const credits=events.filter(event=>event.type==='production');assert.equal(new Set(credits.map(event=>event.id)).size,credits.length,'every returned bundle has a unique credit ID');
});

test('trees never regrow through newly built homes or permanent rail clearings',()=>{
  const{world,session,trees}=fixture();session.shared.removedTreeIds.add(trees[0].id);session.shared.removedTreeIds.add(trees[1].id);
  session.shared.isSceneryRemoved=id=>id===trees[1].id;
  session.player.houses.push({id:'block',kind:'house',x:trees[0].x,z:trees[0].z,width:2.2,depth:2.2});
  const work=createResourceWork(world,{session,surfaceAt:ground,tuning:{treeRegrowSeconds:1}}),events=run(work,12);
  assert.ok(session.shared.removedTreeIds.has(trees[0].id));assert.ok(session.shared.removedTreeIds.has(trees[1].id));
  assert.ok(!events.some(event=>event.type==='tree-regrow'&&[trees[0].id,trees[1].id].includes(event.treeId)));
});

test('workers finish their actual return home at night and do not produce while indoors',()=>{
  const{world,session}=fixture(),work=createResourceWork(world,{session,surfaceAt:ground});run(work,8);
  const before=work.snapshot();work.update(.05,{dayPhase:'night'});
  for(const[index,worker]of work.snapshot().entries())assert.ok(Math.hypot(worker.x-before[index].x,worker.z-before[index].z)<=worker.speed*.05+1e-5);
  run(work,30,{dayPhase:'night'});assert.ok(work.snapshot().every(worker=>worker.indoors));assert.equal(run(work,20,{dayPhase:'night'}).length,0);
  assert.ok(run(work,35,{dayPhase:'day'}).some(event=>event.type==='production'));
});

test('desert ore is deterministic, visibly placed outside homes, and supplies returning miners',()=>{
  const a=fixture('metal'),b=fixture('metal'),first=createResourceWork(a.world,{session:a.session,surfaceAt:ground}),second=createResourceWork(b.world,{session:b.session,surfaceAt:ground});
  assert.equal(first.placements.length,3);assert.deepEqual(first.placements,second.placements);
  for(const ore of first.placements)for(const home of a.houses)assert.ok(Math.hypot(ore.x-home.x,ore.z-home.z)>2.5);
  assert.ok(run(first,65).some(event=>event.type==='production'&&event.resource==='metal'));
});

test('gray village workers visit authored field gates, while gold workers visit civic frontages',()=>{
  const{world,session,houses,city}=fixture('gold');
  const villageHomes=houses.map(home=>({...home,id:`gray:${home.id}`,cityId:'village',ownerId:'village-gray',x:home.x+40}));
  world.gameplay.farmVillages={ownerId:'village-gray',houses:villageHomes,cities:[{...city,id:'village',x:40,ownerId:'village-gray',houseIds:villageHomes.map(home=>home.id)}],destinations:[{id:'field-gate',cityId:'village',x:40,z:9,lookX:44,lookZ:9,kind:'farm'}]};
  const work=createResourceWork(world,{session,surfaceAt:ground}),events=run(work,70),credits=events.filter(event=>event.type==='production');
  assert.ok(credits.some(event=>event.resource==='gold'&&event.ownerId==='teal'));assert.ok(credits.some(event=>event.resource==='food'&&event.ownerId==='village-gray'));
});

test('productive worker artwork is bounded, reflects authoritative poses, and never advances the economy',()=>{
  const{world,session}=fixture('metal'),work=createResourceWork(world,{session,surfaceAt:ground}),root=new Group(),art=createResourceWorkArt(root,world,work);
  run(work,6);const before=work.snapshot();art.update(.1,{focus:{x:0,z:0},mapBlend:0});assert.ok(art.stats.visible>0);assert.deepEqual(work.snapshot(),before);
  art.update(100,{mapBlend:1});assert.equal(art.stats.visible,0);assert.deepEqual(work.snapshot(),before);art.dispose();assert.equal(root.children.length,0);assert.equal(work.workers.size,3);
});

test('a manually chopped tree outside the initial catalogue retains its exact regrowth source',()=>{
  const{world,session}=fixture();const work=createResourceWork(world,{session,surfaceAt:ground,tuning:{treeRegrowSeconds:1}});
  const tree={id:'distant-manual',kind:'tree',x:90,z:90,y:0,scale:1};session.shared.removedTreeIds.add(tree.id);work.trackTree(tree);
  const events=run(work,2);assert.ok(events.some(event=>event.type==='tree-regrow'&&event.treeId===tree.id));assert.equal(session.shared.removedTreeIds.has(tree.id),false);
});

test('clearing a mine during a visit aborts the job without minting its resources',()=>{
  const{world,session}=fixture('metal'),cleared=new Set();session.shared.isSceneryRemoved=item=>cleared.has(typeof item==='string'?item:item?.id);
  const work=createResourceWork(world,{session,surfaceAt:ground});run(work,5);for(const node of work.placements)cleared.add(node.id);session.shared.touchTrees();
  const events=run(work,45);assert.equal(events.filter(event=>event.type==='production').length,0);assert.ok(work.snapshot().every(worker=>worker.activity==='waiting'));
});

test('idle frames reuse the city membership instead of cloning every account every frame',()=>{
  const{world,session}=fixture(),houses=session.player.houses,cities=session.player.cities;let reads=0;
  Object.defineProperty(session.player,'houses',{get(){reads++;return structuredClone(houses);}});Object.defineProperty(session.player,'cities',{get(){reads++;return structuredClone(cities);}});
  const work=createResourceWork(world,{session,surfaceAt:ground});const before=reads;run(work,2);assert.equal(reads,before);
});

test('a new house across an active return route triggers bounded replanning without teleporting or premature credit',()=>{
  const{world,session}=fixture('metal'),work=createResourceWork(world,{session,surfaceAt:ground});let target=null;
  for(let i=0;i<800&&!target;i++){work.update(.05);work.drainEvents();target=[...work.workers.values()].find(worker=>worker.activity==='returning'&&worker.carrying&&Math.hypot(worker.x-worker.home.x,worker.z-worker.home.z)>6);}
  assert.ok(target);const home=target.home,dx=home.x-target.x,dz=home.z+.9-target.z,length=Math.hypot(dx,dz);
  const obstruction={id:'new-crossing-home',kind:'house',x:target.x+dx/length*3,z:target.z+dz/length*3,width:2.2,depth:2.2,rotation:0};
  session.player.houses.push(obstruction);session.shared.touchTrees();let earned=false,sawReroute=false;
  for(let i=0;i<1000&&!earned;i++){
    const before={x:target.x,z:target.z},searches=work.stats.routeSearches;work.update(.05);sawReroute||=target.reroute||work.stats.routeSearches>searches;
    assert.ok(Math.hypot(target.x-before.x,target.z-before.z)<=target.speed*.05+1e-5);
    assert.ok(Math.abs(target.x-obstruction.x)>1.1||Math.abs(target.z-obstruction.z)>1.1,'worker never crosses the new walls');
    for(const event of work.drainEvents())if(event.type==='production'&&event.id.startsWith(`${target.id}:`)){earned=true;assert.ok(Math.hypot(target.x-home.x,target.z-home.z-.9)<1e-6);}
  }
  assert.ok(sawReroute);assert.ok(earned,'blocked delivery finds a valid route home and eventually credits');
});
