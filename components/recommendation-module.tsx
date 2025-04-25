"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Info, Plus, ArrowRight, Check } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import crossSellData from "@/public/restock_crosssell_from_csv.json"

// Mock data for AI recommended bundles
const recommendedBundles = [
  {
    id: 1,
    productName: "BARRIER CARE CREAM - NORMAL TO DRY SKIN 50ML",
    productId: "8244085719356",
    crossSellProduct: "2% KOJIC & 1% GLYCOLIC ACID PIGMENTATION CORRECTOR DAILY GLOW CREAM",
    crossSellProductId: "9593843450172",
    crossSellDays: 20,
    conversionRate: "12.4%",
    enabled: true,
  },
  {
    id: 2,
    productName: "VITAMIN C FACE SERUM WITH FERULIC ACID",
    productId: "7244085719357",
    crossSellProduct: "HYALURONIC ACID FACE SERUM",
    crossSellProductId: "8593843450173",
    crossSellDays: 15,
    conversionRate: "10.2%",
    enabled: false,
  },
  {
    id: 3,
    productName: "RETINOL NIGHT CREAM",
    productId: "6244085719358",
    crossSellProduct: "NIACINAMIDE FACE SERUM",
    crossSellProductId: "7593843450174",
    crossSellDays: 25,
    conversionRate: "8.7%",
    enabled: false,
  },
]

