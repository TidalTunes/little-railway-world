#!/usr/bin/env python3
"""Build a reproducible, generalized full-Earth Natural Earth chart.

Uses the pinned dependencies/cache from build-europe-geography.py. The chart is
periodic in longitude; no coast or sand band is invented at the dateline/poles.
"""
import argparse
import importlib.util
import json
import math
from pathlib import Path

import shapely
import shapefile
from shapely import set_precision, make_valid
from shapely.affinity import translate
from shapely.geometry import box, shape, Point, MultiPolygon
from shapely.ops import unary_union, transform, linemerge, nearest_points

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('europe_builder',ROOT/'scripts/build-europe-geography.py')
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
RADIUS=1600
FACTOR=RADIUS*math.pi/180
WIDTH=2*math.pi*RADIUS
PRECISION=.000001
LAND_TOLERANCE=.075*FACTOR
SHORE=.9
MIN_AREA=12
SOURCES=base.SOURCES[:3]+[{
    'id':'ne_10m_populated_places_simple','version':'5.1.2',
    'url':'https://naturalearth.s3.amazonaws.com/10m_cultural/ne_10m_populated_places_simple.zip',
    'page':'https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/',
    'sha256':'2963ee08f7743f13f37d5243acd77a2f7a510e26a36c7e04b920f1b381f2b251'}]
CITY_NAMES='''Seattle|Portland|San Francisco|Los Angeles|Phoenix|Denver|Kansas City|Chicago|Toronto|Montreal|Boston|New York|Washington, D.C.|Atlanta|Dallas|Salt Lake City|Quito|Lima|La Paz|Santiago|Cordoba|Buenos Aires|Rosario|Sao Paulo|Rio de Janeiro|Brasilia|Cuiaba|Manaus|Lisbon|Madrid|Barcelona|Lyon|Turin|Milan|Vienna|Prague|Berlin|Brussels|Paris|Bordeaux|London|Birmingham|Manchester|Leeds|Cairo|Khartoum|Addis Ababa|Nairobi|Dar es Salaam|Lusaka|Johannesburg|Gaborone|Windhoek|Kinshasa|Abuja|Niamey|Algiers|Casablanca|Marrakesh|Istanbul|Ankara|Tehran|Tashkent|Almaty|Urumqi|Beijing|Shanghai|Wuhan|Chengdu|Kunming|Bangkok|Rangoon|Dhaka|Delhi|Lahore|Mumbai|Hyderabad|Chennai|Bengaluru|Tokyo|Nagoya|Kyoto|Osaka|Hiroshima|Sendai|Niigata|Kanazawa|Perth|Adelaide|Melbourne|Sydney|Brisbane|Alice Springs|Auckland|Hamilton|Wellington'''.split('|')
ALIASES={'Washington, D.C.':'washington','Sao Paulo':'sao-paulo','Brasilia':'brasilia','Cuiaba':'cuiaba','Cordoba':'cordoba','Rangoon':'yangon','Bangalore':'bengaluru','Marrakesh':'marrakech','Urumqi':'urumqi'}
RIVER_NAMES={'Amazonas','Amazon','Rio Amazonas','Negro','Madeira','Tapajós','Xingu','Paraná','Parana','São Francisco','Orinoco','Magdalena','Mississippi','Missouri','Ohio','Saint Lawrence','St. Lawrence','Mackenzie','Yukon','Colorado','Columbia','Rio Grande','Nile','White Nile','Blue Nile','Congo','Niger','Zambezi','Orange','Senegal','Danube','Rhine','Volga','Dnieper','Seine','Thames','Po','Ganges','Ganga','Brahmaputra','Indus','Yangtze','Chang Jiang','Huang He','Yellow','Mekong','Irrawaddy','Salween','Amur','Ob','Yenisei','Lena','Tigris','Euphrates','Murray','Darling'}
PROBES=[('Greenland',-42,74),('Iceland',-19,65),('Great Britain',-3,55),('Ireland',-8,53),('Madagascar',47,-19),('Sri Lanka',81,8),('Japan',138,36),('Taiwan',121,24),('Borneo',114,0),('Sumatra',102,-1),('Java',110,-7),('New Guinea',144,-6),('New Zealand North',176,-38),('New Zealand South',170,-44),('Tasmania',147,-42),('Cuba',-79.5,22),('Hispaniola',-71,19),('Puerto Rico',-66.5,18.2),('Fiji',178,-17.8),('Hawaii',-155.5,19.6),('Sakhalin',143,50),('Newfoundland',-56,49)]
# Illustrative environmental controls, not a measured global land-cover dataset.
SITES=[
 ('pacific-northwest','forest',-124,48),('canadian-forest-west','forest',-118,59),('canadian-forest-east','forest',-84,55),('alaska','forest',-150,63),('arctic-canada','plains',-105,72),
 ('prairies','farmland',-105,46),('great-plains','farmland',-98,36),('eastern-us','forest',-80,36),('mexico','desert',-109,28),('southwest-us','desert',-115,36),('central-america','forest',-88,16),
 ('amazon-west','forest',-72,-5),('amazon-east','forest',-54,-4),('brazil-highlands','plains',-48,-17),('pampas','farmland',-61,-33),('patagonia','plains',-68,-46),('atacama','desert',-70,-23),('colombia','forest',-72,6),
 ('western-europe','farmland',3,49),('eastern-europe','farmland',28,49),('scandinavia','forest',19,64),('iberia','plains',-5,39),('north-african-coast','plains',8,35),
 ('sahara-west','desert',-8,23),('sahara-central','desert',17,23),('sahara-east','desert',31,23),('sahel','plains',11,12),('congo','forest',22,-3),('east-africa','plains',36,-4),('southern-africa','plains',25,-24),('namib','desert',17,-22),('madagascar','forest',47,-20),
 ('arabia','desert',47,24),('iran','desert',56,30),('central-asia','plains',68,46),('gobi','desert',100,43),('tibet','plains',85,33),('siberia-west','forest',75,60),('siberia-middle','forest',108,62),('siberia-east','forest',140,62),('chukotka-east','plains',175,68),('chukotka-west','plains',-175,68),
 ('india','farmland',78,22),('china-north','farmland',115,35),('china-south','forest',107,24),('southeast-asia','forest',103,12),('indonesia','forest',116,-4),('japan','forest',138,38),
 ('australia-west','desert',124,-25),('australia-centre','desert',136,-25),('australia-east','plains',149,-26),('australia-south','farmland',145,-36),('new-guinea','forest',144,-6),('new-zealand','plains',171,-42),
 ('greenland-north','plains',-42,77,True),('greenland-south','plains',-44,67,True),
 *[(f'antarctica-{lon}','plains',lon,-82,True) for lon in [-170,-120,-60,0,60,120,170]],
]

