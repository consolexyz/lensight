// add-column.ts
import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    try {
        // Execute raw SQL to add the column
        const result = await prisma.$executeRawUnsafe(`
      ALTER TABLE "Prediction" ADD COLUMN IF NOT EXISTS "tokenSymbol" TEXT;
    `);

        console.log('Column added. Affected rows:', result);

        // Verify the column was added
        const columns = await prisma.$queryRaw`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'Prediction' AND column_name = 'tokenSymbol';
    `;

        console.log('Column verification:', columns);

    } catch (error) {
        console.error('Error adding column:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
