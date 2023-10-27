import { PrismaClient } from "@prisma/client";

let prisma: any;

// check if the code is running in production
if (process.env.NODE_ENV === "production") {
  // in production (like Vercel), always create a new client
  prisma = new PrismaClient();
} else if (!prisma) {
  // in development, prevent multiple instances of Prisma Client
  prisma = new PrismaClient();
}

export default prisma;
