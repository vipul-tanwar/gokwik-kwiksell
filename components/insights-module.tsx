"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, TrendingUp, Banknote, ShoppingCart, Users, Package, BarChart3, PieChart } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

// Mock data for charts
const revenueData = [
  { date: "Apr 1", revenue: 12500 },
  { date: "Apr 2", revenue: 14200 },
  { date: "Apr 3", revenue: 15800 },
  { date: "Apr 4", revenue: 13600 },
  { date: "Apr 5", revenue: 16700 },
  { date: "Apr 6", revenue: 18900 },
  { date: "Apr 7", revenue: 17400 },
  { date: "Apr 8", revenue: 19200 },
  { date: "Apr 9", revenue: 20100 },
  { date: "Apr 10", revenue: 21500 },
  { date: "Apr 11", revenue: 22800 },
  { date: "Apr 12", revenue: 21300 },
  { date: "Apr 13", revenue: 23400 },
  { date: "Apr 14", revenue: 24700 },
]

const ordersData = [
  { date: "Apr 1", orders: 42 },
  { date: "Apr 2", orders: 48 },
  { date: "Apr 3", orders: 53 },
  { date: "Apr 4", orders: 46 },
  { date: "Apr 5", orders: 56 },
  { date: "Apr 6", orders: 64 },
  { date: "Apr 7", orders: 58 },
  { date: "Apr 8", orders: 65 },
  { date: "Apr 9", orders: 68 },
  { date: "Apr 10", orders: 72 },
  { date: "Apr 11", orders: 76 },
  { date: "Apr 12", orders: 71 },
  { date: "Apr 13", orders: 78 },
  { date: "Apr 14", orders: 83 },
]

const engagementData = [
  { name: "Delivered", value: 89 },
  { name: "Read", value: 43 },
  { name: "Clicked", value: 12 },
]

// Mock data for tables
const topProducts = [
  { id: 1, name: "2% KOJIC & 1% GLYCOLIC ACID PIGMENTATION CORRECTOR", sales: 87, revenue: 78300 },
  { id: 2, name: "HYALURONIC ACID FACE SERUM", sales: 65, revenue: 52000 },
  { id: 3, name: "NIACINAMIDE FACE SERUM", sales: 58, revenue: 46400 },
  { id: 4, name: "VITAMIN C FACE SERUM WITH FERULIC ACID", sales: 52, revenue: 41600 },
  { id: 5, name: "RETINOL NIGHT CREAM", sales: 43, revenue: 38700 },
]

const topBundles = [
  {
    id: 1,
    original: "BARRIER CARE CREAM - NORMAL TO DRY SKIN",
    crossSell: "2% KOJIC & 1% GLYCOLIC ACID PIGMENTATION CORRECTOR",
    conversion: "14.2%",
    revenue: 68400,
  },
  {
    id: 2,
    original: "VITAMIN C FACE SERUM WITH FERULIC ACID",
    crossSell: "HYALURONIC ACID FACE SERUM",
    conversion: "12.8%",
    revenue: 52000,
  },
  {
    id: 3,
    original: "RETINOL NIGHT CREAM",
    crossSell: "NIACINAMIDE FACE SERUM",
    conversion: "10.5%",
    revenue: 46400,
  },
  {
    id: 4,
    original: "HYALURONIC ACID FACE SERUM",
    crossSell: "VITAMIN C FACE SERUM WITH FERULIC ACID",
    conversion: "9.7%",
    revenue: 41600,
  },
  {
    id: 5,
    original: "NIACINAMIDE FACE SERUM",
    crossSell: "RETINOL NIGHT CREAM",
    conversion: "8.3%",
    revenue: 38700,
  },
]

// Prepare chart data
const revenueChartData = {
  labels: revenueData.map((item) => item.date),
  datasets: [
    {
      label: "Revenue",
      data: revenueData.map((item) => item.revenue),
      fill: true,
      backgroundColor: "rgba(0, 75, 141, 0.2)",
      borderColor: "rgba(0, 75, 141, 1)",
      tension: 0.4,
    },
  ],
}

const ordersChartData = {
  labels: ordersData.map((item) => item.date),
  datasets: [
    {
      label: "Orders",
      data: ordersData.map((item) => item.orders),
      backgroundColor: "rgba(247, 178, 79, 0.8)",
      borderRadius: 4,
    },
  ],
}

const engagementChartData = {
  labels: engagementData.map((item) => item.name),
  datasets: [
    {
      label: "Engagement",
      data: engagementData.map((item) => item.value),
      backgroundColor: ["rgba(0, 75, 141, 0.8)", "rgba(247, 178, 79, 0.8)", "rgba(0, 75, 141, 0.4)"],
      borderWidth: 1,
    },
  ],
}

const channelPerformanceData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "WhatsApp",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "rgba(0, 75, 141, 1)",
      backgroundColor: "rgba(0, 75, 141, 0.5)",
      tension: 0.4,
    },
    {
      label: "Email",
      data: [42, 38, 55, 56, 40, 45, 30],
      borderColor: "rgba(247, 178, 79, 1)",
      backgroundColor: "rgba(247, 178, 79, 0.5)",
      tension: 0.4,
    },
  ],
}

// Chart options
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
}

