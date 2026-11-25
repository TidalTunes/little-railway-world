import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorldWorker } from '../src/world-worker-client.js';

class FakeWorker {
  static last;
  constructor(url, options) { FakeWorker.last = this; this.url = url; this.options = options; this.messages = []; }
  postMessage(message) { this.messages.push(message); }
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
