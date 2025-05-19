import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const betSchema = z.object({
    predictionId: z.string(),
    userAddress: z.string(),
    userName: z.string().optional(),
    userImage: z.string().optional(),
    amount: z.number(),
    position: z.boolean(),
    transactionHash: z.string().optional(),
});

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Get the ID from params before using it
        const predictionId = params?.id;
        console.log(`Processing bet for prediction ID: ${predictionId}`);

        // Validate prediction ID format
        if (!predictionId || typeof predictionId !== 'string') {
            console.error('Invalid prediction ID format:', predictionId);
            return NextResponse.json(
                { error: 'Invalid prediction ID format' },
                { status: 400 }
            );
        }

        let body;
        try {
            body = await request.json();
            console.log('Request body received:', JSON.stringify(body));
        } catch (parseError) {
            console.error('Error parsing request body:', parseError);
            return NextResponse.json(
                { error: 'Invalid JSON in request body' },
                { status: 400 }
            );
        }

        // Validate input data outside transaction
        let validatedData;
        try {
            // Add predictionId from the URL params to the body before validation
            const bodyWithId = {
                ...body,
                predictionId
            };
            validatedData = betSchema.parse(bodyWithId);
            console.log('Data validation successful:', JSON.stringify(validatedData));
        } catch (validationError) {
            console.error('Validation error:', validationError);
            return NextResponse.json(
                {
                    error: 'Invalid data provided for bet',
                    details: validationError instanceof Error ? validationError.message : 'Unknown validation error'
                },
                { status: 400 }
            );
        }

        // Verify the prediction exists before transaction
        let predictionExists;
        try {
            predictionExists = await prisma.prediction.findUnique({
                where: { id: predictionId },
            });

            if (!predictionExists) {
                console.error(`Prediction with ID ${predictionId} not found`);
                return NextResponse.json(
                    { error: `Prediction with ID ${predictionId} not found` },
                    { status: 404 }
                );
            }

            console.log('Found prediction:', predictionExists.id);
        } catch (findError) {
            console.error('Error finding prediction:', findError);
            return NextResponse.json(
                {
                    error: 'Database error when checking prediction',
                    details: findError instanceof Error ? findError.message : 'Unknown database error'
                },
                { status: 500 }
            );
        }

        // Check for existing bet with the same transaction hash to prevent duplicates
        if (validatedData.transactionHash) {
            try {
                const existingBet = await prisma.bet.findFirst({
                    where: {
                        transactionHash: validatedData.transactionHash,
                        predictionId
                    }
                });

                if (existingBet) {
                    console.log('Found existing bet with the same transaction hash:', existingBet.id);
                    // Return success with the existing prediction data
                    const prediction = await prisma.prediction.findUnique({
                        where: { id: predictionId },
                        include: {
                            bets: {
                                orderBy: { createdAt: 'desc' },
                                take: 10
                            },
                        },
                    });

                    if (prediction) {
                        return NextResponse.json({
                            prediction,
                            warning: 'This bet has already been recorded'
                        });
                    }
                }
            } catch (dupCheckError) {
                console.error('Error checking for duplicate bet:', dupCheckError);
                // Continue anyway - we'll handle potential constraint errors later
            }
        }

        // Start a transaction to update both bet and prediction totals
        let maxRetries = 3;
        let retryCount = 0;
        let result;

        while (retryCount < maxRetries) {
            try {
                result = await prisma.$transaction(async (tx) => {
                    // Create the bet with the transaction hash (if available)
                    console.log('Creating bet record, attempt:', retryCount + 1);
                    const bet = await tx.bet.create({
                        data: {
                            predictionId,
                            userAddress: validatedData.userAddress,
                            userName: validatedData.userName,
                            userImage: validatedData.userImage,
                            amount: validatedData.amount,
                            position: validatedData.position,
                            transactionHash: validatedData.transactionHash,
                        },
                    });
                    console.log('Created bet:', bet.id);

                    // Update prediction totals
                    console.log('Updating prediction totals');
                    const prediction = await tx.prediction.update({
                        where: { id: predictionId },
                        data: {
                            totalBetsTrue: validatedData.position
                                ? { increment: validatedData.amount }
                                : undefined,
                            totalBetsFalse: !validatedData.position
                                ? { increment: validatedData.amount }
                                : undefined,
                        },
                        include: {
                            bets: {
                                orderBy: { createdAt: 'desc' },
                                take: 10 // Limit to last 10 bets for performance
                            },
                        },
                    });
                    console.log('Updated prediction totals successfully');

                    return { bet, prediction };
                }, {
                    // Set longer timeout for the transaction
                    timeout: 10000 // 10 seconds
                });

                console.log('Transaction completed successfully');
                break; // Exit retry loop on success
            } catch (txError) {
                retryCount++;
                console.error(`Transaction error (attempt ${retryCount}/${maxRetries}):`, txError);

                // Handle specific database errors
                const errorMessage = txError instanceof Error ? txError.message : 'Unknown error';

                // Check for duplicate constraint errors
                if (errorMessage.includes('duplicate') || errorMessage.includes('unique constraint')) {
                    console.log('Handling duplicate entry error');
                    // This is likely a duplicate bet - try to get the prediction data
                    try {
                        const prediction = await prisma.prediction.findUnique({
                            where: { id: predictionId },
                            include: {
                                bets: {
                                    orderBy: { createdAt: 'desc' },
                                    take: 10
                                },
                            },
                        });

                        if (prediction) {
                            return NextResponse.json({
                                prediction,
                                warning: 'This bet may have been recorded already'
                            });
                        }
                    } catch (findError) {
                        console.error('Error finding prediction after duplicate error:', findError);
                    }

                    // Break the retry loop on duplicate errors
                    break;
                }

                // If we've hit max retries, give up
                if (retryCount >= maxRetries) {
                    console.error('Max transaction retries reached');
                    // Fall through to error handling below
                } else {
                    // Wait a bit before retrying (exponential backoff)
                    const delay = retryCount * 500; // 500ms, 1000ms, 1500ms
                    await new Promise(resolve => setTimeout(resolve, delay));
                    console.log(`Retrying transaction after ${delay}ms delay`);
                    continue; // Try again
                }
            }
        }

        if (result) {
            return NextResponse.json(result);
        } else {
            // If we got here without a result, we failed all retries
            // Try to return at least the prediction data to keep the UI updated
            try {
                const prediction = await prisma.prediction.findUnique({
                    where: { id: predictionId },
                    include: {
                        bets: {
                            orderBy: { createdAt: 'desc' },
                            take: 10
                        },
                    },
                });

                if (prediction) {
                    return NextResponse.json({
                        prediction,
                        warning: 'Your bet was placed on the blockchain but we had trouble updating our database. The data will sync shortly.'
                    });
                }
            } catch (findError) {
                console.error('Final fallback error finding prediction:', findError);
            }

            throw new Error('Failed to record bet after multiple attempts');
        }
    } catch (error) {
        console.error('Error placing bet:', error);
        let errorMessage = 'Failed to place bet';

        if (error instanceof Error) {
            errorMessage = error.message;
            console.error('Error details:', error.stack);
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}

// GET /api/predictions/[id]/bets
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const predictionId = params?.id;
        const bets = await prisma.bet.findMany({
            where: { predictionId },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(bets);
    } catch (error) {
        console.error('Error fetching bets:', error);
        return NextResponse.json(
            { error: 'Failed to fetch bets' },
            { status: 500 }
        );
    }
}
