import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorldWorker } from '../src/world-worker-client.js';

class FakeWorker {
  static last;
  static all=[];
  constructor(url, options) { FakeWorker.last = this; FakeWorker.all.push(this); this.url = url; this.options = options; this.messages = []; this.transfers=[]; }
  postMessage(message,transfers=[]) { this.messages.push(message); this.transfers.push(transfers); }
  terminate() { this.terminated = true; }
  reply(id, result) { this.onmessage({data: {id, result}}); }
}

test('worker replies resolve their matching requests even out of order', async () => {
  const client = createWorldWorker({WorkerClass: FakeWorker}), worker = FakeWorker.last;
  const first = client.request('generate', {seed: 27}), second = client.request('chunk', {x: 0});
  assert.equal(worker.options.type, 'module');
  worker.reply(2, 'detail'); worker.reply(1, 'network');
  assert.deepEqual(await Promise.all([first, second]), ['network', 'detail']);
  client.dispose();
});

class FakeChannel {
  constructor(){this.port1={close(){this.closed=true;}};this.port2={close(){this.closed=true;}};}
}
async function pool(t){
  FakeWorker.all=[];
  const client=createWorldWorker({WorkerClass:FakeWorker,MessageChannelClass:FakeChannel,detailWorkers:2});
  t.after(()=>client.dispose());
  const primary=FakeWorker.all[0],generation=client.request('generate',{});
  primary.reply(1,{world:{}});await generation;
  return {client,primary,peer:FakeWorker.all[1]};
}
const chunks=worker=>worker.messages.filter(message=>message.type==='chunk');

test('detail peers receive a direct port, become eligible only when ready, and bound active work to two cells',async t=>{
  const {client,primary,peer}=await pool(t);
  assert.equal(primary.messages[1].type,'share-world');
  assert.equal(peer.messages[0].type,'attach-port');
  assert.deepEqual(primary.transfers[1],[primary.messages[1].port]);
  assert.deepEqual(peer.transfers[0],[peer.messages[0].port]);
  assert.equal(client.stats.workers,1);
  const first=client.request('chunk',{x:1}),second=client.request('chunk',{x:2}),third=client.request('chunk',{x:3});
  assert.equal(chunks(primary).length,1);assert.equal(chunks(peer).length,0);
  assert.equal(client.stats.queued,2);
  peer.reply('peer-ready',{ready:true});
  assert.equal(client.stats.workers,2);assert.equal(client.stats.busy,2);assert.equal(client.stats.queued,1);
  assert.equal(chunks(peer)[0].payload.x,2);
  peer.reply(3,{milliseconds:17});
  assert.equal(chunks(peer)[1].payload.x,3);assert.equal(chunks(primary).length,1);
  primary.reply(2,{milliseconds:20});peer.reply(4,{milliseconds:12});
  assert.deepEqual(await Promise.all([first,second,third]),[{milliseconds:20},{milliseconds:17},{milliseconds:12}]);
  assert.equal(client.stats.completedChunks,3);assert.equal(client.stats.lastChunkMs,12);
  assert.equal(client.stats.busy,0);assert.equal(client.stats.queued,0);
});

test('cancellation removes queued cells immediately but does not overbook workers with cancelled active jobs',async t=>{
  const {client,primary,peer}=await pool(t);peer.reply('peer-ready',{});
  const active=new AbortController(),queued=new AbortController();
  const first=client.request('chunk',{x:1},{signal:active.signal});
  const second=client.request('chunk',{x:2});
  const third=client.request('chunk',{x:3},{signal:queued.signal});
  const fourth=client.request('chunk',{x:4});
  queued.abort();await assert.rejects(third,{name:'AbortError'});assert.equal(client.stats.queued,1);
  active.abort();await assert.rejects(first,{name:'AbortError'});
  assert.equal(client.stats.busy,2);assert.equal(chunks(primary).length,1);
  primary.reply(2,{milliseconds:100});
  assert.equal(chunks(primary)[1].payload.x,4,'latest live request follows the unfinished cancelled job');
  assert.equal(client.stats.completedChunks,0,'discarded results do not count as completed visible work');
  primary.reply(5,{milliseconds:9});peer.reply(3,{milliseconds:10});await Promise.all([second,fourth]);
  assert.equal([...chunks(primary),...chunks(peer)].some(message=>message.payload.x===3),false);
  const aborted=new AbortController();aborted.abort();
  await assert.rejects(client.request('chunk',{}, {signal:aborted.signal}),{name:'AbortError'});
});

