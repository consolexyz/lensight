import { NextRequest, NextResponse } from "next/server";
import { getPublicClient } from "@/lib/lens/client";
import { addReaction } from "@lens-protocol/client/actions";
import { formatErrorForLogging } from "@/lib/lens/error-handler";
import prisma from "@/lib/prisma";

/**
 * API Route to add a reaction (like) to a Lens Protocol publication without requiring client-side message signing.
 * This leverages server-side authentication with Lens Protocol.
 */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { address } = await req.json();
        const predictionId = params.id;

        // Validate required fields
        if (!address) {
            return NextResponse.json(
                { error: "User address is required" },
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

        let publicationId = prediction.lensPublicationId;

        // If there's no publication ID, we need to create a post for this prediction first
        if (!publicationId) {
            // Use the API route for creating posts without signing
            const createPostResponse = await fetch('/api/lens/create-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    content: prediction.content,
                    metadata: {
                        predictionId: prediction.id,
                        type: 'prediction',
                        category: prediction.category,
                        appId: 'lensight'
                    }
                }),
            });

            // Read response body only once and store it
            const postData = await createPostResponse.json();

            if (!createPostResponse.ok) {
                return NextResponse.json(
                    { error: postData.error || "Failed to create post for prediction" },
                    { status: 500 }
                );
            }

            publicationId = postData.publicationId;

            // Save the new publication ID to the prediction
            await prisma.prediction.update({
                where: { id: predictionId },
                data: { lensPublicationId: publicationId }
            });
        }

        // Get the Lens public client
        const publicClient = getPublicClient();

        // Add the reaction using server-side authentication
        const result = await addReaction(publicClient, {
            publicationId,
            reaction: 'UPVOTE',
        }, {
            broadcaster: {
                // Use your configuration for server-side authentication
                serverAuth: true,
                onError: (error) => {
                    console.error("Broadcast error:", error);
                    throw error;
                }
            }
        });

        if (result.isErr()) {
            console.error("Lens reaction error:", formatErrorForLogging(result.error, "add-reaction"));
            return NextResponse.json(
                { error: "Failed to add reaction on Lens Protocol" },
                { status: 500 }
            );
        }

        // Create a record of the like in our database
        const existingLike = await prisma.like.findFirst({
            where: {
                predictionId,
                userAddress: address
            }
        });

        let action = 'liked';

        if (!existingLike) {
            // Create a new like
            await prisma.like.create({
                data: {
                    predictionId,
                    userAddress: address,
                    // Include user name and image if available from request
                    userName: req.body?.userName,
                    userImage: req.body?.userImage
                }
            });
        } else {
            // Delete the like if it already exists (toggle behavior)
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            });
            action = 'unliked';
        }

        // Get the updated like count
        const likesCount = await prisma.like.count({
            where: { predictionId }
        });

        return NextResponse.json({
            success: true,
            action,
            likesCount,
            lensPublicationId: publicationId
        });
    } catch (error) {
        console.error("Error adding reaction:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
