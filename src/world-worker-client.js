/** A world's network is generated once. A bounded pair of workers shares that
 * immutable plan, keeping visible scenery from waiting behind one serial queue.
 * The worker-to-worker handoff keeps the large clone off the render thread and
 * excludes overview geometry, whose buffers already belong to the GPU view. */
export function createWorldWorker({WorkerClass,MessageChannelClass=globalThis.MessageChannel,
  detailWorkers=WorkerClass?1:(globalThis.navigator?.hardwareConcurrency>=4?2:1)}={}){
  const makeWorker=()=>WorkerClass?new WorkerClass(new URL('./world-worker.js',import.meta.url),{type:'module'}):
    new Worker(new URL('./world-worker.js',import.meta.url),{type:'module'});
  const pending=new Map(),queue=[],nodes=[];
  let nextId=0,disposed=false,failure,generated=false,peerStarted=false;
  const stats={workers:1,busy:0,queued:0,completedChunks:0,lastChunkMs:0};
  const abortError=()=>new DOMException('World request cancelled','AbortError');
  const refresh=()=>{stats.workers=disposed?0:nodes.filter(n=>n.ready&&!n.failed).length;stats.busy=nodes.filter(n=>n.currentId!==null).length;stats.queued=queue.filter(task=>pending.has(task.id)).length;};
  function finish(task,error,result){
    pending.delete(task.id);task.signal?.removeEventListener('abort',task.abort);
    if(error)task.reject(error);else task.resolve(result);
  }
  function failAll(error){for(const task of [...pending.values()])finish(task,error);queue.length=0;for(const node of nodes)node.currentId=null;refresh();}
  function post(node,task){
    task.node=node;
    if(task.type==='chunk'&&generated)node.currentId=task.id;
    try{node.worker.postMessage({id:task.id,type:task.type,payload:task.payload});}
    catch(error){if(node.currentId===task.id)node.currentId=null;finish(task,error);}
  }
  function dispatch(){
    if(disposed||failure)return;
    for(const node of nodes){
      if(!node.ready||node.failed||node.currentId!==null)continue;
      // A synchronous clone/post failure must not strand the remaining queue
      // on an otherwise idle worker. Keep going until one job actually starts.
      while(queue.length&&node.currentId===null){
        const task=queue.shift();if(pending.has(task.id))post(node,task);
      }
    }
    refresh();
  }
  function addWorker(primary){
    const node={worker:makeWorker(),primary,ready:primary,failed:false,currentId:null};nodes.push(node);
    node.worker.onmessage=({data})=>{
      if(disposed||node.failed)return;
      if(data.id==='peer-ready'){
        if(data.error){node.failed=true;node.worker.terminate();}
        else node.ready=true;
        dispatch();return;
      }
      if(node.currentId===data.id)node.currentId=null;
      const task=pending.get(data.id);
      if(task){
        if(data.error){const error=new Error(data.error.message);error.name=data.error.name??'Error';finish(task,error);}
        else{
          if(task.type==='generate'){generated=true;startPeer();}
          if(task.type==='chunk'){stats.completedChunks++;stats.lastChunkMs=data.result?.milliseconds??0;}
          finish(task,null,data.result);
        }
      }
      dispatch();
    };
    const onError=message=>{
      if(disposed||node.failed)return;
      const error=new Error(message);
      if(primary){failure=error;failAll(error);return;}
      // An optional worker can fail without stranding a visible region. Retry
      // its one active request on the primary and stop using the failed peer.
      node.failed=true;node.ready=false;node.worker.terminate();
      const task=pending.get(node.currentId);node.currentId=null;
      if(task){task.node=null;queue.unshift(task);}
      dispatch();
    };
    node.worker.onerror=event=>onError(event.message||'World worker failed');
    node.worker.onmessageerror=()=>onError('World worker returned an unreadable packet');
    return node;
  }
  function startPeer(){
    if(peerStarted||detailWorkers<2||!MessageChannelClass)return;peerStarted=true;
    let peer,channel;
    try{
      peer=addWorker(false);channel=new MessageChannelClass();
      peer.worker.postMessage({id:'peer-ready',type:'attach-port',port:channel.port2},[channel.port2]);
      nodes[0].worker.postMessage({type:'share-world',port:channel.port1},[channel.port1]);
    }catch{
      channel?.port1.close();channel?.port2.close();
      if(peer){peer.failed=true;peer.worker.terminate();}
    }
    refresh();
  }
  const primary=addWorker(true);
  return {
    stats,
    request(type,payload,{signal}={}){
      if(disposed)return Promise.reject(new DOMException('World replaced','AbortError'));
      if(failure)return Promise.reject(failure);
      if(signal?.aborted)return Promise.reject(abortError());
      return new Promise((resolve,reject)=>{
        const task={id:++nextId,type,payload,resolve,reject,signal};
        task.abort=()=>{if(pending.has(task.id)){
          const index=queue.indexOf(task);if(index>=0)queue.splice(index,1);
          finish(task,abortError());dispatch();
        }};
        signal?.addEventListener('abort',task.abort,{once:true});pending.set(task.id,task);
        if(type==='chunk'&&generated){queue.push(task);dispatch();}
        else post(primary,task);
      });
    },
    dispose(){
      if(disposed)return;disposed=true;for(const node of nodes)node.worker.terminate();
      failAll(new DOMException('World replaced','AbortError'));
    },
  };
}
