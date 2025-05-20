"use client";

import { getPublicClient } from "@/lib/lens/client";
import { LensProvider } from "@lens-protocol/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { JSX } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { ThemeProvider } from "next-themes";
import { PredictionProvider } from "@/lib/contexts/PredictionContext";
import { lensChainMainnet } from "@/lib/contracts/chains";

const mainnetChainConfig = {
  id: 232,
  name: 'Lens Chain',
  network: 'lenschain-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'GHO',
    symbol: 'GHO',
  },
  rpcUrls: {
    default: { http: ['https://rpc.lens.xyz'] },
    public: { http: ['https://rpc.lens.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Lens Chain Explorer', url: 'https://explorer.lens.xyz' },
  },
  contracts: {},
};

const wagmiConfig = createConfig(
  getDefaultConfig({
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    chains: [mainnetChainConfig],
    transports: {
      [mainnetChainConfig.id]: http(),
    },
    enableFamily: true,
    appName: "Lens App",
    appDescription: "Future of decentralized social",
    appUrl: "https://totally.real.com",
    appIcon: "https://totally.real.com/logo.png"
  }),
);

export const Providers = ({ children }: { children: JSX.Element }) => {
  const queryClient = new QueryClient();
  const publicClient = getPublicClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            <LensProvider client={publicClient}>
              <PredictionProvider>
                {children}
              </PredictionProvider>
            </LensProvider>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
