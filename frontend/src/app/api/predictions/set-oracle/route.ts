/**
 * API Route: /api/predictions/set-oracle
 * 
 * Sets the oracle as resolver for a prediction market to enable automated resolution.
 */

import { NextRequest, NextResponse } from 'next/server';
import { setupAutomatedResolution } from '@/lib/services/oracleSetup';
import { prisma } from '@/lib/prisma';

// POST - Sets the oracle as resolver for a prediction market
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { predictionId } = body;

        // Authorization check should be implemented here in production

        // Get the prediction from the database
        const prediction = await prisma.prediction.findUnique({
            where: { id: predictionId }
        });

        if (!prediction) {
            return NextResponse.json(
                { error: 'Prediction not found' },
                { status: 404 }
            );
        }

        if (!prediction.contractAddress) {
            return NextResponse.json(
                { error: 'Prediction has no contract address' },
                { status: 400 }
            );
        }

        // Get the private key from environment
        const creatorPrivateKey = process.env.ORACLE_PRIVATE_KEY;
        if (!creatorPrivateKey) {
            return NextResponse.json(
                { error: 'Oracle private key not configured' },
                { status: 500 }
            );
        }

        // Set the oracle as resolver
        const txHash = await setupAutomatedResolution(
            prediction.contractAddress,
            creatorPrivateKey
        );

        // Update the prediction in the database to mark it for auto-resolution
        await prisma.prediction.update({
            where: { id: predictionId },
            data: {
                autoResolve: true,
                updatedAt: new Date()
            }
        });

        return NextResponse.json({
            message: 'Oracle set as resolver successfully',
            txHash: txHash || undefined
        });
    } catch (error) {
        console.error('Error setting oracle as resolver:', error);
        return NextResponse.json(
            { error: `Failed to set oracle as resolver: ${(error as Error).message}` },
            { status: 500 }
        );
    }
}
