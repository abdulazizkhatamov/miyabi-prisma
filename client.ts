// client.ts
import { PrismaClient as OriginalPrismaClient } from "./generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Instantiate extended Prisma client
const extendedPrisma = new OriginalPrismaClient().$extends(withAccelerate());
type ExtendedPrismaClient = typeof extendedPrisma;

// globalThis memoization
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: ExtendedPrismaClient;
};

// Singleton export
export const prisma: ExtendedPrismaClient =
  globalForPrisma.prisma ?? extendedPrisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Export the **type** of the singleton instance
export type PrismaClient = ExtendedPrismaClient;
