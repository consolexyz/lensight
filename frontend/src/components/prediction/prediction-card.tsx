"use client";

import { PredictionWithUser, PredictionStatus } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import Link from "next/link";
import { LensAddressDisplay } from "@/components/lens/lens-address-display";

interface PredictionCardProps {
    prediction: PredictionWithUser;
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
                            <AvatarImage src={prediction.creator.profileImageUrl || undefined} />
                            <AvatarFallback>
                                {prediction.creator.displayName?.substring(0, 2) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">
                                {prediction.creator.displayName || <LensAddressDisplay address={prediction.creator.address} />}
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

                <div className="mt-4 bg-muted rounded-md p-2">
                    <div className="flex justify-between text-xs font-medium">
                        <div>
                            <span className="font-semibold text-green-600">YES:</span> {prediction.bets.filter(bet => bet.position).length} bets
                        </div>
                        <div>
                            <span className="font-semibold text-red-600">NO:</span> {prediction.bets.filter(bet => !bet.position).length} bets
                        </div>
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
                <CardFooter className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm text-muted-foreground">Amount (GHO):</label>
                        <Input
                            type="number"
                            step="any"
                            value={betAmount}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                // Allow any positive number including decimals
                                if (!isNaN(value)) {
                                    setBetAmount(value);
                                } else if (e.target.value === '') {
                                    // Allow clearing the input
                                    setBetAmount(0);
                                }
                            }}
                            className="max-w-[80px]"
                            placeholder="Amount"
                            aria-label="Bet amount in GHO"
                        />

                    </div>
                    <div className="flex gap-2 w-full">
                        <Button
                            variant="outline"
                            className="w-1/2 bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white border-green-600 shadow-sm hover:shadow-md transition-all font-medium"
                            disabled={isPlacingBet}
                            onClick={() => handlePlaceBet(true)}
                        >
                            YES ({betAmount} GHO)
                        </Button>
                        <Button
                            variant="outline"
                            className="w-1/2 bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-red-600 shadow-sm hover:shadow-md transition-all font-medium"
                            disabled={isPlacingBet}
                            onClick={() => handlePlaceBet(false)}
                        >
                            NO ({betAmount} GHO)
                        </Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
