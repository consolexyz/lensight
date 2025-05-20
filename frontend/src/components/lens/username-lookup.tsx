"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchLensUsername } from '@/lib/lens/client';
import { LensUsernameBadge, LensUsernameCheck } from './username-badge';

/**
 * Example component that demonstrates looking up Lens usernames
 */
export function LensUsernameLookup() {
    const [localName, setLocalName] = useState('');
    const [lookupResult, setLookupResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLookup = async () => {
        if (!localName) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await fetchLensUsername(localName);

            if (result.isErr()) {
                setError(`Username not found: ${result.error.message}`);
                setLookupResult(null);
            } else {
                setLookupResult(result.value);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to lookup username');
            setLookupResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Lens Username Lookup</CardTitle>
                <CardDescription>Search for a Lens username</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <Input
                        value={localName}
                        onChange={(e) => setLocalName(e.target.value)}
                        placeholder="Enter username (without .lens)"
                        className="flex-1"
                    />
                    <Button onClick={handleLookup} disabled={isLoading || !localName}>
                        {isLoading ? 'Searching...' : 'Search'}
                    </Button>
                </div>

                {localName && <LensUsernameCheck localName={localName} />}

                {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                )}

                {lookupResult && (
                    <div className="mt-4 p-4 border rounded-md">
                        <p className="text-sm font-medium">Username Found</p>
                        <div className="mt-2 space-y-1">
                            <div>
                                <span className="text-xs text-muted-foreground">Handle:</span>
                                <LensUsernameBadge localName={lookupResult.localName} />
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground">ID:</span>
                                <span className="text-sm ml-1">{lookupResult.id}</span>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground">Owner:</span>
                                <span className="text-sm ml-1 font-mono">{lookupResult.owner?.substring(0, 10)}...</span>
                            </div>
                            {lookupResult.linkedTo && (
                                <div>
                                    <span className="text-xs text-muted-foreground">Linked To:</span>
                                    <span className="text-sm ml-1 font-mono">{lookupResult.linkedTo.substring(0, 10)}...</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between text-xs text-muted-foreground">
                <p>Powered by Lens Protocol</p>
            </CardFooter>
        </Card>
    );
}
