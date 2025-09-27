import { useState } from "react";
import { Shield, Plus, Edit, Trash2, Users, Settings, Eye, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RBACManagement() {
  const [selectedRole, setSelectedRole] = useState("inventory-staff");

  const roles = [
    {
      id: "super-admin",
      name: "Super Admin",
      description: "Full system access and management",
      userCount: 2,
      color: "bg-red-500/10 text-red-500",
      permissions: ["all"]
    },
    {
      id: "warehouse-manager",
      name: "Warehouse Manager",
      description: "Warehouse operations and staff management",
      userCount: 5,
      color: "bg-purple-500/10 text-purple-500",
      permissions: ["warehouse", "inventory", "staff", "reports"]
    },
    {
      id: "logistics-manager",
      name: "Logistics Manager",
      description: "Delivery and logistics coordination",
      userCount: 3,
      color: "bg-blue-500/10 text-blue-500",
      permissions: ["logistics", "delivery", "routes", "reports"]
    },
    {
      id: "inventory-staff",
      name: "Inventory Staff",
      description: "Inventory management and stock control",
      userCount: 45,
      color: "bg-green-500/10 text-green-500",
      permissions: ["inventory", "products", "stock"]
    },
    {
      id: "delivery-personnel",
      name: "Delivery Personnel",
      description: "Order delivery and customer interaction",
      userCount: 28,
      color: "bg-orange-500/10 text-orange-500",
      permissions: ["delivery", "orders", "customer-contact"]
    },
    {
      id: "customer",
      name: "Customer",
      description: "Customer portal access",
      userCount: 2847,
      color: "bg-cyan-500/10 text-cyan-500",
      permissions: ["orders", "profile", "support"]
    }
  ];

  const permissions = [
    { id: "all", name: "All Permissions", category: "System" },
    { id: "warehouse", name: "Warehouse Management", category: "Operations" },
    { id: "inventory", name: "Inventory Control", category: "Operations" },
    { id: "logistics", name: "Logistics Management", category: "Operations" },
    { id: "delivery", name: "Delivery Management", category: "Operations" },
    { id: "products", name: "Product Management", category: "Catalog" },
    { id: "stock", name: "Stock Control", category: "Catalog" },
    { id: "orders", name: "Order Management", category: "Sales" },
    { id: "routes", name: "Route Planning", category: "Logistics" },
    { id: "staff", name: "Staff Management", category: "HR" },
    { id: "reports", name: "Reports & Analytics", category: "Analytics" },
    { id: "customer-contact", name: "Customer Contact", category: "Support" },
    { id: "profile", name: "Profile Management", category: "Account" },
    { id: "support", name: "Support Access", category: "Support" }
  ];

  const permissionsByCategory = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof permissions>);

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="space-y-6">
      {/* RBAC Overview Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gradient-primary">{roles.length}</div>
                <p className="text-sm font-medium">Total Roles</p>
              </div>
              <Shield className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gradient-primary">{permissions.length}</div>
                <p className="text-sm font-medium">Permissions</p>
              </div>
              <Lock className="h-6 w-6 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gradient-primary">
                  {roles.reduce((sum, role) => sum + role.userCount, 0)}
                </div>
                <p className="text-sm font-medium">Total Users</p>
              </div>
              <Users className="h-6 w-6 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gradient-primary">Active</div>
                <p className="text-sm font-medium">RBAC Status</p>
              </div>
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles">Roles Management</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          {/* Roles Table */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Role Management
                  </CardTitle>
                  <CardDescription>
                    Configure and manage user roles and their permissions
                  </CardDescription>
                </div>
                <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Badge className={role.color}>
                              {role.name}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-muted-foreground truncate">
                            {role.description}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {role.userCount} users
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {role.permissions.length} permissions
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive hover:text-destructive/80"
                              disabled={role.id === "super-admin"}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Role Selector */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Select Role</CardTitle>
                <CardDescription>Choose a role to view and edit permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {roles.map((role) => (
                  <div 
                    key={role.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRole === role.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{role.name}</p>
                        <p className="text-xs text-muted-foreground">{role.userCount} users</p>
                      </div>
                      <Badge className={role.color} variant="secondary">
                        {role.permissions.length}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Permissions Configuration */}
            <Card className="glass-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Permissions for {selectedRoleData?.name}
                </CardTitle>
                <CardDescription>
                  Configure permissions for this role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(permissionsByCategory).map(([category, perms]) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">{category}</h4>
                      <div className="space-y-2">
                        {perms.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={permission.id}
                              checked={selectedRoleData?.permissions.includes(permission.id) || selectedRoleData?.permissions.includes("all")}
                              disabled={selectedRoleData?.permissions.includes("all")}
                            />
                            <Label 
                              htmlFor={permission.id} 
                              className="text-sm font-normal cursor-pointer"
                            >
                              {permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex gap-2 pt-4 border-t">
                    <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                      Save Changes
                    </Button>
                    <Button variant="outline">
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-accent" />
                RBAC Audit Log
              </CardTitle>
              <CardDescription>
                Track all role and permission changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    timestamp: "2024-01-15 14:30:25",
                    action: "Role permissions updated",
                    role: "Inventory Staff",
                    user: "admin@promodeagro.com",
                    details: "Added product management permission"
                  },
                  {
                    timestamp: "2024-01-15 12:15:42",
                    action: "New role created",
                    role: "Quality Controller",
                    user: "admin@promodeagro.com",
                    details: "Created new role with quality check permissions"
                  },
                  {
                    timestamp: "2024-01-15 09:45:18",
                    action: "User role changed",
                    role: "Warehouse Manager",
                    user: "hr@promodeagro.com",
                    details: "Promoted user from Inventory Staff"
                  }
                ].map((event, index) => (
                  <div key={index} className="flex items-start justify-between p-4 rounded-lg border bg-card/50">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{event.action}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Role: {event.role}</span>
                        <span>•</span>
                        <span>By: {event.user}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.details}</p>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {event.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}