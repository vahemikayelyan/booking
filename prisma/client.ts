import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// Function to initialize or get the existing Prisma Client
function initializePrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient({ log: ["query"] });
  }

  return prisma;
}

// Initialize Prisma Client based on the environment
prisma = initializePrismaClient();

export default prisma;
