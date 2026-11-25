#!/usr/bin/env python3
"""Rebuild the Europe city reference from the official UN WUP2025 workbook.

Uses only Python's standard library. Downloads are cached outside tracked files.
"""
import argparse
from decimal import Decimal, ROUND_HALF_UP
import hashlib
import json
from pathlib import Path
import re
import unicodedata
import urllib.request
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
FILE = "WUP2025-F21-DEGURBA-Cities_Pop.xlsx"
URL = "https://population.un.org/wup/assets/Download/Cities/" + FILE
SHA256 = "3a96030d87aec6c1c50f658d5321067d6345e1ab936c5d2854524f972caa75c0"
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
# UN M49 region 150 (Europe), with the separately coded WUP Kosovo location.
# The country/area filter is fixed so later M49 website edits cannot change a build.
EUROPE = set("""
ALA ALB AND AUT BEL BGR BIH BLR CHE CZE DEU DNK ESP EST FIN FRA FRO GBR
GGY GIB GRC HRV HUN IMN IRL ISL ITA JEY LIE LTU LUX LVA MCO MDA MKD
MLT MNE NLD NOR POL PRT ROU RUS SJM SMR SRB SVK SVN SWE UKR VAT XKX
""".split())
NAMES = {
    "Moskva (Moscow)": "Moscow",
    "Athína (Athens)": "Athens",
    "Kyiv (Kiev)": "Kyiv",
    "Roma (Rome)": "Rome",
    "Wien (Vienna)": "Vienna",
    "Lisboa (Lisbon)": "Lisbon",
    "București (Bucharest)": "Bucharest",
    "Warszawa (Warsaw)": "Warsaw",
    "Bruxelles (Brussels)": "Brussels",
    "København (Copenhagen)": "Copenhagen",
    "Praha (Prague)": "Prague",
    "Beograd (Belgrade)": "Belgrade",
    "Helsinki (Helsingfors)": "Helsinki",
    "Dusseldorf": "Düsseldorf",
}


def workbook_rows(path):
    with zipfile.ZipFile(path) as archive:
        strings = ["".join(item.itertext()) for item in ET.fromstring(archive.read("xl/sharedStrings.xml"))]
        headers = None
        # The source workbook's Data sheet is sheet2.xml, with headers on row 1.
        for _, row in ET.iterparse(archive.open("xl/worksheets/sheet2.xml"), events=["end"]):
            if row.tag != "{" + NS["m"] + "}row":
                continue
            cells = {}
            for cell in row:
                value = cell.find("m:v", NS)
                if value is not None:
                    column = re.sub(r"\d", "", cell.get("r"))
                    cells[column] = strings[int(value.text)] if cell.get("t") == "s" else value.text
            if headers is None:
                headers = cells
                assert headers["BJ"] == "2025" and headers["J"] == "PWCent_Longitude"
            else:
                yield {headers[column]: value for column, value in cells.items()}
            row.clear()


def build(path):
    actual_hash = hashlib.sha256(path.read_bytes()).hexdigest()
    if actual_hash != SHA256:
        raise ValueError("Source workbook has changed; review it before updating the recorded SHA-256.")
    eligible = []
    for row in workbook_rows(path):
        if not row.get("2025"):
            continue
        country_code = row["ISO3_Code"]
        is_istanbul = country_code == "TUR" and row["City_Code"] == "2626"
        if country_code not in EUROPE and not is_istanbul:
            continue
        lon, lat = float(row["PWCent_Longitude"]), float(row["PWCent_Latitude"])
        if not (-26 <= lon <= 45.5 and 30 <= lat <= 71.5):
            continue
        source_name = row["City_Name"]
        name = NAMES.get(source_name, source_name)
        ascii_name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
        population = int((Decimal(row["2025"]) * 1000).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
        eligible.append({
            "id": re.sub(r"[^a-z0-9]+", "-", ascii_name.lower()).strip("-"),
            "name": name,
            "sourceName": source_name,
            "country": row["Location"],
            "countryCode": country_code,
            "unLocationCode": int(row["LocID"]),
            "unCityCode": int(row["City_Code"]),
            "population": population,
            "lon": round(lon, 6),
            "lat": round(lat, 6),
        })
    eligible.sort(key=lambda city: (-city["population"], city["unCityCode"]))
    cities = [{"rank": rank, **city} for rank, city in enumerate(eligible[:50], 1)]
    assert len(cities) == len({city["id"] for city in cities}) == 50
    assert cities[-1]["population"] > eligible[50]["population"]
    assert next(city for city in cities if city["name"] == "Istanbul")["unCityCode"] == 2626
    return {
        "title": "50 largest European cities within the Europe map extent",
        "populationYear": 2025,
        "populationReferenceDate": "2025-07-01",
        "populationUnit": "persons",
        "populationDefinition": "UN WUP2025 Degree of Urbanization (DEGURBA) city / urban centre",
        "coordinateDefinition": "UN population-weighted city centroid, decimal longitude and latitude; rounded to six decimals",
        "source": {
            "publisher": "United Nations, Department of Economic and Social Affairs, Population Division",
            "title": "World Urbanization Prospects: The 2025 Revision, Online Edition",
            "table": "WUP2025-F21-DEGURBA-Cities_Pop, Data sheet, 2025 column",
            "url": URL,
            "downloadsUrl": "https://population.un.org/wup/downloads/?tab=Cities",
            "sha256": SHA256,
            "retrieved": "2026-11-24",
            "license": "CC BY 3.0 IGO",
            "licenseUrl": "https://creativecommons.org/licenses/by/3.0/igo/",
        },
        "selection": {
            "bbox": {"west": -26, "east": 45.5, "south": 30, "north": 71.5},
            "geography": "M49 Europe locations, WUP's separately coded Kosovo location, and Istanbul as an explicit transcontinental exception",
            "regionSourceUrl": "https://unstats.un.org/unsd/methodology/m49/overview/",
            "eligibleEuropeanCountryCodes": sorted(EUROPE),
            "includedTranscontinentalCityCodes": [2626],
            "order": "2025 population descending, then UN city code ascending",
            "limit": 50,
            "eligibleCityCount": len(eligible),
            "strictTop50WithinSelection": True,
            "nextExcludedCity": {"name": eligible[50]["name"], "population": eligible[50]["population"]},
        },
        "cities": cities,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=ROOT / ".qa" / "sources" / FILE)
    parser.add_argument("--output", type=Path, default=ROOT / "data" / "europe-cities.json")
    args = parser.parse_args()
    if not args.input.exists():
        args.input.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(URL, args.input)
    result = build(args.input)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {len(result['cities'])} cities from {result['selection']['eligibleCityCount']} eligible records to {args.output}")
