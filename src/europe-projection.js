/** Ellipsoidal Lambert conformal conic (2SP), using the serialized builder
 * constants. x is projected east; z is projected south. No axis is stretched.
 * https://proj.org/en/stable/operations/projections/lcc.html
 */
export function projectGeographic(projection,longitude,latitude){
  if(!Number.isFinite(longitude)||!Number.isFinite(latitude)||Math.abs(latitude)>=90){
    throw new TypeError('Geographic coordinates require finite longitude and latitude strictly between the poles');
  }
  const radians=Math.PI/180,phi=latitude*radians,e=projection.eccentricity;
  const eccentricSine=e*Math.sin(phi);
  const t=Math.tan(Math.PI/4-phi/2)/Math.pow((1-eccentricSine)/(1+eccentricSine),e/2);
  const rho=projection.radialConstant*Math.pow(t,projection.coneConstant);
  const theta=projection.coneConstant*(longitude-projection.centralLongitude)*radians;
  return{x:rho*Math.sin(theta),z:rho*Math.cos(theta)-projection.originRadius};
}

/** A local heading clockwise from geographic north, projected conformally. */
export function projectGeographicHeading(projection,longitude,latitude,bearing){
  // LCC meridian convergence is exactly n*(longitude-origin). The world uses
  // heading atan2(dx,dz), so geographic north initially points toward -z.
  const convergence=projection.coneConstant*(longitude-projection.centralLongitude)*Math.PI/180;
  return Math.PI-bearing+convergence;
}
