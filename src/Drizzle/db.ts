import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// ✅ use the correct env var casing
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

const db = drizzle(pool, { schema, logger: true });

export default db;
export { pool as client };
