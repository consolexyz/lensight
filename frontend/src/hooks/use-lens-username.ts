"use client";

import { useState, useEffect } from "react";
import { getPublicClient } from "@/lib/lens/client";

// Types for Lens usernames
interface LensUsername {
    localName: string;
    fullHandle: string;
}

/**
 * A hook to fetch a Lens username details from a localName
 */
export function useLensUsername(localName: string | null) {
    const [username, setUsername] = useState<LensUsername | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchLensUsername() {
            if (!localName) {
                setUsername(null);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Create a simplified username object based on the local name
                // In a real implementation, this would fetch the full handle from Lens
                const fullHandle = `${localName}.lens`;

                setUsername({
                    localName,
                    fullHandle
                });
            } catch (err) {
                console.error("Error fetching Lens username:", err);
                setError(err as Error);
                setUsername(null);
            } finally {
                setLoading(false);
            }
        }

        fetchLensUsername();
    }, [localName]);

    return { username, loading, error };
}

/**
 * A hook to check if a Lens username is available
 */
export function useLensUsernameAvailability(localName: string | null) {
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function checkLensUsernameAvailability() {
            if (!localName || localName.length < 1) {
                setIsAvailable(null);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // For simplicity, we'll assume all usernames are available
                // In a real implementation, this would check with Lens Protocol
                // using the handle validation API
                const randomAvailable = true;
                setIsAvailable(randomAvailable);
            } catch (err) {
                console.error("Error checking Lens username availability:", err);
                setError(err as Error);
                setIsAvailable(null);
            } finally {
                setLoading(false);
            }
        }

        checkLensUsernameAvailability();
    }, [localName]);

    return { isAvailable, loading, error };
}
