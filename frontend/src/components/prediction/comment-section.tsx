import { useState, useMemo } from "react";
import { CommentWithUser } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Send } from "lucide-react";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { LensUsernameBadge } from "@/components/lens/username-badge";

interface CommentSectionProps {
    predictionId: string;
    comments: CommentWithUser[];
    onAddComment: (content: string) => Promise<void>;
    isLoading?: boolean;
}

export function CommentSection({
    predictionId,
    comments,
    onAddComment,
    isLoading = false
}: CommentSectionProps) {
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: authenticatedUser } = useAuthenticatedUser();

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        try {
            setIsSubmitting(true);
            await onAddComment(newComment.trim());
            setNewComment(""); // Clear input after successful submission
        } catch (error) {
            console.error("Failed to add comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
                <MessageSquare size={18} />
                Comments ({comments.length})
            </h3>

            {/* Add comment form */}
            {authenticatedUser ? (
                <div className="flex flex-col gap-2">
                    <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        className="resize-none focus-visible:ring-primary/70"
                    />
                    <div className="flex justify-between items-center w-full">                    <div className="text-xs text-muted-foreground">
                        {authenticatedUser?.address
                            ? authenticatedUser.address.substring(0, 6) + "..." + authenticatedUser.address.substring(authenticatedUser.address.length - 4)
                            : "Connected"
                        }
                    </div>
                        <Button
                            onClick={handleSubmitComment}
                            disabled={isSubmitting || !newComment.trim()}
                            className="flex items-center gap-2"
                            variant="default"
                            size="sm"
                        >
                            {isSubmitting ? "Posting to Lens..." : "Post Comment"}
                            <Send size={14} className={isSubmitting ? "animate-pulse" : ""} />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-3 bg-muted/50 rounded-md text-sm">
                    Connect your wallet to comment on this prediction
                </div>
            )}

            {/* Comments list */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-4 text-muted-foreground">
                        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2"></div>
                        Loading comments...
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                        <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    <div>
                        {comments.map((comment, index) => (
                            <div
                                key={comment.id}
                                className="flex gap-3 rounded-lg p-3 mb-3 bg-muted/50 hover:bg-muted/70 transition-colors"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.user.profileImageUrl || undefined} />
                                    <AvatarFallback>
                                        {comment.user.displayName?.substring(0, 2) || comment.user.address.substring(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div className="font-medium">
                                            {comment.user.displayName?.startsWith('@') ? (
                                                <LensUsernameBadge
                                                    localName={comment.user.displayName.replace('@', '').split('.')[0]}
                                                    showFullHandle={true}
                                                />
                                            ) : comment.user.displayName || (
                                                <span title={comment.user.address}>
                                                    {comment.user.address.substring(0, 6) + "..."}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                        </div>
                                    </div>
                                    <div className="mt-1 text-sm">
                                        {comment.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
