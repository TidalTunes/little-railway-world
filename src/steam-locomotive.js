import {BufferGeometry,Float32BufferAttribute,Group} from 'three';
import {box,cylinder,mesh} from './geometry.js';

function cabRoof(){
  // One folded sheet, with a shallow crown and closed edges. Its underside
  // meets the cab wall rather than floating above a decorative fascia.
  const profile=[[-.55,1.395],[.55,1.395],[.55,1.445],[.32,1.505],[-.32,1.505],[-.55,1.445]],positions=[],indices=[];
  for(const z of[-1.14,-.26])for(const[x,y]of profile)positions.push(x,y,z);
  for(let i=1;i<5;i++)indices.push(0,i+1,i,6,6+i,7+i);
  for(let i=0;i<6;i++){const j=(i+1)%6;indices.push(i,j,i+6,j,j+6,i+6);}
  const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}

/** A compact industrial 0-6-0 tank engine occupies one ordinary car slot.
 * Team paint belongs to the water tanks and cab; the working machinery is
 * dark steel. Templates are consolidated with the existing freight batches. */
export function buildSteamLocomotive(palette={}){
  const root=new Group();root.name='steam-locomotive';
  const body=palette.body??'teal',dark=palette.dark??'roofBlue';
  box(root,0,.33,0,.88,.22,2.10,'metal').name='underframe';
  box(root,0,.485,0,1.02,.09,2.14,dark).name='running-board';
  box(root,0,.58,.20,.51,.18,1.33,'metal');
  box(root,0,.36,-1.28,.16,.12,.60,'metal').name='rear-coupling';
  const boiler=cylinder(root,0,.90,.20,.29,.29,1.32,'metal',10);boiler.rotation.x=Math.PI/2;boiler.name='boiler';
  const band=cylinder(root,0,.90,.48,.296,.296,.023,'rail',10);band.rotation.x=Math.PI/2;
  const smokebox=cylinder(root,0,.90,.805,.30,.30,.30,'metal',10);smokebox.rotation.x=Math.PI/2;smokebox.name='smokebox';
  const face=cylinder(root,0,.90,.975,.275,.275,.045,'roofBlue',10);face.rotation.x=Math.PI/2;face.name='smokebox-door';
  box(root,-.22,.90,.997,.033,.13,.025,'rail');
  const latch=cylinder(root,0,.90,1.009,.037,.037,.018,'rail',6);latch.rotation.x=Math.PI/2;
  const cab=box(root,0,.965,-.69,.98,.87,.73,body);cab.name='cab';
  mesh(root,cabRoof(),'metal').name='cab-roof';
  for(const side of [-1,1]){
    const tank=box(root,side*.36,.845,.10,.23,.63,1.11,body);tank.name=side<0?'water-tank-right':'water-tank-left';
    cylinder(root,side*.36,1.176,.08,.067,.067,.035,'metal',8);
    box(root,side*.496,1.18,-.71,.016,.28,.39,'window').castShadow=false;
    box(root,side*.30,1.265,-.319,.20,.22,.018,'window').castShadow=false;
    box(root,side*.53,.455,-.73,.10,.09,.43,'metal').name='cab-step';
    box(root,side*.34,.53,.77,.25,.19,.40,'metal').name='cylinder-block';
    for(const z of[-.66,.06,.75]){
      const wheel=cylinder(root,side*.48,.245,z,.245,.245,.12,'metal',12);wheel.rotation.z=Math.PI/2;wheel.name='driving-wheel';
      const hub=cylinder(root,side*.551,.245,z,.052,.052,.026,'rail',6);hub.rotation.z=Math.PI/2;
    }
    box(root,side*.571,.245,.045,.042,.055,1.44,'rail').name='coupling-rod';
  }
  box(root,0,1.20,-1.061,.58,.28,.016,'window').castShadow=false;
  const chimney=cylinder(root,0,1.34,.76,.092,.092,.38,'metal',8);chimney.name='chimney';
  cylinder(root,0,1.54,.76,.107,.107,.035,'metal',8);
  cylinder(root,0,1.205,.05,.085,.125,.13,'metal',8).name='steam-dome';
  box(root,0,.47,1.045,1.02,.17,.13,dark).name='buffer-beam';
  for(const side of[-1,1]){const buffer=cylinder(root,side*.31,.47,1.18,.075,.075,.14,'metal',8);buffer.rotation.x=Math.PI/2;}
  box(root,0,.45,1.15,.10,.09,.18,'metal').name='front-coupling';
  box(root,.32,.585,1.08,.025,.13,.025,'metal');
  box(root,.32,.665,1.08,.10,.105,.08,'metal');
  box(root,.32,.665,1.126,.064,.068,.016,'lamp').name='front-lamp';
  return root;
}
