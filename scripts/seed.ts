import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import * as path from "path";
import {
  categories,
  subcategories,
  machines,
  salespeople,
  testimonials,
} from "../lib/schema";

// Load .env.local
config({ path: path.resolve(process.cwd(), ".env.local") });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Blob storage base URL
const BLOB_BASE = "https://xyxkftovdmpcozud.public.blob.vercel-storage.com";

// Helper to get image/spec URLs
const img = (model: string, ext = "jpg") =>
  `${BLOB_BASE}/machines/${model.toLowerCase()}.${ext}`;
const spec = (model: string) =>
  `${BLOB_BASE}/specs/${model.toLowerCase()}.pdf`;
const hero = (name: string) => `${BLOB_BASE}/heroes/${name}`;
const headshot = (name: string) => `${BLOB_BASE}/salespeople/${name}.jpg`;

// ============================================================================
// CATEGORIES DATA
// ============================================================================
const CATEGORIES_DATA = [
  {
    name: "Soft Serve & Frozen Yogurt",
    slug: "soft-serve-frozen-yogurt",
    description:
      "20+ models for every volume—from food trucks to high-traffic boardwalk stands",
    heroImageUrl: hero("hero-soft-serve.png"),
    displayOrder: 1,
  },
  {
    name: "Icetro Soft Serve",
    slug: "icetro-soft-serve",
    description:
      "Quality soft serve at a friendlier price point. Great for getting started.",
    heroImageUrl: hero("hero-icetro.png"),
    displayOrder: 2,
  },
  {
    name: "Two Sided Grills",
    slug: "two-sided-grills",
    description:
      "Cook faster, serve more. The Crown Series is a game-changer for busy kitchens.",
    heroImageUrl: hero("hero-grills.jpg"),
    displayOrder: 3,
  },
  {
    name: "Milkshakes",
    slug: "milkshakes",
    description:
      "Thick, creamy shakes your customers will come back for.",
    heroImageUrl: hero("hero-milkshakes.jpg"),
    displayOrder: 4,
  },
  {
    name: "Ice Cream & Gelato Batch",
    slug: "ice-cream-gelato-batch",
    description:
      "Artisan quality for shops that take their craft seriously.",
    heroImageUrl: hero("hero-batch.png"),
    displayOrder: 5,
  },
  {
    name: "FlavorBurst Programs",
    slug: "flavorburst-programs",
    description:
      "8+ flavors from one machine. More variety, same footprint.",
    heroImageUrl: hero("hero-flavorburst.png"),
    displayOrder: 6,
  },
  {
    name: "Frozen Cocktails",
    slug: "frozen-cocktails",
    description:
      "Turn your bar into a destination. Consistent pours, happy customers.",
    heroImageUrl: hero("hero-cocktails.jpg"),
    displayOrder: 7,
  },
  {
    name: "Frozen Custard",
    slug: "frozen-custard",
    description:
      "Rich, dense, and worth the trip. Give your customers something special.",
    heroImageUrl: hero("hero-custard.jpg"),
    displayOrder: 8,
  },
  {
    name: "Premium Slush",
    slug: "premium-slush",
    description:
      "High-margin, low-labor. Kids love it, operators love the profits.",
    heroImageUrl: hero("hero-slush.jpg"),
    displayOrder: 9,
  },
  {
    name: "Cool Chiller / FCB",
    slug: "frozen-soda-cool-chiller",
    description:
      "Frozen carbonated beverages that keep customers coming back.",
    heroImageUrl: hero("hero-coolchiller.jpg"),
    displayOrder: 10,
  },
  {
    name: "Smoothies & Frozen Cappuccino",
    slug: "smoothies-frozen-cappuccino",
    description:
      "Versatile machines for coffee shops and convenience stores.",
    heroImageUrl: hero("hero-smoothies.jpg"),
    displayOrder: 11,
  },
];

