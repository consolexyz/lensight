import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transformPrediction } from "@/lib/types";

export async function GET(
    request: NextRequest,
    { params }: { params: { userAddress: string } }
) {
    try {
        // In Next.js 15+, use destructuring to await params
        const { userAddress } = await params;

        if (!userAddress) {
            return NextResponse.json({ error: "User address is required" }, { status: 400 });
        }

        console.log('API: Fetching predictions for user:', userAddress);

        // Normalize the address for case-insensitive matching
        const normalizedAddress = userAddress.toLowerCase();

        // Find predictions for this user
        const predictions = await prisma.prediction.findMany({
            where: {
                creatorAddress: {
                    equals: normalizedAddress,
                    mode: 'insensitive'
                }
            },
            include: {
                bets: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        console.log(`API: Found ${predictions.length} predictions for user`);

        const formattedPredictions = predictions.map(transformPrediction);
        return NextResponse.json({ predictions: formattedPredictions });
    } catch (error) {
        console.error("Error fetching user predictions:", error);
        return NextResponse.json(
            { error: "Failed to fetch user predictions" },
            { status: 500 }
        );
    }
}
