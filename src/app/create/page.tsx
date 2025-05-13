"use client";

import { CreatePredictionForm } from "@/components/prediction/create-prediction-form";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { Button } from "@/components/ui/button";
import { Login } from "@/components/login";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreatePage() {
    const { data: user, loading } = useAuthenticatedUser();

    // If not logged in, show login form
    if (!loading && !user) {
        return (
            <div className="max-w-md mx-auto py-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign in Required</CardTitle>
                        <CardDescription>Please connect your wallet to create a prediction</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Login />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Create a Prediction</h1>
                <p className="text-muted-foreground">
                    Share your insights and predictions with the community
                </p>
            </div>

            <CreatePredictionForm />
        </div>
    );
}
