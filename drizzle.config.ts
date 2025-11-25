import 'dotenv/config';
import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config({
  path: ".env",
})

export default defineConfig({
  out: './db/migrations',
  dialect: 'postgresql',
  schema: './db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
})