// ============================================================================
// SUBCATEGORIES DATA (keyed by category slug)
// ============================================================================
const SUBCATEGORIES_DATA: Record<string, { name: string; displayOrder: number }[]> = {
  "soft-serve-frozen-yogurt": [
    { name: "28HT Heat Treatment Models", displayOrder: 1 },
    { name: "Single Flavor Models", displayOrder: 2 },
    { name: "Multi Flavor Models", displayOrder: 3 },
    { name: "Combination Freezers", displayOrder: 4 },
  ],
  "icetro-soft-serve": [
    { name: "Countertop Models", displayOrder: 1 },
    { name: "Floor Models", displayOrder: 2 },
  ],
  "two-sided-grills": [
    { name: "Crown Series", displayOrder: 1 },
    { name: "Electric Grills", displayOrder: 2 },
    { name: "Gas Grills", displayOrder: 3 },
    { name: "RAM Frozen Food Dispensers", displayOrder: 4 },
  ],
  milkshakes: [
    { name: "28HT Shake Freezers", displayOrder: 1 },
    { name: "Single Flavor", displayOrder: 2 },
    { name: "Multi Flavor", displayOrder: 3 },
  ],
  "ice-cream-gelato-batch": [
    { name: "Taylor Batch Freezers", displayOrder: 1 },
    { name: "Emery Thompson", displayOrder: 2 },
    { name: "Frigomat", displayOrder: 3 },
    { name: "ISA Gelato Display", displayOrder: 4 },
  ],
  "flavorburst-programs": [
    { name: "FlavorBurst for Soft Serve", displayOrder: 1 },
    { name: "FlavorBurst for Shakes", displayOrder: 2 },
  ],
  "frozen-cocktails": [{ name: "Frozen Cocktail Machines", displayOrder: 1 }],
  "frozen-custard": [{ name: "Custard Freezers", displayOrder: 1 }],
  "premium-slush": [{ name: "Slush Machines", displayOrder: 1 }],
  "frozen-soda-cool-chiller": [
    { name: "Frozen Carbonated Beverage (FCB)", displayOrder: 1 },
  ],
  "smoothies-frozen-cappuccino": [
    { name: "Smoothie & Frozen Coffee", displayOrder: 1 },
  ],
};

// ============================================================================
// MACHINES DATA
// ============================================================================
interface MachineData {
  modelNumber: string;
  name: string;
  slug: string;
  shortDescription: string;
  categorySlug: string;
  subcategoryName: string;
  flavorCount?: string;
  machineType?: string;
  isAdaCompliant?: boolean;
  imageExt?: string;
}

