import { PrismaClient } from '@/generated/prisma';

declare global {
    var prisma: PrismaClient | undefined;
}

const prismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prismaClient;

// Export both default and named export
export default prismaClient;
export { prismaClient as prisma };
