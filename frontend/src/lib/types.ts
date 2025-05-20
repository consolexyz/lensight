import { Prediction as PrismaPrediction, Bet as PrismaBet } from "@/generated/prisma";
import { $Enums } from "@/generated/prisma";

// Export both the type and the enum values
export type PredictionCategory = $Enums.PredictionCategory;
export const PredictionCategory = $Enums.PredictionCategory;

export type PredictionStatus = $Enums.PredictionStatus;
export const PredictionStatus = $Enums.PredictionStatus;

export interface PredictionWithUser extends Omit<PrismaPrediction, 'creatorAddress' | 'creatorName' | 'creatorImage'> {
    creator: {
        address: string;
        displayName?: string | null;
        profileImageUrl?: string | null;
    };
    comments?: CommentWithUser[];
    likes?: LikeWithUser[];
    likesCount?: number;
    bets: BetWithUser[]; // Add bets to the type
}

export interface BetWithUser extends Omit<PrismaBet, 'userAddress' | 'userName' | 'userImage'> {
    user: {
        address: string;
        displayName?: string | null;
        profileImageUrl?: string | null;
    };
}

export interface CommentWithUser {
    id: string;
    predictionId: string;
    content: string;
    createdAt: string;
    lensPublicationId?: string | null;
    user: {
        address: string;
        displayName?: string | null;
        profileImageUrl?: string | null;
    };
}

export interface LikeWithUser {
    id: string;
    predictionId: string;
    createdAt: string;
    user: {
        address: string;
        displayName?: string | null;
        profileImageUrl?: string | null;
    };
}

// Helper function to transform Prisma Prediction to frontend PredictionWithUser
export function transformPrediction(prediction: any): PredictionWithUser {
    // Handle missing fields with fallbacks
    const transformed: PredictionWithUser = {
        ...prediction,
        creator: {
            address: prediction.creatorAddress || "",
            displayName: prediction.creatorName || null,
            profileImageUrl: prediction.creatorImage || null,
        },
        bets: Array.isArray(prediction.bets)
            ? prediction.bets.map((bet: any) => transformBet(bet))
            : []
    };

    return transformed;
}

// Helper function to transform Prisma Bet to frontend BetWithUser
export function transformBet(bet: PrismaBet): BetWithUser {
    return {
        ...bet,
        user: {
            address: bet.userAddress,
            displayName: bet.userName,
            profileImageUrl: bet.userImage,
        }
    };
}

// Helper function to transform Prisma Comment to CommentWithUser
export function transformComment(comment: any): CommentWithUser {
    return {
        id: comment.id,
        predictionId: comment.predictionId,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
        lensPublicationId: comment.lensPublicationId,
        user: {
            address: comment.userAddress,
            displayName: comment.userName,
            profileImageUrl: comment.userImage,
        }
    };
}

// Helper function to transform Prisma Like to LikeWithUser
export function transformLike(like: any): LikeWithUser {
    return {
        id: like.id,
        predictionId: like.predictionId,
        createdAt: like.createdAt.toISOString(),
        user: {
            address: like.userAddress,
            displayName: like.userName,
            profileImageUrl: like.userImage,
        }
    };
}

export interface CreatePredictionData {
    content: string;
    category: PredictionCategory;
    expiresAt: string;
    targetPrice?: string;
    comparisonOperator?: string;
    tokenSymbol?: string;
}