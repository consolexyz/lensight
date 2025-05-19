"use client";

import { PredictionDetail } from "@/components/prediction/prediction-detail";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface PredictionPageProps {
    params: { id: string } | Promise<{ id: string }>;
}

export default function PredictionPage({ params }: PredictionPageProps) {
    // Properly unwrap the params object using React.use()
    const resolvedParams = use(params);
    const predictionId = resolvedParams.id;

    return (
        <div className="max-w-3xl mx-auto py-6">
            <div className="mb-6">
                <Button asChild variant="ghost" size="sm" className="mb-4">
                    <Link href="/">
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Feed
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Prediction Details</h1>
            </div>

            <PredictionDetail predictionId={predictionId} />
        </div>
    );
}
