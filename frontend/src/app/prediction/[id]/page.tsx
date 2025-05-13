"use client";

import { PredictionDetail } from "@/components/prediction/prediction-detail";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PredictionPage({ params }: { params: { id: string } }) {
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

            <PredictionDetail predictionId={params.id} />
        </div>
    );
}
