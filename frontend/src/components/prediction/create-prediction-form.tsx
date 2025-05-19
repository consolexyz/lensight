"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreatePredictionData, PredictionCategory, PredictionStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePrediction } from "@/lib/contexts/PredictionContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addDays, format } from "date-fns";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parseEther, createPublicClient, http, createWalletClient, getContract, custom } from 'viem';
import { lensChainTestnet } from "@/lib/contracts/chains";
import { v4 as uuid } from "uuid";
import PredictionMarketFactoryContract from "@/lib/contracts/abis/PredictionMarketFactory.json";

const PREDICTION_MARKET_FACTORY_ADDRESS = "0x25532FC37C702cd332e3EC781F32c5a8CB01e300";
const PREDICTION_MARKET_FACTORY_ABI = PredictionMarketFactoryContract;

export function CreatePredictionForm() {
    const router = useRouter();
    const { toast } = useToast();
    const { createPrediction } = usePrediction();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [transactionState, setTransactionState] = useState<'idle' | 'awaiting-wallet' | 'pending' | 'success' | 'error'>('idle');
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<PredictionCategory>(PredictionCategory.CRYPTO);
    const [expiryDate, setExpiryDate] = useState<Date>(addDays(new Date(), 7));
    const [expiryType, setExpiryType] = useState<'date' | 'hours'>('date');
    const [expiryHours, setExpiryHours] = useState<number>(24); // Default 24 hours
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 7));
    const [targetPrice, setTargetPrice] = useState<string>("");
    const [comparisonOperator, setComparisonOperator] = useState<string>(">"); // Default to "Above"
    const [tokenSymbol, setTokenSymbol] = useState<string>("BTC");
    const [walletError, setWalletError] = useState<string | null>(null);

    // No network switching functionality

    // Function to update expiry date based on type and input
    const updateExpiryDate = () => {
        if (expiryType === 'date' && selectedDate) {
            setExpiryDate(selectedDate);
        } else if (expiryType === 'hours') {
            const now = new Date();
            const newDate = new Date(now.getTime() + (expiryHours * 60 * 60 * 1000));
            setExpiryDate(newDate);
        }
    };

    // Initialize expiryDate when component mounts or when inputs change
    useEffect(() => {
        updateExpiryDate();
    }, [expiryType, expiryHours, selectedDate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content || content.trim().length < 10) {
            toast({
                title: "Error",
                description: "Prediction content must be at least 10 characters",
                variant: "destructive",
                duration: 5000,
            });
            return;
        }

        if (!expiryDate) {
            toast({
                title: "Error",
                description: "Please set a valid expiry time",
                variant: "destructive",
                duration: 5000,
            });
            return;
        }

        if (expiryType === 'hours' && (!expiryHours || expiryHours <= 0)) {
            toast({
                title: "Error",
                description: "Please enter a valid number of hours",
                variant: "destructive",
                duration: 5000,
            });
            return;
        }

        if (expiryType === 'date' && !selectedDate) {
            toast({
                title: "Error",
                description: "Please select an expiry date",
                variant: "destructive",
                duration: 5000,
            });
            return;
        }

        // Make sure the expiry date is in the future
        if (expiryDate <= new Date()) {
            toast({
                title: "Error",
                description: "Expiry time must be in the future",
                variant: "destructive",
                duration: 5000,
            });
            return;
        }

        // For price-based predictions, validate the target price
        if (category === PredictionCategory.CRYPTO && (!targetPrice || isNaN(Number(targetPrice)))) {
            toast({
                title: "Error",
                description: "Please enter a valid target price for crypto prediction",
                variant: "destructive",
                duration: 5000,
            });
            return;
        }

        try {
            setIsSubmitting(true);
            setTransactionState('awaiting-wallet');

            // Check if wallet is available
            if (!window.ethereum) {
                setWalletError("Please install MetaMask or another Web3 wallet to create predictions");
                setTransactionState('error');
                return;
            }

            // Convert expiresAt to Unix timestamp (seconds)
            const expiryTime = Math.floor(expiryDate.getTime() / 1000);
            const targetPriceValue = targetPrice ? parseEther(targetPrice).toString() : "0";

            // Create public client for reading from the blockchain
            const publicClient = createPublicClient({
                chain: lensChainTestnet,
                transport: http()
            });

            // Using injected provider (MetaMask)
            const walletClient = createWalletClient({
                chain: lensChainTestnet,
                transport: custom(window.ethereum)
            });

            // Get connected accounts
            const [address] = await walletClient.requestAddresses();

            console.log("Connected with address:", address);

            toast({
                title: "Waiting for wallet",
                description: "Please confirm the transaction in your wallet",
                duration: 8000,
            });

            setTransactionState('pending');

            console.log("Creating market with params:", {
                question: content.trim(),
                expiryTime,
                targetPrice: targetPriceValue,
                comparisonOperator,
                category,
            });

            // Create market using writeContract instead of contract instance
            const hash = await walletClient.writeContract({
                address: PREDICTION_MARKET_FACTORY_ADDRESS,
                abi: PREDICTION_MARKET_FACTORY_ABI,
                functionName: 'createMarket',
                args: [
                    content.trim(),
                    BigInt(expiryTime),
                    "AUTO", // Always use AUTO resolution source for all predictions
                    BigInt(targetPriceValue),
                    comparisonOperator,
                    category
                ],
                account: address
            });

            console.log("Transaction submitted with hash:", hash);

            // Wait for the transaction to be mined
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            console.log("Transaction confirmed in block:", receipt.blockNumber);

            // Get the created market address from the MarketCreated event
            const logs = await publicClient.getLogs({
                address: PREDICTION_MARKET_FACTORY_ADDRESS,
                event: {
                    type: 'event',
                    name: 'MarketCreated',
                    inputs: [
                        { type: 'address', name: 'market', indexed: true },
                        { type: 'address', name: 'creator', indexed: true },
                        { type: 'string', name: 'question' }
                    ]
                },
                fromBlock: receipt.blockNumber,
                toBlock: receipt.blockNumber
            });

            const marketAddress = logs[0]?.args?.market;

            // Create prediction using context
            const predictionData = {
                content: content.trim(),
                category: category,
                creatorAddress: address.toLowerCase(), // Normalize address to lowercase
                expiresAt: expiryDate.toISOString(),
                contractAddress: marketAddress,
                targetPrice: targetPrice || undefined,
                comparisonOperator: comparisonOperator || undefined,
                tokenSymbol: category === PredictionCategory.CRYPTO ? tokenSymbol : undefined,
            };

            const newPrediction = await createPrediction(predictionData);

            if (!newPrediction) {
                throw new Error('Failed to create prediction in database');
            }

            setTransactionState('success');
            toast({
                title: "Success",
                description: "Your prediction has been created on the blockchain!",
                duration: 5000,
            });

            // Redirect to home page or the prediction detail page
            router.push(`/prediction/${newPrediction.id}`);

        } catch (error) {
            console.error("Failed to create prediction:", error);
            setTransactionState('error');

            // Handle common error types
            let errorMessage = "Failed to create prediction";
            if (error instanceof Error) {
                if (error.message.includes("user rejected")) {
                    errorMessage = "You rejected the transaction in your wallet";
                } else if (error.message.includes("insufficient funds")) {
                    errorMessage = "Insufficient funds in your wallet to complete this transaction";
                } else if (error.message.includes("nonce")) {
                    errorMessage = "Transaction nonce error. Please try refreshing the page";
                } else {
                    errorMessage = error.message;
                }
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
                duration: 5000,
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
                    {walletError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                {walletError}
                            </AlertDescription>
                        </Alert>
                    )}

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

                    {category === PredictionCategory.CRYPTO && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="tokenSymbol" className="text-sm font-medium">
                                    Select Token
                                </label>
                                <Select
                                    value={tokenSymbol}
                                    onValueChange={(value) => setTokenSymbol(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select token" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                                        <SelectItem value="SOL">Solana (SOL)</SelectItem>
                                        <SelectItem value="AVAX">Avalanche (AVAX)</SelectItem>
                                        <SelectItem value="MATIC">Polygon (MATIC)</SelectItem>
                                        <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                                        <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                                        <SelectItem value="DOT">Polkadot (DOT)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    Select the cryptocurrency you want to predict
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="targetPrice" className="text-sm font-medium">
                                    Target Price (in USD)
                                </label>
                                <Input
                                    id="targetPrice"
                                    type="number"
                                    placeholder="e.g., 5000"
                                    value={targetPrice}
                                    onChange={(e) => setTargetPrice(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    The price threshold for your prediction
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="comparisonOperator" className="text-sm font-medium">
                                    Comparison
                                </label>
                                <Select
                                    value={comparisonOperator}
                                    onValueChange={(value) => setComparisonOperator(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select comparison" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value=">">Above</SelectItem>
                                        <SelectItem value="<">Below</SelectItem>
                                        <SelectItem value="==">Exactly</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    Will the price be above, below, or exactly your target?
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="expiryDate" className="text-sm font-medium">
                            Market Expiry
                        </label>

                        <Select
                            value={expiryType}
                            onValueChange={(value: 'date' | 'hours') => {
                                setExpiryType(value);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select expiry type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">Select specific date</SelectItem>
                                <SelectItem value="hours">Set hours from now</SelectItem>
                            </SelectContent>
                        </Select>

                        {expiryType === 'hours' ? (
                            <div className="mt-2">
                                <label htmlFor="expiryHours" className="text-sm font-medium block mb-1">
                                    Hours from now
                                </label>
                                <Input
                                    id="expiryHours"
                                    type="number"
                                    min="1"
                                    value={expiryHours}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (!isNaN(value) && value > 0) {
                                            setExpiryHours(value);
                                        }
                                    }}
                                    className="w-full"
                                />
                            </div>
                        ) : (
                            <div className="mt-2">
                                <label htmlFor="selectDate" className="text-sm font-medium block mb-1">
                                    Select Date
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="selectDate"
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !selectedDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={setSelectedDate}
                                            initialFocus
                                            disabled={(date) => date < new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}

                        <div className="flex items-center gap-2 mt-2 p-2 bg-muted/30 rounded">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm">
                                Expires on: <strong>{expiryDate ? format(expiryDate, "PPP 'at' p") : "Date not set"}</strong>
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            When will this prediction be resolved?
                        </p>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {transactionState === 'idle' && "Create Prediction"}
                        {transactionState === 'awaiting-wallet' && "Waiting for wallet..."}
                        {transactionState === 'pending' && "Creating on blockchain..."}
                        {transactionState === 'success' && "Created successfully!"}
                        {transactionState === 'error' && "Try again"}
                    </Button>

                    {transactionState === 'pending' && (
                        <p className="mt-2 text-sm text-center text-muted-foreground">
                            Your prediction is being created on the blockchain. This may take a minute.
                        </p>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}
