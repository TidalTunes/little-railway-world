import {Group} from 'three';
import {box,cylinder} from './geometry.js';

/** A compact tank engine occupies one ordinary car slot. The boiler meets the
 * cab, windows sit on its walls, and wheels share the wagons' rail datum. */
export function buildSteamLocomotive(palette={}){
  const root=new Group();root.name='steam-locomotive';
  const body=palette.body??'teal',trim=palette.trim??'trim',dark=palette.dark??'metal',roof=palette.roof??'roofBlue';
  box(root,0,.35,0,.92,.20,2.12,'metal');
  box(root,0,.49,0,1.03,.10,2.14,body);
  box(root,0,.56,.28,.58,.15,1.30,'metal');
  box(root,0,.36,-1.28,.16,.12,.60,'metal');
  const boiler=cylinder(root,0,.95,.28,.36,.36,1.30,body,10);boiler.rotation.x=Math.PI/2;boiler.name='boiler';
  for(const z of [-.15,.68]){const band=cylinder(root,0,.95,z,.369,.369,.055,trim,10);band.rotation.x=Math.PI/2;}
  const face=cylinder(root,0,.95,.945,.335,.335,.04,dark,10);face.rotation.x=Math.PI/2;
  const lamp=cylinder(root,0,1.00,.973,.095,.095,.035,'lamp',8);lamp.rotation.x=Math.PI/2;
  const cab=box(root,0,.995,-.70,1.00,.91,.72,body);cab.name='cab';
  box(root,0,1.49,-.70,1.13,.13,.87,roof);
  for(const side of [-1,1]){
    box(root,side*.507,1.19,-.68,.018,.33,.39,'window').castShadow=false;
    box(root,side*.53,.58,-.69,.13,.12,.73,'metal');
    for(const z of [-.66,.08,.75]){
      cylinder(root,side*.48,.25,z,.25,.25,.15,'metal',10).rotation.z=Math.PI/2;
      cylinder(root,side*.561,.25,z,.105,.105,.018,trim,8).rotation.z=Math.PI/2;
    }
    box(root,side*.58,.27,.05,.045,.065,1.40,dark);
  }
  box(root,0,1.19,-1.067,.63,.31,.018,'window').castShadow=false;
  const chimney=cylinder(root,0,1.46,.60,.135,.12,.40,'metal',8);chimney.name='chimney';
  cylinder(root,0,1.69,.60,.19,.16,.09,'metal',8);
  cylinder(root,0,1.31,.03,.11,.14,.18,'gold',8);
  box(root,0,.47,1.10,1.03,.18,.14,dark);
  for(const side of [-1,1]){const buffer=cylinder(root,side*.32,.47,1.20,.10,.10,.10,'metal',8);buffer.rotation.x=Math.PI/2;}
  return root;
}
