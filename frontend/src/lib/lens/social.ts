// Social interactions with Lens Protocol
import { getPublicClient, getBuilderClient } from './client';
import { PredictionWithUser } from '@/lib/types';

/**
 * Create a comment on a prediction without requiring message signing
 * 
 * @param address User's wallet address
 * @param predictionId The prediction ID to comment on
 * @param content Comment content
 */
export async function createCommentWithoutSigning(
    address: string,
    predictionId: string,
    content: string
) {
    try {
        // Use the API route directly - it will handle finding or creating the publication ID
        const commentResponse = await fetch(`/api/predictions/${predictionId}/lens-comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address,
                content
            }),
        });

        // Get the response data
        const result = await commentResponse.json();

        // Check for success, including fallback scenarios
        if (result.success) {
            return result;
        }

        // If there was an error but we still got a result with a comment
        // (fallback to database succeeded), return that
        if (result.comment) {
            console.log("Comment posted to database but not to Lens:", result.error);
            return {
                success: true,
                comment: result.comment,
                lensStatus: "fallback-to-database",
            };
        }

        // Otherwise, it's a real error
        throw new Error(result.error || 'Failed to create comment');
    } catch (error) {
        console.error('Error creating comment without signing:', error);

        // Add fallback to regular database comment
        try {
            const fallbackResponse = await fetch(`/api/predictions/${predictionId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAddress: address,
                    content
                }),
            });

            if (fallbackResponse.ok) {
                const fallbackResult = await fallbackResponse.json();
                console.log("Successfully used fallback database comment");
                return {
                    success: true,
                    comment: fallbackResult.comment,
                    lensStatus: "fallback-to-database",
                };
            }
        } catch (fallbackError) {
            console.error("Even fallback comment creation failed:", fallbackError);
        }

        // If we get here, both Lens and fallback failed
        throw error;
    }
}

/**
 * Create a post on Lens Protocol without requiring message signing
 * 
 * @param address User's wallet address
 * @param content Post content
 * @param metadata Additional metadata for the post
 */
export async function createPostWithoutSigning(
    address: string,
    content: string,
    metadata: Record<string, any> = {}
) {
    try {
        // Use the public client instead of the builder client
        const publicClient = getPublicClient();

        // Use the API route to handle posting without requiring signing
        const postResponse = await fetch('/api/lens/create-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address,
                content,
                metadata
            }),
        });

        if (!postResponse.ok) {
            const errorData = await postResponse.json();
            throw new Error(errorData.error || 'Failed to create post');
        }

        const result = await postResponse.json();
        return result;
    } catch (error) {
        console.error('Error creating post without signing:', error);
        throw error;
    }
}

/**
 * Create a comment on a prediction
 * 
 * @param address User's wallet address
 * @param predictionId The prediction ID to comment on
 * @param content Comment content
 * @param signMessage Function to sign messages with the user's wallet
 */
