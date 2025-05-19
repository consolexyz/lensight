import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transformBet } from "@/lib/types";

export async function GET(
    request: NextRequest,
    { params }: { params: { userAddress: Promise<string> | string } }
) {
    try {
        // Handle both Promise and direct string cases for userAddress
        const userAddress = typeof params.userAddress === 'string'
            ? params.userAddress
            : await params.userAddress;
        console.log('API: Fetching bets for user:', userAddress);

        if (!userAddress) {
            console.log('API: User address is missing');
            return NextResponse.json({ error: "User address is required" }, { status: 400 });
        }

        // Normalize the address for case-insensitive matching
        const normalizedAddress = userAddress.toLowerCase();
        console.log('API: Using normalized address for bets:', normalizedAddress);

        // Get count of bets in the database
        const totalBets = await prisma.bet.count();
        console.log('API: Total bets in database:', totalBets);

        // For debugging only - helpful to see available bets in the database
        const debugMode = request.nextUrl.searchParams.get('debug') === 'true';
        if (debugMode) {
            console.log('API: Debug mode - fetching sample bets');
            const sampleBets = await prisma.bet.findMany({
                take: 5,
                include: {
                    prediction: true,
                },
                orderBy: {
                    createdAt: "desc",
                }
            });

            console.log('API: Sample user addresses in database:',
                sampleBets.map(b => b.userAddress)
            );
        }

        // Special inspection mode to help with debugging
        const inspectMode = request.nextUrl.searchParams.get('inspect') === 'true';
        if (inspectMode) {
            console.log('API: Inspect mode - examining all user addresses in bets');
            // Get all unique user addresses from bets
            const allBets = await prisma.bet.findMany({
                select: { id: true, userAddress: true, amount: true },
                orderBy: { createdAt: 'desc' }
            });

            // Check for exact or case-insensitive matches
            const exactMatches = allBets.filter(b =>
                b.userAddress && b.userAddress === normalizedAddress
            );

            const lowercaseMatches = allBets.filter(b =>
                b.userAddress && b.userAddress.toLowerCase() === normalizedAddress
            );

            // Return detailed inspection results
            return NextResponse.json({
                userAddress: userAddress,
                normalizedAddress: normalizedAddress,
                exactMatches: exactMatches.length,
                lowercaseMatches: lowercaseMatches.length,
                uniqueUserAddresses: [...new Set(allBets.map(b => b.userAddress))],
                allBets: allBets.slice(0, 10) // First 10 bets
            });
        }

        // Try different formats of the address for matching
        const bets = await prisma.bet.findMany({
            where: {
                OR: [
                    // Try direct match with normalized address
                    { userAddress: normalizedAddress },
                    // Try case-insensitive matching for flexibility
                    {
                        userAddress: {
                            mode: 'insensitive',
                            equals: normalizedAddress
                        }
                    },
                    // Try non-normalized original address
                    { userAddress: userAddress }
                ]
            },
            include: {
                prediction: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        console.log(`API: Found ${bets.length} bets with address match`);

        if (bets.length === 0) {
            // Debug mode to help diagnose address issues
            const allUsers = await prisma.bet.findMany({
                select: {
                    userAddress: true
                },
                distinct: ['userAddress']
            });

            console.log('API: All user addresses in bets database:',
                allUsers.map(u => u.userAddress)
            );

            // Log the addresses to look for similarities
            console.log('API: Looking for address with similar pattern to:', normalizedAddress);

            // Try a broader search to see if any addresses match partially
            const fuzzyAddressSearch = await prisma.bet.findMany({
                where: {
                    userAddress: {
                        contains: normalizedAddress.slice(-20) // Match last 20 chars of normalized address
                    }
                },
                take: 5
            });

            console.log('API: Potential address matches (fuzzy):',
                fuzzyAddressSearch.map(b => ({
                    id: b.id,
                    userAddress: b.userAddress,
                    similarity: `Original: ${userAddress} vs DB: ${b.userAddress}`
                }))
            );
        }

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
