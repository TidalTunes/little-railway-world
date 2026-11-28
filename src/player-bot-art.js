import * as THREE from 'three';
import {createPlayerPalette,playerColors} from './player-palette.js';
import {createTravellerArt,poseTravellerArt,TRAVELLER_SWING_DURATION} from './traveller-art.js';
import {createCharacterMarker} from './character-marker.js';
import {chartHeadingForSurface,rigidSurfacePoseMatrix,surfaceDistance} from './world-surface.js';

const walkingRadius=55;
const finite=value=>Number.isFinite(value)?value:0;

/** Other players use the same compact traveller and axe, with owned paint.
 * AI snapshots are authoritative in every layer; this renderer has no goals,
 * economy, pathfinding or independently advancing swing timer. */
export function createPlayerBotArt(parent,mapParent,world,{ownerId,markerParent=parent,markerMapParent=mapParent}={}){
  const owner=world.players?.find(player=>player.id===ownerId),palette=createPlayerPalette(owner),colors=playerColors(owner);
  const root=new THREE.Group();root.name=`player-bot-${ownerId??'neutral'}`;root.visible=false;root.userData.ownerId=ownerId;parent.add(root);
  const art=createTravellerArt(root,{coatMaterial:palette.body,capMaterial:palette.body,trouserMaterial:palette.dark});
  const marker=createCharacterMarker(markerParent,markerMapParent,world,{color:colors.dark,accent:colors.body,trim:colors.trim,name:root.name,self:false});
  const pose=new THREE.Matrix4(),shadowTilt=new THREE.Matrix4().makeRotationX(-Math.PI/2);
  let disposed=false;
  return {root,art,marker,
    update(snapshot,{camera,mapBlend=0,walkingWeight=0,focus,viewportHeight=800,reducedMotion=false}={}){
      if(disposed)return;
      const position=snapshot?.position,valid=position&&Number.isFinite(position.x)&&Number.isFinite(position.y)&&Number.isFinite(position.z);
      marker.update({position,initialized:!!valid,camera,mapBlend,walkingWeight,viewportHeight});
      root.visible=!!valid&&mapBlend<.999&&marker.characterReadable
        &&(walkingWeight<=.5||!focus||surfaceDistance(world,position,focus)<=walkingRadius);
      if(!valid)return;
      const angle=chartHeadingForSurface(world,position.x,position.z,finite(snapshot.heading));
      rigidSurfacePoseMatrix(world,position.x,position.y,position.z,angle,pose);
      pose.decompose(art.root.position,art.root.quaternion,art.root.scale);
      // Grounded positions include the human's .035-unit sole offset. The
      // contact shadow sits .036 above that same supporting surface.
      rigidSurfacePoseMatrix(world,position.x,position.y+.001,position.z,angle,pose);
      art.shadow.matrix.copy(pose).multiply(shadowTilt);art.shadow.matrixWorldNeedsUpdate=true;
      if(!root.visible)return;
      const speed=Math.max(0,finite(snapshot.speed));
      const remaining=THREE.MathUtils.clamp(finite(snapshot.swingTime),0,TRAVELLER_SWING_DURATION);
      poseTravellerArt(art,{gait:reducedMotion?0:finite(snapshot.gait),moving:reducedMotion?0:THREE.MathUtils.clamp(speed/.7,0,1),
        running:0,grounded:true,swingElapsed:TRAVELLER_SWING_DURATION-remaining});
    },
    dispose(){if(disposed)return;disposed=true;root.removeFromParent();art.dispose();root.clear();marker.dispose();Object.values(palette).forEach(material=>material.dispose());},
  };
}
