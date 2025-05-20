"use client";

import { useState } from "react";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LensUsernameBadge } from "./username-badge";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function LensPostTester() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastPostResult, setLastPostResult] = useState<any>(null);
  const { data: authenticatedUser } = useAuthenticatedUser();
  const { toast } = useToast();

  const handleCreatePost = async () => {
    if (!content.trim()) return;
    if (!authenticatedUser?.address) {
      toast({
        title: "Authentication Required",
        description: "Please connect your wallet to post",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Import dynamically to prevent issues during SSR
      const { createPostWithoutSigning } = await import("@/lib/lens/social");
      
      // Try to create a post without requiring signature
      const result = await createPostWithoutSigning(
        authenticatedUser.address,
        content,
        { testPost: "true" }
      );

      console.log("Post created:", result);
      setLastPostResult(result);
      
      // Show success message
      toast({
        title: "Post Created",
        description: result.lensStatus === "fallback-to-database"
          ? "Your post was saved to our database"
          : "Your post was published successfully to Lens Protocol",
      });
      
      // Clear input after success
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Post Failed",
        description: error instanceof Error ? (error as Error).message : "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Lens Protocol Tester
          <Badge variant="outline" className="text-xs">No Signing Required</Badge>
        </CardTitle>
        <CardDescription>
          Test posting to Lens Protocol without requiring message signing. 
          {authenticatedUser ? (
            <span className="block mt-1">Connected as: <LensUsernameBadge 
              localName={authenticatedUser.handle?.localName || authenticatedUser.address?.substring(0, 6)} 
              showFullHandle={true} 
            /></span>
          ) : (
            <span className="block mt-1 text-yellow-500">Please connect your wallet to test</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="resize-none"
          disabled={isSubmitting || !authenticatedUser}
        />

        {lastPostResult && (
          <div className="bg-muted/50 p-3 rounded-md text-sm">
            <div className="flex items-center gap-2 font-semibold mb-1">
              {lastPostResult.success ? (
                <CheckCircle2 size={16} className="text-green-500" />
              ) : (
                <AlertCircle size={16} className="text-amber-500" />
              )}
              Last Post Result:
            </div>
            <pre className="whitespace-pre-wrap text-xs">
              {JSON.stringify(lastPostResult, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCreatePost} 
          disabled={isSubmitting || !content.trim() || !authenticatedUser}
          className="w-full"
        >
          {isSubmitting ? "Creating Post..." : "Create Lens Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}
