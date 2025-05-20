import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PredictionStatus } from "@/generated/prisma";

// GET /api/predictions/[id]
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // In Next.js 15+, use destructuring to await params
        const { id } = await params;

        console.log(`Fetching prediction with ID: ${id}`);

        const prediction = await prisma.prediction.findUnique({
            where: { id },
            include: {
                bets: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                likes: true,
                comments: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        if (!prediction) {
            console.log(`Prediction with ID ${id} not found`);
            return NextResponse.json(
                { error: "Prediction not found" },
                { status: 404 }
            );
        }

        // Log prediction data to help with debugging
        console.log(`Found prediction: ${prediction.id}, creator: ${prediction.creatorAddress || 'undefined'}`);

        return NextResponse.json({ prediction });
    } catch (error) {
        console.error("Error fetching prediction:", error);
        return NextResponse.json(
            { error: "Failed to fetch prediction" },
            { status: 500 }
        );
    }
}

// PATCH /api/predictions/[id]
export async function PATCH(
    request: Request,
    { params }: { params: { id: Promise<string> | string } }
) {
    try {
        const id = typeof params.id === 'string' ? params.id : await params.id;

        const body = await request.json();
        const { status, resolvedAt } = body;

        const prediction = await prisma.prediction.update({
            where: { id },
            data: {
                status: status.toUpperCase() as PredictionStatus,
                resolvedAt: resolvedAt ? new Date(resolvedAt) : undefined,
            },
            include: {
                bets: true,
            },
        });

        return NextResponse.json(prediction);
    } catch (error) {
        console.error("Error updating prediction:", error);
        return NextResponse.json(
            { error: "Failed to update prediction" },
            { status: 500 }
        );
    }
}
