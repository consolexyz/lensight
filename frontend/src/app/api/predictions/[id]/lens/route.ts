import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const predictionId = params.id;

    try {
        const json = await request.json();
        const { lensPublicationId } = json;

        if (!lensPublicationId) {
            return NextResponse.json({ error: "Lens publication ID is required" }, { status: 400 });
        }

        // Update the prediction with the Lens publication ID
        const prediction = await prisma.prediction.update({
            where: {
                id: predictionId
            },
            data: {
                lensPublicationId
            }
        });

        return NextResponse.json({
            success: true,
            prediction
        });
    } catch (error) {
        console.error("Error updating prediction with Lens publication ID:", error);
        return NextResponse.json({ error: "Failed to update prediction" }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const predictionId = params.id;

    try {
        // Get the prediction with its Lens publication ID
        const prediction = await prisma.prediction.findUnique({
            where: {
                id: predictionId
            },
            select: {
                id: true,
                lensPublicationId: true
            }
        });

        if (!prediction) {
            return NextResponse.json({ error: "Prediction not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            lensPublicationId: prediction.lensPublicationId
        });
    } catch (error) {
        console.error("Error fetching prediction Lens publication ID:", error);
        return NextResponse.json({ error: "Failed to fetch Lens publication ID" }, { status: 500 });
    }
}
