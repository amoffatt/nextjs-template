import { PrismaClient } from '@prisma/client'

// If getting errors like:
// PostgresError { code: "42P05", message: "prepared statement \"s3\" already exists", severity: "ERROR", detail: None, column: None, hint: None }
// then ensure ?pgbouncer=true is appended to the URL
// Source:
// https://github.com/prisma/prisma/issues/11643


const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

// export const prisma = new PrismaClient()

