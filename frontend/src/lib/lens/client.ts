import { mainnet, PublicClient, staging, testnet } from "@lens-protocol/client";
import { clientCookieStorage, cookieStorage } from "./storage";
import { env } from "process";

const isServer = typeof window === "undefined";

const publicClient = PublicClient.create({
  environment: mainnet, // Always use mainnet
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

/**
 * Get the default Lens username for an account by its address
 * Based on Lens Protocol V3 documentation
 * 
 * @param address The EVM address of the account
 * @returns The default username object or null if not found
 */
export const getDefaultUsernameByAddress = async (address: string) => {
  if (!address) return null;

  try {
    // Dynamically import to prevent SSR issues
    const { fetchAccount } = await import("@lens-protocol/client/actions");

    const result = await fetchAccount(publicClient, {
      address: address,
    });

    if (result.isOk()) {
      const account = result.value;
      if (account && account.username) {
        return {
          fullValue: account.username.value, // e.g., "lens/stani"
          localName: account.username.localName, // e.g., "stani"
          namespace: account.username.namespace,
          displayName: account.metadata?.name || null,
          picture: account.metadata?.picture || null
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching default username for address:', error);
    return null;
  }
};

/**
 * Get all usernames linked to an account by its address
 * Based on Lens Protocol V3 documentation
 * 
 * @param address The EVM address of the account
 * @returns Array of username objects
 */
export const getAllUsernamesByAddress = async (address: string) => {
  if (!address) return [];

  try {
    // Dynamically import to prevent SSR issues
    const { fetchUsernames } = await import("@lens-protocol/client/actions");

    const result = await fetchUsernames(publicClient, {
      filter: {
        linkedTo: address,
      },
    });

    if (result.isOk()) {
      const { items } = result.value;
      if (items.length > 0) {
        return items.map(username => ({
          id: username.id,
          fullValue: username.value, // e.g., "lens/stani"
          localName: username.localName, // e.g., "stani"
          namespace: username.namespace,
          linkedTo: username.linkedTo,
          ownedBy: username.ownedBy
        }));
      }
    }

    return [];
  } catch (error) {
    console.error('Error fetching all usernames for address:', error);
    return [];
  }
};
