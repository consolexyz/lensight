"use client";

import { PredictionWithUser, PredictionCategory } from "@/lib/types";
import { PredictionCard } from "./prediction-card";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PredictionFilter } from "./prediction-filter";
import { usePrediction } from "@/lib/contexts/PredictionContext";

interface PredictionFeedProps {
    initialPredictions?: PredictionWithUser[];
    userAddress?: string;
    showFilters?: boolean;
    emptyMessage?: string;
}

export function PredictionFeed({
    initialPredictions,
    userAddress,
    showFilters = true,
    emptyMessage = "No predictions found"
}: PredictionFeedProps) {
    const {
        predictions,
        isLoadingPredictions,
        selectedCategory,
        setSelectedCategory,
        setUserAddress,
        placeBet
    } = usePrediction();

    useEffect(() => {
        // If initialPredictions are provided, use those instead of fetching
        if (initialPredictions) {
            // We don't modify the context in this case
            return;
        }

        // Update user address in context if provided as prop
        if (userAddress) {
            setUserAddress(userAddress);
        }

        // The context will automatically fetch predictions when selectedCategory or userAddress change
    }, [initialPredictions, userAddress, setUserAddress]);

    const handlePlaceBet = async (predictionId: string, amount: number, position: boolean) => {
        // Use the placeBet function from context
        await placeBet(predictionId, amount, position);
    };

    // Loading state with skeletons
    if (isLoadingPredictions) {
        return (
            <div className="space-y-4 mt-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        </div>
                        <Skeleton className="h-24 w-full" />
                    </div>
                ))}
            </div>
        );
    }

    // Use either initialPredictions or predictions from context
    const displayPredictions = initialPredictions || predictions;

    return (
        <div className="space-y-4">
            {showFilters && (
                <PredictionFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            )}

            {displayPredictions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    {emptyMessage}
                </div>
            ) : (
                <div className="space-y-4">
                    {displayPredictions.map((prediction) => (
                        <PredictionCard
                            key={prediction.id}
                            prediction={prediction}
                            onPlaceBet={handlePlaceBet}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
