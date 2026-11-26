import * as THREE from 'three';

const blend=(a,b,t)=>a+(b-a)*t;
const geometric=(a,b,t)=>Math.exp(blend(Math.log(Math.max(1e-6,a)),Math.log(Math.max(1e-6,b)),t));
const smooth=t=>t*t*t*(t*(t*6-15)+10);

function capture(camera,target){
  camera.updateMatrixWorld(true);
  const point=new THREE.Vector3().copy(target),offset=camera.position.clone().sub(point),distance=Math.max(.001,offset.length());
  const projection=camera.userData.characterProjection;
  const perspective=projection?.perspective??(camera.isOrthographicCamera?0:1);
  const snapshot=camera.clone();snapshot.isOrthographicCamera=!!camera.isOrthographicCamera;snapshot.isPerspectiveCamera=!snapshot.isOrthographicCamera;
  return{camera:snapshot,target:point,distance,localDirection:offset.divideScalar(distance).applyQuaternion(camera.quaternion.clone().invert()),
    halfHeight:projection?.halfHeight??(camera.isOrthographicCamera?1:distance)/camera.projectionMatrix.elements[5],
    aspect:Math.abs(camera.projectionMatrix.elements[5]/camera.projectionMatrix.elements[0]),
    perspective,near:camera.near,far:camera.far};
}

function sphericalPath(sphere,from,to){
  if(!sphere||!Number.isFinite(sphere.radius)||sphere.radius<=0)return null;
  const center=new THREE.Vector3().copy(sphere.center),start=from.target.clone().sub(center),end=to.target.clone().sub(center);
  const startRadius=start.length(),endRadius=end.length();
  if(startRadius<1e-6||endRadius<1e-6)return null;
  start.divideScalar(startRadius);end.divideScalar(endRadius);
  const axis=new THREE.Vector3().crossVectors(start,end),crossLength=axis.length(),cosine=clamp(start.dot(end),-1,1);
  let angle=Math.atan2(crossLength,cosine);
  if(crossLength>1e-12)axis.divideScalar(crossLength);
  else if(cosine<0){
    // Antipodal points have infinitely many great circles. Choose a stable
    // orthogonal axis rather than normalizing a zero cross-product or lerping
    // their cancelling normals. Near-antipodal points retain their real arc.
    axis.crossVectors(start,Math.abs(start.x)<.9?new THREE.Vector3(1,0,0):new THREE.Vector3(0,0,1)).normalize();
    angle=Math.PI;
  }else{axis.set(0,1,0);angle=0;}
  const arc=new THREE.Quaternion().setFromAxisAngle(axis,angle),inverse=arc.clone().invert();
  return{center,radius:sphere.radius,start,startRadius,endRadius,arc,
    endOrientation:to.camera.quaternion.clone().premultiply(inverse),endUp:to.camera.up.clone().applyQuaternion(inverse)};
}

/** One camera dolly joins the character's real world and the orthographic
 * diorama. Its homogeneous projection continuously removes perspective while
 * preserving framing at the focus plane; no crossfade or geometry scaling is
 * needed. The normalized clip W is 1-p + p*distance/focusDistance. */
