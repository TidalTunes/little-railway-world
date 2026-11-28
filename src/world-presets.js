import {createStressWorld} from './stress-world.js';

export const DEFAULT_LAYOUT='match';

/** Saved art presets remain explicit alongside the default globe match.
 * The old ?cities= shortcut still opens the classic generator. */
export function launchLayout(parameters){
  return parameters.get('layout')??(parameters.has('cities')?'classic':DEFAULT_LAYOUT);
}

export async function createLaunchWorld(parameters,baseUrl){
  const layout=launchLayout(parameters);
  const options={...(parameters.has('seed')?{seed:parameters.get('seed')}:{}),
    ...(parameters.has('trains')?{trainCount:Number(parameters.get('trains'))}:{})};
  if(layout==='match'){
    const {createMatchWorld}=await import('./match-world.js');
    return createMatchWorld(options);
  }
  if(layout==='settlement'||layout==='settlement-compact'){
    const {createSettlementWorld}=await import('./settlement-world.js');
    return createSettlementWorld({...options,...(layout==='settlement-compact'?{map:'compact'}:{})});
  }
  if(layout==='island'){
    const {createIslandWorld}=await import('./island-world.js');
    return createIslandWorld(options);
  }
  if(layout==='earth'){
    const {createEarthWorld}=await import('./earth-world.js');
    return createEarthWorld(options);
  }
  if(layout==='europe'){
    const {createEuropeWorld}=await import('./europe-world.js');
    return createEuropeWorld(options);
  }
  if(layout==='stress')return createStressWorld({cities:parameters.has('cities')?Number(parameters.get('cities')):256,
    trains:parameters.has('trains')?Number(parameters.get('trains')):2048,seed:parameters.get('seed')??'continental-railway'});
  if(['crossroads','showcase'].includes(layout)){
    const response=await fetch(new URL(`./worlds/${layout}.json`,baseUrl));
    if(!response.ok)throw new Error('Could not load the authored world');
    const input=await response.json();
    if(parameters.has('seed'))input.seed=parameters.get('seed');
    return input;
  }
  return {seed:parameters.get('seed')??27,cityCount:Number(parameters.get('cities'))||8};
}
