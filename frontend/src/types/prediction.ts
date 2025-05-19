export enum PredictionCategory {
    CRYPTO = "crypto",
    SPORTS = "sports",
    SOCIAL = "social",
    OTHER = "other"
}

export enum PredictionStatus {
    OPEN = "open",
    CLOSED = "closed",
    RESOLVED_TRUE = "resolved_true",
    RESOLVED_FALSE = "resolved_false"
}

export interface Prediction {
    id: string;
    creator: {
        address: string;
        displayName?: string;
        profileImageUrl?: string;
    };
    content: string;
    category: PredictionCategory;
    status: PredictionStatus;
    createdAt: string;
    expiresAt: string;
    resolvedAt?: string;
    bets: Bet[];
    totalBetsTrue: number;
    totalBetsFalse: number;
    contractAddress?: string;
    isPending?: boolean;
    hasError?: boolean;
    errorMessage?: string;
    targetPrice?: string;
    comparisonOperator?: string;
    tokenSymbol?: string;
}

export interface Bet {
    id: string;
    user: {
        address: string;
        displayName?: string;
        profileImageUrl?: string;
    };
    predictionId: string;
    amount: number;
    position: boolean; // true = YES, false = NO
    createdAt: string;
}

export interface CreatePredictionData {
    content: string;
    category: PredictionCategory;
    expiresAt: string;
    targetPrice?: string;
    comparisonOperator?: string;
}