"use client";

import { Prediction } from "@/types/prediction";
import { PredictionCard } from "./prediction-card";
import { usePredictions } from "@/context/PredictionContext";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PredictionFilter } from "./prediction-filter";
import { PredictionCategory } from "@/types/prediction";

interface PredictionFeedProps {
    initialPredictions?: Prediction[];
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
    const { predictions: contextPredictions, loading, placeBet } = usePredictions();
    const [filteredPredictions, setFilteredPredictions] = useState<Prediction[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<PredictionCategory | "all">("all");

    const predictions = initialPredictions || contextPredictions;

    useEffect(() => {
        let filtered = [...predictions];

        // Filter by user if provided
        if (userAddress) {
            filtered = filtered.filter(p => p.creator.address === userAddress);
        }

        // Filter by category if selected
        if (selectedCategory !== "all") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Sort by newest first
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setFilteredPredictions(filtered);
    }, [predictions, userAddress, selectedCategory]);

    const handlePlaceBet = async (predictionId: string, amount: number, position: boolean) => {
        try {
            await placeBet(predictionId, amount, position);
        } catch (error) {
            console.error("Failed to place bet:", error);
        }
    };

    if (loading) {
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

    return (
        <div className="space-y-4">
            {showFilters && (
                <PredictionFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            )}

            {filteredPredictions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    {emptyMessage}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredPredictions.map((prediction) => (
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
