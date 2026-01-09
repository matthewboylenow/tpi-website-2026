import { put } from "@vercel/blob";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

// Load .env.local explicitly
config({ path: path.resolve(process.cwd(), ".env.local") });

const WP_BASE = "https://taylorproducts.net/wp-content/uploads";

interface AssetMapping {
  [oldUrl: string]: string;
}

// Soft Serve & Frozen Yogurt
const SOFT_SERVE_IMAGES = [
  { old: "/2022/04/model_c606-300x300.jpg", model: "C606" },
  { old: "/2022/04/model_c709-300x300.jpg", model: "C709" },
  { old: "/2022/04/model_c708-300x300.jpg", model: "C708" },
  { old: "/2022/04/model_c717-300x300.jpg", model: "C717" },
  { old: "/2022/04/model_c716-300x300.jpg", model: "C716" },
  { old: "/2022/04/model_c707-300x300.jpg", model: "C707" },
  { old: "/2022/04/model_c706-300x300.jpg", model: "C706" },
  { old: "/2022/04/model_8752-300x300.jpg", model: "8752" },
  { old: "/2022/04/model_702-300x300.jpg", model: "702" },
  { old: "/2022/04/C152-233x300.jpg", model: "C152" },
  { old: "/2022/05/C723-Dual-Instagram-258x300.jpg", model: "C723" },
  { old: "/2022/04/model_c723ada-300x300.jpg", model: "C723ADA" },
  { old: "/2022/04/model_c161_sm-300x300.jpg", model: "C161" },
  { old: "/2022/04/model_8756-300x300.jpg", model: "8756" },
  { old: "/2022/04/model_c722-300x300.jpg", model: "C722" },
  { old: "/2022/04/model_c722ada-300x300.jpg", model: "C722ADA" },
  { old: "/2022/04/C_C791-125x300.png", model: "C791" },
  { old: "/2022/04/C_C794-125x300.png", model: "C794" },
  { old: "/2022/04/model_c713-300x300.jpg", model: "C713" },
  { old: "/2022/04/model_c712-300x300.jpg", model: "C712" },
  { old: "/2022/04/model_772-300x300.jpg", model: "772" },
  { old: "/2022/04/model_632-300x300.jpg", model: "632" },
  { old: "/2022/08/C612-300x300.png", model: "C612" },
];

// Icetro
const ICETRO_IMAGES = [
  {
    old: "/2024/05/Icetro_ISI-161_SoftServe_PhotoMain_Right_1-300x300.jpg",
    model: "ISI-161TH",
  },
  {
    old: "/2024/05/Icetro_163ST_SoftServe_PhotoMain_Front_1-128x300.png",
    model: "ISI-163ST",
  },
  { old: "/2024/05/ISI-163TT-300x300.jpg", model: "ISI-163TT" },
  {
    old: "/2024/05/Icetro_SSI-203_SoftServe_PhotoMain_Right_1-300x300.jpg",
    model: "SSI-203SN",
  },
  { old: "/2025/08/Icetro_ISI-271THS-300x300.jpg", model: "ISI-271" },
  {
    old: "/2024/05/Icetro_ISI-300TA_SoftServe_PhotoMain_Right_1-300x300.jpg",
    model: "ISI-300TA",
  },
  { old: "/2025/09/ISI-301TH.jpg", model: "ISI-301TH" },
  {
    old: "/2024/05/Icetro_SSI-303_SoftServe_PhotoMain_Right_1-300x300.jpg",
    model: "ISI-303SNA",
  },
];