def project(lon,lat):return lon*FACTOR,-lat*FACTOR

def polygonal(geometry):return MultiPolygon(list(base.parts_of(make_valid(geometry),'Polygon')))

def periodic_interior(land):
    # Buffer against real adjacent land across±180°, and continue polar land
    # beyond the chart edge so neither seam becomes a fictitious coastline.
    extended=unary_union([land,translate(land,xoff=-WIDTH),translate(land,xoff=WIDTH)])
    south=box(-WIDTH*1.5,90*FACTOR-.00001,WIDTH*1.5,90*FACTOR+SHORE*3)
    if land.intersects(box(-WIDTH/2,90*FACTOR-.01,WIDTH/2,90*FACTOR)):
        extended=unary_union([extended,south])
    return extended.buffer(-SHORE,quad_segs=2).intersection(land)

def build(cache):
    extent=box(-WIDTH/2,-math.pi*RADIUS/2,WIDTH/2,math.pi*RADIUS/2)
    raw=[]
    for record in base.archive_records(SOURCES[0],cache):
        geometry=make_valid(shape(record.shape.__geo_interface__))
        raw.extend(base.parts_of(geometry,'Polygon'))
    geographic=unary_union(raw)
    original=transform(project,geographic)
    probes=[(name,Point(project(lon,lat)),lon,lat) for name,lon,lat in PROBES]
    retained=[p for p in base.parts_of(original,'Polygon') if p.area>=MIN_AREA or any(p.covers(q) for _,q,_,_ in probes)]
    coastal=set_precision(polygonal(MultiPolygon(retained).simplify(LAND_TOLERANCE,preserve_topology=True)),PRECISION).intersection(extent)
    ocean=set_precision(extent.difference(coastal),PRECISION)
    interior=set_precision(periodic_interior(coastal),PRECISION)
    ocean_shore=coastal.difference(interior)
    lake_shapes=[];lake_features=[]
    for record in base.archive_records(SOURCES[2],cache):
        info=record.record.as_dict();name=info.get('name_en') or info.get('name')
        if not name or info.get('featurecla')!='Lake':continue
        geometry=transform(project,make_valid(shape(record.shape.__geo_interface__)))
        if geometry.area<70:continue
        geometry=set_precision(geometry.simplify(.8,preserve_topology=True),PRECISION).intersection(coastal)
        if geometry.is_empty:continue
        lake_shapes.append(geometry);p=geometry.representative_point()
        lake_features.append({'id':base.slug(name),'name':name,'sourceId':info['ne_id'],'area':round(geometry.area,3),'point':[round(p.x,6),round(p.y,6)]})
    lakes=set_precision(unary_union(lake_shapes),PRECISION)
    lake_margin=lakes.buffer(SHORE,quad_segs=2)
    land=coastal.difference(lakes);land_interior=interior.difference(lake_margin)
    lake_shore=interior.intersection(lake_margin).difference(lakes);ocean_shore=ocean_shore.difference(lakes)
    selected={}
    for record in base.archive_records(SOURCES[1],cache):
        info=record.record.as_dict();name=info.get('name_en') or info.get('name')
        if name not in RIVER_NAMES:continue
        entry=selected.setdefault(name,{'parts':[],'sourceIds':set(),'scaleRank':99})
        entry['parts'].append(transform(project,shape(record.shape.__geo_interface__)))
        entry['sourceIds'].add(info['ne_id']);entry['scaleRank']=min(entry['scaleRank'],info['scalerank'])
    rivers=[]
    for name,entry in sorted(selected.items()):
        joined=unary_union(entry['parts']);joined=joined if joined.geom_type=='LineString' else linemerge(joined)
        paths=[line.simplify(.8,preserve_topology=True) for line in base.parts_of(joined,'LineString') if line.length>=6]
        paths.sort(key=lambda line:(-line.length,line.bounds))
        rivers.append({'id':base.slug(name),'name':name,'scaleRank':entry['scaleRank'],'sourceIds':sorted(entry['sourceIds']),'paths':[base.coordinates(line) for line in paths]})
    records=[r.record.as_dict() for r in base.archive_records(SOURCES[3],cache)]
    # The extra .02 covers the circular-buffer chord approximation and rounding,
    # so every moved center retains a true four-unit Euclidean dry reservation.
    # Chordal buffer arcs slightly undercut the true disk at concave corners;
    # the .02 margin keeps the final rounded center at least four units dry.
    cities=[];safe_land=land_interior.buffer(-4.02,quad_segs=16)
    for name in CITY_NAMES:
        matches=[r for r in records if name in [r['name'],r['nameascii']]]
        if not matches:raise ValueError(f'City not found: {name}')
        # Duplicate names use the largest Natural Earth settlement; Hamilton is
        # intentionally New Zealand, not the larger Canadian settlement.
        if name=='Hamilton':matches=[r for r in matches if r['adm0_a3']=='NZL']
        if name=='Hyderabad':matches=[r for r in matches if r['adm0_a3']=='IND']
        info=max(matches,key=lambda r:r['pop_max']);lon=info['longitude'];lat=info['latitude'];p=Point(project(lon,lat))
        placed=p if safe_land.covers(p) else nearest_points(safe_land,p)[0]
        cities.append({'id':ALIASES.get(name,base.slug(name)),'name':info['name'],'longitude':lon,'latitude':lat,'x':round(placed.x,6),'z':round(placed.y,6),'sourceId':info['ne_id'],'sourcePopulation':info['pop_max'],'country':info['adm0name'],'inlandOffset':round(p.distance(placed),3)})
    greenland=next(p for p in base.parts_of(coastal,'Polygon') if p.covers(Point(project(-42,74))))
    ice=unary_union([land.intersection(box(-WIDTH/2,60*FACTOR,WIDTH/2,90*FACTOR)),land.intersection(greenland)])
    sites=[{'id':name,'type':kind,'longitude':lon,'latitude':lat,'x':round(project(lon,lat)[0],6),'z':round(project(lon,lat)[1],6),**({'ice':True} if extra else {})} for name,kind,lon,lat,*extra in SITES]
    shapes={'land':land,'landInterior':land_interior,'ocean':ocean,'oceanShore':ocean_shore,'lakes':lakes,'lakeShore':lake_shore,'ice':ice}
    if not all(g.is_valid for g in shapes.values()):raise ValueError('Generated topology is invalid')
    checks=[]
    for name,p,lon,lat in probes:
        if not land.covers(p):raise ValueError(f'Protected island disappeared: {name}')
        checks.append({'name':name,'longitude':lon,'latitude':lat,'point':[round(p.x,6),round(p.y,6)]})
    data={name:base.multipolygon_data(g) for name,g in shapes.items()}
    return {'version':1,'name':'Earth geographic base','coordinateOrder':'x,z','bbox':{'west':-180,'south':-90,'east':180,'north':90},
        'projection':{'type':'equirectangular','radius':RADIUS,'centralLongitude':0,'centralLatitude':0},
        'bounds':{'width':WIDTH,'depth':math.pi*RADIUS},'outline':[[-WIDTH/2,-math.pi*RADIUS/2],[WIDTH/2,-math.pi*RADIUS/2],[WIDTH/2,math.pi*RADIUS/2],[-WIDTH/2,math.pi*RADIUS/2],[-WIDTH/2,-math.pi*RADIUS/2]],
        **data,'shoreWidth':SHORE,'rivers':rivers,'lakeFeatures':sorted(lake_features,key=lambda r:r['name']),'cities':cities,'biomeSites':sites,'protectedIslands':checks,
        'sources':[{**source,'license':'Public domain','licenseURL':'https://www.naturalearthdata.com/about/terms-of-use/'} for source in SOURCES],
        'methodology':{'builder':'scripts/build-earth-geography.py','dependencies':{'shapely':'2.1.2','pyshp':'2.3.1'},'coastToleranceDegrees':.075,'minimumIslandArea':MIN_AREA,'precision':PRECISION,'shoreWidth':SHORE,
          'coast':'Union Natural Earth land, keep major and protected islands, simplify with topology preservation. Ocean is chart rectangle minus coastal land; inland lakes remain separate.',
          'seams':'Longitude-periodic land erosion and continued Antarctic polar land prevent artificial sand bands at the chart seams. The full globe joins both longitude boundaries and collapses each latitude pole.',
          'cities':'Deliberately distributed illustrative network, not a population ranking. Source points are moved minimally inland only when a four-unit dry reservation is needed. Natural Earth source population controls artistic scale and is not presented as current census data.',
          'rivers':'Named selection of source centerlines, merged by source name and simplified to0.8 chart units. Disconnected source paths remain separate.',
          'biomes':'Illustrative authored climate/vegetation controls; ice outlines are source land south of60S and the Greenland land component.'},
        'statistics':{'landPolygons':len(data['land']),'landVertices':sum(len(r) for p in data['land'] for r in p),'oceanVertices':sum(len(r) for p in data['ocean'] for r in p),'shoreVertices':sum(len(r) for p in data['oceanShore'] for r in p),'riverCount':len(rivers),'riverPaths':sum(len(r['paths']) for r in rivers),'riverVertices':sum(len(p) for r in rivers for p in r['paths']),'lakeCount':len(lake_features),'cityCount':len(cities),'maximumCityOffset':max(c['inlandOffset'] for c in cities)}}

def main():
    if shapely.__version__!='2.1.2' or shapefile.__version__!='2.3.1':raise RuntimeError('Use pinned shapely2.1.2 and pyshp2.3.1')
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--cache',type=Path,default=ROOT/'.qa/natural-earth');parser.add_argument('--output',type=Path,default=ROOT/'data/earth-geography.json');parser.add_argument('--check',action='store_true');args=parser.parse_args()
    data=build(args.cache);encoded=json.dumps(data,ensure_ascii=False,separators=(',',':'),allow_nan=False)+'\n'
    if args.check:
        if args.output.read_text()!=encoded:raise RuntimeError('Generated Earth geography differs')
    else:args.output.write_text(encoded)
    print(json.dumps({'bytes':len(encoded.encode()),**data['statistics']}))
if __name__=='__main__':main()
