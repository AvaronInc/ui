
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { mockRegions, mockConnections } from '../data/mockData';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SDWANConnectivity = () => {
  const [connections, setConnections] = useState(mockConnections);
  const [isAddConnectionOpen, setIsAddConnectionOpen] = useState(false);

  // Get region name by ID
  const getRegionNameById = (regionId: string) => {
    const region = mockRegions.find(r => r.id === regionId);
    return region ? region.name : 'Unknown';
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'degraded':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'down':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return '';
    }
  };

  // Add new connection dialog
  const AddConnectionDialog = () => {
    return (
      <Dialog open={isAddConnectionOpen} onOpenChange={setIsAddConnectionOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Connection</DialogTitle>
            <DialogDescription>
              Establish a new SD-WAN connection between regions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source-region" className="text-right">
                Source Region
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select source region" />
                </SelectTrigger>
                <SelectContent>
                  {mockRegions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="target-region" className="text-right">
                Target Region
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select target region" />
                </SelectTrigger>
                <SelectContent>
                  {mockRegions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="connection-type" className="text-right">
                Connection Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select connection type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fiber">Fiber</SelectItem>
                  <SelectItem value="wireless">Wireless</SelectItem>
                  <SelectItem value="satellite">Satellite</SelectItem>
                  <SelectItem value="vpn">VPN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bandwidth" className="text-right">
                Bandwidth (Mbps)
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select bandwidth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">1,000 Mbps</SelectItem>
                  <SelectItem value="2500">2,500 Mbps</SelectItem>
                  <SelectItem value="5000">5,000 Mbps</SelectItem>
                  <SelectItem value="10000">10,000 Mbps</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="encryption">
                Encryption
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="encryption" />
                <Label htmlFor="encryption">Enable quantum-safe encryption</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddConnectionOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddConnectionOpen(false)}>Create Connection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Function to refresh connections and fix issues
  const handleRefreshConnections = () => {
    // In a real app, this would trigger some API calls
    // For demo, we'll pretend to fix the degraded connections
    const updatedConnections = connections.map(conn => {
      if (conn.status === 'degraded') {
        return { 
          ...conn, 
          status: Math.random() > 0.3 ? 'active' : 'degraded',
          packetLoss: Math.random() * 0.5,
          latency: conn.latency * 0.7
        };
      }
      return conn;
    });
    setConnections(updatedConnections);
  };

  return (
    <div className="space-y-6">
      <AddConnectionDialog />
      
      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{connections.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {connections.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              {connections.filter(c => c.status !== 'active').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection issues alert */}
      {connections.some(c => c.status !== 'active') && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Issues Detected</AlertTitle>
          <AlertDescription>
            There are {connections.filter(c => c.status !== 'active').length} connection issues that require attention.
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={handleRefreshConnections}
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Attempt Auto-Recovery
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Connection Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>SD-WAN Connections</CardTitle>
            <CardDescription>
              Manage connections between regions
            </CardDescription>
          </div>
          <Button 
            onClick={() => setIsAddConnectionOpen(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Connection
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bandwidth</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Packet Loss</TableHead>
                <TableHead>Encryption</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {connections.map((connection) => (
                <TableRow key={connection.id}>
                  <TableCell>{getRegionNameById(connection.sourceRegionId)}</TableCell>
                  <TableCell>{getRegionNameById(connection.targetRegionId)}</TableCell>
                  <TableCell className="capitalize">{connection.type}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(connection.status)}>
                      {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{connection.bandwidth} Mbps</TableCell>
                  <TableCell>{connection.latency} ms</TableCell>
                  <TableCell>{connection.packetLoss.toFixed(2)}%</TableCell>
                  <TableCell>
                    {connection.encryptionEnabled ? (
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Enabled
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        Disabled
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SDWANConnectivity;