// Two Sided Grills
const GRILL_IMAGES = [
  {
    old: "/2023/08/Taylor-L858-CommercialClamshellGrill-PhotoMain-1-e1691083759580-244x300.png",
    model: "L858",
  },
  { old: "/2023/08/L852B-185x300.png", model: "L852" },
  { old: "/2024/10/L850-98x300.png", model: "L850" },
  { old: "/2022/04/model_l828-300x300.jpg", model: "L828" },
  { old: "/2022/04/model_l822-300x300.jpg", model: "L822" },
  { old: "/2022/04/model_l820-300x300.jpg", model: "L820" },
  { old: "/2022/04/model_l812-300x300.jpg", model: "L812" },
  { old: "/2022/04/model_l810-300x300.jpg", model: "L810" },
  { old: "/2022/04/model_l821-300x300.jpg", model: "L821" },
  { old: "/2022/04/model_l819-300x300.jpg", model: "L819" },
  { old: "/2022/04/model_l813-300x300.jpg", model: "L813" },
  { old: "/2022/04/model_l811-300x300.jpg", model: "L811" },
  { old: "/2025/04/R160-185x300.png", model: "R160" },
  { old: "/2025/04/R200-185x300.png", model: "R200" },
  { old: "/2025/04/R280-185x300.png", model: "R280" },
];

// Milkshakes & Frozen Beverages
const SHAKE_IMAGES = [
  { old: "/2022/04/model_ph61-300x300.jpg", model: "PH61" },
  { old: "/2022/04/model_428-300x300.jpg", model: "428" },
  { old: "/2022/04/model_430-300x300.jpg", model: "430" },
  { old: "/2022/04/model_441-300x300.jpg", model: "441" },
  { old: "/2022/04/model_490-300x300.jpg", model: "490" },
  { old: "/2022/04/model_358-300x300.jpg", model: "358" },
  { old: "/2022/04/model_432-300x300.jpg", model: "432" },
  { old: "/2022/04/model_60-300x300.jpg", model: "60" },
  { old: "/2022/04/model_62-300x300.jpg", model: "62" },
  { old: "/2022/04/model_359-300x300.jpg", model: "359" },
  { old: "/2022/04/model_rd30-300x300.jpg", model: "RD30" },
  { old: "/2022/04/model_340-300x300.jpg", model: "340" },
  { old: "/2022/04/model_390-300x300.jpg", model: "390" },
  { old: "/2022/04/model_342-300x300.jpg", model: "342" },
  { old: "/2022/04/model_370-300x300.jpg", model: "370" },
];

// Batch / Emery Thompson
const BATCH_IMAGES = [
  { old: "/2022/04/model_104-300x300.jpg", model: "104" },
  { old: "/2025/03/CB-100-300x300.png", model: "CB100" },
  { old: "/2025/03/CB-200-300x300.png", model: "CB200" },
  { old: "/2025/03/CB-350-300x300.png", model: "CB350" },
  { old: "/2025/03/12_24-QT-300x300.png", model: "12-24QT" },
  { old: "/2025/03/44-QT-300x300.png", model: "44QT" },
  { old: "/2022/04/FR260-201x300.jpg", model: "FR260" },
  { old: "/2022/04/GX2-new-version-scaled-1-257x300.jpg", model: "GX2" },
  { old: "/2022/04/GX4-SERIE-04-scaled-1-300x225.jpg", model: "GX4" },
  { old: "/2022/04/GX6-scaled-1-300x277.jpg", model: "GX6" },
  { old: "/2022/04/GX8-scaled-1-300x225.jpg", model: "GX8" },
];

// FlavorBurst
const FLAVORBURST_IMAGES = [
  { old: "/2022/04/ctp80ss_c708_3-copy-293x300.jpg", model: "FlavorBurst-C708" },
  {
    old: "/2022/04/ctp80bld_c708_2-copy-293x300.jpg",
    model: "FlavorBlend-C708",
  },
  { old: "/2022/04/ctp80bev_428_sh2-copy-300x286.jpg", model: "FlavorBurst-428" },
];

// Cocktails & Custard
const COCKTAIL_CUSTARD_IMAGES = [
  {
    old: "/2022/04/Zamboozy__C300FAB_FrontA-scaled-1-200x300.jpg",
    model: "C300FAB",
  },
  { old: "/2022/04/model_c002-300x300.jpg", model: "C002" },
  { old: "/2022/04/model_c043-300x300.jpg", model: "C043" },
];

