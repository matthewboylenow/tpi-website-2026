/**
 * Script to fetch Icetro machine descriptions from icetrosoftserve.com
 * and update our database with the content.
 *
 * Usage: npx tsx scripts/fetch-icetro-descriptions.ts
 */

import { db } from "../lib/db";
import { machines } from "../lib/schema";
import { eq } from "drizzle-orm";
import https from "https";

// Mapping of our model numbers to Icetro URLs
const ICETRO_URLS: Record<string, string> = {
  "ISI-161TH": "https://icetrosoftserve.com/product/single-flavor-countertop-air-cooled-mini-soft-serve-ice-cream-machine-with-heat-treatment/",
  "ISI-163ST": "https://icetrosoftserve.com/product/two-flavor-one-twist-countertop-air-cooled-soft-serve-ice-cream-machine/",
  "ISI-163TT": "https://icetrosoftserve.com/product/two-flavor-one-twist-freestanding-air-cooled-soft-serve-ice-cream-machine/",
  "ISI-301TH": "https://icetrosoftserve.com/product/single-flavor-countertop-self-serve-air-cooled-soft-serve-ice-cream-machine-with-heat-treatment/",
  "SSI-203SN": "https://icetrosoftserve.com/product/two-flavor-one-twist-freestanding-air-cooled-soft-serve-ice-cream-machine-2/",
  "ISI-271": "https://icetrosoftserve.com/product/single-flavor-freestanding-self-serve-air-cooled-soft-serve-ice-cream-machine-with-heat-treatment/",
  "ISI-300TA": "https://icetrosoftserve.com/product/single-flavor-countertop-air-cooled-soft-serve-ice-cream-machine/",
  "ISI-303SNA": "https://icetrosoftserve.com/product/two-flavor-one-twist-freestanding-air-cooled-soft-serve-ice-cream-machine/",
};

async function fetchPage(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    https.get(url, (res) => {
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

function extractContent(html: string): { description: string; features: string[]; specs: Record<string, string> } {
  // Get main description from first <p> tag with substantial content
  const descMatch = html.match(/<p>([^<]{30,})<\/p>/);
  const description = descMatch
    ? descMatch[1].replace(/&amp;/g, "&").replace(/&#?\w+;/g, " ").trim()
    : "";

  // Extract features from list items that don't have colons (specs have colons)
  const features: string[] = [];

  // First, try to get bullet point features
  const bulletRegex = /•\s*([^<\n•]+)/g;
  let match;
  while ((match = bulletRegex.exec(html)) !== null) {
    const text = match[1].replace(/&amp;/g, "&").trim();
    if (text.length > 5 && !text.includes(":")) {
      features.push(text);
    }
  }

  // Also extract features from simple <li> tags without colons
  const featureLiRegex = /<li>([^<:]+)<\/li>/gi;
  while ((match = featureLiRegex.exec(html)) !== null) {
    const text = match[1].trim();
    if (text.length > 10 && text.length < 100 && !text.includes("Brush") && !text.includes("O-Ring") && !text.includes("Gasket")) {
      // Check if it's not already in features
      if (!features.some(f => f.toLowerCase() === text.toLowerCase())) {
        features.push(text);
      }
    }
  }

  // Get specs - items with colons
  const specs: Record<string, string> = {};
  const specRegex = /<li>([^<]+):\s*([^<]+)<\/li>/gi;
  while ((match = specRegex.exec(html)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    // Filter out parts/accessories
    if (key && value && !key.includes("Brush") && !key.includes("O-Ring") && !key.includes("Gasket") && !key.includes("Blade")) {
      specs[key] = value;
    }
  }

  return { description, features: features.slice(0, 10), specs };
}

function generateLongDescription(model: string, description: string, features: string[]): string {
  let longDesc = `The Icetro ${model} delivers reliable soft serve performance with commercial-grade construction.\n\n`;

  if (description) {
    longDesc += `${description}\n\n`;
  }

  if (features.length > 0) {
    longDesc += "Key features include:\n";
    features.slice(0, 6).forEach((f) => {
      longDesc += `• ${f}\n`;
    });
  }

  return longDesc.trim();
}

async function processIcetroMachines() {
  console.log("🔍 Fetching Icetro machines from database...\n");

  // Get all Icetro machines
  const icetroMachines = await db.select({
    id: machines.id,
    modelNumber: machines.modelNumber,
    name: machines.name,
  }).from(machines);

  const icetroOnly = icetroMachines.filter(m =>
    m.modelNumber.toUpperCase().startsWith("ISI") ||
    m.modelNumber.toUpperCase().startsWith("SSI")
  );

  console.log(`📋 Found ${icetroOnly.length} Icetro machines\n`);

  let successCount = 0;
  let skipCount = 0;

  for (const machine of icetroOnly) {
    const modelKey = machine.modelNumber.toUpperCase();
    const url = ICETRO_URLS[modelKey];

    console.log(`Processing ${machine.modelNumber} - ${machine.name}...`);

    if (!url) {
      console.log(`  ⚠️ No URL mapping for ${modelKey}`);
      skipCount++;
      continue;
    }

    const html = await fetchPage(url);

    if (!html) {
      console.log(`  ❌ Failed to fetch ${url}`);
      skipCount++;
      continue;
    }

    const { description, features, specs } = extractContent(html);
    const longDescription = generateLongDescription(machine.modelNumber, description, features);

    console.log(`  ✅ Found description + ${features.length} features + ${Object.keys(specs).length} specs`);

    // Update database
    await db.update(machines)
      .set({
        features: features,
        longDescription: longDescription,
        specifications: specs,
      })
      .where(eq(machines.id, machine.id));

    console.log(`  💾 Updated database`);
    successCount++;

    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 ICETRO SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total Icetro machines: ${icetroOnly.length}`);
  console.log(`✅ Successfully updated: ${successCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
}

// Check for database connection
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is required");
  process.exit(1);
}

processIcetroMachines()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
