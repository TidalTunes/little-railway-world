import test from 'node:test';
import assert from 'node:assert/strict';
import {createRailwayPreview} from '../src/settlement-railway-preview.js';

const copy=value=>structuredClone(value);
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function fixture(t){
  const previews=[],requests=[];let revision=0;
  const key=(from,to,options)=>`${from}>${to}:${revision}:${JSON.stringify(options)}`;
  function draft(from,to,options){
    const points=[options.attachments?.from??{x:0,z:0},...options.waypoints??[],options.attachments?.to??{x:80,z:0}].map(copy);
    return {fromCityId:from,toCityId:to,provisional:true,siteValid:true,valid:true,affordable:true,cost:5,code:'ready',reason:'Ready',
      lines:[{id:`${from}-${to}`,points}],stations:[],handles:points.map((point,index)=>({...point,role:index===0?'from':index===points.length-1?'to':'waypoint'})),
      waypoints:copy(options.waypoints??[]),attachments:copy(options.attachments??{})};
  }
  const railways={geometryKey:key,preview(from,to,options={}){previews.push({from,to,options:copy(options)});return draft(from,to,options);}};
  const planner={request(from,to,options={}){return new Promise((resolve,reject)=>requests.push({from,to,options:copy(options),resolve,reject}));}};
  const editor=createRailwayPreview(railways,planner);t.after(()=>editor.dispose());
  const complete=(index,response)=>{
    const request=requests[index];assert.ok(request,`request ${index} exists`);
    request.resolve(response??{result:{...draft(request.from,request.to,request.options),provisional:false,checked:true}});
  };
  return {editor,railways,planner,previews,requests,complete,invalidate(){revision++;}};
}
const initial=()=>({waypoints:[{x:25,z:5},{x:55,z:-5}],attachments:{from:{x:7,z:0},to:{x:73,z:0}}});

test('hover returns an immediate visual route before asynchronous validation and cannot confirm it yet',async t=>{
  const f=fixture(t),options=initial(),state=f.editor.update('home','village',options,{gold:10});
  assert.equal(f.previews.length,1);assert.equal(f.requests.length,1);
  assert.equal(state.result.provisional,true);assert.ok(state.result.lines[0].points.length>2);
  assert.equal(state.confirmed,false);assert.equal(state.checking,true);
  for(let i=0;i<12;i++)f.editor.update('home','village',copy(options),{gold:10});
  assert.equal(f.previews.length,1,'idle frames reuse their immediate geometry');assert.equal(f.requests.length,1,'idle frames never duplicate worker validation');
  f.complete(0);await tick();const confirmed=f.editor.update('home','village',options,{gold:10});
  assert.equal(confirmed.confirmed,true);assert.equal(confirmed.checking,false);assert.equal(confirmed.result.checked,true);
  assert.equal(f.previews.length,1);assert.equal(f.requests.length,1);
});

test('out-of-range cities reject immediately without worker work and cannot revive an earlier checked route',async t=>{
  const f=fixture(t),preview=f.railways.preview;
  f.railways.preview=(from,to,options)=>to==='distant-city'
    ?{provisional:true,siteValid:false,valid:false,cost:5,code:'out-of-range',reason:'City is outside railway range',lines:[],handles:[]}
    :preview(from,to,options);
  f.editor.update('home','village',initial(),{gold:10});
  const outside=f.editor.update('home','distant-city',initial(),{gold:10});
  assert.equal(outside.checking,false);assert.equal(outside.confirmed,false);assert.equal(outside.result.code,'out-of-range');
  assert.equal(f.requests.length,1,'only the preceding in-range pair started validation');
  f.complete(0);await tick();
  for(const gold of [0,5,100]){
    const state=f.editor.update('home','distant-city',initial(),{gold});
    assert.equal(state.result.code,'out-of-range');assert.equal(state.result.valid,false);
    assert.equal(state.confirmed,false);assert.equal(state.checking,false);
  }
  assert.equal(f.requests.length,1,'gold changes cannot request a terrain check for a distant city');
  const back=f.editor.update('home','village',initial(),{gold:10});assert.equal(back.checking,true);
  assert.equal(f.requests.length,2);f.complete(1);await tick();assert.equal(f.editor.state.confirmed,true);
});