// Cool Chiller / FCB
const FCB_IMAGES = [
  { old: "/2022/04/model_c300_2018-300x300.png", model: "C300" },
  { old: "/2022/04/model_c302_2018-300x300.png", model: "C302" },
  { old: "/2022/04/model_c303_2018-300x300.png", model: "C303" },
  { old: "/2022/04/model_c314_2018-300x300.png", model: "C314" },
];

// Spec Sheet PDFs
const SPEC_SHEETS = [
  // Soft Serve
  { old: "/2022/06/C606.pdf", model: "C606" },
  { old: "/2022/06/C709.pdf", model: "C709" },
  { old: "/2022/06/C708.pdf", model: "C708" },
  { old: "/2022/06/C717.pdf", model: "C717" },
  { old: "/2022/06/C716.pdf", model: "C716" },
  { old: "/2022/06/C707.pdf", model: "C707" },
  { old: "/2022/06/C706.pdf", model: "C706" },
  { old: "/2022/06/8752.pdf", model: "8752" },
  { old: "/2022/04/s0702.pdf", model: "702" },
  { old: "/2022/06/C152.pdf", model: "C152" },
  { old: "/2022/06/C723.pdf", model: "C723" },
  { old: "/2022/06/C723ADA.pdf", model: "C723ADA" },
  { old: "/2022/06/sC161.pdf", model: "C161" },
  { old: "/2022/06/8756.pdf", model: "8756" },
  { old: "/2022/06/C722.pdf", model: "C722" },
  { old: "/2022/04/sc722ada.pdf", model: "C722ADA" },
  { old: "/2022/06/C791.pdf", model: "C791" },
  { old: "/2022/06/C794.pdf", model: "C794" },
  { old: "/2022/06/C713.pdf", model: "C713" },
  { old: "/2022/06/C712.pdf", model: "C712" },
  { old: "/2022/04/s0772.pdf", model: "772" },
  { old: "/2022/06/632.pdf", model: "632" },
  { old: "/2022/08/C612-Draft.pdf", model: "C612" },

  // Icetro
  {
    old: "/2024/05/Icetro_ISI161THTI_SoftServe_SpecSheet_1.pdf",
    model: "ISI-161TH",
  },
  {
    old: "/2024/05/Icetro_ISI163TTST_SoftServe_SpecSheet_1-1.pdf",
    model: "ISI-163ST",
  },
  {
    old: "/2024/05/Icetro_ISI203SNN_SoftServe_SpecSheet_1_REV.pdf",
    model: "SSI-203SN",
  },
  {
    old: "/2025/08/Icetro_ISI271THSSHS_SoftServe_SpecSheet_4.pdf",
    model: "ISI-271",
  },
  {
    old: "/2024/05/Icetro_ISI300TA_SoftServe_SpecSheet_1.pdf",
    model: "ISI-300TA",
  },
  {
    old: "/2024/05/Icetro_ISI303SNASNW_SoftServe_SpecSheet_1-1.pdf",
    model: "ISI-303SNA",
  },

  // Grills
  {
    old: "/2023/08/Taylor_L858_CommercialClamshellGrill_SpecSheet1.pdf",
    model: "L858",
  },
  { old: "/2023/08/L852_Crown.pdf", model: "L852" },
  { old: "/2024/10/L850-Spec-Sheet-1.pdf", model: "L850" },
  { old: "/2022/04/sl828.pdf", model: "L828" },
  { old: "/2022/04/sl822.pdf", model: "L822" },
  { old: "/2022/04/sl820.pdf", model: "L820" },
  { old: "/2022/04/sl812.pdf", model: "L812" },
  { old: "/2022/04/sl810.pdf", model: "L810" },
  { old: "/2022/04/sl821.pdf", model: "L821" },
  { old: "/2022/04/sl819.pdf", model: "L819" },
  { old: "/2022/04/sl813.pdf", model: "L813" },
  { old: "/2022/04/sl811.pdf", model: "L811" },
  { old: "/2025/04/R160.pdf", model: "R160" },
  { old: "/2025/04/R200.pdf", model: "R200" },
  { old: "/2025/04/R280.pdf", model: "R280" },

  // Shakes & Beverages
  { old: "/2022/04/sph61.pdf", model: "PH61" },
  { old: "/2022/04/sC708SHK.pdf", model: "C708SHK" },
  { old: "/2022/06/428.pdf", model: "428" },
  { old: "/2022/06/430.pdf", model: "430" },
  { old: "/2022/06/441.pdf", model: "441" },
  { old: "/2022/06/490.pdf", model: "490" },
  { old: "/2024/07/Spec-sheet-Changes-490-JIB.pdf", model: "490-Extra-Thick" },
  { old: "/2022/06/358.pdf", model: "358" },
  { old: "/2022/04/s0432.pdf", model: "432" },
  { old: "/2022/04/s0060.pdf", model: "60" },
  { old: "/2022/04/s0062.pdf", model: "62" },
  { old: "/2022/06/359.pdf", model: "359" },

  // Batch / Emery Thompson
  { old: "/2022/06/104.pdf", model: "104" },
  { old: "/2025/03/CB-100-SPECIFICATIONS.pdf", model: "CB100" },
  { old: "/2025/03/CB-200-SPECIFICATIONS.pdf", model: "CB200" },
  { old: "/2025/03/CB-350-SPECIFICATIONS-1.pdf", model: "CB350" },
  { old: "/2025/03/12-24QT-SPECIFICATIONS.pdf", model: "12-24QT" },
  { old: "/2025/03/44QT-SPECIFICATIONS.pdf", model: "44QT" },
  { old: "/2022/06/FR-260-Batch-Freezer.pdf", model: "FR260" },
  { old: "/2022/04/GX2-Gelato-Cart-New-Generation.pdf", model: "GX2" },
  { old: "/2022/04/GX4.pdf", model: "GX4" },
  { old: "/2022/04/GX6.pdf", model: "GX6" },
  { old: "/2022/04/GX8-Gelato-Cart.pdf", model: "GX8" },

  // FlavorBurst
  { old: "/2022/04/pop_6051ctp_bleed.pdf", model: "FlavorBurst-C708" },
  { old: "/2022/04/pop_6052ctp_bleed.pdf", model: "FlavorBlend-C708" },
  { old: "/2022/12/POP_7076CTP_bleed.pdf", model: "FlavorBurst-428" },

  // Cocktails
  { old: "/2022/04/C300FAB.pdf", model: "C300FAB" },
  { old: "/2022/04/srd30.pdf", model: "RD30" },
  { old: "/2022/06/340.pdf", model: "340" },
  { old: "/2022/06/390.pdf", model: "390" },
  { old: "/2022/06/342.pdf", model: "342" },
  { old: "/2022/04/370.pdf", model: "370" },

  // Custard
  { old: "/2022/06/C002.pdf", model: "C002" },
  { old: "/2022/06/C043.pdf", model: "C043" },

  // Cool Chiller
  { old: "/2022/04/sC300.pdf", model: "C300" },
  { old: "/2022/04/sC302.pdf", model: "C302" },
  { old: "/2022/04/sC303.pdf", model: "C303" },
  { old: "/2022/04/sC314.pdf", model: "C314" },
];

