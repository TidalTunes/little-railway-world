# Europe city reference

The 50 records in `europe-cities.json` are the **strict 50 largest eligible city records in the UN World Urbanization Prospects 2025 table**, ranked by its mid-2025 population. They use one harmonized Degree of Urbanization (DEGURBA) definition throughout. These are spatial urban centres, not a mixture of municipal populations and metropolitan-area estimates.

## Source and attribution

United Nations, Department of Economic and Social Affairs, Population Division (2025). *World Urbanization Prospects: The 2025 Revision, Online Edition.* [Official download page](https://population.un.org/wup/downloads/?tab=Cities). The input is [WUP2025-F21-DEGURBA-Cities_Pop.xlsx](https://population.un.org/wup/assets/Download/Cities/WUP2025-F21-DEGURBA-Cities_Pop.xlsx), **Data** sheet, **2025** column. Its information sheet supplies the field definitions and [CC BY 3.0 IGO license](https://creativecommons.org/licenses/by/3.0/igo/). Retrieved 24 November 2026.

Source SHA-256: `3a96030d87aec6c1c50f658d5321067d6345e1ab936c5d2854524f972caa75c0`.

The [UN methodology report](https://population.un.org/wup/assets/Publications/undesa_pd_2025_wup2025_methodological_report.pdf) describes the harmonized approach. The underlying geographic work is documented by the [European Commission Joint Research Centre](https://human-settlement.emergency.copernicus.eu/ghs_wup2025.php). DEGURBA identifies dense, contiguous population clusters on a kilometre grid. It does not reproduce each country's administrative city boundaries, so familiar municipal rankings will differ. For example, the UN centre named Essen includes a larger contiguous urban settlement.

## Geographic selection

1. Start with locations in [UN M49 Europe](https://unstats.un.org/unsd/methodology/m49/overview/), plus the workbook's separately coded Kosovo location. The exact country/area code set is recorded in the JSON and build script.
2. Include the complete UN Istanbul record, city code `2626`, as the requested transcontinental exception. Its population is for the entire urban centre, not just its European portion. Other Turkish cities and all African and other Asian locations are excluded.
3. Keep records whose supplied centroid lies inside longitude **−26° to 45.5°** and latitude **30° to 71.5°**, inclusive.
4. Keep records with a 2025 population, sort by that value descending, and retain the first 50. No capitals or tourist cities are inserted by hand.

There are **1,049 eligible records**. Rank 50 is **Lille: 893,282**; the next excluded city is **Marseille: 891,463**. Oslo and Reykjavík fall below the cutoff; Iceland remains part of the geographic map independently of the city list. This is a top 50 within the specified European selection and map extent, not a claim about every settlement inside the rectangular crop or all of geographic Europe beyond its eastern edge.

## Transformations and limits

- Population values are the published estimates for 1 July 2025, converted from thousands to persons. Integer representation preserves the table's precision; it does not imply an exact head count.
- Coordinates come directly from `PWCent_Longitude` and `PWCent_Latitude`, rounded to six decimals. They locate population-weighted urban-centre centroids, which may differ from historic city centres or railway stations.
- `sourceName`, UN city/location codes, and country names preserve the source identity. `name` supplies familiar English names where the original includes a parenthetical English alias; Düsseldorf restores its conventional spelling. These changes do not alter ranking, population, or position.
- The file describes a consistent published model, including its uncertainty and national population assumptions. It is not a real-time count of residents, displacement, or changing municipal boundaries.
- Country labels are source metadata. This dataset does not draw or adjudicate national boundaries.

## Reproduction

Run `python3 scripts/build-europe-cities.py` from the repository. The script uses only the Python standard library, downloads the official workbook into ignored `.qa/sources/`, verifies its SHA-256, and writes `data/europe-cities.json`. To use an existing download, pass `--input /absolute/path/WUP2025-F21-DEGURBA-Cities_Pop.xlsx`. A changed upstream file fails verification so its contents can be reviewed before the reference changes.

Validation compared the country filter with the official M49 table and independently extracted all 50 ranks and populations from the workbook. The JSON contains 50 unique city IDs, ordered populations, valid coordinates, Istanbul, and no ineligible African or Asian Turkish cities.