export function createCharacterTransition({duration=.78,reducedMotion={matches:false}}={}){
  const camera=new THREE.PerspectiveCamera(),target=new THREE.Vector3();camera.name='character-transition-camera';
  const localDirection=new THREE.Vector3(),surfaceNormal=new THREE.Vector3(),transport=new THREE.Quaternion(),identity=new THREE.Quaternion();
  let active=false,elapsed=0,span=duration,from=null,to=null,toWalking=false,walkingWeight=0,fromWalking=0;
  let spherePath=null;

  function copyEndpoint(endpoint){
    const source=endpoint.camera;
    camera.position.copy(source.position);camera.quaternion.copy(source.quaternion);camera.up.copy(source.up);
    camera.near=source.near;camera.far=source.far;camera.zoom=source.zoom;
    camera.aspect=endpoint.aspect;
    camera.projectionMatrix.copy(source.projectionMatrix);camera.projectionMatrixInverse.copy(source.projectionMatrixInverse);
    camera.isOrthographicCamera=!!source.isOrthographicCamera;camera.isPerspectiveCamera=!camera.isOrthographicCamera;
    camera.userData.characterProjection={perspective:endpoint.perspective,halfHeight:endpoint.halfHeight};
    target.copy(endpoint.target);camera.updateMatrixWorld(true);
  }

  function finish(){
    if(!to)return camera;
    copyEndpoint(to);active=false;elapsed=span;walkingWeight=Number(toWalking);return camera;
  }

  function update(dt){
    if(!active)return camera;
    if(reducedMotion.matches)return finish();
    elapsed=Math.min(span,elapsed+Math.max(0,Number.isFinite(dt)?dt:0));
    if(elapsed>=span)return finish();
    const t=smooth(elapsed/span),p=blend(from.perspective,to.perspective,t);
    const distance=geometric(from.distance,to.distance,t),halfHeight=geometric(from.halfHeight,to.halfHeight,t);
    if(spherePath){
      // A straight target lerp cuts through the globe. Transport the surface
      // normal along its great-circle arc, keeping elevation above that same
      // sphere, and interpolate the cameras in this moving tangent frame.
      transport.slerpQuaternions(identity,spherePath.arc,t);
      surfaceNormal.copy(spherePath.start).applyQuaternion(transport);
      target.copy(spherePath.center).addScaledVector(surfaceNormal,blend(spherePath.startRadius,spherePath.endRadius,t));
      camera.quaternion.slerpQuaternions(from.camera.quaternion,spherePath.endOrientation,t).premultiply(transport);
      camera.up.lerpVectors(from.camera.up,spherePath.endUp,t).applyQuaternion(transport).normalize();
    }else{
      camera.quaternion.slerpQuaternions(from.camera.quaternion,to.camera.quaternion,t);
      camera.up.lerpVectors(from.camera.up,to.camera.up,t).normalize();
      target.lerpVectors(from.target,to.target,t);
    }
    localDirection.lerpVectors(from.localDirection,to.localDirection,t).normalize().applyQuaternion(camera.quaternion);
    camera.position.copy(target).addScaledVector(localDirection,distance);
    if(spherePath){
      // Both the camera and its entire sightline to the focus must stay in
      // the outward half-space of the focus's tangent plane. A radial-only
      // clamp could put the camera above a different shore and still look
      // through the planet. This guard also handles unusual orbit headings.
      const elevation=target.distanceTo(spherePath.center)-spherePath.radius;
      const minimum=Math.max(.025,.05-elevation),outward=localDirection.dot(surfaceNormal)*distance;
      if(outward<minimum){
        camera.position.addScaledVector(surfaceNormal,minimum-outward);
        camera.up.copy(surfaceNormal);camera.lookAt(target);
      }
    }
    camera.near=geometric(from.near,to.near,t);camera.far=geometric(from.far,to.far,t);
    camera.aspect=blend(from.aspect,to.aspect,t);camera.zoom=blend(from.camera.zoom,to.camera.zoom,t);
    const nearW=1-p+p*camera.near/distance,farW=1-p+p*camera.far/distance;
    const depth=-(farW+nearW)/(camera.far-camera.near),offset=-nearW+depth*camera.near;
    camera.projectionMatrix.set(1/(halfHeight*camera.aspect),0,0,0, 0,1/halfHeight,0,0,
      0,0,depth,offset, 0,0,-p/distance,1-p);
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    camera.isPerspectiveCamera=true;camera.isOrthographicCamera=false;
    camera.userData.characterProjection={perspective:p,halfHeight};
    camera.updateMatrixWorld(true);
    walkingWeight=blend(fromWalking,Number(toWalking),t);return camera;
  }

  return{camera,target,update,finish,
    get active(){return active;},get toWalking(){return toWalking;},get walkingWeight(){return walkingWeight;},
    get progress(){return span>0?Math.min(1,elapsed/span):1;},
    begin({fromCamera,toCamera,fromTarget,toTarget,toWalking:destination,sphere}){
      // Capture before touching our camera: reversing may pass this very camera
      // as the source, and its generalized projection must survive unchanged.
      const previousActive=active;
      const source=capture(fromCamera,fromTarget??target),destinationState=capture(toCamera,toTarget);
      fromWalking=previousActive?walkingWeight:Number(!destination);
      from=source;to=destinationState;toWalking=Boolean(destination);elapsed=0;
      spherePath=sphericalPath(sphere,from,to);
      span=Math.max(.16,duration*Math.abs(Number(toWalking)-fromWalking));
      walkingWeight=fromWalking;copyEndpoint(from);active=true;
      if(reducedMotion.matches)finish();
      return camera;
    },
  };
}
