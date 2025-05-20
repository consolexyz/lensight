"use client";

import { useState, useEffect } from "react";
import { getDefaultUsernameByAddress, getAllUsernamesByAddress } from "@/lib/lens/client";

interface AddressUsernameResult {
    defaultUsername: {
        fullValue: string | null;
        localName: string | null;
        namespace: string | null;
        displayName: string | null;
    } | null;
    allUsernames: Array<{
        id: string;
        fullValue: string;
        localName: string;
        namespace: string;
    }>;
    loading: boolean;
    error: Error | null;
}

/**
 * A hook to fetch Lens username information for a wallet address
 * 
 * @param address The Ethereum address to query
 * @returns The default username, all usernames, loading state, and any error
 */
export function useLensAddress(address: string | null): AddressUsernameResult {
    const [result, setResult] = useState<AddressUsernameResult>({
        defaultUsername: null,
        allUsernames: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        if (!address) {
            return;
        }

        let mounted = true;
        const fetchUsernames = async () => {
            try {
                setResult(prev => ({ ...prev, loading: true, error: null }));

                // Fetch the default username
                const defaultUsername = await getDefaultUsernameByAddress(address);

                // Fetch all usernames
                const allUsernames = await getAllUsernamesByAddress(address);

                if (mounted) {
                    setResult({
                        defaultUsername,
                        allUsernames,
                        loading: false,
                        error: null
                    });
                }
            } catch (error) {
                console.error("Error fetching usernames for address:", error);
                if (mounted) {
                    setResult({
                        defaultUsername: null,
                        allUsernames: [],
                        loading: false,
                        error: error instanceof Error ? error : new Error(String(error))
                    });
                }
            }
        };

        fetchUsernames();

        return () => {
            mounted = false;
        };
    }, [address]);

    return result;
}
