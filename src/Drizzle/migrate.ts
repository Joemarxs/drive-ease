import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db, { client } from "./db";

async function migration() {
    try {
        console.log("......Migrations Started......");
        await migrate(db, { migrationsFolder: __dirname + "/migrations" });
        console.log("......Migrations Completed......");
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    } finally {
        await client.end();
        process.exit(0);
    }
}

migration();
