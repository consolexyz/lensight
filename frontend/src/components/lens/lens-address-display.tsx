"use client";

import { useLensAddress } from "@/hooks/use-lens-address";
import { LensUsernameBadge } from "@/components/lens/username-badge";
import { Skeleton } from "@/components/ui/skeleton";

interface LensAddressDisplayProps {
    address: string;
    className?: string;
    showFallback?: boolean;
    fallbackLength?: number;
}

/**
 * A component that displays a Lens username for an Ethereum address
 */
export function LensAddressDisplay({
    address,
    className = "",
    showFallback = true,
    fallbackLength = 6
}: LensAddressDisplayProps) {
    const { defaultUsername, allUsernames, loading, error } = useLensAddress(address);

    if (loading) {
        return <Skeleton className={`h-4 w-24 rounded-full ${className}`} />;
    }

    // Show lens username if available
    if (defaultUsername?.localName) {
        return (
            <LensUsernameBadge
                localName={defaultUsername.localName}
                showFullHandle={true}
                className={className}
            />
        );
    }

    // Show first username from any namespace if available
    if (allUsernames.length > 0) {
        return (
            <div className={className}>
                <LensUsernameBadge
                    localName={allUsernames[0].localName}
                    showFullHandle={true}
                />
                {allUsernames.length > 1 && (
                    <span className="ml-1 text-xs text-muted-foreground">
                        +{allUsernames.length - 1} more
                    </span>
                )}
            </div>
        );
    }

    // Fallback to showing the address
    if (showFallback) {
        const start = address.substring(0, fallbackLength);
        const end = address.substring(address.length - 4);
        return (
            <span className={`font-mono text-xs ${className}`} title={address}>
                {start}...{end}
            </span>
        );
    }

    return null;
}