const MACHINES_DATA: MachineData[] = [
  // ========================
  // SOFT SERVE & FROZEN YOGURT
  // ========================
  // 28HT Models
  { modelNumber: "C606", name: "Shake & Soft Serve Freezer", slug: "c606-shake-soft-serve", shortDescription: "Combination shake and soft serve with 28HT technology", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "28HT Heat Treatment Models", flavorCount: "Single Flavor", machineType: "28HT" },
  { modelNumber: "C709", name: "Single Flavor Soft Serve", slug: "c709-single-flavor", shortDescription: "High-capacity single flavor with heat treatment", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "28HT Heat Treatment Models", flavorCount: "Single Flavor", machineType: "28HT" },
  { modelNumber: "C708", name: "Single Flavor Soft Serve", slug: "c708-single-flavor", shortDescription: "Popular single flavor with 28HT heat treatment", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "28HT Heat Treatment Models", flavorCount: "Single Flavor", machineType: "28HT" },
  { modelNumber: "C717", name: "Twin Twist Soft Serve", slug: "c717-twin-twist", shortDescription: "Two flavors plus twist with heat treatment", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "28HT Heat Treatment Models", flavorCount: "Twin Twist", machineType: "28HT" },
  { modelNumber: "C716", name: "Twin Twist Soft Serve", slug: "c716-twin-twist", shortDescription: "Compact twin twist with 28HT", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "28HT Heat Treatment Models", flavorCount: "Twin Twist", machineType: "28HT" },

  // Single Flavor Models
  { modelNumber: "C707", name: "Single Flavor Pump", slug: "c707-single-pump", shortDescription: "Pump-fed single flavor for high-volume operations", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Single Flavor Models", flavorCount: "Single Flavor", machineType: "Pump" },
  { modelNumber: "C706", name: "Single Flavor Pump", slug: "c706-single-pump", shortDescription: "Compact pump-fed single flavor", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Single Flavor Models", flavorCount: "Single Flavor", machineType: "Pump" },
  { modelNumber: "8752", name: "Single Flavor Pump", slug: "8752-single-pump", shortDescription: "Traditional single flavor pump freezer", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Single Flavor Models", flavorCount: "Single Flavor", machineType: "Pump" },
  { modelNumber: "702", name: "Single Flavor", slug: "702-single", shortDescription: "Entry-level single flavor soft serve", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Single Flavor Models", flavorCount: "Single Flavor" },
  { modelNumber: "C152", name: "Taylormate Countertop", slug: "c152-taylormate", shortDescription: "Compact countertop for small spaces", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Single Flavor Models", flavorCount: "Single Flavor", machineType: "Countertop" },

  // Multi Flavor Models
  { modelNumber: "C723", name: "Twin Twist", slug: "c723-twin-twist", shortDescription: "Popular twin twist soft serve freezer", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist" },
  { modelNumber: "C723ADA", name: "Twin Twist ADA", slug: "c723-ada-twin-twist", shortDescription: "ADA-compliant twin twist freezer", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist", isAdaCompliant: true },
  { modelNumber: "C161", name: "Compact Twin Twist", slug: "c161-compact-twin", shortDescription: "Space-saving twin twist option", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist", machineType: "Compact" },
  { modelNumber: "8756", name: "Twin Twist Pump", slug: "8756-twin-pump", shortDescription: "Pump-fed twin twist for high volume", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist", machineType: "Pump" },
  { modelNumber: "C722", name: "Twin Twist Pump", slug: "c722-twin-pump", shortDescription: "Premium twin twist with pump feed", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist", machineType: "Pump" },
  { modelNumber: "C722ADA", name: "Twin Twist Pump ADA", slug: "c722-ada-twin-pump", shortDescription: "ADA-compliant twin twist with pump", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist", machineType: "Pump", isAdaCompliant: true },
  { modelNumber: "C791", name: "Twin Twist", slug: "c791-twin-twist", shortDescription: "High-performance twin twist freezer", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist", imageExt: "png" },
  { modelNumber: "C794", name: "Twin Twist", slug: "c794-twin-twist", shortDescription: "Premium twin twist model", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist", imageExt: "png" },
  { modelNumber: "C713", name: "Twin Twist", slug: "c713-twin-twist", shortDescription: "Versatile twin twist freezer", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist" },
  { modelNumber: "C712", name: "Twin Twist Pump", slug: "c712-twin-pump", shortDescription: "Twin twist pump model", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Twin Twist", machineType: "Pump" },
  { modelNumber: "772", name: "Two Flavor", slug: "772-two-flavor", shortDescription: "Classic two flavor soft serve", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Multi Flavor Models", flavorCount: "Two Flavor" },

  // Combination Freezers
  { modelNumber: "632", name: "Single Shake + Single Soft Serve", slug: "632-combo", shortDescription: "Shake and soft serve combination unit", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Combination Freezers", flavorCount: "Combo" },
  { modelNumber: "C612", name: "Shake & Single Soft Serve", slug: "c612-combo", shortDescription: "Modern shake and soft serve combo", categorySlug: "soft-serve-frozen-yogurt", subcategoryName: "Combination Freezers", flavorCount: "Combo", imageExt: "png" },

  // ========================
  // ICETRO SOFT SERVE
  // ========================
  { modelNumber: "ISI-161TH", name: "Mini Soft Serve", slug: "isi-161th-mini", shortDescription: "Compact countertop with heat treatment option", categorySlug: "icetro-soft-serve", subcategoryName: "Countertop Models", flavorCount: "Single Flavor", machineType: "Heat Treatment" },
  { modelNumber: "ISI-163ST", name: "Twin Twist", slug: "isi-163st-twin", shortDescription: "Countertop twin twist soft serve", categorySlug: "icetro-soft-serve", subcategoryName: "Countertop Models", flavorCount: "Twin Twist", imageExt: "png" },
  { modelNumber: "ISI-163TT", name: "Twin Twist", slug: "isi-163tt-twin", shortDescription: "Countertop twin twist model", categorySlug: "icetro-soft-serve", subcategoryName: "Countertop Models", flavorCount: "Twin Twist" },
  { modelNumber: "ISI-301TH", name: "Gravity Fed Countertop", slug: "isi-301th-gravity", shortDescription: "Gravity fed countertop with heat treatment", categorySlug: "icetro-soft-serve", subcategoryName: "Countertop Models", flavorCount: "Single Flavor", machineType: "Heat Treatment" },
  { modelNumber: "SSI-203SN", name: "Two Flavor One Twist", slug: "ssi-203sn-two-flavor", shortDescription: "Floor model with two flavors plus twist", categorySlug: "icetro-soft-serve", subcategoryName: "Floor Models", flavorCount: "Two Flavor + Twist" },
  { modelNumber: "ISI-271", name: "Self-Service", slug: "isi-271-self-service", shortDescription: "New self-service floor model", categorySlug: "icetro-soft-serve", subcategoryName: "Floor Models", flavorCount: "Single Flavor", machineType: "Self-Service" },
  { modelNumber: "ISI-300TA", name: "Single Flavor", slug: "isi-300ta-single", shortDescription: "High-capacity single flavor floor model", categorySlug: "icetro-soft-serve", subcategoryName: "Floor Models", flavorCount: "Single Flavor" },
  { modelNumber: "ISI-303SNA", name: "Two Flavor One Twist", slug: "isi-303sna-two-flavor", shortDescription: "Premium two flavor plus twist", categorySlug: "icetro-soft-serve", subcategoryName: "Floor Models", flavorCount: "Two Flavor + Twist" },

  // ========================
  // TWO SIDED GRILLS
  // ========================
  // Crown Series
  { modelNumber: "L858", name: "Electric Two Sided Grill", slug: "l858-crown-electric", shortDescription: "Premium Crown Series electric clamshell grill", categorySlug: "two-sided-grills", subcategoryName: "Crown Series", machineType: "Electric", imageExt: "png" },
  { modelNumber: "L852", name: "Electric Two Sided Grill", slug: "l852-crown-electric", shortDescription: "Crown Series electric grill", categorySlug: "two-sided-grills", subcategoryName: "Crown Series", machineType: "Electric", imageExt: "png" },
  { modelNumber: "L850", name: "Single Platen", slug: "l850-crown-single", shortDescription: "Crown Series single platen grill", categorySlug: "two-sided-grills", subcategoryName: "Crown Series", machineType: "Electric", imageExt: "png" },

  // Electric Grills
  { modelNumber: "L828", name: "Electric Two-Side Grill", slug: "l828-electric", shortDescription: "High-capacity electric clamshell grill", categorySlug: "two-sided-grills", subcategoryName: "Electric Grills", machineType: "Electric" },
  { modelNumber: "L822", name: "Electric Two-Side Grill", slug: "l822-electric", shortDescription: "Mid-size electric clamshell grill", categorySlug: "two-sided-grills", subcategoryName: "Electric Grills", machineType: "Electric" },
  { modelNumber: "L820", name: "Electric Two-Side Grill", slug: "l820-electric", shortDescription: "Compact electric clamshell grill", categorySlug: "two-sided-grills", subcategoryName: "Electric Grills", machineType: "Electric" },
  { modelNumber: "L812", name: "Electric Two-Side Grill", slug: "l812-electric", shortDescription: "Entry-level electric clamshell", categorySlug: "two-sided-grills", subcategoryName: "Electric Grills", machineType: "Electric" },
  { modelNumber: "L810", name: "Electric Two-Side Grill", slug: "l810-electric", shortDescription: "Compact countertop electric grill", categorySlug: "two-sided-grills", subcategoryName: "Electric Grills", machineType: "Electric" },

  // Gas Grills
  { modelNumber: "L821", name: "Gas Lower / Electric Upper", slug: "l821-gas-electric", shortDescription: "Hybrid gas/electric clamshell grill", categorySlug: "two-sided-grills", subcategoryName: "Gas Grills", machineType: "Gas/Electric" },
  { modelNumber: "L819", name: "Gas Lower / Electric Upper", slug: "l819-gas-electric", shortDescription: "Mid-size hybrid clamshell grill", categorySlug: "two-sided-grills", subcategoryName: "Gas Grills", machineType: "Gas/Electric" },
  { modelNumber: "L813", name: "Gas Lower / Electric Upper", slug: "l813-gas-electric", shortDescription: "Compact hybrid clamshell grill", categorySlug: "two-sided-grills", subcategoryName: "Gas Grills", machineType: "Gas/Electric" },
  { modelNumber: "L811", name: "Gas Lower / Electric Upper", slug: "l811-gas-electric", shortDescription: "Entry-level hybrid clamshell", categorySlug: "two-sided-grills", subcategoryName: "Gas Grills", machineType: "Gas/Electric" },

  // RAM Dispensers
  { modelNumber: "R160", name: "Frozen Food Dispenser", slug: "r160-frozen-dispenser", shortDescription: "Compact frozen food dispenser", categorySlug: "two-sided-grills", subcategoryName: "RAM Frozen Food Dispensers", imageExt: "png" },
  { modelNumber: "R200", name: "Frozen Food Dispenser", slug: "r200-frozen-dispenser", shortDescription: "Mid-size frozen food dispenser", categorySlug: "two-sided-grills", subcategoryName: "RAM Frozen Food Dispensers", imageExt: "png" },
  { modelNumber: "R280", name: "Frozen Food Dispenser", slug: "r280-frozen-dispenser", shortDescription: "High-capacity frozen food dispenser", categorySlug: "two-sided-grills", subcategoryName: "RAM Frozen Food Dispensers", imageExt: "png" },

  // ========================
  // MILKSHAKES
  // ========================
  { modelNumber: "PH61", name: "Four Flavors Pump", slug: "ph61-four-flavor", shortDescription: "Four flavor pump-fed shake freezer", categorySlug: "milkshakes", subcategoryName: "28HT Shake Freezers", flavorCount: "Four Flavor", machineType: "Pump" },
  { modelNumber: "428", name: "Single Flavor Shake", slug: "428-single-shake", shortDescription: "Classic single flavor shake freezer", categorySlug: "milkshakes", subcategoryName: "Single Flavor", flavorCount: "Single Flavor" },
  { modelNumber: "430", name: "Single Flavor Shake", slug: "430-single-shake", shortDescription: "High-capacity single flavor", categorySlug: "milkshakes", subcategoryName: "Single Flavor", flavorCount: "Single Flavor" },
  { modelNumber: "441", name: "Single Flavor Shake", slug: "441-single-shake", shortDescription: "Versatile single flavor freezer", categorySlug: "milkshakes", subcategoryName: "Single Flavor", flavorCount: "Single Flavor" },
  { modelNumber: "490", name: "Single Flavor Shake", slug: "490-single-shake", shortDescription: "Premium single flavor shake", categorySlug: "milkshakes", subcategoryName: "Single Flavor", flavorCount: "Single Flavor" },
  { modelNumber: "358", name: "Single Flavor Shake", slug: "358-single-shake", shortDescription: "Compact single flavor option", categorySlug: "milkshakes", subcategoryName: "Single Flavor", flavorCount: "Single Flavor" },
  { modelNumber: "432", name: "Two Flavor Shake", slug: "432-two-flavor", shortDescription: "Two flavor shake freezer", categorySlug: "milkshakes", subcategoryName: "Multi Flavor", flavorCount: "Two Flavor" },
  { modelNumber: "60", name: "Four Flavor Shake", slug: "60-four-flavor", shortDescription: "Four flavor shake freezer", categorySlug: "milkshakes", subcategoryName: "Multi Flavor", flavorCount: "Four Flavor" },
  { modelNumber: "62", name: "Four Flavor Shake", slug: "62-four-flavor", shortDescription: "High-capacity four flavor", categorySlug: "milkshakes", subcategoryName: "Multi Flavor", flavorCount: "Four Flavor" },
  { modelNumber: "359", name: "Two Flavor Shake", slug: "359-two-flavor", shortDescription: "Compact two flavor option", categorySlug: "milkshakes", subcategoryName: "Multi Flavor", flavorCount: "Two Flavor" },

  // ========================
  // BATCH FREEZERS
  // ========================
  { modelNumber: "104", name: "Batch Freezer", slug: "104-batch", shortDescription: "Classic Taylor batch freezer", categorySlug: "ice-cream-gelato-batch", subcategoryName: "Taylor Batch Freezers" },
  { modelNumber: "CB100", name: "Countertop Batch Freezer", slug: "cb100-countertop", shortDescription: "Compact countertop batch freezer", categorySlug: "ice-cream-gelato-batch", subcategoryName: "Emery Thompson", machineType: "Countertop", imageExt: "png" },
  { modelNumber: "CB200", name: "Countertop Batch Freezer", slug: "cb200-countertop", shortDescription: "Mid-size countertop batch", categorySlug: "ice-cream-gelato-batch", subcategoryName: "Emery Thompson", machineType: "Countertop", imageExt: "png" },
  { modelNumber: "CB350", name: "Countertop Batch Freezer", slug: "cb350-countertop", shortDescription: "High-capacity countertop batch", categorySlug: "ice-cream-gelato-batch", subcategoryName: "Emery Thompson", machineType: "Countertop", imageExt: "png" },
  { modelNumber: "12-24QT", name: "Floor Batch Freezer", slug: "12-24qt-floor", shortDescription: "12-24 quart floor batch freezer", categorySlug: "ice-cream-gelato-batch", subcategoryName: "Emery Thompson", machineType: "Floor", imageExt: "png" },
  { modelNumber: "44QT", name: "Floor Batch Freezer", slug: "44qt-floor", shortDescription: "44 quart high-capacity floor batch", categorySlug: "ice-cream-gelato-batch", subcategoryName: "Emery Thompson", machineType: "Floor", imageExt: "png" },
  { modelNumber: "FR260", name: "Batch Freezer", slug: "fr260-batch", shortDescription: "Frigomat batch freezer", categorySlug: "ice-cream-gelato-batch", subcategoryName: "Frigomat" },
  { modelNumber: "GX2", name: "Gelato Display Case", slug: "gx2-gelato-case", shortDescription: "2-pan gelato display case", categorySlug: "ice-cream-gelato-batch", subcategoryName: "ISA Gelato Display", machineType: "Display" },
  { modelNumber: "GX4", name: "Gelato Display Case", slug: "gx4-gelato-case", shortDescription: "4-pan gelato display case", categorySlug: "ice-cream-gelato-batch", subcategoryName: "ISA Gelato Display", machineType: "Display" },
  { modelNumber: "GX6", name: "Gelato Display Case", slug: "gx6-gelato-case", shortDescription: "6-pan gelato display case", categorySlug: "ice-cream-gelato-batch", subcategoryName: "ISA Gelato Display", machineType: "Display" },
  { modelNumber: "GX8", name: "Gelato Display Case", slug: "gx8-gelato-case", shortDescription: "8-pan gelato display case", categorySlug: "ice-cream-gelato-batch", subcategoryName: "ISA Gelato Display", machineType: "Display" },

  // ========================
  // FLAVORBURST
  // ========================
  { modelNumber: "FlavorBurst-C708", name: "FlavorBurst with C708", slug: "flavorburst-c708-soft-serve", shortDescription: "8+ flavors added to C708 soft serve", categorySlug: "flavorburst-programs", subcategoryName: "FlavorBurst for Soft Serve", flavorCount: "8+ Flavors" },
  { modelNumber: "FlavorBlend-C708", name: "FlavorBlend with C708", slug: "flavorblend-c708-soft-serve", shortDescription: "Blended flavor system with C708", categorySlug: "flavorburst-programs", subcategoryName: "FlavorBurst for Soft Serve", flavorCount: "8+ Flavors" },
  { modelNumber: "FlavorBurst-428", name: "FlavorBurst with 428", slug: "flavorburst-428-shakes", shortDescription: "8+ flavors added to 428 shake machine", categorySlug: "flavorburst-programs", subcategoryName: "FlavorBurst for Shakes", flavorCount: "8+ Flavors" },

  // ========================
  // FROZEN COCKTAILS
  // ========================
  { modelNumber: "C300FAB", name: "Zamboozy Frozen Cocktail", slug: "c300fab-zamboozy", shortDescription: "Premium frozen cocktail machine", categorySlug: "frozen-cocktails", subcategoryName: "Frozen Cocktail Machines", flavorCount: "Single Flavor" },
  { modelNumber: "RD30", name: "Frozen Drink Machine", slug: "rd30-frozen-drink", shortDescription: "Versatile frozen drink dispenser", categorySlug: "frozen-cocktails", subcategoryName: "Frozen Cocktail Machines", flavorCount: "Single Flavor" },
  { modelNumber: "340", name: "Frozen Beverage", slug: "340-frozen-beverage", shortDescription: "Commercial frozen beverage machine", categorySlug: "frozen-cocktails", subcategoryName: "Frozen Cocktail Machines", flavorCount: "Single Flavor" },
  { modelNumber: "390", name: "Frozen Beverage", slug: "390-frozen-beverage", shortDescription: "High-capacity frozen beverage", categorySlug: "frozen-cocktails", subcategoryName: "Frozen Cocktail Machines", flavorCount: "Single Flavor" },
  { modelNumber: "342", name: "Frozen Beverage", slug: "342-frozen-beverage", shortDescription: "Two-flavor frozen beverage", categorySlug: "frozen-cocktails", subcategoryName: "Frozen Cocktail Machines", flavorCount: "Two Flavor" },
  { modelNumber: "370", name: "Frozen Beverage", slug: "370-frozen-beverage", shortDescription: "Multi-flavor frozen beverage", categorySlug: "frozen-cocktails", subcategoryName: "Frozen Cocktail Machines", flavorCount: "Multi Flavor" },

  // ========================
  // FROZEN CUSTARD
  // ========================
  { modelNumber: "C002", name: "Single Flavor Custard", slug: "c002-single-custard", shortDescription: "Single flavor frozen custard freezer", categorySlug: "frozen-custard", subcategoryName: "Custard Freezers", flavorCount: "Single Flavor" },
  { modelNumber: "C043", name: "Twin Twist Custard", slug: "c043-twin-custard", shortDescription: "Twin twist frozen custard freezer", categorySlug: "frozen-custard", subcategoryName: "Custard Freezers", flavorCount: "Twin Twist" },

  // ========================
  // COOL CHILLER / FCB
  // ========================
  { modelNumber: "C300", name: "Single Barrel FCB", slug: "c300-fcb", shortDescription: "Single barrel frozen carbonated beverage", categorySlug: "frozen-soda-cool-chiller", subcategoryName: "Frozen Carbonated Beverage (FCB)", flavorCount: "Single Flavor", imageExt: "png" },
  { modelNumber: "C302", name: "Two Barrel FCB", slug: "c302-fcb", shortDescription: "Two barrel frozen carbonated beverage", categorySlug: "frozen-soda-cool-chiller", subcategoryName: "Frozen Carbonated Beverage (FCB)", flavorCount: "Two Flavor", imageExt: "png" },
  { modelNumber: "C303", name: "Three Barrel FCB", slug: "c303-fcb", shortDescription: "Three barrel frozen carbonated beverage", categorySlug: "frozen-soda-cool-chiller", subcategoryName: "Frozen Carbonated Beverage (FCB)", flavorCount: "Three Flavor", imageExt: "png" },
  { modelNumber: "C314", name: "Four Barrel FCB", slug: "c314-fcb", shortDescription: "Four barrel frozen carbonated beverage", categorySlug: "frozen-soda-cool-chiller", subcategoryName: "Frozen Carbonated Beverage (FCB)", flavorCount: "Four Flavor", imageExt: "png" },
];

// ============================================================================
// SALESPEOPLE DATA
// ============================================================================
const SALESPEOPLE_DATA = [
  {
    firstName: "Aaron",
    lastName: "Longenecker",
    slug: "aaron-longenecker",
    email: "a.longenecker@taylorproducts.net",
    phone: "610-295-4819",
    headshotUrl: headshot("aaron-longenecker"),
    bookingLink: "https://app.hubspot.com/meetings/a-longenecker",
    displayOrder: 1,
  },
  {
    firstName: "Jason",
    lastName: "Rossi",
    slug: "jason-rossi",
    email: "j.rossi@taylorproducts.net",
    phone: "732-690-8823",
    headshotUrl: headshot("jason-rossi"),
    bookingLink: "https://app.hubspot.com/meetings/j-rossi1/30",
    displayOrder: 2,
  },
  {
    firstName: "Thomas",
    lastName: "Mauser",
    slug: "thomas-mauser",
    email: "t.mauser@taylorproducts.net",
    phone: "610-761-5522",
    headshotUrl: headshot("thomas-mauser"),
    bookingLink: "https://app.hubspot.com/meetings/t-mauser",
    displayOrder: 3,
  },
  {
    firstName: "Jonathan",
    lastName: "Mauser",
    slug: "jonathan-mauser",
    email: "j.mauser@taylorproducts.net",
    phone: "732-995-2605",
    headshotUrl: headshot("jonathan-mauser"),
    bookingLink: null,
    displayOrder: 4,
  },
];

// ============================================================================
// TESTIMONIALS DATA
// ============================================================================
const TESTIMONIALS_DATA = [
  {
    customerName: "Rex Whetstone",
    businessName: "Ice Cream Shop Owner",
    quote:
      "We own 4 ice cream shops and have used several brands of equipment. We refuse to buy anything but Taylor going forward. Aaron is always checking in, keeping us up to date on the newest ideas, and making sure everything is working great. You can tell he truly cares about our business and our success.",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    customerName: "Keith Zimmerman",
    businessName: "Plum Creek Farm Market & Creamery",
    quote:
      "In the world of quick sales and disposable equipment, Taylor stands out as a company committed to long-term relationships. Before, during, and after the sale, they provide the support we need to keep our busy kitchen running smoothly.",
    isFeatured: true,
    displayOrder: 2,
  },
  {
    customerName: "Nick and Anthony Della Vecchia",
    businessName: "Tony Beef",
    quote:
      "From the first meeting, we knew we were in good hands. Their zeal, tenacity, and dedicated client focus cemented our decision to partner with them.",
    isFeatured: true,
    displayOrder: 3,
  },
  {
    customerName: "Maria Santos",
    businessName: "Scoops Ice Cream Shop",
    quote:
      "What sets Taylor Products apart is their genuine investment in our success. They didn't just sell us equipment—they helped us build a profitable frozen dessert program from scratch.",
    isFeatured: true,
    displayOrder: 4,
  },
];

// ============================================================================
// MAIN SEED FUNCTION
// ============================================================================
async function seed() {
  console.log("Starting database seed...\n");

  try {
    // 1. Seed Categories
    console.log("Seeding categories...");
    const insertedCategories = await db
      .insert(categories)
      .values(CATEGORIES_DATA)
      .onConflictDoNothing()
      .returning();
    console.log(`  Inserted ${insertedCategories.length} categories`);

    // Build category lookup
    const categoryLookup: Record<string, number> = {};
    const allCategories = insertedCategories.length > 0
      ? insertedCategories
      : await db.select().from(categories);
    for (const cat of allCategories) {
      categoryLookup[cat.slug] = cat.id;
    }

    // 2. Seed Subcategories
    console.log("Seeding subcategories...");
    let subcatCount = 0;
    const subcatLookup: Record<string, number> = {};

    for (const [categorySlug, subs] of Object.entries(SUBCATEGORIES_DATA)) {
      const categoryId = categoryLookup[categorySlug];
      if (!categoryId) continue;

      for (const sub of subs) {
        const inserted = await db
          .insert(subcategories)
          .values({
            categoryId,
            name: sub.name,
            displayOrder: sub.displayOrder,
          })
          .onConflictDoNothing()
          .returning();

        if (inserted.length > 0) {
          subcatLookup[`${categorySlug}:${sub.name}`] = inserted[0].id;
          subcatCount++;
        }
      }
    }

    // If subcategories already exist, fetch them
    if (subcatCount === 0) {
      const existingSubs = await db.select().from(subcategories);
      for (const sub of existingSubs) {
        const cat = allCategories.find(c => c.id === sub.categoryId);
        if (cat) {
          subcatLookup[`${cat.slug}:${sub.name}`] = sub.id;
        }
      }
    }
    console.log(`  Inserted ${subcatCount} subcategories`);

    // 3. Seed Machines
    console.log("Seeding machines...");
    let machineCount = 0;

    for (const m of MACHINES_DATA) {
      const categoryId = categoryLookup[m.categorySlug];
      const subcategoryId = subcatLookup[`${m.categorySlug}:${m.subcategoryName}`];

      if (!categoryId) {
        console.warn(`  Warning: Category not found for ${m.modelNumber}`);
        continue;
      }

      const imageUrl = img(m.modelNumber, m.imageExt || "jpg");
      const specSheetUrl = spec(m.modelNumber);

      const inserted = await db
        .insert(machines)
        .values({
          modelNumber: m.modelNumber,
          name: m.name,
          slug: m.slug,
          shortDescription: m.shortDescription,
          categoryId,
          subcategoryId,
          flavorCount: m.flavorCount,
          machineType: m.machineType,
          isAdaCompliant: m.isAdaCompliant || false,
          imageUrl,
          specSheetUrl,
        })
        .onConflictDoNothing()
        .returning();

      if (inserted.length > 0) machineCount++;
    }
    console.log(`  Inserted ${machineCount} machines`);

    // 4. Seed Salespeople
    console.log("Seeding salespeople...");
    const insertedSalespeople = await db
      .insert(salespeople)
      .values(SALESPEOPLE_DATA)
      .onConflictDoNothing()
      .returning();
    console.log(`  Inserted ${insertedSalespeople.length} salespeople`);

    // 5. Seed Testimonials
    console.log("Seeding testimonials...");
    const insertedTestimonials = await db
      .insert(testimonials)
      .values(TESTIMONIALS_DATA)
      .onConflictDoNothing()
      .returning();
    console.log(`  Inserted ${insertedTestimonials.length} testimonials`);

    console.log("\nDatabase seed complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed().catch(console.error);
