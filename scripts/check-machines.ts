import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL || "");

async function check() {
  // Get all categories with their subcategory counts
  const categories = await sql`
    SELECT c.id, c.name, c.slug,
           (SELECT COUNT(*) FROM subcategories s WHERE s.category_id = c.id) as subcat_count,
           (SELECT COUNT(*) FROM machines m WHERE m.category_id = c.id) as total_machines,
           (SELECT COUNT(*) FROM machines m WHERE m.category_id = c.id AND m.subcategory_id IS NOT NULL) as assigned_machines,
           (SELECT COUNT(*) FROM machines m WHERE m.category_id = c.id AND m.subcategory_id IS NULL) as unassigned_machines
    FROM categories c
    ORDER BY c.name
  `;

  console.log("=== CATEGORY SUMMARY ===\n");

  for (const cat of categories) {
    const hasSubcats = Number(cat.subcat_count) > 0;
    const unassignedCount = Number(cat.unassigned_machines);
    const warning = hasSubcats && unassignedCount > 0 ? " ⚠️  MACHINES HIDDEN" : "";

    console.log(`📁 ${cat.name} (/${cat.slug})${warning}`);
    console.log(`   Subcategories: ${cat.subcat_count}`);
    console.log(`   Total machines: ${cat.total_machines}`);
    if (hasSubcats) {
      console.log(`   ✓ Assigned to subcategory: ${cat.assigned_machines}`);
      if (unassignedCount > 0) {
        console.log(`   ✗ Unassigned (NOT SHOWING): ${cat.unassigned_machines}`);
      }
    }
    console.log("");
  }

  // Get unassigned machines where category has subcategories
  const unassigned = await sql`
    SELECT m.id, m.model_number, m.name, c.name as category_name, c.id as cat_id
    FROM machines m
    JOIN categories c ON m.category_id = c.id
    WHERE m.subcategory_id IS NULL
      AND (SELECT COUNT(*) FROM subcategories s WHERE s.category_id = c.id) > 0
    ORDER BY c.name, m.model_number
  `;

  if (unassigned.length > 0) {
    console.log("\n=== MACHINES NOT SHOWING (need subcategory assignment) ===\n");
    let currentCat = "";
    for (const m of unassigned) {
      if (m.category_name !== currentCat) {
        currentCat = m.category_name as string;
        console.log(`\n📁 ${currentCat}:`);
      }
      console.log(`   - ${m.model_number}: ${m.name} (ID: ${m.id})`);
    }
    console.log("\n\nTo fix: Either assign these machines to subcategories in /admin/machines");
    console.log("OR remove subcategories from these categories in /admin/categories");
  } else {
    console.log("✅ All machines are properly assigned!");
  }
}

check().catch(console.error);
