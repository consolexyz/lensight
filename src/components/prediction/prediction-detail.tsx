"use client";

import { Prediction, PredictionStatus, Bet } from "@/types/prediction";
import { usePredictions } from "@/context/PredictionContext";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow, format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useAuthenticatedUser } from "@lens-protocol/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface PredictionDetailProps {
    predictionId: string;
}

export function PredictionDetail({ predictionId }: PredictionDetailProps) {
    const { getPredictionById, placeBet } = usePredictions();
    const { data: authenticatedUser } = useAuthenticatedUser();
    const { toast } = useToast();

    const [prediction, setPrediction] = useState<Prediction | undefined>();
    const [isPlacingBet, setIsPlacingBet] = useState(false);
    const [betAmount, setBetAmount] = useState(10);

    useEffect(() => {
        const fetchPrediction = () => {
            const predictionData = getPredictionById(predictionId);
            setPrediction(predictionData);
        };

        fetchPrediction();
    }, [predictionId, getPredictionById]);

    if (!prediction) {
        return <div>Loading prediction...</div>;
    }

    const totalBets = prediction.totalBetsTrue + prediction.totalBetsFalse;
    const truePercentage = totalBets > 0 ? Math.round((prediction.totalBetsTrue / totalBets) * 100) : 50;
    const falsePercentage = totalBets > 0 ? Math.round((prediction.totalBetsFalse / totalBets) * 100) : 50;
    const createdAt = formatDistanceToNow(new Date(prediction.createdAt), { addSuffix: true });
    const expiresAt = formatDistanceToNow(new Date(prediction.expiresAt), { addSuffix: true });
    const formattedExpiresAt = format(new Date(prediction.expiresAt), "PPP");

    const handlePlaceBet = async (position: boolean) => {
        if (!authenticatedUser) {
            toast({
                title: "Authentication Required",
                description: "Please connect your wallet to place a bet",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsPlacingBet(true);
            await placeBet(predictionId, betAmount, position);
            toast({
                title: "Bet Placed",
                description: `You bet ${betAmount} on ${position ? "YES" : "NO"}`,
            });
        } catch (error) {
            console.error("Error placing bet:", error);
            toast({
                title: "Error",
                description: "Failed to place bet. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsPlacingBet(false);
        }
    };

    const isPredictionClosed = prediction.status !== PredictionStatus.OPEN;

    return (
        <div className="space-y-6">
            <Card>
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
                    </div>
                </CardHeader>

                <CardContent className="pb-3">
                    <p className="text-lg font-medium mb-4">{prediction.content}</p>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium mb-1">Current Prediction Results</h3>
                            <div className="bg-muted rounded-md overflow-hidden">
                                <div className="flex h-6">
                                    <div
                                        className="bg-green-500 h-full transition-all duration-300"
                                        style={{ width: `${truePercentage}%` }}
                                    />
                                    <div
                                        className="bg-red-500 h-full transition-all duration-300"
                                        style={{ width: `${falsePercentage}%` }}
                                    />
                                </div>
                                <div className="flex justify-between px-3 py-1 text-sm font-medium">
                                    <span>YES: {truePercentage}% ({prediction.totalBetsTrue} tokens)</span>
                                    <span>NO: {falsePercentage}% ({prediction.totalBetsFalse} tokens)</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xs font-medium text-muted-foreground mb-1">Created</h3>
                                <p className="text-sm">{format(new Date(prediction.createdAt), "PPP")}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-medium text-muted-foreground mb-1">
                                    {isPredictionClosed ? "Expired" : "Expires"}
                                </h3>
                                <p className="text-sm">{formattedExpiresAt} ({expiresAt})</p>
                            </div>
                        </div>

                        {prediction.status === PredictionStatus.RESOLVED_TRUE && (
                            <div className="mt-2 text-sm font-medium bg-green-100 text-green-800 px-3 py-2 rounded">
                                This prediction was resolved as TRUE
                            </div>
                        )}

                        {prediction.status === PredictionStatus.RESOLVED_FALSE && (
                            <div className="mt-2 text-sm font-medium bg-red-100 text-red-800 px-3 py-2 rounded">
                                This prediction was resolved as FALSE
                            </div>
                        )}
                    </div>
                </CardContent>

                {prediction.status === PredictionStatus.OPEN && (
                    <CardFooter className="flex flex-col border-t pt-4">
                        <h3 className="text-sm font-medium mb-3">Place Your Bet</h3>

                        <div className="flex gap-2 w-full">
                            <Input
                                type="number"
                                min="1"
                                value={betAmount}
                                onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value)))}
                                className="max-w-[100px]"
                            />
                            <Button
                                variant="outline"
                                className="w-1/2 bg-green-50 hover:bg-green-100 border-green-200"
                                disabled={isPlacingBet}
                                onClick={() => handlePlaceBet(true)}
                            >
                                Yes
                            </Button>
                            <Button
                                variant="outline"
                                className="w-1/2 bg-red-50 hover:bg-red-100 border-red-200"
                                disabled={isPlacingBet}
                                onClick={() => handlePlaceBet(false)}
                            >
                                No
                            </Button>
                        </div>
                    </CardFooter>
                )}
            </Card>

            <Card>
                <CardHeader>
                    <h3 className="text-lg font-medium">Betting History</h3>
                </CardHeader>
                <CardContent>
                    {prediction.bets.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground">
                            No bets placed yet
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {prediction.bets.map((bet) => (
                                    <TableRow key={bet.id}>
                                        <TableCell className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={bet.user.profileImageUrl} />
                                                <AvatarFallback>
                                                    {bet.user.displayName?.substring(0, 2) || bet.user.address.substring(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">
                                                {bet.user.displayName || bet.user.address.substring(0, 6) + "..."}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${bet.position
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {bet.position ? "YES" : "NO"}
                                            </span>
                                        </TableCell>
                                        <TableCell>{bet.amount}</TableCell>
                                        <TableCell>{format(new Date(bet.createdAt), "PP")}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
