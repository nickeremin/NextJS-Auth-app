import { type Config } from "drizzle-kit"

// import dotenv from "dotenv"
// dotenv.config({ path: "./.env.local" })

export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config
