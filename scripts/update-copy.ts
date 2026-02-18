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
    "20+ models. Food trucks to high-volume boardwalk stands.",
  "icetro-soft-serve":
    "Solid soft serve equipment at a lower price point. Good entry-level option.",
  "two-sided-grills":
    "The Crown Series cooks both sides at once. Faster ticket times, more throughput.",
  milkshakes: "Consistent, thick shakes every time. Built for high-volume operations.",
  "ice-cream-gelato-batch":
    "For shops making their own ice cream and gelato in-house.",
  "flavorburst-programs":
    "8+ flavors from a single machine. Same counter space, way more options.",
  "frozen-cocktails":
    "Frozen drinks that pour the same every time. Big margins, low labor.",
  "frozen-custard":
    "Premium frozen custard equipment for shops that want to stand out.",
  "premium-slush":
    "High margins, low labor. One of the easiest add-ons you can put in a store.",
  "frozen-soda-cool-chiller":
    "Frozen carbonated beverages. Easy to run, customers can't get enough.",
  "smoothies-frozen-cappuccino":
    "Reliable machines for coffee shops and c-stores running blended drinks.",
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