test('a failed optional worker retries its region on the primary without losing queued visible work',async t=>{
  const {client,primary,peer}=await pool(t);peer.reply('peer-ready',{});
  const first=client.request('chunk',{x:1}),second=client.request('chunk',{x:2}),third=client.request('chunk',{x:3});
  peer.onerror({message:'Peer stopped'});assert.equal(peer.terminated,true);assert.equal(client.stats.workers,1);
  primary.reply(2,'one');assert.equal(chunks(primary)[1].payload.x,2);
  peer.reply(3,'late stale result');assert.equal(client.stats.busy,1);
  primary.reply(3,'two');assert.equal(chunks(primary)[2].payload.x,3);
  primary.reply(4,'three');assert.deepEqual(await Promise.all([first,second,third]),['one','two','three']);
});

test('world replacement terminates both workers and rejects active and queued cells',async t=>{
  const {client,primary,peer}=await pool(t);peer.reply('peer-ready',{});
  const jobs=[1,2,3].map(x=>client.request('chunk',{x}));
  client.dispose();assert.equal(primary.terminated,true);assert.equal(peer.terminated,true);
  await Promise.all(jobs.map(job=>assert.rejects(job,{name:'AbortError'})));
  assert.equal(client.stats.busy,0);assert.equal(client.stats.queued,0);
});

test('a queued post failure cannot strand later requests on an idle worker',async t=>{
  const client=createWorldWorker({WorkerClass:FakeWorker}),worker=FakeWorker.last;
  t.after(()=>client.dispose());
  const generation=client.request('generate',{});worker.reply(1,{});await generation;
  const originalPost=worker.postMessage.bind(worker);
  worker.postMessage=message=>{if(message.payload?.x===2)throw new DOMException('Cannot clone cell','DataCloneError');originalPost(message);};
  const first=client.request('chunk',{x:1}),failed=client.request('chunk',{x:2}),survivor=client.request('chunk',{x:3});
  worker.reply(2,'first');await first;await assert.rejects(failed,{name:'DataCloneError'});
  assert.equal(chunks(worker).at(-1).payload.x,3);assert.equal(client.stats.busy,1);assert.equal(client.stats.queued,0);
  worker.reply(4,'survivor');assert.equal(await survivor,'survivor');
});

test('replacing a world terminates work and rejects pending and subsequent requests', async () => {
  const client = createWorldWorker({WorkerClass: FakeWorker}), worker = FakeWorker.last;
  const pending = client.request('chunk', {});
  client.dispose(); client.dispose();
  assert.equal(worker.terminated, true);
  await assert.rejects(pending, {name: 'AbortError'});
  await assert.rejects(client.request('generate', {}), {name: 'AbortError'});
  worker.reply(1, 'stale');
});

test('worker exceptions reject pending requests with useful error messages', async () => {
  const client = createWorldWorker({WorkerClass: FakeWorker}), worker = FakeWorker.last;
  const first = client.request('generate', {});
  worker.onmessage({data: {id: 1, error: {name: 'RangeError', message: 'Invalid city count'}}});
  await assert.rejects(first, {name: 'RangeError', message: 'Invalid city count'});
  const second = client.request('chunk', {}); worker.onerror({message: 'Geometry failed'});
  await assert.rejects(second, /Geometry failed/); client.dispose();
});
