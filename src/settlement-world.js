import {createIslandWorld} from './island-world.js';
import {createFrontierIsland} from './frontier-island.js';
import {DEFAULT_PLAYERS} from './development.js';
import {FARM_VILLAGE_PLAYER} from './farm-villages.js';

/** Start from one homestead on the larger frontier. The compact prototype is
 * retained explicitly, without inheriting either showcase's infrastructure. */
export function createSettlementWorld({seed='first-settlement-v1',economy='loops',map='frontier',military=true}={}){
  const compact=map==='compact',world=compact?createIslandWorld({seed,trainCount:0}):createFrontierIsland({seed});
  const starterHouse={id:'home-1',kind:'house',x:-82,y:0,z:-43,rotation:0,
    scale:1,variant:0,ownerId:'teal',radius:Math.hypot(2.2,2.2)/2};
  const spawn={x:-82,z:-39.6,heading:0};
  // Hand-place a small, readable first grove. Procedural woods continue beyond
  // it, but every seed has enough reachable timber for the player's next home.
  const guaranteedTrees=[
    [-82,-38.65,.90,'round'],[-84.5,-37.5,1.08,'birch'],
    [-77.2,-40.3,1.04,'round'],[-85.8,-41.8,.94,'round'],
    [-79.0,-34.6,1.10,'birch'],[-83.0,-33.7,.98,'round'],
    [-88.0,-36.3,1.12,'round'],[-75.4,-36.7,.95,'birch'],
  ].map(([x,z,scale,variant],index)=>({id:`starter-tree-${index+1}`,kind:'tree',
    x,y:0,z,rotation:index*2.399963229728653,scale,variant,
    radius:.85*scale,biome:'forest'}));
  return {...world,name:compact?'First Settlement':'The Longshore',cities:[],connections:[],
    players:[...DEFAULT_PLAYERS,FARM_VILLAGE_PLAYER].map(player=>structuredClone(player)),
    traffic:{trainCount:0,circuits:[]},
    gameplay:{version:economy==='loops'?3:2,economy,ownerId:'teal',starterHouse,spawn,guaranteedTrees,farmVillageCount:compact?3:6,playerBotCount:3,
      ...(economy==='loops'&&military?{military:{enabled:true,startResources:100,startFood:100,startGold:100},startSeconds:300}:{}),
      // These clear only the footprint of the authored home, spawn and trees.
      // They do not erase the surrounding forest to make a rectangular lot.
      reservations:[{x:starterHouse.x,z:starterHouse.z,radius:starterHouse.radius+.65},
        {x:spawn.x,z:spawn.z,radius:1.05},
        ...guaranteedTrees.map(tree=>({x:tree.x,z:tree.z,radius:tree.radius+.22}))]},
    geography:{...world.geography,name:compact?'First Settlement':'The Longshore',kind:'settlement-island',
      description:compact?'A wooded island beginning with one home and a small grove of harvestable trees.':world.geography.description},
  };
}
