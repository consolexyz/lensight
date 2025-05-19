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
}

export interface BetWithUser extends Omit<PrismaBet, 'userAddress' | 'userName' | 'userImage'> {
    user: {
        address: string;
        displayName?: string | null;
        profileImageUrl?: string | null;
    };
}

// Helper function to transform Prisma Prediction to frontend PredictionWithUser
export function transformPrediction(prediction: PrismaPrediction): PredictionWithUser {
    return {
        ...prediction,
        creator: {
            address: prediction.creatorAddress,
            displayName: prediction.creatorName,
            profileImageUrl: prediction.creatorImage,
        }
    };
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

export interface CreatePredictionData {
    content: string;
    category: PredictionCategory;
    expiresAt: string;
    targetPrice?: string;
    comparisonOperator?: string;
}