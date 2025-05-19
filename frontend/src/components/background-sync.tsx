"use client";

import { useEffect, useRef } from 'react';

// This component has been disabled to prevent update loops
// It doesn't run automatic syncing anymore
export function BackgroundSync() {
    useEffect(() => {
        // Log that background sync is disabled
        console.log('Background sync has been disabled to prevent rendering issues');

        // No sync calls are made to avoid potential infinite update cycles
    }, []);

    // This component doesn't render anything
    return null;
}
