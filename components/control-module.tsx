import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Info, Save } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ControlModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold" style={{ color: "#004B8D" }}>Control Module</h2>
        <div className="text-sm text-gray-500">Define when and how cross-sell journeys should be controlled</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card style={{ borderTop: "3px solid #F7B24F" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              Frequency Capping
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-2" style={{ color: "#004B8D" }} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[250px] text-sm">
                      Control how many messages a customer can receive in a given time period to prevent overwhelming
                      them.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>Limit the number of messages sent to customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-messages">Maximum Messages</Label>
                  <Input id="max-messages" type="number" placeholder="2" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-period">Time Period</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="time-period">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Daily Distribution</Label>
                <div className="pt-2">
                  <Slider defaultValue={[8, 20]} max={24} step={1} className="my-4" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>12 AM</span>
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                  </div>
                  <div className="text-sm text-center mt-2 text-gray-700">Send messages between 8 AM and 8 PM</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderTop: "3px solid #F7B24F" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              Cart Value Threshold
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-2" style={{ color: "#004B8D" }} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[250px] text-sm">
                      Set minimum cart value requirements for cross-sell messages to target higher-value customers.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>Set minimum cart value for cross-sell eligibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="min-cart-value">Minimum Cart Value (INR)</Label>
                <Input id="min-cart-value" type="number" placeholder="1000" defaultValue="1000" />
              </div>

              <div className="space-y-2">
                <Label>Apply To</Label>
                <RadioGroup defaultValue="all" className="pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-orders" />
                    <Label htmlFor="all-orders" className="cursor-pointer">
                      All orders
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="first-time" id="first-time" />
                    <Label htmlFor="first-time" className="cursor-pointer">
                      First-time customers only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="repeat" id="repeat" />
                    <Label htmlFor="repeat" className="cursor-pointer">
                      Repeat customers only
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderTop: "3px solid #F7B24F" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              Priority Settings
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-2" style={{ color: "#004B8D" }} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[250px] text-sm">
                      Define which cross-sell messages take priority when multiple are eligible to be sent to the same
                      customer.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>Set priorities for multiple cross-sell cases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Prioritize By</Label>
                <RadioGroup defaultValue="cart-value" className="pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cart-value" id="cart-value" />
                    <Label htmlFor="cart-value" className="cursor-pointer">
                      Higher cart value
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="product-value" id="product-value" />
                    <Label htmlFor="product-value" className="cursor-pointer">
                      Higher product value
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="conversion" id="conversion" />
                    <Label htmlFor="conversion" className="cursor-pointer">
                      Higher predicted conversion rate
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-priority">Secondary Priority</Label>
                <Select>
                  <SelectTrigger id="secondary-priority">
                    <SelectValue placeholder="Select secondary priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recency">Purchase recency</SelectItem>
                    <SelectItem value="frequency">Purchase frequency</SelectItem>
                    <SelectItem value="customer-value">Customer lifetime value</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderTop: "3px solid #F7B24F" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              Trigger Settings
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-2" style={{ color: "#004B8D" }} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[250px] text-sm">
                      Define when cross-sell messages should be triggered based on customer actions or time periods.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>Configure when cross-sell messages are triggered</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Trigger Type</Label>
                <RadioGroup defaultValue="days-after-purchase" className="pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="days-after-purchase" id="days-after-purchase" />
                    <Label htmlFor="days-after-purchase" className="cursor-pointer">
                      Days after purchase
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="days-after-delivery" id="days-after-delivery" />
                    <Label htmlFor="days-after-delivery" className="cursor-pointer">
                      Days after delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="specific-date" id="specific-date" />
                    <Label htmlFor="specific-date" className="cursor-pointer">
                      Specific date (e.g., holidays)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-days">Default Days</Label>
                  <Input id="default-days" type="number" placeholder="20" defaultValue="20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-days">Maximum Days</Label>
                  <Input id="max-days" type="number" placeholder="60" defaultValue="60" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="px-6" style={{ backgroundColor: "#004B8D" }}>
          <Save className="h-4 w-4 mr-2" />
          Save Control Settings
        </Button>
      </div>
    </div>
  )
}
