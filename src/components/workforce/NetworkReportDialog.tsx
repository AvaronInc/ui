
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Users, Network, Clock, Shield, Laptop } from "lucide-react";

interface NetworkReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Dummy data for the report
const networkStats = {
  timestamp: new Date().toLocaleString(),
  activeUsers: 243,
  connectedDevices: 198,
  averageLatency: "24ms",
  bandwidthUsage: "1.2 GB/s",
  securityEvents: 12,
  networkHealth: "98.5%",
  topApplications: [
    { name: "Microsoft Teams", bandwidth: "256 Mbps", users: 156 },
    { name: "Slack", bandwidth: "124 Mbps", users: 143 },
    { name: "Zoom", bandwidth: "512 Mbps", users: 45 },
    { name: "Web Browsing", bandwidth: "768 Mbps", users: 201 }
  ]
};

const NetworkReportDialog = ({ open, onOpenChange }: NetworkReportDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Network Status Report</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full pr-4">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Generated on {networkStats.timestamp}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{networkStats.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Currently online</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Network Health</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{networkStats.networkHealth}</div>
                  <p className="text-xs text-muted-foreground">Overall status</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Latency</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{networkStats.averageLatency}</div>
                  <p className="text-xs text-muted-foreground">Response time</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Network Traffic Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Application</TableHead>
                      <TableHead>Active Users</TableHead>
                      <TableHead>Bandwidth Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {networkStats.topApplications.map((app) => (
                      <TableRow key={app.name}>
                        <TableCell className="font-medium">{app.name}</TableCell>
                        <TableCell>{app.users}</TableCell>
                        <TableCell>{app.bandwidth}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Security Events</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{networkStats.securityEvents}</div>
                  <p className="text-xs text-muted-foreground">Detected in last 24h</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
                  <Laptop className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{networkStats.connectedDevices}</div>
                  <p className="text-xs text-muted-foreground">Active endpoints</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkReportDialog;