// Site Assets (Logos, Heroes, Category Cards)
const SITE_ASSETS = [
  // Logo
  { old: "/2022/04/Artboard-2@2x-300x83.png", name: "logo", category: "brand" },

  // Hero Images
  {
    old: "/2022/05/Soft-Serve-Frozen-Yogurt-Hero-Image.png",
    name: "hero-soft-serve",
    category: "heroes",
  },
  { old: "/2022/04/hot-foods.jpg", name: "hero-grills", category: "heroes" },
  {
    old: "/2022/04/frozen-cocktails.jpg",
    name: "hero-cocktails",
    category: "heroes",
  },
  {
    old: "/2022/04/milkshakes.jpg",
    name: "hero-milkshakes",
    category: "heroes",
  },
  {
    old: "/2025/03/Batch-Gelato-Hero.png",
    name: "hero-batch",
    category: "heroes",
  },
  {
    old: "/2022/04/flavor-burst-c708.png",
    name: "hero-flavorburst",
    category: "heroes",
  },
  { old: "/2022/04/4-1.jpg", name: "hero-custard", category: "heroes" },
  { old: "/2022/04/premium-slush.jpg", name: "hero-slush", category: "heroes" },
  {
    old: "/2022/04/smoothies-frozen-capuccino.jpg",
    name: "hero-smoothies",
    category: "heroes",
  },
  {
    old: "/2022/04/cool-chiller.jpg",
    name: "hero-coolchiller",
    category: "heroes",
  },
  {
    old: "/2024/05/Icetro-Hero-1024x1024.png",
    name: "hero-icetro",
    category: "heroes",
  },

  // Homepage & General
  {
    old: "/2022/04/our-equipment-programs-1024x682.jpg",
    name: "homepage-equipment",
    category: "general",
  },
  {
    old: "/2022/04/hero-service-image.jpg",
    name: "hero-service",
    category: "heroes",
  },
  {
    old: "/2022/04/genuine-parts.png",
    name: "genuine-parts",
    category: "general",
  },
  {
    old: "/2024/02/TPI-Sales-Territories-022024.png",
    name: "territory-map",
    category: "general",
  },
  {
    old: "/2025/03/Emery-Thompson-Logo-full.png",
    name: "emery-thompson-logo",
    category: "brand",
  },
  {
    old: "/2025/10/New-PNG-300x217.png",
    name: "whats-new-badge",
    category: "general",
  },
  {
    old: "/2025/08/default-showcase-300x300.png",
    name: "finder-default",
    category: "general",
  },

  // Category Cards (Homepage Grid)
  { old: "/2022/04/2-1.png", name: "card-soft-serve", category: "cards" },
  { old: "/2022/04/7-1.png", name: "card-flavorburst", category: "cards" },
  { old: "/2022/04/4-1.png", name: "card-batch", category: "cards" },
  {
    old: "/2022/10/Frozen-Custard-Graphic.png",
    name: "card-custard",
    category: "cards",
  },
  { old: "/2022/04/Slush.png", name: "card-slush", category: "cards" },
  {
    old: "/2022/04/IMG_20200528_142624.png",
    name: "card-coolchiller",
    category: "cards",
  },
  { old: "/2022/04/1-1.png", name: "card-cocktails", category: "cards" },
  { old: "/2022/04/3-1.png", name: "card-smoothies", category: "cards" },
  { old: "/2022/04/6-1.png", name: "card-milkshakes", category: "cards" },
  { old: "/2022/04/8-1.png", name: "card-grills", category: "cards" },
];

