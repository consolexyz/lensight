import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transformBet } from "@/lib/types";

export async function GET(
    request: NextRequest,
    { params }: { params: { userAddress: string } }
) {
    try {
        // In Next.js 15+, params are async and must be awaited
        const { userAddress } = await params;
        if (!userAddress) {
            return NextResponse.json({ error: "User address is required" }, { status: 400 });
        }

        // Find all bets for this user using case-insensitive matching
        const bets = await prisma.bet.findMany({
            where: {
                userAddress: {
                    equals: userAddress.toLowerCase(),
                    mode: 'insensitive'
                }
            },
            include: {
                prediction: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const formattedBets = bets.map(bet => ({
            ...transformBet(bet),
            prediction: {
                ...bet.prediction,
                content: bet.prediction.content,
                creator: {
                    address: bet.prediction.creatorAddress,
                    displayName: bet.prediction.creatorName || null,
                    profileImageUrl: bet.prediction.creatorImage || null
                }
            }
        }));

        return NextResponse.json({ bets: formattedBets });
    } catch (error) {
        console.error("Error fetching user bets:", error);
        return NextResponse.json(
            { error: "Failed to fetch user bets" },
            { status: 500 }
        );
    }
}
