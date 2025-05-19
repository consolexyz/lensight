import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PredictionStatus } from "@/generated/prisma";

// GET /api/predictions/[id]
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Properly type and extract the ID parameter
        const id = params?.id;

        const prediction = await prisma.prediction.findUnique({
            where: { id },
            include: {
                bets: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        if (!prediction) {
            return NextResponse.json(
                { error: "Prediction not found" },
                { status: 404 }
            );
        }

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
    { params }: { params: { id: string } }
) {
    try {
        // Get the ID from params before using it
        const id = params?.id;

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