export default function RecommendationModule() {
  const [activeTab, setActiveTab] = useState("ai-recommended")
  const [autopilotEnabled, setAutopilotEnabled] = useState(false)
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null)
  const [bundles, setBundles] = useState(recommendedBundles)
  
  // States for manual bundle creation
  const [originProductType, setOriginProductType] = useState("product")
  const [crossSellProductType, setCrossSellProductType] = useState("product")
  const [originSearchTerm, setOriginSearchTerm] = useState("")
  const [crossSellSearchTerm, setCrossSellSearchTerm] = useState("")
  const [selectedOriginProduct, setSelectedOriginProduct] = useState<any>(null)
  const [selectedCrossSellProduct, setSelectedCrossSellProduct] = useState<any>(null)
  const [channel, setChannel] = useState("")
  const [triggerDays, setTriggerDays] = useState("20")
  const [manualBundles, setManualBundles] = useState<any[]>([])
  
  // Extract product names and cross-sell product names from JSON data
  const productNames = crossSellData.map(item => ({
    name: item["Product Name"],
    id: item["Product ID"],
    sku: item["variant_sku"]
  }))
  
  const crossSellProductNames = crossSellData.map(item => ({
    name: item["Cross Sell Product name"],
    id: item["Cross Sell Product ID"],
    sku: item["Cross Sell variant_sku"]
  }))

  const toggleBundleStatus = (id: number) => {
    setBundles(bundles.map((bundle) => (bundle.id === id ? { ...bundle, enabled: !bundle.enabled } : bundle)))
  }

  const toggleAutopilot = () => {
    const newState = !autopilotEnabled
    setAutopilotEnabled(newState)

    // If autopilot is enabled, disable all other bundles
    if (newState) {
      setBundles(bundles.map((bundle) => ({ ...bundle, enabled: false })))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold" style={{ color: "#004B8D" }}>Recommendation Module</h2>
        <div className="text-sm text-gray-500">Configure what cross-sell journeys should be enabled</div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3" style={{ backgroundColor: "#f0f5fa" }}>
          <TabsTrigger value="ai-recommended" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">AI Recommended Bundles</TabsTrigger>
          <TabsTrigger value="manual-bundles" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">Manual Bundles</TabsTrigger>
          <TabsTrigger value="ai-autopilot" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">AI Auto-pilot<Badge className="ml-2" style={{ backgroundColor: "#F7B24F" }}>Beta</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-recommended" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full" style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader>
                  <CardTitle className="text-lg">Top AI Recommended Bundles</CardTitle>
                  <CardDescription>Select a bundle to view details and enable/disable</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {bundles.map((bundle) => (
                        <div
                          key={bundle.id}
                          className={`p-3 rounded-md cursor-pointer border transition-colors ${
                            selectedBundle === bundle.id
                              ? "border-[#004B8D] bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedBundle(bundle.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium truncate max-w-[180px]" title={bundle.productName}>
                              {bundle.productName}
                            </div>
                            <Badge variant={bundle.enabled ? "default" : "outline"} style={bundle.enabled ? { backgroundColor: "#004B8D" } : {}}>
                              {bundle.enabled ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-[220px]" title={bundle.crossSellProduct}>
                            → {bundle.crossSellProduct}
                          </div>
                          <div className="flex items-center justify-between mt-2 text-sm">
                            <div>After {bundle.crossSellDays} days</div>
                            <div style={{ color: "#F7B24F" }}>{bundle.conversionRate} conv.</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {selectedBundle !== null ? (
                <Card style={{ borderTop: "3px solid #F7B24F" }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Bundle Details</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="bundle-status">
                          {bundles.find((b) => b.id === selectedBundle)?.enabled ? "Enabled" : "Disabled"}
                        </Label>
                        <Switch
                          id="bundle-status"
                          checked={bundles.find((b) => b.id === selectedBundle)?.enabled}
                          onCheckedChange={() => toggleBundleStatus(selectedBundle)}
                          disabled={autopilotEnabled}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {autopilotEnabled && (
                      <Alert variant="default" className="mb-4 border-yellow-400 bg-yellow-50">
                        <AlertDescription className="text-yellow-800">
                          Individual bundles cannot be enabled while AI Auto-pilot is active.
                        </AlertDescription>
                      </Alert>
                    )}

                    {selectedBundle && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-1">Original Product</h3>
                              <div className="space-y-2">
                                {(selectedBundle === 1 || selectedBundle === 2 || selectedBundle === 3) && (
                                  <div className="mb-1">
                                    <img
                                      src={
                                        selectedBundle === 1 ? "/cross-sell-image/11.webp" :
                                        selectedBundle === 2 ? "/cross-sell-image/21.webp" :
                                        "/cross-sell-image/31.webp"
                                      }
                                      alt="Product image"
                                      className="h-56 w-36 rounded-sm object-cover"
                                    />
                                  </div>
                                )}
                                <div className="font-medium">
                                  {bundles.find((b) => b.id === selectedBundle)?.productName}
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {bundles.find((b) => b.id === selectedBundle)?.productId}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-1">Cross-Sell Trigger</h3>
                              <div className="font-medium">
                                {bundles.find((b) => b.id === selectedBundle)?.crossSellDays} days after purchase
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-1">Cross-Sell Product</h3>
                              <div className="space-y-2">
                                {(selectedBundle === 1 || selectedBundle === 2 || selectedBundle === 3) && (
                                  <div className="mb-1">
                                    <img
                                      src={
                                        selectedBundle === 1 ? "/cross-sell-image/12.webp" :
                                        selectedBundle === 2 ? "/cross-sell-image/22.webp" :
                                        "/cross-sell-image/32.webp"
                                      }
                                      alt="Cross-sell product image"
                                      className="h-56 w-36 rounded-sm object-cover"
                                    />
                                  </div>
                                )}
                                <div className="font-medium">
                                  {bundles.find((b) => b.id === selectedBundle)?.crossSellProduct}
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {bundles.find((b) => b.id === selectedBundle)?.crossSellProductId}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-1">Expected Performance</h3>
                              <div className="font-medium" style={{ color: "#F7B24F" }}>
                                {bundles.find((b) => b.id === selectedBundle)?.conversionRate} conversion rate
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-sm font-medium mb-2">Why this recommendation?</h3>
                          <p className="text-sm text-gray-600">
                            {selectedBundle === 1 && (
                              "This combination is recommended based on historical buying patterns and complementary skincare needs. Customers using the Barrier Care Cream often add the Pigmentation Corrector to enhance skin tone, hydration, and overall glow."
                            )}
                            {selectedBundle === 2 && (
                              "This recommendation is based on historical purchase patterns and product synergy. Customers who purchased the Vitamin C Face Serum with Ferulic Acid frequently added the Hyaluronic Acid Serum within 15 days to boost hydration and enhance their skin-brightening routine."
                            )}
                            {selectedBundle === 3 && (
                              "This recommendation is based on customer purchase patterns and product complementarity. Users who purchased the Retinol Night Cream often added the Niacinamide Serum within 10–15 days to soothe, strengthen, and balance their skin while using retinol."
                            )}
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-gray-400 mb-2">Select a bundle to view details</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai-autopilot" className="pt-6">
          <Card style={{ borderTop: "3px solid #F7B24F" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    AI Auto-pilot
                    <Badge className="ml-2" style={{ backgroundColor: "#F7B24F" }}>Beta</Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-2 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[250px] text-sm">
                            AI Auto-pilot autonomously suggests and sends cross-sell bundles to optimize conversion.
                            Enabling this will override all other journeys.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription>Let AI autonomously manage your cross-sell journeys</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="autopilot-status">{autopilotEnabled ? "Enabled" : "Disabled"}</Label>
                  <Switch id="autopilot-status" checked={autopilotEnabled} onCheckedChange={toggleAutopilot} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-blue-50" style={{ borderColor: "#004B8D" }}>
                <AlertDescription className="text-blue-800">
                  When enabled, AI Auto-pilot will take over all cross-sell journeys and optimize them for maximum
                  conversion. Individual bundles will be automatically disabled.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">How it works</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5" style={{ color: "#004B8D" }} />
                      <span>AI analyzes your store's data to identify optimal cross-sell opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5" style={{ color: "#004B8D" }} />
                      <span>Automatically creates and sends personalized cross-sell messages</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5" style={{ color: "#004B8D" }} />
                      <span>Continuously learns and improves based on performance</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5" style={{ color: "#004B8D" }} />
                      <span>Respects control parameters set in the Control module</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Benefits</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5" style={{ color: "#F7B24F" }} />
                      <span>Increased conversion rates through AI-optimized timing</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5" style={{ color: "#F7B24F" }} />
                      <span>Personalized product recommendations for each customer</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5" style={{ color: "#F7B24F" }} />
                      <span>Reduced manual effort in managing cross-sell campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5" style={{ color: "#F7B24F" }} />
                      <span>Continuous optimization based on real-time performance data</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual-bundles" className="pt-6">
          <Card style={{ borderTop: "3px solid #F7B24F" }}>
            <CardHeader>
              <CardTitle>Manual Cross-Sell Bundles</CardTitle>
              <CardDescription>Create custom cross-sell bundles by selecting products manually</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Origin Product/Collection</h3>
                    <Select value={originProductType} onValueChange={setOriginProductType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="variant">Variant</SelectItem>
                        <SelectItem value="collection">Collection</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      placeholder="Search products..."
                      value={originSearchTerm}
                      onChange={(e) => setOriginSearchTerm(e.target.value)}
                    />

                    <div className="border rounded-md p-3 h-[200px] overflow-y-auto">
                      {originProductType === "product" ? (
                        <ScrollArea className="h-full">
                          <div className="space-y-2">
                            {productNames
                              .filter(product =>
                                originSearchTerm === "" ||
                                product.name.toLowerCase().includes(originSearchTerm.toLowerCase())
                              )
                              .map((product, index) => (
                                <div
                                  key={`origin-${index}`}
                                  className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                                    selectedOriginProduct?.id === product.id
                                      ? "bg-blue-50 border border-blue-200"
                                      : "hover:bg-gray-50"
                                  }`}
                                  onClick={() => setSelectedOriginProduct(product)}
                                >
                                  <div className="text-sm truncate flex-1" title={product.name}>
                                    {product.name}
                                  </div>
                                  {selectedOriginProduct?.id === product.id && (
                                    <Check className="h-4 w-4 text-blue-500 ml-2 flex-shrink-0" />
                                  )}
                                </div>
                              ))
                            }
                            {originSearchTerm !== "" && productNames.filter(product =>
                              product.name.toLowerCase().includes(originSearchTerm.toLowerCase())
                            ).length === 0 && (
                              <div className="text-sm text-gray-500 text-center py-4">
                                No products found matching "{originSearchTerm}"
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      ) : (
                        <div className="text-sm text-gray-500 text-center mt-16">
                          Select a product type to see results
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Cross-Sell Product/Collection</h3>
                    <Select value={crossSellProductType} onValueChange={setCrossSellProductType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="variant">Variant</SelectItem>
                        <SelectItem value="collection">Collection</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      placeholder="Search products..."
                      value={crossSellSearchTerm}
                      onChange={(e) => setCrossSellSearchTerm(e.target.value)}
                    />

                    <div className="border rounded-md p-3 h-[200px] overflow-y-auto">
                      {crossSellProductType === "product" ? (
                        <ScrollArea className="h-full">
                          <div className="space-y-2">
                            {crossSellProductNames
                              .filter(product =>
                                crossSellSearchTerm === "" ||
                                product.name.toLowerCase().includes(crossSellSearchTerm.toLowerCase())
                              )
                              .map((product, index) => (
                                <div
                                  key={`cross-sell-${index}`}
                                  className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                                    selectedCrossSellProduct?.id === product.id
                                      ? "bg-blue-50 border border-blue-200"
                                      : "hover:bg-gray-50"
                                  }`}
                                  onClick={() => setSelectedCrossSellProduct(product)}
                                >
                                  <div className="text-sm truncate flex-1" title={product.name}>
                                    {product.name}
                                  </div>
                                  {selectedCrossSellProduct?.id === product.id && (
                                    <Check className="h-4 w-4 text-blue-500 ml-2 flex-shrink-0" />
                                  )}
                                </div>
                              ))
                            }
                            {crossSellSearchTerm !== "" && crossSellProductNames.filter(product =>
                              product.name.toLowerCase().includes(crossSellSearchTerm.toLowerCase())
                            ).length === 0 && (
                              <div className="text-sm text-gray-500 text-center py-4">
                                No products found matching "{crossSellSearchTerm}"
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      ) : (
                        <div className="text-sm text-gray-500 text-center mt-16">
                          Select a product type to see results
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Channel & Trigger</h3>

                    <div className="space-y-2">
                      <Label htmlFor="channel">Communication Channel</Label>
                      <Select value={channel} onValueChange={setChannel}>
                        <SelectTrigger id="channel">
                          <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="both">Both WhatsApp & Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="trigger-days">Trigger (days after purchase)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="trigger-days"
                          type="number"
                          placeholder="20"
                          value={triggerDays}
                          onChange={(e) => setTriggerDays(e.target.value)}
                        />
                        <span className="text-sm text-gray-500">days</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        className="w-full"
                        style={{ backgroundColor: "#004B8D" }}
                        disabled={!selectedOriginProduct || !selectedCrossSellProduct || !channel}
                        onClick={() => {
                          if (selectedOriginProduct && selectedCrossSellProduct && channel) {
                            const newBundle = {
                              id: Date.now(),
                              originProduct: selectedOriginProduct,
                              crossSellProduct: selectedCrossSellProduct,
                              channel,
                              triggerDays: parseInt(triggerDays) || 20
                            };
                            setManualBundles([...manualBundles, newBundle]);
                            
                            // Reset selection
                            setSelectedOriginProduct(null);
                            setSelectedCrossSellProduct(null);
                            setOriginSearchTerm("");
                            setCrossSellSearchTerm("");
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Bundle
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-4">Your Manual Bundles</h3>

                  {manualBundles.length > 0 ? (
                    <div className="space-y-4">
                      {manualBundles.map((bundle) => (
                        <div key={bundle.id} className="border rounded-md p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Bundle #{bundle.id.toString().slice(-4)}</h4>
                            <Badge style={{ backgroundColor: "#004B8D" }}>Active</Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Origin Product</div>
                              <div className="font-medium truncate" title={bundle.originProduct.name}>
                                {bundle.originProduct.name}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-500">Cross-Sell Product</div>
                              <div className="font-medium truncate" title={bundle.crossSellProduct.name}>
                                {bundle.crossSellProduct.name}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-gray-500">Channel:</span> {bundle.channel === "both" ? "WhatsApp & Email" : bundle.channel}
                            </div>
                            <div>
                              <span className="text-gray-500">Trigger:</span> {bundle.triggerDays} days
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded-md p-4 text-center text-gray-500">
                      No manual bundles created yet. Use the form above to create your first bundle.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