export async function createComment(
    address: string,
    predictionId: string,
    content: string,
    signMessage: (message: string) => Promise<string>
) {
    try {
        const builderClient = await getBuilderClient(address, signMessage);
        if (!builderClient) {
            throw new Error('Failed to get authenticated client');
        }

        // First, fetch the prediction details to get its associated publication ID
        // For now, we'll assume a simple mapping or store publication ID in the prediction
        const response = await fetch(`/api/predictions/${predictionId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch prediction details');
        }

        const predictionData = await response.json();
        const prediction = predictionData.prediction;

        // Use the Lens SDK to create a comment
        // In a real implementation, we'd link this comment to the prediction's publication
        // If the prediction has a lensPublicationId property
        const publicationId = prediction.lensPublicationId;

        if (!publicationId) {
            // If there's no publication ID yet, create a new post instead
            const result = await builderClient.publication.postOnchain({
                content: {
                    content,
                    // Add prediction metadata as attributes
                    attributes: [
                        {
                            key: 'predictionId',
                            value: predictionId,
                            type: 'string'
                        },
                        {
                            key: 'type',
                            value: 'comment',
                            type: 'string'
                        },
                        {
                            key: 'appId',
                            value: 'lensight',
                            type: 'string'
                        }
                    ],
                },
            });
            return result;
        } else {
            // If there is a publication ID, create a comment on that publication
            const result = await builderClient.publication.commentOnchain({
                commentOn: publicationId,
                content: {
                    content,
                    attributes: [
                        {
                            key: 'predictionId',
                            value: predictionId,
                            type: 'string'
                        },
                        {
                            key: 'type',
                            value: 'comment',
                            type: 'string'
                        },
                        {
                            key: 'appId',
                            value: 'lensight',
                            type: 'string'
                        }
                    ],
                },
            });
            return result;
        }
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
}

/**
 * Like a prediction
 * 
 * @param address User's wallet address
 * @param predictionId The prediction ID to like
 * @param signMessage Function to sign messages with the user's wallet
 */
export async function likePrediction(
    address: string,
    predictionId: string,
    signMessage: (message: string) => Promise<string>
) {
    try {
        const builderClient = await getBuilderClient(address, signMessage);
        if (!builderClient) {
            throw new Error('Failed to get authenticated client');
        }

        // First, fetch the prediction details to get its associated publication ID
        const response = await fetch(`/api/predictions/${predictionId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch prediction details');
        }

        const predictionData = await response.json();
        const prediction = predictionData.prediction;

        // Check if the prediction has a Lens publication ID
        const publicationId = prediction.lensPublicationId;

        if (!publicationId) {
            // If there's no Lens publication yet, create one first
            console.log('No Lens publication ID found for prediction, creating one first');

            // Create a new publication for this prediction
            const publicationResult = await builderClient.publication.postOnchain({
                content: {
                    content: prediction.content,
                    // Add prediction metadata
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
                            value: prediction.category,
                            type: 'string'
                        },
                        {
                            key: 'appId',
                            value: 'lensight',
                            type: 'string'
                        }
                    ],
                },
            });

            if (publicationResult.isFailure()) {
                throw new Error('Failed to create Lens publication for prediction');
            }

            // Update the prediction with the new publication ID
            const newPublicationId = publicationResult.value.id;

            // Save the Lens publication ID to our database
            const updateResponse = await fetch(`/api/predictions/${predictionId}/lens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lensPublicationId: newPublicationId
                }),
            });

            if (!updateResponse.ok) {
                console.error('Failed to save Lens publication ID to prediction');
            }

            // Now add the reaction to the new publication
            const result = await builderClient.reactions.add({
                publicationId: newPublicationId,
                reaction: 'UPVOTE',
            });

            return result;
        } else {
            // If there is a publication ID, simply add a reaction to it
            const result = await builderClient.reactions.add({
                publicationId,
                reaction: 'UPVOTE',
            });

            return result;
        }
    } catch (error) {
        console.error('Error liking prediction:', error);
        throw error;
    }
}

/**
 * Like a prediction without requiring message signing
 * Uses a server-side API route to handle Lens Protocol interaction
 * 
 * @param address User's wallet address
 * @param predictionId The prediction ID to like
 */
export async function likePredictionWithoutSigning(
    address: string,
    predictionId: string
) {
    try {
        // Use the API route to handle liking without requiring signing
        const likeResponse = await fetch(`/api/predictions/${predictionId}/lens-like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address
            }),
        });

        // Read the response body once and store it
        const responseData = await likeResponse.json();

        if (!likeResponse.ok) {
            throw new Error(responseData.error || 'Failed to like prediction');
        }

        return responseData;
    } catch (error) {
        console.error('Error liking prediction without signing:', error);

        // Try fallback to regular database like
        try {
            const fallbackResponse = await fetch(`/api/predictions/${predictionId}/likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAddress: address
                }),
            });

            if (fallbackResponse.ok) {
                const fallbackResult = await fallbackResponse.json();
                console.log("Successfully used fallback database like");
                return {
                    success: true,
                    action: fallbackResult.action,
                    lensStatus: "fallback-to-database",
                };
            }
        } catch (fallbackError) {
            console.error("Even fallback like creation failed:", fallbackError);
        }

        throw error;
    }
}

/**
 * Get comments for a prediction
 * Uses an updated implementation compatible with the latest Lens Protocol API
 * 
 * @param predictionId The prediction ID to get comments for
 */
export async function getCommentsForPrediction(predictionId: string) {
    try {
        const publicClient = getPublicClient();

        // First, try to get the prediction details to find its Lens publication ID
        const response = await fetch(`/api/predictions/${predictionId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch prediction details');
        }

        const predictionData = await response.json();
        const prediction = predictionData.prediction;

        // If the prediction has a Lens publication ID, use it to fetch comments
        if (prediction.lensPublicationId) {
            try {
                // Dynamically import to prevent SSR issues
                const { fetchComments } = await import("@lens-protocol/client/actions");

                // Use the Lens actions to fetch comments
                const result = await fetchComments(publicClient, {
                    commentsOf: prediction.lensPublicationId,
                    limit: 50,
                });

                if (result.isErr()) {
                    throw result.error;
                }

                // Transform the Lens comments to match our app's format
                const comments = result.value.items.map(comment => ({
                    id: comment.id,
                    predictionId: predictionId,
                    content: comment.metadata?.content || '',
                    createdAt: comment.createdAt,
                    lensPublicationId: comment.id,
                    user: {
                        address: comment.by?.ownedBy?.address || '',
                        displayName: comment.by?.handle?.fullHandle || comment.by?.handle?.localName || '',
                        profileImageUrl: comment.by?.metadata?.picture?.optimized?.uri || '',
                    }
                }));

                return comments;
            } catch (error) {
                console.error('Error fetching Lens comments:', error);
                // If there's an error with Lens, fall through to database comments
            }
        }

        // Fallback to querying our database directly
        const dbCommentsResponse = await fetch(`/api/predictions/${predictionId}/comments`);
        if (dbCommentsResponse.ok) {
            const data = await dbCommentsResponse.json();
            return data.comments || [];
        }
    } catch (error) {
        console.error('Error getting comments:', error);
        // Fallback to our database comments if Lens API fails
        try {
            const response = await fetch(`/api/predictions/${predictionId}/comments`);
            if (response.ok) {
                const data = await response.json();
                return data.comments || [];
            }
        } catch (fallbackError) {
            console.error('Fallback error getting comments:', fallbackError);
        }

        return []; // Return empty array as last resort
    }
}
