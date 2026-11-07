import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Check if a real database connection is configured in the environment
export function getIsDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return Boolean(
    url &&
      !url.includes("unihelp_dev") &&
      (url.startsWith("postgresql://") || url.startsWith("postgres://"))
  );
}

export const isDatabaseConfigured = getIsDatabaseConfigured();

// Fallback dummy connection string so PrismaClient does not throw on startup when DATABASE_URL is not yet mapped
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/unihelp_dev?schema=public";
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