test('each pointer move updates the curve immediately while one release validates the final unchanged key',async t=>{
  const f=fixture(t),options=initial();let last;
  for(let move=0;move<18;move++){
    options.waypoints[0].z=move;const state=f.editor.update('home','village',options,{dragging:true,gold:10});
    assert.equal(state.result.lines[0].points[1].z,move,'the visible curve follows this pointer frame');
    assert.equal(state.confirmed,false);last=state.key;
  }
  assert.equal(f.previews.length,18);assert.equal(f.requests.length,0,'dragging cannot queue a heavy search on each frame');
  const released=f.editor.update('home','village',options,{dragging:false,gold:10});
  assert.equal(released.key,last);assert.equal(f.previews.length,18,'release does not need to refit identical geometry');
  assert.equal(f.requests.length,1);assert.deepEqual(f.requests[0].options,options);
  f.complete(0);await tick();assert.equal(f.editor.update('home','village',options,{gold:10}).confirmed,true);
});

test('fixed interior nodes and both endpoint attachment coordinates survive request snapshots and later edits',async t=>{
  const f=fixture(t),options=initial(),original=copy(options);
  f.editor.update('home','village',options,{gold:10});
  options.attachments.from.x=-9;options.attachments.to.z=12;options.waypoints[1].z=8;
  const moved=f.editor.update('home','village',options,{dragging:true,gold:10});
  assert.deepEqual(f.requests[0].options,original,'an in-flight request owns an immutable copy of its edit');
  assert.deepEqual(moved.result.waypoints,options.waypoints);assert.deepEqual(moved.result.attachments,options.attachments);
  assert.equal(moved.result.handles.length,original.waypoints.length+2);
  assert.equal(moved.result.handles[0].role,'from');assert.equal(moved.result.handles.at(-1).role,'to');
  f.complete(0);await tick();
  const current=f.editor.update('home','village',options,{dragging:true,gold:10});
  assert.deepEqual(current.result.attachments,options.attachments);assert.equal(current.confirmed,false,'the old endpoint geometry cannot authorize an edited route');
  f.editor.update('home','village',options,{gold:10});assert.deepEqual(f.requests[1].options,options);
});

test('late replies from another destination or an earlier drag cannot replace the latest route',async t=>{
  const f=fixture(t),options=initial();f.editor.update('home','old-village',options,{gold:10});
  const changed={...initial(),attachments:{from:{x:8,z:3},to:{x:70,z:4}}};
  f.editor.update('home','new-village',changed,{gold:10});
  f.complete(1);await tick();const fresh=f.editor.update('home','new-village',changed,{gold:10});
  assert.equal(fresh.result.toCityId,'new-village');assert.equal(fresh.confirmed,true);
  f.complete(0);await tick();const afterOld=f.editor.update('home','new-village',changed,{gold:10});
  assert.equal(afterOld.result.toCityId,'new-village');assert.deepEqual(afterOld.result.attachments,changed.attachments);
  assert.equal(afterOld.confirmed,true);assert.equal(f.requests.length,2);
});

test('clearing and reselecting identical endpoints rejects the old epoch even when geometry keys match',async t=>{
  const f=fixture(t),options=initial();f.editor.update('home','village',options,{gold:10});f.editor.clear();
  f.editor.update('home','village',options,{gold:10});assert.equal(f.requests.length,2);
  f.complete(0);await tick();const waiting=f.editor.update('home','village',options,{gold:10});
  assert.equal(waiting.confirmed,false);assert.equal(waiting.result.provisional,true);
  f.complete(1);await tick();assert.equal(f.editor.update('home','village',options,{gold:10}).confirmed,true);
});

test('occupied-layout changes require fresh validation before the current edit can be confirmed',async t=>{
  const f=fixture(t),options=initial();f.editor.update('home','village',options,{gold:10});f.complete(0);await tick();
  assert.equal(f.editor.update('home','village',options,{gold:10}).confirmed,true);
  f.invalidate();const changed=f.editor.update('home','village',options,{gold:10});
  assert.equal(changed.confirmed,false);assert.equal(changed.checking,true);assert.equal(f.previews.length,2);assert.equal(f.requests.length,2);
  f.complete(1);await tick();assert.equal(f.editor.update('home','village',options,{gold:10}).confirmed,true);
});

test('a frozen control count survives city growth, endpoint edits and renewed worker validation',async t=>{
  const f=fixture(t),options={...initial(),controlCount:2};
  f.editor.update('home','village',options,{gold:10});f.complete(0);await tick();
  f.invalidate();options.attachments.to.x+=12;
  const changed=f.editor.update('home','village',options,{dragging:true,gold:10});
  assert.equal(changed.confirmed,false,'growth invalidates the old authoritative result');
  assert.equal(f.previews.at(-1).options.controlCount,2,'the immediate preview retains the selected control count');
  assert.deepEqual(f.previews.at(-1).options.waypoints,options.waypoints,'growth does not discard edited interior controls');
  assert.equal(f.requests.length,1,'dragging still postpones the next full validation');
  f.editor.update('home','village',options,{gold:10});
  assert.deepEqual(f.requests[1].options,options,'the worker receives the same count and endpoint edit');
  f.complete(1);await tick();assert.equal(f.editor.state.confirmed,true);
});

