import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecommendationModule from "@/components/recommendation-module"
import ControlModule from "@/components/control-module"
import ActionModule from "@/components/action-module"
import InsightsModule from "@/components/insights-module"
import { KwikEngageHeader } from "@/components/kwik-engage-header"

export default function SmartCrossSellPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <KwikEngageHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#004B8D" }}>Kwik Sell</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6" style={{ borderTop: "3px solid #F7B24F" }}>
          <Tabs defaultValue="recommendation" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4" style={{ backgroundColor: "#f0f5fa" }}>
              <TabsTrigger value="recommendation" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">Recommendation</TabsTrigger>
              <TabsTrigger value="control" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">Control</TabsTrigger>
              <TabsTrigger value="action" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">Action</TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">Insights</TabsTrigger>
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
