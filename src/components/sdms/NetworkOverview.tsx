
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NetworkHealthStatus, NetworkStats } from '@/types/sdms';
import { Activity, Server, Network, Laptop, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const NetworkOverview = () => {
  // Mock data - in a real app, this would come from an API
  const networkStats: NetworkStats = {
    devices: 127,
    endpoints: 342,
    segments: 8,
    healthStatus: 'good',
    primaryDataCenter: 'NYC-DC01',
    secondaryDataCenter: 'SFO-DC02'
  };

  const getHealthStatusIcon = (status: NetworkHealthStatus) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'critical':
        return <XCircle className="h-6 w-6 text-red-500" />;
    }
  };
  
  const getHealthStatusColor = (status: NetworkHealthStatus) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">AI-Generated Network Overview</div>
      <p className="text-muted-foreground">
        This overview was automatically generated using AI to document your network layout and health status.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Health</CardTitle>
            {getHealthStatusIcon(networkStats.healthStatus)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{networkStats.healthStatus}</div>
            <Badge className={`mt-2 ${getHealthStatusColor(networkStats.healthStatus)}`}>
              Automatically Monitored
            </Badge>
            <CardDescription className="mt-2">
              Last scanned 5 minutes ago
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.devices}</div>
            <CardDescription className="mt-2">
              Active network devices across all locations
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Endpoints</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.endpoints}</div>
            <CardDescription className="mt-2">
              Workstations, laptops, and mobile devices
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Network Topology Summary</CardTitle>
            <CardDescription>
              Overview of network segments and architecture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network Segments:</span>
                <span className="font-medium">{networkStats.segments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Data Center:</span>
                <span className="font-medium">{networkStats.primaryDataCenter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Secondary Data Center:</span>
                <span className="font-medium">{networkStats.secondaryDataCenter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active VLANs:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">WAN Links:</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
            <CardDescription>
              Real-time network status insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Internet Connectivity:</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Stable (1 Gbps)
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Users:</span>
                <span className="font-medium">217</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">WAN Bandwidth Utilization:</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Server Uptime:</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  99.9%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Security Incidents (24h):</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NetworkOverview;