export default function InsightsModule() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold" style={{ color: "#004B8D" }}></h2>
        <div className="flex items-center space-x-4">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-2" style={{ backgroundColor: "#f0f5fa" }}>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">Performance Metrics</TabsTrigger>
          <TabsTrigger value="engagement" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">Engagement Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader className="pb-2">
                  <CardDescription>Revenue Generated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Banknote className="h-5 w-5 mr-2" style={{ color: "#004B8D" }} />
                      <div className="text-2xl font-bold">₹234,004</div>
                    </div>
                    <div className="flex items-center text-sm" style={{ color: "#F7B24F" }}>
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>12.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader className="pb-2">
                  <CardDescription>Conversion Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" style={{ color: "#004B8D" }} />
                      <div className="text-2xl font-bold">12.4%</div>
                    </div>
                    <div className="flex items-center text-sm" style={{ color: "#F7B24F" }}>
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>2.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader className="pb-2">
                  <CardDescription>Number of Orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2" style={{ color: "#004B8D" }} />
                      <div className="text-2xl font-bold">432</div>
                    </div>
                    <div className="flex items-center text-sm" style={{ color: "#F7B24F" }}>
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>8.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader className="pb-2">
                  <CardDescription>Number of Buyers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" style={{ color: "#F7B24F" }} />
                      <div className="text-2xl font-bold">390</div>
                    </div>
                    <div className="flex items-center text-sm" style={{ color: "#F7B24F" }}>
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>6.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" style={{ color: "#004B8D" }} />
                    Top Cross-Sold Products
                  </CardTitle>
                  <CardDescription>Products with highest cross-sell performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="text-right">Sales</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium truncate max-w-[250px]" title={product.name}>
                            {product.name}
                          </TableCell>
                          <TableCell className="text-right">{product.sales}</TableCell>
                          <TableCell className="text-right">₹{product.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" style={{ color: "#F7B24F" }} />
                    Top Performance Cross-Sell Bundles
                  </CardTitle>
                  <CardDescription>Most effective product combinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bundle</TableHead>
                        <TableHead className="text-right">Conv. Rate</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topBundles.map((bundle) => (
                        <TableRow key={bundle.id}>
                          <TableCell className="font-medium">
                            <div className="truncate max-w-[250px]" title={bundle.original}>
                              {bundle.original}
                            </div>
                            <div className="text-gray-500 text-xs flex items-center">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              <span className="truncate max-w-[240px]" title={bundle.crossSell}>
                                {bundle.crossSell}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{bundle.conversion}</TableCell>
                          <TableCell className="text-right">₹{bundle.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Daily revenue from cross-sell journeys</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <Line options={lineChartOptions} data={revenueChartData} />
                  </div>
                </CardContent>
              </Card>

              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader>
                  <CardTitle>Orders Trend</CardTitle>
                  <CardDescription>Daily orders from cross-sell journeys</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <Bar options={barChartOptions} data={ordersChartData} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader className="pb-2">
                  <CardDescription>Delivery Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">89%</div>
                    <div className="flex items-center text-sm" style={{ color: "#F7B24F" }}>
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>1.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader className="pb-2">
                  <CardDescription>Read Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">43%</div>
                    <div className="flex items-center text-sm" style={{ color: "#F7B24F" }}>
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>3.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader className="pb-2">
                  <CardDescription>Click Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">12%</div>
                    <div className="flex items-center text-sm" style={{ color: "#F7B24F" }}>
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>2.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" style={{ color: "#004B8D" }} />
                    Engagement Funnel
                  </CardTitle>
                  <CardDescription>Visualization of message engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <Pie options={pieChartOptions} data={engagementChartData} />
                  </div>
                </CardContent>
              </Card>

              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                  <CardDescription>Comparison of WhatsApp vs Email performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <Line options={lineChartOptions} data={channelPerformanceData} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Message Delivery Performance</CardTitle>
                <CardDescription>Detailed breakdown of message delivery and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Messages Sent</TableHead>
                      <TableHead>Delivered</TableHead>
                      <TableHead>Read</TableHead>
                      <TableHead>Clicked</TableHead>
                      <TableHead className="text-right">Conversion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { date: "Apr 14, 2025", sent: 120, delivered: 108, read: 52, clicked: 14, conversion: "11.7%" },
                      { date: "Apr 13, 2025", sent: 135, delivered: 122, read: 58, clicked: 16, conversion: "11.9%" },
                      { date: "Apr 12, 2025", sent: 110, delivered: 98, read: 45, clicked: 12, conversion: "10.9%" },
                      { date: "Apr 11, 2025", sent: 125, delivered: 112, read: 54, clicked: 15, conversion: "12.0%" },
                      { date: "Apr 10, 2025", sent: 115, delivered: 102, read: 48, clicked: 13, conversion: "11.3%" },
                    ].map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.sent}</TableCell>
                        <TableCell>
                          {row.delivered} ({Math.round((row.delivered / row.sent) * 100)}%)
                        </TableCell>
                        <TableCell>
                          {row.read} ({Math.round((row.read / row.delivered) * 100)}%)
                        </TableCell>
                        <TableCell>
                          {row.clicked} ({Math.round((row.clicked / row.read) * 100)}%)
                        </TableCell>
                        <TableCell className="text-right">{row.conversion}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
