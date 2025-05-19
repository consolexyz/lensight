"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface SyncBetsProps {
    userAddress: string;
    onSyncComplete?: () => void;
}

/**
 * This component has been simplified to avoid causing rendering issues
 */
export function SyncBets({ userAddress, onSyncComplete }: SyncBetsProps) {
    const [isSyncing, setIsSyncing] = useState(false);
    const { toast } = useToast();

    const handleSyncBets = async () => {
        try {
            setIsSyncing(true);

            // Simulate a sync operation
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast({
                title: "Feature Disabled",
                description: "The sync feature is temporarily unavailable while we perform maintenance.",
            });

            // Notify parent component
            if (onSyncComplete) {
                onSyncComplete();
            }
        } catch (error) {
            console.error("Failed to sync bets:", error);
            toast({
                title: "Sync Failed",
                description: "The sync feature is temporarily unavailable.",
                variant: "destructive",
            });
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleSyncBets}
            disabled={isSyncing}
        >
            {isSyncing ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                </>
            ) : (
                "Sync Blockchain Data"
            )}
        </Button>
    );
}