// Salesperson Headshots
const SALESPERSON_IMAGES = [
  {
    old: "/2022/04/IMG_5237-1-scaled-1-300x300.jpg",
    name: "aaron-longenecker",
  },
  {
    old: "/2022/04/IMG_20200811_132717_Bokeh-300x300.jpg",
    name: "jason-rossi",
  },
  { old: "/2022/04/IMG_5274-300x300.jpg", name: "thomas-mauser" },
  { old: "/2024/01/Jon-Headshot-300x300.jpg", name: "jonathan-mauser" },
];

async function downloadFile(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const makeRequest = (requestUrl: string) => {
      https
        .get(requestUrl, (response) => {
          if (response.statusCode === 301 || response.statusCode === 302) {
            if (response.headers.location) {
              makeRequest(response.headers.location);
            } else {
              reject(new Error(`Redirect without location header: ${url}`));
            }
            return;
          }
          if (response.statusCode !== 200) {
            reject(
              new Error(`Failed to download: ${url} (${response.statusCode})`)
            );
            return;
          }
          const chunks: Buffer[] = [];
          response.on("data", (chunk) => chunks.push(chunk));
          response.on("end", () => resolve(Buffer.concat(chunks)));
          response.on("error", reject);
        })
        .on("error", reject);
    };
    makeRequest(url);
  });
}

