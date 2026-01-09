import { db } from "../lib/db";
import { counties } from "../lib/schema";

// Counties for NJ, PA, NY, DE service territory
const COUNTIES_DATA = [
  // New Jersey - 21 counties
  { name: "Atlantic", state: "NJ" },
  { name: "Bergen", state: "NJ" },
  { name: "Burlington", state: "NJ" },
  { name: "Camden", state: "NJ" },
  { name: "Cape May", state: "NJ" },
  { name: "Cumberland", state: "NJ" },
  { name: "Essex", state: "NJ" },
  { name: "Gloucester", state: "NJ" },
  { name: "Hudson", state: "NJ" },
  { name: "Hunterdon", state: "NJ" },
  { name: "Mercer", state: "NJ" },
  { name: "Middlesex", state: "NJ" },
  { name: "Monmouth", state: "NJ" },
  { name: "Morris", state: "NJ" },
  { name: "Ocean", state: "NJ" },
  { name: "Passaic", state: "NJ" },
  { name: "Salem", state: "NJ" },
  { name: "Somerset", state: "NJ" },
  { name: "Sussex", state: "NJ" },
  { name: "Union", state: "NJ" },
  { name: "Warren", state: "NJ" },

  // Pennsylvania - 67 counties (focusing on Eastern/Central PA in territory)
  { name: "Adams", state: "PA" },
  { name: "Berks", state: "PA" },
  { name: "Blair", state: "PA" },
  { name: "Bradford", state: "PA" },
  { name: "Bucks", state: "PA" },
  { name: "Cambria", state: "PA" },
  { name: "Carbon", state: "PA" },
  { name: "Centre", state: "PA" },
  { name: "Chester", state: "PA" },
  { name: "Clinton", state: "PA" },
  { name: "Columbia", state: "PA" },
  { name: "Cumberland", state: "PA" },
  { name: "Dauphin", state: "PA" },
  { name: "Delaware", state: "PA" },
  { name: "Franklin", state: "PA" },
  { name: "Fulton", state: "PA" },
  { name: "Huntingdon", state: "PA" },
  { name: "Juniata", state: "PA" },
  { name: "Lackawanna", state: "PA" },
  { name: "Lancaster", state: "PA" },
  { name: "Lebanon", state: "PA" },
  { name: "Lehigh", state: "PA" },
  { name: "Luzerne", state: "PA" },
  { name: "Lycoming", state: "PA" },
  { name: "Mifflin", state: "PA" },
  { name: "Monroe", state: "PA" },
  { name: "Montgomery", state: "PA" },
  { name: "Montour", state: "PA" },
  { name: "Northampton", state: "PA" },
  { name: "Northumberland", state: "PA" },
  { name: "Perry", state: "PA" },
  { name: "Philadelphia", state: "PA" },
  { name: "Pike", state: "PA" },
  { name: "Schuylkill", state: "PA" },
  { name: "Snyder", state: "PA" },
  { name: "Sullivan", state: "PA" },
  { name: "Susquehanna", state: "PA" },
  { name: "Tioga", state: "PA" },
  { name: "Union", state: "PA" },
  { name: "Wayne", state: "PA" },
  { name: "Wyoming", state: "PA" },
  { name: "York", state: "PA" },

  // New York - Focus on NYC, Long Island, and surrounding areas
  { name: "Bronx", state: "NY" },
  { name: "Kings (Brooklyn)", state: "NY" },
  { name: "Nassau", state: "NY" },
  { name: "New York (Manhattan)", state: "NY" },
  { name: "Orange", state: "NY" },
  { name: "Putnam", state: "NY" },
  { name: "Queens", state: "NY" },
  { name: "Richmond (Staten Island)", state: "NY" },
  { name: "Rockland", state: "NY" },
  { name: "Suffolk", state: "NY" },
  { name: "Sullivan", state: "NY" },
  { name: "Ulster", state: "NY" },
  { name: "Westchester", state: "NY" },

  // Delaware - 3 counties
  { name: "Kent", state: "DE" },
  { name: "New Castle", state: "DE" },
  { name: "Sussex", state: "DE" },
];

async function seedCounties() {
  console.log("Seeding counties...\n");

  // Check if counties already exist
  const existing = await db.query.counties.findMany();
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing counties. Skipping seed.`);
    console.log("To reseed, delete existing counties first.");
    process.exit(0);
  }

  // Insert all counties
  const result = await db.insert(counties).values(COUNTIES_DATA).returning();

  console.log(`Successfully seeded ${result.length} counties:\n`);

  // Count by state
  const byState = result.reduce(
    (acc, c) => {
      acc[c.state] = (acc[c.state] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  Object.entries(byState).forEach(([state, count]) => {
    console.log(`  ${state}: ${count} counties`);
  });

  console.log("\nDone!");
  process.exit(0);
}

seedCounties().catch((error) => {
  console.error("Seed error:", error);
  process.exit(1);
});
