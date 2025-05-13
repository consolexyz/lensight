"use client";

import React, { useState } from "react";
import type { ReactElement } from "react";
import { Account } from "@lens-protocol/client";
import { useLogin, useAccountsAvailable } from "@lens-protocol/react";
import { useAccount, useWalletClient } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";

interface AccountSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAccount?: Account | null;
  onSuccess?: (account?: Account) => void;
  trigger?: React.ReactNode;
}

export function AccountSelector({
  open,
  onOpenChange,
  currentAccount = null,
  onSuccess,
  trigger,
}: AccountSelectorProps): ReactElement {
  const { data: walletClient } = useWalletClient();
  const { data: availableAccounts, loading: accountsLoading } = useAccountsAvailable({ managedBy: walletClient?.account.address });
  const { execute: authenticate, loading: authenticateLoading } = useLogin();
  const router = useRouter();
  const wallet = useAccount();

  const handleSelectAccount = async (account: Account) => {
    if (!walletClient || !wallet.address) return;
    try {
      const isOwner = wallet.address.toLowerCase() === account.owner.toLowerCase();
      const authRequest = isOwner ? {
        accountOwner: {
          account: account.address,
          app: process.env.NEXT_PUBLIC_APP_ADDRESS,
          owner: walletClient.account.address,
        }
      } : {
        accountManager: {
          account: account.address,
          app: process.env.NEXT_PUBLIC_APP_ADDRESS,
          manager: walletClient.account.address,
        }
      };

      await authenticate({
        ...authRequest,
        signMessage: async (message: string) => {
          return await walletClient.signMessage({ message });
        },
      });

      onOpenChange(false);

      const selectedAccount = availableAccounts?.items.find(acc =>
        acc.account.address === account.address
      )?.account;

      if (onSuccess) {
        onSuccess(selectedAccount);
      }

      router.refresh();
    } catch (error) {
      console.error("Lens authentication failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Connect with Lens</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] pr-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            {accountsLoading &&
              <div className="text-sm text-muted-foreground col-span-3 text-center">
                Loading accounts...
              </div>
            }
            {availableAccounts && availableAccounts.items.length === 0 && (
              <div className="col-span-3 flex flex-col gap-4 items-center py-4">
                <p className="text-sm text-muted-foreground text-center">
                  No Lens profiles found for this wallet.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://onboarding.lens.xyz", "_blank")}
                  size="lg"
                  className="w-full max-w-[200px]"
                >
                  Sign up for Lens
                </Button>
              </div>
            )}
            {availableAccounts && availableAccounts.items.length > 0 && availableAccounts.items.map((acc) => {
              const isCurrentAccount = currentAccount ? acc.account.address === currentAccount.address : false;

              return (
                <Button
                  key={acc.account.address}
                  variant="outline"
                  disabled={authenticateLoading || isCurrentAccount}
                  onClick={() => handleSelectAccount(acc.account)}
                  className="flex flex-col items-center h-auto py-3 px-2"
                >
                  <Avatar className="w-10 h-10 mb-2">
                    <AvatarImage src={acc.account.metadata?.picture} />
                    <AvatarFallback>
                      {acc.account.username?.localName?.charAt(0) || acc.account.address.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-center truncate w-full text-xs">
                    {acc.account.username?.localName || acc.account.address}
                    {isCurrentAccount &&
                      <span className="block text-xs text-muted-foreground">(current)</span>
                    }
                  </span>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface CreateLensProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateLensProfileModal({
  open,
  onOpenChange,
}: CreateLensProfileModalProps): ReactElement {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Lens Profile</DialogTitle>
        </DialogHeader>
        <div className="py-6 space-y-4">
          <div className="text-center space-y-2">
            <p>You don't have a Lens profile associated with this wallet.</p>
            <p className="text-sm text-muted-foreground">
              Create a profile to fully interact with the Lens ecosystem.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Benefits of having a Lens Profile:</h3>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Share content across the decentralized social network</li>
                <li>Own your data and social graph</li>
                <li>Connect with other web3 users</li>
                <li>Participate in various Lens-powered applications</li>
              </ul>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => window.open("https://onboarding.lens.xyz", "_blank")}
            >
              Create Your Profile
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              You'll be redirected to the official Lens onboarding page
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface LensSignInProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDisconnect: () => void;
}

export function LensSignIn({
  open,
  onOpenChange,
  onDisconnect
}: LensSignInProps): ReactElement {
  const [hasCheckedAccounts, setHasCheckedAccounts] = useState(false);
  const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const { data: walletClient } = useWalletClient();
  const { data: availableAccounts, loading: accountsLoading } = useAccountsAvailable({ managedBy: walletClient?.account.address });

  // Check for profiles when data is loaded
  React.useEffect(() => {
    if (!accountsLoading && availableAccounts && !hasCheckedAccounts) {
      setHasCheckedAccounts(true);

      if (availableAccounts.items.length === 0) {
        // No profiles - show create profile modal
        setShowCreateProfileModal(true);
      } else {
        // Has profiles - show account selector
        setShowAccountSelector(true);
      }
    }
  }, [accountsLoading, availableAccounts, hasCheckedAccounts]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect with Lens</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              onClick={() => {
                if (!accountsLoading && availableAccounts) {
                  if (availableAccounts.items.length === 0) {
                    setShowCreateProfileModal(true);
                  } else {
                    setShowAccountSelector(true);
                  }
                }
              }}
              className="w-full"
              size="lg"
              disabled={accountsLoading}
            >
              {accountsLoading ? "Checking profiles..." : "Sign in with Lens"}
            </Button>
            <Button
              variant="ghost"
              onClick={onDisconnect}
              className="text-destructive hover:text-destructive"
            >
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AccountSelector
        open={showAccountSelector}
        onOpenChange={setShowAccountSelector}
      />

      <CreateLensProfileModal
        open={showCreateProfileModal}
        onOpenChange={setShowCreateProfileModal}
      />
    </>
  );
}