#!/usr/bin/env python3
"""Build the compact, projected Natural Earth Europe subset.

Reproduce with Python 3.10+ and the pinned geometry dependencies:
  python3 -m venv .qa/europe-geography-env
  .qa/europe-geography-env/bin/pip install shapely==2.1.2 pyshp==2.3.1
  .qa/europe-geography-env/bin/python scripts/build-europe-geography.py

Only the derived JSON belongs in version control. Downloaded archives are
cached under ignored .qa/natural-earth and checked against pinned SHA-256s.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path
import re
import unicodedata
import urllib.request
import zipfile

import shapefile
import shapely
from shapely import make_valid, set_precision
from shapely.affinity import affine_transform
from shapely.geometry import LineString, MultiPolygon, Point, Polygon, box, shape
from shapely.geometry.polygon import orient
from shapely.ops import linemerge, unary_union

ROOT = Path(__file__).resolve().parents[1]
BBOX = (-26.0, 30.0, 45.5, 71.5)
LONGITUDE_ORIGIN, LATITUDE_ORIGIN = 9.75, 50.75
STANDARD_PARALLEL, LATITUDE_SCALE = 52.0, 36.0
LONGITUDE_SCALE = LATITUDE_SCALE * math.cos(math.radians(STANDARD_PARALLEL))
LAND_TOLERANCE, RIVER_TOLERANCE = .55, .22
MIN_ISLAND_AREA, PRECISION = .4, .001
SHORE_WIDTH = .9
SOURCES = [
    {
        "id": "ne_10m_land", "version": "5.1.1",
        "url": "https://naturalearth.s3.amazonaws.com/10m_physical/ne_10m_land.zip",
        "page": "https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-land/",
        "sha256": "e547d749445eaa0964aba76738090ec88f5e63c4585122170f98c67a7ea922dc",
    },
    {
        "id": "ne_10m_rivers_lake_centerlines", "version": "5.0.0",
        "url": "https://naturalearth.s3.amazonaws.com/10m_physical/ne_10m_rivers_lake_centerlines.zip",
        "page": "https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-rivers-lake-centerlines/",
        "sha256": "ded71b01870855ccfe19b51f2ec14c9bb48fae23c0e9f3c11974d426433b5c38",
    },
    {
        "id": "ne_10m_lakes", "version": "5.0.0",
        "url": "https://naturalearth.s3.amazonaws.com/10m_physical/ne_10m_lakes.zip",
        "page": "https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-lakes/",
        "sha256": "0803a06f9c3cb4671d89b68c48b142aad9366ba40f665245e12a913fbc61722a",
    },
    {
        "id": "ne_10m_lakes_europe", "version": "5.0.0",
        "url": "https://naturalearth.s3.amazonaws.com/10m_physical/ne_10m_lakes_europe.zip",
        "page": "https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-lakes/",
        "sha256": "c0b1f0da4dce6af3b27c49b3ed11a664d801ff3d140ca5b9814e7e85a35c1de1",
    },
]
LAKE_NAMES = {
    "Ladoga", "Onega", "Vänern", "Vättern", "Geneva", "Constance", "Balaton", "Saimaa",
    "Päijänne", "Peipus", "Pihkva", "Inari", "Pielinen", "Mälaren", "Neagh", "Skadar",
    "Como", "Garda", "Loch Ness", "Loch Lomond", "Mjøsa", "Ilmen", "Oulujärvi", "Van",
    "Tuz", "Sevan", "Neuchâtel", "Zurich", "Lucerne", "Lugano", "Neusiedl", "Beyşehir",
    "Eğirdir", "Lower Erne", "Corrib", "Torneträsk", "Siljan", "Võrtsjärv",
}
# Explicit cartographic selection, not a claim to include every major river.
RIVER_NAMES = {
    "Rhine", "Danube", "Seine", "Thames", "Po", "Dnieper", "Volga", "Don",
    "Elbe", "Oder", "Vistula", "Loire", "Rhône", "Garonne", "Tagus", "Douro",
    "Ebro", "Guadiana", "Guadalquivir", "Tiber", "Sava", "Drava", "Drau",
    "Tisza", "Main", "Moselle", "Meuse", "Scheldt", "Weser", "Dniester", "Prut",
    "Neman", "Daugava", "Neva", "Northern Dvina", "Sukhona", "Glomma", "Göta älv",
    "Shannon", "Severn", "Trent", "Vltava", "Moskva", "Oka", "Kuban", "Maritsa",
    "Nile", "Rosetta Branch", "Damietta Branch", "Kızılırmak", "Þjórsá",
    "Waal", "Lek", "Nederrijn", "IJssel", "Chilia branch", "Sulina branch",
    "Sfântu Gheorghe branch",
}
ALIASES = {"Drau": "Drava"}
# These known island interior probes protect small, recognizable islands from
# the area filter. Coordinates select source polygons; they do not redraw them.
ISLAND_PROBES = [
    ("Great Britain", -3.0, 55.0), ("Ireland", -8.0, 53.0), ("Iceland", -19.0, 65.0),
    ("Sicily", 14.0, 37.5), ("Sardinia", 9.0, 40.0), ("Corsica", 9.0, 42.0),
    ("Crete", 25.0, 35.2), ("Cyprus", 33.2, 35.0), ("Mallorca", 3.0, 39.6),
    ("Menorca", 4.1, 39.95), ("Ibiza", 1.4, 39.0), ("Malta", 14.44, 35.89),
    ("Gozo", 14.25, 36.04), ("Rhodes", 28.0, 36.2), ("Lesbos", 26.3, 39.2),
    ("Euboea", 23.9, 38.6), ("Corfu", 19.8, 39.6), ("Shetland", -1.2, 60.3),
    ("Orkney", -3.0, 59.0), ("Bornholm", 14.9, 55.15), ("Gotland", 18.55, 57.5),
    ("Oland", 16.65, 56.7), ("Zealand", 11.8, 55.5), ("Funen", 10.3, 55.3),
    ("Faroe Streymoy", -6.985, 62.125), ("Sao Miguel", -25.5, 37.8),
]
BIOME_SITES = [
    ("iceland", "Iceland", "plains", -19, 65),
    ("ireland", "Ireland", "plains", -8, 53),
    ("scotland", "Scottish Highlands", "forest", -4.5, 57),
    ("england", "English Lowlands", "farmland", -1.5, 52),
    ("norway", "Western Scandinavia", "forest", 7, 61),
    ("sweden", "Scandinavian Forest", "forest", 15, 64),
    ("finland", "Finnish Forest", "forest", 27, 64),
    ("karelia", "Karelia", "forest", 34, 64),
    ("baltic", "Baltic Forest", "forest", 25, 57),
    ("eastern-europe", "Eastern European Forest", "forest", 39, 58),
    ("denmark", "Danish Lowlands", "farmland", 10, 56),
    ("benelux", "Low Countries", "farmland", 5, 51.5),
    ("northern-france", "Northern France", "farmland", 2, 49),
    ("germany", "German Lowlands", "farmland", 10.5, 51.8),
    ("poland", "Polish Plain", "farmland", 19, 52),
    ("ukraine", "Ukrainian Plain", "farmland", 30.5, 49),
    ("southern-russia", "Southern Russian Plain", "farmland", 39, 50),
    ("pannonian", "Pannonian Plain", "farmland", 20, 46.7),
    ("po", "Po Valley", "farmland", 10, 45),
    ("black-forest", "Central European Uplands", "forest", 8.3, 47.8),
    ("southern-france", "Southern France", "plains", 3, 44.2),
    ("iberia", "Iberian Plateau", "plains", -4, 40),
    ("portugal", "Atlantic Iberia", "plains", -8, 39.5),
    ("andalusia", "Southern Iberia", "plains", -4.5, 36.8),
    ("italy", "Italian Peninsula", "plains", 13.3, 42),
    ("islands", "Western Mediterranean Islands", "plains", 9, 39),
    ("greece", "Greek Peninsula", "plains", 23, 38),
    ("balkans", "Balkan Interior", "forest", 22, 43),
    ("anatolia", "Anatolia", "plains", 32, 39),
    ("caucasus", "Caucasus Foothills", "forest", 41.5, 43),
    ("maghreb", "Mediterranean Maghreb", "plains", 2, 36),
    ("western-sahara", "Western Sahara Margin", "desert", -5, 31.5),
    ("central-sahara", "Central Sahara Margin", "desert", 8, 31.5),
    ("libya", "Libyan Desert", "desert", 20, 31.5),
    ("egypt", "Egyptian Desert", "desert", 31, 30.5),
]


def project(lon, lat):
    return ((lon - LONGITUDE_ORIGIN) * LONGITUDE_SCALE, (LATITUDE_ORIGIN - lat) * LATITUDE_SCALE)


def projected(geometry):
    return affine_transform(geometry, [LONGITUDE_SCALE, 0, 0, -LATITUDE_SCALE,
                                      -LONGITUDE_ORIGIN * LONGITUDE_SCALE, LATITUDE_ORIGIN * LATITUDE_SCALE])


def parts_of(geometry, kind):
    if geometry.geom_type == kind:
        yield geometry
    elif hasattr(geometry, "geoms"):
        for part in geometry.geoms:
            yield from parts_of(part, kind)


def archive_records(source, cache):
    path = cache / (source["id"] + ".zip")
    if not path.exists():
        urllib.request.urlretrieve(source["url"], path)
    checksum = hashlib.sha256(path.read_bytes()).hexdigest()
    if checksum != source["sha256"]:
        raise RuntimeError(f"Source checksum changed for {source['id']}: {checksum}")
    with zipfile.ZipFile(path) as archive:
        stem = source["id"]
        reader = shapefile.Reader(shp=archive.open(stem + ".shp"),
                                 dbf=archive.open(stem + ".dbf"),
                                 shx=archive.open(stem + ".shx"), encoding="utf-8")
        yield from reader.iterShapeRecords()


def coordinates(ring):
    return [[round(x, 3), round(z, 3)] for x, z in ring.coords]


def multipolygon_data(geometry):
    polygons = sorted(parts_of(geometry, "Polygon"), key=lambda part: (-part.area, part.bounds))
    result = []
    for polygon in polygons:
        # Stable ring starting vertices and direction make output reproducible.
        polygon = orient(polygon.normalize(), sign=1)
        holes = sorted(polygon.interiors, key=lambda ring: (-Polygon(ring).area, ring.bounds))
        result.append([coordinates(polygon.exterior)] + [coordinates(ring) for ring in holes])
    return result


def slug(name):
    ascii_name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", ascii_name).strip("-")


def build(cache):
    geographic_extent = box(*BBOX)
    southwest, northeast = project(BBOX[0], BBOX[1]), project(BBOX[2], BBOX[3])
    # Snap the clipping rectangle too: independently rounding a nearly coincident
    # coast/rectangle vertex only at JSON serialization can invalidate the ocean.
    extent = set_precision(box(southwest[0], northeast[1], northeast[0], southwest[1]), PRECISION)
    raw_land = []
    for record in archive_records(SOURCES[0], cache):
        geometry = shape(record.shape.__geo_interface__)
        if not geometry.is_valid:
            geometry = make_valid(geometry)
        clipped = geometry.intersection(geographic_extent)
        if not clipped.is_empty:
            raw_land.append(projected(clipped))
    original_land = unary_union(raw_land)
    probes = [(name, Point(project(lon, lat)), lon, lat) for name, lon, lat in ISLAND_PROBES]
    protected = {name for name, point, _, _ in probes if original_land.covers(point)}
    retained = [polygon for polygon in parts_of(original_land, "Polygon")
                if polygon.area >= MIN_ISLAND_AREA or any(polygon.covers(point) for _, point, _, _ in probes)]
    land = set_precision(MultiPolygon(retained).simplify(LAND_TOLERANCE, preserve_topology=True), PRECISION)
    land = land.intersection(extent)
    ocean = set_precision(extent.difference(land), PRECISION)
    land_interior = set_precision(land.buffer(-SHORE_WIDTH, quad_segs=2), PRECISION).intersection(land)
    ocean_shore = land.difference(land_interior)
    if not land.is_valid or not ocean.is_valid or land.intersection(ocean).area > 1e-6:
        raise RuntimeError("Land/ocean topology is invalid")

    # Inland waters have their own semantics. Do not turn lakes into ocean when
    # subtracting them from dry land or when deriving the separate bank bands.
    coast_land, coast_interior = land, land_interior
    selected_lakes = {}
    for source in SOURCES[2:]:
        for record in archive_records(source, cache):
            attributes = record.record.as_dict()
            name = attributes.get("name_en") or attributes.get("name")
            if not name:
                continue
            geometry = shape(record.shape.__geo_interface__)
            if not geometry.is_valid:
                geometry = make_valid(geometry)
            geometry = projected(geometry.intersection(geographic_extent))
            if geometry.is_empty or geometry.area < 2.4:
                continue
            if name not in LAKE_NAMES and not (attributes["featurecla"] == "Lake" and geometry.area >= 40):
                continue
            geometry = set_precision(geometry.simplify(.25, preserve_topology=True), PRECISION).intersection(coast_land)
            if geometry.is_empty:
                continue
            entry = selected_lakes.setdefault(name, {"geometries": [], "sourceIds": set(), "scaleRank": 99})
            entry["geometries"].append(geometry)
            entry["sourceIds"].add(attributes["ne_id"])
            entry["scaleRank"] = min(entry["scaleRank"], attributes["scalerank"])
    lake_features = []
    lake_shapes = []
    for name, entry in sorted(selected_lakes.items()):
        geometry = unary_union(entry["geometries"])
        lake_shapes.append(geometry)
        point = geometry.representative_point()
        lake_features.append({"id": slug(name), "name": name, "sourceIds": sorted(entry["sourceIds"]),
                              "scaleRank": entry["scaleRank"], "area": round(geometry.area, 3),
                              "point": [round(point.x, 3), round(point.y, 3)],
                              "bounds": [round(value, 3) for value in geometry.bounds]})
    lakes = set_precision(unary_union(lake_shapes), PRECISION)
    lake_margin = set_precision(lakes.buffer(SHORE_WIDTH, quad_segs=2), PRECISION)
    land = coast_land.difference(lakes)
    land_interior = coast_interior.difference(lake_margin)
    ocean_shore = ocean_shore.difference(lakes)
    lake_shore = coast_interior.intersection(lake_margin).difference(lakes)
    if not all(geometry.is_valid for geometry in [land, lakes, land_interior, ocean_shore, lake_shore]):
        raise RuntimeError("Lake/shore topology is invalid")

    selected = {}
    for record in archive_records(SOURCES[1], cache):
        attributes = record.record.as_dict()
        name = attributes.get("name_en") or attributes.get("name")
        if name not in RIVER_NAMES:
            continue
        geometry = shape(record.shape.__geo_interface__).intersection(geographic_extent)
        if geometry.is_empty:
            continue
        name = ALIASES.get(name, name)
        entry = selected.setdefault(name, {"geometries": [], "sourceIds": set(), "scaleRank": 99})
        entry["geometries"].append(projected(geometry))
        entry["sourceIds"].add(attributes["ne_id"])
        entry["scaleRank"] = min(entry["scaleRank"], attributes["scalerank"])
    rivers = []
    for name, entry in sorted(selected.items()):
        union = unary_union(entry["geometries"])
        merged = union if union.geom_type == "LineString" else linemerge(union)
        lines = []
        for line in parts_of(merged, "LineString"):
            line = set_precision(line.simplify(RIVER_TOLERANCE, preserve_topology=True), PRECISION)
            if line.length > PRECISION:
                lines.append(line)
        lines.sort(key=lambda line: (-line.length, line.bounds))
        rivers.append({"id": slug(name), "name": name, "scaleRank": entry["scaleRank"],
                       "sourceIds": sorted(entry["sourceIds"]), "paths": [coordinates(line) for line in lines]})
    required_rivers = {"Rhine", "Danube", "Seine", "Thames", "Po", "Dnieper", "Volga"}
    if not required_rivers.issubset(selected):
        raise RuntimeError("A required river disappeared from the source data")
    island_checks = []
    for name, point, lon, lat in probes:
        if name not in protected:
            raise RuntimeError(f"Island probe is outside source land: {name}")
        if not land.covers(point):
            raise RuntimeError(f"Simplification lost a protected island probe: {name}")
        island_checks.append({"name": name, "longitude": lon, "latitude": lat,
                              "point": [round(point.x, 3), round(point.y, 3)]})
    land_data, ocean_data = multipolygon_data(land), multipolygon_data(ocean)
    interior_data, shore_data = multipolygon_data(land_interior), multipolygon_data(ocean_shore)
    biome_sites = [{"id": id_, "name": name, "type": type_, "longitude": lon, "latitude": lat,
                    "x": round(project(lon, lat)[0], 3), "z": round(project(lon, lat)[1], 3)}
                   for id_, name, type_, lon, lat in BIOME_SITES]
    return {
        "version": 1, "name": "Europe geographic base", "coordinateOrder": "x,z",
        "bbox": {"west": BBOX[0], "south": BBOX[1], "east": BBOX[2], "north": BBOX[3]},
        "projection": {"type": "equirectangular", "sourceCRS": "EPSG:4326",
                       "centralLongitude": LONGITUDE_ORIGIN, "centralLatitude": LATITUDE_ORIGIN,
                       "standardParallel": STANDARD_PARALLEL, "unitsPerLatitudeDegree": LATITUDE_SCALE,
                       "unitsPerLongitudeDegree": LONGITUDE_SCALE,
                       "xFormula": "(longitude - 9.75) * 36 * cos(52 degrees)",
                       "zFormula": "(50.75 - latitude) * 36", "north": "-z", "east": "+x"},
        "bounds": {"width": northeast[0] - southwest[0], "depth": southwest[1] - northeast[1]},
        "outline": [[round(extent.bounds[0], 3), round(extent.bounds[1], 3)],
                    [round(extent.bounds[2], 3), round(extent.bounds[1], 3)],
                    [round(extent.bounds[2], 3), round(extent.bounds[3], 3)],
                    [round(extent.bounds[0], 3), round(extent.bounds[3], 3)]],
        "land": land_data, "landInterior": interior_data, "ocean": ocean_data,
        "oceanShore": shore_data, "shoreWidth": SHORE_WIDTH, "rivers": rivers,
        "lakes": multipolygon_data(lakes), "lakeShore": multipolygon_data(lake_shore), "lakeFeatures": lake_features,
        "biomeSites": biome_sites,
        "protectedIslands": island_checks,
        "sources": [{**source, "license": "Public domain",
                     "licenseURL": "https://www.naturalearthdata.com/about/terms-of-use/"} for source in SOURCES],
        "methodology": {
            "builder": "scripts/build-europe-geography.py",
            "dependencies": {"shapely": "2.1.2", "pyshp": "2.3.1"},
            "coastline": "Union Natural Earth land pieces, clip to geographic bbox, project, filter tiny islands, simplify with topology preservation, snap to precision grid. Ocean is rectangular extent minus this coastal land; final land additionally excludes inland lake water.",
            "landTolerance": LAND_TOLERANCE, "riverTolerance": RIVER_TOLERANCE,
            "precision": PRECISION, "minimumIslandArea": MIN_ISLAND_AREA,
            "islandPolicy": "Retain polygons with original projected area >=0.4 square units, plus every protected island polygon. No artificial islands or coastline widening.",
            "shore": "Coastal land is eroded inward by 0.9 units with polygonal rounded corners, snapped to 0.001. oceanShore is that coastal band minus lake water. landInterior also excludes lakes buffered outward 0.9 units; lakeShore is the remaining inland lake band. Ocean remains rectangle minus original simplified coast-land. Tiny islands may consist entirely of shoreline.",
            "lakes": "Use the base and Europe supplement. Select named lakes of at least 40 projected square units, plus explicitly selected recognizable lakes of at least 2.4 square units. Simplify at 0.25 units and clip water to coastal land. Source reservoir categories are excluded except named natural lakes classified as reservoirs, such as Mjosa. Lakes remain separate from ocean; lakeFeatures records names, source IDs and interior probes without duplicating their polygons.",
            "rivers": "Explicit named cartographic selection. Combine source river and lake-centerline parts of each name, merge connected lines, clip to bbox, project and simplify. Paths preserve source connectivity; disconnected parts stay separate. Width is intentionally left to the renderer.",
            "riverAliases": ALIASES,
            "biomes": "Named hand-authored illustrative control points reflecting broad European landscapes. These are art direction, not measured land-cover boundaries; mountain regions are supplied separately.",
            "accuracy": "Stylized small-scale physical geography, not navigation data. Bbox includes neighboring North African and Asian land. Projection uses the true east-west scale at latitude 52; areas and distances are not geodesic.",
        },
        "statistics": {"landPolygons": len(land_data), "oceanPolygons": len(ocean_data),
                       "landVertices": sum(len(ring) for polygon in land_data for ring in polygon),
                       "landInteriorVertices": sum(len(ring) for polygon in interior_data for ring in polygon),
                       "oceanShoreVertices": sum(len(ring) for polygon in shore_data for ring in polygon),
                       "riverCount": len(rivers), "riverPaths": sum(len(river["paths"]) for river in rivers),
                       "riverVertices": sum(len(path) for river in rivers for path in river["paths"]),
                       "lakeCount": len(lake_features), "lakeVertices": sum(len(ring) for polygon in multipolygon_data(lakes) for ring in polygon),
                       "landArea": round(land.area, 3), "oceanArea": round(ocean.area, 3), "lakeArea": round(lakes.area, 3)},
    }


def main():
    if shapely.__version__ != "2.1.2" or shapefile.__version__ != "2.3.1":
        raise RuntimeError("Reproducible builds require shapely==2.1.2 and pyshp==2.3.1")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cache", type=Path, default=ROOT / ".qa" / "natural-earth")
    parser.add_argument("--output", type=Path, default=ROOT / "data" / "europe-geography.json")
    parser.add_argument("--check", action="store_true", help="Verify byte-for-byte reproducibility without writing")
    options = parser.parse_args()
    options.cache.mkdir(parents=True, exist_ok=True)
    data = build(options.cache)
    encoded = json.dumps(data, ensure_ascii=False, separators=(",", ":"), allow_nan=False) + "\n"
    if options.check:
        if options.output.read_text(encoding="utf-8") != encoded:
            raise RuntimeError("Generated geography differs from the checked-in file")
    else:
        options.output.parent.mkdir(parents=True, exist_ok=True)
        options.output.write_text(encoded, encoding="utf-8")
    print(json.dumps({"output": str(options.output), "bytes": len(encoded.encode()), **data["statistics"]}))


if __name__ == "__main__":
    main()
