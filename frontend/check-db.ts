// check-db.ts
import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    try {
        // Try to query a prediction
        const result = await prisma.$queryRaw`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'Prediction';
    `;
        console.log('Table columns:', result);

    } catch (error) {
        console.error('Error querying database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
