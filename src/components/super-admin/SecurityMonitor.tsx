import { useState } from "react";
import { Shield, AlertTriangle, Lock, Eye, Download, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SecurityMonitor() {
  const [severityFilter, setSeverityFilter] = useState("all");

  const securityEvents = [
    {
      id: 1,
      timestamp: "2024-01-15 10:30:25",
      event: "Multiple failed login attempts",
      ip: "192.168.1.100",
      user: "unknown_user",
      severity: "High",
      status: "Blocked"
    },
    {
      id: 2,
      timestamp: "2024-01-15 09:15:42",
      event: "Unusual API access pattern",
      ip: "203.45.67.89",
      user: "api_client",
      severity: "Medium",
      status: "Monitoring"
    },
    {
      id: 3,
      timestamp: "2024-01-15 08:45:12",
      event: "Admin password changed",
      ip: "10.0.0.25",
      user: "admin@promodeagro.com",
      severity: "Low",
      status: "Resolved"
    },
    {
      id: 4,
      timestamp: "2024-01-15 07:20:33",
      event: "Database access from new location",
      ip: "172.16.0.45",
      user: "db_admin",
      severity: "Medium",
      status: "Investigating"
    },
    {
      id: 5,
      timestamp: "2024-01-15 06:10:18",
      event: "File system permission change",
      ip: "192.168.1.50",
      user: "system",
      severity: "High",
      status: "Resolved"
    }
  ];

  const securityStats = [
    {
      title: "Active Threats",
      value: "3",
      description: "Currently being monitored",
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      title: "Blocked IPs",
      value: "127",
      description: "This month",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      title: "Failed Logins",
      value: "45",
      description: "Last 24 hours",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "Security Score",
      value: "94%",
      description: "System security rating",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  const getSeverityColor = (severity: string) => {
    const colors = {
      "High": "bg-red-500/10 text-red-500",
      "Medium": "bg-yellow-500/10 text-yellow-500",
      "Low": "bg-green-500/10 text-green-500"
    };
    return colors[severity as keyof typeof colors] || "bg-gray-500/10 text-gray-500";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Blocked": "bg-red-500/10 text-red-500",
      "Monitoring": "bg-blue-500/10 text-blue-500",
      "Investigating": "bg-yellow-500/10 text-yellow-500",
      "Resolved": "bg-green-500/10 text-green-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500/10 text-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Security Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        {securityStats.map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <p className="text-sm font-medium">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Shield className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Events */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Security Events
              </CardTitle>
              <CardDescription>
                Recent security incidents and alerts
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityEvents.map((event) => (
                  <TableRow key={event.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">
                      {event.timestamp}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {event.event}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {event.ip}
                    </TableCell>
                    <TableCell>{event.user}</TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(event.severity)}>
                        {event.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Lock className="h-4 w-4" />
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

      {/* Security Recommendations */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Recommendations
          </CardTitle>
          <CardDescription>
            Suggested actions to improve system security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Enable Multi-Factor Authentication",
                description: "Require MFA for all admin accounts to enhance security",
                priority: "High",
                action: "Configure MFA"
              },
              {
                title: "Update Security Policies",
                description: "Review and update password complexity requirements",
                priority: "Medium",
                action: "Review Policies"
              },
              {
                title: "Audit User Permissions",
                description: "Review user roles and permissions quarterly",
                priority: "Medium",
                action: "Start Audit"
              }
            ].map((recommendation, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                <div className="space-y-1">
                  <h4 className="font-medium">{recommendation.title}</h4>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={recommendation.priority === 'High' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {recommendation.priority}
                  </Badge>
                  <Button variant="outline" size="sm">
                    {recommendation.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}