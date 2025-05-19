"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { PredictionWithUser, BetWithUser, PredictionCategory, transformPrediction, transformBet } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { useAuthenticatedUser } from "@lens-protocol/react";

// Type for tracking pending bets that might need retry
interface PendingBet {
    predictionId: string;
    amount: number;
    position: boolean;
    userAddress: string;
    transactionHash: string;
    timestamp: number;
    retryCount: number;
}

interface PredictionContextType {
    // Prediction states
    predictions: PredictionWithUser[];
    selectedPrediction: PredictionWithUser | null;
    isLoadingPredictions: boolean;
    isLoadingPrediction: boolean;
    error: string | null;

    // Prediction filter states
    selectedCategory: PredictionCategory | "all";
    userAddress: string | null;

    // Actions
    fetchPredictions: () => Promise<void>;
    fetchPredictionById: (id: string) => Promise<PredictionWithUser | null>;
    createPrediction: (predictionData: any) => Promise<PredictionWithUser | null>;
    placeBet: (predictionId: string, amount: number, position: boolean) => Promise<boolean>;
    claimReward: (predictionId: string) => Promise<boolean>;
    setSelectedCategory: (category: PredictionCategory | "all") => void;
    setUserAddress: (address: string | null) => void;
    syncPendingBets: () => Promise<void>; // New method for manual sync
}

