import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // In Next.js 15+, use destructuring to await params
        const { id: predictionId } = await params;

        const json = await request.json();
        const { userAddress, userName, userImage, content } = json;

        // Validate required fields
        if (!userAddress) {
            return NextResponse.json({ error: "User address is required" }, { status: 400 });
        }

        console.log('Creating comment with data:', {
            predictionId,
            userAddress,
            userName,
            userImage,
            content
        });

        // First verify that the prediction exists
        const prediction = await prisma.prediction.findUnique({
            where: { id: predictionId }
        });

        if (!prediction) {
            console.error(`Prediction with ID ${predictionId} not found`);
            return NextResponse.json({
                error: `Prediction with ID ${predictionId} not found`
            }, { status: 404 });
        }

        // Create a new comment with proper error handling
        try {
            const comment = await prisma.comment.create({
                data: {
                    predictionId,
                    userAddress,
                    userName: userName || null,
                    userImage: userImage || null,
                    content,
                },
            });

            console.log('Comment created successfully:', comment);

            return NextResponse.json({
                success: true,
                comment,
            });
        } catch (commentError) {
            console.error("Error creating comment in database:", commentError);
            return NextResponse.json({
                error: "Failed to create comment in database",
                details: commentError instanceof Error ? commentError.message : "Unknown error"
            }, { status: 500 });
        }
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // In Next.js 15+, use destructuring to await params
        const { id: predictionId } = await params;

        const comments = await prisma.comment.findMany({
            where: { predictionId },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json({
            error: "Failed to fetch comments",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
