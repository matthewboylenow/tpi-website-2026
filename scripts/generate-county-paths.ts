/**
 * Generates SVG path data for the territory map from US Census TopoJSON data.
 * Run with: npx tsx scripts/generate-county-paths.ts
 * Output: lib/county-map-data.ts
 */

import * as topojson from "topojson-client";
import * as d3Geo from "d3-geo";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// FIPS code → DB county name mapping for our 79 territory counties
const FIPS_TO_COUNTY: Record<string, { name: string; state: string }> = {
  // New Jersey (21)
  "34001": { name: "Atlantic", state: "NJ" },
  "34003": { name: "Bergen", state: "NJ" },
  "34005": { name: "Burlington", state: "NJ" },
  "34007": { name: "Camden", state: "NJ" },
  "34009": { name: "Cape May", state: "NJ" },
  "34011": { name: "Cumberland", state: "NJ" },
  "34013": { name: "Essex", state: "NJ" },
  "34015": { name: "Gloucester", state: "NJ" },
  "34017": { name: "Hudson", state: "NJ" },
  "34019": { name: "Hunterdon", state: "NJ" },
  "34021": { name: "Mercer", state: "NJ" },
  "34023": { name: "Middlesex", state: "NJ" },
  "34025": { name: "Monmouth", state: "NJ" },
  "34027": { name: "Morris", state: "NJ" },
  "34029": { name: "Ocean", state: "NJ" },
  "34031": { name: "Passaic", state: "NJ" },
  "34033": { name: "Salem", state: "NJ" },
  "34035": { name: "Somerset", state: "NJ" },
  "34037": { name: "Sussex", state: "NJ" },
  "34039": { name: "Union", state: "NJ" },
  "34041": { name: "Warren", state: "NJ" },

  // Pennsylvania (42)
  "42001": { name: "Adams", state: "PA" },
  "42009": { name: "Bedford", state: "PA" },
  "42011": { name: "Berks", state: "PA" },
  "42013": { name: "Blair", state: "PA" },
  "42015": { name: "Bradford", state: "PA" },
  "42017": { name: "Bucks", state: "PA" },
  "42021": { name: "Cambria", state: "PA" },
  "42023": { name: "Cameron", state: "PA" },
  "42025": { name: "Carbon", state: "PA" },
  "42027": { name: "Centre", state: "PA" },
  "42029": { name: "Chester", state: "PA" },
  "42033": { name: "Clearfield", state: "PA" },
  "42035": { name: "Clinton", state: "PA" },
  "42037": { name: "Columbia", state: "PA" },
  "42041": { name: "Cumberland", state: "PA" },
  "42043": { name: "Dauphin", state: "PA" },
  "42045": { name: "Delaware", state: "PA" },
  "42047": { name: "Elk", state: "PA" },
  "42055": { name: "Franklin", state: "PA" },
  "42057": { name: "Fulton", state: "PA" },
  "42061": { name: "Huntingdon", state: "PA" },
  "42063": { name: "Indiana", state: "PA" },
  "42065": { name: "Jefferson", state: "PA" },
  "42067": { name: "Juniata", state: "PA" },
  "42069": { name: "Lackawanna", state: "PA" },
  "42071": { name: "Lancaster", state: "PA" },
  "42075": { name: "Lebanon", state: "PA" },
  "42077": { name: "Lehigh", state: "PA" },
  "42079": { name: "Luzerne", state: "PA" },
  "42081": { name: "Lycoming", state: "PA" },
  "42087": { name: "Mifflin", state: "PA" },
  "42089": { name: "Monroe", state: "PA" },
  "42091": { name: "Montgomery", state: "PA" },
  "42093": { name: "Montour", state: "PA" },
  "42095": { name: "Northampton", state: "PA" },
  "42097": { name: "Northumberland", state: "PA" },
  "42099": { name: "Perry", state: "PA" },
  "42101": { name: "Philadelphia", state: "PA" },
  "42103": { name: "Pike", state: "PA" },
  "42105": { name: "Potter", state: "PA" },
  "42107": { name: "Schuylkill", state: "PA" },
  "42109": { name: "Snyder", state: "PA" },
  "42111": { name: "Somerset", state: "PA" },
  "42113": { name: "Sullivan", state: "PA" },
  "42115": { name: "Susquehanna", state: "PA" },
  "42117": { name: "Tioga", state: "PA" },
  "42119": { name: "Union", state: "PA" },
  "42127": { name: "Wayne", state: "PA" },
  "42131": { name: "Wyoming", state: "PA" },
  "42133": { name: "York", state: "PA" },

  // New York (13)
  "36005": { name: "Bronx", state: "NY" },
  "36047": { name: "Kings (Brooklyn)", state: "NY" },
  "36059": { name: "Nassau", state: "NY" },
  "36061": { name: "New York (Manhattan)", state: "NY" },
  "36079": { name: "Putnam", state: "NY" },
  "36081": { name: "Queens", state: "NY" },
  "36085": { name: "Richmond (Staten Island)", state: "NY" },
  "36103": { name: "Suffolk", state: "NY" },
  "36119": { name: "Westchester", state: "NY" },

  // Delaware (1)
  "10003": { name: "New Castle", state: "DE" },
};

