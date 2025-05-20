import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * API Route to create comments on predictions
 */
export async function POST(req: NextRequest, { params }: { params: { id: Promise<string> | string } }) {
    const predictionId = typeof params.id === 'string' ? params.id : await params.id;

    try {
        const { address, content } = await req.json();

        // Validate required fields
        if (!address) {
            return NextResponse.json(
                { error: "User address is required" },
                { status: 400 }
            );
        }

        if (!content) {
            return NextResponse.json(
                { error: "Content is required" },
                { status: 400 }
            );
        }

        if (!predictionId) {
            return NextResponse.json(
                { error: "Prediction ID is required" },
                { status: 400 }
            );
        }

        // Get the prediction from the database
        const prediction = await prisma.prediction.findUnique({
            where: { id: predictionId },
        });

        if (!prediction) {
            return NextResponse.json(
                { error: "Prediction not found" },
                { status: 404 }
            );
        }

        // Create a record of the comment in our database
        const comment = await prisma.comment.create({
            data: {
                predictionId,
                userAddress: address,
                content,
            },
        });

        return NextResponse.json({
            success: true,
            comment,
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
