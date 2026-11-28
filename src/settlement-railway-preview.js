/** The visible curve never waits for a worker. Full terrain, clearing and
 * station-access checks run after selection or release, and only a matching
 * authoritative result can enable the purchase. */
export function createRailwayPreview(railways,planner){
  let key='',result=null,checking=false,confirmed=false,requested='',epoch=0,disposed=false,gold,resources;
  const state=()=>({key,result,checking,confirmed});
  function wallet(){
    if(!result)return;
    const costResource=result.costResource??'gold',balance=costResource==='resources'?resources:gold;
    if(!Number.isFinite(balance))return;
    const affordable=balance>=(result.cost??5),valid=!!result.siteValid&&affordable;
    if(result.affordable===affordable&&result.valid===valid)return;
    result={...result,affordable,valid,...(result.siteValid?{code:affordable?'ready':`not-enough-${costResource}`,reason:affordable?'Connect these cities':`A railway costs ${result.cost??5} ${costResource}`}:{})};
  }
  function clear(){epoch++;key=requested='';result=null;checking=confirmed=false;}
  return {
    update(from,to,options={},settings={}){
      if(disposed)return state();
      gold=settings.gold;resources=typeof settings.resources==='object'?settings.resources?.resources:settings.resources;
      const nextKey=railways.geometryKey(from,to,options);
      if(nextKey!==key){
        epoch++;key=nextKey;requested='';confirmed=false;checking=true;
        result=railways.preview(from,to,options);
        // Range and direction are exact model constraints. Keep these drafts
        // editable without waking the terrain worker for known failures.
        if(['out-of-range','wrong-direction','invalid-anchor'].includes(result.code))checking=false;
      }
      wallet();
      if(checking&&!settings.dragging&&requested!==key){
        requested=key;const token=epoch;
        const complete=response=>{
          if(disposed||token!==epoch)return;
          if(response.stale){key=requested='';checking=false;confirmed=false;return;}
          checking=false;confirmed=!!response.result&&!response.result.provisional&&!response.error;
          result=response.result??{...result,provisional:false,valid:false,siteValid:false,code:'planning-failed',reason:response.error??'Route checks could not finish'};
          wallet();
        };
        try{Promise.resolve(planner.request(from,to,options)).then(complete,()=>complete({error:'Route checks could not finish'}));}
        catch{complete({error:'Route checks could not finish'});}
      }
      return state();
    },
    get state(){return state();},
    clear,
    dispose(){clear();disposed=true;},
  };
}
