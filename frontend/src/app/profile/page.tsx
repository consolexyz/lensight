"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { Login } from "@/components/login";
import { PredictionCard } from '@/components/prediction/prediction-card';
import { BetCard } from '@/components/prediction/bet-card';
import { PredictionWithUser, transformPrediction } from '@/lib/types';
import { Bet } from '@/types/prediction';
import { useAccount } from 'wagmi';

export default function ProfilePage() {
    const { data: user, loading: userLoading } = useAuthenticatedUser();
    const { address: wagmiAddress } = useAccount();
    const [activeTab, setActiveTab] = useState<string>("predictions");

    // If not logged in, show login form
    if (!userLoading && !user && !wagmiAddress) {
        return (
            <div className="max-w-md mx-auto py-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign in Required</CardTitle>
                        <CardDescription>Please connect your wallet to view your profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Login />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (userLoading) {
        return (
            <div className="max-w-3xl mx-auto py-6">
                <p>Loading profile...</p>
            </div>
        );
    }

    // Use the actual wallet address from Wagmi first, falling back to Lens user address if needed
    const userAddress = wagmiAddress
        ? wagmiAddress.toLowerCase()
        : (user?.address ? user.address.toLowerCase() : '');

    console.log('Profile page - Lens user address:', user?.address);
    console.log('Profile page - Wagmi wallet address:', wagmiAddress);
    console.log('Profile page - Using address:', userAddress);

    return (
        <div className="max-w-3xl mx-auto py-6">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>
                        View all your predictions and bets
                        {userAddress && <div className="mt-2 text-xs break-all">Connected wallet: {userAddress}</div>}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="predictions" value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-4">
                            <TabsTrigger value="predictions">My Predictions</TabsTrigger>
                            <TabsTrigger value="bets">My Bets</TabsTrigger>
                        </TabsList>
                        <TabsContent value="predictions">
                            {userAddress ? <UserPredictions userAddress={userAddress} /> : <p>User address not available</p>}
                        </TabsContent>
                        <TabsContent value="bets">
                            {userAddress ? <UserBets userAddress={userAddress} /> : <p>User address not available</p>}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

interface UserBetsProps {
    userAddress: string;
    initialBets?: any[];
}

function UserBets({ userAddress, initialBets }: UserBetsProps) {
    const [bets, setBets] = useState<any[]>(initialBets || []);
    const [isLoading, setIsLoading] = useState(!initialBets);

    useEffect(() => {
        // Always update state when initialBets changes
        if (initialBets) {
            setBets(initialBets);
            setIsLoading(false);
            return;
        }

        // Only fetch if initialBets is not provided
        async function fetchUserBets() {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/users/${userAddress}/bets`);

                if (!response.ok) {
                    throw new Error('Failed to fetch user bets');
                }

                const data = await response.json();
                setBets(data.bets);
            } catch (error) {
                console.error('Error fetching user bets:', error);
                setBets([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserBets();
    }, [userAddress, initialBets]); // Keep both dependencies

    if (isLoading) {
        return <p className="text-center py-4">Loading your bets...</p>;
    }

    if (bets.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                You haven't placed any bets yet
            </div>
        );
    }

    // Group bets by status for better organization
    const groupedBets = {
        active: bets.filter(bet =>
            bet.prediction.status === "OPEN" &&
            new Date(bet.prediction.expiresAt) > new Date()
        ),
        resolved: bets.filter(bet =>
            bet.prediction.status === "RESOLVED_TRUE" ||
            bet.prediction.status === "RESOLVED_FALSE"
        ),
        closed: bets.filter(bet =>
            bet.prediction.status === "CLOSED" ||
            (bet.prediction.status === "OPEN" && new Date(bet.prediction.expiresAt) < new Date())
        )
    };

    return (
        <div>
            {/* Import the BetCard component at the top of the file */}
            {groupedBets.active.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">Active Bets</h3>
                    <div className="space-y-4">
                        {groupedBets.active.map(bet => (
                            <BetCard key={bet.id} bet={bet} />
                        ))}
                    </div>
                </div>
            )}

            {groupedBets.resolved.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">Completed Bets</h3>
                    <div className="space-y-4">
                        {groupedBets.resolved.map(bet => (
                            <BetCard key={bet.id} bet={bet} />
                        ))}
                    </div>
                </div>
            )}

            {groupedBets.closed.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">Awaiting Results</h3>
                    <div className="space-y-4">
                        {groupedBets.closed.map(bet => (
                            <BetCard key={bet.id} bet={bet} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

interface UserPredictionsProps {
    userAddress: string;
    initialPredictions?: PredictionWithUser[];
}

function UserPredictions({ userAddress, initialPredictions }: UserPredictionsProps) {
    const [predictions, setPredictions] = useState<PredictionWithUser[]>(initialPredictions || []);
    const [isLoading, setIsLoading] = useState(!initialPredictions);

    useEffect(() => {
        if (initialPredictions) {
            setPredictions(initialPredictions);
            setIsLoading(false);
            return;
        }

        async function fetchUserPredictions() {
            setIsLoading(true);
            try {
                // Make sure we're using a normalized address everywhere
                const normalizedAddress = userAddress ? userAddress.toLowerCase() : '';

                console.log('Original address from props:', userAddress);
                console.log('Normalized address for fetching:', normalizedAddress);

                if (!normalizedAddress) {
                    console.error('No wallet address available');
                    return;
                }

                // Use normalized address for API request
                const response = await fetch(`/api/users/${normalizedAddress}/predictions`);

                if (!response.ok) {
                    throw new Error('Failed to fetch user predictions');
                }

                const data = await response.json();
                console.log('Predictions received:', data.predictions);
                setPredictions(data.predictions || []);
            } catch (error) {
                console.error('Error fetching user predictions:', error);
                setPredictions([]);
            } finally {
                setIsLoading(false);
            }
        }

        if (userAddress) {
            fetchUserPredictions();
        }
    }, [userAddress, initialPredictions]);

    if (isLoading) {
        return <p className="text-center py-4">Loading your predictions...</p>;
    } if (predictions.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <p>You haven't created any predictions yet with wallet address: <code className="text-xs break-all">{userAddress}</code></p>
                <div className="flex flex-col gap-2 items-center mt-4">
                    <Button asChild>
                        <Link href="/create">Create a Prediction</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // Group predictions by status
    const groupedPredictions = {
        active: predictions.filter(pred =>
            pred.status === "OPEN" &&
            new Date(pred.expiresAt) > new Date()
        ),
        expired: predictions.filter(pred =>
            pred.status === "OPEN" &&
            new Date(pred.expiresAt) <= new Date()
        ),
        closed: predictions.filter(pred => pred.status === "CLOSED"),
        resolved: predictions.filter(pred =>
            pred.status === "RESOLVED_TRUE" ||
            pred.status === "RESOLVED_FALSE"
        )
    };

    return (
        <div>
            {groupedPredictions.active.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">Active Predictions</h3>
                    <div className="space-y-4">
                        {groupedPredictions.active.map(prediction => (
                            <PredictionCard key={prediction.id} prediction={prediction} />
                        ))}
                    </div>
                </div>
            )}

            {groupedPredictions.expired.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">Expired Predictions</h3>
                    <div className="space-y-4">
                        {groupedPredictions.expired.map(prediction => (
                            <PredictionCard key={prediction.id} prediction={prediction} />
                        ))}
                    </div>
                </div>
            )}

            {groupedPredictions.closed.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">Closed Predictions</h3>
                    <div className="space-y-4">
                        {groupedPredictions.closed.map(prediction => (
                            <PredictionCard key={prediction.id} prediction={prediction} />
                        ))}
                    </div>
                </div>
            )}

            {groupedPredictions.resolved.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">Resolved Predictions</h3>
                    <div className="space-y-4">
                        {groupedPredictions.resolved.map(prediction => (
                            <PredictionCard key={prediction.id} prediction={prediction} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
