import { config } from "dotenv"
import path from "path"
import { PrismaClient } from "../../prisma/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

config({ path: path.resolve(process.cwd(), "prisma/.env") })

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set")
}

declare global {
  var cachedPrisma: PrismaClient | undefined
}

const prismaClientOptions = {
  adapter: new PrismaPg(databaseUrl),
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(prismaClientOptions)
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient(prismaClientOptions)
  }
  prisma = global.cachedPrisma as PrismaClient
}

export const db = prisma
