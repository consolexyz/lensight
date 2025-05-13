"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
    Prediction,
    PredictionCategory,
    PredictionStatus,
    CreatePredictionData,
    Bet
} from "@/types/prediction";
import { v4 as uuid } from "uuid";
import { useAuthenticatedUser } from "@lens-protocol/react";

// Mock data for initial predictions
const MOCK_PREDICTIONS: Prediction[] = [
    {
        id: "1",
        creator: {
            address: "0x1234567890123456789012345678901234567890",
            displayName: "CryptoWhale",
            profileImageUrl: "https://avatars.githubusercontent.com/u/30642?s=200&v=4",
        },
        content: "ETH will reach $5,000 by the end of the month",
        category: PredictionCategory.CRYPTO,
        status: PredictionStatus.OPEN,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        bets: [],
        totalBetsTrue: 120,
        totalBetsFalse: 80,
    },
    {
        id: "2",
        creator: {
            address: "0x0987654321098765432109876543210987654321",
            displayName: "SportsOracle",
            profileImageUrl: "https://avatars.githubusercontent.com/u/4622392?s=200&v=4",
        },
        content: "Lakers will win the next game against Warriors",
        category: PredictionCategory.SPORTS,
        status: PredictionStatus.OPEN,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        bets: [],
        totalBetsTrue: 65,
        totalBetsFalse: 45,
    },
    {
        id: "3",
        creator: {
            address: "0xabcdef1234567890abcdef1234567890abcdef12",
            displayName: "SocialGuru",
            profileImageUrl: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
        },
        content: "This tweet will get over 1 million likes within 24 hours",
        category: PredictionCategory.SOCIAL,
        status: PredictionStatus.CLOSED,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        resolvedAt: new Date().toISOString(),
        bets: [],
        totalBetsTrue: 500,
        totalBetsFalse: 350,
    },
];

interface PredictionContextType {
    predictions: Prediction[];
    createPrediction: (predictionData: CreatePredictionData) => Promise<Prediction>;
    placeBet: (predictionId: string, amount: number, position: boolean) => Promise<Bet>;
    resolvePrediction: (predictionId: string, outcome: boolean) => Promise<Prediction>;
    settlePredictionOnChain: (predictionId: string, outcome: boolean) => Promise<string>;
    getPredictionById: (id: string) => Prediction | undefined;
    getUserPredictions: (address: string) => Prediction[];
    loading: boolean;
    error: string | null;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export function PredictionProvider({ children }: { children: React.ReactNode }) {
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { data: authenticatedUser } = useAuthenticatedUser();

    // Initialize with mock data
    useEffect(() => {
        // In a real app, this would fetch from an API or contract
        setPredictions(MOCK_PREDICTIONS);
        setLoading(false);
    }, []);

    // Create a new prediction
    const createPrediction = async (predictionData: CreatePredictionData): Promise<Prediction> => {
        if (!authenticatedUser) {
            throw new Error("You must be authenticated to create a prediction");
        }

        const newPrediction: Prediction = {
            id: uuid(),
            creator: {
                address: authenticatedUser.address,
                displayName: authenticatedUser.name || undefined,
                profileImageUrl: authenticatedUser.picture?.actual?.url || undefined,
            },
            content: predictionData.content,
            category: predictionData.category,
            status: PredictionStatus.OPEN,
            createdAt: new Date().toISOString(),
            expiresAt: predictionData.expiresAt,
            bets: [],
            totalBetsTrue: 0,
            totalBetsFalse: 0,
        };

        setPredictions(prev => [newPrediction, ...prev]);
        return newPrediction;
    };

    // Place a bet on a prediction
    const placeBet = async (predictionId: string, amount: number, position: boolean): Promise<Bet> => {
        if (!authenticatedUser) {
            throw new Error("You must be authenticated to place a bet");
        }

        const prediction = predictions.find(p => p.id === predictionId);
        if (!prediction) {
            throw new Error("Prediction not found");
        }

        if (prediction.status !== PredictionStatus.OPEN) {
            throw new Error("This prediction is no longer open for betting");
        }

        const newBet: Bet = {
            id: uuid(),
            user: {
                address: authenticatedUser.address,
                displayName: authenticatedUser.name || undefined,
                profileImageUrl: authenticatedUser.picture?.actual?.url || undefined,
            },
            predictionId,
            amount,
            position,
            createdAt: new Date().toISOString(),
        };

        const updatedPredictions = predictions.map(p => {
            if (p.id === predictionId) {
                return {
                    ...p,
                    bets: [...p.bets, newBet],
                    totalBetsTrue: position ? p.totalBetsTrue + amount : p.totalBetsTrue,
                    totalBetsFalse: !position ? p.totalBetsFalse + amount : p.totalBetsFalse,
                };
            }
            return p;
        });

        setPredictions(updatedPredictions);
        return newBet;
    };

    // Get a prediction by ID
    const getPredictionById = (id: string): Prediction | undefined => {
        return predictions.find(p => p.id === id);
    };

    // Get predictions created by a specific user
    const getUserPredictions = (address: string): Prediction[] => {
        return predictions.filter(p => p.creator.address === address);
    };

    // Resolve a prediction (offchain)
    const resolvePrediction = async (predictionId: string, outcome: boolean): Promise<Prediction> => {
        if (!authenticatedUser) {
            throw new Error("You must be authenticated to resolve a prediction");
        }

        const prediction = predictions.find(p => p.id === predictionId);
        if (!prediction) {
            throw new Error("Prediction not found");
        }

        if (prediction.creator.address !== authenticatedUser.address) {
            throw new Error("Only the creator can resolve this prediction");
        }

        if (prediction.status !== PredictionStatus.OPEN && prediction.status !== PredictionStatus.CLOSED) {
            throw new Error("This prediction has already been resolved");
        }

        const updatedPredictions = predictions.map(p => {
            if (p.id === predictionId) {
                return {
                    ...p,
                    status: outcome ? PredictionStatus.RESOLVED_TRUE : PredictionStatus.RESOLVED_FALSE,
                    resolvedAt: new Date().toISOString(),
                };
            }
            return p;
        });

        setPredictions(updatedPredictions);
        return updatedPredictions.find(p => p.id === predictionId)!;
    };

    // Settle a prediction on-chain
    const settlePredictionOnChain = async (predictionId: string, outcome: boolean): Promise<string> => {
        if (!authenticatedUser) {
            throw new Error("You must be authenticated to settle a prediction");
        }

        const prediction = predictions.find(p => p.id === predictionId);
        if (!prediction) {
            throw new Error("Prediction not found");
        }

        if (prediction.creator.address !== authenticatedUser.address) {
            throw new Error("Only the creator can settle this prediction");
        }

        // This would interact with a smart contract in a real implementation
        // For now, we'll simulate the blockchain interaction
        console.log(`Settling prediction ${predictionId} on chain with outcome: ${outcome}`);
        
        // Update the local state first
        await resolvePrediction(predictionId, outcome);
        
        // Simulate a transaction hash being returned
        const mockTxHash = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        return mockTxHash;
    };

    const value = {
        predictions,
        createPrediction,
        placeBet,
        resolvePrediction,
        settlePredictionOnChain,
        getPredictionById,
        getUserPredictions,
        loading,
        error,
    };

    return (
        <PredictionContext.Provider value={value}>
            {children}
        </PredictionContext.Provider>
    );
}

export function usePredictions() {
    const context = useContext(PredictionContext);
    if (context === undefined) {
        throw new Error("usePredictions must be used within a PredictionProvider");
    }
    return context;
}