test('validation failures keep the current visual route but cannot authorize a purchase',async t=>{
  const f=fixture(t),options=initial(),draft=f.editor.update('home','village',options,{gold:10}).result;
  f.complete(0,{error:'Route planning failed'});await tick();const state=f.editor.update('home','village',options,{gold:10});
  assert.deepEqual(state.result.lines,draft.lines,'errors preserve the useful edit instead of blanking the preview');
  assert.equal(state.result.valid,false);assert.equal(state.confirmed,false);assert.equal(state.checking,false);
  assert.match(state.result.reason,/failed/i);
});

test('synchronous transport failures and rejected promises preserve an editable invalid draft',async t=>{
  for(const reject of [false,true]){
    const f=fixture(t);f.planner.request=()=>{if(reject)return Promise.reject(new Error('offline'));throw new Error('offline');};
    f.editor.update('home','village',initial(),{gold:10});await tick();const state=f.editor.state;
    assert.ok(state.result.lines.length);assert.equal(state.result.valid,false);
    assert.equal(state.checking,false);assert.equal(state.confirmed,false);
  }
});

test('a stale validation response retries current geometry on the next tick instead of remaining stuck',async t=>{
  const f=fixture(t),options=initial();f.editor.update('home','village',options,{gold:10});
  f.complete(0,{stale:true});await tick();assert.equal(f.editor.state.confirmed,false);
  const retried=f.editor.update('home','village',options,{gold:10});
  assert.equal(retried.checking,true);assert.equal(retried.confirmed,false);assert.equal(f.requests.length,2);
  f.complete(1);await tick();assert.equal(f.editor.state.confirmed,true);assert.equal(f.editor.state.checking,false);
});

test('authoritative rejection keeps the checked shape invalid even when the wallet increases',async t=>{
  const f=fixture(t),options=initial(),draft=f.editor.update('home','village',options,{gold:10}).result;
  f.complete(0,{result:{...draft,provisional:false,siteValid:false,valid:false,code:'route-blocked',reason:'The platform is in water'}});await tick();
  const rejected=f.editor.update('home','village',options,{gold:100});
  assert.equal(rejected.confirmed,true,'the edit was checked, but the separate validity guard prevents purchase');
  assert.equal(rejected.result.valid,false);assert.equal(rejected.result.siteValid,false);
  assert.equal(rejected.result.code,'route-blocked');assert.deepEqual(rejected.result.lines,draft.lines);
  assert.equal(f.requests.length,1);
});

test('wallet changes update affordability without rerouting or repeating terrain validation',async t=>{
  const f=fixture(t),options=initial(),preview=f.railways.preview;
  f.railways.preview=(...args)=>({...preview(...args),cost:11});
  const draft=f.editor.update('home','village',options,{gold:20}).result;
  f.complete(0,{result:{...draft,provisional:false}});await tick();
  const rich=f.editor.update('home','village',options,{gold:20}),geometry=rich.result.lines;
  assert.equal(rich.confirmed,true);assert.equal(rich.result.valid,true);
  const poor=f.editor.update('home','village',options,{gold:10});
  assert.equal(poor.result.affordable,false);assert.equal(poor.result.valid,false);assert.equal(poor.confirmed,true,'geometry can remain checked while the wallet changes');
  assert.equal(poor.result.reason,'A railway costs 11 gold');
  const restored=f.editor.update('home','village',options,{gold:11});assert.equal(restored.result.valid,true);assert.equal(restored.confirmed,true);
  assert.deepEqual(restored.result.lines,geometry);assert.equal(f.previews.length,1);assert.equal(f.requests.length,1);
});

test('disposal prevents a late reply from reviving the route or scheduling more work',async t=>{
  const f=fixture(t),options=initial();f.editor.update('home','village',options,{gold:10});f.editor.dispose();f.editor.dispose();
  f.complete(0);await tick();const state=f.editor.update('home','village',options,{gold:10});
  assert.equal(state.result,null);assert.equal(state.confirmed,false);assert.equal(state.checking,false);
  assert.equal(f.previews.length,1);assert.equal(f.requests.length,1);
});
