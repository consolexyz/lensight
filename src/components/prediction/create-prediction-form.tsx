"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePredictions } from "@/context/PredictionContext";
import { CreatePredictionData, PredictionCategory } from "@/types/prediction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function CreatePredictionForm() {
    const router = useRouter();
    const { createPrediction } = usePredictions();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<PredictionCategory>(PredictionCategory.CRYPTO);
    const [expiryDate, setExpiryDate] = useState<Date>(addDays(new Date(), 7));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content || content.trim().length < 10) {
            toast({
                title: "Error",
                description: "Prediction content must be at least 10 characters",
                variant: "destructive",
            });
            return;
        }

        if (!expiryDate) {
            toast({
                title: "Error",
                description: "Please select an expiry date",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsSubmitting(true);

            const predictionData: CreatePredictionData = {
                content: content.trim(),
                category,
                expiresAt: expiryDate.toISOString(),
            };

            const newPrediction = await createPrediction(predictionData);

            toast({
                title: "Success",
                description: "Your prediction has been created!",
            });

            // Redirect to home page or the prediction detail page
            router.push(`/prediction/${newPrediction.id}`);
        } catch (error) {
            console.error("Failed to create prediction:", error);
            toast({
                title: "Error",
                description: "Failed to create prediction. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Create a New Prediction</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">
                            What do you predict?
                        </label>
                        <Textarea
                            id="content"
                            placeholder="E.g., Bitcoin will surpass $100k by the end of 2024"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                            Be specific in your prediction to make it easier to verify later.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                            Category
                        </label>
                        <Select
                            value={category}
                            onValueChange={(value) => setCategory(value as PredictionCategory)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={PredictionCategory.CRYPTO}>Crypto</SelectItem>
                                <SelectItem value={PredictionCategory.SPORTS}>Sports</SelectItem>
                                <SelectItem value={PredictionCategory.SOCIAL}>Social</SelectItem>
                                <SelectItem value={PredictionCategory.OTHER}>Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="expiryDate" className="text-sm font-medium">
                            Expiry Date
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !expiryDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {expiryDate ? format(expiryDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={expiryDate}
                                    onSelect={(date) => date && setExpiryDate(date)}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                        <p className="text-xs text-muted-foreground">
                            When will this prediction be resolved?
                        </p>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Prediction"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
