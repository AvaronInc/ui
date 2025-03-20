
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowUpDown, RefreshCw, Check, AlertTriangle, XCircle } from 'lucide-react';

import { DNSServer } from '../types';

const FailoverTab: React.FC = () => {
  // Mock data for failover DNS servers
  const [servers, setServers] = useState<DNSServer[]>([
    { id: 1, name: 'Primary DNS', address: '10.0.0.1', port: 53, priority: 'primary', latency: 12, status: 'online' },
    { id: 2, name: 'Secondary DNS', address: '10.0.0.2', port: 53, priority: 'secondary', latency: 18, status: 'online' },
    { id: 3, name: 'Cloud Resolver', address: '8.8.8.8', port: 53, priority: 'tertiary', latency: 45, status: 'online' },
    { id: 4, name: 'Backup DNS', address: '10.0.0.3', port: 53, priority: 'tertiary', latency: 32, status: 'offline' },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500 hover:bg-green-600"><Check className="h-3 w-3 mr-1" /> Online</Badge>;
      case 'offline':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Offline</Badge>;
      case 'degraded':
        return <Badge variant="outline" className="text-amber-500 border-amber-500"><AlertTriangle className="h-3 w-3 mr-1" /> Degraded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleTestConnectivity = () => {
    // Simulate testing connectivity with loading state
    // In a real app, would ping DNS servers and update statuses
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">DNS Failover Configuration</h3>
                <p className="text-sm text-muted-foreground">Configure primary, secondary, and tertiary DNS resolvers for automatic failover</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleTestConnectivity} className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Test Connectivity</span>
                </Button>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add DNS Server</span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DNS Server</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Port</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servers.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell className="font-medium">{server.name}</TableCell>
                      <TableCell>{server.address}</TableCell>
                      <TableCell>{server.port}</TableCell>
                      <TableCell className="capitalize">{server.priority}</TableCell>
                      <TableCell>{server.latency} ms</TableCell>
                      <TableCell>{getStatusBadge(server.status)}</TableCell>
                      <TableCell><Switch checked={server.status !== 'offline'} /></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">AI-Based Latency Optimization</h3>
              <p className="text-sm text-muted-foreground">Automatically route DNS queries to the fastest available resolver</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Smart Routing</h4>
                    <p className="text-xs text-muted-foreground">Route queries based on real-time latency measurements</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Auto-failover</h4>
                    <p className="text-xs text-muted-foreground">Automatically switch to secondary DNS on primary failure</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Persistent Monitoring</h4>
                    <p className="text-xs text-muted-foreground">Continuously monitor DNS server health</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
              
              <div className="rounded-md border p-4 bg-muted/50">
                <h4 className="text-sm font-medium mb-3">AI Recommendations</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p>Your primary and secondary DNS servers are in the same subnet. For better redundancy, consider placing them in different network segments.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <p>Current latency values suggest optimal performance. No changes recommended at this time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FailoverTab;
