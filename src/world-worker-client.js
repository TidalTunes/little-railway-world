/** One worker owns a world's planner and geometry cache. Replacing the world
 * terminates outstanding work, rather than allowing old packets to leak in. */
export function createWorldWorker({WorkerClass}={}){
  // Keep the literal Worker constructor so Vite emits a separate worker bundle.
  const worker=WorkerClass?new WorkerClass(new URL('./world-worker.js',import.meta.url),{type:'module'}):
    new Worker(new URL('./world-worker.js',import.meta.url),{type:'module'});
  const pending=new Map();let nextId=0,disposed=false,failure;
  const failAll=error=>{for(const task of pending.values())task.reject(error);pending.clear();};
  worker.onmessage=({data})=>{
    const task=pending.get(data.id);if(!task)return;pending.delete(data.id);
    if(data.error){const error=new Error(data.error.message);error.name=data.error.name??'Error';task.reject(error);}
    else task.resolve(data.result);
  };
  worker.onerror=event=>{failure=new Error(event.message||'World worker failed');failAll(failure);};
  worker.onmessageerror=()=>{failure=new Error('World worker returned an unreadable packet');failAll(failure);};
  return {
    request(type,payload){
      if(disposed)return Promise.reject(new DOMException('World replaced','AbortError'));
      if(failure)return Promise.reject(failure);
      return new Promise((resolve,reject)=>{
        const id=++nextId;pending.set(id,{resolve,reject});
        try{worker.postMessage({id,type,payload});}catch(error){pending.delete(id);reject(error);}
      });
    },
    dispose(){
      if(disposed)return;disposed=true;worker.terminate();
      failAll(new DOMException('World replaced','AbortError'));
    },
  };
}
