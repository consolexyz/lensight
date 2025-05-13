"use client";

import { PredictionFeed } from "@/components/prediction/prediction-feed";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Login } from "@/components/login";
import { usePredictions } from "@/context/PredictionContext";
import { useEffect, useState } from "react";
import { Prediction } from "@/types/prediction";
import Link from "next/link";

export default function ProfilePage() {
    const { data: user, loading: userLoading } = useAuthenticatedUser();
    const { getUserPredictions } = usePredictions();
    const [userPredictions, setUserPredictions] = useState<Prediction[]>([]);

    useEffect(() => {
        if (user) {
            const predictions = getUserPredictions(user.address);
            setUserPredictions(predictions);
        }
    }, [user, getUserPredictions]);

    // If not logged in, show login form
    if (!userLoading && !user) {
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

    return (
        <div className="max-w-3xl mx-auto py-6">
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user?.picture?.actual?.url || undefined} />
                            <AvatarFallback>
                                {user?.name?.substring(0, 2) || user?.address.substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{user?.name || user?.address.substring(0, 10) + '...'}</CardTitle>
                            <CardDescription>Lens Profile</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold">{userPredictions.length}</p>
                            <p className="text-muted-foreground text-sm">Predictions</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">0</p>
                            <p className="text-muted-foreground text-sm">Followers</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">0</p>
                            <p className="text-muted-foreground text-sm">Following</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/create">Create New Prediction</Link>
                    </Button>
                </CardFooter>
            </Card>

            <Tabs defaultValue="predictions" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="predictions">My Predictions</TabsTrigger>
                    <TabsTrigger value="bets">My Bets</TabsTrigger>
                </TabsList>

                <TabsContent value="predictions">
                    <PredictionFeed
                        initialPredictions={userPredictions}
                        showFilters={false}
                        emptyMessage="You haven't made any predictions yet"
                    />
                </TabsContent>

                <TabsContent value="bets">
                    <div className="text-center py-8 text-muted-foreground">
                        Your betting history will appear here
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
