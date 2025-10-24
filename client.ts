import { PrismaClient } from "./generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Instantiate the extended Prisma client to infer its type
const extendedPrisma = new PrismaClient().$extends(withAccelerate());
type ExtendedPrismaClient = typeof extendedPrisma;

// Use globalThis for broader environment compatibility
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: ExtendedPrismaClient;
};

// Named export with global memoization
export const prisma: ExtendedPrismaClient =
  globalForPrisma.prisma ?? extendedPrisma;
export type { PrismaClient };

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
