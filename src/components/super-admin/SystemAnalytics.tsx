import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export function SystemAnalytics() {
  const userGrowthData = [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1450 },
    { month: "Mar", users: 1680 },
    { month: "Apr", users: 1920 },
    { month: "May", users: 2150 },
    { month: "Jun", users: 2380 },
    { month: "Jul", users: 2620 },
    { month: "Aug", users: 2847 }
  ];

  const roleDistribution = [
    { name: "Customers", value: 1800, color: "hsl(var(--primary))" },
    { name: "Inventory Staff", value: 450, color: "hsl(var(--accent))" },
    { name: "Delivery Personnel", value: 320, color: "hsl(var(--secondary))" },
    { name: "Managers", value: 180, color: "hsl(var(--muted))" },
    { name: "Others", value: 97, color: "hsl(var(--destructive))" }
  ];

  const systemUsage = [
    { time: "00:00", active: 120 },
    { time: "04:00", active: 80 },
    { time: "08:00", active: 320 },
    { time: "12:00", active: 450 },
    { time: "16:00", active: 380 },
    { time: "20:00", active: 280 },
    { time: "23:59", active: 180 }
  ];

  return (
    <div className="space-y-6">
      {/* User Growth Chart */}
      <div className="h-64">
        <h4 className="text-sm font-medium mb-4 text-muted-foreground">User Growth Trend</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Role Distribution and System Usage */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Role Distribution */}
        <div className="h-48">
          <h4 className="text-sm font-medium mb-4 text-muted-foreground">User Role Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {roleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* System Usage */}
        <div className="h-48">
          <h4 className="text-sm font-medium mb-4 text-muted-foreground">Daily Active Users</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={systemUsage}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
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
                dataKey="active" 
                fill="hsl(var(--accent))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}