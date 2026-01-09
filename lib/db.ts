import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Create the SQL client - handle missing DATABASE_URL for build time
const connectionString = process.env.DATABASE_URL;

// Create a mock or real connection based on environment
const sql = connectionString
  ? neon(connectionString)
  : (() => {
      // Return a mock function that throws if actually called
      const mock = () => {
        throw new Error("Database connection not available - DATABASE_URL not set");
      };
      return mock as unknown as ReturnType<typeof neon>;
    })();

// Create the Drizzle ORM instance with schema
export const db = drizzle(sql, { schema });

// Export for direct SQL queries if needed
export { sql };

// Type exports
export type Database = typeof db;

// Check if database is available
export const isDatabaseAvailable = !!connectionString;
