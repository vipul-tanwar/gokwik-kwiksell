import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecommendationModule from "@/components/recommendation-module"
import ControlModule from "@/components/control-module"
import ActionModule from "@/components/action-module"
import InsightsModule from "@/components/insights-module"
import { KwikEngageHeader } from "@/components/kwik-engage-header"

export default function SmartCrossSellPage() {
  return (
    <div className="min-h-screen bg-white">
      <KwikEngageHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Smart Cross-Sell</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <Tabs defaultValue="recommendation" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
              <TabsTrigger value="control">Control</TabsTrigger>
              <TabsTrigger value="action">Action</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="recommendation">
              <RecommendationModule />
            </TabsContent>
            <TabsContent value="control">
              <ControlModule />
            </TabsContent>
            <TabsContent value="action">
              <ActionModule />
            </TabsContent>
            <TabsContent value="insights">
              <InsightsModule />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
