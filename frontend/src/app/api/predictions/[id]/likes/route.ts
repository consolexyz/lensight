import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // In Next.js 15+, use destructuring to await params
        const { id: predictionId } = await params;
        const json = await request.json();
        const { userAddress, userName, userImage } = json;

        // Validate required fields
        if (!userAddress) {
            return NextResponse.json({ error: "User address is required" }, { status: 400 });
        }

        // Check if the user has already liked this prediction
        const existingLike = await prisma.like.findFirst({
            where: {
                predictionId,
                userAddress,
            },
        });

        if (existingLike) {
            // If the like exists, remove it (toggle functionality)
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });

            return NextResponse.json({
                success: true,
                action: "unliked",
            });
        } else {
            // Create a new like
            const like = await prisma.like.create({
                data: {
                    predictionId,
                    userAddress,
                    userName,
                    userImage,
                },
            });

            return NextResponse.json({
                success: true,
                action: "liked",
                like,
            });
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        return NextResponse.json({ error: "Failed to process like" }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // In Next.js 15+, use destructuring to await params
        const { id: predictionId } = await params;

        const likes = await prisma.like.findMany({
            where: {
                predictionId,
            },
        });

        const count = likes.length;

        return NextResponse.json({
            success: true,
            likes,
            count,
        });
    } catch (error) {
        console.error("Error fetching likes:", error);
        return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
    }
}
