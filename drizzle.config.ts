import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env.development.local",
});
export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: "./src/**/*.schema.ts",
  migrations: {
    prefix: "timestamp",
    table: "__migrations__",
    schema: "public",
  },
  breakpoints: true,
  strict: true,
  verbose: true,
});
