import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { PredictionCategory, PredictionStatus } from '@/generated/prisma';

const createPredictionSchema = z.object({
    content: z.string(),
    category: z.string(), // Will convert to PredictionCategory enum
    creatorAddress: z.string(),
    creatorName: z.string().optional(),
    creatorImage: z.string().optional(),
    expiresAt: z.string(),
    contractAddress: z.string().optional(),
    targetPrice: z.string().optional(),
    comparisonOperator: z.string().optional(),
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const userAddress = searchParams.get('userAddress');

    try {
        const predictions = await prisma.prediction.findMany({
            where: {
                ...(category && category !== 'all' ? { category: category.toUpperCase() as PredictionCategory } : {}),
                ...(userAddress ? { creatorAddress: userAddress } : {}),
            },
            include: {
                bets: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({ predictions });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = createPredictionSchema.parse(body);

        // Normalize the creator address to lowercase for consistent comparisons
        const normalizedCreatorAddress = validatedData.creatorAddress.toLowerCase();

        const prediction = await prisma.prediction.create({
            data: {
                content: validatedData.content,
                category: validatedData.category.toUpperCase() as PredictionCategory,
                creatorAddress: normalizedCreatorAddress, // Store normalized address
                creatorName: validatedData.creatorName,
                creatorImage: validatedData.creatorImage,
                expiresAt: new Date(validatedData.expiresAt),
                contractAddress: validatedData.contractAddress,
                targetPrice: validatedData.targetPrice,
                comparisonOperator: validatedData.comparisonOperator,
                status: "OPEN" as const,
            },
            include: {
                bets: true,
            },
        });

        return NextResponse.json({ prediction });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to create prediction' }, { status: 500 });
    }
}
