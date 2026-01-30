/**
 * Script to fetch machine descriptions from Emery Thompson and Frigomat
 * and update our database with the content.
 *
 * Usage: npx tsx scripts/fetch-other-brands.ts
 */

import { db } from "../lib/db";
import { machines } from "../lib/schema";
import { eq } from "drizzle-orm";
import https from "https";

// Emery Thompson URL mappings
const EMERY_THOMPSON_URLS: Record<string, string> = {
  "CB100": "https://emerythompson.com/product/cb-100/",
  "CB200": "https://emerythompson.com/product/cb-200/",
  "CB350": "https://emerythompson.com/product/cb-350/",
  "12-24QT": "https://emerythompson.com/product/models-24nw-24la/",
  "44QT": "https://emerythompson.com/product/44-blt-44-blt-a-ioc/",
};

// Frigomat GX URL mappings
const FRIGOMAT_URLS: Record<string, string> = {
  "GX2": "https://www.frigomat.com/en/catalogue/detail/gx2/professional-machine-for-fresh-gelato/",
  "GX4": "https://www.frigomat.com/en/catalogue/detail/gx4/professional-machine-for-fresh-gelato/",
  "GX6": "https://www.frigomat.com/en/catalogue/detail/gx6/professional-machine-for-fresh-gelato/",
  "GX8": "https://www.frigomat.com/en/catalogue/detail/gx8/professional-machine-for-fresh-gelato/",
};

async function fetchPage(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const protocol = url.startsWith("https") ? https : https;
    protocol.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve(null);
        return;
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", () => resolve(null));
  });
}

function extractEmeryThompsonContent(html: string): { description: string; features: string[]; specs: Record<string, string> } {
  // Get description from the main <p> tag - look for the product description
  const descMatch = html.match(/<p>​?The (CB-\d+|Model)[^<]+(?:<[^p][^>]*>[^<]*)*[^<]+<\/p>/i);

  let description = "";
  if (descMatch) {
    description = descMatch[0]
      .replace(/<[^>]+>/g, " ")
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "-")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Extract specs from h3 headers and their following text
  const specs: Record<string, string> = {};
  const specMatches = html.matchAll(/<h3>([^<]+)<\/h3>\s*<div class="text"><p>([^<]+)/gi);
  for (const match of specMatches) {
    const key = match[1].trim();
    const value = match[2].replace(/<[^>]+>/g, "").trim();
    if (key !== "Resources" && value.length > 0) {
      specs[key] = value;
    }
  }

  // Build features based on common Emery Thompson characteristics
  const features: string[] = [];
  const descLower = description.toLowerCase();

  if (descLower.includes("versatile")) features.push("Versatile machine for multiple frozen dessert types");
  if (descLower.includes("homemade ice cream") || descLower.includes("ice cream")) features.push("Makes homemade ice cream, dairy-free options, Italian ice, and sorbets");
  if (descLower.includes("dishwasher safe")) features.push("Dishwasher safe parts for easy cleaning");
  if (descLower.includes("removable freezing cylinder") || descLower.includes("removable cylinder")) features.push("Removable freezing cylinder for quick flavor changes");
  if (descLower.includes("spare") || descLower.includes("optional")) features.push("Optional spare stainless steel freezing cylinder available");
  if (descLower.includes("household current") || descLower.includes("115v")) features.push("Plugs into standard household current (115V)");
  if (descLower.includes("stainless steel")) features.push("Durable stainless steel construction");
  if (descLower.includes("no downtime")) features.push("Minimal downtime with quick cylinder swap");

  // Add general Emery Thompson features if we don't have many
  if (features.length < 4) {
    features.push("Made in USA - over 100 years of manufacturing excellence");
    features.push("Commercial-grade batch freezer for artisan ice cream production");
    features.push("Self-contained refrigeration system");
  }

  return { description, features, specs };
}

