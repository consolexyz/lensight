"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuthenticatedUser, useLogout } from "@lens-protocol/react";
import { ConnectKitButton } from "connectkit";
import { useDisconnect } from "wagmi";
import { useState } from "react";
import { LensSignIn } from "./accounts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDownIcon, LogOutIcon } from "lucide-react";

export function Login() {
  const [showLensSignIn, setShowLensSignIn] = useState(false);
  const { data: authenticatedUser } = useAuthenticatedUser();
  const { execute: logout } = useLogout();
  const { disconnect } = useDisconnect();

  // Handle disconnection (both Lens and wallet)
  const handleDisconnect = async () => {
    try {
      if (authenticatedUser) {
        await logout();
      }
      disconnect();
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  // Function to extract the best display name from the user object
  const getLensDisplayName = (user: any, fallback: string) => {
    // Check all possible properties where the username might be stored
    let displayName = fallback;

    // Log the user object to understand its structure
    console.log('Lens user object:', user);

    if (!user) return fallback;

    // Try all possible fields where a name could be stored
    if (user.handle) {
      displayName = user.handle;
    } else if (user.username?.localName) {
      displayName = user.username.localName;
    } else if (typeof user.username === 'string') {
      displayName = user.username;
    } else if (user.name) {
      displayName = user.name;
    } else if (user.id && user.id.includes('-')) {
      displayName = user.id.split('-')[0];
    }

    // Format lens handles without .lens suffix if needed
    if (displayName && !displayName.includes('.') && !displayName.startsWith('0x')) {
      displayName = `${displayName}.lens`;
    }

    return displayName;
  };

  // Function to get profile picture URL with fallbacks
  const getProfilePicture = (user: any) => {
    if (!user) return '';

    // Type-safe approach using optional chaining
    // @ts-ignore - We're safely checking for properties
    const picture = user.metadata?.picture || user.picture || '';
    return picture;
  };

  return (
    <div className="p-2 space-y-2 mb-2">
      <ConnectKitButton.Custom>
        {({ isConnected: isWalletConnected, show, truncatedAddress, ensName }) => {
          const connectKitDisplayName = ensName ?? truncatedAddress;

          if (!isWalletConnected) {
            // Not connected at all - show connect wallet button
            return (
              <Button onClick={show} className="w-full">
                Connect Wallet
              </Button>
            );
          }

          if (isWalletConnected && !authenticatedUser) {
            // Connected wallet but not authenticated with Lens
            // Show the initial modal automatically
            return (
              <>
                <Dialog open={true} onOpenChange={() => { }}>
                  <DialogContent className="max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Connect with Lens</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <Button
                        onClick={() => setShowLensSignIn(true)}
                        className="w-full"
                        size="lg"
                      >
                        Sign in with Lens
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={handleDisconnect}
                        className="text-destructive hover:text-destructive"
                      >
                        Disconnect Wallet
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <LensSignIn
                  open={showLensSignIn}
                  onOpenChange={setShowLensSignIn}
                  onDisconnect={handleDisconnect}
                />
              </>
            );
          }

          if (isWalletConnected && authenticatedUser) {
            // Fully authenticated with both wallet and Lens
            const displayName = getLensDisplayName(authenticatedUser, connectKitDisplayName);
            const avatarUrl = getProfilePicture(authenticatedUser);
            const avatarInitial = displayName ? displayName[0].toUpperCase() : 'U';

            return (
              <div className="w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={avatarUrl} alt={displayName} />
                          <AvatarFallback>{avatarInitial}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{displayName}</span>
                      </div>
                      <ChevronDownIcon className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[240px]">
                    <div className="p-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={avatarUrl} alt={displayName} />
                          <AvatarFallback>{avatarInitial}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">{displayName}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {connectKitDisplayName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive cursor-pointer"
                      onClick={handleDisconnect}
                    >
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      <span>Disconnect</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          }

          return <p className="text-xs text-muted-foreground">Checking status...</p>;
        }}
      </ConnectKitButton.Custom>
    </div>
  );
}
