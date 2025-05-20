"use client";

import { PredictionWithUser, PredictionStatus, BetWithUser } from "@/lib/types";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow, format } from "date-fns";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { usePrediction } from "@/lib/contexts/PredictionContext";
import { CommentSection } from "@/components/prediction/comment-section";
import { LikeButton } from "@/components/prediction/like-button";
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
    const { data: authenticatedUser } = useAuthenticatedUser();
    const {
        fetchPredictionById,
        selectedPrediction,
        isLoadingPrediction,
        placeBet,
        claimReward,
        fetchComments,
        addComment,
        toggleLike,
        isLikedByCurrentUser
    } = usePrediction();
    const [isPlacingBet, setIsPlacingBet] = useState(false);
    const [isClaimingReward, setIsClaimingReward] = useState(false);
    const [betAmount, setBetAmount] = useState(10);

    useEffect(() => {
        // Fetch prediction details and comments
        fetchPredictionById(predictionId);
        fetchComments(predictionId);
    }, [predictionId, fetchPredictionById, fetchComments]);

    if (isLoadingPrediction || !selectedPrediction) {
        return <div>Loading prediction details...</div>;
    }

    // Use selectedPrediction from context
    const prediction = selectedPrediction;

    const totalBets = prediction.totalBetsTrue + prediction.totalBetsFalse;
    const truePercentage = totalBets > 0 ? Math.round((prediction.totalBetsTrue / totalBets) * 100) : 50;
    const falsePercentage = totalBets > 0 ? Math.round((prediction.totalBetsFalse / totalBets) * 100) : 50;
    const createdAt = formatDistanceToNow(new Date(prediction.createdAt), { addSuffix: true });
    const expiresAt = formatDistanceToNow(new Date(prediction.expiresAt), { addSuffix: true });
    const formattedExpiresAt = format(new Date(prediction.expiresAt), "PPP");

    const handlePlaceBet = async (position: boolean) => {
        try {
            setIsPlacingBet(true);
            await placeBet(predictionId, betAmount, position);
        } catch (error) {
            console.error("Error in bet placement:", error);
        } finally {
            setIsPlacingBet(false);
        }
    };

    const handleAddComment = async (content: string) => {
        try {
            const success = await addComment(predictionId, content);
            if (success) {
                // Comment was added successfully
                await fetchComments(predictionId);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleToggleLike = async () => {
        try {
            const success = await toggleLike(predictionId);
            if (!success) {
                console.error("Failed to toggle like status");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleClaimReward = async () => {
        try {
            setIsClaimingReward(true);
            await claimReward(predictionId);
        } catch (error) {
            console.error("Error claiming reward:", error);
        } finally {
            setIsClaimingReward(false);
        }
    };

    const isPredictionClosed = prediction.status !== "OPEN";
    const isPredictionResolved = prediction.status === PredictionStatus.RESOLVED_TRUE ||
        prediction.status === PredictionStatus.RESOLVED_FALSE;

    return (
        <div className="space-y-6">
            <Card>
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
                                    {prediction.creator.displayName || prediction.creator.address.substring(0, 6) + "..."}
                                </div>
                                <div className="text-xs text-muted-foreground flex gap-2">
                                    <span>{createdAt}</span>
                                    <span className="uppercase text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                        {prediction.category}
                                    </span>
                                </div>
                            </div>
                        </div>                    <div>
                            <LikeButton
                                predictionId={predictionId}
                                initialCount={prediction.likesCount || 0}
                                isLiked={isLikedByCurrentUser(predictionId)}
                                onToggleLike={handleToggleLike}
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pb-3">
                    <p className="text-lg font-medium mb-4">{prediction.content}</p>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium mb-1">Current Prediction Results</h3>
                            <div className="bg-muted rounded-md p-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-sm bg-green-50 p-3 rounded-md border border-green-100">
                                        <div className="font-semibold text-green-600 mb-1">YES</div>
                                        <div>{prediction.bets.filter((bet: BetWithUser) => bet.position).length} bets</div>
                                    </div>
                                    <div className="text-sm bg-red-50 p-3 rounded-md border border-red-100">
                                        <div className="font-semibold text-red-600 mb-1">NO</div>
                                        <div>{prediction.bets.filter((bet: BetWithUser) => !bet.position).length} bets</div>
                                    </div>
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

                {isPredictionResolved && authenticatedUser && (
                    <CardFooter className="flex flex-col border-t pt-4">
                        <div className="w-full text-center">
                            <Button
                                onClick={handleClaimReward}
                                disabled={isClaimingReward}
                                variant="default"
                                className="bg-primary hover:bg-primary/90"
                            >
                                {isClaimingReward ? "Claiming..." : "Claim Your Reward"}
                            </Button>
                            <p className="text-xs text-muted-foreground mt-2">
                                If you bet on the correct outcome, you can claim your winnings
                            </p>
                        </div>
                    </CardFooter>
                )}

                {prediction.status === PredictionStatus.OPEN && (
                    <CardFooter className="flex flex-col border-t pt-4">
                        <h3 className="text-sm font-medium mb-3">Place Your Bet</h3>

                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-2">
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
                                    className="max-w-[100px]"
                                    placeholder="Amount"
                                    aria-label="Bet amount in GHO"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="w-1/2 bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white border-green-600 shadow-sm hover:shadow-md transition-all font-medium"
                                    disabled={isPlacingBet}
                                    onClick={() => handlePlaceBet(true)}
                                >
                                    {isPlacingBet ? "Placing Bet..." : `Yes (${betAmount} GHO)`}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-1/2 bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-red-600 shadow-sm hover:shadow-md transition-all font-medium"
                                    disabled={isPlacingBet}
                                    onClick={() => handlePlaceBet(false)}
                                >
                                    {isPlacingBet ? "Placing Bet..." : `No (${betAmount} GHO)`}
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                )}
            </Card>

            {/* Betting history card */}
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
                                {prediction.bets.map((bet: BetWithUser) => (
                                    <TableRow key={bet.id}>
                                        <TableCell className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={bet.user?.profileImageUrl || ''} />
                                                <AvatarFallback>
                                                    {bet.user?.displayName?.substring(0, 2) || bet.user?.address?.substring(0, 2) || 'XX'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">
                                                {bet.user?.displayName || (bet.user?.address && bet.user.address.substring(0, 6) + "...") || "Anonymous"}
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
                                        <TableCell>{bet.amount} GHO</TableCell>
                                        <TableCell>{format(new Date(bet.createdAt), "PP")}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Comments section card */}
            <Card>
                <CardHeader>
                    <h3 className="text-lg font-medium">Comments</h3>
                </CardHeader>
                <CardContent>
                    <CommentSection
                        predictionId={predictionId}
                        comments={prediction.comments || []}
                        onAddComment={handleAddComment}
                        isLoading={isLoadingPrediction}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
