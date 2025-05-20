import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthenticatedUser } from "@lens-protocol/react";

interface LikeButtonProps {
    predictionId: string;
    initialCount: number;
    isLiked: boolean;
    onToggleLike: () => Promise<void>;
    size?: "sm" | "md" | "lg";
}

export function LikeButton({
    predictionId,
    initialCount,
    isLiked,
    onToggleLike,
    size = "md"
}: LikeButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(initialCount);
    const [liked, setLiked] = useState(isLiked);
    const { data: authenticatedUser } = useAuthenticatedUser();

    const handleLike = async () => {
        if (!authenticatedUser) return;

        try {
            setIsLoading(true);

            // Optimistically update UI
            setLiked(!liked);
            setCount(prev => liked ? prev - 1 : prev + 1);

            await onToggleLike();
        } catch (error) {
            // Revert on error
            console.error("Error toggling like:", error);
            setLiked(liked);
            setCount(initialCount);
        } finally {
            setIsLoading(false);
        }
    };

    const sizeClasses = {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base"
    };

    return (
        <Button
            variant="ghost"
            className={cn(
                sizeClasses[size],
                "flex items-center gap-1",
                liked ? "text-red-500" : "text-muted-foreground"
            )}
            onClick={handleLike}
            disabled={isLoading || !authenticatedUser}
        >
            <Heart
                size={size === "sm" ? 14 : size === "md" ? 16 : 18}
                className={cn(
                    "transition-all",
                    liked && "fill-red-500"
                )}
            />
            {count > 0 && <span>{count}</span>}
        </Button>
    );
}
