/**
 * Blog Data Migration Script
 *
 * Handles three tasks:
 * 1. Update publish dates from WordPress XML export
 * 2. Migrate featured images from WordPress URLs to Vercel Blob storage
 * 3. Apply AI-generated excerpts, meta titles, and meta descriptions
 *
 * Usage: npx tsx scripts/migrate-blog-data.ts [--dates] [--images] [--seo]
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { put } from "@vercel/blob";
import { DOMParser } from "@xmldom/xmldom";
import * as fs from "fs";
import * as path from "path";
import * as schema from "../lib/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// ==========================================
// Task 1: Update publish dates from WordPress XML
// ==========================================
async function updatePublishDates() {
  console.log("\n=== Updating Publish Dates from WordPress XML ===\n");

  const xmlPath = path.join(process.cwd(), "public", "taylorproducts.WordPress.2026-02-17.xml");
  const xmlContent = fs.readFileSync(xmlPath, "utf-8");
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlContent, "text/xml");

  const items = doc.getElementsByTagName("item");
  const wpDateMap: Record<string, Date> = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Get post type
    const postType = getMetaValue(item, "wp:post_type");
    if (postType !== "post") continue;

    // Get slug
    const postName = getTagContent(item, "wp:post_name");
    if (!postName) continue;

    // Get publish date
    const pubDateStr = getTagContent(item, "pubDate");
    if (!pubDateStr) continue;

    const pubDate = new Date(pubDateStr);
    if (isNaN(pubDate.getTime())) continue;

    wpDateMap[postName] = pubDate;
  }

  console.log(`Found ${Object.keys(wpDateMap).length} posts with dates in WordPress XML`);

  // Get all posts from database
  const posts = await db.select({
    id: schema.blogPosts.id,
    slug: schema.blogPosts.slug,
    title: schema.blogPosts.title,
  }).from(schema.blogPosts);

  let updated = 0;
  for (const post of posts) {
    const wpDate = wpDateMap[post.slug];
    if (wpDate) {
      await db
        .update(schema.blogPosts)
        .set({ publishedAt: wpDate, updatedAt: new Date() })
        .where(eq(schema.blogPosts.id, post.id));
      console.log(`  ✓ ${post.title} → ${wpDate.toISOString()}`);
      updated++;
    } else {
      console.log(`  ✗ No WP date found for: ${post.title} (slug: ${post.slug})`);
    }
  }

  console.log(`\nUpdated ${updated}/${posts.length} publish dates`);
}

// ==========================================
// Task 2: Migrate featured images to Vercel Blob
// ==========================================
async function migrateImages() {
  console.log("\n=== Migrating Featured Images to Vercel Blob ===\n");

  const posts = await db.select({
    id: schema.blogPosts.id,
    title: schema.blogPosts.title,
    featuredImageUrl: schema.blogPosts.featuredImageUrl,
  }).from(schema.blogPosts);

  const wpPosts = posts.filter(
    (p) => p.featuredImageUrl && p.featuredImageUrl.includes("taylorproducts.net/wp-content/")
  );

  console.log(`Found ${wpPosts.length} posts with WordPress image URLs`);

  let migrated = 0;
  let failed = 0;

  for (const post of wpPosts) {
    try {
      const imageUrl = post.featuredImageUrl!;
      console.log(`  Downloading: ${imageUrl}`);

      // Download the image
      const response = await fetch(imageUrl);
      if (!response.ok) {
        console.log(`  ✗ Failed to download (${response.status}): ${post.title}`);
        failed++;
        continue;
      }

      const contentType = response.headers.get("content-type") || "image/jpeg";
      const buffer = await response.arrayBuffer();

      // Extract filename from URL
      const urlParts = imageUrl.split("/");
      const originalFilename = urlParts[urlParts.length - 1]
        .replace(/[^a-zA-Z0-9.-]/g, "-");
      const timestamp = Date.now();
      const blobFilename = `blog/${timestamp}-${originalFilename}`;

      // Upload to Vercel Blob
      const blob = await put(blobFilename, Buffer.from(buffer), {
        access: "public",
        addRandomSuffix: false,
        contentType,
      });

      // Update database
      await db
        .update(schema.blogPosts)
        .set({ featuredImageUrl: blob.url, updatedAt: new Date() })
        .where(eq(schema.blogPosts.id, post.id));

      console.log(`  ✓ ${post.title} → ${blob.url}`);
      migrated++;

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 500));
    } catch (error) {
      console.error(`  ✗ Error migrating image for "${post.title}":`, error);
      failed++;
    }
  }

  console.log(`\nMigrated: ${migrated}, Failed: ${failed}`);
}

// ==========================================
// Task 3: Apply AI-generated SEO data
// ==========================================
async function applySeoData() {
  console.log("\n=== Applying AI-Generated SEO Data ===\n");

  // This data was generated by Claude AI based on analyzing each post's content
  const seoData: Record<string, { excerpt: string; metaTitle: string; metaDescription: string }> = {
    "how-to-get-support-for-your-taylor-machine": {
      excerpt: "Learn how to reach Taylor Products support for your soft serve or frozen treat equipment. Contact our team by phone or email during extended hours for fast, reliable assistance.",
      metaTitle: "How to Get Support for Your Taylor Machine | Taylor Products",
      metaDescription: "Need help with your Taylor machine? Contact Taylor Products support by phone at 800-633-1157 or email during extended hours for fast equipment assistance.",
    },
    "who-services-my-taylor-machine": {
      excerpt: "Taylor Products provides factory-trained service technicians across the Mid-Atlantic and Southeastern US. Find out how our expert team handles maintenance, repairs, and installations.",
      metaTitle: "Who Services My Taylor Machine? | Taylor Products Service",
      metaDescription: "Taylor Products provides factory-trained service technicians for Taylor soft serve and frozen treat machines across the Mid-Atlantic and Southeastern US.",
    },
    "understanding-the-warranty-on-taylor-machines": {
      excerpt: "Understand your Taylor machine warranty coverage, including what's included, how long it lasts, and how Taylor Products supports you before and after the warranty period.",
      metaTitle: "Understanding the Warranty on Taylor Machines | Taylor Products",
      metaDescription: "Learn about Taylor machine warranty coverage, what's included, duration, and how Taylor Products supports your equipment before and after warranty.",
    },
    "how-to-order-parts-for-your-taylor-machine-and-understanding-shipping-times": {
      excerpt: "Everything you need to know about ordering genuine Taylor replacement parts and what to expect with shipping timelines. Keep your equipment running with the right parts.",
      metaTitle: "How to Order Taylor Machine Parts & Shipping Times",
      metaDescription: "Order genuine Taylor machine replacement parts through Taylor Products. Learn about ordering processes, shipping times, and keeping your equipment running.",
    },
    "essential-maintenance-tips-for-your-taylor-machine": {
      excerpt: "Keep your Taylor equipment in peak condition with these essential maintenance tips, including daily cleaning routines, seasonal care, and winterization procedures.",
      metaTitle: "Essential Taylor Machine Maintenance Tips & Winterization",
      metaDescription: "Essential maintenance and winterization tips for your Taylor soft serve machine. Daily cleaning routines, seasonal care, and winterization procedures.",
    },
    "who-to-contact-for-billing-issues-or-questions": {
      excerpt: "Need help with a Taylor Products invoice or billing question? Here's who to contact and what information to have ready for a quick resolution.",
      metaTitle: "Contact Taylor Products for Billing Issues | Taylor Products",
      metaDescription: "Have a billing question or invoice issue with Taylor Products? Learn who to contact and what information to provide for fast resolution.",
    },
    "where-is-my-closest-service-technician-located": {
      excerpt: "Taylor Products has factory-trained technicians strategically located across our service territory. Find the closest technician for your area and learn about our response times.",
      metaTitle: "Find Your Closest Taylor Service Technician | Taylor Products",
      metaDescription: "Find factory-trained Taylor machine service technicians near you. Taylor Products has strategically located technicians across the Mid-Atlantic and Southeast.",
    },
    "how-big-are-taylor-freezers-and-where-can-i-place-them": {
      excerpt: "Planning your space for a Taylor freezer? Get the dimensions, clearance requirements, and placement tips you need to properly install your soft serve equipment.",
      metaTitle: "Taylor Freezer Dimensions & Placement Guide | Taylor Products",
      metaDescription: "Get Taylor freezer dimensions, clearance requirements, and placement tips. Plan your space properly for soft serve machine installation.",
    },
    "how-much-electricity-does-a-taylor-machine-use-per-day": {
      excerpt: "Understand the energy consumption of Taylor soft serve machines and freezers. Learn about daily electricity usage, operating costs, and tips for efficiency.",
      metaTitle: "Taylor Machine Electricity Usage Per Day | Taylor Products",
      metaDescription: "How much electricity does a Taylor soft serve machine use? Learn about daily energy consumption, operating costs, and energy efficiency tips.",
    },
    "what-makes-taylor-different-from-other-equipment-companies-and-why-are-we-more-expensive": {
      excerpt: "Discover what sets Taylor apart from competitors in the frozen treat equipment industry. Learn about our build quality, service network, and the value behind the investment.",
      metaTitle: "What Makes Taylor Different & Worth the Investment",
      metaDescription: "Discover what sets Taylor machines apart from competitors. Learn about superior build quality, service network, and the long-term value of your investment.",
    },
    "create-flavors-for-the-fall-season": {
      excerpt: "Boost your fall sales with creative seasonal soft serve flavors. From pumpkin spice to apple cider, discover recipes and ideas to attract customers this autumn.",
      metaTitle: "Fall Soft Serve Flavor Ideas for Your Business | Taylor Products",
      metaDescription: "Boost fall sales with seasonal soft serve flavors like pumpkin spice and apple cider. Creative recipes and ideas to attract customers this autumn.",
    },
    "why-is-my-ice-cream-soft": {
      excerpt: "Troubleshoot common reasons your soft serve or ice cream isn't freezing properly. From mix ratios to machine settings, learn how to fix under-frozen product.",
      metaTitle: "Why Is My Ice Cream Soft? Troubleshooting Guide | Taylor Products",
      metaDescription: "Soft serve not freezing right? Troubleshoot common causes including mix ratios, machine settings, and maintenance issues. Expert tips from Taylor Products.",
    },
    "how-and-where-do-i-source-soft-serve-mixes-and-supplies": {
      excerpt: "Find the best sources for soft serve mixes, toppings, and supplies for your Taylor machine. Learn about mix types, suppliers, and how to choose the right products.",
      metaTitle: "Where to Source Soft Serve Mixes & Supplies | Taylor Products",
      metaDescription: "Find soft serve mixes, toppings, and supplies for your Taylor machine. Guide to mix types, suppliers, and choosing the right products for your business.",
    },
    "does-taylor-products-offer-a-rental-program": {
      excerpt: "Learn about Taylor Products' approach to equipment rentals and why purchasing a Taylor machine provides better long-term value for your business.",
      metaTitle: "Does Taylor Products Offer Machine Rentals? | Taylor Products",
      metaDescription: "Learn about Taylor Products' stance on equipment rentals and why purchasing a Taylor machine may offer better long-term value for your business.",
    },
    "what-kind-of-soft-serve-machine-is-right-for-me": {
      excerpt: "Not sure which Taylor soft serve machine fits your business? Compare models based on volume needs, space, features, and budget to find your perfect match.",
      metaTitle: "Which Taylor Soft Serve Machine Is Right for You?",
      metaDescription: "Compare Taylor soft serve machine models based on volume needs, space requirements, features, and budget. Find the perfect machine for your business.",
    },
    "does-taylor-products-offer-financing": {
      excerpt: "Learn about financing options available for Taylor soft serve machines and frozen treat equipment. Make your investment more manageable with flexible payment plans.",
      metaTitle: "Taylor Machine Financing Options | Taylor Products",
      metaDescription: "Explore financing options for Taylor soft serve machines and frozen treat equipment. Flexible payment plans to make your equipment investment manageable.",
    },
    "understanding-overrun-in-shakes-and-soft-serve-with-calculator": {
      excerpt: "Learn what overrun means in soft serve and shakes, why it matters for product quality and profit margins, and use our calculator to find the right overrun percentage.",
      metaTitle: "Understanding Overrun in Soft Serve [With Calculator]",
      metaDescription: "What is overrun in soft serve and shakes? Learn how overrun affects product quality and profit margins, plus use our overrun calculator.",
    },
    "how-to-test-soft-serve-mix-viscosity-homemade-plant-based": {
      excerpt: "Learn how to test the viscosity of your soft serve mix, especially important when using homemade or plant-based alternatives. Ensure your mix works with your Taylor machine.",
      metaTitle: "How to Test Soft Serve Mix Viscosity | Taylor Products",
      metaDescription: "Test soft serve mix viscosity for homemade and plant-based mixes. Ensure compatibility with your Taylor machine for the best frozen treat results.",
    },
    "the-connection-between-icetro-and-taylor-uniting-quality-and-innovation": {
      excerpt: "Discover the relationship between Icetro and Taylor, two industry leaders in frozen treat equipment. Learn how this connection brings enhanced quality and innovation.",
      metaTitle: "Icetro and Taylor: Quality & Innovation Together",
      metaDescription: "Discover the partnership between Icetro and Taylor in frozen treat equipment. How two industry leaders unite for enhanced quality and innovation.",
    },
    "spring-is-almost-here-is-your-soft-serve-equipment-ready": {
      excerpt: "Prepare your Taylor soft serve equipment for the busy spring and summer season. Essential startup procedures, cleaning tips, and preventive maintenance checklist.",
      metaTitle: "Get Your Soft Serve Equipment Ready for Spring | Taylor Products",
      metaDescription: "Prepare your Taylor soft serve machine for spring. Essential startup procedures, cleaning tips, and maintenance checklist for the busy season.",
    },
    "ordering-your-machine-is-as-easy-as-1-2-3-with-taylor-products": {
      excerpt: "Ordering a Taylor machine is simpler than you think. Follow our easy three-step process to get the right soft serve or frozen treat equipment for your business.",
      metaTitle: "Order a Taylor Machine in 3 Easy Steps | Taylor Products",
      metaDescription: "Ordering a Taylor soft serve or frozen treat machine is easy with Taylor Products. Follow our simple 3-step process to get the right equipment.",
    },
    "how-to-install-a-taylor-machine-freezer": {
      excerpt: "Step-by-step guide to installing your new Taylor machine or freezer. Learn about site preparation, utility requirements, and what to expect during installation.",
      metaTitle: "How to Install a Taylor Machine/Freezer | Taylor Products",
      metaDescription: "Step-by-step Taylor machine installation guide. Site preparation, utility requirements, and what to expect during your freezer installation.",
    },
    "what-are-the-benefits-of-taylor-28ht-heat-treatment-freezers": {
      excerpt: "Explore the benefits of Taylor 28HT Heat Treatment freezers, which automatically pasteurize and clean themselves. Save time, reduce labor, and maintain food safety.",
      metaTitle: "Taylor 28HT Heat Treatment Freezer Benefits | Taylor Products",
      metaDescription: "Taylor 28HT Heat Treatment freezers automatically pasteurize and clean. Save time, reduce labor costs, and maintain food safety standards.",
    },
    "understanding-taylor-soft-serve-machine-capacities-finding-the-perfect-fit-for-your-business": {
      excerpt: "Compare Taylor soft serve machine capacities to find the right fit for your business volume. From small operations to high-traffic locations, there's a Taylor for you.",
      metaTitle: "Taylor Soft Serve Machine Capacity Guide | Taylor Products",
      metaDescription: "Compare Taylor soft serve machine capacities for your business. From small shops to high-traffic locations, find the right machine for your volume needs.",
    },
    "air-cooled-vs-water-cooled-taylor-machines-making-the-right-choice": {
      excerpt: "Understand the differences between air-cooled and water-cooled Taylor machines. Learn which cooling method is best for your installation environment and budget.",
      metaTitle: "Air-Cooled vs Water-Cooled Taylor Machines | Taylor Products",
      metaDescription: "Compare air-cooled and water-cooled Taylor machines. Learn which cooling method is best for your installation environment, efficiency, and budget.",
    },
    "gravity-fed-vs-pump-pressurized-taylor-machines": {
      excerpt: "Compare gravity-fed and pump-pressurized Taylor machines. Understand how each system works, their pros and cons, and which is right for your frozen treat business.",
      metaTitle: "Gravity-Fed vs Pump Taylor Machines | Taylor Products",
      metaDescription: "Compare gravity-fed vs pump-pressurized Taylor machines. Learn how each system works, their advantages, and which is best for your business.",
    },
    "what-is-flavor-burst-and-how-can-it-help-my-business": {
      excerpt: "Discover how Flavor Burst systems work with your Taylor machine to offer dozens of flavor options from a single base mix. Increase menu variety and boost profits.",
      metaTitle: "What is Flavor Burst? Boost Your Menu | Taylor Products",
      metaDescription: "Learn how Flavor Burst systems add dozens of flavor options to your Taylor machine from one base mix. Increase variety and boost profits.",
    },
    "meet-the-taylor-ram-efficient-frozen-food-dispensing-for-fries-nuggets-more": {
      excerpt: "Meet the Taylor Ram, an innovative frozen food dispensing system for fries, nuggets, and more. Learn how this equipment improves speed, consistency, and efficiency.",
      metaTitle: "Taylor Ram: Frozen Food Dispensing System | Taylor Products",
      metaDescription: "Meet the Taylor Ram frozen food dispensing system for fries, nuggets, and more. Improve speed, consistency, and operational efficiency.",
    },
    "whats-new-at-taylor-products-june-2025": {
      excerpt: "June 2025 update from Taylor Products featuring Icetro self-serve machines and frozen beverages enhanced with Flavorburst technology for expanded menu possibilities.",
      metaTitle: "What's New: Icetro Self-Serve & Flavorburst | Taylor Products",
      metaDescription: "June 2025 Taylor Products update: Icetro self-serve machines and frozen beverages with Flavorburst technology for expanded menu possibilities.",
    },
    "whats-new-at-taylor-products-24-quart-emery-thompson": {
      excerpt: "Taylor Products introduces the 24 Quart Emery Thompson batch freezer, perfect for artisan ice cream shops looking for high-quality, high-capacity batch production.",
      metaTitle: "What's New: 24 Quart Emery Thompson | Taylor Products",
      metaDescription: "Taylor Products introduces the 24 Quart Emery Thompson batch freezer for artisan ice cream shops. High-quality, high-capacity batch production.",
    },
    "whats-new-at-taylor-products-the-newly-redesigned-crunchicreme": {
      excerpt: "Discover the newly redesigned CrunchiCreme from Taylor Products. An upgraded frozen treat topping system that adds crunchy mix-ins to soft serve for premium appeal.",
      metaTitle: "What's New: Redesigned CrunchiCreme | Taylor Products",
      metaDescription: "Discover the newly redesigned CrunchiCreme frozen treat topping system. Add crunchy mix-ins to soft serve for premium appeal and increased profits.",
    },
    "whats-new-at-taylor-products-wilson-pumps": {
      excerpt: "Taylor Products now offers Wilson Pumps, reliable fluid handling solutions that complement your frozen treat equipment setup with durable, efficient performance.",
      metaTitle: "What's New: Wilson Pumps | Taylor Products",
      metaDescription: "Taylor Products introduces Wilson Pumps for reliable fluid handling. Durable, efficient pump solutions to complement your frozen treat equipment.",
    },
  };

  const posts = await db.select({
    id: schema.blogPosts.id,
    slug: schema.blogPosts.slug,
    title: schema.blogPosts.title,
  }).from(schema.blogPosts);

  let updated = 0;
  for (const post of posts) {
    const data = seoData[post.slug];
    if (data) {
      await db
        .update(schema.blogPosts)
        .set({
          excerpt: data.excerpt,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          updatedAt: new Date(),
        })
        .where(eq(schema.blogPosts.id, post.id));
      console.log(`  ✓ ${post.title}`);
      updated++;
    } else {
      console.log(`  ✗ No SEO data for: ${post.title} (slug: ${post.slug})`);
    }
  }

  console.log(`\nApplied SEO data to ${updated}/${posts.length} posts`);
}

// ==========================================
// Helpers
// ==========================================
function getTagContent(node: Element, tagName: string): string {
  const elements = node.getElementsByTagName(tagName);
  if (elements.length > 0) {
    return elements[0].textContent?.trim() || "";
  }
  return "";
}

function getMetaValue(item: Element, tagName: string): string {
  const elements = item.getElementsByTagName(tagName);
  if (elements.length > 0) {
    return elements[0].textContent?.trim() || "";
  }
  return "";
}

// ==========================================
// Main
// ==========================================
async function main() {
  const args = process.argv.slice(2);
  const runAll = args.length === 0;
  const runDates = runAll || args.includes("--dates");
  const runImages = runAll || args.includes("--images");
  const runSeo = runAll || args.includes("--seo");

  console.log("Blog Data Migration Script");
  console.log("==========================");

  if (runDates) {
    await updatePublishDates();
  }

  if (runImages) {
    await migrateImages();
  }

  if (runSeo) {
    await applySeoData();
  }

  console.log("\n✅ Migration complete!");
}

main().catch(console.error).finally(() => process.exit(0));
