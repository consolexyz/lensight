import { PredictionFeed } from "@/components/prediction/prediction-feed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExplorePage() {
    return (
        <div className="max-w-3xl mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Explore Predictions</h1>
                <p className="text-muted-foreground">
                    Discover trending and interesting predictions from the community
                </p>
            </div>

            <Tabs defaultValue="trending" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="latest">Latest</TabsTrigger>
                    <TabsTrigger value="closing-soon">Closing Soon</TabsTrigger>
                </TabsList>

                <TabsContent value="trending">
                    <PredictionFeed />
                </TabsContent>

                <TabsContent value="latest">
                    <PredictionFeed />
                </TabsContent>

                <TabsContent value="closing-soon">
                    <PredictionFeed />
                </TabsContent>
            </Tabs>
        </div>
    );
}
