import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL) {
  await import("../db/startAndSeedMemoryDB");
}

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");