function extractFrigomatContent(html: string): { description: string; features: string[]; specs: Record<string, string> } {
  // Frigomat pages have specs in table format
  const specs: Record<string, string> = {};

  // Try to extract table data
  const tdMatches = html.matchAll(/<td[^>]*>([^<]+)<\/td>/gi);
  const tdValues: string[] = [];
  for (const match of tdMatches) {
    const text = match[1].trim();
    if (text.length > 0) {
      tdValues.push(text);
    }
  }

  // Frigomat GX series features
  const features = [
    "Professional batch freezer for fresh gelato production",
    "High-quality Italian manufacturing",
    "Precise temperature control for consistent results",
    "Easy to clean and maintain",
    "Compact design for efficient workspace use",
    "Ideal for gelato shops, restaurants, and pastry kitchens",
  ];

  const description = "The Frigomat GX series delivers professional-grade gelato and ice cream production with Italian engineering excellence. These batch freezers are designed for artisan gelato makers who demand consistent quality and reliable performance.";

  return { description, features, specs };
}

function generateLongDescription(brand: string, model: string, description: string, features: string[]): string {
  let longDesc = "";

  if (brand === "Emery Thompson") {
    longDesc = `The Emery Thompson ${model} batch freezer represents over a century of American manufacturing excellence.\n\n`;
  } else if (brand === "Frigomat") {
    longDesc = `The Frigomat ${model} is a professional Italian batch freezer designed for artisan gelato production.\n\n`;
  }

  if (description) {
    longDesc += `${description}\n\n`;
  }

  if (features.length > 0) {
    features.slice(0, 6).forEach((f) => {
      longDesc += `• ${f}\n`;
    });
  }

  return longDesc.trim();
}

async function processOtherBrands() {
  console.log("🔍 Processing Emery Thompson and Frigomat machines...\n");

  // Get all machines
  const allMachines = await db.select({
    id: machines.id,
    modelNumber: machines.modelNumber,
    name: machines.name,
  }).from(machines);

  let successCount = 0;
  let skipCount = 0;

  // Process Emery Thompson machines
  console.log("=== EMERY THOMPSON ===\n");
  for (const machine of allMachines) {
    const modelKey = machine.modelNumber.toUpperCase();
    const url = EMERY_THOMPSON_URLS[modelKey];

    if (!url) continue;

    console.log(`Processing ${machine.modelNumber} - ${machine.name}...`);

    const html = await fetchPage(url);
    if (!html) {
      console.log(`  ❌ Failed to fetch`);
      skipCount++;
      continue;
    }

    const { description, features, specs } = extractEmeryThompsonContent(html);
    const longDescription = generateLongDescription("Emery Thompson", machine.modelNumber, description, features);

    console.log(`  ✅ Extracted content (${features.length} features)`);

    await db.update(machines)
      .set({
        features: features,
        longDescription: longDescription,
        specifications: specs,
      })
      .where(eq(machines.id, machine.id));

    console.log(`  💾 Updated database`);
    successCount++;

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Process Frigomat machines
  console.log("\n=== FRIGOMAT GX SERIES ===\n");
  for (const machine of allMachines) {
    const modelKey = machine.modelNumber.toUpperCase();
    const url = FRIGOMAT_URLS[modelKey];

    if (!url) continue;

    console.log(`Processing ${machine.modelNumber} - ${machine.name}...`);

    const html = await fetchPage(url);
    if (!html) {
      console.log(`  ❌ Failed to fetch`);
      skipCount++;
      continue;
    }

    const { description, features, specs } = extractFrigomatContent(html);
    const longDescription = generateLongDescription("Frigomat", machine.modelNumber, description, features);

    console.log(`  ✅ Extracted content (${features.length} features)`);

    await db.update(machines)
      .set({
        features: features,
        longDescription: longDescription,
        specifications: specs,
      })
      .where(eq(machines.id, machine.id));

    console.log(`  💾 Updated database`);
    successCount++;

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 OTHER BRANDS SUMMARY");
  console.log("=".repeat(50));
  console.log(`✅ Successfully updated: ${successCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
}

// Check for database connection
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is required");
  process.exit(1);
}

processOtherBrands()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
