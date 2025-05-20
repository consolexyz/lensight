"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LensUsernameBadgeProps {
    localName: string;
    showFullHandle?: boolean;
    className?: string;
}

/**
 * A component that displays a Lens username as a badge
 */
export function LensUsernameBadge({
    localName,
    showFullHandle = true,
    className = ''
}: LensUsernameBadgeProps) {
    // Simplified version without the hook
    const displayValue = showFullHandle ? `${localName}.lens` : localName;

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary ${className}`}>
            @{displayValue}
        </span>
    );
}

interface LensUsernameCheckProps {
    localName: string;
    onAvailabilityChange?: (isAvailable: boolean) => void;
}

/**
 * A component that checks and displays if a Lens username is available
 * Simplified to always show as available since we're removing Lens username functionality
 */
export function LensUsernameCheck({ localName, onAvailabilityChange }: LensUsernameCheckProps) {
    // Simplified version that assumes usernames are available
    React.useEffect(() => {
        if (localName && onAvailabilityChange) {
            onAvailabilityChange(true);
        }
    }, [localName, onAvailabilityChange]);

    if (!localName) {
        return null;
    }

    return (
        <span className="text-xs text-green-500">
            Username is available
        </span>
    );
}
