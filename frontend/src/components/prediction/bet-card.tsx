"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePrediction } from "@/lib/contexts/PredictionContext";
import { useState } from "react";
import { LensAddressDisplay } from "@/components/lens/lens-address-display";

interface BetCardProps {
    bet: {
        id: string;
        amount: number;
        position: boolean;
        createdAt: string;
        prediction: {
            id: string;
            content: string;
            category: string;
            status: string;
            expiresAt: string;
            resolvedAt?: string;
            creator: {
                address: string;
                displayName?: string;
                profileImageUrl?: string;
            }
        }
    }
}

export function BetCard({ bet }: BetCardProps) {
    const { claimReward } = usePrediction();
    const [isClaiming, setIsClaiming] = useState(false);

    // Calculate if the user won the bet
    const hasUserWon =
        (bet.position && bet.prediction.status === "RESOLVED_TRUE") ||
        (!bet.position && bet.prediction.status === "RESOLVED_FALSE");

    // Calculate if the prediction is expired but not yet resolved
    const isExpired = new Date(bet.prediction.expiresAt) < new Date() &&
        !bet.prediction.status.startsWith("RESOLVED");

    // Get status badge info
    const getBadgeInfo = () => {
        switch (bet.prediction.status) {
            case "RESOLVED_TRUE":
                return {
                    text: bet.position ? "Won" : "Lost",
                    variant: bet.position ? "outline" : "destructive",
                };
            case "RESOLVED_FALSE":
                return {
                    text: bet.position ? "Lost" : "Won",
                    variant: bet.position ? "destructive" : "outline",
                };
            case "CLOSED":
                return { text: "Awaiting Results", variant: "warning" };
            default:
                return isExpired
                    ? { text: "Expired", variant: "outline" }
                    : { text: "Active", variant: "default" };
        }
    };

    const badgeInfo = getBadgeInfo();
    const createdAtRelative = formatDistanceToNow(new Date(bet.createdAt), { addSuffix: true });

    const handleClaimReward = async () => {
        try {
            setIsClaiming(true);
            await claimReward(bet.prediction.id);
        } catch (error) {
            console.error("Error claiming reward:", error);
        } finally {
            setIsClaiming(false);
        }
    };

    return (
        <Card className={cn(
            "hover:shadow-md transition-shadow",
            hasUserWon && "border-green-400 bg-green-50/30"
        )}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <Link href={`/prediction/${bet.prediction.id}`} className="hover:underline">
                        <h3 className="font-medium text-lg line-clamp-2">{bet.prediction.content}</h3>
                    </Link>
                    <Badge
                        variant={badgeInfo.variant as any}
                        className="ml-2 whitespace-nowrap"
                    >
                        {badgeInfo.text}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-2 pb-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant={bet.position ? "outline" : "destructive"}
                            className={bet.position ? "border-green-500 text-green-600" : ""}
                        >
                            {bet.position ? "YES" : "NO"}
                        </Badge>
                        <span className="font-medium">{bet.amount} GHO</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{createdAtRelative}</span>
                </div>

                {/* Add Claim Win button for winning bets */}
                {hasUserWon && (
                    <div className="mt-3 mb-3">
                        <Button
                            onClick={handleClaimReward}
                            disabled={isClaiming}
                            variant="default"
                            className="w-full bg-green-600 hover:bg-green-700"
                            size="sm"
                        >
                            {isClaiming ? "Claiming..." : "Claim Win"}
                        </Button>
                    </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t text-sm">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={bet.prediction.creator?.profileImageUrl || ''} />
                            <AvatarFallback>
                                {bet.prediction.creator?.displayName?.substring(0, 2) ||
                                    (bet.prediction.creator?.address ? bet.prediction.creator.address.substring(0, 2) : 'UN')}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                            {bet.prediction.creator?.displayName ||
                                (bet.prediction.creator?.address ?
                                    <LensAddressDisplay address={bet.prediction.creator.address} fallbackLength={4} /> :
                                    'Unknown'
                                )}
                        </span>
                    </div>
                    <Link
                        href={`/prediction/${bet.prediction.id}`}
                        className="text-primary hover:underline text-xs"
                    >
                        View details →
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