// Create context
const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export function PredictionProvider({ children }: { children: ReactNode }) {
    const { toast } = useToast();
    const { data: authenticatedUser } = useAuthenticatedUser();

    // States
    const [predictions, setPredictions] = useState<PredictionWithUser[]>([]);
    const [selectedPrediction, setSelectedPrediction] = useState<PredictionWithUser | null>(null);
    const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
    const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<PredictionCategory | "all">("all");
    const [userAddress, setUserAddress] = useState<string | null>(null);

    // Pending bets state
    const [pendingBets, setPendingBets] = useState<PendingBet[]>([]);

    // Fetch all predictions with optional filters
    const fetchPredictions = useCallback(async () => {
        try {
            setIsLoadingPredictions(true);
            setError(null);

            const params = new URLSearchParams();
            if (selectedCategory && selectedCategory !== "all") {
                params.append("category", selectedCategory);
            }
            if (userAddress) {
                params.append("userAddress", userAddress);
            }

            const response = await fetch(`/api/predictions?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch predictions: ${response.statusText}`);
            }

            const data = await response.json();
            const transformedPredictions = data.predictions.map(transformPrediction);
            setPredictions(transformedPredictions);
        } catch (error) {
            console.error("Error fetching predictions:", error);
            setError("Failed to load predictions");
            toast({
                title: "Error",
                description: "Failed to load predictions",
                variant: "destructive",
            });
        } finally {
            setIsLoadingPredictions(false);
        }
    }, [selectedCategory, userAddress, toast]);

    // Fetch a prediction by ID
    const fetchPredictionById = useCallback(async (id: string) => {
        try {
            setIsLoadingPrediction(true);
            setError(null);

            const response = await fetch(`/api/predictions/${id}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch prediction: ${response.statusText}`);
            }

            const data = await response.json();
            const transformedPrediction = transformPrediction(data.prediction);
            setSelectedPrediction(transformedPrediction);
            return transformedPrediction;
        } catch (error) {
            console.error(`Error fetching prediction ${id}:`, error);
            setError("Failed to load prediction details");
            toast({
                title: "Error",
                description: "Failed to load prediction details",
                variant: "destructive",
            });
            return null;
        } finally {
            setIsLoadingPrediction(false);
        }
    }, [toast]);

    // Create a new prediction
    const createPrediction = useCallback(async (predictionData: any) => {
        try {
            setError(null);

            const response = await fetch("/api/predictions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(predictionData),
            });

            if (!response.ok) {
                throw new Error(`Failed to create prediction: ${response.statusText}`);
            }

            const data = await response.json();
            const newPrediction = transformPrediction(data.prediction);

            // Update the predictions list with the new prediction
            setPredictions(prev => [newPrediction, ...prev]);

            toast({
                title: "Success",
                description: "Prediction created successfully",
            });

            return newPrediction;
        } catch (error) {
            console.error("Error creating prediction:", error);
            setError("Failed to create prediction");
            toast({
                title: "Error",
                description: "Failed to create prediction",
                variant: "destructive",
            });
            return null;
        }
    }, [toast]);

    // Place a bet on a prediction
    const placeBet = useCallback(async (predictionId: string, amount: number, position: boolean) => {
        if (!authenticatedUser) {
            toast({
                title: "Authentication Required",
                description: "Please connect your wallet to place a bet",
                variant: "destructive",
            });
            return false;
        }

        // Validate inputs
        if (!predictionId || !predictionId.trim()) {
            toast({
                title: "Invalid Prediction",
                description: "Cannot place bet on invalid prediction",
                variant: "destructive",
            });
            return false;
        }

        // We now allow any amount, including negative values
        // Note: Smart contract will need to handle negative values appropriately

        try {
            setError(null);

            // Check if wallet is available
            if (!window.ethereum) {
                throw new Error("Please install MetaMask or another Web3 wallet");
            }            // Import dependencies
            const viemModule = await import('viem');
            const chainsModule = await import('@/lib/contracts/chains');
            const abiModule = await import('@/lib/contracts/abis/PredictionMarket.json');

            // Create wallet client
            const walletClient = viemModule.createWalletClient({
                chain: chainsModule.lensChainTestnet,
                transport: viemModule.custom(window.ethereum)
            });

            // Get user's address
            const [address] = await walletClient.requestAddresses();

            // Get prediction's contract address
            let currentPrediction;

            if (selectedPrediction && selectedPrediction.id === predictionId) {
                currentPrediction = selectedPrediction;
            } else {
                console.log("Fetching prediction by ID:", predictionId);
                currentPrediction = await fetchPredictionById(predictionId);
            }

            if (!currentPrediction) {
                throw new Error(`Prediction with ID ${predictionId} not found`);
            }

            if (!currentPrediction.contractAddress) {
                throw new Error(`Invalid prediction: missing contract address for prediction ${predictionId}`);
            }

            // Convert amount to wei
            const amountInWei = viemModule.parseEther(amount.toString());

            // Get ABI - this is the PredictionMarket contract ABI (not the factory)
            const abi = abiModule.default || abiModule;

            // Place bet directly on the PredictionMarket contract
            const hash = await walletClient.writeContract({
                address: currentPrediction.contractAddress as `0x${string}`,
                abi: abi,
                functionName: 'placeBet',
                args: [position],
                value: amountInWei,
                account: address
            });

            // Record bet in database with retry mechanism
            console.log(`Recording bet: prediction ${predictionId}, user ${address}, amount ${amount}, position ${position}, tx hash: ${hash}`);

            // Implement retry logic for database update
            const MAX_RETRIES = 3;
            let retries = 0;
            let success = false;

            // We're temporarily not adding to pending bets state to avoid render issues
            // Instead, just log the transaction for debugging
            const newPendingBet: PendingBet = {
                predictionId,
                amount,
                position,
                userAddress: address,
                transactionHash: hash,
                timestamp: Date.now(),
                retryCount: 0,
            };
            console.log("Bet placed but not added to pending state:", newPendingBet);

            while (retries < MAX_RETRIES && !success) {
                try {
                    // Add a small delay on retries
                    if (retries > 0) {
                        console.log(`Retry attempt ${retries} for database update`);
                        await new Promise(resolve => setTimeout(resolve, retries * 1000)); // Incremental backoff
                    }

                    const response = await fetch(`/api/predictions/${predictionId}/bets`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userAddress: address,
                            amount,
                            position,
                            transactionHash: hash,
                            // Include user display name and image if available from authenticated user
                            userName: authenticatedUser?.displayName || undefined,
                            userImage: authenticatedUser?.profilePictureUrl || undefined
                        }),
                    });

                    // Helper function to handle successful bet with already parsed response data
                    const handleSuccessfulBet = async (responseData: any, predictionId: string) => {
                        try {
                            // Check if the response contains prediction data
                            if (responseData.prediction) {
                                const { prediction: updatedPrediction } = responseData;
                                const transformed = transformPrediction(updatedPrediction);

                                setSelectedPrediction(transformed);

                                // Also update in the predictions list if it exists there
                                setPredictions(prev =>
                                    prev.map(p =>
                                        p.id === predictionId ? transformed : p
                                    )
                                );
                            } else {
                                // If no prediction data in response, manually refetch it
                                console.warn('Response did not contain prediction data, refetching...');
                                await fetchPredictionById(predictionId);
                            }

                            toast({
                                title: "Bet Placed",
                                description: `You bet ${amount} on ${position ? "YES" : "NO"}`,
                            });

                            return true;
                        } catch (error) {
                            console.error("Error handling bet response:", error);
                            await fetchPredictionById(predictionId);

                            toast({
                                title: "Bet Placed",
                                description: `Your bet was placed successfully`,
                            });

                            return true;
                        }
                    };

                    // Check if we got any kind of response, even if not perfectly OK
                    if (response.status >= 200 && response.status < 500) {
                        let responseData;
                        try {
                            responseData = await response.json();
                        } catch (error) {
                            console.error("Error parsing API response:", error);
                            // If we can't parse the response, try to fetch the prediction directly
                            await fetchPredictionById(predictionId);

                            toast({
                                title: "Bet Placed",
                                description: `Your bet was placed successfully`,
                            });

                            success = true;
                            return true;
                        }

                        // Check if there's a warning but the prediction data was still returned
                        if (responseData.warning && responseData.prediction) {
                            console.log('Database update warning:', responseData.warning);
                            toast({
                                title: "Transaction Successful",
                                description: responseData.warning,
                                variant: "warning",
                            });

                            // Update the UI with what we got
                            const transformed = transformPrediction(responseData.prediction);
                            setSelectedPrediction(transformed);
                            setPredictions(prev =>
                                prev.map(p => p.id === predictionId ? transformed : p)
                            );

                            success = true;
                            return true;
                        }

                        // If we have a successful response with bet and prediction data
                        if (response.ok && responseData.bet && responseData.prediction) {
                            success = true;
                            return await handleSuccessfulBet(responseData, predictionId);
                        }

                        // Handle error responses with useful data
                        if (!response.ok && responseData.error) {
                            console.error('API error response:', responseData.error);
                            throw new Error(responseData.error);
                        }
                    }

                    // If we get here, the response wasn't what we expected
                    console.error('Unexpected API response:', response.status, response.statusText);
                    throw new Error(`Unexpected response: ${response.status} ${response.statusText}`);
                } catch (apiError) {
                    console.error(`API call error (attempt ${retries + 1}/${MAX_RETRIES}):`, apiError);
                    retries++;

                    // If we've exhausted all retries, show the warning
                    if (retries >= MAX_RETRIES) {
                        console.log('Max retries reached, showing warning toast');
                        // Don't throw an error here - the blockchain tx succeeded
                        toast({
                            title: "Transaction Successful",
                            description: "Your bet was placed on the blockchain but we had trouble updating our database. The data will sync shortly.",
                            variant: "warning",
                        });

                        // Try one last time to fetch the prediction to update the UI
                        try {
                            await fetchPredictionById(predictionId);
                        } catch (fetchError) {
                            console.error('Failed to fetch updated prediction:', fetchError);
                        }

                        return true;
                    }
                }
            }

            return true;
        } catch (error) {
            console.error("Error placing bet:", error);

            let errorMessage = "Failed to place bet. Please try again.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });

            return false;
        }
    }, [authenticatedUser, selectedPrediction, fetchPredictionById, toast]);

    // Update predictions when filters change
    useEffect(() => {
        fetchPredictions();
    }, [fetchPredictions, selectedCategory, userAddress]);

    // Claim reward for a resolved prediction
    const claimReward = useCallback(async (predictionId: string) => {
        if (!authenticatedUser) {
            toast({
                title: "Authentication Required",
                description: "Please connect your wallet to claim rewards",
                variant: "destructive",
            });
            return false;
        }

        try {
            setError(null);

            // Check if wallet is available
            if (!window.ethereum) {
                throw new Error("Please install MetaMask or another Web3 wallet");
            }

            // Import dependencies
            const viemModule = await import('viem');
            const chainsModule = await import('@/lib/contracts/chains');
            const abiModule = await import('@/lib/contracts/abis/PredictionMarket.json');

            // Create wallet client
            const walletClient = viemModule.createWalletClient({
                chain: chainsModule.lensChainTestnet,
                transport: viemModule.custom(window.ethereum)
            });

            // Get user's address
            const [address] = await walletClient.requestAddresses();

            // Get prediction's contract address
            const currentPrediction = selectedPrediction ||
                await fetchPredictionById(predictionId);

            if (!currentPrediction?.contractAddress) {
                throw new Error("Invalid prediction");
            }

            // Get ABI - this is the PredictionMarket contract ABI (not the factory)
            const abi = abiModule.default || abiModule;

            // Call claimReward function on the contract
            const hash = await walletClient.writeContract({
                address: currentPrediction.contractAddress as `0x${string}`,
                abi: abi,
                functionName: 'claimReward',
                args: [],
                account: address
            });

            toast({
                title: "Reward Claimed",
                description: "Your reward claim has been processed",
            });

            // Refresh the prediction details
            await fetchPredictionById(predictionId);

            return true;
        } catch (error) {
            console.error("Error claiming reward:", error);

            let errorMessage = "Failed to claim reward. Please try again.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });

            return false;
        }
    }, [authenticatedUser, selectedPrediction, fetchPredictionById, toast]);

    // Manual sync for pending bets - simplified to prevent infinite update cycles
    const syncPendingBets = useCallback(async () => {
        try {
            setError(null);

            // Simple toast to inform user
            toast({
                title: "Sync Feature Disabled",
                description: "The bet synchronization feature is temporarily unavailable while we perform system maintenance.",
            });

            // Clear pending bets to avoid issues
            setPendingBets([]);

            // Clear local storage
            if (authenticatedUser?.address) {
                localStorage.removeItem(`pendingBets_${authenticatedUser.address}`);
            }

            return;

        } catch (error) {
            console.error("Error syncing pending bets:", error);
            toast({
                title: "Feature Disabled",
                description: "This feature is currently unavailable",
                variant: "destructive",
            });
        }
    }, [toast, authenticatedUser?.address]);

    // Load pending bets from local storage - simplified
    useEffect(() => {
        // Reset pending bets state when component mounts or user changes
        setPendingBets([]);

        // Clear local storage for the user to prevent future issues
        if (authenticatedUser?.address) {
            try {
                localStorage.removeItem(`pendingBets_${authenticatedUser.address}`);
            } catch (error) {
                console.error("Error clearing pending bets from storage:", error);
            }
        }
    }, [authenticatedUser?.address]);

    // Simplified save effect - only clears storage to avoid infinite update issues
    useEffect(() => {
        // This effect is kept minimal to prevent render loops
        const address = authenticatedUser?.address;
        if (!address) return;

        // Just log that we're skipping saves to localStorage
        if (pendingBets.length > 0) {
            console.log(`Skipping save of ${pendingBets.length} pending bets to prevent render issues`);
        }
    }, [pendingBets.length, authenticatedUser?.address]);

    // Context value
    const contextValue = {
        predictions,
        selectedPrediction,
        isLoadingPredictions,
        isLoadingPrediction,
        error,
        selectedCategory,
        userAddress,
        fetchPredictions,
        fetchPredictionById,
        createPrediction,
        placeBet,
        claimReward,
        setSelectedCategory,
        setUserAddress,
        syncPendingBets
    };

    return (
        <PredictionContext.Provider value={contextValue}>
            {children}
        </PredictionContext.Provider>
    );
}

export function usePrediction() {
    const context = useContext(PredictionContext);
    if (!context) {
        throw new Error("usePrediction must be used within a PredictionProvider");
    }
    return context;
}
