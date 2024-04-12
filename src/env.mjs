import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    AUTH_SECRET: z.string(),
    DRIZZLE_DATABASE_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.AUTH_SECRET,
    DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
})
