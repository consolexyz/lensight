"use client";

import { useAddressUsername } from "@/hooks/use-address-username";
import { LensUsernameBadge } from "@/components/lens/username-badge";

interface AddressDisplayProps {
    address: string;
    className?: string;
    showFullAddress?: boolean;
}

/**
 * Component that displays an Ethereum address with Lens username if available
 */
export function AddressDisplay({
    address,
    className = "",
    showFullAddress = false
}: AddressDisplayProps) {
    const { username, fullHandle, displayName, loading } = useAddressUsername(address);

    // Show truncated or full address
    const formattedAddress = showFullAddress
        ? address
        : `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

    // If we have Lens username information
    if (username) {
        return (
            <div className={`flex flex-col ${className}`}>
                <LensUsernameBadge localName={username} showFullHandle={true} />
                {displayName && <span className="text-xs text-muted-foreground mt-0.5">{displayName}</span>}
            </div>
        );
    }

    // If we're loading
    if (loading) {
        return <span className={`${className} animate-pulse`}>Loading...</span>;
    }

    // Default to address only
    return (
        <span className={`font-mono text-xs ${className}`} title={address}>
            {formattedAddress}
        </span>
    );
}
