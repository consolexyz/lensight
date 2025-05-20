import { mainnet, PublicClient, staging, testnet } from "@lens-protocol/client";
import { clientCookieStorage, cookieStorage } from "./storage";
import { env } from "process";

const isServer = typeof window === "undefined";

const publicClient = PublicClient.create({
  environment: env.NEXT_PUBLIC_ENVIRONMENT === "development" ? testnet : mainnet,
  origin: "https://totally.real.com",
  storage: isServer ? cookieStorage : clientCookieStorage,
});

export const getPublicClient = () => {
  return publicClient;
};

export const getBuilderClient = async (address: string, signMessage: (message: string) => Promise<string>) => {
  if (!address) return null;

  const authenticated = await publicClient.login({
    builder: {
      address: address,
    },
    signMessage,
  });

  if (authenticated.isErr()) {
    throw authenticated.error;
  }

  return authenticated.value;
};

export const getLensClient = async () => {
  const resumed = await publicClient.resumeSession();
  if (resumed.isErr()) {
    return publicClient;
  }

  return resumed.value;
};

/**
 * Fetch a username from Lens Protocol by localName
 * 
 * @param localName The local part of the username (before .lens)
 * @param namespace Optional namespace for custom namespaces
 * @returns A Result with the username object or an error
 */
export const fetchLensUsername = async (localName: string, namespace?: string) => {
  try {
    // Dynamically import to prevent SSR issues
    const { fetchUsername } = await import("@lens-protocol/client/actions");

    const result = await fetchUsername(publicClient, {
      username: {
        localName,
        // If namespace is provided, use it
        ...(namespace && { namespace })
      },
    });

    return result;
  } catch (error) {
    console.error('Error fetching Lens username:', error);
    throw error;
  }
};

/**
 * Fetch a username from Lens Protocol by ID
 * 
 * @param id The username ID
 * @returns A Result with the username object or an error
 */
export const fetchLensUsernameById = async (id: string) => {
  try {
    // Dynamically import to prevent SSR issues
    const { fetchUsername } = await import("@lens-protocol/client/actions");

    const result = await fetchUsername(publicClient, {
      id,
    });

    return result;
  } catch (error) {
    console.error('Error fetching Lens username by ID:', error);
    throw error;
  }
};
