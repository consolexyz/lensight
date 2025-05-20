import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const predictionId = params.id;

    try {
        const json = await request.json();
        const { userAddress, userName, userImage, content } = json;

        console.log('Creating comment with data:', {
            predictionId,
            userAddress,
            userName,
            userImage,
            content
        });

        // Validate required fields
        if (!userAddress || !content) {
            console.error('Missing required fields:', { userAddress, content });
            return NextResponse.json({ error: "User address and content are required" }, { status: 400 });
        }

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
    const predictionId = params.id;

    try {
        const comments = await prisma.comment.findMany({
            where: {
                predictionId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}
