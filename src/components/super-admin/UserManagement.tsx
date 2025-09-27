import { useState } from "react";
import { Search, Plus, Edit, Trash2, UserCheck, UserX, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const users = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@promodeagro.com",
      role: "Inventory Staff",
      status: "Active",
      lastLogin: "2 hours ago",
      avatar: "RK"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@promodeagro.com",
      role: "Delivery Personnel",
      status: "Active",
      lastLogin: "30 minutes ago",
      avatar: "PS"
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@promodeagro.com",
      role: "Warehouse Manager",
      status: "Active",
      lastLogin: "1 hour ago",
      avatar: "AP"
    },
    {
      id: 4,
      name: "Sunita Reddy",
      email: "sunita@customer.com",
      role: "Customer",
      status: "Active",
      lastLogin: "15 minutes ago",
      avatar: "SR"
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@promodeagro.com",
      role: "Logistics Manager",
      status: "Inactive",
      lastLogin: "2 days ago",
      avatar: "VS"
    }
  ];

  const getRoleColor = (role: string) => {
    const colors = {
      "Inventory Staff": "bg-blue-500/10 text-blue-500",
      "Delivery Personnel": "bg-green-500/10 text-green-500",
      "Warehouse Manager": "bg-purple-500/10 text-purple-500",
      "Customer": "bg-orange-500/10 text-orange-500",
      "Logistics Manager": "bg-cyan-500/10 text-cyan-500"
    };
    return colors[role as keyof typeof colors] || "bg-gray-500/10 text-gray-500";
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500";
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gradient-primary">User Management</CardTitle>
              <CardDescription>
                Manage all system users and their roles
              </CardDescription>
            </div>
            <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="inventory">Inventory Staff</SelectItem>
                <SelectItem value="delivery">Delivery Personnel</SelectItem>
                <SelectItem value="warehouse">Warehouse Manager</SelectItem>
                <SelectItem value="logistics">Logistics Manager</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <div className="h-full w-full bg-gradient-primary flex items-center justify-center text-white font-medium">
                            {user.avatar}
                          </div>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-green-500 hover:text-green-600"
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive/80"
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

      {/* User Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { title: "Total Users", value: "2,847", color: "text-primary" },
          { title: "Active Users", value: "2,245", color: "text-green-500" },
          { title: "Inactive Users", value: "602", color: "text-red-500" },
          { title: "New This Month", value: "143", color: "text-blue-500" }
        ].map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gradient-primary">{stat.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}