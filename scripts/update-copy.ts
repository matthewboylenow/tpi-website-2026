import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import * as path from "path";
import { eq } from "drizzle-orm";
import { categories, testimonials } from "../lib/schema";

// Load .env.local
config({ path: path.resolve(process.cwd(), ".env.local") });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// New category descriptions (slug -> description)
const categoryDescriptions: Record<string, string> = {
  "soft-serve-frozen-yogurt":
    "20+ models for every volume—from food trucks to high-traffic boardwalk stands",
  "icetro-soft-serve":
    "Quality soft serve at a friendlier price point. Great for getting started.",
  "two-sided-grills":
    "Cook faster, serve more. The Crown Series is a game-changer for busy kitchens.",
  milkshakes: "Thick, creamy shakes your customers will come back for.",
  "ice-cream-gelato-batch":
    "Artisan quality for shops that take their craft seriously.",
  "flavorburst-programs":
    "8+ flavors from one machine. More variety, same footprint.",
  "frozen-cocktails":
    "Turn your bar into a destination. Consistent pours, happy customers.",
  "frozen-custard":
    "Rich, dense, and worth the trip. Give your customers something special.",
  "premium-slush":
    "High-margin, low-labor. Kids love it, operators love the profits.",
  "frozen-soda-cool-chiller":
    "Frozen carbonated beverages that keep customers coming back.",
  "smoothies-frozen-cappuccino":
    "Versatile machines for coffee shops and convenience stores.",
};

// New testimonials data
const newTestimonials = [
  {
    customerName: "Rex Whetstone",
    businessName: "Ice Cream Shop Owner",
    quote:
      "We own 4 ice cream shops and have used several brands of equipment. We refuse to buy anything but Taylor going forward. Aaron is always checking in, keeping us up to date on the newest ideas, and making sure everything is working great. You can tell he truly cares about our business and our success.",
  },
  {
    customerName: "Keith Zimmerman",
    businessName: "Plum Creek Farm Market & Creamery",
    quote:
      "In the world of quick sales and disposable equipment, Taylor stands out as a company committed to long-term relationships. Before, during, and after the sale, they provide the support we need to keep our busy kitchen running smoothly.",
  },
  {
    customerName: "Nick and Anthony Della Vecchia",
    businessName: "Tony Beef",
    quote:
      "From the first meeting, we knew we were in good hands. Their zeal, tenacity, and dedicated client focus cemented our decision to partner with them.",
  },
  {
    customerName: "Maria Santos",
    businessName: "Scoops Ice Cream Shop",
    quote:
      "What sets Taylor Products apart is their genuine investment in our success. They didn't just sell us equipment—they helped us build a profitable frozen dessert program from scratch.",
  },
];

async function updateCopy() {
  console.log("Updating category descriptions...\n");

  // Update each category
  for (const [slug, description] of Object.entries(categoryDescriptions)) {
    await db
      .update(categories)
      .set({ description })
      .where(eq(categories.slug, slug));
    console.log(`  Updated: ${slug}`);
  }

  console.log("\nUpdating testimonials...");

  // Delete old testimonials
  await db.delete(testimonials);

  // Insert new testimonials
  for (let i = 0; i < newTestimonials.length; i++) {
    await db.insert(testimonials).values({
      ...newTestimonials[i],
      isFeatured: true,
      displayOrder: i + 1,
    });
    console.log(`  Added: ${newTestimonials[i].customerName}`);
  }

  console.log("\nCopy update complete!");
}

updateCopy().catch(console.error);