async function migrateAsset(
  oldPath: string,
  newPath: string
): Promise<{ oldUrl: string; newUrl: string } | null> {
  const oldUrl = `${WP_BASE}${oldPath}`;

  try {
    console.log(`  Downloading: ${oldPath}`);
    const buffer = await downloadFile(oldUrl);

    console.log(`  Uploading: ${newPath}`);
    const blob = await put(newPath, buffer, {
      access: "public",
      addRandomSuffix: false,
    });

    console.log(`  Complete: ${blob.url}`);
    return { oldUrl, newUrl: blob.url };
  } catch (error) {
    console.error(`  Failed: ${oldPath} - ${error}`);
    return null;
  }
}

function getExtension(path: string): string {
  const match = path.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : "jpg";
}

async function main() {
  const mapping: AssetMapping = {};
  const errors: string[] = [];

  console.log("Starting Taylor Products asset migration...\n");

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Error: BLOB_READ_WRITE_TOKEN environment variable not set");
    console.error("Please add it to your .env.local file");
    process.exit(1);
  }

  // Combine all machine images
  const allMachineImages = [
    ...SOFT_SERVE_IMAGES,
    ...ICETRO_IMAGES,
    ...GRILL_IMAGES,
    ...SHAKE_IMAGES,
    ...BATCH_IMAGES,
    ...FLAVORBURST_IMAGES,
    ...COCKTAIL_CUSTARD_IMAGES,
    ...FCB_IMAGES,
  ];

  // Migrate machine images
  console.log(`\n=== Machine Images (${allMachineImages.length}) ===\n`);
  for (const img of allMachineImages) {
    const ext = getExtension(img.old);
    const newPath = `machines/${img.model.toLowerCase()}.${ext}`;
    const result = await migrateAsset(img.old, newPath);
    if (result) {
      mapping[result.oldUrl] = result.newUrl;
    } else {
      errors.push(img.old);
    }
  }

  // Migrate spec sheets
  console.log(`\n=== Spec Sheets (${SPEC_SHEETS.length}) ===\n`);
  for (const spec of SPEC_SHEETS) {
    const newPath = `specs/${spec.model.toLowerCase()}.pdf`;
    const result = await migrateAsset(spec.old, newPath);
    if (result) {
      mapping[result.oldUrl] = result.newUrl;
    } else {
      errors.push(spec.old);
    }
  }

  // Migrate site assets
  console.log(`\n=== Site Assets (${SITE_ASSETS.length}) ===\n`);
  for (const asset of SITE_ASSETS) {
    const ext = getExtension(asset.old);
    const newPath = `${asset.category}/${asset.name}.${ext}`;
    const result = await migrateAsset(asset.old, newPath);
    if (result) {
      mapping[result.oldUrl] = result.newUrl;
    } else {
      errors.push(asset.old);
    }
  }

  // Migrate salesperson headshots
  console.log(`\n=== Salesperson Headshots (${SALESPERSON_IMAGES.length}) ===\n`);
  for (const person of SALESPERSON_IMAGES) {
    const ext = getExtension(person.old);
    const newPath = `salespeople/${person.name}.${ext}`;
    const result = await migrateAsset(person.old, newPath);
    if (result) {
      mapping[result.oldUrl] = result.newUrl;
    } else {
      errors.push(person.old);
    }
  }

  // Save mapping for database seeding
  fs.writeFileSync(
    "./scripts/migration-url-mapping.json",
    JSON.stringify(mapping, null, 2)
  );

  console.log(`\n========================================`);
  console.log(`Migration complete!`);
  console.log(`   Successful: ${Object.keys(mapping).length}`);
  console.log(`   Failed: ${errors.length}`);
  console.log(`========================================\n`);

  if (errors.length > 0) {
    fs.writeFileSync(
      "./scripts/migration-errors.json",
      JSON.stringify(errors, null, 2)
    );
    console.log("Failed assets saved to: ./scripts/migration-errors.json");
  }

  console.log("URL mapping saved to: ./scripts/migration-url-mapping.json");
}

main().catch(console.error);