// State FIPS prefixes for boundary generation
const STATE_FIPS: Record<string, string> = {
  NJ: "34",
  PA: "42",
  NY: "36",
  DE: "10",
};

interface TopoCounty {
  type: string;
  id: string;
  properties: { name: string };
  arcs: number[][];
}

function main() {
  console.log("Loading US county TopoJSON...");

  // Load TopoJSON from us-atlas package
  const topoPath = resolve(
    __dirname,
    "../node_modules/us-atlas/counties-10m.json"
  );
  const topoData = JSON.parse(readFileSync(topoPath, "utf-8"));

  const countyCollection = topojson.feature(
    topoData,
    topoData.objects.counties
  ) as unknown as GeoJSON.FeatureCollection;

  // Filter to only our territory counties
  const ourFips = new Set(Object.keys(FIPS_TO_COUNTY));
  const territoryFeatures = countyCollection.features.filter((f) =>
    ourFips.has(String(f.id))
  );

  console.log(
    `Found ${territoryFeatures.length} of ${ourFips.size} territory counties`
  );

  // Check for missing counties
  const foundFips = new Set(territoryFeatures.map((f) => String(f.id)));
  const missingFips = [...ourFips].filter((fips) => !foundFips.has(fips));
  if (missingFips.length > 0) {
    console.warn(
      "Missing counties:",
      missingFips.map((f) => `${f} (${FIPS_TO_COUNTY[f].name}, ${FIPS_TO_COUNTY[f].state})`)
    );
  }

  // Set up projection centered on our territory
  // Conic conformal is ideal for mid-latitude regions
  const projection = d3Geo
    .geoConicConformal()
    .parallels([39, 42])
    .rotate([75.5, 0])
    .center([0, 40.5])
    .fitSize([800, 600], {
      type: "FeatureCollection",
      features: territoryFeatures,
    });

  const pathGenerator = d3Geo.geoPath(projection);

  // Generate county path data
  const countyPaths: string[] = [];
  for (const feature of territoryFeatures) {
    const fips = String(feature.id);
    const county = FIPS_TO_COUNTY[fips];
    if (!county) continue;

    const d = pathGenerator(feature);
    if (!d) continue;

    const centroid = pathGenerator.centroid(feature);
    if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) continue;

    countyPaths.push(
      `  { fips: "${fips}", name: "${county.name}", state: "${county.state}", d: "${d}", cx: ${centroid[0].toFixed(1)}, cy: ${centroid[1].toFixed(1)} }`
    );
  }

  // Generate state boundary paths by merging counties per state
  const statePaths: string[] = [];
  for (const [state, fipsPrefix] of Object.entries(STATE_FIPS)) {
    // Get all counties in this state that are in our territory
    const stateCountyIds = [...ourFips].filter((f) =>
      f.startsWith(fipsPrefix)
    );

    if (stateCountyIds.length === 0) continue;

    // Use topojson.merge to create merged state boundary
    const stateGeoIds = new Set(stateCountyIds);
    const stateGeometries = (
      topoData.objects.counties as { geometries: TopoCounty[] }
    ).geometries.filter((g: TopoCounty) => stateGeoIds.has(String(g.id)));

    if (stateGeometries.length === 0) continue;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const merged = topojson.merge(topoData, stateGeometries as any);
    const d = pathGenerator(merged);
    if (!d) continue;

    statePaths.push(`  { state: "${state}", d: "${d}" }`);
  }

  // Write output file
  const output = `// AUTO-GENERATED by scripts/generate-county-paths.ts
// Do not edit manually — run: npx tsx scripts/generate-county-paths.ts

export interface CountyPath {
  fips: string;
  name: string;
  state: string;
  /** SVG path d attribute */
  d: string;
  /** Centroid x coordinate */
  cx: number;
  /** Centroid y coordinate */
  cy: number;
}

export interface StateBoundary {
  state: string;
  d: string;
}

export const COUNTY_PATHS: CountyPath[] = [
${countyPaths.join(",\n")}
];

export const STATE_BOUNDARIES: StateBoundary[] = [
${statePaths.join(",\n")}
];

export const MAP_VIEWBOX = "0 0 800 600";
`;

  const outputPath = resolve(__dirname, "../lib/county-map-data.ts");
  writeFileSync(outputPath, output, "utf-8");
  console.log(`\nWrote ${countyPaths.length} county paths and ${statePaths.length} state boundaries to lib/county-map-data.ts`);
}

main();
