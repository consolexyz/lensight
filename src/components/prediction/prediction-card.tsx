"use client";

import { Prediction, PredictionStatus } from "@/types/prediction";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import Link from "next/link";

interface PredictionCardProps {
    prediction: Prediction;
    onPlaceBet?: (predictionId: string, amount: number, position: boolean) => Promise<void>;
}

export function PredictionCard({ prediction, onPlaceBet }: PredictionCardProps) {
    const [isPlacingBet, setIsPlacingBet] = useState(false);
    const [betAmount, setBetAmount] = useState(10);

    const totalBets = prediction.totalBetsTrue + prediction.totalBetsFalse;
    const truePercentage = totalBets > 0 ? Math.round((prediction.totalBetsTrue / totalBets) * 100) : 50;
    const falsePercentage = totalBets > 0 ? Math.round((prediction.totalBetsFalse / totalBets) * 100) : 50;

    const createdAt = useMemo(() => {
        return formatDistanceToNow(new Date(prediction.createdAt), { addSuffix: true });
    }, [prediction.createdAt]);

    const expiresAt = useMemo(() => {
        return formatDistanceToNow(new Date(prediction.expiresAt), { addSuffix: true });
    }, [prediction.expiresAt]);

    const handlePlaceBet = async (position: boolean) => {
        if (onPlaceBet) {
            try {
                setIsPlacingBet(true);
                await onPlaceBet(prediction.id, betAmount, position);
            } catch (error) {
                console.error("Error placing bet:", error);
            } finally {
                setIsPlacingBet(false);
            }
        }
    };

    const isPredictionClosed = prediction.status !== PredictionStatus.OPEN;

    return (
        <Card className="mb-4 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={prediction.creator.profileImageUrl} />
                            <AvatarFallback>
                                {prediction.creator.displayName?.substring(0, 2) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">
                                {prediction.creator.displayName || prediction.creator.address.substring(0, 6) + "..."}
                            </div>
                            <div className="text-xs text-muted-foreground flex gap-2">
                                <span>{createdAt}</span>
                                <span className="uppercase text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                    {prediction.category}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {isPredictionClosed ? "Ended" : "Ends"} {expiresAt}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                <Link href={`/prediction/${prediction.id}`} className="text-foreground hover:underline">
                    <p className="text-base">{prediction.content}</p>
                </Link>

                <div className="mt-4 bg-muted rounded-md overflow-hidden">
                    <div className="flex h-4">
                        <div
                            className="bg-green-500 h-full transition-all duration-300"
                            style={{ width: `${truePercentage}%` }}
                        />
                        <div
                            className="bg-red-500 h-full transition-all duration-300"
                            style={{ width: `${falsePercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between px-2 py-1 text-xs font-medium">
                        <span>YES: {truePercentage}%</span>
                        <span>NO: {falsePercentage}%</span>
                    </div>
                </div>

                {prediction.status === PredictionStatus.RESOLVED_TRUE && (
                    <div className="mt-2 text-sm font-medium text-green-600">
                        Resolved: TRUE
                    </div>
                )}

                {prediction.status === PredictionStatus.RESOLVED_FALSE && (
                    <div className="mt-2 text-sm font-medium text-red-600">
                        Resolved: FALSE
                    </div>
                )}
            </CardContent>

            {prediction.status === PredictionStatus.OPEN && onPlaceBet && (
                <CardFooter className="flex gap-2">
                    <div className="flex gap-2 w-full">
                        <Button
                            variant="outline"
                            className="w-1/2 bg-green-50 hover:bg-green-100 border-green-200"
                            disabled={isPlacingBet}
                            onClick={() => handlePlaceBet(true)}
                        >
                            YES
                        </Button>
                        <Button
                            variant="outline"
                            className="w-1/2 bg-red-50 hover:bg-red-100 border-red-200"
                            disabled={isPlacingBet}
                            onClick={() => handlePlaceBet(false)}
                        >
                            NO
                        </Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
