/**
 * API Route: /api/predictions/resolve
 * 
 * Handles prediction resolution requests and returns the results.
 * This endpoint can be called manually or by a scheduled job.
 */

import { NextRequest, NextResponse } from 'next/server';
import predictionResolver from '@/lib/services/predictionResolver';
import { prisma } from '@/lib/prisma';

// GET - Returns predictions that are pending resolution
export async function GET(request: NextRequest) {
    try {
        // Get query params
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const status = searchParams.get('status');

        // Build query filters
        const filters: any = {
            expiresAt: { lt: new Date() },
            status: { in: ['OPEN', 'CLOSED'] }
        };

        if (category) {
            filters.category = category.toUpperCase();
        }

        // Find pending predictions
        const pendingPredictions = await prisma.prediction.findMany({
            where: filters,
            orderBy: { expiresAt: 'asc' },
        });

        return NextResponse.json({
            pendingCount: pendingPredictions.length,
            predictions: pendingPredictions
        });
    } catch (error) {
        console.error('Error fetching pending predictions:', error);
        return NextResponse.json(
            { error: `Failed to fetch pending predictions: ${(error as Error).message}` },
            { status: 500 }
        );
    }
}

// POST - Resolves predictions that are ready to be resolved
export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();
        const {
            predictionId,
            updateDatabase = true,
            updateBlockchain = true,
            dryRun = false,
        } = body;

        // Get resolver private key from environment
        const resolverPrivateKey = process.env.ORACLE_PRIVATE_KEY;
        if (updateBlockchain && !resolverPrivateKey) {
            return NextResponse.json(
                { error: 'Resolver private key not configured' },
                { status: 500 }
            );
        }

        // Resolution options
        const options = {
            updateDatabase,
            updateBlockchain,
            resolverPrivateKey,
            dryRun
        };

        // Resolve specific prediction or all pending predictions
        if (predictionId) {
            // Fetch the specific prediction
            const prediction = await prisma.prediction.findUnique({
                where: { id: predictionId }
            });

            if (!prediction) {
                return NextResponse.json(
                    { error: `Prediction not found: ${predictionId}` },
                    { status: 404 }
                );
            }

            // Resolve the specific prediction
            const result = await predictionResolver.resolvePrediction(prediction, options);
            return NextResponse.json({ result });
        } else {
            // Resolve all pending predictions
            const results = await predictionResolver.resolveAllPendingPredictions(options);
            return NextResponse.json({
                message: `Processed ${results.length} predictions`,
                results
            });
        }
    } catch (error) {
        console.error('Error resolving predictions:', error);
        return NextResponse.json(
            { error: `Failed to resolve predictions: ${(error as Error).message}` },
            { status: 500 }
        );
    }
}