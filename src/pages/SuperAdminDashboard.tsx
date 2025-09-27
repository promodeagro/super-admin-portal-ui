import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { 
  Users, 
  Settings, 
  Shield, 
  BarChart3, 
  TrendingUp, 
  Menu,
  Bell,
  Search,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserManagement } from '@/components/super-admin/UserManagement'
import { SystemSettings } from '@/components/super-admin/SystemSettings'
import { SecurityMonitor } from '@/components/super-admin/SecurityMonitor'
import { SystemAnalytics } from '@/components/super-admin/SystemAnalytics'
import { BusinessAnalytics } from '@/components/super-admin/BusinessAnalytics'
import { RBACManagement } from '@/components/super-admin/RBACManagement'
import { Card, CardContent } from '@/components/ui/card'

const navigation = [
  { name: 'User Management', href: '/dashboard/users', icon: Users },
  { name: 'RBAC Management', href: '/dashboard/rbac', icon: Shield },
  { name: 'Security Monitor', href: '/dashboard/security', icon: Shield },
  { name: 'System Analytics', href: '/dashboard/system-analytics', icon: BarChart3 },
  { name: 'Business Analytics', href: '/dashboard/business-analytics', icon: TrendingUp },
  { name: 'System Settings', href: '/dashboard/settings', icon: Settings },
]

export function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const currentPage = navigation.find(item => location.pathname === item.href)

  return (
    <div className="flex h-screen bg-gradient-background">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Super Admin</h1>
              <p className="text-xs text-sidebar-foreground/60">Promode Agro</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href)
                    setSidebarOpen(false)
                  }}
                  className={`${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  } group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </button>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <div className="h-full w-full bg-gradient-primary flex items-center justify-center text-white font-medium">
                  SA
                </div>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Super Admin
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  admin@promodeagro.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1 flex items-center gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">
                  3
                </Badge>
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                {currentPage?.icon && (
                  <currentPage.icon className="h-6 w-6 text-primary" />
                )}
                <h1 className="text-2xl font-bold text-gradient-primary">
                  {currentPage?.name || 'Dashboard'}
                </h1>
              </div>
              <p className="text-muted-foreground">
                {currentPage?.name === 'User Management' && 'Manage system users, roles, and permissions'}
                {currentPage?.name === 'RBAC Management' && 'Configure role-based access control'}
                {currentPage?.name === 'Security Monitor' && 'Monitor system security and threats'}
                {currentPage?.name === 'System Analytics' && 'View system performance and usage analytics'}
                {currentPage?.name === 'Business Analytics' && 'Analyze business metrics and performance'}
                {currentPage?.name === 'System Settings' && 'Configure system-wide settings and preferences'}
              </p>
            </div>

            {/* Route Content */}
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/rbac" element={<RBACManagement />} />
              <Route path="/security" element={<SecurityMonitor />} />
              <Route path="/system-analytics" element={<SystemAnalytics />} />
              <Route path="/business-analytics" element={<BusinessAnalytics />} />
              <Route path="/settings" element={<SystemSettings />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

// Dashboard Overview Component
function DashboardOverview() {
  const stats = [
    { title: 'Total Users', value: '2,847', change: '+12%', color: 'text-blue-500' },
    { title: 'Active Sessions', value: '1,234', change: '+5%', color: 'text-green-500' },
    { title: 'Security Alerts', value: '3', change: '-25%', color: 'text-red-500' },
    { title: 'System Uptime', value: '99.9%', change: '+0.1%', color: 'text-purple-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="text-2xl font-bold text-gradient-primary mt-1">
                    {stat.value}
                  </div>
                  <p className={`text-xs ${stat.color} mt-1`}>
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Button className="h-auto p-4 flex-col gap-2 bg-gradient-primary hover:bg-gradient-primary/90">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Shield className="h-6 w-6" />
              <span>Security Monitor</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registered', user: 'Rajesh Kumar', time: '2 minutes ago' },
              { action: 'Security alert resolved', user: 'System', time: '15 minutes ago' },
              { action: 'Role permissions updated', user: 'Admin', time: '1 hour ago' },
              { action: 'System backup completed', user: 'System', time: '2 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">by {activity.user}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
