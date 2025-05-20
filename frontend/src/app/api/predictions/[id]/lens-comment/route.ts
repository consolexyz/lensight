import { NextRequest, NextResponse } from "next/server";
import { getPublicClient } from "@/lib/lens/client";
import { createComment } from "@lens-protocol/client/actions";
import { formatErrorForLogging } from "@/lib/lens/error-handler";
import prisma from "@/lib/prisma";

/**
 * API Route to create comments on Lens Protocol publications without requiring client-side message signing.
 * This leverages server-side authentication with Lens Protocol.
 */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { address, content, publicationId } = await req.json();
        const predictionId = params.id;

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

        let commentOnId = publicationId || prediction.lensPublicationId;

        // If there's no publication ID, create one first
        if (!commentOnId) {
            console.log("No Lens publication ID found, creating one first");
            try {
                // Create a new post for the prediction
                const publicClient = getPublicClient();
                const { createPost } = await import("@lens-protocol/client/actions");

                // Create post content with prediction metadata
                const postMetadata = {
                    content: prediction.content || "Prediction",
                    attributes: [
                        {
                            key: 'predictionId',
                            value: predictionId,
                            type: 'string'
                        },
                        {
                            key: 'type',
                            value: 'prediction',
                            type: 'string'
                        },
                        {
                            key: 'category',
                            value: prediction.category || 'other',
                            type: 'string'
                        },
                        {
                            key: 'appId',
                            value: 'lensight',
                            type: 'string'
                        }
                    ],
                };

                // Create the post with server-side authentication
                const postResult = await createPost(publicClient, {
                    metadata: postMetadata,
                }, {
                    broadcaster: {
                        serverAuth: true,
                        onError: (error) => {
                            console.error("Broadcast error:", error);
                            throw error;
                        }
                    }
                });

                if (postResult.isErr()) {
                    // Save the comment to our database even if Lens fails
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
                        lensStatus: "fallback-to-database",
                        error: "Failed to create Lens publication for prediction"
                    });
                }

                commentOnId = postResult.value.postId;

                // Save the Lens publication ID to the prediction
                await prisma.prediction.update({
                    where: { id: predictionId },
                    data: { lensPublicationId: commentOnId }
                });

                console.log("Created new Lens publication:", commentOnId);
            } catch (error) {
                console.error("Error creating post for prediction:", error);

                // Save the comment to our database even if Lens fails
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
                    lensStatus: "fallback-to-database",
                    error: "Failed to create Lens publication for prediction"
                });
            }
        }

        // Get the Lens public client
        const publicClient = getPublicClient();

        // Create the comment content with attributes
        const commentMetadata = {
            content,
            attributes: [
                {
                    key: "predictionId",
                    value: predictionId,
                    type: "string",
                },
                {
                    key: "type",
                    value: "comment",
                    type: "string",
                },
                {
                    key: "appId",
                    value: "lensight",
                    type: "string",
                },
            ],
        };

        // Use server-side authentication to comment on behalf of the user
        // Note: In a production environment, you would need proper authentication
        // and user verification before posting on their behalf
        const result = await createComment(publicClient, {
            commentOn: commentOnId,
            metadata: commentMetadata,
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
            console.error("Lens comment creation error:", formatErrorForLogging(result.error, "create-comment"));
            return NextResponse.json(
                { error: "Failed to create comment on Lens Protocol" },
                { status: 500 }
            );
        }

        // Create a record of the comment in our database
        const comment = await prisma.comment.create({
            data: {
                predictionId,
                userAddress: address,
                content,
                lensPublicationId: result.value.commentId,
            },
        });

        return NextResponse.json({
            success: true,
            comment,
            lensPublicationId: result.value.commentId,
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
