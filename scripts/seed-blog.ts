import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import * as path from "path";
import { blogPosts } from "../lib/schema";

// Load .env.local
config({ path: path.resolve(process.cwd(), ".env.local") });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const samplePosts = [
  // What's New posts
  {
    title: "New Taylor C707 Now Available",
    slug: "new-taylor-c707-now-available",
    excerpt:
      "The latest single-flavor soft serve machine from Taylor is here. Faster recovery, easier cleaning, and built for high-volume operations.",
    content: `
<p>We're excited to announce the arrival of the new Taylor C707 soft serve machine at our showrooms. This latest model brings several improvements that operators have been asking for.</p>

<h2>What's New</h2>
<ul>
  <li><strong>Faster recovery time</strong> - Get back to serving faster during rush periods</li>
  <li><strong>Simplified cleaning</strong> - Redesigned components make daily maintenance quicker</li>
  <li><strong>Energy efficiency</strong> - Lower operating costs without sacrificing performance</li>
</ul>

<h2>Perfect For</h2>
<p>The C707 is ideal for ice cream shops, restaurants, and convenience stores with moderate to high volume. If you're serving 200+ portions per day from a single flavor, this machine is built for you.</p>

<h2>See It In Action</h2>
<p>Stop by either of our showrooms to see the C707 running. Our team can walk you through the features and help you decide if it's the right fit for your operation.</p>

<p>Questions? Give us a call at 610-268-0500 or reach out to your salesperson directly.</p>
    `,
    author: "Taylor Products Team",
    isPublished: true,
    isWhatsNew: true,
    publishedAt: new Date("2025-01-06"),
  },
  {
    title: "Winter Service Special: Free Preventive Maintenance Check",
    slug: "winter-service-special-2025",
    excerpt:
      "Book a service call this month and get a complimentary preventive maintenance inspection on any Taylor equipment.",
    content: `
<p>Winter is here, and it's the perfect time to make sure your equipment is running at peak performance. This month, we're offering a complimentary preventive maintenance inspection with any scheduled service call.</p>

<h2>What's Included</h2>
<ul>
  <li>Full inspection of all mechanical components</li>
  <li>Refrigeration system check</li>
  <li>Calibration verification</li>
  <li>Written report with recommendations</li>
</ul>

<h2>Why It Matters</h2>
<p>Catching small issues before they become big problems saves you money and downtime. Our techs see the warning signs others miss—that's what 40 years of experience gets you.</p>

<h2>How to Book</h2>
<p>Just call our service department at 610-268-0500 and mention the winter special. We'll get you on the schedule at a time that works for you.</p>

<p>Offer valid through February 28, 2025. Available for customers in our service territory (NJ, PA, NYC, Long Island, DE).</p>
    `,
    author: "Taylor Products Team",
    isPublished: true,
    isWhatsNew: true,
    publishedAt: new Date("2025-01-02"),
  },
  // Regular blog posts
  {
    title: "5 Signs Your Soft Serve Machine Needs Service",
    slug: "5-signs-soft-serve-machine-needs-service",
    excerpt:
      "Don't wait for a breakdown. Here are the warning signs that your machine is trying to tell you something.",
    content: `
<p>Your soft serve machine is the heart of your frozen dessert program. When it's running well, everything is smooth. When it's not... well, you know how that goes. Here are five warning signs that your machine needs attention before it becomes an emergency.</p>

<h2>1. The Product Is Too Soft (or Too Hard)</h2>
<p>Consistency matters. If your soft serve isn't coming out at the right texture—even after adjusting settings—something's off with the refrigeration or mix feed system. Don't ignore it.</p>

<h2>2. Strange Noises</h2>
<p>You know what your machine sounds like when it's happy. Grinding, squealing, or unusual humming? That's your machine asking for help. These sounds often indicate worn bearings or beater blade issues.</p>

<h2>3. Longer Recovery Times</h2>
<p>If your machine is taking longer to recover between servings than it used to, the refrigeration system may be struggling. This could be a simple fix like a dirty condenser, or it could indicate a bigger issue.</p>

<h2>4. Visible Leaks</h2>
<p>Any liquid where it shouldn't be is a problem. Mix leaks can indicate worn seals or gaskets. Refrigerant leaks are more serious and need immediate attention.</p>

<h2>5. Error Codes Keep Appearing</h2>
<p>Modern Taylor machines are smart. They'll tell you when something's wrong. If you're seeing the same error codes repeatedly, don't just reset and forget. That code is telling you something needs to be fixed.</p>

<h2>The Bottom Line</h2>
<p>A small issue caught early is a quick, affordable fix. The same issue ignored for weeks can mean a major repair or even a ruined rush. When in doubt, give us a call. That's what we're here for.</p>
    `,
    author: "Taylor Products Service Team",
    isPublished: true,
    isWhatsNew: false,
    publishedAt: new Date("2024-12-15"),
  },
  {
    title: "Choosing the Right Soft Serve Machine for Your Business",
    slug: "choosing-right-soft-serve-machine",
    excerpt:
      "Floor model or countertop? Single flavor or twist? Here's how to pick the machine that fits your operation.",
    content: `
<p>Buying a soft serve machine is a big decision. Get it right, and you've got a profit center that runs for years. Get it wrong, and you're either leaving money on the table or struggling to keep up with demand. Here's how to think through the choice.</p>

<h2>Start With Volume</h2>
<p>Be honest about how much product you'll actually sell. It's tempting to buy the biggest machine "just in case," but oversized equipment costs more to buy, more to run, and more to maintain.</p>

<ul>
  <li><strong>Under 100 servings/day:</strong> Countertop models work great</li>
  <li><strong>100-300 servings/day:</strong> Single-phase floor models</li>
  <li><strong>300+ servings/day:</strong> Three-phase, high-capacity machines</li>
</ul>

<h2>Flavors and Configurations</h2>
<p>Think about your menu. Single flavor machines are simpler and more reliable. Twist machines give you variety. Some operations run two single-flavor machines for flexibility. There's no wrong answer—just what fits your business.</p>

<h2>Consider Your Space</h2>
<p>Measure twice. Floor models need adequate ventilation and clearance for service access. Countertop models need a sturdy surface and electrical requirements may vary.</p>

<h2>Heat Treatment vs. Traditional</h2>
<p>Taylor's heat treatment (HT) machines eliminate nightly breakdown cleaning. They cost more upfront but save significant labor hours. If you're paying someone to break down and sanitize the machine every night, do the math—HT often pays for itself.</p>

<h2>Let Us Help</h2>
<p>This is what we do. We've helped hundreds of businesses find the right machine. Tell us about your operation, and we'll give you honest advice—even if that means recommending something smaller than you expected.</p>
    `,
    author: "Taylor Products Sales Team",
    isPublished: true,
    isWhatsNew: false,
    publishedAt: new Date("2024-11-20"),
  },
];

async function seedBlogPosts() {
  console.log("Seeding blog posts...\n");

  for (const post of samplePosts) {
    await db.insert(blogPosts).values(post).onConflictDoNothing();
    console.log(`  Added: ${post.title}`);
  }

  console.log("\nBlog posts seeded successfully!");
}

seedBlogPosts().catch(console.error);
