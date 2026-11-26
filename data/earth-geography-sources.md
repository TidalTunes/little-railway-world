# Earth geographic source notes

This world is an illustrative railway simulation, not a navigation map or a survey of operating railway services. It includes all continents, a selected global city network, and authored mountain relief and vegetation regions.

## Public-domain source geography

All source layers are from [Natural Earth](https://www.naturalearthdata.com/). Its [terms of use](https://www.naturalearthdata.com/about/terms-of-use/) place the vector data in the public domain. The JSON embeds download URLs, release versions, and SHA-256 checksums; the builder rejects archives whose contents have changed.

- [Land, 1:10 million, version 5.1.1](https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-land/): continental coastlines and major islands.
- [Rivers and lake centerlines, 1:10 million, version 5.0.0](https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-rivers-lake-centerlines/): a selected set of 47 named rivers, retaining disconnected source paths separately.
- [Lakes, 1:10 million, version 5.0.0](https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-lakes/): 133 larger natural lakes. Inland lake water remains separate from ocean water.
- [Populated places, simplified 1:10 million, version 5.1.2](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/): 96 deliberately distributed settlements. This is not a ranking; source population values only control miniature city development. They are not current census estimates.

The source archives are cached under ignored `.qa/natural-earth/`. The public-domain source data has no attribution requirement; these references document provenance and reproducibility.

## Transformation and art direction

The globe has radius 1600 world units. A longitude/latitude generation chart uses `x = 1600 × longitude × π/180` and `z = −1600 × latitude × π/180`. Rendering maps that chart to a sphere; the chart itself does not preserve geographic distances away from the equator.

Coastlines are simplified by 0.075° equivalent chart distance with topology preservation. Islands below 12 chart-square units are omitted unless explicitly protected. Ocean is the chart rectangle minus coastal land. Coast and lake banks are 0.9 units wide; periodic longitude erosion and continued Antarctic land keep the dateline and south pole from becoming artificial beaches. The ice mask uses the source Greenland land component and Antarctic land, rather than a rectangular painted region.

A settlement whose source point lacks a four-unit dry footprint moves to the nearest suitable inland position. The source longitude, latitude, and movement distance remain in the JSON; the largest movement is 12.490 chart units. Building placement respects the exact coastline and uses the available dry land.

Ten regional circuits connect the selected cities with smooth, schematic land-following tracks. Connections across continents or separate island groups are not invented. Some intra-continental routes are intentionally fictional; source city locations do not imply that a railway service exists between them. Rivers and recognizable water bodies are crossed by the normal generated bridges. Major mountain envelopes and ridgelines are authored physical-region approximations, clipped to real land. Their heights and snow lines are art direction, not sampled elevation data. Biome controls likewise illustrate broad vegetation and climate patterns rather than a measured land-cover dataset.

## Rebuild

Use the same pinned environment as the European data builder:

```sh
.qa/europe-geography-env/bin/python scripts/build-earth-geography.py
.qa/europe-geography-env/bin/python scripts/build-earth-geography.py --check
```

The required packages are `shapely==2.1.2` and `pyshp==2.3.1`. The generated JSON uses stable polygon/ring ordering, a fixed precision grid, and deterministic formatting.
