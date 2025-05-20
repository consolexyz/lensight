import { NextRequest, NextResponse } from "next/server";
import { getPublicClient } from "@/lib/lens/client";
import { createPost } from "@lens-protocol/client/actions";
import { formatErrorForLogging } from "@/lib/lens/error-handler";
import prisma from "@/lib/prisma";

/**
 * API Route to create posts on Lens Protocol without requiring client-side message signing.
 * This leverages server-side authentication with Lens Protocol.
 */
export async function POST(req: NextRequest) {
    try {
        const { address, content, metadata } = await req.json();

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

        // Get the Lens public client
        const publicClient = getPublicClient();

        // Create the post content with attributes
        const postMetadata = {
            content,
            attributes: [
                {
                    key: "appId",
                    value: "lensight",
                    type: "string",
                },
                ...Object.entries(metadata || {}).map(([key, value]) => ({
                    key,
                    value: String(value),
                    type: "string",
                })),
            ],
        };

        // Use server-side authentication to post on behalf of the user
        // Note: In a production environment, you would need proper authentication
        // and user verification before posting on their behalf
        const result = await createPost(publicClient, {
            metadata: postMetadata,
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
            console.error("Lens post creation error:", formatErrorForLogging(result.error, "create-post"));
            return NextResponse.json(
                { error: "Failed to create post on Lens Protocol" },
                { status: 500 }
            );
        }

        // Return the result
        return NextResponse.json({
            success: true,
            publicationId: result.value.postId,
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
