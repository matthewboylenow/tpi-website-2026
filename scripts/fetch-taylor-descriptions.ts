/**
 * Script to fetch machine descriptions from taylor-company.com
 * and update our database with the content.
 *
 * Usage: npx tsx scripts/fetch-taylor-descriptions.ts
 *
 * Requires DATABASE_URL environment variable to be set.
 */

import { db } from "../lib/db";
import { machines } from "../lib/schema";
import { eq } from "drizzle-orm";
import https from "https";

// Taylor Company URL pattern
const TAYLOR_URL_BASE = "https://www.taylor-company.com/equipment/equipment-detail/model-";

async function fetchTaylorPage(modelNumber: string): Promise<string | null> {
  // Normalize model number for URL (lowercase, remove spaces)
  const urlModel = modelNumber.toLowerCase().replace(/\s+/g, "-");
  const url = `${TAYLOR_URL_BASE}${urlModel}/`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.log(`  ❌ Not found: ${url}`);
        resolve(null);
        return;
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", (err) => {
      console.log(`  ❌ Error: ${err.message}`);
      resolve(null);
    });
  });
}

function extractFeatures(html: string): string[] {
  const features: string[] = [];
  const regex = /<li>([^<]+)<\/li>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const text = match[1].trim();
    // Filter out very short items and URLs
    if (text.length > 15 && !text.includes("http")) {
      features.push(text);
    }
  }

  // Return first 10 features max
  return features.slice(0, 10);
}

function extractTitle(html: string): string | null {
  const match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  return match ? match[1].trim() : null;
}

function extractSpecs(html: string): Record<string, string> {
  const specs: Record<string, string> = {};

  // Look for h3/p pairs in the specs section
  const specsSection = html.match(/SPECS<\/h2>[\s\S]*?(?=<section|<\/div><\/div><\/div><\/section)/i);
  if (specsSection) {
    const pairRegex = /<h3>([^<]+)<\/h3>\s*<p>([^<]+)<\/p>/gi;
    let match;
    while ((match = pairRegex.exec(specsSection[0])) !== null) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key && value) {
        specs[key] = value;
      }
    }
  }

  return specs;
}

function generateLongDescription(title: string | null, features: string[]): string {
  if (features.length === 0) return "";

  // Build a comprehensive description from the features
  const cleanTitle = title?.replace(/^TAYLOR\s+/i, "Taylor ").replace(/0+(\d)/, "$1") || "This machine";

  let description = `The ${cleanTitle} delivers reliable performance for high-volume foodservice operations.\n\n`;

  // Add key features as paragraphs
  const mainFeatures = features.slice(0, 6);
  mainFeatures.forEach((feature) => {
    description += `${feature}\n\n`;
  });

  return description.trim();
}

async function processAllMachines() {
  console.log("🔍 Fetching all machines from database...\n");

  const allMachines = await db.select({
    id: machines.id,
    modelNumber: machines.modelNumber,
    name: machines.name,
  }).from(machines);

  console.log(`📋 Found ${allMachines.length} machines\n`);

  let successCount = 0;
  let skipCount = 0;

  for (const machine of allMachines) {
    console.log(`Processing ${machine.modelNumber} - ${machine.name}...`);

    const html = await fetchTaylorPage(machine.modelNumber);

    if (!html) {
      skipCount++;
      continue;
    }

    const title = extractTitle(html);
    const features = extractFeatures(html);
    const specs = extractSpecs(html);

    if (features.length > 0) {
      const longDescription = generateLongDescription(title, features);

      console.log(`  ✅ Found ${features.length} features, ${Object.keys(specs).length} specs`);

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
    } else {
      console.log(`  ⚠️ No features found`);
      skipCount++;
    }

    // Rate limiting - wait 300ms between requests
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total machines: ${allMachines.length}`);
  console.log(`✅ Successfully updated: ${successCount}`);
  console.log(`⏭️  Skipped (not on Taylor site): ${skipCount}`);
}

// Check for database connection
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is required");
  console.error("   Run with: DATABASE_URL=your_url npx tsx scripts/fetch-taylor-descriptions.ts");
  process.exit(1);
}

// Run the script
processAllMachines()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
