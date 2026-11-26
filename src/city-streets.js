import * as THREE from 'three';
import Clipper from 'clipper-lib';
import {mesh} from './geometry.js';
import {biomeAt} from './biomes.js';
import {surfaceFor,surfaceDisplacement,surfaceOffset,surfacePoint} from './world-surface.js';
import {tessellateSurfaceGeometry} from './surface-tessellation.js';

const precision=100000;
// The colored land surface is at .018; a thin .008 clearance keeps the
// complete joined network above it without a raised curb or separate slab.
export const STREET_HEIGHT=.026;

/** Join the complete street network before triangulating it. Separate flat
 * strips leave coplanar overlaps and sharp triangular gaps at every junction. */
export function streetFootprint(world,streets,anchor){
  const paths=[];
  for(const street of streets){
    if(street.points.length<2||!(street.width>0))continue;
    const line=street.points.map(point=>{
      const p=surfaceDisplacement(world,anchor,point);
      return{X:Math.round(p.x*precision),Y:Math.round(p.z*precision)};
    }).filter((p,i,a)=>!i||p.X!==a[i-1].X||p.Y!==a[i-1].Y);
    if(line.length<2)continue;
    const offset=new Clipper.ClipperOffset(2,.008*precision),expanded=[];
    offset.AddPath(line,Clipper.JoinType.jtRound,Clipper.EndType.etOpenRound);
    offset.Execute(expanded,street.width*.5*precision);paths.push(...expanded);
  }
  if(!paths.length)return[];
  const union=new Clipper.Clipper(),tree=new Clipper.PolyTree();
  union.AddPaths(paths,Clipper.PolyType.ptSubject,true);
  union.Execute(Clipper.ClipType.ctUnion,tree,Clipper.PolyFillType.pftNonZero,Clipper.PolyFillType.pftNonZero);
  return Clipper.JS.PolyTreeToExPolygons(tree).map(({outer,holes})=>({
    outer:outer.map(p=>[p.X/precision,p.Y/precision]),
    holes:holes.map(ring=>ring.map(p=>[p.X/precision,p.Y/precision])),
  }));
}

export function buildCityStreets(parent,world,{surfaceRoot=null}={}){
  const cities=new Map((world.cities??[]).map(city=>[city.id,city])),groups=new Map(),spherical=!!surfaceFor(world);
  for(const street of world.cityStreets??[]){
    if(street.points.length<2)continue;
    const city=cities.get(street.cityId),center=Number.isFinite(city?.x)&&Number.isFinite(city?.z)?city:street.points[0];
    const material=world.biomes&&biomeAt(world,center.x,center.z)==='desert'?'gravel':'sand';
    const key=`${street.cityId??'network'}:${material}`;
    if(!groups.has(key))groups.set(key,{anchor:center,material,streets:[]});
    groups.get(key).streets.push(street);
  }
  const results=[];
  for(const {anchor,material,streets}of groups.values()){
    const shapes=streetFootprint(world,streets,anchor).map(({outer,holes})=>{
      const shape=new THREE.Shape(outer.map(([x,z])=>new THREE.Vector2(x,-z)));
      shape.holes=holes.map(ring=>new THREE.Path(ring.map(([x,z])=>new THREE.Vector2(x,-z))));
      return shape;
    });
    if(!shapes.length)continue;
    let geometry=new THREE.ShapeGeometry(shapes);geometry.rotateX(-Math.PI/2);
    if(spherical){const coarse=geometry;geometry=tessellateSurfaceGeometry(coarse,3);coarse.dispose();}
    const positions=geometry.getAttribute('position'),point={},physical=new THREE.Vector3();
    for(let i=0;i<positions.count;i++){
      surfaceOffset(world,anchor.x,anchor.z,positions.getX(i),positions.getZ(i),point);
      if(surfaceRoot){surfacePoint(world,point.x,STREET_HEIGHT,point.z,physical);positions.setXYZ(i,physical.x,physical.y,physical.z);}
      else positions.setXYZ(i,point.x,STREET_HEIGHT,point.z);
    }
    geometry.computeVertexNormals();
    const result=mesh(surfaceRoot??parent,geometry,material);result.name='joined-city-streets';
    result.userData.surfaceSpace=!!surfaceRoot;results.push(result);
  }
  return results;
}
