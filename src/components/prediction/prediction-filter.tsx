"use client";

import { PredictionCategory } from "@/types/prediction";
import { Button } from "@/components/ui/button";

interface PredictionFilterProps {
    selectedCategory: PredictionCategory | "all";
    onSelectCategory: (category: PredictionCategory | "all") => void;
}

export function PredictionFilter({ selectedCategory, onSelectCategory }: PredictionFilterProps) {
    const categories = [
        { id: "all", label: "All" },
        { id: PredictionCategory.CRYPTO, label: "Crypto" },
        { id: PredictionCategory.SPORTS, label: "Sports" },
        { id: PredictionCategory.SOCIAL, label: "Social" },
        { id: PredictionCategory.OTHER, label: "Other" },
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSelectCategory(category.id as PredictionCategory | "all")}
                >
                    {category.label}
                </Button>
            ))}
        </div>
    );
}
