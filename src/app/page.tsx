import { PredictionFeed } from "@/components/prediction/prediction-feed";
import { getLensClient } from "@/lib/lens/client";
import { fetchAccount } from "@lens-protocol/client/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Fetches authenticated user account if logged in
 */
async function getAuthenticatedAccount() {
  const client = await getLensClient();

  if (!client.isSessionClient()) {
    return null;
  }

  const authenticatedUser = client.getAuthenticatedUser().unwrapOr(null);
  if (!authenticatedUser) {
    return null;
  }

  return fetchAccount(client, { address: authenticatedUser.address }).unwrapOr(null);
}

export default async function Home() {
  const account = await getAuthenticatedAccount();

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Prediction Feed</h1>
        <Button asChild>
          <Link href="/create">Create Prediction</Link>
        </Button>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Discover predictions from the community or create your own. Vote on what you think will happen!
        </p>
      </div>

      {/* Client component that fetches and displays predictions */}
      <PredictionFeed />
    </div>
  );
}
