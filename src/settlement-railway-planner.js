/** Geometry search lives off the render thread. Only the newest selection is
 * queued, and a result can enter the authority's cache only if its city and
 * infrastructure revision still matches the scene that was planned. */
export function createSettlementRailwayPlanner(world,railways,session,{getPlacements=()=>[],createWorker=()=>new Worker(new URL('./settlement-railway-worker.js',import.meta.url),{type:'module'})}={}){
  let worker=null,active=null,queued=null,nextId=0,disposed=false;
  function finish(result){
    const request=active;active=null;
    if(!request)return;
    const current=request.key===railways.geometryKey(request.from,request.to,request.options);
    const adopted=!result.error&&current&&railways.adoptPreview(request.from,request.to,result.result,request.key,request.options);
    request.resolve(adopted?{result:railways.evaluate(request.from,request.to,request.options)}:result.error?{error:result.error}:{stale:true});
    if(queued){const next=queued;queued=null;dispatch(next);}
  }
  function dispatch(request){
    if(disposed){request.resolve({stale:true});return;}
    try{
      if(!worker){
        const created=createWorker();worker=created;
        created.onmessage=({data})=>{if(worker===created&&active?.id===data.id)finish(data);};
        created.onerror=()=>{if(worker!==created)return;created.terminate();worker=null;finish({error:'Route planning could not finish. Choose the cities again.'});};
        const {mapTerrain,...terrain}=world;worker.postMessage({type:'initialize',world:terrain});
      }
      active=request;
      worker.postMessage({type:'plan',id:request.id,from:request.from,to:request.to,options:request.options,network:railways.snapshot(),placements:getPlacements(),
        state:{player:session.player.snapshot(),bots:session.bots.map(bot=>bot.game.snapshot()),buildings:session.buildings,
          actors:session.shared.getActors?.()??[]}});
    }catch(error){worker?.terminate();worker=null;active=request;finish({error:'Route planning is unavailable. Try selecting the cities again.'});}
  }
  return{
    request(from,to,options={}){
      if(disposed)return Promise.resolve({stale:true});
      return new Promise(resolve=>{
        const route={waypoints:structuredClone(options.waypoints??[])};
        const request={id:++nextId,from,to,options:route,key:railways.geometryKey(from,to,route),resolve};
        if(active){queued?.resolve({stale:true});queued=request;}else dispatch(request);
      });
    },
    dispose(){disposed=true;worker?.terminate();worker=null;active?.resolve({stale:true});queued?.resolve({stale:true});active=queued=null;},
  };
}
