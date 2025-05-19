import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transformPrediction } from "@/lib/types";

export async function GET(
    request: NextRequest,
    { params }: { params: { userAddress: Promise<string> | string } }
) {
    try {
        const userAddress = typeof params.userAddress === 'string'
            ? params.userAddress
            : await params.userAddress;
        console.log('API: Fetching predictions for user:', userAddress);

        if (!userAddress) {
            console.log('API: User address is missing');
            return NextResponse.json({ error: "User address is required" }, { status: 400 });
        }

        // Check if we should normalize the address for case-insensitive matching
        const normalizedAddress = userAddress.toLowerCase();
        console.log('API: Using normalized address:', normalizedAddress);

        // Get count of predictions in the database
        const totalPredictions = await prisma.prediction.count();
        console.log('API: Total predictions in database:', totalPredictions);

        // For debugging only - helpful to see available predictions in the database
        const debugMode = request.nextUrl.searchParams.get('debug') === 'true';
        if (debugMode) {
            console.log('API: Debug mode - fetching sample predictions');
            const samplePredictions = await prisma.prediction.findMany({
                take: 5,
                include: {
                    bets: true,
                },
                orderBy: {
                    createdAt: "desc",
                }
            });

            console.log('API: Sample creator addresses in database:',
                samplePredictions.map(p => p.creatorAddress)
            );
        }

        // Special inspection mode to help with debugging
        const inspectMode = request.nextUrl.searchParams.get('inspect') === 'true';
        if (inspectMode) {
            console.log('API: Inspect mode - examining all creator addresses');
            // Get all unique creator addresses
            const allPredictions = await prisma.prediction.findMany({
                select: { id: true, creatorAddress: true, content: true },
                orderBy: { createdAt: 'desc' }
            });

            // Check for exact or case-insensitive matches
            const exactMatches = allPredictions.filter(p =>
                p.creatorAddress && p.creatorAddress === normalizedAddress
            );

            const lowercaseMatches = allPredictions.filter(p =>
                p.creatorAddress && p.creatorAddress.toLowerCase() === normalizedAddress
            );

            // Return detailed inspection results
            return NextResponse.json({
                userAddress: userAddress,
                normalizedAddress: normalizedAddress,
                exactMatches: exactMatches.length,
                lowercaseMatches: lowercaseMatches.length,
                uniqueCreatorAddresses: [...new Set(allPredictions.map(p => p.creatorAddress))],
                allPredictions: allPredictions.slice(0, 10) // First 10 predictions
            });
        }

        // Try different formats of the address for matching
        const predictions = await prisma.prediction.findMany({
            where: {
                OR: [
                    // Try both direct match with normalized address
                    { creatorAddress: normalizedAddress },
                    // Try case-insensitive matching for flexibility
                    {
                        creatorAddress: {
                            mode: 'insensitive',
                            equals: normalizedAddress
                        }
                    },
                    // Try non-normalized original address
                    { creatorAddress: userAddress }
                ]
            },
            include: {
                bets: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        console.log(`API: Found ${predictions.length} predictions with address match`);

        if (predictions.length === 0) {
            // Debug mode to help diagnose address issues
            const allCreators = await prisma.prediction.findMany({
                select: {
                    creatorAddress: true
                },
                distinct: ['creatorAddress']
            });

            console.log('API: All creator addresses in database:',
                allCreators.map(c => c.creatorAddress)
            );

            // Log the addresses to look for similarities
            console.log('API: Looking for address with similar pattern to:', normalizedAddress);
        }

        console.log(`API: Found ${predictions.length} predictions for user ${userAddress}`);

        // If no predictions found, log some debug info
        if (predictions.length === 0) {
            // Look for any predictions in the database to check schema
            const samplePredictions = await prisma.prediction.findMany({
                take: 3
            });
            console.log('API: Sample predictions from database:',
                samplePredictions.map(p => ({
                    id: p.id,
                    creatorAddress: p.creatorAddress,
                    content: p.content
                }))
            );

            // Try a broader search to see if any addresses match partially
            const fuzzyAddressSearch = await prisma.prediction.findMany({
                where: {
                    creatorAddress: {
                        contains: normalizedAddress.slice(-20) // Match last 20 chars of normalized address
                    }
                },
                take: 5
            });

            console.log('API: Potential address matches (fuzzy):',
                fuzzyAddressSearch.map(p => ({
                    id: p.id,
                    creatorAddress: p.creatorAddress,
                    similarity: `Original: ${userAddress} vs DB: ${p.creatorAddress}`
                }))
            );
        }

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
