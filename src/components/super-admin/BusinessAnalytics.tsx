import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

export function BusinessAnalytics() {
  const revenueData = [
    { month: "Jan", revenue: 245000, orders: 1850, customers: 1200 },
    { month: "Feb", revenue: 278000, orders: 2100, customers: 1450 },
    { month: "Mar", revenue: 312000, orders: 2350, customers: 1680 },
    { month: "Apr", revenue: 289000, orders: 2180, customers: 1920 },
    { month: "May", revenue: 356000, orders: 2650, customers: 2150 },
    { month: "Jun", revenue: 398000, orders: 2890, customers: 2380 },
    { month: "Jul", revenue: 425000, orders: 3100, customers: 2620 },
    { month: "Aug", revenue: 467000, orders: 3450, customers: 2847 }
  ];

  const productCategoryRevenue = [
    { name: "Vegetables", value: 156000, color: "hsl(var(--primary))" },
    { name: "Fruits", value: 142000, color: "hsl(var(--accent))" },
    { name: "Grains", value: 98000, color: "hsl(var(--secondary))" },
    { name: "Dairy", value: 71000, color: "hsl(var(--muted))" }
  ];

  const salesPerformance = [
    { date: "Week 1", target: 120000, actual: 115000 },
    { date: "Week 2", target: 125000, actual: 132000 },
    { date: "Week 3", target: 118000, actual: 128000 },
    { date: "Week 4", target: 130000, actual: 142000 }
  ];

  const keyMetrics = [
    {
      title: "Total Revenue",
      value: "₹4,67,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Orders This Month",
      value: "3,450",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-500"
    },
    {
      title: "Active Customers",
      value: "2,847",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Products Sold",
      value: "28,540",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Business Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="glass-card hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <div className="text-2xl font-bold text-gradient-primary mt-1">
                    {metric.value}
                  </div>
                  <div className="flex items-center mt-2">
                    <Badge 
                      variant={metric.trend === 'up' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {metric.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {metric.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-card/50`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue & Orders Trend */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            Revenue & Orders Trend
          </CardTitle>
          <CardDescription>
            Monthly revenue and order volume analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />
                <YAxis 
                  yAxisId="revenue"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />
                <YAxis 
                  yAxisId="orders"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />
                <Area
                  yAxisId="revenue"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
                <Area
                  yAxisId="orders"
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(var(--accent))"
                  fillOpacity={1}
                  fill="url(#ordersGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product Category Revenue */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue by Product Category</CardTitle>
            <CardDescription>Distribution of revenue across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productCategoryRevenue}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {productCategoryRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {productCategoryRevenue.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <p className="font-medium text-sm">{category.name}</p>
                    <p className="text-xs text-muted-foreground">₹{category.value.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales Performance vs Target */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Sales Performance vs Target</CardTitle>
            <CardDescription>Weekly sales performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                  />
                  <Bar 
                    dataKey="target" 
                    fill="hsl(var(--muted))" 
                    radius={[2, 2, 0, 0]}
                    name="Target"
                  />
                  <Bar 
                    dataKey="actual" 
                    fill="hsl(var(--primary))" 
                    radius={[2, 2, 0, 0]}
                    name="Actual"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}