import { db } from "../lib/db";
import { adminUsers } from "../lib/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function createAdminUser() {
  const email = "matthew@adventii.com";
  const password = "Dunkindonuts3!@";
  const name = "Matthew";

  console.log(`Creating admin user: ${email}\n`);

  // Check if user already exists
  const existing = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (existing.length > 0) {
    console.log("User already exists. Updating password...");

    const passwordHash = await bcrypt.hash(password, 12);

    await db
      .update(adminUsers)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(adminUsers.email, email));

    console.log("Password updated successfully!");
  } else {
    console.log("Creating new user...");

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await db
      .insert(adminUsers)
      .values({
        email,
        passwordHash,
        name,
        role: "admin",
        isActive: true,
      })
      .returning();

    console.log(`User created with ID: ${result[0].id}`);
  }

  console.log("\nAdmin user ready!");
  console.log(`Email: ${email}`);
  console.log(`Login at: /admin/login`);

  process.exit(0);
}

createAdminUser().catch((error) => {
  console.error("Error creating admin user:", error);
  process.exit(1);
});
